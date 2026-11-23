"""Stitch the exported plates and write figma.html (static, absolute, single-style text layers)."""
import json, html, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(ROOT, 'figma')
man = json.load(open(os.path.join(F, 'manifest.json')))
DPR = 2
out = []
total = 0
def st_of(r):
    st = (f"left:{r['x']}px;top:{r['y']}px;height:{r['h']}px;line-height:{r['h']}px;"
          f"font-family:{r['ff']};font-size:{r['fs']};font-weight:{r['fw']};"
          f"letter-spacing:{r['ls'] if r['ls'] != 'normal' else '0px'};color:{r['color']};")
    if r['ws']: st += f"word-spacing:{r['ws']}px;"
    if r.get('nv') and r['nv'] != 'normal': st += f"font-variant-numeric:{r['nv']};"
    return st
for sec in man:
    h = sec['h']
    canvas = Image.new('RGB', (1440 * DPR, h * DPR), (241, 235, 221))
    src0 = os.path.join(F, f"{sec['name']}-0.png")
    if not os.path.exists(src0):
        out.append(f'<section class="f" data-name="{sec["name"]}" style="height:{h}px"><img src="figma/{sec["name"]}.jpg" width="1440" height="{h}" alt="">' + ''.join(f'<div class="t" style="{html.escape(st_of(r), quote=True)}">{html.escape(r["s"])}</div>' for r in sec['runs']) + '</section>')
        total += h; continue
    if sec['mode'] == 'vp':
        im = Image.open(os.path.join(F, f"{sec['name']}-0.png")).convert('RGB')
        canvas.paste(im, (0, 0))
    else:
        for y, off in sec['parts']:
            im = Image.open(os.path.join(F, f"{sec['name']}-{y}.png")).convert('RGB')
            im = im.crop((0, off * DPR, im.width, im.height))
            canvas.paste(im, (0, y * DPR))
    name = f"{sec['name']}.jpg"
    canvas.save(os.path.join(F, name), quality=88, optimize=True, progressive=True)
    layers = []
    for r in sec['runs']:
        st = (f"left:{r['x']}px;top:{r['y']}px;height:{r['h']}px;line-height:{r['h']}px;"
              f"font-family:{r['ff']};font-size:{r['fs']};font-weight:{r['fw']};"
              f"letter-spacing:{r['ls'] if r['ls'] != 'normal' else '0px'};color:{r['color']};")
        if r['ws']:
            st += f"word-spacing:{r['ws']}px;"
        if r.get('nv') and r['nv'] != 'normal':
            st += f"font-variant-numeric:{r['nv']};"
        layers.append(f'<div class="t" style="{html.escape(st, quote=True)}">{html.escape(r["s"])}</div>')
    out.append(f'<section class="f" data-name="{sec["name"]}" style="height:{h}px">'
               f'<img src="figma/{name}" width="1440" height="{h}" alt="">' + ''.join(layers) + '</section>')
    total += h
    for p in os.listdir(F):
        if p.startswith(sec['name'] + '-') and p.endswith('.png'):
            os.remove(os.path.join(F, p))
doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1440">
<title>MLU Halle-Wittenberg · Figma (EN)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Source+Sans+3:wght@400;500;600&family=UnifrakturMaguntia&display=swap" rel="stylesheet">
<style>
html,body{{margin:0;padding:0;background:#F1EBDD}}
body{{width:1440px;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}}
.f{{position:relative;display:block;width:1440px;overflow:hidden;margin:0;padding:0}}
.f>img{{position:absolute;left:0;top:0;display:block;width:1440px}}
.t{{position:absolute;margin:0;padding:0;white-space:pre;font-style:normal;font-kerning:normal}}
</style>
</head>
<body>
{chr(10).join(out)}
</body>
</html>
'''
open(os.path.join(ROOT, 'figma.html'), 'w').write(doc)
print('sections', len(man), 'height', total, 'layers', sum(len(s['runs']) for s in man))
