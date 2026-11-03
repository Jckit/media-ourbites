/** Composition-pixel 2.5D helpers. Positive z is nearer; sibling order owns occlusion. */
export type DepthPoint={x:number;y:number;z:number};
export type DepthCamera={x:number;y:number;zoom:number;focalLength?:number};
export const depthPlanes={background:-100,midground:0,foreground:90} as const;
const finite=(a:number[])=>{if(!a.every(Number.isFinite))throw new Error('Depth values must be finite');};
/** Spatial cubic; caller supplies independent time-eased progress. */
export const depthPath=(progress:number,points:readonly [DepthPoint,DepthPoint,DepthPoint,DepthPoint]):DepthPoint=>{
 finite([progress,...points.flatMap(p=>[p.x,p.y,p.z])]);
 const u=Math.max(0,Math.min(1,progress)),v=1-u;
 const at=(k:keyof DepthPoint)=>v*v*v*points[0][k]+3*v*v*u*points[1][k]+3*v*u*u*points[2][k]+u*u*u*points[3][k];
 return {x:at('x'),y:at('y'),z:at('z')};
};
export const projectDepth=(p:DepthPoint,c:DepthCamera,o={x:540,y:800})=>{
 const f=c.focalLength??1600;
 finite([p.x,p.y,p.z,c.x,c.y,c.zoom,f,o.x,o.y]);
 if(f<=0||c.zoom<=0||p.z>=f*.75)throw new Error('Unsafe depth projection');
 const scale=c.zoom*f/(f-p.z);
 return {x:o.x+(p.x-o.x-c.x)*scale,y:o.y+(p.y-o.y-c.y)*scale,scale};
};
export const contactShadow=(elevation:number)=>{
 finite([elevation]);const h=Math.max(0,Math.min(1,elevation));
 return {offset:3+20*h,blur:3+16*h,opacity:.28-.12*h};
};
export const depthPlaneTransform=(z:number,c:DepthCamera,o={x:540,y:800})=>{
 const p=projectDepth({...o,z},c,o);
 return `translate(${p.x-o.x}px, ${p.y-o.y}px) scale(${p.scale})`;
};
