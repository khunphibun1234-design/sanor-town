/* ===== ST-UX-007 CS-1: station Hub with learning modes (School Canteen first). Talk = the 3D scene (unchanged).
   Words / Listen / Speak / Read / Write / Quiz are practice: they never change stars, money or XP. Speak is practice only (no microphone, no score). ===== */
const HUBMODES=[['talk','Talk','คุยภารกิจหลัก','\u{1F4AC}'],['words','Words','คำศัพท์','\u{1F524}'],['listen','Listen','ฟัง','\u{1F3A7}'],['speak','Speak','พูดตาม','\u{1F5E3}️'],
 ['read','Read','อ่าน','\u{1F4D6}'],['write','Write','เขียน','✏️'],['quiz','Quiz','แบบทดสอบ','✅']];
const HUBSOON=[];/* CS-2 (10 Nov): Read / Write / Quiz open */
const hubRec=(id,m)=>{SAVE.modes=SAVE.modes||{};SAVE.modes[id]=SAVE.modes[id]||{};return SAVE.modes[id][m]=SAVE.modes[id][m]||{s:'started',a:0,f:0,t:0}};
/* CS-4 (10 Nov): a finished practice run keeps its last result (first-try right / items) and how many times it was done */
const hubFin=(id,m,last)=>{const r=hubRec(id,m);r.s='done';r.runs=(r.runs||0)+1;r.last=Object.assign({at:new Date().toISOString().slice(0,10)},last||{});persist();return r};
const hubSt=(id,m)=>m==='talk'?(doneCount(id)>=nTotal(SCENES.find(s=>s.id===id))?'done':doneCount(id)?'started':'none'):((SAVE.modes&&SAVE.modes[id]&&SAVE.modes[id][m]||{}).s||'none');
/* Hub for every Our School station (10 Nov): canteen has its own HUB data; the others are built by hubAuto() from approved content */
const hubOK=s=>!!(HUB[s.id]||(s.group==='phibun'&&s.npcs&&s.npcs.length&&s.prep&&s.prep.length));
function goPlace(s,onExit,bl){if(hubOK(s))hubSheet(s,onExit);else playPlace(s,onExit,bl)}
function hubSheet(sc,onExit){const H=HUB[sc.id]||(HUB[sc.id]=hubAuto(sc)),nm=GNAME[sc.id]||[shortName(sc),sc.th];
 const soonM=m=>HUBSOON.includes(m)||(H.soon||[]).includes(m);
 mrSheet(nm[0]+' learning modes',(x,close)=>{const body=el('div',{class:'hubb'});
  const talk=()=>{close();stopSay();playPlace(sc,onExit)};
  const back=()=>{stopSay();body.replaceChildren(...home())};
  const bar=(t)=>el('div',{class:'row hubbar'},el('button',{class:'btn ghost hubback',type:'button',onclick:back},'← Hub'),el('b',{},t),x);
  const stTag=s=>s==='done'?el('span',{class:'hubst ok'},'✓ Done · เสร็จ'):s==='started'?el('span',{class:'hubst'},'Started · เริ่มแล้ว'):null;
  const home=()=>{const on=HUBMODES.map(m=>m[0]).filter(m=>!soonM(m)),nDone=on.filter(m=>hubSt(sc.id,m)==='done').length,stars=doneCount(sc.id),n=nTotal(sc);
   const card=([m,en,th,ic])=>{const soon=soonM(m),st=hubSt(sc.id,m);
    const kids=[el('span',{class:'hubic','aria-hidden':'true'},ic),el('b',{},en),el('small',{},th),m==='talk'?el('small',{class:'hubmq'},'Main Quest · '+stars+'/'+n+' ★'):null,soon?el('small',{class:'hubsoon'},'Coming soon · เร็ว ๆ นี้'):stTag(st)];
    return soon?el('div',{class:'hubm soon','aria-label':en+', coming soon'},...kids)
     :el('button',{class:'hubm'+(m==='talk'?' talk':''),type:'button','data-mode':m,onclick:()=>m==='talk'?talk():body.replaceChildren(...run(m))},...kids)};
   return [el('div',{class:'row hubbar'},el('h2',{},nm[0]+'⁣'+nm[1]),x),
    el('div',{class:'hubhero',style:'--c:'+(LCOL[sc.id]||sc.color)},el('img',{src:'img/stations3/'+sc.id+'.jpg',alt:'',width:'268',height:'91'}),(t=>el('div',{},el('b',{},t[0]),el('small',{},t[1])))(H.title||(H.auto?['Our School · '+(STIME[sc.id]||''),'ฝึกภาษาอังกฤษที่'+nm[1]]:["Let's Order Lunch!",'สั่งอาหารกลางวันกันเถอะ']))),
    el('div',{class:'hubms'+(sc.shop?'':' one')},el('button',{class:'btn cta hubgo',type:'button',onclick:talk},'Guided Mission ▶⁣ภารกิจหลัก · นับดาว'),
     sc.shop?el('button',{class:'hubfree on',type:'button',onclick:()=>{close();stopSay();playPlace(Object.assign({},sc,{free:true,mission:null,prep:null}),onExit)}},el('b',{},'Free Shopping ▶'),el('small',{},'ซื้ออิสระ · no stars · ไม่นับดาว'))
     :null),
    el('div',{class:'hubgrid'},HUBMODES.map(card)),
    el('button',{class:'btn ghost hubresb',type:'button',onclick:()=>body.replaceChildren(...results())},'\u{1F4CA} My results · ผลของฉัน'),
    el('p',{class:'hubprog'},'Modes done · ทำแล้ว '+nDone+' / '+on.length+' · Stars come from Talk only. ⁣ดาวมาจากภารกิจ Talk เท่านั้น ไม่ต้องทำตามลำดับ')]};
  /* ---- Words: flash cards, then a 4-question match (Thai -> English) ---- */
  const words=(k)=>{const W=H.words,w=W[k];hubRec(sc.id,'words');
   if(k>=W.length)return match(0,shuffle(W).slice(0,4));
   return [bar('Words '+(k+1)+' / '+W.length),
    el('div',{class:'hubfc'},el('div',{class:'hubpic','aria-hidden':'true'},w[6]),el('h3',{},w[0]),el('p',{class:'hubth'},w[2]+' · '+w[1]+' · '+w[5]),
     el('button',{class:'btn ghost',type:'button',onclick:()=>say(w[0].replace('...','something'),.85)},'\u{1F50A} Listen · ฟัง'),
     el('p',{class:'hubex'},el('span',{},w[3]),el('small',{},w[4])),el('button',{class:'tpsay',type:'button','aria-label':'Listen: '+w[3],onclick:()=>say(w[3],.85)},'\u{1F50A}')),
    el('button',{class:'btn cta',type:'button',onclick:()=>body.replaceChildren(...words(k+1))},k+1<W.length?'Next · ต่อไป':'Match game · เกมจับคู่ ▶'),
    el('p',{class:'hubnote'},'Voice: your phone · เสียงอ่านจากเครื่อง (ไม่ใช่ไฟล์เสียงต้นฉบับ)')]};
  const match=(k,qs)=>{const r=hubRec(sc.id,'words');if(k===0)r.lf=0;
   if(k>=qs.length){hubFin(sc.id,'words',{f:r.lf,n:qs.length});return [bar('Words'),el('div',{class:'hubfc'},el('h3',{},'Well done! ✓ เก่งมาก'),el('p',{class:'hubth'},'You practised '+H.words.length+' words. · ฝึกครบ '+H.words.length+' คำแล้ว')),el('button',{class:'btn cta',type:'button',onclick:back},'Back to Hub · กลับหน้าโหมด')]}
   const q=qs[k],opts=shuffle([q,...shuffle(H.words.filter(w=>w!==q)).slice(0,2)]);return quizView('Words · match '+(k+1)+' / '+qs.length,'Which English means … · คำไหนแปลว่า',q[2],null,opts.map(o=>[o[0],o===q,'']),r,()=>body.replaceChildren(...match(k+1,qs)))};
  /* ---- Listen: the phone reads a line, the student answers; text can always be shown (no hidden real audio) ---- */
  const listen=(k)=>{const L=H.listen,r=hubRec(sc.id,'listen');
   if(k>=L.length){hubFin(sc.id,'listen',{f:r.lf,n:L.length});return [bar('Listen'),el('div',{class:'hubfc'},el('h3',{},'Great listening! ✓'),el('p',{class:'hubth'},'Right on the first try: '+r.lf+' / '+L.length+' · ตอบถูกครั้งแรก')),el('p',{class:'hubnote'},'This is listening practice with your phone voice. It is not a test score.⁣เป็นแบบฝึกฟังด้วยเสียงจากเครื่อง ไม่ใช่คะแนนสอบ'),el('button',{class:'btn cta',type:'button',onclick:back},'Back to Hub · กลับหน้าโหมด')]}
   if(k===0)r.lf=0;const [line,q,qth,o,oth,why]=L[k];
   const tx=el('p',{class:'hubtx',hidden:true},line);
   const play=el('button',{class:'btn cta',type:'button',onclick:()=>say(line,.85)},'▶ Play · เล่น');setTimeout(()=>say(line,.85),250);
   return quizView('Listen '+(k+1)+' / '+L.length,q,qth,[play,el('button',{class:'btn ghost',type:'button',onclick:()=>say(line,.65)},'↻ Slower · ช้าลง'),
     el('button',{class:'btn ghost',type:'button',onclick:()=>{tx.hidden=false}},'Show text · แสดงข้อความ'),tx,el('p',{class:'hubnote'},'Voice: your phone · เสียงจากเครื่อง ถ้าไม่มีเสียง กด Show text')],
    o.map((t,i)=>[oth?t+' · '+oth[i]:t,i===0,i?why[i-1]:'']),r,()=>body.replaceChildren(...listen(k+1)),()=>{tx.hidden=false})};
  /* ---- Speak: listen and say aloud. Practice only: no microphone, no recording, no score ---- */
  const speak=()=>{const P=sc.prep||[],r=hubRec(sc.id,'speak'),said=new Set();
   const doneB=el('button',{class:'btn cta',type:'button',disabled:true,onclick:()=>{hubFin(sc.id,'speak',{said:P.length});back()}},'Finish · เสร็จ (0 / '+P.length+')');
   return [bar('Speak'),el('p',{class:'hubnote strong'},'Practise aloud — not automatically scored.⁣ฝึกพูดออกเสียง แอปไม่ได้ฟังหรือให้คะแนน และไม่บันทึกเสียง · พูดกับเพื่อนได้'),
    el('ul',{class:'tplist hubsp'},P.map(([en,th])=>{const b=el('button',{class:'btn ghost hubsaid',type:'button',onclick:()=>{said.add(en);b.classList.add('on');b.textContent='✓ I said it · พูดแล้ว';doneB.textContent='Finish · เสร็จ ('+said.size+' / '+P.length+')';doneB.disabled=said.size<P.length}},'I said it · ฉันพูดแล้ว');
     return el('li',{},el('button',{class:'tpsay',type:'button','aria-label':'Listen: '+en,onclick:()=>say(en,.85)},'\u{1F50A}'),el('span',{},el('b',{},en),el('small',{},th)),b)})),
    el('p',{class:'hubnote'},'Your teacher checks speaking with a rubric outside the app.⁣ครูประเมินการพูดด้วยเกณฑ์ (rubric) นอกแอป'),doneB]};
  /* shared 3-option question: first try counts once; wrong = WHY + try again (same as Talk) */
  const quizView=(title,q,qth,extra,opts,r,next,reveal)=>{let first=true;const fb=el('p',{class:'tfb','aria-live':'polite'});
   const bs=shuffle(opts).map(([t,ok,why])=>{const b=el('button',{class:'topt',type:'button'},t);b.addEventListener('click',()=>{
     if(ok){bs.forEach(x=>x.disabled=true);b.classList.add('good');fb.className='tfb good';fb.textContent='Great! ✓';r.t++;if(first){r.f++;if(r.lf!==undefined)r.lf++}if(reveal)reveal();persist();setTimeout(next,900)}
     else{if(first)r.a++;first=false;b.disabled=true;b.classList.add('bad');fb.className='tfb bad';fb.replaceChildren('Not quite. Try again. · ยังไม่ใช่ ลองใหม่',why?el('br'):'',why||'')}});return b});
   return [bar(title),el('div',{class:'hubfc'},el('p',{class:'hubq'},q),qth?el('small',{class:'hubth'},qth):null,...(extra||[])),el('div',{class:'topts'},bs),fb]};
  /* ===== CS-2 (10 Nov): Read / Write / Quiz. Practice only: never change stars, money, XP or research data.
     Prices come from the price registry (SHOPI), so the texts always match the shop. ===== */
  const P=k=>SHOPI[k].p,done=(m,title,lines,note,last)=>{hubFin(sc.id,m,last);
   return [bar(title),el('div',{class:'hubfc'},el('h3',{},'Well done! ✓ เก่งมาก'),...lines.map(l=>el('p',{class:'hubth'},l))),note?el('p',{class:'hubnote'},note):null,
    el('button',{class:'btn cta',type:'button',onclick:back},'Back to Hub · กลับหน้าโหมด')]};
  /* ---- Read: a menu board, a sample receipt and a canteen notice, then questions ---- */
  const menuCard=()=>el('div',{class:'hubdoc hubmenu','aria-label':'Canteen menu'},el('b',{class:'hubdh'},'Canteen Menu · เมนูโรงอาหาร'),
   ...[['rice','Auntie Pen'],['noodle','Uncle Chai'],['drinks','Ms. Kaew']].map(([s,who])=>el('div',{class:'hubdsec'},el('small',{},who),
    el('ul',{},Object.keys(SHOPI).filter(k=>SHOPI[k].shop===s).map(k=>el('li',{},el('span',{},SHOPI[k].en),el('b',{},SHOPI[k].p==null?'—':SHOPI[k].p+' ฿')))))));
  const RC={items:[['noodle_soup',1],['lemontea',1]],paid:50};RC.total=RC.items.reduce((a,[k,q])=>a+P(k)*q,0);RC.change=RC.paid-RC.total;
  const receipt=()=>el('div',{class:'hubdoc hubrc','aria-label':'Sample receipt'},el('b',{class:'hubdh'},'SAMPLE RECEIPT · ใบเสร็จตัวอย่าง'),el('small',{},'Sanor Town Canteen (game) · ในเกมเท่านั้น'),
   el('ul',{},RC.items.map(([k,q])=>el('li',{},el('span',{},SHOPI[k].en+' × '+q),el('b',{},P(k)*q+' ฿'))),el('li',{class:'hubrt'},el('span',{},'Total'),el('b',{},RC.total+' ฿')),
    el('li',{},el('span',{},'Paid: cash'),el('b',{},RC.paid+' ฿')),el('li',{},el('span',{},'Change'),el('b',{},RC.change+' ฿'))));
  const notice=()=>el('div',{class:'hubdoc hubnt','aria-label':'Canteen notice'},el('b',{class:'hubdh'},'NOTICE · ประกาศ'),
   el('p',{},'Wash your hands before you eat.'),el('p',{},'Please queue at the stalls.'),el('p',{},'After lunch, return your plates to the tray rack.'),el('p',{},'Meatballs: '+P('meatball')+' baht a stick.'));
  const RQ=[[menuCard,'How much is a large plate of rice and curry?','ข้าวราดแกงพิเศษราคาเท่าไร',[P('rice_big')+' baht',P('rice_reg')+' baht',P('bubble')+' baht'],
     ['That is the regular plate. | นั่นคือราคาจานธรรมดา','That is the price of a drink. | นั่นคือราคาเครื่องดื่ม']],
   [menuCard,'Which one costs '+NW(P('water'))+' baht?','ข้อใดราคา '+P('water')+' บาท',['Bottled water','Bubble milk tea','Noodle soup'],
     ['Bubble milk tea is '+P('bubble')+' baht. | ชาไข่มุก '+P('bubble')+' บาท','Noodle soup is '+P('noodle_soup')+' baht. | ก๋วยเตี๋ยว '+P('noodle_soup')+' บาท']],
   [menuCard,'Who sells guay jub?','ใครขายก๋วยจั๊บ',['Uncle Chai','Auntie Pen','Ms. Kaew'],
     ['Auntie Pen sells rice and curry. | ป้าเพ็ญขายข้าวราดแกง','Ms. Kaew sells drinks and meatballs. | ป้าแก้วขายเครื่องดื่มและลูกชิ้น']],
   [receipt,'What is the total?','ยอดรวมเท่าไร',[RC.total+' baht',RC.paid+' baht',RC.change+' baht'],
     [RC.paid+' baht is the money paid. | '+RC.paid+' บาทคือเงินที่จ่าย',RC.change+' baht is the change. | '+RC.change+' บาทคือเงินทอน']],
   [receipt,'How much change did the student get?','นักเรียนได้เงินทอนเท่าไร',[RC.change+' baht',RC.total+' baht',RC.paid+' baht'],
     [RC.total+' baht is the total. | นั่นคือยอดรวม',RC.paid+' baht is the money paid. | นั่นคือเงินที่จ่าย']],
   [receipt,'How did the student pay?','นักเรียนจ่ายเงินแบบไหน',['By cash','By QR code','By card'],
     ['The receipt says “Paid: cash”. | ใบเสร็จเขียนว่าจ่ายเงินสด','There is no card on the receipt. | ใบเสร็จไม่มีการจ่ายด้วยบัตร']],
   [notice,'Where do you return your plates?','เก็บจานไว้ที่ไหน',['To the tray rack','To Ms. Kaew','To the classroom'],
     ['The notice says the tray rack. | ประกาศบอกให้เก็บที่ชั้นวางถาด','The notice says the tray rack. | ประกาศบอกให้เก็บที่ชั้นวางถาด']],
   [notice,'What should you do before you eat?','ก่อนกินควรทำอะไร',['Wash your hands','Return your plates','Buy meatballs'],
     ['You return plates AFTER lunch. | เก็บจานหลังกินเสร็จ','The notice gives the price of meatballs, not a rule. | ประกาศบอกราคาลูกชิ้น ไม่ได้สั่งให้ซื้อ']]];
  const read=k=>{const r=hubRec(sc.id,'read');if(k===0)r.lf=0;
   if(k>=RQ.length)return done('read','Read',['Right on the first try: '+r.lf+' / '+RQ.length+' · ตอบถูกครั้งแรก'],'Reading practice. It is not a test score.⁣เป็นแบบฝึกอ่าน ไม่ใช่คะแนนสอบ',{f:r.lf,n:RQ.length});
   const [doc,q,qth,o,why]=RQ[k];return quizView('Read '+(k+1)+' / '+RQ.length,q,qth,[doc()],o.map((t,i)=>[t,i===0,i?why[i-1]:'']),r,()=>body.replaceChildren(...read(k+1)))};
  /* ---- Write: fill the gap -> put words in order -> change a sentence (typed; several right forms are accepted) ---- */
  const norm=s=>s.toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();
  const WQ=[{t:'pick',q:"I'd like ___, please.",th:'เติมคำ: ขอก๋วยเตี๋ยวน้ำหนึ่งชาม',pic:'\u{1F35C}',o:['a bowl of noodle soup','a bottle of noodle soup','a noodle soup bowls'],
     why:['Soup comes in a bowl, not a bottle. | ก๋วยเตี๋ยวใส่ชาม ไม่ได้ใส่ขวด','Say “a bowl of noodle soup”. | ใช้ a bowl of noodle soup']},
   {t:'pick',q:'How ___ is it?',th:'เติมคำ: ถามราคา',pic:'\u{1F4B0}',o:['much','many','long'],
     why:['“How many” asks the number of things. | How many ถามจำนวน','“How long” asks about time or length. | How long ถามเวลา/ความยาว']},
   {t:'order',q:'Put the words in order.',th:'เรียงคำ: ขอจ่ายด้วย QR code ได้ไหม',w:['Can','I','pay','by','QR','code?']},
   {t:'order',q:'Put the words in order.',th:'เรียงคำ: ฉันเหลือเงินยี่สิบบาท',w:['I','have','twenty','baht','left.']},
   {t:'type',q:'Change “regular” to “large”:  Regular, please.',th:'เปลี่ยนเป็นจานพิเศษ แล้วพิมพ์ประโยค',a:['Large, please.'],ok:['large please','a large one please','large one please','a large plate please'],hint:'Use the word “large”. | ใช้คำว่า large แทน regular'},
   {t:'type',q:'Make it two:  A bottle of water, please.',th:'เปลี่ยนเป็น 2 ขวด แล้วพิมพ์ประโยค',a:['Two bottles of water, please.'],ok:['two bottles of water please','2 bottles of water please'],hint:'two + bottles (add -s). | สองขวด = two bottles'}];
  const write=k=>{const r=hubRec(sc.id,'write');if(k===0)r.lf=0;
   if(k>=WQx.length)return done('write','Write',['Right on the first try: '+r.lf+' / '+WQx.length+' · ทำถูกครั้งแรก'],'Writing practice: the app checks your text, not your speaking.⁣ฝึกเขียน แอปตรวจข้อความ ไม่ใช่การพูด',{f:r.lf,n:WQx.length});
   const w=WQx[k],title='Write '+(k+1)+' / '+WQx.length,next=()=>body.replaceChildren(...write(k+1));
   if(w.t==='pick')return quizView(title,w.q,w.th,[el('div',{class:'hubpic','aria-hidden':'true'},w.pic)],w.o.map((t,i)=>[t,i===0,i?w.why[i-1]:'']),r,next);
   let first=true;const fb=el('p',{class:'tfb','aria-live':'polite'}),nx=el('button',{class:'btn cta',type:'button',hidden:true,onclick:next},'Next · ต่อไป');
   const good=()=>{fb.className='tfb good';fb.textContent='Great! ✓';r.t++;if(first){r.f++;r.lf++}persist();nx.hidden=false;nx.focus()};
   const bad=(msg,show)=>{if(first)r.a++;first=false;persist();fb.className='tfb bad';fb.replaceChildren('Not quite. Try again. · ยังไม่ใช่ ลองใหม่',el('br'),msg);if(show)fb.append(el('br'),el('b',{},'Answer · คำตอบ: '+show))};
   if(w.t==='order'){const ans=w.w.join(' '),pool=shuffle(w.w.map((t,i)=>({t,i}))),pick=[];let tries=0;
    const line=el('p',{class:'hubline','aria-live':'polite'}),tiles=el('div',{class:'hubtiles'}),chk=el('button',{class:'btn cta',type:'button',disabled:true},'Check · ตรวจ');
    const paint=()=>{line.textContent=pick.map(p=>p.t).join(' ')||'…';tiles.replaceChildren(...pool.map(p=>{const b=el('button',{class:'hubtile',type:'button',disabled:pick.includes(p)},p.t);
      b.addEventListener('click',()=>{if(!nx.hidden)return;pick.push(p);paint()});return b}));chk.disabled=pick.length<pool.length||!nx.hidden};
    const clr=el('button',{class:'btn ghost',type:'button',onclick:()=>{if(nx.hidden){pick.length=0;paint()}}},'Clear · ล้าง');
    chk.addEventListener('click',()=>{if(pick.map(p=>p.t).join(' ')===ans){chk.disabled=true;good()}else{tries++;bad('Start with “'+w.w[0]+'”. | เริ่มด้วยคำว่า '+w.w[0],tries>=2?ans:null);pick.length=0;paint()}});
    paint();return [bar(title),el('div',{class:'hubfc'},el('p',{class:'hubq'},w.q),el('small',{class:'hubth'},w.th),line,tiles),el('div',{class:'row hubwb'},clr,chk),fb,nx]}
   let tries=0;const inp=el('input',{class:'hubin',type:'text','aria-label':'Your sentence',autocomplete:'off',autocapitalize:'sentences',spellcheck:'false',placeholder:'Type here · พิมพ์ที่นี่'});
   const chk=el('button',{class:'btn cta',type:'button'},'Check · ตรวจ');
   const go=()=>{if(!nx.hidden||!inp.value.trim())return;if(w.ok.includes(norm(inp.value))){inp.disabled=true;chk.disabled=true;good()}else{tries++;bad(w.hint,tries>=2?w.a[0]:null)}};
   chk.addEventListener('click',go);inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}});
   setTimeout(()=>inp.focus({preventScroll:true}),80);
   return [bar(title),el('div',{class:'hubfc'},el('p',{class:'hubq'},w.q),el('small',{class:'hubth'},w.th),inp,el('small',{class:'hubth'},'Capital letters and full stops are not checked. · ไม่ตรวจตัวพิมพ์ใหญ่และจุด')),el('div',{class:'row hubwb'},chk),fb,nx]};
  /* ---- Quiz: 8 questions in 3 parts (Language / Math / Payment). Practice only: not the research tests K1–K3 ---- */
  const QQ=[['L','Which is the polite way to order?','ข้อใดสั่งอาหารสุภาพ',["I'd like rice and curry, please.",'Give me rice.','Rice. Now.'],['That sounds like an order, not a request. | ฟังดูเป็นคำสั่ง ไม่สุภาพ','That is not polite. | ไม่สุภาพ']],
   ['L','How do you ask the price?','ถามราคาอย่างไร',['How much is it?','How many is it?','What price you?'],['“How many” asks the number. | How many ถามจำนวน','The grammar is not correct. | ไวยากรณ์ไม่ถูก']],
   ['L','Bow asks, “What did you get for lunch?” The best answer is …','Bow ถามว่าซื้ออะไรมา ตอบว่าอะไรดีที่สุด',['I got noodle soup and a bottle of water.','I get to the canteen.','Yes, I got.'],['That is about going somewhere. | เป็นการบอกว่าไปถึงที่ไหน','Bow wants to know WHAT you got. | Bow ถามว่าซื้ออะไร']],
   ['M','Rice and curry (large) + bottled water = ?','ข้าวพิเศษ + น้ำ = ?',[(P('rice_big')+P('water'))+' baht',P('rice_big')+' baht',(P('rice_big')+P('water')+5)+' baht'],[P('rice_big')+' + '+P('water')+' = '+(P('rice_big')+P('water'))+'. | อย่าลืมบวกค่าน้ำ',P('rice_big')+' + '+P('water')+' = '+(P('rice_big')+P('water'))+'. | บวกเกินมา 5 บาท']],
   ['M','You give 50 baht for noodle soup ('+P('noodle_soup')+' baht). What is your change?','จ่าย 50 บาท ซื้อก๋วยเตี๋ยว เงินทอนเท่าไร',[(50-P('noodle_soup'))+' baht',(50-P('noodle_soup')-5)+' baht',(50+P('noodle_soup'))+' baht'],['50 − '+P('noodle_soup')+' = '+(50-P('noodle_soup'))+'. | ลองลบใหม่','Change = money given − price. | เงินทอน = เงินที่ให้ − ราคา']],
   ['M','You have 50 baht. You buy two bubble milk teas. How much money is left?','มี 50 บาท ซื้อชาไข่มุก 2 แก้ว เหลือเท่าไร',[(50-2*P('bubble'))+' baht',(50-P('bubble'))+' baht',2*P('bubble')+' baht'],['That is for ONE tea. You bought two. | นั่นคือซื้อแก้วเดียว',2*P('bubble')+' baht is what you spent. | นั่นคือเงินที่ใช้ไป']],
   ['P','In Sanor Town, the QR code is …','QR ในเกมคืออะไร',['a sample picture in the game (no real money)','a real bank payment','a way to open the camera'],['No real money moves in the game. | ในเกมไม่มีการโอนเงินจริง','The game never opens the camera. | เกมไม่เปิดกล้อง']],
   ['P','You paid by QR code. Do you get change?','จ่ายด้วย QR ได้เงินทอนไหม',['No. QR pays the exact amount.','Yes, always.','Yes, but only coins.'],['QR pays the exact price, so there is no change. | QR จ่ายตามยอดพอดี','QR pays the exact price, so there is no change. | QR จ่ายตามยอดพอดี']]];
  const PART={L:['Language','ภาษา'],M:['Math','คิดเลข'],P:['Payment','การจ่ายเงิน']};
  const QQx=H.quiz||QQ,WQx=H.write||WQ,PARTx=H.parts||PART;/* the other stations use their own approved-content items */
  const quiz=(k,got)=>{const r=hubRec(sc.id,'quiz');if(k===0){r.lf=0;got=Object.fromEntries(Object.keys(PARTx).map(c=>[c,0]))}
   if(k>=QQx.length)return done('quiz','Quiz',[...Object.keys(PARTx).map(c=>PARTx[c][0]+' · '+PARTx[c][1]+': '+got[c]+' / '+QQx.filter(q=>q[0]===c).length),'Right on the first try: '+r.lf+' / '+QQx.length],
    'Practice quiz. It is not a research test (K1–K3) and gives no stars or XP.⁣แบบทดสอบฝึกหัด ไม่ใช่แบบทดสอบวิจัย K1–K3 ไม่ได้ดาวหรือ XP',{f:r.lf,n:QQx.length,parts:got});
   const [c,q,qth,o,why]=QQx[k],lf0=r.lf;return quizView('Quiz '+(k+1)+' / '+QQx.length+' · '+PARTx[c][0],q,qth,null,o.map((t,i)=>[t,i===0,i?why[i-1]:'']),r,()=>{if(r.lf>lf0)got[c]++;body.replaceChildren(...quiz(k+1,got))})};
  /* ---- CS-4 My results: one card per mode, from this phone's save only. Practice results: not a test, not a speaking score ---- */
  const results=()=>{const M=(SAVE.modes&&SAVE.modes[sc.id])||{},on=HUBMODES.map(m=>m[0]).filter(m=>!soonM(m)),nDone=on.filter(m=>hubSt(sc.id,m)==='done').length;
   const ST={done:['Completed','ทำครบแล้ว','ok'],started:['In progress','กำลังทำ','go'],none:['Not started','ยังไม่เริ่ม','no']};
   const cm=sc.id==='canteen'?canteenMission():null;
   const row=([m,en,th,ic])=>{const st=hubSt(sc.id,m),r=M[m]||{},L=r.last,t=ST[st];let det=[];
    if(m==='talk'){det.push('★ '+doneCount(sc.id)+' / '+nTotal(sc)+' stars · ดาว');if(L)det.push('Last mission: right on the first try '+L.f+' / '+L.n+' · ภารกิจล่าสุด ตอบถูกครั้งแรก '+L.f+' / '+L.n);
     if(cm)det.push(cm.got?'Reward: 40 XP + Lunch Master ✓ · ได้รางวัลแล้ว':cm.state==='earlier'?'Finished before rewards started · จบก่อนมีระบบรางวัล':'Reward when you finish: 40 XP (once) · รางวัลเมื่อจบ 40 XP')}
    else if(m==='speak')det.push(L?'Practised '+L.said+' phrases aloud · not scored · ฝึกพูด '+L.said+' ประโยค ไม่มีคะแนน':'Practise aloud · not scored · ไม่มีคะแนน');
    else if(L){det.push('Last time: right on the first try '+L.f+' / '+L.n+' · ครั้งล่าสุด ตอบถูกครั้งแรก '+L.f+' / '+L.n);
     if(L.parts)det.push(Object.keys(L.parts).map(c=>(PARTx[c]?PARTx[c][0]:c)+' '+L.parts[c]+'/'+QQx.filter(q=>q[0]===c).length).join(' · '))}
    else if(st==='started')det.push('Not finished yet · ยังทำไม่จบ');
    return el('li',{class:'hubrrow','data-mode':m},el('span',{class:'hubic','aria-hidden':'true'},ic),
     el('div',{class:'hubrtx'},el('b',{},en+' · '+th),...det.map(d=>el('small',{},d))),
     el('div',{class:'hubrst'},el('span',{class:'hubpill '+t[2]},t[0]+' · '+t[1]),r.runs?el('small',{},'× '+r.runs):null))};
   return [bar('My results · ผลของฉัน'),
    el('div',{class:'hubrsum'},el('b',{},'Modes completed · ทำครบ '+nDone+' / '+on.length),el('div',{class:'hubbarw',role:'progressbar','aria-valuemin':'0','aria-valuemax':String(on.length),'aria-valuenow':String(nDone)},el('span',{style:'width:'+Math.round(100*nDone/on.length)+'%'}))),
    el('ul',{class:'hubrlist'},HUBMODES.filter(m=>on.includes(m[0])).map(row)),
    el('p',{class:'hubnote'},'Practice results only: not a test score and not a speaking grade. Stars come from Talk only. Saved only on this phone.⁣ผลการฝึกเท่านั้น ไม่ใช่คะแนนสอบหรือคะแนนการพูด ดาวมาจาก Talk เท่านั้น บันทึกในเครื่องนี้เท่านั้น'),
    el('button',{class:'btn cta',type:'button',onclick:back},'Back to Hub · กลับหน้าโหมด')]};
  const run=m=>m==='words'?words(0):m==='listen'?listen(0):m==='read'?read(0):m==='write'?write(0):m==='quiz'?quiz(0):speak();
  body.replaceChildren(...home());return [body]})}
