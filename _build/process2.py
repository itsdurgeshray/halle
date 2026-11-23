import os, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
R='/Users/durgesh/Desktop/WFT/mlu-halle/assets/raw'; O='/Users/durgesh/Desktop/WFT/mlu-halle/assets/img'
def grade(im, target=0.04, sat=0.9, tint=0.10):
    a=np.asarray(im.convert('RGB')).astype(np.float32)/255
    r,b=a[...,0].mean(),a[...,2].mean(); d=(r-b)-target
    a[...,0]-=d/2; a[...,2]+=d/2
    lum=a.mean(axis=2,keepdims=True); sh=np.clip(1-lum*2.2,0,1)
    a=a*(1-tint*sh)+np.array([0x24,0x45,0x36])/255*tint*sh
    lum=a.mean(axis=2,keepdims=True); a=lum+(a-lum)*sat
    return np.clip(a,0,1)
def save_jpg(a,name,w=None,q=84):
    im=Image.fromarray((a*255).astype(np.uint8))
    if w and im.width!=w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.1,50,2))
    im.save(f'{O}/{name}.jpg',quality=q,optimize=True,progressive=True); print(name,im.size,os.path.getsize(f'{O}/{name}.jpg')//1024,'KB')
# facade: sky + door alpha
src=Image.open(f'{R}/facade.png').convert('RGB'); raw=np.asarray(src).astype(int)
blue=(raw[...,2]-raw[...,0]>40)&(raw[...,2]>140)
lab,n=ndimage.label(blue); sky=np.isin(lab,np.unique(lab[0,:][lab[0,:]>0]))
sky=ndimage.binary_dilation(sky,iterations=1)
alpha=np.where(sky,0,255).astype(np.uint8)
alpha[506:702,729:805]=0
alpha=np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8)))
g=grade(src); rgba=np.dstack([(g*255).astype(np.uint8),alpha])
fa=Image.fromarray(rgba,'RGBA').resize((2304,1296),Image.LANCZOS)
fa.save(f'{O}/facade.webp',quality=88,method=6); fa.save(f'{O}/facade.png',optimize=True)
print('facade',os.path.getsize(f'{O}/facade.webp')//1024,'KB webp; sky top row at center col:',int(np.argmax(alpha[:,768]>128)))
# aula, doors
save_jpg(grade(Image.open(f'{R}/aula.png')),'aula',2304)
save_jpg(grade(Image.open(f'{R}/doors.png'),target=0.07,sat=0.95,tint=0.05),'doors',1152)
# seal: key white
s=np.asarray(Image.open(f'{R}/seal.png').convert('RGB')).astype(np.float32)
dist=np.sqrt(((255-s)**2).sum(axis=2)); al=np.clip((dist-18)/40,0,1)
m=al>0.5; m=ndimage.binary_fill_holes(m); al=np.maximum(al, m*1.0)
al=np.asarray(Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32)/255
ys,xs=np.where(al>0.1); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
sr=np.dstack([s.astype(np.uint8),(al*255).astype(np.uint8)])[y0-4:y1+5,x0-4:x1+5]
Image.fromarray(sr,'RGBA').resize((520,round(520*(y1-y0+9)/(x1-x0+9))),Image.LANCZOS).save(f'{O}/seal.png',optimize=True); print('seal ok')
# ink conversion
ink=np.array([0x2B,0x29,0x24],np.uint8)
def to_ink(im, name, crop=True, w=None):
    a=np.asarray(im.convert('L')).astype(np.float32)/255
    paper=np.percentile(a,92); dark=np.percentile(a,1)
    al=np.clip((paper-a)/(paper-dark),0,1)**0.9; al[al<0.06]=0
    if crop:
        ys,xs=np.where(al>0.25); y0,y1=int(np.percentile(ys,0.2)),int(np.percentile(ys,99.8)); x0,x1=int(np.percentile(xs,0.2)),int(np.percentile(xs,99.8))
        al=al[max(0,y0-8):y1+8,max(0,x0-8):x1+8]
    rgba=np.zeros(al.shape+(4,),np.uint8); rgba[...,:3]=ink; rgba[...,3]=(al*255).astype(np.uint8)
    out=Image.fromarray(rgba,'RGBA')
    if w and out.width>w: out=out.resize((w,round(out.height*w/out.width)),Image.LANCZOS)
    out.save(f'{O}/{name}.png',optimize=True); print(name,out.size,os.path.getsize(f'{O}/{name}.png')//1024,'KB')
em=Image.open(f'{R}/emblems.png'); W=em.width//3
for i in range(9):
    r,c=divmod(i,3); to_ink(em.crop((c*W,r*W,(c+1)*W,(r+1)*W)),f'em-{i}')
for n in ['plant','mineral','heart','society']: to_ink(Image.open(f'{R}/r-{n}.png'),f'r-{n}')
for n in ['plant','mineral','heart','society']:
    im=Image.open(f'{R}/m-{n}.png').convert('RGB'); im.save(f'{O}/m-{n}.jpg',quality=82,optimize=True); print('m',n)
# panorama
p=grade(Image.open(f'{R}/panorama.png'),target=0.05,sat=0.95,tint=0.04); save_jpg(p,'panorama',2600,q=82)
# leather grayscale tile
lt=Image.open(f'{R}/leather.png').convert('L').resize((512,512),Image.LANCZOS)
la=np.asarray(lt).astype(np.float32); la=(la-la.mean())/la.std()*22+128
Image.fromarray(np.clip(la,0,255).astype(np.uint8)).save(f'{O}/leather.jpg',quality=80); print('leather')
