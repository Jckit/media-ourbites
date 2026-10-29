import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {CharacterStage,StageActor,FilingProp,tween} from './CharacterStage';
import narration from './anthropic-character-audio.json';
import captionCues from './anthropic-caption-cues.json';
import financials from '../episodes/002/financials.json';
import {playbackSpeed} from './story-motion';
import {DarioIllustration} from './DarioIllustration';
import {OfficeWorld} from './BusinessWorld';

const ink='#142B38',teal='#087E83',orange='#E97F48';
// The actual scenic review MP4 has 1.106s of final silence after the last word.
// Trim 0.9 source seconds, retaining ~0.25s of post-speech payoff hold.
// Re-measure this value if the narration WAVs or manifest change.
const VERIFIED_FINAL_SILENCE_TRIM_SOURCE_SECONDS=0.9;
export const CHARACTER_FRAMES=Math.ceil((narration.duration-VERIFIED_FINAL_SILENCE_TRIM_SOURCE_SECONDS)*30/playbackSpeed);
export const AnthropicCharacter:React.FC=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=frame/fps*playbackSpeed;
 const inspect=narration.clips[1].start,operating=narration.clips[2].start,resolve=narration.clips[3].start;
 const drop=tween(t,0.15,0.8,-850,350);
 const recoil=t<0.8?0:t<1.15?tween(t,0.8,1.15,0,-12):tween(t,1.15,1.6,-12,0);
 const open=tween(t,inspect,inspect+0.7,0,1);
 const reveal=tween(t,operating,operating+0.55,0,1);
 const end=tween(t,resolve,resolve+0.7,0,1);
 const wallet=tween(t,1.6,2,0,1)*(1-tween(t,inspect,inspect+0.5,0,1));
 const pointing=open*(1-tween(t,operating,operating+0.4,0,1));
 // Follow the filing while questioning, Dario's financial explanation next,
 // then return gaze to the viewer as the payoff lands. Preserve body/hand motion.
 const filingAttention=tween(t,0.45,1.1,0,1);
 const accountingAttention=tween(t,operating,operating+0.5,0,1);
 const viewerAttention=tween(t,resolve+1.25,resolve+1.7,0,1);
 const hostGazeX=10*filingAttention*(1-viewerAttention);
 const hostGazeY=(-7*(1-accountingAttention)+2*accountingAttention)*filingAttention*(1-viewerAttention);
 const pull=tween(t,resolve,resolve+1.2,0,1);
 const cardScale=0.65+pull*0.35;
 const cardTop=900+pull*220;
 const darioX=710-open*25;
 // The hand and card share a world-space grip, so the prop cannot drift away.
 const gripX=715, gripY=cardTop+25*cardScale;
 const reach=tween(t,resolve-0.6,resolve,0,1);
 // Match the legacy rotated hand before reaching, then follow the shared grip.
 const gestureAngle=open*55*Math.PI/180;
 const restingHand={x:120-58*Math.cos(gestureAngle)-66*Math.sin(gestureAngle),y:248-58*Math.sin(gestureAngle)+66*Math.cos(gestureAngle)};
 const hand=t>=resolve-0.6?{
   x:restingHand.x+reach*((gripX-darioX)*360/420-restingHand.x),
   y:restingHand.y+reach*((gripY-830)*360/420-restingHand.y),
 }:undefined;
 // Narration and exact spoken wording stay untouched; split only the on-screen reading load.
 // Cue ends are fractions of the original WAV clip duration, not separate audio segments.
 const activeClip=narration.clips.findIndex(c=>t>=c.start&&t<c.start+c.duration);
 const activeNarration=activeClip<0?undefined:narration.clips[activeClip];
 const caption=activeNarration
   ? captionCues.clips[activeClip].find(c=>(t-activeNarration.start)/activeNarration.duration<c.until)?.text
   : undefined;
 return <AbsoluteFill style={{background:'#F4F0E6',color:ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
   <CharacterStage zoom={1+open*0.06-end*0.06} focusX={650} focusY={850}>
     {/* World space and characters share the camera transform. Original vector set dressing reacts to the falling filing. */}
     <OfficeWorld t={t}/>
     <div style={{position:'absolute',left:280,top:0,transform:'scale(0.76)',transformOrigin:'top left'}}>
     <FilingProp x={0} y={drop/0.76} angle={-5+open*7}>
       <div style={{fontSize:38,fontWeight:900}}>ANTHROPIC</div>
       <div style={{fontSize:24,marginTop:12}}>S-1 · H1 2026 · RECREATED EXCERPT</div>
       <div style={{marginTop:48,fontSize:30,background:`rgba(233,127,72,${pointing*0.25})`}}>REPORTED NET LOSS</div>
       <div style={{fontSize:100,fontWeight:900,color:orange,letterSpacing:-4}}>${(Math.abs(financials.h1_2026.net_loss)/1000).toFixed(2)}B</div>
       <div style={{marginTop:24,height:4,background:ink}}/>
       <div style={{marginTop:24,fontSize:30,opacity:open}}>That is not a cash-spending total.</div>
       <div style={{marginTop:35,padding:20,background:'#DBEEEA',opacity:reveal,transform:`translateX(${(1-reveal)*60}px)`}}><div style={{fontSize:25}}>OPERATING LOSS</div><div style={{fontSize:66,fontWeight:900,color:teal}}>${Math.abs(financials.h1_2026.operating_loss)}M</div></div>
     </FilingProp>
     </div>
     <StageActor x={80+open*25} y={830} size={420} lean={recoil} gazeX={hostGazeX} gazeY={hostGazeY} pose={t<0.8?'neutral':t<1.6?'react':t<inspect?'neutral':t<operating?'think':'point'}/>
     <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:1080,height:1920,pointerEvents:'none'}}>
       <g opacity={wallet} transform={`translate(${420+open*25} ${1170+(1-wallet)*50})`}>
         <path d="M8 25 V0 H80 V25" fill="#DBEEEA" stroke={teal} strokeWidth="6"/>
         <rect width="105" height="68" y="20" rx="10" fill="#A96A43" stroke={ink} strokeWidth="7"/>
         <path d="M75 43 H110 V68 H75 Z" fill="#E9B98E" stroke={ink} strokeWidth="5"/>
       </g>
     </svg>
     <div style={{position:'absolute',left:darioX,top:830,width:420}}><DarioIllustration gesture={open} hand={hand}/></div>
     <div style={{position:'absolute',left:750,top:1468,fontSize:27,fontWeight:800}}>DARIO · ILLUSTRATION</div>
     <div style={{position:'absolute',left:75,top:255,fontSize:57,fontWeight:900,opacity:t>0.85&&t<inspect?1:0,rotate:'-5deg'}}>That’s a lot of zeros.</div>
     <div style={{position:'absolute',left:85,right:85,top:255,fontSize:44,lineHeight:1.15,whiteSpace:'nowrap',fontWeight:900,color:teal,textAlign:'center',opacity:tween(t,resolve+1.2,resolve+1.65,0,1)}}>Reported loss is not cash spent.</div>
     <div style={{position:'absolute',left:gripX-350*cardScale,top:cardTop,width:350,boxSizing:'border-box',opacity:tween(t,resolve,resolve+0.2,0,1),scale:cardScale,transformOrigin:'top left',background:ink,color:'white',padding:25,borderRadius:16}}><div style={{fontSize:28}}>FINANCING FAIR-VALUE CHANGE</div><div style={{fontSize:60,color:'#FFAE72',fontWeight:900}}>${(Math.abs(financials.h1_2026.convertible_financing_fair_value_change)/1000).toFixed(2)}B</div><div style={{fontSize:28}}>Largest component, not the whole gap.</div></div>
   </CharacterStage>
   {/* Keep review metadata above the opaque world, but below the source footer and outside moving props/captions. */}
   <div style={{position:'absolute',left:85,top:1768,fontSize:32,letterSpacing:4,fontWeight:900,whiteSpace:'nowrap'}}>OURBITES</div>
   <div style={{position:'absolute',left:310,top:1775,fontSize:26,color:'#607078',whiteSpace:'nowrap'}}>ILLUSTRATIVE SCENE · LIKENESS REVIEW PENDING</div>
   <div style={{position:'absolute',left:85,right:85,top:1600,fontSize:53,lineHeight:1.12,fontWeight:750,textAlign:'center'}}>{caption}</div>
   <div style={{position:'absolute',left:85,bottom:75,fontSize:24,color:'#607078'}}>Source: episode 002 filing dataset · editorial review pending</div>
   {narration.clips.map(c=><Sequence key={c.file} from={Math.round(c.start*fps/playbackSpeed)} durationInFrames={Math.ceil(c.duration*fps/playbackSpeed)}><Audio src={staticFile(c.file)} playbackRate={playbackSpeed}/></Sequence>)}
 </AbsoluteFill>;
};
