/* ===== Ubon: Sirindhorn Dam ===== */
SCENES.push({id:'sirindhorn',name:'Sirindhorn Dam',th:'เขื่อนสิรินธร',color:'#0369A1',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.55,.76,.4]);
  c.box(0,-.02,-8.2,26,.12,2.8,[.2,.5,.8]);
  for(let i=0;i<5;i++)for(let k=0;k<2;k++)c.box(-9+i*3.1,.03,-8.8+k*1.1,2.6,.05,.9,[.12,.2,.4]);
  c.box(0,.9,-6.4,26,1.8,1.6,[.62,.58,.5],true);c.box(0,1.85,-6.4,26,.12,1.8,[.8,.78,.72]);
  for(let x=-11;x<=11;x+=2)c.box(x,1.1,-5.58,.4,1.4,.06,[.5,.46,.4]);
  c.ob.push([-14,14,-9.6,-5.4]);
  c.box(8.6,1.6,-3.6,4.2,3.2,3,[.88,.9,.95],true);c.box(8.6,3.35,-3.6,4.6,.3,3.4,[.2,.4,.65]);c.box(8.6,1.2,-2.06,3.0,1.0,.06,WIN);c.box(8.6,.9,-2.04,.9,1.8,.06,DOOR);
  c.box(11,2.8,-3.6,.3,3,.3,[.6,.6,.65]);c.box(11.6,4.4,-3.6,1.4,.12,.12,[.6,.6,.65]);
  c.box(-9.0,.4,-1.0,2.6,.8,1.6,[.58,.4,.28],true);c.box(-9.0,1.5,-1.0,3.0,.14,2.0,[.9,.9,.92]);
  c.box(-9.9,.8,-1.0,.14,1.6,.14,[.5,.4,.3]);c.box(-8.1,.8,-1.0,.14,1.6,.14,[.5,.4,.3]);
  c.box(9.2,.4,3.0,2.8,.8,1.2,[.88,.9,.95],true);c.box(9.2,.95,3.0,2.4,.1,.9,[.2,.5,.8]);
  c.box(-3.2,.05,3.6,3.6,.08,1.6,[.8,.4,.5]);c.box(-3.2,.05,3.6,2.4,.1,.8,[.95,.85,.3]);c.box(3.4,.05,3.8,3.6,.08,1.6,[.45,.7,.35]);c.box(3.4,.05,3.8,2.2,.1,.8,[.95,.6,.7]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-11.8,2.4);c.tree(11.8,.6);c.lamp(-6,5.4);c.lamp(6,5.4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('guide','Mr. Wirat','Dam guide⁣ไกด์เขื่อน',-2.6,1.0,Math.PI,[.2,.45,.7],[.25,.25,.3],[.1,.07,.05],'cap',[
  TT("Welcome to Sirindhorn Dam! It is a very big dam.",'ยินดีต้อนรับสู่เขื่อนสิรินธร เป็นเขื่อนที่ใหญ่มากครับ',"Wow! How high is it?",'So it is a very old dam.','Thank you. I will go there.','ได้ยินว่าเขื่อนใหญ่ ให้ถามว่าสูงเท่าไร','How high is it? = สูงเท่าไร'),
  TT("It is forty-two meters high and nine hundred forty meters long.",'สูงสี่สิบสองเมตร ยาวเก้าร้อยสี่สิบเมตรครับ',"That's really big!",'Wow! How high is it?','So it is a very old dam.','ได้ยินขนาดแล้ว ให้ตอบอย่างทึ่ง','meters = เมตร (อเมริกัน), long = ยาว'),
  TT("People finished building it in 1971.",'คนสร้างเสร็จในปี ค.ศ. 1971 ครับ',"So it is a very old dam.",'Wow! How high is it?','Thank you. I will go there.','ได้ยินปีที่สร้างเสร็จ ให้สรุปว่าเขื่อนเก่าแก่','finish = ทำเสร็จ, old = เก่า')]),
 NPCDEF('engineer','Ms. Kanda','Power plant worker⁣พนักงานโรงไฟฟ้า',8.6,-.4,Math.PI,[.95,.7,.15],[.2,.2,.25],[.08,.06,.07],'bun',[
  TT("Hello! This dam makes electricity.",'สวัสดีค่ะ เขื่อนนี้ผลิตไฟฟ้าค่ะ',"Cool! How does it make electricity?",'I see. Water makes power.','That\'s a great idea. It\'s good for the environment.','ได้ยินว่าผลิตไฟฟ้า ให้ถามว่าผลิตได้อย่างไร','electricity = ไฟฟ้า, How does it ...? = ... ได้อย่างไร'),
  TT("Water moves the generators. We have three of them.",'น้ำทำให้เครื่องกำเนิดไฟฟ้าหมุนค่ะ เรามีสามเครื่อง',"I see. Water makes power.",'Cool! How does it make electricity?','That\'s a great idea. It\'s good for the environment.','เข้าใจหลักการ ให้สรุปว่าน้ำทำให้เกิดพลังงาน','generator = เครื่องกำเนิดไฟฟ้า, power = พลังงาน'),
  TT("We also have floating solar panels on the lake.",'เรายังมีแผงโซลาร์เซลล์ลอยน้ำบนทะเลสาบด้วยค่ะ',"That's a great idea. It's good for the environment.",'Cool! How does it make electricity?','I see. Water makes power.','ได้ยินเรื่องโซลาร์ลอยน้ำ ให้ชมว่าเป็นมิตรกับสิ่งแวดล้อม','floating solar panels = แผงโซลาร์ลอยน้ำ, environment = สิ่งแวดล้อม')]),
 NPCDEF('fisher','Mr. Sing','Fisherman⁣ชาวประมง',-8.6,1.8,0,[.55,.4,.25],[.3,.3,.3],[.1,.07,.05],'cap',[
  TT("Good morning! I fish in this big lake.",'สวัสดีตอนเช้า ผมหาปลาในทะเลสาบใหญ่นี้ครับ',"What kind of fish do you catch?",'That\'s a good job.','I understand. Thank you for telling me.','ได้ยินว่าหาปลาที่นี่ ให้ถามว่าจับปลาอะไร','What kind of ...? = ... ประเภทไหน, catch = จับ'),
  TT("I catch many freshwater fish. I sell them at the market.",'ผมจับปลาน้ำจืดหลายชนิด แล้วเอาไปขายที่ตลาดครับ',"That's a good job.",'What kind of fish do you catch?','Thank you. I will go there.','ได้ยินว่าขายที่ตลาด ให้ชมงานของเขา','freshwater fish = ปลาน้ำจืด, sell = ขาย'),
  TT("The lake helps many families earn money.",'ทะเลสาบนี้ช่วยให้หลายครอบครัวมีรายได้ครับ',"I understand. Thank you for telling me.",'What kind of fish do you catch?','Thank you. I will go there.','ได้ยินว่าช่วยครอบครัวมีรายได้ ให้ตอบรับและขอบคุณ','earn money = หาเงิน/มีรายได้, helps = ช่วย')]),
 NPCDEF('farmer','Auntie Lek','Farmer⁣เกษตรกร',3.0,-.8,Math.PI,[.3,.55,.3],[.3,.25,.2],[.1,.07,.05],'hat',[
  TT("Hi! I'm a farmer. The dam gives water to my rice field.",'สวัสดีค่ะ ฉันเป็นเกษตรกร เขื่อนให้น้ำกับนาข้าวของฉันค่ะ',"That's wonderful. Water is important.",'Thank you. I will go there.','I see. It protects the city from floods.','ได้ยินว่าเขื่อนให้น้ำนาข้าว ให้ตอบอย่างชื่นชม','rice field = นาข้าว, important = สำคัญ'),
  TT("The dam also helps when there is too much rain.",'เขื่อนยังช่วยเวลาฝนตกมากเกินไปด้วยค่ะ',"I see. It protects the city from floods.",'That\'s wonderful. Water is important.','Thank you. I will go there.','ได้ยินว่าช่วยตอนฝนมาก ให้สรุปว่าช่วยป้องกันน้ำท่วม','flood = น้ำท่วม, protect = ปกป้อง'),
  TT("Please visit Sirindhorn Park. The flowers are beautiful.",'แวะไปเที่ยวสวนสิรินธรนะคะ ดอกไม้สวยมากค่ะ',"Thank you. I will go there.",'That\'s wonderful. Water is important.','I see. It protects the city from floods.','ได้รับคำแนะนำ ให้ตอบรับและขอบคุณ','park = สวนสาธารณะ, beautiful = สวยงาม')])]});

