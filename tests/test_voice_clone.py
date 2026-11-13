"""Offline regression tests for local voice configuration and A/B processing."""
import argparse
import importlib.util
import json
import math
import tempfile
import unittest
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
