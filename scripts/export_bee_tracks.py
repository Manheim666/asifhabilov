# Usage: BEE_REPO=/path/to/Bee-A-Hero python export_bee_tracks.py public/assets/video/bee-clean.mp4 tracks.json
# Then: python bee_visits.py tracks.json data/bee.json
import json,os,sys
from ultralytics import YOLO
B=os.environ['BEE_REPO'].rstrip('/')+'/'
V,OUT=sys.argv[1:3]
ins=YOLO(B+'data/interim/cv_runs/insect_multidet_v2_yolo26m/weights/best.pt');fl=YOLO(B+'data/interim/cv_runs/flower_det2_v2_yolo26m/weights/best.pt')
frames=[];fb=[]
for i,r in enumerate(ins.track(source=V,stream=True,tracker='botsort.yaml',persist=True,conf=.2,verbose=False,vid_stride=2,device='cpu')):
    b=r.boxes
    if i%5==0:
        f=fl.predict(r.orig_img,conf=.2,verbose=False,device='cpu')[0].boxes
        fb=[[round(float(v),1) for v in x]+[round(float(c),3)] for x,c in zip(f.xyxy,f.conf)]
    ids=b.id.tolist() if b.id is not None else [None]*len(b)
    frames.append({'f':[list(x) for x in fb],'i':[[int(t) if t else -1,int(k),round(float(c),3)]+[round(float(v),1) for v in x] for t,k,c,x in zip(ids,b.cls,b.conf,b.xyxy)]})
    if i%60==0: print(i,len(b),len(fb),flush=True)
json.dump({'fps':12.5,'w':1280,'h':720,'names':ins.names,'frames':frames},open(OUT,'w'))
print('done',len(frames))
