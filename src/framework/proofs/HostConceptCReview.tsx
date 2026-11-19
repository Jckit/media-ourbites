import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {OurbitesHost,type HostPose} from '../../OurbitesHost';
import {OurbitesHostConceptC} from '../characters/OurbitesHostConceptC';

/**
 * NEW silhouette approval gate. A/B tests remain in independent compositions.
 * This compares the current canonical host against a distinct editorial human
 * presenter at the SAME screen size and pose, with facial closeups for review.
 * It does not animate expression interpolation or replace an episode host.
 */
export const HOST_CONCEPT_C_REVIEW_FRAMES=150;
const poses:readonly HostPose[]=['neutral','think','point','react','explain'];
const INK='#142B38',PAPER='#FAF7EE',TEAL='#087E83';
const ORANGE='#E97F48';

type Variant='current'|'concept-c';
const Actor:React.FC<{
  variant:Variant; pose:HostPose; width:number; height:number;
  gazeX:number; gazeY:number;
}>=({variant,pose,width,height,gazeX,gazeY})=>
  variant==='current'
    ?<OurbitesHost pose={pose} width={width} height={height}
      gazeX={gazeX} gazeY={gazeY} animate={false}/>
    :<OurbitesHostConceptC pose={pose} width={width} height={height}
      gazeX={gazeX} gazeY={gazeY}/>;

const Panel:React.FC<{
  variant:Variant; pose:HostPose; gazeX:number; gazeY:number; x:number;
}>=({variant,pose,gazeX,gazeY,x})=>{
  const isC=variant==='concept-c';
  return <div style={{
    position:'absolute',top:336,left:x,width:479,height:1163,
    borderRadius:26,background:isC?'#EDF4EF':'#F2EFE8',
    border:'4px solid '+(isC?TEAL:'#D5CFC4'),boxSizing:'border-box',
    overflow:'hidden',
  }}>
    <div style={{fontSize:44,fontWeight:900,padding:'28px 30px 0',color:INK}}>
      {isC?'CONCEPT C':'ORIGINAL'}
    </div>
    <div style={{fontSize:23,fontWeight:800,letterSpacing:1,
      padding:'5px 30px 0',color:isC?TEAL:'#72817E'}}>
      {isC?'NEW EDITORIAL PRESENTER':'CURRENT CIRCULAR HOST'}
    </div>
    {/* Match render scale and position across both versions. */}
    <div style={{position:'absolute',top:163,left:67,width:345,height:499}}>
      <Actor variant={variant} pose={pose} width={345} height={499}
        gazeX={gazeX} gazeY={gazeY}/>
    </div>
    <div style={{position:'absolute',left:23,right:23,top:675,
      height:3,background:INK,opacity:0.13}}/>
    <div style={{position:'absolute',left:29,top:702,fontSize:25,
      fontWeight:850,letterSpacing:1,color:'#74807B'}}>FACE / DETAIL</div>
    {/* Crop is deliberately the same per version: head center (180,145). */}
    <div style={{position:'absolute',left:27,top:755,
      width:423,height:298,overflow:'hidden',borderRadius:17,
      background:PAPER,border:'3px solid #DED9CE',boxSizing:'border-box'}}>
      <div style={{position:'absolute',top:-75,left:-53}}>
        <Actor variant={variant} pose={pose} width={520} height={751}
          gazeX={gazeX} gazeY={gazeY}/>
      </div>
    </div>
    <div style={{position:'absolute',bottom:35,left:30,right:30,
      textAlign:'center',fontSize:27,fontWeight:800,lineHeight:1.25,color:INK}}>
      {isC?'Angled face · jacket · full limbs':'Round head · tuft · stick limbs'}
    </div>
  </div>;
};

