/* ===== CORE-M02 "Help Me in Class!" — PROTOTYPE practice mission (ST-CORE-002, 11 Nov 2026). On the live site since build 20261111a (owner Option A). NOT RESEARCH-READY.
   UI copy (ST-DEV-003-CR01, 12 Nov 2026): INT-05, OFR-02, DLG-07, SUM-04, SUM-06, SUM-08, CRD-02 exact AFTER text from CHAT 03 Exact UI Copy & Language
   Decision Matrix V1.1 (owner authorized). UI only: contentVersion stays V1.2; scoring, completion, answer keys and option IDs unchanged.
   V1.2 (ST-DEV-002, 12 Nov 2026): G-01, G-05, G-08 exact copy from CHAT 03 Official Language Copy Return (owner approved 12 Nov 07:37).
   V1.1 (ST-DEV-002, 12 Nov 2026): L-01 Thai WHY for N02/N02-R and L-04 step labels from CHAT 03 Post-Implementation Content & Language QA V1.0 (sections 4 and 7); L-02 stable option IDs.
   Authority: owner dispatch LOCAL IMPLEMENTATION ONLY (handover V1.0 file 07). Content trace: CHAT 03 Script Revised Candidate V1.1 (file 01)
   + the four local prototype decisions D-M02-L01…L04 (file 06). Nothing here is final approved content or a speaking assessment.
   - A separate mission layer: the class85 scene, its 12 NPC turns, its 6 PREP lines, stars and Hub are not touched.
   - Own storage key (below). It never writes sanor-town-app-v1, sanor-town-rewards-v1 or sanor-town-research-v1.
   - No XP, coins or badges. No research logging (RLOG is never called). No microphone, no recording.
   - "Sure. Here you are." is not stored again: it is read from the legacy PREP line (PREP.class85[3], called M02-PREP-04 in the documents).
   - WHY texts in the documents name options by letter (B…, C…). Options are shuffled on screen, so the letter is replaced by "This answer" / "คำตอบนี้".
     A WHY marked 'full' (third item) is a complete sentence from CHAT 03 QA section 4 and is shown as written, without that prefix. */
