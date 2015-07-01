(function(){var a=[].indexOf||function(d){for(var c=0,b=this.length;
c<b;
c++){if(c in this&&this[c]===d){return c
}}return -1
};
angular.module("chosenDir",[]).directive("chosen",function(){var c,d,b,f,e;
d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;
c=["noResultsText","allowSingleDeselect","disableSearchThreshold","disableSearch","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","placeholderTextMultiple","placeholderTextSingle","searchContains","singleBackstrokeDelete","displayDisabledOptions","displaySelectedOptions","width"];
e=function(g){return g.replace(/[A-Z]/g,function(h){return"_"+(h.toLowerCase())
})
};
f=function(h){var g;
if(angular.isArray(h)){return h.length===0
}else{if(angular.isObject(h)){for(g in h){if(h.hasOwnProperty(g)){return false
}}}}return true
};
return b={restrict:"A",require:"?ngModel",terminal:true,link:function(u,l,q,h){var n,o,s,j,m,v,i,g,r,k,p,t;
l.addClass("localytics-chosen");
v=u.$eval(q.chosen)||{};
angular.forEach(q,function(x,w){if(a.call(c,w)>=0){return v[e(w)]=u.$eval(x)
}});
r=function(){return l.addClass("loading").attr("disabled",true).trigger("chosen:updated")
};
k=function(){return l.removeClass("loading").attr("disabled",false).trigger("chosen:updated")
};
j=false;
o=false;
s=function(){if(j){return l.trigger("chosen:updated")
}else{l.chosen(v);
return j=true
}};
g=function(){o=false;
return l.find("option.empty").remove()
};
n=function(w){o=true;
return l.empty().append('<option selected class="empty">'+w+"</option>").attr("disabled",true).trigger("chosen:updated")
};
if(h){i=h.$render;
h.$render=function(){i();
return s()
};
if(q.multiple){t=function(){return h.$viewValue
};
u.$watch(t,h.$render,true)
}}else{s()
}q.$observe("disabled",function(w){return l.trigger("chosen:updated")
});
if(q.ngOptions){m=q.ngOptions.match(d);
p=m[7];
if(angular.isUndefined(u.$eval(p))){r()
}return u.$watchCollection(p,function(x,w){if(x!==w){if(o){g()
}k();
if(f(x)){return n(v.no_results_text||"No values available")
}}})
}}}
})
}).call(this);