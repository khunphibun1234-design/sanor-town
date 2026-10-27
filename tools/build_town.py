"""Build the standalone Sanor Town app from the main app (step 1b: move as-is)."""
import json, os, re, shutil, sys
SRC, DST, BUILD = sys.argv[1], sys.argv[2], sys.argv[3]
L = open(os.path.join(SRC, 'index.html'), encoding='utf-8').read().split('\n')
def find(pat, start=0):
    for i in range(start, len(L)):
        if re.search(pat, L[i]): return i
    raise SystemExit('not found: ' + pat)
# locate blocks by content, not by line number
st_a = find(r'^<style>$'); st_b = find(r'^</style>$', st_a)
h_a = find(r'^/\* ============ HELPERS ============ \*/'); h_b = find(r'^/\* ============ STORAGE', h_a)
s_a = find(r'^/\* ============ SOUND ============ \*/'); s_b = find(r'^function recognize\(', s_a)
t_a = find(r'^/\* ============ SANOR TOWN'); t_b = find(r'^\}\)\(\);$', t_a)
inline_css = L[find(r'^<style>:root\{color-scheme')]
style = '\n'.join(L[st_a:st_b + 1])
helpers = '\n'.join(L[h_a:h_b]).rstrip()
sound = '\n'.join(L[s_a:s_b]).rstrip()
town = '\n'.join(L[t_a:t_b + 1])
# sound: new build number
n = len(re.findall(r"^const BUILD='\w+';", sound, re.M)); assert n == 1
sound = re.sub(r"^const BUILD='\w+';", "const BUILD='%s';" % BUILD, sound, flags=re.M)
# town: new progress key, copy once from the main app's key (read only, never written or removed)
old = ("const KEY='sanor-town-v1';\nlet SAVE={done:{},phrases:[]};\n"
       "try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&r.done)SAVE=r}catch(e){}\n"
       "const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(SAVE))}catch(e){}};")
assert town.count(old) == 1, 'save block changed in the main app'
new = ("/* own key for this app. The first time, progress is copied from the Town inside Sanor English World\n"
       "   (same website, same phone/browser). The old key is only read: never changed or removed. */\n"
       "const KEY='sanor-town-app-v1',OLD_KEY='sanor-town-v1';\nlet SAVE={done:{},phrases:[]};\n"
       "const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(SAVE))}catch(e){}};\n"
       "try{const r=JSON.parse(localStorage.getItem(KEY)||'null');if(r&&r.done)SAVE=r;\n"
       " else{const o=JSON.parse(localStorage.getItem(OLD_KEY)||'null');if(o&&o.done){SAVE=o;if(!Array.isArray(SAVE.phrases))SAVE.phrases=[]}persist()}}catch(e){}")
town = town.replace(old, new)
head = '''<!doctype html><html lang="en"><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Sanor Town | ฝึกพูดภาษาอังกฤษในเมืองจำลอง</title>
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" type="image/png" sizes="192x192" href="sanor-icon-192.png"><link rel="apple-touch-icon" sizes="180x180" href="sanor-icon-180.png"><meta name="apple-mobile-web-app-title" content="Sanor Town"><meta name="application-name" content="Sanor Town">
<meta name="description" content="Sanor Town: walk around a small town and talk to people in English. For Grade 8 (M.2) students.">
''' + inline_css + '''
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&display=swap">
''' + style + '''
<style>
/* this app only: small footer under the town */
.tfoot{max-width:520px;margin:18px auto 0;padding:12px 14px 28px;text-align:center;font-size:.8rem;color:#5b6474;line-height:1.6}
.tfoot b{color:#1f2937}
</style>
<div class="wrap" id="app"></div>
<footer class="tfoot">พัฒนาโดย <b>นายเสนาะ คำเสียง</b> โรงเรียนพิบูลมังสาหาร<br>ความก้าวหน้าเก็บในเครื่องนี้เท่านั้น ไม่ส่งไปที่ใด<br>© 2026 Sanor Town · build <span id="fbuild"></span></footer>
<div id="toast" hidden></div>
<script>
/* Sanor Town: standalone app. Moved from Sanor English World (the Town section) without changing the content.
   No libraries. No network calls except loading the voice files from this website. */
'''
boot = '''
/* ============ START ============ */
{const box=el('div',{class:'tinline'});$('#app').append(box);SanorTown.mount(box)}
{const fb=document.getElementById('fbuild');if(fb)fb.textContent=BUILD}
</script>
</body></html>
'''
out = head + helpers + '\n\n' + sound + '\n\n' + town + '\n' + boot
os.makedirs(os.path.join(DST, 'voice'), exist_ok=True)
open(os.path.join(DST, 'index.html'), 'w', encoding='utf-8').write(out)
# voice: T_ bundles + the lesson bundles that hold a few shared Town lines (listed in need.json)
need = json.load(open(sys.argv[4]))
idx = json.load(open(os.path.join(SRC, 'voice', 'index.json')))
keep = [b for b in idx['bundles'] if b.startswith('T_') or b in need]
remap = {idx['bundles'].index(b): i for i, b in enumerate(keep)}
clips = {k: [remap[v[0]]] + v[1:] for k, v in idx['clips'].items() if v[0] in remap}
json.dump({'v': idx['v'], 'bundles': keep, 'clips': clips}, open(os.path.join(DST, 'voice', 'index.json'), 'w'), separators=(',', ':'))
for b in keep: shutil.copy2(os.path.join(SRC, 'voice', b + '.mp3'), os.path.join(DST, 'voice', b + '.mp3'))
for f in ['sanor-icon-180.png', 'sanor-icon-192.png', 'sanor-icon-512.png']: shutil.copy2(os.path.join(SRC, f), os.path.join(DST, f))
m = json.load(open(os.path.join(SRC, 'manifest.webmanifest')))
m.update(name='Sanor Town', short_name='Sanor Town', description='Walk around a small town and talk in English (Grade 8)')
json.dump(m, open(os.path.join(DST, 'manifest.webmanifest'), 'w'), indent=1, ensure_ascii=False)
print('lines', out.count('\n'), 'bytes', len(out.encode()), 'bundles', len(keep), 'clips', len(clips))
print('blocks', dict(style=(st_a+1, st_b+1), helpers=(h_a+1, h_b), sound=(s_a+1, s_b), town=(t_a+1, t_b+1)))
