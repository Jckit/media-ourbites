# Provenance and scope

Upstream: https://github.com/heygen-com/hyperframes
Pinned commit: `af0d68d612ebd9c419f27d9ebc8068512667bae4` (inspected 2026-11-01).
License: Apache-2.0; full upstream [LICENSE](../LICENSE). Copyright notices are retained in that license. No root NOTICE or NOTICE for the selected skill sources was found at this revision. No upstream assets are copied.

Derived sources (links pinned):
- [motion.md](https://github.com/heygen-com/hyperframes/blob/af0d68d612ebd9c419f27d9ebc8068512667bae4/skills/hyperframes/references/motion.md)
- [look.md](https://github.com/heygen-com/hyperframes/blob/af0d68d612ebd9c419f27d9ebc8068512667bae4/skills/hyperframes/references/look.md)

Modified by Ourbites: selected, paraphrased and translated into Remotion guidance and original examples; removed HTML/GSAP runtime instructions, branding overrides, timing quotas and unrelated infrastructure. This adapter is not the upstream skill or a compatibility layer.

At this pin, `hyperframes-animation`, `hyperframes-keyframes` and `hyperframes-creative` are not standalone skill directories. Their relevant topics are consolidated under `skills/hyperframes`. We adapt motion curves, choreography, contact, masks, camera continuity and composition; existing Ourbites skills already own episode structure, identity, paper treatment and review gates.

Evaluated but excluded:
- `docs/guides/motion-graphics.mdx`: short-piece prompting/output advice mostly duplicates existing production guidance; its blanket unnarrated definition is inappropriate for Ourbites explainers.
- `hyperframes-registry`: HTML/GSAP source blocks and dependency/config installation duplicate our curated Remotion catalog. No meaningful compatible pattern justified installing it.
- Core installer/catalog, CLI, renderer, templates, media-use, reverse-video and Remotion-to-HyperFrames migration: not required. Upstream project-local skill installation can collide with an existing tracked skills directory; registry add writes compositions and may create hyperframes.json. Neither installer was run.

Installed destination: only `.agents/skills/ourbites-motion-craft/`, discoverable project-local Codex skill. Existing `skills/` is extended only with routing links. No global skill overwrite, package dependency, lockfile or render pipeline change. Updates are deliberate: compare these two pinned upstream sources and license before revising; never auto-sync the catalog.
