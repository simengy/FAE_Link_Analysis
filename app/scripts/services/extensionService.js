define(["app"],function(a){angular.module("vividSENSE.extensionService",[]).service("Extensions",[function(){var d=function(f,g){var e;
if(g.type){e=vs.ext.widget[g.type][f]
}else{e=vs.ext.widget[g.scope.design[0].info.type][f]
}if(typeof e==="function"){return e(g.scope,g.plugins)
}else{throw"6040"
}};
var c=function(f,g){var e=vs.ext.filter[f];
if(typeof e==="function"){return e(g.scope,g.elm,g.data)
}else{throw"6041"
}};
var b=function(f,g){var e=vs.ext.event[f];
if(typeof e==="function"){return e(scope,g)
}else{throw"6042"
}};
return{getWidget:d,getFilter:c,getEvent:b,setExtention:function(f,e){}}
}])
});