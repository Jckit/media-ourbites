import React from 'react';
import {paperHingeState} from './paper-hinge-motion';

/** One hinged paper insert attached to a persistent hero object.
 * Rotate a single face through edge-on, then reveal the other face.
 * No arbitrary wipe, no secondary floating card or conflicting numerical states.
 */
type Face={amount:string;label:string};
export type PaperHingeRevealProps={
  frame:number;
  startFrame:number;
  durationFrames:number;
  left:number;
  top:number;
  width:number;
  height:number;
  before:Face;
  after:Face;
  amountSize:number;
  labelTop:number;
  labelSize:number;
  ink:string;
  afterInk:string;
  paperColor:string;
  updatedPaperColor?:string;
  letterSpacing?:number;
  dividerTop?:number;
};
export const PaperHingeReveal:React.FC<PaperHingeRevealProps>=({
  frame,startFrame,durationFrames,left,top,width,height,
  before,after,amountSize,labelTop,labelSize,ink,afterInk,
  paperColor,updatedPaperColor=paperColor,letterSpacing=0,dividerTop,
})=>{
  const state=paperHingeState(frame,startFrame,durationFrames);
  const content=state.face==='before'?before:after;
  const amountColor=state.face==='before'?ink:afterInk;
  // A very small 2.5D paper edge/shadow; the parent receipt/tag never moves.
  const shadow=state.movement*11;
  return <div style={{
    position:'absolute',left,top,width,height,
    perspective:'720px',pointerEvents:'none',
  }}>
    <div style={{
      position:'absolute',inset:0,
      background:state.face==='before'?paperColor:updatedPaperColor,
      boxSizing:'border-box',borderRadius:3,
      borderTop:'2px solid rgba(20,43,56,0.08)',
      boxShadow:`${2+shadow}px ${3+shadow*0.45}px ${3+shadow*0.65}px rgba(20,43,56,${0.08+state.movement*0.06})`,
      transformOrigin:'left center',
      transform:`rotateY(${state.angleDegrees}deg)`,
      backfaceVisibility:'hidden',
      overflow:'hidden',
    }}>
      <div style={{position:'absolute',left:0,top:0,
        color:amountColor,fontSize:amountSize,fontWeight:950,
        letterSpacing,lineHeight:1.17,whiteSpace:'nowrap'}}>
        {content.amount}
      </div>
      {dividerTop!==undefined&&<div style={{
        position:'absolute',left:0,right:3,top:dividerTop,
        height:5,background:ink,opacity:0.15,
      }}/>}
      <div style={{position:'absolute',left:0,right:0,top:labelTop,
        color:ink,fontSize:labelSize,fontWeight:900,
        lineHeight:1.1,whiteSpace:'nowrap'}}>
        {content.label}
      </div>
    </div>
  </div>;
};