const RW_FUTURE=[['Daily missions','ภารกิจประจำวัน'],['Skill missions','ภารกิจฝึกทักษะ'],['Improvement missions','ภารกิจแก้จุดที่ผิด'],['Real-life missions','ภารกิจในชีวิตจริง']];
function missionsSheet(){const m=canteenMission(),sc=SCENES.find(x=>x.id==='canteen');
 const tag={new:['Not started','ยังไม่เริ่ม',''],progress:['In progress','กำลังทำ',''],done:['Completed','จบแล้ว','ok'],earlier:['Completed earlier','จบแล้ว','old']}[m.state];
 const steps=[['Buy one meal','เลือกซื้ออาหารหลัก 1 อย่าง (ข้าวราดแกง หรือ ก๋วยเตี๋ยว)'],['Buy a drink or a snack','ซื้อเครื่องดื่มหรือลูกชิ้น 1 อย่างขึ้นไป'],['Talk to Bow at the table','ไปคุยกับโบว์ที่โต๊ะ']];
 const rewardLine=m.got?'Reward earned: 40 XP and the Lunch Master badge.⁣ได้รับรางวัลแล้ว 40 XP และเหรียญ Lunch Master'
  :m.state==='earlier'?'You finished this before rewards started. Earlier plays do not get XP.⁣เธอเล่นจบก่อนมีระบบรางวัล การเล่นก่อนหน้านี้จึงไม่ได้ XP ย้อนหลัง'
  :'Reward when you finish: 40 XP and the Lunch Master badge (once only).⁣รางวัลเมื่อทำครบ: 40 XP และเหรียญ Lunch Master (ได้ครั้งเดียว)';
 mrSheet('Missions',(x,close)=>[
  el('div',{class:'row'},el('h2',{},'Missions⁣ภารกิจ'),x),
  el('p',{class:'mrlead'},'Do a story mission at a place in our school.⁣ทำภารกิจเรื่องราวในสถานที่ของโรงเรียน'),
  el('h3',{},'Story mission⁣ภารกิจเรื่องราว'),
  el('section',{class:'mrcard','aria-label':'School Canteen mission, '+m.n+' of 3 steps, '+tag[0]},
   el('div',{class:'mrtop'},el('div',{},el('b',{},'Lunch at the School Canteen'),el('small',{},'มื้อกลางวันที่โรงอาหาร 60 ปี · 12:00')),el('span',{class:'mrtag '+tag[2]},tag[0]+' · '+tag[1])),
   el('div',{class:'mrbar',role:'progressbar','aria-valuemin':'0','aria-valuemax':'3','aria-valuenow':String(m.n),'aria-label':'Steps done'},el('i',{style:'width:'+(m.n/3*100)+'%'})),
   el('p',{class:'mrlead','aria-live':'polite'},m.n+' / 3 steps · ทำแล้ว '+m.n+' จาก 3 ขั้น'),
   el('ol',{class:'mrsteps'},steps.map((t,i)=>el('li',{class:m.steps[i]?'on':''},el('span',{class:'mrck','aria-hidden':'true'},m.steps[i]?'✓':String(i+1)),
    el('span',{class:'mrtx'},el('b',{},t[0]),el('small',{},t[1])),el('span',{class:'vh'},m.steps[i]?' done':' not done yet')))),
   (()=>{const r=el('p',{class:'mrrew'});const ic=el('span',{class:'mrbmini','aria-hidden':'true'});ic.innerHTML=RW_ART;r.append(ic,el('span',{},rewardLine));return r})(),
   m.state==='done'?el('p',{class:'mrnote'},'Playing again is fine, but it does not add more XP.⁣เล่นซ้ำได้ แต่จะไม่ได้ XP เพิ่ม'):null,
   sc?el('button',{class:'btn cta mrgo',type:'button',onclick:()=>{close();playPlace(sc,render)}},m.state==='new'?'Go to the Canteen⁣ไปโรงอาหาร':'Open the Canteen⁣เปิดโรงอาหาร'):null),
  el('h3',{},'Core mission (prototype)⁣ภารกิจหลักสูตร (รุ่นทดลอง)'),coreMissionCard(()=>{close();coreOpen(missionsSheet)}),/* CORE-M02 local prototype (11 Nov): src/55-core-m02.js */
  el('h3',{},'More missions⁣ภารกิจอื่น'),
  el('ul',{class:'mrfut'},RW_FUTURE.map(([e,t])=>e==='Daily missions'&&DM_PREVIEW()?dmFutureRow(e,t,()=>{close();dmOpen(DAILY_MISSIONS[0],missionsSheet)}):el('li',{},/* ST-MEX-001: local preview only */el('span',{},el('b',{},e),el('small',{},t)),el('span',{class:'mrtag'},'Future · เร็ว ๆ นี้')))),
  el('p',{class:'mrnote'},'Only the missions above are open now. Other missions are not available yet.⁣ตอนนี้เปิดเฉพาะภารกิจด้านบน ภารกิจอื่นยังไม่เปิดใช้')])}
