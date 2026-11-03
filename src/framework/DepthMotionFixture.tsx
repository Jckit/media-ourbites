import React from 'react';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {DepthPlane} from './motion/DepthPlane';
import {depthPath,projectDepth,contactShadow,depthPlanes} from './motion/depth-motion';
/** Silent synthetic parcel-to-shelf fixture; no company/data claim. */
export const DepthMotionFixture:React.FC=()=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),t=f/fps;
 const u=interpolate(t,[.4,2.7],[0,1],{easing:Easing.bezier(.3,0,.25,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const camera={x:24*u,y:-8*u,zoom:1+.025*u};
 const p=depthPath(u,[{x:190,y:982,z:-100},{x:250,y:470,z:170},{x:720,y:540,z:150},{x:780,y:965,z:0}]);
 const ground=projectDepth({x:p.x,y:1050,z:90},camera);
 const q=projectDepth(p,camera);const h=Math.sin(Math.PI*u);const shadow=contactShadow(h);
 return <AbsoluteFill style={{background:'#FBFAF5',fontFamily:'Arial',color:'#142B38'}}>
  <div style={{position:'absolute',left:80,top:160,fontSize:70,fontWeight:900}}>Lift. Travel. Contact.</div>
  <DepthPlane camera={camera} z={depthPlanes.background}>
   <div style={{position:'absolute',left:100,top:540,width:880,height:610,border:'7px solid #CBDCD6'}}/>
  </DepthPlane>
  <div style={{position:'absolute',left:q.x-90,top:ground.y-8,width:180,height:20,borderRadius:'50%',background:'#142B38',opacity:shadow.opacity,filter:`blur(${shadow.blur}px)`}}/>
  <div style={{position:'absolute',left:q.x-90,top:q.y-100,width:180,height:200,background:'#D8503D',transform:`scale(${q.scale}) rotate(${12*Math.sin(Math.PI*u)}deg)`,boxShadow:`5px ${shadow.offset}px ${shadow.blur}px #142B3830`}}>
   <div style={{marginLeft:75,width:30,height:200,background:'#F3D3A8'}}/>
  </div>
  <DepthPlane camera={camera} z={depthPlanes.foreground} order={2}>
   <div style={{position:'absolute',left:80,top:1050,width:920,height:35,background:'#087E83'}}/>
  </DepthPlane>
  <div style={{position:'absolute',left:80,top:1500,fontSize:30}}>SYNTHETIC DEPTH FIXTURE · NO FACTUAL CLAIM</div>
 </AbsoluteFill>;
};
