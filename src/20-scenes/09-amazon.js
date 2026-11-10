SCENES.push({id:'amazon',name:'Café Amazon',th:'คาเฟ่ อเมซอน',color:'#0E5C3A',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.8,.76,.62]);shell(c,[.2,.5,.35],[.4,.25,.15],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.95,.95,.9]);c.box(0,3.0,-6.04,4.2,.4,.04,[.2,.5,.35]);c.box(0,1.0,-6.18,1.4,2,.06,[.5,.3,.2]);
  c.counter(-3,-5.4,4,[.82,.62,.4]);c.counter(3,-5.4,4,[.82,.62,.4]);
  c.box(10.8,1.3,-4,2.4,2.6,3,[.2,.5,.35],true);c.box(9.55,1.5,-4,.06,.9,1.4,WIN);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,.8);
  c.tree(-11,-3.5);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-2,7.5);c.tree(2,7.5);c.lamp(-4,4);c.lamp(4,4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('joy','Ms. Joy','Barista⁣บาริสต้า',-3,-6.3,0,[.2,.5,.35],[.15,.15,.2],[.08,.06,.07],'bun',[
  TT("Welcome! What would you like to drink?",'ยินดีต้อนรับค่ะ รับเครื่องดื่มอะไรดีคะ',"An iced Americano, please.","Less sweet, please.","I'm fine, thank you.",'ถามว่าจะดื่มอะไร ให้สั่งเครื่องดื่ม','iced Americano = อเมริกาโนเย็น'),
  TT("Do you want it sweet?",'ต้องการหวานไหมคะ',"Less sweet, please.","An iced Americano, please.","Take away, please.",'ถามความหวาน ให้บอกระดับ','Less sweet = หวานน้อย, No sugar = ไม่ใส่น้ำตาล'),
  TT("For here or to go?",'ทานที่ร้านหรือกลับบ้านคะ',"Take away, please.","Less sweet, please.","Yes, take away.",'ถามว่ากินที่ร้านหรือซื้อกลับ ให้เลือก','take away = ซื้อกลับ (ในอเมริกันมักพูด to go)')]),
 NPCDEF('sky','Mr. Sky','Cashier⁣แคชเชียร์',3,-6.3,0,[.95,.95,.9],[.15,.15,.2],[.1,.07,.05],'',[
  TT("Would you like a cake with that?",'รับเค้กด้วยไหมครับ',"Yes, one chocolate cake, please.","Can I use my phone to pay?","That's one hundred and ten baht.",'ถามว่าเอาเค้กไหม ให้ตอบและสั่ง','chocolate cake = เค้กช็อกโกแลต'),
  TT("That's one hundred and ten baht.",'ทั้งหมดหนึ่งร้อยสิบบาทครับ',"Can I use my phone to pay?","Yes, one chocolate cake, please.","Thank you. I'll wait here.",'ได้ราคาแล้ว ให้ถามเรื่องการจ่าย','Can I ...? = ฉัน ... ได้ไหม'),
  TT("Here's your receipt. Your number is twenty-three.",'นี่ใบเสร็จครับ หมายเลขของคุณคือยี่สิบสาม',"Thank you. I'll wait here.","Can I use my phone to pay?","An iced Americano, please.",'ได้หมายเลขแล้ว ให้ขอบคุณและบอกว่าจะรอ',"I'll wait here. = ฉันจะรอที่นี่")]),
 NPCDEF('ice','Ice','Customer⁣ลูกค้าที่นั่งอยู่',-5.4,1,Math.PI/2,[.9,.5,.3],[.2,.25,.4],[.1,.07,.05],'long',[
  TT("Excuse me. Do you know the Wi-Fi password?",'ขอโทษนะ รู้รหัส Wi-Fi ไหม',"No, sorry. Please ask the staff.","Yes, I come here every Friday.","No, it isn't. Please sit.",'ถามรหัส Wi-Fi ให้ตอบว่าไม่รู้และแนะนำให้ถามพนักงาน','Please ask the staff. = กรุณาถามพนักงาน'),
  TT("OK. Is this seat taken?",'โอเค ที่นั่งนี้มีคนจองไหม',"No, it isn't. Please sit.","No, sorry. Please ask the staff.","Yes, I come here every Friday.",'ถามว่าที่นั่งมีคนไหม (Is ...?) ตอบ No, it isn\'t.','Is this seat taken? = ที่นั่งนี้มีคนนั่งไหม'),
  TT("Thanks. Do you come here often?",'ขอบคุณ เธอมาที่นี่บ่อยไหม',"Yes, I come here every Friday.","No, it isn't. Please sit.","No, sorry. Please ask the staff.",'ถามว่ามาบ่อยไหม ให้ตอบ','every Friday = ทุกวันศุกร์')]),
 NPCDEF('max','Mr. Max','Drive-through window⁣พนักงานช่องรับเครื่องดื่ม',9,-3.2,0,[.2,.5,.35],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Your iced Americano is ready.",'อเมริกาโนเย็นของคุณพร้อมแล้วครับ',"Thank you. Can I have a straw?","Sure. Here you are.","An iced Americano, please.",'ได้เครื่องดื่ม ให้ขอบคุณและขอหลอด','straw = หลอด'),
  TT("Sure. Here you are.",'ได้ครับ นี่ครับ',"Thanks. Where can I sit?","Can I have a straw?","You can sit outside, near the trees.",'ได้หลอดแล้ว ให้ขอบคุณและถามที่นั่ง','Where can I sit? = ฉันนั่งได้ที่ไหน'),
  TT("You can sit outside, near the trees.",'นั่งข้างนอก ใกล้ต้นไม้ได้เลยครับ',"Great. Thanks!","Thank you. Can I have a straw?","Thanks! Where can I sit?",'ได้คำตอบแล้ว ให้ขอบคุณ','near the trees = ใกล้ต้นไม้')])]});
