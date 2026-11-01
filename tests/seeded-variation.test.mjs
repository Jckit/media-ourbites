import {strict as assert} from 'node:assert';
import {seededUnit,seededRange} from '../src/framework/motion/seeded-variation.ts';
const a=seededUnit('episode-001','paper-edge-3','rotation');
assert.equal(a,seededUnit('episode-001','paper-edge-3','rotation'));
assert(a>=0&&a<1);
assert.notEqual(a,seededUnit('episode-001','paper-edge-4','rotation'));
assert.notEqual(a,seededUnit('episode-002','paper-edge-3','rotation'));
assert.notEqual(a,seededUnit('episode-001','paper-edge-3','position'));
for(let i=0;i<100;i++){
  const v=seededRange('shot-01','dot-'+i,-3,3);
  assert(v>=-3&&v<3);
}
assert.equal(seededRange('shot-01','zero',0,0),0);
assert.throws(()=>seededRange('shot-01','bad',4,2));
console.log('PASS: stable seeded variation scoped to non-semantic artwork');
