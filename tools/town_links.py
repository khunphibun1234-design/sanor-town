"""town_links.py — walk between linked scenes (exits) in a headless browser.

Usage: python3 town_links.py URL
Checks every exit of every scene: put the player just before the exit area, walk into it,
and confirm the next scene opens at the expected spot. Exit 0 = all OK.
"""
import sys, math
from playwright.sync_api import sync_playwright

def main():
    url = sys.argv[1]; res = []; errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 844, 'height': 390})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url, wait_until='load'); pg.wait_for_timeout(1500)
        links = pg.evaluate("SanorTown.SCENES.flatMap(s=>(s.exits||[]).map((e,i)=>({from:s.id,i,to:e.to,e})))")
        for L in links:
            e = L['e']
            pg.evaluate("id=>{SanorTown.close();SanorTown.unmount();SanorTown.openScene(id,'test')}", L['from']); pg.wait_for_timeout(600)
            cx, cz = (e['x0'] + e['x1']) / 2, (e['z0'] + e['z1']) / 2
            pg.evaluate("([x,z])=>{const g=SanorTown.g;g.P.x=x;g.P.z=z}", [cx, cz]); pg.wait_for_timeout(1200)
            sid = pg.evaluate("SanorTown.g&&SanorTown.g.sc.id")
            at = e.get('at')
            pos = pg.evaluate("[SanorTown.g.P.x,SanorTown.g.P.z]") if sid else None
            ok = sid == L['to'] and (not at or (abs(pos[0] - at[0]) < .6 and abs(pos[1] - at[1]) < .6))
            res.append(ok); print(('OK  ' if ok else 'FAIL'), '%s exit %d -> %s' % (L['from'], L['i'], L['to']), 'got', sid, pos)
        b.close()
    print('links', len(res), 'errs', errs)
    sys.exit(0 if all(res) and res and not errs else 1)

if __name__ == '__main__':
    main()
