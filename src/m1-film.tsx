import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {M1AnthropicFilm} from './M1AnthropicFilm';

const Root: React.FC = () => <Composition
  id="M1PressLedgerReview" component={M1AnthropicFilm}
  width={1080} height={1920} fps={30} durationInFrames={300}/>;

registerRoot(Root);
