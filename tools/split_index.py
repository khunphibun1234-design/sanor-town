"""split_index.py — one-time split of index.html into source parts under src/ (task 10, 10 Nov 2026).

The parts are cut at line starts, so joining them in path order gives back index.html byte for byte.
After the split, edit the files in src/ and run tools/build_index.py to make index.html.
Usage: python3 tools/split_index.py [index.html] [src]
"""
import os, re, sys

SRC_HTML = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'src'
text = open(SRC_HTML, encoding='utf-8', newline='').read()
lines = text.split('\n')
starts = [0]
for l in lines[:-1]:
    starts.append(starts[-1] + len(l) + 1)

def line_of(pat, after=0):
    for i in range(after, len(lines)):
        if re.match(pat, lines[i]):
            return i
    raise SystemExit('anchor not found: ' + pat)

town = line_of(r'/\* ============ SANOR TOWN \(prototype')
scenes0 = line_of(r'const SCENES=\[\];', town) + 1
push = [i for i, l in enumerate(lines) if l.startswith('SCENES.push(')]
ends = []
for p in push:  # a scene statement runs until the next line that starts at column 0
    q = p + 1
    while q < len(lines) and (lines[q] == '' or lines[q][0] in ' \t'):
        q += 1
    if lines[q][:1] in '}])':
        raise SystemExit('unexpected line after scene at %d: %s' % (p + 1, lines[q][:40]))
    ends.append(q)  # first line after the statement
progress = line_of(r'/\* progress: stored ONLY on this phone', ends[-1])
hub = line_of(r'const HUB=\{', progress)
hubmodes = line_of(r'/\* ===== ST-UX-007 CS-1: station Hub', hub)
iife_end = line_of(r'\}\)\(\);$', hubmodes) + 1

cuts = [('00-shell-head.html', 0), ('10-engine-core.js', town)]
prev = scenes0
for k, (p, e) in enumerate(zip(push, ends)):
    sid = re.search(r"id:'(\w+)'", lines[p]).group(1)
    cuts.append(('20-scenes/%02d-%s.js' % (k + 1, sid), prev))
    prev = e
cuts += [('30-content-tables.js', prev), ('40-engine-progress.js', progress), ('50-content-hub.js', hub),
         ('60-engine-ui.js', hubmodes), ('99-shell-end.html', iife_end)]
# the scene files start where the previous scene ended; the first one starts after `const SCENES=[];`
assert cuts[2][1] == scenes0
bounds = [starts[c[1]] for c in cuts] + [len(text)]
parts = [(cuts[i][0], text[bounds[i]:bounds[i + 1]]) for i in range(len(cuts))]
assert ''.join(p for _, p in parts) == text
for name, body in parts:
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(body)
print('%d parts written to %s/ (%d scenes)' % (len(parts), OUT, len(push)))