const CORE_KEY='sanor-town-core-missions-v1',CORE_SCHEMA=1;
const CM_P4=()=>PREP.class85[3];/* shared content reference: M02-PREP-04 */
const CORE_M02={id:'CORE-M02',sceneId:'class85',contentVersion:'M02-LOCAL-PROTOTYPE-V1.2',name:'Help Me in Class!',
 order:['N01','N02','N02-R','N03','N04','N05','N06'],optional:['N05'],
 /* short step labels on the progress bar (interface words, not dialogue) */
 label:{N01:['Ask to borrow','ขออนุญาตยืม'],N02:['Say thank you','กล่าวขอบคุณ'],'N02-R':['Swap roles','สลับบทบาท'],N03:['Ask to repeat','ขอให้พูดซ้ำ'],N04:['Ask for help','ขอความช่วยเหลือ'],N05:['Ask permission','ขออนุญาต'],N06:['Close politely','กล่าวขอบคุณและจบบทสนทนา']},/* L-04: CHAT 03 QA V1.0 section 7; N05 from the Official Language Copy Return (G-05) */
 /* PREP for this mission: the six M02-V2 candidates (file 01, section 2). V2-02 is the legacy line by reference. */
 prep:[{id:'M02-V2-01',en:'May I borrow your eraser, please?',th:'ขอยืมยางลบของเธอได้ไหม'},
  {id:'M02-V2-02',ref:true},
  {id:'M02-V2-03',en:'Could you say that again, please?',th:'ช่วยพูดอีกครั้งได้ไหมครับ/คะ'},
  {id:'M02-V2-04',en:'Could you help me with this word, please?',th:'ช่วยฉันเรื่องคำนี้ได้ไหมครับ/คะ'},
  {id:'M02-V2-05',en:'May I go to the board, please?',th:'ขออนุญาตไปที่กระดานได้ไหมครับ/คะ',optional:true},
  {id:'M02-V2-06',en:'Thank you for your help.',th:'ขอบคุณที่ช่วยเหลือ'}],
 /* beats: scene = situation card · npc = NPC line · choose = pick 1 of 3; every option has a stable ID (id), the right one is named by ans, and hint/why/ok follow the ID, never the place on screen (ST-DEV-001 STEP 02, L-02) · say = one learner line · any = every option is acceptable */
 states:{
  N01:[{k:'scene',en:'You need an eraser. Pim has one. Ask to borrow it politely.',th:'นักเรียนต้องการใช้ยางลบ พิมมียางลบอยู่ ให้ขอยืมจากพิมอย่างสุภาพ'},/* D-M02-L01 */
   {k:'choose',id:['N01-KEY','N01-D1','N01-D2'],ans:'N01-KEY',to:'pim',o:['May I borrow your eraser, please?','May I borrow your ruler, please?','I have an eraser.'],
    hint:['Look for the eraser and begin with a polite request.','ดูสิ่งของที่ต้องการและเริ่มคำขอสุภาพ'],
    why:{'N01-D1':['asks for the wrong item.','ขอของผิดชนิด'],'N01-D2':['states ownership, not a request.','บอกว่ามีของ ไม่ได้ขอยืม']},
    ok:['Good. You asked Pim for an eraser politely.','ดีมาก นักเรียนขอยืมยางลบจากพิมอย่างสุภาพ']}],/* G-08b */
  N02:[{k:'npc',who:'pim',ref:true},/* Pim's own line (D-M02-L02): never counted as the learner's */
   {k:'choose',id:['N02-KEY','N02-D1','N02-D2'],ans:'N02-KEY',to:'pim',prompt:['Pim gives you the eraser. What do you say?','พิมส่งยางลบให้ นักเรียนควรพูดว่าอะไร'],o:['Thank you.','May I borrow your ruler, please?','I have an eraser.'],
    hint:['Thank Pim for helping you.','กล่าวขอบคุณพิมที่ช่วยเหลือ'],
    why:{'N02-D1':['This asks to borrow another item instead of thanking Pim.','ประโยคนี้เป็นการขอยืมของอีกชิ้น ไม่ใช่การกล่าวขอบคุณพิม','full'],'N02-D2':['This says you own an eraser; it does not thank Pim.','ประโยคนี้บอกว่าเธอมียางลบ ไม่ได้ขอบคุณพิม','full']},/* L-01: CHAT 03 QA V1.0 section 4 */
    ok:['You thanked Pim politely.','นักเรียนกล่าวขอบคุณพิมอย่างสุภาพ']}],
  'N02-R':[{k:'role'},{k:'npc',who:'pim',en:'May I borrow your ruler, please?',th:'ขอยืมไม้บรรทัดของเธอได้ไหม'},/* D-M02-L03 */
   {k:'choose',id:['N02-R-KEY','N02-R-D1','N02-R-D2'],ans:'N02-R-KEY',to:'pim',o:[{ref:true},'My ruler is blue.','May I borrow your ruler, please?'],
    hint:['Offer the ruler Pim asked to borrow.','ตอบรับและส่งไม้บรรทัดที่พิมขอยืม'],
    why:{'N02-R-D1':['This describes the ruler but does not offer it.','ประโยคนี้บอกสีของไม้บรรทัด แต่ไม่ได้ยื่นให้พิมยืม','full'],'N02-R-D2':['Pim is asking to borrow your ruler; this repeats her request instead of answering.','พิมกำลังขอยืมไม้บรรทัดของเธอ ประโยคนี้ถามขอยืมกลับแทนที่จะตอบรับ','full']},/* L-01: CHAT 03 QA V1.0 section 4 */
    ok:['You offered the ruler politely.','นักเรียนตอบรับและให้ยืมไม้บรรทัดอย่างสุภาพ']}],
  N03:[{k:'scene',en:'The page number is hidden for this practice. Ask Mr. Krit to repeat the instruction.',th:'กิจกรรมฝึกนี้ซ่อนเลขหน้าไว้ ให้นักเรียนขอให้ครูกฤตพูดคำสั่งอีกครั้ง'},/* G-01 */
   /* controlled missed-page-number cue: the page number is hidden until the learner asks for repetition.
      L-06: a deliberate, scripted information gap for guided repair practice (marked instructional scaffold).
      It is not a claim that unclear speech was heard, and not a listening-achievement result. */
   {k:'npc',who:'teacher',en:'Please open your book to page twenty-five.',th:'กรุณาเปิดหนังสือหน้า 25',mask:['Please open your book to page ……','กรุณาเปิดหนังสือหน้า ……'],sayAs:'Please open your book to page'},
   {k:'choose',id:['N03-KEY','N03-D1','N03-D2'],ans:'N03-KEY',to:'teacher',o:['Could you say that again, please?','Could you give me an eraser, please?','I know the answer.'],
    hint:['Ask for repetition, then listen for the repeated page number.','ขอให้พูดซ้ำและฟังเลขหน้าอีกครั้ง'],
    why:{'N03-D1':['requests an item.','ขอของ'],'N03-D2':['does not repair misunderstanding.','ไม่ขอให้พูดซ้ำ']},
    ok:['Good. The teacher repeats “Page twenty-five,” and you acknowledge.','ดีมาก ครูพูดซ้ำว่า หน้า 25 และนักเรียนตอบรับ']},
   {k:'npc',who:'teacher',en:'Page twenty-five.',th:'หน้า 25',repeat:true},
   {k:'say',to:'teacher',en:'OK.',th:'ครับ/ค่ะ'}],
  N04:[{k:'scene',en:'Student needs the meaning of “library.”',th:'นักเรียนไม่เข้าใจคำว่า library'},
   {k:'choose',id:['N04-KEY','N04-D1','N04-D2'],ans:'N04-KEY',to:'teacher',o:['Could you help me with this word, please?','Could you clean the room, please?','I finished my worksheet.'],
    hint:['Ask help with the unfamiliar word and respond to the explanation.','ขอความช่วยเหลือเรื่องคำศัพท์และตอบรับคำอธิบาย'],
    why:{'N04-D1':['asks about cleaning.','ขอให้ทำความสะอาด'],'N04-D2':['reports completion.','บอกว่างานเสร็จ']},
    ok:['Good. The teacher explains the word, and you acknowledge.','ดีมาก ครูอธิบายคำศัพท์ และนักเรียนตอบรับ']},
   {k:'npc',who:'teacher',en:'Of course. The word “library” means a place for books.',th:'ได้สิ คำว่า library คือสถานที่สำหรับหนังสือ'},
   /* D-M02-L04: default acknowledgement + two acceptable practice variations; the step is not complete before one of them is given */
   {k:'any',to:'teacher',o:['I see. Thank you, Mr. Krit.','I understand now. Thank you.','Thank you, I understand.'],th:'เข้าใจแล้วครับ/ค่ะ ขอบคุณครับ/ค่ะ คุณครู'}],
  N05:[{k:'scene',en:'Student wishes to go to the board.',th:'นักเรียนต้องการไปที่กระดาน'},
   {k:'choose',id:['N05-KEY','N05-D1','N05-D2'],ans:'N05-KEY',to:'teacher',o:['May I go to the board, please?','Can you clean the board, please?','I went to the board yesterday.'],
    hint:['Ask permission for your own action.','ขออนุญาตการกระทำของตนเอง'],
    why:{'N05-D1':['requests another person to act.','ขอให้คนอื่นทำ'],'N05-D2':['reports past action.','เล่าอดีต']},
    ok:['Good. The teacher gives permission, and you thank them.','ดีมาก ครูอนุญาตและนักเรียนขอบคุณ']},
   {k:'npc',who:'teacher',en:'Yes, you may.',th:'ได้สิ'},
   {k:'say',to:'teacher',en:'Thank you.',th:'ขอบคุณ'}],
  N06:[{k:'scene',en:'After receiving help.',th:'หลังได้รับความช่วยเหลือ'},
   {k:'choose',id:['N06-KEY','N06-D1','N06-D2'],ans:'N06-KEY',to:'teacher',o:['Thank you for your help.','Help me now.','I need help again.'],
    hint:['Thank the person who helped you.','ขอบคุณผู้ที่ช่วยเหลือ'],
    why:{'N06-D1':['is abrupt.','เป็นคำสั่งห้วน'],'N06-D2':['makes a new request, not a closing.','เป็นคำขอใหม่ ไม่ใช่ปิดบท']},
    ok:['Good. Mr. Krit says, “You’re welcome.”','ดีมาก ครูกฤตตอบว่า “ด้วยความยินดี”']},/* G-08a; Mr. Krit's reply line below is kept */
   {k:'npc',who:'teacher',en:"You're welcome.",th:'ด้วยความยินดี'}]}};
