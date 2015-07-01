(function(e,x){var s=e.arrayMin,a=e.arrayMax,D=e.each,f=e.extend,B=e.merge,v=e.map,n=e.pick,p=e.pInt,q=e.getOptions().plotOptions,d=e.seriesTypes,g=e.extendClass,b=e.splat,C=e.wrap,i=e.Axis,E=e.Tick,o=e.Point,j=e.Pointer,I=e.CenteredSeriesMixin,u=e.TrackerMixin,A=e.Series,w=Math,y=w.round,F=w.floor,r=w.max,h=e.Color,G=function(){};
function z(K,L,M){this.init.call(this,K,L,M)
}f(z.prototype,{init:function(L,M,O){var P=this,N,K=P.defaultOptions;
P.chart=M;
if(M.angular){K.background={}
}P.options=L=B(K,L);
N=L.background;
if(N){D([].concat(b(N)).reverse(),function(R){var Q=R.backgroundColor;
R=B(P.defaultBackgroundOptions,R);
if(Q){R.backgroundColor=Q
}R.color=R.backgroundColor;
O.options.plotBands.unshift(R)
})
}},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});
var m=i.prototype,c=E.prototype;
var t={getOffset:G,redraw:function(){this.isDirty=false
},render:function(){this.isDirty=false
},setScale:G,setCategories:G,setTitle:G};
var l={isRadial:true,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:false,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:false,title:{x:4,text:null,rotation:90}},setOptions:function(L){var K=this.options=B(this.defaultOptions,this.defaultRadialOptions,L);
if(!K.plotBands){K.plotBands=[]
}},getOffset:function(){m.getOffset.call(this);
this.chart.axisOffset[this.side]=0;
this.center=this.pane.center=I.getCenter.call(this.pane)
},getLinePath:function(M,L){var K=this.center;
L=n(L,K[2]/2-this.offset);
return this.chart.renderer.symbols.arc(this.left+K[0],this.top+K[1],L,L,{start:this.startAngleRad,end:this.endAngleRad,open:true,innerR:0})
},setAxisTranslation:function(){m.setAxisTranslation.call(this);
if(this.center){if(this.isCircular){this.transA=(this.endAngleRad-this.startAngleRad)/((this.max-this.min)||1)
}else{this.transA=(this.center[2]/2)/((this.max-this.min)||1)
}if(this.isXAxis){this.minPixelPadding=this.transA*this.minPointOffset
}else{this.minPixelPadding=0
}}},beforeSetTickPositions:function(){if(this.autoConnect){this.max+=(this.categories&&1)||this.pointRange||this.closestPointRange||0
}},setAxisSize:function(){m.setAxisSize.call(this);
if(this.isRadial){this.center=this.pane.center=e.CenteredSeriesMixin.getCenter.call(this.pane);
if(this.isCircular){this.sector=this.endAngleRad-this.startAngleRad
}this.len=this.width=this.height=this.center[2]*n(this.sector,1)/2
}},getPosition:function(L,K){return this.postTranslate(this.isCircular?this.translate(L):0,n(this.isCircular?K:this.translate(L),this.center[2]/2)-this.offset)
},postTranslate:function(N,L){var M=this.chart,K=this.center;
N=this.startAngleRad+N;
return{x:M.plotLeft+K[0]+Math.cos(N)*L,y:M.plotTop+K[1]+Math.sin(N)*L}
},getPlotBandPath:function(U,V,W){var K=this.center,T=this.startAngleRad,Q=K[2]/2,P=[n(W.outerRadius,"100%"),W.innerRadius,n(W.thickness,10)],L=/%$/,M,O,R,N=this.isCircular,S;
if(this.options.gridLineInterpolation==="polygon"){S=this.getPlotLinePath(U).concat(this.getPlotLinePath(V,true))
}else{if(!N){P[0]=this.translate(U);
P[1]=this.translate(V)
}P=v(P,function(X){if(L.test(X)){X=(p(X,10)*Q)/100
}return X
});
if(W.shape==="circle"||!N){M=-Math.PI/2;
O=Math.PI*1.5;
R=true
}else{M=T+this.translate(U);
O=T+this.translate(V)
}S=this.chart.renderer.symbols.arc(this.left+K[0],this.top+K[1],P[0],P[0],{start:M,end:O,innerR:n(P[1],P[0]-P[2]),open:R})
}return S
},getPlotLinePath:function(R,P){var M=this,K=M.center,Q=M.chart,N=M.getPosition(R),L,T,S,O;
if(M.isCircular){O=["M",K[0]+Q.plotLeft,K[1]+Q.plotTop,"L",N.x,N.y]
}else{if(M.options.gridLineInterpolation==="circle"){R=M.translate(R);
if(R){O=M.getLinePath(0,R)
}}else{D(Q.xAxis,function(U){if(U.pane===M.pane){L=U
}});
O=[];
R=M.translate(R);
S=L.tickPositions;
if(L.autoConnect){S=S.concat([S[0]])
}if(P){S=[].concat(S).reverse()
}D(S,function(V,U){T=L.getPosition(V,R);
O.push(U?"L":"M",T.x,T.y)
})
}}return O
},getTitlePosition:function(){var K=this.center,L=this.chart,M=this.options.title;
return{x:L.plotLeft+K[0]+(M.x||0),y:L.plotTop+K[1]-({high:0.5,middle:0.25,low:0}[M.align]*K[2])+(M.y||0)}
}};
C(m,"init",function(U,V,T){var O=this,W=V.angular,L=V.polar,Z=T.isX,M=W&&Z,P,X,S,Y,Q=V.options,K=T.pane||0,N,R;
if(W){f(this,M?t:l);
P=!Z;
if(P){this.defaultRadialOptions=this.defaultRadialGaugeOptions
}}else{if(L){f(this,l);
P=Z;
this.defaultRadialOptions=Z?this.defaultRadialXOptions:B(this.defaultYAxisOptions,this.defaultRadialYOptions)
}}U.call(this,V,T);
if(!M&&(W||L)){Y=this.options;
if(!V.panes){V.panes=[]
}this.pane=N=V.panes[K]=V.panes[K]||new z(b(Q.pane)[K],V,O);
R=N.options;
V.inverted=false;
Q.chart.zoomType=null;
this.startAngleRad=X=(R.startAngle-90)*Math.PI/180;
this.endAngleRad=S=(n(R.endAngle,R.startAngle+360)-90)*Math.PI/180;
this.offset=Y.offset||0;
this.isCircular=P;
if(P&&T.max===x&&S-X===2*Math.PI){this.autoConnect=true
}}});
C(c,"getPosition",function(M,P,O,N,K){var L=this.axis;
return L.getPosition?L.getPosition(O):M.call(this,P,O,N,K)
});
C(c,"getLabelPosition",function(T,W,U,V,X,O,P,Q,K){var M=this.axis,L=O.y,S,R=O.align,N=((M.translate(this.pos)+M.startAngleRad+Math.PI/2)/Math.PI*180)%360;
if(M.isRadial){S=M.getPosition(this.pos,(M.center[2]/2)+n(O.distance,-25));
if(O.rotation==="auto"){V.attr({rotation:N})
}else{if(L===null){L=M.chart.renderer.fontMetrics(V.styles.fontSize).b-V.getBBox().height/2
}}if(R===null){if(M.isCircular){if(N>20&&N<160){R="left"
}else{if(N>200&&N<340){R="right"
}else{R="center"
}}}else{R="center"
}V.attr({align:R})
}S.x+=O.x;
S.y+=L
}else{S=T.call(this,W,U,V,X,O,P,Q,K)
}return S
});
C(c,"getMarkPath",function(N,S,R,O,P,T,M){var K=this.axis,Q,L;
if(K.isRadial){Q=K.getPosition(this.pos,K.center[2]/2+O);
L=["M",S,R,"L",Q.x,Q.y]
}else{L=N.call(this,S,R,O,P,T,M)
}return L
});
q.arearange=B(q.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:true,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:false}}});
d.arearange=g(d.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(K){return[K.low,K.high]
},pointValKey:"low",getSegments:function(){var K=this;
D(K.points,function(L){if(!K.options.connectNulls&&(L.low===null||L.high===null)){L.y=null
}else{if(L.low===null&&L.high!==null){L.y=L.high
}}});
A.prototype.getSegments.call(this)
},translate:function(){var L=this,K=L.yAxis;
d.area.prototype.translate.apply(L);
D(L.points,function(N){var M=N.low,P=N.high,O=N.plotY;
if(P===null&&M===null){N.y=null
}else{if(M===null){N.plotLow=N.plotY=null;
N.plotHigh=K.translate(P,0,1,0,1)
}else{if(P===null){N.plotLow=O;
N.plotHigh=null
}else{N.plotLow=O;
N.plotHigh=K.translate(P,0,1,0,1)
}}}})
},getSegmentPath:function(O){var L,U=[],N=O.length,K=A.prototype.getSegmentPath,R,S,Q,T=this.options,M=T.step,P;
L=HighchartsAdapter.grep(O,function(V){return V.plotLow!==null
});
while(N--){R=O[N];
if(R.plotHigh!==null){U.push({plotX:R.plotX,plotY:R.plotHigh})
}}Q=K.call(this,L);
if(M){if(M===true){M="left"
}T.step={left:"right",center:"center",right:"left"}[M]
}P=K.call(this,U);
T.step=M;
S=[].concat(Q,P);
P[0]="L";
this.areaPath=this.areaPath.concat(Q,P);
return S
},drawDataLabels:function(){var P=this.data,L=P.length,Q,K=[],O=A.prototype,M=this.options.dataLabels,R=M.align,S,N=this.chart.inverted;
if(M.enabled||this._hasPointLabels){Q=L;
while(Q--){S=P[Q];
S.y=S.high;
S._plotY=S.plotY;
S.plotY=S.plotHigh;
K[Q]=S.dataLabel;
S.dataLabel=S.dataLabelUpper;
S.below=false;
if(N){if(!R){M.align="left"
}M.x=M.xHigh
}else{M.y=M.yHigh
}}if(O.drawDataLabels){O.drawDataLabels.apply(this,arguments)
}Q=L;
while(Q--){S=P[Q];
S.dataLabelUpper=S.dataLabel;
S.dataLabel=K[Q];
S.y=S.low;
S.plotY=S._plotY;
S.below=true;
if(N){if(!R){M.align="right"
}M.x=M.xLow
}else{M.y=M.yLow
}}if(O.drawDataLabels){O.drawDataLabels.apply(this,arguments)
}}M.align=R
},alignDataLabel:function(){d.column.prototype.alignDataLabel.apply(this,arguments)
},getSymbol:G,drawPoints:G});
q.areasplinerange=B(q.arearange);
d.areasplinerange=g(d.arearange,{type:"areasplinerange",getPointSpline:d.spline.prototype.getPointSpline});
(function(){var K=d.column.prototype;
q.columnrange=B(q.column,q.arearange,{lineWidth:1,pointRange:null});
d.columnrange=g(d.arearange,{type:"columnrange",translate:function(){var M=this,L=M.yAxis,N;
K.translate.apply(M);
D(M.points,function(P){var S=P.shapeArgs,Q=M.options.minPointLength,R,O,T;
P.tooltipPos=null;
P.plotHigh=N=L.translate(P.high,0,1,0,1);
P.plotLow=P.plotY;
T=N;
O=P.plotY-N;
if(O<Q){R=(Q-O);
O+=R;
T-=R/2
}S.height=O;
S.y=T
})
},trackerGroups:["group","dataLabelsGroup"],drawGraph:G,pointAttrToOptions:K.pointAttrToOptions,drawPoints:K.drawPoints,drawTracker:K.drawTracker,animate:K.animate,getColumnMetrics:K.getColumnMetrics})
}());
q.gauge=B(q.line,{dataLabels:{enabled:true,defer:false,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,crop:false,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:false});
var J=g(o,{setState:function(K){this.state=K
}});
var H={type:"gauge",pointClass:J,angular:true,drawGraph:G,fixedBox:true,forceDL:true,trackerGroups:["group","dataLabelsGroup"],translate:function(){var N=this,L=N.yAxis,M=N.options,K=L.center;
N.generatePoints();
D(N.points,function(U){var O=B(M.dial,U.dial),R=(p(n(O.radius,80))*K[2])/200,T=(p(n(O.baseLength,70))*R)/100,P=(p(n(O.rearLength,10))*R)/100,Q=O.baseWidth||3,S=O.topWidth||1,V=M.overshoot,W=L.startAngleRad+L.translate(U.y,null,null,null,true);
if(V&&typeof V==="number"){V=V/180*Math.PI;
W=Math.max(L.startAngleRad-V,Math.min(L.endAngleRad+V,W))
}else{if(M.wrap===false){W=Math.max(L.startAngleRad,Math.min(L.endAngleRad,W))
}}W=W*180/Math.PI;
U.shapeType="path";
U.shapeArgs={d:O.path||["M",-P,-Q/2,"L",T,-Q/2,R,-S/2,R,S/2,T,Q/2,-P,Q/2,"z"],translateX:K[0],translateY:K[1],rotation:W};
U.plotX=K[0];
U.plotY=K[1]
})
},drawPoints:function(){var N=this,K=N.yAxis.center,L=N.pivot,M=N.options,O=M.pivot,P=N.chart.renderer;
D(N.points,function(Q){var U=Q.graphic,S=Q.shapeArgs,T=S.d,R=B(M.dial,Q.dial);
if(U){U.animate(S);
S.d=T
}else{Q.graphic=P[Q.shapeType](S).attr({stroke:R.borderColor||"none","stroke-width":R.borderWidth||0,fill:R.backgroundColor||"black",rotation:S.rotation}).add(N.group)
}});
if(L){L.animate({translateX:K[0],translateY:K[1]})
}else{N.pivot=P.circle(0,0,n(O.radius,5)).attr({"stroke-width":O.borderWidth||0,stroke:O.borderColor||"silver",fill:O.backgroundColor||"black"}).translate(K[0],K[1]).add(N.group)
}},animate:function(L){var K=this;
if(!L){D(K.points,function(M){var N=M.graphic;
if(N){N.attr({rotation:K.yAxis.startAngleRad*180/Math.PI});
N.animate({rotation:M.shapeArgs.rotation},K.options.animation)
}});
K.animate=null
}},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);
A.prototype.render.call(this);
this.group.clip(this.chart.clipRect)
},setData:function(K,L){A.prototype.setData.call(this,K,false);
this.processData();
this.generatePoints();
if(n(L,true)){this.chart.redraw()
}},drawTracker:u&&u.drawTrackerPoint};
d.gauge=g(d.line,H);
q.boxplot=B(q.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-0.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">\u25CF</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2});
d.boxplot=g(d.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(K){return[K.low,K.q1,K.median,K.q3,K.high]
},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:G,translate:function(){var M=this,L=M.yAxis,K=M.pointArrayMap;
d.column.prototype.translate.apply(M);
D(M.points,function(N){D(K,function(O){if(N[O]!==null){N[O+"Plot"]=L.translate(N[O],0,1,0,1)
}})
})
},drawPoints:function(){var S=this,ad=S.points,M=S.options,X=S.chart,aa=X.renderer,U,L,P,ah,V,K,ac,ak,W,R,T,Z,ag,al,aj,am,Y,O,af,Q,ae,ab,N=S.doQuartiles!==false,ai=parseInt(S.options.whiskerLength,10)/100;
D(ad,function(an){W=an.graphic;
ae=an.shapeArgs;
T={};
al={};
am={};
ab=an.color||S.color;
if(an.plotY!==x){U=an.pointAttr[an.selected?"selected":""];
Y=ae.width;
O=F(ae.x);
af=O+Y;
Q=y(Y/2);
L=F(N?an.q1Plot:an.lowPlot);
P=F(N?an.q3Plot:an.lowPlot);
ah=F(an.highPlot);
V=F(an.lowPlot);
T.stroke=an.stemColor||M.stemColor||ab;
T["stroke-width"]=n(an.stemWidth,M.stemWidth,M.lineWidth);
T.dashstyle=an.stemDashStyle||M.stemDashStyle;
al.stroke=an.whiskerColor||M.whiskerColor||ab;
al["stroke-width"]=n(an.whiskerWidth,M.whiskerWidth,M.lineWidth);
am.stroke=an.medianColor||M.medianColor||ab;
am["stroke-width"]=n(an.medianWidth,M.medianWidth,M.lineWidth);
am["stroke-linecap"]="round";
ac=(T["stroke-width"]%2)/2;
ak=O+Q+ac;
R=["M",ak,P,"L",ak,ah,"M",ak,L,"L",ak,V];
if(N){ac=(U["stroke-width"]%2)/2;
ak=F(ak)+ac;
L=F(L)+ac;
P=F(P)+ac;
O+=ac;
af+=ac;
Z=["M",O,P,"L",O,L,"L",af,L,"L",af,P,"L",O,P,"z"]
}if(ai){ac=(al["stroke-width"]%2)/2;
ah=ah+ac;
V=V+ac;
ag=["M",ak-Q*ai,ah,"L",ak+Q*ai,ah,"M",ak-Q*ai,V,"L",ak+Q*ai,V]
}ac=(am["stroke-width"]%2)/2;
K=y(an.medianPlot)+ac;
aj=["M",O,K,"L",af,K];
if(W){an.stem.animate({d:R});
if(ai){an.whiskers.animate({d:ag})
}if(N){an.box.animate({d:Z})
}an.medianShape.animate({d:aj})
}else{an.graphic=W=aa.g().add(S.group);
an.stem=aa.path(R).attr(T).add(W);
if(ai){an.whiskers=aa.path(ag).attr(al).add(W)
}if(N){an.box=aa.path(Z).attr(U).add(W)
}an.medianShape=aa.path(aj).attr(am).add(W)
}}})
}});
q.errorbar=B(q.boxplot,{color:"#000000",grouping:false,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null});
d.errorbar=g(d.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(K){return[K.low,K.high]
},pointValKey:"high",doQuartiles:false,drawDataLabels:d.arearange?d.arearange.prototype.drawDataLabels:G,getColumnMetrics:function(){return(this.linkedParent&&this.linkedParent.columnMetrics)||d.column.prototype.getColumnMetrics.call(this)
}});
q.waterfall=B(q.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333",states:{hover:{lineWidthPlus:0}}});
d.waterfall=g(d.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(L,K){K.stacking=true;
d.column.prototype.init.call(this,L,K)
},translate:function(){var O=this,Y=O.options,L=O.yAxis,S,P,X,W,M,U,T,N,R,K,Q=Y.threshold,V;
d.column.prototype.translate.apply(this);
N=R=Q;
X=O.points;
for(P=0,S=X.length;
P<S;
P++){W=X[P];
M=W.shapeArgs;
U=O.getStack(P);
K=U.points[O.index+","+P];
if(isNaN(W.y)){W.y=O.yData[P]
}T=r(N,N+W.y)+K[0];
M.y=L.translate(T,0,1);
if(W.isSum){M.y=L.translate(K[1],0,1);
M.height=L.translate(K[0],0,1)-M.y
}else{if(W.isIntermediateSum){M.y=L.translate(K[1],0,1);
M.height=L.translate(R,0,1)-M.y;
R=K[1]
}else{N+=U.total
}}if(M.height<0){M.y+=M.height;
M.height*=-1
}W.plotY=M.y=y(M.y)-(O.borderWidth%2)/2;
M.height=r(y(M.height),0.001);
W.yBottom=M.y+M.height;
V=W.plotY+(W.negative?M.height:0);
if(O.chart.inverted){W.tooltipPos[0]=L.len-V
}else{W.tooltipPos[1]=V
}}},processData:function(L){var Q=this,X=Q.options,N=Q.yData,V=Q.points,U,M=N.length,R=X.threshold||0,K,S,W,O,T,P;
S=K=W=O=R;
for(P=0;
P<M;
P++){T=N[P];
U=V&&V[P]?V[P]:{};
if(T==="sum"||U.isSum){N[P]=S
}else{if(T==="intermediateSum"||U.isIntermediateSum){N[P]=K
}else{S+=T;
K+=T
}}W=Math.min(S,W);
O=Math.max(S,O)
}A.prototype.processData.call(this,L);
Q.dataMin=W;
Q.dataMax=O
},toYData:function(K){if(K.isSum){return"sum"
}else{if(K.isIntermediateSum){return"intermediateSum"
}}return K.y
},getAttribs:function(){d.column.prototype.getAttribs.apply(this,arguments);
var N=this,K=N.options,Q=K.states,P=K.upColor||N.color,M=e.Color(P).brighten(0.1).get(),O=B(N.pointAttr),L=N.upColorProp;
O[""][L]=P;
O.hover[L]=Q.hover.upColor||M;
O.select[L]=Q.select.upColor||P;
D(N.points,function(R){if(R.y>0&&!R.color){R.pointAttr=O;
R.color=P
}})
},getGraphPath:function(){var Q=this.data,N=Q.length,S=this.options.lineWidth+this.borderWidth,O=y(S)%2/2,W=[],U="M",V="L",R,K,P,T;
for(P=1;
P<N;
P++){K=Q[P].shapeArgs;
R=Q[P-1].shapeArgs;
T=[U,R.x+R.width,R.y+O,V,K.x,R.y+O];
if(Q[P-1].y<0){T[2]+=R.height;
T[5]+=R.height
}W=W.concat(T)
}return W
},getExtremes:G,getStack:function(L){var N=this.yAxis,M=N.stacks,K=this.stackKey;
if(this.processedYData[L]<this.options.threshold){K="-"+K
}return M[K][L]
},drawGraph:A.prototype.drawGraph});
q.bubble=B(q.scatter,{dataLabels:{formatter:function(){return this.point.z
},inside:true,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0});
var k=g(o,{haloPath:function(){return o.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size)
}});
d.bubble=g(d.scatter,{type:"bubble",pointClass:k,pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:true,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(M){var L=this.options.marker,K=n(L.fillOpacity,0.5);
M=M||L.fillColor||this.color;
if(K!==1){M=h(M).setOpacity(K).get("rgba")
}return M
},convertAttribs:function(){var K=A.prototype.convertAttribs.apply(this,arguments);
K.fill=this.applyOpacity(K.fill);
return K
},getRadii:function(P,U,K,T){var O,N,S,L=this.zData,M=[],R=this.options.sizeBy!=="width",Q;
for(N=0,O=L.length;
N<O;
N++){Q=U-P;
S=Q>0?(L[N]-P)/(U-P):0.5;
if(R&&S>=0){S=Math.sqrt(S)
}M.push(w.ceil(K+S*(T-K))/2)
}this.radii=M
},animate:function(L){var K=this.options.animation;
if(!L){D(this.points,function(M){var O=M.graphic,N=M.shapeArgs;
if(O&&N){O.attr("r",1);
O.animate({r:N.r},K)
}});
this.animate=null
}},translate:function(){var M,N=this.data,L,K,O=this.radii;
d.scatter.prototype.translate.call(this);
M=N.length;
while(M--){L=N[M];
K=O?O[M]:0;
L.negative=L.z<(this.options.zThreshold||0);
if(K>=this.minPxSize/2){L.shapeType="circle";
L.shapeArgs={x:L.plotX,y:L.plotY,r:K};
L.dlBox={x:L.plotX-K,y:L.plotY-K,width:2*K,height:2*K}
}else{L.shapeArgs=L.plotY=L.dlBox=x
}}},drawLegendSymbol:function(L,M){var K=p(L.itemStyle.fontSize)/2;
M.legendSymbol=this.chart.renderer.circle(K,L.baseline-K,K).attr({zIndex:3}).add(M.legendGroup);
M.legendSymbol.isMarker=true
},drawPoints:d.column.prototype.drawPoints,alignDataLabel:d.column.prototype.alignDataLabel});
i.prototype.beforePadding=function(){var M=this,S=this.len,U=this.chart,N=0,W=S,K=this.isXAxis,R=K?"xData":"yData",O=this.min,Y={},V=w.min(U.plotWidth,U.plotHeight),T=Number.MAX_VALUE,X=-Number.MAX_VALUE,Q=this.max-O,P=S/Q,L=[];
if(this.tickPositions){D(this.series,function(aa){var Z=aa.options,ab;
if(aa.bubblePadding&&(aa.visible||!U.options.chart.ignoreHiddenSeries)){M.allowZoomOutside=true;
L.push(aa);
if(K){D(["minSize","maxSize"],function(ae){var ac=Z[ae],ad=/%$/.test(ac);
ac=p(ac);
Y[ae]=ad?V*ac/100:ac
});
aa.minPxSize=Y.minSize;
ab=aa.zData;
if(ab.length){T=n(Z.zMin,w.min(T,w.max(s(ab),Z.displayNegative===false?Z.zThreshold:-Number.MAX_VALUE)));
X=n(Z.zMax,w.max(X,a(ab)))
}}}});
D(L,function(ab){var ac=ab[R],aa=ac.length,Z;
if(K){ab.getRadii(T,X,Y.minSize,Y.maxSize)
}if(Q>0){while(aa--){if(typeof ac[aa]==="number"){Z=ab.radii[aa];
N=Math.min(((ac[aa]-O)*P)-Z,N);
W=Math.max(((ac[aa]-O)*P)+Z,W)
}}}});
if(L.length&&Q>0&&n(this.options.min,this.userMin)===x&&n(this.options.max,this.userMax)===x){W-=S;
P*=(S+N-W)/S;
this.min+=N/P;
this.max+=W/P
}}};
(function(){var L=A.prototype,K=j.prototype,M;
L.toXY=function(P){var U,S=this.chart,R=P.plotX,Q=P.plotY,T;
P.rectPlotX=R;
P.rectPlotY=Q;
T=((R/Math.PI*180)+this.xAxis.pane.options.startAngle)%360;
if(T<0){T+=360
}P.clientX=T;
U=this.xAxis.postTranslate(P.plotX,this.yAxis.len-Q);
P.plotX=P.polarPlotX=U.x-S.plotLeft;
P.plotY=P.polarPlotY=U.y-S.plotTop
};
L.orderTooltipPoints=function(P){if(this.chart.polar){P.sort(function(R,Q){return R.clientX-Q.clientX
});
if(P[0]){P[0].wrappedClientX=P[0].clientX+360;
P.push(P[0])
}}};
function O(R,Q,P){R.call(this,Q,P);
if(this.chart.polar){this.closeSegment=function(T){var S=this.xAxis.center;
T.push("L",S[0],S[1])
};
this.closedStacks=true
}}if(d.area){C(d.area.prototype,"init",O)
}if(d.areaspline){C(d.areaspline.prototype,"init",O)
}if(d.spline){C(d.spline.prototype,"getPointSpline",function(R,Q,af,ag){var am,ae=1.5,P=ae+1,U,S,T,ah,W,V,ak,aj,aa,Y,ac,ab,al,X,ad,ai,Z;
if(this.chart.polar){U=af.plotX;
S=af.plotY;
T=Q[ag-1];
ah=Q[ag+1];
if(this.connectEnds){if(!T){T=Q[Q.length-2]
}if(!ah){ah=Q[1]
}}if(T&&ah){W=T.plotX;
V=T.plotY;
ak=ah.plotX;
aj=ah.plotY;
aa=(ae*U+W)/P;
Y=(ae*S+V)/P;
ac=(ae*U+ak)/P;
ab=(ae*S+aj)/P;
al=Math.sqrt(Math.pow(aa-U,2)+Math.pow(Y-S,2));
X=Math.sqrt(Math.pow(ac-U,2)+Math.pow(ab-S,2));
ad=Math.atan2(Y-S,aa-U);
ai=Math.atan2(ab-S,ac-U);
Z=(Math.PI/2)+((ad+ai)/2);
if(Math.abs(ad-Z)>Math.PI/2){Z-=Math.PI
}aa=U+Math.cos(Z)*al;
Y=S+Math.sin(Z)*al;
ac=U+Math.cos(Math.PI+Z)*X;
ab=S+Math.sin(Math.PI+Z)*X;
af.rightContX=ac;
af.rightContY=ab
}if(!ag){am=["M",U,S]
}else{am=["C",T.rightContX||T.plotX,T.rightContY||T.plotY,aa||U,Y||S,U,S];
T.rightContX=T.rightContY=null
}}else{am=R.call(this,Q,af,ag)
}return am
})
}C(L,"translate",function(R){R.call(this);
if(this.chart.polar&&!this.preventPostTranslate){var Q=this.points,P=Q.length;
while(P--){this.toXY(Q[P])
}}});
C(L,"getSegmentPath",function(R,Q){var P=this.points;
if(this.chart.polar&&this.options.connectEnds!==false&&Q[Q.length-1]===P[P.length-1]&&P[0].y!==null){this.connectEnds=true;
Q=[].concat(Q,[P[0]])
}return R.call(this,Q)
});
function N(T,X){var U=this.chart,S=this.options.animation,W=this.group,Y=this.markerGroup,P=this.xAxis.center,R=U.plotLeft,V=U.plotTop,Q;
if(U.polar){if(U.renderer.isSVG){if(S===true){S={}
}if(X){Q={translateX:P[0]+R,translateY:P[1]+V,scaleX:0.001,scaleY:0.001};
W.attr(Q);
if(Y){Y.attr(Q)
}}else{Q={translateX:R,translateY:V,scaleX:1,scaleY:1};
W.animate(Q,S);
if(Y){Y.animate(Q,S)
}this.animate=null
}}}else{T.call(this,X)
}}C(L,"animate",N);
C(L,"setTooltipPoints",function(Q,P){if(this.chart.polar){f(this.xAxis,{tooltipLen:360})
}return Q.call(this,P)
});
if(d.column){M=d.column.prototype;
C(M,"animate",N);
C(M,"translate",function(V){var R=this.xAxis,T=this.yAxis.len,P=R.center,W=R.startAngleRad,U=this.chart.renderer,Q,Y,X,S;
this.preventPostTranslate=true;
V.call(this);
if(R.isRadial){Y=this.points;
S=Y.length;
while(S--){X=Y[S];
Q=X.barX+W;
X.shapeType="path";
X.shapeArgs={d:U.symbols.arc(P[0],P[1],T-X.plotY,null,{start:Q,end:Q+X.pointWidth,innerR:T-n(X.yBottom,T)})};
this.toXY(X);
X.tooltipPos=[X.plotX,X.plotY];
X.ttBelow=X.plotY>P[1]
}}});
C(M,"alignDataLabel",function(U,V,W,X,T,R){if(this.chart.polar){var Q=V.rectPlotX/Math.PI*180,S,P;
if(X.align===null){if(Q>20&&Q<160){S="left"
}else{if(Q>200&&Q<340){S="right"
}else{S="center"
}}X.align=S
}if(X.verticalAlign===null){if(Q<45||Q>315){P="bottom"
}else{if(Q>135&&Q<225){P="top"
}else{P="middle"
}}X.verticalAlign=P
}L.alignDataLabel.call(this,V,W,X,T,R)
}else{U.call(this,V,W,X,T,R)
}})
}C(K,"getIndex",function(T,U){var R,S=this.chart,Q,P,V;
if(S.polar){Q=S.xAxis[0].center;
P=U.chartX-Q[0]-S.plotLeft;
V=U.chartY-Q[1]-S.plotTop;
R=180-Math.round(Math.atan2(P,V)/Math.PI*180)
}else{R=T.call(this,U)
}return R
});
C(K,"getCoordinates",function(R,S){var Q=this.chart,P={xAxis:[],yAxis:[]};
if(Q.polar){D(Q.axes,function(V){var W=V.isXAxis,U=V.center,T=S.chartX-U[0]-Q.plotLeft,X=S.chartY-U[1]-Q.plotTop;
P[W?"xAxis":"yAxis"].push({axis:V,value:V.translate(W?Math.PI-Math.atan2(T,X):Math.sqrt(Math.pow(T,2)+Math.pow(X,2)),true)})
})
}else{P=R.call(this,S)
}return P
})
}())
}(Highcharts));