
//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'ntc';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table

var MaxCharacterLimit = 200;
//--------------------------------//


$("document").ready(function (e) {
   
   
    BindLatestNotices();

    //--Limit Notification Content 
    $('#txtnotificationCOntent').keypress(function (e) {

        if (this.value.length == MaxCharacterLimit) {
            e.preventDefault();
            $("#lblAlreadyNotificationSend").show();
            $("#lblAlreadyNotificationSend").text("Maximum " + MaxCharacterLimit + " characters");
        }

        else {
            $("#lblAlreadyNotificationSend").text("Already Notification added");
            $("#lblAlreadyNotificationSend").hide();

        }
    });


    $('#txtnotificationCOntent').keydown(function (e) {
        if (this.value.length == MaxCharacterLimit) {
            $("#lblAlreadyNotificationSend").text("Already Notification added");
            $("#lblAlreadyNotificationSend").hide();
        }

    });

    $("#rdoNotificationYes").click(function () {
        debugger;
        $("#divNotificationDates").show();

        $("#DivNotificationContent").show();


        //--- Making of notification content by trimming description after 200 characters 

        if ($("#txtDescription").val() != "") {

            if ($("#txtDescription").val().length > MaxCharacterLimit) {
                $("#txtnotificationCOntent").val($("#txtDescription").val().substring(0, MaxCharacterLimit));
            }

            else {
                $("#txtnotificationCOntent").val($("#txtDescription").val());
            }
        }



    });

    $("#rdoNotificationNo").click(function () {

        $("#divNotificationDates").hide();
        $("#DivNotificationContent").hide();
    });

    $("#ddlNoticeType").select2({
        placeholder: "Choose Types",
        allowClear: true,
        data: BindNoticeTypeDropDown()
    });

    $('#btnSave').click(function (e) {
        $('#rowfluidDiv').show();

        debugger;

        var IsValid = NoticeValidation();
        if (IsValid) {

            debugger;
            if ($("#ddlNoticeType").val() != "" && $("#ddlNoticeType").val() != null) {


                var AppImgURL = '';
                var NoticeID = $("#hdfNoticeID").val();

                //-----------------------INSERT-------------------//

                if (NoticeID == null || NoticeID == "") {

                    var Notices = new Object();
                    var guid = createGuid();

                    //DeletedImgID = imageId;
                    //DeletedImgPath = imgPath

                    if (guid != null) {

                        var imgresult = "";
                        var _URL = window.URL || window.webkitURL;
                        var formData = new FormData();
                        var imagefile, logoFile, img;

                        if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                            var formData = new FormData();
                            var tempFile;
                            if ((tempFile = $('#UpNotice')[0].files[0]) != undefined) {
                                tempFile.name = guid;
                                formData.append('NoticeAppImage', tempFile, tempFile.name);
                                formData.append('createdby', 'SHAMILA');
                            }
                            formData.append('ActionTyp', 'NoticeAppImageInsert');
                            AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                            Notices.imageId = guid;
                        }
                    }

                  
                    Notices.noticeName = $("#txtNoticeName").val();
                    Notices.description = $("#txtDescription").val();
                    Notices.noticeType = $("#ddlNoticeType").val();
                    
                   // Notices.noticeId = guid;
                   
                    result = InsertNotice(Notices);

                    if (result.status == "1") {
                        //$('#rowfluidDiv').show();
                        //$('.alert-success').show();
                        //$('.alert-success strong').text("Notice Added Successfully");
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = result.noticeId;
                            Notification.caption = Notices.noticeName;
                            Notification.description = Notices.description;
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }
                            InsertNotification(Notification);
                        }
                    }
                    if (result.status != "1") {
                        //$('#rowfluidDiv').show();
                        //$('.alert-error').show();
                        //$('.alert-error strong').text("Saving Not Successful");
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                    }

                    BindNotices();
                    // ClearControls();
                    $("#hdfNoticeID").val(result.noticeId);

                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                        imageId = Notices.imageId;
                        imgPath = AppImgURL;

                        DeletedImgID = imageId;
                        DeletedImgPath = imgPath;
                    }

                    debugger;
                 //   SetControlsInNewNoticeFormat();

                }
                    //-----------------------UPDATE-------------------//
                else {
                    var Notices = new Object();
                    Notices.noticeName = $("#txtNoticeName").val();
                    Notices.description = $("#txtDescription").val();
                    Notices.noticeType = $("#ddlNoticeType").val();
                    Notices.noticeId = $("#hdfNoticeID").val();;
                    Notices.imageId = imageId;

                    DeletedImgID = imageId;
                    DeletedImgPath = imgPath

                    var guid = createGuid();
                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                        var formData = new FormData();
                        var tempFile;
                        if ((tempFile = $('#UpNotice')[0].files[0]) != undefined) {
                            tempFile.name = guid;
                            formData.append('NoticeAppImage', tempFile, tempFile.name);
                            formData.append('GUID', guid);
                            formData.append('createdby', 'SHAMILA');
                        }
                        formData.append('ActionTyp', 'NoticeAppImageInsert');
                        AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        Notices.imageId = guid;
                    }

                    result = UpdateNotice(Notices);

                    if (result.status == "1") {
                        //$('#rowfluidDiv').show();
                        //$('.alert-success').show();
                        //$('.alert-success strong').text("Notice Edited Successfully");
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        if (DeletedImgID != '' && (((imagefile = $('#UpNotice')[0].files[0]) != undefined))) {
                            var AppImages = new Object();
                            AppImages.appImageId = DeletedImgID;
                            DeleteAppImage(AppImages);

                            if (DeletedImgPath != '') {
                                DeleteFileFromFolder(DeletedImgPath);
                            }
                        }

                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = Notices.noticeId;
                            Notification.caption = Notices.noticeName;
                            Notification.description = Notices.description;
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }

                            InsertNotification(Notification);
                        }

                    }
                    if (result.status != "1") {
                        //$('#rowfluidDiv').show();
                        //$('.alert-error').show();
                        //$('.alert-error strong').text("Saving Not Successful");
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                    }

                    BindNotices();
                    $("#hdfNoticeID").val(Notices.noticeId);

                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined))
                    {
                        imageId = Notices.imageId;
                        imgPath = AppImgURL;

                        DeletedImgID = imageId;
                        DeletedImgPath = imgPath;
                    }

                  //  SetControlsInNewNoticeFormat();

                }
            }

            else {
                alert("Please select a type");
            }
        }
       
    });

    $('#btnCancel').click(function (e) {
       
        //  $("#NoticeEditDivBox").hide();
        debugger;


        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();

        var NoticeID = $("#hdfNoticeID").val();

        if (NoticeID == null || NoticeID == "" ) //Add
        {
            AddNewNoticeFormat();
        }
        else//Edit
        {
            
            EditOnClick(NoticeID);
        }

        $('#UpNotice')[0].files[0] = null;

        RemoveStyle();
    });

    $('#btnDelete').click(function (e) {
        debugger;

        var deleteConirm = confirm("Want to delete?");
        debugger;

        if (deleteConirm) {

            debugger;

            var NoticeID = $("#hdfNoticeID").val();

            var Notices = new Object();
            Notices.noticeId = NoticeID;

            var DeletionStatus = DeleteNotice(Notices);

            if (DeletionStatus.status == "1") {
                //$('#rowfluidDiv').show();
                //$('.alert-success').show();
                //$('.alert-success strong').text("Notice Deleted Successfully");
                noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                var AppImages = new Object();
                AppImages.appImageId = imageId;
                DeleteAppImage(AppImages);

                DeleteFileFromFolder(imgPath);
            }
            else {
                //$('#rowfluidDiv').show();
                //$('.alert-error').show();
                //$('.alert-error strong').text("Deletion Not Successful");
                noty({ text: Messages.DeletionFailure, type: 'error' });
            }

            BindNotices();
            SetControlsInNewNoticeFormat();

        }
        else {
            return false;
        }
    });

    //------------- * LATEST Events view more,Back  *------------//

    //VIEW MORE Click Click of LATEST Events
    $(".aViewMore").live({

        click: function (e) {

            debugger;

            BindNotices();

            $(".aBack").show();
            $(".aViewMore").hide();

            //  $(".aViewMore").style.display = "none!important";


           // $("#divOldEvents").hide();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

        }
    });


    //BACK Click of LATEST Events
    $(".aBack").live({

        click: function (e) {

            BindLatestNotices();

            $(".aBack").hide();
            $(".aViewMore").show();

           // $("#divOldEvents").show();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

        }
    });



    $('input:text').click(
    function () {
        RemoveStyle();
    });
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value != "") {
        debugger;
        $('#NoticeEdit').remove();
    }

});
//------------End of document ready----------------//


