﻿

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'evt';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table

var IsAlreadyNotified = false;
var MaxCharacterLimit = 200;

//--------------------------------//


$("document").ready(function (e) {

    debugger;

    BindEvents();
    BindOldEvents();


    //--Limit Notification Content 
    $('#txtnotificationCOntent').keypress(function (e) {

        if (this.value.length == MaxCharacterLimit) {
            e.preventDefault();
        } 
    });

    $("#rdoNotificationYes").click(function () {

        debugger;

        if (IsAlreadyNotified) {
            $("#lblAlreadyNotificationSend").show();
        }
        else {
            $("#lblAlreadyNotificationSend").hide();
        }
        $("#DivNotificationContent").show();

        //--- Making of notification content by trimming description after 200 characters 

        if ($("#txtDescription").val() != "") {

            if ($("#txtDescription").val().length > MaxCharacterLimit) {
                $("#txtnotificationCOntent").val($("#txtDescription").val().substring(0, MaxCharacterLimit));
            }

            else
            {
                $("#txtnotificationCOntent").val($("#txtDescription").val());
            }
        }

       

    });

    $("#rdoNotificationNo").click(function () {
        $("#DivNotificationContent").hide();
        $("#lblAlreadyNotificationSend").hide();

    });

    $('#btnCancel').click(function (e) {
        ClearControls();

        if ($("#hdfEventID").val() != "") {
            EditOnClick($("#hdfEventID").val());
        }
        else {
            $("#NoticeEdit").hide();
        }

        $("#optHideNo").parent().removeClass('checked');
        $('#optHideYes').parent().addClass('checked');

        $("#rdoNotificationYes").parent().removeClass('checked');
        $('#rdoNotificationNo').parent().addClass('checked');

        RemoveStyle();
    });

    $('#btnSave').click(function (e) {
        $('#rowfluidDiv').show();
        debugger;
        var IsValid = EventValidation();

        if (IsValid) {
    
        var Events = new Object();
        Events.eventName = $("#txtEventName").val();
        Events.description = $("#txtDescription").val();
        Events.startDate = $("#dateStartDate").val();
        Events.endDate = $("#dateEndDate").val();
        Events.eventExpiryDate = $("#dateExpiryDate").val();
        Events.isAutoHide = $("#hdfIsAutoHide").val();
        
       
            Events.isAutoHide = true;
        
        debugger;

        if ($('input[name=rdoHide]:checked').val() == "No") //Add Notification
        {
            Events.isAutoHide = false;
         
        }

       
        $("#hdfIsAutoHide").val(Events.isAutoHide);
        var guid = createGuid();

        //DeletedImgID = imageId;
        //DeletedImgPath = imgPath

        if (guid != null) {

            var imgresult = "";
            var _URL = window.URL || window.webkitURL;
            var formData = new FormData();
            var imagefile, logoFile, img;

            if (((imagefile = $('#UpEvent')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#UpEvent')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Events.imageId = guid;
            }
            else {
                if ($("#hdfEventID").val() != "" && $("#hdfEventID").val() != null) {
                    Events.imageId = imageId;
                }
            }

        }

        if ($("#hdfEventID").val() != "" && $("#hdfEventID").val() != null) {
            Events.eventId = $("#hdfEventID").val();

            var UpdationStatus = UpdateEvent(Events);

            if (UpdationStatus == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Event Edited Successfully");

                if (DeletedImgID != '' && (((imagefile = $('#UpEvent')[0].files[0]) != undefined))) {
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
                    Notification.linkID = Events.eventId;
                    Notification.caption = Events.eventName;
                    Notification.description = $('#txtnotificationCOntent').val();
                        //Events.description;
                    if ($('#dateStartDate').val() != "") {
                        Notification.startDate = $('#dateStartDate').val();
                    }
                    if ($('#dateExpiryDate').val() != "") {
                        Notification.expiryDate = $('#dateExpiryDate').val();
                    }

                    InsertNotification(Notification);
                }


            }

            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Event Editing Not Successful");
            }

            BindEvents();

            if (((imagefile = $('#UpEvent')[0].files[0]) != undefined)) {
                imageId = Events.imageId;
                imgPath = AppImgURL;

                DeletedImgID = imageId;
                DeletedImgPath = imgPath;
            }

        }
        else {
            var InsertionStatus = InsertEvent(Events);

            if (InsertionStatus.Status == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Event Added Successfully");
                $("#hdfEventID").val(InsertionStatus.eventId);

                if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                {
                    var Notification = new Object();
                    Notification.notificationType = NotificationTypeCode;
                    Notification.linkID = InsertionStatus.eventId;
                    Notification.caption = Events.eventName;
                    Notification.description = $('#txtnotificationCOntent').val();
                    if ($('#dateStartDate').val() != "") {
                        Notification.startDate = $('#dateStartDate').val();
                    }
                    if ($('#dateExpiryDate').val() != "") {
                        Notification.expiryDate = $('#dateExpiryDate').val();
                    }

                    InsertNotification(Notification);
                }


            }

            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Event Adding Not Successful");
            }

            BindEvents();

            if (((imagefile = $('#UpEvent')[0].files[0]) != undefined)) {
                imageId = Events.imageId;
                imgPath = AppImgURL;

                DeletedImgID = imageId;
                DeletedImgPath = imgPath;
            }
        }
    }
    });

    $('#btnDelete').click(function (e) {
        var deleteConirm = confirm("Want to delete?");

        debugger;

        if (deleteConirm) {
            var EventID = $("#hdfEventID").val()

            var Events = new Object();
            Events.eventId = EventID;

            var DeletionStatus = DeleteEvent(Events);

            if (DeletionStatus == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Event Deleted Successfully");

                var AppImages = new Object();
                AppImages.appImageId = imageId;
                DeleteAppImage(AppImages);

                DeleteFileFromFolder(imgPath);
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Deletion Not Successful");
            }

            BindEvents();
            SetControlsInNewEventFormat();

        }

    });

    //------------- * LATEST Events view more,Back  *------------//

    //VIEW MORE Click Click of LATEST Events
    $(".aViewMore").live({

        click: function (e) {

            debugger;

            BindAllLatestEvents();

          $(".aBack").show();
          $(".aViewMore").hide();

        //  $(".aViewMore").style.display = "none!important";
         

          $("#divOldEvents").hide();

          $('#rowfluidDiv').hide();
          $('.alert-success').hide();
          $('.alert-error').hide();

        }
    });


    //BACK Click of LATEST Events
    $(".aBack").live({

        click: function (e) {
          
            BindEvents();

            $(".aBack").hide();
            $(".aViewMore").show();
            
            $("#divOldEvents").show();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

        }
    });

    //------------- * OLD Events view more,Back  *------------//

    //VIEW MORE Click Of OLD Events 
    $(".aOldViewMore").live({

        click: function (e) {
            
            $(".aOldBack").show();
            $(".aOldViewMore").hide();
          //  $(".aOldViewMore").style.display = "none!important";

            BindAllOldEvents();
            $("#divLatestEvents").hide();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

        }
    });

    //BACK Click of OLD Events
    $(".aOldBack").live({

        click: function (e) {
            $(".aOldBack").hide();
            $(".aOldViewMore").show();
            BindOldEvents();

            $("#divLatestEvents").show();
            BindEvents();

            $('#rowfluidDiv').hide();
            $('.alert-success').hide();
            $('.alert-error').hide();

        }
    });

    $('input:text').click(
    function () {
       RemoveStyle();
    });
   
});//end of document.ready



