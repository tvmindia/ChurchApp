

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'EduEvt';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table
var IsMobNotified = '';
var IsAlreadyNotified = false;
var MaxCharacterLimit = 200;
var churchObject = {};
var DataTables = {};

//--------------------------------//


$("document").ready(function (e) {
    try {
        debugger;
        //Setting current churchid
        churchObject.chid = $("#hdfchid").val();
        DataTables.EduForumMember = $('#tblEduForumMembers').DataTable(
        {
            dom: '<"top"f>rt<"bottom"ip><"clear">',
            order: [],
            searching: true,
            paging: true,
            data: GetEduForumMembers(),
            columns: [

              { "data": "ID" },
              { "data": "Name" },
              { "data": "ParentName" },
              { "data": "Class", "defaultContent": "<i>-</i>" },
              { "data": "School", "defaultContent": "<i>-</i>" },
              { "data": "DBO", "defaultContent": "<i>-</i>" },
              { "data": "Mobile", "orderable": false, "defaultContent": "<i>-</i>" },
              { "data": "Email", "defaultContent": "<i>-</i>" }

            ],
            columnDefs: [
             {//hiding hidden column field churchid
                 "targets": [0],
                 "visible": false,
                 "searchable": false
             }, {
                 "targets": 5,
                 "render": function (data, type, full, meta) {
                     debugger;
                     var DOB = ConvertJsonToDate(full.DOB).split("-");
                     if (DOB)
                     {
                         var currentYear = new Date().getFullYear();
                         return (currentYear - parseInt(DOB[2]));
                     }
                     else
                     {
                         return "--";
                     }
                     
                 }
             }
             
            ]
        });
        DataTables.EduForumResponse = $('#tblResponse').DataTable(
        {
            dom: '<"top"f>rt<"bottom"ip><"clear">',
            order: [],
            searching: true,
            paging: true,
            data: null,
            columns: [

              { "data": "ID" },
              { "data": "Name" },
              { "data": "Response" },
              { "data": "Mobile" },
              { "data": "CreatedDate", "defaultContent": "<i>-</i>" }

            ],
            columnDefs: [
             {//hiding hidden column field churchid
                 "targets": [0],
                 "visible": false,
                 "searchable": false
             },
             {
                 "targets": 4,
                 "render": function (data, type, full, meta) {
                     return ConvertJsonToDate(data);


                 }
             }

            ]
        });
        $('[data-toggle="popover"]').popover();
        BindEvents(1);        
        $('#btnSaveNotification').click(function () {
            if (NotificationValidation) {
                debugger;
                var Notification = new Object();
                Notification.notificationType = NotificationTypeCode;
                Notification.linkID = $("#hdfEventID").val();
                Notification.caption = $('#txtCaption').val();
                Notification.description = $("#txtnotificationCOntent").val();
                var result = InsertNotification(Notification);
                switch (result.status) {
                    case "1":
                        $('.modelClear').click();
                        $("#lblAlreadyNotificationSend").show();
                        $("#lblAlreadyNotificationSend").text("Notification Already added");
                        $('#NotificationInfo').show();
                        $('#txtCaption').attr('disabled', true);
                        $('#txtnotificationCOntent').attr('disabled', true);
                        IsMobNotified = false;
                        noty({ type: 'success', text: Messages.InsertionSuccessFull });

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
        //--Limit Notification Content 
        $('#txtnotificationCOntent').keypress(function (e) {
            try {
                if (this.value.length == MaxCharacterLimit) {
                    e.preventDefault();
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text("Maximum " + MaxCharacterLimit + " characters");
                }

                else {
                    $("#lblAlreadyNotificationSend").text("Already Notification added");
                    $("#lblAlreadyNotificationSend").hide();

                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        $('#txtnotificationCOntent').keydown(function (e) {
            try {
                if (this.value.length == MaxCharacterLimit) {
                    $("#lblAlreadyNotificationSend").text("Already Notification added");
                    $("#lblAlreadyNotificationSend").hide();
                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }


        });

       

        $('#btnCancel').click(function (e) {
            try {

                ClearControls();
                $('#iconEdit').removeClass("halflings-icon white repeat").addClass("halflings-icon white pencil");
                if ($("#hdfEventID").val() != "") {
                    EditOnClick($("#hdfEventID").val());
                }
                else {
                    //$("#NoticeEdit").hide();
                    Dynamicbutton("NoticeEdit", "EditCancel", "");
                }

                $("#optHideNo").parent().removeClass('checked');
                $('#optHideYes').parent().addClass('checked');

                $("#rdoNotificationYes").parent().removeClass('checked');
                $('#rdoNotificationNo').parent().addClass('checked');

                RemoveStyle();
                if ($("#hdfEventID").val() == "") {
                    $('#EventEditDivBox').hide();
                }

            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }

        });

       
        //------------- * LATEST Events view more,Back  *------------//

        //VIEW MORE Click Click of LATEST Events
        $(".aViewMore").live({

            click: function (e) {
                try {
                    BindEvents(0);
                    $(".aBack").show();
                    $(".aViewMore").hide();
                    $("#divOldEvents").hide();

                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }
            }
        });
        //BACK Click of LATEST Events
        $(".aBack").live({

            click: function (e) {
                try {
                    BindEvents(1);

                    $(".aBack").hide();
                    $(".aViewMore").show();

                    $("#divOldEvents").show();

                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }

            }
        });

        //------------- * OLD Events view more,Back  *------------//

        //VIEW MORE Click Of OLD Events 
        $(".aOldViewMore").live({

            click: function (e) {
                try {
                    $(".aOldBack").show();
                    $('.aOldViewMore').hide();
                    BindEvents(0);
                    $("#divLatestEvents").hide();
                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }
            }
        });

        //BACK Click of OLD Events
        $(".aOldBack").live({

            click: function (e) {
                try {
                    $(".aOldBack").hide();
                    $(".aOldViewMore").show();
                    //BindOldEvents();

                    $("#divLatestEvents").show();
                    BindEvents(1);
                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }
            }
        });

        $('input:text').click(
        function () {
            RemoveStyle();
        });
        //var value = $('#ContentPlaceHolder2_btnAddNew').val();
        //if (value != "")
        // {
        //    $('#NoticeEdit').remove();
        // }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

});//end of document.ready
function SetMembers()
{
    Dynamicbutton("NoticeEdit", "EditCancel", "");
    Dynamicbutton("btnSave", "SaveCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnNotify", "SendNotiCancel", "");
    DataTables.EduForumMember.clear().rows.add(GetEduForumMembers()).draw(false);
}
function SetAbout()
{
    debugger;
    var result = GetEduAbout();
    $('#lblEduAbout').text(result.About);
    $('#txtEduAbout').val(result.About);
    $('#lblEduAbout').show();
    $('#txtEduAbout').hide();

    Dynamicbutton("NoticeEdit", "Edit", "EditAbout");
    Dynamicbutton("btnSave", "SaveCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnNotify", "SendNotiCancel", "");
}
function SaveAbout()
{
    debugger;
    var EduEventAbout = new Object();
    EduEventAbout.About = $('#txtEduAbout').val();
    var result = InsertEduAbout(EduEventAbout);
    switch(result.Status)
    {
        case "1":
            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
            break;
        case "0":
            noty({ text: Messages.InsertionFailure, type: 'error' });
            break;

    }
}
function EditAbout()
{
    debugger;
    $('#lblEduAbout').hide();
    $('#txtEduAbout').show();
    Dynamicbutton("btnSave", "Save", "SaveAbout");
}
function GetEduForumMembers()
{
    var ds = {};
    var table = {};
    var EduForumMember = new Object();
    var data = "{'forumMemberObj':" + JSON.stringify(EduForumMember) + "}";
    ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetForumMembers");
    table = JSON.parse(ds.d);
    return table;
}
function SendNotification() {
    if ($("#txtEventName").val() != "") {
        $("#txtCaption").val($("#txtEventName").val());
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
function SaveEvents() {
    try {
        debugger;
        var today = new Date();
        var startcheck = $("#dateStartDate").val();
        var endcheck = $("#dateEndDate").val();

        if (endcheck != "") {
            if ((Datecheck(endcheck) < Datecheck(startcheck))) {
                noty({ text: Messages.InvalidExpiry, type: 'information' });
                return false;
            }
        }
        var IsValid = EventValidation();

        if (IsValid) {

            var EducationForum = new Object();
            EducationForum.EventName = (($("#txtEventName").val() != "" && $("#txtEventName").val() != null) ? $("#txtEventName").val() : "");
            EducationForum.Description = (($("#txtDescription").val() != "" && $("#txtDescription").val() != null) ? $("#txtDescription").val() : "");
            EducationForum.StartDate = (($("#dateStartDate").val() != "" && $("#dateStartDate").val() != null) ? $("#dateStartDate").val() : "");
            EducationForum.EndDate = (($("#dateEndDate").val() != "" && $("#dateEndDate").val() != null) ? $("#dateEndDate").val() : "");
            EducationForum.ChurchID = churchObject.chid;


            if ($("#hdfEventID").val() != "" && $("#hdfEventID").val() != null) {


                EducationForum.ID = $("#hdfEventID").val();

                var imgresult;
                if ((imgresult = $('#UpEvent')[0].files.length > 0)) {
                    EducationForum.ImageID = $("#hdfImageID").val();
                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#UpEvent')[0].files[0];
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('ChurchID', EducationForum.ChurchID);
                    formData.append('ID', EducationForum.ID);
                    formData.append('EventimageId', EducationForum.ImageID);
                    formData.append('EventName', EducationForum.EventName);
                    formData.append('Description', EducationForum.Description);
                    formData.append('StartDate', EducationForum.StartDate);
                    formData.append('EndDate', EducationForum.EndDate);
                    formData.append('UpdatedBy', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'EducationForumImageUpdate');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    if (result.Status == "1") {
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });

                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            if (IsMobNotified) {
                                var Notification = new Object();
                                Notification.notificationType = NotificationTypeCode;
                                Notification.linkID = Events.eventId;
                                Notification.caption = Events.eventName;
                                Notification.description = ($("#txtnotificationCOntent").val() != null ? $("#txtnotificationCOntent").val() : "");
                                //Events.description;
                                if ($('#dateStartDate').val() != "") {
                                    Notification.startDate = $("#dateStartDate").val();
                                }
                                if ($('#dateExpiryDate').val() != "") {
                                    Notification.expiryDate = $("#dateExpiryDate").val();
                                }

                                InsertNotification(Notification);
                            }

                        }
                        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");

                    }

                    else {
                        noty({ text: UpdationStatus.Status, type: 'error' });
                    }

                    BindEvents(1);
                    //BindOldEvents();

                }
                else {
                    var UpdationStatus = UpdateEvent(EducationForum);

                    if (UpdationStatus.Status == "1") {
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            if (IsMobNotified) {
                                var Notification = new Object();
                                Notification.notificationType = NotificationTypeCode;
                                Notification.linkID = Events.eventId;
                                Notification.caption = Events.eventName;
                                Notification.description = ($("#txtnotificationCOntent").val() != null ? $("#txtnotificationCOntent").val() : "");
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
                        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");

                    }

                    else {
                        noty({ text: UpdationStatus.Status, type: 'error' });
                    }

                    BindEvents(1);
                    //BindOldEvents();
                }
            }
            else {

                //INSERT
                ///////Image insert using handler
                var imgresult;
                if ((imgresult = $('#UpEvent')[0].files.length > 0)) {

                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#UpEvent')[0].files[0];
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('ChurchID', EducationForum.ChurchID);
                    formData.append('ID', EducationForum.ID);
                    formData.append('ImageID', EducationForum.ImageID);
                    formData.append('EventName', EducationForum.EventName);
                    formData.append('Description', EducationForum.Description);
                    formData.append('StartDate', EducationForum.StartDate);
                    formData.append('EndDate', EducationForum.EndDate);
                    formData.append('CreatedBY', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'EducationForumImageInsert');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    if (result.Status == "1") {
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdfEventID").val(result.eventId);
                        $("#hdfImageID").val(result.imageId);
                        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
                        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
                        $('#btnNotify').attr('data-target', '#notificationModal');
                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {

                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = result.eventId;
                            Notification.caption = Events.eventName;
                            Notification.description = (($('#txtnotificationCOntent').val() != "" && $("#txtnotificationCOntent").val() != null) ? $("#txtnotificationCOntent").val() : "");
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }

                            var notires = InsertNotification(Notification);
                            if (notires == "1") {
                                IsMobNotified = false;
                                $('#lblAlreadyNotificationSend').show();
                                $('#txtnotificationCOntent').attr('disabled', true);

                            }
                        }


                    }

                    else {
                        noty({ text: InsertionStatus.Status, type: 'error' });
                    }

                    BindEvents(1);
                    //BindOldEvents();

                }
                else {
                    var InsertionStatus = InsertEvent(EducationForum);

                    if (InsertionStatus.Status == "1") {
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdfEventID").val(InsertionStatus.ID);
                        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
                        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
                        $('#btnNotify').attr('data-target', '#notificationModal');
                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {

                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = InsertionStatus.eventId;
                            Notification.caption = Events.eventName;
                            Notification.description = (($('#txtnotificationCOntent').val() != "" && $("#txtnotificationCOntent").val() != null) ? $("#txtnotificationCOntent").val() : "");
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }

                            var notires = InsertNotification(Notification);
                            if (notires == "1") {
                                IsMobNotified = false;
                                $('#lblAlreadyNotificationSend').show();
                                $('#txtnotificationCOntent').attr('disabled', true);

                            }
                        }


                    }

                    else {
                        noty({ text: InsertionStatus.Status, type: 'error' });
                    }

                    BindEvents(1);
                    //BindOldEvents();
                }
            }
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function DeleteEvents() {
    try {
        var deleteConirm = confirm("Want to delete?");

        if (deleteConirm) {
            var EventID = $("#hdfEventID").val()

            var Events = new Object();
            Events.eventId = EventID;

            var DeletionStatus = DeleteEvent(Events);
            switch (DeletionStatus.Status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    Dynamicbutton("NoticeEdit", "EditCancel", "");
                    Dynamicbutton("btnSave", "SaveCancel", "");
                    Dynamicbutton("btnDelete", "DeleteCancel", "");
                    Dynamicbutton("btnReset", "ResetCancel", "");
                    Dynamicbutton("btnNotify", "PushNotiCancel", "");
                    break;
                case "0":
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
                default:
                    noty({ type: 'error', text: result.Status });
                    break;

            }


            BindEvents();
            BindOldEvents();
            SetControlsInNewEventFormat();

        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
// Bind Latest Events - Top5
function BindEvents(count) {
    try {
        var jsonResult = {};
        var EducationForum = new Object();
        jsonResult = GetEvents(count);
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
    catch (e) {

    }

}

function FillEvents(Records) {
    try {
        $('#DivNoticeType1').empty();
        $('#OldEventsGrid').empty();
        var today = new Date();
        var Latestcount = 0;
        var OldCount = 0;
        $.each(Records, function (index, Records) {
            debugger;
            
             if ((Datecheck(ConvertJsonToDate(Records.EndDate)))>today)
             {
                 Latestcount++;
                 var url = Records.URL;
                 var html = '';
                 html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + (Records.EventName != null ? Records.EventName : "") + '</p><span class="fa fa-calendar-check-o" id="spnStartDate"></span>  <span class="spnDateValues" >' + (Records.StartDate != null ? ConvertJsonToDate(Records.StartDate) : "") + '</span>&nbsp;<br /><p>' + (Records.Description != null ? Records.Description : "") + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details </a><br/><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="ViewResponse(\'' + Records.ID + '\')" > View Responses</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
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
             }
             else if ((Datecheck(ConvertJsonToDate(Records.EndDate))) < today)
             {
                 OldCount++;
                 var url = Records.URL;
                 var html = '';
                 html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.EventName + '</p><span class="fa fa-calendar-check-o" id="spnStartDate"></span> <span class="spnDateValues" >' + (Records.StartDate != null ? ConvertJsonToDate(Records.StartDate) : "") + '</span>&nbsp;<br /><p>' + Records.Description + '</p><span class="" style="float:right;><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a><br/><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="ViewResponse(\'' + Records.ID + '\')" > View Responses</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div>'
                    $("#OldEventsGrid").append(html);

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
             }
        });

        if (Latestcount == 0) {
            //$('.dataTables_empty').parent().parent().remove();
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#DivNoticeType1").append(img);
        }
        if (OldCount == 0) {
            //$('.dataTables_empty').parent().parent().remove();
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#OldEventsGrid").append(img);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
function ViewResponse(EventID)
{
    var EduEventResponse = new Object();
    EduEventResponse.EduEventID = EventID;
    EduEventResponse.ChurchID = churchObject.chid;
    var result = GetResponsecount(EduEventResponse)
    $('#lblResponseCound').text(result.TotalCount);
    $('#lblAttendCound').text(result.AttendCount);
    $('#lblNotAttendCound').text(result.NotSureCount);
    $('#lblNotSureCound').text(result.NotAttendCount);
    DataTables.EduForumResponse.clear().rows.add(GetResponse(EduEventResponse)).draw(false);
    
    $('#EventEditDivBox').show();
    $('#EditContent').hide();
    $('#divView').hide();
    $('#ResponseSection').show();
    Dynamicbutton("NoticeEdit", "EditCancel", "");
    Dynamicbutton("btnSave", "SaveCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnNotify", "SendNotiCancel", "");
}
function GetResponse(EduEventResponse)
{
    try {
        var ds = {};
        var table = {};
        var data = "{'forumResponseObj':" + JSON.stringify(EduEventResponse) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetEduResponse");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }
}
function GetResponsecount(EduEventResponse)
{

    try {
        var ds = {};
        var table = {};
        var data = "{'forumResponseObj':" + JSON.stringify(EduEventResponse) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetResponseCountWithID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }
}
function GetEvents(count) {
    try {
        var ds = {};
        var table = {};
        var data = "{'Count':" + count + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetAllEduForumLatestEvents");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//--------------------------------//

//Clear Controls
function ClearControls() {
    try {
        debugger;
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

        $('#UpEvent')[0].files[0] = null;

        $("#rdoNotificationYes").parent().removeClass('checked');
        $('#rdoNotificationNo').parent().addClass('checked');

        $("#lblAlreadyNotificationSend").hide();
        $("#DivNotificationContent").hide();
        IsAlreadyNotified = false;
        
    }
    catch (e) {

    }

}

function SetControlsInNewEventFormat() {
    try {
        $('#tabEvents').click();
        debugger;
        ClearControls();
        RemoveStyle();
        $('#ResponseSection').hide();
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
        //document.getElementById("rdoNotificationNo").disabled = false;
        //document.getElementById("rdoNotificationYes").disabled = false;
        $("#rdoNotificationYes").parent().removeClass('checked');
        $('#rdoNotificationNo').parent().addClass('checked');
        $('#txtnotificationCOntent').attr('disabled', false);
        $("#h1Event").text("New Event");

        $("#EventEditDivBox").show();
        $("#EditContent").show();
        $("#divView").hide();
        $("#txtEventName").focus();
        //$("#btnSave").show();
        Dynamicbutton("btnSave", "Save", "SaveEvents");
        Dynamicbutton("btnDelete", "DeleteCancel", "");
        Dynamicbutton("NoticeEdit", "EditCancel", "");
        Dynamicbutton("btnReset", "Reset", "cancelEdit");
        Dynamicbutton("btnNotify", "PushNotiCancel", "");
        //$("#btnCancel").show();
        //$("#btnDelete").hide();

        $("#hdfEventID").val("");
        $("#lblAlreadyNotificationSend").hide();
        $('#NotificationInfo').hide();
        $('#txtCaption').attr('disabled', false);
        $('#txtnotificationCOntent').attr('disabled', false);
        //$("#NoticeEdit").hide();
    }
    catch (e) {

    }


}

function SetControlsInViewFormat() {
    try {
        debugger;
        $('#ResponseSection').hide();
         $("#EventEditDivBox").show();
        $("#EditContent").hide();
        $("#divView").show();
    }
    catch (e) {

    }

}

function SetControlsInEditableFormat() {
    try {
        debugger;
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
        $('#ResponseSection').hide();
        $("#lblAlreadyNotificationSend").hide();
        IsAlreadyNotified = false;
    }
    catch (e) {

    }

}
//--------------------------------//

//Edit -- view only
function EditOnClick(id) {
    try {
        debugger;
        RemoveStyle();
        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
        $('#btnNotify').attr('data-target', '#notificationModal');
        Dynamicbutton("NoticeEdit", "Edit", "FixedEditClick");
        Dynamicbutton("btnSave", "SaveCancel", "");
        Dynamicbutton("btnReset", "ResetCancel", "");
        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
        Dynamicbutton("btnNotify", "PushNotiCancel", "");
        SetControlsInViewFormat();
        var EducationForum = new Object();
        EducationForum.ID = id;
        if (id != "" && id != null) {
            $("#hdfEventID").val(id);
            var jsonResult = {};
            jsonResult = GetEventsByEventID(EducationForum);
            if (jsonResult != undefined) {
                    $("#h1Event").text(jsonResult.EventName);
                    url = jsonResult.URL;
                    if (url == null|| url=="") {
                        url = "../img/No-Img_Chosen.png";
                    }
                    $('#eventPreviewOnView').attr('src', url);
                    $("#aZoomEventImage").attr("href", url);
                    $('#aZoomEventImage').attr('data-title', jsonResult.EventName);
                    imageId = jsonResult.ImageID;
                    imgPath = jsonResult.URL;
                    DeletedImgID = imageId;
                    DeletedImgPath = imgPath;
                    if (jsonResult.Description == null || jsonResult.Description == "" || jsonResult.Description == undefined) {
                        //$("#NoticePreviewOnView").css('width', '300px!important');
                        $('#eventPreviewOnView').width(600);
                        $('#eventPreviewOnView').height('auto');
                        $('#lblEventDescriptionOnView').text("");
                    }

                    else {
                        $('#eventPreviewOnView').height(200);
                        $('#eventPreviewOnView').width(150);
                        $('#lblEventDescriptionOnView').text(jsonResult.Description);
                    }
            }
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}

function GetEventsByEventID(EducationForum) {
    try {
        debugger;
        var ds = {};
        var table = {};
        var data = "{'eduForumEventsObj':" + JSON.stringify(EducationForum) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetEventsByEventID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
function cancelEdit() {
    if ($("#hdfEventID").val() != "") {
        FixedEditClick();
    }
    else {
        RemoveStyle();
        ClearControls();
        $("#optHideNo").parent().removeClass('checked');
        $('#optHideYes').parent().addClass('checked');
        //document.getElementById("rdoNotificationNo").disabled = false;
        //document.getElementById("rdoNotificationYes").disabled = false;
        $("#rdoNotificationYes").parent().removeClass('checked');
        $('#rdoNotificationNo').parent().addClass('checked');
        $('#txtnotificationCOntent').attr('disabled', false);
        $("#h1Event").text("New Event");
    }
    //$('#btnCancel').click();
}

function FixedEditClick() {
    try {
        debugger;
        Dynamicbutton("NoticeEdit", "EditCancel", "");
        Dynamicbutton("btnSave", "Save", "SaveEvents");
        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
        Dynamicbutton("btnReset", "Reset", "cancelEdit");
        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
        $('#btnNotify').attr('data-target', '#notificationModal');
        ClearControls();
        SetControlsInEditableFormat();
        $("#h1Event").text("Edit Event");
        var EducationForum = new Object();
        EducationForum.ID = $("#hdfEventID").val();
        var jsonResult = {};
        jsonResult = GetEventsByEventID(EducationForum);
        if (jsonResult != undefined) {
                $("#txtEventName").val(jsonResult.EventName);
                $("#txtDescription").val(jsonResult.Description);
                url = jsonResult.URL;
                if (url == null|| url=="") {
                    url = "../img/No-Img_Chosen.png";
                    $('#NoticePreview').attr('src', url);
                }
                else {
                    $('#NoticePreview').attr('src', url);
                }
                imageId = jsonResult.ImageID;
                imgPath = url;
                if (jsonResult.StartDate != null && jsonResult.StartDate != "") {
                    $("#dateStartDate").val(jsonResult.StartDate);
                }

                if (jsonResult.EndDate != null && jsonResult.EndDate != "") {
                    $("#dateEndDate").val(jsonResult.EndDate);
                }
                if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined && jsonResult.NotificationID!="") {
                    IsAlreadyNotified = true;
                    IsMobNotified = false;
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text("Notification Already added");
                    $('#NotificationInfo').show();
                    $('#txtCaption').attr('disabled', true);
                    $('#txtCaption').val(jsonResult.Caption);
                    $('#txtnotificationCOntent').attr('disabled', true);
                    $("#txtnotificationCOntent").val(jsonResult.Description);
                }
                else {
                    $("#lblAlreadyNotificationSend").hide();
                    $('#NotificationInfo').hide();
                    $('#txtnotificationCOntent').attr('disabled', false);
                    $('#txtCaption').attr('disabled', false);
                    IsMobNotified = true;
                    IsAlreadyNotified = false;
                }
            //});
        }
        RemoveStyle();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//--------------------------------//

//Insert
function InsertEvent(EducationForum) {
    try {
        var ds = {};
        var table = {};
        var data = "{'eduForumEventsObj':" + JSON.stringify(EducationForum) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/InsertEduEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//--------------------------------//


//update
function UpdateEvent(EducationForum) {
    try {
        var ds = {};
        var table = {};
        var data = "{'eduForumEventsObj':" + JSON.stringify(EducationForum) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/UpdateEduEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//--------------------------------//


//Delete
function DeleteEvent(EducationForum) {
    try {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/DeleteEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }
}

function DeleteFileFromFolder(imgPath) {
    try {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}

function DeleteAppImage(AppImages) {
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/EducationForum.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}
//--------------------------------//
function GetEduAbout() {
    var data = "";
    jsonResult = getJsonData(data, "../AdminPanel/EducationForum.aspx/GetEduAbout");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function InsertEduAbout(EduEventAbout) {
    try {
        var ds = {};
        var table = {};
        var data = "{'eduForumAboutObj':" + JSON.stringify(EduEventAbout) + "}";
        ds = getJsonData(data, "../AdminPanel/EducationForum.aspx/InsertEduAbout");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//Insert Notification
function InsertNotification(Notification) {


    var data = "{'NotificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/EducationForum.aspx/InsertNotification");
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

function EventValidation() {
    try {

        var Name = $('#txtEventName');
        var StartDate = $('#dateStartDate');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
            , { id: StartDate[0].id, name: StartDate[0].name, Value: StartDate[0].value }
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }


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

function RemoveStyle() {

    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}
//--------------------------------//
