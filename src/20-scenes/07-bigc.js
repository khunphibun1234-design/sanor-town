SCENES.push({id:'bigc',name:'Big C',th:'บิ๊กซี',color:'#C81E1E',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.9,.9,.92]);shell(c,[.98,.98,.98],[.8,.12,.12],false);
  c.box(0,3.6,-6.14,8,.9,.06,[.8,.12,.12]);c.box(0,1.1,-6.18,4,2.2,.06,[.6,.85,.95]);
  c.counter(-6,-5.4,3,[.5,.7,.9]);c.counter(5,-5.4,4,[.4,.4,.45]);
  c.box(-8,.9,-1.6,5,1.8,.9,[.8,.8,.85],true);c.box(-8,1.9,-1.6,4.6,.3,.7,[.95,.8,.2]);
  c.box(3,.9,-1.6,4,1.8,.9,[.8,.8,.85],true);c.box(3,1.9,-1.6,3.6,.3,.7,[.3,.7,.4]);
  for(const [x,z] of [[-2,3],[-1,3.4],[0,3.8]])c.box(x,.5,z,.9,.6,.6,[.7,.7,.75]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.5);c.lamp(4,4.5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('boon','Mr. Boon','Sales staff⁣พนักงานขาย',-3,-3.6,0,[.8,.12,.12],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Excuse me, can I help you?",'ขอโทษครับ ให้ช่วยไหมครับ',"Yes. How much is this?","I'm fine, thank you. And you?","Yes, I can help you.",'พนักงานถามว่าให้ช่วยไหม ให้ถามราคา','How much is this? = อันนี้ราคาเท่าไร'),
  TT("It's on sale. It's fifty percent off.",'ลดราคาครับ ลดห้าสิบเปอร์เซ็นต์',"That's great! I'll take two.","How much is this?","What size do you need?",'ได้ยินว่าลดราคา ให้ดีใจและบอกว่าจะซื้อกี่ชิ้น','on sale = ลดราคา, fifty percent off = ลด 50%'),
  TT("Do you need a shopping cart?",'ต้องการรถเข็นไหมครับ',"Yes, please.","It's fifty percent off.","Yes, I'll take two.",'ถามว่าต้องการรถเข็นไหม ให้ตอบรับ','shopping cart = รถเข็นซื้อของ')]),
 NPCDEF('lek','Ms. Lek','Cashier⁣แคชเชียร์',5,-6.3,0,[.95,.95,.95],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Do you have a member card?",'มีบัตรสมาชิกไหมคะ',"No, I don't.","I'm fine, thank you. And you?","I'd like a shopping cart, please.",'ถามว่ามีบัตรไหม (Do you have ...?) ตอบ Yes, I do. / No, I don\'t.','member card = บัตรสมาชิก'),
  TT("Your total is four hundred baht.",'ยอดรวมสี่ร้อยบาทค่ะ',"Can I pay by card?","Yes, I have a member card.","OK. How much is it?",'ได้ยอดรวมแล้ว ให้ถามว่าจ่ายด้วยบัตรได้ไหม','total = ยอดรวม'),
  TT("Sure. Please enter your PIN.",'ได้ค่ะ กรุณากดรหัสค่ะ',"OK. Here you go.","Please sit down. Thank you.","Yes, it's four hundred baht.",'ให้กดรหัส ให้ตอบรับ','Here you go. = นี่ค่ะ/ครับ')]),
 NPCDEF('mint2','Ms. Mai','Information desk⁣เจ้าหน้าที่ประชาสัมพันธ์',-6,-6.3,0,[.3,.6,.85],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("Hello. How may I help you?",'สวัสดีค่ะ ให้ช่วยอะไรคะ',"Where can I find rice?","Thank you. Goodbye!","I'm fine, thank you. And you?",'ให้ถามว่าข้าวอยู่ตรงไหน','Where can I find ...? = ฉันหา ... ได้ที่ไหน'),
  TT("Rice is in aisle five, next to the noodles.",'ข้าวอยู่แถวห้า ข้างๆ เส้นก๋วยเตี๋ยวค่ะ',"Thank you. Is aisle five far?","Yes, I like noodles.","Thank you. Where can I find rice?",'ได้ตำแหน่งแล้ว ให้ขอบคุณและถามว่าไกลไหม','next to = ข้างๆ'),
  TT("No, it's near the entrance.",'ไม่ไกลค่ะ อยู่ใกล้ทางเข้า',"Great. Thanks a lot!","Yes, it is far. Thanks!","Go straight and turn left. Thanks!",'ได้คำตอบแล้ว ให้ขอบคุณ','Thanks a lot! = ขอบคุณมาก')]),
 NPCDEF('ben2','Ben','Shopper⁣ลูกค้าอีกคน',8.2,.5,-Math.PI/2,[.2,.6,.4],[.25,.25,.35],[.3,.2,.1],'',[
  TT("Hi! Which snack is good?",'หวัดดี ขนมอันไหนอร่อย',"I like these chips. They're tasty.","Yes, it's on the shelf.","I'm fine, thank you. And you?",'เพื่อนถามขนมอันไหนอร่อย ให้แนะนำ','I like ... = ฉันชอบ ...'),
  TT("How much are they?",'ราคาเท่าไร',"They are twenty baht.","Yes, they are very tasty.","Thank you. Where is the cashier?",'ถามราคา (หลายชิ้น) ใช้ They are ... baht.','How much are they? = (หลายชิ้น) ราคาเท่าไร'),
  TT("Thanks! You're a big help.",'ขอบใจ! เธอช่วยได้มากเลย',"You're welcome!","Sorry, I'm late.","Nice to meet you.",'ได้รับคำขอบคุณ ให้ตอบ','You\'re welcome. = ยินดี/ไม่เป็นไร')])]});