// Bind Latest Events - Top5
function BindEvents() {

    debugger;

    var jsonResult = {};
    var Events = new Object();
    jsonResult = GetEvents(Events);
    if (jsonResult != undefined) {
        FillEvents(jsonResult);

        if (jsonResult.length >= 5) {
            $(".aViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }

    }
}

function FillEvents(Records) {
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;
        var html = '';

        if (Records.StartDate == null && Records.EndDate == null && Records.EventExpiryDate == null) {
            html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        }

        else {
            if (Records.StartDate != null && Records.EndDate != null && Records.EventExpiryDate != null) {

                html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
            }

            else {

                if (Records.StartDate != null && (Records.EndDate == null && Records.EventExpiryDate == null)) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }

                if (Records.StartDate != null && Records.EndDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }

                if (Records.StartDate != null && Records.EventExpiryDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }

                if (Records.EndDate != null && Records.EventExpiryDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }
            }

        }
        //var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        $("#DivNoticeType1").append(html);

        if (url != "" && url != null) {
            var imgControl = document.getElementById("img" + Records.ID);
            if (imgControl != null) {
                document.getElementById("img" + Records.ID).src = url;
                $('#img' + Records.ID).attr('src', url);
            }
        }
        if (url == null) {
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
    debugger;


}

function GetEvents(Events) {

    debugger;

    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEvents");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//



//Bind All latest events
function BindAllLatestEvents() {

    debugger;

    var jsonResult = {};
    var Events = new Object();
    jsonResult = GetAllLatestEvents(Events);
    if (jsonResult != undefined) {
        FillEvents(jsonResult);

        if (jsonResult.length >= 5) {
            $(".aViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }

    }
}

function GetAllLatestEvents(Events) {

    debugger;

    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetAllLatestEvents");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


//Bind old Events - Top5
function BindOldEvents() {

    debugger;

    var jsonResult = {};
    var Events = new Object();
    jsonResult = GetOldEvents(Events);
    if (jsonResult != undefined) {
        FillOldEvents(jsonResult);

        if (jsonResult.length >= 5) {
            $(".aOldViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aOldViewMore").hide();
        }
    }
}

function GetOldEvents(Events) {

    debugger;

    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetOldEvents");
    table = JSON.parse(ds.d);
    return table;
}

function FillOldEvents(Records) {
    $('#OldEventsGrid').html('');

    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;
        var html = '';

        if (Records.StartDate == null && Records.EndDate == null && Records.EventExpiryDate == null) {
            html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        }

        else {
            if (Records.StartDate != null && Records.EndDate != null && Records.EventExpiryDate != null) {

                html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
            }

            else {

                if (Records.StartDate != null && (Records.EndDate == null && Records.EventExpiryDate == null)) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }



                if (Records.StartDate != null && Records.EndDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }

                if (Records.StartDate != null && Records.EventExpiryDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }

                if (Records.EndDate != null && Records.EventExpiryDate != null) {
                    html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
                }
            }




        }


        //var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        $("#OldEventsGrid").append(html);
        debugger;
        if (url != "" && url != null) {
            var imgControl = document.getElementById("img" + Records.ID);
            if (imgControl != null) {
                document.getElementById("img" + Records.ID).src = url;
                $('#img' + Records.ID).attr('src', url);
            }
        }
        if (url == null) {
            url = "../img/No-Img_Chosen.png";
            $('#img' + Records.ID).attr('src', url);

        }


    });

    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#OldEventsGrid").append(img);
    }


}

//--------------------------------//


//Bind All old
function BindAllOldEvents() {

    debugger;

    var jsonResult = {};
    var Events = new Object();
    jsonResult = GetAllOldEvents(Events);
    if (jsonResult != undefined) {
        FillOldEvents(jsonResult);

        if (jsonResult.length >= 5) {
            $(".aOldViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aOldViewMore").hide();
        }
    }
}

function GetAllOldEvents(Events) {

    debugger;

    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetAllOldEvents");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


//Clear Controls
function ClearControls() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file') {
            this.value = '';
        }
        else if (this.type == 'radio' || this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

    $("#lblEventName").text("");
    $("#lblDescription").text("");
    $("#lblStartDate").text("");
    $("#lblEndDate").text("");
    $("#lblExpiryDate").text("");
    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

    $('#UpEvent')[0].files[0] = null;

    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');

    $("#lblAlreadyNotificationSend").hide();
    $("#DivNotificationContent").hide();
    IsAlreadyNotified = false;
}

function SetControlsInNewEventFormat() {
    ClearControls();

    $("#lblEventName").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblEndDate").hide();
    $("#lblExpiryDate").hide();

    $("#txtEventName").show();
    $("#txtDescription").show();
    $("#dateStartDate").show();
    $("#dateEndDate").show();
    $("#dateExpiryDate").show();

    $("#optHideNo").parent().removeClass('checked');
    $('#optHideYes').parent().addClass('checked');

    $("#h1Event").text("New Event");

    $("#EventEditDivBox").show();
    $("#EditContent").show();
    $("#divView").hide();

    $("#btnSave").show();
    $("#btnCancel").show();
    $("#btnDelete").hide();

    $("#hdfEventID").val("");

    $("#NoticeEdit").hide();

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();

}

function SetControlsInViewFormat() {
    //$("#lblEventName").show();
    //$("#lblDescription").show();
    //$("#lblStartDate").show();
    //$("#lblEndDate").show();
    //$("#lblExpiryDate").show();

    //$("#txtEventName").hide();
    //$("#txtDescription").hide();
    //$("#dateStartDate").hide();
    //$("#dateEndDate").hide();
    //$("#dateExpiryDate").hide();

    $("#EventEditDivBox").show();
    $("#EditContent").hide();
    $("#divView").show();


    $("#btnSave").hide();
    $("#btnCancel").hide();
    $("#btnDelete").hide();

    $("#NoticeEdit").show();
}

function SetControlsInEditableFormat() {
    $("#lblEventName").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblEndDate").hide();
    $("#lblExpiryDate").hide();

    $("#txtEventName").show();
    $("#txtDescription").show();
    $("#dateStartDate").show();
    $("#dateEndDate").show();
    $("#dateExpiryDate").show();

    $("#EventEditDivBox").show();
    $("#EditContent").show();
    $("#divView").hide();

    $("#btnSave").show();
    $("#btnCancel").show();
    $("#btnDelete").show();

    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');

    $("#lblAlreadyNotificationSend").hide();
    IsAlreadyNotified = false;
}
//--------------------------------//

//Edit -- view only
function EditOnClick(id) {
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    SetControlsInViewFormat();

    var Events = new Object();
    Events.eventId = id;

    if (id != "" && id != null) {

        $("#hdfEventID").val(id);

        var jsonResult = {};

        jsonResult = GetEventsByEventID(Events);

        if (jsonResult != undefined) {
            $.each(jsonResult, function (index, jsonResult) {
                $("#h1Event").text(jsonResult.EventName);

                debugger;

                url = jsonResult.URL;
               
                if (url == null) {
                    url = "../img/No-Img_Chosen.png";
                    $('#eventPreviewOnView').attr('src', url);
                }
                else {
                    $('#eventPreviewOnView').attr('src', url);

                }

                imageId = jsonResult.ImageID;
                imgPath = jsonResult.URL;

                DeletedImgID = imageId;
                DeletedImgPath = imgPath;

                debugger;
                if (jsonResult.Descrtiption == null || jsonResult.Descrtiption == "" || jsonResult.Descrtiption == undefined) {
                    //$("#NoticePreviewOnView").css('width', '300px!important');
                    $('#eventPreviewOnView').width(600);
                    $('#eventPreviewOnView').height('auto');
                    $('#lblEventDescriptionOnView').text("");
                }

                else {
                    $('#eventPreviewOnView').height(200);
                    $('#eventPreviewOnView').width(150);
                    $('#lblEventDescriptionOnView').text(jsonResult.Descrtiption);
                }

            });
        }
    }
}

function GetEventsByEventID(Events) {
    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEventsByEventID");
    table = JSON.parse(ds.d);
    return table;
}

function FixedEditClick() {
    debugger;

    ClearControls();
    SetControlsInEditableFormat();
    $("#h1Event").text("Edit Event");

    var Events = new Object();
    Events.eventId = $("#hdfEventID").val();

    var jsonResult = {};

    jsonResult = GetEventsByEventID(Events);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            debugger;
            $("#txtEventName").val(jsonResult.EventName);
            $("#txtDescription").val(jsonResult.Descrtiption);

            url = jsonResult.URL;

            if (url == null) {
                url = "../img/No-Img_Chosen.png";
                $('#NoticePreview').attr('src', url);
            }
            else {
                $('#NoticePreview').attr('src', url);
            }

            imageId = jsonResult.ImageID;
            imgPath = url;

            if (jsonResult.StartDate != null && jsonResult.StartDate != "") {
                $("#dateStartDate").val(ConvertJsonToDate(jsonResult.StartDate));
            }

            if (jsonResult.EndDate != null && jsonResult.EndDate != "") {
                $("#dateEndDate").val(ConvertJsonToDate(jsonResult.EndDate));
            }

            if (jsonResult.EventExpiryDate != null && jsonResult.EventExpiryDate != "") {
                $("#dateExpiryDate").val(ConvertJsonToDate(jsonResult.EventExpiryDate));
            }

            if (jsonResult.IsAutoHide == true) {
                $('#optHideYes').parent().addClass('checked');
                $("#optHideNo").parent().removeClass('checked');
                $("#hdfIsAutoHide").val(true)

            }
            else {
                $('#optHideNo').parent().addClass('checked');
                $("#optHideYes").parent().removeClass('checked');

                $("#hdfIsAutoHide").val(false)
            }
            if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined) {
                IsAlreadyNotified = true;
            }
            else {

                IsAlreadyNotified = false;
            }
        });
    }
    RemoveStyle();
}
//--------------------------------//

