import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
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
  // One sheet persists from the roller mouth to the ledger pocket.
  const u = 1 - travel;
  const x = u*u*u*440 + 3*u*u*travel*450 + 3*u*travel*travel*730 + travel*travel*travel*730;
  const y = u*u*u*1135 + 3*u*u*travel*900 + 3*u*travel*travel*780 + travel*travel*travel*740;
  return {
    feed, print, travel, retreat, crank, angle,
    sheet: {x: t < 3.4 ? 440 : x, y: t < 3.4 ? 920 + 215 * print : y,
      scale: 1 - .18 * travel, rotation: -10 * Math.sin(Math.PI * travel)},
    ledger: phase(t, 2.8, 4.2),
    caveat: phase(t, 6.2, 6.6),
  };
};

export const M1PressLedgerScene: React.FC<{localSeconds?: number; integrated?: boolean}> = ({localSeconds, integrated = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = localSeconds ?? frame / fps;
  const s = m1PressPose(t);
  const actor = {x: 730, y: 1080, width: 250};
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
      <g opacity={integrated ? 0 : 1}>
      <text x="72" y="110" fontSize="30" fontWeight="800" letterSpacing="3">OURBITES / ANTHROPIC</text>
      <text x="72" y="170" fontSize="27">Nine months ended September 30, 2026</text>
      <text x="72" y="270" fontSize="58" fontWeight="900">Follow the accounting entry.</text>
      <text x="72" y="325" fontSize="27" fill={teal}>Illustrative mechanism</text>
      </g>

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
          <rect x="-180" y="-90" width="360" height="200" fill={integrated ? '#FFFEF9' : '#D8E5D4'} stroke={ink} strokeWidth="4"/>
          <text textAnchor="middle" y="-25" fontSize={integrated ? 27 : 33} fontWeight="800">{integrated ? 'FAIR-VALUE CHARGE' : 'FINANCING'}</text>
          <text textAnchor="middle" y="25" fontSize={integrated ? 45 : 29} fill={integrated ? orange : ink}>{integrated ? '$94.32B' : 'Fair value rises'}</text>
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
        pose="explain" poseFrom="think" poseBlend={phase(t,3.4,4.2)}
        gazeX={-5} gazeY={t<3.4 ? -2 : -7}/>
    </div>
    {!integrated && <div style={{position:'absolute',left:72,top:1510,width:936,fontSize:38,fontWeight:700,lineHeight:1.3}}>
      {t<3.4 ? 'A financing revaluation enters the accounts.' : t<6.2 ? 'One charge explains most of the gap.' : 'Accounting charges and cash flows answer different questions.'}
    </div>}
    {!integrated && <div style={{position:'absolute',left:72,top:1740,width:936,fontSize:26,lineHeight:1.5}}>
      SEC S-1/A · Nov 10, 2026 · p. 27<br/>
      Visual review · silent · {episode.scenes.find(scene=>scene.id==='press')?.id} scene
    </div>}
  </AbsoluteFill>;
};

// Review-only cue clock. These are authored scene boundaries, NOT word alignment.
// Pass a new cue array after the final WAV has been accepted and aligned.
export const M1_REVIEW_CUES = [0, 4.9, 8.9, 14.9, 20.3, 26.6, 33.7];
export const m1FilmShotAt = (seconds: number, cues: readonly number[] = M1_REVIEW_CUES) => {
  if (cues.length !== 7 || cues[0] !== 0 || cues.some((v, i) => !Number.isFinite(v) || (i > 0 && v <= cues[i - 1]))) {
    throw new Error('M1 requires seven finite, increasing cue boundaries starting at zero');
  }
  const shot = Math.max(0, Math.min(5, cues.findIndex((end, i) => i > 0 && seconds < end) - 1));
  const index = seconds >= cues[6] ? 5 : shot;
  return {index, seconds: Math.max(0, seconds - cues[index]), duration: cues[index + 1] - cues[index]};
};

const Slip: React.FC<{x: number; y: number; scale?: number; angle?: number; charged?: boolean}> =
  ({x, y, scale = 1, angle = 0, charged = false}) => <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${angle})`}>
    <rect x="-225" y="-105" width="450" height="210" rx="5" fill={ink} opacity=".12" transform="translate(9 12)"/>
    <rect x="-225" y="-105" width="450" height="210" rx="5" fill={charged ? '#FFFEF9' : '#D8E5D4'} stroke={ink} strokeWidth="4"/>
    <text y="-50" textAnchor="middle" fontSize="27" fontWeight="800">{charged ? 'FAIR-VALUE CHARGE' : 'FINANCING'}</text>
    <text y="25" textAnchor="middle" fontSize={charged ? 73 : 37} fontWeight="900" fill={charged ? orange : teal}>{charged ? '$94.32B' : 'Outstanding notes'}</text>
    <text y="80" textAnchor="middle" fontSize="24">{charged ? 'Convertible financing' : 'Fair value can change'}</text>
  </g>;

const Binder: React.FC<{children: React.ReactNode; angle?: number}> = ({children, angle = 0}) =>
  <g transform={`rotate(${angle} 540 820)`}>
    <path d="M100 440L950 420L980 1250L130 1280Z" fill={ink} opacity=".12" transform="translate(14 18)"/>
    <path d="M100 440L950 420L980 1250L130 1280Z" fill="#D5DCCE" stroke={ink} strokeWidth="5"/>
    <rect x="157" y="465" width="755" height="730" rx="7" fill="#FFFEF9" stroke={ink} strokeWidth="3"/>
    <path d="M187 465V1195" stroke={ink} strokeWidth="14"/>
    {[560, 810, 1060].map(y => <ellipse key={y} cx="187" cy={y} rx="33" ry="14" fill="none" stroke="#91A69F" strokeWidth="10"/>)}
    {children}
  </g>;

type FilmProps = {audioSrc?: string | null; cues?: number[]};

/** One continuous six-shot working cut. Final voice/caption approval stays separate. */
export const M1AnthropicFilm: React.FC<FilmProps> = ({audioSrc = null, cues = M1_REVIEW_CUES}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const shot = m1FilmShotAt(t, cues);
  const n = shot.index;
  const s = shot.seconds;
  const p = s / shot.duration;
  const beat = (start: number, end: number) => phase(s, start, end);
  const titles = ['Where did the money go?', 'Start with the funding.', 'Value rises. So does the obligation.',
    'Follow the accounting entry.', 'Running costs are still real.', 'Can growth become lasting profit?'];
  return <AbsoluteFill style={{backgroundColor: cream, color: ink, fontFamily: 'Arial, sans-serif'}}>
    <svg viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs>
        <pattern id="film-grid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0H0V72" fill="none" stroke={ink} strokeWidth="1" opacity=".045"/></pattern>
        <clipPath id="film-page"><rect x="215" y="480" width="680" height="690"/></clipPath>
      </defs>
      <rect width="1080" height="1920" fill="url(#film-grid)"/>
      <path d="M0 1430L1080 1390V1460H0Z" fill="#D7DCD0"/>

      {n === 0 && <g transform={`translate(${(1-beat(0,.7))*-25} ${(1-beat(0,.7))*50})`}>
        <Binder angle={-2 + 2*beat(0,.8)}>
          <text x="250" y="560" fontSize="31" fontWeight="800">REPORTED NET LOSS</text>
          <g transform={`translate(250 720) scale(${1+.04*beat(.15,1.5)})`}>
            <text fontSize="110" fontWeight="900" fill={orange}>$104.04B</text>
          </g>
          <path d="M250 770H850" stroke={ink} strokeWidth="4"/>
          <text x="250" y="825" fontSize="28">Nine months ended Sep 30, 2026</text>
          <g opacity={beat(1.6,2.1)} transform={`translate(0 ${(1-beat(1.6,2.1))*20})`}>
            <path d="M250 950Q500 925 820 955" fill="none" stroke={teal} strokeWidth="8"/>
            <text x="250" y="1010" fontSize="43" fontWeight="800">Where did it go?</text>
          </g>
        </Binder>
        <g transform={`translate(${900-160*beat(3.4,4.4)} 900)`}><rect width="160" height="110" fill={teal}/><text x="80" y="65" textAnchor="middle" fontSize="24" fontWeight="800" fill={cream}>FINANCING</text></g>
      </g>}

      {n === 1 && <>
        <g transform={`translate(${-310*beat(.1,1.2)} ${90*beat(.1,1.2)}) rotate(${-8*beat(.1,1.2)} 500 850)`}>
          <Binder><text x="250" y="600" fontSize="39" fontWeight="800">FINANCING</text><path d="M250 680H820M250 760H820M250 840H820" stroke={ink} opacity=".15" strokeWidth="18"/></Binder>
        </g>
        <path d="M180 1120Q380 1260 660 970" fill="none" stroke={teal} strokeWidth="5" strokeDasharray="12 14" opacity={.5*beat(.3,1)}/>
        <Slip x={820-280*beat(.1,1.4)} y={955-135*beat(.1,1.4)} scale={.82+.32*beat(.1,1.4)} angle={-8*(1-beat(.1,1.4))}/>
        <g opacity={beat(1.8,2.3)}><text x="160" y="540" fontSize="34" fontWeight="800" fill={teal}>Tied to company value</text><path d="M180 580H820" stroke={teal} strokeWidth="4"/></g>
      </>}

      {n === 2 && <>
        <g opacity={beat(.2,.7)*(1-beat(4.1,5.3))}>
        <text x="100" y="500" fontSize="32" fontWeight="800">COMPANY VALUE</text>
        <text x="590" y="500" fontSize="32" fontWeight="800">NOTE FAIR VALUE</text>
        <path d="M180 970V580M720 970V580" stroke={ink} strokeWidth="4" opacity=".25"/>
        <path d={`M180 970V${900-260*beat(.2,1.8)}`} stroke={teal} strokeWidth="32"/>
        <path d={`M720 970V${900-260*beat(.9,2.5)}`} stroke={orange} strokeWidth="32"/>
        <circle cx="180" cy={900-260*beat(.2,1.8)} r="24" fill={teal}/>
        <circle cx="720" cy={900-260*beat(.9,2.5)} r="24" fill={orange}/>
        <path d="M275 740C400 590 490 590 625 650" fill="none" stroke={ink} strokeWidth="5" strokeDasharray="10 12" opacity={beat(.8,1.3)}/>
        <text x="100" y="1100" fontSize="28" fill={teal}>Direction only · no valuation scale</text>
        </g>
        <Slip x={540-100*beat(4.1,5.5)} y={820+380*beat(0,.8)-660*beat(4.1,5.5)}
          scale={1.14-.24*beat(0,.8)-.1*beat(4.1,5.5)} charged={s>=2.8}/>
      </>}

      {n === 4 && <>
        <g transform={`translate(${100*(1-beat(0,.6))} 0)`}>
          <path d="M110 570L625 510L780 620V1220L265 1280L110 1170Z" fill="#B9C6BF" stroke={ink} strokeWidth="5"/>
          <path d="M265 680L780 620V1220L265 1280Z" fill="#293E48" stroke={ink} strokeWidth="5"/>
          {[0,1,2,3,4,5].map(i=><g key={i} transform={`translate(290 ${720+i*80})`}>
            <path d="M0 0L455 -50V-5L0 45Z" fill="#607A7C" stroke={ink} strokeWidth="2"/>
            <path d="M25 13L325 -20" stroke="#172C36" strokeWidth="10"/>
            <circle cx="400" cy="-12" r="7" fill={i%2 ? '#B8DDCB' : '#D79561'}/>
          </g>)}
        </g>
        {[0,1,2].map(i=><path key={i} d={`M${300+i*145} 570q-35 -50 0 -100t0 -100`} fill="none" stroke={orange} strokeWidth="7" opacity={.18*beat(.5,1.2)} transform={`translate(0 ${-14*Math.sin(s*2+i)})`}/>)}
        <g opacity={beat(.9,1.5)} transform={`translate(0 ${(1-beat(.9,1.5))*30})`}>
          <rect x="95" y="1000" width="575" height="225" fill="#FFFEF9" stroke={orange} strokeWidth="4"/>
          <text x="130" y="1055" fontSize="27" fontWeight="800">COMPUTE + INFRASTRUCTURE</text>
          <text x="130" y="1155" fontSize="94" fontWeight="900" fill={orange}>$18.81B</text>
          <text x="130" y="1195" fontSize="24">Expense · same nine-month period</text>
        </g>
      </>}

      {n === 5 && <Binder angle={2*(1-beat(0,.7))}>
        <g clipPath="url(#film-page)">
          <g transform={`translate(0 ${-280*beat(1.5,2.8)})`}>
            <text x="250" y="595" fontSize="32" fontWeight="800">COMPANY VALUE ↑</text>
            <path d="M540 635V730M520 705L540 730L560 705" stroke={teal} strokeWidth="6" fill="none"/>
            <text x="250" y="805" fontSize="32" fontWeight="800">REPORTED EARNINGS ↓</text>
            <path d="M250 865H850" stroke={ink} opacity=".2" strokeWidth="3"/>
            <g opacity={beat(2,2.8)}>
              <text x="250" y="1065" fontSize="59" fontWeight="900" fill={teal}>LASTING</text>
              <text x="250" y="1140" fontSize="59" fontWeight="900" fill={teal}>PROFIT?</text>
              <path d="M250 1185H760" stroke={orange} strokeWidth="8"/>
              <text x="250" y="1260" fontSize="28">The question that still matters.</text>
            </g>
          </g>
        </g>
      </Binder>}
    </svg>

    {n === 3 ? <M1PressLedgerScene localSeconds={Math.min(9.99,p*10)} integrated/> :
      <div style={{position:'absolute',left:730,top:1080,width:250}}>
        <OurbitesHost width={250} height={250*520/360} pose={n===0?'react':n===5?'think':'explain'}
          gazeX={-5} gazeY={-5} poseFrom="neutral" poseBlend={beat(0,.45)}/>
      </div>}

    <div style={{position:'absolute',left:72,top:72,fontSize:28,fontWeight:800,letterSpacing:3}}>OURBITES / ANTHROPIC</div>
    <div style={{position:'absolute',left:72,top:160,width:936,fontSize:49,fontWeight:900,lineHeight:1.12}}>{titles[n]}</div>
    <div style={{position:'absolute',left:72,top:310,fontSize:25,color:teal}}>Nine months ended September 30, 2026</div>
    <div style={{position:'absolute',left:72,top:1510,width:936,fontSize:35,fontWeight:700,lineHeight:1.25}}>
      {n===0 ? 'Reported loss raises a cash question.' : n===1 ? 'Follow the financing obligation.' :
        n===2 ? 'Revaluation creates an accounting charge.' : n===3 ? 'This charge creates no equivalent cash payment.' :
          n===4 ? 'An accounting explanation does not erase operating costs.' : 'Valuation and sustainable profit are different questions.'}
    </div>
    <div style={{position:'absolute',left:72,top:1738,width:936,fontSize:25,lineHeight:1.45}}>
      SEC S-1/A · Nov 10, 2026 · p. 27 + MD&amp;A<br/>
      {n===2 || n===3 ? 'Original illustration · accounting mechanism' : 'Original illustration · sourced figures'}<br/>
      Working cut · audio/caption timing provisional
    </div>
    {audioSrc && <Audio src={staticFile(audioSrc)}/>}
  </AbsoluteFill>;
};
