import {strict as assert} from 'node:assert';
import {samplePaperFlight, paperBezierTiming} from '../src/framework/paper-flight.ts';
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
// A single continuous path is used during actual travel, with an independent fold curve.
const directed={
 poses:[{at:6.2,x:595,y:795,angle:8},{at:6.45,x:611,y:810,angle:12},
   {at:7.85,x:548,y:888,angle:-5},{at:8.1,x:548,y:896,angle:-4}],
 unfold:[6.55,7.7],unfoldTiming:[0.26,0.02,0.18,1],
 travel:{startAt:6.45,endAt:7.85,
   control1:{x:305,y:365},control2:{x:380,y:775},timing:[0.38,0.02,0.23,1]},
};
const takeoff=samplePaperFlight(6.45,directed),landing=samplePaperFlight(7.85,directed);
assert.equal(takeoff.x,611);assert.equal(takeoff.y,810);
assert.equal(landing.x,548);assert.equal(landing.y,888);
assert.equal(samplePaperFlight(5,directed).open,0);
assert.equal(samplePaperFlight(9,directed).open,1);
assert.equal(paperBezierTiming(0,[0.38,0.02,0.23,1]),0);
assert.equal(paperBezierTiming(1,[0.38,0.02,0.23,1]),1);
assert(samplePaperFlight(7.1,directed).y<770,'arc must rise instead of sliding on a straight track');
const mid=samplePaperFlight(7.1,directed),midNext=samplePaperFlight(7.1+1/30,directed);
assert(Math.hypot(mid.x-midNext.x,mid.y-midNext.y)>2,'the paper must not stop at the middle of travel');
for(let i=0;i<300;i++){
 const p=samplePaperFlight(i/30,directed);
 assert(Object.values(p).every(Number.isFinite));
 assert(p.open>=0&&p.open<=1&&p.elevation>=0&&p.elevation<=1);
}
assert.throws(()=>samplePaperFlight(7,{...directed,travel:{...directed.travel,startAt:6.1}}));
assert.throws(()=>samplePaperFlight(7,{...directed,travel:{...directed.travel,timing:[2,0,0,1]}}));
console.log('PASS: legacy two-fixture compatibility, continuous Bezier travel, independent unfolding, contact and invalid controls. Visual review remains separate.');
