/* ===== Pharmacy ===== */
SCENES.push({id:'pharmacy',name:'Pharmacy',th:'ร้านขายยา',color:'#059669',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.9,.93,.9]);shell(c,[.95,.98,.95],[.1,.55,.4],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.05,.6,.4]);c.box(0,3.0,-6.04,.9,.12,.04,[1,1,1]);c.box(0,3.0,-6.04,.12,.9,.04,[1,1,1]);
  c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-5,-5.4,4,[.85,.95,.9]);c.box(-5.6,1.3,-5.3,.4,.3,.4,[.2,.2,.25]);c.box(-4.4,1.3,-5.3,.4,.4,.3,[.9,.3,.3]);
  c.box(7,.9,-5.8,2.8,1.8,.5,[.8,.85,.9],true);for(let i=0;i<3;i++){c.box(7,.5+i*.6,-5.5,2.6,.05,.3,[.6,.6,.65]);for(let k=0;k<4;k++)c.box(6.1+k*.6,.7+i*.6,-5.5,.3,.3,.2,[[.9,.4,.3],[.3,.6,.9],[.95,.85,.3],[.4,.8,.5]][(i+k)%4]);}
  c.box(-9,.5,-1.5,2.0,1.0,.7,[.9,.9,.92],true);c.box(-9,1.2,-1.5,1.6,.3,.5,[.3,.7,.6]);
  c.box(9,.5,0,.8,1.0,2.4,[.8,.85,.9],true);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('pharm','Ms. Ratree','Pharmacist⁣เภสัชกร',-5,-6.3,0,[.95,.95,.95],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! How can I help you?",'สวัสดีค่ะ ให้ช่วยอะไรคะ',"I have a headache.","Since this morning.","OK. Thank you very much.",'เภสัชกรถามว่าให้ช่วยอะไร ให้บอกอาการปวดหัว','I have a headache. = ฉันปวดหัว'),
  TT("How long have you had it?",'เป็นมานานแค่ไหนแล้วคะ',"Since this morning.","OK. Thank you very much.","Yes, I have a headache.",'ถามว่าเป็นมานานแค่ไหน ตอบด้วย since หรือ for','since this morning = ตั้งแต่เช้านี้'),
  TT("Take one pill after meals, twice a day.",'ทานครั้งละหนึ่งเม็ด หลังอาหาร วันละสองครั้งค่ะ',"OK. Thank you very much.","I have a headache.","Since this morning.",'เภสัชกรบอกวิธีกินยา ให้ตอบรับและขอบคุณ','after meals = หลังอาหาร, twice a day = วันละสองครั้ง')]),
 NPCDEF('cust','Mr. Daeng','Customer⁣ลูกค้า',-9.0,1.8,Math.PI/2,[.7,.35,.25],[.25,.3,.5],[.5,.5,.5],'cap',[
  TT("Excuse me. Where is the cough medicine?",'ขอโทษครับ ยาแก้ไออยู่ตรงไหน',"It's on the second shelf.","No, I don't. I'm just here with my mom.","Good idea. Get well soon!",'ถามว่าอยู่ที่ไหน ตอบบอกตำแหน่ง','cough medicine = ยาแก้ไอ, shelf = ชั้นวาง'),
  TT("Do you have a cold, too?",'เธอเป็นหวัดด้วยหรือเปล่า',"No, I don't. I'm just here with my mom.","It's on the second shelf.","Good idea. Get well soon!",'ถามว่าเป็นหวัดไหม (Do you ...?) ตอบ No, I don\'t.','have a cold = เป็นหวัด'),
  TT("Drink a lot of water and get some rest.",'ดื่มน้ำเยอะ ๆ และพักผ่อนนะ',"Good idea. Get well soon!","No, I don't. I'm just here with my mom.","It's on the second shelf.",'ได้ยินคำแนะนำ ให้ตอบและอวยพรให้หายไว','Get well soon! = ขอให้หายเร็ว ๆ')]),
 NPCDEF('mother','Ms. Wan','Mother⁣คุณแม่',2.4,1.2,Math.PI,[.85,.4,.5],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hi! My son has a fever. What should I buy?",'สวัสดีค่ะ ลูกฉันเป็นไข้ ควรซื้ออะไรดีคะ',"Let's ask the pharmacist.","You're welcome. Take care!","I have a headache.",'แม่ถามว่าควรซื้ออะไร ให้ชวนไปถามเภสัชกร','fever = ไข้, What should I ...? = ฉันควร ... อะไร'),
  TT("Is this medicine for kids?",'ยานี้เหมาะกับเด็กไหม',"Please read the label.","You're welcome. Take care!","Since this morning.",'ถามว่าเหมาะกับเด็กไหม ให้แนะนำให้อ่านฉลาก','label = ฉลาก, for kids = สำหรับเด็ก'),
  TT("Thanks for your help!",'ขอบคุณที่ช่วยนะ',"You're welcome. Take care!","Please read the label.","Let's ask the pharmacist.",'แม่ขอบคุณ ให้ตอบรับ','You\'re welcome. = ยินดีค่ะ/ครับ, Take care! = ดูแลตัวเองนะ')]),
 NPCDEF('cashier','Mr. Tum','Assistant⁣ผู้ช่วยเภสัชกร',7,-4.3,Math.PI,[.2,.6,.5],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Hi! Do you need a mask or vitamins?",'สวัสดีครับ ต้องการหน้ากากหรือวิตามินไหมครับ',"I need a mask, please.","Here you are.","Yes, I need a mask.",'ถามให้เลือก ให้ตอบสิ่งที่ต้องการ','mask = หน้ากาก, I need ... = ฉันต้องการ ...'),
  TT("That's one hundred and twenty baht.",'หนึ่งร้อยยี่สิบบาทครับ',"Here you are.","I need a mask, please.","Yes, I need a mask, please.",'ได้ราคาแล้ว ให้ยื่นเงิน','Here you are. = นี่ครับ/ค่ะ'),
  TT("Please get well soon.",'ขอให้หายป่วยเร็ว ๆ นะครับ',"Thank you. Goodbye!","Here you are.","I need a mask, please.",'ได้รับคำอวยพร ให้ขอบคุณและลา','Thank you. Goodbye! = ขอบคุณ ลาก่อน')])]});

