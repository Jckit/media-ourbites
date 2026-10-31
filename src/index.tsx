import {ObjectLedContinuityCandidate, OBJECT_CONTINUITY_FRAMES} from './framework/motion-library/ObjectLedContinuityCandidate';
import {AnthropicCharacter,CHARACTER_FRAMES} from './AnthropicCharacter';
import {PaperFocusPreview} from './framework/PaperFocusPreview';
import {FrameworkPreview} from './framework/FrameworkPreview';
import React from 'react';
import {AbsoluteFill, Composition, Sequence, interpolate, registerRoot, useCurrentFrame, useVideoConfig} from 'remotion';
import example from '../examples/merger.json';
import {OwnershipProof} from './OwnershipProof';
import {AnthropicShort, ANTHROPIC_SHORT_FRAMES} from './AnthropicShort';
import proofAudio from './proof-audio.json';
import {playbackSpeed,storyTiming} from './story-motion';
import {OurbitesHostCameo} from './OurbitesHost';

type Scene = {id: string; duration: number; kicker: string; title: string; narration: string; visual: string; labels: string[]; claim_ids: string[]};
type Episode = {title: string; scenes: Scene[]; draft?: boolean};
const colors = {ink: '#142B38', paper: '#F4F0E6', teal: '#087E83', orange: '#E97F48', muted: '#607078'};

const Diagram: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [0, fps * 1.3], [0, 1], {extrapolateRight: 'clamp'});
  const box = (x: number, y: number, label: string, accent = colors.teal) => <g key={label}>
    <rect x={x} y={y} width={330} height={145} rx={24} fill={accent}/>
    <text x={x+165} y={y+86} textAnchor="middle" fill="white" fontSize={42} fontWeight={700}>{label}</text>
  </g>;
  return <svg viewBox="0 0 900 600" width="100%" height="100%" aria-label={scene.title}>
    {scene.visual === 'combination' && <>
      {box(40, 100, scene.labels[0])}{box(530, 100, scene.labels[1], colors.ink)}
      <path d="M370 170 L520 170" stroke={colors.orange} strokeWidth={10} strokeDasharray="16 12" strokeDashoffset={-frame}/>
      <text x="450" y="365" textAnchor="middle" fontSize="84" fill={colors.ink} fontWeight="800">?</text>
      <text x="450" y="455" textAnchor="middle" fontSize="34" fill={colors.muted}>{scene.labels[2]}</text>
    </>}
    {scene.visual === 'ownership' && <>
      <text x="40" y="80" fontSize="30" fill={colors.muted}>ILLUSTRATIVE SHARE COUNT</text>
      <rect x="40" y="130" width="650" height="100" rx="16" fill="#D7DFDB"/>
      <rect x="40" y="130" width={65 * progress} height="100" rx="12" fill={colors.teal}/>
      <text x="40" y="285" fontSize="42" fill={colors.ink}>10 / 100 = 10%</text>
      <rect x="40" y="340" width="812" height="100" rx="16" fill="#D7DFDB"/>
      <rect x="40" y="340" width={65 * progress} height="100" rx="12" fill={colors.teal}/>
      <rect x="690" y="340" width={162 * progress} height="100" rx="12" fill={colors.orange}/>
      <text x="40" y="505" fontSize="42" fill={colors.ink}>10 / 125 = 8%</text>
      <text x="40" y="565" fontSize="29" fill={colors.muted}>Same shares. Smaller percentage.</text>
    </>}
    {scene.visual === 'balance' && <>
      <path d="M450 120 V440 M210 230 H690 M340 460 H560" stroke={colors.ink} strokeWidth={18} strokeLinecap="round"/>
      <circle cx="210" cy={260 - 40*progress} r="110" fill={colors.teal}/>
      <circle cx="690" cy={220 + 40*progress} r="110" fill={colors.orange}/>
      <text x="210" y="270" textAnchor="middle" fontSize="32" fill="white">VALUE</text>
      <text x="690" y="270" textAnchor="middle" fontSize="32" fill={colors.ink}>PRICE</text>
      <text x="450" y="550" textAnchor="middle" fontSize="32" fill={colors.muted}>{scene.labels[0]}</text>
    </>}
    {scene.visual === 'steps' && scene.labels.map((label, i) => <g key={label} opacity={interpolate(frame, [i*12, i*12+15], [0,1], {extrapolateLeft:'clamp',extrapolateRight:'clamp'})}>
      <circle cx="100" cy={90+i*160} r="44" fill={colors.teal}/>
      <text x="100" y={105+i*160} textAnchor="middle" fontSize="38" fill="white">{i+1}</text>
      <text x="180" y={105+i*160} fontSize="38" fill={colors.ink} fontWeight="650">{label}</text>
    </g>)}
  </svg>;
};

