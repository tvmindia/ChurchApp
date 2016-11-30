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
            jsonResult = data;
        },
        processData: false,

        error: function () {
            $('#displaywait').hide();
            alert("Whoops something went wrong!");
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




///Function remove style after validating
function RemoveStyle() {
    try {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3,#ErrorBox4,#ErrorBox5').hide(1000);
    }
    catch (e) {

    }
}