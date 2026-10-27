import React from 'react';
import {Img, OffthreadVideo, staticFile} from 'remotion';
import approved from './anthropic-approved-media.json';

/**
 * Research links NEVER go into this manifest. Only local media with human
 * license/factual sign-off and a separately verified matching SHA-256.
 * The asset_research.py check is preliminary metadata validation, not clearance.
 */
type ReviewedAsset = {
  scene_id: string;
  file: string;
  kind: 'photograph' | 'video_clip';
  sha256: string;
  rights_status: 'licensed' | 'permitted_public_domain' | 'exception_reviewed';
  factual_status: 'verified';
  reviewer: string;
  review_date: string;
  permission_evidence: string;
  original_source_url: string;
  credit: string;
};
type Registry = {assets: ReviewedAsset[]};

const records = (approved as Registry).assets;
const localMediaPath = /^approved\/[a-zA-Z0-9._/-]+\.(png|jpe?g|webp|mp4|webm)$/;

export const getHumanReviewedAsset = (sceneId: string): ReviewedAsset | null => {
  const asset = records.find((x) => x.scene_id === sceneId);
  if (!asset ||
      !localMediaPath.test(asset.file) ||
      asset.file.includes('..') ||
      !/^[a-f0-9]{64}$/.test(asset.sha256) ||
      !['licensed', 'permitted_public_domain', 'exception_reviewed'].includes(asset.rights_status) ||
      asset.factual_status !== 'verified' ||
      !asset.reviewer?.trim() || !asset.review_date?.trim() ||
      !asset.permission_evidence?.trim() || !asset.original_source_url?.startsWith('https://')) {
    return null;
  }
  return asset;
};

/**
 * A human must populate the manifest and provide approved local files.
 * Muted video avoids accidental reuse of an uncleared soundtrack.
 */
export const ReviewedMediaInsert: React.FC<{sceneId: string; height?: number}> = ({sceneId, height = 480}) => {
  const item = getHumanReviewedAsset(sceneId);
  if (!item) return null;
  const src = staticFile(item.file);
  return (
    <div style={{width: '100%', height, position: 'relative', overflow: 'hidden', borderRadius: 28, background: '#C9D8D7'}}>
      {item.kind === 'video_clip'
        ? <OffthreadVideo src={src} muted style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        : <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>}
      <div style={{position:'absolute', bottom: 0, left:0, right:0, padding:'15px 22px',
        background:'rgba(20,43,56,0.88)', color:'#F4F0E6', fontSize:22}}>
        {item.credit || 'Licensed archival image'}
      </div>
    </div>
  );
};
