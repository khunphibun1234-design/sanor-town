/* ===== Our school: English Language Lab (ST-CNT-008 V1.0, 3 Nov). Reached from the Building 3 corridor; no room number.
   Spots from the spec: A listening station at the front (Ms. Narin), B headphone shelf (Faii), C pair-speaking desk (Oat),
   D recording and playback station (Yuii). Recording is a made-up lesson context: the game does not record voice. NPC names are made up. ===== */
SCENES.push({id:'englab',name:'English Language Lab · Phibun School',th:'ห้องปฏิบัติการภาษาอังกฤษ',color:'#D97706',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[-4,-1.6,0]}],/* the door leads back to the Building 3 corridor (north side) */
 build(){const c=mk();
  const WALL=[.95,.93,.86],CAP=[.62,.5,.36],DESK=[.9,.88,.82],BODY=[.7,.72,.75],SCR=[.12,.14,.18],GLOW=[.45,.7,.95],PART=[.98,.8,.35],CHAIR=[.2,.3,.45];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.9,.88,.8]:[.82,.8,.72]);
  /* front wall (full height) with a whiteboard and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1,1.55,-4.83,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-4.8,4.2,1.1,.04,[.98,.98,.98]);
  c.box(3.7,1.5,-4.83,2.1,1.35,.04,[.85,.55,.05]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: the teacher's listening console at the front: screen, two speakers */
  c.box(-1,.4,-3.3,2.6,.8,.8,BODY,true);c.box(-1,.82,-3.3,2.7,.05,.9,DESK);
  c.box(-1,1.1,-3.5,.8,.5,.06,SCR);c.box(-1,1.1,-3.46,.7,.4,.02,GLOW);c.box(-2.1,1.0,-3.4,.28,.36,.28,[.2,.2,.22]);c.box(.1,1.0,-3.4,.28,.36,.28,[.2,.2,.22]);
  /* B: headphone shelf on the left wall */
  c.box(-5.75,1,.9,.6,2,2.6,[.8,.78,.72],true);
  for(const y of [.6,1.1,1.6]){c.box(-5.45,y,.9,.04,.04,2.4,[.6,.58,.55]);for(let k=0;k<5;k++)c.box(-5.5,y+.14,-.05+k*.48,.14,.24,.3,k%2?[.15,.35,.75]:[.2,.2,.24])}
  /* C: language booths: two rows of desks with screens, headsets and low dividers; stools on the far side */
  const booth=(x,z)=>{c.box(x,.38,z,2.8,.76,.8,BODY,true);c.box(x,.78,z,2.9,.05,.9,DESK);
   for(const dx of [-.7,.7]){c.box(x+dx,1.02,z-.25,.5,.36,.04,SCR);c.box(x+dx,1.02,z-.22,.44,.3,.01,GLOW);c.box(x+dx+.3,.84,z+.12,.18,.06,.18,[.15,.35,.75]);c.box(x+dx,.44,z+.62,.38,.06,.38,CHAIR)}
   c.box(x,.98,z-.05,.04,.36,.7,PART)};
  for(const z of [-1.2,1.2])for(const x of [-2.4,2])booth(x,z);
  /* D: recording and playback station on the right wall: screen, a microphone on a stand */
  c.box(5.3,.38,-.6,1.1,.76,2.2,BODY,true);c.box(5.3,.78,-.6,1.2,.05,2.3,DESK);
  c.box(5.6,1.08,-.6,.06,.5,.8,SCR);c.box(5.56,1.08,-.6,.02,.42,.72,GLOW);
  c.box(5.1,.95,-1.3,.04,.3,.04,[.3,.3,.32]);c.box(5.1,1.13,-1.3,.1,.14,.1,[.25,.25,.28]);c.box(5.1,.82,-1.3,.2,.03,.2,[.3,.3,.32]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-4.77,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#b45309';let f=40;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";const t='English Language Lab · ห้องปฏิบัติการภาษาอังกฤษ';while(g.measureText(t).width>W-40&&f>24){f-=2;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,22,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Today: Listen, speak, listen back.',22,100);g.fillText('วันนี้: ฟัง พูด และฟังซ้ำ',22,148)}},
  {x:3.7,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#fffbeb';g.fillRect(0,0,W,H);g.fillStyle='#d97706';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Keep the volume low.','ใช้ระดับเสียงไม่ดังเกินไป'],['Ask for help with equipment.','ขอความช่วยเหลือเมื่ออุปกรณ์มีปัญหา'],['Put headphones back carefully.','เก็บหูฟังคืนอย่างระมัดระวัง']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>16){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>14){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('narinlab','Ms. Narin','English lab teacher⁣ครูประจำห้องปฏิบัติการภาษาอังกฤษ',0.9,-3.4,0,[0.3, 0.5, 0.85],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("Welcome to the English lab. Are you ready to listen?","ยินดีต้อนรับสู่ห้องปฏิบัติการภาษาอังกฤษ เธอพร้อมฝึกฟังหรือยัง","Yes, I'm ready to listen.","No, I'm ready to eat.","Yes, I'm ready to draw.","ครูถามเรื่องความพร้อมในการฝึกฟัง ให้ตอบตรงกับกิจกรรม","Great! You are ready to practise listening. | ดีมาก เธอพร้อมฝึกทักษะการฟังแล้ว"),
  TT("Please listen to the short recording two times.","กรุณาฟังเสียงบันทึกสั้น ๆ สองครั้ง","OK, I'll listen twice.","OK, I'll listen once.","OK, I'll read twice.","สังเกตว่าครูให้ฟังสองครั้ง ไม่ใช่อ่านหรือฟังครั้งเดียว","Correct! You will listen two times. | ถูกต้อง เธอจะฟังเสียงสองครั้ง"),
  TT("You didn't hear the last word. What can you ask me?","เธอฟังคำสุดท้ายไม่ทัน จะขอให้ครูเปิดซ้ำอย่างไร","Could you play it again, please?","Could you close the window, please?","Could you write my name, please?","ต้องขอให้เปิดเสียงซ้ำอย่างสุภาพ","Well done! That is a polite replay request. | ยอดเยี่ยม นี่คือการขอฟังซ้ำอย่างสุภาพ")]),
 NPCDEF('faii','Faii','Equipment helper⁣นักเรียนผู้ช่วยดูแลอุปกรณ์',-5.0,0.9,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("The recording is ready. What should you put on?","เสียงบันทึกพร้อมแล้ว เธอควรสวมอุปกรณ์อะไร","I'll put on my headphones.","I'll put on my school bag.","I'll put on my notebook.","เลือกอุปกรณ์สำหรับฟังเสียงส่วนตัว","Yes! Headphones help you hear the recording. | ใช่แล้ว หูฟังช่วยให้เธอได้ยินเสียงบันทึก"),
  TT("The sound is too loud. What should you do?","เสียงดังเกินไป เธอควรทำอย่างไร","I'll turn the volume down.","I'll turn the volume up.","I'll turn the screen off.","เมื่อเสียงดังเกินไปต้องลดระดับเสียง","Good choice! Lower volume is more comfortable. | เลือกได้ดี การลดเสียงช่วยให้ฟังสบายขึ้น"),
  TT("The headphones are not working. What will you say?","หูฟังใช้งานไม่ได้ เธอจะพูดว่าอย่างไร","Could you help me, please?","Could you give me some rice, please?","Could you show me the football field?","ขอความช่วยเหลือจากผู้ดูแลอุปกรณ์ ไม่ต้องซ่อมเอง","Exactly! Ask for help instead of fixing equipment yourself. | ถูกต้อง ขอความช่วยเหลือแทนการซ่อมอุปกรณ์ด้วยตนเอง")]),
 NPCDEF('oatlab','Oat','Speaking partner⁣เพื่อนคู่ฝึกพูด',-0.4,-1.2,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("Let's practise speaking together. Would you like to go first?","มาฝึกพูดด้วยกันนะ เธออยากเริ่มพูดก่อนหรือไม่","Yes, I'll go first.","Yes, I'll go outside.","No, I'll take your pencil.","เพื่อนชวนให้พูดก่อน ให้ตอบเรื่องลำดับการพูด","Nice! You are ready to take the first turn. | ดีมาก เธอพร้อมเป็นผู้พูดคนแรก"),
  TT("I can't hear your words well. Can you speak more clearly?","ฉันได้ยินคำพูดของเธอไม่ชัด เธอช่วยพูดให้ชัดขึ้นได้ไหม","Sure, I'll speak more clearly.","Sure, I'll write more quickly.","Sure, I'll walk more slowly.","เพื่อนต้องการให้พูดชัดขึ้น ไม่ใช่ทำกิจกรรมอื่น","Great! Clear speech helps your partner understand. | ดีมาก การพูดชัดช่วยให้เพื่อนเข้าใจ"),
  TT("Which word has a long \"ee\" sound: \"ship\" or \"sheep\"?","คำไหนออกเสียงอียาว ระหว่าง ship กับ sheep","Sheep has the long \"ee\" sound.","Ship has the long \"ee\" sound.","Shop has the long \"ee\" sound.","ship ออกเสียงอิสั้น sheep ออกเสียงอียาว","Good! Sheep has a long \"ee\" sound. | ถูกต้อง sheep ออกเสียงอียาว")]),
 NPCDEF('yuii','Yuii','Speaking partner⁣เพื่อนคู่ฝึกพูด',4.3,-0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Now it's your turn. What will you say to me?","ตอนนี้ถึงตาเธอแล้ว เธอจะพูดอะไรให้ฉันฟัง","I'll say one short sentence.","I'll make a long video.","I'll tell you my lunch order.","ภารกิจนี้คือพูดประโยคสั้น ๆ หนึ่งประโยคให้เพื่อนฟัง ไม่ใช่ทำวิดีโอ","Correct! One short sentence is enough for this task. | ถูกต้อง พูดหนึ่งประโยคสั้น ๆ ก็เพียงพอ"),
  TT("After you speak, how can you check your speaking?","หลังจากพูดแล้ว เธอจะตรวจการพูดของตนเองอย่างไร","I'll ask my partner if I spoke clearly.","I'll look at the wall while I wait.","I'll clean my shoes after class.","ขอให้เพื่อนช่วยฟังและบอกว่าพูดชัดไหม","Excellent! Feedback from a partner helps you notice your speech. | ยอดเยี่ยม คำแนะนำจากเพื่อนช่วยให้สังเกตการพูดของตนเอง"),
  TT("We've finished. How will you leave the headphones?","กิจกรรมเสร็จแล้ว เธอจะจัดเก็บหูฟังอย่างไร","I'll put them back carefully.","I'll leave them on the floor.","I'll throw them on the desk.","ควรวางอุปกรณ์คืนอย่างระมัดระวัง","Thank you! You take good care of shared equipment. | ขอบคุณ เธอดูแลอุปกรณ์ส่วนรวมอย่างดี")])]});

