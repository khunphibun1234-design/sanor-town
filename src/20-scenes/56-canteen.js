/* ===== Our school: the canteen (from the teacher's map: "อาคารโรงอาหาร 60 ปี", 2 floors, orange-red roof, west of buildings 1-3) =====
   Ground floor only: an open hall on posts, food stalls along the back wall, long tables with benches.
   No roof slab is drawn (only the beams), so the 360-degree camera can always see inside. Stalls, menu and prices are
   made up for the game; NPC names are made up. The east entrance leads back to the flagpole yard. */
/* ===== ST-CNT-025-CR01 CS-3 (6 Nov, owner decisions): canteen shopping with a cart, simulated cash or a SAMPLE QR, and Free Shopping.
   Game prices from the owner (not real shop prices). No camera, no bank, no real payment, no personal data. A cart that is not paid
   is never saved (Back, ×, refresh = no charge). Confirm writes ONE transaction per shop visit. Seller and Bow lines that mention
   food, money or payment are built from the real purchases (t.dyn), so Hint, WHY and Feedback always match what was bought. ===== */
const SHOPI={/* price registry: shop, names, unit price in baht (null = not confirmed: shown but cannot be bought), status */
 rice_reg:{shop:'rice',en:'Rice and curry (regular)',th:'ข้าวราดแกง ธรรมดา',p:25,st:'confirmed',ic:'\u{1F35B}',one:'a plate of rice and curry',many:'plates of rice and curry',tho:'ข้าวราดแกงธรรมดา',un:'จาน',sz:'regular'},
 rice_big:{shop:'rice',en:'Rice and curry (large)',th:'ข้าวราดแกง พิเศษ',p:30,st:'confirmed',ic:'\u{1F35B}',one:'a large plate of rice and curry',many:'large plates of rice and curry',tho:'ข้าวราดแกงพิเศษ',un:'จาน',sz:'large'},
 noodle_soup:{shop:'noodle',en:'Noodle soup',th:'ก๋วยเตี๋ยวน้ำ',p:25,st:'confirmed',ic:'\u{1F35C}',one:'a bowl of noodle soup',many:'bowls of noodle soup',tho:'ก๋วยเตี๋ยวน้ำ',un:'ชาม'},
 guayjub:{shop:'noodle',en:'Guay jub',th:'ก๋วยจั๊บ',p:25,st:'confirmed',ic:'\u{1F963}',one:'a bowl of guay jub',many:'bowls of guay jub',tho:'ก๋วยจั๊บ',un:'ชาม'},
 water:{shop:'drinks',en:'Bottled water',th:'น้ำดื่ม',p:5,st:'confirmed',ic:'\u{1F4A7}',one:'a bottle of water',many:'bottles of water',tho:'น้ำดื่ม',un:'ขวด'},
 meatball:{shop:'drinks',en:'Meatball skewer',th:'ลูกชิ้น',p:5,st:'confirmed',ic:'\u{1F362}',one:'a meatball skewer',many:'meatball skewers',tho:'ลูกชิ้น',un:'ไม้'},
 bubble:{shop:'drinks',en:'Bubble milk tea',th:'ชาไข่มุก',p:20,st:'confirmed',ic:'\u{1F9CB}',one:'a bubble milk tea',many:'bubble milk teas',tho:'ชาไข่มุก',un:'แก้ว'},
 lemontea:{shop:'drinks',en:'Iced lemon tea',th:'ชามะนาว',p:20,st:'confirmed',ic:'\u{1F34B}',one:'an iced lemon tea',many:'iced lemon teas',tho:'ชามะนาว',un:'แก้ว'},
 cocoa:{shop:'drinks',en:'Iced cocoa',th:'โกโก้เย็น',p:20,st:'confirmed',ic:'\u{1F964}',one:'an iced cocoa',many:'iced cocoas',tho:'โกโก้เย็น',un:'แก้ว'}};
const NW=n=>{const a=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],
 t=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];if(n<20)return a[n];if(n<100)return t[Math.floor(n/10)]+(n%10?'-'+a[n%10]:'');
 const h=Math.floor(n/100),r=n%100;return a[h]+' hundred'+(r?' and '+NW(r):'')};
