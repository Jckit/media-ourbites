/** Controlled art-direction variation for background details, never financial data or cue times. */
export const seededUnit = (seed: string, elementId: string, channel='default') => {
  const label = seed+'|'+elementId+'|'+channel;
  let hash = 2166136261 >>> 0; // 32-bit FNV-1a, deterministic in Node/browser
  for (let i=0;i<label.length;i++) {
    hash ^= label.charCodeAt(i);
    hash = Math.imul(hash,16777619) >>> 0;
  }
  // High-quality integer avalanche (no Math.random / wall-clock dependence)
  hash ^= hash>>>16;hash=Math.imul(hash,0x7feb352d)>>>0;
  hash ^= hash>>>15;hash=Math.imul(hash,0x846ca68b)>>>0;
  hash ^= hash>>>16;
  return (hash>>>0)/4294967296;
};
export const seededRange=(seed:string,elementId:string,min:number,max:number,channel='default')=>{
  if (!Number.isFinite(min+max)||max<min) throw new Error('Invalid seeded range');
  return min+(max-min)*seededUnit(seed,elementId,channel);
};
