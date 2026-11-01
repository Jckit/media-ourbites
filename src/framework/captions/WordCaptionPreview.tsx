import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {WordCaptionOverlay} from './WordCaptionOverlay';
import {validateWordCaptionTrack, type WordCaptionTrack} from './word-captions';

// SILENT TIMING/STYLE FIXTURE ONLY. These word times are synthetic and must
// never be attached to a production narration or presented as measured timing.
export const WORD_CAPTION_PREVIEW_FRAMES = 180;
const EXAMPLE_WORDS = [
  ['Imagine',0.20,0.54,'a','normal'],
  ['Anthropic',0.55,1.18,'a','company'],
  ['announces',1.19,1.66,'a','normal'],
  ['a',1.67,1.80,'a','normal'],
  ['new',1.81,2.10,'a','emphasis'],
  ['product.',2.11,2.72,'a','normal'],
  ['Dario',3.1,3.47,'b','person'],
  ['explains',3.48,3.92,'b','normal'],
  ['the',3.93,4.10,'b','normal'],
  ['business',4.11,4.65,'b','emphasis'],
  ['behind',4.66,5.06,'b','normal'],
  ['it.',5.07,5.50,'b','normal'],
] as const;
const track:WordCaptionTrack={
  timingBasis:'measured-word-alignment',
  // Synthetic source-clock test only. The track type and validator apply to
  // real measured audio but this proof deliberately contains no voice.
  words:EXAMPLE_WORDS.map(([text,startSourceSeconds,endSourceSeconds,lineId,semantic])=>({
    text,startSourceSeconds,endSourceSeconds,lineId,semantic
  })),
  sourceAudioDurationSeconds:6,
};
validateWordCaptionTrack(track);

export const WordCaptionPreview:React.FC=()=>{
  const frame=useCurrentFrame(),{fps}=useVideoConfig();
  const t=frame/fps;
  return <AbsoluteFill style={{background:'#FBFAF6',color:'#142B38',
    fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',left:80,top:150,right:80,fontSize:42,fontWeight:850}}>
      OURBITES <span style={{color:'#C94F3E'}}> / </span> WORD-TIMED CAPTIONS
    </div>
    <div style={{position:'absolute',left:86,top:580,right:86,fontSize:100,fontWeight:950,
      letterSpacing:-4,lineHeight:1.05}}>Every word.<div style={{color:'#C94F3E'}}>On its cue.</div></div>
    <div style={{position:'absolute',left:80,top:910,right:80,fontSize:39,color:'#667577'}}>
      Company: styled wordmark fallback; person: italic + active underline. No third-party logos.
    </div>
    <div style={{position:'absolute',left:80,right:80,top:1440,height:3,background:'#142B38',opacity:0.15}}/>
    <WordCaptionOverlay track={track} sourceTimeSeconds={t}/>
    <div style={{position:'absolute',left:80,bottom:100,fontSize:27,letterSpacing:1,color:'#667577'}}>
      SYNTHETIC TIMINGS · SILENT FUNCTIONAL TEST · NOT A NARRATED EPISODE
    </div>
  </AbsoluteFill>;
};
