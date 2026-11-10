/* ===== Post Office ===== */
SCENES.push({id:'post',name:'Post Office',th:'ที่ทำการไปรษณีย์',color:'#DC2626',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.88,.86,.82]);shell(c,[.98,.95,.9],[.75,.15,.15],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.8,.12,.12]);c.box(0,3.0,-6.04,3,.14,.04,[1,1,1]);
  c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-5,-5.4,4,[.85,.7,.5]);c.box(-5.8,1.3,-5.3,.5,.3,.4,[.8,.7,.5]);c.box(-4.4,1.3,-5.3,.3,.3,.3,[.2,.2,.25]);
  c.counter(5,-5.4,4,[.85,.7,.5]);c.box(4.4,1.3,-5.3,.5,.4,.4,[.85,.75,.55]);c.box(5.6,1.3,-5.3,.5,.3,.4,[.85,.75,.55]);
  c.box(-9,.5,-1.2,.9,1.0,.9,[.8,.12,.12],true);c.box(-9,1.15,-1.2,1.0,.3,1.0,[.7,.1,.1]);c.box(-9,.9,-.7,.5,.1,.04,[.1,.1,.1]);
  c.box(9,.45,-1.0,1.8,.9,1.2,[.78,.6,.4],true);c.box(9,1.0,-1.0,1.2,.2,.9,[.85,.7,.5]);c.box(9,1.25,-1.0,.8,.3,.6,[.88,.75,.55]);
  c.box(8.6,.4,3.0,.9,.8,.9,[.75,.58,.4],true);
  c.bench(-1.5,4.8);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4.6);c.lamp(4,4.6);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('clerk','Ms. Pranee','Postal clerk⁣พนักงานไปรษณีย์',-5,-6.3,0,[.8,.2,.2],[.2,.2,.3],[.08,.06,.07],'bun',[
  TT("Hello! What can I do for you?",'สวัสดีค่ะ ให้ช่วยอะไรคะ',"I'd like to send this package.","To Bangkok, please.","OK. Here you are.",'พนักงานถามว่าให้ช่วยอะไร ให้บอกว่าอยากส่งพัสดุ','I\'d like to send ... = ฉันอยากส่ง ..., package = พัสดุ'),
  TT("Where are you sending it?",'จะส่งไปที่ไหนคะ',"To Bangkok, please.","I'd like to send this package.","OK. Here you are.",'ถามปลายทาง ตอบ To + เมือง','To Bangkok. = ไปกรุงเทพ'),
  TT("It's sixty baht. It will arrive in two days.",'หกสิบบาทค่ะ จะถึงในสองวันค่ะ',"OK. Here you are.","To Bangkok, please.","I'd like to send this package.",'ได้ราคาและเวลาแล้ว ให้ตอบรับและจ่ายเงิน','arrive = มาถึง, in two days = ภายในสองวัน')]),
 NPCDEF('stamp','Mr. Kasem','Stamp seller⁣พนักงานขายแสตมป์',5,-6.3,0,[.3,.35,.7],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Hi! Do you need stamps?",'สวัสดีครับ ต้องการแสตมป์ไหมครับ',"Yes, please. Two stamps.","It's a postcard.","Here's twenty baht. Thanks!",'ถามว่าต้องการแสตมป์ไหม (Do you ...?) ตอบรับและบอกจำนวน','stamp = แสตมป์'),
  TT("Is it a letter or a postcard?",'เป็นจดหมายหรือโปสการ์ดครับ',"It's a postcard.","Yes, please. Two stamps.","Here's twenty baht. Thanks!",'ถามให้เลือก ตอบด้วยคำเดียว','letter = จดหมาย, postcard = โปสการ์ด'),
  TT("That's twenty baht.",'ยี่สิบบาทครับ',"Here's twenty baht. Thanks!","It's a postcard.","Yes, please. Two stamps.",'ได้ราคาแล้ว ให้จ่ายเงินและขอบคุณ','Here\'s ... = นี่ ...')]),
 NPCDEF('cust1','Nan','Customer⁣ลูกค้า',-9.4,1.6,Math.PI/2,[.9,.5,.3],[.25,.3,.5],[.08,.06,.07],'long',[
  TT("Excuse me. Where can I mail this letter?",'ขอโทษค่ะ ส่งจดหมายฉบับนี้ได้ที่ไหนคะ',"Put it in the red mailbox.","No, it isn't. Only two people.","That's nice. I'm sure she'll love it.",'ถามว่าส่งที่ไหน ให้ชี้ตู้ไปรษณีย์สีแดง','mailbox = ตู้ไปรษณีย์ (อเมริกัน), mail = ส่งไปรษณีย์'),
  TT("Thank you! Is the line long?",'ขอบคุณ คิวยาวไหม',"No, it isn't. Only two people.","Put it in the red mailbox.","That's nice. I'm sure she'll love it.",'ถามว่าคิวยาวไหม (Is ...?) ตอบ No, it isn\'t.','line = แถว/คิว (อเมริกัน)'),
  TT("I'm sending a gift to my grandma.",'ฉันกำลังส่งของขวัญให้ยาย',"That's nice. I'm sure she'll love it.","Put it in the red mailbox.","No, it isn't. Only two people.",'ได้ยินว่าส่งของขวัญ ให้ตอบอย่างน่ารัก','gift = ของขวัญ, I\'m sure ... = ฉันมั่นใจว่า ...')]),
 NPCDEF('courier','Mr. Sak','Mail carrier⁣บุรุษไปรษณีย์',2.6,1.0,Math.PI,[.9,.5,.1],[.2,.2,.25],[.1,.07,.05],'cap',[
  TT("Good morning! Is this your house?",'สวัสดีตอนเช้า นี่บ้านของเธอใช่ไหม',"No, it isn't. It's my friend's house.","Sorry, I don't know him.","You, too. Goodbye!",'ถามว่าใช่บ้านไหม (Is ...?) ตอบ No, it isn\'t.','mail carrier = บุรุษไปรษณีย์'),
  TT("I have a letter for Mr. Smith.",'ผมมีจดหมายถึงคุณสมิธ',"Sorry, I don't know him.","No, it isn't. It's my friend's house.","You, too. Goodbye!",'ถามถึงคนที่ไม่รู้จัก ให้ตอบอย่างสุภาพ','I don\'t know him. = ฉันไม่รู้จักเขา'),
  TT("OK, thanks. Have a nice day!",'ครับ ขอบคุณ ขอให้เป็นวันที่ดีนะ',"You, too. Goodbye!","Sorry, I don't know him.","No, it isn't. It's my friend's house.",'ได้รับคำอวยพร ให้ตอบ You, too.','Have a nice day! = ขอให้เป็นวันที่ดี')])]});

