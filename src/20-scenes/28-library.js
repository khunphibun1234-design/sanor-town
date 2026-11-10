/* ===== Library ===== */
SCENES.push({id:'library',name:'Library',th:'ห้องสมุด',color:'#7C3AED',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.82,.72,.58]);shell(c,[.96,.92,.84],[.4,.25,.55],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.45,.25,.65]);c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  const bc=[[.85,.3,.3],[.3,.5,.85],[.95,.8,.25],[.35,.7,.45],[.7,.4,.8]];
  for(const bx of [-9.5,-6.5]){c.box(bx,1.1,-5.8,2.4,2.2,.6,[.55,.38,.22],true);for(let r=0;r<3;r++)for(let k=0;k<6;k++)c.box(bx-1.0+k*.4,.55+r*.7,-5.45,.28,.5,.2,bc[(r+k)%5]);}
  for(const bx of [6.5,9.5]){c.box(bx,1.1,-5.8,2.4,2.2,.6,[.55,.38,.22],true);for(let r=0;r<3;r++)for(let k=0;k<6;k++)c.box(bx-1.0+k*.4,.55+r*.7,-5.45,.28,.5,.2,bc[(r+k+2)%5]);}
  c.counter(0,-4.6,3,[.7,.5,.3]);c.box(.6,1.3,-4.5,.5,.4,.4,[.2,.2,.25]);c.box(-.7,1.3,-4.5,.4,.2,.5,[.85,.3,.3]);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,-2.4);c.table(6.5,.8);
  c.box(-7,1.1,1,.5,.1,.35,[.3,.5,.85]);c.box(6.5,1.1,.8,.5,.1,.35,[.85,.3,.3]);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('libn','Ms. Siri','Librarian⁣บรรณารักษ์',0,-5.6,0,[.5,.3,.65],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! Can I help you find a book?",'สวัสดีค่ะ ให้ช่วยหาหนังสือไหมคะ',"Yes, please. I'm looking for a story book.",'Yes, I do. Here it is.','OK. I\'ll bring it back on time.','บรรณารักษ์ถามว่าให้ช่วยไหม ให้บอกว่ากำลังหาหนังสือนิทาน','story book = หนังสือนิทาน'),
  TT("Do you have a library card?",'มีบัตรห้องสมุดไหมคะ',"Yes, I do. Here it is.",'Yes, please. I\'m looking for a story book.','OK. I\'ll bring it back on time.','ถามว่ามีบัตรไหม (Do you ...?) ตอบ Yes, I do.','library card = บัตรห้องสมุด'),
  TT("You can keep it for two weeks.",'ยืมได้สองสัปดาห์ค่ะ',"OK. I'll bring it back on time.",'Yes, I do. Here it is.','Yes, please. I\'m looking for a story book.','ได้ยินระยะเวลายืม ให้ตอบรับและสัญญาว่าจะคืน','keep = เก็บไว้/ยืม, on time = ตรงเวลา')]),
 NPCDEF('stu1','Pim','Student⁣นักเรียน',-9.4,-.6,Math.PI/2,[.9,.5,.65],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Shh! Please be quiet in the library.",'ชู่ว กรุณาเงียบในห้องสมุดนะ',"Sorry. I'll be quiet.",'I\'m reading a science book.','No, it isn\'t. It has many pictures.','ถูกเตือนให้เงียบ ให้ขอโทษและรับปาก','be quiet = เงียบ'),
  TT("It's OK. What are you reading?",'ไม่เป็นไร เธออ่านอะไรอยู่',"I'm reading a science book.",'Sorry. I\'ll be quiet.','No, it isn\'t. It has many pictures.','ถามว่ากำลังอ่านอะไร ตอบด้วย I\'m reading ...','science = วิทยาศาสตร์'),
  TT("Sounds interesting! Is it hard?",'น่าสนใจจัง ยากไหม',"No, it isn't. It has many pictures.",'I\'m reading a science book.','Sorry. I\'ll be quiet.','ถามว่ายากไหม (Is ...?) ตอบ No, it isn\'t.','Sounds interesting! = ฟังดูน่าสนใจ, picture = รูปภาพ')]),
 NPCDEF('stu2','Jack','Student⁣นักเรียน',8.6,-.6,-Math.PI/2,[.3,.55,.7],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. Is this seat free?",'ขอโทษนะ ที่นั่งนี้ว่างไหม',"Yes, it is. Please sit down.",'Sure. Here you go.','Me too. Let\'s study together.','ถามว่าที่ว่างไหม (Is ...?) ตอบ Yes, it is.','free = ว่าง'),
  TT("Thanks! Do you have a pencil I can borrow?",'ขอบคุณ มีดินสอให้ยืมไหม',"Sure. Here you go.",'Yes, it is. Please sit down.','Me too. Let\'s study together.','เพื่อนขอยืมดินสอ ให้ตอบรับและยื่นให้','Do you have ...? = มี ... ไหม'),
  TT("I need to finish my homework before 5 o'clock.",'ฉันต้องทำการบ้านให้เสร็จก่อนห้าโมงเย็น',"Me too. Let's study together.",'Sure. Here you go.','Yes, it is. Please sit down.','เพื่อนบอกว่าต้องรีบทำงาน ให้ตอบและชวนทำด้วยกัน','finish = ทำให้เสร็จ, before = ก่อน')]),
 NPCDEF('teacher2','Teacher Wan','Teacher⁣ครู',3.0,1.0,Math.PI,[.4,.3,.65],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Good afternoon! Are you here to read?",'สวัสดีตอนบ่าย มาอ่านหนังสือหรือคะ',"Yes, I am. I like reading.",'I like comic books.','OK, Teacher. I will.','ครูถามว่ามาอ่านไหม (Are you ...?) ตอบ Yes, I am.','like + V-ing = ชอบทำ ...'),
  TT("What kind of books do you like?",'เธอชอบหนังสือประเภทไหน',"I like comic books.",'Yes, I am. I like reading.','OK, Teacher. I will.','ถามประเภทหนังสือที่ชอบ ตอบ I like ...','kind = ประเภท, comic book = หนังสือการ์ตูน'),
  TT("Please return your books by Friday.",'กรุณาคืนหนังสือภายในวันศุกร์นะ',"OK, Teacher. I will.",'I like comic books.','Yes, I am. I like reading.','ครูขอให้คืนหนังสือ ให้ตอบรับ','return = คืน, by Friday = ภายในวันศุกร์')])]});

