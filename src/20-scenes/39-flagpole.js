spawn:[1,4.6,Math.PI],bounds:[-12.4,12.4,-9,11.2],
 build(){const c=mk(),A=c.a;
  const CREAM=[.94,.9,.82],CAP=[.18,.37,.66],PINK=[.79,.55,.53],TRIM=[.7,.44,.42],CONC=[.72,.71,.68],BLUE=[.13,.28,.54],GOLD=[.94,.86,.6],WHITE=[.96,.95,.92],DARK=[.08,.08,.08];
  /* ground, road (Thetsaban 2) with a zebra crossing in front of Gate 1, and sidewalks on both sides */
  c.box(0,-.06,4,140,.12,140,[.47,.68,.36]);
  c.box(0,.02,8.2,40,.06,4.4,[.36,.37,.41]);for(let x=-15;x<=15;x+=3.2)if(Math.abs(x-6)>2.6)c.box(x,.06,8.2,1.4,.02,.16,[.95,.9,.5]);
  for(let z=6.35;z<10.2;z+=.8)c.box(6,.06,z,3.2,.02,.42,[.97,.97,.95]);
  c.ob.push([-20,4.3,6,10.4],[7.7,20,6,10.4]);/* cars' road: people cross only on the zebra crossing (x 4.3 to 7.7) */
  c.box(0,.05,4.2,40,.1,3.4,[.8,.79,.76]);c.box(0,.1,5.95,40,.12,.18,[.62,.62,.6]);
  c.box(0,.05,13,40,.1,5.2,[.8,.79,.76]);c.box(0,.1,10.45,40,.12,.18,[.62,.62,.6]);
  /* street market across the road (stalls only; the sellers are in their own scene "Street market", after school): gap at the crossing (x 4.3 to 7.7) */
  const stall=(x,roof,items)=>{c.counter(x,11.65,3,[.95,.95,.92]);
   for(const dx of [-1.45,1.45])c.box(x+dx,1.3,10.7,.12,2.6,.12,[.5,.5,.55]);
   for(let k=0;k<4;k++)c.box(x-1.2+k*.8,2.62,11.5,.8,.12,2.2,k%2?[.97,.97,.95]:roof);
   items(x)};
  stall(11,[.85,.2,.2],x=>{c.box(x-.6,1.3,11.65,.9,.25,.6,[.25,.25,.27]);for(let k=0;k<6;k++)c.box(x-.95+k*.14,1.5,11.65,.05,.3,.05,k%2?[.62,.38,.2]:[.82,.33,.3]);
   for(const [dx,cl] of [[.5,[.95,.85,.3]],[.9,[.9,.4,.2]]])c.box(x+dx,1.25,11.65,.3,.2,.3,cl)});
  stall(-.2,[.95,.55,.15],x=>{c.box(x-.4,1.25,11.65,1.6,.15,.7,[.15,.15,.16]);for(let k=0;k<5;k++)c.box(x-1+k*.3,1.37,11.65,.12,.08,.5,[.72,.42,.32]);
   c.box(x+.95,1.4,11.65,.6,.45,.6,[.85,.75,.55])});
  stall(-5.2,[.2,.55,.85],x=>{for(const [dx,cl] of [[-1.1,[.85,.6,.4]],[-.7,[.95,.4,.6]],[-.3,[.4,.75,.95]],[.1,[.6,.9,.4]]])c.box(x+dx,1.35,11.65,.22,.36,.22,cl);
   c.box(x+.85,1.45,11.65,.7,.6,.6,[.3,.6,.9])});
  stall(-10.2,[.3,.65,.3],x=>{for(const [dx,cl] of [[-1.05,[.98,.8,.2]],[-.6,[.4,.75,.3]],[-.15,[.9,.25,.3]],[.3,[.98,.8,.2]],[.75,[.95,.55,.5]]])c.box(x+dx,1.27,11.6,.32,.2,.5,cl);
   c.box(x+1.15,1.3,11.65,.3,.3,.3,[.8,.85,.95])});
  /* school fence with Gate 1 (gap from x=2.6 to x=9.4) */
  for(const [x0,x1] of [[-20,1.9],[10.1,20]])c.box((x0+x1)/2,.8,-.6,x1-x0,1.6,.35,CREAM,true);
  for(let x=-19;x<=19;x+=3)if(x<1.9||x>10.1)c.box(x,1.75,-.6,.5,.3,.5,CAP);
  for(const x of [2.25,9.75]){c.box(x,1.6,-.6,1.1,3.2,1.1,CREAM,true);c.box(x,3.38,-.6,1.4,.35,1.4,CAP)}
  c.box(.5,.03,1.4,7.8,.06,4,[.66,.66,.66]);c.box(6,.035,-.6,6.6,.06,1.4,[.66,.66,.66]);c.box(6,.03,-3,7.8,.06,4.4,[.66,.66,.66]);
  /* school name sign (pink frame, blue board, emblem on top, blue plaques and black wings) */
  const sx=-5.6,sz=1.5;
  c.box(sx,.09,sz,11.4,.18,1.9,CONC,true);c.box(sx,.3,sz,10.8,.25,1.4,CONC);
  c.box(sx,1.95,sz,5.6,3.1,.6,PINK);c.box(sx,3.62,sz,6.2,.28,.66,TRIM);c.box(sx,4.4,sz,1.9,1.5,.6,PINK);
  c.box(sx,2.05,sz+.31,4.9,2.1,.04,BLUE);c.box(sx,2.05,sz+.32,4.7,1.9,.04,[.92,.94,.96]);c.box(sx,2.05,sz+.33,4.5,1.7,.04,BLUE);
  for(const s of [-1,1]){
   c.box(sx+s*3.5,1.45,sz,1.0,2.1,.5,PINK);c.box(sx+s*3.5,1.45,sz+.26,.75,1.4,.03,BLUE);
   c.box(sx+s*4.75,1.75,sz-.05,1.25,2.7,.5,PINK);c.box(sx+s*4.75,1.75,sz+.21,1.0,2.2,.03,DARK);
   for(const [dx,dy] of [[-.25,.7],[.25,.4],[-.2,0],[.22,-.35],[-.15,-.7]])c.box(sx+s*4.75+dx,1.75+dy,sz+.23,.18,.18,.02,[.84,.7,.36])}
  /* small open pavilion behind the sign (about 10 m back on the real map; set back so the sign does not hide it) */
  {const px=-5.6,pz=-7.4,P=[.9,.88,.84];c.box(px,.1,pz,3.8,.2,3.8,[.79,.77,.72]);
   for(const [dx,dz] of [[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]])c.box(px+dx,1.4,pz+dz,.3,2.6,.3,P,true);
   tPyr(A,px,2.7,pz,4.6,1.5,4.6,[.71,.32,.23]);c.bench(px,pz+.6)}
  /* guard booth just inside the gate */
  {const bx=10.6,bz=-2.6;c.box(bx,1.3,bz,2.2,2.6,2.2,[.95,.94,.9],true);c.box(bx,2.68,bz,2.6,.16,2.6,CAP);
   c.box(bx,1.6,bz+1.11,1.4,.9,.04,[.55,.75,.9]);c.box(bx-1.11,1.0,bz,.04,2.0,.8,DOOR)}
  /* buildings 7 and 8 behind (3 floors, light roofs) */
  for(const [bx,w] of [[-10,8],[-1.4,8]]){c.box(bx,5.4,-11.4,w,10.8,3.4,[.93,.9,.84],true);c.box(bx,10.95,-11.4,w+.6,.3,4,[.91,.93,.91]);
   for(let f=0;f<3;f++){c.box(bx,1.5+f*3.6,-9.62,w-.4,.16,.12,[.75,.72,.66]);for(let k=-1;k<=1;k++)c.box(bx+k*2.4,2.4+f*3.6,-9.68,1.5,1.3,.04,WIN)}}
  /* way to the flagpole: arrows on the ground at final x=-7, sign beside the path at final x=-10 (build code is pre-mirror) */
  wayPost(c,10,-7.2);wayMarks(c,7,-5.2,0,-1,2);
  /* way to the street market: arrow on the zebra crossing, sign on the sidewalk beside it (final x=-9.4) */
  wayMarks(c,6,6.6,0,1,1);wayPost(c,9.4,5.2);
  /* trees and lamps */
  for(const [x,z] of [[-11.6,-3],[-1.2,-3.4],[12,-5],[-12,3.6],[12.2,3.6],[-8.6,-8.4]])c.tree(x,z);
  c.lamp(-9.5,4.9);c.lamp(1,4.9);c.lamp(11,4.9);
  for(const x of [-11,-4,2.5,12])c.tree(x,16.6);c.lamp(-8,15.3);c.lamp(10,15.3);/* behind the street market */
  return mirrorWorld({a:new Float32Array(A),ob:c.ob})},
 /* real name, words and emblem on the school sign (emblem file supplied by the teacher) */
 decals:(()=>{const sx=5.6,sz=1.5,fit=(g,t,f,max,font)=>{do{g.font=font.replace('#',f);f-=2}while(g.measureText(t).width>max&&f>10)};
  const board=(g,W,H)=>{const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#21478a');gr.addColorStop(1,'#163469');g.fillStyle=gr;g.fillRect(0,0,W,H);
   g.strokeStyle='#e9eef5';g.lineWidth=10;g.strokeRect(14,14,W-28,H-28);g.textAlign='center';g.textBaseline='alphabetic';g.shadowColor='rgba(0,0,0,.45)';g.shadowOffsetY=3;g.shadowBlur=4;
   g.fillStyle='#f6f3ea';fit(g,'โรงเรียนพิบูลมังสาหาร',130,900,"700 #px Anuphan, 'Noto Sans Thai', sans-serif");g.fillText('โรงเรียนพิบูลมังสาหาร',W/2,H*.52);
   g.fillStyle='#efdc9a';fit(g,'PHIBUNMANGSAHAN SCHOOL',66,800,'700 #px Georgia, "Times New Roman", serif');g.fillText('PHIBUNMANGSAHAN SCHOOL',W/2,H*.8)};
  const plaque=(head,lines)=>(g,W,H)=>{g.fillStyle='#1b3c78';g.fillRect(0,0,W,H);g.strokeStyle='#e9eef5';g.lineWidth=8;g.strokeRect(10,10,W-20,H-20);
   g.textAlign='center';g.textBaseline='middle';const all=(head?[head]:[]).concat(lines),lh=H/(all.length+1.2);
   all.forEach((L,k)=>{const hd=head&&k===0;g.fillStyle=hd?'#efdc9a':'#f6f3ea';fit(g,L,hd?36:40,W-40,"700 #px Anuphan, 'Noto Sans Thai', sans-serif");g.fillText(L,W/2,lh*(k+1.1))})};
  return [
   {x:sx,y:2.05,z:sz+.375,w:4.7,h:1.9,cw:1024,ch:414,draw:board},
   {x:sx,y:4.42,z:sz+.33,w:1.45,h:1.45,src:'img/phibun-emblem.png'},
   {x:sx-3.5,y:1.45,z:sz+.30,w:.75,h:1.4,cw:240,ch:448,draw:plaque('ปรัชญาของโรงเรียน',['การศึกษาเป็นการ','พัฒนาชีวิต','และสังคม'])},
   waySign(-10,-7.2+.03,0,'Multipurpose Dome','โดมอเนกประสงค์','\u2191'),waySign(-9.4,5.2+.03,0,'Street Market','ตลาดหน้าโรงเรียน','↓'),
   {x:sx+3.5,y:1.45,z:sz+.30,w:.75,h:1.4,cw:240,ch:448,draw:plaque('',['อัตตานัง ทมยันติ','สุพพตา','ผู้ประพฤติดี','ย่อมฝึกตน'])}]})(),
 npcs:[
 NPCDEF('guard','Mr. Somsak','Security guard⁣ยามรักษาความปลอดภัย',-8.4,-2.4,-Math.PI/2,[.17,.22,.36],[.12,.12,.16],[.1,.08,.07],'cap',[
  TT("Good morning! Do you study at this school?",'สวัสดีตอนเช้า เรียนที่โรงเรียนนี้หรือเปล่า',"Yes, I do. I'm in Grade 8.","Yes, it is. It's a big school.","I go to school by bus.",'ยามถามว่าเรียนที่นี่ไหม (Do you ...?) ตอบ Yes, I do. แล้วบอกชั้น',"Right! Answer Do you ...? with Yes, I do. Grade 8 means Mathayom 2. | Grade 8 = ชั้น ม.2, Do you ...? ตอบ Yes, I do."),
  TT("OK. Please use the crosswalk when you cross the road.",'โอเค เวลาข้ามถนนให้ข้ามทางม้าลายนะ',"OK. I'll use the crosswalk.","OK. I'll run across the road.","OK. I'll wait for the bus.",'ยามบอกให้ข้ามถนนที่ทางม้าลาย ให้รับคำ',"Good! A crosswalk is the safe place to cross. I'll ... is a promise. | crosswalk = ทางม้าลาย, I'll ... = ฉันจะ ... ใช้รับปากว่าจะทำ"),
  TT("Have a good day at school!",'ขอให้วันนี้ที่โรงเรียนเป็นวันที่ดีนะ',"Thank you. You too!","Good morning! Do you study here?","I'm in Grade 8.",'ยามอวยพร ให้ขอบคุณและอวยพรกลับ',"Nice! Say You too! when someone gives you a good wish. | You too. = คุณก็เช่นกัน ใช้ตอบคำอวยพร")]),
 NPCDEF('friend','Mint','Classmate⁣เพื่อนร่วมห้อง',2.4,3.2,Math.PI,[.96,.96,.95],[.14,.2,.42],[.08,.06,.07],'bun',[
  TT("Hi! Let's take a photo at the school sign!",'หวัดดี มาถ่ายรูปกับป้ายโรงเรียนกัน',"Sure! Let's stand in front of it.","Sure! Let's eat lunch first.","Sorry, I don't have a pen.",'เพื่อนชวนถ่ายรูป ให้ตอบรับและบอกว่าไปยืนหน้าป้าย',"Good! Let's ... is an invitation. In front of means before something. | Let's ... = ... กันเถอะ, in front of = ข้างหน้า"),
  TT("Look! The school name is in Thai and English.",'ดูสิ ชื่อโรงเรียนมีทั้งภาษาไทยและภาษาอังกฤษ',"Phibunmangsahan School. I can read it!","The name is only in Thai.","Let's take a photo at the school sign!",'เพื่อนบอกว่าป้ายมีชื่อภาษาอังกฤษ ให้อ่านชื่อโรงเรียนภาษาอังกฤษ',"Well done! You read the school name on the sign. | Phibunmangsahan School = โรงเรียนพิบูลมังสาหาร, I can read it! = ฉันอ่านออก"),
  TT("Nice photo! I'll send it to you.",'รูปสวยมาก เดี๋ยวส่งให้นะ',"Thanks! Let's go inside now.","Can you take a photo?","The name is in Thai and English.",'เพื่อนบอกว่าจะส่งรูปให้ ให้ขอบคุณแล้วชวนเข้าโรงเรียน',"Good! Say thanks, then Let's go inside. | Thanks! = ขอบคุณ, Let's go inside. = เข้าไปข้างในกันเถอะ")]),
 NPCDEF('parent','Mrs. Anong','Parent⁣ผู้ปกครอง',-2.2,3.6,Math.PI,[.55,.3,.55],[.22,.2,.26],[.1,.07,.06],'long',[
  TT("Excuse me. Is this Phibunmangsahan School?",'ขอโทษนะคะ ที่นี่คือโรงเรียนพิบูลมังสาหารใช่ไหมคะ',"Yes, it is. This is Gate 1.","Yes, I do. I study here.","It's in Ubon Ratchathani.",'ถามว่าใช่โรงเรียนนี้ไหม (Is this ...?) ตอบ Yes, it is.',"Right! Answer Is this ...? with Yes, it is. | Is this ...? ตอบ Yes, it is. / Gate 1 = ประตู 1"),
  TT("My son is in Grade 8. Where do students line up in the morning?",'ลูกชายอยู่ ม.2 ตอนเช้านักเรียนเข้าแถวที่ไหนคะ',"They line up at the dome.","They line up every morning.","They go home at four o'clock.",'ถามว่าเข้าแถวที่ไหน (Where ...?) ให้ตอบสถานที่',"Correct! Students line up at the dome in the morning. | line up = เข้าแถว, the dome = โดมอเนกประสงค์"),
  TT("Thank you. Can I go in now?",'ขอบคุณค่ะ เข้าไปข้างในได้เลยไหมคะ',"Please ask the security guard at the booth.","Yes, I can. I go in every day.","They line up at the dome.",'ผู้ปกครองถามว่าเข้าได้ไหม ให้แนะนำให้ถามยามที่ป้อม',"Good! Visitors should ask the security guard at the booth. | security guard = ยาม, booth = ป้อมยาม")]),
 NPCDEF('teacher','Mr. Wichai','Teacher on duty⁣ครูเวร',-3.6,-3.4,Math.PI,[.3,.45,.7],[.2,.2,.24],[.12,.1,.08],'',[
  TT("Good morning! You are early today.",'อรุณสวัสดิ์ วันนี้มาเช้านะ',"Good morning, sir. I woke up early.","Good night, sir. I woke up early.","Good morning, sir. I'm late today.",'ครูทักว่ามาเช้า ให้ทักทายกลับและบอกว่าตื่นเช้า',"Good! Woke up is the past of wake up. Use sir for a male teacher. | woke up = ตื่นนอน (อดีตของ wake up), sir = ใช้เรียกครูผู้ชายอย่างสุภาพ"),
  TT("Did you have breakfast?",'กินข้าวเช้าหรือยัง',"Yes, I did. I had sticky rice.","Yes, I do. I like breakfast.","I woke up early.",'ถามด้วย Did you ...? ให้ตอบ Yes, I did.',"Right! Answer Did you ...? with Yes, I did. Had is the past of have. | Did you ...? ตอบ Yes, I did. / had = กิน (อดีตของ have)"),
  TT("Good. Please go to the dome. We line up there.",'ดีมาก ไปที่โดมนะ เราเข้าแถวที่นั่น',"OK, sir. I'm going now.","OK, sir. I'm going home now.","Where do students line up?",'ครูบอกให้ไปเข้าแถวที่โดม ให้รับคำ',"Good! I'm going now means you are leaving right away. | I'm going now. = กำลังไปเดี๋ยวนี้")]),
 NPCDEF('beam','Beam','Friend⁣เพื่อน',7,-5,0,[.96,.96,.95],[.14,.2,.42],[.1,.08,.07],'',[
  TT("Good morning! How did you get to school today?",'อรุณสวัสดิ์ วันนี้เธอมาโรงเรียนอย่างไร',"I came by bus.","I will go home by bus.","I am at school.",'เพื่อนถามว่าวันนี้มาโรงเรียนอย่างไร (How did you ...?) ให้บอกวิธีเดินทาง ใช้คำอดีต came',"Right! Came is the past of come. By bus tells how you travelled. | came = มา (อดีตของ come), by bus = โดยรถบัส"),
  TT("Was the traffic busy this morning?",'เช้านี้รถติดไหม',"Yes, it was. The road was busy.","Yes, I did. The bus was late.","I like football. It's my favourite sport.",'เพื่อนถามด้วย Was ...? (อดีต) ให้ตอบ Yes, it was. แล้วบอกว่าถนนรถเยอะ',"Correct! Answer Was ...? with Yes, it was. Busy traffic means many cars. | traffic = การจราจร, busy = รถเยอะ วุ่นวาย, Was ...? ตอบ Yes, it was."),
  TT("Let's go to the dome together.",'ไปที่โดมด้วยกันเถอะ',"Sure! Let's go.","I went there yesterday.","The dome is big.",'เพื่อนชวนไปโดมด้วยกัน (Let\'s ...) ให้ตอบรับ',"Good! Sure! Let's go. accepts your friend's invitation. | Let's go. = ไปกันเถอะ, together = ด้วยกัน")])]});

