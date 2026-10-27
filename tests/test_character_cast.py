"""Tests for real-person character guards and required fictional protagonist."""
import copy
import json
from pathlib import Path
import unittest

from scripts.validate_character_cast import CharacterReviewError, validate_character_cast

ROOT = Path(__file__).resolve().parents[1]


class CharacterCastTests(unittest.TestCase):
    def setUp(self):
        self.anthropic = json.loads((ROOT / 'episodes/002/episode.json').read_text(encoding='utf-8'))
        self.merger = json.loads((ROOT / 'examples/merger-v2.json').read_text(encoding='utf-8'))

    def test_ourbites_pilots_declare_one_reusable_protagonist(self):
        for episode in [self.anthropic, self.merger]:
            with self.subTest(episode=episode['id']):
                warnings = validate_character_cast(episode, ROOT)
                self.assertTrue(any('provisional' in warning for warning in warnings))
                self.assertEqual(episode['character_cast']['protagonist']['id'], 'ourbites-protagonist')
                self.assertGreaterEqual(len(episode['character_cast']['protagonist']['appearance_scene_ids']), 2)

    def test_missing_or_unknown_protagonist_fails(self):
        bad = copy.deepcopy(self.anthropic)
        del bad['character_cast']
        with self.assertRaises(CharacterReviewError):
            validate_character_cast(bad, ROOT)
        bad = copy.deepcopy(self.anthropic)
        bad['character_cast']['protagonist']['appearance_scene_ids'] = ['missing-scene']
        with self.assertRaises(CharacterReviewError):
            validate_character_cast(bad, ROOT)

    def test_unapproved_real_person_is_planned_but_not_rendered(self):
        characters = self.anthropic['character_cast']['real_people']
        self.assertEqual(characters[0]['id'], 'dario-amodei')
        self.assertEqual(characters[0]['appearance_scene_ids'], [])
        bad = copy.deepcopy(self.anthropic)
        bad['character_cast']['real_people'][0]['appearance_scene_ids'] = ['growth']
        with self.assertRaisesRegex(CharacterReviewError, 'unapproved real-person'):
            validate_character_cast(bad, ROOT)

    def test_release_blocks_unapproved_protagonist(self):
        with self.assertRaisesRegex(CharacterReviewError, 'not human-approved'):
            validate_character_cast(self.anthropic, ROOT, release=True)

    def test_unknown_real_person_profile_fails(self):
        bad = copy.deepcopy(self.anthropic)
        bad['character_cast']['real_people'][0]['id'] = 'invented-executive'
        with self.assertRaises(CharacterReviewError):
            validate_character_cast(bad, ROOT)

    def test_shared_host_component_is_reused_across_video_compositions(self):
        host = (ROOT / 'src/OurbitesHost.tsx').read_text(encoding='utf-8')
        self.assertIn("export const OurbitesHost:", host)
        self.assertIn("export const OurbitesHostCameo:", host)
        for file in ['src/OwnershipProof.tsx', 'src/AnthropicShort.tsx', 'src/index.tsx']:
            with self.subTest(file=file):
                src = (ROOT / file).read_text(encoding='utf-8')
                self.assertIn("from './OurbitesHost'", src)


if __name__ == '__main__':
    unittest.main()
