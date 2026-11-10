/* ===== Our school: School Gym (ST-CNT-011 V1.0, 4 Nov). Reached from the Football Field (north-east path, owner decision 3 Nov).
   Spots from the spec: warm-up area (Ms. Kesinee), badminton equipment shelf (Jom), next to the court (Namsai), equipment return rack (Korn).
   The badminton club is made up for the game; NPC names are made up. Low side walls so the 360-degree camera can see in. ===== */
SCENES.push({id:'gym',name:'School Gym · Phibun School',th:'โรงยิม',color:'#1D4ED8',orbit:true,spawn:[7.6,3.2,-Math.PI/2],bounds:[-8.8,8.8,-6.2,6.2],
 exits:[{x0:8.5,x1:9.2,z0:2.2,z1:4.2,to:'football',at:[11,-7.5,-Math.PI/2]}],/* the east door leads back to the football field */
 build(){const c=mk();
  const WALL=[.93,.92,.88],CAP=[.55,.6,.7],WOOD=[.84,.66,.42],WOOD2=[.78,.6,.37],LINE=[.97,.96,.92],GREEN=[.2,.55,.4],MAT=[.25,.45,.8],SHELF=[.6,.62,.66];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(11,.03,3.2,4,.06,2.2,[.76,.75,.71]);/* path outside the door */
  /* wooden sports floor */
  for(let i=0;i<9;i++)c.box(-8+i*2,.04,0,2,.04,12.8,i%2?WOOD2:WOOD);
  /* badminton court: green playing area, white lines, net with two posts */
  c.box(.5,.065,0,8.4,.01,4.6,GREEN);
  const ln=(x,z,sx,sz)=>c.box(x,.075,z,sx,.01,sz,LINE);
  ln(.5,-2.3,8.4,.08);ln(.5,2.3,8.4,.08);ln(-3.7,0,.08,4.6);ln(4.7,0,.08,4.6);ln(.5,-1.95,8.4,.05);ln(.5,1.95,8.4,.05);
  ln(-.9,0,.05,4.6);ln(1.9,0,.05,4.6);ln(-2.3,0,2.8,.05);ln(3.3,0,2.8,.05);
  for(const z of [-2.55,2.55])c.box(.5,.78,z,.1,1.55,.1,[.3,.3,.32],true);
  c.box(.5,1.32,0,.03,.5,5.1,[.95,.95,.95]);c.box(.5,1.57,0,.05,.05,5.1,LINE);
  /* shuttlecocks on the floor near the court */
  for(const [x,z] of [[2.2,-1.1],[3.6,.8],[-1.6,1.3]]){c.box(x,.1,z,.1,.08,.1,[.98,.98,.98]);c.box(x,.06,z,.06,.04,.06,[.9,.3,.25])}
  /* tall north wall (board and wall signs) and low walls on the other sides, a door gap on the east */
  c.box(0,1.3,-6.6,18.4,2.6,.2,WALL,true);c.box(0,2.63,-6.6,18.5,.06,.3,CAP);
  c.box(-9.2,.6,0,.2,1.2,13.4,WALL,true);c.box(-9.2,1.23,0,.3,.06,13.4,CAP);
  c.box(0,.6,6.6,18.4,1.2,.2,WALL,true);c.box(0,1.23,6.6,18.5,.06,.3,CAP);
  c.box(9.2,.6,-2.3,.2,1.2,8.6,WALL,true);c.box(9.2,.6,5.4,.2,1.2,2.4,WALL,true);c.box(9.2,1.23,-2.3,.3,.06,8.6,CAP);c.box(9.2,1.23,5.4,.3,.06,2.4,CAP);
  c.box(9.2,1.1,2.1,.24,2.2,.14,CAP);c.box(9.2,1.1,4.3,.24,2.2,.14,CAP);c.box(9.2,2.25,3.2,.24,.14,2.3,CAP);
  c.box(-1,1.55,-6.48,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-6.45,4.2,1.1,.04,[.98,.98,.98]);
  c.box(4.4,1.5,-6.48,2.1,1.35,.04,[.12,.3,.75]);
  /* warm-up area: three mats by the west wall */
  for(const z of [-3,-1,1])c.box(-7.2,.07,z,2,.04,1.5,MAT);
  /* badminton equipment shelf on the north wall: rackets and tubes of shuttlecocks */
  c.box(-3.4,.9,-6.15,2.6,1.8,.6,SHELF,true);for(const y of [.55,1.1,1.6])c.box(-3.4,y,-5.86,2.5,.04,.04,[.45,.47,.5]);
  for(let k=0;k<6;k++){c.box(-4.4+k*.4,1.32,-5.9,.06,.4,.06,[.2,.25,.3]);c.box(-4.4+k*.4,1.6,-5.9,.2,.24,.04,k%2?[.85,.25,.25]:[.2,.45,.85])}
  for(let k=0;k<4;k++)c.box(-4.2+k*.5,.75,-5.92,.12,.36,.12,[.95,.95,.95]);
  /* bench on the south side (bags go here) */
  c.box(-2,.22,5.6,5,.08,.6,[.6,.42,.26]);c.box(-4.2,.11,5.6,.1,.22,.5,[.4,.4,.42]);c.box(.2,.11,5.6,.1,.22,.5,[.4,.4,.42]);c.ob.push([-4.5,.5,5.3,5.9]);
  c.box(-3.2,.42,5.6,.5,.32,.3,[.2,.4,.75]);c.box(-1.4,.42,5.6,.5,.32,.3,[.85,.3,.3]);
  /* equipment return rack and a basket for shuttlecocks by the east wall */
  c.box(7.6,.7,-3.4,.6,1.4,1.8,SHELF,true);for(let k=0;k<4;k++)c.box(7.3,1.0,-4+k*.4,.06,.6,.06,[.2,.25,.3]);
  c.box(7.4,.25,-1.9,.6,.5,.6,[.85,.65,.3],true);c.box(7.4,.51,-1.9,.62,.02,.62,[.7,.5,.2]);
  /* water point */
  c.box(-8.6,.5,4.8,.5,1,.5,[.8,.82,.85],true);c.box(-8.6,1.1,4.8,.3,.2,.3,[.55,.8,.95]);
  /* way out: arrows to the door and a sign above it */
  wayMarks(c,6.6,3.2,1,0,1);c.box(9.25,2.75,3.2,.1,.85,1.95,[.15,.42,.27]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-6.42,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#1d4ed8';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('School Gym · โรงยิม',22,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Badminton Club · 4:30 p.m.',22,100);g.fillText('ชมรมแบดมินตัน 16.30 น.',22,148)}},
  {x:4.4,y:1.5,z:-6.42,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#eff6ff';g.fillRect(0,0,W,H);g.fillStyle='#1d4ed8';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Warm up before playing.','อบอุ่นร่างกายก่อนเล่น'],['Keep the court clear.','เก็บสนามให้โล่ง'],['Return equipment after practice.','คืนอุปกรณ์หลังฝึกซ้อม']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>16){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>14){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  Object.assign(waySign(9.2-.1,3.2,-Math.PI/2,'Football Field','สนามฟุตบอล','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('kesineegym','Ms. Kesinee','Gym club teacher⁣ครูผู้ดูแลกิจกรรมกีฬาในร่ม',-6.0,-1.2,Math.PI/2,[0.2, 0.55, 0.85],[0.15, 0.18, 0.3],[0.08, 0.06, 0.07],'bun',[
  TT("We're starting our indoor sports club. What should we do first?","เรากำลังเริ่มกิจกรรมกีฬาในร่ม ควรทำอะไรก่อน","Let's warm up before we play.","Let's play before we warm up.","Let's skip the warm-up and start running.","นึกถึงการเตรียมร่างกายก่อนเล่นกีฬา","Good choice! Warming up prepares your body for activity. | ดีมาก การอบอุ่นร่างกายช่วยเตรียมร่างกายก่อนกิจกรรม"),
  TT("What shoes should you wear on the gym floor?","เธอควรสวมรองเท้าแบบใดบนพื้นโรงยิม","I'll wear clean sports shoes.","I'll wear muddy outdoor shoes.","I'll wear loose slippers on the court.","เลือกแบบที่เหมาะกับการเคลื่อนไหวในโรงยิม","Correct! Clean sports shoes are suitable for gym activities. | ถูกต้อง รองเท้ากีฬาที่สะอาดเหมาะกับกิจกรรมในโรงยิม"),
  TT("You feel thirsty after warming up. What will you do?","เธอรู้สึกกระหายน้ำหลังอบอุ่นร่างกาย จะทำอย่างไร","I'll drink some water during the break.","I'll wait until I get home to drink.","I'll keep exercising without a water break.","เลือกการดูแลตนเองเมื่อกระหายน้ำ","Well done! Drink water when you need it. | ดีมาก ควรดื่มน้ำเมื่อร่างกายต้องการ")]),
 NPCDEF('jomgym','Jom','Equipment helper⁣นักเรียนผู้ช่วยจัดเตรียมอุปกรณ์',-3.4,-4.9,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("Our task is badminton today. Which sport will you choose?","ภารกิจวันนี้คือแบดมินตัน เธอจะเลือกกีฬาชนิดใด","I'd like to try badminton today.","I'd like to play basketball today instead.","I'd like to practise table tennis today instead.","เลือกกีฬาที่ตรงกับภารกิจแบดมินตัน","Great! Your choice matches the badminton mission. | เยี่ยม เธอเลือกกีฬาได้ตรงกับภารกิจ"),
  TT("We need two rackets for our pair. How many will you take?","คู่ของเราต้องใช้ไม้แบดมินตันสองอัน เธอจะหยิบกี่อัน","I'll take two rackets for our pair.","I'll take only one racket for our pair.","I'll take four rackets for our pair.","นับจำนวนอุปกรณ์สำหรับผู้เล่นสองคน","Exactly! Two players need two rackets. | ถูกต้อง ผู้เล่นสองคนใช้ไม้สองอัน"),
  TT("Where should we put our bags to keep the court clear?","เราควรวางกระเป๋าไว้ที่ใดเพื่อให้สนามโล่ง","We'll put our bags on the bench.","We'll put our bags beside the net.","We'll leave our bags in the middle of the court.","เลือกพื้นที่เก็บกระเป๋าที่ไม่กีดขวางการเล่น","Nice! The bench keeps bags away from the playing area. | ดีมาก การวางกระเป๋าบนม้านั่งช่วยให้สนามโล่ง")]),
 NPCDEF('namsaigym','Namsai','Practice partner⁣เพื่อนคู่ฝึก',2.6,3.4,Math.PI,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("The coach wants us to work in pairs. Can we practise short serves together?","โค้ชให้ฝึกเป็นคู่ เราฝึกเสิร์ฟลูกระยะสั้นด้วยกันได้ไหม","Yes, let's practise short serves together.","Yes, let's practise long serves together.","Yes, let's practise short serves alone.","โค้ชให้ฝึกเป็นคู่ ตอบรับการฝึกเสิร์ฟระยะสั้นด้วยกัน","Great teamwork! You agreed to practise with your partner. | เยี่ยมมาก เธอตอบรับการฝึกกับเพื่อนได้เหมาะสม"),
  TT("The shuttlecock landed outside the line. Was it in or out?","ลูกขนไก่ตกนอกเส้นสนาม ลูกอยู่ในหรือนอก","It was out of bounds.","It was clearly inside the line.","It landed on the line, so it was in.","คำว่า outside the line หมายถึงนอกเส้นสนาม","Correct! Outside the boundary line means out. | ถูกต้อง ลูกตกนอกเส้นขอบสนามถือว่าออก"),
  TT("How can you thank me for practising with you?","เธอจะขอบคุณเพื่อนที่ฝึกด้วยกันอย่างไร","Thanks for being my practice partner.","Thanks for bringing me a new school bag.","Thanks for lending me your drawing pencils.","ขอบคุณในสิ่งที่เพื่อนทำให้จริง คือฝึกด้วยกัน","Lovely! You thanked your partner for the right reason. | ดีมาก เธอขอบคุณเพื่อนตรงกับสิ่งที่เพื่อนช่วย")]),
 NPCDEF('korngym','Korn','Court-care helper⁣นักเรียนผู้ช่วยดูแลพื้นที่กีฬา',6.4,-3.4,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("The shuttlecocks are on the floor. Where should we put them?","ลูกขนไก่อยู่บนพื้น เราควรนำไปเก็บที่ใด","Let's put the shuttlecocks in the basket.","Let's leave the shuttlecocks near the doorway.","Let's hide the shuttlecocks under the bench.","เลือกที่เก็บอุปกรณ์ให้เป็นระเบียบและไม่กีดขวาง","Correct! The basket is the proper place for shuttlecocks. | ถูกต้อง ตะกร้าเป็นที่เก็บลูกขนไก่อย่างเหมาะสม"),
  TT("Where should the rackets go after practice?","หลังฝึกซ้อมควรนำไม้แบดมินตันไปเก็บที่ใด","We should return the rackets to the rack.","We should leave the rackets on the court.","We should place the rackets behind the door.","เลือกจุดเก็บอุปกรณ์หลังใช้งาน","Well done! Returning equipment keeps the gym tidy. | ดีมาก การคืนอุปกรณ์ช่วยให้โรงยิมเป็นระเบียบ"),
  TT("Before we leave, what should we check on the court?","ก่อนออกจากโรงยิม เราควรตรวจอะไรบนสนาม","Let's check that the court is clear.","Let's check whether the windows are colourful.","Let's check whether the wall clock is new.","ตรวจความเรียบร้อยของพื้นที่เล่นเพื่อความปลอดภัย","Excellent! A clear court is safer for the next group. | ยอดเยี่ยม สนามที่โล่งปลอดภัยกว่าสำหรับกลุ่มถัดไป")])]});

