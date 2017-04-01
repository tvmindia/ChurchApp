
//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'ntc';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table
var churchObject = {};
var MaxCharacterLimit = 200;
var IsMobNotified = '';
//--------------------------------//


$("document").ready(function (e) {
    $("#ddlNoticeType").live('change', function () {
        //alert(this.value);
        try {
            $('.select2-selection--single').css('border', '1px solid #aaa');
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
    });
    
    
    churchObject.chid = $("#hdfchid").val();
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
    $('#btnSaveNotification').click(function () {
        if (NotificationValidation)
        {
            
            var Notification = new Object();
            Notification.notificationType = NotificationTypeCode;
            Notification.linkID = $("#hdfNoticeID").val();
            Notification.caption = $('#txtCaption').val();
            Notification.description = $("#txtnotificationCOntent").val();
            var result = InsertNotification(Notification);
            switch (result.status) {
                case "1":
                    $('.modelClear').click();
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text("Notification Already added");
                    $('#NotificationInfo').show();
                    //$('#txtCaption').attr('disabled', true);
                    //$('#txtnotificationCOntent').attr('disabled', true);
                    IsMobNotified = false;
                    noty({ type: 'success', text: Messages.NotificationInserted });

                    break;
                default:
                    $('.modelClear').click();
                    $("#lblAlreadyNotificationSend").hide();
                    $('#NotificationInfo').hide();
                    $('#txtCaption').attr('disabled', false);
                    $('#txtnotificationCOntent').attr('disabled', false);
                    IsMobNotified = true;
                    noty({ type: 'error', text: result.status });
                    break;
            }

        }
        
        
    });
        $("#rdoNotificationYes").click(function () {
        
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

    //$('#btnSave').click(function (e) {
        
    //});
    $('[data-toggle="popover"]').popover();
    $('#btnCancel').click(function (e) {
       
        //  $("#NoticeEditDivBox").hide();
        


        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();

        var NoticeID = $("#hdfNoticeID").val();

        if (NoticeID == null || NoticeID == "" ) //Add
        {
            AddNewNoticeFormat();
            $('#NoticeEditDivBox').hide();
        }
        else//Edit
        {
            
            EditOnClick(NoticeID);
        }

        $('#UpNotice')[0].files[0] = null;

        RemoveStyle();
    });

    //$('#btnDelete').click(function (e) {
        

       
    //});

    //------------- * LATEST Events view more,Back  *------------//

    //VIEW MORE Click Click of LATEST Events
    $(".aViewMore").live({

        click: function (e) {

            

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
    //var value = $('#ContentPlaceHolder2_btnAddNew').val();
    //if (value != "") {
        
    //    $('#NoticeEdit').remove();
    //}

});
//------------End of document ready----------------//
function SendNotification()
{
    
    if ($("#txtNoticeName").val() != "") {
        $("#txtCaption").val($('#ddlNoticeType').val()+' - '+$("#txtNoticeName").val());
    }

    if ($("#txtDescription").val() != "") {

        if ($("#txtDescription").val().length > MaxCharacterLimit) {
            $("#txtnotificationCOntent").val($("#txtDescription").val().substring(0, MaxCharacterLimit));
        }

        else {
            $("#txtnotificationCOntent").val($("#txtDescription").val());
        }
    }
}
function SaveNotices()
{
try
{
 $('#rowfluidDiv').show();
    var IsValid = NoticeValidation();
    if (IsValid) {

        //if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
        //{
        //    var today = new Date();
        //    var startcheck = $('#dateStartDate').val();
        //    var endcheck = $('#dateExpiryDate').val();

        //    if (startcheck != "" || endcheck != "") {
        //        if ((Datecheck(startcheck) > Datecheck(endcheck))) {
        //            noty({ text: Messages.InvalidExpiry, type: 'information' });
        //            return false;
        //        }
        //    }
        //    var valid = NotificationValidation();
        //    if(valid){}
        //    else {
        //        return false;
        //    }
        //}
        var Notices = new Object();
        Notices.noticeName = $("#txtNoticeName").val();
        Notices.description = $("#txtDescription").val();
        Notices.noticeType = $("#ddlNoticeType").val();
        Notices.churchId = churchObject.chid;

        if ($("#hdfNoticeID").val() != "" && $("#hdfNoticeID").val() != null) {

            Notices.noticeId = $("#hdfNoticeID").val();

            var imgresult;
            if ((imgresult = $('#UpNotice')[0].files.length > 0)) {
                Notices.imageId = $("#hdfImageID").val();
                var formData = new FormData();
                var imagefile;
                imagefile = $('#UpNotice')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('churchID', Notices.churchId);
                formData.append('noticeId', Notices.noticeId);
                formData.append('NoticeimageId', Notices.imageId);
                formData.append('noticeName', Notices.noticeName);
                formData.append('description', Notices.description);
                formData.append('noticeType', Notices.noticeType);
                formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'NoticeImageUpdate');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.status) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        Dynamicbutton("btnDelete", "Delete", "DeleteNotices");
                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            if (IsMobNotified)
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
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;

                }
                BindNotices();
                $("#hdfNoticeID").val(Notices.noticeId);

            }
            else {
                result = UpdateNotice(Notices);
                switch (result.status) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        Dynamicbutton("btnDelete", "Delete", "DeleteNotices");

                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            if (IsMobNotified)
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
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;

                }
                       
                BindNotices();
                $("#hdfNoticeID").val(Notices.noticeId);
            }
        }
        else {

            //INSERT
            ///////Image insert using handler
            var imgresult;
            if ((imgresult = $('#UpNotice')[0].files.length > 0)) {

                var formData = new FormData();
                var imagefile;
                imagefile = $('#UpNotice')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('churchID', Notices.churchId);
                formData.append('noticeName', Notices.noticeName);
                formData.append('description', Notices.description);
                formData.append('noticeType', Notices.noticeType);
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'NoticeImageInsert');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                switch (result.status) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdfEventID").val(result.eventId);
                        $("#hdfImageID").val(result.imageId);
                        Dynamicbutton("btnDelete", "Delete", "DeleteNotices");
                        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
                        $('#btnNotify').attr('data-target', '#notificationModal');
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
                                        
                            var notires=InsertNotification(Notification);
                            if (notires.status == "1") {
                                IsMobNotified = false;
                                $('#lblAlreadyNotificationSend').show();
                                $('#dateStartDate').attr('disabled', true);
                                $('#dateExpiryDate').attr('disabled', true);
                                //$('#txtnotificationCOntent').attr('disabled', true);
                            }
                                    
                                    
                        }
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;
               
                }
                BindNotices();
                $("#hdfNoticeID").val(result.noticeId);
            }
            else {
                result = InsertNotice(Notices);
                switch (result.status) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdfEventID").val(result.eventId);
                        $("#hdfImageID").val(result.imageId);
                        Dynamicbutton("btnDelete", "Delete", "DeleteNotices");
                        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
                        $('#btnNotify').attr('data-target', '#notificationModal');
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
                            var notires = InsertNotification(Notification);
                            if (notires.status == "1") {
                                IsMobNotified = false;
                                $('#lblAlreadyNotificationSend').show();
                                $('#dateStartDate').attr('disabled', true);
                                $('#dateExpiryDate').attr('disabled', true);
                                //$('#txtnotificationCOntent').attr('disabled', true);

                            }
                        }
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.result });
                        break;

                }
                        
                BindNotices();
                $("#hdfNoticeID").val(result.noticeId);
                  
            }
        }
    }
}
        catch (e)
{
    noty({ type: 'error', text: e.message });
}
}
function DeleteNotices()
{
    var deleteConirm = confirm("Want to delete?");


    if (deleteConirm) {



        var NoticeID = $("#hdfNoticeID").val();

        var Notices = new Object();
        Notices.noticeId = NoticeID;

        var DeletionStatus = DeleteNotice(Notices);
        switch (DeletionStatus.status) {
            case "1":
                noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                Dynamicbutton("NoticeEdit", "EditCancel", "");
                Dynamicbutton("btnSave", "SaveCancel", "");
                Dynamicbutton("btnDelete", "DeleteCancel", "");
                Dynamicbutton("btnReset", "ResetCancel", "");
                Dynamicbutton("btnNotify", "PushNotiCancel", "");
                $("#NoticeEditDivBox").hide();
                break;
            case "0":
                noty({ text: Messages.DeletionFailure, type: 'error' });
                break;
            default:
                noty({ type: 'error', text: result.result });
                break;

        }

        BindNotices();
        //SetControlsInNewNoticeFormat();
        //$('#NoticeEditDivBox').hide();

    }
    else {
        return false;
    }
}
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
    
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}
function NotificationValidation() {
    
    $('#Displaydiv').remove();
    var Start = $('#txtCaption');
    var End = $('#txtnotificationCOntent');

    var container = [
        { id: Start[0].id, name: Start[0].name, Value: Start[0].value },
    { id: End[0].id, name: End[0].name, Value: End[0].value }

    ];

    var j = 0;

    for (var i = 0; i < container.length; i++) {
        if (container[i].Value == "") {
            j = 1;
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";

        }
    }

    if (j == '1') {
        noty({ type: 'error', text: Messages.Validation });
        return false;
    }
    if (j == '0') {

        return true;
    }


}
function NoticeValidation() {
    
    $('#Displaydiv').remove();
    var Name = $('#txtNoticeName');
    var Type = $('#ddlNoticeType');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
    { id: Type[0].id, name: Type[0].name, Value: Type[0].value }

    ];

    var j = 0;
    
    for (var i = 0; i < container.length; i++) {
        if (container[i].Value == "") {
            j = 1;
            if (container[1].Value == "") {
                $('.select2-selection--single').css('border', '1px solid #fb0808');
            }
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            
        }
    }

    if (j == '1') {
        noty({ type: 'error', text: Messages.Validation });
        return false;
    }
    if (j == '0') {
       
        return true;
    }


}
//--------------------------------//


