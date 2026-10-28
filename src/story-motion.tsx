import React from 'react';
import narration from './proof-audio.json';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const playbackSpeed=1.1;
export const useStoryClock=()=>{const {fps}=useVideoConfig(); return {fps:fps/playbackSpeed};};
export const storyTiming={hook:Math.max(3.4,narration.hook_duration+0.4), bridge:0.6};
export const motionClamp={extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.cubic)} as const;

// Scenes retain global time: transition overlap never changes narration offsets.
export const StoryBeat:React.FC<{start:number; end?:number; children:React.ReactNode}>=({start,end,children})=>{
 const frame=useCurrentFrame(); const {fps}=useStoryClock(); const t=frame/fps;
 const enter=start===0?1:interpolate(t,[start,start+storyTiming.bridge],[0,1],motionClamp);
 const leave=end===undefined?0:interpolate(t,[end,end+storyTiming.bridge],[0,1],motionClamp);
 if(t<start || (end!==undefined && t>end+storyTiming.bridge)) return null;
 return <AbsoluteFill style={{translate:`${(1-enter)*1080-leave*1080}px 0px`}}>{children}</AbsoluteFill>;
};
