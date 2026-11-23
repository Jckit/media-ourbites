import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {OurbitesHost} from './OurbitesHost';
import episode from '../episodes/002/m1-episode.json';

const ink = '#142B38';
const teal = '#087E83';
const cream = '#F4F0E6';
const orange = '#D8503D';
const motion = Easing.bezier(.22, .05, .25, 1);
const arrive = Easing.bezier(.16, .75, .22, 1);
const phase = (t: number, start: number, end: number, easing = motion) =>
  interpolate(t, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

/** One nine-month accounting entry. Times are local review-scene seconds. */
export const m1PressPose = (t: number) => {
  const feed = phase(t, .6, 2.4);
  const print = phase(t, 1.8, 3.4);
  const travel = phase(t, 3.4, 5.8, arrive);
  const retreat = phase(t, 3.8, 5.5);
  const angle = -.5 + feed * Math.PI * 2;
  const crank = {x: 590 + Math.cos(angle) * 60, y: 1050 + Math.sin(angle) * 60};
  const release = phase(t, 2.7, 3.4);
  // One sheet persists from the roller mouth to the ledger pocket.
  const u = 1 - travel;
  const x = u*u*u*440 + 3*u*u*travel*450 + 3*u*travel*travel*730 + travel*travel*travel*730;
  const y = u*u*u*1135 + 3*u*u*travel*900 + 3*u*travel*travel*780 + travel*travel*travel*740;
  return {
    feed, print, travel, retreat, crank, angle,
    sheet: {x: t < 3.4 ? 440 : x, y: t < 3.4 ? 920 + 215 * print : y,
      scale: 1 - .18 * travel, rotation: -10 * Math.sin(Math.PI * travel)},
    hand: {x: crank.x * (1-release) + 610 * release, y: crank.y * (1-release) + 1200 * release},
    ledger: phase(t, 2.8, 4.2),
    caveat: phase(t, 6.2, 6.6),
  };
};

export const M1AnthropicFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const s = m1PressPose(t);
  const actor = {x: 730, y: 1080, width: 250};
  const scale = actor.width / 360;
  const machineX = -850 * s.retreat;
  const ledgerX = 400 * (1-s.ledger);
  return <AbsoluteFill style={{backgroundColor: cream, color: ink, fontFamily: 'Arial, sans-serif'}}>
    <svg viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
      <defs>
        <pattern id="m1-grid" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M72 0H0V72" fill="none" stroke={ink} strokeWidth="1" opacity=".055"/>
        </pattern>
        <clipPath id="m1-output"><rect x="0" y={t<3.4 ? 950 : 0} width="1080" height="1920"/></clipPath>
      </defs>
      <rect width="1080" height="1920" fill="url(#m1-grid)"/>
      <text x="72" y="110" fontSize="30" fontWeight="800" letterSpacing="3">OURBITES / ANTHROPIC</text>
      <text x="72" y="170" fontSize="27">Nine months ended September 30, 2026</text>
      <text x="72" y="270" fontSize="58" fontWeight="900">Follow the accounting entry.</text>
      <text x="72" y="325" fontSize="27" fill={teal}>Illustrative mechanism</text>

      <g transform={`translate(${ledgerX} 0)`} opacity={s.ledger}>
        <rect x="480" y="390" width="530" height="510" rx="10" fill="#142B3815" transform="translate(10 14)"/>
        <rect x="480" y="390" width="530" height="510" rx="10" fill="#FFFEF9" stroke={ink} strokeWidth="4"/>
        <text x="520" y="450" fontSize="27" fontWeight="800">REPORTED NET LOSS</text>
        <text x="520" y="550" fontSize="80" fontWeight="900">$104.04B</text>
        <path d="M520 585H970" stroke={ink} strokeWidth="3"/>
        <text x="520" y="630" fontSize="24" fill={teal}>INCLUDES THIS CHARGE</text>
        <rect x="525" y="655" width="430" height="190" rx="6" fill="#DBE8DF" stroke={teal} strokeWidth="2"/>
      </g>

      <g opacity={(1-s.retreat)*(1-phase(t,2.1,2.4))} transform={`translate(${machineX} 0)`}>
        <g transform={`translate(${440-25*Math.sin(s.feed*Math.PI)} ${540+380*s.feed}) rotate(${-7*(1-s.feed)})`}>
          <rect x="-180" y="-90" width="360" height="200" fill="#D8E5D4" stroke={ink} strokeWidth="4"/>
          <text textAnchor="middle" y="-25" fontSize="33" fontWeight="800">FINANCING</text>
          <text textAnchor="middle" y="25" fontSize="29">Fair value rises</text>
          <path d="M-130 65H130" stroke={teal} strokeWidth="4"/>
        </g>
      </g>

      <g clipPath="url(#m1-output)" opacity={phase(t,1.65,1.8)}>
        <g transform={`translate(${s.sheet.x} ${s.sheet.y}) scale(${s.sheet.scale}) rotate(${s.sheet.rotation})`}>
          <rect x="-225" y="-105" width="450" height="210" rx="5" fill="#142B3820" transform={`translate(${8+12*Math.sin(s.travel*Math.PI)} ${12+12*Math.sin(s.travel*Math.PI)})`}/>
          <rect x="-225" y="-105" width="450" height="210" rx="5" fill="#FFFEF9" stroke={ink} strokeWidth="4"/>
          <text textAnchor="middle" y="-50" fontSize="27" fontWeight="800">FAIR-VALUE CHARGE</text>
          <text textAnchor="middle" y="35" fontSize="73" fontWeight="900" fill={orange}>$94.32B</text>
          <text textAnchor="middle" y="80" fontSize="24">Convertible financing</text>
        </g>
      </g>

      <g transform={`translate(${machineX} 0)`} opacity={1-s.retreat}>
        <ellipse cx="440" cy="1260" rx="270" ry="30" fill={ink} opacity=".13"/>
        <path d="M210 875L255 830H675L700 875V975H210Z" fill="#78958D" stroke={ink} strokeWidth="5"/>
        <rect x="210" y="875" width="490" height="100" rx="10" fill={teal} stroke={ink} strokeWidth="5"/>
        <rect x="225" y="855" width="465" height="45" rx="23" fill="#C1D2C8" stroke={ink} strokeWidth="4"/>
        <text x="455" y="945" textAnchor="middle" fontSize="30" fontWeight="800" fill={cream}>ACCOUNTING ENTRY</text>
        <path d="M250 975L230 1240M660 975L680 1240" stroke={ink} strokeWidth="18"/>
        <path d="M665 950V1050H590" stroke={ink} strokeWidth="16" fill="none"/>
        <line x1="590" y1="1050" x2={s.crank.x} y2={s.crank.y} stroke={ink} strokeWidth="15" strokeLinecap="round"/>
        <circle cx={s.crank.x} cy={s.crank.y} r="17" fill="#C58B59" stroke={ink} strokeWidth="4"/>
      </g>
      <g opacity={phase(t,5.7,5.95)}>
        <path d="M515 815Q740 837 965 815V890H515Z" fill="#DBE8DF" stroke={teal} strokeWidth="3"/>
        <text x="740" y="870" textAnchor="middle" fontSize="25" fontWeight="700">Other entries also contribute</text>
      </g>
      <g opacity={s.caveat}>
        <path d="M72 1200H660" stroke={teal} strokeWidth="5"/>
        <text x="72" y="1270" fontSize="36" fontWeight="800">This charge</text>
        <text x="72" y="1330" fontSize="36">creates no cash payment.</text>
      </g>
      <path d="M72 1440H1008" stroke={ink} strokeWidth="2" opacity=".2"/>
    </svg>
    <div style={{position: 'absolute', left: actor.x, top: actor.y, width: actor.width}}>
      <OurbitesHost width={actor.width} height={actor.width*520/360}
        pose="explain" gazeX={t<3.4 ? 8 : 10} gazeY={t<3.4 ? -2 : -7}
        rightHandTarget={{x:(s.hand.x-actor.x)/scale, y:(s.hand.y-actor.y)/scale}}/>
    </div>
    <div style={{position:'absolute',left:72,top:1510,width:936,fontSize:38,fontWeight:700,lineHeight:1.3}}>
      {t<3.4 ? 'A financing revaluation enters the accounts.' : t<6.2 ? 'One charge explains most of the gap.' : 'Accounting charges and cash flows answer different questions.'}
    </div>
    <div style={{position:'absolute',left:72,top:1740,width:936,fontSize:26,lineHeight:1.5}}>
      SEC S-1/A · Nov 10, 2026 · p. 27<br/>
      Visual review · silent · {episode.scenes.find(scene=>scene.id==='press')?.id} scene
    </div>
  </AbsoluteFill>;
};
