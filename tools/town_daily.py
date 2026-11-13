# Daily Missions BATCH 01 (ST-MEX-001, 12 Nov 2026): "Daily Greeting Challenge" local prototype.
# Synthetic input only. Usage: python3 tools/town_daily.py URL ["iPhone 13"|"Pixel 7"]
# URL must be served from 127.0.0.1 (the mission opens only in the local preview); the production gate is checked
# by serving the same files under the made-up host sanor.test.
import sys, json, re
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
U = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8767/index.html'
DEV = sys.argv[2] if len(sys.argv) > 2 else 'iPhone 13'
DK, CK, AK, RK, XK = 'sanor-town-daily-missions-v1', 'sanor-town-core-missions-v1', 'sanor-town-app-v1', 'sanor-town-research-v1', 'sanor-town-rewards-v1'
MID = 'DM-GREET-01'
res = []
def ck(n, ok, info=''):
    res.append(bool(ok)); print('PASS' if ok else 'FAIL', n, info if (not ok or info) else '')
# the clock: sessionStorage "__t" (ms) moves Date.now() to that time when the page loads; the rest of the page clock runs normally
CLOCK = "(()=>{try{const t=+sessionStorage.getItem('__t');if(t){const r=Date.now.bind(Date),off=t-r();Date.now=()=>r()+off}}catch(e){}})()"
def ms(iso):
    from datetime import datetime
    return int(datetime.fromisoformat(iso.replace('Z', '+00:00')).timestamp() * 1000)

