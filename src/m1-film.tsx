import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {M1AnthropicFilm, M1PressLedgerScene} from './M1AnthropicFilm';

const Root: React.FC = () => <>
  <Composition id="M1PressLedgerReview" component={M1PressLedgerScene}
    width={1080} height={1920} fps={30} durationInFrames={300}/>
  <Composition id="M1FullFilmReview" component={M1AnthropicFilm}
    width={1080} height={1920} fps={30} durationInFrames={1011}
    defaultProps={{audioSrc: null, cues: [0,4.9,8.9,14.9,20.3,26.6,33.7]}}/>
</>;

registerRoot(Root);
