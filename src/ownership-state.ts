export type OwnershipScenario = {initial:number; owned:number; issued:number; unit:number; start:number; end:number};
export const primaryScenario:OwnershipScenario={initial:100,owned:10,issued:25,unit:5,start:2.62,end:4.9};
export const secondScenario:OwnershipScenario={initial:50,owned:15,issued:25,unit:5,start:2.62,end:4.9};

// Issuance is discrete: a tile and its associated totals become visible together.
export function ownershipState(s:OwnershipScenario,frame:number,fps:number){
  if (![s.initial,s.owned,s.issued,s.unit,s.start,s.end,frame,fps].every(Number.isFinite) || fps<=0 || s.unit<=0 || s.initial<=0 || s.owned<0 || s.owned>s.initial || s.issued<0 || s.end<=s.start || [s.initial,s.owned,s.issued].some(n=>n%s.unit!==0) || (s.initial+s.issued)/s.unit>25) throw new Error('Invalid ownership scenario or unsupported tile count');
  const progress=Math.max(0,Math.min(1,(frame/fps-s.start)/(s.end-s.start)));
  const added=Math.floor(progress*(s.issued/s.unit))*s.unit;
  const total=s.initial+added;
  return {added,total,percent:s.owned/total*100};
}
