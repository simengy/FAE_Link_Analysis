(function(o,u,i){var r=u.$$minErr("$sanitize");
function j(){this.$get=["$$sanitizeUri",function(G){return function(I){var H=[];
m(I,z(H,function(J,K){return !/^unsafe/.test(G(J,K))
}));
return H.join("")
}
}]
}function e(H){var G=[];
var I=z(G,u.noop);
I.chars(H);
return G.join("")
}var g=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,c=/^<\s*\/\s*([\w:-]+)[^>]*>/,F=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,s=/^</,p=/^<\s*\//,y=/<!--(.*?)-->/g,D=/<!DOCTYPE([^>]*?)>/i,E=/<!\[CDATA\[(.*?)]]>/g,l=/([^\#-~| |!])/g;
var w=x("area,br,col,hr,img,wbr");
var n=x("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),b=x("rp,rt"),f=u.extend({},b,n);
var d=u.extend({},n,x("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"));
var v=u.extend({},b,x("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
var h=x("script,style");
var q=u.extend({},w,d,v,f);
var k=x("background,cite,href,longdesc,src,usemap");
var B=u.extend({},k,x("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"));
function x(J){var I={},G=J.split(","),H;
for(H=0;
H<G.length;
H++){I[G[H]]=true
}return I
}function m(H,P){var K,L,I,M=[],N=H;
M.last=function(){return M[M.length-1]
};
while(H){L=true;
if(!M.last()||!h[M.last()]){if(H.indexOf("<!--")===0){K=H.indexOf("--",4);
if(K>=0&&H.lastIndexOf("-->",K)===K){if(P.comment){P.comment(H.substring(4,K))
}H=H.substring(K+3);
L=false
}}else{if(D.test(H)){I=H.match(D);
if(I){H=H.replace(I[0],"");
L=false
}}else{if(p.test(H)){I=H.match(c);
if(I){H=H.substring(I[0].length);
I[0].replace(c,J);
L=false
}}else{if(s.test(H)){I=H.match(g);
if(I){H=H.substring(I[0].length);
I[0].replace(g,G);
L=false
}}}}}if(L){K=H.indexOf("<");
var O=K<0?H:H.substring(0,K);
H=K<0?"":H.substring(K);
if(P.chars){P.chars(a(O))
}}}else{H=H.replace(new RegExp("(.*)<\\s*\\/\\s*"+M.last()+"[^>]*>","i"),function(Q,R){R=R.replace(y,"$1").replace(E,"$1");
if(P.chars){P.chars(a(R))
}return""
});
J("",M.last())
}if(H==N){throw r("badparse","The sanitizer was unable to parse the following block of html: {0}",H)
}N=H
}J();
function G(Q,T,U,R){T=u.lowercase(T);
if(d[T]){while(M.last()&&v[M.last()]){J("",M.last())
}}if(f[T]&&M.last()==T){J("",T)
}R=w[T]||!!R;
if(!R){M.push(T)
}var S={};
U.replace(F,function(Y,X,W,aa,V){var Z=W||aa||V||"";
S[X]=a(Z)
});
if(P.start){P.start(T,S,R)
}}function J(Q,S){var T=0,R;
S=u.lowercase(S);
if(S){for(T=M.length-1;
T>=0;
T--){if(M[T]==S){break
}}}if(T>=0){for(R=M.length-1;
R>=T;
R--){if(P.end){P.end(M[R])
}}M.length=T
}}}var C=document.createElement("pre");
var t=/^(\s*)([\s\S]*?)(\s*)$/;
function a(J){if(!J){return""
}var K=t.exec(J);
var G=K[1];
var H=K[3];
var I=K[2];
if(I){C.innerHTML=I.replace(/</g,"&lt;");
I="textContent" in C?C.textContent:C.innerText
}return G+I+H
}function A(G){return G.replace(/&/g,"&amp;").replace(l,function(H){return"&#"+H.charCodeAt(0)+";"
}).replace(/</g,"&lt;").replace(/>/g,"&gt;")
}function z(H,I){var J=false;
var G=u.bind(H,H.push);
return{start:function(K,M,L){K=u.lowercase(K);
if(!J&&h[K]){J=K
}if(!J&&q[K]===true){G("<");
G(K);
u.forEach(M,function(O,N){var Q=u.lowercase(N);
var P=(K==="img"&&Q==="src")||(Q==="background");
if(B[Q]===true&&(k[Q]!==true||I(O,P))){G(" ");
G(N);
G('="');
G(A(O));
G('"')
}});
G(L?"/>":">")
}},end:function(K){K=u.lowercase(K);
if(!J&&q[K]===true){G("</");
G(K);
G(">")
}if(K==J){J=false
}},chars:function(K){if(!J){G(A(K))
}}}
}u.module("ngSanitize",[]).provider("$sanitize",j);
u.module("ngSanitize").filter("linky",["$sanitize",function(I){var G=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,H=/^mailto:/;
return function(R,N){if(!R){return R
}var M;
var P=R;
var L=[];
var J;
var K;
while((M=P.match(G))){J=M[0];
if(M[2]==M[3]){J="mailto:"+J
}K=M.index;
Q(P.substr(0,K));
O(J,M[0].replace(H,""));
P=P.substring(K+M[0].length)
}Q(P);
return I(L.join(""));
function Q(S){if(!S){return
}L.push(e(S))
}function O(S,T){L.push("<a ");
if(u.isDefined(N)){L.push('target="');
L.push(N);
L.push('" ')
}L.push('href="');
L.push(S);
L.push('">');
Q(T);
L.push("</a>")
}}
}])
})(window,window.angular);