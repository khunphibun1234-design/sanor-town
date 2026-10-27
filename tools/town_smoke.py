"""town_smoke.py — open the app and every Sanor Town scene in a headless browser.

Usage: python3 town_smoke.py URL [--scenes N]   (N = expected scene count, default 36)
Prints one OK/FAIL line per check, then errs [...] (page errors). Exit 0 = all OK.
Uses SwiftShader (software WebGL). This proves the code runs; it says nothing
about speed or looks on a real phone.
"""
import sys, re
from playwright.sync_api import sync_playwright

def main():
    url = sys.argv[1]
    want = int(sys.argv[sys.argv.index('--scenes') + 1]) if '--scenes' in sys.argv else 36
    res, errs = [], []
    def check(name, ok, info=''):
        res.append(ok); print(('OK  ' if ok else 'FAIL'), name, info)
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url, wait_until='load'); pg.wait_for_timeout(2000)
        html = pg.content()
        build = pg.evaluate("typeof BUILD!=='undefined'?BUILD:null")
        m = re.search(r'cloud-config\.js\?v=(\w+)', html)
        check('1 BUILD set (and matches cloud-config.js?v= if the page loads it)', bool(build) and (not m or m.group(1) == build), '%s / %s' % (build, m and m.group(1)))
        n = pg.evaluate("SanorTown.SCENES.length")
        check('2 scene count', n == want, '%d (want %d)' % (n, want))
        bad = pg.evaluate("""()=>{const out=[];for(const s of SanorTown.SCENES){
          if(!s.npcs||!s.npcs.length){out.push(s.id+': no NPCs');continue}
          for(const nn of s.npcs){const t=nn.turns||[];if(!t.length)out.push(s.id+'/'+nn.id+': no turns');
            t.forEach((x,i)=>{if(!x.o||x.o.length!==3||x.o.some(v=>!v))out.push(s.id+'/'+nn.id+' turn '+(i+1)+': bad options');
              if(!x.npc||!x.hint)out.push(s.id+'/'+nn.id+' turn '+(i+1)+': missing text');
              if(x.o&&new Set(x.o).size!==x.o.length)out.push(s.id+'/'+nn.id+' turn '+(i+1)+': duplicate options')})}}
          return out}""")
        check('3 every turn has NPC line, hint, 3 different options', not bad, '; '.join(bad[:5]))
        ids = pg.evaluate("SanorTown.SCENES.map(s=>s.id)")
        dup = len(set(ids)) != len(ids)
        check('4 scene ids unique', not dup)
        failed = []
        for sid in ids:
            before = len(errs)
            ok = pg.evaluate("""id=>{try{SanorTown.unmount();SanorTown.openScene(id,'test');}catch(e){return 'throw '+e.message}
              return null}""", sid)
            pg.wait_for_timeout(400)
            st = pg.evaluate("""id=>{const g=SanorTown.g;const s=SanorTown.SCENES.find(x=>x.id===id);
              return g&&g.P&&g.npcs?(g.npcs.length===s.npcs.length?null:'npc count '+g.npcs.length):'no game state'}""", sid)
            if ok or st or len(errs) > before: failed.append('%s: %s' % (sid, ok or st or errs[-1][:80]))
            try: pg.evaluate("SanorTown.close&&SanorTown.close()")
            except Exception: pass
        check('5 every scene opens with player and all NPCs', not failed, '; '.join(failed[:5]))
        keys = pg.evaluate("Object.keys(localStorage)")
        check('6 localStorage keys', True, ','.join(sorted(keys)))
        check('7 no page errors', not errs)
        b.close()
    print('errs', errs)
    sys.exit(0 if all(res) else 1)

if __name__ == '__main__':
    main()
