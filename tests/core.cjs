const assert=require('node:assert/strict');
const Core=require('../src/core.js');
for(const [v,o,g] of [[0,0,'D'],[799999,0,'D'],[800000,0,'C'],[899999,0,'C'],[900000,0,'B'],[969999,0,'B'],[970000,0,'A'],[989999,0,'A'],[990000,0,'S'],[1000000,0,'S'],[1000000,1,'F']])assert.equal(Core.grade(v,o),g);
function replay(fps,close){const c=new Core();for(let t=0;t<close;t+=1000000/fps)c.advance(Math.floor(t));c.close(close);assert.equal(c.result,null);assert.equal(c.close(close+1),false);for(let t=close;t<close+400000;t+=1000000/fps){c.advance(Math.floor(t));assert.equal(c.emitted,c.volume+c.airborne+c.spilled)}c.advance(close+400000);return c.result;}
for(const t of [0,30000,11870000,11990000,11990012,12000000]){const expected=replay(120,t);for(const fps of [30,60])assert.deepEqual(replay(fps,t),expected)}
assert.equal(replay(60,11990000).grade,'S');assert.equal(replay(60,11990012).grade,'F');
const unattended=new Core();unattended.advance(14000000);assert.equal(unattended.result.grade,'F');
console.log('PASS: grade boundaries, conservation, frame-rate parity, one-shot close, delayed settlement, exact-full / 1u overflow, automatic overflow');
