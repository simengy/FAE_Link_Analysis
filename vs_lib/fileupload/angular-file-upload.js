(function(){var a=angular.module("angularFileUpload",[]);
a.service("$upload",["$http","$rootScope","$timeout",function(e,b,c){function d(f){f.method=f.method||"POST";
f.headers=f.headers||{};
f.transformRequest=f.transformRequest||function(h){if(window.ArrayBuffer&&h instanceof ArrayBuffer){return h
}return e.defaults.transformRequest[0](h)
};
if(window.XMLHttpRequest.__isShim){f.headers.__setXHR_=function(){return function(h){f.__XHR=h;
h.upload.addEventListener("progress",function(i){if(f.progress){c(function(){f.progress(i)
})
}},false);
h.upload.addEventListener("load",function(i){if(i.lengthComputable){c(function(){f.progress(i)
})
}},false)
}
}
}var g=e(f);
g.progress=function(h){f.progress=h;
return g
};
g.abort=function(){if(f.__XHR){c(function(){f.__XHR.abort()
})
}return g
};
g.then=(function(i,h){return function(j,l,k){f.progress=k||f.progress;
h.apply(i,[j,l,k]);
return i
}
})(g,g.then);
return g
}this.upload=function(g){g.headers=g.headers||{};
g.headers["Content-Type"]=undefined;
g.transformRequest=g.transformRequest||e.defaults.transformRequest;
var l=new FormData();
if(g.data){for(var j in g.data){var n=g.data[j];
if(!g.formDataAppender){if(typeof g.transformRequest=="function"){n=g.transformRequest(n)
}else{for(var h=0;
h<g.transformRequest.length;
h++){var k=g.transformRequest[h];
if(typeof k=="function"){n=k(n)
}}}l.append(j,n)
}else{g.formDataAppender(l,j,n)
}}}g.transformRequest=angular.identity;
var f=g.fileFormDataName||"file";
if(Object.prototype.toString.call(g.file)==="[object Array]"){var m=Object.prototype.toString.call(f)==="[object String]";
for(var h=0;
h<g.file.length;
h++){l.append(m?f+h:f[h],g.file[h],g.file[h].name)
}}else{if(g.file==undefined){l.append(f,null,null)
}else{l.append(f,g.file,g.file.name)
}}g.data=l;
return d(g)
};
this.http=function(f){return d(f)
}
}]);
a.directive("ngFileSelect",["$parse","$http","$timeout",function(c,d,b){return function(g,h,e){var f=c(e.ngFileSelect);
h.bind("change",function(j){var m=[],k,l;
k=j.target.files;
if(k!=null){for(l=0;
l<k.length;
l++){m.push(k.item(l))
}}b(function(){f(g,{$files:m,$event:j})
})
});
h.bind("click",function(){this.value=null
})
}
}]);
a.directive("ngFileDropAvailable",["$parse","$http","$timeout",function(c,d,b){return function(g,h,e){if("draggable" in document.createElement("span")){var f=c(e.ngFileDropAvailable);
b(function(){f(g)
})
}}
}]);
a.directive("ngFileDrop",["$parse","$http","$timeout",function(c,d,b){return function(g,h,e){if("draggable" in document.createElement("span")){var f=c(e.ngFileDrop);
h[0].addEventListener("dragover",function(i){i.stopPropagation();
i.preventDefault();
h.addClass(e.ngFileDragOverClass||"dragover")
},false);
h[0].addEventListener("dragleave",function(i){h.removeClass(e.ngFileDragOverClass||"dragover")
},false);
h[0].addEventListener("drop",function(j){j.stopPropagation();
j.preventDefault();
h.removeClass(e.ngFileDragOverClass||"dragover");
var m=[],k=j.dataTransfer.files,l;
if(k!=null){for(l=0;
l<k.length;
l++){m.push(k.item(l))
}}b(function(){f(g,{$files:m,$event:j})
})
},false)
}}
}])
})();