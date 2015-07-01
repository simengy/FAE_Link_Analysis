<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="context" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="description" content="" />
<meta name="keywords" content="" />
<title>vividSENSE</title>
<link rel="shortcut icon" href="${context}/app/images/saama-logo.png" />
<style>
* {
	margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif
}

#headerTable td {
	height: 60px;
	border-bottom: 1px solid #ccc
}

.rounded {
	padding: 30px 0 50px;
	border: 1px solid #ccc;
	border-radius: 5px;
	-webkit-box-shadow: 0 0px 0px 2px rgba(0, 0, 0, 0.09);;
	-o-box-shadow: 0 0px 0px 2px rgba(0, 0, 0, 0.09);;
	-moz-box-shadow: 0 0px 0px 2px rgba(0, 0, 0, 0.09);;
	box-shadow: 0 0px 0px 2px rgba(0, 0, 0, 0.09);;
}

.rounded table tr td:first-child {
	font-size: 13px;
	height: 38px;
	padding-right: 15px;
	text-align: right;
}

.rounded input[type=text],.rounded input[type=password] {
	height: 25px;
	border: 1px solid #999;
	border-radius: 3px;
	padding-left: 10px
}

.rounded input[type=submit],.rounded input[type=reset] {
	font-size: 12px;
	padding: 5px;
}
</style>
</head>
<body>
	<div data-role="page" class="ui-body-d">
		<table id="headerTable" style="width: 100%">
			<tr style="vertical-align: middle;">
				<td width="33%"><img src="${context}/app/images/saamalogo.png" width="134"
					height="50" alt="Saama" style="margin-left: 15px; text-align: left"></td>
				<td width="34%" style="text-align: center"></td>
				<td width="33%" style="margin-right: 15px; text-align: right"><img
					src="${context}/app/images/vividsense_logo.png" width="170" height="37"
					alt="vividSENSE"></td>
			</tr>
		</table>
		<div style="clear: both; height: 60px"></div>
		<div data-role="content" style="padding: 0px !important">
			<div align="center">
				<div>
					<div>
						<br /> <br />
						<div class="rounded" style="width: 30%; margin: 0 auto">
							<form style="padding-top: 12px" action="j_spring_security_check"
								data-ajax="false" method="POST" data-role="none" rel="external">
								<table id="login-table">
									<c:set var="error" scope="session"
										value="${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}" />
									<c:if test="${not empty error}">
										<div style="color: red">Login Failed! :
											${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</div>
									</c:if>
									<tr>
										<td width="72">User:</td>
										<td colspan='2'><input type='text' name='j_username'
											value=''></td>
									</tr>
									<tr>
										<td>Password:</td>
										<td colspan='2'><input type='password' name='j_password' /></td>
									</tr>
									<tr>
										<td><input type="text" name='X-CSRF-TOKEN'
											value="${_csrf}" hidden /></td>
									</tr>
									<tr>
										<td></td>
										<td colspan="2" style="text-align: left"><input
											id="login" name="submit" style="" type="submit"
											data-ajax="false" value="Sign in" rel="external" />
											&nbsp;&nbsp;<input id="reset" name="reset" style=""
											type="reset" value="Reset" /></td>
									</tr>
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="footer" data-role="footer" data-theme="f"
			data-position="fixed"
			style="background: #E9EAEA; position: fixed; bottom: 0; width: 100%">
			<div
				style="font-size: 11px; font-family: verdana; text-align: center; color: black;">Copyright
				@2013 - Saama Technologies - All Rights Reserved</div>
		</div>
	</div>
</body>
<!-- End body -->
</html>