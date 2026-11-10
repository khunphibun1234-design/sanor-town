/* ===== Classroom ===== */
SCENES.push({id:'classroom',name:'Classroom',th:'ห้องเรียน',color:'#0D9488',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.88,.82,.68]);shell(c,[.95,.95,.88],[.3,.5,.55],true);
  c.box(0,2.2,-6.1,7,2.2,.12,[.12,.3,.25]);c.box(0,3.35,-6.1,7.3,.12,.16,[.5,.35,.2]);c.box(0,1.1,-6.1,7.3,.12,.16,[.5,.35,.2]);
  c.box(-2.2,2.6,-6.02,2.2,.08,.04,[1,1,1]);c.box(-1.6,2.1,-6.02,1.6,.08,.04,[1,.9,.4]);
  c.box(5.2,1.9,-6.1,.9,.9,.1,[.9,.9,.95]);c.box(5.2,1.9,-6.04,.7,.7,.04,[1,1,1]);c.box(5.2,1.9,-6.0,.04,.3,.02,[.1,.1,.1]);
  c.box(-8.5,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(0,-4.8,3,[.6,.4,.25]);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,-2.4);c.table(6.5,.8);
  c.box(10.5,1.6,-3,.1,1.4,2.4,WIN);c.box(10.5,1.0,2,.1,1.4,2.4,WIN);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('suda','Teacher Suda','English teacher⁣ครูสอนภาษาอังกฤษ',0,-5.7,0,[.7,.3,.45],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Good morning, class! How are you today?",'สวัสดีตอนเช้านักเรียน วันนี้เป็นอย่างไรบ้าง',"I'm fine, thank you. And you?","Yes, I'm ready for class.","Nice to meet you, Teacher.",'ครูถามสารทุกข์สุกดิบ ให้ตอบและถามกลับ','And you? = แล้วคุณล่ะ'),
  TT("Please open your books to page ten.",'กรุณาเปิดหนังสือหน้าสิบ',"OK, Teacher.","I'm fine, Teacher.","Yes, it's ten o'clock.",'ครูสั่งให้เปิดหนังสือ ให้ตอบรับ','open your books to page ... = เปิดหนังสือหน้า ...'),
  TT("Do you have any questions?",'มีคำถามไหม',"Yes. What does this word mean?","OK, Teacher. I'll open my book.","Yes, I have a pen.",'ครูถามว่ามีคำถามไหม (Do you ...?) ถามความหมายของคำ','What does ... mean? = ... แปลว่าอะไร')]),
 NPCDEF('nok','Nok','Classmate⁣เพื่อนร่วมชั้น',-9.2,-.7,Math.PI/2,[.9,.4,.5],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Can I borrow your pen, please?",'สวัสดี ขอยืมปากกาหน่อยได้ไหม',"Sure. Here you go.","I like math.","Thanks! I have a pen.",'เพื่อนขอยืมปากกา ให้ตอบรับและยื่นให้','Can I borrow ...? = ขอยืม ... ได้ไหม'),
  TT("Thanks! What subject do you like?",'ขอบคุณ เธอชอบวิชาอะไร',"I like math.","Sure. Here you go.","My favorite color is blue.",'ถามว่าชอบวิชาอะไร ตอบ I like ...','subject = วิชา, math = คณิตศาสตร์ (อเมริกัน)'),
  TT("Is the test today or tomorrow?",'สอบวันนี้หรือพรุ่งนี้',"It's tomorrow.","I like math.","It's nine o'clock.",'ถามให้เลือก วันนี้หรือพรุ่งนี้ ตอบด้วยคำเดียว','test = การสอบ, tomorrow = พรุ่งนี้')]),
 NPCDEF('tom','Tom','Classmate⁣เพื่อนร่วมชั้น',8.6,-.7,-Math.PI/2,[.3,.6,.45],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. What time is it?",'ขอโทษนะ ตอนนี้กี่โมงแล้ว',"It's nine o'clock.","It's on the desk.","Sure. Here you go.",'ถามเวลา ตอบ It\'s ... o\'clock.','What time is it? = กี่โมงแล้ว'),
  TT("Where is the eraser?",'ยางลบอยู่ที่ไหน',"It's on the desk.","It's nine o'clock.","Yes, I have an eraser.",'ถามว่าอยู่ที่ไหน ตอบด้วย on / in / under','eraser = ยางลบ, desk = โต๊ะเรียน'),
  TT("Can you help me with my homework?",'ช่วยทำการบ้านหน่อยได้ไหม',"Sure. Let's do it together.","Yes, I do my homework.","OK, Teacher.",'เพื่อนขอให้ช่วย ให้ตอบรับ','homework = การบ้าน, together = ด้วยกัน')]),
 NPCDEF('monitor','Beam','Class monitor⁣หัวหน้าห้อง',3,1.2,Math.PI,[.25,.45,.7],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Good morning! Are you new here?",'สวัสดีตอนเช้า เธอเป็นนักเรียนใหม่หรือเปล่า',"No, I'm not. I'm in this class.","Good morning! I'm fine, thank you.","Yes, I do. I'm in this class.",'ถามว่าใหม่ไหม (Are you ...?) ตอบ No, I\'m not.','new = ใหม่, class = ห้องเรียน/ชั้น'),
  TT("Please clean the board today.",'วันนี้ช่วยลบกระดานด้วยนะ',"OK. I'll clean it now.","Sure. Here you go.","Yes, it's clean.",'ถูกขอให้ลบกระดาน ให้ตอบรับ','clean the board = ลบกระดาน'),
  TT("Class starts in five minutes.",'อีกห้านาทีเข้าเรียนแล้ว',"Thanks. I'll sit down now.","It's nine o'clock.","Yes, class is fun.",'ได้ยินว่าใกล้เข้าเรียน ให้ขอบคุณและนั่ง','starts in five minutes = เริ่มในอีกห้านาที')])]});

