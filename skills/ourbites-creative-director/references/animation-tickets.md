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
