define(["angular"],function(a){a.module("vividSENSE.filters",["vividSENSE.services"]).filter("join",function(){return function(b){if(b){if(typeof(b)==="object"){b=b.text
}b=b.replace(/[ ]/g,"_").replace(/[()]/g,"").toLowerCase();
return b
}}
}).filter("newLine",function(){return function(b){if(b){return b.split(/\n/g)
}}
}).filter("string",function(){return function(b,d,c){if(b){if(typeof b==="number"){return b.toFixed(c)+d
}else{return b
}}}
}).filter("lowerFirstLetter",function(){return function(b){if(b){b=b.charAt(0).toLowerCase()+b.slice(1);
return b.replace(" ","")
}}
}).filter("capFirstLetter",function(){return function(b){if(b){b=b.charAt(0).toUpperCase()+b.slice(1);
return b
}}
}).filter("specialcharacter",function(){return function(b){if(b){b=b.replace("and","&");
return b
}}
}).filter("colorValue",function(){return function(){var b=null;
return b
}
}).filter("sortReview",function(){return function(c){var b;
b=[];
for(var d in c){if(c.hasOwnProperty(d)){b.push(c[d]);
b.sort(b)
}}return b
}
}).filter("startFrom",function(){return function(b,f){f=+f;
var d=0,e={};
for(var c in b){if(d!==f){d++
}else{e[c]=b[c]
}}return e
}
}).filter("limitTo",function(){return function(c,b){b=+b;
var e=0,f={};
for(var d in c){if(e<b){f[d]=c[d];
e++
}}return f
}
}).filter("hexToRgba",function(){return function(g,d){if(g[0]==="#"){g=g.substr(1)
}if(g.length==3){var b=g;
g="";
b=/^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(b).slice(1);
for(var f=0;
f<3;
f++){g+=b[f]+b[f]
}}var e=/^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(g).slice(1);
var c={red:parseInt(e[0],16),green:parseInt(e[1],16),blue:parseInt(e[2],16)};
if(d){return"rgba("+c.red+","+c.green+","+c.blue+","+d+")"
}else{return"rgba("+c.red+","+c.green+","+c.blue+", 1)"
}}
}).filter("utcdate",["$filter",function(c){var b=c("date");
return function(g,e){if(!g){return
}g=g+new Date(g).getTimezoneOffset()*60*1000;
if(!e){e="MMM-dd-yyyy"
}return b(g,e)
}
}]).filter("range",function(){return function(b,d){d=parseInt(d,10);
for(var c=0;
c<d;
c++){b.push(c)
}return b
}
}).filter("keys",function(){return function(b){if(!b){return[]
}return Object.keys(b)
}
})
});