"""ST-SYS-001 MVP check: Missions + Rewards (School Canteen, XP + badge once only).
Usage: python3 tools/town_rewards.py http://localhost:8767/index.html
Covers MR-01..MR-11 and MR-14/15 from the spec where a browser can check them (MR-12/13 need real devices)."""
import sys, json
from playwright.sync_api import sync_playwright

KEY, OLD, RKEY, RW = 'sanor-town-app-v1', 'sanor-town-v1', 'sanor-town-research-v1', 'sanor-town-rewards-v1'
GID, BID = 'story.canteen.firstCompletion.v1', 'badge.canteen.lunch_master.v1'

def main():
    url = sys.argv[1]
    res, errs = [], []
    def check(name, ok, info=''):
        res.append(bool(ok)); print(('OK  ' if ok else 'FAIL'), name, info)
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--host-resolver-rules=MAP sanor.test 127.0.0.1:8767', '--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.on('pageerror', lambda e: errs.append(str(e)))
        def fresh(store=None):
            pg.goto(url, wait_until='load')
            pg.evaluate("s=>{localStorage.clear();for(const k in s)localStorage.setItem(k,s[k])}", store or {})
            pg.reload(wait_until='load'); pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=12000)
        st = lambda: pg.evaluate("()=>SanorTown.rw.canteen()")
        rw = lambda: pg.evaluate("k=>localStorage.getItem(k)", RW)
        def sheet(btn):
            pg.locator('.sxnav button', has_text=btn).first.click(); pg.wait_for_timeout(250)
            return pg.locator('.mrs')
        def close_sheet():
            pg.keyboard.press('Escape'); pg.wait_for_timeout(150)
        def open_canteen():
            tab = pg.locator('.ttabs [role=tab]')
            for i in range(tab.count()):
                tab.nth(i).click(); pg.wait_for_timeout(120)
                if pg.locator('button[data-scene="canteen"]').count(): break
            pg.locator('button[data-scene="canteen"]').first.click(); pg.wait_for_timeout(900)
            if pg.locator('.hubb .hubgo').count():  # canteen Hub (ST-UX-007): start the Guided Mission
                pg.locator('.hubb .hubgo').click(); pg.wait_for_timeout(900)
            sk = pg.get_by_role('button', name='Skip')
            if sk.count(): sk.first.click(); pg.wait_for_timeout(200)
        def talk(nid, pick):
            k = pg.evaluate("id=>SanorTown.g.npcs.findIndex(n=>n.id===id)", nid)
            if not pg.evaluate("k=>{const g=SanorTown.g;g.openDlg(g.npcs[k]);return !!g.dlg}", k): return False
            for _ in range(30):  # CS-3: the sellers open a menu and a pay screen between turns
                if not pg.evaluate("()=>!!SanorTown.g.dlg"): break
                pg.wait_for_timeout(50)
                if pg.locator('.tpanel .shmenu').count():
                    pg.locator('.tpanel .shplus').first.click(); pg.locator('.tpanel .shok').click(); continue
                if pg.locator('.tpanel .shpay').count():
                    pg.locator('.tpanel .shm[data-m=cash]').click(); pg.locator('.tpanel .shnote').first.click(); pg.locator('.tpanel .shcf').click(); continue
                o = pg.evaluate("()=>SanorTown.g.cur()")
                pg.locator('.tpanel .topt').filter(has_text=o[0]).first.click()
                pg.locator('.tpanel .tnext').click()
            pg.wait_for_timeout(250); return True

        # MR-01 navigation + empty state
        fresh()
        before = pg.evaluate("k=>localStorage.getItem(k)", KEY)
        m = sheet('Missions')
        check('MR-01 Missions opens as a dialog', m.count() == 1 and m.get_attribute('aria-modal') == 'true')
        check('MR-01 first visit shows 0/3, Not started, no XP', st()['n'] == 0 and 'Not started' in m.inner_text() and rw() is None)
        # ST-MEX-001: in the local preview only (localhost), the Daily missions row has one "Open preview" button; on the site there is none
        pv = pg.evaluate("()=>SanorTown.daily.preview()")
        check('MR-14 future missions are labelled, not buttons' + (' (local preview: Daily missions has its preview button only)' if pv else ''),
              pg.locator('.mrs .mrfut li').count() == 4 and pg.locator('.mrs .mrfut button').count() == (1 if pv else 0) and pg.locator('.mrs .mrfut button[data-act=dm-open]').count() == (1 if pv else 0))
        close_sheet()
        check('MR-01 Esc closes and Home is still there', pg.locator('.mrs').count() == 0 and pg.locator('.sxnav').count() == 1)
        r = sheet('Rewards')
        check('MR-01 Rewards opens, 0 XP, badge locked', '0' in pg.locator('.mrxp b').inner_text() and pg.locator('.mrbadges li.on').count() == 0)
        check('MR-16/FR-016 XP is not called a test or speaking score', 'not a test score' in r.inner_text())
        check('Coins / Levels / Leaderboard shown as not available', r.inner_text().count('Not available') == 3)
        close_sheet()
        check('MR-09 opening the sheets does not change the game save', pg.evaluate("k=>localStorage.getItem(k)", KEY) == before)

        # MR-03 rice route, MR-05 invalid order, MR-06 grant once
        open_canteen()
        check('MR-05 water before the meal is blocked', not talk('drinks', 'rice') and st()['n'] == 0)
        check('MR-05 Bow before the meal is blocked', not talk('bow', 'rice') and rw() is None)
        talk('rice', 'rice'); s1 = st()
        talk('drinks', 'rice'); s2 = st()
        check('MR-03 rice route 1/3 then 2/3, no reward yet', s1['n'] == 1 and s2['n'] == 2 and rw() is None, '%s %s' % (s1['n'], s2['n']))
        talk('bow', 'rice'); pg.wait_for_timeout(1200)
        L = json.loads(rw() or '{}')
        check('MR-06 3/3 gives one grant of 40 XP and the badge', st()['state'] == 'done' and list(L.get('grants', {})) == [GID] and L['grants'][GID]['xp'] == 40 and BID in L.get('badges', {}))
        check('FR-014 reward toast shown once', '40 XP' in (pg.locator('#toast').inner_text() or ''))
        # MR-07 replay and refresh
        pg.locator('.twin button', has_text='Play again').first.click(); pg.wait_for_timeout(500)
        hm = pg.get_by_role('button', name='Skip')
        if hm.count(): hm.first.click()
        close_btn = pg.locator('.tmgo,.tmskip')
        if close_btn.count(): close_btn.first.click(); pg.wait_for_timeout(200)
        talk('noodle', 'noodle'); talk('drinks', 'noodle'); talk('bow', 'noodle'); pg.wait_for_timeout(1200)
        L2 = json.loads(rw() or '{}')
        check('MR-07 replay with the other meal adds no XP', L2 == L, str(L2.get('grants', {}).keys()))
        pg.reload(wait_until='load'); pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=12000)
        check('MR-07 refresh keeps 40 XP and the badge', pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == 40 and st()['state'] == 'done')
        check('MR-07 calling the grant again returns "had"', pg.evaluate("g=>SanorTown.rw.grant(g)", GID) == 'had' and json.loads(rw()) == L)
        sheet('Rewards')
        check('Rewards shows 40 XP and the badge earned', pg.locator('.mrxp b').inner_text() == '40' and pg.locator('.mrbadges li.on').count() == 1)
        close_sheet()
        check('MR-10 research key never created', pg.evaluate("k=>localStorage.getItem(k)", RKEY) is None)
        check('MR-09 old key never created', pg.evaluate("k=>localStorage.getItem(k)", OLD) is None)

        # MR-04 noodle route on a fresh phone
        fresh(); open_canteen()
        talk('noodle', 'noodle'); talk('drinks', 'noodle'); talk('bow', 'noodle'); pg.wait_for_timeout(1200)
        L = json.loads(rw() or '{}')
        check('MR-04 noodle route gives the same single grant', list(L.get('grants', {})) == [GID] and L['grants'][GID]['xp'] == 40)

        # MR-09 / owner decision 3: an old save already 3/3, no rewards key -> Completed earlier, no XP
        old = json.dumps({'done': {'canteen': {'rice': 1, 'drinks': 1, 'bow': 1}, 'gate1': {'guard': 1}}, 'phrases': ['Hi'], 'pick': {'canteen': 'rice'}})
        fresh({KEY: old})
        m = sheet('Missions')
        check('Decision 3: old 3/3 save shows Completed earlier and no XP', st()['state'] == 'earlier' and 'Completed earlier' in m.inner_text() and rw() is None)
        close_sheet()
        check('MR-09 old save unchanged', json.loads(pg.evaluate("k=>localStorage.getItem(k)", KEY)) == json.loads(old))

        # MR-08 corrupt rewards key
        fresh({KEY: old, RW: '{not json'})
        sheet('Rewards')
        check('MR-08 corrupt rewards key: 0 XP, no crash, nothing invented', pg.locator('.mrxp b').inner_text() == '0' and not errs)
        close_sheet()
        fresh({RW: json.dumps({'schemaVersion': 1, 'grants': {GID: {'xp': 'lots'}}, 'badges': {}})})
        check('MR-08 bad XP value counts as 0', pg.evaluate("()=>SanorTown.rw.xp(SanorTown.rw.read())") == 0)

        # FR-008 storage failure: no XP is reported
        fresh()
        r = pg.evaluate("""g=>{const o=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='sanor-town-rewards-v1')throw new Error('quota');return o.call(this,k,v)};
          const x=SanorTown.rw.grant(g);Storage.prototype.setItem=o;return [x,localStorage.getItem('sanor-town-rewards-v1')]}""", GID)
        check('FR-008 save failure returns fail and stores nothing', r[0] == 'fail' and r[1] is None)

        check('no page errors', not errs, str(errs[:2]))
        b.close()
    sys.exit(0 if all(res) else 1)

if __name__ == '__main__':
    main()
