# Sanor Town

เมืองจำลองฝึกพูดภาษาอังกฤษสำหรับนักเรียน ม.2 เดินไปคุยกับคนในเมือง 36 สถานที่ เลือกประโยคตอบให้เข้ากับสถานการณ์

**ที่เผยแพร่:** https://khunphibun1234-design.github.io/sanor-town/
**แยกมาจาก:** [Sanor English World](https://khunphibun1234-design.github.io/sanor-english-world/) (ส่วน Sanor Town)

- แอปหน้าเดียว ไม่ใช้ไลบรารี ไม่ส่งข้อมูลไปที่ใด ความก้าวหน้าเก็บในเครื่องเท่านั้น (คีย์ `sanor-town-app-v1`)
- ครั้งแรกที่เปิด ถ้าเครื่องนี้เคยเล่น Town ในแอปหลัก จะคัดลอกความก้าวหน้าจากคีย์ `sanor-town-v1` มาให้ครั้งเดียว โดยไม่แก้หรือลบคีย์เดิม
- เสียง NPC อยู่ใน `voice/` (T_ = เสียงของแต่ละฉาก, L14 L17 L18 L19 L20 L25 = ชุดเสียงบทเรียนที่มีบางประโยคใช้ร่วมกับ Town)
- ไม่ใช่ส่วนหนึ่งของงานวิจัย Sanor Buddy

## ไฟล์ใน tools/
- `build_town.py` สร้างแอปนี้จากแอปหลัก (ใช้ตอนย้ายครั้งแรก)
- `town_cmp.py` เทียบข้อมูลบทสนทนาทุกฉากระหว่างสองไฟล์
- `town_smoke.py` เปิดแอปและเปิดทุกฉาก
- `town_e2e.py` เล่นเหมือนนักเรียน 1 สถานที่ ตรวจการบันทึก การคัดลอกความก้าวหน้า และไฟล์เสียง
- `build_index.py` ประกอบ index.html จาก src/ (`--check` ตรวจว่าตรงกัน) · `split_index.py` ใช้แยกครั้งแรก

ทุกครั้งที่แก้ ให้เพิ่มแถวใน CHANGELOG.md และเปลี่ยนเลข BUILD ใน index.html

## แก้โค้ดที่ src/ (ตั้งแต่ 10 พ.ย. 2569, งานข้อ 10)
index.html ประกอบจากไฟล์ใน `src/` (ต่อกันตามลำดับชื่อไฟล์ ไม่เพิ่มไม่ลดอะไร) — **แก้ที่ src/ แล้วรัน `python3 tools/build_index.py`** อย่าแก้ index.html โดยตรง
- `00-shell-head.html` หน้าเว็บ CSS splash เสียง · `10-engine-core.js` เอนจิน 3D และตัวช่วยสร้างฉาก
- `20-scenes/NN-<id>.js` ฉากละไฟล์ 62 ไฟล์ (อาคาร ป้าย NPC บทสนทนา)
- `30-content-tables.js` ภารกิจ PREP REAL WHY · `50-content-hub.js` คำศัพท์/ข้อฟังของ Hub
- `40-engine-progress.js` การบันทึก รางวัล · `60-engine-ui.js` Hub ฉาก 3D แผนที่ Passport ระบบวิจัย · `99-shell-end.html` ท้ายหน้า
- ตรวจว่า index.html ตรงกับ src/: `python3 tools/build_index.py --check` · GitHub Pages ยังใช้ index.html จึง commit ทั้งสองอย่าง
