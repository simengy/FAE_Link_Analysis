define(["app","jqueryUi","pivot"],function(){vividSENSE.directive("pivottable",["$rootScope","$timeout","DashboardService","RequireService",function(b,c,d,a){return{restrict:"E",scope:{pivotData:"=pivotData"},replace:true,link:function(f,e,g){a.loadCss(["vs_lib/pivot/pivot.css"]);
f.$watch("pivotData",function(i){if(!i||i.length===0||!i.columns){return
}var k={};
var h="Table";
var j="count";
var l=true;
if(i.plotOptions&&i.plotOptions.pivot&&i.plotOptions.pivot.renderType){h=i.plotOptions.pivot.renderType
}if(i.plotOptions&&i.plotOptions.pivot&&i.plotOptions.pivot.aggregatorName){j=i.plotOptions.pivot.aggregatorName
}if(i.plotOptions&&i.plotOptions.pivot&&i.plotOptions.pivot.showAxis!==undefined){l=i.plotOptions.pivot.showAxis
}if(i.rows&&i.rows.length>0){k.rows=i.rows
}if(i.columns&&i.columns.length>0){k.columns=i.columns
}if(i.aggregators&&i.aggregators.length>0){}k.rendererName=h;
k.aggregatorName=j;
if(e.pivotUI&&typeof e.pivotUI==="function"){e.pivotUI(i.data,k)
}else{a.loadScript(["pivot"]).then(function(){c(function(){e.pivotUI(i.data,k)
},100)
})
}})
}}
}])
});