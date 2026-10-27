# Pilot 002 — Anthropic's $80 billion loss isn't what you think

**Status:** original editorial draft; primary S-1 verified 27 October 2026. **Not approved, narrated, rights-cleared or published.** 82-second *estimated* 9:16 Remotion storyboard. As a draft, timings will change after actual human-selected narration. Script and claim ledger: [episode.json](episode.json). Candidate media: [media-plan.json](media-plan.json); copyright rules: [../../research/VISUAL-EVIDENCE.md](../../research/VISUAL-EVIDENCE.md). Dedicated composition: `AnthropicShort` (rather than hardcoded `BusinessShort` Tesla visuals).

## Original narrative, not a copy of other creators

**Working title:** Anthropic's $80 Billion Loss Isn't What You Think

**Viewer question:** How can a rapidly growing company report an enormous net loss but a comparatively modest operating loss, and what should IPO investors actually assess?

**Joseph Carlson reference:** [Anthropic Just Released Their Financials… The Numbers Are Insane](https://share.snipd.com/episode/bb0901e4-0a1d-4124-b1a5-6a9b602bb86f), October 26, 2026 (~29 minutes). Carlson emphasizes the revenue scale, improving operating leverage, and why unpriced IPO valuation still matters; [public third-party episode summary](https://www.kazuha.ai/sources/the-joseph-carlson-show/posts/anthropic-just-released-their-financials-the-numbers-are-insane) is useful for identifying his argument but **not an independent financial primary source**. Ourbites has its own narration, math, and visual architecture; do not copy his words, images, audio, or copyrighted clips. If using a paraphrased analytical idea, validate it directly against the S-1.

## Shot-by-shot plan

| Scene / time | Editorial purpose | Implementable Remotion visual | Real media candidate — research only |
| --- | --- | --- | --- |
| **hook, 0–8s** | Punchy contradiction: $80.75B net loss vs event of public S-1 | Hero headline `PROPOSED IPO`; counter-reveal `NET LOSS: -$80.75B`, period `H1 2026`; **not** cash spending | Official [Anthropic filing announcement](https://www.anthropic.com/news/s1-sec) or SEC [filing](https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm); screenshot requires review |
| **growth, 8–21s** | Explain revenue growth in equal periods | Two coded bars from `1.163` vs `16.286` USD billions; label both `SIX MONTHS ENDED JUN 30`; animated `14.0×`; avoid annualization | Real product context: [Claude channel video, July 2](https://www.youtube.com/watch?v=MhfnicQVkgY) — **uncleared**, can be swapped later |
| **operations, 21–34s** | Separate real operations from reported net loss | Two stacked numerical cards: `OPERATING LOSS -$0.693B` vs `NET LOSS -$80.748B`. Host eyebrow reaction after math settles | SEC statement/table, or original typography |
| **accounting, 34–55s** | Show causal mechanism rather than dump figures | Original financial waterfall: operating `-$0.693B` → convertible/related fair-value `-$72.388B` → other expense `-$8.757B` → interest `+$1.111B` → tax `-$0.021B` = `-$80.748B`. Reveal the major step first. **Footnote**: a financing remeasurement is not identical to cash spent | SEC statements and fair-value note, cited; no fake trading video |
| **cost, 55–68s** | Strong counterpoint: accounting charges aren't the whole economic story | Cost card `COMPUTE & INFRASTRUCTURE: $8.945B`, **H1 2026 EXPENSE**, with animated data-center schematic; not claimed cash burn | [CBS CEO interview (September 13)](https://www.youtube.com/watch?v=hQR_VJF6ukk) as authentic CEO context; CBS video licensing via Veritone, **not approved** |
| **payoff, 68–82s** | Make question durable: IPO price vs business economics | `GROWTH` / `REAL COSTS` / `IPO PRICE UNKNOWN` spatial relation, then final `WHAT WILL SUSTAIN?`. Avoid forward stock-price forecast | Anthropic [official announcement](https://www.anthropic.com/news/s1-sec); filed terms not priced |

Remotion should be deterministic and mobile-readable: warm cream background, navy typography, muted teal growth indicators, orange for negative earnings/expense; source text visible only when needed. No reused TV/news footage is required for first animation test. Keep voice and captions over transitions in a separate layer once actual audio is ready.

## Fact checks before approval

1. **Filing timeline:** public S-1 filed October 26; IPO **proposed**, listing **not confirmed**. Check [official announcement](https://www.anthropic.com/news/s1-sec) on publication day for amended terms.
2. **Period comparison:** compare H1 2025 `$1.163B` to H1 2026 `$16.286B`, about `14.0×`, not to the 2025 full-year figure.
3. **Loss lines:** operating `-$0.693B`, fair-value change `-$72.388B`, other net expense `-$8.757B`, interest income `+$1.111B`, tax provision `-$0.021B`, total `-$80.748B`. Each is from the S-1 income statement. **Do not** attribute the entire gap solely to the fair-value line.
4. **Interpretation:** `-$72.388B` is a reported fair-value remeasurement on convertible notes and related instruments, **not an equivalent operating cash spend**. This does not mean Anthropic has no financing obligations or losses.
5. **Compute line:** `$8.945B` is recorded compute/infrastructure **expense** in H1 2026, not a claim about new datacenter capital expenditures.
6. **Rhetorical Korea comparison:** not in the script. Rumored company valuation ≠ IPO proceeds. South Korea's **combined** KOSPI + KOSDAQ market is substantially larger than the rumored company valuation; **KOSDAQ alone** is smaller. In any future video this must be sourced to a matched date and FX rate, and the IPO valuation is **not yet priced**.
7. **Secondary perspective:** Joseph Carlson's investing thesis is not a substitute for company disclosures. Avoid investment advice; test assumptions separately.
8. **Publishing:** third-party footage remains **unreviewed**. Human Gates B/C required. No approval receipt should be generated by automation.

## Voice-production handoff

Audition A/E/F/H/I and Chatterbox G where a local render exists; consult [../../auditions/VOICE-SHORTLIST.md](../../auditions/VOICE-SHORTLIST.md). The real WAVs are locally ignored in Git, so there is no justified winning voice yet. Have a human hear full-script pronunciations of **Anthropic, IPO, convertible, valuation, billion, operating loss**. Generate final approved narration without extra arbitrary time compression; use measured clip lengths to replace the 82-second storyboard estimates and align captions with actual word timings.

### Editorial publishability checklist

- [ ] Justin approves narrative and SEC interpretation.
- [ ] Latest prospectus/offer status rechecked on publication day.
- [ ] 2025/2026 periods and all quantities recomputed.
- [ ] Candidate real media factually matched to event and legally cleared (or use original graphics).
- [ ] Final narrator selected and audio/word alignment measured.
- [ ] Final mobile composition and sound inspected, licensed music/audio confirmed.
- [ ] Exact final master and metadata approved; release/manual publication only afterward.

## Recurring protagonist and illustrated real-person layer (2026-10-27)

The Anthropic storyboard **now reuses the same Ourbites hybrid SVG host** from `OwnershipProof` in three story beats: **hook** (skeptical reaction to the $80B headline), **operations** (thinking/asking about the income statement mismatch), and **payoff** (pointing toward the lasting financial question). The host has a stable look and is not Dario Amodei. The exact visual design and position are still **provisional until human review of the new rendered scenes**. Keep the financial cards and narration legible; move/resize the character if it crowds them.

[Dario Amodei's stylized character profile](../../characters/dario-amodei/profile.json) and [official image reference record](../../characters/dario-amodei/references.md) are ready for a **future** approved likeness. Consider Dario in `growth` and `cost` beats if he contributes context. Do **not** render the generated chat concept as a final identity, or claim he said the script's lines; the current render has no named real-person illustrations. All depicted-character approval and real footage rights rules: [research/CHARACTER-ASSETS.md](../../research/CHARACTER-ASSETS.md) and [research/VISUAL-EVIDENCE.md](../../research/VISUAL-EVIDENCE.md).

Check: `python scripts/validate_character_cast.py episodes/002/episode.json`. Final release `--release` intentionally rejects the current provisional host design until a human-approved version/hash is recorded and reviewed.
