# Animation tickets v1

Director decides **what changes and why**; motion design supplies **how it moves**;
Codex/Remotion implements; Viewer compares actual output. This is an authoring
contract and offline validator, not an automatic director, renderer or downloader.

```sh
python scripts/validate_animation_tickets.py episodes/002/animation-tickets.json
python scripts/validate_animation_tickets.py examples/warehouse-animation-tickets.json
```

Paths are repository-relative; timing uses source-audio seconds (convert to rendered
time using the existing 1.1x clock). Geometry uses declared composition pixels.
The [machine-readable schema](animation-tickets.schema.json) is the shape authority.
The standard-library validator implements only its used keywords; unsupported schema
keywords fail rather than silently passing. It additionally checks claims, transitions,
reading regions, timing and declared usable asset references. It does not verify
factual meaning, rights evidence, or subjective art quality.

| Field group | Director/motion decision |
|---|---|
| scenario_kind / episode_manifest | Existing episode claim IDs, or explicitly fictional synthetic claim IDs; no synthetic claims added to a real ledger |
| visual_thesis / takeaway / hero | Recognizable object, start → action → end and new viewer understanding |
| layers / camera / actor | Depth ordering, framing/pivot, host choice, gaze, shared contact anchor and occlusion ownership |
| motion | One point for intentional hold or four cubic spatial controls; independent four-value temporal Bézier; anticipation, settle and overlap intent |
| timing / reading | Named narration cue, source interval, provisional/measured/none word timing, bounded caption/source rectangles and reading hold |
| transition | continuity names the same hero in the next ticket; motivated-cut/clean-cut name next ticket and reason; end has no target |
| assets | Director request ID/purpose/source class, declared rights state, exact local path only if usable, evidence and original fallback |

No external need is valid: empty assets plus an explicit reason. A pending asset
must not be supplied as usable bytes. Declared approval is not an approval receipt;
issue43 must enforce hash-bound rights/provenance before production rendering.
Caption/source rectangles protect reading space in the plan, not automatically in
Remotion. Implementation must apply them and inspect actual collisions.

## Contrasting examples and implementation boundary

- Anthropic `episodes/002/animation-tickets.json`: current PR41 note extraction →
  held note/stamp continuity. Uses existing remeasure/cash-distinction claims;
  binds the existing Dario hand to the transformed note corner. Prior PR41 render
  is evidence from that PR, not a new render from these tickets. The authentic
  wordmark request remains pending with an explicit text fallback.
- Synthetic `examples/warehouse-animation-tickets.json`: parcel/scanner → clean
  cut to stock-release dial. Different objects, time scale and actor framing;
  explicitly fictional, no sourced-company claim. **Not rendered or accepted.**

The same schema/validator handles both with no Anthropic branch. Neither example
is a recipe approval or an executable scene configuration. Remotion implementation
still maps ticket intent to existing components; automatic mapping is not claimed.

## Viewer evidence packet

Before editing, record one hypothesis and a short preserve/improve/replace matrix.
For prior/new/reference clips record paths/hashes, 1x playback and listening coverage,
then timestamped observations of: hook; object/contact change; transitions/framing;
mobile hierarchy; acting/brand assets. Say what regressed. Fail repeated panel growth,
static boards disguised by camera drift, missed hand contact and identical-ease
choreography. A validator pass cannot detect these failures.

For a major replacement, follow the canonical style's two-concept, selected 5–8s
proof gate; an ordinary bounded fix inherits the current idea. This contract batch
changes no shot and therefore does not invent a new animation to demonstrate activity.
Reference-quality calibration remains **open**, as do human playback acceptance and
issue44's distinct-topic visual reuse proof. Keep issue45 open until its remaining
media/proof requirements are met; do not close it on documentation/CI alone.

## M3-A research → director → asset handoff (design audit, 2026-11-16)

