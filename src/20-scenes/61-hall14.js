/* ===== Our school: Ratrangsan assembly hall (from the teacher's map: "หอประชุม ราษฎร์รังสรรค์", one high floor,
   grey roof, north-west of the dome) =====
   Inside: a stage with curtains at the front, rows of chairs with a middle aisle. The side and back walls are low
   (cut away) and there is no ceiling, so the 360-degree camera can see inside. The event ("English Day") is made up
   for the game; NPC names are made up. The door at the back leads to the flagpole yard. */
SCENES.push({id:'hall14',name:'Ratrangsan Hall · Phibun School',th:'หอประชุมราษฎร์รังสรรค์',color:'#7C3AED',orbit:true,spawn:[0,4.2,Math.PI],bounds:[-9.6,9.6,-4.3,8],
 exits:[{x0:-1.1,x1:1.1,z0:7.5,z1:8,to:'flagpole',at:[10.4,-10.6,-Math.PI/2]},
  {x0:9.2,x1:9.6,z0:.9,z1:2.5,to:'itlib',at:[4.5,3.6,Math.PI]}],/* the back door leads to the flagpole yard; the right side door leads to the IT library */
 build(){const c=mk();
  const WALL=[.9,.88,.84],CAP=[.42,.44,.47],WOOD=[.62,.42,.26],CURT=[.62,.1,.14],CHAIR=[.2,.3,.55];
  c.box(0,-.06,0,90,.12,90,[.47,.68,.36]);
  for(let i=0;i<10;i++)c.box(-9+i*2,.04,1.6,2,.04,14,i%2?[.66,.48,.32]:[.7,.52,.35]);/* wooden floor */
  c.box(0,.04,-6.8,20,.04,4,[.66,.48,.32]);
  /* front wall (full height) with the stage, curtains and a banner */
  c.box(0,2.3,-8.9,20.4,4.6,.2,WALL,true);
  c.box(0,.45,-6.6,14,.9,4.2,WOOD,true);c.box(0,.91,-4.48,14,.04,.06,[.85,.7,.4]);
  for(const s of [-1,1]){c.box(s*6.3,2.6,-7.9,1.6,3.4,.3,CURT);c.box(s*4.9,2.6,-8.05,1.2,3.4,.2,[.55,.08,.12]);
   for(let k=0;k<3;k++)c.box(s*7.6,.15+k*.15,-4.2+k*.3,1,.3+k*.3,.3,WOOD)}/* stage steps on both sides */
  c.box(0,4.1,-8.2,14,.5,.3,CURT);
  c.box(0,1.45,-5.4,.6,1.1,.5,[.5,.32,.2]);c.box(0,2.12,-5.3,.08,.3,.08,[.2,.2,.2]);/* lectern with a microphone */
  c.box(-2.6,1.2,-7.8,.5,.6,.5,[.15,.15,.18]);c.box(2.6,1.2,-7.8,.5,.6,.5,[.15,.15,.18]);/* speakers */
  /* low side and back walls (cut away) with a door gap in the back */
  c.box(-10.1,.6,0,.2,1.2,18,WALL,true);c.box(-10.1,1.23,0,.3,.06,18,CAP);
  /* right wall with a side door to the IT library (door gap z .8 to 2.6) */
  c.box(10.1,.6,-4.1,.2,1.2,9.8,WALL,true);c.box(10.1,1.23,-4.1,.3,.06,9.8,CAP);c.box(10.1,.6,5.8,.2,1.2,6.4,WALL,true);c.box(10.1,1.23,5.8,.3,.06,6.4,CAP);
  c.box(10.1,1.1,.75,.24,2.2,.14,CAP);c.box(10.1,1.1,2.65,.24,2.2,.14,CAP);c.box(10.1,2.25,1.7,.24,.14,2.05,CAP);
  c.box(10.13,2.75,1.7,.1,.85,1.95,[.15,.42,.27]);wayMarks(c,8.4,1.7,1,0,1);
  for(const s of [-1,1]){c.box(s*5.65,.6,8.3,8.9,1.2,.2,WALL,true);c.box(s*5.65,1.23,8.3,8.9,.06,.3,CAP)}
  c.box(-1.25,1.2,8.3,.16,2.4,.3,CAP);c.box(1.25,1.2,8.3,.16,2.4,.3,CAP);c.box(0,2.45,8.3,2.66,.16,.3,CAP);
  /* rows of chairs on both sides of the middle aisle; some students are already sitting */
  const chair=(x,z)=>{c.box(x,.42,z,.48,.06,.46,CHAIR);c.box(x,.7,z+.22,.48,.5,.05,CHAIR);c.box(x-.2,.2,z,.05,.4,.4,[.3,.3,.32]);c.box(x+.2,.2,z,.05,.4,.4,[.3,.3,.32])};
  const sit=(x,z,girl,shirt)=>{c.box(x,.97,z+.05,.42,.52,.24,shirt||[.97,.97,.95]);c.box(x,1.39,z+.05,.32,.32,.28,[.86,.66,.5]);
   c.box(x,1.58,z+.07,.34,.08,.32,[.08,.06,.06]);if(girl)c.box(x,1.4,z+.2,.34,.3,.06,[.08,.06,.06]);
   c.box(x-.1,.52,z-.2,.14,.14,.36,[.12,.16,.33]);c.box(x+.1,.52,z-.2,.14,.14,.36,[.12,.16,.33])};
  const XS=[-7.4,-6.6,-5.8,-5,-4.2,-3.4,-2.6,-1.8,1.8,2.6,3.4,4.2,5,5.8,6.6,7.4],ZS=[-2.6,-1.2,.2,1.6,3,4.4];
  for(const z of ZS){for(const x of XS)chair(x,z);c.ob.push([-7.75,-1.45,z-.3,z+.3]);c.ob.push([1.45,7.75,z-.3,z+.3])}
  [[-5,-2.6,1],[-4.2,-2.6,0],[2.6,-2.6,1],[3.4,-1.2,0],[-6.6,-1.2,1],[-2.6,.2,0],[5,.2,1],[5.8,.2,0],[-3.4,1.6,1],[1.8,1.6,0],[6.6,3,1],[-5.8,3,0],[-1.8,4.4,1],[4.2,4.4,0]]
   .forEach(([x,z,g])=>sit(x,z,g));
  /* a stack of spare chairs at the back right */
  for(let k=0;k<5;k++)c.box(8.6,.25+k*.12,6.6,.5,.06,.5,CHAIR);c.box(8.6,.55,6.82,.5,.7,.05,CHAIR);c.ob.push([8.3,8.9,6.3,6.9]);
  /* way out: arrow to the back door and a sign above it */
  wayMarks(c,0,5.5,0,1,1);c.box(0,3.05,8.42,2.3,.8,.1,[.15,.42,.27]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:0,y:3.0,z:-8.78,w:7,h:1.3,ry:0,cw:900,ch:170,draw:(g,W,H)=>{g.fillStyle='#1e3a8a';g.fillRect(0,0,W,H);g.strokeStyle='#fde68a';g.lineWidth=8;g.strokeRect(8,8,W-16,H-16);
   g.fillStyle='#fde68a';g.textAlign='center';g.textBaseline='middle';g.font="700 64px Anuphan, sans-serif";g.fillText('English Day',W/2,H*.38);
   g.fillStyle='#ffffff';g.font="600 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('วันภาษาอังกฤษ',W/2,H*.76)}},
  Object.assign(waySign(0,8.42-.08,Math.PI,'Multipurpose Dome','โดมอเนกประสงค์','↑'),{y:3.05,w:2.2,h:.75}),
  Object.assign(waySign(10.05,1.7,-Math.PI/2,'IT Library','ห้องสมุด IT','→'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('malee','Mrs. Malee','Teacher⁣ครูผู้จัดงาน',-3.4,-3.7,0,[.55,.35,.75],[.2,.2,.26],[.08,.06,.07],'bun',[
  TT("Welcome to English Day! Please find a seat.",'ยินดีต้อนรับสู่วันภาษาอังกฤษ หาที่นั่งได้เลยนะ',"Thank you, ma'am. Where can I sit?","Thank you, ma'am. I'm English Day.","Thank you, ma'am. Where is the bus?",'ครูต้อนรับและให้หาที่นั่ง ให้ขอบคุณและถามว่านั่งตรงไหน',"Polite! Ask Where can I sit? to find a seat. | find a seat = หาที่นั่ง, Where can I sit? = นั่งตรงไหนได้"),
  TT("You can sit in the third row.",'นั่งแถวที่สามได้เลย',"OK. The third row. Thank you.","OK. The third floor. Thank you.","OK. The first row. Thank you.",'ครูบอกแถวที่ให้นั่ง ให้ทวนและขอบคุณ',"Good! Repeat The third row to check. A row is a line of chairs. | row = แถว (เก้าอี้), floor = ชั้น (อาคาร)"),
  TT("Please turn off your phone during the show.",'ระหว่างการแสดงช่วยปิดโทรศัพท์ด้วยนะ',"Sure. I'll turn it off now.","Sure. I'll turn it up now.","Sure. I'll call my friend now.",'ครูขอให้ปิดโทรศัพท์ ให้รับคำว่าจะปิดเดี๋ยวนี้',"Good! Turn off means stop the phone. Turn up means louder. | turn off = ปิด, turn up = เปิดให้ดังขึ้น")]),
 NPCDEF('nan','Nan','Speech contestant⁣ผู้แข่งขันพูดสุนทรพจน์',3.6,-3.7,0,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("I'm going to give a speech. I'm so nervous!",'ฉันจะขึ้นพูดสุนทรพจน์ ตื่นเต้นมากเลย',"Don't worry. You can do it!","Don't worry. I can't do it!","Don't worry. Let's go home.",'เพื่อนตื่นเต้น ให้ให้กำลังใจ',"Kind words! You can do it! helps a nervous friend. | nervous = ตื่นเต้น ประหม่า, You can do it! = เธอทำได้"),
  TT("What should I do if I forget my words?",'ถ้าลืมบทจะทำยังไงดี',"Take a deep breath and smile.","Take a bus and go home.","Read a comic book on the stage.",'เพื่อนขอคำแนะนำ ให้แนะนำให้หายใจลึก ๆ และยิ้ม',"Good advice! A deep breath and a smile help you remember. | take a deep breath = หายใจลึก ๆ, forget = ลืม"),
  TT("Will you clap for me?",'จะปรบมือให้ฉันไหม',"Of course! Good luck!","Of course! Good night!","Of course not! Sit down.",'เพื่อนขอให้ปรบมือให้ ให้ตอบรับและอวยพร',"Nice! Say Good luck! before a friend's speech. | clap = ปรบมือ, Good luck! = โชคดีนะ")]),
 NPCDEF('tan','Tan','Friend⁣เพื่อน',-8.6,.9,Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.1,.08,.07],'',[
  TT("Over here! I saved a seat for you.",'ทางนี้ ฉันจองที่นั่งไว้ให้แล้ว',"Thanks! That's very kind of you.","Thanks! I saved money.","Thanks! I'll sit on the stage.",'เพื่อนจองที่ไว้ให้ ให้ขอบคุณ',"Polite! That's very kind of you. thanks your friend for the seat. | save a seat = จองที่นั่งไว้ให้, kind = ใจดี"),
  TT("Can you see the stage from here?",'จากตรงนี้มองเห็นเวทีไหม',"Yes, I can see it clearly.","No, I can't swim.","Yes, I can see the canteen.",'เพื่อนถามว่ามองเห็นเวทีไหม ให้ตอบว่าเห็นชัด',"Good! Clearly means you can see it well. | stage = เวที, clearly = ชัดเจน"),
  TT("Shh! The show is starting.",'ชู่ว การแสดงกำลังจะเริ่มแล้ว',"OK. Let's watch quietly.","OK. Let's shout loudly.","OK. Let's play with our phones.",'เพื่อนบอกให้เงียบ ให้รับคำว่าจะดูอย่างเงียบ ๆ',"Good! Watch quietly when the show starts. | quietly = เงียบ ๆ, loudly = เสียงดัง")]),
 NPCDEF('prasit','Uncle Prasit','School janitor⁣ภารโรง',8.6,5.4,-Math.PI/2,[.35,.5,.4],[.25,.25,.28],[.3,.28,.26],'hat',[
  TT("Excuse me. Can you help me carry these chairs?",'ขอโทษนะ ช่วยลุงยกเก้าอี้พวกนี้หน่อยได้ไหม',"Sure. Where should I put them?","Sure. Where is the canteen?","Sure. Can I sit on them?",'ลุงขอให้ช่วยยกเก้าอี้ ให้ตอบรับและถามว่าจะวางตรงไหน',"Helpful! Ask Where should I put them? before you carry the chairs. | carry = ยก ถือ, Where should I put them? = วางตรงไหนดี"),
  TT("Put them next to the stage, please.",'เอาไปวางข้างเวทีนะ',"OK. Next to the stage.","OK. Under the table.","OK. On the stage.",'ลุงบอกตำแหน่งที่จะวาง ให้ทวนคำบอกตำแหน่ง',"Good! Repeat the place to check. Next to means beside. | next to = ข้าง ๆ, under = ใต้"),
  TT("Thank you. You're very helpful.",'ขอบใจนะ ช่วยได้มากเลย',"You're welcome. Happy to help.","Yes, I'm very hungry.","Yes, I'm very helpful.",'ลุงขอบคุณ ให้ตอบว่ายินดีช่วย',"Polite! You're welcome. Happy to help. answers thanks. | helpful = ช่วยเหลือดี, Happy to help. = ยินดีช่วย")])]});

