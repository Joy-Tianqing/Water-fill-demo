/* M0 L01: 240mL, 20mL/s, 60ms startup, 80ms closing. */
class WaterAttempt {
  static grade(v, o) { return o > 0 ? 'F' : v >= 990000 ? 'S' : v >= 970000 ? 'A' : v >= 900000 ? 'B' : v >= 800000 ? 'C' : 'D'; }
  constructor() { this.t=0; this.closeTime=null; this.emitted=0; this.volume=0; this.spilled=0; this.packets=[]; this.tick=1; this.result=null; }
  integral(t) {
    const x=BigInt(Math.max(0,t)), start=60000n, duration=80000n;
    // Integral expressed over common denominator 12 * 2 * start * duration.
    const den=12n*2n*start*duration;
    const open=n=>n<start?n*n*duration:(2n*start*n-start*start)*duration;
    let n=open(x);
    if(this.closeTime!==null && t>this.closeTime){
      const c=BigInt(this.closeTime), d=x-c<duration?x-c:duration, strength=c<start?c:start;
      n=open(c)+strength*(2n*duration*d-d*d);
    }
    return Number(n/den);
  }
  advance(target) {
    target=Math.max(this.t,Math.floor(target));
    while(Math.floor(this.tick*1000000/120)<=target){ this.step(Math.floor(this.tick++*1000000/120)); }
    this.step(target);
  }
  step(t) {
    if(this.result)return;
    const total=this.integral(t), delta=total-this.emitted;
    if(delta) this.packets.push({t:t+108000,v:delta});
    this.emitted=total; this.t=t;
    while(this.packets.length && this.packets[0].t<=t){const p=this.packets.shift(),room=1000000-this.volume;this.volume+=Math.min(room,p.v);this.spilled+=Math.max(0,p.v-room);}
    if(this.spilled && this.closeTime===null)this.closeTime=t;
    if(t>=30000000 && this.closeTime===null){this.closeTime=t;this.failure='timeout';}
    if(this.closeTime!==null && t>=this.closeTime+80000 && !this.packets.length){this.result={volume:this.volume,spilled:this.spilled,grade:this.failure?'F':WaterAttempt.grade(this.volume,this.spilled)};}
  }
  close(t){if(this.closeTime!==null||this.result)return false;this.advance(t);if(this.closeTime!==null)return false;this.closeTime=this.t;return true;}
  get airborne(){return this.emitted-this.volume-this.spilled;}
}
if(typeof module!=='undefined')module.exports=WaterAttempt;
