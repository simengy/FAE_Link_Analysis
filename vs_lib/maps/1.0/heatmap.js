(function(n){var i=n.Axis,C=n.Chart,d=n.Color,B=n.Legend,G=n.LegendSymbolMixin,F=n.Series,g=n.each,c=n.extend,A=n.extendClass,b=n.merge,a=n.pick,E=n.numberFormat,f=n.seriesTypes,D=n.wrap,e=function(){},H=n.ColorAxis=function(){this.isColorAxis=!0;
this.init.apply(this,arguments)
};
c(H.prototype,i.prototype);
c(H.prototype,{defaultColorAxisOptions:{lineWidth:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},color:"gray",width:0.01},labels:{overflow:"justify"},minColor:"#EFEFFF",maxColor:"#003875"},init:function(h,j){var k=h.options.legend.layout!=="vertical",l;
l=b(this.defaultColorAxisOptions,{side:k?2:1,reversed:!k},j,{isX:k,opposite:!k,showEmpty:!1,title:null,isColor:!0});
i.prototype.init.call(this,h,l);
j.dataClasses&&this.initDataClasses(j);
this.isXAxis=!0;
this.horiz=k;
this.zoomEnabled=!1
},tweenColors:function(h,j,l){for(var o=4,m,k=[];
o--;
){m=j.rgba[o]+(h.rgba[o]-j.rgba[o])*(1-l),k[o]=o===3?m:Math.round(m)
}return"rgba("+k.join(",")+")"
},initDataClasses:function(h){var j=this,l=this.chart,o,m=0,k=this.options;
this.dataClasses=o=[];
g(h.dataClasses,function(r,p){var q,r=b(r);
o.push(r);
if(!r.color){k.dataClassColor==="category"?(q=l.options.colors,r.color=q[m++],m===q.length&&(m=0)):r.color=j.tweenColors(d(k.minColor),d(k.maxColor),p/(h.dataClasses.length-1))
}})
},setOptions:function(h){i.prototype.setOptions.call(this,h);
this.options.crosshair=this.options.marker;
this.stops=h.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
g(this.stops,function(j){j.color=d(j[1])
});
this.coll="colorAxis"
},setAxisSize:function(){var h=this.legendSymbol,j=this.chart;
if(h){this.left=h.x,this.top=h.y,this.width=h.width,this.height=h.height,this.right=j.chartWidth-this.left-this.width,this.bottom=j.chartHeight-this.top-this.height,this.len=this.horiz?this.width:this.height,this.pos=this.horiz?this.left:this.top
}},toColor:function(h,j){var o,q=this.stops,p,m=this.dataClasses,l,k;
if(m){for(k=m.length;
k--;
){if(l=m[k],p=l.from,q=l.to,(p===void 0||h>=p)&&(q===void 0||h<=q)){o=l.color;
if(j){j.dataClass=k
}break
}}}else{this.isLog&&(h=this.val2lin(h));
o=1-(this.max-h)/(this.max-this.min);
for(k=q.length;
k--;
){if(o>q[k][0]){break
}}p=q[k]||q[k+1];
q=q[k+1]||p;
o=1-(q[0]-o)/(q[0]-p[0]||1);
o=this.tweenColors(p.color,q.color,o)
}return o
},getOffset:function(){var h=this.legendGroup;
if(h&&(i.prototype.getOffset.call(this),!this.axisGroup.parentGroup)){this.axisGroup.add(h),this.gridGroup.add(h),this.labelGroup.add(h),this.added=!0
}},setLegendColor:function(){var h,j=this.options;
h=this.horiz?[0,0,1,0]:[0,0,0,1];
this.legendColor={linearGradient:{x1:h[0],y1:h[1],x2:h[2],y2:h[3]},stops:j.stops||[[0,j.minColor],[1,j.maxColor]]}
},drawLegendSymbol:function(h,j){var m=h.padding,p=h.options,o=this.horiz,l=a(p.symbolWidth,o?200:12),k=a(p.symbolHeight,o?12:200),p=a(p.labelPadding,o?10:30);
this.setLegendColor();
j.legendSymbol=this.chart.renderer.rect(0,h.baseline-11,l,k).attr({zIndex:1}).add(j.legendGroup);
j.legendSymbol.getBBox();
this.legendItemWidth=l+m+(o?0:p);
this.legendItemHeight=k+m+(o?p:0)
},setState:e,visible:!0,setVisible:e,getSeriesExtremes:function(){var h;
if(this.series.length){h=this.series[0],this.dataMin=h.valueMin,this.dataMax=h.valueMax
}},drawCrosshair:function(h,j){var o=!this.cross,q=j&&j.plotX,p=j&&j.plotY,m,l=this.pos,k=this.len;
if(j){m=this.toPixels(j.value),m<l?m=l-2:m>l+k&&(m=l+k+2),j.plotX=m,j.plotY=this.len-m,i.prototype.drawCrosshair.call(this,h,j),j.plotX=q,j.plotY=p,!o&&this.cross&&this.cross.attr({fill:this.crosshair.color}).add(this.labelGroup)
}},getPlotLinePath:function(h,j,k,m,l){return l?this.horiz?["M",l-4,this.top-6,"L",l+4,this.top-6,l,this.top,"Z"]:["M",this.left,l,"L",this.left-6,l+6,this.left-6,l-6,"Z"]:i.prototype.getPlotLinePath.call(this,h,j,k,m)
},update:function(h,j){g(this.series,function(k){k.isDirtyData=!0
});
i.prototype.update.call(this,h,j);
this.legendItem&&(this.setLegendColor(),this.chart.legend.colorizeItem(this,!0))
},getDataClassLegendSymbols:function(){var h=this,j=this.chart,m=[],p=j.options.legend,o=p.valueDecimals,l=p.valueSuffix||"",k;
g(this.dataClasses,function(u,s){var r=!0,q=u.from,t=u.to;
k="";
q===void 0?k="< ":t===void 0&&(k="> ");
q!==void 0&&(k+=E(q,o)+l);
q!==void 0&&t!==void 0&&(k+=" - ");
t!==void 0&&(k+=E(t,o)+l);
m.push(c({chart:j,name:k,options:{},drawLegendSymbol:G.drawRectangle,visible:!0,setState:e,setVisible:function(){r=this.visible=!r;
g(h.series,function(v){g(v.points,function(w){w.dataClass===s&&w.setVisible(r)
})
});
j.legend.colorizeItem(this,r)
}},u))
});
return m
},name:""});
D(C.prototype,"getAxes",function(h){var j=this.options.colorAxis;
h.call(this);
this.colorAxis=[];
j&&new H(this,j)
});
D(B.prototype,"getAllItems",function(h){var j=[],k=this.chart.colorAxis[0];
k&&(k.options.dataClasses?j=j.concat(k.getDataClassLegendSymbols()):j.push(k),g(k.series,function(l){l.options.showInLegend=!1
}));
return j.concat(h.call(this))
});
f.heatmap=A(f.scatter,b({pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",dashstyle:"dashStyle"},pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:e,parallelArrays:["x","y","value"],translateColors:function(){var h=this,j=this.options.nullColor,k=this.colorAxis;
g(this.data,function(m){var l=m.value;
if(l=l===null?j:k?k.toColor(l,m):m.color||h.color){m.color=l
}})
}},{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,supportsDrilldown:!0,getExtremesFromAll:!0,init:function(){f.scatter.prototype.init.apply(this,arguments);
this.pointRange=this.options.colsize||1
},translate:function(){var h=this.options,j=this.xAxis,k=this.yAxis;
this.generatePoints();
g(this.points,function(q){var p=(h.colsize||1)/2,o=(h.rowsize||1)/2,m=Math.round(j.len-j.translate(q.x-p,0,1,0,1)),p=Math.round(j.len-j.translate(q.x+p,0,1,0,1)),l=Math.round(k.translate(q.y-o,0,1,0,1)),o=Math.round(k.translate(q.y+o,0,1,0,1));
q.plotY=1;
q.shapeType="rect";
q.shapeArgs={x:Math.min(m,p),y:Math.min(l,o),width:Math.abs(p-m),height:Math.abs(o-l)}
});
this.pointRange=h.colsize||1;
this.translateColors()
},drawPoints:f.column.prototype.drawPoints,animate:e,getBox:e,drawLegendSymbol:G.drawRectangle,getExtremes:function(){F.prototype.getExtremes.call(this,this.valueData);
this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
F.prototype.getExtremes.call(this)
}}))
})(Highcharts);