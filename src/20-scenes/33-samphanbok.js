/* ===== Ubon: Sam Phan Bok ===== */
SCENES.push({id:'samphanbok',name:'Sam Phan Bok',th:'สามพันโบก',color:'#C2410C',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.82,.55,.38]);
  c.box(0,-.02,-7.9,26,.12,3.4,[.25,.55,.8]);c.ob.push([-14,14,-9.6,-6.2]);
  for(let x=-11;x<=11;x+=2.2)c.box(x,.02,-7.9+((x*3)%1.4-.7),1.4,.04,.5,[.55,.8,.95]);
  c.box(-8.2,.25,-6.2,5,.5,2,[.7,.42,.28]);c.box(1,.25,-5.8,6,.5,1.6,[.66,.4,.27]);c.box(9,.25,-6.2,5,.5,2,[.7,.42,.28]);
  c.box(4.6,.12,-7.6,3.4,.24,1.1,[.9,.9,.92]);c.box(4.6,.7,-7.6,2.0,.7,.9,[.9,.35,.25]);c.box(4.6,1.1,-7.6,2.2,.1,1.1,[.3,.55,.75]);
  const pots=[[-9,-3.2,1.3],[-5.2,-4.0,.9],[-1.6,-3.4,1.1],[2.6,-3.6,.8],[7.6,-3.4,1.4],[10.2,-.8,.8],[-10,.8,1.1],[-6.4,-1.0,.7],[8,1.6,.9]];
  pots.forEach(([x,z,w])=>{c.box(x,.015,z,w*1.5,.03,w,[.3,.58,.75]);c.box(x,.03,z,w*1.1,.03,w*.7,[.2,.45,.65])});
  c.box(-.6,.02,-1.2,2.0,.03,1.8,[.22,.5,.7]);c.box(-1.8,.02,-.2,1.0,.03,1.0,[.22,.5,.7]);c.box(.6,.02,-.2,1.0,.03,1.0,[.22,.5,.7]);
  c.box(-8.5,1.0,1.8,3.4,1.6,1.4,[.75,.5,.3],true);c.box(-8.5,2.0,1.8,3.8,.15,1.8,[.2,.55,.75]);c.box(-9.8,.5,1.8,.15,1,.15,[.5,.35,.2]);c.box(-7.2,.5,1.8,.15,1,.15,[.5,.35,.2]);
  c.box(4.6,.45,3.4,2.8,.9,1.4,[.78,.58,.35],true);c.box(4.6,1.1,3.4,3.2,.12,1.8,[.85,.3,.2]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-11.8,-2);c.tree(11.8,-.5);c.lamp(-2.2,5.4);c.lamp(2.2,5.4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('guide','Mr. Somkiat','Local guide⁣ไกด์ท้องถิ่น',-2.8,1.0,Math.PI,[.2,.5,.3],[.25,.25,.3],[.1,.07,.05],'cap',[
  TT("Welcome to Sam Phan Bok! Do you know what bok means?",'ยินดีต้อนรับสู่สามพันโบก รู้ไหมว่าโบกแปลว่าอะไร',"No, I don't. What does it mean?","Yes, please. How long is the ride?","Welcome! Is this your first visit?",'ถามว่ารู้ความหมายไหม (Do you ...?) ตอบ No, I don\'t. แล้วถามกลับ','What does ... mean? = ... แปลว่าอะไร'),
  TT("Bok is a Lao word. It means a hollow in the rock.",'โบกเป็นคำภาษาลาว แปลว่าแอ่งในหิน',"So Sam Phan Bok means three thousand hollows.","So bok is a Thai word.","Do you know what bok means?",'ได้ความหมายแล้ว ให้สรุป (sam phan = สามพัน)','hollow = แอ่ง, three thousand = สามพัน'),
  TT("Right! There are more than three thousand of them.",'ถูกต้อง มีมากกว่าสามพันแอ่งเลยครับ',"Wow! That's a lot.","Only three? That's not many.","So Sam Phan Bok means three thousand hollows.",'ได้ยินจำนวนมาก ให้แสดงความทึ่ง','more than = มากกว่า, That\'s a lot. = เยอะมาก')]),
 NPCDEF('ranger','Ms. Nong','Park staff⁣เจ้าหน้าที่อุทยาน',-8.5,2.9,0,[.2,.45,.3],[.2,.2,.25],[.08,.06,.07],'bun',[
  TT("Hello! Is this your first visit?",'สวัสดีค่ะ มาครั้งแรกหรือเปล่าคะ',"Yes, it is. I'm so excited!","Yes, I come here every year.","Hello! Welcome to the park.",'ถามว่ามาครั้งแรกไหม (Is ...?) ตอบ Yes, it is.','excited = ตื่นเต้น, first visit = ครั้งแรก'),
  TT("You can only visit in the dry season, from December to April.",'เข้าชมได้เฉพาะหน้าแล้ง ตั้งแต่ธันวาคมถึงเมษายนค่ะ',"Why can't I visit in the rainy season?","Great! I'll come back in the rainy season.","Is this your first visit?",'ได้ยินเงื่อนไขหน้าแล้ง ให้ถามเหตุผล','dry season = ฤดูแล้ง, rainy season = ฤดูฝน'),
  TT("Because the Mekong River covers the rocks with water.",'เพราะแม่น้ำโขงท่วมหินจนจมน้ำค่ะ',"I see. Thank you for telling me.","Why can't I visit in the rainy season?","So I can visit in the rainy season.",'ได้เหตุผลแล้ว ให้ตอบรับและขอบคุณ','Because ... = เพราะว่า ..., covers = ปกคลุม/ท่วม')]),
 NPCDEF('boat','Mr. Chuan','Boat driver⁣คนขับเรือ',7.0,-4.4,Math.PI,[.2,.4,.7],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Good morning! Would you like a boat ride?",'สวัสดีตอนเช้าครับ อยากนั่งเรือชมวิวไหมครับ',"Yes, please. How long is the ride?","About forty minutes.","I'd like fried fish, please.",'ชวนนั่งเรือ ให้ตอบรับและถามระยะเวลา','boat ride = นั่งเรือเที่ยว, How long ...? = ... นานแค่ไหน'),
  TT("About forty minutes. Sunrise and sunset are the best times.",'ประมาณสี่สิบนาทีครับ ช่วงพระอาทิตย์ขึ้นกับตกสวยที่สุด',"Great! I like the golden light.","How long is the ride?","Forty hours? That's very long.",'ได้ยินช่วงเวลาที่สวย ให้ตอบอย่างสนใจ','sunrise = พระอาทิตย์ขึ้น, sunset = พระอาทิตย์ตก, best = ดีที่สุด'),
  TT("Please wear a life jacket on the boat.",'กรุณาสวมเสื้อชูชีพบนเรือนะครับ',"OK. I'll put it on now.","Would you like a boat ride?","OK. I'll take it off now.",'ถูกขอให้ใส่เสื้อชูชีพ ให้ตอบรับ','life jacket = เสื้อชูชีพ, put on = สวม')]),
 NPCDEF('photo','Fah','Tourist⁣นักท่องเที่ยว',1.2,-.4,Math.PI,[.95,.55,.25],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Look! This bok looks like Mickey Mouse.",'ดูสิ โบกนี้เหมือนหัวมิกกี้เมาส์เลย',"Wow! Can I take a photo?","Sure! Every bok is different.","Yes, please. How long is the ride?",'เห็นโบกรูปมิกกี้เมาส์ ให้ขอถ่ายรูป','looks like ... = ดูเหมือน ..., take a photo = ถ่ายรูป'),
  TT("Sure! Every bok is different. Look at the colors of the water.",'ได้เลย ทุกโบกไม่เหมือนกัน ดูสีของน้ำสิ',"They are beautiful.","Can I take a photo?","Every bok is the same.",'ได้ยินว่าแต่ละโบกต่างกัน ให้ชมความสวย (They are ...)','different = แตกต่าง, beautiful = สวยงาม'),
  TT("Let's walk and find more boks.",'เดินหาโบกอื่นเพิ่มกันเถอะ',"Good idea. Let's go!","Look at the colors of the water.","Good idea. Let's eat now.",'เพื่อนชวนเดินต่อ ให้ตอบรับ','Let\'s ... = ไป ... กันเถอะ, more = เพิ่มเติม')]),
 NPCDEF('food','Auntie Dao','Food seller⁣แม่ค้าอาหาร',4.6,2.0,Math.PI,[.85,.35,.3],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! We have local Isan food. Are you hungry?",'สวัสดีค่ะ เรามีอาหารอีสานพื้นบ้าน หิวไหมคะ',"Yes, I am. What do you have?","Yes, it is. I'm so excited!","We have papaya salad and larb.",'ถามว่าหิวไหม (Are you ...?) ตอบ Yes, I am. แล้วถามว่ามีอะไร','Isan = ภาคอีสาน, local = ท้องถิ่น'),
  TT("We have papaya salad, larb, and fried fish from the river.",'มีส้มตำ ลาบ และปลาทอดจากแม่น้ำค่ะ',"I'd like fried fish, please.","What do you have?","I'd like a boat ride, please.",'ได้ยินเมนู ให้สั่งอย่างหนึ่ง','papaya salad = ส้มตำ, fried fish = ปลาทอด'),
  TT("Would you like it spicy?",'เอาเผ็ดไหมคะ',"Not too spicy, please.","I'd like fried fish, please.","We have papaya salad and larb.",'ถามว่าเอาเผ็ดไหม ตอบว่าไม่เผ็ดมาก','spicy = เผ็ด, not too ... = ไม่ ... เกินไป')])]});

