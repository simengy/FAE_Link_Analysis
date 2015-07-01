var page=require("webpage").create(),system=require("system"),address,output,size;
page.onConsoleMessage=function(a){console.log(a)
};
if(system.args.length<3||system.args.length>5){console.log("Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]");
console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
phantom.exit(1)
}else{address=system.args[1];
output=system.args[2];
page.viewportSize={width:1500,height:1300};
page.paperSize={format:"A4",width:1500,margin:"0.5cm",};
if(system.args.length>4){page.zoomFactor=system.args[4]
}page.open(address,function(a){if(a!=="success"){console.log("Unable to load the address!");
phantom.exit()
}else{window.setTimeout(function(){page.evaluate(function(){var f=document.getElementsByTagName("path");
for(var d=f.length-1;
d>=0;
d--){var e=f[d];
var c=e.getAttribute("stroke-opacity");
if(c!=null&&c<0.2){e.parentNode.removeChild(e)
}}});
page.render(output);
try{}catch(b){console.log(b)
}phantom.exit()
},1500)
}})
};