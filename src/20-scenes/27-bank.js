/* ===== Bank ===== */
SCENES.push({id:'bank',name:'Bank',th:'ธนาคาร',color:'#1D4ED8',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.86,.87,.9]);shell(c,[.93,.95,.99],[.1,.25,.6],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.1,.3,.7]);c.box(0,3.0,-6.04,3,.14,.04,[1,1,1]);
  c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-5,-5.4,4,[.75,.82,.95]);c.box(-5.8,1.3,-5.3,.4,.4,.3,[.2,.2,.25]);c.box(-4.4,1.3,-5.3,.4,.4,.3,[.2,.2,.25]);
  c.counter(5,-5.4,4,[.75,.82,.95]);c.box(4.4,1.3,-5.3,.4,.4,.3,[.2,.2,.25]);c.box(5.6,1.3,-5.3,.5,.1,.4,[.9,.9,.5]);
  c.box(-9.4,.9,-1.5,1.2,1.8,.9,[.2,.3,.55],true);c.box(-9.4,1.5,-1.0,.9,.7,.06,[.6,.85,.95]);c.box(-9.4,.9,-1.0,.6,.2,.06,[.15,.15,.2]);c.box(-9.4,.5,-1.0,.5,.05,.06,[.9,.9,.9]);
  c.box(9.2,.45,0,.8,.9,2.4,[.7,.55,.4],true);c.box(8.6,.4,3.4,.9,.8,.9,[.75,.6,.45],true);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('teller','Ms. Orn','Bank teller⁣พนักงานธนาคาร',-5,-6.3,0,[.2,.35,.7],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Good morning! How can I help you today?",'สวัสดีตอนเช้าค่ะ วันนี้ให้ช่วยอะไรคะ',"I'd like to open an account.","Sure. Here it is.","OK. Thank you very much.",'พนักงานถามว่าให้ช่วยอะไร ให้บอกว่าอยากเปิดบัญชี','I\'d like to ... = ฉันอยาก ..., open an account = เปิดบัญชี'),
  TT("May I see your ID card, please?",'ขอดูบัตรประชาชนหน่อยได้ไหมคะ',"Sure. Here it is.","I'd like to open an account.","OK. Thank you very much.",'ถูกขอดูบัตร ให้ยื่นให้','ID card = บัตรประชาชน, Here it is. = นี่ค่ะ/ครับ'),
  TT("Your account is ready. Please sign here.",'บัญชีของคุณเรียบร้อยแล้ว กรุณาเซ็นชื่อตรงนี้ค่ะ',"OK. Thank you very much.","Sure. Here it is.","I'd like to open an account.",'บัญชีเสร็จแล้ว ให้ตอบรับและขอบคุณ','sign = เซ็นชื่อ')]),
 NPCDEF('cashier','Mr. Nop','Cashier⁣แคชเชียร์',5,-6.3,0,[.15,.3,.55],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Hello! Do you want to deposit or withdraw money?",'สวัสดีครับ จะฝากหรือถอนเงินครับ',"I'd like to deposit money.","Five hundred baht, please.","Thank you. Have a nice day!",'ถามให้เลือก ฝากหรือถอน ตอบหนึ่งอย่าง','deposit = ฝากเงิน, withdraw = ถอนเงิน'),
  TT("How much would you like to deposit?",'จะฝากเท่าไรครับ',"Five hundred baht, please.","I'd like to deposit money.","Thank you. Have a nice day!",'ถามจำนวนเงิน ตอบเป็นตัวเลข','How much ...? = ... เท่าไร'),
  TT("Here is your receipt.",'นี่ใบเสร็จของคุณครับ',"Thank you. Have a nice day!","Five hundred baht, please.","I'd like to deposit money.",'ได้รับใบเสร็จ ให้ขอบคุณ','receipt = ใบเสร็จ')]),
 NPCDEF('atm','Mr. Lek','Customer⁣ลูกค้า',-7.4,1.2,Math.PI/2,[.7,.4,.2],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. Is the ATM working?",'ขอโทษครับ ตู้ ATM ใช้ได้ไหม',"Yes, it is.","Please ask the teller for help.","You're welcome.",'ถามว่าใช้ได้ไหม (Is ...?) ตอบ Yes, it is.','ATM = ตู้เอทีเอ็ม, working = ใช้งานได้'),
  TT("Thanks! I forgot my PIN number.",'ขอบคุณ ผมลืมรหัสบัตร',"Please ask the teller for help.","Yes, it is.","You're welcome.",'ได้ยินว่าลืมรหัส ให้แนะนำให้ถามพนักงาน','PIN = รหัสบัตร, ask ... for help = ขอความช่วยเหลือจาก ...'),
  TT("Good idea. Thank you!",'ความคิดดี ขอบคุณ',"You're welcome.","Yes, it is.","Please ask the teller for help.",'ได้รับคำขอบคุณ ให้ตอบรับ','You\'re welcome. = ยินดีครับ')]),
 NPCDEF('guard','Mr. Boon','Security guard⁣เจ้าหน้าที่รักษาความปลอดภัย',2.6,1.0,Math.PI,[.2,.2,.25],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Good afternoon! Please take a number.",'สวัสดีตอนบ่าย กรุณากดบัตรคิวครับ',"OK. Where is the machine?","Five hundred baht, please.","Sure. Here it is.",'ถูกขอให้กดบัตรคิว ให้ตอบรับและถามที่ตั้ง','take a number = กดบัตรคิว'),
  TT("It's next to the door.",'อยู่ข้างประตูครับ',"I see. Thank you.","OK. Where is the machine?","OK. I'll wait there.",'ได้รับคำตอบ ให้ขอบคุณ','next to = ข้าง ๆ'),
  TT("Please wait on the blue chairs.",'กรุณารอที่เก้าอี้สีน้ำเงินครับ',"OK. I'll wait there.","OK. Where is the machine?","Five hundred baht, please.",'ถูกขอให้รอ ให้ตอบรับ','wait = รอ')])]});

