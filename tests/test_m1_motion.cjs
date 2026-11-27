const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const {transformSync} = require('esbuild');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const remotion = require('remotion');

function loadTsx(source, filename, overrides = {}) {
  const module = {exports: {}};
  const code = transformSync(source, {loader: 'tsx', format: 'cjs', jsx: 'automatic'}).code;
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: name => name in overrides ? overrides[name] : require(name),
  }, {filename});
  return module.exports;
}

const hostFile = 'src/OurbitesHost.tsx';
const previous = execFileSync('git', ['show', '8bcbebe:'+hostFile], {encoding:'utf8'});
const hookMock = {...remotion, useCurrentFrame:()=>0};
const oldHost = loadTsx(previous, hostFile, {remotion:hookMock}).OurbitesHost;
const newHost = loadTsx(fs.readFileSync(hostFile,'utf8'), hostFile, {remotion:hookMock}).OurbitesHost;
for (const pose of ['neutral','explain','think','point','react']) {
  for (const props of [{pose}, {pose,poseFrom:'react',poseBlend:.4}]) {
    assert.equal(renderToStaticMarkup(React.createElement(newHost,props)),
      renderToStaticMarkup(React.createElement(oldHost,props)), 'Default host changed');
  }
}

const {m1PressPose, m1FilmShotAt, M1_REVIEW_CUES} = loadTsx(fs.readFileSync('src/M1AnthropicFilm.tsx','utf8'),
  'M1AnthropicFilm.tsx', {
    './OurbitesHost': {OurbitesHost:newHost},
    '../episodes/002/m1-episode.json': require('../episodes/002/m1-episode.json'),
  });
const previousScene = execFileSync('git', ['show','0a8099e:src/M1AnthropicFilm.tsx'], {encoding:'utf8'});
const previousPose = loadTsx(previousScene, 'previous-M1AnthropicFilm.tsx', {
  './OurbitesHost': {OurbitesHost:newHost},
  '../episodes/002/m1-episode.json': require('../episodes/002/m1-episode.json'),
}).m1PressPose;
for (let frame=0;frame<300;frame++) {
  const {hand, ...previousGraphics} = previousPose(frame/30);
  assert.equal(JSON.stringify(m1PressPose(frame/30)), JSON.stringify(previousGraphics),
    'Approved ledger/graphics choreography changed at frame '+frame);
}
const before = m1PressPose(3.4-1e-6).sheet;
const after = m1PressPose(3.4+1e-6).sheet;
assert.ok(Math.hypot(before.x-after.x,before.y-after.y)<.01, 'Sheet jumps on release');
for (let i=102;i<174;i++) {
  const a=m1PressPose(i/30).sheet;
  const b=m1PressPose((i+1)/30).sheet;
  assert.ok(b.y<=a.y+.01, 'Sheet reverses away from the ledger');
  assert.ok(Math.hypot(b.x-a.x,b.y-a.y)<55, 'Excessive adjacent-frame travel');
}
for (const t of [5.8,7,9.9]) {
  const s=m1PressPose(t).sheet;
  assert.equal(s.x,730);
  assert.equal(s.y,740);
  assert.ok(Math.abs(s.scale-.82)<1e-10);
}
console.log('Passed host parity, all-frame graphics parity, sheet continuity and settled landing checks.');

// Every review frame belongs to exactly one shot; boundary frames enter the next
// shot without a duplicate frame or a gap. These are provisional scene cues.
const counts = Array(6).fill(0);
for (let frame=0; frame<1011; frame++) {
  const shot = m1FilmShotAt(frame/30);
  counts[shot.index]++;
  assert.ok(shot.seconds >= 0 && shot.seconds < shot.duration + 1e-8);
}
assert.ok(counts.every(count=>count>0));
for (let i=1; i<6; i++) {
  assert.equal(m1FilmShotAt(M1_REVIEW_CUES[i]-1e-8).index, i-1);
  assert.equal(m1FilmShotAt(M1_REVIEW_CUES[i]).index, i);
}
assert.equal(m1FilmShotAt(40).index,5);
assert.throws(()=>m1FilmShotAt(0,[0,1,1,3,4,5,6]),/increasing/);
assert.throws(()=>m1FilmShotAt(0,[0,1,2]),/seven/);
console.log('Passed all-frame six-shot coverage and cue-boundary checks: '+counts.join(', '));
