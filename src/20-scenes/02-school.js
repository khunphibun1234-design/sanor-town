/* 3 School */
SCENES.push({id:'school',name:'School',th:'โรงเรียน',color:'#2447C8',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.8,.78,.7]);shell(c,[.96,.85,.62],[.75,.25,.2],false);
  for(const x of [-8,-5.4,5.4,8])c.box(x,2.4,-6.18,1.6,1.2,.06,WIN);
  c.box(0,3.6,-6.14,6,.7,.06,[.2,.3,.6]);c.box(0,1.0,-6.18,2,2,.06,DOOR);
  c.box(8.6,.03,3.5,6.4,.04,7,[.3,.55,.8]);c.box(8.6,.06,3.5,.1,.02,7,[1,1,1]);
  c.box(-10,2.5,-4.2,.12,5,.12,[.8,.8,.8],true);
  [[4.9,.1,[.8,.1,.1]],[4.8,.1,[1,1,1]],[4.65,.2,[.15,.2,.6]],[4.5,.1,[1,1,1]],[4.4,.1,[.8,.1,.1]]].forEach(([y,h,col])=>c.box(-9.5,y,-4.2,.8,h,.04,col));
  c.box(-10.5,1.2,3,3.2,2.4,3,[.8,.9,.8],true);c.box(-10.5,2.55,3,3.6,.2,3.4,[.35,.5,.35]);
  c.box(-8.88,1.9,3,.06,.5,2,[.2,.3,.6]);c.box(-8.88,.95,3,.06,1.9,1,DOOR);
  c.box(12,1.5,3.5,.1,3,.1,[.5,.5,.5],true);c.box(11.8,3,3.5,.1,1,1.4,[.9,.9,.9]);
  c.bench(3,-2.5);c.tree(-11.4,-6.5);c.tree(11.4,-6.5);c.tree(-6,7.5);c.lamp(-4,-1);c.lamp(5,-5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 {id:'anong',name:'Ms. Anong',role:'Teacher⁣ครู',x:-4,z:-4.8,ry:0,shirt:[.5,.25,.65],pants:[.2,.2,.3],hair:[.1,.07,.07],acc:'bun',turns:[
  TT("Good morning! How are you today?",'อรุณสวัสดิ์ วันนี้เป็นอย่างไรบ้าง',"I'm fine, thank you. And you?","I'm ready for class.","Nice to meet you.",'ครูถามสารทุกข์สุกดิบ ให้ตอบและถามกลับ','How are you? ตอบ I\'m fine, thank you. And you?'),
  TT("I'm great, thanks. Are you ready for class?",'ครูสบายดี พร้อมเข้าเรียนหรือยัง',"Yes, I am. What time does class start?","Yes, I am. I'm fine, thank you.","Yes, it starts at eight thirty.",'ถามว่าพร้อมไหม ให้ตอบและถามเวลาเรียน','What time does ... start? = ... เริ่มกี่โมง'),
  TT("It starts at eight thirty. Please hurry!",'เริ่มแปดโมงครึ่ง รีบหน่อยนะ',"OK. See you in class!","What time does class start?","Thank you. I'm fine.",'ครูบอกเวลาและเร่ง ให้ตอบรับและลา','See you in class! = เจอกันในห้องเรียน')]},
 {id:'ton',name:'Ton',role:'Classmate⁣เพื่อนร่วมชั้น',x:3,z:-1.2,ry:0,shirt:[.95,.95,.95],pants:[.15,.2,.45],hair:[.08,.06,.05],acc:'',turns:[
  TT("Hi! What's your favorite subject?",'หวัดดี วิชาที่เธอชอบที่สุดคืออะไร',"My favorite subject is English.","My favorite color is blue.","Yes, I like school.",'ถามวิชาที่ชอบ ให้ตอบชื่อวิชา','My favorite subject is ... = วิชาที่ฉันชอบคือ ...'),
  TT("Really? Why do you like it?",'จริงเหรอ ทำไมถึงชอบ',"Because it is fun.","I like it every Monday.","Yes, I really like it.",'ถามเหตุผล ให้ตอบด้วย Because ...','Why ...? ตอบด้วย Because ... = เพราะว่า ...'),
  TT("Cool! Do you want to play basketball after school?",'เจ๋ง! เลิกเรียนไปเล่นบาสไหม',"Sure! See you at four o'clock.","It's four o'clock.","It's after school.",'ชวนเล่นบาส ให้ตอบรับ','Sure! = ได้เลย ใช้ตอบรับคำชวน')]},
 {id:'prem',name:'Mr. Prem',role:'Librarian⁣บรรณารักษ์',x:-7.6,z:3.2,ry:Math.PI/2,shirt:[.2,.55,.4],pants:[.3,.3,.35],hair:[.7,.7,.72],acc:'',turns:[
  TT("Hello. Can I help you?",'สวัสดีครับ ให้ช่วยอะไรไหม',"Yes. I'd like to borrow a book, please.","I'm fine, thank you. And you?","Yes, I can help you.",'บรรณารักษ์ถามว่าให้ช่วยไหม ให้บอกว่าต้องการยืมหนังสือ','borrow a book = ยืมหนังสือ'),
  TT("Sure. What kind of book?",'ได้ครับ หนังสือประเภทไหน',"An English story book, please.","Yes, I'd like a book, please.","It's on the desk.",'ถามประเภทหนังสือ ให้ตอบประเภท','What kind of ...? = ... ประเภทไหน'),
  TT("Here you are. Please return it in two weeks.",'นี่ครับ กรุณาคืนภายในสองสัปดาห์',"OK. Thank you very much!","I'd like to borrow a book.","Where is the library?",'ได้หนังสือแล้ว ให้ตอบรับและขอบคุณ','return = คืน, in two weeks = ภายในสองสัปดาห์')]},
 {id:'nan',name:'Nan',role:'Student⁣นักเรียนอีกคน',x:8,z:-2,ry:0,shirt:[.95,.4,.4],pants:[.2,.2,.3],hair:[.12,.08,.05],acc:'long',turns:[
  TT("Excuse me. Where is the library?",'ขอโทษนะ ห้องสมุดอยู่ที่ไหน',"Go straight. It's on the left.","Yes, the library is big.","Thank you. Where is the library?",'เพื่อนถามทาง ให้บอกทางไปห้องสมุด','Go straight = เดินตรงไป, on the left = ทางซ้าย'),
  TT("Thanks! Is it far?",'ขอบคุณ! ไกลไหม',"No, it's very close.","Yes, it's close.","Turn left. Thank you.",'ถามว่าไกลไหม ให้ตอบว่าไกลหรือใกล้','close = ใกล้, far = ไกล'),
  TT("Great. See you later!",'เยี่ยม แล้วเจอกันนะ',"See you! Bye.","Thanks! Where is the library?","Good morning!",'เพื่อนลา ให้ลากลับ','See you later! = แล้วเจอกัน')]}]});
