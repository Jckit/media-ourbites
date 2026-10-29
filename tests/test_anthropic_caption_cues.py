"""FW-06: measured WAV-pause cue timing, exact spoken words and phone-size density.

Cues are authored from quiet regions of the committed original 24kHz WAV files.
A quiet region is not ASR or forced word alignment: a human still listens
to the final encoded video before approving word timing.
"""
from array import array
import json
import math
from pathlib import Path
import sys
import unittest
import wave

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src/anthropic-character-audio.json"
CUES = ROOT / "src/anthropic-caption-cues.json"
SCENE = ROOT / "src/AnthropicCharacter.tsx"

FPS = 30
PLAYBACK_SPEED = 1.1
PAUSE_RMS_LIMIT_DBFS = -24


class AnthropicCaptionCueTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.narration = json.loads(MANIFEST.read_text(encoding="utf-8"))["clips"]
        cls.cue_file = json.loads(CUES.read_text(encoding="utf-8"))
        cls.cues = cls.cue_file["clips"]

    def test_every_spoken_word_is_preserved_in_sequence(self):
        self.assertEqual(len(self.cues), len(self.narration))
        for i, (clip, phrases) in enumerate(zip(self.narration, self.cues)):
            with self.subTest(clip=i):
                self.assertEqual(" ".join(p["text"] for p in phrases), clip["text"])

    def test_source_second_boundaries_cover_every_original_clip(self):
        self.assertEqual(self.cue_file["timingBasis"],
                         "measured_pauses_in_committed_source_wav_2026-10-29")
        for i, (clip, phrases) in enumerate(zip(self.narration, self.cues)):
            with self.subTest(clip=i):
                self.assertGreater(len(phrases), 1)
                self.assertEqual(phrases[0]["startSourceSeconds"], 0)
                prev_start = -1
                prev_frame = -1
                for phrase in phrases:
                    self.assertEqual(set(phrase), {"text", "startSourceSeconds"})
                    start = phrase["startSourceSeconds"]
                    self.assertIsInstance(start, (int, float))
                    self.assertNotIsInstance(start, bool)
                    self.assertGreater(start, prev_start)
                    self.assertGreaterEqual(start, 0)
                    self.assertLess(start, clip["duration"])
                    # Same frame clock as the Remotion composition's useCurrentFrame.
                    absolute_frame = math.ceil(
                        (clip["start"] + start) * FPS / PLAYBACK_SPEED - 1e-9
                    )
                    self.assertGreater(absolute_frame, prev_frame)
                    prev_start = start
                    prev_frame = absolute_frame

    def test_mobile_reading_load_is_bounded(self):
        for i, phrases in enumerate(self.cues):
            for j, phrase in enumerate(phrases):
                with self.subTest(clip=i, cue=j):
                    self.assertLessEqual(len(phrase["text"]), 36)
                    self.assertLessEqual(len(phrase["text"].split()), 6)
                    self.assertNotIn("\n", phrase["text"])

    def test_every_switch_uses_a_quiet_region_of_original_audio(self):
        # Regression against switching inside an utterance (which fractional
        # clip-duration estimates did). WAVs are committed, no network/ASR.
        for i, (clip, phrases) in enumerate(zip(self.narration, self.cues)):
            source_wav = ROOT / "public" / clip["file"]
            with wave.open(str(source_wav), "rb") as audio:
                self.assertEqual((audio.getnchannels(), audio.getsampwidth()),
                                 (1, 2))
                sample_rate = audio.getframerate()
                self.assertEqual(sample_rate, 24000)
                self.assertAlmostEqual(audio.getnframes() / sample_rate,
                                       clip["duration"], delta=0.002)
                half_window = round(sample_rate * 0.01)  # +/-10ms
                for j, phrase in enumerate(phrases[1:], 1):
                    with self.subTest(clip=i, cue=j):
                        center = round(phrase["startSourceSeconds"] * sample_rate)
                        start_sample = center - half_window
                        self.assertGreaterEqual(start_sample, 0)
                        audio.setpos(start_sample)
                        samples = array("h")
                        samples.frombytes(audio.readframes(half_window * 2))
                        if sys.byteorder != "little":
                            samples.byteswap()
                        self.assertEqual(len(samples), half_window * 2)
                        rms = (math.sqrt(
                            sum(float(s) ** 2 for s in samples) / len(samples)
                        ) / 32768)
                        rms_dbfs = 20 * math.log10(max(rms, 1e-8))
                        self.assertLessEqual(rms_dbfs, PAUSE_RMS_LIMIT_DBFS,
                                             f"Cue {i}/{j} begins inside voiced audio: "
                                             f"{rms_dbfs:.1f}dBFS")

    def test_orphaned_pointer_stays_removed_and_no_fractional_cues(self):
        source = SCENE.read_text(encoding="utf-8")
        self.assertNotIn("M720 1110 L570 510", source)
        self.assertNotIn("caption?.text", source)
        self.assertNotIn(".until", source)
        self.assertIn("cue.startSourceSeconds", source)


if __name__ == "__main__":
    unittest.main()
