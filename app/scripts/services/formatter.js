var FormatterService=(function(){var f={};
f.currency="0,0[.]00";
f.number="0.00";
f.numberSequence="0o";
f.bytes="0b";
f.kiloBytes="0 b";
f.gigaBytes="0.0b";
f.teraBytes="0.000 b";
f.thousand="0 a";
f.million="0.0a";
f.percentage="0.000%";
f.time="00:00:00";
function g(o,n){var m=f.currency;
if(n){m=n
}return numeral(o).format(m)
}function d(o,n){var m=f.number;
if(n){m=n
}return numeral(o).format(m)
}function k(o,n){var m=f.numberSequence;
if(n){m=n
}return numeral(o).format(m)
}function l(o,n){var m=f.bytes;
if(n){m=n
}return numeral(o).format(m)
}function i(o,n){var m=f.kiloBytes;
if(n){m=n
}return numeral(o).format(m)
}function a(o,n){var m=f.gigaBytes;
if(n){m=n
}return numeral(o).format(m)
}function e(o,n){var m=f.teraBytes;
if(n){m=n
}return numeral(o).format(m)
}function h(o,n){var m=f.thousand;
if(n){m=n
}return numeral(o).format(m)
}function b(o,n){var m=f.million;
if(n){m=n
}return numeral(o).format(m)
}function j(o,n){var m=f.percentage;
if(n){m=n
}return o+"%"
}function c(o,n){var m=f.time;
if(n){m=n
}return numeral(o).format(m)
}return{currency:g,number:d,numberSequence:k,bytes:l,kiloBytes:i,gigaBytes:a,teraBytes:e,thousand:h,million:b,percentage:j,time:c}
})();
var Formatter=(function(){function a(d,f){var e="";
while(true){if(f&1){e+=d
}f>>=1;
if(f){d+=d
}else{break
}}return e
}function b(f){var e="[.]";
var d="";
if(f.decimal===true){e="."
}var g="0,0";
if(f.decimal===true&&f.decimalPoint!==undefined&&!isNaN(parseInt(f.decimalPoint,0))&&parseInt(f.decimalPoint,0)>0){d=a("0",parseInt(f.decimalPoint,0));
g=g+e+d
}if(f.decimal===true&&f.decimalPoint!==undefined&&!isNaN(parseInt(f.decimalPoint,0))&&parseInt(f.decimalPoint,0)===0){d=a("0",parseInt(f.decimalPoint,0));
e=g+"[.]["+d+"]"
}if(f.decimal===true&&f.decimalPoint===undefined){d=a("0",10);
g=g+"[.]["+d+"]"
}if(f.decimal===false){g="0,0"
}return g
}function c(d){var g=d.formatter;
var e=false;
var f=d.value;
if(g.toLowerCase()==="number"||g.toLowerCase()==="decimal"||g.toLowerCase()==="currency"){e=b(d)
}if(FormatterService[g]!==undefined){f=FormatterService[g](d.value,e)
}return f
}return{format:c}
})();
function checkNestedObjectKey(g,c,f){var a=[];
var d=undefined;
var e=10;
if(c){a=c.split(".")
}console.log(a);
if(f&&!isNaN(parseInt(f))){if(f>e){f=e
}a=a.slice(0,f)
}if(g.hasOwnProperty("points")&&Array.isArray(g.points)&&g.points.length===1){g=g.points[0]
}for(var b=0;
b<a.length;
b++){if(!g.hasOwnProperty(a[b])){d=undefined;
break
}d=g[a[b]];
g=g[a[b]]
}return d
}function TooltipFormatter(d){var f=d.thisObj;
var b="";
console.log(d);
if(d.attributes&&d.attributes.length){for(var c=0;
c<d.attributes.length;
c++){var a=d.attributes[c];
var e="";
if(a.key){e=checkNestedObjectKey(f,a.key,4)
}if(e!==undefined&&typeof(e)!=="object"){if(a.prefix){b+="<b>"+a.prefix+"</b>"
}if(a.format){var g=a.format;
g.value=e;
e=Formatter.format(g)
}b+=e;
if(a.suffix){b+=a.suffix
}}b+=" "
}}return b
};