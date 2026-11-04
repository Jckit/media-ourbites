import copy
import json
from pathlib import Path
import unittest

from scripts.validate_animation_tickets import check_shape, validate

ROOT = Path(__file__).resolve().parents[1]


class AnimationTicketTests(unittest.TestCase):
    def setUp(self):
        self.real = json.loads((ROOT / 'episodes/002/animation-tickets.json').read_text(encoding='utf-8'))
        self.synthetic = json.loads((ROOT / 'examples/warehouse-animation-tickets.json').read_text(encoding='utf-8'))

    def test_contrasting_contracts(self):
        self.assertEqual(validate(self.real), 2)
        self.assertEqual(validate(self.synthetic), 2)
        self.assertEqual(self.real['tickets'][0]['transition']['type'], 'continuity')
        self.assertEqual(self.synthetic['tickets'][0]['transition']['type'], 'clean-cut')

    def test_incomplete_or_vague_direction_fails(self):
        for field in ('hero', 'camera', 'actor', 'reading', 'motion'):
            data = copy.deepcopy(self.real)
            del data['tickets'][0][field]
            with self.subTest(field=field), self.assertRaises(ValueError):
                validate(data)
        self.real['tickets'][0]['hero']['action'] = '  '
        with self.assertRaises(ValueError):
            validate(self.real)

    def test_unknown_claim_and_synthetic_confusion(self):
        self.real['tickets'][0]['claim_ids'] = ['invented-profit']
        with self.assertRaisesRegex(ValueError, 'unknown claim'):
            validate(self.real)
        self.synthetic['episode_manifest'] = 'episodes/002/episode.json'
        with self.assertRaisesRegex(ValueError, 'Synthetic fixture'):
            validate(self.synthetic)

    def test_paths_time_and_regions(self):
        mutations = [
            ('motion', 'spatial_path', [[0, 0], [1, 1]]),
            ('motion', 'temporal_bezier', [2, 0, .5, 1]),
            ('motion', 'temporal_bezier', [0, float('nan'), .5, 1]),
            ('timing', 'end_source_seconds', 0),
            ('reading', 'hold_seconds', 500),
            ('reading', 'caption_region', [0, 0, 2000, 100]),
            ('reading', 'source_region', [65, 1490, 950, 241]),
        ]
        for group, key, value in mutations:
            data = copy.deepcopy(self.real)
            data['tickets'][0][group][key] = value
            with self.subTest(key=key), self.assertRaises(ValueError):
                validate(data)

    def test_transition_references(self):
        for key, value in [('next_ticket', 'missing'), ('shared_object', 'different-object')]:
            data = copy.deepcopy(self.real)
            data['tickets'][0]['transition'][key] = value
            with self.subTest(key=key), self.assertRaises(ValueError):
                validate(data)
        self.real['tickets'][1]['id'] = self.real['tickets'][0]['id']
        with self.assertRaisesRegex(ValueError, 'Duplicate'):
            validate(self.real)

    def test_unreviewed_asset_cannot_be_declared_usable(self):
        asset = self.real['tickets'][0]['assets'][0]
        asset['local_path'] = 'src/index.tsx'
        with self.assertRaisesRegex(ValueError, 'declared approval'):
            validate(self.real)
        asset.update(rights_status='approved', evidence='human receipt elsewhere', local_path='../outside.png')
        with self.assertRaisesRegex(ValueError, 'escapes'):
            validate(self.real)
        asset['local_path'] = 'https://example.com/logo.png'
        with self.assertRaisesRegex(ValueError, 'local path'):
            validate(self.real)

    def test_no_external_assets_requires_reason(self):
        self.synthetic['tickets'][0]['no_external_assets_reason'] = ''
        with self.assertRaisesRegex(ValueError, 'Explain why'):
            validate(self.synthetic)

    def test_schema_drift_and_extra_approval_flags_fail(self):
        with self.assertRaisesRegex(ValueError, 'unsupported schema'):
            check_shape('example', {'type': 'string', 'unknownRule': True})
        self.synthetic['approved'] = True
        with self.assertRaisesRegex(ValueError, 'unexpected'):
            validate(self.synthetic)


if __name__ == '__main__':
    unittest.main()
