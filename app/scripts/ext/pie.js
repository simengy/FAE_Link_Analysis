var RequireService=getAngularService("RequireService");
vs.ext.chart.addSeriesType("wordcloud",function(c,b,a){RequireService.loadScript(["d3"]).then(function(){var g=960,d=500;
var f=d3.scale.category20();
var k=d3.layout.force().charge(-120).linkDistance(30).size([g,d]);
var e=d3.select(b[0]).append("svg").attr("width",g).attr("height",d);
var j={nodes:[{name:"Myriel",group:1},{name:"Napoleon",group:1},{name:"Mlle.Baptistine",group:1},{name:"Mme.Magloire",group:1},{name:"CountessdeLo",group:1},{name:"Geborand",group:1},{name:"Champtercier",group:1},{name:"Cravatte",group:1},{name:"Count",group:1},{name:"OldMan",group:1},{name:"Labarre",group:2},{name:"Valjean",group:2},{name:"Marguerite",group:3},{name:"Mme.deR",group:2},{name:"Isabeau",group:2},{name:"Gervais",group:2},{name:"Tholomyes",group:3},{name:"Listolier",group:3},{name:"Fameuil",group:3},{name:"Blacheville",group:3},{name:"Favourite",group:3},{name:"Dahlia",group:3},{name:"Zephine",group:3},{name:"Fantine",group:3},{name:"Mme.Thenardier",group:4},{name:"Thenardier",group:4},{name:"Cosette",group:5},{name:"Javert",group:4},{name:"Fauchelevent",group:0},{name:"Bamatabois",group:2},{name:"Perpetue",group:3},{name:"Simplice",group:2},{name:"Scaufflaire",group:2},{name:"Woman1",group:2},{name:"Judge",group:2},{name:"Champmathieu",group:2},{name:"Brevet",group:2},{name:"Chenildieu",group:2},{name:"Cochepaille",group:2},{name:"Pontmercy",group:4},{name:"Boulatruelle",group:6},{name:"Eponine",group:4},{name:"Anzelma",group:4},{name:"Woman2",group:5},{name:"MotherInnocent",group:0},{name:"Gribier",group:0},{name:"Jondrette",group:7},{name:"Mme.Burgon",group:7},{name:"Gavroche",group:8},{name:"Gillenormand",group:5},{name:"Magnon",group:5},{name:"Mlle.Gillenormand",group:5},{name:"Mme.Pontmercy",group:5},{name:"Mlle.Vaubois",group:5},{name:"Lt.Gillenormand",group:5},{name:"Marius",group:8},{name:"BaronessT",group:5},{name:"Mabeuf",group:8},{name:"Enjolras",group:8},{name:"Combeferre",group:8},{name:"Prouvaire",group:8},{name:"Feuilly",group:8},{name:"Courfeyrac",group:8},{name:"Bahorel",group:8},{name:"Bossuet",group:8},{name:"Joly",group:8},{name:"Grantaire",group:8},{name:"MotherPlutarch",group:9},{name:"Gueulemer",group:4},{name:"Babet",group:4},{name:"Claquesous",group:4},{name:"Montparnasse",group:4},{name:"Toussaint",group:5},{name:"Child1",group:10},{name:"Child2",group:10},{name:"Brujon",group:4},{name:"Mme.Hucheloup",group:8}],links:[{source:11,target:10,value:1},{source:11,target:3,value:3},{source:11,target:2,value:3},{source:11,target:0,value:5},{source:12,target:11,value:1},{source:13,target:11,value:1},{source:14,target:11,value:1},{source:15,target:11,value:1},{source:17,target:16,value:4},{source:18,target:16,value:4},{source:18,target:17,value:4},{source:19,target:16,value:4},{source:19,target:17,value:4},{source:19,target:18,value:4},{source:20,target:16,value:3},{source:20,target:17,value:3},{source:20,target:18,value:3},{source:20,target:19,value:4},{source:21,target:16,value:3},{source:21,target:17,value:3},{source:21,target:18,value:3},{source:21,target:19,value:3},{source:21,target:20,value:5},{source:22,target:16,value:3},{source:22,target:17,value:3},{source:22,target:18,value:3},{source:22,target:19,value:3},{source:22,target:20,value:4},{source:22,target:21,value:4},{source:23,target:16,value:3},{source:23,target:17,value:3},{source:23,target:18,value:3},{source:23,target:19,value:3},{source:23,target:20,value:4},{source:23,target:21,value:4},{source:23,target:22,value:4},{source:23,target:12,value:2},{source:23,target:11,value:9},{source:24,target:23,value:2},{source:24,target:11,value:7}]};
k.nodes(j.nodes).links(j.links).start();
var i=e.selectAll(".link").data(j.links).enter().append("line").attr("class","link").style("stroke-width",function(l){return Math.sqrt(l.value)
});
var h=e.selectAll(".node").data(j.nodes).enter().append("circle").attr("class","node").attr("r",5).style("fill",function(l){return f(l.group)
}).call(k.drag);
h.append("title").text(function(l){return l.name
});
k.on("tick",function(){i.attr("x1",function(l){return l.source.x
}).attr("y1",function(l){return l.source.y
}).attr("x2",function(l){return l.target.x
}).attr("y2",function(l){return l.target.y
});
h.attr("cx",function(l){return l.x
}).attr("cy",function(l){return l.y
})
})
})
});