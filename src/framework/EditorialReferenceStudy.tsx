import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {OurbitesHost} from '../OurbitesHost';
import {seededRange} from './motion/seeded-variation';

/**
 * NEW direction study, not a polished episode or style approval.
 * 80% reference-led editorial motion grammar / 20% recognisable Ourbites identity.
 * Original shapes/text/amounts only: illustrative shop sales 120 - costs 85 = 35.
 * Test the actual 30fps video, not a still-frame slide comparison.
 */
export const EDITORIAL_REFERENCE_FRAMES=300;
const INK='#171D25',RED='#E44D38',IVORY='#FBFAF6',MUTED='#697279',TEAL='#087E83';
type Point={x:number;y:number};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const cap=(n:number)=>Math.max(0,Math.min(1,n));
const timing={
  quick:Easing.bezier(0.12,0.72,0.18,1),
  travel:Easing.bezier(0.35,0.0,0.23,1),
  reveal:Easing.bezier(0.18,0.64,0.32,1),
  soften:Easing.bezier(0.48,0.05,0.3,1),
  settle:Easing.bezier(0.17,0.83,0.4,1),
};
const p=(t:number,start:number,end:number,easing=timing.travel)=>interpolate(t,[start,end],[0,1],{
  easing,extrapolateLeft:'clamp',extrapolateRight:'clamp',
});
const bezier=(a:number,b:number,c:number,d:number,u:number)=>{
  const r=1-u;return r*r*r*a+3*r*r*u*b+3*r*u*u*c+u*u*u*d;
};
const path=(start:Point,controlA:Point,controlB:Point,end:Point,u:number):Point=>({
  x:bezier(start.x,controlA.x,controlB.x,end.x,u),
  y:bezier(start.y,controlA.y,controlB.y,end.y,u),
});
const opacity=(t:number,start:number,end:number,exitStart:number,exitEnd:number)=>p(t,start,end,timing.quick)*(1-p(t,exitStart,exitEnd,timing.reveal));
const order=(t:number,offset:number,duration:number)=>p(t,offset,offset+duration,timing.quick);

const EditorialTop:React.FC<{progress:number}>=({progress})=><g>
  <text x={78} y={100} fontSize={34} fontWeight={950} letterSpacing={3} fill={INK}>OURBITES</text>
  <text x={993} y={100} textAnchor="end" fontSize={22} fontWeight={750} letterSpacing={3} fill={MUTED}>A 10-SECOND STUDY</text>
  <line x1={76} x2={1004} y1={128} y2={128} stroke={INK} strokeWidth={3} opacity={0.14}/>
  <rect x={76} y={125} width={928*progress} height={5} fill={RED}/>
  <circle cx={76+928*progress} cy={127} r={7} fill={RED}/>
</g>;

