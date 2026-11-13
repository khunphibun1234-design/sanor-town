# Daily Missions Restricted LAN Preview gate (ST-MEX-001 V1.2, 13 Nov 2026): host access test matrix.
# Synthetic data only. Usage: python3 tools/town_lan.py [path/to/index.html]
# Each host is opened in a real browser; the page itself is served from the local file through a route,
# so location.hostname is the host under test. Checks whether the Daily mission card opens.
import sys, pathlib
from playwright.sync_api import sync_playwright
HTML = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'index.html').read_bytes()
res = []
def ck(n, ok, info=''):
    res.append(bool(ok)); print('PASS' if ok else 'FAIL', n, info if (not ok or info) else '')
OPEN = ['localhost', '127.0.0.1', '[::1]', '10.0.0.5', '10.255.255.254', '172.16.0.10', '172.31.255.1', '192.168.1.50', '192.168.0.1']
SHUT = ['khunphibun1234-design.github.io', '192.0.2.2', '8.8.8.8', '172.15.0.1', '172.32.0.1', '192.169.1.1', '11.0.0.1', '1.10.0.0',
        '192.168.1.50.evil.com', 'evil.com', '127.0.0.2', '169.254.1.1']
# strings a browser would never give as location.hostname (it rewrites or rejects them): checked on the gate function itself
RAW = ['010.0.0.1', '192.168.001.1', '192.168.1.256', '192.168.1', '0x0a.0.0.1', '192.168.1.50 ', '', 'LOCALHOST.', '::1', '10.0.0.1:80']
with sync_playwright() as p:
    b = p.chromium.launch(); errs = []
    def visit(host, query=''):
        ctx = b.new_context(**p.devices['iPhone 13']); pg = ctx.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.route('**/*', lambda r: r.fulfill(status=200, body=HTML, content_type='text/html') if r.request.resource_type == 'document' else r.abort())
        port = '' if host.endswith('github.io') else ':8000'
        pg.goto(f"{'https' if host.endswith('github.io') else 'http'}://{host}{port}/index.html{query}")
        pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
        pg.locator('.sxnav button', has_text='Missions').first.click(); pg.wait_for_timeout(400)
        out = (pg.evaluate("()=>location.hostname"), pg.evaluate("()=>SanorTown.daily.preview()"), pg.locator('[data-dm-card]').count())
        ctx.close(); return out
    for h in OPEN:
        hn, pv, card = visit(h); ck(f'open  {h:34} preview={pv} card={card}', pv is True and card == 1)
    for h in SHUT:
        hn, pv, card = visit(h); ck(f'shut  {h:34} preview={pv} card={card}', pv is False and card == 0)
    for q in ('?preview=1', '?dm=1&preview=true', '?pc=TEST'):
        hn, pv, card = visit('khunphibun1234-design.github.io', q); ck(f'shut  github.io{q:22} (query flag cannot open)', pv is False and card == 0)
    ctx = b.new_context(); pg = ctx.new_page(); pg.route('**/*', lambda r: r.fulfill(status=200, body=HTML, content_type='text/html') if r.request.resource_type == 'document' else r.abort())
    pg.goto('http://127.0.0.1:8000/index.html'); pg.wait_for_function("()=>!document.getElementById('stsplash')", timeout=20000)
    raw = pg.evaluate("a=>a.map(h=>SanorTown.daily.hostOK(h))", RAW); ctx.close()
    ck('raw  malformed host strings all refused by the gate ' + str(RAW), not any(raw), raw)
    ck('no page errors', not errs, errs[:3])
    b.close()
print(f'{sum(res)} / {len(res)} PASS')
