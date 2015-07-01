(function(b){var a=b.each,c=function(d,e){this.init(d,e)
};
b.extend(c.prototype,{init:function(d,e){this.options=d;
this.chartOptions=e;
this.columns=d.columns||this.rowsToColumns(d.rows)||[];
this.columns.length?this.dataFound():(this.parseCSV(),this.parseTable(),this.parseGoogleSpreadsheet())
},getColumnDistribution:function(){var d=this.chartOptions,e=d&&d.chart&&d.chart.type,f=[];
a(d&&d.series||[],function(g){f.push((b.seriesTypes[g.type||e||"line"].prototype.pointArrayMap||[0]).length)
});
this.valueCount={global:(b.seriesTypes[e||"line"].prototype.pointArrayMap||[0]).length,individual:f}
},dataFound:function(){if(this.options.switchRowsAndColumns){this.columns=this.rowsToColumns(this.columns)
}this.parseTypes();
this.findHeaderRow();
this.parsed();
this.complete()
},parseCSV:function(){var u=this,v=this.options,t=v.csv,s=this.columns,r=v.startRow||0,n=v.endRow||Number.MAX_VALUE,m=v.startColumn||0,p=v.endColumn||Number.MAX_VALUE,q,l,j=0;
t&&(l=t.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split(v.lineDelimiter||"\n"),q=v.itemDelimiter||(t.indexOf("\t")!==-1?"\t":","),a(l,function(d,g){var e=u.trim(d),f=e.indexOf("#")===0;
g>=r&&g<=n&&!f&&e!==""&&(e=d.split(q),a(e,function(h,i){i>=m&&i<=p&&(s[i-m]||(s[i-m]=[]),s[i-m][j]=h)
}),j+=1)
}),this.dataFound())
},parseTable:function(){var f=this.options,g=f.table,n=this.columns,m=f.startRow||0,l=f.endRow||Number.MAX_VALUE,k=f.startColumn||0,j=f.endColumn||Number.MAX_VALUE;
g&&(typeof g==="string"&&(g=document.getElementById(g)),a(g.getElementsByTagName("tr"),function(e,d){d>=m&&d<=l&&a(e.children,function(h,i){if((h.tagName==="TD"||h.tagName==="TH")&&i>=k&&i<=j){n[i-k]||(n[i-k]=[]),n[i-k][d-m]=h.innerHTML
}})
}),this.dataFound())
},parseGoogleSpreadsheet:function(){var s=this,t=this.options,r=t.googleSpreadsheetKey,q=this.columns,p=t.startRow||0,m=t.endRow||Number.MAX_VALUE,l=t.startColumn||0,n=t.endColumn||Number.MAX_VALUE,o,j;
r&&jQuery.getJSON("https://spreadsheets.google.com/feeds/cells/"+r+"/"+(t.googleSpreadsheetWorksheet||"od6")+"/public/values?alt=json-in-script&callback=?",function(f){var f=f.feed.entry,i,g=f.length,d=0,h=0,e;
for(e=0;
e<g;
e++){i=f[e],d=Math.max(d,i.gs$cell.col),h=Math.max(h,i.gs$cell.row)
}for(e=0;
e<d;
e++){if(e>=l&&e<=n){q[e-l]=[],q[e-l].length=Math.min(h,m-p)
}}for(e=0;
e<g;
e++){if(i=f[e],o=i.gs$cell.row-1,j=i.gs$cell.col-1,j>=l&&j<=n&&o>=p&&o<=m){q[j-l][o-p]=i.content.$t
}}s.dataFound()
})
},findHeaderRow:function(){a(this.columns,function(){});
this.headerRow=0
},trim:function(d){return typeof d==="string"?d.replace(/^\s+|\s+$/g,""):d
},parseTypes:function(){for(var f=this.columns,g=f.length,l,k,j,i;
g--;
){for(l=f[g].length;
l--;
){k=f[g][l],j=parseFloat(k),i=this.trim(k),i==j?(f[g][l]=j,j>31536000000?f[g].isDatetime=!0:f[g].isNumeric=!0):(k=this.parseDate(k),g===0&&typeof k==="number"&&!isNaN(k)?(f[g][l]=k,f[g].isDatetime=!0):f[g][l]=i===""?null:i)
}}},dateFormats:{"YYYY-mm-dd":{regex:"^([0-9]{4})-([0-9]{2})-([0-9]{2})$",parser:function(d){return Date.UTC(+d[1],d[2]-1,+d[3])
}}},parseDate:function(f){var g=this.options.parseDate,j,i,h;
g&&(j=g(f));
if(typeof f==="string"){for(i in this.dateFormats){g=this.dateFormats[i],(h=f.match(g.regex))&&(j=g.parser(h))
}}return j
},rowsToColumns:function(f){var g,l,k,j,i;
if(f){i=[];
l=f.length;
for(g=0;
g<l;
g++){j=f[g].length;
for(k=0;
k<j;
k++){i[k]||(i[k]=[]),i[k][g]=f[g][k]
}}}return i
},parsed:function(){this.options.parsed&&this.options.parsed.call(this,this.columns)
},complete:function(){var s=this.columns,t,r,q=this.options,p,m,l,n,o,j;
if(q.complete){this.getColumnDistribution();
s.length>1&&(t=s.shift(),this.headerRow===0&&t.shift(),t.isDatetime?r="datetime":t.isNumeric||(r="category"));
for(n=0;
n<s.length;
n++){if(this.headerRow===0){s[n].name=s[n].shift()
}}m=[];
for(n=0,j=0;
n<s.length;
j++){p=b.pick(this.valueCount.individual[j],this.valueCount.global);
l=[];
if(n+p<=s.length){for(o=0;
o<s[n].length;
o++){l[o]=[t[o],s[n][o]!==void 0?s[n][o]:null],p>1&&l[o].push(s[n+1][o]!==void 0?s[n+1][o]:null),p>2&&l[o].push(s[n+2][o]!==void 0?s[n+2][o]:null),p>3&&l[o].push(s[n+3][o]!==void 0?s[n+3][o]:null),p>4&&l[o].push(s[n+4][o]!==void 0?s[n+4][o]:null)
}}m[j]={name:s[n].name,data:l};
n+=p
}q.complete({xAxis:{type:r},series:m})
}}});
b.Data=c;
b.data=function(d,e){return new c(d,e)
};
b.wrap(b.Chart.prototype,"init",function(e,f,h){var g=this;
f&&f.data?b.data(b.extend(f.data,{complete:function(d){f.series&&a(f.series,function(i,j){f.series[j]=b.merge(i,d.series[j])
});
f=b.merge(d,f);
e.call(g,f,h)
}}),f):e.call(g,f,h)
})
})(Highcharts);