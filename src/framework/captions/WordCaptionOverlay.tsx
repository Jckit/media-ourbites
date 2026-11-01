import React from 'react';
import {staticFile} from 'remotion';
import {currentCaptionLine, isSpokenNow, wordOpacity, type WordCaptionCue, type WordCaptionTrack} from './word-captions';

/** In the screen-space lower third, outside camera and paper transforms. */
export const WordCaptionOverlay: React.FC<{
  /** Rendering accepts provisional preview words; only validateWordCaptionTrack grants production-readiness. */
  track: Pick<WordCaptionTrack,'words'>;
  sourceTimeSeconds: number;
  /** For footage with actual VO: pass sourceTimeSeconds=frame/fps*playbackSpeed. */
  top?: number;
}> = ({track,sourceTimeSeconds,top=1580}) => {
  const words=currentCaptionLine(track.words,sourceTimeSeconds);
  if (!words) return null;
  return <div style={{position:'absolute',top,left:65,right:65,display:'flex',
    justifyContent:'center',alignItems:'baseline',flexWrap:'wrap',columnGap:11,rowGap:7,
    fontFamily:'Arial, sans-serif',fontWeight:850,fontSize:58,lineHeight:1.22,
    textAlign:'center',color:'#142B38',pointerEvents:'none',zIndex:100,
    textShadow:'0 2px 2px rgba(250,249,245,0.9)'}}>
    {words.map((w:WordCaptionCue,i:number)=>{
      const opacity=wordOpacity(w,sourceTimeSeconds);
      const active=isSpokenNow(w,sourceTimeSeconds);
      const person=w.semantic==='person';
      const company=w.semantic==='company';
      const emphasis=w.semantic==='emphasis';
      const hasLogo=company && w.logoApproved && !!w.logoAsset;
      return <span key={w.lineId+'-'+i} style={{display:'inline-flex',alignItems:'baseline',gap:7,
        opacity,transform:'translateY('+(1-opacity)*8+'px)',
        fontStyle:person?'italic':'normal',fontFamily:person?'Georgia, serif':'Arial, sans-serif',
        fontWeight:company||emphasis?950:person?650:850,
        color:emphasis?'#C94F3E':company?'#0C424B':'#142B38',
        borderBottom:person&&active?'4px solid #C94F3E':'4px solid transparent'}}>
        {hasLogo && <img src={staticFile(w.logoAsset!)} alt="" style={{height:46,maxWidth:90,objectFit:'contain'}}/>}
        {w.text}
      </span>;
    })}
  </div>;
};
