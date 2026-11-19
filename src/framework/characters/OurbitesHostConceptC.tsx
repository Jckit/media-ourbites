import React from 'react';
import type {HostPose} from '../../OurbitesHost';
import {conceptCArmPath,conceptCPointRig} from './ConceptCPointRig';

/**
 * ISSUE #64 — CONCEPT C / complete character redesign, UNAPPROVED.
 *
 * An original 2D editorial presenter. This is intentionally a DIFFERENT
 * silhouette from the cream-circle / single-tuft stick host: angled face,
 * side-swept hair mass, jacket, real arms, trousers, shoes and expressive eyes.
 *
 * Built from independently addressable SVG layers; no image bake-in, 3D renderer,
 * copyrighted character, new source claim or production-character replacement.
 * Existing host and candidates A/B stay unchanged. Human approval required.
 */
export type EditorialHostConceptProps = {
  pose?: HostPose;
  width?: number;
  height?: number;
  gazeX?: number;
  gazeY?: number;
  /** 0 = arm at rest, 1 = evidence-contact point; continuous, deterministic. */
  pointProgress?: number;
  /** 0 = skeptical, 1 = 'I see it' facial response. */
  insight?: number;
  /** 0 = open, 1 = closed; optional deliberate blink, no random idle motion. */
  blink?: number;
  /** Tiny intentional head inclination in degrees around neck; default zero. */
  headTilt?: number;
  /** Evidence target in the actor's 360x520 SVG coordinates. Optional for
   * scene-specific right-hand point contact; never a screen-space line. */
  pointTarget?: {x:number;y:number};
};

const C={
  ink:'#142B38',cream:'#F4F0E6',teal:'#087E83',
  tealShade:'#06676D',light:'#B5D9D0',orange:'#E97F48',
  skin:'#F5DABF',skinShade:'#E8C2A2',white:'#FFFCF4',
} as const;

const clamp01=(n:number)=>Math.max(0,Math.min(1,n));
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
type P={x:number;y:number};
type ArmPlan={left:string;right:string;leftHand:P;rightHand:P;leftAngle:number;rightAngle:number};
const armPlan:Record<HostPose,ArmPlan>={
  neutral:{
    left:'M117 276 Q97 311 89 360',
    right:'M243 276 Q266 309 280 361',
    leftHand:{x:89,y:360},rightHand:{x:280,y:361},leftAngle:-14,rightAngle:10,
  },
  think:{
    left:'M117 276 Q104 245 144 195',
    right:'M243 276 Q268 312 275 362',
    leftHand:{x:144,y:195},rightHand:{x:275,y:362},leftAngle:36,rightAngle:5,
  },
  point:{
    left:'M117 276 Q98 312 92 365',
    right:'M243 276 Q298 224 355 221',
    leftHand:{x:92,y:365},rightHand:{x:355,y:221},leftAngle:-16,rightAngle:22,
  },
  react:{
    left:'M117 276 Q80 245 60 149',
    right:'M243 276 Q277 243 317 141',
    leftHand:{x:60,y:149},rightHand:{x:317,y:141},leftAngle:-25,rightAngle:29,
  },
  explain:{
    left:'M117 276 Q90 287 78 265',
    right:'M243 276 Q273 257 315 225',
    leftHand:{x:78,y:265},rightHand:{x:315,y:225},leftAngle:-12,rightAngle:20,
  },
};

/** A quiet ink/teal cuff break at the end of an actual arm stroke.
 * The cuff follows authored wrist poses and the target-driven pointing wrist;
 * it cannot remain behind on a stationary sleeve when the character gestures.
 */
const SleeveCuff:React.FC<{shoulder:P;wrist:P}>=({shoulder,wrist})=>{
  const dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y;
  const magnitude=Math.max(1,Math.hypot(dx,dy));
  const ux=dx/magnitude,uy=dy/magnitude;
  const cx=wrist.x-ux*14,cy=wrist.y-uy*14;
  const nx=-uy*10,ny=ux*10;
  return <path
    d={`M${cx-nx} ${cy-ny} L${cx+nx} ${cy+ny}`}
    stroke={C.tealShade} strokeWidth={4}
    strokeLinecap="round" opacity={0.85} fill="none"/>;
};

