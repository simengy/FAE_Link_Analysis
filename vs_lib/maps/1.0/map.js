(function(Z){function l(r,q,o,p,n,m,k,j,i){r=r["stroke-width"]%2/2;
q-=r;
o-=r;
return["M",q+m,o,"L",q+p-k,o,"C",q+p-k/2,o,q+p,o+k/2,q+p,o+k,"L",q+p,o+n-j,"C",q+p,o+n-j/2,q+p-j/2,o+n,q+p-j,o+n,"L",q+i,o+n,"C",q+i/2,o+n,q,o+n-i/2,q,o+n-i,"L",q,o+m,"C",q,o+m/2,q+m/2,o,q+m,o,"Z"]
}var U=Z.Axis,a=Z.Chart,e=Z.Color,c=Z.Point,w=Z.Pointer,S=Z.Legend,P=Z.LegendSymbolMixin,b=Z.Renderer,h=Z.Series,N=Z.SVGRenderer,g=Z.VMLRenderer,f=Z.addEvent,Y=Z.each,T=Z.extend,L=Z.extendClass,V=Z.merge,W=Z.pick,d=Z.numberFormat,K=Z.getOptions(),X=Z.seriesTypes,R=K.plotOptions,O=Z.wrap,M=function(){};
O(U.prototype,"getSeriesExtremes",function(j){var i=this.isXAxis,n,o,m=[],k;
i&&Y(this.series,function(q,p){if(q.useMapGeometry){m[p]=q.xData,q.xData=[]
}});
j.call(this);
if(i&&(n=W(this.dataMin,Number.MAX_VALUE),o=W(this.dataMax,Number.MIN_VALUE),Y(this.series,function(q,p){if(q.useMapGeometry){n=Math.min(n,W(q.minX,n)),o=Math.max(o,W(q.maxX,n)),q.xData=m[p],k=!0
}}),k)){this.dataMin=n,this.dataMax=o
}});
O(U.prototype,"setAxisTranslation",function(j){var i=this.chart,k=i.plotWidth/i.plotHeight,m=i.xAxis[0];
j.call(this);
if(i.options.chart.preserveAspectRatio&&this.coll==="yAxis"&&m.transA!==void 0&&(this.transA=m.transA=Math.min(this.transA,m.transA),j=k/((m.max-m.min)/(this.max-this.min)),m=j<1?this:m,j=(m.max-m.min)*m.transA,m.pixelPadding=m.len-j,m.minPixelPadding=m.pixelPadding/2,j=m.fixTo)){j=j[1]-m.toValue(j[0],!0);
j*=m.transA;
if(Math.abs(j)>m.minPixelPadding||m.min===m.dataMin&&m.max===m.dataMax){j=0
}m.minPixelPadding-=j
}});
O(U.prototype,"render",function(i){i.call(this);
this.fixTo=null
});
var Q=Z.ColorAxis=function(){this.isColorAxis=!0;
this.init.apply(this,arguments)
};
T(Q.prototype,U.prototype);
T(Q.prototype,{defaultColorAxisOptions:{lineWidth:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},color:"gray",width:0.01},labels:{overflow:"justify"},minColor:"#EFEFFF",maxColor:"#003875"},init:function(j,i){var k=j.options.legend.layout!=="vertical",m;
m=V(this.defaultColorAxisOptions,{side:k?2:1,reversed:!k},i,{isX:k,opposite:!k,showEmpty:!1,title:null,isColor:!0});
U.prototype.init.call(this,j,m);
i.dataClasses&&this.initDataClasses(i);
this.isXAxis=!0;
this.horiz=k;
this.zoomEnabled=!1
},tweenColors:function(j,i,n){for(var o=4,m,k=[];
o--;
){m=i.rgba[o]+(j.rgba[o]-i.rgba[o])*(1-n),k[o]=o===3?m:Math.round(m)
}return"rgba("+k.join(",")+")"
},initDataClasses:function(j){var i=this,n=this.chart,o,m=0,k=this.options;
this.dataClasses=o=[];
Y(j.dataClasses,function(r,q){var p,r=V(r);
o.push(r);
if(!r.color){k.dataClassColor==="category"?(p=n.options.colors,r.color=p[m++],m===p.length&&(m=0)):r.color=i.tweenColors(e(k.minColor),e(k.maxColor),q/(j.dataClasses.length-1))
}})
},setOptions:function(i){U.prototype.setOptions.call(this,i);
this.options.crosshair=this.options.marker;
this.stops=i.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
Y(this.stops,function(j){j.color=e(j[1])
});
this.coll="colorAxis"
},setAxisSize:function(){var j=this.legendSymbol,i=this.chart;
if(j){this.left=j.x,this.top=j.y,this.width=j.width,this.height=j.height,this.right=i.chartWidth-this.left-this.width,this.bottom=i.chartHeight-this.top-this.height,this.len=this.horiz?this.width:this.height,this.pos=this.horiz?this.left:this.top
}},toColor:function(j,i){var p,q=this.stops,o,n=this.dataClasses,m,k;
if(n){for(k=n.length;
k--;
){if(m=n[k],o=m.from,q=m.to,(o===void 0||j>=o)&&(q===void 0||j<=q)){p=m.color;
if(i){i.dataClass=k
}break
}}}else{this.isLog&&(j=this.val2lin(j));
p=1-(this.max-j)/(this.max-this.min);
for(k=q.length;
k--;
){if(p>q[k][0]){break
}}o=q[k]||q[k+1];
q=q[k+1]||o;
p=1-(q[0]-p)/(q[0]-o[0]||1);
p=this.tweenColors(o.color,q.color,p)
}return p
},getOffset:function(){var i=this.legendGroup;
if(i&&(U.prototype.getOffset.call(this),!this.axisGroup.parentGroup)){this.axisGroup.add(i),this.gridGroup.add(i),this.labelGroup.add(i),this.added=!0
}},setLegendColor:function(){var j,i=this.options;
j=this.horiz?[0,0,1,0]:[0,0,0,1];
this.legendColor={linearGradient:{x1:j[0],y1:j[1],x2:j[2],y2:j[3]},stops:i.stops||[[0,i.minColor],[1,i.maxColor]]}
},drawLegendSymbol:function(j,i){var o=j.padding,p=j.options,n=this.horiz,m=W(p.symbolWidth,n?200:12),k=W(p.symbolHeight,n?12:200),p=W(p.labelPadding,n?10:30);
this.setLegendColor();
i.legendSymbol=this.chart.renderer.rect(0,j.baseline-11,m,k).attr({zIndex:1}).add(i.legendGroup);
i.legendSymbol.getBBox();
this.legendItemWidth=m+o+(n?0:p);
this.legendItemHeight=k+o+(n?p:0)
},setState:M,visible:!0,setVisible:M,getSeriesExtremes:function(){var i;
if(this.series.length){i=this.series[0],this.dataMin=i.valueMin,this.dataMax=i.valueMax
}},drawCrosshair:function(j,i){var p=!this.cross,q=i&&i.plotX,o=i&&i.plotY,n,m=this.pos,k=this.len;
if(i){n=this.toPixels(i.value),n<m?n=m-2:n>m+k&&(n=m+k+2),i.plotX=n,i.plotY=this.len-n,U.prototype.drawCrosshair.call(this,j,i),i.plotX=q,i.plotY=o,!p&&this.cross&&this.cross.attr({fill:this.crosshair.color}).add(this.labelGroup)
}},getPlotLinePath:function(j,i,m,n,k){return k?this.horiz?["M",k-4,this.top-6,"L",k+4,this.top-6,k,this.top,"Z"]:["M",this.left,k,"L",this.left-6,k+6,this.left-6,k-6,"Z"]:U.prototype.getPlotLinePath.call(this,j,i,m,n)
},update:function(j,i){Y(this.series,function(k){k.isDirtyData=!0
});
U.prototype.update.call(this,j,i);
this.legendItem&&(this.setLegendColor(),this.chart.legend.colorizeItem(this,!0))
},getDataClassLegendSymbols:function(){var j=this,i=this.chart,o=[],p=i.options.legend,n=p.valueDecimals,m=p.valueSuffix||"",k;
Y(this.dataClasses,function(u,r){var t=!0,q=u.from,s=u.to;
k="";
q===void 0?k="< ":s===void 0&&(k="> ");
q!==void 0&&(k+=d(q,n)+m);
q!==void 0&&s!==void 0&&(k+=" - ");
s!==void 0&&(k+=d(s,n)+m);
o.push(T({chart:i,name:k,options:{},drawLegendSymbol:P.drawRectangle,visible:!0,setState:M,setVisible:function(){t=this.visible=!t;
Y(j.series,function(v){Y(v.points,function(x){x.dataClass===r&&x.setVisible(t)
})
});
i.legend.colorizeItem(this,t)
}},u))
});
return o
},name:""});
O(a.prototype,"getAxes",function(j){var i=this.options.colorAxis;
j.call(this);
this.colorAxis=[];
i&&new Q(this,i)
});
O(S.prototype,"getAllItems",function(j){var i=[],k=this.chart.colorAxis[0];
k&&(k.options.dataClasses?i=i.concat(k.getDataClassLegendSymbols()):i.push(k),Y(k.series,function(m){m.options.showInLegend=!1
}));
return i.concat(j.call(this))
});
S={pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",dashstyle:"dashStyle"},pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:M,parallelArrays:["x","y","value"],translateColors:function(){var j=this,i=this.options.nullColor,k=this.colorAxis;
Y(this.data,function(n){var m=n.value;
if(m=m===null?i:k?k.toColor(m,n):n.color||j.color){n.color=m
}})
}};
T(a.prototype,{renderMapNavigation:function(){var j=this,i=this.options.mapNavigation,p=i.buttons,q,o,n,m,k=function(){this.handler.call(j)
};
if(W(i.enableButtons,i.enabled)&&!j.renderer.forExport){for(q in p){if(p.hasOwnProperty(q)){n=V(i.buttonOptions,p[q]),o=n.theme,m=o.states,o=j.renderer.button(n.text,0,0,k,o,m&&m.hover,m&&m.select,0,q==="zoomIn"?"topbutton":"bottombutton").attr({width:n.width,height:n.height,title:j.options.lang[q],zIndex:5}).css(n.style).add(),o.handler=n.onclick,o.align(T(n,{width:o.width,height:2*o.height}),null,n.alignTo)
}}}},fitToBox:function(j,i){Y([["x","width"],["y","height"]],function(k){var m=k[0],k=k[1];
j[m]+j[k]>i[m]+i[k]&&(j[k]>i[k]?(j[k]=i[k],j[m]=i[m]):j[m]=i[m]+i[k]-j[k]);
j[k]>i[k]&&(j[k]=i[k]);
j[m]<i[m]&&(j[m]=i[m])
});
return j
},mapZoom:function(t,s,q,r,p){var o=this.xAxis[0],n=o.max-o.min,m=W(s,o.min+n/2),j=n*t,n=this.yAxis[0],k=n.max-n.min,u=W(q,n.min+k/2);
k*=t;
m=this.fitToBox({x:m-j*(r?(r-o.pos)/o.len:0.5),y:u-k*(p?(p-n.pos)/n.len:0.5),width:j,height:k},{x:o.dataMin,y:n.dataMin,width:o.dataMax-o.dataMin,height:n.dataMax-n.dataMin});
if(r){o.fixTo=[r-o.pos,s]
}if(p){n.fixTo=[p-n.pos,q]
}t!==void 0?(o.setExtremes(m.x,m.x+m.width,!1),n.setExtremes(m.y,m.y+m.height,!1)):(o.setExtremes(void 0,void 0,!1),n.setExtremes(void 0,void 0,!1));
this.redraw()
}});
O(a.prototype,"render",function(j){var i=this,k=i.options.mapNavigation;
i.renderMapNavigation();
j.call(i);
(W(k.enableDoubleClickZoom,k.enabled)||k.enableDoubleClickZoomTo)&&f(i.container,"dblclick",function(m){i.pointer.onContainerDblClick(m)
});
W(k.enableMouseWheelZoom,k.enabled)&&f(i.container,document.onmousewheel===void 0?"DOMMouseScroll":"mousewheel",function(m){i.pointer.onContainerMouseWheel(m);
return !1
})
});
T(w.prototype,{onContainerDblClick:function(j){var i=this.chart,j=this.normalize(j);
i.options.mapNavigation.enableDoubleClickZoomTo?i.pointer.inClass(j.target,"highcharts-tracker")&&i.hoverPoint.zoomTo():i.isInsidePlot(j.chartX-i.plotLeft,j.chartY-i.plotTop)&&i.mapZoom(0.5,i.xAxis[0].toValue(j.chartX),i.yAxis[0].toValue(j.chartY),j.chartX,j.chartY)
},onContainerMouseWheel:function(j){var i=this.chart,k,j=this.normalize(j);
k=j.detail||-(j.wheelDelta/120);
i.isInsidePlot(j.chartX-i.plotLeft,j.chartY-i.plotTop)&&i.mapZoom(Math.pow(2,k),i.xAxis[0].toValue(j.chartX),i.yAxis[0].toValue(j.chartY),j.chartX,j.chartY)
}});
O(w.prototype,"init",function(j,i,k){j.call(this,i,k);
if(W(k.mapNavigation.enableTouchZoom,k.mapNavigation.enabled)){this.pinchX=this.pinchHor=this.pinchY=this.pinchVert=!0
}});
O(w.prototype,"pinchTranslate",function(s,r,p,q,o,n,m,k,j){s.call(this,r,p,q,o,n,m,k,j);
this.chart.options.chart.type==="map"&&(s=n.scaleX>n.scaleY,this.pinchTranslateDirection(!s,q,o,n,m,k,j,s?n.scaleX:n.scaleY))
});
R.map=V(R.scatter,{allAreas:!0,animation:!1,nullColor:"#F8F8F8",borderColor:"silver",borderWidth:1,marker:null,stickyTracking:!1,dataLabels:{format:"{point.value}",verticalAlign:"middle",crop:!1,overflow:!1,style:{color:"white",fontWeight:"bold",textShadow:"0 0 5px black"}},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}<br/>"},states:{normal:{animation:!0},hover:{brightness:0.2}}});
w=L(c,{applyOptions:function(j,i){var n=c.prototype.applyOptions.call(this,j,i),o=this.series,m=o.options,k=o.joinBy;
if(m.mapData){if(m=k[0]?o.getMapData(k[0],n[k[1]]):m.mapData[n.x]){if(o.xyFromShape){n.x=m._midX,n.y=m._midY
}T(n,m)
}else{n.value=n.value||null
}}return n
},setVisible:function(j){var i=this,k=j?"show":"hide";
Y(["graphic","dataLabel"],function(m){if(i[m]){i[m][k]()
}})
},onMouseOver:function(i){clearTimeout(this.colorInterval);
c.prototype.onMouseOver.call(this,i)
},onMouseOut:function(){var j=this,i=+new Date,o=e(j.color),p=e(j.pointAttr.hover.fill),n=j.series.options.states.normal.animation,m=n&&(n.duration||500),k;
if(m&&o.rgba.length===4&&p.rgba.length===4&&j.state!=="select"){k=j.pointAttr[""].fill,delete j.pointAttr[""].fill,clearTimeout(j.colorInterval),j.colorInterval=setInterval(function(){var r=(new Date-i)/m,q=j.graphic;
r>1&&(r=1);
q&&q.attr("fill",Q.prototype.tweenColors.call(0,p,o,r));
r>=1&&clearTimeout(j.colorInterval)
},13)
}c.prototype.onMouseOut.call(j);
if(k){j.pointAttr[""].fill=k
}},zoomTo:function(){var i=this.series;
i.xAxis.setExtremes(this._minX,this._maxX,!1);
i.yAxis.setExtremes(this._minY,this._maxY,!1);
i.chart.redraw()
}});
X.map=L(X.scatter,V(S,{type:"map",pointClass:w,supportsDrilldown:!0,getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,getBox:function(t){var s=Number.MAX_VALUE,q=-s,r=s,p=-s,o=s,n=s,m=this.xAxis,i=this.yAxis,j;
Y(t||[],function(v){if(v.path){if(typeof v.path==="string"){v.path=Z.splitPath(v.path)
}var y=v.path||[],u=y.length,x=!1,k=-s,B=s,A=-s,z=s;
if(!v._foundBox){for(;
u--;
){typeof y[u]==="number"&&!isNaN(y[u])&&(x?(k=Math.max(k,y[u]),B=Math.min(B,y[u])):(A=Math.max(A,y[u]),z=Math.min(z,y[u])),x=!x)
}v._midX=B+(k-B)*(v.middleX||0.5);
v._midY=z+(A-z)*(v.middleY||0.5);
v._maxX=k;
v._minX=B;
v._maxY=A;
v._minY=z;
v._foundBox=!0
}q=Math.max(q,v._maxX);
r=Math.min(r,v._minX);
p=Math.max(p,v._maxY);
o=Math.min(o,v._minY);
n=Math.min(v._maxX-v._minX,v._maxY-v._minY,n);
j=!0
}});
if(j){this.minY=Math.min(o,W(this.minY,s));
this.maxY=Math.max(p,W(this.maxY,-s));
this.minX=Math.min(r,W(this.minX,s));
this.maxX=Math.max(q,W(this.maxX,-s));
if(m.options.minRange===void 0){m.minRange=Math.min(5*n,m.minRange||s)
}if(i.options.minRange===void 0){i.minRange=Math.min(5*n,i.minRange||s)
}}},getExtremes:function(){h.prototype.getExtremes.call(this,this.valueData);
this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);
this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
this.dataMin=this.minY;
this.dataMax=this.maxY
},translatePath:function(u){var t=!1,r=this.xAxis,s=this.yAxis,q=r.min,p=r.transA,r=r.minPixelPadding,o=s.min,n=s.transA,s=s.minPixelPadding,m,k=[];
if(u){for(m=u.length;
m--;
){typeof u[m]==="number"?(k[m]=t?(u[m]-q)*p+r:(u[m]-o)*n+s,t=!t):k[m]=u[m]
}}return k
},setData:function(j,i){var n=this.options,o=n.mapData,m,k=[];
m=this.joinBy=Z.splat(n.joinBy);
m[1]||(m[1]=m[0]);
this.getBox(j);
this.getBox(o);
n.allAreas&&o&&(j=j||[],m[1]&&Y(j,function(p){k.push(p[m[1]])
}),k="|"+k.join("|")+"|",Y(o,function(p){(!m[0]||k.indexOf("|"+(p[m[0]]||p.properties&&p.properties[m[0]])+"|")===-1)&&j.push(V(p,{value:null}))
}));
h.prototype.setData.call(this,j,i)
},getMapData:function(j,i){var n=this.options.mapData,o=this.mapMap,m,k=n.length;
if(!o){o=this.mapMap={}
}if(o[i]!==void 0){return n[o[i]]
}else{if(i!==void 0){for(;
k--;
){if(m=n[k],m[j]===i||m.properties&&m.properties[j]===i){return o[i]=k,m
}}}}},drawGraph:M,drawDataLabels:M,translate:function(){var j=this,i=j.xAxis,k=j.yAxis;
j.generatePoints();
Y(j.data,function(m){m.plotX=i.toPixels(m._midX,!0);
m.plotY=k.toPixels(m._midY,!0);
if(j.isDirtyData||j.chart.renderer.isVML){m.shapeType="path",m.shapeArgs={d:j.translatePath(m.path),"vector-effect":"non-scaling-stroke"}
}});
j.translateColors()
},drawPoints:function(){var j=this.xAxis,i=this.yAxis,n=this.group,o=this.chart,m=o.renderer,k=this.baseTrans;
if(!this.transformGroup){this.transformGroup=m.g().attr({scaleX:1,scaleY:1}).add(n)
}this.isDirtyData||m.isVML||!k?(Y(this.points,function(p){o.hasRendered&&p.graphic&&p.graphic.attr("fill",p.color)
}),this.group=this.transformGroup,X.column.prototype.drawPoints.apply(this),this.group=n,this.baseTrans={originX:j.min-j.minPixelPadding/j.transA,originY:i.min-i.minPixelPadding/i.transA+(i.reversed?0:i.len/i.transA),transAX:j.transA,transAY:i.transA}):(n=j.transA/k.transAX,m=i.transA/k.transAY,n>0.99&&n<1.01&&m>0.99&&m<1.01?(i=j=0,m=n=1):(j=j.toPixels(k.originX,!0),i=i.toPixels(k.originY,!0)),this.transformGroup.animate({translateX:j,translateY:i,scaleX:n,scaleY:m}));
h.prototype.drawDataLabels.call(this);
this.dataLabelsGroup&&this.dataLabelsGroup.clip(o.clipRect)
},render:function(){var j=this,i=h.prototype.render;
j.chart.renderer.isVML&&j.data.length>3000?setTimeout(function(){i.call(j)
}):i.call(j)
},animate:function(j){var i=this.options.animation,o=this.group,p=this.xAxis,n=this.yAxis,m=p.pos,k=n.pos;
if(this.chart.renderer.isSVG){i===!0&&(i={duration:1000}),j?o.attr({translateX:m+p.len/2,translateY:k+n.len/2,scaleX:0.001,scaleY:0.001}):(o.animate({translateX:m,translateY:k,scaleX:1,scaleY:1},i),this.animate=null)
}},animateDrilldown:function(j){var i=this.chart.plotBox,m=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],n=m.bBox,k=this.chart.options.drilldown.animation;
if(!j){j=Math.min(n.width/i.width,n.height/i.height),m.shapeArgs={scaleX:j,scaleY:j,translateX:n.x,translateY:n.y},Y(this.points,function(o){o.graphic.attr(m.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},k)
}),this.animate=null
}},drawLegendSymbol:P.drawRectangle,animateDrillupFrom:function(i){X.column.prototype.animateDrillupFrom.call(this,i)
},animateDrillupTo:function(i){X.column.prototype.animateDrillupTo.call(this,i)
}}));
R.mapline=V(R.map,{lineWidth:1,fillColor:"none"});
X.mapline=L(X.map,{type:"mapline",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth",fill:"fillColor"},drawLegendSymbol:X.line.prototype.drawLegendSymbol});
R.mappoint=V(R.scatter,{dataLabels:{enabled:!0,format:"{point.name}",color:"black",crop:!1,overflow:!1,style:{textShadow:"0 0 5px white"}}});
X.mappoint=L(X.scatter,{type:"mappoint",forceDL:!0});
if(X.bubble){R.mapbubble=V(R.bubble,{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}}),X.mapbubble=L(X.bubble,{pointClass:L(c,{applyOptions:w.prototype.applyOptions}),xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:X.map.prototype.getMapData,getBox:X.map.prototype.getBox,setData:X.map.prototype.setData})
}X.heatmap=L(X.scatter,V(S,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,supportsDrilldown:!0,getExtremesFromAll:!0,init:function(){X.scatter.prototype.init.apply(this,arguments);
this.pointRange=this.options.colsize||1
},translate:function(){var j=this.options,i=this.xAxis,k=this.yAxis;
this.generatePoints();
Y(this.points,function(q){var p=(j.colsize||1)/2,o=(j.rowsize||1)/2,n=Math.round(i.len-i.translate(q.x-p,0,1,0,1)),p=Math.round(i.len-i.translate(q.x+p,0,1,0,1)),m=Math.round(k.translate(q.y-o,0,1,0,1)),o=Math.round(k.translate(q.y+o,0,1,0,1));
q.plotY=1;
q.shapeType="rect";
q.shapeArgs={x:Math.min(n,p),y:Math.min(m,o),width:Math.abs(p-n),height:Math.abs(o-m)}
});
this.pointRange=j.colsize||1;
this.translateColors()
},drawPoints:X.column.prototype.drawPoints,animate:M,getBox:M,drawLegendSymbol:P.drawRectangle,getExtremes:function(){h.prototype.getExtremes.call(this,this.valueData);
this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
h.prototype.getExtremes.call(this)
}}));
Z.geojson=function(j,i){var m=[],n=[],k=function(p){var o=0,q=p.length;
for(n.push("M");
o<q;
o++){o===1&&n.push("L"),n.push(p[o][0],-p[o][1])
}};
Y(j.features,function(o){var r=o.geometry,q=r.type,r=r.coordinates,o=o.properties,p;
n=[];
i==="map"?(q==="Polygon"?(Y(r,k),n.push("Z")):q==="MultiPolygon"&&(Y(r,function(s){Y(s,k)
}),n.push("Z")),n.length&&(p={path:n})):i==="mapline"?(q==="LineString"?k(r):q==="MultiLineString"&&Y(r,k),n.length&&(p={path:n})):i==="mappoint"&&q==="Point"&&(p={x:r[0],y:-r[1]});
p&&m.push(T(p,{name:o.name||o.NAME,properties:o}))
});
return m
};
T(K.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});
K.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,style:{fontSize:"15px",fontWeight:"bold",textAlign:"center"},theme:{"stroke-width":1}},buttons:{zoomIn:{onclick:function(){this.mapZoom(0.5)
},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)
},text:"-",y:28}}};
Z.splitPath=function(j){var i,j=j.replace(/([A-Za-z])/g," $1 "),j=j.replace(/^\s*/,"").replace(/\s*$/,""),j=j.split(/[ ,]+/);
for(i=0;
i<j.length;
i++){/[a-zA-Z]/.test(j[i])||(j[i]=parseFloat(j[i]))
}return j
};
Z.maps={};
N.prototype.symbols.topbutton=function(j,i,m,n,k){return l(k,j,i,m,n,k.r,k.r,0,0)
};
N.prototype.symbols.bottombutton=function(j,i,m,n,k){return l(k,j,i,m,n,0,0,k.r,k.r)
};
b===g&&Y(["topbutton","bottombutton"],function(i){g.prototype.symbols[i]=N.prototype.symbols[i]
});
Z.Map=function(j,i){var k={endOnTick:!1,gridLineWidth:0,lineWidth:0,minPadding:0,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]},m;
m=j.series;
j.series=null;
j=V({chart:{panning:"xy",type:"map"},xAxis:k,yAxis:V(k,{reversed:!0})},j,{chart:{inverted:!1,alignTicks:!1,preserveAspectRatio:!0}});
j.series=m;
return new a(j,i)
}
})(Highcharts);