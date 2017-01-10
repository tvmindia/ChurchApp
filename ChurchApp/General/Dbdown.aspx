<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dbdown.aspx.cs" Inherits="ChurchApp.General.Dbdown" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>GoChurch</title>
    <link rel="shortcut icon" type="image/png" href="../img/IconChurch.PNG" />
    <style>
        body{
            background-color:#F8ECE4;
            background-image:url('/img/slowrider.gif');
            background-repeat:no-repeat;
            background-position-x:100%;
            background-position-y:-69%;
        }

    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <img src="../img/dbError.png" style="top: 10%;position: relative;left:  45%;"/>
        <h1 style="position: relative;left: 35%;font-family:Magneto;">The Database Is Down</h1>
        <h3 style="position: relative;left: 31%;font-family:Magneto;">Our team is working on it please come back later</h3>
        <a href="../Login.aspx" style="position: relative;left: 31%;">Login</a>
    </div>
    </form>
    <footer style="position:fixed;bottom:3%">2017 © Thrithvam Technologies</footer>
</body>
</html>
