(function(ak,ae){function B(m,h,o){this.init.call(this,m,h,o)
}var i=ak.arrayMin,g=ak.arrayMax,ad=ak.each,Z=ak.extend,aj=ak.merge,f=ak.map,ag=ak.pick,I=ak.pInt,ai=ak.getOptions().plotOptions,al=ak.seriesTypes,aa=ak.extendClass,l=ak.splat,af=ak.wrap,k=ak.Axis,E=ak.Tick,W=ak.Point,e=ak.Pointer,d=ak.CenteredSeriesMixin,n=ak.TrackerMixin,ab=ak.Series,Y=Math,ac=Y.round,ah=Y.floor,c=Y.max,b=ak.Color,J=function(){};
Z(B.prototype,{init:function(m,h,q){var p=this,o=p.defaultOptions;
p.chart=h;
if(h.angular){o.background={}
}p.options=m=aj(o,m);
(m=m.background)&&ad([].concat(l(m)).reverse(),function(r){var s=r.backgroundColor,r=aj(p.defaultBackgroundOptions,r);
if(s){r.backgroundColor=s
}r.color=r.backgroundColor;
q.options.plotBands.unshift(r)
})
},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});
var X=k.prototype,E=E.prototype,a={getOffset:J,redraw:function(){this.isDirty=!1
},render:function(){this.isDirty=!1
},setScale:J,setCategories:J,setTitle:J},j={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(h){h=this.options=aj(this.defaultOptions,this.defaultRadialOptions,h);
if(!h.plotBands){h.plotBands=[]
}},getOffset:function(){X.getOffset.call(this);
this.chart.axisOffset[this.side]=0;
this.center=this.pane.center=d.getCenter.call(this.pane)
},getLinePath:function(m,h){var o=this.center,h=ag(h,o[2]/2-this.offset);
return this.chart.renderer.symbols.arc(this.left+o[0],this.top+o[1],h,h,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})
},setAxisTranslation:function(){X.setAxisTranslation.call(this);
if(this.center){this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0
}},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0)
},setAxisSize:function(){X.setAxisSize.call(this);
if(this.isRadial){this.center=this.pane.center=ak.CenteredSeriesMixin.getCenter.call(this.pane);
if(this.isCircular){this.sector=this.endAngleRad-this.startAngleRad
}this.len=this.width=this.height=this.center[2]*ag(this.sector,1)/2
}},getPosition:function(m,h){return this.postTranslate(this.isCircular?this.translate(m):0,ag(this.isCircular?h:this.translate(m),this.center[2]/2)-this.offset)
},postTranslate:function(m,h){var p=this.chart,o=this.center,m=this.startAngleRad+m;
return{x:p.plotLeft+o[0]+Math.cos(m)*h,y:p.plotTop+o[1]+Math.sin(m)*h}
},getPlotBandPath:function(v,u,t){var s=this.center,r=this.startAngleRad,q=s[2]/2,p=[ag(t.outerRadius,"100%"),t.innerRadius,ag(t.thickness,10)],o=/%$/,m,h=this.isCircular;
this.options.gridLineInterpolation==="polygon"?s=this.getPlotLinePath(v).concat(this.getPlotLinePath(u,!0)):(h||(p[0]=this.translate(v),p[1]=this.translate(u)),p=f(p,function(w){o.test(w)&&(w=I(w,10)*q/100);
return w
}),t.shape==="circle"||!h?(v=-Math.PI/2,u=Math.PI*1.5,m=!0):(v=r+this.translate(v),u=r+this.translate(u)),s=this.chart.renderer.symbols.arc(this.left+s[0],this.top+s[1],p[0],p[0],{start:v,end:u,innerR:ag(p[1],p[0]-p[2]),open:m}));
return s
},getPlotLinePath:function(u,t){var s=this,r=s.center,q=s.chart,p=s.getPosition(u),o,m,h;
s.isCircular?h=["M",r[0]+q.plotLeft,r[1]+q.plotTop,"L",p.x,p.y]:s.options.gridLineInterpolation==="circle"?(u=s.translate(u))&&(h=s.getLinePath(0,u)):(ad(q.xAxis,function(v){v.pane===s.pane&&(o=v)
}),h=[],u=s.translate(u),r=o.tickPositions,o.autoConnect&&(r=r.concat([r[0]])),t&&(r=[].concat(r).reverse()),ad(r,function(v,w){m=o.getPosition(v,u);
h.push(w?"L":"M",m.x,m.y)
}));
return h
},getTitlePosition:function(){var m=this.center,h=this.chart,o=this.options.title;
return{x:h.plotLeft+m[0]+(o.x||0),y:h.plotTop+m[1]-{high:0.5,middle:0.25,low:0}[o.align]*m[2]+(o.y||0)}
}};
af(X,"init",function(w,v,u){var p;
var t=v.angular,s=v.polar,r=u.isX,q=t&&r,o,m;
m=v.options;
var h=u.pane||0;
if(t){if(Z(this,q?a:j),o=!r){this.defaultRadialOptions=this.defaultRadialGaugeOptions
}}else{if(s){Z(this,j),this.defaultRadialOptions=(o=r)?this.defaultRadialXOptions:aj(this.defaultYAxisOptions,this.defaultRadialYOptions)
}}w.call(this,v,u);
if(!q&&(t||s)){w=this.options;
if(!v.panes){v.panes=[]
}this.pane=(p=v.panes[h]=v.panes[h]||new B(l(m.pane)[h],v,this),h=p);
h=h.options;
v.inverted=!1;
m.chart.zoomType=null;
this.startAngleRad=v=(h.startAngle-90)*Math.PI/180;
this.endAngleRad=m=(ag(h.endAngle,h.startAngle+360)-90)*Math.PI/180;
this.offset=w.offset||0;
if((this.isCircular=o)&&u.max===ae&&m-v===2*Math.PI){this.autoConnect=!0
}}});
af(E,"getPosition",function(m,h,r,q,p){var o=this.axis;
return o.getPosition?o.getPosition(r):m.call(this,h,r,q,p)
});
af(E,"getLabelPosition",function(z,y,x,w,v,u,t,p,o){var m=this.axis,q=u.y,r=u.align,s=(m.translate(this.pos)+m.startAngleRad+Math.PI/2)/Math.PI*180%360;
m.isRadial?(z=m.getPosition(this.pos,m.center[2]/2+ag(u.distance,-25)),u.rotation==="auto"?w.attr({rotation:s}):q===null&&(q=m.chart.renderer.fontMetrics(w.styles.fontSize).b-w.getBBox().height/2),r===null&&(r=m.isCircular?s>20&&s<160?"left":s>200&&s<340?"right":"center":"center",w.attr({align:r})),z.x+=u.x,z.y+=q):z=z.call(this,y,x,w,v,u,t,p,o);
return z
});
af(E,"getMarkPath",function(m,h,t,s,r,q,p){var o=this.axis;
o.isRadial?(m=o.getPosition(this.pos,o.center[2]/2+s),h=["M",h,t,"L",m.x,m.y]):h=m.call(this,h,t,s,r,q,p);
return h
});
ai.arearange=aj(ai.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">â—?</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}});
al.arearange=aa(al.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(h){return[h.low,h.high]
},pointValKey:"low",getSegments:function(){var h=this;
ad(h.points,function(m){if(!h.options.connectNulls&&(m.low===null||m.high===null)){m.y=null
}else{if(m.low===null&&m.high!==null){m.y=m.high
}}});
ab.prototype.getSegments.call(this)
},translate:function(){var h=this.yAxis;
al.area.prototype.translate.apply(this);
ad(this.points,function(m){var q=m.low,p=m.high,o=m.plotY;
p===null&&q===null?m.y=null:q===null?(m.plotLow=m.plotY=null,m.plotHigh=h.translate(p,0,1,0,1)):p===null?(m.plotLow=o,m.plotHigh=null):(m.plotLow=o,m.plotHigh=h.translate(p,0,1,0,1))
})
},getSegmentPath:function(m){var h,t=[],s=m.length,r=ab.prototype.getSegmentPath,q,p;
p=this.options;
var o=p.step;
for(h=HighchartsAdapter.grep(m,function(u){return u.plotLow!==null
});
s--;
){q=m[s],q.plotHigh!==null&&t.push({plotX:q.plotX,plotY:q.plotHigh})
}m=r.call(this,h);
if(o){o===!0&&(o="left"),p.step={left:"right",center:"center",right:"left"}[o]
}t=r.call(this,t);
p.step=o;
p=[].concat(m,t);
t[0]="L";
this.areaPath=this.areaPath.concat(m,t);
return p
},drawDataLabels:function(){var m=this.data,h=m.length,t,s=[],r=ab.prototype,q=this.options.dataLabels,p,o=this.chart.inverted;
if(q.enabled||this._hasPointLabels){for(t=h;
t--;
){p=m[t],p.y=p.high,p._plotY=p.plotY,p.plotY=p.plotHigh,s[t]=p.dataLabel,p.dataLabel=p.dataLabelUpper,p.below=!1,o?(q.align="left",q.x=q.xHigh):q.y=q.yHigh
}r.drawDataLabels&&r.drawDataLabels.apply(this,arguments);
for(t=h;
t--;
){p=m[t],p.dataLabelUpper=p.dataLabel,p.dataLabel=s[t],p.y=p.low,p.plotY=p._plotY,p.below=!0,o?(q.align="right",q.x=q.xLow):q.y=q.yLow
}r.drawDataLabels&&r.drawDataLabels.apply(this,arguments)
}},alignDataLabel:function(){al.column.prototype.alignDataLabel.apply(this,arguments)
},getSymbol:al.column.prototype.getSymbol,drawPoints:J});
ai.areasplinerange=aj(ai.arearange);
al.areasplinerange=aa(al.arearange,{type:"areasplinerange",getPointSpline:al.spline.prototype.getPointSpline});
(function(){var h=al.column.prototype;
ai.columnrange=aj(ai.column,ai.arearange,{lineWidth:1,pointRange:null});
al.columnrange=aa(al.arearange,{type:"columnrange",translate:function(){var m=this,p=m.yAxis,o;
h.translate.apply(m);
ad(m.points,function(q){var t=q.shapeArgs,s=m.options.minPointLength,r;
q.tooltipPos=null;
q.plotHigh=o=p.translate(q.high,0,1,0,1);
q.plotLow=q.plotY;
r=o;
q=q.plotY-o;
q<s&&(s-=q,q+=s,r-=s/2);
t.height=q;
t.y=r
})
},trackerGroups:["group","dataLabels"],drawGraph:J,pointAttrToOptions:h.pointAttrToOptions,drawPoints:h.drawPoints,drawTracker:h.drawTracker,animate:h.animate,getColumnMetrics:h.getColumnMetrics})
})();
ai.gauge=aj(ai.line,{dataLabels:{enabled:!0,defer:!1,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,crop:!1,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});
n={type:"gauge",pointClass:aa(W,{setState:function(h){this.state=h
}}),angular:!0,drawGraph:J,fixedBox:!0,forceDL:!0,trackerGroups:["group","dataLabels"],translate:function(){var m=this.yAxis,h=this.options,o=m.center;
this.generatePoints();
ad(this.points,function(x){var w=aj(h.dial,x.dial),v=I(ag(w.radius,80))*o[2]/200,u=I(ag(w.baseLength,70))*v/100,r=I(ag(w.rearLength,10))*v/100,q=w.baseWidth||3,p=w.topWidth||1,s=h.overshoot,t=m.startAngleRad+m.translate(x.y,null,null,null,!0);
s&&typeof s==="number"?(s=s/180*Math.PI,t=Math.max(m.startAngleRad-s,Math.min(m.endAngleRad+s,t))):h.wrap===!1&&(t=Math.max(m.startAngleRad,Math.min(m.endAngleRad,t)));
t=t*180/Math.PI;
x.shapeType="path";
x.shapeArgs={d:w.path||["M",-r,-q/2,"L",u,-q/2,v,-p/2,v,p/2,u,q/2,-r,q/2,"z"],translateX:o[0],translateY:o[1],rotation:t};
x.plotX=o[0];
x.plotY=o[1]
})
},drawPoints:function(){var m=this,h=m.yAxis.center,r=m.pivot,q=m.options,p=q.pivot,o=m.chart.renderer;
ad(m.points,function(w){var s=w.graphic,t=w.shapeArgs,v=t.d,u=aj(q.dial,w.dial);
s?(s.animate(t),t.d=v):w.graphic=o[w.shapeType](t).attr({stroke:u.borderColor||"none","stroke-width":u.borderWidth||0,fill:u.backgroundColor||"black",rotation:t.rotation}).add(m.group)
});
r?r.animate({translateX:h[0],translateY:h[1]}):m.pivot=o.circle(0,0,ag(p.radius,5)).attr({"stroke-width":p.borderWidth||0,stroke:p.borderColor||"silver",fill:p.backgroundColor||"black"}).translate(h[0],h[1]).add(m.group)
},animate:function(m){var h=this;
if(!m){ad(h.points,function(o){var p=o.graphic;
p&&(p.attr({rotation:h.yAxis.startAngleRad*180/Math.PI}),p.animate({rotation:o.shapeArgs.rotation},h.options.animation))
}),h.animate=null
}},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);
ab.prototype.render.call(this);
this.group.clip(this.chart.clipRect)
},setData:function(m,h){ab.prototype.setData.call(this,m,!1);
this.processData();
this.generatePoints();
ag(h,!0)&&this.chart.redraw()
},drawTracker:n&&n.drawTrackerPoint};
al.gauge=aa(al.line,n);
ai.boxplot=aj(ai.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-0.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">â—?</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2});
al.boxplot=aa(al.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(h){return[h.low,h.q1,h.median,h.q3,h.high]
},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:J,translate:function(){var m=this.yAxis,h=this.pointArrayMap;
al.column.prototype.translate.apply(this);
ad(this.points,function(o){ad(h,function(p){o[p]!==null&&(o[p+"Plot"]=m.translate(o[p],0,1,0,1))
})
})
},drawPoints:function(){var au=this,at=au.points,ar=au.options,aq=au.chart.renderer,ap,ao,an,T,S,Q,U,V,am,R,O,D,M,P,A,H,F,L,G,C,q,s,K=au.doQuartiles!==!1,N=parseInt(au.options.whiskerLength,10)/100;
ad(at,function(h){am=h.graphic;
q=h.shapeArgs;
O={};
P={};
H={};
s=h.color||au.color;
if(h.plotY!==ae){if(ap=h.pointAttr[h.selected?"selected":""],F=q.width,L=ah(q.x),G=L+F,C=ac(F/2),ao=ah(K?h.q1Plot:h.lowPlot),an=ah(K?h.q3Plot:h.lowPlot),T=ah(h.highPlot),S=ah(h.lowPlot),O.stroke=h.stemColor||ar.stemColor||s,O["stroke-width"]=ag(h.stemWidth,ar.stemWidth,ar.lineWidth),O.dashstyle=h.stemDashStyle||ar.stemDashStyle,P.stroke=h.whiskerColor||ar.whiskerColor||s,P["stroke-width"]=ag(h.whiskerWidth,ar.whiskerWidth,ar.lineWidth),H.stroke=h.medianColor||ar.medianColor||s,H["stroke-width"]=ag(h.medianWidth,ar.medianWidth,ar.lineWidth),H["stroke-linecap"]="round",U=O["stroke-width"]%2/2,V=L+C+U,R=["M",V,an,"L",V,T,"M",V,ao,"L",V,S],K&&(U=ap["stroke-width"]%2/2,V=ah(V)+U,ao=ah(ao)+U,an=ah(an)+U,L+=U,G+=U,D=["M",L,an,"L",L,ao,"L",G,ao,"L",G,an,"L",L,an,"z"]),N&&(U=P["stroke-width"]%2/2,T+=U,S+=U,M=["M",V-C*N,T,"L",V+C*N,T,"M",V-C*N,S,"L",V+C*N,S]),U=H["stroke-width"]%2/2,Q=ac(h.medianPlot)+U,A=["M",L,Q,"L",G,Q],am){h.stem.animate({d:R}),N&&h.whiskers.animate({d:M}),K&&h.box.animate({d:D}),h.medianShape.animate({d:A})
}else{h.graphic=am=aq.g().add(au.group);
h.stem=aq.path(R).attr(O).add(am);
if(N){h.whiskers=aq.path(M).attr(P).add(am)
}if(K){h.box=aq.path(D).attr(ap).add(am)
}h.medianShape=aq.path(A).attr(H).add(am)
}}})
}});
ai.errorbar=aj(ai.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{series.color}">â—?</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null});
al.errorbar=aa(al.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(h){return[h.low,h.high]
},pointValKey:"high",doQuartiles:!1,drawDataLabels:al.arearange?al.arearange.prototype.drawDataLabels:J,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||al.column.prototype.getColumnMetrics.call(this)
}});
ai.waterfall=aj(ai.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"});
al.waterfall=aa(al.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(m,h){h.stacking=!0;
al.column.prototype.init.call(this,m,h)
},translate:function(){var v=this.yAxis,u,t,s,r,q,p,o,m,h;
u=this.options.threshold;
al.column.prototype.translate.apply(this);
m=u;
s=this.points;
for(t=0,u=s.length;
t<u;
t++){r=s[t];
q=r.shapeArgs;
p=this.getStack(t);
h=p.points[this.index+","+t];
if(isNaN(r.y)){r.y=this.yData[t]
}o=c(m,m+r.y)+h[0];
q.y=v.translate(o,0,1);
r.isSum||r.isIntermediateSum?(q.y=v.translate(h[1],0,1),q.height=v.translate(h[0],0,1)-q.y):m+=p.total;
q.height<0&&(q.y+=q.height,q.height*=-1);
r.plotY=q.y=ac(q.y)-this.borderWidth%2/2;
q.height=ac(q.height);
r.yBottom=q.y+q.height
}},processData:function(x){var w=this.yData,v=this.points,u,t=w.length,s=this.options.threshold||0,r,o,m,h,p,q;
o=r=m=h=s;
for(q=0;
q<t;
q++){p=w[q],u=v&&v[q]?v[q]:{},p==="sum"||u.isSum?w[q]=o:p==="intermediateSum"||u.isIntermediateSum?(w[q]=r,r=s):(o+=p,r+=p),m=Math.min(o,m),h=Math.max(o,h)
}ab.prototype.processData.call(this,x);
this.dataMin=m;
this.dataMax=h
},toYData:function(h){if(h.isSum){return"sum"
}else{if(h.isIntermediateSum){return"intermediateSum"
}}return h.y
},getAttribs:function(){al.column.prototype.getAttribs.apply(this,arguments);
var m=this.options,h=m.states,q=m.upColor||this.color,m=ak.Color(q).brighten(0.1).get(),p=aj(this.pointAttr),o=this.upColorProp;
p[""][o]=q;
p.hover[o]=h.hover.upColor||m;
p.select[o]=h.select.upColor||q;
ad(this.points,function(r){if(r.y>0&&!r.color){r.pointAttr=p,r.color=q
}})
},getGraphPath:function(){var m=this.data,h=m.length,s=ac(this.options.lineWidth+this.borderWidth)%2/2,r=[],q,p,o;
for(o=1;
o<h;
o++){p=m[o].shapeArgs,q=m[o-1].shapeArgs,p=["M",q.x+q.width,q.y+s,"L",p.x,q.y+s],m[o-1].y<0&&(p[2]+=q.height,p[5]+=q.height),r=r.concat(p)
}return r
},getExtremes:J,getStack:function(m){var h=this.yAxis.stacks,o=this.stackKey;
this.processedYData[m]<this.options.threshold&&(o="-"+o);
return h[o][m]
},drawGraph:ab.prototype.drawGraph});
ai.bubble=aj(ai.scatter,{dataLabels:{format:"{point.z}",inside:!0,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0});
n=aa(W,{haloPath:function(){return W.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size)
}});
al.bubble=aa(al.scatter,{type:"bubble",pointClass:n,pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(m){var h=this.options.marker,o=ag(h.fillOpacity,0.5),m=m||h.fillColor||this.color;
o!==1&&(m=b(m).setOpacity(o).get("rgba"));
return m
},convertAttribs:function(){var h=ab.prototype.convertAttribs.apply(this,arguments);
h.fill=this.applyOpacity(h.fill);
return h
},getRadii:function(v,u,t,s){var r,q,p,o=this.zData,m=[],h=this.options.sizeBy!=="width";
for(q=0,r=o.length;
q<r;
q++){p=u-v,p=p>0?(o[q]-v)/(u-v):0.5,h&&p>=0&&(p=Math.sqrt(p)),m.push(Y.ceil(t+p*(s-t))/2)
}this.radii=m
},animate:function(m){var h=this.options.animation;
if(!m){ad(this.points,function(o){var p=o.graphic,o=o.shapeArgs;
p&&o&&(p.attr("r",1),p.animate({r:o.r},h))
}),this.animate=null
}},translate:function(){var m,h=this.data,q,p,o=this.radii;
al.scatter.prototype.translate.call(this);
for(m=h.length;
m--;
){q=h[m],p=o?o[m]:0,q.negative=q.z<(this.options.zThreshold||0),p>=this.minPxSize/2?(q.shapeType="circle",q.shapeArgs={x:q.plotX,y:q.plotY,r:p},q.dlBox={x:q.plotX-p,y:q.plotY-p,width:2*p,height:2*p}):q.shapeArgs=q.plotY=q.dlBox=ae
}},drawLegendSymbol:function(m,h){var o=I(m.itemStyle.fontSize)/2;
h.legendSymbol=this.chart.renderer.circle(o,m.baseline-o,o).attr({zIndex:3}).add(h.legendGroup);
h.legendSymbol.isMarker=!0
},drawPoints:al.column.prototype.drawPoints,alignDataLabel:al.column.prototype.alignDataLabel});
k.prototype.beforePadding=function(){var F=this,D=this.len,C=this.chart,A=0,z=D,y=this.isXAxis,x=y?"xData":"yData",t=this.min,s={},q=Y.min(C.plotWidth,C.plotHeight),u=Number.MAX_VALUE,v=-Number.MAX_VALUE,w=this.max-t,r=D/w,o=[];
this.tickPositions&&(ad(this.series,function(h){var m=h.options;
if(h.bubblePadding&&(h.visible||!C.options.chart.ignoreHiddenSeries)){if(F.allowZoomOutside=!0,o.push(h),y){ad(["minSize","maxSize"],function(G){var p=m[G],H=/%$/.test(p),p=I(p);
s[G]=H?q*p/100:p
}),h.minPxSize=s.minSize,h=h.zData,h.length&&(u=Y.min(u,Y.max(i(h),m.displayNegative===!1?m.zThreshold:-Number.MAX_VALUE)),v=Y.max(v,g(h)))
}}}),ad(o,function(m){var h=m[x],G=h.length,p;
y&&m.getRadii(u,v,s.minSize,s.maxSize);
if(w>0){for(;
G--;
){typeof h[G]==="number"&&(p=m.radii[G],A=Math.min((h[G]-t)*r-p,A),z=Math.max((h[G]-t)*r+p,z))
}}}),o.length&&w>0&&ag(this.options.min,this.userMin)===ae&&ag(this.options.max,this.userMax)===ae&&(z-=D,r*=(D+A-z)/D,this.min+=A/r,this.max+=z/r))
};
(function(){function m(s,r,t){s.call(this,r,t);
if(this.chart.polar){this.closeSegment=function(v){var u=this.xAxis.center;
v.push("L",u[0],u[1])
},this.closedStacks=!0
}}function h(z,y){var x=this.chart,w=this.options.animation,v=this.group,s=this.markerGroup,t=this.xAxis.center,u=x.plotLeft,r=x.plotTop;
if(x.polar){if(x.renderer.isSVG){w===!0&&(w={}),y?(x={translateX:t[0]+u,translateY:t[1]+r,scaleX:0.001,scaleY:0.001},v.attr(x),s&&s.attr(x)):(x={translateX:u,translateY:r,scaleX:1,scaleY:1},v.animate(x,w),s&&s.animate(x,w),this.animate=null)
}}else{z.call(this,y)
}}var q=ab.prototype,p=e.prototype,o;
q.toXY=function(s){var r,u=this.chart,t=s.plotX;
r=s.plotY;
s.rectPlotX=t;
s.rectPlotY=r;
t=(t/Math.PI*180+this.xAxis.pane.options.startAngle)%360;
t<0&&(t+=360);
s.clientX=t;
r=this.xAxis.postTranslate(s.plotX,this.yAxis.len-r);
s.plotX=s.polarPlotX=r.x-u.plotLeft;
s.plotY=s.polarPlotY=r.y-u.plotTop
};
q.orderTooltipPoints=function(r){if(this.chart.polar&&(r.sort(function(t,s){return t.clientX-s.clientX
}),r[0])){r[0].wrappedClientX=r[0].clientX+360,r.push(r[0])
}};
al.area&&af(al.area.prototype,"init",m);
al.areaspline&&af(al.areaspline.prototype,"init",m);
al.spline&&af(al.spline.prototype,"getPointSpline",function(C,A,z,y){var x,u,v,w,t,r,s;
if(this.chart.polar){x=z.plotX;
u=z.plotY;
C=A[y-1];
v=A[y+1];
this.connectEnds&&(C||(C=A[A.length-2]),v||(v=A[1]));
if(C&&v){w=C.plotX,t=C.plotY,A=v.plotX,r=v.plotY,w=(1.5*x+w)/2.5,t=(1.5*u+t)/2.5,v=(1.5*x+A)/2.5,s=(1.5*u+r)/2.5,A=Math.sqrt(Math.pow(w-x,2)+Math.pow(t-u,2)),r=Math.sqrt(Math.pow(v-x,2)+Math.pow(s-u,2)),w=Math.atan2(t-u,w-x),t=Math.atan2(s-u,v-x),s=Math.PI/2+(w+t)/2,Math.abs(w-s)>Math.PI/2&&(s-=Math.PI),w=x+Math.cos(s)*A,t=u+Math.sin(s)*A,v=x+Math.cos(Math.PI+s)*r,s=u+Math.sin(Math.PI+s)*r,z.rightContX=v,z.rightContY=s
}y?(z=["C",C.rightContX||C.plotX,C.rightContY||C.plotY,w||x,t||u,x,u],C.rightContX=C.rightContY=null):z=["M",x,u]
}else{z=C.call(this,A,z,y)
}return z
});
af(q,"translate",function(s){s.call(this);
if(this.chart.polar&&!this.preventPostTranslate){for(var s=this.points,r=s.length;
r--;
){this.toXY(s[r])
}}});
af(q,"getSegmentPath",function(s,r){var t=this.points;
if(this.chart.polar&&this.options.connectEnds!==!1&&r[r.length-1]===t[t.length-1]&&t[0].y!==null){this.connectEnds=!0,r=[].concat(r,[t[0]])
}return s.call(this,r)
});
af(q,"animate",h);
af(q,"setTooltipPoints",function(s,r){this.chart.polar&&Z(this.xAxis,{tooltipLen:360});
return s.call(this,r)
});
if(al.column){o=al.column.prototype,af(o,"animate",h),af(o,"translate",function(t){var s=this.xAxis,y=this.yAxis.len,x=s.center,w=s.startAngleRad,v=this.chart.renderer,u,r;
this.preventPostTranslate=!0;
t.call(this);
if(s.isRadial){s=this.points;
for(r=s.length;
r--;
){u=s[r],t=u.barX+w,u.shapeType="path",u.shapeArgs={d:v.symbols.arc(x[0],x[1],y-u.plotY,null,{start:t,end:t+u.pointWidth,innerR:y-ag(u.yBottom,y)})},this.toXY(u),u.tooltipPos=[u.plotX,u.plotY],u.ttBelow=u.plotY>x[1]
}}}),af(o,"alignDataLabel",function(s,r,w,v,u,t){if(this.chart.polar){s=r.rectPlotX/Math.PI*180;
if(v.align===null){v.align=s>20&&s<160?"left":s>200&&s<340?"right":"center"
}if(v.verticalAlign===null){v.verticalAlign=s<45||s>315?"bottom":s>135&&s<225?"top":"middle"
}q.alignDataLabel.call(this,r,w,v,u,t)
}else{s.call(this,r,w,v,u,t)
}})
}af(p,"getIndex",function(s,r){var v,u=this.chart,t;
u.polar?(t=u.xAxis[0].center,v=r.chartX-t[0]-u.plotLeft,u=r.chartY-t[1]-u.plotTop,v=180-Math.round(Math.atan2(v,u)/Math.PI*180)):v=s.call(this,r);
return v
});
af(p,"getCoordinates",function(s,r){var u=this.chart,t={xAxis:[],yAxis:[]};
u.polar?ad(u.axes,function(v){var y=v.isXAxis,x=v.center,w=r.chartX-x[0]-u.plotLeft,x=r.chartY-x[1]-u.plotTop;
t[y?"xAxis":"yAxis"].push({axis:v,value:v.translate(y?Math.PI-Math.atan2(w,x):Math.sqrt(Math.pow(w,2)+Math.pow(x,2)),!0)})
}):t=s.call(this,r);
return t
})
})()
})(Highcharts);