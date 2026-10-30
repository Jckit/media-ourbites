import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {StageActor} from '../CharacterStage';
import {scenePalette} from './scene-kit';

/**
 * FW-07B creative style test: one evolving illustrated world with folded,
 * independently moving paper props and an active, unchanged hybrid host.
 * Synthetic and silent. It is NOT a production episode or approved master.
 *
 * All coordinates are in the existing 1080x1920 scene space; the audience
 * caption/source strip below y=1510 never inherits scene/camera transforms.
 * Trial timings are local seconds, not guessed narration cue boundaries.
 */
export const HYBRID_EDITORIAL_FRAMES = 300;

const c = {
  ...scenePalette,
  ivory: '#FFFCF4',
  sand: '#DACBB4',
  soft: '#EBE2D4',
  gray: '#6C7C79',
  sage: '#A8C4BA',
  gold: '#EBC792',
};
type P = {x: number; y: number};
const ease = Easing.inOut(Easing.cubic);
const out = Easing.out(Easing.cubic);
const curve = (t: number, start: number, end: number, mode = ease) =>
  interpolate(t, [start, end], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: mode,
  });
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const point = (a: P, b: P, p: number) => ({x: mix(a.x, b.x, p), y: mix(a.y, b.y, p)});

const Paper: React.FC<{
  x: number; y: number; w: number; h: number; fill?: string; stroke?: string;
  rotation?: number; shadow?: number; children?: React.ReactNode;
}> = ({x, y, w, h, rotation = 0, fill = c.ivory, stroke = c.ink, shadow = 12, children}) => (
  <g transform={'translate(' + x + ' ' + y + ') rotate(' + rotation + ')'}>
    <path d={'M10 0 H' + (w-29) + ' L' + w + ' 29 V' + h + ' H0 V10Z'}
      transform={'translate(' + shadow + ' ' + (shadow + 4) + ')'} fill={c.ink} opacity={0.14}/>
    <path d={'M10 0 H' + (w-29) + ' L' + w + ' 29 V' + h + ' H0 V10Z'}
      fill={fill} stroke={stroke} strokeWidth={3} strokeLinejoin="round"/>
    <path d={'M' + (w-29) + ' 0 V29 H' + w} fill={c.soft} stroke={stroke} strokeWidth={2}/>
    {children}
  </g>
);

const Tape: React.FC<{x: number; y: number; angle?: number; w?: number}> =
({x,y,angle=0,w=95}) => <g transform={'translate('+x+' '+y+') rotate('+angle+')'}>
  <rect x={0} y={0} width={w} height={27} rx={2} fill={c.gold} opacity={0.72}/>
  <path d={'M5 7 H'+(w-5)+' M5 18 H'+(w-5)} stroke="#F6E8C8" strokeWidth={2} opacity={0.6}/>
</g>;

const Cutout: React.FC<{
  x:number;y:number;w:number;h:number;angle?:number;kind:'sales'|'costs';
  value:number;raise:number;
}> = ({x,y,w,h,angle=0,kind,value,raise}) => {
  const accent = kind==='sales' ? c.teal : c.orange;
  return <g transform={'translate('+x+' '+y+') rotate('+angle+')'}>
    <rect x={13+raise*5} y={19+raise*12} width={w} height={h} rx={9}
      fill={c.ink} opacity={0.15+raise*0.05}/>
    <rect width={w} height={h} rx={9} fill={c.ivory} stroke={c.ink} strokeWidth={4}/>
    <path d={'M0 0 H'+w+' V25 H0Z'} fill={accent}/>
    <text x={29} y={71} fontFamily="Arial, sans-serif" fontWeight={850}
      fontSize={37} fill={c.gray} letterSpacing={2}>{kind==='sales'?'SALES':'COSTS'}</text>
    <text x={30} y={h-29} fontFamily="Arial, sans-serif" fontWeight={900}
      fontSize={92} letterSpacing={-4} fill={c.ink}>{kind==='sales'?'+':'−'}{value}</text>
    <circle cx={w-31} cy={65} r={11} fill={accent}/>
  </g>;
};

