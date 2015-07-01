(function(q){var h=q.Chart,G=q.addEvent,c=q.removeEvent,l=q.createElement,i=q.discardElement,w=q.css,g=q.merge,b=q.each,e=q.extend,a=Math.max,m=document,d=window,H=q.isTouchDevice,z=q.Renderer.prototype.symbols,v=q.getOptions(),s;
e(v.lang,{printChart:"Print chart",email:"Email",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});
v.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:H?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};
v.exporting={type:"image/png",url:"rest/export/charts",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()
}},{separator:!0},{textKey:"email",onclick:function(o){$("#emailZoom").fadeIn(400);
var x=this;
var t={type:"image/png"},r=x.options.exporting,r=x.getSVG(g({chart:{borderRadius:0}},r.chartOptions,{exporting:{sourceWidth:t.sourceWidth||r.sourceWidth,sourceHeight:t.sourceHeight||r.sourceHeight}})),t=g(x.options.exporting,t);
var f=this.renderTo.id;
var j=document.querySelector("[ng-controller]")||document.querySelector("[data-ng-controller]");
var k=angular.element(j);
var n=k.injector();
var p=n.get("CommonService");
var u=n.get("$timeout");
p.openModal(null,null,function(A,B,y){A.header="Email";
A.content="app/partials/vsBase/email.html";
A.disable=false;
A.submit=function(C){A.loading=true;
A.disable=true;
$.ajax({type:"POST",url:"rest/export/mail",headers:{"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")},data:{attachment:r,body:C.message,recepients:C.email,subject:C.subject,appName:n.get("APPLICATION_NAME")},beforeSend:function(){},success:function(D){if(D.error){$("#errorSpan").css({color:"red"}).html(D.error).show();
if(!A.$$phase){A.$apply(function(){A.loading=false;
A.disable=false
})
}}else{if(D.success){if(!A.$$phase){A.$apply(function(){A.loading=false;
A.disable=false
})
}$("#errorSpan").css({color:"green"}).html(D.success).show().fadeOut(3500);
u(function(){A.cancel();
if(!A.$$phase){$scope.$apply(function(){A.loading=false;
A.disable=false
})
}},3000)
}}},error:function(){$("#errorSpan").css({color:"red"}).html("Something went wrong ... ").show();
A.loading=false;
A.disable=false
}})
};
A.reset=function(C){C.user={}
}
})
}},{textKey:"downloadPNG",onclick:function(){this.exportChart()
}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})
}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})
}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})
}}]}}};
q.post=function(n,j){var k,f;
f=l("form",{method:"post",action:n},{display:"none"},m.body);
j["X-CSRF-TOKEN"]=$("meta[name='_csrf']").attr("content");
for(k in j){l("input",{type:"hidden",name:k,value:j[k]},null,f)
}f.submit();
i(f)
};
e(h.prototype,{getSVG:function(r){var j=this,p,f,o,k,n=g(j.options,r);
if(!m.createElementNS){m.createElementNS=function(u,t){return m.createElement(t)
}
}r=l("div",null,{position:"absolute",top:"-9999em",width:j.chartWidth+"px",height:j.chartHeight+"px"},m.body);
f=j.renderTo.style.width;
k=j.renderTo.style.height;
f=n.exporting.sourceWidth||n.chart.width||/px$/.test(f)&&parseInt(f,10)||600;
k=n.exporting.sourceHeight||n.chart.height||/px$/.test(k)&&parseInt(k,10)||400;
e(n.chart,{animation:!1,renderTo:r,forExport:!0,width:f,height:k});
n.exporting.enabled=!1;
n.series=[];
b(j.series,function(t){o=g(t.options,{animation:!1,showCheckbox:!1,visible:t.visible});
o.isInternal||n.series.push(o)
});
p=new q.Chart(n,j.callback);
b(["xAxis","yAxis"],function(t){b(j[t],function(u,B){var y=p[t][B],A=u.getExtremes(),x=A.userMin,A=A.userMax;
y&&(x!==void 0||A!==void 0)&&y.setExtremes(x,A,!0,!1)
})
});
f=p.container.innerHTML;
n=null;
p.destroy();
i(r);
f=f.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g," ").replace(/&shy;/g,"�").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(t){return t.toLowerCase()
});
return f=f.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")
},exportChart:function(k,f){var k=k||{},j=this.options.exporting,j=this.getSVG(g({chart:{borderRadius:0},title:{text:""}},j.chartOptions,f,{exporting:{sourceWidth:k.sourceWidth||j.sourceWidth,sourceHeight:k.sourceHeight||j.sourceHeight}})),k=g(this.options.exporting,k);
q.post(k.url,{filename:k.filename||"chart",type:k.type,width:k.width||0,scale:k.scale||2,svg:j})
},print:function(){var r=this,k=r.container,p=[],j=k.parentNode,o=m.body,n=o.childNodes;
if(!r.isPrinting){r.isPrinting=!0,b(n,function(t,f){if(t.nodeType===1){p[f]=t.style.display,t.style.display="none"
}}),o.appendChild(k),d.focus(),d.print(),setTimeout(function(){j.appendChild(k);
b(n,function(t,f){if(t.nodeType===1){t.style.display=p[f]
}});
r.isPrinting=!1
},1000)
}},contextMenu:function(K,M,J,L,F,D,E){var I=this,B=I.options.navigation,t=B.menuItemStyle,A=I.chartWidth,y=I.chartHeight,u="cache-"+K,C=I[u],r=a(F,D),p,k,x;
if(!C){I[u]=C=l("div",{className:K},{position:"absolute",zIndex:1000,padding:r+"px"},I.container),p=l("div",null,e({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},B.menuStyle),C),k=function(){w(C,{display:"none"});
E&&E.setState(0);
I.openMenu=!1
},G(C,"mouseleave",function(){x=setTimeout(k,500)
}),G(C,"mouseenter",function(){clearTimeout(x)
}),G(document,"mouseup",function(f){I.pointer.inClass(f.target,K)||k()
}),b(M,function(j){if(j){var f=j.separator?l("hr",null,null,p):l("div",{onmouseover:function(){w(this,B.menuItemHoverStyle)
},onmouseout:function(){w(this,t)
},onclick:function(){k();
j.onclick.apply(I,arguments)
},innerHTML:j.text||I.options.lang[j.textKey]},e({cursor:"pointer"},t),p);
I.exportDivElements.push(f)
}}),I.exportDivElements.push(p,C),I.exportMenuWidth=C.offsetWidth,I.exportMenuHeight=C.offsetHeight
}M={display:"block"};
J+I.exportMenuWidth>A?M.right=A-J-F-r+"px":M.left=J-r+"px";
L+D+I.exportMenuHeight>y&&E.alignOptions.verticalAlign!=="top"?M.bottom=y-L-r+"px":M.top=L+D-r+"px";
w(C,M);
I.openMenu=!0
},addButton:function(D){var F=this,C=F.renderer,E=g(F.options.navigation.buttonOptions,D),u=E.onclick,y=E.menuItems,A,B,t={stroke:E.symbolStroke,fill:E.symbolFill},f=E.symbolSize||12;
if(!F.btnCount){F.btnCount=0
}if(!F.exportDivElements){F.exportDivElements=[],F.exportSVGElements=[]
}if(E.enabled!==!1){var r=E.theme,p=r.states,o=p&&p.hover,p=p&&p.select,x;
delete r.states;
u?x=function(){u.apply(F,arguments)
}:y&&(x=function(){F.contextMenu(B.menuClassName,y,B.translateX,B.translateY,B.width,B.height,B);
B.setState(2)
});
E.text&&E.symbol?r.paddingLeft=q.pick(r.paddingLeft,25):E.text||e(r,{width:E.width,height:E.height,padding:0});
B=C.button(E.text,0,0,x,r,o,p).attr({title:F.options.lang[E._titleKey],"stroke-linecap":"round"});
B.menuClassName=D.menuClassName||"highcharts-menu-"+F.btnCount++;
E.symbol&&(A=C.symbol(E.symbol,E.symbolX-f/2,E.symbolY-f/2,f,f).attr(e(t,{"stroke-width":E.symbolStrokeWidth||1,zIndex:1})).add(B));
B.add().align(e(E,{width:B.width,x:q.pick(E.x,s)}),!0,"spacingBox");
s+=(B.width+E.buttonSpacing)*(E.align==="right"?-1:1);
F.exportSVGElements.push(B,A)
}},destroyExport:function(k){var k=k.target,f,j;
for(f=0;
f<k.exportSVGElements.length;
f++){if(j=k.exportSVGElements[f]){j.onclick=j.ontouchstart=null,k.exportSVGElements[f]=j.destroy()
}}for(f=0;
f<k.exportDivElements.length;
f++){j=k.exportDivElements[f],c(j,"mouseleave"),k.exportDivElements[f]=j.onmouseout=j.onmouseover=j.ontouchstart=j.onclick=null,i(j)
}}});
z.menu=function(n,j,k,f){return["M",n,j+2.5,"L",n+k,j+2.5,"M",n,j+f/2+0.5,"L",n+k,j+f/2+0.5,"M",n,j+f-1.5,"L",n+k,j+f-1.5]
};
h.prototype.callbacks.push(function(n){var j,k=n.options.exporting,f=k.buttons;
s=0;
if(k.enabled!==!1){for(j in f){n.addButton(f[j])
}G(n,"destroy",n.destroyExport)
}})
})(Highcharts);