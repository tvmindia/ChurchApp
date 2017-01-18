<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ChurchApp.Login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>GoChurch</title>
    <link rel="shortcut icon" type="image/png" href="../img/IconChurch.PNG" />
     <!-- start: JavaScript-->
        <script src="../Scripts/jquery-1.12.3.min.js"></script>
		<script src="../Scripts/bootstrap.min.js"></script>
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
	<link href="../CSS/style.css?ve=123" rel="stylesheet"/>
	<link href="../CSS/style-responsive.css" rel="stylesheet"/>
	<link href="../CSS/googleapiFont.css" rel="stylesheet" />
    <script src="Scripts/CustomJS/Common.js"></script>
    <script src="Scripts/CustomJS/Login.js"></script>
    <link href="CSS/CustomCSS/Login.css" rel="stylesheet" />
	<!-- end: CSS -->

    <style type="text/css">
        body { background: url(img/bg.jpg) no-repeat !important;background-size:cover !important;}
            .errormsg{color:red;margin:0;font-size: 13px;}
            .btn{border-color:#4db3a5;background-color:#4db3a5;}
            .btn:hover{background-color:#19ebcf;}
            .btn:focus{background-color:#19ebcf;}
    </style>


</head>
<body class=" login">
        
        <!-- BEGIN LOGIN -->
        <div class="content" id="loginRowFluid">
            <input id="Hidden1" runat="server" type="hidden" /> 
            <div id="LoginBoxDiv">

            <!-- BEGIN LOGIN FORM -->
            <form class="login-form" id="Loginform" clientidmode="static" runat="server">
                <h3 class="form-title font-green">Sign In</h3>
                <asp:Label class="errormsg"  ID="lblmsg" runat="server" Text=""></asp:Label> 
                <div class="clearfix"></div>
                <div class="form-group">
                    <input class="form-control form-control-solid placeholder-no-fix" type="text" id="username" runat="server" autocomplete="off" placeholder="Username" name="username"/> </div>
                <div class="form-group">
                    <input class="form-control form-control-solid placeholder-no-fix" type="password" id="password" runat="server" autocomplete="off" placeholder="Password" name="password"/> </div>
                <div class="">
                    <button type="submit" id="btnlogin" class="btn uppercase loginbtn" autofocus>LOGIN</button>                  
               
                    <a href="#" onclick="ForgotPassword()" id="forget-password" class="forget-password">Forgot Password?</a>
                </div>
               
            </form>
                
            <!-- END LOGIN FORM -->
            </div>
        </div>
        <div class="copyright"> 2017 © Thrithvam Technology</div>

</body>
</html>
