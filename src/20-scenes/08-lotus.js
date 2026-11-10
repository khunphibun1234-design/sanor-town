SCENES.push({id:'lotus',name:"Lotus's",th:'โลตัส',color:'#15803D',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.88,.92,.88]);shell(c,[.9,.95,.9],[.1,.5,.25],false);
  c.box(0,3.6,-6.14,8,.9,.06,[.1,.5,.25]);c.box(0,1.1,-6.18,4,2.2,.06,[.6,.85,.95]);
  c.counter(4,-5.4,4,[.5,.85,.6]);
  c.box(-8,1.0,-2.5,3,.1,.8,[.6,.6,.65]);c.box(-8,.5,-2.5,.1,1,.1,[.5,.5,.55],true);[[.95,.3,.3],[.3,.7,.95],[.95,.85,.2],[.5,.85,.5],[.85,.5,.9]].forEach((col,i)=>c.box(-9+i*.5,1.5,-2.5,.35,.9,.08,col));
  c.box(-11,1.2,1.5,2,2.4,3,[.85,.85,.9],true);
  c.box(7,.55,-3.2,4,1.1,1,[.75,.75,.8],true);[[.1,.1,.1],[.9,.9,.9],[.8,.2,.2]].forEach((col,i)=>c.box(5.8+i*1.1,1.3,-3.2,.7,.4,.5,col));
  c.table(-6,2.5);c.table(7,3);c.tree(-11.4,-6.5);c.tree(11.4,6.5);c.lamp(-4,5);c.lamp(4,5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('aom','Ms. Aom','Clothes shop⁣พนักงานร้านเสื้อผ้า',-8,-.8,0,[.9,.4,.6],[.2,.2,.3],[.1,.07,.05],'bun',[
  TT("Hi! Can I help you?",'สวัสดีค่ะ ให้ช่วยไหมคะ',"Can I try this on?","It fits well. I'll take it.","I'm fine, thank you.",'ให้ขอลองใส่เสื้อ','Can I try this on? = ลองใส่ได้ไหม'),
  TT("Sure. The fitting room is over there.",'ได้ค่ะ ห้องลองเสื้ออยู่ตรงนั้นค่ะ',"Thank you. Do you have a bigger size?","Can I try this on?","It fits well. I'll take it.",'ได้ที่ลองแล้ว ให้ขอบคุณและถามหาไซซ์ใหญ่กว่า','bigger size = ไซซ์ใหญ่กว่า'),
  TT("Yes, here is a large.",'มีค่ะ นี่ไซซ์ L ค่ะ',"It fits well. I'll take it.","Do you have a bigger size?","That's a little expensive.",'ลองแล้วพอดี ให้บอกว่าจะซื้อ','It fits well. = ใส่พอดีเลย')]),
 NPCDEF('pop','Mr. Pop','Electronics⁣พนักงานร้านอิเล็กทรอนิกส์',7,-1.2,0,[.2,.2,.3],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Are you looking for something?",'กำลังมองหาอะไรอยู่ไหมครับ',"Yes. I'm looking for headphones.","Yes. It's nine hundred baht.","I like the black ones.",'ให้ตอบว่ากำลังหาอะไร','headphones = หูฟัง'),
  TT("These are black and white. Which color do you like?",'มีสีดำกับสีขาว ชอบสีไหนครับ',"I like the black ones.","Yes. I'm looking for headphones.","That's a little expensive.",'ถามว่าชอบสีไหน ให้เลือกสี','Which color ...? = ... สีอะไร'),
  TT("They are nine hundred baht.",'เก้าร้อยบาทครับ',"That's a little expensive.","I like the black ones.","Yes. I'm looking for headphones.",'ได้ราคาแล้ว ให้แสดงความเห็นเรื่องราคา','a little expensive = แพงนิดหน่อย')]),
 NPCDEF('som','Ms. Som','Food court⁣พนักงานฟู้ดคอร์ท',4,-6.3,0,[.95,.6,.2],[.2,.2,.25],[.08,.06,.07],'cap',[
  TT("What would you like to eat?",'จะทานอะไรดีคะ',"I'd like a bowl of noodles, please.","Fifty baht, please.","I'm fine, thank you.",'ถามว่าจะกินอะไร ให้สั่งอาหาร','a bowl of noodles = ก๋วยเตี๋ยวหนึ่งชาม'),
  TT("Chicken or pork?",'ไก่หรือหมูคะ',"Chicken, please.","I'd like a bowl of noodles, please.","I'm fine, thank you.",'ถามให้เลือกอย่างใดอย่างหนึ่ง','Chicken or pork? = ไก่หรือหมู'),
  TT("That will be fifty baht. Please take a number.",'ห้าสิบบาทค่ะ กรุณารับบัตรคิวด้วยค่ะ',"OK. Thank you.","Chicken, please.","I'd like a bowl of noodles, please.",'ให้รอบัตรคิว ให้ตอบรับ','take a number = รับบัตรคิว')]),
 NPCDEF('jack','Mr. Jack','Guard⁣รปภ.',.5,-4,0,[.2,.3,.5],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Excuse me. Where is the parking lot?",'ขอโทษครับ ที่จอดรถอยู่ที่ไหน',"Go out the main door and turn right.","Yes, it's about two minutes.","Thanks! Have a nice day.",'ถามทางไปที่จอดรถ ให้บอกทาง','Go out ... and turn right. = ออกไปแล้วเลี้ยวขวา'),
  TT("Is it far?",'ไกลไหม',"No, it's about two minutes.","Go out the main door and turn right.","Thanks! Have a nice day.",'ถามว่าไกลไหม ให้ตอบ','about two minutes = ประมาณสองนาที'),
  TT("Thanks! Have a nice day.",'ขอบคุณ ขอให้เป็นวันที่ดีนะ',"You too!","No, it's about two minutes.","Go out the main door and turn right.",'ได้รับคำอวยพร ให้อวยพรกลับ','You too! = คุณก็เช่นกัน')])]});
