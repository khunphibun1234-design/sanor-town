/* ===== batch 2: daily life ===== */
const NPCDEF=(id,name,role,x,z,ry,shirt,pants,hair,acc,turns)=>({id,name,role,x,z,ry,shirt,pants,hair,acc,turns});
/* speaker pictures (5 Nov, 3D plan item 3): eight made-up adult roles from the teacher's Meshy models (img/npc) and the two student
   characters (img/avatar). The picture is chosen from the person's title, role words, hair and clothes; people who fit none
   (children out of uniform, visitors, animals) get no picture. */
function npcPic(n){const nm=n.name||'',r=String(n.role||'').split('⁣')[0].toLowerCase(),acc=n.acc||'';
 const fem=/^(Ms|Mrs|Miss|Auntie|Grandma|Mom|Mother|Teacher Suda|Teacher Wan)\b/.test(nm)||(!/^(Mr|Uncle|Grandpa|Dad|Officer|Coach)\b/.test(nm)&&/long|bun|pony/.test(acc));
 const adult=/^(Ms|Mrs|Miss|Mr|Auntie|Uncle|Grandma|Grandpa|Mom|Mother|Dad|Dr|Coach|Officer|Teacher)\b/.test(nm);
 if(!adult){const sh=n.shirt||[0,0,0],uni=sh[0]>.9&&sh[1]>.9&&sh[2]>.9;
  return !/visitor|tourist|traveler|traveller|customer|shopper|passenger|spectator|runner|player|child|sister/.test(r)&&(uni||/student|classmate|class monitor|deskmate|lab partner/.test(r))?(fem?'avatar/girl-head':'avatar/boy-head'):''}
 let k='';
 if(/^(Auntie|Grandma)\b/.test(nm))k='auntie';else if(/^(Uncle|Grandpa)\b/.test(nm))k='uncle';
 else if(/teacher|coach|adviser|advisor|principal|homeroom|tutor/.test(r)||/^(Teacher|Coach)\b/.test(nm))k=fem?'teacherf':'teacherm';
 else if(/guard|security|police|ranger/.test(r))k=fem?'office':'guard';
 else if(/cashier|barista|waiter|waitress|sales|shop|store|server|hostess|bellboy|concierge|housekeeping|food court|electronics|clothes|drive-through|ticket|t-shirt|chef/.test(r))k=fem?'shopf':'shopm';
 else if(/seller|vendor|cook|stall|grill|noodle|fruit|market|farmer|janitor/.test(r))k=fem?'auntie':'uncle';
 else if(/mother|mom|parent/.test(r))k='teacherf';
 else if(/librar|information|desk|reception|counter|clerk|teller|officer|office|staff|agent|nurse|doctor|pharmac|supervisor|conductor|assistant|attendant|mail/.test(r))k=fem?'office':'teacherm';
 return k?'npc/'+k:''}
