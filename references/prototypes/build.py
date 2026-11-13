#!/usr/bin/env python3
"""Three prototype clips for Cleo-style idea cards. 1280x720, 24 fps, PIL frames -> ffmpeg.
Springs are the measured per-frame progress lists from deep/*/curves (not hand-tuned)."""
import subprocess, math, sys, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H,FPS=1280,720,24
F="/Users/sanjaysingha/Library/Fonts/"
def font(n,s): return ImageFont.truetype(F+n,max(2,int(s)))
HERO=lambda s: font("ArchivoBlack-Regular.ttf",s); LAB=lambda s: font("barlowsemicondensed-extrabold.otf",s)
LIME=(198,255,1); NAVY0=(14,24,35); NAVY1=(32,44,62); TEAL=(27,66,71); WHITE=(255,255,255)
MAG=[0.0,0.574,0.78,0.919,1.0,1.043,1.081,1.096,1.081,1.057,1.029,1.0]          # Neuralink magnifier scale, 10% overshoot, 417 ms
LABY=[0.0,0.495,0.938,1.08,1.053,1.038,1.025,1.0]                                 # 1.4KG label rise, 8% overshoot, 250 ms
SNAP=[0.0,0.74,1.0]                                                               # text scale 74->100% in 2 frames
PAN=[0.018,0.045,0.045,0.081,0.143,0.143,0.238,0.238,0.354,0.516,0.516,0.74,1.0]  # paper-title camera pan, ease-in 500 ms
def P(lst,f): return 0.0 if f<0 else (lst[f] if f<len(lst) else 1.0)
def easein(t): t=max(0,min(1,t)); return t**2.6
def stage():
    im=Image.new("RGB",(W,H)); d=ImageDraw.Draw(im)
    for y in range(H):
        k=y/H; d.line([0,y,W,y],fill=tuple(int(NAVY0[i]+(NAVY1[i]-NAVY0[i])*k) for i in range(3)))
    for x in range(0,W,64): d.line([x,H*0.62,x-(x-W/2)*0.0,H],fill=(26,41,60))
    for y in range(int(H*0.62),H,36): d.line([0,y,W,y],fill=(26,41,60))
    return im
def text(d,xy,s,f,fill,anchor="mm",drop=3):
    if drop: d.text((xy[0]+drop,xy[1]+drop),s,font=f,fill=(8,20,24),anchor=anchor)
    d.text(xy,s,font=f,fill=fill,anchor=anchor)
def scaled_text(im,xy,s,fsize,fill,k,fnt=HERO):
    if k<=0: return
    d=ImageDraw.Draw(im); text(d,xy,s,fnt(max(4,int(fsize*k))),fill)
def render(name,n,draw):
    out=f"deep/prototypes/{name}"; os.makedirs(out,exist_ok=True)
    p=subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-",
        "-c:v","libx264","-pix_fmt","yuv420p","-crf","18",f"{out}/{name}.mp4"],stdin=subprocess.PIPE)
    for f in range(n): p.stdin.write(draw(f).tobytes())
    p.stdin.close(); p.wait()

# 1) Spring-cone stat: the magnifier cone opens onto a counting stat instead of an inset picture
def cone_stat(f):
    im=stage(); d=ImageDraw.Draw(im,"RGBA")
    ox,oy=380,400
    d.ellipse([ox-120,oy-120,ox+120,oy+120],fill=(236,120,160)); d.ellipse([ox-120,oy-120,ox+120,oy+120],outline=(120,40,80),width=4)
    d.ellipse([ox+38,oy-30,ox+50,oy-18],fill=LIME)
    a=12; k=P(MAG,f-a)
    if k>0:
        kp=min(1.0,k); cx,cy=ox+44+(520)*kp, oy-24-(60)*kp; r=150*k
        d.polygon([(ox+44,oy-24),(cx,cy-r),(cx,cy+r)],fill=(198,255,1,60))
        d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=TEAL+(255,),outline=LIME,width=max(1,int(6*k)))
        if f>=a+4:
            cnt=min(1,(f-a-4)/30); val=int(round(86*cnt))
            text(d,(cx,cy-14),f"{val}B",HERO(int(84*k)),LIME)
            if f>=a+10: text(d,(cx,cy+52),"NEURONS",LAB(int(30*P(SNAP,f-a-10))) ,WHITE,drop=0)
    return im
# 2) Word-locked label ladder: one label per spoken noun, never closer than 12 frames, leader + dot to the object
def ladder(f):
    im=stage(); d=ImageDraw.Draw(im,"RGBA")
    x0=420
    for i,(c,h) in enumerate([((120,170,255),90),((60,110,230),70),((40,60,90),60),((230,230,235),80)]):
        y=150+i*120; d.rounded_rectangle([x0-170,y,x0+170,y+h],radius=26,fill=c)
    labs=[("UPPER",195,10),("FOAM",305,24),("CARBON PLATE",420,40),("OUTSOLE",550,58)]
    for s,y,a in labs:
        if f<a: continue
        d.ellipse([x0+176,y-7,x0+190,y+7],fill=LIME)
        ln=min(1,(f-a)/6); d.line([x0+190,y,x0+190+170*ln,y],fill=WHITE+(255,),width=3)       # leader draws linear, 6 f
        if f>=a+4:
            k=P(SNAP,f-a-4); rise=(1-P(LABY,f-a-4))*18
            fn=LAB(int(44*k)); tw=d.textlength(s,font=fn)
            bx=x0+372; d.rounded_rectangle([bx-10,y-26*k+rise,bx+tw+14,y+26*k+rise],radius=6,fill=LIME)
            d.text((bx,y+rise),s,font=fn,fill=(10,20,10),anchor="lm")
    return im
# 3) Ease-in pan hand-off: hero word leaves by camera, not by its own exit; diagram is already there below
def pan(f):
    world=Image.new("RGB",(W,H*2)); world.paste(stage(),(0,0)); world.paste(stage(),(0,H)); d=ImageDraw.Draw(world,"RGBA")
    k=P(SNAP,f-4); 
    if k>0: text(d,(W/2,H/2-20),"THE LINK",HERO(int(150*k)),LIME,drop=6)
    if f>=12: text(d,(W/2,H/2+90),"WHERE THE SIGNAL LEAVES",LAB(int(40*P(SNAP,f-12))),WHITE,drop=0)
    d.line([W/2,H/2+130,W/2,H+200],fill=WHITE+(200,),width=3)
    for i,(s,x) in enumerate([("SKULL",330),("CHIP",640),("PHONE",950)]):
        d.rounded_rectangle([x-120,H+220,x+120,H+330],radius=18,fill=TEAL,outline=LIME,width=4)
        text(d,(x,H+275),s,LAB(46),WHITE,drop=0)
    a=44; t=P(PAN,f-a) if f>=a else 0
    y=int(t*H*0.72)
    fr=world.crop((0,y,W,y+H))
    if 0<t<1:  # vertical motion blur proportional to speed
        sp=(P(PAN,f-a)-P(PAN,f-a-1))*H*0.72
        if sp>6: fr=fr.filter(ImageFilter.BoxBlur(0)).resize((W,H)); fr=Image.blend(fr,world.crop((0,max(0,y-int(sp/2)),W,max(0,y-int(sp/2))+H)),0.4)
    return fr
render("spring-cone-stat",72,cone_stat); render("label-ladder",96,ladder); render("ease-in-pan-handoff",84,pan)
