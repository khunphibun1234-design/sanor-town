/* ===== Our school: Academic Affairs Room (ST-CNT-019 V1.0 + owner-approved corrections, 4 Nov). Reached from the flagpole yard (west side, owner decision D1);
   in-game time 12:45 (D2); no room number. Spots from the spec: A front service counter (Ms. Wilasinee), B timetable notice (Darin),
   C form table (Phakphum), D waiting area (Orasa). A made-up timetable and blank practice form only: no real exams, scores or records. NPC names are made up. ===== */
SCENES.push({id:'academic',name:'Academic Affairs Room · Phibun School',th:'ห้องบริหารงานวิชาการ',color:'#F0365A',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'flagpole',at:[-10.2,4,Math.PI/2]}],/* the door leads back to the flagpole yard (west side) */
 build(){const c=mk();
  const WALL=[.95,.94,.92],CAP=[.62,.18,.28],FL1=[.8,.82,.86],FL2=[.72,.74,.8],WOOD=[.7,.52,.34],WOOD2=[.58,.42,.27],GREY=[.62,.64,.68],DARK=[.15,.15,.18],PAPER=[.98,.98,.95];
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
  /* A: front service counter facing the door; the staff side is behind it */
  c.box(1.6,.52,1.9,3.4,1.04,.6,[.9,.86,.8],true);c.box(1.6,1.06,1.9,3.5,.05,.7,WOOD);c.box(1.6,.5,2.21,3.4,.9,.02,CAP);
  c.box(.6,1.1,1.9,.4,.02,.3,PAPER);c.box(2.6,1.1,1.9,.3,.06,.2,[.3,.45,.75]);
  /* staff desk and a locked storage cupboard behind the counter (not for visitors) */
  c.box(1.6,.38,-.4,2,.76,.9,WOOD2,true);c.box(1.6,.78,-.4,2.1,.05,1,WOOD);c.box(1.2,.82,-.4,.5,.03,.36,DARK);c.box(2.1,.84,-.4,.34,.08,.26,PAPER);
  c.box(3.6,1,-4.4,1.6,2,.7,GREY,true);c.box(3.6,1,-4.04,.02,1.9,.02,DARK);c.box(3.75,1.05,-4.02,.12,.12,.04,[.85,.7,.2]);
  /* B: sample timetable notice board on the front wall */
  c.box(-2.2,1.5,-4.83,2.6,1.4,.04,[.6,.42,.25]);
  /* C: form table by the left wall with blank forms and pens */
  c.box(-5.2,.38,1.4,1.1,.76,2.2,WOOD2,true);c.box(-5.2,.78,1.4,1.2,.05,2.3,WOOD);
  for(const z of [.7,1.2,1.7])c.box(-5.1,.81,z,.42,.02,.3,PAPER);c.box(-5.3,.82,2.1,.04,.02,.3,[.2,.3,.8]);
  /* D: waiting area by the right wall with chairs and queue marks on the floor */
  for(const z of [-1.8,-.8,.2]){c.box(5.5,.25,z,.55,.5,.55,[.9,.45,.5],true);c.box(5.75,.6,z,.08,.6,.55,[.85,.4,.45])}
  for(const x of [2.2,3.2])c.box(x,.065,3.1,.6,.01,.08,[.98,.85,.15]);
  /* a plant by the door */
  c.box(-5.3,.3,4.2,.4,.6,.4,[.75,.45,.3],true);c.box(-5.3,.9,4.2,.7,.7,.7,[.35,.65,.35]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:1.6,y:1.6,z:-4.77,w:2.4,h:.76,ry:0,cw:640,ch:203,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';
   g.fillStyle='#be123c';let f=64;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Academic Affairs Room").width>W-24&&f>20){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Academic Affairs Room",W/2,70);
   g.fillStyle='#111827';f=46;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("ห้องบริหารงานวิชาการ").width>W-24&&f>16){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("ห้องบริหารงานวิชาการ",W/2,150)}},
  {x:4.5,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#fff1f2';g.fillRect(0,0,W,H);g.fillStyle='#be123c';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[["Please wait in line.", "กรุณารอตามคิว"], ["Use sample details only.", "ใช้ข้อมูลสมมติเท่านั้น"], ["Ask at the front counter.", "สอบถามที่เคาน์เตอร์หน้า"]];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>13){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  {x:-2.2,y:1.5,z:-4.8,w:2.4,h:1.25,ry:0,cw:480,ch:250,draw:(g,W,H)=>{g.fillStyle='#fffbeb';g.fillRect(0,0,W,H);g.textAlign='center';g.textBaseline='middle';
   g.fillStyle='#92400e';g.font="700 30px Anuphan, sans-serif";g.fillText('Sample Test Timetable',W/2,32);
   g.fillStyle='#111827';g.font="600 26px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('ตารางสอบสมมติ',W/2,66);
   g.strokeStyle='#d6d3d1';g.lineWidth=2;for(let k=0;k<4;k++){g.strokeRect(24,92+k*38,W-48,30)}}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Flagpole Yard','ลานเสาธง','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('wilasineeaa','Ms. Wilasinee',"Academic office staff⁣เจ้าหน้าที่งานวิชาการ",1.6,1.1,0,[0.2, 0.55, 0.6],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("You need the exam timetable. What will you ask?","เธอต้องการตารางสอบ ควรถามอย่างไร","Could I see the exam timetable, please?","Could I take someone else's test paper?","Could I change the exam timetable myself?","ขอดูตารางสอบ ไม่ใช่เอกสารของคนอื่น","Certainly. Here is the sample timetable. | ได้เลย นี่คือตารางสอบสมมติ"),
  TT("The sample timetable says Tuesday. Which day is the test?","ตารางสมมติระบุวันอังคาร สอบวันไหน","The sample test is on Tuesday.","The sample test is on Thursday.","The sample test is on Saturday.","ดูวันในตารางสมมติ","Correct. It says Tuesday. | ถูกต้อง ระบุวันอังคาร"),
  TT("You need a practice form. What will you request?","เธอต้องการแบบฟอร์มฝึก ควรขออย่างไร","May I have a blank practice form?","May I have another student's completed form?","May I take every form from the counter?","ขอแบบฟอร์มเปล่า","Yes. Take one blank practice form. | ได้ หยิบแบบฟอร์มเปล่าหนึ่งใบ")]),
 NPCDEF('darinaa','Darin',"Student checking a sample timetable⁣นักเรียนตรวจตารางสอบสมมติ",-2,-3.3,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Use a made-up name on this form. What will you write?","ให้ใช้ชื่อสมมติในแบบฟอร์ม เธอจะเขียนอะไร","I'll write the sample name Maliwan.","I'll write my real phone number instead.","I'll write another student's home address.","กรอกชื่อสมมติเท่านั้น","Good. You used a sample name. | ดี เธอใช้ชื่อสมมติ"),
  TT("One box is empty. What should you do before handing it in?","ยังมีช่องว่างในแบบฟอร์ม ควรทำอะไร","I'll check each box on this sample form.","I'll submit the form without looking at it.","I'll erase the office instructions from the form.","ตรวจความครบถ้วนของช่องกรอก","Yes. Check the form carefully. | ใช่ ตรวจแบบฟอร์มให้รอบคอบ"),
  TT("You finished the form. Where can you ask to hand it in?","กรอกแบบฟอร์มเสร็จแล้ว ควรถามจุดส่งอย่างไร","Where should I hand in this form?","Where should I hide this form?","Where should I throw away this form?","ถามจุดส่งเอกสาร","Please put it in the marked tray. | กรุณาวางในถาดที่กำหนด")]),
 NPCDEF('phakphumaa','Phakphum',"Student using a sample form⁣นักเรียนใช้แบบฟอร์มสมมติ",-4.2,1.4,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("Two students are in line. What will you do?","มีนักเรียนสองคนรอคิวอยู่ เธอจะทำอย่างไร","I'll join the line behind them.","I'll walk ahead of both students.","I'll push through to the front desk.","ต่อแถวตามลำดับ","Thank you for waiting your turn. | ขอบใจที่รอตามคิว"),
  TT("You missed a sample test. What can you ask?","เธอพลาดการสอบสมมติ ควรถามว่าอะไร","Could I ask about a make-up test, please?","Could I change somebody else's score, please?","Could I take the answer sheet secretly, please?","ถามขั้นตอนการสอบชดเชยอย่างสุภาพ","Ask the office staff for the sample procedure. | ถามเจ้าหน้าที่เรื่องขั้นตอนสมมติได้"),
  TT("This sample form is due Friday. When will you bring it back?","แบบฟอร์มสมมตินี้กำหนดส่งวันศุกร์ เธอจะนำมาคืนเมื่อไร","I'll return this sample form by Friday.","I'll return this sample form next Sunday.","I'll return this sample form next month.","กำหนดส่งคือวันศุกร์","Good. Friday is the stated day. | ดี วันศุกร์คือวันที่ระบุ")]),
 NPCDEF('orasaaa','Orasa',"Student waiting in line⁣นักเรียนรอคิว",4.2,-0.8,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.07, 0.06],'long',[
  TT("The notice says to use the front counter. Where will you go?","ประกาศให้ติดต่อเคาน์เตอร์หน้า เธอจะไปที่ไหน","I'll go to the front counter first.","I'll go behind the staff desk instead.","I'll enter the locked storage area first.","ไปเคาน์เตอร์บริการด้านหน้า","Yes. The front counter is the right place. | ใช่ เคาน์เตอร์หน้าคือจุดที่ถูกต้อง"),
  TT("There are forms from other students here. What should you do?","มีแบบฟอร์มของนักเรียนคนอื่นอยู่ ควรทำอย่างไร","I'll leave other students' forms where they are.","I'll read other students' private forms.","I'll take other students' forms home.","รักษาความเป็นส่วนตัวของผู้อื่น","Correct. Respect everyone's documents. | ถูกต้อง เคารพเอกสารของทุกคน"),
  TT("The office has answered your question. How will you finish?","เจ้าหน้าที่ตอบคำถามแล้ว เธอจะจบการสนทนาอย่างไร","Thanks for explaining the steps to me.","I'll take extra documents without asking.","I'll interrupt the next student in line.","ขอบคุณเจ้าหน้าที่หลังได้รับคำอธิบาย","Good. Thanking the staff is polite. | ดี การขอบคุณเจ้าหน้าที่เป็นมารยาทที่ดี")])]});

