function RGBColor(f){this.ok=!1;
f.charAt(0)=="#"&&(f=f.substr(1,6));
var f=f.replace(/ /g,""),f=f.toLowerCase(),g={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"},l;
for(l in g){f==l&&(f=g[l])
}var j=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(a){return[parseInt(a[1]),parseInt(a[2]),parseInt(a[3])]
}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]
}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]
}}];
for(l=0;
l<j.length;
l++){var e=j[l].process,h=j[l].re.exec(f);
if(h){channels=e(h),this.r=channels[0],this.g=channels[1],this.b=channels[2],this.ok=!0
}}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r;
this.g=this.g<0||isNaN(this.g)?0:this.g>255?255:this.g;
this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b;
this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"
};
this.toHex=function(){var c=this.r.toString(16),k=this.g.toString(16),m=this.b.toString(16);
c.length==1&&(c="0"+c);
k.length==1&&(k="0"+k);
m.length==1&&(m="0"+m);
return"#"+c+k+m
};
this.getHelpXML=function(){for(var x=[],t=0;
t<j.length;
t++){for(var w=j[t].example,u=0;
u<w.length;
u++){x[x.length]=w[u]
}}for(var v in g){x[x.length]=v
}w=document.createElement("ul");
w.setAttribute("id","rgbcolor-examples");
for(t=0;
t<x.length;
t++){try{var s=document.createElement("li"),m=new RGBColor(x[t]),r=document.createElement("div");
r.style.cssText="margin: 3px; border: 1px solid black; background:"+m.toHex()+"; color:"+m.toHex();
r.appendChild(document.createTextNode("test"));
var a=document.createTextNode(" "+x[t]+" -> "+m.toRGB()+" -> "+m.toHex());
s.appendChild(r);
s.appendChild(a);
w.appendChild(s)
}catch(d){}}return w
}
}if(!window.console){window.console={},window.console.log=function(){},window.console.dir=function(){}
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(b){for(var c=0;
c<this.length;
c++){if(this[c]==b){return c
}}return -1
}
}(function(){function a(){var b={FRAMERATE:30,MAX_VIRTUAL_PIXELS:30000};
b.init=function(d){b.Definitions={};
b.Styles={};
b.Animations=[];
b.Images=[];
b.ctx=d;
b.ViewPort=new function(){this.viewPorts=[];
this.Clear=function(){this.viewPorts=[]
};
this.SetCurrent=function(e,c){this.viewPorts.push({width:e,height:c})
};
this.RemoveCurrent=function(){this.viewPorts.pop()
};
this.Current=function(){return this.viewPorts[this.viewPorts.length-1]
};
this.width=function(){return this.Current().width
};
this.height=function(){return this.Current().height
};
this.ComputeSize=function(c){return c!=null&&typeof c=="number"?c:c=="x"?this.width():c=="y"?this.height():Math.sqrt(Math.pow(this.width(),2)+Math.pow(this.height(),2))/Math.sqrt(2)
}
}
};
b.init();
b.ImagesLoaded=function(){for(var d=0;
d<b.Images.length;
d++){if(!b.Images[d].loaded){return !1
}}return !0
};
b.trim=function(c){return c.replace(/^\s+|\s+$/g,"")
};
b.compressSpaces=function(c){return c.replace(/[\s\r\t\n]+/gm," ")
};
b.ajax=function(c){var e;
return(e=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"))?(e.open("GET",c,!1),e.send(null),e.responseText):null
};
b.parseXml=function(c){if(window.DOMParser){return(new DOMParser).parseFromString(c,"text/xml")
}else{var c=c.replace(/<!DOCTYPE svg[^>]*>/,""),e=new ActiveXObject("Microsoft.XMLDOM");
e.async="false";
e.loadXML(c);
return e
}};
b.Property=function(g,f){this.name=g;
this.value=f;
this.hasValue=function(){return this.value!=null&&this.value!==""
};
this.numValue=function(){if(!this.hasValue()){return 0
}var c=parseFloat(this.value);
(this.value+"").match(/%$/)&&(c/=100);
return c
};
this.valueOrDefault=function(c){return this.hasValue()?this.value:c
};
this.numValueOrDefault=function(c){return this.hasValue()?this.numValue():c
};
var e=this;
this.Color={addOpacity:function(j){var k=e.value;
if(j!=null&&j!=""){var h=new RGBColor(e.value);
h.ok&&(k="rgba("+h.r+", "+h.g+", "+h.b+", "+j+")")
}return new b.Property(e.name,k)
}};
this.Definition={getDefinition:function(){var c=e.value.replace(/^(url\()?#([^\)]+)\)?$/,"$2");
return b.Definitions[c]
},isUrl:function(){return e.value.indexOf("url(")==0
},getFillStyle:function(c){var h=this.getDefinition();
return h!=null&&h.createGradient?h.createGradient(b.ctx,c):h!=null&&h.createPattern?h.createPattern(b.ctx,c):null
}};
this.Length={DPI:function(){return 96
},EM:function(h){var j=12,k=new b.Property("fontSize",b.Font.Parse(b.ctx.font).fontSize);
k.hasValue()&&(j=k.Length.toPixels(h));
return j
},toPixels:function(h){if(!e.hasValue()){return 0
}var j=e.value+"";
return j.match(/em$/)?e.numValue()*this.EM(h):j.match(/ex$/)?e.numValue()*this.EM(h)/2:j.match(/px$/)?e.numValue():j.match(/pt$/)?e.numValue()*1.25:j.match(/pc$/)?e.numValue()*15:j.match(/cm$/)?e.numValue()*this.DPI(h)/2.54:j.match(/mm$/)?e.numValue()*this.DPI(h)/25.4:j.match(/in$/)?e.numValue()*this.DPI(h):j.match(/%$/)?e.numValue()*b.ViewPort.ComputeSize(h):e.numValue()
}};
this.Time={toMilliseconds:function(){if(!e.hasValue()){return 0
}var c=e.value+"";
if(c.match(/s$/)){return e.numValue()*1000
}c.match(/ms$/);
return e.numValue()
}};
this.Angle={toRadians:function(){if(!e.hasValue()){return 0
}var c=e.value+"";
return c.match(/deg$/)?e.numValue()*(Math.PI/180):c.match(/grad$/)?e.numValue()*(Math.PI/200):c.match(/rad$/)?e.numValue():e.numValue()*(Math.PI/180)
}}
};
b.Font=new function(){this.Styles=["normal","italic","oblique","inherit"];
this.Variants=["normal","small-caps","inherit"];
this.Weights="normal,bold,bolder,lighter,100,200,300,400,500,600,700,800,900,inherit".split(",");
this.CreateFont=function(m,h,n,l,k,j){j=j!=null?this.Parse(j):this.CreateFont("","","","","",b.ctx.font);
return{fontFamily:k||j.fontFamily,fontSize:l||j.fontSize,fontStyle:m||j.fontStyle,fontWeight:n||j.fontWeight,fontVariant:h||j.fontVariant,toString:function(){return[this.fontStyle,this.fontVariant,this.fontWeight,this.fontSize,this.fontFamily].join(" ")
}}
};
var d=this;
this.Parse=function(r){for(var c={},r=b.trim(b.compressSpaces(r||"")).split(" "),l=!1,q=!1,p=!1,o=!1,m="",n=0;
n<r.length;
n++){if(!q&&d.Styles.indexOf(r[n])!=-1){if(r[n]!="inherit"){c.fontStyle=r[n]
}q=!0
}else{if(!o&&d.Variants.indexOf(r[n])!=-1){if(r[n]!="inherit"){c.fontVariant=r[n]
}q=o=!0
}else{if(!p&&d.Weights.indexOf(r[n])!=-1){if(r[n]!="inherit"){c.fontWeight=r[n]
}q=o=p=!0
}else{if(l){r[n]!="inherit"&&(m+=r[n])
}else{if(r[n]!="inherit"){c.fontSize=r[n].split("/")[0]
}q=o=p=l=!0
}}}}}if(m!=""){c.fontFamily=m
}return c
}
};
b.ToNumberArray=function(f){for(var f=b.trim(b.compressSpaces((f||"").replace(/,/g," "))).split(" "),e=0;
e<f.length;
e++){f[e]=parseFloat(f[e])
}return f
};
b.Point=function(c,e){this.x=c;
this.y=e;
this.angleTo=function(d){return Math.atan2(d.y-this.y,d.x-this.x)
};
this.applyTransform=function(d){var f=this.x*d[1]+this.y*d[3]+d[5];
this.x=this.x*d[0]+this.y*d[2]+d[4];
this.y=f
}
};
b.CreatePoint=function(d){d=b.ToNumberArray(d);
return new b.Point(d[0],d[1])
};
b.CreatePath=function(g){for(var g=b.ToNumberArray(g),f=[],e=0;
e<g.length;
e+=2){f.push(new b.Point(g[e],g[e+1]))
}return f
};
b.BoundingBox=function(e,g,c,f){this.y2=this.x2=this.y1=this.x1=Number.NaN;
this.x=function(){return this.x1
};
this.y=function(){return this.y1
};
this.width=function(){return this.x2-this.x1
};
this.height=function(){return this.y2-this.y1
};
this.addPoint=function(d,h){if(d!=null){if(isNaN(this.x1)||isNaN(this.x2)){this.x2=this.x1=d
}if(d<this.x1){this.x1=d
}if(d>this.x2){this.x2=d
}}if(h!=null){if(isNaN(this.y1)||isNaN(this.y2)){this.y2=this.y1=h
}if(h<this.y1){this.y1=h
}if(h>this.y2){this.y2=h
}}};
this.addX=function(d){this.addPoint(d,null)
};
this.addY=function(d){this.addPoint(null,d)
};
this.addBoundingBox=function(d){this.addPoint(d.x1,d.y1);
this.addPoint(d.x2,d.y2)
};
this.addQuadraticCurve=function(h,m,o,p,n,j){o=h+2/3*(o-h);
p=m+2/3*(p-m);
this.addBezierCurve(h,m,o,o+1/3*(n-h),p,p+1/3*(j-m),n,j)
};
this.addBezierCurve=function(z,A,x,y,w,v,r,s){var h=[z,A],j=[x,y],B=[w,v],u=[r,s];
this.addPoint(h[0],h[1]);
this.addPoint(u[0],u[1]);
for(i=0;
i<=1;
i++){z=function(d){return Math.pow(1-d,3)*h[i]+3*Math.pow(1-d,2)*d*j[i]+3*(1-d)*Math.pow(d,2)*B[i]+Math.pow(d,3)*u[i]
},A=6*h[i]-12*j[i]+6*B[i],x=-3*h[i]+9*j[i]-9*B[i]+3*u[i],y=3*j[i]-3*h[i],x==0?A!=0&&(A=-y/A,0<A&&A<1&&(i==0&&this.addX(z(A)),i==1&&this.addY(z(A)))):(y=Math.pow(A,2)-4*y*x,y<0||(w=(-A+Math.sqrt(y))/(2*x),0<w&&w<1&&(i==0&&this.addX(z(w)),i==1&&this.addY(z(w))),A=(-A-Math.sqrt(y))/(2*x),0<A&&A<1&&(i==0&&this.addX(z(A)),i==1&&this.addY(z(A)))))
}};
this.isPointInBox=function(d,h){return this.x1<=d&&d<=this.x2&&this.y1<=h&&h<=this.y2
};
this.addPoint(e,g);
this.addPoint(c,f)
};
b.Transform=function(l){var j=this;
this.Type={};
this.Type.translate=function(c){this.p=b.CreatePoint(c);
this.apply=function(d){d.translate(this.p.x||0,this.p.y||0)
};
this.applyToPoint=function(d){d.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0])
}
};
this.Type.rotate=function(c){c=b.ToNumberArray(c);
this.angle=new b.Property("angle",c[0]);
this.cx=c[1]||0;
this.cy=c[2]||0;
this.apply=function(d){d.translate(this.cx,this.cy);
d.rotate(this.angle.Angle.toRadians());
d.translate(-this.cx,-this.cy)
};
this.applyToPoint=function(d){var e=this.angle.Angle.toRadians();
d.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0]);
d.applyTransform([Math.cos(e),Math.sin(e),-Math.sin(e),Math.cos(e),0,0]);
d.applyTransform([1,0,0,1,-this.p.x||0,-this.p.y||0])
}
};
this.Type.scale=function(c){this.p=b.CreatePoint(c);
this.apply=function(d){d.scale(this.p.x||1,this.p.y||this.p.x||1)
};
this.applyToPoint=function(d){d.applyTransform([this.p.x||0,0,0,this.p.y||0,0,0])
}
};
this.Type.matrix=function(c){this.m=b.ToNumberArray(c);
this.apply=function(d){d.transform(this.m[0],this.m[1],this.m[2],this.m[3],this.m[4],this.m[5])
};
this.applyToPoint=function(d){d.applyTransform(this.m)
}
};
this.Type.SkewBase=function(c){this.base=j.Type.matrix;
this.base(c);
this.angle=new b.Property("angle",c)
};
this.Type.SkewBase.prototype=new this.Type.matrix;
this.Type.skewX=function(c){this.base=j.Type.SkewBase;
this.base(c);
this.m=[1,0,Math.tan(this.angle.Angle.toRadians()),1,0,0]
};
this.Type.skewX.prototype=new this.Type.SkewBase;
this.Type.skewY=function(c){this.base=j.Type.SkewBase;
this.base(c);
this.m=[1,Math.tan(this.angle.Angle.toRadians()),0,1,0,0]
};
this.Type.skewY.prototype=new this.Type.SkewBase;
this.transforms=[];
this.apply=function(c){for(var d=0;
d<this.transforms.length;
d++){this.transforms[d].apply(c)
}};
this.applyToPoint=function(c){for(var d=0;
d<this.transforms.length;
d++){this.transforms[d].applyToPoint(c)
}};
for(var l=b.trim(b.compressSpaces(l)).split(/\s(?=[a-z])/),f=0;
f<l.length;
f++){var g=l[f].split("(")[0],h=l[f].split("(")[1].replace(")","");
this.transforms.push(new this.Type[g](h))
}};
b.AspectRatio=function(E,D,F,x,C,B,A,y,z,w){var D=b.compressSpaces(D),D=D.replace(/^defer\s/,""),t=D.split(" ")[0]||"xMidYMid",D=D.split(" ")[1]||"meet",u=F/x,r=C/B,s=Math.min(u,r),v=Math.max(u,r);
D=="meet"&&(x*=s,B*=s);
D=="slice"&&(x*=v,B*=v);
z=new b.Property("refX",z);
w=new b.Property("refY",w);
z.hasValue()&&w.hasValue()?E.translate(-s*z.Length.toPixels("x"),-s*w.Length.toPixels("y")):(t.match(/^xMid/)&&(D=="meet"&&s==r||D=="slice"&&v==r)&&E.translate(F/2-x/2,0),t.match(/YMid$/)&&(D=="meet"&&s==u||D=="slice"&&v==u)&&E.translate(0,C/2-B/2),t.match(/^xMax/)&&(D=="meet"&&s==r||D=="slice"&&v==r)&&E.translate(F-x,0),t.match(/YMax$/)&&(D=="meet"&&s==u||D=="slice"&&v==u)&&E.translate(0,C-B));
t=="none"?E.scale(u,r):D=="meet"?E.scale(s,s):D=="slice"&&E.scale(v,v);
E.translate(A==null?0:-A,y==null?0:-y)
};
b.Element={};
b.Element.ElementBase=function(l){this.attributes={};
this.styles={};
this.children=[];
this.attribute=function(e,k){var m=this.attributes[e];
if(m!=null){return m
}m=new b.Property(e,"");
k==!0&&(this.attributes[e]=m);
return m
};
this.style=function(e,k){var m=this.styles[e];
if(m!=null){return m
}m=this.attribute(e);
if(m!=null&&m.hasValue()){return m
}m=this.parent;
if(m!=null&&(m=m.style(e),m!=null&&m.hasValue())){return m
}m=new b.Property(e,"");
k==!0&&(this.styles[e]=m);
return m
};
this.render=function(c){if(this.style("display").value!="none"&&this.attribute("visibility").value!="hidden"){c.save();
this.setContext(c);
if(this.attribute("mask").hasValue()){var d=this.attribute("mask").Definition.getDefinition();
d!=null&&d.apply(c,this)
}else{this.style("filter").hasValue()?(d=this.style("filter").Definition.getDefinition(),d!=null&&d.apply(c,this)):this.renderChildren(c)
}this.clearContext(c);
c.restore()
}};
this.setContext=function(){};
this.clearContext=function(){};
this.renderChildren=function(c){for(var d=0;
d<this.children.length;
d++){this.children[d].render(c)
}};
this.addChild=function(e,k){var m=e;
k&&(m=b.CreateElement(e));
m.parent=this;
this.children.push(m)
};
if(l!=null&&l.nodeType==1){for(var j=0;
j<l.childNodes.length;
j++){var f=l.childNodes[j];
f.nodeType==1&&this.addChild(f,!0)
}for(j=0;
j<l.attributes.length;
j++){f=l.attributes[j],this.attributes[f.nodeName]=new b.Property(f.nodeName,f.nodeValue)
}f=b.Styles[l.nodeName];
if(f!=null){for(var g in f){this.styles[g]=f[g]
}}if(this.attribute("class").hasValue()){for(var j=b.compressSpaces(this.attribute("class").value).split(" "),h=0;
h<j.length;
h++){f=b.Styles["."+j[h]];
if(f!=null){for(g in f){this.styles[g]=f[g]
}}f=b.Styles[l.nodeName+"."+j[h]];
if(f!=null){for(g in f){this.styles[g]=f[g]
}}}}if(this.attribute("style").hasValue()){f=this.attribute("style").value.split(";");
for(j=0;
j<f.length;
j++){b.trim(f[j])!=""&&(l=f[j].split(":"),g=b.trim(l[0]),l=b.trim(l[1]),this.styles[g]=new b.Property(g,l))
}}this.attribute("id").hasValue()&&b.Definitions[this.attribute("id").value]==null&&(b.Definitions[this.attribute("id").value]=this)
}};
b.Element.RenderedElementBase=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.setContext=function(e){if(this.style("fill").Definition.isUrl()){var c=this.style("fill").Definition.getFillStyle(this);
if(c!=null){e.fillStyle=c
}}else{if(this.style("fill").hasValue()){c=this.style("fill"),this.style("fill-opacity").hasValue()&&(c=c.Color.addOpacity(this.style("fill-opacity").value)),e.fillStyle=c.value=="none"?"rgba(0,0,0,0)":c.value
}}if(this.style("stroke").Definition.isUrl()){if(c=this.style("stroke").Definition.getFillStyle(this),c!=null){e.strokeStyle=c
}}else{if(this.style("stroke").hasValue()){c=this.style("stroke"),this.style("stroke-opacity").hasValue()&&(c=c.Color.addOpacity(this.style("stroke-opacity").value)),e.strokeStyle=c.value=="none"?"rgba(0,0,0,0)":c.value
}}if(this.style("stroke-width").hasValue()){e.lineWidth=this.style("stroke-width").Length.toPixels()
}if(this.style("stroke-linecap").hasValue()){e.lineCap=this.style("stroke-linecap").value
}if(this.style("stroke-linejoin").hasValue()){e.lineJoin=this.style("stroke-linejoin").value
}if(this.style("stroke-miterlimit").hasValue()){e.miterLimit=this.style("stroke-miterlimit").value
}if(typeof e.font!="undefined"){e.font=b.Font.CreateFont(this.style("font-style").value,this.style("font-variant").value,this.style("font-weight").value,this.style("font-size").hasValue()?this.style("font-size").Length.toPixels()+"px":"",this.style("font-family").value).toString()
}this.attribute("transform").hasValue()&&(new b.Transform(this.attribute("transform").value)).apply(e);
this.attribute("clip-path").hasValue()&&(c=this.attribute("clip-path").Definition.getDefinition(),c!=null&&c.apply(e));
if(this.style("opacity").hasValue()){e.globalAlpha=this.style("opacity").numValue()
}}
};
b.Element.RenderedElementBase.prototype=new b.Element.ElementBase;
b.Element.PathElementBase=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.path=function(c){c!=null&&c.beginPath();
return new b.BoundingBox
};
this.renderChildren=function(h){this.path(h);
b.Mouse.checkPath(this,h);
h.fillStyle!=""&&h.fill();
h.strokeStyle!=""&&h.stroke();
var f=this.getMarkers();
if(f!=null){if(this.style("marker-start").Definition.isUrl()){var j=this.style("marker-start").Definition.getDefinition();
j.render(h,f[0][0],f[0][1])
}if(this.style("marker-mid").Definition.isUrl()){for(var j=this.style("marker-mid").Definition.getDefinition(),g=1;
g<f.length-1;
g++){j.render(h,f[g][0],f[g][1])
}}this.style("marker-end").Definition.isUrl()&&(j=this.style("marker-end").Definition.getDefinition(),j.render(h,f[f.length-1][0],f[f.length-1][1]))
}};
this.getBoundingBox=function(){return this.path()
};
this.getMarkers=function(){return null
}
};
b.Element.PathElementBase.prototype=new b.Element.RenderedElementBase;
b.Element.svg=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.baseClearContext=this.clearContext;
this.clearContext=function(c){this.baseClearContext(c);
b.ViewPort.RemoveCurrent()
};
this.baseSetContext=this.setContext;
this.setContext=function(m){m.strokeStyle="rgba(0,0,0,0)";
m.lineCap="butt";
m.lineJoin="miter";
m.miterLimit=4;
this.baseSetContext(m);
this.attribute("x").hasValue()&&this.attribute("y").hasValue()&&m.translate(this.attribute("x").Length.toPixels("x"),this.attribute("y").Length.toPixels("y"));
var h=b.ViewPort.width(),n=b.ViewPort.height();
if(typeof this.root=="undefined"&&this.attribute("width").hasValue()&&this.attribute("height").hasValue()){var h=this.attribute("width").Length.toPixels("x"),n=this.attribute("height").Length.toPixels("y"),l=0,k=0;
this.attribute("refX").hasValue()&&this.attribute("refY").hasValue()&&(l=-this.attribute("refX").Length.toPixels("x"),k=-this.attribute("refY").Length.toPixels("y"));
m.beginPath();
m.moveTo(l,k);
m.lineTo(h,k);
m.lineTo(h,n);
m.lineTo(l,n);
m.closePath();
m.clip()
}b.ViewPort.SetCurrent(h,n);
if(this.attribute("viewBox").hasValue()){var l=b.ToNumberArray(this.attribute("viewBox").value),k=l[0],j=l[1],h=l[2],n=l[3];
b.AspectRatio(m,this.attribute("preserveAspectRatio").value,b.ViewPort.width(),h,b.ViewPort.height(),n,k,j,this.attribute("refX").value,this.attribute("refY").value);
b.ViewPort.RemoveCurrent();
b.ViewPort.SetCurrent(l[2],l[3])
}}
};
b.Element.svg.prototype=new b.Element.RenderedElementBase;
b.Element.rect=function(d){this.base=b.Element.PathElementBase;
this.base(d);
this.path=function(o){var h=this.attribute("x").Length.toPixels("x"),p=this.attribute("y").Length.toPixels("y"),n=this.attribute("width").Length.toPixels("x"),m=this.attribute("height").Length.toPixels("y"),l=this.attribute("rx").Length.toPixels("x"),k=this.attribute("ry").Length.toPixels("y");
this.attribute("rx").hasValue()&&!this.attribute("ry").hasValue()&&(k=l);
this.attribute("ry").hasValue()&&!this.attribute("rx").hasValue()&&(l=k);
o!=null&&(o.beginPath(),o.moveTo(h+l,p),o.lineTo(h+n-l,p),o.quadraticCurveTo(h+n,p,h+n,p+k),o.lineTo(h+n,p+m-k),o.quadraticCurveTo(h+n,p+m,h+n-l,p+m),o.lineTo(h+l,p+m),o.quadraticCurveTo(h,p+m,h,p+m-k),o.lineTo(h,p+k),o.quadraticCurveTo(h,p,h+l,p),o.closePath());
return new b.BoundingBox(h,p,h+n,p+m)
}
};
b.Element.rect.prototype=new b.Element.PathElementBase;
b.Element.circle=function(d){this.base=b.Element.PathElementBase;
this.base(d);
this.path=function(h){var f=this.attribute("cx").Length.toPixels("x"),j=this.attribute("cy").Length.toPixels("y"),g=this.attribute("r").Length.toPixels();
h!=null&&(h.beginPath(),h.arc(f,j,g,0,Math.PI*2,!0),h.closePath());
return new b.BoundingBox(f-g,j-g,f+g,j+g)
}
};
b.Element.circle.prototype=new b.Element.PathElementBase;
b.Element.ellipse=function(d){this.base=b.Element.PathElementBase;
this.base(d);
this.path=function(m){var h=4*((Math.sqrt(2)-1)/3),n=this.attribute("rx").Length.toPixels("x"),l=this.attribute("ry").Length.toPixels("y"),k=this.attribute("cx").Length.toPixels("x"),j=this.attribute("cy").Length.toPixels("y");
m!=null&&(m.beginPath(),m.moveTo(k,j-l),m.bezierCurveTo(k+h*n,j-l,k+n,j-h*l,k+n,j),m.bezierCurveTo(k+n,j+h*l,k+h*n,j+l,k,j+l),m.bezierCurveTo(k-h*n,j+l,k-n,j+h*l,k-n,j),m.bezierCurveTo(k-n,j-h*l,k-h*n,j-l,k,j-l),m.closePath());
return new b.BoundingBox(k-n,j-l,k+n,j+l)
}
};
b.Element.ellipse.prototype=new b.Element.PathElementBase;
b.Element.line=function(d){this.base=b.Element.PathElementBase;
this.base(d);
this.getPoints=function(){return[new b.Point(this.attribute("x1").Length.toPixels("x"),this.attribute("y1").Length.toPixels("y")),new b.Point(this.attribute("x2").Length.toPixels("x"),this.attribute("y2").Length.toPixels("y"))]
};
this.path=function(e){var c=this.getPoints();
e!=null&&(e.beginPath(),e.moveTo(c[0].x,c[0].y),e.lineTo(c[1].x,c[1].y));
return new b.BoundingBox(c[0].x,c[0].y,c[1].x,c[1].y)
};
this.getMarkers=function(){var e=this.getPoints(),c=e[0].angleTo(e[1]);
return[[e[0],c],[e[1],c]]
}
};
b.Element.line.prototype=new b.Element.PathElementBase;
b.Element.polyline=function(d){this.base=b.Element.PathElementBase;
this.base(d);
this.points=b.CreatePath(this.attribute("points").value);
this.path=function(f){var e=new b.BoundingBox(this.points[0].x,this.points[0].y);
f!=null&&(f.beginPath(),f.moveTo(this.points[0].x,this.points[0].y));
for(var g=1;
g<this.points.length;
g++){e.addPoint(this.points[g].x,this.points[g].y),f!=null&&f.lineTo(this.points[g].x,this.points[g].y)
}return e
};
this.getMarkers=function(){for(var e=[],c=0;
c<this.points.length-1;
c++){e.push([this.points[c],this.points[c].angleTo(this.points[c+1])])
}e.push([this.points[this.points.length-1],e[e.length-1][1]]);
return e
}
};
b.Element.polyline.prototype=new b.Element.PathElementBase;
b.Element.polygon=function(d){this.base=b.Element.polyline;
this.base(d);
this.basePath=this.path;
this.path=function(e){var c=this.basePath(e);
e!=null&&(e.lineTo(this.points[0].x,this.points[0].y),e.closePath());
return c
}
};
b.Element.polygon.prototype=new b.Element.polyline;
b.Element.path=function(d){this.base=b.Element.PathElementBase;
this.base(d);
d=this.attribute("d").value;
d=d.replace(/,/gm," ");
d=d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,"$1 $2");
d=d.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,"$1 $2");
d=d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,"$1 $2");
d=d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,"$1 $2");
d=d.replace(/([0-9])([+\-])/gm,"$1 $2");
d=d.replace(/(\.[0-9]*)(\.)/gm,"$1 $2");
d=d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,"$1 $3 $4 ");
d=b.compressSpaces(d);
d=b.trim(d);
this.PathParser=new function(c){this.tokens=c.split(" ");
this.reset=function(){this.i=-1;
this.previousCommand=this.command="";
this.start=new b.Point(0,0);
this.control=new b.Point(0,0);
this.current=new b.Point(0,0);
this.points=[];
this.angles=[]
};
this.isEnd=function(){return this.i>=this.tokens.length-1
};
this.isCommandOrEnd=function(){return this.isEnd()?!0:this.tokens[this.i+1].match(/^[A-Za-z]$/)!=null
};
this.isRelativeCommand=function(){return this.command==this.command.toLowerCase()
};
this.getToken=function(){this.i+=1;
return this.tokens[this.i]
};
this.getScalar=function(){return parseFloat(this.getToken())
};
this.nextCommand=function(){this.previousCommand=this.command;
this.command=this.getToken()
};
this.getPoint=function(){return this.makeAbsolute(new b.Point(this.getScalar(),this.getScalar()))
};
this.getAsControlPoint=function(){var e=this.getPoint();
return this.control=e
};
this.getAsCurrentPoint=function(){var e=this.getPoint();
return this.current=e
};
this.getReflectedControlPoint=function(){return this.previousCommand.toLowerCase()!="c"&&this.previousCommand.toLowerCase()!="s"?this.current:new b.Point(2*this.current.x-this.control.x,2*this.current.y-this.control.y)
};
this.makeAbsolute=function(e){if(this.isRelativeCommand()){e.x=this.current.x+e.x,e.y=this.current.y+e.y
}return e
};
this.addMarker=function(e,f,g){g!=null&&this.angles.length>0&&this.angles[this.angles.length-1]==null&&(this.angles[this.angles.length-1]=this.points[this.points.length-1].angleTo(g));
this.addMarkerAngle(e,f==null?null:f.angleTo(e))
};
this.addMarkerAngle=function(e,f){this.points.push(e);
this.angles.push(f)
};
this.getMarkerPoints=function(){return this.points
};
this.getMarkerAngles=function(){for(var e=0;
e<this.angles.length;
e++){if(this.angles[e]==null){for(var f=e+1;
f<this.angles.length;
f++){if(this.angles[f]!=null){this.angles[e]=this.angles[f];
break
}}}}return this.angles
}
}(d);
this.path=function(C){var E=this.PathParser;
E.reset();
var D=new b.BoundingBox;
for(C!=null&&C.beginPath();
!E.isEnd();
){switch(E.nextCommand(),E.command.toUpperCase()){case"M":var B=E.getAsCurrentPoint();
E.addMarker(B);
D.addPoint(B.x,B.y);
C!=null&&C.moveTo(B.x,B.y);
for(E.start=E.current;
!E.isCommandOrEnd();
){B=E.getAsCurrentPoint(),E.addMarker(B,E.start),D.addPoint(B.x,B.y),C!=null&&C.lineTo(B.x,B.y)
}break;
case"L":for(;
!E.isCommandOrEnd();
){var A=E.current,B=E.getAsCurrentPoint();
E.addMarker(B,A);
D.addPoint(B.x,B.y);
C!=null&&C.lineTo(B.x,B.y)
}break;
case"H":for(;
!E.isCommandOrEnd();
){B=new b.Point((E.isRelativeCommand()?E.current.x:0)+E.getScalar(),E.current.y),E.addMarker(B,E.current),E.current=B,D.addPoint(E.current.x,E.current.y),C!=null&&C.lineTo(E.current.x,E.current.y)
}break;
case"V":for(;
!E.isCommandOrEnd();
){B=new b.Point(E.current.x,(E.isRelativeCommand()?E.current.y:0)+E.getScalar()),E.addMarker(B,E.current),E.current=B,D.addPoint(E.current.x,E.current.y),C!=null&&C.lineTo(E.current.x,E.current.y)
}break;
case"C":for(;
!E.isCommandOrEnd();
){var z=E.current,A=E.getPoint(),x=E.getAsControlPoint(),B=E.getAsCurrentPoint();
E.addMarker(B,x,A);
D.addBezierCurve(z.x,z.y,A.x,A.y,x.x,x.y,B.x,B.y);
C!=null&&C.bezierCurveTo(A.x,A.y,x.x,x.y,B.x,B.y)
}break;
case"S":for(;
!E.isCommandOrEnd();
){z=E.current,A=E.getReflectedControlPoint(),x=E.getAsControlPoint(),B=E.getAsCurrentPoint(),E.addMarker(B,x,A),D.addBezierCurve(z.x,z.y,A.x,A.y,x.x,x.y,B.x,B.y),C!=null&&C.bezierCurveTo(A.x,A.y,x.x,x.y,B.x,B.y)
}break;
case"Q":for(;
!E.isCommandOrEnd();
){z=E.current,x=E.getAsControlPoint(),B=E.getAsCurrentPoint(),E.addMarker(B,x,x),D.addQuadraticCurve(z.x,z.y,x.x,x.y,B.x,B.y),C!=null&&C.quadraticCurveTo(x.x,x.y,B.x,B.y)
}break;
case"T":for(;
!E.isCommandOrEnd();
){z=E.current,x=E.getReflectedControlPoint(),E.control=x,B=E.getAsCurrentPoint(),E.addMarker(B,x,x),D.addQuadraticCurve(z.x,z.y,x.x,x.y,B.x,B.y),C!=null&&C.quadraticCurveTo(x.x,x.y,B.x,B.y)
}break;
case"A":for(;
!E.isCommandOrEnd();
){var z=E.current,y=E.getScalar(),w=E.getScalar(),A=E.getScalar()*(Math.PI/180),t=E.getScalar(),x=E.getScalar(),B=E.getAsCurrentPoint(),u=new b.Point(Math.cos(A)*(z.x-B.x)/2+Math.sin(A)*(z.y-B.y)/2,-Math.sin(A)*(z.x-B.x)/2+Math.cos(A)*(z.y-B.y)/2),k=Math.pow(u.x,2)/Math.pow(y,2)+Math.pow(u.y,2)/Math.pow(w,2);
k>1&&(y*=Math.sqrt(k),w*=Math.sqrt(k));
t=(t==x?-1:1)*Math.sqrt((Math.pow(y,2)*Math.pow(w,2)-Math.pow(y,2)*Math.pow(u.y,2)-Math.pow(w,2)*Math.pow(u.x,2))/(Math.pow(y,2)*Math.pow(u.y,2)+Math.pow(w,2)*Math.pow(u.x,2)));
isNaN(t)&&(t=0);
var r=new b.Point(t*y*u.y/w,t*-w*u.x/y),z=new b.Point((z.x+B.x)/2+Math.cos(A)*r.x-Math.sin(A)*r.y,(z.y+B.y)/2+Math.sin(A)*r.x+Math.cos(A)*r.y),v=function(c,e){return(c[0]*e[0]+c[1]*e[1])/(Math.sqrt(Math.pow(c[0],2)+Math.pow(c[1],2))*Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)))
},F=function(c,e){return(c[0]*e[1]<c[1]*e[0]?-1:1)*Math.acos(v(c,e))
},t=F([1,0],[(u.x-r.x)/y,(u.y-r.y)/w]),k=[(u.x-r.x)/y,(u.y-r.y)/w],r=[(-u.x-r.x)/y,(-u.y-r.y)/w],u=F(k,r);
if(v(k,r)<=-1){u=Math.PI
}v(k,r)>=1&&(u=0);
x==0&&u>0&&(u-=2*Math.PI);
x==1&&u<0&&(u+=2*Math.PI);
k=new b.Point(z.x-y*Math.cos((t+u)/2),z.y-w*Math.sin((t+u)/2));
E.addMarkerAngle(k,(t+u)/2+(x==0?1:-1)*Math.PI/2);
E.addMarkerAngle(B,u+(x==0?1:-1)*Math.PI/2);
D.addPoint(B.x,B.y);
C!=null&&(v=y>w?y:w,B=y>w?1:y/w,y=y>w?w/y:1,C.translate(z.x,z.y),C.rotate(A),C.scale(B,y),C.arc(0,0,v,t,t+u,1-x),C.scale(1/B,1/y),C.rotate(-A),C.translate(-z.x,-z.y))
}break;
case"Z":C!=null&&C.closePath(),E.current=E.start
}}return D
};
this.getMarkers=function(){for(var g=this.PathParser.getMarkerPoints(),f=this.PathParser.getMarkerAngles(),j=[],h=0;
h<g.length;
h++){j.push([g[h],f[h]])
}return j
}
};
b.Element.path.prototype=new b.Element.PathElementBase;
b.Element.pattern=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.createPattern=function(f){var e=new b.Element.svg;
e.attributes.viewBox=new b.Property("viewBox",this.attribute("viewBox").value);
e.attributes.x=new b.Property("x",this.attribute("x").value);
e.attributes.y=new b.Property("y",this.attribute("y").value);
e.attributes.width=new b.Property("width",this.attribute("width").value);
e.attributes.height=new b.Property("height",this.attribute("height").value);
e.children=this.children;
var g=document.createElement("canvas");
g.width=this.attribute("width").Length.toPixels("x");
g.height=this.attribute("height").Length.toPixels("y");
e.render(g.getContext("2d"));
return f.createPattern(g,"repeat")
}
};
b.Element.pattern.prototype=new b.Element.ElementBase;
b.Element.marker=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.baseRender=this.render;
this.render=function(h,f,j){h.translate(f.x,f.y);
this.attribute("orient").valueOrDefault("auto")=="auto"&&h.rotate(j);
this.attribute("markerUnits").valueOrDefault("strokeWidth")=="strokeWidth"&&h.scale(h.lineWidth,h.lineWidth);
h.save();
var g=new b.Element.svg;
g.attributes.viewBox=new b.Property("viewBox",this.attribute("viewBox").value);
g.attributes.refX=new b.Property("refX",this.attribute("refX").value);
g.attributes.refY=new b.Property("refY",this.attribute("refY").value);
g.attributes.width=new b.Property("width",this.attribute("markerWidth").value);
g.attributes.height=new b.Property("height",this.attribute("markerHeight").value);
g.attributes.fill=new b.Property("fill",this.attribute("fill").valueOrDefault("black"));
g.attributes.stroke=new b.Property("stroke",this.attribute("stroke").valueOrDefault("none"));
g.children=this.children;
g.render(h);
h.restore();
this.attribute("markerUnits").valueOrDefault("strokeWidth")=="strokeWidth"&&h.scale(1/h.lineWidth,1/h.lineWidth);
this.attribute("orient").valueOrDefault("auto")=="auto"&&h.rotate(-j);
h.translate(-f.x,-f.y)
}
};
b.Element.marker.prototype=new b.Element.ElementBase;
b.Element.defs=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.render=function(){}
};
b.Element.defs.prototype=new b.Element.ElementBase;
b.Element.GradientBase=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.gradientUnits=this.attribute("gradientUnits").valueOrDefault("objectBoundingBox");
this.stops=[];
for(d=0;
d<this.children.length;
d++){this.stops.push(this.children[d])
}this.getGradient=function(){};
this.createGradient=function(m,h){var n=this;
this.attribute("xlink:href").hasValue()&&(n=this.attribute("xlink:href").Definition.getDefinition());
for(var l=this.getGradient(m,h),k=0;
k<n.stops.length;
k++){l.addColorStop(n.stops[k].offset,n.stops[k].color)
}if(this.attribute("gradientTransform").hasValue()){n=b.ViewPort.viewPorts[0];
k=new b.Element.rect;
k.attributes.x=new b.Property("x",-b.MAX_VIRTUAL_PIXELS/3);
k.attributes.y=new b.Property("y",-b.MAX_VIRTUAL_PIXELS/3);
k.attributes.width=new b.Property("width",b.MAX_VIRTUAL_PIXELS);
k.attributes.height=new b.Property("height",b.MAX_VIRTUAL_PIXELS);
var j=new b.Element.g;
j.attributes.transform=new b.Property("transform",this.attribute("gradientTransform").value);
j.children=[k];
k=new b.Element.svg;
k.attributes.x=new b.Property("x",0);
k.attributes.y=new b.Property("y",0);
k.attributes.width=new b.Property("width",n.width);
k.attributes.height=new b.Property("height",n.height);
k.children=[j];
j=document.createElement("canvas");
j.width=n.width;
j.height=n.height;
n=j.getContext("2d");
n.fillStyle=l;
k.render(n);
return n.createPattern(j,"no-repeat")
}return l
}
};
b.Element.GradientBase.prototype=new b.Element.ElementBase;
b.Element.linearGradient=function(d){this.base=b.Element.GradientBase;
this.base(d);
this.getGradient=function(j,h){var n=h.getBoundingBox(),m=this.gradientUnits=="objectBoundingBox"?n.x()+n.width()*this.attribute("x1").numValue():this.attribute("x1").Length.toPixels("x"),l=this.gradientUnits=="objectBoundingBox"?n.y()+n.height()*this.attribute("y1").numValue():this.attribute("y1").Length.toPixels("y"),k=this.gradientUnits=="objectBoundingBox"?n.x()+n.width()*this.attribute("x2").numValue():this.attribute("x2").Length.toPixels("x"),n=this.gradientUnits=="objectBoundingBox"?n.y()+n.height()*this.attribute("y2").numValue():this.attribute("y2").Length.toPixels("y");
return j.createLinearGradient(m,l,k,n)
}
};
b.Element.linearGradient.prototype=new b.Element.GradientBase;
b.Element.radialGradient=function(d){this.base=b.Element.GradientBase;
this.base(d);
this.getGradient=function(k,h){var p=h.getBoundingBox(),o=this.gradientUnits=="objectBoundingBox"?p.x()+p.width()*this.attribute("cx").numValue():this.attribute("cx").Length.toPixels("x"),n=this.gradientUnits=="objectBoundingBox"?p.y()+p.height()*this.attribute("cy").numValue():this.attribute("cy").Length.toPixels("y"),m=o,l=n;
this.attribute("fx").hasValue()&&(m=this.gradientUnits=="objectBoundingBox"?p.x()+p.width()*this.attribute("fx").numValue():this.attribute("fx").Length.toPixels("x"));
this.attribute("fy").hasValue()&&(l=this.gradientUnits=="objectBoundingBox"?p.y()+p.height()*this.attribute("fy").numValue():this.attribute("fy").Length.toPixels("y"));
p=this.gradientUnits=="objectBoundingBox"?(p.width()+p.height())/2*this.attribute("r").numValue():this.attribute("r").Length.toPixels();
return k.createRadialGradient(m,l,0,o,n,p)
}
};
b.Element.radialGradient.prototype=new b.Element.GradientBase;
b.Element.stop=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.offset=this.attribute("offset").numValue();
d=this.style("stop-color");
this.style("stop-opacity").hasValue()&&(d=d.Color.addOpacity(this.style("stop-opacity").value));
this.color=d.value
};
b.Element.stop.prototype=new b.Element.ElementBase;
b.Element.AnimateBase=function(d){this.base=b.Element.ElementBase;
this.base(d);
b.Animations.push(this);
this.duration=0;
this.begin=this.attribute("begin").Time.toMilliseconds();
this.maxDuration=this.begin+this.attribute("dur").Time.toMilliseconds();
this.getProperty=function(){var e=this.attribute("attributeType").value,c=this.attribute("attributeName").value;
return e=="CSS"?this.parent.style(c,!0):this.parent.attribute(c,!0)
};
this.initialValue=null;
this.removed=!1;
this.calcValue=function(){return""
};
this.update=function(c){if(this.initialValue==null){this.initialValue=this.getProperty().value
}if(this.duration>this.maxDuration){if(this.attribute("repeatCount").value=="indefinite"){this.duration=0
}else{return this.attribute("fill").valueOrDefault("remove")=="remove"&&!this.removed?(this.removed=!0,this.getProperty().value=this.initialValue,!0):!1
}}this.duration+=c;
c=!1;
if(this.begin<this.duration){c=this.calcValue(),this.attribute("type").hasValue()&&(c=this.attribute("type").value+"("+c+")"),this.getProperty().value=c,c=!0
}return c
};
this.progress=function(){return(this.duration-this.begin)/(this.maxDuration-this.begin)
}
};
b.Element.AnimateBase.prototype=new b.Element.ElementBase;
b.Element.animate=function(d){this.base=b.Element.AnimateBase;
this.base(d);
this.calcValue=function(){var e=this.attribute("from").numValue(),c=this.attribute("to").numValue();
return e+(c-e)*this.progress()
}
};
b.Element.animate.prototype=new b.Element.AnimateBase;
b.Element.animateColor=function(d){this.base=b.Element.AnimateBase;
this.base(d);
this.calcValue=function(){var g=new RGBColor(this.attribute("from").value),f=new RGBColor(this.attribute("to").value);
if(g.ok&&f.ok){var j=g.r+(f.r-g.r)*this.progress(),h=g.g+(f.g-g.g)*this.progress(),g=g.b+(f.b-g.b)*this.progress();
return"rgb("+parseInt(j,10)+","+parseInt(h,10)+","+parseInt(g,10)+")"
}return this.attribute("from").value
}
};
b.Element.animateColor.prototype=new b.Element.AnimateBase;
b.Element.animateTransform=function(d){this.base=b.Element.animate;
this.base(d)
};
b.Element.animateTransform.prototype=new b.Element.animate;
b.Element.font=function(f){this.base=b.Element.ElementBase;
this.base(f);
this.horizAdvX=this.attribute("horiz-adv-x").numValue();
this.isArabic=this.isRTL=!1;
this.missingGlyph=this.fontFace=null;
this.glyphs=[];
for(f=0;
f<this.children.length;
f++){var e=this.children[f];
if(e.type=="font-face"){this.fontFace=e,e.style("font-family").hasValue()&&(b.Definitions[e.style("font-family").value]=this)
}else{if(e.type=="missing-glyph"){this.missingGlyph=e
}else{if(e.type=="glyph"){e.arabicForm!=""?(this.isArabic=this.isRTL=!0,typeof this.glyphs[e.unicode]=="undefined"&&(this.glyphs[e.unicode]=[]),this.glyphs[e.unicode][e.arabicForm]=e):this.glyphs[e.unicode]=e
}}}}};
b.Element.font.prototype=new b.Element.ElementBase;
b.Element.fontface=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.ascent=this.attribute("ascent").value;
this.descent=this.attribute("descent").value;
this.unitsPerEm=this.attribute("units-per-em").numValue()
};
b.Element.fontface.prototype=new b.Element.ElementBase;
b.Element.missingglyph=function(d){this.base=b.Element.path;
this.base(d);
this.horizAdvX=0
};
b.Element.missingglyph.prototype=new b.Element.path;
b.Element.glyph=function(d){this.base=b.Element.path;
this.base(d);
this.horizAdvX=this.attribute("horiz-adv-x").numValue();
this.unicode=this.attribute("unicode").value;
this.arabicForm=this.attribute("arabic-form").value
};
b.Element.glyph.prototype=new b.Element.path;
b.Element.text=function(g){this.base=b.Element.RenderedElementBase;
this.base(g);
if(g!=null){this.children=[];
for(var f=0;
f<g.childNodes.length;
f++){var e=g.childNodes[f];
e.nodeType==1?this.addChild(e,!0):e.nodeType==3&&this.addChild(new b.Element.tspan(e),!1)
}}this.baseSetContext=this.setContext;
this.setContext=function(c){this.baseSetContext(c);
if(this.style("dominant-baseline").hasValue()){c.textBaseline=this.style("dominant-baseline").value
}if(this.style("alignment-baseline").hasValue()){c.textBaseline=this.style("alignment-baseline").value
}};
this.renderChildren=function(u){for(var v=this.style("text-anchor").valueOrDefault("start"),t=this.attribute("x").Length.toPixels("x"),s=this.attribute("y").Length.toPixels("y"),q=0;
q<this.children.length;
q++){var r=this.children[q];
r.attribute("x").hasValue()?r.x=r.attribute("x").Length.toPixels("x"):(r.attribute("dx").hasValue()&&(t+=r.attribute("dx").Length.toPixels("x")),r.x=t);
t=r.measureText(u);
if(v!="start"&&(q==0||r.attribute("x").hasValue())){for(var p=t,k=q+1;
k<this.children.length;
k++){var m=this.children[k];
if(m.attribute("x").hasValue()){break
}p+=m.measureText(u)
}r.x-=v=="end"?p:p/2
}t=r.x+t;
r.attribute("y").hasValue()?r.y=r.attribute("y").Length.toPixels("y"):(r.attribute("dy").hasValue()&&(s+=r.attribute("dy").Length.toPixels("y")),r.y=s);
s=r.y;
r.render(u)
}}
};
b.Element.text.prototype=new b.Element.RenderedElementBase;
b.Element.TextElementBase=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.getGlyph=function(j,h,n){var m=h[n],l=null;
if(j.isArabic){var k="isolated";
if((n==0||h[n-1]==" ")&&n<h.length-2&&h[n+1]!=" "){k="terminal"
}n>0&&h[n-1]!=" "&&n<h.length-2&&h[n+1]!=" "&&(k="medial");
if(n>0&&h[n-1]!=" "&&(n==h.length-1||h[n+1]==" ")){k="initial"
}typeof j.glyphs[m]!="undefined"&&(l=j.glyphs[m][k],l==null&&j.glyphs[m].type=="glyph"&&(l=j.glyphs[m]))
}else{l=j.glyphs[m]
}if(l==null){l=j.missingGlyph
}return l
};
this.renderChildren=function(v){var w=this.parent.style("font-family").Definition.getDefinition();
if(w!=null){var p=this.parent.style("font-size").numValueOrDefault(b.Font.Parse(b.ctx.font).fontSize),u=this.parent.style("font-style").valueOrDefault(b.Font.Parse(b.ctx.font).fontStyle),t=this.getText();
w.isRTL&&(t=t.split("").reverse().join(""));
for(var s=b.ToNumberArray(this.parent.attribute("dx").value),q=0;
q<t.length;
q++){var r=this.getGlyph(w,t,q),n=p/w.fontFace.unitsPerEm;
v.translate(this.x,this.y);
v.scale(n,-n);
var m=v.lineWidth;
v.lineWidth=v.lineWidth*w.fontFace.unitsPerEm/p;
u=="italic"&&v.transform(1,0,0.4,1,0,0);
r.render(v);
u=="italic"&&v.transform(1,0,-0.4,1,0,0);
v.lineWidth=m;
v.scale(1/n,-1/n);
v.translate(-this.x,-this.y);
this.x+=p*(r.horizAdvX||w.horizAdvX)/w.fontFace.unitsPerEm;
typeof s[q]!="undefined"&&!isNaN(s[q])&&(this.x+=s[q])
}}else{v.strokeStyle!=""&&v.strokeText(b.compressSpaces(this.getText()),this.x,this.y),v.fillStyle!=""&&v.fillText(b.compressSpaces(this.getText()),this.x,this.y)
}};
this.getText=function(){};
this.measureText=function(q){var h=this.parent.style("font-family").Definition.getDefinition();
if(h!=null){var q=this.parent.style("font-size").numValueOrDefault(b.Font.Parse(b.ctx.font).fontSize),l=0,p=this.getText();
h.isRTL&&(p=p.split("").reverse().join(""));
for(var o=b.ToNumberArray(this.parent.attribute("dx").value),n=0;
n<p.length;
n++){var m=this.getGlyph(h,p,n);
l+=(m.horizAdvX||h.horizAdvX)*q/h.fontFace.unitsPerEm;
typeof o[n]!="undefined"&&!isNaN(o[n])&&(l+=o[n])
}return l
}h=b.compressSpaces(this.getText());
if(!q.measureText){return h.length*10
}q.save();
this.setContext(q);
h=q.measureText(h).width;
q.restore();
return h
}
};
b.Element.TextElementBase.prototype=new b.Element.RenderedElementBase;
b.Element.tspan=function(d){this.base=b.Element.TextElementBase;
this.base(d);
this.text=d.nodeType==3?d.nodeValue:d.childNodes.length>0?d.childNodes[0].nodeValue:d.text;
this.getText=function(){return this.text
}
};
b.Element.tspan.prototype=new b.Element.TextElementBase;
b.Element.tref=function(d){this.base=b.Element.TextElementBase;
this.base(d);
this.getText=function(){var c=this.attribute("xlink:href").Definition.getDefinition();
if(c!=null){return c.children[0].getText()
}}
};
b.Element.tref.prototype=new b.Element.TextElementBase;
b.Element.a=function(f){this.base=b.Element.TextElementBase;
this.base(f);
this.hasText=!0;
for(var e=0;
e<f.childNodes.length;
e++){if(f.childNodes[e].nodeType!=3){this.hasText=!1
}}this.text=this.hasText?f.childNodes[0].nodeValue:"";
this.getText=function(){return this.text
};
this.baseRenderChildren=this.renderChildren;
this.renderChildren=function(d){if(this.hasText){this.baseRenderChildren(d);
var g=new b.Property("fontSize",b.Font.Parse(b.ctx.font).fontSize);
b.Mouse.checkBoundingBox(this,new b.BoundingBox(this.x,this.y-g.Length.toPixels("y"),this.x+this.measureText(d),this.y))
}else{g=new b.Element.g,g.children=this.children,g.parent=this,g.render(d)
}};
this.onclick=function(){window.open(this.attribute("xlink:href").value)
};
this.onmousemove=function(){b.ctx.canvas.style.cursor="pointer"
}
};
b.Element.a.prototype=new b.Element.TextElementBase;
b.Element.image=function(f){this.base=b.Element.RenderedElementBase;
this.base(f);
b.Images.push(this);
this.img=document.createElement("img");
this.loaded=!1;
var e=this;
this.img.onload=function(){e.loaded=!0
};
this.img.src=this.attribute("xlink:href").value;
this.renderChildren=function(h){var m=this.attribute("x").Length.toPixels("x"),l=this.attribute("y").Length.toPixels("y"),k=this.attribute("width").Length.toPixels("x"),j=this.attribute("height").Length.toPixels("y");
k==0||j==0||(h.save(),h.translate(m,l),b.AspectRatio(h,this.attribute("preserveAspectRatio").value,k,this.img.width,j,this.img.height,0,0),h.drawImage(this.img,0,0),h.restore())
}
};
b.Element.image.prototype=new b.Element.RenderedElementBase;
b.Element.g=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.getBoundingBox=function(){for(var f=new b.BoundingBox,e=0;
e<this.children.length;
e++){f.addBoundingBox(this.children[e].getBoundingBox())
}return f
}
};
b.Element.g.prototype=new b.Element.RenderedElementBase;
b.Element.symbol=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.baseSetContext=this.setContext;
this.setContext=function(j){this.baseSetContext(j);
if(this.attribute("viewBox").hasValue()){var f=b.ToNumberArray(this.attribute("viewBox").value),g=f[0],h=f[1];
width=f[2];
height=f[3];
b.AspectRatio(j,this.attribute("preserveAspectRatio").value,this.attribute("width").Length.toPixels("x"),width,this.attribute("height").Length.toPixels("y"),height,g,h);
b.ViewPort.SetCurrent(f[2],f[3])
}}
};
b.Element.symbol.prototype=new b.Element.RenderedElementBase;
b.Element.style=function(w){this.base=b.Element.ElementBase;
this.base(w);
for(var w=w.childNodes[0].nodeValue+(w.childNodes.length>1?w.childNodes[1].nodeValue:""),w=w.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,""),w=b.compressSpaces(w),w=w.split("}"),v=0;
v<w.length;
v++){if(b.trim(w[v])!=""){for(var x=w[v].split("{"),p=x[0].split(","),x=x[1].split(";"),u=0;
u<p.length;
u++){var t=b.trim(p[u]);
if(t!=""){for(var s={},q=0;
q<x.length;
q++){var r=x[q].indexOf(":"),n=x[q].substr(0,r),r=x[q].substr(r+1,x[q].length-r);
n!=null&&r!=null&&(s[b.trim(n)]=new b.Property(b.trim(n),b.trim(r)))
}b.Styles[t]=s;
if(t=="@font-face"){t=s["font-family"].value.replace(/"/g,"");
s=s.src.value.split(",");
for(q=0;
q<s.length;
q++){if(s[q].indexOf('format("svg")')>0){n=s[q].indexOf("url");
r=s[q].indexOf(")",n);
n=s[q].substr(n+5,r-n-6);
n=b.parseXml(b.ajax(n)).getElementsByTagName("font");
for(r=0;
r<n.length;
r++){var m=b.CreateElement(n[r]);
b.Definitions[t]=m
}}}}}}}}};
b.Element.style.prototype=new b.Element.ElementBase;
b.Element.use=function(d){this.base=b.Element.RenderedElementBase;
this.base(d);
this.baseSetContext=this.setContext;
this.setContext=function(c){this.baseSetContext(c);
this.attribute("x").hasValue()&&c.translate(this.attribute("x").Length.toPixels("x"),0);
this.attribute("y").hasValue()&&c.translate(0,this.attribute("y").Length.toPixels("y"))
};
this.getDefinition=function(){var c=this.attribute("xlink:href").Definition.getDefinition();
if(this.attribute("width").hasValue()){c.attribute("width",!0).value=this.attribute("width").value
}if(this.attribute("height").hasValue()){c.attribute("height",!0).value=this.attribute("height").value
}return c
};
this.path=function(e){var c=this.getDefinition();
c!=null&&c.path(e)
};
this.renderChildren=function(e){var c=this.getDefinition();
c!=null&&c.render(e)
}
};
b.Element.use.prototype=new b.Element.RenderedElementBase;
b.Element.mask=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.apply=function(x,w){var v=this.attribute("x").Length.toPixels("x"),u=this.attribute("y").Length.toPixels("y"),t=this.attribute("width").Length.toPixels("x"),s=this.attribute("height").Length.toPixels("y"),q=w.attribute("mask").value;
w.attribute("mask").value="";
var r=document.createElement("canvas");
r.width=v+t;
r.height=u+s;
var p=r.getContext("2d");
this.renderChildren(p);
var k=document.createElement("canvas");
k.width=v+t;
k.height=u+s;
var m=k.getContext("2d");
w.render(m);
m.globalCompositeOperation="destination-in";
m.fillStyle=p.createPattern(r,"no-repeat");
m.fillRect(0,0,v+t,u+s);
x.fillStyle=m.createPattern(k,"no-repeat");
x.fillRect(0,0,v+t,u+s);
w.attribute("mask").value=q
};
this.render=function(){}
};
b.Element.mask.prototype=new b.Element.ElementBase;
b.Element.clipPath=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.apply=function(e){for(var c=0;
c<this.children.length;
c++){this.children[c].path&&(this.children[c].path(e),e.clip())
}};
this.render=function(){}
};
b.Element.clipPath.prototype=new b.Element.ElementBase;
b.Element.filter=function(d){this.base=b.Element.ElementBase;
this.base(d);
this.apply=function(z,y){var x=y.getBoundingBox(),w=this.attribute("x").Length.toPixels("x"),v=this.attribute("y").Length.toPixels("y");
if(w==0||v==0){w=x.x1,v=x.y1
}var u=this.attribute("width").Length.toPixels("x"),s=this.attribute("height").Length.toPixels("y");
if(u==0||s==0){u=x.width(),s=x.height()
}x=y.style("filter").value;
y.style("filter").value="";
var t=0.2*u,r=0.2*s,m=document.createElement("canvas");
m.width=u+2*t;
m.height=s+2*r;
var p=m.getContext("2d");
p.translate(-w+t,-v+r);
y.render(p);
for(var k=0;
k<this.children.length;
k++){this.children[k].apply(p,0,0,u+2*t,s+2*r)
}z.drawImage(m,0,0,u+2*t,s+2*r,w-t,v-r,u+2*t,s+2*r);
y.style("filter",!0).value=x
};
this.render=function(){}
};
b.Element.filter.prototype=new b.Element.ElementBase;
b.Element.feGaussianBlur=function(f){function e(F,E,D,C,B){for(var z=0;
z<B;
z++){for(var A=0;
A<C;
A++){for(var y=F[z*C*4+A*4+3]/255,v=0;
v<4;
v++){for(var w=D[0]*(y==0?255:F[z*C*4+A*4+v])*(y==0||v==3?1:y),t=1;
t<D.length;
t++){var u=Math.max(A-t,0),x=F[z*C*4+u*4+3]/255,u=Math.min(A+t,C-1),u=F[z*C*4+u*4+3]/255,G=D[t],k;
x==0?k=255:(k=Math.max(A-t,0),k=F[z*C*4+k*4+v]);
x=k*(x==0||v==3?1:x);
u==0?k=255:(k=Math.min(A+t,C-1),k=F[z*C*4+k*4+v]);
w+=G*(x+k*(u==0||v==3?1:u))
}E[A*B*4+z*4+v]=w
}}}}this.base=b.Element.ElementBase;
this.base(f);
this.apply=function(d,p,o,n,m){var o=this.attribute("stdDeviation").numValue(),p=d.getImageData(0,0,n,m),o=Math.max(o,0.01),k=Math.ceil(o*4)+1;
mask=[];
for(var l=0;
l<k;
l++){mask[l]=Math.exp(-0.5*(l/o)*(l/o))
}o=mask;
k=0;
for(l=1;
l<o.length;
l++){k+=Math.abs(o[l])
}k=2*k+Math.abs(o[0]);
for(l=0;
l<o.length;
l++){o[l]/=k
}tmp=[];
e(p.data,tmp,o,n,m);
e(tmp,p.data,o,m,n);
d.clearRect(0,0,n,m);
d.putImageData(p,0,0)
}
};
b.Element.filter.prototype=new b.Element.feGaussianBlur;
b.Element.title=function(){};
b.Element.title.prototype=new b.Element.ElementBase;
b.Element.desc=function(){};
b.Element.desc.prototype=new b.Element.ElementBase;
b.Element.MISSING=function(c){console.log("ERROR: Element '"+c.nodeName+"' not yet implemented.")
};
b.Element.MISSING.prototype=new b.Element.ElementBase;
b.CreateElement=function(g){var f=g.nodeName.replace(/^[^:]+:/,""),f=f.replace(/\-/g,""),e=null,e=typeof b.Element[f]!="undefined"?new b.Element[f](g):new b.Element.MISSING(g);
e.type=g.nodeName;
return e
};
b.load=function(f,e){b.loadXml(f,b.ajax(e))
};
b.loadXml=function(f,e){b.loadXmlDoc(f,b.parseXml(e))
};
b.loadXmlDoc=function(p,o){b.init(p);
var h=function(d){for(var c=p.canvas;
c;
){d.x-=c.offsetLeft,d.y-=c.offsetTop,c=c.offsetParent
}window.scrollX&&(d.x+=window.scrollX);
window.scrollY&&(d.y+=window.scrollY);
return d
};
if(b.opts.ignoreMouse!=!0){p.canvas.onclick=function(d){d=h(new b.Point(d!=null?d.clientX:event.clientX,d!=null?d.clientY:event.clientY));
b.Mouse.onclick(d.x,d.y)
},p.canvas.onmousemove=function(d){d=h(new b.Point(d!=null?d.clientX:event.clientX,d!=null?d.clientY:event.clientY));
b.Mouse.onmousemove(d.x,d.y)
}
}var j=b.CreateElement(o.documentElement),n=j.root=!0,m=function(){b.ViewPort.Clear();
p.canvas.parentNode&&b.ViewPort.SetCurrent(p.canvas.parentNode.clientWidth,p.canvas.parentNode.clientHeight);
if(b.opts.ignoreDimensions!=!0){if(j.style("width").hasValue()){p.canvas.width=j.style("width").Length.toPixels("x"),p.canvas.style.width=p.canvas.width+"px"
}if(j.style("height").hasValue()){p.canvas.height=j.style("height").Length.toPixels("y"),p.canvas.style.height=p.canvas.height+"px"
}}var c=p.canvas.clientWidth||p.canvas.width,q=p.canvas.clientHeight||p.canvas.height;
b.ViewPort.SetCurrent(c,q);
if(b.opts!=null&&b.opts.offsetX!=null){j.attribute("x",!0).value=b.opts.offsetX
}if(b.opts!=null&&b.opts.offsetY!=null){j.attribute("y",!0).value=b.opts.offsetY
}if(b.opts!=null&&b.opts.scaleWidth!=null&&b.opts.scaleHeight!=null){var k=1,e=1;
j.attribute("width").hasValue()&&(k=j.attribute("width").Length.toPixels("x")/b.opts.scaleWidth);
j.attribute("height").hasValue()&&(e=j.attribute("height").Length.toPixels("y")/b.opts.scaleHeight);
j.attribute("width",!0).value=b.opts.scaleWidth;
j.attribute("height",!0).value=b.opts.scaleHeight;
j.attribute("viewBox",!0).value="0 0 "+c*k+" "+q*e;
j.attribute("preserveAspectRatio",!0).value="none"
}b.opts.ignoreClear!=!0&&p.clearRect(0,0,c,q);
j.render(p);
n&&(n=!1,b.opts!=null&&typeof b.opts.renderCallback=="function"&&b.opts.renderCallback())
},l=!0;
b.ImagesLoaded()&&(l=!1,m());
b.intervalID=setInterval(function(){var d=!1;
l&&b.ImagesLoaded()&&(l=!1,d=!0);
b.opts.ignoreMouse!=!0&&(d|=b.Mouse.hasEvents());
if(b.opts.ignoreAnimation!=!0){for(var e=0;
e<b.Animations.length;
e++){d|=b.Animations[e].update(1000/b.FRAMERATE)
}}b.opts!=null&&typeof b.opts.forceRedraw=="function"&&b.opts.forceRedraw()==!0&&(d=!0);
d&&(m(),b.Mouse.runEvents())
},1000/b.FRAMERATE)
};
b.stop=function(){b.intervalID&&clearInterval(b.intervalID)
};
b.Mouse=new function(){this.events=[];
this.hasEvents=function(){return this.events.length!=0
};
this.onclick=function(c,e){this.events.push({type:"onclick",x:c,y:e,run:function(d){if(d.onclick){d.onclick()
}}})
};
this.onmousemove=function(c,e){this.events.push({type:"onmousemove",x:c,y:e,run:function(d){if(d.onmousemove){d.onmousemove()
}}})
};
this.eventElements=[];
this.checkPath=function(e,g){for(var c=0;
c<this.events.length;
c++){var f=this.events[c];
g.isPointInPath&&g.isPointInPath(f.x,f.y)&&(this.eventElements[c]=e)
}};
this.checkBoundingBox=function(e,g){for(var c=0;
c<this.events.length;
c++){var f=this.events[c];
g.isPointInBox(f.x,f.y)&&(this.eventElements[c]=e)
}};
this.runEvents=function(){b.ctx.canvas.style.cursor="";
for(var g=0;
g<this.events.length;
g++){for(var f=this.events[g],e=this.eventElements[g];
e;
){f.run(e),e=e.parent
}}this.events=[];
this.eventElements=[]
}
};
return b
}this.canvg=function(f,j,h){if(f==null&&j==null&&h==null){for(var j=document.getElementsByTagName("svg"),e=0;
e<j.length;
e++){f=j[e];
h=document.createElement("canvas");
h.width=f.clientWidth;
h.height=f.clientHeight;
f.parentNode.insertBefore(h,f);
f.parentNode.removeChild(f);
var g=document.createElement("div");
g.appendChild(f);
canvg(h,g.innerHTML)
}}else{h=h||{},typeof f=="string"&&(f=document.getElementById(f)),f.svg==null?(e=a(),f.svg=e):(e=f.svg,e.stop()),e.opts=h,f=f.getContext("2d"),typeof j.documentElement!="undefined"?e.loadXmlDoc(f,j):j.substr(0,1)=="<"?e.loadXml(f,j):e.load(f,j)
}}
})();
if(CanvasRenderingContext2D){CanvasRenderingContext2D.prototype.drawSvg=function(f,g,j,h,e){canvg(this.canvas,f,{ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0,ignoreClear:!0,offsetX:g,offsetY:j,scaleWidth:h,scaleHeight:e})
}
}(function(h){var s=h.css,q=h.CanVGRenderer,p=h.SVGRenderer,r=h.extend,j=h.merge,o=h.addEvent,n=h.createElement,l=h.discardElement;
r(q.prototype,p.prototype);
r(q.prototype,{create:function(f,e,k,g){this.setContainer(e,k,g);
this.configure(f)
},setContainer:function(z,y,x){var w=z.style,v=z.parentNode,u=w.left,w=w.top,t=z.offsetWidth,f=z.offsetHeight,A={visibility:"hidden",position:"absolute"};
this.init.apply(this,[z,y,x]);
this.canvas=n("canvas",{width:t,height:f},{position:"relative",left:u,top:w},z);
this.ttLine=n("div",null,A,v);
this.ttDiv=n("div",null,A,v);
this.ttTimer=void 0;
this.hiddenSvg=z=n("div",{width:t,height:f},{visibility:"hidden",left:u,top:w},v);
z.appendChild(this.box)
},configure:function(e){var y=this,x=e.options.tooltip,v=x.borderWidth,u=y.ttDiv,a=x.style,w=y.ttLine,k=parseInt(a.padding,10),a=j(a,{padding:k+"px","background-color":x.backgroundColor,"border-style":"solid","border-width":v+"px","border-radius":x.borderRadius+"px"});
x.shadow&&(a=j(a,{"box-shadow":"1px 1px 3px gray","-webkit-box-shadow":"1px 1px 3px gray"}));
s(u,a);
s(w,{"border-left":"1px solid darkgray"});
o(e,"tooltipRefresh",function(m){var g=e.container,c=g.offsetLeft,g=g.offsetTop,b;
u.innerHTML=m.text;
b=e.tooltip.getPosition(u.offsetWidth,u.offsetHeight,{plotX:m.x,plotY:m.y});
s(u,{visibility:"visible",left:b.x+"px",top:b.y+"px","border-color":m.borderColor});
s(w,{visibility:"visible",left:c+m.x+"px",top:g+e.plotTop+"px",height:e.plotHeight+"px"});
y.ttTimer!==void 0&&clearTimeout(y.ttTimer);
y.ttTimer=setTimeout(function(){s(u,{visibility:"hidden"});
s(w,{visibility:"hidden"})
},3000)
})
},destroy:function(){l(this.canvas);
this.ttTimer!==void 0&&clearTimeout(this.ttTimer);
l(this.ttLine);
l(this.ttDiv);
l(this.hiddenSvg);
return p.prototype.destroy.apply(this)
},color:function(e,d,f){e&&e.linearGradient&&(e=e.stops[e.stops.length-1][1]);
return p.prototype.color.call(this,e,d,f)
},draw:function(){window.canvg(this.canvas,this.hiddenSvg.innerHTML)
}})
})(Highcharts);