const Hand:React.FC<{at:P;angle:number;pose:HostPose;side:'left'|'right';extension?:number}>=
  ({at,angle,pose,side,extension=1})=>{
  const pointing=pose==='point'&&side==='right';
  const open=(pose==='react')||(pose==='explain'&&side==='right');
  const think=pose==='think'&&side==='left';
  return <g transform={`translate(${at.x} ${at.y}) rotate(${angle})`}>
    {pointing
      ? <path d={`M-13 8 Q-22 -2 -12 -14 L-4 -16
          L6 -${mix(23,51,clamp01(extension))}
          Q10 -${mix(31,59,clamp01(extension))} 18 -${mix(27,54,clamp01(extension))}
          L18 -17 Q34 -12 33 -1 Q29 14 13 19 L-7 19Z`}
          fill={C.skin} stroke={C.ink} strokeWidth={5} strokeLinejoin="round"/>
      : open
        ? <g>
          <path d="M-15 8 Q-24 -3 -18 -18 L-14 -34 Q-9 -41 -4 -35
            L1 -46 Q6 -52 12 -43 L13 -32 Q25 -45 30 -33
            L27 -8 Q25 13 6 21Z"
            fill={C.skin} stroke={C.ink} strokeWidth={5} strokeLinejoin="round"/>
          <path d="M1 -19 L8 0 M13 -19 L16 -3" stroke={C.skinShade}
            strokeWidth={3} fill="none" strokeLinecap="round"/>
        </g>
        : <g>
          <path d="M-13 -9 Q-19 -24 -6 -29 Q8 -33 18 -22
            Q28 -10 20 8 Q13 20 -4 16 Q-17 13 -13 -9Z"
            fill={C.skin} stroke={C.ink} strokeWidth={5} strokeLinejoin="round"/>
          {think&&<path d="M2 -17 Q11 -23 14 -17" fill="none"
            stroke={C.skinShade} strokeWidth={3}/>}
        </g>}
  </g>;
};

