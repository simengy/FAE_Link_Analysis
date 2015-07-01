define(["app","charts","theme","chartMore","noData"],function(){vividSENSE.directive("chart",["CommonService","NotificationService","RequireService","AppService",function(d,c,a,e){function b(){this.chartDefaults={}
}b.prototype={chartDefaults:{chartLib:"chart",chart:{backgroundColor:"transparent"},title:{text:"",enabled:false,align:"left",y:5,floating:true},lang:{noData:"No Data To Display"},noData:{style:{fontWeight:"bold",fontSize:"22px",color:"#6B6B6B"}},plotOptions:{series:{states:{select:{color:"#ED4E42"}}}},scrollbar:{barBackgroundColor:"gray",barBorderRadius:7,barBorderWidth:0,buttonBackgroundColor:"gray",buttonBorderWidth:0,buttonBorderRadius:7,trackBackgroundColor:"none",trackBorderWidth:1,trackBorderRadius:8,trackBorderColor:"#CCC"}},baseSeries:{chart:{},stockChart:{},d3Chart:["wordCloud","bar","column"]},process:function(k,g,j){var f=angular.copy(this.chartDefaults);
f.chart={renderTo:g[0]};
d.deepExtend(f,k);
var i={};
try{i.type=f.chartLib.toLowerCase();
switch(i.type){case"chart":i.chart=new Highcharts.Chart(f);
break;
case"stockchart":i.chart=new Highcharts.StockChart(f);
break;
case"custom":g.empty();
var h=k.series.length>0?k.series[0].type:null;
a.loadScript(["d3",e.getProjectRoot()+"/scripts/ext/"+h+".js"]).then(function(){try{vs.ext.chart[h](k,g,j)
}catch(m){c.handelErrors(j.$parent.$parent.$parent.$parent,6001,"unable to create chart "+h)
}},function(m){console.log("unable to load scripts for "+h,m);
c.handelErrors(j.$parent.$parent.$parent.$parent,6002,"unable to load scripts for chart "+h)
});
break;
default:new Highcharts.Chart(f);
break
}}catch(l){c.handelErrors(j.$parent.$parent.$parent.$parent,"60"+l)
}return i
}};
vs.ext.chart={addSeriesType:function(f,g){vs.ext.chart[f]=g
}};
return{restrict:"E",template:"<div></div>",scope:{chartData:"=value",id:"=id",color:"=color"},transclude:true,replace:true,link:function(h,f){var g={};
h.$watch("chartData",function(j){if(!j||!j.series){return
}var i=angular.copy(j);
var k=(window.location.pathname.indexOf("index_pdf")>0)?true:false;
if(k){Highcharts.setOptions({plotOptions:{series:{enableMouseTracking:false,animation:false}}})
}g=b.prototype.process(i,f,h)
});
h.streamData=function(i){};
h.$on("streamdata",function(j,k){if(g.type==="stockchart"){if(k){var i=g.chart.series[0];
k.forEach(function(l){i.addPoint(l,false,false)
});
i.redraw()
}}else{if(g.type==="chart"){if(k){g.chart.series[0].setData(k,true);
g.chart.redraw()
}}else{h.streamData(k)
}}})
}}
}])
});