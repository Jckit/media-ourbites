import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {StageActor} from '../../CharacterStage';
import {DarioIllustration} from '../../DarioIllustration';
import narration from '../../anthropic-character-audio.json';
import financials from '../../../episodes/002/financials.json';
import {playbackSpeed} from '../../story-motion';
import {EditorialGrid} from '../motion/EditorialGrid';
import {depthPlaneTransform, projectDepth} from '../motion/depth-motion';
import {WordCaptionOverlay} from '../captions/WordCaptionOverlay';
import {anthropicProvisionalWordTrack} from '../AnthropicEditorialMotionV2';
import {accountingPressState} from './accounting-press';

const clip = narration.clips[3];
export const ACCOUNTING_PRESS_FRAMES = Math.ceil(clip.duration / playbackSpeed * 30);
const ink = '#142B38', cream = '#FFF9E9', teal = '#087E83', orange = '#D8503D';
const amount = `$${(Math.abs(financials.h1_2026.convertible_financing_fair_value_change)/1000).toFixed(2)}B`;
const reportedLoss = `$${(Math.abs(financials.h1_2026.net_loss)/1000).toFixed(2)}B`;
const at = (left:number, top:number, extra:React.CSSProperties = {}):React.CSSProperties =>
  ({position:'absolute', left, top, ...extra});

