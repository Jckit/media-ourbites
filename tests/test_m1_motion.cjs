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
const anchored = renderToStaticMarkup(React.createElement(newHost,
  {pose:'explain',rightHandTarget:{x:80,y:190}}));
assert.match(anchored, /cx="80" cy="190"/);

const {m1PressPose} = loadTsx(fs.readFileSync('src/M1AnthropicFilm.tsx','utf8'),
  'M1AnthropicFilm.tsx', {
    './OurbitesHost': {OurbitesHost:newHost},
    '../episodes/002/m1-episode.json': require('../episodes/002/m1-episode.json'),
  });
const before = m1PressPose(3.4-1e-6).sheet;
const after = m1PressPose(3.4+1e-6).sheet;
assert.ok(Math.hypot(before.x-after.x,before.y-after.y)<.01, 'Sheet jumps on release');
for (let i=102;i<174;i++) {
  const a=m1PressPose(i/30).sheet;
  const b=m1PressPose((i+1)/30).sheet;
  assert.ok(b.y<=a.y+.01, 'Sheet reverses away from the ledger');
  assert.ok(Math.hypot(b.x-a.x,b.y-a.y)<55, 'Excessive adjacent-frame travel');
}
for (let i=0;i<=81;i++) {
  const s=m1PressPose(i/30);
  assert.ok(Math.hypot(s.hand.x-s.crank.x,s.hand.y-s.crank.y)<1e-8, 'Grip separates');
}
for (const t of [5.8,7,9.9]) {
  const s=m1PressPose(t).sheet;
  assert.equal(s.x,730);
  assert.equal(s.y,740);
  assert.ok(Math.abs(s.scale-.82)<1e-10);
}
console.log('Passed default-host parity, hand contact, sheet-release continuity and settled landing checks.');