const Face:React.FC<{pose:HostPose;gazeX:number;gazeY:number;insight:number;blink:number}>=
  ({pose,gazeX,gazeY,insight,blink})=>{
  const react=pose==='react',think=pose==='think',explain=pose==='explain',point=pose==='point';
  const gx=Math.max(-11,Math.min(11,gazeX));
  const gy=Math.max(-7,Math.min(7,gazeY));
  const eyeOpen=1-0.95*clamp01(blink);
  return <g>
    {/* A recognisably asymmetric face, not the previous circular disc. */}
    <path d="M124 84 Q150 58 193 64 Q237 62 254 91
      Q265 112 258 170 Q255 215 209 235 Q174 248 144 223
      Q111 201 108 163 L108 123 Q108 103 124 84Z"
      fill={C.skin} stroke={C.ink} strokeWidth={7} strokeLinejoin="round"/>
    <path d="M245 159 Q246 197 216 216" stroke={C.skinShade}
      strokeWidth={9} fill="none" opacity={0.8} strokeLinecap="round"/>
    <path d="M122 157 Q112 148 109 156 Q105 177 120 181" fill={C.skin}
      stroke={C.ink} strokeWidth={5} strokeLinecap="round"/>
    {/* Side-swept, geometric navy hair mass: a NEW silhouette and volume. */}
    <path d="M108 128 Q93 93 107 69 Q127 33 169 35
      Q206 22 240 45 Q272 66 268 110 L249 123
      Q245 89 230 82 Q202 84 191 107
      Q172 120 135 115 L112 141Z" fill={C.ink}/>
    <path d="M129 77 Q159 52 200 64 Q183 80 143 92"
      fill="#405365" opacity={0.55}/>
    <path d="M253 109 Q263 107 264 130" stroke={C.ink}
      strokeWidth={11} strokeLinecap="round" fill="none"/>
    {/* Dramatic, pose-driven brows and readable white eyes. */}
    <g fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round">
      <path d={react?'M128 116 Q147 99 166 118':
        think?'M124 118 Q147 103 169 120':
        point?`M130 117 Q148 ${mix(102,114,clamp01(insight))} 165 116`:
        'M130 118 Q148 111 164 117'}/>
      <path d={react?'M200 118 Q221 92 239 116':
        think?'M199 115 Q222 126 240 116':
        point?`M198 118 Q220 ${mix(124,111,clamp01(insight))} 239 116`:
        explain?'M200 112 Q218 101 237 114':
        'M200 118 Q218 110 236 118'}/>
    </g>
    <ellipse cx={151} cy={151} rx={16} ry={19*eyeOpen} fill={C.white}/>
    <ellipse cx={220} cy={151} rx={16} ry={19*eyeOpen} fill={C.white}/>
    <ellipse cx={151+gx} cy={152+gy*eyeOpen} rx={7} ry={10*eyeOpen} fill={C.ink}/>
    <ellipse cx={220+gx} cy={152+gy*eyeOpen} rx={7} ry={10*eyeOpen} fill={C.ink}/>
    <path d="M186 149 L181 176 Q185 183 194 179" stroke={C.ink}
      strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {react?
      <g>
        <ellipse cx={190} cy={201} rx={21} ry={24} fill={C.ink}/>
        <ellipse cx={190} cy={213} rx={10} ry={7} fill={C.orange}/>
      </g>:
      explain?
      <path d="M171 199 Q189 184 209 201 Q205 220 190 220
        Q176 218 171 199Z" fill={C.ink} stroke={C.ink} strokeWidth={3}/>:
      think?
      <path d="M170 202 Q192 198 208 196" fill="none" stroke={C.ink}
        strokeWidth={6} strokeLinecap="round"/>:
      <path d={point?`M174 204 Q189 ${mix(200,217,clamp01(insight))} 208 ${mix(206,200,clamp01(insight))}`:'M172 200 Q190 216 208 200'}
        fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round"/>}
    {(react||explain)&&<g fill={C.orange} opacity={react ? 0.24 : 0.12}>
      <ellipse cx={126} cy={189} rx={13} ry={8}/>
      <ellipse cx={243} cy={190} rx={12} ry={8}/>
    </g>}
  </g>;
};

export const OurbitesHostConceptC:React.FC<EditorialHostConceptProps>=({
  pose='neutral',width=330,height=477,gazeX=0,gazeY=0,
  pointProgress=1,insight=1,blink=0,headTilt=0,pointTarget,
})=>{
  const a=armPlan[pose];
  const p=clamp01(pointProgress);
  const isPoint=pose==='point';
  // Candidate scene points supply one SVG-space target. The tip follows a
  // continuous path; elbow and wrist remain articulated and the fingertip is
  // constrained by the hand's actual per-frame rotation/extension.
  const rig=isPoint&&pointTarget?conceptCPointRig(pointTarget,p):null;
  // Preserve all original static poses when scenes do not supply a target.
  const legacyHand=isPoint?{
    x:mix(armPlan.neutral.rightHand.x,a.rightHand.x,p),
    y:mix(armPlan.neutral.rightHand.y,a.rightHand.y,p),
  }:a.rightHand;
  const rightHand=rig?.wrist??legacyHand;
  const rightAngle=rig?.angle??(isPoint?
    mix(armPlan.neutral.rightAngle,a.rightAngle,p):a.rightAngle);
  const rightPath=rig
    ? conceptCArmPath(rig)
    :isPoint
      ? `M243 276 Q${mix(266,298,p)} ${mix(309,224,p)} ${rightHand.x} ${rightHand.y}`
      :a.right;
  return <svg viewBox="0 0 360 520" width={width} height={height}
      role="img" aria-label={'Redesigned fictional Ourbites presenter: '+pose}
      style={{display:'block',overflow:'visible'}}>
    {/* Tapered ink-edged navy trousers: retain the original leg
        trajectories while making their material distinct from the shoes. */}
    <g fill="none" strokeLinecap="round">
      <path d="M151 355 Q143 421 133 472 M214 355 Q224 421 230 472"
        stroke={C.ink} strokeWidth={34}/>
      <path d="M151 355 Q143 421 133 472 M214 355 Q224 421 230 472"
        stroke="#253E50" strokeWidth={26}/>
    </g>
    {/* Warm neutral trainers and navy uppers instead of pure white blocks. */}
    <g fill="#E9E4D9" stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round">
      <path d="M112 463 Q121 458 145 465 Q149 474 151 488
        L96 489 Q91 481 102 474Z"/>
      <path d="M218 466 Q236 459 244 470 L266 478
        Q276 487 262 490 H211 Q206 480 218 466Z"/>
    </g>
    <path d="M120 465 Q132 463 141 470 L144 476 L113 478Z
      M226 470 Q234 462 245 471 L254 478 L220 478Z"
      fill="#253E50" opacity={0.86}/>
    <path d="M104 482 H147 M216 483 H261" stroke={C.white} strokeWidth={3.6}
      strokeLinecap="round"/>
    <path d="M128 467 L140 471 M232 472 L245 476"
      stroke={C.white} strokeWidth={2.4} strokeLinecap="round" opacity={0.87}/>

    {/* True sleeves, not stick lines. Ink under-stroke = simple vector outline. */}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={a.left} stroke={C.ink} strokeWidth={34}/>
      <path d={rightPath} stroke={C.ink} strokeWidth={34}/>
      <path d={a.left} stroke={C.teal} strokeWidth={23}/>
      <path d={rightPath} stroke={C.teal} strokeWidth={23}/>
    </g>

    {/* One recognisable editorial-workwear uniform.
        A slightly cropped teal overshirt sits over a separate cream crewneck.
        Flat layer overlaps (not gradients/3D) give the small silhouette form. */}
    <path d="M117 249 Q140 237 167 239 L216 240 Q237 241 246 259
      L246 338 Q224 356 180 356 Q139 355 110 338 L111 284
      Q111 264 117 249Z"
      fill={C.teal} stroke={C.ink} strokeWidth={7} strokeLinejoin="round"/>
    {/* Subtle recessed side plane, inside the same jacket boundary. */}
    <path d="M222 245 Q241 250 243 265 L242 332
      Q233 341 220 344 L221 283Z"
      fill={C.tealShade} opacity={0.43}/>
    {/* Cream T-shirt: a consistent open strip and a genuine rounded neckline,
        not a necklace at the throat or the former long pointed white tie. */}
    <path d="M160 242 Q188 267 216 242
      L220 351 Q192 362 163 351Z" fill="#F5F0E6"/>
    <path d="M169 247 Q186 261 208 245"
      stroke="#D4C9B8" strokeWidth={3.5} strokeLinecap="round" fill="none"/>
    {/* Two distinct overshirt fronts cover the tee's edges.
        Their offset openings suggest cloth thickness without extra outlines. */}
    <path d="M117 251 Q136 240 160 243 L170 268
      Q171 300 166 344 Q137 345 112 331
      L111 283 Q111 263 117 251Z"
      fill={C.teal}/>
    <path d="M216 243 Q237 246 245 261 L244 334
      Q230 346 218 345 Q217 305 215 270Z"
      fill={C.teal}/>
    {/* Short workwear collar: 2 tabs, with the shirt visible between them. */}
    <path d="M157 243 Q165 246 174 256 L170 269
      Q163 264 150 252Z"
      fill={C.light} stroke={C.tealShade} strokeWidth={3}
      strokeLinejoin="round"/>
    <path d="M217 243 Q209 248 205 256 L216 270
      Q224 262 231 251Z"
      fill={C.light} stroke={C.tealShade} strokeWidth={3}
      strokeLinejoin="round"/>
    {/* One stronger left opening + quieter offset right placket. */}
    <path d="M170 272 Q172 305 167 344"
      stroke={C.tealShade} strokeWidth={4} strokeLinecap="round" fill="none"/>
    <path d="M215 273 Q219 304 218 342"
      stroke={C.light} strokeWidth={2.5} opacity={0.7} fill="none"/>
    {/* One functional pocket, not multiple decorative seam lines. */}
    <path d="M127 290 H155 V316 Q142 325 127 316Z"
      fill={C.tealShade} opacity={0.68}/>
    <path d="M126 290 H156 M129 316 Q142 324 154 316"
      stroke={C.ink} strokeWidth={2.6} strokeLinecap="round"
      fill="none" opacity={0.62}/>
    {/* Signature accent belongs to the single left-front pocket. */}
    <rect x={153} y={295} width={5} height={9} rx={1.4} fill={C.orange}/>
    {/* The jacket ends above the leg origins; the T-shirt remains visible. */}
    <path d="M113 338 Q141 354 166 348 M218 348 Q236 347 245 337"
      fill="none" stroke={C.tealShade} strokeWidth={3.5}
      strokeLinecap="round" opacity={0.64}/>
    {/* Real cuffs ride with the hands across neutral, point, react and explain.
        Rendered over the torso but beneath the hand so they stay attached. */}
    <SleeveCuff shoulder={{x:117,y:276}} wrist={a.leftHand}/>
    <SleeveCuff shoulder={{x:243,y:276}} wrist={rightHand}/>

    {/* Separate neck/head layer, meaningfully different from original mascot. */}
    <path d="M166 215 H206 L211 251 Q188 266 164 251Z"
      fill={C.skinShade} stroke={C.ink} strokeWidth={5}/>
    <g transform={`rotate(${headTilt} 185 235)`}>
      <Face pose={pose} gazeX={gazeX} gazeY={gazeY} insight={insight} blink={blink}/>
    </g>

    {/* Gloves avoided: hands belong to the same human-like design. */}
    <Hand at={a.leftHand} angle={a.leftAngle} pose={pose} side="left"/>
    <Hand at={rightHand} angle={rightAngle} pose={pose} side="right"
      extension={isPoint?p:1}/>
  </svg>;
};
