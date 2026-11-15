import assert from 'node:assert/strict';
import {balanceContact,BALANCE_ACTOR_ANCHOR,BALANCE_NEUTRAL_TARGET}
  from '../src/framework/motion/balance-contact.ts';

// The host reaches an original graphic, not a new floating info-card.
// The physical scale control and fingertip derive from the SAME screen anchor.
let prior=null;
for(let n=0;n<=240;n++){
  const t=6.9+n*0.02;
  const s=balanceContact(t);
  assert.deepEqual(s,balanceContact(t),'motion must be deterministic');
  for(const x of [s.approach,s.press,s.beamAngle,s.handTarget.x,
    s.handTarget.y,s.contactScreen.x,s.contactScreen.y])assert(Number.isFinite(x));
  assert(s.approach>=0&&s.approach<=1&&s.press>=0&&s.press<=1);
  assert(s.beamAngle<=0&&s.beamAngle>=-8.05,'beam tip remains restrained');
  const px=BALANCE_ACTOR_ANCHOR.x+s.handTarget.x*BALANCE_ACTOR_ANCHOR.scale;
  const py=BALANCE_ACTOR_ANCHOR.y+s.handTarget.y*BALANCE_ACTOR_ANCHOR.scale;
  assert(Math.abs(s.contactScreen.x-px)<0.0001);
  assert(Math.abs(s.contactScreen.y-py)<0.0001);
  if(prior){
    assert(Math.abs(s.contactScreen.x-prior.contactScreen.x)<2,
      'no button/fingertip popping');
    assert(Math.abs(s.beamAngle-prior.beamAngle)<0.5,'no sharp beam rotation');
  }
  prior=s;
}
assert.equal(balanceContact(7.3).press,0);
assert.equal(balanceContact(7.3).beamAngle,0);
assert.equal(balanceContact(8.02).approach,1);
assert.equal(balanceContact(8.02).press,0);
assert.equal(balanceContact(8.32).press,1);
assert(balanceContact(8.59).beamAngle<-7.5);
assert(balanceContact(10.05).beamAngle>-3.1);
assert.equal(balanceContact(10.8).approach,0);
assert.equal(balanceContact(10.8).press,0);
assert(Math.abs(balanceContact(11.2).handTarget.x-BALANCE_NEUTRAL_TARGET.x)<0.00001);
console.log('PASS: actor reaches and presses shared scale socket, beam responds, no pops');
