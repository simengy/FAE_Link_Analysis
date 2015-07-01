var RequireService=getAngularService("RequireService");
vs.ext.chart.addSeriesType("wordcloud",function(data,el,scope){RequireService.loadScript(["d3"]).then(function(){RequireService.loadScript(["vs_lib/d3/d3.layout.cloud.js"]).then(function(){var opts=data.plotOptions?data.plotOptions.wordcloud||{}:{};
var events=opts.point?opts.point.events:null;
if(data.series[0].point&&data.series[0].point.events){events=data.series[0].point.events
}var eventsFn=null;
if(events&&events.click){eventsFn=eval(events.click.toString())
}var h=opts.height||600,w=opts.width||el.width();
function draw(words){var d=d3.select(el[0]).append("svg").attr({width:"100%",height:"100%"}).attr("viewBox","0 0 "+w+" "+h).append("g").attr("transform","translate("+w/2+","+h/2+")").selectAll("text").data(words).enter().append("text").style("font-size",function(d){return d.size+"px"
}).style("fill",function(d,i){return fill(i)
}).attr("text-anchor","middle").attr("transform",function(d){return"translate("+[d.x,d.y]+")rotate("+d.rotate+")"
}).text(function(d){return d.word
}).on("click",function(d){if(eventsFn&&typeof eventsFn==="function"){eventsFn.call(d)
}});
if(opts.fontFamily){d=d.style("font-family",opts.fontFamily)
}}var fill=data.colors?d3.scale.ordinal().range(data.colors):data.series[0].color?d3.scale.ordinal().range([data.series[0].color]):d3.scale.category20(),angle=opts.rotateAngle||90,fontRatio=opts.fontSizeRatio||15,padding=opts.padding||5;
var l=d3.layout.cloud().size([w,h]).words(data.series[0].data.map(function(d){var o={};
if(Array.isArray(d)){o.word=d[0];
o.count=d[1]
}else{o=d
}o.size=o.count*fontRatio;
return o
})).padding(padding).rotate(function(){return ~~(Math.random()*2)*angle
}).fontSize(function(d){return d.size
}).on("end",draw);
if(opts.font){l=l.font(opts.font)
}l.start()
})
})
});