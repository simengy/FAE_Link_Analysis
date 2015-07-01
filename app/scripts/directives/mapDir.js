define(["app","maps","data","theme","chartMore","noData"],function(){vividSENSE.directive("map",["CommonService","NotificationService",function(b,a){return{restrict:"E",template:"<div></div>",scope:{mapData:"=value",id:"=id"},transclude:true,replace:true,link:function(e,d){Highmaps.setOptions({chart:{backgroundColor:"transparent"}});
var c={chart:{renderTo:e.id||d[0]},title:{text:""},lang:{noData:"No Data To Display"},noData:{style:{fontWeight:"bold",fontSize:"22px",color:"#6B6B6B"}},plotOptions:{}};
e.$watch("mapData",function(h){if(!h||!h.series){return
}var g=angular.copy(h);
angular.forEach(g.series,function(k){if(k&&k.mapData&&!angular.isArray(k.mapData)){k.mapData=Highmaps.geojson(k.mapData,"map")
}});
var f=b.deepExtend(g,c);
var j=(window.location.pathname.indexOf("index_pdf")>0)?true:false;
if(j){Highmaps.setOptions({plotOptions:{series:{enableMouseTracking:false,animation:false}}})
}angular.forEach(f.series,function(k){if(k.type==="mapline"){if(f.plotOptions.mapline&&f.plotOptions.mapline.color){angular.forEach(k.mapData,function(l){l.color=f.plotOptions.mapline.color
})
}if(k.color){angular.forEach(k.mapData,function(l){l.color=k.color
})
}}});
try{new Highmaps.Map(f);
$(window).trigger("resize")
}catch(i){console.log(i);
a.handelErrors(e.$parent.$parent.$parent.$parent,"60"+i)
}})
}}
}])
});