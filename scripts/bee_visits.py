import collections,json,sys
src,dst=sys.argv[1:3]
d=json.load(open(src));fps=d['fps'];names=d['names'];
# Drop flicker: untracked boxes and tracks shorter than 30 frames (2.4 s). Each track keeps its majority label.
cnt=collections.defaultdict(collections.Counter)
for f in d['frames']:
    for t,k,*_ in f['i']: cnt[t][k]+=1
keep={t:c.most_common(1)[0][0] for t,c in cnt.items() if t>=0 and sum(c.values())>=30}
G=int(.5*fps);state={};visits=0;out=[]
for n,f in enumerate(d['frames']):
    fl=[b[:4] for b in f['f'] if b[4]>=.3];ins=[]
    for t,k,s,x1,y1,x2,y2 in f['i']:
        if t not in keep: continue
        k=keep[t]
        cx,cy=(x1+x2)/2,(y1+y2)/2
        on=any(a<=cx<=c and b<=cy<=e for a,b,c,e in fl)
        st=state.setdefault(t,{'start':None,'last':-99,'counted':False})
        if on:
            if st['start'] is None or n-st['last']>G: st['start']=n;st['counted']=False
            st['last']=n
        dw=(n-st['start'])/fps if st['start'] is not None and n-st['last']<=G else 0
        if dw>=2 and not st['counted']: st['counted']=True;visits+=1
        ins.append([t,round(x1),round(y1),round(x2),round(y2),names[str(k)],round(dw,1),int(st['counted'] and dw>0)])
    out.append({'f':[[round(v) for v in b] for b in fl],'i':ins,'v':visits})
json.dump({'fps':fps,'w':d['w'],'h':d['h'],'frames':out},open(dst,'w'),separators=(',',':'));print('visits',visits,len(out))
