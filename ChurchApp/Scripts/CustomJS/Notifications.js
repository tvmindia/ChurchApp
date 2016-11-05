$("document").ready(function (e) {
    BindAsyncNotificationTable();
    BindAsynOldNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });

    $(".Delete").click(function () {
        var result = "";
        var churchId = $("#hdfChurchID").val();
        var notificationID = $("#hdfNotificationID").val();
        var Notifications = new Object();
        Notifications.churchId = churchId;
        Notifications.notificationID = notificationID;
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            result = DeleteNotification(Notifications);
            if(result=="1")
            {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Deleted Successfully");
                BindAsyncNotificationTable();
                BindAsynOldNotificationTable();
                $('#NotificationEditDivBox').hide();
                $("#NotificationDetails").hide();
            }
            else
            {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Error..!!!");
            }
        }
        else {
            return false;
        }
    });
    $(".Cancel").click(function () {
        $("#NotificationEditDivBox").hide();
        $("#detailsHeading").text("");
        $('#rowfluidDiv').hide();
    });
    $("#cancelDetail").click(function () {
        $("#NotificationDetails").hide();
    });
    $(".aViewDetails").live({

        click: function (e) {// Delete button click
            debugger;         
            $('#rowfluidDiv').hide();
            $("#btnContainer").show();
            $(".Save").hide();
            $(".Delete").show();
            $(".Cancel").show();
            var NotificationID = $(this).attr('id');
            $("#hdfNotificationID").val(NotificationID.replace('/', ""));
            var churchID = $("#hdfChurchID").val();
            var Notification = new Object();
            Notification.notificationID = NotificationID;
            Notification.churchId = churchID;
            BindControlsOnViewDetails(Notification);         
        }
    });

    $(".NotificationEdit").click(function () {
        debugger;
        $('#rowfluidDiv').hide();
        $(".Save").show();
        $("#NotificationDetails").hide();
        $("#NotificationEditDivBox").show();
        $("#detailsHeading").text("Edit Notification");
        var type = $("#hdfType").val();
        $("#ddlType").val(type).trigger("change");
        var caption = $("#captionHeading").text();
        var description = $("#desc").text();
        var startDate = $("#sDate").text();
        if (startDate.includes(":")) {
            startDate = startDate.split(":")[1];
        }
        var expiryDate = $("#eDate").text();
        if (expiryDate.includes(":")) {
            expiryDate = expiryDate.split(":")[1];
        }
        HideAllLabels();
        ShowAllTextBoxes();
        $("#txtCaption").val(caption);
        $("#txtDescription").val(description);
        $("#txtStartDate").val(startDate);
        $("#txtExpiryDate").val(expiryDate);
        $(".NotificationEdit").css("display", "none");
    });
    $(".Save").click(function () {
        debugger;
        var result = "";
        var caption = $("#txtCaption").val();
        var type = $("#ddlType").val();
        var description = $("#txtDescription").val();
        var startDate = $("#txtStartDate").val();
        if (startDate.includes(","))
        {
            startDate = startDate.split(":")[1];
        }
        //startDate = startDate.split("-")[1] + "-" + startDate.split("-")[0] + "-" + startDate.split("-")[2];
        var expiryDate = $("#txtExpiryDate").val();
        if (expiryDate.includes(","))
        {
            expiryDate = expiryDate.split(":")[1];
        }       
        var churchId = $("#hdfChurchID").val();
        var notificationID = $("#hdfNotificationID").val();
        var linkID = $("#LinkID").val().replace('/', "");
        var Notifications = new Object();
        Notifications.caption = caption;
        Notifications.notificationType = type;
        Notifications.description = description;
        Notifications.startDate =startDate;
        Notifications.expiryDate = expiryDate;
        Notifications.churchId = churchId;
        Notifications.linkID = linkID;
        Notifications.notificationID = notificationID;
        var addOrEdit = $("#detailsHeading").text();
        if (addOrEdit == "Add Notification")
        {
            result = InsertNotification(Notifications);
            if (result == "1") {
                BindAsyncNotificationTable();
                BindAsynOldNotificationTable();
                $("#NotificationEditDivBox").hide();
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Added Successfully");
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Error..!!!");
            }
        }
        else
        {
            result = UpdateNotification(Notifications);
            if (result == "1") {
                BindAsyncNotificationTable();
                BindAsynOldNotificationTable();
                $("#NotificationEditDivBox").hide();
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Updated Successfully");
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Error..!!!");
            }
        }
       
    });
    $("#ddlType").select2({
        placeholder: "Choose Types",
        allowClear: true,
        data: BindNotificationDropDown()
    });
});
//end of document.ready()

function DetailsView()
{
    debugger;
    var caption = $("#lblCaption").text();
    var description = $("#lblDescription").text();
    var startDate = $("#lblStartDate").text();
    var expiryDate = $("#lblExpiryDate").text();
    $("#captionHeading").val(caption);
    $("#desc").val(description);
    $("#sDate").val("StartDate:"+startDate);
    $("#eDate").val("ExpiryDate:"+expiryDate);
    $("#NotificationDetails").show();
    $("#NotificationEditDivBox").hide();
}

