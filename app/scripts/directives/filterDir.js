define(["app"],function(){vividSENSE.directive("filters",["$rootScope","$location","ConfigService","DashboardService","NotificationService","FilterService","WidgetFilter","DashboardFilter","AppService","CommonService",function(j,g,e,f,b,i,c,a,d,h){return{restrict:"E",replace:true,scope:{filters:"=value",filterLevel:"=level",widgetContainer:"=widgetcontainer"},template:'<div data-ng-include="defaults.baseURL"></div>',link:function(l,k,m){var n=false;
l.filterCriteria=[];
l.defaults={baseURL:l.filters.template?d.getProjectRoot()+"/partials/base/"+l.filters.template:e.setUrl("vs","filter"),showComb:"combination"};
l.filterAjaxCallback=function(s,o){if(s.responseBody){var r=angular.copy(s.responseBody.filters);
for(var q=0;
q<r.length;
q++){for(var p=0;
p<l.filter.length;
p++){if(l.filter[p].id===r[q].id){i.filterCallback({filterId:r[q].id,filterData:r[q],isfirstTime:o})
}}}}};
l.$on("filterCriteriaChanged",function(B,p){var u=p.index,y=p.selection,z=p.callback,w=p.isfirstTime;
l.filterCriteria[u]=y;
var o=d.getCurrentDashboard();
var t=i.getFilterValue(angular.copy(l.filterCriteria),l.filters.filter);
if(z){t=z(t)
}if(l.filterLevel){for(var r in o.widgets){if(l.$parent.widgetInfo.name===r){o.widgets[r].filters=angular.copy(t)
}}}else{o.filters=t
}if(o.parentDashboards&&o.parentDashboards.length>0){for(var r=0;
r<o.parentDashboards.length;
r++){var q=d.getDashboardByHash(o.parentDashboards[r]);
h.deepExtend(o.filters,q.filters)
}}if(g.search()){h.deepExtend(o.filters,g.search())
}if(l.dependencyMatrix&&Object.keys(l.dependencyMatrix).length>0){var A=l.filter[u];
if(A&&l.dependencyMatrix[A.id]){var q={filterId:l.dependencyMatrix[A.id]};
if(l.filterLevel==="widget"){q.widget=l.$parent.widgetInfo.name
}var v=i.getDependency(q.filterId,l.dependencyMatrix);
if(v){for(var r=0;
r<v.length;
r++){if(v[r]===A.id){q[v[r]]=t[v[r]]
}else{q[v[r]]=t[v[r]]
}}}var s=q.widget,C=q.filterId;
delete q.widget;
delete q.filterId;
if(!w){if(s){c.post({widget:s,filterId:C},q,function(D){l.filterAjaxCallback(D,w)
})
}else{a.post({filterId:C},q,function(D){l.filterAjaxCallback(D,w)
})
}}}}if(l.type==="individual"){if(n){var x=l.filters.filter[p.index].id;
if(w!==true&&!l.dependencyMatrix.hasOwnProperty(x)){l.filterChanged(t)
}}n=true
}});
l.filterChanged=function(r){r=r||i.getFilterValue(angular.copy(l.filterCriteria),l.filters.filter);
var q=angular.copy(d.getCurrentDashboard());
if(l.filterLevel){var o=angular.copy(r);
h.deepExtend(o,q.filters);
l.$emit("filterWidget",{filter:o});
for(var p in q.widgets){if(l.$parent.widgetInfo.name===p){q.widgets[p].filters=r
}}}else{j.$broadcast("filterDashboard",{filter:r});
q.filters=r
}b.requestStarted()
};
l.setFilter=function(){var p=d.getCurrentDashboard();
var q=i.getFilterValue(angular.copy(l.filterCriteria),l.filters.filter);
if(l.filterLevel){for(var o in p.widgets){if(l.$parent.widgetInfo.name===o){p.widgets[o].filters=q
}}}else{p.filters=q
}};
l.$watch("filters",function(q){if(q){var p=angular.copy(q.filter);
l.type=q.type;
l.filter=p;
l.dependencyMatrix=i.setDependency(p);
try{i.callExtension({},function(s){try{var u="dashboard";
if(l.filterLevel){u=l.filterLevel
}else{u+="_"+l.$parent.dashboardName
}var t=u+"_filters";
s.getFilter(t,{scope:l,data:q,elm:k})
}catch(r){}})
}catch(o){b.handelErrors(l.$parent,o)
}}});
l.$on("$filters",function(o,p,q){if(q&&typeof q==="function"){q(o,p,l)
}})
}}
}]);
vividSENSE.directive("filter",["ConfigService","FilterService","NotificationService","AppService",function(b,a,c,d){return{restrict:"E",replace:true,scope:{index:"=index",filterData:"=value",filterLevel:"=level",widgetContainer:"=widgetcontainer"},template:'<div style="float:none;" data-ng-include="filterURL"></div>',link:function(g,f,h){var e=true;
g.checkValue=false;
g.filterSelection=[];
g.singleModel=[];
g.getFilterIndexValue=function(){var j=g.filterData.data;
var i=0;
if(angular.isArray(j[0])&&j[0].length>1){i=1
}return i
};
g.prvsel=g.filterSelection;
g.filterChanged=function(i){a.setFilterSelection(g,g.filterSelection,false)
};
g.$watch("filterData",function(l){if(l){g.copyData=angular.copy(g.filterData);
var m={scope:g,data:l,elm:f};
var k="app/partials/filters/label.html";
if(l.template){k=d.getProjectRoot()+"/partials/filters/"+l.template
}else{k="app/partials/filters/"+a.getVsFilters(l.type)
}g.filterURL=k;
var j="0";
if(l.initIndexes){j=l.initIndexes
}if(l.data.length<1){j="$none"
}a.filterCallback({filterId:l.id,selected:j,isfirstTime:e,widgetContainer:g.widgetContainer});
g.$parent.setFilter();
try{a.callExtension(m)
}catch(i){c.handelErrors(g.$parent,i)
}e=undefined
}});
g.$on("$filter",function(i,j,k){if(k&&typeof k==="function"){if(j.widgetContainer){if(j.widgetContainer===g.widgetContainer){k(i,j,g)
}}else{k(i,j,g)
}}})
}}
}]).directive("basicSlider",["RequireService",function(a){return{link:function(b,c){a.loadScript(["jqueryUi"]).then(function(){var e=0;
var j=b.filterData.data;
var d=[];
for(var g=0;
g<j.length;
g++){d.push(g)
}var h=[0];
if(b.filterSelection!==undefined){for(var g=0;
g<j.length;
g++){if(j[g][0]==b.filterSelection[0]){h=[g];
break
}}}function f(i,k){b.$emit("filterCriteriaChanged",{index:b.index,selection:j[k.values[0]]});
b.filterSelection=j[k.values[0]];
if(e===1){b.$apply()
}e=1
}$(c).slider({min:d[0],max:d[d.length-1],values:h,slide:f,stop:f,start:f})
})
}}
}])
});