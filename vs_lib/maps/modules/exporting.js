(function(q){var h=q.Chart,z=q.addEvent,e=q.removeEvent,i=q.createElement,g=q.discardElement,w=q.css,m=q.merge,b=q.each,d=q.extend,a=Math.max,n=document,c=window,H=q.isTouchDevice,x=q.Renderer.prototype.symbols,G=q.getOptions(),u;
d(G.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});
G.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:H?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};
G.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()
}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()
}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})
}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})
}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})
}}]}}};
q.post=function(f,j,k){var l,f=i("form",m({method:"post",action:f,enctype:"multipart/form-data"},k),{display:"none"},n.body);
for(l in j){i("input",{type:"hidden",name:l,value:j[l]},null,f)
}f.submit();
g(f)
};
d(h.prototype,{getSVG:function(f){var j=this,p,r,o,k,l=m(j.options,f);
if(!n.createElementNS){n.createElementNS=function(t,s){return n.createElement(s)
}
}f=i("div",null,{position:"absolute",top:"-9999em",width:j.chartWidth+"px",height:j.chartHeight+"px"},n.body);
r=j.renderTo.style.width;
k=j.renderTo.style.height;
r=l.exporting.sourceWidth||l.chart.width||/px$/.test(r)&&parseInt(r,10)||600;
k=l.exporting.sourceHeight||l.chart.height||/px$/.test(k)&&parseInt(k,10)||400;
d(l.chart,{animation:!1,renderTo:f,forExport:!0,width:r,height:k});
l.exporting.enabled=!1;
l.series=[];
b(j.series,function(s){o=m(s.options,{animation:!1,showCheckbox:!1,visible:s.visible});
o.isInternal||l.series.push(o)
});
p=new q.Chart(l,j.callback);
b(["xAxis","yAxis"],function(s){b(j[s],function(t,B){var y=p[s][B],A=t.getExtremes(),v=A.userMin,A=A.userMax;
y&&(v!==void 0||A!==void 0)&&y.setExtremes(v,A,!0,!1)
})
});
r=p.container.innerHTML;
l=null;
p.destroy();
g(f);
r=r.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g," ").replace(/&shy;/g,"�").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(s){return s.toLowerCase()
});
return r=r.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")
},exportChart:function(f,j){var f=f||{},k=this.options.exporting,k=this.getSVG(m({chart:{borderRadius:0}},k.chartOptions,j,{exporting:{sourceWidth:f.sourceWidth||k.sourceWidth,sourceHeight:f.sourceHeight||k.sourceHeight}})),f=m(this.options.exporting,f);
q.post(f.url,{filename:f.filename||"chart",type:f.type,width:f.width||0,scale:f.scale||2,svg:k},f.formAttributes)
},print:function(){var j=this,k=j.container,p=[],r=k.parentNode,o=n.body,l=o.childNodes;
if(!j.isPrinting){j.isPrinting=!0,b(l,function(s,f){if(s.nodeType===1){p[f]=s.style.display,s.style.display="none"
}}),o.appendChild(k),c.focus(),c.print(),setTimeout(function(){r.appendChild(k);
b(l,function(s,f){if(s.nodeType===1){s.style.display=p[f]
}});
j.isPrinting=!1
},1000)
}},contextMenu:function(N,O,L,M,J,F,I){var K=this,C=K.options.navigation,v=C.menuItemStyle,B=K.chartWidth,A=K.chartHeight,D="cache-"+N,E=K[D],r=a(J,F),p,l,y,t=function(f){K.pointer.inClass(f.target,N)||l()
};
if(!E){K[D]=E=i("div",{className:N},{position:"absolute",zIndex:1000,padding:r+"px"},K.container),p=i("div",null,d({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},C.menuStyle),E),l=function(){w(E,{display:"none"});
I&&I.setState(0);
K.openMenu=!1
},z(E,"mouseleave",function(){y=setTimeout(l,500)
}),z(E,"mouseenter",function(){clearTimeout(y)
}),z(document,"mouseup",t),z(K,"destroy",function(){e(document,"mouseup",t)
}),b(O,function(j){if(j){var f=j.separator?i("hr",null,null,p):i("div",{onmouseover:function(){w(this,C.menuItemHoverStyle)
},onmouseout:function(){w(this,v)
},onclick:function(){l();
j.onclick.apply(K,arguments)
},innerHTML:j.text||K.options.lang[j.textKey]},d({cursor:"pointer"},v),p);
K.exportDivElements.push(f)
}}),K.exportDivElements.push(p,E),K.exportMenuWidth=E.offsetWidth,K.exportMenuHeight=E.offsetHeight
}O={display:"block"};
L+K.exportMenuWidth>B?O.right=B-L-J-r+"px":O.left=L-r+"px";
M+F+K.exportMenuHeight>A&&I.alignOptions.verticalAlign!=="top"?O.bottom=A-M-r+"px":O.top=M+F-r+"px";
w(E,O);
K.openMenu=!0
},addButton:function(E){var F=this,C=F.renderer,D=m(F.options.navigation.buttonOptions,E),t=D.onclick,y=D.menuItems,A,B,s={stroke:D.symbolStroke,fill:D.symbolFill},f=D.symbolSize||12;
if(!F.btnCount){F.btnCount=0
}if(!F.exportDivElements){F.exportDivElements=[],F.exportSVGElements=[]
}if(D.enabled!==!1){var r=D.theme,p=r.states,k=p&&p.hover,p=p&&p.select,v;
delete r.states;
t?v=function(){t.apply(F,arguments)
}:y&&(v=function(){F.contextMenu(B.menuClassName,y,B.translateX,B.translateY,B.width,B.height,B);
B.setState(2)
});
D.text&&D.symbol?r.paddingLeft=q.pick(r.paddingLeft,25):D.text||d(r,{width:D.width,height:D.height,padding:0});
B=C.button(D.text,0,0,v,r,k,p).attr({title:F.options.lang[D._titleKey],"stroke-linecap":"round"});
B.menuClassName=E.menuClassName||"highcharts-menu-"+F.btnCount++;
D.symbol&&(A=C.symbol(D.symbol,D.symbolX-f/2,D.symbolY-f/2,f,f).attr(d(s,{"stroke-width":D.symbolStrokeWidth||1,zIndex:1})).add(B));
B.add().align(d(D,{width:B.width,x:q.pick(D.x,u)}),!0,"spacingBox");
u+=(B.width+D.buttonSpacing)*(D.align==="right"?-1:1);
F.exportSVGElements.push(B,A)
}},destroyExport:function(f){var f=f.target,j,k;
for(j=0;
j<f.exportSVGElements.length;
j++){if(k=f.exportSVGElements[j]){k.onclick=k.ontouchstart=null,f.exportSVGElements[j]=k.destroy()
}}for(j=0;
j<f.exportDivElements.length;
j++){k=f.exportDivElements[j],e(k,"mouseleave"),f.exportDivElements[j]=k.onmouseout=k.onmouseover=k.ontouchstart=k.onclick=null,g(k)
}}});
x.menu=function(f,j,k,l){return["M",f,j+2.5,"L",f+k,j+2.5,"M",f,j+l/2+0.5,"L",f+k,j+l/2+0.5,"M",f,j+l-1.5,"L",f+k,j+l-1.5]
};
h.prototype.callbacks.push(function(f){var j,k=f.options.exporting,l=k.buttons;
u=0;
if(k.enabled!==!1){for(j in l){f.addButton(l[j])
}z(f,"destroy",f.destroyExport)
}})
})(Highcharts);