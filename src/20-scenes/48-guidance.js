/* ===== Our school: Guidance Room (ST-CNT-012 V1.0, 4 Nov). Reached from the Building 3 corridor (south-side door); no room number.
   Spots from the spec: A study-planning desk (Ms. Thipawan), B club information board (Bright), C careers poster stand (Saimai),
   D goal-planning table (Nuea). Everyday, positive practice only: not counselling. Clubs and jobs are made up. NPC names are made up. ===== */
SCENES.push({id:'guidance',name:'Guidance Room · Phibun School',th:'ห้องแนะแนว',color:'#7C3AED',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[-1.5,1.6,Math.PI]}],/* the door leads back to the Building 3 corridor (south side) */
 build(){const c=mk();
  const WALL=[.96,.94,.9],CAP=[.62,.5,.36],WOOD=[.7,.52,.34],WOOD2=[.58,.42,.27],CHAIR=[.45,.35,.7],BOARD=[.82,.67,.45],LEG=[.4,.4,.42];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.9,.87,.92]:[.84,.8,.88]);
  /* front wall (full height) with a whiteboard and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1,1.55,-4.83,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-4.8,4.2,1.1,.04,[.98,.98,.98]);
  c.box(3.7,1.5,-4.83,2.1,1.35,.04,[.45,.25,.75]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: study-planning desk with a timetable sheet, a pen cup and two chairs */
  c.box(-1,.38,-3.3,2.4,.76,.8,WOOD2,true);c.box(-1,.78,-3.3,2.5,.05,.9,WOOD);
  c.box(-1.5,.81,-3.25,.6,.02,.42,[.98,.98,.95]);c.box(-1.5,.82,-3.25,.5,.01,.06,[.4,.6,.95]);c.box(-.3,.88,-3.3,.14,.16,.14,[.3,.3,.35]);
  for(const x of [-1.6,-.4]){c.box(x,.44,-2.5,.44,.06,.42,CHAIR);c.box(x,.7,-2.3,.44,.46,.05,CHAIR)}
  /* B: club information board on a stand by the left wall */
  c.box(-5.85,1.3,.9,.08,1.4,2.4,BOARD,true);c.box(-5.85,.3,0,.08,.6,.08,LEG);c.box(-5.85,.3,1.8,.08,.6,.08,LEG);
  /* C: careers poster stand (two boards back to back) in the middle */
  c.box(-1.6,1.25,.9,2.2,1.3,.08,[.9,.9,.92],true);c.box(-2.6,.3,.9,.08,.6,.08,LEG);c.box(-.6,.3,.9,.08,.6,.08,LEG);
  /* D: goal-planning table on the right wall with sticky notes and a small calendar */
  c.box(5.3,.38,-.6,1.1,.76,2.2,WOOD2,true);c.box(5.3,.78,-.6,1.2,.05,2.3,WOOD);
  for(const [z,col] of [[-1.3,[.98,.88,.35]],[-.9,[.6,.85,.95]],[-.5,[.95,.6,.75]]])c.box(5.1,.81,z,.24,.01,.24,col);
  c.box(5.5,.95,.1,.06,.3,.36,[.95,.95,.95]);c.box(5.47,1.05,.1,.02,.06,.36,[.85,.25,.25]);
  /* a sofa and a plant to make the room friendly */
  c.box(-4.2,.3,3.9,2,.4,.8,[.5,.65,.85],true);c.box(-4.2,.6,4.25,2,.5,.12,[.45,.6,.8]);
  c.box(1.6,.3,3.9,.4,.6,.4,[.75,.45,.3],true);c.box(1.6,.9,3.9,.7,.7,.7,[.35,.65,.35]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-4.77,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#6d28d9';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Guidance Room · ห้องแนะแนว',22,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Plans · Clubs · Careers',22,100);g.fillText('แผนการเรียน · ชมรม · อาชีพ',22,148)}},
  {x:3.7,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#f5f3ff';g.fillRect(0,0,W,H);g.fillStyle='#7c3aed';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Make a small plan.','วางแผนเล็ก ๆ ที่ทำได้'],['Every dream deserves respect.','ทุกความฝันสมควรได้รับความเคารพ'],['For real worries, talk to a teacher you trust.','หากมีเรื่องกังวลจริง ให้คุยกับครูที่ไว้วางใจ']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>13){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  {x:-5.79,y:1.3,z:.9,w:2.3,h:1.3,ry:Math.PI/2,cw:460,ch:260,draw:(g,W,H)=>{g.fillStyle='#d6b17a';g.fillRect(0,0,W,H);g.fillStyle='#111827';g.textAlign='center';g.textBaseline='middle';
   g.font="700 30px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Clubs · ชมรม',W/2,30);
   [['Speaking Club','#bfdbfe'],['Reading Club','#fde68a'],['Art Club','#fbcfe8']].forEach(([t,col],k)=>{const x=20+k*145;g.fillStyle='#fff';g.fillRect(x,60,130,180);g.fillStyle=col;g.fillRect(x+6,66,118,100);
    g.fillStyle='#111827';g.font="700 19px Anuphan, sans-serif";g.fillText(t,x+65,200)})}},
  {x:-1.6,y:1.25,z:.95,w:2.1,h:1.2,ry:0,cw:440,ch:250,draw:(g,W,H)=>{g.fillStyle='#ffffff';g.fillRect(0,0,W,H);g.fillStyle='#7c3aed';g.fillRect(0,0,W,40);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 24px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Careers · อาชีพ',W/2,21);
   [['Chef','เชฟ','#fed7aa'],['Designer','นักออกแบบ','#ddd6fe'],['Farmer','เกษตรกร','#bbf7d0']].forEach(([e,t,col],k)=>{const x=14+k*142;g.fillStyle=col;g.fillRect(x,54,130,140);
    g.fillStyle='#111827';g.font="700 22px Anuphan, sans-serif";g.fillText(e,x+65,212);g.fillStyle='#4b5563';g.font="600 18px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(t,x+65,236)})}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('thipawang','Ms. Thipawan','Guidance teacher⁣ครูแนะแนว',0.9,-3.4,0,[0.6, 0.4, 0.85],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("You want to practise reading every day. What daily goal will help you improve?","เธออยากฝึกอ่านทุกวัน เป้าหมายประจำวันแบบไหนจะช่วยให้เธอพัฒนา","I'd like to read in English for ten minutes daily.","I'd like to read in English once a month.","I'd like to skip my reading practice.","โจทย์บอกว่าอยากฝึกทุกวัน เลือกเป้าหมายที่ทำได้ทุกวัน","Good choice! A short daily goal is practical. | ดีมาก เป้าหมายสั้น ๆ ที่ทำทุกวันนำไปปฏิบัติได้จริง"),
  TT("When can you review new English words each day?","เธอจะทบทวนคำศัพท์ภาษาอังกฤษใหม่ได้เมื่อไรในแต่ละวัน","I'll review them after dinner each day.","I'll review them only on school holidays.","I'll review them whenever I remember someday.","เลือกเวลาที่ชัดเจนและทำซ้ำได้ในแต่ละวัน","Excellent! You have a clear review time. | เยี่ยม เธอมีเวลาทบทวนที่ชัดเจน"),
  TT("How can you politely ask about your study plan?","เธอจะขอคำแนะนำเกี่ยวกับแผนการเรียนอย่างสุภาพอย่างไร","Could you suggest a simple study routine, please?","Could you cancel our study plan, please?","Could you do all my homework, please?","ขอคำแนะนำสำหรับแผนง่าย ๆ ไม่ใช่ให้คนอื่นทำแทน","Well asked! That is a polite request for guidance. | ถามได้สุภาพดีมาก เป็นการขอคำแนะนำอย่างเหมาะสม")]),
 NPCDEF('brightguid','Bright','Student club helper⁣นักเรียนผู้ช่วยข้อมูลชมรม',-5.0,-0.9,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("Which activity would help you practise speaking English?","กิจกรรมใดจะช่วยให้เธอฝึกพูดภาษาอังกฤษ","I'd choose a club with English conversations.","I'd choose a club with silent reading only.","I'd choose a club without speaking activities.","เลือกกิจกรรมที่มีโอกาสได้สนทนาภาษาอังกฤษ","Nice! That activity matches your speaking goal. | ดีมาก กิจกรรมนี้ตรงกับเป้าหมายการฝึกพูด"),
  TT("What could you ask to learn when the club meets?","เธอจะถามอย่างไรเพื่อทราบเวลาที่ชมรมพบกัน","What time does the club meet on Fridays?","Where does the club keep its old posters?","How many chairs are inside the club room?","ถามเรื่องเวลาเข้าร่วมชมรมโดยตรง","Correct! You asked for the meeting time. | ถูกต้อง เธอถามเวลาพบกันของชมรม"),
  TT("How will you politely say you want to join?","เธอจะบอกอย่างสุภาพอย่างไรว่าอยากเข้าร่วม","I'd like to join the speaking club, please.","I'd like to visit the club next year, perhaps.","I'd like to watch the club from outside.","บอกความต้องการสมัครเข้าร่วมอย่างชัดเจน","Great! Your request is clear and polite. | ดีมาก เธอขอเข้าร่วมอย่างชัดเจนและสุภาพ")]),
 NPCDEF('saimaiguid','Saimai','Student career-poster helper⁣นักเรียนผู้ช่วยโปสเตอร์อาชีพ',0.2,0.9,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("The poster shows a chef. What does a chef do?","โปสเตอร์แสดงอาชีพพ่อครัวหรือแม่ครัว คนทำอาชีพนี้ทำอะไร","A chef prepares meals for people.","A chef repairs broken school computers.","A chef teaches swimming lessons at a pool.","เลือกหน้าที่หลักของอาชีพผู้ทำอาหาร","Yes! A chef prepares food. | ใช่แล้ว ผู้ทำอาหารมีหน้าที่เตรียมอาหาร"),
  TT("Which job interests you if you enjoy drawing?","ถ้าเธอชอบวาดภาพ อาชีพไหนที่เธอสนใจ","I'd like to explore a career in design.","I'd like to explore a career in cooking instead.","I'd like to explore a career in farming instead.","เลือกตัวอย่างอาชีพที่เชื่อมกับการวาดภาพในคำถาม","Good! Design is one possible path for drawing. | ดีมาก งานออกแบบเป็นหนึ่งในแนวทางที่เกี่ยวกับการวาดภาพ"),
  TT("What can you ask about the skills for a job?","เธอจะถามเกี่ยวกับทักษะที่จำเป็นสำหรับอาชีพได้อย่างไร","What skills should I learn for that job?","What colour is the job poster today?","What size is the picture on the wall?","ถามเรื่องทักษะที่ต้องฝึกสำหรับอาชีพ","Exactly! Asking about skills helps you explore careers. | ถูกต้อง การถามเรื่องทักษะช่วยให้สำรวจอาชีพได้")]),
 NPCDEF('nueaguid','Nuea','Student goal-planning partner⁣เพื่อนช่วยวางเป้าหมาย',4.3,-0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("What small goal will you try this week?","สัปดาห์นี้เธอจะตั้งเป้าหมายเล็ก ๆ อะไร","I'll practise five new English words this week.","I'll practise fifty new subjects in one day.","I'll practise no English words this week.","ตั้งเป้าที่มีขนาดเล็กและเหมาะกับเวลา","Good plan! Your goal is specific and manageable. | แผนดีมาก เป้าหมายของเธอชัดเจนและทำได้"),
  TT("How can you check if you followed your plan?","เธอจะตรวจได้อย่างไรว่าทำตามแผนแล้ว","I'll tick each day I finish my practice.","I'll tick each day before I start practising.","I'll tick every day without checking my work.","ทำเครื่องหมายหลังจากทำกิจกรรมสำเร็จแล้ว","Well done! That helps you track actual practice. | เยี่ยม วิธีนี้ช่วยติดตามการฝึกที่ทำจริง"),
  TT("How could you share one study goal with a partner?","เธอจะบอกเป้าหมายการเรียนหนึ่งอย่างกับเพื่อนได้อย่างไร","My goal is to practise English every evening.","My goal was to stop studying last year.","My goal is to avoid all practice this month.","เล่าเป้าหมายการฝึกภาษาอังกฤษในปัจจุบันให้เพื่อนฟัง","Wonderful! You shared a clear personal learning goal. | ยอดเยี่ยม เธอบอกเป้าหมายการเรียนรู้ได้ชัดเจน")])]});

