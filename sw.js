/* Sanor Town offline support (task 9, 5 Nov 2026).
   - The page (index.html) is network-first: online players always get the newest build; offline players get the last copy.
   - Pictures, voice files, icons and the manifest are cache-first and refreshed in the background (stale-while-revalidate),
     so a station that was opened once keeps its pictures and voices offline.
   - Google Fonts are cached the same way. The visit counter (GoatCounter) is never cached.
   - Only GET requests are handled; everything else (and HEAD) goes straight to the network. */
const B = new URL(self.location).searchParams.get('b') || 'dev';
const SHELL = 'st-shell-' + B, ASSETS = 'st-assets', FONTS = 'st-fonts';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'sanor-town-icon-192.png', 'sanor-town-icon-512.png', 'sanor-town-icon-180.png', 'img/sanor-town-logo-light.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('st-shell-') && k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (name, req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(name).then(x => x.put(req, c)) } return res };
async function networkFirst(req) {
  try {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 6000);
    const res = await fetch(req, { signal: ctl.signal }); clearTimeout(t);
    if (res.ok) { const c = res.clone(); const s = await caches.open(SHELL); await s.put('index.html', c) }
    return res;
  } catch (err) {
    const hit = await caches.match('index.html', { cacheName: SHELL }) || await caches.match('index.html');
    if (hit) return hit;
    throw err;
  }
}
/* same-origin files are stored without their ?v=BUILD tag, so a new build does not keep a second copy of the 15 MB of voices;
   the background refresh still brings a changed file in on the next visit */
const keyOf = req => { const u = new URL(req.url); if (u.origin === self.location.origin) { u.search = ''; return u.href } return req };
async function staleWhileRevalidate(name, req) {
  const k = keyOf(req), hit = await caches.match(k, { cacheName: name });
  const net = fetch(req).then(res => put(name, k, res)).catch(() => null);
  return hit || (await net) || Response.error();
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || req.headers.has('range')) return;
  const u = new URL(req.url);
  if (u.origin === self.location.origin) {
    if (req.mode === 'navigate' || u.pathname.endsWith('/') || u.pathname.endsWith('/index.html')) { e.respondWith(networkFirst(req)); return }
    if (u.pathname.endsWith('/sw.js')) return;
    e.respondWith(staleWhileRevalidate(ASSETS, req)); return;
  }
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') { e.respondWith(staleWhileRevalidate(FONTS, req)); return }
  /* anything else (the visit counter) is left to the network */
});