//Insert
function InsertEvent(Events) {
    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/InsertEvent");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


//update
function UpdateEvent(Events) {
    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/UpdateEvent");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


//Delete
function DeleteEvent(Events) {
    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/DeleteEvent");
    table = JSON.parse(ds.d);
    return table;
}

function DeleteFileFromFolder(imgPath) {

    $.ajax({
        type: "POST",
        url: "../AdminPanel/Events.aspx/DeleteFileFromFolder",
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
    jsonResult = getJsonData(data, "../AdminPanel/Events.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}
//--------------------------------//


//Insert Notification
function InsertNotification(Notification) {
    debugger;

    var data = "{'NotificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Events.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//


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

function SetExpiryDate() {
    
    debugger;
    var EndDate     = $("#dateEndDate").val();
    var ExpireDate = $("#dateExpiryDate").val();
    if (EndDate != "" && EndDate != null && EndDate != undefined && $("#hdfEventID").val() == "" && ExpireDate == "" ) {
        $("#dateExpiryDate").val(EndDate);
    }
}

function EventValidation() {
    debugger;
    $('#Displaydiv').remove();
    var Name = $('#txtEventName');
    //   var Description = $('#txtDescription');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
      //  ,{ id: Description[0].id, name: Description[0].name, Value: Description[0].value }

    ];

    if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
    {
        var StartDate = $('#dateStartDate');
        var Expirydate = $('#dateExpiryDate');
        var NotificationContent = $('#txtnotificationCOntent').val();
        container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
        , { id: StartDate[0].id, name: StartDate[0].name, Value: StartDate[0].value }
        , { id: Expirydate[0].id, name: Expirydate[0].name, Value: Expirydate[0].value }
        , { id: NotificationContent[0].id, name: NotificationContent[0].name, Value: NotificationContent[0].value }
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
            txtB.style.backgroundImage = "url('../img/invalid.png')";
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

function RemoveStyle() {
    debugger;
    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}
//--------------------------------//
