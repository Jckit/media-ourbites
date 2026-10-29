import React from 'react';
import {interpolate} from 'remotion';
import {RoomShell} from './framework/scene-kit';

/**
 * Original flat 2D environment for explanatory business scenes.
 * The visible world has surfaces, depth and one causal reaction to the filing.
 * Not historic Anthropic footage or a reconstruction of a real office.
 * All timing is driven by the existing narration timeline in source seconds.
 */
export const OfficeWorld: React.FC<{t: number}> = ({t}) => {
  const ink = '#142B38';
  const teal = '#087E83';
  const orange = '#E97F48';
  // Same moment as the S-1's drop/recoil: nearby loose pages lift, then settle.
  const impactRise = interpolate(t, [0.72, 0.86], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const impactFall = interpolate(t, [0.87, 1.35], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const impact = Math.max(0, Math.min(impactRise, impactFall));
  const sheetFlight = interpolate(t, [0.82, 1.72], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const sheetVisible = interpolate(t, [0.72, 0.84], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }) * (1 - interpolate(t, [1.65, 1.95], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  const sheetArc = Math.sin(Math.PI * sheetFlight) * 72;
  const drift = interpolate(t, [0, 18.3], [0, -100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <svg
      viewBox="0 0 1080 1920"
      width="1080"
      height="1920"
      role="img"
      aria-label="Illustrated office interior with window, desk, papers and city"
      style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
    >
      <defs>
        <clipPath id="ourbites-office-window">
          <rect x="746" y="336" width="288" height="440" rx="5"/>
        </clipPath>
      </defs>

      {/* Shared approved room shell is behind the bespoke episode scenery.
          Keep the production's original heavy floor horizon; only the recessed
          wall planes are newly visible. Actors, captions and timing stay above it. */}
      <RoomShell floorLineColor={ink} floorLineWidth={10}/>
      {/* Production-specific architectural accents and props stay unchanged. */}
      <path d="M0 345 L1080 345 M0 905 L1080 905" stroke="#E4DBCD" strokeWidth="4"/>

      {/* Window with restrained moving sky; same native 2D world, no stock B-roll. */}
      <rect x="731" y="321" width="318" height="470" rx="12" fill="#E5E9E5" stroke={ink} strokeWidth="9"/>
      <g clipPath="url(#ourbites-office-window)">
        <rect x="746" y="336" width="288" height="440" fill="#D8E7E7"/>
        <g opacity="0.74" transform={'translate(' + drift + ' 0)'}>
          <path d="M770 446 Q791 419 822 434 Q847 399 875 422 Q915 406 924 441
            Q953 454 929 470 L793 471 Q762 468 770 446Z" fill="#FAF8F0"/>
          <path d="M993 520 Q1013 493 1040 503 Q1061 478 1087 503 Q1121 500 1134 527
            Q1150 551 1121 559 H1016 Q984 554 993 520Z" fill="#FAF8F0" opacity="0.62"/>
        </g>
        <path d="M738 696 V776 H1048 V706 L1014 681 L988 688 V635 L958 635
                 V693 L934 683 V666 L903 666 V708 L882 688 V613 L856 613
                 V699 L837 688 V646 H803 V706 L780 697 V673Z" fill="#A3B9BA"/>
        {/* Two low-poly-inspired skyline facets add readable depth without changing our flat 2D character style. */}
        <path d="M856 613 L869 628 V702 L856 699Z" fill="#86A8A8" opacity="0.7"/>
        <path d="M958 635 L973 644 V693 L958 692Z" fill="#84A4A3" opacity="0.7"/>
        <path d="M746 737 H1044 V786 H746" fill="#B3C6C6" opacity="0.6"/>
      </g>
      <path d="M889 336 V778 M747 558 H1034" stroke={ink} strokeWidth="7"/>
      <rect x="731" y="775" width="318" height="23" rx="4" fill="#C5B7A2" stroke={ink} strokeWidth="5"/>

      {/* Small graphic notice-board: context, not a second text panel. */}
      <rect x="54" y="382" width="166" height="309" rx="10" fill="#E8DDD0" stroke="#B1A38F" strokeWidth="7"/>
      <rect x="83" y="428" width="102" height="112" rx="4" fill="#FFFEF8"
        stroke="#D3C6B3" strokeWidth="3"/>
      <path d="M104 465 H166 M104 481 H159 M104 500 H147" stroke="#B6C4BD" strokeWidth="6"
        strokeLinecap="round"/>
      <rect x="112" y="573" width="66" height="78" rx="5" fill="#D7E5E1"/>
      <path d="M123 600 H164 M123 619 H154" stroke={teal} strokeWidth="5" strokeLinecap="round"/>

      {/* Recess the credenza/desk behind the characters: tabletop above their shoes,
          legs finish well before the identity label at y=1468, even during zoom. */}
      <g transform="translate(-25 -175)">
        <rect x="467" y="1215" width="425" height="181" rx="15" fill="#DCD2C1"/>
        {/* Subtle planar shading: low-poly inspiration applied to scenery, never the host's face. */}
        <path d="M862 1217 H890 V1394 H862Z" fill="#C7B9A5" opacity="0.50"/>
        <path d="M469 1218 H490 L476 1394 H469Z" fill="#EEE6D8" opacity="0.65"/>
      <path d="M486 1277 H870 M486 1321 H870" stroke="#B8AA96" strokeWidth="5"/>
      <rect x="480" y="1387" width="432" height="42" rx="10" fill="#B7A68E" stroke={ink} strokeWidth="6"/>
      <path d="M485 1389 H906 L892 1403 H499Z" fill="#E1D5C4" opacity="0.67"/>
      <rect x="507" y="1424" width="28" height="72" fill="#A8967D"/>
      <rect x="855" y="1424" width="28" height="72" fill="#A8967D"/>

      {/* Actual objects on the surface. The nearby documents visibly react to impact. */}
      <g transform={'translate(' + (-impact * 14) + ' ' + (-impact * 14) + ')'}>
        <rect x="520" y="1370" width="112" height="20" rx="4" fill="#FFFEF8" stroke={ink} strokeWidth="4"/>
        <path d="M532 1379 H604" stroke={teal} strokeWidth="4"/>
      </g>
      <rect x="746" y="1340" width="70" height="50" rx="6" fill="#DBE8E3" stroke={ink} strokeWidth="5"/>
      <path d="M816 1355 C843 1356 844 1380 817 1377" fill="none" stroke={ink} strokeWidth="5"/>
      </g>

      {/* Loose sheets briefly flutter from the filing impact, then settle onto the recessed desk. */}
      <g opacity={sheetVisible}>
        <g transform={'translate(' + (690 + sheetFlight * 62) + ' ' +
          (895 + sheetFlight * 310 - sheetArc) + ') rotate(' + (-12 + sheetFlight * 30) + ')'}>
          <rect x="-28" y="-23" width="58" height="70" rx="3" fill="#FFFEF8"
            stroke={ink} strokeWidth="3"/>
          <path d="M-17 -7 H15 M-17 4 H10 M-17 16 H7" stroke="#C3D3CE" strokeWidth="3"/>
        </g>
        <g transform={'translate(' + (624 - sheetFlight * 44) + ' ' +
          (875 + sheetFlight * 330 - sheetArc * 0.7) + ') rotate(' + (10 - sheetFlight * 36) + ')'}>
          <rect x="-24" y="-20" width="49" height="60" rx="3" fill="#FFFEF8"
            stroke={ink} strokeWidth="3"/>
          <path d="M-14 -3 H14 M-14 12 H9" stroke={orange} strokeWidth="3"/>
        </g>
      </g>

      {/* An impact burst exists only during the physical contact beat. */}
      <g opacity={impact} fill="none" stroke={orange} strokeWidth="8" strokeLinecap="round">
        <path d="M710 840 L744 810"/>
        <path d="M757 863 L804 858"/>
        <path d="M690 877 L688 913"/>
      </g>

      {/* Secondary set dressing: a plant grounds the foreground instead of another graph. */}
      <path d="M1028 1385 L1025 1255" stroke={teal} strokeWidth="9" fill="none"/>
      <path d="M1025 1312 Q966 1259 975 1215 Q1028 1214 1033 1290Z" fill="#B6CEC3"/>
      <path d="M1026 1269 Q1076 1221 1075 1173 Q1026 1189 1026 1269Z" fill="#81B0A4"/>
      <path d="M992 1373 H1064 L1053 1452 H1003 Z" fill="#B9A58E" stroke={ink} strokeWidth="5"/>
      <ellipse cx="181" cy="1436" rx="115" ry="15" fill={ink} opacity="0.065"/>
      <ellipse cx="917" cy="1436" rx="125" ry="16" fill={ink} opacity="0.065"/>

      {/* Keep this scenic layer silent: no fabricated event sounds or quotations. */}
    </svg>
  );
};
