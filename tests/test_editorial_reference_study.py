"""80/20 editorial-first motion candidate: structural guardrails, not art approval."""
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
SCENE = (ROOT / "src/framework/EditorialReferenceStudy.tsx").read_text(encoding="utf-8")
INDEX = (ROOT / "src/index.tsx").read_text(encoding="utf-8")
STYLE = (ROOT / "styles/OURBITES-HYBRID-EDITORIAL.md").read_text(encoding="utf-8")

class EditorialReferenceStudyTests(unittest.TestCase):
    def test_preview_is_isolated_from_narrated_episodes(self):
        self.assertIn("EDITORIAL_REFERENCE_FRAMES=300", SCENE)
        self.assertRegex(INDEX, r'id="EditorialReferenceStudy"[^\n]+durationInFrames=\{EDITORIAL_REFERENCE_FRAMES\}')
        self.assertIn("SILENT", SCENE)
        self.assertNotIn("<Audio", SCENE)
        self.assertNotIn("staticFile(", SCENE)
        self.assertIn("not a polished episode", SCENE)

    def test_graphic_story_is_original_and_numerically_consistent(self):
        self.assertIn("120 - costs 85 = 35", SCENE)
        self.assertIn("120 SALES", SCENE)
        self.assertIn("85 COSTS", SCENE)
        self.assertEqual(120-85,35)
        self.assertIn("OurbitesHost", SCENE)
        self.assertNotIn("ShopBoard", SCENE)
        self.assertNotIn("Notebook", SCENE)

    def test_kinetic_grammar_is_not_one_global_slide_transition(self):
        self.assertIn("const path=", SCENE)
        self.assertIn("Easing.bezier(", SCENE)
        self.assertIn("timing.quick", SCENE)
        self.assertIn("timing.travel", SCENE)
        self.assertIn("timing.reveal", SCENE)
        self.assertIn("const resultPos=path(", SCENE)
        self.assertIn("const heroA=path(", SCENE)
        self.assertNotIn("Math.random(", SCENE)
        self.assertNotIn("requestAnimationFrame(", SCENE)
        self.assertNotIn("setInterval(", SCENE)
        self.assertNotIn("scale('+(page.w/1080)", SCENE)

    def test_revised_direction_is_explicit_and_requires_real_visual_review(self):
        self.assertIn("80% supplied reference, 20% original", STYLE)
        self.assertIn("technically correct Bézier curve", STYLE)
        self.assertIn("natural speed", STYLE)

if __name__ == "__main__":
    unittest.main()
