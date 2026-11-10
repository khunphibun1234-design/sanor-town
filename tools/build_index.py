"""build_index.py — make index.html from the source parts in src/ (task 10, 10 Nov 2026).

src/ holds the app in parts (joined in path order, nothing added or removed):
  00-shell-head.html      page, styles, splash, sound helpers (start of the main script)
  10-engine-core.js       Sanor Town engine: 3D helpers, TT / NPCDEF, signs
  20-scenes/NN-<id>.js    one file per scene (62): build, decals, NPCs and turns (+ the helpers just above it)
  30-content-tables.js    GROUP, MISSIONS, PREP, REAL, WHY, SUB, LOCKED
  40-engine-progress.js   save, Missions & Rewards, sheets
  50-content-hub.js       HUB data (Words / Listen per station)
  60-engine-ui.js         Hub modes, 3D player (playPlace), map, Passport, research log
  99-shell-end.html       end of the page
Edit src/, then run:  python3 tools/build_index.py           (writes index.html)
Check only:           python3 tools/build_index.py --check   (exit 1 if index.html is not the build of src/)
GitHub Pages still serves index.html, so commit both.
"""
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
OUT = os.path.join(ROOT, 'index.html')

def parts():
    out = []
    for d, _, files in os.walk(SRC):
        for f in files:
            if f.endswith(('.js', '.html')):
                out.append(os.path.relpath(os.path.join(d, f), SRC))
    return sorted(out, key=lambda p: p.replace(os.sep, '/'))

def build():
    return ''.join(open(os.path.join(SRC, p), encoding='utf-8', newline='').read() for p in parts())

if __name__ == '__main__':
    text = build()
    if '--check' in sys.argv:
        cur = open(OUT, encoding='utf-8', newline='').read()
        ok = cur == text
        print('index.html matches src/ (%d parts, %d bytes)' % (len(parts()), len(text)) if ok else 'index.html is NOT the build of src/ — run python3 tools/build_index.py')
        sys.exit(0 if ok else 1)
    with open(OUT, 'w', encoding='utf-8', newline='') as f:
        f.write(text)
    print('index.html written from %d parts (%d bytes)' % (len(parts()), len(text)))
