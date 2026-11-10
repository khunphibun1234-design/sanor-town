waySign(3.1,5.6+.03,0,'School Gate 1','ประตู 1 โรงเรียนพิบูลมังสาหาร','↓'),waySign(-9.6,-.9+.03,0,'Building 3','อาคาร 3 · ห้องเรียน','←'),waySign(-4.6,-11.95+.03,0,'School Canteen','โรงอาหาร 60 ปี','↑'),waySign(9,1.7+.03,0,'Football Field','สนามฟุตบอล','→'),waySign(10.6,-11.95+.03,0,'Ratrangsan Hall','หอประชุมราษฎร์รังสรรค์','→'),waySign(10.6,-2.75+.03,0,'School Bank','ธนาคารโรงเรียน','→'),waySign(10.6,-6.95+.03,0,'P.M. School Welfare Shop','ร้านค้าสวัสดิการโรงเรียน','→'),waySign(-10.6,-6.95+.03,0,"Teachers' Room",'ห้องพักครู','←'),waySign(-10.6,5.4+.03,0,'Academic Affairs Room','ห้องบริหารงานวิชาการ','←')],
 npcs:[
 NPCDEF('homeroom','Ms. Suda','Homeroom teacher⁣ครูประจำชั้น',-2.8,-2.2,Math.PI,[.85,.35,.45],[.2,.2,.26],[.08,.06,.07],'bun',[
  TT("Good morning, class! Please stand in your line.",'สวัสดีตอนเช้า นักเรียน ยืนเข้าแถวของตัวเองนะ',"Good morning, teacher. OK!","Good night, teacher. OK!","Good morning, teacher. I'm going home.",'ครูทักตอนเช้าและบอกให้เข้าแถว ให้ทักทายกลับและรับคำ',"Good! Say Good morning in the morning. Good night is for bedtime. | Good morning = สวัสดีตอนเช้า (Good night ใช้ตอนลาไปนอน)"),
  TT("Now I'm checking names. Number twelve?",'ครูจะเช็กชื่อนะ เลขที่สิบสอง',"Here!","Twelve, please.","Goodbye, teacher.",'ครูเช็กชื่อ เมื่อครูเรียกเลขที่ของเรา ให้ตอบ Here! หรือ Present!',"Right! Say Here! or Present! when the teacher calls your number. | Here! / Present! = มาครับ มาค่ะ (ตอบตอนครูเช็กชื่อ)"),
  TT("Ploy is not in line. Do you know where she is?","พลอยไม่อยู่ในแถว รู้ไหมว่าเธออยู่ที่ไหน","I'm not sure, teacher.","Yes, I'm here.","Here!","หากไม่ทราบว่าเพื่อนอยู่ที่ไหน ให้ตอบตามจริงว่าไม่แน่ใจ","Good! I'm not sure is a polite answer when you don't know. | I'm not sure. = ฉันไม่แน่ใจ เป็นคำตอบสุภาพเมื่อไม่ทราบข้อมูล")]),
 NPCDEF('leader','Nong','Student leader⁣หัวหน้านักเรียน',2.2,2.2,Math.PI,[.97,.97,.95],[.14,.2,.42],[.08,.06,.07],'',[
  TT("It's almost eight o'clock. Please stand still for the national anthem.",'ใกล้แปดโมงแล้ว ยืนตรงเคารพเพลงชาตินะ',"OK. I'll stand still.","OK. I'll go to the canteen.","OK. I'll talk to my friend.",'ใกล้เวลาเคารพธงชาติ ให้รับคำว่าจะยืนตรง',"Correct! Stand still and stay quiet for the national anthem. | stand still = ยืนตรง ยืนนิ่ง, national anthem = เพลงชาติ"),
  TT("The national anthem has finished. Thank you for standing respectfully.","เพลงชาติจบแล้ว ขอบคุณที่ยืนด้วยความเคารพ","You're welcome.","I will run to the canteen.","The flag is going down.","เมื่อมีคนขอบคุณ สามารถตอบว่า You're welcome.","Good! Answer Thank you with You're welcome. | You're welcome. = ด้วยความยินดี"),
  TT("Please listen for the next announcement.","กรุณาฟังประกาศต่อไป","OK. I'll listen carefully.","Let's play football now.","I finished my homework.","ตอบรับคำสั่งและบอกว่าจะตั้งใจฟัง","Good! Listen carefully to every announcement. | listen carefully = ตั้งใจฟัง")]),
 NPCDEF('fame','Fame','Classmate⁣เพื่อนร่วมห้อง',.6,-3.2,0,[.97,.97,.95],[.14,.2,.42],[.1,.08,.07],'',[
  TT("Hey! Did you do the English homework?",'เฮ้ ทำการบ้านภาษาอังกฤษหรือยัง',"Yes, I did. It was easy.","Yes, I do. I like English.","Here!",'ถามด้วย Did you ...? ให้ตอบ Yes, I did.',"Right! Answer Did you ...? with Yes, I did. Easy means not difficult. | Did you ...? ตอบ Yes, I did. / easy = ง่าย"),
  TT("Can I check my answers with you after assembly?","หลังเข้าแถวเคารพธงชาติ ขอตรวจคำตอบกับเธอได้ไหม","Sure. Let's meet in the classroom.","Yes, I did. It was easy.","Sure. I'm in Grade 8.",'เพื่อนขอตรวจคำตอบด้วย ให้ตอบรับและนัดที่ห้องเรียน',"Good! You agreed and said where to meet after assembly. | check answers = ตรวจคำตอบ, after assembly = หลังเข้าแถว"),
  TT("Shh! The teacher is talking.",'ชู่ว ครูกำลังพูดอยู่',"Oops! Sorry.","OK. Let's talk more.","Yes, I'm very hungry.",'เพื่อนเตือนให้เงียบ ให้ขอโทษสั้น ๆ',"Good! Say Oops! Sorry. and stay quiet when the teacher talks. | Shh! = ชู่ว (ให้เงียบ), Oops! Sorry. = อุ๊ย ขอโทษ")]),
 NPCDEF('late','Tong','Late student⁣นักเรียนที่มาสาย',8.4,-1.4,-Math.PI/2,[.97,.97,.95],[.14,.2,.42],[.12,.1,.08],'cap',[
  TT("Oh no! Am I late?","แย่แล้ว ฉันมาสายหรือเปล่า","Yes, a little. Please walk to your line.","Yes, I am. I'm late.","Run as fast as you can.","ตอบ Yes, a little. แล้วแนะนำให้เดินไปเข้าแถว","Correct! A little means not much. Walk, don't run, to your line. | a little = นิดหน่อย; walk = เดิน"),
  TT("Excuse me. Where should I line up?","ขอโทษนะ ฉันควรเข้าแถวตรงไหน","Please ask the homeroom teacher over there.","It's almost eight o'clock now.","I'm in Grade 8 this year.","หากไม่แน่ใจตำแหน่งแถว ให้แนะนำให้ถามครูประจำชั้น","Good! The homeroom teacher can help your friend find the line. | homeroom teacher = ครูประจำชั้น; over there = ตรงนั้น"),
  TT("I'll walk over and ask the teacher.","ฉันจะเดินไปถามครู","Good idea. Be careful.","Run quickly!","Good night!","เพื่อนจะเดินไปถามครู ให้สนับสนุนและเตือนให้ระวัง","Good! Good idea and Be careful are kind words for a friend. | Good idea. = เป็นความคิดที่ดี; Be careful. = ระวังนะ")])]});

