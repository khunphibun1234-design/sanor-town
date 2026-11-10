/* ===== Our school: PM Studio (ST-CNT-015 V1.0, 4 Nov). Reached from the Building 3 corridor (south-side door); no room number.
   "PM" is kept as a name only. Spots from the spec: A teacher review desk by the door (Ms. Varee), B camera and tripod in the photo studio (Bam),
   C meeting/script table (Tida), D recording booth with the microphone (Hansa). Look redesigned 5 Nov from the teacher's pictures. A made-up practice news clip about recycling:
   no real camera or recording feature, no real people, apps or brands. NPC names are made up. ===== */
SCENES.push({id:'pmstudio',name:'PM Studio · Phibun School',th:'ห้องสตูดิโอสื่อสร้างสรรค์',color:'#1E7BFF',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[3.5,1.6,Math.PI]}],/* the door leads back to the Building 3 corridor (south side) */
 build(){const c=mk();
  /* 5 Nov redesign from the teacher's six pictures: red, charcoal and grey felt panels, light oak desks, grey terrazzo floor.
     Four zones: photo studio (front left), recording booth (front right), editing desks (left wall), meeting table (back left),
     and the teacher review desk with a small sofa by the door. The four NPC spots of the spec stay: A review desk, B camera, C table, D microphone. */
  const WALL=[.93,.93,.92],CAP=[.18,.18,.2],RED=[.72,.1,.14],CHAR=[.2,.2,.23],FELT=[.52,.52,.55],OAK=[.8,.65,.45],OAK2=[.66,.52,.36],LEG=[.12,.12,.14],SCR=[.12,.14,.2],WHITE=[.97,.97,.96];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.74,.74,.76]:[.67,.67,.7]);
  /* front wall (full height), charcoal band along the bottom, felt panels */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);c.box(0,.22,-4.83,12.6,.44,.04,CHAR);
  c.box(.15,1.95,-4.83,2.35,.7,.04,CHAR);/* title board frame */
  /* low side and back walls, door gap at the back right; the door frame is red like the studio entrance */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,RED);c.box(5.45,1.1,4.95,.14,2.2,.24,RED);c.box(4.5,2.25,4.95,2.05,.14,.24,RED);
  c.box(3.7,1.1,4.45,.04,2,.85,[.7,.82,.88]);c.box(3.7,1.1,4.45,.06,2.04,.06,CAP);/* one glass door leaf standing open */
  /* ---- B: photo studio, front left: white paper backdrop (green and grey rolls above), two softboxes, a stool, camera on a tripod ---- */
  c.box(-3.4,2.12,-4.78,3.8,.12,.12,LEG);c.box(-3.4,2.0,-4.74,3.6,.1,.1,[.15,.6,.3]);c.box(-3.4,1.9,-4.7,3.6,.1,.1,[.6,.6,.62]);
  c.box(-3.4,1.0,-4.8,3.4,1.86,.03,WHITE);c.box(-3.4,.055,-4.05,3.4,.02,1.5,WHITE);
  for(const x of [-5.15,-1.65]){c.box(x,1.0,-4.75,.06,2.1,.06,LEG)}
  for(const [x,z] of [[-5.2,-2.7],[-1.6,-2.7]]){c.box(x,.75,z,.05,1.5,.05,[.75,.75,.78],true);
   c.box(x,.05,z,.7,.04,.06,[.75,.75,.78]);c.box(x,.05,z,.06,.04,.7,[.75,.75,.78]);
   c.box(x,1.75,z-.15,.9,.9,.3,LEG);c.box(x,1.75,z-.31,.82,.82,.02,WHITE)}
  c.box(-2.6,.32,-3.8,.32,.05,.32,LEG);c.box(-2.6,.16,-3.8,.05,.32,.05,LEG);
  c.box(-3.4,.065,-3.2,.5,.01,.08,[.98,.85,.15]);c.box(-3.4,.065,-3.2,.08,.01,.5,[.98,.85,.15]);/* where the speaker stands */
  c.box(-3.4,.65,-1.3,.06,1.3,.06,LEG,true);c.box(-3.65,.35,-1.1,.04,.75,.04,LEG);c.box(-3.15,.35,-1.1,.04,.75,.04,LEG);c.box(-3.4,.35,-1.55,.04,.75,.04,LEG);
  c.box(-3.4,1.38,-1.3,.36,.26,.22,LEG);c.box(-3.4,1.38,-1.46,.16,.16,.14,[.06,.06,.07]);c.box(-3.4,1.38,-1.19,.24,.16,.01,[.5,.6,.7]);
  c.box(-2.3,.06,-1.3,2.1,.02,.05,LEG);/* a loose cable across the walkway (PM-06) */
  c.box(.15,.35,-4.55,2.2,.7,.5,CHAR,true);for(const x of [-.6,.15,.9])c.box(x,.82,-4.55,.5,.25,.36,LEG);/* camera cases on a low cabinet */
  /* ---- D: recording booth, front right: glass walls on a low base, felt panels inside, mic with a pop filter, music stand, sound desk ---- */
  const BZ=-1.9;
  c.box(1.8,.45,-3.38,.12,.9,2.96,CHAR,true);c.box(2.25,.45,BZ,.9,.9,.12,CHAR,true);c.box(4.65,.45,BZ,2.3,.9,.12,CHAR,true);
  for(const [x,z] of [[1.8,-4.85],[1.8,-3.4],[1.8,BZ],[2.7,BZ],[3.5,BZ],[4.65,BZ],[5.8,BZ]])c.box(x,1.1,z,.08,2.2,.08,LEG);
  c.box(1.8,2.2,-3.38,.1,.1,2.96,LEG);c.box(3.8,2.2,BZ,4,.1,.1,LEG);
  c.box(1.8,1.55,-3.38,.02,1.3,2.9,[.62,.74,.8]);c.box(2.25,1.55,BZ,.85,1.3,.02,[.62,.74,.8]);c.box(4.65,1.55,BZ,2.25,1.3,.02,[.62,.74,.8]);
  [[2.3,RED],[2.95,FELT],[3.6,RED],[4.25,FELT],[4.9,RED],[5.5,FELT]].forEach(([x,col])=>c.box(x,1.35,-4.82,.55,1.5,.05,col));
  c.box(4.2,.05,-3.4,2,.02,1.6,[.25,.25,.28]);/* rug */
  c.box(4.6,.75,-3.5,.04,1.5,.04,LEG);c.box(4.6,.03,-3.5,.4,.03,.4,LEG);c.box(4.6,1.5,-3.42,.08,.24,.08,[.6,.6,.62]);c.box(4.6,1.5,-3.3,.22,.22,.02,[.1,.1,.12]);
  c.box(5.2,.65,-3.1,.03,1.3,.03,LEG);c.box(5.2,1.25,-3.1,.4,.3,.03,LEG);
  c.box(2.45,.38,-3.6,.9,.76,1.8,OAK2,true);c.box(2.45,.78,-3.6,1,.05,1.9,OAK);
  c.box(2.25,1.05,-3.6,.04,.4,.7,SCR);c.box(2.28,1.05,-3.6,.01,.34,.64,[.18,.18,.24]);c.box(2.6,.82,-3.6,.18,.04,.5,LEG);
  c.box(2.6,.84,-3.0,.26,.06,.16,RED);/* small sound box */
  /* ---- editing desks along the left wall: monitors on arms, office chairs, headphones, a printer ---- */
  c.box(-5.45,.38,.7,.9,.76,3.2,OAK2,true);c.box(-5.45,.78,.7,1,.05,3.3,OAK);
  for(const z of [-.2,1.5]){c.box(-5.75,.95,z,.05,.35,.05,LEG);c.box(-5.62,1.12,z,.04,.42,.72,SCR);c.box(-5.6,1.12,z,.01,.36,.66,[.25,.32,.42]);
   c.box(-5.25,.82,z,.22,.02,.5,LEG);c.box(-4.55,.48,z,.5,.08,.5,LEG);c.box(-4.3,.75,z,.06,.5,.46,LEG);c.box(-4.55,.24,z,.06,.42,.06,LEG);
   c.box(-5.85,.65,z+.5,.06,.2,.16,LEG)}
  c.box(-5.5,.92,2.15,.4,.24,.4,[.2,.2,.22]);
  /* ---- C: meeting table at the back left, red and charcoal chairs, laptop, notebook; a screen and a PLAN SHOOT EDIT board ---- */
  c.box(-2.6,.38,2.9,2.4,.76,1.1,LEG,true);c.box(-2.6,.76,2.9,2.5,.06,1.2,OAK);
  [-3.4,-2.6,-1.8].forEach((x,k)=>{for(const [z,dz] of [[2.05,-.2],[3.75,.2]]){const col=(k+(dz<0?0:1))%2?RED:CHAR;
   c.box(x,.46,z,.46,.08,.46,col);c.box(x,.75,z+dz,.46,.5,.06,col);c.box(x,.22,z,.05,.44,.05,LEG)}});
  c.box(-2.9,.8,2.85,.5,.02,.34,[.7,.7,.74]);c.box(-2.9,.95,3.02,.5,.3,.02,[.7,.7,.74]);c.box(-2.0,.8,2.75,.3,.02,.22,LEG);
  c.box(-1.7,.86,3.05,.12,.14,.12,LEG);c.box(-3.6,.86,2.8,.16,.16,.16,[.35,.6,.32]);
  c.box(-2.6,.6,4.6,.12,1.2,.12,LEG);c.box(-2.6,.03,4.6,.8,.04,.4,LEG);c.box(-2.6,1.45,4.55,1.7,.95,.06,LEG);
  c.box(-5.75,1.3,3.6,.06,1,1.6,[.9,.9,.92]);c.box(-5.8,.4,3.6,.08,.8,.08,LEG);
  c.box(-4.7,.3,4.55,1.4,.6,.4,OAK2,true);for(let k=0;k<5;k++)c.box(-5.25+k*.28,.72,4.55,.2,.26,.06,[[.7,.2,.2],[.2,.3,.5],[.85,.75,.5],[.25,.25,.28],[.5,.62,.4]][k]);
  /* ---- A: teacher review desk by the door (oak, monitor, lamp) and a small sofa with red cushions ---- */
  c.box(1.6,.38,2.6,2.4,.76,.8,OAK2,true);c.box(1.6,.78,2.6,2.5,.05,.9,OAK);
  c.box(1.4,.82,2.55,.7,.03,.46,LEG);c.box(1.4,1.03,2.8,.7,.42,.03,LEG);c.box(1.4,1.03,2.78,.62,.34,.01,[.55,.2,.28]);
  c.box(2.4,.81,2.6,.4,.02,.3,[.98,.88,.4]);c.box(.6,1.0,2.8,.04,.42,.04,[.8,.65,.3]);c.box(.6,1.2,2.72,.18,.06,.2,[.8,.65,.3]);
  c.box(.9,.84,2.85,.24,.12,.16,[.6,.15,.2]);
  c.box(5.55,.25,.9,.75,.5,1.9,CHAR,true);c.box(5.85,.6,.9,.15,.6,1.9,CHAR);c.box(5.55,.62,.35,.2,.3,.45,RED);c.box(5.55,.62,1.45,.2,.3,.45,RED);c.box(5.55,.62,.9,.2,.28,.4,[.92,.88,.8]);
  c.box(4.7,.25,2.2,.5,.5,.5,OAK,true);c.box(4.7,.62,2.2,.3,.25,.3,WHITE);c.box(4.7,.9,2.2,.45,.4,.45,[.35,.6,.32]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:.15,y:1.95,z:-4.8,w:2.25,h:.62,ry:0,cw:640,ch:176,draw:(g,W,H)=>{g.fillStyle='#26262b';g.fillRect(0,0,W,H);
   const cx=70,cy=H/2,r=44;g.fillStyle='#f5f5f5';g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.fillStyle='#26262b';
   for(let k=0;k<6;k++){const t=k*Math.PI/3;g.beginPath();g.moveTo(cx+Math.cos(t)*12,cy+Math.sin(t)*12);g.lineTo(cx+Math.cos(t)*r,cy+Math.sin(t)*r);g.lineTo(cx+Math.cos(t+.75)*r*.62,cy+Math.sin(t+.75)*r*.62);g.closePath();g.fill()}
   g.fillStyle='#e5e7eb';g.fillRect(132,30,4,H-60);g.textBaseline='middle';g.textAlign='left';
   g.font="800 70px Anuphan, sans-serif";g.fillStyle='#e11d2e';g.fillText('PM',156,66);const w=g.measureText('PM ').width;g.fillStyle='#f5f5f5';g.fillText('STUDIO',156+w,66);
   let f=38;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText('ห้องสตูดิโอสื่อสร้างสรรค์').width>W-176&&f>16){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}
   g.fillStyle='#d1d5db';g.fillText('ห้องสตูดิโอสื่อสร้างสรรค์',158,132)}},
  {x:.15,y:1.12,z:-4.8,w:2.1,h:.92,ry:0,cw:420,ch:184,draw:(g,W,H)=>{g.fillStyle='#ffffff';g.fillRect(0,0,W,H);g.fillStyle='#c8102e';g.fillRect(0,0,8,H);
   g.textAlign='left';g.textBaseline='middle';const L=[["Ask Before Filming", "ขออนุญาตก่อนถ่าย"], ["Quiet While Recording", "เงียบขณะบันทึก"], ["Teacher Checks Before Sharing", "ให้ครูตรวจสอบก่อนเผยแพร่"]];
   L.forEach(([e,t],k)=>{const y=30+k*58;g.fillStyle='#111827';let f=24;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-36&&f>13){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,22,y);
    g.fillStyle='#4b5563';f=20;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-36&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,22,y+24)})}},
  {x:-3.4,y:1.78,z:-4.77,w:1.5,h:.26,ry:0,cw:420,ch:72,draw:(g,W,H)=>{g.fillStyle='#f7f7f6';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';g.font="800 52px Anuphan, sans-serif";
   const a='PM ',b='STUDIO',wa=g.measureText(a).width,wb=g.measureText(b).width,x0=(W-wa-wb)/2;g.textAlign='left';g.fillStyle='#c8102e';g.fillText(a,x0,H/2+2);g.fillStyle='#26262b';g.fillText(b,x0+wa,H/2+2)}},
  {x:3.1,y:2.04,z:-1.83,w:.9,h:.22,ry:0,cw:250,ch:60,draw:(g,W,H)=>{g.fillStyle='#b91c1c';g.fillRect(0,0,W,H);g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.font="700 34px Anuphan, sans-serif";g.fillText('RECORDING',W/2,H/2+2)}},
  {x:4.65,y:.5,z:-1.83,w:1.4,h:.55,ry:0,cw:400,ch:157,draw:(g,W,H)=>{g.fillStyle='#c8102e';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';g.fillStyle='#fff';
   g.font="800 52px Anuphan, sans-serif";g.fillText('PM STUDIO',20,52);g.fillStyle='#26262b';g.fillRect(0,100,W,57);g.fillStyle='#fff';g.font="600 28px Anuphan, sans-serif";g.fillText('VOICE • MUSIC • PODCAST',20,129)}},
  {x:-6.08,y:1.0,z:.7,w:2.8,h:.34,ry:Math.PI/2,cw:700,ch:85,draw:(g,W,H)=>{g.fillStyle='#f3f3f2';g.fillRect(0,0,W,H);g.textBaseline='middle';g.textAlign='left';g.font="800 50px Anuphan, sans-serif";
   g.fillStyle='#c8102e';g.fillText('PM',18,H/2+2);let x=18+g.measureText('PM ').width;g.fillStyle='#26262b';g.fillText('STUDIO',x,H/2+2);x+=g.measureText('STUDIO  ').width;
   g.font="600 30px Anuphan, sans-serif";g.fillText('EDIT • SELECT • CREATE',x,H/2+2)}},
  {x:-2.6,y:1.45,z:4.51,w:1.6,h:.86,ry:Math.PI,cw:480,ch:258,draw:(g,W,H)=>{g.fillStyle='#14151a';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';g.font="800 70px Anuphan, sans-serif";
   const a='PM',b='STUDIO',wa=g.measureText(a+' ').width,wb=g.measureText(b).width,x0=(W-wa-wb)/2;g.textAlign='left';g.fillStyle='#e11d2e';g.fillText(a,x0,108);g.fillStyle='#f5f5f5';g.fillText(b,x0+wa,108);
   g.fillStyle='#e11d2e';g.fillRect(60,150,W-120,3);g.fillStyle='#d1d5db';g.textAlign='center';g.font="600 28px Anuphan, sans-serif";g.fillText('CREATE • COLLABORATE • INSPIRE',W/2,190)}},
  {x:-5.71,y:1.3,z:3.6,w:1.5,h:.92,ry:Math.PI/2,cw:450,ch:276,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.strokeStyle='#9ca3af';g.lineWidth=3;
   ['PLAN','SHOOT','EDIT'].forEach((t,k)=>{const x=k*W/3;if(k)g.beginPath(),g.moveTo(x,20),g.lineTo(x,H-16),g.stroke();g.fillStyle='#26262b';g.font="700 34px Anuphan, sans-serif";g.textAlign='center';g.textBaseline='middle';g.fillText(t,x+W/6,36);
    for(let r=0;r<2;r++){g.fillStyle=['#fde68a','#bfdbfe','#fecaca'][(k+r)%3];g.fillRect(x+18+r*58,80+r*70,58,52)}})}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('vareepm','Ms. Varee','Media teacher⁣ครูผู้ดูแลสื่อ',1.6,1.8,0,[0.25, 0.45, 0.85],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("Our practice clip is about recycling. What topic will you choose?","คลิปฝึกซ้อมของเรามีหัวข้อเรื่องการรีไซเคิล เธอจะเลือกหัวข้ออะไร","We will make a short clip about recycling.","We will make a short clip about sports.","We will make a short clip about cooking.","เลือกหัวข้อรีไซเคิลให้ตรงกับแผนคลิปสมมติ","Good! Your clip topic matches the plan. | ดีมาก เธอเลือกหัวข้อคลิปตรงกับแผน"),
  TT("You want to film your friend. What should you do first?","เธอต้องการถ่ายวิดีโอเพื่อน ควรทำอะไรก่อน","I will ask my friend for permission first.","I will tell my friend after filming.","I will ask after showing the video.","ต้องได้รับอนุญาตก่อนถ่าย ไม่ใช่หลังจากถ่ายหรือเผยแพร่","Correct! Ask permission before filming anyone. | ถูกต้อง ต้องขออนุญาตก่อนถ่ายผู้อื่น"),
  TT("Your clip is finished. Who should check it before sharing?","ตัดต่อคลิปเสร็จแล้ว ใครควรตรวจสอบก่อนนำไปแบ่งปัน","Our teacher should check the clip first.","Our classmates should share the clip first.","Our visitors should upload the clip first.","เลือกผู้ใหญ่ที่รับผิดชอบตรวจคลิปก่อนเผยแพร่","Exactly! A teacher checks the clip before sharing. | ถูกต้อง ให้ครูตรวจคลิปก่อนเผยแพร่")]),
 NPCDEF('bampm','Bam','Camera helper⁣นักเรียนผู้ช่วยกล้อง',-2.1,-0.8,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("We need a steady camera. Where will you put the tripod?","เราต้องการกล้องที่มั่นคง เธอจะวางขาตั้งไว้ที่ไหน","I will put the tripod on the flat floor.","I will put the tripod on the soft cushion.","I will put the tripod on the moving trolley.","เลือกพื้นราบที่มั่นคงสำหรับขาตั้งกล้อง","Well done! A flat floor keeps the tripod steady. | เยี่ยม พื้นราบช่วยให้ขาตั้งกล้องมั่นคง"),
  TT("We will film one speaker. Where should the speaker stand?","เราจะถ่ายผู้พูดหนึ่งคน ผู้พูดควรยืนตรงไหน","The speaker should stand in front of the camera.","The speaker should stand behind the camera.","The speaker should stand outside the camera view.","เลือกตำแหน่งที่กล้องมองเห็นผู้พูดได้ชัด","Great! The camera can show the speaker. | ดีมาก กล้องจะเห็นผู้พูดได้"),
  TT("A cable is across the walking area. What should we do?","มีสายอุปกรณ์พาดทางเดิน เราควรทำอย่างไร","We should ask the teacher to clear the walkway.","We should leave the cable across the walkway.","We should place another cable beside it.","ขอให้ครูช่วยจัดสายให้พ้นทางเดินอย่างปลอดภัย","Correct! Ask the teacher to make the walkway safe. | ถูกต้อง ขอให้ครูช่วยทำให้ทางเดินปลอดภัย")]),
 NPCDEF('tidapm','Tida','Script reader⁣นักเรียนผู้ช่วยบท',-.9,2.9,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("We need a friendly opening for our practice news clip. What will you say?","เราต้องการประโยคเปิดคลิปข่าวฝึกซ้อมที่เป็นมิตร เธอจะพูดว่าอะไร","Hello! Welcome to our short school news clip.","Goodbye! Our school news clip is finished.","Please wait! The news clip ended yesterday.","เลือกประโยคทักทายและต้อนรับเพื่อเปิดคลิป","Nice opening! You welcome your audience clearly. | เปิดคลิปได้ดี เธอต้อนรับผู้ชมได้ชัดเจน"),
  TT("We only need one short line about recycling. What will you write?","เราต้องการข้อความสั้นหนึ่งประโยคเกี่ยวกับการรีไซเคิล เธอจะเขียนว่าอะไร","Let's put clean paper in the recycling box.","Let's put wet towels in the recycling box.","Let's put dirty food in the recycling box.","เลือกข้อความง่าย ๆ ที่เกี่ยวข้องกับการแยกกระดาษสะอาด","Good! That line is short and relevant. | ดีมาก ประโยคสั้นและตรงกับหัวข้อ"),
  TT("The script is ready. What will you do before the camera starts?","เตรียมบทแล้ว เธอจะทำอะไรก่อนกล้องเริ่มถ่าย","I will practise my line with the group.","I will change the script without telling anyone.","I will skip the practice and leave early.","เลือกการซ้อมบทพูดร่วมกับทีมก่อนเริ่มถ่าย","Excellent! Team practice helps everyone prepare. | ยอดเยี่ยม การซ้อมร่วมกันช่วยให้ทุกคนพร้อม")]),
 NPCDEF('hansapm','Hansa','Sound helper⁣นักเรียนผู้ช่วยเสียง',3.1,-1.2,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("The speaker is ready. Where should the microphone be?","ผู้พูดพร้อมแล้ว ไมโครโฟนควรอยู่ตรงไหน","The microphone should be near the speaker.","The microphone should be inside the closed drawer.","The microphone should be far across the room.","วางไมโครโฟนใกล้ผู้พูดอย่างเหมาะสม","Correct! A nearby microphone can capture the voice. | ถูกต้อง ไมโครโฟนที่อยู่ใกล้ช่วยรับเสียงพูด"),
  TT("The recording sign is on. How should our team behave?","ป้ายกำลังบันทึกเปิดอยู่ ทีมของเราควรปฏิบัติอย่างไร","We should stay quiet while our friend speaks.","We should talk loudly while our friend speaks.","We should clap while our friend speaks.","ระหว่างบันทึกเสียงพูดของเพื่อนควรเงียบ","Well done! Quiet teamwork helps the recording. | เยี่ยม การเงียบช่วยให้บันทึกเสียงได้ดี"),
  TT("We have finished recording. What should we check with our teacher?","บันทึกเสร็จแล้ว เราควรตรวจอะไรกับครู","Let's check the picture and sound with our teacher.","Let's check the classroom clock with our teacher.","Let's check the lunch menu with our teacher.","ตรวจทั้งภาพและเสียงของคลิปกับครูก่อนนำไปใช้","Great! You review the clip with a teacher first. | ดีมาก เธอตรวจคลิปร่วมกับครูก่อน")])]});

