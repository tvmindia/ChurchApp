//function EmailValidation(this_Obj) {
//    debugger;
//    var value;
//    try {
//        if (this_Obj.value != "") {

//            var Email = this_Obj.value;
//        }
        
       
//        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//        if (emailReg.test(Email)) {
//            var txtA = document.getElementById(this_Obj.id);
//            txtB.style.backgroundImage = "url(' ')";
//            txtA.style.style.backgroundColor = "white!important";
            
//        }
//        else {
//            var txtB = document.getElementById(this_Obj.id);
//            txtB.style.backgroundImage = "url('../img/invalid.png')";
//            txtB.style.backgroundPosition = "95% center";
//            txtB.style.backgroundRepeat = "no-repeat";

//        }
//    }
//    catch (e) {
//        var ExceptionTrack = new Object();
//        ExceptionTrack.Description = e.message;
//        ExceptionTrack.Module = "People";
//        ExceptionTrack.Method = "EmailValidation";
//        ExceptionTrack.ErrorSource = "JavaScript";
//        ExceptionTrack.IsMobile = false;
//        //InsertException(ExceptionTrack);
//    }
//    //return false;
//}
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
    if (charCode > 31 && (charCode < 48 || (charCode > 57) || (charCode == 08))) {
        return false;
    }
    return true;
}
var validFiles = ["bmp", "gif", "png", "jpg", "jpeg"];
function OnUpload(f) {
    //document.getElementById('<%=Errorbox.ClientID %>').style.display = "none";
    debugger;
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
    var date = DateNow.substring(0, 2);
    var month = DateNow.substring(3, 5);
    var year = DateNow.substring(6, 10);
    var myDate = new Date(year, month - 1, date);
    return myDate;
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
        },
        processData: false,

        error: function () {
            $('#displaywait').hide();
            noty({text:'Somthing went wrong',type:'error'})
        }
    });
    
    return jsonResult;
}



function getJsonData(data, page) {
   
    var jsonResult = {};
    $('#displaywait').show();
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {
       
        if (data != null)
        {
            var vald = JSON.parse(data.d);
            if(vald.statusCode=='555')
            {
                window.location.replace(window.location.protocol + "//" + window.location.host + vald.url );
            }
        }
        $('#displaywait').hide();
        jsonResult = data;
    });
    return jsonResult;
}

function ConvertJsonToDate(jsonDate) {
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
        debugger;
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
    Notifications: "Notifications"
}

//--------------* Messages * ---------------//
var Messages = {
    FileFormaterror: "Please select a valid Image",
    exists: "The operation can’t be completed because the category is in use .",
    existsBoutique: "The operation can’t be completed because the Boutique is in use .",

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
    InsertionSuccessFull: "Successfully Inserted",
    InsertionFailure: "Not Successfuly Saved Try Again",
    UpdationSuccessFull: "Successfully Edited",
    UpdationFailure: "Edit Failed Try Again Later",
    DeletionSuccessFull: "Deleted Successfully",
    SuccessfulUpload: "Successfully Uploaded",
    SavedSuccessfull: "Successfully Saved!",
    PriestAdded: "Priest Added Successfully",
    VicarExist: "You are not permitted to add multiple Vicars !",
    ProductAddSuccessfull: "New Product Created Successfully.",
    DboInvalid: "Rejected - Invalid Data Entitys date of birth",
    OrdinationInvalid: "Rejected - Invalid Data Entitys ordination date",
    InvalidStartDate: "Invalid Start Date !",
    InvalidExpiry: "Invalid End/Expiry Date !",
    LoginFailed: "User Name / Password is wrong!",
   
   
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
    AlbumUpload: "Uploaded successfully"
}