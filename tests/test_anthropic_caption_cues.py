"""FW-06: protect concise burned-in cue density without editing narrated wording.

These tests validate the authored cue schedule, not whether a word was spoken
at the exact cue boundary. Listen to the rendered draft for speech alignment.
"""
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src/anthropic-character-audio.json"
CUES = ROOT / "src/anthropic-caption-cues.json"
SCENE = ROOT / "src/AnthropicCharacter.tsx"


class AnthropicCaptionCueTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.narration = json.loads(MANIFEST.read_text(encoding="utf-8"))["clips"]
        cls.cues = json.loads(CUES.read_text(encoding="utf-8"))["clips"]

    def test_every_spoken_word_is_preserved_in_sequence(self):
        self.assertEqual(len(self.cues), len(self.narration))
        for i, (clip, phrases) in enumerate(zip(self.narration, self.cues)):
            with self.subTest(clip=i):
                self.assertEqual(" ".join(p["text"] for p in phrases), clip["text"])

    def test_cue_boundaries_cover_each_original_clip_without_gaps(self):
        for i, phrases in enumerate(self.cues):
            with self.subTest(clip=i):
                self.assertGreater(len(phrases), 1)
                previous = 0
                for phrase in phrases:
                    self.assertGreater(phrase["until"], previous)
                    self.assertLessEqual(phrase["until"], 1)
                    self.assertIsInstance(phrase["text"], str)
                    self.assertTrue(phrase["text"].strip())
                    previous = phrase["until"]
                self.assertEqual(previous, 1)

    def test_mobile_reading_load_is_bounded(self):
        for i, phrases in enumerate(self.cues):
            for j, phrase in enumerate(phrases):
                with self.subTest(clip=i, cue=j):
                    self.assertLessEqual(len(phrase["text"]), 36)
                    self.assertLessEqual(len(phrase["text"].split()), 6)
                    self.assertNotIn("\n", phrase["text"])

    def test_orphaned_orange_pointer_does_not_return(self):
        source = SCENE.read_text(encoding="utf-8")
        self.assertNotIn('M720 1110 L570 510', source)
        self.assertNotIn('caption?.text', source)
        self.assertIn("captionCues.clips", source)


if __name__ == "__main__":
    unittest.main()