/* a number that sounds or looks close (twenty / twelve, fifteen / fifty), never the same number */
const NX=(n,not)=>{let c=(n%10===0&&n>=20&&n<=90)?10+n/10:(n>=13&&n<=19)?(n-10)*10:n+5;if(c===n||c===not)c=n+10;if(c===not)c=n+15;return c};
const CAP1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const AND=a=>a.length<2?(a[0]||''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const shLine=(id,q)=>q===1?SHOPI[id].one:NW(q)+' '+SHOPI[id].many;
const shList=items=>AND(items.map(x=>shLine(x.id,x.q)));
const shListTH=items=>items.map(x=>SHOPI[x.id].tho+' '+x.q+' '+SHOPI[x.id].un).join(' และ ');
const shTot=items=>items.reduce((s,x)=>s+SHOPI[x.id].p*x.q,0);
const shAll=tx=>{const m={};tx.forEach(t=>t.items.forEach(x=>{m[x.id]=(m[x.id]||0)+x.q}));return Object.keys(SHOPI).filter(k=>m[k]).map(id=>({id,q:m[id]}))};
/* a cart that is NOT what was chosen: another item from the same list (or one more of the first item) */
const shOther=(items,pool)=>{const alt=pool.filter(k=>!items.some(x=>x.id===k));
 if(items.length===1&&alt.length)return [{id:alt[0],q:items[0].q}];return items.map((x,j)=>j?x:{id:x.id,q:x.q+1})};
const shWhyNot=(items,who)=>'That is not what '+who+'. You '+(who==='you bought'?'bought':'chose')+' '+shList(items)+'. | ไม่ตรงกับที่'+(who==='you bought'?'ซื้อจริง เธอซื้อ':'เลือกในเมนู เธอเลือก')+' '+shListTH(items);
/* seller turn 3 (all three sellers): repeat the order back */
const shT3=c=>({npc:'So, '+shList(c.items)+'. Is that right?',th:'สรุปคือ '+shListTH(c.items)+' ใช่ไหม'});
/* seller turn 4: say how you pay (cash note or the SAMPLE QR) */
const shT4=c=>c.method==='qr'?{npc:"That's "+NW(c.total)+' baht, please.',th:'ทั้งหมด '+c.total+' บาทจ้ะ',
  o:["I'll pay by QR code, please.","I'll pay by QR code tomorrow.","I'll pay "+NW(NX(c.total))+' baht by QR code.'],
  hint:'บอกว่าจะจ่ายด้วย QR code ตามยอด '+c.total+' บาท',ok:"“I'll pay by QR code” tells the seller how you pay. | บอกวิธีจ่ายเงินด้วย QR",
  why:['You pay now, before you take your food. | ต้องจ่ายตอนนี้ ไม่ใช่พรุ่งนี้','The price is '+c.total+' baht. | ยอดที่ต้องจ่ายคือ '+c.total+' บาท']}
 :{npc:"That's "+NW(c.total)+' baht, please.',th:'ทั้งหมด '+c.total+' บาทจ้ะ',
  o:["Here's "+NW(c.given)+' baht.',"Here's "+NW(NX(c.given))+' baht.',"Here's "+NW(c.given)+' dollars.'],
  hint:'พูดจำนวนเงินที่เลือกจ่าย: '+c.given+' บาท',ok:"“Here's … baht” tells the seller how much you give. | บอกจำนวนเงินที่ให้แม่ค้า",
  why:[NX(c.given)+' baht is not the money you chose. You chose '+c.given+' baht. | ไม่ใช่จำนวนเงินที่เลือกจ่าย เธอเลือกจ่าย '+c.given+' บาท','We pay in baht, not dollars. | ที่โรงอาหารจ่ายเป็นบาท ไม่ใช่ดอลลาร์']};
/* seller turn 5: check the change (cash), or thank the seller (exact cash / QR) */
const shT5=c=>c.method==='qr'?{npc:'Payment confirmed in the game. Thank you!',th:'ยืนยันการจ่ายในเกมแล้ว ขอบคุณจ้ะ',
  o:['Thank you! Have a nice day.','Can I have my change, please?',"Here's "+NW(c.total)+' baht in cash, too.'],
  hint:'จ่าย QR ตามยอดพอดีแล้ว ให้ขอบคุณแม่ค้า',ok:'“Thank you! Have a nice day.” is a polite goodbye. | กล่าวขอบคุณและลาอย่างสุภาพ',
  why:['A QR payment is the exact amount, so there is no change. | จ่าย QR ตามยอดพอดี จึงไม่มีเงินทอน',"Don't pay twice. You already paid by QR. | ห้ามจ่ายซ้ำ เพราะจ่าย QR แล้ว"]}
 :c.change>0?{npc:'You gave me '+NW(c.given)+" baht. Here's your change.",th:'ให้มา '+c.given+' บาท นี่เงินทอนจ้ะ',
  o:['Thank you! '+CAP1(NW(c.change))+" baht. That's right.",'Thank you! '+CAP1(NW(NX(c.change)))+" baht. That's right.","You're welcome! Here's your change."],
  hint:'คิดเงินทอน: '+c.given+' − '+c.total+' = ?',ok:'You checked your change: '+c.given+' − '+c.total+' = '+c.change+'. | ตรวจเงินทอนถูกต้อง',
  why:[c.given+' − '+c.total+' = '+c.change+' baht. | เงินทอนคือ '+c.given+' − '+c.total+' = '+c.change+' บาท','The seller gives you the change, so you say thank you. | แม่ค้าเป็นคนทอน เราควรกล่าวขอบคุณ']}
 :{npc:"Thank you. That's the right amount. Enjoy your lunch!",th:'ขอบคุณจ้ะ จ่ายพอดีเลย ทานให้อร่อยนะ',
  o:['Thank you! Have a nice day.','Can I have my change, please?',"Sorry, I don't have enough money."],
  hint:'จ่ายพอดีแล้ว ให้ขอบคุณแม่ค้า',ok:'“Thank you! Have a nice day.” is a polite goodbye. | กล่าวขอบคุณและลาอย่างสุภาพ',
  why:['You paid the exact amount, so there is no change. | จ่ายพอดี จึงไม่มีเงินทอน','You have already paid. | เธอจ่ายเงินไปแล้ว']};
/* seller turn 2 for each shop */
const shT2={
 rice:c=>{const ps=c.items.map(x=>({sz:SHOPI[x.id].sz,q:x.q})),say=a=>CAP1(a.length===1&&a[0].q===1?a[0].sz:AND(a.map(p=>NW(p.q)+' '+p.sz)))+', please.';
  const w=ps.length===1?[{sz:ps[0].sz==='large'?'regular':'large',q:ps[0].q}]:ps.map((p,j)=>j?p:{sz:p.sz,q:p.q+1});
  return {o:[say(ps),say(w),'A bottle of water, please.'],why:[shWhyNot(c.items,'you chose'),'Auntie Pen is asking about the size of your rice. | แม่ค้าถามขนาดข้าว ไม่ได้ถามเรื่องน้ำ'],
   hint:'ตอบตามที่เลือกในเมนู: ธรรมดา = regular · พิเศษ = large'}},
 noodle:c=>({o:[CAP1(shList(c.items))+', please.',CAP1(shList(shOther(c.items,['noodle_soup','guayjub'])))+', please.','A plate of rice and curry, please.'],
  why:[shWhyNot(c.items,'you chose'),'Rice and curry is sold by Auntie Pen. | ข้าวราดแกงเป็นของร้านป้าเพ็ญ'],hint:'ตอบตามที่เลือกในเมนู: '+shListTH(c.items)}),
 drinks:c=>({o:[CAP1(shList(c.items))+', please.',CAP1(shList(shOther(c.items,['water','meatball','bubble','lemontea','cocoa'])))+', please.','A bowl of noodle soup, please.'],
  why:[shWhyNot(c.items,'you chose'),'Ms. Kaew sells drinks and meatballs, not noodles. | ร้านนี้ขายเครื่องดื่มและลูกชิ้น ไม่ได้ขายก๋วยเตี๋ยว'],hint:'ตอบตามที่เลือกในเมนู: '+shListTH(c.items)})};
/* Bow: what you got, the total, then money left (Guided) or how you paid (Free) */
const shB2=c=>({o:['I got '+shList(c.items)+'.','I got '+shList(shOther(c.items,Object.keys(SHOPI)))+'.','I got '+shList(c.items.map((x,j)=>j===c.items.length-1?{id:x.id,q:x.q+1}:x))+'.'],
 why:[shWhyNot(c.items,'you bought'),shWhyNot(c.items,'you bought')],hint:'บอกของที่ซื้อจริงทั้งหมด: '+shListTH(c.items),
 ok:'“I got …” tells what you bought. | ใช้บอกสิ่งที่ซื้อมาจริง'});
const shB3=c=>({o:['It was '+NW(c.grand)+' baht all together.','It was '+NW(NX(c.grand))+' baht all together.','It was '+NW(c.grand)+' dollars all together.'],
 why:['You spent '+c.grand+' baht in all. | รวมทุกร้านแล้ว '+c.grand+' บาท','We pay in baht, not dollars. | ที่โรงอาหารใช้เงินบาท ไม่ใช่ดอลลาร์'],
 hint:'รวมราคาทุกร้าน = '+c.grand+' บาท',ok:'“all together” means the total. | all together = รวมทั้งหมด'});
const shB4=c=>c.left!=null?{npc:'How much money do you have left?',th:'เธอเหลือเงินเท่าไร',
  o:['I have '+NW(c.left)+' baht left.','I have '+NW(NX(c.left,c.grand))+' baht left.','I spent '+NW(c.left)+' baht left.'],
  why:[c.budget+' − '+c.grand+' = '+c.left+' baht. | '+c.budget+' − '+c.grand+' = '+c.left+' บาท','“Spent” and “left” do not go together. Say “I have … left.” | ใช้ I have … left เพื่อบอกเงินที่เหลือ'],
  hint:c.budget+' − '+c.grand+' = ?',ok:'“I have … baht left” tells the money you still have. | บอกเงินคงเหลือ'}
 :(m=>({npc:'How did you pay?',th:'เธอจ่ายเงินแบบไหน',
  o:[m.cash&&m.qr?'I paid by cash and by QR code.':m.qr?'I paid by QR code.':'I paid by cash.',m.cash&&m.qr?'I paid by cash only.':m.qr?'I paid by cash.':'I paid by QR code.','I paid by credit card.'],
  why:['That is not how you paid. | ไม่ตรงกับวิธีที่จ่ายจริง','There is no card payment in this game. | ในเกมนี้ไม่มีการจ่ายด้วยบัตร'],
  hint:'บอกวิธีจ่ายที่ใช้จริง: '+(m.cash&&m.qr?'เงินสดและ QR':m.qr?'QR code':'เงินสด'),ok:'“I paid by …” tells how you paid. | บอกวิธีจ่ายเงิน'}))(c.methods);
/* a turn built from the purchase (t.dyn); the stored text is a worked example (used by Phrases, documents and the review game) */
const DT=(npc,th,ok,f,ex)=>{const r=Object.assign({npc,th,ok},f(ex));return {npc:r.npc,th:r.th,o:r.o,hint:r.hint,ok:r.ok,why:r.why,dyn:f}};
const DT3=ex=>Object.assign(TT('','',"Yes, that's right. How much is it?","Yes, that's right. How many is it?","No, that's right. How much is it?",'ตอบรับว่าถูกต้อง แล้วถามราคาด้วย How much',"“How much is it?” asks the price. | ใช้ถามราคา"),
 shT3(ex),{dyn:shT3,after:'pay',why:['“How many” asks the number. Ask the price with “How much”. | How many ถามจำนวน ถามราคาใช้ How much','“No” does not go with “that\'s right”. | No ขัดกับ that\'s right']});
/* worked examples for the stored text */
const SHX={rice:{items:[{id:'rice_reg',q:1}],total:25,method:'cash',given:50,change:25},noodle:{items:[{id:'noodle_soup',q:1}],total:25,method:'qr',given:25,change:0},
 drinks:{items:[{id:'water',q:1}],total:5,method:'cash',given:5,change:0},bow:{items:[{id:'rice_reg',q:1},{id:'water',q:1}],grand:30,left:20,budget:50,methods:{cash:true,qr:false}}};
SCENES.push({id:'canteen',name:'School Canteen · Phibun School',th:'โรงอาหาร 60 ปี',color:'#C2410C',orbit:true,
 /* ST-CNT-004 V1.2 choice-based lunch: pick ONE food seller (rice OR noodle), then water, then Bow = 3/3.
    budget/prices are game prices from the teacher; money left is worked out from what was bought (never stored). */
 shop:{budget:50,keep:5,max:5,legacy:{rice:'rice_reg',noodle:'noodle_soup',drinks:'water'},
  msg:{freebow:['Buy something first, then come and sit with me!','ไปซื้ออะไรก่อน แล้วค่อยมานั่งด้วยกันนะ'],paid:['You have already paid at this shop. Thank you!','เธอจ่ายเงินที่ร้านนี้แล้ว ขอบคุณจ้ะ'],
   nomoney:["I don't have enough money for this shop.",'เงินที่เหลือไม่พอซื้อของร้านนี้']}},
 choice:{group:['rice','noodle'],budget:50,price:{rice:25,noodle:25,drinks:5},need:{drinks:['meal'],bow:['meal','drinks']},
  msg:{start:['Choose ONE meal shop. You have 50 baht. Pay at each shop.','เลือกร้านอาหารหลัก 1 ร้าน มีเงิน 50 บาท จ่ายเงินแยกแต่ละร้าน'],
   other:['Enjoy your lunch! You have already bought your meal.','ขอให้อร่อยนะ เธอซื้ออาหารหลักแล้ว'],
   bow:['See you at the table! Buy your lunch and a drink or a snack first.','เจอกันที่โต๊ะนะ ไปซื้ออาหารและเครื่องดื่มหรือลูกชิ้นก่อน'],
   drinks:['Please buy your meal first, then come back for a drink or a snack.','ซื้ออาหารหลักก่อน แล้วค่อยกลับมาซื้อเครื่องดื่มหรือลูกชิ้นนะ'],
   done:['Great job! You spent 25 baht and have 25 baht left.','เยี่ยมมาก ใช้เงิน 25 บาท เหลือ 25 บาท'],
   again:['Play again with the other meal?','เล่นอีกครั้งโดยเลือกอาหารอีกอย่างไหม']}},spawn:[7.8,3.2,-Math.PI/2],bounds:[-9,9,-6.4,6.4],
 exits:[{x0:8.5,x1:9,z0:2.2,z1:4.2,to:'flagpole',at:[-1.5,-11.1,0]}],/* the east entrance leads back to the dome (arrive at the back path, facing into the dome) */
 build(){const c=mk();
  const POST=[.86,.84,.8],BEAM=[.82,.38,.23],WALL=[.94,.9,.82],TOP=[.72,.74,.76],BENCH=[.45,.5,.56];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,0,19.6,.06,14.4,[.78,.77,.73]);
  for(let i=0;i<9;i++)for(let j=0;j<6;j++)if((i+j)%2)c.box(-8+i*2,.065,-5+j*2,2,.01,2,[.74,.73,.69]);
  /* back wall with the stalls, posts around the open sides, orange-red beams on top */
  c.box(0,1.35,-7,19.6,2.7,.2,WALL,true);c.box(0,2.75,-7,19.8,.1,.3,BEAM);
  /* posts on the open sides (orange caps stand for the roof edge; the roof itself is left out so the camera can see in) */
  const post=(x,z)=>{c.box(x,1.5,z,.3,3,.3,POST,true);c.box(x,3.05,z,.4,.12,.4,BEAM)};
  for(let x=-9.6;x<=9.61;x+=3.2)post(x,6.9);
  for(let z=-3.6;z<=6.91;z+=3.5){post(-9.6,z);if(z<2||z>4.5)post(9.6,z)}
  /* three stalls: rice and curry, noodles, drinks */
  c.counter(-6,-5.6,3.4,[.82,.84,.86]);c.counter(-.6,-5.6,3.4,[.82,.84,.86]);c.counter(4.8,-5.6,3.4,[.82,.84,.86]);
  [[.3,.55,.2],[.85,.6,.2],[.6,.75,.3],[.75,.3,.15],[.95,.9,.7]].forEach((col,k)=>c.box(-7.3+k*.65,1.2,-5.5,.55,.08,.45,col));
  c.box(-1.6,1.4,-5.65,.6,.5,.6,[.7,.72,.75]);c.box(-.7,1.35,-5.65,.6,.4,.6,[.7,.72,.75]);c.box(.4,1.25,-5.6,1,.2,.5,[.95,.95,.9]);
  c.box(6.6,1,-6.4,.9,2,.7,[.85,.25,.25]);c.box(6.6,1.1,-6.04,.75,1.5,.02,[.75,.9,.95]);
  for(let k=0;k<6;k++)c.box(3.6+k*.32,1.28,-5.5,.16,.28,.16,k%2?[.6,.85,.95]:[.95,.6,.3]);
  /* long tables with benches (3 x 3) */
  const tbl=(x,z)=>{c.box(x,.75,z,3.2,.08,.9,TOP);c.box(x-1.3,.37,z,.12,.74,.7,[.5,.52,.55]);c.box(x+1.3,.37,z,.12,.74,.7,[.5,.52,.55]);
   c.box(x,.45,z-.75,3.2,.07,.32,BENCH);c.box(x,.45,z+.75,3.2,.07,.32,BENCH);c.ob.push([x-1.6,x+1.6,z-.95,z+.95])};
  const eat=(x,z,f,girl)=>{const p=z-.75*f;c.box(x,.97,p,.42,.52,.24,[.97,.97,.95]);c.box(x,1.39,p,.32,.32,.28,[.86,.66,.5]);
   c.box(x,1.58,p,.34,.08,.32,[.08,.06,.06]);if(girl)c.box(x,1.4,p-.15*f,.34,.3,.06,[.08,.06,.06]);
   c.box(x,.81,z-.25*f,.36,.04,.3,[.95,.95,.92]);c.box(x,.85,z-.25*f,.2,.05,.16,[.9,.6,.3])};
  for(const x of [-5,0,5])for(const z of [-1.9,1.3,4.5])tbl(x,z);
  eat(-5.8,-1.9,1,true);eat(-4.2,-1.9,-1,false);eat(.8,-1.9,1,false);eat(-.8,1.3,-1,true);eat(4.2,1.3,1,false);eat(5.8,1.3,1,true);eat(-5,4.5,-1,false);eat(.6,4.5,1,true);
  /* hand-washing sinks (west side) and a tray return rack */
  c.box(-9.05,.45,1.5,.6,.9,3,[.85,.87,.9],true);c.box(-9.05,.92,1.5,.5,.06,2.8,[.75,.85,.92]);
  for(let k=0;k<3;k++)c.box(-9.25,1.15,.6+k*.9,.06,.4,.06,[.6,.62,.65]);
  c.box(-8.7,.7,-3.6,.8,1.4,1.6,[.55,.57,.6],true);for(let k=0;k<4;k++)c.box(-8.7,.3+k*.3,-3.6,.82,.04,1.62,[.4,.42,.45]);
  /* way out: arrow to the east entrance and a sign beside it */
  wayMarks(c,7.1,3.2,1,0,1);c.box(8.8,1.1,.6,.14,2.2,.14,[.4,.4,.42],true);c.box(8.84,2.05,.6,.08,1.15,2.5,[.15,.42,.27]);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  ...[['-6','Rice & curry','ข้าวราดแกง','#b45309'],['-.6','Noodles','ก๋วยเตี๋ยว','#b91c1c'],['4.8','Drinks','เครื่องดื่ม','#0369a1']].map(([x,en,th,col])=>({x:+x,y:2.3,z:-6.88,w:2.8,h:.8,ry:0,cw:500,ch:150,draw:(g,W,H)=>{
   g.fillStyle=col;g.fillRect(0,0,W,H);g.strokeStyle='#fff7e6';g.lineWidth=6;g.strokeRect(6,6,W-12,H-12);g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 50px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(th,W/2,H*.36);g.font="600 38px Anuphan, sans-serif";g.fillText(en,W/2,H*.74)}})),
  ...[['-6','Rice and curry 25 · Large 30 baht','ข้าวราดแกง 25 · พิเศษ 30 บาท'],['-.6','Noodle soup · Guay jub 25 baht','ก๋วยเตี๋ยวน้ำ · ก๋วยจั๊บ 25 บาท'],['4.8','Water 5 · Meatball 5 · Drinks 20','น้ำ 5 · ลูกชิ้น 5 · ชา/โกโก้ 20 บาท']].map(([x,en,th])=>({x:+x,y:3.85,z:-6.86,w:3.3,h:.66,ry:0,cw:600,ch:120,draw:(g,W,H)=>{
   g.fillStyle='#fffbeb';g.fillRect(0,0,W,H);g.strokeStyle='#92400e';g.lineWidth=5;g.strokeRect(3,3,W-6,H-6);g.fillStyle='#1f2937';g.textAlign='center';g.textBaseline='middle';
   g.font="700 42px Anuphan, sans-serif";g.fillText(en,W/2,H*.33,W-24);g.font="600 36px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(th,W/2,H*.74,W-24)}})),
  Object.assign(waySign(8.84-.06,.6,-Math.PI/2,'Multipurpose Dome','โดมอเนกประสงค์','↑'),{x:8.78})],
 npcs:[
 NPCDEF('rice','Auntie Pen','Rice and curry seller⁣แม่ค้าข้าวราดแกง',-6,-6.5,0,[.95,.6,.3],[.25,.22,.28],[.08,.06,.07],'bun',[
  Object.assign(TT("Hello! What would you like for lunch?","สวัสดีจ้ะ กลางวันนี้จะรับอะไรดี","I'd like rice and curry, please.","I'd like a bowl of noodle soup, please.","I'd like a bottle of water, please.","คุณอยู่ที่ร้านข้าวราดแกง ให้สั่งข้าวอย่างสุภาพ","“I'd like …, please” is a polite way to order food. | ใช้สั่งอาหารอย่างสุภาพ"),{after:'menu'}),
  DT("Regular or large?","ธรรมดาหรือพิเศษจ๊ะ","“Regular” and “large” tell the size you want. | บอกขนาดที่ต้องการ",shT2.rice,SHX.rice),
  DT3(SHX.rice),DT('','','',shT4,SHX.rice),DT('','','',shT5,SHX.rice)]),
 NPCDEF('noodle','Uncle Chai','Noodle seller⁣ลุงขายก๋วยเตี๋ยว',-.6,-6.5,0,[.97,.97,.95],[.2,.2,.26],[.1,.08,.07],'cap',[
  Object.assign(TT("Hello! What would you like?","สวัสดี จะรับอะไรดี","I'd like some noodles, please.","I'd like some rice and curry, please.","I'd like a bottle of noodles, please.","คุณอยู่ที่ร้านก๋วยเตี๋ยว ให้สั่งอย่างสุภาพ","“I'd like some noodles, please” orders politely. | สั่งก๋วยเตี๋ยวอย่างสุภาพ"),{after:'menu'}),
  DT("Noodle soup or guay jub?","ก๋วยเตี๋ยวน้ำหรือก๋วยจั๊บ","You named the noodles you chose. | ระบุเมนูที่เลือกได้ถูกต้อง",shT2.noodle,SHX.noodle),
  DT3(SHX.noodle),DT('','','',shT4,SHX.noodle),DT('','','',shT5,SHX.noodle)]),
 NPCDEF('drinks','Ms. Kaew','Drink and snack seller⁣แม่ค้าเครื่องดื่มและลูกชิ้น',4.8,-6.5,0,[.4,.7,.9],[.2,.2,.26],[.08,.06,.07],'long',[
  Object.assign(TT("Hello! What can I get you?","สวัสดีจ้ะ จะรับอะไรดี","Can I see the menu, please?","Can you see the menu, please?","Can I see the money, please?","ขอดูเมนูก่อนเลือก","“Can I see the menu, please?” asks to look at the menu. | ขอดูเมนูอย่างสุภาพ"),{after:'menu'}),
  DT("Sure. Here's the menu. What would you like?","ได้จ้ะ นี่เมนู จะรับอะไรดี","You ordered what you chose. | สั่งตรงกับที่เลือก",shT2.drinks,SHX.drinks),
  DT3(SHX.drinks),DT('','','',shT4,SHX.drinks),DT('','','',shT5,SHX.drinks)]),
 NPCDEF('bow','Bow','Friend⁣เพื่อน',2.5,3,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'long',[
  TT("Hey! There's a free seat here. Come and sit with me.","เฮ้ ตรงนี้มีที่ว่าง มานั่งด้วยกันสิ","Thanks! I'll sit here.","Thanks! I'll stand here.","Thanks! I'll sit outside instead.","Bow ชวนให้นั่งข้างเธอ","“I'll sit here” accepts the invitation. | ตอบรับคำชวนให้นั่ง"),
  DT("What did you get for lunch?","เธอซื้ออะไรมากินกลางวัน","",shB2,SHX.bow),
  DT("Wow! How much was it all together?","ว้าว รวมทั้งหมดกี่บาท","",shB3,SHX.bow),
  DT('','','',shB4,SHX.bow),
  TT("Let's return our plates after lunch.","กินเสร็จแล้วเอาจานไปเก็บกันนะ","Good idea! Let's return them together.","Let's leave them on the table.","Good idea! Let's buy more plates.","ตอบรับคำชวนไปเก็บจานด้วยกัน","“Let's return them together” accepts the plan. | ตอบรับและชวนไปเก็บจานด้วยกัน")])]});

