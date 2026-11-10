/* ============ SANOR TOWN (prototype: map + places) ============ */
const SanorTown=(()=>{
let HOST=null;
/* ============ SANOR TOWN · prototype stage 1 (the Market) ============
   Own tiny WebGL engine, no libraries, no network calls. Nothing is saved and nothing is sent to the teacher.
   One player, four NPCs with scripted English talk (A1-A2). */
const TOWN_NPCS=[
 {id:'mali',name:'Mali',role:'Fruit seller⁣แม่ค้าผลไม้',x:-7,z:-5.4,ry:0,shirt:[.93,.36,.52],pants:[.3,.3,.45],hair:[.08,.06,.07],acc:'bun',
  turns:[
   {npc:"Good morning! What would you like?",th:'สวัสดีตอนเช้า! คุณต้องการอะไรคะ',o:["I'd like two mangoes, please.","Good morning! I'm fine, thank you.","Yes, I like fruit."],
    hint:'แม่ค้าถามว่า "คุณต้องการอะไร" ให้ตอบว่าต้องการอะไร',ok:"I'd like ... = ฉันต้องการ ... ใช้สั่งของอย่างสุภาพ"},
   {npc:"Here you are. That is fifty baht.",th:'นี่ค่ะ ทั้งหมดห้าสิบบาท',o:["Here is fifty baht. Thank you.","Thank you. How much is it?","You're welcome. Here you are."],
    hint:'แม่ค้าบอกราคา ให้ตอบด้วยการจ่ายเงิน',ok:'Here is ... baht = นี่เงิน ... บาท ใช้ตอนจ่ายเงิน'},
   {npc:"You're welcome. Have a nice day!",th:'ยินดีค่ะ ขอให้เป็นวันที่ดีนะคะ',o:["You too. Goodbye!","Good morning!","Nice to meet you."],
    hint:'แม่ค้าอวยพรให้ ให้ตอบอวยพรกลับและลา',ok:'You too. = คุณก็เช่นกัน ใช้ตอบคำอวยพร'}]},
 {id:'somchai',name:'Mr. Somchai',role:'Egg seller⁣ลุงขายไข่',x:7,z:-5.4,ry:0,shirt:[.96,.96,.92],pants:[.35,.3,.22],hair:[.78,.78,.8],acc:'hat',
  turns:[
   {npc:"Hello! How can I help you?",th:'สวัสดีครับ ให้ช่วยอะไรไหมครับ',o:["Do you have eggs?","I'm fine, thank you. And you?","Yes, I can help you."],
    hint:'ผู้ขายถามว่าให้ช่วยอะไร ให้ถามหาสินค้าที่ต้องการ',ok:'Do you have ...? = คุณมี ... ไหม ใช้ถามหาสินค้า'},
   {npc:"Yes, we do. They are five baht each.",th:'มีครับ ฟองละห้าบาท',o:["I'll take six eggs, please.","Do you have eggs?","Yes, I do. They are five baht."],
    hint:'ผู้ขายบอกราคาไข่ ให้บอกว่าจะซื้อกี่ฟอง',ok:"I'll take ... = ฉันขอเอา ... ใช้ตัดสินใจซื้อ"},
   {npc:"That is thirty baht.",th:'สามสิบบาทครับ',o:["Here you are.","You're welcome.","Yes, I'd like six eggs."],
    hint:'ผู้ขายบอกราคารวม ให้ยื่นเงินให้',ok:'Here you are. = นี่ครับ/ค่ะ ใช้ตอนยื่นของให้คนอื่น'}]},
 {id:'nok',name:'Ms. Nok',role:'T-shirt seller⁣แม่ค้าเสื้อ',x:-7,z:5.4,ry:Math.PI,shirt:[.35,.5,.95],pants:[.25,.25,.3],hair:[.45,.2,.6],acc:'long',
  turns:[
   {npc:"Hi! Are you looking for something?",th:'สวัสดีค่ะ กำลังมองหาอะไรอยู่ไหมคะ',o:["Yes. I'm looking for a T-shirt.","Yes, thank you. I'm fine.","Yes, it's a nice T-shirt."],
    hint:'แม่ค้าถามว่ามองหาอะไรไหม ให้ตอบว่าใช่และบอกสิ่งที่หา',ok:"I'm looking for ... = ฉันกำลังหา ..."},
   {npc:"What size do you need?",th:'ต้องการไซซ์อะไรคะ',o:["Medium, please.","Blue, please.","Three hundred baht, please."],
    hint:'แม่ค้าถามไซซ์ ให้ตอบเป็นไซซ์เสื้อ เช่น small, medium, large',ok:'Medium = ไซซ์กลาง (small เล็ก, large ใหญ่)'},
   {npc:"It is three hundred baht.",th:'ตัวละสามร้อยบาทค่ะ',o:["That's expensive. Can you make it cheaper?","Medium, please.","OK. What size do you need?"],
    hint:'แม่ค้าบอกราคา ให้ตอบเรื่องราคา เช่น ขอลดราคา',ok:'Can you make it cheaper? = ลดราคาได้ไหม'}]},
 {id:'chai',name:'Mr. Chai',role:'Market helper⁣ผู้ช่วยตลาด',x:2.6,z:5.2,ry:Math.PI,shirt:[.2,.62,.38],pants:[.2,.28,.4],hair:[.1,.08,.08],acc:'cap',
  turns:[
   {npc:"Hello! Can I help you?",th:'สวัสดีครับ ให้ผมช่วยไหมครับ',o:["Excuse me, where is the bathroom?","I'm fine, thank you. And you?","Yes, the bathroom is over there."],
    hint:'ผู้ช่วยถามว่าให้ช่วยไหม ให้ถามหาห้องน้ำ',ok:'Excuse me, where is ...? = ขอโทษครับ ... อยู่ที่ไหน ใช้ถามทาง'},
   {npc:"It is next to the fruit stall.",th:'อยู่ข้างๆ ร้านผลไม้ครับ',o:["Thank you. Is it far?","Yes, it is next to the stall.","Thank you. Where is the bathroom?"],
    hint:'ผู้ช่วยบอกที่ตั้งแล้ว ให้ขอบคุณและถามต่อว่าไกลไหม',ok:'Is it far? = ไกลไหม'},
   {npc:"No, it is not far. Go straight and turn left.",th:'ไม่ไกลครับ เดินตรงไปแล้วเลี้ยวซ้าย',o:["Go straight and turn left. Got it. Thanks!","Turn right. Got it. Thanks!","Yes, it is far. Thank you."],
    hint:'ผู้ช่วยบอกเส้นทาง ให้ทวนเส้นทางและขอบคุณ',ok:'Go straight = เดินตรงไป, turn left = เลี้ยวซ้าย'}]}
];

/* ---------- tiny 3D math (column-major 4x4) ---------- */
const M4={
 id(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])},
 mul(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s}return o},
 T(x,y,z){const m=M4.id();m[12]=x;m[13]=y;m[14]=z;return m},
 S(x,y,z){const m=M4.id();m[0]=x;m[5]=y;m[10]=z;return m},
 Ry(a){const c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1])},
 Rx(a){const c=Math.cos(a),s=Math.sin(a);return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1])},
 persp(f,asp,n,fa){const t=1/Math.tan(f/2),nf=1/(n-fa);return new Float32Array([t/asp,0,0,0,0,t,0,0,0,0,(fa+n)*nf,-1,0,0,2*fa*n*nf,0])},
 look(e,c){let zx=e[0]-c[0],zy=e[1]-c[1],zz=e[2]-c[2];let l=Math.hypot(zx,zy,zz);zx/=l;zy/=l;zz/=l;
  let xx=zz,xy=0,xz=-zx;l=Math.hypot(xx,xz);xx/=l;xz/=l;
  const yx=zy*xz-zz*xy,yy=zz*xx-zx*xz,yz=zx*xy-zy*xx;
  return new Float32Array([xx,yx,zx,0,xy,yy,zy,0,xz,yz,zz,0,-(xx*e[0]+xy*e[1]+xz*e[2]),-(yx*e[0]+yy*e[1]+yz*e[2]),-(zx*e[0]+zy*e[1]+zz*e[2]),1])}
};
const TSKY=[.62,.82,.95];
/* Light-and-shadow look (every scene unless it has fx:false): sky/ground ambient, warm sun, soft darkening near the ground, sky gradient. Other scenes keep the original shader. */
const TFX_VS='attribute vec3 aPos;attribute vec3 aNor;attribute vec3 aCol;uniform mat4 uVP;uniform mat4 uM;uniform vec3 uTint;varying vec3 vCol;varying float vFog;void main(){vec4 w=uM*vec4(aPos,1.0);vec3 n=normalize((uM*vec4(aNor,0.0)).xyz);float d=max(dot(n,normalize(vec3(-0.45,0.85,0.35))),0.0);vec3 hemi=mix(vec3(0.46,0.42,0.38),vec3(0.56,0.60,0.68),n.y*0.5+0.5);vec3 sun=vec3(1.0,0.90,0.72)*0.55*d;float ao=mix(0.68,1.0,smoothstep(0.0,0.9,w.y));ao=mix(1.0,ao,1.0-max(n.y,0.0));vCol=aCol*uTint*(hemi+sun)*ao;gl_Position=uVP*w;vFog=clamp((gl_Position.w-20.0)/24.0,0.0,0.85);}';
const TFX_FS='precision mediump float;varying vec3 vCol;varying float vFog;uniform float uAlpha;void main(){vec3 f=vec3(0.74,0.87,0.96);gl_FragColor=vec4(mix(vCol,f,vFog),uAlpha);}';
const TFX_SKY_VS='attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.999,1.0);}';
const TFX_SKY_FS='precision mediump float;varying vec2 v;void main(){float t=smoothstep(-0.3,1.0,v.y);gl_FragColor=vec4(mix(vec3(0.74,0.87,0.96),vec3(0.34,0.60,0.92),t),1.0);}';
function tBox(a,cx,cy,cz,sx,sy,sz,c){const x0=cx-sx/2,x1=cx+sx/2,y0=cy-sy/2,y1=cy+sy/2,z0=cz-sz/2,z1=cz+sz/2;
 const F=[[[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1],[0,0,1]],[[x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0],[0,0,-1]],
  [[x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[1,0,0]],[[x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0],[-1,0,0]],
  [[x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0],[0,1,0]],[[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1],[0,-1,0]]];
 for(const f of F){const n=f[4];for(const k of [0,1,2,0,2,3]){const p=f[k];a.push(p[0],p[1],p[2],n[0],n[1],n[2],c[0],c[1],c[2])}}}
function tPyr(a,cx,cy,cz,sx,sh,sz,c){const x0=cx-sx/2,x1=cx+sx/2,z0=cz-sz/2,z1=cz+sz/2,ap=[cx,cy+sh,cz];
 const B=[[x0,cy,z1],[x1,cy,z1],[x1,cy,z0],[x0,cy,z0]];
 for(let i=0;i<4;i++){const p=B[i],q=B[(i+1)%4];const ux=q[0]-p[0],uy=q[1]-p[1],uz=q[2]-p[2],vx=ap[0]-p[0],vy=ap[1]-p[1],vz=ap[2]-p[2];
  let nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l;
  for(const v of [p,q,ap])a.push(v[0],v[1],v[2],nx,ny,nz,c[0],c[1],c[2])}}
function tDisc(a,r){const n=10;for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2;
 a.push(0,0,0,0,1,0,1,1,1,Math.cos(a0)*r,0,Math.sin(a0)*r,0,1,0,1,1,1,Math.cos(a1)*r,0,Math.sin(a1)*r,0,1,0,1,1,1)}}

