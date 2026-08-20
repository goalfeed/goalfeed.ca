def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def ratio(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb)
    return (hi+0.05)/(lo+0.05)
DARK={'bg':'#070b14','surface':'#0d1522','surface2':'#131d2e','border':'#1e2b40',
 'text':'#e8eef7','muted':'#93a4bd','accent':'#ff3b2f','accent-hot':'#ff6a3d',
 'ice':'#5cc8ff','live':'#3ddc97','warn':'#ffc447'}
LIGHT={'bg':'#f2f6fb','surface':'#ffffff','surface2':'#e7eef7','border':'#cbd8e8',
 'text':'#0b1626','muted':'#4a5c75','accent':'#d81f14','accent-hot':'#b8430d',
 'ice':'#0a6ea8','live':'#0d7a4f','warn':'#8a5a00'}
for name,P in (('DARK',DARK),('LIGHT',LIGHT)):
    print(f"\n=== {name} — text pairs on bg / surface / surface2 ===")
    for fg in ('text','muted','accent','accent-hot','ice','live','warn'):
        row=[]
        for bgk in ('bg','surface','surface2'):
            r=ratio(P[fg],P[bgk])
            tag='AAA' if r>=7 else ('AA' if r>=4.5 else ('AA-lg' if r>=3 else 'FAIL'))
            row.append(f"{bgk}={r:5.2f} {tag:5}")
        print(f"  {fg:11} {P[fg]}  " + " | ".join(row))