/* Profile (5 Nov, task 6 / 3D item 1): the player picks a boy or a girl character (renders of the teacher's Meshy models, img/avatar).
   Saved on this device only (its own key; nothing is sent anywhere). The pick shows on the home banner and on the win screen. */
const AVKEY='sanor-town-avatar-v1',AVS={boy:['Boy','นักเรียนชาย'],girl:['Girl','นักเรียนหญิง']};
const avGet=()=>{try{const v=localStorage.getItem(AVKEY);return AVS[v]?v:''}catch(e){return ''}};
const avSet=v=>{try{localStorage.setItem(AVKEY,v)}catch(e){}};
/* moving pictures from the teacher's rigged Meshy models (5 Nov): wave on the home banner and in Profile, cheer on the win screen;
   a still picture when the device asks for reduced motion */
const avStill=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const avPic=(k,clip)=>'img/avatar/'+k+(avStill()||!clip?'.png':'-'+clip+'.webp');
function profileSheet(){
 mrSheet('Profile',(x)=>{const btns=[];
  const pick=v=>{avSet(v);btns.forEach(b=>{const on=b.dataset.av===v;b.setAttribute('aria-pressed',String(on));b.querySelector('img').src=avPic(b.dataset.av,on?'wave':'')});if(DREW)render()};
  const cur=avGet();
  return [el('div',{class:'row'},el('h2',{},'Profile⁣โปรไฟล์'),x),
   el('h3',{},'Choose your character⁣เลือกตัวละครของคุณ'),
   el('ul',{class:'pfpick'},Object.keys(AVS).map(k=>{const b=el('button',{type:'button','data-av':k,'aria-pressed':String(cur===k),onclick:()=>pick(k)},
     el('img',{src:avPic(k,cur===k?'wave':''),alt:'',width:'136',height:'384',decoding:'async'}),el('b',{},AVS[k][0]),el('small',{},AVS[k][1]),el('span',{class:'pfon'},'✓ Selected · เลือกแล้ว'));
    btns.push(b);return el('li',{},b)})),
   el('p',{class:'mrnote'},'Your character shows on the home page and when you finish a place. It is saved on this device only.⁣ตัวละครจะแสดงที่หน้าแรกและตอนทำสถานที่สำเร็จ บันทึกไว้ในเครื่องนี้เท่านั้น')]})}
function rewardsSheet(){const r=rwRead(),xp=rwXP(r);
 mrSheet('Rewards',(x)=>[
  el('div',{class:'row'},el('h2',{},'Rewards⁣รางวัล'),x),
  el('div',{class:'mrxp','aria-label':'Total XP: '+xp},el('b',{},String(xp)),el('span',{},'XP',el('br'),el('small',{},'คะแนนประสบการณ์'))),
  el('p',{class:'mrnote'},'XP shows the activities you finished. It is not a test score or a speaking grade.⁣XP บอกว่าทำกิจกรรมจบไปแล้วเท่าไร ไม่ใช่คะแนนสอบ และไม่ใช่การวัดทักษะการพูด'),
  el('h3',{},'Badges⁣เหรียญรางวัล'),
  el('ul',{class:'mrbadges'},RW_BADGES.map(b=>{const on=!!r.badges[b.id],li=el('li',{class:on?'on':'','aria-label':b.en+(on?', earned':', locked. '+b.need[0])});
   const art=el('span',{'aria-hidden':'true'});art.innerHTML=RW_ART;li.append(art,el('b',{},b.en),el('small',{},b.th),el('small',{},on?'Earned · ได้รับแล้ว':'🔒 '+b.need[0]+' · '+b.need[1]));return li})),
  el('h3',{},'Coming later⁣เร็ว ๆ นี้'),
  el('ul',{class:'mrfut'},[['Levels','เลเวล'],['Coins','เหรียญสะสม'],['Leaderboard','ตารางอันดับ']].map(([e,t])=>el('li',{},el('span',{},el('b',{},e),el('small',{},t)),el('span',{class:'mrtag'},'Not available · ยังไม่เปิด')))),
  el('p',{class:'mrnote'},'Saved only on this phone. Clearing the browser data also removes rewards.⁣บันทึกไว้ในโทรศัพท์เครื่องนี้เท่านั้น ถ้าล้างข้อมูลเบราว์เซอร์ รางวัลจะหายไปด้วย')])}

/* ---------- the 3D place ---------- */
let TOWN=null;
/* camera zoom: 1 = normal view, smaller = closer, bigger = farther. Kept while the app is open. */
const ZMIN=.55,ZMAX=1.45;let ZOOM=1;
/* look-around (scenes with orbit:true): camera turns 360 degrees around the player; EYEV = eye-level view behind the shoulder */
let EYEV=false;
/* ---------- pictures on objects (decals): flat textured panels, e.g. the school sign and emblem ----------
   A scene may list decals:[{x,y,z,w,h,ry, src:'img/file.png'} or {..., cw,ch, draw(g,W,H)}].
   ry = turn around the up axis (0 = faces the camera side, +z). Pictures from src load from this website. */
const DEC_VS='attribute vec3 aPos;attribute vec2 aUV;uniform mat4 uVP;varying vec2 vUV;varying float vFog;void main(){vUV=aUV;gl_Position=uVP*vec4(aPos,1.0);vFog=clamp((gl_Position.w-20.0)/24.0,0.0,0.85);}';
const DEC_FS='precision mediump float;uniform sampler2D uT;varying vec2 vUV;varying float vFog;void main(){vec4 c=texture2D(uT,vUV);if(c.a<0.06)discard;gl_FragColor=vec4(mix(c.rgb*0.97,vec3(0.74,0.87,0.96),vFog),c.a);}';
function mkDecals(gl,list){
 const sh=(t,src)=>{const s=gl.createShader(t);gl.shaderSource(s,src);gl.compileShader(s);return s};
 const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,DEC_VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,DEC_FS));gl.linkProgram(pr);
 if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){console.warn('town decals off');return null}
 const AP=gl.getAttribLocation(pr,'aPos'),AU=gl.getAttribLocation(pr,'aUV'),VPl=gl.getUniformLocation(pr,'uVP'),Tl=gl.getUniformLocation(pr,'uT');
 const up=(tex,img)=>{try{gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false)}catch(e){}};
 const items=list.map(d=>{const c=Math.cos(d.ry||0),s=Math.sin(d.ry||0),hw=d.w/2,hh=d.h/2,rx=c*hw,rz=-s*hw;
  const v=(a,b,u,t)=>[d.x+a*rx,d.y+b*hh,d.z+a*rz,u,t];
  const q=[v(-1,-1,0,0),v(1,-1,1,0),v(1,1,1,1),v(-1,-1,0,0),v(1,1,1,1),v(-1,1,0,1)].flat();
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(q),gl.STATIC_DRAW);
  const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
  [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]].forEach(([k,val])=>gl.texParameteri(gl.TEXTURE_2D,k,val));
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));
  const it={b,tex,ready:false};
  if(d.src){const im=new Image();im.onload=()=>{up(tex,im);it.ready=true};im.src=d.src+(d.src.includes('?')?'':'?v='+BUILD)}
  else if(d.draw){const cv=document.createElement('canvas');cv.width=d.cw||512;cv.height=d.ch||256;
   const paint=()=>{const g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);d.draw(g,cv.width,cv.height);up(tex,cv);it.ready=true};
   paint();try{if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('700 48px Anuphan'),document.fonts.load('600 48px Anuphan')]).then(paint).catch(()=>{})}catch(e){}}
  return it});
 return {n:items.length,ready:()=>items.filter(i=>i.ready).length,draw(VP){
  gl.useProgram(pr);gl.uniformMatrix4fv(VPl,false,VP);gl.uniform1i(Tl,0);gl.activeTexture(gl.TEXTURE0);
  gl.enable(gl.BLEND);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1,-2);
  for(const it of items){if(!it.ready)continue;gl.bindBuffer(gl.ARRAY_BUFFER,it.b);gl.enableVertexAttribArray(AP);gl.vertexAttribPointer(AP,3,gl.FLOAT,false,20,0);
   gl.enableVertexAttribArray(AU);gl.vertexAttribPointer(AU,2,gl.FLOAT,false,20,12);gl.bindTexture(gl.TEXTURE_2D,it.tex);gl.drawArrays(gl.TRIANGLES,0,6)}
  gl.disableVertexAttribArray(AU);gl.disable(gl.POLYGON_OFFSET_FILL);gl.disable(gl.BLEND)}}}

