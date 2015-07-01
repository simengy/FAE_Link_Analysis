(function(b){var r,h=b.Axis,m=b.Chart,q=b.Color,s=b.Legend,o=b.LegendSymbolMixin,g=b.Series,d=b.each,n=b.extend,k=b.extendClass,f=b.merge,e=b.pick,l=b.numberFormat,p=b.seriesTypes,i=b.wrap,c=function(){};
var a=b.ColorAxis=function(){this.isColorAxis=true;
this.init.apply(this,arguments)
};
n(a.prototype,h.prototype);
n(a.prototype,{defaultColorAxisOptions:{lineWidth:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:true,endOnTick:true,offset:0,marker:{animation:{duration:50},color:"gray",width:0.01},labels:{overflow:"justify"},minColor:"#EFEFFF",maxColor:"#003875"},init:function(u,v){var w=u.options.legend.layout!=="vertical",t;
t=f(this.defaultColorAxisOptions,{side:w?2:1,reversed:!w},v,{isX:w,opposite:!w,showEmpty:false,title:null,isColor:true});
h.prototype.init.call(this,u,t);
if(v.dataClasses){this.initDataClasses(v)
}this.isXAxis=true;
this.horiz=w;
this.zoomEnabled=false
},tweenColors:function(y,x,w){var u=4,v,t=[];
while(u--){v=x.rgba[u]+(y.rgba[u]-x.rgba[u])*(1-w);
t[u]=u===3?v:Math.round(v)
}return"rgba("+t.join(",")+")"
},initDataClasses:function(y){var w=this,v=this.chart,t,x=0,u=this.options;
this.dataClasses=t=[];
d(y.dataClasses,function(B,A){var z;
B=f(B);
t.push(B);
if(!B.color){if(u.dataClassColor==="category"){z=v.options.colors;
B.color=z[x++];
if(x===z.length){x=0
}}else{B.color=w.tweenColors(q(u.minColor),q(u.maxColor),A/(y.dataClasses.length-1))
}}})
},setOptions:function(t){h.prototype.setOptions.call(this,t);
this.options.crosshair=this.options.marker;
this.stops=t.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
d(this.stops,function(u){u.color=q(u[1])
});
this.coll="colorAxis"
},setAxisSize:function(){var u=this.legendSymbol,t=this.chart;
if(u){this.left=u.x;
this.top=u.y;
this.width=u.width;
this.height=u.height;
this.right=t.chartWidth-this.left-this.width;
this.bottom=t.chartHeight-this.top-this.height;
this.len=this.horiz?this.width:this.height;
this.pos=this.horiz?this.left:this.top
}},toColor:function(A,B){var x,C=this.stops,y,z,u,t=this.dataClasses,w,v;
if(t){v=t.length;
while(v--){w=t[v];
y=w.from;
z=w.to;
if((y===r||A>=y)&&(z===r||A<=z)){u=w.color;
if(B){B.dataClass=v
}break
}}}else{if(this.isLog){A=this.val2lin(A)
}x=1-((this.max-A)/(this.max-this.min));
v=C.length;
while(v--){if(x>C[v][0]){break
}}y=C[v]||C[v+1];
z=C[v+1]||y;
x=1-(z[0]-x)/((z[0]-y[0])||1);
u=this.tweenColors(y.color,z.color,x)
}return u
},getOffset:function(){var t=this.legendGroup;
if(t){h.prototype.getOffset.call(this);
if(!this.axisGroup.parentGroup){this.axisGroup.add(t);
this.gridGroup.add(t);
this.labelGroup.add(t);
this.added=true
}}},setLegendColor:function(){var v,u=this.horiz,t=this.options;
v=u?[0,0,1,0]:[0,0,0,1];
this.legendColor={linearGradient:{x1:v[0],y1:v[1],x2:v[2],y2:v[3]},stops:t.stops||[[0,t.minColor],[1,t.maxColor]]}
},drawLegendSymbol:function(x,A){var w=x.padding,B=x.options,z=this.horiz,v,t=e(B.symbolWidth,z?200:12),y=e(B.symbolHeight,z?12:200),u=e(B.labelPadding,z?10:30);
this.setLegendColor();
A.legendSymbol=this.chart.renderer.rect(0,x.baseline-11,t,y).attr({zIndex:1}).add(A.legendGroup);
v=A.legendSymbol.getBBox();
this.legendItemWidth=t+w+(z?0:u);
this.legendItemHeight=y+w+(z?u:0)
},setState:c,visible:true,setVisible:c,getSeriesExtremes:function(){var t;
if(this.series.length){t=this.series[0];
this.dataMin=t.valueMin;
this.dataMax=t.valueMax
}},drawCrosshair:function(z,u){var t=!this.cross,w=u&&u.plotX,v=u&&u.plotY,A,x=this.pos,y=this.len;
if(u){A=this.toPixels(u.value);
if(A<x){A=x-2
}else{if(A>x+y){A=x+y+2
}}u.plotX=A;
u.plotY=this.len-A;
h.prototype.drawCrosshair.call(this,z,u);
u.plotX=w;
u.plotY=v;
if(!t&&this.cross){this.cross.attr({fill:this.crosshair.color}).add(this.labelGroup)
}}},getPlotLinePath:function(u,t,x,v,w){if(w){return this.horiz?["M",w-4,this.top-6,"L",w+4,this.top-6,w,this.top,"Z"]:["M",this.left,w,"L",this.left-6,w+6,this.left-6,w-6,"Z"]
}else{return h.prototype.getPlotLinePath.call(this,u,t,x,v)
}},update:function(t,u){d(this.series,function(v){v.isDirtyData=true
});
h.prototype.update.call(this,t,u);
if(this.legendItem){this.setLegendColor();
this.chart.legend.colorizeItem(this,true)
}},getDataClassLegendSymbols:function(){var x=this,w=this.chart,v=[],u=w.options.legend,y=u.valueDecimals,z=u.valueSuffix||"",t;
d(this.dataClasses,function(C,A){var B=true,E=C.from,D=C.to;
t="";
if(E===r){t="< "
}else{if(D===r){t="> "
}}if(E!==r){t+=l(E,y)+z
}if(E!==r&&D!==r){t+=" - "
}if(D!==r){t+=l(D,y)+z
}v.push(n({chart:w,name:t,options:{},drawLegendSymbol:o.drawRectangle,visible:true,setState:c,setVisible:function(){B=this.visible=!B;
d(x.series,function(F){d(F.points,function(G){if(G.dataClass===A){G.setVisible(B)
}})
});
w.legend.colorizeItem(this,B)
}},C))
});
return v
},name:""});
i(m.prototype,"getAxes",function(v){var t=this.options,u=t.colorAxis;
v.call(this);
this.colorAxis=[];
if(u){v=new a(this,u)
}});
i(s.prototype,"getAllItems",function(v){var u=[],t=this.chart.colorAxis[0];
if(t){if(t.options.dataClasses){u=u.concat(t.getDataClassLegendSymbols())
}else{u.push(t)
}d(t.series,function(w){w.options.showInLegend=false
})
}return u.concat(v.call(this))
});
var j={pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",dashstyle:"dashStyle"},pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:c,parallelArrays:["x","y","value"],translateColors:function(){var v=this,t=this.options.nullColor,u=this.colorAxis;
d(this.data,function(w){var y=w.value,x;
x=y===null?t:u?u.toColor(y,w):(w.color)||v.color;
if(x){w.color=x
}})
}};
p.heatmap=k(p.scatter,f(j,{pointArrayMap:["y","value"],hasPointSpecificOptions:true,supportsDrilldown:true,getExtremesFromAll:true,init:function(){p.scatter.prototype.init.apply(this,arguments);
this.pointRange=this.options.colsize||1
},translate:function(){var v=this,u=v.options,w=v.xAxis,t=v.yAxis;
v.generatePoints();
d(v.points,function(x){var D=(u.colsize||1)/2,B=(u.rowsize||1)/2,z=Math.round(w.len-w.translate(x.x-D,0,1,0,1)),y=Math.round(w.len-w.translate(x.x+D,0,1,0,1)),C=Math.round(t.translate(x.y-B,0,1,0,1)),A=Math.round(t.translate(x.y+B,0,1,0,1));
x.plotY=1;
x.shapeType="rect";
x.shapeArgs={x:Math.min(z,y),y:Math.min(C,A),width:Math.abs(y-z),height:Math.abs(A-C)}
});
v.pointRange=u.colsize||1;
v.translateColors()
},drawPoints:p.column.prototype.drawPoints,animate:c,getBox:c,drawLegendSymbol:o.drawRectangle,getExtremes:function(){g.prototype.getExtremes.call(this,this.valueData);
this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
g.prototype.getExtremes.call(this)
}}))
}(Highcharts));