import {Easing} from 'remotion';
import {depthPath, projectDepth} from '../motion/depth-motion';

// Candidate choreography, not an accepted library recipe. Time is local playback seconds.
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const drive = Easing.bezier(.42, 0, .18, 1);
const release = Easing.bezier(.16, .8, .24, 1);
const progress = (t: number, start: number, end: number, curve = drive) =>
  curve(clamp((t - start) / (end - start)));

const pressCamera = (t:number) => {
  const push = progress(t, .15, 1.4);
  const exit = progress(t, 3, 3.85, release);
  return {x:15*push+1100*exit, y:-30*push+260*exit, zoom:1.15+.06*push-.21*exit};
};
const RELEASE_AT = 2.85;
// The output and its flight share this exact pose; there is no replacement sheet at the cut.
const launchPoint = projectDepth({x:540,y:1040,z:0},pressCamera(RELEASE_AT));
const launch = {...launchPoint,scale:launchPoint.scale*.85};

export const accountingPressState = (t: number) => {
  if (!Number.isFinite(t)) throw new Error('Proof time must be finite');
  const anticipation = progress(t, .15, .55);
  const feed = progress(t, .65, 2.25);
  const output = progress(t, 1.25, 2.55, release);
  const widen = progress(t, 3, 3.85, release);
  const camera = pressCamera(t);
  const angle = -55 - 18 * anticipation + 215 * feed;
  const radians = angle * Math.PI / 180;
  const crank = {x: 755 + 94 * Math.cos(radians), y: 1130 + 94 * Math.sin(radians), z: 0};
  const slip = depthPath(feed, [
    {x:490,y:500,z:85}, {x:450,y:450,z:115},
    {x:480,y:630,z:20}, {x:490,y:960,z:0},
  ]);
  const grip = 1-progress(t,2.25,RELEASE_AT,drive);
  const projectedCrank = projectDepth(crank,camera);
  const hand = {x:projectedCrank.x*grip+814.5*(1-grip),
    y:projectedCrank.y*grip+1250.5*(1-grip),scale:projectedCrank.scale};
  const flight = progress(t,RELEASE_AT,4.55,drive);
  const arc = depthPath(flight,[{x:launch.x,y:launch.y,z:0},
    {x:500,y:850,z:110},{x:650,y:570,z:85},{x:560,y:780,z:0}]);
  const projected = projectDepth(arc,{x:0,y:0,zoom:1});
  const printPoint = projectDepth({x:540,y:660+380*output,z:0},camera);
  const receipt = t<RELEASE_AT ? {...printPoint,scale:printPoint.scale*.85} :
    {...projected,scale:projected.scale*(launch.scale+(.95-launch.scale)*flight)};
  return {feed, output, widen, camera, crank:projectedCrank, angle, slip,
    hand, grip, flight, receipt, receiptAngle:-12*Math.sin(Math.PI*flight),
    resultArrival:progress(t,2.65,3.4,release), dock:progress(t,4.3,4.55),
    rollerDegrees:feed * 215,
    impact: Math.sin(clamp((t-2.25)/.22)*Math.PI) * (t>=2.25 && t<=2.47 ? 1 : 0)};
};
