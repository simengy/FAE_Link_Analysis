(function(){if(window.XMLHttpRequest){if(window.FormData){window.XMLHttpRequest=(function(e){return function(){var h=new e();
h.setRequestHeader=(function(i){return function(l,j){if(l==="__setXHR_"){var k=j(h);
if(k instanceof Function){k(h)
}}else{i.apply(h,arguments)
}}
})(h.setRequestHeader);
return h
}
})(window.XMLHttpRequest)
}else{window.XMLHttpRequest=(function(e){return function(){var i=new e();
var h=i.send;
i.__requestHeaders=[];
i.open=(function(j){i.upload={addEventListener:function(l,m,k){if(l==="progress"){i.__progress=m
}if(l==="load"){i.__load=m
}}};
return function(l,n,k){j.apply(i,[l,n,k]);
i.__url=n
}
})(i.open);
i.getResponseHeader=(function(j){return function(k){return i.__fileApiXHR?i.__fileApiXHR.getResponseHeader(k):j.apply(i,[k])
}
})(i.getResponseHeader);
i.getAllResponseHeaders=(function(j){return function(){return i.__fileApiXHR?i.__fileApiXHR.getAllResponseHeaders():j.apply(i)
}
})(i.getAllResponseHeaders);
i.abort=(function(j){return function(){return i.__fileApiXHR?i.__fileApiXHR.abort():(j==null?null:j.apply(i))
}
})(i.abort);
i.setRequestHeader=(function(j){return function(m,k){if(m==="__setXHR_"){var l=k(i);
if(l instanceof Function){l(i)
}}else{j.apply(i,arguments)
}}
})(i.setRequestHeader);
i.send=function(){if(arguments[0]&&arguments[0].__isShim){var m=arguments[0];
var j={url:i.__url,complete:function(o,n){i.__load({type:"load",loaded:i.__total,total:i.__total,target:i,lengthComputable:true});
if(n.status!==undefined){Object.defineProperty(i,"status",{get:function(){return n.status
}})
}if(n.statusText!==undefined){Object.defineProperty(i,"statusText",{get:function(){return n.statusText
}})
}Object.defineProperty(i,"readyState",{get:function(){return 4
}});
if(n.response!==undefined){Object.defineProperty(i,"response",{get:function(){return n.response
}})
}Object.defineProperty(i,"responseText",{get:function(){return n.responseText
}});
i.__fileApiXHR=n;
i.onreadystatechange()
},progress:function(n){n.target=i;
i.__progress(n);
i.__total=n.total
},headers:i.__requestHeaders};
j.data={};
j.files={};
for(var k=0;
k<m.data.length;
k++){var l=m.data[k];
if(l.val!=null&&l.val.name!=null&&l.val.size!=null&&l.val.type!=null){j.files[l.key]=l.val
}else{j.data[l.key]=l.val
}}setTimeout(function(){i.__fileApiXHR=FileAPI.upload(j)
},1)
}else{h.apply(i,arguments)
}};
return i
}
})(window.XMLHttpRequest)
}window.XMLHttpRequest.__isShim=true
}if(!window.FormData){var a=false;
try{var b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
if(b){a=true
}}catch(f){if(navigator.mimeTypes["application/x-shockwave-flash"]!=undefined){a=true
}}var c=function(i){if(!i.__isWrapped&&(i.getAttribute("ng-file-select")!=null||i.getAttribute("data-ng-file-select")!=null)){var h=document.createElement("div");
h.innerHTML='<div class="js-fileapi-wrapper" style="position:relative; overflow:hidden"></div>';
h=h.firstChild;
var e=i.parentNode;
e.insertBefore(h,i);
e.removeChild(i);
h.appendChild(i);
if(!a){h.appendChild(document.createTextNode("Flash is required"))
}i.__isWrapped=true
}};
var g=function(e){return function(h){var i=FileAPI.getFiles(h);
if(!h.target){h.target={}
}h.target.files=i;
h.target.files.item=function(j){return h.target.files[j]||null
};
e(h)
}
};
var d=function(h,i){return(i.toLowerCase()==="change"||i.toLowerCase()==="onchange")&&h.getAttribute("type")=="file"
};
if(HTMLInputElement.prototype.addEventListener){HTMLInputElement.prototype.addEventListener=(function(e){return function(j,i,h,k){if(d(this,j)){c(this);
e.apply(this,[j,g(i),h,k])
}else{e.apply(this,[j,i,h,k])
}}
})(HTMLInputElement.prototype.addEventListener)
}if(HTMLInputElement.prototype.attachEvent){HTMLInputElement.prototype.attachEvent=(function(e){return function(i,h){if(d(this,i)){c(this);
e.apply(this,[i,g(h)])
}else{e.apply(this,[i,h])
}}
})(HTMLInputElement.prototype.attachEvent)
}window.FormData=FormData=function(){return{append:function(h,i,e){this.data.push({key:h,val:i,name:e})
},data:[],__isShim:true}
};
(function(){if(!window.FileAPI||!FileAPI.upload){var l="",e=document.createElement("script"),k=document.getElementsByTagName("script"),j,h,m;
if(window.FileAPI&&window.FileAPI.jsPath){l=window.FileAPI.jsPath
}else{for(j=0;
j<k.length;
j++){m=k[j].src;
h=m.indexOf("angular-file-upload-shim.js");
if(h==-1){h=m.indexOf("angular-file-upload-shim.min.js")
}if(h>-1){l=m.substring(0,h);
break
}}}if(!window.FileAPI||FileAPI.staticPath==null){FileAPI={staticPath:l}
}e.setAttribute("src",l+"FileAPI.min.js");
document.getElementsByTagName("head")[0].appendChild(e)
}})()
}})();