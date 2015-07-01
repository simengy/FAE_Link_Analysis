var RequireService=getAngularService("RequireService");
vs.ext.chart.addSeriesType("flare",function(d,c,b){function a(f){var e={};
e.name="flare";
e.children=[];
f.forEach(function(j){var g=false;
for(var h=0;
h<e.children.length;
h++){if(e.children[h].name===j.parent){e.children[h].children.push({name:j.child,size:j.size});
g=true;
break
}}if(!g){e.children.push({name:j.parent,children:[{name:j.child,size:j.size}]})
}});
return e
}RequireService.loadScript(["d3"]).then(function(){var k=a(d.series[0].data);
var p=c.width(),j=800,e=p*2/3,o=d3.scale.linear().range([0,e]),l=d3.scale.linear().range([0,e]),i,m;
var n=d3.layout.pack().size([e,e]).value(function(h){return h.size
});
var g=d3.select(c[0]).insert("svg:svg","h2").attr("width",p).attr("height",j).append("svg:g").attr("transform","translate("+(p-e)/2+","+(j-e)/2+")");
i=m=k;
var f=n.nodes(m);
g.selectAll("circle").data(f).enter().append("svg:circle").attr("class",function(h){return h.children?"parent":"child"
}).attr("cx",function(h){return h.x
}).attr("cy",function(h){return h.y
}).attr("r",function(h){return h.r
}).on("click",function(h){return q(i==h?m:h)
});
g.selectAll("text").data(f).enter().append("svg:text").attr("class",function(h){return h.children?"parent":"child"
}).attr("x",function(h){return h.x
}).attr("y",function(h){return h.y
}).attr("dy",".35em").attr("text-anchor","middle").style("opacity",function(h){return h.r>20?1:0
}).text(function(h){return h.name
});
d3.select(window).on("click",function(){q(m)
});
function q(u,s){var h=e/u.r/2;
o.domain([u.x-u.r,u.x+u.r]);
l.domain([u.y-u.r,u.y+u.r]);
var r=g.transition().duration(d3.event.altKey?7500:750);
r.selectAll("circle").attr("cx",function(t){return o(t.x)
}).attr("cy",function(t){return l(t.y)
}).attr("r",function(t){return h*t.r
});
r.selectAll("text").attr("x",function(t){return o(t.x)
}).attr("y",function(t){return l(t.y)
}).style("opacity",function(t){return h*t.r>20?1:0
});
i=u;
d3.event.stopPropagation()
}})
});