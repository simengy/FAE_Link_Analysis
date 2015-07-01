var RequireService=getAngularService("RequireService");
function returnRow(b){var c=[];
for(var a=0;
a<b.length;
a++){if(c.indexOf(b[a]["row"])===-1){c.push(b[a]["row"])
}}return c
}function returnCol(c){var a=[];
for(var b=0;
b<c.length;
b++){if(a.indexOf(c[b]["column"])===-1){a.push(c[b]["column"])
}}return a
}vs.ext.chart.addSeriesType("heatmap",function(c,b,a){RequireService.loadScript(["d3","vs_lib/d3/d3.layout.cloud.js"]).then(function(){var l={top:50,right:0,bottom:100,left:150},h=b.width()<1000?b.width():1000,q=400,j=Math.floor(h/25),k=j*2,i=2,f=["#fff","#46C96F"],r=returnRow(c.series[0].data),o=returnCol(c.series[0].data);
var e=c.series[0].data;
var n=d3.scale.quantile().domain([0,i-1,d3.max(e,function(s){return s.count
})]).range(f);
var m=d3.select(b[0]).append("svg").attr("width",h+l.left+l.right).attr("height",q+l.top+l.bottom).append("g").attr("transform","translate("+l.left+","+l.top+")");
var g=m.selectAll(".dayLabel").data(r).enter().append("text").text(function(s){return s
}).attr("x",0).attr("y",function(t,s){return s*j
}).style("text-anchor","end").attr("transform","translate(-6,"+j/1.5+")").attr("class",function(t,s){return("dayLabel mono axis")
});
var d=m.selectAll(".timeLabel").data(o).enter().append("text").text(function(s){return s
}).attr("x",function(t,s){return s*j
}).attr("y",0).style("text-anchor","middle").attr("transform","translate("+j/2+", -6)").attr("class",function(t,s){return("timeLabel mono axis")
});
var p=m.selectAll(".column").data(e).enter().append("rect").attr("x",function(s){return(o.indexOf(s.column))*j
}).attr("y",function(s){return(r.indexOf(s.row))*j
}).attr("rx",4).attr("ry",4).attr("class","hour bordered").attr("width",j).attr("height",j).style("fill",f[0]);
p.transition().duration(1000).style("fill",function(s){return n(s.count)
});
p.append("title").text(function(s){return s.count
})
})
});