/* ---------- the market map (metres) ---------- */
const TOWN_OBST=[[-9.3,-4.7,-7.6,-3.5],[4.7,9.3,-7.6,-3.5],[-9.3,-4.7,3.5,7.6],[-14.3,-10.0,-7.8,-3.7],[-13.4,-12.6,6.6,7.4],[12.4,13.2,7.2,8.0],[12.6,13.4,-9.2,-8.4],[3.3,4.1,5.7,6.1]];
function townWorld(){
 const a=[];const W=[1,1,1];
 tBox(a,0,-.06,0,34,.12,28,[.45,.72,.38]);               /* grass */
 tBox(a,0,.01,0,31,.04,4.6,[.64,.64,.68]);                /* road */
 for(let i=-6;i<=6;i++)tBox(a,i*2.3,.04,0,1.1,.02,.18,[.95,.93,.8]); /* road dashes */
 [[-7,-5.4],[7,-5.4],[-7,5.4]].forEach(([sx,sz],k)=>{
  const dir=sz<0?1:-1,col=[[.9,.25,.3],[.2,.65,.4],[.3,.45,.95]][k],front=sz+dir*1.9,back=sz-dir*1.9;
  tBox(a,sx,.02,sz,4.6,.04,4.6,[.86,.78,.6]);             /* stall floor */
  tBox(a,sx,1.3,back,4.4,2.6,.25,[.72,.55,.38]);           /* back wall */
  tBox(a,sx,.55,front,3.8,1.1,.8,[.62,.42,.25]);           /* counter */
  tBox(a,sx,1.12,front,3.9,.06,.9,[.82,.62,.4]);           /* counter top */
  for(const px of [-2.1,2.1]){tBox(a,sx+px,1.25,front+dir*.2,.16,2.5,.16,[.5,.36,.22]);tBox(a,sx+px,1.25,back,.16,2.5,.16,[.5,.36,.22])}
  for(let i=0;i<8;i++)tBox(a,sx-2.1+i*.6,2.58,sz-1.1,.6,.1,1.6,i%2?[1,1,1]:col); /* striped awning */
  tBox(a,sx,2.35,front+dir*.35,4.8,.3,.12,col);            /* valance */
 });
 /* goods */
 for(let i=0;i<4;i++)for(let j=0;j<2;j++){tBox(a,-8.4+i*.45,1.3+j*.02,-3.9+j*.05,.34,.3,.34,[1,.8,.1]);tBox(a,-6.2+i*.4,1.3,-3.9+j*.28,.36,.36,.36,[.98,.55,.1])}
 for(let i=0;i<3;i++)tBox(a,-7.2+i*.55,1.34,-3.55,.5,.4,.5,[.2,.6,.25]);
 for(let i=0;i<6;i++)for(let j=0;j<2;j++)tBox(a,5.6+i*.45,1.27,-3.9+j*.3,.26,.2,.3,[.97,.93,.82]);
 for(let i=0;i<3;i++)tBox(a,5.7+i*1.3,.95,-4.6,1.0,.3,.7,[.65,.5,.3]);
 tBox(a,-7,1.7,7.15,.08,.08,4,[.45,.45,.5]);              /* clothes rail */
 for(let i=0;i<6;i++)tBox(a,-8.6+i*.65,1.35,7.1,.5,.7,.06,[[.95,.3,.3],[.3,.7,.95],[.95,.85,.2],[.5,.85,.5],[.85,.5,.9],[.95,.6,.2]][i]);
 /* bathroom building next to the fruit stall */
 tBox(a,-12.1,1.2,-5.75,4.2,2.4,3.9,[.78,.82,.9]);tBox(a,-12.1,2.55,-5.75,4.5,.2,4.2,[.35,.45,.7]);
 tBox(a,-12.1,.95,-3.76,1.0,1.9,.1,[.25,.4,.75]);tBox(a,-12.1,2.0,-3.7,1.4,.5,.1,[.2,.35,.7]);
 tBox(a,-12.45,2.0,-3.62,.16,.3,.06,[1,1,1]);tBox(a,-11.8,2.0,-3.62,.16,.3,.06,[1,1,1]);
 /* info signpost near Mr. Chai */
 tBox(a,3.7,1.0,5.9,.14,2.0,.14,[.5,.36,.22]);tBox(a,3.7,1.9,5.9,1.1,.5,.1,[.95,.85,.3]);tPyr(a,4.4,1.65,5.9,.5,.5,.12,[.95,.85,.3]);
 /* trees, bushes, lamps, fence */
 [[-13,7],[13,7.6],[13,-8.8],[-2,-9.2],[2,-9.2],[-14,0.5]].forEach(([x,z])=>{tBox(a,x,.7,z,.4,1.4,.4,[.5,.34,.2]);tPyr(a,x,1.2,z,2.4,1.7,2.4,[.2,.55,.28]);tPyr(a,x,2.4,z,1.7,1.5,1.7,[.25,.62,.32])});
 [[-3,7.5],[0,8.2],[6,8],[10,-9],[-3.5,-9],[10.5,2.8]].forEach(([x,z])=>tBox(a,x,.35,z,1.2,.7,1,[.3,.62,.3]));
 [[-3.5,2.9],[3.5,2.9],[-3.5,-2.9],[3.5,-2.9],[9.5,2.9],[-10,2.9]].forEach(([x,z])=>{tBox(a,x,1.3,z,.1,2.6,.1,[.3,.3,.35]);tBox(a,x,2.7,z,.4,.3,.4,[1,.9,.4])});
 for(let x=-14.5;x<=14.5;x+=1.5){tBox(a,x,.4,-11,.12,.8,.12,[.6,.45,.3]);tBox(a,x,.4,11,.12,.8,.12,[.6,.45,.3])}
 for(let z=-11;z<=11;z+=1.5){tBox(a,-15,.4,z,.12,.8,.12,[.6,.45,.3]);tBox(a,15,.4,z,.12,.8,.12,[.6,.45,.3])}
 tBox(a,0,.6,-11,30,.08,.08,[.6,.45,.3]);tBox(a,0,.6,11,30,.08,.08,[.6,.45,.3]);tBox(a,-15,.6,0,.08,.08,22,[.6,.45,.3]);tBox(a,15,.6,0,.08,.08,22,[.6,.45,.3]);
 return new Float32Array(a);
}
function townPerson(g,u,P){
 /* P: {x,z,ry,y,walk,t,shirt,pants,hair,acc,skin} — draws body parts with the shared unit cube */
 const B=M4.mul(M4.mul(M4.T(P.x,P.y||0,P.z),M4.Ry(P.ry)),M4.S(1.3,1.3,1.3));
 const part=(cx,cy,cz,sx,sy,sz,col,rx,piv)=>{let M;
  if(rx){M=M4.mul(M4.mul(M4.mul(B,M4.T(cx,piv,cz)),M4.Rx(rx)),M4.mul(M4.T(0,-sy/2,0),M4.S(sx,sy,sz)))}
  else M=M4.mul(B,M4.mul(M4.T(cx,cy,cz),M4.S(sx,sy,sz)));
  g.uniformMatrix4fv(u.M,false,M);g.uniform3fv(u.tint,col);g.drawArrays(g.TRIANGLES,0,36)};
 const sw=Math.sin(P.t*9)*.7*P.walk,skin=[.96,.78,.62];
 /* fx people: breathing, blinking, head nod, greeting wave (P.wave 0-1) and talking gestures (P.talk 0-1). Other scenes use the plain pose. */
 const fx=!!P.fx,W=fx?(P.wave||0):0,T=fx?(P.talk||0):0;
 const br=fx?1+Math.sin(P.t*2.1)*.014:1,hy=fx?Math.sin(P.t*1.3)*.012+T*Math.sin(P.t*6.5)*.02:0,bl=fx&&(P.t%3.7)<.13?.15:1;
 let la=-sw,ra=sw;
 if(fx){const id=Math.sin(P.t*1.7)*.035;la=-sw*(1-T)+id+T*(-.45+Math.sin(P.t*3.7+1)*.16);ra=sw*(1-W-T)-id+W*(-2.55+Math.sin(P.t*10)*.32)+T*(-.85+Math.sin(P.t*4.6)*.26)}
 part(-.13,0,0,.22,.5,.22,P.pants,sw,.5);part(.13,0,0,.22,.5,.22,P.pants,-sw,.5);
 part(0,.8,0,.52,.6*br,.3,P.shirt);
 part(-.35,0,0,.14,.5,.14,skin,la,1.07);part(.35,0,0,.14,.5,.14,skin,ra,1.07);
 part(0,1.3+hy,0,.34,.34,.32,skin);
 part(0,1.5+hy,-.01,.38,.14,.36,P.hair);
 if(P.acc==='bun')part(0,1.58+hy,-.2,.16,.16,.16,P.hair);
 if(P.acc==='long')part(0,1.3+hy,-.2,.38,.4,.08,P.hair);
 if(P.acc==='hat'){part(0,1.53+hy,0,.72,.04,.72,[.9,.78,.45]);part(0,1.6+hy,0,.34,.12,.34,[.9,.78,.45])}
 if(P.acc==='cap'){part(0,1.55+hy,0,.4,.1,.4,[.2,.4,.8]);part(0,1.5+hy,.26,.34,.04,.2,[.2,.4,.8])}
 part(-.08,1.33+hy,.17,.05,.05*bl,.02,[.1,.1,.1]);part(.08,1.33+hy,.17,.05,.05*bl,.02,[.1,.1,.1]);
}


