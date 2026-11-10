/* ===== District Office (Phibun Mangsahan district office is on the teacher's map; inside it is made up for the game:
   an information desk with a queue machine, service windows 1-4, waiting chairs). Names and window numbers are made up. ===== */
SCENES.push({id:'district',name:'District Office',th:'ที่ว่าการอำเภอพิบูลมังสาหาร',color:'#0F766E',orbit:true,spawn:[0,3.6,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 build(){const c=mk();
  const WALL=[.96,.94,.88],CAP=[.55,.45,.3],WOOD=[.55,.38,.24],TOP=[.9,.85,.72],CH=[.2,.42,.62];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.9,.88,.84]:[.82,.8,.76]);
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  /* long counter with four service windows, glass dividers, chairs and screens behind */
  c.box(0,.55,-2.6,9.8,1.1,.7,WOOD,true);c.box(0,1.13,-2.6,10,.06,.82,TOP);
  for(const x of [-4.8,-2.4,0,2.4,4.8])c.box(x,1.5,-2.6,.06,.7,.8,[.75,.85,.9]);
  for(const x of [-3.6,-1.2,1.2,3.6]){c.box(x,.45,-3.7,.5,.08,.5,[.3,.3,.35]);c.box(x,.75,-3.93,.5,.55,.06,[.3,.3,.35]);
   c.box(x,1.32,-2.8,.5,.34,.05,[.15,.15,.18]);c.box(x+.5,1.18,-2.65,.3,.04,.22,[.95,.95,.95])}
  /* window 3: the ID card camera on a stand and a small backdrop */
  c.box(1.75,1.35,-2.45,.18,.14,.2,[.12,.12,.14]);c.box(1.75,1.22,-2.45,.04,.2,.04,[.3,.3,.32]);
  /* information desk near the door with the queue machine */
  c.box(3.9,.55,1.4,.8,1.1,2,WOOD,true);c.box(3.9,1.13,1.4,.95,.06,2.1,TOP);
  c.box(2.95,.7,2.9,.45,1.4,.4,[.85,.86,.9],true);c.box(2.95,1.25,2.69,.3,.2,.02,[.2,.5,.8]);c.box(2.95,1.02,2.69,.12,.03,.02,[.95,.95,.95]);
  /* rows of waiting chairs in the middle */
  for(const z of [.2,1.5,2.8]){for(let k=0;k<5;k++){const x=-4.4+k*.75;c.box(x,.45,z,.6,.07,.55,CH);c.box(x,.75,z+.26,.6,.5,.06,CH)}
   c.box(-2.9,.22,z,3.8,.06,.06,[.4,.4,.42]);c.ob.push([-4.8,-1.0,z-.32,z+.34])}
  c.box(-1.6,.65,-.9,.06,1.3,.06,[.4,.4,.42]);c.box(-1.6,.06,-.9,.4,.04,.4,[.4,.4,.42]);/* sign stand */
  /* plants and a Thai flag */
  for(const x of [-5.5,5.5]){c.box(x,.3,-4.4,.5,.6,.5,[.75,.45,.3]);c.box(x,.9,-4.4,.6,.8,.6,[.25,.55,.3])}
  c.box(5.6,1.5,4.2,.05,3,.05,[.8,.8,.82]);[[.79,.12,.16],[.97,.97,.97],[.17,.2,.45],[.97,.97,.97],[.79,.12,.16]].forEach((cl,k)=>c.box(5.6,2.85-k*.13-(k>2?.13:0),4.65,.03,k==2?.26:.13,.9,cl));
  /* low side and back walls with a door gap at the back right */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:0,y:1.92,z:-4.83,w:6.4,h:.66,ry:0,cw:1280,ch:132,draw:(g,W,H)=>{g.fillStyle='#115e59';g.fillRect(0,0,W,H);g.strokeStyle='#fde68a';g.lineWidth=6;g.strokeRect(6,6,W-12,H-12);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 50px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('District Office · ที่ว่าการอำเภอพิบูลมังสาหาร',W/2,H/2+2)}},
  ...[1,2,3,4].map((n,k)=>({x:-3.6+k*2.4,y:2.02,z:-2.95,w:.5,h:.4,ry:0,cw:100,ch:80,draw:(g,W,H)=>{g.fillStyle='#0f766e';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 60px sans-serif";g.fillText(String(n),W/2,H/2+3)}})),
  {x:2.4,y:1.3,z:-4.83,w:1.5,h:.62,ry:0,cw:300,ch:124,draw:(g,W,H)=>{g.fillStyle='#111827';g.fillRect(0,0,W,H);g.fillStyle='#fbbf24';g.textAlign='center';g.textBaseline='middle';g.font="700 34px sans-serif";g.fillText('NOW SERVING',W/2,34);g.fillStyle='#34d399';g.font="700 46px sans-serif";g.fillText('25  ▶  Window 3',W/2,88)}},
  {x:-1.6,y:1.35,z:-.86,w:1,h:.62,ry:0,cw:220,ch:136,draw:(g,W,H)=>{g.fillStyle='#fff7ed';g.fillRect(0,0,W,H);g.strokeStyle='#0f766e';g.lineWidth=8;g.strokeRect(4,4,W-8,H-8);g.fillStyle='#134e4a';g.textAlign='center';g.textBaseline='middle';
   g.font="700 30px Anuphan, sans-serif";g.fillText('Please wait here',W/2,48);g.font="600 28px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('กรุณารอที่นี่',W/2,94)}},
  {x:3.44,y:1.55,z:1.4,w:1.6,h:.42,ry:-Math.PI/2,cw:340,ch:90,draw:(g,W,H)=>{g.fillStyle='#0f766e';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 30px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Information · ประชาสัมพันธ์',W/2,H/2+2)}}],
 npcs:[
 NPCDEF('ping','Ms. Ping','Information officer⁣เจ้าหน้าที่ประชาสัมพันธ์',3.1,1.4,-Math.PI/2,[.98,.98,.98],[.2,.25,.4],[.08,.06,.07],'bun',[
  TT("Good morning. How can I help you?",'สวัสดีค่ะ มีอะไรให้ช่วยคะ',"I need a new ID card, please.","I need a new bicycle, please.","How can I help you?",'เจ้าหน้าที่ถามว่าให้ช่วยอะไร ให้บอกว่าต้องการทำบัตรประชาชนใหม่','ID card = บัตรประชาชน, I need ... = ฉันต้องการ ...'),
  TT("Please take a queue number and wait for your number.",'กรุณารับบัตรคิวแล้วรอเรียกหมายเลขนะคะ',"OK. Thank you. My number is 25.","OK. I'm 25 years old.","Please take a queue number.",'เจ้าหน้าที่ให้รับบัตรคิว ให้รับคำและบอกหมายเลขคิว','queue number = หมายเลขคิว, wait = รอ'),
  TT("The ID card service is at window 3.",'บริการบัตรประชาชนอยู่ช่อง 3 ค่ะ',"Window 3. Thank you very much.","Window 3? I'll close it.","At window 3.",'เจ้าหน้าที่บอกช่องบริการ ให้ทวนหมายเลขช่องและขอบคุณ','window = ช่องบริการ')]),
 NPCDEF('tae','Mr. Tae','ID card officer⁣เจ้าหน้าที่ทำบัตร',1.2,-3.25,0,[.75,.8,.9],[.2,.2,.24],[.08,.06,.07],'',[
  TT("Number 25, please. Can I see your old ID card?",'หมายเลข 25 ครับ ขอดูบัตรใบเก่าหน่อย',"Sure. Here it is.","Sure. I don't have a card game.","Can I see your old ID card?",'เจ้าหน้าที่ขอดูบัตรเก่า ให้ยื่นให้','Here it is. = นี่ครับ/ค่ะ'),
  TT("Please look at the camera and smile.",'มองกล้องแล้วยิ้มนะครับ',"OK. Is this all right?","OK. I'll take a selfie.","Look at the camera.",'เจ้าหน้าที่ให้มองกล้องและยิ้ม ให้รับคำและถามว่าแบบนี้ได้ไหม','camera = กล้อง, smile = ยิ้ม'),
  TT("All done. Here's your new ID card.",'เรียบร้อยครับ นี่บัตรใหม่ของเธอ',"Thank you. It looks great!","Thank you. It tastes great!","Here's your new ID card.",'ได้บัตรใหม่แล้ว ให้ขอบคุณและชมว่าดูดี','look great = ดูดี, taste = รสชาติ')]),
 NPCDEF('mom3','Mom','Your mom⁣แม่ของเรา',-.6,1.5,-Math.PI/2,[.85,.45,.55],[.25,.22,.3],[.08,.06,.07],'bun',[
  TT("I can't read the sign. What does it say?",'แม่อ่านป้ายไม่ออก เขียนว่าอะไร',"It says \"Please wait here.\"","It says \"Please swim here.\"","What does it say?",'แม่ถามว่าป้ายเขียนว่าอะไร ให้อ่านป้ายให้แม่ฟัง','sign = ป้าย, It says ... = เขียนว่า ...'),
  TT("How long do we have to wait?",'ต้องรออีกนานไหม',"About ten minutes, Mom.","About ten kilometers, Mom.","How long do we have to wait?",'แม่ถามว่ารอนานไหม (How long) ให้ตอบเป็นเวลา','How long ...? = นานเท่าไร, minute = นาที'),
  TT("You did very well today. Are you hungry?",'วันนี้ลูกเก่งมาก หิวไหม',"Yes, I am. Let's eat at the market.","Yes, I do. Let's eat the market.","Are you hungry?",'แม่ถามด้วย Are you ...? ให้ตอบ Yes, I am. แล้วชวนไปกินข้าว','hungry = หิว, eat at = กินที่')]),
 NPCDEF('emma','Emma','Visitor from abroad⁣นักท่องเที่ยวชาวต่างชาติ',4.3,3.6,Math.PI,[.3,.6,.85],[.75,.7,.6],[.85,.7,.35],'long',[
  TT("Excuse me. Do you speak English?",'ขอโทษนะ พูดภาษาอังกฤษได้ไหม',"Yes, a little. Can I help you?","Yes, I speak Japanese.","Do you speak English?",'ชาวต่างชาติถามว่าพูดอังกฤษได้ไหม ให้ตอบว่าได้นิดหน่อยและเสนอความช่วยเหลือ','a little = นิดหน่อย, Can I help you? = ให้ช่วยไหม'),
  TT("I'm looking for the police station. Is it near here?",'กำลังหาสถานีตำรวจ อยู่ใกล้ ๆ นี้ไหม',"Yes. Go out and turn right. It's next to the market.","Yes. I'm a police officer.","Is it near here?",'ชาวต่างชาติถามทางไปสถานีตำรวจ ให้บอกทาง','turn right = เลี้ยวขวา, next to = ข้าง ๆ'),
  TT("Thank you so much! You're very kind.",'ขอบคุณมาก เธอใจดีจัง',"You're welcome. Have a nice day!","You're welcome. Have a nice nose!","You're very kind.",'ชาวต่างชาติขอบคุณ ให้ตอบ You\'re welcome. และอวยพร','kind = ใจดี, Have a nice day! = ขอให้เป็นวันที่ดี')])]});

