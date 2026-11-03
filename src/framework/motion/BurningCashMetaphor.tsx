import React from 'react';
import {Easing,interpolate} from 'remotion';
import {depthPath,projectDepth,contactShadow} from './depth-motion';
import {seededRange} from './seeded-variation';

const C={ink:'#13343D',red:'#E35038',orange:'#FF9B35',paper:'#E1ECCF'};
const ease=(t:number,a:number,b:number)=>interpolate(t,[a,b],[0,1],{
  easing:Easing.bezier(0.18,0.7,0.28,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'
});
/** Original stylized money illustration. Metaphor of a mistaken assumption,
 * explicitly rebutted in the following shot. No literal real-world cash fire.
 * Motion comes from independent banknote lifts, flames and embers.
 */
export const BurningCashMetaphor:React.FC<{time:number;depth?:boolean}>=({time:t,depth=false})=>{
  const ignition=ease(t,0.22,0.72),fade=ease(t,2.20,3.27);
  const push=ease(t,.35,2.1);
  const camera={x:depth?12*push:0,y:depth?-8*push:0,zoom:depth?1+.025*push:1};
  const bills=Array.from({length:6},(_,i)=>{
    const pop=ease(t,0.09+i*0.078,0.43+i*0.078);
    const motion=Math.sin(t*13+i*1.9)*1.7;
    const lift=ease(t,.45+i*.11,1.65+i*.09);
    const p=depthPath(lift,[{x:0,y:0,z:-45+i*15},{x:(i-2.5)*11,y:-35,z:25+i*13},
      {x:(i-2.5)*26,y:-75,z:50+i*12},{x:(i-2.5)*34,y:-90-i*8,z:45+i*11}]);
    const q=projectDepth({x:95+i*37+p.x,y:395-i*36-pop*15+p.y,z:p.z},camera,{x:500,y:420});
    const shadow=contactShadow(lift);
    return <g key={i} opacity={pop*(1-fade)}
      style={depth?{filter:`drop-shadow(3px ${shadow.offset}px ${shadow.blur}px rgba(0,0,0,${shadow.opacity}))`}:undefined}
      transform={depth?`translate(${q.x} ${q.y}) scale(${q.scale}) skewX(${(i-2)*1.5*lift}) rotate(${-10+i*5+motion+lift*(i-2)*2} 290 140)`:'translate('+(95+i*37)+' '+(395-i*36-pop*15)+') rotate('+(-10+i*5+motion)+' 290 140)'}>
      <rect x={0} y={0} width={690} height={285} rx={17} fill={i%2?'#C2E2C9':'#E0EBCB'}
        stroke={C.ink} strokeWidth={8}/>
      <rect x={24} y={23} width={642} height={240} rx={11}
        fill="none" stroke="#739B86" strokeWidth={5}/>
      <circle cx={341} cy={140} r={94} fill="#B7D4B2"
        stroke="#83AB8C" strokeWidth={7}/>
      <path d="M350 75 Q280 88 298 137 Q320 167 372 155 Q405 169 386 208 Q365 225 303 218"
        stroke="#39705A" strokeWidth={12} fill="none" strokeLinecap="round"/>
      <path d="M345 61 V224" stroke="#39705A" strokeWidth={11}/>
      <text x={57} y={93} fontWeight={900} fontSize={60} fill="#477462">$</text>
      <text x={595} y={244} fontWeight={900} fontSize={60} fill="#477462">$</text>
    </g>;
  });
  const flames=Array.from({length:11},(_,i)=>{
    const height=seededRange('anthropic-hook-v2','flame-'+i,140,285,'height')*
      (0.35+0.65*ignition)*(1-fade);
    const wave=22*Math.sin(t*8.1+i*1.5)+10*Math.sin(t*13.3+i*0.7);
    return <g key={i} opacity={ignition*(1-fade)}
      transform={'translate('+(120+i*69+wave)+' '+(596+Math.sin(i+t*6)*5)+')'}>
      <path d={'M0 0 Q'+(-60+wave/6)+' '+(-height*0.48)+' '+(wave/2)+' '+(-height)+
        ' Q'+(65-wave/4)+' '+(-height*0.47)+' 58 0Z'}
        fill={i%3===0?C.orange:C.red}/>
      <path d={'M19 0 Q-4 '+(-height*0.24)+' 18 '+(-height*0.56)+
        ' Q35 '+(-height*0.2)+' 39 0Z'} fill="#FFE3AD"/>
    </g>;
  });
  const embers=Array.from({length:24},(_,i)=>{
    const x=seededRange('anthropic-hook-v2','ember-'+i,180,870,'x');
    const speed=seededRange('anthropic-hook-v2','ember-'+i,95,210,'speed');
    const rise=((Math.max(0,t-0.3)*speed+i*22)%510);
    return <circle key={i} cx={x+18*Math.sin(i+t*5)} cy={570-rise}
      r={2+i%4} opacity={ignition*(1-fade)*0.8}
      fill={i%4===0?'#FFE3AD':C.orange}/>;
  });
  return <svg width="100%" height="100%" viewBox="0 0 1000 840" style={{overflow:'visible'}}>
    <defs><filter id="cash-v2-glow"><feGaussianBlur stdDeviation="52"/></filter></defs>
    <g transform={depth?'translate(80 100) scale(.82)':undefined}>
    <ellipse cx={540} cy={560} rx={400} ry={145}
      fill={C.orange} opacity={ignition*(1-fade)*0.22} filter="url(#cash-v2-glow)"/>
    <ellipse cx={540} cy={710} rx={370} ry={40} fill={C.ink} opacity={0.20*(1-fade)}/>
    {depth&&<g opacity={ignition*(1-fade)*.24}>
      {[0,1,2,3].map(i=><ellipse key={i} cx={400+i*85+45*Math.sin(t*.65+i)}
        cy={410-i*35-55*ease(t,.4+i*.12,2.6)} rx={75+i*15} ry={95+i*12}
        fill="#6D8588" transform={`rotate(${-20+i*12} ${400+i*85} 350)`}/>)}
    </g>}
    {depth&&<g transform="translate(25 -10) scale(.94)">{flames.slice(0,4)}</g>}
    {bills}
    <g transform={depth?'translate(-8 84) scale(1.025)':'translate(0 84)'}>
      {depth?flames.slice(4):flames}{embers}
    </g>
    </g>
  </svg>;
};
