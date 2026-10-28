import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CharacterStage, StageActor} from '../CharacterStage';
import {EnvironmentPreset, PlanarBox, SceneEnvironment, sceneLayout, scenePalette} from './scene-kit';

export type FrameworkPreviewProps = {environment: EnvironmentPreset};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const ParcelBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps * 1.1;
  return <svg viewBox="0 0 1080 1920" width={1080} height={1920}
    style={{position: 'absolute', inset: 0}} aria-label="Illustrative order parcel">
    <g transform={`translate(${interpolate(t, [1.8, 3.1], [65, 0], clamp)} 0)`}>
      <PlanarBox x={590} y={985} width={250} height={220} depth={38} colors={scenePalette.parcel}/>
      <path d="M696 985 L734 947 H774 L736 985 V1205 H696Z" fill="#F4DFC1"/>
      <rect x={614} y={1030} width={202} height={92} rx={5} fill="#FFFEF8"/>
      <text x={715} y={1091} textAnchor="middle" fill={scenePalette.ink} fontSize={43} fontWeight={800}>
        {t < 3.1 ? 'ORDER' : 'READY'}
      </text>
    </g>
  </svg>;
};

const PreviewStage: React.FC<FrameworkPreviewProps> = ({environment}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps * 1.1;
  return <CharacterStage zoom={interpolate(t, [5, 7.5], [1, 1.045], clamp)} focusX={540} focusY={1420}>
    <SceneEnvironment preset={environment}/>
    <ParcelBeat/>
    <StageActor x={sceneLayout.actorX} y={sceneLayout.actorY} size={sceneLayout.actorSize}
      pose={t < 1.8 ? 'neutral' : t < 5 ? 'point' : 'explain'} gazeX={t < 1.8 ? 0 : 5}/>
  </CharacterStage>;
};

const PreviewCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ready = frame / fps * 1.1 >= 3.1;
  return <div style={{position: 'absolute', top: sceneLayout.captionY, left: 80, right: 80,
    fontSize: 62, fontWeight: 750, lineHeight: 1.2, textAlign: 'center'}}>
    {ready ? 'The order is ready.' : 'A simple order.'}
  </div>;
};

/** Same synthetic action in two settings; intentionally silent, not an episode. */
export const FrameworkPreview: React.FC<FrameworkPreviewProps> = ({environment}) => (
  <AbsoluteFill style={{background: scenePalette.paper, color: scenePalette.ink, fontFamily: 'Arial, sans-serif'}}>
    <PreviewStage environment={environment}/>
    <div style={{position: 'absolute', top: 112, left: 80, fontSize: 38, fontWeight: 800, letterSpacing: 3}}>OURBITES</div>
    <div style={{position: 'absolute', top: 184, left: 80, fontSize: 84, fontWeight: 850}}>
      {environment === 'office' ? 'At the office.' : 'At the shop.'}
    </div>
    <div style={{position: 'absolute', top: sceneLayout.labelY, left: 80, right: 80, fontSize: 36,
      textAlign: 'center', fontWeight: 700}}>ILLUSTRATIVE STYLE TEST · SILENT</div>
    <PreviewCaption/>
  </AbsoluteFill>
);
