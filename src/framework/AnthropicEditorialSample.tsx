import React from 'react';
import {AbsoluteFill,Audio,Easing,interpolate,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {StageActor} from '../CharacterStage';
import narration from '../anthropic-character-audio.json';
import phrases from '../anthropic-caption-cues.json';
import financials from '../../episodes/002/financials.json';
import {playbackSpeed} from '../story-motion';
import {WordCaptionOverlay} from './captions/WordCaptionOverlay';
import type {WordCaptionCue,WordSemantic} from './captions/word-captions';

/** Synthetic art-direction REVIEW, not a publishable episode.
 * Original Voice A WAVs, facts, 1.1x clock and canonical host are unchanged.
 * Word positions below are inferred between measured PHRASE anchors, NOT
 * measured word alignment. Do not label them production caption timing.
 */
export const ANTHROPIC_EDITORIAL_SAMPLE_FRAMES=475;
const C={ink:'#142B38',dark:'#102D3C',white:'#FBFAF5',red:'#D8503D',teal:'#087E83',muted:'#64787B'};
const fast=Easing.bezier(0.15,0.7,0.18,1),move=Easing.bezier(0.32,0.01,0.21,1);
const ease=(t:number,s:number,e:number,fn=move)=>interpolate(t,[s,e],[0,1],{
  extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:fn});
const view=(t:number,s:number,e:number,ss:number,ee:number)=>
  ease(t,s,e,fast)*(1-ease(t,ss,ee,fast));
const lerp=(a:number,b:number,u:number)=>a+(b-a)*u;
const style=(x:number,y:number,extra:React.CSSProperties={}):React.CSSProperties=>({
  position:'absolute',left:x,top:y,...extra});
const semantic=(word:string):WordSemantic=>{
  const x=word.replace(/[^a-z]/gi,'').toLowerCase();
  if(x==='anthropic')return 'company';
  if(['billion','reported','loss','cash','operating','million','accounting',
    'financing','headline','pieces'].includes(x))return 'emphasis';
  return 'normal';
};
const provisionalWords:WordCaptionCue[]=[];
narration.clips.forEach((clip,ci)=>phrases.clips[ci].forEach((phrase,pi)=>{
  const tokens=phrase.text.trim().split(/\s+/);
  const start=clip.start+phrase.startSourceSeconds;
  const n=phrases.clips[ci][pi+1];
  const end=n?clip.start+n.startSourceSeconds:clip.start+clip.duration-0.12;
  const weights=tokens.map(w=>Math.max(1.1,Math.min(3.1,w.length/3.2)));
  const total=weights.reduce((a,b)=>a+b,0);let current=start;
  tokens.forEach((text,i)=>{
    const dur=Math.max(0.02,end-start-0.07)*weights[i]/total;
    provisionalWords.push({text,startSourceSeconds:current,endSourceSeconds:current+dur,
      lineId:String(ci)+'-'+pi+'-'+Math.floor(i/4),semantic:semantic(text)});
    current+=dur;
  });
}));
const previewTrack={timingBasis:'provisional-phrase-anchored' as const,words:provisionalWords};
const Header:React.FC<{label:string;t:number;dark?:boolean}>=({label,t,dark})=><>
  <div style={style(78,64,{fontSize:36,fontWeight:950,letterSpacing:2,
    color:dark?C.white:C.ink})}>OURBITES
    <span style={{fontSize:25,letterSpacing:1,fontWeight:760,
      color:dark?'#B4D1D0':C.muted,marginLeft:27}}>{label}</span></div>
  <div style={style(76,136,{width:928,height:4,background:dark?'#35515E':'#DAE0DA'})}>
    <div style={{height:4,width:(Math.min(t/17.5,1)*100)+'%',background:C.red}}/></div>
</>;

export const AnthropicEditorialSample:React.FC=()=>{
  const frame=useCurrentFrame(),{fps}=useVideoConfig(),t=frame/fps*playbackSpeed;
  const a=view(t,0.0,0.13,3.12,3.38),b=view(t,3.23,3.49,6.79,7.04);
  const c=view(t,6.93,7.15,11.13,11.40),d=ease(t,11.24,11.52,fast);
  const intro=ease(t,0.1,0.46,fast),pop=ease(t,0.32,0.87,move);
  const filing=ease(t,3.38,4.20,move),underline=ease(t,4.30,4.82,fast);
  const distinction=ease(t,5.13,5.79,fast),compare=ease(t,7.12,7.82,move);
  const operating=ease(t,8.04,8.79,fast),bar=ease(t,8.42,9.42,move);
  const fair=ease(t,11.63,12.25,fast),charge=ease(t,12.95,13.95,move);
  const payoff=ease(t,14.83,15.42,move);
  const net=Math.abs(financials.h1_2026.net_loss)/1000;
  const opLoss=Math.abs(financials.h1_2026.operating_loss);
  const chargeValue=Math.abs(financials.h1_2026.convertible_financing_fair_value_change)/1000;
  const base:React.CSSProperties={position:'absolute',inset:0,overflow:'hidden'};
  const scene=(opacity:number,bg:string,children:React.ReactNode)=>
    <AbsoluteFill style={{opacity,background:bg,overflow:'hidden'}}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{background:C.white,color:C.ink,
    fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
    {/* 1 — High-contrast editorial dossier. Character reacts to the headline. */}
    {scene(a,C.dark,<>
      <div style={{...base,background:'radial-gradient(ellipse at 80% 30%,#294F5D 0%,#102D3C 72%)'}}/>
      <Header label="THE IPO FILING" dark t={t}/>
      <div style={style(89,263,{fontSize:51,fontWeight:900,color:'#BDD2D1',
        letterSpacing:2,opacity:intro,transform:'translateY('+(1-intro)*50+'px)'})}>
        REPORTED NET LOSS
      </div>
      <div style={style(64,390,{fontSize:184,fontWeight:950,letterSpacing:-13,
        color:C.white,opacity:pop,transform:'translateY('+(1-pop)*140+'px)'})}>
        $80<span style={{color:C.red}}>.</span>75B
      </div>
      <div style={style(80,645,{height:11,width:890,background:'#36525E'})}>
        <div style={{width:(ease(t,1.45,2.25,fast)*100)+'%',
          height:11,background:C.red}}/>
      </div>
      <div style={style(557,795,{width:465,height:320,background:'#FEFDF9',
        transform:'rotate(-6deg) translateY('+(1-pop)*100+'px)',
        border:'5px solid '+C.ink,boxShadow:'17px 20px 0 #051B26',padding:24,
        boxSizing:'border-box'})}>
        <div style={{fontSize:46,fontWeight:950}}>ANTHROPIC</div>
        <div style={{fontSize:24,marginTop:12,color:C.muted}}>S-1 · H1 2026</div>
        <div style={{fontSize:28,marginTop:35}}>REPORTED NET LOSS</div>
        <div style={{fontSize:78,fontWeight:950,color:C.red}}>$80.75B</div>
        <div style={{fontSize:20,color:C.muted}}>ORIGINAL RECREATION</div>
      </div>
      <div style={style(88,1260,{fontSize:61,fontFamily:'Georgia,serif',
        fontStyle:'italic',color:'#F4AC9B',opacity:ease(t,1.46,1.98,fast)})}>
        That's a lot of zeros.
      </div>
      <div style={style(80,941,{opacity:view(t,0.24,0.50,3.02,3.34)})}>
        <StageActor x={0} y={0} size={330} pose={t<1.25?'react':'think'}
          gazeX={11} gazeY={-6} lean={lerp(-6,2,ease(t,1.15,1.8,move))}/>
      </div>
    </>)}
    {/* 2 — The actual label becomes the scene, not a full-slide paper wipe. */}
    {scene(b,C.white,<>
      <Header label="THE DISTINCTION" t={t}/>
      <div style={style(85,235,{fontSize:110,fontWeight:950,letterSpacing:-5,
        lineHeight:1.04,opacity:filing,transform:'translateX('+(1-filing)*-170+'px)'})}>
        REPORTED<div style={{color:C.red}}>NET LOSS.</div>
      </div>
      <div style={style(89,501,{height:12,width:790*underline,background:C.red})}/>
      <div style={style(562,627,{width:452,height:548,padding:30,
        boxSizing:'border-box',background:'white',border:'5px solid '+C.ink,
        boxShadow:'12px 19px 0 #D8DEDA',transform:'rotate('+
          lerp(-11,-3,filing)+'deg) translateY('+(1-filing)*70+'px)'})}>
        <div style={{fontSize:40,fontWeight:950}}>ANTHROPIC</div>
        <div style={{fontSize:22,color:C.muted}}>S-1 / RECREATED EXCERPT</div>
        <div style={{height:3,background:'#CFDBD3',marginTop:30}}/>
        <div style={{fontSize:26,color:C.muted,marginTop:33}}>REPORTED NET LOSS</div>
        <div style={{fontSize:82,fontWeight:950}}>$80.75B</div>
        <div style={{fontSize:29,color:C.red,marginTop:18}}>NOT CASH SPENT IN FULL</div>
        <div style={{height:14,width:330,background:'#DFEBE6',marginTop:36}}/>
        <div style={{height:14,width:250,background:'#DFEBE6',marginTop:13}}/>
      </div>
      <div style={style(95,964,{opacity:view(t,3.57,3.85,6.70,6.99)})}>
        <StageActor x={0} y={0} size={322} pose={t<5?'point':'explain'}
          gazeX={10} gazeY={-4} lean={lerp(-4,1,ease(t,4.14,4.82,move))}/>
      </div>
      {/* Editorial ink annotation instead of a slide-like opaque bar that
          would obscure the protagonist's torso and arm. */}
      <div style={style(464,1239,{opacity:distinction,
        transform:'translateY('+(1-distinction)*46+'px)',
        fontFamily:'Georgia,serif',fontStyle:'italic',
        fontSize:58,color:C.red,whiteSpace:'nowrap'})}>not cash spent.</div>
      <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,
        width:'100%',height:'100%',pointerEvents:'none'}}>
        <path d="M468 1323 C635 1330 790 1312 947 1323" fill="none"
          stroke={C.red} strokeWidth={10} strokeLinecap="round"
          strokeDasharray="560"
          strokeDashoffset={560*(1-distinction)}/>
      </svg>
    </>)}
    {/* 3 — Same story, more precise graphic comparison; no generic moving cards. */}
    {scene(c,C.white,<>
      <Header label="OPERATING VS NET" t={t}/>
      <div style={style(88,243,{fontSize:108,fontWeight:950,letterSpacing:-5})}>
        BIG LOSS.</div>
      <div style={style(90,383,{fontSize:77,color:C.red,
        fontFamily:'Georgia,serif',fontStyle:'italic'})}>Different meaning.</div>
      <div style={style(95,629,{opacity:compare,
        transform:'translateY('+(1-compare)*100+'px)'})}>
        <div style={{fontSize:34,fontWeight:850,color:C.muted,letterSpacing:2}}>
          REPORTED NET LOSS</div>
        <div style={{fontSize:120,fontWeight:950,letterSpacing:-7}}>$80.75B</div>
        <div style={{height:17,width:865,background:C.red,borderRadius:12}}/>
      </div>
      <div style={style(95,946,{opacity:operating,
        transform:'translateY('+(1-operating)*65+'px)'})}>
        <div style={{fontSize:34,fontWeight:850,color:C.muted,letterSpacing:2}}>
          OPERATING LOSS</div>
        <div style={{fontSize:131,fontWeight:950,color:C.teal,letterSpacing:-8}}>
          {'$'+opLoss+'M'}</div>
        <div style={{width:865,height:18,background:'#DDE9E5',borderRadius:10}}>
          <div style={{width:865*opLoss/(net*1000)*bar,height:18,
            background:C.teal,borderRadius:10}}/>
        </div>
      </div>
      <div style={style(100,1295,{fontSize:50,color:C.teal,
        fontStyle:'italic',fontFamily:'Georgia,serif',
        opacity:ease(t,9.9,10.25,fast)})}>Still serious. Not eighty billion.</div>
      <div style={style(737,1047,{opacity:view(t,7.14,7.43,11.01,11.36)})}>
        <StageActor x={0} y={0} size={260} pose={t<8.5?'think':'point'}
          gazeX={-10} gazeY={-6} lean={lerp(4,-2,ease(t,8.4,9.1,move))}/>
      </div>
    </>)}
    {/* 4 — Accounting charge and payoff, actor comments on the actual mechanism. */}
    {scene(d,C.white,<>
      <Header label="FOLLOW THE ACCOUNTING" t={t}/>
      <div style={style(89,249,{fontSize:50,fontWeight:900,
        letterSpacing:2,opacity:fair})}>THE BIGGEST PIECE</div>
      <div style={style(85,340,{fontSize:158,fontWeight:950,
        letterSpacing:-10,opacity:fair,
        transform:'translateY('+(1-fair)*85+'px)'})}>
        {'$'+chargeValue.toFixed(2)+'B'}
      </div>
      <div style={style(90,548,{fontSize:70,color:C.red,
        fontFamily:'Georgia,serif',fontStyle:'italic',
        opacity:fair})}>a fair-value change.</div>
      <div style={style(100,752,{width:870,height:122,
        background:'#E5ECE9',borderRadius:20,overflow:'hidden'})}>
        <div style={{width:(charge*100)+'%',height:122,background:C.red,
          borderRadius:20}}/>
      </div>
      <div style={style(103,906,{fontSize:27,fontWeight:850,color:C.muted,
        opacity:1-payoff})}>CONVERTIBLE FINANCING · REVALUATION</div>
      <div style={style(95,1098,{opacity:payoff,
        transform:'translateY('+(1-payoff)*100+'px)'})}>
        <div style={{fontSize:99,fontWeight:950,letterSpacing:-5}}>READ THE</div>
        <div style={{fontSize:120,fontFamily:'Georgia,serif',fontStyle:'italic',
          color:C.red}}>pieces.</div>
        <div style={{fontSize:40,color:C.muted,marginTop:10}}>Not just the headline.</div>
      </div>
      <div style={style(772,1116,{opacity:view(t,11.46,11.79,17.08,17.42)})}>
        <StageActor x={0} y={0} size={253} pose={t<15.2?'explain':'point'}
          gazeX={-11} gazeY={-4}
          lean={lerp(5,-4,ease(t,13.2,15.1,move))}/>
      </div>
    </>)}
    {/* Caption overlay stays in screen space, while scenes move independently. */}
    <div style={style(65,1490,{width:950,height:241,
      background:'rgba(251,250,245,0.97)',borderTop:'3px solid #DBE1DE',
      borderRadius:12,zIndex:90})}/>
    <WordCaptionOverlay track={previewTrack} sourceTimeSeconds={t} top={1538}/>
    <div style={style(72,1812,{fontSize:22,color:C.muted,
      fontWeight:850,zIndex:110})}>
      ANTHROPIC S-1 · H1 2026 · ORIGINAL RECREATED GRAPHICS
    </div>
    <div style={style(72,1855,{fontSize:20,color:C.muted,zIndex:110})}>
      PREVIEW ONLY · WORD CUES ESTIMATED BETWEEN MEASURED PHRASE STARTS
    </div>
    {narration.clips.map(clip=><Sequence key={clip.file}
      from={Math.round(clip.start*fps/playbackSpeed)}
      durationInFrames={Math.ceil(clip.duration*fps/playbackSpeed)}>
      <Audio src={staticFile(clip.file)} playbackRate={playbackSpeed}/>
    </Sequence>)}
  </AbsoluteFill>;
};