const SceneView: React.FC<{scene: Scene; index: number; draft: boolean}> = ({scene,index,draft}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lift = interpolate(frame,[0,16],[30,0],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:colors.paper,color:colors.ink,fontFamily:'Arial, sans-serif',padding:'140px 84px 230px'}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:26,letterSpacing:3,fontWeight:700}}><span>OURBITES</span><span>{String(index+1).padStart(2,'0')}</span></div>
    <div style={{marginTop:100,color:colors.teal,fontWeight:700,fontSize:29,letterSpacing:3}}>{scene.kicker}</div>
    <div style={{fontSize:80,lineHeight:1.06,fontWeight:800,letterSpacing:-3,marginTop:28,minHeight:270,transform:`translateY(${lift}px)`}}>{scene.title}</div>
    <div style={{height:600,marginTop:20}}><Diagram scene={scene}/></div>
    {(index===0 || scene.visual==='ownership' || scene.id==='close') &&
      <OurbitesHostCameo pose={index===0?'react':scene.visual==='ownership'?'explain':'point'}
        top={970} right={82} width={178}/>}
    <div style={{borderTop:`3px solid ${colors.ink}`,paddingTop:32,fontSize:34,lineHeight:1.35,marginTop:35}}>{scene.narration}</div>
    <div style={{position:'absolute',bottom:140,left:84,right:84,fontSize:24,color:colors.muted,display:'flex',justifyContent:'space-between'}}><span>{draft ? 'SILENT STORYBOARD Ã‚Â· EDITORIAL REVIEW REQUIRED' : 'BUSINESS EXPLAINED'}</span><span>{scene.duration}s</span></div>
    <div style={{position:'absolute',bottom:105,left:84,width:912,height:6,background:'#D7DFDB'}}><div style={{width:`${100*Math.min(1,frame/(scene.duration*fps))}%`,height:'100%',background:colors.teal}}/></div>
  </AbsoluteFill>;
};

const Explainer: React.FC<Episode> = ({scenes,draft=true}) => {
  const {fps} = useVideoConfig();
  let offset=0;
  return <AbsoluteFill>{scenes.map((scene,index) => {
    const start=offset; const frames=Math.round(scene.duration*fps); offset+=frames;
    return <Sequence key={scene.id} from={start} durationInFrames={frames}><SceneView scene={scene} index={index} draft={draft}/></Sequence>;
  })}</AbsoluteFill>;
};

const Root: React.FC = () => <Composition id="BusinessShort" component={Explainer} defaultProps={example} width={1080} height={1920} fps={30} durationInFrames={1800} calculateMetadata={({props})=>({durationInFrames:props.scenes.reduce((n,s)=>n+Math.round(s.duration*30),0)})}/>;
const AllCompositions:React.FC=()=> <><Root/><Composition id="AnthropicCharacter" component={AnthropicCharacter} width={1080} height={1920} fps={30} durationInFrames={CHARACTER_FRAMES}/><Composition id="AnthropicShort" component={AnthropicShort} width={1080} height={1920} fps={30} durationInFrames={ANTHROPIC_SHORT_FRAMES}/><Composition id="OwnershipProof" component={OwnershipProof} width={1080} height={1920} fps={30} durationInFrames={Math.ceil((proofAudio.duration+storyTiming.hook)*30/playbackSpeed)}/><Composition id="OwnershipSecondScenario" component={OwnershipProof} defaultProps={{variant:"second" as const}} width={1080} height={1920} fps={30} durationInFrames={Math.ceil((proofAudio.duration+storyTiming.hook)*30/playbackSpeed)}/></>;
const FrameworkCompositions:React.FC=()=> <><AllCompositions/>
  <Composition id="MotionCandidateObjectContinuity" component={ObjectLedContinuityCandidate} width={1080} height={1920} fps={30} durationInFrames={OBJECT_CONTINUITY_FRAMES}/>
  <Composition id="PaperFocusFiling" component={PaperFocusPreview} defaultProps={{variant:'filing' as const}} width={1080} height={1920} fps={30} durationInFrames={210}/>
  <Composition id="PaperFocusReceipt" component={PaperFocusPreview} defaultProps={{variant:'receipt' as const}} width={1080} height={1920} fps={30} durationInFrames={210}/>
  <Composition id="FrameworkOffice" component={FrameworkPreview} defaultProps={{environment:'office' as const}} width={1080} height={1920} fps={30} durationInFrames={240}/>
  <Composition id="FrameworkStorefront" component={FrameworkPreview} defaultProps={{environment:'storefront' as const}} width={1080} height={1920} fps={30} durationInFrames={240}/>
</>;
registerRoot(FrameworkCompositions);
