<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="context" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma" content="no-cache" />
<meta name="_csrf" content="${_csrf}" />
<title>vividSENSE Dashboard</title>

<!-- STYLE -->
<link rel="shortcut icon" href="images/saama-logo.png" />
<link rel="stylesheet" href="${context}/vs_lib/bootstrap/3.1.1/bootstrap.css" />
<link rel="stylesheet" href="${context}/vs_lib/chosen/chosen.css" />
<link rel="stylesheet" href="${context}/app/styles/style.css" />
<link rel="stylesheet" href="${context}/app/styles/print.css" />

</head>

<body data-ng-controller="mainCtrl" class="print">
	<div class="wrapper">
		<!-- HEADER -->
		<div class="header" style="margin-top:-6px">
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<img src="app/images/saamalogo.png"
						style="float: left; margin: 7px 0 0 -7px" />
				</div>
				<div class="col-xs-6 col-md-6">
					<img src="app/images/vividsense_logo.png"
						style="float: right; margin-top: 13px; margin-right: 0;" />
				</div>
			</div>
		</div>
		<!-- END HEADER -->
		<!-- CONTAINER ( page contents will render here) -->
		<div class="content container" data-ng-view></div>
		<!-- END CONTAINER -->
	</div>
	<!-- FOOTER (Disclaimer) -->
	<div class="clearfix"></div>
	<!-- <div class="footer">
		Copyright 2014 <a href="#" target="_blank">Saama Technologies</a>
		- All Rights Reserved.
	</div> -->
	<!-- END FOOTER -->
	<!-- LIBRARIES -->
	<script src="${context}/vs_lib/jquery/jquery.min.js"></script>
	<script src="${context}/vs_lib/chosen/chosen.jquery.js"></script>
	<script src="${context}/vs_lib/datatable/1.9.4/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${context}/app/scripts/services/initializevalues.js"></script>
	<script type="text/javascript" data-main="${context}/app/scripts/main" src="${context}/vs_lib/require/2.1.1/require.js"></script>
		
	<script type="text/javascript">
		window.vs = window.vs || {};
	
		window.vs.initConf = function(){
			return ${it.layout};
		}
		
		window.vs.userConf = function(){
			var name = '${pageContext.request.getUserPrincipal().getName()}';
			var obj = {'userName':name};
			return obj;
		};
	</script>
	<script>
$(function(){
  <%
  if (request.getParameter("dashboardExport") != null) {
  %>
  window.vs.exportParam.dashboard = '<%=request.getParameter("dashboardExport")%>'; 
  <%
  } 
  if (request.getParameter("widget") != null) {
  %>
  window.vs.exportParam.widget = '<%=request.getParameter("widget")%>'; 
  <%
  } 
  if (request.getParameter("exportType") != null) {
  %>
  window.vs.exportParam.exportType = '<%=request.getParameter("exportType")%>'; 
  <%
  } 
  %>
});
</script>
</body>
</html>