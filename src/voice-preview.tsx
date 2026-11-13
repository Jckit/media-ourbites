import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';
import {OurbitesHost} from './OurbitesHost';
import {OfficeWorld} from './BusinessWorld';

type Clip = {text: string; file: string; startFrame: number; durationInFrames: number};
type Props = {clips: Clip[]; durationInFrames: number};
const ink = '#142B38', teal = '#087E83';

const Preview: React.FC<Props> = ({clips}) => {
  const frame = useCurrentFrame();
  const active = clips.findIndex(c => frame >= c.startFrame && frame < c.startFrame + c.durationInFrames);
  const issue = clips[2]?.startFrame ?? 180;
  const reveal = interpolate(frame, [issue, issue + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const after = frame >= (clips[3]?.startFrame ?? 240);
  const payoff = frame >= (clips[5]?.startFrame ?? 360);
  return <AbsoluteFill style={{background: '#F4F0E6', color: ink, fontFamily: 'Arial, sans-serif'}}>
    <OfficeWorld t={10}/>
    <div style={{position: 'absolute', top: 120, left: 80, fontSize: 30, letterSpacing: 5, fontWeight: 800}}>OURBITES</div>
    <div style={{position: 'absolute', top: 230, left: 80, right: 80, fontSize: 76, lineHeight: 1.08, fontWeight: 900}}>{payoff ? 'Smaller percentage.\nNot necessarily less value.' : 'Same shares.\nSmaller slice?'}</div>
    <div style={{position: 'absolute', top: 570, left: 390, width: 590, padding: 35, boxSizing: 'border-box', background: '#fffdf7', border: `4px solid ${ink}`, borderRadius: 12}}>
      <div style={{fontSize: 26, marginBottom: 24}}>ILLUSTRATIVE SHARE COUNT</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12}}>{Array.from({length: 25}, (_, i) => <div key={i} style={{height: 42, borderRadius: 5, opacity: i < 20 ? 1 : reveal, transform: i < 20 ? undefined : `translateY(${(1 - reveal) * 24}px)`, background: i < 2 ? teal : i < 20 ? '#DAE1DF' : '#E97F48'}}/>)}</div>
      <div style={{fontSize: 26, marginTop: 22}}>Each tile = 5 shares</div>
      <div style={{fontSize: 64, fontWeight: 900, color: teal, marginTop: 24}}>{after ? '10 / 125 = 8%' : '10 / 100 = 10%'}</div>
      <div style={{fontSize: 27}}>Your 10 shares stay yours.</div>
    </div>
    <div style={{position: 'absolute', left: 45, top: 910}}><OurbitesHost width={390} height={565} pose={active === 4 ? 'react' : payoff ? 'explain' : after ? 'point' : 'think'}/></div>
    <div style={{position: 'absolute', top: 1530, left: 75, right: 75, minHeight: 195, background: '#F4F0E6', padding: 24, boxSizing: 'border-box', fontSize: 47, lineHeight: 1.2, fontWeight: 700, textAlign: 'center'}}>{active >= 0 ? clips[active].text : ''}</div>
    <div style={{position: 'absolute', bottom: 95, left: 80, fontSize: 25, color: '#607078'}}>VOICE PREVIEW · JUSTIN · ILLUSTRATIVE EXAMPLE</div>
    {clips.map(c => <Sequence key={c.file} from={c.startFrame} durationInFrames={c.durationInFrames}><Audio src={staticFile(c.file)} playbackRate={1}/></Sequence>)}
  </AbsoluteFill>;
};
registerRoot(() => <Composition id="JustinVoicePreview" component={Preview} width={1080} height={1920} fps={30} durationInFrames={600} defaultProps={{clips: [], durationInFrames: 600}} calculateMetadata={({props}) => ({durationInFrames: props.durationInFrames})}/>);
