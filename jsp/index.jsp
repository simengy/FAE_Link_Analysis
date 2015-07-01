<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="context" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="_csrf" content="${_csrf}" />
<title>vividSENSE Dashboard</title>

<!-- STYLE -->
<link rel="shortcut icon" href="${context}/app/images/saama-logo.png" />
<link rel="stylesheet"
	href="${context}/vs_lib/bootstrap/3.1.1/bootstrap.css" />
<link rel="stylesheet" href="${context}/vs_lib/chosen/chosen.css" />
<link rel="stylesheet" href="${context}/app/styles/style.css" />
<link rel="stylesheet" href="${context}/app/styles/print.css" />
<link rel="stylesheet" href="${context}/sphinx/styles/style.css" />
</head>

<body data-ng-controller="mainCtrl">
	<!-- AJAX PRELOADER -->
	<loading class="ajax_loader_wrapper"> <span
		class="ajax_loader"> <img src="${context}/app/images/ajaxLoader.gif" />
	</span> </loading>
	<!-- END AJAX PRELOADER -->
	<div class="wrapper">
		<!-- HEADER -->
		<div class="header navbar-fixed-top">
			<div class="row">
				<div class="col-xs-4 col-md-4">
					<img src="app/images/saamalogo.png"
						style="float: left; height: 51px; margin: 7px 0 0 7px" />
				</div>
				<div class="col-xs-4 col-md-4" style="text-align: center">
					<img src="app/images/fae-logo.png" style="height:60px;" />
				</div>
				<div class="col-xs-4 col-md-4" data-ng-cloak>
					<div style="right: 210px;top: 20px;position:absolute;" data-ng-if="appLanguages.length>1">
						<div class="btn-group" dropdown>
					      <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-ng-disabled="disabled">
					       Selected - {{currentLocale}} <span class="caret"></span>
					      </button>
					      <ul class="dropdown-menu">
					        <li data-ng-repeat="languages in appLanguages" data-ng-click="changeLocale(languages)"><a>{{languages.name}} - {{languages.countryName}}</a></li>
					      </ul>
					    </div>
					
						<!-- <select id="multiLang" data-ng-model="currentLocale" data-ng-options="languages.name as  languages.countryName for languages in appLanguages" data-ng-change="changeLocale()"></select> -->
					</div>
					<form data-ng-show="userInfo" style="position: absolute;right: 100px;top: 15px;" name="formLogout"
						action="j_spring_security_logout" method="POST">
						<button type="submit" class="btn btn-link" style="color: #7f7f7f;font-size: 18px;"><span translate style="margin-right:5px">Logout</span><img src="app/images/off.png" height="18px" width="18px"/></button>
					</form>
					<div class="placeHolder"></div>
					<!-- EXPORT BUTTON (Download PDF) -->
					<div class="download"
						data-ng-class="isDlCollapsed == true? 'highlighted': ''"
						data-ng-hide="isDlVisible">
						<a data-ng-click="isDlCollapsed = !isDlCollapsed" class="dl_link">
							<span class="related_icon download_pdf"></span> <span
							class="txt downloadTxt"> </span>
						</a>
						<div collapse="!isDlCollapsed">
							<h3>Download</h3>
							<div class="download_btns" data-ng-if="isDlCollapsed"
								style="border-right: 1px solid #ccc; padding-right: 15px;">
								<h4 style="text-align: center">Current Dashboard</h4>
								<div style="display: table; width: 85%; margin: 0 auto;">
									<div
										style="display: table-cell; vertical-align: middle; width: 100%; height: 177px">
										<button class="btn btn-primary"
											data-ng-disabled="!exportOptions.showExportButton(tabs)"
											data-ng-click="exportOptions.call('excel')">Download
											Excel</button>
										<form class="download" target="_blank" name="frmDashboardpdf"
											action="{{PDF_EXPORT_URL}}" method="POST">
											<input type="hidden" name="pagelist" /> <input type="hidden"
												name="exportType" value="pdf" /> 
										</form>
										<button class="btn btn-primary"
											data-ng-disabled="!exportOptions.showExportButton(tabs)"
											data-ng-click="exportOptions.call('pdf')">Download
											PDF</button>
									</div>
								</div>
								<form class="download" target="_blank" name="frmDashboardexcel"
									action="{{EXCEL_EXPORT_URL}}" method="POST"
									style="display: none">
									<input type="hidden" name="dashboard" />
									<input type="hidden" name="filters" />
								</form>
							</div>
							<div data-ng-if="isDlCollapsed"
								style="float: right; margin: 0 0 15px 0; width: 50%; padding-left: 15px">
								<div class="multisel-dropdown download_dd"
									style="position: static;">
									<h4 style="text-align: center">Select Dashboards</h4>
									<input type="text" data-ng-model="search.title">
									<div class="download_inner inner">
										<div data-ng-repeat="tab in tabs | filter:search"
											data-ng-model="selectedtabs" data-ng-if="tab.export"
											data-ng-click="setSelectedTabs(tab)" id="{{tab.title}}">
											{{tab.title}} <i data-ng-if="selectedtabs.indexOf(tab)!=-1"
												class="glyphicon glyphicon-ok pull-right"></i>
										</div>
									</div>
									<div class="check_uncheck_all">
										<a data-ng-click="checkAll(tabs)" href=""><i
											class="glyphicon glyphicon-ok"></i> Check All</a> <a
											data-ng-click="uncheckAll()" href=""><i
											class="glyphicon glyphicon-remove"></i> Uncheck All</a>
									</div>
								</div>
								<form class="download" target="_blank" name="frmExportDashboard"
									action="{{PDF_EXPORT_URL}}" method="POST">
									<input type="hidden" name="pagelist" value="{{downloadTabs}}" />
									<input type="hidden" name="exportType" value="pdf" /> 
									<button
										data-ng-click="isDlCollapsed = pdfSelected(downloadTabs)"
										data-ng-disabled="selectedtabs.length===0 || !selectedtabs[0]"
										class="btn btn-primary">Download PDF</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>			

			<!-- NAVBAR -->
			<button class="btn handle handle-right"
				data-ng-mouseenter="hover = true" data-ng-mouseleave="hover = false">
				<div class="top-line"></div>
			</button>
			<div class="vertical_menu_slide_right"
				data-ng-class="{expanded: open, collapsed: !open, 'hover':hover}"
				data-ng-mouseenter="open = true" data-ng-mouseleave="open = false">
				<nav class="navbar navbar-default">
					<div class="collapse navbar-collapse"
						data-ng-include="'${context}/app/partials/vsBase/menu.html'"
						data-ng-init="submenu = tabs;"></div>
				</nav>
			</div>
			<!-- END NAVBAR -->
		</div>
		<!-- END HEADER -->

		<!-- CONTAINER ( page contents will render here) -->
		<div data-ng-view class="content container"></div>
		<!-- END CONTAINER -->

		<!-- FOOTER (Disclaimer. for print only) -->
		<div class="clearfix"></div>
		<div class="footer" >
			<span translate>Copyright 2014</span> <a href="http://www.saama.com/" target="_blank">Saama Technologies</a> - <span translate>All Rights Reserved.</span>
		</div>
	</div>
	<!-- END FOOTER -->

	<!-- GO-TO-TOP link -->
	<div class="go_top" data-ng-hide="logoPosModel"
		data-ng-click="goToTop()" style="bottom: 25px;">
		<i class="glyphicon glyphicon-chevron-up"></i>
	</div>
	<!-- END GO-TO-TOP link -->

	<!-- LIBRARIES -->
	<script type="text/javascript"
		src="${context}/app/scripts/services/initializevalues.js"></script>
		
	<script type="text/javascript">
		window.vs = window.vs || {};
	
		window.vs.initConf = function(){
			return ${it.layout};
		};
		
		window.vs.userConf = function(){
			var name = '${pageContext.request.getUserPrincipal().getName()}';
			var obj = {'userName':name};
			return obj;
		};
		
	</script>
	<script type="text/javascript" data-main="${context}/app/scripts/main"
		src="${context}/vs_lib/require/2.1.1/require.js"></script>

	<script src="${context}/custom_project/scripts/ext/filterExt.js"></script>
	<script src="${context}/custom_project/scripts/ext/eventsExt.js"></script>
	<script src="${context}/vs_lib/d3/d3.v3.min.js"></script>

</body>
</html>