import sys, glob, os
from PIL import Image, ImageStat, ImageFilter
import numpy as np
raw, out = sys.argv[1], sys.argv[2]
photos = {'hero':2400,'library':1200,'letter':1200,'arcade':1800,'markt':1200,'francke':1200,'saale':1200,'lab':1200,'collection':1200,'seminar':1800,'door':1200}
for name, w in photos.items():
    im = Image.open(f'{raw}/{name}.png').convert('RGB')
    a = np.asarray(im).astype(np.float32)/255
    r,g,b = a[...,0].mean(), a[...,1].mean(), a[...,2].mean()
    # neutralise then add gentle warmth: target R-B ~ +0.04
    target = 0.04
    d = (r-b) - target
    a[...,0] -= d/2*1.0; a[...,2] += d/2*1.0
    lum = a.mean(axis=2, keepdims=True)
    # shadows lean to forest green, highlights to ivory
    sh = np.clip(1-lum*2.2,0,1)
    a = a*(1-0.10*sh) + np.array([0x24,0x45,0x36])/255*0.10*sh
    hi = np.clip((lum-0.6)*2.5,0,1)
    a = a*(1-0.06*hi) + np.array([0xF1,0xEB,0xDD])/255*0.06*hi
    # slight desaturation for restraint
    lum = a.mean(axis=2, keepdims=True)
    a = lum + (a-lum)*0.9
    a = np.clip(a,0,1)
    im = Image.fromarray((a*255).astype(np.uint8))
    if im.width != w:
        h = round(im.height*w/im.width)
        im = im.resize((w,h), Image.LANCZOS)
        if w > 1600: im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    im.save(f'{out}/{name}.jpg', quality=84, optimize=True, progressive=True)
    s = ImageStat.Stat(im.resize((32,32))).mean
    print(name, im.size, 'R-B %.1f'%(s[0]-s[2]), os.path.getsize(f'{out}/{name}.jpg')//1024,'KB')
ink = np.array([0x2B,0x29,0x24])/255
for f in glob.glob(f'{raw}/eng-*.png'):
    name = os.path.basename(f)[:-4]
    a = np.asarray(Image.open(f).convert('L')).astype(np.float32)/255
    paper = np.percentile(a, 92); dark = np.percentile(a, 1)
    alpha = np.clip((paper - a)/(paper-dark), 0, 1)**0.9
    alpha[alpha<0.06]=0
    ys, xs = np.where(alpha>0.25)
    y0,y1 = np.percentile(ys,0.3).astype(int), np.percentile(ys,99.7).astype(int)
    x0,x1 = np.percentile(xs,0.3).astype(int), np.percentile(xs,99.7).astype(int)
    pad=6
    alpha = alpha[max(0,y0-pad):y1+pad, max(0,x0-pad):x1+pad]
    rgba = np.zeros(alpha.shape+(4,), np.uint8)
    rgba[...,:3] = (ink*255).astype(np.uint8); rgba[...,3] = (alpha*255).astype(np.uint8)
    im = Image.fromarray(rgba, 'RGBA')
    im.save(f'{out}/{name}.webp', quality=88, method=6)
    im.save(f'{out}/{name}.png', optimize=True)
    print(name, im.size, os.path.getsize(f'{out}/{name}.webp')//1024,'KB webp', os.path.getsize(f'{out}/{name}.png')//1024,'KB png')
