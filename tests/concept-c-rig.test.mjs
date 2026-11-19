import assert from 'node:assert/strict';
import {conceptCPointRig,conceptCGazeForTarget,conceptCArmPath} from '../src/framework/characters/ConceptCPointRig.ts';

// Pure geometry contract: reproducible at any rendered frame, no scene-specific magic numbers.
const targets=[{x:370,y:179},{x:375,y:260}];
for(const target of targets){
  let previous=null;
  for(let n=0;n<=100;n++){
    const p=n/100;
    const rig=conceptCPointRig(target,p);
    for(const point of [rig.wrist,rig.elbow,rig.fingertip]){
      assert(Number.isFinite(point.x)&&Number.isFinite(point.y));
    }
    const s={x:243,y:276},e=rig.elbow,w=rig.wrist;
    const upper={x:e.x-s.x,y:e.y-s.y},fore={x:w.x-e.x,y:w.y-e.y};
    const upperLen=Math.hypot(upper.x,upper.y);
    const foreLen=Math.hypot(fore.x,fore.y);
    const cosTurn=(upper.x*fore.x+upper.y*fore.y)/(upperLen*foreLen);
    const turn=Math.acos(Math.max(-1,Math.min(1,cosTurn)))*180/Math.PI;
    assert(turn<48,'Elbow must not form a harsh V bend');
    assert(turn>14,'Elbow should retain a subtle natural bend');
    assert(upperLen>30&&upperLen<65&&foreLen>30&&foreLen<65,
      'Neither arm segment should collapse or grow excessively');
    assert(conceptCArmPath(rig).includes(' C') &&
      !conceptCArmPath(rig).includes(' L'),'Sleeve must have C1-smooth cubic joins');
    if(previous){
      assert(Math.hypot(rig.fingertip.x-previous.fingertip.x,
        rig.fingertip.y-previous.fingertip.y)<5,
        'No fingertip pops along the approach');
      assert(Math.hypot(e.x-previous.elbow.x,e.y-previous.elbow.y)<2.5,
        'Elbow may not jump or change IK solution between frames');
    }
    previous=rig;
  }
  const contact=conceptCPointRig(target,1);
  assert(Math.abs(contact.fingertip.x-target.x)<1e-7);
  assert(Math.abs(contact.fingertip.y-target.y)<1e-7);
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
// Price card starts x505 and the € glyph begins at screen x548;
// reserve a conservative 10px gap from the ink outline at ALL approach frames.
for(let n=0;n<=100;n++){
  const rig=conceptCPointRig(targets[0],n/100);
  const palmRight=90+(rig.wrist.x+46)*410/360+3;
  assert(palmRight<538,'Price hand must not occlude € glyph');
}
console.log('PASS: Concept C smooth elbow, stable sleeve curvature, fingertip contact, gaze and text clearance');