/* ===== Our school: Building 3 corridor (hub, 3 Nov, the teacher chose D2): no people, no mission, not a station.
   Doors to the classroom and the indoor stations; rooms without a scene yet have a closed door and a Coming soon plate.
   West end leads back to the dome. When a room gets its scene, its door opens (DOORS[k].to). ===== */
const B3DOORS=[
 {x:-9,side:-1,en:'Classroom',th:'ห้องเรียน อาคาร 3',to:'class85'},
 {x:-4,side:-1,en:'English Language Lab',th:'ห้องปฏิบัติการภาษาอังกฤษ',to:'englab'},
 {x:1,side:-1,en:'Science Lab',th:'ห้องปฏิบัติการวิทยาศาสตร์',to:'scilab'},
 {x:6,side:-1,en:'Music Room',th:'ห้องดนตรี',to:'music'},
 {x:11,side:-1,en:'Art Room',th:'ห้องศิลปะ',to:'art'},
 {x:-6.5,side:1,en:'Student Council Room',th:'ห้องสภานักเรียน',to:'council'},
 {x:-1.5,side:1,en:'Guidance Room',th:'ห้องแนะแนว',to:'guidance'},
 {x:3.5,side:1,en:'PM Studio',th:'ห้องสตูดิโอสื่อสร้างสรรค์',to:'pmstudio'},
 {x:8.5,side:1,en:'Lost and Found',th:'จุดรับแจ้งของหาย',to:'lostfound'}];