//Notice Type Dropdown
function BindNoticeTypeDropDown() {
    
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
        

        var url = Records.URL;//<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.NoticeName + '</a></div><div class="accordion-body collapse in">
        //<img class="noticeImage" id=img' + Records.ID + ' src=' + url + '/>
        var html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + (Records.NoticeName!=null?Records.NoticeName:"") + '</p><span class="fa fa-slack" id="spnStartDate"></span>  <span class="spnDateValues" >' + (Records.NoticeType!=null?Records.NoticeType:"") + '</span>&nbsp;<br /><p>' + (Records.Description!=null?Records.Description:"") + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
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
            
            url = jsonResult.URL;
            $('#NoticePreview').attr('src', url);

            //document.getElementById("rdoNotificationNo").disabled = true;
            //document.getElementById("rdoNotificationYes").disabled = true;

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
    

    var data = "{'NotificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//
function cancelEdit() {
   // $('#btnCancel').click();
    if ($("#hdfNoticeID").val() != "") {
        FixedEditClick();
    }
    else {
        RemoveStyle();
        ClearControls();
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
    }
}

//Edit
//--- while select a notice , ther will appear a fixed edit icon ,its click functionality is given below
function FixedEditClick() {
    
    Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
    $('#btnNotify').attr('data-target', '#notificationModal');
    //$('#NoticeEdit').hide();
    Dynamicbutton("NoticeEdit", "EditCancel", "");
    Dynamicbutton("btnSave", "Save", "SaveNotices");
    Dynamicbutton("btnDelete", "Delete", "DeleteNotices");
    Dynamicbutton("btnReset", "Reset", "cancelEdit");
    $('#UpNotice')[0].files[0] = null;
    //$('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white repeat");
    //$('#NoticeEdit').attr('onclick', 'cancelEdit();');
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
    //$("#divNotification").show();

    //$("#btnDelete").show();
    //$("#btnCancel").show();

    //document.getElementById("rdoNotificationNo").disabled = false;
    //document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');

    var Notices = new Object();
    Notices.noticeId = $("#hdfNoticeID").val();;

    jsonResult = GetNoticesBynoticeID(Notices);
    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');


    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            

            $("#lblNoticeName").hide();

            $("#lblNoticeDescription").hide();

            //$("#lblNoticeType").hide();

            $("#txtNoticeName").show();
            $("#txtDescription").show();

            $("#txtNoticeName").val(jsonResult.NoticeName);

            $("#txtDescription").text(jsonResult.Description);
            $("#txtDescription").val(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            if (jsonResult.NotificationCount != 0 && jsonResult.NotificationCount != undefined) {
                $("#lblAlreadyNotificationSend").show();
                $("#lblAlreadyNotificationSend").text(jsonResult.NotificationCount+" Notifications Already added");
                $('#NotificationInfo').show();
                //$('#dateStartDate').attr('disabled', true);
                //$('#dateStartDate').val(ConvertJsonToDate(jsonResult.StartDate));
                //$('#dateExpiryDate').attr('disabled', true);
                //$('#dateExpiryDate').val(ConvertJsonToDate(jsonResult.ExpiryDate));
                //$('#txtCaption').attr('disabled', true);
                //$('#txtCaption').val(jsonResult.Caption);
                //$('#txtnotificationCOntent').attr('disabled', true);
                //$('#txtnotificationCOntent').val(jsonResult.Description);
                IsMobNotified = false;
            }
            else {
                IsMobNotified = true;
                $("#lblAlreadyNotificationSend").hide();
                $('#NotificationInfo').hide();
                //$('#dateStartDate').attr('disabled', false);
                //$('#dateExpiryDate').attr('disabled', false);
                $('#txtnotificationCOntent').attr('disabled', false);
                $('#txtCaption').attr('disabled', false);
            }
            
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
    
    Dynamicbutton("NoticeEdit", "Edit", "FixedEditClick");
    Dynamicbutton("btnSave", "SaveCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnNotify", "PushNotiCancel", "");
    Dynamicbutton("btnDelete", "Delete", "DeleteNotices");
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
    //$("#NoticeEdit").show();
    //$('#NoticeEdit').attr('onclick', 'FixedEditClick();')
    //$('#iconEdit').removeClass("halflings-icon white repeat").addClass("halflings-icon white pencil");
    //$("#btnDelete").hide();
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

    //$("#btnSave").hide();
    //$("#btnCancel").hide();

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
    //$("#btnSave").show();
    Dynamicbutton("btnSave", "Save", "SaveNotices");
    Dynamicbutton("btnReset", "Reset", "ResetCancel");
    
    $("#h1Notice").text("Add Notice");

    $("#lblNoticeDescription").hide();
    $("#lblNoticeName").hide();
    //$("#NoticeEdit").hide();
    Dynamicbutton("NoticeEdit", "EditCancel", "");
    Dynamicbutton("btnNotify", "PushNotiCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    $("#DivFile").show();
    
    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");
    $('#UpNotice').val('');
    //$("#btnDelete").hide();
    
    //document.getElementById("rdoNotificationNo").disabled = false;
    //document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');
    $("#lblAlreadyNotificationSend").hide();
    $('#NotificationInfo').hide();
    $('#txtCaption').attr('disabled', false);
    $('#txtnotificationCOntent').attr('disabled', false);
}

function AddNewNoticeFormat() {
    
    $("#divView").hide();
    

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

    //$("#btnCancel").show();
}

function ClearControls() {
    
    $("#txtNoticeName").text("");
    $("#txtNoticeName").val("");
    $("#txtDescription").text("");
    $("#txtDescription").val("");
    $("#ddlNoticeType").select2("val", "");
    $("#txtnotificationCOntent").text("");
    $("#txtnotificationCOntent").val("");
    $('#dateStartDate').val("");
    $("#dateExpiryDate").val("");
    IsMobNotified = true;
    $("#lblAlreadyNotificationSend").hide();
    $('#dateStartDate').attr('disabled', false);
    $('#dateExpiryDate').attr('disabled', false);
    $('#txtnotificationCOntent').attr('disabled', false);
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

            
            return result;
        },
        error: function (err) {
            // alert(err.statusText);
        }
    });

}




