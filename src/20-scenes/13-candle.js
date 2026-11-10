/* ===== Ubon: Candle Festival ===== */
SCENES.push({id:'candle',name:'Candle Festival',th:'งานแห่เทียนพรรษา',color:'#B45309',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.62,.62,.66]);
  c.box(0,.03,.5,26,.05,7,[.45,.46,.5]);for(let x=-11;x<=11;x+=2.6)c.box(x,.06,.5,1.2,.02,.16,[.95,.9,.5]);
  const cand=(x,z,w,h)=>{c.box(x,.6,z,w,1.2,3.4,[.85,.3,.2],true);c.box(x,.25,z+1.8,w+.4,.3,.3,[.2,.2,.2]);c.box(x,1.3,z,w-.4,.2,3,[.95,.75,.2]);
   c.box(x,h/2+1.2,z,1.5,h,1.5,[.98,.93,.75]);c.box(x,h/2+1.2,z+.8,1.1,h-.6,.2,[.95,.75,.2]);c.box(x-.9,2.2,z+.5,.6,1.3,.6,[.95,.75,.2]);c.box(x+.9,2.5,z+.5,.6,1.9,.6,[.9,.6,.15]);
   c.box(x,h+1.5,z,.18,.7,.18,[.3,.2,.1]);tPyr(c.a,x,h+2.1,z,.45,.7,.45,[1,.6,.1])};
  cand(-5.5,-7,8,4.2);cand(7,-7.4,6,3.2);
  for(let x=-11;x<=11;x+=1.6){c.box(x,.5,4.6,.1,1,.1,[.85,.2,.2]);c.box(x,.9,4.6,1.5,.08,.06,[1,1,1])}
  for(let x=-11;x<=11;x+=2)c.box(x,3.4,2.6,.5,.4,.06,[[.9,.2,.2],[.95,.75,.2],[.2,.6,.8],[.3,.7,.4]][((x+11)/2|0)%4]);
  c.box(-2.4,.25,-4,1.2,.5,1.2,[.7,.5,.3],true);
  c.tree(-11.4,-4);c.tree(11.4,-4.5);c.tree(-11.4,7);c.tree(11.4,7);c.lamp(-9,3.6);c.lamp(9,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('buakaew','Ms. Buakaew','Parade dancer⁣นางรำในขบวนแห่',2.2,-2.8,0,[.95,.75,.2],[.7,.15,.2],[.08,.06,.07],'bun',[
  TT("Hi! I'm a dancer in the parade today.",'สวัสดีค่ะ วันนี้ฉันเป็นนางรำในขบวนแห่ค่ะ',"Wow! Your costume is beautiful.","I'm fine, thank you. And you?","Thank you! Enjoy the festival!",'เจอนางรำ ให้ชมชุดแสดง','Your ... is beautiful. = ... ของคุณสวยมาก, costume = ชุดแสดง'),
  TT("Thank you! We dance in the day parade and the night parade.",'ขอบคุณค่ะ เรารำทั้งขบวนกลางวันและกลางคืน',"Great! I'll watch both.","Thank you! Enjoy the festival!","Yes, I dance too.",'ได้ยินว่ามีขบวนกลางวันและกลางคืน ให้บอกว่าจะดูทั้งสอง','day parade = ขบวนภาคกลางวัน, night parade = ขบวนภาคกลางคืน'),
  TT("Thank you! Enjoy the festival!",'ขอบคุณค่ะ ขอให้สนุกกับงานนะคะ',"Thanks! Good luck!","Wow! Your costume is beautiful.","How long does it take?",'ได้รับคำอวยพร ให้ขอบคุณและอวยพรกลับ','Good luck! = โชคดี')]),
 NPCDEF('somporn','Mr. Somporn','Wax carver⁣ช่างแกะสลักเทียน',-5.5,-4.6,0,[.85,.6,.3],[.3,.3,.35],[.15,.12,.1],'hat',[
  TT("This giant candle is made of wax.",'เทียนต้นใหญ่นี้ทำจากขี้ผึ้งครับ',"Wow! It's so big!","Wow! It's so small!","Thank you! Enjoy the festival!",'เห็นเทียนต้นใหญ่ ให้แสดงความทึ่ง','wax = ขี้ผึ้ง, giant = ใหญ่มาก'),
  TT("We carve the wax many weeks before the festival.",'เราแกะสลักขี้ผึ้งหลายสัปดาห์ก่อนงานครับ',"How long does it take?","Wow! It's so big!","Yes, I carve it every week.",'ได้ยินว่าแกะนาน ให้ถามว่าใช้เวลานานแค่ไหน','How long does it take? = ใช้เวลานานเท่าไร, carve = แกะสลัก'),
  TT("Sometimes weeks, sometimes months.",'บางต้นหลายสัปดาห์ บางต้นหลายเดือนครับ',"That's amazing! You work very hard.","How long does it take?","Wow! It's so big!",'ได้ฟังแล้ว ให้ชื่นชมช่าง','You work very hard. = คุณทำงานหนักมาก')]),
 NPCDEF('wipa','Ms. Wipa','Festival guide⁣ไกด์อาสางานแห่เทียน',-1,-1.2,0,[.2,.5,.7],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("Welcome to the Candle Festival! Do you know about it?",'ยินดีต้อนรับสู่งานแห่เทียนค่ะ รู้จักงานนี้ไหมคะ',"A little. It's in Ubon Ratchathani.","Welcome to the Candle Festival!","Yes, I'd like a candle, please.",'ถามว่ารู้จักงานไหม ให้ตอบว่ารู้นิดหน่อย','A little. = นิดหน่อย'),
  TT("The candles show stories from the life of the Buddha.",'เทียนแสดงเรื่องราวจากพุทธประวัติค่ะ',"That's interesting. Who makes the candles?","Wow! It's so big!","I'm fine, thank you.",'ได้ฟังเรื่องราวบนเทียน ให้ถามว่าใครทำเทียน','Who makes ...? = ใครทำ ...'),
  TT("Temples, districts, and many groups make them.",'วัด อำเภอ และหน่วยงานต่างๆ ช่วยกันทำค่ะ',"I see. Thank you for telling me!","Who makes the candles?","A little. It's in Ubon Ratchathani.",'ได้คำตอบแล้ว ให้ขอบคุณ','temple = วัด, district = อำเภอ')]),
 NPCDEF('dave','Dave','Visitor⁣นักท่องเที่ยว',8.4,1.0,-Math.PI/2,[.4,.65,.9],[.3,.3,.4],[.5,.35,.15],'cap',[
  TT("Hi! This is amazing. Is it your first time here?",'หวัดดี ตื่นตาตื่นใจมาก เธอมาที่นี่ครั้งแรกไหม',"No, I come every year with my family.","Yes, I do. I come every year.","No, it's around Asalha Bucha Day.",'ถามว่าครั้งแรกไหม (Is it ...?) ตอบ No, ...','every year = ทุกปี'),
  TT("Nice! When is the festival?",'ดีจัง! งานจัดเมื่อไร',"It's around Asalha Bucha Day.","No, I come every year.","It's in Ubon Ratchathani.",'ถามว่างานจัดเมื่อไร ให้บอกช่วงวันสำคัญทางศาสนา','Asalha Bucha Day = วันอาสาฬหบูชา (Khao Phansa = วันเข้าพรรษา)'),
  TT("Wow! I want to come again. Thanks!",'ว้าว! ฉันอยากมาอีก ขอบคุณนะ',"You're welcome. Come again!","Welcome to the Candle Festival!","No, I come every year.",'ได้รับคำขอบคุณ ให้ตอบและเชิญมาอีก','You\'re welcome. = ยินดี')])]});