function playPlace(sc,onExit,bl){
 if(TOWN)return;
 const cv=el('canvas',{class:'tcv','aria-label':'3D scene of '+sc.name,role:'img'});
 let gl=null;try{gl=cv.getContext('webgl',{antialias:true,alpha:false,powerPreference:'low-power'})||cv.getContext('experimental-webgl')}catch(e){}
 const root=el('div',{class:'town',role:'dialog','aria-label':sc.name});
 const close=skip=>{if(!TOWN)return;cancelAnimationFrame(TOWN.raf);window.removeEventListener('keydown',TOWN.kd);window.removeEventListener('keyup',TOWN.ku);window.removeEventListener('resize',TOWN.rs);
  try{const x=gl&&gl.getExtension('WEBGL_lose_context');if(x)x.loseContext()}catch(e){}
  stopSay();root.remove();document.body.classList.remove('tlock');TOWN=null;if(skip!==true&&onExit)onExit()};
 const back=el('button',{class:'tback',type:'button',onclick:close},bl||'← Map⁣แผนที่');
 if(!gl){root.append(el('div',{class:'tfail card stack'},el('h2',{},'3D is not available on this phone'),el('p',{},'ขออภัย โทรศัพท์เครื่องนี้แสดงภาพ 3 มิติไม่ได้ ลองเปิดด้วย Chrome หรือเครื่องอื่นครับ'),back));
  document.body.append(root);document.body.classList.add('tlock');TOWN={raf:0,kd:()=>{},ku:()=>{},rs:()=>{},fail:true,close};return}
 const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
 const mkProg=(v,f)=>{const q=gl.createProgram();gl.attachShader(q,sh(gl.VERTEX_SHADER,v));gl.attachShader(q,sh(gl.FRAGMENT_SHADER,f));gl.linkProgram(q);return q};
 const VS0='attribute vec3 aPos;attribute vec3 aNor;attribute vec3 aCol;uniform mat4 uVP;uniform mat4 uM;uniform vec3 uTint;varying vec3 vCol;varying float vFog;void main(){vec4 w=uM*vec4(aPos,1.0);vec3 n=normalize((uM*vec4(aNor,0.0)).xyz);float d=max(dot(n,normalize(vec3(-0.45,0.85,0.35))),0.0);vCol=aCol*uTint*(0.58+0.52*d);gl_Position=uVP*w;vFog=clamp((gl_Position.w-20.0)/24.0,0.0,0.85);}',FS0='precision mediump float;varying vec3 vCol;varying float vFog;uniform float uAlpha;void main(){vec3 f=vec3(0.62,0.82,0.95);gl_FragColor=vec4(mix(vCol,f,vFog),uAlpha);}';
 let FX=sc.fx!==false;/* light-and-shadow look is on for every scene; set fx:false on a scene to keep the plain look */let pr=mkProg(FX?TFX_VS:VS0,FX?TFX_FS:FS0);
 if(FX&&!gl.getProgramParameter(pr,gl.LINK_STATUS)){FX=false;pr=mkProg(VS0,FS0);console.warn('town fx shader failed, using the plain look')}
 gl.useProgram(pr);
 const U={VP:gl.getUniformLocation(pr,'uVP'),M:gl.getUniformLocation(pr,'uM'),tint:gl.getUniformLocation(pr,'uTint'),alpha:gl.getUniformLocation(pr,'uAlpha')};
 const AP=gl.getAttribLocation(pr,'aPos'),AN=gl.getAttribLocation(pr,'aNor'),AC=gl.getAttribLocation(pr,'aCol');
 const mkb=data=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);return {b,n:data.length/9}};
 const bind=m=>{gl.bindBuffer(gl.ARRAY_BUFFER,m.b);[[AP,0],[AN,3],[AC,6]].forEach(([l,o])=>{gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,3,gl.FLOAT,false,36,o*4)})};
 try{vcWarm('T_'+sc.id)}catch(e){}
 const W=sc.build(),OB=W.ob,BD=sc.bounds;
 const world=mkb(W.a);
 let DEC=null;if(sc.decals)try{DEC=mkDecals(gl,sc.decals)}catch(e){DEC=null}
 const cube=(()=>{const a=[];tBox(a,0,0,0,1,1,1,[1,1,1]);return mkb(new Float32Array(a))})();
 const disc=(()=>{const a=[];tDisc(a,.55);return mkb(new Float32Array(a))})();
 let sky=null;if(FX){try{const sp=mkProg(TFX_SKY_VS,TFX_SKY_FS);if(gl.getProgramParameter(sp,gl.LINK_STATUS)){const sb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);sky={sp,sb,loc:gl.getAttribLocation(sp,'p')}}}catch(e){}}
 gl.enable(gl.DEPTH_TEST);gl.clearColor(TSKY[0],TSKY[1],TSKY[2],1);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 const P={x:sc.spawn[0],z:sc.spawn[1],ry:sc.spawn[2],walk:0,t:0};
 const SH=sc.shop||null,FREE=!!(SH&&sc.free);/* CS-3: shop scene (canteen); Free Shopping = no budget, no stars, nothing saved */
 const sv=FREE?{}:(SAVE.done[sc.id]||{});
 const npcs=sc.npcs.map(n=>Object.assign({},n,{cry:n.ry,done:!!sv[n.id],t:Math.random()*6}));
 const cam={x:P.x,z:P.z};
 const jv={x:0,y:0},kv={x:0,y:0},keys={};
 let dlg=null,near=null,last=performance.now(),hintT=7,won=false;
 /* choice scenes: runPick = the food seller bought from in this run (set only when that purchase is finished) */
 const CH=sc.choice,inG=n=>!!(CH&&CH.group.includes(n.id)),reqN=nTotal(sc);
 let runPick=null,replaying=false;if(CH){const gd=npcs.filter(n=>inG(n)&&n.done),sp=SAVE.pick&&SAVE.pick[sc.id];runPick=gd.some(n=>n.id===sp)?sp:(gd[0]?gd[0].id:null)}
 /* CS-3 payments of this run: Guided = saved (only paid ones), Free and replays = this visit only. Old saves get the old purchase (legacy) */
 let TX=[];if(SH&&!FREE){const st=SAVE.shop&&SAVE.shop[sc.id];if(st&&Array.isArray(st.tx))TX=JSON.parse(JSON.stringify(st.tx));
  npcs.forEach(n=>{const lg=SH.legacy[n.id];if(lg&&n.done&&(!inG(n)||n.id===runPick)&&!TX.some(t=>t.shop===n.id)){const p=SHOPI[lg].p;TX.push({id:'legacy-'+n.id,shop:n.id,items:[{id:lg,q:1}],total:p,method:'cash',given:p,change:0,fin:true,legacy:true})}});
  const mt=TX.find(t=>inG({id:t.shop}));if(mt)runPick=mt.shop}
 const saveTx=()=>{if(!SH||FREE||replaying)return;SAVE.shop=SAVE.shop||{};SAVE.shop[sc.id]={tx:TX};persist()};
 const runDone=()=>CH?(npcs.some(n=>inG(n)&&n.done)?1:0)+npcs.filter(n=>!inG(n)&&n.done).length:npcs.filter(n=>n.done).length;
 const tvar=t=>{let r=(t.by&&runPick&&t.by[runPick])?Object.assign({},t,t.by[runPick]):t;if(t.dyn&&dlg&&dlg.ctx)r=Object.assign({},r,t.dyn(dlg.ctx),{dynd:true});return r};
 const wal=CH?el('div',{class:'twal','aria-live':'polite'}):null;
 const paintWal=()=>{if(!wal)return;if(SH){const sp=shTot(TX.flatMap(t=>t.items));if(FREE){wal.textContent='\u{1F9FE} '+sp+' ฿';wal.setAttribute('aria-label','Spent: '+sp+' baht · ใช้ไป '+sp+' บาท')}
   else{const lf=SH.budget-sp;wal.textContent='\u{1F4B0} '+lf+' ฿';wal.setAttribute('aria-label','Money left: '+lf+' baht · เหลือ '+lf+' บาท')}return}let spent=runPick?CH.price[runPick]:0;npcs.forEach(n=>{if(!inG(n)&&n.done&&CH.price[n.id])spent+=CH.price[n.id]});
  const left=CH.budget-spent;wal.textContent='\u{1F4B0} '+left+' ฿';wal.setAttribute('aria-label','Money left: '+left+' baht · เหลือ '+left+' บาท')};
 const gate=n=>{if(!CH)return null;if(SH&&FREE)return n.id==='bow'&&!TX.some(t=>t.fin)?SH.msg.freebow:null;
  if(inG(n)&&runPick&&n.id!==runPick)return CH.msg.other;
  const need=CH.need[n.id];if(need&&need.some(k=>k==='meal'?(SH?!npcs.some(x=>inG(x)&&x.done):!runPick):!npcs.some(x=>x.id===k&&x.done)))return CH.msg[n.id];
  if(SH&&SH.legacy[n.id]){if(n.done)return SH.msg.paid;const lf=SH.budget-shTot(TX.flatMap(t=>t.items)),mn=Math.min(...Object.values(SHOPI).filter(m=>m.shop===n.id&&m.p!=null).map(m=>m.p));
   if(!TX.some(t=>t.shop===n.id)&&lf-(inG(n)?SH.keep:0)<mn)return SH.msg.nomoney}return null};
 const stars=el('span',{class:'tstars','aria-live':'polite',hidden:!!sc.hub||FREE});
 const misB=sc.mission?el('button',{class:'tmisb',type:'button','aria-label':'Mission','title':'Mission · ภารกิจ'},'\u{1F4CB}'):null;
 const talk=el('button',{class:'ttalk',type:'button',hidden:true,onclick:()=>openDlg(near)},'Talk');
 const knob=el('div',{class:'tknob'});
 const joy=el('div',{class:'tjoy','aria-label':'Move: drag the circle'},knob);
 const hint=el('div',{class:'thint'},sc.hub?'Walk to a green sign to enter a room.⁣เดินไปที่ป้ายสีเขียวเพื่อเข้าห้อง':'Walk to a person with a yellow !⁣เดินไปหาคนที่มีเครื่องหมาย ! สีเหลือง',sc.orbit?el('div',{},'Drag the screen to look around. \u{1F440} = eye-level view⁣ลากนิ้วบนจอเพื่อหมุนมองรอบตัว กดปุ่ม \u{1F440} เพื่อมองระดับสายตา'):null);
 const panel=el('div',{class:'tpanel',hidden:true,role:'region','aria-label':'Conversation'});
 const win=el('div',{class:'twin',hidden:true});
 const warp=el('button',{class:'tplaces',type:'button',onclick:()=>placesSheet(s=>{if(s.id===sc.id)return;close(true);goPlace(s,onExit,bl)})},'Go to another place\u2063ไปสถานที่อื่น');
 const zIn=el('button',{type:'button','aria-label':'Zoom in','title':'Zoom in'},'+'),zOut=el('button',{type:'button','aria-label':'Zoom out','title':'Zoom out'},'−');
 const setZ=z=>{ZOOM=Math.min(ZMAX,Math.max(ZMIN,z));zIn.disabled=ZOOM<=ZMIN+.001;zOut.disabled=ZOOM>=ZMAX-.001};setZ(ZOOM);
 zIn.addEventListener('click',()=>setZ(ZOOM-.15));zOut.addEventListener('click',()=>setZ(ZOOM+.15));
 const zoomBox=el('div',{class:'tzoom'},zIn,zOut);
 let YAW=0,YAWT=0;const ORB=!!sc.orbit;
 const turn=a=>{YAWT+=a};
 const eyeB=el('button',{type:'button',class:'tsm','aria-label':'Eye-level view','title':'Eye-level view'},'\u{1F440}');
 const setEye=v=>{EYEV=!!v;eyeB.classList.toggle('on',EYEV);eyeB.setAttribute('aria-pressed',EYEV?'true':'false')};
 if(ORB){const rL=el('button',{type:'button',class:'tsm','aria-label':'Turn left','title':'Turn left'},'\u21BA'),rR=el('button',{type:'button',class:'tsm','aria-label':'Turn right','title':'Turn right'},'\u21BB');
  rL.addEventListener('click',()=>turn(Math.PI/4));rR.addEventListener('click',()=>turn(-Math.PI/4));eyeB.addEventListener('click',()=>setEye(!EYEV));setEye(EYEV);
  zoomBox.prepend(rL,rR);zoomBox.append(eyeB)}
 const pts=new Map();let pinch0=0,zoom0=1;const pd=()=>{const [a,b]=[...pts.values()];return Math.hypot(a.x-b.x,a.y-b.y)};
 cv.addEventListener('pointerdown',e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});try{cv.setPointerCapture(e.pointerId)}catch(_){}if(pts.size===2){pinch0=pd();zoom0=ZOOM}});
 cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const pv=pts.get(e.pointerId);if(ORB&&pts.size===1){const a=-(e.clientX-pv.x)*.009;YAWT+=a;YAW+=a}pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===2&&pinch0>10)setZ(zoom0*pinch0/Math.max(10,pd()))});
 ['pointerup','pointercancel','pointerleave'].forEach(n=>cv.addEventListener(n,e=>{pts.delete(e.pointerId);if(pts.size<2)pinch0=0}));
 cv.addEventListener('wheel',e=>{e.preventDefault();setZ(ZOOM*(e.deltaY>0?1.08:1/1.08))},{passive:false});
 root.append(cv,warp,el('div',{class:'ttop'},back,el('div',{class:'ttitle'},el('b',{},'Sanor Town · '+sc.name),el('span',{class:'tbadge'},FREE?'Free Shopping':'Prototype')),misB,stars,wal),hint,joy,zoomBox,talk,panel,win);
 document.body.append(root);document.body.classList.add('tlock');
 const upStars=()=>{stars.textContent='★ '+runDone()+' / '+reqN;paintWal()};upStars();
 /* mission card (scene.mission): the situation and the mission, shown when the place opens; each task ticks when that person is done */
 const M=sc.mission;let mis=null;
 const misList=()=>el('ul',{class:'tmlist'},npcs.filter(n=>!inG(n)||n.id===CH.group[0]).map(n=>{const t=(M.tasks&&M.tasks[n.id])||[n.name,''],
   g=inG(n),dn=g?npcs.some(x=>inG(x)&&x.done):n.done,who=g?npcs.filter(inG).map(x=>x.name).join(' / '):n.name;
  return el('li',{class:dn?'on':''},el('span',{class:'tmck','aria-hidden':'true'},dn?'✓':''),el('span',{class:'tmtx'},el('b',{},t[0]),el('small',{},t[1])),el('span',{class:'tmwho'},who))}));
 const hideMis=()=>{if(!mis)return;mis.remove();mis=null;if(!dlg&&!won){hint.hidden=false;hintT=7}if(CH&&!runPick&&!won)toast(CH.msg.start[0]+' · '+CH.msg.start[1])};
 /* the first person with a picture greets the player (still head picture when the device asks for reduced motion) */
 const welcomer=()=>{const n=npcs.find(x=>/^npc\//.test(npcPic(x)))||npcs.find(x=>npcPic(x));if(!n)return null;const p=npcPic(n),k=p.split('/')[1].replace('-head','');
  const src=avStill()?'img/'+p+'.png':(p.startsWith('npc/')?'img/npc/'+k+'-wave.webp':'img/avatar/'+k+'-wave.webp');
  return el('div',{class:'tmwel'},el('img',{class:avStill()?'still':'',src,alt:'',width:'44',height:'104',decoding:'async'}),
   el('p',{class:'tmbub'},'Welcome! · ยินดีต้อนรับ',el('small',{},n.name)))};
 const showMis=()=>{if(!M||mis||dlg)return;hint.hidden=true;const all=runDone()>=reqN;
  mis=el('div',{class:'tmis',role:'dialog','aria-label':'Mission'},el('div',{class:'tmc',style:'--c:'+sc.color},
   el('div',{class:'tmL'},welcomer(),el('p',{class:'tmk'},'Mission · ภารกิจ'),el('h2',{},sc.name),
   el('div',{class:'tmsit'},el('p',{class:'tml'},'Situation · สถานการณ์'),el('p',{class:'tmen'},M.sit[0]),el('p',{class:'tmth'},M.sit[1])),
   el('div',{class:'tmgoal'},el('p',{class:'tml'},'Your mission · ภารกิจของคุณ'),el('p',{class:'tmen'},M.goal[0]),el('p',{class:'tmth'},M.goal[1]))),
   el('div',{class:'tmR'},misList(),
   el('div',{class:'tmbtns'},sc.prep?el('button',{class:'btn cta tmgo',type:'button',onclick:showPrep},'Practise phrases first ▶⁣ฝึกประโยคก่อน'):null,
   el('button',{class:sc.prep?'btn ghost tmskip':'btn cta tmgo',type:'button',onclick:hideMis},sc.prep?'Skip ▶⁣ข้ามไปเริ่มเลย':(all?'Play again ▶⁣เล่นอีกครั้ง':'Start ▶⁣เริ่มภารกิจ'))))));
  root.append(mis);setTimeout(()=>{const b=mis&&mis.querySelector('.tmgo');if(b)b.focus({preventScroll:true});if(mis)mis.scrollTop=0},60)};/* open at the top: the welcome and the situation are read first */
 /* step 2 Prepare & Practice (scene.prep = [[English, Thai], ...] from the right answers): listen and say, then a quick 4-question match. No score, no stars. */
 const prepCard=(...kids)=>{if(!mis)return;mis.replaceChildren(el('div',{class:'tmc tprep',style:'--c:'+sc.color},...kids));setTimeout(()=>{const b=mis&&mis.querySelector('.tmgo');if(b)b.focus()},60)};
 function showPrep(){
  prepCard(el('div',{class:'tmL'},el('p',{class:'tmk'},'Phrases · ฝึกประโยค'),el('h2',{},'Listen and say · ฟังแล้วพูดตาม'),
    el('p',{class:'tmth'},'Tap \u{1F50A} and say each phrase out loud.⁣กด \u{1F50A} แล้วพูดตามทีละประโยคให้ออกเสียง')),
   el('div',{class:'tmR'},el('ul',{class:'tplist'},sc.prep.map(([en,th])=>el('li',{},el('button',{class:'tpsay',type:'button','aria-label':'Listen: '+en,onclick:()=>say(en,.85)},'\u{1F50A}'),el('span',{},el('b',{},en),el('small',{},th))))),
    el('button',{class:'btn cta tmgo',type:'button',onclick:()=>prepQuiz(0,shuffle(sc.prep).slice(0,4))},'Next: match the meaning ▶⁣ต่อไป: จับคู่ความหมาย')))}
 function prepQuiz(k,qs){
  if(k>=qs.length){prepCard(el('div',{class:'tmL'},el('p',{class:'tmk'},'Phrases · ฝึกประโยค'),el('h2',{},'Ready! ✓ พร้อมแล้ว'),
    el('p',{class:'tmth'},'Now go and talk to people. Use these phrases!⁣ไปคุยกับทุกคนได้เลย ใช้ประโยคที่ฝึกมานะ')),
    el('div',{class:'tmR'},el('button',{class:'btn cta tmgo',type:'button',onclick:hideMis},'Start ▶⁣เริ่มภารกิจ')));return}
  const [en,th]=qs[k],others=shuffle(sc.prep.filter(p=>p[0]!==en)).slice(0,2).map(p=>p[0]),opts=shuffle([en,...others]);
  const fb=el('p',{class:'tfb','aria-live':'polite'});
  const bs=opts.map(o=>{const b=el('button',{class:'topt',type:'button'},o);b.addEventListener('click',()=>{
   if(o===en){bs.forEach(x=>x.disabled=true);b.classList.add('good');fb.className='tfb good';fb.textContent='Great! ✓';say(en,.85);setTimeout(()=>prepQuiz(k+1,qs),900)}
   else{b.disabled=true;b.classList.add('bad');fb.className='tfb bad';fb.textContent='Not quite. Try again. · ยังไม่ใช่ ลองใหม่'}});return b});
  prepCard(el('div',{class:'tmL'},el('p',{class:'tmk'},'Match the meaning '+(k+1)+' / '+qs.length+' · จับคู่ความหมาย'),
    el('p',{class:'tml'},'Which English phrase means … · ประโยคไหนแปลว่า'),el('div',{class:'tmgoal'},el('p',{class:'tmen tpq'},th))),
   el('div',{class:'tmR'},el('div',{class:'topts'},bs),fb))}
 if(misB)misB.addEventListener('click',showMis);
 if(M)showMis();
 if(FREE)setTimeout(()=>toast('Free Shopping: buy anything you like. No stars. Nothing is saved. · ซื้ออิสระ ไม่มีดาว ไม่บันทึก'),300);

 const jset=e=>{const r=joy.getBoundingClientRect(),R=r.width/2-6;let dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);const l=Math.hypot(dx,dy);if(l>R){dx*=R/l;dy*=R/l}
  jv.x=dx/R;jv.y=dy/R;knob.style.transform='translate('+dx+'px,'+dy+'px)'};
 const jend=()=>{jv.x=0;jv.y=0;knob.style.transform='translate(0,0)'};
 let jid=null;
 joy.addEventListener('pointerdown',e=>{jid=e.pointerId;try{joy.setPointerCapture(jid)}catch(_){}jset(e);e.preventDefault()});
 joy.addEventListener('pointermove',e=>{if(e.pointerId===jid)jset(e)});
 ['pointerup','pointercancel','lostpointercapture'].forEach(n=>joy.addEventListener(n,e=>{if(e.pointerId===jid){jid=null;jend()}}));
 const kd=e=>{if(e.key==='Escape'){if(dlg)closeDlg();else close();return}
  if((e.key==='Enter'||e.key==='e'||e.key==='E')&&near&&!dlg){openDlg(near);e.preventDefault();return}
  const k=e.key.toLowerCase();if(ORB&&(k==='q'||k==='r')){turn(k==='q'?Math.PI/4:-Math.PI/4);e.preventDefault();return}if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)){keys[k]=true;e.preventDefault()}};
 const ku=e=>{delete keys[e.key.toLowerCase()]};
 window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);
 const rs=()=>{const d=Math.min(window.devicePixelRatio||1,1.75);cv.width=Math.round(window.innerWidth*d);cv.height=Math.round(window.innerHeight*d)};
 window.addEventListener('resize',rs);rs();
 function closeDlg(){dlg=null;panel.hidden=true;stopSay()}
 function openDlg(n){if(!n||dlg)return;const gm=gate(n);if(gm){toast(gm[0]+' · '+gm[1]);return}if(mis){mis.remove();mis=null}dlg={n,i:0};
  if(SH){const op=TX.find(t=>t.shop===n.id&&!t.fin);if(op)dlg={n,i:3,ctx:op};/* paid but not finished (e.g. refresh): carry on after the payment */else if(n.id==='bow')dlg.ctx=bowCtx()}
  talk.hidden=true;hint.hidden=true;showTurn()}
 /* this visit only: answers right on the first try, and the turns that were missed (for "Practise missed") */
 const stat={first:0,total:0},miss=[];const RSES=RLOG.start(sc);let rRound=0;
 /* one turn of a conversation: label, button text, onFirst(ok) after the first choice, onNext() after the right answer */
 function turnUI(n,i,label,nextLabel,onFirst,onNext){
  const tn=tvar(n.turns[i]);let tried=false,att=0;const t0=performance.now(),src=dlg&&dlg.prac?'retry_practice':'main_dialogue';
  const opts=shuffle(tn.o.map((t,k)=>({t,k})));
  const fb=el('p',{class:'tfb','aria-live':'polite'});
  const nextBtn=el('button',{class:'btn tnext',type:'button',hidden:true,onclick:onNext},nextLabel);
  const btns=opts.map(o=>{const b=el('button',{class:'topt',type:'button'},o.t);
   b.addEventListener('click',()=>{
    att++;RLOG.add(RSES,sc,{npcId:n.id,turnId:RLOG.turnId(sc,n,i),source:src,event:'answer',attemptNumber:att,selectedOptionId:['correct','A','B'][o.k],isCorrect:o.k===0,
     responseTimeMs:Math.round(performance.now()-t0),retryRound:src==='retry_practice'?rRound:null,correctText:SH?tn.o[0]:undefined});
    if(!tried){tried=true;onFirst(o.k===0)}
    if(o.k===0){btns.forEach(x=>x.disabled=true);b.classList.add('good');fb.className='tfb good';{const op=tn.ok.split(' | ');if(op.length>1)fb.replaceChildren('Great! ✓ '+op[0],el('br'),op.slice(1).join(' | '));else fb.textContent='Great! ✓ '+tn.ok}nextBtn.hidden=false;nextBtn.focus();
     const ph=tn.o[0];if(!FREE&&!tn.dynd&&!SAVE.phrases.includes(ph)){SAVE.phrases.push(ph);persist()}}
    else{b.disabled=true;b.classList.add('bad');fb.className='tfb bad';const w=tn.why&&tn.why[o.k-1];
     const wp=w?w.split(' | '):[];fb.replaceChildren(el('span',{class:'twhy'},'Not quite. '+(w?'✗ '+wp[0]:'Try again.'),...(wp.length>1?[el('br'),wp.slice(1).join(' | ')]:[])),el('span',{class:'thintl'},'\u{1F4A1} '+tn.hint))}});return b});
  panel.replaceChildren(
   el('div',{class:'tdh'},(p=>p?el('img',{class:'tpic',src:'img/'+p+'.png',alt:'',width:'46',height:'46',decoding:'async'}):null)(npcPic(n)),el('b',{},n.name),el('span',{class:'hint'},' · '+n.role),el('button',{class:'tx',type:'button','aria-label':'Close',onclick:closeDlg},'×')),
   el('div',{class:'tline'},el('p',{class:'ten'},tn.npc),el('p',{class:'tth'},tn.th),tn.img&&TIMG[tn.img]?timg(tn.img):null,el('button',{class:'tsay',type:'button',onclick:()=>say(tn.npc,.9)},'Listen⁣ฟัง')),
   el('p',{class:'hint'},label),
   el('div',{class:'topts'},btns),fb,nextBtn);
  panel.hidden=false}
 function showTurn(){
  const n=dlg.n,i=dlg.i,lastT=i===n.turns.length-1;
  turnUI(n,i,'Choose your answer ('+(i+1)+' of '+n.turns.length+')⁣เลือกคำตอบของคุณ',lastT?'Finish⁣เสร็จสิ้น':'Continue⁣ต่อไป',
   ok=>{stat.total++;if(ok)stat.first++;else if(!miss.some(m=>m.n===n&&m.i===i))miss.push({n,i,ctx:dlg&&dlg.ctx})},
   ()=>{if(lastT&&SH&&dlg.ctx&&dlg.ctx.id){dlg.ctx.fin=true;saveTx()}
    if(lastT&&FREE){closeDlg();upStars();if(n.id==='bow')freeSum();else toast('Thank you! Try another shop or sit with Bow. · ไปร้านอื่นต่อ หรือไปนั่งกับ Bow');return}
    if(!lastT&&SH){const at=n.turns[i].after;if(at==='menu')return shopMenu(n);if(at==='pay')return shopPay(n)}
    if(lastT){if(inG(n)&&!runPick){runPick=n.id;if(!replaying)(SAVE.pick=SAVE.pick||{})[sc.id]=n.id}n.done=true;(SAVE.done[sc.id]=SAVE.done[sc.id]||{})[n.id]=1;persist();upStars();closeDlg();if(!won&&runDone()>=reqN){won=true;if(replaying){(SAVE.pick=SAVE.pick||{})[sc.id]=runPick;if(SH){SAVE.shop=SAVE.shop||{};SAVE.shop[sc.id]={tx:TX}}persist();replaying=false}showWin();rwWin(sc)}}
    else{dlg.i++;showTurn()}})}
 /* practise only the missed turns; a turn missed again comes back in the next round */
 function startPractice(){
  let round=miss.slice(),again=[],k=0;rRound=1;win.hidden=true;talk.hidden=true;
  const step=()=>{
   if(k>=round.length){if(again.length){round=again;again=[];k=0;rRound++;toast('Once more: '+round.length+'⁣ฝึกอีกรอบ '+round.length+' ข้อ')}else{closeDlg();miss.length=0;pracDone();return}}
   const it=round[k];dlg={n:it.n,i:it.i,prac:true,ctx:it.ctx};
   turnUI(it.n,it.i,'Practise missed ('+(k+1)+' of '+round.length+')⁣ฝึกซ้ำข้อที่พลาด','Continue⁣ต่อไป',ok=>{if(!ok)again.push(it)},()=>{k++;step()})};
  step()}
 const winBtns=()=>el('div',{class:'row'},el('button',{class:'btn',type:'button',onclick:close},'Back to map⁣กลับแผนที่'),
    el('button',{class:'btn ghost',type:'button',onclick:()=>{win.hidden=true}},'Stay here⁣อยู่ต่อ'));
 function pracDone(){win.hidden=false;win.replaceChildren(el('div',{class:'card stack tw'},avGet()?el('img',{class:'twav',src:avPic(avGet(),'cheer'),alt:'',width:'70',height:'150'}):null,el('h2',{},'Great! You practised them all.⁣เก่งมาก! ฝึกครบแล้ว'),
   el('p',{class:'tbig'},'\u{1F44F}'),winBtns()))}
 function showWin(){win.hidden=false;const nm=miss.length;if(HUB[sc.id]&&!FREE&&stat.total)hubFin(sc.id,'talk',{f:stat.first,n:stat.total});
  RLOG.add(RSES,sc,{source:'main_dialogue',event:'scene_complete',firstCorrect:stat.first,firstTotal:stat.total});
  const av=avGet();
  win.replaceChildren(el('div',{class:'card stack tw'},av?el('img',{class:'twav',src:avPic(av,'cheer'),alt:'',width:'70',height:'150'}):null,el('h2',{},'You finished '+sc.name+'!⁣คุณทำ'+sc.th+'สำเร็จแล้ว!'),
   el('p',{class:'tbig'},Array(reqN).fill('★').join(' ')),el('p',{},'You talked to '+reqN+' people in English. Great job!⁣คุณคุยภาษาอังกฤษกับคน '+reqN+' คนแล้ว เก่งมาก!'),
   SH?(sp=>el('p',{class:'tscore'},'Great job! You spent '+sp+' baht and have '+(SH.budget-sp)+' baht left.\u2063เยี่ยมมาก ใช้เงิน '+sp+' บาท เหลือ '+(SH.budget-sp)+' บาท'))(shTot(TX.flatMap(t=>t.items))):CH?el('p',{class:'tscore'},CH.msg.done[0]+'\u2063'+CH.msg.done[1]):null,
   stat.total?el('p',{class:'tscore'},nm?'Right on the first try: '+stat.first+' / '+stat.total+'⁣ตอบถูกในครั้งแรก '+stat.first+' / '+stat.total+' ข้อ':'All right on the first try! \u{1F389}⁣ตอบถูกทุกข้อในครั้งแรก!'):null,
   stat.total?el('p',{class:'hint'},'This counts your answer choices. It is not a speaking grade.⁣ผลนี้มาจากการเลือกคำตอบ ไม่ใช่คะแนนทักษะการพูด'):null,
   nm?el('button',{class:'btn cta tprac',type:'button',onclick:startPractice},'Practise missed ('+nm+')⁣ฝึกซ้ำข้อที่พลาด ('+nm+' ข้อ)'):null,
   sc.real?realBox(sc):null,
   CH?el('button',{class:'btn ghost',type:'button',onclick:replayRun},CH.msg.again[0]+'\u2063'+CH.msg.again[1]):null,
   CH?el('p',{class:'hint'},'Your new mission progress will be saved when you finish.\u2063ความคืบหน้าของภารกิจรอบใหม่จะถูกบันทึกเมื่อทำภารกิจสำเร็จ'):null,
   winBtns()))}
 /* choice scenes: play the lunch again (new choice, money back to 50). Saved stars of every scene stay as they are. */
 function replayRun(){npcs.forEach(n=>{n.done=false});runPick=null;replaying=true;TX=[];won=false;stat.first=0;stat.total=0;miss.length=0;win.hidden=true;upStars();showMis()}
 /* ===== CS-3 shop: the menu (cart) and the pay screen open inside the conversation panel. Nothing here is saved until Confirm. ===== */
 const shHead=n=>el('div',{class:'tdh'},(p=>p?el('img',{class:'tpic',src:'img/'+p+'.png',alt:'',width:'46',height:'46',decoding:'async'}):null)(npcPic(n)),el('b',{},n.name),el('span',{class:'hint'},' · '+n.role),el('button',{class:'tx',type:'button','aria-label':'Close',onclick:shCancel},'×'));
 function shCancel(){const paid=dlg&&dlg.ctx&&dlg.ctx.id;closeDlg();if(!paid)toast('No money was paid. · ยังไม่มีการจ่ายเงิน')}
 const shSpent=()=>shTot(TX.flatMap(t=>t.items));
 function shopMenu(n){const ids=Object.keys(SHOPI).filter(k=>SHOPI[k].shop===n.id),q={};ids.forEach(k=>{q[k]=0});
  const left=FREE?null:SH.budget-shSpent(),keep=(!FREE&&inG(n))?SH.keep:0;
  const tot=el('b',{class:'shtot'}),aft=el('span',{class:'shaft'}),warn=el('p',{class:'shwarn','aria-live':'polite'});
  const ok=el('button',{class:'btn cta shok',type:'button'},'Order ▶⁣สั่งเลย');
  const rows=ids.map(k=>{const m=SHOPI[k],noP=m.p==null,v=el('span',{class:'shq'},'0');
   const mi=el('button',{type:'button',class:'shst shminus','aria-label':'One less: '+m.en},'−'),pl=el('button',{type:'button',class:'shst shplus','aria-label':'One more: '+m.en},'+');
   mi.addEventListener('click',()=>{if(q[k]>0)q[k]--;paint()});pl.addEventListener('click',()=>{if(!noP&&q[k]<SH.max)q[k]++;paint()});
   return {k,v,mi,pl,li:el('li',{class:'shrow','data-id':k},el('span',{class:'shic','aria-hidden':'true'},m.ic),el('span',{class:'shnm'},el('b',{},m.en),el('small',{},m.th)),
    el('span',{class:'shp'},noP?'Price not confirmed⁣รอยืนยันราคา':m.p+' ฿'),el('span',{class:'shctl'},mi,v,pl))}});
  const items=()=>ids.filter(k=>q[k]).map(id=>({id,q:q[id]}));
  const paint=()=>{const it=items(),t=shTot(it);rows.forEach(r=>{r.v.textContent=q[r.k];r.v.setAttribute('aria-label',q[r.k]+' '+SHOPI[r.k].en);r.mi.disabled=!q[r.k];r.pl.disabled=SHOPI[r.k].p==null||q[r.k]>=SH.max});
   tot.textContent=t+' ฿';const over=!FREE&&t>left-keep;
   aft.textContent=FREE?'':'Money left after: '+(left-t)+' ฿ · เหลือ '+(left-t)+' บาท';
   warn.textContent=!over?'':t>left?"I don't have enough money. I'll choose something cheaper.⁣".replace('⁣',' · ')+'เงินไม่พอ เลือกของที่ถูกกว่า'
    :'Keep at least '+keep+' baht for a drink or a snack. · เก็บเงินไว้ซื้อเครื่องดื่มหรือลูกชิ้นอย่างน้อย '+keep+' บาท';
   ok.disabled=!t||over};
  ok.addEventListener('click',()=>{if(ok.disabled||!dlg)return;const it=items();dlg.ctx={items:it,total:shTot(it)};dlg.i++;showTurn()});
  panel.replaceChildren(shHead(n),el('div',{class:'shmenu'},
   el('div',{class:'tline'},el('p',{class:'ten'},'Here is the menu. Choose what you want.'),el('p',{class:'tth'},'นี่เมนู เลือกสิ่งที่อยากได้ กด + เพื่อเพิ่มจำนวน')),
   FREE?null:el('p',{class:'shwal'},'\u{1F4B0} You have '+left+' baht. · เธอมีเงิน '+left+' บาท'),
   el('ul',{class:'shlist'},rows.map(r=>r.li)),
   el('div',{class:'shfoot'},el('span',{},'Total · รวม ',tot),aft),warn,
   el('div',{class:'row shbtns'},el('button',{class:'btn ghost shno',type:'button',onclick:shCancel},'Nothing, thanks⁣ไม่ซื้อแล้ว'),ok)));
  paint();panel.hidden=false;panel.scrollTop=0;setTimeout(()=>{const b=panel.querySelector('.shplus');if(b)b.focus({preventScroll:true})},60)}
 /* the SAMPLE QR: a made-up pattern drawn here (not a real code: it cannot be scanned to pay) */
 const shQR=()=>{let s='',r=7;const f=(x,y)=>'<path d="M'+x+' '+y+'h7v7h-7zM'+(x+1)+' '+(y+1)+'v5h5v-5zM'+(x+2)+' '+(y+2)+'h3v3h-3z" fill-rule="evenodd"/>';
  for(let y=0;y<25;y++)for(let x=0;x<25;x++){if((x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16))continue;r=(r*1103515245+12345)&0x7fffffff;if(r%3===0)s+='M'+x+' '+y+'h1v1h-1z'}
  const d=el('div',{class:'shqr',role:'img','aria-label':'Sample QR picture for the game. It cannot be used to pay.'});
  d.innerHTML='<svg viewBox="-1 -1 27 27" width="150" height="150" aria-hidden="true"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/><g fill="#1f2937"><path d="'+s+'"/>'+f(0,0)+f(18,0)+f(0,18)+'</g></svg><span class="shsample">SAMPLE · ตัวอย่าง</span>';return d};
 function shopPay(n){const c=dlg.ctx,t=c.total,left=FREE?null:SH.budget-shSpent();let method=null,given=0;
  const notes=[...new Set([t,20,50,100])].filter(v=>v>=t&&(left==null||v<=left)).sort((a,b)=>a-b);
  const box=el('div',{class:'shbox','aria-live':'polite'}),cf=el('button',{class:'btn cta shcf',type:'button',disabled:true},'Pay ▶⁣จ่ายเงิน');
  const mBtn=(m,label)=>{const b=el('button',{class:'shm',type:'button','data-m':m,'aria-pressed':'false'},label);b.addEventListener('click',()=>{method=m;given=0;
   panel.querySelectorAll('.shm').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));paintBox()});return b};
  const paintBox=()=>{cf.disabled=true;
   if(method==='qr'){box.replaceChildren(shQR(),el('p',{class:'hint'},'This QR is a picture in the game. It does not open the camera or a bank. No real money.⁣QR นี้เป็นภาพในเกม ไม่เปิดกล้อง ไม่เชื่อมธนาคาร ไม่ใช้เงินจริง'));
    cf.replaceChildren('Confirm simulated payment ▶',el('small',{class:'th'},'ยืนยันการจ่ายในเกม '+t+' บาท'));cf.disabled=false;return}
   const chg=el('p',{class:'shchg'},'Choose the money you give. · เลือกเงินที่จะจ่าย');
   box.replaceChildren(el('div',{class:'shnotes'},notes.map(v=>{const b=el('button',{class:'shnote',type:'button','data-v':v,'aria-pressed':'false'},v+' ฿');
    b.addEventListener('click',()=>{given=v;box.querySelectorAll('.shnote').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
     chg.textContent=v===t?'Exact money. No change. · จ่ายพอดี ไม่มีเงินทอน':'Change · เงินทอน: '+v+' − '+t+' = '+(v-t)+' ฿';cf.replaceChildren('Pay '+v+' baht ▶',el('small',{class:'th'},'จ่ายเงิน '+v+' บาท'));cf.disabled=false});return b})),chg);
   cf.replaceChildren('Pay ▶',el('small',{class:'th'},'จ่ายเงิน'))};
  cf.addEventListener('click',()=>{if(cf.disabled||!dlg||dlg.ctx!==c||c.id)return;
   if(!FREE&&TX.some(x=>x.shop===n.id))return;/* one payment per shop in the Guided Mission */
   cf.disabled=true;const tx={id:'tx'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),shop:n.id,items:c.items,total:t,method,given:method==='cash'?given:t,change:method==='cash'?given-t:0,fin:false};
   TX.push(tx);dlg.ctx=tx;if(!FREE&&inG(n))runPick=n.id;saveTx();paintWal();
   RLOG.add(RSES,sc,{source:'main_dialogue',event:'purchase',npcId:n.id,items:tx.items.map(x=>x.id+' x'+x.q).join('; '),total:t,payMethod:method,given:tx.given,change:tx.change,moneyLeft:FREE?undefined:SH.budget-shSpent()});
   toast(method==='qr'?'Payment confirmed in the game. · ยืนยันการจ่ายในเกมแล้ว':'Paid '+tx.given+' baht in the game. · จ่ายเงินในเกมแล้ว');dlg.i++;showTurn()});
  panel.replaceChildren(shHead(n),el('div',{class:'shpay'},
   el('div',{class:'tline'},el('p',{class:'ten'},"That's "+NW(t)+' baht. How would you like to pay?'),el('p',{class:'tth'},'ทั้งหมด '+t+' บาท จะจ่ายแบบไหน')),
   el('p',{class:'shord'},c.items.map(x=>SHOPI[x.id].ic+' '+SHOPI[x.id].en+' × '+x.q).join(' · ')+' = '+t+' ฿'),
   el('div',{class:'row shms'},mBtn('cash','\u{1F4B5} Cash⁣เงินสด (จำลอง)'),mBtn('qr','\u{1F4F1} QR code⁣QR (จำลอง)')),box,
   el('div',{class:'row shbtns'},el('button',{class:'btn ghost shno',type:'button',onclick:shCancel},'Cancel⁣ยกเลิก ไม่จ่าย'),cf)));
  panel.hidden=false;panel.scrollTop=0;setTimeout(()=>{const b=panel.querySelector('.shm');if(b)b.focus({preventScroll:true})},60)}
 /* Bow's lines come from the payments that are finished (this run) */
 const bowCtx=()=>{const fin=TX.filter(t=>t.fin),items=shAll(fin),grand=shTot(items);
  return {items,grand,budget:SH.budget,left:FREE?null:SH.budget-grand,methods:{cash:fin.some(t=>t.method==='cash'),qr:fin.some(t=>t.method==='qr')}}};
 function freeSum(){const fin=TX.filter(t=>t.fin),all=shAll(fin),g=shTot(all);win.hidden=false;
  win.replaceChildren(el('div',{class:'card stack tw'},el('h2',{},'Free Shopping summary⁣สรุปการซื้ออิสระ'),
   el('ul',{class:'shsum'},all.map(x=>el('li',{},SHOPI[x.id].ic+' '+SHOPI[x.id].en+' × '+x.q+' = '+SHOPI[x.id].p*x.q+' ฿'))),
   el('p',{class:'tscore'},'Total '+g+' baht · '+fin.length+' payment'+(fin.length>1?'s':'')+'⁣รวม '+g+' บาท · จ่าย '+fin.length+' ครั้ง'),
   el('p',{class:'hint'},'Practice only: no stars, no XP, nothing is saved.⁣โหมดฝึก ไม่มีดาว ไม่มี XP และไม่บันทึก'),
   el('div',{class:'row'},el('button',{class:'btn cta',type:'button',onclick:()=>{win.hidden=true}},'Keep shopping⁣ซื้อต่อ'),el('button',{class:'btn',type:'button',onclick:close},'Back⁣กลับ'))))}
 const hit=(x,z)=>{if(x<BD[0]||x>BD[1]||z<BD[2]||z>BD[3])return true;const r=.38;
  for(const o of OB)if(x>o[0]-r&&x<o[1]+r&&z>o[2]-r&&z<o[3]+r)return true;
  for(const n of npcs)if(Math.hypot(x-n.x,z-n.z)<.8)return true;return false};
 const shortAng=(a,b)=>{let d=(b-a)%(Math.PI*2);if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;return d};
 function update(dt){
  P.t+=dt;
  kv.x=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0);kv.y=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0);
  let vx=jv.x+kv.x,vy=jv.y+kv.y;const l=Math.hypot(vx,vy);if(l>1){vx/=l;vy/=l}
  if(dlg||!win.hidden){vx=0;vy=0}
  const sp=4.2,mv=Math.hypot(vx,vy);
  YAW+=shortAng(YAW,YAWT)*Math.min(1,dt*8);
  if(mv>.08){const cy=Math.cos(YAW),sy=Math.sin(YAW),wx=vx*cy+vy*sy,wz=-vx*sy+vy*cy;/* joystick up = forward where the camera looks */
   const dx=wx*sp*dt,dz=wz*sp*dt;if(!hit(P.x+dx,P.z))P.x+=dx;if(!hit(P.x,P.z+dz))P.z+=dz;
   const want=Math.atan2(wx,wz);P.ry+=shortAng(P.ry,want)*Math.min(1,dt*12);P.walk+=(1-P.walk)*Math.min(1,dt*10)}
  else P.walk+=(0-P.walk)*Math.min(1,dt*10);
  let best=null,bd=3.2;npcs.forEach(n=>{const d=Math.hypot(P.x-n.x,P.z-n.z);if(d<bd){bd=d;best=n}});
  near=best;
  /* walking links: step into an exit area to go straight to the next place */
  if(sc.exits&&!dlg&&win.hidden&&!TOWN.leaving){for(const e of sc.exits)if(P.x>=e.x0&&P.x<=e.x1&&P.z>=e.z0&&P.z<=e.z1){
   const t=SCENES.find(q=>q.id===e.to);if(!t)break;TOWN.leaving=true;
   setTimeout(()=>{close(true);playPlace(Object.assign({},t,{spawn:e.at||t.spawn}),onExit,bl)},60);break}}
  const showTalk=!!near&&!dlg&&win.hidden;
  if(showTalk&&talk.hidden)talk.hidden=false;if(!showTalk&&!talk.hidden)talk.hidden=true;
  if(near)talk.textContent='Talk to '+near.name;
  npcs.forEach(n=>{n.t+=dt;if(FX){const tw=(n===near&&!dlg&&win.hidden&&!n.done)?1:0,tk=(dlg&&dlg.n===n)?1:0;n.w=(n.w||0)+(tw-(n.w||0))*Math.min(1,dt*7);n.tk=(n.tk||0)+(tk-(n.tk||0))*Math.min(1,dt*7)}const face=(n===near||(dlg&&dlg.n===n))?Math.atan2(P.x-n.x,P.z-n.z):n.cry;n.ry+=shortAng(n.ry,face)*Math.min(1,dt*6)});
  cam.x+=(P.x-cam.x)*Math.min(1,dt*5);cam.z+=(P.z-cam.z)*Math.min(1,dt*5);
  if(hintT>0){hintT-=dt;if(hintT<=0)hint.hidden=true}
 }
 function frame(){
  const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;
  if(cv.width===0||cv.height===0){TOWN.raf=requestAnimationFrame(frame);return}
  update(dt);
  gl.viewport(0,0,cv.width,cv.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const asp=cv.width/cv.height,fov=(asp<1?58:46)*Math.PI/180;
  const eh=asp<1?10:8.5,ed=asp<1?9.5:8.5,cy=Math.cos(YAW),sy=Math.sin(YAW);let eye,tgt;
  if(ORB&&EYEV){const d=(asp<1?4.4:3.2)*ZOOM,sh=asp<1?.55:.75,rx=cy*sh,rz=-sy*sh;/* over the right shoulder */tgt=[cam.x-sy*4+rx,1.35,cam.z-cy*4+rz];eye=[cam.x+sy*d+rx,1.85+.35*ZOOM,cam.z+cy*d+rz]}
  else{const d=(ed+.8)*ZOOM;tgt=[cam.x-sy*.8,.4,cam.z-cy*.8];eye=[tgt[0]+sy*d,.4+(eh-.4)*ZOOM,tgt[2]+cy*d]}
  const VP=M4.mul(M4.persp(fov,asp,.5,80),M4.look(eye,tgt));
  if(sky){gl.disable(gl.DEPTH_TEST);gl.useProgram(sky.sp);gl.bindBuffer(gl.ARRAY_BUFFER,sky.sb);gl.enableVertexAttribArray(sky.loc);gl.vertexAttribPointer(sky.loc,2,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,3);gl.disableVertexAttribArray(sky.loc);gl.enable(gl.DEPTH_TEST)}
  gl.useProgram(pr);gl.uniformMatrix4fv(U.VP,false,VP);gl.uniform1f(U.alpha,1);
  gl.uniformMatrix4fv(U.M,false,M4.id());gl.uniform3fv(U.tint,[1,1,1]);
  bind(world);gl.drawArrays(gl.TRIANGLES,0,world.n);
  if(DEC){DEC.draw(VP);gl.useProgram(pr)}
  bind(cube);
  townPerson(gl,U,{x:P.x,z:P.z,ry:P.ry,y:Math.abs(Math.sin(P.t*9))*.06*P.walk,walk:P.walk,t:P.t,fx:FX,shirt:[.15,.7,.72],pants:[.15,.2,.45],hair:[.1,.07,.07]});
  npcs.forEach(n=>{townPerson(gl,U,{x:n.x,z:n.z,ry:n.ry,y:Math.sin(n.t*2.2)*.025,walk:0,t:n.t,fx:FX,wave:n.w,talk:n.tk,shirt:n.shirt,pants:n.pants,hair:n.hair,acc:n.acc});
   const bob=Math.sin(P.t*3+n.x)*.12;
   if(!n.done&&!(runPick&&inG(n)&&n.id!==runPick)){const m=M4.mul(M4.T(n.x,3.05+bob,n.z),M4.Ry(P.t*1.6));
    gl.uniformMatrix4fv(U.M,false,M4.mul(m,M4.mul(M4.T(0,.18,0),M4.S(.2,.5,.2))));gl.uniform3fv(U.tint,[1,.85,.1]);gl.drawArrays(gl.TRIANGLES,0,36);
    gl.uniformMatrix4fv(U.M,false,M4.mul(m,M4.mul(M4.T(0,-.2,0),M4.S(.2,.2,.2))));gl.drawArrays(gl.TRIANGLES,0,36)}
   else{const m=M4.mul(M4.mul(M4.T(n.x,3.05+bob,n.z),M4.Ry(P.t*2)),M4.mul(M4.Rx(.6),M4.S(.42,.42,.42)));
    gl.uniformMatrix4fv(U.M,false,m);gl.uniform3fv(U.tint,[1,.72,.1]);gl.drawArrays(gl.TRIANGLES,0,36)}});
  gl.enable(gl.BLEND);gl.depthMask(false);bind(disc);gl.uniform3fv(U.tint,[0,0,0]);gl.uniform1f(U.alpha,.28);
  [[P.x,P.z],...npcs.map(n=>[n.x,n.z])].forEach(([x,z])=>{gl.uniformMatrix4fv(U.M,false,M4.mul(M4.T(x,.03,z),M4.S(1,1,1)));gl.drawArrays(gl.TRIANGLES,0,disc.n)});
  gl.depthMask(true);gl.disable(gl.BLEND);gl.uniform1f(U.alpha,1);
  TOWN.raf=requestAnimationFrame(frame);
 }
 TOWN={raf:0,kd,ku,rs,close,P,npcs,sc,OB,DEC,setZoom:setZ,get zoom(){return ZOOM},get yaw(){return YAW},turn,setEye,get eye(){return EYEV},get dlg(){return dlg},cur:()=>dlg&&dlg.n.turns[dlg.i]?tvar(dlg.n.turns[dlg.i]).o:null,get tx(){return TX},free:FREE,get near(){return near},openDlg,jv,keys,stars:()=>stars.textContent,win,panel,talk};
 TOWN.raf=requestAnimationFrame(frame);
}

