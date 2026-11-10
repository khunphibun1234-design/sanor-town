/* ===== Sports Field ===== */
SCENES.push({id:'sports',name:'Sports Field',th:'สนามกีฬา',color:'#16A34A',spawn:[0,3.4,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.35,.65,.3]);
  c.box(0,.02,-1,22,.04,.14,[1,1,1]);c.box(0,.02,-7.6,22,.04,.14,[1,1,1]);c.box(0,.02,5.6,22,.04,.14,[1,1,1]);
  c.box(-11,.02,-1,.14,.04,13.2,[1,1,1]);c.box(11,.02,-1,.14,.04,13.2,[1,1,1]);c.box(0,.02,-1,.14,.04,13.2,[1,1,1]);
  c.box(-6,1.0,-8.4,.12,2,.12,[.95,.95,.95],true);c.box(-3.5,1.0,-8.4,.12,2,.12,[.95,.95,.95],true);c.box(-4.75,2.0,-8.4,2.6,.12,.12,[.95,.95,.95]);
  c.box(4.75,1.0,-8.4,.12,2,.12,[.95,.95,.95],true);c.box(7.3,1.0,-8.4,.12,2,.12,[.95,.95,.95],true);c.box(6.0,2.0,-8.4,2.6,.12,.12,[.95,.95,.95]);
  c.box(-9,.5,-4,2.6,.4,.8,[.6,.45,.3],true);c.box(-9,1.0,-4.5,2.6,.4,.5,[.6,.45,.3]);c.box(-9,1.5,-5,2.6,.4,.5,[.6,.45,.3]);
  c.box(8.8,.5,4.6,.7,1.0,.7,[.2,.5,.85],true);c.box(8.8,1.05,4.6,.5,.1,.5,[.95,.95,.95]);
  c.bench(-8.5,6.8);c.bench(8.5,6.8);c.tree(-11.8,6.8);c.tree(11.8,6.8);c.lamp(-4,6.6);c.lamp(4,6.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('kru','Coach Chai','PE teacher⁣ครูพละ',-2.4,-.8,Math.PI,[.15,.45,.7],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Hello, team! Are you ready for class?",'สวัสดีทุกคน พร้อมเรียนหรือยัง',"Yes, we are. Let's start!","Yes, I do. Let's start!","Good morning, Coach! I'm fine.",'ครูถามว่าพร้อมไหม (Are you ...?) ตอบ Yes, we are.','Are you ready? = พร้อมหรือยัง'),
  TT("First, run around the field twice.",'ก่อนอื่น วิ่งรอบสนามสองรอบ',"OK, Coach. I'll run now.","Yes, we are.","Thank you, Coach.",'ครูสั่งให้วิ่ง ให้ตอบรับ','run around ... = วิ่งรอบ ..., twice = สองครั้ง'),
  TT("Good job! Drink some water.",'เก่งมาก ดื่มน้ำหน่อยนะ',"Thank you, Coach.","OK, Coach. I'll run now.","Yes, we are.",'ครูชม ให้ขอบคุณ','Good job! = เก่งมาก')]),
 NPCDEF('ball','Ball','Soccer player⁣นักฟุตบอล',5.0,-4.0,Math.PI,[.9,.25,.25],[.95,.95,.95],[.08,.06,.07],'',[
  TT("Hey! Do you play soccer?",'นี่ เธอเล่นฟุตบอลไหม',"Yes, I do. I play every Friday.","Yes, I am. I play every Friday.","Sure. I'd love to.",'ถามว่าเล่นไหม (Do you ...?) ตอบ Yes, I do.','soccer = ฟุตบอล (อเมริกัน), every Friday = ทุกวันศุกร์'),
  TT("Great! Can you join our team?",'เยี่ยม เธอมาเล่นทีมเราได้ไหม',"Sure. I'd love to.","Yes, I do. I play every Friday.","Thank you, Coach.",'ถูกชวนเข้าทีม ให้ตอบรับ','join = เข้าร่วม, I\'d love to. = ยินดีเลย'),
  TT("Pass the ball to me!",'ส่งบอลมาให้หน่อย',"OK! Here it comes.","Sure. I'd love to.","Yes, I do. Here you go.",'ถูกขอให้ส่งบอล ให้ตอบรับ','pass = ส่ง (บอล)')]),
 NPCDEF('may','May','Classmate⁣เพื่อนร่วมชั้น',-8.6,1.2,Math.PI/2,[.95,.6,.2],[.2,.25,.4],[.08,.06,.07],'long',[
  TT("Hi! What sports do you like?",'สวัสดี เธอชอบกีฬาอะไร',"I like badminton.","Yes, I like sports.","Good idea. See you then!",'ถามว่าชอบกีฬาอะไร ตอบ I like ...','badminton = แบดมินตัน'),
  TT("Me too! Let's play after school.",'ฉันก็ชอบ เล่นกันหลังเลิกเรียนนะ',"Good idea. See you then!","I like badminton.","Yes, I am. After school.",'เพื่อนชวนเล่น ให้ตอบรับ','Let\'s ... = ไป ... กันเถอะ, Good idea. = ความคิดดี'),
  TT("Are you good at sports?",'เธอเก่งกีฬาไหม',"Yes, I am. I'm good at running.","Yes, I do. I like sports.","Good idea. See you then!",'ถามว่าเก่งไหม (Are you ...?) ตอบ Yes, I am.','be good at ... = เก่งเรื่อง ...')]),
 NPCDEF('runner','Rin','Runner⁣นักวิ่ง',8.2,.4,-Math.PI/2,[.2,.7,.5],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Hi! Are you tired?",'สวัสดี เธอเหนื่อยไหม',"Yes, I am. I ran a lot.","Yes, I do. I run a lot.","I exercise three times a week.",'ถามว่าเหนื่อยไหม (Are you ...?) ตอบ Yes, I am.','tired = เหนื่อย, ran = วิ่งแล้ว (อดีตของ run)'),
  TT("How often do you exercise?",'เธอออกกำลังกายบ่อยแค่ไหน',"I exercise three times a week.","Yes, I do. Three times.","Yes, I am. I ran a lot.",'ถามความถี่ ตอบด้วย times a week','three times a week = สัปดาห์ละสามครั้ง'),
  TT("Exercise is good for your health.",'การออกกำลังกายดีต่อสุขภาพนะ',"I agree. Let's run together.","Yes, I am tired.","OK, Coach. I'll run now.",'ได้ยินคำแนะนำ ให้เห็นด้วยและชวนวิ่ง','I agree. = ฉันเห็นด้วย, health = สุขภาพ')])]});

