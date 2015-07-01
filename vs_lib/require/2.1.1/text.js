define(["module"],function(c){var l,g,e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],k=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,b=typeof location!=="undefined"&&location.href,d=b&&location.protocol&&location.protocol.replace(/\:/,""),f=b&&location.hostname,a=b&&(location.port||undefined),j=[],h=(c.config&&c.config())||{};
l={version:"2.0.3",strip:function(m){if(m){m=m.replace(k,"");
var n=m.match(i);
if(n){m=n[1]
}}else{m=""
}return m
},jsEscape:function(m){return m.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")
},createXhr:h.createXhr||function(){var p,m,n;
if(typeof XMLHttpRequest!=="undefined"){return new XMLHttpRequest()
}else{if(typeof ActiveXObject!=="undefined"){for(m=0;
m<3;
m+=1){n=e[m];
try{p=new ActiveXObject(n)
}catch(o){}if(p){e=[n];
break
}}}}return p
},parseName:function(n){var p=false,m=n.indexOf("."),q=n.substring(0,m),o=n.substring(m+1,n.length);
m=o.indexOf("!");
if(m!==-1){p=o.substring(m+1,o.length);
p=p==="strip";
o=o.substring(0,m)
}return{moduleName:q,ext:o,strip:p}
},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(p,t,n,m){var r,s,q,o=l.xdRegExp.exec(p);
if(!o){return true
}r=o[2];
s=o[3];
s=s.split(":");
q=s[1];
s=s[0];
return(!r||r===t)&&(!s||s.toLowerCase()===n.toLowerCase())&&((!q&&!s)||q===m)
},finishLoad:function(m,o,p,n){p=o?l.strip(p):p;
if(h.isBuild){j[m]=p
}n(p)
},load:function(q,s,r,p){if(p.isBuild&&!p.inlineText){r();
return
}h.isBuild=p.isBuild;
var n=l.parseName(q),t=n.moduleName+"."+n.ext,o=s.toUrl(t),m=(h.useXhr)||l.useXhr;
if(!b||m(o,d,f,a)){l.get(o,function(u){l.finishLoad(q,n.strip,u,r)
},function(u){if(r.error){r.error(u)
}})
}else{s([t],function(u){l.finishLoad(n.moduleName+"."+n.ext,n.strip,u,r)
})
}},write:function(q,n,o,m){if(j.hasOwnProperty(n)){var p=l.jsEscape(j[n]);
o.asModule(q+"!"+n,"define(function () { return '"+p+"';});\n")
}},writeFile:function(r,o,q,p,n){var m=l.parseName(o),s=m.moduleName+"."+m.ext,t=q.toUrl(m.moduleName+"."+m.ext)+".js";
l.load(s,q,function(u){var v=function(w){return p(t,w)
};
v.asModule=function(w,x){return p.asModule(w,t,x)
};
l.write(r,s,v,n)
},n)
}};
if(h.env==="node"||(!h.env&&typeof process!=="undefined"&&process.versions&&!!process.versions.node)){g=require.nodeRequire("fs");
l.get=function(m,o){var n=g.readFileSync(m,"utf8");
if(n.indexOf("\uFEFF")===0){n=n.substring(1)
}o(n)
}
}else{if(h.env==="xhr"||(!h.env&&l.createXhr())){l.get=function(n,p,m){var o=l.createXhr();
o.open("GET",n,true);
if(h.onXhr){h.onXhr(o,n)
}o.onreadystatechange=function(r){var q,s;
if(o.readyState===4){q=o.status;
if(q>399&&q<600){s=new Error(n+" HTTP status: "+q);
s.xhr=o;
m(s)
}else{p(o.responseText)
}}};
o.send(null)
}
}else{if(h.env==="rhino"||(!h.env&&typeof Packages!=="undefined"&&typeof java!=="undefined")){l.get=function(m,t){var o,u,n="utf-8",p=new java.io.File(m),q=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(p),n)),r="";
try{o=new java.lang.StringBuffer();
u=s.readLine();
if(u&&u.length()&&u.charAt(0)===65279){u=u.substring(1)
}o.append(u);
while((u=s.readLine())!==null){o.append(q);
o.append(u)
}r=String(o.toString())
}finally{s.close()
}t(r)
}
}}}return l
});