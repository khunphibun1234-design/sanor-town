/* ===== Clothes Shop ===== */
SCENES.push({id:'clothes',name:'Clothes Shop',th:'ร้านเสื้อผ้า',color:'#C026D3',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.88,.84,.8]);shell(c,[.97,.9,.95],[.6,.25,.5],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.75,.2,.6]);c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(6,-5.4,4,[.9,.8,.5]);c.box(5.4,1.3,-5.3,.4,.3,.4,[.2,.2,.25]);
  for(let i=0;i<5;i++)c.box(-9.2+i*.5,1.6,-5.6,.18,1.1,.1,[[.9,.3,.3],[.3,.5,.9],[.95,.8,.2],[.3,.75,.45],[.9,.9,.95]][i]);
  c.box(-8,2.4,-5.9,5,.1,.1,[.5,.5,.55]);c.box(-10.4,1.2,-5.9,.1,2.4,.1,[.5,.5,.55]);c.box(-5.6,1.2,-5.9,.1,2.4,.1,[.5,.5,.55]);
  c.box(-7,.5,-2.4,3,1.0,1.2,[.7,.5,.35],true);for(let i=0;i<4;i++)c.box(-8.2+i*.8,1.15,-2.4,.6,.3,.9,[[.9,.3,.3],[.3,.5,.9],[.95,.8,.2],[.3,.75,.45]][i]);
  c.box(9.2,1.0,.5,.12,2,1.6,[.7,.85,.95]);c.box(9.1,1.0,.5,.04,1.8,1.4,[.85,.95,1]);
  c.box(3.2,.5,-1.8,.7,1.0,.7,[.9,.8,.9],true);c.box(3.2,1.45,-1.8,.4,.9,.4,[.95,.55,.7]);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('nida','Ms. Nida','Shop assistant⁣พนักงานร้านเสื้อผ้า',-2.5,-.6,Math.PI,[.85,.3,.6],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Welcome! Can I help you?",'ยินดีต้อนรับค่ะ ให้ช่วยอะไรไหมคะ',"Yes, please. I'm looking for a T-shirt.","I'm a medium.","I like blue.",'พนักงานถามว่าให้ช่วยไหม ให้บอกว่ากำลังหาเสื้อยืด','I\'m looking for ... = ฉันกำลังหา ...'),
  TT("What size are you?",'ใส่ไซส์อะไรคะ',"I'm a medium.","I like blue.","Yes, please. I'm looking for a T-shirt.",'ถามไซส์ ตอบด้วย small, medium หรือ large','size = ไซส์, medium = ขนาดกลาง'),
  TT("What color do you like?",'ชอบสีอะไรคะ',"I like blue.","I'm a medium.","Yes, I like blue.",'ถามว่าชอบสีอะไร ตอบ I like ...','color = สี (อเมริกัน)')]),
 NPCDEF('kai','Kai','Customer⁣ลูกค้า',-9.6,.4,Math.PI/2,[.3,.55,.8],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. How much is this shirt?",'ขอโทษครับ เสื้อตัวนี้ราคาเท่าไร',"It's two hundred baht.","I'm a medium.","No, it isn't. It's OK.",'ถามราคา ตอบ It\'s ... baht.','How much is ...? = ... ราคาเท่าไร'),
  TT("Is it too expensive?",'แพงเกินไปไหม',"No, it isn't. It's OK.","It's two hundred baht.","Yes, I do. It looks nice.",'ถามว่าแพงไหม (Is ...?) ตอบ No, it isn\'t.','expensive = แพง, too = เกินไป'),
  TT("Do you like this red one?",'เธอชอบตัวสีแดงนี้ไหม',"Yes, I do. It looks nice.","It's two hundred baht.","No, it isn't. It's OK.",'ถามความชอบ (Do you ...?) ตอบ Yes, I do.','It looks nice. = ดูสวยดี')]),
 NPCDEF('fon','Fon','Friend⁣เพื่อน',2.2,2.0,Math.PI,[.9,.5,.7],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Can I try this dress on?",'สวัสดี ขอลองชุดนี้ได้ไหม',"Sure. The fitting room is over there.","Great! It looks good on you.","No, thanks. I have my own bag.",'เพื่อนถามว่าลองได้ไหม ให้ตอบรับและบอกห้องลองเสื้อ','try on = ลอง (เสื้อผ้า), fitting room = ห้องลองเสื้อ'),
  TT("It's too small. Do you have a bigger one?",'ตัวนี้เล็กไปค่ะ มีตัวใหญ่กว่านี้ไหม',"Let's ask the assistant.","Sure. The fitting room is over there.","Great! It looks good on you.",'ถามหาตัวใหญ่กว่า ให้ชวนไปถามพนักงาน','bigger = ใหญ่กว่า, Let\'s ... = ไป ... กันเถอะ'),
  TT("This one fits me. I'll take it!",'ตัวนี้พอดีเลย ฉันเอาตัวนี้!',"Great! It looks good on you.","Let's ask the assistant.","Sure. The fitting room is over there.",'เพื่อนตัดสินใจซื้อ ให้ชมเพื่อน','fit = พอดี, I\'ll take it. = ฉันเอาอันนี้')]),
 NPCDEF('pat','Mr. Pat','Cashier⁣แคชเชียร์',6,-6.3,0,[.9,.7,.2],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Hi! Did you find everything?",'สวัสดีครับ หาของครบแล้วใช่ไหมครับ',"Yes, I did. Thank you.","Here you are.","No, thanks. I have my own bag.",'แคชเชียร์ถามว่าหาครบไหม (Did you ...?) ตอบ Yes, I did.','Did you find ...? = เจอ ... ไหม'),
  TT("That's three hundred and fifty baht.",'สามร้อยห้าสิบบาทครับ',"Here you are.","Yes, I did. Thank you.","No, thanks. I have my own bag.",'ได้ราคาแล้ว ให้ยื่นเงิน','Here you are. = นี่ครับ/ค่ะ'),
  TT("Do you want a bag?",'เอาถุงไหมครับ',"No, thanks. I have my own bag.","Here you are.","Yes, I did. Thank you.",'ถามว่าเอาถุงไหม (Do you ...?) ปฏิเสธอย่างสุภาพ','No, thanks. = ไม่เป็นไรค่ะ/ครับ')])]});

