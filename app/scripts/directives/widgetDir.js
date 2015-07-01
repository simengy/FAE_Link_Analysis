define(["app","directives/filterDir","directives/commonDir"],function(){vividSENSE.directive("widget",["$rootScope","$timeout","ConfigService","RequireService","CommonService","Widget","WidgetFilter","WidgetService","NotificationService","EventAction","ExportingService","TEMPLATE_URL","AppService","WidgetSseStream","WidgetWSStream",function(m,c,f,n,h,l,d,o,b,k,g,j,e,i,a){return{restrict:"E",replace:true,scope:{data:"=data"},template:'<div data-ng-include="defaults.baseURL"></div>',link:function(u,q,p){var t=e.getProjectRoot();
var s=u;
u.widgetParams={};
function r(v,w){if(v.filters){v.filters.filter.forEach(function(x){u.$broadcast("changeFilterState",x.id,w)
})
}}u.showBackButton=function(w,y,A,v){u.widgetParams=A[0].filterParams;
if(v){u.eventParams=u.eventParams||[];
for(var x=0;
x<A.length;
x++){u.showBack=w;
r(v,"hide");
var z=angular.copy(A[x]);
z.eventParams.sourceWidget=v.name;
u.eventParams.push(z)
}}};
u.goBack=function(){var v=true;
var w=u.eventParams.pop();
if(w){if(w.eventParams.widgetName===u.widgetInfo.name){if(w.eventParams.location){var x={widgetFilter:true,filter:false};
angular.extend(x,w.filterParams);
l.post({widget:w.eventParams.sourceWidget},x,function(y){var z=y.responseBody.designs[0];
if(z){u.widgetParams=w.filterParams;
v=false;
z.info.container=w.eventParams.location;
u.widget.load([z]);
b.handelErrors(u.$parent.$parent);
b.handelErrors(u)
}else{b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u,"6030")
}if(u.eventParams.length===0){u.showBack=false;
r("show")
}if(u.showBack===true&&v===true){u.widget.load([]);
u.showBack=false;
b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u,"6030")
}})
}}else{if(w.eventParams.location){var x={widgetFilter:true,filter:false};
angular.extend(x,w.filterParams);
l.post({widget:w.eventParams.sourceWidget},x,function(y){var z=y.responseBody.designs[0];
if(z){u.widgetParams=w.filterParams;
v=false;
z.info.container=w.eventParams.location;
u.widget.load([z]);
b.handelErrors(u.$parent.$parent);
b.handelErrors(u)
}else{b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u,"6030")
}if(u.eventParams.length===0){u.showBack=false;
r("show")
}if(u.showBack===true&&v===true){u.widget.load([]);
u.showBack=false;
b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u,"6030")
}})
}}}else{}};
u.defaults={baseURL:f.setUrl("vs","widget")};
u.common=h;
u.containerName=p.name;
u.type="infographics";
u.show=(true&&p.state==="hide"?false:true);
u.currentActiveTab=u.$parent.currentActiveTab;
u.exportOptions={options:g.getExportType("widget"),type:"",call:function(y){var w=o.getAllFilterResult(u.widgetInfo.name),x={};
for(var v in w){if(v!=="widgetFilter"&&v!=="widget"&&v!=="filter"&&v!=="internalDashboardName"&&v!=="applicationName"){x[v]=w[v]
}}var z={type:y,formName:"frmExportWidget",exportValues:x,widgetName:u.widgetInfo.name,action:e.getApiBase()+"export/"+y};
g.exportWidget(z)
}};
s.streamData=function(v){u.$broadcast("streamdata",v)
};
s.createSSeStream=function(){var v={};
var w=e.getCurrentDashboard();
if(w.filters){h.deepExtend(v,angular.copy(w.filters))
}if(w.widgets[u.widgetInfo.name]){h.deepExtend(v,angular.copy(w.widgets[u.widgetInfo.name].filters))
}c(function(){s.stream=i.stream({widget:u.widgetInfo.name,id:u.widgetInfo.streamId},v,function(y,x){s.streamData(y)
},function(x){s.stream.close()
})
},1000)
};
s.createWebsocketStream=function(){var v={};
var w=e.getCurrentDashboard();
if(w.filters){h.deepExtend(v,angular.copy(w.filters))
}if(w.widgets[u.widgetInfo.name]){h.deepExtend(v,angular.copy(w.widgets[u.widgetInfo.name].filters))
}c(function(){s.stream=a.stream({widget:u.widgetInfo.name,id:u.widgetInfo.streamId},v,function(y,x){s.streamData(y)
},function(x){s.stream.close()
})
},1000)
};
u.closeStream=function(){if(s.stream){s.stream.close();
u.$broadcast("streamclosed",u.widgetInfo.streamId)
}};
u.$on("$locationChangeStart",function(v){u.closeStream()
});
u.widget={load:function(z,v,y){var B=null;
z.forEach(function(C){if(v){if(v.widgetName===C.info.name){B=C
}}else{if(C.info.container===p.name){B=C
}}});
var x=e.getCurrentDashboard();
x.widgets[B.info.name]={};
u.type=B.info.type;
u.showZoom=B.info.zoom||false;
if(B.info.filters){if(!y){u.filterInner=B.info.filters
}u.level="widget"
}u.widgetInfo=B.info;
u.widgetInfo.container=p.name;
u.widgetExporting=B.info.exporting;
u.widgetTitle=B.data.title;
u.widgetSubTitle=B.data.subtitle;
if(u.widgetInfo.title&&u.widgetInfo.title.style){if(u.widgetInfo.title.style.x){u.widgetInfo.title.style.marginLeft=u.widgetInfo.title.style.x
}if(u.widgetInfo.title.style.y){u.widgetInfo.title.style.marginTop=u.widgetInfo.title.style.y
}}if(u.widgetInfo.subTitle&&u.widgetInfo.subTitle.style){if(u.widgetInfo.subTitle.style.x){u.widgetInfo.subTitle.style.marginLeft=u.widgetInfo.subTitle.style.x
}if(u.widgetInfo.subTitle.style.y){u.widgetInfo.subTitle.style.marginTop=u.widgetInfo.subTitle.style.y
}}if(u.widgetInfo.icon){if(u.widgetInfo.icon.indexOf(".")!==-1){u.widgetIcon=t+"/images/"+u.widgetInfo.icon
}}u.widgetData=B.data;
if(u.widgetData){u.noDataAvailable=u.widgetData?false:true
}u.widgetCustom={};
var A=u.widgetInfo.plugins;
if(A){try{o.callExtension({plugins:u.widgetInfo.plugins,scope:u})
}catch(w){b.handelErrors(u,w)
}}try{var x=o.handelWidget({widget:B,scope:u});
n.loadScript([x.scriptFileName]).then(function(){if(B.info.template){u.widgetUrl=x.template
}else{u.widgetUrl=x.template
}if(u.widgetInfo.streamId){s.createWebsocketStream()
}});
b.handelErrors(u)
}catch(w){b.handelErrors(u,w)
}},zoom:function(v,w,x){u.common.openModal(v,w,x)
},filter:function(w,v){v.filter.filter=false;
var x={widgetFilter:true};
if(u.widgetParams&&u.widgetParams.offsetParam){u.widgetParams.offsetParam=0
}angular.extend(u.widgetParams,v.filter);
angular.extend(x,u.widgetParams);
l.post({widget:u.widgetInfo.name},x,function(y){var z=y.responseBody.designs[0];
if(z){u.widgetData=z.data;
u.widgetInfo=z.info;
if(u.widgetInfo.type==="map"){u.widgetDataMap=z.data
}else{if(u.widgetInfo.type==="chart"){u.widgetDataChart=z.data
}}b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u)
}else{b.handelErrors(u.$parent.$parent,y.responseHeader.errorMessages);
b.handelErrors(u,"6030")
}})
}};
u.$on("filterWidget",function(v,w){u.closeStream();
u.widget.filter(v,w)
});
u.$on("filterDashboard",function(v,w){u.closeStream();
u.eventParams=[];
u.showBack=false
});
u.$watch("$parent.recievedJSON",function(w){if(w){var v=angular.copy(w.designs);
u.fullData=v;
u.widget.load(v)
}});
u.$on("$widget",function(v,w,x){if(x&&typeof x==="function"){x(v,w,u)
}});
u.widgetEvent=function(v,x,y){var w=[];
if(y){y.forEach(function(A){var z={};
z.eventParams={};
z.eventParams.widgetName=A.widget;
z.eventParams.location=x;
z.eventParams.sourceWidget=u.widgetInfo.name;
z.filterParams=A.params;
w.push(z)
})
}m.$broadcast(v,w)
};
u.checkWidgetEventAction=function(v,x){var w=false;
if(v.widgetInfo&&x.length&&x.length>0){if(u.widgetInfo.name===x[0].eventParams.sourceWidget){w=true
}}return w
};
u.widgetEventActionCall=function(y,x,A){var z=true;
if(x.widgetInfo&&A.length&&A.length>0){var w=y.eventFunction;
for(var v=0;
v<A.length;
v++){if(u.widgetInfo.name===A[v].eventParams.widgetName){k.action[w](u,y,A[v])
}else{if(u.widgetInfo.name===A[v].eventParams.sourceWidget){}}}}return z
};
u.$on("showErrors",function(w,x,v){if(!x){u.widgetError=null
}else{if(v===u.widgetInfo.name){u.widgetError=x;
if(x.type){u.widgetErrorType=x.type||"danger"
}}}});
u.$on("drilldown",function(v,w){k.action.drilldownEvent(u,v,w)
});
u.$on("popupWidget",function(v,w){k.action.popupEvent(u,v,w)
});
u.$on("changePage",function(v,w){if(u.checkWidgetEventAction(u,w)===true){k.action.changePageEvent(u,v,w)
}});
u.$on("loadWidget",function(v,w){v.eventFunction="loadWidgetEvent";
u.widgetEventActionCall(v,u,w)
});
u.$on("addedNewEventAction",function(v,w){u.$on(w.action,function(y,z){var x=y.name;
k.action[x](u,y,z)
})
})
}}
}])
});