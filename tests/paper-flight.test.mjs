import {strict as assert} from 'node:assert';
import {samplePaperFlight} from '../src/framework/paper-flight.ts';
const plans=[
 {poses:[{at:1,x:595,y:795,angle:8},{at:2,x:430,y:620,angle:-12},{at:3,x:548,y:896,angle:-4}],unfold:[1.5,2.5]},
 {poses:[{at:0,x:100,y:400,angle:-20},{at:0.3,x:700,y:300,angle:4},{at:2,x:650,y:600,angle:0}],unfold:[0.4,1.7]},
];
for(const plan of plans){
 const first=samplePaperFlight(-1,plan),last=samplePaperFlight(10,plan);
 assert.equal(first.x,plan.poses[0].x);assert.equal(last.y,plan.poses.at(-1).y);
 assert.equal(first.open,0);assert.equal(last.open,1);
 for(let i=0;i<=300;i++){const p=samplePaperFlight(i/30,plan);assert(Object.values(p).every(Number.isFinite));assert(p.open>=0&&p.open<=1);}
 for(const key of plan.poses){const a=samplePaperFlight(key.at-0.00001,plan),b=samplePaperFlight(key.at+0.00001,plan);assert(Math.hypot(a.x-b.x,a.y-b.y)<0.01);}
}
assert.throws(()=>samplePaperFlight(1,{poses:[],unfold:[0,1]}));
assert.throws(()=>samplePaperFlight(1,{...plans[0],unfold:[2,1]}));
console.log('PASS: two numeric trajectory configurations, endpoints, continuity, invalid plans. Not visual reuse proof.');
