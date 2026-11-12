import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {OurbitesHostConceptC} from '../characters/OurbitesHostConceptC';
import {conceptCGazeForTarget} from '../characters/ConceptCPointRig';

/**
 * Issue #64 follow-up: selected Concept C in ONE purpose-led editorial action.
 * Synthetic €20 -> €40 example. No factual claim, asset rights, narration,
 * canonical-host replacement, or library acceptance is implied.
 *
 * Deliberately ONE persistent price ticket and ONE continuous hand movement:
 * the host looks at the same point its hand approaches. No orange leader line.
 */
export const HOST_CONCEPT_C_ACTING_FRAMES=120;
const paper='#FAF7EE',ink='#142B38',teal='#087E83',orange='#E97F48';
const ease=Easing.bezier(0.24,0.84,0.24,1);

const between=(frame:number,start:number,end:number)=>
  interpolate(frame,[start,end],[0,1],{
    extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease,
  });

// A short authored blink, not constant idle motion or nondeterministic jitter.
const blinkAt=(frame:number,center:number)=>
  Math.max(0,1-Math.abs(frame-center)/3);

// Single evidence target, shared by the eyes and the pointing fingertip.
// Coordinates are in Concept C's original 360x520 actor viewBox.
const evidence={x:390,y:179} as const;
const gazeToEvidence=conceptCGazeForTarget(evidence);

export const HostConceptCActingProof:React.FC=()=>{
  const frame=useCurrentFrame();
  // Choreography: notice -> inspect -> reach -> price changes -> dry recognition.
  // Eyes lead the arm; the hand settles lightly instead of freezing at max reach.
  const glance=between(frame,17,35);
  const anticipation=between(frame,29,47);
  const release=between(frame,103,119);
  const reach=between(frame,40,78)*(1-release);
  // A single change beat keeps the number and its semantic label in sync.
  // Crossfading both numbers left €40 visible under 'BEFORE THE CHANGE'.
  const priceChangeFrame=90;
  const afterChange=frame>=priceChangeFrame;
  const priceImpact=Math.max(0,1-Math.abs(frame-priceChangeFrame)/7);
  const understand=between(frame,94,110);
  const ticketEntrance=between(frame,0,16);
  const blink=Math.max(blinkAt(frame,26),blinkAt(frame,101));
  const settle=between(frame,105,119);
  const looking=glance*(1-0.80*release);

  return <AbsoluteFill style={{
    background:paper,color:ink,fontFamily:'Arial,Helvetica,sans-serif',
    overflow:'hidden',
  }}>
    <div style={{position:'absolute',left:75,top:100,
      fontSize:29,fontWeight:900,letterSpacing:3}}>OURBITES / CONCEPT C</div>
    <div style={{position:'absolute',left:72,top:232,width:920,
      fontSize:88,lineHeight:1.08,fontWeight:950,letterSpacing:-3}}>
      WHY DID THIS<br/>PRICE DOUBLE?
    </div>
    <div style={{position:'absolute',left:74,top:477,
      fontSize:31,fontWeight:800,color:teal,letterSpacing:1}}>
      ONE OBJECT. ONE REACTION.
    </div>

    {/* The persistent document lies UNDER the host's moving fingertip,
        so the gesture contacts the number instead of disappearing at the edge.
        This is a synthetic test; no actual company or financial claim. */}
    <div style={{position:'absolute',left:505,top:778,width:485,height:392,
      background:'#F7DE9D',border:'7px solid '+ink,borderRadius:18,
      boxSizing:'border-box',
      boxShadow:'17px 22px 0 rgba(20,43,56,0.16)',
      transform:`translateY(${(1-ticketEntrance)*45}px)`,
      opacity:ticketEntrance,
    }}>
      <div style={{position:'absolute',left:41,top:35,fontSize:27,
        fontWeight:850,letterSpacing:2,color:ink}}>PRICE TAG</div>
      {/* Exactly one price is visible on every frame, with the meaning tied
          to the same change beat. Never crossfade contradictory euro amounts. */}
      <div style={{position:'absolute',left:43,top:87,
        fontSize:124,letterSpacing:-7,fontWeight:950,
        color:afterChange?teal:ink,
        transform:`scale(${1-0.07*priceImpact})`,transformOrigin:'left center'}}>
        {afterChange?'€40':'€20'}
      </div>
      <div style={{position:'absolute',left:42,top:264,right:32,
        height:5,background:ink,opacity:0.15}}/>
      <div style={{position:'absolute',left:43,top:294,
        fontSize:29,fontWeight:900,color:ink}}>
        {afterChange?'AFTER THE CHANGE':'BEFORE THE CHANGE'}
      </div>
      <div style={{position:'absolute',right:36,top:33,
        width:22,height:22,borderRadius:'50%',background:orange,
        transform:`scale(${1+0.33*priceImpact})`}}/>
    </div>
    {/* Same Concept C artwork; shoulder leads the wrist and the face follows.
        A tiny forward lean is intentional, not a perpetual idle bounce. */}
    <div style={{position:'absolute',left:90,top:710,width:410,height:594,
      transform:`translate(${3*anticipation}px,${-2*anticipation+settle}px)`}}>
      <OurbitesHostConceptC pose="point" width={410} height={594}
        pointProgress={reach} insight={understand} blink={blink}
        headTilt={1.8*anticipation*(1-release)-0.6*settle} pointTarget={evidence}
        gazeX={gazeToEvidence.x*looking}
        gazeY={gazeToEvidence.y*looking}/>
    </div>

    <div style={{position:'absolute',left:75,right:75,top:1430,
      borderTop:'4px solid rgba(20,43,56,0.2)',paddingTop:34,
      fontSize:37,fontWeight:800,lineHeight:1.32}}>
      THE HAND FOLLOWS THE FACT.
    </div>
    <div style={{position:'absolute',left:75,bottom:130,
      fontSize:25,letterSpacing:1,color:'#6B7876',fontWeight:750}}>
      SILENT · FICTIONAL € VALUES · CHARACTER RIG TEST ONLY
    </div>
  </AbsoluteFill>;
};
