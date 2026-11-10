/* ===== Gas Station ===== */
SCENES.push({id:'gas',name:'Gas Station',th:'ปั๊มน้ำมัน',color:'#EAB308',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.6,.62,.65]);
  c.box(0,.02,2,24,.04,.12,[1,1,1]);
  c.box(-8.5,1.0,-6.2,6,2,2.4,[.95,.92,.8],true);c.box(-8.5,2.15,-6.2,6.6,.3,3,[.85,.25,.2]);c.box(-8.5,1.2,-4.96,2.4,1.1,.06,WIN);c.box(-8.5,.95,-4.94,.9,1.9,.06,DOOR);
  c.counter(-8.5,-3.9,3.4,[.9,.8,.5]);
  c.box(0,3.4,-4.6,14,.5,.35,[.95,.85,.2]);c.box(0,3.1,-4.6,14.2,.14,.4,[.85,.25,.2]);
  for(const px of [-6,6]){c.box(px,1.7,-4,.35,3.4,.35,[.85,.85,.88],true);c.box(px,1.7,1,.35,3.4,.35,[.85,.85,.88],true);}
  for(const px of [-2.5,2.5]){c.box(px,.6,-1.5,.9,1.2,.7,[.85,.25,.2],true);c.box(px,1.0,-1.14,.6,.4,.06,[.2,.25,.3]);c.box(px+.55,.9,-1.5,.12,.12,.12,[.2,.2,.2]);}
  c.box(9.4,.3,3.5,1.0,.6,1.4,[.2,.2,.25],true);c.box(9.4,.8,3.5,.7,.5,.7,[.85,.85,.9]);
  c.box(-10.5,.45,2.6,.5,.9,.5,[.9,.4,.15],true);c.tree(11.4,-7.5);c.tree(11.4,6.5);c.tree(-11.4,6.5);c.lamp(-4,6.4);c.lamp(4,6.4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('attendant','Mr. Ton','Gas station attendant⁣พนักงานปั๊มน้ำมัน',-2.5,-3.0,Math.PI,[.85,.3,.2],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hello! How much gas do you need?",'สวัสดีครับ ต้องการเติมน้ำมันเท่าไรครับ',"Fill it up, please.",'Regular, please.','Yes, please. Thank you.','พนักงานถามว่าเติมเท่าไร ให้ตอบว่าเติมเต็มถัง','gas = น้ำมัน (อเมริกัน), Fill it up. = เติมให้เต็มถัง'),
  TT("Regular or premium?",'ธรรมดาหรือพรีเมียมครับ',"Regular, please.",'Fill it up, please.','Yes, please. Thank you.','ถามให้เลือกชนิดน้ำมัน','regular = ธรรมดา, premium = พรีเมียม'),
  TT("Do you want me to check the oil?",'ให้ผมเช็คน้ำมันเครื่องให้ไหมครับ',"Yes, please. Thank you.",'Regular, please.','Fill it up, please.','ถามว่าให้เช็คไหม (Do you want ...?) ตอบรับสุภาพ','check the oil = เช็คน้ำมันเครื่อง')]),
 NPCDEF('cashier','Ms. Lek','Cashier⁣แคชเชียร์',-8.5,-4.9,0,[.9,.7,.2],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Hi! Which pump number?",'สวัสดีค่ะ ตู้จ่ายหมายเลขอะไรคะ',"Pump number two.",'Here you are. Thank you.','No, thanks.','ถามหมายเลขตู้จ่าย ตอบเป็นตัวเลข','pump = ตู้จ่ายน้ำมัน'),
  TT("That's five hundred baht.",'ห้าร้อยบาทค่ะ',"Here you are. Thank you.",'Pump number two.','No, thanks.','ได้ราคาแล้ว ให้จ่ายเงินและขอบคุณ','Here you are. = นี่ค่ะ/ครับ'),
  TT("Do you need a receipt?",'ต้องการใบเสร็จไหมคะ',"No, thanks.",'Pump number two.','Here you are. Thank you.','ถามว่าต้องการใบเสร็จไหม (Do you ...?) ปฏิเสธสุภาพ','receipt = ใบเสร็จ')]),
 NPCDEF('driver','Mr. Dan','Driver⁣คนขับรถ',8.2,-.8,-Math.PI/2,[.3,.5,.75],[.25,.3,.5],[.1,.07,.05],'cap',[
  TT("Excuse me. Where is the restroom?",'ขอโทษครับ ห้องน้ำอยู่ที่ไหน',"It's next to the store.",'Yes, there is. It\'s down the road.','Thanks. You, too!','ถามที่ตั้งห้องน้ำ ตอบด้วย next to / behind','restroom = ห้องน้ำ (อเมริกัน), next to = ข้าง ๆ'),
  TT("Thanks! Is there a coffee shop near here?",'ขอบคุณ แถวนี้มีร้านกาแฟไหม',"Yes, there is. It's down the road.",'It\'s next to the store.','Thanks. You, too!','ถามว่ามีไหม (Is there ...?) ตอบ Yes, there is.','down the road = ไปตามถนน'),
  TT("Great! Have a safe trip.",'เยี่ยม ขอให้เดินทางปลอดภัยนะ',"Thanks. You, too!",'It\'s next to the store.','Yes, there is. It\'s down the road.','ได้รับคำอวยพร ให้ตอบ','Have a safe trip. = ขอให้เดินทางปลอดภัย')]),
 NPCDEF('friend','Pete','Friend⁣เพื่อน',3.5,3.4,Math.PI,[.3,.65,.45],[.25,.3,.5],[.1,.07,.05],'',[
  TT("Hi! My dad is filling the tank.",'สวัสดี พ่อฉันกำลังเติมน้ำมันอยู่',"OK. Let's wait over there.",'Yes, I\'d like some chips.','Cool! I love Ubon.','เพื่อนบอกว่าพ่อกำลังเติมน้ำมัน ให้ชวนไปรอ','tank = ถัง, fill = เติม'),
  TT("Do you want a snack from the store?",'เธออยากได้ขนมจากร้านไหม',"Yes, I'd like some chips.",'OK. Let\'s wait over there.','Cool! I love Ubon.','ถามว่าอยากได้ขนมไหม ตอบพร้อมบอกอย่างที่อยากได้','chips = มันฝรั่งทอดกรอบ (อเมริกัน)'),
  TT("We're going to Ubon next.",'ต่อไปเรากำลังจะไปอุบลฯ',"Cool! I love Ubon.",'OK. Let\'s wait over there.','Yes, I\'d like some chips.','เพื่อนบอกว่าจะไปอุบล ให้ตอบอย่างสนใจ','We\'re going to ... = เรากำลังจะไป ...')])]});

