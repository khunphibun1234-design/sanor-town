/* 5 Clinic */
SCENES.push({id:'clinic',name:'Clinic',th:'คลินิก',color:'#D6336C',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.85,.88,.9]);shell(c,[.96,.97,1],[.3,.5,.75],false);
  for(const x of [-8.5,8.5])c.box(x,2.3,-6.18,1.6,1.2,.06,WIN);
  c.box(0,1.0,-6.18,2.2,2,.06,WIN);c.box(0,3.5,-6.14,.5,1.4,.06,[.85,.15,.15]);c.box(0,3.5,-6.14,1.4,.5,.06,[.85,.15,.15]);
  c.counter(-5,-5.2,4,[.5,.7,.9]);c.box(-5.8,1.4,-5.3,.6,.4,.1,[.15,.15,.2]);
  c.counter(5,-5.2,4,[.5,.85,.6]);c.box(5,2.5,-6.14,.9,.9,.06,[.15,.6,.3]);
  c.bench(-8,1.5);c.bench(-4,3.5);c.box(11.5,.5,-3,2,.5,1,[.8,.9,1],true);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-9,-1);c.lamp(9,4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 {id:'jane',name:'Ms. Jane',role:'Receptionist⁣พนักงานต้อนรับ',x:-5,z:-6.2,ry:0,shirt:[.3,.6,.85],pants:[.2,.2,.3],hair:[.45,.25,.1],acc:'bun',turns:[
  TT("Hello. How can I help you?",'สวัสดีค่ะ มีอะไรให้ช่วยคะ',"I'd like to see a doctor, please.","My name is Mint.","I'm fine, thank you.",'ถามว่าให้ช่วยไหม ให้บอกว่าอยากพบหมอ','I\'d like to see a doctor. = ฉันอยากพบหมอ'),
  TT("What is your name?",'ชื่ออะไรคะ',"My name is Mint.","I'd like to see a doctor, please.","Yes, my name is Mint.",'ถามชื่อ ให้ตอบชื่อ','My name is ... = ฉันชื่อ ...'),
  TT("Please sit down. The doctor will see you soon.",'เชิญนั่งก่อนค่ะ คุณหมอจะตรวจเร็วๆ นี้',"OK. Thank you.","What is your name?","My name is Mint.",'ให้นั่งรอ ให้ตอบรับและขอบคุณ','Please sit down. = เชิญนั่ง')]},
 {id:'ben',name:'Ben',role:'Nurse⁣พยาบาล',x:0,z:-2.4,ry:0,shirt:[.4,.8,.7],pants:[.4,.8,.7],hair:[.1,.08,.08],acc:'',turns:[
  TT("How are you feeling today?",'วันนี้รู้สึกอย่างไรบ้าง',"Not good. I have a headache.","Yes, I have a headache.","No, I don't.",'พยาบาลถามอาการ ให้บอกว่าไม่สบายอะไร','I have a headache. = ฉันปวดหัว'),
  TT("I'm sorry to hear that. Do you have a fever?",'เสียใจด้วยนะ มีไข้ไหม',"No, I don't.","Since yesterday.","Thank you. I'm fine.",'ถามว่ามีไข้ไหม (Do you ...?) ตอบ Yes, I do. / No, I don\'t.','fever = ไข้'),
  TT("How long have you had it?",'เป็นมานานเท่าไรแล้ว',"Since yesterday.","No, I don't.","Yes, I have a headache.",'ถามว่าเป็นมานานแค่ไหน ให้ตอบเวลา','Since yesterday = ตั้งแต่เมื่อวาน')]},
 {id:'suda',name:'Dr. Suda',role:'Doctor⁣คุณหมอ',x:8.8,z:-3.2,ry:-Math.PI/2,shirt:[.97,.97,.97],pants:[.25,.3,.4],hair:[.08,.06,.07],acc:'long',turns:[
  TT("Hello. What's the problem?",'สวัสดีค่ะ เป็นอะไรมาคะ',"I have a headache and a sore throat.","Thank you, doctor.","My name is Mint.",'หมอถามอาการ ให้บอกอาการ','sore throat = เจ็บคอ'),
  TT("Does it hurt a lot?",'เจ็บมากไหม',"Yes, it hurts a lot.","Since yesterday.","Yes, I do. It's hot.",'ถามว่าเจ็บมากไหม ให้ตอบ','hurt = เจ็บ, a lot = มาก'),
  TT("Take this medicine and rest. You will feel better soon.",'กินยานี้แล้วพักผ่อน เดี๋ยวก็ดีขึ้นค่ะ',"Thank you, doctor.","Yes, it hurts a lot.","Here it is.",'หมอให้ยาและแนะนำ ให้ขอบคุณ','You will feel better soon. = เดี๋ยวคุณจะรู้สึกดีขึ้น')]},
 {id:'art',name:'Mr. Art',role:'Pharmacist⁣เภสัชกร',x:5,z:-6.2,ry:0,shirt:[.3,.65,.4],pants:[.2,.25,.3],hair:[.5,.5,.52],acc:'hat',turns:[
  TT("Hello! Do you have a prescription?",'สวัสดีครับ มีใบสั่งยาไหมครับ',"Yes. Here it is.","I'd like to see a doctor, please.","Yes. Thank you, doctor.",'เภสัชกรถามว่ามีใบสั่งยาไหม ให้ยื่นให้','prescription = ใบสั่งยา'),
  TT("Take one pill three times a day, after meals.",'กินยาหนึ่งเม็ดวันละสามครั้ง หลังอาหารครับ',"One pill, three times a day. OK.","Yes. Here it is.","Yes, I have a prescription.",'เภสัชกรบอกวิธีกินยา ให้ทวน','three times a day = วันละสามครั้ง, after meals = หลังอาหาร'),
  TT("Drink water and get some rest. Feel better soon!",'ดื่มน้ำและพักผ่อนด้วยนะครับ หายไวๆ นะ',"Thank you. Goodbye!","Yes. Here it is.","I'd like to see a doctor, please.",'ได้รับคำอวยพร ให้ขอบคุณและลา','Feel better soon! = ขอให้หายไวๆ')]}]});
