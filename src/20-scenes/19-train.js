/* ===== Train Station ===== */
SCENES.push({id:'train',name:'Train Station',th:'สถานีรถไฟ',color:'#4F46E5',spawn:[0,3.4,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.78,.78,.8]);
  c.box(0,.02,-3.9,26,.04,.18,[.95,.8,.15]);
  c.box(7.5,.12,-7.0,13,.12,.14,[.35,.35,.4]);c.box(7.5,.12,-8.5,13,.12,.14,[.35,.35,.4]);for(let x=1.5;x<=13.5;x+=.9)c.box(x,.06,-7.75,.3,.08,1.9,[.4,.3,.2]);
  c.box(7.5,1.5,-7.75,11,2.5,2.2,[.2,.4,.7],true);c.box(7.5,.9,-6.62,11,.3,.06,[.95,.6,.15]);
  for(let x=2.5;x<=12.5;x+=1.8)c.box(x,1.9,-6.63,1.1,.9,.06,[.6,.85,.95]);c.box(7.5,2.8,-7.75,11.2,.2,2.4,[.85,.85,.9]);c.box(2.0,1.2,-6.63,.9,2.0,.06,[.2,.25,.5]);
  c.box(-8,2,-8.2,8.4,4,2.6,[.92,.86,.7],true);c.box(-8,4.15,-8.2,9,.3,3.2,[.65,.25,.2]);c.box(-8,1.4,-6.86,2,1.2,.06,WIN);c.box(-8,3.0,-6.86,.9,.9,.06,[1,1,1]);c.box(-8,3.0,-6.82,.08,.6,.04,[.1,.1,.1]);
  c.counter(-6,-5.4,4,[.5,.7,.9]);
  c.box(0,1.2,-6.2,.16,2.4,.16,[.4,.4,.45],true);c.box(0,2.1,-6.2,2.4,1.1,.12,[.15,.3,.55],true);c.box(0,2.1,-6.12,1.6,.2,.04,[1,1,1]);
  c.bench(-9,2);c.bench(3,5.2);c.box(-1.4,.9,2.0,.12,1.8,.12,[.4,.4,.45]);c.box(-1.4,1.9,2.0,1.1,.5,.1,[.95,.85,.3]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,3.9);c.lamp(4,3.9);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('lamyai','Ms. Lamyai','Ticket seller⁣พนักงานขายตั๋ว',-6,-6.3,0,[.3,.4,.8],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! Where would you like to go?",'สวัสดีค่ะ จะไปไหนคะ',"A ticket to Bangkok, please.","Second class, please.","Seven hundred baht, please.",'ถามว่าจะไปไหน ให้ขอซื้อตั๋วไปที่นั่น','A ticket to ..., please. = ขอตั๋วไป ... ค่ะ/ครับ'),
  TT("Second class or third class?",'ชั้นสองหรือชั้นสามคะ',"Second class, please.","A ticket to Bangkok, please.","Yes, second class.",'ถามให้เลือกชั้นที่นั่ง','class = ชั้น (ที่นั่ง), second = ที่สอง'),
  TT("That's seven hundred baht.",'เจ็ดร้อยบาทค่ะ',"Here you are. Thank you.","Second class, please.","A ticket to Bangkok, please.",'ได้ราคาแล้ว ให้จ่ายเงินและขอบคุณ','Here you are. = นี่ค่ะ/ครับ')]),
 NPCDEF('somsak','Mr. Somsak','Station staff⁣เจ้าหน้าที่สถานี',0,-4.6,0,[.15,.3,.55],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hello. Can I help you?",'สวัสดีครับ ให้ช่วยอะไรไหมครับ',"Yes. What time does the train leave?","I'm fine, thank you.","It leaves at eight fifteen.",'เจ้าหน้าที่ถามว่าให้ช่วยไหม ให้ถามเวลารถไฟออก','What time does ... leave? = ... ออกกี่โมง'),
  TT("It leaves at eight fifteen from Platform three.",'ออกแปดโมงสิบห้านาที จากชานชาลาที่สามครับ',"Thank you. Is the train on time?","What time does the train leave?","Platform three, please.",'ได้เวลาแล้ว ให้ขอบคุณและถามว่าตรงเวลาไหม','platform = ชานชาลา, on time = ตรงเวลา'),
  TT("Yes. Please wait behind the yellow line.",'ตรงเวลาครับ กรุณารอหลังเส้นสีเหลืองนะครับ',"OK. I'll wait here.","Is the train on time?","Sure. Here you are.",'ถูกขอให้รอหลังเส้น ให้ตอบรับ','behind the yellow line = หลังเส้นสีเหลือง')]),
 NPCDEF('prasert','Mr. Prasert','Conductor⁣พนักงานตรวจตั๋ว',4.6,-5.0,0,[.2,.3,.5],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Good morning! May I see your ticket, please?",'สวัสดีตอนเช้าครับ ขอดูตั๋วหน่อยครับ',"Sure. Here you are.","Car five, seat twelve. Thank you.","OK. Thanks for your help.",'พนักงานขอดูตั๋ว ให้ยื่นให้','May I see ...? = ขอดู ... ได้ไหม'),
  TT("Your seat is in car five, seat twelve.",'ที่นั่งของคุณอยู่ตู้ห้า เลขที่นั่งสิบสองครับ',"Car five, seat twelve. Thank you.","Sure. Here you are.","Yes, it is.",'ได้เลขที่นั่งแล้ว ให้ทวนและขอบคุณ','car = ตู้โดยสาร, seat = ที่นั่ง'),
  TT("Please put your bag on the shelf above your seat.",'กรุณาวางกระเป๋าบนชั้นเหนือที่นั่งนะครับ',"OK. Thanks for your help.","Sure. Here you are.","Car five, seat twelve. Thank you.",'ถูกขอให้วางกระเป๋า ให้ตอบรับและขอบคุณ','shelf = ชั้นวางของ')]),
 NPCDEF('lee','Lee','Passenger⁣ผู้โดยสาร',-8.4,.6,Math.PI/2,[.9,.6,.2],[.25,.3,.5],[.5,.35,.15],'cap',[
  TT("Excuse me. Is this the train to Bangkok?",'ขอโทษนะ ขบวนนี้ไปกรุงเทพไหม',"Yes, it is.","Yes, I take it every month.","A ticket to Bangkok, please.",'ถามว่าใช่ขบวนไปกรุงเทพไหม (Is ...?) ตอบ Yes, it is.','Is this the train to ...? = นี่คือขบวนไป ... ใช่ไหม'),
  TT("Thanks! Do you take the train often?",'ขอบคุณ เธอนั่งรถไฟบ่อยไหม',"Yes, I take it every month.","Yes, it is.","Yes, there is.",'ถามว่านั่งบ่อยไหม (Do you ...?) ตอบ Yes, I do.','every month = ทุกเดือน, often = บ่อย'),
  TT("Is there a restroom on the train?",'บนรถไฟมีห้องน้ำไหม',"Yes, there is. It's at the end of the car.","Yes, it is.","Yes, I take it every month.",'ถามว่ามีห้องน้ำไหม (Is there ...?) ตอบ Yes, there is.','restroom = ห้องน้ำ (อเมริกัน), at the end of = ที่ปลาย')])]});