Scope: [temporary issue #14](https://github.com/Jckit/media-ourbites/issues/14),
audited at main `9618fbfa1083130e221a30bd5bebca4262c2d1c2`.
This is a manual authoring contract and implementation handoff. No schema, downloader,
renderer or approval behavior changes here. M1 remains owned by its film team;
runtime integration waits for the M1/M2 gates in [ROADMAP](../../../ROADMAP.md).

### Keep each existing record authoritative

| Existing record | Owns | Handoff rule |
|---|---|---|
| `episode.json` | `sources`, `claims`, scene narration and `claim_ids` | Keep the script here; shot plans reference scene IDs rather than maintaining another script. Preserve fact/analysis/scenario distinctions and source check times. |
| `SHOT-PLAN.md` | Shot order, editorial decisions and manual bindings | Add the compact binding table below to the existing plan. An episode scene may have several tickets. |
| `animation-tickets.json` | Hero action, choreography, reading zones, provisional/measured cues and asset requests | Reference manifest claim IDs; do not add undocumented JSON fields to v1 (`additionalProperties: false`). |
| `media-plan.json` → `asset_research.py build` → `assets.json` | Scene-specific discovery leads, candidate provenance, selection and rights records | Preserve candidate IDs and scene/claim references. A discovery timestamp is not evidence that the linked page was read or verified. |
| Reviewed local bytes + renderer-specific registry | Exact file version and media insertion | Convert only supported, reviewed selections; never pass research URLs straight to Remotion. |
| Existing review records/receipts | Separate editorial, rights, voice, film and release decisions | A draft, merged PR or valid ticket cannot supply missing human acceptance. |

The workspace generator's `asset-requirements.json` / `asset-manifest.json` paths
are **planned outputs, not implemented schemas**. Do not create competing ledgers
to satisfy those names. During design, link the actual media plan and candidate
packet in the shot plan; reconcile workspace path references during gated integration.

### Manual binding and missing-data rules

Use one row per ticket/request in the **existing** shot plan:

`ticket ID | manifest scene ID | claim IDs | request ID | packet path + SHA-256 + candidate ID (or NONE) | chosen fallback | unresolved gate`

- Match by explicit IDs and purpose, never array position, filename similarity or
  company name alone. Ticket claims must belong to the bound scene; verify that
  the selected candidate supports the requested purpose, not merely the same company.
  A deliberate cross-scene shot lists its contributing scenes and claim mapping.
- Freeze the exact discovery packet hash alongside the binding table. Curated IDs
  such as `hook-lead-1` are generated from list order: reordering leads changes
  their meaning. Regenerating a packet invalidates its bindings even if the IDs
  remain identical. Re-resolve source URL, locator, purpose and scene before reuse.
  Do not infer persistent identity from these generated IDs.
- Scope a request by ticket ID + request ID. Repeated requests can share one candidate
  after checking each usage; one request may have several discovery candidates,
  but the selection for each usage must be explicit.
- `NONE` means no suitable candidate. Leave ticket `local_path` empty and rights
  `pending`; choose the written original fallback for the provisional preview.
  `original-fallback` describes the chosen treatment, not permission to use a
  third-party file. Preserve factual caveats and review fonts/borrowed material.
- Empty `assets` plus `no_external_assets_reason` is valid when no external media
  serves the explanation. Do not invent a stock-photo requirement.
- Keep missing source evidence, permission, reviewer, hash or word timing explicit.
  Do not refresh `checked_at`, label cues measured, or set approval flags merely
  to pass validation. An original fallback resolves an asset gap, not stale facts.

### Worked mappings using existing inputs

These are compatibility examples, **not new M1 direction or source verification**.

| Ticket / scene | Existing claims and request | Discovery result | Handoff decision |
|---|---|---|---|
| `extract-note` and `stamp-note` → episode 002 `accounting` | `remeasure`, `cash-distinction`; request `anthropic-wordmark` | Offline packet has `accounting-lead-1`, a filing excerpt. It supports research context, not a logo request. No matching logo candidate exists. | Bind both tickets to accounting; candidate `NONE` for the logo. Retain the existing ordinary-text fallback and pending rights. Do not relabel the filing as a cleared wordmark. |
| Episode 001 `mechanism` in `examples/merger-v2.json` | Existing `ownership` claim (`kind: scenario`) and hypothetical ownership diagram; media plan has no leads for this scene | No candidate is required for this original explanation. No episode-001 ticket is fabricated by this audit. | Future director ticket references that existing scenario claim, uses empty `assets`, and explains the original-animation choice. Keep the illustrative label and editorial review. |

Neither example authorizes financial claims, a logo, a new voice or publication.
The warehouse ticket fixture separately validates synthetic direction; it is not
a second accepted business film.

### Renderer compatibility and approval mapping

The current asset packet and `src/anthropic-approved-media.json` are **not interchangeable**.
After human review, a future adapter must explicitly map:

| Research packet | Existing Anthropic insertion registry |
|---|---|
| `scene_id` | `scene_id` (only one insertion per scene currently) |
| `asset_kind` | `kind`: only `photograph` or `video_clip` |
| `local_file` | `file`: reviewed copy under `public/approved/`, registry path starts `approved/` |
| `source_url` | `original_source_url` |
| `on_screen_credit` / `required_attribution` | Human-resolved `credit`, retaining required attribution |
| Review fields and `sha256` | Preserve rights/factual status, reviewer/date, permission evidence and hash of the exact rendered derivative |

Do not coerce `logo`, `document_excerpt` or `official_demo` into supported kinds.
A separately acquired image/video derivative requires its own usage and version
review; cropping/transcoding invalidates the old byte hash.
The ticket's `approved` flag is only a summary: candidate rights must be
`licensed`, `permitted_public_domain` or `exception_reviewed`, factual status
must be `verified`, and actual evidence/bytes must pass review and hash checking.
A nonempty evidence string is not clearance. The insertion verifier requires
`permission_evidence` even when the discovery packet's looser check accepts a
license URL; carry the actual decision/evidence, never fill boilerplate.

### Observed checks and gated implementation work

Offline audit: **8 ticket tests + 9 asset-research tests passed**; the existing
Anthropic and synthetic warehouse tickets each validated (2 tickets each).
Curated builds produced **10 episode-002 and 3 episode-001 candidates**, all
unselected/unreviewed. The two candidate packets correctly report no final
selection. Episode-002 editorial validation stops on stale `anthropic-release`
evidence; no timestamp was changed. The empty Anthropic insertion registry passes
as an original-graphics draft, not as a cleared mixed-media master.
No remote sources rechecked, media downloaded, video rendered, playback watched
or audio heard in this design audit.

Reproduce from the repository root, without `--commons`:

```sh
python -m unittest discover -s tests -p test_animation_tickets.py
python -m unittest discover -s tests -p test_asset_research.py
python scripts/validate_animation_tickets.py episodes/002/animation-tickets.json
python scripts/validate_animation_tickets.py examples/warehouse-animation-tickets.json
python asset_research.py build --episode episodes/002/episode.json --plan episodes/002/media-plan.json --out out/m3-a-audit/002
python asset_research.py build --episode examples/merger-v2.json --plan examples/merger-media-plan.json --out out/m3-a-audit/001
python pipeline.py validate episodes/002/episode.json
python scripts/verify_anthropic_media.py
```

After M1/M2 acceptance, implement the smallest adapter against the accepted inputs:

1. Reconcile scene/request/candidate bindings and workspace path references.
   The current ticket validator only checks claims against the entire episode:
   a probe substituting another scene's valid claim still passes. Add cross-file
   checks for changed packet hashes/reordered leads, unknown scenes, wrong-scene
   claims, ambiguous selections and wrong
   asset purpose; retain human semantic review.
2. Reuse the existing discovery packet and insertion verifier. Research preflight
   checks hash **format**, not actual bytes; ticket preflight checks file existence,
   not its hash. Enforce actual hashes at consumption, supported kinds and explicit
   rights decisions. Reject missing/changed files and unsupported conversions.
3. Keep preview and release outcomes distinct: unresolved external requests use
   explicit original fallbacks; unresolved factual claims remain flagged and block
   production lock. Final review must not succeed merely because external media
   was omitted. Test pending/rejected assets, changed derivatives, missing evidence,
   wrong scene and valid graphics-only previews without bypassing human gates.
4. Exercise a fresh sourced story through the accepted M2 scene kit, then record
   actual film/source/rights evidence. This audit does **not** complete issue #14,
   validate the eventual adapter, or replace M1/M2 acceptance.
