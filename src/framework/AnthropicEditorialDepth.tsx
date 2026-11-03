import React from 'react';
import {AbsoluteFill,Audio,Easing,interpolate,Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {StageActor} from '../CharacterStage';
import {DarioIllustration} from '../DarioIllustration';
import {BurningCashMetaphor} from './motion/BurningCashMetaphor';
import narration from '../anthropic-character-audio.json';
import {anthropicProvisionalWordTrack} from './AnthropicEditorialMotionV2';
import {EditorialGrid} from './motion/EditorialGrid';
import {DepthPlane} from './motion/DepthPlane';
import {depthPath} from './motion/depth-motion';
import financials from '../../episodes/002/financials.json';
import {playbackSpeed} from '../story-motion';
import {WordCaptionOverlay} from './captions/WordCaptionOverlay';


/** Synthetic art-direction REVIEW, not a publishable episode.
 * Original Voice A WAVs, facts, 1.1x clock and canonical host are unchanged.
 * Word positions below are inferred between measured PHRASE anchors, NOT
 * measured word alignment. Do not label them production caption timing.
 */
export const ANTHROPIC_DEPTH_FRAMES=475;
const C={ink:'#142B38',dark:'#102D3C',white:'#FBFAF5',red:'#D8503D',teal:'#087E83',muted:'#64787B'};
const fast=Easing.bezier(0.15,0.7,0.18,1),move=Easing.bezier(0.32,0.01,0.21,1);
const ease=(t:number,s:number,e:number,fn=move)=>interpolate(t,[s,e],[0,1],{
  extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:fn});
const view=(t:number,s:number,e:number,ss:number,ee:number)=>
  ease(t,s,e,fast)*(1-ease(t,ss,ee,fast));
const lerp=(a:number,b:number,u:number)=>a+(b-a)*u;
const style=(x:number,y:number,extra:React.CSSProperties={}):React.CSSProperties=>({
  position:'absolute',left:x,top:y,...extra});
const Header:React.FC<{label:string;t:number;dark?:boolean}>=({label,t,dark})=><>
  <div style={style(78,64,{fontSize:36,fontWeight:950,letterSpacing:2,
    color:dark?C.white:C.ink})}>OURBITES
    <span style={{fontSize:25,letterSpacing:1,fontWeight:760,
      color:dark?'#B4D1D0':C.muted,marginLeft:27}}>{label}</span></div>
  <div style={style(76,136,{width:928,height:4,background:dark?'#35515E':'#DAE0DA'})}>
    <div style={{height:4,width:(Math.min(t/17.5,1)*100)+'%',background:C.red}}/></div>
</>;

export const AnthropicEditorialDepth:React.FC=()=>{
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
  const hookCamera={x:18*ease(t,.35,2.8),y:-10*ease(t,.35,2.8),zoom:1+.035*ease(t,.35,2.8)};
  const exit=ease(t,2.85,3.38,move);
  const comparisonCamera={x:lerp(-38,15,compare),y:12*(1-compare),zoom:lerp(.88,1.02,compare)};
  const accountingCamera={x:lerp(-40,16,charge),y:-4,zoom:lerp(.94,1.03,charge)};
  const marker=depthPath(charge,[{x:144,y:695,z:0},{x:320,y:648,z:0},{x:502,y:210,z:0},{x:887,y:140,z:0}]);
  const scene=(opacity:number,bg:string,children:React.ReactNode)=>
    <AbsoluteFill style={{opacity,background:bg,overflow:'hidden'}}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{background:C.white,color:C.ink,
    fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
    {/* 1 — High-contrast editorial dossier. Character reacts to the headline. */}
    {scene(a,C.dark,<>
<EditorialGrid tone="amber" dark travel={ease(t,.3,2.8)}/>
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
      {/* Original animated money pile: an intentionally misleading visual
          metaphor, explicitly disproved in the next beat. */}
      <DepthPlane camera={hookCamera} z={-120*exit} tiltX={3*exit} tiltY={-5*exit}>
      <div style={style(64,510,{width:950,height:810,opacity:pop,
        transform:'scale('+lerp(0.90,1,pop)+')',transformOrigin:'50% 60%'})}>
        <BurningCashMetaphor time={t} depth/>
      </div>
      </DepthPlane>
      <div style={style(550,1392,{fontSize:21,color:'#F9D9C9',
        fontWeight:850,letterSpacing:0.7})}>VISUAL METAPHOR · NOT ACTUAL CASH BURNED</div>
      <div style={style(505,1239,{fontSize:50,fontFamily:'Georgia,serif',
        fontStyle:'italic',color:'#F4AC9B',opacity:ease(t,1.46,1.98,fast)})}>
        That's a lot of zeros.
      </div>
      
    </>)}
    {/* 2 — The actual label becomes the scene, not a full-slide paper wipe. */}
    {scene(b,C.white,<>
      <EditorialGrid tone="teal" travel={filing}/>
      <Header label="THE DISTINCTION" t={t}/>
      <div style={style(85,235,{fontSize:110,fontWeight:950,letterSpacing:-5,
        lineHeight:1.04,opacity:filing,transform:'translateX('+(1-filing)*-170+'px)'})}>
        REPORTED<div style={{color:C.red}}>NET LOSS.</div>
      </div>
      <div style={style(89,501,{height:12,width:790*underline,background:C.red})}/>
      {/* The cash metaphor gives way to animated accounting vocabulary.
          No generic paper-card reveal. */}
      <DepthPlane camera={{x:-18*(1-filing),y:0,zoom:1}} z={-80*(1-filing)} tiltY={-7*(1-filing)}>
      <svg style={{position:'absolute',left:0,top:540,width:1080,height:760}}
        viewBox="0 0 1080 760">
        <path d="M147 265 C360 153 650 251 885 172"
          fill="none" stroke="#C8DDD3" strokeWidth={26} strokeLinecap="round"
          strokeDasharray={960} strokeDashoffset={960*(1-filing)}/>
        <text x={540} y={376} fill={C.ink} fontWeight={950}
          fontSize={111} textAnchor="middle" opacity={filing}>NET LOSS</text>
        <text x={540} y={534} fill={C.muted} fontWeight={860}
          fontSize={71} textAnchor="middle" opacity={distinction}>≠ CASH SPENT</text>
        <path d="M196 587 C366 614 650 575 882 513"
          stroke={C.red} strokeWidth={17} strokeLinecap="round" fill="none"
          strokeDasharray={830} strokeDashoffset={830*(1-distinction)}/>
      </svg>
      </DepthPlane>
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
      <EditorialGrid tone="violet" travel={compare}/>
      <Header label="OPERATING VS NET" t={t}/>
      <div style={style(88,243,{fontSize:108,fontWeight:950,letterSpacing:-5})}>
        BIG LOSS.</div>
      <div style={style(90,383,{fontSize:77,color:C.red,
        fontFamily:'Georgia,serif',fontStyle:'italic'})}>Different meaning.</div>
      {/* Contrasting financial values now tilt an animated balance.
          The lever and delayed second value have independent speed profiles. */}
      <DepthPlane camera={comparisonCamera} z={-70*(1-compare)} tiltX={lerp(16,6,compare)} tiltY={lerp(-16,7,compare)} origin={{x:540,y:1120}}>
      <svg style={{position:'absolute',left:0,top:485,
        width:1080,height:780,overflow:'visible'}} viewBox="0 0 1080 780">
        <ellipse cx={540} cy={706} rx={230} ry={22} fill="#142B38" opacity={.12}/>
        <path d="M540 272 L466 685 H613Z" fill="#C8E2D8"
          stroke={C.ink} strokeWidth={9}/>
        <rect x={364} y={663} width={352} height={29} rx={14} fill={C.ink}/>
        <g style={{filter:'drop-shadow(8px 16px 5px #142B3826)'}} transform={'rotate('+(-14*Math.sin(Math.PI*compare*0.83))+' 540 272)'}>
          <path d="M140 276 H937" fill="none" stroke={C.ink}
            strokeWidth={18} strokeLinecap="round"/>
          <circle cx={540} cy={276} r={34} fill={C.white}
            stroke={C.ink} strokeWidth={8}/>
          <path d="M200 276 V414 M879 276 V414" fill="none"
            stroke={C.ink} strokeWidth={8}/>
          <path d="M85 415 Q200 573 319 415Z" fill="#FBDDD3"
            stroke={C.ink} strokeWidth={11}/>
          <path d="M760 415 Q879 573 994 415Z" fill="#CDEAE6"
            stroke={C.ink} strokeWidth={11}/>
        </g>
        <text x={650} y={757} textAnchor="middle" fill={C.red}
          fontFamily="Georgia,serif" fontStyle="italic" fontSize={42}
          opacity={bar}>reported net ≠ operating</text>
      </svg>
      </DepthPlane>
      {/* Values are screen-space foreground, never intersecting suspension lines. */}
      <div style={style(88,547,{opacity:compare,transform:`translateY(${35*(1-compare)}px)`,zIndex:6})}>
        <div style={{fontSize:27,fontWeight:850,letterSpacing:1,color:C.muted}}>REPORTED NET LOSS</div>
        <div style={{fontSize:86,fontWeight:950,color:C.red,letterSpacing:-4}}>{'$'+net.toFixed(2)+'B'}</div>
      </div>
      <div style={style(712,547,{opacity:operating,transform:`translateY(${42*(1-operating)}px)`,zIndex:6})}>
        <div style={{fontSize:27,fontWeight:850,letterSpacing:1,color:C.muted}}>OPERATING LOSS</div>
        <div style={{fontSize:78,fontWeight:950,color:C.teal,letterSpacing:-4}}>{'$'+opLoss+'M'}</div>
      </div>
      <div style={style(385,1313,{fontSize:45,color:C.teal,
        fontStyle:'italic',fontFamily:'Georgia,serif',
        opacity:ease(t,9.9,10.25,fast)})}>Still serious. Not eighty billion.</div>
      
    </>)}
    {/* 4 — Accounting charge and payoff, actor comments on the actual mechanism. */}
    {scene(d,C.white,<>
      <EditorialGrid tone="teal" travel={charge}/>
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
      {/* Original valuation curve with animated dash and endpoint.
          Conceptually follows the balance, not another fullscreen card. */}
      <DepthPlane camera={accountingCamera} z={-65} tiltX={lerp(22,9,charge)} tiltY={lerp(-14,4,charge)} origin={{x:540,y:1100}}>
      <svg style={{position:'absolute',left:0,top:495,width:1080,height:820,
        opacity:1-payoff}}
        viewBox="0 0 1080 820">
        <path d="M91 717 H989 M91 520 H989 M91 323 H989"
          stroke="#D6E4DD" strokeWidth={4} strokeDasharray="12 16"/>
        <g style={{filter:'drop-shadow(9px 15px 3px #142B3826)'}}>
        <path d="M144 695 C320 648 502 210 887 140"
          fill="none" stroke={C.red} strokeWidth={19} strokeLinecap="round"
          strokeDasharray={1370} strokeDashoffset={1370*(1-charge)}/>
        <circle cx={marker.x} cy={marker.y}
          r={22} fill={C.red} opacity={charge}/>
        <path d="M606 680 C732 628 773 521 832 472"
          stroke={C.teal} strokeWidth={13} strokeLinecap="round"
          strokeDasharray={450} strokeDashoffset={450*(1-charge)}
          fill="none" opacity={charge}/>
        <path d="M801 482 L839 456 L833 510" fill="none"
          stroke={C.teal} strokeWidth={11} strokeLinecap="round"
          strokeLinejoin="round" opacity={charge}/>
        </g>
      </svg>
      </DepthPlane>
      <div style={style(100,901,{fontSize:27,fontWeight:900,
        letterSpacing:1.2,color:C.muted,opacity:1-payoff})}>
        CONVERTIBLE FINANCING · FAIR-VALUE REVALUATION
      </div>
      <div style={style(376,1134,{opacity:payoff,
        transform:'translateY('+(1-payoff)*100+'px)'})}>
        <div style={{fontSize:70,fontWeight:950,letterSpacing:-3}}>READ THE</div>
        <div style={{fontSize:88,fontFamily:'Georgia,serif',fontStyle:'italic',
          color:C.red}}>pieces.</div>
        <div style={{fontSize:31,color:C.muted,marginTop:10,whiteSpace:'nowrap'}}>Not just the headline.</div>
      </div>
      
      {/* Dario returns as a second character, with original vector design,
          and an authored hand gesture; illustration, not a claim he spoke. */}
      <div style={style(768,1015,{width:270,height:390,
        opacity:Math.min(1,Math.max(0,(t-11.45)/0.77)),
        transform:'translateY('+(1-Math.min(1,Math.max(0,(t-11.45)/0.77)))*96+'px)'})}>
        <div style={{position:'absolute',left:40,top:358,width:185,height:17,borderRadius:'50%',background:'#142B3825',transform:`scaleX(${1-.15*charge})`}}/>
        <div style={{width:270,height:390,
          transform:'rotate('+lerp(-6,5,ease(t,12.8,14.15,move))+'deg)',
          transformOrigin:'50% 85%'}}>
          <DarioIllustration gesture={ease(t,12.8,14.15,move)}/>
        </div>
        <div style={{fontSize:20,fontWeight:900,color:C.muted,
          letterSpacing:1,textAlign:'center'}}>DARIO · ILLUSTRATION</div>
      </div>
    </>)}
    {/* The protagonist occupies the identical home position across shots.
        Only body pose, lean and gaze change with the story. */}
    <div style={style(65,1090,{width:300,height:405,zIndex:70,
      pointerEvents:'none',transformOrigin:'50% 96%',
      transform:'rotate('+lerp(-4,3,ease(t,4.3,5.0,move))+'deg)'})}>
      <StageActor x={0} y={0} size={278}
        pose={t<3.23?'think':t<7?'explain':'point'}
        poseFrom={t<3.23?'react':t<7?'think':'explain'}
        poseBlend={t<3.23?ease(t,1.1,1.8,move):
          t<7?ease(t,4.7,5.3,move):
          t<11.4?ease(t,8.4,9.0,move):ease(t,14.6,15.2,move)}
        gazeX={t<3.23?12:-6} gazeY={-4}/>
    </div>
    {/* Caption overlay stays in screen space, while scenes move independently. */}
    <div style={style(65,1490,{width:950,height:241,
      background:'rgba(251,250,245,0.97)',borderTop:'3px solid #DBE1DE',
      borderRadius:12,zIndex:90})}/>
    <WordCaptionOverlay track={anthropicProvisionalWordTrack} sourceTimeSeconds={t} top={1538}/>
    <div style={style(72,1812,{fontSize:22,color:C.muted,
      fontWeight:850,zIndex:110})}>
      ANTHROPIC S-1 · H1 2026 · CASH FIRE IS A METAPHOR · ORIGINAL GRAPHICS
    </div>
    <div style={style(72,1855,{fontSize:20,color:C.muted,zIndex:110})}>
      PREVIEW ONLY · WORD CUES PROVISIONAL · NOT WORD-ALIGNED
    </div>
    {narration.clips.map(clip=><Sequence key={clip.file}
      from={Math.round(clip.start*fps/playbackSpeed)}
      durationInFrames={Math.ceil(clip.duration*fps/playbackSpeed)}>
      <Audio src={staticFile(clip.file)} playbackRate={playbackSpeed}/>
    </Sequence>)}
  </AbsoluteFill>;
};
