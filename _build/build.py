import re, html
S = '/Users/durgesh/Desktop/WFT/mlu-halle/_build'
P = '/Users/durgesh/Desktop/WFT/mlu-halle'
page = open(f'{S}/page.html').read()
v1 = open(f'{P}/v1.html').read()
stmt = re.search(r'<!-- II\. STATEMENT -->.*?</section>', v1, re.S).group(0)
chron = re.search(r'<!-- III\. CHRONIK -->.*?</section>', v1, re.S).group(0)
page = page.replace('<!--STATEMENT-->', stmt).replace('<!--CHRONIK-->', chron)

books = [  # latin, colour, label colour, width, height
    ('Theologia', '#5E2F33', '#1E3A2D', 84, 356),
    ('Ius et Oeconomia', '#244536', '#5E2F33', 104, 332),
    ('Medicina', '#743C40', '#292B27', 92, 372),
    ('Philosophia', '#2E3A2C', '#743C40', 82, 344),
    ('Philosophia', '#46533B', '#292B27', 88, 360),
    ('Philosophia', '#1E3A2D', '#6B5634', 96, 326),
    ('Scientia Naturae', '#6B5634', '#1E3A2D', 90, 366),
    ('Scientia Naturae', '#292B27', '#743C40', 100, 348),
    ('Scientia Naturae', '#3E4A33', '#5E2F33', 92, 338),
]
roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
names = ['Theologische Fakultät', 'Juristische und Wirtschaftswissenschaftliche Fakultät', 'Medizinische Fakultät', 'Philosophische Fakultät I', 'Philosophische Fakultät II', 'Philosophische Fakultät III', 'Naturwissenschaftliche Fakultät I', 'Naturwissenschaftliche Fakultät II', 'Naturwissenschaftliche Fakultät III']
out = []
for i, (lat, c, l, w, h) in enumerate(books):
    out.append(
        f'<button class="vol" type="button" role="listitem" data-fac="{i}" style="--c:{c};--l:{l};--w:{w}px;--h:{h}px" aria-label="{html.escape(names[i])} aufschlagen">'
        f'<span class="vol__box"><span class="vol__side"></span><span class="vol__spine">'
        f'<i class="band" style="top:6%"></i><i class="band" style="top:17%"></i><i class="band" style="bottom:18%"></i><i class="band" style="bottom:4%"></i>'
        f'<svg class="vol__orn" aria-hidden="true"><use href="#laurel"/></svg>'
        f'<span class="vol__label"><span class="vol__latin gilt">{lat}</span></span>'
        f'<span class="vol__roman gilt">{roman[i]}</span></span></span></button>')
page = page.replace('<!--BOOKS-->', ''.join(out))
open(f'{P}/index.html', 'w').write(page)
css = open(f'{S}/base.css').read() + open(f'{S}/sections.css').read()
open(f'{P}/assets/site.css', 'w').write(css)
print('ok', len(page), len(css))
for ch in ['—', '–']:
    for f in ['index.html', 'assets/site.js', 'assets/site.css']:
        if ch in open(f'{P}/{f}').read(): print('DASH in', f)
