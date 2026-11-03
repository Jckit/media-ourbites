/** Shot-owned, deterministic paper motion. All positions and controls share one coordinate space. */
export type PaperPose = {at: number; x: number; y: number; angle: number};
export type PaperPoint = {x: number; y: number};
export type CubicTiming = readonly [number, number, number, number];
export type PaperFlightPlan = {
  poses: readonly PaperPose[];
  unfold: readonly [number, number];
  /** One continuous cubic flight; no unintended stop at intermediate keyframes. */
  travel?: {
    startAt: number;
    endAt: number;
    control1: PaperPoint;
    control2: PaperPoint;
    timing: CubicTiming;
  };
  /** The paper can unfold on a different acceleration curve from its travel. */
  unfoldTiming?: CubicTiming;
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const cubic = (a: number, b: number, c: number, d: number, u: number) => {
  const v = 1 - u;
  return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
};
export const paperProgress = (time: number, start: number, end: number) => {
  const p = clamp((time - start) / (end - start));
  return p * p * (3 - 2 * p);
};

/** CSS-like cubic-bezier time interpolation; independent of rendering dependencies for tests. */
export const paperBezierTiming = (progress: number, [x1, y1, x2, y2]: CubicTiming) => {
  const x = clamp(progress);
  if (x === 0 || x === 1) return x;
  let low = 0;
  let high = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    if (cubic(0, x1, x2, 1, mid) < x) low = mid;
    else high = mid;
  }
  return cubic(0, y1, y2, 1, (low + high) / 2);
};

/** Source, anticipation, continuous travel, contact; one transform owner. */
export const samplePaperFlight = (time: number, plan: PaperFlightPlan) => {
  const keys = plan.poses;
  if (keys.length < 2 || keys.some((k, i) => !Number.isFinite(k.at + k.x + k.y + k.angle) || (i > 0 && k.at <= keys[i - 1].at))) {
    throw new Error('Paper flight needs at least two finite, strictly ordered poses');
  }
  if (!Number.isFinite(plan.unfold[0] + plan.unfold[1]) || plan.unfold[1] <= plan.unfold[0]) {
    throw new Error('Invalid paper unfold interval');
  }
  const end = keys.findIndex(k => k.at > time);
  const b = keys[end < 0 ? keys.length - 1 : Math.max(1, end)];
  const a = keys[end < 0 ? keys.length - 2 : Math.max(0, end - 1)];
  const p = paperProgress(time, a.at, b.at);
  let x = mix(a.x, b.x, p);
  let y = mix(a.y, b.y, p);
  let angle = mix(a.angle, b.angle, p);
  let elevation = 0;
  if (plan.travel) {
    const {startAt, endAt, control1, control2, timing} = plan.travel;
    const from = keys.find(k => k.at === startAt);
    const to = keys.find(k => k.at === endAt);
    if (!from || !to || startAt >= endAt || ![control1.x, control1.y, control2.x, control2.y, ...timing].every(Number.isFinite) ||
      timing[0] < 0 || timing[0] > 1 || timing[2] < 0 || timing[2] > 1) {
      throw new Error('Invalid continuous paper-flight control points or timing');
    }
    if (time >= startAt && time <= endAt) {
      const u = paperBezierTiming((time - startAt) / (endAt - startAt), timing);
      x = cubic(from.x, control1.x, control2.x, to.x, u);
      y = cubic(from.y, control1.y, control2.y, to.y, u);
      angle = mix(from.angle, to.angle, u) + 3 * Math.sin(Math.PI * u);
      elevation = Math.sin(Math.PI * u);
    }
  }
  const openProgress = clamp((time - plan.unfold[0]) / (plan.unfold[1] - plan.unfold[0]));
  const open = plan.unfoldTiming ? paperBezierTiming(openProgress, plan.unfoldTiming) : paperProgress(time, ...plan.unfold);
  return {x, y, angle, open, elevation};
};
