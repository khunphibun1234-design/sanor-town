/* ===== Ubon: Khong Chiam ===== */
SCENES.push({id:'khongchiam',name:'Khong Chiam',th:'โขงเจียม',color:'#0D9488',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.62,.78,.45]);
  c.box(-7,-.02,-6.5,14,.12,5.6,[.3,.6,.9]);c.box(7,-.02,-6.5,14,.12,5.6,[.72,.55,.35]);
  for(let z=-9;z<=-4;z+=1.1)c.box((z%2?.3:-.3),.02,z,.9,.04,.9,[.55,.6,.7]);
  c.ob.push([-14,14,-9.6,-3.6]);
  c.box(0,.04,-2.9,26,.06,1.4,[.95,.9,.7]);
  [[-9,-5.2,1.8],[-4,-7,2.2],[4.5,-6,2],[9.5,-7.5,2.4]].forEach(([x,z,w])=>{c.box(x,.35,z,w,.7,w*.7,[.52,.5,.5])});
  c.box(0,.12,-4.2,2.4,.2,3.2,[.6,.45,.3]);c.box(2.6,.2,-5.4,2.6,.4,.9,[.35,.55,.7]);
  c.box(-9.5,1.4,.6,5,2.8,4,[.97,.93,.8],true);c.box(-9.5,3.0,.6,5.4,.3,4.4,[.8,.2,.15]);tPyr(c.a,-9.5,3.1,.6,5.2,1.8,4.2,[.8,.2,.15]);c.box(-9.5,5.1,.6,.2,1,.2,[.95,.8,.2]);
  c.box(-9.5,.9,-1.46,1.2,1.8,.06,[.45,.3,.2]);
  c.box(-3.6,.35,1.8,2.8,.7,.3,[.5,.35,.2]);c.box(-3.6,1.5,1.8,2.2,2.2,2.2,[.8,.15,.15],true);c.box(-3.6,1.5,1.8,2.3,.2,2.3,[.95,.8,.2]);c.box(-3.6,2.4,1.8,2.3,.2,2.3,[.95,.8,.2]);c.box(-3.6,.5,1.8,2.9,.15,2.9,[.45,.3,.2]);
  for(const [x,z] of [[7,.5],[10.4,.5]]){c.box(x,.45,z,3,.9,1.2,[.7,.5,.3],true);for(let i=0;i<4;i++)c.box(x-1+i*.65,1.0,z,.5,.15,.9,[.78,.82,.85]);c.box(x,2.6,z-.4,3.4,.12,1.6,[.2,.6,.8])}
  c.box(7,1.4,-.3,.1,2.6,.1,[.5,.4,.3]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-5,7.5);c.tree(5.5,7.5);c.lamp(-2,3.6);c.lamp(4,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('pla','Auntie Pla','Fish seller⁣แม่ค้าปลา',8.7,-1.1,0,[.2,.6,.8],[.3,.3,.35],[.1,.07,.05],'bun',[
  TT("Fresh Mekong fish! Would you like some?",'ปลาแม่น้ำโขงสดๆ! รับสักหน่อยไหมคะ',"Yes, please. How much is this fish?","I'm fine, thank you.","It's one hundred and fifty baht.",'แม่ค้าชวนซื้อปลา ให้ตอบรับและถามราคา','fresh = สด, How much is ...? = ... ราคาเท่าไร'),
  TT("It's one hundred and fifty baht per kilo.",'กิโลกรัมละหนึ่งร้อยห้าสิบบาทค่ะ',"That's a good price. I'll take one kilo.","How much is this fish?","Yes, it's for dinner.",'ได้ราคาแล้ว ให้ตกลงซื้อ','per kilo = ต่อกิโลกรัม, I\'ll take ... = ฉันขอเอา ...'),
  TT("Here you are. Is it for dinner?",'นี่ค่ะ ซื้อไปทำอาหารเย็นเหรอคะ',"Yes. My family loves fish.","How much is it?","That's a good price.",'ถามว่าซื้อไปกินเย็นไหม ให้ตอบ','love = ชอบมาก, dinner = อาหารเย็น')]),
 NPCDEF('pet','Mr. Pet','Boat guide⁣ไกด์ล่องเรือ',0,-1.2,0,[.3,.5,.8],[.3,.3,.3],[.1,.07,.05],'cap',[
  TT("Welcome to Khong Chiam! This is where two rivers meet.",'ยินดีต้อนรับสู่โขงเจียม ที่นี่คือจุดที่แม่น้ำสองสายมาพบกันครับ',"Wow! Which rivers are they?","Yes, I know the Mun River.","Thank you. I'll take one kilo.",'ได้ยินว่าแม่น้ำสองสายมาพบกัน ให้ถามว่าคือแม่น้ำอะไร','Which ...? = ... อันไหน, meet = มาพบกัน'),
  TT("The Mun River and the Mekong River.",'แม่น้ำมูลและแม่น้ำโขงครับ',"Why do people call it the Two-Colored River?","Which rivers are they?","Yes, I like the Mekong River.",'ได้ชื่อแม่น้ำแล้ว ให้ถามว่าทำไมเรียกแม่น้ำสองสี','Why do people call it ...? = ทำไมคนเรียกว่า ...'),
  TT("The two rivers have different colors where they meet.",'แม่น้ำสองสายมีสีต่างกันตรงที่มาพบกันครับ',"That's so cool! I want to see it.","Why do people call it the Two-Colored River?","That's a good price.",'ได้คำอธิบายแล้ว ให้แสดงความตื่นเต้น','different colors = สีต่างกัน')]),
 NPCDEF('wichai','Mr. Wichai','Temple guide⁣ไกด์วัด',-6,2.4,0,[.97,.97,.95],[.2,.2,.25],[.5,.5,.52],'',[
  TT("This is Wat Tham Khuha Sawan. Many people come to pay respect to Luang Pu Kham Kanueng.",'นี่คือวัดถ้ำคูหาสวรรค์ คนมากมายมาสักการะหลวงปู่คำคะนึงครับ',"I see. Is it a famous temple?","Sure. I'll be quiet.","Wow! It's huge!",'ได้ยินว่าคนมาสักการะ ให้ถามว่าวัดมีชื่อเสียงไหม','pay respect = สักการะ, famous = มีชื่อเสียง'),
  TT("Yes, it's famous. Please be quiet and polite in the temple.",'ใช่ครับ มีชื่อเสียง กรุณาสงบและสุภาพในวัดนะครับ',"Sure. I'll be quiet.","Yes, it's famous.","Is it a famous temple?",'ถูกขอให้เงียบและสุภาพ ให้ตอบรับ','Please be quiet and polite. = กรุณาสงบและสุภาพ'),
  TT("Look at that drum. It is the biggest drum in Thailand.",'ดูกลองใบนั้นสิครับ เป็นกลองที่ใหญ่ที่สุดในประเทศไทย',"Wow! It's huge!","Sure. I'll be quiet.","I see. Is it a famous temple?",'เห็นกลองใหญ่ ให้แสดงความทึ่ง','the biggest = ใหญ่ที่สุด, huge = ใหญ่มาก')]),
 NPCDEF('ning','Ning','Friend⁣เพื่อนที่ไปเที่ยว',-3,-1.4,0,[.95,.6,.3],[.2,.3,.5],[.1,.07,.05],'long',[
  TT("Look at the sandy beach and the rocks! Isn't it beautiful?",'ดูหาดทรายกับก้อนหินสิ! สวยไหม',"Yes, it's really beautiful!","Good idea! Stand over there.","Yes, I know. We are proud of it!",'เพื่อนถามว่าสวยไหม ให้เห็นด้วย','beach = หาด, really beautiful = สวยจริงๆ'),
  TT("Let's take a photo here.",'ถ่ายรูปตรงนี้กันเถอะ',"Good idea! Stand over there.","Yes, it's really beautiful!","Yes, I know. We are proud of it!",'เพื่อนชวนถ่ายรูป ให้ตอบรับ','Good idea! = ความคิดดี'),
  TT("Did you know? \"Two-Colored River\" is in our province's slogan.",'รู้ไหม? "แม่น้ำสองสี" อยู่ในคำขวัญจังหวัดของเรา',"Yes, I know. We are proud of it!","Good idea! Stand over there.","Yes, it's really beautiful!",'เพื่อนบอกว่าอยู่ในคำขวัญ ให้ตอบว่ารู้และภูมิใจ','proud of = ภูมิใจใน, slogan = คำขวัญ')])]});
