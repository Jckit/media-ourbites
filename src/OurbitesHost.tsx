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
};

const ink = '#142B38';
const teal = '#087E83';
const paper = '#F4F0E6';
const orange = '#E97F48';

export const OurbitesHost: React.FC<HostProps> = ({
  pose = 'neutral', doubt, width = 330, height = 477, animate = false,
  gazeX = 0, gazeY = 0,
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
        <path d={leftArm} fill="none"/>
        <path d={rightArm} fill="none"/>
        <circle cx="180" cy="145" r="97" fill={paper}/>
        <path d="M130 65 L164 20 L176 75 Z" fill={ink}/>
        <path d={'M128 109 Q140 ' + (96 + 12 * skeptical) + ' 153 108'} fill="none"/>
        <path d={reacting ? 'M202 102 Q218 85 237 102' : 'M204 108 Q218 95 232 108'} fill="none"/>
        <circle cx={144 + pupilX} cy={139 + pupilY} r="6"/>
        <circle cx={219 + pupilX} cy={139 + pupilY} r="6"/>
        <path d={reacting ? 'M174 187 Q184 170 196 187'
          : 'M165 183 Q182 ' + (199 - 22 * skeptical) + ' 200 183'} fill="none"/>
        {thinking && <circle cx="153" cy="203" r="8" fill={paper}/>}
        {pointing && <circle cx="337" cy="163" r="6" fill={paper}/>}
        {explaining && <circle cx="328" cy="212" r="10" fill={paper}/>}
        {reacting && <circle cx="61" cy="161" r="10" fill={paper}/>}
      </g>
      {(thinking || reacting) && (
        <g>
          <text x="283" y="85" fontSize="68" fontWeight="850" fill={reacting ? orange : teal}>
            {thinking ? '?' : '!'}
          </text>
        </g>
      )}
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
