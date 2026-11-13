/** Frame-addressable 2.5D paper hinge motion.
 * One face at a time: old amount + old label never separate.
 * Inputs are composition-local frames. No independent text crossfades.
 */
export type EvidenceFace='before'|'after';
export type EvidenceHingePhase='hold'|'fold-out'|'fold-in'|'settled';
export type EvidenceHingeState={
  face:EvidenceFace;
  phase:EvidenceHingePhase;
  angleDegrees:number;
  movement:number;
};
const clamp01=(n:number)=>Math.max(0,Math.min(1,n));
const smooth=(t:number)=>{
  const p=clamp01(t);
  return p*p*(3-2*p);
};
export const paperHingeState=(frame:number,startFrame:number,durationFrames:number):EvidenceHingeState=>{
  if(!Number.isFinite(frame)||!Number.isFinite(startFrame)||
     !Number.isFinite(durationFrames)||durationFrames<4){
    throw new Error('Paper hinge requires finite frames and duration >= 4');
  }
  const midpoint=startFrame+Math.floor(durationFrames/2);
  const endFrame=startFrame+durationFrames;
  if(frame<startFrame)return {face:'before',phase:'hold',angleDegrees:0,movement:0};
  if(frame<midpoint){
    const u=smooth((frame-startFrame)/(midpoint-startFrame));
    return {face:'before',phase:'fold-out',angleDegrees:-89*u,movement:u};
  }
  if(frame<endFrame){
    const u=smooth((frame-midpoint)/(endFrame-midpoint));
    return {face:'after',phase:'fold-in',angleDegrees:89*(1-u),movement:1-u};
  }
  return {face:'after',phase:'settled',angleDegrees:0,movement:0};
};
