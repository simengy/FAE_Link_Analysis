window.vs={};
window.vsApp={};
window.vividSENSE={};
window.vs.ext={};
window.vs.ext.maps={};
window.vs.ext.chart={};
window.vs.ext.table={};
window.vs.ext.widget={};
window.vs.ext.widget.table={};
window.vs.ext.widget.chart={};
window.vs.ext.widget.infographics={};
window.vs.ext.widget.map={};
window.vs.ext.widget.pivotTable={};
window.vs.ext.filter={};
window.vs.ext.event={};
window.vs.exportParam={dashboard:null,widget:null,exportType:null};
window.vsApp.Events={quedEvents:{},extend:function(a,b){this.quedEvents[a]=b
},process:function(c,b,f,e){var d=getAngularService("EventService");
if(!d){throw"Events not initialized"
}var a=c.action;
this.register(a,this.quedEvents[a]);
d.Events.process(c,d,f,e)
},register:function(a,c){var b=getAngularService("EventAction");
if(!b){throw"Events not initialized"
}if(typeof(this.quedEvents[a])==="function"){b.action.addNewAction(a,this.quedEvents[a]);
this.quedEvents[a]=null
}}};
function getAngularService(a){var c=document.querySelector("[data-ng-controller]")||document.querySelector("[ng-controller]");
var b=angular.element(c);
var d=b.injector();
return d?d.get(a):null
}function backtrace(c){var a=[];
if(typeof(c)==="object"&&c.length!==undefined){a=c
}var h=new Error("vivdisense_backtrace");
var k=h.stack;
var l=k.split("\n");
var b="";
for(var f=0;
f<l.length;
f++){var g=false;
for(var d=0;
d<a.length;
d++){if(l[f].indexOf(a[d])!==-1){g=true;
break
}}if(g===false){b+=l[f]+"\n"
}}console.log(b)
};