export const HostConceptCReview:React.FC=()=>{
  const frame=useCurrentFrame();
  const poseIndex=Math.min(poses.length-1,Math.floor(frame/30));
  const pose=poses[poseIndex];
  const gaze=pose==='point'?{x:8,y:-4}:pose==='think'?{x:-6,y:-5}:
    pose==='react'?{x:0,y:-5}:{x:0,y:0};
  return <AbsoluteFill style={{background:PAPER,fontFamily:'Arial,Helvetica,sans-serif',
    color:INK,overflow:'hidden'}}>
    <div style={{position:'absolute',left:54,top:74,fontSize:31,
      letterSpacing:3,fontWeight:900}}>OURBITES / CHARACTER REDESIGN</div>
    <div style={{position:'absolute',left:54,top:155,fontSize:75,
      letterSpacing:-3,fontWeight:950}}>A different kind of host.</div>
    <div style={{position:'absolute',left:56,top:274,fontSize:30,
      fontWeight:850,color:TEAL}}>POSE {poseIndex+1}/5 · {pose.toUpperCase()}</div>
    <Panel variant="current" pose={pose} x={38} {...{gazeX:gaze.x,gazeY:gaze.y}}/>
    <Panel variant="concept-c" pose={pose} x={563} {...{gazeX:gaze.x,gazeY:gaze.y}}/>
    <div style={{position:'absolute',top:1562,left:56,right:56,padding:'30px 32px',
      background:'#EDE8DE',borderRadius:20,fontSize:29,lineHeight:1.36}}>
      <span style={{fontWeight:900,color:ORANGE}}>A real redesign.</span>
      {' '}New silhouette, facial structure, costume and gesture language.
      Still original flat 2D vector artwork.
    </div>
    <div style={{position:'absolute',left:54,bottom:86,fontSize:26,
      letterSpacing:1,color:'#697677'}}>FICTIONAL · SILENT ART TEST · NOT PRODUCTION-APPROVED</div>
  </AbsoluteFill>;
};

/** Scene-scale cameo to catch designs that only look good on a model sheet. */
export const HostConceptCCameo:React.FC=()=>(
  <AbsoluteFill style={{background:PAPER,overflow:'hidden',
    fontFamily:'Arial,Helvetica,sans-serif',color:INK}}>
    <div style={{position:'absolute',top:95,left:75,right:75,
      fontWeight:900,letterSpacing:2,fontSize:32}}>OURBITES / CAMPAIGN TEST</div>
    <div style={{position:'absolute',top:235,left:78,right:78,
      fontWeight:950,letterSpacing:-4,lineHeight:1.1,fontSize:102}}>
      THIS PRICE<br/>JUST DOUBLED.
    </div>
    <div style={{position:'absolute',top:626,left:104,
      fontSize:103,fontWeight:950,color:TEAL}}>€20</div>
    <svg viewBox="0 0 1080 1920" width="100%" height="100%"
      style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      <path d="M385 682 H659 M615 653 L659 682 L615 711" fill="none"
        stroke={ORANGE} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div style={{position:'absolute',top:626,left:724,
      fontSize:103,fontWeight:950,color:INK}}>€40</div>
    <div style={{position:'absolute',left:620,top:810}}>
      <OurbitesHostConceptC pose="point" width={350} height={505} gazeX={8} gazeY={-3}/>
    </div>
    <div style={{position:'absolute',left:78,top:1060,width:475,
      fontSize:51,fontWeight:900,lineHeight:1.1,color:INK}}>
      WHAT CHANGED?
    </div>
    <div style={{position:'absolute',top:1520,left:75,right:75,
      height:3,background:INK,opacity:0.18}}/>
    <div style={{position:'absolute',bottom:300,left:78,
      fontSize:36,fontWeight:850,color:TEAL}}>VISUAL-ONLY TEST</div>
    <div style={{position:'absolute',bottom:176,left:78,
      fontSize:29,color:'#5B6C70'}}>Example values are illustrative, not a factual claim.</div>
  </AbsoluteFill>
);
