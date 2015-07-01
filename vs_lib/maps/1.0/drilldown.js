(function(q){function D(i,h,j){return"rgba("+[Math.round(i[0]+(h[0]-i[0])*j),Math.round(i[1]+(h[1]-i[1])*j),Math.round(i[2]+(h[2]-i[2])*j),i[3]+(h[3]-i[3])*j].join(",")+")"
}var C=function(){},d=q.getOptions(),n=q.each,c=q.extend,z=q.format,b=q.wrap,g=q.Chart,e=q.seriesTypes,B=e.pie,f=e.column,A=HighchartsAdapter.fireEvent,y=HighchartsAdapter.inArray;
c(d.lang,{drillUpText:"â—? Back to {series.name}"});
d.drilldown={activeAxisLabelStyle:{cursor:"pointer",color:"#0d233a",fontWeight:"bold",textDecoration:"underline"},activeDataLabelStyle:{cursor:"pointer",color:"#0d233a",fontWeight:"bold",textDecoration:"underline"},animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};
q.SVGRenderer.prototype.Element.prototype.fadeIn=function(h){this.attr({opacity:0.1,visibility:"inherit"}).animate({opacity:1},h||{duration:250})
};
g.prototype.addSeriesAsDrilldown=function(i,h){this.addSingleSeriesAsDrilldown(i,h);
this.applyDrilldown()
};
g.prototype.addSingleSeriesAsDrilldown=function(t,s){var o=t.series,p=o.xAxis,r=o.yAxis,m;
m=t.color||o.color;
var l,k=[],j=[],i;
i=o.levelNumber||0;
s=c({color:m},s);
l=y(t,o.points);
n(o.chart.series,function(h){if(h.xAxis===p&&h.yAxis===r){k.push(h),j.push(h.userOptions),h.levelNumber=h.levelNumber||0
}});
m={levelNumber:i,seriesOptions:o.userOptions,levelSeriesOptions:j,levelSeries:k,shapeArgs:t.shapeArgs,bBox:t.graphic.getBBox(),color:m,lowerSeriesOptions:s,pointOptions:o.options.data[l],pointIndex:l,oldExtremes:{xMin:p&&p.userMin,xMax:p&&p.userMax,yMin:r&&r.userMin,yMax:r&&r.userMax}};
if(!this.drilldownLevels){this.drilldownLevels=[]
}this.drilldownLevels.push(m);
m=m.lowerSeries=this.addSeries(s,!1);
m.levelNumber=i+1;
if(p){p.oldPos=p.pos,p.userMin=p.userMax=null,r.userMin=r.userMax=null
}if(o.type===m.type){m.animate=m.animateDrilldown||C,m.options.animation=!0
}};
g.prototype.applyDrilldown=function(){var i=this.drilldownLevels,h=i[i.length-1].levelNumber;
n(this.drilldownLevels,function(j){j.levelNumber===h&&n(j.levelSeries,function(k){k.levelNumber===h&&k.remove(!1)
})
});
this.redraw();
this.showDrillUpButton()
};
g.prototype.getDrilldownBackText=function(){var h=this.drilldownLevels[this.drilldownLevels.length-1];
h.series=h.seriesOptions;
return z(this.options.lang.drillUpText,h)
};
g.prototype.showDrillUpButton=function(){var i=this,h=this.getDrilldownBackText(),j=i.options.drilldown.drillUpButton,k,l;
this.drillUpButton?this.drillUpButton.attr({text:h}).align():(l=(k=j.theme)&&k.states,this.drillUpButton=this.renderer.button(h,null,null,function(){i.drillUp()
},k,l&&l.hover,l&&l.select).attr({align:j.position.align,zIndex:9}).add().align(j.position,!1,j.relativeTo||"plotBox"))
};
g.prototype.drillUp=function(){for(var s=this,r=s.drilldownLevels,m=r[r.length-1].levelNumber,o=r.length,p,l,k,j,i=function(h){var t;
n(s.series,function(u){u.userOptions===h&&(t=u)
});
t=t||s.addSeries(h,!1);
if(t.type===l.type&&t.animateDrillupTo){t.animate=t.animateDrillupTo
}h===p.seriesOptions&&(k=t)
};
o--;
){if(p=r[o],p.levelNumber===m){r.pop();
l=p.lowerSeries;
n(p.levelSeriesOptions,i);
A(s,"drillup",{seriesOptions:p.seriesOptions});
if(k.type===l.type){k.drilldownLevel=p,k.options.animation=!0,l.animateDrillupFrom&&l.animateDrillupFrom(p)
}l.remove(!1);
if(k.xAxis){j=p.oldExtremes,k.xAxis.setExtremes(j.xMin,j.xMax,!1),k.yAxis.setExtremes(j.yMin,j.yMax,!1)
}}}this.redraw();
this.drilldownLevels.length===0?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align()
};
f.prototype.supportsDrilldown=!0;
f.prototype.animateDrillupTo=function(i){if(!i){var h=this,j=h.drilldownLevel;
n(this.points,function(k){k.graphic.hide();
k.dataLabel&&k.dataLabel.hide();
k.connector&&k.connector.hide()
});
setTimeout(function(){n(h.points,function(l,k){var o=k===(j&&j.pointIndex)?"show":"fadeIn",m=o==="show"?!0:void 0;
l.graphic[o](m);
if(l.dataLabel){l.dataLabel[o](m)
}if(l.connector){l.connector[o](m)
}})
},Math.max(this.chart.options.drilldown.animation.duration-50,0));
this.animate=C
}};
f.prototype.animateDrilldown=function(i){var h=this,j=this.chart.drilldownLevels,k=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1].shapeArgs,l=this.chart.options.drilldown.animation;
if(!i){n(j,function(m){if(h.userOptions===m.lowerSeriesOptions){k=m.shapeArgs
}}),k.x+=this.xAxis.oldPos-this.xAxis.pos,n(this.points,function(m){m.graphic.attr(k).animate(m.shapeArgs,l);
m.dataLabel&&m.dataLabel.fadeIn(l)
}),this.animate=null
}};
f.prototype.animateDrillupFrom=function(i){var h=this.chart.options.drilldown.animation,j=this.group;
delete this.group;
n(this.points,function(l){var m=l.graphic,k=q.Color(l.color).rgba;
delete l.graphic;
m.animate(i.shapeArgs,q.merge(h,{step:function(o,p){p.prop==="start"&&this.attr({fill:D(k,q.Color(i.color).rgba,p.pos)})
},complete:function(){m.destroy();
j&&(j=j.destroy())
}}))
})
};
B&&c(B.prototype,{supportsDrilldown:!0,animateDrillupTo:f.prototype.animateDrillupTo,animateDrillupFrom:f.prototype.animateDrillupFrom,animateDrilldown:function(i){var h=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],l=this.chart.options.drilldown.animation,m=h.shapeArgs,o=m.start,k=(m.end-o)/this.points.length,j=q.Color(h.color).rgba;
if(!i){n(this.points,function(r,p){var s=q.Color(r.color).rgba;
r.graphic.attr(q.merge(m,{start:o+p*k,end:o+(p+1)*k})).animate(r.shapeArgs,q.merge(l,{step:function(u,t){t.prop==="start"&&this.attr({fill:D(j,s,t.pos)})
}}))
}),this.animate=null
}}});
q.Point.prototype.doDrilldown=function(i){for(var h=this.series.chart,j=h.options.drilldown,k=(j.series||[]).length,l;
k--&&!l;
){j.series[k].id===this.drilldown&&(l=j.series[k])
}A(h,"drilldown",{point:this,seriesOptions:l});
l&&(i?h.addSingleSeriesAsDrilldown(this,l):h.addSeriesAsDrilldown(this,l))
};
b(q.Point.prototype,"init",function(i,h,l,m){var o=i.call(this,h,l,m),k=h.chart,j=(i=h.xAxis&&h.xAxis.ticks[m])&&i.label;
if(o.drilldown){if(q.addEvent(o,"click",function(){o.doDrilldown()
}),j){if(!j._basicStyle){j._basicStyle=j.element.getAttribute("style")
}j.addClass("highcharts-drilldown-axis-label").css(k.options.drilldown.activeAxisLabelStyle).on("click",function(){n(j.ddPoints,function(p){p.doDrilldown&&p.doDrilldown(!0)
});
k.applyDrilldown()
});
if(!j.ddPoints){j.ddPoints=[]
}j.ddPoints.push(o)
}}else{j&&j._basicStyle&&j.element.setAttribute("style",j._basicStyle)
}return o
});
b(q.Series.prototype,"drawDataLabels",function(i){var h=this.chart.options.drilldown.activeDataLabelStyle;
i.call(this);
n(this.points,function(j){if(j.drilldown&&j.dataLabel){j.dataLabel.attr({"class":"highcharts-drilldown-data-label"}).css(h).on("click",function(){j.doDrilldown()
})
}})
});
var a,d=function(h){h.call(this);
n(this.points,function(i){i.drilldown&&i.graphic&&i.graphic.attr({"class":"highcharts-drilldown-point"}).css({cursor:"pointer"})
})
};
for(a in e){e[a].prototype.supportsDrilldown&&b(e[a].prototype,"drawTracker",d)
}})(Highcharts);