/* ---------- town map (2D menu, 3 tabs) ---------- */
const TABS=[['phibun','Our school','โรงเรียนของเรา'],['daily','Daily life','ชีวิตประจำวัน'],['school','School','โรงเรียน'],['places','Travel & places','เดินทางและสถานที่'],['ubon','Ubon','อุบลของเรา']];
let TAB='phibun';
const ROAD='#c9ced8';
const SUBS={ubon:[['nature','Nature','ธรรมชาติ'],['culture','Culture & festivals','วัฒนธรรมและประเพณี'],['food','Food','อาหาร']]};
function mapView(){
 const all=[...SCENES.filter(s=>s.group===TAB),...LOCKED.filter(s=>s.group===TAB).map(s=>Object.assign({locked:true,color:'#8a94a6'},s))];
 if(all.some(s=>STIME[s.id]))all.sort((x,y)=>(STIME[x.id]||'99').localeCompare(STIME[y.id]||'99'));
 if(TAB==='phibun')return gridBlock(all);
 const subs=SUBS[TAB];
 if(!subs)return mapBlock(all);
 const box=el('div',{class:'tsubs'});
 subs.forEach(([id,en,th])=>{const l=all.filter(s=>s.sub===id);if(!l.length)return;box.append(el('h3',{class:'tsub'},en+' ('+l.length+')','\u2063'+th),mapBlock(l))});
 return box}
