/* ===== Ubon: National Museum ===== */
SCENES.push({id:'museum',name:'Ubon National Museum',th:'พิพิธภัณฑ์แห่งชาติ',color:'#92400E',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.6,.78,.45]);
  c.box(0,.04,3.4,3,.06,10,[.88,.82,.7]);
  c.box(0,1.1,-6.0,15,2.2,3.6,[.97,.95,.88],true);c.box(0,2.3,-6.0,16,.3,4.2,[.8,.35,.2]);tPyr(c.a,0,2.45,-6.0,16,2.4,4.4,[.72,.3,.18]);
  c.box(0,.5,-4.0,9,1.0,.8,[.9,.85,.75]);c.box(0,1.55,-4.1,10.4,.14,.5,[.6,.4,.25]);
  for(let x=-4.5;x<=4.5;x+=1.5)c.box(x,.9,-4.1,.2,1.8,.2,[.9,.88,.8]);
  for(let x=-4.2;x<=4.2;x+=.7)c.box(x,1.35,-4.0,.45,.3,.08,[.55,.35,.2]);
  c.box(0,.8,-3.55,1.8,1.6,.06,[.45,.3,.2]);c.box(-3.2,1.2,-3.55,1.2,1.2,.06,WIN);c.box(3.2,1.2,-3.55,1.2,1.2,.06,WIN);
  c.box(0,2.2,-3.5,3.2,.7,.1,[.5,.2,.15]);c.box(0,2.2,-3.44,2.6,.2,.04,[.95,.9,.7]);
  c.ob.push([-8.0,8.0,-8.0,-3.6]);
  c.box(-9.2,.35,-.6,3.2,.7,1.0,[.55,.38,.25],true);c.box(-9.2,.8,-.6,2.6,.2,.7,[.65,.45,.28]);c.box(-10.6,.7,-.6,.4,.5,.5,[.65,.45,.28]);
  c.box(9.0,.5,-.4,2.2,1.0,1.6,[.78,.2,.15],true);c.box(8.4,1.15,-.4,.8,.7,.8,[.25,.25,.3]);c.box(9.9,.25,.5,.9,.5,.3,[.15,.15,.18]);c.box(9.9,.25,-1.3,.9,.5,.3,[.15,.15,.18]);
  for(const [x,z] of [[-6.4,1.0],[-5.2,.4],[6.0,1.8],[7.2,2.4]]){c.box(x,.7,z,.7,1.4,.2,[.72,.7,.68],true);c.box(x,1.45,z,.4,.16,.2,[.72,.7,.68]);}
  c.bench(-3.2,4.6);c.bench(3.2,4.6);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-11.8,-6.5);c.tree(11.8,-6.5);c.lamp(-2,2.2);c.lamp(2,2.2);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('desk','Ms. Jan','Museum staff⁣เจ้าหน้าที่พิพิธภัณฑ์',-2.4,-2.2,0,[.6,.3,.2],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Welcome to the museum! This building was the old city hall.",'ยินดีต้อนรับสู่พิพิธภัณฑ์ค่ะ อาคารนี้เคยเป็นศาลากลางจังหวัดเก่า',"Really? How old is it?","Really? Is it a new building?","Inside, we have ten rooms.",'ได้ยินว่าเคยเป็นศาลากลาง ให้ถามว่าเก่าแค่ไหน','city hall = ศาลากลาง (อเมริกัน), How old ...? = ... อายุเท่าไร'),
  TT("People built it in 1918. It is more than one hundred years old.",'สร้างเมื่อปี ค.ศ. 1918 มีอายุมากกว่าหนึ่งร้อยปีแล้วค่ะ',"Wow! It's a very old building.","How old is it?","Wow! It's a new building.",'ได้ยินอายุอาคาร ให้ตอบอย่างทึ่ง','more than = มากกว่า, building = อาคาร'),
  TT("Inside, we have ten rooms. Please take a map.",'ข้างในมีสิบห้องค่ะ กรุณารับแผนที่ไปด้วยนะคะ',"Thank you. I'll take one.","Please take a map.","Really? How old is it?",'ได้รับแผนที่ ให้ขอบคุณและรับ','take a map = รับแผนที่')]),
 NPCDEF('room','Mr. Boon','Room guide⁣ไกด์ประจำห้องจัดแสดง',3.0,-2.2,0,[.4,.3,.55],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Hello! In this room, we show old cloth from Ubon.",'สวัสดีครับ ห้องนี้จัดแสดงผ้าโบราณของอุบลฯ ครับ',"The cloth is beautiful.","Another room is about local music.","The music is beautiful.",'ได้ยินเรื่องผ้าโบราณ ให้ชมว่าสวย','cloth = ผ้า, old = เก่า/โบราณ'),
  TT("Another room is about local music. Do you like music?",'อีกห้องเกี่ยวกับดนตรีพื้นเมือง ชอบดนตรีไหมครับ',"Yes, I do. I like music a lot.","Yes, it is. I'm very excited.","Yes, I like old cloth a lot.",'ถามว่าชอบดนตรีไหม (Do you ...?) ตอบ Yes, I do.','local music = ดนตรีพื้นเมือง, a lot = มาก'),
  TT("We also have a room for folk crafts and things people use at home.",'เรายังมีห้องหัตถกรรมพื้นบ้านและของใช้ในบ้านด้วยครับ',"That sounds interesting.","Do you like music?","That sounds delicious.",'ได้ยินเรื่องห้องหัตถกรรม ให้ตอบว่าน่าสนใจ','folk crafts = หัตถกรรมพื้นบ้าน, That sounds interesting. = ฟังดูน่าสนใจ')]),
 NPCDEF('outdoor','Mr. Dang','Outdoor guide⁣ไกด์ส่วนจัดแสดงกลางแจ้ง',-8.2,1.6,Math.PI/2,[.3,.5,.3],[.25,.25,.3],[.1,.07,.05],'cap',[
  TT("Look at this! It is an old wooden boat.",'ดูนี่สิ เรือไม้โบราณลำนี้',"Wow! What do people do with it?","People used boats on the river.","Wow! It's a new boat.",'เห็นเรือโบราณ ให้ถามว่าใช้ทำอะไร','wooden boat = เรือไม้, What do people do with it? = คนใช้มันทำอะไร'),
  TT("People used boats on the river. Now look at the old tractor.",'คนใช้เรือในแม่น้ำ ตอนนี้ลองดูรถไถเก่าคันนี้สิ',"It's red and very old.","What do people do with it?","It's red and very new.",'เห็นรถไถเก่า ให้บอกลักษณะของมัน','tractor = รถไถ/รถแทรกเตอร์, river = แม่น้ำ'),
  TT("And these are big stones made from sandstone. They are called sema stones.",'และนี่คือหินก้อนใหญ่ทำจากหินทราย เรียกว่าใบเสมาครับ',"They look very big.","They look very small.","Now look at the old tractor.",'เห็นหินใบเสมา ให้ตอบว่าใหญ่มาก','sandstone = หินทราย, sema stones = ใบเสมา')]),
 NPCDEF('visitor','Ploy','Student visitor⁣นักเรียนที่มาเที่ยว',6.2,.6,Math.PI,[.9,.5,.65],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Hi! Is this your first time at the museum?",'สวัสดี นี่เป็นครั้งแรกที่เธอมาพิพิธภัณฑ์ใช่ไหม',"Yes, it is. I'm very excited.","Yes, I come here every week.","Yes, I do. I like music a lot.",'ถามว่าครั้งแรกไหม (Is ...?) ตอบ Yes, it is.','first time = ครั้งแรก, excited = ตื่นเต้น'),
  TT("Which room do you want to see first?",'เธออยากดูห้องไหนก่อน',"I want to see the prehistoric room.","Is this your first time at the museum?","Yes, I want to see it.",'ถามว่าอยากดูห้องไหน ตอบชื่อห้อง','prehistoric = สมัยก่อนประวัติศาสตร์'),
  TT("Me too! I also like the geology room.",'ฉันก็เหมือนกัน! ฉันชอบห้องธรณีวิทยาด้วย',"Great! Let's go together.","Which room do you want to see first?","Great! Let's go home.",'เพื่อนชอบห้องเดียวกัน ให้ชวนไปด้วยกัน','geology = ธรณีวิทยา, Let\'s ... = ไป ... กันเถอะ')])]});

