import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import narration from '../../anthropic-character-audio.json';
import {playbackSpeed} from '../../story-motion';
import {AnthropicEditorialDepth,type AnthropicHostVariant} from '../AnthropicEditorialDepth';

/** 7.1-second, real-episode, matched creative review.
 * Crop begins with the original "But wait" narration and ends after the
 * "Still serious" operating-loss beat. Graphics, figures, timing, WAV and
 * provisional caption cues come unmodified from AnthropicEditorialDepth.
 *
 * Both variants use the SAME frame window and world-space actor anchor.
 * This is a phone-sized design gate only; NOT a new production edit.
 */
const fps=30;
export const HOST_C_EPISODE_START_FRAME=
  Math.round(narration.clips[1].start*fps/playbackSpeed);
export const HOST_C_EPISODE_END_FRAME=
  Math.round((narration.clips[2].start+narration.clips[2].duration)*fps/playbackSpeed);
export const HOST_C_EPISODE_FRAMES=HOST_C_EPISODE_END_FRAME-HOST_C_EPISODE_START_FRAME;

export const HostConceptCEpisodeProof:React.FC<{variant:AnthropicHostVariant}>=
({variant})=><AbsoluteFill>
  <Sequence from={-HOST_C_EPISODE_START_FRAME}>
    <AnthropicEditorialDepth hostVariant={variant}/>
  </Sequence>
</AbsoluteFill>;
