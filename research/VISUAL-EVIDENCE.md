# Visual evidence and real-world media sourcing

Policy added 2026-10-27. Ourbites should feel grounded in **actual companies and events**: research authentic archival photos, official event clips, product demos, executives, office/factory footage, charts and relevant primary-document excerpts alongside every episode's claim ledger. Use original Remotion animation to *explain* what the real footage cannot. A link to a public image/video is **not** clearance to use it.

## Principle: evidence first, then animation

A useful sequence might show: real person or company → official event/announcement or source page → annotated document/number → original visual mechanism → return to real consequence. Real footage creates specificity; original diagrams deliver comprehension. Avoid generic AI office B-roll and unconnected mood footage. When there is no cleared media, use a sourced quotation paraphrase, an original illustration, or a custom diagram instead. Explicitly label dramatizations, reconstructions, and hypothetical numbers. Do not manufacture fake footage of a real event.

## Mandatory visual research packet for each episode

For every meaningful scene, research at least one authentic candidate and a non-infringing fallback before generating visuals. Put records in `episodes/<id>/assets.json` or a similarly versioned episode-specific file; include:

- `id`, `scene_id`, `claim_ids`, `narrative_purpose` — why this asset helps explain the story, not just fills a gap.
- `asset_kind` — photograph | video_clip | official_demo | document_excerpt | chart | original_animation | generated_asset.
- `subject`, `event_date`, `capture_context`, `source_url`, `source_title`, `publisher`, `creator`, `retrieved_at`, `original_locator` (page / timestamp / filing item).
- `candidate_media_url` (when available), `target_start_seconds`, `target_end_seconds`, `in_video_seconds`, `crop_or_annotation_plan`, `on_screen_credit`.
- `rights_status` — **unreviewed | permission_requested | licensed | permitted_public_domain | exception_reviewed | rejected**; `license_url`, `permission_evidence`, `required_attribution`, `territory_restrictions`, `reviewer`, `review_date`, `notes`.
- `factual_status` — **verified | unverified | disputed**. Factual authenticity and legal reusability are distinct decisions.
- `local_file`, `sha256` and exact downloaded/edited version if used; `fallback` and any source correction. Do not treat candidate URLs as approved assets.

Keep a small `shot-list.md` linking individual assets to scene beats. Search terms, official press/IR archives, regulator pages and curated media repositories can be stored to make retrieval repeatable.

## Discovery order

1. Original company website and newsroom, investor-relations presentations, official product videos or recorded presentations; these are **primary leads, not automatic licenses**.
2. Regulator filings and reports for numbers and statements; consider manually recreated **code-native** charts, captioned data cards or narrow reviewed document excerpts. Government hosting does **not** prove third-party exhibits or photos are public domain.
3. Wikimedia Commons or similarly licensed archives: inspect **each file page** for original attribution, creator, license, commercial-use/derivatives terms, and any exceptions. Do not infer license from the platform name.
4. Cleared stock/press assets, properly licensed footage or written publisher permission. Check editorial-only restrictions and scope.
5. Third-party television/news or YouTube clips as *reference research only* unless rights or an applicable copyright exception have been specifically reviewed. A creator's public upload is not necessarily theirs to sublicense.
6. Original Remotion visuals/reconstructions for unlicensed, expensive or impossible-to-film elements.

Never download and republish third-party content merely because it is accessible. Capture metadata and research links first; only obtain production files where authorized. Rights can differ for video, audio track, logos, music, likenesses, screenshots and overlays. Silence or replace uncleared soundtrack when necessary. Keep a copy of permissions/licenses for the version used.

### Copyright and platform distinction

