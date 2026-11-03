import React from 'react';
import {Img,staticFile} from 'remotion';
/** Supplied grid is a separate rear plane; travel is shot-owned, deterministic 0..1. */
export const EditorialGrid:React.FC<{tone:'amber'|'teal'|'violet';travel:number;dark?:boolean}>=({tone,travel,dark=false})=>{
 const p=Math.max(0,Math.min(1,travel));
 return <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',
  background:dark?'#231C19':tone==='violet'?'#F3EDF9':'#EAF5EF'}}>
  <Img src={staticFile(`ourbites-grids/${tone}.png`)} style={{position:'absolute',left:-70,top:-100,width:1220,height:2169,
   opacity:dark?.58:.45,transformOrigin:'50% 58%',
   transform:`translate(${-36*p}px, ${28*p}px) perspective(1800px) rotateY(${-5+7*p}deg) scale(${1+.035*p})`}}/>
  <div style={{position:'absolute',inset:0,background:dark?
   'linear-gradient(transparent 60%,#231C1970 100%)':'linear-gradient(transparent 57%,#FBFAF5C0 83%)'}}/>
 </div>;
};
