import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame} from 'remotion';
import {OurbitesHostConceptC} from '../characters/OurbitesHostConceptC';
import {conceptCGazeForTarget} from '../characters/ConceptCPointRig';

/**
 * Second evidence target: receipt line instead of a large price ticket.
 * Demonstrates a reusable gaze -> reach -> consequence -> release cycle.
 * Values are fictional; this is not an episode, a real-world claim or art approval.
 */
export const HOST_CONCEPT_C_RECEIPT_FRAMES=150;
const ink='#142B38',paper='#FAF7EE',teal='#087E83';
const ease=Easing.bezier(0.22,0.76,0.22,1);
const progress=(frame:number,start:number,end:number)=>
  interpolate(frame,[start,end],[0,1],{
    easing:ease,extrapolateLeft:'clamp',extrapolateRight:'clamp',
  });
const target={x:375,y:260} as const;
const eye=conceptCGazeForTarget(target);
const blink=(frame:number,center:number)=>Math.max(0,1-Math.abs(frame-center)/3);

export const HostConceptCReceiptProof:React.FC=()=>{
  const frame=useCurrentFrame();
  const entrance=progress(frame,0,16);
  const glance=progress(frame,22,40);
  const prepare=progress(frame,35,48);
  const extend=progress(frame,45,84);
  const release=progress(frame,118,146);
  const reach=extend*(1-release);
  const feeAppears=frame>=94;
  const recognize=progress(frame,96,112);
  const blinkEyes=Math.max(blink(frame,30),blink(frame,109));
  return <AbsoluteFill style={{background:paper,color:ink,
    fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',left:76,top:100,
      fontSize:31,fontWeight:900,letterSpacing:3}}>OURBITES / CONCEPT C</div>
    <div style={{position:'absolute',left:76,top:220,width:940,
      fontSize:82,fontWeight:950,lineHeight:1.08,letterSpacing:-3}}>
      WHERE DID THE<br/>EXTRA FEE COME FROM?
    </div>
    <div style={{position:'absolute',left:77,top:572,
      color:teal,fontSize:31,fontWeight:900}}>SECOND EVIDENCE TARGET · RECEIPT</div>
    {/* One receipt throughout the scene, and one atomic value/label update. */}
    <div style={{position:'absolute',left:510,top:910,width:530,height:420,
      background:'#F0E8D6',border:'7px solid '+ink,borderRadius:13,
      boxShadow:'14px 17px 0 rgba(20,43,56,0.14)',
      transform:`translateY(${(1-entrance)*35}px)`,opacity:entrance}}>
      <div style={{position:'absolute',left:32,top:34,
        fontSize:34,fontWeight:900,letterSpacing:1}}>RECEIPT</div>
      <div style={{position:'absolute',left:32,right:30,top:101,
        borderTop:'4px dashed #B8AB91'}}/>
      <div style={{position:'absolute',left:35,top:151,
        fontSize:35,fontWeight:800}}>SERVICE FEE</div>
      <div style={{position:'absolute',left:35,top:211,
        fontSize:100,fontWeight:950,color:feeAppears?teal:ink}}>
        {feeAppears?'+€12':'€0'}
      </div>
      <div style={{position:'absolute',left:35,bottom:27,
        fontSize:25,fontWeight:900}}>
        {feeAppears?'FEE ADDED':'BEFORE THE FEE'}
      </div>
    </div>
    {/* The same actor-side target drives the eyes and the wrist.
        The shifted receipt reserves a text-free margin along the entire reach.
        The fingertip contacts the left end of its dashed separator. */}
    <div style={{position:'absolute',left:90,top:710,
      transform:`translate(${3*prepare-2*release}px,${-3*prepare+2*release}px)`}}>
      <OurbitesHostConceptC pose="point" width={410} height={594}
        pointTarget={target} pointProgress={reach} insight={recognize}
        blink={blinkEyes} headTilt={1.5*prepare*(1-release)}
        gazeX={eye.x*glance*(1-0.9*release)}
        gazeY={eye.y*glance*(1-0.9*release)}/>
    </div>
    <div style={{position:'absolute',left:76,right:76,top:1445,
      borderTop:'4px solid rgba(20,43,56,0.16)',paddingTop:29,
      fontSize:34,fontWeight:850}}>
      EYES LEAD. HAND CONTACTS. REACTION. RELEASE.
    </div>
    <div style={{position:'absolute',left:76,bottom:134,
      fontSize:24,color:'#697677',fontWeight:750}}>
      SILENT · FICTIONAL VALUES · HOST RIG REVIEW ONLY
    </div>
  </AbsoluteFill>;
};
