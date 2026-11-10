SCENES.push({id:'airport',name:'Airport',th:'สนามบิน',color:'#0284C7',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.82,.85,.9]);shell(c,[.9,.93,.97],[.2,.4,.7],false);
  c.box(0,3.6,-6.14,8,.9,.06,[.2,.4,.7]);for(const x of [-8,-3,3,8])c.box(x,2.2,-6.16,2.4,2.2,.06,WIN);
  c.counter(-6,-5.4,4,[.5,.7,.9]);c.counter(9,-5.4,3,[.5,.7,.9]);
  c.box(1.5,1.1,-3.2,.2,2.2,.3,[.4,.4,.45],true);c.box(3.5,1.1,-3.2,.2,2.2,.3,[.4,.4,.45],true);c.box(2.5,2.25,-3.2,2.4,.2,.3,[.4,.4,.45]);c.box(2.5,.4,-3.2,1.8,.8,.5,[.2,.2,.25]);
  c.box(0,1.0,-6.6,.1,2,.1,[.3,.3,.35]);c.box(-1.4,2.0,-6.1,.7,.5,.06,[.15,.4,.7]);
  c.box(9.5,1.6,2.5,3.2,2.8,9,[.97,.97,.97],true);c.box(9.5,1.7,-2.3,1.4,1.4,1.2,[.97,.97,.97]);c.box(9.5,1.6,2.5,9,.15,2,[.7,.75,.85]);c.box(9.5,1.9,6.9,.3,2.6,1.4,[.2,.4,.7]);
  c.bench(-8,2);c.bench(-3,4.5);c.lamp(-4,5);c.tree(-11.4,-7);c.tree(-11.4,6.5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('pang','Ms. Pang','Check-in agent⁣เจ้าหน้าที่เช็กอิน',-6,-6.3,0,[.2,.4,.7],[.15,.15,.2],[.08,.06,.07],'bun',[
  TT("Good morning. May I see your passport and ticket?",'สวัสดีตอนเช้าค่ะ ขอดูหนังสือเดินทางและตั๋วหน่อยค่ะ',"Sure. Here you are.","Just one suitcase.","Gate 4, ten thirty. Thank you!",'เจ้าหน้าที่ขอดูเอกสาร ให้ยื่นให้','May I see ...? = ขอดู ... ได้ไหม'),
  TT("How many bags do you have?",'มีกระเป๋ากี่ใบคะ',"Just one suitcase.","Sure. Here you are.","Yes, I have one.",'ถามจำนวนกระเป๋า ให้ตอบ','suitcase = กระเป๋าเดินทาง'),
  TT("Here is your boarding pass. Gate 4, boarding at ten thirty.",'นี่บัตรขึ้นเครื่องค่ะ ประตู 4 ขึ้นเครื่องสิบโมงครึ่ง',"Gate 4, ten thirty. Thank you!","Just one suitcase.","Sure. Here you are.",'ได้ข้อมูลประตูและเวลา ให้ทวนและขอบคุณ','boarding pass = บัตรขึ้นเครื่อง, gate = ประตูขึ้นเครื่อง')]),
 NPCDEF('sak','Mr. Sak','Security officer⁣เจ้าหน้าที่ตรวจความปลอดภัย',2.5,-2.4,0,[.2,.2,.3],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Please put your bag on the belt.",'กรุณาวางกระเป๋าบนสายพานครับ',"OK. Here you go.","Thank you, officer.","Yes, I do. It's in my backpack.",'เจ้าหน้าที่บอกให้วางกระเป๋า ให้ตอบรับ','belt = สายพาน'),
  TT("Do you have a laptop in your bag?",'มีแล็ปท็อปในกระเป๋าไหมครับ',"Yes, I do. It's in my backpack.","OK. Here you go.","Just one suitcase.",'ถามว่ามีแล็ปท็อปไหม (Do you have ...?) ตอบ Yes, I do.','backpack = เป้สะพายหลัง'),
  TT("OK. Please walk through.",'ได้ครับ เดินผ่านเข้าไปได้เลยครับ',"Thank you, officer.","Yes, I do. It's in my backpack.","OK. Here you go.",'ให้เดินผ่าน ให้ขอบคุณ','Please walk through. = เชิญเดินผ่าน')]),
 NPCDEF('wan','Ms. Wan','Gate agent⁣เจ้าหน้าที่ประตูขึ้นเครื่อง',-1,-3.5,0,[.2,.55,.75],[.15,.15,.2],[.08,.06,.07],'long',[
  TT("Hello. May I see your boarding pass?",'สวัสดีค่ะ ขอดูบัตรขึ้นเครื่องหน่อยค่ะ',"Sure. Here it is.","Yes, it is on time.","OK. Is the flight on time?",'ให้ยื่นบัตรขึ้นเครื่อง','Here it is. = นี่ครับ/ค่ะ'),
  TT("Boarding starts in twenty minutes. Please wait here.",'เริ่มขึ้นเครื่องในอีกยี่สิบนาที กรุณารอที่นี่ค่ะ',"OK. Is the flight on time?","Sure. Here it is.","Gate 4, ten thirty. Thank you!",'ให้รอ ให้ตอบรับและถามว่าเที่ยวบินตรงเวลาไหม','on time = ตรงเวลา, flight = เที่ยวบิน'),
  TT("Yes, it is on time.",'ตรงเวลาค่ะ',"Great. Thank you!","OK. Is the flight on time?","Sure. Here it is.",'ได้คำตอบแล้ว ให้ขอบคุณ','Great. Thank you! = ดีเลย ขอบคุณ')]),
 NPCDEF('lisa','Lisa','Traveler⁣นักเดินทาง',-8,.4,Math.PI/2,[.9,.4,.4],[.25,.3,.5],[.5,.35,.15],'long',[
  TT("Excuse me. Where is Gate 4?",'ขอโทษค่ะ ประตู 4 อยู่ที่ไหนคะ',"It's over there. Go straight.","Thanks. You too!","Yes, it is.",'ถามทางไปประตู 4 ให้บอกทาง','Go straight. = เดินตรงไป'),
  TT("Thank you! Is your flight to Bangkok too?",'ขอบคุณค่ะ เที่ยวบินของคุณไปกรุงเทพด้วยไหมคะ',"Yes, it is.","It's over there. Go straight.","Just one suitcase.",'ถามว่าไปกรุงเทพไหม (Is ...?) ตอบ Yes, it is.','Is your flight ...? ตอบ Yes, it is.'),
  TT("Nice! Have a good flight!",'ดีจัง! เดินทางโดยสวัสดิภาพนะคะ',"Thanks. You too!","Yes, it is.","It's over there. Go straight.",'ได้รับคำอวยพร ให้ขอบคุณและอวยพรกลับ','Have a good flight! = เดินทางโดยสวัสดิภาพ')])]});