- [YouTube copyright guidance](https://support.google.com/youtube/answer/2797466?hl=en) states that fair use, licensed and Creative Commons content **can still generate** strikes/Content ID disputes. Credit alone, being educational, or taking only seconds does not grant permission.
- [YouTube fair use guidance](https://support.google.com/youtube/answer/9783148?hl=en): fair use is context-specific and ultimately decided by courts; regions vary. No blanket number-of-seconds rule.
- [YouTube channel monetization rules](https://support.google.com/youtube/answer/1311392?hl=en): reused-content review is distinct from copyright permission. Meaningful original commentary and storytelling must be evident; compilations with minimal changes risk monetization even when legally licensed.
- For every `exception_reviewed` entry, document commentary/criticism or news-reporting purpose, portion used, transformation and alternatives, with human/legal review as appropriate. It is not a guaranteed clearance state.

**Release gate:** no unreviewed, permission_requested, rejected or unclear-rights third-party asset in the final master. `exception_reviewed` still requires explicit human signoff. Rights approval never substitutes for editorial fact review.

## Anthropic S-1: concrete source-to-shot candidates (2026-10-27)

This is a **visual research brief, not a ready-to-use media package**. Actual event and financial facts must be checked again before publishing.

| Story beat | Authentic visual candidate (research link) | How to use it editorially | Rights state / fallback |
| --- | --- | --- | --- |
| The event | [Anthropic's October 26 official IPO announcement](https://www.anthropic.com/news/s1-sec) | Present publication date and the fact that this is a **proposed** offering, not an accomplished listing; annotate article header if permitted. | **Unreviewed** company page; fallback: original text card citing it. |
| Regulatory proof | [SEC EDGAR official S-1 filing index](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/0001628280-26-067168-index.htm) and [full S-1](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm) | Zoom the precise filing section or recreate sourced figures; preserve document context and version. | **Unreviewed** excerpt rights; fallback: manually typeset numerical callouts with citation. |
| Growth | S-1 statements of operations (the filing above) | Source accurate 2024, 2025 and H1 2026 revenues; distinguish **six-month** from annual figures and visualize chart in Remotion. | Original code-drawn chart is the fallback and preferred final asset. |
| The accounting puzzle | S-1 statements of operations and financing notes | Visually separate operating loss, non-operating fair-value effects and net loss; do **not** conflate net loss with cash burned. | Original source-derived diagram, subject to factual review. |
| Founding and product | [Anthropic newsroom](https://www.anthropic.com/news) / [official YouTube search](https://www.youtube.com/results?search_query=Anthropic+official+Claude+demo) | Research dated genuine Claude releases, demonstrations and interviews; only put specific videos in the final shot list after verifying publisher and timestamp. | **Not a cleared video**. Fallback: original Claude interface concept/feature timeline without fabricated screenshots. |
| Contemporary coverage | [AP report on the proposed IPO](https://apnews.com/article/ca2f4c282bef3201a392e59e3df2300c) | Find corroboration and candidate broadcast/photo assets; do not assume AP footage/photos may be reused from an article link. | **Permission required or exception review**; fallback: paraphrased sourced statement + code-native visual. |

Possible angle: **"How can a fast-growing AI company report a huge net loss while its operating loss is dramatically smaller?"** Establish the exact figures and causes from the filed document; no invented valuations, guaranteed IPO date, or implied share-price prediction. Review economic mechanism rather than only reacting to the $80B headline.

### A practical scene-mix for the pilot (proposed, not a quota)

- 0–5 seconds: a real official source/event and a credible contradiction, or an original animated hook if no cleared footage.
- 5–15 seconds: authentic context (product, founder, filing) with provenance/rights checked.
- 15–38 seconds: original Remotion financial visualization and source-derived comparisons; maintain legibility.
- 38–50 seconds: actual constraints/risks from the filing, supported by text or cleared shots.
- 50–60 seconds: return to the opening question and explain the takeaway; no fabricated conclusion.

Do not force these timings into every script. Prefer a purposeful mix of archival media and explanatory motion to flashy scene switching.

## Reusable pipeline integration

- **Research worker (future):** produce candidate URLs and structured metadata, clearly marked unverified/unreviewed; no automatic download or clearances.
- **Human factual gate:** match each scene and visual implication to evidence and check timestamps / dates.
- **Human rights gate:** verify provenance, license, usage rights and credits before using third-party files.
- **Asset preparation:** authorized downloads into a private local asset store with hash and credits; adapt into standardized `staticFile()` and planned crops; keep licenses/proofs alongside the private asset package, not public repo secrets.
- **Render:** Remotion uses video/stills/documents with original SVG motion and text overlays; compositing does not eliminate original clip rights.
- **Final approval:** review exact asset versions, final cut, credits, audio and disclosures alongside the pre-existing final-media gate.

The pilot must be reviewable and manually cleared; later code may validate required fields and block release if rights statuses are unresolved. No automated publish or rights detector is implemented.
