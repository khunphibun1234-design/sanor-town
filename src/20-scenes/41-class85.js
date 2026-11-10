/* ===== Our school: a classroom (no room number on purpose: the teacher teaches several classes) on the ground floor of building 6 (English lesson, prototype) =====
   Reached from the flagpole yard by the path to building 6 (west side); the door at the back right leads out again.
   The side and back walls are low (cut away) so the 360-degree camera can always see inside; the front wall with
   the whiteboard is higher (2.3 m). The lesson is made up for the game; NPC names are made up. */
SCENES.push({id:'class85',name:'Classroom · Phibun School',th:'ห้องเรียน อาคาร 3',color:'#0F766E',orbit:true,spawn:[4.5,1.8,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[-9,-1.6,0]}],/* the classroom door leads back to the Building 3 corridor (3 Nov) */
 build(){const c=mk();
  const WALL=[.93,.9,.82],CAP=[.62,.5,.36],DESK=[.86,.72,.5],LEG=[.42,.44,.48],CHAIR=[.25,.45,.7];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  /* tiled floor */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.88,.86,.8]:[.8,.78,.72]);
  /* front wall (full height) with whiteboard, clock and a notice board */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(0,1.55,-4.83,4.9,1.3,.04,[.55,.56,.6]);c.box(0,1.55,-4.8,4.7,1.16,.04,[.98,.98,.98]);c.box(0,.88,-4.72,4.6,.06,.14,[.55,.56,.6]);
  c.box(3.6,1.95,-4.83,.44,.44,.04,[.98,.98,.98]);c.box(3.6,1.95,-4.8,.05,.26,.02,[.1,.1,.1]);
  c.box(-4.2,1.5,-4.83,1.8,1,.04,[.62,.42,.25]);c.box(-4.4,1.6,-4.8,.5,.55,.02,[.95,.85,.4]);c.box(-3.8,1.45,-4.8,.5,.45,.02,[.6,.85,.95]);
  /* low side and back walls (cut away), with a door gap at the back right */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* lockers along the back wall */
  for(let k=0;k<6;k++)c.box(-5.2+k*.75,.55,4.55,.7,1.1,.5,k%2?[.3,.5,.75]:[.35,.56,.8]);c.ob.push([-5.6,-.7,4.3,4.9]);
  /* teacher's desk and chair */
  c.box(-3.4,.75,-3.5,1.7,.08,.85,[.6,.4,.26]);c.box(-3.4,.38,-3.5,1.6,.72,.7,[.52,.34,.22],true);
  c.box(-3.4,.45,-2.8,.5,.08,.5,CHAIR);c.box(-3.4,.75,-2.57,.5,.55,.06,CHAIR);
  c.box(-3.8,.84,-3.6,.5,.1,.36,[.9,.3,.3]);c.box(-3.1,.84,-3.5,.36,.06,.26,[.95,.95,.92]);
  /* 4 x 3 student desks with chairs; some classmates are already sitting */
  const desk=(x,z)=>{c.box(x,.72,z,.9,.06,.6,DESK);c.box(x-.38,.36,z,.06,.72,.5,LEG);c.box(x+.38,.36,z,.06,.72,.5,LEG);
   c.box(x,.44,z+.6,.44,.06,.42,CHAIR);c.box(x,.7,z+.8,.44,.46,.05,CHAIR);c.box(x,.22,z+.6,.06,.44,.06,LEG);c.ob.push([x-.45,x+.45,z-.3,z+.85])};
  const sit=(x,z,girl)=>{const p=z+.58;c.box(x,.97,p,.42,.52,.24,[.97,.97,.95]);c.box(x,1.39,p,.32,.32,.28,[.86,.66,.5]);
   c.box(x,1.58,p+.02,.34,.08,.32,[.08,.06,.06]);if(girl)c.box(x,1.4,p+.15,.34,.3,.06,[.08,.06,.06]);
   c.box(x-.1,.52,p-.15,.14,.14,.36,[.12,.16,.33]);c.box(x+.1,.52,p-.15,.14,.14,.36,[.12,.16,.33]);c.box(x,.77,z,.3,.03,.22,[.95,.95,.92])};
  const DX=[-3.6,-1.2,1.2,3.6],DZ=[-1.6,.5,2.5];
  for(const x of DX)for(const z of DZ)desk(x,z);
  sit(-3.6,-1.6,true);sit(-1.2,-1.6,false);sit(3.6,-1.6,true);sit(-3.6,2.5,false);sit(1.2,.5,true);sit(-1.2,2.5,true);
  /* way out: big arrow to the door and a sign beside it */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);/* sign board above the door */
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:0,y:1.55,z:-4.77,w:4.6,h:1.12,ry:0,cw:740,ch:180,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#1d4ed8';g.font="700 38px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('English class  ·  คาบภาษาอังกฤษ',30,36);
   g.fillStyle='#b91c1c';g.font="700 34px Anuphan, sans-serif";g.fillText('Classroom English',30,88);
   g.fillStyle='#111827';g.font="600 30px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Open your book to page 25.  เปิดหนังสือหน้า 25',30,140)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Multipurpose Dome','โดมอเนกประสงค์','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('teacher','Mr. Krit','English teacher⁣ครูภาษาอังกฤษ',1,-3.7,0,[.35,.55,.8],[.2,.2,.26],[.1,.08,.07],'',[
  TT("Good morning, everyone. How are you today?","สวัสดีตอนเช้าทุกคน วันนี้เป็นอย่างไรบ้าง","I'm fine, thank you. And you?","I'm twelve years old.","I'm ready for English class.","ครูถามความรู้สึกวันนี้ ไม่ได้ถามอายุหรือความพร้อมเรียน","Useful English: “How are you?” — “I’m fine, thank you. And you?” | ภาษาไทย: ใช้ตอบคำถามเกี่ยวกับความเป็นอยู่และถามกลับอย่างสุภาพ"),
  TT("Please open your book to page twenty-five.","กรุณาเปิดหนังสือหน้า 25","OK. Page twenty-five.","OK. Page fifteen.","OK. I will close my book.","ฟังทั้งคำสั่ง open และหมายเลขหน้า twenty-five","Useful English: “Open your book to page twenty-five.” — “OK. Page twenty-five.” | ภาษาไทย: open = เปิดหนังสือ; page twenty-five = หน้า 25 ควรฟังเลขหน้าให้ถูกต้อง"),
  TT("Do you have any questions?","มีคำถามอะไรไหม","Yes. What does 'library' mean?","Yes. I have my book.","No, I don't have a pencil.","หากมีคำถาม ให้ถามความหมายคำศัพท์อย่างสุภาพ","Useful English: “What does ‘library’ mean?” | ภาษาไทย: What does … mean? ใช้ถามความหมายของคำศัพท์ที่ไม่เข้าใจ")]),
 NPCDEF('pim','Pim','Deskmate⁣เพื่อนข้างโต๊ะ',-2.4,1.1,Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("Oh no! I forgot my pencil. Can I borrow yours?","แย่แล้ว ฉันลืมดินสอ ขอยืมของเธอได้ไหม","Sure. Here you are.","Sure. My pencil is blue.","Yes, you can borrow my ruler.","เพื่อนขอยืมดินสอ ให้เลือกคำตอบที่ยอมให้ยืมและยื่นดินสอ","Useful English: “Can I borrow yours?” — “Sure. Here you are.” | ภาษาไทย: borrow = ขอยืม; Here you are. ใช้เมื่อยื่นสิ่งของให้ผู้อื่น"),
  TT("Thanks! I'll give it back after class.","ขอบคุณนะ ฉันจะคืนให้หลังเลิกคาบ","No problem.","Can I borrow it after class?","Please give it back before class.","เพื่อนขอบคุณและบอกเวลาคืน ให้ตอบรับอย่างเป็นมิตร","Useful English: “I’ll give it back after class.” — “No problem.” | ภาษาไทย: give it back = คืนสิ่งของ; No problem. ใช้ตอบรับอย่างเป็นมิตร"),
  Object.assign(TT("What is this called in English?","สิ่งนี้เรียกเป็นภาษาอังกฤษว่าอะไร (ขณะชี้ไปที่ยางลบ)","It's an eraser.","It's a ruler.","It's a pencil.","สังเกตวัตถุที่เพื่อนชี้: ยางลบ","Useful English: “What is this called in English?” — “It’s an eraser.” | ภาษาไทย: eraser = ยางลบ; ใช้ an หน้า eraser"),{img:'eraser'})]),
 NPCDEF('fame2','Fame','Classmate⁣เพื่อนร่วมห้อง',2.4,-.9,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.1,.08,.07],'',[
  TT("Here's my homework. Can you check my answers?","นี่การบ้านของฉัน ช่วยตรวจคำตอบให้หน่อยได้ไหม","Sure. Most are right, but check number three.","Sure. I'll copy your answers.","Sure. I'll check your spelling only.","เพื่อนขอให้ช่วยตรวจคำตอบ ไม่ใช่ลอกงาน","Useful English: “Can you check my answers?” — “Sure. Most are right, but check number three.” | ภาษาไทย: check my answers = ตรวจคำตอบ; most are right = ส่วนใหญ่ถูก ช่วยตรวจอย่างให้กำลังใจ ไม่ใช่ลอกงาน"),
  TT("Really? What's the right answer?","จริงหรือ แล้วคำตอบที่ถูกคืออะไร","It's 'went', not 'goed'.","It's 'go', not 'went'.","I don't know. Let's skip it.","รูปอดีตของ go คือ went","Useful English: “What’s the right answer?” — “It’s ‘went’, not ‘goed’.” | ภาษาไทย: went เป็นรูปอดีต (past simple) ของ go ไม่ใช่ goed"),
  TT("Thanks! You're good at English.","ขอบคุณ เธอเก่งภาษาอังกฤษนะ","Thanks! Let's study together.","Yes, I'm better than everyone.","Thanks! I don't want to study with you.","ตอบรับคำชมอย่างสุภาพและชวนเพื่อนเรียนร่วมกัน","Useful English: “You’re good at English.” — “Thanks! Let’s study together.” | ภาษาไทย: ตอบรับคำชมและชวนเพื่อนเรียนร่วมกันอย่างสุภาพ")]),
 NPCDEF('monitor','Bank','Class monitor⁣หัวหน้าห้อง',5,-2.6,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.12,.1,.08],'',[
  TT("Please pass your homework to the front.","กรุณาส่งการบ้านไปด้านหน้าห้อง","OK. Here's my homework.","OK. I'll put my homework in my bag.","OK. I'll give it to you tomorrow.","คำว่า pass ... to the front หมายถึงส่งต่อไปด้านหน้า","Useful English: “Please pass your homework to the front.” — “OK. Here’s my homework.” | ภาษาไทย: pass … to the front = ส่งต่อไปด้านหน้า; homework = การบ้าน"),
  TT("Who is on cleaning duty today?","วันนี้ใครเป็นเวรทำความสะอาด","Pim and I are. We'll sweep the floor.","Pim and I were on duty yesterday.","Pim and I will clean the room tomorrow.","สังเกตคำว่า today ในคำถาม","Useful English: “Who is on cleaning duty today?” — “Pim and I are. We’ll sweep the floor.” | ภาษาไทย: on cleaning duty = เป็นเวรทำความสะอาด; sweep the floor = กวาดพื้น"),
  TT("Don't forget to close the windows after school.","อย่าลืมปิดหน้าต่างหลังเลิกเรียนนะ","OK. I won't forget.","OK. I'll open the windows after school.","OK. I'll close the windows before class.","ฟังให้ครบทั้งการกระทำ close และเวลา after school","Useful English: “Don’t forget to close the windows after school.” — “OK. I won’t forget.” | ภาษาไทย: close the windows = ปิดหน้าต่าง; after school = หลังเลิกเรียน")])]});

