"""Episode 002 guardrails; offline, no renderer/media downloads."""
import json
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path
import unittest

from asset_research import build, release_issues, validate_plan
from pipeline import load, validate

ROOT = Path(__file__).resolve().parents[1]
EPISODE = ROOT / 'episodes' / '002' / 'episode.json'
PLAN = ROOT / 'episodes' / '002' / 'media-plan.json'
CHECKED = datetime(2026, 10, 27, 12, 0, tzinfo=timezone.utc)


class AnthropicEpisodeTests(unittest.TestCase):
    def setUp(self):
        self.episode = load(EPISODE)
        self.plan = json.loads(PLAN.read_text(encoding='utf-8'))

    def test_episode_passes_editorial_structure(self):
        warnings = validate(self.episode, CHECKED)
        self.assertTrue(any('one publisher' in warning for warning in warnings))
        self.assertTrue(self.episode['draft'])
        self.assertEqual(self.episode['language'], 'en')

    def test_source_claim_and_scene_integrity(self):
        validate_plan(self.episode, self.plan)
        self.assertEqual({s['id'] for s in self.episode['scenes']},
                         set(self.plan['scenes']))
        self.assertEqual(sum(s['duration'] for s in self.episode['scenes']), 82)
        self.assertTrue(all(s['claim_ids'] for s in self.episode['scenes']))

    def test_exact_income_statement_reconciliation(self):
        # USD billions, sourced from Oct. 26 Anthropic S-1.
        figures = json.loads((ROOT / 'episodes/002/financials.json').read_text())
        self.assertEqual(figures['units'], 'USD millions')
        h1 = figures['h1_2026']
        total = (h1['operating_loss'] + h1['convertible_financing_fair_value_change']
                 + h1['other_income_expense_net'] + h1['interest_income']
                 - h1['income_tax_provision'])
        self.assertEqual(total, h1['net_loss'])
        growth = Decimal(h1['revenue']) / Decimal(figures['h1_2025']['revenue'])
        self.assertGreater(growth, 14)
        self.assertEqual(round(growth, 1), Decimal('14.0'))

    def test_no_assumed_final_media_or_ipo_price(self):
        joined = ' '.join(x['narration'].lower() for x in self.episode['scenes'])
        self.assertNotIn('korean stock market', joined)
        self.assertNotIn('completed ipo', joined)
        self.assertIn("ipo hasn't even been priced", joined)
        approved = json.loads((ROOT / 'src' / 'anthropic-approved-media.json').read_text())
        self.assertEqual(approved['assets'], [])

    def test_offline_media_packet_is_research_not_clearance(self):
        def network_must_not_run(*args, **kwargs):
            raise AssertionError('No network in offline test')
        packet = build(self.episode, self.plan, use_commons=False,
                       search_fn=network_must_not_run)
        self.assertGreaterEqual(len(packet['assets']), 6)
        self.assertEqual({a['rights_status'] for a in packet['assets']}, {'unreviewed'})
        self.assertEqual({a['factual_status'] for a in packet['assets']}, {'unverified'})
        self.assertTrue(release_issues(packet))

    def test_every_scene_contains_original_media_fallback(self):
        for scene_id, research in self.plan['scenes'].items():
            with self.subTest(scene=scene_id):
                self.assertTrue(research['fallback'].strip())


if __name__ == '__main__':
    unittest.main()
