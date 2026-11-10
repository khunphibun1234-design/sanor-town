/* 4 Bus station */
SCENES.push({id:'bus',name:'Bus Station',th:'สถานีรถบัส',color:'#0F7B5F',spawn:[0,2.6,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.74,.74,.76]);
  c.box(0,.03,7.2,26,.05,3.2,[.35,.36,.4]);for(let x=-11;x<=11;x+=2.6)c.box(x,.06,7.2,1.2,.02,.16,[.95,.9,.5]);
  c.box(-6,1.2,-7,4.4,2.4,2.4,[.9,.9,.95],true);c.box(-6,2.55,-6.7,4.8,.2,3,[.2,.5,.8]);c.box(-6,1.5,-5.78,2,.8,.06,WIN);c.box(-6,2.2,-5.74,2,.3,.06,[1,.85,.2]);
  c.box(0,1.2,-6.2,.16,2.4,.16,[.4,.4,.45],true);c.box(0,2.1,-6.2,2.4,1.1,.12,[.15,.4,.7],true);c.box(-.7,2.1,-6.12,.2,.7,.04,[1,1,1]);c.box(.3,2.1,-6.12,.8,.2,.04,[1,1,1]);
  c.box(8.3,1.3,-.5,3.4,2.2,9,[.98,.7,.1],true);c.box(8.3,2.45,-.5,3.5,.15,9.1,[.9,.35,.1]);
  for(const z of [-3.5,-1.5,.5,2.5])c.box(6.58,1.7,z,.06,.8,1.2,WIN);
  c.box(8.3,1.5,-5.03,3,1,.06,WIN);for(const z of [-3,2.2])c.box(6.65,.4,z,.3,.8,.8,[.1,.1,.1]);
  c.bench(-3,5);c.box(-3,2.6,5,4,.12,2.2,[.2,.5,.8]);for(const x of [-4.8,-1.2])c.box(x,1.3,5.8,.12,2.6,.12,[.4,.4,.45]);
  c.bench(2.5,5);c.tree(-11.4,-2);c.tree(11.4,-8);c.lamp(-9,0);c.lamp(3,-1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 {id:'ploy',name:'Ms. Ploy',role:'Ticket seller⁣พนักงานขายตั๋ว',x:-6,z:-4.4,ry:0,shirt:[.2,.5,.8],pants:[.2,.2,.3],hair:[.08,.06,.07],acc:'bun',turns:[
  TT("Hello! Where are you going?",'สวัสดีค่ะ จะไปไหนคะ',"A ticket to Ubon Ratchathani, please.","Round trip, please.","Two hundred baht, please.",'ถามว่าจะไปไหน ให้ขอซื้อตั๋วไปที่นั่น','A ticket to ..., please. = ขอตั๋วไป ... ครับ/ค่ะ'),
  TT("One way or round trip?",'เที่ยวเดียวหรือไปกลับคะ',"Round trip, please.","A ticket to Ubon Ratchathani, please.","Two tickets, please.",'ถามว่าเที่ยวเดียวหรือไปกลับ ให้เลือก','one way = เที่ยวเดียว, round trip = ไปกลับ'),
  TT("That is two hundred baht.",'สองร้อยบาทค่ะ',"Here you are. Thank you.","Round trip, please.","How much is it?",'พนักงานบอกราคา ให้จ่ายเงินและขอบคุณ','Here you are. = นี่ครับ/ค่ะ ใช้ตอนยื่นเงินหรือของ')]},
 {id:'wat',name:'Mr. Wat',role:'Information desk⁣เจ้าหน้าที่ประชาสัมพันธ์',x:0,z:-4.6,ry:0,shirt:[.95,.95,.9],pants:[.25,.25,.35],hair:[.4,.4,.42],acc:'',turns:[
  TT("Hello. Can I help you?",'สวัสดีครับ ให้ช่วยอะไรไหมครับ',"What time does the bus leave?","I'm fine, thank you.","It leaves at nine thirty.",'เจ้าหน้าที่ถามว่าให้ช่วยไหม ให้ถามเวลารถออก','What time does ... leave? = ... ออกกี่โมง'),
  TT("It leaves at nine thirty.",'ออกเก้าโมงครึ่งครับ',"Thank you. Which platform is it?","What time does the bus leave?","Platform two, please.",'ได้เวลาแล้ว ให้ขอบคุณและถามชานชาลา','platform = ชานชาลา'),
  TT("Platform two. Go straight, then turn right.",'ชานชาลาที่สอง เดินตรงไปแล้วเลี้ยวขวาครับ',"Platform two. Thanks for your help!","Which platform is it?","Turn left. Thanks for your help!",'ได้เส้นทางแล้ว ให้ทวนและขอบคุณ','Thanks for your help! = ขอบคุณที่ช่วย')]},
 {id:'chok',name:'Mr. Chok',role:'Bus driver⁣คนขับรถ',x:5.2,z:-3.6,ry:Math.PI/2,shirt:[.2,.35,.55],pants:[.2,.2,.25],hair:[.1,.08,.08],acc:'cap',turns:[
  TT("Good morning! Where are you going?",'อรุณสวัสดิ์ จะไปไหนครับ',"Does this bus go to the market?","Here is my ticket.","Yes, it does.",'คนขับถามว่าจะไปไหน ให้ถามว่ารถคันนี้ไปตลาดไหม','Does this bus go to ...? = รถคันนี้ไป ... ไหม'),
  TT("Yes, it does. Show me your ticket, please.",'ไปครับ ขอดูตั๋วหน่อยครับ',"Here is my ticket.","Does this bus go to the market?","A ticket to Ubon Ratchathani, please.",'คนขับขอดูตั๋ว ให้ยื่นตั๋ว','Here is my ticket. = นี่ตั๋วของฉัน'),
  TT("Sit down, please. We leave in five minutes.",'นั่งก่อนนะครับ อีกห้านาทีออกรถ',"OK. Thank you!","Here is my ticket.","Yes, it does. Thank you!",'คนขับบอกให้นั่ง ให้ตอบรับและขอบคุณ','in five minutes = ในอีกห้านาที')]},
 {id:'kim',name:'Kim',role:'Passenger⁣ผู้โดยสาร',x:-3,z:3.5,ry:0,shirt:[.95,.75,.2],pants:[.25,.25,.4],hair:[.1,.07,.05],acc:'long',turns:[
  TT("Excuse me. Do you know the time?",'ขอโทษค่ะ รู้ไหมคะว่ากี่โมงแล้ว',"Yes. It's ten fifteen.","Yes. It's Monday.","No, I come here every week.",'ถามเวลา ให้บอกเวลา','It\'s ten fifteen. = สิบนาฬิกาสิบห้านาที'),
  TT("Thanks! Is this your first time here?",'ขอบคุณค่ะ มาที่นี่ครั้งแรกเหรอ',"No, I come here every week.","Yes. It's ten fifteen.","Thanks. You too!",'ถามว่ามาครั้งแรกไหม ให้ตอบ','every week = ทุกสัปดาห์'),
  TT("Nice. Have a safe trip!",'ดีจัง เดินทางปลอดภัยนะ',"Thanks. You too!","No, I come here every week.","Does this bus go to the market?",'ได้รับคำอวยพร ให้ขอบคุณและอวยพรกลับ','Have a safe trip! = เดินทางปลอดภัย')]}]});