/** One original illustrative accounting mechanism. Not a source facsimile or historical event. */
export const AccountingPressProof:React.FC = () => {
  const frame = useCurrentFrame(), {fps} = useVideoConfig(), t = frame/fps;
  const s = accountingPressState(t);
  const note = projectDepth(s.slip, s.camera);
  const world = depthPlaneTransform(0, s.camera);
  // Dario's arm endpoint is solved from the same projected crank endpoint, in his SVG coordinates.
  const hand = {x:(s.hand.x-768)/.75, y:(s.hand.y-1015)/.75};
  const follow = Math.min(1,s.flight*4);
  const gaze = {x:Math.max(-1,Math.min(1,(s.receipt.x-903)/200))*follow,
    y:Math.max(-1,Math.min(1,(s.receipt.y-1122)/200))*follow};
  return <AbsoluteFill style={{fontFamily:'Arial, sans-serif', color:ink, overflow:'hidden'}}>
    <EditorialGrid tone="amber" travel={s.feed*.65+s.widen*.35}/>
    <Audio src={staticFile(clip.file)} playbackRate={playbackSpeed}/>
    <div style={at(72,72,{fontSize:32,fontWeight:900,letterSpacing:2})}>OURBITES <span style={{fontSize:25,fontWeight:500}}> / ANTHROPIC</span></div>
    <div style={at(72,140,{fontSize:27})}>H1 2026 · FINANCING ACCOUNTING</div>
    <div style={at(72,195,{fontSize:25,color:'#6D5A44'})}>Illustrative mechanism · not an actual event</div>

    {/* Receiving statement has a fixed sourced total. The incoming charge is one included component. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <g transform={`translate(${1100*(1-s.resultArrival)} 0)`}>
        <path d="M226 310 H896 V1022 H226 Z" fill="#142B3820"/>
        <path d="M210 300 L245 278 H900 L880 300 V1000 H210 Z" fill="#D5CAB4" stroke={ink} strokeWidth="3"/>
        <rect x="210" y="300" width="670" height="700" rx="6" fill={cream} stroke={ink} strokeWidth="4"/>
        <path d="M240 300 V1000" stroke="#C4B696" strokeWidth="8"/>
        <text x="270" y="355" fontSize="36" fontWeight="800">ANTHROPIC</text>
        <text x="270" y="415" fontSize="32" fontWeight="700">REPORTED NET LOSS</text>
        <text x="270" y="510" fontSize="88" fontWeight="900">{reportedLoss}</text>
        <path d="M270 543 H820" stroke={ink} strokeWidth="3"/>
        <text x="560" y="590" textAnchor="middle" fontSize="29" fontWeight="700">INCLUDES THIS COMPONENT</text>
        <rect x="300" y="625" width="520" height="320" rx="8" fill="#D8E5D4" stroke={teal} strokeWidth="3"/>
        <path d="M316 642 H804" stroke="#AFBFAC" strokeWidth="5"/>
        <path d="M300 910 Q560 935 820 910 V980 H300 Z" fill="#CBDDC8" stroke={teal} strokeWidth="3"/>
        <text x="560" y="961" textAnchor="middle" fontSize="24" fontWeight="700">OTHER LINES ALSO CONTRIBUTE</text>
      </g>
    </svg>

    {/* Slip has its own spatial route. Front housing masks it continuously at the feed mouth. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><clipPath id="press-feed-mask"><rect x="0" y="0" width="1080" height={projectDepth({x:0,y:760,z:0},s.camera).y}/></clipPath></defs>
      <g clipPath="url(#press-feed-mask)">
        <g transform={`translate(${note.x} ${note.y}) scale(${note.scale}) rotate(${-8*(1-s.feed)})`}>
          <path d="M-200 -140 L195 -140 L215 120 L-190 120 Z" fill="#142B3818" transform="translate(14 16)"/>
          <path d="M-200 -140 L195 -140 L205 120 L-190 120 Z" fill="#D8E5D4" stroke={ink} strokeWidth="4"/>
          <path d="M-180 -118 H175 M-180 -105 H175" stroke={teal} strokeWidth="3"/>
          <text x="0" y="-55" textAnchor="middle" fontSize="35" fontWeight="800">FINANCING</text>
          <text x="0" y="7" textAnchor="middle" fontSize="35" fontWeight="800" fill={teal}>FAIR VALUE</text>
          <text x="0" y="56" textAnchor="middle" fontSize="35" fontWeight="800" fill={teal}>REMEASURED</text>
          <path d="M-160 86 H160" stroke={teal} strokeWidth="2"/>
        </g>
      </g>
    </svg>

    {/* One persistent output sheet: roller transport → curved flight → statement pocket. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><clipPath id="press-output-mask"><rect x="0" y={t<2.85?projectDepth({x:0,y:820,z:0},s.camera).y:0} width="1080" height="1920"/></clipPath></defs>
      <g clipPath="url(#press-output-mask)">
        <g transform={`translate(${s.receipt.x} ${s.receipt.y}) scale(${s.receipt.scale}) rotate(${s.receiptAngle})`}>
          <path d="M-225 -120 H225 V130 L205 142 L185 130 L165 142 L145 130 L125 142 L105 130 L85 142 L65 130 L45 142 L25 130 L5 142 L-15 130 L-35 142 L-55 130 L-75 142 L-95 130 L-115 142 L-135 130 L-155 142 L-175 130 L-195 142 L-215 130 Z" fill="#142B3825" transform={`translate(${9+12*Math.sin(s.flight*Math.PI)} ${11+18*Math.sin(s.flight*Math.PI)})`}/>
          <path d="M-225 -120 H225 V130 L205 142 L185 130 L165 142 L145 130 L125 142 L105 130 L85 142 L65 130 L45 142 L25 130 L5 142 L-15 130 L-35 142 L-55 130 L-75 142 L-95 130 L-115 142 L-135 130 L-155 142 L-175 130 L-195 142 L-215 130 Z" fill={cream} stroke={ink} strokeWidth="3"/>
          <text x="0" y="-70" textAnchor="middle" fontSize="29" fontWeight="800">FINANCING ADJUSTMENT</text>
          <text x="0" y="-28" textAnchor="middle" fontSize="28">Fair-value charge</text>
          <text x="0" y="48" textAnchor="middle" fontSize="67" fontWeight="900" fill={orange}>{amount}</text>
          <text x="0" y="96" textAnchor="middle" fontSize="26">Accounting effect, not cash spent</text>
        </g>
      </g>
    </svg>

    {/* Camera owns the mechanism only. Captions, people and cash retain screen anchors. */}
    <div style={{position:'absolute',inset:0,transformOrigin:'540px 800px',transform:world}}>
      <svg viewBox="0 0 1080 1920" width="100%" height="100%">
        <defs>
          <linearGradient id="roller" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#718C91"/><stop offset=".45" stopColor="#CBD8D4"/><stop offset="1" stopColor="#304F59"/></linearGradient>
        </defs>
        <ellipse cx="510" cy="1192" rx="303" ry="31" fill={ink} opacity=".14"/>
        {/* Extruded cheeks + visible top establish a shallow three-quarter view. */}
        <path d="M215 758 L263 706 H738 L790 758 L742 894 H220 Z" fill="#78958D" stroke={ink} strokeWidth="4"/>
        <path d="M215 758 H742 V894 H215 Z" fill={teal} stroke={ink} strokeWidth="4"/>
        <path d="M742 758 L790 706 V850 L742 894 Z" fill="#07555C" stroke={ink} strokeWidth="4"/>
        <rect x="245" y="736" width="468" height="51" rx="23" fill="url(#roller)" stroke={ink} strokeWidth="4"/>
        <g transform={`translate(720 761) rotate(${s.rollerDegrees})`}>
          <circle r="25" fill="#C2CEBF" stroke={ink} strokeWidth="4"/>
          <path d="M-19 0 H19 M0 -19 V19" stroke={ink} strokeWidth="5"/>
        </g>
        <text x="480" y="844" textAnchor="middle" fill={cream} fontSize="29" fontWeight="800">ACCOUNTING ENTRY</text>
        <path d="M725 866 V1130 H755" stroke={ink} strokeWidth="22" fill="none" strokeLinejoin="round"/>
      </svg>
    </div>

    {/* The front pocket lip occludes the sheet only as it arrives: visible physical inclusion. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <g opacity={s.dock} transform={`translate(${1100*(1-s.resultArrival)} 0)`}>
        <path d="M300 910 Q560 935 820 910 V980 H300 Z" fill="#CBDDC8" stroke={teal} strokeWidth="3"/>
        <text x="560" y="961" textAnchor="middle" fontSize="24" fontWeight="700">OTHER LINES ALSO CONTRIBUTE</text>
      </g>
    </svg>

    <style>{'.accounting-press-dario > svg { overflow: visible; }'}</style>
    <div className="accounting-press-dario" style={at(768,1015,{width:270})}><DarioIllustration hand={hand} gaze={gaze}/></div>
    {/* Foreground crank and hand use screen-space projection; no independently guessed grip. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <line x1={projectDepth({x:755,y:1130,z:0},s.camera).x} y1={projectDepth({x:755,y:1130,z:0},s.camera).y}
        x2={s.crank.x} y2={s.crank.y} stroke={ink} strokeWidth="19" strokeLinecap="round"/>
      <circle cx={s.crank.x} cy={s.crank.y} r="20" fill="#C4794F" stroke={ink} strokeWidth="4"/>
      <path d={`M${s.hand.x-9} ${s.hand.y-12} q20 -10 21 9 q0 12 -13 13`} opacity={s.grip} fill="none" stroke="#F0C99F" strokeWidth="11" strokeLinecap="round"/>
    </svg>
    <StageActor x={65} y={1090} size={278} pose={t<2.85?'explain':'point'}
      poseFrom={t<2.85?'react':'explain'} poseBlend={t<2.85?s.output:follow}
      gazeX={.8-.3*s.flight} gazeY={-.7-.2*s.flight} lean={-2*s.impact}/>
    {/* No banknote is destroyed, spent, added or removed during this accounting action. */}
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <ellipse cx="480" cy="1372" rx="132" ry="17" fill={ink} opacity=".13"/>
      {[2,1,0].map(i=><g key={i} transform={`translate(${353+i*10} ${1300-i*10}) rotate(-5 120 40)`}>
        <rect width="240" height="85" rx="4" fill="#ACCAB1" stroke={ink} strokeWidth="3"/>
        <rect x="12" y="10" width="216" height="65" rx="3" fill="#D7E4CD" stroke="#6C927D" strokeWidth="3"/>
        <ellipse cx="120" cy="43" rx="28" ry="27" fill="none" stroke="#6C927D" strokeWidth="3"/>
        <text x="120" y="54" textAnchor="middle" fontSize="33" fill="#52785F">$</text>
      </g>)}
    </svg>
    <div style={at(325,1394,{width:370,textAlign:'center',fontSize:28,fontWeight:800,color:teal})}>ILLUSTRATIVE CASH: UNCHANGED</div>
    <div style={at(785,1435,{fontSize:22})}>DARIO · ILLUSTRATION</div>
    <div style={at(65,1490,{width:950,height:241,borderRadius:16,background:cream})}/>
    <WordCaptionOverlay track={anthropicProvisionalWordTrack} sourceTimeSeconds={clip.start+t*playbackSpeed} top={1538}/>
    <div style={at(72,1750,{width:936,fontSize:28,fontWeight:800,color:orange})}>ACCOUNTING CHANGE ≠ CASH SPENT</div>
    <div style={at(72,1800,{fontSize:25})}>Selected component · not a full reconciliation</div>
    <div style={at(72,1842,{fontSize:21})}>S-1 · H1 2026 · Unapproved · Word timings provisional</div>
  </AbsoluteFill>;
};
