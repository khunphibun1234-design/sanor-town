/* ===== Cafeteria ===== */
SCENES.push({id:'cafeteria',name:'Cafeteria',th:'โรงอาหาร',color:'#EA580C',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9]);shell(c,[.98,.93,.78],[.75,.35,.2],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.85,.4,.15]);c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-6,-5.4,4,[.9,.7,.4]);c.counter(6,-5.4,4,[.6,.8,.9]);
  c.box(-6.8,1.3,-5.3,.5,.3,.5,[.9,.3,.2]);c.box(-5.4,1.3,-5.3,.5,.3,.5,[.95,.75,.2]);c.box(5.4,1.3,-5.3,.4,.5,.4,[.2,.6,.9]);c.box(6.6,1.3,-5.3,.4,.5,.4,[.95,.95,.95]);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,-2.4);c.table(6.5,.8);
  c.bench(-7,2.7);c.bench(6.5,2.5);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('malee','Ms. Malee','Food vendor⁣แม่ค้าอาหาร',-6,-6.3,0,[.9,.5,.2],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! What would you like for lunch?",'สวัสดีจ้ะ กินอะไรดีจ๊ะ',"I'd like fried rice, please.","I'm fine, thank you.","Forty baht, please.",'แม่ค้าถามว่าจะกินอะไร ให้สั่งอาหาร','I\'d like ..., please. = ขอ ... ค่ะ/ครับ'),
  TT("Do you want a fried egg on top?",'เอาไข่ดาวด้วยไหมจ๊ะ',"Yes, please.","Here you are.","That's forty baht.",'ถามว่าเอาไข่ดาวไหม (Do you want ...?) ตอบรับอย่างสุภาพ','fried egg = ไข่ดาว, on top = ด้านบน'),
  TT("That's forty baht.",'สี่สิบบาทจ้ะ',"Here you are. Thank you.","Yes, please.","I'd like fried rice, please.",'ได้ราคาแล้ว ให้จ่ายเงินและขอบคุณ','Here you are. = นี่ค่ะ/ครับ')]),
 NPCDEF('wichai','Mr. Wichai','Drink seller⁣คนขายเครื่องดื่ม',6,-6.3,0,[.2,.5,.8],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hi! Are you thirsty?",'สวัสดีครับ กระหายน้ำไหมครับ',"Yes, I am. Can I have some water?","I'm fine, thank you.","Yes, I am. Here's ten baht.",'ถามว่ากระหายน้ำไหม (Are you ...?) ตอบ Yes, I am.','thirsty = กระหายน้ำ'),
  TT("Cold water or orange juice?",'น้ำเย็นหรือน้ำส้มครับ',"Orange juice, please.","Ten baht, please.","Yes, please.",'ถามให้เลือกเครื่องดื่ม','Cold water or orange juice? = น้ำเย็นหรือน้ำส้ม'),
  TT("Ten baht, please.",'สิบบาทครับ',"Here's ten baht. Thanks!","Orange juice, please.","You're welcome.",'ถูกบอกราคา ให้จ่ายเงินและขอบคุณ','Ten baht, please. = สิบบาทครับ')]),
 NPCDEF('ploy','Ploy','Classmate⁣เพื่อนร่วมชั้น',-9.4,-.7,Math.PI/2,[.9,.4,.5],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Is this seat taken?",'สวัสดี ที่นั่งนี้มีคนนั่งหรือยัง',"No, it isn't. Please sit down.","Hi! I'm fine, thank you.","I usually eat rice.",'ถามว่าที่นั่งว่างไหม (Is ...?) ตอบ No, it isn\'t.','Is this seat taken? = ที่นั่งนี้มีคนนั่งหรือยัง'),
  TT("What do you usually eat for lunch?",'เธอกินอะไรเป็นประจำตอนกลางวัน',"I usually eat rice with chicken.","I'm at the cafeteria.","It's delicious. Thank you.",'ถามว่ากินอะไรเป็นประจำ ตอบด้วย usually','usually = มักจะ, rice with chicken = ข้าวกับไก่'),
  TT("Is the food here good?",'อาหารที่นี่อร่อยไหม',"Yes, it's delicious.","I usually eat rice with chicken.","Yes, please sit down.",'ถามว่าอาหารอร่อยไหม ตอบ Yes, it is.','delicious = อร่อย')]),
 NPCDEF('teacher','Teacher Anan','Teacher⁣ครู',2,-.4,Math.PI,[.3,.45,.6],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Good afternoon! Did you eat lunch?",'สวัสดีตอนบ่าย กินข้าวกลางวันหรือยัง',"Yes, I did. It was good.","Good afternoon, Teacher! I'm fine.","Yes, I will. It was good.",'ถามว่ากินแล้วหรือยัง (Did you ...?) ตอบ Yes, I did.','Did you eat ...? = กิน ... แล้วหรือยัง'),
  TT("Please throw your trash in the bin.",'กรุณาทิ้งขยะในถังนะ',"OK. I'll do it now.","Yes, I did. It was good.","Thank you, Teacher. Goodbye!",'ครูขอให้ทิ้งขยะ ให้ตอบรับ','trash = ขยะ (อเมริกัน), bin = ถัง'),
  TT("Keep the cafeteria clean, please.",'ช่วยกันรักษาความสะอาดโรงอาหารด้วยนะ',"Yes, Teacher. I will.","Yes, Teacher. I'm fine.","Thank you. It was good.",'ครูขอให้รักษาความสะอาด ให้ตอบรับ','Keep ... clean. = รักษา ... ให้สะอาด')])]});

