# Research logging (RG-01 follow-up, 10 Nov): gate1 + School Canteen Guided only, OFF until ?pc=, Free Shopping / Hub never logged.
# Usage: python3 tools/town_research.py URL ["iPhone 13"|"Pixel 7"]
import sys, json, csv, io
from playwright.sync_api import sync_playwright
U = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8767/index.html'
DEV = sys.argv[2] if len(sys.argv) > 2 else 'iPhone 13'
KEY, RKEY = 'sanor-town-app-v1', 'sanor-town-research-v1'
res = []
def ck(n, ok, info=''):
    res.append(bool(ok)); print('OK  ' if ok else 'FAIL', n, info if (not ok or info) else '')

with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(**p.devices[DEV], accept_downloads=True); pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    ready = lambda: pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    ev = lambda: (json.loads(pg.evaluate(f"localStorage.getItem('{RKEY}')") or '{"ev":[]}')).get('ev', [])
    g = lambda js: pg.evaluate("()=>{const g=SanorTown.g;return " + js + "}")
    def card(sid):
        tab = pg.locator('.ttabs [role=tab]')
        for i in range(tab.count()):
            tab.nth(i).click(); pg.wait_for_timeout(100)
            if pg.locator(f'button[data-scene="{sid}"]').count(): break
        pg.locator(f'button[data-scene="{sid}"]').first.click(); pg.wait_for_timeout(600)
    def guided():
        card('canteen'); pg.locator('.hubb .hubgo').click(); pg.wait_for_timeout(700)
        sk = pg.get_by_role('button', name='Skip')
        if sk.count(): sk.first.click(); pg.wait_for_timeout(200)
    def leave():
        pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
        if pg.evaluate("()=>!!document.querySelector('.town')"): pg.evaluate("()=>SanorTown.g&&SanorTown.g.close&&SanorTown.g.close()"); pg.wait_for_timeout(300)
    def talk(nid, buy=None, m='cash', note=None, wrong_first=False):
        if not pg.evaluate("id=>{const g=SanorTown.g;g.openDlg(g.npcs.find(n=>n.id===id));return !!g.dlg}", nid): return False
        first = True
        for _ in range(30):
            if not g("!!g.dlg"): break
            if pg.locator('.tpanel .shmenu').count():
                for k, q in buy.items():
                    for _ in range(q): pg.locator(f'.tpanel .shrow[data-id="{k}"] .shplus').click()
                pg.locator('.tpanel .shok').click(); continue
            if pg.locator('.tpanel .shpay').count():
                pg.locator(f'.tpanel .shm[data-m="{m}"]').click()
                if m == 'cash': pg.locator(f'.tpanel .shnote[data-v="{note}"]').click()
                pg.locator('.tpanel .shcf').click(); continue
            o = g("g.cur()")
            if wrong_first and first: pg.locator('.tpanel .topt').filter(has_text=o[1]).first.click(); first = False
            pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click(); pg.locator('.tpanel .tnext').click(); pg.wait_for_timeout(30)
        return True
    def route():
        talk('rice', {'rice_big': 1}, 'cash', 50, wrong_first=True)
        talk('drinks', {'water': 1, 'meatball': 2}, 'qr')
        talk('bow'); pg.wait_for_timeout(500)

    # R01 no code -> nothing logged
    pg.goto(U); ready(); pg.evaluate("localStorage.clear()"); pg.reload(); ready()
    guided(); route()
    ck('R01 without ?pc= nothing is logged (canteen)', not ev() and pg.evaluate(f"localStorage.getItem('{RKEY}')") is None)

    # R02 with a code: canteen Guided is logged
    pg.goto(U); ready(); pg.evaluate("localStorage.clear()"); pg.goto(U + '?pc=TEST01'); ready()
    guided(); route()
    E = ev(); A = [e for e in E if e['event'] == 'answer']; PU = [e for e in E if e['event'] == 'purchase']; SC = [e for e in E if e['event'] == 'scene_complete']
    ck('R02 canteen answers logged with M09 and C-xx turn ids', A and all(e['missionId'] == 'M09' and e['turnId'].startswith('C-') for e in A), len(A))
    ids = sorted({e['turnId'] for e in A})
    ck('R03 15 turns of the rice route (C-01..05, C-11..15, C-16..20)', ids == ['C-%02d' % i for i in list(range(1, 6)) + list(range(11, 21))], ids)
    ck('R04 first try wrong then right on C-01 (attempt 1 false, 2 true)', [(e['attemptNumber'], e['isCorrect']) for e in A if e['turnId'] == 'C-01'] == [(1, False), (2, True)])
    ck('R05 contentVersion ST-CNT-025-CR01 CS-3, build 20261110c, participant TEST01', all(e['contentVersion'] == 'ST-CNT-025-CR01 CS-3' and e['build'] == '20261110c' and e['participantCode'] == 'TEST01' for e in E))
    ct = {e['turnId']: e.get('correctText') for e in A if e['isCorrect']}
    ck('R06 correctText follows the purchase (C-02 Large, C-04 fifty baht, C-19 five baht left)', ct.get('C-02') == 'Large, please.' and ct.get('C-04') == "Here's fifty baht." and ct.get('C-19') == 'I have five baht left.', {k: ct.get(k) for k in ['C-02', 'C-04', 'C-19']})
    ck('R07 two purchase events with items/total/method/change/money left',
       [(e['npcId'], e['items'], e['total'], e['payMethod'], e['given'], e['change'], e['moneyLeft']) for e in PU] == [('rice', 'rice_big x1', 30, 'cash', 50, 20, 20), ('drinks', 'water x1; meatball x2', 15, 'qr', 15, 0, 5)], [(e['npcId'], e['items'], e['total'], e['payMethod'], e['moneyLeft']) for e in PU])
    ck('R08 one scene_complete (first try 14 / 15)', len(SC) == 1 and SC[0]['firstCorrect'] == 14 and SC[0]['firstTotal'] == 15, SC)
    ck('R09 first session is the baseline', all(e['baseline'] for e in E))
    n0 = len(E)
    # practice missed -> retry_practice
    pr = pg.locator('.twin .tprac')
    if pr.count():
        pr.click(); pg.wait_for_timeout(100)
        for _ in range(5):
            if not g("!!g.dlg"): break
            o = g("g.cur()"); pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click(); pg.locator('.tpanel .tnext').click(); pg.wait_for_timeout(30)
    R = [e for e in ev()[n0:] if e['source'] == 'retry_practice']
    ck('R10 Practise missed is logged as retry_practice with the same correctText', R and R[0]['turnId'] == 'C-01' and R[0]['correctText'] == "I'd like rice and curry, please.", R[:1])
    leave()
    # R11 Free Shopping is never logged
    n1 = len(ev()); card('canteen'); pg.locator('.hubb button.hubfree').click(); pg.wait_for_timeout(700)
    talk('drinks', {'cocoa': 1}, 'cash', 20); talk('bow'); pg.wait_for_timeout(300)
    ck('R11 Free Shopping adds no research records', len(ev()) == n1, len(ev()) - n1)
    leave()
    # R12 Hub practice modes are never logged
    card('canteen'); pg.locator('.hubm[data-mode=quiz]').click(); pg.wait_for_timeout(200)
    for k in range(3):
        pg.locator('.topts .topt:not([disabled])').nth(0).click(); pg.wait_for_timeout(1000)
    ck('R12 Hub Quiz adds no research records', len(ev()) == n1)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
    # R13 gate1 unchanged
    card('gate1'); pg.wait_for_timeout(500)
    sk = pg.get_by_role('button', name='Skip')
    if sk.count(): sk.first.click()
    nid = g("g.npcs[0].id"); talk(nid)
    G = [e for e in ev()[n1:] if e['sceneId'] == 'gate1']
    ck('R13 gate1 still logged as before (M01, G1-xx, ST-CNT-001 V1.1, no correctText)', G and all(e['missionId'] == 'M01' and e['turnId'].startswith('G1-') and e['contentVersion'] == 'ST-CNT-001 V1.1' and 'correctText' not in e for e in G), G[:1])
    leave()
    # R14 CSV export (Passport) has the new columns at the end
    pg.locator('.sxnav button', has_text='Passport').first.click(); pg.wait_for_timeout(400)
    with pg.expect_download() as d:
        pg.locator('button', has_text='Export research CSV').click()
    txt = open(d.value.path(), encoding='utf-8-sig').read(); rows = list(csv.reader(io.StringIO(txt)))
    open('/tmp/town_research_sample.csv', 'w', encoding='utf-8-sig').write(txt)
    hdr = rows[0]
    ck('R14 CSV: old 19 columns unchanged + 7 new at the end', hdr[:19] == ['participantCode','sessionId','baseline','missionId','sceneId','npcId','turnId','source','event','attemptNumber','selectedOptionId','isCorrect','responseTimeMs','retryRound','firstCorrect','firstTotal','ts','contentVersion','build'] and hdr[19:] == ['correctText','items','total','payMethod','given','change','moneyLeft'], hdr)
    ck('R15 CSV rows = stored records', len(rows) - 1 == len(ev()), (len(rows) - 1, len(ev())))
    ck('R16 progress key untouched by research (separate key)', 'ev' not in json.loads(pg.evaluate(f"localStorage.getItem('{KEY}')") or '{}'))
    ck('no page errors', not errs, errs[:2])
    b.close()
print('%d / %d OK' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
