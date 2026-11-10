# ST-CNT-025-CR01 CS-3: canteen cart, simulated cash / SAMPLE QR, Free Shopping, 20 turns (CR01-T01..T10).
# Usage: python3 tools/town_shop.py URL ["iPhone 13"|"Pixel 7"] [shots]
import sys, json
from playwright.sync_api import sync_playwright
U = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8767/index.html'
DEV = sys.argv[2] if len(sys.argv) > 2 else 'iPhone 13'
SHOT = len(sys.argv) > 3
KEY = 'sanor-town-app-v1'
res = []
def ck(n, ok, info=''):
    res.append(bool(ok)); print('OK  ' if ok else 'FAIL', n, info if not ok or info else '')

with sync_playwright() as p:
    b = p.chromium.launch(); ctx = b.new_context(**p.devices[DEV]); pg = ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("window.__cam=0;try{navigator.mediaDevices.getUserMedia=()=>{window.__cam++;return Promise.reject()}}catch(e){}")
    shot = lambda n: pg.screenshot(path=f'/tmp/town_shop_{DEV.replace(" ","")}_{n}.png') if SHOT else None
    ready = lambda: pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    def fresh(save=None):
        pg.goto(U); ready(); pg.evaluate("([k,v])=>{localStorage.clear();if(v)localStorage.setItem(k,v)}", [KEY, save]); pg.reload(); ready()
    def card(sid='canteen'):
        tab = pg.locator('.ttabs [role=tab]')
        for i in range(tab.count()):
            tab.nth(i).click(); pg.wait_for_timeout(100)
            if pg.locator(f'button[data-scene="{sid}"]').count(): break
        pg.locator(f'button[data-scene="{sid}"]').first.click(); pg.wait_for_timeout(500)
    def guided():
        card(); pg.locator('.hubb .hubgo').click(); pg.wait_for_timeout(700)
        sk = pg.get_by_role('button', name='Skip')
        if sk.count(): sk.first.click(); pg.wait_for_timeout(200)
    def free():
        card(); pg.locator('.hubb button.hubfree').click(); pg.wait_for_timeout(700)
    g = lambda js: pg.evaluate("()=>{const g=SanorTown.g;return " + js + "}")
    sv = lambda: json.loads(pg.evaluate(f"localStorage.getItem('{KEY}')") or '{}')
    def open_npc(nid):
        return pg.evaluate("id=>{const g=SanorTown.g;g.openDlg(g.npcs.find(n=>n.id===id));return !!g.dlg}", nid)
    def answer(wrong=False):
        o = g("g.cur()")
        if wrong:
            pg.locator('.tpanel .topt').filter(has_text=o[1]).first.click()
        pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click(); pg.locator('.tpanel .tnext').click(); pg.wait_for_timeout(40)
        return o
    def menu(buy):
        for k, q in buy.items():
            for _ in range(q): pg.locator(f'.tpanel .shrow[data-id="{k}"] .shplus').click()
        pg.locator('.tpanel .shok').click(); pg.wait_for_timeout(40)
    def pay(m='cash', note=None):
        pg.locator(f'.tpanel .shm[data-m="{m}"]').click()
        if m == 'cash': pg.locator(f'.tpanel .shnote[data-v="{note}"]').click()
        pg.locator('.tpanel .shcf').click(); pg.wait_for_timeout(40)
    def seller(nid, buy, m='cash', note=None, wrong=False, stop=None):
        if not open_npc(nid): return False
        answer(wrong); menu(buy); answer(wrong); answer(wrong)
        if stop == 'pay': return True
        pay(m, note)
        if stop == 'paid': return True
        answer(wrong); answer(wrong); return True
    def bow(wrong=False):
        if not open_npc('bow'): return None
        out = [answer(wrong) for _ in range(5)]; return out

    # ---------- Hub ----------
    fresh(); card()
    ck('S01 Hub has a Free Shopping button (no longer "coming soon")', pg.locator('.hubb button.hubfree').count() == 1)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
    R = pg.evaluate("()=>SanorTown.shop")
    ck('T01/T02/T04 price registry = owner prices, all confirmed', {k: v['p'] for k, v in R.items()} == {'rice_reg': 25, 'rice_big': 30, 'noodle_soup': 25, 'guayjub': 25, 'water': 5, 'meatball': 5, 'bubble': 20, 'lemontea': 20, 'cocoa': 20} and all(v['st'] == 'confirmed' for v in R.values()))
    ck('Talk has 20 turns (4 NPC x 5)', pg.evaluate("()=>SanorTown.SCENES.find(s=>s.id==='canteen').npcs.map(n=>n.turns.length).join()") == '5,5,5,5')

    # ---------- Guided: rice large + cash 50 (change 20), then drink, Bow ----------
    guided()
    ck('G01 wallet starts at 50 baht', '50' in pg.locator('.twal').inner_text())
    ck('G02 drinks before the meal is blocked', not open_npc('drinks'))
    open_npc('rice'); answer(); shot('menu0')
    pg.locator('.tpanel .shrow[data-id="rice_reg"] .shplus').click(); pg.locator('.tpanel .shrow[data-id="rice_big"] .shplus').click()
    ck('T01 regular 25 + large 30 = 55, over budget: Order disabled + warning', pg.locator('.tpanel .shtot').inner_text() == '55 ฿' and pg.locator('.tpanel .shok').is_disabled() and 'enough money' in pg.locator('.tpanel .shwarn').inner_text())
    pg.locator('.tpanel .shrow[data-id="rice_reg"] .shminus').click()
    ck('T01 large only = 30; changing the cart charged nothing', pg.locator('.tpanel .shtot').inner_text() == '30 ฿' and g("g.tx.length") == 0 and '50' in pg.locator('.twal').inner_text())
    shot('menu'); pg.locator('.tpanel .shok').click()
    o = answer(); ck('D01 turn 2 answer follows the cart (large)', o[0] == 'Large, please.', o)
    o = g("g.cur()"); ck('D02 turn 3 repeats the real order', 'a large plate of rice and curry' in g("g.panel.querySelector('.ten').textContent"))
    answer(); shot('pay')
    ck('T06 cash notes offered: 30 and 50 only (wallet 50)', pg.locator('.tpanel .shm[data-m=cash]').click() or [pg.locator('.tpanel .shnote').nth(i).get_attribute('data-v') for i in range(pg.locator('.tpanel .shnote').count())] == ['30', '50'])
    pg.locator('.tpanel .shnote[data-v="50"]').click()
    ck('T06 change shown: 50 − 30 = 20', '20' in pg.locator('.tpanel .shchg').inner_text()); shot('cash')
    pg.locator('.tpanel .shcf').dblclick(); pg.wait_for_timeout(100)
    ck('T08 double tap on Pay writes ONE transaction', g("g.tx.length") == 1 and len(sv().get('shop', {}).get('canteen', {}).get('tx', [])) == 1)
    ck('G03 wallet 20 after paying', '20' in pg.locator('.twal').inner_text())
    o = g("g.cur()"); ck('D03 turn 4 says the note given', o[0] == "Here's fifty baht.", o)
    pg.locator('.tpanel .topt').filter(has_text=o[1]).first.click()
    ck('T09 wrong answer shows WHY + hint', 'Not quite' in pg.locator('.tpanel .tfb').inner_text() and '50 บาท' in pg.locator('.tpanel .tfb').inner_text())
    pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click(); pg.locator('.tpanel .tnext').click()
    o = g("g.cur()"); ck('D04 turn 5 checks the change (twenty)', o[0] == "Thank you! Twenty baht. That's right.", o)
    # refresh in the middle (T08): reload now, before finishing turn 5
    pg.reload(); ready(); guided()
    ck('T08 refresh after paying: still ONE payment, wallet 20', len(sv()['shop']['canteen']['tx']) == 1 and '20' in pg.locator('.twal').inner_text())
    open_npc('rice'); ck('T08 reopening Auntie Pen continues after the payment (turn 4)', g("g.dlg.i") == 3 and g("g.cur()[0]") == "Here's fifty baht.")
    answer(); answer()
    ck('G04 1/3 star after Auntie Pen; noodle shop now closed', '1 / 3' in g("g.stars()") and not open_npc('noodle'))
    # Ms. Kaew: 20 left → bubble + water = 25 too much
    open_npc('drinks'); answer()
    pg.locator('.tpanel .shrow[data-id="bubble"] .shplus').click(); pg.locator('.tpanel .shrow[data-id="water"] .shplus').click()
    ck('T06 not enough money: 25 > 20, Order disabled', pg.locator('.tpanel .shok').is_disabled() and 'enough money' in pg.locator('.tpanel .shwarn').inner_text())
    pg.locator('.tpanel .shrow[data-id="bubble"] .shminus').click(); pg.locator('.tpanel .shrow[data-id="meatball"] .shplus').click(); pg.locator('.tpanel .shrow[data-id="meatball"] .shplus').click()
    ck('T03 water 5 + meatball x2 (10) = 15', pg.locator('.tpanel .shtot').inner_text() == '15 ฿')
    pg.locator('.tpanel .shok').click(); o = answer(); ck('D05 Ms. Kaew turn 2 lists the real cart', o[0] == 'A bottle of water and two meatball skewers, please.', o)
    answer(); pay('qr'); shot('qrdone')
    ck('T07 SAMPLE QR shown, no camera/bank, no links', pg.evaluate("window.__cam") == 0 and pg.locator('.tpanel a').count() == 0)
    o = g("g.cur()"); ck('D06 QR turn 4', o[0] == "I'll pay by QR code, please.", o); answer()
    o = g("g.cur()"); ck('D07 QR turn 5: no change', o[0] == 'Thank you! Have a nice day.' and 'change' in o[1]); answer()
    ck('G05 wallet 5 (50 − 30 − 15), never negative', '5 ฿' in pg.locator('.twal').inner_text())
    out = bow()
    ck('T05 Bow says what was really bought', out and out[1][0] == 'I got a large plate of rice and curry, a bottle of water and two meatball skewers.', out and out[1])
    ck('T05 Bow total 45 / left 5', out and out[2][0] == 'It was forty-five baht all together.' and out[3][0] == 'I have five baht left.', out and (out[2][0], out[3][0]))
    pg.wait_for_timeout(600)
    ck('G06 win: 3/3, spent 45, left 5', pg.locator('.twin').is_visible() and 'spent 45 baht and have 5 baht left' in pg.locator('.twin').inner_text())
    ck('G07 XP 40 once (canteen first completion)', pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == 40)
    ck('T09 "not a speaking grade" note still on the win card', 'not a speaking grade' in pg.locator('.twin').inner_text()); shot('win')
    s = sv(); ck('G08 saved payments = 2, none open', len(s['shop']['canteen']['tx']) == 2 and all(t['fin'] for t in s['shop']['canteen']['tx']))
    ck('G09 numbers with prices are not added to Phrases', not any('baht' in x for x in s['phrases']))
    # CS-4: the Guided win is shown in the Hub's My results (Talk row)
    pg.evaluate("()=>SanorTown.g.close()"); pg.wait_for_timeout(400); card(); pg.locator('.hubresb').click(); pg.wait_for_timeout(200)
    tt = pg.locator('.hubrrow[data-mode=talk]').inner_text(); shot('results')
    ck('G11 My results: Talk 3/3 stars, last mission first-try result, 40 XP (12 turns here: the page was refreshed after paying)', '3 / 3' in tt and 'first try 12 / 12' in tt and '40 XP' in tt and 'Completed' in tt, tt)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200)

    # ---------- Cancel / Back = no charge (T08) ----------
    fresh(); guided()
    seller('noodle', {'guayjub': 1}, stop='pay'); pg.locator('.tpanel .shno').click()
    ck('T08 Cancel on the pay screen: no payment', g("g.tx.length") == 0 and not sv().get('shop'))
    open_npc('noodle'); answer(); menu({'noodle_soup': 1}); pg.keyboard.press('Escape'); pg.wait_for_timeout(100)
    ck('T08 Esc while ordering: no payment', g("g.tx.length") == 0)
    # Practise missed uses the same purchase
    seller('noodle', {'noodle_soup': 1}, 'qr', wrong=True)
    seller('drinks', {'cocoa': 1}, 'cash', 20, wrong=True)
    bow(wrong=True); pg.wait_for_timeout(600)
    ck('G10 noodle + QR route: spent 45, left 5', 'spent 45 baht and have 5 baht left' in pg.locator('.twin').inner_text())
    pr = pg.locator('.twin .tprac')
    ck('T09 Practise missed is offered', pr.count() == 1); pr.click(); pg.wait_for_timeout(100)
    seen = []
    for _ in range(25):
        if not g("!!g.dlg"): break
        o = g("g.cur()"); seen.append(o[0]); pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click(); pg.locator('.tpanel .tnext').click(); pg.wait_for_timeout(30)
    ck('T09 practice replays the same purchase lines', "I got a bowl of noodle soup and an iced cocoa." in seen and 'It was forty-five baht all together.' in seen, seen[:6])

    # ---------- old save (3-turn build) still works ----------
    fresh(json.dumps({'done': {'canteen': {'rice': 1, 'drinks': 1}}, 'phrases': [], 'pick': {'canteen': 'rice'}}))
    guided()
    ck('M01 old save: 2/3 kept, wallet 20 (25 + 5 old purchase)', '2 / 3' in g("g.stars()") and '20' in pg.locator('.twal').inner_text())
    out = bow(); ck('M02 Bow uses the old purchase', out and out[1][0] == 'I got a plate of rice and curry and a bottle of water.' and out[3][0] == 'I have twenty baht left.', out and out[1][0])

    # ---------- Free Shopping ----------
    fresh(); free(); shot('free0')
    ck('F01 Free: badge shown, no stars, no mission card', 'Free Shopping' in pg.locator('.ttitle').inner_text() and pg.locator('.tstars').is_hidden() and pg.locator('.tmis').count() == 0)
    ck('F02 Bow first: blocked until something is bought', not open_npc('bow'))
    seller('drinks', {'bubble': 2, 'meatball': 3}, 'cash', 100)
    seller('rice', {'rice_reg': 1, 'rice_big': 1}, 'qr')
    seller('noodle', {'noodle_soup': 1}, 'cash', 25)
    ck('F03 no budget: spent 135 shown', '135' in pg.locator('.twal').inner_text())
    seller('drinks', {'water': 1}, 'cash', 5)
    ck('F04 the same shop can be visited again', g("g.tx.length") == 4)
    out = bow()
    ck('T05 Free: Bow lists everything, total, how you paid', out and out[1][0] == 'I got a plate of rice and curry, a large plate of rice and curry, a bowl of noodle soup, a bottle of water, three meatball skewers and two bubble milk teas.'
       and out[2][0] == 'It was one hundred and forty baht all together.' and out[3][0] == 'I paid by cash and by QR code.', out and [x[0] for x in out[1:4]])
    pg.wait_for_timeout(300); shot('freesum')
    ck('F05 summary card: total 140, 4 payments', pg.locator('.twin').is_visible() and 'Total 140 baht' in pg.locator('.twin').inner_text() and '4 payments' in pg.locator('.twin').inner_text())
    s = sv()
    ck('F06 Free saves nothing (no stars, no payments, no XP, no phrases)', not s.get('done', {}).get('canteen') and not s.get('shop') and pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == 0 and not s.get('phrases'), s)

    # ---------- phone layout (T10) ----------
    fresh(); guided(); open_npc('drinks') or None
    open_npc('rice'); answer()
    small = pg.evaluate("[...document.querySelectorAll('.tpanel button')].filter(b=>{const r=b.getBoundingClientRect();return r.width>0&&(r.height<40||r.width<40)}).map(b=>b.textContent.trim().slice(0,16))")
    ck('T10 menu buttons are big enough to tap (>= 40px)', not small, small)
    ck('T10 no horizontal overflow in the menu', pg.evaluate("()=>{const p=document.querySelector('.tpanel');return p.scrollWidth<=p.clientWidth+1}"))
    ck('no page errors', not errs, errs[:3])
    b.close()
print('%d / %d OK' % (sum(res), len(res)))
sys.exit(0 if all(res) else 1)
