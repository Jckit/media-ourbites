import React from 'react';

export type EnvironmentPreset = 'office' | 'storefront';

export const scenePalette = {
  paper: '#F4F0E6', ink: '#142B38', teal: '#087E83', orange: '#E97F48',
  wall: '#E9E4D9', floor: '#D8CDBB', sky: '#D8E7E7',
  surface: {front: '#C6B59C', top: '#E4D8C4', side: '#AC997F'},
  parcel: {front: '#E6B577', top: '#F3D4A5', side: '#BE8B52'},
} as const;

// World-space anchors for 1080×1920. Caption/identity text stays outside the camera.
export const sceneLayout = {
  width: 1080, height: 1920, floorY: 1420, labelY: 1480, captionY: 1620,
  actorX: 90, actorSize: 430,
  // OurbitesHost's feet land at SVG y=475 in its 360-unit-wide viewBox.
  actorY: 1420 - 475 * 430 / 360,
} as const;

type PlaneColors = {front: string; top: string; side: string};

/** Flat-shaded geometry; all depth extends up and right. Use inside an SVG. */
export const PlanarBox: React.FC<{
  x: number; y: number; width: number; height: number; depth?: number;
  colors?: PlaneColors;
}> = ({x, y, width, height, depth = 28, colors = scenePalette.surface}) => (
  <g>
    <path d={`M${x} ${y} l${depth} ${-depth} h${width} l${-depth} ${depth}Z`} fill={colors.top}/>
    <path d={`M${x + width} ${y} l${depth} ${-depth} v${height} l${-depth} ${depth}Z`} fill={colors.side}/>
    <rect x={x} y={y} width={width} height={height} fill={colors.front}/>
  </g>
);

/** A quiet setting only: no episode facts, embedded timing, camera or character. */
export const SceneEnvironment: React.FC<{preset: EnvironmentPreset}> = ({preset}) => (
  <svg viewBox="0 0 1080 1920" width={1080} height={1920} aria-label={`Illustrative ${preset} setting`}
    role="img" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
    <rect width={1080} height={1920} fill={scenePalette.paper}/>
    <path d="M0 370 H1080 V1420 H0Z" fill={scenePalette.wall}/>
    <path d="M0 370 H76 V1420 H0Z" fill="#DDD5C7"/>
    <rect y={sceneLayout.floorY} width={1080} height={500} fill={scenePalette.floor}/>
    <path d="M0 1420 H1080" stroke="#B7AA96" strokeWidth={5}/>
    {preset === 'office' ? <g>
      <PlanarBox x={630} y={430} width={300} height={400} depth={22}
        colors={{front: '#B0C1BE', top: '#D7DFD6', side: '#8EAAA7'}}/>
      <rect x={649} y={448} width={262} height={362} fill={scenePalette.sky}/>
      <path d="M649 810 V724 H690 V650 H748 V704 H804 V616 H864 V730 H911 V810Z" fill="#A9BFBD"/>
      <path d="M804 616 L824 635 V810 H804Z M690 650 L710 669 V810 H690Z" fill="#91AEAC"/>
      <path d="M780 448 V810 M649 620 H911" stroke="#C6D0C6" strokeWidth={12}/>
      <PlanarBox x={580} y={1210} width={360} height={38}/>
      <path d="M604 1248 V1420 M908 1248 V1420" stroke="#AC997F" strokeWidth={22}/>
      <PlanarBox x={835} y={1164} width={65} height={44} depth={12}
        colors={{front: '#B1C9BD', top: '#D8E4D8', side: '#8BAA9A'}}/>
    </g> : <g>
      <PlanarBox x={590} y={430} width={350} height={400} depth={22}
        colors={{front: '#C6D6CB', top: '#E1E7DB', side: '#A2BAAD'}}/>
      <rect x={610} y={452} width={310} height={356} fill={scenePalette.sky}/>
      <path d="M610 715 L687 638 L751 715 L827 631 L920 715 V808 H610Z" fill="#ACC2BC"/>
      <path d="M590 430 H940 L970 508 H560Z" fill="#92B4AA"/>
      <path d="M613 430 H660 L643 508 H590Z M713 430 H760 V508 H705Z M813 430 H860 L883 508 H829Z" fill="#C6D6CB"/>
      <PlanarBox x={580} y={1210} width={360} height={210}/>
      <path d="M610 1250 H905" stroke="#B09E84" strokeWidth={4}/>
    </g>}
    <ellipse cx={305} cy={1425} rx={123} ry={13} fill={scenePalette.ink} opacity={0.08}/>
  </svg>
);
