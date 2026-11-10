/* ===== Our school: School Botanical Garden (ST-CNT-013 V1.0, 4 Nov). Reached from the Football Field (north-west path, owner decision D4).
   Spots from the spec: A garden entrance and safety sign (Mr. Udom), B watering station by small plant beds (Chaba),
   C plant information signs (Jirayu), D compost bin and tool storage (Maprang). A made-up garden activity: no real collection,
   no medicinal or poison claims, never eat plants. NPC names are made up. ===== */
SCENES.push({id:'garden',name:'School Botanical Garden · Phibun School',th:'สวนพฤกษศาสตร์โรงเรียน',color:'#16A34A',orbit:true,spawn:[0,5.3,Math.PI],bounds:[-8.8,8.8,-6.2,6.2],
 exits:[{x0:-1,x1:1,z0:5.9,z1:6.4,to:'football',at:[-11.2,-7.4,0]}],/* the south gate leads back to the football field */
 build(){const c=mk();
  const GRASS=[.42,.66,.32],GRASS2=[.4,.62,.3],PATH=[.82,.78,.68],SOIL=[.42,.3,.2],WOOD=[.6,.42,.26],POST=[.4,.4,.42],LEAF=[.25,.55,.25],DRY=[.62,.45,.22];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<9;i++)c.box(-8+i*2,.03,0,2,.04,12.8,i%2?GRASS2:GRASS);
  /* stone paths: from the south gate to the middle, then east and west */
  c.box(0,.06,2.5,1.6,.04,8,PATH);c.box(0,.06,-1.2,14,.04,1.4,PATH);
  /* low hedge around the garden with a gate gap on the south side */
  const hedge=(x,z,sx,sz)=>c.box(x,.4,z,sx,.8,sz,[.22,.5,.25],true);
  hedge(0,-6.6,18.4,.5);hedge(-9.2,0,.5,13.4);hedge(9.2,0,.5,13.4);hedge(-5.1,6.6,8.2,.5);hedge(5.1,6.6,8.2,.5);
  c.box(-1.1,1,6.6,.2,2,.2,WOOD,true);c.box(1.1,1,6.6,.2,2,.2,WOOD,true);c.box(0,2.05,6.6,2.4,.2,.25,WOOD);
  c.box(0,.04,7.6,1.6,.04,2,PATH);
  /* A: safety sign board by the entrance */
  c.box(-3,.7,4.6,.12,1.4,.12,POST,true);c.box(-3,1.45,4.6,2,1.1,.08,[.95,.95,.9]);
  /* B: small raised plant beds and a watering station (a tap and watering cans) */
  for(const [x,z] of [[-6.4,1.2],[-3.8,1.2],[-6.4,-3.4],[-3.8,-3.4]]){c.box(x,.18,z,2,.36,1.6,WOOD,true);c.box(x,.37,z,1.8,.04,1.4,SOIL);
   for(let k=0;k<4;k++)c.box(x-.6+k*.4,.52,z+(k%2?.3:-.3),.22,.3,.22,k%2?[.3,.6,.3]:[.35,.68,.32])}
  c.box(-7.6,.6,3.4,.3,1.2,.3,POST,true);c.box(-7.45,1.05,3.4,.2,.08,.08,[.7,.72,.75]);
  for(const [x,col] of [[-6.9,[.2,.6,.85]],[-6.4,[.95,.55,.2]]]){c.box(x,.2,3.6,.34,.34,.24,col);c.box(x+.24,.3,3.6,.2,.05,.05,col)}
  /* C: plants with label signs: lemongrass, a sunflower, a banana tree and a tree without a label */
  c.box(-1.6,.3,-3.4,.9,.04,.9,SOIL);for(let k=0;k<7;k++)c.box(-1.9+k*.1,.45,-3.4+(k%3-1)*.12,.05,.9,.05,[.45,.72,.3]);
  c.box(.6,.9,-3.6,.08,1.8,.08,[.3,.55,.25]);c.box(.6,1.9,-3.6,.6,.6,.12,[.98,.8,.15]);c.box(.6,1.9,-3.56,.24,.24,.08,[.45,.3,.15]);
  c.box(2.8,1,-3.8,.3,2,.3,[.55,.6,.35],true);for(const [dx,dz] of [[.7,0],[-.7,0],[0,.7],[0,-.7]])c.box(2.8+dx,2.1,-3.8+dz,dx?1.3:.3,.08,dz?1.3:.3,[.3,.62,.25]);
  c.tree(5.6,-4.8);
  for(const x of [-1.6,.6,2.8]){c.box(x,.35,-2.3,.06,.7,.06,POST);c.box(x,.75,-2.3,.9,.4,.05,[.98,.97,.9])}
  /* D: compost bin and a tool box by the east hedge, a bench, fallen leaves on the path */
  c.box(7.6,.45,-2.6,1.2,.9,1.2,[.35,.45,.3],true);c.box(7.6,.92,-2.6,1.25,.05,1.25,[.3,.38,.26]);
  c.box(7.6,.3,-.6,1,.6,.7,[.75,.3,.2],true);c.box(7.6,.62,-.6,1.05,.04,.75,[.65,.25,.15]);
  c.box(4,.3,3.4,2.2,.1,.6,WOOD);c.box(3.1,.15,3.4,.1,.3,.5,POST);c.box(4.9,.15,3.4,.1,.3,.5,POST);c.ob.push([2.8,5.2,3.05,3.75]);
  for(const [x,z] of [[1.8,-1.3],[3.2,-1],[4.6,-1.4],[-2.6,-1]])c.box(x,.085,z,.24,.01,.16,DRY);
  c.tree(-7.6,-5.2);c.tree(7.8,4.8);
  /* way out: arrows to the south gate */
  wayMarks(c,0,4.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-3,y:1.45,z:4.65,w:1.9,h:1,ry:0,cw:400,ch:210,draw:(g,W,H)=>{g.fillStyle='#f7fee7';g.fillRect(0,0,W,H);g.fillStyle='#15803d';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Ask before picking flowers.','ขออนุญาตก่อนเด็ดดอกไม้'],['Do not eat garden plants.','ห้ามกินพืชในสวน'],['Wash your hands after gardening.','ล้างมือหลังทำสวน']];
   L.forEach(([e,t],k)=>{const y=36+k*62;g.fillStyle='#111827';let f=24;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-28&&f>14){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,14,y);
    g.fillStyle='#4b5563';f=20;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(t,14,y+25)})}},
  ...[[-1.6,'Lemongrass','ตะไคร้'],[.6,'Sunflower','ทานตะวัน'],[2.8,'Banana tree','ต้นกล้วย']].map(([x,e,t])=>({x,y:.75,z:-2.27,w:.86,h:.37,ry:0,cw:240,ch:104,draw:(g,W,H)=>{g.fillStyle='#fefce8';g.fillRect(0,0,W,H);g.strokeStyle='#15803d';g.lineWidth=5;g.strokeRect(3,3,W-6,H-6);
   g.fillStyle='#14532d';g.textAlign='center';g.textBaseline='middle';g.font="700 30px Anuphan, sans-serif";g.fillText(e,W/2,36);g.fillStyle='#4b5563';g.font="600 26px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText(t,W/2,74)}})),
  {x:0,y:2.05,z:6.47,w:2.3,h:.22,ry:Math.PI,cw:520,ch:52,draw:(g,W,H)=>{g.fillStyle='#14532d';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   let f=30,t='School Botanical Garden · สวนพฤกษศาสตร์';g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-16&&f>16){f-=1;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,W/2,H/2+1)}},
  {x:0,y:2.05,z:6.73,w:2.3,h:.22,ry:0,cw:520,ch:52,draw:(g,W,H)=>{g.fillStyle='#14532d';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 28px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('↓ Football Field · สนามฟุตบอล',W/2,H/2+1)}}],
 npcs:[
 NPCDEF('udomgdn','Mr. Udom','Garden activity teacher⁣ครูดูแลกิจกรรมสวน',-1.6,3.6,0,[0.35, 0.6, 0.35],[0.3, 0.27, 0.2],[0.08, 0.06, 0.07],'hat',[
  TT("It is sunny in the garden. What should you wear?","วันนี้แดดจัดในสวน เธอควรสวมอะไร","I'll wear a hat to protect my head.","I'll wear a wool scarf in the sun.","I'll wear a thick winter coat outside.","เลือกสิ่งที่ช่วยบังแดดขณะทำกิจกรรมกลางแจ้ง","Good choice! A hat helps shade your head. | ดีมาก หมวกช่วยบังแดดให้ศีรษะ"),
  TT("Which job can you do safely in our garden?","งานใดที่เธอทำได้อย่างปลอดภัยในสวน","I can water the plants with a small can.","I can move the heavy pots by myself.","I can climb a tall tree to check it.","เลือกกิจกรรมสวนที่เรียบง่ายและไม่เสี่ยงอันตราย","That's a safe, simple way to help. | ถูกต้อง เป็นวิธีช่วยงานสวนที่ง่ายและปลอดภัย"),
  TT("You like the flowers. What should you do first?","เธอชอบดอกไม้ในสวน ควรทำอะไรเป็นอย่างแรก","I'll ask before picking any flowers.","I'll pick some flowers before asking.","I'll take flowers home without permission.","ก่อนเด็ดดอกไม้ต้องขออนุญาตผู้ดูแลก่อน","Exactly! Ask for permission before picking. | ถูกต้อง ต้องขออนุญาตก่อนเด็ดดอกไม้")]),
 NPCDEF('chabagdn','Chaba','Student watering helper⁣นักเรียนผู้ช่วยรดน้ำ',-5.2,3.0,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Which tool will you use to water these small plants?","เธอจะใช้อุปกรณ์ใดรดน้ำต้นไม้เล็กเหล่านี้","I'll use a small watering can for these plants.","I'll use a large bucket for these small plants.","I'll use a broom to water these plants.","เลือกอุปกรณ์รดน้ำที่ควบคุมปริมาณน้ำได้ง่าย","Right! A small watering can is suitable here. | ถูกต้อง บัวรดน้ำขนาดเล็กเหมาะกับงานนี้"),
  TT("Where should you pour the water for this plant?","เธอควรเทน้ำตรงส่วนใดของต้นไม้ต้นนี้","I'll pour the water onto the soil near its base.","I'll pour the water onto the garden path.","I'll pour the water over the plant label.","ให้นึกถึงดินบริเวณโคนต้นที่ต้องการน้ำ","Well done! Water reaches the soil near the plant. | ดีมาก น้ำลงสู่ดินใกล้ต้นไม้"),
  TT("What will you do after working with garden soil?","หลังทำงานกับดินในสวน เธอจะทำอะไร","I'll wash my hands with soap after gardening.","I'll wipe my hands on my school shirt.","I'll eat my snack before washing my hands.","หลังสัมผัสดินควรทำความสะอาดมือให้ถูกสุขลักษณะ","Excellent! Clean hands are important after gardening. | เยี่ยมมาก การล้างมือสำคัญหลังทำสวน")]),
 NPCDEF('jirayugdn','Jirayu','Student plant-label helper⁣นักเรียนผู้ช่วยอ่านป้ายชื่อพืช',1.2,-0.6,0,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("This label says \"lemongrass\". What plant is it?","ป้ายนี้เขียนว่า lemongrass ต้นนี้คือต้นอะไร","It's a lemongrass plant.","It's a sunflower plant.","It's a banana tree.","อ่านคำว่า lemongrass บนป้ายแล้วเลือกชื่อต้นไม้ให้ตรง","Correct! The label says lemongrass. | ถูกต้อง ป้ายบอกว่าเป็นต้นตะไคร้"),
  TT("You want to learn this tree's name. What can you ask?","เธออยากรู้ชื่อต้นไม้ต้นนี้ จะถามว่าอย่างไร","What's the name of this tree, please?","How many benches are near this tree?","Who cleaned the path beside this tree?","คำถามควรถามชื่อของต้นไม้ ไม่ใช่ข้อมูลอื่น","Nice question! It politely asks for a tree name. | ดีมาก เป็นการถามชื่อต้นไม้อย่างสุภาพ"),
  TT("What information should we copy from a plant label?","เราควรคัดลอกข้อมูลใดจากป้ายชื่อต้นไม้","Let's write the plant's English name in our notes.","Let's write the weather forecast in our notes.","Let's write our lunch menu in our notes.","เลือกข้อมูลที่ตรงกับป้ายชื่อพืช","Good! The English name belongs in your notes. | ดีมาก ควรบันทึกชื่อภาษาอังกฤษของพืช")]),
 NPCDEF('mapranggdn','Maprang','Student garden-care partner⁣เพื่อนช่วยดูแลความเรียบร้อยของสวน',5.4,-1.8,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("Where can we put these dry fallen leaves?","เราจะนำใบไม้แห้งที่ร่วงแล้วไปไว้ที่ไหน","We can put the dry leaves in the compost bin.","We can put the dry leaves on the walking path.","We can put the dry leaves on the benches.","เลือกจุดรวบรวมใบไม้แห้งเพื่อทำปุ๋ยหมัก","That's right! The compost bin is the proper place. | ถูกต้อง ถังปุ๋ยหมักเป็นจุดรวบรวมที่เหมาะสม"),
  TT("How can we keep the garden path tidy?","เราจะช่วยให้ทางเดินในสวนสะอาดเรียบร้อยได้อย่างไร","Let's collect the fallen leaves from the path.","Let's leave the fallen leaves across the path.","Let's spread more leaves along the path.","เลือกการกระทำที่ช่วยให้ทางเดินโล่ง","Great teamwork! Clearing the path helps everyone. | เยี่ยมมาก การเก็บใบไม้ช่วยให้ทุกคนใช้ทางเดินได้สะดวก"),
  TT("Where should we put the small tools after gardening?","หลังทำสวนเราควรเก็บเครื่องมือเล็กไว้ที่ไหน","We'll return the small tools to their storage box.","We'll leave the small tools beside the walkway.","We'll place the small tools under a bench.","หลังใช้งานควรเก็บเครื่องมือในที่จัดเก็บ","Well done! The tools are safely put away. | ดีมาก เก็บเครื่องมือเข้าที่อย่างปลอดภัย")])]});

