import {strict as assert} from 'node:assert';
import {wordOpacity,isSpokenNow,currentCaptionLine,validateWordCaptionTrack} from '../src/framework/captions/word-captions.ts';
const words=[
 {text:'Dario',startSourceSeconds:0,endSourceSeconds:0.32,lineId:'first',semantic:'person'},
 {text:'explains',startSourceSeconds:0.33,endSourceSeconds:0.75,lineId:'first'},
 {text:'Anthropic.',startSourceSeconds:0.77,endSourceSeconds:1.3,lineId:'first',semantic:'company'},
 {text:'And',startSourceSeconds:1.8,endSourceSeconds:2.02,lineId:'second'},
 {text:'why.',startSourceSeconds:2.05,endSourceSeconds:2.6,lineId:'second',semantic:'emphasis'},
];
const track={timingBasis:'measured-word-alignment',sourceAudioDurationSeconds:3,words};
assert(validateWordCaptionTrack(track));
assert.equal(wordOpacity(words[1],0.20),0);
assert.equal(wordOpacity(words[1],0.33),0);
assert(wordOpacity(words[1],0.39)>0&&wordOpacity(words[1],0.39)<1);
assert.equal(wordOpacity(words[1],0.50),1);
assert(isSpokenNow(words[0],0.1));
assert(!isSpokenNow(words[0],0.40));
assert.equal(currentCaptionLine(words,-0.01),null);
assert.equal(currentCaptionLine(words,0.8)?.length,3);
assert.equal(currentCaptionLine(words,1.43),null);
assert.equal(currentCaptionLine(words,1.9)?.[0].text,'And');
assert.equal(currentCaptionLine(words,2.9),null);
assert.throws(()=>validateWordCaptionTrack({...track,timingBasis:'estimated-phrase'}));
assert.throws(()=>validateWordCaptionTrack({...track,words:[...words].reverse()}));
assert.throws(()=>validateWordCaptionTrack({...track,words:words.map(w=>({...w,startSourceSeconds:-1}))}));
assert.throws(()=>validateWordCaptionTrack({...track,words:[{...words[0],semantic:'company',logoAsset:'logos/company.png'},...words.slice(1)]}));
assert.throws(()=>validateWordCaptionTrack({...track,words:[{...words[0],semantic:'company',logoAsset:'https://example.com/logo.png',logoApproved:true},...words.slice(1)]}));
assert(validateWordCaptionTrack({...track,words:[{...words[0],semantic:'company',logoAsset:'verified-assets/brand.png',logoApproved:true},...words.slice(1)]}));
console.log('PASS: per-word fade/activation, stable line layout, source timing, semantic media gate');
