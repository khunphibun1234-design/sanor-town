/* ===== Our school: the IT library (2-floor building next to Ratrangsan Hall on the teacher's map; the teacher said students
   borrow and return books, use computers, print and read there at lunch break; a librarian, student helpers and a computer
   staff member work there). Reached through a side door of the hall. Names, shelf letters and the layout are made up. ===== */
SCENES.push({id:'itlib',name:'IT Library · Phibun School',th:'ห้องสมุด IT',color:'#0284C7',orbit:true,spawn:[0,3.6,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'hall14',at:[8.4,1.7,-Math.PI/2]}],/* the door leads back to the hall */
 build(){const c=mk();
  const WALL=[.95,.96,.97],CAP=[.45,.55,.65],WOOD=[.62,.45,.3],TOP=[.88,.82,.7],BK=[[.75,.2,.2],[.2,.45,.75],[.95,.75,.2],[.2,.6,.4],[.55,.3,.65],[.95,.5,.2]];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.8,.86,.9]:[.74,.8,.86]);
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  /* three bookshelves (A, B, C) along the front wall, full of books */
  for(let k=0;k<3;k++){const x=-4.6+k*1.6;c.box(x,1,-4.55,1.4,2,.5,WOOD,true);
   for(let r=0;r<4;r++){c.box(x,.12+r*.48,-4.4,1.36,.05,.42,[.5,.36,.24]);
    for(let b=0;b<9;b++)c.box(x-.6+b*.15,.3+r*.48,-4.42,.12,.32,.34,BK[(b+r+k)%6])}}
  /* loan counter with a pile of books and a scanner */
  c.box(-4.3,.55,-1.2,2.6,1.1,.7,WOOD,true);c.box(-4.3,1.13,-1.2,2.8,.06,.82,TOP);
  for(let k=0;k<4;k++)c.box(-5.1,1.2+k*.08,-1.15,.4,.07,.28,BK[k]);c.box(-3.7,1.2,-1.2,.25,.06,.18,[.2,.2,.22]);
  c.box(-4.3,.45,-2.2,.5,.08,.5,[.3,.3,.35]);
  /* book cart next to the helper */
  c.box(.5,.45,-3.1,.9,.06,.5,[.6,.62,.66]);c.box(.5,.75,-3.1,.9,.06,.5,[.6,.62,.66]);for(let b=0;b<5;b++)c.box(.2+b*.15,.92,-3.1,.12,.28,.3,BK[b]);
  c.box(.5,.42,-3.1,.06,.84,.5,[.5,.52,.56],true);
  /* computer desk along the right wall: four computers and a printer */
  c.box(5.4,.75,-1.4,.9,.08,5.2,[.9,.9,.92]);c.box(5.4,.37,-1.4,.8,.74,5,[.7,.72,.76],true);
  for(let k=0;k<4;k++){const z=-3.4+k*1.2;c.box(5.55,1.12,z,.08,.5,.75,[.15,.15,.18]);c.box(5.5,1.12,z,.02,.42,.66,[.35,.6,.85]);c.box(5.1,.81,z,.25,.03,.5,[.2,.2,.22]);
   c.box(4.6,.45,z,.45,.08,.45,[.3,.3,.35])}
  c.box(5.4,.98,1.6,.7,.4,.6,[.92,.92,.94],true);c.box(5.4,1.2,1.6,.5,.04,.4,[.98,.98,.98]);/* printer */
  /* reading table with chairs and books in the middle */
  c.box(.8,.75,1.2,2.6,.08,1.2,TOP);c.box(.8,.37,1.2,2.4,.74,1,WOOD,true);
  for(const x of [0,1.6])for(const z of [.3,2.1])c.box(x,.45,z,.45,.08,.45,[.3,.3,.35]);
  c.box(.3,.82,1.1,.4,.05,.3,BK[1]);c.box(1.4,.82,1.3,.4,.05,.3,BK[3]);
  /* stairs to the second floor at the back left (just to look at) */
  for(let k=0;k<8;k++)c.box(-5.3,.13+k*.13,4.4-k*.38,1,.26+k*.26,.38,[.78,.78,.8],k===0);
  c.ob.push([-5.8,-4.8,1.4,4.6]);
  /* low side and back walls with a door gap at the back right */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:2.6,y:1.95,z:-4.83,w:3.4,h:.62,ry:0,cw:680,ch:124,draw:(g,W,H)=>{g.fillStyle='#0369a1';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 46px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('IT Library · ห้องสมุด IT',W/2,H/2+2)}},
  {x:2.6,y:1.1,z:-4.83,w:1.8,h:.7,ry:0,cw:360,ch:140,draw:(g,W,H)=>{g.fillStyle='#ecfeff';g.fillRect(0,0,W,H);g.strokeStyle='#0369a1';g.lineWidth=8;g.strokeRect(4,4,W-8,H-8);
   g.fillStyle='#0c4a6e';g.textAlign='center';g.textBaseline='middle';g.font="700 42px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Quiet, please',W/2,52);
   g.font="500 30px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('กรุณาเงียบ',W/2,102)}},
  ...['A','B','C'].map((t,k)=>({x:-4.6+k*1.6,y:2.18,z:-4.28,w:.42,h:.34,ry:0,cw:84,ch:68,draw:(g,W,H)=>{g.fillStyle='#0c4a6e';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 50px sans-serif";g.fillText(t,W/2,H/2+3)}})),
  {x:5.03,y:1.5,z:-.2,w:.4,h:.3,ry:-Math.PI/2,cw:80,ch:60,draw:(g,W,H)=>{g.fillStyle='#facc15';g.fillRect(0,0,W,H);g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.font="700 46px sans-serif";g.fillText('5',W/2,H/2+3)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Ratrangsan Hall','หอประชุมราษฎร์รังสรรค์','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('nim','Mrs. Nim','Librarian⁣ครูบรรณารักษ์',-4.3,-1.95,0,[.6,.75,.55],[.2,.2,.26],[.08,.06,.07],'bun',[
  TT("Hello. Can I help you?",'สวัสดีจ้ะ มีอะไรให้ช่วยไหม',"I'd like to return this book, please.","I'd like to buy this book, please.","I'd like to eat my lunch here, please.",'ครูบรรณารักษ์ถามว่าให้ช่วยอะไร ให้บอกว่าจะคืนหนังสือ',"Good! I'd like to return ... is a polite request. Return means give back. | return = คืน, borrow = ยืม"),
  TT("Thank you. Do you want to borrow another book?",'ขอบใจจ้ะ จะยืมเล่มอื่นอีกไหม',"Yes, please. Do you have any English comic books?","Yes, I'd like a hamburger.","Yes, please. Do you have any shoes?",'ครูถามว่าจะยืมเล่มอื่นไหม ให้ตอบรับและถามหาหนังสือที่อยากอ่าน',"Good! Ask Do you have any ...? to find a book. Borrow means take it for a short time. | borrow = ยืม, comic book = หนังสือการ์ตูน"),
  TT("Yes. They're on the second floor, next to the stairs.",'มีจ้ะ อยู่ชั้น 2 ข้างบันได',"Thank you. I'll go and look.","Thank you. I'll go home.","Thank you. I'm in Grade 8.",'ครูบอกว่าหนังสืออยู่ชั้น 2 ให้ขอบคุณและบอกว่าจะไปดู',"Good! Thank the librarian and go to look on the second floor. | second floor = ชั้น 2, next to = ข้าง ๆ, stairs = บันได")]),
 NPCDEF('fern','Fern','Library helper⁣นักเรียนช่วยงานห้องสมุด',-.4,-3.1,0,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("Shh! Please speak quietly in the library.",'ชู่ว ในห้องสมุดพูดเบา ๆ นะ',"Oh, sorry. I'll be quiet.","OK. I'll sing a song.","Yes! I'll talk louder.",'เพื่อนเตือนให้พูดเบา ๆ ให้ขอโทษและบอกว่าจะเงียบ',"Good! Say sorry and be quiet in the library. | quietly = เบา ๆ, quiet = เงียบ"),
  TT("Can you help me put these books on the shelf?",'ช่วยเอาหนังสือพวกนี้ขึ้นชั้นหน่อยได้ไหม',"Sure. Where do they go?","Sure. I'll take them home.","Sure. Where is the canteen?",'เพื่อนขอให้ช่วยเก็บหนังสือ ให้ตอบรับและถามว่าต้องวางตรงไหน',"Good! Ask Where do they go? to find the right shelf. | shelf = ชั้นวางหนังสือ, Where do they go? = วางไว้ตรงไหน"),
  TT("These are English books. They go on shelf B.",'เล่มพวกนี้เป็นหนังสือภาษาอังกฤษ อยู่ชั้น B',"OK. I'll put them on shelf B.","OK. I'll put them in the bin.","OK. I'll put them on shelf D.",'เพื่อนบอกว่าหนังสืออยู่ชั้น B ให้รับคำว่าจะวางที่ชั้น B',"Right! The English books go on shelf B. | put = วาง, bin = ถังขยะ")]),
 NPCDEF('toon','Mr. Toon','Computer staff⁣เจ้าหน้าที่ดูแลคอมพิวเตอร์',3.7,-2.8,-Math.PI/2,[.35,.45,.6],[.2,.2,.24],[.08,.06,.07],'',[
  TT("Hi. Do you want to use a computer?",'สวัสดี จะใช้คอมพิวเตอร์ไหม',"Yes, please. I need to find information for my report.","Yes, please. I want to play games all day.","Yes, please. I need to buy a computer.",'เจ้าหน้าที่ถามว่าจะใช้คอมไหม ให้ตอบรับและบอกว่าจะหาข้อมูลทำรายงาน',"Correct! The library computer is for finding information for your report. | information = ข้อมูล, report = รายงาน"),
  TT("You can use computer number 5.",'ใช้เครื่องหมายเลข 5 ได้เลย',"Number 5? OK. Thank you.","Number 5? I'm 13 years old.","Number 9? OK. Thank you.",'เจ้าหน้าที่บอกหมายเลขเครื่อง ให้ทวนหมายเลขและขอบคุณ',"Good! Repeat the number to check it, then say thank you. | number = หมายเลข"),
  TT("Do you want to print your work?",'จะปริ้นงานไหม',"Yes, please. Two pages.","Yes, please. Two plates.","Yes, please. Two computers.",'เจ้าหน้าที่ถามว่าจะปริ้นงานไหม ให้ตอบรับและบอกจำนวนหน้า',"Right! We count printing in pages. | print = พิมพ์/ปริ้น, page = หน้า (กระดาษ)")]),
 NPCDEF('pond','Pond','Friend doing homework⁣เพื่อนที่กำลังทำการบ้าน',-.9,1.4,Math.PI/2,[.97,.97,.95],[.12,.16,.33],[.1,.08,.07],'',[
  TT("Hi! I'm doing my English homework. Can you help me?",'ทำการบ้านอังกฤษอยู่ ช่วยหน่อยได้ไหม',"Sure. What's the question?","Sure. What's for lunch?","Sure. What's your name?",'เพื่อนขอให้ช่วยทำการบ้าน ให้ตอบรับและถามว่าข้อไหน',"Good! Ask What's the question? to start helping. | homework = การบ้าน, question = คำถาม"),
  TT("What's the past tense of \"go\"?",'คำอดีตของ go คืออะไร',"It's \"went\".","It's \"goed\".","It's \"gone\".",'go เป็นคำกริยาไม่ปกติ อดีตของ go คือ went',"Correct! Go is irregular. Its past tense is went. | past tense = รูปอดีต, go → went"),
  TT("Thanks! Let's go to the school bank after this.",'ขอบใจ เสร็จแล้วไปธนาคารโรงเรียนกัน',"OK. I need to deposit some money, too.","Sure. I need to borrow a book there.","OK. I need to buy some shoes, too.",'เพื่อนชวนไปธนาคารโรงเรียน ให้ตอบรับและบอกว่าจะไปฝากเงินด้วย',"Good! Deposit means put money in the bank. Too means also. | deposit = ฝากเงิน, too = ด้วย")])]});