function doorPlate(d,back){const soon=!d.to,z=d.side*3.05-d.side*.13+(back?d.side*.05:0);
 return {x:d.x,y:2.64,z,w:2.3,h:.5,ry:(d.side<0)!==!!back?0:Math.PI,cw:520,ch:113,draw:(g,W,H)=>{
  g.fillStyle=soon?'#64748b':'#1f6f43';g.fillRect(0,0,W,H);g.strokeStyle='#f4f1e6';g.lineWidth=6;g.strokeRect(6,6,W-12,H-12);
  g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
  let f=soon?34:40;g.font="700 "+f+"px Anuphan, sans-serif";while(g.measureText(d.en).width>W*.88&&f>20){f-=2;g.font="700 "+f+"px Anuphan, sans-serif"}g.fillText(d.en,W/2,H*(soon?.27:.34));
  f=soon?26:30;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";while(g.measureText(d.th).width>W*.88&&f>16){f-=2;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif"}g.fillStyle='#e9f5ec';g.fillText(d.th,W/2,H*(soon?.56:.7));
  if(soon){g.fillStyle='#FFD23F';g.font="700 20px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Coming soon · เร็ว ๆ นี้',W/2,H*.84)}}}}
SCENES.push({id:'b3hall',hub:true,name:'Building 3 Corridor · Phibun School',th:'ทางเดินอาคาร 3',color:'#475569',orbit:true,spawn:[-11.4,0,Math.PI/2],bounds:[-12.6,12.6,-2.5,2.5],
 exits:[{x0:-12.6,x1:-12.2,z0:-1.6,z1:1.6,to:'flagpole',at:[-10.8,.4,Math.PI/2]},
  ...B3DOORS.filter(d=>d.to).map(d=>({x0:d.x-.7,x1:d.x+.7,z0:d.side<0?-2.5:2.2,z1:d.side<0?-2.2:2.5,to:d.to,at:[4.5,3.4,Math.PI]}))],
 build(){const c=mk();
  const WALL=[.96,.92,.84],CAP=[.62,.5,.36],FLOOR1=[.86,.82,.74],FLOOR2=[.8,.76,.68],DOOR=[.55,.36,.2],FRAME=[.4,.28,.16];
  c.box(0,-.06,0,80,.12,80,[.47,.68,.36]);
  for(let i=0;i<22;i++)for(let j=0;j<5;j++)c.box(-12.6+i*1.2+.6,.04,-2.4+j*1.2,1.2,.04,1.2,(i+j)%2?FLOOR1:FLOOR2);
  /* north wall (tall) and south wall (low, so the camera can look in), with door frames */
  c.box(0,1.4,-3.1,26,2.8,.2,WALL,true);c.box(0,2.83,-3.1,26.1,.06,.3,CAP);
  c.box(0,.6,3.1,26,1.2,.2,WALL,true);c.box(0,1.23,3.1,26.1,.06,.3,CAP);
  c.box(12.8,.6,0,.2,1.2,6.4,WALL,true);c.box(12.8,1.23,0,.3,.06,6.4,CAP);/* east end, low */
  /* west end: open to the dome, posts each side */
  for(const z of [-2.6,2.6])c.box(-12.8,1.2,z,.3,2.4,.3,CAP,true);
  for(const d of B3DOORS){const zw=d.side*3.1,zi=zw-d.side*.12;
   c.box(d.x-.78,1.15,zi,.14,2.3,.14,FRAME);c.box(d.x+.78,1.15,zi,.14,2.3,.14,FRAME);c.box(d.x,2.3,zi,1.7,.14,.14,FRAME);
   if(d.to){c.box(d.x,1.1,zw,1.4,2.2,.24,[.12,.1,.08]);wayMarks(c,d.x,0,0,d.side,1)}
   else{c.box(d.x,1.1,zi,1.4,2.1,.06,DOOR);c.box(d.x+.5,1.1,zi-d.side*.05,.08,.08,.08,[.85,.75,.3])}}
  /* PM Studio entrance (teacher's picture, 5 Nov): red frame, two glass leaves open, showcase boards, a red shoe bench and planters */
  {const x=3.5,zi=3.1-.12;c.box(x-.78,1.15,zi-.02,.16,2.32,.16,[.75,.1,.14]);c.box(x+.78,1.15,zi-.02,.16,2.32,.16,[.75,.1,.14]);c.box(x,2.3,zi-.02,1.72,.16,.16,[.75,.1,.14]);
   c.box(x-.7,1.1,2.65,.04,2,.7,[.7,.82,.88]);c.box(x+.7,1.1,2.65,.04,2,.7,[.7,.82,.88]);
   for(const bx of [x-1.75,x+1.75]){c.box(bx,1.2,2.9,1.3,1.1,.08,[.18,.18,.2],true);c.box(bx,.35,2.9,.06,.7,.06,[.18,.18,.2])}
   c.box(x-1.75,.22,2.55,1,.44,.36,[.25,.25,.28],true);c.box(x-1.75,.47,2.55,1.04,.08,.4,[.75,.1,.14]);
   for(const [px,pz] of [[x-2.05,2.55],[x-1.45,2.55]]){c.box(px,.1,pz,.18,.08,.24,[.95,.95,.95])}
   for(const px of [x-2.85,x+2.85])c.box(px,.3,2.7,.5,.6,.5,[.35,.35,.38]),c.box(px,.75,2.7,.6,.4,.6,[.32,.6,.3])}
  /* notice board and a water fountain between doors */
  c.box(-11.2,1.5,-2.97,1.2,.9,.06,[.62,.45,.25]);c.box(-11.2,1.5,-2.93,1.05,.75,.02,[.95,.92,.82]);
  c.box(12.2,.5,-2.5,.6,1,.5,[.8,.82,.85],true);
  /* yellow arrows back to the dome */
  wayMarks(c,-9.8,1.4,-1,0,1);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[...B3DOORS.filter(d=>d.to!=='pmstudio').map(d=>doorPlate(d)),...B3DOORS.filter(d=>d.side>0&&d.to!=='pmstudio').map(d=>doorPlate(d,true)),/* low south wall: the plate reads from both sides (the camera looks over it) */
  waySign(-11.3,3.1-.25,Math.PI,'Multipurpose Dome','โดมอเนกประสงค์','→'),waySign(-11.3,3.1-.2,0,'Multipurpose Dome','โดมอเนกประสงค์','←'),
  {x:1.75,y:1.2,z:2.85,w:1.2,h:1.0,ry:Math.PI,cw:360,ch:300,draw:(g,W,H)=>{g.fillStyle='#f3f4f6';g.fillRect(0,0,W,H);g.fillStyle='#c8102e';g.fillRect(0,0,W,52);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 30px Anuphan, sans-serif";g.fillText('STUDENT SHOWCASE',W/2,28);
   const C=[['#f59e0b','#1f2937'],['#334155','#94a3b8'],['#0f172a','#f97316'],['#e5e7eb','#6b7280'],['#1e293b','#38bdf8'],['#fde68a','#92400e']];
   C.forEach(([a,b],k)=>{const x=18+(k%3)*112,y=70+Math.floor(k/3)*112;g.fillStyle='#fff';g.fillRect(x-4,y-4,104,104);g.fillStyle=a;g.fillRect(x,y,96,96);g.fillStyle=b;g.fillRect(x+20,y+40,56,36)})}},
  {x:5.25,y:1.2,z:2.85,w:1.2,h:1.0,ry:Math.PI,cw:360,ch:300,draw:(g,W,H)=>{g.fillStyle='#f3f4f6';g.fillRect(0,0,W,H);g.fillStyle='#c8102e';g.fillRect(0,0,W,52);
   g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';g.font="700 30px Anuphan, sans-serif";g.fillText('STUDIO NEWS',W/2,28);
   const T=[['FILM','CAMP','#1f2937'],['PHOTO','CONTEST','#334155'],['SHORT','FILM','#f8fafc'],['PODCAST','PROJECT','#7f1d1d']];
   T.forEach(([a,b,col],k)=>{const x=20+(k%2)*166,y=66+Math.floor(k/2)*114;g.fillStyle=col;g.fillRect(x,y,150,102);g.fillStyle=col==='#f8fafc'?'#111827':'#fff';g.font="700 26px Anuphan, sans-serif";g.fillText(a,x+75,y+40);g.fillText(b,x+75,y+72)})}},
  {x:3.5,y:2.62,z:2.92,w:2.3,h:.5,ry:Math.PI,cw:520,ch:113,draw:(g,W,H)=>{g.fillStyle='#26262b';g.fillRect(0,0,W,H);g.textBaseline='middle';g.textAlign='left';
   g.font="800 52px Anuphan, sans-serif";const a='PM ',b='STUDIO',wa=g.measureText(a).width,wb=g.measureText(b).width,x0=(W-wa-wb)/2;g.fillStyle='#e11d2e';g.fillText(a,x0,44);g.fillStyle='#f5f5f5';g.fillText(b,x0+wa,44);
   g.textAlign='center';g.fillStyle='#d1d5db';let f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('ห้องสตูดิโอสื่อสร้างสรรค์',W/2,90)}},
  {x:3.5,y:2.62,z:2.97,w:2.3,h:.5,ry:0,cw:520,ch:113,draw:(g,W,H)=>{g.fillStyle='#26262b';g.fillRect(0,0,W,H);g.textBaseline='middle';g.textAlign='left';
   g.font="800 52px Anuphan, sans-serif";const a='PM ',b='STUDIO',wa=g.measureText(a).width,wb=g.measureText(b).width,x0=(W-wa-wb)/2;g.fillStyle='#e11d2e';g.fillText(a,x0,44);g.fillStyle='#f5f5f5';g.fillText(b,x0+wa,44);
   g.textAlign='center';g.fillStyle='#d1d5db';let f=28;g.font="600 "+f+"px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('ห้องสตูดิโอสื่อสร้างสรรค์',W/2,90)}},
  {x:-6.5,y:1.9,z:-2.98,w:2.4,h:.4,ry:0,cw:640,ch:107,draw:(g,W,H)=>{g.fillStyle='#14306E';g.fillRect(0,0,W,H);g.fillStyle='#fff';g.textAlign='center';g.textBaseline='middle';
   g.font="700 44px Anuphan, 'Noto Sans Thai', sans-serif";g.fillText('Building 3 · อาคาร 3',W/2,H/2+2)}}],
 npcs:[]});
