/* ===== Our school: Art Room (ST-CNT-010 V1.0, 3 Nov). Reached from the Building 3 corridor; no room number.
   Spots from the spec: A teacher demonstration table (Ms. Pailin), B supplies shelf and materials table (Khaohom),
   C group poster workspace (Punpun), D wash-up sink and finished-work area (Praewa). The school-garden poster is made up. NPC names are made up. ===== */
SCENES.push({id:'art',name:'Art Room · Phibun School',th:'ห้องศิลปะ',color:'#15803D',orbit:true,spawn:[4.5,3.4,Math.PI],bounds:[-5.8,5.8,-4.5,5.2],
 exits:[{x0:3.7,x1:5.3,z0:4.4,z1:5.2,to:'b3hall',at:[11,-1.6,0]}],/* the door leads back to the Building 3 corridor (north side, east end) */
 build(){const c=mk();
  const WALL=[.96,.94,.9],CAP=[.62,.5,.36],WOOD=[.66,.48,.3],WOOD2=[.54,.38,.24],STOOL=[.95,.55,.2],LEG=[.35,.35,.37];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  c.box(0,.03,6.3,16,.06,2.6,[.74,.73,.69]);/* corridor outside the door */
  for(let i=0;i<10;i++)for(let j=0;j<8;j++)c.box(-5.4+i*1.2,.04,-4.2+j*1.2,1.2,.04,1.2,(i+j)%2?[.86,.88,.84]:[.78,.82,.76]);
  /* a few paint spots on the floor tiles */
  c.box(-2.3,.065,1.9,.18,.01,.14,[.9,.3,.3]);c.box(1.8,.065,-1.5,.14,.01,.12,[.2,.5,.9]);c.box(3.1,.065,2.2,.16,.01,.12,[.95,.8,.2]);
  /* front wall (full height) with a whiteboard and the wall signs */
  c.box(0,1.15,-4.95,12.6,2.3,.2,WALL,true);c.box(0,2.33,-4.95,12.7,.06,.3,CAP);
  c.box(-1,1.55,-4.83,4.4,1.25,.04,[.55,.56,.6]);c.box(-1,1.55,-4.8,4.2,1.1,.04,[.98,.98,.98]);
  c.box(3.7,1.5,-4.83,2.1,1.35,.04,[.1,.55,.3]);
  /* low side and back walls, door gap at the back right (same plan as the classroom) */
  for(const x of [-6.2,6.2]){c.box(x,.6,0,.2,1.2,10,WALL,true);c.box(x,1.23,0,.3,.06,10,CAP)}
  c.box(-1.3,.6,4.95,9.8,1.2,.2,WALL,true);c.box(-1.3,1.23,4.95,9.9,.06,.3,CAP);
  c.box(5.85,.6,4.95,.7,1.2,.2,WALL,true);c.box(5.85,1.23,4.95,.7,.06,.3,CAP);
  c.box(3.55,1.1,4.95,.14,2.2,.24,CAP);c.box(5.45,1.1,4.95,.14,2.2,.24,CAP);c.box(4.5,2.25,4.95,2.05,.14,.24,CAP);
  /* A: teacher demonstration table with paper, a pencil cup and an easel */
  c.box(-1,.38,-3.3,2.4,.76,.8,WOOD2,true);c.box(-1,.78,-3.3,2.5,.05,.9,WOOD);c.box(-1.4,.82,-3.3,.6,.03,.42,[.98,.98,.95]);c.box(-.3,.88,-3.3,.14,.16,.14,[.9,.5,.2]);
  c.box(2.6,.8,-3.9,.06,1.6,.06,WOOD2);c.box(3.4,.8,-3.9,.06,1.6,.06,WOOD2);c.box(3,1.15,-3.85,.95,.7,.04,[.98,.98,.95]);
  /* B: supplies shelf on the left wall (paper, colour pencil cups, glue sticks, brush jars) and a small materials table */
  c.box(-5.75,1,.9,.6,2,2.6,[.85,.8,.7],true);
  for(const y of [.55,1.05,1.55])c.box(-5.45,y,.9,.04,.04,2.4,[.6,.55,.48]);
  [[.95,.3,.3],[.3,.6,.95],[.95,.85,.25],[.3,.8,.4],[.85,.45,.85]].forEach((col,k)=>{c.box(-5.5,.7,-.1+k*.5,.3,.2,.4,col);c.box(-5.5,1.2,-.1+k*.5,.12,.2,.12,col);c.box(-5.5,1.68,-.1+k*.5,.08,.22,.08,[.95,.95,.95])});
  c.box(-4.2,.36,-1.6,1.2,.72,.7,WOOD2,true);c.box(-4.2,.74,-1.6,1.3,.05,.8,WOOD);c.box(-4.5,.8,-1.6,.12,.14,.12,[.3,.6,.95]);c.box(-3.9,.8,-1.6,.08,.12,.08,[.95,.85,.25]);
  /* C: group poster workspace: a big table with a made-up garden poster, colour pencils and stools */
  c.box(-1.6,.38,.4,3.2,.76,1.6,WOOD2,true);c.box(-1.6,.78,.4,3.3,.05,1.7,WOOD);
  c.box(-1.6,.81,.4,1.9,.02,1.2,[.98,.98,.94]);
  for(const [x,z,col] of [[-2.2,.7,[.9,.25,.25]],[-1.9,.75,[.9,.25,.25]],[-1.4,.3,[.25,.7,.3]],[-1.2,.5,[.25,.7,.3]],[-.9,-.05,[.98,.8,.2]]])c.box(x,.83,z,.16,.02,.16,col);
  c.box(-1.6,.83,-.05,1.2,.02,.14,[.2,.3,.6]);
  for(let k=0;k<6;k++)c.box(-3.1+k*.12,.82,1.05,.06,.03,.3,[[.9,.3,.3],[.95,.6,.2],[.95,.85,.25],[.3,.7,.35],[.3,.5,.9],[.6,.35,.8]][k]);
  for(const dx of [-1.1,0,1.1]){c.box(-1.6+dx,.3,1.6,.36,.06,.36,STOOL);c.box(-1.6+dx,.15,1.6,.05,.3,.05,LEG);c.box(-1.6+dx,.3,-.8,.36,.06,.36,STOOL);c.box(-1.6+dx,.15,-.8,.05,.3,.05,LEG)}
  /* D: wash-up sink on the right wall, a drying rack, and a finished-work display board */
  c.box(5.3,.45,-.6,1.1,.9,1.6,[.85,.86,.88],true);c.box(5.3,.92,-.6,1.2,.05,1.7,[.6,.62,.66]);c.box(5.3,.93,-.6,.7,.03,.9,[.72,.78,.84]);c.box(5.7,1.15,-.6,.06,.4,.06,[.7,.72,.75]);
  c.box(5.1,1.0,-1.3,.18,.18,.18,[.75,.88,.95]);c.box(5.1,1.16,-1.3,.03,.24,.03,[.6,.4,.2]);
  c.box(5.6,1.2,1.9,.08,1.3,2.2,[.6,.45,.3],true);c.box(5.55,1.2,1.9,.02,1.15,2.05,[.92,.86,.72]);
  /* way out: sign board above the door */
  c.box(4.5,2.75,4.98,1.95,.85,.1,[.15,.42,.27]);wayMarks(c,4.5,2.6,0,1,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[
  {x:-1,y:1.55,z:-4.77,w:4.1,h:1.06,ry:0,cw:720,ch:186,draw:(g,W,H)=>{g.fillStyle='#fbfbfb';g.fillRect(0,0,W,H);g.textAlign='left';g.textBaseline='middle';
   g.fillStyle='#15803d';g.font="700 40px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Art Room · ห้องศิลปะ',22,40);
   g.fillStyle='#111827';g.font="600 32px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Poster: Our School Garden',22,100);g.fillText('โปสเตอร์: สวนของโรงเรียน',22,148)}},
  {x:3.7,y:1.5,z:-4.77,w:2,h:1.25,ry:0,cw:400,ch:250,draw:(g,W,H)=>{g.fillStyle='#f0fdf4';g.fillRect(0,0,W,H);g.fillStyle='#15803d';g.fillRect(0,0,W,8);
   g.textAlign='left';g.textBaseline='middle';const L=[['Use safe art materials.','ใช้อุปกรณ์ศิลปะที่ปลอดภัย'],['Keep water away from your poster.','วางน้ำให้ห่างจากโปสเตอร์'],['Clean and return your tools.','ทำความสะอาดและเก็บอุปกรณ์ให้เข้าที่']];
   L.forEach(([e,t],k)=>{const y=44+k*72;g.fillStyle='#111827';let f=26;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(e).width>W-30&&f>16){f-=1;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(e,16,y);
    g.fillStyle='#4b5563';f=22;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W-30&&f>14){f-=1;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,16,y+28)})}},
  {x:5.53,y:1.2,z:1.9,w:2,h:1.1,ry:-Math.PI/2,cw:400,ch:220,draw:(g,W,H)=>{g.fillStyle='#ead9b5';g.fillRect(0,0,W,H);
   [[20,'#fde68a'],[150,'#bbf7d0'],[280,'#bfdbfe']].forEach(([x,col],k)=>{g.fillStyle='#fff';g.fillRect(x,40,100,130);g.fillStyle=col;g.fillRect(x+8,48,84,100);
    g.fillStyle=['#16a34a','#dc2626','#f59e0b'][k];g.beginPath();g.arc(x+50,98,18+k*3,0,7);g.fill()});
   g.fillStyle='#111827';g.textAlign='center';g.font="700 22px Anuphan, sans-serif";g.fillText('Our work',W/2,22)}},
  Object.assign(waySign(4.5,4.98-.08,Math.PI,'Building 3 Corridor','ทางเดินอาคาร 3','↑'),{y:2.75,w:1.8,h:.79})],
 npcs:[
 NPCDEF('pailinart','Ms. Pailin','Art teacher⁣ครูศิลปะ',0.9,-3.4,0,[0.95, 0.6, 0.3],[0.2, 0.2, 0.26],[0.08, 0.06, 0.07],'bun',[
  TT("What should you use to sketch your poster first?","ควรใช้อะไรร่างภาพโปสเตอร์ก่อน","I'll start with a pencil.","I'll start with a glue stick.","I'll start with a paintbrush.","นึกถึงอุปกรณ์สำหรับร่างเส้นที่ลบแก้ไขได้","Good choice! A pencil is useful for the first sketch. | เลือกได้ดี ดินสอเหมาะสำหรับร่างภาพครั้งแรก"),
  TT("Our practice poster is about the school garden. What is its topic?","โปสเตอร์ฝึกของเราเกี่ยวกับสวนของโรงเรียน หัวข้อคืออะไร","It's about our school garden.","It's about a train station.","It's about a beach hotel.","ตอบหัวข้อที่ครูบอกว่าเป็นเรื่องสวนของโรงเรียน","Exactly! The poster shows a made-up school garden. | ถูกต้อง โปสเตอร์แสดงสวนโรงเรียนที่สมมติขึ้น"),
  TT("How can we make the poster title easy to read?","เราจะทำให้ชื่อโปสเตอร์อ่านง่ายได้อย่างไร","I'll write the title in large letters.","I'll write the title in tiny letters.","I'll hide the title behind a drawing.","คิดถึงขนาดและตำแหน่งตัวอักษรที่ผู้อ่านมองเห็นชัด","Well done! Large letters help readers see the title. | เยี่ยมมาก ตัวอักษรขนาดใหญ่ช่วยให้อ่านชื่อเรื่องได้")]),
 NPCDEF('khaohomart','Khaohom','Materials helper⁣เพื่อนผู้ช่วยเตรียมอุปกรณ์',-5.0,0.9,Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("The flower shapes need red colour. Which tool will you choose?","รูปดอกไม้ต้องระบายสีแดง เธอจะเลือกเครื่องมือใด","I'll use a red coloured pencil.","I'll use a blue coloured pencil.","I'll use a yellow coloured pencil.","ให้เลือกดินสอสีที่ตรงกับสีแดงตามแผน","Right! A red coloured pencil matches the plan. | ถูกต้อง ดินสอสีแดงตรงกับแผนที่กำหนด"),
  TT("We need to stick a paper leaf onto the poster. What helps?","เราต้องติดใบไม้กระดาษลงบนโปสเตอร์ ควรใช้อะไร","I'll use a glue stick for the leaf.","I'll use a crayon to attach it.","I'll use a pencil to attach it.","เลือกวัสดุที่ใช้ยึดกระดาษให้ติดกัน","Correct! A glue stick attaches the paper leaf. | ถูกต้อง กาวแท่งช่วยติดใบไม้กระดาษ"),
  TT("Keep the water cup away from the poster. Where should it go?","วางแก้วน้ำให้ห่างจากโปสเตอร์ ควรวางตรงไหน","I'll put the cup on a tray away from the poster.","I'll put the cup beside the poster.","I'll put the cup on the poster.","นึกถึงบริเวณแยกต่างหากเพื่อลดความเสี่ยงน้ำหก","Good care! The tray keeps the cup away from the poster. | ดูแลอุปกรณ์ได้ดี ถาดแยกช่วยให้แก้วอยู่ห่างจากโปสเตอร์")]),
 NPCDEF('punpunart','Punpun','Poster design partner⁣เพื่อนร่วมออกแบบโปสเตอร์',0.6,0.4,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.1, 0.08, 0.07],'',[
  TT("The plan says green leaves. Which colour do we need?","แผนกำหนดให้ใบไม้สีเขียว เราต้องใช้สีอะไร","We need green for the leaves.","We need orange for the leaves.","We need pink for the leaves.","ดูสีของใบไม้ตามแผนที่เพื่อนบอก","Yes! Green matches the leaf plan. | ใช่แล้ว สีเขียวตรงตามแผนใบไม้"),
  TT("Our plan puts the sun at the top right. Where will it go?","แผนให้วางดวงอาทิตย์มุมขวาบน เราจะวางตรงไหน","Let's put it in the top right corner.","Let's put it in the bottom left corner.","Let's put it in the bottom right corner.","ฟังคำบอกตำแหน่ง top right ให้ครบ","Great! The top right corner matches our plan. | ดีมาก มุมขวาบนตรงกับแผนของเรา"),
  TT("Our plan has two red flowers. How will you describe them?","แผนของเรามีดอกไม้สีแดงสองดอก เธอจะบรรยายอย่างไร","There are two red flowers.","There are three blue flowers.","There is one yellow flower.","ดูทั้งจำนวนสองดอกและสีแดงตามแผน","Exactly! You described the number and colour correctly. | ถูกต้อง เธอบอกจำนวนและสีได้ตรงตามแผน")]),
 NPCDEF('praewaart','Praewa','Clean-up and feedback partner⁣เพื่อนดูแลการเก็บและให้ข้อเสนอแนะ',4.3,-0.6,-Math.PI/2,[0.97, 0.97, 0.95],[0.14, 0.2, 0.42],[0.08, 0.06, 0.07],'long',[
  TT("We have finished painting. How should we clean the brushes?","เราระบายสีเสร็จแล้ว ควรทำความสะอาดพู่กันอย่างไร","Let's wash the brushes with clean water.","Let's wipe the brushes on the poster.","Let's leave the brushes in wet paint.","เลือกวิธีล้างพู่กันที่ไม่ทำให้ผลงานเสียหาย","Correct! Clean water helps wash the brushes. | ถูกต้อง น้ำสะอาดช่วยล้างพู่กัน"),
  TT("The materials are clean. Where do we store them?","อุปกรณ์สะอาดแล้ว เราควรเก็บไว้ที่ไหน","Let's put the supplies in their box.","Let's put the supplies under the chairs.","Let's put the supplies beside the door.","เลือกที่เก็บอุปกรณ์ที่จัดไว้โดยเฉพาะ","Nice teamwork! The supplies belong in their box. | ทำงานร่วมกันได้ดี ควรเก็บอุปกรณ์ลงกล่อง"),
  TT("Your friend made a large, clear title. What can you say?","เพื่อนทำชื่อเรื่องตัวใหญ่และอ่านชัด เธอจะพูดว่าอย่างไร","Your title is clear and easy to read.","Your title is too small to read.","Your title is hidden under the paper.","ตอบตามสิ่งที่เพื่อนทำจริงและให้กำลังใจอย่างสุภาพ","Kind words! Your feedback describes the clear title. | เป็นคำชมที่ดีและตรงกับชื่อเรื่องที่อ่านชัด")])]});