/** Original shop exhibit, authored as paper art rather than a source photograph.
 * The board belongs to the room; only its exhibits move into the reading plane. */
const ShopBoard: React.FC<{time:number; textureId:string}> = ({time,textureId}) => {
  const arrive=curve(time,0,0.7,out);
  const recess=curve(time,1.5,2.5);
  return <g>
    <rect x={32} y={182} width={1016} height={1114} rx={12} fill="#523F32"/>
    <rect x={45} y={195} width={990} height={1088} rx={7} fill="#967350"/>
    <rect x={45} y={195} width={990} height={1088} fill={'url(#'+textureId+')'} opacity={0.8}/>
    <path d="M52 204 H1028 M52 204 V1275" fill="none" stroke="#C3A77E" strokeWidth={5}/>
    <g opacity={1-recess*0.65} transform={'translate(100 '+mix(550,515,arrive)+') rotate(-7)'}>
      <path d="M8 15 H280 V287 H8Z" fill={c.ink} opacity={0.22}/>
      <path d="M0 0 H272 V270 H0Z" fill={c.ivory}/>
      <rect x={15} y={17} width={242} height={190} fill="#D5E3D8"/>
      <path d="M46 94 H230 V190 H46Z" fill="#EACF9D" stroke={c.ink} strokeWidth={3}/>
      <path d="M34 89 L59 55 H218 L242 89Z" fill={c.teal}/>
      <path d="M34 89 H242 V108 H34Z" fill={c.ivory}/>
      {[0,1,2,3,4].map(i=><path key={i} d={'M'+(34+i*42)+' 89 h21 v19 h-21Z'} fill={c.orange}/>)}
      <rect x={65} y={124} width={81} height={48} fill={c.teal}/>
      <rect x={167} y={120} width={42} height={70} fill={c.ink}/>
      <text x={136} y={246} textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize={31} fill={c.ink}>A little shop</text>
      <circle cx={136} cy={8} r={10} fill={c.orange} stroke={c.ink} strokeWidth={2}/>
    </g>
    <g opacity={0.45*(1-recess)} transform="translate(825 465) rotate(9)">
      <path d="M5 8 H155 V222 H5Z" fill={c.ink} opacity={0.3}/>
      <path d="M0 0 H150 V212 H0Z" fill={c.ivory}/>
      <path d="M23 37 H126 M23 72 H115 M23 107 H126 M23 142 H105" stroke={c.gray} strokeWidth={8}/>
      <path d="M23 178 H126" stroke={c.orange} strokeWidth={10}/>
      <Tape x={40} y={-10} angle={-6} w={72}/>
    </g>
    <path d="M0 1408 H1080" stroke="#A58A68" strokeWidth={9}/>
  </g>;
};