//General
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#NoticePreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function RemoveStyle() {
    debugger;
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}

function NoticeValidation() {
    debugger;
    $('#Displaydiv').remove();
    var Name = $('#txtNoticeName');
    //   var Description = $('#txtDescription');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
      //  ,{ id: Description[0].id, name: Description[0].name, Value: Description[0].value }

    ];

    if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
    {
        var StartDate = $('#dateStartDate');
        var Expirydate = $('#dateExpiryDate');

        container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
        , { id: StartDate[0].id, name: StartDate[0].name, Value: StartDate[0].value }
         , { id: Expirydate[0].id, name: Expirydate[0].name, Value: Expirydate[0].value }
        ];

    }

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {
        if (container[i].Value == "") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            Errorbox.style.paddingLeft = "30px";
        }
    }

    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        return true;
    }


}
//--------------------------------//


//Notice Type Dropdown
function BindNoticeTypeDropDown() {
    debugger;
    var jsonResult = {};
    var NoticeType = new Object();
    jsonResult = GetAllNoticeTypes(NoticeType);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllNoticeTypes(NoticeType) {
    var ds = {};
    var table = {};
    var data = "{'NoticeTypeObj':" + JSON.stringify(NoticeType) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeTypes");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


// Bind Notices
function BindNotices() {

    debugger;

    var jsonResult = {};
    var Notices = new Object();
    jsonResult = GetNotices(Notices);
    if (jsonResult != undefined) {
        FillNotice(jsonResult);

        if (jsonResult.length > 5) {
            $(".aViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }
    }
}

function FillNotice(Records) {
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;//<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.NoticeName + '</a></div><div class="accordion-body collapse in">
        //<img class="noticeImage" id=img' + Records.ID + ' src=' + url + '/>
        var html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.NoticeName + '</p><span class="fa fa-slack" id="spnStartDate"></span>  <span class="spnDateValues" >' + Records.NoticeType + '</span>&nbsp;<br /><p>' + Records.Description + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        $("#DivNoticeType1").append(html);

        if (url != "") {
           
               $('#img' + Records.ID).attr('src', url);
           
        }

        if (url == null)

         {
            url = "../img/No-Img_Chosen.png";
            $('#img' + Records.ID).attr('src', url);
           
        }
    });

    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#DivNoticeType1").append(img);
    }

}

function GetNotices(Notices) {
    var ds = {};
    var table = {};
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNotices");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


// Bind Latest Notices
function BindLatestNotices() {

    debugger;

    var jsonResult = {};
    var Notices = new Object();
    jsonResult = GetLatestNotices(Notices);
    if (jsonResult != undefined) {
        FillNotice(jsonResult);
       
        if (jsonResult.length >= 5) {
            $(".aViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }

    }
}

function GetLatestNotices(Notices) {
    var ds = {};
    var table = {};
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetLatestNotices");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//



//Insert Notice
function InsertNotice(Notices) {
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//


//Update Notice
function UpdateNotice(Notices) {
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/UpdateNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function GetNoticesBynoticeID(Notices) {
    var ds = {};
    var table = {};
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeDetailsByNoticeID");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsOnEdit(Notices) {

    $("#NoticeEditDivBox").show();

    var jsonResult = {};

    jsonResult = GetNoticesBynoticeID(Notices);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#lblNoticeName").show();
            $('#lblNoticeName').text(jsonResult.NoticeName);
            $("#txtNoticeName").hide();

            $("#h1Notice").text(jsonResult.NoticeName);

            $("#lblNoticeDescription").show();
            $("#txtDescription").hide();
            $('#lblNoticeDescription').text(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined) {
                $("#rdoNotificationNo").parent().removeClass('checked');
                $('#rdoNotificationYes').parent().addClass('checked');
                $("#lblStartDate").show();
                $("#dateStartDate").hide();
                $("#lblStartDate").text(jsonResult.StartDate)
                $("#lblExpiryDate").show();
                $("#dateExpiryDate").hide();
                $("#lblExpiryDate").text(jsonResult.ExpiryDate)
            }
            else {
                $("#rdoNotificationYes").parent().removeClass('checked');
                $('#rdoNotificationNo').parent().addClass('checked');

            }
            debugger;
            url = jsonResult.URL;
            $('#NoticePreview').attr('src', url);

            document.getElementById("rdoNotificationNo").disabled = true;
            document.getElementById("rdoNotificationYes").disabled = true;

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;

        });


        $("#btnSave").hide();
        $("#DivFile").hide();
    }
}
//--------------------------------//


//Deletion
function DeleteNotice(Notices) {
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/DeleteNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function DeleteFileFromFolder(imgPath) {

    $.ajax({
        type: "POST",
        url: "../AdminPanel/Notices.aspx/DeleteFileFromFolder",
        data: '{imgPath: "' + imgPath + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: imgPath,
        failure: function (response) {

            // alert(response.d);
        },
        error: function (response) {

            // alert(response.d);
        }
    });
}

function DeleteAppImage(AppImages) {
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}
//--------------------------------//


//Insert Notification
function InsertNotification(Notification) {
    debugger;

    var data = "{'NotificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//
function cancelEdit() {
    $('#btnCancel').click();
}

//Edit
//--- while select a notice , ther will appear a fixed edit icon ,its click functionality is given below
function FixedEditClick() {

    //$('#NoticeEdit').hide();
    $('#UpNotice')[0].files[0] = null;
    $('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
    $('#NoticeEdit').attr('onclick', 'cancelEdit();');
    $("#lblStartDate").hide();
    $("#dateStartDate").show();
    $("#lblExpiryDate").hide();
    $("#dateExpiryDate").show();


    $("#divView").hide();

    $("#divnoticeName").show();
    $("#divNoticeType").show();
    $("#DivFile").show();
    $("#divNoticeDescription").show();
    $("#divNotification").show();
    $("#DivImg").show();
    $("#divNotification").show();

    $("#btnDelete").show();
    $("#btnCancel").show();

    document.getElementById("rdoNotificationNo").disabled = false;
    document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');

    var Notices = new Object();
    Notices.noticeId = $("#hdfNoticeID").val();;

    jsonResult = GetNoticesBynoticeID(Notices);
    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');


    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            debugger;

            $("#lblNoticeName").hide();

            $("#lblNoticeDescription").hide();

            //$("#lblNoticeType").hide();

            $("#txtNoticeName").show();
            $("#txtDescription").show();

            $("#txtNoticeName").val(jsonResult.NoticeName);

            $("#txtDescription").text(jsonResult.Description);
            $("#txtDescription").val(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined) {
                $("#lblAlreadyNotificationSend").show();
                $("#lblAlreadyNotificationSend").text("Already Notification added");
            }
            else {
                 $("#lblAlreadyNotificationSend").hide();
            }
            debugger;
            url = jsonResult.URL;
           
            if (url == null) {
                url = "../img/No-Img_Chosen.png";
                $('#NoticePreview').attr('src', url);
            }
            else {
                $('#NoticePreview').attr('src', url);
            }
        });
        $("#btnSave").show();
        $("#h1Notice").text("Edit Notice");
        $("#DivFile").show();
    }

    RemoveStyle();
}

//--- Edit click of each notice
function EditOnClick(id) {
    debugger;

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    //$("#NoticeEdit").show();
    $('#NoticeEdit').attr('onclick', 'FixedEditClick();')
    $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
    $("#btnDelete").hide();
    $("#divView").show();
    $("#divNotificationDates").hide();

    var NoticeID = id;
    $("#hdfNoticeID").val(NoticeID);

    var Notices = new Object();
    Notices.noticeId = NoticeID;

    //BindControlsOnEdit(Notices);
    //$('#ddlNoticeType').attr('disabled', 'disabled');

    $("#NoticeEditDivBox").show();
    var jsonResult = {};

    jsonResult = GetNoticesBynoticeID(Notices);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#h1Notice").text(jsonResult.NoticeName);
            debugger;
            url = jsonResult.URL;

            if (url == null) {
                url = "../img/No-Img_Chosen.png";
                $('#NoticePreviewOnView').attr('src', url);

            }
            else {
                $('#NoticePreviewOnView').attr('src', url);
            }
           

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;

            debugger;
            if (jsonResult.Description == null || jsonResult.Description == "" || jsonResult.Description == undefined) {
                //$("#NoticePreviewOnView").css('width', '300px!important');
                $('#NoticePreviewOnView').width(600);
                $('#NoticePreviewOnView').height('auto');
                $('#lblNoticeDescriptionOnView').text("");
            }

            else {
                $('#NoticePreviewOnView').height(200);
                $('#NoticePreviewOnView').width(150);
                $('#lblNoticeDescriptionOnView').text(jsonResult.Description);
            }

            if ((jsonResult.NoticeType != null && jsonResult.NoticeType != "" && jsonResult.Description != undefined))
            {  $('#spnNoticeType').text(jsonResult.NoticeType);
            }
            else
            {
                $('#spnNoticeType').text("");
            }

        });
    }

    $("#btnSave").hide();
    $("#btnCancel").hide();

    $("#divnoticeName").hide();
    $("#divNoticeType").hide();
    $("#DivFile").hide();
    $("#DivImg").hide();
    $("#divNotification").hide();
    $("#divNoticeDescription").hide();
  
    RemoveStyle();
}
//--------------------------------//


// Clear Control Functions
function SetControlsInNewNoticeFormat() {
    ClearControls();
    $("#NoticeEditDivBox").show();

    $("#txtNoticeName").show();
    $("#txtDescription").show();
    $("#btnSave").show();
    $("#h1Notice").text("Add Notice");

    $("#lblNoticeDescription").hide();
    $("#lblNoticeName").hide();
    $("#NoticeEdit").hide();
    $("#DivFile").show();

    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");

    $("#btnDelete").hide();

    document.getElementById("rdoNotificationNo").disabled = false;
    document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');
    $("#lblAlreadyNotificationSend").hide();
}

function AddNewNoticeFormat() {

    $("#divView").hide();
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    SetControlsInNewNoticeFormat();
    $("#divNotificationDates").hide();

    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');
    $('#txtNoticeName').focus();
    $("#divnoticeName").show();
    $("#divNoticeType").show();
    $("#DivFile").show();
    $("#divNoticeDescription").show();
    $("#divNotification").show();
    $("#DivImg").show();
    $("#divNotification").show();
    $("#lblAlreadyNotificationSend").hide();

    $("#btnCancel").show();
}

function ClearControls() {
    $("#txtNoticeName").text("");
    $("#txtNoticeName").val("");
    $("#txtDescription").text("");
    $("#txtDescription").val("");
    $("#ddlNoticeType").select2("val", "");

    $('#dateStartDate').val("");
    $("#dateExpiryDate").val("");

    $("#hdfImageID").val("");
    $("#hdfNoticeID").val("");
    imageId = '';
    imgPath = '';
    $("#h1Notice").text("Add Notice");

    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");

    $('#UpNotice')[0].files[0] = null;

    

}
//--------------------------------//


//Not using now
function GetServerMapPath(path) {
    $.ajax({
        url: "../AdminPanel/Notices.aspx/GetServerMapPath",
        type: "POST",
        contentType: false,
        processData: false,
        data: path,
        // dataType: "json",
        success: function (result) {

            debugger;
            return result;
        },
        error: function (err) {
            // alert(err.statusText);
        }
    });

}




