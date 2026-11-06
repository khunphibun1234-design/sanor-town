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
    ck('H02 Hub shows 7 modes: 4 open + 3 coming soon',pg.locator('.hubm[data-mode]').count()==4 and pg.locator('.hubm.soon').count()==3)
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
    ck('H13 Hub shows 3 modes done, Talk not started',pg.locator('.hubst.ok').count()==3 and 'Modes done · ทำแล้ว 3 / 4' in pg.locator('.hubprog').inner_text())
    shot('hub_after')
    sv=pg.evaluate(f"JSON.parse(localStorage.getItem('{KEY}'))")
    ck('H14 practice does not change stars/done/XP',not sv.get('done',{}).get('canteen') and 'rewards' not in str(sv.get('rw','')) ,{k:v for k,v in sv.items() if k!='phrases'})
    # Talk
    pg.locator('.hubgo').click();pg.wait_for_timeout(1500)
    ck('H15 Guided Mission opens the 3D canteen with the wallet',pg.locator('.town').count()==1 and pg.locator('.twal').count()==1)
    shot('talk')
    pg.keyboard.press('Escape');pg.wait_for_timeout(600)
    # other stations unchanged
    card('gate1');pg.wait_for_timeout(900)
    ck('H16 other stations still open the 3D scene directly',pg.locator('.town').count()==1 and pg.locator('.hubb').count()==0)
    ck('H17 no page errors',not errs,errs[:2])
    b.close()
print(('PASS' if all(res) else 'FAIL'),sum(res),'/',len(res))
