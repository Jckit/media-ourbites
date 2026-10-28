import React from 'react';
import {interpolate} from 'remotion';
import {OurbitesHost, type HostPose} from './OurbitesHost';

export const tween=(t:number,start:number,end:number,a:number,b:number)=>interpolate(t,[start,end],[a,b],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

// Character and props share world coordinates; the camera moves them together.
export const CharacterStage:React.FC<{zoom?:number; focusX?:number; focusY?:number; children:React.ReactNode}>=({zoom=1,focusX=540,focusY=960,children})=><div style={{position:'absolute',inset:0,transformOrigin:`${focusX}px ${focusY}px`,transform:`scale(${zoom})`}}>{children}</div>;

export const StageActor:React.FC<{x:number;y:number;size?:number;lean?:number;pose:HostPose}>=({x,y,size=560,lean=0,pose})=><div style={{position:'absolute',left:x,top:y,width:size,transformOrigin:'50% 95%',transform:`rotate(${lean}deg)`}}><OurbitesHost pose={pose} width={size} height={size*520/360}/></div>;

export const FilingProp:React.FC<{x:number;y:number;angle?:number;children:React.ReactNode}>=({x,y,angle=0,children})=><div style={{position:'absolute',left:x,top:y,width:600,height:680,background:'#FFFEF8',border:'5px solid #142B38',borderRadius:12,boxShadow:'14px 18px 0 #D8D2C5',transform:`rotate(${angle}deg)`,padding:36,boxSizing:'border-box'}}>{children}</div>;
