/* ===== Our school: Teachers' Room (ST-CNT-018 V1.0 + owner-approved corrections, 4 Nov). Reached from the flagpole yard (west side, owner decision D1);
   in-game time 07:45 (D2); no room number. Spots from the spec: A near the entrance (Ms. Kanokwan), B visitor table (Mr. Thanaset),
   C worksheet tray (Lalin), D visitor chairs (Petchara). A made-up worksheet visit: no real teachers, students, rules or records. NPC names are made up. ===== */
SCENES.push({id:'teacherroom',name:"Teachers' Room · Phibun School",th:'ห้องพักครู',color:'#8B3CF0',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'flagpole',at:[-10.2,-5.6,Math.PI/2]}],/* the door leads back to the flagpole yard (west side) */
 build(){const c=mk();
  const WALL=[.95,.93,.9],CAP=[.45,.32,.62],FL1=[.82,.78,.72],FL2=[.74,.7,.64],WOOD=[.7,.52,.34],WOOD2=[.58,.42,.27],GREY=[.62,.64,.68],DARK=[.15,.15,.18],PAPER=[.98,.98,.95];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.76,.75,.71]);/* the flagpole yard concrete outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?FL1:FL2);
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(1.6,1.6,-4.83,2.7,.95,.04,[.55,.56,.6]);c.box(1.6,1.6,-4.8,2.5,.8,.04,[.98,.98,.98]);
  c.box(4.5,1.5,-4.83,2.1,1.35,.04,CAP);
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  /* teachers' desks (two rows of three) with closed laptops, paper stacks and chairs: the teachers' own work, not for visitors */
  for(const x of [-3.6,-1.6,.4])for(const z of [-3.6,-2.4]){c.box(x,.38,z,1.8,.76,.9,WOOD2,true);c.box(x,.78,z,1.9,.05,1,WOOD);
   c.box(x-.4,.82,z,.5,.03,.36,DARK);c.box(x+.45,.84,z,.34,.08,.26,PAPER);c.box(x,.25,z+(z<-3?-.75:.75),.5,.5,.5,[.3,.3,.4])}
  /* a closed cupboard and filing cabinet in the front-right corner (private) */
  c.box(3.2,1,-4.4,1.6,2,.7,GREY,true);c.box(3.2,1,-4.04,.02,1.9,.02,DARK);c.box(3.1,1.05,-4.03,.04,.16,.02,DARK);c.box(3.3,1.05,-4.03,.04,.16,.02,DARK);
  c.box(5.3,.65,-4.3,.9,1.3,.7,GREY,true);for(const y of [.35,.75,1.15])c.box(5.3,y,-3.94,.3,.05,.02,DARK);
  /* B: visitor table in the middle with two stools on the visitor side */
  c.box(.4,.36,-.2,1.8,.72,.9,WOOD2,true);c.box(.4,.74,-.2,1.9,.05,1,WOOD);c.box(.1,.78,-.2,.36,.02,.26,PAPER);
  for(const x of [-.1,.9])c.box(x,.22,.65,.4,.44,.4,[.85,.6,.3]);
  /* C: worksheet tray on a low cabinet by the left wall */
  c.box(-5.3,.45,1.4,1,.9,1.8,WOOD2,true);c.box(-5.3,.92,1.4,1.05,.04,1.85,WOOD);
  for(const z of [.9,1.4,1.9]){c.box(-5.3,1,z,.5,.1,.4,[.3,.45,.75]);c.box(-5.3,1.06,z,.4,.02,.3,PAPER)}
  /* D: visitor chairs by the right wall */
  for(const z of [-1.8,-.8,.2]){c.box(5.5,.25,z,.55,.5,.55,[.55,.4,.75],true);c.box(5.75,.6,z,.08,.6,.55,[.5,.36,.7])}
  /* a water dispenser and a plant by the door */
  c.box(2.4,.55,4.4,.45,1.1,.45,[.92,.94,.97],true);c.box(2.4,1.25,4.4,.32,.4,.32,[.6,.8,.95]);
  c.box(-5.3,.3,4.2,.4,.6,.4,[.75,.45,.3],true);c.box(-5.3,.9,4.2,.7,.7,.7,[.35,.65,.35]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:1.6,y:1.6,z:-4.77,w:2.4,h:.76,ry:0,cw:640,ch:203,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';
   g.fillStyle='#6d28d9';let f=64;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Teachers' Room").width>W-24&&f>20){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Teachers' Room",W/2,70);
   g.fillStyle='#111827';f=46;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("ห้องพักครู").width>W-24&&f>16){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("ห้องพักครู",W/2,150)}},
  {x:4.5,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#f5f3ff';g.fillRect(0,0,W,H);g.fillStyle='#6d28d9';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[["Please knock first.", "กรุณาเคาะประตูก่อน"], ["Keep your voice low.", "กรุณาพูดเบา ๆ"], ["Respect private papers.", "เคารพเอกสารส่วนตัว"]];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>13){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  {x:-5.25,y:1.35,z:1.4,w:1.2,h:0.3,ry:Math.PI/2,cw:240,ch:60,draw:(g,W,H)=>{g.fillStyle='#1e3a8a';g.fillRect(0,0,W,H);g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';let f=34;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Worksheet Tray").width>W-16&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Worksheet Tray",W/2,H*.34);f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("ถาดส่งใบงาน").width>W-16&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("ถาดส่งใบงาน",W/2,H*.74)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Flagpole Yard','ลานเสาธง','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('kanokwantr','Ms. Kanokwan',"English teacher⁣ครูภาษาอังกฤษ",2.4,2.6,Math.PI/2,[0.62, 0.3, 0.55],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("The door is closed. How can you ask to enter?","ประตูปิดอยู่ เธอควรขอเข้าไปอย่างไร","May I come in, please?","May I open your cupboard, please?","May I take your papers, please?","ขออนุญาตเข้าไป ไม่ใช่ขอใช้ของครู","Good. You asked before entering. | ดีมาก เธอขออนุญาตก่อนเข้า"),
  TT("I am speaking on the phone. What will you do?","ครูกำลังคุยโทรศัพท์ เธอจะทำอย่างไร","I'll wait outside until you're free.","I'll talk loudly beside your phone.","I'll interrupt your call right now.","ควรรอเมื่อครูกำลังติดธุระ","Thank you for waiting politely. | ขอบใจที่รออย่างสุภาพ"),
  TT("Other teachers are working. How should you speak here?","ครูคนอื่นกำลังทำงาน เธอควรพูดอย่างไร","I'll use a quiet voice in this room.","I'll shout my question across the room.","I'll call my friend loudly from here.","เลือกวิธีพูดที่ไม่รบกวนผู้อื่น","Yes, a quiet voice is respectful. | ใช่ การใช้เสียงเบาแสดงความเคารพ")]),
 NPCDEF('thanasettr','Mr. Thanaset',"Teacher reviewing lesson work⁣ครูตรวจงานบทเรียน",0.4,-1.3,0,[0.3, 0.5, 0.75],[0.22, 0.22, 0.26],[0.1, 0.08, 0.07],'',[
  TT("Where should you put your English worksheet?","ควรวางใบงานภาษาอังกฤษไว้ที่ไหน","I'll give my worksheet directly to you.","I'll hide my worksheet behind your books.","I'll place my worksheet on another teacher's chair.","ส่งใบงานให้ครูโดยตรง","Good. I can receive your worksheet. | ดี ครูรับใบงานของเธอได้"),
  TT("You have one question about today's lesson. What can you say?","เธอมีคำถามหนึ่งข้อเกี่ยวกับบทเรียนวันนี้ ควรพูดว่าอะไร","Could I ask about today's lesson, please?","Could I check another student's marks, please?","Could I read the papers on your desk?","ถามเรื่องบทเรียนของตนเอง","Of course. Ask your lesson question. | ได้เลย ถามเรื่องบทเรียนมาได้"),
  TT("I am busy now. When can you return?","ตอนนี้ครูไม่ว่าง เธอจะกลับมาเมื่อไร","I'll come back after the next break.","I'll stay and interrupt your work now.","I'll enter your desk area without asking.","รอช่วงเวลาที่เหมาะสมแล้วกลับมา","That time will work. Thank you. | เวลานั้นได้ ขอบใจ")]),
 NPCDEF('lalintr','Lalin',"Student handing in a worksheet⁣นักเรียนมาส่งใบงาน",-4.2,1.4,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Your worksheet is for Ms. Kanokwan. Who will you ask?","ใบงานนี้สำหรับ Ms. Kanokwan เธอจะถามใคร","I'll ask Ms. Kanokwan about this worksheet.","I'll ask the cleaner to grade this worksheet.","I'll ask a visitor to check my worksheet.","ถามครูที่รับผิดชอบใบงาน","You chose the teacher named on the task. | เธอเลือกครูที่ระบุในงานได้ถูกต้อง"),
  TT("You see papers on a teacher's desk. What should you do?","เธอเห็นเอกสารบนโต๊ะครู ควรทำอย่างไร","I'll leave the desk papers untouched.","I'll turn over the papers to read them.","I'll move the papers into my bag.","ไม่แตะต้องเอกสารบนโต๊ะครู","Right. Leave those papers alone. | ถูกต้อง อย่าแตะเอกสารเหล่านั้น"),
  TT("A teacher invites you to wait. What can you ask?","ครูให้เธอรอ เธอควรถามอย่างไร","Where may I sit while I wait?","Where may I search your computer files?","Where may I open your locked drawer?","ถามหาที่นั่งรอ","The visitor chair is a good place to wait. | เก้าอี้ผู้มาเยือนเหมาะสำหรับนั่งรอ")]),
 NPCDEF('petcharatr','Petchara',"Student waiting politely⁣นักเรียนรอถามครู",4.2,-0.8,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.07, 0.06],'long',[
  TT("The teacher gave you a worksheet. What will you check first?","ครูให้ใบงานหนึ่งแผ่น เธอจะตรวจอะไรเป็นอย่างแรก","I'll read the instructions before I start.","I'll skip the instructions and guess everything.","I'll copy a classmate's answers without reading.","อ่านคำสั่งก่อนลงมือ","Great. Reading first helps. | เยี่ยม การอ่านก่อนช่วยให้เข้าใจ"),
  TT("Your question is answered. What will you say before leaving?","เมื่อได้คำตอบแล้ว เธอจะพูดอะไรก่อนออก","Thank you for your time today.","I'll take some papers as I leave.","I'll leave without closing the door gently.","ขอบคุณครูอย่างสุภาพ","Good. Saying thank you is polite. | ดี การขอบคุณครูเป็นมารยาทที่ดี"),
  TT("The teacher asks you to close the door gently. What will you do?","ครูขอให้ปิดประตูเบา ๆ เธอจะทำอย่างไร","I'll close the door quietly behind me.","I'll slam the door as I leave.","I'll leave the door wide open.","ปิดประตูอย่างเบามือ","Thank you for closing it gently. | ขอบใจที่ปิดประตูเบา ๆ")])]});

