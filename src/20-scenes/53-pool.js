/* ===== Our school: School Swimming Pool (ST-CNT-017 V1.0, owner approved 4 Nov with D1-D4). Reached from the Football Field
   (north path, owner decision D4 of 3 Nov). After-School Pool Safety Check at 16:15: one adult supervisor and three students; the
   player stays on the pool deck and nobody is in the water (D4 of 4 Nov). Spots from the spec: A pool safety sign (Ms. Benjamas),
   B changing-area entrance (Prawin), C bench with equipment (Arisa), D pool deck beside the adult station (Natdanai).
   No drowning, rescue or medical content. NPC names are made up. ===== */
SCENES.push({id:'pool',name:'School Swimming Pool · Phibun School',th:'สระว่ายน้ำโรงเรียน',color:'#0E9FB3',orbit:true,spawn:[0,5.3,Math.PI],bounds:[-8.8,8.8,-6.2,6.2],
 exits:[{x0:-1,x1:1,z0:5.9,z1:6.4,to:'football',at:[3.5,-7.4,0]}],/* the south gate leads back to the football field */
 build(){const c=mk();
  const DECK=[.86,.84,.8],DECK2=[.82,.8,.76],TILE=[.95,.96,.97],WATER=[.35,.72,.9],WATER2=[.25,.62,.85],WALL=[.94,.95,.96],POST=[.5,.52,.56],WOOD=[.62,.45,.3];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<9;i++)for(let j=0;j<7;j++)c.box(-8+i*2,.03,-5.4+j*1.8,2,.04,1.8,(i+j)%2?DECK:DECK2);
  /* the pool: a tiled rim, water and lane ropes; nobody is in the water */
  c.box(0,.1,-1.2,11,.14,5.4,TILE,true);c.box(0,.12,-1.2,10.4,.14,4.8,WATER);
  for(let k=0;k<4;k++)c.box(0,.18,-3.6+(k+1)*.96,10.4,.03,.06,k%2?[.95,.85,.2]:[.95,.3,.3]);
  c.box(3.8,.15,-1.2,2.8,.02,4.8,WATER2);/* deeper colour marks the deep east end; the west end is shallow */
  c.box(4.9,.4,1.25,.06,.7,.06,POST);c.box(4.6,.4,1.25,.06,.7,.06,POST);c.box(4.75,.72,1.25,.36,.05,.05,POST);/* ladder */
  c.box(-3.8,.5,1.97,.06,1,.06,POST);c.box(-3.8,.95,1.98,1.14,.36,.04,[.05,.5,.6]);/* a small 'Shallow water' sign at the near edge */
  /* fence around the pool area with a gate on the south side */
  const fence=(x,z,sx,sz)=>c.box(x,.6,z,sx,1.2,sz,[.75,.82,.88],true);
  fence(0,-6.6,18.4,.12);fence(-9.2,0,.12,13.4);fence(9.2,0,.12,13.4);fence(-5.1,6.6,8.2,.12);fence(5.1,6.6,8.2,.12);
  c.box(-1.1,1,6.6,.2,2,.2,POST,true);c.box(1.1,1,6.6,.2,2,.2,POST,true);c.box(0,2.05,6.6,2.4,.2,.25,[.05,.5,.6]);
  c.box(0,.04,7.6,1.6,.04,2,[.76,.75,.71]);
  /* A: pool safety sign board by the entrance */
  c.box(-3.2,.7,4.6,.12,1.4,.12,POST,true);c.box(-3.2,1.45,4.6,2,1.1,.08,[.95,.95,.9]);
  /* B: changing-area entrance with a shower on the west side */
  c.box(-8,1.2,2.4,1.6,2.4,3.4,WALL,true);c.box(-7.18,1,2.4,.05,2,1,[.3,.45,.6]);c.box(-8,2.45,2.4,1.8,.1,3.6,[.05,.5,.6]);
  c.box(-6.6,1.1,4.4,.08,2.2,.08,POST,true);c.box(-6.45,2.15,4.4,.3,.06,.18,[.7,.72,.75]);c.box(-6.6,.05,4.4,.9,.04,.9,[.7,.8,.85]);
  /* C: bench with swim caps, goggles and towels on the north side */
  c.box(-1.4,.3,-5.5,3.2,.1,.7,WOOD);for(const x of [-2.8,0])c.box(x,.15,-5.5,.12,.3,.6,POST);c.ob.push([-3,.2,-5.85,-5.15]);
  for(const [x,col] of [[-2.4,[.2,.5,.9]],[-1.9,[.95,.4,.6]],[-1.4,[.95,.85,.2]]])c.box(x,.42,-5.5,.3,.14,.3,col);
  for(const x of [-.9,-.5])c.box(x,.38,-5.5,.3,.05,.12,[.15,.15,.18]);c.box(.1,.4,-5.5,.6,.1,.5,[.98,.98,.95]);c.box(.1,.5,-5.5,.6,.1,.5,[.4,.75,.95]);
  /* D: adult station on the east side: a high chair, a whistle on a small table and a ring buoy on a stand */
  c.box(7,1,1.6,1,.08,1,POST);for(const [dx,dz] of [[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]])c.box(7+dx,.5,1.6+dz,.08,1,.08,POST);c.box(7,1.4,1.95,1,.7,.08,[.95,.85,.2]);c.ob.push([6.4,7.6,1,2.2]);
  c.box(7.2,.4,3.4,.7,.8,.6,[.8,.82,.86],true);c.box(7.2,.84,3.4,.12,.06,.08,[.95,.3,.3]);
  c.box(8.4,.7,-1,.08,1.4,.08,POST,true);c.box(8.33,1.2,-1,.08,.7,.7,[.95,.4,.3]);c.box(8.3,1.2,-1,.06,.4,.4,[.98,.98,.95]);
  c.bench(4,5);c.tree(-7.6,-5.2);c.tree(7.8,-5);
  /* way out: arrows to the south gate */
  wayMarks(c,0,4.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-3.2,y:1.45,z:4.65,w:1.9,h:1,ry:0,cw:400,ch:210,draw:(g,W,H)=>{g.fillStyle='#ecfeff';g.fillRect(0,0,W,H);g.fillStyle='#0e7490';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[["Walk, do not run.", "เดิน ห้ามวิ่ง"], ["Wait for an adult before entering.", "รอผู้ใหญ่ดูแลก่อนลงสระ"], ["No diving into shallow water.", "ห้ามพุ่งศีรษะลงน้ำตื้น"]];
   L.forEach(([e,t],k)=>{const y=36+k*62;g.fillStyle='#111827';let f=24;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-28&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,14,y);
    g.fillStyle='#4b5563';f=20;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-28&&f>12){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,14,y+25)})}},
  {x:-3.8,y:0.95,z:2.03,w:1.1,h:0.32,ry:0,cw:242,ch:70,draw:(g,W,H)=>{g.fillStyle='#ecfeff';g.fillRect(0,0,W,H);g.fillStyle='#0e7490';g.textAlign='center';g.textBaseline='middle';let f=34;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText("Shallow water").width>W-16&&f>12){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText("Shallow water",W/2,H*.34);f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText("น้ำตื้น").width>W-16&&f>11){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText("น้ำตื้น",W/2,H*.74)}},
  {x:0,y:2.05,z:6.47,w:2.3,h:.22,ry:Math.PI,cw:520,ch:52,draw:(g,W,H)=>{g.fillStyle='#0e5f6b';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   let f=30,t='School Swimming Pool · สระว่ายน้ำโรงเรียน';g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-16&&f>16){f-=1;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,W/2,H/2+1)}},
  {x:0,y:2.05,z:6.73,w:2.3,h:.22,ry:0,cw:520,ch:52,draw:(g,W,H)=>{g.fillStyle='#0e5f6b';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 28px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('↓ Football Field · สนามฟุตบอล',W/2,H/2+1)}}],
 npcs:[
 NPCDEF('benjamassp','Ms. Benjamas','Pool supervisor⁣ผู้ใหญ่ผู้ดูแลความปลอดภัยที่สระ',-1.6,3.7,0,[0.95, 0.75, 0.2],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'cap',[
  TT("The floor is wet. How should you move near the pool?","พื้นเปียกอยู่ ควรเดินบริเวณสระอย่างไร?","I'll walk slowly beside the pool.","I'll run quickly beside the pool.","I'll jump across the wet floor.","พื้นเปียกลื่นได้ ควรเคลื่อนที่อย่างช้า ๆ","Good choice. Walking slowly keeps the area safer. | ดีมาก การเดินช้า ๆ ช่วยให้ปลอดภัยขึ้น"),
  TT("The adult is not at the pool yet. What will you do?","ผู้ดูแลยังไม่มาที่สระ เธอจะทำอย่างไร?","I'll wait outside until an adult arrives.","I'll enter the water before an adult arrives.","I'll start swimming while nobody is watching.","ต้องมีผู้ใหญ่ดูแลก่อนทำกิจกรรมในสระ","Right. Wait for the adult before entering. | ถูกต้อง รอผู้ดูแลก่อนลงสระ"),
  TT("You hear the safety whistle. What should you do?","เมื่อได้ยินเสียงนกหวีดเพื่อความปลอดภัย ควรทำอย่างไร?","I'll stop and listen to the adult.","I'll keep talking and ignore the whistle.","I'll move closer to the water without listening.","เสียงนกหวีดคือสัญญาณให้หยุดและฟังคำสั่ง","Well done. Stop and listen to safety instructions. | ดีมาก หยุดและฟังคำแนะนำด้านความปลอดภัย")]),
 NPCDEF('prawinsp','Prawin','Student preparing for pool time⁣นักเรียนผู้เตรียมตัว',-5.6,2.6,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("We are getting ready. What should we do before swimming?","พวกเรากำลังเตรียมตัว ควรทำอะไรก่อนว่ายน้ำ?","Let's take a shower before swimming.","Let's skip the shower before swimming.","Let's go straight into the pool without showering.","ก่อนลงสระควรอาบน้ำชำระร่างกาย","Yes. A shower comes before pool time. | ใช่ ควรอาบน้ำก่อนลงสระ"),
  TT("Your towel and bag need a place. Where will you put them?","ผ้าเช็ดตัวกับกระเป๋าต้องมีที่เก็บ เธอจะวางที่ไหน?","I'll leave my towel and bag on the bench.","I'll leave my towel and bag on the wet floor.","I'll put my bag across the walking path.","วางของให้พ้นทางเดินและพื้นเปียก","Great. The bench keeps the path clear. | เยี่ยม วางบนม้านั่งช่วยให้ทางเดินโล่ง"),
  TT("We need our swim caps. What will you do with yours?","เราต้องสวมหมวกว่ายน้ำ เธอจะทำอย่างไรกับหมวกของเธอ?","I'll put on my swim cap before entering.","I'll carry my swim cap without wearing it.","I'll leave my swim cap inside my bag.","ควรสวมหมวกว่ายน้ำก่อนลงสระตามกติกา","Correct. Wear your cap before entering. | ถูกต้อง สวมหมวกก่อนลงสระ")]),
 NPCDEF('arisasp','Arisa','Student learning pool rules⁣นักเรียนผู้เรียนรู้กติกาสระ',-1.4,-4.6,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Your goggles feel loose. What should you do before entering?","แว่นว่ายน้ำหลวม เธอควรทำอย่างไรก่อนลงสระ?","I'll adjust my goggles while standing safely.","I'll ignore my loose goggles and enter.","I'll fix my goggles while jumping into the pool.","ปรับแว่นให้พอดีในจุดที่ยืนอย่างปลอดภัย","Nice. Check your goggles before entering. | ดีมาก ตรวจแว่นก่อนลงสระ"),
  TT("Your friend stands near the edge. How will you act?","เพื่อนยืนใกล้ขอบสระ เธอจะทำอย่างไร?","I'll give my friend space near the edge.","I'll push my friend toward the water.","I'll pull my friend closer to the edge.","อย่าผลักหรือดึงเพื่อนใกล้ขอบสระ","Exactly. Give everyone space by the pool. | ถูกต้อง เว้นระยะให้ทุกคนบริเวณสระ"),
  TT("This part of the pool is shallow. What should we avoid?","บริเวณนี้เป็นน้ำตื้น เราควรหลีกเลี่ยงอะไร?","We shouldn't dive into shallow water.","We should dive headfirst into shallow water.","We should jump headfirst into the shallow area.","น้ำตื้นไม่ควรกระโดดพุ่งศีรษะลงน้ำ","Correct. Never dive into shallow water. | ถูกต้อง ห้ามพุ่งศีรษะลงน้ำตื้น")]),
 NPCDEF('natdanaisp','Natdanai','Student safety partner⁣เพื่อนช่วยสังเกตความปลอดภัย',5.4,2.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.12, 0.1, 0.08],'',[
  TT("You see a friend who needs help. What will you do?","เห็นเพื่อนที่ต้องการความช่วยเหลือ เธอจะทำอย่างไร?","I'll tell the supervising adult right away.","I'll keep it secret from the supervising adult.","I'll try to handle the situation without telling anyone.","เมื่อเพื่อนต้องการความช่วยเหลือ ให้บอกผู้ดูแลทันที","Good. Alert the adult immediately. | ดีมาก แจ้งผู้ดูแลทันที"),
  TT("The lifeguard says pool time is over. What will you do?","ผู้ดูแลสระบอกว่าหมดเวลา เธอจะทำอย่างไร?","I'll leave the pool area as instructed.","I'll stay in the water after the instruction.","I'll pretend I didn't hear the lifeguard.","เมื่อผู้ดูแลบอกให้ขึ้นจากน้ำ ให้ทำตามทันที","Good listening. Follow the lifeguard's instruction. | ดีมาก ปฏิบัติตามคำสั่งผู้ดูแลสระ"),
  TT("You feel unwell at the pool. What is the safe choice?","เธอรู้สึกไม่สบายที่สระ ทางเลือกที่ปลอดภัยคืออะไร?","I'll stay out of the water and tell the adult.","I'll go into the water even though I feel unwell.","I'll hide how I feel and keep playing.","หากรู้สึกไม่สบายให้อยู่พ้นน้ำ พัก และแจ้งผู้ใหญ่","That's safe. Rest at the side and tell the adult. | ปลอดภัยแล้ว พักริมสระและแจ้งผู้ดูแล")])]});

