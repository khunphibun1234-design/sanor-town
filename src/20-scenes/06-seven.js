SCENES.push({id:'seven',name:'7-Eleven',th:'เซเว่น อีเลฟเว่น',color:'#E26A00',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.88,.88,.9]);shell(c,[.97,.97,.97],[.3,.3,.35],false);
  c.box(0,3.85,-6.15,19,.22,.06,[.95,.5,.1]);c.box(0,3.55,-6.15,19,.22,.06,[.1,.6,.3]);c.box(0,3.25,-6.15,19,.22,.06,[.85,.15,.2]);
  c.box(0,1.1,-6.18,3,2.2,.06,[.6,.85,.95]);c.box(-7,1.4,-6.16,3,1.6,.06,WIN);c.box(7,1.4,-6.16,3,1.6,.06,WIN);
  c.counter(-1,-5.4,4,[.4,.4,.45]);c.counter(-6.5,-5.4,3,[.5,.7,.9]);
  c.box(-8,.9,-1.8,4,1.8,.8,[.8,.8,.85],true);[[.95,.3,.3],[.3,.7,.95],[.95,.85,.2],[.3,.85,.4]].forEach((col,i)=>c.box(-9.2+i*.8,1.9,-1.8,.5,.3,.6,col));
  c.box(9,1.0,-3.5,1,2,3.5,[.7,.85,.95],true);c.box(3.5,.9,-1.8,3,1.8,.8,[.8,.8,.85],true);
  c.bench(8,4);c.tree(-11.4,6.5);c.tree(11.4,-7.5);c.lamp(-4,4);c.lamp(4,4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('ying','Ms. Ying','Cashier⁣แคชเชียร์',-1,-6.3,0,[.95,.5,.1],[.2,.2,.25],[.08,.06,.07],'bun',[
  TT("Hi! Did you find everything?",'สวัสดีค่ะ หาของครบไหมคะ',"Yes, thank you.","I'm fine, thank you. And you?","Yes, please heat it up.",'ถามว่าหาของครบไหม ให้ตอบและขอบคุณ','Did you find everything? = หาของครบไหม'),
  TT("Would you like a bag?",'รับถุงไหมคะ',"No, thanks. I have my own bag.","Thank you. Where is the water?","Yes, I did. Thank you.",'ถามว่าเอาถุงไหม ให้ปฏิเสธสุภาพ','my own bag = ถุงของฉันเอง'),
  TT("Do you want to heat it up?",'อุ่นให้ไหมคะ',"Yes, please.","Yes, I did. Thank you.","Yes, it's hot today.",'ถามว่าอุ่นอาหารไหม (Do you want ...?) ตอบ Yes, please.','heat it up = อุ่นให้ร้อน')]),
 NPCDEF('beer','Mr. Beer','Store staff⁣พนักงานร้าน',6.4,-1.2,0,[.1,.6,.3],[.2,.25,.3],[.1,.07,.05],'',[
  TT("Can I help you find something?",'ให้ช่วยหาของไหมครับ',"Yes. Where is the water?","Yes, I did. Thank you.","Thank you. Do you have snacks?",'พนักงานถามว่าให้ช่วยหาของไหม ให้ถามว่าน้ำอยู่ที่ไหน','Where is ...? = ... อยู่ที่ไหน'),
  TT("It's in the fridge, next to the milk.",'อยู่ในตู้แช่ ข้างๆ นมครับ',"Thank you. Do you have snacks?","Thank you. Where is the water?","Yes, the milk is in the fridge.",'ได้คำตอบแล้ว ให้ขอบคุณและถามหาขนม','snacks = ขนมขบเคี้ยว'),
  TT("Yes, they're on aisle two. Go straight and turn left.",'มีครับ อยู่แถวสอง เดินตรงแล้วเลี้ยวซ้าย',"Aisle two. Got it. Thanks!","Aisle five. Got it. Thanks!","Go straight and turn right. Thanks!",'ได้เส้นทางแล้ว ให้ทวนและขอบคุณ','aisle = ทางเดินระหว่างชั้นวาง')]),
 NPCDEF('nid','Ms. Nid','Service counter⁣พนักงานบริการ',-6.5,-6.3,0,[.2,.5,.8],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("Hello. Can I help you?",'สวัสดีค่ะ ให้ช่วยอะไรไหมคะ',"Yes. I'd like to top up my phone, please.","I'm fine, thank you. And you?","Yes, I can help you.",'ให้บอกว่าต้องการเติมเงินโทรศัพท์','top up = เติมเงิน'),
  TT("How much do you want to top up?",'ต้องการเติมเท่าไรคะ',"One hundred baht, please.","Yes, please.","It's a blue phone.",'ถามจำนวนเงิน ให้บอกจำนวน','How much ...? = เท่าไร'),
  TT("Done! Please check your phone.",'เรียบร้อยค่ะ ลองเช็กโทรศัพท์ดูนะคะ',"Thank you very much!","One hundred baht, please.","I'd like to top up my phone, please.",'เสร็จแล้ว ให้ขอบคุณ','Done! = เสร็จแล้ว')]),
 NPCDEF('gift','Gift','Customer⁣ลูกค้าในแถว',-1,-3.6,0,[.9,.3,.5],[.2,.3,.45],[.1,.07,.05],'',[
  TT("Excuse me. Are you in line?",'ขอโทษนะ เธอต่อแถวอยู่ไหม',"Yes, I am. Please go first.","I'm fine, thank you. And you?","No, I'm in line. Please go first.",'ถามว่าต่อแถวไหม (Are you ...?) ตอบ Yes, I am.','Are you in line? = คุณต่อแถวอยู่ไหม'),
  TT("Thanks! Do you like this snack?",'ขอบใจ! เธอชอบขนมนี้ไหม',"Yes, I do. It's tasty.","Yes, I am. It's tasty.","It's a long line. Thank you.",'ถามว่าชอบไหม (Do you ...?) ตอบ Yes, I do.','tasty = อร่อย'),
  TT("Cool. I'll buy it. Bye!",'เยี่ยม ฉันจะซื้อบ้าง บ๊ายบาย',"Bye! See you.","It's tasty.","Excuse me. Are you in line?",'เพื่อนลา ให้ลากลับ','See you. = แล้วเจอกัน')])]});
