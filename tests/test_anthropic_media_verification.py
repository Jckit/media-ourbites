"""Offline integrity checks for manually cleared episode video/photo files."""
import hashlib
from pathlib import Path
import tempfile
import unittest

from scripts.verify_anthropic_media import verify


class ReviewedMediaTests(unittest.TestCase):
    def test_graphics_only_draft_can_pass_without_media(self):
        self.assertEqual(verify({'assets': []}, {'hook'}, Path('/tmp/absent')), [])
        self.assertTrue(verify({'assets': []}, {'hook'}, Path('/tmp/absent'), require_media=True))

    def test_file_hash_and_review_metadata(self):
        with tempfile.TemporaryDirectory() as d:
            public = Path(d)
            path = public / 'approved' / 'interview.mp4'
            path.parent.mkdir()
            path.write_bytes(b'fictional fixture not real footage')
            item = {'scene_id':'hook','file':'approved/interview.mp4','kind':'video_clip',
                    'rights_status':'licensed','factual_status':'verified',
                    'reviewer':'Test reviewer','review_date':'2026-10-27',
                    'permission_evidence':'Test-only license fixture',
                    'credit':'Test attribution',
                    'original_source_url':'https://example.org/test',
                    'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
            self.assertEqual(verify({'assets':[item]}, {'hook'}, public, require_media=True), [])
            path.write_bytes(b'modified')
            self.assertTrue(any('modified' in x for x in verify({'assets':[item]}, {'hook'}, public)))

    def test_unreviewed_or_unsafe_path_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            public = Path(d)
            item = {'scene_id':'hook','file':'approved/../unsafe.mp4','kind':'video_clip',
                    'rights_status':'unreviewed','factual_status':'unverified',
                    'reviewer':'','review_date':'','permission_evidence':'',
                    'credit':'','original_source_url':'http://example.org',
                    'sha256':'x'}
            errors = verify({'assets':[item]}, {'hook'}, public)
            self.assertTrue(any('rights review' in x for x in errors))
            self.assertTrue(any('unsafe path' in x for x in errors))


if __name__ == '__main__':
    unittest.main()
