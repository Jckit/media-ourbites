"""Anthropic editorial sample: preserve production and disclose timing limits."""
import json
import pathlib
import re
import unittest

R = pathlib.Path(__file__).resolve().parents[1]
SCENE = (R / 'src/framework/AnthropicEditorialSample.tsx').read_text()
INDEX = (R / 'src/index.tsx').read_text()
AUDIO = json.loads((R / 'src/anthropic-character-audio.json').read_text())
CUES = json.loads((R / 'src/anthropic-caption-cues.json').read_text())

class AnthropicEditorialSampleTests(unittest.TestCase):
    def test_preserve_original_voice_and_canonical_character(self):
        self.assertIn("ANTHROPIC_EDITORIAL_SAMPLE_FRAMES=475", SCENE)
        self.assertIn('from={Math.round(clip.start*fps/playbackSpeed)}', SCENE)
        self.assertIn('playbackRate={playbackSpeed}', SCENE)
        self.assertIn("StageActor", SCENE)
        self.assertIn("WordCaptionOverlay", SCENE)
        self.assertIn("narration.clips.map(clip", SCENE)
        self.assertEqual(len(AUDIO['clips']), 4)
        self.assertIn('id="AnthropicEditorialSample"', INDEX)
        self.assertIn("SCREEN SPACE", SCENE.upper())

    def test_no_fake_word_alignment_or_released_media(self):
        self.assertIn("provisional-phrase-anchored", SCENE)
        self.assertIn("PREVIEW ONLY", SCENE)
        self.assertIn("NOT", SCENE)
        self.assertIn("S-1", SCENE)
        self.assertNotIn("logoAsset:", SCENE)
        self.assertNotIn("Math.random(", SCENE)
        self.assertNotIn("AnthropicShort", SCENE)
        self.assertEqual(CUES['timingBasis'], "measured_pauses_in_committed_source_wav_2026-10-29")

    def test_original_facts_read_from_financial_json(self):
        self.assertIn('financials.h1_2026.net_loss', SCENE)
        self.assertIn('financials.h1_2026.operating_loss', SCENE)
        self.assertIn('financials.h1_2026.convertible_financing_fair_value_change', SCENE)
        self.assertIn("Reported", SCENE.capitalize() if False else SCENE)
        self.assertIn("CASH SPENT", SCENE)

if __name__ == '__main__':
    unittest.main()
