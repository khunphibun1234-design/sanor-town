/* ===== Police Station / Lost & Found ===== */
SCENES.push({id:'police',name:'Police Station',th:'ตำรวจ / ของหาย',color:'#475569',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.82,.83,.86]);shell(c,[.88,.9,.95],[.2,.28,.45],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.15,.25,.5]);c.box(0,3.0,-6.04,3,.14,.04,[1,1,1]);
  c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-4.5,-5.4,4.4,[.65,.7,.8]);c.box(-5.2,1.3,-5.3,.5,.4,.4,[.2,.2,.25]);c.box(-3.8,1.3,-5.3,.4,.1,.5,[.9,.9,.7]);
  c.box(7,.9,-5.8,2.8,1.8,.5,[.6,.65,.75],true);for(let i=0;i<3;i++){c.box(7,.5+i*.6,-5.5,2.6,.05,.3,[.5,.5,.55]);for(let k=0;k<4;k++)c.box(6.1+k*.6,.7+i*.6,-5.5,.4,.35,.25,[[.85,.3,.3],[.3,.5,.85],[.95,.8,.25],[.35,.7,.45]][(i+k)%4]);}
  c.box(9.0,.45,.6,.8,.9,2.4,[.55,.6,.7],true);c.box(-9.2,.4,-1.5,1.6,.8,.9,[.55,.4,.3],true);
  c.bench(-8.5,2.8);c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('officer','Officer Somchai','Police officer⁣เจ้าหน้าที่ตำรวจ',-4.5,-6.3,0,[.35,.4,.3],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Good afternoon. How can I help you?",'สวัสดีตอนบ่ายครับ ให้ช่วยอะไรครับ',"I lost my backpack.",'It\'s black and red.','I think I left it on the bus.','เจ้าหน้าที่ถามว่าให้ช่วยอะไร ให้บอกว่าทำกระเป๋าเป้หาย','I lost my ... = ฉันทำ ... หาย, backpack = กระเป๋าเป้'),
  TT("What color is it?",'สีอะไรครับ',"It's black and red.",'I lost my backpack.','I think I left it on the bus.','ถามสีของที่หาย ตอบ It\'s ...','What color is it? = มันสีอะไร'),
  TT("Where did you lose it?",'ทำหายที่ไหนครับ',"I think I left it on the bus.",'I lost my backpack.','It\'s black and red.','ถามว่าทำหายที่ไหน ตอบด้วยอดีต (left)','left = ลืมไว้ (อดีตของ leave)')]),
 NPCDEF('clerk2','Ms. Jan','Lost & Found clerk⁣เจ้าหน้าที่ของหาย',7,-6.3,0,[.3,.5,.7],[.2,.2,.25],[.08,.06,.07],'bun',[
  TT("Hi! Are you looking for something?",'สวัสดีค่ะ กำลังหาของอยู่หรือคะ',"Yes, I am. I'm looking for my umbrella.",'It\'s blue and it has a long handle.','Yes, it is! Thank you so much.','ถามว่าหาของอยู่ไหม (Are you ...?) ตอบ Yes, I am.','umbrella = ร่ม'),
  TT("Please describe it.",'ช่วยบอกลักษณะหน่อยค่ะ',"It's blue and it has a long handle.",'Yes, I am. I\'m looking for my umbrella.','Yes, it is! Thank you so much.','ขอให้บอกลักษณะ ตอบสีและรูปร่าง','describe = บรรยาย, handle = ด้ามจับ'),
  TT("Is this your umbrella?",'ร่มคันนี้ของคุณใช่ไหมคะ',"Yes, it is! Thank you so much.",'Yes, I am. I\'m looking for my umbrella.','Don\'t worry. Let\'s look together.','ถามว่าใช่ของเราไหม (Is ...?) ตอบ Yes, it is.','Thank you so much. = ขอบคุณมาก')]),
 NPCDEF('kid','Ben','Student⁣นักเรียน',-9.2,1.0,Math.PI/2,[.9,.5,.2],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. I can't find my phone.",'ขอโทษครับ ผมหาโทรศัพท์ไม่เจอ',"Don't worry. Let's look together.",'I saw it at lunch.','Great! I\'m glad you found it.','เพื่อนหาของไม่เจอ ให้ปลอบและชวนหา','Don\'t worry. = ไม่ต้องกังวล'),
  TT("Thanks! When did you last see it?",'ขอบคุณ เธอเห็นมันครั้งสุดท้ายเมื่อไร',"I saw it at lunch.",'Don\'t worry. Let\'s look together.','Great! I\'m glad you found it.','ถามว่าเห็นครั้งสุดท้ายเมื่อไร ตอบด้วยอดีต (saw)','saw = เห็น (อดีตของ see), at lunch = ตอนพักเที่ยง'),
  TT("Oh, here it is! It's in my pocket.",'อ้าว นี่ไง มันอยู่ในกระเป๋ากางเกงผม',"Great! I'm glad you found it.",'Don\'t worry. Let\'s look together.','I saw it at lunch.','เพื่อนเจอของแล้ว ให้ยินดีด้วย','pocket = กระเป๋า (เสื้อ/กางเกง), I\'m glad ... = ฉันดีใจที่ ...')]),
 NPCDEF('mom2','Ms. Pui','Visitor⁣ผู้มาติดต่อ',2.8,1.0,Math.PI,[.85,.45,.4],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello. Is this the Lost and Found?",'สวัสดีค่ะ ที่นี่คือที่รับแจ้งของหายใช่ไหมคะ',"Yes, it is. Please go to the counter.",'I\'m sorry to hear that.','I hope so, too.','ถามว่าใช่ที่นี่ไหม (Is ...?) ตอบ Yes, it is.','Lost and Found = ที่รับแจ้งของหาย/ของที่เจอ'),
  TT("Thank you. I lost my wallet.",'ขอบคุณค่ะ ฉันทำกระเป๋าสตางค์หาย',"I'm sorry to hear that.",'Yes, it is. Please go to the counter.','I hope so, too.','ได้ยินว่าทำของหาย ให้แสดงความเห็นใจ','I\'m sorry to hear that. = เสียใจด้วยนะ'),
  TT("I hope I can find it soon.",'หวังว่าจะหาเจอเร็ว ๆ',"I hope so, too.",'Yes, it is. Please go to the counter.','Thank you. I lost my wallet.','ได้ยินความหวัง ให้ตอบว่าหวังเช่นกัน','I hope so, too. = ฉันก็หวังเช่นนั้น')])]});

