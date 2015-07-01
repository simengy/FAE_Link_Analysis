vsApp.Events.extend("dmlEvent",function(k,b,c){for(var d=0;
d<c.length;
d++){console.log(k);
if(k.widgetInfo.name===c[d].eventParams.sourceWidget){var l=c[d].eventParams,f=c[d].filterParams,j=getAngularService("Widget"),h=getAngularService("NotificationService"),a=getAngularService("$rootScope"),g=getAngularService("$modal");
if(f.queryType==="DELETE"){j.post({widget:l.widgetName},f,function(i){if(i.responseHeader.errorMessages&&i.responseHeader.errorMessages.length!=0){h.alert("unable to delete row")
}else{h.alert("row deleted :: effects will be visible after refreshing the page")
}},function(i){h.alert("unable to delete row")
})
}else{var e={};
f.$rowMeta.forEach(function(n,m){e[n]=f.$rowData[m]
});
g.open({templateUrl:"sphinx/partials/infographics/results.html",controller:function(i){i.rowModel=e;
i.submit=function(){var m=[];
f.$rowData.forEach(function(p,o){if(p===null||(typeof p)===undefined){m.push(o)
}});
m.forEach(function(o){f.$rowData.splice(o,1);
f.$rowMeta.splice(o,1)
});
f.$rowEditMeta=[];
f.$rowEditData=[];
for(var n in i.rowModel){if(i.rowModel.hasOwnProperty(n)){f.$rowEditMeta.push(n);
f.$rowEditData.push(i.rowModel[n])
}}j.post({widget:l.widgetName},f,function(o){if(o.responseHeader.errorMessages&&o.responseHeader.errorMessages.length!=0){h.alert("unable to update row");
i.cancel();
console.log(o.responseHeader.errorMessages)
}else{h.alert("row updated :: effects will be visible after refreshing the page");
i.cancel()
}},function(o){h.alert("unable to updaterow");
i.cancel();
console.log(o)
})
};
i.cancel=function(){i.$dismiss("cancel")
}
}})
}}}});