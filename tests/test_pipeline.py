import copy
from datetime import datetime, timezone
import json
from pathlib import Path
import tempfile
import unittest

from pipeline import ReviewError, approve, load, validate, verify

EXAMPLE = Path(__file__).resolve().parents[1] / "examples" / "merger.json"
NOW = datetime(2026, 10, 26, 23, tzinfo=timezone.utc)


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.episode = load(EXAMPLE)

    def test_single_source_is_flagged(self):
        self.assertTrue(any("one publisher" in x for x in validate(self.episode, NOW)))

    def test_unsourced_fact_fails(self):
        self.episode["claims"][0]["source_ids"] = []
        with self.assertRaises(ReviewError):
            validate(self.episode, NOW)

    def test_stale_source_fails(self):
        self.episode["sources"][0]["checked_at"] = "2026-10-01T12:00:00+00:00"
        with self.assertRaises(ReviewError):
            validate(self.episode, NOW)

    def test_future_check_fails(self):
        self.episode["sources"][0]["checked_at"] = "2027-10-01T12:00:00+00:00"
        with self.assertRaises(ReviewError):
            validate(self.episode, NOW)

    def test_unknown_claim_fails(self):
        self.episode["scenes"][0]["claim_ids"] = ["invented"]
        with self.assertRaises(ReviewError):
            validate(self.episode, NOW)

    def test_duplicate_claim_fails(self):
        self.episode["claims"].append(copy.deepcopy(self.episode["claims"][0]))
        with self.assertRaises(ReviewError):
            validate(self.episode, NOW)

    def test_invalid_timing_fails(self):
        for value in (0, -1, float("nan"), True):
            self.episode["scenes"][0]["duration"] = value
            with self.assertRaises(ReviewError):
                validate(self.episode, NOW)

    def test_approval_cannot_survive_script_or_media_changes(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent) as folder:
            path = Path(folder) / "episode.json"
            receipt = Path(folder) / "approval.json"
            media = Path(folder) / "draft.mp4"
            self.episode["sources"][0]["checked_at"] = datetime.now(timezone.utc).isoformat()
            path.write_text(json.dumps(self.episode), encoding="utf-8")
            media.write_bytes(b"test media fixture")
            approve(path, receipt, "Test reviewer", "Test fixture, not real approval", media)
            verify(path, receipt, media)
            media.write_bytes(b"modified")
            with self.assertRaises(ReviewError):
                verify(path, receipt, media)
            self.episode["title"] = "Changed headline"
            path.write_text(json.dumps(self.episode), encoding="utf-8")
            with self.assertRaises(ReviewError):
                verify(path, receipt)

    def test_editorial_approval_does_not_approve_media(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent) as folder:
            path, receipt, media = [Path(folder) / x for x in ("episode.json", "receipt.json", "video.mp4")]
            self.episode["sources"][0]["checked_at"] = datetime.now(timezone.utc).isoformat()
            path.write_text(json.dumps(self.episode), encoding="utf-8")
            media.write_bytes(b"fixture")
            approve(path, receipt, "Test reviewer", "Test only")
            with self.assertRaises(ReviewError):
                verify(path, receipt, media)


if __name__ == "__main__":
    unittest.main()
