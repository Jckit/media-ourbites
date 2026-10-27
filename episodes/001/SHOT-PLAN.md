# Pilot 001 — Same shares. Smaller slice?

Draft direction. Brand: Ourbites. Provisional character: hybrid. 60 seconds, vertical 1080 × 1920. This plan is not yet implemented in the renderer; the existing composition still uses generic diagrams.

| Time | Narration purpose | Animation and information |
|---|---|---|
| 0–7s | Hook: same share count, lower ownership | Host holds a card labeled YOUR 10 SHARES. Ownership label changes from 10% to a question mark. No Tesla/SpaceX transaction is depicted as completed. |
| 7–18s | What the filing actually says | Two company name cards remain separated. Dotted connector with POSSIBLE appears. Small filing card: Tesla filing, 21 Oct 2026. Host points; no completed handshake or merger checkmark. |
| 18–30s | Illustrate dilution | Persistent EXAMPLE — NOT DEAL TERMS label. Show 20 tokens, each explicitly representing 5 shares; two teal tokens are the viewer's 10 shares. Add five orange tokens representing 25 newly issued shares. Viewer tokens stay unchanged. Labels: 10/100 = 10%, then 10/125 = 8%. Never show 10 tokens while claiming they individually represent 100 shares. |
| 30–41s | Distinguish ownership from value | Keep the 8% visible while company outline expands to include an acquired asset. Do not animate portfolio value falling or rising: neither follows from ownership percentage alone. Host moves from surprise to questioning. |
| 41–52s | Explain what to evaluate | Reveal PRICE, OWNERSHIP, APPROVALS sequentially. Each replaces the previous focal object rather than competing with three text panels. |
| 52–60s | One takeaway | Same 10-share card beside a larger company outline and question mark. Title: A SMALLER SLICE OF WHAT? End with small Ourbites wordmark; no long end card. |

## Reuse requirements

Light banter revision: on "Keep the confetti in the drawer," the host briefly closes a tiny confetti drawer while POSSIBLE stays visible. After the 8% calculation has settled, a dry eyebrow raise accompanies "Rude." Resume a curious expression for the value explanation so the joke does not imply a financial loss. These are proposed animation beats, not implemented effects.

Character: head, body, arms, hands and legs as separate SVG groups. Three initial poses: neutral, point and question. Fixed colors: navy #142B38, cream #F4F0E6, teal #087E83; orange #E97F48 for new issuance. Diagram geometry and text remain code-native and editable.

Keep key diagram labels above the platform-control area. Caption placement must be checked against actual mobile UI and should not cover the ownership tokens. Animate transforms using Remotion frame functions; no random rerender-dependent motion.

## Evidence and review

Re-read Tesla's Q3 filing, Part II Item 5, on 27 October 2026. This supports what Tesla disclosed, not a prediction of a transaction. The one-publisher warning remains intentional: the original filing is authoritative for its own disclosure. Justin must review that exception; no receipt has been issued. Recheck news and the filing before publication.

Source: https://www.sec.gov/Archives/edgar/data/1318605/000162828026066775/tsla-20260930.htm
