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
    {/* NEW human-like silhouette: sturdy trousers and distinct sneakers. */}
    <g stroke={C.ink} strokeWidth={30} fill="none" strokeLinecap="round">
      <path d="M151 355 Q143 421 133 472"/>
      <path d="M214 355 Q224 421 230 472"/>
    </g>
    <g fill={C.ink}>
      <path d="M112 463 Q121 458 145 465 Q149 474 151 488
        L96 489 Q91 481 102 474Z"/>
      <path d="M218 466 Q236 459 244 470 L266 478
        Q276 487 262 490 H211 Q206 480 218 466Z"/>
    </g>
    <path d="M103 483 H149 M218 484 H262" stroke={C.white} strokeWidth={4}
      strokeLinecap="round" opacity={0.68}/>

    {/* True sleeves, not stick lines. Ink under-stroke = simple vector outline. */}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={a.left} stroke={C.ink} strokeWidth={34}/>
      <path d={rightPath} stroke={C.ink} strokeWidth={34}/>
      <path d={a.left} stroke={C.teal} strokeWidth={23}/>
      <path d={rightPath} stroke={C.teal} strokeWidth={23}/>
    </g>

    {/* Layered overshirt is a flat editorial shape, not a shaded 3D costume. */}
    <path d="M118 247 Q140 235 169 237 L214 237 Q237 242 246 257
      L247 353 Q214 373 177 376 Q133 373 109 353 L109 285
      Q110 264 118 247Z"
      fill={C.teal} stroke={C.ink} strokeWidth={7} strokeLinejoin="round"/>
    <path d="M159 246 L174 288 L188 360 L203 286 L220 246Z"
      fill={C.white}/>
    <path d="M158 247 L172 283 L151 275 L137 247
      M221 247 L206 281 L225 275 L236 253"
      fill={C.light} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round"/>
    <path d="M188 281 L188 359" stroke={C.ink} strokeWidth={3} opacity={0.34}/>
    <path d="M205 308 L231 306" stroke={C.tealShade} strokeWidth={5}
      strokeLinecap="round"/>
    <circle cx={188} cy={317} r={4} fill={C.ink}/>
    <path d="M116 337 Q145 358 175 361 Q211 365 243 348"
      fill="none" stroke={C.ink} opacity={0.23} strokeWidth={4}/>

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
