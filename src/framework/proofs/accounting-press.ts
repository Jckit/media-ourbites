import {Easing} from 'remotion';
import {depthPath, projectDepth} from '../motion/depth-motion';

// Candidate choreography, not an accepted library recipe. Time is local playback seconds.
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const drive = Easing.bezier(.42, 0, .18, 1);
const release = Easing.bezier(.16, .8, .24, 1);
const progress = (t: number, start: number, end: number, curve = drive) =>
  curve(clamp((t - start) / (end - start)));

export const accountingPressState = (t: number) => {
  if (!Number.isFinite(t)) throw new Error('Proof time must be finite');
  const anticipation = progress(t, .15, .55);
  const feed = progress(t, .65, 2.25);
  const output = progress(t, 1.45, 3.15, release);
  const widen = progress(t, 3.25, 4.55, release);
  const push = progress(t, .15, 1.4);
  const camera = {x: 15 * push - 15 * widen, y: -30 * push + 30 * widen,
    zoom: 1 + .10 * push - .10 * widen};
  const angle = -55 - 18 * anticipation + 215 * feed;
  const radians = angle * Math.PI / 180;
  const crank = {x: 755 + 94 * Math.cos(radians), y: 1130 + 94 * Math.sin(radians), z: 0};
  const slip = depthPath(feed, [
    {x:490,y:500,z:85}, {x:450,y:450,z:115},
    {x:480,y:630,z:20}, {x:490,y:960,z:0},
  ]);
  return {feed, output, widen, camera, crank:projectDepth(crank,camera), angle, slip,
    hand:projectDepth(crank,camera), rollerDegrees:feed * 215,
    impact: Math.sin(clamp((t-2.25)/.22)*Math.PI) * (t>=2.25 && t<=2.47 ? 1 : 0)};
};
