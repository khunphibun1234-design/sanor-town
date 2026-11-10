SCENES.push({id:'hotel',name:'Hotel',th:'โรงแรม',color:'#6D4AC9',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.92,.86,.76]);shell(c,[.95,.9,.85],[.25,.3,.6],false);
  c.box(0,3.6,-6.14,6,.9,.06,[.25,.3,.6]);c.box(0,1.1,-6.18,3,2.2,.06,[.6,.85,.95]);
  for(const x of [-8.5,8.5])c.box(x,2.4,-6.18,1.8,1.4,.06,WIN);
  c.counter(-4,-5.4,5,[.5,.4,.7]);c.counter(5,-5.4,3,[.82,.62,.4]);
  c.box(10.5,1.4,-3,2,2.8,2,[.7,.72,.78],true);c.box(9.45,1.2,-3,.06,2,1.4,[.85,.85,.9]);
  c.box(-8.5,.4,-1,2.6,.8,1.2,[.5,.3,.6],true);c.box(-8.5,.9,-1.5,2.6,.6,.2,[.5,.3,.6]);c.box(-8.5,.4,1.8,2.6,.8,1.2,[.5,.3,.6],true);
  c.box(2.5,.5,-1.4,1.4,.9,.8,[.7,.5,.3],true);[[.2,.4,.7],[.7,.2,.2]].forEach((col,i)=>c.box(2.5,1.1+i*.4,-1.4,.9,.4,.5,col));
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-11.4,-3);c.lamp(-4,4.5);c.lamp(4,4.5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('rose','Ms. Rose','Receptionist⁣พนักงานต้อนรับ',-4,-6.3,0,[.45,.3,.7],[.15,.15,.2],[.08,.06,.07],'bun',[
  TT("Good evening! Do you have a reservation?",'สวัสดีตอนเย็นค่ะ จองห้องไว้ไหมคะ',"Yes, I do. My name is Mint.","Two nights, please.","Thank you. Where is the elevator?",'ถามว่าจองไว้ไหม (Do you ...?) ตอบ Yes, I do. แล้วบอกชื่อ','reservation = การจอง'),
  TT("How many nights will you stay?",'จะพักกี่คืนคะ',"Two nights, please.","Yes, I do. My name is Mint.","Thank you. Where is the elevator?",'ถามว่าพักกี่คืน ให้บอกจำนวนคืน','nights = คืน'),
  TT("Here is your key. Your room is 305.",'นี่กุญแจค่ะ ห้องของคุณคือ 305',"Thank you. Where is the elevator?","Two nights, please.","Yes, I do. My name is Mint.",'ได้กุญแจแล้ว ให้ขอบคุณและถามที่ลิฟต์','elevator = ลิฟต์ (อเมริกัน)')]),
 NPCDEF('tee','Mr. Tee','Bellboy⁣พนักงานยกกระเป๋า',1,-3,0,[.2,.2,.5],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Hello! Can I carry your bag?",'สวัสดีครับ ให้ผมช่วยยกกระเป๋าไหมครับ',"Yes, please. Thank you.","The third floor.","Thank you. Have a nice day!",'ถามว่าให้ยกกระเป๋าไหม ให้ตอบรับ','Can I ...? = ให้ฉัน ... ไหม'),
  TT("Which floor, please?",'ชั้นไหนครับ',"The third floor.","Yes, please. Thank you.","Two nights, please.",'ถามชั้น ให้ตอบชั้น','the third floor = ชั้นสาม'),
  TT("Here is your room. Enjoy your stay!",'ถึงห้องแล้วครับ ขอให้พักผ่อนให้สบายนะครับ',"Thank you. Have a nice day!","The third floor.","Yes, please. Thank you.",'ถึงห้องแล้ว ให้ขอบคุณ','Enjoy your stay! = ขอให้พักผ่อนให้สบาย')]),
 NPCDEF('pa','Ms. Pa','Housekeeping⁣แม่บ้านโรงแรม',8.4,-1,0,[.3,.6,.7],[.2,.2,.3],[.1,.07,.05],'bun',[
  TT("Hello. Do you need anything for your room?",'สวัสดีค่ะ ต้องการอะไรเพิ่มไหมคะ',"Yes. Can I have two more towels, please?","Thank you very much.","Great. Thanks for your help!",'ถามว่าต้องการอะไรไหม ให้ขอผ้าเช็ดตัว','towels = ผ้าเช็ดตัว'),
  TT("Sure. Anything else?",'ได้ค่ะ ต้องการอะไรอีกไหมคะ',"Yes. The air conditioner doesn't work.","Thank you very much.","What time is breakfast?",'ถามว่ามีอะไรอีกไหม ให้แจ้งปัญหา','doesn\'t work = ใช้ไม่ได้ (เสีย)'),
  TT("I'm sorry. I'll fix it right now.",'ขอโทษค่ะ จะรีบซ่อมให้เดี๋ยวนี้ค่ะ',"Thank you very much.","Sure. Anything else?","What time is breakfast?",'แม่บ้านขอโทษและจะแก้ไข ให้ขอบคุณ','fix = ซ่อม, right now = เดี๋ยวนี้')]),
 NPCDEF('kay','Ms. Kay','Concierge⁣พนักงานบริการแขก',5,-6.3,0,[.82,.62,.4],[.15,.15,.2],[.08,.06,.07],'long',[
  TT("Good morning! How can I help you?",'สวัสดีตอนเช้าค่ะ ให้ช่วยอะไรคะ',"What time is breakfast?","Breakfast is from six to ten.","Great. Thanks for your help!",'ถามเวลาอาหารเช้า','What time is ...? = ... กี่โมง'),
  TT("Breakfast is from six to ten, on the first floor.",'อาหารเช้าหกโมงถึงสิบโมง ชั้นหนึ่งค่ะ',"Thank you. Is the Wi-Fi free?","What time is breakfast?","Yes, it is free.",'ได้เวลาแล้ว ให้ขอบคุณและถามเรื่อง Wi-Fi','free = ฟรี'),
  TT("Yes, it is free. The password is on your key card.",'ฟรีค่ะ รหัสผ่านอยู่ที่บัตรกุญแจค่ะ',"Great. Thanks for your help!","Is the Wi-Fi free?","What time is breakfast?",'ได้คำตอบแล้ว ให้ขอบคุณ','password = รหัสผ่าน')])]});