/* ---- storage: one key, one record per curriculum mission; version-aware; never touches legacy keys ---- */
function coreLoad(){try{const d=JSON.parse(localStorage.getItem(CORE_KEY)||'null');if(d&&d.schemaVersion===CORE_SCHEMA&&d.missions&&typeof d.missions==='object')return d}catch(e){}
 return {schemaVersion:CORE_SCHEMA,missions:{}}}
function coreSave(d){try{localStorage.setItem(CORE_KEY,JSON.stringify(d))}catch(e){}}
const cmReq=()=>CORE_M02.order.filter(s=>!CORE_M02.optional.includes(s));
function cmNewRun(){const stages={};CORE_M02.order.forEach(s=>stages[s]=CORE_M02.optional.includes(s)?'pending':false);
 return {state:'INTRO',stages,first:{},attempts:0,wrong:0,startedAt:Date.now()}}
/* the current step always follows from the finished steps, so a step cannot be skipped by changing the saved state */
function cmFix(run){const st=run.stages||{};let cur='DONE';
 for(const s of CORE_M02.order){const opt=CORE_M02.optional.includes(s);if(opt?(st[s]!=='done'&&st[s]!=='skipped'):st[s]!==true){cur=s;break}}
 const any=CORE_M02.order.some(s=>st[s]===true||st[s]==='done'||st[s]==='skipped');
 if(!any&&(run.state==='INTRO'||run.state==='PREP'))return run;
 if(!any&&!CORE_M02.order.includes(run.state)){run.state='INTRO';return run}
 run.state=cur;return run}
