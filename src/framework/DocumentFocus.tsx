import React from 'react';
import {Easing, interpolate} from 'remotion';
import {scenePalette} from './scene-kit';

export type FocusRect = {x:number; y:number; width:number; height:number};
export type FocusTiming = {focusStart:number; focusEnd:number; extractStart:number; extractEnd:number};
export type DocumentFocusProps = {
  time:number;
  timing:FocusTiming;
  document:FocusRect;
  target:FocusRect;
  destination:FocusRect;
  heading:string;
  lines:string[];
  excerpt:string;
};
const ease = Easing.inOut(Easing.cubic);
const progress = (time:number, start:number, end:number) =>
  interpolate(time,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
const mix = (a:number,b:number,p:number) => a+(b-a)*p;

/** Caller owns content and source-second timing; target is local to the document. */
export const DocumentFocus:React.FC<DocumentFocusProps> = ({
  time,timing,document:doc,target,destination,heading,lines,excerpt,
}) => {
  if (!(timing.focusStart < timing.focusEnd && timing.focusEnd <= timing.extractStart &&
    timing.extractStart < timing.extractEnd)) throw new Error('Focus/extraction timing must be ordered');
  if (target.x<0 || target.y<0 || target.width<=0 || target.height<=0 ||
    target.x+target.width>doc.width || target.y+target.height>doc.height) {
    throw new Error('Focus target must be contained within its document');
  }
  const focus=progress(time,timing.focusStart,timing.focusEnd);
  const extract=progress(time,timing.extractStart,timing.extractEnd);
  const source={...target,x:doc.x+target.x,y:doc.y+target.y};
  const card={
    x:mix(source.x,destination.x,extract), y:mix(source.y,destination.y,extract),
    width:mix(source.width,destination.width,extract), height:mix(source.height,destination.height,extract),
  };
  const lensX=mix(doc.x+doc.width-30,source.x+source.width/2,focus);
  const lensY=mix(doc.y-45,source.y+source.height/2,focus);
  return <svg width={1080} height={1920} viewBox="0 0 1080 1920"
    style={{position:'absolute',inset:0}} aria-label="Illustrative document focus and excerpt">
    <g opacity={1-extract*0.65}>
      <rect x={doc.x+12} y={doc.y+16} width={doc.width} height={doc.height} rx={8} fill="#CFC4AE"/>
      <rect x={doc.x} y={doc.y} width={doc.width} height={doc.height} rx={8} fill="#FFFEF8" stroke="#D6CDBC" strokeWidth={3}/>
      <text x={doc.x+30} y={doc.y+65} fontSize={35} fontWeight={800} fill={scenePalette.ink}>{heading}</text>
      {lines.map((line,i)=><text key={i} x={doc.x+30} y={doc.y+132+i*57}
        fontSize={29} fill="#607078">{line}</text>)}
      <path d={`M${source.x} ${source.y+target.height+14} h${target.width}`} stroke="#D6CDBC" strokeWidth={3}/>
    </g>
    {/* One element owns the target from row through excerpt, avoiding a handoff jump. */}
    <rect x={card.x+extract*10} y={card.y+extract*12} width={card.width} height={card.height}
      rx={8} fill="#CFC4AE" opacity={extract}/>
    <rect x={card.x} y={card.y} width={card.width} height={card.height} rx={8}
      fill="#FFF1CF" stroke={scenePalette.teal} strokeWidth={2+focus*3}/>
    <text x={card.x+card.width/2} y={card.y+card.height/2}
      dominantBaseline="central" textAnchor="middle" fill={scenePalette.ink}
      fontWeight={800} fontSize={mix(32,48,extract)}>{excerpt}</text>
    <g opacity={focus*(1-extract)}>
      <ellipse cx={lensX} cy={lensY} rx={mix(76,target.width/2+18,focus)}
        ry={mix(76,target.height/2+20,focus)} fill="none" stroke={scenePalette.teal} strokeWidth={6}/>
      <path d={`M${lensX+mix(54,target.width/2+14,focus)} ${lensY+25} l30 40`}
        stroke={scenePalette.ink} strokeWidth={12} strokeLinecap="round"/>
    </g>
  </svg>;
};
