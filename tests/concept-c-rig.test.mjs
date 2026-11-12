import assert from 'node:assert/strict';
import {conceptCPointRig,conceptCGazeForTarget} from '../src/framework/characters/ConceptCPointRig.ts';

// Pure geometry contract: reproducible at any rendered frame, no scene-specific magic numbers.
const targets=[{x:390,y:179},{x:375,y:260}];
for(const target of targets){
  let prior=null;
  for(let n=0;n<=100;n++){
    const p=n/100;
    const rig=conceptCPointRig(target,p);
    for(const point of [rig.wrist,rig.elbow,rig.fingertip]){
      assert(Number.isFinite(point.x)&&Number.isFinite(point.y));
    }
    if(prior)assert(Math.hypot(rig.fingertip.x-prior.x,rig.fingertip.y-prior.y)<5,
      'No abrupt frame-to-frame fingertip jumps along the approach');
    prior=rig.fingertip;
  }
  const contact=conceptCPointRig(target,1);
  assert(Math.abs(contact.fingertip.x-target.x)<1e-7);
  assert(Math.abs(contact.fingertip.y-target.y)<1e-7);
  const s={x:243,y:276};
  assert(Math.abs(Math.hypot(contact.elbow.x-s.x,contact.elbow.y-s.y)-72)<0.001);
  assert(Math.abs(Math.hypot(contact.wrist.x-contact.elbow.x,contact.wrist.y-contact.elbow.y)-72)<0.001);
}
const priceGaze=conceptCGazeForTarget(targets[0]);
const receiptGaze=conceptCGazeForTarget(targets[1]);
assert(receiptGaze.y>priceGaze.y,'Evidence Y should drive gaze, not a hardcoded eye pose');
// Receipt x=510, textual label begins at x=545 in 1080-wide scene coordinates.
// Reject even a pessimistic palm extent (+46 SVG units) anywhere on the hand trajectory.
for(let n=0;n<=100;n++){
  const rig=conceptCPointRig(targets[1],n/100);
  const palmRight=90+(rig.wrist.x+46)*410/360+3;
  assert(palmRight<545-7,'Hand cannot cover the receipt label column');
}
console.log('PASS: Concept C tip contact, joint lengths, path continuity, gaze and receipt text clearance');