function cmGet(){const d=coreLoad();let r=d.missions[CORE_M02.id];
 if(!r||typeof r!=='object')r={curriculumMissionId:CORE_M02.id,sceneId:CORE_M02.sceneId,contentVersion:CORE_M02.contentVersion,run:null,runs:0,
  completion:{status:'not_started',completedAt:null,count:0},last:null,assessment:null,savedAt:null};
 if(r.contentVersion!==CORE_M02.contentVersion){r.contentVersion=CORE_M02.contentVersion;r.run=null}/* other content version: keep the completion record, restart the unfinished run */
 if(r.run){if(!r.run.stages||!r.run.first)r.run=null;else cmFix(r.run)}
 if(!r.completion)r.completion={status:'not_started',completedAt:null,count:0};
 d.missions[CORE_M02.id]=r;return [d,r]}
function cmPut(d,r){r.savedAt=new Date().toISOString();if(r.completion.status!=='completed')r.completion.status=r.run?'in_progress':'not_started';coreSave(d)}
function coreStatus(){const [,r]=cmGet(),req=cmReq(),run=r.run,n=run?req.filter(s=>run.stages[s]===true).length:0;
 return {status:r.completion.status,completedAt:r.completion.completedAt,count:r.completion.count,runs:r.runs,inRun:!!run&&run.state!=='DONE'&&run.state!=='INTRO',state:run?run.state:null,done:n,total:req.length,last:r.last,contentVersion:r.contentVersion}}
