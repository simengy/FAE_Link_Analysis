(function(){function g(){var J=[256,256],H=q,x=r,I=b,A=k,F=k,B=s,G=n,C=t,E=[],D=Infinity,c=d3.dispatch("word","end"),w=null,y={};
y.start=function(){var M=l((J[0]>>5)*J[1]),O=null,Q=E.length,L=-1,K=[],P=E.map(function(S,R){S.text=H.call(this,S,R);
S.font=x.call(this,S,R);
S.style=A.call(this,S,R);
S.weight=F.call(this,S,R);
S.rotate=B.call(this,S,R);
S.size=~~I.call(this,S,R);
S.padding=G.call(this,S,R);
return S
}).sort(function(S,R){return R.size-S.size
});
if(w){clearInterval(w)
}w=setInterval(N,0);
N();
return y;
function N(){var S=+new Date,R;
while(+new Date-S<D&&++L<Q&&w){R=P[L];
R.x=(J[0]*(Math.random()+0.5))>>1;
R.y=(J[1]*(Math.random()+0.5))>>1;
p(R,P,L);
if(R.hasText&&z(M,R,O)){K.push(R);
c.word(R);
if(O){i(O,R)
}else{O=[{x:R.x+R.x0,y:R.y+R.y0},{x:R.x+R.x1,y:R.y+R.y1}]
}R.x-=J[0]>>1;
R.y-=J[1]>>1
}}if(L>=Q){y.stop();
c.end(K,O)
}}};
y.stop=function(){if(w){clearInterval(w);
w=null
}return y
};
y.timeInterval=function(K){if(!arguments.length){return D
}D=K==null?Infinity:K;
return y
};
function z(O,ah,N){var L=[{x:0,y:0},{x:J[0],y:J[1]}],af=ah.x,ae=ah.y,K=Math.sqrt(J[0]*J[0]+J[1]*J[1]),V=C(J),W=Math.random()<0.5?1:-1,U=-W,ab,T,R;
while(ab=V(U+=W)){T=~~ab[0];
R=~~ab[1];
if(Math.min(T,R)>K){break
}ah.x=af+T;
ah.y=ae+R;
if(ah.x+ah.x0<0||ah.y+ah.y0<0||ah.x+ah.x1>J[0]||ah.y+ah.y1>J[1]){continue
}if(!N||!j(ah,O,J[0])){if(!N||f(ah,N)){var Z=ah.sprite,S=ah.width>>5,Y=J[0]>>5,M=ah.x-(S<<4),X=M&127,ag=32-X,ad=ah.y1-ah.y0,Q=(ah.y+ah.y0)*Y+(M>>5),P;
for(var aa=0;
aa<ad;
aa++){P=0;
for(var ac=0;
ac<=S;
ac++){O[Q+ac]|=(P<<ag)|(ac<S?(P=Z[aa*S+ac])>>>X:0)
}Q+=Y
}delete ah.sprite;
return true
}}}return false
}y.words=function(K){if(!arguments.length){return E
}E=K;
return y
};
y.size=function(K){if(!arguments.length){return J
}J=[+K[0],+K[1]];
return y
};
y.font=function(K){if(!arguments.length){return x
}x=d3.functor(K);
return y
};
y.fontStyle=function(K){if(!arguments.length){return A
}A=d3.functor(K);
return y
};
y.fontWeight=function(K){if(!arguments.length){return F
}F=d3.functor(K);
return y
};
y.rotate=function(K){if(!arguments.length){return B
}B=d3.functor(K);
return y
};
y.text=function(K){if(!arguments.length){return H
}H=d3.functor(K);
return y
};
y.spiral=function(K){if(!arguments.length){return C
}C=a[K+""]||K;
return y
};
y.fontSize=function(K){if(!arguments.length){return I
}I=d3.functor(K);
return y
};
y.padding=function(K){if(!arguments.length){return G
}G=d3.functor(K);
return y
};
return d3.rebind(y,c,"on")
}function q(c){return c.text
}function r(){return"serif"
}function k(){return"normal"
}function b(c){return Math.sqrt(c.value)
}function s(){return(~~(Math.random()*6)-3)*30
}function n(){return 1
}function p(U,V,S){if(U.sprite){return
}u.clearRect(0,0,(e<<5)/h,m/h);
var E=0,D=0,G=0,K=V.length;
--S;
while(++S<K){U=V[S];
u.save();
u.font=U.style+" "+U.weight+" "+~~((U.size+1)/h)+"px "+U.font;
var F=u.measureText(U.text+"m").width*h,R=U.size<<1;
if(U.rotate){var N=Math.sin(U.rotate*v),C=Math.cos(U.rotate*v),z=F*C,H=F*N,T=R*C,B=R*N;
F=(Math.max(Math.abs(z+B),Math.abs(z-B))+31)>>5<<5;
R=~~Math.max(Math.abs(H+T),Math.abs(H-T))
}else{F=(F+31)>>5<<5
}if(R>G){G=R
}if(E+F>=(e<<5)){E=0;
D+=G;
G=0
}if(D+R>=m){break
}u.translate((E+(F>>1))/h,(D+(R>>1))/h);
if(U.rotate){u.rotate(U.rotate*v)
}u.fillText(U.text,0,0);
if(U.padding){u.lineWidth=2*U.padding,u.strokeText(U.text,0,0)
}u.restore();
U.width=F;
U.height=R;
U.xoff=E;
U.yoff=D;
U.x1=F>>1;
U.y1=R>>1;
U.x0=-U.x1;
U.y0=-U.y1;
U.hasText=true;
E+=F
}var I=u.getImageData(0,0,(e<<5)/h,m/h).data,J=[];
while(--S>=0){U=V[S];
if(!U.hasText){continue
}var F=U.width,A=F>>5,R=U.y1-U.y0;
for(var Q=0;
Q<R*A;
Q++){J[Q]=0
}E=U.xoff;
if(E==null){return
}D=U.yoff;
var c=0,P=-1;
for(var O=0;
O<R;
O++){for(var Q=0;
Q<F;
Q++){var M=A*O+(Q>>5),L=I[((D+O)*(e<<5)+(E+Q))<<2]?1<<(31-(Q%32)):0;
J[M]|=L;
c|=L
}if(c){P=O
}else{U.y0++;
R--;
O--;
D++
}}U.y1=U.y0+P;
U.sprite=J.slice(0,(U.y1-U.y0)*A)
}}function j(J,C,G){G>>=5;
var I=J.sprite,F=J.width>>5,c=J.x-(F<<4),E=c&127,B=32-E,A=J.y1-J.y0,D=(J.y+J.y0)*G+(c>>5),H;
for(var y=0;
y<A;
y++){H=0;
for(var z=0;
z<=F;
z++){if(((H<<B)|(z<F?(H=I[y*F+z])>>>E:0))&C[D+z]){return true
}}D+=G
}return false
}function i(x,y){var w=x[0],c=x[1];
if(y.x+y.x0<w.x){w.x=y.x+y.x0
}if(y.y+y.y0<w.y){w.y=y.y+y.y0
}if(y.x+y.x1>c.x){c.x=y.x+y.x1
}if(y.y+y.y1>c.y){c.y=y.y+y.y1
}}function f(w,c){return w.x+w.x1>c[0].x&&w.x+w.x0<c[1].x&&w.y+w.y1>c[0].y&&w.y+w.y0<c[1].y
}function t(c){var w=c[0]/c[1];
return function(x){return[w*(x*=0.1)*Math.cos(x),x*Math.sin(x)]
}
}function o(A){var w=4,z=w*A[0]/A[1],c=0,B=0;
return function(y){var x=y<0?-1:1;
switch((Math.sqrt(1+4*x*y)-x)&3){case 0:c+=z;
break;
case 1:B+=w;
break;
case 2:c-=z;
break;
default:B-=w;
break
}return[c,B]
}
}function l(x){var c=[],w=-1;
while(++w<x){c[w]=0
}return c
}var v=Math.PI/180,e=1<<11>>5,m=1<<11,d,h=1;
if(typeof document!=="undefined"){d=document.createElement("canvas");
d.width=1;
d.height=1;
h=Math.sqrt(d.getContext("2d").getImageData(0,0,1,1).data.length>>2);
d.width=(e<<5)/h;
d.height=m/h
}else{d=new Canvas(e<<5,m)
}var u=d.getContext("2d"),a={archimedean:t,rectangular:o};
u.fillStyle=u.strokeStyle="red";
u.textAlign="center";
if(typeof module==="object"&&module.exports){module.exports=g
}else{(d3.layout||(d3.layout={})).cloud=g
}})();