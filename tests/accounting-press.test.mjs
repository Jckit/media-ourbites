import {strict as assert} from 'node:assert';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import ts from 'typescript';

// Compile the real candidate and its pure dependency; no copied motion implementation.
const dir = new URL('../out/issue50-test/', import.meta.url);
await mkdir(dir, {recursive:true});
for (const [source, target] of [
  ['motion/depth-motion.ts', 'depth-motion.mjs'],
  ['proofs/accounting-press.ts', 'accounting-press.mjs'],
]) {
  const text = await readFile(new URL('../src/framework/'+source, import.meta.url),'utf8');
  const code = ts.transpileModule(text, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  await writeFile(new URL(target,dir),code.replace('../motion/depth-motion','./depth-motion.mjs'));
}
const {accountingPressState:sample} = await import(new URL('accounting-press.mjs',dir));
assert.throws(()=>sample(NaN));
assert.equal(sample(0).feed,0);
assert.equal(sample(5.6).feed,1);
assert.equal(sample(5.6).output,1);
assert(sample(.5).angle<sample(0).angle,'anticipation opposes the drive');
assert(sample(1.4).feed>sample(1.4).output,'input leads the printed result');
assert(sample(2.5).camera.zoom>sample(5.6).camera.zoom,'camera must widen to reveal context');
let previous;
for(let f=0;f<170;f++) {
  const s=sample(f/30);
  assert.deepEqual(s,sample(f/30),'random access is deterministic');
  if(f/30<=2.25) assert.deepEqual(s.hand,s.crank,'actor contact cannot drift before release');
  assert(s.feed>=0&&s.feed<=1&&s.output>=0&&s.output<=1);
  if(previous) {
    // Keep the original world-space speed guard under the newly enlarged camera.
    const handStep=Math.hypot(s.hand.x-previous.hand.x,s.hand.y-previous.hand.y);
    assert(handStep/Math.max(s.camera.zoom,previous.camera.zoom)<25,'no hand teleport');
    assert(Math.hypot(s.receipt.x-previous.receipt.x,s.receipt.y-previous.receipt.y)<60,'no sheet teleport');
    assert(s.feed>=previous.feed && s.output>=previous.output,'paper cannot reverse accidentally');
  }
  previous=s;
}
assert(sample(5.6).slip.y-140>760,'input slip must fully pass behind the feed mouth');
const before=sample(2.85-1e-6).receipt,after=sample(2.85+1e-6).receipt;
assert(Math.hypot(after.x-before.x,after.y-before.y)<.01,'one continuous print-to-flight anchor');
assert(Math.abs(after.scale-before.scale)<.001,'no size pop when sheet detaches');
assert.equal(sample(3).grip,0,'release hand before press exits');
assert.equal(sample(5).hand.x,814.5,'resting hand must not follow offscreen press');
assert.equal(sample(4.55).flight,1,'arrive with at least one second of reading time');
assert.deepEqual(sample(5.6).receipt,{x:560,y:780,scale:.95});
assert(sample(3.6).receipt.y<sample(2.85).receipt.y-200,'payoff must travel into upper statement');
// Test the entire rotated paper silhouette, not just its center or paint order.
// Dario hair/face bounds plus a safety margin, in composition pixels.
const face={left:825,right:1000,top:1010,bottom:1210};
for(let t=2.85;t<=4.55;t+=1/120) {
  const s=sample(t),a=s.receiptAngle*Math.PI/180;
  const corners=[[-225,-120],[225,-120],[225,142],[-225,142]].map(([x,y])=>({
    x:s.receipt.x+s.receipt.scale*(x*Math.cos(a)-y*Math.sin(a)),
    y:s.receipt.y+s.receipt.scale*(x*Math.sin(a)+y*Math.cos(a)),
  }));
  const xs=corners.map(p=>p.x),ys=corners.map(p=>p.y);
  assert(Math.max(...xs)<face.left || Math.min(...xs)>face.right ||
    Math.max(...ys)<face.top || Math.min(...ys)>face.bottom,
    `receipt grazes Dario face at ${t.toFixed(3)}s`);
}
console.log('Accounting press: grip/release, print-to-flight continuity, arrival, sequencing and determinism pass.');
