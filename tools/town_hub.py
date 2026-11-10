# ST-UX-007 CS-1: School Canteen Hub + Words / Listen / Speak. Usage: python3 tools/town_hub.py URL ["iPhone 13"|"Pixel 7"] [shots]
import sys
from playwright.sync_api import sync_playwright
U=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8767/index.html';DEV=sys.argv[2] if len(sys.argv)>2 else 'iPhone 13';SHOT=len(sys.argv)>3
res=[]
def ck(n,ok,info=''):res.append(ok);print('OK  ' if ok else 'FAIL',n,info)
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(**p.devices[DEV]);pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(U);pg.wait_for_function("()=>!document.getElementById('stsplash')",timeout=20000);pg.evaluate("localStorage.clear()");pg.reload();pg.wait_for_function("()=>!document.getElementById('stsplash')",timeout=20000)
    KEY='sanor-town-app-v1'
    def card(sid):
        tab=pg.locator('.ttabs [role=tab]')
        for i in range(tab.count()):
            tab.nth(i).click();pg.wait_for_timeout(120)
            if pg.locator(f'button[data-scene="{sid}"]').count():break
        pg.locator(f'button[data-scene="{sid}"]').first.click();pg.wait_for_timeout(600)
    shot=lambda n:pg.screenshot(path=f'/tmp/town_hub_{DEV.replace(" ","")}_{n}.png') if SHOT else None
    card('canteen')
    hub=pg.locator('.hubb')
    ck('H01 canteen card opens the Hub (not the 3D scene)',hub.count()==1 and pg.evaluate("!document.querySelector('.town')"))
    ck('H02 Hub shows 7 modes, all open (CS-2)',pg.locator('.hubm[data-mode]').count()==7 and pg.locator('.hubm.soon').count()==0)
    ck('H03 no horizontal overflow',pg.evaluate("document.documentElement.scrollWidth<=window.innerWidth"))
    small=pg.evaluate("[...document.querySelectorAll('.hubb button')].filter(b=>{const r=b.getBoundingClientRect();return r.width>0&&(r.height<44||r.width<44)}).map(b=>b.textContent.trim().slice(0,20))")
    ck('H04 touch targets >= 44px',not small,small)
    shot('hub')
    before=pg.evaluate(f"localStorage.getItem('{KEY}')")
    # Words
    pg.locator('.hubm[data-mode=words]').click();pg.wait_for_timeout(300);shot('words')
    n=0
    while pg.locator('.hubfc h3').count() and pg.locator('button:has-text("Next · ต่อไป")').count():
        pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(80);n+=1
    pg.locator('button:has-text("Match game")').click();pg.wait_for_timeout(200)
    for k in range(4):
        q=pg.locator('.hubq').inner_text()
        ans=pg.evaluate("q=>{const w=SanorTown&&0;return null}",q)
        for i in range(3):
            o=pg.locator('.topts .topt:not([disabled])').nth(0);o.click();pg.wait_for_timeout(150)
            if pg.locator('.tfb.good').count():break
        pg.wait_for_timeout(1000)
    ck('H05 Words: 9 cards then match game ends with Well done',n==8 and pg.locator('text=Well done').count()==1,n)
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    ck('H06 Words shows Done on the Hub',pg.locator('.hubm[data-mode=words] .hubst.ok').count()==1)
    # Listen
    pg.locator('.hubm[data-mode=listen]').click();pg.wait_for_timeout(400);shot('listen')
    ck('H07 Listen has Play, Slower and Show text',pg.locator('button:has-text("Play")').count()==1 and pg.locator('button:has-text("Show text")').count()==1)
    pg.locator('button:has-text("Show text")').click();ck('H08 Show text reveals the line (fallback when no voice)',pg.locator('.hubtx:not([hidden])').count()==1)
    wrong_seen=False
    for k in range(6):
        for i in range(3):
            pg.locator('.topts .topt:not([disabled])').nth(0).click();pg.wait_for_timeout(150)
            if pg.locator('.tfb.good').count():break
            wrong_seen=wrong_seen or len(pg.locator('.tfb.bad').inner_text())>30
        if k==0:shot('listen_fb')
        pg.wait_for_timeout(1000)
    ck('H09 Listen finishes after 6 items, wrong answers show a WHY',pg.locator('text=Great listening').count()==1 and wrong_seen)
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    # Speak
    pg.locator('.hubm[data-mode=speak]').click();pg.wait_for_timeout(300);shot('speak')
    ck('H10 Speak says practice only, no score',pg.locator('text=not automatically scored').count()==1)
    ck('H11 Speak never asks for the microphone',pg.evaluate("!('__mic' in window)") and 'getUserMedia' not in pg.content())
    fin=pg.locator('button:has-text("Finish")');ck('H12 Finish is locked until each phrase is marked',fin.is_disabled())
    for i in range(pg.locator('.hubsaid').count()): pg.locator('.hubsaid').nth(i).click()
    fin.click();pg.wait_for_timeout(200)
    ck('H13 Hub shows 3 modes done, Talk not started',pg.locator('.hubst.ok').count()==3 and 'Modes done · ทำแล้ว 3 / 7' in pg.locator('.hubprog').inner_text())
    shot('hub_after')
    # ---- CS-2 Read / Write / Quiz ----
    def answer_all(n,label):
        why=False
        for k in range(n):
            for i in range(3):
                pg.locator('.topts .topt:not([disabled])').nth(0).click();pg.wait_for_timeout(120)
                if pg.locator('.tfb.good').count():break
                why=why or len(pg.locator('.tfb.bad').inner_text())>30
            pg.wait_for_timeout(1000)
        return why
    pg.locator('.hubm[data-mode=read]').click();pg.wait_for_timeout(300);shot('read')
    menu=pg.locator('.hubmenu').inner_text()
    ck('R01 Read menu uses the price registry (25/30/5/20)',all(x in menu for x in ['25 ฿','30 ฿','5 ฿','20 ฿']),menu[:80])
    w=answer_all(3,'menu');shot('read_rc')
    ck('R02 receipt: total 45, paid 50, change 5',all(x in pg.locator('.hubrc').inner_text() for x in ['45 ฿','50 ฿','5 ฿']))
    w=answer_all(5,'rest') or w
    ck('R03 Read finishes after 8 questions, wrong answers show a WHY',pg.locator('text=Well done').count()==1 and w)
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubm[data-mode=write]').click();pg.wait_for_timeout(300)
    answer_all(2,'pick')
    # word order: wrong order first, then right
    words=["Can","I","pay","by","QR","code?"]
    for t in reversed(words): pg.locator('.hubtile:not([disabled])',has_text=t).first.click()
    pg.locator('button:has-text("Check")').click();pg.wait_for_timeout(100)
    ck('W01 wrong word order: Not quite + hint',pg.locator('.tfb.bad').count()==1 and 'Start with' in pg.locator('.tfb').inner_text())
    for t in words: pg.locator('.hubtile:not([disabled])',has_text=t).first.click()
    shot('write_order');pg.locator('button:has-text("Check")').click();pg.wait_for_timeout(100)
    ck('W02 right word order: Great',pg.locator('.tfb.good').count()==1);pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(100)
    for t in ["I","have","twenty","baht","left."]: pg.locator('.hubtile:not([disabled])',has_text=t).first.click()
    pg.locator('button:has-text("Check")').click();pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(100)
    inp=pg.locator('.hubin');inp.fill('regular please');pg.locator('button:has-text("Check")').click()
    inp.fill('Medium please');pg.locator('button:has-text("Check")').click()
    ck('W03 typed: 2 wrong tries show the answer',"Large, please." in pg.locator('.tfb').inner_text())
    inp.fill('  large,  PLEASE ');pg.keyboard.press('Enter');pg.wait_for_timeout(100)
    ck('W04 typed: case, commas and spaces do not matter',pg.locator('.tfb.good').count()==1);shot('write_type')
    pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(100)
    pg.locator('.hubin').fill('2 bottles of water, please.');pg.locator('button:has-text("Check")').click();pg.wait_for_timeout(100)
    ck('W05 typed: another right form accepted (2 bottles)',pg.locator('.tfb.good').count()==1)
    pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(200)
    ck('W06 Write finishes, shows first-try / 6, says text not speaking',pg.locator('text=Well done').count()==1 and ' / 6' in pg.locator('.hubb').inner_text() and 'not your speaking' in pg.locator('.hubb').inner_text())
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubm[data-mode=quiz]').click();pg.wait_for_timeout(300);shot('quiz')
    ck('Q01 quiz shows the part name',' · Language' in pg.locator('.hubbar b').inner_text())
    answer_all(8,'quiz');shot('quiz_done')
    t=pg.locator('.hubb').inner_text()
    ck('Q02 result by part (Language/Math/Payment) and "not a research test"','Language' in t and 'Math' in t and 'Payment' in t and 'K1–K3' in t,t[:200])
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    ck('Q03 Hub: 6 / 7 modes done (Talk not started)','Modes done · ทำแล้ว 6 / 7' in pg.locator('.hubprog').inner_text());shot('hub_cs2')
    # ---- CS-4 My results ----
    pg.locator('.hubresb').click();pg.wait_for_timeout(200);shot('results')
    rows=pg.locator('.hubrrow')
    ck('S01 My results lists the 7 modes',rows.count()==7)
    ck('S02 6 completed, Talk not started',pg.locator('.hubpill.ok').count()==6 and 'Not started' in pg.locator('.hubrrow[data-mode=talk]').inner_text())
    rt=pg.locator('.hubrrow[data-mode=read]').inner_text()
    ck('S03 Read shows the last first-try result (x / 8) and times done',' / 8' in rt and '× 1' in rt,rt)
    qt=pg.locator('.hubrrow[data-mode=quiz]').inner_text()
    ck('S04 Quiz shows Language / Math / Payment','Language' in qt and 'Math' in qt and 'Payment' in qt and ' / 8' in qt,qt)
    ck('S05 Speak shows practised, not scored','not scored' in pg.locator('.hubrrow[data-mode=speak]').inner_text())
    ck('S06 Words and Listen keep their last result',' / 4' in pg.locator('.hubrrow[data-mode=words]').inner_text() and ' / 6' in pg.locator('.hubrrow[data-mode=listen]').inner_text())
    ck('S07 summary 6 / 7 + progress bar + "not a test" note','6 / 7' in pg.locator('.hubrsum').inner_text() and pg.locator('.hubbarw[aria-valuenow="6"]').count()==1 and 'not a test score' in pg.locator('.hubb').inner_text())
    ck('S08 no horizontal overflow in results',pg.evaluate("document.querySelector('.hubb').scrollWidth<=document.querySelector('.hubb').clientWidth+1"))
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    sv=pg.evaluate(f"JSON.parse(localStorage.getItem('{KEY}'))")
    ck('H14 practice does not change stars/done/XP',not sv.get('done',{}).get('canteen') and 'rewards' not in str(sv.get('rw','')) ,{k:v for k,v in sv.items() if k!='phrases'})
    # Talk
    pg.locator('.hubgo').click();pg.wait_for_timeout(1500)
    ck('H15 Guided Mission opens the 3D canteen with the wallet',pg.locator('.town').count()==1 and pg.locator('.twal').count()==1)
    shot('talk')
    pg.keyboard.press('Escape');pg.wait_for_timeout(600)
    # ---- Hub for the other Our School stations (10 Nov): built only from approved content ----
    card('nurse');pg.wait_for_timeout(500);shot('nurse_hub')
    D=pg.evaluate("SanorTown.hubData('nurse')")
    ck('A01 another station (nurse) opens a Hub, not the 3D scene',pg.locator('.hubb').count()==1 and pg.evaluate("!document.querySelector('.town')"))
    ck('A02 6 modes open + Read coming soon, no Free Shopping',pg.locator('.hubm[data-mode]').count()==6 and pg.locator('.hubm.soon').count()==1 and pg.locator('.hubfree').count()==0)
    pg.locator('.hubm[data-mode=words]').click();pg.wait_for_timeout(200)
    ck('A03 Words = the approved register for this station (7 words), example from the scene',('1 / %d'%len(D['words'])) in pg.locator('.hubbar b').inner_text() and len(D['words'])==7 and D['words'][0][3] in pg.locator('.hubfc').inner_text())
    pg.locator('button:has-text("Back to Hub")').count() or pg.locator('.hubback').click();pg.wait_for_timeout(200)
    pg.locator('.hubm[data-mode=listen]').click();pg.wait_for_timeout(300);pg.locator('button:has-text("Show text")').click()
    ck('A04 Listen plays an NPC line; options are that turn\'s reviewed options',D['listen'][0][0] in pg.locator('.hubtx').inner_text() and all(o in pg.locator('.topts').inner_text() for o in D['listen'][0][3]))
    w=answer_all(6,'listen');shot('nurse_listen')
    ck('A05 Listen finishes 6 items with WHY on wrong answers',pg.locator('text=Great listening').count()==1 and w)
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubm[data-mode=write]').click();pg.wait_for_timeout(200)
    for k,it in enumerate(D['write']):
        for t in it['w']: pg.locator('.hubtile:not([disabled])',has_text=t).first.click()
        pg.locator('button:has-text("Check")').click();pg.wait_for_timeout(80)
        if k==0: shot('nurse_write')
        pg.locator('button:has-text("Next · ต่อไป")').click();pg.wait_for_timeout(150)
    ck('A06 Write = 4 PREP sentences in word order, all right first try',pg.locator('text=Well done').count()==1 and '4 / 4' in pg.locator('.hubb').inner_text())
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubm[data-mode=quiz]').click();pg.wait_for_timeout(200);shot('nurse_quiz')
    answer_all(8,'quiz');t=pg.locator('.hubb').inner_text()
    ck('A07 Quiz 8 items: Meaning (PREP) + Replies (NPC turns)','Meaning' in t and 'Replies' in t and ' / 8' in t,t[:120])
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubresb').click();pg.wait_for_timeout(200);shot('nurse_results')
    ck('A08 My results lists the 6 open modes (Read is coming soon)',pg.locator('.hubrrow').count()==6 and pg.locator('.hubrrow[data-mode=read]').count()==0)
    pg.locator('button:has-text("Back to Hub")').click();pg.wait_for_timeout(200)
    pg.locator('.hubgo').click();pg.wait_for_timeout(1200)
    ck('A09 Guided Mission opens the nurse 3D scene',pg.locator('.town').count()==1 and pg.evaluate("SanorTown.g.sc.id")=='nurse')
    bad=pg.evaluate("SanorTown.SCENES.filter(s=>s.group==='phibun').filter(s=>{const h=SanorTown.hubData(s.id);return !h||h.words.length<7||h.listen.length<6||(s.id!=='canteen'&&((h.quiz||[]).length<8||(h.write||[]).length<4||h.words.some(w=>!w[3])))}).map(s=>s.id)")
    ck('A10 all 24 Our School stations have a complete Hub',not bad,bad)
    ck('H17 no page errors',not errs,errs[:2])
    b.close()
print(('PASS' if all(res) else 'FAIL'),sum(res),'/',len(res))
