/* ===== Our school: the school bank (the teacher said it is near the flagpole yard and the dome; students work at the counter
   and a teacher advises them; students go at lunch break 12:30). Names, amounts and the layout are made up. ===== */
SCENES.push({id:'sbank',name:'School Bank · Phibun School',th:'ธนาคารโรงเรียน',color:'#CA8A04',orbit:true,spawn:[0,3.6,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'flagpole',at:[10.2,-1.4,-Math.PI/2]}],/* the door leads back to the flagpole yard */
 build(){const c=mk();
  const WALL=[.97,.95,.9],CAP=[.62,.55,.42],WOOD=[.6,.42,.26],TOP=[.86,.8,.68];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.93,.9,.84]:[.87,.83,.76]);
  /* front wall (higher) with the bank sign and a poster */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  /* the counter with two windows (1 and 2), dividers, a piggy bank, bank books and a calculator */
  c.box(-1.6,.55,-2.4,6,1.1,.7,WOOD,true);c.box(-1.6,1.13,-2.4,6.2,.06,.82,TOP);
  for(const x of [-4.6,-1.6,1.4])c.box(x,1.45,-2.4,.06,.6,.8,[.75,.85,.9]);
  c.box(-3.1,1.6,-2.78,.5,.4,.04,[.15,.4,.25]);c.box(-.1,1.6,-2.78,.5,.4,.04,[.15,.4,.25]);
  c.box(-2.3,1.27,-2.3,.3,.22,.22,[.95,.55,.7]);c.box(-2.3,1.42,-2.3,.08,.04,.1,[.5,.3,.35]);/* piggy bank */
  for(let k=0;k<4;k++)c.box(-3.6,1.18+k*.035,-2.35,.32,.03,.22,k%2?[.2,.45,.7]:[.15,.55,.4]);/* bank books */
  c.box(-.7,1.18,-2.4,.22,.04,.3,[.25,.25,.28]);
  /* chairs behind the counter */
  for(const x of [-3.1,-.1]){c.box(x,.45,-3.5,.5,.08,.5,[.3,.3,.35]);c.box(x,.75,-3.73,.5,.55,.06,[.3,.3,.35])}
  /* the teacher's desk on the right */
  c.box(3.6,.75,-3.4,1.8,.08,.9,[.86,.8,.68]);c.box(3.6,.38,-3.4,1.7,.72,.75,WOOD,true);
  c.box(3.2,.84,-3.5,.4,.06,.3,[.95,.95,.95]);c.box(4.1,.9,-3.6,.3,.22,.1,[.2,.2,.22]);
  /* queue line: posts with a rope in front of window 1 */
  for(const z of [-.8,.6,2]){c.box(-4.3,.45,z,.08,.9,.08,[.75,.6,.2]);c.box(-1.9,.45,z,.08,.9,.08,[.75,.6,.2])}
  c.box(-4.3,.82,.6,.04,.04,2.8,[.8,.2,.25]);c.box(-1.9,.82,.6,.04,.04,2.8,[.8,.2,.25]);
  /* low side and back walls with a door gap at the back right, waiting chairs on the left */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  c.box(-5.5,.32,3.2,.8,.4,2.2,[.85,.65,.3],true);c.box(-5.85,.75,3.2,.14,.5,2.2,[.8,.6,.28]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1.6,y:1.95,z:-4.83,w:3.6,h:.62,ry:0,cw:720,ch:124,draw:(g,W,H)=>{g.fillStyle='#a16207';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 46px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('School Bank · ธนาคารโรงเรียน',W/2,H/2+2)}},
  {x:3.6,y:1.6,z:-4.83,w:1.6,h:1,ry:0,cw:320,ch:200,draw:(g,W,H)=>{g.fillStyle='#fef3c7';g.fillRect(0,0,W,H);g.strokeStyle='#a16207';g.lineWidth=8;g.strokeRect(4,4,W-8,H-8);
   g.fillStyle='#713f12';g.textAlign='center';g.textBaseline='middle';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Save a little',W/2,62);g.fillText('every day',W/2,110);
   g.font="500 26px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('ออมทีละนิดทุกวัน',W/2,158)}},
  {x:-3.1,y:1.6,z:-2.75,w:.48,h:.38,ry:0,cw:96,ch:76,draw:(g,W,H)=>{g.fillStyle='#14532d';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 56px sans-serif";g.fillText('1',W/2,H/2+3)}},
  {x:-.1,y:1.6,z:-2.75,w:.48,h:.38,ry:0,cw:96,ch:76,draw:(g,W,H)=>{g.fillStyle='#14532d';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 56px sans-serif";g.fillText('2',W/2,H/2+3)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Multipurpose Dome','โดมอเนกประสงค์','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('ploy2','Ploy','Student bank clerk⁣นักเรียนพนักงานธนาคาร',-3.1,-3.0,0,[.98,.98,.98],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("Hi! Do you want to deposit or withdraw?",'สวัสดี จะฝากหรือถอนเงิน',"I want to deposit 50 baht, please.","I want to buy a new book.","I want to deposit my bag, please.",'พนักงานถามว่าจะฝากหรือถอน ให้บอกว่าจะฝาก 50 บาท',"Good! Deposit means put money in. Withdraw means take money out. | deposit = ฝากเงิน, withdraw = ถอนเงิน"),
  TT("Can I see your bank book, please?",'ขอดูสมุดบัญชีหน่อยนะ',"Sure. Here you are.","No, I don't like books.","Sure. Here is my lunch box.",'พนักงานขอดูสมุดบัญชี ให้ยื่นให้และพูดว่า Here you are.',"Good! Say Here you are. when you hand something over. | bank book = สมุดบัญชี, Here you are. = นี่ครับ/ค่ะ (ตอนยื่นของให้)"),
  TT("Done! You have 350 baht now.",'เรียบร้อย ตอนนี้มี 350 บาทแล้ว',"Great! Thank you.","How much is it?","Great! Here's 350 baht.",'ฝากเสร็จแล้ว ให้ขอบคุณพนักงาน',"Good! Say thank you when the job is done. | Done! = เรียบร้อย, now = ตอนนี้")]),
 NPCDEF('suda2','Mrs. Suda','Bank advisor teacher⁣ครูที่ปรึกษาธนาคาร',3.6,-2.5,0,[.72,.55,.82],[.2,.18,.3],[.08,.06,.07],'bun',[
  TT("Good afternoon. Do you save money every week?",'สวัสดีจ้ะ ออมเงินทุกสัปดาห์ไหม',"Yes, I do. I save 50 baht every week.","Yes, I am.","Yes, I do. I spend 50 baht every week.",'ครูถามด้วย Do you ...? ให้ตอบ Yes, I do. แล้วบอกว่าออมเท่าไร',"Right! Answer Do you ...? with Yes, I do. Save means keep money. | save = ออม เก็บเงิน, every week = ทุกสัปดาห์"),
  TT("Good job! What are you saving for?",'เก่งมาก เก็บเงินไว้ทำอะไร',"I'm saving for a new bike.","I'm saving at school.","I'm saving my homework.",'ครูถามว่าเก็บเงินไว้ซื้ออะไร ให้ตอบ I\'m saving for ...',"Good! Saving for tells what you want to buy. | saving for = เก็บเงินไว้เพื่อ, bike = จักรยาน"),
  TT("Remember, a little every day adds up.",'จำไว้นะ ออมทีละนิดทุกวัน ก็จะเยอะขึ้นเอง',"Yes, I'll keep saving.","OK. I'll spend it all.","Yes, I'll stop saving.",'ครูให้กำลังใจเรื่องออมเงิน ให้รับปากว่าจะออมต่อ',"Good! Keep saving means continue to save. | keep saving = ออมต่อไป, spend = ใช้เงิน")]),
 NPCDEF('nok2','Nok','Friend opening an account⁣เพื่อนที่อยากเปิดบัญชี',3.0,.8,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.1,.08,.07],'long',[
  TT("I want to open a new account. What do I need?",'อยากเปิดบัญชีใหม่ ต้องใช้อะไรบ้าง',"I think you need your student ID card.","I think you need a football.","I think you need a new pencil.",'เพื่อนถามว่าเปิดบัญชีต้องใช้อะไร ให้บอกว่าต้องใช้บัตรนักเรียน',"Good! You need your student ID card to open an account. | open an account = เปิดบัญชี, student ID card = บัตรนักเรียน"),
  TT("How much money do I need to start?",'ต้องใช้เงินเท่าไรถึงจะเริ่มได้',"I'm not sure. Let's ask Mrs. Suda.","Let's ask the nurse.","I'm sure. You need 1,000 baht.",'ไม่รู้คำตอบ ให้บอกว่าไม่แน่ใจ แล้วชวนไปถามครูที่ปรึกษาธนาคาร',"Good! When you don't know, say I'm not sure and ask an adult. | I'm not sure. = ไม่แน่ใจ, Let's ask ... = ไปถาม...กัน"),
  TT("Thanks! Can you come with me?",'ขอบใจนะ ไปด้วยกันได้ไหม',"Sure. Let's go together.","No. I'm going with you.","Sure. Let's go home.",'เพื่อนชวนไปด้วยกัน ให้ตอบรับ',"Good! Let's go together accepts the invitation. | come with me = มากับฉัน, together = ด้วยกัน")]),
 NPCDEF('win2','Win','Friend in the queue⁣เพื่อนที่จะถอนเงิน',-.6,2.4,Math.PI/2,[.97,.97,.95],[.12,.16,.33],[.1,.08,.07],'',[
  TT("I need to withdraw some money. Where do I go?",'จะถอนเงิน ต้องไปตรงไหน',"Go to Ploy at the counter.","Go to the football field.","Go to the library.",'เพื่อนถามว่าถอนเงินที่ไหน ให้บอกให้ไปหา Ploy ที่เคาน์เตอร์',"Correct! Go to the counter to withdraw money. | withdraw = ถอนเงิน, counter = เคาน์เตอร์"),
  TT("It's my mom's birthday. I want to buy her a gift.",'วันเกิดแม่ อยากซื้อของขวัญให้',"That's nice! What will you buy?","Happy birthday to you!","That's nice! How old are you?",'วันเกิดแม่ของเพื่อน ให้ชมและถามว่าจะซื้ออะไร',"Nice! Show interest and ask about the gift. | gift = ของขวัญ, What will you buy? = จะซื้ออะไร"),
  TT("Maybe some flowers. How much did you deposit today?",'คงเป็นดอกไม้ วันนี้เธอฝากไปเท่าไร',"I deposited 50 baht.","I deposit 50 baht tomorrow.","I withdrew 50 baht.",'เพื่อนถามด้วย did (อดีต) ให้ตอบ I deposited ...',"Right! Deposited is the past of deposit. | deposit → deposited (อดีต), today = วันนี้")])]});