const Notebook: React.FC = () => <g>
  {/* Incoming scene: a warm, illustrated counter with a real-size notepad,
      not a full-screen rectangle pretending to be a slide. */}
  <rect width={1080} height={1920} fill="#D8E7E2"/>
  <rect x={0} y={0} width={1080} height={680} fill="#D7E6DF"/>
  <path d="M0 687 H1080 V1920 H0Z" fill="#D2B89A"/>
  <path d="M0 692 H1080" stroke="#B89B78" strokeWidth={13}/>
  <path d="M0 905 H1080 M0 1180 H1080 M0 1430 H1080" stroke="#B69A79" strokeWidth={3} opacity={0.35}/>
  <g transform="translate(264 473) rotate(-5 370 365)">
    <rect x={19} y={27} width={713} height={742} rx={14} fill={c.ink} opacity={0.16}/>
    <rect width={713} height={742} rx={14} fill="#FFFCF3" stroke={c.ink} strokeWidth={5}/>
    <rect x={27} width={22} height={742} fill={c.orange} opacity={0.42}/>
    <path d="M90 93 H650" stroke={c.teal} strokeWidth={10} strokeLinecap="round" opacity={0.62}/>
    {Array.from({length:8},(_,i)=><path key={i} d={'M83 '+(170+i*68)+' H650'}
      stroke="#CBD6CD" strokeWidth={3}/>)}
    {Array.from({length:7},(_,i)=><circle key={i} cx={29} cy={116+i*94}
      r={8} fill="#B8AF9F" stroke={c.ink} strokeWidth={1}/>)}
    <text x={98} y={143} fontSize={37} fontWeight={850} fill={c.gray} letterSpacing={2}>
      WHAT THE SHOP KEPT
    </text>
  </g>
  {/* Scattered shop objects have positions, overlaps and shadows. */}
  <g transform="translate(825 1105) rotate(14)">
    <rect x={8} y={14} width={166} height={238} rx={16} fill={c.ink} opacity={0.16}/>
    <rect width={166} height={238} rx={16} fill="#507D76" stroke={c.ink} strokeWidth={5}/>
    <rect x={20} y={22} width={126} height={62} rx={7} fill="#E1F0E7"/>
    <text x={83} y={66} textAnchor="middle" fontSize={39} fontWeight={900} fill={c.ink}>35</text>
    {[0,1,2].map(row=>[0,1,2].map(col=><rect key={row*3+col}
      x={24+col*44} y={107+row*42} width={31} height={28} rx={6} fill="#D8E6D8"/>))}
  </g>
  <g transform="translate(815 680) rotate(7)">
    <rect x={14} y={20} width={156} height={220} fill={c.ink} opacity={0.12}/>
    <rect width={156} height={220} fill={c.ivory} stroke="#C6BCA8" strokeWidth={3}/>
    <path d="M18 50 H132 M18 83 H125 M18 116 H137 M18 149 H97" stroke="#AEBAB3" strokeWidth={7}/>
    <path d="M18 184 H138" stroke={c.orange} strokeWidth={8}/>
  </g>
  <g transform="translate(190 1308) rotate(-19)">
    <rect width={270} height={28} rx={14} fill={c.ink} opacity={0.13} transform="translate(9 13)"/>
    <rect width={268} height={27} rx={13} fill={c.orange} stroke="#C66C43" strokeWidth={3}/>
    <path d="M225 2 L273 14 L225 25Z" fill="#F0DEB6"/>
    <path d="M260 11 L276 14 L260 17Z" fill={c.ink}/>
  </g>
  <Tape x={701} y={478} angle={7} w={111}/>
  <Tape x={358} y={1130} angle={-13} w={99}/>
</g>