with sync_playwright() as p:
    host = urlparse(U).netloc
    b = p.chromium.launch(args=[f'--host-resolver-rules=MAP sanor.test {host}'])
    ctx = b.new_context(**p.devices[DEV]); ctx.add_init_script(CLOCK)
    pg = ctx.new_page(); errs = []; reqs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('request', lambda r: reqs.append(r.url))
    ready = lambda: pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    ls = lambda k: pg.evaluate("k=>localStorage.getItem(k)", k)
    w = lambda m=420: pg.wait_for_timeout(m)
    M = "SanorTown.daily.missions[0]"
    rec = lambda: (json.loads(ls(DK) or '{"missions":{}}')['missions'].get(MID) or {})
    def at(iso):
        pg.evaluate("t=>sessionStorage.setItem('__t',String(t))", ms(iso)); pg.reload(); ready()
    def missions():
        if pg.locator('[data-dm-card]').count(): return  # closing the mission returns to the Missions screen
        pg.locator('.sxnav button', has_text='Missions').first.click(); w(350)
    def open_dm():
        if pg.locator('[data-act=dm-open]').count() == 0: missions()
        pg.locator('[data-act=dm-open]').click(); w()
    def close():
        pg.keyboard.press('Escape'); w(200)
    def start():
        open_dm(); pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    def right():
        pg.locator('.dm .topt[data-opt$="-KEY"]').click(); w(); pg.locator('.dm [data-act=next]').click(); w()
    cur = lambda: pg.evaluate("()=>{const e=document.querySelector('.dmprog li.cur');return e?e.dataset.step:null}")
    pg.goto(U); ready(); pg.evaluate("localStorage.clear()"); at('2026-11-12T03:00:00Z')
    app0 = ls(AK); core0 = ls(CK); xp0 = pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())"); rw0 = ls(XK); keys0 = pg.evaluate("()=>Object.keys(localStorage).sort()")

    # 01 daily date key (Asia/Bangkok, UTC+7)
    dd = pg.evaluate("ts=>ts.map(t=>SanorTown.daily.day(t))", [ms(x) for x in ['2026-11-12T16:59:59Z', '2026-11-12T17:00:00Z', '2026-12-31T16:59:59Z', '2026-12-31T17:00:00Z', '2026-11-11T17:00:00Z']])
    ck('01a date key uses Thailand time: 23:59:59 / 00:00:00 Bangkok on each side of midnight, and at New Year', dd == ['2026-11-12', '2026-11-13', '2026-12-31', '2027-01-01', '2026-11-12'], dd)
    ck('01b page clock moved for the test: today is 2026-11-12', pg.evaluate("()=>SanorTown.daily.day()") == '2026-11-12')

    # 02 registry and content provenance
    reg = pg.evaluate(f"()=>{{const m={M};return [m.id,m.contentVersion,m.perDay,m.pool.length,SanorTown.daily.items(m).map(x=>[x.id,x.src,x.line,x.o,x.ids,x.ans,!!x.hint,x.why[0]!==''])]}}")
    ck('02a registry: DM-GREET-01, contentVersion DM-GREET-LOCAL-V0.1, 5 items a day from a pool of 10', reg[:4] == [MID, 'DM-GREET-LOCAL-V0.1', 5, 10], reg[:4])
    ck('02b all 10 pool items resolve to their existing turns (NPC line matches the stored copy)', len(reg[4]) == 10, [x[1] for x in reg[4]])
    ck('02c every item: 3 distinct answers, stable IDs Gxx-KEY/-D1/-D2, answer ID = -KEY, a hint and a why line from the source turn',
       all(len(set(x[3])) == 3 and x[4] == [x[0] + '-KEY', x[0] + '-D1', x[0] + '-D2'] and x[5] == x[0] + '-KEY' and x[6] and x[7] for x in reg[4]))
    src = pg.evaluate(f"()=>SanorTown.daily.items({M}).every(x=>{{const [sid,nid,ti]=x.src.split('/'),t=SanorTown.SCENES.find(s=>s.id===sid).npcs.find(n=>n.id===nid).turns[+ti];return t.o[0]===x.o[0]&&t.o[1]===x.o[1]&&t.o[2]===x.o[2]&&t.hint===x.hint}})")
    ck('02d text is used by reference: answers and hints equal the source turn exactly (no copy)', src)
    t1 = pg.evaluate(f"()=>[SanorTown.daily.today({M},'2026-11-12'),SanorTown.daily.today({M},'2026-11-12'),SanorTown.daily.today({M},'2026-11-13')]")
    many = pg.evaluate(f"()=>{{const s=new Set();for(let d=1;d<=30;d++)s.add(SanorTown.daily.today({M},'2026-11-'+String(d).padStart(2,'0')).join());return s.size}}")
    ck('02e today\'s set: 5 different items, the same on every phone for one day, another set the next day', len(set(t1[0])) == 5 and t1[0] == t1[1] and t1[0] != t1[2] and many >= 20, [t1, many])
    gone = pg.evaluate(f"()=>{{const s=SanorTown.SCENES.find(x=>x.id==='school'),t=s.npcs.find(n=>n.id==='anong').turns[0],o=t.npc;t.npc=o+' (changed)';const n=SanorTown.daily.items({M}).length;t.npc=o;return [n,SanorTown.daily.items({M}).length]}}")
    ck('02f source guard: if a source NPC line changes, that item is left out (9) and comes back when it matches (10)', gone == [9, 10], gone)

    # 03 production gate: the published site keeps "Daily missions · Future"
    pg2 = ctx.new_page(); pg2.goto('http://sanor.test/' + urlparse(U).path.lstrip('/')); pg2.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    pg2.locator('.sxnav button', has_text='Missions').first.click(); pg2.wait_for_timeout(350)
    fut = pg2.evaluate("()=>[...document.querySelectorAll('.mrfut li')].map(l=>l.innerText.replace(/\\s+/g,' ').trim())")
    ck('03a on a non-local host the Missions screen is unchanged: 4 Future rows, Daily missions still "Future · เร็ว ๆ นี้", no open button',
       pg2.evaluate("()=>SanorTown.daily.preview()") is False and len(fut) == 4 and fut[0] == 'Daily missions ภารกิจประจำวัน Future · เร็ว ๆ นี้' and pg2.locator('[data-act=dm-open]').count() == 0 and pg2.locator('[data-dm-card]').count() == 0, fut)
    pg2.close()
    missions()
    ck('03b local preview: Daily missions row shows the prototype and an open button; other Future rows unchanged',
       pg.evaluate("()=>SanorTown.daily.preview()") and pg.locator('[data-dm-card]').count() == 1 and pg.locator('.mrfut li').count() == 4 and pg.locator('[data-act=dm-open]').count() == 1,
       pg.locator('[data-dm-card]').inner_text().replace('\n', ' | '))

    # 04 intro / PREP / listen
    open_dm()
    today = pg.evaluate(f"()=>SanorTown.daily.today({M},'2026-11-12')")
    ck('04a intro lists today\'s 5 greetings in order, with the local-preview flag', pg.evaluate("()=>[...document.querySelectorAll('.dm [data-item]')].map(e=>e.dataset.item)") == today and pg.locator('.dm [data-placeholder=flag]').count() == 1)
    ck('04b practice-only note: "Choosing an answer is not a speaking score. No XP."', 'Choosing an answer is not a speaking score. No XP.' in pg.locator('.dm').inner_text())
    pg.locator('[data-act=start]').click(); w()
    prep = pg.evaluate("()=>[...document.querySelectorAll('.dm [data-prep]')].map(e=>[e.dataset.prep,e.querySelector('.cmen').textContent,!!e.querySelector('.tsay')])")
    keys = pg.evaluate(f"()=>{{const a={{}};SanorTown.daily.items({M}).forEach(x=>a[x.id]=x.o[0]);return a}}")
    ck('04c PREP: the 5 answers of today, each with Listen', [x[0] for x in prep] == today and all(x[1] == keys[x[0]] and x[2] for x in prep), prep)
    ck('04d PREP saved as the run state', rec()['days']['2026-11-12']['run']['state'] == 'PREP')
    pg.locator('[data-act=prep-next]').click(); w()
    ck('04e practice starts at item 1 of 5', cur() == today[0] and pg.locator('.dm .cmsub').inner_text() == 'Practice · 1 / 5')

    # 05 answer checking, hint, why, retry
    it = pg.evaluate(f"id=>SanorTown.daily.items({M}).find(x=>x.id===id)", today[0])
    pg.locator(f'.dm .topt[data-opt="{today[0]}-D1"]').click(); w(150)
    fb = pg.locator('.dm .tfb').inner_text()
    ck('05a wrong answer: "Not quite. ✗" and the source hint; that option is disabled; the others still work',
       fb.startswith('Not quite. ✗') and it['hint'] in fb and 'null' not in fb and pg.locator(f'.dm .topt[data-opt="{today[0]}-D1"]').is_disabled() and not pg.locator(f'.dm .topt[data-opt="{today[0]}-KEY"]').is_disabled(), fb)
    w(300); pg.locator(f'.dm .topt[data-opt="{today[0]}-D2"]').click(); w(150)
    ck('05b retry: a second wrong answer is allowed, still on item 1, no Next button', cur() == today[0] and pg.locator('.dm [data-act=next]').count() == 0)
    w(300); pg.locator(f'.dm .topt[data-opt="{today[0]}-KEY"]').click(); w(150)
    fb = pg.locator('.dm .tfb').inner_text()
    ck('05c right answer: ✓ and the source "why" line; all options locked; Next appears', fb.startswith('✓ ' + it['why'][0]) and 'null' not in fb and 'undefined' not in fb and all(pg.locator('.dm .topt').nth(k).is_disabled() for k in range(3)) and pg.locator('.dm [data-act=next]').count() == 1, fb)
    r = rec()['days']['2026-11-12']['run']
    ck('05d first try is recorded once (0 for item 1), attempts 3, wrong 2', r['first'] == {today[0]: 0} and r['attempts'] == 3 and r['wrong'] == 2, r)
    pg.locator('.dm [data-act=next]').click(); w()
    # 06 shuffled order, double tap
    orders = set()
    for k in range(8):
        orders.add(tuple(pg.evaluate("()=>[...document.querySelectorAll('.dm .topt')].map(b=>b.dataset.opt.split('-').pop())")))
        close(); open_dm(); pg.locator('[data-act=resume]').click(); w()
    ck('06a answers come in a new order (seen ' + str(len(orders)) + ' orders on item 2); checking uses the option ID, not the position', len(orders) >= 3, orders)
    pg.locator(f'.dm .topt[data-opt="{today[1]}-KEY"]').click(); pg.locator('.dm [data-act=next]').dblclick(); w()
    ck('06b double tap on Next moves one item only (item 3)', cur() == today[2], cur())

    # 07 resume after refresh
    pg.reload(); ready(); open_dm()
    ck('07a after refresh the intro offers "Continue ▶ (3 / 5)"', pg.locator('[data-act=resume]').inner_text().split('\n') == ['Continue ▶', 'เล่นต่อ (3 / 5)'], pg.locator('[data-act=resume]').inner_text())
    pg.locator('[data-act=resume]').click(); w()
    ck('07b resume opens item 3', cur() == today[2])
    close(); missions()
    ck('07c Missions row shows "In progress · 2 / 5"', 'In progress' in pg.locator('[data-dm-card]').inner_text() and '2 / 5' in pg.locator('[data-dm-card]').inner_text(), pg.locator('[data-dm-card]').inner_text().replace('\n', ' | '))
    pg.locator('[data-act=dm-open]').click(); w(); pg.locator('[data-act=resume]').click(); w()
    for k in range(3): right()

    # 08 completion and summary
    D = rec()['days']['2026-11-12']
    ck('08a daily completion recorded once: completed, count 1, runs 1, first try 4 / 5', D['completion']['status'] == 'completed' and D['completion']['count'] == 1 and D['runs'] == 1 and D['last']['firstTry'] == 4 and D['last']['items'] == 5, D['last'])
    s = pg.locator('.dm').inner_text()
    ck('08b summary: three separate results (practice score / mission / speaking not assessed)', pg.locator('.dm [data-sum]').count() == 3 and 'First try right: 4 / 5' in s and 'Not assessed in the game' in s and 'No XP or badge · ไม่มี XP หรือป้ายรางวัล' in s, s[:300])
    ck('08c reward eligibility reported, nothing granted: eligible false, reason NO_APPROVED_REWARD_RULE', D['reward'] == {'eligible': False, 'reason': 'NO_APPROVED_REWARD_RULE'})
    first_at = D['completion']['completedAt']
    # 09 replay
    pg.locator('.dm [data-act=replay]').click(); w()
    ck('09a Play again opens the intro with the completed line', pg.locator('.dm [data-status=completed]').count() == 1 and pg.locator('.dm [data-act=start]').inner_text().startswith('Play again'))
    pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    for k in range(5): right()
    D = rec()['days']['2026-11-12']
    ck('09b replay: runs 2, completion count still 1, first completion time unchanged, first try 5 / 5', D['runs'] == 2 and D['completion']['count'] == 1 and D['completion']['completedAt'] == first_at and D['last']['firstTry'] == 5, D['completion'])
    ck('09c days completed = 1 after two runs on one day', rec()['daysCompleted'] == 1)
    close()

    # 10 no duplicate rewards / storage isolation
    ck('10a XP and rewards record unchanged after 2 runs', pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == xp0 and ls(XK) == rw0)
    ck('10b legacy progress (sanor-town-app-v1) and CORE-M02 record byte-identical', ls(AK) == app0 and ls(CK) == core0)
    ck('10c no research rows: sanor-town-research-v1 absent', ls(RK) is None)
    k1 = pg.evaluate("()=>Object.keys(localStorage).sort()")
    ck('10d localStorage: only the daily key was added', sorted(set(k1) - set(keys0)) == [DK], [keys0, k1])

    # 11 next day
    at('2026-11-12T17:00:05Z'); missions()
    st = pg.evaluate(f"()=>SanorTown.daily.status({M})")
    ck('11a at 00:00 Bangkok a new day starts: 2026-11-13, new set, not started; yesterday kept as completed',
       st['day'] == '2026-11-13' and st['status'] == 'not_started' and st['set'] != today and rec()['days']['2026-11-12']['completion']['status'] == 'completed', st)
    open_dm(); pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w(); right()
    close()
    at('2026-11-13T17:30:00Z'); open_dm()
    ck('11b an unfinished run from yesterday is not resumed today (no Continue on 2026-11-14)', pg.locator('[data-act=resume]').count() == 0 and rec()['days']['2026-11-13']['run'] is not None)
    pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    for k in range(5): right()
    ck('11c days completed = 2 (12 and 14 Nov); 13 Nov stays in progress', rec()['daysCompleted'] == 2 and rec()['days']['2026-11-13']['completion']['status'] == 'in_progress', {k: v['completion']['status'] for k, v in rec()['days'].items()})
    close()
    # 12 midnight during a run: the run belongs to the day it started
    at('2026-11-15T16:59:30Z'); open_dm(); pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    pg.evaluate("()=>{const r=Date.now.bind(Date);Date.now=()=>r()+60000}"); w(100)
    for k in range(5): right()
    ck('12a a run started at 23:59 finishes after midnight and is saved on its start day (2026-11-15)', rec()['days']['2026-11-15']['completion']['status'] == 'completed' and '2026-11-16' not in rec()['days'])
    close()

    # 13 content version / bad saves / 30 days
    d = json.loads(ls(DK)); m = d['missions'][MID]
    m['contentVersion'] = 'DM-GREET-LOCAL-V0.0'; m['days']['2026-11-13']['run'] = {'state': 2, 'first': {}, 'attempts': 0, 'wrong': 0, 'startedAt': 1}
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [DK, json.dumps(d)]); at('2026-11-13T05:00:00Z'); open_dm()
    ck('13a other contentVersion: the unfinished run is dropped (no Continue), completions are kept', pg.locator('[data-act=resume]').count() == 0)
    close(); pg.evaluate("()=>SanorTown.daily.status(SanorTown.daily.missions[0])")
    open_dm(); pg.locator('[data-act=start]').click(); w(); close()
    m2 = rec()
    ck('13b after saving, contentVersion is V0.1 and 12/14/15 Nov are still completed', m2['contentVersion'] == 'DM-GREET-LOCAL-V0.1' and all(m2['days'][k]['completion']['status'] == 'completed' for k in ['2026-11-12', '2026-11-14', '2026-11-15']))
    for bad in ['{not json', json.dumps({'schemaVersion': 9, 'missions': {}}), json.dumps({'schemaVersion': 1, 'missions': {MID: {'days': {'2026-11-13': {'set': ['G01'], 'run': {'state': 99, 'first': {}}, 'completion': {'status': 'x', 'count': 0}}}}}})]:
        pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [DK, bad]); pg.reload(); ready(); open_dm(); close()
    ck('13c broken or old saves do not crash the mission (no page error)', not errs, errs)
    d = {'schemaVersion': 1, 'missions': {MID: {'missionId': MID, 'contentVersion': 'DM-GREET-LOCAL-V0.1', 'daysCompleted': 0, 'days': {}}}}
    for k in range(1, 36):
        d['missions'][MID]['days'][f'2026-10-{k:02d}' if k <= 31 else f'2026-11-{k-31:02d}'] = {'set': ['G01'], 'run': None, 'runs': 1, 'completion': {'status': 'completed', 'completedAt': 'x', 'count': 1}, 'last': None, 'reward': {'eligible': False, 'reason': 'NO_APPROVED_REWARD_RULE'}}
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [DK, json.dumps(d)]); pg.reload(); ready(); open_dm(); pg.locator('[data-act=start]').click(); w(); close()
    ck('13d history is capped at 30 days (oldest removed)', len(rec()['days']) == 30 and '2026-10-01' not in rec()['days'], len(rec()['days']))

    # 14 mobile layout
    pg.evaluate("()=>localStorage.removeItem('sanor-town-daily-missions-v1')"); pg.reload(); ready()
    lay = []
    for wd in (320, 390, 412, 430):
        pg.set_viewport_size({'width': wd, 'height': 800}); w(150); missions()
        a = pg.evaluate("()=>{const c=document.querySelector('[data-dm-card]');return c.scrollWidth<=c.clientWidth+1&&document.documentElement.scrollWidth<=innerWidth+1}")
        pg.locator('[data-act=dm-open]').click(); w(); sc = []
        for step in ('intro', 'prep', 'play', 'sum'):
            sc.append(pg.evaluate("()=>{const b=document.querySelector('.dm');return b.scrollWidth<=b.clientWidth+1&&[...b.querySelectorAll('button')].every(x=>{const r=x.getBoundingClientRect();return r.height>=40||x.classList.contains('tx')})}"))
            if step == 'intro': pg.locator('[data-act=start]').click(); w()
            elif step == 'prep': pg.locator('[data-act=prep-next]').click(); w()
            elif step == 'play':
                for k in range(5): right()
        lay.append((wd, a, sc)); close(); pg.evaluate("()=>localStorage.removeItem('sanor-town-daily-missions-v1')")
    pg.set_viewport_size(p.devices[DEV]['viewport']); w(150)
    ck('14 no sideways overflow and tap targets >= 40 px at 320/390/412/430 (card, intro, PREP, practice, summary)', all(x[1] and all(x[2]) for x in lay), lay)

    # 15 Escape / focus (requests are counted from here: the page itself, e.g. its web fonts, loaded before)
    reqs.clear()
    missions(); pg.locator('[data-act=dm-open]').click(); w(); pg.locator('[data-act=start]').click(); w(); close()
    ck('15 Escape closes the mission, progress kept (PREP), focus returns to the page', pg.locator('.dm').count() == 0 and rec()['days'][pg.evaluate("()=>SanorTown.daily.day()")]['run']['state'] == 'PREP')

    # 16 network / offline / audio fallback
    o = urlparse(U)
    ext = [x for x in reqs if urlparse(x).netloc != o.netloc and not x.startswith(('data:', 'blob:'))]
    ck('16a no outside request while the mission runs (same-origin files only)', not ext, ext[:3])
    ctx.set_offline(True)
    open_dm(); pg.locator('[data-act=resume]').first.click() if pg.locator('[data-act=resume]').count() else pg.locator('[data-act=start]').click(); w()
    if pg.locator('[data-act=prep-next]').count(): pg.locator('[data-act=prep-next]').click(); w()
    right()
    ck('16b offline after load: the mission still plays and saves (nothing to download)', rec()['days'][pg.evaluate("()=>SanorTown.daily.day()")]['run']['state'] == 1)
    close(); ctx.set_offline(False)
    pg3 = ctx.new_page(); pg3.add_init_script("try{delete Window.prototype.speechSynthesis}catch(e){};try{delete window.speechSynthesis}catch(e){}"); e3 = []
    pg3.on('pageerror', lambda e: e3.append(str(e)))
    pg3.goto(U); pg3.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    pg3.locator('.sxnav button', has_text='Missions').first.click(); pg3.wait_for_timeout(350); pg3.locator('[data-act=dm-open]').click(); pg3.wait_for_timeout(420)
    pg3.locator('[data-act=start]').click(); pg3.wait_for_timeout(420); pg3.locator('[data-act=prep-next]').click(); pg3.wait_for_timeout(420)
    pg3.locator('.dm .tsay').first.click(); pg3.wait_for_timeout(300)
    # a line with a recorded voice clip plays the clip; otherwise the device voice is used, and without one a message is shown
    pg3.locator('.dm .tsay').first.click(); pg3.wait_for_timeout(300)
    t3 = pg3.evaluate("()=>{const t=document.getElementById('toast');return t.hidden?'':t.textContent}")
    ck('16c device without a speech engine: Listen does not break the mission (clip or message), the sentence stays on screen, no page error',
       not e3 and t3 in ('', 'This device has no English voice.', 'Cannot play sound on this device.') and pg3.locator('.dm .ten').count() == 1 and pg3.locator('.dm .topt').count() == 3, ['toast: ' + repr(t3), e3])
    pg3.close()

    ck('17 no page errors during the run', not errs, errs)
    print(f'{sum(res)} / {len(res)} OK' if all(res) else f'FAILED {len(res) - sum(res)} of {len(res)}')
    b.close()
sys.exit(0 if all(res) else 1)
