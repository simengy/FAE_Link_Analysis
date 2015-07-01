vsApp.Events.extend("alertWidgetData",function(c,b,d){for(var a=0;
a<d.length;
a++){if(c.widgetInfo.name===d[a].eventParams.sourceWidget){alert(JSON.stringify(c.widgetData))
}}});
vsApp.Events.extend("alertWidgetInfo",function(c,b,d){for(var a=0;
a<d.length;
a++){if(c.widgetInfo.name===d[a].eventParams.sourceWidget){alert(JSON.stringify(c.widgetInfo))
}}});
vsApp.Events.extend("testPopUp",function(f,d,g){for(var c=0;
c<g.length;
c++){if(f.widgetInfo.name===g[c].eventParams.widgetName){var e=getAngularService("DashboardService");
var h=getAngularService("NotificationService");
var a={widget:[],filter:{}};
a.widget.push(g[c].eventParams.widgetName);
for(var b in g[c].filterParams){a.filter[b]=g[c].filterParams[b]
}e.getDashboard(a,function(i){if(i.responseHeader.errorMessages.length>0){h.handelError(f.$parent.$parent,i.responseHeader.errorMessages)
}else{f.widget.zoom(i.responseBody.designs,"app/partials/vsBase/popup.html",undefined,a.filter.segment,a.filter.MONTH_YEAR)
}})
}}});