export const HybridEditorialPrototype:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const t=frame/fps;
  const intro=curve(t,0.2,1.0,out);
  const lift=curve(t,1.15,2.15);
  const open=curve(t,1.8,2.95);
  const sales=curve(t,3.0,4.15);
  const costs=curve(t,3.55,4.65);
  const compare=curve(t,4.55,5.6);
  const merge=curve(t,5.55,6.55);
  const note=curve(t,6.3,7.45);
  const settle=curve(t,7.45,8.45);
  const payoff=curve(t,8.0,8.65,out);
  const actorReturn=curve(t,7.1,8.2);
  const actorShift=curve(t,2.9,4.4);
  // Short, frame-driven interpolation between the four EXISTING host poses.
  // This repairs single-frame limb teleports; it does not add a new gesture.
  const poseBeats=[
    {at:1.15,from:'point',to:'react'},
    {at:2.25,from:'react',to:'point'},
    {at:5.6,from:'point',to:'think'},
    {at:7.45,from:'think',to:'point'},
  ] as const;
  const poseChange=poseBeats.find(b=>t>=b.at-0.12 && t<=b.at+0.12);
  const hostPose=poseChange?.to ?? (t<1.15?'point':t<2.25?'react':t<5.6?'point':t<7.45?'think':'point');
  const hostPoseBlend=poseChange ? curve(t,poseChange.at-0.12,poseChange.at+0.12) : undefined;
  const hostGazeX=t<3 ? mix(9,-7,curve(t,2.85,3.15))
    : mix(-7,9,curve(t,6.85,7.15));
  const actorX=105-190*actorShift+200*actorReturn;
  const actorY=780+36*actorShift-36*actorReturn;
  const hand={x:actorX+337*485/360,y:actorY+163*485/360};
  // The folio is attached to the actual shared host pointing-hand anchor
  // until the authored release, rather than an unrelated visual position.
  const folioGrip=point(hand,{x:635,y:1190},lift);
  const folioScale=mix(0.83,1.00,lift);
  const folioAngle=mix(-11,-2,lift);
  // Release the old labels before the result arrives: overlapping translucent
  // amounts read as one corrupted number during the paper handoff.
  const focusGone=curve(t,5.90,6.05);
  // Release the folio's printed information before the detached slips become
  // readable; keep the physical pages and their shared hand anchor intact.
  const sourceTextRelease=curve(t,3.2,3.55);
  const salesFrom={x:folioGrip.x+55,y:folioGrip.y-390};
  const costFrom={x:folioGrip.x+40,y:folioGrip.y-214};
  const salesTo={x:170,y:575};
  const costTo={x:620,y:790};
  // Detached slips converge in shared world coordinates and visually become
  // a single paper result instead of disappearing before a new slide appears.
  const salesPos=point(point(salesFrom,salesTo,sales),{x:595,y:795},merge);
  const costsPos=point(point(costFrom,costTo,costs),{x:595,y:832},merge);
  const receiptPos=point({x:595,y:795},{x:548,y:896},settle);
  const clipId=React.useId().replace(/:/g,'_');
  const wipeEdge=-90+1270*note;
  const tear='M-40 -40 H'+wipeEdge+
    ' L'+(wipeEdge-18)+' 200 L'+(wipeEdge+9)+' 395 L'+(wipeEdge-15)+' 587'+
    ' L'+(wipeEdge+16)+' 775 L'+(wipeEdge-10)+' 980 L'+(wipeEdge+12)+' 1170'+
    ' L'+(wipeEdge-17)+' 1380 L'+(wipeEdge+10)+' 1590 L'+(wipeEdge-8)+' 1930 H-40Z';

  return <AbsoluteFill style={{background:c.paper,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <svg viewBox="0 0 1080 1920" width={1080} height={1920}
      style={{position:'absolute',inset:0}} role="img"
      aria-label="Synthetic shop mechanism: hybrid host handles paper, separates sales and costs, reveals profit">
      <defs>
        <clipPath id={clipId}><path d={tear}/></clipPath>
        <pattern id={clipId+'_board'} width={47} height={53} patternUnits="userSpaceOnUse">
          <path d="M3 8 l8 -2 M28 31 l10 3 M10 47 l4 -3" stroke="#D7B989" strokeWidth={2} opacity={0.4}/>
          <circle cx={35} cy={12} r={2} fill="#503A26" opacity={0.25}/>
          <circle cx={17} cy={27} r={1.5} fill="#F5D7AA" opacity={0.5}/>
        </pattern>
        <pattern id={clipId+'_fibres'} width={100} height={100} patternUnits="userSpaceOnUse">
          <path d="M5 17 L30 14 M71 62 L83 61 M41 90 L49 88" stroke="#C2B69E" strokeWidth={2} opacity={0.25}/>
        </pattern>
      </defs>
      <rect width={1080} height={1920} fill={c.paper}/>
      <path d="M0 1410 H1080 V1920 H0Z" fill={c.sand}/>
      <ShopBoard time={t} textureId={clipId+'_board'}/>
      <g>
        <path d="M605 1240 V1410 M985 1202 V1410" stroke="#A89373" strokeWidth={25}/>
        <path d="M535 1165 L997 1120 L1040 1201 L572 1247Z" fill="#E8D6B8" stroke={c.ink} strokeWidth={5}/>
        <path d="M572 1247 L1040 1201 V1220 L572 1266Z" fill="#B8A489"/>
      </g>
      <rect width={1080} height={1920} fill={'url(#'+clipId+'_fibres)'} opacity={0.30}/>
      {/* The physical folio relinquishes the information as its two cutouts
          detach, removing unreadable ghost text behind the active slips. */}
      <g opacity={1-curve(t,3.1,4.45)}>
        {/* The only held folio originates exactly at the existing host's pointing hand. */}
        <g transform={'translate('+folioGrip.x+' '+folioGrip.y+') rotate('+folioAngle+') scale('+folioScale+')'}>
          <rect x={11} y={-516} width={450} height={516} fill={c.ink} opacity={0.19} transform="translate(15 19)"/>
          <rect y={-516} width={450} height={516} rx={9} fill={c.ivory} stroke={c.ink} strokeWidth={5}/>
          <path d="M0 -483 H450 V-456 H0Z" fill={c.gold}/>
          <path d="M0 -253 H450" stroke={c.ink} strokeWidth={2} opacity={0.15}/>
          <g opacity={curve(t,2.30,2.68)*(1-sourceTextRelease)}>
          <text x={45} y={-418} fontSize={33} fontWeight={900} letterSpacing={3} fill={c.gray}>SHOP NOTES</text>
          <text x={42} y={-333} fontSize={60} fontWeight={900} fill={c.ink}>HOW MUCH</text>
          <text x={42} y={-269} fontSize={64} fontWeight={900} fill={c.ink}>REMAINS?</text>
          <path d="M42 -218 H405 M42 -181 H338 M42 -144 H383" stroke="#B9C5BE" strokeWidth={9} strokeLinecap="round"/>
          <circle cx={335} cy={-83} r={42} fill={c.orange} opacity={0.92}/>
          <text x={335} y={-69} textAnchor="middle" fontSize={41} fontWeight={900} fill={c.ivory}>?</text>
          </g>
          <g opacity={open}>
            <path d="M0 -516 H-450 V0 H0Z" fill={c.ink} opacity={0.18} transform="translate(16 18)"/>
            <path d="M0 -516 H-450 V0 H0Z" fill="#FFF8EC" stroke={c.ink} strokeWidth={4}/>
            <path d="M0 -516 V0" stroke={c.ink} strokeWidth={9}/>
            <g opacity={1-sourceTextRelease}>
            <path d="M-420 -435 H-36 M-420 -405 H-60 M-420 -110 H-40" stroke="#B6C8BE" strokeWidth={7} strokeLinecap="round"/>
            <rect x={-408} y={-348} width={322} height={137} rx={7} fill="#DCF0E8"/>
            <text x={-389} y={-305} fontSize={27} fontWeight={800} fill={c.teal}>SALES RECEIPTS</text>
            <text x={-389} y={-248} fontSize={61} fontWeight={900} fill={c.ink}>+120</text>
            <rect x={-408} y={-189} width={322} height={65} rx={7} fill="#F8DEBD"/>
            <text x={-388} y={-146} fontSize={31} fontWeight={900} fill={c.ink}>COSTS · 85</text>
            </g>
            <Tape x={-314} y={-521} angle={3} w={104}/>
          </g>
          {/* Flap physically hinges open along the folio spine before its contents detach. */}
          <g transform={'scale('+(1-2*open)+',1)'}>
            <rect y={-516} width={450} height={516} rx={8} fill="#E1D3BC"
              stroke={c.ink} strokeWidth={4} opacity={1-open*0.89}/>
          </g>
          {/* The closed folio starts as a purposeful physical cover, not a blank
              slab; cover printing departs with the hinge as the page opens. */}
          <g opacity={1-curve(t,1.8,2.28)}>
            <path d="M30 -483 H418" stroke={c.ink} strokeWidth={8} opacity={0.3}/>
            <rect x={41} y={-432} width={347} height={72} rx={5} fill={c.teal}/>
            <text x={58} y={-380} fontSize={43} fontWeight={900} fill={c.ivory}
              letterSpacing={2}>SHOP REPORT</text>
            <text x={45} y={-292} fontSize={64} fontWeight={900} fill={c.ink}>OPEN THE</text>
            <text x={45} y={-220} fontSize={64} fontWeight={900} fill={c.ink}>NUMBERS</text>
            <rect x={43} y={-172} width={345} height={9} rx={4} fill={c.orange}/>
            <path d="M43 -125 H346 M43 -93 H295" stroke="#A39B8F" strokeWidth={8}/>
          </g>
        </g>
      </g>
      {/* Two sections separate *from the folio* before their arithmetic relationship is shown. */}
      <g opacity={sales*(1-focusGone)}>
        <Cutout x={salesPos.x} y={salesPos.y} w={375} h={192} angle={mix(-2,-8,sales)}
          kind="sales" value={120} raise={sales}/>
        <Tape x={salesPos.x+113} y={salesPos.y-7} angle={-4} w={100}/>
      </g>
      <g opacity={costs*(1-focusGone)}>
        <Cutout x={costsPos.x} y={costsPos.y} w={370} h={192} angle={mix(3,7,costs)}
          kind="costs" value={85} raise={costs}/>
      </g>
      <g opacity={compare*(1-focusGone)}>
        <path d="M480 840 Q530 905 585 866" stroke={c.ink} strokeWidth={12} fill="none"
          strokeLinecap="round" strokeDasharray="19 16"/>
        <path d="M569 850 L585 867 L558 879" fill="none" stroke={c.ink} strokeWidth={11} strokeLinecap="round"/>
        {/* One hand-drawn connective mark, not a third labeled slide panel. */}
        <path d="M435 1082 Q534 1108 645 1070" fill="none" stroke={c.orange}
          strokeWidth={13} strokeLinecap="round" strokeDasharray="260"
          strokeDashoffset={260*(1-compare)}/>
      </g>
      {/* The paper surface replaces the room by a single animated, jagged edge. */}
      <g clipPath={'url(#'+clipId+')'}><Notebook/></g>
      {/* One emerging result card follows the same focal relationship into the new surface. */}
      <g opacity={curve(t,6.05,6.35)}>
        <Paper x={receiptPos.x} y={receiptPos.y} w={432} h={288} fill="#FFF7E8" rotation={mix(8,-4,settle)} shadow={16}>
          <rect x={21} y={30} width={390} height={43} rx={3} fill={c.orange}/>
          <text x={37} y={61} fontSize={28} fontWeight={900} letterSpacing={2} fill={c.ink}>AFTER THE COSTS</text>
          <text x={37} y={196} fontSize={122} fontWeight={900} letterSpacing={-7} fill={c.ink}>35</text>
          <text x={233} y={191} fontSize={37} fontWeight={850} fill={c.teal}>LEFT</text>
          <path d="M37 227 H391" stroke={c.ink} strokeWidth={4} opacity={0.25}/>
        </Paper>
      </g>
      <g opacity={payoff}>
        <path d="M660 1215 Q885 1140 972 1070" stroke={c.orange} strokeWidth={16}
          fill="none" strokeLinecap="round" strokeDasharray="360"
          strokeDashoffset={360*(1-payoff)}/>
        <path d="M935 1074 L973 1068 L959 1114" fill="none" stroke={c.orange} strokeWidth={13}
          strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Selected words enter once, then hold; typography carries the question. */}
      <g opacity={1-curve(t,2.7,3.1)}>
        <g transform={'translate(86 '+mix(300,285,curve(t,0,0.35,out))+')'}>
          <text fontSize={83} fontWeight={900} letterSpacing={-3} fill={c.ivory}>BIG SALES.</text>
        </g>
        <g opacity={curve(t,0.3,0.55)} transform={'translate(88 '+mix(390,379,curve(t,0.3,0.65,out))+')'}>
          <text fontFamily="Georgia, serif" fontStyle="italic" fontSize={70} fill="#FFE2A8">But what stays?</text>
          <path d="M2 20 Q240 35 470 15" fill="none" stroke={c.orange} strokeWidth={9}
            strokeLinecap="round" strokeDasharray="480" strokeDashoffset={480*(1-curve(t,0.65,1.0))}/>
        </g>
      </g>
      <g opacity={curve(t,3.35,3.65)*(1-curve(t,6.3,6.6))}>
        <text x={90} y={288} fontFamily="Georgia, serif" fontStyle="italic" fontSize={65} fill={c.ivory}>Follow the</text>
        <g transform={'translate(86 '+mix(418,405,curve(t,3.55,3.9,out))+') rotate(-2)'}>
          <path d="M-10 -92 H495 L485 22 H-15Z" fill={c.orange}/>
          <text fontSize={105} fontWeight={900} letterSpacing={-4} fill={c.ink}>MONEY.</text>
        </g>
      </g>
      <g opacity={curve(t,7.25,7.65)}>
        <text x={90} y={253} fontFamily="Georgia, serif" fontStyle="italic" fontSize={68} fill={c.ink}>Sales are not</text>
        <g transform={'translate(85 '+mix(399,383,curve(t,7.55,7.95,out))+') rotate(-2)'}>
          <text fontSize={130} fontWeight={900} letterSpacing={-5} fill={c.teal}>PROFIT.</text>
          <path d="M3 24 Q240 38 505 16" fill="none" stroke={c.orange} strokeWidth={13} strokeLinecap="round"
            strokeDasharray="510" strokeDashoffset={510*(1-payoff)}/>
        </g>
      </g>
    </svg>
    {/* Existing hybrid host inside the same illustrated space — no new character art. */}
    <div style={{position:'absolute',left:actorX,top:actorY,width:485,zIndex:2}}>
      <StageActor x={0} y={0} size={485}
        pose={hostPose} poseFrom={poseChange?.from} poseBlend={hostPoseBlend}
        gazeX={hostGazeX} gazeY={-4} lean={t<1.8?mix(-4,0,intro):0}/>
    </div>
    {/* The receipt/annotations have their own safe reading zone; no narration captions exist. */}
    <div style={{position:'absolute',left:72,top:86,display:'flex',gap:15,alignItems:'center',
      fontSize:30,fontWeight:900,letterSpacing:3,color:c.ink}}>
      <div style={{width:16,height:16,background:c.orange,transform:'rotate(20deg)'}}/>
      OURBITES <span style={{fontSize:23,fontWeight:600,letterSpacing:1,color:c.gray}}>HYBRID EDITORIAL · STYLE TEST</span>
    </div>
    <div style={{position:'absolute',left:78,right:78,top:1568,height:4,background:c.ink,opacity:0.35}}/>
    <div style={{position:'absolute',left:78,right:78,top:1590,fontSize:35,lineHeight:1.2,
      textAlign:'center',fontWeight:800,color:c.ink}}>
      {t<3?'A shop takes in 120.':t<7?'Costs take their share.':'120 sales − 85 costs = 35 left.'}
    </div>
    <div style={{position:'absolute',left:78,right:78,top:1765,fontSize:25,letterSpacing:2,
      textAlign:'center',fontWeight:800,color:c.gray}}>
      ORIGINAL SYNTHETIC ILLUSTRATION · SILENT · NOT AN EPISODE
    </div>
  </AbsoluteFill>;
};
