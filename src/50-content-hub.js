const HUB={canteen:{
 words:[["I'd like ..., please.", "request frame", "ขอ... หน่อย (สั่งอย่างสุภาพ)", "I'd like rice and curry, please.", "ขอข้าวราดแกงหน่อยครับ/ค่ะ", "A1", "💬"], ["curry", "noun", "แกง", "Would you like green curry or stir-fried vegetables with your rice?", "อยากได้แกงเขียวหวานหรือผัดผักกับข้าวดีจ๊ะ", "A1", "🍛"], ["spicy", "adjective", "เผ็ด", "Green curry is a little spicy.", "แกงเขียวหวานเผ็ดนิดหน่อย", "A2", "🌶️"], ["a bowl of", "quantifier", "...หนึ่งชาม", "I'd like a bowl of noodle soup, please.", "ขอก๋วยเตี๋ยวน้ำหนึ่งชามครับ/ค่ะ", "A1", "🍜"], ["noodles", "noun", "เส้นก๋วยเตี๋ยว", "Would you like thin rice noodles or wide rice noodles?", "จะรับเส้นเล็กหรือเส้นใหญ่", "A1", "🍜"], ["a bottle of", "quantifier", "...หนึ่งขวด", "A bottle of water, please.", "ขอน้ำเปล่าหนึ่งขวดครับ/ค่ะ", "A1", "💧"], ["How much is it?", "question", "ราคาเท่าไร", "Thank you. How much is it?", "ขอบคุณ ราคาเท่าไรครับ/คะ", "A1", "💰"], ["free seat", "noun phrase", "ที่นั่งว่าง", "Hey! There's a free seat here. Come and sit with me.", "เฮ้ ตรงนี้มีที่ว่าง มานั่งด้วยกันสิ", "A2", "🪑"], ["left", "adjective", "เหลือ", "Let's return our plates after lunch. How much money do you have left?", "กินเสร็จแล้วเอาจานไปเก็บกันนะ เธอเหลือเงินเท่าไร", "A2", "👛"]],
 listen:[["I'd like a bowl of noodle soup, please.", "What does the student order?", "นักเรียนสั่งอะไร", ["Noodle soup", "Rice and curry", "A bottle of water"], ["ก๋วยเตี๋ยวน้ำ", "ข้าวราดแกง", "น้ำเปล่าหนึ่งขวด"], ["เสียงที่ได้ยินคือ noodle soup ไม่ใช่ rice and curry", "เสียงที่ได้ยินคือสั่งก๋วยเตี๋ยว ไม่ใช่น้ำ"]], ["Would you like thin rice noodles or wide rice noodles?", "What is Uncle Chai asking about?", "ลุงไชยถามเรื่องอะไร", ["The type of noodles", "The price", "A drink"], ["ชนิดของเส้น", "ราคา", "เครื่องดื่ม"], ["ลุงถามว่าเส้นเล็กหรือเส้นใหญ่ ไม่ได้ถามราคา", "ลุงถามเรื่องเส้น ไม่ได้ถามเรื่องเครื่องดื่ม"]], ["It's five baht, please.", "How much is the water?", "น้ำราคาเท่าไร", ["5 baht", "15 baht", "50 baht"], ["5 บาท", "15 บาท", "50 บาท"], ["five คือ 5 ส่วน fifteen คือ 15", "five คือ 5 ส่วน fifty คือ 50"]], ["Thank you. How much is it?", "What does the student want to know?", "นักเรียนอยากรู้อะไร", ["The price", "The time", "The number of bottles"], ["ราคา", "เวลา", "จำนวนขวด"], ["How much ถามราคา ส่วน What time ถามเวลา", "How much ถามราคา ส่วน How many ถามจำนวน"]], ["Hey! There's a free seat here. Come and sit with me.", "What does Bow want you to do?", "โบว์อยากให้เธอทำอะไร", ["Sit with her", "Buy some water", "Go home"], ["นั่งกับเธอ", "ซื้อน้ำ", "กลับบ้าน"], ["Bow ชวนมานั่งด้วยกัน ไม่ได้ให้ไปซื้อน้ำ", "Bow ชวนมานั่งด้วยกัน ไม่ได้ให้กลับบ้าน"]], ["Let's return our plates after lunch.", "What will they do after lunch?", "หลังกินข้าว พวกเขาจะทำอะไร", ["Return their plates", "Buy more food", "Leave the plates"], ["เอาจานไปเก็บ", "ซื้ออาหารเพิ่ม", "ทิ้งจานไว้"], ["return our plates แปลว่าเอาจานไปเก็บ ไม่ใช่ซื้อเพิ่ม", "return แปลว่าเอาไปคืน/เก็บ ไม่ใช่ทิ้งไว้"]]]}};
