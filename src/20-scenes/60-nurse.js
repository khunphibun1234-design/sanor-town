/* ===== Our school: the nurse's room (from the teacher's map: "อาคารพยาบาล", one floor, between the hall and the dome) =====
   Follows the football field story: Jo hurt his ankle, the player brings him here. Reached from the football field
   (south-east path); the door at the back leads back there. Low side/back walls so the 360-degree camera can see in.
   NPC names are made up (Jo and Mr. Tee come from the football field scene). */
SCENES.push({id:'nurse',name:"School Nurse's Office · Phibun School",th:'ห้องพยาบาล',color:'#DB2777',orbit:true,spawn:[0,3.6,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'football',at:[11.4,7.5,-Math.PI/2]}],/* the door leads back to the football field */
 build(){const c=mk();
  const WALL=[.95,.95,.96],CAP=[.62,.66,.72],BED=[.96,.96,.98],FRAME=[.62,.66,.72],CURT=[.62,.82,.88];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.9,.93,.95]:[.84,.88,.91]);
  /* front wall (higher) with a red-cross cabinet, a height chart and a sign */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1.2,1.15,-4.6,2.2,1.9,.5,[.98,.98,.98],true);c.box(-1.2,1.55,-4.34,.5,.14,.02,[.85,.12,.15]);c.box(-1.2,1.55,-4.33,.14,.5,.02,[.85,.12,.15]);
  c.box(-1.2,.75,-4.34,2.1,.04,.02,CAP);
  for(let k=0;k<8;k++)c.box(-4.9,.3+k*.25,-4.83,k%2?.16:.3,.03,.03,[.3,.4,.6]);c.box(-4.9,1.2,-4.84,.06,1.9,.02,[.3,.4,.6]);
  /* low side and back walls with a door gap at the back right */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  /* nurse's desk with a chair, a first-aid box and a lamp */
  c.box(-3.4,.75,-3.2,1.8,.08,.9,[.86,.88,.9]);c.box(-3.4,.38,-3.2,1.7,.72,.75,[.78,.8,.84],true);
  c.box(-3.9,.9,-3.3,.5,.22,.34,[.95,.95,.95]);c.box(-3.9,.95,-3.12,.16,.05,.02,[.85,.12,.15]);c.box(-3.9,.95,-3.12,.05,.16,.02,[.85,.12,.15]);
  c.box(-2.8,1.05,-3.4,.08,.55,.08,[.3,.3,.32]);c.box(-2.8,1.32,-3.3,.3,.08,.3,[.95,.85,.4]);
  /* two beds with curtains on the right; Jo's bed has an ice pack */
  const bed=(z)=>{c.box(3.6,.55,z,2.1,.18,1,BED);c.box(3.6,.3,z,2,.5,.95,FRAME,true);c.box(4.45,.72,z,.4,.14,.7,[1,1,1]);c.box(3.6,.66,z,1.4,.05,.98,[.55,.75,.9]);
   c.box(3.6,1.4,z-.62,2.2,1.6,.04,CURT);for(const dx of [-1.1,1.1])c.box(3.6+dx,1.1,z-.62,.05,2.2,.05,FRAME)};
  bed(-2.4);bed(.6);
  c.box(2.85,.72,-2.4,.3,.12,.24,[.6,.85,.95]);/* ice pack */
  /* sink and a scale near the door, a small sofa on the left */
  c.box(-5.6,.85,1.6,.6,.12,.9,[.85,.87,.9],true);c.box(-5.6,.42,1.6,.5,.84,.7,[.9,.91,.93]);c.box(-5.8,1.1,1.6,.06,.3,.06,[.6,.62,.65]);
  c.box(-5.3,.06,3.6,.5,.08,.5,[.3,.3,.32]);c.box(-5.3,.12,3.6,.3,.02,.2,[.8,.9,1]);
  c.box(-2.6,.32,1.2,1.8,.4,.8,[.55,.75,.9],true);c.box(-2.6,.75,1.55,1.8,.5,.14,[.5,.7,.86]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:2.6,y:1.95,z:-4.83,w:3.2,h:.62,ry:0,cw:640,ch:124,draw:(g,W,H)=>{g.fillStyle='#be185d';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   {let f=46,t="School Nurse's Office · ห้องพยาบาล";g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W*.92&&f>24){f-=2;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,W/2,H/2+2)}}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Football Field','สนามฟุตบอล','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('rin','Ms. Rin','School nurse⁣ครูพยาบาล',-3.4,-2.3,0,[.98,.98,.98],[.3,.4,.6],[.08,.06,.07],'bun',[
  TT("Hello. What happened?",'สวัสดีจ้ะ เกิดอะไรขึ้น',"My friend hurt his ankle in PE class.","My friend is in Grade 8.","My friend is very happy today.",'ครูพยาบาลถามว่าเกิดอะไรขึ้น ให้เล่าว่าเพื่อนเจ็บข้อเท้าในคาบพละ',"Good! Tell the nurse what happened. Your ankle is between your leg and your foot. | hurt = ทำให้เจ็บ (อดีตก็ใช้ hurt), ankle = ข้อเท้า"),
  TT("Can he walk?",'เขาเดินได้ไหม',"Not very well. It hurts a lot.","Yes, he can swim very well.","He has new sports shoes.",'ครูถามว่าเดินได้ไหม ให้บอกว่าเดินไม่ค่อยได้ เจ็บมาก',"Good! Not very well and It hurts a lot describe the problem clearly. | Not very well. = ไม่ค่อยดี, It hurts a lot. = เจ็บมาก"),
  TT("I'll put some ice on it. Please wait here.",'ครูจะประคบน้ำแข็งให้ รอตรงนี้นะ',"OK. Thank you very much.","OK. I'll go home now.","OK. I'll put the ice in my drink.",'ครูจะประคบน้ำแข็งและให้รอ ให้รับคำและขอบคุณ',"Good! Thank the nurse and wait as she asks. | put ice on = ประคบน้ำแข็ง, wait = รอ")]),
 NPCDEF('jo','Jo','Hurt friend⁣เพื่อนที่บาดเจ็บ',2.3,-1.6,-Math.PI/2,[.85,.25,.25],[.12,.16,.33],[.1,.08,.07],'',[
  TT("My ankle still hurts.",'ข้อเท้ายังเจ็บอยู่เลย',"Don't worry. The nurse will help you.","Don't worry. Let's play football.","Don't worry. It's a nice day.",'เพื่อนยังเจ็บ ให้ปลอบว่าครูพยาบาลจะช่วย',"Kind words! Don't worry helps your friend feel better. | still = ยัง, Don't worry. = ไม่ต้องห่วง"),
  TT("Can you tell Mr. Tee I'm here?",'ช่วยบอกครูทีว่าฉันอยู่ที่นี่ได้ไหม',"Sure. I'll tell him now.","Sure. I'm here too.","Sure. I'll tell your mom.",'เพื่อนขอให้ไปบอกครูพละ ให้รับปากว่าจะบอกเดี๋ยวนี้',"Good! I'll tell him now is a promise to help. | tell = บอก, I'll tell him now. = จะไปบอกเดี๋ยวนี้"),
  TT("Can you bring my bag after class?",'หลังเลิกเรียนช่วยเอากระเป๋ามาให้หน่อยได้ไหม',"Of course. I'll bring it to you.","Of course. I'll buy a new bag.","Of course. I'll bring it tomorrow.",'เพื่อนขอให้เอากระเป๋ามาให้ ให้รับปากว่าจะเอามาให้',"Good! Of course. I'll bring it to you. agrees to help. | bring = นำมา, after class = หลังเลิกเรียน")]),
 NPCDEF('kim','Kim','Student with a stomachache⁣นักเรียนที่ปวดท้อง',2.3,1.4,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("I have a stomachache.",'ฉันปวดท้อง',"Oh no. Did you tell the nurse?","Oh no. Let's eat spicy food.","I have a headache.",'เพื่อนปวดท้อง ให้ถามว่าบอกครูพยาบาลหรือยัง',"Good! Ask if your friend told the nurse. A stomachache is a pain in your stomach. | stomachache = ปวดท้อง, headache = ปวดหัว"),
  TT("Yes. She gave me some medicine.",'บอกแล้ว ครูให้ยามาแล้ว',"Good. You should rest now.","Good. Let's run a race now.","Good. You should take more medicine.",'ครูให้ยาแล้ว ให้แนะนำให้พักผ่อน',"Right! Should gives advice. Rest means stop and relax. | should = ควร, rest = พัก"),
  TT("I want to call my mom.",'ฉันอยากโทรหาแม่',"You can ask the nurse to call her.","You can call me Mom.","You can call the police.",'เพื่อนอยากโทรหาแม่ ให้แนะนำให้ขอครูพยาบาลช่วยโทร',"Good! Ask the nurse to call means the nurse makes the call. | ask ... to ... = ขอให้...ทำ..., call = โทรหา")]),
 NPCDEF('tee2','Mr. Tee','PE teacher⁣ครูพลศึกษา',2.4,3.5,Math.PI,[.95,.95,.95],[.15,.2,.45],[.08,.06,.07],'cap',[
  TT("Where is Jo? Is he OK?",'Jo อยู่ไหน เขาเป็นอะไรไหม',"He's on the bed. The nurse put ice on his ankle.","He's on the bus. He's going home.","He's in the canteen. He's eating lunch.",'ครูถามว่า Jo อยู่ไหน ให้บอกที่อยู่และสิ่งที่ครูพยาบาลทำ',"Correct! Jo is on the bed with ice on his ankle. | on the bed = บนเตียง, put (อดีต) = วาง ประคบ"),
  TT("Did he fall on the field?",'เขาล้มในสนามเหรอ',"Yes, he did. He fell when he was running.","Yes, he does. He runs every day.","No, I didn't.",'ถามด้วย Did he ...? ให้ตอบ Yes, he did. แล้วเล่าเหตุการณ์',"Right! Answer Did he ...? with Yes, he did. Fell is the past of fall. | fall → fell (ล้ม), when he was running = ตอนที่เขากำลังวิ่ง"),
  TT("Thank you for bringing him here.",'ขอบใจนะที่พาเขามา',"No problem, sir.","No, thank you. I'm tired.","No problem, ma'am.",'ครูขอบคุณ ให้ตอบว่าไม่เป็นไร',"Polite! No problem, sir. answers a teacher's thanks. | No problem. = ไม่เป็นไร, sir = ใช้เรียกครูผู้ชายอย่างสุภาพ")])]});
