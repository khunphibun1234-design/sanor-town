/* ===== Ubon: Wat Phu Phrao ===== */
SCENES.push({id:'phuphrao',name:'Wat Phu Phrao',th:'วัดภูพร้าว',color:'#CA8A04',spawn:[0,3.6,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.78,.76,.68]);
  c.box(-8.5,-.02,-6.8,8.4,.12,4.6,[.3,.6,.9]);c.ob.push([-12.8,-4.3,-9.2,-4.5]);
  for(const [x,z,w] of [[-11,-8.5,3],[-6,-8.8,3.4]])c.box(x,.7,z,w,1.4,w*.6,[.3,.55,.35]);
  c.box(5,2.4,-7.2,9,4.8,4.6,[.97,.93,.8],true);c.box(5,5.0,-7.2,9.8,.4,5.4,[.85,.65,.15]);tPyr(c.a,5,5.2,-7.2,9.6,1.8,5.2,[.85,.65,.15]);c.box(5,7.4,-7.2,.2,1.4,.2,[.95,.8,.2]);
  c.box(5,.3,-4.4,9.4,.6,1.2,[.9,.88,.8]);
  for(let i=0;i<6;i++)c.box(1.2+i*1.5,1.6,-4.6,.3,3.0,.3,[.8,.2,.15]);
  c.box(5,1.2,-4.82,1.6,2.4,.06,[.85,.65,.15]);
  c.box(-1,1.5,-4.8,5,3,.3,[.08,.1,.28],true);c.box(-1,1.0,-4.6,.3,1.8,.1,[.3,1,.8]);
  for(const [dx,dy,w] of [[0,2.2,1.8],[-.9,1.9,1.1],[.9,1.9,1.1],[0,2.7,1.0],[-.5,2.5,.8],[.6,2.5,.8]])c.box(-1+dx,dy,-4.6,w,.5,.1,[[.4,1,.6],[.3,.9,.9],[.7,1,.4]][(dx*10|0)&1?1:0]);
  for(let i=-3;i<=3;i++)c.box(-1+i*.45,.05,-3.3+Math.abs(i)*.18,.08,.02,1.1-Math.abs(i)*.1,[.3,1,.8]);
  c.box(-1,.05,-2.7,3.2,.02,.08,[.3,1,.8]);
  for(let z=1;z<=5;z+=1.2)c.box(-10.2,.5,z,.1,1,.1,[.55,.45,.3]);c.box(-10.2,.95,3,.08,.08,5,[.55,.45,.3]);
  c.bench(-8.5,2.5);c.bench(-8.5,5.5);
  for(let z=-1;z<=1.6;z+=.8){c.box(5.7,.05,z,.7,.04,.3,[.9,.88,.8])}
  c.tree(10.5,-1);c.tree(11.4,5);c.tree(-11.4,7.5);c.tree(5,7.5);c.lamp(2,3.6);c.lamp(7,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('chana','Mr. Chana','Temple guide⁣ไกด์วัด',1.5,1.2,0,[.97,.97,.95],[.2,.2,.25],[.5,.5,.52],'',[
  TT("Welcome to Wat Phu Phrao! It is on top of Phu Phrao mountain.",'ยินดีต้อนรับสู่วัดภูพร้าว ตั้งอยู่บนยอดภูพร้าวครับ',"Wow! It's so high!","OK. Thank you for telling me.","That's a long time ago!",'ได้ยินว่าอยู่บนภูเขา ให้แสดงความทึ่ง','on top of = บนยอด, mountain = ภูเขา'),
  TT("A monk from Laos started this temple about fifty years ago.",'พระจากประเทศลาวเริ่มสร้างวัดนี้เมื่อประมาณห้าสิบปีก่อนครับ',"That's a long time ago!","Wow! It's so high!","OK. Thank you for telling me.",'ได้ยินประวัติ ให้แสดงความเห็น','about fifty years ago = เมื่อประมาณห้าสิบปีที่แล้ว'),
  TT("Many people come to pray and chant here. Please take off your shoes and be quiet.",'คนมากมายมากราบไหว้และสวดมนต์ที่นี่ กรุณาถอดรองเท้าและสงบนะครับ',"OK. Thank you for telling me.","That's a long time ago!","Wow! It's so high!",'ถูกบอกมารยาท ให้ตอบรับและขอบคุณ','pray = กราบไหว้/อธิษฐาน, chant = สวดมนต์, take off your shoes = ถอดรองเท้า')]),
 NPCDEF('araya','Ms. Araya','Art guide⁣ไกด์งานศิลป์',4,-3.2,0,[.7,.3,.5],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("This is the ubosot. It looks like Wat Xieng Thong in Laos.",'นี่คืออุโบสถ ดูคล้ายวัดเชียงทองในลาวค่ะ',"That's interesting! It's very beautiful.","Wow! That takes a long time.","That's amazing! I'd like to see it.",'ชมความงามของอุโบสถ','ubosot = อุโบสถ (โบสถ์ในวัด)'),
  TT("Every pillar is painted by hand.",'เสาทุกต้นลงลวดลายด้วยมือค่ะ',"Wow! That takes a long time.","That's amazing! I'd like to see it.","Really? I want to see it!",'ได้ยินว่าวาดด้วยมือ ให้แสดงความทึ่ง','pillar = เสา, by hand = ด้วยมือ'),
  TT("Behind the main Buddha statue, there is a Bodhi tree carved from wood.",'ด้านหลังพระประธานมีต้นโพธิ์แกะสลักจากไม้ค่ะ',"That's amazing! I'd like to see it.","Wow! That takes a long time.","OK. I'll come back this evening.",'ได้ยินเรื่องต้นโพธิ์แกะสลัก ให้ตอบ','carved = แกะสลัก, Bodhi tree = ต้นโพธิ์')]),
 NPCDEF('noi','Mr. Noi','Evening guide⁣ไกด์ช่วงเย็น',-1,-1.8,0,[.2,.3,.5],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Come back at sunset. The Kalpaphruek tree on the wall glows!",'กลับมาตอนพระอาทิตย์ตกนะครับ ต้นกัลปพฤกษ์บนผนังเรืองแสง!',"Really? I want to see it!","Yes, I can. It's beautiful.","That's a long time ago!",'ได้ยินว่าต้นไม้เรืองแสง ให้แสดงความอยากเห็น','glow = เรืองแสง, sunset = พระอาทิตย์ตกดิน'),
  TT("It's a painting behind the ubosot. The floor has tree-root patterns that glow too.",'เป็นภาพวาดหลังอุโบสถ และพื้นมีลายรากไม้ที่เรืองแสงด้วยครับ',"Wow! When can I see it?","Really? I want to see it!","Yes, I can. It's beautiful.",'ได้ยินว่าพื้นก็เรืองแสง ให้ถามว่าดูได้เมื่อไร','pattern = ลวดลาย, When ...? = เมื่อไร'),
  TT("In the evening, when the sky gets dark.",'ตอนเย็น เมื่อท้องฟ้ามืดครับ',"OK. I'll come back this evening.","Wow! When can I see it?","Really? I want to see it!",'ได้เวลาแล้ว ให้บอกว่าจะกลับมา','this evening = เย็นนี้')]),
 NPCDEF('pao','Pao','Visitor⁣ผู้มาเที่ยว',-8,1.6,Math.PI/2,[.95,.5,.2],[.25,.3,.5],[.1,.07,.05],'',[
  TT("Hi! Look at the view. Can you see the reservoir?",'หวัดดี ดูวิวสิ มองเห็นอ่างเก็บน้ำไหม',"Yes, I can. It's beautiful.","Where is it? Can you show me?","I think so too. Let's stay and watch.",'ถามว่ามองเห็นไหม (Can you ...?) ตอบ Yes, I can.','reservoir = อ่างเก็บน้ำ, view = วิว'),
  TT("I can also see the Chong Mek border checkpoint.",'ฉันมองเห็นจุดผ่านแดนช่องเม็กด้วย',"Where is it? Can you show me?","Yes, I can. It's beautiful.","I think so too. Let's stay and watch.",'เพื่อนเห็นจุดผ่านแดน ให้ถามว่าอยู่ตรงไหน','border checkpoint = จุดผ่านแดน'),
  TT("The sunset here is very beautiful.",'พระอาทิตย์ตกดินที่นี่สวยมาก',"I think so too. Let's stay and watch.","Yes, I can. It's beautiful.","Where is it? Can you show me?",'เพื่อนชมพระอาทิตย์ตก ให้เห็นด้วยและชวนอยู่ดู','I think so too. = ฉันก็คิดอย่างนั้น')])]});