/* ===== Hub for the other Our School stations (10 Nov, owner choice: build ONLY from approved content, no new items).
   Words  = the vocabulary register the teacher approved on 5 Nov (term | part of speech | Thai | turn n.t | N = NPC line, A = right answer | CEFR | Thai of the answer);
            the example sentence is read from that turn of the scene, so it always matches the game
   Listen = NPC lines with their 3 options and WHY (reviewed in ST-CNT-024B–E) · Quiz = PREP meanings + NPC replies
   Speak  = PREP · Write = PREP sentences in word order · Read = coming soon (needs a text for each station) ===== */
const HUBV=`gate1|security guard|noun phrase|ยามรักษาความปลอดภัย|3.3|A|A2|กรุณาถามยามรักษาความปลอดภัยที่ป้อมยาม
gate1|crosswalk|noun|ทางม้าลาย|1.2|N|A2|
gate1|You too!|expression|เช่นกันนะ (ตอบคำอวยพร)|1.3|A|A1|ขอบคุณ ขอให้เป็นวันที่ดีเช่นกัน
gate1|line up|phrasal verb|เข้าแถว|3.2|A|A2|นักเรียนเข้าแถวที่โดม
gate1|wake up (woke up)|phrasal verb|ตื่นนอน|4.1|A|A1|สวัสดีตอนเช้าครับ ผมตื่นเช้า
gate1|breakfast|noun|อาหารเช้า|4.2|N|A1|
gate1|by bus|prepositional phrase|โดยรถบัส|5.1|A|A1|ฉันมาโดยรถบัส
gate1|traffic|noun|การจราจร|5.2|N|A2|
flagpole|line|noun|แถว|1.1|N|A1|
flagpole|Here!|expression|มาครับ/มาค่ะ (ขานรับชื่อ)|1.2|A|A1|มาครับ/มาค่ะ
flagpole|national anthem|noun phrase|เพลงชาติ|2.1|N|A2|
flagpole|stand still|verb phrase|ยืนนิ่ง ๆ|2.1|A|A2|ได้ ฉันจะยืนนิ่ง ๆ
flagpole|announcement|noun|ประกาศ|2.3|N|A2|
flagpole|homework|noun|การบ้าน|3.1|N|A1|
flagpole|late|adjective|สาย, มาช้า|4.1|N|A1|
flagpole|homeroom teacher|noun phrase|ครูประจำชั้น|4.2|A|A2|กรุณาถามครูประจำชั้นที่อยู่ตรงนั้น
class85|page|noun|หน้า (หนังสือ)|1.2|N|A1|
class85|What does ... mean?|question frame|... แปลว่าอะไร|1.3|A|A1|มีค่ะ/ครับ คำว่า library แปลว่าอะไร
class85|borrow|verb|ขอยืม|2.1|N|A1|
class85|Here you are.|expression|นี่จ้ะ (ใช้ตอนยื่นของให้)|2.1|A|A1|ได้สิ นี่จ้ะ
class85|eraser|noun|ยางลบ|2.3|A|A1|มันคือยางลบ
class85|cleaning duty|noun phrase|เวรทำความสะอาด|4.2|N|A2|
class85|sweep|verb|กวาด|4.2|A|A2|พิมกับฉันเอง เราจะกวาดพื้น
class85|forget|verb|ลืม|4.3|N|A1|
scilab|safety goggles|noun|แว่นตานิรภัย|1.1|A|A2|ฉันควรสวมแว่นตานิรภัย
scilab|leaf|noun|ใบไม้|1.2|N|A1|
scilab|equipment|noun|อุปกรณ์|2.1|N|A2|
scilab|beaker|noun|บีกเกอร์|2.1|A|B1|ขอบีกเกอร์หนึ่งใบได้ไหมคะ/ครับ
scilab|microscope|noun|กล้องจุลทรรศน์|3.1|N|A2|
scilab|measure|verb|วัด, ตวง|3.2|N|A2|
scilab|observe (observed)|verb|สังเกต|3.3|A|B1|มาจดสิ่งที่เราสังเกตเห็นกัน
scilab|spill (spilled)|verb|ทำหก|4.1|N|A2|
council|idea board|noun phrase|บอร์ดแสดงความคิดเห็น|1.1|N|A2|
council|notice|noun|ประกาศ|1.2|N|A2|
council|share an idea|verb phrase|แบ่งปันความคิด|1.3|N|A2|
council|listen to each other|verb phrase|ฟังกันและกัน|1.3|A|A2|เราควรรับฟังกันและกัน
council|meeting|noun|การประชุม|2.2|N|A2|
council|helpful|adjective|มีประโยชน์|3.1|N|A2|
council|keep ... clean|verb phrase|รักษา...ให้สะอาด|3.1|A|A1|มาช่วยกันรักษาห้องเรียนให้สะอาด
council|poster|noun|โปสเตอร์|4.1|N|A1|
englab|ready|adjective|พร้อม|1.1|N|A1|
englab|twice|adverb|สองครั้ง|1.2|A|A2|ได้ ฉันจะฟังสองครั้ง
englab|Could you ..., please?|request frame|ช่วย...ได้ไหม (ขออย่างสุภาพ)|1.3|A|A2|ช่วยเปิดอีกครั้งได้ไหมคะ/ครับ
englab|headphones|noun|หูฟัง|2.1|A|A2|ฉันจะใส่หูฟัง
englab|turn the volume down|verb phrase|ลดเสียง|2.2|A|A2|ฉันจะลดเสียงลง
englab|speak clearly|verb phrase|พูดให้ชัด|3.2|N|A2|
englab|sound|noun|เสียง|3.3|N|A1|
englab|carefully|adverb|อย่างระมัดระวัง|4.3|A|A2|ฉันจะวางคืนอย่างระมัดระวัง
music|instrument|noun|เครื่องดนตรี|1.2|N|A2|
music|in a row|prepositional phrase|เป็นแถว|2.1|A|A2|ได้ ฉันจะจัดเก้าอี้เป็นแถว
music|music stand|noun|ขาตั้งโน้ตเพลง|2.2|N|B1|
music|keyboard|noun|คีย์บอร์ด|3.1|A|A1|มันคือคีย์บอร์ด
music|drum|noun|กลอง|3.2|N|A1|
music|heavy|adjective|หนัก|3.3|N|A1|
music|xylophone (ranat)|noun|ระนาด|4.1|A|B1|มันคือระนาด เครื่องดนตรีไทยประเภทตี
music|practise|verb (BrE)|ฝึกซ้อม|4.2|A|A2|อยากมาซ้อมกับพวกเราไหม
art|sketch|verb|ร่างภาพ|1.1|N|B1|
art|topic|noun|หัวข้อ|1.2|N|A2|
art|title|noun|ชื่อเรื่อง|1.3|N|A2|
art|coloured pencil|noun|ดินสอสี|2.1|A|A2|ฉันจะใช้ดินสอสีแดง
art|glue stick|noun|กาวแท่ง|2.2|A|A2|ฉันจะใช้กาวแท่งติดใบไม้
art|top right corner|noun phrase|มุมขวาบน|3.2|A|A2|วางไว้ที่มุมขวาบนกันเถอะ
art|brush|noun|พู่กัน|4.1|A|A2|มาล้างพู่กันด้วยน้ำสะอาดกัน
art|supplies|noun|อุปกรณ์ (เครื่องเขียน/วาดรูป)|4.2|A|A2|มาเก็บอุปกรณ์ใส่กล่องกัน
gym|warm up|phrasal verb|อบอุ่นร่างกาย|1.1|A|A2|มาอบอุ่นร่างกายก่อนเล่นกัน
gym|sports shoes|noun|รองเท้ากีฬา|1.2|A|A1|ฉันจะใส่รองเท้ากีฬาที่สะอาด
gym|thirsty|adjective|กระหายน้ำ|1.3|N|A1|
gym|racket|noun|ไม้แบดมินตัน|2.2|N|A2|
gym|bench|noun|ม้านั่ง|2.3|A|A2|เราจะวางกระเป๋าไว้บนม้านั่ง
gym|serve|noun|ลูกเสิร์ฟ|3.1|N|B1|
gym|out of bounds|adjective phrase|ออกนอกเส้น|3.2|A|B1|ลูกออกนอกเส้น
gym|shuttlecock|noun|ลูกขนไก่|4.1|N|B1|
guidance|improve|verb|ปรับปรุง, พัฒนา|1.1|N|A2|
guidance|daily|adverb|ทุกวัน|1.1|A|A2|ฉันอยากอ่านภาษาอังกฤษวันละสิบนาที
guidance|review|verb|ทบทวน|1.2|N|A2|
guidance|study routine|noun phrase|กิจวัตรการเรียน|1.3|A|B1|ช่วยแนะนำกิจวัตรการเรียนง่าย ๆ ได้ไหมคะ/ครับ
guidance|join|verb|เข้าร่วม|2.3|A|A1|ฉันอยากเข้าชมรมการพูด
guidance|chef|noun|พ่อครัว, แม่ครัว|3.1|N|A1|
guidance|career|noun|อาชีพ|3.2|A|A2|ฉันอยากลองศึกษาอาชีพด้านการออกแบบ
guidance|goal|noun|เป้าหมาย|4.1|N|A2|
garden|protect|verb|ปกป้อง|1.1|A|A2|ฉันจะสวมหมวกเพื่อปกป้องศีรษะ
garden|water (the plants)|verb|รดน้ำ (ต้นไม้)|1.2|A|A1|ฉันรดน้ำต้นไม้ด้วยบัวรดน้ำเล็ก ๆ ได้
garden|watering can|noun|บัวรดน้ำ|2.1|A|A2|ฉันจะใช้บัวรดน้ำเล็ก ๆ รดต้นไม้พวกนี้
garden|soil|noun|ดิน|2.2|A|A2|ฉันจะเทน้ำลงบนดินใกล้โคนต้น
garden|soap|noun|สบู่|2.3|A|A1|ฉันจะล้างมือด้วยสบู่หลังทำสวน
garden|label|noun|ป้าย|3.3|N|A2|
garden|compost bin|noun|ถังปุ๋ยหมัก|4.1|A|B1|เราใส่ใบไม้แห้งลงถังปุ๋ยหมักได้
garden|path|noun|ทางเดิน|4.2|N|A2|
lostfound|missing|adjective|หาย|1.1|N|A2|
lostfound|pencil case|noun|กระเป๋าดินสอ|1.2|A|A1|มันเป็นกระเป๋าดินสอสีเหลืองใบเล็ก
lostfound|beside|preposition|ข้าง ๆ|1.3|A|A2|ฉันเห็นมันครั้งสุดท้ายข้างโต๊ะของฉัน
lostfound|lunch box|noun|กล่องข้าว|2.1|A|A1|ฉันเจอกล่องข้าวข้างสนามเด็กเล่น
lostfound|hand in|phrasal verb|ส่ง, มอบให้|2.2|N|A2|
lostfound|sticker|noun|สติกเกอร์|2.3|A|A1|มีสติกเกอร์รูปดาวอยู่บนฝา
lostfound|name label|noun|ป้ายชื่อ|3.2|A|A2|หมวกของฉันมีป้ายชื่อสีขาว
lostfound|owner|noun|เจ้าของ|4.3|A|A2|ฉันจะคืนไม้บรรทัดให้เจ้าของ
pmstudio|clip|noun|คลิปวิดีโอ|1.1|A|A2|เราจะทำคลิปสั้นเรื่องการรีไซเคิล
pmstudio|recycling|noun|การรีไซเคิล|1.1|N|A2|
pmstudio|permission|noun|การอนุญาต|1.2|A|B1|ฉันจะขออนุญาตเพื่อนก่อน
pmstudio|tripod|noun|ขาตั้งกล้อง|2.1|N|B1|
pmstudio|speaker|noun|ผู้พูด|2.2|N|A2|
pmstudio|walkway|noun|ทางเดิน|2.3|A|B1|เราควรขอให้ครูเคลียร์ทางเดิน
pmstudio|script|noun|บท (สำหรับพูด)|3.3|N|B1|
pmstudio|microphone|noun|ไมโครโฟน|4.1|N|A2|
coop|shopping list|noun|รายการซื้อของ|1.1|N|A2|
coop|notebook|noun|สมุด|1.1|A|A1|ฉันต้องการสมุดหนึ่งเล่มและปากกาหนึ่งด้าม
coop|cost|verb|มีราคา|1.2|A|A1|สมุดราคายี่สิบบาท
coop|total|noun|ยอดรวม|1.3|N|A2|
coop|change|noun|เงินทอน|2.2|A|A2|เงินทอนคือยี่สิบบาท
coop|receipt|noun|ใบเสร็จ|2.3|A|A2|ฉันจะเก็บใบเสร็จไว้ตรวจสอบ
coop|scan|verb|สแกน|3.1|A|A2|ขอสแกนคิวอาร์โค้ดของร้านได้ไหมคะ/ครับ
coop|remaining|adjective|ที่เหลือ|4.3|A|B1|ฉันมีเงินเหลือยี่สิบบาท
pool|wet|adjective|เปียก|1.1|N|A1|
pool|adult|noun|ผู้ใหญ่|1.2|N|A2|
pool|whistle|noun|นกหวีด|1.3|N|A2|
pool|take a shower|verb phrase|อาบน้ำ (ฝักบัว)|2.1|A|A1|มาอาบน้ำก่อนว่ายน้ำกัน
pool|towel|noun|ผ้าเช็ดตัว|2.2|N|A1|
pool|swim cap|noun|หมวกว่ายน้ำ|2.3|N|A2|
pool|shallow|adjective|ตื้น|3.3|N|B1|
pool|lifeguard|noun|เจ้าหน้าที่ช่วยชีวิต|4.2|N|A2|
teacherroom|May I come in?|request|ขออนุญาตเข้าไปได้ไหม|1.1|A|A1|ขออนุญาตเข้าไปได้ไหมคะ/ครับ
teacherroom|wait outside|verb phrase|รอข้างนอก|1.2|A|A1|ฉันจะรอข้างนอกจนกว่าครูจะว่าง
teacherroom|quiet voice|noun phrase|เสียงเบา|1.3|A|A2|ฉันจะใช้เสียงเบา ๆ ในห้องนี้
teacherroom|worksheet|noun|ใบงาน|2.1|N|A2|
teacherroom|lesson|noun|บทเรียน|2.2|N|A1|
teacherroom|break|noun|ช่วงพัก|2.3|A|A1|ฉันจะกลับมาหลังพักครั้งถัดไป
teacherroom|instructions|noun|คำชี้แจง, คำสั่ง|4.1|A|A2|ฉันจะอ่านคำชี้แจงก่อนเริ่มทำ
teacherroom|gently|adverb|เบา ๆ, อย่างนุ่มนวล|4.3|N|A2|
academic|timetable|noun|ตาราง (สอบ/เรียน)|1.1|N|A2|
academic|blank|adjective|เปล่า (ยังไม่กรอก)|1.3|A|B1|ขอแบบฟอร์มเปล่าหนึ่งใบได้ไหม
academic|form|noun|แบบฟอร์ม|1.3|N|A2|
academic|hand in|phrasal verb|ส่ง|2.3|A|A2|ควรส่งแบบฟอร์มนี้ที่ไหน
academic|join the line|verb phrase|ต่อแถว|3.1|A|A2|ฉันจะต่อแถวข้างหลังพวกเขา
academic|make-up test|noun|การสอบชดเชย|3.2|A|B1|ขอสอบถามเรื่องการสอบชดเชยได้ไหมคะ/ครับ
academic|due|adjective|ครบกำหนดส่ง|3.3|N|B1|
academic|front counter|noun|เคาน์เตอร์ด้านหน้า|4.1|N|A2|
itlib|return|verb|คืน|1.1|A|A2|ฉันขอคืนหนังสือเล่มนี้ค่ะ/ครับ
itlib|borrow|verb|ยืม|1.2|N|A1|
itlib|comic book|noun|หนังสือการ์ตูน|1.2|A|A1|ได้ค่ะ/ครับ มีหนังสือการ์ตูนภาษาอังกฤษไหม
itlib|quietly|adverb|เบา ๆ|2.1|N|A2|
itlib|shelf|noun|ชั้นวาง (หนังสือ)|2.2|N|A2|
itlib|information|noun|ข้อมูล|3.1|A|A2|ใช่ ฉันต้องหาข้อมูลทำรายงาน
itlib|print|verb|พิมพ์ (ปริ้น)|3.3|N|A2|
itlib|past tense|noun|รูปอดีต (ไวยากรณ์)|4.2|N|A2|
sbank|deposit|verb|ฝากเงิน|1.1|N|A2|
sbank|withdraw|verb|ถอนเงิน|1.1|N|B1|
sbank|bank book|noun|สมุดบัญชี|1.2|N|A2|
sbank|save|verb|ออมเงิน|2.1|N|A2|
sbank|account|noun|บัญชี (ธนาคาร)|3.1|N|A2|
sbank|student ID card|noun|บัตรประจำตัวนักเรียน|3.1|A|A2|น่าจะต้องใช้บัตรนักเรียน
sbank|counter|noun|เคาน์เตอร์|4.1|A|A2|ไปหาพลอยที่เคาน์เตอร์
sbank|gift|noun|ของขวัญ|4.2|N|A1|
football|warm up|phrasal verb|อบอุ่นร่างกาย|1.1|N|A2|
football|lap|noun|รอบ (สนาม)|1.2|N|A2|
football|take a rest|verb phrase|พักผ่อน|1.3|N|A1|
football|goalkeeper|noun|ผู้รักษาประตู|2.2|N|A2|
football|pass|verb|ส่ง (ลูกบอล)|2.3|N|A2|
football|sports day|noun|วันกีฬาสี|3.3|N|A2|
football|ankle|noun|ข้อเท้า|4.1|N|A2|
football|Get well soon!|expression|หายไว ๆ นะ|4.3|A|A1|ไม่เป็นไร หายไว ๆ นะ
nurse|hurt|verb|ทำให้เจ็บ, บาดเจ็บ|1.1|A|A1|เพื่อนของฉันเจ็บข้อเท้าในคาบพละ
nurse|ice|noun|น้ำแข็ง|1.3|N|A1|
nurse|nurse|noun|พยาบาล|2.1|A|A1|ไม่ต้องห่วง ครูพยาบาลจะช่วยเธอ
nurse|stomachache|noun|อาการปวดท้อง|3.1|N|A2|
nurse|medicine|noun|ยา|3.2|N|A2|
nurse|should|modal verb|ควร|3.2|A|A2|ดีแล้ว เธอควรพักนะ
nurse|fall (fell)|verb|ล้ม|4.2|A|A2|ใช่ เขาล้มตอนกำลังวิ่ง
hall14|seat|noun|ที่นั่ง|1.1|N|A1|
hall14|row|noun|แถว (ที่นั่ง)|1.2|N|A2|
hall14|turn off|phrasal verb|ปิด (เครื่อง)|1.3|N|A2|
hall14|speech|noun|สุนทรพจน์|2.1|N|A2|
hall14|nervous|adjective|ประหม่า, ตื่นเต้น|2.1|N|A2|
hall14|take a deep breath|verb phrase|หายใจลึก ๆ|2.2|A|A2|หายใจลึก ๆ แล้วยิ้ม
hall14|clap|verb|ปรบมือ|2.3|N|A2|
hall14|stage|noun|เวที|3.2|N|A2|
market2|stick|noun|ไม้ (ไม้เสียบ)|1.1|N|A2|
market2|sauce|noun|น้ำจิ้ม, ซอส|1.2|N|A1|
market2|grilled pork|noun|หมูปิ้ง|2.1|N|A2|
market2|sticky rice|noun|ข้าวเหนียว|2.2|N|A1|
market2|Be careful!|expression|ระวังนะ|2.3|N|A1|
market2|iced milk tea|noun|ชานมเย็น|3.1|A|A1|ขอชานมเย็นหนึ่งแก้ว
market2|less sugar|phrase|หวานน้อย|3.3|N|A2|
market2|How much is ...?|question frame|...ราคาเท่าไร|4.1|A|A1|มะม่วงราคาเท่าไร`;
const HUBVR=HUBV.split('\n').map(l=>l.split('|'));
function hubAuto(sc){const T=(a,b)=>{const n=sc.npcs[a-1];return n&&n.turns[b-1]};
 const words=HUBVR.filter(r=>r[0]===sc.id).map(r=>{const [a,b]=r[4].split('.').map(Number),t=T(a,b);if(!t)return null;
  return r[5]==='N'?[r[1],r[2],r[3],t.npc,t.th,r[6],'\u{1F4AC}']:[r[1],r[2],r[3],t.o[0],r[7]||'',r[6],'\u{1F4AC}']}).filter(Boolean);
 const turns=[];sc.npcs.forEach((n,k)=>n.turns.forEach((t,i)=>turns.push({n,k,i,t})));
 const ok=x=>x.t.o&&x.t.o.length===3&&x.t.why&&x.t.why.length===2;
 const listen=turns.filter(x=>ok(x)&&x.i<2&&x.k<3).slice(0,6).map(x=>[x.t.npc,'What is the best reply to '+x.n.name+'?','คำตอบไหนเหมาะที่สุด',x.t.o,null,x.t.why]);
 const P=(sc.prep||[]).filter(p=>p[0]&&p[1]);
 const mean=P.length<3?[]:P.slice(0,4).map((p,j)=>{const oth=[P[(j+1)%P.length],P[(j+2)%P.length]];
  return ['M','Which English sentence means: “'+p[1]+'”?','ประโยคไหนแปลว่า “'+p[1]+'”',[p[0],...oth.map(q=>q[0])],oth.map(q=>'That means “'+q[1]+'”. | ประโยคนี้แปลว่า '+q[1])]});
 const used=new Set(listen.map(l=>l[0]));
 const reply=turns.filter(x=>ok(x)&&!used.has(x.t.npc)).filter((x,j,a)=>j%Math.max(1,Math.floor(a.length/4))===0).slice(0,4)
  .map(x=>['R',x.n.name+': “'+x.t.npc+'”',x.t.th,x.t.o,x.t.why]);
 const write=P.map(p=>p[0]).filter(s=>{const w=s.split(' ').length;return w>=3&&w<=9}).slice(0,4).map(s=>({t:'order',q:'Put the words in order.',th:'เรียงคำให้เป็นประโยค',w:s.split(' ')}));
 return {auto:true,title:null,words,listen,quiz:[...mean,...reply],parts:{M:['Meaning','ความหมาย'],R:['Replies','การตอบโต้']},write,soon:['read']}}