/* ---------- scenes ---------- */
const TT=(npc,th,a,w1,w2,hint,ok)=>({npc,th,o:[a,w1,w2],hint,ok});
/* optional picture for one turn (ST-CNT-003 V1.2: the eraser for "What is this called in English?").
   Drawn in code, no words on it; the label does not say the answer. Turns without img look the same as before. */
const TIMG={eraser:'<svg viewBox="0 0 160 90" width="150" height="84" aria-hidden="true"><ellipse cx="80" cy="78" rx="56" ry="6" fill="#000" opacity=".12"/><g transform="rotate(-10 80 45)"><rect x="22" y="26" width="116" height="40" rx="9" fill="#F7A8C4" stroke="#B4436C" stroke-width="3"/><rect x="22" y="26" width="116" height="12" rx="6" fill="#FFD0E0"/><path d="M78 26h44v40H78z" fill="#2F6BFF" stroke="#1E3FBF" stroke-width="3"/><path d="M84 37h32M84 46h32M84 55h32" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/><rect x="22" y="26" width="116" height="40" rx="9" fill="none" stroke="#B4436C" stroke-width="3"/></g></svg>'};
function timg(k){const d=el('div',{class:'timg',role:'img','aria-label':'Picture of a school item · รูปอุปกรณ์การเรียน'});d.innerHTML=TIMG[k];return d}
function mk(){const a=[],ob=[];return{a,ob,
 box(cx,cy,cz,sx,sy,sz,c,sol){tBox(a,cx,cy,cz,sx,sy,sz,c);if(sol)ob.push([cx-sx/2,cx+sx/2,cz-sz/2,cz+sz/2])},
 tree(x,z){tBox(a,x,.7,z,.4,1.4,.4,[.5,.34,.2]);tPyr(a,x,1.2,z,2.4,1.7,2.4,[.2,.55,.28]);tPyr(a,x,2.4,z,1.7,1.5,1.7,[.25,.62,.32]);ob.push([x-.5,x+.5,z-.5,z+.5])},
 lamp(x,z){tBox(a,x,1.3,z,.1,2.6,.1,[.3,.3,.35]);tBox(a,x,2.7,z,.4,.3,.4,[1,.9,.4])},
 bench(x,z){tBox(a,x,.45,z,3,.15,.8,[.55,.4,.25]);tBox(a,x,.75,z-.35,3,.5,.1,[.55,.4,.25]);ob.push([x-1.5,x+1.5,z-.45,z+.45])},
 table(x,z){tBox(a,x,.7,z,1.3,.1,1.3,[.9,.8,.6]);tBox(a,x,.35,z,.2,.7,.2,[.5,.36,.22]);tBox(a,x-1.1,.4,z,.5,.8,.5,[.62,.42,.25]);tBox(a,x+1.1,.4,z,.5,.8,.5,[.62,.42,.25]);ob.push([x-.7,x+.7,z-.7,z+.7])},
 counter(x,z,w,top){tBox(a,x,.55,z,w,1.1,.9,[.9,.9,.95],false);tBox(a,x,1.12,z,w+.1,.06,1,top);ob.push([x-w/2,x+w/2,z-.45,z+.45])}
};}
function base(c,b,plaza,pc){
 c.box(0,-.06,0,36,.12,30,[.45,.72,.38]);
 c.box((b[0]+b[1])/2,.01,(b[2]+b[3])/2,b[1]-b[0]-1,.04,b[3]-b[2]-1,pc||[.82,.78,.66]);
 for(let x=b[0];x<=b[1];x+=1.5){c.box(x,.4,b[2]-.8,.12,.8,.12,[.6,.45,.3]);c.box(x,.4,b[3]+.8,.12,.8,.12,[.6,.45,.3])}
 for(let z=b[2];z<=b[3];z+=1.5){c.box(b[0]-.8,.4,z,.12,.8,.12,[.6,.45,.3]);c.box(b[1]+.8,.4,z,.12,.8,.12,[.6,.45,.3])}
 c.box(0,.6,b[2]-.8,b[1]-b[0]+1.6,.08,.08,[.6,.45,.3]);c.box(0,.6,b[3]+.8,b[1]-b[0]+1.6,.08,.08,[.6,.45,.3]);
 c.box(b[0]-.8,.6,0,.08,.08,b[3]-b[2]+1.6,[.6,.45,.3]);c.box(b[1]+.8,.6,0,.08,.08,b[3]-b[2]+1.6,[.6,.45,.3]);
}
const WIN=[.55,.75,.9],DOOR=[.45,.3,.2];
function shell(c,col,roof,wrow){ /* building along the north edge */
 c.box(0,2.1,-8,20,4.2,3.6,col,true);c.box(0,4.35,-8,20.6,.3,4,roof);
 if(wrow)for(const x of [-8,-5.2,5.2,8])c.box(x,2.3,-6.18,1.6,1.2,.06,WIN);
}
/* mirror a built world left-right (x -> -x): positions, normals and blocked areas */
function mirrorWorld(w){const a=w.a;for(let i=0;i<a.length;i+=9){a[i]=-a[i];a[i+3]=-a[i+3]}w.ob=w.ob.map(([x0,x1,z0,z1])=>[-x1,-x0,z0,z1]);return w}
/* way signs for walking links between scenes: a green board with an arrow (picture via decals) */
function waySign(x,z,ry,en,th,arrow){return {x,y:2.05,z,w:2.4,h:1.05,ry,cw:480,ch:210,draw:(g,W,H)=>{
 g.fillStyle='#1f6f43';g.fillRect(0,0,W,H);g.strokeStyle='#f4f1e6';g.lineWidth=8;g.strokeRect(8,8,W-16,H-16);
 g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.font="700 64px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(arrow,W*.12,H*.5);
 g.font="700 52px Anuphan, 'Noto Sans Thai', sans-serif";let f=52;while(g.measureText(en).width>W*.72&&f>20){f-=2;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(en,W*.57,H*.36);
 g.font="600 44px Anuphan, 'Noto Sans Thai', sans-serif";f=44;while(g.measureText(th).width>W*.72&&f>18){f-=2;g.font="600 "+f+"px Anuphan, sans-serif"}g.fillStyle='#e9f5ec';g.fillText(th,W*.57,H*.7)}}}
/* the post and board behind a waySign (world boxes); the board faces +z */
function wayPost(c,x,z){c.box(x,1.1,z-.08,.14,2.2,.14,[.4,.4,.42],true);c.box(x,2.05,z-.06,2.5,1.15,.08,[.15,.42,.27])}
/* ground chevrons that show the way out */
/* big yellow ground arrows pointing along (dx,dz) (only the sign is used): n arrows, 2.1 m apart, starting at (x,z).
   Each arrow = a shaft plus a stepped head (blocky, like the rest of the town), 1.8 m long and 1.7 m wide. */
function wayMarks(c,x,z,dx,dz,n){const ux=Math.sign(dx),uz=Math.sign(dz),Y=[.99,.84,.18];
 const seg=(a,len,wid)=>{const cx=x+ux*a,cz=z+uz*a;c.box(cx,.105,cz,ux?len:wid,.03,ux?wid:len,Y)};
 for(let k=0;k<n;k++){const b=k*2.1;seg(b+.4,.8,.55);
  for(let i=0;i<6;i++)seg(b+.9+i*.17,.18,1.7-i*.3)}}
const SCENES=[];
