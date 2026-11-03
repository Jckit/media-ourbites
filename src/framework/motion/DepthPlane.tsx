import React from 'react';
import {depthPlaneTransform,type DepthCamera} from './depth-motion';
/** Single camera owner per layer. Host, captions and caveats remain outside. */
export const DepthPlane:React.FC<React.PropsWithChildren<{
 camera:DepthCamera;z?:number;tiltX?:number;tiltY?:number;angle?:number;
 origin?:{x:number;y:number};order?:number;
}>>=({camera,z=0,tiltX=0,tiltY=0,angle=0,origin={x:540,y:800},order=0,children})=><div
 style={{position:'absolute',inset:0,zIndex:order,transformOrigin:`${origin.x}px ${origin.y}px`,
 transform:`${depthPlaneTransform(z,camera,origin)} perspective(1600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${angle}deg)`}}>
 {children}
</div>;
