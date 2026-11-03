"""Structural review of reference-first Anthropic motion, not a visual approval."""
import pathlib
import unittest

ROOT=pathlib.Path(__file__).resolve().parents[1]
V2=(ROOT/'src/framework/AnthropicEditorialMotionV2.tsx').read_text()
CASH=(ROOT/'src/framework/motion/BurningCashMetaphor.tsx').read_text()
INDEX=(ROOT/'src/index.tsx').read_text()
BASE=(ROOT/'src/framework/AnthropicEditorialSample.tsx').read_text()

class AnthropicMotionV2Tests(unittest.TestCase):
    def test_new_isolated_composition_and_unmodified_narration_policy(self):
        self.assertIn('ANTHROPIC_MOTION_V2_FRAMES=475',V2)
        self.assertIn('id="AnthropicEditorialMotionV2"',INDEX)
        self.assertIn('id="AnthropicEditorialSample"',INDEX)
        self.assertIn('from={Math.round(clip.start*fps/playbackSpeed)}',V2)
        self.assertIn('playbackRate={playbackSpeed}',V2)
        self.assertIn('anthropicProvisionalWordTrack',V2)
        self.assertIn('PROVISIONAL',V2)
        self.assertIn('WordCaptionOverlay',V2)

    def test_more_animated_visuals_and_human_identity(self):
        self.assertIn('BurningCashMetaphor',V2)
        self.assertIn('DarioIllustration',V2)
        self.assertIn('StageActor',V2)
        self.assertIn('strokeDashoffset',V2)
        self.assertIn('Math.sin',V2)
        self.assertIn('Ourbites',V2.replace('OURBITES','Ourbites'))
        self.assertIn('DARIO · ILLUSTRATION',V2)
        self.assertIn('poseBlend=',V2)
        self.assertIn('identical home position',V2)
        self.assertIn('Math.sin',CASH)
        self.assertIn('seededRange',CASH)

    def test_metaphor_not_an_accounting_claim(self):
        self.assertIn('NOT ACTUAL CASH BURNED',V2)
        self.assertIn('≠ CASH SPENT',V2)
        self.assertIn('financials.h1_2026.operating_loss',V2)
        self.assertIn('financials.h1_2026.convertible_financing_fair_value_change',V2)
        self.assertIn('financials.h1_2026.net_loss',V2)
        self.assertNotIn('Math.random(',V2)
        self.assertNotIn('Math.random(',CASH)
        self.assertIn('export const anthropicProvisionalWordTrack',BASE)

if __name__=='__main__': unittest.main()
