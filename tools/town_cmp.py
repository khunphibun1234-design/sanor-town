"""town_cmp.py — compare Sanor Town scene data between an old and a new build.

Usage: python3 town_cmp.py OLD_URL NEW_URL [--allow o1,o2] [--scenes id,id,...]
  --allow   fields that may change (default: o1,o2 = the two wrong options)
            field names: npc, th, o0 (correct), o1, o2, hint, ok
  --scenes  only these scenes may change (default: any scene)
Exit code 0 = PASS, 1 = FAIL.
"""
import sys, json
from playwright.sync_api import sync_playwright

EXTRACT = """()=>SanorTown.SCENES.map(s=>({id:s.id,group:s.group||null,sub:s.sub||null,
 npcs:(s.npcs||[]).map(n=>({id:n.id,name:n.name,turns:(n.turns||[]).map(t=>({
  npc:t.npc,th:t.th,o0:(t.o||[])[0],o1:(t.o||[])[1],o2:(t.o||[])[2],n_o:(t.o||[]).length,hint:t.hint,ok:t.ok}))}))}))"""

def load(pw, url):
    b = pw.chromium.launch(); pg = b.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(url, wait_until='load'); pg.wait_for_timeout(1500)
    data = pg.evaluate(EXTRACT); b.close()
    return data, errs

def main():
    a = sys.argv[1:]
    old_url, new_url = a[0], a[1]
    allow = set('o1,o2'.split(','))
    scenes = None
    if '--allow' in a: allow = set(a[a.index('--allow') + 1].split(','))
    if '--scenes' in a: scenes = set(a[a.index('--scenes') + 1].split(','))
    with sync_playwright() as pw:
        old, e1 = load(pw, old_url); new, e2 = load(pw, new_url)
    fails = []
    if e1 or e2: fails.append('page errors: old=%s new=%s' % (e1, e2))
    if [s['id'] for s in old] != [s['id'] for s in new]:
        fails.append('scene list differs')
    changed = {}
    nturns = 0
    om = {s['id']: s for s in old}
    for s in new:
        o = om.get(s['id'])
        if not o: continue
        if (o['group'], o['sub']) != (s['group'], s['sub']): fails.append('%s group/sub changed' % s['id'])
        if [n['id'] for n in o['npcs']] != [n['id'] for n in s['npcs']]:
            fails.append('%s NPC list changed' % s['id']); continue
        for on, nn in zip(o['npcs'], s['npcs']):
            if on['name'] != nn['name']: fails.append('%s/%s name changed' % (s['id'], nn['id']))
            if len(on['turns']) != len(nn['turns']):
                fails.append('%s/%s turn count changed' % (s['id'], nn['id'])); continue
            for i, (ot, nt) in enumerate(zip(on['turns'], nn['turns'])):
                if nt['n_o'] != ot['n_o']: fails.append('%s/%s turn %d option count changed' % (s['id'], nn['id'], i + 1))
                if any(ot[f] != nt[f] for f in ('npc', 'th', 'o0', 'o1', 'o2', 'hint', 'ok')): nturns += 1
                for f in ('npc', 'th', 'o0', 'o1', 'o2', 'hint', 'ok'):
                    if ot[f] != nt[f]:
                        changed.setdefault(s['id'], set()).add(f)
                        if f not in allow:
                            fails.append('%s/%s turn %d: %s changed (not allowed)' % (s['id'], nn['id'], i + 1, f))
                        elif scenes is not None and s['id'] not in scenes:
                            fails.append('%s/%s turn %d: scene not in --scenes' % (s['id'], nn['id'], i + 1))
                if nt['o1'] in (nt['o0'], nt['o2']) or nt['o2'] == nt['o0']:
                    fails.append('%s/%s turn %d: duplicate options' % (s['id'], nn['id'], i + 1))
    print('scenes old=%d new=%d' % (len(old), len(new)))
    for k in sorted(changed): print('changed %s: %s' % (k, ','.join(sorted(changed[k]))))
    print('turns changed in total: %d' % nturns)
    for f in fails: print('FAIL', f)
    print('PASS' if not fails else 'FAIL (%d)' % len(fails))
    sys.exit(0 if not fails else 1)

if __name__ == '__main__':
    main()
