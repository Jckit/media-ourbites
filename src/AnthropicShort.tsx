import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import episode from '../episodes/002/episode.json';
import {getHumanReviewedAsset, ReviewedMediaInsert} from './ReviewedMediaInsert';

// Silent editorial storyboard: not a voiced, approved or publishable master.
export const ANTHROPIC_SHORT_FPS = 30;
export const ANTHROPIC_SHORT_FRAMES =
  episode.scenes.reduce((sum, scene) => sum + Math.round(scene.duration * ANTHROPIC_SHORT_FPS), 0);
const C = {paper:'#F4F0E6', ink:'#142B38', teal:'#087E83',
  orange:'#E97F48', muted:'#607078', pale:'#E0E9E7', white:'#FFFFFF'};
const DATA = {revenueH12025:1.163, revenueH12026:16.286, operatingLoss:-0.693,
  fairValueChange:-72.388, otherExpense:-8.757, interestIncome:1.111, tax:-0.021,
  netLoss:-80.748, computeExpense:8.945};
const afterFairValue = DATA.otherExpense + DATA.interestIncome + DATA.tax;
const reconciledNet = DATA.operatingLoss + DATA.fairValueChange + afterFairValue;
if (Math.abs(reconciledNet - DATA.netLoss) > 0.0000001) {
  throw new Error('Anthropic S-1 earnings bridge does not reconcile');
}
const money = (value:number) => (value<0?'-':'+')+'$'+Math.abs(value).toFixed(3)+'B';
const fade = (frame:number,from:number,length=12)=>
  interpolate(frame,[from,from+length],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const NumberCard:React.FC<{label:string;value:string;accent?:string;sub?:string;size?:number}> =
({label,value,accent=C.ink,sub,size=100})=>(
<div style={{background:C.white,borderRadius:32,padding:'42px 44px',boxShadow:'0 11px 32px rgba(20,43,56,0.07)'}}>
  <div style={{fontSize:27,fontWeight:750,letterSpacing:1.5,color:C.muted}}>{label}</div>
  <div style={{fontSize:size,fontWeight:900,letterSpacing:-3,color:accent,marginTop:9}}>{value}</div>
  {sub&&<div style={{fontSize:25,color:C.muted,marginTop:9}}>{sub}</div>}
</div>
);
const Revenue:React.FC<{frame:number}>=({frame})=>{
  const progress=fade(frame,4,32);
  const pair=[{label:'H1 2025',value:DATA.revenueH12025},{label:'H1 2026',value:DATA.revenueH12026}];
  return <div style={{background:C.white,borderRadius:32,padding:46}}>
    <div style={{fontSize:31,color:C.muted,marginBottom:38}}>REVENUE · USD BILLIONS</div>
    {pair.map(({label,value})=><div key={label} style={{marginBottom:48}}>
      <div style={{fontSize:37,display:'flex',justifyContent:'space-between',fontWeight:800,color:C.ink}}>
        <span>{label}</span><span>{'$'+value.toFixed(3)+'B'}</span>
      </div>
      <div style={{marginTop:20,height:88,background:C.pale,borderRadius:14,overflow:'hidden'}}>
        <div style={{height:'100%',width:String(100*value/DATA.revenueH12026*progress)+'%',
          borderRadius:14,background:C.teal}}/>
      </div>
    </div>)}
    <div style={{color:C.teal,fontSize:84,fontWeight:900,opacity:fade(frame,29)}}>
      14.0× <span style={{fontSize:30}}>same-period revenue</span>
    </div>
  </div>;
};
const LossContrast:React.FC<{frame:number}>=({frame})=>(
<div style={{display:'grid',gap:23}}>
  <div style={{opacity:fade(frame,0)}}><NumberCard label="OPERATING LOSS · H1 2026" value="$0.693B"
    accent={C.teal} sub="Real operating loss"/></div>
  <div style={{opacity:fade(frame,20)}}><NumberCard label="REPORTED NET LOSS · H1 2026" value="$80.748B"
    accent={C.orange} sub="Includes large non-operating items"/></div>
</div>
);
const Accounting:React.FC<{frame:number}>=({frame})=>{
  const rows:[string,number,string][]=[
    ['Operating loss',DATA.operatingLoss,C.ink],
    ['Fair-value remeasurement',DATA.fairValueChange,C.orange],
    ['Other net + interest − tax',afterFairValue,C.muted],
  ];
  return <div style={{background:C.white,borderRadius:30,padding:42}}>
    <div style={{fontSize:29,color:C.muted,marginBottom:26}}>H1 2026 · USD BILLIONS · REPORTED EARNINGS</div>
    {rows.map(([label,value,color],i)=><div key={label} style={{
      opacity:fade(frame,i*23,14),display:'flex',justifyContent:'space-between',
      borderBottom:'2px solid '+C.pale,padding:'21px 0',gap:16,alignItems:'center'}}>
      <div style={{fontSize:30,color:C.ink,flex:1}}>{label}</div>
      <div style={{fontSize:45,fontWeight:850,color}}>{money(value)}</div>
    </div>)}
    <div style={{marginTop:25,opacity:fade(frame,74,16),display:'flex',
      alignItems:'center',justifyContent:'space-between'}}>
      <div style={{fontSize:31,fontWeight:850,color:C.ink}}>NET LOSS</div>
      <div style={{fontSize:55,fontWeight:900,color:C.orange}}>{money(DATA.netLoss)}</div>
    </div>
    <div style={{fontSize:26,lineHeight:1.38,marginTop:42,color:C.muted}}>
      Fair-value remeasurement is not a matching cash operating expense.
    </div>
  </div>;
};
const DataCenter:React.FC<{frame:number}>=({frame})=>(
<div style={{background:C.ink,color:C.white,borderRadius:34,padding:42}}>
  <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:12}}>
    {[0,1,2,3].map(rack=><div key={rack} style={{width:178,height:390,padding:20,
      background:'#294956',borderRadius:15,display:'flex',flexDirection:'column',
      justifyContent:'space-around',border:'3px solid '+C.teal}}>
      {[0,1,2,3,4].map(light=><div key={light} style={{height:26,borderRadius:6,
        background:(Math.floor(frame/13)+rack+light)%3===0?C.orange:C.teal}}/>)}
    </div>)}
  </div>
  <div style={{marginTop:36,fontSize:28}}>Compute & infrastructure · H1 2026</div>
  <div style={{fontSize:107,fontWeight:900,color:'#F3B38A'}}>{'$'+DATA.computeExpense.toFixed(3)+'B'}</div>
  <div style={{fontSize:28,color:'#D5E0DE'}}>Operating expense — not a cash-flow figure</div>
