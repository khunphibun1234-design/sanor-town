/* ===== Daily Missions — BATCH 01 local prototype (ST-MEX-001, 12 Nov 2026) =====
   One playable Daily mission ("Daily Greeting Challenge") and a registry so that more daily missions can be added later.
   LOCAL PREVIEW ONLY: the mission opens only when the page is served from this computer (localhost / 127.0.0.1).
   On the published site the Missions screen still shows "Daily missions · Future" exactly as before.
   Content: every practice item is an existing, teacher-approved talk turn, used BY REFERENCE (scene id, NPC id, turn index)
   and checked against a stored copy of the NPC line; an item whose source changed is left out. No new English or Thai
   practice text is written here. The few new UI lines are marked DM_PLACEHOLDER and wait for CHAT 03 review.
   Storage: own key sanor-town-daily-missions-v1 (separate from Core missions, legacy progress, rewards and research).
   No XP, coins or badges: reward eligibility is reported as "no approved rule" and nothing is granted.
   Practice only: choosing an answer is not a speaking score. */
const DM_KEY='sanor-town-daily-missions-v1',DM_SCHEMA=1,DM_KEEP_DAYS=30;
const DM_PREVIEW=()=>{try{return /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)}catch(e){return false}};
/* the daily date in Thailand time (UTC+7 all year, no daylight saving) */
const dmDay=(t)=>new Date((t===undefined?Date.now():t)+7*3600e3).toISOString().slice(0,10);
/* small seeded shuffle so that every phone gets the same items on the same day */
function dmSeed(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return ((h>>>0)%1e6)/1e6}}
function dmPick(pool,n,key){const r=dmSeed(key),a=pool.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
/* new UI copy that has no approved text yet (shown only in the local preview; listed in the report for CHAT 03) */
const DM_PLACEHOLDER={
 sub:['Daily mission · local preview','ภารกิจประจำวัน · ตัวอย่างในเครื่อง'],
 today:['Today’s greetings','คำทักทายของวันนี้'],
 flag:['Local preview: this mission and its new screen text are not approved yet.','ตัวอย่างในเครื่อง: ภารกิจนี้และข้อความหน้าจอใหม่ยังไม่ผ่านการอนุมัติ'],
 doneToday:['Today’s daily mission completed','ทำภารกิจประจำวันของวันนี้ครบแล้ว'],
 newDay:['A new day: new greetings are ready.','วันใหม่: มีคำทักทายชุดใหม่แล้ว'],
 cardOpen:['Open preview ▶','เปิดตัวอย่าง'],
 days:['Days completed','จำนวนวันที่ทำครบ']};
/* ---- registry: one entry per daily mission ---- */
const DAILY_MISSIONS=[
 {id:'DM-GREET-01',name:'Daily Greeting Challenge',contentVersion:'DM-GREET-LOCAL-V0.1',perDay:5,
  /* pool: existing approved turns (scene, NPC, turn) + the NPC line as it was checked on 12 Nov 2026 */
  pool:[
   ['G01','gate1','teacher',0,'Good morning! You are early today.'],
   ['G02','flagpole','homeroom',0,'Good morning, class! Please stand in your line.'],
   ['G03','school','anong',0,'Good morning! How are you today?'],
   ['G04','classroom','monitor',0,'Good morning! Are you new here?'],
   ['G05','cafeteria','teacher',0,'Good afternoon! Did you eat lunch?'],
   ['G06','gate1','guard',2,'Have a good day at school!'],
   ['G07','school','nan',2,'Great. See you later!'],
   ['G08','home','neighbor',2,'Have a nice evening!'],
   ['G09','post','courier',2,'OK, thanks. Have a nice day!'],
   ['G10','lotus','jack',2,'Thanks! Have a nice day.']]}];
/* resolve one pool item to its source turn; null when the source is missing or its NPC line changed */
function dmItem(p){const [id,sid,nid,ti,line]=p,sc=SCENES.find(s=>s.id===sid),n=sc&&(sc.npcs||[]).find(x=>x.id===nid),t=n&&n.turns&&n.turns[ti];
 if(!t||t.npc!==line||!Array.isArray(t.o)||t.o.length!==3)return null;
 const ok=String(t.ok||''),k=ok.indexOf(' | ');
 return {id,scene:sc,npc:n,src:sid+'/'+nid+'/'+ti,line:t.npc,th:t.th,o:t.o,ids:[id+'-KEY',id+'-D1',id+'-D2'],ans:id+'-KEY',hint:t.hint||'',why:k>=0?[ok.slice(0,k),ok.slice(k+3)]:[ok,'']}}
function dmItems(M){return M.pool.map(dmItem).filter(Boolean)}
function dmToday(M,day){const ok=dmItems(M);return dmPick(ok.map(x=>x.id),Math.min(M.perDay,ok.length),M.id+'|'+day)}
/* ---- saved progress ---- */
function dmLoad(){try{const d=JSON.parse(localStorage.getItem(DM_KEY)||'null');if(d&&d.schemaVersion===DM_SCHEMA&&d.missions&&typeof d.missions==='object')return d}catch(e){}
 return {schemaVersion:DM_SCHEMA,missions:{}}}
function dmSave(d){try{localStorage.setItem(DM_KEY,JSON.stringify(d))}catch(e){}}
function dmGet(M,day){const d=dmLoad();let r=d.missions[M.id];
 if(!r||typeof r!=='object'||!r.days||typeof r.days!=='object')r={missionId:M.id,contentVersion:M.contentVersion,days:{},daysCompleted:0,savedAt:null};
 if(r.contentVersion!==M.contentVersion){r.contentVersion=M.contentVersion;for(const k in r.days)r.days[k].run=null}/* other content: keep completions, restart unfinished runs */
 let D=r.days[day];
 if(!D||typeof D!=='object')D={set:dmToday(M,day),run:null,runs:0,completion:{status:'not_started',completedAt:null,count:0},last:null,reward:{eligible:false,reason:'NO_APPROVED_REWARD_RULE'}};
 if(D.run&&(typeof D.run!=='object'||!D.run.first))D.run=null;
 if(D.run&&typeof D.run.state==='number'&&!(D.run.state>=0&&D.run.state<D.set.length))D.run.state=0;
 r.days[day]=D;return [d,r,D]}
function dmPut(d,r,M){r.savedAt=new Date().toISOString();
 r.daysCompleted=Object.values(r.days).filter(x=>x.completion&&x.completion.status==='completed').length;
 const ks=Object.keys(r.days).sort();while(ks.length>DM_KEEP_DAYS)delete r.days[ks.shift()];
 for(const k in r.days){const x=r.days[k];if(x.completion.status!=='completed')x.completion.status=x.run?'in_progress':'not_started'}
 d.missions[M.id]=r;dmSave(d)}
function dmStatus(M,day){day=day||dmDay();const [,r,D]=dmGet(M,day),run=D.run,n=run?(run.state==='DONE'?D.set.length:typeof run.state==='number'?run.state:0):0;
 return {day,status:D.completion.status,completedAt:D.completion.completedAt,count:D.completion.count,runs:D.runs,inRun:!!run&&run.state!=='DONE'&&run.state!=='INTRO',
  state:run?run.state:null,done:n,total:D.set.length,set:D.set.slice(),last:D.last,daysCompleted:r.daysCompleted||0,reward:D.reward,contentVersion:r.contentVersion}}
/* ---- screen ---- */
function dmOpen(M,onExit){M=M||DAILY_MISSIONS[0];const day=dmDay(),opener=document.activeElement;let [Dd,R,D]=dmGet(M,day),busy=false,closed=false,guard=0;
 const all={};dmItems(M).forEach(x=>all[x.id]=x);
 const items=()=>D.set.map(id=>all[id]).filter(Boolean);
 const hold=()=>busy||Date.now()<guard,bi=(e,t)=>[el('b',{class:'cmen'},e),t?el('small',{class:'cmth'},t):null];
 const close=(then)=>{if(closed)return;closed=true;stopSay();bg.remove();document.removeEventListener('keydown',onk);if(opener&&opener.focus)opener.focus();(then||onExit||(()=>{}))()};
 const onk=e=>{if(e.key==='Escape')close()};
 const x=el('button',{class:'tx cmx',type:'button','aria-label':'Exit mission (progress is saved)',onclick:()=>close()},'×');
 const body=el('div',{class:'cmb'}),box=el('div',{class:'sheet card stack mrs cm dm',role:'dialog','aria-modal':'true','aria-label':'Daily mission '+M.name,'data-dm':M.id,'data-day':day},body);
 const bg=el('div',{class:'sheetbg'},box);document.body.append(bg);document.addEventListener('keydown',onk);
 const put=()=>dmPut(Dd,R,M);
 const flag=el('p',{class:'dmflag','data-placeholder':'flag'},bi(DM_PLACEHOLDER.flag[0],DM_PLACEHOLDER.flag[1]));
 const head=(sub)=>el('div',{class:'row cmhead'},el('div',{},el('small',{class:'cmtag'},M.id+' · '+day),el('h2',{},M.name),sub?el('small',{class:'cmsub'},sub):null),x);
 const prog=(cur)=>{const run=D.run,n=items().length;return el('ol',{class:'cmprog dmprog','aria-label':'Mission steps'},items().map((it,i)=>{const done=run&&(run.state==='DONE'||(typeof run.state==='number'&&i<run.state));
  return el('li',{class:(done?'on ':'')+(i===cur?'cur':''),'data-step':it.id,'aria-current':i===cur?'step':false},el('span',{class:'cmdot','aria-hidden':'true'},done?'✓':String(i+1)),el('span',{class:'vh'},' item '+(i+1)+' of '+n+(done?', done':i===cur?', current':'')))}))};
 const sayBtn=(t)=>el('button',{class:'tsay',type:'button','aria-label':'Listen: '+t,onclick:()=>say(t,.9)},'Listen⁣ฟัง');
 const note=el('p',{class:'hubnote'},'Practice only. Choosing an answer is not a speaking score. No XP. Saved only on this phone.⁣ฝึกเท่านั้น การเลือกคำตอบไม่ใช่คะแนนการพูด ไม่มี XP บันทึกในเครื่องนี้เท่านั้น');
 const show=(...k)=>{stopSay();busy=false;guard=Date.now()+350;body.replaceChildren(...k.flat().filter(Boolean));box.scrollTop=0;const f=body.querySelector('[data-focus]')||x;if(f&&f.focus)f.focus({preventScroll:true})};
 const newRun=()=>({state:'INTRO',first:{},attempts:0,wrong:0,startedAt:Date.now()});
 function intro(){const st=dmStatus(M,day),resume=D.run&&D.run.state!=='INTRO'&&D.run.state!=='DONE'&&D.run.state!=='PREP',done=st.status==='completed';
  show(head(DM_PLACEHOLDER.sub[0]+' · '+DM_PLACEHOLDER.sub[1]),flag,
   el('div',{class:'cmcard'},el('b',{class:'cmk'},DM_PLACEHOLDER.today[0]+'⁣'+DM_PLACEHOLDER.today[1]),
    el('ol',{class:'cmsteps dmlist'},items().map(it=>el('li',{'data-item':it.id},el('b',{},it.line),el('small',{},it.scene.name+' · '+it.npc.name))))),
   done?el('p',{class:'cmdone','data-status':'completed','data-placeholder':'doneToday'},'✓ '+DM_PLACEHOLDER.doneToday[0]+'⁣✓ '+DM_PLACEHOLDER.doneToday[1]):null,
   note,
   resume?el('button',{class:'btn cta cmgo','data-act':'resume','data-focus':'',type:'button',onclick:()=>{toast('Resumed · เล่นต่อจากที่ค้างไว้');route()}},'Continue ▶⁣เล่นต่อ ('+(D.run.state+1)+' / '+items().length+')'):null,
   el('button',{class:resume?'btn ghost':'btn cta cmgo','data-act':'start','data-focus':resume?false:'',type:'button',onclick:()=>{if(hold())return;busy=true;D.run=newRun();D.run.state='PREP';put();prep()}},
    done?'Play again ▶⁣เล่นอีกครั้ง':resume?'Start over⁣เริ่มใหม่':'Start ▶⁣เริ่มภารกิจ'))}
 /* PREP: the answers of today's items, to listen to and say aloud first */
 function prep(){show(head('PREP · ฝึกประโยคก่อนคุย'),el('p',{class:'mrlead'},'Listen and say each sentence aloud. Then start talking.⁣ฟังแล้วพูดตามทีละประโยค จากนั้นเริ่มคุย'),
   el('ul',{class:'cmpreps'},items().map(it=>el('li',{class:'cmprep','data-prep':it.id},el('div',{},bi(it.o[0],'')),sayBtn(it.o[0])))),
   el('p',{class:'cmaud'},'Sound: your phone’s computer voice (English only). No sound? Read the sentence aloud.⁣เสียง: เสียงสังเคราะห์ของเครื่อง (ภาษาอังกฤษเท่านั้น) ถ้าไม่มีเสียง ให้อ่านออกเสียงเอง'),
   el('div',{class:'row cmnav'},el('button',{class:'btn ghost','data-act':'prep-back',type:'button',onclick:()=>{D.run.state='INTRO';put();intro()}},'← Back⁣ย้อนกลับ'),
    el('button',{class:'btn cta cmgo','data-act':'prep-next','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;D.run.state=0;put();route()}},'Start talking ▶⁣เริ่มคุย')))}
 function route(){const run=D.run;if(!run)return intro();if(run.state==='INTRO')return intro();if(run.state==='PREP')return prep();if(run.state==='DONE')return summary();play(run.state)}
 /* one item: the NPC line, three answers in a new order each time, retry until right */
 function play(i){const it=items()[i],run=D.run;if(!it){run.state='DONE';put();return summary()}
  const fb=el('p',{class:'tfb','aria-live':'polite'}),act=el('div',{class:'cmact'});let solved=false;
  const log=el('div',{class:'cmlog'},el('div',{class:'cmbub npc','data-speaker':it.npc.id},el('span',{class:'cmwho'},el('b',{},it.npc.name),el('small',{},String(it.npc.role||'').split('⁣')[0])),
   el('p',{class:'ten'},it.line),it.th?el('p',{class:'tth'},it.th):null,sayBtn(it.line)));
  const opts=it.o.map((t,k)=>({t,id:it.ids[k]}));
  const btns=shuffle(opts).map(o=>{const bt=el('button',{class:'topt','data-opt':o.id,type:'button',onclick:()=>{if(solved||bt.disabled||hold())return;
    run.attempts++;if(run.first[it.id]===undefined)run.first[it.id]=o.id===it.ans?1:0;
    if(o.id===it.ans){solved=true;btns.forEach(z=>z.disabled=true);bt.classList.add('ok');put();
     fb.className='tfb good';fb.replaceChildren(...[el('span',{class:'twhy'},'✓ '+it.why[0]),it.why[1]?el('span',{class:'thintl'},it.why[1]):null].filter(Boolean));/* replaceChildren would print a null child as text */
     act.replaceChildren(el('button',{class:'btn cta cmgo','data-act':'next','data-focus':'',type:'button',onclick:()=>{if(hold())return;busy=true;next(i)}},'Next ▶⁣ต่อไป'));act.lastChild.focus({preventScroll:true})}
    else{run.wrong++;bt.disabled=true;bt.classList.add('no');put();fb.className='tfb';
     fb.replaceChildren(el('span',{class:'twhy'},'Not quite. ✗'),el('span',{class:'thintl cmhint','data-hint':it.id},'\u{1F4A1} '+it.hint))}}},o.t);return bt});
  show(head('Practice · '+(i+1)+' / '+items().length),prog(i),log,el('p',{class:'hint'},'Your turn. What do you say?',el('small',{class:'cmth'},'ตาของนักเรียน ควรพูดว่าอะไร')),el('div',{class:'topts'},btns),fb,act)}
 function next(i){const run=D.run;run.state=i+1;
  if(run.state>=items().length){run.state='DONE';const n=items().length,ft=items().reduce((a,it)=>a+(run.first[it.id]===1?1:0),0);D.runs=(D.runs||0)+1;
   D.last={firstTry:ft,items:n,wrong:run.wrong,attempts:run.attempts,at:new Date().toISOString(),contentVersion:M.contentVersion};
   if(D.completion.status!=='completed'){D.completion.status='completed';D.completion.completedAt=D.last.at;D.completion.count=1}/* daily completion is recorded once per day */
   put();return summary()}
  put();play(run.state)}
 /* three separate results, as in CORE-M02: practice score, mission, speaking (never judged by the game) */
 function summary(){const st=dmStatus(M,day),L=D.last||{firstTry:0,items:items().length};
  show(head('Summary · สรุปผล'),prog(null),
   el('div',{class:'cmcard cmsum','data-sum':'practice'},el('b',{class:'cmk'},'A · Practice score⁣คะแนนฝึก'),el('p',{class:'cmbig'},'First try right: '+L.firstTry+' / '+L.items),
    el('small',{class:'cmth'},'ตอบถูกตั้งแต่ครั้งแรก '+L.firstTry+' จาก '+L.items+' ข้อ')),
   el('div',{class:'cmcard cmsum','data-sum':'mission'},el('b',{class:'cmk'},'B · Mission⁣ภารกิจ'),el('p',{class:'cmbig','data-placeholder':'doneToday'},'✓ '+DM_PLACEHOLDER.doneToday[0]),
    el('small',{class:'cmth'},'✓ '+DM_PLACEHOLDER.doneToday[1]+' · Runs · จำนวนรอบที่เล่น: '+st.runs+' · '+DM_PLACEHOLDER.days[0]+' · '+DM_PLACEHOLDER.days[1]+': '+st.daysCompleted+' · No XP or badge · ไม่มี XP หรือป้ายรางวัล')),
   el('div',{class:'cmcard cmsum','data-sum':'speaking'},el('b',{class:'cmk'},'C · Speaking⁣การพูด'),el('p',{class:'cmbig'},'Not assessed in the game'),
    el('small',{class:'cmth'},'เกมไม่ได้ประเมินการพูด ครูเป็นผู้ประเมินการพูดจริงแยกต่างหาก')),
   flag,note,
   el('button',{class:'btn cta cmgo','data-act':'missions','data-focus':'',type:'button',onclick:()=>close()},'Back to Missions⁣กลับหน้าภารกิจ'),
   el('div',{class:'row cmnav'},el('button',{class:'btn ghost','data-act':'replay',type:'button',onclick:()=>{if(hold())return;busy=true;D.run=newRun();put();intro()}},'Play again⁣เล่นอีกครั้ง')))}
 if(D.run&&D.run.state==='DONE')summary();else intro();
 return close}
/* Missions screen: the "Daily missions" row gets an open button in the local preview only */
function dmFutureRow(e,t,reopen){const M=DAILY_MISSIONS[0],st=dmStatus(M),tag=st.status==='completed'?['Completed today','วันนี้ทำครบแล้ว','ok']:st.inRun?['In progress','กำลังทำ','']:['Local preview','ตัวอย่างในเครื่อง',''];
 return el('li',{class:'dmrow','data-dm-card':M.id},el('span',{},el('b',{},e),el('small',{},t),el('small',{class:'dmname'},M.name+' · '+st.done+' / '+st.total)),
  el('span',{class:'mrtag '+tag[2]},tag[0]+' · '+tag[1]),
  el('button',{class:'btn cta dmgo','data-act':'dm-open',type:'button',onclick:reopen},DM_PLACEHOLDER.cardOpen[0]+'⁣'+DM_PLACEHOLDER.cardOpen[1]))}
