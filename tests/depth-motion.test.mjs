import {strict as assert} from 'node:assert';
import {depthPath,projectDepth,contactShadow,depthPlaneTransform} from '../src/framework/motion/depth-motion.ts';
const camera={x:24,y:-8,zoom:1.025};
const paths=[
 [{x:0,y:0,z:-45},{x:-20,y:-35,z:25},{x:40,y:-75,z:65},{x:70,y:-90,z:100}],
 [{x:190,y:930,z:-100},{x:250,y:470,z:170},{x:720,y:540,z:150},{x:780,y:930,z:0}],
];
for(const points of paths){
 assert.deepEqual(depthPath(-1,points),points[0]);assert.deepEqual(depthPath(2,points),points[3]);
 for(let f=0;f<=120;f++){
  const p=depthPath(f/120,points);assert.deepEqual(p,depthPath(f/120,points));
  const q=projectDepth(p,camera);assert(Object.values(q).every(Number.isFinite));
  if(f){const a=projectDepth(depthPath((f-1)/120,points),camera);assert(Math.hypot(q.x-a.x,q.y-a.y)<25);}
 }
}
const still={x:0,y:0,zoom:1};
assert.deepEqual(projectDepth({x:100,y:200,z:0},still),{x:100,y:200,scale:1});
const near=projectDepth({x:540,y:800,z:90},camera),far=projectDepth({x:540,y:800,z:-100},camera);
assert(near.scale>far.scale);assert(Math.abs(near.x-540)>Math.abs(far.x-540));
assert(contactShadow(1).blur>contactShadow(0).blur);assert(contactShadow(1).opacity<contactShadow(0).opacity);
assert.deepEqual(contactShadow(-1),contactShadow(0));assert.deepEqual(contactShadow(2),contactShadow(1));
assert.throws(()=>projectDepth({x:0,y:0,z:1200},still));assert.throws(()=>projectDepth({x:0,y:0,z:0},{...still,zoom:0}));
assert.throws(()=>depthPath(NaN,paths[0]));assert.throws(()=>contactShadow(Infinity));
assert.equal(depthPlaneTransform(0,still),'translate(0px, 0px) scale(1)');
console.log('PASS depth paths, independent projection/parallax, continuity, contact and invalid inputs in two scenarios');