/* home v2: simple line icons (one per line/tab) and small helpers */
const SXI={
 phibun:'<path d="M12 3l9 5v2H3V8z"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 20h18"/><path d="M12 3V1"/>',
 daily:'<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/>',
 school:'<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/>',
 places:'<path d="M10.5 13.5L4 11l1.5-1.5 7 1L17 6a2.1 2.1 0 0 1 3 3l-4.5 4.5 1 7L15 22l-2.5-6.5L9 19v2.5L7.5 23 6 19l-4-1.5L3.5 16H6z"/>',
 ubon:'<path d="M12 2l1.5 4h-3z"/><path d="M8 10c0-2.5 2-4 4-4s4 1.5 4 4"/><path d="M6 14c0-2 1-4 3-4h6c2 0 3 2 3 4"/><path d="M4 14h16v3H4zM6 17v4M18 17v4M3 21h18M10 21v-3h4v3"/>',
 passport:'<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="11" r="3.5"/><path d="M8.5 11h7M12 7.5c-1.2 1-1.2 6 0 7M12 7.5c1.2 1 1.2 6 0 7M9 17.5h6"/>',
 chev:'<path d="M9 5l7 7-7 7"/>'};
const sxIcon=(k,cls)=>{const sp=el('span',{class:'sxi'+(cls?' '+cls:''),'aria-hidden':'true'});sp.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+SXI[k]+'</svg>';return sp};
/* three small faces for the "people you talked to" bar (made up, not real students) */
const sxFaces=()=>el('span',{class:'sxfaces','aria-hidden':'true'},[1,2,3].map(k=>el('img',{src:'img/bar/face'+k+'.png',alt:'',width:'48',height:'48',decoding:'async'})));/* the teacher's People bar design (31 Oct) */
/* ===== home screen: a transit map of the town. Each tab is a "line", each place a "station". ===== */
const LINEC={phibun:'#C8102E',daily:'#F07A1A',school:'#2F5BFF',places:'#0E9F8E',ubon:'#7B3FE4'};
const LINED={phibun:['A school day at Phibun, from 7:30 until after school.','หนึ่งวันที่โรงเรียนพิบูลฯ ตั้งแต่ 7 โมงครึ่งจนเลิกเรียน'],
 daily:['Shops, food and everyday errands.','ร้านค้า อาหาร และเรื่องในชีวิตประจำวัน'],school:['Classes and school life.','ห้องเรียนและชีวิตในโรงเรียน'],
 places:['Getting around and asking the way.','การเดินทางและการถามทาง'],ubon:['Nature, festivals and food of Ubon.','ธรรมชาติ ประเพณี และอาหารของอุบลฯ']};
const STIME={gate1:'07:30',flagpole:'08:00',council:'08:30',class85:'09:00',englab:'09:30',scilab:'10:00',music:'10:30',art:'11:00',canteen:'12:00',itlib:'12:15',sbank:'12:30',coop:'13:00',football:'13:30',nurse:'14:00',guidance:'14:30',hall14:'15:00',pmstudio:'15:30',garden:'16:00',pool:'16:15',gym:'16:30',lostfound:'17:00',market2:'17:30',teacherroom:'07:45',academic:'12:45'};/* the teacher's Our school line picture (3 Nov) */
let DREW=false;
/* ===== research data (ST-CNT-001 V1.1, decision D). OFF until the teacher sets a participant code with
   ?pc=CODE in the address (after consent). Stored in its own key, never touches SAVE (progress).
   Each answer click is one event: source main_dialogue or retry_practice, attempt 1 = first attempt.
   The first session of a scene after the code is set is the baseline; later plays are kept separately.
   Hints are not logged (they appear automatically after a wrong answer). ===== */
const RKEY='sanor-town-research-v1',RCV='ST-CNT-001 V1.1',RMIS={gate1:'M01',canteen:'M09'},RTP={gate1:'G1',canteen:'C'};
/* 10 Nov (owner decision, RG-01 follow-up): the School Canteen Guided Mission (CR01 build) is logged too. Free Shopping and the Hub
   practice modes are never logged. canteen adds correctText (its lines are built from the purchase) and one purchase event per shop. */
