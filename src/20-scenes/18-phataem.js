/* ===== Ubon: Pha Taem National Park ===== */
SCENES.push({id:'phataem',name:'Pha Taem National Park',th:'อุทยานแห่งชาติผาแต้ม',color:'#9A3412',spawn:[0,3.4,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.7,.62,.45]);
  c.box(-5,3,-8.4,18,6,2.4,[.82,.56,.36],true);c.box(-5,6.2,-7.4,18.4,.5,3.4,[.7,.48,.3]);
  const red=[.7,.15,.1];
  for(let k=0;k<5;k++){const x=-12+k*3.4;
   c.box(x,3.3,-7.18,.12,.8,.04,red);c.box(x,3.5,-7.18,.7,.1,.04,red);c.box(x-.15,2.8,-7.18,.1,.5,.04,red);c.box(x+.15,2.8,-7.18,.1,.5,.04,red);c.box(x,3.85,-7.18,.22,.22,.04,red);
   c.box(x+1.5,2.4,-7.18,.9,.35,.04,red);c.box(x+2.05,2.4,-7.18,.25,.5,.04,red);
   c.box(x+1.2,4.3,-7.18,1.1,.6,.04,red);c.box(x+1.8,4.1,-7.18,.2,.6,.04,red);
   c.box(x+.9,1.4,-7.18,.3,.3,.04,red)}
  c.box(9,-.02,-6.6,10,.12,5.4,[.7,.55,.35]);c.ob.push([4.2,14,-9.6,-3.8]);
  c.box(8,1.6,-9.3,9,3,1.2,[.4,.52,.62]);c.box(12.5,2.2,-9.3,5,4,1.2,[.35,.48,.6]);c.box(11,4.2,-9.3,1.6,1.6,.1,[1,.75,.2]);
  c.box(8,.2,-1.6,5.6,.4,4.6,[.6,.45,.3]);for(let x=5.4;x<=10.6;x+=1.3)c.box(x,.7,-3.9,.1,1,.1,[.5,.4,.3]);c.box(8,1.15,-3.9,5.4,.08,.08,[.5,.4,.3]);
  const pil=(x,z,h)=>{c.box(x,h/2,z,.9,h,.9,[.78,.55,.35],true);c.box(x,h+.3,z,2.2,.7,1.8,[.82,.6,.4],true)};pil(-8,-3.5,2.4);pil(-10.6,-1,1.6);
  c.box(-3,.3,2.2,.15,.6,.15,[.5,.4,.3]);c.box(-3,1.0,2.2,1.4,.8,.1,[.95,.85,.3]);
  c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-5,7.5);c.tree(5.5,7.5);c.lamp(-3,3.9);c.lamp(4,3.9);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('kiat','Mr. Kiat','Park ranger⁣เจ้าหน้าที่อุทยาน',1.5,-.2,0,[.2,.5,.3],[.3,.3,.25],[.1,.07,.05],'hat',[
  TT("Welcome to Pha Taem! This is the easternmost national park in Thailand.",'ยินดีต้อนรับสู่ผาแต้มครับ นี่คืออุทยานแห่งชาติที่อยู่ตะวันออกสุดของประเทศไทย',"Really? Is that why it's famous for the sunrise?","I want to see it. When should I come?","Sounds beautiful! I'll come early.",'ได้ยินว่าอยู่ตะวันออกสุด ให้ถามว่าเพราะอย่างนี้จึงเห็นพระอาทิตย์ขึ้นก่อนไหม','easternmost = อยู่ตะวันออกสุด, national park = อุทยานแห่งชาติ'),
  TT("Yes! This is the first place in Thailand to see the sunrise.",'ใช่ครับ! ที่นี่เห็นพระอาทิตย์ขึ้นเป็นที่แรกในประเทศไทย',"I want to see it. When should I come?","Really? Is that why it's famous for the sunrise?","Sounds beautiful! I'll come early.",'ได้ยินว่าเห็นพระอาทิตย์ขึ้นก่อนใคร ให้ถามว่าควรมาเมื่อไร','sunrise = พระอาทิตย์ขึ้น, the first place = ที่แรก'),
  TT("Come early in the morning. In winter, you may see a sea of mist over the Mekong River.",'มาแต่เช้านะครับ หน้าหนาวอาจเห็นทะเลหมอกเหนือแม่น้ำโขง',"Sounds beautiful! I'll come early.","I want to see it. When should I come?","Really? Is that why it's famous for the sunrise?",'ได้คำแนะนำแล้ว ให้ตอบรับ','sea of mist = ทะเลหมอก, early = เช้าตรู่')]),
 NPCDEF('chada','Ms. Chada','Rock painting guide⁣ไกด์ภาพเขียนสี',-3,-4.2,0,[.8,.4,.2],[.2,.2,.3],[.1,.07,.05],'bun',[
  TT("Look! These rock paintings are three to four thousand years old.",'ดูสิคะ ภาพเขียนสีบนหินเหล่านี้มีอายุสามถึงสี่พันปี',"Wow! Who painted them?","Wow! It's very long.","That's good. We should protect them.",'ได้ยินว่าเก่ามาก ให้ถามว่าใครวาด','rock paintings = ภาพเขียนสีบนหิน, thousand = พัน'),
  TT("Ancient people painted them. This is the longest painted rock wall found in Thailand.",'คนโบราณวาดไว้ค่ะ นี่คือผนังหินภาพเขียนสีที่ยาวที่สุดเท่าที่พบในประเทศไทย',"Wow! It's very long.","Wow! Who painted them?","That's good. We should protect them.",'ได้ยินว่ายาวที่สุด ให้แสดงความทึ่ง','ancient = โบราณ, the longest = ยาวที่สุด'),
  TT("There are four groups of paintings. The government protects them as an ancient site.",'มีภาพเขียนสี 4 กลุ่ม และรัฐคุ้มครองเป็นโบราณสถานค่ะ',"That's good. We should protect them.","Wow! Who painted them?","Wow! It's very long.",'ได้ยินว่ามีการคุ้มครอง ให้เห็นด้วย','protect = ปกป้อง, ancient site = โบราณสถาน')]),
 NPCDEF('ek','Mr. Ek','Nature guide⁣ไกด์ธรรมชาติ',-6.6,-1.5,0,[.5,.4,.3],[.3,.3,.3],[.5,.5,.52],'cap',[
  TT("This is Sao Chaliang. It is a natural sandstone pillar.",'นี่คือเสาเฉลียง เป็นเสาหินทรายตามธรรมชาติครับ',"Wow! Did people make it?","That's a very long time!","Amazing! Nature is beautiful.",'เห็นเสาหิน ให้ถามว่าคนสร้างหรือเปล่า (Did ...?)','sandstone = หินทราย, pillar = เสา'),
  TT("No, wind and water made it over millions of years.",'ไม่ใช่ครับ ลมและน้ำทำให้เป็นแบบนี้เป็นเวลาหลายล้านปี',"That's a very long time!","Wow! Did people make it?","Amazing! Nature is beautiful.",'ได้ยินว่าใช้เวลานานมาก ให้แสดงความทึ่ง','millions of years = หลายล้านปี'),
  TT("Yes! More than one hundred million years.",'ใช่ครับ! มากกว่าหนึ่งร้อยล้านปี',"Amazing! Nature is beautiful.","Wow! Did people make it?","Yes, those mountains are in Laos.",'ได้ยินตัวเลขใหญ่ ให้แสดงความประทับใจ','more than = มากกว่า, nature = ธรรมชาติ')]),
 NPCDEF('mook','Mook','Visitor⁣ผู้มาเที่ยว',8,-2.2,0,[.9,.4,.5],[.25,.3,.5],[.1,.07,.05],'long',[
  TT("Hi! Look at the Mekong River below. Do you see the mountains across it?",'หวัดดี ดูแม่น้ำโขงข้างล่างสิ เห็นภูเขาฝั่งตรงข้ามไหม',"Yes, those mountains are in Laos.","I see. Thailand is on this side.","That's interesting! Like a handprint.",'ถามว่าเห็นภูเขาไหม (Do you ...?) ตอบ Yes, ...','across = ฝั่งตรงข้าม, below = ข้างล่าง'),
  TT("Yes! The Mekong River is the border between Thailand and Laos.",'ใช่! แม่น้ำโขงเป็นเส้นแบ่งเขตระหว่างไทยกับลาว',"I see. Thailand is on this side.","That's interesting! Like a handprint.","Wow! It's very long.",'ได้ยินเรื่องเส้นแบ่งเขต ให้บอกว่าไทยอยู่ฝั่งนี้','border = พรมแดน, on this side = ฝั่งนี้'),
  TT("Did you know? \"Pha Chanadai\" means signing a name with your hand.",'รู้ไหม? "ผาชะนะได" แปลว่า การลงชื่อด้วยฝ่ามือ',"That's interesting! Like a handprint.","Yes, those mountains are in Laos.","I see. Thailand is on this side.",'ได้ยินความหมายของชื่อ ให้แสดงความสนใจ','handprint = รอยมือ, signing a name = การลงชื่อ')])]});
