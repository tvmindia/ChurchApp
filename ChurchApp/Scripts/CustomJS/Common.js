//The function Dynamically append button images and click functions as per the programmer privillage
function Dynamicbutton(ID, Keyword, Event) {    
    switch (Keyword) {
        case "Add":
            $('#' + ID + ' img').attr('src', '/img/add.PNG');
            $('#' + ID).attr('onclick', Event + '();');
            $('#' + ID).attr('title', 'Add New');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "AddCancel":
            $('#' + ID + ' img').attr('src', '/img/add.PNG');
            $('#' + ID).removeAttr("title")
            $('#' + ID).removeAttr("onclick")
            $('#' + ID).attr('class', 'rss');
            break;
        case "Save":
            $('#' + ID + ' img').attr('src', '/img/save.PNG');
            $('#' + ID).attr('onclick', Event + '(this);');
            $('#' + ID).attr('title', 'Save');
            $('#' + ID).attr('class', 'facebook saveAll');
            break;
        case "SaveCancel":
            $('#' + ID + ' img').attr('src', '/img/save.PNG');
            $('#' + ID).removeAttr("title")
            $('#' + ID).removeAttr("onclick")
            $('#' + ID).attr('class', 'rss');
            break;
        case "Edit":
            $('#' + ID + ' img').attr('src', '/img/edit.PNG');
            $('#' + ID).attr('onclick', Event + '(name);');
            $('#' + ID).attr('title', 'Edit');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "EditCancel":
            $('#' + ID + ' img').attr('src', '/img/edit.PNG');
            $('#' + ID).removeAttr("title")
            $('#' + ID).removeAttr("onclick")
            $('#' + ID).attr('class', 'rss');
            break;
        case "Back":
            $('#' + ID + ' img').attr('src', '/img/back.PNG');
            $('#' + ID).attr('onclick', Event + '();');
            $('#' + ID).attr('title', 'Back');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "BackCancel":
            $('#' + ID + ' img').attr('src', '/img/back.PNG');
            $('#' + ID).removeAttr("title");
            $('#' + ID).removeAttr("onclick");
            $('#' + ID).attr('class', 'rss');
            break;
        case "Reset":
            $('#' + ID + ' img').attr('src', '/img/reset.PNG');
            $('#' + ID).attr('onclick', Event + '(name);');
            $('#' + ID).attr('title', 'Reset');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "ResetCancel":
            $('#' + ID + ' img').attr('src', '/img/reset.PNG');
            $('#' + ID).removeAttr('onclick');
            $('#' + ID).removeAttr('title');
            $('#' + ID).attr('class', 'rss');
            break;
        case "SendNoti":
            $('#' + ID + ' img').attr('src', '/img/sentmail.PNG');
            $('#' + ID).attr('onclick', Event + '();');
            $('#' + ID).attr('title', 'Send Notification');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "SendNotiCancel":
            $('#' + ID + ' img').attr('src', '/img/sentmail.PNG');
            $('#' + ID).removeAttr("title")
            $('#' + ID).removeAttr("onclick")
            $('#' + ID).attr('class', 'rss');
            break;
        case "PushNoti":
            $('#' + ID + ' img').attr('src', '/img/notyfi.PNG');
            $('#' + ID).attr('onclick', Event + '();');
            $('#' + ID).attr('title', 'Push Notification');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "PushNotiCancel":
            $('#' + ID + ' img').attr('src', '/img/notyfi.PNG');
            $('#' + ID).removeAttr("title")
            $('#' + ID).removeAttr("onclick")
            $('#' + ID).removeAttr("data-target")
            $('#' + ID).attr('class', 'rss');
            break;
        case "Delete":
            $('#' + ID + ' img').attr('src', '/img/delete.PNG');
            $('#' + ID).attr('onclick', Event + '(name);');
            $('#' + ID).attr('title', 'Delete');
            $('#' + ID).attr('class', 'facebook');
            break;
        case "DeleteCancel":
            $('#' + ID + ' img').attr('src', '/img/delete.PNG');
            $('#' + ID).removeAttr("title");
            $('#' + ID).removeAttr("onclick");
            $('#' + ID).removeAttr("name");
            $('#' + ID).attr('class', 'rss');
            break;
        default:
            //noty({ text: Messages.UpdationFailure, type: 'error' });
            break;
    }
}
//Scroll the page respect to the element position passing element ID
function Animateto(ID) {
    $('html, body').animate({
        scrollTop: $("#" + ID).offset().top
    }, 500);
}

