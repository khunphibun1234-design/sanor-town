/* ===== Our school: Lost and Found (ST-CNT-014 V1.0, 4 Nov). Reached from the Building 3 corridor (south-side door); no room number.
   Spots from the spec: A receiving desk by the entrance (Ms. Busaba), B found-item hand-in counter (Khem),
   C found box beside the desk (Duen), D label and return shelf (Tula). Honest returns only: no money, phones or personal details.
   NPC names are made up. ===== */
SCENES.push({id:'lostfound',name:'Lost and Found · Phibun School',th:'จุดรับแจ้งของหาย',color:'#14A86B',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[8.5,1.6,Math.PI]}],/* the door leads back to the Building 3 corridor (south side) */
 build(){const c=mk();
  const WALL=[.95,.95,.9],CAP=[.4,.55,.45],WOOD=[.7,.52,.34],WOOD2=[.58,.42,.27],LEG=[.4,.4,.42],SHELF=[.62,.66,.72];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.88,.92,.88]:[.8,.86,.81]);
  /* front wall (full height) with a whiteboard and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(1.2,1.6,-4.83,3.8,1.05,.04,[.55,.56,.6]);c.box(1.2,1.6,-4.8,3.6,.9,.04,[.98,.98,.98]);
  c.box(4.5,1.5,-4.83,2.1,1.35,.04,[.1,.55,.35]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: receiving desk by the entrance with a report form, a pen cup and a small bell */
  c.box(1.6,.38,2.6,2.4,.76,.8,WOOD2,true);c.box(1.6,.78,2.6,2.5,.05,.9,WOOD);
  c.box(1.2,.81,2.65,.6,.02,.42,[.98,.98,.95]);for(let k=0;k<3;k++)c.box(1.2,.825,2.5+k*.12,.46,.005,.03,[.6,.65,.75]);
  c.box(2.2,.88,2.6,.14,.16,.14,[.3,.3,.35]);c.box(2.6,.84,2.7,.18,.08,.18,[.85,.7,.2]);
  /* C: found box beside the desk: an open crate with caps and a water bottle */
  c.box(-.4,.35,2.6,1.2,.7,.8,[.78,.6,.38],true);c.box(-.4,.69,2.6,1.1,.02,.7,[.55,.4,.25]);
  c.box(-.75,.78,2.5,.36,.16,.3,[.2,.6,.3]);c.box(-.75,.74,2.3,.36,.04,.16,[.2,.6,.3]);
  c.box(-.25,.78,2.75,.36,.16,.3,[.96,.96,.96]);c.box(-.25,.74,2.95,.36,.04,.16,[.96,.96,.96]);
  c.box(.05,.86,2.45,.14,.34,.14,[.3,.6,.9]);
  /* B: found-item hand-in counter on the right wall with a tray and a lunch box with a star sticker */
  c.box(5.3,.5,.6,1.1,1,2.4,[.75,.8,.85],true);c.box(5.3,1.02,.6,1.2,.05,2.5,WOOD);
  c.box(5.2,1.06,.1,.8,.04,.6,[.35,.4,.45]);c.box(5.2,1.13,1.1,.5,.16,.36,[.95,.45,.3]);c.box(5.2,1.215,1.1,.16,.01,.16,[1,.85,.1]);
  /* D: label and return shelf on the front wall with a labelled ruler and a few named items */
  c.box(-3.6,.8,-4.5,2.8,1.6,.5,SHELF,true);for(let i=0;i<3;i++)c.box(-3.6,.25+i*.55,-4.3,2.7,.04,.4,[.5,.54,.6]);
  c.box(-4.3,.88,-4.3,.9,.03,.12,[.95,.85,.4]);c.box(-4.3,.9,-4.3,.2,.004,.1,[.98,.98,.98]);
  c.box(-3.3,.38,-4.3,.36,.2,.26,[.85,.3,.3]);c.box(-2.7,.42,-4.3,.2,.3,.2,[.3,.5,.85]);
  c.box(-3.1,1.44,-4.3,.5,.18,.3,[.6,.4,.8]);c.box(-2.6,1.44,-4.3,.3,.24,.2,[.96,.96,.96]);
  /* two chairs to wait on and a plant */
  for(const x of [-4.6,-3.8]){c.box(x,.44,3.9,.44,.06,.42,[.3,.55,.45]);c.box(x,.7,4.1,.44,.46,.05,[.3,.55,.45])}
  c.box(-5.3,.3,-1.6,.4,.6,.4,[.75,.45,.3],true);c.box(-5.3,.9,-1.6,.7,.7,.7,[.35,.65,.35]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:1.2,y:1.6,z:-4.77,w:3.5,h:.86,ry:0,cw:640,ch:158,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';
   g.fillStyle='#047857';g.font="700 52px Anuphan, sans-serif";g.fillText('Lost and Found',W/2,52);
   g.fillStyle='#111827';g.font="600 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('จุดรับแจ้งของหาย',W/2,114)}},
  {x:4.5,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#ecfdf5';g.fillRect(0,0,W,H);g.fillStyle='#047857';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[["Hand found items to a teacher.", "ส่งของที่พบให้ครู"], ["Check the found box with an adult.", "ตรวจกล่องของที่พบพร้อมผู้ใหญ่"], ["Respect other people's belongings.", "เคารพสิ่งของของผู้อื่น"]];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>13){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  {x:-0.4,y:0.5,z:3.01,w:1.1,h:0.32,ry:0,cw:220,ch:64,draw:(g,W,H)=>{g.fillStyle='#fef3c7';g.fillRect(0,0,W,H);g.fillStyle='#78350f';g.textAlign='center';g.textBaseline='middle';let f=34;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Found box").width>W-16&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Found box",W/2,H*.34);f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("กล่องของที่พบ").width>W-16&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("กล่องของที่พบ",W/2,H*.74)}},
  {x:4.74,y:0.62,z:0.6,w:1.6,h:0.4,ry:-Math.PI/2,cw:320,ch:80,draw:(g,W,H)=>{g.fillStyle='#e0f2fe';g.fillRect(0,0,W,H);g.fillStyle='#0c4a6e';g.textAlign='center';g.textBaseline='middle';let f=34;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Found items").width>W-16&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Found items",W/2,H*.34);f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("ของที่พบ").width>W-16&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("ของที่พบ",W/2,H*.74)}},
  {x:-3.6,y:1.8,z:-4.24,w:1.6,h:0.3,ry:0,cw:320,ch:60,draw:(g,W,H)=>{g.fillStyle='#ecfdf5';g.fillRect(0,0,W,H);g.fillStyle='#065f46';g.textAlign='center';g.textBaseline='middle';let f=34;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Return shelf").width>W-16&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Return shelf",W/2,H*.34);f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("ชั้นคืนของ").width>W-16&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("ชั้นคืนของ",W/2,H*.74)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('busabalf','Ms. Busaba','Teacher on Lost and Found duty⁣ครูเวรจุดรับแจ้งของหาย',1.6,1.8,0,[0.2, 0.6, 0.5],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("You said your pencil case is missing. Which item should I record?","เธอบอกว่ากล่องดินสอหาย ครูควรบันทึกว่าของอะไรหาย","I am missing my pencil case.","I am missing my jacket.","I am missing my ruler.","เลือกสิ่งของที่แจ้งว่าหายให้ตรงกับข้อมูลที่บอกครู","Correct! You clearly report your missing pencil case. | ถูกต้อง เธอแจ้งว่ากล่องดินสอหายได้ชัดเจน"),
  TT("Your pencil case is small and yellow. How can you describe it?","กล่องดินสอของเธอใบเล็กสีเหลือง จะบรรยายอย่างไร","It is a small yellow pencil case.","It is a large yellow pencil case.","It is a small blue pencil case.","บอกทั้งขนาดเล็กและสีเหลืองให้ตรงกับของที่หาย","Good description! Both the size and colour match. | บรรยายได้ดี ทั้งขนาดและสีตรงกับของที่หาย"),
  TT("You saw it beside your desk after class. Where was it?","เธอเห็นกล่องดินสอข้างโต๊ะของตนหลังเลิกเรียน มันอยู่ที่ไหน","I last saw it beside my desk.","I last saw it under my desk.","I last saw it near the door.","ตอบตำแหน่งล่าสุดที่เห็นของ คือข้างโต๊ะ","Well done! You tell the teacher where it was. | เยี่ยม เธอบอกตำแหน่งล่าสุดที่เห็นของได้")]),
 NPCDEF('khemlf','Khem','Student handing in a found item⁣นักเรียนผู้ส่งมอบของที่พบ',4.1,0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("You found a lunch box by the playground. Where did you find it?","เธอพบกล่องอาหารข้างสนามเด็กเล่น เธอพบที่ไหน","I found a lunch box by the playground.","I found a lunch box in the library.","I found a lunch box near the school gate.","บอกสถานที่ที่พบตามข้อมูล คือข้างสนามเด็กเล่น","Great! You report the found item and its location. | ดีมาก เธอแจ้งสิ่งของที่พบพร้อมสถานที่ได้"),
  TT("The teacher is at this desk. Where should you hand in the lunch box?","ครูอยู่ที่โต๊ะรับแจ้งนี้ เธอควรส่งกล่องอาหารที่ไหน","I will hand it to the teacher here.","I will leave it on the window shelf.","I will put it beside the empty chair.","ของที่พบควรส่งให้ครูผู้รับผิดชอบโดยตรง","Correct! You give the found item to an adult. | ถูกต้อง เธอส่งของที่พบให้ผู้ใหญ่รับผิดชอบ"),
  TT("The lunch box has a star sticker. What is on its lid?","กล่องอาหารมีสติกเกอร์รูปดาว บนฝามีรูปอะไร","There is a star sticker on the lid.","There is a heart sticker on the lid.","There is a circle sticker on the lid.","เลือกสัญลักษณ์บนฝากล่องให้ตรงกับที่บอก","Nice! The sticker helps describe the lunch box. | ดีมาก สติกเกอร์ช่วยบอกลักษณะกล่องอาหาร")]),
 NPCDEF('duenlf','Duen','Student checking a missing cap⁣นักเรียนผู้กำลังตามหาหมวก',-1.7,2.6,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("You are looking for your green cap. Which cap do you need?","เธอกำลังหาหมวกสีเขียว ต้องการหมวกแบบไหน","I am looking for my green cap.","I am looking for my yellow cap.","I am looking for my white cap.","สีหมวกที่กำลังหาคือสีเขียว","Right! You identify the cap by colour. | ถูกต้อง เธอบอกสีหมวกเพื่อระบุของที่หายได้"),
  TT("Your cap has a white name label. Which label is yours?","หมวกของเธอมีป้ายชื่อสีขาว ป้ายแบบไหนเป็นของเธอ","My cap has a white name label.","My cap has a pink name label.","My cap has a blue name label.","ดูสีของป้ายชื่อบนหมวก ไม่ต้องบอกชื่อจริง","Good! You use the label without sharing personal details. | ดีมาก เธอใช้ลักษณะป้ายโดยไม่เปิดเผยข้อมูลส่วนตัว"),
  TT("An adult must check the found box. Who will you ask?","ต้องให้ผู้ใหญ่ตรวจกล่องของที่พบ เธอจะขอให้ใครช่วย","I will ask the teacher to check the box.","I will ask my classmate to check the box.","I will ask the club captain to check the box.","เลือกผู้ใหญ่ที่ได้รับหน้าที่ดูแลกล่องของที่พบ","Exactly! The teacher checks the box with you. | ใช่แล้ว ครูช่วยตรวจกล่องของที่พบกับเธอ")]),
 NPCDEF('tulalf','Tula','Student helper for labels and returns⁣นักเรียนผู้ช่วยดูแลป้ายชื่อและการคืนของ',-3.6,-3.3,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("You want your ruler returned easily. What will you write?","เธออยากให้ตามคืนไม้บรรทัดได้ง่าย จะเขียนอะไรบนป้าย","I will write my name on the label.","I will write the weekday on the label.","I will write the classroom colour on the label.","ป้ายชื่อควรมีชื่อเจ้าของ แต่ไม่ต้องกรอกชื่อจริงในเกม","Great! A name label can help return an item. | ดีมาก ป้ายชื่อช่วยให้คืนของแก่เจ้าของได้"),
  TT("Before leaving, check your bag for your things. What will you do?","ก่อนกลับให้ตรวจของในกระเป๋าของตน เธอจะทำอย่างไร","I will check my bag before leaving.","I will check the wall before leaving.","I will check the floor map before leaving.","ครูขอให้ตรวจสิ่งของในกระเป๋าตนเองก่อนออก","Well done! Checking your bag builds a good habit. | เยี่ยม การตรวจกระเป๋าช่วยสร้างนิสัยที่ดี"),
  TT("We know who owns this ruler. Where should it go now?","เราทราบแล้วว่าใครเป็นเจ้าของไม้บรรทัด ควรส่งคืนที่ใด","I will return the ruler to its owner.","I will put the ruler on the empty shelf.","I will leave the ruler beside the window.","เมื่อทราบเจ้าของแล้วควรส่งคืนให้เจ้าของ","Excellent! Returning things shows honesty and care. | ยอดเยี่ยม การคืนของแสดงถึงความซื่อสัตย์และใส่ใจ")])]});

