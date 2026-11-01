import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

// Reusable, provisional Ourbites character. Design anchored to the existing
// HybridHost SVG in OwnershipProof.tsx and styles/CHARACTER-PROMPTS.md.
// NOT a real person and NOT yet the final human-approved channel mascot.
export type HostPose = 'neutral' | 'explain' | 'think' | 'point' | 'react';
type HostProps = {
  pose?: HostPose;
  /** Preserves the legacy OwnershipProof facial doubt animation (0–1). */
  doubt?: number;
  width?: number;
  height?: number;
  /** Slight entrance animation only; no perpetual bobbing. */
  animate?: boolean;
  /** Small signed SVG-unit offsets; the head and silhouette never rotate. */
  gazeX?: number;
  gazeY?: number;
  /** Optional transition between existing poses; omitted preserves legacy drawing. */
  poseFrom?: HostPose;
  poseBlend?: number;
};

const ink = '#142B38';
const teal = '#087E83';
const paper = '#F4F0E6';
const orange = '#E97F48';

export const OurbitesHost: React.FC<HostProps> = ({
  pose = 'neutral', doubt, width = 330, height = 477, animate = false,
  gazeX = 0, gazeY = 0, poseFrom, poseBlend,
}) => {
  const frame = useCurrentFrame();
  const entrance = animate
    ? interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;
  const skeptical = Math.max(0, Math.min(1, doubt ?? (pose === 'react' ? 1 : 0)));
  const pointing = pose === 'point';
  const explaining = pose === 'explain';
  const thinking = pose === 'think';
  const reacting = pose === 'react';
  // A restrained glance cues the next relevant business prop without morphing the face.
  const pupilX = Math.max(-12, Math.min(12, gazeX));
  const pupilY = Math.max(-9, Math.min(9, gazeY));

  // Every pose has the same head, torso, limbs, hair tuft and colors.
  // Only the arm paths, eyebrows, mouth and optional question mark change.
  const leftArm = thinking ? 'M122 255 Q93 286 106 309 L153 203'
    : reacting ? 'M122 255 Q55 210 61 161'
    : 'M122 255 Q68 301 108 325';
  const rightArm = pointing ? 'M236 255 Q284 204 337 163'
    : explaining ? 'M236 255 Q286 283 328 212'
    : reacting ? 'M236 255 Q288 206 323 152'
    : 'M236 255 Q295 305 325 315';
  // An optional mechanical continuity correction: interpolate existing arm
  // geometry without inventing any new pose or changing default renders.
  const blending = poseFrom !== undefined && poseBlend !== undefined;
  const blend = Math.max(0,Math.min(1,poseBlend ?? 1));
  const lerp = (a:number,b:number) => a + (b-a)*blend;
  const leftPoints = (p:HostPose) => p==='think'
    ? {cx:93,cy:286,ex:106,ey:309,hx:153,hy:203}
    : p==='react' ? {cx:55,cy:210,ex:61,ey:161,hx:61,hy:161}
    : {cx:68,cy:301,ex:108,ey:325,hx:108,hy:325};
  const rightPoints = (p:HostPose) => p==='point'
    ? {cx:284,cy:204,ex:337,ey:163,hx:337,hy:163}
    : p==='explain' ? {cx:286,cy:283,ex:328,ey:212,hx:328,hy:212}
    : p==='react' ? {cx:288,cy:206,ex:323,ey:152,hx:323,hy:152}
    : {cx:295,cy:305,ex:325,ey:315,hx:325,hy:315};
  const fromLeft=leftPoints(poseFrom ?? pose), toLeft=leftPoints(pose);
  const fromRight=rightPoints(poseFrom ?? pose), toRight=rightPoints(pose);
  const leftPath=blending
    ? 'M122 255 Q'+lerp(fromLeft.cx,toLeft.cx)+' '+lerp(fromLeft.cy,toLeft.cy)+' '
      +lerp(fromLeft.ex,toLeft.ex)+' '+lerp(fromLeft.ey,toLeft.ey)
      +' L'+lerp(fromLeft.hx,toLeft.hx)+' '+lerp(fromLeft.hy,toLeft.hy)
    : leftArm;
  const rightPath=blending
    ? 'M236 255 Q'+lerp(fromRight.cx,toRight.cx)+' '+lerp(fromRight.cy,toRight.cy)+' '
      +lerp(fromRight.ex,toRight.ex)+' '+lerp(fromRight.ey,toRight.ey)
    : rightArm;
  const leftMark = (p:HostPose) => p==='think'||p==='react' ? 1 : 0;
  const rightMark = (p:HostPose) => p==='point'||p==='explain' ? 1 : 0;
  // Morph facial curves once rather than crossfading two opaque ink drawings:
  // a dual-face blend produced gray/ghosted eyebrows and mouth at mid-gesture.
  const faceMetrics = (p:HostPose) => {
    const react=p==='react';
    const d=Math.max(0,Math.min(1,doubt ?? (react ? 1 : 0)));
    return {
      leftBrowY:96+12*d,
      browStartX:react?202:204, browStartY:react?102:108,
      browControlY:react?85:95, browEndX:react?237:232,
      browEndY:react?102:108,
      mouthStartX:react?174:165, mouthStartY:react?187:183,
      mouthControlX:react?184:182, mouthControlY:react?170:199-22*d,
      mouthEndX:react?196:200, mouthEndY:react?187:183,
    };
  };
  const faceFrom=faceMetrics(poseFrom ?? pose), faceTo=faceMetrics(pose);
  const fm=(key:keyof ReturnType<typeof faceMetrics>) =>
    blending ? lerp(faceFrom[key],faceTo[key]) : faceTo[key];
  const symbol = (p:HostPose,opacity:number) => (p==='think'||p==='react') && (
    <text x="283" y="85" opacity={opacity} fontSize="68" fontWeight="850"
      fill={p==='react' ? orange : teal}>{p==='think' ? '?' : '!'}</text>
  );


  return (
    <svg
      viewBox="0 0 360 520"
      width={width}
      height={height}
      role="img"
      aria-label={'Fictional Ourbites guide: ' + pose}
      style={{display: 'block', overflow: 'visible', opacity: entrance,
        transform: animate ? 'translateY(' + (1 - entrance) * 18 + 'px)' : undefined}}
    >
      <g stroke={ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M145 355 L135 475 H105 M215 355 L228 475 H257" fill="none"/>
        <path d="M125 235 Q100 290 120 350 Q180 380 240 350 L235 235" fill={teal}/>
        <path d={leftPath} fill="none"/>
        <path d={rightPath} fill="none"/>
        <circle cx="180" cy="145" r="97" fill={paper}/>
        <path d="M130 65 L164 20 L176 75 Z" fill={ink}/>

        <path d={'M128 109 Q140 '+fm('leftBrowY')+' 153 108'} fill="none"/>
        <path d={'M'+fm('browStartX')+' '+fm('browStartY')+
          ' Q218 '+fm('browControlY')+' '+fm('browEndX')+' '+fm('browEndY')} fill="none"/>
        <path d={'M'+fm('mouthStartX')+' '+fm('mouthStartY')+
          ' Q'+fm('mouthControlX')+' '+fm('mouthControlY')+' '+
          fm('mouthEndX')+' '+fm('mouthEndY')} fill="none"/>
        <circle cx={144 + pupilX} cy={139 + pupilY} r="6"/>
        <circle cx={219 + pupilX} cy={139 + pupilY} r="6"/>
        {blending ? <>
          <circle cx={lerp(fromLeft.hx,toLeft.hx)} cy={lerp(fromLeft.hy,toLeft.hy)}
            r={lerp(poseFrom==='think'?8:10,pose==='think'?8:10)} fill={paper}
            opacity={lerp(leftMark(poseFrom!),leftMark(pose))}/>
          <circle cx={lerp(fromRight.hx,toRight.hx)} cy={lerp(fromRight.hy,toRight.hy)}
            r={lerp(poseFrom==='explain'?10:6,pose==='explain'?10:6)} fill={paper}
            opacity={lerp(rightMark(poseFrom!),rightMark(pose))}/>
        </> : <>
          {thinking && <circle cx="153" cy="203" r="8" fill={paper}/>}
          {pointing && <circle cx="337" cy="163" r="6" fill={paper}/>}
          {explaining && <circle cx="328" cy="212" r="10" fill={paper}/>}
          {reacting && <circle cx="61" cy="161" r="10" fill={paper}/>}
        </>}
      </g>
      <g>
        {blending ? <>{symbol(poseFrom!,1-blend)}{symbol(pose,blend)}</> : symbol(pose,1)}
      </g>
    </svg>
  );
};

// Small supporting visual, deliberately outside narration/source-data content.
// Parent scene is responsible for choosing a safe zone on mobile.
export const OurbitesHostCameo: React.FC<{
  pose: HostPose;
  top?: number;
  right?: number;
  width?: number;
  opacity?: number;
}> = ({pose, top = 1150, right = 82, width = 224, opacity = 1}) => (
  <div style={{
    position: 'absolute', top, right, width, height: width * 520 / 360,
    opacity, pointerEvents: 'none', zIndex: 2,
  }}>
    <OurbitesHost pose={pose} width={width} height={width * 520 / 360} animate/>
  </div>
);