// function Allowing only alphabets in Textbox 
function isnotNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32) || (charCode == 08) || (charCode == 46)) {
        return true;
    }
    return false;
}
// function Allowing only numbers in Textbox
function CustomAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = " Alert !";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<input type="button" class="btn btn-danger" onclick="Alert.ok()" value="OK"/>';
    }
    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 47 && charCode < 58)) {
        return true;
    }
    return false;
}
function isMobileNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 47 && charCode < 58) || (charCode == 40) || (charCode == 41) || (charCode == 32) || (charCode == 43)) {
        return true;
    }
    return false;
}
var validFiles = ["bmp", "gif", "png", "jpg", "jpeg"];
function OnUpload(f) {
    //document.getElementById('<%=Errorbox.ClientID %>').style.display = "none";
 
    var obj = f;
    var source = obj.value;
    var ext = source.substring(source.lastIndexOf(".") + 1, source.length).toLowerCase();
    for (var i = 0; i < validFiles.length; i++) {
        if (validFiles[i] == ext)

            break;
    }
    if (i >= validFiles.length) {
        Alert.render("Format Not Supporting\n\n Try:" + validFiles.join(", "));
        f.value = '';
        $('[data-dismiss="modal"]').click();
    }
    return true;
}
//Date validation is the date is valid
function Datecheck(DateNow) {
 
    var Months = [{ month: "Jan", value: "01" },
        { month: "Feb", value: "02" },
        { month: "Mar", value: "03" },
        { month: "Apr", value: "04" },
        { month: "May", value: "05" },
        { month: "Jun", value: "06" },
        { month: "Jul", value: "07" },
        { month: "Aug", value: "08" },
        { month: "Sep", value: "09" },
        { month: "Oct", value: "10" },
        { month: "Nov", value: "11" },
        { month: "Dec", value: "12" }];
    var date = DateNow.split("-");
    var day = date[0];
    var month = date[1];
    for(var i=0;i<Months.length;i++)
    {
        if(Months[i].month==month)
        {
            month = Months[i].value;
        }
    }
    var year =date[2];
    var myDate = new Date(year, month - 1, day);
    return myDate;
}
function BlockSpecialCharacters(event) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
function scriptvalidate() {

    var ictrl;
    var check = 0;
    var regex = /^[a-zA-Z0-9,.;:"'@#$%*+! ]{0,255}$/;
    var ctrl = [];
    var domelement = document.querySelectorAll("input[type=text],textarea");
    var domcount = 0;
    for (domcount; domcount < domelement.length; domcount++) {
        ctrl.push(domelement[domcount].value);
    }

    for (ictrl = 0; ictrl < ctrl.length; ictrl++) {
        if (regex.test(ctrl[ictrl])) {
            check = 1;
        }
        else {
            $('#rowfluidDiv').show();
            $('.alert-danger').show();
            $('.alert-error strong').text("We can't accept brackets or parentheses");
            check = 0;
            return false;
        }
    }
    if (check == 1) {
        return true;
    }
}
function htmlerror()
{
    var html = ('<header class="site-header"><svg viewBox="0 0 1000 200" preserveAspectRatio="none" class="site-header-background">'
        + '<defs><linearGradient id="header-gradient" x2="0%" y2="100%"><stop offset="0%" stop-color="#344964"></stop><stop offset="100%" stop-color="#172844"></stop></linearGradient>'
       + '</defs><path class="jagged-top" id="jagged-top" fill="url(#header-gradient)" d="M-4,-4 L1004,-4 L1004,100 L873,133 L777,189 L598,149 L291,138 L109,150 L-4,100 L-4,-4 Z"></path>'
  +'</svg></svg></header><header class="mega-header"><h1 class="p-name">SOMTHING WRONG, TRY AGAIN LATER!</h1><svg viewBox="0 0 1000 200" preserveAspectRatio="none" class="article-header-background">'
  +'<defs><linearGradient id="article-gradient" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFF1BA"></stop><stop offset="100%" stop-color="white"></stop>'
    +'</linearGradient></defs><path class="jagged-top-of-article" id="jagged-top-of-article" fill="url(#article-gradient)" d="M1004,100 L966,143 L619,180 L511,126 L234,131 L118,151 L-4,100 L-4,200 L1004,200 L1004,100 Z"></path>'
+'</svg>© Thrithvam Technologies</header>');
    return html;
}


function postBlobAjax(formData, page) {
    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);
    
    $('#displaywait').show();
    var jsonResult = {};
    $.ajax({
        type: "POST",
        url: page,
        contentType: false,
        headers: { 'Cache-Control': 'no-cache' },
        async: false,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        traditional: true,

        success: function (data) {
            
            $('#displaywait').hide();
            jsonResult = JSON.parse(data);
            if (jsonResult.statusCode == '555') {
                window.location.replace(window.location.protocol + "//" + window.location.host + jsonResult.url);
            }
        },
        processData: false,
        error: function (xmlhttprequest, textstatus, message) {
            
            $('#displaywait').hide();
            $('body').empty();
            $('body').append(htmlerror());
            window.history.pushState("", "", "/Opps!");
        //noty({ text:  message.code + ', ' + xmlhttprequest.statusText, type: 'error' })

    }
    });
    
    return jsonResult;
}
function getJsonData(data, page) {
    
    var jsonResult = {};
    $('#displaywait').show();
        $.ajax({
            type: "post",
            url: page,
            data: data,
            delay: 1,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                
                if (data != null) {
                    var vald = JSON.parse(data.d);
                    if (vald.statusCode == '555') {
                        window.location.replace(window.location.protocol + "//" + window.location.host + vald.url);
                    }
                }

                jsonResult = data;
            },
            error: function (xmlhttprequest, textstatus, message) {
                
                //message.code will be:-timeout", "error", "abort", and "parsererror"

                $('body').empty();
                $('body').attr('style', 'background-color:#A2BDCE;')
                $('body').append(htmlerror());
                window.history.pushState("", "", "/Login.aspx");
                //noty({ text: message.code + ', ' + xmlhttprequest.statusText, type: 'error' })

            }

        }).always(function () {
            $('#displaywait').hide();
        });
    return jsonResult;
}

