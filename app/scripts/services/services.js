define(["angular","common","angularUi"],function(a){a.module("vividSENSE.services",[]).service("DashboardRequestHeader",[function(){function d(){return{"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")}
}function b(){return $("meta[name='_csrf']").attr("content")
}function c(){return{"Content-Type":"application/x-www-form-urlencoded","X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")}
}return{getCsrfHeader:d,getPostRequestHeaders:c,getCsrfValue:b}
}]).service("UriService",[function(){function c(d){return encodeURIComponent(d,true).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")
}function b(f,d,g){var e="";
if(d){for(e in d){if(d.hasOwnProperty(e)){f=f.replace(":"+e,d[e])
}}}if(g){f=f+"?";
for(e in g){if(Array.isArray(g[e])){g[e].forEach(function(h){f=f+c(e)+"="+c(h)+"&"
})
}else{f=f+c(e)+"="+c(g[e])+"&"
}}}return f
}return{buildUri:b}
}]).factory("Dashboard",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("DashboardData",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard/data",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("DashboardFilter",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard/filters/:filterId",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("Widget",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard/widgets/:widget",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("WidgetData",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard/widgets/:widget/data",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("WidgetFilter",["$resource","AppService","DashboardService","DashboardRequestHeader",function(c,e,d,b){return c(e.getApiBase()+"dashboards/:dashboard/widgets/:widget/filters/:filterId",{dashboard:e.getCurrentDashboardName},{post:{method:"POST",headers:b.getPostRequestHeaders(),transformRequest:function(f){return encodeParams(d.getParams(f))
},cache:true}})
}]).factory("WidgetSseStream",["AppService","DashboardService","DashboardRequestHeader","UriService",function(f,d,b,c){function e(g,l,k,h){var i=f.getApiBase()+"dashboards/"+f.getCurrentDashboardName()+"/widgets/:widget/stream/:id";
i=c.buildUri(i,g,l);
var j=new EventSource(i);
if(k){j.addEventListener("message",function(m){k(JSON.parse(m.data),m)
},false)
}if(h){j.addEventListener("error",function(m){console.log(m);
h(m);
j.close()
},false)
}return j
}return{stream:e}
}]).factory("WidgetWSStream",["AppService","DashboardService","DashboardRequestHeader","UriService",function(f,d,b,c){function e(g,o,n,h){var j=f.getApiBase()+"dashboards/"+f.getCurrentDashboardName()+"/widgets/:widget/wsstream/:id";
j=c.buildUri(j,g,o);
var m=window.location.pathname;
if(window.location.pathname.indexOf(".jsp")!==-1){var i=window.location.pathname.split("/");
m=i.slice(0,i.length-1).join("/")+"/"
}j="ws://"+window.location.host+m+j;
var l=new WebSocket(j);
if(n){l.onmessage=function(k){n(JSON.parse(k.data),k)
}
}if(h){l.onerror=function(k){h(k)
}
}return l
}return{stream:e}
}]).service("CommonService",["$modal","$compile","$document","$anchorScroll",function(p,j,i,k){var r=this;
r.defaultColors={};
r.defaultRegex={emailSpecific:/^([\w-\.]+@(?!gmail.com)([\w-]+\.)+[\w-]{2,4})?$/,word:/^\w*\.*\w*$/,wordSpecial:/^[a-zA-Z' ]{0,150}$/,email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/};
function l(s,u){var t=r.defaultColors[s];
if(u){t=r.defaultColors[u.toLowerCase()]
}return t
}function c(v,u){var t=0,s=null;
if(!a.isObject(u)){v.forEach(function(w){if(t<w[u]){t=w[u];
s=w
}})
}else{v.forEach(function(x){for(var w in x){if(t<x[w]){t=x[w];
s=x[w]
}}})
}return s
}function e(v,u){var t=1000,s=null;
if(!u){u=0
}v.forEach(function(w){if(t>w[u]){t=w[u];
s=w
}});
return s
}function h(u){if(!u){return[]
}var s;
s=[];
for(var t in u){if(t!=="$$hashKey"){s.push(t)
}}return s
}function m(u,s){var t=u/s*100;
if(t<25){t=25
}return t
}function q(s){if(s&&Highcharts.charts){var t=Highcharts.charts.filter(function(u){if(u&&s.chart.renderTo){return s.chart.renderTo.attributes["data-highcharts-chart"].value===u.renderTo.attributes["data-highcharts-chart"].value
}return false
});
if(t&&(t.length>0)){return t[t.length-1]
}}}function b(s,u,v){var t=u||"app/partials/vsBase/popup.html";
p.open({templateUrl:t,controller:"popupCtrl",resolve:{callback:function(){return v
},design:function(){return s
}}})
}function g(s,u){for(var t in u){if(u[t]&&u[t].constructor&&u[t].constructor===Object){s[t]=s[t]||{};
g(s[t],u[t])
}else{s[t]=u[t]
}}return s
}function f(w){var v=0;
for(var u in w){var s=true;
for(var t in w[u]){if((w[u][t]&&typeof(w[u][t])==="string"&&w[u][t]!==""&&w[u][t].toLowerCase()==="unknown")||!w[u][t]){s=false
}}if(s){v+=w[u]["Sum of PCT_BREAKUP"]||w[u].Sum_PCT_BREAKUP||w[u].y||w[u].Sum_ABS_VALUE||w[u].SUM_ABS_VALUE
}}return v
}function d(u,t){var s=u;
s.sort(function(w,v){if(v[t]>w[t]){return 1
}else{return -1
}});
return s
}function o(v){if(v){var t=v.target;
if(!t){return
}var s=t.classList;
if(s){var u=s.contains("top-line")||s.contains("handle-right")||s.contains("chosen-choices")||s.contains("drawer-right")||s.contains("user_info")||s.contains("downloadTxt")||s.contains("download_pdf")||s.contains("download")||s.contains("download_dd")||(t.parentElement!==null&&t.parentElement.classList.contains("drawer-right"))||(t.parentElement!==null&&(t.parentElement.classList.contains("download")||t.parentElement.classList.contains("downloadTxt")||t.parentElement.classList.contains("user_info")||t.parentElement.classList.contains("user_name")||t.parentElement.classList.contains("download_inner")||t.parentElement.classList.contains("download_dd")||t.parentElement.classList.contains("check_uncheck_all")));
if(!u){return"close"
}}}}function n(){var v=window.location.search;
var s={};
if(v!==""){v=v.substring(1);
v=urldecode(v);
var u=v.split("&");
var t=null;
u.forEach(function(w){t=w.split("=");
if(t[0]){if(!s.hasOwnProperty(t[0])){s[t[0]]=t[1]
}else{if(!a.isArray(s[t[0]])){s[t[0]]=[s[t[0]]]
}s[t[0]].push(t[1])
}}})
}return s
}return{isLocal:function(){return r.local
},isAuthenticated:function(){return r.authenticated
},getChartFromSelector:q,getColorValues:l,getMaxValue:c,getMinValue:e,notSorted:h,sortData:d,getPercent:m,openModal:b,deepExtend:g,getTotal:f,closeSearchWhenClickingElsewhere:o,getQueryParamsFromUrl:n}
}]).service("DashboardService",["$injector","$http","$location","AppService","API_SERVICE","TEMPLATE_URL","CommonService",function(k,i,f,e,g,j,h){function b(l){var o={};
var m=h.getQueryParamsFromUrl();
for(var n in m){if(!o.hasOwnProperty(n)){o[n]=m[n]
}}if(!a.isDefined(l)){l={}
}return a.extend(l,o)
}function c(m,l){if(l.type==="slider"||"basicSlider"){m.addHeight=true
}}function d(n,o){if(o.responseBody){n.recievedJSON=o.responseBody;
if(o.responseBody.template){n.templateURL=j+"html/"+o.responseBody.template.htmlURL;
var m=n.appDesign.layout.menus.menu;
if(m){m.forEach(function(p){if(p.hash===f.path()){n.header={number:p.icon,title:o.responseBody.dashboardTitle}
}})
}}if(o.responseBody.filters){n.filterJSON=o.responseBody.filters;
n.currentFilter={};
n.currentFilter.filter=false;
for(var l=0;
l<o.responseBody.filters.filter.length;
l++){if(o.responseBody.filters.filter[l].type==="slider"||o.responseBody.filters.filter[l].type==="basicSlider"){n.addHeight=true
}if(o.responseBody.filters.filter[l].data.length>0){n.currentFilter[o.responseBody.filters.filter[l].id]=o.responseBody.filters.filter[l].data[0][0]
}}}}else{throw"No Data"
}}return{setDashboardTemplate:d,getParams:b}
}]).service("AppService",["$location","$rootScope",function(d,b){var c=this;
this.tabs=[];
this.load=function(){var e=window.vs.initConf();
if(a.isDefined(e.responseBody.appDesign)&&a.isDefined(e.responseBody.appDesign.layout)&&a.isDefined(e.responseBody.appDesign.layout.menus)){this.tabs=e.responseBody.appDesign.layout.menus.menu||this.tabs
}if(e.responseHeader.errorMessages&&e.responseHeader.errorMessages.length>0){b.$broadcast("dashboardError",e.responseHeader.errorMessages)
}this.appData=e.responseBody;
this.buildDashboards(this.tabs)
};
this.filterDashboard=function(f,g){var e=[];
var h=f.filter(function(i){if(i.childMenus){e=e.concat(c.filterDashboard(i.childMenus,g))
}return g(i)
});
return e.concat(h)
};
this.getByDashboardName=function(e){var f=c.filterDashboard(c.tabs,function(g){if(g.dashboard===e){return true
}});
return f.length===0?undefined:f[0]
};
this.buildDashboards=function(e){e.forEach(function(h,f){h.childDashboards=[];
h.parentDashboards=[];
h.widgets={};
if(h.parent){var g=h.parent.split(",");
g.forEach(function(j){var i=c.getByDashboardName(j);
if(i){h.parentDashboards.push(i.hash);
i.childDashboards.push(h.hash)
}})
}h.filters={};
if(h.childMenus){c.buildDashboards(h.childMenus)
}})
};
this.getDashboardByHash=function(f){if(!c.appData){c.load()
}var e=c.filterDashboard(c.tabs,function(g){if(g.hash===f){return true
}});
return e.length===0?undefined:e[0]
};
this.getCurrentDashboard=function(){return this.getDashboardByHash(d.path())
};
return{getDesign:function(){if(!c.appData){c.load()
}return c.appData.appDesign
},getName:function(){if(!c.appData){c.load()
}return c.appData.appName
},getApiBase:function(){return this.getName()+"/api/"
},getProjectRoot:function(){return c.appData.root
},getCurrentDashboard:c.getCurrentDashboard,getCurrentDashboardName:function(){if(c.getCurrentDashboard()&&c.getCurrentDashboard().dashboard){return c.getCurrentDashboard().dashboard
}else{return false
}},getDashboardByHash:c.getDashboardByHash}
}]).service("ConfigService",["$document","$q",function(e,d){var c={base:"app/partials/vsBase",template:{base:"app/partials/vsBase/template.html"},widget:{base:"app/partials/vsBase/widget.html",chart:"chartDesignTitle.html",map:"map.html",dataTable:"dataTable.html",pivotTable:"pivotTable.html"},filter:{base:"app/partials/vsBase/filters.html",filter:"app/partials/vsBase/filter.html"},other:{popup:"app/partials/vsBase/popup.html",email:"app/partials/vsBase/email.html"},vs:{template:"app/partials/vsBase/template.html",widget:"app/partials/vsBase/widget.html",popup:"app/partials/vsBase/popup.html",email:"app/partials/vsBase/email.html",filters:"app/partials/vsBase/filters.html",filter:"app/partials/vsBase/filter.html"},custom:{filter:"app/partials/filters/filter.html"},basic:{filter:"app/partials/filters/",chart:"chartDesignTitle.html",map:"map.html",dataTable:"dataTable.html",pivotTable:"pivotTable.html"},html:{template:"app/partials/html/",filter:"app/partials/filters/",widget:"app/partials/vsBase/widget.html"}};
function b(h,g){var f="";
f=c[h][g];
return f
}return{setUrl:b}
}]).service("RequireService",["$document","$q",function(f,b){function c(g){var h=b.defer();
if(!Array.isArray(g)){g=[g]
}require(g,function(){h.resolve()
},function(i){h.reject(i)
});
return h.promise
}function d(g){var h=document.createElement("link");
h.setAttribute("rel","stylesheet");
h.setAttribute("type","text/css");
h.setAttribute("href",g);
if(typeof h!=="undefined"){document.getElementsByTagName("head")[0].appendChild(h)
}}function e(g){}return{loadScript:c,loadCss:d}
}]).service("ExportingService",["$document","$timeout","$location","AppService","CommonService","ConfigService","DashboardService","DashboardRequestHeader",function(d,c,h,e,j,f,g,b){function i(m){var r=a.copy(e.getCurrentDashboard());
var l=document.forms[0];
if(m.formName){l=document[m.formName]
}if(m.action){try{l.setAttribute("action",m.action)
}catch(t){l=l[0];
l.setAttribute("action",m.action)
}}if(l.pagelist){l.pagelist.value="#"+r.hash
}if(l.widget){l.widget.value=m.widgetName
}if(l.filters){for(var n in m.exportValues){if(m.exportValues[n]===undefined){m.exportValues[n]=""
}}l.filters.value=JSON.stringify(m.exportValues)
}var p={};
if(l.dashboard||m.type.toLowerCase()==="excel"){if(l.filters){var q={};
a.extend(q,r.filters);
for(var s in r.widgets){if(r.widgets[s].filters){a.extend(q,r.widgets[s].filters)
}}p=a.extend(p,q)
}l.filters.value=JSON.stringify(p);
if(!l.dashboard){var u=document.createElement("input");
u.setAttribute("type","hidden");
u.setAttribute("name","dashboard");
u.setAttribute("value",r.dashboard);
l.appendChild(u)
}else{l.dashboard.value=r.dashboard
}}if(l.getAttribute("name")==="frmDashboardexcel"){for(var s in r.widgets){if(r.widgets[s].filters){for(var o in r.widgets[s].filters){if(typeof r.widgets[s].filters[o]==="object"){for(var n=0;
n<r.widgets[s].filters[o].length;
n++){var u=document.createElement("input");
u.setAttribute("type","text");
u.setAttribute("name",o);
u.setAttribute("value",r.widgets[s].filters[o][n]);
l.appendChild(u)
}}else{var u=document.createElement("input");
u.setAttribute("type","text");
u.setAttribute("name",o);
u.setAttribute("value",r.widgets[s].filters[o]);
l.appendChild(u)
}}}}}if(b.getCsrfValue()){var u=document.createElement("input");
u.setAttribute("type","hidden");
u.setAttribute("name","X-CSRF-TOKEN");
u.setAttribute("value",b.getCsrfValue());
l.appendChild(u)
}c(function(){l.submit()
})
}function k(){}k.prototype={self:this,options:{email:"Email",pdf:"PDF",png:"PNG",jpeg:"JPEG",gif:"GIF",excel:"Excel"},levels:{widget:["email","pdf","png","jpeg","gif","excel"],dashboard:["pdf","excel"]},actions:{email:function(l){j.openModal(null,null,function(n,o,m){n.regex={emailSpecific:/^([\w-\.]+@(?!gmail.com)([\w-]+\.)+[\w-]{2,4})?$/,word:/^\w*\.*\w*$/,wordSpecial:/^[a-zA-Z' ]{0,150}$/,email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/};
n.header="Email";
n.content=f.setUrl("vs","email");
n.disable=false;
n.submit=function(q){console.log(l);
n.loading=true;
n.disable=true;
var p={name:q.name,subject:q.subject,body:q.message,recepients:q.email,appName:vividSENSE.APPLICATION_NAME,widget:l.widgetName,pagelist:"#"+e.getCurrentDashboard().hash,filter:JSON.stringify(l.exportValues)};
$.ajax({type:"POST",url:l.action,headers:{"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")},data:p,success:function(r){if(r.error){$("#errorSpan").css({color:"red"}).html(r.error).show();
if(!n.$$phase){n.$apply(function(){n.loading=false;
n.disable=false
})
}}else{if(r.success){if(!n.$$phase){n.$apply(function(){n.loading=false;
n.disable=false
})
}$("#errorSpan").css({color:"green"}).html(r.success).show().fadeOut(3500);
c(function(){n.cancel();
if(!n.$$phase){n.$apply(function(){n.loading=false;
n.disable=false
})
}},3000)
}}},error:function(){$("#errorSpan").css({color:"red"}).html("Something went wrong ... ").show();
n.loading=false;
n.disable=false;
n.$apply()
}})
};
n.reset=function(p){p.user={};
$("#errorSpan").hide()
}
})
},pdf:function(l){i(l)
},png:function(l){i(l)
},jpeg:function(l){i(l)
},gif:function(l){i(l)
},excel:function(l){i(l)
}}};
return{Exports:k.prototype,getExportType:function(p){var o=k.prototype.options,m=[];
var n=k.prototype.levels[p.toLowerCase()];
for(var l in o){if(n.indexOf(l.toLowerCase())!=-1){m.push(o[l])
}}return m
},exportWidget:function(l){k.prototype.actions[l.type.toLowerCase()](l)
},exportDashboard:function(){}}
}])
});