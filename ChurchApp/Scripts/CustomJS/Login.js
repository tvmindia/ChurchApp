﻿/// <reference path="E:\Appln\BoutiqiueTeq\Boutique\AdminPanel/Login.aspx" />
$("document").ready(function (e) {
   
    $("#password").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#btnlogin").click();
        }
    });
    $('.noty').click(function (e) {
        e.preventDefault();
        var options = $.parseJSON($(this).attr('data-noty-options'));
        noty(options);
    });

});//end of document.ready

function ForgotPassword() {
    $('#LoginBoxDiv').remove();
    var LoginDIv = $('#loginRowFluid');
    $('#loginRowFluid').removeClass("content");
    var html = ('<div class="content" id="EmailBox">'
        + '<h2>Enter your Email</h2>'
        + '<div class="" title="Email">'
        + '<input class="form-control form-control-solid placeholder-no-fix" name="Email" id="txtEmail" type="Email" onkeyup="return EmailValidation()"  autocomplete="off" placeholder="Email"/>'
        + '</div>'
        + '<div><img src="../img/ring.gif" style="padding-left:147px;border:0;max-width:24%;height:auto;vertical-align:middle;display:none;" id="Sendinggif"></div>'
        + '<div class="button-login">'     
        + '<a href="#" onclick="SendVerificationCode();" class="btn btn-primary loginbtn">Continue</a>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);
   
}

function SendVerificationCode() {
    
    $('#Sendinggif').show();
    var Email = $('#txtEmail');
    var EmailAddress = Email[0].value;
    var ds = {};
    var table = {};
    var Security = new Object();
    Security.Email = EmailAddress;
    var data = "{'LoginObj':" + JSON.stringify(Security) + "}";
    ds = getJsonData(data, window.location.pathname + "/VerificationCodeEmit");
    table = JSON.parse(ds.d);
    if (table.status == "true")
    {              
        $('#EmailBox').remove();
        MatchVetification(EmailAddress);
    }
    if (table.status == "false")
    {       
        var ptag = document.getElementById('lblerror');
        ptag.style.color = 'red';
        ptag.style.fontFamily = 'monaco';
        ptag.style.paddingLeft = "5px";
        ptag.innerHTML = 'The Email You Entered Is  InValid !';
    }
    return table;
}

function MatchVetification(EmailAddr)
{
    var HdnMail = document.createElement('input');
    HdnMail.setAttribute("type", "hidden");
    HdnMail.setAttribute("id", "HdnEmail");    
    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="content" id="VerifyBox">'
        + '<h2>Enter Verification Code</h2>'
        + '<div class="" title="Verification">'
        + '<input class="form-control form-control-solid placeholder-no-fix" name="VerificationCode" id="txtVerifyCode" type="password" autocomplete="off" placeholder="Verification Code"/>'
        + '</div><div style="font-family:monaco;padding-left:10px;font-size:14px;color:rosybrown"> ✉ CHECK Email For Verification Code</div>'
        + '<div class="button-login">'
        + '<button type="" id="btnlogin" onclick="VerifyCodeNow()" class="btn btn-primary loginbtn">Verify</button>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);
    LoginDIv.append(HdnMail);
    $('#HdnEmail').val(EmailAddr);
}

function VerifyCodeNow()
{
    
    var Email=$('#HdnEmail').val();
    var VerifCode = $('#txtVerifyCode');
    var VerificationCod = VerifCode[0].value;
    var ds = {};
    var table = {};
    var Security = new Object();
    Security.Email = Email;
    Security.VerifyCode = VerificationCod;
    var data = "{'LoginObj':" + JSON.stringify(Security) + "}";
    ds = getJsonData(data, window.location.pathname + "/VerifyCode");
    table = JSON.parse(ds.d);
    if (table.msg === "True") {
        $('#VerifyBox').remove();
        EnterPassword(table.UserID);
    }
   if(table.msg==='False'){
        var ptag = document.getElementById('lblerror');
        ptag.style.color = 'red';
        ptag.style.fontFamily = 'monaco';
        ptag.style.paddingLeft = "5px";
        ptag.innerHTML = 'The Verification Code Missmatch !';
   }
    else
   {
       if (table.msg!=='False'&&table.msg!=='True')
       {
           var ptag = document.getElementById('lblerror');
           ptag.style.color = 'red';
           ptag.style.fontFamily = 'monaco';
           ptag.style.paddingLeft = "5px";
           ptag.innerHTML = table.msg + '!';
       }
       
   }
}

function EnterPassword(UsrID) {
    
    var HdnUserID = document.createElement('input');
    HdnUserID.setAttribute("type", "hidden");
    HdnUserID.setAttribute("id", "HdnUserID");   
    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="content" id="NewPassword">'
        + '<h2>Enter New Password</h2>'
        + '<div class="" title="NewPassword">'
        + '<input class="form-control form-control-solid placeholder-no-fix" name="NPAss" id="txtPassword" type="password" autocomplete="off" placeholder="New Password"/>'
        + '</div>'
        + '<div class="" title="NewPassword">'
        + '<input class="form-control form-control-solid placeholder-no-fix" name="CPass" id="txtConfirmPassword" type="password" autocomplete="off" placeholder="Confirm Password"/>'
        + '</div>'
        + '<div class="button-login">'
        + '<button type="submit" id="btnlogin" onclick="UpdatePassword()" class="btn btn-primary loginbtn">Change Password</button>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p id="lblerror"></p></div');
    LoginDIv.append(html);
    LoginDIv.append(HdnUserID);
    $('#HdnUserID').val(UsrID);
}

