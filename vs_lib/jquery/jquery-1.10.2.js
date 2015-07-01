/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function(a1,aE){var ag,w,aA=typeof aE,aJ=a1.location,l=a1.document,bV=l.documentElement,bh=a1.jQuery,G=a1.$,Y={},a5=[],s="1.10.2",aG=a5.concat,am=a5.push,a3=a5.slice,aK=a5.indexOf,y=Y.toString,T=Y.hasOwnProperty,aO=s.trim,bI=function(e,b3){return new bI.fn.init(e,b3,w)
},bz=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=/\S+/g,B=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,bq=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,a=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,bg=/^[\],:{}\s]*$/,bj=/(?:^|:|,)(?:\s*\[)+/g,bF=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,aX=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,bR=/^-ms-/,aT=/-([\da-z])/gi,K=function(e,b3){return b3.toUpperCase()
},bW=function(e){if(l.addEventListener||e.type==="load"||l.readyState==="complete"){bk();
bI.ready()
}},bk=function(){if(l.addEventListener){l.removeEventListener("DOMContentLoaded",bW,false);
a1.removeEventListener("load",bW,false)
}else{l.detachEvent("onreadystatechange",bW);
a1.detachEvent("onload",bW)
}};
bI.fn=bI.prototype={jquery:s,constructor:bI,init:function(e,b5,b4){var b3,b6;
if(!e){return this
}if(typeof e==="string"){if(e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3){b3=[null,e,null]
}else{b3=bq.exec(e)
}if(b3&&(b3[1]||!b5)){if(b3[1]){b5=b5 instanceof bI?b5[0]:b5;
bI.merge(this,bI.parseHTML(b3[1],b5&&b5.nodeType?b5.ownerDocument||b5:l,true));
if(a.test(b3[1])&&bI.isPlainObject(b5)){for(b3 in b5){if(bI.isFunction(this[b3])){this[b3](b5[b3])
}else{this.attr(b3,b5[b3])
}}}return this
}else{b6=l.getElementById(b3[2]);
if(b6&&b6.parentNode){if(b6.id!==b3[2]){return b4.find(e)
}this.length=1;
this[0]=b6
}this.context=l;
this.selector=e;
return this
}}else{if(!b5||b5.jquery){return(b5||b4).find(e)
}else{return this.constructor(b5).find(e)
}}}else{if(e.nodeType){this.context=this[0]=e;
this.length=1;
return this
}else{if(bI.isFunction(e)){return b4.ready(e)
}}}if(e.selector!==aE){this.selector=e.selector;
this.context=e.context
}return bI.makeArray(e,this)
},selector:"",length:0,toArray:function(){return a3.call(this)
},get:function(e){return e==null?this.toArray():(e<0?this[this.length+e]:this[e])
},pushStack:function(e){var b3=bI.merge(this.constructor(),e);
b3.prevObject=this;
b3.context=this.context;
return b3
},each:function(b3,e){return bI.each(this,b3,e)
},ready:function(e){bI.ready.promise().done(e);
return this
},slice:function(){return this.pushStack(a3.apply(this,arguments))
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},eq:function(b4){var e=this.length,b3=+b4+(b4<0?e:0);
return this.pushStack(b3>=0&&b3<e?[this[b3]]:[])
},map:function(e){return this.pushStack(bI.map(this,function(b4,b3){return e.call(b4,b3,b4)
}))
},end:function(){return this.prevObject||this.constructor(null)
},push:am,sort:[].sort,splice:[].splice};
bI.fn.init.prototype=bI.fn;
bI.extend=bI.fn.extend=function(){var e,b8,b3,b4,cb,b9,b7=arguments[0]||{},b6=1,b5=arguments.length,ca=false;
if(typeof b7==="boolean"){ca=b7;
b7=arguments[1]||{};
b6=2
}if(typeof b7!=="object"&&!bI.isFunction(b7)){b7={}
}if(b5===b6){b7=this;
--b6
}for(;
b6<b5;
b6++){if((cb=arguments[b6])!=null){for(b4 in cb){e=b7[b4];
b3=cb[b4];
if(b7===b3){continue
}if(ca&&b3&&(bI.isPlainObject(b3)||(b8=bI.isArray(b3)))){if(b8){b8=false;
b9=e&&bI.isArray(e)?e:[]
}else{b9=e&&bI.isPlainObject(e)?e:{}
}b7[b4]=bI.extend(ca,b9,b3)
}else{if(b3!==aE){b7[b4]=b3
}}}}}return b7
};
bI.extend({expando:"jQuery"+(s+Math.random()).replace(/\D/g,""),noConflict:function(e){if(a1.$===bI){a1.$=G
}if(e&&a1.jQuery===bI){a1.jQuery=bh
}return bI
},isReady:false,readyWait:1,holdReady:function(e){if(e){bI.readyWait++
}else{bI.ready(true)
}},ready:function(e){if(e===true?--bI.readyWait:bI.isReady){return
}if(!l.body){return setTimeout(bI.ready)
}bI.isReady=true;
if(e!==true&&--bI.readyWait>0){return
}ag.resolveWith(l,[bI]);
if(bI.fn.trigger){bI(l).trigger("ready").off("ready")
}},isFunction:function(e){return bI.type(e)==="function"
},isArray:Array.isArray||function(e){return bI.type(e)==="array"
},isWindow:function(e){return e!=null&&e==e.window
},isNumeric:function(e){return !isNaN(parseFloat(e))&&isFinite(e)
},type:function(e){if(e==null){return String(e)
}return typeof e==="object"||typeof e==="function"?Y[y.call(e)]||"object":typeof e
},isPlainObject:function(b5){var b3;
if(!b5||bI.type(b5)!=="object"||b5.nodeType||bI.isWindow(b5)){return false
}try{if(b5.constructor&&!T.call(b5,"constructor")&&!T.call(b5.constructor.prototype,"isPrototypeOf")){return false
}}catch(b4){return false
}if(bI.support.ownLast){for(b3 in b5){return T.call(b5,b3)
}}for(b3 in b5){}return b3===aE||T.call(b5,b3)
},isEmptyObject:function(b3){var e;
for(e in b3){return false
}return true
},error:function(e){throw new Error(e)
},parseHTML:function(b6,b4,b5){if(!b6||typeof b6!=="string"){return null
}if(typeof b4==="boolean"){b5=b4;
b4=false
}b4=b4||l;
var b3=a.exec(b6),e=!b5&&[];
if(b3){return[b4.createElement(b3[1])]
}b3=bI.buildFragment([b6],b4,e);
if(e){bI(e).remove()
}return bI.merge([],b3.childNodes)
},parseJSON:function(e){if(a1.JSON&&a1.JSON.parse){return a1.JSON.parse(e)
}if(e===null){return e
}if(typeof e==="string"){e=bI.trim(e);
if(e){if(bg.test(e.replace(bF,"@").replace(aX,"]").replace(bj,""))){return(new Function("return "+e))()
}}}bI.error("Invalid JSON: "+e)
},parseXML:function(b5){var b3,b4;
if(!b5||typeof b5!=="string"){return null
}try{if(a1.DOMParser){b4=new DOMParser();
b3=b4.parseFromString(b5,"text/xml")
}else{b3=new ActiveXObject("Microsoft.XMLDOM");
b3.async="false";
b3.loadXML(b5)
}}catch(b6){b3=aE
}if(!b3||!b3.documentElement||b3.getElementsByTagName("parsererror").length){bI.error("Invalid XML: "+b5)
}return b3
},noop:function(){},globalEval:function(e){if(e&&bI.trim(e)){(a1.execScript||function(b3){a1["eval"].call(a1,b3)
})(e)
}},camelCase:function(e){return e.replace(bR,"ms-").replace(aT,K)
},nodeName:function(b3,e){return b3.nodeName&&b3.nodeName.toLowerCase()===e.toLowerCase()
},each:function(b7,b8,b3){var b6,b4=0,b5=b7.length,e=Z(b7);
if(b3){if(e){for(;
b4<b5;
b4++){b6=b8.apply(b7[b4],b3);
if(b6===false){break
}}}else{for(b4 in b7){b6=b8.apply(b7[b4],b3);
if(b6===false){break
}}}}else{if(e){for(;
b4<b5;
b4++){b6=b8.call(b7[b4],b4,b7[b4]);
if(b6===false){break
}}}else{for(b4 in b7){b6=b8.call(b7[b4],b4,b7[b4]);
if(b6===false){break
}}}}return b7
},trim:aO&&!aO.call("\uFEFF\xA0")?function(e){return e==null?"":aO.call(e)
}:function(e){return e==null?"":(e+"").replace(B,"")
},makeArray:function(e,b4){var b3=b4||[];
if(e!=null){if(Z(Object(e))){bI.merge(b3,typeof e==="string"?[e]:e)
}else{am.call(b3,e)
}}return b3
},inArray:function(b5,b3,b4){var e;
if(b3){if(aK){return aK.call(b3,b5,b4)
}e=b3.length;
b4=b4?b4<0?Math.max(0,e+b4):b4:0;
for(;
b4<e;
b4++){if(b4 in b3&&b3[b4]===b5){return b4
}}}return -1
},merge:function(b6,b4){var e=b4.length,b5=b6.length,b3=0;
if(typeof e==="number"){for(;
b3<e;
b3++){b6[b5++]=b4[b3]
}}else{while(b4[b3]!==aE){b6[b5++]=b4[b3++]
}}b6.length=b5;
return b6
},grep:function(b3,b8,e){var b7,b4=[],b5=0,b6=b3.length;
e=!!e;
for(;
b5<b6;
b5++){b7=!!b8(b3[b5],b5);
if(e!==b7){b4.push(b3[b5])
}}return b4
},map:function(b4,b9,e){var b8,b6=0,b7=b4.length,b3=Z(b4),b5=[];
if(b3){for(;
b6<b7;
b6++){b8=b9(b4[b6],b6,e);
if(b8!=null){b5[b5.length]=b8
}}}else{for(b6 in b4){b8=b9(b4[b6],b6,e);
if(b8!=null){b5[b5.length]=b8
}}}return aG.apply([],b5)
},guid:1,proxy:function(b6,b5){var e,b4,b3;
if(typeof b5==="string"){b3=b6[b5];
b5=b6;
b6=b3
}if(!bI.isFunction(b6)){return aE
}e=a3.call(arguments,2);
b4=function(){return b6.apply(b5||this,e.concat(a3.call(arguments)))
};
b4.guid=b6.guid=b6.guid||bI.guid++;
return b4
},access:function(e,b7,b9,b8,b5,cb,ca){var b4=0,b3=e.length,b6=b9==null;
if(bI.type(b9)==="object"){b5=true;
for(b4 in b9){bI.access(e,b7,b4,b9[b4],true,cb,ca)
}}else{if(b8!==aE){b5=true;
if(!bI.isFunction(b8)){ca=true
}if(b6){if(ca){b7.call(e,b8);
b7=null
}else{b6=b7;
b7=function(cd,cc,ce){return b6.call(bI(cd),ce)
}
}}if(b7){for(;
b4<b3;
b4++){b7(e[b4],b9,ca?b8:b8.call(e[b4],b4,b7(e[b4],b9)))
}}}}return b5?e:b6?b7.call(e):b3?b7(e[0],b9):cb
},now:function(){return(new Date()).getTime()
},swap:function(b7,b6,b8,b5){var b4,b3,e={};
for(b3 in b6){e[b3]=b7.style[b3];
b7.style[b3]=b6[b3]
}b4=b8.apply(b7,b5||[]);
for(b3 in b6){b7.style[b3]=e[b3]
}return b4
}});
bI.ready.promise=function(b6){if(!ag){ag=bI.Deferred();
if(l.readyState==="complete"){setTimeout(bI.ready)
}else{if(l.addEventListener){l.addEventListener("DOMContentLoaded",bW,false);
a1.addEventListener("load",bW,false)
}else{l.attachEvent("onreadystatechange",bW);
a1.attachEvent("onload",bW);
var b5=false;
try{b5=a1.frameElement==null&&l.documentElement
}catch(b4){}if(b5&&b5.doScroll){(function b3(){if(!bI.isReady){try{b5.doScroll("left")
}catch(b7){return setTimeout(b3,50)
}bk();
bI.ready()
}})()
}}}}return ag.promise(b6)
};
bI.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(b3,e){Y["[object "+e+"]"]=e.toLowerCase()
});
function Z(b4){var b3=b4.length,e=bI.type(b4);
if(bI.isWindow(b4)){return false
}if(b4.nodeType===1&&b3){return true
}return e==="array"||e!=="function"&&(b3===0||typeof b3==="number"&&b3>0&&(b3-1) in b4)
}w=bI(l);
/*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
(function(dc,ch){var cw,df,cc,cm,cF,cI,cT,dj,cG,cW,cA,cn,c5,c0,dd,cb,cD,c7="sizzle"+-(new Date()),cH=dc.document,dg=0,c1=0,b6=cy(),c6=cy(),cE=cy(),cU=false,cC=function(dk,e){if(dk===e){cU=true;
return 0
}return 0
},db=typeof ch,cO=1<<31,cM=({}).hasOwnProperty,c9=[],da=c9.pop,cK=c9.push,b4=c9.push,cl=c9.slice,ca=c9.indexOf||function(dl){var dk=0,e=this.length;
for(;
dk<e;
dk++){if(this[dk]===dl){return dk
}}return -1
},b5="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",co="[\\x20\\t\\r\\n\\f]",b3="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",cJ=b3.replace("w","w#"),c3="\\["+co+"*("+b3+")"+co+"*(?:([*^$|!~]?=)"+co+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+cJ+")|)|)"+co+"*\\]",cj=":("+b3+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+c3.replace(3,8)+")*)|.*)\\)|)",cq=new RegExp("^"+co+"+|((?:^|[^\\\\])(?:\\\\.)*)"+co+"+$","g"),ct=new RegExp("^"+co+"*,"+co+"*"),cz=new RegExp("^"+co+"*([>+~]|"+co+")"+co+"*"),cY=new RegExp(co+"*[+~]"),cs=new RegExp("="+co+"*([^\\]'\"]*)"+co+"*\\]","g"),cQ=new RegExp(cj),cR=new RegExp("^"+cJ+"$"),cZ={ID:new RegExp("^#("+b3+")"),CLASS:new RegExp("^\\.("+b3+")"),TAG:new RegExp("^("+b3.replace("w","w*")+")"),ATTR:new RegExp("^"+c3),PSEUDO:new RegExp("^"+cj),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+co+"*(even|odd|(([+-]|)(\\d*)n|)"+co+"*(?:([+-]|)"+co+"*(\\d+)|))"+co+"*\\)|)","i"),bool:new RegExp("^(?:"+b5+")$","i"),needsContext:new RegExp("^"+co+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+co+"*((?:-\\d)?\\d*)"+co+"*\\)|)(?=[^-]|$)","i")},cN=/^[^{]+\{\s*\[native \w/,cP=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,b9=/^(?:input|select|textarea|button)$/i,ck=/^h\d$/i,cL=/'|\\/g,cr=new RegExp("\\\\([\\da-f]{1,6}"+co+"?|("+co+")|.)","ig"),c2=function(e,dm,dk){var dl="0x"+dm-65536;
return dl!==dl||dk?dm:dl<0?String.fromCharCode(dl+65536):String.fromCharCode(dl>>10|55296,dl&1023|56320)
};
try{b4.apply((c9=cl.call(cH.childNodes)),cH.childNodes);
c9[cH.childNodes.length].nodeType
}catch(cB){b4={apply:c9.length?function(dk,e){cK.apply(dk,cl.call(e))
}:function(dm,dl){var e=dm.length,dk=0;
while((dm[e++]=dl[dk++])){}dm.length=e-1
}}
}function cu(ds,dk,dw,dy){var dx,dp,dq,du,dv,dn,dm,e,dl,dt;
if((dk?dk.ownerDocument||dk:cH)!==cA){cW(dk)
}dk=dk||cA;
dw=dw||[];
if(!ds||typeof ds!=="string"){return dw
}if((du=dk.nodeType)!==1&&du!==9){return[]
}if(c5&&!dy){if((dx=cP.exec(ds))){if((dq=dx[1])){if(du===9){dp=dk.getElementById(dq);
if(dp&&dp.parentNode){if(dp.id===dq){dw.push(dp);
return dw
}}else{return dw
}}else{if(dk.ownerDocument&&(dp=dk.ownerDocument.getElementById(dq))&&cD(dk,dp)&&dp.id===dq){dw.push(dp);
return dw
}}}else{if(dx[2]){b4.apply(dw,dk.getElementsByTagName(ds));
return dw
}else{if((dq=dx[3])&&df.getElementsByClassName&&dk.getElementsByClassName){b4.apply(dw,dk.getElementsByClassName(dq));
return dw
}}}}if(df.qsa&&(!c0||!c0.test(ds))){e=dm=c7;
dl=dk;
dt=du===9&&ds;
if(du===1&&dk.nodeName.toLowerCase()!=="object"){dn=cf(ds);
if((dm=dk.getAttribute("id"))){e=dm.replace(cL,"\\$&")
}else{dk.setAttribute("id",e)
}e="[id='"+e+"'] ";
dv=dn.length;
while(dv--){dn[dv]=e+cg(dn[dv])
}dl=cY.test(ds)&&dk.parentNode||dk;
dt=dn.join(",")
}if(dt){try{b4.apply(dw,dl.querySelectorAll(dt));
return dw
}catch(dr){}finally{if(!dm){dk.removeAttribute("id")
}}}}}return de(ds.replace(cq,"$1"),dk,dw,dy)
}function cy(){var dk=[];
function e(dl,dm){if(dk.push(dl+=" ")>cm.cacheLength){delete e[dk.shift()]
}return(e[dl]=dm)
}return e
}function ci(e){e[c7]=true;
return e
}function cd(dk){var dm=cA.createElement("div");
try{return !!dk(dm)
}catch(dl){return false
}finally{if(dm.parentNode){dm.parentNode.removeChild(dm)
}dm=null
}}function dh(dk,dm){var e=dk.split("|"),dl=dk.length;
while(dl--){cm.attrHandle[e[dl]]=dm
}}function b7(dk,e){var dm=e&&dk,dl=dm&&dk.nodeType===1&&e.nodeType===1&&(~e.sourceIndex||cO)-(~dk.sourceIndex||cO);
if(dl){return dl
}if(dm){while((dm=dm.nextSibling)){if(dm===e){return -1
}}}return dk?1:-1
}function cv(e){return function(dl){var dk=dl.nodeName.toLowerCase();
return dk==="input"&&dl.type===e
}
}function b8(e){return function(dl){var dk=dl.nodeName.toLowerCase();
return(dk==="input"||dk==="button")&&dl.type===e
}
}function c4(e){return ci(function(dk){dk=+dk;
return ci(function(dl,dq){var dn,dm=e([],dl.length,dk),dp=dm.length;
while(dp--){if(dl[(dn=dm[dp])]){dl[dn]=!(dq[dn]=dl[dn])
}}})
})
}cI=cu.isXML=function(e){var dk=e&&(e.ownerDocument||e).documentElement;
return dk?dk.nodeName!=="HTML":false
};
df=cu.support={};
cW=cu.setDocument=function(dk){var dl=dk?dk.ownerDocument||dk:cH,e=dl.defaultView;
if(dl===cA||dl.nodeType!==9||!dl.documentElement){return cA
}cA=dl;
cn=dl.documentElement;
c5=!cI(dl);
if(e&&e.attachEvent&&e!==e.top){e.attachEvent("onbeforeunload",function(){cW()
})
}df.attributes=cd(function(dm){dm.className="i";
return !dm.getAttribute("className")
});
df.getElementsByTagName=cd(function(dm){dm.appendChild(dl.createComment(""));
return !dm.getElementsByTagName("*").length
});
df.getElementsByClassName=cd(function(dm){dm.innerHTML="<div class='a'></div><div class='a i'></div>";
dm.firstChild.className="i";
return dm.getElementsByClassName("i").length===2
});
df.getById=cd(function(dm){cn.appendChild(dm).id=c7;
return !dl.getElementsByName||!dl.getElementsByName(c7).length
});
if(df.getById){cm.find.ID=function(dp,dn){if(typeof dn.getElementById!==db&&c5){var dm=dn.getElementById(dp);
return dm&&dm.parentNode?[dm]:[]
}};
cm.filter.ID=function(dn){var dm=dn.replace(cr,c2);
return function(dp){return dp.getAttribute("id")===dm
}
}
}else{delete cm.find.ID;
cm.filter.ID=function(dn){var dm=dn.replace(cr,c2);
return function(dq){var dp=typeof dq.getAttributeNode!==db&&dq.getAttributeNode("id");
return dp&&dp.value===dm
}
}
}cm.find.TAG=df.getElementsByTagName?function(dm,dn){if(typeof dn.getElementsByTagName!==db){return dn.getElementsByTagName(dm)
}}:function(dm,dr){var ds,dq=[],dp=0,dn=dr.getElementsByTagName(dm);
if(dm==="*"){while((ds=dn[dp++])){if(ds.nodeType===1){dq.push(ds)
}}return dq
}return dn
};
cm.find.CLASS=df.getElementsByClassName&&function(dn,dm){if(typeof dm.getElementsByClassName!==db&&c5){return dm.getElementsByClassName(dn)
}};
dd=[];
c0=[];
if((df.qsa=cN.test(dl.querySelectorAll))){cd(function(dm){dm.innerHTML="<select><option selected=''></option></select>";
if(!dm.querySelectorAll("[selected]").length){c0.push("\\["+co+"*(?:value|"+b5+")")
}if(!dm.querySelectorAll(":checked").length){c0.push(":checked")
}});
cd(function(dn){var dm=dl.createElement("input");
dm.setAttribute("type","hidden");
dn.appendChild(dm).setAttribute("t","");
if(dn.querySelectorAll("[t^='']").length){c0.push("[*^$]="+co+"*(?:''|\"\")")
}if(!dn.querySelectorAll(":enabled").length){c0.push(":enabled",":disabled")
}dn.querySelectorAll("*,:x");
c0.push(",.*:")
})
}if((df.matchesSelector=cN.test((cb=cn.webkitMatchesSelector||cn.mozMatchesSelector||cn.oMatchesSelector||cn.msMatchesSelector)))){cd(function(dm){df.disconnectedMatch=cb.call(dm,"div");
cb.call(dm,"[s!='']:x");
dd.push("!=",cj)
})
}c0=c0.length&&new RegExp(c0.join("|"));
dd=dd.length&&new RegExp(dd.join("|"));
cD=cN.test(cn.contains)||cn.compareDocumentPosition?function(dn,dm){var dq=dn.nodeType===9?dn.documentElement:dn,dp=dm&&dm.parentNode;
return dn===dp||!!(dp&&dp.nodeType===1&&(dq.contains?dq.contains(dp):dn.compareDocumentPosition&&dn.compareDocumentPosition(dp)&16))
}:function(dn,dm){if(dm){while((dm=dm.parentNode)){if(dm===dn){return true
}}}return false
};
cC=cn.compareDocumentPosition?function(dn,dm){if(dn===dm){cU=true;
return 0
}var dp=dm.compareDocumentPosition&&dn.compareDocumentPosition&&dn.compareDocumentPosition(dm);
if(dp){if(dp&1||(!df.sortDetached&&dm.compareDocumentPosition(dn)===dp)){if(dn===dl||cD(cH,dn)){return -1
}if(dm===dl||cD(cH,dm)){return 1
}return cG?(ca.call(cG,dn)-ca.call(cG,dm)):0
}return dp&4?-1:1
}return dn.compareDocumentPosition?-1:1
}:function(dn,dm){var du,dr=0,dt=dn.parentNode,dq=dm.parentNode,dp=[dn],ds=[dm];
if(dn===dm){cU=true;
return 0
}else{if(!dt||!dq){return dn===dl?-1:dm===dl?1:dt?-1:dq?1:cG?(ca.call(cG,dn)-ca.call(cG,dm)):0
}else{if(dt===dq){return b7(dn,dm)
}}}du=dn;
while((du=du.parentNode)){dp.unshift(du)
}du=dm;
while((du=du.parentNode)){ds.unshift(du)
}while(dp[dr]===ds[dr]){dr++
}return dr?b7(dp[dr],ds[dr]):dp[dr]===cH?-1:ds[dr]===cH?1:0
};
return dl
};
cu.matches=function(dk,e){return cu(dk,null,null,e)
};
cu.matchesSelector=function(dl,dn){if((dl.ownerDocument||dl)!==cA){cW(dl)
}dn=dn.replace(cs,"='$1']");
if(df.matchesSelector&&c5&&(!dd||!dd.test(dn))&&(!c0||!c0.test(dn))){try{var dk=cb.call(dl,dn);
if(dk||df.disconnectedMatch||dl.document&&dl.document.nodeType!==11){return dk
}}catch(dm){}}return cu(dn,cA,null,[dl]).length>0
};
cu.contains=function(e,dk){if((e.ownerDocument||e)!==cA){cW(e)
}return cD(e,dk)
};
cu.attr=function(dl,e){if((dl.ownerDocument||dl)!==cA){cW(dl)
}var dk=cm.attrHandle[e.toLowerCase()],dm=dk&&cM.call(cm.attrHandle,e.toLowerCase())?dk(dl,e,!c5):ch;
return dm===ch?df.attributes||!c5?dl.getAttribute(e):(dm=dl.getAttributeNode(e))&&dm.specified?dm.value:null:dm
};
cu.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)
};
cu.uniqueSort=function(dl){var dm,dn=[],e=0,dk=0;
cU=!df.detectDuplicates;
cG=!df.sortStable&&dl.slice(0);
dl.sort(cC);
if(cU){while((dm=dl[dk++])){if(dm===dl[dk]){e=dn.push(dk)
}}while(e--){dl.splice(dn[e],1)
}}return dl
};
cF=cu.getText=function(dn){var dm,dk="",dl=0,e=dn.nodeType;
if(!e){for(;
(dm=dn[dl]);
dl++){dk+=cF(dm)
}}else{if(e===1||e===9||e===11){if(typeof dn.textContent==="string"){return dn.textContent
}else{for(dn=dn.firstChild;
dn;
dn=dn.nextSibling){dk+=cF(dn)
}}}else{if(e===3||e===4){return dn.nodeValue
}}}return dk
};
cm=cu.selectors={cacheLength:50,createPseudo:ci,match:cZ,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){e[1]=e[1].replace(cr,c2);
e[3]=(e[4]||e[5]||"").replace(cr,c2);
if(e[2]==="~="){e[3]=" "+e[3]+" "
}return e.slice(0,4)
},CHILD:function(e){e[1]=e[1].toLowerCase();
if(e[1].slice(0,3)==="nth"){if(!e[3]){cu.error(e[0])
}e[4]=+(e[4]?e[5]+(e[6]||1):2*(e[3]==="even"||e[3]==="odd"));
e[5]=+((e[7]+e[8])||e[3]==="odd")
}else{if(e[3]){cu.error(e[0])
}}return e
},PSEUDO:function(dk){var e,dl=!dk[5]&&dk[2];
if(cZ.CHILD.test(dk[0])){return null
}if(dk[3]&&dk[4]!==ch){dk[2]=dk[4]
}else{if(dl&&cQ.test(dl)&&(e=cf(dl,true))&&(e=dl.indexOf(")",dl.length-e)-dl.length)){dk[0]=dk[0].slice(0,e);
dk[2]=dl.slice(0,e)
}}return dk.slice(0,3)
}},filter:{TAG:function(dk){var e=dk.replace(cr,c2).toLowerCase();
return dk==="*"?function(){return true
}:function(dl){return dl.nodeName&&dl.nodeName.toLowerCase()===e
}
},CLASS:function(e){var dk=b6[e+" "];
return dk||(dk=new RegExp("(^|"+co+")"+e+"("+co+"|$)"))&&b6(e,function(dl){return dk.test(typeof dl.className==="string"&&dl.className||typeof dl.getAttribute!==db&&dl.getAttribute("class")||"")
})
},ATTR:function(dl,dk,e){return function(dn){var dm=cu.attr(dn,dl);
if(dm==null){return dk==="!="
}if(!dk){return true
}dm+="";
return dk==="="?dm===e:dk==="!="?dm!==e:dk==="^="?e&&dm.indexOf(e)===0:dk==="*="?e&&dm.indexOf(e)>-1:dk==="$="?e&&dm.slice(-e.length)===e:dk==="~="?(" "+dm+" ").indexOf(e)>-1:dk==="|="?dm===e||dm.slice(0,e.length+1)===e+"-":false
}
},CHILD:function(dk,dn,dm,dp,dl){var dr=dk.slice(0,3)!=="nth",e=dk.slice(-4)!=="last",dq=dn==="of-type";
return dp===1&&dl===0?function(ds){return !!ds.parentNode
}:function(dy,dw,dB){var ds,dE,dz,dD,dA,dv,dx=dr!==e?"nextSibling":"previousSibling",dC=dy.parentNode,du=dq&&dy.nodeName.toLowerCase(),dt=!dB&&!dq;
if(dC){if(dr){while(dx){dz=dy;
while((dz=dz[dx])){if(dq?dz.nodeName.toLowerCase()===du:dz.nodeType===1){return false
}}dv=dx=dk==="only"&&!dv&&"nextSibling"
}return true
}dv=[e?dC.firstChild:dC.lastChild];
if(e&&dt){dE=dC[c7]||(dC[c7]={});
ds=dE[dk]||[];
dA=ds[0]===dg&&ds[1];
dD=ds[0]===dg&&ds[2];
dz=dA&&dC.childNodes[dA];
while((dz=++dA&&dz&&dz[dx]||(dD=dA=0)||dv.pop())){if(dz.nodeType===1&&++dD&&dz===dy){dE[dk]=[dg,dA,dD];
break
}}}else{if(dt&&(ds=(dy[c7]||(dy[c7]={}))[dk])&&ds[0]===dg){dD=ds[1]
}else{while((dz=++dA&&dz&&dz[dx]||(dD=dA=0)||dv.pop())){if((dq?dz.nodeName.toLowerCase()===du:dz.nodeType===1)&&++dD){if(dt){(dz[c7]||(dz[c7]={}))[dk]=[dg,dD]
}if(dz===dy){break
}}}}}dD-=dl;
return dD===dp||(dD%dp===0&&dD/dp>=0)
}}
},PSEUDO:function(dm,dl){var e,dk=cm.pseudos[dm]||cm.setFilters[dm.toLowerCase()]||cu.error("unsupported pseudo: "+dm);
if(dk[c7]){return dk(dl)
}if(dk.length>1){e=[dm,dm,"",dl];
return cm.setFilters.hasOwnProperty(dm.toLowerCase())?ci(function(dq,ds){var dp,dn=dk(dq,dl),dr=dn.length;
while(dr--){dp=ca.call(dq,dn[dr]);
dq[dp]=!(ds[dp]=dn[dr])
}}):function(dn){return dk(dn,0,e)
}
}return dk
}},pseudos:{not:ci(function(e){var dk=[],dl=[],dm=cT(e.replace(cq,"$1"));
return dm[c7]?ci(function(dp,du,ds,dq){var dt,dn=dm(dp,null,dq,[]),dr=dp.length;
while(dr--){if((dt=dn[dr])){dp[dr]=!(du[dr]=dt)
}}}):function(dq,dp,dn){dk[0]=dq;
dm(dk,null,dn,dl);
return !dl.pop()
}
}),has:ci(function(e){return function(dk){return cu(e,dk).length>0
}
}),contains:ci(function(e){return function(dk){return(dk.textContent||dk.innerText||cF(dk)).indexOf(e)>-1
}
}),lang:ci(function(e){if(!cR.test(e||"")){cu.error("unsupported lang: "+e)
}e=e.replace(cr,c2).toLowerCase();
return function(dl){var dk;
do{if((dk=c5?dl.lang:dl.getAttribute("xml:lang")||dl.getAttribute("lang"))){dk=dk.toLowerCase();
return dk===e||dk.indexOf(e+"-")===0
}}while((dl=dl.parentNode)&&dl.nodeType===1);
return false
}
}),target:function(e){var dk=dc.location&&dc.location.hash;
return dk&&dk.slice(1)===e.id
},root:function(e){return e===cn
},focus:function(e){return e===cA.activeElement&&(!cA.hasFocus||cA.hasFocus())&&!!(e.type||e.href||~e.tabIndex)
},enabled:function(e){return e.disabled===false
},disabled:function(e){return e.disabled===true
},checked:function(e){var dk=e.nodeName.toLowerCase();
return(dk==="input"&&!!e.checked)||(dk==="option"&&!!e.selected)
},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex
}return e.selected===true
},empty:function(e){for(e=e.firstChild;
e;
e=e.nextSibling){if(e.nodeName>"@"||e.nodeType===3||e.nodeType===4){return false
}}return true
},parent:function(e){return !cm.pseudos.empty(e)
},header:function(e){return ck.test(e.nodeName)
},input:function(e){return b9.test(e.nodeName)
},button:function(dk){var e=dk.nodeName.toLowerCase();
return e==="input"&&dk.type==="button"||e==="button"
},text:function(dk){var e;
return dk.nodeName.toLowerCase()==="input"&&dk.type==="text"&&((e=dk.getAttribute("type"))==null||e.toLowerCase()===dk.type)
},first:c4(function(){return[0]
}),last:c4(function(e,dk){return[dk-1]
}),eq:c4(function(e,dl,dk){return[dk<0?dk+dl:dk]
}),even:c4(function(e,dl){var dk=0;
for(;
dk<dl;
dk+=2){e.push(dk)
}return e
}),odd:c4(function(e,dl){var dk=1;
for(;
dk<dl;
dk+=2){e.push(dk)
}return e
}),lt:c4(function(e,dm,dl){var dk=dl<0?dl+dm:dl;
for(;
--dk>=0;
){e.push(dk)
}return e
}),gt:c4(function(e,dm,dl){var dk=dl<0?dl+dm:dl;
for(;
++dk<dm;
){e.push(dk)
}return e
})}};
cm.pseudos.nth=cm.pseudos.eq;
for(cw in {radio:true,checkbox:true,file:true,password:true,image:true}){cm.pseudos[cw]=cv(cw)
}for(cw in {submit:true,reset:true}){cm.pseudos[cw]=b8(cw)
}function cS(){}cS.prototype=cm.filters=cm.pseudos;
cm.setFilters=new cS();
function cf(dn,dt){var dk,dp,dr,ds,dq,dl,e,dm=c6[dn+" "];
if(dm){return dt?0:dm.slice(0)
}dq=dn;
dl=[];
e=cm.preFilter;
while(dq){if(!dk||(dp=ct.exec(dq))){if(dp){dq=dq.slice(dp[0].length)||dq
}dl.push(dr=[])
}dk=false;
if((dp=cz.exec(dq))){dk=dp.shift();
dr.push({value:dk,type:dp[0].replace(cq," ")});
dq=dq.slice(dk.length)
}for(ds in cm.filter){if((dp=cZ[ds].exec(dq))&&(!e[ds]||(dp=e[ds](dp)))){dk=dp.shift();
dr.push({value:dk,type:ds,matches:dp});
dq=dq.slice(dk.length)
}}if(!dk){break
}}return dt?dq.length:dq?cu.error(dn):c6(dn,dl).slice(0)
}function cg(dm){var dl=0,dk=dm.length,e="";
for(;
dl<dk;
dl++){e+=dm[dl].value
}return e
}function cp(dn,dl,dm){var e=dl.dir,dp=dm&&e==="parentNode",dk=c1++;
return dl.first?function(ds,dr,dq){while((ds=ds[e])){if(ds.nodeType===1||dp){return dn(ds,dr,dq)
}}}:function(du,ds,dr){var dw,dq,dt,dv=dg+" "+dk;
if(dr){while((du=du[e])){if(du.nodeType===1||dp){if(dn(du,ds,dr)){return true
}}}}else{while((du=du[e])){if(du.nodeType===1||dp){dt=du[c7]||(du[c7]={});
if((dq=dt[e])&&dq[0]===dv){if((dw=dq[1])===true||dw===cc){return dw===true
}}else{dq=dt[e]=[dv];
dq[1]=dn(du,ds,dr)||cc;
if(dq[1]===true){return true
}}}}}}
}function di(e){return e.length>1?function(dn,dm,dk){var dl=e.length;
while(dl--){if(!e[dl](dn,dm,dk)){return false
}}return true
}:e[0]
}function cX(e,dk,dl,dm,dq){var dn,dt=[],dp=0,dr=e.length,ds=dk!=null;
for(;
dp<dr;
dp++){if((dn=e[dp])){if(!dl||dl(dn,dm,dq)){dt.push(dn);
if(ds){dk.push(dp)
}}}}return dt
}function ce(dl,dk,dn,dm,dp,e){if(dm&&!dm[c7]){dm=ce(dm)
}if(dp&&!dp[c7]){dp=ce(dp,e)
}return ci(function(dA,dx,ds,dz){var dC,dy,du,dt=[],dB=[],dr=dx.length,dq=dA||cx(dk||"*",ds.nodeType?[ds]:ds,[]),dv=dl&&(dA||!dk)?cX(dq,dt,dl,ds,dz):dq,dw=dn?dp||(dA?dl:dr||dm)?[]:dx:dv;
if(dn){dn(dv,dw,ds,dz)
}if(dm){dC=cX(dw,dB);
dm(dC,[],ds,dz);
dy=dC.length;
while(dy--){if((du=dC[dy])){dw[dB[dy]]=!(dv[dB[dy]]=du)
}}}if(dA){if(dp||dl){if(dp){dC=[];
dy=dw.length;
while(dy--){if((du=dw[dy])){dC.push((dv[dy]=du))
}}dp(null,(dw=[]),dC,dz)
}dy=dw.length;
while(dy--){if((du=dw[dy])&&(dC=dp?ca.call(dA,du):dt[dy])>-1){dA[dC]=!(dx[dC]=du)
}}}}else{dw=cX(dw===dx?dw.splice(dr,dw.length):dw);
if(dp){dp(null,dx,dw,dz)
}else{b4.apply(dx,dw)
}}})
}function c8(dq){var dk,dn,dl,dp=dq.length,dt=cm.relative[dq[0].type],du=dt||cm.relative[" "],dm=dt?1:0,dr=cp(function(dv){return dv===dk
},du,true),ds=cp(function(dv){return ca.call(dk,dv)>-1
},du,true),e=[function(dx,dw,dv){return(!dt&&(dv||dw!==dj))||((dk=dw).nodeType?dr(dx,dw,dv):ds(dx,dw,dv))
}];
for(;
dm<dp;
dm++){if((dn=cm.relative[dq[dm].type])){e=[cp(di(e),dn)]
}else{dn=cm.filter[dq[dm].type].apply(null,dq[dm].matches);
if(dn[c7]){dl=++dm;
for(;
dl<dp;
dl++){if(cm.relative[dq[dl].type]){break
}}return ce(dm>1&&di(e),dm>1&&cg(dq.slice(0,dm-1).concat({value:dq[dm-2].type===" "?"*":""})).replace(cq,"$1"),dn,dm<dl&&c8(dq.slice(dm,dl)),dl<dp&&c8((dq=dq.slice(dl))),dl<dp&&cg(dq))
}e.push(dn)
}}return di(e)
}function cV(dm,dl){var dp=0,e=dl.length>0,dn=dm.length>0,dk=function(dz,dt,dy,dx,dF){var du,dv,dA,dE=[],dD=0,dw="0",dq=dz&&[],dB=dF!=null,dC=dj,ds=dz||dn&&cm.find.TAG("*",dF&&dt.parentNode||dt),dr=(dg+=dC==null?1:Math.random()||0.1);
if(dB){dj=dt!==cA&&dt;
cc=dp
}for(;
(du=ds[dw])!=null;
dw++){if(dn&&du){dv=0;
while((dA=dm[dv++])){if(dA(du,dt,dy)){dx.push(du);
break
}}if(dB){dg=dr;
cc=++dp
}}if(e){if((du=!dA&&du)){dD--
}if(dz){dq.push(du)
}}}dD+=dw;
if(e&&dw!==dD){dv=0;
while((dA=dl[dv++])){dA(dq,dE,dt,dy)
}if(dz){if(dD>0){while(dw--){if(!(dq[dw]||dE[dw])){dE[dw]=da.call(dx)
}}}dE=cX(dE)
}b4.apply(dx,dE);
if(dB&&!dz&&dE.length>0&&(dD+dl.length)>1){cu.uniqueSort(dx)
}}if(dB){dg=dr;
dj=dC
}return dq
};
return e?ci(dk):dk
}cT=cu.compile=function(e,dp){var dl,dk=[],dn=[],dm=cE[e+" "];
if(!dm){if(!dp){dp=cf(e)
}dl=dp.length;
while(dl--){dm=c8(dp[dl]);
if(dm[c7]){dk.push(dm)
}else{dn.push(dm)
}}dm=cE(e,cV(dn,dk))
}return dm
};
function cx(dk,dn,dm){var dl=0,e=dn.length;
for(;
dl<e;
dl++){cu(dk,dn[dl],dm)
}return dm
}function de(dl,e,dm,dq){var dn,ds,dk,dt,dr,dp=cf(dl);
if(!dq){if(dp.length===1){ds=dp[0]=dp[0].slice(0);
if(ds.length>2&&(dk=ds[0]).type==="ID"&&df.getById&&e.nodeType===9&&c5&&cm.relative[ds[1].type]){e=(cm.find.ID(dk.matches[0].replace(cr,c2),e)||[])[0];
if(!e){return dm
}dl=dl.slice(ds.shift().value.length)
}dn=cZ.needsContext.test(dl)?0:ds.length;
while(dn--){dk=ds[dn];
if(cm.relative[(dt=dk.type)]){break
}if((dr=cm.find[dt])){if((dq=dr(dk.matches[0].replace(cr,c2),cY.test(ds[0].type)&&e.parentNode||e))){ds.splice(dn,1);
dl=dq.length&&cg(ds);
if(!dl){b4.apply(dm,dq);
return dm
}break
}}}}}cT(dl,dp)(dq,e,!c5,dm,cY.test(dl));
return dm
}df.sortStable=c7.split("").sort(cC).join("")===c7;
df.detectDuplicates=cU;
cW();
df.sortDetached=cd(function(e){return e.compareDocumentPosition(cA.createElement("div"))&1
});
if(!cd(function(e){e.innerHTML="<a href='#'></a>";
return e.firstChild.getAttribute("href")==="#"
})){dh("type|href|height|width",function(dk,e,dl){if(!dl){return dk.getAttribute(e,e.toLowerCase()==="type"?1:2)
}})
}if(!df.attributes||!cd(function(e){e.innerHTML="<input/>";
e.firstChild.setAttribute("value","");
return e.firstChild.getAttribute("value")===""
})){dh("value",function(dk,e,dl){if(!dl&&dk.nodeName.toLowerCase()==="input"){return dk.defaultValue
}})
}if(!cd(function(e){return e.getAttribute("disabled")==null
})){dh(b5,function(dk,e,dm){var dl;
if(!dm){return(dl=dk.getAttributeNode(e))&&dl.specified?dl.value:dk[e]===true?e.toLowerCase():null
}})
}bI.find=cu;
bI.expr=cu.selectors;
bI.expr[":"]=bI.expr.pseudos;
bI.unique=cu.uniqueSort;
bI.text=cu.getText;
bI.isXMLDoc=cu.isXML;
bI.contains=cu.contains
})(a1);
var bY={};
function ac(b3){var e=bY[b3]={};
bI.each(b3.match(aa)||[],function(b5,b4){e[b4]=true
});
return e
}bI.Callbacks=function(cc){cc=typeof cc==="string"?(bY[cc]||ac(cc)):bI.extend({},cc);
var b6,b5,e,b7,b8,b4,b9=[],ca=!cc.once&&[],b3=function(cd){b5=cc.memory&&cd;
e=true;
b8=b4||0;
b4=0;
b7=b9.length;
b6=true;
for(;
b9&&b8<b7;
b8++){if(b9[b8].apply(cd[0],cd[1])===false&&cc.stopOnFalse){b5=false;
break
}}b6=false;
if(b9){if(ca){if(ca.length){b3(ca.shift())
}}else{if(b5){b9=[]
}else{cb.disable()
}}}},cb={add:function(){if(b9){var ce=b9.length;
(function cd(cf){bI.each(cf,function(ch,cg){var ci=bI.type(cg);
if(ci==="function"){if(!cc.unique||!cb.has(cg)){b9.push(cg)
}}else{if(cg&&cg.length&&ci!=="string"){cd(cg)
}}})
})(arguments);
if(b6){b7=b9.length
}else{if(b5){b4=ce;
b3(b5)
}}}return this
},remove:function(){if(b9){bI.each(arguments,function(cf,cd){var ce;
while((ce=bI.inArray(cd,b9,ce))>-1){b9.splice(ce,1);
if(b6){if(ce<=b7){b7--
}if(ce<=b8){b8--
}}}})
}return this
},has:function(cd){return cd?bI.inArray(cd,b9)>-1:!!(b9&&b9.length)
},empty:function(){b9=[];
b7=0;
return this
},disable:function(){b9=ca=b5=aE;
return this
},disabled:function(){return !b9
},lock:function(){ca=aE;
if(!b5){cb.disable()
}return this
},locked:function(){return !ca
},fireWith:function(ce,cd){if(b9&&(!e||ca)){cd=cd||[];
cd=[ce,cd.slice?cd.slice():cd];
if(b6){ca.push(cd)
}else{b3(cd)
}}return this
},fire:function(){cb.fireWith(this,arguments);
return this
},fired:function(){return !!e
}};
return cb
};
bI.extend({Deferred:function(b4){var b3=[["resolve","done",bI.Callbacks("once memory"),"resolved"],["reject","fail",bI.Callbacks("once memory"),"rejected"],["notify","progress",bI.Callbacks("memory")]],b5="pending",b6={state:function(){return b5
},always:function(){e.done(arguments).fail(arguments);
return this
},then:function(){var b7=arguments;
return bI.Deferred(function(b8){bI.each(b3,function(ca,b9){var cc=b9[0],cb=bI.isFunction(b7[ca])&&b7[ca];
e[b9[1]](function(){var cd=cb&&cb.apply(this,arguments);
if(cd&&bI.isFunction(cd.promise)){cd.promise().done(b8.resolve).fail(b8.reject).progress(b8.notify)
}else{b8[cc+"With"](this===b6?b8.promise():this,cb?[cd]:arguments)
}})
});
b7=null
}).promise()
},promise:function(b7){return b7!=null?bI.extend(b7,b6):b6
}},e={};
b6.pipe=b6.then;
bI.each(b3,function(b8,b7){var ca=b7[2],b9=b7[3];
b6[b7[1]]=ca.add;
if(b9){ca.add(function(){b5=b9
},b3[b8^1][2].disable,b3[2][2].lock)
}e[b7[0]]=function(){e[b7[0]+"With"](this===e?b6:this,arguments);
return this
};
e[b7[0]+"With"]=ca.fireWith
});
b6.promise(e);
if(b4){b4.call(e,e)
}return e
},when:function(b6){var b4=0,b8=a3.call(arguments),e=b8.length,b3=e!==1||(b6&&bI.isFunction(b6.promise))?e:0,cb=b3===1?b6:bI.Deferred(),b5=function(cd,ce,cc){return function(cf){ce[cd]=this;
cc[cd]=arguments.length>1?a3.call(arguments):cf;
if(cc===ca){cb.notifyWith(ce,cc)
}else{if(!(--b3)){cb.resolveWith(ce,cc)
}}}
},ca,b7,b9;
if(e>1){ca=new Array(e);
b7=new Array(e);
b9=new Array(e);
for(;
b4<e;
b4++){if(b8[b4]&&bI.isFunction(b8[b4].promise)){b8[b4].promise().done(b5(b4,b9,b8)).fail(cb.reject).progress(b5(b4,b7,ca))
}else{--b3
}}}if(!b3){cb.resolveWith(b9,b8)
}return cb.promise()
}});
bI.support=(function(ce){var cd,cb,ca,cc,b9,b5,b7,b4,b6,b3=l.createElement("div");
b3.setAttribute("className","t");
b3.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
cd=b3.getElementsByTagName("*")||[];
cb=b3.getElementsByTagName("a")[0];
if(!cb||!cb.style||!cd.length){return ce
}cc=l.createElement("select");
b5=cc.appendChild(l.createElement("option"));
ca=b3.getElementsByTagName("input")[0];
cb.style.cssText="top:1px;float:left;opacity:.5";
ce.getSetAttribute=b3.className!=="t";
ce.leadingWhitespace=b3.firstChild.nodeType===3;
ce.tbody=!b3.getElementsByTagName("tbody").length;
ce.htmlSerialize=!!b3.getElementsByTagName("link").length;
ce.style=/top/.test(cb.getAttribute("style"));
ce.hrefNormalized=cb.getAttribute("href")==="/a";
ce.opacity=/^0.5/.test(cb.style.opacity);
ce.cssFloat=!!cb.style.cssFloat;
ce.checkOn=!!ca.value;
ce.optSelected=b5.selected;
ce.enctype=!!l.createElement("form").enctype;
ce.html5Clone=l.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>";
ce.inlineBlockNeedsLayout=false;
ce.shrinkWrapBlocks=false;
ce.pixelPosition=false;
ce.deleteExpando=true;
ce.noCloneEvent=true;
ce.reliableMarginRight=true;
ce.boxSizingReliable=true;
ca.checked=true;
ce.noCloneChecked=ca.cloneNode(true).checked;
cc.disabled=true;
ce.optDisabled=!b5.disabled;
try{delete b3.test
}catch(b8){ce.deleteExpando=false
}ca=l.createElement("input");
ca.setAttribute("value","");
ce.input=ca.getAttribute("value")==="";
ca.value="t";
ca.setAttribute("type","radio");
ce.radioValue=ca.value==="t";
ca.setAttribute("checked","t");
ca.setAttribute("name","t");
b9=l.createDocumentFragment();
b9.appendChild(ca);
ce.appendChecked=ca.checked;
ce.checkClone=b9.cloneNode(true).cloneNode(true).lastChild.checked;
if(b3.attachEvent){b3.attachEvent("onclick",function(){ce.noCloneEvent=false
});
b3.cloneNode(true).click()
}for(b6 in {submit:true,change:true,focusin:true}){b3.setAttribute(b7="on"+b6,"t");
ce[b6+"Bubbles"]=b7 in a1||b3.attributes[b7].expando===false
}b3.style.backgroundClip="content-box";
b3.cloneNode(true).style.backgroundClip="";
ce.clearCloneStyle=b3.style.backgroundClip==="content-box";
for(b6 in bI(ce)){break
}ce.ownLast=b6!=="0";
bI(function(){var cf,ci,ch,cg="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",e=l.getElementsByTagName("body")[0];
if(!e){return
}cf=l.createElement("div");
cf.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
e.appendChild(cf).appendChild(b3);
b3.innerHTML="<table><tr><td></td><td>t</td></tr></table>";
ch=b3.getElementsByTagName("td");
ch[0].style.cssText="padding:0;margin:0;border:0;display:none";
b4=(ch[0].offsetHeight===0);
ch[0].style.display="";
ch[1].style.display="none";
ce.reliableHiddenOffsets=b4&&(ch[0].offsetHeight===0);
b3.innerHTML="";
b3.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
bI.swap(e,e.style.zoom!=null?{zoom:1}:{},function(){ce.boxSizing=b3.offsetWidth===4
});
if(a1.getComputedStyle){ce.pixelPosition=(a1.getComputedStyle(b3,null)||{}).top!=="1%";
ce.boxSizingReliable=(a1.getComputedStyle(b3,null)||{width:"4px"}).width==="4px";
ci=b3.appendChild(l.createElement("div"));
ci.style.cssText=b3.style.cssText=cg;
ci.style.marginRight=ci.style.width="0";
b3.style.width="1px";
ce.reliableMarginRight=!parseFloat((a1.getComputedStyle(ci,null)||{}).marginRight)
}if(typeof b3.style.zoom!==aA){b3.innerHTML="";
b3.style.cssText=cg+"width:1px;padding:1px;display:inline;zoom:1";
ce.inlineBlockNeedsLayout=(b3.offsetWidth===3);
b3.style.display="block";
b3.innerHTML="<div></div>";
b3.firstChild.style.width="5px";
ce.shrinkWrapBlocks=(b3.offsetWidth!==3);
if(ce.inlineBlockNeedsLayout){e.style.zoom=1
}}e.removeChild(cf);
cf=b3=ch=ci=null
});
cd=cc=b9=b5=cb=ca=null;
return ce
})({});
var bv=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,aL=/([A-Z])/g;
function a9(b5,b3,b7,b6){if(!bI.acceptData(b5)){return
}var b9,b8,ca=bI.expando,cb=b5.nodeType,e=cb?bI.cache:b5,b4=cb?b5[ca]:b5[ca]&&ca;
if((!b4||!e[b4]||(!b6&&!e[b4].data))&&b7===aE&&typeof b3==="string"){return
}if(!b4){if(cb){b4=b5[ca]=a5.pop()||bI.guid++
}else{b4=ca
}}if(!e[b4]){e[b4]=cb?{}:{toJSON:bI.noop}
}if(typeof b3==="object"||typeof b3==="function"){if(b6){e[b4]=bI.extend(e[b4],b3)
}else{e[b4].data=bI.extend(e[b4].data,b3)
}}b8=e[b4];
if(!b6){if(!b8.data){b8.data={}
}b8=b8.data
}if(b7!==aE){b8[bI.camelCase(b3)]=b7
}if(typeof b3==="string"){b9=b8[b3];
if(b9==null){b9=b8[bI.camelCase(b3)]
}}else{b9=b8
}return b9
}function X(b6,b4,e){if(!bI.acceptData(b6)){return
}var b8,b5,b7=b6.nodeType,b3=b7?bI.cache:b6,b9=b7?b6[bI.expando]:bI.expando;
if(!b3[b9]){return
}if(b4){b8=e?b3[b9]:b3[b9].data;
if(b8){if(!bI.isArray(b4)){if(b4 in b8){b4=[b4]
}else{b4=bI.camelCase(b4);
if(b4 in b8){b4=[b4]
}else{b4=b4.split(" ")
}}}else{b4=b4.concat(bI.map(b4,bI.camelCase))
}b5=b4.length;
while(b5--){delete b8[b4[b5]]
}if(e?!L(b8):!bI.isEmptyObject(b8)){return
}}}if(!e){delete b3[b9].data;
if(!L(b3[b9])){return
}}if(b7){bI.cleanData([b6],true)
}else{if(bI.support.deleteExpando||b3!=b3.window){delete b3[b9]
}else{b3[b9]=null
}}}bI.extend({cache:{},noData:{applet:true,embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){e=e.nodeType?bI.cache[e[bI.expando]]:e[bI.expando];
return !!e&&!L(e)
},data:function(b3,e,b4){return a9(b3,e,b4)
},removeData:function(b3,e){return X(b3,e)
},_data:function(b3,e,b4){return a9(b3,e,b4,true)
},_removeData:function(b3,e){return X(b3,e,true)
},acceptData:function(b3){if(b3.nodeType&&b3.nodeType!==1&&b3.nodeType!==9){return false
}var e=b3.nodeName&&bI.noData[b3.nodeName.toLowerCase()];
return !e||e!==true&&b3.getAttribute("classid")===e
}});
bI.fn.extend({data:function(b5,b8){var b3,e,b7=null,b4=0,b6=this[0];
if(b5===aE){if(this.length){b7=bI.data(b6);
if(b6.nodeType===1&&!bI._data(b6,"parsedAttrs")){b3=b6.attributes;
for(;
b4<b3.length;
b4++){e=b3[b4].name;
if(e.indexOf("data-")===0){e=bI.camelCase(e.slice(5));
bx(b6,e,b7[e])
}}bI._data(b6,"parsedAttrs",true)
}}return b7
}if(typeof b5==="object"){return this.each(function(){bI.data(this,b5)
})
}return arguments.length>1?this.each(function(){bI.data(this,b5,b8)
}):b6?bx(b6,b5,bI.data(b6,b5)):null
},removeData:function(e){return this.each(function(){bI.removeData(this,e)
})
}});
function bx(b5,b4,b6){if(b6===aE&&b5.nodeType===1){var b3="data-"+b4.replace(aL,"-$1").toLowerCase();
b6=b5.getAttribute(b3);
if(typeof b6==="string"){try{b6=b6==="true"?true:b6==="false"?false:b6==="null"?null:+b6+""===b6?+b6:bv.test(b6)?bI.parseJSON(b6):b6
}catch(b7){}bI.data(b5,b4,b6)
}else{b6=aE
}}return b6
}function L(b3){var e;
for(e in b3){if(e==="data"&&bI.isEmptyObject(b3[e])){continue
}if(e!=="toJSON"){return false
}}return true
}bI.extend({queue:function(b4,b3,b5){var e;
if(b4){b3=(b3||"fx")+"queue";
e=bI._data(b4,b3);
if(b5){if(!e||bI.isArray(b5)){e=bI._data(b4,b3,bI.makeArray(b5))
}else{e.push(b5)
}}return e||[]
}},dequeue:function(b7,b6){b6=b6||"fx";
var b3=bI.queue(b7,b6),b8=b3.length,b5=b3.shift(),e=bI._queueHooks(b7,b6),b4=function(){bI.dequeue(b7,b6)
};
if(b5==="inprogress"){b5=b3.shift();
b8--
}if(b5){if(b6==="fx"){b3.unshift("inprogress")
}delete e.stop;
b5.call(b7,b4,e)
}if(!b8&&e){e.empty.fire()
}},_queueHooks:function(b4,b3){var e=b3+"queueHooks";
return bI._data(b4,e)||bI._data(b4,e,{empty:bI.Callbacks("once memory").add(function(){bI._removeData(b4,b3+"queue");
bI._removeData(b4,e)
})})
}});
bI.fn.extend({queue:function(e,b3){var b4=2;
if(typeof e!=="string"){b3=e;
e="fx";
b4--
}if(arguments.length<b4){return bI.queue(this[0],e)
}return b3===aE?this:this.each(function(){var b5=bI.queue(this,e,b3);
bI._queueHooks(this,e);
if(e==="fx"&&b5[0]!=="inprogress"){bI.dequeue(this,e)
}})
},dequeue:function(e){return this.each(function(){bI.dequeue(this,e)
})
},delay:function(b3,e){b3=bI.fx?bI.fx.speeds[b3]||b3:b3;
e=e||"fx";
return this.queue(e,function(b5,b4){var b6=setTimeout(b5,b3);
b4.stop=function(){clearTimeout(b6)
}
})
},clearQueue:function(e){return this.queue(e||"fx",[])
},promise:function(b4,b8){var b3,b5=1,b9=bI.Deferred(),b7=this,e=this.length,b6=function(){if(!(--b5)){b9.resolveWith(b7,[b7])
}};
if(typeof b4!=="string"){b8=b4;
b4=aE
}b4=b4||"fx";
while(e--){b3=bI._data(b7[e],b4+"queueHooks");
if(b3&&b3.empty){b5++;
b3.empty.add(b6)
}}b6();
return b9.promise(b8)
}});
var a7,bZ,bL=/[\t\r\n\f]/g,ah=/\r/g,aD=/^(?:input|select|textarea|button|object)$/i,C=/^(?:a|area)$/i,ao=/^(?:checked|selected)$/i,bO=bI.support.getSetAttribute,bE=bI.support.input;
bI.fn.extend({attr:function(e,b3){return bI.access(this,bI.attr,e,b3,arguments.length>1)
},removeAttr:function(e){return this.each(function(){bI.removeAttr(this,e)
})
},prop:function(e,b3){return bI.access(this,bI.prop,e,b3,arguments.length>1)
},removeProp:function(e){e=bI.propFix[e]||e;
return this.each(function(){try{this[e]=aE;
delete this[e]
}catch(b3){}})
},addClass:function(b9){var b3,e,ca,b6,b4,b5=0,b7=this.length,b8=typeof b9==="string"&&b9;
if(bI.isFunction(b9)){return this.each(function(cb){bI(this).addClass(b9.call(this,cb,this.className))
})
}if(b8){b3=(b9||"").match(aa)||[];
for(;
b5<b7;
b5++){e=this[b5];
ca=e.nodeType===1&&(e.className?(" "+e.className+" ").replace(bL," "):" ");
if(ca){b4=0;
while((b6=b3[b4++])){if(ca.indexOf(" "+b6+" ")<0){ca+=b6+" "
}}e.className=bI.trim(ca)
}}}return this
},removeClass:function(b9){var b3,e,ca,b6,b4,b5=0,b7=this.length,b8=arguments.length===0||typeof b9==="string"&&b9;
if(bI.isFunction(b9)){return this.each(function(cb){bI(this).removeClass(b9.call(this,cb,this.className))
})
}if(b8){b3=(b9||"").match(aa)||[];
for(;
b5<b7;
b5++){e=this[b5];
ca=e.nodeType===1&&(e.className?(" "+e.className+" ").replace(bL," "):"");
if(ca){b4=0;
while((b6=b3[b4++])){while(ca.indexOf(" "+b6+" ")>=0){ca=ca.replace(" "+b6+" "," ")
}}e.className=b9?bI.trim(ca):""
}}}return this
},toggleClass:function(b4,e){var b3=typeof b4;
if(typeof e==="boolean"&&b3==="string"){return e?this.addClass(b4):this.removeClass(b4)
}if(bI.isFunction(b4)){return this.each(function(b5){bI(this).toggleClass(b4.call(this,b5,this.className,e),e)
})
}return this.each(function(){if(b3==="string"){var b7,b6=0,b5=bI(this),b8=b4.match(aa)||[];
while((b7=b8[b6++])){if(b5.hasClass(b7)){b5.removeClass(b7)
}else{b5.addClass(b7)
}}}else{if(b3===aA||b3==="boolean"){if(this.className){bI._data(this,"__className__",this.className)
}this.className=this.className||b4===false?"":bI._data(this,"__className__")||""
}}})
},hasClass:function(e){var b5=" "+e+" ",b4=0,b3=this.length;
for(;
b4<b3;
b4++){if(this[b4].nodeType===1&&(" "+this[b4].className+" ").replace(bL," ").indexOf(b5)>=0){return true
}}return false
},val:function(b5){var b3,e,b6,b4=this[0];
if(!arguments.length){if(b4){e=bI.valHooks[b4.type]||bI.valHooks[b4.nodeName.toLowerCase()];
if(e&&"get" in e&&(b3=e.get(b4,"value"))!==aE){return b3
}b3=b4.value;
return typeof b3==="string"?b3.replace(ah,""):b3==null?"":b3
}return
}b6=bI.isFunction(b5);
return this.each(function(b7){var b8;
if(this.nodeType!==1){return
}if(b6){b8=b5.call(this,b7,bI(this).val())
}else{b8=b5
}if(b8==null){b8=""
}else{if(typeof b8==="number"){b8+=""
}else{if(bI.isArray(b8)){b8=bI.map(b8,function(b9){return b9==null?"":b9+""
})
}}}e=bI.valHooks[this.type]||bI.valHooks[this.nodeName.toLowerCase()];
if(!e||!("set" in e)||e.set(this,b8,"value")===aE){this.value=b8
}})
}});
bI.extend({valHooks:{option:{get:function(e){var b3=bI.find.attr(e,"value");
return b3!=null?b3:e.text
}},select:{get:function(e){var b8,b4,ca=e.options,b6=e.selectedIndex,b5=e.type==="select-one"||b6<0,b9=b5?null:[],b7=b5?b6+1:ca.length,b3=b6<0?b7:b5?b6:0;
for(;
b3<b7;
b3++){b4=ca[b3];
if((b4.selected||b3===b6)&&(bI.support.optDisabled?!b4.disabled:b4.getAttribute("disabled")===null)&&(!b4.parentNode.disabled||!bI.nodeName(b4.parentNode,"optgroup"))){b8=bI(b4).val();
if(b5){return b8
}b9.push(b8)
}}return b9
},set:function(b6,b7){var b8,b5,b3=b6.options,e=bI.makeArray(b7),b4=b3.length;
while(b4--){b5=b3[b4];
if((b5.selected=bI.inArray(bI(b5).val(),e)>=0)){b8=true
}}if(!b8){b6.selectedIndex=-1
}return e
}}},attr:function(b6,b5,b7){var e,b4,b3=b6.nodeType;
if(!b6||b3===3||b3===8||b3===2){return
}if(typeof b6.getAttribute===aA){return bI.prop(b6,b5,b7)
}if(b3!==1||!bI.isXMLDoc(b6)){b5=b5.toLowerCase();
e=bI.attrHooks[b5]||(bI.expr.match.bool.test(b5)?bZ:a7)
}if(b7!==aE){if(b7===null){bI.removeAttr(b6,b5)
}else{if(e&&"set" in e&&(b4=e.set(b6,b7,b5))!==aE){return b4
}else{b6.setAttribute(b5,b7+"");
return b7
}}}else{if(e&&"get" in e&&(b4=e.get(b6,b5))!==null){return b4
}else{b4=bI.find.attr(b6,b5);
return b4==null?aE:b4
}}},removeAttr:function(b4,b6){var e,b5,b3=0,b7=b6&&b6.match(aa);
if(b7&&b4.nodeType===1){while((e=b7[b3++])){b5=bI.propFix[e]||e;
if(bI.expr.match.bool.test(e)){if(bE&&bO||!ao.test(e)){b4[b5]=false
}else{b4[bI.camelCase("default-"+e)]=b4[b5]=false
}}else{bI.attr(b4,e,"")
}b4.removeAttribute(bO?e:b5)
}}},attrHooks:{type:{set:function(e,b3){if(!bI.support.radioValue&&b3==="radio"&&bI.nodeName(e,"input")){var b4=e.value;
e.setAttribute("type",b3);
if(b4){e.value=b4
}return b3
}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(b7,b5,b8){var b4,e,b6,b3=b7.nodeType;
if(!b7||b3===3||b3===8||b3===2){return
}b6=b3!==1||!bI.isXMLDoc(b7);
if(b6){b5=bI.propFix[b5]||b5;
e=bI.propHooks[b5]
}if(b8!==aE){return e&&"set" in e&&(b4=e.set(b7,b8,b5))!==aE?b4:(b7[b5]=b8)
}else{return e&&"get" in e&&(b4=e.get(b7,b5))!==null?b4:b7[b5]
}},propHooks:{tabIndex:{get:function(b3){var e=bI.find.attr(b3,"tabindex");
return e?parseInt(e,10):aD.test(b3.nodeName)||C.test(b3.nodeName)&&b3.href?0:-1
}}}});
bZ={set:function(b3,b4,e){if(b4===false){bI.removeAttr(b3,e)
}else{if(bE&&bO||!ao.test(e)){b3.setAttribute(!bO&&bI.propFix[e]||e,e)
}else{b3[bI.camelCase("default-"+e)]=b3[e]=true
}}return e
}};
bI.each(bI.expr.match.bool.source.match(/\w+/g),function(b4,b3){var e=bI.expr.attrHandle[b3]||bI.find.attr;
bI.expr.attrHandle[b3]=bE&&bO||!ao.test(b3)?function(b8,b6,b9){var b7=bI.expr.attrHandle[b6],b5=b9?aE:(bI.expr.attrHandle[b6]=aE)!=e(b8,b6,b9)?b6.toLowerCase():null;
bI.expr.attrHandle[b6]=b7;
return b5
}:function(b6,b5,b7){return b7?aE:b6[bI.camelCase("default-"+b5)]?b5.toLowerCase():null
}
});
if(!bE||!bO){bI.attrHooks.value={set:function(b3,b4,e){if(bI.nodeName(b3,"input")){b3.defaultValue=b4
}else{return a7&&a7.set(b3,b4,e)
}}}
}if(!bO){a7={set:function(b4,b5,b3){var e=b4.getAttributeNode(b3);
if(!e){b4.setAttributeNode((e=b4.ownerDocument.createAttribute(b3)))
}e.value=b5+="";
return b3==="value"||b5===b4.getAttribute(b3)?b5:aE
}};
bI.expr.attrHandle.id=bI.expr.attrHandle.name=bI.expr.attrHandle.coords=function(b4,b3,b5){var e;
return b5?aE:(e=b4.getAttributeNode(b3))&&e.value!==""?e.value:null
};
bI.valHooks.button={get:function(b4,b3){var e=b4.getAttributeNode(b3);
return e&&e.specified?e.value:aE
},set:a7.set};
bI.attrHooks.contenteditable={set:function(b3,b4,e){a7.set(b3,b4===""?false:b4,e)
}};
bI.each(["width","height"],function(b3,e){bI.attrHooks[e]={set:function(b4,b5){if(b5===""){b4.setAttribute(e,"auto");
return b5
}}}
})
}if(!bI.support.hrefNormalized){bI.each(["href","src"],function(b3,e){bI.propHooks[e]={get:function(b4){return b4.getAttribute(e,4)
}}
})
}if(!bI.support.style){bI.attrHooks.style={get:function(e){return e.style.cssText||aE
},set:function(e,b3){return(e.style.cssText=b3+"")
}}
}if(!bI.support.optSelected){bI.propHooks.selected={get:function(b3){var e=b3.parentNode;
if(e){e.selectedIndex;
if(e.parentNode){e.parentNode.selectedIndex
}}return null
}}
}bI.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){bI.propFix[this.toLowerCase()]=this
});
if(!bI.support.enctype){bI.propFix.enctype="encoding"
}bI.each(["radio","checkbox"],function(){bI.valHooks[this]={set:function(e,b3){if(bI.isArray(b3)){return(e.checked=bI.inArray(bI(e).val(),b3)>=0)
}}};
if(!bI.support.checkOn){bI.valHooks[this].get=function(e){return e.getAttribute("value")===null?"on":e.value
}
}});
var bG=/^(?:input|select|textarea)$/i,a2=/^key/,bM=/^(?:mouse|contextmenu)|click/,bA=/^(?:focusinfocus|focusoutblur)$/,bt=/^([^.]*)(?:\.(.+)|)$/;
function P(){return true
}function V(){return false
}function ai(){try{return l.activeElement
}catch(e){}}bI.event={global:{},add:function(b6,cb,cg,b8,b7){var b9,ch,ci,b4,cd,ca,cf,b5,ce,e,b3,cc=bI._data(b6);
if(!cc){return
}if(cg.handler){b4=cg;
cg=b4.handler;
b7=b4.selector
}if(!cg.guid){cg.guid=bI.guid++
}if(!(ch=cc.events)){ch=cc.events={}
}if(!(ca=cc.handle)){ca=cc.handle=function(cj){return typeof bI!==aA&&(!cj||bI.event.triggered!==cj.type)?bI.event.dispatch.apply(ca.elem,arguments):aE
};
ca.elem=b6
}cb=(cb||"").match(aa)||[""];
ci=cb.length;
while(ci--){b9=bt.exec(cb[ci])||[];
ce=b3=b9[1];
e=(b9[2]||"").split(".").sort();
if(!ce){continue
}cd=bI.event.special[ce]||{};
ce=(b7?cd.delegateType:cd.bindType)||ce;
cd=bI.event.special[ce]||{};
cf=bI.extend({type:ce,origType:b3,data:b8,handler:cg,guid:cg.guid,selector:b7,needsContext:b7&&bI.expr.match.needsContext.test(b7),namespace:e.join(".")},b4);
if(!(b5=ch[ce])){b5=ch[ce]=[];
b5.delegateCount=0;
if(!cd.setup||cd.setup.call(b6,b8,e,ca)===false){if(b6.addEventListener){b6.addEventListener(ce,ca,false)
}else{if(b6.attachEvent){b6.attachEvent("on"+ce,ca)
}}}}if(cd.add){cd.add.call(b6,cf);
if(!cf.handler.guid){cf.handler.guid=cg.guid
}}if(b7){b5.splice(b5.delegateCount++,0,cf)
}else{b5.push(cf)
}bI.event.global[ce]=true
}b6=null
},remove:function(b5,cb,ci,b6,ca){var b8,cf,b9,b7,ch,cg,cd,b4,ce,e,b3,cc=bI.hasData(b5)&&bI._data(b5);
if(!cc||!(cg=cc.events)){return
}cb=(cb||"").match(aa)||[""];
ch=cb.length;
while(ch--){b9=bt.exec(cb[ch])||[];
ce=b3=b9[1];
e=(b9[2]||"").split(".").sort();
if(!ce){for(ce in cg){bI.event.remove(b5,ce+cb[ch],ci,b6,true)
}continue
}cd=bI.event.special[ce]||{};
ce=(b6?cd.delegateType:cd.bindType)||ce;
b4=cg[ce]||[];
b9=b9[2]&&new RegExp("(^|\\.)"+e.join("\\.(?:.*\\.|)")+"(\\.|$)");
b7=b8=b4.length;
while(b8--){cf=b4[b8];
if((ca||b3===cf.origType)&&(!ci||ci.guid===cf.guid)&&(!b9||b9.test(cf.namespace))&&(!b6||b6===cf.selector||b6==="**"&&cf.selector)){b4.splice(b8,1);
if(cf.selector){b4.delegateCount--
}if(cd.remove){cd.remove.call(b5,cf)
}}}if(b7&&!b4.length){if(!cd.teardown||cd.teardown.call(b5,e,cc.handle)===false){bI.removeEvent(b5,ce,cc.handle)
}delete cg[ce]
}}if(bI.isEmptyObject(cg)){delete cc.handle;
bI._removeData(b5,"events")
}},trigger:function(b3,ca,b6,ch){var cb,b5,cf,cg,cd,b9,b8,b7=[b6||l],ce=T.call(b3,"type")?b3.type:b3,b4=T.call(b3,"namespace")?b3.namespace.split("."):[];
cf=b9=b6=b6||l;
if(b6.nodeType===3||b6.nodeType===8){return
}if(bA.test(ce+bI.event.triggered)){return
}if(ce.indexOf(".")>=0){b4=ce.split(".");
ce=b4.shift();
b4.sort()
}b5=ce.indexOf(":")<0&&"on"+ce;
b3=b3[bI.expando]?b3:new bI.Event(ce,typeof b3==="object"&&b3);
b3.isTrigger=ch?2:3;
b3.namespace=b4.join(".");
b3.namespace_re=b3.namespace?new RegExp("(^|\\.)"+b4.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;
b3.result=aE;
if(!b3.target){b3.target=b6
}ca=ca==null?[b3]:bI.makeArray(ca,[b3]);
cd=bI.event.special[ce]||{};
if(!ch&&cd.trigger&&cd.trigger.apply(b6,ca)===false){return
}if(!ch&&!cd.noBubble&&!bI.isWindow(b6)){cg=cd.delegateType||ce;
if(!bA.test(cg+ce)){cf=cf.parentNode
}for(;
cf;
cf=cf.parentNode){b7.push(cf);
b9=cf
}if(b9===(b6.ownerDocument||l)){b7.push(b9.defaultView||b9.parentWindow||a1)
}}b8=0;
while((cf=b7[b8++])&&!b3.isPropagationStopped()){b3.type=b8>1?cg:cd.bindType||ce;
cb=(bI._data(cf,"events")||{})[b3.type]&&bI._data(cf,"handle");
if(cb){cb.apply(cf,ca)
}cb=b5&&cf[b5];
if(cb&&bI.acceptData(cf)&&cb.apply&&cb.apply(cf,ca)===false){b3.preventDefault()
}}b3.type=ce;
if(!ch&&!b3.isDefaultPrevented()){if((!cd._default||cd._default.apply(b7.pop(),ca)===false)&&bI.acceptData(b6)){if(b5&&b6[ce]&&!bI.isWindow(b6)){b9=b6[b5];
if(b9){b6[b5]=null
}bI.event.triggered=ce;
try{b6[ce]()
}catch(cc){}bI.event.triggered=aE;
if(b9){b6[b5]=b9
}}}}return b3.result
},dispatch:function(e){e=bI.event.fix(e);
var b6,b7,cb,b3,b5,ca=[],b9=a3.call(arguments),b4=(bI._data(this,"events")||{})[e.type]||[],b8=bI.event.special[e.type]||{};
b9[0]=e;
e.delegateTarget=this;
if(b8.preDispatch&&b8.preDispatch.call(this,e)===false){return
}ca=bI.event.handlers.call(this,e,b4);
b6=0;
while((b3=ca[b6++])&&!e.isPropagationStopped()){e.currentTarget=b3.elem;
b5=0;
while((cb=b3.handlers[b5++])&&!e.isImmediatePropagationStopped()){if(!e.namespace_re||e.namespace_re.test(cb.namespace)){e.handleObj=cb;
e.data=cb.data;
b7=((bI.event.special[cb.origType]||{}).handle||cb.handler).apply(b3.elem,b9);
if(b7!==aE){if((e.result=b7)===false){e.preventDefault();
e.stopPropagation()
}}}}}if(b8.postDispatch){b8.postDispatch.call(this,e)
}return e.result
},handlers:function(e,b4){var b3,b9,b7,b6,b8=[],b5=b4.delegateCount,ca=e.target;
if(b5&&ca.nodeType&&(!e.button||e.type!=="click")){for(;
ca!=this;
ca=ca.parentNode||this){if(ca.nodeType===1&&(ca.disabled!==true||e.type!=="click")){b7=[];
for(b6=0;
b6<b5;
b6++){b9=b4[b6];
b3=b9.selector+" ";
if(b7[b3]===aE){b7[b3]=b9.needsContext?bI(b3,this).index(ca)>=0:bI.find(b3,this,null,[ca]).length
}if(b7[b3]){b7.push(b9)
}}if(b7.length){b8.push({elem:ca,handlers:b7})
}}}}if(b5<b4.length){b8.push({elem:this,handlers:b4.slice(b5)})
}return b8
},fix:function(b5){if(b5[bI.expando]){return b5
}var b3,b8,b7,b4=b5.type,e=b5,b6=this.fixHooks[b4];
if(!b6){this.fixHooks[b4]=b6=bM.test(b4)?this.mouseHooks:a2.test(b4)?this.keyHooks:{}
}b7=b6.props?this.props.concat(b6.props):this.props;
b5=new bI.Event(e);
b3=b7.length;
while(b3--){b8=b7[b3];
b5[b8]=e[b8]
}if(!b5.target){b5.target=e.srcElement||l
}if(b5.target.nodeType===3){b5.target=b5.target.parentNode
}b5.metaKey=!!b5.metaKey;
return b6.filter?b6.filter(b5,e):b5
},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(b3,e){if(b3.which==null){b3.which=e.charCode!=null?e.charCode:e.keyCode
}return b3
}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(b5,b4){var e,b6,b7,b3=b4.button,b8=b4.fromElement;
if(b5.pageX==null&&b4.clientX!=null){b6=b5.target.ownerDocument||l;
b7=b6.documentElement;
e=b6.body;
b5.pageX=b4.clientX+(b7&&b7.scrollLeft||e&&e.scrollLeft||0)-(b7&&b7.clientLeft||e&&e.clientLeft||0);
b5.pageY=b4.clientY+(b7&&b7.scrollTop||e&&e.scrollTop||0)-(b7&&b7.clientTop||e&&e.clientTop||0)
}if(!b5.relatedTarget&&b8){b5.relatedTarget=b8===b5.target?b4.toElement:b8
}if(!b5.which&&b3!==aE){b5.which=(b3&1?1:(b3&2?3:(b3&4?2:0)))
}return b5
}},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==ai()&&this.focus){try{this.focus();
return false
}catch(b3){}}},delegateType:"focusin"},blur:{trigger:function(){if(this===ai()&&this.blur){this.blur();
return false
}},delegateType:"focusout"},click:{trigger:function(){if(bI.nodeName(this,"input")&&this.type==="checkbox"&&this.click){this.click();
return false
}},_default:function(e){return bI.nodeName(e.target,"a")
}},beforeunload:{postDispatch:function(e){if(e.result!==aE){e.originalEvent.returnValue=e.result
}}}},simulate:function(b4,b6,b5,b3){var b7=bI.extend(new bI.Event(),b5,{type:b4,isSimulated:true,originalEvent:{}});
if(b3){bI.event.trigger(b7,null,b6)
}else{bI.event.dispatch.call(b6,b7)
}if(b7.isDefaultPrevented()){b5.preventDefault()
}}};
bI.removeEvent=l.removeEventListener?function(b3,e,b4){if(b3.removeEventListener){b3.removeEventListener(e,b4,false)
}}:function(b4,b3,b5){var e="on"+b3;
if(b4.detachEvent){if(typeof b4[e]===aA){b4[e]=null
}b4.detachEvent(e,b5)
}};
bI.Event=function(b3,e){if(!(this instanceof bI.Event)){return new bI.Event(b3,e)
}if(b3&&b3.type){this.originalEvent=b3;
this.type=b3.type;
this.isDefaultPrevented=(b3.defaultPrevented||b3.returnValue===false||b3.getPreventDefault&&b3.getPreventDefault())?P:V
}else{this.type=b3
}if(e){bI.extend(this,e)
}this.timeStamp=b3&&b3.timeStamp||bI.now();
this[bI.expando]=true
};
bI.Event.prototype={isDefaultPrevented:V,isPropagationStopped:V,isImmediatePropagationStopped:V,preventDefault:function(){var b3=this.originalEvent;
this.isDefaultPrevented=P;
if(!b3){return
}if(b3.preventDefault){b3.preventDefault()
}else{b3.returnValue=false
}},stopPropagation:function(){var b3=this.originalEvent;
this.isPropagationStopped=P;
if(!b3){return
}if(b3.stopPropagation){b3.stopPropagation()
}b3.cancelBubble=true
},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=P;
this.stopPropagation()
}};
bI.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(b3,e){bI.event.special[b3]={delegateType:e,bindType:e,handle:function(b6){var b4,b8=this,b7=b6.relatedTarget,b5=b6.handleObj;
if(!b7||(b7!==b8&&!bI.contains(b8,b7))){b6.type=b5.origType;
b4=b5.handler.apply(this,arguments);
b6.type=e
}return b4
}}
});
if(!bI.support.submitBubbles){bI.event.special.submit={setup:function(){if(bI.nodeName(this,"form")){return false
}bI.event.add(this,"click._submit keypress._submit",function(b5){var b4=b5.target,b3=bI.nodeName(b4,"input")||bI.nodeName(b4,"button")?b4.form:aE;
if(b3&&!bI._data(b3,"submitBubbles")){bI.event.add(b3,"submit._submit",function(e){e._submit_bubble=true
});
bI._data(b3,"submitBubbles",true)
}})
},postDispatch:function(e){if(e._submit_bubble){delete e._submit_bubble;
if(this.parentNode&&!e.isTrigger){bI.event.simulate("submit",this.parentNode,e,true)
}}},teardown:function(){if(bI.nodeName(this,"form")){return false
}bI.event.remove(this,"._submit")
}}
}if(!bI.support.changeBubbles){bI.event.special.change={setup:function(){if(bG.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){bI.event.add(this,"propertychange._change",function(e){if(e.originalEvent.propertyName==="checked"){this._just_changed=true
}});
bI.event.add(this,"click._change",function(e){if(this._just_changed&&!e.isTrigger){this._just_changed=false
}bI.event.simulate("change",this,e,true)
})
}return false
}bI.event.add(this,"beforeactivate._change",function(b4){var b3=b4.target;
if(bG.test(b3.nodeName)&&!bI._data(b3,"changeBubbles")){bI.event.add(b3,"change._change",function(e){if(this.parentNode&&!e.isSimulated&&!e.isTrigger){bI.event.simulate("change",this.parentNode,e,true)
}});
bI._data(b3,"changeBubbles",true)
}})
},handle:function(b3){var e=b3.target;
if(this!==e||b3.isSimulated||b3.isTrigger||(e.type!=="radio"&&e.type!=="checkbox")){return b3.handleObj.handler.apply(this,arguments)
}},teardown:function(){bI.event.remove(this,"._change");
return !bG.test(this.nodeName)
}}
}if(!bI.support.focusinBubbles){bI.each({focus:"focusin",blur:"focusout"},function(b5,e){var b3=0,b4=function(b6){bI.event.simulate(e,b6.target,bI.event.fix(b6),true)
};
bI.event.special[e]={setup:function(){if(b3++===0){l.addEventListener(b5,b4,true)
}},teardown:function(){if(--b3===0){l.removeEventListener(b5,b4,true)
}}}
})
}bI.fn.extend({on:function(b4,e,b7,b6,b3){var b5,b8;
if(typeof b4==="object"){if(typeof e!=="string"){b7=b7||e;
e=aE
}for(b5 in b4){this.on(b5,e,b7,b4[b5],b3)
}return this
}if(b7==null&&b6==null){b6=e;
b7=e=aE
}else{if(b6==null){if(typeof e==="string"){b6=b7;
b7=aE
}else{b6=b7;
b7=e;
e=aE
}}}if(b6===false){b6=V
}else{if(!b6){return this
}}if(b3===1){b8=b6;
b6=function(b9){bI().off(b9);
return b8.apply(this,arguments)
};
b6.guid=b8.guid||(b8.guid=bI.guid++)
}return this.each(function(){bI.event.add(this,b4,b6,b7,e)
})
},one:function(b3,e,b5,b4){return this.on(b3,e,b5,b4,1)
},off:function(b4,e,b6){var b3,b5;
if(b4&&b4.preventDefault&&b4.handleObj){b3=b4.handleObj;
bI(b4.delegateTarget).off(b3.namespace?b3.origType+"."+b3.namespace:b3.origType,b3.selector,b3.handler);
return this
}if(typeof b4==="object"){for(b5 in b4){this.off(b5,e,b4[b5])
}return this
}if(e===false||typeof e==="function"){b6=e;
e=aE
}if(b6===false){b6=V
}return this.each(function(){bI.event.remove(this,b4,b6,e)
})
},trigger:function(e,b3){return this.each(function(){bI.event.trigger(e,b3,this)
})
},triggerHandler:function(e,b4){var b3=this[0];
if(b3){return bI.event.trigger(e,b4,b3,true)
}}});
var al=/^.[^:#\[\.,]*$/,bs=/^(?:parents|prev(?:Until|All))/,x=bI.expr.match.needsContext,bw={children:true,contents:true,next:true,prev:true};
bI.fn.extend({find:function(b3){var b6,b5=[],b4=this,e=b4.length;
if(typeof b3!=="string"){return this.pushStack(bI(b3).filter(function(){for(b6=0;
b6<e;
b6++){if(bI.contains(b4[b6],this)){return true
}}}))
}for(b6=0;
b6<e;
b6++){bI.find(b3,b4[b6],b5)
}b5=this.pushStack(e>1?bI.unique(b5):b5);
b5.selector=this.selector?this.selector+" "+b3:b3;
return b5
},has:function(b5){var b4,b3=bI(b5,this),e=b3.length;
return this.filter(function(){for(b4=0;
b4<e;
b4++){if(bI.contains(this,b3[b4])){return true
}}})
},not:function(e){return this.pushStack(aM(this,e||[],true))
},filter:function(e){return this.pushStack(aM(this,e||[],false))
},is:function(e){return !!aM(this,typeof e==="string"&&x.test(e)?bI(e):e||[],false).length
},closest:function(b6,b5){var b7,b4=0,e=this.length,b3=[],b8=x.test(b6)||typeof b6!=="string"?bI(b6,b5||this.context):0;
for(;
b4<e;
b4++){for(b7=this[b4];
b7&&b7!==b5;
b7=b7.parentNode){if(b7.nodeType<11&&(b8?b8.index(b7)>-1:b7.nodeType===1&&bI.find.matchesSelector(b7,b6))){b7=b3.push(b7);
break
}}}return this.pushStack(b3.length>1?bI.unique(b3):b3)
},index:function(e){if(!e){return(this[0]&&this[0].parentNode)?this.first().prevAll().length:-1
}if(typeof e==="string"){return bI.inArray(this[0],bI(e))
}return bI.inArray(e.jquery?e[0]:e,this)
},add:function(e,b3){var b5=typeof e==="string"?bI(e,b3):bI.makeArray(e&&e.nodeType?[e]:e),b4=bI.merge(this.get(),b5);
return this.pushStack(bI.unique(b4))
},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))
}});
function aV(b3,e){do{b3=b3[e]
}while(b3&&b3.nodeType!==1);
return b3
}bI.each({parent:function(b3){var e=b3.parentNode;
return e&&e.nodeType!==11?e:null
},parents:function(e){return bI.dir(e,"parentNode")
},parentsUntil:function(b3,e,b4){return bI.dir(b3,"parentNode",b4)
},next:function(e){return aV(e,"nextSibling")
},prev:function(e){return aV(e,"previousSibling")
},nextAll:function(e){return bI.dir(e,"nextSibling")
},prevAll:function(e){return bI.dir(e,"previousSibling")
},nextUntil:function(b3,e,b4){return bI.dir(b3,"nextSibling",b4)
},prevUntil:function(b3,e,b4){return bI.dir(b3,"previousSibling",b4)
},siblings:function(e){return bI.sibling((e.parentNode||{}).firstChild,e)
},children:function(e){return bI.sibling(e.firstChild)
},contents:function(e){return bI.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:bI.merge([],e.childNodes)
}},function(e,b3){bI.fn[e]=function(b6,b4){var b5=bI.map(this,b3,b6);
if(e.slice(-5)!=="Until"){b4=b6
}if(b4&&typeof b4==="string"){b5=bI.filter(b4,b5)
}if(this.length>1){if(!bw[e]){b5=bI.unique(b5)
}if(bs.test(e)){b5=b5.reverse()
}}return this.pushStack(b5)
}
});
bI.extend({filter:function(b5,e,b4){var b3=e[0];
if(b4){b5=":not("+b5+")"
}return e.length===1&&b3.nodeType===1?bI.find.matchesSelector(b3,b5)?[b3]:[]:bI.find.matches(b5,bI.grep(e,function(b6){return b6.nodeType===1
}))
},dir:function(b4,b3,b6){var e=[],b5=b4[b3];
while(b5&&b5.nodeType!==9&&(b6===aE||b5.nodeType!==1||!bI(b5).is(b6))){if(b5.nodeType===1){e.push(b5)
}b5=b5[b3]
}return e
},sibling:function(b4,b3){var e=[];
for(;
b4;
b4=b4.nextSibling){if(b4.nodeType===1&&b4!==b3){e.push(b4)
}}return e
}});
function aM(b4,e,b3){if(bI.isFunction(e)){return bI.grep(b4,function(b6,b5){return !!e.call(b6,b5,b6)!==b3
})
}if(e.nodeType){return bI.grep(b4,function(b5){return(b5===e)!==b3
})
}if(typeof e==="string"){if(al.test(e)){return bI.filter(e,b4,b3)
}e=bI.filter(e,b4)
}return bI.grep(b4,function(b5){return(bI.inArray(b5,e)>=0)!==b3
})
}function z(e){var b4=d.split("|"),b3=e.createDocumentFragment();
if(b3.createElement){while(b4.length){b3.createElement(b4.pop())
}}return b3
}var d="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ay=/ jQuery\d+="(?:null|\d+)"/g,I=new RegExp("<(?:"+d+")[\\s/>]","i"),b2=/^\s+/,aB=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,m=/<([\w:]+)/,bX=/<tbody/i,H=/<|&#?\w+;/,aj=/<(?:script|style|link)/i,q=/^(?:checkbox|radio)$/i,bT=/checked\s*(?:[^=]|=\s*.checked.)/i,by=/^$|\/(?:java|ecma)script/i,ap=/^true\/(.*)/,aI=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,R={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:bI.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},aQ=z(l),j=aQ.appendChild(l.createElement("div"));
R.optgroup=R.option;
R.tbody=R.tfoot=R.colgroup=R.caption=R.thead;
R.th=R.td;
bI.fn.extend({text:function(e){return bI.access(this,function(b3){return b3===aE?bI.text(this):this.empty().append((this[0]&&this[0].ownerDocument||l).createTextNode(b3))
},null,e,arguments.length)
},append:function(){return this.domManip(arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var b3=aZ(this,e);
b3.appendChild(e)
}})
},prepend:function(){return this.domManip(arguments,function(e){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var b3=aZ(this,e);
b3.insertBefore(e,b3.firstChild)
}})
},before:function(){return this.domManip(arguments,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this)
}})
},after:function(){return this.domManip(arguments,function(e){if(this.parentNode){this.parentNode.insertBefore(e,this.nextSibling)
}})
},remove:function(e,b6){var b5,b3=e?bI.filter(e,this):this,b4=0;
for(;
(b5=b3[b4])!=null;
b4++){if(!b6&&b5.nodeType===1){bI.cleanData(k(b5))
}if(b5.parentNode){if(b6&&bI.contains(b5.ownerDocument,b5)){br(k(b5,"script"))
}b5.parentNode.removeChild(b5)
}}return this
},empty:function(){var b3,e=0;
for(;
(b3=this[e])!=null;
e++){if(b3.nodeType===1){bI.cleanData(k(b3,false))
}while(b3.firstChild){b3.removeChild(b3.firstChild)
}if(b3.options&&bI.nodeName(b3,"select")){b3.options.length=0
}}return this
},clone:function(b3,e){b3=b3==null?false:b3;
e=e==null?b3:e;
return this.map(function(){return bI.clone(this,b3,e)
})
},html:function(e){return bI.access(this,function(b6){var b5=this[0]||{},b4=0,b3=this.length;
if(b6===aE){return b5.nodeType===1?b5.innerHTML.replace(ay,""):aE
}if(typeof b6==="string"&&!aj.test(b6)&&(bI.support.htmlSerialize||!I.test(b6))&&(bI.support.leadingWhitespace||!b2.test(b6))&&!R[(m.exec(b6)||["",""])[1].toLowerCase()]){b6=b6.replace(aB,"<$1></$2>");
try{for(;
b4<b3;
b4++){b5=this[b4]||{};
if(b5.nodeType===1){bI.cleanData(k(b5,false));
b5.innerHTML=b6
}}b5=0
}catch(b7){}}if(b5){this.empty().append(b6)
}},null,e,arguments.length)
},replaceWith:function(){var e=bI.map(this,function(b4){return[b4.nextSibling,b4.parentNode]
}),b3=0;
this.domManip(arguments,function(b6){var b5=e[b3++],b4=e[b3++];
if(b4){if(b5&&b5.parentNode!==b4){b5=this.nextSibling
}bI(this).remove();
b4.insertBefore(b6,b5)
}},true);
return b3?this:this.remove()
},detach:function(e){return this.remove(e,true)
},domManip:function(cb,cg,b4){cb=aG.apply([],cb);
var b9,b5,e,b7,ce,ca,b8=0,b6=this.length,cd=this,cf=b6-1,cc=cb[0],b3=bI.isFunction(cc);
if(b3||!(b6<=1||typeof cc!=="string"||bI.support.checkClone||!bT.test(cc))){return this.each(function(ci){var ch=cd.eq(ci);
if(b3){cb[0]=cc.call(this,ci,ch.html())
}ch.domManip(cb,cg,b4)
})
}if(b6){ca=bI.buildFragment(cb,this[0].ownerDocument,false,!b4&&this);
b9=ca.firstChild;
if(ca.childNodes.length===1){ca=b9
}if(b9){b7=bI.map(k(ca,"script"),t);
e=b7.length;
for(;
b8<b6;
b8++){b5=ca;
if(b8!==cf){b5=bI.clone(b5,true,true);
if(e){bI.merge(b7,k(b5,"script"))
}}cg.call(this[b8],b5,b8)
}if(e){ce=b7[b7.length-1].ownerDocument;
bI.map(b7,bc);
for(b8=0;
b8<e;
b8++){b5=b7[b8];
if(by.test(b5.type||"")&&!bI._data(b5,"globalEval")&&bI.contains(ce,b5)){if(b5.src){bI._evalUrl(b5.src)
}else{bI.globalEval((b5.text||b5.textContent||b5.innerHTML||"").replace(aI,""))
}}}}ca=b9=null
}}return this
}});
function aZ(b3,e){return bI.nodeName(b3,"table")&&bI.nodeName(e.nodeType===1?e:e.firstChild,"tr")?b3.getElementsByTagName("tbody")[0]||b3.appendChild(b3.ownerDocument.createElement("tbody")):b3
}function t(e){e.type=(bI.find.attr(e,"type")!==null)+"/"+e.type;
return e
}function bc(b3){var e=ap.exec(b3.type);
if(e){b3.type=e[1]
}else{b3.removeAttribute("type")
}return b3
}function br(e,b4){var b5,b3=0;
for(;
(b5=e[b3])!=null;
b3++){bI._data(b5,"globalEval",!b4||bI._data(b4[b3],"globalEval"))
}}function aq(b9,b3){if(b3.nodeType!==1||!bI.hasData(b9)){return
}var b6,b5,e,b8=bI._data(b9),b7=bI._data(b3,b8),b4=b8.events;
if(b4){delete b7.handle;
b7.events={};
for(b6 in b4){for(b5=0,e=b4[b6].length;
b5<e;
b5++){bI.event.add(b3,b6,b4[b6][b5])
}}}if(b7.data){b7.data=bI.extend({},b7.data)
}}function O(b6,b3){var b7,b5,b4;
if(b3.nodeType!==1){return
}b7=b3.nodeName.toLowerCase();
if(!bI.support.noCloneEvent&&b3[bI.expando]){b4=bI._data(b3);
for(b5 in b4.events){bI.removeEvent(b3,b5,b4.handle)
}b3.removeAttribute(bI.expando)
}if(b7==="script"&&b3.text!==b6.text){t(b3).text=b6.text;
bc(b3)
}else{if(b7==="object"){if(b3.parentNode){b3.outerHTML=b6.outerHTML
}if(bI.support.html5Clone&&(b6.innerHTML&&!bI.trim(b3.innerHTML))){b3.innerHTML=b6.innerHTML
}}else{if(b7==="input"&&q.test(b6.type)){b3.defaultChecked=b3.checked=b6.checked;
if(b3.value!==b6.value){b3.value=b6.value
}}else{if(b7==="option"){b3.defaultSelected=b3.selected=b6.defaultSelected
}else{if(b7==="input"||b7==="textarea"){b3.defaultValue=b6.defaultValue
}}}}}}bI.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,b3){bI.fn[e]=function(b4){var b5,b7=0,b6=[],b9=bI(b4),b8=b9.length-1;
for(;
b7<=b8;
b7++){b5=b7===b8?this:this.clone(true);
bI(b9[b7])[b3](b5);
am.apply(b6,b5.get())
}return this.pushStack(b6)
}
});
function k(b5,e){var b3,b6,b4=0,b7=typeof b5.getElementsByTagName!==aA?b5.getElementsByTagName(e||"*"):typeof b5.querySelectorAll!==aA?b5.querySelectorAll(e||"*"):aE;
if(!b7){for(b7=[],b3=b5.childNodes||b5;
(b6=b3[b4])!=null;
b4++){if(!e||bI.nodeName(b6,e)){b7.push(b6)
}else{bI.merge(b7,k(b6,e))
}}}return e===aE||e&&bI.nodeName(b5,e)?bI.merge([b5],b7):b7
}function bU(e){if(q.test(e.type)){e.defaultChecked=e.checked
}}bI.extend({clone:function(b3,b5,e){var b7,b4,ca,b6,b8,b9=bI.contains(b3.ownerDocument,b3);
if(bI.support.html5Clone||bI.isXMLDoc(b3)||!I.test("<"+b3.nodeName+">")){ca=b3.cloneNode(true)
}else{j.innerHTML=b3.outerHTML;
j.removeChild(ca=j.firstChild)
}if((!bI.support.noCloneEvent||!bI.support.noCloneChecked)&&(b3.nodeType===1||b3.nodeType===11)&&!bI.isXMLDoc(b3)){b7=k(ca);
b8=k(b3);
for(b6=0;
(b4=b8[b6])!=null;
++b6){if(b7[b6]){O(b4,b7[b6])
}}}if(b5){if(e){b8=b8||k(b3);
b7=b7||k(ca);
for(b6=0;
(b4=b8[b6])!=null;
b6++){aq(b4,b7[b6])
}}else{aq(b3,ca)
}}b7=k(ca,"script");
if(b7.length>0){br(b7,!b9&&k(b3,"script"))
}b7=b8=b4=null;
return ca
},buildFragment:function(b3,b5,ca,cf){var cb,b7,b9,ce,cg,cd,b4,b8=b3.length,b6=z(b5),e=[],cc=0;
for(;
cc<b8;
cc++){b7=b3[cc];
if(b7||b7===0){if(bI.type(b7)==="object"){bI.merge(e,b7.nodeType?[b7]:b7)
}else{if(!H.test(b7)){e.push(b5.createTextNode(b7))
}else{ce=ce||b6.appendChild(b5.createElement("div"));
cg=(m.exec(b7)||["",""])[1].toLowerCase();
b4=R[cg]||R._default;
ce.innerHTML=b4[1]+b7.replace(aB,"<$1></$2>")+b4[2];
cb=b4[0];
while(cb--){ce=ce.lastChild
}if(!bI.support.leadingWhitespace&&b2.test(b7)){e.push(b5.createTextNode(b2.exec(b7)[0]))
}if(!bI.support.tbody){b7=cg==="table"&&!bX.test(b7)?ce.firstChild:b4[1]==="<table>"&&!bX.test(b7)?ce:0;
cb=b7&&b7.childNodes.length;
while(cb--){if(bI.nodeName((cd=b7.childNodes[cb]),"tbody")&&!cd.childNodes.length){b7.removeChild(cd)
}}}bI.merge(e,ce.childNodes);
ce.textContent="";
while(ce.firstChild){ce.removeChild(ce.firstChild)
}ce=b6.lastChild
}}}}if(ce){b6.removeChild(ce)
}if(!bI.support.appendChecked){bI.grep(k(e,"input"),bU)
}cc=0;
while((b7=e[cc++])){if(cf&&bI.inArray(b7,cf)!==-1){continue
}b9=bI.contains(b7.ownerDocument,b7);
ce=k(b6.appendChild(b7),"script");
if(b9){br(ce)
}if(ca){cb=0;
while((b7=ce[cb++])){if(by.test(b7.type||"")){ca.push(b7)
}}}}ce=null;
return b6
},cleanData:function(b3,cb){var b5,ca,b4,b6,b7=0,cc=bI.expando,e=bI.cache,b8=bI.support.deleteExpando,b9=bI.event.special;
for(;
(b5=b3[b7])!=null;
b7++){if(cb||bI.acceptData(b5)){b4=b5[cc];
b6=b4&&e[b4];
if(b6){if(b6.events){for(ca in b6.events){if(b9[ca]){bI.event.remove(b5,ca)
}else{bI.removeEvent(b5,ca,b6.handle)
}}}if(e[b4]){delete e[b4];
if(b8){delete b5[cc]
}else{if(typeof b5.removeAttribute!==aA){b5.removeAttribute(cc)
}else{b5[cc]=null
}}a5.push(b4)
}}}}},_evalUrl:function(e){return bI.ajax({url:e,type:"GET",dataType:"script",async:false,global:false,"throws":true})
}});
bI.fn.extend({wrapAll:function(e){if(bI.isFunction(e)){return this.each(function(b4){bI(this).wrapAll(e.call(this,b4))
})
}if(this[0]){var b3=bI(e,this[0].ownerDocument).eq(0).clone(true);
if(this[0].parentNode){b3.insertBefore(this[0])
}b3.map(function(){var b4=this;
while(b4.firstChild&&b4.firstChild.nodeType===1){b4=b4.firstChild
}return b4
}).append(this)
}return this
},wrapInner:function(e){if(bI.isFunction(e)){return this.each(function(b3){bI(this).wrapInner(e.call(this,b3))
})
}return this.each(function(){var b3=bI(this),b4=b3.contents();
if(b4.length){b4.wrapAll(e)
}else{b3.append(e)
}})
},wrap:function(e){var b3=bI.isFunction(e);
return this.each(function(b4){bI(this).wrapAll(b3?e.call(this,b4):e)
})
},unwrap:function(){return this.parent().each(function(){if(!bI.nodeName(this,"body")){bI(this).replaceWith(this.childNodes)
}}).end()
}});
var aC,bn,D,bf=/alpha\([^)]*\)/i,aR=/opacity\s*=\s*([^)]*)/,bm=/^(top|right|bottom|left)$/,E=/^(none|table(?!-c[ea]).+)/,aW=/^margin/,a8=new RegExp("^("+bz+")(.*)$","i"),U=new RegExp("^("+bz+")(?!px)[a-z%]+$","i"),Q=new RegExp("^([+-])=("+bz+")","i"),bi={BODY:"block"},bb={position:"absolute",visibility:"hidden",display:"block"},bB={letterSpacing:0,fontWeight:400},bS=["Top","Right","Bottom","Left"],at=["Webkit","O","Moz","ms"];
function b(b5,b3){if(b3 in b5){return b3
}var b6=b3.charAt(0).toUpperCase()+b3.slice(1),e=b3,b4=at.length;
while(b4--){b3=at[b4]+b6;
if(b3 in b5){return b3
}}return e
}function N(b3,e){b3=e||b3;
return bI.css(b3,"display")==="none"||!bI.contains(b3.ownerDocument,b3)
}function p(b8,e){var b9,b6,b7,b3=[],b4=0,b5=b8.length;
for(;
b4<b5;
b4++){b6=b8[b4];
if(!b6.style){continue
}b3[b4]=bI._data(b6,"olddisplay");
b9=b6.style.display;
if(e){if(!b3[b4]&&b9==="none"){b6.style.display=""
}if(b6.style.display===""&&N(b6)){b3[b4]=bI._data(b6,"olddisplay",bD(b6.nodeName))
}}else{if(!b3[b4]){b7=N(b6);
if(b9&&b9!=="none"||!b7){bI._data(b6,"olddisplay",b7?b9:bI.css(b6,"display"))
}}}}for(b4=0;
b4<b5;
b4++){b6=b8[b4];
if(!b6.style){continue
}if(!e||b6.style.display==="none"||b6.style.display===""){b6.style.display=e?b3[b4]||"":"none"
}}return b8
}bI.fn.extend({css:function(e,b3){return bI.access(this,function(b8,b5,b9){var b4,b7,ca={},b6=0;
if(bI.isArray(b5)){b7=bn(b8);
b4=b5.length;
for(;
b6<b4;
b6++){ca[b5[b6]]=bI.css(b8,b5[b6],false,b7)
}return ca
}return b9!==aE?bI.style(b8,b5,b9):bI.css(b8,b5)
},e,b3,arguments.length>1)
},show:function(){return p(this,true)
},hide:function(){return p(this)
},toggle:function(e){if(typeof e==="boolean"){return e?this.show():this.hide()
}return this.each(function(){if(N(this)){bI(this).show()
}else{bI(this).hide()
}})
}});
bI.extend({cssHooks:{opacity:{get:function(b4,b3){if(b3){var e=D(b4,"opacity");
return e===""?"1":e
}}}},cssNumber:{columnCount:true,fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":bI.support.cssFloat?"cssFloat":"styleFloat"},style:function(b5,b4,cb,b6){if(!b5||b5.nodeType===3||b5.nodeType===8||!b5.style){return
}var b9,ca,cc,b7=bI.camelCase(b4),b3=b5.style;
b4=bI.cssProps[b7]||(bI.cssProps[b7]=b(b3,b7));
cc=bI.cssHooks[b4]||bI.cssHooks[b7];
if(cb!==aE){ca=typeof cb;
if(ca==="string"&&(b9=Q.exec(cb))){cb=(b9[1]+1)*b9[2]+parseFloat(bI.css(b5,b4));
ca="number"
}if(cb==null||ca==="number"&&isNaN(cb)){return
}if(ca==="number"&&!bI.cssNumber[b7]){cb+="px"
}if(!bI.support.clearCloneStyle&&cb===""&&b4.indexOf("background")===0){b3[b4]="inherit"
}if(!cc||!("set" in cc)||(cb=cc.set(b5,cb,b6))!==aE){try{b3[b4]=cb
}catch(b8){}}}else{if(cc&&"get" in cc&&(b9=cc.get(b5,false,b6))!==aE){return b9
}return b3[b4]
}},css:function(b8,b6,b3,b7){var b5,b9,e,b4=bI.camelCase(b6);
b6=bI.cssProps[b4]||(bI.cssProps[b4]=b(b8.style,b4));
e=bI.cssHooks[b6]||bI.cssHooks[b4];
if(e&&"get" in e){b9=e.get(b8,true,b3)
}if(b9===aE){b9=D(b8,b6,b7)
}if(b9==="normal"&&b6 in bB){b9=bB[b6]
}if(b3===""||b3){b5=parseFloat(b9);
return b3===true||bI.isNumeric(b5)?b5||0:b9
}return b9
}});
if(a1.getComputedStyle){bn=function(e){return a1.getComputedStyle(e,null)
};
D=function(b6,b4,b8){var b5,b3,ca,b7=b8||bn(b6),b9=b7?b7.getPropertyValue(b4)||b7[b4]:aE,e=b6.style;
if(b7){if(b9===""&&!bI.contains(b6.ownerDocument,b6)){b9=bI.style(b6,b4)
}if(U.test(b9)&&aW.test(b4)){b5=e.width;
b3=e.minWidth;
ca=e.maxWidth;
e.minWidth=e.maxWidth=e.width=b9;
b9=b7.width;
e.width=b5;
e.minWidth=b3;
e.maxWidth=ca
}}return b9
}
}else{if(l.documentElement.currentStyle){bn=function(e){return e.currentStyle
};
D=function(b5,b3,b8){var b4,b7,b9,b6=b8||bn(b5),ca=b6?b6[b3]:aE,e=b5.style;
if(ca==null&&e&&e[b3]){ca=e[b3]
}if(U.test(ca)&&!bm.test(b3)){b4=e.left;
b7=b5.runtimeStyle;
b9=b7&&b7.left;
if(b9){b7.left=b5.currentStyle.left
}e.left=b3==="fontSize"?"1em":ca;
ca=e.pixelLeft+"px";
e.left=b4;
if(b9){b7.left=b9
}}return ca===""?"auto":ca
}
}}function aH(e,b4,b5){var b3=a8.exec(b4);
return b3?Math.max(0,b3[1]-(b5||0))+(b3[2]||"px"):b4
}function au(b6,b3,e,b8,b5){var b4=e===(b8?"border":"content")?4:b3==="width"?1:0,b7=0;
for(;
b4<4;
b4+=2){if(e==="margin"){b7+=bI.css(b6,e+bS[b4],true,b5)
}if(b8){if(e==="content"){b7-=bI.css(b6,"padding"+bS[b4],true,b5)
}if(e!=="margin"){b7-=bI.css(b6,"border"+bS[b4]+"Width",true,b5)
}}else{b7+=bI.css(b6,"padding"+bS[b4],true,b5);
if(e!=="padding"){b7+=bI.css(b6,"border"+bS[b4]+"Width",true,b5)
}}}return b7
}function u(b6,b3,e){var b5=true,b7=b3==="width"?b6.offsetWidth:b6.offsetHeight,b4=bn(b6),b8=bI.support.boxSizing&&bI.css(b6,"boxSizing",false,b4)==="border-box";
if(b7<=0||b7==null){b7=D(b6,b3,b4);
if(b7<0||b7==null){b7=b6.style[b3]
}if(U.test(b7)){return b7
}b5=b8&&(bI.support.boxSizingReliable||b7===b6.style[b3]);
b7=parseFloat(b7)||0
}return(b7+au(b6,b3,e||(b8?"border":"content"),b5,b4))+"px"
}function bD(b4){var b3=l,e=bi[b4];
if(!e){e=a0(b4,b3);
if(e==="none"||!e){aC=(aC||bI("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(b3.documentElement);
b3=(aC[0].contentWindow||aC[0].contentDocument).document;
b3.write("<!doctype html><html><body>");
b3.close();
e=a0(b4,b3);
aC.detach()
}bi[b4]=e
}return e
}function a0(e,b5){var b3=bI(b5.createElement(e)).appendTo(b5.body),b4=bI.css(b3[0],"display");
b3.remove();
return b4
}bI.each(["height","width"],function(b3,e){bI.cssHooks[e]={get:function(b6,b5,b4){if(b5){return b6.offsetWidth===0&&E.test(bI.css(b6,"display"))?bI.swap(b6,bb,function(){return u(b6,e,b4)
}):u(b6,e,b4)
}},set:function(b6,b7,b4){var b5=b4&&bn(b6);
return aH(b6,b7,b4?au(b6,e,b4,bI.support.boxSizing&&bI.css(b6,"boxSizing",false,b5)==="border-box",b5):0)
}}
});
if(!bI.support.opacity){bI.cssHooks.opacity={get:function(b3,e){return aR.test((e&&b3.currentStyle?b3.currentStyle.filter:b3.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":e?"1":""
},set:function(b6,b7){var b5=b6.style,b3=b6.currentStyle,e=bI.isNumeric(b7)?"alpha(opacity="+b7*100+")":"",b4=b3&&b3.filter||b5.filter||"";
b5.zoom=1;
if((b7>=1||b7==="")&&bI.trim(b4.replace(bf,""))===""&&b5.removeAttribute){b5.removeAttribute("filter");
if(b7===""||b3&&!b3.filter){return
}}b5.filter=bf.test(b4)?b4.replace(bf,e):b4+" "+e
}}
}bI(function(){if(!bI.support.reliableMarginRight){bI.cssHooks.marginRight={get:function(b3,e){if(e){return bI.swap(b3,{display:"inline-block"},D,[b3,"marginRight"])
}}}
}if(!bI.support.pixelPosition&&bI.fn.position){bI.each(["top","left"],function(e,b3){bI.cssHooks[b3]={get:function(b5,b4){if(b4){b4=D(b5,b3);
return U.test(b4)?bI(b5).position()[b3]+"px":b4
}}}
})
}});
if(bI.expr&&bI.expr.filters){bI.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0||(!bI.support.reliableHiddenOffsets&&((e.style&&e.style.display)||bI.css(e,"display"))==="none")
};
bI.expr.filters.visible=function(e){return !bI.expr.filters.hidden(e)
}
}bI.each({margin:"",padding:"",border:"Width"},function(e,b3){bI.cssHooks[e+b3]={expand:function(b6){var b5=0,b4={},b7=typeof b6==="string"?b6.split(" "):[b6];
for(;
b5<4;
b5++){b4[e+bS[b5]+b3]=b7[b5]||b7[b5-2]||b7[0]
}return b4
}};
if(!aW.test(e)){bI.cssHooks[e+b3].set=aH
}});
var bu=/%20/g,aP=/\[\]$/,S=/\r?\n/g,c=/^(?:submit|button|image|reset|file)$/i,ar=/^(?:input|select|textarea|keygen)/i;
bI.fn.extend({serialize:function(){return bI.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){var e=bI.prop(this,"elements");
return e?bI.makeArray(e):this
}).filter(function(){var e=this.type;
return this.name&&!bI(this).is(":disabled")&&ar.test(this.nodeName)&&!c.test(e)&&(this.checked||!q.test(e))
}).map(function(e,b3){var b4=bI(this).val();
return b4==null?null:bI.isArray(b4)?bI.map(b4,function(b5){return{name:b3.name,value:b5.replace(S,"\r\n")}
}):{name:b3.name,value:b4.replace(S,"\r\n")}
}).get()
}});
bI.param=function(e,b4){var b5,b3=[],b6=function(b7,b8){b8=bI.isFunction(b8)?b8():(b8==null?"":b8);
b3[b3.length]=encodeURIComponent(b7)+"="+encodeURIComponent(b8)
};
if(b4===aE){b4=bI.ajaxSettings&&bI.ajaxSettings.traditional
}if(bI.isArray(e)||(e.jquery&&!bI.isPlainObject(e))){bI.each(e,function(){b6(this.name,this.value)
})
}else{for(b5 in e){i(b5,e[b5],b4,b6)
}}return b3.join("&").replace(bu,"+")
};
function i(b4,b6,b3,b5){var e;
if(bI.isArray(b6)){bI.each(b6,function(b8,b7){if(b3||aP.test(b4)){b5(b4,b7)
}else{i(b4+"["+(typeof b7==="object"?b8:"")+"]",b7,b3,b5)
}})
}else{if(!b3&&bI.type(b6)==="object"){for(e in b6){i(b4+"["+e+"]",b6[e],b3,b5)
}}else{b5(b4,b6)
}}}bI.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(b3,e){bI.fn[e]=function(b5,b4){return arguments.length>0?this.on(e,null,b5,b4):this.trigger(e)
}
});
bI.fn.extend({hover:function(e,b3){return this.mouseenter(e).mouseleave(b3||e)
},bind:function(e,b4,b3){return this.on(e,null,b4,b3)
},unbind:function(e,b3){return this.off(e,null,b3)
},delegate:function(e,b3,b5,b4){return this.on(b3,e,b5,b4)
},undelegate:function(e,b3,b4){return arguments.length===1?this.off(e,"**"):this.off(b3,e||"**",b4)
}});
var b1,W,bN=bI.now(),ax=/\?/,an=/#.*$/,M=/([?&])_=[^&]*/,ae=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,A=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,o=/^(?:GET|HEAD)$/,aF=/^\/\//,aS=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,b0=bI.fn.load,v={},a6={},aU="*/".concat("*");
try{W=aJ.href
}catch(be){W=l.createElement("a");
W.href="";
W=W.href
}b1=aS.exec(W.toLowerCase())||[];
function bK(e){return function(b6,b7){if(typeof b6!=="string"){b7=b6;
b6="*"
}var b3,b4=0,b5=b6.toLowerCase().match(aa)||[];
if(bI.isFunction(b7)){while((b3=b5[b4++])){if(b3[0]==="+"){b3=b3.slice(1)||"*";
(e[b3]=e[b3]||[]).unshift(b7)
}else{(e[b3]=e[b3]||[]).push(b7)
}}}}
}function n(e,b4,b8,b5){var b3={},b6=(e===a6);
function b7(b9){var ca;
b3[b9]=true;
bI.each(e[b9]||[],function(cc,cb){var cd=cb(b4,b8,b5);
if(typeof cd==="string"&&!b6&&!b3[cd]){b4.dataTypes.unshift(cd);
b7(cd);
return false
}else{if(b6){return !(ca=cd)
}}});
return ca
}return b7(b4.dataTypes[0])||!b3["*"]&&b7("*")
}function r(b4,b5){var e,b3,b6=bI.ajaxSettings.flatOptions||{};
for(b3 in b5){if(b5[b3]!==aE){(b6[b3]?b4:(e||(e={})))[b3]=b5[b3]
}}if(e){bI.extend(true,b4,e)
}return b4
}bI.fn.load=function(b5,b8,b9){if(typeof b5!=="string"&&b0){return b0.apply(this,arguments)
}var e,b4,b6,b3=this,b7=b5.indexOf(" ");
if(b7>=0){e=b5.slice(b7,b5.length);
b5=b5.slice(0,b7)
}if(bI.isFunction(b8)){b9=b8;
b8=aE
}else{if(b8&&typeof b8==="object"){b6="POST"
}}if(b3.length>0){bI.ajax({url:b5,type:b6,dataType:"html",data:b8}).done(function(ca){b4=arguments;
b3.html(e?bI("<div>").append(bI.parseHTML(ca)).find(e):ca)
}).complete(b9&&function(cb,ca){b3.each(b9,b4||[cb.responseText,ca,cb])
})
}return this
};
bI.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,b3){bI.fn[b3]=function(b4){return this.on(b3,b4)
}
});
bI.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:W,type:"GET",isLocal:A.test(b1[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":aU,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":bI.parseJSON,"text xml":bI.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(b3,e){return e?r(r(b3,bI.ajaxSettings),e):r(bI.ajaxSettings,b3)
},ajaxPrefilter:bK(v),ajaxTransport:bK(a6),ajax:function(b7,b4){if(typeof b7==="object"){b4=b7;
b7=aE
}b4=b4||{};
var cg,ci,b8,cn,cc,b3,cj,b5,cb=bI.ajaxSetup({},b4),cp=cb.context||cb,ce=cb.context&&(cp.nodeType||cp.jquery)?bI(cp):bI.event,co=bI.Deferred(),cl=bI.Callbacks("once memory"),b9=cb.statusCode||{},cf={},cm={},b6=0,ca="canceled",ch={readyState:0,getResponseHeader:function(cq){var e;
if(b6===2){if(!b5){b5={};
while((e=ae.exec(cn))){b5[e[1].toLowerCase()]=e[2]
}}e=b5[cq.toLowerCase()]
}return e==null?null:e
},getAllResponseHeaders:function(){return b6===2?cn:null
},setRequestHeader:function(cq,cr){var e=cq.toLowerCase();
if(!b6){cq=cm[e]=cm[e]||cq;
cf[cq]=cr
}return this
},overrideMimeType:function(e){if(!b6){cb.mimeType=e
}return this
},statusCode:function(cq){var e;
if(cq){if(b6<2){for(e in cq){b9[e]=[b9[e],cq[e]]
}}else{ch.always(cq[ch.status])
}}return this
},abort:function(cq){var e=cq||ca;
if(cj){cj.abort(e)
}cd(0,e);
return this
}};
co.promise(ch).complete=cl.add;
ch.success=ch.done;
ch.error=ch.fail;
cb.url=((b7||cb.url||W)+"").replace(an,"").replace(aF,b1[1]+"//");
cb.type=b4.method||b4.type||cb.method||cb.type;
cb.dataTypes=bI.trim(cb.dataType||"*").toLowerCase().match(aa)||[""];
if(cb.crossDomain==null){cg=aS.exec(cb.url.toLowerCase());
cb.crossDomain=!!(cg&&(cg[1]!==b1[1]||cg[2]!==b1[2]||(cg[3]||(cg[1]==="http:"?"80":"443"))!==(b1[3]||(b1[1]==="http:"?"80":"443"))))
}if(cb.data&&cb.processData&&typeof cb.data!=="string"){cb.data=bI.param(cb.data,cb.traditional)
}n(v,cb,b4,ch);
if(b6===2){return ch
}b3=cb.global;
if(b3&&bI.active++===0){bI.event.trigger("ajaxStart")
}cb.type=cb.type.toUpperCase();
cb.hasContent=!o.test(cb.type);
b8=cb.url;
if(!cb.hasContent){if(cb.data){b8=(cb.url+=(ax.test(b8)?"&":"?")+cb.data);
delete cb.data
}if(cb.cache===false){cb.url=M.test(b8)?b8.replace(M,"$1_="+bN++):b8+(ax.test(b8)?"&":"?")+"_="+bN++
}}if(cb.ifModified){if(bI.lastModified[b8]){ch.setRequestHeader("If-Modified-Since",bI.lastModified[b8])
}if(bI.etag[b8]){ch.setRequestHeader("If-None-Match",bI.etag[b8])
}}if(cb.data&&cb.hasContent&&cb.contentType!==false||b4.contentType){ch.setRequestHeader("Content-Type",cb.contentType)
}ch.setRequestHeader("Accept",cb.dataTypes[0]&&cb.accepts[cb.dataTypes[0]]?cb.accepts[cb.dataTypes[0]]+(cb.dataTypes[0]!=="*"?", "+aU+"; q=0.01":""):cb.accepts["*"]);
for(ci in cb.headers){ch.setRequestHeader(ci,cb.headers[ci])
}if(cb.beforeSend&&(cb.beforeSend.call(cp,ch,cb)===false||b6===2)){return ch.abort()
}ca="abort";
for(ci in {success:1,error:1,complete:1}){ch[ci](cb[ci])
}cj=n(a6,cb,b4,ch);
if(!cj){cd(-1,"No Transport")
}else{ch.readyState=1;
if(b3){ce.trigger("ajaxSend",[ch,cb])
}if(cb.async&&cb.timeout>0){cc=setTimeout(function(){ch.abort("timeout")
},cb.timeout)
}try{b6=1;
cj.send(cf,cd)
}catch(ck){if(b6<2){cd(-1,ck)
}else{throw ck
}}}function cd(cu,cq,cv,cs){var e,cy,cw,ct,cx,cr=cq;
if(b6===2){return
}b6=2;
if(cc){clearTimeout(cc)
}cj=aE;
cn=cs||"";
ch.readyState=cu>0?4:0;
e=cu>=200&&cu<300||cu===304;
if(cv){ct=g(cb,ch,cv)
}ct=ad(cb,ct,ch,e);
if(e){if(cb.ifModified){cx=ch.getResponseHeader("Last-Modified");
if(cx){bI.lastModified[b8]=cx
}cx=ch.getResponseHeader("etag");
if(cx){bI.etag[b8]=cx
}}if(cu===204||cb.type==="HEAD"){cr="nocontent"
}else{if(cu===304){cr="notmodified"
}else{cr=ct.state;
cy=ct.data;
cw=ct.error;
e=!cw
}}}else{cw=cr;
if(cu||!cr){cr="error";
if(cu<0){cu=0
}}}ch.status=cu;
ch.statusText=(cq||cr)+"";
if(e){co.resolveWith(cp,[cy,cr,ch])
}else{co.rejectWith(cp,[ch,cr,cw])
}ch.statusCode(b9);
b9=aE;
if(b3){ce.trigger(e?"ajaxSuccess":"ajaxError",[ch,cb,e?cy:cw])
}cl.fireWith(cp,[ch,cr]);
if(b3){ce.trigger("ajaxComplete",[ch,cb]);
if(!(--bI.active)){bI.event.trigger("ajaxStop")
}}}return ch
},getJSON:function(e,b3,b4){return bI.get(e,b3,b4,"json")
},getScript:function(e,b3){return bI.get(e,aE,b3,"script")
}});
bI.each(["get","post"],function(e,b3){bI[b3]=function(b4,b6,b7,b5){if(bI.isFunction(b6)){b5=b5||b7;
b7=b6;
b6=aE
}return bI.ajax({url:b4,type:b3,dataType:b5,data:b6,success:b7})
}
});
function g(ca,b9,b6){var e,b5,b4,b7,b3=ca.contents,b8=ca.dataTypes;
while(b8[0]==="*"){b8.shift();
if(b5===aE){b5=ca.mimeType||b9.getResponseHeader("Content-Type")
}}if(b5){for(b7 in b3){if(b3[b7]&&b3[b7].test(b5)){b8.unshift(b7);
break
}}}if(b8[0] in b6){b4=b8[0]
}else{for(b7 in b6){if(!b8[0]||ca.converters[b7+" "+b8[0]]){b4=b7;
break
}if(!e){e=b7
}}b4=b4||e
}if(b4){if(b4!==b8[0]){b8.unshift(b4)
}return b6[b4]
}}function ad(ce,b6,cb,b4){var b3,b9,cc,b7,b5,cd={},ca=ce.dataTypes.slice();
if(ca[1]){for(cc in ce.converters){cd[cc.toLowerCase()]=ce.converters[cc]
}}b9=ca.shift();
while(b9){if(ce.responseFields[b9]){cb[ce.responseFields[b9]]=b6
}if(!b5&&b4&&ce.dataFilter){b6=ce.dataFilter(b6,ce.dataType)
}b5=b9;
b9=ca.shift();
if(b9){if(b9==="*"){b9=b5
}else{if(b5!=="*"&&b5!==b9){cc=cd[b5+" "+b9]||cd["* "+b9];
if(!cc){for(b3 in cd){b7=b3.split(" ");
if(b7[1]===b9){cc=cd[b5+" "+b7[0]]||cd["* "+b7[0]];
if(cc){if(cc===true){cc=cd[b3]
}else{if(cd[b3]!==true){b9=b7[0];
ca.unshift(b7[1])
}}break
}}}}if(cc!==true){if(cc&&ce["throws"]){b6=cc(b6)
}else{try{b6=cc(b6)
}catch(b8){return{state:"parsererror",error:cc?b8:"No conversion from "+b5+" to "+b9}
}}}}}}}return{state:"success",data:b6}
}bI.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){bI.globalEval(e);
return e
}}});
bI.ajaxPrefilter("script",function(e){if(e.cache===aE){e.cache=false
}if(e.crossDomain){e.type="GET";
e.global=false
}});
bI.ajaxTransport("script",function(b4){if(b4.crossDomain){var e,b3=l.head||bI("head")[0]||l.documentElement;
return{send:function(b5,b6){e=l.createElement("script");
e.async=true;
if(b4.scriptCharset){e.charset=b4.scriptCharset
}e.src=b4.url;
e.onload=e.onreadystatechange=function(b8,b7){if(b7||!e.readyState||/loaded|complete/.test(e.readyState)){e.onload=e.onreadystatechange=null;
if(e.parentNode){e.parentNode.removeChild(e)
}e=null;
if(!b7){b6(200,"success")
}}};
b3.insertBefore(e,b3.firstChild)
},abort:function(){if(e){e.onload(aE,true)
}}}
}});
var bp=[],a4=/(=)\?(?=&|$)|\?\?/;
bI.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=bp.pop()||(bI.expando+"_"+(bN++));
this[e]=true;
return e
}});
bI.ajaxPrefilter("json jsonp",function(b5,e,b6){var b8,b3,b4,b7=b5.jsonp!==false&&(a4.test(b5.url)?"url":typeof b5.data==="string"&&!(b5.contentType||"").indexOf("application/x-www-form-urlencoded")&&a4.test(b5.data)&&"data");
if(b7||b5.dataTypes[0]==="jsonp"){b8=b5.jsonpCallback=bI.isFunction(b5.jsonpCallback)?b5.jsonpCallback():b5.jsonpCallback;
if(b7){b5[b7]=b5[b7].replace(a4,"$1"+b8)
}else{if(b5.jsonp!==false){b5.url+=(ax.test(b5.url)?"&":"?")+b5.jsonp+"="+b8
}}b5.converters["script json"]=function(){if(!b4){bI.error(b8+" was not called")
}return b4[0]
};
b5.dataTypes[0]="json";
b3=a1[b8];
a1[b8]=function(){b4=arguments
};
b6.always(function(){a1[b8]=b3;
if(b5[b8]){b5.jsonpCallback=e.jsonpCallback;
bp.push(b8)
}if(b4&&bI.isFunction(b3)){b3(b4[0])
}b4=b3=aE
});
return"script"
}});
var af,av,aw=0,aN=a1.ActiveXObject&&function(){var e;
for(e in af){af[e](aE,true)
}};
function bC(){try{return new a1.XMLHttpRequest()
}catch(b3){}}function bd(){try{return new a1.ActiveXObject("Microsoft.XMLHTTP")
}catch(b3){}}bI.ajaxSettings.xhr=a1.ActiveXObject?function(){return !this.isLocal&&bC()||bd()
}:bC;
av=bI.ajaxSettings.xhr();
bI.support.cors=!!av&&("withCredentials" in av);
av=bI.support.ajax=!!av;
if(av){bI.ajaxTransport(function(e){if(!e.crossDomain||bI.support.cors){var b3;
return{send:function(b9,b4){var b7,b5,b8=e.xhr();
if(e.username){b8.open(e.type,e.url,e.async,e.username,e.password)
}else{b8.open(e.type,e.url,e.async)
}if(e.xhrFields){for(b5 in e.xhrFields){b8[b5]=e.xhrFields[b5]
}}if(e.mimeType&&b8.overrideMimeType){b8.overrideMimeType(e.mimeType)
}if(!e.crossDomain&&!b9["X-Requested-With"]){b9["X-Requested-With"]="XMLHttpRequest"
}try{for(b5 in b9){b8.setRequestHeader(b5,b9[b5])
}}catch(b6){}b8.send((e.hasContent&&e.data)||null);
b3=function(cc,cb){var ca,cd,cg,ce;
try{if(b3&&(cb||b8.readyState===4)){b3=aE;
if(b7){b8.onreadystatechange=bI.noop;
if(aN){delete af[b7]
}}if(cb){if(b8.readyState!==4){b8.abort()
}}else{ce={};
ca=b8.status;
cd=b8.getAllResponseHeaders();
if(typeof b8.responseText==="string"){ce.text=b8.responseText
}try{cg=b8.statusText
}catch(cf){cg=""
}if(!ca&&e.isLocal&&!e.crossDomain){ca=ce.text?200:404
}else{if(ca===1223){ca=204
}}}}}catch(ch){if(!cb){b4(-1,ch)
}}if(ce){b4(ca,cg,ce,cd)
}};
if(!e.async){b3()
}else{if(b8.readyState===4){setTimeout(b3)
}else{b7=++aw;
if(aN){if(!af){af={};
bI(a1).unload(aN)
}af[b7]=b3
}b8.onreadystatechange=b3
}}},abort:function(){if(b3){b3(aE,true)
}}}
}})
}var J,ab,bQ=/^(?:toggle|show|hide)$/,bJ=new RegExp("^(?:([+-])=|)("+bz+")([a-z%]*)$","i"),bP=/queueHooks$/,az=[h],aY={"*":[function(e,b8){var ca=this.createTween(e,b8),b6=ca.cur(),b5=bJ.exec(b8),b9=b5&&b5[3]||(bI.cssNumber[e]?"":"px"),b3=(bI.cssNumber[e]||b9!=="px"&&+b6)&&bJ.exec(bI.css(ca.elem,e)),b4=1,b7=20;
if(b3&&b3[3]!==b9){b9=b9||b3[3];
b5=b5||[];
b3=+b6||1;
do{b4=b4||".5";
b3=b3/b4;
bI.style(ca.elem,e,b3+b9)
}while(b4!==(b4=ca.cur()/b6)&&b4!==1&&--b7)
}if(b5){b3=ca.start=+b3||+b6||0;
ca.unit=b9;
ca.end=b5[1]?b3+(b5[1]+1)*b5[2]:+b5[2]
}return ca
}]};
function bl(){setTimeout(function(){J=aE
});
return(J=bI.now())
}function ba(b6,b8,b5){var b3,b7=(aY[b8]||[]).concat(aY["*"]),e=0,b4=b7.length;
for(;
e<b4;
e++){if((b3=b7[e].call(b5,b8,b6))){return b3
}}}function f(b4,b8,cb){var cc,e,b7=0,b3=az.length,ca=bI.Deferred().always(function(){delete b6.elem
}),b6=function(){if(e){return false
}var ci=J||bl(),cf=Math.max(0,b5.startTime+b5.duration-ci),cd=cf/b5.duration||0,ch=1-cd,ce=0,cg=b5.tweens.length;
for(;
ce<cg;
ce++){b5.tweens[ce].run(ch)
}ca.notifyWith(b4,[b5,ch,cf]);
if(ch<1&&cg){return cf
}else{ca.resolveWith(b4,[b5]);
return false
}},b5=ca.promise({elem:b4,props:bI.extend({},b8),opts:bI.extend(true,{specialEasing:{}},cb),originalProperties:b8,originalOptions:cb,startTime:J||bl(),duration:cb.duration,tweens:[],createTween:function(cf,cd){var ce=bI.Tween(b4,b5.opts,cf,cd,b5.opts.specialEasing[cf]||b5.opts.easing);
b5.tweens.push(ce);
return ce
},stop:function(ce){var cd=0,cf=ce?b5.tweens.length:0;
if(e){return this
}e=true;
for(;
cd<cf;
cd++){b5.tweens[cd].run(1)
}if(ce){ca.resolveWith(b4,[b5,ce])
}else{ca.rejectWith(b4,[b5,ce])
}return this
}}),b9=b5.props;
ak(b9,b5.opts.specialEasing);
for(;
b7<b3;
b7++){cc=az[b7].call(b5,b4,b9,b5.opts);
if(cc){return cc
}}bI.map(b9,ba,b5);
if(bI.isFunction(b5.opts.start)){b5.opts.start.call(b4,b5)
}bI.fx.timer(bI.extend(b6,{elem:b4,anim:b5,queue:b5.opts.queue}));
return b5.progress(b5.opts.progress).done(b5.opts.done,b5.opts.complete).fail(b5.opts.fail).always(b5.opts.always)
}function ak(b5,b7){var b4,b3,b8,b6,e;
for(b4 in b5){b3=bI.camelCase(b4);
b8=b7[b3];
b6=b5[b4];
if(bI.isArray(b6)){b8=b6[1];
b6=b5[b4]=b6[0]
}if(b4!==b3){b5[b3]=b6;
delete b5[b4]
}e=bI.cssHooks[b3];
if(e&&"expand" in e){b6=e.expand(b6);
delete b5[b3];
for(b4 in b6){if(!(b4 in b5)){b5[b4]=b6[b4];
b7[b4]=b8
}}}else{b7[b3]=b8
}}}bI.Animation=bI.extend(f,{tweener:function(b3,b6){if(bI.isFunction(b3)){b6=b3;
b3=["*"]
}else{b3=b3.split(" ")
}var b5,e=0,b4=b3.length;
for(;
e<b4;
e++){b5=b3[e];
aY[b5]=aY[b5]||[];
aY[b5].unshift(b6)
}},prefilter:function(b3,e){if(e){az.unshift(b3)
}else{az.push(b3)
}}});
function h(b5,b9,e){var b4,cb,b7,ce,cf,cc,b6=this,ca={},b3=b5.style,b8=b5.nodeType&&N(b5),cd=bI._data(b5,"fxshow");
if(!e.queue){cf=bI._queueHooks(b5,"fx");
if(cf.unqueued==null){cf.unqueued=0;
cc=cf.empty.fire;
cf.empty.fire=function(){if(!cf.unqueued){cc()
}}
}cf.unqueued++;
b6.always(function(){b6.always(function(){cf.unqueued--;
if(!bI.queue(b5,"fx").length){cf.empty.fire()
}})
})
}if(b5.nodeType===1&&("height" in b9||"width" in b9)){e.overflow=[b3.overflow,b3.overflowX,b3.overflowY];
if(bI.css(b5,"display")==="inline"&&bI.css(b5,"float")==="none"){if(!bI.support.inlineBlockNeedsLayout||bD(b5.nodeName)==="inline"){b3.display="inline-block"
}else{b3.zoom=1
}}}if(e.overflow){b3.overflow="hidden";
if(!bI.support.shrinkWrapBlocks){b6.always(function(){b3.overflow=e.overflow[0];
b3.overflowX=e.overflow[1];
b3.overflowY=e.overflow[2]
})
}}for(b4 in b9){cb=b9[b4];
if(bQ.exec(cb)){delete b9[b4];
b7=b7||cb==="toggle";
if(cb===(b8?"hide":"show")){continue
}ca[b4]=cd&&cd[b4]||bI.style(b5,b4)
}}if(!bI.isEmptyObject(ca)){if(cd){if("hidden" in cd){b8=cd.hidden
}}else{cd=bI._data(b5,"fxshow",{})
}if(b7){cd.hidden=!b8
}if(b8){bI(b5).show()
}else{b6.done(function(){bI(b5).hide()
})
}b6.done(function(){var cg;
bI._removeData(b5,"fxshow");
for(cg in ca){bI.style(b5,cg,ca[cg])
}});
for(b4 in ca){ce=ba(b8?cd[b4]:0,b4,b6);
if(!(b4 in cd)){cd[b4]=ce.start;
if(b8){ce.end=ce.start;
ce.start=b4==="width"||b4==="height"?1:0
}}}}}function F(b4,b3,b6,e,b5){return new F.prototype.init(b4,b3,b6,e,b5)
}bI.Tween=F;
F.prototype={constructor:F,init:function(b5,b3,b7,e,b6,b4){this.elem=b5;
this.prop=b7;
this.easing=b6||"swing";
this.options=b3;
this.start=this.now=this.cur();
this.end=e;
this.unit=b4||(bI.cssNumber[b7]?"":"px")
},cur:function(){var e=F.propHooks[this.prop];
return e&&e.get?e.get(this):F.propHooks._default.get(this)
},run:function(b4){var b3,e=F.propHooks[this.prop];
if(this.options.duration){this.pos=b3=bI.easing[this.easing](b4,this.options.duration*b4,0,1,this.options.duration)
}else{this.pos=b3=b4
}this.now=(this.end-this.start)*b3+this.start;
if(this.options.step){this.options.step.call(this.elem,this.now,this)
}if(e&&e.set){e.set(this)
}else{F.propHooks._default.set(this)
}return this
}};
F.prototype.init.prototype=F.prototype;
F.propHooks={_default:{get:function(b3){var e;
if(b3.elem[b3.prop]!=null&&(!b3.elem.style||b3.elem.style[b3.prop]==null)){return b3.elem[b3.prop]
}e=bI.css(b3.elem,b3.prop,"");
return !e||e==="auto"?0:e
},set:function(e){if(bI.fx.step[e.prop]){bI.fx.step[e.prop](e)
}else{if(e.elem.style&&(e.elem.style[bI.cssProps[e.prop]]!=null||bI.cssHooks[e.prop])){bI.style(e.elem,e.prop,e.now+e.unit)
}else{e.elem[e.prop]=e.now
}}}}};
F.propHooks.scrollTop=F.propHooks.scrollLeft={set:function(e){if(e.elem.nodeType&&e.elem.parentNode){e.elem[e.prop]=e.now
}}};
bI.each(["toggle","show","hide"],function(b3,e){var b4=bI.fn[e];
bI.fn[e]=function(b5,b7,b6){return b5==null||typeof b5==="boolean"?b4.apply(this,arguments):this.animate(bH(e,true),b5,b7,b6)
}
});
bI.fn.extend({fadeTo:function(e,b5,b4,b3){return this.filter(N).css("opacity",0).show().end().animate({opacity:b5},e,b4,b3)
},animate:function(b8,b5,b7,b6){var b4=bI.isEmptyObject(b8),e=bI.speed(b5,b7,b6),b3=function(){var b9=f(this,bI.extend({},b8),e);
if(b4||bI._data(this,"finish")){b9.stop(true)
}};
b3.finish=b3;
return b4||e.queue===false?this.each(b3):this.queue(e.queue,b3)
},stop:function(b4,b3,e){var b5=function(b6){var b7=b6.stop;
delete b6.stop;
b7(e)
};
if(typeof b4!=="string"){e=b3;
b3=b4;
b4=aE
}if(b3&&b4!==false){this.queue(b4||"fx",[])
}return this.each(function(){var b9=true,b6=b4!=null&&b4+"queueHooks",b8=bI.timers,b7=bI._data(this);
if(b6){if(b7[b6]&&b7[b6].stop){b5(b7[b6])
}}else{for(b6 in b7){if(b7[b6]&&b7[b6].stop&&bP.test(b6)){b5(b7[b6])
}}}for(b6=b8.length;
b6--;
){if(b8[b6].elem===this&&(b4==null||b8[b6].queue===b4)){b8[b6].anim.stop(e);
b9=false;
b8.splice(b6,1)
}}if(b9||!e){bI.dequeue(this,b4)
}})
},finish:function(e){if(e!==false){e=e||"fx"
}return this.each(function(){var b5,b8=bI._data(this),b4=b8[e+"queue"],b3=b8[e+"queueHooks"],b7=bI.timers,b6=b4?b4.length:0;
b8.finish=true;
bI.queue(this,e,[]);
if(b3&&b3.stop){b3.stop.call(this,true)
}for(b5=b7.length;
b5--;
){if(b7[b5].elem===this&&b7[b5].queue===e){b7[b5].anim.stop(true);
b7.splice(b5,1)
}}for(b5=0;
b5<b6;
b5++){if(b4[b5]&&b4[b5].finish){b4[b5].finish.call(this)
}}delete b8.finish
})
}});
function bH(b4,b6){var b5,e={height:b4},b3=0;
b6=b6?1:0;
for(;
b3<4;
b3+=2-b6){b5=bS[b3];
e["margin"+b5]=e["padding"+b5]=b4
}if(b6){e.opacity=e.width=b4
}return e
}bI.each({slideDown:bH("show"),slideUp:bH("hide"),slideToggle:bH("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,b3){bI.fn[e]=function(b4,b6,b5){return this.animate(b3,b4,b6,b5)
}
});
bI.speed=function(b4,b5,b3){var e=b4&&typeof b4==="object"?bI.extend({},b4):{complete:b3||!b3&&b5||bI.isFunction(b4)&&b4,duration:b4,easing:b3&&b5||b5&&!bI.isFunction(b5)&&b5};
e.duration=bI.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in bI.fx.speeds?bI.fx.speeds[e.duration]:bI.fx.speeds._default;
if(e.queue==null||e.queue===true){e.queue="fx"
}e.old=e.complete;
e.complete=function(){if(bI.isFunction(e.old)){e.old.call(this)
}if(e.queue){bI.dequeue(this,e.queue)
}};
return e
};
bI.easing={linear:function(e){return e
},swing:function(e){return 0.5-Math.cos(e*Math.PI)/2
}};
bI.timers=[];
bI.fx=F.prototype.init;
bI.fx.tick=function(){var b4,b3=bI.timers,e=0;
J=bI.now();
for(;
e<b3.length;
e++){b4=b3[e];
if(!b4()&&b3[e]===b4){b3.splice(e--,1)
}}if(!b3.length){bI.fx.stop()
}J=aE
};
bI.fx.timer=function(e){if(e()&&bI.timers.push(e)){bI.fx.start()
}};
bI.fx.interval=13;
bI.fx.start=function(){if(!ab){ab=setInterval(bI.fx.tick,bI.fx.interval)
}};
bI.fx.stop=function(){clearInterval(ab);
ab=null
};
bI.fx.speeds={slow:600,fast:200,_default:400};
bI.fx.step={};
if(bI.expr&&bI.expr.filters){bI.expr.filters.animated=function(e){return bI.grep(bI.timers,function(b3){return e===b3.elem
}).length
}
}bI.fn.offset=function(b3){if(arguments.length){return b3===aE?this:this.each(function(b8){bI.offset.setOffset(this,b3,b8)
})
}var e,b7,b5={top:0,left:0},b4=this[0],b6=b4&&b4.ownerDocument;
if(!b6){return
}e=b6.documentElement;
if(!bI.contains(e,b4)){return b5
}if(typeof b4.getBoundingClientRect!==aA){b5=b4.getBoundingClientRect()
}b7=bo(b6);
return{top:b5.top+(b7.pageYOffset||e.scrollTop)-(e.clientTop||0),left:b5.left+(b7.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}
};
bI.offset={setOffset:function(b5,ce,b8){var b9=bI.css(b5,"position");
if(b9==="static"){b5.style.position="relative"
}var b7=bI(b5),b3=b7.offset(),e=bI.css(b5,"top"),cc=bI.css(b5,"left"),cd=(b9==="absolute"||b9==="fixed")&&bI.inArray("auto",[e,cc])>-1,cb={},ca={},b4,b6;
if(cd){ca=b7.position();
b4=ca.top;
b6=ca.left
}else{b4=parseFloat(e)||0;
b6=parseFloat(cc)||0
}if(bI.isFunction(ce)){ce=ce.call(b5,b8,b3)
}if(ce.top!=null){cb.top=(ce.top-b3.top)+b4
}if(ce.left!=null){cb.left=(ce.left-b3.left)+b6
}if("using" in ce){ce.using.call(b5,cb)
}else{b7.css(cb)
}}};
bI.fn.extend({position:function(){if(!this[0]){return
}var b4,b5,e={top:0,left:0},b3=this[0];
if(bI.css(b3,"position")==="fixed"){b5=b3.getBoundingClientRect()
}else{b4=this.offsetParent();
b5=this.offset();
if(!bI.nodeName(b4[0],"html")){e=b4.offset()
}e.top+=bI.css(b4[0],"borderTopWidth",true);
e.left+=bI.css(b4[0],"borderLeftWidth",true)
}return{top:b5.top-e.top-bI.css(b3,"marginTop",true),left:b5.left-e.left-bI.css(b3,"marginLeft",true)}
},offsetParent:function(){return this.map(function(){var e=this.offsetParent||bV;
while(e&&(!bI.nodeName(e,"html")&&bI.css(e,"position")==="static")){e=e.offsetParent
}return e||bV
})
}});
bI.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b4,b3){var e=/Y/.test(b3);
bI.fn[b4]=function(b5){return bI.access(this,function(b6,b9,b8){var b7=bo(b6);
if(b8===aE){return b7?(b3 in b7)?b7[b3]:b7.document.documentElement[b9]:b6[b9]
}if(b7){b7.scrollTo(!e?b8:bI(b7).scrollLeft(),e?b8:bI(b7).scrollTop())
}else{b6[b9]=b8
}},b4,b5,arguments.length,null)
}
});
function bo(e){return bI.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:false
}bI.each({Height:"height",Width:"width"},function(e,b3){bI.each({padding:"inner"+e,content:b3,"":"outer"+e},function(b4,b5){bI.fn[b5]=function(b9,b8){var b7=arguments.length&&(b4||typeof b9!=="boolean"),b6=b4||(b9===true||b8===true?"margin":"border");
return bI.access(this,function(cb,ca,cc){var cd;
if(bI.isWindow(cb)){return cb.document.documentElement["client"+e]
}if(cb.nodeType===9){cd=cb.documentElement;
return Math.max(cb.body["scroll"+e],cd["scroll"+e],cb.body["offset"+e],cd["offset"+e],cd["client"+e])
}return cc===aE?bI.css(cb,ca,b6):bI.style(cb,ca,cc,b6)
},b3,b7?b9:aE,b7,null)
}
})
});
bI.fn.size=function(){return this.length
};
bI.fn.andSelf=bI.fn.addBack;
if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=bI
}else{a1.jQuery=a1.$=bI;
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return bI
})
}}})(window);