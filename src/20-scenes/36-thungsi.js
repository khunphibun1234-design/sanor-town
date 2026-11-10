/* ===== Ubon: Thung Si Mueang Park ===== */
SCENES.push({id:'thungsi',name:'Thung Si Mueang Park',th:'ทุ่งศรีเมือง',color:'#15803D',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.45,.75,.38]);
  c.box(0,-.02,-8.4,26,.12,1.8,[.3,.62,.85]);c.ob.push([-14,14,-9.6,-7.4]);
  c.box(0,.04,0,24,.05,1.6,[.88,.82,.7]);c.box(0,.04,-3.4,1.8,.05,6.6,[.88,.82,.7]);
  c.box(-10.5,1.0,-6.4,.4,2.0,.4,[.9,.88,.85],true);c.box(-8.5,1.0,-6.4,.4,2.0,.4,[.9,.88,.85],true);c.box(-9.5,2.1,-6.4,2.6,.35,.5,[.75,.25,.2]);
  c.box(8.5,1.0,-6.4,.4,2.0,.4,[.9,.88,.85],true);c.box(10.5,1.0,-6.4,.4,2.0,.4,[.9,.88,.85],true);c.box(9.5,2.1,-6.4,2.6,.35,.5,[.75,.25,.2]);
  c.box(5.6,.5,-3.4,2.6,1.0,2.6,[.7,.6,.45],true);c.box(5.6,2.4,-3.4,1.4,3.8,1.4,[.95,.8,.35],true);c.box(5.6,4.5,-3.4,.5,.9,.5,[1,.55,.15]);
  for(let a=0;a<6;a++)c.box(5.6+Math.cos(a)*.75,2.4+((a*7)%5)*.5,-3.4+Math.sin(a)*.75,.18,.5,.18,[.85,.6,.2]);
  c.box(-5.6,.4,-3.4,2.0,.8,2.0,[.75,.73,.7],true);c.box(-5.6,1.5,-3.4,.7,1.6,.7,[.6,.58,.55]);c.box(-5.6,2.5,-3.4,1.0,.3,1.0,[.85,.75,.4]);
  c.box(9.2,.45,3.4,1.6,.9,.8,[.95,.55,.2],true);c.box(10.2,1.0,3.4,.1,2.0,.1,[.5,.5,.55]);c.box(8.4,1.0,3.4,.1,2.0,.1,[.5,.5,.55]);c.box(9.2,1.95,3.4,2.0,.1,.1,[.5,.5,.55]);c.box(9.2,.35,2.0,1.2,.7,.4,[.9,.3,.3],true);
  c.box(-9.6,.3,3.0,3.0,.1,.9,[.8,.55,.35]);c.box(-9.6,.35,3.0,.2,.7,.2,[.5,.5,.55]);
  c.bench(-1.2,5.2);c.bench(3.0,5.2);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.tree(-2.4,-6.0);c.tree(2.4,-6.0);c.tree(-11.8,-3);c.tree(11.8,0);c.lamp(-4,2.0);c.lamp(4,2.0);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('guide','Ms. Pim','Park guide⁣ไกด์สวนสาธารณะ',-2.6,-.4,Math.PI,[.2,.6,.4],[.25,.25,.3],[.08,.06,.07],'bun',[
  TT("Welcome to Thung Si Mueang! It is a big park in the middle of the city.",'ยินดีต้อนรับสู่ทุ่งศรีเมือง สวนใหญ่กลางเมืองค่ะ',"It's a beautiful park.","It's a small park.","There is water around the park.",'ได้ยินว่าเป็นสวนใหญ่กลางเมือง ให้ชมว่าสวย','in the middle of = ตรงกลาง/ใจกลาง'),
  TT("There is water around the park, and it has four gates.",'มีคูน้ำล้อมรอบสวน และมีประตูทางเข้าสี่ประตูค่ะ',"Four gates? That's interesting.","Two gates? That's interesting.","Look at the giant candle.",'ได้ยินว่ามีสี่ประตู ให้ตอบอย่างสนใจ','gates = ประตูทางเข้า, around = รอบ ๆ'),
  TT("Look at the giant candle. It is beautiful at night.",'ดูต้นเทียนขนาดใหญ่สิคะ ตอนกลางคืนสวยมากค่ะ',"I want to come back at night.","Is it beautiful at night?","Four gates? That's interesting.",'ได้ยินว่าสวยตอนกลางคืน ให้บอกว่าอยากกลับมาดูตอนกลางคืน','giant candle = ต้นเทียนขนาดใหญ่, come back = กลับมา')]),
 NPCDEF('runner','Mr. Tai','Jogger⁣คนวิ่งออกกำลังกาย',-8.6,-.8,Math.PI/2,[.2,.5,.8],[.15,.15,.2],[.1,.07,.05],'cap',[
  TT("Hi! I run in this park every morning.",'สวัสดี ผมวิ่งในสวนนี้ทุกเช้าเลย',"That's great. Is it good exercise?","Do you come here often?","I run in this park every morning.",'ได้ยินว่าวิ่งทุกเช้า ให้ถามว่าเป็นการออกกำลังที่ดีไหม','exercise = การออกกำลังกาย, every morning = ทุกเช้า'),
  TT("Yes, it is. The air here is fresh, and there are many trees.",'ใช่ครับ อากาศที่นี่สดชื่น และมีต้นไม้เยอะ',"I like trees. They give shade.","Is it good exercise?","There are no trees here.",'ได้ยินว่ามีต้นไม้เยอะ ให้ตอบว่าชอบต้นไม้','air = อากาศ, fresh = สดชื่น, shade = ร่มเงา'),
  TT("This park is the lungs of the city. Please keep it clean.",'สวนนี้เหมือนปอดของเมือง ช่วยกันรักษาความสะอาดด้วยนะ',"OK. I will.","Please keep it clean.","Is it good exercise?",'ได้ยินคำขอให้รักษาความสะอาด ให้รับปาก','lungs = ปอด, keep ... clean = รักษา ... ให้สะอาด')]),
 NPCDEF('mom','Ms. Noi','Mother⁣คุณแม่',9.4,1.0,Math.PI,[.9,.5,.35],[.25,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! My son loves the playground here.",'สวัสดีค่ะ ลูกชายฉันชอบสนามเด็กเล่นที่นี่มาก',"It looks like fun.","We come here on Sundays.","Does your son like the playground?",'ได้ยินว่าลูกชอบสนามเด็กเล่น ให้ตอบว่าดูสนุก','playground = สนามเด็กเล่น (อเมริกัน), looks like fun = ดูสนุก'),
  TT("We come here on Sundays. We also have a picnic.",'เรามาที่นี่ทุกวันอาทิตย์ และปิกนิกกันด้วยค่ะ',"That sounds nice.","Do you come here often?","Do you come here on Sundays?",'ได้ยินว่ามาทุกวันอาทิตย์ ให้ตอบว่าฟังดูดี','picnic = ปิกนิก, on Sundays = ทุกวันอาทิตย์'),
  TT("Do you come here often?",'เธอมาที่นี่บ่อยไหมคะ',"Yes, I come here with my friends.","Yes, it is. It looks like fun.","My son loves the playground here.",'ถามว่ามาบ่อยไหม (Do you ...?) ตอบ Yes, I do.','often = บ่อย, with my friends = กับเพื่อน ๆ')]),
 NPCDEF('visitor','Mr. Kit','Visitor⁣ผู้มาเยือน',-4.6,-1.6,Math.PI,[.4,.3,.55],[.2,.2,.25],[.1,.07,.05],'',[
  TT("Excuse me. What is this monument?",'ขอโทษครับ อนุสาวรีย์นี้คืออะไรครับ',"It's the Monument of Merit.","It's a beautiful park.","It's in the middle of the city.",'ถามว่าอนุสาวรีย์อะไร ตอบชื่ออนุสาวรีย์','Monument of Merit = อนุสาวรีย์แห่งความดี'),
  TT("It says thank you for the kindness of the people of Ubon.",'ที่นี่ขอบคุณน้ำใจและความเมตตาของชาวอุบลฯ ครับ',"Ubon people are kind.","What is this monument?","It says sorry to the people of Ubon.",'ได้ยินเรื่องความเมตตา ให้ตอบว่าชาวอุบลใจดี','kindness = ความเมตตา/น้ำใจ, kind = ใจดี'),
  TT("People remember it every year on November eleventh.",'ผู้คนจัดงานรำลึกทุกปี วันที่สิบเอ็ดพฤศจิกายนครับ',"I'd like to join next year.","It says thank you for the kindness.","When do people remember it?",'ได้ยินวันจัดงาน ให้บอกว่าอยากร่วมปีหน้า','November eleventh = วันที่ 11 พฤศจิกายน, join = เข้าร่วม')])]});

