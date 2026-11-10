/* ===== Ubon: Local Food ===== */
SCENES.push({id:'localfood',name:'Ubon Local Food',th:'อาหารอุบล',color:'#B45309',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.78,.7,.55]);
  const cols=[[.85,.3,.25],[.2,.55,.35],[.9,.6,.15],[.25,.45,.8]];
  [-9,-3,3,9].forEach((x,i)=>{c.box(x,1.6,-7.4,3.6,3.2,.3,[.95,.9,.8],true);c.box(x,3.3,-6.9,4.2,.25,1.6,cols[i]);c.box(x,2.6,-6.0,3.2,.7,.1,cols[i]);c.box(x,2.6,-5.94,2.6,.2,.04,[1,.95,.8]);c.counter(x,-5.4,3.8,[.8,.65,.45]);});
  c.box(-9.5,1.3,-5.3,.6,.4,.6,[.9,.9,.92]);c.box(-8.3,1.3,-5.3,.4,.3,.4,[.95,.8,.4]);
  c.box(-3.5,1.3,-5.3,.9,.2,.6,[.5,.7,.3]);c.box(-2.4,1.3,-5.3,.5,.3,.4,[.95,.95,.9]);
  c.box(2.6,1.3,-5.3,.9,.3,.5,[.7,.35,.15]);c.box(3.8,1.3,-5.3,.5,.3,.4,[.95,.9,.7]);
  c.box(8.5,1.3,-5.3,.8,.3,.5,[.5,.65,.8]);c.box(9.6,1.3,-5.3,.5,.4,.4,[.9,.7,.4]);
  c.table(-6,1.2);c.table(0,-1.6);c.table(6,1.2);c.table(-6,-2.6);c.table(6,-2.6);c.box(-2.9,.45,.2,1.1,.9,1.4,[.95,.95,.9]);c.box(-2.9,.95,.2,1.3,.1,1.6,[.85,.3,.25]);c.box(3.9,.45,.2,1.1,.9,1.4,[.95,.95,.9]);c.box(3.9,.95,.2,1.3,.1,1.6,[.95,.8,.3]);
  c.bench(-1.5,4.8);c.bench(1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,3.6);c.lamp(4,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('noodle','Auntie Noi','Noodle seller⁣แม่ค้าก๋วยจั๊บ',-9,-6.3,0,[.85,.3,.25],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! Would you like guay jub? It is a famous noodle dish in Ubon.",'สวัสดีค่ะ รับก๋วยจั๊บไหมคะ เป็นก๋วยเตี๋ยวที่มีชื่อเสียงของอุบลฯ ค่ะ',"Yes, please. What is in it?","Yes, I am. What do you have?","It is a famous noodle dish.",'ถูกชวนซื้อก๋วยจั๊บ ให้ตอบรับและถามว่าใส่อะไรบ้าง','famous = มีชื่อเสียง, What is in it? = ใส่อะไรบ้าง'),
  TT("It has soft noodles and pork in hot soup.",'มีเส้นนุ่ม ๆ กับหมู ในน้ำซุปร้อน ๆ ค่ะ',"It sounds delicious.","What is in it?","Do you want one bowl?",'ได้ยินส่วนประกอบ ให้ตอบว่าฟังดูอร่อย','soft = นุ่ม, in hot soup = ในน้ำซุปร้อน'),
  TT("It's cheap and tasty. Do you want one bowl?",'ราคาไม่แพงและอร่อยค่ะ เอาหนึ่งชามไหมคะ',"Yes, one bowl, please.","It's cheap and tasty.","Yes, I'd like fried fish, please.",'ถูกถามว่าเอากี่ชาม ตอบรับ','cheap = ราคาถูก, tasty = อร่อย, bowl = ชาม')]),
 NPCDEF('viet','Mr. Hung','Vietnamese-style food seller⁣คนขายอาหารแบบเวียดนาม',-3,-6.3,0,[.2,.55,.35],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hi! We sell Vietnamese-style food. Please try naem nuang.",'สวัสดีครับ เราขายอาหารแบบเวียดนาม ลองแหนมเนืองสิครับ',"What is naem nuang?","You wrap pork in rice paper.","Yes, one bowl, please.",'ได้ยินชื่อเมนูใหม่ ให้ถามว่าคืออะไร','Vietnamese-style = แบบเวียดนาม, try = ลอง'),
  TT("You wrap pork, vegetables, and herbs in rice paper.",'เอาหมู ผัก และสมุนไพร ห่อด้วยแผ่นแป้งข้าวครับ',"That looks fun to eat.","What is naem nuang?","Do you want to try?",'ได้ยินวิธีกิน ให้ตอบว่าดูสนุก','wrap = ห่อ, rice paper = แผ่นแป้งข้าว, herbs = สมุนไพร'),
  TT("We also have soft steamed rice rolls. Do you want to try?",'เรายังมีปากหม้อนุ่ม ๆ ด้วย อยากลองไหมครับ',"Yes, I'd like to try both.","Yes, I am. What do you have?","We also have steamed rice rolls.",'ถูกชวนลอง (Do you want to ...?) ตอบรับ','steamed = นึ่ง, both = ทั้งสองอย่าง')]),
 NPCDEF('grill','Mr. Sak','Grill seller⁣คนขายของย่าง',3,-6.3,0,[.9,.6,.15],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hello! We have grilled chicken and Isan sausage.",'สวัสดีครับ เรามีไก่ย่างกับไส้กรอกอีสานครับ',"The chicken smells so good!","People often eat it with sticky rice.","The fish smells so good!",'ได้กลิ่นไก่ย่าง ให้ชมว่ากลิ่นหอม','smells good = กลิ่นหอม, grilled = ย่าง'),
  TT("The sausage is sour and smoky. People often eat it with sticky rice.",'ไส้กรอกมีรสเปรี้ยวและกลิ่นควันครับ คนมักกินกับข้าวเหนียว',"I'd like chicken and sticky rice, please.","Do you like spicy sauce?","I'd like guay jub, please.",'ได้ยินวิธีกิน ให้สั่งไก่กับข้าวเหนียว','sour = เปรี้ยว, smoky = มีกลิ่นควัน, sticky rice = ข้าวเหนียว'),
  TT("The chicken comes with two sauces. Do you like spicy sauce?",'ไก่ย่างมีน้ำจิ้มสองแบบครับ ชอบน้ำจิ้มเผ็ดไหม',"Yes, a little.","I'd like chicken and sticky rice, please.","The chicken comes with two sauces.",'ถามว่าชอบเผ็ดไหม (Do you ...?) ตอบ Yes, a little.','a little = นิดหน่อย, sauce = น้ำจิ้ม')]),
 NPCDEF('fish','Auntie Mali','Fish seller⁣แม่ค้าอาหารปลา',9,-6.3,0,[.25,.45,.8],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Welcome! Ubon is famous for river fish.",'ยินดีต้อนรับค่ะ อุบลฯ มีชื่อเสียงเรื่องปลาแม่น้ำค่ะ',"Why is there so much river fish?","Because the Mun River flows into the Mekong River.","Is Ubon famous for river fish?",'ได้ยินว่าอุบลมีปลาแม่น้ำ ให้ถามเหตุผล','famous for ... = มีชื่อเสียงเรื่อง ..., river = แม่น้ำ'),
  TT("Because the Mun River flows into the Mekong River.",'เพราะแม่น้ำมูลไหลไปรวมกับแม่น้ำโขงค่ะ',"I see. That makes sense.","Why is there so much river fish?","Try our fish soup with herbs.",'ได้ยินเหตุผล ให้ตอบว่าเข้าใจแล้ว','flows into = ไหลลงสู่, That makes sense. = เข้าใจแล้ว'),
  TT("Try our fish soup with herbs. The fish is fresh and sweet.",'ลองแกงปลาใส่สมุนไพรของเราสิคะ ปลาสดและหวานค่ะ',"Great! I'll try it.","The fish is fresh and sweet.","Great! I'll try the sausage.",'ถูกชวนลองแกงปลา ให้ตอบรับ','fresh = สด, sweet = หวาน (เนื้อปลา)')]),
 NPCDEF('muyo','Mr. Yo','Mu yo seller⁣คนขายหมูยอ',-1.8,.2,Math.PI/2,[.9,.9,.85],[.25,.2,.3],[.1,.07,.05],'cap',[
  TT("Hello! Do you know mu yo? It is a famous food in Ubon.",'สวัสดีครับ รู้จักหมูยอไหม เป็นอาหารที่มีชื่อเสียงของอุบลฯ ครับ',"No, I don't. What is it?","Yes, please. What is in it?","It is a soft pork sausage.",'ถามว่ารู้จักไหม (Do you ...?) ตอบ No, I don\'t. แล้วถามว่าคืออะไร','Do you know ...? = รู้จัก ... ไหม'),
  TT("It is a soft pork sausage. People cut it into slices.",'เป็นไส้กรอกหมูเนื้อนุ่ม คนมักหั่นเป็นแผ่นครับ',"It sounds interesting.","What is mu yo?","Would you like to try a slice?",'ได้ยินลักษณะหมูยอ ให้ตอบว่าน่าสนใจ','sausage = ไส้กรอก, slices = แผ่นบาง ๆ'),
  TT("Would you like to try a slice?",'อยากลองสักแผ่นไหมครับ',"Yes, please. Thank you!","People cut it into slices.","Yes, I am. What do you have?",'ถูกชวนลอง (Would you like ...?) ตอบรับสุภาพ','Would you like to ...? = อยาก ... ไหม')]),
 NPCDEF('bun','Ms. Aom','Steamed bun seller⁣คนขายซาลาเปา',2.6,.2,-Math.PI/2,[.95,.85,.4],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! These are Phibun steamed buns, or salapao. They are famous all over Thailand.",'สวัสดีค่ะ นี่คือซาลาเปาพิบูล มีชื่อเสียงไปทั่วประเทศค่ะ',"Wow! Are they from Phibun Mangsahan?","They are soft and warm.","Wow! Are they from Bangkok?",'ได้ยินว่าซาลาเปามีชื่อเสียง ให้ถามว่ามาจากพิบูลมังสาหารไหม (Are they ...?)','all over Thailand = ทั่วประเทศไทย, steamed bun = ซาลาเปา'),
  TT("Yes, they are. They are soft and warm.",'ใช่ค่ะ นุ่มและอุ่น ๆ ด้วยค่ะ',"They smell so good!","Are they from Phibun Mangsahan?","They are cold and hard.",'ได้ยินว่านุ่มและอุ่น ให้ชมกลิ่น','soft = นุ่ม, warm = อุ่น, smell = มีกลิ่น'),
  TT("How many would you like?",'เอากี่ลูกดีคะ',"Two, please.","Yes, please.","They are soft and warm.",'ถูกถามจำนวน ตอบเป็นตัวเลขอย่างสุภาพ','How many ...? = กี่ ...')])]});

