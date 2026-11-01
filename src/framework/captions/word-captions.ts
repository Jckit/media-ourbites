/** Time and semantics for each narrated word. All times are measured in the source audio clock. */
export type WordSemantic = 'normal' | 'person' | 'company' | 'emphasis';
export type WordCaptionCue = {
  text: string;
  startSourceSeconds: number;
  endSourceSeconds: number;
  lineId: string;
  semantic?: WordSemantic;
  /** Local, licensed/verified logo path relative to Remotion public/. No external URLs. */
  logoAsset?: string;
  /** Explicit gate: code cannot approve visual/media rights. */
  logoApproved?: boolean;
};
export type WordCaptionTrack = {
  timingBasis: 'measured-word-alignment';
  words: readonly WordCaptionCue[];
  sourceAudioDurationSeconds: number;
};
const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const wordOpacity = (cue: WordCaptionCue, sourceTimeSeconds: number, fadeSourceSeconds=0.12) =>
  sourceTimeSeconds < cue.startSourceSeconds ? 0 :
  clamp((sourceTimeSeconds - cue.startSourceSeconds) / Math.max(fadeSourceSeconds, 0.001));
export const isSpokenNow = (cue: WordCaptionCue, sourceTimeSeconds: number) =>
  sourceTimeSeconds >= cue.startSourceSeconds && sourceTimeSeconds < cue.endSourceSeconds;

/** Stable authored line group: reserve the full width, reveal each word when spoken. */
export const currentCaptionLine = (words: readonly WordCaptionCue[], sourceTimeSeconds: number, endHold=0.22) => {
  const seen = words.filter(w => w.startSourceSeconds <= sourceTimeSeconds);
  if (!seen.length) return null;
  const lineId = seen[seen.length-1].lineId;
  const line = words.filter(w => w.lineId === lineId);
  const last = line[line.length-1];
  if (sourceTimeSeconds > last.endSourceSeconds + endHold) return null;
  return line;
};

export const validateWordCaptionTrack = (track: WordCaptionTrack) => {
  if (track.timingBasis !== 'measured-word-alignment' ||
      !Number.isFinite(track.sourceAudioDurationSeconds) || track.sourceAudioDurationSeconds <= 0) {
    throw new Error('Real measured source-audio word alignment is required');
  }
  if (!track.words.length) throw new Error('No caption words');
  let previousStart = -1;
  let endedLines = new Set<string>();
  let currentLine = '';
  for (const [i,w] of track.words.entries()) {
    if (!w.text.trim() || !w.lineId || !Number.isFinite(w.startSourceSeconds+w.endSourceSeconds) ||
      w.startSourceSeconds < 0 || w.startSourceSeconds >= w.endSourceSeconds ||
      w.endSourceSeconds > track.sourceAudioDurationSeconds+0.05 || w.startSourceSeconds < previousStart) {
      throw new Error('Invalid measured word cue '+i);
    }
    if (w.lineId !== currentLine) {
      if (endedLines.has(w.lineId)) throw new Error('Caption line must be contiguous');
      if (currentLine) endedLines.add(currentLine);
      currentLine = w.lineId;
    }
    if (w.logoAsset && (w.semantic !== 'company' || !w.logoApproved ||
      /^(https?:|\/|\.\.)/i.test(w.logoAsset) || !/^[\w./-]+$/.test(w.logoAsset))) {
      throw new Error('Company logo needs approved local media provenance');
    }
    previousStart = w.startSourceSeconds;
  }
  return true;
};
