define(["services/dependencyResolverFor","angularRoute","angularCookies","angularResource","angularUi","filters/filters","services/services","services/extensionService","services/widgetService","services/filterService","services/notificationService","controllers/controllers","services/events","TemplateCache/app.templates","services/localeService"],function(a){vividSENSE=angular.module("vividSENSE",["ngResource","ngRoute","ngCookies","ui.bootstrap","vividSENSE.controllers","vividSENSE.filters","vividSENSE.services","vividSENSE.extensionService","vividSENSE.widgetService","vividSENSE.filterService","vividSENSE.notificationService","vividSENSE.EventService","vividSENSE.templateCache","vividSENSE.LocaleService"]);
vividSENSE.value("version","1.4");
vividSENSE.constant("API_SERVICE","server");
vividSENSE.constant("VS_BASE_URL","app/partials/");
vividSENSE.constant("TEMPLATE_URL","app");
vividSENSE.config(["$routeProvider","$locationProvider","$controllerProvider","$compileProvider","$filterProvider","$provide","$httpProvider",function(l,i,k,d,e,h,b){vividSENSE.controller=k.register;
vividSENSE.directive=d.directive;
vividSENSE.filter=e.register;
vividSENSE.factory=h.factory;
vividSENSE.service=h.service;
var g=(window.location.pathname.indexOf("index_pdf")>0)?true:false;
var c={routes:{"/:title*":{templateUrl:"app/partials/vsBase/template.html",dependencies:["directives/commonDir","directives/filterDir","directives/widgetDir","TemplateCache/app.templates"],resolve:{isPDF:function(){vividSENSE.isPDF=g
}}}}};
if(c.routes!==undefined){angular.forEach(c.routes,function(m,n){l.when(n,{templateUrl:m.templateUrl,resolve:a(m.dependencies)})
})
}if(c.defaultRoutePaths!==undefined){l.otherwise({redirectTo:c.defaultRoutePaths})
}var j,f=["$q","$injector","NotificationService",function(m,p,o){function q(s){var r=s.headers();
if(r["content-type"]==="text/html;charset=ISO-8859-1"){window.location="401.jsp"
}j=j||p.get("$http");
if(j.pendingRequests.length<1){o.requestEnded()
}return s
}function n(s){j=j||p.get("$http");
if(j.pendingRequests.length<1){o.requestEnded()
}var r=s.status;
if(r===401||r===403||r===408){return
}else{if(r===400){o.notify("Bad Request : "+s.config.url,"error")
}else{if(r===404){o.notify("Not found : "+s.config.url,"error")
}else{if(r>=500){o.notify("Server Error : "+s.config.url,"error")
}}}}return m.reject(s)
}return function(r){o.requestStarted();
return r.then(q,n)
}
}];
b.responseInterceptors.push(f)
}]);
vividSENSE.run(["$rootScope","$location","$http","DashboardRequestHeader",function(b,e,d,c){b.location=e;
angular.extend(d.defaults.headers.common,c.getCsrfHeader());
return b.$on("$routeChangeStart",function(g,f,h){})
}])
});