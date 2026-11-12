import assert from 'node:assert/strict';
import {paperHingeState} from '../src/framework/motion/paper-hinge-motion.ts';

// The source and result amounts share the exact same face/semantic label.
// Verify boundaries and no transitional crossfade with two independent labels.
for(const [start,duration,total] of [[85,16,120],[89,16,150]]){
  const midpoint=start+Math.floor(duration/2);
  const end=start+duration;
  for(let f=0;f<total;f++){
    const a=paperHingeState(f,start,duration);
    const b=paperHingeState(f,start,duration);
    assert.deepEqual(a,b,'Rendering must be deterministic');
    assert(['before','after'].includes(a.face));
    assert(Math.abs(a.angleDegrees)<=89,'Paper should never flip behind the face');
    assert(a.face===(f<midpoint?'before':'after'),'Amount and label must switch together');
    assert(a.phase===(f<start?'hold':f<midpoint?'fold-out':f<end?'fold-in':'settled'));
  }
  assert.equal(paperHingeState(start-1,start,duration).angleDegrees,0);
  assert.equal(paperHingeState(end,start,duration).angleDegrees,0);
  assert.equal(paperHingeState(end,start,duration).face,'after');
  const lastOld=paperHingeState(midpoint-1,start,duration);
  const firstNew=paperHingeState(midpoint,start,duration);
  assert(Math.abs(lastOld.angleDegrees)>=75);
  assert(Math.abs(firstNew.angleDegrees)>=85);
}
assert.throws(()=>paperHingeState(12,5,2));
console.log('PASS: paper hinge state, semantic pairs, exact boundaries, deterministic 2.5D fold');
