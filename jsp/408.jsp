<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="context" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>vividSENSE Dashboard</title>
<!-- Favicon -->
<link href="${context}/images/saama-logo.png" rel="shortcut icon">
<!-- CSS library -->
<link href="${context}/vs_lib/bootstrap/3.1.1/bootstrap.min.css" rel="stylesheet"
	type="text/css">
<!-- Custom CSS -->
<link href="${context}/css/errorpage.css" rel="stylesheet" type="text/css">
<script>
  function buttonclick() {
    window.location.replace("${context}/index.jsp");
  }
</script>
</head>
<body>
	<!-- BODY -->
	<div class="content container">
		<div class="frameT">
			<div class="frameTC">
				<div class="error-wrapper" id="error404">
					<div class="row">
						<div class="col-md-5 col-5">
							<img src="${context}/images/408error.png" height="137" alt="404 Error">
						</div>
						<div class="col-md-7 col-7">
							<p>Sorry, The time allowed for the login process has been
								exceeded.</p>
							<button class="btn" onclick="buttonclick()">Go to Login
								Page</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>