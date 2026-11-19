/** A frame-deterministic reach rig for the fictional Concept C host.
 * Actor coordinates are the original 360×520 SVG viewBox; never mix with scene pixels.
 * No automatic gesturing or implicit production-host promotion.
 */
export type Point2={x:number;y:number};
export type PointRig={wrist:Point2; elbow:Point2; fingertip:Point2; angle:number};
const shoulder:Point2={x:243,y:276};
const idleWrist:Point2={x:280,y:361};
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;

/** Use the same visual end effector for every authored evidence target. */
export const conceptCFingerOffset=(angle:number,progress:number):Point2=>{
  const p=clamp(progress,0,1);
  const r=angle*Math.PI/180;
  // Match the index-finger path endpoint in the shared SVG hand exactly.
  const x=18,y=-lerp(27,54,p);
  return {x:x*Math.cos(r)-y*Math.sin(r),y:x*Math.sin(r)+y*Math.cos(r)};
};

export const conceptCGazeForTarget=(target:Point2):Point2=>({
  x:clamp((target.x-186)/16,-11,11),
  y:clamp((target.y-152)/14,-7,7),
});

/** Small controlled elbow flex.
 * Previous equal-length 72-unit IK demanded ~90-degree turns at contact,
 * creating a rigid V-shaped puppet arm. Keep the elbow near the line from
 * shoulder to wrist, offset just 11.5–14 units toward screen-up.
 * The chosen elbow stays on the SAME side throughout the reach; no IK flips.
 */
const elbowFor=(wrist:Point2,progress:number):Point2=>{
  const dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y;
  const d=Math.max(0.001,Math.hypot(dx,dy));
  const bend=lerp(11.5,14,clamp(progress,0,1));
  return {
    x:shoulder.x+dx/2+(dy/d)*bend,
    y:shoulder.y+dy/2-(dx/d)*bend,
  };
};

/** Tangent-continuous sleeve through the actual elbow.
 * Two cubic segments meet with the same derivative, so there is no sharp
 * SVG "L" corner while the forearm still visibly follows the wrist.
 */
export const conceptCArmPath=(rig:PointRig):string=>{
  const e=rig.elbow,w=rig.wrist;
  const dx=w.x-shoulder.x,dy=w.y-shoulder.y;
  const d=Math.max(0.001,Math.hypot(dx,dy));
  const tangent=Math.min(19,d*0.18);
  const tx=dx/d*tangent,ty=dy/d*tangent;
  const c1={x:lerp(shoulder.x,e.x,0.55),y:lerp(shoulder.y,e.y,0.55)};
  const c4={x:lerp(w.x,e.x,0.47),y:lerp(w.y,e.y,0.47)};
  return `M${shoulder.x} ${shoulder.y} C${c1.x} ${c1.y} ${e.x-tx} ${e.y-ty} ${e.x} ${e.y} C${e.x+tx} ${e.y+ty} ${c4.x} ${c4.y} ${w.x} ${w.y}`;
};

/** The fingertip follows one continuous curved path; the wrist is solved
 * backwards from its per-frame angle and finger extension. A modest elbow
 * flex follows the wrist, with a C1-continuous sleeve instead of a hard kink.
 */
export const conceptCPointRig=(target:Point2,progress:number):PointRig=>{
  const p=clamp(progress,0,1);
  const angle=lerp(10,22,p);
  const startOffset=conceptCFingerOffset(10,0);
  const start:Point2={
    x:idleWrist.x+startOffset.x,y:idleWrist.y+startOffset.y,
  };
  // A modest arc that does not whip the wrist up past the shoulder mid-reach.
  // The previous min(start,target)-12 control forced a sharp premature bend.
  const control:Point2={
    x:lerp(start.x,target.x,0.45),
    y:lerp(start.y,target.y,0.5)-8,
  };
  const curve=(key:'x'|'y')=>(1-p)*(1-p)*start[key]+
    2*(1-p)*p*control[key]+p*p*target[key];
  const fingertip={x:curve('x'),y:curve('y')};
  const offset=conceptCFingerOffset(angle,p);
  const wrist={x:fingertip.x-offset.x,y:fingertip.y-offset.y};
  const elbow=elbowFor(wrist,p);
  return {wrist,elbow,fingertip,angle};
};