SCENES.push({id:'restaurant',name:'Restaurant',th:'ร้านอาหาร',color:'#C2410C',spawn:[0,3.2,Math.PI],bounds:[-12.4,12.4,-9,9],
 build(){const c=mk();base(c,[-12.4,12.4,-9,9],0,[.9,.8,.62]);shell(c,[.93,.8,.6],[.6,.2,.15],true);
  c.box(0,3.0,-6.12,5,.7,.12,[.55,.12,.1]);c.box(0,1.0,-6.18,1.4,2,.06,DOOR);
  c.counter(-3,-5.4,4,[.62,.42,.25]);c.counter(4,-5.4,4,[.82,.62,.4]);
  for(const x of [-9,-4.5,4.5,9])c.box(x,2.9,-2,.5,.5,.5,[.85,.15,.15]);
  c.table(-7,1);c.table(-7,-2.4);c.table(6.5,-2.4);c.table(6.5,.8);
  c.tree(-11,-3.5);c.tree(11,-3.5);c.tree(-11.4,6.5);c.tree(11.4,6.5);c.lamp(-4,4);c.lamp(4,4);
  return{a:new Float32Array(c.a),ob:c.ob}},
 npcs:[
 NPCDEF('fon','Ms. Fon','Hostess⁣พนักงานต้อนรับ',0,-3.6,0,[.85,.2,.25],[.15,.15,.2],[.08,.06,.07],'bun',[
  TT("Welcome! Do you have a reservation?",'ยินดีต้อนรับค่ะ จองโต๊ะไว้ไหมคะ',"No, I don't. A table for three, please.","Yes, I'd like fried rice, please.","Excuse me. Can I have the bill, please?",'ถามว่าจองไว้ไหม (Do you ...?) ตอบ No, I don\'t. แล้วขอโต๊ะ','reservation = การจอง, A table for three = โต๊ะสำหรับสามคน'),
  TT("This way, please. Here is the menu.",'เชิญทางนี้ค่ะ นี่เมนูค่ะ',"Thank you. What do you recommend?","No, thank you. I'm full.","Thank you. Goodbye!",'ได้เมนูแล้ว ให้ขอบคุณและถามว่าอะไรอร่อย','What do you recommend? = คุณแนะนำอะไร'),
  TT("Please wait here. A waiter will come soon.",'กรุณารอตรงนี้ค่ะ พนักงานจะมาเร็วๆ นี้',"OK. Thank you.","Here is the menu. Thank you.","Goodbye! Have a nice day.",'ให้รอ ให้ตอบรับและขอบคุณ','Please wait here. = กรุณารอที่นี่')]),
 NPCDEF('tong','Mr. Tong','Waiter⁣พนักงานเสิร์ฟ',-4.3,.6,0,[.95,.95,.95],[.1,.1,.15],[.1,.07,.05],'',[
  TT("Are you ready to order?",'พร้อมสั่งอาหารหรือยังครับ',"Yes. I'd like fried rice, please.","Yes. Can I have the bill, please?","Yes. I'd like to pay by QR code.",'ถามว่าพร้อมสั่งไหม ให้ตอบและสั่งอาหาร','fried rice = ข้าวผัด'),
  TT("Would you like it spicy?",'รับเผ็ดไหมครับ',"Not too spicy, please.","Yes, I'd like fried rice, please.","Yes, I'd like some dessert.",'ถามว่าเอาเผ็ดไหม ให้บอกระดับความเผ็ด','spicy = เผ็ด, Not too spicy = ไม่เผ็ดมาก'),
  TT("Would you like some dessert?",'รับของหวานไหมครับ',"No, thank you. I'm full.","Yes, not too spicy, please.","Yes, it's free. Please sit.",'ถามว่าเอาของหวานไหม ให้ปฏิเสธอย่างสุภาพ','I\'m full. = ฉันอิ่มแล้ว')]),
 NPCDEF('ann','Ann','Customer⁣ลูกค้าที่นั่งอยู่',8.1,.8,-Math.PI/2,[.9,.6,.2],[.2,.25,.4],[.3,.2,.1],'long',[
  TT("Hi! Is this seat free?",'สวัสดี ที่นั่งนี้ว่างไหม',"Yes, it's free. Please sit.","Yes, I'd like the menu, please.","I'm fine, thank you. How are you?",'ถามว่าที่นั่งว่างไหม ให้ตอบว่าว่างและเชิญนั่ง','Is this seat free? = ที่นั่งนี้ว่างไหม'),
  TT("What are you having?",'คุณกินอะไรอยู่',"I'm having fried rice. How about you?","I'm free today. How about you?","I'm from Ubon. How about you?",'ถามว่ากินอะไร ให้ตอบและถามกลับ','How about you? = แล้วคุณล่ะ'),
  TT("Mmm, it smells good!",'อืม กลิ่นหอมจัง',"Yes, it's delicious!","Yes, it's free. Please sit.","No, thank you. Not too spicy.",'พูดถึงอาหารว่ากลิ่นหอม ให้เห็นด้วย','delicious = อร่อย')]),
 NPCDEF('pat','Ms. Pat','Cashier⁣แคชเชียร์',4,-6.3,0,[.3,.55,.8],[.2,.2,.3],[.08,.06,.07],'cap',[
  TT("Did you enjoy your meal?",'อาหารถูกปากไหมคะ',"Yes, it was delicious. Thank you!","Yes, a table for three, please.","Yes, it's free. Please sit.",'ถามว่าอาหารอร่อยไหม ให้ตอบ','Did you enjoy ...? ตอบ Yes, it was ...'),
  TT("That will be two hundred and fifty baht.",'ทั้งหมดสองร้อยห้าสิบบาทค่ะ',"Can I pay by QR code?","OK. How much is it?","I'd like to see the menu, please.",'ถามว่าจ่ายแบบไหนได้ไหม','Can I pay by ...? = จ่ายด้วย ... ได้ไหม'),
  TT("Sure! Please scan here.",'ได้ค่ะ สแกนตรงนี้เลยค่ะ',"OK. Thank you. Goodbye!","Please sit down here. Thank you.","Yes, a table for three, please.",'ให้สแกนจ่าย ให้ตอบรับ ขอบคุณและลา','Please scan here. = กรุณาสแกนที่นี่')])]});
