/* ===== Our school: Music Room (ST-CNT-009 V1.0, 3 Nov). Reached from the Building 3 corridor; no room number.
   Spots from the spec: A teacher desk at the front (Ms. Lalita), B chairs and music stands (Chompoo), C instrument shelves (Earth),
   D Thai instrument display with a ranat (Mek). The practice is made up; the game plays no music. NPC names are made up. ===== */
SCENES.push({id:'music',name:'Music Room · Phibun School',th:'ห้องดนตรี',color:'#1D4ED8',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[6,-1.6,0]}],/* the door leads back to the Building 3 corridor (north side) */
 build(){const c=mk();
  const WALL=[.94,.92,.88],CAP=[.62,.5,.36],WOOD=[.62,.44,.28],WOOD2=[.5,.34,.2],CHAIR=[.2,.35,.7],LEG=[.3,.3,.32],RED=[.75,.2,.2];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.78,.62,.45]:[.72,.56,.4]);
  /* front wall (full height) with a whiteboard (music staff) and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1,1.55,-4.83,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-4.8,4.2,1.1,.04,[.98,.98,.98]);
  c.box(3.7,1.5,-4.83,2.1,1.35,.04,[.12,.3,.75]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: teacher desk at the front, a keyboard on a stand beside it */
  c.box(-1,.38,-3.3,2.4,.76,.8,WOOD2,true);c.box(-1,.78,-3.3,2.5,.05,.9,WOOD);c.box(-1.5,.83,-3.3,.5,.04,.36,[.97,.97,.95]);
  c.box(3.4,.4,-3.6,.06,.8,.06,LEG);c.box(4.6,.4,-3.6,.06,.8,.06,LEG);c.box(4,.84,-3.6,1.5,.1,.42,[.12,.12,.14],true);
  for(let k=0;k<13;k++)c.box(3.31+k*.115,.9,-3.48,.1,.02,.16,[.98,.98,.98]);for(const k of [1,2,4,5,6,8,9,11])c.box(3.31+k*.115-.057,.92,-3.53,.06,.03,.08,[.08,.08,.08]);
  /* B: chairs in two rows, each with a music stand in front */
  for(const z of [-1.4,.4])for(const x of [-3.4,-2.4,-1.4]){c.box(x,.44,z+.5,.44,.06,.42,CHAIR);c.box(x,.7,z+.7,.44,.46,.05,CHAIR);c.box(x,.22,z+.5,.06,.44,.06,LEG);
   c.box(x,.55,z,.04,1.1,.04,LEG);c.box(x,1.12,z,.42,.3,.03,[.15,.15,.17]);c.box(x,1.12,z+.02,.36,.24,.01,[.97,.97,.92]);c.ob.push([x-.25,x+.25,z-.1,z+.75])}
  /* C: instrument shelves on the left wall: guitars, small drums, recorders */
  c.box(-5.75,1,.9,.6,2,2.6,[.8,.72,.6],true);
  for(const y of [.55,1.05,1.55])c.box(-5.45,y,.9,.04,.04,2.4,[.55,.45,.35]);
  for(let k=0;k<3;k++){c.box(-5.5,.75,-.1+k*.8,.26,.3,.3,k%2?RED:[.85,.65,.3]);c.box(-5.5,.92,-.1+k*.8,.27,.03,.31,[.95,.95,.92])}
  for(let k=0;k<4;k++){c.box(-5.52,1.3,0+k*.6,.12,.4,.34,[.7,.4,.18]);c.box(-5.52,1.55,0+k*.6,.06,.1,.08,[.3,.2,.12])}
  for(let k=0;k<6;k++)c.box(-5.52,1.68,-.1+k*.4,.05,.24,.05,[.95,.92,.85]);
  /* a drum set by the back wall */
  c.box(-3.6,.35,3.9,.6,.5,.6,RED,true);c.box(-3.6,.62,3.9,.62,.03,.62,[.95,.95,.92]);c.box(-2.9,.5,3.7,.36,.3,.36,RED);c.box(-2.9,.66,3.7,.37,.02,.37,[.95,.95,.92]);c.box(-4.2,.9,3.6,.5,.02,.5,[.85,.7,.3]);c.box(-4.2,.45,3.6,.03,.9,.03,LEG);
  /* D: Thai instrument display on the right wall: a ranat (boat-shaped body, wooden bars) on a low stage */
  c.box(5.1,.08,-.6,1.4,.16,2.6,[.45,.28,.16],true);
  c.box(5.1,.36,-.6,.5,.36,1.6,[.55,.22,.12]);c.box(5.1,.58,-1.45,.5,.12,.12,[.55,.22,.12]);c.box(5.1,.58,.25,.5,.12,.12,[.55,.22,.12]);
  for(let k=0;k<12;k++)c.box(5.1,.58,-1.25+k*.135,.34-k*.012,.04,.1,[.86,.68,.42]);
  c.box(5.45,.3,-1.5,.08,.04,.4,[.4,.25,.12]);c.box(5.45,.3,.3,.08,.04,.4,[.4,.25,.12]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-4.77,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#1d4ed8';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Music Room · ห้องดนตรี',22,40);
   g.strokeStyle='#111827';g.lineWidth=2;for(let k=0;k<5;k++){g.beginPath();g.moveTo(22,92+k*14);g.lineTo(W-22,92+k*14);g.stroke()}
   g.fillStyle='#111827';[[90,134],[170,120],[250,106],[330,113],[410,99],[490,127],[570,120]].forEach(([x,y])=>{g.beginPath();g.ellipse(x,y,9,6.5,-.4,0,7);g.fill();g.fillRect(x+7,y-38,2.5,38)})}},
  {x:3.7,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#eff6ff';g.fillRect(0,0,W,H);g.fillStyle='#1d4ed8';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Carry instruments carefully.','ถือเครื่องดนตรีอย่างระมัดระวัง'],['Wait for your turn.','รอคิวของตนเอง'],['Ask the teacher for help.','ขอความช่วยเหลือจากครู']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>16){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>14){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('lalitamusic','Ms. Lalita','Music teacher⁣ครูดนตรี',0.9,-3.4,0,[0.85, 0.35, 0.45],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("Good morning. Why are you in the music room today?","สวัสดีตอนเช้า วันนี้เธอมาที่ห้องดนตรีทำไม","I'm here for our music practice.","I'm here to buy my lunch.","I'm here to borrow a library book.","คิดถึงจุดประสงค์ของการมาห้องดนตรีในเวลาเรียน","Great! You explain why you are here. | ดีมาก เธอบอกจุดประสงค์ที่มาห้องดนตรีได้ชัดเจน"),
  TT("Which instrument would you like to try today?","วันนี้เธออยากลองเล่นเครื่องดนตรีชนิดใด","I'd like to try the keyboard.","I'd like to draw a picture.","I'd like to read a story.","ตอบด้วยชื่อเครื่องดนตรีที่ต้องการลอง","Well done! You name the instrument you want to try. | เยี่ยมมาก เธอบอกเครื่องดนตรีที่อยากลองได้"),
  TT("How can we wait while another group practises?","เราควรรออย่างไรขณะที่อีกกลุ่มกำลังฝึกซ้อม","Let's wait quietly for our turn.","Let's move the chairs to the door.","Let's count the windows together.","นึกถึงการรอคิวที่ไม่รบกวนคนอื่น","Correct! Quiet waiting gives everyone a chance to practise. | ถูกต้อง การรออย่างสงบช่วยให้ทุกคนมีโอกาสฝึกซ้อม")]),
 NPCDEF('chompoomusic','Chompoo','Student practice leader⁣นักเรียนผู้นำการฝึกซ้อม',0.4,-0.2,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Can you help set up the chairs for practice?","เธอช่วยจัดเก้าอี้เพื่อฝึกซ้อมได้ไหม","Yes, I'll put the chairs in a row.","Yes, I'll put the bags on the table.","Yes, I'll close the curtains first.","ช่วยจัดเก้าอี้ให้เป็นแถว","Nice! You agree and explain how to arrange the chairs. | ดีมาก เธอตอบรับและบอกวิธีจัดเก้าอี้"),
  TT("Where should we place the music stands?","เราควรวางขาตั้งโน้ตเพลงไว้ที่ไหน","Let's place them near the chairs.","Let's put our shoes near the chairs.","Let's put the lunch boxes on the chairs.","เลือกตำแหน่งที่เหมาะสมสำหรับขาตั้งโน้ตเพลง","Good choice! The stands will be near the players. | เลือกได้ดี ขาตั้งจะอยู่ใกล้ผู้ฝึกซ้อม"),
  TT("We have two groups. Which group will you join?","เรามีสองกลุ่ม เธอจะเข้ากลุ่มไหน","I'll join the first group.","I'll carry the first chair.","I'll count the music stands.","ตอบว่าจะเข้ากลุ่มใด","Great! You tell your friend which group you will join. | ดีมาก เธอบอกเพื่อนได้ว่าจะเข้ากลุ่มใด")]),
 NPCDEF('earthmusic','Earth','Instrument helper⁣นักเรียนผู้ช่วยดูแลเครื่องดนตรี',-5.0,0.9,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("What instrument has black and white keys?","เครื่องดนตรีชนิดใดมีคีย์สีดำและสีขาว","It's a keyboard.","It's a drum.","It's a guitar.","สังเกตคำใบ้ว่าเป็นเครื่องดนตรีที่มีคีย์ดำและขาว","Correct! A keyboard has black and white keys. | ถูกต้อง คีย์บอร์ดมีคีย์สีดำและขาว"),
  TT("How will you carry this small drum safely?","เธอจะถือกลองใบเล็กนี้อย่างปลอดภัยได้อย่างไร","I'll carry it with both hands.","I'll put the music book on the desk.","I'll move the music stand near the wall.","คิดถึงการใช้มือประคองกลองให้มั่นคง","Good! Using both hands helps you carry it carefully. | ดีมาก การใช้สองมือช่วยให้ถือกลองได้มั่นคง"),
  TT("This drum is too heavy for you. What will you do?","กลองใบนี้หนักเกินไปสำหรับเธอ เธอจะทำอย่างไร","I'll ask the teacher for help.","I'll ask about tomorrow's lesson.","I'll ask where the window is.","เมื่อของหนักเกินไปควรขอความช่วยเหลือจากผู้ใหญ่","That's safe! Asking the teacher for help is sensible. | ปลอดภัยดี การขอให้ครูช่วยเป็นทางเลือกที่เหมาะสม")]),
 NPCDEF('mekmusic','Mek','Thai music classmate⁣เพื่อนผู้แนะนำเครื่องดนตรีไทย',4.9,1.3,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("What Thai instrument has wooden bars you can strike?","เครื่องดนตรีไทยชนิดใดมีลูกระนาดไม้สำหรับตี","It's a ranat, a Thai xylophone.","It's a recorder, a wind instrument.","It's a guitar, a string instrument.","นึกถึงเครื่องดนตรีไทยที่มีลูกระนาดเรียงกัน","Correct! A Thai xylophone is called a ranat in Thai. | ถูกต้อง เครื่องดนตรีชนิดนี้เรียกว่าระนาดในภาษาไทย"),
  TT("How can you invite a friend to practise music?","เธอจะชวนเพื่อนมาฝึกดนตรีด้วยกันอย่างไร","Would you like to practise with us?","Would you like to read with us?","Would you like to eat with us?","ใช้คำชวนที่สุภาพและเกี่ยวกับการฝึกดนตรี","Well done! You invite a friend politely. | เยี่ยมมาก เธอชวนเพื่อนอย่างสุภาพ"),
  TT("What should we do when our practice is finished?","เมื่อฝึกซ้อมเสร็จแล้ว เราควรทำอะไร","Let's put the instruments away carefully.","Let's arrange the chairs for lunch.","Let's leave our notebooks on the desks.","นึกถึงการดูแลและเก็บเครื่องดนตรีหลังใช้งาน","Excellent! You help keep the instruments safe. | ยอดเยี่ยม เธอช่วยดูแลเครื่องดนตรีให้ปลอดภัย")])]});