/* ===== Our school: morning assembly at the flagpole in front of the multipurpose dome (prototype) =====
   From the teacher's 3D campus map: the open-sided dome with a curved orange roof is where students line up;
   the main flagpole (about 21 m) stands on a round two-step base on the south side of the dome;
   building 6 (3 floors, brown hip roof, corridors facing the dome) runs alongside it.
   Here the camera looks north: the flagpole is in front, the dome and the lines of students behind it.
   Walk out on the east path to go back to Gate 1. NPC names are made up. */
SCENES.push({id:'flagpole',name:'Multipurpose Dome · Phibun School',th:'โดมอเนกประสงค์',color:'#B91C1C',orbit:true,spawn:[0,6.6,Math.PI],bounds:[-12.4,12.4,-12,9],
 exits:[{x0:-1.6,x1:1.6,z0:8.3,z1:9.2,to:'gate1',at:[-7,-7.4,0]},
  {x0:-12.4,x1:-11.6,z0:-.5,z1:1.3,to:'b3hall',at:[-11.4,0,Math.PI/2]},
  {x0:-2.7,x1:-.3,z0:-12,z1:-11.75,to:'canteen',at:[7.8,3.2,-Math.PI/2]},/* back of the dome (between two posts): to the canteen */
  {x0:11.6,x1:12.4,z0:2.6,z1:4,to:'football',at:[-15.4,7.5,Math.PI/2]},
  {x0:11.6,x1:12.4,z0:-11.4,z1:-9.8,to:'hall14',at:[0,4.2,Math.PI]},/* back-east corner of the yard: to the assembly hall (the teacher moved it here) */
  {x0:11.6,x1:12.4,z0:-2.2,z1:-.6,to:'sbank',at:[0,3.6,Math.PI]},
  {x0:11.6,x1:12.4,z0:-6.4,z1:-4.8,to:'coop',at:[4.5,3.4,Math.PI]},
  {x0:-12.4,x1:-11.6,z0:-6.4,z1:-4.8,to:'teacherroom',at:[4.5,3.4,Math.PI]},
  {x0:-12.4,x1:-11.6,z0:3.2,z1:4.8,to:'academic',at:[4.5,3.4,Math.PI]}],/* west paths: Teachers' Room (north of Building 3) and Academic Affairs Room (south) (4 Nov, owner decision D1) *//* east path next to the school bank: to the school welfare shop (4 Nov, owner decision A) *//* east path between Gate 1 and the football field: to the school bank *//* north-west path (behind building 6 side of the dome): to the assembly hall *//* east path (south of the Gate 1 path): to the football field *//* south-west path: to the canteen *//* west path: into the classroom in building 6 *//* the front walkway leads back to Gate 1 */
 build(){const c=mk(),A=c.a;
  const STEEL=[.42,.44,.48],ROOF=[.85,.53,.35],ROOF2=[.8,.49,.32],CONC=[.76,.75,.71];
  c.box(0,-.06,0,140,.12,140,[.47,.68,.36]);
  c.box(0,.03,-1,26,.06,13,CONC);c.box(0,.03,-9.85,26,.06,4.7,CONC);/* concrete yard (also behind the dome) */
  /* the dome is big: 20 m wide and 8.5 m deep, open on all sides, concrete floor */
  c.box(0,.07,-7.35,19.4,.08,8.6,[.7,.69,.66]);
  for(let x=-9;x<=9.01;x+=3){if(Math.abs(x)>.01)c.box(x,3.3,-3.1,.3,6.6,.3,STEEL,true);c.box(x,3.3,-11.6,.3,6.6,.3,STEEL,true)}/* the front post in the middle of the aisle was taken out (it blocked the walkway, the teacher asked 3 Nov) */
  for(const z of [-6.0,-8.7]){c.box(-9,3.3,z,.3,6.6,.3,STEEL,true);c.box(9,3.3,z,.3,6.6,.3,STEEL,true)}
  c.box(0,6.55,-3.1,18.6,.35,.35,STEEL);c.box(0,6.55,-11.6,18.6,.35,.35,STEEL);
  for(const x of [-9,9])c.box(x,6.55,-7.35,.35,.35,8.5,STEEL);
  for(let k=-4;k<=4;k++)c.box(0,6.75+(16-k*k)*.17,-7.35+k*.95,19.6,.18,1.02,k%2?ROOF2:ROOF);
  for(const x of [-9,-3,3,9])for(let k=-4;k<=4;k++)c.box(x,6.6+(16-k*k)*.17,-7.35+k*.95,.12,.12,.98,STEEL);/* roof arches */
  /* the low walls on the east side were taken out (Gate 1 moved to the front, the walls made walking hard) */
  /* many students lined up under the dome, facing the flagpole: 12 lines of 7 on both sides of a wide middle aisle;
     the front strip, the middle aisle and the back strip are free, so the player can walk under the dome */
  const kid=(x,z,girl)=>{c.box(x-.1,.3,z,.14,.6,.16,[.12,.16,.33]);c.box(x+.1,.3,z,.14,.6,.16,[.12,.16,.33]);
   if(girl)c.box(x,.55,z,.46,.3,.3,[.12,.16,.33]);c.box(x,.95,z,.46,.62,.26,[.97,.97,.95]);
   c.box(x,1.48,z,.34,.36,.3,[.86,.66,.5]);c.box(x,1.69,z-.02,.36,.1,.34,[.08,.06,.06])};
  for(const s of [-1,1]){for(const ax of [1.7,3,4.3,5.6,6.9,8.2]){const x=s*ax;for(let r=0;r<7;r++)kid(x,-4.4-r*.95,(r+Math.round(ax*10))%2===0)}
   c.ob.push(s<0?[-8.5,-1.4,-10.4,-4.1]:[1.4,8.5,-10.4,-4.1])}
  /* flagpole on a round two-step base (squares here) with the Thai flag */
  c.box(0,.18,1.4,3.4,.36,3.4,CONC,true);c.box(0,.5,1.4,2.4,.3,2.4,[.86,.85,.82]);
  /* real pole is about 21 m; here 10 m (still above the dome roof) so the flag stays in the picture */
  c.box(0,5.3,1.4,.2,9.6,.2,[.95,.95,.95]);c.box(0,10.2,1.4,.34,.2,.34,[.95,.8,.3]);
  {const fx=1.35,fy=8.6,FL=[[.79,.12,.16],[.97,.97,.97],[.17,.2,.45],[.17,.2,.45],[.97,.97,.97],[.79,.12,.16]];
   FL.forEach((col,k)=>c.box(fx,fy+1.25-k*.25-.125,1.4,2.3,.25,.05,col))}
  /* small stage for the teachers in front of the flagpole */
  c.box(-4.6,.25,0.6,4,.5,1.8,[.6,.4,.26],true);
  /* building 6 along the west side: 3 floors, corridors facing the dome, brown hip roof */
  {const bx=-16,bz=-3;c.box(bx,5.4,bz,4,10.8,20,[.91,.88,.81],true);
   for(let f=1;f<=3;f++){c.box(bx+2.6,3.6*f-.15,bz,1.4,.3,20,[.93,.9,.85]);if(f<3)c.box(bx+3.25,3.6*f+.45,bz,.1,.9,20,[.48,.29,.2])}
   for(let f=0;f<3;f++)for(let k=-4;k<=4;k++)c.box(bx+2.02,1.9+f*3.6,bz+k*2.2,.04,1.3,1.2,WIN);
   tPyr(A,bx+.6,10.8,bz,6.6,2.6,21,[.48,.29,.2])}
  /* front walkway back to the school front (Gate 1): wide path to the bottom edge, arrows and a sign */
  c.box(0,.05,6.4,3.4,.08,5.6,CONC);wayPost(c,3.1,5.6);wayMarks(c,0,4.6,0,1,2);
  /* west path to the classroom door on building 6 (ground floor) */
  c.box(-10.6,.05,.4,4.6,.08,1.8,CONC);c.box(-13.95,1.1,.4,.1,2.2,1.4,DOOR);wayPost(c,-9.6,-.9);wayMarks(c,-8.4,.4,-1,0,2);
  /* trees, benches and lamps around the yard */
  for(const [x,z] of [[-11,6.6],[11.2,6.6],[6,7.6],[-6,7.6],[11.6,1.5]])c.tree(x,z);
  c.bench(-7,6.2);c.bench(8,4.6);
  /* back path to the canteen: from the back of the dome, between the posts at x -3 and 0 (the teacher moved it here) */
  c.box(-1.5,.05,-13.2,2.4,.08,2.6,CONC);wayPost(c,-4.6,-11.95);wayMarks(c,-1.5,-10.5,0,-1,1);
  /* east path to the football field (the field is east of the dome on the map) */
  c.box(10.4,.05,3.3,4,.08,1.4,CONC);wayPost(c,9,1.7);wayMarks(c,8.6,3.3,1,0,2);
  /* east path at the back corner of the yard to Ratrangsan Hall (moved here by the teacher) */
  c.box(11.4,.05,-10.6,3.2,.08,1.6,CONC);wayPost(c,10.6,-11.95);wayMarks(c,9.4,-10.6,1,0,2);c.lamp(-10,2);c.lamp(10,2);
  /* east path to the school bank (near the dome, as the teacher said) */
  c.box(10.4,.05,-1.4,4,.08,1.4,CONC);wayPost(c,10.6,-2.75);wayMarks(c,8.6,-1.4,1,0,2);
  /* east path to the school welfare shop, next to the school bank (owner decision A, 4 Nov) */
  c.box(10.4,.05,-5.6,4,.08,1.4,CONC);wayPost(c,10.6,-6.95);wayMarks(c,8.6,-5.6,1,0,2);
  /* west paths to the Teachers' Room and the Academic Affairs Room (owner decision D1, 4 Nov) */
  c.box(-10.4,.05,-5.6,4,.08,1.4,CONC);wayPost(c,-10.6,-6.95);wayMarks(c,-8.6,-5.6,-1,0,2);
  c.box(-10.4,.05,4,4,.08,1.4,CONC);wayPost(c,-10.6,5.4);wayMarks(c,-8.6,4,-1,0,2);
  return{a:new Float32Array(A),ob:c.ob}},
 decals:[{x:-4.5,y:5.75,z:-2.92,w:6.2,h:.95,ry:0,cw:1100,ch:168,draw:(g,W,H)=>{g.fillStyle='#b91c1c';g.fillRect(0,0,W,H);g.strokeStyle='#fde68a';g.lineWidth=8;g.strokeRect(6,6,W-12,H-12);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';{let f=62,t='Multipurpose Dome · โดมอเนกประสงค์';g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(t).width>W*.94&&f>24){f-=2;g.font="700 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillText(t,W/2,H/2+3)}}},
