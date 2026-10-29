"""town_e2e.py — play the standalone Sanor Town app like a student (headless browser).

Usage: python3 town_e2e.py URL [--scene market] [--novoice id,id]
Checks: progress copy from the main app's key (once, old key untouched), tap a place on the map,
talk to every NPC in that place (one wrong answer, then the right one), win screen, stars saved,
back to map shows Done, Passport and Review phrases open, every spoken line has a voice clip and
every voice file loads. Exit 0 = all OK.
"""
import sys, json
from playwright.sync_api import sync_playwright

NEW_KEY, OLD_KEY = 'sanor-town-app-v1', 'sanor-town-v1'

def main():
    url = sys.argv[1]
    scene = sys.argv[sys.argv.index('--scene') + 1] if '--scene' in sys.argv else 'market'
    novoice = sys.argv[sys.argv.index('--novoice') + 1].split(',') if '--novoice' in sys.argv else []
    res, errs = [], []
    def check(name, ok, info=''):
        res.append(bool(ok)); print(('OK  ' if ok else 'FAIL'), name, info)
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        # A. progress copy from the main app (same website = same storage)
        ctx = b.new_context(viewport={'width': 390, 'height': 844}); pg = ctx.new_page()
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url, wait_until='load')
        old = {'done': {'school': {'x': 1}}, 'phrases': ['Here you are.', 'You too. Goodbye!', 'Medium, please.']}
        pg.evaluate("([k,n,v])=>{localStorage.clear();localStorage.setItem(k,JSON.stringify(v))}", [OLD_KEY, NEW_KEY, old])
        pg.reload(wait_until='load'); pg.wait_for_timeout(1500)
        ls = pg.evaluate("([a,b])=>[localStorage.getItem(a),localStorage.getItem(b)]", [OLD_KEY, NEW_KEY])
        check('A1 old progress copied to the new key', ls[1] and json.loads(ls[1]) == old)
        check('A2 old key unchanged', ls[0] and json.loads(ls[0]) == old)
        pg.evaluate("k=>{const s=JSON.parse(localStorage.getItem(k));s.phrases.push('NEW');localStorage.setItem(k,JSON.stringify(s))}", NEW_KEY)
        pg.reload(wait_until='load'); pg.wait_for_timeout(1000)
        again = json.loads(pg.evaluate("k=>localStorage.getItem(k)", NEW_KEY))
        check('A3 copy happens only once (new key not overwritten later)', 'NEW' in again['phrases'])
        # B. fresh phone: nothing to copy
        pg.evaluate("()=>localStorage.clear()"); pg.reload(wait_until='load'); pg.wait_for_timeout(1000)
        ls = pg.evaluate("([a,b])=>[localStorage.getItem(a),localStorage.getItem(b)]", [OLD_KEY, NEW_KEY])
        check('B1 fresh phone: new key empty, old key not created', ls[0] is None and json.loads(ls[1]) == {'done': {}, 'phrases': []})
        # C. tap a place and talk to everyone
        sc = pg.evaluate("id=>{const s=SanorTown.SCENES.find(x=>x.id===id);return {name:s.name,group:s.group,n:s.npcs.length}}", scene)
        tab = pg.locator('.ttabs [role=tab]')
        for i in range(tab.count()):  # open the tab that holds this place
            tab.nth(i).click(); pg.wait_for_timeout(150)
            if pg.locator('button.pl[aria-label^="%s,"]' % sc['name']).count(): break
        pg.locator('button.pl[aria-label^="%s,"]' % sc['name']).first.click(); pg.wait_for_timeout(800)
        check('C1 tapping the place on the map opens it', pg.evaluate("()=>!!(SanorTown.g&&SanorTown.g.sc)"), sc['name'])
        talked, bad_fb = 0, 0
        for k in range(sc['n']):
            turns = pg.evaluate("k=>{const g=SanorTown.g;g.openDlg(g.npcs[k]);return g.npcs[k].turns.map(t=>t.o)}", k)
            for i, o in enumerate(turns):
                pg.wait_for_timeout(60)
                pg.locator('.tpanel .topt', has_text=o[1]).first.click()
                if 'bad' not in (pg.locator('.tpanel .tfb').get_attribute('class') or ''): bad_fb += 1
                pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click()
                pg.locator('.tpanel .tnext').click()
            talked += 1
        pg.wait_for_timeout(300)
        check('C2 a wrong answer shows "Not quite" each time', bad_fb == 0)
        check('C3 talked to every person', talked == sc['n'], '%d/%d' % (talked, sc['n']))
        check('C4 win screen shows', pg.locator('.twin').is_visible())
        saved = json.loads(pg.evaluate("k=>localStorage.getItem(k)", NEW_KEY))
        check('C5 stars saved to the new key', len(saved['done'].get(scene, {})) == sc['n'], str(len(saved['done'].get(scene, {}))))
        check('C6 correct answers saved as phrases', len(saved['phrases']) > 0, str(len(saved['phrases'])))
        check('C7 old key still not created', pg.evaluate("k=>localStorage.getItem(k)", OLD_KEY) is None)
        pg.locator('.twin button', has_text='Back to map').click(); pg.wait_for_timeout(500)
        check('C8 back on the map, place shows Done', pg.locator('button.pl.full[aria-label^="%s,"]' % sc['name']).count() == 1)
        # D. passport and review
        pg.locator('button', has_text='Passport').first.click(); pg.wait_for_timeout(300)
        check('D1 Passport opens', pg.locator('.sheet').count() > 0)
        rv = pg.locator('.sheet button', has_text='Review phrases')
        if rv.count() and rv.first.is_enabled():
            rv.first.click(); pg.wait_for_timeout(300)
            check('D2 Review phrases opens', pg.locator('[aria-label="Review phrases"]').count() > 0)
        else:
            check('D2 Review phrases opens', False, 'button missing or disabled')
        # E. voices
        v = pg.evaluate("""async(nv)=>{for(let i=0;i<40&&!VC.idx;i++)await new Promise(r=>setTimeout(r,100));
          if(!VC.idx)return {err:'no index'};let miss=[];
          let nvm=0;for(const s of SanorTown.SCENES)for(const n of s.npcs)for(const t of n.turns)for(const x of [t.npc,t.o[0]])if(!vcFind(x,false)){if(nv.includes(s.id))nvm++;else miss.push(x)}
          const bad=[];for(const bn of VC.idx.bundles){const r=await fetch('voice/'+bn+'.mp3?v='+BUILD,{method:'HEAD'});if(!r.ok)bad.push(bn)}
          return {miss,bad,n:VC.idx.bundles.length,nvm}}""", novoice)
        check('E1 every NPC line and correct answer has a voice clip', not v.get('err') and not v['miss'], str(v.get('err') or v['miss'][:3]) + ('  (no AI voice yet, uses phone voice: %d lines in %s)' % (v.get('nvm', 0), ','.join(novoice)) if novoice else ''))
        check('E2 every voice file loads', not v.get('err') and not v['bad'], '%s files' % v.get('n'))
        check('E3 no page errors', not errs)
        b.close()
    print('errs', errs)
    sys.exit(0 if all(res) else 1)

if __name__ == '__main__':
    main()
