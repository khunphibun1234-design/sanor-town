/* ===== Ubon: Longboat Racing ===== */
SCENES.push({id:'longboat',name:'Longboat Racing',th:'แข่งเรือยาว',color:'#0369A1',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.6,.78,.45]);
  c.box(0,-.02,-6.5,28,.12,5.6,[.3,.55,.8]);c.ob.push([-14,14,-9.6,-3.6]);
  c.box(0,.02,.4,26,.04,2.4,[.82,.74,.58]);
  const boat=(x,z,col,len,n)=>{c.box(x,.3,z,len,.5,.9,col);c.box(x+len/2,.7,z,.8,.5,.5,col);c.box(x-len/2,.6,z,.6,.4,.5,col);
   for(let i=0;i<n;i++){const px=x-len/2+1+i*((len-2)/Math.max(n-1,1));c.box(px,.85,z-.15,.35,.5,.35,[[.9,.2,.2],[.95,.85,.2],[.2,.6,.3]][i%3]);c.box(px+.15,.55,z+.5,.08,.08,1.1,[.4,.3,.2])}};
  boat(-2,-4.8,[.8,.15,.15],11,11);boat(-1,-6.6,[.15,.5,.3],8.5,8);boat(0,-8.2,[.15,.3,.7],6,6);
  c.box(10,2,-3.8,.12,4,.12,[.4,.3,.2]);c.box(10,2,-9,.12,4,.12,[.4,.3,.2]);c.box(10,3.8,-6.4,.1,.3,5.2,[.9,.2,.2]);
  c.box(4,.3,-1.4,6,.5,.9,[.55,.35,.2],true);c.box(7.2,.7,-1.4,.8,.5,.5,[.55,.35,.2]);c.box(.8,.6,-1.4,.6,.4,.5,[.55,.35,.2]);
  for(let x=-11;x<=11;x+=1.5)c.box(x,3.2,-2.4,.45,.35,.05,[[.9,.2,.2],[.95,.8,.2],[.2,.6,.8]][((x+11)/1.5|0)%3]);
  c.box(-8,2.4,0.8,3,.12,2,[.9,.3,.2]);for(const x of [-9.4,-6.6])c.box(x,1.2,1.7,.12,2.4,.12,[.5,.4,.3]);
  c.bench(8,5);c.tree(-11.4,5.5);c.tree(11.4,5.5);c.tree(-6,7.5);c.lamp(-4,3.6);c.lamp(5,3.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('pong','Mr. Pong','Paddler⁣ฝีพาย',-6,-2.6,0,[.9,.2,.2],[.15,.2,.35],[.08,.06,.05],'cap',[
  TT("Hi! I'm a paddler. We race every year.",'หวัดดี ผมเป็นฝีพาย เราแข่งกันทุกปีครับ',"Cool! How many people are in your boat?","Wow! That's a lot of people!","Good luck in the race!",'เจอฝีพาย ให้ถามว่าในเรือมีกี่คน','paddler = ฝีพาย, How many people ...? = ... กี่คน'),
  TT("Forty-five paddlers. It's a large long boat.",'สี่สิบห้าคนครับ เป็นเรือยาวใหญ่',"Wow! That's a lot of people!","How many people are in your boat?","Good luck in the race!",'ได้ยินจำนวนมาก ให้แสดงความทึ่ง','large long boat = เรือยาวใหญ่ (ประมาณ 41–55 คน)'),
  TT("Yes! We work together as a team.",'ใช่ครับ! เราทำงานร่วมกันเป็นทีม',"Good luck in the race!","Cool! How many people are in your boat?","Wow! That's a lot of people!",'ได้ยินว่าทำงานเป็นทีม ให้อวยพรให้โชคดี','as a team = เป็นทีม')]),
 NPCDEF('dam','Mr. Dam','Boat builder⁣ช่างต่อเรือ',4,.3,0,[.6,.45,.3],[.3,.3,.3],[.75,.75,.78],'hat',[
  TT("This boat is made from one big log.",'เรือลำนี้ทำจากไม้ซุงต้นใหญ่ท่อนเดียวครับ',"Really? What kind of wood is it?","Teak or takian wood.","Wow! That's a lot of people!",'ได้ยินว่าทำจากไม้ท่อนเดียว ให้ถามชนิดไม้','log = ไม้ซุง, What kind of ...? = ... ชนิดไหน'),
  TT("Teak or takian wood.",'ไม้สักหรือไม้ตะเคียนครับ',"That's interesting. Is it heavy?","Really? What kind of wood is it?","The small boat is the biggest.",'ได้ชื่อไม้แล้ว ให้ถามต่อว่าหนักไหม','teak = ไม้สัก'),
  TT("We have small, medium, and large long boats.",'เรามีเรือยาวเล็ก กลาง และใหญ่ครับ',"The large boat has the most paddlers.","Really? What kind of wood is it?","The small boat has the most paddlers.",'ได้ยินขนาดเรือ ให้บอกว่าเรือใหญ่มีฝีพายมากที่สุด','the most = มากที่สุด (ใหญ่ 41–55, กลาง 31–40, เล็กไม่เกิน 30 คน)')]),
 NPCDEF('mon','Ms. Mon','Festival guide⁣ไกด์อาสางานแข่งเรือ',-1,-.8,0,[.2,.6,.5],[.2,.2,.3],[.1,.07,.05],'long',[
  TT("Welcome to the Long Boat Race! Do you know when it is?",'ยินดีต้อนรับสู่งานแข่งเรือยาวค่ะ รู้ไหมคะว่าจัดเมื่อไร',"Yes. It's in the flood season, after Buddhist Lent.","For merit, for unity, and for fun.","Wow! It's a very old tradition.",'ถามว่ารู้ไหมว่าจัดเมื่อไร ให้ตอบช่วงเวลา','flood season = ฤดูน้ำหลาก, after Buddhist Lent = หลังออกพรรษา'),
  TT("That's right! Why do people hold the race?",'ถูกต้องค่ะ! ทำไมผู้คนถึงจัดการแข่งขันคะ',"For merit, for unity, and for fun.","Yes. It's in the flood season, after Buddhist Lent.","It started in the Ayutthaya period.",'ถามเหตุผลของงาน ให้ตอบ (ทำบุญ ความสามัคคี ความสนุก)','merit = บุญ, unity = ความสามัคคี'),
  TT("Very good! The race is very old. It started in the Ayutthaya period.",'เก่งมากค่ะ! ประเพณีนี้เก่าแก่มาก เริ่มตั้งแต่สมัยอยุธยา',"Wow! It's a very old tradition.","For merit, for unity, and for fun.","Yes. It's in the flood season, after Buddhist Lent.",'ได้ยินว่าเก่าแก่ ให้แสดงความทึ่ง','tradition = ประเพณี')]),
 NPCDEF('kwan','Kwan','Spectator⁣ผู้ชมการแข่งขัน',9,1.8,-Math.PI/2,[.95,.7,.25],[.2,.3,.5],[.1,.07,.05],'long',[
  TT("Hi! Do you live near the river?",'หวัดดี เธออยู่ใกล้แม่น้ำไหม',"Yes, I do. I live near the Mun River.","Yes, I do. It's fun!","OK! Go, go, go!",'ถามว่าอยู่ใกล้แม่น้ำไหม (Do you ...?) ตอบ Yes, I do.','near = ใกล้, the Mun River = แม่น้ำมูล'),
  TT("Do you come to the race every year?",'เธอมาดูแข่งทุกปีไหม',"Yes, I do. It's fun!","Yes, I do. I live near the Mun River.","OK! Go, go, go!",'ถามว่ามาทุกปีไหม (Do you ...?) ตอบ Yes, I do.','every year = ทุกปี'),
  TT("Me too! Let's cheer for the red boat!",'ฉันก็เหมือนกัน! เชียร์เรือสีแดงกันเถอะ',"OK! Go, go, go!","Yes, I do. It's fun!","Yes, I do. I live near the Mun River.",'ถูกชวนเชียร์ ให้ตอบรับ','cheer = เชียร์, Let\'s ... = ไป ... กันเถอะ')])]});
