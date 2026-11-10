/* ===== batch 3: park, hotel, airport ===== */
SCENES.push({id:'park',name:'Park',th:'สวนสาธารณะ',color:'#3F9B3F',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.5,.76,.42]);
  c.box(0,.02,2.5,26,.04,2.2,[.85,.78,.6]);c.box(-2,.02,-3,2.2,.04,12,[.85,.78,.6]);
  c.box(6,.03,-2,6,.05,4.2,[.3,.6,.85],true);c.box(6,.08,-2,6.4,.1,.2,[.5,.5,.5]);
  c.box(-6,.6,-4.3,3,1.2,1.2,[.95,.95,.95],true);c.box(-6,1.3,-4.3,3.2,.12,1.4,[.95,.4,.5]);c.box(-6,2.1,-4.3,.12,1.8,.12,[.5,.5,.5]);tPyr(c.a,-6,2.2,-4.3,3.4,.8,3.4,[.95,.4,.5]);
  c.box(-10,2.2,1,.15,2.4,.15,[.5,.5,.55],true);c.box(-8,2.2,1,.15,2.4,.15,[.5,.5,.55],true);c.box(-9,3.4,1,2.2,.15,.15,[.5,.5,.55]);c.box(-9,1.0,1,.5,.1,.5,[.9,.5,.2]);
  c.box(0,1.1,-6.6,.12,1.6,.12,[.5,.36,.22]);c.box(0,1.7,-6.6,2,.8,.12,[.3,.5,.3]);
  c.bench(-1,5.5);c.bench(3.5,5.5);c.bench(9,2);
  for(const [x,z] of [[-11,-6.5],[-8,-7.5],[3,-7.5],[10,-7],[11.4,6.5],[-11.4,6.5],[-4,7.5],[7,7.5]])c.tree(x,z);
  c.lamp(-3,2.5);c.lamp(3,2.5);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('gun','Mr. Gun','Ice cream seller⁣คนขายไอศกรีม',-6,-2.9,0,[.95,.4,.5],[.2,.2,.3],[.1,.07,.05],'cap',[
  TT("Hi! Would you like some ice cream?",'สวัสดี รับไอศกรีมไหมครับ',"Yes, please. A chocolate one, please.","A cone, please.","Yes, thirty baht.",'ถามว่ารับไอศกรีมไหม ให้ตอบรับและเลือกรส','chocolate = ช็อกโกแลต, vanilla = วานิลลา, strawberry = สตรอว์เบอร์รี'),
  TT("Cup or cone?",'ถ้วยหรือโคนครับ',"A cone, please.","Yes, please. A chocolate one, please.","Here is thirty baht.",'ถามให้เลือกถ้วยหรือโคน','cone = โคน'),
  TT("That's thirty baht.",'สามสิบบาทครับ',"Here is thirty baht. Thank you.","A cone, please.","Yes, please. Thank you.",'ได้ราคาแล้ว ให้จ่ายเงินและขอบคุณ','Here is ... baht. = นี่เงิน ... บาท')]),
 NPCDEF('kla','Mr. Kla','Park ranger⁣เจ้าหน้าที่สวน',0,-3.2,0,[.2,.5,.3],[.3,.3,.25],[.1,.07,.05],'hat',[
  TT("Excuse me. Please don't feed the ducks.",'ขอโทษครับ กรุณาอย่าให้อาหารเป็ดนะครับ',"Oh, I'm sorry. I won't.","Yes, it's beautiful!","Thanks. I'll leave before six.",'เจ้าหน้าที่ห้ามให้อาหารเป็ด ให้ขอโทษและรับปาก','Don\'t ... = ห้าม/อย่า ... , I won\'t. = ฉันจะไม่ทำ'),
  TT("It's OK. Are you enjoying the park?",'ไม่เป็นไรครับ ชอบสวนนี้ไหมครับ',"Yes, it's beautiful!","Oh, I'm sorry. I won't.","Thanks. I'll leave before six.",'ถามว่าชอบสวนไหม ให้ตอบ','beautiful = สวย'),
  TT("The park closes at six o'clock.",'สวนปิดหกโมงเย็นครับ',"Thanks. I'll leave before six.","Yes, it's beautiful!","Oh, I'm sorry. I won't.",'ได้ยินเวลาปิด ให้ขอบคุณและบอกว่าจะกลับก่อน','before six = ก่อนหกโมง')]),
 NPCDEF('dao','Ms. Dao','Jogger⁣คนวิ่งออกกำลังกาย',-2,4,0,[.95,.5,.2],[.15,.15,.2],[.1,.07,.05],'long',[
  TT("Hi! Do you run here every day?",'หวัดดี เธอวิ่งที่นี่ทุกวันไหม',"No, I walk here on weekends.","I play soccer with my friends.","See you! Have a nice run.",'ถามว่าวิ่งทุกวันไหม (Do you ...?) ตอบ No, I ... หรือ Yes, I do.','on weekends = ในวันเสาร์อาทิตย์'),
  TT("What do you do on weekends?",'เธอทำอะไรในวันหยุด',"I play soccer with my friends.","No, I walk here on weekends.","Yes, I run every day.",'ถามว่าทำอะไรวันหยุด ให้ตอบกิจกรรม','I play ... with my friends. = ฉันเล่น ... กับเพื่อน'),
  TT("That sounds fun! See you around.",'ฟังดูสนุก! แล้วเจอกันนะ',"See you! Have a nice run.","No, I walk here on weekends.","I play soccer with my friends.",'เพื่อนลา ให้ลาและอวยพร','Have a nice ... = ขอให้ ... ดี')]),
 NPCDEF('jay','Jay','Child⁣เด็กน้อย',-9,2.4,0,[.9,.8,.2],[.2,.3,.5],[.1,.07,.05],'',[
  TT("Hi! Do you want to play with me?",'หวัดดี เล่นกับฉันไหม',"Sure! What game?","Let's play on the swings!","I play soccer with my friends.",'ชวนเล่น ให้ตอบรับและถามว่าเล่นอะไร','Sure! = ได้เลย'),
  TT("Let's play on the swings!",'ไปเล่นชิงช้ากัน',"OK. Let's go!","That was fun! Can we play again?","Hi! Do you want to play with me?",'ชวนเล่นชิงช้า ให้ตอบรับ','Let\'s ... = ไป ... กันเถอะ'),
  TT("That was fun! Can we play again?",'สนุกจัง! เล่นอีกได้ไหม',"Sorry, I have to go. See you!","Let's play on the swings!","Yes, I play soccer with my friends.",'ถูกชวนเล่นอีก ให้ปฏิเสธสุภาพเพราะต้องไป','I have to go. = ฉันต้องไปแล้ว')])]});
