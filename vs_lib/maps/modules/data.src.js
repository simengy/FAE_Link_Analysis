(function(b){var c=b.each;
var a=function(e,d){this.init(e,d)
};
b.extend(a.prototype,{init:function(d,e){this.options=d;
this.chartOptions=e;
this.columns=d.columns||this.rowsToColumns(d.rows)||[];
if(this.columns.length){this.dataFound()
}else{this.parseCSV();
this.parseTable();
this.parseGoogleSpreadsheet()
}},getColumnDistribution:function(){var g=this.chartOptions,e=function(h){return(b.seriesTypes[h||"line"].prototype.pointArrayMap||[0]).length
},f=g&&g.chart&&g.chart.type,d=[];
c((g&&g.series)||[],function(h){d.push(e(h.type||f))
});
this.valueCount={global:e(f),individual:d}
},dataFound:function(){if(this.options.switchRowsAndColumns){this.columns=this.rowsToColumns(this.columns)
}this.parseTypes();
this.findHeaderRow();
this.parsed();
this.complete()
},parseCSV:function(){var l=this,n=this.options,g=n.csv,e=this.columns,k=n.startRow||0,f=n.endRow||Number.MAX_VALUE,d=n.startColumn||0,i=n.endColumn||Number.MAX_VALUE,j,m,h=0;
if(g){m=g.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(n.lineDelimiter||"\n");
j=n.itemDelimiter||(g.indexOf("\t")!==-1?"\t":",");
c(m,function(p,s){var t=l.trim(p),r=t.indexOf("#")===0,o=t==="",q;
if(s>=k&&s<=f&&!r&&!o){q=p.split(j);
c(q,function(v,u){if(u>=d&&u<=i){if(!e[u-d]){e[u-d]=[]
}e[u-d][h]=v
}});
h+=1
}});
this.dataFound()
}},parseTable:function(){var f=this.options,i=f.table,g=this.columns,e=f.startRow||0,d=f.endRow||Number.MAX_VALUE,h=f.startColumn||0,j=f.endColumn||Number.MAX_VALUE;
if(i){if(typeof i==="string"){i=document.getElementById(i)
}c(i.getElementsByTagName("tr"),function(l,k){if(k>=e&&k<=d){c(l.children,function(n,m){if((n.tagName==="TD"||n.tagName==="TH")&&m>=h&&m<=j){if(!g[m-h]){g[m-h]=[]
}g[m-h][k-e]=n.innerHTML
}})
}});
this.dataFound()
}},parseGoogleSpreadsheet:function(){var l=this,m=this.options,e=m.googleSpreadsheetKey,g=this.columns,k=m.startRow||0,h=m.endRow||Number.MAX_VALUE,f=m.startColumn||0,i=m.endColumn||Number.MAX_VALUE,d,j;
if(e){jQuery.getJSON("https://spreadsheets.google.com/feeds/cells/"+e+"/"+(m.googleSpreadsheetWorksheet||"od6")+"/public/values?alt=json-in-script&callback=?",function(r){var p=r.feed.entry,n,t=p.length,s=0,o=0,q;
for(q=0;
q<t;
q++){n=p[q];
s=Math.max(s,n.gs$cell.col);
o=Math.max(o,n.gs$cell.row)
}for(q=0;
q<s;
q++){if(q>=f&&q<=i){g[q-f]=[];
g[q-f].length=Math.min(o,h-k)
}}for(q=0;
q<t;
q++){n=p[q];
d=n.gs$cell.row-1;
j=n.gs$cell.col-1;
if(j>=f&&j<=i&&d>=k&&d<=h){g[j-f][d-k]=n.content.$t
}}l.dataFound()
})
}},findHeaderRow:function(){var d=0;
c(this.columns,function(e){if(typeof e[0]!=="string"){d=null
}});
this.headerRow=0
},trim:function(d){return typeof d==="string"?d.replace(/^\s+|\s+$/g,""):d
},parseTypes:function(){var g=this.columns,f=g.length,j,i,d,h,e;
while(f--){j=g[f].length;
while(j--){i=g[f][j];
d=parseFloat(i);
h=this.trim(i);
if(h==d){g[f][j]=d;
if(d>365*24*3600*1000){g[f].isDatetime=true
}else{g[f].isNumeric=true
}}else{e=this.parseDate(i);
if(f===0&&typeof e==="number"&&!isNaN(e)){g[f][j]=e;
g[f].isDatetime=true
}else{g[f][j]=h===""?null:h
}}}}},dateFormats:{"YYYY-mm-dd":{regex:"^([0-9]{4})-([0-9]{2})-([0-9]{2})$",parser:function(d){return Date.UTC(+d[1],d[2]-1,+d[3])
}}},parseDate:function(h){var i=this.options.parseDate,e,f,g,d;
if(i){e=i(h)
}if(typeof h==="string"){for(f in this.dateFormats){g=this.dateFormats[f];
d=h.match(g.regex);
if(d){e=g.parser(d)
}}}return e
},rowsToColumns:function(h){var i,f,d,g,e;
if(h){e=[];
f=h.length;
for(i=0;
i<f;
i++){g=h[i].length;
for(d=0;
d<g;
d++){if(!e[d]){e[d]=[]
}e[d][i]=h[i][d]
}}}return e
},parsed:function(){if(this.options.parsed){this.options.parsed.call(this,this.columns)
}},complete:function(){var d=this.columns,l,m,o=this.options,n,h,g,k,f,e;
if(o.complete){this.getColumnDistribution();
if(d.length>1){l=d.shift();
if(this.headerRow===0){l.shift()
}if(l.isDatetime){m="datetime"
}else{if(!l.isNumeric){m="category"
}}}for(k=0;
k<d.length;
k++){if(this.headerRow===0){d[k].name=d[k].shift()
}}h=[];
for(k=0,e=0;
k<d.length;
e++){n=b.pick(this.valueCount.individual[e],this.valueCount.global);
g=[];
if(k+n<=d.length){for(f=0;
f<d[k].length;
f++){g[f]=[l[f],d[k][f]!==undefined?d[k][f]:null];
if(n>1){g[f].push(d[k+1][f]!==undefined?d[k+1][f]:null)
}if(n>2){g[f].push(d[k+2][f]!==undefined?d[k+2][f]:null)
}if(n>3){g[f].push(d[k+3][f]!==undefined?d[k+3][f]:null)
}if(n>4){g[f].push(d[k+4][f]!==undefined?d[k+4][f]:null)
}}}h[e]={name:d[k].name,data:g};
k+=n
}o.complete({xAxis:{type:m},series:h})
}}});
b.Data=a;
b.data=function(d,e){return new a(d,e)
};
b.wrap(b.Chart.prototype,"init",function(e,f,g){var d=this;
if(f&&f.data){b.data(b.extend(f.data,{complete:function(h){if(f.series){c(f.series,function(k,j){f.series[j]=b.merge(k,h.series[j])
})
}f=b.merge(h,f);
e.call(d,f,g)
}}),f)
}else{e.call(d,f,g)
}})
}(Highcharts));