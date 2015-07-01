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
<link href="${context}/app/images/saama-logo.png" rel="shortcut icon">
<!-- CSS library -->
<link href="${context}/vs_lib/bootstrap/3.1.1/bootstrap.min.css" rel="stylesheet"
	type="text/css">
<!-- Custom CSS -->

<style>
html,body {
	height: 100%;
	background: url(${context}/app/images/content_bg.jpg);
}

div.frameT {
	display: table;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	margin: 0;
	padding: 0;
	position: absolute;
}

div.frameTC {
	display: table-cell;
	margin: 0;
	padding: 0;
	vertical-align: middle;
}

.navbar-inverse {
	background: none;
	border: 0;
	border-radius: 0;
	border-bottom: 6px solid #6C6C6C;
}

header {
	position: fixed;
}

.navbar-inverse .navbar-brand {
	padding: 7px 5px;
}

.error-wrapper {
	height: 150px
}

.error-wrapper img {
	float: right
}

.error-wrapper p {
	font-size: 25px;
	color: #c12a10;
	line-height: 40px;
	padding-left: 45px;
	margin-top: 10px
}

.error-wrapper .btn {
	background-color: #c12a10;
	margin: 5px 0 0 45px;
	color: #fff;
	font-weight: bold;
}
</style>
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
							<img src="${context}/app/images/404error.png" height="137" alt="404 Error">
						</div>
						<div class="col-md-7 col-7">
							<p>
								Sorry, the page you requested could<br /> not be found.
							</p>
							<button class="btn" onclick="buttonclick()">Go to Home
								Page</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>