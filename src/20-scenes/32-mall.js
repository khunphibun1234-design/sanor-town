/* ===== Mall ===== */
SCENES.push({id:'mall',name:'Mall',th:'ห้างสรรพสินค้า',color:'#DB2777',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.93,.9,.88]);shell(c,[.97,.94,.96],[.75,.2,.5],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.85,.25,.55]);c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.box(-8.8,1.2,-6.1,2.8,1.6,.1,[.3,.4,.8]);c.box(-8.8,1.2,-6.0,2.4,.9,.06,[.95,.95,.7]);
  c.box(8.8,1.2,-6.1,2.8,1.6,.1,[.15,.15,.25]);c.box(8.8,1.2,-6.0,2.4,1.1,.06,[.85,.3,.3]);
  c.counter(0,-4.6,2.6,[.8,.8,.9]);c.box(.5,1.3,-4.5,.5,.4,.4,[.2,.2,.25]);c.box(-.6,1.3,-4.5,.4,.1,.5,[.95,.9,.6]);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,-2.4);c.table(6.5,.8);
  c.box(-7,1.2,1,.5,.15,.4,[.9,.3,.2]);c.box(-7,1.2,-2.4,.5,.15,.4,[.95,.8,.2]);c.box(6.5,1.2,-2.4,.5,.15,.4,[.3,.6,.9]);
  c.box(-1.5,.2,2.4,3,.4,.9,[.5,.55,.65]);c.box(1.6,.2,2.4,.14,.4,.9,[.9,.9,.4]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-11.4,-2);c.tree(11.4,-2);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('info','Ms. Anne','Information desk⁣เจ้าหน้าที่ประชาสัมพันธ์',0,-5.5,0,[.8,.25,.5],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Welcome to the mall! How can I help you?",'ยินดีต้อนรับสู่ห้างค่ะ ให้ช่วยอะไรคะ',"Where is the food court?","I'm fine, thank you.","It's on the third floor.",'เจ้าหน้าที่ถามว่าให้ช่วยอะไร ให้ถามหาลานอาหาร','food court = ลานอาหาร (ในห้าง)'),
  TT("It's on the third floor, next to the movie theater.",'อยู่ชั้นสาม ข้างโรงภาพยนตร์ค่ะ',"How can I get there?","Where is the food court?","Yes, I'd like a ticket, please.",'ได้ที่ตั้งแล้ว ให้ถามวิธีไป','movie theater = โรงภาพยนตร์ (อเมริกัน), third floor = ชั้นสาม'),
  TT("Take the escalator over there.",'ขึ้นบันไดเลื่อนตรงนั้นเลยค่ะ',"Thank you very much.","Welcome to the mall!","It's on the third floor.",'ได้ทางแล้ว ให้ขอบคุณ','escalator = บันไดเลื่อน')]),
 NPCDEF('ticket','Mr. Ray','Movie ticket seller⁣พนักงานขายตั๋วหนัง',-7.4,-.2,Math.PI/2,[.25,.25,.4],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hi! Which movie do you want to see?",'สวัสดีครับ จะดูหนังเรื่องไหนครับ',"I'd like to see the new comedy.","Seven, please.","Here you are. Thanks!",'ถามว่าจะดูเรื่องไหน ให้ตอบประเภทหนังที่อยากดู','comedy = หนังตลก, I\'d like to see ... = ฉันอยากดู ...'),
  TT("What time? Seven or nine?",'รอบกี่โมงครับ เจ็ดโมงหรือสามทุ่ม',"Seven, please.","I'd like to see the new comedy.","Two hundred baht, please.",'ถามให้เลือกรอบ ตอบตัวเลขหนึ่งอย่าง','Seven or nine? = เจ็ดหรือเก้า'),
  TT("Two tickets are two hundred baht.",'ตั๋วสองใบ สองร้อยบาทครับ',"Here you are. Thanks!","Seven, please.","I'd like to see the new comedy.",'ได้ราคาแล้ว ให้จ่ายเงิน','tickets = ตั๋ว (พหูพจน์)')]),
 NPCDEF('friend','Gift','Friend⁣เพื่อน',6.4,3.0,Math.PI,[.9,.5,.7],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Let's go shopping together.",'สวัสดี ไปเดินซื้อของด้วยกันเถอะ',"Sure. What do you want to buy?","I want to buy new shoes.","Where is the food court?",'เพื่อนชวนไปซื้อของ ให้ตอบรับและถามว่าจะซื้ออะไร','Let\'s ... = ไป ... กันเถอะ, What do you want to buy? = เธออยากซื้ออะไร'),
  TT("I want to buy new shoes.",'ฉันอยากซื้อรองเท้าคู่ใหม่',"The shoe store is on the second floor.","Sure. What do you want to buy?","Yes, I'm hungry, too.",'เพื่อนอยากซื้อรองเท้า ให้บอกว่าร้านอยู่ชั้นไหน','shoe store = ร้านรองเท้า, second floor = ชั้นสอง'),
  TT("Are you hungry? Let's eat first.",'เธอหิวไหม กินข้าวก่อนเถอะ',"Good idea. I'm hungry, too.","The shoe store is on the second floor.","Sure. What do you want to buy?",'ถามว่าหิวไหม (Are you ...?) ตอบรับและบอกว่าหิวเช่นกัน','Good idea. = ความคิดดี')]),
 NPCDEF('guard','Mr. Chart','Security guard⁣เจ้าหน้าที่รักษาความปลอดภัย',-2.8,1.4,Math.PI,[.2,.25,.35],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Good afternoon! The mall closes at ten.",'สวัสดีตอนบ่าย ห้างปิดสี่ทุ่มนะครับ',"OK. Thanks for telling me.","Sorry. I'll walk.","Yes, there is. It's next to the elevator.",'ได้ยินเวลาปิดห้าง ให้ตอบรับและขอบคุณ','closes at ten = ปิดสี่ทุ่ม (22:00)'),
  TT("Please don't run in the mall.",'กรุณาอย่าวิ่งในห้างนะครับ',"Sorry. I'll walk.","Yes, there is. It's on the third floor.","It's ten o'clock.",'ถูกเตือนห้ามวิ่ง ให้ขอโทษและรับปาก','Please don\'t ... = กรุณาอย่า ...'),
  TT("Is there a restroom near here?",'แถวนี้มีห้องน้ำไหมครับ',"Yes, there is. It's next to the elevator.","Sorry. I'll walk.","Yes, I am. It's next to the elevator.",'ถามว่ามีไหม (Is there ...?) ตอบ Yes, there is.','elevator = ลิฟต์ (อเมริกัน)')])]});