const RCVS={gate1:RCV,canteen:'ST-CNT-025-CR01 CS-3'};
let RS={pc:null,base:{},ev:[]};
try{const r=JSON.parse(localStorage.getItem(RKEY)||'null');if(r&&Array.isArray(r.ev))RS=r}catch(e){}
const rSave=()=>{try{localStorage.setItem(RKEY,JSON.stringify(RS))}catch(e){}};
try{const q=new URLSearchParams(location.search).get('pc');
 if(q==='off'){RS.pc=null;rSave()}else if(q&&/^[A-Za-z0-9-]{2,24}$/.test(q)&&RS.pc!==q){RS.pc=q;rSave()}}catch(e){}
const RLOG={
 on:sc=>!!(RS.pc&&RMIS[sc.id]&&!sc.free),
 turnId(sc,n,i){let k=0;for(const x of sc.npcs){if(x===n||x.id===n.id)break;k+=x.turns.length}return (RTP[sc.id]||sc.id)+'-'+String(k+i+1).padStart(2,'0')},
 start(sc){if(!RLOG.on(sc))return null;const key=RS.pc+'|'+sc.id,sid=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const baseline=!RS.base[key];if(baseline){RS.base[key]=sid;rSave()}return {sid,baseline}},
 add(ses,sc,o){if(!ses||!RLOG.on(sc))return;if(RS.ev.length>=20000)return;
  RS.ev.push(Object.assign({participantCode:RS.pc,sessionId:ses.sid,baseline:ses.baseline,missionId:RMIS[sc.id],sceneId:sc.id,
   ts:new Date().toISOString(),contentVersion:RCVS[sc.id]||RCV,build:BUILD},o));rSave()},
 csv(){const cols=['participantCode','sessionId','baseline','missionId','sceneId','npcId','turnId','source','event','attemptNumber','selectedOptionId','isCorrect','responseTimeMs','retryRound','firstCorrect','firstTotal','ts','contentVersion','build','correctText','items','total','payMethod','given','change','moneyLeft'];
  const q=v=>v==null?'':(/[",\n]/.test(String(v))?'"'+String(v).replace(/"/g,'""')+'"':String(v));
  return [cols.join(',')].concat(RS.ev.map(e=>cols.map(c=>q(e[c])).join(','))).join('\n')},
 download(){const b=new Blob(['﻿'+RLOG.csv()],{type:'text/csv'}),a=document.createElement('a');a.href=URL.createObjectURL(b);
  a.download='sanor-town-research-'+(RS.pc||'none')+'.csv';document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}};
const shortName=s=>s.name.replace(/ · Phibun School$/,'');
const LCOL={"gate1": "#1E7BFF", "flagpole": "#F0365A", "council": "#8B3CF0", "class85": "#14A86B", "englab": "#F5B400", "scilab": "#FF6A1A", "music": "#1E7BFF", "art": "#14A86B", "canteen": "#FF6A1A", "itlib": "#1E7BFF", "sbank": "#F5B400", "coop": "#8B3CF0", "football": "#14A86B", "nurse": "#F0365A", "guidance": "#8B3CF0", "hall14": "#8B3CF0", "pmstudio": "#1E7BFF", "garden": "#FF6A1A", "gym": "#1E7BFF", "lostfound": "#14A86B", "market2": "#FF6A1A", "teacherroom": "#8B3CF0", "academic": "#F0365A", "pool": "#12B5C9"};/* station colours on the Our school line, from the teacher's picture */
/* the teacher's station pictures (img/stations) and an icon for each station of the Our school line */
const STICON={gate1:'<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6a3 3 0 0 1 6 0v6"/><path d="M3 21h18"/>',
 flagpole:'<path d="M3 14a9 9 0 0 1 18 0"/><path d="M3 14h18M5 14v6M19 14v6M9 14v6M15 14v6M3 20h18M12 5V2"/>',
 class85:'<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20l2-4M16 20l-2-4M7 12l3-3 2 2 4-4"/>',
 canteen:'<path d="M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M9 3v6"/><path d="M17 21V3c-2 1-3 4-3 7h3"/>',
 itlib:'<path d="M2 5c3-1 6-1 10 1 4-2 7-2 10-1v14c-3-1-6-1-10 1-4-2-7-2-10-1z"/><path d="M12 6v14"/>',
 sbank:'<path d="M3 10l9-6 9 6z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
 football:'<circle cx="12" cy="12" r="9"/><path d="M12 7l4 3-1.5 5h-5L8 10z"/><path d="M12 7V3M16 10l4-1M14.5 15l2.5 4M9.5 15L7 19M8 10L4 9"/>',
 nurse:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
 hall14:'<circle cx="12" cy="8" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M6 20c0-3.5 2.5-6 6-6s6 2.5 6 6M1 19c0-2.5 1.5-4.5 4-4.5M23 19c0-2.5-1.5-4.5-4-4.5"/>',
 market2:'<path d="M3 9l2-5h14l2 5"/><path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3"/><path d="M5 12v9h14v-9M10 21v-5h4v5"/>',
 council:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5"/>',
 englab:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 13l2-6 2 6M8.7 11h2.6M14 7v6h2a1.5 1.5 0 0 0 0-3h-2"/>',
 scilab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/>',
 music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 art:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.5-1.5-1.5-1.5-3S14 14 15.5 14H18a3 3 0 0 0 3-3c0-4.5-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
 coop:'<path d="M3 9l2-5h14l2 5"/><path d="M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3"/><path d="M5 12v9h14v-9M10 21v-5h4v5"/>',
 guidance:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20c0-3.3 2.7-6 6-6 1.6 0 3 .6 4 1.6 1-1 2.4-1.6 4-1.6 3.3 0 6 2.7 6 6"/>',
 pmstudio:'<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3z"/>',
 garden:'<path d="M5 21c0-9 6-15 15-16-1 9-7 15-15 16z"/><path d="M5 21l8-8"/>',
 gym:'<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>',
 teacherroom:'<circle cx="8" cy="7" r="3"/><path d="M3 20v-3a5 5 0 0 1 10 0v3"/><rect x="14" y="5" width="7" height="6" rx="1"/><path d="M13 13l3-2"/>',
 academic:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 14h7M9 17h5"/>',
 lostfound:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/><path d="M10 13a2 2 0 1 1 3 1.7c-.6.4-1 .8-1 1.5M12 18.5v.1"/>',
 pool:'<path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M8 12.5h8"/>'};
/* Our school line as the teacher's 22-card grid (3 Nov): order and names from the picture, no times */
const GORDER=['gate1','flagpole','council','class85','englab','scilab','music','art','canteen','itlib','sbank','coop','football','nurse','guidance','hall14','pmstudio','garden','pool','gym','lostfound','market2','teacherroom','academic'];
const GNAME={gate1:['School Gate 1','ประตู 1 โรงเรียนพิบูลมังสาหาร'],flagpole:['Multipurpose Dome','โดมอเนกประสงค์'],council:['Student Council Room','ห้องสภานักเรียน'],class85:['Classroom','ห้องเรียน อาคาร 3'],
 englab:['English Language Lab','ห้องปฏิบัติการภาษาอังกฤษ'],scilab:['Science Lab','ห้องปฏิบัติการวิทยาศาสตร์'],music:['Music Room','ห้องดนตรี'],art:['Art Room','ห้องศิลปะ'],canteen:['School Canteen','โรงอาหาร 60 ปี'],
 itlib:['IT Library','ห้องสมุด IT'],sbank:['School Bank','ธนาคารโรงเรียน'],coop:['P.M. School Welfare Shop','ร้านค้าสวัสดิการโรงเรียน'],football:['Football Field','สนามฟุตบอล'],nurse:["School Nurse's Office",'ห้องพยาบาล'],
 guidance:['Guidance Room','ห้องแนะแนว'],hall14:['Ratrangsan Hall','หอประชุมราษฎร์รังสรรค์'],pmstudio:['PM Studio','ห้องสตูดิโอสื่อสร้างสรรค์'],garden:['School Botanical Garden','สวนพฤกษศาสตร์โรงเรียน'],
 pool:['School Swimming Pool','สระว่ายน้ำโรงเรียน'],gym:['School Gym','โรงยิม'],lostfound:['Lost and Found','จุดรับแจ้งของหาย'],market2:['Street Market','ตลาดหน้าโรงเรียน (หลังเลิกเรียน)'],teacherroom:["Teachers' Room",'ห้องพักครู'],academic:['Academic Affairs Room','ห้องบริหารงานวิชาการ']};
function gridBlock(list){
 const by=id=>list.find(s=>s.id===id),ord=GORDER.map(by).filter(Boolean).concat(list.filter(s=>!GORDER.includes(s.id)));
 const wrap=el('ol',{class:'sxgrid','aria-label':'Places'});
 ord.forEach((s,k)=>{const d=doneCount(s.id),n=nTotal(s),locked=!!s.locked,full=!locked&&d>=n,nm=GNAME[s.id]||[shortName(s),s.th],c=LCOL[s.id]||s.color;
  const ic=el('span',{class:'sgic','aria-hidden':'true'});ic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(STICON[s.id]||SXI.phibun)+'</svg>';
  const b=el('button',{type:'button','data-scene':s.id,class:'sgc'+(locked?' lock':'')+(full?' full':''),style:'--c:'+c,'aria-label':(k+1)+'. '+nm[0]+', '+nm[1]+(locked?', coming soon':', '+d+' of '+n+' done')},
   el('span',{class:'sgimg'},el('img',{src:'img/stations3/'+s.id+'.jpg',alt:'',width:'268',height:'91',loading:'lazy',decoding:'async'}),full?el('span',{class:'sgok','aria-hidden':'true'},'✓'):null),
   el('span',{class:'sgrow'},ic,el('span',{class:'sgtx'},el('b',{},nm[0]),el('small',{},nm[1]))),
   el('span',{class:'sgst','aria-hidden':'true'},locked?el('span',{class:'sgsoon'},'Soon',el('span',{class:'th'},' · เร็ว ๆ นี้')):Array.from({length:n},(_,i)=>el('i',{class:i<d?'on':''},'★'))));
  b.addEventListener('click',()=>{if(locked)toast(nm[0]+' is coming soon. · เร็ว ๆ นี้');else goPlace(s,render)});
  wrap.append(el('li',{},b))});
 /* the teacher's picture (4 Nov): stations 22-24 fill the last row; under them a full-width banner (students with the app, map and quest) */
 wrap.append(el('li',{class:'sgbanner','aria-hidden':'true'},el('img',{src:'img/grid/deco-banner.jpg',alt:'',width:'937',height:'298',loading:'lazy',decoding:'async'})));
 return wrap}
function mapBlock(list){
 const timed=list.some(s=>STIME[s.id]);
 const cols=list.map(s=>LCOL[s.id]||s.color),grad=cols.length>1?'linear-gradient(180deg,'+cols.join(',')+')':cols[0];
 const rich=list.every(s=>STICON[s.id]);
 const wrap=el(timed?'ol':'ul',{class:'mapgrid sxline'+(timed?' timed':'')+(rich?' rich':'')+(DREW?'':' draw'),'aria-label':'Places',style:'--grad:'+grad});
 list.forEach(s=>{const d=doneCount(s.id),n=nTotal(s),locked=!!s.locked,full=d>=n;
  const stars=el('span',{class:'sxstars','aria-hidden':'true'},Array.from({length:n},(_,k)=>el('i',{class:k<d?'on':''},'★')));
  const b=el('button',{type:'button','data-scene':s.id,class:'pl'+(locked?' lock':'')+(full?' full':''),style:'--c:'+(LCOL[s.id]||s.color),'aria-label':s.name+', '+s.th+(locked?', coming soon':', '+d+' of '+n+' done')},
   STIME[s.id]?el('span',{class:'sxtime'},STIME[s.id]):null,
   el('span',{class:'sxdot','aria-hidden':'true'},full?'✓':''),
   el('span',{class:'sxcard'},
    rich?el('img',{class:'sxth',src:'img/stations3/'+s.id+'.jpg',alt:'',width:'268',height:'91',loading:'lazy',decoding:'async'}):null,
    rich?(()=>{const ic=el('span',{class:'sxic','aria-hidden':'true'});ic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+STICON[s.id]+'</svg>';return ic})():null,
    el('span',{class:'sxtx'},el('span',{class:'pen'},shortName(s)),el('span',{class:'pth'},rich?s.th.replace(/ ?โรงเรียนพิบูลมังสาหาร$/,''):s.th),el('span',{class:'pst'},locked?'Soon':stars)),
    sxIcon('chev','sxgo')));
  b.addEventListener('click',()=>{if(locked)toast(s.name+' is coming soon. · เร็ว ๆ นี้');else goPlace(s,render)});
  wrap.append(el('li',{},b))});
 return wrap}
function tabBar(){return el('div',{class:'ttabs sxtabs',role:'tablist','aria-label':'Lines'},TABS.map(([id,en,th])=>{const on=TAB===id,l=SCENES.filter(s=>s.group===id),n=l.length,dn=l.filter(s=>doneCount(s.id)>=nTotal(s)).length;
  return el('button',{class:'ttab'+(on?' on':''),type:'button',role:'tab','aria-selected':on?'true':'false',style:'--l:'+LINEC[id],onclick:()=>{TAB=id;render();const pn=HOST&&HOST.querySelector('.sxpanel');if(pn)pn.scrollIntoView({behavior:'smooth',block:'start'})}},
   sxIcon(id,'sxti'),el('span',{class:'sxtn'},en,el('small',{class:'th'},th)),el('span',{class:'sxct'},dn+'/'+n))}))}
function placesSheet(pick){
 const body=el('div',{class:'sheet card stack',role:'dialog','aria-label':'Places'},
  el('div',{class:'row'},el('h2',{},'Go to\u2063ไปที่'),el('button',{class:'tx',type:'button','aria-label':'Close',onclick:()=>bg.remove()},'×')),
  PLAYS().map(s=>el('button',{class:'tplace',type:'button',style:'--c:'+s.color,onclick:()=>{bg.remove();pick(s)}},el('b',{},s.name),el('span',{},s.th),el('span',{class:'tpn'},'★ '+doneCount(s.id)+' / '+nTotal(s)))));
 const bg=el('div',{class:'sheetbg',onclick:e=>{if(e.target===bg)bg.remove()}},body);document.body.append(bg)}
/* ---------- review phrases (uses only what is saved on this phone; nothing is sent) ---------- */
function reviewRounds(){
 const idx={};SCENES.forEach(s=>s.npcs.forEach(n=>n.turns.forEach(t=>{idx[t.o[0]]=t})));
 const saved=SAVE.phrases.slice(),canSay='speechSynthesis' in window;
 const usable=saved.filter(p=>idx[p]||canSay);
 return shuffle(usable).slice(0,8).map(p=>{
  const t=idx[p];
  if(t&&(!canSay||Math.random()<.5))return{kind:'reply',ans:p,t,opts:shuffle(t.o.slice())};
  const pool=shuffle(saved.filter(x=>x!==p).concat(Object.keys(idx).filter(x=>x!==p&&!saved.includes(x))));
  const d=[];for(const x of pool){if(!d.includes(x))d.push(x);if(d.length===2)break}
  return{kind:'listen',ans:p,t,opts:shuffle([p,...d])}})}
function reviewSheet(){
 let rounds=reviewRounds();
 if(!rounds.length){toast('Talk to more people first.');return}
 let i=0,score=0;
 const body=el('div',{class:'sheet card stack',role:'dialog','aria-label':'Review phrases'});
 const bg=el('div',{class:'sheetbg',onclick:e=>{if(e.target===bg)closeIt()}},body);
 const closeIt=()=>{stopSay();bg.remove()};
 const head=()=>el('div',{class:'row'},el('h2',{},'Review phrases⁣ทบทวนวลี'),el('button',{class:'tx',type:'button','aria-label':'Close',onclick:closeIt},'×'));
 function show(){
  if(i>=rounds.length){
   const n=rounds.length,pct=score/n;
   body.replaceChildren(head(),el('p',{class:'tbig'},Array(Math.max(1,Math.round(pct*3))).fill('★').join(' ')),
    el('h3',{},'Score: '+score+' / '+n+'⁣คะแนน '+score+' จาก '+n),
    el('p',{class:'hint'},pct>=.8?'Great job! You remember them well.⁣เก่งมาก จำได้ดี':pct>=.5?'Good! Try again to remember more.⁣ดี ลองอีกครั้งเพื่อจำให้ได้มากขึ้น':'Keep practising. Talk to people again in town.⁣ฝึกต่อได้ ลองไปคุยกับคนในเมืองอีกครั้ง'),
    el('p',{class:'hint'},'This counts your answer choices. It is not a speaking grade.⁣ผลนี้มาจากการเลือกคำตอบ ไม่ใช่คะแนนทักษะการพูด'),
    el('button',{class:'btn',type:'button',onclick:()=>{rounds=reviewRounds();i=0;score=0;show()}},'Play again⁣เล่นอีกครั้ง'),
    el('button',{class:'btn ghost',type:'button',onclick:closeIt},'Close⁣ปิด'));return}
  const r=rounds[i];let missed=false;
  const fb=el('p',{class:'tfb','aria-live':'polite'});
  const next=el('button',{class:'btn tnext',type:'button',hidden:true,onclick:()=>{i++;show()}},i===rounds.length-1?'See score⁣ดูคะแนน':'Next⁣ข้อต่อไป');
  const btns=r.opts.map(t=>{const b=el('button',{class:'topt',type:'button'},t);
   b.addEventListener('click',()=>{
    if(t===r.ans){btns.forEach(x=>x.disabled=true);b.classList.add('good');if(!missed)score++;
     fb.className='tfb good';{const op=r.t?r.t.ok.split(' | '):[];fb.replaceChildren('Great! ✓'+(op[0]?' '+op[0]:''),...(op.length>1?[el('br'),op.slice(1).join(' | ')]:[]))}next.hidden=false;next.focus()}
    else{missed=true;b.disabled=true;b.classList.add('bad');fb.className='tfb bad';fb.textContent=r.kind==='listen'?'Not quite. Listen again and try.':'Not quite. Try again. '+r.t.hint}});return b});
  const prompt=r.kind==='listen'
   ?[el('p',{class:'hint'},'Listen and choose what you hear.⁣ฟังแล้วเลือกประโยคที่ได้ยิน'),el('button',{class:'tsay',type:'button',onclick:()=>say(r.ans,.9)},'Listen⁣ฟัง')]
   :[el('p',{class:'hint'},'Choose the best reply.⁣เลือกคำตอบที่เหมาะสม'),el('div',{class:'tline'},el('p',{class:'ten'},r.t.npc),el('p',{class:'tth'},r.t.th),el('button',{class:'tsay',type:'button',onclick:()=>say(r.t.npc,.9)},'Listen⁣ฟัง'))];
  body.replaceChildren(head(),el('p',{class:'hint'},'Question '+(i+1)+' of '+rounds.length+'⁣ข้อที่ '+(i+1)+' จาก '+rounds.length),...prompt,el('div',{class:'topts'},btns),fb,next)}
 show();document.body.append(bg)}
const PLAYS=()=>SCENES.filter(s=>!s.hub);/* hub scenes (corridors) are not stations */
function passportSheet(){
 const total=PLAYS().reduce((x,s)=>x+nTotal(s),0),done=PLAYS().reduce((a,s)=>a+doneCount(s.id),0);
 const body=el('div',{class:'sheet card stack',role:'dialog','aria-label':'Passport'},
  el('div',{class:'row'},el('h2',{},'My Passport⁣สมุดเดินทางของฉัน'),el('button',{class:'tx',type:'button','aria-label':'Close',onclick:()=>sheet.remove()},'×')),
  el('p',{class:'hint'},'People you talked to: '+done+' of '+total+'⁣คนที่คุยแล้ว'),
  el('div',{class:'tstamps'},PLAYS().map(s=>{const d=doneCount(s.id);return el('div',{class:'tstamp'+(d>=nTotal(s)?' on':''),style:'--c:'+s.color},el('b',{},s.name),el('span',{},s.th),el('span',{},d+' / '+nTotal(s)))})),
  SCENES.some(s=>s.real)?el('h3',{},'Real-life missions⁣ภารกิจในชีวิตจริง'):null,
  SCENES.some(s=>s.real)?el('div',{class:'trlist'},SCENES.filter(s=>s.real).map(s=>doneCount(s.id)>=nTotal(s)?el('div',{},el('b',{class:'trname'},s.name),realBox(s))
   :el('p',{class:'trlock'},'\u{1F512} '+s.name+' \u2014 finish this place first\u2063\u0e40\u0e25\u0e48\u0e19\u0e09\u0e32\u0e01\u0e19\u0e35\u0e49\u0e43\u0e2b\u0e49\u0e08\u0e1a\u0e01\u0e48\u0e2d\u0e19'))):null,
  el('h3',{},'Phrases I used⁣ประโยคที่ฉันใช้'),
  SAVE.phrases.length?el('ul',{class:'phr'},SAVE.phrases.map(p=>el('li',{},el('span',{},p),el('button',{class:'tsay',type:'button','aria-label':'Listen',onclick:()=>say(p,.9)},'▶')))):el('p',{class:'hint'},'Nothing yet. Talk to someone in town!⁣ยังไม่มี ลองไปคุยกับคนในเมืองดู'),
  el('button',{class:'btn',type:'button',disabled:SAVE.phrases.length<3,onclick:()=>{sheet.remove();reviewSheet()}},'Review phrases\u2063ทบทวนวลี'),
  RS.pc?el('div',{class:'tres'},el('p',{class:'hint'},'Research code: '+RS.pc+' · '+RS.ev.length+' records\u2063รหัสงานวิจัย · บันทึก '+RS.ev.length+' รายการ'),
   el('button',{class:'btn ghost',type:'button',onclick:RLOG.download},'Export research CSV\u2063ส่งออกข้อมูลวิจัย (CSV)')):null,
  SAVE.phrases.length<3?el('p',{class:'hint'},'Collect 3 phrases to start.\u2063เก็บให้ครบ 3 วลีก่อนจึงจะทบทวนได้'):null,
  el('p',{class:'hint'},'Saved only on this phone. Nothing is sent to anyone.⁣บันทึกไว้ในโทรศัพท์เครื่องนี้เท่านั้น ไม่ส่งให้ใคร'));
 const sheet=el('div',{class:'sheetbg',onclick:e=>{if(e.target===sheet)sheet.remove()}},body);document.body.append(sheet)}
function render(){
 const app=HOST,total=PLAYS().reduce((x,s)=>x+nTotal(s),0),done=PLAYS().reduce((a,s)=>a+doneCount(s.id),0),pd=PLAYS().filter(s=>doneCount(s.id)>=nTotal(s)).length;
 const [en,th]=TAB_EN();const lc=LINEC[TAB]||'#2F5BFF',ld=LINED[TAB]||['',''];
 app.replaceChildren(
  el('header',{class:'sxhero'},
   el('div',{class:'sxban'},
    el('img',{class:'sxbimg',src:'img/banner3-1600.jpg',srcset:'img/banner3-900.jpg 900w, img/banner3-1600.jpg 1600w',sizes:'(min-width:1080px) 1040px, 100vw',width:'1600',height:'583',alt:'Sanor Town: Explore the town and talk in English. เมืองจำลองฝึกพูดภาษาอังกฤษ',fetchpriority:'high'}),
    el('h1',{class:'vh'},'Sanor Town'),
    el('span',{class:'tbadge sxproto'},'Prototype'),
    (()=>{const av=avGet();const ic=el('span',{class:'sxmei','aria-hidden':'true'});ic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#2F5BFF" stroke-width="2" stroke-linecap="round">'+NAVI.profile+'</svg>';
     return el('button',{class:'sxme'+(av?' fig':''),type:'button',onclick:profileSheet,'aria-label':av?'My character: '+AVS[av][0]+'. Change in Profile':'Choose your character in Profile'},
      av?el('img',{src:avPic(av,'wave'),alt:'',width:'48',height:'112',decoding:'async'}):ic,
      el('span',{},av?'Me':'Choose me',el('small',{},av?'ฉัน':'เลือกตัวละคร')))})(),
    HOST&&HOST.inline?null:el('button',{class:'sxback',type:'button',onclick:closeTown},'Home⁣กลับ'),
    /* the teacher's new banner (31 Oct) has no Passport button: Passport opens from the People bar and the bottom menu */),
   el('button',{class:'sxstats',type:'button',onclick:passportSheet,'aria-label':'People you talked to: '+done+' of '+total+'. Open passport'},
    el('span',{class:'sxring',style:'--p:'+(total?Math.round(done/total*100):0)},el('b',{},done),el('small',{},'/ '+total)),
    el('span',{class:'sxst'},el('span',{class:'sxsth'},'People you talked to'),el('span',{class:'sxstl'},sxFaces(),el('small',{class:'th'},'คนที่คุยแล้ว · '+pd+' จาก '+PLAYS().length+' ที่ครบแล้ว'))),
    el('span',{class:'sxpp'},el('img',{src:'img/bar/passport.png',alt:'',width:'48',height:'48',decoding:'async'}),el('span',{},el('b',{},'Passport'),el('small',{},'สมุดเดินทาง'))),
    sxIcon('chev','sxgo2'))),
  el('section',{class:'sxpanel',style:'--l:'+lc,'aria-label':en},
   TAB==='phibun'?lineHead(en,th,ld):el('div',{class:'sxph'},sxIcon(TAB,'sxhi'),el('div',{},el('h2',{},en+' line',el('small',{class:'th'},'สาย'+th)),el('p',{},ld[0],el('small',{class:'th'},ld[1])))),
   mapView()),
  placesGrid(),/* the teacher put Our school first (research); other places in town go to the bottom, above the footer */
  tabBar(),/* the teacher moved the line tabs to the bottom too, above the footer; a tap scrolls up to the line it opens */
  navBar());
 DREW=true}
/* the teacher's place cards (pictures in img/places). A card opens its scene, or a whole line (tab);
   cards with no scene yet say "coming soon". */
const PLACES=[['ourschool','Our School','โรงเรียนของเรา',{tab:'phibun'}],['hospital','Hospital','โรงพยาบาล',{scene:'clinic'}],['district','District Office','ที่ว่าการอำเภอ',{scene:'district'}],
 ['police','Police Station','สถานีตำรวจ',{scene:'police'}],['post','Post Office','ที่ทำการไปรษณีย์',{scene:'post'}],['hotel','Hotel','โรงแรม',{scene:'hotel'}],
 ['market','Market','ตลาด',{scene:'market'}],['seven','7-11','เซเว่น อีเลฟเว่น',{scene:'seven'}],['amazon','Amazon','คาเฟ่ อเมซอน',{scene:'amazon'}],
 ['bigc','BigC','บิ๊กซี',{scene:'bigc'}],['lotus','Lotus','โลตัส',{scene:'lotus'}],['hometown','Our Hometown','บ้านเกิดของเรา',{tab:'ubon'}]];
function placesGrid(){
 const box=el('div',{class:'sxplaces',role:'list'});
 PLACES.forEach(([img,en,th,go])=>{
  let badge='Soon',label=en+', '+th,act=()=>toast(en+' is coming soon. · เร็ว ๆ นี้');
  if(go.scene){const sc=SCENES.find(x=>x.id===go.scene);if(sc){const d=doneCount(sc.id),n=nTotal(sc);badge='★ '+d+'/'+n;label+=', '+d+' of '+n+' done';act=()=>playPlace(sc,render)}}
  else if(go.tab){const l=SCENES.filter(x=>x.group===go.tab),dn=l.filter(x=>doneCount(x.id)>=nTotal(x)).length;badge=dn+'/'+l.length;label+=', '+dn+' of '+l.length+' places done';
   act=()=>{TAB=go.tab;render();const pn=HOST&&HOST.querySelector('.sxpanel');if(pn)pn.scrollIntoView({behavior:'smooth',block:'start'})}}
  box.append(el('div',{role:'listitem'},el('button',{type:'button',class:'sxpc2'+(badge==='Soon'?' soon':''),'aria-label':label,onclick:act},
   el('img',{src:'img/places/'+img+'.jpg',alt:'',width:'288',height:'316',loading:'lazy',decoding:'async'}),el('span',{class:'sxpb'},badge))))});
 return el('section',{class:'sxplwrap','aria-label':'Places in town'},el('h2',{class:'sxplh'},'Places in town',el('small',{class:'th'},'สถานที่ในเมือง')),box)}
/* bottom menu (from the teacher's footer design). Home, Map (list of all places) and Passport work now;
   Missions and Rewards open the ST-SYS-001 MVP sheets (3 Nov); Profile opens the character picker (5 Nov). */
const NAVI={
 home:'<path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="#2F6BFF" stroke="#2F6BFF"/>',
 map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/><circle cx="18" cy="6.5" r="3.2" fill="#E5384F" stroke="#fff" stroke-width="1.4"/>',
 missions:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8 10l1.5 1.5L12 9M8 15l1.5 1.5L12 14M14 10.5h3M14 15.5h3"/>',
 passport:'<rect x="5" y="3" width="14" height="18" rx="2" fill="#2F5BFF" stroke="#1E3FBF"/><circle cx="12" cy="11" r="3.5" stroke="#fff"/><path d="M8.5 11h7M12 7.5c-1.2 1-1.2 6 0 7M12 7.5c1.2 1 1.2 6 0 7M9.5 17.5h5" stroke="#fff"/>',
 rewards:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 14v3M8 21h8M9 21l1-4h4l1 4"/><path d="M12 5.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 7.6l2-.3z" fill="#F5B301" stroke="#F5B301" stroke-width=".8"/>',
 profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'};
function navBar(){
 const it=(k,en,th,act,on)=>{const b=el('button',{type:'button',class:'sxnb'+(on?' on':''),'aria-label':en+' '+th,'aria-current':on?'page':null,onclick:act});
  const ic=el('span',{class:'sxnbi','aria-hidden':'true'});ic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+NAVI[k]+'</svg>';
  b.append(ic,el('span',{class:'sxnbt'},en));return b};
 const soon=(en,th)=>()=>toast(en+' is coming soon. · '+th+' เร็ว ๆ นี้');
 return el('nav',{class:'sxnav','aria-label':'Menu'},
  it('home','Home','หน้าแรก',()=>window.scrollTo({top:0,behavior:'smooth'}),true),
  it('map','Map','แผนที่',()=>placesSheet(s=>goPlace(s,render))),
  it('missions','Missions','ภารกิจ',missionsSheet),
  it('passport','Passport','สมุดเดินทาง',passportSheet),
  it('rewards','Rewards','รางวัล',rewardsSheet),
  it('profile','Profile','โปรไฟล์',profileSheet))}
/* the teacher's header for the Our school line: school icon, big title, text, and the school map picture
   ("Tap a place to explore" and the map button in the picture open the list of places) */
function lineHead(en,th,ld){/* the teacher's Sanor Town · Our School picture (3 Nov, top of the 22-card design) */
 return el('div',{class:'sxlh'},el('h2',{class:'vh'},'Our school line · สาย'+th),
  el('div',{class:'sxlhm'},el('img',{src:'img/lines/ourschool-head.jpg',alt:'Sanor Town Our School: Explore your school, speak English, complete your quest',width:'941',height:'312',decoding:'async'})))}
function TAB_EN(){const t=TABS.find(x=>x[0]===TAB)||TABS[0];return [t[1],t[2]]}
/* the hero art: five transit lines (one per tab colour) crossing, with station dots */
const SXMAP='<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="7">'+
 '<path d="M40 -10 V40 Q40 60 60 60 H210" stroke="#C8102E"/>'+
 '<path d="M90 170 V100 Q90 80 110 80 H210" stroke="#F07A1A"/>'+
 '<path d="M-10 120 H70 Q90 120 100 105 L150 30 Q160 15 180 15 H210" stroke="#2F5BFF"/>'+
 '<path d="M140 170 V125 Q140 105 160 105 H210" stroke="#0E9F8E"/>'+
 '<path d="M120 -10 V20 Q120 40 140 50 L210 85" stroke="#7B3FE4"/></g>'+
 '<g fill="#fff" stroke="#15213B" stroke-width="3"><circle cx="40" cy="30" r="6"/><circle cx="100" cy="60" r="7"/><circle cx="160" cy="60" r="6"/><circle cx="90" cy="120" r="6"/><circle cx="125" cy="67" r="7"/><circle cx="160" cy="105" r="6"/><circle cx="175" cy="80" r="6"/></g>';

function closeTown(){if(TOWN)TOWN.close(true);if(HOST){if(HOST.outer)HOST.outer.remove();HOST=null}document.body.classList.remove('tlock');stopSay()}
function mount(box){if(HOST&&HOST.outer)closeTown();box.inline=true;HOST=box;render()}
function unmount(){if(TOWN)TOWN.close(true);if(HOST&&HOST.inline)HOST=null;document.body.classList.remove('tlock')}
function open(){if(HOST)return;const outer=el('div',{class:'tgame',role:'dialog','aria-label':'Sanor Town'});const inner=el('div',{class:'tin'});outer.append(inner);document.body.append(outer);HOST=inner;HOST.outer=outer;render()}
function openScene(id,bl){
 const sc=SCENES.find(s=>s.id===id);if(!sc||TOWN)return false;
 if(HOST&&HOST.inline)return false;
 if(!HOST){const outer=el('div',{class:'tgame',role:'dialog','aria-label':'Sanor Town'});const inner=el('div',{class:'tin'});outer.append(inner);document.body.append(outer);HOST=inner;HOST.outer=outer}
 playPlace(sc,closeTown,bl);
 if(!TOWN){closeTown();return false}
 return true}
return {open,openScene,mount,unmount,close:closeTown,get g(){return TOWN},SCENES,LOCKED,hubData:id=>{const s=SCENES.find(x=>x.id===id);return s&&hubOK(s)?(HUB[id]||hubAuto(s)):null},shop:SHOPI,rw:{read:rwRead,xp:rwXP,grant:rwGrant,canteen:canteenMission},
 core:{key:CORE_KEY,mission:CORE_M02,status:coreStatus,open:coreOpen,missions:missionsSheet},
 daily:{key:DM_KEY,missions:DAILY_MISSIONS,day:dmDay,today:dmToday,items:dmItems,status:dmStatus,open:dmOpen,preview:DM_PREVIEW,hostOK:dmHostOK}};/* ST-MEX-001 local prototype: read-only handles for the tests *//* CORE-M02 local prototype: read-only handles for the tests */
})();
