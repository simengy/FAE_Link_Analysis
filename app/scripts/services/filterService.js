define(["app"],function(a){angular.module("vividSENSE.filterService",[]).service("FilterService",["$timeout","$window","$rootScope","Extensions",function(d,b,j,c){var n=this;
function i(q,r){var o={};
j.$broadcast("$filter",q,function(w,x,v){v.safeApply=function(z){var y=this.$root.$$phase;
if(y=="$apply"||y=="$digest"){if(z&&(typeof(z)==="function")){z()
}}else{this.$apply(z)
}};
if(x.filterId&&(v.filterData.id===x.filterId)){o=v;
if(x.state){v.filterData.state=x.state
}if(x.data){v.filterData.data=x.data
}if(x.filterData){v.filterData=x.filterData
}if(x.selected){var u=[];
if(typeof(x.selected)==="number"){try{u=[v.filterData.data[x.selected]]
}catch(t){console.log(t)
}}else{if(typeof(x.selected)==="string"){var p=[];
if(x.selected.toLowerCase()==="$all"){for(var s=0;
s<v.filterData.data.length;
s++){p.push(s)
}}else{if(x.selected.toLowerCase()==="$none"){p=[]
}else{p=x.selected.split(",")
}}for(var s=0;
s<p.length;
s++){try{if((v.filterData.type.toLowerCase()).search("multi")!==-1){u.push(v.filterData.data[p[s]])
}else{u=v.filterData.data[p[s]];
break
}}catch(t){console.log(t)
}}}else{u=[x.selected]
}}g(v,u,x.isfirstTime)
}if(r&&typeof r==="function"){r(x,v)
}v.safeApply(function(){})
}});
return o
}n.s=false,n.fa=true;
function g(q,p,o){if(p){if(q.filterData.maxSelect&&p.length>=q.filterData.maxSelect){if(!n.fa&&!o){alert("Max limit Reached ("+q.filterData.maxSelect+")")
}n.fa=false
}if(q.filterData.maxSelect&&q.filterData.type!=="multiSelectCheckbox"&&k(q.filterData.type)){if(p&&p.length===q.filterData.maxSelect){q.filterData.data=p;
n.s=true
}else{if(n.s){q.filterData.data=angular.copy(q.copyData.data);
n.s=false
}}}}var r={index:q.index,selection:p};
q.filterSelection=p;
if(o!==undefined){r.isfirstTime=o
}q.$emit("filterCriteriaChanged",r)
}function m(){}m.prototype={filters:{label:"label.html",textbox:"standardText.html",singleselect:"singleSelect.html",multiselect:"multiSelect.html",multiselectcheckbox:"multiSelectCheckbox.html",slider:"basicSlider.html",stockslider:"slider.html"},actions:{textbox:function(p){var o=p.scope,q=p.elm;
if(o.filterSelection&&o.filterSelection.length>0){o.textSel=o.filterSelection[0]
}o.textChanged=function(r){o.filterSelection=[r];
o.$emit("filterCriteriaChanged",{selection:o.filterSelection,index:o.index})
}
},stockslider:function(p){var o=p.scope;
o.getSlider=function(q){return f({dataSet:q.data,setExtremes:function(){o.filterSelection=[[this.min],[this.max]];
o.$emit("filterCriteriaChanged",{selection:o.filterSelection,index:o.index,callback:function(r){r[Object.keys(r)[0]+"_min"]=r[Object.keys(r)[0]][0];
r[Object.keys(r)[0]+"_max"]=r[Object.keys(r)[0]][1];
return r
}})
}})
}
},slider:function(p){var o=p.scope;
o.setSliderData=function(s,q,r){g(o,r,false)
}
},multiselectcheckbox:function(r){var p=r.scope,s=r.elm;
var o=[];
p.vis={};
p.vis.singleModel=false;
p.hideMulti=function(){var t=p.vis.singleModel;
p.$parent.hideAll(p.vis.singleModel);
d(function(){if(t===true){p.vis.singleModel=false
}else{p.vis.singleModel=true
}},10)
};
p.$parent.hideAll=function(t){j.$broadcast("filterDisableMultiSelect",true,t)
};
p.$on("filterDisableMultiSelect",function(t,u,v){d(function(){if(p.vis&&p.vis.singleModel===true&&u){p.$apply(function(){p.vis.singleModel=false
})
}},0)
});
var q=0;
p.checkAll=function(v){if(!v.maxSelect){var t=[];
for(var u=0;
u<v.data.length;
u++){t[u]=v.data[u]
}o=t;
g(p,t,false)
}};
p.uncheckAll=function(){var t=[];
o=t;
g(p,t,false)
};
p.setSelectedItem=function(u){if(p.filterSelection&&q===0){o=p.filterSelection
}if(o&&o.length===0){o.push(u)
}else{if(!p.filterData.maxSelect||o.length<=p.filterData.maxSelect){var v=false;
for(var t=0;
t<o.length;
t++){if(o[t]===u){v=true;
break
}}if(!v&&(!p.filterData.maxSelect||o.length<p.filterData.maxSelect)){o.push(u);
q++
}else{o.splice(o.indexOf(u),1);
q--
}}}g(p,o,false)
};
j.callWindowEvent(function(w){if(w){var u=w.target;
if(!u){return
}var t=u.classList;
if(t){var v=t.contains("chosen-single")||t.contains("check_uncheck_all")||t.contains("multisel-dropdown")||(u.parentElement!==null&&(u.parentElement.classList.contains("button_b")||u.parentElement.classList.contains("multisel-dropdown")||u.parentElement.classList.contains("check_uncheck_all")||u.parentElement.classList.contains("inner")));
j.$broadcast("filterDisableMultiSelect",!v,u)
}}})
}}};
function f(p){var o={chartLib:"stockChart",chart:{height:100},scrollbar:{liveRedraw:false},tooltip:{enabled:false},xAxis:{lineWidth:0,tickLength:0,minRange:24*3600*1000,labels:{enabled:false},events:{setExtremes:p.setExtremes}},rangeSelector:{selected:0,enabled:true,inputDateFormat:"%Y-%m-%d",buttons:[{type:"all",text:"All"},{type:"year",count:1,text:"1y"},{type:"month",count:6,text:"6m"}],buttonTheme:{"stroke-width":0,r:0,style:{color:"#808080",fontWeight:"bold"}}},series:[{data:p.dataSet}]};
return o
}function e(s){var p={};
for(var r=0;
r<s.length;
r++){if(s[r].parent){if(s[r].parent.split(",").length>1){for(var q=0;
q<s[r].parent.split(",").length;
q++){p[s[r].parent.split(",")[q]]=s[r].id
}}else{if(!p[s[r].parent]){p[s[r].parent]=s[r].id
}else{if(angular.isArray(p[s[r].parent])){p[s[r].parent].push(s[r].id)
}else{var o=[];
o.push(p[s[r].parent]);
o.push(s[r].id);
p[s[r].parent]=o
}}}}}return p
}function h(r,q){var o=[];
for(var p in q){if(q[p]===r){o.push(p)
}}return o
}function l(t,s){var r={},q=0,p=0,o=0;
for(p=0;
p<t.length;
p++){if(angular.isArray(t[p])&&s){if(angular.isArray(t[p][q])){if(s[p]&&s[p].id){r[s[p].id]=[];
for(o=0;
o<t[p].length;
o++){r[s[p].id].push(t[p][o][q])
}}}else{if(s[p]&&s[p].id){r[s[p].id]=t[p][q]
}}}}return r
}function k(o){return angular.copy(m.prototype.filters[o.toLowerCase()])
}return{Filters:m.prototype,getFilterValue:l,getVsFilters:k,filterCallback:i,setFilterSelection:g,getSlider:f,callExtension:function(q,r){if(q&&q.data){var o=q.data.type;
try{c.getFilter(o,q)
}catch(p){}try{if(k(o)){try{m.prototype.actions[o.toLowerCase()](q)
}catch(p){}}else{}}catch(p){}}if(r&&typeof r==="function"){r(c)
}},setDependency:e,getDependency:h}
}])
});