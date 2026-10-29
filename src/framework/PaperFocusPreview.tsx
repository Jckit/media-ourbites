import React from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {StageActor} from '../CharacterStage';
import {playbackSpeed} from '../story-motion';
import {DocumentFocus,type DocumentFocusProps} from './DocumentFocus';
import {scenePalette} from './scene-kit';

// Synthetic editorial examples, never real-company statements or scanned evidence.
const examples:Record<'filing'|'receipt',Omit<DocumentFocusProps,'time'>>={
  filing:{
    document:{x:120,y:350,width:840,height:660},
    target:{x:35,y:350,width:770,height:92},
    destination:{x:95,y:440,width:890,height:230},
    heading:'ILLUSTRATIVE FILING',
    lines:['Income statement','Reported result','See the accounting notes'],
    excerpt:'Reported loss ≠ cash spent',
    timing:{focusStart:0.8,focusEnd:2.1,extractStart:3.2,extractEnd:4.6},
  },
  receipt:{
    document:{x:290,y:320,width:500,height:790},
    target:{x:30,y:460,width:440,height:100},
    destination:{x:150,y:510,width:780,height:200},
    heading:'ILLUSTRATIVE RECEIPT',
    lines:['Goods       100','Delivery      8','Total       108','Example amounts'],
    excerpt:'Delivery adds 8',
    timing:{focusStart:1.2,focusEnd:2.7,extractStart:4,extractEnd:5.4},
  },
};

export const PaperFocusPreview:React.FC<{variant:'filing'|'receipt'}>=({variant})=>{
  const {fps}=useVideoConfig();
  const t=useCurrentFrame()/fps*playbackSpeed;
  const spec=examples[variant];
  const extracted=t>=spec.timing.extractEnd;
  return <AbsoluteFill style={{background:scenePalette.paper,color:scenePalette.ink,fontFamily:'Arial, sans-serif'}}>
    <div style={{position:'absolute',left:80,top:90,fontSize:36,fontWeight:800}}>OURBITES · MOTION STUDY</div>
    <div style={{position:'absolute',left:80,right:80,top:165,fontSize:66,fontWeight:800}}>
      {variant==='filing'?'Read the accounting note.':'Look beyond the price.'}
    </div>
    <DocumentFocus {...spec} time={t}/>
    <StageActor x={120} y={1040} size={300} pose={t<spec.timing.focusEnd?'think':'explain'}
      gazeX={4} gazeY={-3}/>
    <div style={{position:'absolute',left:470,right:90,top:1190,fontSize:40,lineHeight:1.3}}>
      {extracted ? (variant==='filing'?'A reported result is not a cash bill.':'The total includes delivery.'):'Follow the highlighted row.'}
    </div>
    <div style={{position:'absolute',left:80,right:80,top:1570,fontSize:36,fontWeight:700,textAlign:'center'}}>
      SYNTHETIC EXAMPLE · SILENT
    </div>
    <div style={{position:'absolute',left:80,right:80,top:1690,fontSize:28,textAlign:'center',color:'#607078'}}>
      Original illustration · framework review only
    </div>
  </AbsoluteFill>;
};
