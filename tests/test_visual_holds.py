"""Pure interval-contract tests; actual ffmpeg behavior is exercised on a render."""
import unittest
from scripts.report_visual_holds import find_spans


class VisualHoldsTest(unittest.TestCase):
    def test_intervals_include_both_endpoint_frames(self):
        changes = [0, 0, 200, 0, 0, 0, 200]
        self.assertEqual(find_spans(changes, 30, 10, 0.06), [
            {'start_frame': 0, 'end_frame': 2, 'duration_seconds': 0.067},
            {'start_frame': 3, 'end_frame': 6, 'duration_seconds': 0.1},
        ])

    def test_short_pauses_and_motion_are_not_reported(self):
        self.assertEqual(find_spans([0, 200, 0, 200], 30, 10, 0.1), [])
        self.assertEqual(find_spans([100] * 100, 30, 10, 1), [])

    def test_tail_hold_and_threshold(self):
        self.assertEqual(find_spans([300, 10, 10, 10], 2, 10, 1.5), [
            {'start_frame': 1, 'end_frame': 4, 'duration_seconds': 1.5},
        ])


if __name__ == '__main__':
    unittest.main()
