/* ===== Our school: Student Council Room (ST-CNT-007 V1.0, 3 Nov). Reached from the Building 3 corridor; no room number.
   Spots from the spec: A table near the front (Ms. Rada), B notice board by the door (Tawan), C group discussion table (Baitoey),
   D supply table (Phu). The idea board and practice meeting are made up for the game; NPC names are made up. ===== */
SCENES.push({id:'council',name:'Student Council Room · Phibun School',th:'ห้องสภานักเรียน',color:'#7C3AED',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[-6.5,1.6,Math.PI]}],/* the door leads back to the Building 3 corridor (south side) */
 build(){const c=mk();
  const WALL=[.95,.93,.88],CAP=[.62,.5,.36],WOOD=[.62,.44,.28],WOOD2=[.52,.36,.22],CHAIR=[.45,.3,.6],LEG=[.42,.44,.48];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.88,.85,.9]:[.8,.77,.84]);
  /* front wall (full height) with the idea board and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1,1.55,-4.83,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-4.8,4.2,1.1,.04,[.98,.98,.98]);
  c.box(3.7,1.5,-4.83,2.1,1.35,.04,[.55,.24,.85]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: the adviser's table at the front, with papers and a pen cup */
  c.box(-1,.38,-3.3,2.4,.76,.8,WOOD2,true);c.box(-1,.78,-3.3,2.5,.05,.9,WOOD);
  c.box(-1.6,.83,-3.3,.5,.04,.36,[.97,.97,.95]);c.box(-.4,.88,-3.3,.14,.16,.14,[.3,.3,.35]);
  /* B: notice board on a stand by the door (faces into the room) */
  c.box(2.4,1.25,4.6,2,1.3,.08,[.6,.42,.26],true);c.box(2.4,1.25,4.55,1.85,1.15,.02,[.83,.67,.45]);
  c.box(1.5,.3,4.6,.08,.6,.08,LEG);c.box(3.3,.3,4.6,.08,.6,.08,LEG);
  /* C: group discussion table with six chairs */
  c.box(-2.6,.38,.6,3.2,.76,1.6,WOOD2,true);c.box(-2.6,.78,.6,3.3,.05,1.7,WOOD);
  for(const dx of [-1,0,1]){c.box(-2.6+dx,.44,-.6,.44,.06,.42,CHAIR);c.box(-2.6+dx,.7,-.8,.44,.46,.05,CHAIR);
   c.box(-2.6+dx,.44,1.8,.44,.06,.42,CHAIR);c.box(-2.6+dx,.7,2,.44,.46,.05,CHAIR)}
  c.box(-3.2,.82,.4,.6,.03,.42,[.98,.98,.92]);c.box(-2.2,.82,.8,.5,.03,.36,[.98,.9,.5]);c.box(-1.7,.82,.3,.42,.03,.3,[.6,.85,.95]);
  /* D: supply table on the right wall: blue and other paper, pens, tape, a rolled poster */
  c.box(5.3,.38,-.6,1.1,.76,2.6,WOOD2,true);c.box(5.3,.78,-.6,1.2,.05,2.7,WOOD);
  c.box(5.3,.84,-1.5,.6,.08,.42,[.2,.4,.85]);c.box(5.3,.84,-.9,.6,.06,.42,[.95,.6,.7]);c.box(5.2,.86,-.2,.12,.12,.12,[.3,.3,.35]);
  c.box(5.45,.84,.3,.2,.06,.2,[.9,.8,.3]);c.box(5.3,.86,.55,.14,.14,.6,[.98,.98,.95]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-4.77,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#6d28d9';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Student Council Room · ห้องสภานักเรียน',24,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Our Idea Board',24,100);g.fillText('บอร์ดเสนอความคิดเห็น',24,148)}},
  {x:3.7,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#f5f3ff';g.fillRect(0,0,W,H);g.fillStyle='#7c3aed';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Listen to each other.','รับฟังกันและกัน'],['Share your ideas.','แบ่งปันความคิดเห็น'],['Be kind and helpful.','มีน้ำใจและช่วยเหลือกัน']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';g.font="700 26px Anuphan, sans-serif";g.fillText(e,16,y);
    g.fillStyle='#4b5563';g.font="600 22px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(t,16,y+28)})}},
  {x:2.4,y:1.25,z:4.53,w:1.8,h:1.1,ry:Math.PI,cw:400,ch:244,draw:(g,W,H)=>{g.fillStyle='#d6b17a';g.fillRect(0,0,W,H);
   g.fillStyle='#fff';g.fillRect(24,22,200,130);g.fillStyle='#fde68a';g.fillRect(244,30,132,100);g.fillStyle='#bfdbfe';g.fillRect(60,168,150,60);g.fillStyle='#fbcfe8';g.fillRect(230,150,140,76);
   g.fillStyle='#111827';g.textAlign='center';g.textBaseline='middle';g.font="700 28px Anuphan, sans-serif";g.fillText('NOTICE',124,52);
   g.font="600 22px Anuphan, sans-serif";g.fillText('Practice meeting',124,92);g.font="700 30px Anuphan, sans-serif";g.fillText('8:30',124,128);
   g.font="700 20px Anuphan, sans-serif";g.fillText('Ideas',310,80)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('rada','Ms. Rada','Teacher adviser⁣ครูที่ปรึกษากิจกรรม',0.9,-3.4,0,[0.55, 0.35, 0.75],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("Good morning. Are you here to help with our idea board?","สวัสดีตอนเช้า เธอมาช่วยทำบอร์ดเสนอความคิดเห็นของพวกเราหรือเปล่า","Yes, I'd like to help.","Yes, I'd like some lunch.","Yes, I'd like to go home.","ภารกิจนี้คือมาช่วยทำบอร์ด ให้ตอบรับว่าอยากช่วย","Great! You politely offer to help with the idea board. | ดีมาก เธอตอบรับอย่างสุภาพว่าต้องการช่วยทำบอร์ด"),
  TT("Please read the notice before you start.","กรุณาอ่านประกาศก่อนเริ่มลงมือ","OK. I'll read it first.","OK. I'll draw on it now.","OK. I'll close the door.","สังเกตคำว่า read และ before you start: ต้องอ่านประกาศก่อน","Good! You will read the notice before starting. | ดีมาก เธอจะอ่านประกาศก่อนเริ่มทำงาน"),
  TT("What should we do when someone shares an idea?","เมื่อมีคนเสนอความคิดเห็น เราควรทำอย่างไร","We should listen to each other.","We should talk at the same time.","We should leave the room.","คิดถึงการรับฟังเพื่อนเมื่อเพื่อนกำลังพูด","Exactly! Listening helps everyone share ideas. | ถูกต้อง การฟังช่วยให้ทุกคนได้แสดงความคิดเห็น")]),
 NPCDEF('tawan','Tawan','Notice board helper⁣นักเรียนช่วยจัดป้ายประกาศ',2.4,3.9,Math.PI,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("Can you help me put this notice on the board?","เธอช่วยฉันติดประกาศนี้บนบอร์ดได้ไหม","Sure. I can help you.","I need a glass of water.","I can't find my shoes.","เพื่อนขอความช่วยเหลือ ให้ตอบรับอย่างสุภาพ","Nice! You accept a request for help politely. | ดีมาก เธอตอบรับคำขอความช่วยเหลืออย่างสุภาพ"),
  TT("Where should we write the meeting time?","เราควรเขียนเวลาประชุมไว้ที่ไหน","Let's write it on the notice.","Let's write it under the chair.","Let's leave the time out.","เวลาประชุมควรอยู่ในจุดที่คนอ่านประกาศมองเห็น","Right! The meeting time belongs on the notice. | ถูกต้อง ควรเขียนเวลาประชุมไว้บนประกาศ"),
  TT("The notice says 8:30. Is that right?","ประกาศเขียนว่า 8:30 ถูกต้องไหม","Yes, it says eight thirty.","No, it says ten thirty.","Yes, it says nine thirty.","ดูเวลา 8:30 และอ่านว่า eight thirty","Correct! Eight thirty is 8:30. | ถูกต้อง Eight thirty คือเวลา 8:30")]),
 NPCDEF('baitoey','Baitoey','Idea activity helper⁣นักเรียนช่วยรวบรวมแนวคิด',-0.6,0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("What is one helpful idea for our classroom?","มีข้อเสนออะไรสักอย่างที่ช่วยห้องเรียนของเราได้บ้าง","Let's keep our classroom clean.","Let's eat lunch right now.","Let's go home right now.","เลือกแนวคิดที่ช่วยให้ห้องเรียนดีขึ้น","Good idea! A clean classroom helps everyone. | เป็นความคิดที่ดี ห้องเรียนสะอาดเป็นประโยชน์ต่อทุกคน"),
  TT("How can other students see our classroom idea?","เราจะทำให้นักเรียนคนอื่นเห็นข้อเสนอของเราได้อย่างไร","We can put it on the notice board.","We can hide it in a drawer.","We can keep it a secret.","ถ้าต้องการให้คนอื่นเห็น ต้องติดไว้ในที่เปิดเผย","Yes! A notice board helps students see the idea. | ใช่แล้ว ป้ายประกาศช่วยให้เพื่อนเห็นข้อเสนอ"),
  TT("Can everyone share an idea in our practice meeting?","ทุกคนสามารถเสนอความคิดเห็นในการประชุมฝึกซ้อมของเราได้ไหม","Yes, everyone can share an idea.","Only the teacher can speak.","No one can share an idea.","การประชุมฝึกซ้อมนี้เปิดโอกาสให้ทุกคนเสนอความคิด","Great! Everyone can take part in the discussion. | ดีมาก ทุกคนมีส่วนร่วมในการอภิปรายได้")]),
 NPCDEF('phu','Phu','Materials helper⁣นักเรียนช่วยเตรียมอุปกรณ์',4.3,-0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("We need two pens for the poster. Can you help?","เราต้องการปากกาสองด้ามสำหรับโปสเตอร์ เธอช่วยได้ไหม","Sure. I'll get two pens.","Sure. I'll get two chairs.","Sure. I'll get two cups.","ฟังจำนวนและสิ่งของให้ครบ: two pens","Perfect! You understood the item and number. | ยอดเยี่ยม เธอฟังเข้าใจทั้งชนิดสิ่งของและจำนวน"),
  TT("Please pass me the blue paper.","ช่วยส่งกระดาษสีน้ำเงินให้หน่อย","Here you are.","Here is a red pen.","I don't have a ruler.","เพื่อนขอให้ส่งของให้ คำตอบสุภาพที่ใช้เมื่อยื่นของคืออะไร","Well done! Here you are is polite when giving something. | ดีมาก Here you are เป็นสำนวนสุภาพเมื่อส่งสิ่งของให้ผู้อื่น"),
  TT("The poster is ready. What should we do next?","โปสเตอร์เสร็จแล้ว เราควรทำอะไรต่อ","Let's show it to our teacher.","Let's put it in the bin.","Let's hide it under the desk.","เมื่อทำโปสเตอร์เสร็จ ควรให้ครูตรวจดู","Good choice! The teacher can check the finished poster. | เลือกได้ดี ครูจะได้ตรวจดูโปสเตอร์ที่ทำเสร็จแล้ว")])]});

