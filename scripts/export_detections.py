# Usage: ML_PROJECTS=/path/to/ML_Projects OUT=/path/to/output/dir python export_detections.py
import json,glob,os
from ultralytics import YOLO
SP=os.environ['OUT'];R=os.environ['ML_PROJECTS'].rstrip('/')+'/'
w=YOLO(R+'global-wheat-detection/out/results/best.pt')
out={}
for p in sorted(glob.glob(R+'global-wheat-detection/data/test/test/*.jpg')):
    r=w.predict(p,imgsz=1024,conf=0.02,max_det=400,verbose=False,device='cpu')[0]
    b=r.boxes;out[os.path.basename(p)]={'size':list(r.orig_shape),'n40':int((b.conf>=.4).sum()),'boxes':[[*map(lambda v:round(float(v),1),x),round(float(c),3)] for x,c in zip(b.xyxy,b.conf)]}
    print(os.path.basename(p),len(b),out[os.path.basename(p)]['n40'])
json.dump(out,open(SP+'/wheat.json','w'))
d=YOLO(R+'dota-obb/out/results/dota_obb_last.pt');print(d.names)
out={}
for p in sorted(glob.glob(R+'dota-obb/data/dota8/images/val/*')):
    r=d.predict(p,imgsz=1024,conf=0.02,max_det=600,verbose=False,device='cpu')[0]
    o=r.obb;out[os.path.basename(p)]={'size':list(r.orig_shape),'polys':[[round(float(v),1) for v in q.reshape(-1)]+[round(float(c),3),int(k)] for q,c,k in zip(o.xyxyxyxy,o.conf,o.cls)]}
    print(os.path.basename(p),r.orig_shape,len(o),int((o.conf>=.25).sum()))
json.dump(out,open(SP+'/dota.json','w'))
