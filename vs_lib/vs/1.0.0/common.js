function addcslashes(m,s){var v="",k=[],r=0,p=0,t="",h="",f="",o="",q="",u=0,d=0,n=0,b=0,e=0,l=[],a="",g=/%([\dA-Fa-f]+)/g;
var w=function(j,i){if((j=j+"").length<i){return new Array(++i-j.length).join("0")+j
}return j
};
for(r=0;
r<s.length;
r++){t=s.charAt(r);
h=s.charAt(r+1);
if(t==="\\"&&h&&(/\d/).test(h)){f=s.slice(r+1).match(/^\d+/)[0];
n=f.length;
b=r+n+1;
if(s.charAt(b)+s.charAt(b+1)===".."){u=f.charCodeAt(0);
if((/\\\d/).test(s.charAt(b+2)+s.charAt(b+3))){o=s.slice(b+3).match(/^\d+/)[0];
r+=1
}else{if(s.charAt(b+2)){o=s.charAt(b+2)
}else{throw"Range with no end point"
}}d=o.charCodeAt(0);
if(d>u){for(p=u;
p<=d;
p++){k.push(String.fromCharCode(p))
}}else{k.push(".",f,o)
}r+=o.length+2
}else{q=String.fromCharCode(parseInt(f,8));
k.push(q)
}r+=n
}else{if(h+s.charAt(r+2)===".."){f=t;
u=f.charCodeAt(0);
if((/\\\d/).test(s.charAt(r+3)+s.charAt(r+4))){o=s.slice(r+4).match(/^\d+/)[0];
r+=1
}else{if(s.charAt(r+3)){o=s.charAt(r+3)
}else{throw"Range with no end point"
}}d=o.charCodeAt(0);
if(d>u){for(p=u;
p<=d;
p++){k.push(String.fromCharCode(p))
}}else{k.push(".",f,o)
}r+=o.length+2
}else{k.push(t)
}}}for(r=0;
r<m.length;
r++){t=m.charAt(r);
if(k.indexOf(t)!==-1){v+="\\";
e=t.charCodeAt(0);
if(e<32||e>126){switch(t){case"\n":v+="n";
break;
case"\t":v+="t";
break;
case"\u000D":v+="r";
break;
case"\u0007":v+="a";
break;
case"\v":v+="v";
break;
case"\b":v+="b";
break;
case"\f":v+="f";
break;
default:a=encodeURIComponent(t);
if((l=g.exec(a))!==null){v+=w(parseInt(l[1],16).toString(8),3)
}while((l=g.exec(a))!==null){v+="\\"+w(parseInt(l[1],16).toString(8),3)
}break
}}else{v+=t
}}else{v+=t
}}return v
}function parse_url(g,j){var h,k=["source","scheme","authority","userInfo","user","pass","host","port","relative","path","directory","file","query","fragment"],l=(this.php_js&&this.php_js.ini)||{},f=(l["phpjs.parse_url.mode"]&&l["phpjs.parse_url.mode"].local_value)||"php",b={php:/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};
var d=b[f].exec(g),c={},e=14;
while(e--){if(d[e]){c[k[e]]=d[e]
}}if(j){return c[j.replace("PHP_URL_","").toLowerCase()]
}if(f!=="php"){var a=(l["phpjs.parse_url.queryKey"]&&l["phpjs.parse_url.queryKey"].local_value)||"queryKey";
b=/(?:^|&)([^&=]*)=?([^&]*)/g;
c[a]={};
h=c[k[12]]||"";
h.replace(b,function(m,i,n){if(i){c[a][i]=n
}})
}delete c.source;
return c
}function http_build_query(b,g,a){var f,d,c=[];
var h=function(m,n,i){var j,l=[];
if(n===true){n="1"
}else{if(n===false){n="0"
}}if(n!=null){if(typeof n==="object"){for(j in n){if(n[j]!=null){l.push(h(m+"["+j+"]",n[j],i))
}}return l.join(i)
}else{if(typeof n!=="function"){return urlencode(m)+"="+urlencode(n)
}else{throw new Error("There was an error processing for http_build_query().")
}}}else{return""
}};
if(!a){a="&"
}for(d in b){f=b[d];
if(g&&!isNaN(d)){d=String(g)+d
}var e=h(d,f,a);
if(e!==""){c.push(e)
}}return c.join(a)
}function urlencode(a){a=(a+"").toString();
return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")
}function urldecode(a){return decodeURIComponent((a+"").replace(/\+/g,"%20"))
}function encodeParams(c){if(c===undefined){return c
}var b="";
for(var a in c){if(Array.isArray(c[a])){c[a].forEach(function(d){b=b+"&"+urlencode(a)+"="+urlencode(d)
})
}else{b=b+"&"+urlencode(a)+"="+urlencode(c[a])
}}return b.substring(1)
};