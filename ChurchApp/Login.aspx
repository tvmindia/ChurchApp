﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ChurchApp.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

     <!-- start: JavaScript-->
        <script src="../Scripts/jquery-1.12.3.min.js"></script>
		<%--<script src="../Scripts/jquery-1.9.1.min.js"></script>--%>
	    <script src="../Scripts/jquery-migrate-1.0.0.min.js"></script>
	
		<script src="../Scripts/jquery-ui-1.10.0.custom.min.js"></script>
	
		<script src="../Scripts/jquery.ui.touch-punch.js"></script>
	
		<script src="../Scripts/modernizr.js"></script>
	
		<script src="../Scripts/bootstrap.min.js"></script>
	    <script src="../Scripts/retina.js"></script>
        <script src="../Scripts/custom.js"></script>
      

	<!-- end: JavaScript-->

    <!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<!-- end: Mobile Specific -->
	
	<!-- start: CSS -->
    <%-- <link href="../fonts/fontawesome-webfont-62877.ttf" rel="stylesheet"/>
    <link href="../fonts/fontawesome-webfont-62877.woff" rel="stylesheet"/>--%>
   	<link  href="../CSS/bootstrap.min.css" rel="stylesheet"/>
	<link href="../CSS/bootstrap-responsive.min.css" rel="stylesheet"/>
	<link href="../CSS/style.css" rel="stylesheet"/>
	<link href="../CSS/style-responsive.css" rel="stylesheet"/>
	<link href="../CSS/googleapiFont.css" rel="stylesheet" />
   
	<!-- end: CSS -->

    <style type="text/css">
			body { background: url(img/bg-login.jpg) !important; }
    </style>


</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class="container-fluid-full">
		<div class="row-fluid">
					
			<div class="row-fluid">
				<div class="login-box">
					<div class="icons">
						<a href="index.html"><i class="halflings-icon home"></i></a>
						<a href="#"><i class="halflings-icon cog"></i></a>
					</div>
					<h2>Login to your account</h2>
					
						
							
							<div class="input-prepend" title="Username">
								<span class="add-on"><i class="halflings-icon user"></i></span>
								<input class="input-large span10" name="username" id="username" type="text" placeholder="type username"/>
							</div>
							<div class="clearfix"></div>

							<div class="input-prepend" title="Password">
								<span class="add-on"><i class="halflings-icon lock"></i></span>
								<input class="input-large span10" name="password" id="password" type="password" placeholder="type password"/>
							</div>
							<div class="clearfix"></div>
							
							<label class="remember" for="remember"><input type="checkbox" id="remember" />Remember me</label>

							<div class="button-login">	
								<button type="submit" class="btn btn-primary">Login</button>
							</div>
							<div class="clearfix"></div>
					
					<hr>
					<h3>Forgot Password?</h3>
					<p>
						No problem, <a href="#">click here</a> to get a new password.
					</p>	
				</div><!--/span-->
			</div><!--/row-->
			

	</div><!--/.fluid-container-->
	
		</div><!--/fluid-row-->
	
	






    
    </div>
    </form>
</body>
</html>