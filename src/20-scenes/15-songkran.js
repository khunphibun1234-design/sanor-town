/* ===== Ubon: Songkran at Kaeng Saphue ===== */
SCENES.push({id:'songkran',name:'Songkran Kaeng Saphue',th:'สงกรานต์แก่งสะพือ',color:'#0891B2',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.9,.82,.6]);
  c.box(0,-.02,-6.5,28,.12,5.6,[.35,.7,.85]);c.ob.push([-14,14,-9.6,-3.6]);
  [[-9,-5,2.4,1.2],[-5.5,-7.5,3,1.6],[-2,-5.2,2,1.1],[1.5,-7,3.2,1.5],[5,-5.4,2.4,1.3],[8.5,-7.4,3,1.5],[-8,-8.2,2,1],[3,-8.4,2,1.1]].forEach(([x,z,w,h])=>{c.box(x,h/2-.1,z,w,h,w*.7,[.52,.5,.5]);c.box(x+.2,h-.1,z,w*.6,.2,w*.5,[.62,.6,.58])});
  c.box(-8,.5,-1,5.6,1,5.2,[.8,.7,.55],true);c.box(-8,1.1,-1,4.6,.2,4.2,[.85,.78,.65]);
  for(const [x,z] of [[-9.8,-2.6],[-6.2,-2.6],[-9.8,.6],[-6.2,.6]])c.box(x,2.0,z,.2,1.8,.2,[.9,.85,.7]);
  c.box(-8,3.0,-1,5,.2,4.6,[.7,.25,.2]);tPyr(c.a,-8,3.1,-1,5.4,1.3,5,[.7,.25,.2]);
  c.box(3.5,.8,-2.5,2,1.6,1.4,[.75,.6,.45],true);c.box(3.5,1.0,-1.78,1.1,.5,.05,[.95,.8,.2]);
  for(const x of [2.2,4.8])c.box(x,.35,-1.5,.12,.7,.12,[.9,.9,.9]);c.box(3.5,.6,-1.5,2.6,.08,.08,[.9,.9,.9]);
  c.box(7.5,.45,.6,2.4,.9,1.2,[.2,.6,.9],true);[[.95,.8,.2],[.9,.3,.5],[.95,.95,.95]].forEach((col,i)=>c.box(6.7+i*.8,1.05,.6,.5,.25,.5,col));
  for(let x=-11;x<=11;x+=1.4)c.box(x,3.3,-2.6,.4,.3,.05,[[.9,.3,.5],[.95,.8,.2],[.2,.7,.9],[.5,.8,.3]][((x+11)/1.4|0)%4]);
  c.tree(-11.4,5.5);c.tree(11.4,5.5);c.tree(-5,7.5);c.tree(6,7.5);c.lamp(-3,3.6);c.lamp(5,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('sai','Grandma Sai','Elder⁣คุณยาย',8.8,-1.2,-Math.PI/2,[.9,.4,.6],[.3,.25,.35],[.8,.8,.82],'bun',[
  TT("Happy Songkran! Come and pour water on my hands.",'สุขสันต์วันสงกรานต์ มารดน้ำที่มือยายสิ',"Happy Songkran, Grandma. I wish you good health.","Thank you very much, Grandma.","Yes, I do. I love playing in the water!",'ไปรดน้ำขอพรผู้ใหญ่ ให้อวยพรท่าน','I wish you good health. = ขอให้ท่านสุขภาพแข็งแรง'),
  TT("Thank you, dear. May you be happy and healthy!",'ขอบใจจ้ะ ขอให้หลานมีความสุขและแข็งแรงนะ',"Thank you very much, Grandma.","Yes, I do. I love playing in the water!","That sounds nice. I'll join next year.",'ผู้ใหญ่ให้พร ให้ขอบคุณอย่างสุภาพ','May you be ... = ขอให้คุณ ...'),
  TT("Do you like Songkran?",'ชอบสงกรานต์ไหม',"Yes, I do. I love playing in the water!","Happy Songkran, Grandma. I wish you good health.","That sounds nice. I'll join next year.",'ถามว่าชอบไหม (Do you ...?) ตอบ Yes, I do.','playing in the water = เล่นน้ำ'),
  TT("Every Songkran, we hold a big festival here. People also pay respect to Phra Phue.",'ทุกสงกรานต์เรามีงานใหญ่ที่นี่ และผู้คนกราบไหว้พระพือด้วย',"That sounds nice. I'll join next year.","Yes, I do. I love playing in the water!","Thank you very much, Grandma.",'ได้ยินเรื่องงานประจำปี ให้บอกว่าจะมาร่วม','hold a festival = จัดงาน, pay respect = กราบไหว้')]),
 NPCDEF('tan','Tan','Friend⁣เพื่อนที่เล่นน้ำ',-2,1.8,0,[.95,.5,.2],[.2,.5,.8],[.1,.07,.05],'',[
  TT("Happy Songkran! Do you want some water?",'สุขสันต์สงกรานต์! เอาน้ำไหม',"Yes, but please don't splash my phone!","It's cool and clean.","Happy Songkran! Here is some water.",'เพื่อนจะสาดน้ำ ให้ตอบและขอไม่ให้โดนมือถือ','splash = สาดน้ำ, Please don\'t ... = กรุณาอย่า ...'),
  TT("OK! Is the water cold?",'โอเค! น้ำเย็นไหม',"It's cool and clean.","Thanks. I'll be careful.","Sounds great! I'd like to come again.",'ถามว่าน้ำเย็นไหม (Is ...?) ให้บอกลักษณะน้ำ','clean = สะอาด, cool = เย็นสบาย'),
  TT("Come here in the rainy season too! The water is not too deep and not too shallow.",'หน้าฝนก็มาเล่นได้นะ น้ำไม่ลึกไปและไม่ตื้นไป',"Sounds great! I'd like to come again.","It's cool and clean.","Thanks. I'll be careful.",'ได้ยินว่าหน้าฝนก็เล่นน้ำได้ ให้ตอบรับ','rainy season = หน้าฝน, deep = ลึก, shallow = ตื้น'),
  TT("Be careful! The rocks are slippery.",'ระวังนะ! หินลื่น',"Thanks. I'll be careful.","Sounds great! I'd like to come again.","It's cool and clean.",'เพื่อนเตือนว่าหินลื่น ให้ขอบคุณ','slippery = ลื่น')]),
 NPCDEF('sang','Mr. Sang','Local guide⁣ไกด์ท้องถิ่น',-1.2,-1.2,0,[.2,.6,.5],[.3,.3,.3],[.1,.07,.05],'hat',[
  TT("Welcome to Kaeng Saphue! It is in Phibun Mangsahan, about forty-five kilometers from Ubon city.",'ยินดีต้อนรับสู่แก่งสะพือ อยู่ที่พิบูลมังสาหาร ห่างจากตัวเมืองอุบลประมาณ 45 กิโลเมตรครับ',"Wow! It's not far from the city.","Big snake? Is there a story?","Wow! It's very far from the city.",'ได้ยินระยะทาง ให้แสดงความเห็นว่าไม่ไกล','kilometers = กิโลเมตร, not far = ไม่ไกล'),
  TT("Its name comes from the Kui language. It means \"big snake rapids.\"",'ชื่อมาจากภาษากูย แปลว่า "แก่งงูใหญ่" ครับ',"Big snake? Is there a story?","Wow! It's not far from the city.","They look like art!",'ได้ยินความหมายของชื่อ ให้ถามว่ามีเรื่องเล่าไหม','rapids = แก่ง (กระแสน้ำเชี่ยวผ่านหิน)'),
  TT("People believe a Naga, a big snake, lives here and protects this place.",'ผู้คนเชื่อว่ามีพญานาคอาศัยอยู่ที่นี่และปกปักรักษา',"That's an interesting story!","Big snake? Is there a story?","I see. Now I understand.",'ได้ฟังตำนาน ให้แสดงความสนใจ','believe = เชื่อ, protect = ปกปักรักษา'),
  TT("From about February to May, the rocks come out of the water. The water made holes like circles and stars.",'ตั้งแต่ประมาณกุมภาพันธ์ถึงพฤษภาคม หินโผล่พ้นน้ำ กระแสน้ำกัดเซาะเป็นหลุมรูปวงกลมและดาว',"They look like art! Why is the water low?","That's an interesting story!","Wow! It's not far from the city.",'เห็นหินสวย ให้ชมและถามว่าทำไมน้ำลด','circles and stars = วงกลมและดาว'),
  TT("They open the Pak Mun Dam, so the water goes down.",'เขาเปิดเขื่อนปากมูล น้ำจึงลดลงครับ',"I see. Now I understand.","Why is the water low?","They look like art!",'ได้คำอธิบายแล้ว ให้บอกว่าเข้าใจแล้ว','dam = เขื่อน, I see. = อ๋อ เข้าใจแล้ว')]),
 NPCDEF('ladda','Ms. Ladda','Guide at the monument⁣ไกด์ประจำหินพระปรมาภิไธย',2,-1.4,0,[.85,.7,.2],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("Look! King Rama IX and Queen Sirikit visited Phibun Mangsahan on November 17, 1955.",'ดูสิคะ ในหลวงรัชกาลที่ 9 และสมเด็จพระนางเจ้าสิริกิติ์เสด็จมาพิบูลมังสาหารเมื่อวันที่ 17 พฤศจิกายน พ.ศ. 2498',"That was a long time ago. What did they do here?","I'd like to see it. Where is it?","Thank you. I'll go and see the view.",'ได้ยินวันที่เสด็จ ให้แสดงความเห็นและถามว่าทรงทำอะไร','long time ago = นานมาแล้ว, visited = เสด็จมา/มาเยือน'),
  TT("They signed their names on a sandstone rock.",'ทั้งสองพระองค์ลงพระปรมาภิไธยบนหินทราย',"I'd like to see it. Where is it?","What did they do here?","Thank you. I'll go and see the view.",'ให้ขอไปดู และถามว่าอยู่ที่ไหน','sandstone = หินทราย, I\'d like to see ... = ฉันอยากดู ...'),
  TT("It's right here. Then they went up to the pavilion to see the rapids and the river.",'อยู่ตรงนี้ค่ะ จากนั้นทรงขึ้นไปที่พลับพลาเพื่อชมแก่งและแม่น้ำ',"Thank you. I'll go and see the view.","Where is it?","What did they do here?",'ได้คำแนะนำแล้ว ให้ขอบคุณและบอกว่าจะไปดูวิว','pavilion = พลับพลา, view = วิว')])]});

