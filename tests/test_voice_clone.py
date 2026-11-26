"""Offline regression tests for local voice configuration and A/B processing."""
import argparse
import importlib.util
import json
import math
import tempfile
import unittest
import wave
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]


def load_script(filename, module_name):
    spec = importlib.util.spec_from_file_location(module_name, ROOT / "scripts" / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


qwen = load_script("generate_qwen_voice.py", "qwen_voice")
lead = load_script("generate_lead_voice.py", "lead_voice")


class VoicePresetTests(unittest.TestCase):
    def test_sections_preserve_numbers_and_work_on_different_topics(self):
        for script in (
            "Revenue rose to $19.4 billion. The charge reached ninety-four point three billion dollars.\n\nWhere did the cash go?",
            "A coffee shop sells each cup for four dollars. Beans cost one dollar. Rent still needs paying.\n\nMore sales can spread that fixed cost.",
        ):
            sections = lead.narration_sections(script, 16)
            self.assertGreater(len(sections), 1)
            self.assertEqual(" ".join(sections).split(), script.split())
            self.assertTrue(all(len(part.split()) <= 16 for part in sections))
        with self.assertRaisesRegex(ValueError, "Rewrite as shorter spoken sentences"):
            lead.narration_sections(" ".join(["word"] * 29) + ".", 28)
        with self.assertRaisesRegex(ValueError, "empty"):
            lead.narration_sections("  ", 28)
        self.assertEqual(lead.narration_sections("Sales rose. Costs fell. Cash grew. Profit followed.", 28),
                         ["Sales rose. Costs fell.", "Cash grew. Profit followed."])
        self.assertEqual(lead.narration_sections("U.S. Revenue rose. Dr. Smith explained why.", 28),
                         ["U.S. Revenue rose. Dr. Smith explained why."])

    @staticmethod
    def write_section(path, rate=1000, silent=False):
        with wave.open(str(path), "wb") as writer:
            writer.setparams((1, 3, rate, 0, "NONE", "not compressed"))
            tone = (0 if silent else 100000).to_bytes(3, "little", signed=True)
            writer.writeframes(b"\0" * 600 + tone * 400 + b"\0" * 600)

    def test_pcm24_join_trims_only_edges_and_inserts_measured_pause(self):
        with tempfile.TemporaryDirectory() as folder:
            folder = Path(folder)
            paths = [folder / "one.wav", folder / "two.wav"]
            for path in paths:
                self.write_section(path)
            timings = lead.join_sections(paths, folder / "joined.wav", 100)
            with wave.open(str(folder / "joined.wav"), "rb") as reader:
                self.assertEqual(reader.getsampwidth(), 3)
                self.assertEqual(reader.getnframes(), 1060)  # 480ms + 100ms + 480ms
            self.assertAlmostEqual(timings[1]["start_seconds"] - timings[0]["end_seconds"], 0.1)
            self.write_section(paths[1], silent=True)
            with self.assertRaisesRegex(ValueError, "no audible speech"):
                lead.join_sections(paths, folder / "silent.wav", 100)
            self.write_section(paths[1], rate=2000)
            with self.assertRaisesRegex(ValueError, "formats must match"):
                lead.join_sections(paths, folder / "mismatch.wav", 100)

    def test_generation_uses_short_raw_calls_then_polishes_once(self):
        with tempfile.TemporaryDirectory() as folder:
            folder = Path(folder)
            args = argparse.Namespace(output=folder / "take.wav", processing="selected", join_pause_ms=100)
            preset = json.loads((ROOT / "auditions/selected-voice.json").read_text())
            config = dict(cli="cli.exe", model="model.gguf", reference_audio="private.wav",
                          reference_text="Private reference words.", ffmpeg="ffmpeg")
            sections = ["Sales rose.", "Costs rose too."]
            def fake_run(command, **kwargs):
                destination = Path(command[command.index("--output") + 1])
                self.write_section(destination)
            with patch.object(lead.subprocess, "run", side_effect=fake_run) as runner:
                lead.generate_sections(args, preset, config, sections, None)
                commands = [call.args[0] for call in runner.call_args_list]
                self.assertEqual(len(commands), 3)
                for command, text in zip(commands[:2], sections):
                    self.assertEqual(command[command.index("--text") + 1], text)
                    self.assertEqual(command[command.index("--processing") + 1], "raw")
                    self.assertNotIn("--instruct", command)
                self.assertIn("--raw-input", commands[-1])
                self.assertEqual(commands[-1][commands[-1].index("--processing") + 1], "selected")
                with self.assertRaisesRegex(ValueError, "already exist"):
                    lead.generate_sections(args, preset, config, sections, None)
            receipt = (folder / "take.sections/generation.json").read_text()
            self.assertNotIn(config["reference_text"], receipt)
            self.assertNotIn(config["reference_audio"], receipt)

    def test_selected_preset_is_valid_and_honest_about_speed(self):
        preset = json.loads((ROOT / "auditions" / "selected-voice.json").read_text(encoding="utf-8"))
        self.assertEqual(preset["provider"], "audio.cpp")
        self.assertEqual(preset["backend"], "vulkan")
        self.assertGreater(preset["tempo_scale"], 1.0)  # >1 = faster, not slower
        self.assertEqual(preset["pitch_scale"], 0.96)
        self.assertEqual(preset["noise_reduction_db"], 3)

    def test_selected_command_really_forwards_every_processing_setting(self):
        args = argparse.Namespace(
            processing="selected", output=ROOT / "out" / "test.wav",
            text="A small Ourbites story.", text_file=None,
        )
        config = dict(cli="C:/cli.exe", model="C:/model.gguf",
                      reference_audio="C:/private.wav",
                      reference_text="These are the spoken words.",
                      ffmpeg="C:/ffmpeg.exe")
        preset = dict(backend="vulkan", tempo_scale=1.06,
                      pitch_scale=0.96, noise_reduction_db=3,
                      noise_floor_db=-40)
        command = lead.selected_voice_command(args, preset, config)
        for flag, value in (
            ("--tempo-scale", "1.06"),
            ("--pitch-scale", "0.96"),
            ("--noise-reduction-db", "3"),
            ("--noise-floor-db", "-40"),
            ("--processing", "selected"),
            ("--reference-text", config["reference_text"]),
        ):
            self.assertEqual(command[command.index(flag) + 1], value)

        # Configuration changes must modify the actual execution command.
        preset["tempo_scale"] = 1.12
        changed = lead.selected_voice_command(args, preset, config)
        self.assertEqual(changed[changed.index("--tempo-scale") + 1], "1.12")
        self.assertNotEqual(command, changed)

    def test_audio_filter_variants_are_distinct(self):
        params = dict(tempo_scale=1.06, pitch_scale=0.96,
                      noise_reduction_db=3, noise_floor_db=-40)
        self.assertEqual(qwen.audio_filters(argparse.Namespace(processing="raw", **params)), "")
        clean = qwen.audio_filters(argparse.Namespace(processing="clean", **params))
        selected = qwen.audio_filters(argparse.Namespace(processing="selected", **params))
        self.assertIn("afftdn=nr=3:nf=-40", clean)
        self.assertNotIn("rubberband", clean)
        self.assertIn("rubberband=tempo=1.06:pitch=0.96:formant=preserved", selected)

    def test_bad_numeric_inputs_rejected(self):
        base = ["--raw-input", "dummy.wav", "--output", "another.wav"]
        for extra in (
            ["--tempo-scale", "nan"], ["--tempo-scale", "0"],
            ["--pitch-scale", "inf"], ["--noise-reduction-db", "-3"],
            ["--noise-floor-db", "10"], ["--threads", "0"],
        ):
            with self.subTest(extra=extra), self.assertRaises(SystemExit):
                qwen.parse_args(base + extra)

    def test_synthesis_requires_reference_and_script(self):
        with self.assertRaises(SystemExit):
            qwen.parse_args(["--output", "out.wav"])
        with self.assertRaises(SystemExit):
            qwen.parse_args(["--raw-input", "a.wav", "--text", "wrong", "--output", "b.wav"])

    def test_raw_input_does_not_call_model_or_ffmpeg(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source.wav"
            destination = Path(directory) / "copy.wav"
            source.write_bytes(b"synthetic test bytes")
            args = qwen.parse_args([
                "--raw-input", str(source), "--output", str(destination),
                "--processing", "raw",
            ])
            with patch.object(qwen, "parse_args", return_value=args), patch.object(qwen.subprocess, "run") as runner:
                self.assertEqual(qwen.main(), 0)
                runner.assert_not_called()
            self.assertEqual(destination.read_bytes(), source.read_bytes())
            with patch.object(qwen, "parse_args", return_value=args):
                with self.assertRaises(SystemExit):
                    qwen.main()  # Do not overwrite a prior take.

    def test_reprocess_selected_calls_ffmpeg_with_preset_settings(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source.wav"
            destination = Path(directory) / "selected.wav"
            ffmpeg = Path(directory) / "ffmpeg.exe"
            source.write_bytes(b"synthetic raw sample")
            ffmpeg.write_bytes(b"mock executable")
            args = qwen.parse_args([
                "--raw-input", str(source), "--output", str(destination),
                "--processing", "selected", "--ffmpeg", str(ffmpeg),
                "--tempo-scale", "1.13", "--pitch-scale", "0.97",
            ])
            with patch.object(qwen, "parse_args", return_value=args), patch.object(qwen.subprocess, "run") as runner:
                self.assertEqual(qwen.main(), 0)
                command = runner.call_args.args[0]
                self.assertIn("rubberband=tempo=1.13:pitch=0.97", command[command.index("-af") + 1])
            self.assertEqual(source.read_bytes(), b"synthetic raw sample")


if __name__ == "__main__":
    unittest.main()
