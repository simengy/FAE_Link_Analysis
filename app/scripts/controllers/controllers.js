define(["app"],function(){var a=angular.module("vividSENSE.controllers",["vividSENSE.services"]);
a.controller("mainCtrl",["$scope","$location","$rootScope","$window","$timeout","$document","$anchorScroll","AppService","CommonService","NotificationService","DashboardRequestHeader","ExportingService","RequireService","LocaleService",function(n,f,g,l,u,v,e,i,q,b,h,t,d,o){var j=window.vs.initConf(),s=window.vs.userConf();
var r={},m=0;
g.callWindowEvent=function(w){if(w&&typeof w==="function"){r[m++]=w
}l.onclick=function(y){for(var x in r){r[x](y)
}}
};
n.PDF_EXPORT_URL=i.getApiBase()+"export/PDF";
n.EXCEL_EXPORT_URL=i.getApiBase()+"export/excel";
n.applicationName=vividSENSE.APPLICATION_NAME;
n._csrf=h.getCsrfValue();
function k(z){var w=true;
n.appDesign=i.getDesign();
if(n.appDesign&&n.appDesign.layout&&n.appDesign.layout.menus){var y=[];
for(var x=0;
x<n.appDesign.layout.menus.menu.length;
x++){if(n.appDesign.layout.menus.menu[x].active===true){y.push(n.appDesign.layout.menus.menu[x])
}if(n.appDesign.layout.menus.menu[x]["export"]===true){w=false
}}n.isDlVisible=w;
n.tabs=y||[];
if(window.location.hash===""){n.tabs[0].pageActive=true;
n.dashboardName=n.tabs[0].dashboard;
f.path(n.tabs[0].hash)
}else{n.tabs.forEach(function(A){if(f.path()===A.hash){n.dashboardName=A.dashboard;
A.pageActive=true
}else{A.pageActive=false
}})
}}n.changeTab=function(A){n.showDefinition=false;
n.uncheckAll();
n.isDlCollapsed=false;
n.tabs.forEach(function(B){if(A.hash===B.hash){n.dashboardName=B.dashboard;
B.pageActive=true
}else{B.pageActive=false
}});
f.search({});
f.path(A.hash)
};
n.$window=l
}function p(w){w.scope.logoPosModel=true;
w.scope.goToTop=function(){e()
};
l.onscroll=function(){var x=l.pageYOffset||v[0].documentElement.scrollTop;
if(x>20){w.scope.$apply(function(){n.logoPosModel=false
})
}else{if(!w.scope.logoPosModel){w.scope.$apply(function(){w.scope.logoPosModel=true
})
}}}
}function c(){n.isDlCollapsed=false;
n.exportOptions={options:t.getExportType("dashboard"),type:"",showExportButton:function(x){var w={};
x.forEach(function(y){if(y.hash===f.path()){w=y
}});
return w["export"]
},call:function(y){n.exportUrl=i.getApiBase()+"export/"+y;
var z=angular.copy(i.getCurrentDashboard());
var w={};
for(var x in z.widgets){if(z.widgets[x].filters){w=z.widgets[x].filters
}}q.deepExtend(w,z.filters);
n.exportValuesFilter=w;
var A={type:y,exportValues:w,formName:"frmDashboard"+y};
t.exportWidget(A);
u(function(){n.isDlCollapsed=false
})
}};
n.selectedtabs=[];
n.checkArray=function(w){return angular.isArray(w)
};
n.checkAll=function(z){var w=[];
for(var y=0;
y<z.length;
y++){if(z[y]["export"]===true){w.push(z[y])
}}n.selectedtabs=w;
var x=[];
if(n.selectedtabs){for(var y=0;
y<n.selectedtabs.length;
y++){x.push("#"+n.selectedtabs[y].hash)
}}n.downloadTabs=n.pdfSelection=x.join(",");
n.exportType="pdf";
n.pageFilters=""
};
n.uncheckAll=function(){n.selectedtabs=[]
};
n.setSelectedTabs=function(z){var w=n.selectedtabs.indexOf(z);
if(w===-1){delete z.$$hashKey;
n.selectedtabs.push(z)
}else{n.selectedtabs.splice(w,1)
}var y=[];
if(n.selectedtabs){for(var x=0;
x<n.selectedtabs.length;
x++){y.push("#"+n.selectedtabs[x].hash)
}}n.downloadTabs=n.pdfSelection=y.join(",")
};
n.pdfSelected=function(){u(function(){n.selectedtabs=[]
},2000);
return false
}
}n.$on("$locationChangeStart",function(w){if(window.location.hash===""){n.tabs[0].pageActive=true;
n.dashboardName=n.tabs[0].dashboard;
f.path(n.tabs[0].hash)
}else{n.tabs.forEach(function(x){if(f.path()===x.hash){n.dashboardName=x.dashboard;
x.pageActive=true
}else{x.pageActive=false
}})
}});
k();
p({scope:n});
c({scope:n});
n.userInfo=false;
if(s.userName!==""){n.userInfo=s
}}]);
a.controller("templateCtrl",["$scope","$rootScope","$location","AppService","Dashboard","Widget","NotificationService","RequireService",function(e,c,i,h,d,f,g,b){e.$on("dashboardError",function(j,k){g.handelErrors(e,k)
});
e.$on("$locationChangeStart",function(j){c.backupEventParams={}
});
e.dashboard={loadDashboard:function(j){g.requestStarted();
if(window.vs.exportParam.widget!==null){var k={widgetFilter:true,filter:false};
angular.extend(k,j);
f.post({widget:window.vs.exportParam.widget},k,function(l){b.loadScript(["directives/widgetDir"]).then(function(){if(l.responseBody){l.responseBody.designs[0].info.container="main";
e.templateURL="app/partials/vsBase/exportWidget.html";
e.recievedJSON=l.responseBody
}})
})
}else{d.post(j,function(l){if(!l.responseBody&&!l.responseHeader){window.location="./j_spring_security_logout"
}b.loadScript(["directives/widgetDir"]).then(function(){if(Object.keys(j).length===0){e.backupData=l.responseBody
}c.backupEventParams=undefined;
c.dashboardFiltersValues=j;
if(l.responseHeader.errorMessages[0]){g.handelErrors(e,l.responseHeader.errorMessages)
}if(l.responseBody){e.recievedJSON=l.responseBody;
if(l.responseBody.template){e.templateURL=h.getProjectRoot()+"/partials/html/"+l.responseBody.template.htmlURL;
var n=e.appDesign.layout.menus.menu;
if(n){n.forEach(function(o){if(o.hash===i.path()){e.header={title:l.responseBody.dashboardTitle}
}})
}}if(l.responseBody.filters){e.filterJSON=l.responseBody.filters;
e.currentFilter={};
e.currentFilter.filter=false;
for(var m=0;
m<l.responseBody.filters.filter.length;
m++){if(l.responseBody.filters.filter[m].type==="slider"||l.responseBody.filters.filter[m].type==="basicSlider"){e.addHeight=true
}if(l.responseBody.filters.filter[m].data.length>0){e.currentFilter[l.responseBody.filters.filter[m].id]=l.responseBody.filters.filter[m].data[0][0]
}}}}else{throw"No Data"
}})
},function(l){g.console(l)
})
}},filterDashboard:function(j){e.currentFilter=angular.isDefined(j)?j.filter:{};
j=j||{};
d.post(j.filter,function(k){g.handelErrors(e,k.responseHeader.errorMessages);
e.backupData=k.responseBody;
e.recievedJSON=k.responseBody
})
},changePage:function(j){i.path("/"+j)
}};
e.popErrorMessage=function(j){for(var k=0;
k<e.dashboardError.length;
k++){if(JSON.stringify(e.dashboardError[k])===JSON.stringify(j)){e.dashboardError.splice(k,1)
}}};
e.$on("filterDashboard",function(j,k){e.dashboard.filterDashboard(k)
});
e.dashboard.loadDashboard({})
}]);
a.controller("popupCtrl",["$scope","$modalInstance","$compile","WidgetService","NotificationService","ConfigService","RequireService","TEMPLATE_URL","AppService","design","callback",function(p,i,h,n,b,f,m,l,d,c,o){var g=angular.isArray(c)?"event":"zoom";
p.getTemplate=function(q){var e="";
if(q){p.widgetData=q.data;
p.widgetInfo=q.info;
var r=p.widgetInfo.template;
switch(p.widgetInfo.type){case"table":if(p.widgetData.type==="pivottable"){e="directives/pivotTable";
if(!r){r=f.setUrl("basic","pivotTable")
}}else{e="directives/tableDir";
if(!r){r=f.setUrl("basic","dataTable")
}}break;
case"map":e="directives/mapDir";
if(!r){r=f.setUrl("basic","map")
}q.data.chart.animation=false;
p.widgetDataMap=q.data;
break;
case"chart":e="directives/chartDir";
if(!r){r=f.setUrl("basic","chart")
}p.widgetDataChart=q.data;
break;
default:break
}}m.loadScript([e]).then(function(){if(p.widgetInfo.template){p.template=d.getProjectRoot()+"/partials/"+p.widgetInfo.type+"/"+r
}else{p.template=l+"/partials/"+p.widgetInfo.type+"/"+r
}})
};
if(o&&typeof(o)==="function"){p.regex=self.defaultRegex;
o(p,i,h)
}else{if(g==="event"){p.showZoom=false;
p.design=c;
if(c[0]&&c[0].info.plugins){try{n.callExtension({plugins:c[0].info.plugins,scope:p})
}catch(j){console.log(j)
}}}else{if(g==="zoom"){var k=d.getProjectRoot();
p.showZoom=true;
if(c.info.title&&c.info.title.style){if(c.info.title.style.x){c.info.title.style.marginLeft=c.info.title.style.x
}if(c.info.title.style.y){c.info.title.style.marginTop=c.info.title.style.y
}}if(c.info.subTitle&&c.info.subTitle.style){if(c.info.subTitle.style.x){c.info.subTitle.style.marginLeft=c.info.subTitle.style.x
}if(c.info.subTitle.style.y){c.info.subTitle.style.marginTop=c.info.subTitle.style.y
}}if(c.info.icon){if(c.info.icon.indexOf(".")!==-1){p.widgetIcon=k+"/images/"+c.info.icon
}}p.design=[c];
p.header=c.info.title||c.info.name;
if(c){if(c.info.plugins){if(c.info.type==="table"){p.overrideOptions=n.Widgets.visualizationType.table
}try{n.callExtension({plugins:c.info.plugins,scope:p})
}catch(j){b.handelErrors(p,j)
}}else{if(c.info.type==="table"){if(c.data.plotOptions&&c.data.plotOptions.datatable&&c.data.plotOptions.datatable.point){c.data.plotOptions.datatable.point.events={}
}}else{if(c.info.type==="chart"){if(c.data.chart){c.data.chart.height=400
}c.data.exporting={enabled:false};
if(c.data.tooltip){c.data.tooltip.enabled=true
}if(c.data.series){if(c.data.series[0]&&c.data.series[0].point&&c.data.series[0].point.events.click){c.data.series[0].point.events.click="(function(){})"
}if(c.data.series[1]&&c.data.series[1].point&&c.data.series[1].point.events.click){c.data.series[1].point.events.click="(function(){})"
}if(c.data.plotOptions&&c.data.plotOptions.column){c.data.plotOptions.column.allowPointSelect=false
}}}else{if(c.info.type==="map"){c.data.chart.reflow=true;
c.data.exporting={enabled:false};
if(c.data.series){if(c.data.plotOptions){if(c.data.plotOptions.mapbubble){c.data.plotOptions.mapbubble.allowPointSelect=false;
c.data.plotOptions.mapbubble.point={events:{click:"(function(){})"}}
}if(c.data.plotOptions.map){c.data.plotOptions.map.allowPointSelect=false;
c.data.plotOptions.map.point={events:{click:"(function(){})"}}
}}}}}}}}}}}p.cancel=function(){i.dismiss("cancel")
}
}])
});