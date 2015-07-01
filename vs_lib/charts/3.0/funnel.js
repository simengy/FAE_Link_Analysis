(function(c){var i=c.getOptions(),e=i.plotOptions,g=c.seriesTypes,f=c.merge,h=function(){},a=c.each;
e.funnel=f(e.pie,{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,dataLabels:{connectorWidth:1,connectorColor:"#606060"},size:!0,states:{select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}}});
g.funnel=c.extendClass(g.pie,{type:"funnel",animate:h,singularTooltips:!0,translate:function(){var ab=function(d,b){return/%$/.test(d)?b*parseInt(d,10)/100:parseInt(d,10)
},L=0,W=this.chart,Z=this.options,V=Z.reversed,aa=W.plotWidth,P=W.plotHeight,O=0,W=Z.center,U=ab(W[0],aa),Y=ab(W[0],P),M=ab(Z.width,aa),S,K,X=ab(Z.height,P),I=ab(Z.neckWidth,aa),H=ab(Z.neckHeight,P),E=X-H,ab=this.data,D,A,F=Z.dataLabels.position==="left"?1:0,j,R,J,N,T,G,Q;
this.getWidthAt=K=function(b){return b>X-H||X===H?I:I+(M-I)*((X-H-b)/(X-H))
};
this.getX=function(d,b){return U+(b?-1:1)*(K(V?P-d:d)/2+Z.dataLabels.distance)
};
this.center=[U,Y,X];
this.centerX=U;
a(ab,function(b){L+=b.y
});
a(ab,function(b){Q=null;
A=L?b.y/L:0;
R=Y-X/2+O*X;
T=R+A*X;
S=K(R);
j=U-S/2;
J=j+S;
S=K(T);
N=U-S/2;
G=N+S;
R>E?(j=N=U-I/2,J=G=U+I/2):T>E&&(Q=T,S=K(E),N=U-S/2,G=N+S,T=E);
V&&(R=X-R,T=X-T,Q=Q?X-Q:null);
D=["M",j,R,"L",J,R,G,T];
Q&&D.push(G,Q,N,Q);
D.push(N,T,"Z");
b.shapeType="path";
b.shapeArgs={d:D};
b.percentage=A*100;
b.plotX=U;
b.plotY=(R+(Q||T))/2;
b.tooltipPos=[U,b.plotY];
b.slice=h;
b.half=F;
O+=A
})
},drawPoints:function(){var j=this,d=j.options,k=j.chart.renderer;
a(j.data,function(m){var b=m.graphic,l=m.shapeArgs;
b?b.animate(l):m.graphic=k.path(l).attr({fill:m.color,stroke:d.borderColor,"stroke-width":d.borderWidth}).add(j.group)
})
},sortByAngle:function(b){b.sort(function(j,d){return j.plotY-d.plotY
})
},drawDataLabels:function(){var k=this.data,j=this.options.dataLabels.distance,m,s,l,q=k.length,r,p;
for(this.center[2]-=2*j;
q--;
){l=k[q],s=(m=l.half)?1:-1,p=l.plotY,r=this.getX(p,m),l.labelPos=[0,p,r+(j-5)*s,p,r+j*s,p,m?"right":"left",0]
}g.pie.prototype.drawDataLabels.call(this)
}});
i.plotOptions.pyramid=c.merge(i.plotOptions.funnel,{neckWidth:"0%",neckHeight:"0%",reversed:!0});
c.seriesTypes.pyramid=c.extendClass(c.seriesTypes.funnel,{type:"pyramid"})
})(Highcharts);