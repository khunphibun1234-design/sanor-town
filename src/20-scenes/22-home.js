/* ===== Home ===== */
SCENES.push({id:'home',name:'Home',th:'บ้าน',color:'#E11D48',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.82,.68,.5]);shell(c,[1,.93,.82],[.7,.3,.25],true);
  c.box(0,1.0,-6.18,1.4,2,.06,DOOR);c.box(-6.5,2.3,-6.1,2.2,1.4,.1,WIN);c.box(6.5,2.3,-6.1,2.2,1.4,.1,WIN);
  c.counter(8,-5.2,4,[.85,.85,.9]);c.box(8,1.6,-5.3,.9,.5,.6,[.9,.6,.2]);
  c.box(-6,.5,-5.2,3.4,1.0,1.4,[.3,.5,.75],true);c.box(-6,1.1,-5.8,3.4,.9,.3,[.25,.45,.7]);
  c.table(-7,-1.2);c.box(-7,1.2,-1.2,1.0,.1,.7,[.2,.2,.25]);
  c.box(3.6,.45,1.6,.8,.9,2.2,[.6,.4,.25],true);c.box(3.6,1.4,1.6,.2,.8,1.6,[.3,.3,.35]);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('mom','Mom','Mother⁣คุณแม่',8,-6.2,0,[.85,.35,.45],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Welcome home! Are you hungry?",'กลับมาแล้วเหรอ หิวไหมลูก',"Yes, I am. What's for dinner?","We're having rice and soup.","Yes, I do. I'm hungry.",'แม่ถามว่าหิวไหม (Are you ...?) ตอบ Yes, I am.','hungry = หิว, What\'s for dinner? = มื้อเย็นกินอะไร'),
  TT("We're having rice and soup.",'เรามีข้าวกับแกงจืดนะ',"Great! I love soup.","Yes, I am. What's for dinner?","Sure. I'll do it now.",'แม่บอกเมนู ให้ตอบรับอย่างดีใจ','We\'re having ... = เรามี/จะกิน ...'),
  TT("Can you set the table, please?",'ช่วยจัดโต๊ะอาหารหน่อยได้ไหม',"Sure. I'll do it now.","Great! I love soup.","Yes, I am. I'm hungry.",'แม่ขอให้ช่วยงานบ้าน ให้ตอบรับ','set the table = จัดโต๊ะอาหาร')]),
 NPCDEF('sis','Mint','Older sister⁣พี่สาว',-9.2,-.2,Math.PI/2,[.9,.5,.7],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Where is my phone?",'ฮัลโหล โทรศัพท์พี่อยู่ที่ไหน',"It's on the sofa.","Yes, I have a phone.","Sure. It's in my bedroom.",'พี่ถามว่าของอยู่ที่ไหน ตอบด้วย on / in / under','sofa = โซฟา, on the sofa = บนโซฟา'),
  TT("Thanks! Is your room clean?",'ขอบคุณนะ ห้องเธอสะอาดไหม',"Yes, it is. I cleaned it today.","It's on the sofa.","Yes, I do. I clean it today.",'ถามว่าสะอาดไหม (Is ...?) ตอบ Yes, it is.','clean = สะอาด/ทำความสะอาด'),
  TT("Can I borrow your charger?",'ขอยืมที่ชาร์จหน่อยได้ไหม',"Sure. It's in my bedroom.","Yes, it is. I cleaned it today.","It's on the sofa.",'พี่ขอยืมของ ให้ตอบรับและบอกที่อยู่','charger = ที่ชาร์จ, bedroom = ห้องนอน')]),
 NPCDEF('grandma','Grandma','Grandmother⁣คุณยาย',3.6,-.4,Math.PI,[.55,.5,.7],[.3,.25,.3],[.75,.75,.75],'bun',[
  TT("Hello, dear. How was school today?",'สวัสดีหลาน วันนี้ที่โรงเรียนเป็นอย่างไรบ้าง',"It was good. I learned a lot.","Yes, I did. I finished it.","I'm fine, thank you.",'ยายถามว่าวันนี้เป็นอย่างไร (How was ...?) ตอบด้วย It was ...','How was ...? = ... เป็นอย่างไรบ้าง'),
  TT("Did you do your homework?",'ทำการบ้านแล้วหรือยัง',"Yes, I did. I finished it.","It was good. I learned a lot.","OK, Grandma. I'll do it now.",'ยายถามว่าทำแล้วไหม (Did you ...?) ตอบ Yes, I did.','finish = ทำเสร็จ'),
  TT("Please wash your hands before dinner.",'ไปล้างมือก่อนกินข้าวนะ',"OK, Grandma. I'll do it now.","Yes, I did. I finished it.","It was good. I learned a lot.",'ยายขอให้ล้างมือ ให้ตอบรับ','wash your hands = ล้างมือ')]),
 NPCDEF('neighbor','Mr. Boon','Neighbor⁣เพื่อนบ้าน',-6,3.4,0,[.3,.55,.4],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Good evening! Is your mother home?",'สวัสดีตอนเย็น คุณแม่อยู่บ้านไหม',"Yes, she is. She's in the kitchen.","Yes, I am. She's in the kitchen.","Thank you very much!",'ถามว่าแม่อยู่บ้านไหม (Is ...?) ตอบ Yes, she is.','kitchen = ห้องครัว, in the kitchen = ในครัว'),
  TT("Please give her these mangoes.",'ฝากมะม่วงให้แม่ด้วยนะ',"Thank you very much!","Yes, she is. She's in the kitchen.","You, too. Goodbye!",'เพื่อนบ้านฝากของ ให้ขอบคุณ','Please give her ... = ฝากให้เธอ ...'),
  TT("Have a nice evening!",'ขอให้เป็นช่วงเย็นที่ดีนะ',"You, too. Goodbye!","Yes, she is. She's in the kitchen.","Please give her these mangoes.",'เพื่อนบ้านอวยพร ให้ตอบ You, too.','You, too. = คุณเช่นกัน')])]});

