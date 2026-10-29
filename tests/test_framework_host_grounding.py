"""FW-09 regression tests: shared scene floor must track the actual hybrid host feet."""
import contextlib
import io
import unittest

from scripts.check_framework_layout import KIT, PREVIEW, HOST, STAGE, check_sources


class HostGroundingContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.kit = KIT.read_text(encoding="utf-8")
        cls.preview = PREVIEW.read_text(encoding="utf-8")
        cls.host = HOST.read_text(encoding="utf-8")
        cls.stage = STAGE.read_text(encoding="utf-8")

    def verify(self, kit=None, host=None, stage=None):
        with contextlib.redirect_stdout(io.StringIO()):
            check_sources(
                self.kit if kit is None else kit,
                self.preview,
                self.host if host is None else host,
                self.stage if stage is None else stage,
            )

    def test_current_host_feet_match_floor_anchor(self):
        self.verify()

    def test_moving_only_one_foot_fails(self):
        host = self.host.replace("L135 475 H105", "L135 476 H105")
        self.assertNotEqual(host, self.host)
        with self.assertRaisesRegex(AssertionError, "feet must be level"):
            self.verify(host=host)

    def test_moving_both_feet_without_anchor_fails(self):
        host = self.host.replace("L135 475 H105", "L135 476 H105").replace(
            "L228 475 H257", "L228 476 H257"
        )
        self.assertNotEqual(host, self.host)
        with self.assertRaisesRegex(AssertionError, "feet-to-floor anchor disagrees"):
            self.verify(host=host)

    def test_moving_floor_without_anchor_fails(self):
        kit = self.kit.replace("floorY: 1420", "floorY: 1421")
        self.assertNotEqual(kit, self.kit)
        with self.assertRaisesRegex(AssertionError, "feet-to-floor anchor disagrees"):
            self.verify(kit=kit)

    def test_changing_actor_size_without_anchor_fails(self):
        kit = self.kit.replace("actorSize: 430", "actorSize: 431")
        self.assertNotEqual(kit, self.kit)
        with self.assertRaisesRegex(AssertionError, "feet-to-floor anchor disagrees"):
            self.verify(kit=kit)

    def test_stage_scale_must_match_host_viewbox(self):
        stage = self.stage.replace("height={size*520/360}", "height={size*521/360}")
        self.assertNotEqual(stage, self.stage)
        with self.assertRaisesRegex(AssertionError, "height ratio"):
            self.verify(stage=stage)


if __name__ == "__main__":
    unittest.main()
