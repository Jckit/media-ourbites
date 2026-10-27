"""Isolated tests: no internet, downloads or rendering."""
import copy
import unittest

from asset_research import (ResearchError, build, commons_candidate,
                            markdown, release_issues, validate_plan)

EPISODE = {
    "id": "ourbites-test", "title": "Test business story",
    "scenes": [{"id": "hook", "title": "Who got the shares?", "claim_ids": ["ownership"]},
               {"id": "explain", "title": "Explain", "claim_ids": ["ownership", "company"]}],
}
PLAN = {
    "episode_id": "ourbites-test",
    "scenes": {"hook": {"fallback": "Draw original ownership cards",
                        "leads": [{"url": "https://example.com/investor-relations", "title": "Company report"}],
                        "commons_searches": ["Example company founder"]},
               "explain": {"fallback": "Draw an original chart"}},
}
PAGE = {"pageid": 42, "title": "File:Company_event.jpg", "imageinfo": [{
    "mime": "image/jpeg", "descriptionurl": "https://commons.wikimedia.org/wiki/File:Company_event.jpg",
    "url": "https://upload.wikimedia.org/example.jpg",
    "extmetadata": {"LicenseShortName": {"value": "CC BY-SA 4.0"},
                    "Artist": {"value": "<a>Example Creator</a>"},
                    "Attribution": {"value": "Credit Example Creator"}}}]}


class AssetResearchTests(unittest.TestCase):
    def test_offline_never_queries_remote(self):
        def fail(*args):
            raise AssertionError("network must not be used")
        packet = build(EPISODE, PLAN, search_fn=fail)
        self.assertEqual(len(packet["assets"]), 1)
        self.assertEqual(packet["search_log"][0]["status"], "skipped_offline")
        self.assertEqual(packet["assets"][0]["rights_status"], "unreviewed")
        self.assertEqual(packet["assets"][0]["selected_for_final"], False)
        self.assertIn("not assessed", markdown(packet, EPISODE))

    def test_commons_discovery_never_marks_asset_licensed(self):
        packet = build(EPISODE, PLAN, use_commons=True, search_fn=lambda _q, _limit: [PAGE])
        self.assertEqual(len(packet["assets"]), 2)
        item = packet["assets"][1]
        self.assertEqual(item["creator"], "Example Creator")
        self.assertEqual(item["license_hint"], "CC BY-SA 4.0")
        self.assertEqual(item["rights_status"], "unreviewed")
        self.assertEqual(item["factual_status"], "unverified")
        self.assertEqual(item["claim_ids"], ["ownership"])

    def test_wrong_episode_or_unknown_claim_rejected(self):
        bad = copy.deepcopy(PLAN)
        bad["episode_id"] = "wrong"
        with self.assertRaises(ResearchError):
            validate_plan(EPISODE, bad)
        bad = copy.deepcopy(PLAN)
        bad["scenes"]["hook"]["leads"][0]["claim_ids"] = ["made-up"]
        with self.assertRaises(ResearchError):
            validate_plan(EPISODE, bad)

    def test_failed_remote_search_recorded_not_hidden(self):
        def fail(_q, _limit):
            raise OSError("network down")
        packet = build(EPISODE, PLAN, use_commons=True, search_fn=fail)
        self.assertEqual(len(packet["warnings"]), 1)
        self.assertEqual(packet["search_log"][0]["status"], "failed")

    def test_non_image_candidates_discarded(self):
        wrong = copy.deepcopy(PAGE)
        wrong["imageinfo"][0]["mime"] = "application/pdf"
        self.assertIsNone(commons_candidate("hook", ["ownership"], "fallback", "query", wrong))

    def test_empty_selection_not_misreported_as_cleared(self):
        packet = build(EPISODE, PLAN)
        self.assertTrue(any("No assets selected" in issue for issue in release_issues(packet)))

    def test_final_candidate_without_rights_fails_closed(self):
        packet = build(EPISODE, PLAN)
        packet["assets"][0]["selected_for_final"] = True
        issues = release_issues(packet)
        self.assertTrue(any("rights not cleared" in issue for issue in issues))
        self.assertTrue(any("factual provenance" in issue for issue in issues))

    def test_properly_reviewed_asset_passes_preflight_only(self):
        packet = build(EPISODE, PLAN)
        item = packet["assets"][0]
        item.update(selected_for_final=True, rights_status="licensed", factual_status="verified",
                    reviewer="Human reviewer", review_date="2026-10-27", local_file="private/scene.mp4",
                    sha256="a" * 64, permission_evidence="signed license 123")
        self.assertEqual(release_issues(packet), [])

    def test_deduplicate_same_scene_source(self):
        plan = copy.deepcopy(PLAN)
        plan["scenes"]["hook"]["leads"].append(copy.deepcopy(plan["scenes"]["hook"]["leads"][0]))
        self.assertEqual(len(build(EPISODE, plan)["assets"]), 1)


if __name__ == "__main__":
    unittest.main()