export const EditorialReferenceStudy:React.FC=()=>{
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
  const enter=opacity(t,0.06,0.36,2.12,2.52);
  const ledger=opacity(t,2.11,2.44,4.58,5.02);
  const analysis=opacity(t,4.62,4.96,7.08,7.44);
  const payoff=p(t,7.15,7.54,timing.reveal);
  const brandLine=order(t,0.18,0.65);
  const question=order(t,0.75,0.42);
  const ledgerMotion=p(t,2.06,2.76,timing.travel);
  const barEnter=order(t,4.86,0.58),costBar=order(t,5.16,0.64);
  const deduct=order(t,6.18,0.62);
  // Separate spatial and temporal Bézier: a single semantic "120" graphic
  // changes role from hero headline to ledger entry to bar value. No mid-path stop.
  const heroSegment1=p(t,2.08,2.88,timing.travel);
  const heroA=path({x:200,y:912},{x:310,y:726},{x:690,y:715},{x:748,y:823},heroSegment1);
  const heroSegment2=p(t,4.58,5.36,timing.reveal);
  const heroB=path(heroA,{x:770,y:785},{x:803,y:734},{x:822,y:815},heroSegment2);
  const heroPos=t<4.58?heroA:heroB;
  const heroScale=t<2.08?2.04:t<2.88?mix(2.04,0.74,heroSegment1):mix(0.74,0.79,heroSegment2);
  const heroOpacity=p(t,0.28,0.60,timing.quick)*(1-p(t,6.62,6.90,timing.quick));
  const costTrace=order(t,5.30,0.58);
  const resultEntrance=p(t,6.37,6.78,timing.reveal);
  const resultTravel=p(t,7.12,8.12,timing.travel);
  const resultPos=path({x:764,y:1118},{x:652,y:913},{x:265,y:880},{x:201,y:938},resultTravel);
  const resultScale=mix(0.73,2.28,resultTravel);
  const resultOpacity=resultEntrance;
  const resultUnderline=p(t,8.15,8.68,timing.reveal);
  const hostShow=opacity(t,8.20,8.55,9.65,9.96);
  const hostLean=mix(5,-4,p(t,8.34,8.76,timing.soften));
  // Decorative scatter has stable IDs and a stable seed. All important
  // typographic, spatial and financial positions are fully authored.
  const specks=Array.from({length:21},(_,i)=>({
    x:seededRange('ourbites-editorial-study','ink-speck-'+i,130,970,'x'),
    y:seededRange('ourbites-editorial-study','ink-speck-'+i,650,1380,'y'),
    r:seededRange('ourbites-editorial-study','ink-speck-'+i,1.1,3.3,'r'),
  }));
  return <AbsoluteFill style={{background:IVORY,color:INK,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{position:'absolute',inset:0}}>
      <defs>
        <clipPath id="editorial-headline-window"><rect x={65} y={220} width={950} height={370}/></clipPath>
        <clipPath id="editorial-graph-window"><rect x={90} y={670} width={895} height={700}/></clipPath>
        <clipPath id="editorial-note-window"><rect x={85} y={670} width={910} height={655} rx={20}/></clipPath>
      </defs>
      <rect width={1080} height={1920} fill={IVORY}/>
      <EditorialTop progress={cap(t/10)}/>
      {/* BEAT 1 / clean editorial hook. Typography is the composition. */}
      <g opacity={enter} clipPath="url(#editorial-headline-window)">
        <text x={94} y={310} fontSize={53} fontWeight={750} fill={MUTED}
          transform={'translate(0 '+(1-brandLine)*36+')'}>A LITTLE SHOP MADE</text>
        <text x={92} y={501} fontSize={116} fontWeight={950} letterSpacing={-6} fill={INK}
          transform={'translate(0 '+(1-brandLine)*72+')'}>BIG SALES.</text>
      </g>
      <g opacity={enter*question} transform={'translate(96 '+(659+(1-question)*34)+')'}>
        <text fontSize={75} fontFamily="Georgia, serif" fontStyle="italic" fill={RED}>But what stayed?</text>
        <path d="M8 25 C205 45 385 3 624 20" fill="none" stroke={RED} strokeWidth={10}
          strokeLinecap="round" strokeDasharray={680} strokeDashoffset={680*(1-p(t,1.05,1.80,timing.reveal))}/>
      </g>
      <g opacity={enter*order(t,1.05,0.34)}>
        <text x={92} y={1160} fontSize={30} fill={MUTED} fontWeight={700} letterSpacing={2}>ILLUSTRATIVE SALES</text>
        <path d="M95 1214 H985" stroke={INK} strokeWidth={5} opacity={0.13}/>
        <path d="M96 1214 H"+(96+885*order(t,1.25,0.54)) stroke={RED} strokeWidth={10} strokeLinecap="round"/>
      </g>
      {/* BEAT 2 / an original mini UI/evidence element arrives with distinct
          spring-free lead/lag; no entire slide animates from another slide. */}
      <g opacity={ledger}>
        <text x={95} y={341} fontSize={78} fontWeight={930} letterSpacing={-3}>THE RECEIPT</text>
        <text x={98} y={421} fontSize={66} fontFamily="Georgia,serif" fontStyle="italic" fill={RED}>tells another story.</text>
        <path d="M98 456 H833" stroke={INK} strokeWidth={3} opacity={0.12}/>
        <g transform={'translate('+(90+(1-ledgerMotion)*-150)+' '+(605+(1-ledgerMotion)*110)+') rotate('+(1-ledgerMotion)*-7+' 458 370)'}>
          <rect x={13} y={19} width={870} height={646} rx={20} fill={INK} opacity={0.08}/>
          <rect width={870} height={646} rx={20} fill="white" stroke={INK} strokeWidth={5}/>
          <path d="M0 65 H870" stroke={INK} strokeWidth={4}/>
          <circle cx={35} cy={34} r={10} fill={RED}/>
          <circle cx={68} cy={34} r={10} fill="#F1B860"/>
          <circle cx={101} cy={34} r={10} fill={TEAL}/>
          <text x={822} y={45} textAnchor="end" fontSize={25} fontWeight={850} fill={MUTED}>SHOP / BOOKKEEPING</text>
          <text x={42} y={157} fontSize={33} fontWeight={900} letterSpacing={3} fill={MUTED}>SALES</text>
          <path d="M35 192 H835" stroke={INK} opacity={0.12} strokeWidth={2}/>
          <text x={42} y={303} fontSize={33} fontWeight={900} letterSpacing={3} fill={MUTED}>COSTS</text>
          <rect x={29} y={332} width={815*costTrace} height={128} rx={10} fill="#FFF0ED"/>
          <text x={690} y={423} fontSize={93} fontWeight={950} fill={RED}
            opacity={order(t,3.22,0.28)}>-85</text>
          <path d="M46 489 H819" stroke={INK} opacity={0.13} strokeWidth={3}/>
          <text x={42} y={567} fontSize={27} fontWeight={760} fill={MUTED}>Source illustration · not an actual invoice</text>
        </g>
        <g transform={'translate('+(685+95*order(t,3.38,0.48))+' '+(1020-68*order(t,3.38,0.48))+')'}>
          <path d="M0 0 Q-80 -54 -166 -7" stroke={RED} strokeWidth={12} strokeLinecap="round"
            strokeDasharray={290} strokeDashoffset={290*(1-order(t,3.50,0.48))} fill="none"/>
          <path d="M-156 -26 L-174 -5 L-148 9" stroke={RED} strokeWidth={10} fill="none"
            opacity={order(t,3.77,0.26)} strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </g>
      {/* Persistent hero graphic. It does NOT stop between semantic scene states
          because its flight is one uninterrupted authored cubic path at each join. */}
      <g opacity={heroOpacity} transform={'translate('+heroPos.x+' '+heroPos.y+') scale('+heroScale+')'}>
        <text y={0} fontSize={175} fontWeight={950} letterSpacing={-10} fill={INK}>120</text>
        <path d="M5 22 H224" stroke={RED} strokeWidth={11} strokeLinecap="round"
          opacity={1-p(t,4.68,5.05)}/>
      </g>
      {/* BEAT 3 / comparison graphic, highly simplified drawings but carefully
          staggered authored motion (bars, evidence marker, annotations). */}
      <g opacity={analysis} clipPath="url(#editorial-graph-window)">
        <g transform={'translate(0 '+(1-barEnter)*58+')'}>
          <text x={90} y={744} fontSize={42} fontWeight={900} letterSpacing={2}>SALES</text>
          <rect x={94} y={835} width={886} height={132} rx={16} stroke={INK} strokeWidth={4} fill="white"/>
          <rect x={106} y={846} width={(858*barEnter)} height={110} rx={8} fill={TEAL}/>
        </g>
        <g transform={'translate(0 '+(1-costBar)*65+')'}>
          <text x={90} y={1079} fontSize={42} fontWeight={900} letterSpacing={2}>COSTS</text>
          <rect x={94} y={1157} width={886} height={132} rx={16} stroke={INK} strokeWidth={4} fill="white"/>
          <rect x={106} y={1168} width={609*costBar} height={110} rx={8} fill={RED}/>
        </g>
        <path d="M725 1095 C820 1050 937 1084 945 1181 C960 1255 860 1307 763 1284"
          fill="none" stroke={RED} strokeWidth={11} strokeLinecap="round"
          strokeDasharray={440} strokeDashoffset={440*(1-p(t,5.82,6.47,timing.quick))}/>
        <text x={749} y={1134} fontSize={52} fontFamily="Georgia,serif" fontStyle="italic"
          fill={RED} opacity={p(t,6.10,6.34,timing.quick)}>subtract.</text>
      </g>
      <g opacity={analysis} transform={'translate(95 '+(360+(1-barEnter)*55)+')'}>
        <text fontSize={85} fontWeight={950} letterSpacing={-4}>BUT REVENUE</text>
        <text y={92} fontSize={85} fontWeight={950} letterSpacing={-4}>ISN'T <tspan fill={RED}>PROFIT.</tspan></text>
      </g>
      {/* This modest numeric result emerges at the calculation and then
          travels to the editorial payoff with a real spatial+temporal path. */}
      <g opacity={resultOpacity} transform={'translate('+resultPos.x+' '+resultPos.y+') scale('+resultScale+')'}>
        <text fontSize={184} fontWeight={950} fill={INK} letterSpacing={-9}>35</text>
        <path d="M0 23 H215" stroke={RED} strokeWidth={13} strokeLinecap="round"
          strokeDasharray={230} strokeDashoffset={230*(1-resultUnderline)}/>
      </g>
      {/* BEAT 4 / payoff: minimal typography, no page/card expansion. */}
      <g opacity={payoff}>
        <text x={91} y={333} fontSize={55} fontWeight={850} fill={MUTED}>WHAT THE BUSINESS</text>
        <text x={91} y={437} fontSize={120} fontWeight={950} letterSpacing={-6} fill={INK}>KEPT.</text>
        <text x={97} y={620} fontSize={79} fontFamily="Georgia,serif" fontStyle="italic" fill={RED}
          transform={'translate(0 '+(1-p(t,7.48,8.07,timing.soften))*28+')'}>Not the same as sales.</text>
        <path d="M95 675 H915" stroke={INK} strokeWidth={4} opacity={0.12}/>
        <path d="M91 1182 Q340 1239 612 1184" stroke={RED} strokeWidth={12}
          strokeLinecap="round" fill="none" strokeDasharray={580}
          strokeDashoffset={580*(1-p(t,8.26,9.15,timing.reveal))}/>
        <g opacity={p(t,8.60,8.90,timing.quick)}>
          <text x={98} y={1305} fontSize={50} fontWeight={850} fill={MUTED}>120 SALES</text>
          <text x={404} y={1305} fontSize={50} fontWeight={850} fill={RED}>− 85 COSTS</text>
          <text x={803} y={1305} fontSize={50} fontWeight={850} fill={INK}>= 35</text>
        </g>
      </g>
      {/* One brief, restrained original-character contribution rather than a
          scene-long room/mascot template. */}
      <g opacity={analysis*0.20}>
        {specks.map((d,i)=><circle key={i} cx={d.x} cy={d.y} r={d.r} fill={INK}/>)}
      </g>
      <line x1={85} x2={995} y1={1494} y2={1494} stroke={INK} strokeWidth={3} opacity={0.15}/>
      <text x={90} y={1552} fontSize={30} fontWeight={850} letterSpacing={2} fill={MUTED}>
        SOURCE-NEUTRAL EXAMPLE · 120 SALES − 85 COSTS = 35 REMAINING
      </text>
      <text x={92} y={1850} fontSize={25} letterSpacing={2} fill={MUTED}>
        ORIGINAL MOTION STUDY · SILENT · ILLUSTRATIVE · NOT AN EPISODE
      </text>
    </svg>
    <div style={{position:'absolute',top:1270,left:745,width:230,height:335,
      opacity:hostShow,pointerEvents:'none',transform:'rotate('+hostLean+'deg)',
      transformOrigin:'50% 95%'}}>
      <OurbitesHost pose="point" width={230} height={332} gazeX={-2} gazeY={-2}/>
    </div>
  </AbsoluteFill>;
};
