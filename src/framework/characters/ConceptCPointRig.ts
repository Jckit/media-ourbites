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

/** Anatomical bend: two consistent 72-unit arm segments at contact.
 * The elbow takes the upper solution, lifted toward the shoulder. */
const elbowFor=(wrist:Point2):Point2=>{
  const dx=wrist.x-shoulder.x,dy=wrist.y-shoulder.y;
  const d=Math.max(0.001,Math.hypot(dx,dy));
  const along=Math.min(d/2,72);
  const height=Math.sqrt(Math.max(0,72*72-along*along));
  return {
    x:shoulder.x+(dx/d)*along+(dy/d)*height,
    y:shoulder.y+(dy/d)*along-(dx/d)*height,
  };
};

/** The fingertip follows one continuous curved path; the wrist is solved
 * backwards from its per-frame angle and finger extension.
 * A bent elbow follows that constrained wrist, rather than redrawing an arbitrary sleeve.
 */
export const conceptCPointRig=(target:Point2,progress:number):PointRig=>{
  const p=clamp(progress,0,1);
  const angle=lerp(10,22,p);
  const startOffset=conceptCFingerOffset(10,0);
  const start:Point2={
    x:idleWrist.x+startOffset.x,y:idleWrist.y+startOffset.y,
  };
  const control:Point2={
    x:lerp(start.x,target.x,0.45),
    y:Math.min(start.y,target.y)-12,
  };
  const curve=(key:'x'|'y')=>(1-p)*(1-p)*start[key]+
    2*(1-p)*p*control[key]+p*p*target[key];
  const fingertip={x:curve('x'),y:curve('y')};
  const offset=conceptCFingerOffset(angle,p);
  const wrist={x:fingertip.x-offset.x,y:fingertip.y-offset.y};
  const raisedElbow=elbowFor(wrist);
  const elbow={
    x:lerp(266,raisedElbow.x,p),
    y:lerp(309,raisedElbow.y,p),
  };
  return {wrist,elbow,fingertip,angle};
};
