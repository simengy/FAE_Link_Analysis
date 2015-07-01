define([],function(){angular.module("vividSENSE.widgetService",["vividSENSE.services"]).service("WidgetService",["$rootScope","Extensions","CommonService","EventAction","TEMPLATE_URL","VS_BASE_URL","AppService",function(a,e,f,g,d,b,h){function c(){}c.prototype={self:this,visualizationType:{chart:"chartDesignTitle.html",map:"map.html",table:"dataTable.html",pivottable:"pivotTable.html",infographics:""},actions:{table:function(j){var i={bFilter:false,bSort:false,bRetrieve:true,iDisplayLength:10,bInfo:false,bLengthChange:false,bAutoWidth:false,fnServerData:function(){},sPaginationType:"two_button",pageButton:"paginate_button",sPageButtonActive:"paginate_active",sPageButtonStaticDisabled:"paginate_button",bProcessing:false,bServerSide:false,bPaginate:false,bStateSave:false,bDestroy:true,oLanguage:{sInfo:"Showing _START_ to _END_ records.",sInfoEmpty:"No entries to show",sZeroRecords:"No records to display",sLoadingRecords:"Please wait - loading...",sProcessing:"Processing data"}};
return i
}}};
return{Widgets:c.prototype,getVsWidgets:function(j){var i=c.prototype.visualizationType;
if(j){i=i[j.toLowerCase()]
}return i
},callExtension:function(o,p){if(o.plugins){var k=o.scope;
for(var j=0;
j<o.plugins.length;
j++){var m=o.plugins[j].name;
if(!k.type&&k.design[0].info.type){k.type=k.design[0].info.type
}try{o.type=k.type;
switch(k.type){case"chart":e.getWidget(m,o);
break;
case"infographics":var l=e.getWidget(m,o);
if(l){k.widgetCustom[m]=l
}break;
case"table":e.getWidget(m,o);
break;
case"pivotTable":e.getWidget(m,o);
break;
case"map":e.getWidget(m,o);
break;
default:break
}}catch(n){throw (n)
}}}if(p&&typeof p==="function"){p(e)
}},getAllFilterResult:function(l,o){var n=angular.copy(h.getCurrentDashboard());
var m={};
if(l){for(var j in n.widgets){if(l===j){if(n.widgets[j]&&n.widgets[j].filters){m=n.widgets[j].filters;
break
}}}}var k=f.deepExtend(n.filters,m);
return k
},handelWidget:function(n){var k={},m=n.widget,j=angular.copy(c.prototype.visualizationType);
var i=m.info.template;
var l=b+m.info.type;
if(i){l=h.getProjectRoot()+"/partials/"+m.info.type
}switch(m.info.type.toLowerCase()){case"infographics":if(!i){throw"6030"
}break;
case"table":if(m.data.type==="pivottable"){if(!i){i=j[m.data.type]
}k.scriptFileName="directives/pivotTable"
}else{if(!i){i=j.table
}k.scriptFileName="directives/tableDir"
}break;
case"map":if(!i){i=j[m.info.type]
}k.scriptFileName="directives/mapDir";
n.scope.widgetDataMap=n.scope.widgetData;
break;
case"chart":if(!i){i=j[m.info.type]
}k.scriptFileName="directives/chartDir";
n.scope.widgetDataChart=n.scope.widgetData;
break;
default:throw"6030";
break
}k.template=l+"/"+i;
return k
},widgetCallback:function(j,k){var i={};
j._type="widgetCallback";
a.$broadcast("$widget",j,function(m,n,l){if((n.widgetName&&(l.widgetInfo.name===n.widgetName))||(n.containerName&&(l.widgetInfo.container===n.containerName))){i=l;
if(k&&typeof k==="function"){k(n,l)
}}});
return i
},filterCallback:function(j,k){var i={};
j._type="filterCallback";
a.$broadcast("$widget",j,function(m,n,l){if((n.widgetName&&(l.widgetInfo.name===n.widgetName))||(n.containerName&&(l.widgetInfo.container===n.containerName))){i=l;
if(k&&typeof k==="function"){k(n,l)
}}});
return i
},eventCallback:function(j,k){var i={};
j._type="eventCallback";
a.$broadcast("$widget",j,function(m,o,l){if(o.action){var n=o.action;
g.action[n](l,m,o.event)
}i=l;
if(k&&typeof k==="function"){k(o,l)
}});
return i
}}
}])
});