function ConvertJsonToDate(jsonDate) {
    debugger;
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "Jan", "Feb", "Mar",
                      "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct",
                      "Nov", "Dec"
        ];
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}
function ConvertJsonToDateTextbox(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "01", "02", "03",
                      "04", "05", "06", "07",
                      "08", "09", "10",
                      "11", "12"
        ];
     
        if (day < 10)
        {
            day = "0" + day;
        }
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}




///Function remove style after validating
function RemoveStyle() {
    try {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3,#ErrorBox4,#ErrorBox5').hide(1000);
    }
    catch (e) {

    }
}

//--------------* Pages * ---------------//
var Pages = {
    Home: "Home",
    Dashboard: "DashBoard",
    Priests: "Priests",
    Login: "Login",
    Events: "Events",
    FamilyUnits: "Family Units",
    Gallery: "Gallery",
    Institutions: "Institutions",
    PiousInstitution: "Pious Institutions",
    MassShedules: "Mass Shedules",
    Novenas: "Novenas",
    Notifications: "Notifications",
    ImportExcel:"Import Excel"
}

//--------------* Messages * ---------------//
var Messages = {
    FileFormaterror: "Please select a valid Image",

    Html5: "The File APIs are not fully supported in this browser.",

    MandatoryFields: "Please fill out all the fields",
    EmailInstruction: "Please check your email for a message with verification code.Your code is 4 digit long . We sent code to ",
    VerificationCodeMismatch: "Passwords does not match. Please confirm passwords are Same",
    InvalidEmailID: "Enter A valid Email-ID",
    TimeExpired: "Time expired",
    IncorrectVerificationCode: "Verification Code is invalid",
    ErrorNumber: "ErrorNumber=",
    Imagesupport: "The Image Is not Supporting Save a new one",
    Validation:"* Some fields are empty !",
    ExceptionMsgCaption: "Exception!",
    SuccessMsgCaption: "Success!",
    WarningMsgCaption: "Warning!",
    InsertionFailureMsgCaption: "Somthing Wrong try Again!",
    FailureMsgCaption: "Failure!",
    AlreadyExistsMsgCaption: "Already exists!",
    Confirm: "Please Confirm!",
    ShedulleAdded: "The schedule already added",
    SelectDay: "Select days you preffer",
    SelectPatron: "Select Patron includes",
    LoginSuccess: "Successfully logged in",
    HeadChange: 'Family Head changed, Member details Successfully Edited',
    HeadChangeInsert: 'Family Head changed, Member details Successfully Added',
    InsertionSuccessFull: "Successfully Saved",
    InsertionFailure: "Not Successfuly Saved Try Again",
    UpdationSuccessFull: "Successfully Edited",
    HeadExist:'Operation Failed! The member you trying to delete belongs to Head',
    UpdationFailure: "Edit Failed Try Again Later",
    DeletionSuccessFull: "Deleted Successfully",
    SuccessfulUpload: "Successfully Uploaded",
    SavedSuccessfull: "Successfully Saved!",
    PriestAdded: "Priest Added Successfully",
    RoleAdded:"The Role already exist",
    VicarExist: "You are not permitted to add multiple Vicars !",
    ProductAddSuccessfull: "New Product Created Successfully.",
    DboInvalid: "Rejected - Invalid Data Entitys date of birth",
    OrdinationInvalid: "Rejected - Invalid Data Entitys ordination date",
    EndInvalid: "Rejected - Invalid Data Entitys End date",
    InvalidStartDate: "Rejected - Invalid Data Entitys Start Date !",
    InvalidExpiry: "Rejected - Invalid Data Entitys End/Expiry Date !",
    LoginFailed: "User Name / Password is wrong!",
    LoginNameExists: "Login name already exists!",
    LoginNameExistsUpdated: "Successfully Edited! Login name already exists",
    PasswordNotMatch: "Password does not match",
    SelectPosition: "Please Select Position",
    SelectMember:"Please Select Member",
    SelectExistingPatron:"Please select existing patron",
    Warning: "Warning Msg ",
    DeletionFailure: "Deletion Not Successful ",
    DeletionFailureUsed:"Deletion Not Successful! It is beeing used",
    SavingFailure: "Saving Not Successful ",
    AlreadyUsedForDeletion: "Already used . Can't be deleted",
    AlreadyUsedForUpdation: "Already used . Can't be changed",
    MailSendSuccessfully: "Mail Send Successfully",
    ProductAddFailure: "Product Creation was not Successfull.",
    
    ErrorFix: "Bug Rectified Successfully.",
    ErrorFixNOT: "Operation was Not Successfull.",

    ProductReviewEmpty: "No Items To Display.",
    ReviveSucces: "Restored Product Successfully.",
    ReviveNotSuccess: "Restoring Product was not Successfull.",

    HtmlFileFormatError: "Please select html file",
    OperationDuplicateFailure: "Operation Failure... Duplicate Entry!",
    MemeberAlreadyExists: "Member with the same name already exists",
    NotificationDateChecking: "Expiry date should be greater than start date",

    AlbumUploadInsert: "Album Uploaded successfully",
    AlbumUploadFailure: "Upload was not successfull",
    AlbumUpload: "Uploaded successfully",
    BrowserSupport: "Browser does not HTML5,Please Upgrade!",
    AlbumNameExists:"Album with the same name already exists",

    TimeSelect: " Please Select Time",
    DaySelect: "Please Select a Day",

    ExcelUploadSuccess:"Upload Successfully Finished",
    ExcelUploadFailure: "Uploading Failure",

    BugNotFixed: "Please fix the Bug..!!!",
    SelectBug: "Failure..!!! Please Select a Bug to Edit",

    NotificationInitiated: "Initiated processing notifications",
    NotificationInserted: "Event added to notificaition section"
}