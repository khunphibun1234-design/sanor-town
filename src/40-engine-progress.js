/* progress: stored ONLY on this phone (localStorage). Nothing is sent anywhere. */
/* own key for this app. The first time, progress is copied from the Town inside Sanor English World
   (same website, same phone/browser). The old key is only read: never changed or removed. */
const KEY='sanor-town-app-v1',OLD_KEY='sanor-town-v1';
let SAVE={done:{},phrases:[]};
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(SAVE))}catch(e){}};
try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&r.done)SAVE=r;
 else{const o=JSON.parse(localStorage.getItem(OLD_KEY)||'null');if(o&&o.done){SAVE=o;if(!Array.isArray(SAVE.phrases))SAVE.phrases=[]}persist()}}catch(e){}
/* the four market sellers moved from Gate 1 to their own scene "Street market" (market2): move their stars too (once) */
try{const g=SAVE.done.gate1,mv=g?['meatball','pork','drink','fruit'].filter(k=>g[k]):[];
 if(mv.length){const m=SAVE.done.market2=SAVE.done.market2||{};mv.forEach(k=>{m[k]=g[k];delete g[k]});persist()}}catch(e){}
/* a scene with .choice (canteen): the people in choice.group count as ONE place (buy from one of them); old saves that
   talked to everyone still count as done, capped at the total. Other scenes: unchanged. */
const doneCount=id=>{const d=SAVE.done[id]||{},s=SCENES.find(x=>x.id===id),c=s&&s.choice;
 if(!c)return Object.keys(d).length;return (c.group.some(k=>d[k])?1:0)+Object.keys(d).filter(k=>!c.group.includes(k)).length};
const nTotal=s=>s.npcs?s.npcs.length-(s.choice?s.choice.group.length-1:0):4;

/* ===== ST-SYS-001 MVP (3 Nov, owner decisions): Missions + Rewards, School Canteen only, XP + Badges only.
   Rewards live in their OWN key and only READ the game save: SAVE (sanor-town-app-v1), the old key and the
   research key are never written here. One entitlement = one grant key, so replay / refresh / back / a second tab
   cannot add XP twice. Total XP is the sum of the grants (no separate balance). A grant is written only by a live
   Canteen completion (the win in this run), never from old saves: players who finished before see "Completed earlier"
   and get no XP backwards (owner decision 3). No coins, levels, shop or leaderboard. Not a test score. ===== */
const RWKEY='sanor-town-rewards-v1',RW_RULE='v1';
const RW_GRANTS={'story.canteen.firstCompletion.v1':{xp:40,scene:'canteen',badge:'badge.canteen.lunch_master.v1'}};
const RW_BADGES=[{id:'badge.canteen.lunch_master.v1',en:'Lunch Master',th:'เหรียญภารกิจโรงอาหาร',
 need:['Finish all 3 steps at the School Canteen.','ทำภารกิจโรงอาหารให้ครบ 3 ขั้น']}];
const rwRead=()=>{try{const r=JSON.parse(localStorage.getItem(RWKEY)||'null');
 if(r&&r.schemaVersion===1&&r.grants&&typeof r.grants==='object'&&r.badges&&typeof r.badges==='object')return r}catch(e){}
 return {schemaVersion:1,grants:{},badges:{}}};
const rwXP=r=>Object.values(r.grants).reduce((a,g)=>a+(Number.isFinite(g&&g.xp)?g.xp:0),0);
/* grant once: read fresh, stop if the key is already there, write grant + badge in ONE setItem. true only if saved. */
function rwGrant(gid){const G=RW_GRANTS[gid];if(!G)return 'none';const r=rwRead();if(r.grants[gid])return 'had';
 const at=new Date().toISOString();r.grants[gid]={xp:G.xp,at,build:BUILD,rule:RW_RULE};if(G.badge&&!r.badges[G.badge])r.badges[G.badge]={at};
 try{localStorage.setItem(RWKEY,JSON.stringify(r));const c=rwRead();return c.grants[gid]?'new':'fail'}catch(e){return 'fail'}}
/* called from the Canteen win (live run only) */
function rwWin(sc){if(!sc||sc.id!=='canteen')return;const res=rwGrant('story.canteen.firstCompletion.v1');
 if(res==='new')setTimeout(()=>toast('+40 XP · Lunch Master badge! · ได้รับ 40 XP และเหรียญ Lunch Master'),900);
 else if(res==='fail')setTimeout(()=>toast('Reward could not be saved on this phone. · บันทึกรางวัลในเครื่องนี้ไม่ได้'),900)}
/* Canteen mission state from the game save (the engine stays the source of truth): meal, water, Bow */
function canteenMission(){const d=SAVE.done.canteen||{},meal=!!(d.rice||d.noodle),water=!!d.drinks,bow=!!d.bow,n=doneCount('canteen'),
 r=rwRead(),got=!!r.grants['story.canteen.firstCompletion.v1'];
 const state=n>=3?(got?'done':'earlier'):n>0?'progress':'new';return {steps:[meal,water,bow],n:Math.min(n,3),state,got}}
const RW_ART='<svg viewBox="0 0 96 96" aria-hidden="true"><path d="M30 6h14l8 26H38z" fill="#2F6BFF"/><path d="M66 6H52l-8 26h14z" fill="#E5384F"/>'+
 '<circle cx="48" cy="58" r="32" fill="#F5B301"/><circle cx="48" cy="58" r="26" fill="#FFD84D" stroke="#E0A100" stroke-width="2.5"/>'+
 '<path d="M30 58h36a18 13 0 0 1-36 0z" fill="#fff" stroke="#14306E" stroke-width="2.5" stroke-linejoin="round"/>'+
 '<path d="M33 58c3-5 8-7 15-7s12 2 15 7" fill="#16A34A"/><circle cx="42" cy="54" r="2.6" fill="#E5384F"/><circle cx="53" cy="53" r="2.2" fill="#F97316"/>'+
 '<path d="M58 34l-6 18M64 36l-8 17" stroke="#8B5A2B" stroke-width="2.6" stroke-linecap="round"/>'+
 '<path d="M40 44c-2-3 2-5 0-8M48 43c-2-3 2-5 0-8" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" fill="none"/>'+'</svg>';
/* sheets for the new screens: modal, focus moves in, Esc closes, focus goes back to the menu button */
function mrSheet(label,kids){const opener=document.activeElement;
 const close=()=>{sheet.remove();document.removeEventListener('keydown',onk);if(opener&&opener.focus)opener.focus()};
 const onk=e=>{if(e.key==='Escape')close();else if(e.key==='Tab'){const f=[...body.querySelectorAll('button:not([disabled]),[href]')];if(!f.length)return;
  if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus()}}};
 const x=el('button',{class:'tx',type:'button','aria-label':'Close',onclick:()=>close()},'×');
 const body=el('div',{class:'sheet card stack mrs',role:'dialog','aria-modal':'true','aria-label':label},kids(x,close));
 const sheet=el('div',{class:'sheetbg',onclick:e=>{if(e.target===sheet)close()}},body);document.body.append(sheet);document.addEventListener('keydown',onk);x.focus();return close}
