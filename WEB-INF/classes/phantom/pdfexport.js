var page=require("webpage").create(),system=require("system"),address,output,size;
page.onConsoleMessage=function(){printArgs.apply(this,["page.onConsoleMessage"]);
printArgs.apply(this,arguments)
};
function printArgs(){if(debug){var b,a;
for(b=0,a=arguments.length;
b<a;
++b){console.log("    arguments["+b+"] = "+JSON.stringify(arguments[b]))
}console.log("")
}}phantom.addCookie({name:"JSESSIONID",value:system.args[system.args.length-3],domain:system.args[system.args.length-2],httponly:true,path:system.args[system.args.length-1]});
if(system.args.length<3){console.log("Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]");
console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
console.log(' "800px*600px" window, clipped to 800x600');
phantom.exit(1)
}else{var resourceWait=300,maxRenderWait=10000,count=0,forcedRenderTimeout,renderTimeout;
address=system.args[1];
output=system.args[2];
page.viewportSize={width:900,height:768};
page.paperSize={format:"A4",width:1024,margin:{top:"1cm",right:"1cm",bottom:"0.5cm",left:"1cm"},footer:{height:"0.7cm",contents:phantom.callback(function(b,a){return'<div style="font-size:13px; text-align:center; color:#666; font-family: masterFont; height:40px">Copyright 2014 <a href="http://www.saama.com/" style="font-size:14px; text-align:center; color:#1e94de; text-decoration:none">Saama Technologies<a> - All Rights Reserved.</div>'
})}};
function doRender(){setTimeout(function(){page.render(output);
phantom.exit()
},500)
}page.onResourceRequested=function(a){count+=1;
clearTimeout(renderTimeout)
};
page.onResourceReceived=function(a){if(!a.stage||a.stage==="end"){count-=1;
if(count===0){renderTimeout=setTimeout(doRender,resourceWait)
}}};
page.open(address,function(a){if(a!=="success"){console.log("Unable to load the address!");
phantom.exit()
}else{forcedRenderTimeout=setTimeout(function(){console.log(count);
doRender()
},maxRenderWait)
}})
};