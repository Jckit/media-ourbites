/** Shared geometry for the host-triggered comparison balance.
 * Everything is based on existing source-audio seconds and the actual host's
 * screen-space anchor. No financial values, visual claims or playback speed
 * are computed here.
 */
export type BalanceContactState={
  approach:number;
  press:number;
  beamAngle:number;
  handTarget:{x:number;y:number};
  contactScreen:{x:number;y:number};
  socketScreen:{x:number;y:number};
};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smooth=(x:number)=>{const a=clamp(x);return a*a*(3-2*a);};
const ramp=(t:number,start:number,end:number)=>smooth((t-start)/(end-start));
export const BALANCE_ACTOR_ANCHOR={x:65,y:1090,scale:278/360} as const;
export const BALANCE_NEUTRAL_TARGET={x:392,y:133} as const;
export const balanceContact=(sourceSeconds:number):BalanceContactState=>{
  const reach=ramp(sourceSeconds,7.45,8.02);
  const release=ramp(sourceSeconds,10.2,10.8);
  const approach=reach*(1-release);
  const press=ramp(sourceSeconds,8.05,8.32)*(1-release);
  const handTarget={
    x:BALANCE_NEUTRAL_TARGET.x+21*press,
    y:BALANCE_NEUTRAL_TARGET.y,
  };
  const contactScreen={
    x:BALANCE_ACTOR_ANCHOR.x+handTarget.x*BALANCE_ACTOR_ANCHOR.scale,
    y:BALANCE_ACTOR_ANCHOR.y+handTarget.y*BALANCE_ACTOR_ANCHOR.scale,
  };
  // The socket edge rests just behind the fingertip. A small navy rail
  // connects directly to the scale's existing base geometry.
  const socketScreen={
    x:BALANCE_ACTOR_ANCHOR.x+BALANCE_NEUTRAL_TARGET.x*BALANCE_ACTOR_ANCHOR.scale,
    y:BALANCE_ACTOR_ANCHOR.y+BALANCE_NEUTRAL_TARGET.y*BALANCE_ACTOR_ANCHOR.scale,
  };
  // Contact causes a controlled tip followed by a short settle; the
  // comparison remains legible after the actor lets go.
  const beamAngle=-8*ramp(sourceSeconds,8.10,8.59)+5.2*ramp(sourceSeconds,9.18,10.05);
  return {approach,press,beamAngle,handTarget,contactScreen,socketScreen};
};
