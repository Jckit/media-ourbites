"""Regression tests for the exact frame-count contract in caption QA."""
import unittest

from scripts.verify_caption_windows import expected_frame_count


class CaptionFrameCountTests(unittest.TestCase):
    def test_legacy_manifest_duration_still_requires_500_frames(self):
        self.assertEqual(expected_frame_count(18.298666666666666), 500)

    def test_trimmed_composition_explicitly_requires_475_frames(self):
        self.assertEqual(expected_frame_count(18.298666666666666, 475), 475)

    def test_invalid_expected_frame_counts_are_rejected(self):
        for invalid in (0, -1, 1.5, True, "475"):
            with self.subTest(invalid=invalid):
                with self.assertRaises(ValueError):
                    expected_frame_count(18.298666666666666, invalid)


if __name__ == '__main__':
    unittest.main()
