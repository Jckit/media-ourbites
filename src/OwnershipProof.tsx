import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame,interpolate} from 'remotion';
import audio from './proof-audio.json';
import {StoryBeat,storyTiming,useStoryClock,playbackSpeed,motionClamp} from './story-motion';
import {ownershipState,primaryScenario,secondScenario,type OwnershipScenario} from './ownership-state';
import {OurbitesHost} from './OurbitesHost';
const ink='#142B38',teal='#087E83',paper='#F4F0E6';
const panel:React.CSSProperties={background:paper,color:ink,fontFamily:'Arial, sans-serif',padding:'120px 90px'};
const Brand=()=> <div style={{fontSize:32,fontWeight:800,letterSpacing:4}}>OURBITES</div>;
// Preserve the existing OwnershipProof usage while sharing the canonical host design.
export const HybridHost = OurbitesHost;
const Hook:React.FC<{s:OwnershipScenario}>=({s})=>{
 const f=useCurrentFrame(),{fps}=useStoryClock(),t=f/fps,event=t>=1.5;
 return <AbsoluteFill style={panel}><Brand/><h1 style={{fontSize:94,lineHeight:1.05,marginTop:150}}>{t<2.4?'You kept every share.':'So why do you own less?'}</h1><div style={{position:'absolute',top:850,left:100,scale:'1.2'}}><HybridHost doubt={interpolate(t,[1.5,1.9],[0,1],motionClamp)}/></div><div style={{position:'absolute',top:850,left:490,width:430,background:ink,color:'white',padding:30,borderRadius:30,textAlign:'center'}}><div style={{fontSize:38}}>YOUR OWNERSHIP</div><div style={{fontSize:130,color:'#FFAE72',fontWeight:800}}>{Number((s.owned/(s.initial+(event?s.issued:0))*100).toFixed(1))}%</div><div style={{fontSize:36}}>{event?s.initial+s.issued:s.initial} total shares</div></div><div style={{position:'absolute',top:1280,left:490,fontSize:43,color:teal,fontWeight:700}}>Your {s.owned} shares.<br/>Still yours.</div><div style={{position:'absolute',top:1570,left:100,fontSize:46}}>{event?`+${s.issued} shares issued to others`:'Illustrative example'}</div></AbsoluteFill>;
};
const Explanation:React.FC<{s:OwnershipScenario}>=({s})=>{
 const f=useCurrentFrame(),{fps}=useStoryClock(),x=ownershipState(s,f,fps);
 return <AbsoluteFill style={panel}><Brand/><h1 style={{fontSize:86,lineHeight:1.06}}>Same shares.<br/>Bigger total.</h1><div style={{background:'white',borderRadius:30,padding:35,marginTop:70}}><div style={{fontSize:44,marginBottom:30}}>Each tile = {s.unit} shares</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:16,height:410,alignContent:'start'}}>{Array.from({length:x.total/s.unit},(_,i)=><div key={i} style={{height:65,borderRadius:14,background:i<s.owned/s.unit?teal:i>=s.initial/s.unit?'#E97F48':'#DAE1DF'}}/>)}</div><div style={{fontSize:44,color:teal}}>Your shares: {s.owned}</div><div style={{fontSize:44,marginTop:16}}>Total shares: {x.total}</div></div><div style={{position:'absolute',top:1120,left:90,scale:'0.8'}}><HybridHost doubt={interpolate(f/fps,[audio.clips[3].start,audio.clips[3].start+0.15,audio.clips[4].start-0.15,audio.clips[4].start],[0,1,1,0],motionClamp)}/></div><div style={{position:'absolute',top:1200,left:450,fontSize:110,fontWeight:800,color:teal}}>{Number(x.percent.toFixed(1))}%<div style={{fontSize:36,fontWeight:400,color:ink}}>{s.owned} out of {x.total} shares</div></div></AbsoluteFill>;
};
const Payoff:React.FC<{s:OwnershipScenario}>=({s})=>{
 const f=useCurrentFrame(),{fps}=useStoryClock(),p=interpolate(f/fps,[0,1.2],[0,1],motionClamp);
 return <AbsoluteFill style={panel}><Brand/><h1 style={{fontSize:86,lineHeight:1.06,marginTop:110}}>A smaller slice<br/>of what?</h1><div style={{marginTop:130,padding:35,border:`5px solid ${ink}`,borderRadius:35,background:'white'}}><div style={{fontSize:44,fontWeight:700}}>THE BUSINESS</div><div style={{padding:35,marginTop:35,background:teal,color:'white',borderRadius:20,fontSize:48}}>Your {s.owned} shares: {Number((s.owned/(s.initial+s.issued)*100).toFixed(1))}%</div><div style={{marginTop:35,padding:35,background:'#FBE1CF',borderRadius:20,fontSize:44,opacity:p,translate:`${(1-p)*100}px 0px`}}>What did it receive?<div style={{fontSize:36,marginTop:25}}>Cash or assets â€” and at what price?</div></div></div><div style={{marginTop:100,fontSize:47,fontWeight:700}}>A smaller percentage does not automatically mean less value.</div></AbsoluteFill>;
};
const Narration:React.FC<{silent:boolean}>=({silent})=>{
 const f=useCurrentFrame(),{fps}=useStoryClock();const clip=audio.clips.find(c=>f>=Math.round(c.start*fps)&&f<Math.round(c.start*fps)+Math.ceil(c.duration*fps));
 return <><div style={{position:'absolute',top:1600,left:100,right:120,fontSize:48,lineHeight:1.22,textAlign:'center',fontFamily:'Arial',color:ink,fontWeight:650}}>{silent?'Second scenario Â· silent validation':clip?.text}</div>{!silent&&audio.clips.map(c=><Sequence key={c.file} from={Math.round(c.start*fps)} durationInFrames={Math.ceil(c.duration*fps)}><Audio playbackRate={playbackSpeed} src={staticFile(c.file)}/></Sequence>)}</>;
};
export const OwnershipProof:React.FC<{variant?:'primary'|'second'}>=({variant='primary'})=>{
 const {fps}=useStoryClock(),s={...(variant==='second'?secondScenario:primaryScenario),start:audio.clips[1].start,end:audio.clips[2].start-0.1},payoff=storyTiming.hook+audio.clips[4].start;
 return <AbsoluteFill style={{background:paper}}><StoryBeat start={0} end={storyTiming.hook}><Hook s={s}/></StoryBeat><StoryBeat start={storyTiming.hook} end={payoff}><Sequence from={Math.round(storyTiming.hook*fps)}><Explanation s={s}/></Sequence></StoryBeat><StoryBeat start={payoff}><Sequence from={Math.round(payoff*fps)}><Payoff s={s}/></Sequence></StoryBeat><Sequence from={Math.round(storyTiming.hook*fps)}><Narration silent={variant==='second'}/></Sequence>{variant==='primary'&&<Sequence durationInFrames={Math.round(storyTiming.hook*fps)}><Audio playbackRate={playbackSpeed} src={staticFile('proof/hook.wav')}/></Sequence>}</AbsoluteFill>;
};
