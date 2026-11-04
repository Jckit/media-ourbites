"""FW-07B synthetic style candidate: invariants, not aesthetic approval."""
import pathlib
import re
import unittest

ROOT=pathlib.Path(__file__).resolve().parents[1]
SCENE=(ROOT/"src/framework/HybridEditorialPrototype.tsx").read_text(encoding="utf-8")
INDEX=(ROOT/"src/index.tsx").read_text(encoding="utf-8")
STYLE=(ROOT/"styles/OURBITES-HYBRID-EDITORIAL.md").read_text(encoding="utf-8")

class HybridEditorialPrototypeTests(unittest.TestCase):
    def test_isolated_ten_second_silent_composition(self):
        self.assertIn("HYBRID_EDITORIAL_FRAMES = 300", SCENE)
        self.assertRegex(INDEX,r'id="HybridEditorialPrototype"[^\n]+durationInFrames=\{HYBRID_EDITORIAL_FRAMES\}')
        self.assertIn("SYNTHETIC ILLUSTRATION", SCENE)
        self.assertIn("SILENT", SCENE)
        self.assertNotIn("<Audio", SCENE)

    def test_no_illustrated_claim_is_spoken_as_company_fact(self):
        self.assertIn("value={120}", SCENE)
        self.assertIn("value={85}", SCENE)
        self.assertEqual(120-85,35)
        self.assertIn("120 sales − 85 costs = 35 left.", SCENE)
        self.assertNotIn("Anthropic", SCENE)
        self.assertNotIn("Dario", SCENE)

    def test_preserve_ourbites_host_and_shared_prop_anchor(self):
        self.assertIn("StageActor", SCENE)
        self.assertIn("const hand={x:actorX+337*485/360,y:actorY+163*485/360};", SCENE)
        self.assertIn("const folioGrip=point(hand,{x:635,y:1190},lift);", SCENE)
        self.assertIn("clipPath id={clipId}", SCENE)
        self.assertIn("Easing.inOut(Easing.cubic)", SCENE)
        self.assertNotIn("Math.random",SCENE)
        self.assertNotIn("requestAnimationFrame",SCENE)

    def test_existing_host_pose_handoffs_are_interpolated(self):
        host=(ROOT/"src/OurbitesHost.tsx").read_text(encoding="utf-8")
        stage=(ROOT/"src/CharacterStage.tsx").read_text(encoding="utf-8")
        self.assertIn("poseFrom={poseChange?.from}",SCENE)
        self.assertIn("poseBlend={hostPoseBlend}",SCENE)
        self.assertIn("const hostGazeX=",SCENE)
        self.assertIn("const leftPath=blending",host)
        self.assertIn("const faceMetrics =",host)
        self.assertIn("poseFrom={poseFrom} poseBlend={poseBlend}",stage)

    def test_canonical_style_requires_user_art_review(self):
        self.assertIn("Human playback/art acceptance precedes",STYLE)
        self.assertIn("No mandatory room",STYLE)
        self.assertIn("No merge, CI result or written contract supplies",STYLE)

if __name__=="__main__":
    unittest.main()
