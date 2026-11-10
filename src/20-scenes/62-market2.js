/* ===== Our school: the street market across the road from Gate 1, after school (last scene of the school day) =====
   Moved out of the Gate 1 scene: the same four stalls and sellers (same dialogue), now on their own.
   The road and the school fence are at the back (north); cross on the zebra crossing to go back to Gate 1.
   Stalls, menu and prices are made up for the game; NPC names are made up. */
SCENES.push({id:'market2',name:'Street Market · Phibun School',th:'ตลาดหน้าโรงเรียน (หลังเลิกเรียน)',color:'#EA580C',orbit:true,spawn:[0,1.4,0],bounds:[-12.4,12.4,-1.4,8.6],
 exits:[{x0:-1.6,x1:1.6,z0:-1.4,z1:-.8,to:'gate1',at:[-6,4.4,Math.PI]}],/* the zebra crossing leads back to Gate 1 */
 build(){const c=mk();
  const CREAM=[.94,.9,.82],CAP=[.18,.37,.66],Z=1.6;
  c.box(0,-.06,0,140,.12,140,[.47,.68,.36]);
  /* road with the zebra crossing (only the crossing is walkable), school sidewalk and fence on the far side */
  c.box(0,.02,-2.4,40,.06,4.4,[.36,.37,.41]);for(let x=-15;x<=15;x+=3.2)if(Math.abs(x)>2.6)c.box(x,.06,-2.4,1.4,.02,.16,[.95,.9,.5]);
  for(let z=-4.25;z<-.4;z+=.8)c.box(0,.06,z,3.2,.02,.42,[.97,.97,.95]);
  c.ob.push([-20,-1.7,-4.6,-.2],[1.7,20,-4.6,-.2]);
  c.box(0,.05,-6.3,40,.1,3.4,[.8,.79,.76]);c.box(0,.1,-4.55,40,.12,.18,[.62,.62,.6]);
  c.box(0,.05,4.2,40,.1,8.6,[.8,.79,.76]);c.box(0,.1,-.15,40,.12,.18,[.62,.62,.6]);
  for(const [x0,x1] of [[-20,-3.4],[3.4,20]])c.box((x0+x1)/2,.8,-8.2,x1-x0,1.6,.35,CREAM);
  for(let x=-19;x<=19;x+=3)if(Math.abs(x)>3.4)c.box(x,1.75,-8.2,.5,.3,.5,CAP);
  for(const x of [-3.75,3.75]){c.box(x,1.6,-8.2,1.1,3.2,1.1,CREAM);c.box(x,3.38,-8.2,1.4,.35,1.4,CAP)}
  for(const [bx,w] of [[-8,8],[8,8]]){c.box(bx,5.4,-14,w,10.8,3.4,[.93,.9,.84]);c.box(bx,10.95,-14,w+.6,.3,4,[.91,.93,.91]);
   for(let f=0;f<3;f++)for(let k=-1;k<=1;k++)c.box(bx+k*2.4,2.4+f*3.6,-12.28,1.5,1.3,.04,WIN)}
  /* four stalls with their backs to the road, sellers in front on the walkway; gap at the crossing */
  const stall=(x,roof,items)=>{c.counter(x,Z,3,[.95,.95,.92]);
   for(const dx of [-1.45,1.45])c.box(x+dx,1.3,Z+.95,.12,2.6,.12,[.5,.5,.55]);
   for(let k=0;k<4;k++)c.box(x-1.2+k*.8,2.62,Z+.15,.8,.12,2.2,k%2?[.97,.97,.95]:roof);
   items(x)};
  stall(-9,[.85,.2,.2],x=>{c.box(x-.6,1.3,Z,.9,.25,.6,[.25,.25,.27]);for(let k=0;k<6;k++)c.box(x-.95+k*.14,1.5,Z,.05,.3,.05,k%2?[.62,.38,.2]:[.82,.33,.3]);
   for(const [dx,cl] of [[.5,[.95,.85,.3]],[.9,[.9,.4,.2]]])c.box(x+dx,1.25,Z,.3,.2,.3,cl)});
  stall(-3.5,[.95,.55,.15],x=>{c.box(x-.4,1.25,Z,1.6,.15,.7,[.15,.15,.16]);for(let k=0;k<5;k++)c.box(x-1+k*.3,1.37,Z,.12,.08,.5,[.72,.42,.32]);
   c.box(x+.95,1.4,Z,.6,.45,.6,[.85,.75,.55])});
  stall(3.5,[.2,.55,.85],x=>{for(const [dx,cl] of [[-1.1,[.85,.6,.4]],[-.7,[.95,.4,.6]],[-.3,[.4,.75,.95]],[.1,[.6,.9,.4]]])c.box(x+dx,1.35,Z,.22,.36,.22,cl);
   c.box(x+.85,1.45,Z,.7,.6,.6,[.3,.6,.9])});
  stall(9,[.3,.65,.3],x=>{for(const [dx,cl] of [[-1.05,[.98,.8,.2]],[-.6,[.4,.75,.3]],[-.15,[.9,.25,.3]],[.3,[.98,.8,.2]],[.75,[.95,.55,.5]]])c.box(x+dx,1.27,Z-.05,.32,.2,.5,cl);
   c.box(x+1.15,1.3,Z,.3,.3,.3,[.8,.85,.95])});
  /* after school: students with school bags walking around, a parked motorbike */
  const kid=(x,z,girl,bag)=>{c.box(x-.1,.3,z,.14,.6,.16,[.12,.16,.33]);c.box(x+.1,.3,z,.14,.6,.16,[.12,.16,.33]);if(girl)c.box(x,.55,z,.46,.3,.3,[.12,.16,.33]);
   c.box(x,.95,z,.46,.62,.26,[.97,.97,.95]);c.box(x,1.48,z,.34,.36,.3,[.86,.66,.5]);c.box(x,1.69,z-.02,.36,.1,.34,[.08,.06,.06]);
   c.box(x,1.05,z+.2,.38,.5,.16,bag);c.ob.push([x-.3,x+.3,z-.3,z+.3])};
  kid(-6.2,5.2,true,[.85,.3,.4]);kid(-5.6,5.6,false,[.2,.4,.75]);kid(6.4,6.4,false,[.25,.25,.28]);kid(2.8,6.6,true,[.95,.75,.2]);kid(-10.6,7.4,false,[.3,.6,.35]);
  c.box(10.6,.45,6.8,.3,.5,1.6,[.75,.15,.15]);c.box(10.6,.3,6.15,.12,.6,.12,[.15,.15,.16]);c.box(10.6,.3,7.45,.12,.6,.12,[.15,.15,.16]);c.box(10.6,.95,6.4,.5,.12,.5,[.12,.12,.12]);c.ob.push([10.3,10.9,5.9,7.7]);
  for(const x of [-11,-4,4,11])c.tree(x,8.4);c.lamp(-6.5,7.6);c.lamp(6.5,7.6);
  /* way back: arrow on the zebra crossing and a sign beside it */
  wayMarks(c,0,.2,0,-1,1);
  /* sign to Gate 1 on two posts over the gap at the crossing */
  for(const x of [-1.9,1.9])c.box(x,1.95,1.2,.12,3.9,.12,[.5,.5,.55],true);c.box(0,3.35,1.2,3.6,.9,.08,[.15,.42,.27]);
  /* market banner at the front (south) entrance of the market walkway */
  for(const x of [-1.9,1.9])c.box(x,1.45,8.2,.12,2.9,.12,[.5,.5,.55],true);c.box(0,2.4,8.2,3.6,.9,.08,[.92,.35,.05]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[{x:0,y:3.35,z:1.27,w:3.4,h:.8,ry:0,cw:560,ch:132,draw:(g,W,H)=>{g.fillStyle='#1f6f43';g.fillRect(0,0,W,H);g.strokeStyle='#f4f1e6';g.lineWidth=6;g.strokeRect(6,6,W-12,H-12);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 60px Anuphan, sans-serif";g.fillText('↑',W*.1,H*.52);
   {let f=40,t='ประตู 1 โรงเรียนพิบูลมังสาหาร';g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W*.76&&f>20){f-=2;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,W*.56,H*.38)}g.font="600 32px Anuphan, sans-serif";g.fillText('School Gate 1',W*.56,H*.76)}},
  {x:0,y:2.4,z:8.27,w:3.4,h:.8,ry:0,cw:560,ch:132,draw:(g,W,H)=>{g.fillStyle='#ea580c';g.fillRect(0,0,W,H);g.strokeStyle='#fff7e6';g.lineWidth=6;g.strokeRect(6,6,W-12,H-12);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 46px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('ตลาดหน้าโรงเรียน',W/2,H*.38);
   g.font="600 34px Anuphan, sans-serif";g.fillText('Street Market',W/2,H*.76)}}],
 npcs:[
 NPCDEF('meatball','Auntie Lamai','Meatball seller⁣แม่ค้าลูกชิ้นทอด',-9,2.55,0,[.9,.45,.45],[.25,.22,.28],[.08,.06,.07],'bun',[
  TT("Hi! Fried meatballs and sausages! Ten baht a stick.",'สวัสดีจ้ะ ลูกชิ้นทอด ไส้กรอกทอด ไม้ละสิบบาทจ้ะ',"Two sticks of meatballs, please.","Two meatballs of sticks, please.","Two cups of milk tea, please.",'แม่ค้าบอกราคา ให้สั่งลูกชิ้นพร้อมบอกจำนวน',"Good! Two sticks of meatballs tells the seller how many you want. | two sticks of ... = ... สองไม้"),
  TT("Would you like sweet sauce or spicy sauce?",'เอาน้ำจิ้มหวานหรือน้ำจิ้มเผ็ดจ๊ะ',"Sweet sauce, please.","Yes, I would.","Two sticks of meatballs, please.",'ถามให้เลือก A หรือ B ให้ตอบสิ่งที่เลือก ไม่ตอบ Yes',"Right! For A or B questions, answer with your choice. | A or B? ตอบด้วยสิ่งที่เลือก เช่น Sweet sauce, please."),
  TT("Here you are. That's twenty baht.",'นี่จ้ะ ยี่สิบบาทจ้ะ',"Here you are. Thank you!","Here you are. Ten baht.","Ten baht a stick, please.",'แม่ค้าบอกราคารวม ให้ยื่นเงินและขอบคุณ',"Good! Say Here you are. when you hand over the money. | Here you are. = นี่ครับ/ค่ะ ใช้ตอนยื่นเงินหรือของ")]),
 NPCDEF('pork','Uncle Sombat','Grilled pork seller⁣ลุงขายหมูปิ้ง',-3.5,2.55,0,[.95,.75,.3],[.2,.2,.24],[.6,.6,.62],'cap',[
  TT("Good afternoon! Would you like grilled pork?",'สวัสดีจ้ะ เอาหมูปิ้งไหม',"Yes, please. I'd like three sticks.","Yes, please. I'd like a bag of mango.","Yes, please. I'd like three cups.",'ลุงชวนซื้อหมูปิ้ง ให้ตอบรับและบอกจำนวน',"Good! I'd like three sticks orders politely. | I'd like ... = ฉันต้องการ ..., three sticks = สามไม้"),
  TT("Do you want sticky rice too?",'เอาข้าวเหนียวด้วยไหม',"Yes, one bag, please.","It's very hot today.","Yes, one cup, please.",'ลุงถามว่าเอาข้าวเหนียวด้วยไหม ให้ตอบรับและบอกจำนวนห่อ',"Good! Sticky rice comes in a bag. Too means also. | one bag = หนึ่งห่อ, too = ด้วย"),
  TT("The pork is hot. Be careful!",'หมูร้อนนะ ระวังด้วย',"OK, thanks. I'll be careful.","OK. I'll eat it all now.","OK. I'll touch it now.",'ลุงเตือนว่าร้อน ให้รับคำและบอกว่าจะระวัง',"Safe answer! Be careful because the pork is hot. | be careful = ระวัง")]),
 NPCDEF('drink','Ms. Fon','Drink seller⁣แม่ค้าน้ำหวาน',3.5,2.55,0,[.4,.75,.85],[.2,.22,.3],[.1,.07,.06],'long',[
  TT("Hello! What would you like to drink?",'สวัสดีจ้ะ จะดื่มอะไรดีจ๊ะ',"An iced milk tea, please.","I'd like sticky rice, please.","An iced milk tea, thanks you.",'ถามว่าจะดื่มอะไร ให้สั่งเครื่องดื่ม',"Good! An iced milk tea, please. orders a drink politely. | iced milk tea = ชานมเย็น"),
  TT("Small or large?",'แก้วเล็กหรือแก้วใหญ่จ๊ะ',"Small, please.","Yes, please.","An iced milk tea, please.",'ถามให้เลือกขนาด ให้ตอบขนาดที่เลือก ไม่ตอบ Yes',"Right! Choose small or large in your answer. | small = แก้วเล็ก, large = แก้วใหญ่"),
  TT("Do you want less sugar?",'เอาหวานน้อยไหมจ๊ะ',"Yes, please. Less sugar.","Yes, it is. It's small.","Small or large?",'ถามว่าเอาหวานน้อยไหม (Do you want ...?) ให้ตอบรับ',"Good! Less sugar means not too sweet. | less sugar = หวานน้อย")]),
 NPCDEF('fruit','Auntie Jan','Fruit seller⁣แม่ค้าผลไม้',9,2.55,0,[.35,.7,.35],[.25,.22,.2],[.1,.08,.07],'hat',[
  TT("Fresh fruit! Mango, watermelon and guava!",'ผลไม้สดจ้า มะม่วง แตงโม ฝรั่งจ้า',"How much is the mango?","How much is the milk tea?","How many is the mango?",'แม่ค้าบอกว่ามีผลไม้อะไรบ้าง ให้ถามราคา',"Good! Ask How much is ...? to know the price. | How much is ...? = ... ราคาเท่าไร"),
  TT("Twenty baht a bag. It's very sweet today.",'ถุงละยี่สิบบาท วันนี้หวานมากจ้ะ',"OK. One bag of mango, please.","One stick of meatballs, please.","How much is the mango?",'ได้ราคาแล้ว ให้สั่งมะม่วงหนึ่งถุง',"Good! A bag of mango orders one bag. | a bag of ... = ... หนึ่งถุง"),
  TT("Do you want some chilli salt?",'เอาพริกเกลือไหมจ๊ะ',"Yes, please. I like it.","Yes, I am. I like it.","Yes, please. I likes it.",'ถามว่าเอาพริกเกลือไหม ให้ตอบรับ',"Good! Yes, please. accepts the offer. Chilli salt is a dip for fruit. | chilli salt = พริกเกลือ")])]});

