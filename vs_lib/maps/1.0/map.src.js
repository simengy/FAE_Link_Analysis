(function(){var UNDEFINED,doc=document,win=window,math=Math,mathRound=math.round,mathFloor=math.floor,mathCeil=math.ceil,mathMax=math.max,mathMin=math.min,mathAbs=math.abs,mathCos=math.cos,mathSin=math.sin,mathPI=math.PI,deg2rad=mathPI*2/360,userAgent=navigator.userAgent,isOpera=win.opera,isIE=/msie/i.test(userAgent)&&!isOpera,docMode8=doc.documentMode===8,isWebKit=/AppleWebKit/.test(userAgent),isFirefox=/Firefox/.test(userAgent),isTouchDevice=/(Mobile|Android|Windows Phone)/.test(userAgent),SVG_NS="http://www.w3.org/2000/svg",hasSVG=!!doc.createElementNS&&!!doc.createElementNS(SVG_NS,"svg").createSVGRect,hasBidiBug=isFirefox&&parseInt(userAgent.split("Firefox/")[1],10)<4,useCanVG=!hasSVG&&!isIE&&!!doc.createElement("canvas").getContext,Renderer,hasTouch,symbolSizes={},idCounter=0,garbageBin,defaultOptions,dateFormat,globalAnimation,pathAnim,timeUnits,noop=function(){},charts=[],PRODUCT="Highmaps",VERSION="1.0.0-beta",DIV="div",ABSOLUTE="absolute",RELATIVE="relative",HIDDEN="hidden",PREFIX="Highmaps-",VISIBLE="visible",PX="px",NONE="none",M="M",L="L",numRegex=/^[0-9]+$/,NORMAL_STATE="",HOVER_STATE="hover",SELECT_STATE="select",MILLISECOND="millisecond",SECOND="second",MINUTE="minute",HOUR="hour",DAY="day",WEEK="week",MONTH="month",YEAR="year",AxisPlotLineOrBandExtension,STROKE_WIDTH="stroke-width",makeTime,timezoneOffset,getMinutes,getHours,getDay,getDate,getMonth,getFullYear,setMinutes,setHours,setDate,setMonth,setFullYear,seriesTypes={};
var Highmaps=win.Highmaps=win.Highmaps?error(16,true):{};
function strToFunction(stringFunction){var tempFunction=stringFunction;
if(typeof(stringFunction)=="string"){try{tempFunction=eval(stringFunction.toString())
}catch(e){console.log(e);
if(e instanceof SyntaxError){console.log("Error :- "+e.message+" -- In Code =="+stringFunction)
}}}return tempFunction
}function extend(a,b){var n;
if(!a){a={}
}for(n in b){a[n]=b[n]
}return a
}function merge(){var i,args=arguments,len,ret={},doCopy=function(copy,original){var value,key;
if(typeof copy!=="object"){copy={}
}for(key in original){if(original.hasOwnProperty(key)){value=original[key];
if(value&&typeof value==="object"&&Object.prototype.toString.call(value)!=="[object Array]"&&key!=="renderTo"&&typeof value.nodeType!=="number"){copy[key]=doCopy(copy[key]||{},value)
}else{copy[key]=original[key]
}}}return copy
};
if(args[0]===true){ret=args[1];
args=Array.prototype.slice.call(args,2)
}len=args.length;
for(i=0;
i<len;
i++){ret=doCopy(ret,args[i])
}return ret
}function hash(){var i=0,args=arguments,length=args.length,obj={};
for(;
i<length;
i++){obj[args[i++]]=args[i]
}return obj
}function pInt(s,mag){return parseInt(s,mag||10)
}function isString(s){return typeof s==="string"
}function isObject(obj){return typeof obj==="object"
}function isArray(obj){return Object.prototype.toString.call(obj)==="[object Array]"
}function isNumber(n){return typeof n==="number"
}function log2lin(num){return math.log(num)/math.LN10
}function lin2log(num){return math.pow(10,num)
}function erase(arr,item){var i=arr.length;
while(i--){if(arr[i]===item){arr.splice(i,1);
break
}}}function defined(obj){return obj!==UNDEFINED&&obj!==null
}function attr(elem,prop,value){var key,setAttribute="setAttribute",ret;
if(isString(prop)){if(defined(value)){elem[setAttribute](prop,value)
}else{if(elem&&elem.getAttribute){ret=elem.getAttribute(prop)
}}}else{if(defined(prop)&&isObject(prop)){for(key in prop){elem[setAttribute](key,prop[key])
}}}return ret
}function splat(obj){return isArray(obj)?obj:[obj]
}function pick(){var args=arguments,i,arg,length=args.length;
for(i=0;
i<length;
i++){arg=args[i];
if(typeof arg!=="undefined"&&arg!==null){return arg
}}}function css(el,styles){if(isIE&&!hasSVG){if(styles&&styles.opacity!==UNDEFINED){styles.filter="alpha(opacity="+(styles.opacity*100)+")"
}}extend(el.style,styles)
}function createElement(tag,attribs,styles,parent,nopad){var el=doc.createElement(tag);
if(attribs){extend(el,attribs)
}if(nopad){css(el,{padding:0,border:NONE,margin:0})
}if(styles){css(el,styles)
}if(parent){parent.appendChild(el)
}return el
}function extendClass(parent,members){var object=function(){};
object.prototype=new parent();
extend(object.prototype,members);
return object
}function numberFormat(number,decimals,decPoint,thousandsSep){var lang=defaultOptions.lang,n=+number||0,c=decimals===-1?(n.toString().split(".")[1]||"").length:(isNaN(decimals=mathAbs(decimals))?2:decimals),d=decPoint===undefined?lang.decimalPoint:decPoint,t=thousandsSep===undefined?lang.thousandsSep:thousandsSep,s=n<0?"-":"",i=String(pInt(n=mathAbs(n).toFixed(c))),j=i.length>3?i.length%3:0;
return s+(j?i.substr(0,j)+t:"")+i.substr(j).replace(/(\d{3})(?=\d)/g,"$1"+t)+(c?d+mathAbs(n-i).toFixed(c).slice(2):"")
}function pad(number,length){return new Array((length||2)+1-String(number).length).join(0)+number
}function wrap(obj,method,func){var proceed=obj[method];
obj[method]=function(){var args=Array.prototype.slice.call(arguments);
args.unshift(proceed);
return func.apply(this,args)
}
}dateFormat=function(format,timestamp,capitalize){if(!defined(timestamp)||isNaN(timestamp)){return"Invalid date"
}format=pick(format,"%Y-%m-%d %H:%M:%S");
var date=new Date(timestamp-timezoneOffset),key,hours=date[getHours](),day=date[getDay](),dayOfMonth=date[getDate](),month=date[getMonth](),fullYear=date[getFullYear](),lang=defaultOptions.lang,langWeekdays=lang.weekdays,replacements=extend({a:langWeekdays[day].substr(0,3),A:langWeekdays[day],d:pad(dayOfMonth),e:dayOfMonth,b:lang.shortMonths[month],B:lang.months[month],m:pad(month+1),y:fullYear.toString().substr(2,2),Y:fullYear,H:pad(hours),I:pad((hours%12)||12),l:(hours%12)||12,M:pad(date[getMinutes]()),p:hours<12?"AM":"PM",P:hours<12?"am":"pm",S:pad(date.getSeconds()),L:pad(mathRound(timestamp%1000),3)},Highmaps.dateFormats);
for(key in replacements){while(format.indexOf("%"+key)!==-1){format=format.replace("%"+key,typeof replacements[key]==="function"?replacements[key](timestamp):replacements[key])
}}return capitalize?format.substr(0,1).toUpperCase()+format.substr(1):format
};
function formatSingle(format,val){var floatRegex=/f$/,decRegex=/\.([0-9])/,lang=defaultOptions.lang,decimals;
if(floatRegex.test(format)){decimals=format.match(decRegex);
decimals=decimals?decimals[1]:-1;
val=numberFormat(val,decimals,lang.decimalPoint,format.indexOf(",")>-1?lang.thousandsSep:"")
}else{val=dateFormat(format,val)
}return val
}function format(str,ctx){var splitter="{",isInside=false,segment,valueAndFormat,path,i,len,ret=[],val,index;
while((index=str.indexOf(splitter))!==-1){segment=str.slice(0,index);
if(isInside){valueAndFormat=segment.split(":");
path=valueAndFormat.shift().split(".");
len=path.length;
val=ctx;
for(i=0;
i<len;
i++){val=val[path[i]]
}if(valueAndFormat.length){val=formatSingle(valueAndFormat.join(":"),val)
}ret.push(val)
}else{ret.push(segment)
}str=str.slice(index+1);
isInside=!isInside;
splitter=isInside?"}":"{"
}ret.push(str);
return ret.join("")
}function getMagnitude(num){return math.pow(10,mathFloor(math.log(num)/math.LN10))
}function normalizeTickInterval(interval,multiples,magnitude,options){var normalized,i;
magnitude=pick(magnitude,1);
normalized=interval/magnitude;
if(!multiples){multiples=[1,2,2.5,5,10];
if(options&&options.allowDecimals===false){if(magnitude===1){multiples=[1,2,5,10]
}else{if(magnitude<=0.1){multiples=[1/magnitude]
}}}}for(i=0;
i<multiples.length;
i++){interval=multiples[i];
if(normalized<=(multiples[i]+(multiples[i+1]||multiples[i]))/2){break
}}interval*=magnitude;
return interval
}function ChartCounters(){this.color=0;
this.symbol=0
}ChartCounters.prototype={wrapColor:function(length){if(this.color>=length){this.color=0
}},wrapSymbol:function(length){if(this.symbol>=length){this.symbol=0
}}};
function stableSort(arr,sortFunction){var length=arr.length,sortValue,i;
for(i=0;
i<length;
i++){arr[i].ss_i=i
}arr.sort(function(a,b){sortValue=sortFunction(a,b);
return sortValue===0?a.ss_i-b.ss_i:sortValue
});
for(i=0;
i<length;
i++){delete arr[i].ss_i
}}function arrayMin(data){var i=data.length,min=data[0];
while(i--){if(data[i]<min){min=data[i]
}}return min
}function arrayMax(data){var i=data.length,max=data[0];
while(i--){if(data[i]>max){max=data[i]
}}return max
}function destroyObjectProperties(obj,except){var n;
for(n in obj){if(obj[n]&&obj[n]!==except&&obj[n].destroy){obj[n].destroy()
}delete obj[n]
}}function discardElement(element){if(!garbageBin){garbageBin=createElement(DIV)
}if(element){garbageBin.appendChild(element)
}garbageBin.innerHTML=""
}function error(code,stop){if(stop){throw code
}else{if(win.console){throw code
}}}function correctFloat(num){return parseFloat(num.toPrecision(14))
}function setAnimation(animation,chart){globalAnimation=pick(animation,chart.animation)
}timeUnits=hash(MILLISECOND,1,SECOND,1000,MINUTE,60000,HOUR,3600000,DAY,24*3600000,WEEK,7*24*3600000,MONTH,31*24*3600000,YEAR,31556952000);
pathAnim={init:function(elem,fromD,toD){fromD=fromD||"";
var shift=elem.shift,bezier=fromD.indexOf("C")>-1,numParams=bezier?7:3,endLength,slice,i,start=fromD.split(" "),end=[].concat(toD),startBaseLine,endBaseLine,sixify=function(arr){i=arr.length;
while(i--){if(arr[i]===M){arr.splice(i+1,0,arr[i+1],arr[i+2],arr[i+1],arr[i+2])
}}};
if(bezier){sixify(start);
sixify(end)
}if(elem.isArea){startBaseLine=start.splice(start.length-6,6);
endBaseLine=end.splice(end.length-6,6)
}if(shift<=end.length/numParams&&start.length===end.length){while(shift--){end=[].concat(end).splice(0,numParams).concat(end)
}}elem.shift=0;
if(start.length){endLength=end.length;
while(start.length<endLength){slice=[].concat(start).splice(start.length-numParams,numParams);
if(bezier){slice[numParams-6]=slice[numParams-2];
slice[numParams-5]=slice[numParams-1]
}start=start.concat(slice)
}}if(startBaseLine){start=start.concat(startBaseLine);
end=end.concat(endBaseLine)
}return[start,end]
},step:function(start,end,pos,complete){var ret=[],i=start.length,startVal;
if(pos===1){ret=complete
}else{if(i===end.length&&pos<1){while(i--){startVal=parseFloat(start[i]);
ret[i]=isNaN(startVal)?start[i]:pos*(parseFloat(end[i]-startVal))+startVal
}}else{ret=end
}}return ret
}};
(function($){win.HighmapsAdapter=win.HighmapsAdapter||($&&{init:function(pathAnim){var Fx=$.fx,Step=Fx.step,dSetter,Tween=$.Tween,propHooks=Tween&&Tween.propHooks,opacityHook=$.cssHooks.opacity;
$.extend($.easing,{easeOutQuad:function(x,t,b,c,d){return -c*(t/=d)*(t-2)+b
}});
$.each(["cur","_default","width","height","opacity"],function(i,fn){var obj=Step,base;
if(fn==="cur"){obj=Fx.prototype
}else{if(fn==="_default"&&Tween){obj=propHooks[fn];
fn="set"
}}base=obj[fn];
if(base){obj[fn]=function(fx){var elem;
fx=i?fx:this;
if(fx.prop==="align"){return
}elem=fx.elem;
return elem.attr?elem.attr(fx.prop,fn==="cur"?UNDEFINED:fx.now):base.apply(this,arguments)
}
}});
wrap(opacityHook,"get",function(proceed,elem,computed){return elem.attr?(elem.opacity||0):proceed.call(this,elem,computed)
});
dSetter=function(fx){var elem=fx.elem,ends;
if(!fx.started){ends=pathAnim.init(elem,elem.d,elem.toD);
fx.start=ends[0];
fx.end=ends[1];
fx.started=true
}elem.attr("d",pathAnim.step(fx.start,fx.end,fx.pos,elem.toD))
};
if(Tween){propHooks.d={set:dSetter}
}else{Step.d=dSetter
}this.each=Array.prototype.forEach?function(arr,fn){return Array.prototype.forEach.call(arr,fn)
}:function(arr,fn){var i=0,len=arr.length;
for(;
i<len;
i++){if(fn.call(arr[i],arr[i],i,arr)===false){return i
}}};
$.fn.highmaps=function(){var constr="Chart",args=arguments,options,ret,chart;
if(isString(args[0])){constr=args[0];
args=Array.prototype.slice.call(args,1)
}options=args[0];
if(options!==UNDEFINED){options.chart=options.chart||{};
options.chart.renderTo=this[0];
chart=new Highmaps[constr](options,args[1]);
ret=this
}if(options===UNDEFINED){ret=charts[attr(this[0],"data-highcharts-chart")]
}return ret
}
},getScript:$.getScript,inArray:$.inArray,adapterRun:function(elem,method){return $(elem)[method]()
},grep:$.grep,map:function(arr,fn){var results=[],i=0,len=arr.length;
for(;
i<len;
i++){results[i]=fn.call(arr[i],arr[i],i,arr)
}return results
},offset:function(el){return $(el).offset()
},addEvent:function(el,event,fn){fn=strToFunction(fn);
$(el).bind(event,fn)
},removeEvent:function(el,eventType,handler){var func=doc.removeEventListener?"removeEventListener":"detachEvent";
if(doc[func]&&el&&!el[func]){el[func]=function(){}
}$(el).unbind(eventType,handler)
},fireEvent:function(el,type,eventArguments,defaultFunction){var event=$.Event(type),detachedType="detached"+type,defaultPrevented;
if(!isIE&&eventArguments){delete eventArguments.layerX;
delete eventArguments.layerY
}extend(event,eventArguments);
if(el[type]){el[detachedType]=el[type];
el[type]=null
}$.each(["preventDefault","stopPropagation"],function(i,fn){var base=event[fn];
event[fn]=function(){try{base.call(event)
}catch(e){if(fn==="preventDefault"){defaultPrevented=true
}}}
});
$(el).trigger(event);
if(el[detachedType]){el[type]=el[detachedType];
el[detachedType]=null
}if(defaultFunction&&!event.isDefaultPrevented()&&!defaultPrevented){defaultFunction(event)
}},washMouseEvent:function(e){var ret=e.originalEvent||e;
if(ret.pageX===UNDEFINED){ret.pageX=e.pageX;
ret.pageY=e.pageY
}return ret
},animate:function(el,params,options){var $el=$(el);
if(!el.style){el.style={}
}if(params.d){el.toD=params.d;
params.d=1
}$el.stop();
if(params.opacity!==UNDEFINED&&el.attr){params.opacity+="px"
}$el.animate(params,options)
},stop:function(el){$(el).stop()
}})
}(win.jQuery));
var globalAdapter=win.HighmapsAdapter,adapter=globalAdapter||{};
if(globalAdapter){globalAdapter.init.call(globalAdapter,pathAnim)
}var adapterRun=adapter.adapterRun,getScript=adapter.getScript,inArray=adapter.inArray,each=adapter.each,grep=adapter.grep,offset=adapter.offset,map=adapter.map,addEvent=adapter.addEvent,removeEvent=adapter.removeEvent,fireEvent=adapter.fireEvent,washMouseEvent=adapter.washMouseEvent,animate=adapter.animate,stop=adapter.stop;
var defaultLabelOptions={enabled:true,x:0,y:15,style:{color:"#666",cursor:"default",fontSize:"11px"}};
defaultOptions={colors:["#2f7ed8","#0d233a","#8bbc21","#910000","#1aadce","#492970","#f28f43","#77a1e5","#c42525","#a6c96a"],symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],decimalPoint:".",numericSymbols:["k","M","G","T","P","E"],resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:true,canvasToolsURL:"http://code.highcharts.com/maps/1.0.0-beta/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/maps/1.0.0-beta/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:true,spacing:[10,10,15,10],style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:false,showCheckbox:false,animation:{duration:1000},events:{},lineWidth:2,marker:{enabled:true,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:true},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:merge(defaultLabelOptions,{align:"center",enabled:false,formatter:function(){return this.y===null?"":numberFormat(this.y,-1)
},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:true,turboThreshold:1000}},labels:{style:{position:ABSOLUTE,color:"#3E576F"}},legend:{enabled:true,align:"center",layout:"horizontal",labelFormatter:function(){return this.name
},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:false,itemStyle:{color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:ABSOLUTE,width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:RELATIVE,top:"1em"},style:{position:ABSOLUTE,backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:true,animation:hasSVG,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:true,snap:isTouchDevice?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:true,text:"vividSENSE",href:"http://www.vividsense.saama.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};
var defaultPlotOptions=defaultOptions.plotOptions,defaultSeriesOptions=defaultPlotOptions.line;
setTimeMethods();
function setTimeMethods(){var useUTC=defaultOptions.global.useUTC,GET=useUTC?"getUTC":"get",SET=useUTC?"setUTC":"set";
timezoneOffset=((useUTC&&defaultOptions.global.timezoneOffset)||0)*60000;
makeTime=useUTC?Date.UTC:function(year,month,date,hours,minutes,seconds){return new Date(year,month,pick(date,1),pick(hours,0),pick(minutes,0),pick(seconds,0)).getTime()
};
getMinutes=GET+"Minutes";
getHours=GET+"Hours";
getDay=GET+"Day";
getDate=GET+"Date";
getMonth=GET+"Month";
getFullYear=GET+"FullYear";
setMinutes=SET+"Minutes";
setHours=SET+"Hours";
setDate=SET+"Date";
setMonth=SET+"Month";
setFullYear=SET+"FullYear"
}function setOptions(options){defaultOptions=merge(true,defaultOptions,options);
setTimeMethods();
return defaultOptions
}function getOptions(){return defaultOptions
}var rgbaRegEx=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,hexRegEx=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,rgbRegEx=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/;
var Color=function(input){var rgba=[],result,stops;
function init(input){if(input&&input.stops){stops=map(input.stops,function(stop){return Color(stop[1])
})
}else{result=rgbaRegEx.exec(input);
if(result){rgba=[pInt(result[1]),pInt(result[2]),pInt(result[3]),parseFloat(result[4],10)]
}else{result=hexRegEx.exec(input);
if(result){rgba=[pInt(result[1],16),pInt(result[2],16),pInt(result[3],16),1]
}else{result=rgbRegEx.exec(input);
if(result){rgba=[pInt(result[1]),pInt(result[2]),pInt(result[3]),1]
}}}}}function get(format){var ret;
if(stops){ret=merge(input);
ret.stops=[].concat(ret.stops);
each(stops,function(stop,i){ret.stops[i]=[ret.stops[i][0],stop.get(format)]
})
}else{if(rgba&&!isNaN(rgba[0])){if(format==="rgb"){ret="rgb("+rgba[0]+","+rgba[1]+","+rgba[2]+")"
}else{if(format==="a"){ret=rgba[3]
}else{ret="rgba("+rgba.join(",")+")"
}}}else{ret=input
}}return ret
}function brighten(alpha){if(stops){each(stops,function(stop){stop.brighten(alpha)
})
}else{if(isNumber(alpha)&&alpha!==0){var i;
for(i=0;
i<3;
i++){rgba[i]+=pInt(alpha*255);
if(rgba[i]<0){rgba[i]=0
}if(rgba[i]>255){rgba[i]=255
}}}}return this
}function setOpacity(alpha){rgba[3]=alpha;
return this
}init(input);
return{get:get,brighten:brighten,rgba:rgba,setOpacity:setOpacity}
};
function SVGElement(){}SVGElement.prototype={init:function(renderer,nodeName){var wrapper=this;
wrapper.element=nodeName==="span"?createElement(nodeName):doc.createElementNS(SVG_NS,nodeName);
wrapper.renderer=renderer;
wrapper.attrSetters={}
},opacity:1,animate:function(params,options,complete){var animOptions=pick(options,globalAnimation,true);
stop(this);
if(animOptions){animOptions=merge(animOptions,{});
if(complete){animOptions.complete=complete
}animate(this,params,animOptions)
}else{this.attr(params);
if(complete){complete()
}}},attr:function(hash,val){var wrapper=this,key,value,result,i,child,element=wrapper.element,nodeName=element.nodeName.toLowerCase(),renderer=wrapper.renderer,skipAttr,titleNode,attrSetters=wrapper.attrSetters,shadows=wrapper.shadows,hasSetSymbolSize,doTransform,ret=wrapper;
if(isString(hash)&&defined(val)){key=hash;
hash={};
hash[key]=val
}if(isString(hash)){key=hash;
if(nodeName==="circle"){key={x:"cx",y:"cy"}[key]||key
}else{if(key==="strokeWidth"){key="stroke-width"
}}ret=attr(element,key)||wrapper[key]||0;
if(key!=="d"&&key!=="visibility"&&key!=="fill"){ret=parseFloat(ret)
}}else{for(key in hash){skipAttr=false;
value=hash[key];
result=attrSetters[key]&&attrSetters[key].call(wrapper,value,key);
if(result!==false){if(result!==UNDEFINED){value=result
}if(key==="d"){if(value&&value.join){value=value.join(" ")
}if(/(NaN| {2}|^$)/.test(value)){value="M 0 0"
}}else{if(key==="x"&&nodeName==="text"){for(i=0;
i<element.childNodes.length;
i++){child=element.childNodes[i];
if(attr(child,"x")===attr(element,"x")){attr(child,"x",value)
}}}else{if(wrapper.rotation&&(key==="x"||key==="y")){doTransform=true
}else{if(key==="fill"){value=renderer.color(value,element,key)
}else{if(nodeName==="circle"&&(key==="x"||key==="y")){key={x:"cx",y:"cy"}[key]||key
}else{if(nodeName==="rect"&&key==="r"){attr(element,{rx:value,ry:value});
skipAttr=true
}else{if(key==="translateX"||key==="translateY"||key==="rotation"||key==="verticalAlign"||key==="scaleX"||key==="scaleY"){doTransform=true;
skipAttr=true
}else{if(key==="stroke"){value=renderer.color(value,element,key)
}else{if(key==="dashstyle"){key="stroke-dasharray";
value=value&&value.toLowerCase();
if(value==="solid"){value=NONE
}else{if(value){value=value.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");
i=value.length;
while(i--){value[i]=pInt(value[i])*pick(hash["stroke-width"],wrapper["stroke-width"])
}value=value.join(",")
}}}else{if(key==="width"){value=pInt(value)
}else{if(key==="align"){key="text-anchor";
value={left:"start",center:"middle",right:"end"}[value]
}else{if(key==="title"){titleNode=element.getElementsByTagName("title")[0];
if(!titleNode){titleNode=doc.createElementNS(SVG_NS,"title");
element.appendChild(titleNode)
}titleNode.textContent=value
}}}}}}}}}}}}if(key==="strokeWidth"){key="stroke-width"
}if(key==="stroke-width"||key==="stroke"){wrapper[key]=value;
if(wrapper.stroke&&wrapper["stroke-width"]){attr(element,"stroke",wrapper.stroke);
attr(element,"stroke-width",wrapper["stroke-width"]);
wrapper.hasStroke=true
}else{if(key==="stroke-width"&&value===0&&wrapper.hasStroke){element.removeAttribute("stroke");
wrapper.hasStroke=false
}}skipAttr=true
}if(wrapper.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(key)){if(!hasSetSymbolSize){wrapper.symbolAttr(hash);
hasSetSymbolSize=true
}skipAttr=true
}if(shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(key)){i=shadows.length;
while(i--){attr(shadows[i],key,key==="height"?mathMax(value-(shadows[i].cutHeight||0),0):value)
}}if((key==="width"||key==="height")&&nodeName==="rect"&&value<0){value=0
}wrapper[key]=value;
if(key==="text"){if(value!==wrapper.textStr){delete wrapper.bBox;
wrapper.textStr=value;
if(wrapper.added){renderer.buildText(wrapper)
}}}else{if(!skipAttr){if(value!==undefined){element.setAttribute(key,value)
}}}}}if(doTransform){wrapper.updateTransform()
}}return ret
},addClass:function(className){var element=this.element,currentClassName=attr(element,"class")||"";
if(currentClassName.indexOf(className)===-1){attr(element,"class",currentClassName+" "+className)
}return this
},symbolAttr:function(hash){var wrapper=this;
each(["x","y","r","start","end","width","height","innerR","anchorX","anchorY"],function(key){wrapper[key]=pick(hash[key],wrapper[key])
});
wrapper.attr({d:wrapper.renderer.symbols[wrapper.symbolName](wrapper.x,wrapper.y,wrapper.width,wrapper.height,wrapper)})
},clip:function(clipRect){return this.attr("clip-path",clipRect?"url("+this.renderer.url+"#"+clipRect.id+")":NONE)
},crisp:function(strokeWidth,x,y,width,height){var wrapper=this,key,attribs={},values={},normalizer;
strokeWidth=strokeWidth||wrapper.strokeWidth||(wrapper.attr&&wrapper.attr("stroke-width"))||0;
normalizer=mathRound(strokeWidth)%2/2;
values.x=mathFloor(x||wrapper.x||0)+normalizer;
values.y=mathFloor(y||wrapper.y||0)+normalizer;
values.width=mathFloor((width||wrapper.width||0)-2*normalizer);
values.height=mathFloor((height||wrapper.height||0)-2*normalizer);
values.strokeWidth=strokeWidth;
for(key in values){if(wrapper[key]!==values[key]){wrapper[key]=attribs[key]=values[key]
}}return attribs
},css:function(styles){var elemWrapper=this,oldStyles=elemWrapper.styles,newStyles={},elem=elemWrapper.element,textWidth,n,serializedCss="",hyphenate,hasNew=!oldStyles;
if(styles&&styles.color){styles.fill=styles.color
}if(oldStyles){for(n in styles){if(styles[n]!==oldStyles[n]){newStyles[n]=styles[n];
hasNew=true
}}}if(hasNew){textWidth=elemWrapper.textWidth=styles&&styles.width&&elem.nodeName.toLowerCase()==="text"&&pInt(styles.width);
if(oldStyles){styles=extend(oldStyles,newStyles)
}elemWrapper.styles=styles;
if(textWidth&&(useCanVG||(!hasSVG&&elemWrapper.renderer.forExport))){delete styles.width
}if(isIE&&!hasSVG){css(elemWrapper.element,styles)
}else{hyphenate=function(a,b){return"-"+b.toLowerCase()
};
for(n in styles){serializedCss+=n.replace(/([A-Z])/g,hyphenate)+":"+styles[n]+";"
}attr(elem,"style",serializedCss)
}if(textWidth&&elemWrapper.added){elemWrapper.renderer.buildText(elemWrapper)
}}return elemWrapper
},on:function(eventType,handler){var svgElement=this,element=svgElement.element;
if(hasTouch&&eventType==="click"){element.ontouchstart=function(e){svgElement.touchEventFired=Date.now();
e.preventDefault();
handler.call(element,e)
};
element.onclick=function(e){if(userAgent.indexOf("Android")===-1||Date.now()-(svgElement.touchEventFired||0)>1100){handler.call(element,e)
}}
}else{element["on"+eventType]=handler
}return this
},setRadialReference:function(coordinates){this.element.radialReference=coordinates;
return this
},translate:function(x,y){return this.attr({translateX:x,translateY:y})
},invert:function(){var wrapper=this;
wrapper.inverted=true;
wrapper.updateTransform();
return wrapper
},updateTransform:function(){var wrapper=this,translateX=wrapper.translateX||0,translateY=wrapper.translateY||0,scaleX=wrapper.scaleX,scaleY=wrapper.scaleY,inverted=wrapper.inverted,rotation=wrapper.rotation,transform;
if(inverted){translateX+=wrapper.attr("width");
translateY+=wrapper.attr("height")
}transform=["translate("+translateX+","+translateY+")"];
if(inverted){transform.push("rotate(90) scale(-1,1)")
}else{if(rotation){transform.push("rotate("+rotation+" "+(wrapper.x||0)+" "+(wrapper.y||0)+")")
}}if(defined(scaleX)||defined(scaleY)){transform.push("scale("+pick(scaleX,1)+" "+pick(scaleY,1)+")")
}if(transform.length){attr(wrapper.element,"transform",transform.join(" "))
}},toFront:function(){var element=this.element;
element.parentNode.appendChild(element);
return this
},align:function(alignOptions,alignByTranslate,box){var align,vAlign,x,y,attribs={},alignTo,renderer=this.renderer,alignedObjects=renderer.alignedObjects;
if(alignOptions){this.alignOptions=alignOptions;
this.alignByTranslate=alignByTranslate;
if(!box||isString(box)){this.alignTo=alignTo=box||"renderer";
erase(alignedObjects,this);
alignedObjects.push(this);
box=null
}}else{alignOptions=this.alignOptions;
alignByTranslate=this.alignByTranslate;
alignTo=this.alignTo
}box=pick(box,renderer[alignTo],renderer);
align=alignOptions.align;
vAlign=alignOptions.verticalAlign;
x=(box.x||0)+(alignOptions.x||0);
y=(box.y||0)+(alignOptions.y||0);
if(align==="right"||align==="center"){x+=(box.width-(alignOptions.width||0))/{right:1,center:2}[align]
}attribs[alignByTranslate?"translateX":"x"]=mathRound(x);
if(vAlign==="bottom"||vAlign==="middle"){y+=(box.height-(alignOptions.height||0))/({bottom:1,middle:2}[vAlign]||1)
}attribs[alignByTranslate?"translateY":"y"]=mathRound(y);
this[this.placed?"animate":"attr"](attribs);
this.placed=true;
this.alignAttr=attribs;
return this
},getBBox:function(){var wrapper=this,bBox=wrapper.bBox,renderer=wrapper.renderer,width,height,rotation=wrapper.rotation,element=wrapper.element,styles=wrapper.styles,rad=rotation*deg2rad,textStr=wrapper.textStr,numKey;
if(textStr===""||numRegex.test(textStr)){numKey=textStr.toString().length+"|"+styles.fontSize+"|"+styles.fontFamily;
bBox=renderer.cache[numKey]
}if(!bBox){if(element.namespaceURI===SVG_NS||renderer.forExport){try{bBox=element.getBBox?extend({},element.getBBox()):{width:element.offsetWidth,height:element.offsetHeight}
}catch(e){}if(!bBox||bBox.width<0){bBox={width:0,height:0}
}}else{bBox=wrapper.htmlGetBBox()
}if(renderer.isSVG){width=bBox.width;
height=bBox.height;
if(isIE&&styles&&styles.fontSize==="11px"&&height.toPrecision(3)==="16.9"){bBox.height=height=14
}if(rotation){bBox.width=mathAbs(height*mathSin(rad))+mathAbs(width*mathCos(rad));
bBox.height=mathAbs(height*mathCos(rad))+mathAbs(width*mathSin(rad))
}}wrapper.bBox=bBox;
if(numKey){renderer.cache[numKey]=bBox
}}return bBox
},show:function(inherit){return this.attr({visibility:inherit?"inherit":VISIBLE})
},hide:function(){return this.attr({visibility:HIDDEN})
},fadeOut:function(duration){var elemWrapper=this;
elemWrapper.animate({opacity:0},{duration:duration||150,complete:function(){elemWrapper.hide()
}})
},add:function(parent){var renderer=this.renderer,parentWrapper=parent||renderer,parentNode=parentWrapper.element||renderer.box,childNodes=parentNode.childNodes,element=this.element,zIndex=this.zIndex,otherElement,otherZIndex,i,inserted;
if(parent){this.parentGroup=parent
}this.parentInverted=parent&&parent.inverted;
if(this.textStr!==undefined){renderer.buildText(this)
}if(zIndex){parentWrapper.handleZ=true;
zIndex=pInt(zIndex)
}if(parentWrapper.handleZ){for(i=0;
i<childNodes.length;
i++){otherElement=childNodes[i];
otherZIndex=attr(otherElement,"zIndex");
if(otherElement!==element&&(pInt(otherZIndex)>zIndex||(!defined(zIndex)&&defined(otherZIndex)))){parentNode.insertBefore(element,otherElement);
inserted=true;
break
}}}if(!inserted){parentNode.appendChild(element)
}this.added=true;
fireEvent(this,"add");
return this
},safeRemoveChild:function(element){var parentNode=element.parentNode;
if(parentNode){parentNode.removeChild(element)
}},destroy:function(){var wrapper=this,element=wrapper.element||{},shadows=wrapper.shadows,parentToClean=wrapper.renderer.isSVG&&element.nodeName==="SPAN"&&wrapper.parentGroup,grandParent,key,i;
element.onclick=element.onmouseout=element.onmouseover=element.onmousemove=element.point=null;
stop(wrapper);
if(wrapper.clipPath){wrapper.clipPath=wrapper.clipPath.destroy()
}if(wrapper.stops){for(i=0;
i<wrapper.stops.length;
i++){wrapper.stops[i]=wrapper.stops[i].destroy()
}wrapper.stops=null
}wrapper.safeRemoveChild(element);
if(shadows){each(shadows,function(shadow){wrapper.safeRemoveChild(shadow)
})
}while(parentToClean&&parentToClean.div.childNodes.length===0){grandParent=parentToClean.parentGroup;
wrapper.safeRemoveChild(parentToClean.div);
delete parentToClean.div;
parentToClean=grandParent
}if(wrapper.alignTo){erase(wrapper.renderer.alignedObjects,wrapper)
}for(key in wrapper){delete wrapper[key]
}return null
},shadow:function(shadowOptions,group,cutOff){var shadows=[],i,shadow,element=this.element,strokeWidth,shadowWidth,shadowElementOpacity,transform;
if(shadowOptions){shadowWidth=pick(shadowOptions.width,3);
shadowElementOpacity=(shadowOptions.opacity||0.15)/shadowWidth;
transform=this.parentInverted?"(-1,-1)":"("+pick(shadowOptions.offsetX,1)+", "+pick(shadowOptions.offsetY,1)+")";
for(i=1;
i<=shadowWidth;
i++){shadow=element.cloneNode(0);
strokeWidth=(shadowWidth*2)+1-(2*i);
attr(shadow,{isShadow:"true",stroke:shadowOptions.color||"black","stroke-opacity":shadowElementOpacity*i,"stroke-width":strokeWidth,transform:"translate"+transform,fill:NONE});
if(cutOff){attr(shadow,"height",mathMax(attr(shadow,"height")-strokeWidth,0));
shadow.cutHeight=strokeWidth
}if(group){group.element.appendChild(shadow)
}else{element.parentNode.insertBefore(shadow,element)
}shadows.push(shadow)
}this.shadows=shadows
}return this
}};
var SVGRenderer=function(){this.init.apply(this,arguments)
};
SVGRenderer.prototype={Element:SVGElement,init:function(container,width,height,forExport){var renderer=this,loc=location,boxWrapper,element,desc;
boxWrapper=renderer.createElement("svg").attr({version:"1.1"});
element=boxWrapper.element;
container.appendChild(element);
if(container.innerHTML.indexOf("xmlns")===-1){attr(element,"xmlns",SVG_NS)
}renderer.isSVG=true;
renderer.box=element;
renderer.boxWrapper=boxWrapper;
renderer.alignedObjects=[];
renderer.url=(isFirefox||isWebKit)&&doc.getElementsByTagName("base").length?loc.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";
desc=this.createElement("desc").add();
desc.element.appendChild(doc.createTextNode("Created with "+PRODUCT+" "+VERSION));
renderer.defs=this.createElement("defs").add();
renderer.forExport=forExport;
renderer.gradients={};
renderer.cache={};
renderer.setSize(width,height,false);
var subPixelFix,rect;
if(isFirefox&&container.getBoundingClientRect){renderer.subPixelFix=subPixelFix=function(){css(container,{left:0,top:0});
rect=container.getBoundingClientRect();
css(container,{left:(mathCeil(rect.left)-rect.left)+PX,top:(mathCeil(rect.top)-rect.top)+PX})
};
subPixelFix();
addEvent(win,"resize",subPixelFix)
}},isHidden:function(){return !this.boxWrapper.getBBox().width
},destroy:function(){var renderer=this,rendererDefs=renderer.defs;
renderer.box=null;
renderer.boxWrapper=renderer.boxWrapper.destroy();
destroyObjectProperties(renderer.gradients||{});
renderer.gradients=null;
if(rendererDefs){renderer.defs=rendererDefs.destroy()
}if(renderer.subPixelFix){removeEvent(win,"resize",renderer.subPixelFix)
}renderer.alignedObjects=null;
return null
},createElement:function(nodeName){var wrapper=new this.Element();
wrapper.init(this,nodeName);
return wrapper
},draw:function(){},buildText:function(wrapper){var textNode=wrapper.element,renderer=this,forExport=renderer.forExport,lines=pick(wrapper.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),childNodes=textNode.childNodes,styleRegex=/style="([^"]+)"/,hrefRegex=/href="(http[^"]+)"/,parentX=attr(textNode,"x"),textStyles=wrapper.styles,width=wrapper.textWidth,textLineHeight=textStyles&&textStyles.lineHeight,i=childNodes.length,getLineHeight=function(tspan){return textLineHeight?pInt(textLineHeight):renderer.fontMetrics(/(px|em)$/.test(tspan&&tspan.style.fontSize)?tspan.style.fontSize:(textStyles.fontSize||11)).h
};
while(i--){textNode.removeChild(childNodes[i])
}if(width&&!wrapper.added){this.box.appendChild(textNode)
}if(lines[lines.length-1]===""){lines.pop()
}each(lines,function(line,lineNo){var spans,spanNo=0;
line=line.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");
spans=line.split("|||");
each(spans,function(span){if(span!==""||spans.length===1){var attributes={},tspan=doc.createElementNS(SVG_NS,"tspan"),spanStyle;
if(styleRegex.test(span)){spanStyle=span.match(styleRegex)[1].replace(/(;| |^)color([ :])/,"$1fill$2");
attr(tspan,"style",spanStyle)
}if(hrefRegex.test(span)&&!forExport){attr(tspan,"onclick",'location.href="'+span.match(hrefRegex)[1]+'"');
css(tspan,{cursor:"pointer"})
}span=(span.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");
if(span!==" "){tspan.appendChild(doc.createTextNode(span));
if(!spanNo){attributes.x=parentX
}else{attributes.dx=0
}attr(tspan,attributes);
if(!spanNo&&lineNo){if(!hasSVG&&forExport){css(tspan,{display:"block"})
}attr(tspan,"dy",getLineHeight(tspan),isWebKit&&tspan.offsetHeight)
}textNode.appendChild(tspan);
spanNo++;
if(width){var words=span.replace(/([^\^])-/g,"$1- ").split(" "),hasWhiteSpace=words.length>1&&textStyles.whiteSpace!=="nowrap",tooLong,actualWidth,clipHeight=wrapper._clipHeight,rest=[],dy=getLineHeight(),softLineNo=1,bBox;
while(hasWhiteSpace&&(words.length||rest.length)){delete wrapper.bBox;
bBox=wrapper.getBBox();
actualWidth=bBox.width;
if(!hasSVG&&renderer.forExport){actualWidth=renderer.measureSpanWidth(tspan.firstChild.data,wrapper.styles)
}tooLong=actualWidth>width;
if(!tooLong||words.length===1){words=rest;
rest=[];
if(words.length){softLineNo++;
if(clipHeight&&softLineNo*dy>clipHeight){words=["..."];
wrapper.attr("title",wrapper.textStr)
}else{tspan=doc.createElementNS(SVG_NS,"tspan");
attr(tspan,{dy:dy,x:parentX});
if(spanStyle){attr(tspan,"style",spanStyle)
}textNode.appendChild(tspan);
if(actualWidth>width){width=actualWidth
}}}}else{tspan.removeChild(tspan.firstChild);
rest.unshift(words.pop())
}if(words.length){tspan.appendChild(doc.createTextNode(words.join(" ").replace(/- /g,"-")))
}}}}}})
})
},button:function(text,x,y,callback,normalState,hoverState,pressedState,disabledState,shape){var label=this.label(text,x,y,shape,null,null,null,null,"button"),curState=0,stateOptions,stateStyle,normalStyle,hoverStyle,pressedStyle,disabledStyle,STYLE="style",verticalGradient={x1:0,y1:0,x2:0,y2:1};
normalState=merge({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:verticalGradient,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},normalState);
normalStyle=normalState[STYLE];
delete normalState[STYLE];
hoverState=merge(normalState,{stroke:"#68A",fill:{linearGradient:verticalGradient,stops:[[0,"#FFF"],[1,"#ACF"]]}},hoverState);
hoverStyle=hoverState[STYLE];
delete hoverState[STYLE];
pressedState=merge(normalState,{stroke:"#68A",fill:{linearGradient:verticalGradient,stops:[[0,"#9BD"],[1,"#CDF"]]}},pressedState);
pressedStyle=pressedState[STYLE];
delete pressedState[STYLE];
disabledState=merge(normalState,{style:{color:"#CCC"}},disabledState);
disabledStyle=disabledState[STYLE];
delete disabledState[STYLE];
addEvent(label.element,isIE?"mouseover":"mouseenter",function(){if(curState!==3){label.attr(hoverState).css(hoverStyle)
}});
addEvent(label.element,isIE?"mouseout":"mouseleave",function(){if(curState!==3){stateOptions=[normalState,hoverState,pressedState][curState];
stateStyle=[normalStyle,hoverStyle,pressedStyle][curState];
label.attr(stateOptions).css(stateStyle)
}});
label.setState=function(state){label.state=curState=state;
if(!state){label.attr(normalState).css(normalStyle)
}else{if(state===2){label.attr(pressedState).css(pressedStyle)
}else{if(state===3){label.attr(disabledState).css(disabledStyle)
}}}};
return label.on("click",function(){if(curState!==3){callback.call(label)
}}).attr(normalState).css(extend({cursor:"default"},normalStyle))
},crispLine:function(points,width){if(points[1]===points[4]){points[1]=points[4]=mathRound(points[1])-(width%2/2)
}if(points[2]===points[5]){points[2]=points[5]=mathRound(points[2])+(width%2/2)
}return points
},path:function(path){var attr={fill:NONE};
if(isArray(path)){attr.d=path
}else{if(isObject(path)){extend(attr,path)
}}return this.createElement("path").attr(attr)
},circle:function(x,y,r){var attr=isObject(x)?x:{x:x,y:y,r:r};
return this.createElement("circle").attr(attr)
},arc:function(x,y,r,innerR,start,end){var arc;
if(isObject(x)){y=x.y;
r=x.r;
innerR=x.innerR;
start=x.start;
end=x.end;
x=x.x
}arc=this.symbol("arc",x||0,y||0,r||0,r||0,{innerR:innerR||0,start:start||0,end:end||0});
arc.r=r;
return arc
},rect:function(x,y,width,height,r,strokeWidth){r=isObject(x)?x.r:r;
var wrapper=this.createElement("rect").attr({rx:r,ry:r,fill:NONE});
return wrapper.attr(isObject(x)?x:wrapper.crisp(strokeWidth,x,y,mathMax(width,0),mathMax(height,0)))
},setSize:function(width,height,animate){var renderer=this,alignedObjects=renderer.alignedObjects,i=alignedObjects.length;
renderer.width=width;
renderer.height=height;
renderer.boxWrapper[pick(animate,true)?"animate":"attr"]({width:width,height:height});
while(i--){alignedObjects[i].align()
}},g:function(name){var elem=this.createElement("g");
return defined(name)?elem.attr({"class":PREFIX+name}):elem
},image:function(src,x,y,width,height){var attribs={preserveAspectRatio:NONE},elemWrapper;
if(arguments.length>1){extend(attribs,{x:x,y:y,width:width,height:height})
}elemWrapper=this.createElement("image").attr(attribs);
if(elemWrapper.element.setAttributeNS){elemWrapper.element.setAttributeNS("http://www.w3.org/1999/xlink","href",src)
}else{elemWrapper.element.setAttribute("hc-svg-href",src)
}return elemWrapper
},symbol:function(symbol,x,y,width,height,options){var obj,symbolFn=this.symbols[symbol],path=symbolFn&&symbolFn(mathRound(x),mathRound(y),width,height,options),imageElement,imageRegex=/^url\((.*?)\)$/,imageSrc,imageSize,centerImage;
if(path){obj=this.path(path);
extend(obj,{symbolName:symbol,x:x,y:y,width:width,height:height});
if(options){extend(obj,options)
}}else{if(imageRegex.test(symbol)){centerImage=function(img,size){if(img.element){img.attr({width:size[0],height:size[1]});
if(!img.alignByTranslate){img.translate(mathRound((width-size[0])/2),mathRound((height-size[1])/2))
}}};
imageSrc=symbol.match(imageRegex)[1];
imageSize=symbolSizes[imageSrc];
obj=this.image(imageSrc).attr({x:x,y:y});
obj.isImg=true;
if(imageSize){centerImage(obj,imageSize)
}else{obj.attr({width:0,height:0});
imageElement=createElement("img",{onload:function(){centerImage(obj,symbolSizes[imageSrc]=[this.width,this.height])
},src:imageSrc})
}}}return obj
},symbols:{circle:function(x,y,w,h){var cpw=0.166*w;
return[M,x+w/2,y,"C",x+w+cpw,y,x+w+cpw,y+h,x+w/2,y+h,"C",x-cpw,y+h,x-cpw,y,x+w/2,y,"Z"]
},square:function(x,y,w,h){return[M,x,y,L,x+w,y,x+w,y+h,x,y+h,"Z"]
},triangle:function(x,y,w,h){return[M,x+w/2,y,L,x+w,y+h,x,y+h,"Z"]
},"triangle-down":function(x,y,w,h){return[M,x,y,L,x+w,y,x+w/2,y+h,"Z"]
},diamond:function(x,y,w,h){return[M,x+w/2,y,L,x+w,y+h/2,x+w/2,y+h,x,y+h/2,"Z"]
},arc:function(x,y,w,h,options){var start=options.start,radius=options.r||w||h,end=options.end-0.001,innerRadius=options.innerR,open=options.open,cosStart=mathCos(start),sinStart=mathSin(start),cosEnd=mathCos(end),sinEnd=mathSin(end),longArc=options.end-start<mathPI?0:1;
return[M,x+radius*cosStart,y+radius*sinStart,"A",radius,radius,0,longArc,1,x+radius*cosEnd,y+radius*sinEnd,open?M:L,x+innerRadius*cosEnd,y+innerRadius*sinEnd,"A",innerRadius,innerRadius,0,longArc,0,x+innerRadius*cosStart,y+innerRadius*sinStart,open?"":"Z"]
}},clipRect:function(x,y,width,height){var wrapper,id=PREFIX+idCounter++,clipPath=this.createElement("clipPath").attr({id:id}).add(this.defs);
wrapper=this.rect(x,y,width,height,0).add(clipPath);
wrapper.id=id;
wrapper.clipPath=clipPath;
return wrapper
},color:function(color,elem,prop){var renderer=this,colorObject,regexRgba=/^rgba/,gradName,gradAttr,gradients,gradientObject,stops,stopColor,stopOpacity,radialReference,n,id,key=[];
if(color&&color.linearGradient){gradName="linearGradient"
}else{if(color&&color.radialGradient){gradName="radialGradient"
}}if(gradName){gradAttr=color[gradName];
gradients=renderer.gradients;
stops=color.stops;
radialReference=elem.radialReference;
if(isArray(gradAttr)){color[gradName]=gradAttr={x1:gradAttr[0],y1:gradAttr[1],x2:gradAttr[2],y2:gradAttr[3],gradientUnits:"userSpaceOnUse"}
}if(gradName==="radialGradient"&&radialReference&&!defined(gradAttr.gradientUnits)){gradAttr=merge(gradAttr,{cx:(radialReference[0]-radialReference[2]/2)+gradAttr.cx*radialReference[2],cy:(radialReference[1]-radialReference[2]/2)+gradAttr.cy*radialReference[2],r:gradAttr.r*radialReference[2],gradientUnits:"userSpaceOnUse"})
}for(n in gradAttr){if(n!=="id"){key.push(n,gradAttr[n])
}}for(n in stops){key.push(stops[n])
}key=key.join(",");
if(gradients[key]){id=gradients[key].id
}else{gradAttr.id=id=PREFIX+idCounter++;
gradients[key]=gradientObject=renderer.createElement(gradName).attr(gradAttr).add(renderer.defs);
gradientObject.stops=[];
each(stops,function(stop){var stopObject;
if(regexRgba.test(stop[1])){colorObject=Color(stop[1]);
stopColor=colorObject.get("rgb");
stopOpacity=colorObject.get("a")
}else{stopColor=stop[1];
stopOpacity=1
}stopObject=renderer.createElement("stop").attr({offset:stop[0],"stop-color":stopColor,"stop-opacity":stopOpacity}).add(gradientObject);
gradientObject.stops.push(stopObject)
})
}return"url("+renderer.url+"#"+id+")"
}else{if(regexRgba.test(color)){colorObject=Color(color);
attr(elem,prop+"-opacity",colorObject.get("a"));
return colorObject.get("rgb")
}else{elem.removeAttribute(prop+"-opacity");
return color
}}},text:function(str,x,y,useHTML){var renderer=this,fakeSVG=useCanVG||(!hasSVG&&renderer.forExport),wrapper;
if(useHTML&&!renderer.forExport){return renderer.html(str,x,y)
}x=mathRound(pick(x,0));
y=mathRound(pick(y,0));
wrapper=renderer.createElement("text").attr({x:x,y:y,text:str});
if(fakeSVG){wrapper.css({position:ABSOLUTE})
}wrapper.x=x;
wrapper.y=y;
return wrapper
},fontMetrics:function(fontSize){fontSize=/px/.test(fontSize)?pInt(fontSize):/em/.test(fontSize)?parseFloat(fontSize)*12:11;
var lineHeight=fontSize<24?fontSize+4:mathRound(fontSize*1.2),baseline=mathRound(lineHeight*0.8);
return{h:lineHeight,b:baseline}
},label:function(str,x,y,shape,anchorX,anchorY,useHTML,baseline,className){var renderer=this,wrapper=renderer.g(className),text=renderer.text("",0,0,useHTML).attr({zIndex:1}),box,bBox,alignFactor=0,padding=3,paddingLeft=0,width,height,wrapperX,wrapperY,crispAdjust=0,deferredAttr={},baselineOffset,attrSetters=wrapper.attrSetters,needsBox;
function updateBoxSize(){var boxX,boxY,style=text.element.style;
bBox=(width===undefined||height===undefined||wrapper.styles.textAlign)&&text.textStr&&text.getBBox();
wrapper.width=(width||bBox.width||0)+2*padding+paddingLeft;
wrapper.height=(height||bBox.height||0)+2*padding;
baselineOffset=padding+renderer.fontMetrics(style&&style.fontSize).b;
if(needsBox){if(!box){boxX=mathRound(-alignFactor*padding);
boxY=baseline?-baselineOffset:0;
wrapper.box=box=shape?renderer.symbol(shape,boxX,boxY,wrapper.width,wrapper.height,deferredAttr):renderer.rect(boxX,boxY,wrapper.width,wrapper.height,0,deferredAttr[STROKE_WIDTH]);
box.add(wrapper)
}if(!box.isImg){box.attr(merge({width:wrapper.width,height:wrapper.height},deferredAttr))
}deferredAttr=null
}}function updateTextPadding(){var styles=wrapper.styles,textAlign=styles&&styles.textAlign,x=paddingLeft+padding*(1-alignFactor),y;
y=baseline?0:baselineOffset;
if(defined(width)&&(textAlign==="center"||textAlign==="right")){x+={center:0.5,right:1}[textAlign]*(width-bBox.width)
}if(x!==text.x||y!==text.y){text.attr({x:x,y:y})
}text.x=x;
text.y=y
}function boxAttr(key,value){if(box){box.attr(key,value)
}else{deferredAttr[key]=value
}}function getSizeAfterAdd(){text.add(wrapper);
wrapper.attr({text:str,x:x,y:y});
if(box&&defined(anchorX)){wrapper.attr({anchorX:anchorX,anchorY:anchorY})
}}addEvent(wrapper,"add",getSizeAfterAdd);
attrSetters.width=function(value){width=value;
return false
};
attrSetters.height=function(value){height=value;
return false
};
attrSetters.padding=function(value){if(defined(value)&&value!==padding){padding=value;
updateTextPadding()
}return false
};
attrSetters.paddingLeft=function(value){if(defined(value)&&value!==paddingLeft){paddingLeft=value;
updateTextPadding()
}return false
};
attrSetters.align=function(value){alignFactor={left:0,center:0.5,right:1}[value];
return false
};
attrSetters.text=function(value,key){text.attr(key,value);
updateBoxSize();
updateTextPadding();
return false
};
attrSetters[STROKE_WIDTH]=function(value,key){if(value){needsBox=true
}crispAdjust=value%2/2;
boxAttr(key,value);
return false
};
attrSetters.stroke=attrSetters.fill=attrSetters.r=function(value,key){if(key==="fill"&&value){needsBox=true
}boxAttr(key,value);
return false
};
attrSetters.anchorX=function(value,key){anchorX=value;
boxAttr(key,value+crispAdjust-wrapperX);
return false
};
attrSetters.anchorY=function(value,key){anchorY=value;
boxAttr(key,value-wrapperY);
return false
};
attrSetters.x=function(value){wrapper.x=value;
value-=alignFactor*((width||bBox.width)+padding);
wrapperX=mathRound(value);
wrapper.attr("translateX",wrapperX);
return false
};
attrSetters.y=function(value){wrapperY=wrapper.y=mathRound(value);
wrapper.attr("translateY",wrapperY);
return false
};
var baseCss=wrapper.css;
return extend(wrapper,{css:function(styles){if(styles){var textStyles={};
styles=merge(styles);
each(["fontSize","fontWeight","fontFamily","color","lineHeight","width","textDecoration","textShadow"],function(prop){if(styles[prop]!==UNDEFINED){textStyles[prop]=styles[prop];
delete styles[prop]
}});
text.css(textStyles)
}return baseCss.call(wrapper,styles)
},getBBox:function(){return{width:bBox.width+2*padding,height:bBox.height+2*padding,x:bBox.x-padding,y:bBox.y-padding}
},shadow:function(b){if(box){box.shadow(b)
}return wrapper
},destroy:function(){removeEvent(wrapper,"add",getSizeAfterAdd);
removeEvent(wrapper.element,"mouseenter");
removeEvent(wrapper.element,"mouseleave");
if(text){text=text.destroy()
}if(box){box=box.destroy()
}SVGElement.prototype.destroy.call(wrapper);
wrapper=renderer=updateBoxSize=updateTextPadding=boxAttr=getSizeAfterAdd=null
}})
}};
Renderer=SVGRenderer;
extend(SVGElement.prototype,{htmlCss:function(styles){var wrapper=this,element=wrapper.element,textWidth=styles&&element.tagName==="SPAN"&&styles.width;
if(textWidth){delete styles.width;
wrapper.textWidth=textWidth;
wrapper.updateTransform()
}wrapper.styles=extend(wrapper.styles,styles);
css(wrapper.element,styles);
return wrapper
},htmlGetBBox:function(){var wrapper=this,element=wrapper.element,bBox=wrapper.bBox;
if(!bBox){if(element.nodeName==="text"){element.style.position=ABSOLUTE
}bBox=wrapper.bBox={x:element.offsetLeft,y:element.offsetTop,width:element.offsetWidth,height:element.offsetHeight}
}return bBox
},htmlUpdateTransform:function(){if(!this.added){this.alignOnAdd=true;
return
}var wrapper=this,renderer=wrapper.renderer,elem=wrapper.element,translateX=wrapper.translateX||0,translateY=wrapper.translateY||0,x=wrapper.x||0,y=wrapper.y||0,align=wrapper.textAlign||"left",alignCorrection={left:0,center:0.5,right:1}[align],shadows=wrapper.shadows;
css(elem,{marginLeft:translateX,marginTop:translateY});
if(shadows){each(shadows,function(shadow){css(shadow,{marginLeft:translateX+1,marginTop:translateY+1})
})
}if(wrapper.inverted){each(elem.childNodes,function(child){renderer.invertChild(child,elem)
})
}if(elem.tagName==="SPAN"){var width,rotation=wrapper.rotation,baseline,textWidth=pInt(wrapper.textWidth),currentTextTransform=[rotation,align,elem.innerHTML,wrapper.textWidth].join(",");
if(currentTextTransform!==wrapper.cTT){baseline=renderer.fontMetrics(elem.style.fontSize).b;
if(defined(rotation)){wrapper.setSpanRotation(rotation,alignCorrection,baseline)
}width=pick(wrapper.elemWidth,elem.offsetWidth);
if(width>textWidth&&/[ \-]/.test(elem.textContent||elem.innerText)){css(elem,{width:textWidth+PX,display:"block",whiteSpace:"normal"});
width=textWidth
}wrapper.getSpanCorrection(width,baseline,alignCorrection,rotation,align)
}css(elem,{left:(x+(wrapper.xCorr||0))+PX,top:(y+(wrapper.yCorr||0))+PX});
if(isWebKit){baseline=elem.offsetHeight
}wrapper.cTT=currentTextTransform
}},setSpanRotation:function(rotation,alignCorrection,baseline){var rotationStyle={},cssTransformKey=isIE?"-ms-transform":isWebKit?"-webkit-transform":isFirefox?"MozTransform":isOpera?"-o-transform":"";
rotationStyle[cssTransformKey]=rotationStyle.transform="rotate("+rotation+"deg)";
rotationStyle[cssTransformKey+(isFirefox?"Origin":"-origin")]=rotationStyle.transformOrigin=(alignCorrection*100)+"% "+baseline+"px";
css(this.element,rotationStyle)
},getSpanCorrection:function(width,baseline,alignCorrection){this.xCorr=-width*alignCorrection;
this.yCorr=-baseline
}});
extend(SVGRenderer.prototype,{html:function(str,x,y){var defaultChartStyle=defaultOptions.chart.style,wrapper=this.createElement("span"),attrSetters=wrapper.attrSetters,element=wrapper.element,renderer=wrapper.renderer;
attrSetters.text=function(value){if(value!==element.innerHTML){delete this.bBox
}element.innerHTML=this.textStr=value;
return false
};
attrSetters.x=attrSetters.y=attrSetters.align=attrSetters.rotation=function(value,key){if(key==="align"){key="textAlign"
}wrapper[key]=value;
wrapper.htmlUpdateTransform();
return false
};
wrapper.attr({text:str,x:mathRound(x),y:mathRound(y)}).css({position:ABSOLUTE,whiteSpace:"nowrap",fontFamily:defaultChartStyle.fontFamily,fontSize:defaultChartStyle.fontSize});
wrapper.css=wrapper.htmlCss;
if(renderer.isSVG){wrapper.add=function(svgGroupWrapper){var htmlGroup,container=renderer.box.parentNode,parentGroup,parents=[];
this.parentGroup=svgGroupWrapper;
if(svgGroupWrapper){htmlGroup=svgGroupWrapper.div;
if(!htmlGroup){parentGroup=svgGroupWrapper;
while(parentGroup){parents.push(parentGroup);
parentGroup=parentGroup.parentGroup
}each(parents.reverse(),function(parentGroup){var htmlGroupStyle;
htmlGroup=parentGroup.div=parentGroup.div||createElement(DIV,{className:attr(parentGroup.element,"class")},{position:ABSOLUTE,left:(parentGroup.translateX||0)+PX,top:(parentGroup.translateY||0)+PX},htmlGroup||container);
htmlGroupStyle=htmlGroup.style;
extend(parentGroup.attrSetters,{translateX:function(value){htmlGroupStyle.left=value+PX
},translateY:function(value){htmlGroupStyle.top=value+PX
},visibility:function(value,key){htmlGroupStyle[key]=value
}})
})
}}else{htmlGroup=container
}htmlGroup.appendChild(element);
wrapper.added=true;
if(wrapper.alignOnAdd){wrapper.htmlUpdateTransform()
}return wrapper
}
}return wrapper
}});
var VMLRenderer,VMLElement;
if(!hasSVG&&!useCanVG){Highmaps.VMLElement=VMLElement={init:function(renderer,nodeName){var wrapper=this,markup=["<",nodeName,' filled="f" stroked="f"'],style=["position: ",ABSOLUTE,";"],isDiv=nodeName===DIV;
if(nodeName==="shape"||isDiv){style.push("left:0;top:0;width:1px;height:1px;")
}style.push("visibility: ",isDiv?HIDDEN:VISIBLE);
markup.push(' style="',style.join(""),'"/>');
if(nodeName){markup=isDiv||nodeName==="span"||nodeName==="img"?markup.join(""):renderer.prepVML(markup);
wrapper.element=createElement(markup)
}wrapper.renderer=renderer;
wrapper.attrSetters={}
},add:function(parent){var wrapper=this,renderer=wrapper.renderer,element=wrapper.element,box=renderer.box,inverted=parent&&parent.inverted,parentNode=parent?parent.element||parent:box;
if(inverted){renderer.invertChild(element,parentNode)
}parentNode.appendChild(element);
wrapper.added=true;
if(wrapper.alignOnAdd&&!wrapper.deferUpdateTransform){wrapper.updateTransform()
}fireEvent(wrapper,"add");
return wrapper
},updateTransform:SVGElement.prototype.htmlUpdateTransform,setSpanRotation:function(){var rotation=this.rotation,costheta=mathCos(rotation*deg2rad),sintheta=mathSin(rotation*deg2rad);
css(this.element,{filter:rotation?["progid:DXImageTransform.Microsoft.Matrix(M11=",costheta,", M12=",-sintheta,", M21=",sintheta,", M22=",costheta,", sizingMethod='auto expand')"].join(""):NONE})
},getSpanCorrection:function(width,baseline,alignCorrection,rotation,align){var costheta=rotation?mathCos(rotation*deg2rad):1,sintheta=rotation?mathSin(rotation*deg2rad):0,height=pick(this.elemHeight,this.element.offsetHeight),quad,nonLeft=align&&align!=="left";
this.xCorr=costheta<0&&-width;
this.yCorr=sintheta<0&&-height;
quad=costheta*sintheta<0;
this.xCorr+=sintheta*baseline*(quad?1-alignCorrection:alignCorrection);
this.yCorr-=costheta*baseline*(rotation?(quad?alignCorrection:1-alignCorrection):1);
if(nonLeft){this.xCorr-=width*alignCorrection*(costheta<0?-1:1);
if(rotation){this.yCorr-=height*alignCorrection*(sintheta<0?-1:1)
}css(this.element,{textAlign:align})
}},pathToVML:function(value){var i=value.length,path=[];
while(i--){if(isNumber(value[i])){path[i]=mathRound(value[i]*10)-5
}else{if(value[i]==="Z"){path[i]="x"
}else{path[i]=value[i];
if(value.isArc&&(value[i]==="wa"||value[i]==="at")){if(path[i+5]===path[i+7]){path[i+7]+=value[i+7]>value[i+5]?1:-1
}if(path[i+6]===path[i+8]){path[i+8]+=value[i+8]>value[i+6]?1:-1
}}}}}return path.join(" ")||"x"
},attr:function(hash,val){var wrapper=this,key,value,i,result,element=wrapper.element||{},elemStyle=element.style,nodeName=element.nodeName,renderer=wrapper.renderer,symbolName=wrapper.symbolName,hasSetSymbolSize,shadows=wrapper.shadows,skipAttr,attrSetters=wrapper.attrSetters,ret=wrapper;
if(isString(hash)&&defined(val)){key=hash;
hash={};
hash[key]=val
}if(isString(hash)){key=hash;
if(key==="strokeWidth"||key==="stroke-width"){ret=wrapper.strokeweight
}else{ret=wrapper[key]
}}else{for(key in hash){value=hash[key];
skipAttr=false;
result=attrSetters[key]&&attrSetters[key].call(wrapper,value,key);
if(result!==false&&value!==null){if(result!==UNDEFINED){value=result
}if(symbolName&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(key)){if(!hasSetSymbolSize){wrapper.symbolAttr(hash);
hasSetSymbolSize=true
}skipAttr=true
}else{if(key==="d"){value=value||[];
wrapper.d=value.join(" ");
element.path=value=wrapper.pathToVML(value);
if(shadows){i=shadows.length;
while(i--){shadows[i].path=shadows[i].cutOff?this.cutOffPath(value,shadows[i].cutOff):value
}}skipAttr=true
}else{if(key==="visibility"){if(value==="inherit"){value=VISIBLE
}if(shadows){i=shadows.length;
while(i--){shadows[i].style[key]=value
}}if(nodeName==="DIV"){value=value===HIDDEN?"-999em":0;
if(!docMode8){elemStyle[key]=value?VISIBLE:HIDDEN
}key="top"
}elemStyle[key]=value;
skipAttr=true
}else{if(key==="zIndex"){if(value){elemStyle[key]=value
}skipAttr=true
}else{if(inArray(key,["x","y","width","height"])!==-1){wrapper[key]=value;
if(key==="x"||key==="y"){key={x:"left",y:"top"}[key]
}else{value=mathMax(0,value)
}if(wrapper.updateClipping){wrapper[key]=value;
wrapper.updateClipping()
}else{elemStyle[key]=value
}skipAttr=true
}else{if(key==="class"&&nodeName==="DIV"){element.className=value
}else{if(key==="stroke"){value=renderer.color(value,element,key);
key="strokecolor"
}else{if(key==="stroke-width"||key==="strokeWidth"){element.stroked=value?true:false;
key="strokeweight";
wrapper[key]=value;
if(isNumber(value)){value+=PX
}}else{if(key==="dashstyle"){var strokeElem=element.getElementsByTagName("stroke")[0]||createElement(renderer.prepVML(["<stroke/>"]),null,null,element);
strokeElem[key]=value||"solid";
wrapper.dashstyle=value;
skipAttr=true
}else{if(key==="fill"){if(nodeName==="SPAN"){elemStyle.color=value
}else{if(nodeName!=="IMG"){element.filled=value!==NONE?true:false;
value=renderer.color(value,element,key,wrapper);
key="fillcolor"
}}}else{if(key==="opacity"){skipAttr=true
}else{if(nodeName==="shape"&&key==="rotation"){wrapper[key]=element.style[key]=value;
element.style.left=-mathRound(mathSin(value*deg2rad)+1)+PX;
element.style.top=mathRound(mathCos(value*deg2rad))+PX
}else{if(key==="translateX"||key==="translateY"||key==="rotation"){wrapper[key]=value;
wrapper.updateTransform();
skipAttr=true
}}}}}}}}}}}}}if(!skipAttr){if(docMode8){element[key]=value
}else{attr(element,key,value)
}}}}}return ret
},clip:function(clipRect){var wrapper=this,clipMembers,cssRet;
if(clipRect){clipMembers=clipRect.members;
erase(clipMembers,wrapper);
clipMembers.push(wrapper);
wrapper.destroyClip=function(){erase(clipMembers,wrapper)
};
cssRet=clipRect.getCSS(wrapper)
}else{if(wrapper.destroyClip){wrapper.destroyClip()
}cssRet={clip:docMode8?"inherit":"rect(auto)"}
}return wrapper.css(cssRet)
},css:SVGElement.prototype.htmlCss,safeRemoveChild:function(element){if(element.parentNode){discardElement(element)
}},destroy:function(){if(this.destroyClip){this.destroyClip()
}return SVGElement.prototype.destroy.apply(this)
},on:function(eventType,handler){this.element["on"+eventType]=function(){var evt=win.event;
evt.target=evt.srcElement;
handler(evt)
};
return this
},cutOffPath:function(path,length){var len;
path=path.split(/[ ,]/);
len=path.length;
if(len===9||len===11){path[len-4]=path[len-2]=pInt(path[len-2])-10*length
}return path.join(" ")
},shadow:function(shadowOptions,group,cutOff){var shadows=[],i,element=this.element,renderer=this.renderer,shadow,elemStyle=element.style,markup,path=element.path,strokeWidth,modifiedPath,shadowWidth,shadowElementOpacity;
if(path&&typeof path.value!=="string"){path="x"
}modifiedPath=path;
if(shadowOptions){shadowWidth=pick(shadowOptions.width,3);
shadowElementOpacity=(shadowOptions.opacity||0.15)/shadowWidth;
for(i=1;
i<=3;
i++){strokeWidth=(shadowWidth*2)+1-(2*i);
if(cutOff){modifiedPath=this.cutOffPath(path.value,strokeWidth+0.5)
}markup=['<shape isShadow="true" strokeweight="',strokeWidth,'" filled="false" path="',modifiedPath,'" coordsize="10 10" style="',element.style.cssText,'" />'];
shadow=createElement(renderer.prepVML(markup),null,{left:pInt(elemStyle.left)+pick(shadowOptions.offsetX,1),top:pInt(elemStyle.top)+pick(shadowOptions.offsetY,1)});
if(cutOff){shadow.cutOff=strokeWidth+1
}markup=['<stroke color="',shadowOptions.color||"black",'" opacity="',shadowElementOpacity*i,'"/>'];
createElement(renderer.prepVML(markup),null,null,shadow);
if(group){group.element.appendChild(shadow)
}else{element.parentNode.insertBefore(shadow,element)
}shadows.push(shadow)
}this.shadows=shadows
}return this
}};
VMLElement=extendClass(SVGElement,VMLElement);
var VMLRendererExtension={Element:VMLElement,isIE8:userAgent.indexOf("MSIE 8.0")>-1,init:function(container,width,height){var renderer=this,boxWrapper,box,css;
renderer.alignedObjects=[];
boxWrapper=renderer.createElement(DIV);
box=boxWrapper.element;
box.style.position=RELATIVE;
container.appendChild(boxWrapper.element);
renderer.isVML=true;
renderer.box=box;
renderer.boxWrapper=boxWrapper;
renderer.cache={};
renderer.setSize(width,height,false);
if(!doc.namespaces.hcv){doc.namespaces.add("hcv","urn:schemas-microsoft-com:vml");
css="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
try{doc.createStyleSheet().cssText=css
}catch(e){doc.styleSheets[0].cssText+=css
}}},isHidden:function(){return !this.box.offsetWidth
},clipRect:function(x,y,width,height){var clipRect=this.createElement(),isObj=isObject(x);
return extend(clipRect,{members:[],left:(isObj?x.x:x)+1,top:(isObj?x.y:y)+1,width:(isObj?x.width:width)-1,height:(isObj?x.height:height)-1,getCSS:function(wrapper){var element=wrapper.element,nodeName=element.nodeName,isShape=nodeName==="shape",inverted=wrapper.inverted,rect=this,top=rect.top-(isShape?element.offsetTop:0),left=rect.left,right=left+rect.width,bottom=top+rect.height,ret={clip:"rect("+mathRound(inverted?left:top)+"px,"+mathRound(inverted?bottom:right)+"px,"+mathRound(inverted?right:bottom)+"px,"+mathRound(inverted?top:left)+"px)"};
if(!inverted&&docMode8&&nodeName==="DIV"){extend(ret,{width:right+PX,height:bottom+PX})
}return ret
},updateClipping:function(){each(clipRect.members,function(member){member.css(clipRect.getCSS(member))
})
}})
},color:function(color,elem,prop,wrapper){var renderer=this,colorObject,regexRgba=/^rgba/,markup,fillType,ret=NONE;
if(color&&color.linearGradient){fillType="gradient"
}else{if(color&&color.radialGradient){fillType="pattern"
}}if(fillType){var stopColor,stopOpacity,gradient=color.linearGradient||color.radialGradient,x1,y1,x2,y2,opacity1,opacity2,color1,color2,fillAttr="",stops=color.stops,firstStop,lastStop,colors=[],addFillNode=function(){markup=['<fill colors="'+colors.join(",")+'" opacity="',opacity2,'" o:opacity2="',opacity1,'" type="',fillType,'" ',fillAttr,'focus="100%" method="any" />'];
createElement(renderer.prepVML(markup),null,null,elem)
};
firstStop=stops[0];
lastStop=stops[stops.length-1];
if(firstStop[0]>0){stops.unshift([0,firstStop[1]])
}if(lastStop[0]<1){stops.push([1,lastStop[1]])
}each(stops,function(stop,i){if(regexRgba.test(stop[1])){colorObject=Color(stop[1]);
stopColor=colorObject.get("rgb");
stopOpacity=colorObject.get("a")
}else{stopColor=stop[1];
stopOpacity=1
}colors.push((stop[0]*100)+"% "+stopColor);
if(!i){opacity1=stopOpacity;
color2=stopColor
}else{opacity2=stopOpacity;
color1=stopColor
}});
if(prop==="fill"){if(fillType==="gradient"){x1=gradient.x1||gradient[0]||0;
y1=gradient.y1||gradient[1]||0;
x2=gradient.x2||gradient[2]||0;
y2=gradient.y2||gradient[3]||0;
fillAttr='angle="'+(90-math.atan((y2-y1)/(x2-x1))*180/mathPI)+'"';
addFillNode()
}else{var r=gradient.r,sizex=r*2,sizey=r*2,cx=gradient.cx,cy=gradient.cy,radialReference=elem.radialReference,bBox,applyRadialGradient=function(){if(radialReference){bBox=wrapper.getBBox();
cx+=(radialReference[0]-bBox.x)/bBox.width-0.5;
cy+=(radialReference[1]-bBox.y)/bBox.height-0.5;
sizex*=radialReference[2]/bBox.width;
sizey*=radialReference[2]/bBox.height
}fillAttr='src="'+defaultOptions.global.VMLRadialGradientURL+'" size="'+sizex+","+sizey+'" origin="0.5,0.5" position="'+cx+","+cy+'" color2="'+color2+'" ';
addFillNode()
};
if(wrapper.added){applyRadialGradient()
}else{addEvent(wrapper,"add",applyRadialGradient)
}ret=color1
}}else{ret=stopColor
}}else{if(regexRgba.test(color)&&elem.tagName!=="IMG"){colorObject=Color(color);
markup=["<",prop,' opacity="',colorObject.get("a"),'"/>'];
createElement(this.prepVML(markup),null,null,elem);
ret=colorObject.get("rgb")
}else{var propNodes=elem.getElementsByTagName(prop);
if(propNodes.length){propNodes[0].opacity=1;
propNodes[0].type="solid"
}ret=color
}}return ret
},prepVML:function(markup){var vmlStyle="display:inline-block;behavior:url(#default#VML);",isIE8=this.isIE8;
markup=markup.join("");
if(isIE8){markup=markup.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />');
if(markup.indexOf('style="')===-1){markup=markup.replace("/>",' style="'+vmlStyle+'" />')
}else{markup=markup.replace('style="','style="'+vmlStyle)
}}else{markup=markup.replace("<","<hcv:")
}return markup
},text:SVGRenderer.prototype.html,path:function(path){var attr={coordsize:"10 10"};
if(isArray(path)){attr.d=path
}else{if(isObject(path)){extend(attr,path)
}}return this.createElement("shape").attr(attr)
},circle:function(x,y,r){var circle=this.symbol("circle");
if(isObject(x)){r=x.r;
y=x.y;
x=x.x
}circle.isCircle=true;
circle.r=r;
return circle.attr({x:x,y:y})
},g:function(name){var wrapper,attribs;
if(name){attribs={className:PREFIX+name,"class":PREFIX+name}
}wrapper=this.createElement(DIV).attr(attribs);
return wrapper
},image:function(src,x,y,width,height){var obj=this.createElement("img").attr({src:src});
if(arguments.length>1){obj.attr({x:x,y:y,width:width,height:height})
}return obj
},rect:function(x,y,width,height,r,strokeWidth){var wrapper=this.symbol("rect");
wrapper.r=isObject(x)?x.r:r;
return wrapper.attr(isObject(x)?x:wrapper.crisp(strokeWidth,x,y,mathMax(width,0),mathMax(height,0)))
},invertChild:function(element,parentNode){var ren=this,parentStyle=parentNode.style,imgStyle=element.tagName==="IMG"&&element.style;
css(element,{flip:"x",left:pInt(parentStyle.width)-(imgStyle?pInt(imgStyle.top):1),top:pInt(parentStyle.height)-(imgStyle?pInt(imgStyle.left):1),rotation:-90});
each(element.childNodes,function(child){ren.invertChild(child,element)
})
},symbols:{arc:function(x,y,w,h,options){var start=options.start,end=options.end,radius=options.r||w||h,innerRadius=options.innerR,cosStart=mathCos(start),sinStart=mathSin(start),cosEnd=mathCos(end),sinEnd=mathSin(end),ret;
if(end-start===0){return["x"]
}ret=["wa",x-radius,y-radius,x+radius,y+radius,x+radius*cosStart,y+radius*sinStart,x+radius*cosEnd,y+radius*sinEnd];
if(options.open&&!innerRadius){ret.push("e",M,x,y)
}ret.push("at",x-innerRadius,y-innerRadius,x+innerRadius,y+innerRadius,x+innerRadius*cosEnd,y+innerRadius*sinEnd,x+innerRadius*cosStart,y+innerRadius*sinStart,"x","e");
ret.isArc=true;
return ret
},circle:function(x,y,w,h,wrapper){if(wrapper){w=h=2*wrapper.r
}if(wrapper&&wrapper.isCircle){x-=w/2;
y-=h/2
}return["wa",x,y,x+w,y+h,x+w,y+h/2,x+w,y+h/2,"e"]
},rect:function(left,top,width,height,options){var right=left+width,bottom=top+height,ret,r;
if(!defined(options)||!options.r){ret=SVGRenderer.prototype.symbols.square.apply(0,arguments)
}else{r=mathMin(options.r,width,height);
ret=[M,left+r,top,L,right-r,top,"wa",right-2*r,top,right,top+2*r,right-r,top,right,top+r,L,right,bottom-r,"wa",right-2*r,bottom-2*r,right,bottom,right,bottom-r,right-r,bottom,L,left+r,bottom,"wa",left,bottom-2*r,left+2*r,bottom,left+r,bottom,left,bottom-r,L,left,top+r,"wa",left,top,left+2*r,top+2*r,left,top+r,left+r,top,"x","e"]
}return ret
}}};
Highmaps.VMLRenderer=VMLRenderer=function(){this.init.apply(this,arguments)
};
VMLRenderer.prototype=merge(SVGRenderer.prototype,VMLRendererExtension);
Renderer=VMLRenderer
}SVGRenderer.prototype.measureSpanWidth=function(text,styles){var measuringSpan=doc.createElement("span"),offsetWidth,textNode=doc.createTextNode(text);
measuringSpan.appendChild(textNode);
css(measuringSpan,styles);
this.box.appendChild(measuringSpan);
offsetWidth=measuringSpan.offsetWidth;
discardElement(measuringSpan);
return offsetWidth
};
var CanVGRenderer,CanVGController;
if(useCanVG){Highmaps.CanVGRenderer=CanVGRenderer=function(){SVG_NS="http://www.w3.org/1999/xhtml"
};
CanVGRenderer.prototype.symbols={};
CanVGController=(function(){var deferredRenderCalls=[];
function drawDeferred(){var callLength=deferredRenderCalls.length,callIndex;
for(callIndex=0;
callIndex<callLength;
callIndex++){deferredRenderCalls[callIndex]()
}deferredRenderCalls=[]
}return{push:function(func,scriptLocation){if(deferredRenderCalls.length===0){getScript(scriptLocation,drawDeferred)
}deferredRenderCalls.push(func)
}}
}());
Renderer=CanVGRenderer
}function Tick(axis,pos,type,noLabel){this.axis=axis;
this.pos=pos;
this.type=type||"";
this.isNew=true;
if(!type&&!noLabel){this.addLabel()
}}Tick.prototype={addLabel:function(){var tick=this,axis=tick.axis,options=axis.options,chart=axis.chart,horiz=axis.horiz,categories=axis.categories,names=axis.names,pos=tick.pos,labelOptions=options.labels,str,tickPositions=axis.tickPositions,width=(horiz&&categories&&!labelOptions.step&&!labelOptions.staggerLines&&!labelOptions.rotation&&chart.plotWidth/tickPositions.length)||(!horiz&&(chart.margin[3]||chart.chartWidth*0.33)),isFirst=pos===tickPositions[0],isLast=pos===tickPositions[tickPositions.length-1],css,attr,value=categories?pick(categories[pos],names[pos],pos):pos,label=tick.label,tickPositionInfo=tickPositions.info,dateTimeLabelFormat;
if(axis.isDatetimeAxis&&tickPositionInfo){dateTimeLabelFormat=options.dateTimeLabelFormats[tickPositionInfo.higherRanks[pos]||tickPositionInfo.unitName]
}tick.isFirst=isFirst;
tick.isLast=isLast;
axis.labelFormatter=strToFunction(axis.labelFormatter);
str=axis.labelFormatter.call({axis:axis,chart:chart,isFirst:isFirst,isLast:isLast,dateTimeLabelFormat:dateTimeLabelFormat,value:axis.isLog?correctFloat(lin2log(value)):value});
css=width&&{width:mathMax(1,mathRound(width-2*(labelOptions.padding||10)))+PX};
css=extend(css,labelOptions.style);
if(!defined(label)){attr={align:axis.labelAlign};
if(isNumber(labelOptions.rotation)){attr.rotation=labelOptions.rotation
}if(width&&labelOptions.ellipsis){attr._clipHeight=axis.len/tickPositions.length
}tick.label=defined(str)&&labelOptions.enabled?chart.renderer.text(str,0,0,labelOptions.useHTML).attr(attr).css(css).add(axis.labelGroup):null
}else{if(label){label.attr({text:str}).css(css)
}}},getLabelSize:function(){var label=this.label,axis=this.axis;
return label?label.getBBox()[axis.horiz?"height":"width"]:0
},getLabelSides:function(){var bBox=this.label.getBBox(),axis=this.axis,horiz=axis.horiz,options=axis.options,labelOptions=options.labels,size=horiz?bBox.width:bBox.height,leftSide=horiz?labelOptions.x-size*{left:0,center:0.5,right:1}[axis.labelAlign]:0,rightSide=horiz?size+leftSide:size;
return[leftSide,rightSide]
},handleOverflow:function(index,xy){var show=true,axis=this.axis,isFirst=this.isFirst,isLast=this.isLast,horiz=axis.horiz,pxPos=horiz?xy.x:xy.y,reversed=axis.reversed,tickPositions=axis.tickPositions,sides=this.getLabelSides(),leftSide=sides[0],rightSide=sides[1],axisLeft,axisRight,neighbour,neighbourEdge,line=this.label.line||0,labelEdge=axis.labelEdge,justifyLabel=axis.justifyLabels&&(isFirst||isLast),justifyToPlot;
if(labelEdge[line]===UNDEFINED||pxPos+leftSide>labelEdge[line]){labelEdge[line]=pxPos+rightSide
}else{if(!justifyLabel){show=false
}}if(justifyLabel){justifyToPlot=axis.justifyToPlot;
axisLeft=justifyToPlot?axis.pos:0;
axisRight=justifyToPlot?axisLeft+axis.len:axis.chart.chartWidth;
do{index+=(isFirst?1:-1);
neighbour=axis.ticks[tickPositions[index]]
}while(tickPositions[index]&&(!neighbour||neighbour.label.line!==line));
neighbourEdge=neighbour&&neighbour.label.xy&&neighbour.label.xy.x+neighbour.getLabelSides()[isFirst?0:1];
if((isFirst&&!reversed)||(isLast&&reversed)){if(pxPos+leftSide<axisLeft){pxPos=axisLeft-leftSide;
if(neighbour&&pxPos+rightSide>neighbourEdge){show=false
}}}else{if(pxPos+rightSide>axisRight){pxPos=axisRight-rightSide;
if(neighbour&&pxPos+leftSide<neighbourEdge){show=false
}}}xy.x=pxPos
}return show
},getPosition:function(horiz,pos,tickmarkOffset,old){var axis=this.axis,chart=axis.chart,cHeight=(old&&chart.oldChartHeight)||chart.chartHeight;
return{x:horiz?axis.translate(pos+tickmarkOffset,null,null,old)+axis.transB:axis.left+axis.offset+(axis.opposite?((old&&chart.oldChartWidth)||chart.chartWidth)-axis.right-axis.left:0),y:horiz?cHeight-axis.bottom+axis.offset-(axis.opposite?axis.height:0):cHeight-axis.translate(pos+tickmarkOffset,null,null,old)-axis.transB}
},getLabelPosition:function(x,y,label,horiz,labelOptions,tickmarkOffset,index,step){var axis=this.axis,transA=axis.transA,reversed=axis.reversed,staggerLines=axis.staggerLines,baseline=axis.chart.renderer.fontMetrics(labelOptions.style.fontSize).b,rotation=labelOptions.rotation;
x=x+labelOptions.x-(tickmarkOffset&&horiz?tickmarkOffset*transA*(reversed?-1:1):0);
y=y+labelOptions.y-(tickmarkOffset&&!horiz?tickmarkOffset*transA*(reversed?1:-1):0);
if(rotation&&axis.side===2){y-=baseline-baseline*mathCos(rotation*deg2rad)
}if(!defined(labelOptions.y)&&!rotation){y+=baseline-label.getBBox().height/2
}if(staggerLines){label.line=(index/(step||1)%staggerLines);
y+=label.line*(axis.labelOffset/staggerLines)
}return{x:x,y:y}
},getMarkPath:function(x,y,tickLength,tickWidth,horiz,renderer){return renderer.crispLine([M,x,y,L,x+(horiz?0:-tickLength),y+(horiz?tickLength:0)],tickWidth)
},render:function(index,old,opacity){var tick=this,axis=tick.axis,options=axis.options,chart=axis.chart,renderer=chart.renderer,horiz=axis.horiz,type=tick.type,label=tick.label,pos=tick.pos,labelOptions=options.labels,gridLine=tick.gridLine,gridPrefix=type?type+"Grid":"grid",tickPrefix=type?type+"Tick":"tick",gridLineWidth=options[gridPrefix+"LineWidth"],gridLineColor=options[gridPrefix+"LineColor"],dashStyle=options[gridPrefix+"LineDashStyle"],tickLength=options[tickPrefix+"Length"],tickWidth=options[tickPrefix+"Width"]||0,tickColor=options[tickPrefix+"Color"],tickPosition=options[tickPrefix+"Position"],gridLinePath,mark=tick.mark,markPath,step=labelOptions.step,attribs,show=true,tickmarkOffset=axis.tickmarkOffset,xy=tick.getPosition(horiz,pos,tickmarkOffset,old),x=xy.x,y=xy.y,reverseCrisp=((horiz&&x===axis.pos+axis.len)||(!horiz&&y===axis.pos))?-1:1;
this.isActive=true;
if(gridLineWidth){gridLinePath=axis.getPlotLinePath(pos+tickmarkOffset,gridLineWidth*reverseCrisp,old,true);
if(gridLine===UNDEFINED){attribs={stroke:gridLineColor,"stroke-width":gridLineWidth};
if(dashStyle){attribs.dashstyle=dashStyle
}if(!type){attribs.zIndex=1
}if(old){attribs.opacity=0
}tick.gridLine=gridLine=gridLineWidth?renderer.path(gridLinePath).attr(attribs).add(axis.gridGroup):null
}if(!old&&gridLine&&gridLinePath){gridLine[tick.isNew?"attr":"animate"]({d:gridLinePath,opacity:opacity})
}}if(tickWidth&&tickLength){if(tickPosition==="inside"){tickLength=-tickLength
}if(axis.opposite){tickLength=-tickLength
}markPath=tick.getMarkPath(x,y,tickLength,tickWidth*reverseCrisp,horiz,renderer);
if(mark){mark.animate({d:markPath,opacity:opacity})
}else{tick.mark=renderer.path(markPath).attr({stroke:tickColor,"stroke-width":tickWidth,opacity:opacity}).add(axis.axisGroup)
}}if(label&&!isNaN(x)){label.xy=xy=tick.getLabelPosition(x,y,label,horiz,labelOptions,tickmarkOffset,index,step);
if((tick.isFirst&&!tick.isLast&&!pick(options.showFirstLabel,1))||(tick.isLast&&!tick.isFirst&&!pick(options.showLastLabel,1))){show=false
}else{if(!axis.isRadial&&!labelOptions.step&&!labelOptions.rotation&&!old&&opacity!==0){show=tick.handleOverflow(index,xy)
}}if(step&&index%step){show=false
}if(show&&!isNaN(xy.y)){xy.opacity=opacity;
label[tick.isNew?"attr":"animate"](xy);
tick.isNew=false
}else{label.attr("y",-9999)
}}},destroy:function(){destroyObjectProperties(this,this.axis)
}};
function Axis(){this.init.apply(this,arguments)
}Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:false,gridLineColor:"#C0C0C0",labels:defaultLabelOptions,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:false,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:true,gridLineWidth:1,tickPixelInterval:72,showLastLabel:true,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:true,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:false,formatter:function(){return numberFormat(this.total,-1)
},style:defaultLabelOptions.style}},defaultLeftAxisOptions:{labels:{style:{lineHeight:"11px"},x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{style:{lineHeight:"11px"},x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},title:{rotation:0}},init:function(chart,userOptions){var isXAxis=userOptions.isX,axis=this;
axis.horiz=chart.inverted?!isXAxis:isXAxis;
axis.isXAxis=isXAxis;
axis.coll=isXAxis?"xAxis":"yAxis";
axis.opposite=userOptions.opposite;
axis.side=userOptions.side||(axis.horiz?(axis.opposite?0:2):(axis.opposite?1:3));
axis.setOptions(userOptions);
var options=this.options,type=options.type,isDatetimeAxis=type==="datetime";
options.labels.formatter=strToFunction(options.labels.formatter);
axis.labelFormatter=options.labels.formatter||axis.defaultLabelFormatter;
axis.userOptions=userOptions;
axis.minPixelPadding=0;
axis.chart=chart;
axis.reversed=options.reversed;
axis.zoomEnabled=options.zoomEnabled!==false;
axis.categories=options.categories||type==="category";
axis.names=[];
axis.isLog=type==="logarithmic";
axis.isDatetimeAxis=isDatetimeAxis;
axis.isLinked=defined(options.linkedTo);
axis.tickmarkOffset=(axis.categories&&options.tickmarkPlacement==="between")?0.5:0;
axis.ticks={};
axis.labelEdge=[];
axis.minorTicks={};
axis.plotLinesAndBands=[];
axis.alternateBands={};
axis.len=0;
axis.minRange=axis.userMinRange=options.minRange||options.maxZoom;
axis.range=options.range;
axis.offset=options.offset||0;
axis.stacks={};
axis.oldStacks={};
axis.max=null;
axis.min=null;
axis.crosshair=pick(options.crosshair,splat(chart.options.tooltip.crosshairs)[isXAxis?0:1],false);
var eventType,events=axis.options.events;
if(inArray(axis,chart.axes)===-1){if(isXAxis&&!this.isColorAxis){chart.axes.splice(chart.xAxis.length,0,axis)
}else{chart.axes.push(axis)
}chart[axis.coll].push(axis)
}axis.series=axis.series||[];
if(chart.inverted&&isXAxis&&axis.reversed===UNDEFINED){axis.reversed=true
}axis.removePlotBand=axis.removePlotBandOrLine;
axis.removePlotLine=axis.removePlotBandOrLine;
for(eventType in events){addEvent(axis,eventType,events[eventType])
}if(axis.isLog){axis.val2lin=log2lin;
axis.lin2val=lin2log
}},setOptions:function(userOptions){this.options=merge(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],merge(defaultOptions[this.coll],userOptions))
},defaultLabelFormatter:function(){var axis=this.axis,value=this.value,categories=axis.categories,dateTimeLabelFormat=this.dateTimeLabelFormat,numericSymbols=defaultOptions.lang.numericSymbols,i=numericSymbols&&numericSymbols.length,multi,ret,formatOption=axis.options.labels.format,numericSymbolDetector=axis.isLog?value:axis.tickInterval;
if(formatOption){ret=format(formatOption,this)
}else{if(categories){ret=value
}else{if(dateTimeLabelFormat){ret=dateFormat(dateTimeLabelFormat,value)
}else{if(i&&numericSymbolDetector>=1000){while(i--&&ret===UNDEFINED){multi=Math.pow(1000,i+1);
if(numericSymbolDetector>=multi&&numericSymbols[i]!==null){ret=numberFormat(value/multi,-1)+numericSymbols[i]
}}}}}}if(ret===UNDEFINED){if(value>=10000){ret=numberFormat(value,0)
}else{ret=numberFormat(value,-1,UNDEFINED,"")
}}return ret
},getSeriesExtremes:function(){var axis=this,chart=axis.chart;
axis.hasVisibleSeries=false;
axis.dataMin=axis.dataMax=null;
if(axis.buildStacks){axis.buildStacks()
}each(axis.series,function(series){if(series.visible||!chart.options.chart.ignoreHiddenSeries){var seriesOptions=series.options,xData,threshold=seriesOptions.threshold,seriesDataMin,seriesDataMax;
axis.hasVisibleSeries=true;
if(axis.isLog&&threshold<=0){threshold=null
}if(axis.isXAxis){xData=series.xData;
if(xData.length){axis.dataMin=mathMin(pick(axis.dataMin,xData[0]),arrayMin(xData));
axis.dataMax=mathMax(pick(axis.dataMax,xData[0]),arrayMax(xData))
}}else{series.getExtremes();
seriesDataMax=series.dataMax;
seriesDataMin=series.dataMin;
if(defined(seriesDataMin)&&defined(seriesDataMax)){axis.dataMin=mathMin(pick(axis.dataMin,seriesDataMin),seriesDataMin);
axis.dataMax=mathMax(pick(axis.dataMax,seriesDataMax),seriesDataMax)
}if(defined(threshold)){if(axis.dataMin>=threshold){axis.dataMin=threshold;
axis.ignoreMinPadding=true
}else{if(axis.dataMax<threshold){axis.dataMax=threshold;
axis.ignoreMaxPadding=true
}}}}}})
},translate:function(val,backwards,cvsCoord,old,handleLog,pointPlacement){var axis=this,sign=1,cvsOffset=0,localA=old?axis.oldTransA:axis.transA,localMin=old?axis.oldMin:axis.min,returnValue,minPixelPadding=axis.minPixelPadding,postTranslate=(axis.options.ordinal||(axis.isLog&&handleLog))&&axis.lin2val;
if(!localA){localA=axis.transA
}if(cvsCoord){sign*=-1;
cvsOffset=axis.len
}if(axis.reversed){sign*=-1;
cvsOffset-=sign*(axis.sector||axis.len)
}if(backwards){val=val*sign+cvsOffset;
val-=minPixelPadding;
returnValue=val/localA+localMin;
if(postTranslate){returnValue=axis.lin2val(returnValue)
}}else{if(postTranslate){val=axis.val2lin(val)
}if(pointPlacement==="between"){pointPlacement=0.5
}returnValue=sign*(val-localMin)*localA+cvsOffset+(sign*minPixelPadding)+(isNumber(pointPlacement)?localA*pointPlacement*axis.pointRange:0)
}return returnValue
},toPixels:function(value,paneCoordinates){return this.translate(value,false,!this.horiz,null,true)+(paneCoordinates?0:this.pos)
},toValue:function(pixel,paneCoordinates){return this.translate(pixel-(paneCoordinates?0:this.pos),true,!this.horiz,null,true)
},getPlotLinePath:function(value,lineWidth,old,force,translatedValue){var axis=this,chart=axis.chart,axisLeft=axis.left,axisTop=axis.top,x1,y1,x2,y2,cHeight=(old&&chart.oldChartHeight)||chart.chartHeight,cWidth=(old&&chart.oldChartWidth)||chart.chartWidth,skip,transB=axis.transB;
translatedValue=pick(translatedValue,axis.translate(value,null,null,old));
x1=x2=mathRound(translatedValue+transB);
y1=y2=mathRound(cHeight-translatedValue-transB);
if(isNaN(translatedValue)){skip=true
}else{if(axis.horiz){y1=axisTop;
y2=cHeight-axis.bottom;
if(x1<axisLeft||x1>axisLeft+axis.width){skip=true
}}else{x1=axisLeft;
x2=cWidth-axis.right;
if(y1<axisTop||y1>axisTop+axis.height){skip=true
}}}return skip&&!force?null:chart.renderer.crispLine([M,x1,y1,L,x2,y2],lineWidth||1)
},getLinearTickPositions:function(tickInterval,min,max){var pos,lastPos,roundedMin=correctFloat(mathFloor(min/tickInterval)*tickInterval),roundedMax=correctFloat(mathCeil(max/tickInterval)*tickInterval),tickPositions=[];
pos=roundedMin;
while(pos<=roundedMax){tickPositions.push(pos);
pos=correctFloat(pos+tickInterval);
if(pos===lastPos){break
}lastPos=pos
}return tickPositions
},getMinorTickPositions:function(){var axis=this,options=axis.options,tickPositions=axis.tickPositions,minorTickInterval=axis.minorTickInterval,minorTickPositions=[],pos,i,len;
if(axis.isLog){len=tickPositions.length;
for(i=1;
i<len;
i++){minorTickPositions=minorTickPositions.concat(axis.getLogTickPositions(minorTickInterval,tickPositions[i-1],tickPositions[i],true))
}}else{if(axis.isDatetimeAxis&&options.minorTickInterval==="auto"){minorTickPositions=minorTickPositions.concat(axis.getTimeTicks(axis.normalizeTimeTickInterval(minorTickInterval),axis.min,axis.max,options.startOfWeek));
if(minorTickPositions[0]<axis.min){minorTickPositions.shift()
}}else{for(pos=axis.min+(tickPositions[0]-axis.min)%minorTickInterval;
pos<=axis.max;
pos+=minorTickInterval){minorTickPositions.push(pos)
}}}return minorTickPositions
},adjustForMinRange:function(){var axis=this,options=axis.options,min=axis.min,max=axis.max,zoomOffset,spaceAvailable=axis.dataMax-axis.dataMin>=axis.minRange,closestDataRange,i,distance,xData,loopLength,minArgs,maxArgs;
if(axis.isXAxis&&axis.minRange===UNDEFINED&&!axis.isLog){if(defined(options.min)||defined(options.max)){axis.minRange=null
}else{each(axis.series,function(series){xData=series.xData;
loopLength=series.xIncrement?1:xData.length-1;
for(i=loopLength;
i>0;
i--){distance=xData[i]-xData[i-1];
if(closestDataRange===UNDEFINED||distance<closestDataRange){closestDataRange=distance
}}});
axis.minRange=mathMin(closestDataRange*5,axis.dataMax-axis.dataMin)
}}if(max-min<axis.minRange){var minRange=axis.minRange;
zoomOffset=(minRange-max+min)/2;
minArgs=[min-zoomOffset,pick(options.min,min-zoomOffset)];
if(spaceAvailable){minArgs[2]=axis.dataMin
}min=arrayMax(minArgs);
maxArgs=[min+minRange,pick(options.max,min+minRange)];
if(spaceAvailable){maxArgs[2]=axis.dataMax
}max=arrayMin(maxArgs);
if(max-min<minRange){minArgs[0]=max-minRange;
minArgs[1]=pick(options.min,max-minRange);
min=arrayMax(minArgs)
}}axis.min=min;
axis.max=max
},setAxisTranslation:function(saveOld){var axis=this,range=axis.max-axis.min,pointRange=0,closestPointRange,minPointOffset=0,pointRangePadding=0,linkedParent=axis.linkedParent,ordinalCorrection,hasCategories=!!axis.categories,transA=axis.transA;
if(axis.isXAxis||hasCategories){if(linkedParent){minPointOffset=linkedParent.minPointOffset;
pointRangePadding=linkedParent.pointRangePadding
}else{each(axis.series,function(series){var seriesPointRange=mathMax(series.pointRange,+hasCategories),pointPlacement=series.options.pointPlacement,seriesClosestPointRange=series.closestPointRange;
if(seriesPointRange>range){seriesPointRange=0
}pointRange=mathMax(pointRange,seriesPointRange);
minPointOffset=mathMax(minPointOffset,isString(pointPlacement)?0:seriesPointRange/2);
pointRangePadding=mathMax(pointRangePadding,pointPlacement==="on"?0:seriesPointRange);
if(!series.noSharedTooltip&&defined(seriesClosestPointRange)){closestPointRange=defined(closestPointRange)?mathMin(closestPointRange,seriesClosestPointRange):seriesClosestPointRange
}})
}ordinalCorrection=axis.ordinalSlope&&closestPointRange?axis.ordinalSlope/closestPointRange:1;
axis.minPointOffset=minPointOffset=minPointOffset*ordinalCorrection;
axis.pointRangePadding=pointRangePadding=pointRangePadding*ordinalCorrection;
axis.pointRange=mathMin(pointRange,range);
axis.closestPointRange=closestPointRange
}if(saveOld){axis.oldTransA=transA
}axis.translationSlope=axis.transA=transA=axis.len/((range+pointRangePadding)||1);
axis.transB=axis.horiz?axis.left:axis.bottom;
axis.minPixelPadding=transA*minPointOffset
},setTickPositions:function(secondPass){var axis=this,chart=axis.chart,options=axis.options,isLog=axis.isLog,isDatetimeAxis=axis.isDatetimeAxis,isXAxis=axis.isXAxis,isLinked=axis.isLinked,tickPositioner=axis.options.tickPositioner,maxPadding=options.maxPadding,minPadding=options.minPadding,length,linkedParentExtremes,tickIntervalOption=options.tickInterval,minTickIntervalOption=options.minTickInterval,tickPixelIntervalOption=options.tickPixelInterval,tickPositions,keepTwoTicksOnly,categories=axis.categories;
if(isLinked){axis.linkedParent=chart[axis.coll][options.linkedTo];
linkedParentExtremes=axis.linkedParent.getExtremes();
axis.min=pick(linkedParentExtremes.min,linkedParentExtremes.dataMin);
axis.max=pick(linkedParentExtremes.max,linkedParentExtremes.dataMax);
if(options.type!==axis.linkedParent.options.type){error(11,1)
}}else{axis.min=pick(axis.userMin,options.min,axis.dataMin);
axis.max=pick(axis.userMax,options.max,axis.dataMax)
}if(isLog){if(!secondPass&&mathMin(axis.min,pick(axis.dataMin,axis.min))<=0){error(10,1)
}axis.min=correctFloat(log2lin(axis.min));
axis.max=correctFloat(log2lin(axis.max))
}if(axis.range&&defined(axis.max)){axis.userMin=axis.min=mathMax(axis.min,axis.max-axis.range);
axis.userMax=axis.max;
axis.range=null
}if(axis.beforePadding){axis.beforePadding()
}axis.adjustForMinRange();
if(!categories&&!axis.usePercentage&&!isLinked&&defined(axis.min)&&defined(axis.max)){length=axis.max-axis.min;
if(length){if(!defined(options.min)&&!defined(axis.userMin)&&minPadding&&(axis.dataMin<0||!axis.ignoreMinPadding)){axis.min-=length*minPadding
}if(!defined(options.max)&&!defined(axis.userMax)&&maxPadding&&(axis.dataMax>0||!axis.ignoreMaxPadding)){axis.max+=length*maxPadding
}}}if(axis.min===axis.max||axis.min===undefined||axis.max===undefined){axis.tickInterval=1
}else{if(isLinked&&!tickIntervalOption&&tickPixelIntervalOption===axis.linkedParent.options.tickPixelInterval){axis.tickInterval=axis.linkedParent.tickInterval
}else{axis.tickInterval=pick(tickIntervalOption,categories?1:(axis.max-axis.min)*tickPixelIntervalOption/mathMax(axis.len,tickPixelIntervalOption));
if(!defined(tickIntervalOption)&&axis.len<tickPixelIntervalOption&&!this.isRadial&&!categories&&options.startOnTick&&options.endOnTick){keepTwoTicksOnly=true;
axis.tickInterval/=4
}}}if(isXAxis&&!secondPass){each(axis.series,function(series){series.processData(axis.min!==axis.oldMin||axis.max!==axis.oldMax)
})
}axis.setAxisTranslation(true);
if(axis.beforeSetTickPositions){axis.beforeSetTickPositions()
}if(axis.postProcessTickInterval){axis.tickInterval=axis.postProcessTickInterval(axis.tickInterval)
}if(axis.pointRange){axis.tickInterval=mathMax(axis.pointRange,axis.tickInterval)
}if(!tickIntervalOption&&axis.tickInterval<minTickIntervalOption){axis.tickInterval=minTickIntervalOption
}if(!isDatetimeAxis&&!isLog){if(!tickIntervalOption){axis.tickInterval=normalizeTickInterval(axis.tickInterval,null,getMagnitude(axis.tickInterval),options)
}}axis.minorTickInterval=options.minorTickInterval==="auto"&&axis.tickInterval?axis.tickInterval/5:options.minorTickInterval;
axis.tickPositions=tickPositions=options.tickPositions?[].concat(options.tickPositions):(tickPositioner&&tickPositioner.apply(axis,[axis.min,axis.max]));
if(!tickPositions){if(!axis.ordinalPositions&&(axis.max-axis.min)/axis.tickInterval>mathMax(2*axis.len,200)){error(19,true)
}if(isDatetimeAxis){tickPositions=axis.getTimeTicks(axis.normalizeTimeTickInterval(axis.tickInterval,options.units),axis.min,axis.max,options.startOfWeek,axis.ordinalPositions,axis.closestPointRange,true)
}else{if(isLog){tickPositions=axis.getLogTickPositions(axis.tickInterval,axis.min,axis.max)
}else{tickPositions=axis.getLinearTickPositions(axis.tickInterval,axis.min,axis.max)
}}if(keepTwoTicksOnly){tickPositions.splice(1,tickPositions.length-2)
}axis.tickPositions=tickPositions
}if(!isLinked){var roundedMin=tickPositions[0],roundedMax=tickPositions[tickPositions.length-1],minPointOffset=axis.minPointOffset||0,singlePad;
if(options.startOnTick){axis.min=roundedMin
}else{if(axis.min-minPointOffset>roundedMin){tickPositions.shift()
}}if(options.endOnTick){axis.max=roundedMax
}else{if(axis.max+minPointOffset<roundedMax){tickPositions.pop()
}}if(tickPositions.length===1){singlePad=mathAbs(axis.max||1)*0.001;
axis.min-=singlePad;
axis.max+=singlePad
}}},setMaxTicks:function(){var chart=this.chart,maxTicks=chart.maxTicks||{},tickPositions=this.tickPositions,key=this._maxTicksKey=[this.coll,this.pos,this.len].join("-");
if(!this.isLinked&&!this.isDatetimeAxis&&tickPositions&&tickPositions.length>(maxTicks[key]||0)&&this.options.alignTicks!==false){maxTicks[key]=tickPositions.length
}chart.maxTicks=maxTicks
},adjustTickAmount:function(){var axis=this,chart=axis.chart,key=axis._maxTicksKey,tickPositions=axis.tickPositions,maxTicks=chart.maxTicks;
if(maxTicks&&maxTicks[key]&&!axis.isDatetimeAxis&&!axis.categories&&!axis.isLinked&&axis.options.alignTicks!==false&&this.min!==UNDEFINED){var oldTickAmount=axis.tickAmount,calculatedTickAmount=tickPositions.length,tickAmount;
axis.tickAmount=tickAmount=maxTicks[key];
if(calculatedTickAmount<tickAmount){while(tickPositions.length<tickAmount){tickPositions.push(correctFloat(tickPositions[tickPositions.length-1]+axis.tickInterval))
}axis.transA*=(calculatedTickAmount-1)/(tickAmount-1);
axis.max=tickPositions[tickPositions.length-1]
}if(defined(oldTickAmount)&&tickAmount!==oldTickAmount){axis.isDirty=true
}}},setScale:function(){var axis=this,stacks=axis.stacks,type,i,isDirtyData,isDirtyAxisLength;
axis.oldMin=axis.min;
axis.oldMax=axis.max;
axis.oldAxisLength=axis.len;
axis.setAxisSize();
isDirtyAxisLength=axis.len!==axis.oldAxisLength;
each(axis.series,function(series){if(series.isDirtyData||series.isDirty||series.xAxis.isDirty){isDirtyData=true
}});
if(isDirtyAxisLength||isDirtyData||axis.isLinked||axis.forceRedraw||axis.userMin!==axis.oldUserMin||axis.userMax!==axis.oldUserMax){if(!axis.isXAxis){for(type in stacks){for(i in stacks[type]){stacks[type][i].total=null;
stacks[type][i].cum=0
}}}axis.forceRedraw=false;
axis.getSeriesExtremes();
axis.setTickPositions();
axis.oldUserMin=axis.userMin;
axis.oldUserMax=axis.userMax;
if(!axis.isDirty){axis.isDirty=isDirtyAxisLength||axis.min!==axis.oldMin||axis.max!==axis.oldMax
}}else{if(!axis.isXAxis){if(axis.oldStacks){stacks=axis.stacks=axis.oldStacks
}for(type in stacks){for(i in stacks[type]){stacks[type][i].cum=stacks[type][i].total
}}}}axis.setMaxTicks()
},setExtremes:function(newMin,newMax,redraw,animation,eventArguments){var axis=this,chart=axis.chart;
redraw=pick(redraw,true);
eventArguments=extend(eventArguments,{min:newMin,max:newMax});
fireEvent(axis,"setExtremes",eventArguments,function(){axis.userMin=newMin;
axis.userMax=newMax;
axis.eventArgs=eventArguments;
axis.isDirtyExtremes=true;
if(redraw){chart.redraw(animation)
}})
},zoom:function(newMin,newMax){var dataMin=this.dataMin,dataMax=this.dataMax,options=this.options;
if(!this.allowZoomOutside){if(defined(dataMin)&&newMin<=mathMin(dataMin,pick(options.min,dataMin))){newMin=UNDEFINED
}if(defined(dataMax)&&newMax>=mathMax(dataMax,pick(options.max,dataMax))){newMax=UNDEFINED
}}this.displayBtn=newMin!==UNDEFINED||newMax!==UNDEFINED;
this.setExtremes(newMin,newMax,false,UNDEFINED,{trigger:"zoom"});
return true
},setAxisSize:function(){var chart=this.chart,options=this.options,offsetLeft=options.offsetLeft||0,offsetRight=options.offsetRight||0,horiz=this.horiz,width,height,top,left;
this.left=left=pick(options.left,chart.plotLeft+offsetLeft);
this.top=top=pick(options.top,chart.plotTop);
this.width=width=pick(options.width,chart.plotWidth-offsetLeft+offsetRight);
this.height=height=pick(options.height,chart.plotHeight);
this.bottom=chart.chartHeight-height-top;
this.right=chart.chartWidth-width-left;
this.len=mathMax(horiz?width:height,0);
this.pos=horiz?left:top
},getExtremes:function(){var axis=this,isLog=axis.isLog;
return{min:isLog?correctFloat(lin2log(axis.min)):axis.min,max:isLog?correctFloat(lin2log(axis.max)):axis.max,dataMin:axis.dataMin,dataMax:axis.dataMax,userMin:axis.userMin,userMax:axis.userMax}
},getThreshold:function(threshold){var axis=this,isLog=axis.isLog;
var realMin=isLog?lin2log(axis.min):axis.min,realMax=isLog?lin2log(axis.max):axis.max;
if(realMin>threshold||threshold===null){threshold=realMin
}else{if(realMax<threshold){threshold=realMax
}}return axis.translate(threshold,0,1,0,1)
},autoLabelAlign:function(rotation){var ret,angle=(pick(rotation,0)-(this.side*90)+720)%360;
if(angle>15&&angle<165){ret="right"
}else{if(angle>195&&angle<345){ret="left"
}else{ret="center"
}}return ret
},getOffset:function(){var axis=this,chart=axis.chart,renderer=chart.renderer,options=axis.options,tickPositions=axis.tickPositions,ticks=axis.ticks,horiz=axis.horiz,side=axis.side,invertedSide=chart.inverted?[1,0,3,2][side]:side,hasData,showAxis,titleOffset=0,titleOffsetOption,titleMargin=0,axisTitleOptions=options.title,labelOptions=options.labels,labelOffset=0,axisOffset=chart.axisOffset,clipOffset=chart.clipOffset,directionFactor=[-1,1,1,-1][side],n,i,autoStaggerLines=1,maxStaggerLines=pick(labelOptions.maxStaggerLines,5),sortedPositions,lastRight,overlap,pos,bBox,x,w,lineNo;
axis.hasData=hasData=(axis.hasVisibleSeries||(defined(axis.min)&&defined(axis.max)&&!!tickPositions));
axis.showAxis=showAxis=hasData||pick(options.showEmpty,true);
axis.staggerLines=axis.horiz&&labelOptions.staggerLines;
if(!axis.axisGroup){axis.gridGroup=renderer.g("grid").attr({zIndex:options.gridZIndex||1}).add();
axis.axisGroup=renderer.g("axis").attr({zIndex:options.zIndex||2}).add();
axis.labelGroup=renderer.g("axis-labels").attr({zIndex:labelOptions.zIndex||7}).add()
}if(hasData||axis.isLinked){axis.labelAlign=pick(labelOptions.align||axis.autoLabelAlign(labelOptions.rotation));
each(tickPositions,function(pos){if(!ticks[pos]){ticks[pos]=new Tick(axis,pos)
}else{ticks[pos].addLabel()
}});
if(axis.horiz&&!axis.staggerLines&&maxStaggerLines&&!labelOptions.rotation){sortedPositions=axis.reversed?[].concat(tickPositions).reverse():tickPositions;
while(autoStaggerLines<maxStaggerLines){lastRight=[];
overlap=false;
for(i=0;
i<sortedPositions.length;
i++){pos=sortedPositions[i];
bBox=ticks[pos].label&&ticks[pos].label.getBBox();
w=bBox?bBox.width:0;
lineNo=i%autoStaggerLines;
if(w){x=axis.translate(pos);
if(lastRight[lineNo]!==UNDEFINED&&x<lastRight[lineNo]){overlap=true
}lastRight[lineNo]=x+w
}}if(overlap){autoStaggerLines++
}else{break
}}if(autoStaggerLines>1){axis.staggerLines=autoStaggerLines
}}each(tickPositions,function(pos){if(side===0||side===2||{1:"left",3:"right"}[side]===axis.labelAlign){labelOffset=mathMax(ticks[pos].getLabelSize(),labelOffset)
}});
if(axis.staggerLines){labelOffset*=axis.staggerLines;
axis.labelOffset=labelOffset
}}else{for(n in ticks){ticks[n].destroy();
delete ticks[n]
}}if(axisTitleOptions&&axisTitleOptions.text&&axisTitleOptions.enabled!==false){if(!axis.axisTitle){axis.axisTitle=renderer.text(axisTitleOptions.text,0,0,axisTitleOptions.useHTML).attr({zIndex:7,rotation:axisTitleOptions.rotation||0,align:axisTitleOptions.textAlign||{low:"left",middle:"center",high:"right"}[axisTitleOptions.align]}).css(axisTitleOptions.style).add(axis.axisGroup);
axis.axisTitle.isNew=true
}if(showAxis){titleOffset=axis.axisTitle.getBBox()[horiz?"height":"width"];
titleMargin=pick(axisTitleOptions.margin,horiz?5:10);
titleOffsetOption=axisTitleOptions.offset
}axis.axisTitle[showAxis?"show":"hide"]()
}axis.offset=directionFactor*pick(options.offset,axisOffset[side]);
axis.axisTitleMargin=pick(titleOffsetOption,labelOffset+titleMargin+(side!==2&&labelOffset&&directionFactor*options.labels[horiz?"y":"x"]));
axisOffset[side]=mathMax(axisOffset[side],axis.axisTitleMargin+titleOffset+directionFactor*axis.offset);
clipOffset[invertedSide]=mathMax(clipOffset[invertedSide],mathFloor(options.lineWidth/2)*2)
},getLinePath:function(lineWidth){var chart=this.chart,opposite=this.opposite,offset=this.offset,horiz=this.horiz,lineLeft=this.left+(opposite?this.width:0)+offset,lineTop=chart.chartHeight-this.bottom-(opposite?this.height:0)+offset;
if(opposite){lineWidth*=-1
}return chart.renderer.crispLine([M,horiz?this.left:lineLeft,horiz?lineTop:this.top,L,horiz?chart.chartWidth-this.right:lineLeft,horiz?lineTop:chart.chartHeight-this.bottom],lineWidth)
},getTitlePosition:function(){var horiz=this.horiz,axisLeft=this.left,axisTop=this.top,axisLength=this.len,axisTitleOptions=this.options.title,margin=horiz?axisLeft:axisTop,opposite=this.opposite,offset=this.offset,fontSize=pInt(axisTitleOptions.style.fontSize||12),alongAxis={low:margin+(horiz?0:axisLength),middle:margin+axisLength/2,high:margin+(horiz?axisLength:0)}[axisTitleOptions.align],offAxis=(horiz?axisTop+this.height:axisLeft)+(horiz?1:-1)*(opposite?-1:1)*this.axisTitleMargin+(this.side===2?fontSize:0);
return{x:horiz?alongAxis:offAxis+(opposite?this.width:0)+offset+(axisTitleOptions.x||0),y:horiz?offAxis-(opposite?this.height:0)+offset:alongAxis+(axisTitleOptions.y||0)}
},render:function(){var axis=this,horiz=axis.horiz,reversed=axis.reversed,chart=axis.chart,renderer=chart.renderer,options=axis.options,isLog=axis.isLog,isLinked=axis.isLinked,tickPositions=axis.tickPositions,sortedPositions,axisTitle=axis.axisTitle,ticks=axis.ticks,minorTicks=axis.minorTicks,alternateBands=axis.alternateBands,stackLabelOptions=options.stackLabels,alternateGridColor=options.alternateGridColor,tickmarkOffset=axis.tickmarkOffset,lineWidth=options.lineWidth,linePath,hasRendered=chart.hasRendered,slideInTicks=hasRendered&&defined(axis.oldMin)&&!isNaN(axis.oldMin),hasData=axis.hasData,showAxis=axis.showAxis,from,overflow=options.labels.overflow,justifyLabels=axis.justifyLabels=horiz&&overflow!==false,to;
axis.labelEdge.length=0;
axis.justifyToPlot=overflow==="justify";
each([ticks,minorTicks,alternateBands],function(coll){var pos;
for(pos in coll){coll[pos].isActive=false
}});
if(hasData||isLinked){if(axis.minorTickInterval&&!axis.categories){each(axis.getMinorTickPositions(),function(pos){if(!minorTicks[pos]){minorTicks[pos]=new Tick(axis,pos,"minor")
}if(slideInTicks&&minorTicks[pos].isNew){minorTicks[pos].render(null,true)
}minorTicks[pos].render(null,false,1)
})
}if(tickPositions.length){sortedPositions=tickPositions.slice();
if((horiz&&reversed)||(!horiz&&!reversed)){sortedPositions.reverse()
}if(justifyLabels){sortedPositions=sortedPositions.slice(1).concat([sortedPositions[0]])
}each(sortedPositions,function(pos,i){if(justifyLabels){i=(i===sortedPositions.length-1)?0:i+1
}if(!isLinked||(pos>=axis.min&&pos<=axis.max)){if(!ticks[pos]){ticks[pos]=new Tick(axis,pos)
}if(slideInTicks&&ticks[pos].isNew){ticks[pos].render(i,true,0.1)
}ticks[pos].render(i,false,1)
}});
if(tickmarkOffset&&axis.min===0){if(!ticks[-1]){ticks[-1]=new Tick(axis,-1,null,true)
}ticks[-1].render(-1)
}}if(alternateGridColor){each(tickPositions,function(pos,i){if(i%2===0&&pos<axis.max){if(!alternateBands[pos]){alternateBands[pos]=new Highmaps.PlotLineOrBand(axis)
}from=pos+tickmarkOffset;
to=tickPositions[i+1]!==UNDEFINED?tickPositions[i+1]+tickmarkOffset:axis.max;
alternateBands[pos].options={from:isLog?lin2log(from):from,to:isLog?lin2log(to):to,color:alternateGridColor};
alternateBands[pos].render();
alternateBands[pos].isActive=true
}})
}if(!axis._addedPlotLB){each((options.plotLines||[]).concat(options.plotBands||[]),function(plotLineOptions){axis.addPlotBandOrLine(plotLineOptions)
});
axis._addedPlotLB=true
}}each([ticks,minorTicks,alternateBands],function(coll){var pos,i,forDestruction=[],delay=globalAnimation?globalAnimation.duration||500:0,destroyInactiveItems=function(){i=forDestruction.length;
while(i--){if(coll[forDestruction[i]]&&!coll[forDestruction[i]].isActive){coll[forDestruction[i]].destroy();
delete coll[forDestruction[i]]
}}};
for(pos in coll){if(!coll[pos].isActive){coll[pos].render(pos,false,0);
coll[pos].isActive=false;
forDestruction.push(pos)
}}if(coll===alternateBands||!chart.hasRendered||!delay){destroyInactiveItems()
}else{if(delay){setTimeout(destroyInactiveItems,delay)
}}});
if(lineWidth){linePath=axis.getLinePath(lineWidth);
if(!axis.axisLine){axis.axisLine=renderer.path(linePath).attr({stroke:options.lineColor,"stroke-width":lineWidth,zIndex:7}).add(axis.axisGroup)
}else{axis.axisLine.animate({d:linePath})
}axis.axisLine[showAxis?"show":"hide"]()
}if(axisTitle&&showAxis){axisTitle[axisTitle.isNew?"attr":"animate"](axis.getTitlePosition());
axisTitle.isNew=false
}if(stackLabelOptions&&stackLabelOptions.enabled){axis.renderStackTotals()
}axis.isDirty=false
},redraw:function(){var axis=this,chart=axis.chart,pointer=chart.pointer;
if(pointer){pointer.reset(true)
}axis.render();
each(axis.plotLinesAndBands,function(plotLine){plotLine.render()
});
each(axis.series,function(series){series.isDirty=true
})
},destroy:function(keepEvents){var axis=this,stacks=axis.stacks,stackKey,plotLinesAndBands=axis.plotLinesAndBands,i;
if(!keepEvents){removeEvent(axis)
}for(stackKey in stacks){destroyObjectProperties(stacks[stackKey]);
stacks[stackKey]=null
}each([axis.ticks,axis.minorTicks,axis.alternateBands],function(coll){destroyObjectProperties(coll)
});
i=plotLinesAndBands.length;
while(i--){plotLinesAndBands[i].destroy()
}each(["stackTotalGroup","axisLine","axisTitle","axisGroup","cross","gridGroup","labelGroup"],function(prop){if(axis[prop]){axis[prop]=axis[prop].destroy()
}});
if(this.cross){this.cross.destroy()
}},drawCrosshair:function(e,point){if(!this.crosshair){return
}if((defined(point)||!pick(this.crosshair.snap,true))===false){this.hideCrosshair();
return
}var path,options=this.crosshair,animation=options.animation,pos;
if(!pick(options.snap,true)){pos=(this.horiz?e.chartX-this.pos:this.len-e.chartY+this.pos)
}else{if(defined(point)){pos=(this.chart.inverted!=this.horiz)?point.plotX:this.len-point.plotY
}}if(this.isRadial){path=this.getPlotLinePath(this.isXAxis?point.x:pick(point.stackY,point.y))
}else{path=this.getPlotLinePath(null,null,null,null,pos)
}if(path===null){this.hideCrosshair();
return
}if(this.cross){this.cross.attr({visibility:VISIBLE})[animation?"animate":"attr"]({d:path},animation)
}else{var attribs={"stroke-width":options.width||1,stroke:options.color||"#C0C0C0",zIndex:options.zIndex||2};
if(options.dashStyle){attribs.dashstyle=options.dashStyle
}this.cross=this.chart.renderer.path(path).attr(attribs).add()
}},hideCrosshair:function(){if(this.cross){this.cross.hide()
}}};
extend(Axis.prototype,AxisPlotLineOrBandExtension);
Axis.prototype.getLogTickPositions=function(interval,min,max,minor){var axis=this,options=axis.options,axisLength=axis.len,positions=[];
if(!minor){axis._minorAutoInterval=null
}if(interval>=0.5){interval=mathRound(interval);
positions=axis.getLinearTickPositions(interval,min,max)
}else{if(interval>=0.08){var roundedMin=mathFloor(min),intermediate,i,j,len,pos,lastPos,break2;
if(interval>0.3){intermediate=[1,2,4]
}else{if(interval>0.15){intermediate=[1,2,4,6,8]
}else{intermediate=[1,2,3,4,5,6,7,8,9]
}}for(i=roundedMin;
i<max+1&&!break2;
i++){len=intermediate.length;
for(j=0;
j<len&&!break2;
j++){pos=log2lin(lin2log(i)*intermediate[j]);
if(pos>min&&(!minor||lastPos<=max)){positions.push(lastPos)
}if(lastPos>max){break2=true
}lastPos=pos
}}}else{var realMin=lin2log(min),realMax=lin2log(max),tickIntervalOption=options[minor?"minorTickInterval":"tickInterval"],filteredTickIntervalOption=tickIntervalOption==="auto"?null:tickIntervalOption,tickPixelIntervalOption=options.tickPixelInterval/(minor?5:1),totalPixelLength=minor?axisLength/axis.tickPositions.length:axisLength;
interval=pick(filteredTickIntervalOption,axis._minorAutoInterval,(realMax-realMin)*tickPixelIntervalOption/(totalPixelLength||1));
interval=normalizeTickInterval(interval,null,getMagnitude(interval));
positions=map(axis.getLinearTickPositions(interval,realMin,realMax),log2lin);
if(!minor){axis._minorAutoInterval=interval/5
}}}if(!minor){axis.tickInterval=interval
}return positions
};
var Tooltip=Highmaps.Tooltip=function(){this.init.apply(this,arguments)
};
Tooltip.prototype={init:function(chart,options){var borderWidth=options.borderWidth,style=options.style,padding=pInt(style.padding);
this.chart=chart;
this.options=options;
this.crosshairs=[];
this.now={x:0,y:0};
this.isHidden=true;
this.label=chart.renderer.label("",0,0,options.shape,null,null,options.useHTML,null,"tooltip").attr({padding:padding,fill:options.backgroundColor,"stroke-width":borderWidth,r:options.borderRadius,zIndex:8}).css(style).css({padding:0}).add().attr({y:-9999});
if(!useCanVG){this.label.shadow(options.shadow)
}this.shared=options.shared
},destroy:function(){if(this.label){this.label=this.label.destroy()
}clearTimeout(this.hideTimer);
clearTimeout(this.tooltipTimeout)
},move:function(x,y,anchorX,anchorY){var tooltip=this,now=tooltip.now,animate=tooltip.options.animation!==false&&!tooltip.isHidden;
extend(now,{x:animate?(2*now.x+x)/3:x,y:animate?(now.y+y)/2:y,anchorX:animate?(2*now.anchorX+anchorX)/3:anchorX,anchorY:animate?(now.anchorY+anchorY)/2:anchorY});
tooltip.label.attr(now);
if(animate&&(mathAbs(x-now.x)>1||mathAbs(y-now.y)>1)){clearTimeout(this.tooltipTimeout);
this.tooltipTimeout=setTimeout(function(){if(tooltip){tooltip.move(x,y,anchorX,anchorY)
}},32)
}},hide:function(){var tooltip=this,hoverPoints;
clearTimeout(this.hideTimer);
if(!this.isHidden){hoverPoints=this.chart.hoverPoints;
this.hideTimer=setTimeout(function(){tooltip.label.fadeOut();
tooltip.isHidden=true
},pick(this.options.hideDelay,500));
if(hoverPoints){each(hoverPoints,function(point){point.setState()
})
}this.chart.hoverPoints=null
}},getAnchor:function(points,mouseEvent){var ret,chart=this.chart,inverted=chart.inverted,plotTop=chart.plotTop,plotX=0,plotY=0,yAxis;
points=splat(points);
ret=points[0].tooltipPos;
if(this.followPointer&&mouseEvent){if(mouseEvent.chartX===UNDEFINED){mouseEvent=chart.pointer.normalize(mouseEvent)
}ret=[mouseEvent.chartX-chart.plotLeft,mouseEvent.chartY-plotTop]
}if(!ret){each(points,function(point){yAxis=point.series.yAxis;
plotX+=point.plotX;
plotY+=(point.plotLow?(point.plotLow+point.plotHigh)/2:point.plotY)+(!inverted&&yAxis?yAxis.top-plotTop:0)
});
plotX/=points.length;
plotY/=points.length;
ret=[inverted?chart.plotWidth-plotY:plotX,this.shared&&!inverted&&points.length>1&&mouseEvent?mouseEvent.chartY-plotTop:inverted?chart.plotHeight-plotX:plotY]
}return map(ret,mathRound)
},getPosition:function(boxWidth,boxHeight,point){var chart=this.chart,plotLeft=chart.plotLeft,plotTop=chart.plotTop,plotWidth=chart.plotWidth,plotHeight=chart.plotHeight,distance=pick(this.options.distance,12),pointX=(isNaN(point.plotX)?0:point.plotX),pointY=point.plotY,x=pointX+plotLeft+(chart.inverted?distance:-boxWidth-distance),y=pointY-boxHeight+plotTop+15,alignedRight;
if(x<7){x=plotLeft+mathMax(pointX,0)+distance
}if((x+boxWidth)>(plotLeft+plotWidth)){x-=(x+boxWidth)-(plotLeft+plotWidth);
y=pointY-boxHeight+plotTop-distance;
alignedRight=true
}if(y<plotTop+5){y=plotTop+5;
if(alignedRight&&pointY>=y&&pointY<=(y+boxHeight)){y=pointY+plotTop+distance
}}if(y+boxHeight>plotTop+plotHeight){y=mathMax(plotTop,plotTop+plotHeight-boxHeight-distance)
}return{x:x,y:y}
},defaultFormatter:function(tooltip){var items=this.points||splat(this),series=items[0].series,s;
s=[tooltip.tooltipHeaderFormatter(items[0])];
each(items,function(item){series=item.series;
s.push((series.tooltipFormatter&&series.tooltipFormatter(item))||item.point.tooltipFormatter(series.tooltipOptions.pointFormat))
});
s.push(tooltip.options.footerFormat||"");
return s.join("")
},refresh:function(point,mouseEvent){var tooltip=this,chart=tooltip.chart,label=tooltip.label,options=tooltip.options,x,y,anchor,textConfig={},text,pointConfig=[],formatter=options.formatter||tooltip.defaultFormatter,hoverPoints=chart.hoverPoints,borderColor,shared=tooltip.shared,currentSeries;
clearTimeout(this.hideTimer);
tooltip.followPointer=splat(point)[0].series.tooltipOptions.followPointer;
anchor=tooltip.getAnchor(point,mouseEvent);
x=anchor[0];
y=anchor[1];
if(shared&&!(point.series&&point.series.noSharedTooltip)){chart.hoverPoints=point;
if(hoverPoints){each(hoverPoints,function(point){point.setState()
})
}each(point,function(item){item.setState(HOVER_STATE);
pointConfig.push(item.getLabelConfig())
});
textConfig={x:point[0].category,y:point[0].y};
textConfig.points=pointConfig;
point=point[0]
}else{textConfig=point.getLabelConfig()
}formatter=strToFunction(formatter);
text=formatter.call(textConfig,tooltip);
currentSeries=point.series;
if(text===false){this.hide()
}else{if(tooltip.isHidden){stop(label);
label.attr("opacity",1).show()
}label.attr({text:text});
borderColor=options.borderColor||point.color||currentSeries.color||"#606060";
label.attr({stroke:borderColor});
tooltip.updatePosition({plotX:x,plotY:y});
this.isHidden=false
}fireEvent(chart,"tooltipRefresh",{text:text,x:x+chart.plotLeft,y:y+chart.plotTop,borderColor:borderColor})
},updatePosition:function(point){this.options.positioner=strToFunction(this.options.positioner);
var chart=this.chart,label=this.label,pos=(this.options.positioner||this.getPosition).call(this,label.width,label.height,point);
this.move(mathRound(pos.x),mathRound(pos.y),point.plotX+chart.plotLeft,point.plotY+chart.plotTop)
},tooltipHeaderFormatter:function(point){var series=point.series,tooltipOptions=series.tooltipOptions,dateTimeLabelFormats=tooltipOptions.dateTimeLabelFormats,xDateFormat=tooltipOptions.xDateFormat,xAxis=series.xAxis,isDateTime=xAxis&&xAxis.options.type==="datetime"&&isNumber(point.key),headerFormat=tooltipOptions.headerFormat,closestPointRange=xAxis&&xAxis.closestPointRange,n;
if(isDateTime&&!xDateFormat){if(closestPointRange){for(n in timeUnits){if(timeUnits[n]>=closestPointRange||point.key%timeUnits[n]>0){xDateFormat=dateTimeLabelFormats[n];
break
}}}else{xDateFormat=dateTimeLabelFormats.day
}xDateFormat=xDateFormat||dateTimeLabelFormats.year
}if(isDateTime&&xDateFormat){headerFormat=headerFormat.replace("{point.key}","{point.key:"+xDateFormat+"}")
}return format(headerFormat,{point:point,series:series})
}};
hasTouch=doc.documentElement.ontouchstart!==UNDEFINED;
var Pointer=Highmaps.Pointer=function(chart,options){this.init(chart,options)
};
Pointer.prototype={init:function(chart,options){var chartOptions=options.chart,chartEvents=chartOptions.events,zoomType=useCanVG?"":chartOptions.zoomType,inverted=chart.inverted,zoomX,zoomY;
this.options=options;
this.chart=chart;
this.zoomX=zoomX=/x/.test(zoomType);
this.zoomY=zoomY=/y/.test(zoomType);
this.zoomHor=(zoomX&&!inverted)||(zoomY&&inverted);
this.zoomVert=(zoomY&&!inverted)||(zoomX&&inverted);
this.runChartClick=chartEvents&&!!chartEvents.click;
this.pinchDown=[];
this.lastValidTouch={};
if(Highmaps.Tooltip&&options.tooltip.enabled){chart.tooltip=new Tooltip(chart,options.tooltip)
}this.setDOMEvents()
},normalize:function(e,chartPosition){var chartX,chartY,ePos;
e=e||win.event;
e=washMouseEvent(e);
if(!e.target){e.target=e.srcElement
}ePos=e.touches?e.touches.item(0):e;
if(!chartPosition){this.chartPosition=chartPosition=offset(this.chart.container)
}if(ePos.pageX===UNDEFINED){chartX=mathMax(e.x,e.clientX-chartPosition.left);
chartY=e.y
}else{chartX=ePos.pageX-chartPosition.left;
chartY=ePos.pageY-chartPosition.top
}return extend(e,{chartX:mathRound(chartX),chartY:mathRound(chartY)})
},getCoordinates:function(e){var coordinates={xAxis:[],yAxis:[]};
each(this.chart.axes,function(axis){coordinates[axis.isXAxis?"xAxis":"yAxis"].push({axis:axis,value:axis.toValue(e[axis.horiz?"chartX":"chartY"])})
});
return coordinates
},getIndex:function(e){var chart=this.chart;
return chart.inverted?chart.plotHeight+chart.plotTop-e.chartY:e.chartX-chart.plotLeft
},runPointActions:function(e){var pointer=this,chart=pointer.chart,series=chart.series,tooltip=chart.tooltip,point,points,hoverPoint=chart.hoverPoint,hoverSeries=chart.hoverSeries,i,j,distance=chart.chartWidth,index=pointer.getIndex(e),anchor;
if(tooltip&&pointer.options.tooltip.shared&&!(hoverSeries&&hoverSeries.noSharedTooltip)){points=[];
i=series.length;
for(j=0;
j<i;
j++){if(series[j].visible&&series[j].options.enableMouseTracking!==false&&!series[j].noSharedTooltip&&series[j].singularTooltips!==true&&series[j].tooltipPoints.length){point=series[j].tooltipPoints[index];
if(point&&point.series){point._dist=mathAbs(index-point.clientX);
distance=mathMin(distance,point._dist);
points.push(point)
}}}i=points.length;
while(i--){if(points[i]._dist>distance){points.splice(i,1)
}}if(points.length&&(points[0].clientX!==pointer.hoverX)){tooltip.refresh(points,e);
pointer.hoverX=points[0].clientX
}}if(hoverSeries&&hoverSeries.tracker&&(!tooltip||!tooltip.followPointer)){point=hoverSeries.tooltipPoints[index];
if(point&&point!==hoverPoint){point.onMouseOver(e)
}}else{if(tooltip&&tooltip.followPointer&&!tooltip.isHidden){anchor=tooltip.getAnchor([{}],e);
tooltip.updatePosition({plotX:anchor[0],plotY:anchor[1]})
}}if(tooltip&&!pointer._onDocumentMouseMove){pointer._onDocumentMouseMove=function(e){pointer.onDocumentMouseMove(e)
};
addEvent(doc,"mousemove",pointer._onDocumentMouseMove)
}each(chart.axes,function(axis){axis.drawCrosshair(e,pick(point,hoverPoint))
})
},reset:function(allowMove){var pointer=this,chart=pointer.chart,hoverSeries=chart.hoverSeries,hoverPoint=chart.hoverPoint,tooltip=chart.tooltip,tooltipPoints=tooltip&&tooltip.shared?chart.hoverPoints:hoverPoint;
allowMove=allowMove&&tooltip&&tooltipPoints;
if(allowMove&&splat(tooltipPoints)[0].plotX===UNDEFINED){allowMove=false
}if(allowMove){tooltip.refresh(tooltipPoints);
if(hoverPoint){hoverPoint.setState(hoverPoint.state,true)
}}else{if(hoverPoint){hoverPoint.onMouseOut()
}if(hoverSeries){hoverSeries.onMouseOut()
}if(tooltip){tooltip.hide()
}if(pointer._onDocumentMouseMove){removeEvent(doc,"mousemove",pointer._onDocumentMouseMove);
pointer._onDocumentMouseMove=null
}each(chart.axes,function(axis){axis.hideCrosshair()
});
pointer.hoverX=null
}},scaleGroups:function(attribs,clip){var chart=this.chart,seriesAttribs;
each(chart.series,function(series){seriesAttribs=attribs||series.getPlotBox();
if(series.xAxis&&series.xAxis.zoomEnabled){series.group.attr(seriesAttribs);
if(series.markerGroup){series.markerGroup.attr(seriesAttribs);
series.markerGroup.clip(clip?chart.clipRect:null)
}if(series.dataLabelsGroup){series.dataLabelsGroup.attr(seriesAttribs)
}}});
chart.clipRect.attr(clip||chart.clipBox)
},dragStart:function(e){var chart=this.chart;
chart.mouseIsDown=e.type;
chart.cancelClick=false;
chart.mouseDownX=this.mouseDownX=e.chartX;
chart.mouseDownY=this.mouseDownY=e.chartY
},drag:function(e){var chart=this.chart,chartOptions=chart.options.chart,chartX=e.chartX,chartY=e.chartY,zoomHor=this.zoomHor,zoomVert=this.zoomVert,plotLeft=chart.plotLeft,plotTop=chart.plotTop,plotWidth=chart.plotWidth,plotHeight=chart.plotHeight,clickedInside,size,mouseDownX=this.mouseDownX,mouseDownY=this.mouseDownY;
if(chartX<plotLeft){chartX=plotLeft
}else{if(chartX>plotLeft+plotWidth){chartX=plotLeft+plotWidth
}}if(chartY<plotTop){chartY=plotTop
}else{if(chartY>plotTop+plotHeight){chartY=plotTop+plotHeight
}}this.hasDragged=Math.sqrt(Math.pow(mouseDownX-chartX,2)+Math.pow(mouseDownY-chartY,2));
if(this.hasDragged>10){clickedInside=chart.isInsidePlot(mouseDownX-plotLeft,mouseDownY-plotTop);
if(chart.hasCartesianSeries&&(this.zoomX||this.zoomY)&&clickedInside){if(!this.selectionMarker){this.selectionMarker=chart.renderer.rect(plotLeft,plotTop,zoomHor?1:plotWidth,zoomVert?1:plotHeight,0).attr({fill:chartOptions.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add()
}}if(this.selectionMarker&&zoomHor){size=chartX-mouseDownX;
this.selectionMarker.attr({width:mathAbs(size),x:(size>0?0:size)+mouseDownX})
}if(this.selectionMarker&&zoomVert){size=chartY-mouseDownY;
this.selectionMarker.attr({height:mathAbs(size),y:(size>0?0:size)+mouseDownY})
}if(clickedInside&&!this.selectionMarker&&chartOptions.panning){chart.pan(e,chartOptions.panning)
}}},drop:function(e){var chart=this.chart,hasPinched=this.hasPinched;
if(this.selectionMarker){var selectionData={xAxis:[],yAxis:[],originalEvent:e.originalEvent||e},selectionBox=this.selectionMarker,selectionLeft=selectionBox.x,selectionTop=selectionBox.y,runZoom;
if(this.hasDragged||hasPinched){each(chart.axes,function(axis){if(axis.zoomEnabled){var horiz=axis.horiz,selectionMin=axis.toValue((horiz?selectionLeft:selectionTop)),selectionMax=axis.toValue((horiz?selectionLeft+selectionBox.width:selectionTop+selectionBox.height));
if(!isNaN(selectionMin)&&!isNaN(selectionMax)){selectionData[axis.coll].push({axis:axis,min:mathMin(selectionMin,selectionMax),max:mathMax(selectionMin,selectionMax)});
runZoom=true
}}});
if(runZoom){fireEvent(chart,"selection",selectionData,function(args){chart.zoom(extend(args,hasPinched?{animation:false}:null))
})
}}this.selectionMarker=this.selectionMarker.destroy();
if(hasPinched){this.scaleGroups()
}}if(chart){css(chart.container,{cursor:chart._cursor});
chart.cancelClick=this.hasDragged>10;
chart.mouseIsDown=this.hasDragged=this.hasPinched=false;
this.pinchDown=[]
}},onContainerMouseDown:function(e){e=this.normalize(e);
if(e.preventDefault){e.preventDefault()
}this.dragStart(e)
},onDocumentMouseUp:function(e){this.drop(e)
},onDocumentMouseMove:function(e){var chart=this.chart,chartPosition=this.chartPosition,hoverSeries=chart.hoverSeries;
e=this.normalize(e,chartPosition);
if(chartPosition&&hoverSeries&&!this.inClass(e.target,"highcharts-tracker")&&!chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)){this.reset()
}},onContainerMouseLeave:function(){this.reset();
this.chartPosition=null
},onContainerMouseMove:function(e){var chart=this.chart;
e=this.normalize(e);
if(chart.mouseIsDown==="mousedown"){this.drag(e)
}if((this.inClass(e.target,"highcharts-tracker")||chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop))&&!chart.openMenu){this.runPointActions(e)
}},inClass:function(element,className){var elemClassName;
while(element){elemClassName=attr(element,"class");
if(elemClassName){if(elemClassName.indexOf(className)!==-1){return true
}else{if(elemClassName.indexOf(PREFIX+"container")!==-1){return false
}}}element=element.parentNode
}},onTrackerMouseOut:function(e){var series=this.chart.hoverSeries,relatedTarget=e.relatedTarget||e.toElement,relatedSeries=relatedTarget&&relatedTarget.point&&relatedTarget.point.series;
if(series&&!series.options.stickyTracking&&!this.inClass(relatedTarget,PREFIX+"tooltip")&&relatedSeries!==series){series.onMouseOut()
}},onContainerClick:function(e){var chart=this.chart,hoverPoint=chart.hoverPoint,plotLeft=chart.plotLeft,plotTop=chart.plotTop,inverted=chart.inverted,chartPosition,plotX,plotY;
e=this.normalize(e);
e.cancelBubble=true;
if(!chart.cancelClick){if(hoverPoint&&this.inClass(e.target,PREFIX+"tracker")){chartPosition=this.chartPosition;
plotX=hoverPoint.plotX;
plotY=hoverPoint.plotY;
extend(hoverPoint,{pageX:chartPosition.left+plotLeft+(inverted?chart.plotWidth-plotY:plotX),pageY:chartPosition.top+plotTop+(inverted?chart.plotHeight-plotX:plotY)});
fireEvent(hoverPoint.series,"click",extend(e,{point:hoverPoint}));
if(chart.hoverPoint){hoverPoint.firePointEvent("click",e)
}}else{extend(e,this.getCoordinates(e));
if(chart.isInsidePlot(e.chartX-plotLeft,e.chartY-plotTop)){fireEvent(chart,"click",e)
}}}},setDOMEvents:function(){var pointer=this,container=pointer.chart.container,events;
this._events=events=[[container,"onmousedown","onContainerMouseDown"],[container,"onmousemove","onContainerMouseMove"],[container,"onclick","onContainerClick"],[container,"mouseleave","onContainerMouseLeave"],[doc,"mouseup","onDocumentMouseUp"]];
if(hasTouch){events.push([container,"ontouchstart","onContainerTouchStart"],[container,"ontouchmove","onContainerTouchMove"],[doc,"touchend","onDocumentTouchEnd"])
}each(events,function(eventConfig){pointer["_"+eventConfig[2]]=function(e){pointer[eventConfig[2]](e)
};
if(eventConfig[1].indexOf("on")===0){eventConfig[0][eventConfig[1]]=pointer["_"+eventConfig[2]]
}else{addEvent(eventConfig[0],eventConfig[1],pointer["_"+eventConfig[2]])
}})
},destroy:function(){var pointer=this;
each(pointer._events,function(eventConfig){if(eventConfig[1].indexOf("on")===0){eventConfig[0][eventConfig[1]]=null
}else{removeEvent(eventConfig[0],eventConfig[1],pointer["_"+eventConfig[2]])
}});
delete pointer._events;
clearInterval(pointer.tooltipTimeout)
}};
extend(Highmaps.Pointer.prototype,{pinchTranslate:function(zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch){if(zoomHor){this.pinchTranslateDirection(true,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch)
}if(zoomVert){this.pinchTranslateDirection(false,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch)
}},pinchTranslateDirection:function(horiz,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch,forcedScale){var chart=this.chart,xy=horiz?"x":"y",XY=horiz?"X":"Y",sChartXY="chart"+XY,wh=horiz?"width":"height",plotLeftTop=chart["plot"+(horiz?"Left":"Top")],selectionWH,selectionXY,clipXY,scale=forcedScale||1,inverted=chart.inverted,bounds=chart.bounds[horiz?"h":"v"],singleTouch=pinchDown.length===1,touch0Start=pinchDown[0][sChartXY],touch0Now=touches[0][sChartXY],touch1Start=!singleTouch&&pinchDown[1][sChartXY],touch1Now=!singleTouch&&touches[1][sChartXY],outOfBounds,transformScale,scaleKey,setScale=function(){if(!singleTouch&&mathAbs(touch0Start-touch1Start)>20){scale=forcedScale||mathAbs(touch0Now-touch1Now)/mathAbs(touch0Start-touch1Start)
}clipXY=((plotLeftTop-touch0Now)/scale)+touch0Start;
selectionWH=chart["plot"+(horiz?"Width":"Height")]/scale
};
setScale();
selectionXY=clipXY;
if(selectionXY<bounds.min){selectionXY=bounds.min;
outOfBounds=true
}else{if(selectionXY+selectionWH>bounds.max){selectionXY=bounds.max-selectionWH;
outOfBounds=true
}}if(outOfBounds){touch0Now-=0.8*(touch0Now-lastValidTouch[xy][0]);
if(!singleTouch){touch1Now-=0.8*(touch1Now-lastValidTouch[xy][1])
}setScale()
}else{lastValidTouch[xy]=[touch0Now,touch1Now]
}if(!inverted){clip[xy]=clipXY-plotLeftTop;
clip[wh]=selectionWH
}scaleKey=inverted?(horiz?"scaleY":"scaleX"):"scale"+XY;
transformScale=inverted?1/scale:scale;
selectionMarker[wh]=selectionWH;
selectionMarker[xy]=selectionXY;
transform[scaleKey]=scale;
transform["translate"+XY]=(transformScale*plotLeftTop)+(touch0Now-(transformScale*touch0Start))
},pinch:function(e){var self=this,chart=self.chart,pinchDown=self.pinchDown,followTouchMove=chart.tooltip&&chart.tooltip.options.followTouchMove,touches=e.touches,touchesLength=touches.length,lastValidTouch=self.lastValidTouch,zoomHor=self.zoomHor||self.pinchHor,zoomVert=self.zoomVert||self.pinchVert,hasZoom=zoomHor||zoomVert,selectionMarker=self.selectionMarker,transform={},fireClickEvent=touchesLength===1&&((self.inClass(e.target,PREFIX+"tracker")&&chart.runTrackerClick)||chart.runChartClick),clip={};
if((hasZoom||followTouchMove)&&!fireClickEvent){e.preventDefault()
}map(touches,function(e){return self.normalize(e)
});
if(e.type==="touchstart"){each(touches,function(e,i){pinchDown[i]={chartX:e.chartX,chartY:e.chartY}
});
lastValidTouch.x=[pinchDown[0].chartX,pinchDown[1]&&pinchDown[1].chartX];
lastValidTouch.y=[pinchDown[0].chartY,pinchDown[1]&&pinchDown[1].chartY];
each(chart.axes,function(axis){if(axis.zoomEnabled){var bounds=chart.bounds[axis.horiz?"h":"v"],minPixelPadding=axis.minPixelPadding,min=axis.toPixels(axis.dataMin),max=axis.toPixels(axis.dataMax),absMin=mathMin(min,max),absMax=mathMax(min,max);
bounds.min=mathMin(axis.pos,absMin-minPixelPadding);
bounds.max=mathMax(axis.pos+axis.len,absMax+minPixelPadding)
}})
}else{if(pinchDown.length){if(!selectionMarker){self.selectionMarker=selectionMarker=extend({destroy:noop},chart.plotBox)
}self.pinchTranslate(zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch);
self.hasPinched=hasZoom;
self.scaleGroups(transform,clip);
if(!hasZoom&&followTouchMove&&touchesLength===1){this.runPointActions(self.normalize(e))
}}}},onContainerTouchStart:function(e){var chart=this.chart;
if(e.touches.length===1){e=this.normalize(e);
if(chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)){this.runPointActions(e);
this.pinch(e)
}else{this.reset()
}}else{if(e.touches.length===2){this.pinch(e)
}}},onContainerTouchMove:function(e){if(e.touches.length===1||e.touches.length===2){this.pinch(e)
}},onDocumentTouchEnd:function(e){this.drop(e)
}});
if(win.PointerEvent||win.MSPointerEvent){var touches={};
Pointer.prototype.getWebkitTouches=function(){var key,fake=[];
fake.item=function(i){return this[i]
};
for(key in touches){if(touches.hasOwnProperty(key)){fake.push({pageX:touches[key].pageX,pageY:touches[key].pageY,target:touches[key].target})
}}return fake
};
wrap(Pointer.prototype,"init",function(proceed,chart,options){chart.container.style["-ms-touch-action"]=chart.container.style["touch-action"]=NONE;
proceed.call(this,chart,options)
});
wrap(Pointer.prototype,"setDOMEvents",function(proceed){var pointer=this,eventmap;
proceed.apply(this);
eventmap=[[this.chart.container,"PointerDown","touchstart","onContainerTouchStart",function(e){touches[e.pointerId]={pageX:e.pageX,pageY:e.pageY,target:e.currentTarget}
}],[this.chart.container,"PointerMove","touchmove","onContainerTouchMove",function(e){touches[e.pointerId]={pageX:e.pageX,pageY:e.pageY};
if(!touches[e.pointerId].target){touches[e.pointerId].target=e.currentTarget
}}],[document,"PointerUp","touchend","onDocumentTouchEnd",function(e){delete touches[e.pointerId]
}]];
each(eventmap,function(eventConfig){var eventName=window.PointerEvent?eventConfig[1].toLowerCase():"MS"+eventConfig[1];
pointer["_"+eventName]=function(e){e=e.originalEvent||e;
if(e.pointerType==="touch"||e.pointerType===e.MSPOINTER_TYPE_TOUCH){eventConfig[4](e);
pointer[eventConfig[3]]({type:eventConfig[2],target:e.currentTarget,preventDefault:noop,touches:pointer.getWebkitTouches()})
}};
addEvent(eventConfig[0],eventName,pointer["_"+eventName]);
pointer._events.push([eventConfig[0],eventName,eventName])
})
})
}var Legend=Highmaps.Legend=function(chart,options){this.init(chart,options)
};
Legend.prototype={init:function(chart,options){var legend=this,itemStyle=options.itemStyle,padding=pick(options.padding,8),itemMarginTop=options.itemMarginTop||0;
this.options=options;
if(!options.enabled){return
}legend.baseline=pInt(itemStyle.fontSize)+3+itemMarginTop;
legend.itemStyle=itemStyle;
legend.itemHiddenStyle=merge(itemStyle,options.itemHiddenStyle);
legend.itemMarginTop=itemMarginTop;
legend.padding=padding;
legend.initialItemX=padding;
legend.initialItemY=padding-5;
legend.maxItemWidth=0;
legend.chart=chart;
legend.itemHeight=0;
legend.lastLineHeight=0;
legend.symbolWidth=pick(options.symbolWidth,16);
legend.pages=[];
legend.render();
addEvent(legend.chart,"endResize",function(){legend.positionCheckboxes()
})
},colorizeItem:function(item,visible){var legend=this,options=legend.options,legendItem=item.legendItem,legendLine=item.legendLine,legendSymbol=item.legendSymbol,hiddenColor=legend.itemHiddenStyle.color,textColor=visible?options.itemStyle.color:hiddenColor,symbolColor=visible?(item.legendColor||item.color||"#CCC"):hiddenColor,markerOptions=item.options&&item.options.marker,symbolAttr={stroke:symbolColor,fill:symbolColor},key,val;
if(legendItem){legendItem.css({fill:textColor,color:textColor})
}if(legendLine){legendLine.attr({stroke:symbolColor})
}if(legendSymbol){if(markerOptions&&legendSymbol.isMarker){markerOptions=item.convertAttribs(markerOptions);
for(key in markerOptions){val=markerOptions[key];
if(val!==UNDEFINED){symbolAttr[key]=val
}}}legendSymbol.attr(symbolAttr)
}},positionItem:function(item){var legend=this,options=legend.options,symbolPadding=options.symbolPadding,ltr=!options.rtl,legendItemPos=item._legendItemPos,itemX=legendItemPos[0],itemY=legendItemPos[1],checkbox=item.checkbox;
if(item.legendGroup){item.legendGroup.translate(ltr?itemX:legend.legendWidth-itemX-2*symbolPadding-4,itemY)
}if(checkbox){checkbox.x=itemX;
checkbox.y=itemY
}},destroyItem:function(item){var checkbox=item.checkbox;
each(["legendItem","legendLine","legendSymbol","legendGroup"],function(key){if(item[key]){item[key]=item[key].destroy()
}});
if(checkbox){discardElement(item.checkbox)
}},destroy:function(){var legend=this,legendGroup=legend.group,box=legend.box;
if(box){legend.box=box.destroy()
}if(legendGroup){legend.group=legendGroup.destroy()
}},positionCheckboxes:function(scrollOffset){var alignAttr=this.group.alignAttr,translateY,clipHeight=this.clipHeight||this.legendHeight;
if(alignAttr){translateY=alignAttr.translateY;
each(this.allItems,function(item){var checkbox=item.checkbox,top;
if(checkbox){top=(translateY+checkbox.y+(scrollOffset||0)+3);
css(checkbox,{left:(alignAttr.translateX+item.legendItemWidth+checkbox.x-20)+PX,top:top+PX,display:top>translateY-6&&top<translateY+clipHeight-6?"":NONE})
}})
}},renderTitle:function(){var options=this.options,padding=this.padding,titleOptions=options.title,titleHeight=0,bBox;
if(titleOptions.text){if(!this.title){this.title=this.chart.renderer.label(titleOptions.text,padding-3,padding-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(titleOptions.style).add(this.group)
}bBox=this.title.getBBox();
titleHeight=bBox.height;
this.offsetWidth=bBox.width;
this.contentGroup.attr({translateY:titleHeight})
}this.titleHeight=titleHeight
},renderItem:function(item){var legend=this,chart=legend.chart,renderer=chart.renderer,options=legend.options,horizontal=options.layout==="horizontal",symbolWidth=legend.symbolWidth,symbolPadding=options.symbolPadding,itemStyle=legend.itemStyle,itemHiddenStyle=legend.itemHiddenStyle,padding=legend.padding,itemDistance=horizontal?pick(options.itemDistance,8):0,ltr=!options.rtl,itemHeight,widthOption=options.width,itemMarginBottom=options.itemMarginBottom||0,itemMarginTop=legend.itemMarginTop,initialItemX=legend.initialItemX,bBox,itemWidth,li=item.legendItem,series=item.series&&item.series.drawLegendSymbol?item.series:item,seriesOptions=series.options,showCheckbox=legend.createCheckboxForItem&&seriesOptions&&seriesOptions.showCheckbox,useHTML=options.useHTML;
if(!li){item.legendGroup=renderer.g("legend-item").attr({zIndex:1}).add(legend.scrollGroup);
series.drawLegendSymbol(legend,item);
options.labelFormatter=strToFunction(options.labelFormatter);
item.legendItem=li=renderer.text(options.labelFormat?format(options.labelFormat,item):options.labelFormatter.call(item),ltr?symbolWidth+symbolPadding:-symbolPadding,legend.baseline,useHTML).css(merge(item.visible?itemStyle:itemHiddenStyle)).attr({align:ltr?"left":"right",zIndex:2}).add(item.legendGroup);
if(legend.setItemEvents){legend.setItemEvents(item,li,useHTML,itemStyle,itemHiddenStyle)
}legend.colorizeItem(item,item.visible);
if(showCheckbox){legend.createCheckboxForItem(item)
}}bBox=li.getBBox();
itemWidth=item.legendItemWidth=options.itemWidth||item.legendItemWidth||symbolWidth+symbolPadding+bBox.width+itemDistance+(showCheckbox?20:0);
legend.itemHeight=itemHeight=mathRound(item.legendItemHeight||bBox.height);
if(horizontal&&legend.itemX-initialItemX+itemWidth+options.x>(widthOption||(chart.chartWidth-2*padding-initialItemX))){legend.itemX=initialItemX;
legend.itemY+=itemMarginTop+legend.lastLineHeight+itemMarginBottom;
legend.lastLineHeight=0
}legend.maxItemWidth=mathMax(legend.maxItemWidth,itemWidth);
legend.lastItemY=itemMarginTop+legend.itemY+itemMarginBottom;
legend.lastLineHeight=mathMax(itemHeight,legend.lastLineHeight);
item._legendItemPos=[legend.itemX,legend.itemY];
if(horizontal){legend.itemX+=itemWidth
}else{legend.itemY+=itemMarginTop+itemHeight+itemMarginBottom;
legend.lastLineHeight=itemHeight
}legend.offsetWidth=widthOption||mathMax((horizontal?legend.itemX-initialItemX-itemDistance:itemWidth)+padding,legend.offsetWidth)
},getAllItems:function(){var allItems=[];
each(this.chart.series,function(series){var seriesOptions=series.options;
if(!pick(seriesOptions.showInLegend,!defined(seriesOptions.linkedTo)?UNDEFINED:false,true)){return
}allItems=allItems.concat(series.legendItems||(seriesOptions.legendType==="point"?series.data:series))
});
return allItems
},render:function(){var legend=this,chart=legend.chart,renderer=chart.renderer,legendGroup=legend.group,allItems,display,legendWidth,legendHeight,box=legend.box,options=legend.options,padding=legend.padding,legendBorderWidth=options.borderWidth,legendBackgroundColor=options.backgroundColor;
legend.itemX=legend.initialItemX;
legend.itemY=legend.initialItemY;
legend.offsetWidth=0;
legend.lastItemY=0;
if(!legendGroup){legend.group=legendGroup=renderer.g("legend").attr({zIndex:7}).add();
legend.contentGroup=renderer.g().attr({zIndex:1}).add(legendGroup);
legend.scrollGroup=renderer.g().add(legend.contentGroup)
}legend.renderTitle();
allItems=legend.getAllItems();
stableSort(allItems,function(a,b){return((a.options&&a.options.legendIndex)||0)-((b.options&&b.options.legendIndex)||0)
});
if(options.reversed){allItems.reverse()
}legend.allItems=allItems;
legend.display=display=!!allItems.length;
each(allItems,function(item){legend.renderItem(item)
});
legendWidth=options.width||legend.offsetWidth;
legendHeight=legend.lastItemY+legend.lastLineHeight+legend.titleHeight;
legendHeight=legend.handleOverflow(legendHeight);
if(legendBorderWidth||legendBackgroundColor){legendWidth+=padding;
legendHeight+=padding;
if(!box){legend.box=box=renderer.rect(0,0,legendWidth,legendHeight,options.borderRadius,legendBorderWidth||0).attr({stroke:options.borderColor,"stroke-width":legendBorderWidth||0,fill:legendBackgroundColor||NONE}).add(legendGroup).shadow(options.shadow);
box.isNew=true
}else{if(legendWidth>0&&legendHeight>0){box[box.isNew?"attr":"animate"](box.crisp(null,null,null,legendWidth,legendHeight));
box.isNew=false
}}box[display?"show":"hide"]()
}legend.legendWidth=legendWidth;
legend.legendHeight=legendHeight;
each(allItems,function(item){legend.positionItem(item)
});
if(display){legendGroup.align(extend({width:legendWidth,height:legendHeight},options),true,"spacingBox")
}if(!chart.isResizing){this.positionCheckboxes()
}},handleOverflow:function(legendHeight){var legend=this,chart=this.chart,renderer=chart.renderer,options=this.options,optionsY=options.y,alignTop=options.verticalAlign==="top",spaceHeight=chart.spacingBox.height+(alignTop?-optionsY:optionsY)-this.padding,maxHeight=options.maxHeight,clipHeight,clipRect=this.clipRect,navOptions=options.navigation,animation=pick(navOptions.animation,true),arrowSize=navOptions.arrowSize||12,nav=this.nav,pages=this.pages,lastY,allItems=this.allItems;
if(options.layout==="horizontal"){spaceHeight/=2
}if(maxHeight){spaceHeight=mathMin(spaceHeight,maxHeight)
}pages.length=0;
if(legendHeight>spaceHeight&&!options.useHTML){this.clipHeight=clipHeight=spaceHeight-20-this.titleHeight-this.padding;
this.currentPage=pick(this.currentPage,1);
this.fullHeight=legendHeight;
each(allItems,function(item,i){var y=item._legendItemPos[1],h=mathRound(item.legendItem.getBBox().height),len=pages.length;
if(!len||(y-pages[len-1]>clipHeight&&(lastY||y)!==pages[len-1])){pages.push(lastY||y)
}if(i===allItems.length-1&&y+h-pages[len-1]>clipHeight){pages.push(y)
}if(y!==lastY){lastY=y
}});
if(!clipRect){clipRect=legend.clipRect=renderer.clipRect(0,this.padding,9999,0);
legend.contentGroup.clip(clipRect)
}clipRect.attr({height:clipHeight});
if(!nav){this.nav=nav=renderer.g().attr({zIndex:1}).add(this.group);
this.up=renderer.symbol("triangle",0,0,arrowSize,arrowSize).on("click",function(){legend.scroll(-1,animation)
}).add(nav);
this.pager=renderer.text("",15,10).css(navOptions.style).add(nav);
this.down=renderer.symbol("triangle-down",0,0,arrowSize,arrowSize).on("click",function(){legend.scroll(1,animation)
}).add(nav)
}legend.scroll(0);
legendHeight=spaceHeight
}else{if(nav){clipRect.attr({height:chart.chartHeight});
nav.hide();
this.scrollGroup.attr({translateY:1});
this.clipHeight=0
}}return legendHeight
},scroll:function(scrollBy,animation){var pages=this.pages,pageCount=pages.length,currentPage=this.currentPage+scrollBy,clipHeight=this.clipHeight,navOptions=this.options.navigation,activeColor=navOptions.activeColor,inactiveColor=navOptions.inactiveColor,pager=this.pager,padding=this.padding,scrollOffset;
if(currentPage>pageCount){currentPage=pageCount
}if(currentPage>0){if(animation!==UNDEFINED){setAnimation(animation,this.chart)
}this.nav.attr({translateX:padding,translateY:clipHeight+this.padding+7+this.titleHeight,visibility:VISIBLE});
this.up.attr({fill:currentPage===1?inactiveColor:activeColor}).css({cursor:currentPage===1?"default":"pointer"});
pager.attr({text:currentPage+"/"+pageCount});
this.down.attr({x:18+this.pager.getBBox().width,fill:currentPage===pageCount?inactiveColor:activeColor}).css({cursor:currentPage===pageCount?"default":"pointer"});
scrollOffset=-pages[currentPage-1]+this.initialItemY;
this.scrollGroup.animate({translateY:scrollOffset});
this.currentPage=currentPage;
this.positionCheckboxes(scrollOffset)
}}};
var LegendSymbolMixin=Highmaps.LegendSymbolMixin={drawRectangle:function(legend,item){var symbolHeight=legend.options.symbolHeight||12;
item.legendSymbol=this.chart.renderer.rect(0,legend.baseline-5-(symbolHeight/2),legend.symbolWidth,symbolHeight,pick(legend.options.symbolRadius,2)).attr({zIndex:3}).add(item.legendGroup)
},drawLineMarker:function(legend){var options=this.options,markerOptions=options.marker,radius,legendOptions=legend.options,legendSymbol,symbolWidth=legend.symbolWidth,renderer=this.chart.renderer,legendItemGroup=this.legendGroup,verticalCenter=legend.baseline-mathRound(renderer.fontMetrics(legendOptions.itemStyle.fontSize).b*0.3),attr;
if(options.lineWidth){attr={"stroke-width":options.lineWidth};
if(options.dashStyle){attr.dashstyle=options.dashStyle
}this.legendLine=renderer.path([M,0,verticalCenter,L,symbolWidth,verticalCenter]).attr(attr).add(legendItemGroup)
}if(markerOptions&&markerOptions.enabled){radius=markerOptions.radius;
this.legendSymbol=legendSymbol=renderer.symbol(this.symbol,(symbolWidth/2)-radius,verticalCenter-radius,2*radius,2*radius).add(legendItemGroup);
legendSymbol.isMarker=true
}}};
if(/Trident\/7\.0/.test(userAgent)||isFirefox){wrap(Legend.prototype,"positionItem",function(proceed,item){var legend=this,runPositionItem=function(){if(item._legendItemPos){proceed.call(legend,item)
}};
if(legend.chart.renderer.forExport){runPositionItem()
}else{setTimeout(runPositionItem)
}})
}function Chart(){this.init.apply(this,arguments)
}Chart.prototype={init:function(userOptions,callback){var options,seriesOptions=userOptions.series;
userOptions.series=null;
options=merge(defaultOptions,userOptions);
options.series=userOptions.series=seriesOptions;
this.userOptions=userOptions;
var optionsChart=options.chart;
this.margin=this.splashArray("margin",optionsChart);
this.spacing=this.splashArray("spacing",optionsChart);
var chartEvents=optionsChart.events;
this.bounds={h:{},v:{}};
this.callback=callback;
this.isResizing=0;
this.options=options;
this.axes=[];
this.series=[];
this.hasCartesianSeries=optionsChart.showAxes;
var chart=this,eventType;
chart.index=charts.length;
charts.push(chart);
if(optionsChart.reflow!==false){addEvent(chart,"load",function(){chart.initReflow()
})
}if(chartEvents){for(eventType in chartEvents){addEvent(chart,eventType,chartEvents[eventType])
}}chart.xAxis=[];
chart.yAxis=[];
chart.animation=useCanVG?false:pick(optionsChart.animation,true);
chart.pointCount=0;
chart.counters=new ChartCounters();
chart.firstRender()
},initSeries:function(options){var chart=this,optionsChart=chart.options.chart,type=options.type||optionsChart.type||optionsChart.defaultSeriesType,series,constr=seriesTypes[type];
if(!constr){error(17,true)
}series=new constr();
series.init(this,options);
return series
},isInsidePlot:function(plotX,plotY,inverted){var x=inverted?plotY:plotX,y=inverted?plotX:plotY;
return x>=0&&x<=this.plotWidth&&y>=0&&y<=this.plotHeight
},adjustTickAmounts:function(){if(this.options.chart.alignTicks!==false){each(this.axes,function(axis){axis.adjustTickAmount()
})
}this.maxTicks=null
},redraw:function(animation){var chart=this,axes=chart.axes,series=chart.series,pointer=chart.pointer,legend=chart.legend,redrawLegend=chart.isDirtyLegend,hasStackedSeries,hasDirtyStacks,isDirtyBox=chart.isDirtyBox,seriesLength=series.length,i=seriesLength,serie,renderer=chart.renderer,isHiddenChart=renderer.isHidden(),afterRedraw=[];
setAnimation(animation,chart);
if(isHiddenChart){chart.cloneRenderTo()
}chart.layOutTitles();
while(i--){serie=series[i];
if(serie.options.stacking){hasStackedSeries=true;
if(serie.isDirty){hasDirtyStacks=true;
break
}}}if(hasDirtyStacks){i=seriesLength;
while(i--){serie=series[i];
if(serie.options.stacking){serie.isDirty=true
}}}each(series,function(serie){if(serie.isDirty){if(serie.options.legendType==="point"){redrawLegend=true
}}});
if(redrawLegend&&legend.options.enabled){legend.render();
chart.isDirtyLegend=false
}if(hasStackedSeries){chart.getStacks()
}if(chart.hasCartesianSeries){if(!chart.isResizing){chart.maxTicks=null;
each(axes,function(axis){axis.setScale()
})
}chart.adjustTickAmounts();
chart.getMargins();
each(axes,function(axis){if(axis.isDirty){isDirtyBox=true
}});
each(axes,function(axis){if(axis.isDirtyExtremes){axis.isDirtyExtremes=false;
afterRedraw.push(function(){fireEvent(axis,"afterSetExtremes",extend(axis.eventArgs,axis.getExtremes()));
delete axis.eventArgs
})
}if(isDirtyBox||hasStackedSeries){axis.redraw()
}})
}if(isDirtyBox){chart.drawChartBox()
}each(series,function(serie){if(serie.isDirty&&serie.visible&&(!serie.isCartesian||serie.xAxis)){serie.redraw()
}});
if(pointer){pointer.reset(true)
}renderer.draw();
fireEvent(chart,"redraw");
if(isHiddenChart){chart.cloneRenderTo(true)
}each(afterRedraw,function(callback){callback.call()
})
},get:function(id){var chart=this,axes=chart.axes,series=chart.series;
var i,j,points;
for(i=0;
i<axes.length;
i++){if(axes[i].options.id===id){return axes[i]
}}for(i=0;
i<series.length;
i++){if(series[i].options.id===id){return series[i]
}}for(i=0;
i<series.length;
i++){points=series[i].points||[];
for(j=0;
j<points.length;
j++){if(points[j].id===id){return points[j]
}}}return null
},getAxes:function(){var chart=this,options=this.options,xAxisOptions=options.xAxis=splat(options.xAxis||{}),yAxisOptions=options.yAxis=splat(options.yAxis||{}),optionsArray,axis;
each(xAxisOptions,function(axis,i){axis.index=i;
axis.isX=true
});
each(yAxisOptions,function(axis,i){axis.index=i
});
optionsArray=xAxisOptions.concat(yAxisOptions);
each(optionsArray,function(axisOptions){axis=new Axis(chart,axisOptions)
});
chart.adjustTickAmounts()
},getSelectedPoints:function(){var points=[];
each(this.series,function(serie){points=points.concat(grep(serie.points||[],function(point){return point.selected
}))
});
return points
},getSelectedSeries:function(){return grep(this.series,function(serie){return serie.selected
})
},getStacks:function(){var chart=this;
each(chart.yAxis,function(axis){if(axis.stacks&&axis.hasVisibleSeries){axis.oldStacks=axis.stacks
}});
each(chart.series,function(series){if(series.options.stacking&&(series.visible===true||chart.options.chart.ignoreHiddenSeries===false)){series.stackKey=series.type+pick(series.options.stack,"")
}})
},setTitle:function(titleOptions,subtitleOptions){var chart=this,options=chart.options,chartTitleOptions,chartSubtitleOptions;
chartTitleOptions=options.title=merge(options.title,titleOptions);
chartSubtitleOptions=options.subtitle=merge(options.subtitle,subtitleOptions);
each([["title",titleOptions,chartTitleOptions],["subtitle",subtitleOptions,chartSubtitleOptions]],function(arr){var name=arr[0],title=chart[name],titleOptions=arr[1],chartTitleOptions=arr[2];
if(title&&titleOptions){chart[name]=title=title.destroy()
}if(chartTitleOptions&&chartTitleOptions.text&&!title){chart[name]=chart.renderer.text(chartTitleOptions.text,0,0,chartTitleOptions.useHTML).attr({align:chartTitleOptions.align,"class":PREFIX+name,zIndex:chartTitleOptions.zIndex||4}).css(chartTitleOptions.style).add()
}});
chart.layOutTitles()
},layOutTitles:function(){var titleOffset=0,title=this.title,subtitle=this.subtitle,options=this.options,titleOptions=options.title,subtitleOptions=options.subtitle,autoWidth=this.spacingBox.width-44;
if(title){title.css({width:(titleOptions.width||autoWidth)+PX}).align(extend({y:15},titleOptions),false,"spacingBox");
if(!titleOptions.floating&&!titleOptions.verticalAlign){titleOffset=title.getBBox().height;
if(titleOffset>=18&&titleOffset<=25){titleOffset=15
}}}if(subtitle){subtitle.css({width:(subtitleOptions.width||autoWidth)+PX}).align(extend({y:titleOffset+titleOptions.margin},subtitleOptions),false,"spacingBox");
if(!subtitleOptions.floating&&!subtitleOptions.verticalAlign){titleOffset=mathCeil(titleOffset+subtitle.getBBox().height)
}}this.titleOffset=titleOffset
},getChartSize:function(){var chart=this,optionsChart=chart.options.chart,widthOption=optionsChart.width,heightOption=optionsChart.height,renderTo=chart.renderToClone||chart.renderTo;
if(!defined(widthOption)){chart.containerWidth=adapterRun(renderTo,"width")
}if(!defined(heightOption)){chart.containerHeight=adapterRun(renderTo,"height")
}chart.chartWidth=mathMax(0,widthOption||chart.containerWidth||600);
chart.chartHeight=mathMax(0,pick(heightOption,chart.containerHeight>19?chart.containerHeight:400))
},cloneRenderTo:function(revert){var clone=this.renderToClone,container=this.container;
if(revert){if(clone){this.renderTo.appendChild(container);
discardElement(clone);
delete this.renderToClone
}}else{if(container&&container.parentNode===this.renderTo){this.renderTo.removeChild(container)
}this.renderToClone=clone=this.renderTo.cloneNode(0);
css(clone,{position:ABSOLUTE,top:"-9999px",display:"block"});
if(clone.style.setProperty){clone.style.setProperty("display","block","important")
}doc.body.appendChild(clone);
if(container){clone.appendChild(container)
}}},getContainer:function(){var chart=this,container,optionsChart=chart.options.chart,chartWidth,chartHeight,renderTo,indexAttrName="data-highcharts-chart",oldChartIndex,containerId;
chart.renderTo=renderTo=optionsChart.renderTo;
containerId=PREFIX+idCounter++;
if(isString(renderTo)){chart.renderTo=renderTo=doc.getElementById(renderTo)
}if(!renderTo){error(13,true)
}oldChartIndex=pInt(attr(renderTo,indexAttrName));
if(!isNaN(oldChartIndex)&&charts[oldChartIndex]&&charts[oldChartIndex].hasRendered){charts[oldChartIndex].destroy()
}attr(renderTo,indexAttrName,chart.index);
renderTo.innerHTML="";
if(!optionsChart.skipClone&&!renderTo.offsetWidth){chart.cloneRenderTo()
}chart.getChartSize();
chartWidth=chart.chartWidth;
chartHeight=chart.chartHeight;
chart.container=container=createElement(DIV,{className:PREFIX+"container"+(optionsChart.className?" "+optionsChart.className:""),id:containerId},extend({position:RELATIVE,overflow:HIDDEN,width:chartWidth+PX,height:chartHeight+PX,textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},optionsChart.style),chart.renderToClone||renderTo);
chart._cursor=container.style.cursor;
chart.renderer=optionsChart.forExport?new SVGRenderer(container,chartWidth,chartHeight,true):new Renderer(container,chartWidth,chartHeight);
chart.renderer.boxWrapper.css(optionsChart.style);
if(useCanVG){chart.renderer.create(chart,container,chartWidth,chartHeight)
}},getMargins:function(){var chart=this,spacing=chart.spacing,axisOffset,legend=chart.legend,margin=chart.margin,legendOptions=chart.options.legend,legendMargin=pick(legendOptions.margin,10),legendX=legendOptions.x,legendY=legendOptions.y,align=legendOptions.align,verticalAlign=legendOptions.verticalAlign,titleOffset=chart.titleOffset;
chart.resetMargins();
axisOffset=chart.axisOffset;
if(titleOffset&&!defined(margin[0])){chart.plotTop=mathMax(chart.plotTop,titleOffset+chart.options.title.margin+spacing[0])
}if(legend.display&&!legendOptions.floating){if(align==="right"){if(!defined(margin[1])){chart.marginRight=mathMax(chart.marginRight,legend.legendWidth-legendX+legendMargin+spacing[1])
}}else{if(align==="left"){if(!defined(margin[3])){chart.plotLeft=mathMax(chart.plotLeft,legend.legendWidth+legendX+legendMargin+spacing[3])
}}else{if(verticalAlign==="top"){if(!defined(margin[0])){chart.plotTop=mathMax(chart.plotTop,legend.legendHeight+legendY+legendMargin+spacing[0])
}}else{if(verticalAlign==="bottom"){if(!defined(margin[2])){chart.marginBottom=mathMax(chart.marginBottom,legend.legendHeight-legendY+legendMargin+spacing[2])
}}}}}}if(chart.extraBottomMargin){chart.marginBottom+=chart.extraBottomMargin
}if(chart.extraTopMargin){chart.plotTop+=chart.extraTopMargin
}if(chart.hasCartesianSeries){each(chart.axes,function(axis){axis.getOffset()
})
}if(!defined(margin[3])){chart.plotLeft+=axisOffset[3]
}if(!defined(margin[0])){chart.plotTop+=axisOffset[0]
}if(!defined(margin[2])){chart.marginBottom+=axisOffset[2]
}if(!defined(margin[1])){chart.marginRight+=axisOffset[1]
}chart.setChartSize()
},reflow:function(e){var chart=this,optionsChart=chart.options.chart,renderTo=chart.renderTo,width=optionsChart.width||adapterRun(renderTo,"width"),height=optionsChart.height||adapterRun(renderTo,"height"),target=e?e.target:win,doReflow=function(){if(chart.container){chart.setSize(width,height,false);
chart.hasUserSize=null
}};
if(!chart.hasUserSize&&width&&height&&(target===win||target===doc)){if(width!==chart.containerWidth||height!==chart.containerHeight){clearTimeout(chart.reflowTimeout);
if(e){chart.reflowTimeout=setTimeout(doReflow,100)
}else{doReflow()
}}chart.containerWidth=width;
chart.containerHeight=height
}},initReflow:function(){var chart=this,reflow=function(e){chart.reflow(e)
};
addEvent(win,"resize",reflow);
addEvent(chart,"destroy",function(){removeEvent(win,"resize",reflow)
})
},setSize:function(width,height,animation){var chart=this,chartWidth,chartHeight,fireEndResize;
chart.isResizing+=1;
fireEndResize=function(){if(chart){fireEvent(chart,"endResize",null,function(){chart.isResizing-=1
})
}};
setAnimation(animation,chart);
chart.oldChartHeight=chart.chartHeight;
chart.oldChartWidth=chart.chartWidth;
if(defined(width)){chart.chartWidth=chartWidth=mathMax(0,mathRound(width));
chart.hasUserSize=!!chartWidth
}if(defined(height)){chart.chartHeight=chartHeight=mathMax(0,mathRound(height))
}(globalAnimation?animate:css)(chart.container,{width:chartWidth+PX,height:chartHeight+PX},globalAnimation);
chart.setChartSize(true);
chart.renderer.setSize(chartWidth,chartHeight,animation);
chart.maxTicks=null;
each(chart.axes,function(axis){axis.isDirty=true;
axis.setScale()
});
each(chart.series,function(serie){serie.isDirty=true
});
chart.isDirtyLegend=true;
chart.isDirtyBox=true;
chart.getMargins();
chart.redraw(animation);
chart.oldChartHeight=null;
fireEvent(chart,"resize");
if(globalAnimation===false){fireEndResize()
}else{setTimeout(fireEndResize,(globalAnimation&&globalAnimation.duration)||500)
}},setChartSize:function(skipAxes){var chart=this,inverted=chart.inverted,renderer=chart.renderer,chartWidth=chart.chartWidth,chartHeight=chart.chartHeight,optionsChart=chart.options.chart,spacing=chart.spacing,clipOffset=chart.clipOffset,clipX,clipY,plotLeft,plotTop,plotWidth,plotHeight,plotBorderWidth;
chart.plotLeft=plotLeft=mathRound(chart.plotLeft);
chart.plotTop=plotTop=mathRound(chart.plotTop);
chart.plotWidth=plotWidth=mathMax(0,mathRound(chartWidth-plotLeft-chart.marginRight));
chart.plotHeight=plotHeight=mathMax(0,mathRound(chartHeight-plotTop-chart.marginBottom));
chart.plotSizeX=inverted?plotHeight:plotWidth;
chart.plotSizeY=inverted?plotWidth:plotHeight;
chart.plotBorderWidth=optionsChart.plotBorderWidth||0;
chart.spacingBox=renderer.spacingBox={x:spacing[3],y:spacing[0],width:chartWidth-spacing[3]-spacing[1],height:chartHeight-spacing[0]-spacing[2]};
chart.plotBox=renderer.plotBox={x:plotLeft,y:plotTop,width:plotWidth,height:plotHeight};
plotBorderWidth=2*mathFloor(chart.plotBorderWidth/2);
clipX=mathCeil(mathMax(plotBorderWidth,clipOffset[3])/2);
clipY=mathCeil(mathMax(plotBorderWidth,clipOffset[0])/2);
chart.clipBox={x:clipX,y:clipY,width:mathFloor(chart.plotSizeX-mathMax(plotBorderWidth,clipOffset[1])/2-clipX),height:mathFloor(chart.plotSizeY-mathMax(plotBorderWidth,clipOffset[2])/2-clipY)};
if(!skipAxes){each(chart.axes,function(axis){axis.setAxisSize();
axis.setAxisTranslation()
})
}},resetMargins:function(){var chart=this,spacing=chart.spacing,margin=chart.margin;
chart.plotTop=pick(margin[0],spacing[0]);
chart.marginRight=pick(margin[1],spacing[1]);
chart.marginBottom=pick(margin[2],spacing[2]);
chart.plotLeft=pick(margin[3],spacing[3]);
chart.axisOffset=[0,0,0,0];
chart.clipOffset=[0,0,0,0]
},drawChartBox:function(){var chart=this,optionsChart=chart.options.chart,renderer=chart.renderer,chartWidth=chart.chartWidth,chartHeight=chart.chartHeight,chartBackground=chart.chartBackground,plotBackground=chart.plotBackground,plotBorder=chart.plotBorder,plotBGImage=chart.plotBGImage,chartBorderWidth=optionsChart.borderWidth||0,chartBackgroundColor=optionsChart.backgroundColor,plotBackgroundColor=optionsChart.plotBackgroundColor,plotBackgroundImage=optionsChart.plotBackgroundImage,plotBorderWidth=optionsChart.plotBorderWidth||0,mgn,bgAttr,plotLeft=chart.plotLeft,plotTop=chart.plotTop,plotWidth=chart.plotWidth,plotHeight=chart.plotHeight,plotBox=chart.plotBox,clipRect=chart.clipRect,clipBox=chart.clipBox;
mgn=chartBorderWidth+(optionsChart.shadow?8:0);
if(chartBorderWidth||chartBackgroundColor){if(!chartBackground){bgAttr={fill:chartBackgroundColor||NONE};
if(chartBorderWidth){bgAttr.stroke=optionsChart.borderColor;
bgAttr["stroke-width"]=chartBorderWidth
}chart.chartBackground=renderer.rect(mgn/2,mgn/2,chartWidth-mgn,chartHeight-mgn,optionsChart.borderRadius,chartBorderWidth).attr(bgAttr).add().shadow(optionsChart.shadow)
}else{chartBackground.animate(chartBackground.crisp(null,null,null,chartWidth-mgn,chartHeight-mgn))
}}if(plotBackgroundColor){if(!plotBackground){chart.plotBackground=renderer.rect(plotLeft,plotTop,plotWidth,plotHeight,0).attr({fill:plotBackgroundColor}).add().shadow(optionsChart.plotShadow)
}else{plotBackground.animate(plotBox)
}}if(plotBackgroundImage){if(!plotBGImage){chart.plotBGImage=renderer.image(plotBackgroundImage,plotLeft,plotTop,plotWidth,plotHeight).add()
}else{plotBGImage.animate(plotBox)
}}if(!clipRect){chart.clipRect=renderer.clipRect(clipBox)
}else{clipRect.animate({width:clipBox.width,height:clipBox.height})
}if(plotBorderWidth){if(!plotBorder){chart.plotBorder=renderer.rect(plotLeft,plotTop,plotWidth,plotHeight,0,-plotBorderWidth).attr({stroke:optionsChart.plotBorderColor,"stroke-width":plotBorderWidth,zIndex:1}).add()
}else{plotBorder.animate(plotBorder.crisp(null,plotLeft,plotTop,plotWidth,plotHeight))
}}chart.isDirtyBox=false
},propFromSeries:function(){var chart=this,optionsChart=chart.options.chart,klass,seriesOptions=chart.options.series,i,value;
each(["inverted","angular","polar"],function(key){klass=seriesTypes[optionsChart.type||optionsChart.defaultSeriesType];
value=(chart[key]||optionsChart[key]||(klass&&klass.prototype[key]));
i=seriesOptions&&seriesOptions.length;
while(!value&&i--){klass=seriesTypes[seriesOptions[i].type];
if(klass&&klass.prototype[key]){value=true
}}chart[key]=value
})
},linkSeries:function(){var chart=this,chartSeries=chart.series;
each(chartSeries,function(series){series.linkedSeries.length=0
});
each(chartSeries,function(series){var linkedTo=series.options.linkedTo;
if(isString(linkedTo)){if(linkedTo===":previous"){linkedTo=chart.series[series.index-1]
}else{linkedTo=chart.get(linkedTo)
}if(linkedTo){linkedTo.linkedSeries.push(series);
series.linkedParent=linkedTo
}}})
},render:function(){var chart=this,axes=chart.axes,renderer=chart.renderer,options=chart.options;
var labels=options.labels,credits=options.credits,creditsHref;
chart.setTitle();
chart.legend=new Legend(chart,options.legend);
chart.getStacks();
each(axes,function(axis){axis.setScale()
});
chart.getMargins();
chart.maxTicks=null;
each(axes,function(axis){axis.setTickPositions(true);
axis.setMaxTicks()
});
chart.adjustTickAmounts();
chart.getMargins();
chart.drawChartBox();
if(chart.hasCartesianSeries){each(axes,function(axis){axis.render()
})
}if(!chart.seriesGroup){chart.seriesGroup=renderer.g("series-group").attr({zIndex:3}).add()
}each(chart.series,function(serie){serie.translate();
serie.setTooltipPoints();
serie.render()
});
if(labels.items){each(labels.items,function(label){var style=extend(labels.style,label.style),x=pInt(style.left)+chart.plotLeft,y=pInt(style.top)+chart.plotTop+12;
delete style.left;
delete style.top;
renderer.text(label.html,x,y).attr({zIndex:2}).css(style).add()
})
}if(credits.enabled&&!chart.credits){creditsHref=credits.href;
chart.credits=renderer.text(credits.text,0,0).on("click",function(){if(creditsHref){location.href=creditsHref
}}).attr({align:credits.position.align,zIndex:8}).css(credits.style).add().align(credits.position)
}chart.hasRendered=true
},destroy:function(){var chart=this,axes=chart.axes,series=chart.series,container=chart.container,i,parentNode=container&&container.parentNode;
fireEvent(chart,"destroy");
charts[chart.index]=UNDEFINED;
chart.renderTo.removeAttribute("data-highcharts-chart");
removeEvent(chart);
i=axes.length;
while(i--){axes[i]=axes[i].destroy()
}i=series.length;
while(i--){series[i]=series[i].destroy()
}each(["title","subtitle","chartBackground","plotBackground","plotBGImage","plotBorder","seriesGroup","clipRect","credits","pointer","scroller","rangeSelector","legend","resetZoomButton","tooltip","renderer"],function(name){var prop=chart[name];
if(prop&&prop.destroy){chart[name]=prop.destroy()
}});
if(container){container.innerHTML="";
removeEvent(container);
if(parentNode){discardElement(container)
}}for(i in chart){delete chart[i]
}},isReadyToRender:function(){var chart=this;
if((!hasSVG&&(win==win.top&&doc.readyState!=="complete"))||(useCanVG&&!win.canvg)){if(useCanVG){CanVGController.push(function(){chart.firstRender()
},chart.options.global.canvasToolsURL)
}else{doc.attachEvent("onreadystatechange",function(){doc.detachEvent("onreadystatechange",chart.firstRender);
if(doc.readyState==="complete"){chart.firstRender()
}})
}return false
}return true
},firstRender:function(){var chart=this,options=chart.options,callback=chart.callback;
if(!chart.isReadyToRender()){return
}chart.getContainer();
fireEvent(chart,"init");
chart.resetMargins();
chart.setChartSize();
chart.propFromSeries();
chart.getAxes();
each(options.series||[],function(serieOptions){chart.initSeries(serieOptions)
});
chart.linkSeries();
fireEvent(chart,"beforeRender");
if(Highmaps.Pointer){chart.pointer=new Pointer(chart,options)
}chart.render();
chart.renderer.draw();
if(callback){callback.apply(chart,[chart])
}each(chart.callbacks,function(fn){fn.apply(chart,[chart])
});
chart.cloneRenderTo(true);
fireEvent(chart,"load")
},splashArray:function(target,options){var oVar=options[target],tArray=isObject(oVar)?oVar:[oVar,oVar,oVar,oVar];
return[pick(options[target+"Top"],tArray[0]),pick(options[target+"Right"],tArray[1]),pick(options[target+"Bottom"],tArray[2]),pick(options[target+"Left"],tArray[3])]
}};
Chart.prototype.callbacks=[];
var Point=function(){};
Point.prototype={init:function(series,options,x){var point=this,colors;
point.series=series;
point.applyOptions(options,x);
point.pointAttr={};
if(series.options.colorByPoint){colors=series.options.colors||series.chart.options.colors;
point.color=point.color||colors[series.colorCounter++];
if(series.colorCounter===colors.length){series.colorCounter=0
}}series.chart.pointCount++;
return point
},applyOptions:function(options,x){var point=this,series=point.series,pointValKey=series.pointValKey;
options=Point.prototype.optionsToObject.call(this,options);
extend(point,options);
point.options=point.options?extend(point.options,options):options;
if(pointValKey){point.y=point[pointValKey]
}if(point.x===UNDEFINED&&series){point.x=x===UNDEFINED?series.autoIncrement():x
}return point
},optionsToObject:function(options){var ret={},series=this.series,pointArrayMap=series.pointArrayMap||["y"],valueCount=pointArrayMap.length,firstItemType,i=0,j=0;
if(typeof options==="number"||options===null){ret[pointArrayMap[0]]=options
}else{if(isArray(options)){if(options.length>valueCount){firstItemType=typeof options[0];
if(firstItemType==="string"){ret.name=options[0]
}else{if(firstItemType==="number"){ret.x=options[0]
}}i++
}while(j<valueCount){ret[pointArrayMap[j++]]=options[i++]
}}else{if(typeof options==="object"){ret=options;
if(options.dataLabels){series._hasPointLabels=true
}if(options.marker){series._hasPointMarkers=true
}}}}return ret
},destroy:function(){var point=this,series=point.series,chart=series.chart,hoverPoints=chart.hoverPoints,prop;
chart.pointCount--;
if(hoverPoints){point.setState();
erase(hoverPoints,point);
if(!hoverPoints.length){chart.hoverPoints=null
}}if(point===chart.hoverPoint){point.onMouseOut()
}if(point.graphic||point.dataLabel){removeEvent(point);
point.destroyElements()
}if(point.legendItem){chart.legend.destroyItem(point)
}for(prop in point){point[prop]=null
}},destroyElements:function(){var point=this,props=["graphic","dataLabel","dataLabelUpper","group","connector","shadowGroup"],prop,i=6;
while(i--){prop=props[i];
if(point[prop]){point[prop]=point[prop].destroy()
}}},getLabelConfig:function(){var point=this;
return{x:point.category,y:point.y,key:point.name||point.category,series:point.series,point:point,percentage:point.percentage,total:point.total||point.stackTotal}
},tooltipFormatter:function(pointFormat){var series=this.series,seriesTooltipOptions=series.tooltipOptions,valueDecimals=pick(seriesTooltipOptions.valueDecimals,""),valuePrefix=seriesTooltipOptions.valuePrefix||"",valueSuffix=seriesTooltipOptions.valueSuffix||"";
each(series.pointArrayMap||["y"],function(key){key="{point."+key;
if(valuePrefix||valueSuffix){pointFormat=pointFormat.replace(key+"}",valuePrefix+key+"}"+valueSuffix)
}pointFormat=pointFormat.replace(key+"}",key+":,."+valueDecimals+"f}")
});
return format(pointFormat,{point:this,series:this.series})
}};
var Series=function(){};
Series.prototype={isCartesian:true,type:"line",pointClass:Point,sorted:true,requireSorting:true,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(chart,options){var series=this,eventType,events,chartSeries=chart.series,sortByIndex=function(a,b){return pick(a.options.index,a._i)-pick(b.options.index,b._i)
};
series.chart=chart;
series.options=options=series.setOptions(options);
series.linkedSeries=[];
series.bindAxes();
extend(series,{name:options.name,state:NORMAL_STATE,pointAttr:{},visible:options.visible!==false,selected:options.selected===true});
if(useCanVG){options.animation=false
}events=options.events;
for(eventType in events){addEvent(series,eventType,events[eventType])
}if((events&&events.click)||(options.point&&options.point.events&&options.point.events.click)||options.allowPointSelect){chart.runTrackerClick=true
}series.getColor();
series.getSymbol();
each(series.parallelArrays,function(key){series[key+"Data"]=[]
});
series.setData(options.data,false);
if(series.isCartesian){chart.hasCartesianSeries=true
}chartSeries.push(series);
series._i=chartSeries.length-1;
stableSort(chartSeries,sortByIndex);
if(this.yAxis){stableSort(this.yAxis.series,sortByIndex)
}each(chartSeries,function(series,i){series.index=i;
series.name=series.name||"Series "+(i+1)
})
},bindAxes:function(){var series=this,seriesOptions=series.options,chart=series.chart,axisOptions;
each(series.axisTypes||[],function(AXIS){each(chart[AXIS],function(axis){axisOptions=axis.options;
if((seriesOptions[AXIS]===axisOptions.index)||(seriesOptions[AXIS]!==UNDEFINED&&seriesOptions[AXIS]===axisOptions.id)||(seriesOptions[AXIS]===UNDEFINED&&axisOptions.index===0)){axis.series.push(series);
series[AXIS]=axis;
axis.isDirty=true
}});
if(!series[AXIS]&&series.optionalAxis!==AXIS){error(18,true)
}})
},updateParallelArrays:function(point,i){var series=point.series,args=arguments,fn=typeof i==="number"?function(key){var val=key==="y"&&series.toYData?series.toYData(point):point[key];
series[key+"Data"][i]=val
}:function(key){Array.prototype[i].apply(series[key+"Data"],Array.prototype.slice.call(args,2))
};
each(series.parallelArrays,fn)
},autoIncrement:function(){var series=this,options=series.options,xIncrement=series.xIncrement;
xIncrement=pick(xIncrement,options.pointStart,0);
series.pointInterval=pick(series.pointInterval,options.pointInterval,1);
series.xIncrement=xIncrement+series.pointInterval;
return xIncrement
},getSegments:function(){var series=this,lastNull=-1,segments=[],i,points=series.points,pointsLength=points.length;
if(pointsLength){if(series.options.connectNulls){i=pointsLength;
while(i--){if(points[i].y===null){points.splice(i,1)
}}if(points.length){segments=[points]
}}else{each(points,function(point,i){if(point.y===null){if(i>lastNull+1){segments.push(points.slice(lastNull+1,i))
}lastNull=i
}else{if(i===pointsLength-1){segments.push(points.slice(lastNull+1,i+1))
}}})
}}series.segments=segments
},setOptions:function(itemOptions){var chart=this.chart,chartOptions=chart.options,plotOptions=chartOptions.plotOptions,userOptions=chart.userOptions||{},userPlotOptions=userOptions.plotOptions||{},typeOptions=plotOptions[this.type],options;
this.userOptions=itemOptions;
options=merge(typeOptions,plotOptions.series,itemOptions);
this.tooltipOptions=merge(defaultOptions.tooltip,defaultOptions.plotOptions[this.type].tooltip,userOptions.tooltip,userPlotOptions.series&&userPlotOptions.series.tooltip,userPlotOptions[this.type]&&userPlotOptions[this.type].tooltip,itemOptions.tooltip);
if(typeOptions.marker===null){delete options.marker
}return options
},getColor:function(){var options=this.options,userOptions=this.userOptions,defaultColors=this.chart.options.colors,counters=this.chart.counters,color,colorIndex;
color=options.color||defaultPlotOptions[this.type].color;
if(!color&&!options.colorByPoint){if(defined(userOptions._colorIndex)){colorIndex=userOptions._colorIndex
}else{userOptions._colorIndex=counters.color;
colorIndex=counters.color++
}color=defaultColors[colorIndex]
}this.color=color;
counters.wrapColor(defaultColors.length)
},getSymbol:function(){var series=this,userOptions=series.userOptions,seriesMarkerOption=series.options.marker,chart=series.chart,defaultSymbols=chart.options.symbols,counters=chart.counters,symbolIndex;
series.symbol=seriesMarkerOption.symbol;
if(!series.symbol){if(defined(userOptions._symbolIndex)){symbolIndex=userOptions._symbolIndex
}else{userOptions._symbolIndex=counters.symbol;
symbolIndex=counters.symbol++
}series.symbol=defaultSymbols[symbolIndex]
}if(/^url/.test(series.symbol)){seriesMarkerOption.radius=0
}counters.wrapSymbol(defaultSymbols.length)
},drawLegendSymbol:LegendSymbolMixin.drawLineMarker,setData:function(data,redraw,animation,updatePoints){var series=this,oldData=series.points,oldDataLength=(oldData&&oldData.length)||0,dataLength,options=series.options,chart=series.chart,firstPoint=null,xAxis=series.xAxis,hasCategories=xAxis&&!!xAxis.categories,tooltipPoints=series.tooltipPoints,i,turboThreshold=options.turboThreshold,pt,xData=this.xData,yData=this.yData,pointArrayMap=series.pointArrayMap,valueCount=pointArrayMap&&pointArrayMap.length;
data=data||[];
dataLength=data.length;
redraw=pick(redraw,true);
if(updatePoints!==false&&dataLength&&oldDataLength===dataLength&&!series.cropped&&!series.hasGroupedData){each(data,function(point,i){oldData[i].update(point,false)
})
}else{series.xIncrement=null;
series.pointRange=hasCategories?1:options.pointRange;
series.colorCounter=0;
each(this.parallelArrays,function(key){series[key+"Data"].length=0
});
if(turboThreshold&&dataLength>turboThreshold){i=0;
while(firstPoint===null&&i<dataLength){firstPoint=data[i];
i++
}if(isNumber(firstPoint)){var x=pick(options.pointStart,0),pointInterval=pick(options.pointInterval,1);
for(i=0;
i<dataLength;
i++){xData[i]=x;
yData[i]=data[i];
x+=pointInterval
}series.xIncrement=x
}else{if(isArray(firstPoint)){if(valueCount){for(i=0;
i<dataLength;
i++){pt=data[i];
xData[i]=pt[0];
yData[i]=pt.slice(1,valueCount+1)
}}else{for(i=0;
i<dataLength;
i++){pt=data[i];
xData[i]=pt[0];
yData[i]=pt[1]
}}}else{error(12)
}}}else{for(i=0;
i<dataLength;
i++){if(data[i]!==UNDEFINED){pt={series:series};
series.pointClass.prototype.applyOptions.apply(pt,[data[i]]);
series.updateParallelArrays(pt,i);
if(hasCategories&&pt.name){xAxis.names[pt.x]=pt.name
}}}}if(isString(yData[0])){error(14,true)
}series.data=[];
series.options.data=data;
i=oldDataLength;
while(i--){if(oldData[i]&&oldData[i].destroy){oldData[i].destroy()
}}if(tooltipPoints){tooltipPoints.length=0
}if(xAxis){xAxis.minRange=xAxis.userMinRange
}series.isDirty=series.isDirtyData=chart.isDirtyBox=true;
animation=false
}if(redraw){chart.redraw(animation)
}},processData:function(force){var series=this,processedXData=series.xData,processedYData=series.yData,dataLength=processedXData.length,croppedData,cropStart=0,cropped,distance,closestPointRange,xAxis=series.xAxis,i,options=series.options,cropThreshold=options.cropThreshold,isCartesian=series.isCartesian;
if(isCartesian&&!series.isDirty&&!xAxis.isDirty&&!series.yAxis.isDirty&&!force){return false
}if(isCartesian&&series.sorted&&(!cropThreshold||dataLength>cropThreshold||series.forceCrop)){var min=xAxis.min,max=xAxis.max;
if(processedXData[dataLength-1]<min||processedXData[0]>max){processedXData=[];
processedYData=[]
}else{if(processedXData[0]<min||processedXData[dataLength-1]>max){croppedData=this.cropData(series.xData,series.yData,min,max);
processedXData=croppedData.xData;
processedYData=croppedData.yData;
cropStart=croppedData.start;
cropped=true
}}}for(i=processedXData.length-1;
i>=0;
i--){distance=processedXData[i]-processedXData[i-1];
if(distance>0&&(closestPointRange===UNDEFINED||distance<closestPointRange)){closestPointRange=distance
}else{if(distance<0&&series.requireSorting){error(15)
}}}series.cropped=cropped;
series.cropStart=cropStart;
series.processedXData=processedXData;
series.processedYData=processedYData;
if(options.pointRange===null){series.pointRange=closestPointRange||1
}series.closestPointRange=closestPointRange
},cropData:function(xData,yData,min,max){var dataLength=xData.length,cropStart=0,cropEnd=dataLength,cropShoulder=pick(this.cropShoulder,1),i;
for(i=0;
i<dataLength;
i++){if(xData[i]>=min){cropStart=mathMax(0,i-cropShoulder);
break
}}for(;
i<dataLength;
i++){if(xData[i]>max){cropEnd=i+cropShoulder;
break
}}return{xData:xData.slice(cropStart,cropEnd),yData:yData.slice(cropStart,cropEnd),start:cropStart,end:cropEnd}
},generatePoints:function(){var series=this,options=series.options,dataOptions=options.data,data=series.data,dataLength,processedXData=series.processedXData,processedYData=series.processedYData,pointClass=series.pointClass,processedDataLength=processedXData.length,cropStart=series.cropStart||0,cursor,hasGroupedData=series.hasGroupedData,point,points=[],i;
if(!data&&!hasGroupedData){var arr=[];
arr.length=dataOptions.length;
data=series.data=arr
}for(i=0;
i<processedDataLength;
i++){cursor=cropStart+i;
if(!hasGroupedData){if(data[cursor]){point=data[cursor]
}else{if(dataOptions[cursor]!==UNDEFINED){data[cursor]=point=(new pointClass()).init(series,dataOptions[cursor],processedXData[i])
}}points[i]=point
}else{points[i]=(new pointClass()).init(series,[processedXData[i]].concat(splat(processedYData[i])))
}}if(data&&(processedDataLength!==(dataLength=data.length)||hasGroupedData)){for(i=0;
i<dataLength;
i++){if(i===cropStart&&!hasGroupedData){i+=processedDataLength
}if(data[i]){data[i].destroyElements();
data[i].plotX=UNDEFINED
}}}series.data=data;
series.points=points
},getExtremes:function(yData){var xAxis=this.xAxis,yAxis=this.yAxis,xData=this.processedXData,yDataLength,activeYData=[],activeCounter=0,xExtremes=xAxis.getExtremes(),xMin=xExtremes.min,xMax=xExtremes.max,validValue,withinRange,dataMin,dataMax,x,y,i,j;
yData=yData||this.stackedYData||this.processedYData;
yDataLength=yData.length;
for(i=0;
i<yDataLength;
i++){x=xData[i];
y=yData[i];
validValue=y!==null&&y!==UNDEFINED&&(!yAxis.isLog||(y.length||y>0));
withinRange=this.getExtremesFromAll||this.cropped||((xData[i+1]||x)>=xMin&&(xData[i-1]||x)<=xMax);
if(validValue&&withinRange){j=y.length;
if(j){while(j--){if(y[j]!==null){activeYData[activeCounter++]=y[j]
}}}else{activeYData[activeCounter++]=y
}}}this.dataMin=pick(dataMin,arrayMin(activeYData));
this.dataMax=pick(dataMax,arrayMax(activeYData))
},translate:function(){if(!this.processedXData){this.processData()
}this.generatePoints();
var series=this,options=series.options,stacking=options.stacking,xAxis=series.xAxis,categories=xAxis.categories,yAxis=series.yAxis,points=series.points,dataLength=points.length,hasModifyValue=!!series.modifyValue,i,pointPlacement=options.pointPlacement,dynamicallyPlaced=pointPlacement==="between"||isNumber(pointPlacement),threshold=options.threshold;
for(i=0;
i<dataLength;
i++){var point=points[i],xValue=point.x,yValue=point.y,yBottom=point.low,stack=stacking&&yAxis.stacks[(series.negStacks&&yValue<threshold?"-":"")+series.stackKey],pointStack,stackValues;
if(yAxis.isLog&&yValue<=0){point.y=yValue=null
}point.plotX=xAxis.translate(xValue,0,0,0,1,pointPlacement,this.type==="flags");
if(stacking&&series.visible&&stack&&stack[xValue]){pointStack=stack[xValue];
stackValues=pointStack.points[series.index];
yBottom=stackValues[0];
yValue=stackValues[1];
if(yBottom===0){yBottom=pick(threshold,yAxis.min)
}if(yAxis.isLog&&yBottom<=0){yBottom=null
}point.total=point.stackTotal=pointStack.total;
point.percentage=pointStack.total&&(point.y/pointStack.total*100);
point.stackY=yValue;
pointStack.setOffset(series.pointXOffset||0,series.barW||0)
}point.yBottom=defined(yBottom)?yAxis.translate(yBottom,0,1,0,1):null;
if(hasModifyValue){yValue=series.modifyValue(yValue,point)
}point.plotY=(typeof yValue==="number"&&yValue!==Infinity)?yAxis.translate(yValue,0,1,0,1):UNDEFINED;
point.clientX=dynamicallyPlaced?xAxis.translate(xValue,0,0,0,1):point.plotX;
point.negative=point.y<(threshold||0);
point.category=categories&&categories[point.x]!==UNDEFINED?categories[point.x]:point.x
}series.getSegments()
},animate:function(init){var series=this,chart=series.chart,renderer=chart.renderer,clipRect,markerClipRect,animation=series.options.animation,clipBox=chart.clipBox,inverted=chart.inverted,sharedClipKey;
if(animation&&!isObject(animation)){animation=defaultPlotOptions[series.type].animation
}sharedClipKey="_sharedClip"+animation.duration+animation.easing;
if(init){clipRect=chart[sharedClipKey];
markerClipRect=chart[sharedClipKey+"m"];
if(!clipRect){chart[sharedClipKey]=clipRect=renderer.clipRect(extend(clipBox,{width:0}));
chart[sharedClipKey+"m"]=markerClipRect=renderer.clipRect(-99,inverted?-chart.plotLeft:-chart.plotTop,99,inverted?chart.chartWidth:chart.chartHeight)
}series.group.clip(clipRect);
series.markerGroup.clip(markerClipRect);
series.sharedClipKey=sharedClipKey
}else{clipRect=chart[sharedClipKey];
if(clipRect){clipRect.animate({width:chart.plotSizeX},animation);
chart[sharedClipKey+"m"].animate({width:chart.plotSizeX+99},animation)
}series.animate=null;
series.animationTimeout=setTimeout(function(){series.afterAnimate()
},animation.duration)
}},afterAnimate:function(){var chart=this.chart,sharedClipKey=this.sharedClipKey,group=this.group;
if(group&&this.options.clip!==false){group.clip(chart.clipRect);
this.markerGroup.clip()
}setTimeout(function(){if(sharedClipKey&&chart[sharedClipKey]){chart[sharedClipKey]=chart[sharedClipKey].destroy();
chart[sharedClipKey+"m"]=chart[sharedClipKey+"m"].destroy()
}},100)
},drawPoints:function(){var series=this,pointAttr,points=series.points,chart=series.chart,plotX,plotY,i,point,radius,symbol,isImage,graphic,options=series.options,seriesMarkerOptions=options.marker,seriesPointAttr=series.pointAttr[""],pointMarkerOptions,enabled,isInside,markerGroup=series.markerGroup;
if(seriesMarkerOptions.enabled||series._hasPointMarkers){i=points.length;
while(i--){point=points[i];
plotX=mathFloor(point.plotX);
plotY=point.plotY;
graphic=point.graphic;
pointMarkerOptions=point.marker||{};
enabled=(seriesMarkerOptions.enabled&&pointMarkerOptions.enabled===UNDEFINED)||pointMarkerOptions.enabled;
isInside=chart.isInsidePlot(mathRound(plotX),plotY,chart.inverted);
if(enabled&&plotY!==UNDEFINED&&!isNaN(plotY)&&point.y!==null){pointAttr=point.pointAttr[point.selected?SELECT_STATE:NORMAL_STATE]||seriesPointAttr;
radius=pointAttr.r;
symbol=pick(pointMarkerOptions.symbol,series.symbol);
isImage=symbol.indexOf("url")===0;
if(graphic){graphic.attr({visibility:isInside?"inherit":HIDDEN}).animate(extend({x:plotX-radius,y:plotY-radius},graphic.symbolName?{width:2*radius,height:2*radius}:{}))
}else{if(isInside&&(radius>0||isImage)){point.graphic=graphic=chart.renderer.symbol(symbol,plotX-radius,plotY-radius,2*radius,2*radius).attr(pointAttr).add(markerGroup)
}}}else{if(graphic){point.graphic=graphic.destroy()
}}}}},convertAttribs:function(options,base1,base2,base3){var conversion=this.pointAttrToOptions,attr,option,obj={};
options=options||{};
base1=base1||{};
base2=base2||{};
base3=base3||{};
for(attr in conversion){option=conversion[attr];
obj[attr]=pick(options[option],base1[attr],base2[attr],base3[attr])
}return obj
},getAttribs:function(){var series=this,seriesOptions=series.options,normalOptions=defaultPlotOptions[series.type].marker?seriesOptions.marker:seriesOptions,stateOptions=normalOptions.states,stateOptionsHover=stateOptions[HOVER_STATE],pointStateOptionsHover,seriesColor=series.color,normalDefaults={stroke:seriesColor,fill:seriesColor},points=series.points||[],i,point,seriesPointAttr=[],pointAttr,pointAttrToOptions=series.pointAttrToOptions,hasPointSpecificOptions=series.hasPointSpecificOptions,negativeColor=seriesOptions.negativeColor,defaultLineColor=normalOptions.lineColor,defaultFillColor=normalOptions.fillColor,turboThreshold=seriesOptions.turboThreshold,attr,key;
if(seriesOptions.marker){stateOptionsHover.radius=stateOptionsHover.radius||normalOptions.radius+2;
stateOptionsHover.lineWidth=stateOptionsHover.lineWidth||normalOptions.lineWidth+1
}else{stateOptionsHover.color=stateOptionsHover.color||Color(stateOptionsHover.color||seriesColor).brighten(stateOptionsHover.brightness).get()
}seriesPointAttr[NORMAL_STATE]=series.convertAttribs(normalOptions,normalDefaults);
each([HOVER_STATE,SELECT_STATE],function(state){seriesPointAttr[state]=series.convertAttribs(stateOptions[state],seriesPointAttr[NORMAL_STATE])
});
series.pointAttr=seriesPointAttr;
i=points.length;
if(!turboThreshold||i<turboThreshold||hasPointSpecificOptions){while(i--){point=points[i];
normalOptions=(point.options&&point.options.marker)||point.options;
if(normalOptions&&normalOptions.enabled===false){normalOptions.radius=0
}if(point.negative&&negativeColor){point.color=point.fillColor=negativeColor
}hasPointSpecificOptions=seriesOptions.colorByPoint||point.color;
if(point.options){for(key in pointAttrToOptions){if(defined(normalOptions[pointAttrToOptions[key]])){hasPointSpecificOptions=true
}}}if(hasPointSpecificOptions){normalOptions=normalOptions||{};
pointAttr=[];
stateOptions=normalOptions.states||{};
pointStateOptionsHover=stateOptions[HOVER_STATE]=stateOptions[HOVER_STATE]||{};
if(!seriesOptions.marker){pointStateOptionsHover.color=pointStateOptionsHover.color||(!point.options.color&&stateOptionsHover.color)||Color(point.color).brighten(pointStateOptionsHover.brightness||stateOptionsHover.brightness).get()
}attr={color:point.color};
if(!defaultFillColor){attr.fillColor=point.color
}if(!defaultLineColor){attr.lineColor=point.color
}pointAttr[NORMAL_STATE]=series.convertAttribs(extend(attr,normalOptions),seriesPointAttr[NORMAL_STATE]);
pointAttr[HOVER_STATE]=series.convertAttribs(stateOptions[HOVER_STATE],seriesPointAttr[HOVER_STATE],pointAttr[NORMAL_STATE]);
pointAttr[SELECT_STATE]=series.convertAttribs(stateOptions[SELECT_STATE],seriesPointAttr[SELECT_STATE],pointAttr[NORMAL_STATE])
}else{pointAttr=seriesPointAttr
}point.pointAttr=pointAttr
}}},destroy:function(){var series=this,chart=series.chart,issue134=/AppleWebKit\/533/.test(userAgent),destroy,i,data=series.data||[],point,prop,axis;
fireEvent(series,"destroy");
removeEvent(series);
each(series.axisTypes||[],function(AXIS){axis=series[AXIS];
if(axis){erase(axis.series,series);
axis.isDirty=axis.forceRedraw=true
}});
if(series.legendItem){series.chart.legend.destroyItem(series)
}i=data.length;
while(i--){point=data[i];
if(point&&point.destroy){point.destroy()
}}series.points=null;
clearTimeout(series.animationTimeout);
each(["area","graph","dataLabelsGroup","group","markerGroup","tracker","graphNeg","areaNeg","posClip","negClip"],function(prop){if(series[prop]){destroy=issue134&&prop==="group"?"hide":"destroy";
series[prop][destroy]()
}});
if(chart.hoverSeries===series){chart.hoverSeries=null
}erase(chart.series,series);
for(prop in series){delete series[prop]
}},getSegmentPath:function(segment){var series=this,segmentPath=[],step=series.options.step;
each(segment,function(point,i){var plotX=point.plotX,plotY=point.plotY,lastPoint;
if(series.getPointSpline){segmentPath.push.apply(segmentPath,series.getPointSpline(segment,point,i))
}else{segmentPath.push(i?L:M);
if(step&&i){lastPoint=segment[i-1];
if(step==="right"){segmentPath.push(lastPoint.plotX,plotY)
}else{if(step==="center"){segmentPath.push((lastPoint.plotX+plotX)/2,lastPoint.plotY,(lastPoint.plotX+plotX)/2,plotY)
}else{segmentPath.push(plotX,lastPoint.plotY)
}}}segmentPath.push(point.plotX,point.plotY)
}});
return segmentPath
},getGraphPath:function(){var series=this,graphPath=[],segmentPath,singlePoints=[];
each(series.segments,function(segment){segmentPath=series.getSegmentPath(segment);
if(segment.length>1){graphPath=graphPath.concat(segmentPath)
}else{singlePoints.push(segment[0])
}});
series.singlePoints=singlePoints;
series.graphPath=graphPath;
return graphPath
},drawGraph:function(){var series=this,options=this.options,props=[["graph",options.lineColor||this.color]],lineWidth=options.lineWidth,dashStyle=options.dashStyle,roundCap=options.linecap!=="square",graphPath=this.getGraphPath(),negativeColor=options.negativeColor;
if(negativeColor){props.push(["graphNeg",negativeColor])
}each(props,function(prop,i){var graphKey=prop[0],graph=series[graphKey],attribs;
if(graph){stop(graph);
graph.animate({d:graphPath})
}else{if(lineWidth&&graphPath.length){attribs={stroke:prop[1],"stroke-width":lineWidth,zIndex:1};
if(dashStyle){attribs.dashstyle=dashStyle
}else{if(roundCap){attribs["stroke-linecap"]=attribs["stroke-linejoin"]="round"
}}series[graphKey]=series.chart.renderer.path(graphPath).attr(attribs).add(series.group).shadow(!i&&options.shadow)
}}})
},clipNeg:function(){var options=this.options,chart=this.chart,renderer=chart.renderer,negativeColor=options.negativeColor||options.negativeFillColor,translatedThreshold,posAttr,negAttr,graph=this.graph,area=this.area,posClip=this.posClip,negClip=this.negClip,chartWidth=chart.chartWidth,chartHeight=chart.chartHeight,chartSizeMax=mathMax(chartWidth,chartHeight),yAxis=this.yAxis,above,below;
if(negativeColor&&(graph||area)){translatedThreshold=mathRound(yAxis.toPixels(options.threshold||0,true));
if(translatedThreshold<0){chartSizeMax-=translatedThreshold
}above={x:0,y:0,width:chartSizeMax,height:translatedThreshold};
below={x:0,y:translatedThreshold,width:chartSizeMax,height:chartSizeMax};
if(chart.inverted){above.height=below.y=chart.plotWidth-translatedThreshold;
if(renderer.isVML){above={x:chart.plotWidth-translatedThreshold-chart.plotLeft,y:0,width:chartWidth,height:chartHeight};
below={x:translatedThreshold+chart.plotLeft-chartWidth,y:0,width:chart.plotLeft+translatedThreshold,height:chartWidth}
}}if(yAxis.reversed){posAttr=below;
negAttr=above
}else{posAttr=above;
negAttr=below
}if(posClip){posClip.animate(posAttr);
negClip.animate(negAttr)
}else{this.posClip=posClip=renderer.clipRect(posAttr);
this.negClip=negClip=renderer.clipRect(negAttr);
if(graph&&this.graphNeg){graph.clip(posClip);
this.graphNeg.clip(negClip)
}if(area){area.clip(posClip);
this.areaNeg.clip(negClip)
}}}},invertGroups:function(){var series=this,chart=series.chart;
if(!series.xAxis){return
}function setInvert(){var size={width:series.yAxis.len,height:series.xAxis.len};
each(["group","markerGroup"],function(groupName){if(series[groupName]){series[groupName].attr(size).invert()
}})
}addEvent(chart,"resize",setInvert);
addEvent(series,"destroy",function(){removeEvent(chart,"resize",setInvert)
});
setInvert();
series.invertGroups=setInvert
},plotGroup:function(prop,name,visibility,zIndex,parent){var group=this[prop],isNew=!group;
if(isNew){this[prop]=group=this.chart.renderer.g(name).attr({visibility:visibility,zIndex:zIndex||0.1}).add(parent)
}group[isNew?"attr":"animate"](this.getPlotBox());
return group
},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}
},render:function(){var series=this,chart=series.chart,group,options=series.options,animation=options.animation,doAnimation=animation&&!!series.animate&&chart.renderer.isSVG,visibility=series.visible?VISIBLE:HIDDEN,zIndex=options.zIndex,hasRendered=series.hasRendered,chartSeriesGroup=chart.seriesGroup;
group=series.plotGroup("group","series",visibility,zIndex,chartSeriesGroup);
series.markerGroup=series.plotGroup("markerGroup","markers",visibility,zIndex,chartSeriesGroup);
if(doAnimation){series.animate(true)
}series.getAttribs();
group.inverted=series.isCartesian?chart.inverted:false;
if(series.drawGraph){series.drawGraph();
series.clipNeg()
}if(series.drawDataLabels){series.drawDataLabels()
}if(series.visible){series.drawPoints()
}if(series.drawTracker&&series.options.enableMouseTracking!==false){series.drawTracker()
}if(chart.inverted){series.invertGroups()
}if(options.clip!==false&&!series.sharedClipKey&&!hasRendered){group.clip(chart.clipRect)
}if(doAnimation){series.animate()
}else{if(!hasRendered){series.afterAnimate()
}}series.isDirty=series.isDirtyData=false;
series.hasRendered=true
},redraw:function(){var series=this,chart=series.chart,wasDirtyData=series.isDirtyData,group=series.group,xAxis=series.xAxis,yAxis=series.yAxis;
if(group){if(chart.inverted){group.attr({width:chart.plotWidth,height:chart.plotHeight})
}group.animate({translateX:pick(xAxis&&xAxis.left,chart.plotLeft),translateY:pick(yAxis&&yAxis.top,chart.plotTop)})
}series.translate();
series.setTooltipPoints(true);
series.render();
if(wasDirtyData){fireEvent(series,"updatedData")
}}};
extend(Chart.prototype,{addSeries:function(options,redraw,animation){var series,chart=this;
if(options){redraw=pick(redraw,true);
fireEvent(chart,"addSeries",{options:options},function(){series=chart.initSeries(options);
chart.isDirtyLegend=true;
chart.linkSeries();
if(redraw){chart.redraw(animation)
}})
}return series
},addAxis:function(options,isX,redraw,animation){var key=isX?"xAxis":"yAxis",chartOptions=this.options,axis;
axis=new Axis(this,merge(options,{index:this[key].length,isX:isX}));
chartOptions[key]=splat(chartOptions[key]||{});
chartOptions[key].push(options);
if(pick(redraw,true)){this.redraw(animation)
}},showLoading:function(str){var chart=this,options=chart.options,loadingDiv=chart.loadingDiv;
var loadingOptions=options.loading;
if(!loadingDiv){chart.loadingDiv=loadingDiv=createElement(DIV,{className:PREFIX+"loading"},extend(loadingOptions.style,{zIndex:10,display:NONE}),chart.container);
chart.loadingSpan=createElement("span",null,loadingOptions.labelStyle,loadingDiv)
}chart.loadingSpan.innerHTML=str||options.lang.loading;
if(!chart.loadingShown){css(loadingDiv,{opacity:0,display:"",left:chart.plotLeft+PX,top:chart.plotTop+PX,width:chart.plotWidth+PX,height:chart.plotHeight+PX});
animate(loadingDiv,{opacity:loadingOptions.style.opacity},{duration:loadingOptions.showDuration||0});
chart.loadingShown=true
}},hideLoading:function(){var options=this.options,loadingDiv=this.loadingDiv;
if(loadingDiv){animate(loadingDiv,{opacity:0},{duration:options.loading.hideDuration||100,complete:function(){css(loadingDiv,{display:NONE})
}})
}this.loadingShown=false
}});
extend(Point.prototype,{update:function(options,redraw,animation){var point=this,series=point.series,graphic=point.graphic,i,data=series.data,chart=series.chart,seriesOptions=series.options;
redraw=pick(redraw,true);
point.firePointEvent("update",{options:options},function(){point.applyOptions(options);
if(isObject(options)){series.getAttribs();
if(graphic){if(options&&options.marker&&options.marker.symbol){point.graphic=graphic.destroy()
}else{graphic.attr(point.pointAttr[point.state||""])
}}if(options&&options.dataLabels&&point.dataLabel){point.dataLabel=point.dataLabel.destroy()
}}i=inArray(point,data);
series.updateParallelArrays(point,i);
seriesOptions.data[i]=point.options;
series.isDirty=series.isDirtyData=true;
if(!series.fixedBox&&series.hasCartesianSeries){chart.isDirtyBox=true
}if(seriesOptions.legendType==="point"){chart.legend.destroyItem(point)
}if(redraw){chart.redraw(animation)
}})
},remove:function(redraw,animation){var point=this,series=point.series,points=series.points,chart=series.chart,i,data=series.data;
setAnimation(animation,chart);
redraw=pick(redraw,true);
point.firePointEvent("remove",null,function(){i=inArray(point,data);
if(data.length===points.length){points.splice(i,1)
}data.splice(i,1);
series.options.data.splice(i,1);
series.updateParallelArrays(point,"splice",i,1);
point.destroy();
series.isDirty=true;
series.isDirtyData=true;
if(redraw){chart.redraw()
}})
}});
extend(Series.prototype,{addPoint:function(options,redraw,shift,animation){var series=this,seriesOptions=series.options,data=series.data,graph=series.graph,area=series.area,chart=series.chart,names=series.xAxis&&series.xAxis.names,currentShift=(graph&&graph.shift)||0,dataOptions=seriesOptions.data,point,isInTheMiddle,xData=series.xData,x,i;
setAnimation(animation,chart);
if(shift){each([graph,area,series.graphNeg,series.areaNeg],function(shape){if(shape){shape.shift=currentShift+1
}})
}if(area){area.isArea=true
}redraw=pick(redraw,true);
point={series:series};
series.pointClass.prototype.applyOptions.apply(point,[options]);
x=point.x;
i=xData.length;
if(series.requireSorting&&x<xData[i-1]){isInTheMiddle=true;
while(i&&xData[i-1]>x){i--
}}series.updateParallelArrays(point,"splice",i,0,0);
series.updateParallelArrays(point,i);
if(names){names[x]=point.name
}dataOptions.splice(i,0,options);
if(isInTheMiddle){series.data.splice(i,0,null);
series.processData()
}if(seriesOptions.legendType==="point"){series.generatePoints()
}if(shift){if(data[0]&&data[0].remove){data[0].remove(false)
}else{data.shift();
series.updateParallelArrays(point,"shift");
dataOptions.shift()
}}series.isDirty=true;
series.isDirtyData=true;
if(redraw){series.getAttribs();
chart.redraw()
}},remove:function(redraw,animation){var series=this,chart=series.chart;
redraw=pick(redraw,true);
if(!series.isRemoving){series.isRemoving=true;
fireEvent(series,"remove",null,function(){series.destroy();
chart.isDirtyLegend=chart.isDirtyBox=true;
chart.linkSeries();
if(redraw){chart.redraw(animation)
}})
}series.isRemoving=false
},update:function(newOptions,redraw){var chart=this.chart,oldOptions=this.userOptions,oldType=this.type,proto=seriesTypes[oldType].prototype,n;
newOptions=merge(oldOptions,{animation:false,index:this.index,pointStart:this.xData[0]},{data:this.options.data},newOptions);
this.remove(false);
for(n in proto){if(proto.hasOwnProperty(n)){this[n]=UNDEFINED
}}extend(this,seriesTypes[newOptions.type||oldType].prototype);
this.init(chart,newOptions);
if(pick(redraw,true)){chart.redraw(false)
}}});
extend(Axis.prototype,{update:function(newOptions,redraw){var chart=this.chart;
newOptions=chart.options[this.coll][this.options.index]=merge(this.userOptions,newOptions);
this.destroy(true);
this._addedPlotLB=this.userMin=this.userMax=UNDEFINED;
this.init(chart,extend(newOptions,{events:UNDEFINED}));
chart.isDirtyBox=true;
if(pick(redraw,true)){chart.redraw()
}},remove:function(redraw){var chart=this.chart,key=this.coll,axisSeries=this.series,i=axisSeries.length;
while(i--){if(axisSeries[i]){axisSeries[i].remove(false)
}}erase(chart.axes,this);
erase(chart[key],this);
chart.options[key].splice(this.options.index,1);
each(chart[key],function(axis,i){axis.options.index=i
});
this.destroy();
chart.isDirtyBox=true;
if(pick(redraw,true)){chart.redraw()
}},setTitle:function(newTitleOptions,redraw){this.update({title:newTitleOptions},redraw)
},setCategories:function(categories,redraw){this.update({categories:categories},redraw)
}});
var LineSeries=extendClass(Series);
seriesTypes.line=LineSeries;
defaultPlotOptions.column=merge(defaultSeriesOptions,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:false},select:{color:"#C0C0C0",borderColor:"#000000",shadow:false}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:false,threshold:0});
var ColumnSeries=extendClass(Series,{type:"column",pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},cropShoulder:0,trackerGroups:["group","dataLabelsGroup"],negStacks:true,init:function(){Series.prototype.init.apply(this,arguments);
var series=this,chart=series.chart;
if(chart.hasRendered){each(chart.series,function(otherSeries){if(otherSeries.type===series.type){otherSeries.isDirty=true
}})
}},getColumnMetrics:function(){var series=this,options=series.options,xAxis=series.xAxis,yAxis=series.yAxis,reversedXAxis=xAxis.reversed,stackKey,stackGroups={},columnIndex,columnCount=0;
if(options.grouping===false){columnCount=1
}else{each(series.chart.series,function(otherSeries){var otherOptions=otherSeries.options,otherYAxis=otherSeries.yAxis;
if(otherSeries.type===series.type&&otherSeries.visible&&yAxis.len===otherYAxis.len&&yAxis.pos===otherYAxis.pos){if(otherOptions.stacking){stackKey=otherSeries.stackKey;
if(stackGroups[stackKey]===UNDEFINED){stackGroups[stackKey]=columnCount++
}columnIndex=stackGroups[stackKey]
}else{if(otherOptions.grouping!==false){columnIndex=columnCount++
}}otherSeries.columnIndex=columnIndex
}})
}var categoryWidth=mathMin(mathAbs(xAxis.transA)*(xAxis.ordinalSlope||options.pointRange||xAxis.closestPointRange||xAxis.tickInterval||1),xAxis.len),groupPadding=categoryWidth*options.groupPadding,groupWidth=categoryWidth-2*groupPadding,pointOffsetWidth=groupWidth/columnCount,optionPointWidth=options.pointWidth,pointPadding=defined(optionPointWidth)?(pointOffsetWidth-optionPointWidth)/2:pointOffsetWidth*options.pointPadding,pointWidth=pick(optionPointWidth,pointOffsetWidth-2*pointPadding),colIndex=(reversedXAxis?columnCount-(series.columnIndex||0):series.columnIndex)||0,pointXOffset=pointPadding+(groupPadding+colIndex*pointOffsetWidth-(categoryWidth/2))*(reversedXAxis?-1:1);
return(series.columnMetrics={width:pointWidth,offset:pointXOffset})
},translate:function(){var series=this,chart=series.chart,options=series.options,borderWidth=options.borderWidth,yAxis=series.yAxis,threshold=options.threshold,translatedThreshold=series.translatedThreshold=yAxis.getThreshold(threshold),minPointLength=pick(options.minPointLength,5),metrics=series.getColumnMetrics(),pointWidth=metrics.width,seriesBarW=series.barW=mathCeil(mathMax(pointWidth,1+2*borderWidth)),pointXOffset=series.pointXOffset=metrics.offset,xCrisp=-(borderWidth%2?0.5:0),yCrisp=borderWidth%2?0.5:1;
if(chart.renderer.isVML&&chart.inverted){yCrisp+=1
}Series.prototype.translate.apply(series);
each(series.points,function(point){var yBottom=pick(point.yBottom,translatedThreshold),plotY=mathMin(mathMax(-999-yBottom,point.plotY),yAxis.len+999+yBottom),barX=point.plotX+pointXOffset,barW=seriesBarW,barY=mathMin(plotY,yBottom),right,bottom,fromTop,fromLeft,barH=mathMax(plotY,yBottom)-barY;
if(mathAbs(barH)<minPointLength){if(minPointLength){barH=minPointLength;
barY=mathRound(mathAbs(barY-translatedThreshold)>minPointLength?yBottom-minPointLength:translatedThreshold-(yAxis.translate(point.y,0,1,0,1)<=translatedThreshold?minPointLength:0))
}}point.barX=barX;
point.pointWidth=pointWidth;
fromLeft=mathAbs(barX)<0.5;
right=mathRound(barX+barW)+xCrisp;
barX=mathRound(barX)+xCrisp;
barW=right-barX;
fromTop=mathAbs(barY)<0.5;
bottom=mathRound(barY+barH)+yCrisp;
barY=mathRound(barY)+yCrisp;
barH=bottom-barY;
if(fromLeft){barX+=1;
barW-=1
}if(fromTop){barY-=1;
barH+=1
}point.shapeType="rect";
point.shapeArgs={x:barX,y:barY,width:barW,height:barH}
})
},getSymbol:noop,drawLegendSymbol:LegendSymbolMixin.drawRectangle,drawGraph:noop,drawPoints:function(){var series=this,chart=this.chart,options=series.options,renderer=chart.renderer,animationLimit=options.animationLimit||250,shapeArgs;
each(series.points,function(point){var plotY=point.plotY,graphic=point.graphic;
if(plotY!==UNDEFINED&&!isNaN(plotY)&&point.y!==null){shapeArgs=point.shapeArgs;
if(graphic){stop(graphic);
graphic[series.points.length<animationLimit?"animate":"attr"](merge(shapeArgs))
}else{point.graphic=graphic=renderer[point.shapeType](shapeArgs).attr(point.pointAttr[point.selected?SELECT_STATE:NORMAL_STATE]).add(series.group).shadow(options.shadow,null,options.stacking&&!options.borderRadius)
}}else{if(graphic){point.graphic=graphic.destroy()
}}})
},animate:function(init){var series=this,yAxis=this.yAxis,options=series.options,inverted=this.chart.inverted,attr={},translatedThreshold;
if(hasSVG){if(init){attr.scaleY=0.001;
translatedThreshold=mathMin(yAxis.pos+yAxis.len,mathMax(yAxis.pos,yAxis.toPixels(options.threshold)));
if(inverted){attr.translateX=translatedThreshold-yAxis.len
}else{attr.translateY=translatedThreshold
}series.group.attr(attr)
}else{attr.scaleY=1;
attr[inverted?"translateX":"translateY"]=yAxis.pos;
series.group.animate(attr,series.options.animation);
series.animate=null
}}},remove:function(){var series=this,chart=series.chart;
if(chart.hasRendered){each(chart.series,function(otherSeries){if(otherSeries.type===series.type){otherSeries.isDirty=true
}})
}Series.prototype.remove.apply(series,arguments)
}});
seriesTypes.column=ColumnSeries;
defaultPlotOptions.scatter=merge(defaultSeriesOptions,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:true},stickyTracking:false});
var ScatterSeries=extendClass(Series,{type:"scatter",sorted:false,requireSorting:false,noSharedTooltip:true,trackerGroups:["markerGroup"],takeOrdinalPosition:false,singularTooltips:true,drawGraph:function(){if(this.options.lineWidth){Series.prototype.drawGraph.call(this)
}}});
seriesTypes.scatter=ScatterSeries;
Series.prototype.drawDataLabels=function(){var series=this,seriesOptions=series.options,cursor=seriesOptions.cursor,options=seriesOptions.dataLabels,points=series.points,pointOptions,generalOptions,str,dataLabelsGroup;
if(options.enabled||series._hasPointLabels){if(series.dlProcessOptions){series.dlProcessOptions(options)
}dataLabelsGroup=series.plotGroup("dataLabelsGroup","data-labels",series.visible?VISIBLE:HIDDEN,options.zIndex||6);
generalOptions=options;
each(points,function(point){var enabled,dataLabel=point.dataLabel,labelConfig,attr,name,rotation,connector=point.connector,isNew=true;
pointOptions=point.options&&point.options.dataLabels;
enabled=pick(pointOptions&&pointOptions.enabled,generalOptions.enabled);
if(dataLabel&&!enabled){point.dataLabel=dataLabel.destroy()
}else{if(enabled){options=merge(generalOptions,pointOptions);
rotation=options.rotation;
options.formatter=strToFunction(options.formatter);
labelConfig=point.getLabelConfig();
str=format(options.format,labelConfig)?format(options.format,labelConfig):typeof(options.formatter)==="function"?options.formatter.call(labelConfig,options):"";
options.style.color=pick(options.color,options.style.color,series.color,"black");
if(dataLabel){if(defined(str)){dataLabel.attr({text:str});
isNew=false
}else{point.dataLabel=dataLabel=dataLabel.destroy();
if(connector){point.connector=connector.destroy()
}}}else{if(defined(str)){attr={fill:options.backgroundColor,stroke:options.borderColor,"stroke-width":options.borderWidth,r:options.borderRadius||0,rotation:rotation,padding:options.padding,zIndex:1};
for(name in attr){if(attr[name]===UNDEFINED){delete attr[name]
}}dataLabel=point.dataLabel=series.chart.renderer[rotation?"text":"label"](str,0,-999,null,null,null,options.useHTML).attr(attr).css(extend(options.style,cursor&&{cursor:cursor})).add(dataLabelsGroup).shadow(options.shadow)
}}if(dataLabel){series.alignDataLabel(point,dataLabel,options,null,isNew)
}}}})
}};
Series.prototype.alignDataLabel=function(point,dataLabel,options,alignTo,isNew){var chart=this.chart,inverted=chart.inverted,plotX=pick(point.plotX,-999),plotY=pick(point.plotY,-999),bBox=dataLabel.getBBox(),visible=this.visible&&(point.series.forceDL||chart.isInsidePlot(plotX,mathRound(plotY),inverted)||(alignTo&&chart.isInsidePlot(plotX,inverted?alignTo.x+1:alignTo.y+alignTo.height-1,inverted))),alignAttr;
if(visible){alignTo=extend({x:inverted?chart.plotWidth-plotY:plotX,y:mathRound(inverted?chart.plotHeight-plotX:plotY),width:0,height:0},alignTo);
extend(options,{width:bBox.width,height:bBox.height});
if(options.rotation){alignAttr={align:options.align,x:alignTo.x+options.x+alignTo.width/2,y:alignTo.y+options.y+alignTo.height/2};
dataLabel[isNew?"attr":"animate"](alignAttr)
}else{dataLabel.align(options,null,alignTo);
alignAttr=dataLabel.alignAttr;
if(pick(options.overflow,"justify")==="justify"){this.justifyDataLabel(dataLabel,options,alignAttr,bBox,alignTo,isNew)
}else{if(pick(options.crop,true)){visible=chart.isInsidePlot(alignAttr.x,alignAttr.y)&&chart.isInsidePlot(alignAttr.x+bBox.width,alignAttr.y+bBox.height)
}}}}if(!visible){dataLabel.attr({y:-999});
dataLabel.placed=false
}};
Series.prototype.justifyDataLabel=function(dataLabel,options,alignAttr,bBox,alignTo,isNew){var chart=this.chart,align=options.align,verticalAlign=options.verticalAlign,off,justified;
off=alignAttr.x;
if(off<0){if(align==="right"){options.align="left"
}else{options.x=-off
}justified=true
}off=alignAttr.x+bBox.width;
if(off>chart.plotWidth){if(align==="left"){options.align="right"
}else{options.x=chart.plotWidth-off
}justified=true
}off=alignAttr.y;
if(off<0){if(verticalAlign==="bottom"){options.verticalAlign="top"
}else{options.y=-off
}justified=true
}off=alignAttr.y+bBox.height;
if(off>chart.plotHeight){if(verticalAlign==="top"){options.verticalAlign="bottom"
}else{options.y=chart.plotHeight-off
}justified=true
}if(justified){dataLabel.placed=!isNew;
dataLabel.align(options,null,alignTo)
}};
if(seriesTypes.pie){seriesTypes.pie.prototype.drawDataLabels=function(){var series=this,data=series.data,point,chart=series.chart,options=series.options.dataLabels,connectorPadding=pick(options.connectorPadding,10),connectorWidth=pick(options.connectorWidth,1),plotWidth=chart.plotWidth,plotHeight=chart.plotHeight,connector,connectorPath,softConnector=pick(options.softConnector,true),distanceOption=options.distance,seriesCenter=series.center,radius=seriesCenter[2]/2,centerY=seriesCenter[1],outside=distanceOption>0,dataLabel,dataLabelWidth,labelPos,labelHeight,halves=[[],[]],x,y,visibility,rankArr,i,j,overflow=[0,0,0,0],sort=function(a,b){return b.y-a.y
};
if(!series.visible||(!options.enabled&&!series._hasPointLabels)){return
}Series.prototype.drawDataLabels.apply(series);
each(data,function(point){if(point.dataLabel&&point.visible){halves[point.half].push(point)
}});
i=0;
while(!labelHeight&&data[i]){labelHeight=data[i]&&data[i].dataLabel&&(data[i].dataLabel.getBBox().height||21);
i++
}i=2;
while(i--){var slots=[],slotsLength,usedSlots=[],points=halves[i],pos,length=points.length,slotIndex;
series.sortByAngle(points,i-0.5);
if(distanceOption>0){for(pos=centerY-radius-distanceOption;
pos<=centerY+radius+distanceOption;
pos+=labelHeight){slots.push(pos)
}slotsLength=slots.length;
if(length>slotsLength){rankArr=[].concat(points);
rankArr.sort(sort);
j=length;
while(j--){rankArr[j].rank=j
}j=length;
while(j--){if(points[j].rank>=slotsLength){points.splice(j,1)
}}length=points.length
}for(j=0;
j<length;
j++){point=points[j];
labelPos=point.labelPos;
var closest=9999,distance,slotI;
for(slotI=0;
slotI<slotsLength;
slotI++){distance=mathAbs(slots[slotI]-labelPos[1]);
if(distance<closest){closest=distance;
slotIndex=slotI
}}if(slotIndex<j&&slots[j]!==null){slotIndex=j
}else{if(slotsLength<length-j+slotIndex&&slots[j]!==null){slotIndex=slotsLength-length+j;
while(slots[slotIndex]===null){slotIndex++
}}else{while(slots[slotIndex]===null){slotIndex++
}}}usedSlots.push({i:slotIndex,y:slots[slotIndex]});
slots[slotIndex]=null
}usedSlots.sort(sort)
}for(j=0;
j<length;
j++){var slot,naturalY;
point=points[j];
labelPos=point.labelPos;
dataLabel=point.dataLabel;
visibility=point.visible===false?HIDDEN:VISIBLE;
naturalY=labelPos[1];
if(distanceOption>0){slot=usedSlots.pop();
slotIndex=slot.i;
y=slot.y;
if((naturalY>y&&slots[slotIndex+1]!==null)||(naturalY<y&&slots[slotIndex-1]!==null)){y=naturalY
}}else{y=naturalY
}x=options.justify?seriesCenter[0]+(i?-1:1)*(radius+distanceOption):series.getX(slotIndex===0||slotIndex===slots.length-1?naturalY:y,i);
dataLabel._attr={visibility:visibility,align:labelPos[6]};
dataLabel._pos={x:x+options.x+({left:connectorPadding,right:-connectorPadding}[labelPos[6]]||0),y:y+options.y-10};
dataLabel.connX=x;
dataLabel.connY=y;
if(this.options.size===null){dataLabelWidth=dataLabel.width;
if(x-dataLabelWidth<connectorPadding){overflow[3]=mathMax(mathRound(dataLabelWidth-x+connectorPadding),overflow[3])
}else{if(x+dataLabelWidth>plotWidth-connectorPadding){overflow[1]=mathMax(mathRound(x+dataLabelWidth-plotWidth+connectorPadding),overflow[1])
}}if(y-labelHeight/2<0){overflow[0]=mathMax(mathRound(-y+labelHeight/2),overflow[0])
}else{if(y+labelHeight/2>plotHeight){overflow[2]=mathMax(mathRound(y+labelHeight/2-plotHeight),overflow[2])
}}}}}if(arrayMax(overflow)===0||this.verifyDataLabelOverflow(overflow)){this.placeDataLabels();
if(outside&&connectorWidth){each(this.points,function(point){connector=point.connector;
labelPos=point.labelPos;
dataLabel=point.dataLabel;
if(dataLabel&&dataLabel._pos){visibility=dataLabel._attr.visibility;
x=dataLabel.connX;
y=dataLabel.connY;
connectorPath=softConnector?[M,x+(labelPos[6]==="left"?5:-5),y,"C",x,y,2*labelPos[2]-labelPos[4],2*labelPos[3]-labelPos[5],labelPos[2],labelPos[3],L,labelPos[4],labelPos[5]]:[M,x+(labelPos[6]==="left"?5:-5),y,L,labelPos[2],labelPos[3],L,labelPos[4],labelPos[5]];
if(connector){connector.animate({d:connectorPath});
connector.attr("visibility",visibility)
}else{point.connector=connector=series.chart.renderer.path(connectorPath).attr({"stroke-width":connectorWidth,stroke:options.connectorColor||point.color||"#606060",visibility:visibility,zIndex:0}).add(series.group)
}}else{if(connector){point.connector=connector.destroy()
}}})
}}};
seriesTypes.pie.prototype.placeDataLabels=function(){each(this.points,function(point){var dataLabel=point.dataLabel,_pos;
if(dataLabel){_pos=dataLabel._pos;
if(_pos){dataLabel.attr(dataLabel._attr);
dataLabel[dataLabel.moved?"animate":"attr"](_pos);
dataLabel.moved=true
}else{if(dataLabel){dataLabel.attr({y:-999})
}}}})
};
seriesTypes.pie.prototype.alignDataLabel=noop;
seriesTypes.pie.prototype.verifyDataLabelOverflow=function(overflow){var center=this.center,options=this.options,centerOption=options.center,minSize=options.minSize||80,newSize=minSize,ret;
if(centerOption[0]!==null){newSize=mathMax(center[2]-mathMax(overflow[1],overflow[3]),minSize)
}else{newSize=mathMax(center[2]-overflow[1]-overflow[3],minSize);
center[0]+=(overflow[3]-overflow[1])/2
}if(centerOption[1]!==null){newSize=mathMax(mathMin(newSize,center[2]-mathMax(overflow[0],overflow[2])),minSize)
}else{newSize=mathMax(mathMin(newSize,center[2]-overflow[0]-overflow[2]),minSize);
center[1]+=(overflow[0]-overflow[2])/2
}if(newSize<center[2]){center[2]=newSize;
this.translate(center);
each(this.points,function(point){if(point.dataLabel){point.dataLabel._pos=null
}});
if(this.drawDataLabels){this.drawDataLabels()
}}else{ret=true
}return ret
}
}if(seriesTypes.column){seriesTypes.column.prototype.alignDataLabel=function(point,dataLabel,options,alignTo,isNew){var chart=this.chart,inverted=chart.inverted,dlBox=point.dlBox||point.shapeArgs,below=point.below||(point.plotY>pick(this.translatedThreshold,chart.plotSizeY)),inside=pick(options.inside,!!this.options.stacking);
if(dlBox){alignTo=merge(dlBox);
if(inverted){alignTo={x:chart.plotWidth-alignTo.y-alignTo.height,y:chart.plotHeight-alignTo.x-alignTo.width,width:alignTo.height,height:alignTo.width}
}if(!inside){if(inverted){alignTo.x+=below?0:alignTo.width;
alignTo.width=0
}else{alignTo.y+=below?alignTo.height:0;
alignTo.height=0
}}}options.align=pick(options.align,!inverted||inside?"center":below?"right":"left");
options.verticalAlign=pick(options.verticalAlign,inverted||inside?"middle":below?"top":"bottom");
Series.prototype.alignDataLabel.call(this,point,dataLabel,options,alignTo,isNew)
}
}wrap(Axis.prototype,"getSeriesExtremes",function(proceed){var isXAxis=this.isXAxis,dataMin,dataMax,xData=[],useMapGeometry;
if(isXAxis){each(this.series,function(series,i){if(series.useMapGeometry){xData[i]=series.xData;
series.xData=[]
}})
}proceed.call(this);
if(isXAxis){dataMin=pick(this.dataMin,Number.MAX_VALUE);
dataMax=pick(this.dataMax,Number.MIN_VALUE);
each(this.series,function(series,i){if(series.useMapGeometry){dataMin=Math.min(dataMin,pick(series.minX,dataMin));
dataMax=Math.max(dataMax,pick(series.maxX,dataMin));
series.xData=xData[i];
useMapGeometry=true
}});
if(useMapGeometry){this.dataMin=dataMin;
this.dataMax=dataMax
}}});
wrap(Axis.prototype,"setAxisTranslation",function(proceed){var chart=this.chart,mapRatio,plotRatio=chart.plotWidth/chart.plotHeight,adjustedAxisLength,xAxis=chart.xAxis[0],padAxis,fixTo,fixDiff;
proceed.call(this);
if(chart.options.chart.preserveAspectRatio&&this.coll==="yAxis"&&xAxis.transA!==UNDEFINED){this.transA=xAxis.transA=Math.min(this.transA,xAxis.transA);
mapRatio=plotRatio/((xAxis.max-xAxis.min)/(this.max-this.min));
padAxis=mapRatio<1?this:xAxis;
adjustedAxisLength=(padAxis.max-padAxis.min)*padAxis.transA;
padAxis.pixelPadding=padAxis.len-adjustedAxisLength;
padAxis.minPixelPadding=padAxis.pixelPadding/2;
fixTo=padAxis.fixTo;
if(fixTo){fixDiff=fixTo[1]-padAxis.toValue(fixTo[0],true);
fixDiff*=padAxis.transA;
if(Math.abs(fixDiff)>padAxis.minPixelPadding||(padAxis.min===padAxis.dataMin&&padAxis.max===padAxis.dataMax)){fixDiff=0
}padAxis.minPixelPadding-=fixDiff
}}});
wrap(Axis.prototype,"render",function(proceed){proceed.call(this);
this.fixTo=null
});
var ColorAxis=Highmaps.ColorAxis=function(){this.isColorAxis=true;
this.init.apply(this,arguments)
};
extend(ColorAxis.prototype,Axis.prototype);
extend(ColorAxis.prototype,{defaultColorAxisOptions:{lineWidth:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:true,endOnTick:true,offset:0,marker:{animation:{duration:50},color:"gray",width:0.01},labels:{overflow:"justify"},minColor:"#EFEFFF",maxColor:"#003875"},init:function(chart,userOptions){var horiz=chart.options.legend.layout!=="vertical",options;
options=merge(this.defaultColorAxisOptions,{side:horiz?2:1,reversed:!horiz},userOptions,{isX:horiz,opposite:!horiz,showEmpty:false,title:null,isColor:true});
Axis.prototype.init.call(this,chart,options);
if(userOptions.dataClasses){this.initDataClasses(userOptions)
}this.isXAxis=true;
this.horiz=horiz;
this.zoomEnabled=false
},tweenColors:function(from,to,pos){var i=4,val,rgba=[];
while(i--){val=to.rgba[i]+(from.rgba[i]-to.rgba[i])*(1-pos);
rgba[i]=i===3?val:Math.round(val)
}return"rgba("+rgba.join(",")+")"
},initDataClasses:function(userOptions){var axis=this,chart=this.chart,dataClasses,colorCounter=0,options=this.options;
this.dataClasses=dataClasses=[];
each(userOptions.dataClasses,function(dataClass,i){var colors;
dataClass=merge(dataClass);
dataClasses.push(dataClass);
if(!dataClass.color){if(options.dataClassColor==="category"){colors=chart.options.colors;
dataClass.color=colors[colorCounter++];
if(colorCounter===colors.length){colorCounter=0
}}else{dataClass.color=axis.tweenColors(Color(options.minColor),Color(options.maxColor),i/(userOptions.dataClasses.length-1))
}}})
},setOptions:function(userOptions){Axis.prototype.setOptions.call(this,userOptions);
this.options.crosshair=this.options.marker;
this.stops=userOptions.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
each(this.stops,function(stop){stop.color=Color(stop[1])
});
this.coll="colorAxis"
},setAxisSize:function(){var symbol=this.legendSymbol,chart=this.chart;
if(symbol){this.left=symbol.x;
this.top=symbol.y;
this.width=symbol.width;
this.height=symbol.height;
this.right=chart.chartWidth-this.left-this.width;
this.bottom=chart.chartHeight-this.top-this.height;
this.len=this.horiz?this.width:this.height;
this.pos=this.horiz?this.left:this.top
}},toColor:function(value,point){var pos,stops=this.stops,from,to,color,dataClasses=this.dataClasses,dataClass,i;
if(dataClasses){i=dataClasses.length;
while(i--){dataClass=dataClasses[i];
from=dataClass.from;
to=dataClass.to;
if((from===UNDEFINED||value>=from)&&(to===UNDEFINED||value<=to)){color=dataClass.color;
if(point){point.dataClass=i
}break
}}}else{if(this.isLog){value=this.val2lin(value)
}pos=1-((this.max-value)/(this.max-this.min));
i=stops.length;
while(i--){if(pos>stops[i][0]){break
}}from=stops[i]||stops[i+1];
to=stops[i+1]||from;
pos=1-(to[0]-pos)/((to[0]-from[0])||1);
color=this.tweenColors(from.color,to.color,pos)
}return color
},getOffset:function(){var group=this.legendGroup;
if(group){Axis.prototype.getOffset.call(this);
if(!this.axisGroup.parentGroup){this.axisGroup.add(group);
this.gridGroup.add(group);
this.labelGroup.add(group);
this.added=true
}}},setLegendColor:function(){var grad,horiz=this.horiz,options=this.options;
grad=horiz?[0,0,1,0]:[0,0,0,1];
this.legendColor={linearGradient:{x1:grad[0],y1:grad[1],x2:grad[2],y2:grad[3]},stops:options.stops||[[0,options.minColor],[1,options.maxColor]]}
},drawLegendSymbol:function(legend,item){var padding=legend.padding,legendOptions=legend.options,horiz=this.horiz,box,width=pick(legendOptions.symbolWidth,horiz?200:12),height=pick(legendOptions.symbolHeight,horiz?12:200),labelPadding=pick(legendOptions.labelPadding,horiz?10:30);
this.setLegendColor();
item.legendSymbol=this.chart.renderer.rect(0,legend.baseline-11,width,height).attr({zIndex:1}).add(item.legendGroup);
box=item.legendSymbol.getBBox();
this.legendItemWidth=width+padding+(horiz?0:labelPadding);
this.legendItemHeight=height+padding+(horiz?labelPadding:0)
},setState:noop,visible:true,setVisible:noop,getSeriesExtremes:function(){var series;
if(this.series.length){series=this.series[0];
this.dataMin=series.valueMin;
this.dataMax=series.valueMax
}},drawCrosshair:function(e,point){var newCross=!this.cross,plotX=point&&point.plotX,plotY=point&&point.plotY,crossPos,axisPos=this.pos,axisLen=this.len;
if(point){crossPos=this.toPixels(point.value);
if(crossPos<axisPos){crossPos=axisPos-2
}else{if(crossPos>axisPos+axisLen){crossPos=axisPos+axisLen+2
}}point.plotX=crossPos;
point.plotY=this.len-crossPos;
Axis.prototype.drawCrosshair.call(this,e,point);
point.plotX=plotX;
point.plotY=plotY;
if(!newCross&&this.cross){this.cross.attr({fill:this.crosshair.color}).add(this.labelGroup)
}}},getPlotLinePath:function(a,b,c,d,pos){if(pos){return this.horiz?["M",pos-4,this.top-6,"L",pos+4,this.top-6,pos,this.top,"Z"]:["M",this.left,pos,"L",this.left-6,pos+6,this.left-6,pos-6,"Z"]
}else{return Axis.prototype.getPlotLinePath.call(this,a,b,c,d)
}},update:function(newOptions,redraw){each(this.series,function(series){series.isDirtyData=true
});
Axis.prototype.update.call(this,newOptions,redraw);
if(this.legendItem){this.setLegendColor();
this.chart.legend.colorizeItem(this,true)
}},getDataClassLegendSymbols:function(){var axis=this,chart=this.chart,legendItems=[],legendOptions=chart.options.legend,valueDecimals=legendOptions.valueDecimals,valueSuffix=legendOptions.valueSuffix||"",name;
each(this.dataClasses,function(dataClass,i){var vis=true,from=dataClass.from,to=dataClass.to;
name="";
if(from===UNDEFINED){name="< "
}else{if(to===UNDEFINED){name="> "
}}if(from!==UNDEFINED){name+=numberFormat(from,valueDecimals)+valueSuffix
}if(from!==UNDEFINED&&to!==UNDEFINED){name+=" - "
}if(to!==UNDEFINED){name+=numberFormat(to,valueDecimals)+valueSuffix
}legendItems.push(extend({chart:chart,name:name,options:{},drawLegendSymbol:LegendSymbolMixin.drawRectangle,visible:true,setState:noop,setVisible:function(){vis=this.visible=!vis;
each(axis.series,function(series){each(series.points,function(point){if(point.dataClass===i){point.setVisible(vis)
}})
});
chart.legend.colorizeItem(this,vis)
}},dataClass))
});
return legendItems
},name:""});
wrap(Chart.prototype,"getAxes",function(proceed){var options=this.options,colorAxisOptions=options.colorAxis;
proceed.call(this);
this.colorAxis=[];
if(colorAxisOptions){proceed=new ColorAxis(this,colorAxisOptions)
}});
wrap(Legend.prototype,"getAllItems",function(proceed){var allItems=[],colorAxis=this.chart.colorAxis[0];
if(colorAxis){if(colorAxis.options.dataClasses){allItems=allItems.concat(colorAxis.getDataClassLegendSymbols())
}else{allItems.push(colorAxis)
}each(colorAxis.series,function(series){series.options.showInLegend=false
})
}return allItems.concat(proceed.call(this))
});
var colorSeriesMixin={pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",dashstyle:"dashStyle"},pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:noop,parallelArrays:["x","y","value"],translateColors:function(){var series=this,nullColor=this.options.nullColor,colorAxis=this.colorAxis;
each(this.data,function(point){var value=point.value,color;
color=value===null?nullColor:colorAxis?colorAxis.toColor(value,point):(point.color)||series.color;
if(color){point.color=color
}})
}};
defaultPlotOptions.map=merge(defaultPlotOptions.scatter,{allAreas:true,animation:false,nullColor:"#F8F8F8",borderColor:"silver",borderWidth:1,marker:null,stickyTracking:false,dataLabels:{format:"{point.value}",verticalAlign:"middle",crop:false,overflow:false,style:{color:"white",fontWeight:"bold",textShadow:"0 0 5px black"}},turboThreshold:0,tooltip:{followPointer:true,pointFormat:"{point.name}: {point.value}<br/>"},states:{normal:{animation:true},hover:{brightness:0.2}}});
var MapAreaPoint=extendClass(Point,{applyOptions:function(options,x){var point=Point.prototype.applyOptions.call(this,options,x),series=this.series,seriesOptions=series.options,joinBy=series.joinBy,mapPoint;
if(seriesOptions.mapData){mapPoint=joinBy[0]?series.getMapData(joinBy[0],point[joinBy[1]]):seriesOptions.mapData[point.x];
if(mapPoint){if(series.xyFromShape){point.x=mapPoint._midX;
point.y=mapPoint._midY
}extend(point,mapPoint)
}else{point.value=point.value||null
}}return point
},setVisible:function(vis){var point=this,method=vis?"show":"hide";
each(["graphic","dataLabel"],function(key){if(point[key]){point[key][method]()
}})
},onMouseOver:function(e){clearTimeout(this.colorInterval);
Point.prototype.onMouseOver.call(this,e)
},onMouseOut:function(){var point=this,start=+new Date(),normalColor=Color(point.color),hoverColor=Color(point.pointAttr.hover.fill),animation=point.series.options.states.normal.animation,duration=animation&&(animation.duration||500),fill;
if(duration&&normalColor.rgba.length===4&&hoverColor.rgba.length===4&&point.state!=="select"){fill=point.pointAttr[""].fill;
delete point.pointAttr[""].fill;
clearTimeout(point.colorInterval);
point.colorInterval=setInterval(function(){var pos=(new Date()-start)/duration,graphic=point.graphic;
if(pos>1){pos=1
}if(graphic){graphic.attr("fill",ColorAxis.prototype.tweenColors.call(0,hoverColor,normalColor,pos))
}if(pos>=1){clearTimeout(point.colorInterval)
}},13)
}Point.prototype.onMouseOut.call(point);
if(fill){point.pointAttr[""].fill=fill
}},zoomTo:function(){var point=this,series=point.series;
series.xAxis.setExtremes(point._minX,point._maxX,false);
series.yAxis.setExtremes(point._minY,point._maxY,false);
series.chart.redraw()
}});
seriesTypes.map=extendClass(seriesTypes.scatter,merge(colorSeriesMixin,{type:"map",pointClass:MapAreaPoint,supportsDrilldown:true,getExtremesFromAll:true,useMapGeometry:true,forceDL:true,getBox:function(paths){var MAX_VALUE=Number.MAX_VALUE,maxX=-MAX_VALUE,minX=MAX_VALUE,maxY=-MAX_VALUE,minY=MAX_VALUE,minRange=MAX_VALUE,xAxis=this.xAxis,yAxis=this.yAxis,hasBox;
each(paths||[],function(point){if(point.path){if(typeof point.path==="string"){point.path=Highmaps.splitPath(point.path)
}var path=point.path||[],i=path.length,even=false,pointMaxX=-MAX_VALUE,pointMinX=MAX_VALUE,pointMaxY=-MAX_VALUE,pointMinY=MAX_VALUE;
if(!point._foundBox){while(i--){if(typeof path[i]==="number"&&!isNaN(path[i])){if(even){pointMaxX=Math.max(pointMaxX,path[i]);
pointMinX=Math.min(pointMinX,path[i])
}else{pointMaxY=Math.max(pointMaxY,path[i]);
pointMinY=Math.min(pointMinY,path[i])
}even=!even
}}point._midX=pointMinX+(pointMaxX-pointMinX)*(point.middleX||0.5);
point._midY=pointMinY+(pointMaxY-pointMinY)*(point.middleY||0.5);
point._maxX=pointMaxX;
point._minX=pointMinX;
point._maxY=pointMaxY;
point._minY=pointMinY;
point._foundBox=true
}maxX=Math.max(maxX,point._maxX);
minX=Math.min(minX,point._minX);
maxY=Math.max(maxY,point._maxY);
minY=Math.min(minY,point._minY);
minRange=Math.min(point._maxX-point._minX,point._maxY-point._minY,minRange);
hasBox=true
}});
if(hasBox){this.minY=Math.min(minY,pick(this.minY,MAX_VALUE));
this.maxY=Math.max(maxY,pick(this.maxY,-MAX_VALUE));
this.minX=Math.min(minX,pick(this.minX,MAX_VALUE));
this.maxX=Math.max(maxX,pick(this.maxX,-MAX_VALUE));
if(xAxis.options.minRange===undefined){xAxis.minRange=Math.min(5*minRange,xAxis.minRange||MAX_VALUE)
}if(yAxis.options.minRange===undefined){yAxis.minRange=Math.min(5*minRange,yAxis.minRange||MAX_VALUE)
}}},getExtremes:function(){Series.prototype.getExtremes.call(this,this.valueData);
if(this.chart.hasRendered&&this.isDirtyData){this.getBox(this.options.data)
}this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
this.dataMin=this.minY;
this.dataMax=this.maxY
},translatePath:function(path){var series=this,even=false,xAxis=series.xAxis,yAxis=series.yAxis,xMin=xAxis.min,xTransA=xAxis.transA,xMinPixelPadding=xAxis.minPixelPadding,yMin=yAxis.min,yTransA=yAxis.transA,yMinPixelPadding=yAxis.minPixelPadding,i,ret=[];
if(path){i=path.length;
while(i--){if(typeof path[i]==="number"){ret[i]=even?(path[i]-xMin)*xTransA+xMinPixelPadding:(path[i]-yMin)*yTransA+yMinPixelPadding;
even=!even
}else{ret[i]=path[i]
}}}return ret
},setData:function(data,redraw){var options=this.options,mapData=options.mapData,joinBy,dataUsed=[];
joinBy=this.joinBy=Highmaps.splat(options.joinBy);
if(!joinBy[1]){joinBy[1]=joinBy[0]
}this.getBox(data);
this.getBox(mapData);
if(options.allAreas&&mapData){data=data||[];
if(joinBy[1]){each(data,function(point){dataUsed.push(point[joinBy[1]])
})
}dataUsed="|"+dataUsed.join("|")+"|";
each(mapData,function(mapPoint){if(!joinBy[0]||dataUsed.indexOf("|"+(mapPoint[joinBy[0]]||(mapPoint.properties&&mapPoint.properties[joinBy[0]]))+"|")===-1){data.push(merge(mapPoint,{value:null}))
}})
}Series.prototype.setData.call(this,data,redraw)
},getMapData:function(key,value){var options=this.options,mapData=options.mapData,mapMap=this.mapMap,mapPoint,i=mapData.length;
if(!mapMap){mapMap=this.mapMap={}
}if(mapMap[value]!==undefined){return mapData[mapMap[value]]
}else{if(value!==undefined){while(i--){mapPoint=mapData[i];
if(mapPoint[key]===value||(mapPoint.properties&&mapPoint.properties[key]===value)){mapMap[value]=i;
return mapPoint
}}}}},drawGraph:noop,drawDataLabels:noop,translate:function(){var series=this,xAxis=series.xAxis,yAxis=series.yAxis;
series.generatePoints();
each(series.data,function(point){point.plotX=xAxis.toPixels(point._midX,true);
point.plotY=yAxis.toPixels(point._midY,true);
if(series.isDirtyData||series.chart.renderer.isVML){point.shapeType="path";
point.shapeArgs={d:series.translatePath(point.path),"vector-effect":"non-scaling-stroke"}
}});
series.translateColors()
},drawPoints:function(){var series=this,xAxis=series.xAxis,yAxis=series.yAxis,group=series.group,chart=series.chart,renderer=chart.renderer,scaleX,scaleY,translateX,translateY,baseTrans=this.baseTrans;
if(!series.transformGroup){series.transformGroup=renderer.g().attr({scaleX:1,scaleY:1}).add(group)
}if(series.isDirtyData||renderer.isVML||!baseTrans){each(series.points,function(point){if(chart.hasRendered&&point.graphic){point.graphic.attr("fill",point.color)
}});
series.group=series.transformGroup;
seriesTypes.column.prototype.drawPoints.apply(series);
series.group=group;
this.baseTrans={originX:xAxis.min-xAxis.minPixelPadding/xAxis.transA,originY:yAxis.min-yAxis.minPixelPadding/yAxis.transA+(yAxis.reversed?0:yAxis.len/yAxis.transA),transAX:xAxis.transA,transAY:yAxis.transA}
}else{scaleX=xAxis.transA/baseTrans.transAX;
scaleY=yAxis.transA/baseTrans.transAY;
if(scaleX>0.99&&scaleX<1.01&&scaleY>0.99&&scaleY<1.01){translateX=0;
translateY=0;
scaleX=1;
scaleY=1
}else{translateX=xAxis.toPixels(baseTrans.originX,true);
translateY=yAxis.toPixels(baseTrans.originY,true)
}this.transformGroup.animate({translateX:translateX,translateY:translateY,scaleX:scaleX,scaleY:scaleY})
}Series.prototype.drawDataLabels.call(series);
if(series.dataLabelsGroup){series.dataLabelsGroup.clip(chart.clipRect)
}},render:function(){var series=this,render=Series.prototype.render;
if(series.chart.renderer.isVML&&series.data.length>3000){setTimeout(function(){render.call(series)
})
}else{render.call(series)
}},animate:function(init){var chart=this.chart,animation=this.options.animation,group=this.group,xAxis=this.xAxis,yAxis=this.yAxis,left=xAxis.pos,top=yAxis.pos;
if(chart.renderer.isSVG){if(animation===true){animation={duration:1000}
}if(init){group.attr({translateX:left+xAxis.len/2,translateY:top+yAxis.len/2,scaleX:0.001,scaleY:0.001})
}else{group.animate({translateX:left,translateY:top,scaleX:1,scaleY:1},animation);
this.animate=null
}}},animateDrilldown:function(init){var toBox=this.chart.plotBox,level=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],fromBox=level.bBox,animationOptions=this.chart.options.drilldown.animation,scale;
if(!init){scale=Math.min(fromBox.width/toBox.width,fromBox.height/toBox.height);
level.shapeArgs={scaleX:scale,scaleY:scale,translateX:fromBox.x,translateY:fromBox.y};
each(this.points,function(point){point.graphic.attr(level.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},animationOptions)
});
this.animate=null
}},drawLegendSymbol:LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(level){seriesTypes.column.prototype.animateDrillupFrom.call(this,level)
},animateDrillupTo:function(init){seriesTypes.column.prototype.animateDrillupTo.call(this,init)
}}));
extend(Chart.prototype,{renderMapNavigation:function(){var chart=this,options=this.options.mapNavigation,buttons=options.buttons,n,button,buttonOptions,attr,states,outerHandler=function(){this.handler.call(chart)
};
if(pick(options.enableButtons,options.enabled)&&!chart.renderer.forExport){for(n in buttons){if(buttons.hasOwnProperty(n)){buttonOptions=merge(options.buttonOptions,buttons[n]);
attr=buttonOptions.theme;
states=attr.states;
button=chart.renderer.button(buttonOptions.text,0,0,outerHandler,attr,states&&states.hover,states&&states.select,0,n==="zoomIn"?"topbutton":"bottombutton").attr({width:buttonOptions.width,height:buttonOptions.height,title:chart.options.lang[n],zIndex:5}).css(buttonOptions.style).add();
button.handler=strToFunction(buttonOptions.onclick);
button.align(extend(buttonOptions,{width:button.width,height:2*button.height}),null,buttonOptions.alignTo)
}}}},fitToBox:function(inner,outer){each([["x","width"],["y","height"]],function(dim){var pos=dim[0],size=dim[1];
if(inner[pos]+inner[size]>outer[pos]+outer[size]){if(inner[size]>outer[size]){inner[size]=outer[size];
inner[pos]=outer[pos]
}else{inner[pos]=outer[pos]+outer[size]-inner[size]
}}if(inner[size]>outer[size]){inner[size]=outer[size]
}if(inner[pos]<outer[pos]){inner[pos]=outer[pos]
}});
return inner
},mapZoom:function(howMuch,centerXArg,centerYArg,mouseX,mouseY){var chart=this,xAxis=chart.xAxis[0],xRange=xAxis.max-xAxis.min,centerX=pick(centerXArg,xAxis.min+xRange/2),newXRange=xRange*howMuch,yAxis=chart.yAxis[0],yRange=yAxis.max-yAxis.min,centerY=pick(centerYArg,yAxis.min+yRange/2),newYRange=yRange*howMuch,fixToX=mouseX?((mouseX-xAxis.pos)/xAxis.len):0.5,fixToY=mouseY?((mouseY-yAxis.pos)/yAxis.len):0.5,newXMin=centerX-newXRange*fixToX,newYMin=centerY-newYRange*fixToY,newExt=chart.fitToBox({x:newXMin,y:newYMin,width:newXRange,height:newYRange},{x:xAxis.dataMin,y:yAxis.dataMin,width:xAxis.dataMax-xAxis.dataMin,height:yAxis.dataMax-yAxis.dataMin});
if(mouseX){xAxis.fixTo=[mouseX-xAxis.pos,centerXArg]
}if(mouseY){yAxis.fixTo=[mouseY-yAxis.pos,centerYArg]
}if(howMuch!==undefined){xAxis.setExtremes(newExt.x,newExt.x+newExt.width,false);
yAxis.setExtremes(newExt.y,newExt.y+newExt.height,false)
}else{xAxis.setExtremes(undefined,undefined,false);
yAxis.setExtremes(undefined,undefined,false)
}chart.redraw()
}});
wrap(Chart.prototype,"render",function(proceed){var chart=this,mapNavigation=chart.options.mapNavigation;
chart.renderMapNavigation();
proceed.call(chart);
if(pick(mapNavigation.enableDoubleClickZoom,mapNavigation.enabled)||mapNavigation.enableDoubleClickZoomTo){addEvent(chart.container,"dblclick",function(e){chart.pointer.onContainerDblClick(e)
})
}if(pick(mapNavigation.enableMouseWheelZoom,mapNavigation.enabled)){addEvent(chart.container,document.onmousewheel===undefined?"DOMMouseScroll":"mousewheel",function(e){chart.pointer.onContainerMouseWheel(e);
return false
})
}});
extend(Pointer.prototype,{onContainerDblClick:function(e){var chart=this.chart;
e=this.normalize(e);
if(chart.options.mapNavigation.enableDoubleClickZoomTo){if(chart.pointer.inClass(e.target,"highcharts-tracker")){chart.hoverPoint.zoomTo()
}else{if(chart.hoverPoint&&chart.hoverPoint!==null){chart.hoverPoint.zoomTo()
}}}else{if(chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)){chart.mapZoom(0.5,chart.xAxis[0].toValue(e.chartX),chart.yAxis[0].toValue(e.chartY),e.chartX,e.chartY)
}}},onContainerMouseWheel:function(e){var chart=this.chart,delta;
e=this.normalize(e);
delta=e.detail||-(e.wheelDelta/120);
if(chart.isInsidePlot(e.chartX-chart.plotLeft,e.chartY-chart.plotTop)){chart.mapZoom(Math.pow(2,delta),chart.xAxis[0].toValue(e.chartX),chart.yAxis[0].toValue(e.chartY),e.chartX,e.chartY)
}}});
wrap(Pointer.prototype,"init",function(proceed,chart,options){proceed.call(this,chart,options);
if(pick(options.mapNavigation.enableTouchZoom,options.mapNavigation.enabled)){this.pinchX=this.pinchHor=this.pinchY=this.pinchVert=true
}});
wrap(Pointer.prototype,"pinchTranslate",function(proceed,zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch){var xBigger;
proceed.call(this,zoomHor,zoomVert,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch);
if(this.chart.options.chart.type==="map"){xBigger=transform.scaleX>transform.scaleY;
this.pinchTranslateDirection(!xBigger,pinchDown,touches,transform,selectionMarker,clip,lastValidTouch,xBigger?transform.scaleX:transform.scaleY)
}});
defaultPlotOptions.mapline=merge(defaultPlotOptions.map,{lineWidth:1,fillColor:"none"});
seriesTypes.mapline=extendClass(seriesTypes.map,{type:"mapline",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth",fill:"fillColor"},drawLegendSymbol:seriesTypes.line.prototype.drawLegendSymbol});
defaultPlotOptions.mappoint=merge(defaultPlotOptions.scatter,{dataLabels:{enabled:true,format:"{point.name}",color:"black",crop:false,overflow:false,style:{textShadow:"0 0 5px white"}}});
seriesTypes.mappoint=extendClass(seriesTypes.scatter,{type:"mappoint",forceDL:true});
defaultPlotOptions.bubble=merge(defaultPlotOptions.scatter,{dataLabels:{inside:true,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0});
seriesTypes.bubble=extendClass(seriesTypes.scatter,{type:"bubble",pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:true,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(fill){var markerOptions=this.options.marker,fillOpacity=pick(markerOptions.fillOpacity,0.5);
fill=fill||markerOptions.fillColor||this.color;
if(fillOpacity!==1){fill=Color(fill).setOpacity(fillOpacity).get("rgba")
}return fill
},convertAttribs:function(){var obj=Series.prototype.convertAttribs.apply(this,arguments);
obj.fill=this.applyOpacity(obj.fill);
return obj
},getRadii:function(zMin,zMax,minSize,maxSize){var len,i,pos,zData=this.zData,radii=[],sizeByArea=this.options.sizeBy!=="width",zRange;
for(i=0,len=zData.length;
i<len;
i++){zRange=zMax-zMin;
pos=zRange>0?(zData[i]-zMin)/(zMax-zMin):0.5;
if(sizeByArea&&pos>=0){pos=Math.sqrt(pos)
}radii.push(math.ceil(minSize+pos*(maxSize-minSize))/2)
}this.radii=radii
},animate:function(init){var animation=this.options.animation;
if(!init){each(this.points,function(point){var graphic=point.graphic,shapeArgs=point.shapeArgs;
if(graphic&&shapeArgs){graphic.attr("r",1);
graphic.animate({r:shapeArgs.r},animation)
}});
this.animate=null
}},translate:function(){var i,data=this.data,point,radius,radii=this.radii;
seriesTypes.scatter.prototype.translate.call(this);
i=data.length;
while(i--){point=data[i];
radius=radii?radii[i]:0;
point.negative=point.z<(this.options.zThreshold||0);
if(radius>=this.minPxSize/2){point.shapeType="circle";
point.shapeArgs={x:point.plotX,y:point.plotY,r:radius};
point.dlBox={x:point.plotX-radius,y:point.plotY-radius,width:2*radius,height:2*radius}
}else{point.shapeArgs=point.plotY=point.dlBox=UNDEFINED
}}},drawLegendSymbol:function(legend,item){var radius=pInt(legend.itemStyle.fontSize)/2;
item.legendSymbol=this.chart.renderer.circle(radius,legend.baseline-radius,radius).attr({zIndex:3}).add(item.legendGroup);
item.legendSymbol.isMarker=true
},drawPoints:seriesTypes.column.prototype.drawPoints,alignDataLabel:seriesTypes.column.prototype.alignDataLabel});
Axis.prototype.beforePadding=function(){var axis=this,axisLength=this.len,chart=this.chart,pxMin=0,pxMax=axisLength,isXAxis=this.isXAxis,dataKey=isXAxis?"xData":"yData",min=this.min,extremes={},smallestSize=math.min(chart.plotWidth,chart.plotHeight),zMin=Number.MAX_VALUE,zMax=-Number.MAX_VALUE,range=this.max-min,transA=axisLength/range,activeSeries=[];
if(this.tickPositions){each(this.series,function(series){var seriesOptions=series.options,zData;
if(series.bubblePadding&&series.visible){axis.allowZoomOutside=true;
activeSeries.push(series);
if(isXAxis){each(["minSize","maxSize"],function(prop){var length=seriesOptions[prop],isPercent=/%$/.test(length);
length=pInt(length);
extremes[prop]=isPercent?smallestSize*length/100:length
});
series.minPxSize=extremes.minSize;
zData=series.zData;
if(zData.length){zMin=math.min(zMin,math.max(arrayMin(zData),seriesOptions.displayNegative===false?seriesOptions.zThreshold:-Number.MAX_VALUE));
zMax=math.max(zMax,arrayMax(zData))
}}}});
each(activeSeries,function(series){var data=series[dataKey],i=data.length,radius;
if(isXAxis){series.getRadii(zMin,zMax,extremes.minSize,extremes.maxSize)
}if(range>0){while(i--){if(typeof data[i]==="number"){radius=series.radii[i];
pxMin=Math.min(((data[i]-min)*transA)-radius,pxMin);
pxMax=Math.max(((data[i]-min)*transA)+radius,pxMax)
}}}});
if(activeSeries.length&&range>0&&pick(this.options.min,this.userMin)===UNDEFINED&&pick(this.options.max,this.userMax)===UNDEFINED){pxMax-=axisLength;
transA*=(axisLength+pxMin-pxMax)/axisLength;
this.min+=pxMin/transA;
this.max+=pxMax/transA
}}};
if(seriesTypes.bubble){defaultPlotOptions.mapbubble=merge(defaultPlotOptions.bubble,{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}});
seriesTypes.mapbubble=extendClass(seriesTypes.bubble,{pointClass:extendClass(Point,{applyOptions:MapAreaPoint.prototype.applyOptions}),xyFromShape:true,type:"mapbubble",pointArrayMap:["z"],getMapData:seriesTypes.map.prototype.getMapData,getBox:seriesTypes.map.prototype.getBox,setData:seriesTypes.map.prototype.setData})
}Highmaps.geojson=function(geojson,hType){var mapData=[],path=[],polygonToPath=function(polygon){var i=0,len=polygon.length;
path.push("M");
for(;
i<len;
i++){if(i===1){path.push("L")
}path.push(polygon[i][0],-polygon[i][1])
}};
each(geojson.features,function(feature){var geometry=feature.geometry,type=geometry.type,coordinates=geometry.coordinates,properties=feature.properties,point;
path=[];
if(hType==="map"){if(type==="Polygon"){each(coordinates,polygonToPath);
path.push("Z")
}else{if(type==="MultiPolygon"){each(coordinates,function(items){each(items,polygonToPath)
});
path.push("Z")
}}if(path.length){point={path:path}
}}else{if(hType==="mapline"){if(type==="LineString"){polygonToPath(coordinates)
}else{if(type==="MultiLineString"){each(coordinates,polygonToPath)
}}if(path.length){point={path:path}
}}else{if(hType==="mappoint"){if(type==="Point"){point={x:coordinates[0],y:-coordinates[1]}
}}}}if(point){mapData.push(extend(point,{name:properties.name||properties.NAME,properties:properties}))
}});
return mapData
};
extend(defaultOptions.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});
defaultOptions.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,style:{fontSize:"15px",fontWeight:"bold",textAlign:"center"},theme:{"stroke-width":1}},buttons:{zoomIn:{onclick:function(){this.mapZoom(0.5)
},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)
},text:"-",y:28}}};
Highmaps.splitPath=function(path){var i;
path=path.replace(/([A-Za-z])/g," $1 ");
path=path.replace(/^\s*/,"").replace(/\s*$/,"");
path=path.split(/[ ,]+/);
for(i=0;
i<path.length;
i++){if(!/[a-zA-Z]/.test(path[i])){path[i]=parseFloat(path[i])
}}return path
};
Highmaps.maps={};
function selectiveRoundedRect(attr,x,y,w,h,rTopLeft,rTopRight,rBottomRight,rBottomLeft){var normalize=(attr["stroke-width"]%2/2);
x-=normalize;
y-=normalize;
return["M",x+rTopLeft,y,"L",x+w-rTopRight,y,"C",x+w-rTopRight/2,y,x+w,y+rTopRight/2,x+w,y+rTopRight,"L",x+w,y+h-rBottomRight,"C",x+w,y+h-rBottomRight/2,x+w-rBottomRight/2,y+h,x+w-rBottomRight,y+h,"L",x+rBottomLeft,y+h,"C",x+rBottomLeft/2,y+h,x,y+h-rBottomLeft/2,x,y+h-rBottomLeft,"L",x,y+rTopLeft,"C",x,y+rTopLeft/2,x+rTopLeft/2,y,x+rTopLeft,y,"Z"]
}SVGRenderer.prototype.symbols.topbutton=function(x,y,w,h,attr){return selectiveRoundedRect(attr,x,y,w,h,attr.r,attr.r,0,0)
};
SVGRenderer.prototype.symbols.bottombutton=function(x,y,w,h,attr){return selectiveRoundedRect(attr,x,y,w,h,0,0,attr.r,attr.r)
};
if(Renderer===VMLRenderer){each(["topbutton","bottombutton"],function(shape){VMLRenderer.prototype.symbols[shape]=SVGRenderer.prototype.symbols[shape]
})
}Highmaps.Map=function(options,callback){var hiddenAxis={endOnTick:false,gridLineWidth:0,lineWidth:0,minPadding:0,maxPadding:0,startOnTick:false,title:null,tickPositions:[]},seriesOptions;
seriesOptions=options.series;
options.series=null;
options=merge({chart:{panning:"xy",type:"map"},xAxis:hiddenAxis,yAxis:merge(hiddenAxis,{reversed:true})},options,{chart:{inverted:false,alignTicks:false,preserveAspectRatio:true}});
options.series=seriesOptions;
return new Chart(options,callback)
};
seriesTypes.heatmap=extendClass(seriesTypes.scatter,merge(colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:true,supportsDrilldown:true,getExtremesFromAll:true,init:function(){seriesTypes.scatter.prototype.init.apply(this,arguments);
this.pointRange=this.options.colsize||1
},translate:function(){var series=this,options=series.options,xAxis=series.xAxis,yAxis=series.yAxis;
series.generatePoints();
each(series.points,function(point){var xPad=(options.colsize||1)/2,yPad=(options.rowsize||1)/2,x1=Math.round(xAxis.len-xAxis.translate(point.x-xPad,0,1,0,1)),x2=Math.round(xAxis.len-xAxis.translate(point.x+xPad,0,1,0,1)),y1=Math.round(yAxis.translate(point.y-yPad,0,1,0,1)),y2=Math.round(yAxis.translate(point.y+yPad,0,1,0,1));
point.plotY=1;
point.shapeType="rect";
point.shapeArgs={x:Math.min(x1,x2),y:Math.min(y1,y2),width:Math.abs(x2-x1),height:Math.abs(y2-y1)}
});
series.pointRange=options.colsize||1;
series.translateColors()
},drawPoints:seriesTypes.column.prototype.drawPoints,animate:noop,getBox:noop,drawLegendSymbol:LegendSymbolMixin.drawRectangle,getExtremes:function(){Series.prototype.getExtremes.call(this,this.valueData);
this.valueMin=this.dataMin;
this.valueMax=this.dataMax;
Series.prototype.getExtremes.call(this)
}}));
var TrackerMixin=Highmaps.TrackerMixin={drawTrackerPoint:function(){var series=this,chart=series.chart,pointer=chart.pointer,cursor=series.options.cursor,css=cursor&&{cursor:cursor},onMouseOver=function(e){var target=e.target,point;
if(chart.hoverSeries!==series){series.onMouseOver()
}while(target&&!point){point=target.point;
target=target.parentNode
}if(point!==UNDEFINED&&point!==chart.hoverPoint){point.onMouseOver(e)
}};
each(series.points,function(point){if(point.graphic){point.graphic.element.point=point
}if(point.dataLabel){point.dataLabel.element.point=point
}});
if(!series._hasTracking){each(series.trackerGroups,function(key){if(series[key]){series[key].addClass(PREFIX+"tracker").on("mouseover",onMouseOver).on("mouseout",function(e){pointer.onTrackerMouseOut(e)
}).css(css);
if(hasTouch){series[key].on("touchstart",onMouseOver)
}}});
series._hasTracking=true
}},drawTrackerGraph:function(){var series=this,options=series.options,trackByArea=options.trackByArea,trackerPath=[].concat(trackByArea?series.areaPath:series.graphPath),trackerPathLength=trackerPath.length,chart=series.chart,pointer=chart.pointer,renderer=chart.renderer,snap=chart.options.tooltip.snap,tracker=series.tracker,cursor=options.cursor,css=cursor&&{cursor:cursor},singlePoints=series.singlePoints,singlePoint,i,onMouseOver=function(){if(chart.hoverSeries!==series){series.onMouseOver()
}},TRACKER_FILL="rgba(192,192,192,"+(hasSVG?0.0001:0.002)+")";
if(trackerPathLength&&!trackByArea){i=trackerPathLength+1;
while(i--){if(trackerPath[i]===M){trackerPath.splice(i+1,0,trackerPath[i+1]-snap,trackerPath[i+2],L)
}if((i&&trackerPath[i]===M)||i===trackerPathLength){trackerPath.splice(i,0,L,trackerPath[i-2]+snap,trackerPath[i-1])
}}}for(i=0;
i<singlePoints.length;
i++){singlePoint=singlePoints[i];
trackerPath.push(M,singlePoint.plotX-snap,singlePoint.plotY,L,singlePoint.plotX+snap,singlePoint.plotY)
}if(tracker){tracker.attr({d:trackerPath})
}else{series.tracker=renderer.path(trackerPath).attr({"stroke-linejoin":"round",visibility:series.visible?VISIBLE:HIDDEN,stroke:TRACKER_FILL,fill:trackByArea?TRACKER_FILL:NONE,"stroke-width":options.lineWidth+(trackByArea?0:2*snap),zIndex:2}).add(series.group);
each([series.tracker,series.markerGroup],function(tracker){tracker.addClass(PREFIX+"tracker").on("mouseover",onMouseOver).on("mouseout",function(e){pointer.onTrackerMouseOut(e)
}).css(css);
if(hasTouch){tracker.on("touchstart",onMouseOver)
}})
}}};
if(seriesTypes.column){ColumnSeries.prototype.drawTracker=TrackerMixin.drawTrackerPoint
}if(seriesTypes.pie){seriesTypes.pie.prototype.drawTracker=TrackerMixin.drawTrackerPoint
}if(seriesTypes.scatter){ScatterSeries.prototype.drawTracker=TrackerMixin.drawTrackerPoint
}extend(Legend.prototype,{setItemEvents:function(item,legendItem,useHTML,itemStyle,itemHiddenStyle){var legend=this;
(useHTML?legendItem:item.legendGroup).on("mouseover",function(){item.setState(HOVER_STATE);
legendItem.css(legend.options.itemHoverStyle)
}).on("mouseout",function(){legendItem.css(item.visible?itemStyle:itemHiddenStyle);
item.setState()
}).on("click",function(event){var strLegendItemClick="legendItemClick",fnLegendItemClick=function(){item.setVisible()
};
event={browserEvent:event};
if(item.firePointEvent){item.firePointEvent(strLegendItemClick,event,fnLegendItemClick)
}else{fireEvent(item,strLegendItemClick,event,fnLegendItemClick)
}})
},createCheckboxForItem:function(item){var legend=this;
item.checkbox=createElement("input",{type:"checkbox",checked:item.selected,defaultChecked:item.selected},legend.options.itemCheckboxStyle,legend.chart.container);
addEvent(item.checkbox,"click",function(event){var target=event.target;
fireEvent(item,"checkboxClick",{checked:target.checked},function(){item.select()
})
})
}});
defaultOptions.legend.itemStyle.cursor="pointer";
extend(Chart.prototype,{showResetZoom:function(){var chart=this,lang=defaultOptions.lang,btnOptions=chart.options.chart.resetZoomButton,theme=btnOptions.theme,states=theme.states,alignTo=btnOptions.relativeTo==="chart"?null:"plotBox";
this.resetZoomButton=chart.renderer.button(lang.resetZoom,null,null,function(){chart.zoomOut()
},theme,states&&states.hover).attr({align:btnOptions.position.align,title:lang.resetZoomTitle}).add().align(btnOptions.position,false,alignTo)
},zoomOut:function(){var chart=this;
fireEvent(chart,"selection",{resetSelection:true},function(){chart.zoom()
})
},zoom:function(event){var chart=this,hasZoomed,pointer=chart.pointer,displayButton=false,resetZoomButton;
if(!event||event.resetSelection){each(chart.axes,function(axis){hasZoomed=axis.zoom()
})
}else{each(event.xAxis.concat(event.yAxis),function(axisData){var axis=axisData.axis,isXAxis=axis.isXAxis;
if(pointer[isXAxis?"zoomX":"zoomY"]||pointer[isXAxis?"pinchX":"pinchY"]){hasZoomed=axis.zoom(axisData.min,axisData.max);
if(axis.displayBtn){displayButton=true
}}})
}resetZoomButton=chart.resetZoomButton;
if(displayButton&&!resetZoomButton){chart.showResetZoom()
}else{if(!displayButton&&isObject(resetZoomButton)){chart.resetZoomButton=resetZoomButton.destroy()
}}if(hasZoomed){chart.redraw(pick(chart.options.chart.animation,event&&event.animation,chart.pointCount<100))
}},pan:function(e,panning){var chart=this,hoverPoints=chart.hoverPoints,doRedraw;
if(hoverPoints){each(hoverPoints,function(point){point.setState()
})
}each(panning==="xy"?[1,0]:[1],function(isX){var mousePos=e[isX?"chartX":"chartY"],axis=chart[isX?"xAxis":"yAxis"][0],startPos=chart[isX?"mouseDownX":"mouseDownY"],halfPointRange=(axis.pointRange||0)/2,extremes=axis.getExtremes(),newMin=axis.toValue(startPos-mousePos,true)+halfPointRange,newMax=axis.toValue(startPos+chart[isX?"plotWidth":"plotHeight"]-mousePos,true)-halfPointRange;
if(axis.series.length&&newMin>mathMin(extremes.dataMin,extremes.min)&&newMax<mathMax(extremes.dataMax,extremes.max)){axis.setExtremes(newMin,newMax,false,false,{trigger:"pan"});
doRedraw=true
}chart[isX?"mouseDownX":"mouseDownY"]=mousePos
});
if(doRedraw){chart.redraw(false)
}css(chart.container,{cursor:"move"})
}});
extend(Point.prototype,{select:function(selected,accumulate){var point=this,series=point.series,chart=series.chart;
selected=pick(selected,!point.selected);
point.firePointEvent(selected?"select":"unselect",{accumulate:accumulate},function(){point.selected=point.options.selected=selected;
series.options.data[inArray(point,series.data)]=point.options;
point.setState(selected&&SELECT_STATE);
if(!accumulate){each(chart.getSelectedPoints(),function(loopPoint){if(loopPoint.selected&&loopPoint!==point){loopPoint.selected=loopPoint.options.selected=false;
series.options.data[inArray(loopPoint,series.data)]=loopPoint.options;
loopPoint.setState(NORMAL_STATE);
loopPoint.firePointEvent("unselect")
}})
}})
},onMouseOver:function(e){var point=this,series=point.series,chart=series.chart,tooltip=chart.tooltip,hoverPoint=chart.hoverPoint;
if(hoverPoint&&hoverPoint!==point){hoverPoint.onMouseOut()
}point.firePointEvent("mouseOver");
if(tooltip&&(!tooltip.shared||series.noSharedTooltip)){tooltip.refresh(point,e)
}point.setState(HOVER_STATE);
chart.hoverPoint=point
},onMouseOut:function(){var chart=this.series.chart,hoverPoints=chart.hoverPoints;
if(!hoverPoints||inArray(this,hoverPoints)===-1){this.firePointEvent("mouseOut");
this.setState();
chart.hoverPoint=null
}},firePointEvent:function(eventType,eventArgs,defaultFunction){var point=this,series=this.series,seriesOptions=series.options;
if(seriesOptions.point.events[eventType]||(point.options&&point.options.events&&point.options.events[eventType])){this.importEvents()
}if(eventType==="click"&&seriesOptions.allowPointSelect){defaultFunction=function(event){point.select(null,event.ctrlKey||event.metaKey||event.shiftKey)
}
}fireEvent(this,eventType,eventArgs,defaultFunction)
},importEvents:function(){if(!this.hasImportedEvents){var point=this,options=merge(point.series.options.point,point.options),events=options.events,eventType;
point.events=events;
for(eventType in events){addEvent(point,eventType,events[eventType])
}this.hasImportedEvents=true
}},setState:function(state,move){var point=this,plotX=point.plotX,plotY=point.plotY,series=point.series,stateOptions=series.options.states,markerOptions=defaultPlotOptions[series.type].marker&&series.options.marker,normalDisabled=markerOptions&&!markerOptions.enabled,markerStateOptions=markerOptions&&markerOptions.states[state],stateDisabled=markerStateOptions&&markerStateOptions.enabled===false,stateMarkerGraphic=series.stateMarkerGraphic,pointMarker=point.marker||{},chart=series.chart,radius,newSymbol,pointAttr=point.pointAttr;
state=state||NORMAL_STATE;
move=move&&stateMarkerGraphic;
if((state===point.state&&!move)||(point.selected&&state!==SELECT_STATE)||(stateOptions[state]&&stateOptions[state].enabled===false)||(state&&(stateDisabled||(normalDisabled&&!markerStateOptions.enabled)))||(state&&pointMarker.states&&pointMarker.states[state]&&pointMarker.states[state].enabled===false)){return
}if(point.graphic){radius=markerOptions&&point.graphic.symbolName&&pointAttr[state].r;
point.graphic.attr(merge(pointAttr[state],radius?{x:plotX-radius,y:plotY-radius,width:2*radius,height:2*radius}:{}))
}else{if(state&&markerStateOptions){radius=markerStateOptions.radius;
newSymbol=pointMarker.symbol||series.symbol;
if(stateMarkerGraphic&&stateMarkerGraphic.currentSymbol!==newSymbol){stateMarkerGraphic=stateMarkerGraphic.destroy()
}if(!stateMarkerGraphic){series.stateMarkerGraphic=stateMarkerGraphic=chart.renderer.symbol(newSymbol,plotX-radius,plotY-radius,2*radius,2*radius).attr(pointAttr[state]).add(series.markerGroup);
stateMarkerGraphic.currentSymbol=newSymbol
}else{stateMarkerGraphic[move?"animate":"attr"]({x:plotX-radius,y:plotY-radius})
}}if(stateMarkerGraphic){stateMarkerGraphic[state&&chart.isInsidePlot(plotX,plotY,chart.inverted)?"show":"hide"]()
}}point.state=state
}});
extend(Series.prototype,{onMouseOver:function(){var series=this,chart=series.chart,hoverSeries=chart.hoverSeries;
if(hoverSeries&&hoverSeries!==series){hoverSeries.onMouseOut()
}if(series.options.events.mouseOver){fireEvent(series,"mouseOver")
}series.setState(HOVER_STATE);
chart.hoverSeries=series
},onMouseOut:function(){var series=this,options=series.options,chart=series.chart,tooltip=chart.tooltip,hoverPoint=chart.hoverPoint;
if(hoverPoint){hoverPoint.onMouseOut()
}if(series&&options.events.mouseOut){fireEvent(series,"mouseOut")
}if(tooltip&&!options.stickyTracking&&(!tooltip.shared||series.noSharedTooltip)){tooltip.hide()
}series.setState();
chart.hoverSeries=null
},setState:function(state){var series=this,options=series.options,graph=series.graph,graphNeg=series.graphNeg,stateOptions=options.states,lineWidth=options.lineWidth,attribs;
state=state||NORMAL_STATE;
if(series.state!==state){series.state=state;
if(stateOptions[state]&&stateOptions[state].enabled===false){return
}if(state){lineWidth=stateOptions[state].lineWidth||lineWidth+1
}if(graph&&!graph.dashstyle){attribs={"stroke-width":lineWidth};
graph.attr(attribs);
if(graphNeg){graphNeg.attr(attribs)
}}}},setVisible:function(vis,redraw){var series=this,chart=series.chart,legendItem=series.legendItem,showOrHide,ignoreHiddenSeries=chart.options.chart.ignoreHiddenSeries,oldVisibility=series.visible;
series.visible=vis=series.userOptions.visible=vis===UNDEFINED?!oldVisibility:vis;
showOrHide=vis?"show":"hide";
each(["group","dataLabelsGroup","markerGroup","tracker"],function(key){if(series[key]){series[key][showOrHide]()
}});
if(chart.hoverSeries===series){series.onMouseOut()
}if(legendItem){chart.legend.colorizeItem(series,vis)
}series.isDirty=true;
if(series.options.stacking){each(chart.series,function(otherSeries){if(otherSeries.options.stacking&&otherSeries.visible){otherSeries.isDirty=true
}})
}each(series.linkedSeries,function(otherSeries){otherSeries.setVisible(vis,false)
});
if(ignoreHiddenSeries){chart.isDirtyBox=true
}if(redraw!==false){chart.redraw()
}fireEvent(series,showOrHide)
},setTooltipPoints:function(renew){var series=this,points=[],pointsLength,low,high,xAxis=series.xAxis,xExtremes=xAxis&&xAxis.getExtremes(),axisLength=xAxis?(xAxis.tooltipLen||xAxis.len):series.chart.plotSizeX,point,pointX,nextPoint,i,tooltipPoints=[];
if(series.options.enableMouseTracking===false||series.singularTooltips){return
}if(renew){series.tooltipPoints=null
}each(series.segments||series.points,function(segment){points=points.concat(segment)
});
if(xAxis&&xAxis.reversed){points=points.reverse()
}if(series.orderTooltipPoints){series.orderTooltipPoints(points)
}pointsLength=points.length;
for(i=0;
i<pointsLength;
i++){point=points[i];
pointX=point.x;
if(pointX>=xExtremes.min&&pointX<=xExtremes.max){nextPoint=points[i+1];
low=high===UNDEFINED?0:high+1;
high=points[i+1]?mathMin(mathMax(0,mathFloor((point.clientX+(nextPoint?(nextPoint.wrappedClientX||nextPoint.clientX):axisLength))/2)),axisLength):axisLength;
while(low>=0&&low<=high){tooltipPoints[low++]=point
}}}series.tooltipPoints=tooltipPoints
},show:function(){this.setVisible(true)
},hide:function(){this.setVisible(false)
},select:function(selected){var series=this;
series.selected=selected=(selected===UNDEFINED)?!series.selected:selected;
if(series.checkbox){series.checkbox.checked=selected
}fireEvent(series,selected?"select":"unselect")
},drawTracker:TrackerMixin.drawTrackerGraph});
extend(Highmaps,{Axis:Axis,Chart:Chart,Color:Color,Point:Point,Tick:Tick,Renderer:Renderer,Series:Series,SVGElement:SVGElement,SVGRenderer:SVGRenderer,arrayMin:arrayMin,arrayMax:arrayMax,charts:charts,dateFormat:dateFormat,format:format,pathAnim:pathAnim,getOptions:getOptions,hasBidiBug:hasBidiBug,isTouchDevice:isTouchDevice,numberFormat:numberFormat,seriesTypes:seriesTypes,setOptions:setOptions,addEvent:addEvent,removeEvent:removeEvent,createElement:createElement,discardElement:discardElement,css:css,each:each,extend:extend,map:map,merge:merge,pick:pick,splat:splat,extendClass:extendClass,pInt:pInt,wrap:wrap,svg:hasSVG,canvas:useCanVG,vml:!hasSVG&&!useCanVG,product:PRODUCT,version:VERSION,strToFunction:strToFunction})
}());