</div>
);
const Closing:React.FC<{frame:number}>=({frame})=>(
<div style={{display:'grid',gap:26}}>
{[['GROWTH','14× half-year revenue'],['OPERATING COSTS','Compute remains expensive'],
  ['IPO TERMS','Offer price not yet set']].map(([label,detail],i)=><div key={label} style={{
    opacity:fade(frame,i*19,14),background:i===2?C.ink:C.white,
    color:i===2?C.white:C.ink,borderRadius:28,padding:'38px 44px'}}>
  <div style={{fontSize:30,fontWeight:900,letterSpacing:2}}>{label}</div>
  <div style={{fontSize:35,marginTop:14}}>{detail}</div>
</div>)}
</div>
);
const Hook:React.FC<{frame:number}>=({frame})=>(
<div style={{display:'grid',gap:30}}>
  <div style={{fontSize:30,fontWeight:850,letterSpacing:2,color:C.teal}}>ANTHROPIC · PROPOSED IPO</div>
  <div style={{opacity:fade(frame,8,15)}}>
    <NumberCard label="REPORTED NET LOSS · H1 2026" value="$80.75B"
      accent={C.orange} sub="Filed October 26, 2026"/></div>
  <div style={{opacity:fade(frame,42,13),fontSize:47,fontWeight:850,color:C.ink}}>
    ...But what kind of loss?</div>
</div>
);
const Scene:React.FC<{scene:(typeof episode.scenes)[number];index:number}>=({scene,index})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const elapsed=Math.max(0,frame/fps);
  const media=getHumanReviewedAsset(scene.id);
  let graphic:React.ReactNode;
  if(scene.id==='hook') graphic=<Hook frame={frame}/>;
  else if(scene.id==='growth') graphic=<Revenue frame={frame}/>;
  else if(scene.id==='operations') graphic=<LossContrast frame={frame}/>;
  else if(scene.id==='accounting') graphic=<Accounting frame={frame}/>;
  else if(scene.id==='cost') graphic=<DataCenter frame={frame}/>;
  else graphic=<Closing frame={frame}/>;
  return <AbsoluteFill style={{background:C.paper,color:C.ink,
    fontFamily:'Arial, Helvetica, sans-serif',padding:'100px 88px 152px'}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:29,fontWeight:900,
      letterSpacing:5,paddingBottom:36,borderBottom:'3px solid '+C.ink}}>
      <span>OURBITES</span><span>{String(index+1).padStart(2,'0')}</span>
    </div>
    <div style={{fontSize:27,fontWeight:850,letterSpacing:2,color:C.teal,marginTop:75}}>
      {scene.kicker}</div>
    <div style={{fontSize:77,lineHeight:1.08,letterSpacing:-2.5,
      fontWeight:900,marginTop:23,minHeight:226}}>{scene.title}</div>
    <div style={{position:'relative',marginTop:17}}>
      {media && (scene.id==='growth'||scene.id==='cost') &&
        <div style={{marginBottom:22}}><ReviewedMediaInsert sceneId={scene.id} height={310}/></div>}
      {graphic}
    </div>
    <div style={{position:'absolute',bottom:248,left:88,right:88,
      borderTop:'2px solid '+C.ink,paddingTop:28,fontSize:35,lineHeight:1.3}}>
      {scene.narration}</div>
    <div style={{position:'absolute',bottom:124,left:88,right:88,color:C.muted,
      fontSize:23,display:'flex',justifyContent:'space-between'}}>
      <span>EDITORIAL STORYBOARD · SILENT · UNAPPROVED</span>
      <span>{elapsed.toFixed(1)+'s / '+scene.duration+'s'}</span>
    </div>
  </AbsoluteFill>;
};
export const AnthropicShort:React.FC=()=>{
  let offset=0;
  return <AbsoluteFill style={{background:C.paper}}>
    {episode.scenes.map((scene,index)=>{
      const start=offset;
      const duration=Math.round(scene.duration*ANTHROPIC_SHORT_FPS);
      offset+=duration;
      return <Sequence key={scene.id} from={start} durationInFrames={duration}>
        <Scene scene={scene} index={index}/>
      </Sequence>;
    })}
  </AbsoluteFill>;
};
