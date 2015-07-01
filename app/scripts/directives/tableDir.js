define(["app","datatable"],function(){vividSENSE.directive("datatable",["$rootScope","$http","$timeout","$location","WidgetService","NotificationService","RequireService","AppService","CommonService","DashboardService",function($rootScope,$http,$timeout,$location,WidgetService,notification,RequireService,AppService,CommonService,DashboardService){RequireService.loadCss(["vs_lib/datatable/1.9.4/dataTables.css"]);
var clickObj={};
function callbackEvent(type,options,callback){if(!clickObj[type]){clickObj[type]=[]
}if(callback&&typeof callback==="function"){clickObj[type].push(callback)
}switch(type){case"rowCreated":options.fnRowCallback=function(nRow,aData,iDisplayIndex,iDisplayIndexFull){for(var i in clickObj[type]){clickObj[type][i](nRow,aData,iDisplayIndex,iDisplayIndexFull,this)
}};
break;
case"headerCreated":options.fnHeaderCallback=function(nHead,aData,iStart,iEnd,aiDisplay){for(var i in clickObj[type]){clickObj[type][i](nHead,aData,iStart,iEnd,aiDisplay,this)
}};
break;
case"tableCreated":options.fnDrawCallback=function(nRow,aData,iDisplayIndex,iDisplayIndexFull){for(var i in clickObj[type]){clickObj[type][i](nRow,aData,iDisplayIndex,iDisplayIndexFull,this)
}};
break
}return options
}function setHeader(cols){var headerforDataTbl=[];
for(var i=0;
i<cols.length;
i++){headerforDataTbl.push({mData:cols[i],mDataProp:cols[i],aTargets:[i],sTitle:cols[i]})
}return headerforDataTbl
}function resetValues(options){var nullFunc=function(){};
clickObj={};
options.bPaginate=false;
options.bProcessing=false;
options.bServerSide=false;
options.fnServerData=nullFunc;
options.fnRowCallback=nullFunc;
options.fnDrawCallback=nullFunc;
options.fnHeaderCallback=nullFunc
}function changeTableSettings(self,options,value){if(value.data.length===0){options.oLanguage.sInfo="No records";
options.bPaginate=false
}else{options.oLanguage.sInfo="Showing _START_ to _END_ records."
}return options
}var tableExt={styling:function(name,params,options,elm,scope){switch(name){case"searchable":if(params==="true"||params===true){options.bFilter=true
}break;
case"sortable":if(params==="true"||params===true){options.bSort=true
}else{options.bSort=false
}break;
case"enableInfo":if(params){options.bInfo=params
}break;
case"style":if(params){var obj={};
for(var i in params){obj[i.toString()]=params[i]
}callbackEvent("rowCreated",options,function(nRow){$("td",nRow).css(obj)
})
}break;
default:break
}return options
},sortColumn:function(params,options){for(var i=0;
i<options.aoColumnDefs.length;
i++){if(params==="true"||params===true){options.aoColumnDefs[i].bSortable=true
}else{options.aoColumnDefs[i].bSortable=false
}}},pagination:function(params,options,element,scope){var maxNumber=4294967295;
if(params){if(!params.mode){params.mode="client"
}if(params.mode){switch(params.mode){case"server":options.bPaginate=true;
options.bProcessing=true;
options.bServerSide=true;
options.sAjaxSource=AppService.getApiBase()+"dashboards/"+AppService.getCurrentDashboardName()+"/widgets/"+scope.$parent.widgetInfo.name;
if(params.recordPerPage){options.iDisplayLength=params.recordPerPage
}if(params.maxCount){options.iTotalDisplayRecords=params.maxCount;
options.iTotalRecords=params.maxCount
}options.fnServerData=function(sSource,aoData,fnCallback,oSettings){function getaoData(aoData){var dataParams=angular.copy(aoData);
aoData=[];
if(!scope.widgetParams){scope.widgetParams={}
}for(var i=0;
i<dataParams.length;
i++){if(params.offsetParam&&dataParams[i].name==="iDisplayStart"){scope.widgetParams[params.offsetParam]=dataParams[i].value
}if(params.sortColumnParam&&dataParams[i].name==="iSortCol_0"){scope.widgetParams[params.sortColumnParam]=options.aoColumnDefs[dataParams[i].value].sTitle
}if(params.sortOrderParam&&dataParams[i].name==="sSortDir_0"){scope.widgetParams[params.sortOrderParam]=dataParams[i].value
}}if(params.recordPerPageParam){scope.widgetParams[params.recordPerPageParam]=params.recordPerPage||10
}var obj=AppService.getCurrentDashboard();
for(var i in scope.widgetParams){if(obj.widgets[scope.$parent.widgetInfo.name]&&obj.widgets[scope.$parent.widgetInfo.name].filters){obj.widgets[scope.$parent.widgetInfo.name].filters[i]=scope.widgetParams[i]
}}var base={widgetFilter:false};
var filterRes=angular.extend(scope.widgetParams,base);
angular.extend(filterRes,WidgetService.getAllFilterResult(scope.$parent.widgetInfo.name));
for(var i in filterRes){if(angular.isArray(filterRes[i])&&filterRes[i].length>0){for(var j=0;
j<filterRes[i].length;
j++){aoData.push({name:i,value:filterRes[i][j]})
}}else{aoData.push({name:i,value:filterRes[i]})
}}return aoData
}if(scope.data&&scope.count===1){var json={iTotalDisplayRecords:params.maxCount||maxNumber,iTotalRecords:params.maxCount||maxNumber,aaData:scope.data.data};
fnCallback(json);
scope.count++
}else{oSettings.jqXHR=$.ajax({dataType:"json",type:"POST",url:sSource,data:getaoData(aoData),headers:{"Content-Type":"application/x-www-form-urlencoded","X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")},success:function(data,textStatus,jqXHR){var newMaxNumber=maxNumber;
if(data.responseBody.designs[0].data.data.length===0){newMaxNumber=0
}var json={iTotalDisplayRecords:params.maxCount||newMaxNumber,iTotalRecords:params.maxCount||newMaxNumber,aaData:data.responseBody.designs[0].data.data};
if(!params.maxCount){if(json.aaData.length<1){oSettings.oLanguage.sInfo="No records"
}else{oSettings.oLanguage.sInfo="Showing _START_ to _END_ records."
}}fnCallback(json)
}})
}};
options.sPaginationType="two_button";
break;
case"client":options.bProcessing=false;
options.bServerSide=false;
options.bPaginate=true;
options.sPaginationType="two_button";
if(params.recordPerPage){options.iDisplayLength=params.recordPerPage
}var qp=CommonService.getQueryParamsFromUrl();
if(qp.hasOwnProperty("$$offset")){try{options.iDisplayStart=parseInt(qp.$$offset)
}catch(e){console.log(e)
}}if(qp.hasOwnProperty("$$sorting_0")){try{options.aaSorting=[];
options.aaSorting[0]=[];
options.aaSorting[0][0]=(parseInt(qp.$$sorting_0));
options.aaSorting[0][1]=(qp.$$sorting_1);
options.aaSorting[0][2]=(parseInt(qp.$$sorting_2))
}catch(e){console.log(e)
}}if(qp.hasOwnProperty("$$searching_caseInsensitive")){try{options.oSearch={};
options.oSearch.bCaseInsensitive=(qp.$$searching_caseInsensitive==="true");
options.oSearch.bRegex=(qp.$$searching_regex==="true");
options.oSearch.bSmart=(qp.$$searching_smart==="true");
options.oSearch.sSearch=(qp.$$searching_search);
console.log(options)
}catch(e){console.log(e)
}}callbackEvent("tableCreated",options,function(nRow,aData,iDisplayIndex,iDisplayIndexFull,self){if(scope.widgetParams){scope.widgetParams.$$offset=self.fnSettings()._iDisplayStart;
scope.widgetParams.$$sorting_0=self.fnSettings().aaSorting[0][0];
scope.widgetParams.$$sorting_1=self.fnSettings().aaSorting[0][1];
scope.widgetParams.$$sorting_2=self.fnSettings().aaSorting[0][2];
scope.widgetParams.$$searching_caseInsensitive=self.fnSettings().oPreviousSearch.bCaseInsensitive;
scope.widgetParams.$$searching_regex=self.fnSettings().oPreviousSearch.bRegex;
scope.widgetParams.$$searching_smart=self.fnSettings().oPreviousSearch.bSmart;
scope.widgetParams.$$searching_search=self.fnSettings().oPreviousSearch.sSearch;
var obj=AppService.getCurrentDashboard();
for(var i in scope.widgetParams){if(obj.widgets[scope.$parent.widgetInfo.name]&&obj.widgets[scope.$parent.widgetInfo.name].filters){obj.widgets[scope.$parent.widgetInfo.name].filters[i]=scope.widgetParams[i]
}}}});
break;
default:break
}}else{options.bProcessing=false;
options.bServerSide=false;
options.bPaginate=true;
options.sPaginationType="two_button"
}if(params.buttonType){if(!params.maxCount&&options.bServerSide&&params.buttonType==="fullButton"){params.buttonType="twoButton"
}switch(params.buttonType){case"fullButton":options.bPaginate=true;
options.sPaginationType="full_numbers";
break;
case"twoButton":options.bPaginate=true;
options.sPaginationType="two_button";
break;
case"scrolling":options.bPaginate=false;
options.sScrollY=180;
break;
default:options.bPaginate=true;
options.sPaginationType="two_button";
break
}}}return options
},events:function(params,options,elm,scope){for(var i in params){if(params.hasOwnProperty(i)){try{var fn=eval(params[i]);
if(fn&&typeof fn==="function"){callbackEvent(i,options,fn)
}}catch(e){console.log(e)
}}}},point:function(params,options,elm,scope){var fn=function(nRow,aData,iDisplayIndex,iDisplayIndexFull){for(var i in params.events){if(params.events.hasOwnProperty(i)){var type=i;
if(type.toLowerCase()==="mouseover"){type="mouseenter"
}else{if(type.toLowerCase()==="mouseout"){type="mouseleave"
}else{type="click"
}}var tempFunction=params.events[i],evn=params.events[i];
if(typeof(evn)==="string"){try{var evn1=evn.toString();
evn1=evn1.replace("this","aData");
tempFunction=eval(evn1.toString())
}catch(e){if(e instanceof SyntaxError){console.log("Error :- "+e.message+" -- In Code =="+evn)
}}}$("td",nRow).unbind();
$("td",nRow).bind(type,tempFunction)
}}return nRow
};
callbackEvent("rowCreated",options,fn);
return option
}};
return{restrict:"E,A",replace:true,scope:{options:"=datatable",data:"=data",color:"=color",widgetParams:"=widgetparams"},link:function(scope,element){scope.count=1;
var dataTable=null;
var options=WidgetService.Widgets.actions.table();
scope.$watch("data",function(value){if(!value||value.length===0||!value.columns){return
}scope.count=1;
var val=value||null;
if(val&&value.columns){resetValues(options);
options.aoColumnDefs=setHeader(value.columns);
scope.colLen=value.columns.length;
scope.creaditMsg=value.credits;
if(scope.widgetParams&&scope.widgetParams.offsetParam){options.iDisplayStart=scope.widgetParams.offsetParam
}if(scope.count===1){options.iDisplayStart=0;
if(value.plotOptions&&value.plotOptions.datatable){var plotOpts=value.plotOptions.datatable;
for(var i in plotOpts){try{if(i==="events"||i==="pagination"||i==="point"){tableExt[i](plotOpts[i],options,element,scope)
}else{tableExt.styling(i,plotOpts[i],options,element,scope)
}}catch(e){try{plotOpts[i](i,options,element,scope)
}catch(e){}}}}try{changeTableSettings(this,options,value);
var isPDF=(window.location.pathname.indexOf("index_pdf")>0)?true:false;
if(isPDF){options.bInfo=false
}if(!options.bServerSide){options.aaData=value.data;
if(dataTable!==null){dataTable.fnDestroy();
element.empty()
}dataTable=element.dataTable(options)
}else{options.bFilter=false;
if(dataTable!==null){dataTable.fnDestroy();
element.empty()
}scope.count=1;
dataTable=element.dataTable(options)
}}catch(e){notification.handelErrors(scope.$parent.$parent,"6050",e)
}}}if(scope.data.credits.enabled){var colLength=scope.colLen||1;
if(options.bServerSide){element.append('<tfoot><tr><th colspan="'+colLength+'"><a style="color: #909090;cursor: pointer;fill: #909090;float: right;font-size: 10px;text-decoration: none;text-transform: none;" data-ng-href="'+scope.data.credits.href+'">'+scope.data.credits.text+"</a></th></tr></tfoot>")
}else{element.append('<tfoot><tr><th colspan="'+colLength+'"><a style="color: #909090;cursor: pointer;fill: #909090;float: right;font-size: 10px;text-decoration: none;text-transform: none;" data-ng-href="'+scope.data.credits.href+'">'+scope.data.credits.text+"</a></th></tr></tfoot>")
}}})
}}
}])
});