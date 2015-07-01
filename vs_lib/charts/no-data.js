(function(n){function k(){return !!this.points.length
}function j(){this.hasData()?this.hideNoData():this.showNoData()
}var m=n.seriesTypes,l=n.Chart.prototype,b=n.getOptions(),a=n.extend;
a(b.lang,{noData:"No data to display"});
b.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"},attr:{},style:{fontWeight:"bold",fontSize:"12px",color:"#60606a"}};
m.pie.prototype.hasData=k;
if(m.gauge){m.gauge.prototype.hasData=k
}if(m.waterfall){m.waterfall.prototype.hasData=k
}n.Series.prototype.hasData=function(){return this.dataMax!==void 0&&this.dataMin!==void 0
};
l.showNoData=function(d){var c=this.options,d=d||c.lang.noData,c=c.noData;
if(!this.noDataLabel){this.noDataLabel=this.renderer.label(d,0,0,null,null,null,null,null,"no-data").attr(c.attr).css(c.style).add(),this.noDataLabel.align(a(this.noDataLabel.getBBox(),c.position),!1,"plotBox")
}};
l.hideNoData=function(){if(this.noDataLabel){this.noDataLabel=this.noDataLabel.destroy()
}};
l.hasData=function(){for(var d=this.series,c=d.length;
c--;
){if(d[c].hasData()&&!d[c].options.isInternal){return !0
}}return !1
};
l.callbacks.push(function(c){n.addEvent(c,"load",j);
n.addEvent(c,"redraw",j)
})
})(Highcharts);