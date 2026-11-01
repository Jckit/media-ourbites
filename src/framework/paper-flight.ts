export type PaperPose = {at: number; x: number; y: number; angle: number};
export type PaperFlightPlan = {
  poses: readonly PaperPose[];
  unfold: readonly [number, number];
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const paperProgress = (time: number, start: number, end: number) => {
  const p = clamp((time-start)/(end-start));
  return p*p*(3-2*p);
};

/** Small authored world-space trajectory. Content and timing belong to the shot.
 * Each segment stops at its keyed pose; no hidden spring or global camera. */
export const samplePaperFlight = (time: number, plan: PaperFlightPlan) => {
  const keys=plan.poses;
  if (keys.length<2 || keys.some((k,i)=>i>0 && k.at<=keys[i-1].at)) {
    throw new Error('Paper flight needs at least two strictly ordered poses');
  }
  if (plan.unfold[1]<=plan.unfold[0]) throw new Error('Invalid paper unfold interval');
  const end=keys.findIndex(k=>k.at>time);
  const b=keys[end<0?keys.length-1:Math.max(1,end)];
  const a=keys[end<0?keys.length-2:Math.max(0,end-1)];
  const p=paperProgress(time,a.at,b.at);
  return {x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p,
    angle:a.angle+(b.angle-a.angle)*p,
    open:paperProgress(time,...plan.unfold)};
};
