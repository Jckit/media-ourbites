import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {OurbitesHost} from '../../OurbitesHost';

/**
 * UNAPPROVED MOTION-LIBRARY CANDIDATE 01 — object-led continuity.
 * 7s / 30fps, 1080x1920. Synthetic shop arithmetic only.
 * Keep one hero receipt DOM element alive for the entire sequence:
 * source ledger -> lifted object -> result notebook.
 * Do not add to the accepted catalog without explicit human review.
 */
export const OBJECT_CONTINUITY_FRAMES = 210;
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(n:number)=>{const t=clamp(n);return t*t*(3-2*t);};
const segment=(f:number,a:number,b:number)=>smooth((f-a)/(b-a));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const palette={paper:'#F4F0E6',ink:'#142B38',teal:'#087E83',red:'#C94F3E',muted:'#667577'};
export const ObjectLedContinuityCandidate:React.FC=()=>{
 const frame=useCurrentFrame();
 // Authored 30fps study: rise, travel, then settle into a reserved landing area.
 const lift=segment(frame,48,84);
 const travel=interpolate(frame,[77,145],[0,1],{
   easing:Easing.bezier(.22,0,.32,1),extrapolateLeft:'clamp',extrapolateRight:'clamp',
 });
 const land=segment(frame,128,157);
 const elevation=lift*(1-land);
 const receiptX=lerp(130,590,travel);
 const receiptY=lerp(795,885,travel)-155*Math.sin(Math.PI*travel)-18*elevation;
 const receiptAngle=lerp(-7,4,travel)-2*land;
 const receiptScale=lerp(1,1.08,travel)-.33*land;
 const reveal=segment(frame,119,154);
 const outcome=segment(frame,151,179);
 const inkReveal=segment(frame,11,32);
 const header:React.CSSProperties={fontFamily:'Arial, Helvetica, sans-serif',fontWeight:800,color:palette.ink};
 return <AbsoluteFill style={{background:palette.paper,overflow:'hidden',fontFamily:'Arial, Helvetica, sans-serif'}}>
   <div style={{position:'absolute',left:68,right:68,top:80,display:'flex',justifyContent:'space-between',fontSize:26,letterSpacing:3,fontWeight:800,color:palette.ink}}>
    <span>OURBITES</span><span style={{color:palette.red}}>MOTION STUDY 01</span>
   </div>
   <div style={{position:'absolute',left:68,top:180,...header,fontSize:86,lineHeight:1.01,letterSpacing:-4,opacity:inkReveal}}>
     The story<br/>of <span style={{color:palette.red}}>one receipt.</span>
   </div>
   <div style={{position:'absolute',left:68,top:426,fontSize:29,color:palette.muted,letterSpacing:1}}>A PAPER OBJECT CONNECTS TWO IDEAS</div>
   <div style={{position:'absolute',left:55,top:600,width:970,height:865,borderRadius:26,background:'#E4E0D6',boxShadow:'0 24px 46px #142B3818'}}/>
   <div style={{position:'absolute',left:84,top:652,width:490,height:680,background:'#FFFCF5',transform:'rotate(-3deg)',boxShadow:'9px 16px 30px #142B3822',padding:45,boxSizing:'border-box',opacity:1-.65*segment(frame,115,163)}}>
     <div style={{fontSize:22,letterSpacing:3,color:palette.muted,fontWeight:800}}>SHOP / DAYBOOK</div>
     <div style={{marginTop:55,fontSize:48,fontWeight:800,color:palette.ink}}>Daily sales</div>
     {[0,1,2,3,4,5,6].map(i=><div key={i} style={{height:2,background:'#C8CDC6',marginTop:54}}/>)}
     <div style={{position:'absolute',bottom:52,left:48,fontSize:24,color:palette.muted}}>SOURCE</div>
   </div>
   <div style={{position:'absolute',left:558,top:690,width:438,height:690,borderRadius:13,background:'#F9F8F1',boxShadow:'10px 18px 28px #142B3826',transform:'rotate(4deg)',opacity:reveal}}>
     <div style={{position:'absolute',left:28,top:22,width:6,height:642,background:'#E8D5C9'}}/>
     <div style={{padding:'76px 38px 0 65px',fontSize:24,fontWeight:800,letterSpacing:2,color:palette.teal}}>RESULT / TODAY</div>
     <div style={{padding:'34px 38px 0 65px',fontSize:34,color:palette.ink,fontWeight:700}}>What remains?</div>
     <div style={{position:'absolute',left:70,top:410,fontSize:110,fontWeight:900,color:palette.ink,opacity:outcome}}>35</div>
     <div style={{position:'absolute',left:78,top:550,fontSize:42,fontWeight:900,color:palette.red,opacity:outcome}}>LEFT OVER</div>
   </div>
   {/* Single continuous physical object; its shadow, crease, label and paper share one transform. */}
   <div style={{position:'absolute',left:receiptX,top:receiptY,width:385,height:245,transform:`rotate(${receiptAngle}deg) scale(${receiptScale})`,transformOrigin:'50% 50%',filter:`drop-shadow(${lerp(3,18,elevation)}px ${lerp(4,35,elevation)}px ${lerp(3,20,elevation)}px #142B3840)`,zIndex:8}}>
     <div style={{position:'absolute',inset:0,background:'#FFFDF7',clipPath:'polygon(0 0,100% 0,100% 91%,94% 96%,88% 91%,82% 96%,76% 91%,70% 96%,64% 91%,58% 96%,52% 91%,46% 96%,40% 91%,34% 96%,28% 91%,22% 96%,16% 91%,10% 96%,4% 91%,0 95%)'}}/>
     <div style={{position:'absolute',top:24,left:32,fontSize:21,fontWeight:800,letterSpacing:2,color:palette.muted}}>RECEIPT / 001</div>
     <div style={{position:'absolute',top:78,left:30,fontSize:56,fontWeight:900,color:palette.ink}}>120 <span style={{color:palette.red}}>−</span> 85</div>
     <div style={{position:'absolute',top:165,left:33,width:300,height:5,background:palette.red,transform:`scaleX(${segment(frame,38,57)})`,transformOrigin:'left'}}/>
     <div style={{position:'absolute',top:183,left:34,fontSize:18,color:palette.muted}}>SALES − COSTS</div>
   </div>
   <div style={{position:'absolute',left:95,top:1310,width:250,height:370,opacity:1-.65*segment(frame,132,173),transform:`translateX(${-45*segment(frame,128,166)}px)`}}>
      <OurbitesHost pose={frame<84?'think':'point'} gazeX={frame<84?6:12} width={250} height={361}/>
   </div>
   <div style={{position:'absolute',left:68,right:68,bottom:190,height:3,background:'#BAC4BE'}}/>
   <div style={{position:'absolute',left:68,bottom:124,fontSize:27,color:palette.muted}}>ILLUSTRATIVE SHOP EXAMPLE</div>
   <div style={{position:'absolute',right:68,bottom:124,fontSize:27,color:palette.ink,fontWeight:800}}>01 / 01</div>
 </AbsoluteFill>;
};