/* ---- screen ---- */
function coreOpen(onExit){const M=CORE_M02,sc=SCENES.find(x=>x.id===M.sceneId),opener=document.activeElement;let [D,R]=cmGet(),busy=false,closed=false,guard=0;
 const hold=()=>busy||Date.now()<guard;/* a second quick tap (double tap) must not press a button on the screen that has just appeared */
 const npcOf=id=>sc.npcs.find(n=>n.id===id),bi=(e,t)=>[el('b',{class:'cmen'},e),t?el('small',{class:'cmth'},t):null];
 const close=(then)=>{if(closed)return;closed=true;stopSay();bg.remove();document.removeEventListener('keydown',onk);if(opener&&opener.focus)opener.focus();(then||onExit||(()=>{}))()};
 const onk=e=>{if(e.key==='Escape')close()};
 const x=el('button',{class:'tx cmx',type:'button','aria-label':'Exit mission (progress is saved)',onclick:()=>close()},'×');
 const body=el('div',{class:'cmb'}),box=el('div',{class:'sheet card stack mrs cm',role:'dialog','aria-modal':'true','aria-label':'Core mission M02 '+M.name},body);
 const bg=el('div',{class:'sheetbg'},box);document.body.append(bg);document.addEventListener('keydown',onk);
 const put=()=>cmPut(D,R);
 const head=(sub)=>el('div',{class:'row cmhead'},el('div',{},el('small',{class:'cmtag'},'CORE-M02 · practice prototype'),el('h2',{},M.name),sub?el('small',{class:'cmsub'},sub):null),x);
 /* G-06: progress-bar labels use manual hyphenation only (Safari over-hyphenated with hyphens:auto).
    The one word too wide for a narrow column gets a soft hyphen here, at draw time only; the label text itself is unchanged. */
 const SHY={permission:'per\u00ADmission'},progLabel=t=>t.replace(/\b(permission)\b/g,w=>SHY[w]);
 const prog=(cur)=>el('ol',{class:'cmprog','aria-label':'Mission steps'},M.order.map((s,i)=>{const v=R.run?R.run.stages[s]:false,done=v===true||v==='done',skip=v==='skipped';
  return el('li',{class:(done?'on ':'')+(skip?'skip ':'')+(s===cur?'cur':''),'data-step':s,'aria-current':s===cur?'step':false},el('span',{class:'cmdot','aria-hidden':'true'},done?'✓':skip?'–':String(i+1)),
   el('small',{},progLabel(M.label[s][0])),el('span',{class:'vh'},' '+(done?'done':skip?'skipped':s===cur?'current':'not done')+(M.optional.includes(s)?', optional':'')))}));
 const sayBtn=(t,l)=>el('button',{class:'tsay',type:'button','aria-label':'Listen: '+t,onclick:()=>say(t,.9)},l||'Listen⁣ฟัง');
 const note=el('p',{class:'hubnote'},'Practice only. Choosing an answer is not a speaking score. No XP. Saved only on this phone.⁣ฝึกเท่านั้น การเลือกคำตอบไม่ใช่คะแนนการพูด ไม่มี XP บันทึกในเครื่องนี้เท่านั้น');
 const show=(...k)=>{stopSay();busy=false;guard=Date.now()+350;body.replaceChildren(...k.flat().filter(Boolean));box.scrollTop=0;const f=body.querySelector('[data-focus]')||x;if(f&&f.focus)f.focus({preventScroll:true})};
 /* intro: situation and goal come from the existing class85 mission card (by reference, not copied) */
 function intro(){const m=MISSIONS[M.sceneId],st=coreStatus(),resume=R.run&&R.run.state!=='INTRO'&&R.run.state!=='DONE';
  show(head('ห้องเรียน อาคาร 3 · ภารกิจหลักสูตร (รุ่นทดลอง)'),
   el('div',{class:'cmcard'},el('b',{class:'cmk'},'Situation⁣สถานการณ์'),el('p',{},bi(m.sit[0],m.sit[1])),el('b',{class:'cmk'},'Goal⁣เป้าหมาย'),el('p',{},bi(m.goal[0],m.goal[1]))),
   el('div',{class:'cmcard'},el('b',{class:'cmk'},'Steps⁣ขั้นตอน'),el('ol',{class:'cmsteps'},M.order.map(s=>el('li',{},el('b',{},M.label[s][0]+(M.optional.includes(s)?' · optional':'')),el('small',{},M.label[s][1]+(M.optional.includes(s)?' · ไม่บังคับ':'')))))),
   st.status==='completed'?el('p',{class:'cmdone','data-status':'completed','data-cid':'M02-UI-INT-05'},'✓ Required practice steps completed⁣✓ ทำกิจกรรมฝึกครบทุกขั้นตอนที่บังคับแล้ว'):null,
   note,
   resume?el('button',{class:'btn cta cmgo','data-act':'resume','data-focus':'',type:'button',onclick:()=>{toast('Resumed · เล่นต่อจากที่ค้างไว้');route()}},'Continue ▶⁣เล่นต่อ ('+(M.label[R.run.state]?M.label[R.run.state][0]:'PREP')+')'):null,
   el('button',{class:resume?'btn ghost':'btn cta cmgo','data-act':'start','data-focus':resume?false:'',type:'button',onclick:()=>{if(hold())return;busy=true;R.run=cmNewRun();R.run.state='PREP';put();prep()}},
    st.status==='completed'?'Play again ▶⁣เล่นอีกครั้ง':resume?'Start over⁣เริ่มใหม่':'Start ▶⁣เริ่มภารกิจ'))}
 function prep(){const rows=M.prep.map(p=>{const t=p.ref?CM_P4():[p.en,p.th];
   return el('li',{class:'cmprep','data-prep':p.id},el('div',{},bi(t[0],t[1]),p.optional?el('small',{class:'cmopt'},'optional · ไม่บังคับ'):null),sayBtn(t[0]))});
  show(head('PREP · ฝึกประโยคก่อนคุย'),el('p',{class:'mrlead'},'Listen and say each sentence aloud. Then start talking.⁣ฟังแล้วพูดตามทีละประโยค จากนั้นเริ่มคุย'),
   el('ul',{class:'cmpreps'},rows),el('p',{class:'cmaud'},'Sound: your phone’s computer voice (English only). No sound? Read the sentence aloud.⁣เสียง: เสียงสังเคราะห์ของเครื่อง (ภาษาอังกฤษเท่านั้น) ถ้าไม่มีเสียง ให้อ่านออกเสียงเอง'),
   el('div',{class:'row cmnav'},el('button',{class:'btn ghost','data-act':'prep-back',type:'button',onclick:()=>{R.run.state='INTRO';put();intro()}},'← Back⁣ย้อนกลับ'),
    el('button',{class:'btn cta cmgo','data-act':'prep-next','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;R.run.state=M.order[0];put();route()}},'Start talking ▶⁣เริ่มคุย')))}
 function route(){const run=R.run;if(!run)return intro();cmFix(run);
  if(run.state==='INTRO')return intro();if(run.state==='PREP')return prep();if(run.state==='DONE')return summary();
  if(M.optional.includes(run.state)&&run.stages[run.state]==='pending')return offer(run.state);
  play(run.state)}
 function offer(s){show(head('Optional step · ภารกิจเสริม'),prog(s),el('div',{class:'cmcard'},el('p',{},bi('Ask Mr. Krit for permission to go to the board. You can skip this step.','ขออนุญาตครูกฤตไปที่กระดาน นักเรียนสามารถข้ามขั้นตอนนี้ได้'))),/* G-05 */
   el('div',{class:'row cmnav'},el('button',{class:'btn ghost','data-act':'skip',type:'button',onclick:()=>{if(hold())return;busy=true;R.run.stages[s]='skipped';put();route()}},'Skip →⁣ข้าม'),
    el('button',{class:'btn cta cmgo','data-act':'bonus','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;play(s)}},'Try optional step ▶⁣ลองทำภารกิจเสริม')))}
 /* one step: NPC and learner lines build up as a short conversation; the step is saved as done only after its last line */
 function play(s){const beats=M.states[s],run=R.run,log=el('div',{class:'cmlog','aria-live':'polite'}),act=el('div',{class:'cmact'}),top=[];let i=0;
  const bubble=(who,en,th,cls)=>{const n=who==='you'?null:npcOf(who),p=n?npcPic(n):null;
   log.append(el('div',{class:'cmbub '+(who==='you'?'you ':'npc ')+(cls||''),'data-speaker':who},
    who==='you'?el('span',{class:'cmwho'},'You⁣นักเรียน'):el('span',{class:'cmwho'},p?el('img',{class:'tpic',src:'img/'+p+'.png',alt:'',width:'46',height:'46'}):null,el('b',{},n.name),el('small',{},String(n.role).split('⁣')[0])),
    el('p',{class:'ten'},en),th?el('p',{class:'tth'},th):null));box.scrollTop=box.scrollHeight};
  const finish=()=>{run.stages[s]=M.optional.includes(s)?'done':true;
   if(cmFix(run).state==='DONE'){/* completion is recorded once; later runs only add practice attempts */
    const req=cmReq(),ft=req.reduce((a,k)=>a+(run.first[k]===1?1:0),0);R.runs=(R.runs||0)+1;
    R.last={firstTry:ft,items:req.length,wrong:run.wrong,attempts:run.attempts,bonus:run.stages.N05,at:new Date().toISOString(),contentVersion:M.contentVersion};
    if(R.completion.status!=='completed'){R.completion.status='completed';R.completion.completedAt=R.last.at;R.completion.count=1}}
   put();route()};
  const next=()=>{stopSay();guard=Date.now()+350;act.replaceChildren();if(i>=beats.length)return finish();const b=beats[i];
   if(b.k==='scene'){top.push(el('div',{class:'cmcard cmscene'},el('b',{class:'cmk'},'Situation⁣สถานการณ์'),el('p',{},bi(b.en,b.th))));i++;return next()}
   if(b.k==='role'){top.push(el('div',{class:'cmcard cmrole','data-role':'reversal'},el('p',{},bi('Swap roles: now Pim asks, and you answer.','สลับบทบาท: ตอนนี้พิมเป็นฝ่ายขอยืม นักเรียนเป็นฝ่ายตอบ'))));i++;return next()}
   if(b.k==='npc'){const t=b.ref?CM_P4():[b.en,b.th],shown=b.mask||t;bubble(b.who,shown[0],shown[1],(b.mask?'masked ':'')+(b.repeat?'repeat':''));
    log.lastChild.append(sayBtn(b.sayAs||t[0]));i++;
    if(i>=beats.length){act.replaceChildren(el('button',{class:'btn cta cmgo','data-act':'next','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;finish()}},'Next ▶⁣ต่อไป'));draw();return}
    return next()}
   if(b.k==='say'){act.replaceChildren(el('p',{class:'hint'},'Your turn. Say it aloud, then tap.⁣ตาของนักเรียน พูดออกเสียงแล้วแตะ'),
     el('button',{class:'topt cmsay','data-act':'say','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;bubble('you',b.en,b.th);i++;busy=false;next()}},b.en,el('small',{class:'cmth'},b.th)));draw();return}
   if(b.k==='any'){act.replaceChildren(el('p',{class:'hint'},'Your turn. Any of these is fine. Say it aloud, then tap.⁣ตาของนักเรียน ใช้ประโยคใดก็ได้ พูดออกเสียงแล้วแตะ'),b.th?el('p',{class:'cmth cmanyth'},b.th):null,
     el('div',{class:'topts'},b.o.map(o=>el('button',{class:'topt','data-act':'any',type:'button',onclick:()=>{if(hold())return;busy=true;bubble('you',o,o===b.o[0]?b.th:'');i++;busy=false;next()}},o))));draw();return}
   /* choose */
   const opts=b.o.map((o,k)=>({t:typeof o==='string'?o:CM_P4()[0],id:b.id[k]})),fb=el('p',{class:'tfb','aria-live':'polite'});let solved=false;
   const btns=shuffle(opts.slice()).map(o=>{const bt=el('button',{class:'topt','data-opt':o.id,type:'button',onclick:()=>{if(solved||bt.disabled||hold())return;
     run.attempts++;if(run.first[s]===undefined)run.first[s]=o.id===b.ans?1:0;
     if(o.id===b.ans){solved=true;btns.forEach(z=>z.disabled=true);bt.classList.add('ok');bubble('you',o.t,'');put();
      fb.className='tfb good';fb.replaceChildren(el('span',{class:'twhy'},'✓ '+b.ok[0]),b.ok[1]?el('span',{class:'thintl'},b.ok[1]):null);
      act.append(el('button',{class:'btn cta cmgo','data-act':'next','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;i++;busy=false;next()}},'Next ▶⁣ต่อไป'));act.lastChild.focus({preventScroll:true})}
     else{run.wrong++;bt.disabled=true;bt.classList.add('no');put();const w=b.why[o.id];fb.className='tfb';
      fb.replaceChildren(el('span',{class:'twhy'},'Not quite. ✗ '+(w[2]==='full'?'':'This answer ')+w[0]),w[1]?el('span',{class:'thintl'},el('span',{class:'cmno','data-cid':'M02-UI-DLG-07'},'ยังไม่ถูกต้อง ✗'),' '+(w[2]==='full'?'':'คำตอบนี้')+w[1]):null,el('span',{class:'thintl cmhint'},'\u{1F4A1} '+b.hint[0]+(b.hint[1]?' · '+b.hint[1]:'')))}}},o.t);return bt});
   act.replaceChildren(el('p',{class:'hint'},b.prompt?b.prompt[0]:'Your turn. What do you say?',el('small',{class:'cmth'},b.prompt?b.prompt[1]:'ตาของนักเรียน ควรพูดว่าอะไร')),el('div',{class:'topts'},btns),fb);draw()};
  const draw=()=>{if(!body.contains(log))show(head(M.label[s][0]+(M.optional.includes(s)?' (optional)':'')+' · '+M.label[s][1]+(M.optional.includes(s)?' (ไม่บังคับ)':'')),prog(s),top,log,act)};
  run.state=s;put();next()}
 /* three separate results: practice score, mission completion, speaking (never judged by the game) */
 function summary(){const st=coreStatus(),L=R.last||{firstTry:0,items:cmReq().length,wrong:0,bonus:'pending'};
  show(head('Summary · สรุปผล'),prog(null),
   el('div',{class:'cmcard cmsum','data-sum':'practice'},el('b',{class:'cmk'},'A · Practice score⁣คะแนนฝึก'),el('p',{class:'cmbig'},'First try right: '+L.firstTry+' / '+L.items),
    el('small',{class:'cmth'},'ตอบถูกตั้งแต่ครั้งแรก '+L.firstTry+' จาก '+L.items+' ข้อ'),
    /* SUM-04: only the real N05 state is shown (completed OR skipped); N05 is never in the score */
    L.bonus==='done'||L.bonus==='skipped'?el('p',{class:'cmoptsum','data-cid':'M02-UI-SUM-04','data-n05':L.bonus},bi(L.bonus==='done'?'Optional step: completed (not counted)':'Optional step: skipped (not counted)',L.bonus==='done'?'ภารกิจเสริม: ทำแล้ว (ไม่นับรวมในคะแนนฝึก)':'ภารกิจเสริม: ข้าม (ไม่นับรวมในคะแนนฝึก)')):null),
   el('div',{class:'cmcard cmsum','data-sum':'mission'},el('b',{class:'cmk'},'B · Mission⁣ภารกิจ'),el('p',{class:'cmbig','data-cid':'M02-UI-SUM-06'},'✓ Required practice steps completed'),
    el('small',{class:'cmth'},'✓ ทำกิจกรรมฝึกครบทุกขั้นตอนที่บังคับแล้ว · Runs · จำนวนรอบที่เล่น: '+st.runs+' · No XP or badge · ไม่มี XP หรือป้ายรางวัล')),
   el('div',{class:'cmcard cmsum','data-sum':'speaking'},el('b',{class:'cmk'},'C · Speaking⁣การพูด'),el('p',{class:'cmbig'},'Not assessed in the game'),
    el('small',{class:'cmth'},'เกมไม่ได้ประเมินการพูด ครูเป็นผู้ประเมินการพูดจริงแยกต่างหาก')),
   note,
   el('button',{class:'btn cta cmgo','data-act':'missions','data-focus':'',type:'button',onclick:()=>close()},'Back to Missions⁣กลับหน้าภารกิจ'),
   el('div',{class:'row cmnav'},el('button',{class:'btn ghost','data-act':'replay',type:'button',onclick:()=>{if(hold())return;busy=true;R.run=cmNewRun();put();intro()}},'Play again⁣เล่นอีกครั้ง'),
    el('button',{class:'btn ghost','data-act':'map',type:'button',onclick:()=>close(()=>placesSheet(z=>goPlace(z,render)))},'School Map⁣แผนที่โรงเรียน')))}
 if(R.run&&R.run.state==='DONE')summary();else intro();
 return close}
/* card on the Missions screen */
function coreMissionCard(reopen){const st=coreStatus(),tag=st.status==='completed'?['Completed','จบแล้ว','ok']:st.status==='in_progress'?['In progress','กำลังทำ','']:['Not started','ยังไม่เริ่ม',''];
 return el('section',{class:'mrcard cmmr','data-core':'CORE-M02','aria-label':'Core mission M02 '+CORE_M02.name+', '+st.done+' of '+st.total+' steps, '+tag[0]},
  el('div',{class:'mrtop'},el('div',{},el('b',{},CORE_M02.name),el('small',{class:'cmcrd','data-cid':'M02-UI-CRD-02'},'CORE-M02 · Classroom, Building 3 · Prototype'),el('small',{class:'cmcrd cmcrdth'},'CORE-M02 · ห้องเรียน อาคาร 3 · รุ่นทดลอง')),el('span',{class:'mrtag '+tag[2]},tag[0]+' · '+tag[1])),
  el('div',{class:'mrbar',role:'progressbar','aria-valuemin':'0','aria-valuemax':String(st.total),'aria-valuenow':String(st.status==='completed'&&!st.inRun?st.total:st.done),'aria-label':'Steps done'},el('i',{style:'width:'+((st.status==='completed'&&!st.inRun?st.total:st.done)/st.total*100)+'%'})),
  el('p',{class:'mrlead'},(st.status==='completed'&&!st.inRun?st.total:st.done)+' / '+st.total+' steps · ทำแล้ว '+(st.status==='completed'&&!st.inRun?st.total:st.done)+' จาก '+st.total+' ขั้น'),
  el('p',{class:'mrnote'},'Practice only. No XP. Speaking is assessed by your teacher.⁣ฝึกเท่านั้น ไม่มี XP ครูเป็นผู้ประเมินการพูด'),
  el('button',{class:'btn cta mrgo','data-act':'core-open',type:'button',onclick:reopen},st.status==='not_started'?'Start mission⁣เริ่มภารกิจ':st.inRun?'Continue mission⁣เล่นต่อ':'Open mission⁣เปิดภารกิจ'))}
