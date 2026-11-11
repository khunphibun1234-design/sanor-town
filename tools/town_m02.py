# CORE-M02 "Help Me in Class!" local prototype (ST-CORE-002, 11 Nov 2026): mission flow, guards, save/resume/replay, no XP, no research rows.
# Synthetic input only. Usage: python3 tools/town_m02.py URL ["iPhone 13"|"Pixel 7"]
import sys, json
from playwright.sync_api import sync_playwright
U = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8767/index.html'
DEV = sys.argv[2] if len(sys.argv) > 2 else 'iPhone 13'
CK, AK, RK, XK = 'sanor-town-core-missions-v1', 'sanor-town-app-v1', 'sanor-town-research-v1', 'sanor-town-rewards-v1'
ORDER = ['N01', 'N02', 'N02-R', 'N03', 'N04', 'N05', 'N06']
res = []
def ck(n, ok, info=''):
    res.append(bool(ok)); print('PASS' if ok else 'FAIL', n, info if (not ok or info) else '')

with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(**p.devices[DEV]); pg = ctx.new_page(); errs = []; reqs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('request', lambda r: reqs.append(r.url))
    ready = lambda: pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    ls = lambda k: pg.evaluate("k=>localStorage.getItem(k)", k)
    rec = lambda: (json.loads(ls(CK) or '{"missions":{}}')['missions'].get('CORE-M02') or {})
    cur = lambda: pg.evaluate("()=>{const e=document.querySelector('.cmprog li.cur');return e?e.dataset.step:null}")
    w = lambda ms=420: pg.wait_for_timeout(ms)  # the mission ignores taps for 350 ms after a new screen (double-tap guard)
    def missions():
        pg.locator('.sxnav button', has_text='Missions').first.click(); w(350)
    def open_core():
        missions(); pg.locator('[data-act=core-open]').click(); w()
    def right(): pg.locator('.cm .topt[data-opt="0"]').click(); w()
    def wrong(k=1): pg.locator(f'.cm .topt[data-opt="{k}"]').click(); w()
    def nxt(): pg.locator('.cm [data-act=next]').click(); w()
    def fresh():
        pg.goto(U); ready(); pg.evaluate("localStorage.clear()"); pg.reload(); ready()
    def to_n01():
        open_core(); pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    def do(step, bonus='skip'):
        """finish one step with correct answers"""
        if step == 'N05':
            if bonus == 'skip': pg.locator('[data-act=skip]').click(); w(); return
            pg.locator('[data-act=bonus]').click(); w(); right(); nxt(); pg.locator('[data-act=say]').click(); w(); return
        right(); nxt()
        if step == 'N03': pg.locator('[data-act=say]').click(); w()
        if step == 'N04': pg.locator('[data-act=any]').first.click(); w()
        if step == 'N06': nxt()

    # ---------- 1 Start mission ----------
    fresh()
    seed = json.dumps({"done": {"class85": {"teacher": 1, "pim": 1}}, "modes": {"class85": {"words": {"s": "done", "a": 1, "f": 6, "t": 8}}}})
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [AK, seed]); pg.reload(); ready()
    app0, rw0, xp0 = ls(AK), ls(XK), pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())")
    legacy0 = pg.evaluate("()=>{const s=SanorTown.SCENES.find(x=>x.id==='class85');return JSON.stringify([s.npcs.map(n=>[n.id,n.name,n.turns.map(t=>[t.npc,t.th,t.o,t.hint,t.ok,t.why])]),s.prep])}")
    missions()
    card = pg.locator('[data-core="CORE-M02"]')
    ck('01a Missions menu shows the CORE-M02 card (Not started, 0 / 6)', card.count() == 1 and 'Not started' in card.inner_text() and '0 / 6' in card.inner_text())
    ck('01b Canteen mission card still present', pg.locator('.mrs .mrcard').count() == 2 and 'Lunch at the School Canteen' in pg.locator('.mrs').inner_text())
    pg.locator('[data-act=core-open]').click(); w()
    t = pg.locator('.cm').inner_text()
    ck('01c intro shows situation and goal (from the class85 mission card) and the 7 steps', 'English class is starting' in t and 'Use English to follow instructions' in t and pg.locator('.cmsteps li').count() == 7, t[:80])
    ck('01d nothing saved before Start', ls(CK) is None)
    # ---------- 2 PREP navigation ----------
    pg.locator('[data-act=start]').click(); w()
    ids = pg.evaluate("()=>[...document.querySelectorAll('.cmprep')].map(e=>e.dataset.prep)")
    ck('02a PREP lists M02-V2-01…06', ids == ['M02-V2-0%d' % i for i in range(1, 7)], ids)
    p4 = pg.evaluate("()=>SanorTown.SCENES.find(x=>x.id==='class85').prep[3]")
    ck('02b M02-V2-02 shows the legacy PREP line 4 text (shared reference, not a copy)', p4[0] in pg.locator('[data-prep="M02-V2-02"]').inner_text() and p4[1] in pg.locator('[data-prep="M02-V2-02"]').inner_text()
       and pg.evaluate("()=>SanorTown.core.mission.prep[1].en===undefined"), p4)
    ck('02c state PREP saved', rec().get('run', {}).get('state') == 'PREP')
    pg.locator('[data-act=prep-back]').click(); w()
    ck('02d Back returns to the intro', pg.locator('[data-act=start]').count() == 1 and rec()['run']['state'] == 'INTRO')
    pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    ck('02e Start talking opens N01', cur() == 'N01')

    # ---------- 3 transitions + 6 feedback ----------
    seen = [cur()]
    bub = lambda: pg.evaluate("()=>[...document.querySelectorAll('.cmlog .cmbub')].map(e=>[e.dataset.speaker,e.querySelector('.ten').textContent])")
    opts = lambda: pg.evaluate("()=>[...document.querySelectorAll('.cmact .topt')].map(e=>[e.dataset.opt,e.textContent,e.disabled])")
    o = opts()
    ck('03a N01 is learner-first: no NPC line before the learner chooses', bub() == [] and len(o) == 3 and 'You need an eraser. Pim has one. Ask to borrow it politely.' in pg.locator('.cmscene').inner_text(), bub())
    one = []
    def one_right(tag):
        o = opts(); one.append(len(o) == 3 and sum(1 for x in o if x[0] == '0') == 1 and len({x[1] for x in o}) == 3)
    one_right('N01')
    wrong(1); fb = pg.locator('.cm .tfb').inner_text()
    ck('06a wrong answer: "Not quite", WHY for that option, hint EN/TH', 'Not quite' in fb and 'This answer asks for the wrong item.' in fb and 'คำตอบนี้ขอของผิดชนิด' in fb and 'Look for the eraser and begin with a polite request.' in fb and 'ดูสิ่งของที่ต้องการ' in fb, fb)
    ck('06b wrong answer does not finish the step; that option is disabled; retry allowed', cur() == 'N01' and rec()['run']['stages']['N01'] is False and pg.locator('.cm .topt[data-opt="1"]').is_disabled() and pg.locator('.cm [data-act=next]').count() == 0)
    wrong(2); fb = pg.locator('.cm .tfb').inner_text()
    ck('06c second wrong option has its own WHY', 'This answer states ownership, not a request.' in fb and 'คำตอบนี้บอกว่ามีของ ไม่ได้ขอยืม' in fb, fb)
    right(); fb = pg.locator('.cm .tfb').inner_text()
    ck('06d correct answer: OK feedback EN/TH and the learner line in the conversation', 'Good. You asked Pim for an eraser politely.' in fb and 'ดีมาก ขอ Pim ยืมยางลบได้สุภาพ' in fb and bub() == [['you', 'May I borrow your eraser, please?']], fb)
    ck('06e first-try record for N01 = wrong (0), attempts 3, wrong 2', rec()['run']['first'].get('N01') == 0 and rec()['run']['attempts'] == 3 and rec()['run']['wrong'] == 2, rec()['run'])
    # double tap must not skip a step
    pg.locator('.cm [data-act=next]').dblclick(); w()
    seen.append(cur())
    ck('06f double tap on Next opens N02 only and presses nothing there', cur() == 'N02' and rec()['run']['attempts'] == 3 and all(not x[2] for x in opts()), [cur(), rec()['run']['attempts']])
    # ---------- 4 N02 / N02-R ----------
    bb = bub(); o = opts(); one_right('N02')
    ck('04a N02: Pim speaks "Sure. Here you are." (NPC line); learner options are the acknowledgement set', bb == [['pim', p4[0]]] and sorted(x[1] for x in o) == sorted(['Thank you.', 'May I borrow your ruler, please?', 'I have an eraser.']), [bb, o])
    ck('04b N02 prompt from decision L02', 'Pim gives you the eraser. What do you say?' in pg.locator('.cmact').inner_text() and 'พิมส่งยางลบให้ นักเรียนควรพูดว่าอะไร' in pg.locator('.cmact').inner_text())
    wrong(2); fb = pg.locator('.cm .tfb').inner_text()
    ck('04c N02 wrong: WHY + hint', 'This answer states possession rather than thanking.' in fb and 'Thank Pim for helping you.' in fb and 'กล่าวขอบคุณพิมที่ช่วยเหลือ' in fb, fb)
    right(); ck('04d N02 right: learner says "Thank you." and OK text', bub()[-1] == ['you', 'Thank you.'] and 'You thanked Pim politely.' in pg.locator('.cm .tfb').inner_text())
    nxt(); seen.append(cur())
    bb = bub(); o = opts(); one_right('N02-R')
    ck('04e N02-R: role-reversal card; Pim asks for the ruler; learner is the responder', pg.locator('[data-role=reversal]').count() == 1 and bb == [['pim', 'May I borrow your ruler, please?']], bb)
    ck('04f N02-R options: correct = "Sure. Here you are." (from legacy PREP 4), distractors per L03', [x[1] for x in o if x[0] == '0'] == [p4[0]] and sorted(x[1] for x in o if x[0] != '0') == sorted(['My ruler is blue.', 'May I borrow your ruler, please?']), o)
    wrong(1); fb1 = pg.locator('.cm .tfb').inner_text(); wrong(2); fb2 = pg.locator('.cm .tfb').inner_text()
    ck('04g N02-R WHY per option + hint', 'describes the ruler without offering it.' in fb1 and 'repeats the request instead of responding.' in fb2 and 'ตอบรับและส่งไม้บรรทัดที่พิมขอยืม' in fb2, [fb1, fb2])
    right(); ck('04h N02-R right: OK text', 'You offered the ruler politely.' in pg.locator('.cm .tfb').inner_text() and bub()[-1] == ['you', p4[0]])
    nxt(); seen.append(cur())
    # ---------- 5 N03 repetition trigger ----------
    one_right('N03'); bb = bub(); log = pg.locator('.cmlog').inner_text()
    ck('05a N03: teacher line shown with the page number hidden; no repetition yet', bb == [['teacher', 'Please open your book to page ……']] and 'twenty-five' not in log and pg.locator('.cmbub.repeat').count() == 0, bb)
    wrong(1); wrong(2)
    ck('05b wrong answers do not trigger the repetition', pg.locator('.cmbub.repeat').count() == 0 and 'twenty-five' not in pg.locator('.cmlog').inner_text() and cur() == 'N03')
    right()
    ck('05c the repetition is not shown before the learner continues', pg.locator('.cmbub.repeat').count() == 0 and 'The teacher repeats' in pg.locator('.cm .tfb').inner_text())
    nxt()
    ck('05d after the correct repeat request the teacher repeats "Page twenty-five." once', pg.locator('.cmbub.repeat').count() == 1 and bub()[-1] == ['teacher', 'Page twenty-five.'] and bub()[-2] == ['you', 'Could you say that again, please?'], bub())
    ck('05e N03 not complete before the learner acknowledges', rec()['run']['stages']['N03'] is False and cur() == 'N03')
    # ---------- 8 early exit / 9 refresh + resume ----------
    pg.keyboard.press('Escape'); w()
    r = rec()
    ck('08a early exit (Escape) closes the mission, returns to Missions, keeps progress', pg.locator('.cm').count() == 0 and pg.locator('[data-core="CORE-M02"]').count() == 1 and r['run']['state'] == 'N03' and r['completion']['status'] == 'in_progress')
    ck('08b Missions card: In progress, 3 / 6, Continue', 'In progress' in pg.locator('[data-core="CORE-M02"]').inner_text() and '3 / 6' in pg.locator('[data-core="CORE-M02"]').inner_text() and 'Continue mission' in pg.locator('[data-core="CORE-M02"]').inner_text())
    pg.keyboard.press('Escape'); pg.reload(); ready(); open_core()
    ck('09a after refresh the intro offers Continue (Repeat)', pg.locator('[data-act=resume]').count() == 1 and 'Repeat' in pg.locator('[data-act=resume]').inner_text())
    pg.locator('[data-act=resume]').click(); w()
    ck('09b resume opens N03 at its start (page number hidden again)', cur() == 'N03' and bub() == [['teacher', 'Please open your book to page ……']] and rec()['run']['first'].get('N03') == 0, [cur(), bub()])
    right(); nxt(); pg.locator('[data-act=say]').click(); w(); seen.append(cur())
    ck('05f N03 complete after "OK."', rec()['run']['stages']['N03'] is True)
    # ---------- N04 help ----------
    one_right('N04')
    ck('04i N04 is learner-first and separate from repetition', bub() == [] and 'Could you help me with this word, please?' in [x[1] for x in opts()] and 'Could you say that again, please?' not in [x[1] for x in opts()])
    right(); nxt()
    ck('07a N04: teacher explains only after the help request', bub()[-1] == ['teacher', 'Of course. The word “library” means a place for books.'], bub())
    av = [x.inner_text().split('\n')[0] for x in pg.locator('[data-act=any]').all()]
    ck('07b N04 acknowledgement: default + 2 acceptable variations; step not complete yet', av == ['I see. Thank you, Mr. Krit.', 'I understand now. Thank you.', 'Thank you, I understand.'] and rec()['run']['stages']['N04'] is False and 'เข้าใจแล้วครับ/ค่ะ ขอบคุณครับ/ค่ะ คุณครู' in pg.locator('.cmact').inner_text(), av)
    pg.locator('[data-act=any]').nth(1).click(); w(); seen.append(cur())
    ck('07c N04 complete after the acknowledgement', rec()['run']['stages']['N04'] is True)
    # ---------- 7 optional N05 skip ----------
    ck('07d N05 is offered as optional (Skip / Try the bonus)', cur() == 'N05' and pg.locator('[data-act=skip]').count() == 1 and pg.locator('[data-act=bonus]').count() == 1)
    pg.locator('[data-act=skip]').click(); w(); seen.append(cur())
    ck('07e skip: N05 = skipped, N06 opens', rec()['run']['stages']['N05'] == 'skipped' and cur() == 'N06')
    ck('03b step order seen = N01,N02,N02-R,N03,N04,N05,N06 (double tap did not skip)', seen == ORDER, seen)
    # ---------- N06 close ----------
    one_right('N06')
    ck('03c N06 is learner-first (thanks)', bub() == [] and 'Thank you for your help.' in [x[1] for x in opts()])
    right(); nxt()
    ck('03d N06: interlocutor replies "You\'re welcome."; mission not complete before the reply is passed', bub()[-1] == ['teacher', "You're welcome."] and rec()['completion']['status'] == 'in_progress' and rec()['run']['stages']['N06'] is False, bub())
    nxt(); w()
    ck('03e exactly one correct option and 3 distinct options at every choose step', all(one) and len(one) == 5 + 1, one)
    # ---------- completion summary ----------
    r = rec(); t = pg.locator('.cm').inner_text()
    ck('11a completion saved once: status completed, count 1, runs 1', r['completion']['status'] == 'completed' and r['completion']['count'] == 1 and r['runs'] == 1 and r['contentVersion'] == 'M02-LOCAL-PROTOTYPE-V1.0', r['completion'])
    ck('11b summary A practice score: first try 2 / 6 (N01, N02, N02-R, N03 missed on purpose), bonus skipped and not counted', 'First try right: 2 / 6' in t and 'skipped' in t and rec()['last']['firstTry'] == 2, rec().get('last'))
    ck('11c summary B mission completed; C speaking "Not assessed in the game"', 'Practice flow completed' in t and 'Not assessed in the game' in t and 'ครูเป็นผู้ประเมินการพูด' in t)
    ck('11d no "Speaking Passed" / CEFR claim anywhere on the summary', 'passed' not in t.lower() and 'cefr' not in t.lower() and 'a2' not in t.lower())
    done_at = r['completion']['completedAt']
    # ---------- 10 replay ----------
    pg.reload(); ready(); open_core()
    ck('10a after refresh a finished mission opens on the summary', 'Summary' in pg.locator('.cm').inner_text() and pg.locator('[data-sum=practice]').count() == 1)
    pg.locator('[data-act=replay]').click(); w(); pg.locator('[data-act=start]').click(); w(); pg.locator('[data-act=prep-next]').click(); w()
    for s in ORDER: do(s, bonus='take')
    r = rec(); t = pg.locator('.cm').inner_text()
    ck('10b replay with the bonus: runs 2, completion count still 1, first completion time unchanged', r['runs'] == 2 and r['completion']['count'] == 1 and r['completion']['completedAt'] == done_at, r['completion'])
    ck('10c replay summary: first try 6 / 6, bonus done, still out of 6', 'First try right: 6 / 6' in t and r['last']['bonus'] == 'done' and r['last']['items'] == 6, r['last'])
    pg.locator('[data-act=missions]').click(); w()
    ck('10d Back to Missions: card says Completed 6 / 6', 'Completed' in pg.locator('[data-core="CORE-M02"]').inner_text() and '6 / 6' in pg.locator('[data-core="CORE-M02"]').inner_text())
    pg.locator('[data-act=core-open]').click(); w(); pg.locator('[data-act=map]').click(); w(400)
    ck('10e School Map button opens the place list', pg.locator('.cm').count() == 0 and pg.locator('.sheetbg').count() == 1)
    pg.keyboard.press('Escape'); w()
    # ---------- 12 no XP / 13 legacy data / 14 no research ----------
    ck('12 no XP, coins or badge: XP unchanged and rewards key untouched', pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == xp0 and ls(XK) == rw0, [xp0, ls(XK)])
    ck('13a legacy progress key sanor-town-app-v1 byte-identical (class85 stars and Hub record kept)', ls(AK) == app0)
    legacy1 = pg.evaluate("()=>{const s=SanorTown.SCENES.find(x=>x.id==='class85');return JSON.stringify([s.npcs.map(n=>[n.id,n.name,n.turns.map(t=>[t.npc,t.th,t.o,t.hint,t.ok,t.why])]),s.prep])}")
    L = json.loads(legacy1)
    ck('13b class85 legacy content unchanged in memory: 4 NPCs, 12 turns, 6 PREP', legacy1 == legacy0 and len(L[0]) == 4 and sum(len(n[2]) for n in L[0]) == 12 and len(L[1]) == 6)
    ck('14 no research rows: key sanor-town-research-v1 absent', ls(RK) is None)
    keys = sorted(pg.evaluate("()=>Object.keys(localStorage)"))
    ck('13c localStorage keys: only the new core key was added', CK in keys and RK not in keys, keys)
    # ---------- guards against a changed save ----------
    fresh()
    bad = {"schemaVersion": 1, "missions": {"CORE-M02": {"curriculumMissionId": "CORE-M02", "sceneId": "class85", "contentVersion": "M02-LOCAL-PROTOTYPE-V1.0", "runs": 0,
           "run": {"state": "N06", "stages": {"N01": True, "N02": False, "N02-R": False, "N03": False, "N04": False, "N05": "pending", "N06": False}, "first": {}, "attempts": 0, "wrong": 0},
           "completion": {"status": "in_progress", "completedAt": None, "count": 0}, "last": None, "assessment": None}}}
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [CK, json.dumps(bad)]); pg.reload(); ready(); open_core(); pg.locator('[data-act=resume]').click(); w()
    ck('03f a save that claims N06 with N02 unfinished resumes at N02 (cannot skip required steps)', cur() == 'N02', cur())
    pg.keyboard.press('Escape'); w()
    old = json.loads(json.dumps(bad)); old['missions']['CORE-M02']['contentVersion'] = 'OLDER'; old['missions']['CORE-M02']['completion'] = {"status": "completed", "completedAt": "2026-11-01T00:00:00.000Z", "count": 1}
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [CK, json.dumps(old)]); pg.reload(); ready()
    st = pg.evaluate("()=>SanorTown.core.status()")
    ck('09c other content version: unfinished run restarted, completion record kept', st['status'] == 'completed' and st['inRun'] is False and st['completedAt'] == '2026-11-01T00:00:00.000Z', st)
    pg.evaluate("([k,v])=>localStorage.setItem(k,v)", [CK, '{broken']); pg.reload(); ready(); open_core()
    ck('09d unreadable save: mission opens as new, no page error', pg.locator('[data-act=start]').count() == 1 and not errs, errs[:1])
    pg.keyboard.press('Escape'); w(); pg.keyboard.press('Escape'); w()
    # ---------- 15 mobile layout ----------
    for wd in ([390, 320] if DEV == 'iPhone 13' else [412]):
        pg.set_viewport_size({'width': wd, 'height': 640}); fresh(); to_n01()
        m = pg.evaluate("()=>{const c=document.querySelector('.cm');return {over:c.scrollWidth-c.clientWidth,doc:document.documentElement.scrollWidth-innerWidth,minh:Math.min(...[...c.querySelectorAll('button')].map(b=>b.getBoundingClientRect().height)),w:c.getBoundingClientRect().width,vw:innerWidth}}")
        ck('15 layout at %dpx: no sideways overflow, touch targets >= 40px' % wd, m['over'] <= 0 and m['doc'] <= 0 and m['minh'] >= 40 and m['w'] <= m['vw'], m)
        pg.keyboard.press('Escape'); w(); pg.keyboard.press('Escape'); w()
    # ---------- 16 audio ----------
    fresh()
    pg.evaluate("()=>{window.__sp=[];window.__cancel=0;const ss=window.speechSynthesis;if(ss){const c=ss.cancel.bind(ss);ss.cancel=()=>{window.__cancel++;try{c()}catch(e){}}}}")
    open_core(); pg.locator('[data-act=start]').click(); w()
    pg.locator('.cmprep .tsay').first.click(); w(500)
    toast = pg.evaluate("()=>{const t=document.getElementById('toast');return t&&!t.hidden?t.textContent:''}")
    nv = pg.evaluate("()=>{try{return speechSynthesis.getVoices().length}catch(e){return -1}}")
    ck('16a device with a speech engine but %d voices: Listen is silent, sentence stays on screen, no page error' % nv, p4 is not None and 'May I borrow your eraser, please?' in pg.locator('.cmpreps').inner_text() and not errs, toast)
    # a device without any speech engine: the app tells the learner
    pg2 = ctx.new_page(); pg2.add_init_script("try{delete Window.prototype.speechSynthesis}catch(e){};try{delete window.speechSynthesis}catch(e){}")
    e2 = []; pg2.on('pageerror', lambda e: e2.append(str(e)))
    pg2.goto(U); pg2.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    pg2.locator('.sxnav button', has_text='Missions').first.click(); pg2.wait_for_timeout(420); pg2.locator('[data-act=core-open]').click(); pg2.wait_for_timeout(420)
    pg2.locator('[data-act=start]').click(); pg2.wait_for_timeout(420); pg2.locator('.cmprep .tsay').first.click(); pg2.wait_for_timeout(300)
    t2 = pg2.evaluate("()=>{const t=document.getElementById('toast');return t&&!t.hidden?t.textContent:''}")
    ck('16d device without a speech engine: message shown ("%s"), no page error' % t2, t2 != '' and not e2 and pg2.evaluate("()=>!('speechSynthesis' in window)"), e2[:1])
    pg2.close()
    ck('16b PREP screen says the sound is the phone\'s computer voice, English only', "computer voice (English only)" in pg.locator('.cmaud').inner_text())
    c0 = pg.evaluate("()=>window.__cancel"); pg.keyboard.press('Escape'); w()
    ck('16c leaving the mission stops speech', pg.evaluate("()=>window.__cancel") > c0, [c0, pg.evaluate("()=>window.__cancel")])
    # ---------- privacy: requests made while the mission is open ----------
    pg.keyboard.press('Escape'); fresh(); reqs.clear(); to_n01()
    for s in ORDER: do(s)
    ext = [u for u in reqs if not u.startswith(U.rsplit('/', 1)[0])]
    ck('14b no outside request while the mission runs (same-origin files only)', not ext, ext[:3])
    ck('no page errors', not errs, errs[:2])
    b.close()
print('%d / %d PASS' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
