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
  assert.deepEqual(s.hand,s.crank,'actor contact cannot drift from moving crank');
  assert(s.feed>=0&&s.feed<=1&&s.output>=0&&s.output<=1);
  if(previous) {
    assert(Math.hypot(s.hand.x-previous.hand.x,s.hand.y-previous.hand.y)<25,'no hand teleport');
    assert(s.feed>=previous.feed && s.output>=previous.output,'paper cannot reverse accidentally');
  }
  previous=s;
}
assert(sample(5.6).slip.y-140>760,'input slip must fully pass behind the feed mouth');
console.log('Accounting press: contact, continuity, sequencing, camera and determinism pass.');
