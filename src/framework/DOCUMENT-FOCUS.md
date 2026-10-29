# Document focus prototype (FW-07 subset)

Use DocumentFocus inside a 1080×1920 composition. The caller supplies source-second time, ordered focus/extraction intervals, document rectangle, document-local target rectangle and world-space destination. Content stays outside the primitive. A single target element moves and grows continuously into the excerpt card; there is no detached duplicate at the boundary. The focus outline is illustrative, not optical magnification.

Example:

```tsx
<DocumentFocus
  time={frame / fps * playbackSpeed}
  timing={{focusStart:1.2, focusEnd:2.7, extractStart:4, extractEnd:5.4}}
  document={{x:290,y:320,width:500,height:790}}
  target={{x:30,y:460,width:440,height:100}}
  destination={{x:150,y:510,width:780,height:200}}
  heading="ILLUSTRATIVE RECEIPT"
  lines={['Goods 100','Delivery 8','Total 108','Example amounts']}
  excerpt="Delivery adds 8"
/>
```

Constraints: short single-line headings/excerpts; validate long/localized content separately. Background lines are supporting context, not source citations or narration captions. Coordinates and target containment are explicit; callers own safe placement of the destination and lens travel. No global scene engine, audio generation, hand IK, full handoff or caption alignment is implemented here.

Two separate compositions, PaperFocusFiling and PaperFocusReceipt, vary document proportions, target position, extraction destination, wording and timing. Both are original synthetic silent examples using the unchanged hybrid host. Production Anthropic remains untouched; this is a partial FW-07 prototype, not a completed production adapter.

Render:

```powershell
npx remotion render src/index.tsx PaperFocusFiling out/paper-focus/filing.mp4 --scale=0.4 --concurrency=2
npx remotion render src/index.tsx PaperFocusReceipt out/paper-focus/receipt.mp4 --scale=0.4 --concurrency=2
```

Review focus travel, extraction and adjacent boundary frames, then watch both exports before accepting motion quality. See reviews/viewer/20261029T094712Z-paper-focus.md for coverage.