function BindNotificationDropDown() {
    var jsonResult = {};
    var NotificationType = new Object();
    jsonResult = GetAllNotificationTypes(NotificationType);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllNotificationTypes(NotificationType) {
    var ds = {};
    var table = {};
    var data = "{'NotificationTypeObj':" + JSON.stringify(NotificationType) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNotificationType");
    table = JSON.parse(ds.d);
    return table;
}
function UpdateNotification(Notifications) {
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/UpdateNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function InsertNotification(Notifications) {
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function AddNotification()
{
    $(".NotificationEdit").css("display", "none");
    $("#detailsHeading").text("Add Notification");
    $("#NotificationDetails").hide();
    $("#NotificationEditDivBox").show();
    ShowAllTextBoxes()
    HideAllLabels();
    $(".Save").show();
    $(".Delete").hide();
    $("#ddlType").select2("val", "");
    $("#txtCaption").val("");
    $("#txtDescription").val("");
    $("#txtStartDate").val("");
    $("#txtExpiryDate").val("");
    $('#rowfluidDiv').hide();
    RemoveCaptionCustomization();
}

function DeleteNotification(Notifications)
{
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/DeleteNotification");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsOnViewDetails(Records)
{
    debugger;
    HideAllTextBoxes();
    ShowAllLabels();
    var jsonResult = {};
    jsonResult = GetNotificationByID(Records);
    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            var startDate = new Date(parseInt(jsonResult.StartDate.substr(6)));
            startDate = formattedDate(startDate);

            var ExpiryDate = new Date(parseInt(jsonResult.ExpiryDate.substr(6)));
            ExpiryDate = formattedDate(ExpiryDate);
            $("#hdfType").val(jsonResult.Type);
            $("#captionHeading").text(jsonResult.Caption);
            $("#desc").text(jsonResult.Description);
            $("#sDate").text("StartDate:" + startDate);
            $("#eDate").text("ExpiryDate:" + ExpiryDate);
            $("#NotificationDetails").show();
            $("#NotificationEditDivBox").hide();
            $(".NotificationEdit").css("display", "");
        });
    }

}
function GetNotificationByID(Records)
{
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Records) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetNotificationByID");
    table = JSON.parse(ds.d);
    return table;
}
function BindAsyncNotificationTable() {
    debugger;
    var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = GetAllNotifications(Notifications);
    debugger;
    if (jsonResult != undefined) {
        BindGetAllNotificationTable(jsonResult);
    }

}
function BindAsynOldNotificationTable()
{
    var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = GetOldNotifications(Notifications);
    debugger;
    if (jsonResult != undefined) {
        BindGetOldNotificationTable(jsonResult);
    }
}
function BindGetAllNotificationTable(Records)
{
    $("#NewNotificationGrid").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        var desc = Records.Description;
        if (desc.length > 150) desc = desc.substring(0, 150) + "...";
        var expiryDate = new Date(parseInt(Records.ExpiryDate.substr(6)));
        var expiryDate = formattedDate(expiryDate);
        if (Records.Type == "evt")
        {
            var html = '<ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/>' + desc + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/>'
        }
        if (Records.Type == "ntc")
        {
            var html = '<ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/>' + desc + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/>'
        }

       
       
        $("#NewNotificationGrid").append(html);
})
    if(length==0)
    {

    }
}
function BindGetOldNotificationTable(Records) {
    $("#OldNotificationGrid").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        var desc = Records.Description;
        if (desc.length > 150) desc = desc.substring(0, 150) + "...";
        var expiryDate = new Date(parseInt(Records.ExpiryDate.substr(6)));
        var expiryDate = formattedDate(expiryDate);
        if (Records.Type == "evt") {
            var html = '<div class="task high" id="taskDiv" style="border-left: 2px solid #78cd51; padding-left: 5px;" ><ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/><span class="Desc">' + desc + '</span><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
        }
        if (Records.Type == "ntc") {
            var html = '<div class="task high" id="taskDiv" style="border-left: 2px solid #78cd51; padding-left: 5px;"><ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/' + desc + '><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
        }



        $("#OldNotificationGrid").append(html);
    })
    if (length == 0) {

    }
}
function GetAllNotifications(Notifications) {
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNotifications");
    table = JSON.parse(ds.d);
    return table;
}
function GetOldNotifications(Notifications) {
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SelectOldNotifications");
    table = JSON.parse(ds.d);
    return table;
}
function HideAllLabels() {
    $("#lblCaption").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblExpiryDate").hide();
   
}
function ShowAllLabels() {
    $("#lblCaption").show();
    $("#lblDescription").show();
    $("#lblStartDate").show();
    $("#lblExpiryDate").show();
}
function HideAllTextBoxes() {
    $("#txtCaption").hide();
    $("#txtDescription").hide();
    $("#txtStartDate").hide();
    $("#txtExpiryDate").hide();
    $("#ddlType").hide();
}
function ShowAllTextBoxes() {
    $("#txtCaption").show();
    $("#txtDescription").show();
    $("#txtStartDate").show();
    $("#txtExpiryDate").show();
    $("#ddlType").show();
}

function formattedDate(date) {
    debugger;
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}


function formattedDateForInputText(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year,month,day].join('-');
}
