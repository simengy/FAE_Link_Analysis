define(["angular"],function(a){a.module("vividSENSE.notificationService",[]).service("NotificationService",["$window","$rootScope",function(g,b){var f=[];
var h=[];
var e="_START_REQUEST_";
var c="_END_REQUEST_";
var d={6040:{type:"warning",message:"Extension error, widget extension file not found!!"},6041:{type:"warning",message:"Extension error, filter extension file not found!!"},6042:{type:"warning",message:"Extension error, event extension file not found!!"},6043:{type:"warning",message:"Extension error, template extension file not found!!"},6030:{type:"warning",message:"Widget element not found for widget name or Data Unavaliable"},6010:{type:"danger",message:"Chart Error: Can't plot zero or subzero values on a logarithmic axis"},6012:{type:"danger",message:"Chart Error: vividSENSE expects point configuration to be numbers or arrays in turbo mode"},6013:{type:"danger",message:"Chart Error: Rendering div not found"},6014:{type:"danger",message:"Chart Error: String value sent to series.data, expected Number"},6015:{type:"danger",message:"Chart Error: vividSENSE expects data to be sorted"},6016:{type:"danger",message:"Chart Error: vividSENSE already defined in the page"},6017:{type:"danger",message:"Chart Error: The requested series type does not exist"},6018:{type:"danger",message:"Chart Error: The requested axis does not exist"},6019:{type:"danger",message:"Chart Error: Too many ticks"},6020:{type:"danger",message:"Chart Error: Can't add object point configuration to a long data series"},6021:{type:"warning",message:"Data not Available."},6024:{type:"danger",message:"File not found or undefined."},6060:{type:"danger",message:"Data table exception"},6061:{type:"warning",message:"Please provide location Name"}};
return{handelErrors:function(l,i,m){var k="danger";
if(!i){l.dashboardError=[];
l.widgetError=[];
l.widgetError=null
}else{if(typeof i==="object"){if(i.length>0){if(i[0].errorCode&&i[0].errorMessage){h=i
}}else{h=[]
}}else{var j=d[i];
if(j){l.widgetError={id:i,msg:j.message};
k=j.type
}else{l.widgetError={id:i,msg:m}
}l.widgetErrorType=k
}}if(l.filterCriteria){b.$broadcast("error","Filter: "+d[i].message,"6051")
}if(l.widgetErrorType==="6024"){l.fileNotFound=true
}if(l.dashboard){l.dashboardError=h
}if(l.ispopup){l.popupErrors=h
}},handelError:function(k,j,i){alert(1)
},notify:function(j,i){if(j&&j.split(":")[0].trim()==="Not found"&&i==="error"){i="5004";
h.push({errorCode:"5004",errorMessage:"File not Found",errorDetails:j});
b.$broadcast("dashboardError",h)
}},removeNotification:function(i){f.splice(i,1)
},getAllNotifications:function(){return f
},alert:function(i){g.alert(i)
},console:function(i){console.log(i)
},confirm:function(i){return g.confirm(i)
},requestStarted:function(){b.$broadcast(e)
},requestEnded:function(){b.$broadcast(c)
},onRequestStarted:function(i,j){i.$on(e,function(){j()
})
},onRequestEnded:function(i,j){i.$on(c,function(){j()
})
}}
}]).directive("loading",["$timeout","NotificationService",function(c,b){return{restrict:"E",link:function(e,d){d[0].style.visibility="hidden";
b.onRequestStarted(e,function(){c(function(){d[0].style.visibility="visible"
},10)
});
b.onRequestEnded(e,function(){c(function(){d[0].style.visibility="hidden"
},10)
})
}}
}]).directive("alerts",["NotificationService",function(b){return{restrict:"E",template:'<alert ng-repeat="alert in alerts" type="alert.type" close="closeAlert($index)">{{alert.msg}}</alert>',link:function(c){c.alerts=b.getAllNotifications();
c.closeAlert=function(d){b.removeNotification(d)
}
}}
}])
});