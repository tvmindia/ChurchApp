

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'evt';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table
var IsMobNotified = '';
var IsAlreadyNotified = false;
var MaxCharacterLimit = 200;
var churchObject = {};

//--------------------------------//


$("document").ready(function (e) {
    try
    {
         
        $('[data-toggle="popover"]').popover();
        BindEvents();
        BindOldEvents();
        //Setting current churchid
        churchObject.chid = $("#hdfchid").val();
        $('#btnSaveNotification').click(function () {
            if (NotificationValidation) {
                
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
                        $("#lblAlreadyNotificationSend").text("Notifications Already added");
                        $('#NotificationInfo').show();
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
        //--Limit Notification Content 
        $('#txtnotificationCOntent').keypress(function (e) {
            try
            {
                if (this.value.length == MaxCharacterLimit) {
                    e.preventDefault();
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text("Maximum " + MaxCharacterLimit + " characters");
                }

                else
                {
                    $("#lblAlreadyNotificationSend").text("Already Notification added");
                    $("#lblAlreadyNotificationSend").hide();

                }
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
        });

        $('#txtnotificationCOntent').keydown(function (e) {
            try
            {
                if (this.value.length == MaxCharacterLimit) {
                    $("#lblAlreadyNotificationSend").text("Already Notification added");
                    $("#lblAlreadyNotificationSend").hide();
                }
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
           

        });

        $("#rdoNotificationYes").click(function () {

             
            try
            {
                if (IsAlreadyNotified) {
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text("Already Notification added");
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

                    else {
                        $("#txtnotificationCOntent").val($("#txtDescription").val());
                    }
                }
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
            

       

        });

        $("#rdoNotificationNo").click(function () {
            $("#DivNotificationContent").hide();
            $("#lblAlreadyNotificationSend").hide();

        });

        $('#btnCancel').click(function (e) {
            try
            {
                 
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
                if ($("#hdfEventID").val() == "")
                {
                    $('#EventEditDivBox').hide();
                }
                
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
            
        });

        //$('#btnSave').click(function (e) {
           
            
        //});

        //$('#btnDelete').click(function (e) {
            
            

        //});

        //------------- * LATEST Events view more,Back  *------------//

        //VIEW MORE Click Click of LATEST Events
        $(".aViewMore").live({

            click: function (e) {
                try {
                    BindAllLatestEvents();
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
                try
                {
                    BindEvents();

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
                try
                {
                    $(".aOldBack").show();
                    $('.aOldViewMore').hide();
                    BindAllOldEvents();
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
                try
                {
                    $(".aOldBack").hide();
                    $(".aOldViewMore").show();
                    BindOldEvents();

                    $("#divLatestEvents").show();
                    BindEvents();
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
});//end of document.ready
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
function SaveEvents()
{
    try {

        var today = new Date();
        var startcheck = $("#dateStartDate").val();
        var endcheck = $("#dateEndDate").val();
        var Expirecheck = $("#dateExpiryDate").val();

        if (endcheck != "" || Expirecheck != "") {
            if ((Datecheck(endcheck) < Datecheck(startcheck))) {
                noty({ text: Messages.InvalidExpiry, type: 'information' });
                return false;
            }
            if ((Datecheck(Expirecheck) < Datecheck(startcheck))) {
                noty({ text: Messages.InvalidExpiry, type: 'information' });
                return false;
            }
        }
        var IsValid = EventValidation();

        if (IsValid) {

            var Events = new Object();
            Events.eventName = (($("#txtEventName").val() != "" && $("#txtEventName").val() != null) ? $("#txtEventName").val() : "");
            Events.description = (($("#txtDescription").val() != "" && $("#txtDescription").val() != null) ? $("#txtDescription").val() : "");
            Events.startDate = (($("#dateStartDate").val() != "" && $("#dateStartDate").val() != null) ? $("#dateStartDate").val() : "");
            Events.endDate = (($("#dateEndDate").val() != "" && $("#dateEndDate").val() != null) ? $("#dateEndDate").val() : "");
            Events.eventExpiryDate = (($("#dateExpiryDate").val() != "" && $("#dateExpiryDate").val() != null) ? $("#dateExpiryDate").val() : "");
            Events.isAutoHide = $("#hdfIsAutoHide").val();
            Events.churchId = churchObject.chid;
            Events.isAutoHide = true;
            if ($('input[name=rdoHide]:checked').val() == "No") //Add Notification
            {
                Events.isAutoHide = false;
            }
            $("#hdfIsAutoHide").val(Events.isAutoHide);


            if ($("#hdfEventID").val() != "" && $("#hdfEventID").val() != null) {


                Events.eventId = $("#hdfEventID").val();

                var imgresult;
                if ((imgresult = $('#UpEvent')[0].files.length > 0)) {
                    Events.imageId = $("#hdfImageID").val();
                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#UpEvent')[0].files[0];
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('churchID', Events.churchId);
                    formData.append('eventId', Events.eventId);
                    formData.append('EventimageId', Events.imageId);
                    formData.append('eventName', Events.eventName);
                    formData.append('description', Events.description);
                    formData.append('startDate', Events.startDate);
                    formData.append('endDate', Events.endDate);
                    formData.append('eventExpiryDate', Events.eventExpiryDate);
                    formData.append('isAutoHide', Events.isAutoHide);
                    formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'EventImageUpdate');
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

                    BindEvents();
                    BindOldEvents();

                }
                else {
                    var UpdationStatus = UpdateEvent(Events);

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

                    BindEvents();
                    BindOldEvents();
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
                    formData.append('churchID', Events.churchId);
                    formData.append('eventName', Events.eventName);
                    formData.append('description', Events.description);
                    formData.append('startDate', Events.startDate);
                    formData.append('endDate', Events.endDate);
                    formData.append('eventExpiryDate', Events.eventExpiryDate);
                    formData.append('isAutoHide', Events.isAutoHide);
                    formData.append('createdby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'EventImageInsert');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    //switch (result.result) {
                    //    case "1":
                    //        noty({ type: 'success', text: Messages.InsertionSuccessFull });
                    //        $("#hdfPriestID").val(result.priestID);
                    //        $("#hdfpriestImageID").val(result.imageId);
                    //        break;
                    //    case "2":
                    //        noty({ type: 'error', text: Messages.OperationDuplicateFailure });
                    //        break;
                    //    case "0":
                    //        noty({ type: 'error', text: Messages.FailureMsgCaption });
                    //        break;
                    //    default:
                    //        noty({ type: 'error', text: result.result });
                    //        break;
                    //}
                    //  $('#assVicardiv').remove();
                    // $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
                    //check();
                    // var InsertionStatus = InsertEvent(Events);

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
                                //$('#txtnotificationCOntent').attr('disabled', true);

                            }
                        }


                    }

                    else {
                        noty({ text: InsertionStatus.Status, type: 'error' });
                    }

                    BindEvents();
                    BindOldEvents();

                }
                else {
                    var InsertionStatus = InsertEvent(Events);

                    if (InsertionStatus.Status == "1") {
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdfEventID").val(InsertionStatus.eventId);
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
                                //$('#txtnotificationCOntent').attr('disabled', true);

                            }
                        }


                    }

                    else {
                        noty({ text: InsertionStatus.Status, type: 'error' });
                    }

                    BindEvents();
                    BindOldEvents();
                }
            }
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function DeleteEvents()
{
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
                    noty({ type: 'error', text: DeletionStatus.Status });
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
function BindEvents() {
    try
    {
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
    catch(e)
    {

    }
   
}

function FillEvents(Records) {
    try
    {
        $('#DivNoticeType1').html('');

        $.each(Records, function (index, Records) {
             ;

            var url = Records.URL;
            var html = '';

            if (Records.StartDate == null && Records.EndDate == null && Records.EventExpiryDate == null) {
                html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + (Records.EventName!=null?Records.EventName:"") + '</p><p>' + (Records.Descrtiption!=null?Records.Descrtiption:"") + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
            }

            else {
                html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + (Records.EventName != null ? Records.EventName : "") + '</p><span class="fa fa-calendar-check-o" id="spnStartDate"></span>  <span class="spnDateValues" >' +(Records.StartDate!=null? Records.StartDate:"") + '</span>&nbsp;<br /><p>' + (Records.Descrtiption != null ? Records.Descrtiption : "") + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
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
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function GetEvents(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEvents");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//--------------------------------//



//Bind All latest events
function BindAllLatestEvents() {
    try
    {
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
    catch(e)
    {

    }
    
}

function GetAllLatestEvents(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/GetAllLatestEvents");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//--------------------------------//


//Bind old Events - Top5
function BindOldEvents() {
    try
    {
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
    catch(e)
    {

    }
    
}

function GetOldEvents(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/GetOldEvents");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}

function FillOldEvents(Records) {
    try
    {
        $('#OldEventsGrid').html('');

        $.each(Records, function (index, Records) {
             

            var url = Records.URL;
            var html = '';

            if (Records.StartDate == null && Records.EndDate == null && Records.EventExpiryDate == null) {
                html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.EventName + '</p><p>' + Records.Descrtiption + '</p><span class="" style="float:right;><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div>>/div>'
            }

            else {

                html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.EventName + '</p><span class="fa fa-calendar-check-o" id="spnStartDate"></span> <span class="spnDateValues" >' +(Records.StartDate!=null? Records.StartDate:"") + '</span>&nbsp;<br /><p>' + Records.Descrtiption + '</p><span class="" style="float:right;><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div>'

            }


            //var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.StartDate) + '</span>&nbsp;<span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >' + ConvertJsonToDate(Records.EndDate) + '</span>&nbsp;<span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >' + ConvertJsonToDate(Records.EventExpiryDate) + '</span>&nbsp; <br /><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
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


        });

        if (Records.length == 0) {
            //$('.dataTables_empty').parent().parent().remove();
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#OldEventsGrid").append(img);
        }

    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }  
}

//--------------------------------//


//Bind All old
function BindAllOldEvents() {
    try
    {
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
    catch(e)
    {

    }
    
}

function GetAllOldEvents(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/GetAllOldEvents");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//--------------------------------//


//Clear Controls
function ClearControls() {
    try
    {
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
    catch(e)
    {

    }
   
}

function SetControlsInNewEventFormat() {
    try
    {
        ClearControls();
        RemoveStyle();
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
    catch(e)
    {

    }
   

}

function SetControlsInViewFormat() {
    try
    {
        //$("#lblEventName").show();
        //$("#lblDescription").show();
        //$("#lblStartDate").show();
        //$("#lblEndDate").show();
        //$("#lblExpiryDate").show();
        //$("#txtEventName").focus();
        //$("#txtDescription").hide();
        //$("#dateStartDate").hide();
        //$("#dateEndDate").hide();
        //$("#dateExpiryDate").hide();

        $("#EventEditDivBox").show();
        $("#EditContent").hide();
        $("#divView").show();


        //$("#btnSave").hide();
        //$("#btnCancel").hide();
        //$("#btnDelete").hide();

        //$("#NoticeEdit").show();
        //Dynamicbutton("NoticeEdit", "Edit", "");
    }
    catch(e)
    {

    }
   
}

function SetControlsInEditableFormat() {
    try
    {
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
    catch(e)
    {

    }
   
}
//--------------------------------//

//Edit -- view only
function EditOnClick(id) {
    try
    {
        RemoveStyle();
        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
        $('#btnNotify').attr('data-target', '#notificationModal');
        //$('#NoticeEdit').attr('onclick', 'FixedEditClick();')
        Dynamicbutton("NoticeEdit", "Edit", "FixedEditClick");
        Dynamicbutton("btnSave", "SaveCancel", "");
        Dynamicbutton("btnReset", "ResetCancel", "");
        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
        Dynamicbutton("btnNotify", "PushNotiCancel", "");
        //$('#iconEdit').removeClass("halflings-icon white repeat").addClass("halflings-icon white pencil");
        
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

                     

                    url = jsonResult.URL;

                    if (url == null) {
                        url = "../img/No-Img_Chosen.png";
                    }

                    $('#eventPreviewOnView').attr('src', url);
                    $("#aZoomEventImage").attr("href", url);
                    $('#aZoomEventImage').attr('data-title', jsonResult.EventName);


                    imageId = jsonResult.ImageID;
                    imgPath = jsonResult.URL;

                    DeletedImgID = imageId;
                    DeletedImgPath = imgPath;

                     
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}

function GetEventsByEventID(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEventsByEventID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
function cancelEdit()
{
    if ($("#hdfEventID").val() != "") {
        FixedEditClick();
    }
    else
    {
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
    try
    {
        
        
        //$('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white repeat");
        //$('#NoticeEdit').attr('onclick', 'cancelEdit();');
        Dynamicbutton("NoticeEdit", "EditCancel", "");
        Dynamicbutton("btnSave", "Save", "SaveEvents");
        Dynamicbutton("btnDelete", "Delete", "DeleteEvents");
        Dynamicbutton("btnReset", "Reset", "cancelEdit");
        Dynamicbutton("btnNotify", "PushNoti", "SendNotification");
        $('#btnNotify').attr('data-target', '#notificationModal');
        ClearControls();
        SetControlsInEditableFormat();
        $("#h1Event").text("Edit Event");

        var Events = new Object();
        Events.eventId = $("#hdfEventID").val();

        var jsonResult = {};

        jsonResult = GetEventsByEventID(Events);

        if (jsonResult != undefined) {
            $.each(jsonResult, function (index, jsonResult) {
                
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
                    $("#dateStartDate").val(jsonResult.StartDate);
                }

                if (jsonResult.EndDate != null && jsonResult.EndDate != "") {
                    $("#dateEndDate").val(jsonResult.EndDate);
                }

                if (jsonResult.EventExpiryDate != null && jsonResult.EventExpiryDate != "") {
                    $("#dateExpiryDate").val(jsonResult.EventExpiryDate);
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
                if (jsonResult.NotificationCount != 0 && jsonResult.NotificationCount != undefined) {
                    IsAlreadyNotified = true;
                    IsMobNotified = false;
                    $("#lblAlreadyNotificationSend").show();
                    $("#lblAlreadyNotificationSend").text(jsonResult.NotificationCount+" Notifications Already added");
                    $('#NotificationInfo').show();
                }
                else {
                    $("#lblAlreadyNotificationSend").hide();
                    $('#NotificationInfo').hide();
                    $('#txtnotificationCOntent').attr('disabled', false);
                    $('#txtCaption').attr('disabled', false);
                    IsMobNotified = true;
                    IsAlreadyNotified = false;
                }
            });
        }
        RemoveStyle();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}
//--------------------------------//

//Insert
function InsertEvent(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/InsertEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
   
}
//--------------------------------//


//update
function UpdateEvent(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/UpdateEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//--------------------------------//


//Delete
function DeleteEvent(Events) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
        ds = getJsonData(data, "../AdminPanel/Events.aspx/DeleteEvent");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
}

function DeleteFileFromFolder(imgPath) {
    try
    {
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
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

function SetExpiryDateNow() {
    
    
    var EndDate     = $("#dateEndDate").val();
    var ExpireDate = $("#dateExpiryDate").val();
    if (EndDate != "" && EndDate != null && EndDate != undefined && $("#hdfEventID").val() == "" && ExpireDate == "" ) {
        $("#dateExpiryDate").val(EndDate);
    }
}

function EventValidation() {
    try
    {
       
        var Name = $('#txtEventName');
        var StartDate = $('#dateStartDate');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
            , { id: StartDate[0].id, name: StartDate[0].name, Value: StartDate[0].value }
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
    catch(e)
    {
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
