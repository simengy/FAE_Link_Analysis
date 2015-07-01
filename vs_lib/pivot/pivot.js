(function(){var e,l,p,j,s,m,t,h,c,r,v,f,q,d,u,o,g,k=[].slice,a=[].indexOf||function(y){for(var x=0,w=this.length;
x<w;
x++){if(x in this&&this[x]===y){return x
}}return -1
},n=this,i={}.hasOwnProperty,b=function(w,x){return function(){return w.apply(x,arguments)
}
};
e=jQuery;
p=function(D,z,C){var B,w,A,y;
D+="";
w=D.split(".");
A=w[0];
y=w.length>1?C+w[1]:"";
B=/(\d+)(\d{3})/;
while(B.test(A)){A=A.replace(B,"$1"+z+"$2")
}return A+y
};
q=function(y,z,w,x){if(y==null){y=3
}if(z==null){z=1
}if(w==null){w=","
}if(x==null){x="."
}return function(A){if(isNaN(A)||!isFinite(A)){return""
}else{if(A==0){return"0"
}else{return p((z*A).toFixed(y),w,x)
}}}
};
j={sum:function(w,x){if(w==null){w=3
}if(x==null){x=1
}return function(z){var y;
y=z[0];
return function(){return{sum:0,push:function(A){if(!isNaN(parseFloat(A[y]))){return this.sum+=parseFloat(A[y])
}},value:function(){return this.sum
},format:q(w,x),label:"Sum of "+y}
}
}
},average:function(w,x){if(w==null){w=3
}if(x==null){x=1
}return function(z){var y;
y=z[0];
return function(){return{sum:0,len:0,push:function(A){if(!isNaN(parseFloat(A[y]))){this.sum+=parseFloat(A[y]);
return this.len++
}},value:function(){return this.sum/this.len
},format:q(w,x),label:"Average of "+y}
}
}
},sumOverSum:function(w,x){if(w==null){w=3
}if(x==null){x=1
}return function(y){var z,A;
A=y[0],z=y[1];
return function(){return{sumNum:0,sumDenom:0,push:function(B){if(!isNaN(parseFloat(B[A]))){this.sumNum+=parseFloat(B[A])
}if(!isNaN(parseFloat(B[z]))){return this.sumDenom+=parseFloat(B[z])
}},value:function(){return this.sumNum/this.sumDenom
},format:q(w,x),label:""+A+"/"+z}
}
}
},sumOverSumBound80:function(x,y,w){if(x==null){x=3
}if(y==null){y=1
}if(w==null){w=true
}return function(z){var A,B;
B=z[0],A=z[1];
return function(){return{sumNum:0,sumDenom:0,push:function(C){if(!isNaN(parseFloat(C[B]))){this.sumNum+=parseFloat(C[B])
}if(!isNaN(parseFloat(C[A]))){return this.sumDenom+=parseFloat(C[A])
}},value:function(){var C;
C=w?1:-1;
return(0.821187207574908/this.sumDenom+this.sumNum/this.sumDenom+1.2815515655446004*C*Math.sqrt(0.410593603787454/(this.sumDenom*this.sumDenom)+(this.sumNum*(1-this.sumNum/this.sumDenom))/(this.sumDenom*this.sumDenom)))/(1+1.642374415149816/this.sumDenom)
},format:q(x,y),label:""+(w?"Upper":"Lower")+" Bound of "+B+"/"+A}
}
}
},fractionOf:function(w,x){if(x==null){x="total"
}return function(){var y;
y=1<=arguments.length?k.call(arguments,0):[];
return function(A,B,z){return{selector:{total:[[],[]],row:[B,[]],col:[[],z]}[x],inner:w.apply(null,y)(A,B,z),push:function(C){return this.inner.push(C)
},format:function(C){return q(2)(100*C)+"%"
},label:w.apply(null,y)(A,B,z).label+" % of "+x,value:function(){return this.inner.value()/A.getAggregator.apply(A,this.selector).inner.value()
}}
}
}
},l10nWrapper:function(w,y,x){return function(){var z;
z=1<=arguments.length?k.call(arguments,0):[];
return function(B,C,A){return{inner:w.apply(null,z)(B,C,A),push:function(D){return this.inner.push(D)
},format:y,label:x(B),value:function(){return this.inner.value()
}}
}
}
}};
s={count:function(){return function(){return{count:0,push:function(){return this.count++
},value:function(){return this.count
},format:q(0),label:"Count"}
}
},countUnique:function(x){var w;
w=x[0];
return function(){return{uniq:[],push:function(y){var z;
if(z=y[w],a.call(this.uniq,z)<0){return this.uniq.push(y[w])
}},value:function(){return this.uniq.length
},format:q(0),label:"Count Unique "+w}
}
},listUnique:function(x){var w;
w=x[0];
return function(){return{uniq:[],push:function(y){var z;
if(z=y[w],a.call(this.uniq,z)<0){return this.uniq.push(y[w])
}},value:function(){return this.uniq.join(", ")
},format:function(y){return y
},label:"List Unique "+w}
}
},intSum:j.sum(0),sum:j.sum(3),average:j.average(3)};
s.sumAsFractionOfTotal=j.fractionOf(s.sum);
s.sumAsFractionOfRow=j.fractionOf(s.sum,"row");
s.sumAsFractionOfCol=j.fractionOf(s.sum,"col");
s.countAsFractionOfTotal=j.fractionOf(s.count);
s.countAsFractionOfRow=j.fractionOf(s.count,"row");
s.countAsFractionOfCol=j.fractionOf(s.count,"col");
u={Table:function(x,w){return d(x,w)
},"Table BarChart":function(x,w){return e(d(x,w)).barchart()
},Heatmap:function(x,w){return e(d(x,w)).heatmap()
},"Row Heatmap":function(x,w){return e(d(x,w)).heatmap("rowheatmap")
},"Col Heatmap":function(x,w){return e(d(x,w)).heatmap("colheatmap")
}};
v=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
g=function(w){return("0"+w).substr(-2,2)
};
h={bin:function(w,x){return function(y){return y[w]-y[w]%x
}
},dateFormat:function(x,w){return function(y){var z;
z=new Date(Date.parse(y[x]));
if(isNaN(z)){return""
}return w.replace(/%(.)/g,function(A,B){switch(B){case"y":return z.getFullYear();
case"m":return g(z.getMonth()+1);
case"n":return v[z.getMonth()];
case"d":return g(z.getDate());
case"w":return t[z.getDay()];
case"x":return z.getDay();
case"H":return g(z.getHours());
case"M":return g(z.getMinutes());
case"S":return g(z.getSeconds());
default:return"%"+B
}})
}
}};
f=function(z,D){var C,y,A,B,E,x,w;
x=/(\d+)|(\D+)/g;
E=/\d/;
w=/^0/;
if(typeof z==="number"||typeof D==="number"){if(isNaN(z)){return 1
}if(isNaN(D)){return -1
}return z-D
}C=String(z).toLowerCase();
A=String(D).toLowerCase();
if(C===A){return 0
}if(!(E.test(C)&&E.test(A))){return(C>A?1:-1)
}C=C.match(x);
A=A.match(x);
while(C.length&&A.length){y=C.shift();
B=A.shift();
if(y!==B){if(E.test(y)&&E.test(B)){return y.replace(w,".0")-B.replace(w,".0")
}else{return(y>B?1:-1)
}}}return C.length-A.length
};
e.pivotUtilities={aggregatorTemplates:j,aggregators:s,renderers:u,derivers:h,naturalSort:f,numberFormat:q};
c=function(I,K,F){var J,y,D,B,z,E,G,A,H,C,x,w;
if(e.isEmptyObject(K)){J=F
}else{J=function(L){var N,M,O;
for(N in K){M=K[N];
L[N]=(O=M(L))!=null?O:L[N]
}return F(L)
}
}if(e.isFunction(I)){return I(J)
}else{if(e.isArray(I)){if(e.isArray(I[0])){x=[];
for(D in I){if(!i.call(I,D)){continue
}y=I[D];
if(!(D>0)){continue
}E={};
C=I[0];
for(B in C){if(!i.call(C,B)){continue
}z=C[B];
E[z]=y[B]
}x.push(J(E))
}return x
}else{w=[];
for(A=0,H=I.length;
A<H;
A++){E=I[A];
w.push(J(E))
}return w
}}else{if(I instanceof jQuery){G=[];
e("thead > tr > th",I).each(function(L){return G.push(e(this).text())
});
return e("tbody > tr",I).each(function(L){E={};
e("td",this).each(function(M){return E[G[M]]=e(this).text()
});
return J(E)
})
}else{throw new Error("unknown input format")
}}}};
m=function(x){var w;
w=[];
c(x,{},function(y){return w.push(y)
});
return w
};
l=(function(){function w(y,x,z){this.aggregator=y;
this.colAttrs=x;
this.rowAttrs=z;
this.getAggregator=b(this.getAggregator,this);
this.getRowKeys=b(this.getRowKeys,this);
this.getColKeys=b(this.getColKeys,this);
this.sortKeys=b(this.sortKeys,this);
this.arrSort=b(this.arrSort,this);
this.natSort=b(this.natSort,this);
this.tree={};
this.rowKeys=[];
this.colKeys=[];
this.rowTotals={};
this.colTotals={};
this.allTotal=this.aggregator(this,[],[]);
this.sorted=false
}w.prototype.natSort=function(x,y){return f(x,y)
};
w.prototype.arrSort=function(y,x){return this.natSort(y.join(),x.join())
};
w.prototype.sortKeys=function(){if(!this.sorted){this.rowKeys.sort(this.arrSort);
this.colKeys.sort(this.arrSort)
}return this.sorted=true
};
w.prototype.getColKeys=function(){this.sortKeys();
return this.colKeys
};
w.prototype.getRowKeys=function(){this.sortKeys();
return this.rowKeys
};
w.prototype.processRecord=function(H){var G,K,I,z,L,E,D,J,y,F,C,B,A;
G=[];
z=[];
F=this.colAttrs;
for(E=0,J=F.length;
E<J;
E++){L=F[E];
G.push((C=H[L])!=null?C:"null")
}B=this.rowAttrs;
for(D=0,y=B.length;
D<y;
D++){L=B[D];
z.push((A=H[L])!=null?A:"null")
}I=z.join(String.fromCharCode(0));
K=G.join(String.fromCharCode(0));
this.allTotal.push(H);
if(z.length!==0){if(!this.rowTotals[I]){this.rowKeys.push(z);
this.rowTotals[I]=this.aggregator(this,z,[])
}this.rowTotals[I].push(H)
}if(G.length!==0){if(!this.colTotals[K]){this.colKeys.push(G);
this.colTotals[K]=this.aggregator(this,[],G)
}this.colTotals[K].push(H)
}if(G.length!==0&&z.length!==0){if(!this.tree[I]){this.tree[I]={}
}if(!this.tree[I][K]){this.tree[I][K]=this.aggregator(this,z,G)
}return this.tree[I][K].push(H)
}};
w.prototype.getAggregator=function(B,z){var x,A,y;
y=B.join(String.fromCharCode(0));
A=z.join(String.fromCharCode(0));
if(B.length===0&&z.length===0){x=this.allTotal
}else{if(B.length===0){x=this.colTotals[A]
}else{if(z.length===0){x=this.rowTotals[y]
}else{x=this.tree[y][A]
}}}return x!=null?x:{value:(function(){return null
}),format:function(){return""
}}
};
return w
})();
r=function(w,A,z,C,x,B){var y;
y=new l(C,A,z);
c(w,B,function(D){if(x(D)){return y.processRecord(D)
}});
return y
};
o=function(C,B,A){var D,w,E,F,z,y;
if(B!==0){w=true;
for(F=z=0;
0<=A?z<=A:z>=A;
F=0<=A?++z:--z){if(C[B-1][F]!==C[B][F]){w=false
}}if(w){return -1
}}D=0;
while(B+D<C.length){E=false;
for(F=y=0;
0<=A?y<=A:y>=A;
F=0<=A?++y:--y){if(C[B][F]!==C[B+D][F]){E=true
}}if(E){break
}D++
}return D
};
d=function(H,F){var K,O,P,Q,y,C,M,L,I,D,N,E,R,A,z,J,w,G,S,B;
C={localeStrings:{totals:"Totals"}};
F=e.extend(C,F);
P=H.colAttrs;
N=H.rowAttrs;
R=H.getRowKeys();
y=H.getColKeys();
D=document.createElement("table");
D.className="pvtTable";
for(L in P){if(!i.call(P,L)){continue
}O=P[L];
w=document.createElement("tr");
if(parseInt(L)===0&&N.length!==0){z=document.createElement("th");
z.setAttribute("colspan",N.length);
z.setAttribute("rowspan",P.length);
w.appendChild(z)
}z=document.createElement("th");
z.className="pvtAxisLabel";
z.textContent=O;
w.appendChild(z);
for(M in y){if(!i.call(y,M)){continue
}Q=y[M];
B=o(y,parseInt(M),parseInt(L));
if(B!==-1){z=document.createElement("th");
z.className="pvtColLabel";
z.textContent=Q[L];
z.setAttribute("colspan",B);
if(parseInt(L)===P.length-1&&N.length!==0){z.setAttribute("rowspan",2)
}w.appendChild(z)
}}if(parseInt(L)===0){z=document.createElement("th");
z.className="pvtTotalLabel";
z.textContent=F.localeStrings.totals;
z.setAttribute("rowspan",P.length+(N.length===0?0:1));
w.appendChild(z)
}D.appendChild(w)
}if(N.length!==0){w=document.createElement("tr");
for(M in N){if(!i.call(N,M)){continue
}I=N[M];
z=document.createElement("th");
z.className="pvtAxisLabel";
z.textContent=I;
w.appendChild(z)
}z=document.createElement("th");
if(P.length===0){z.className="pvtTotalLabel";
z.textContent=F.localeStrings.totals
}w.appendChild(z);
D.appendChild(w)
}for(M in R){if(!i.call(R,M)){continue
}E=R[M];
w=document.createElement("tr");
for(L in E){if(!i.call(E,L)){continue
}G=E[L];
B=o(R,parseInt(M),parseInt(L));
if(B!==-1){z=document.createElement("th");
z.className="pvtRowLabel";
z.textContent=G;
z.setAttribute("rowspan",B);
if(parseInt(L)===N.length-1&&P.length!==0){z.setAttribute("colspan",2)
}w.appendChild(z)
}}for(L in y){if(!i.call(y,L)){continue
}Q=y[L];
K=H.getAggregator(E,Q);
S=K.value();
A=document.createElement("td");
A.className="pvtVal row"+M+" col"+L;
A.textContent=K.format(S);
A.setAttribute("data-value",S);
w.appendChild(A)
}J=H.getAggregator(E,[]);
S=J.value();
A=document.createElement("td");
A.className="pvtTotal rowTotal";
A.textContent=J.format(S);
A.setAttribute("data-value",S);
A.setAttribute("data-for","row"+M);
w.appendChild(A);
D.appendChild(w)
}w=document.createElement("tr");
z=document.createElement("th");
z.className="pvtTotalLabel";
z.textContent=F.localeStrings.totals;
z.setAttribute("colspan",N.length+(P.length===0?0:1));
w.appendChild(z);
for(L in y){if(!i.call(y,L)){continue
}Q=y[L];
J=H.getAggregator([],Q);
S=J.value();
A=document.createElement("td");
A.className="pvtTotal colTotal";
A.textContent=J.format(S);
A.setAttribute("data-value",S);
A.setAttribute("data-for","col"+L);
w.appendChild(A)
}J=H.getAggregator([],[]);
S=J.value();
A=document.createElement("td");
A.className="pvtGrandTotal";
A.textContent=J.format(S);
A.setAttribute("data-value",S);
w.appendChild(A);
D.appendChild(w);
D.setAttribute("data-numrows",R.length);
D.setAttribute("data-numcols",y.length);
return D
};
e.fn.pivot=function(z,B){var D,C,A,y,w;
D={cols:[],rows:[],filter:function(){return true
},aggregator:s.count(),derivedAttributes:{},renderer:d,rendererOptions:null,localeStrings:{renderError:"An error occurred rendering the PivotTable results.",computeError:"An error occurred computing the PivotTable results."}};
B=e.extend(D,B);
y=null;
try{A=r(z,B.cols,B.rows,B.aggregator,B.filter,B.derivedAttributes);
try{y=B.renderer(A,B.rendererOptions)
}catch(E){C=E;
if(typeof console!=="undefined"&&console!==null){console.error(C.stack)
}y=e("<span>").text(B.localeStrings.renderError)
}}catch(E){C=E;
if(typeof console!=="undefined"&&console!==null){console.error(C.stack)
}y=e("<span>").text(B.localeStrings.computeError)
}w=this[0];
while(w.hasChildNodes()){w.removeChild(w.lastChild)
}return this.append(y)
};
e.fn.pivotUI=function(w,U,Z){var G,D,al,H,T,aj,ak,ah,ae,O,Q,am,L,W,P,C,N,ac,ab,V,X,R,ai,ag,af,ad,M,B,A,z,Y,K,J,I,F,E,y=this,aa;
if(Z==null){Z=false
}T={derivedAttributes:{},aggregators:s,renderers:u,hiddenAttributes:[],menuLimit:200,cols:[],rows:[],vals:[],exclusions:{},unusedAttrsVertical:false,autoSortUnusedAttrs:false,rendererOptions:null,onRefresh:null,filter:function(){return true
},localeStrings:{renderError:"An error occurred rendering the PivotTable results.",computeError:"An error occurred computing the PivotTable results.",uiRenderError:"An error occurred rendering the PivotTable UI.",selectAll:"Select All",selectNone:"Select None",tooMany:"(too many to list)",filterResults:"Filter results"}};
ak=this.data("pivotUIOptions");
if((ak==null)||Z){O=e.extend(T,U)
}else{O=ak
}try{w=m(w);
N=(function(){var an,x;
an=w[0];
x=[];
for(ae in an){if(!i.call(an,ae)){continue
}x.push(ae)
}return x
})();
Y=O.derivedAttributes;
for(al in Y){if(!i.call(Y,al)){continue
}if((a.call(N,al)<0)){N.push(al)
}}D={};
for(ai=0,M=N.length;
ai<M;
ai++){X=N[ai];
D[X]={}
}c(w,O.derivedAttributes,function(an){var ao,ap,x;
x=[];
for(ae in an){if(!i.call(an,ae)){continue
}ao=an[ae];
if(!(O.filter(an))){continue
}if(ao==null){ao="null"
}if((ap=D[ae])[ao]==null){ap[ao]=0
}x.push(D[ae][ao]++)
}return x
});
V=e("<table cellpadding='5'>");
aa=e("<div class='filterContainer'>");
P=e("<td class='pvtAxisContainer'>").css({dispaly:"none"});
W=e("<select class='pvtRenderer'>").bind("change",function(){return am()
});
K=O.renderers;
for(X in K){if(!i.call(K,X)){continue
}W.append(e("<option>").val(X).text(X))
}P.append(W);
H=e("<td class='pvtAxisContainer pvtUnused'>");
if(O.unusedAttrsVertical){H.addClass("pvtVertList")
}else{H.addClass("pvtHorizList")
}C=(function(){var ao,an,x;
x=[];
for(ao=0,an=N.length;
ao<an;
ao++){al=N[ao];
if(a.call(O.hiddenAttributes,al)<0){x.push(al)
}}return x
})();
R=function(ax){var aA,at,an,aq,av,ay,aC,aB,au,aw,az,ao,ar,x,ap;
aC=(function(){var aD;
aD=[];
for(ae in D[ax]){aD.push(ae)
}return aD
})();
ay=false;
ao=e("<div>").addClass("pvtFilterBox").hide();
ao.append(e("<h4>").text(""+ax+" ("+aC.length+")"));
if(aC.length>O.menuLimit){ao.append(e("<p>").text(O.localeStrings.tooMany))
}else{at=e("<p>").addClass("check_uncheck_buttons");
at.append(e("<button>").addClass("checked").text(O.localeStrings.selectAll).bind("click",function(){return ao.find("input").prop("checked",true)
}));
at.append(e("<button>").addClass("unchecked").text(O.localeStrings.selectNone).bind("click",function(){return ao.find("input").prop("checked",false)
}));
at.append(e("<input>").addClass("pvtSearch").attr("placeholder",O.localeStrings.filterResults).bind("keyup",function(){var aD;
aD=e(this).val().toLowerCase();
return e(this).parents(".pvtFilterBox").find("label span").each(function(){var aE;
aE=this.innerText.toLowerCase().indexOf(aD);
if(aE!==-1){return e(this).parent().show()
}else{return e(this).parent().hide()
}})
}));
ao.append(at);
an=e("<div>").addClass("pvtCheckContainer");
ap=aC.sort(f);
for(ar=0,x=ap.length;
ar<x;
ar++){ae=ap[ar];
az=D[ax][ae];
aq=e("<label>");
av=O.exclusions[ax]?(a.call(O.exclusions[ax],ae)>=0):false;
ay||(ay=av);
aq.append(e("<input type='checkbox' class='pvtFilter'>").attr("checked",!av).data("filter",[ax,ae]));
aq.append(e("<span>").text(""+ae+" ("+az+")"));
an.append(e("<p>").append(aq))
}ao.append(an)
}aw=function(){var aD;
aD=e(ao).find("[type='checkbox']").length-e(ao).find("[type='checkbox']:checked").length;
if(aD>0){aA.addClass("pvtFilteredAttribute")
}else{aA.removeClass("pvtFilteredAttribute")
}if(aC.length>O.menuLimit){return ao.toggle()
}else{return ao.toggle(0,am)
}};
ao.append(e("<p>").append(e("<button>").text("OK").bind("click",aw)));
aB=function(aE){var aF=e(this).offset();
var aD=e(this).position();
console.log(e(this).offset());
console.log(e(this).position());
e(".pvtFilterBox").css({display:"none"});
ao.css({left:aD.left,top:aD.top+10,position:"absolute"}).toggle();
e(".pvtSearch").val("");
return e("label").show()
};
au=e("<span class='pvtTriangle'>").html(" &#x25BE;").bind("click",aB);
aA=e("<li class='axis_"+ah+"'>").append(e("<span class='pvtAttr'>").text(ax).data("attrName",ax).append(au));
if(ay){aA.addClass("pvtFilteredAttribute")
}H.append(aA).append(ao);
return aA.bind("dblclick",aB)
};
for(ah in C){al=C[ah];
R(al)
}ac=e("<tr>");
G=e("<select class='pvtAggregator'>").bind("change",function(){return am()
});
J=O.aggregators;
for(X in J){if(!i.call(J,X)){continue
}G.append(e("<option>").val(X).text(X))
}ac.append(e("<td class='pvtAxisContainer pvtHorizList pvtVals'>").append(G).append(e("<br>")));
ac.append(e("<td class='pvtAxisContainer pvtHorizList pvtCols'>"));
V.append(ac);
ab=e("<tr>");
ab.append(e("<td valign='top' class='pvtAxisContainer pvtRows'>"));
Q=e("<td valign='top' class='pvtRendererArea'>");
ab.append(Q);
V.append(ab);
if(O.unusedAttrsVertical){V.find("tr:nth-child(1)").prepend(P);
V.find("tr:nth-child(2)").prepend(H)
}else{V.prepend(e("<tr>").append(P).append(H))
}this.html(V);
I=O.cols;
for(ag=0,B=I.length;
ag<B;
ag++){X=I[ag];
this.find(".pvtCols").append(this.find(".axis_"+(C.indexOf(X))))
}F=O.rows;
for(af=0,A=F.length;
af<A;
af++){X=F[af];
this.find(".pvtRows").append(this.find(".axis_"+(C.indexOf(X))))
}E=O.vals;
for(ad=0,z=E.length;
ad<z;
ad++){X=E[ad];
this.find(".pvtVals").append(this.find(".axis_"+(C.indexOf(X))))
}if(O.aggregatorName!=null){this.find(".pvtAggregator").val(O.aggregatorName)
}if(O.rendererName!=null){this.find(".pvtRenderer").val(O.rendererName)
}L=function(){var ao,ar,x,an,ap,aq;
an={derivedAttributes:O.derivedAttributes,localeStrings:O.localeStrings,rendererOptions:O.rendererOptions,cols:[],rows:[]};
aq=[];
y.find(".pvtRows li span.pvtAttr").each(function(){return an.rows.push(e(this).data("attrName"))
});
y.find(".pvtCols li span.pvtAttr").each(function(){return an.cols.push(e(this).data("attrName"))
});
y.find(".pvtVals li span.pvtAttr").each(function(){return aq.push(e(this).data("attrName"))
});
an.aggregator=O.aggregators[G.val()](aq);
an.renderer=O.renderers[W.val()];
ao={};
y.find("input.pvtFilter").not(":checked").each(function(){var at;
at=e(this).data("filter");
if(ao[at[0]]!=null){return ao[at[0]].push(at[1])
}else{return ao[at[0]]=[at[1]]
}});
an.filter=function(at){var av,au;
if(!O.filter(at)){return false
}for(ae in ao){av=ao[ae];
if(au=""+at[ae],a.call(av,au)>=0){return false
}}return true
};
Q.pivot(w,an);
x={cols:an.cols,rows:an.rows,vals:aq,exclusions:ao,hiddenAttributes:O.hiddenAttributes,renderers:O.renderers,aggregators:O.aggregators,filter:O.filter,derivedAttributes:O.derivedAttributes,aggregatorName:G.val(),rendererName:W.val(),localeStrings:O.localeStrings,rendererOptions:O.rendererOptions};
y.data("pivotUIOptions",x);
if(O.autoSortUnusedAttrs){ar=e.pivotUtilities.naturalSort;
ap=y.find("td.pvtUnused.pvtAxisContainer");
e(ap).children("li").sort(function(au,at){return ar(e(au).text(),e(at).text())
}).appendTo(ap)
}Q.css("opacity",1);
if(O.onRefresh!=null){return O.onRefresh(x)
}};
am=function(){Q.css("opacity",0.5);
return setTimeout(L,10)
};
am();
this.find(".pvtAxisContainer").sortable({update:function(an,x){if(x.sender==null){return am()
}},connectWith:this.find(".pvtAxisContainer"),items:"li",placeholder:"pvtPlaceholder"})
}catch(S){aj=S;
if(typeof console!=="undefined"&&console!==null){console.error(aj.stack)
}this.html(O.localeStrings.uiRenderError)
}return this
};
e.fn.heatmap=function(F){var D,E,A,z,w,C,y,x,B=this;
if(F==null){F="heatmap"
}C=this.data("numrows");
w=this.data("numcols");
D=function(H,I,G){var J;
J=(function(){switch(H){case"red":return function(K){return"ff"+K+K
};
case"green":return function(K){return""+K+"ff"+K
};
case"blue":return function(K){return""+K+K+"ff"
}
}})();
return function(L){var M,K;
K=255-Math.round(255*(L-I)/(G-I));
M=K.toString(16).split(".")[0];
if(M.length===1){M=0+M
}return J(M)
}
};
E=function(K,J){var I,G,H;
G=function(L){return B.find(K).each(function(){var M;
M=e(this).data("value");
if((M!=null)&&isFinite(M)){return L(M,e(this))
}})
};
H=[];
G(function(L){return H.push(L)
});
I=D(J,Math.min.apply(Math,H),Math.max.apply(Math,H));
return G(function(L,M){return M.css("background-color","#"+I(L))
})
};
switch(F){case"heatmap":E(".pvtVal","red");
break;
case"rowheatmap":for(A=y=0;
0<=C?y<C:y>C;
A=0<=C?++y:--y){E(".pvtVal.row"+A,"red")
}break;
case"colheatmap":for(z=x=0;
0<=w?x<w:x>w;
z=0<=w?++x:--x){E(".pvtVal.col"+z,"red")
}}E(".pvtTotal.rowTotal","red");
E(".pvtTotal.colTotal","red");
return this
};
e.fn.barchart=function(){var w,x,A,z,y,B=this;
z=this.data("numrows");
A=this.data("numcols");
w=function(F){var D,C,G,E;
D=function(H){return B.find(F).each(function(){var I;
I=e(this).data("value");
if((I!=null)&&isFinite(I)){return H(I,e(this))
}})
};
E=[];
D(function(H){return E.push(H)
});
C=Math.max.apply(Math,E);
G=function(H){return 100*H/(1.4*C)
};
return D(function(H,I){var J,K;
J=I.text();
K=e("<div>").css({position:"relative",height:"55px"});
K.append(e("<div>").css({position:"absolute",bottom:0,left:0,right:0,height:G(H)+"%","background-color":"gray"}));
K.append(e("<div>").text(J).css({position:"relative","padding-left":"5px","padding-right":"5px"}));
return I.css({padding:0,"padding-top":"5px","text-align":"center"}).html(K)
})
};
for(x=y=0;
0<=z?y<z:y>z;
x=0<=z?++y:--y){w(".pvtVal.row"+x)
}w(".pvtTotal.colTotal");
return this
}
}).call(this);