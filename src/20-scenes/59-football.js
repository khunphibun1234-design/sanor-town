/* ===== Our school: the football field with the running track (from the teacher's map: 400 m track on the east side,
   "ศาลาสนามฟุตบอล" = long shelter with a green roof on the west side of the field) =====
   Shortened to fit a phone: pitch with goals and lines, a red track around it, the green-roof shelter with steps.
   Enter from the flagpole yard at the south-west corner. NPC names are made up. */
SCENES.push({id:'football',name:'Football Field · Phibun School',th:'สนามฟุตบอล',color:'#15803D',orbit:true,spawn:[-15.4,7.5,Math.PI/2],bounds:[-17,13.4,-9.4,9.4],
 exits:[{x0:-17,x1:-16.4,z0:6.5,z1:8.5,to:'flagpole',at:[9.4,3.3,-Math.PI/2]},
  {x0:12.8,x1:13.4,z0:6.6,z1:8.4,to:'nurse',at:[0,3.6,Math.PI]},/* south-east path: to the nurse's room */
  {x0:12.8,x1:13.4,z0:-8.4,z1:-6.6,to:'gym',at:[7.6,3.2,-Math.PI/2]},/* north-east path: to the school gym (4 Nov) */
  {x0:-12,x1:-10.4,z0:-9.4,z1:-8.9,to:'garden',at:[0,5.3,Math.PI]},/* north-west path: to the school botanical garden (4 Nov) */
  {x0:2.5,x1:4.5,z0:-9.4,z1:-8.9,to:'pool',at:[0,5.3,Math.PI]}],/* north path: to the school swimming pool (4 Nov, owner decision D4) *//* south-west corner path leads back to the flagpole yard */
 build(){const c=mk();
  const TRACK=[.7,.33,.24],LINE=[.97,.96,.92],PITCH=[.36,.66,.3],PITCH2=[.33,.62,.28],ROOF=[.25,.54,.42];
  c.box(0,-.06,0,90,.12,90,[.47,.68,.36]);
  /* red track around the pitch, lane lines on the long sides */
  c.box(0,.03,0,27,.04,19,TRACK);
  for(let k=1;k<4;k++){const o=k*.75;c.box(0,.055,-6.5-o,21,.01,.05,LINE);c.box(0,.055,6.5+o,21,.01,.05,LINE)}
  c.box(-9,.055,7.25+.75,.08,.01,3,LINE);/* start line */
  /* pitch with mowing stripes and white lines */
  for(let i=0;i<7;i++)c.box(-9+i*3,.06,0,3,.04,13,i%2?PITCH2:PITCH);
  const ln=(x,z,sx,sz)=>c.box(x,.085,z,sx,.01,sz,LINE);
  ln(0,-6.2,20.4,.1);ln(0,6.2,20.4,.1);ln(-10.2,0,.1,12.5);ln(10.2,0,.1,12.5);ln(0,0,.1,12.5);
  for(let a=0;a<24;a++){const t=a/24*Math.PI*2;ln(Math.cos(t)*2,Math.sin(t)*2,.32,.32)}
  for(const s of [-1,1]){ln(s*8.6,0,.1,6);ln(s*9.4,-3,1.6,.1);ln(s*9.4,3,1.6,.1);
   /* goals: two posts, crossbar and a net at the back */
   const gx=s*10.35;c.box(gx,1,-1.8,.12,2,.12,LINE,true);c.box(gx,1,1.8,.12,2,.12,LINE,true);c.box(gx,2,0,.12,.12,3.72,LINE);
   c.box(gx+s*.8,1,0,.04,2,3.6,[.86,.88,.9]);c.box(gx+s*.4,1.98,0,.8,.04,3.6,[.86,.88,.9])}
  c.box(1.2,.17,.6,.3,.3,.3,[.98,.98,.98]);c.box(1.2,.17,.6,.12,.31,.12,[.15,.15,.15]);/* ball */
  for(const [x,z] of [[-6,-3],[-6,3],[-4.5,0]])c.box(x,.18,z,.3,.36,.3,[1,.5,.1]);/* cones */
  /* classmates in PE clothes playing on the pitch */
  const kid=(x,z,shirt,ry)=>{c.box(x-.1,.3,z,.14,.6,.16,[.86,.66,.5]);c.box(x+.1,.3,z,.14,.6,.16,[.86,.66,.5]);c.box(x,.66,z,.46,.24,.3,[.12,.16,.33]);
   c.box(x,1.02,z,.46,.5,.26,shirt);c.box(x,1.48,z,.34,.36,.3,[.86,.66,.5]);c.box(x,1.69,z,.36,.1,.34,[.08,.06,.06]);c.ob.push([x-.3,x+.3,z-.25,z+.25])};
  kid(4,2.5,[.2,.45,.85]);kid(6,-1.5,[.2,.45,.85]);kid(9.4,.4,[.95,.8,.2]);kid(2.5,-3.5,[.85,.25,.25]);kid(5.5,4.2,[.85,.25,.25]);kid(-2.5,3.8,[.85,.25,.25]);
  kid(0,-8.2,[.2,.45,.85]);kid(-5,8.3,[.95,.8,.2]);
  /* the green-roof shelter (sala) on the west side with three steps of seats */
  for(let k=0;k<3;k++)c.box(-15.6+k*.7,.25+k*.25,0,.9,.5+k*.5,10,[.85,.83,.78]);
  c.ob.push([-16.8,-14.2,-5,5]);
  for(const z of [-5,-1.7,1.7,5]){c.box(-16.6,1.7,z,.25,3.4,.25,[.75,.76,.78],true);c.box(-14.1,1.5,z,.25,3,.25,[.75,.76,.78],true)}
  c.box(-15.35,3.35,0,3.4,.18,10.8,ROOF);c.box(-15.35,3.5,0,1.6,.18,10.8,[.22,.48,.38]);
  for(const [x,z] of [[-14.6,2.8],[-15.2,-1.2],[-14.6,-3.6]])c.box(x,1.5,z,.36,.5,.26,[.97,.97,.95]);/* students resting on the steps */
  c.tree(12.2,-9.8);c.tree(12.2,9.8);c.tree(-16.4,-8.4);
  /* way out: path at the south-west corner, arrow and sign */
  c.box(-15.4,.05,7.5,3.4,.08,2,[.76,.75,.71]);wayMarks(c,-13.9,7.5,-1,0,1);wayPost(c,-15.4,5.9);
  /* south-east path to the nurse's room */
  c.box(12,.05,7.5,3,.08,1.8,[.76,.75,.71]);wayMarks(c,11.2,7.5,1,0,1);wayPost(c,11.6,5.9);
  /* north path to the school swimming pool (4 Nov) */
  c.box(3.5,.05,-8.4,1.8,.08,2.2,[.76,.75,.71]);wayMarks(c,3.5,-6.6,0,-1,1);wayPost(c,5.1,-5.9);
  /* north-west path to the school botanical garden (4 Nov) */
  c.box(-11.2,.05,-8.4,1.8,.08,2.2,[.76,.75,.71]);wayMarks(c,-11.2,-6.6,0,-1,1);wayPost(c,-9.6,-5.9);
  /* north-east path to the school gym (4 Nov) */
  c.box(12,.05,-7.5,3,.08,1.8,[.76,.75,.71]);wayMarks(c,11.2,-7.5,1,0,1);wayPost(c,11.6,-5.9);
  return{a:new Float32Array(c.a),ob:c.ob}},
 decals:[waySign(-15.4,5.9+.03,0,'Multipurpose Dome','โดมอเนกประสงค์','←'),waySign(11.6,5.9+.03,0,"School Nurse's Office",'ห้องพยาบาล','→'),waySign(11.6,-5.9+.03,0,'School Gym','โรงยิม','→'),waySign(-9.6,-5.9+.03,0,'School Botanical Garden','สวนพฤกษศาสตร์โรงเรียน','↑'),waySign(5.1,-5.9+.03,0,'School Swimming Pool','สระว่ายน้ำโรงเรียน','↑')],
 npcs:[
 NPCDEF('pe','Mr. Tee','PE teacher⁣ครูพลศึกษา',-9,8.2,Math.PI,[.95,.95,.95],[.15,.2,.45],[.08,.06,.07],'cap',[
  TT("Everyone, line up! First, we warm up for five minutes.","ทุกคนเข้าแถว! ก่อนอื่นเราอบอุ่นร่างกายเป็นเวลา 5 นาที","OK, teacher. I'm ready.","OK, teacher. I'm going home now.","Can we skip the warm-up?","ครูให้นักเรียนเข้าแถวและอบอุ่นร่างกาย ควรตอบรับเพื่อแสดงความพร้อม","Great! You are ready for PE class. | เยี่ยมมาก! เธอพร้อมสำหรับคาบพลศึกษาแล้ว"),
  TT("Now, run two laps around the track.","ต่อไป วิ่งรอบลู่วิ่งสองรอบ","Two laps? OK, I'll try.","Two laps? OK, I'll walk home.","Two laps? I thought you said ten laps.","ครูให้วิ่งสองรอบ นักเรียนควรทวนจำนวนรอบและตอบรับคำสั่ง","Well done! You understood the number of laps. | ทำได้ดี! เธอเข้าใจจำนวนรอบที่ครูกำหนด"),
  TT("Good job! Drink some water and take a rest.","เก่งมาก! ดื่มน้ำแล้วพักก่อนนะ","Thank you, teacher. I'm very tired.","Thank you, teacher. I'll run ten more laps.","No, I don't need any water or rest.","ครูชมและแนะนำให้ดื่มน้ำกับพัก นักเรียนควรขอบคุณและตอบอย่างเหมาะสม","Good response! You thanked your teacher and expressed how you feel. | ตอบได้ดี! เธอขอบคุณครูและบอกความรู้สึกของตนเองได้")]),
 NPCDEF('arm','Arm','Classmate⁣เพื่อนร่วมห้อง',-2.4,.4,-Math.PI/2,[.2,.45,.85],[.12,.16,.33],[.08,.06,.07],'',[
  TT("Hey! Do you want to play football with us?","เฮ้! เธออยากเล่นฟุตบอลกับพวกเราไหม","Sure! I love football.","Yes, I want play football.","I'm playing football yesterday.","เลือกประโยคตอบรับคำชวนที่ถูกทั้งความหมายและไวยากรณ์","Awesome! You accepted your friend's invitation. | ยอดเยี่ยม! เธอตอบรับคำชวนของเพื่อนแล้ว"),
  TT("Can you be the goalkeeper?","เธอเป็นผู้รักษาประตูได้ไหม","Sure. I'll be the goalkeeper.","Sure. I'll be the referee.","No, I'll be the goalkeeper.","Arm ขอให้เธอเป็นผู้รักษาประตู ควรตอบรับให้ตรงกับหน้าที่ที่เพื่อนขอ","Great! You agreed to be the goalkeeper. | เยี่ยมมาก! เธอตกลงเป็นผู้รักษาประตูแล้ว"),
  TT("Pass the ball to me!","ส่งบอลมาให้ฉันหน่อย!","OK! Here it comes!","OK! I'll keep the ball.","Here you are. Take my notebook.","Arm ขอให้ส่งบอล นักเรียนควรตอบรับและบอกว่ากำลังส่งบอลให้","Nice pass! You responded to your teammate. | ส่งบอลได้ดี! เธอตอบสนองต่อเพื่อนร่วมทีมได้เหมาะสม")]),
 NPCDEF('fah','Fah','Runner⁣นักวิ่ง',4.5,-7.6,-Math.PI/2,[.95,.8,.2],[.12,.16,.33],[.08,.06,.07],'long',[
  TT("I'm practising for sports day. Do you want to run with me?","ฉันกำลังฝึกซ้อมสำหรับวันกีฬาสี เธออยากวิ่งกับฉันไหม","Sure. Let's run together.","Sure. Let's eat together.","Sure. Let's read together.","Fah ชวนวิ่งซ้อมกีฬาสี ภารกิจนี้ต้องการให้นักเรียนตอบรับคำชวน","Excellent! You accepted Fah's invitation to run. | ยอดเยี่ยม! เธอตอบรับคำชวนวิ่งของ Fah แล้ว"),
  TT("Wow, you run fast! Who taught you?","ว้าว เธอวิ่งเร็วจัง! ใครสอนเธอ","My dad taught me.","I run every morning.","I learned to run last year.","คำถาม Who taught you? ต้องการทราบว่าใครเป็นคนสอน","Correct! You answered a \"Who\" question with a person. | ถูกต้อง! เธอตอบคำถาม Who โดยระบุบุคคลได้เหมาะสม"),
  TT("Which colour team are you on for sports day?","วันกีฬาสีเธออยู่ทีมสีอะไร","I'm on the blue team.","I'm wearing blue shoes.","I like the red team.","ในสถานการณ์จำลองนี้ นักเรียนอยู่ Blue Team ให้ตอบชื่อทีมที่ตนเองสังกัด","That's right! You are on the Blue Team in this game. | ถูกต้อง! ในเกมนี้เธออยู่ทีมสีน้ำเงิน ซึ่งเป็นทีมสมมติ")]),
 NPCDEF('jo','Jo','Hurt friend⁣เพื่อนที่บาดเจ็บ',-13,-2.2,Math.PI/2,[.85,.25,.25],[.12,.16,.33],[.1,.08,.07],'',[
  TT("Ouch! I hurt my ankle.","โอ๊ย! ฉันเจ็บข้อเท้า","Oh no! Let's get a teacher to help.","Oh no! Let's play more football.","Don't worry. Keep running.","Jo เจ็บข้อเท้า ควรหยุดกิจกรรมและขอความช่วยเหลือจากครู","Good thinking! You asked an adult for help. | คิดได้ดี! เธอเลือกขอความช่วยเหลือจากครู"),
  TT("Can you help me get to the nurse's room?","เธอช่วยพาฉันไปห้องพยาบาลได้ไหม","Of course. Let's ask the teacher to help us.","Of course. Let's go back to the football field.","You can run there by yourself.","Jo ต้องการไปห้องพยาบาล ควรตอบรับและขอให้ครูช่วยพาไปอย่างปลอดภัย","Well done! You offered help and involved the teacher. | ทำได้ดี! เธอเสนอความช่วยเหลือและขอให้ครูช่วยดูแล"),
  TT("Thanks. You're a good friend.","ขอบคุณนะ เธอเป็นเพื่อนที่ดี","You're welcome. Get well soon!","You're welcome. Good night!","You're welcome. See you at the football game!","Jo ขอบคุณที่ช่วยเหลือ ควรตอบรับคำขอบคุณและอวยพรให้หายเร็ว ๆ","Wonderful! You showed kindness to your friend. | ยอดเยี่ยม! เธอแสดงความห่วงใยต่อเพื่อน")])]});