function UpdatePassword()
{
    
    var UsrID = $('#HdnUserID').val();
    var Passwd = $('#txtPassword').val();
    var CPasswd = $('#txtConfirmPassword').val();
    
    if (Passwd === CPasswd)
    {
        
        var ds = {};
        var table = {};
        var Security = new Object();
        Security.Password = CPasswd;
        Security.UserID = UsrID;
        var data = "{'LogObj':" + JSON.stringify(Security) + "}";
        ds = getJsonData(data, window.location.pathname + "/UpdatePassword");
        table = JSON.parse(ds.d);

        if (table.status == "True") {
            $('#NewPassword').remove();
            Succes();
        }
        else {
            var ptag = document.getElementById('lblerror');
            ptag.style.color = 'red';
            ptag.style.fontFamily = 'monaco';
            ptag.style.paddingLeft = "5px";
            ptag.innerHTML = table.d;
        }
    }
    else
    {
        var ptag = document.getElementById('lblerror');
        ptag.style.color = 'red';
        ptag.style.fontFamily = 'monaco';
        ptag.style.paddingLeft = "5px";
        ptag.innerHTML = 'Passwords MissMatch';
    }
    setTimeout(function () {
        window.location.reload();
    }, 20000);
       
}

function Succes() {
    var LoginDIv = $('#loginRowFluid');
    var html = ('<div class="content" id="ChangedPassword">'
        + '<h2>Password Changed Successfully..</h2>'
        + '<div class="clearfix"></div>'
        + '<h3></h3><p><a href="../Login.aspx" style="color:blue;">Click Here</a> to Login</p></div');
    LoginDIv.append(html);
}
function EmailValidation() {
    
    var Email = $('#txtEmail').val();
    var ptag = document.getElementById('lblerror');
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (emailReg.test(Email)) {
    //if (Email.match(/@/)) {
        var ds = {};
        var table = {};
        var Users = new Object();
        Users.Email = Email;

        var data = "{'UserObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, window.location.pathname+"/EmailValidation");
        table = JSON.parse(ds.d);
        if (table === 1) {
            
            ptag.style.color = 'green';
            ptag.style.fontFamily = 'monaco';
            ptag.style.paddingLeft = "7px";
            ptag.innerHTML = "Email is Valid Continue";
            $('#Sendinggif').hide();
            return false;
        }
        if (table == 0) {
            
            ptag.style.color = 'red';
            ptag.style.fontFamily = 'monaco';
            ptag.style.paddingLeft = "7px";
            ptag.innerHTML = "Email is Invalid";
           
            return false;
        }
    }
    else {
        ptag.innerHTML = " ";
        $('#Sendinggif').show();
    }
    return false;
}