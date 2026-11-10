/* ===== Our school: Science Lab (ST-CNT-006 V1.0, 3 Nov). Reached from the Building 3 corridor; no room number.
   Spots from the spec: A demonstration table (Ms. Dara), B equipment cabinet on the left wall (Mr. Kiet),
   C experiment table row 1 (Nicha), D experiment table row 3 (Tonkla). Only water, a leaf and simple equipment.
   Low side and back walls (cut away) so the 360-degree camera can see inside. NPC names are made up. ===== */
SCENES.push({id:'scilab',name:'Science Lab · Phibun School',th:'ห้องปฏิบัติการวิทยาศาสตร์',color:'#EA580C',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[1,-1.6,0]}],/* the door leads back to the Building 3 corridor */
 build(){const c=mk();
  const WALL=[.93,.92,.88],CAP=[.62,.5,.36],TOP=[.2,.22,.25],BODY=[.86,.86,.82],STOOL=[.3,.5,.72],GLASS=[.72,.88,.95];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.9,.9,.88]:[.8,.82,.82]);
  /* front wall (full height) with whiteboard and the safety poster */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1.2,1.55,-4.83,4.2,1.2,.04,[.55,.56,.6]);c.box(-1.2,1.55,-4.8,4,1.06,.04,[.98,.98,.98]);
  c.box(3.6,1.5,-4.83,2.2,1.4,.04,[.9,.4,.15]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: demonstration table at the front, with a leaf, a beaker and goggles */
  c.box(-1.2,.45,-3.3,2.8,.9,.9,BODY,true);c.box(-1.2,.92,-3.3,2.9,.05,1,TOP);
  c.box(-2.1,.98,-3.3,.34,.03,.2,[.2,.62,.25]);c.box(-1.3,1.06,-3.3,.22,.22,.22,GLASS);c.box(-.4,.98,-3.25,.36,.06,.16,[.15,.15,.18]);
  /* sink in the front right corner */
  c.box(5.3,.45,-3.9,1.2,.9,1.4,BODY,true);c.box(5.3,.92,-3.9,1.25,.05,1.45,TOP);c.box(5.3,.93,-3.9,.7,.03,.8,[.7,.74,.78]);c.box(5.75,1.15,-3.9,.06,.4,.06,[.7,.72,.75]);
  /* B: equipment cabinet on the left wall: glass doors, beakers and test tubes on the shelves */
  c.box(-5.75,1,.9,.7,2,2.6,[.8,.8,.76],true);c.box(-5.38,1.05,.9,.04,1.7,2.4,GLASS);
  for(const y of [.6,1.1,1.6])c.box(-5.42,y,.9,.06,.04,2.4,[.6,.6,.58]);
  for(let k=0;k<6;k++){c.box(-5.55,.72,-.05+k*.38,.16,.2,.16,GLASS);c.box(-5.55,1.25,-.05+k*.38,.06,.26,.06,k%2?[.6,.9,.6]:[.6,.8,.95])}
  /* C/D: three rows of experiment tables, two tables per row, stools on the far side */
  const bench=(x,z)=>{c.box(x,.45,z,3.2,.9,.9,BODY,true);c.box(x,.92,z,3.3,.05,1,TOP);
   for(const dx of [-1,0,1])c.box(x+dx,.33,z-.75,.34,.06,.34,STOOL)};
  for(const z of [-1.2,.8,2.8])for(const x of [-2.2,2.4])bench(x,z);
  /* row 1: a microscope and a measuring cup; row 3: a beaker */
  c.box(-1.2,1.1,-1.2,.18,.3,.22,[.2,.22,.28]);c.box(-1.2,1.3,-1.25,.08,.2,.08,[.2,.22,.28]);c.box(-1.2,.97,-1.2,.3,.05,.3,[.2,.22,.28]);
  c.box(-2.2,1.05,-1.2,.2,.22,.2,GLASS);c.box(1.6,1.05,2.8,.2,.22,.2,GLASS);
  /* D: spilled water on the floor near row 3 */
  c.box(.1,.065,3.75,1,.01,.6,[.55,.75,.95]);c.box(.5,.066,3.55,.4,.01,.3,[.55,.75,.95]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1.2,y:1.55,z:-4.77,w:3.9,h:1.02,ry:0,cw:700,ch:184,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#c2410c';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Science Lab · ห้องปฏิบัติการวิทยาศาสตร์',26,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Today: Observe a leaf.',26,100);g.fillText('วันนี้: สังเกตใบไม้',26,148)}},
  {x:3.6,y:1.5,z:-4.77,w:2.1,h:1.3,ry:0,cw:420,ch:260,draw:(g,W,H)=>{g.fillStyle='#fff7ed';g.fillRect(0,0,W,H);g.fillStyle='#ea580c';g.fillRect(0,0,W,46);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 28px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Lab safety · ความปลอดภัย',W/2,24);
   g.textAlign='left';const L=[['Wear safety goggles.','สวมแว่นตานิรภัย'],['Do not touch broken glass. Tell the teacher.','อย่าแตะเศษแก้ว ให้บอกครู'],['Keep the work area clear.','รักษาพื้นที่ทดลองให้โล่งและเป็นระเบียบ']];
   L.forEach(([e,t],k)=>{const y=78+k*64;g.fillStyle='#111827';let f=22;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,14,y);
    g.fillStyle='#4b5563';f=20;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>13){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,14,y+26)})}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('dara','Ms. Dara','Science teacher⁣ครูวิทยาศาสตร์',0.9,-3.4,0,[0.97, 0.97, 0.97],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("Before we start, what should you wear to protect your eyes?","ก่อนเริ่มทดลอง เธอควรสวมอะไรเพื่อป้องกันดวงตา","I should wear safety goggles.","I should bring my English book.","I should wear my sports shoes.","นึกถึงอุปกรณ์ที่ใช้ป้องกันดวงตาในห้องทดลอง","Correct! Safety goggles help protect your eyes. | ถูกต้อง แว่นตานิรภัยช่วยป้องกันดวงตา"),
  TT("Please look at this leaf. What colour is it?","ดูใบไม้นี้สิ ใบไม้มีสีอะไร","It is green.","It is a ruler.","It is on the table.","คำถามถามสีของใบไม้ ไม่ใช่ชื่อสิ่งของหรือสถานที่","Good observation! The leaf is green. | สังเกตได้ดี ใบไม้มีสีเขียว"),
  TT("We have looked at the leaf. What should you do next?","เราสังเกตใบไม้แล้ว เธอควรทำอะไรต่อ","I should write down what I see.","I should ask for a football.","I should go to the school canteen.","คิดถึงการจดบันทึกสิ่งที่สังเกตพบ","Well done! Recording observations is part of science. | ทำได้ดี การบันทึกสิ่งที่สังเกตเป็นส่วนหนึ่งของวิทยาศาสตร์")]),
 NPCDEF('kiet','Mr. Kiet','Lab assistant⁣ผู้ช่วยครูห้องปฏิบัติการ',-5.0,0.9,Math.PI/2,[0.97, 0.97, 0.97],[0.25, 0.25, 0.3],[0.1, 0.08, 0.07],'',[
  TT("Hello! What equipment do you need for the water activity?","สวัสดี ต้องการอุปกรณ์อะไรสำหรับกิจกรรมเกี่ยวกับน้ำ","May I have a beaker, please?","May I borrow a football, please?","May I have a paintbrush, please?","เลือกคำขออุปกรณ์ที่ใช้ใส่น้ำในห้องทดลอง","Of course. Here is a clean beaker. | ได้เลย นี่คือบีกเกอร์สะอาด"),
  TT("The beaker is ready. How will you carry it?","บีกเกอร์พร้อมแล้ว เธอจะถืออย่างไร","I will carry it carefully with both hands.","I will read a story about it.","I will put it on my homework page.","ตอบวิธีถืออุปกรณ์ให้มั่นคงและระมัดระวัง","Good choice! Carry equipment carefully. | เลือกได้ดี ควรถืออุปกรณ์อย่างระมัดระวัง"),
  TT("You have finished using the beaker. What should you do now?","ใช้บีกเกอร์เสร็จแล้ว ตอนนี้ควรทำอะไร","I should return it to the equipment area.","I should draw a picture of the playground.","I should ask about the lunch menu.","คิดถึงการเก็บอุปกรณ์หลังใช้งาน","Thank you! Put the used equipment in the place the teacher tells you. | ขอบใจ ให้วางอุปกรณ์ที่ใช้แล้วในจุดที่ครูบอก")]),
 NPCDEF('nicha','Nicha','Lab partner⁣เพื่อนคู่ทดลอง',0.1,-1.2,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Can you see the leaf sample through the microscope?","เธอมองเห็นตัวอย่างใบไม้ผ่านกล้องจุลทรรศน์ไหม","Yes, I can see the leaf sample.","Yes, I can hear the school bell.","Yes, I can play the guitar.","เพื่อนถามว่าเห็นตัวอย่างผ่านกล้องหรือไม่","Great! We can take turns looking at the sample. | เยี่ยมเลย เราผลัดกันดูตัวอย่างได้"),
  TT("Can you help me measure the water for our activity?","ช่วยฉันวัดปริมาณน้ำสำหรับกิจกรรมได้ไหม","Sure. Let's use the measuring cup.","Sure. Let's open the classroom window.","Sure. Let's read the school timetable.","เพื่อนขอให้ช่วยวัดปริมาณน้ำ","Thank you! We will follow the teacher's instructions. | ขอบใจ เราจะทำตามคำแนะนำของครู"),
  TT("Our activity is finished. What should we write in our notebook?","กิจกรรมเสร็จแล้ว เราควรเขียนอะไรลงในสมุด","Let's write down what we observed.","Let's write down the football score.","Let's write down the lunch menu.","เลือกสิ่งที่เกี่ยวกับผลจากการทดลองที่เพิ่งทำ","Exactly! Write what we really observed. | ใช่เลย เขียนสิ่งที่เราสังเกตเห็นจริง")]),
 NPCDEF('tonkla','Tonkla','Student reporting a spill⁣เพื่อนที่แจ้งเหตุ',0.1,2.8,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("Oh no! I spilled water near our table. What should I do?","แย่แล้ว ฉันทำน้ำหกใกล้โต๊ะทดลอง ควรทำอย่างไร","Let's tell the teacher right away.","Let's finish our worksheet first.","Let's talk about the weekend.","มีน้ำหกในบริเวณทดลอง ควรแจ้งผู้ดูแลทันที","That is safe. Tell the teacher and keep away from the wet area. | ปลอดภัยดี บอกครูและอยู่ห่างจากบริเวณที่เปียก"),
  TT("I dropped a glass test tube. It broke. What should I do?","ฉันทำหลอดทดลองแก้วตกแตก ควรทำอย่างไร","Don't touch the broken glass. Tell the teacher.","Can we use the microscope now?","Is it time for lunch?","เมื่อแก้วแตก อย่าแตะเศษแก้ว และต้องบอกครู","Correct. Stay back and let the teacher handle the broken glass. | ถูกต้อง ถอยห่างและให้ครูจัดการเศษแก้ว"),
  TT("The teacher is coming to check the area. What should we do?","ครูกำลังมาตรวจบริเวณที่เกิดเหตุ เราควรทำอย่างไร","Let's step back and give the teacher space.","Let's ask about tomorrow's homework.","Let's look at the plants outside.","ควรถอยห่างเพื่อให้ครูตรวจบริเวณที่เกิดเหตุได้สะดวก","Good. Keep a safe distance and follow the teacher's directions. | ดีมาก อยู่ในระยะปลอดภัยและทำตามคำสั่งครู")])]});

