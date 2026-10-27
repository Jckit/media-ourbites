import {ownershipState,primaryScenario,secondScenario} from '../src/ownership-state.ts';
import assert from 'node:assert/strict';
for (const s of [primaryScenario,secondScenario]) {
  let previous=0;
  for(let frame=0;frame<477;frame++) {
    const state=ownershipState(s,frame,30);
    assert.equal(state.total,s.initial+state.added);
    assert.equal(state.total/s.unit,Math.round(state.total/s.unit));
    assert.equal(state.percent,s.owned/state.total*100);
    assert.ok(state.added>=previous);
    previous=state.added;
  }
  assert.equal(previous,s.issued);
  assert.equal(ownershipState(s,0,30).total,s.initial);
}
assert.equal(ownershipState(primaryScenario,180,30).percent,8);
assert.equal(ownershipState(secondScenario,180,30).percent,20);
assert.throws(()=>ownershipState({...primaryScenario,unit:0},0,30));
console.log('954 frames: totals, tile counts, percentages and monotonic issuance passed.');
