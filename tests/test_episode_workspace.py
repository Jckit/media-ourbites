import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

from scripts.create_episode_workspace import SHARED, create_workspace


REPO = Path(__file__).resolve().parents[1]


class EpisodeWorkspaceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for relative in SHARED.values():
            target = self.root / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            if relative == "src/framework":
                target.mkdir()
            else:
                target.write_text("shared fixture\n", encoding="utf-8")
        (self.root / ".gitignore").write_text("out/\n", encoding="utf-8")

    def snapshot(self):
        return {p.relative_to(self.root).as_posix(): p.read_bytes() if p.is_file() else None
                for p in self.root.rglob("*")}

    def test_dry_run_is_deterministic_and_writes_nothing(self):
        before = self.snapshot()
        one = create_workspace(self.root, "003", "coffee-subscriptions", dry_run=True)
        two = create_workspace(self.root, "003", "coffee-subscriptions", dry_run=True)
        self.assertEqual(one, two)
        self.assertEqual(before, self.snapshot())
        self.assertEqual(one, create_workspace(self.root, "003", "coffee-subscriptions"))

    def test_two_distinct_episodes_reference_same_libraries(self):
        shared_before = self.snapshot()
        first = create_workspace(self.root, "003", "coffee-subscriptions")
        second = create_workspace(self.root, "004", "warehouse-returns")
        self.assertEqual(first["shared_references"], second["shared_references"])
        self.assertNotEqual(first["planned_inputs"], second["planned_inputs"])
        for workspace in (first, second):
            episode = self.root / "episodes" / workspace["episode_id"]
            self.assertEqual({p.name for p in episode.iterdir()}, {"workspace.json", "PRODUCTION.md"})
            self.assertEqual(json.loads((episode / "workspace.json").read_text()), workspace)
            self.assertEqual(workspace["stage"], "draft")
            for relative in workspace["planned_inputs"].values():
                self.assertFalse((self.root / relative).exists())
            for relative in workspace["local_media"].values():
                self.assertTrue((self.root / relative).is_dir())
        for path, content in shared_before.items():
            if content is not None:
                self.assertEqual((self.root / path).read_bytes(), content)
        self.assertFalse((self.root / "episodes/003/src").exists())

    def test_invalid_ids_and_slugs_leave_no_outputs(self):
        before = self.snapshot()
        for episode_id in ("000", "3", "0003", "../003", "C:/003", "０３３", "003/../004"):
            with self.subTest(episode_id=episode_id), self.assertRaises(ValueError):
                create_workspace(self.root, episode_id, "topic")
        for slug in ("", "../topic", "UPPER", "two words", "a--b", "-topic", "topic/child", "topic\\child", "a" * 65):
            with self.subTest(slug=slug), self.assertRaises(ValueError):
                create_workspace(self.root, "003", slug)
        self.assertEqual(before, self.snapshot())

    def test_existing_id_never_overwritten_even_with_new_slug(self):
        create_workspace(self.root, "003", "coffee-subscriptions")
        before = self.snapshot()
        for dry_run in (False, True):
            with self.assertRaisesRegex(ValueError, "preexisting"):
                create_workspace(self.root, "003", "warehouse-returns", dry_run)
        self.assertEqual(before, self.snapshot())

    def test_existing_media_and_existing_episode_file_refused(self):
        media = self.root / "out/episodes/003"
        media.mkdir(parents=True)
        (media / "original.wav").write_bytes(b"preserve")
        before = self.snapshot()
        with self.assertRaisesRegex(ValueError, "preexisting"):
            create_workspace(self.root, "003", "topic")
        self.assertEqual(before, self.snapshot())
        episode = self.root / "episodes/004"
        episode.parent.mkdir()
        episode.write_text("existing", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "preexisting"):
            create_workspace(self.root, "004", "topic")
        self.assertEqual(episode.read_text(), "existing")

    def test_linked_parent_rejected(self):
        external = self.root / "external"
        external.mkdir()
        try:
            (self.root / "episodes").symlink_to(external, target_is_directory=True)
        except OSError as error:
            self.skipTest(f"Host does not permit directory symlink: {error}")
        with self.assertRaisesRegex(ValueError, "Linked/reparse"):
            create_workspace(self.root, "003", "topic")
        self.assertEqual(list(external.iterdir()), [])

    def test_missing_shared_reference_or_ignore_rule_refused(self):
        (self.root / ".gitignore").write_text("", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "ignore out/"):
            create_workspace(self.root, "003", "topic")
        (self.root / ".gitignore").write_text("out/\n", encoding="utf-8")
        (self.root / SHARED["host"]).unlink()
        with self.assertRaisesRegex(ValueError, "Missing shared"):
            create_workspace(self.root, "003", "topic")
        self.assertFalse((self.root / "episodes").exists())

    def test_real_git_rules_ignore_media_but_not_episode_config(self):
        if not shutil.which("git"):
            self.skipTest("Git unavailable")
        for relative, expected in (("out/episodes/003/assets/originals/logo.png", 0),
                                   ("out/episodes/004/renders/draft.mp4", 0),
                                   ("episodes/003/workspace.json", 1)):
            result = subprocess.run(["git", "check-ignore", "--no-index", "-q", relative], cwd=REPO)
            self.assertEqual(result.returncode, expected, relative)

    def test_cli_runs_from_another_directory_and_dry_run_has_no_writes(self):
        script = self.root / "scripts/create_episode_workspace.py"
        script.parent.mkdir()
        shutil.copyfile(REPO / "scripts/create_episode_workspace.py", script)
        before = self.snapshot()
        import sys
        result = subprocess.run([sys.executable, str(script), "--id", "003", "--slug", "example-topic", "--dry-run"],
                                cwd=self.root.parent, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)["action"], "dry-run")
        self.assertEqual(before, self.snapshot())
        for episode_id, slug in (("003", "coffee-subscriptions"), ("004", "warehouse-returns")):
            result = subprocess.run([sys.executable, str(script), "--id", episode_id, "--slug", slug],
                                    cwd=self.root.parent, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout)["action"], "created")


if __name__ == "__main__":
    unittest.main()
