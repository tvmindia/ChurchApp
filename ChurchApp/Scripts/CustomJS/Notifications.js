$("document").ready(function (e) {
    BindAsyncNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });
    $(".Delete").click(function () {
        var result = "";
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            result = DeleteNotification();
        }
        else {
            return false;
        }
    });
    $(".Cancel").click(function () {
        $("#NotificationEditDivBox").hide();
        $("#detailsHeading").text("");
    });

    $(".aViewDetails").click(function () {
        //do something
        debugger;
        $(".NotificationEdit").css("display", "");
        $("#isDeleteDiv").css("display", "");
        $(".Save").hide();
        $(".Delete").show();
        $("#detailsHeading").text("Details");
        $("#NotificationEditDivBox").show();
        var NotificationID = $(this).attr('id');
        $("#hdfNotificationID").val(NotificationID.replace('/',""));

        var churchID = $("#hdfChurchID").val();

        var Notification = new Object();
        Notification.notificationID = NotificationID;
        Notification.churchId = churchID;

        BindControlsOnViewDetails(Notification);


    });

    $(".NotificationEdit").click(function () {
        debugger;
        $(".Save").show();
        $("#detailsHeading").text("Edit Notification");
        var caption = $("#lblCaption").text();
        var description = $("#lblDescription").text();
        var startDate = $("#lblStartDate").text();
        var expiryDate = $("#lblExpiryDate").text();
        HideAllLabels();
        ShowAllTextBoxes();
        $("#txtCaption").val(caption);
        $("#txtDescription").val(description);
        $("#txtStartDate").val(startDate);
        $("#txtExpiryDate").val(expiryDate);
        $("#optDeleteYes").parent().removeClass('checked');
        $('#optDeleteNo').parent().addClass('checked');
        $("#optHideYes").parent().removeClass('checked');
        $('#optHideNo').parent().addClass('checked');
    });
    $(".Save").click(function () {
        debugger;
        var result = "";
        var caption = $("#txtCaption").val();
        var type = $("#ddlType").val();
        var description = $("#txtDescription").val();
        var startDate = $("#txtStartDate").val();
        var expiryDate = $("#txtExpiryDate").val();
        var churchId = $("#hdfChurchID").val();
        var notificationID = $("#hdfNotificationID").val();
        var linkID = $("#LinkID").val().replace('/', "");
        var Notifications = new Object();
        Notifications.caption = caption;
        Notifications.notificationType = type;
        Notifications.description = description;
        Notifications.startDate = startDate;
        Notifications.expiryDate = expiryDate;
        Notifications.churchId = churchId;
        Notifications.linkID = linkID;
        Notifications.notificationID = notificationID;
        var addOrEdit = $("#detailsHeading").text();
        if (addOrEdit == "Add Notification")
        {
            result = InsertNotification(Notifications);
            if (result == "1") {
                alert("Success");
                BindAsyncNotificationTable();
                $("#NotificationEditDivBox").hide();
            }
            else {
                alert("Failure");
            }
        }
        else
        {
            result = UpdateNotification(Notifications);
            if (result == "1") {
                alert("Success");
                BindAsyncNotificationTable();
                $("#NotificationEditDivBox").hide();
            }
            else {
                alert("Failure");
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
    $("#NotificationEditDivBox").show();
    ShowAllTextBoxes()
    HideAllLabels();
    $(".Save").show();
    $(".Delete").hide();
    $("#isDeleteDiv").css("display", "none")
    $("#ddlType").select2("val", "");
    $("#txtCaption").val("");
    $("#txtDescription").val("");
    $("#txtStartDate").val("");
    $("#txtExpiryDate").val("");
    $("#optDeleteYes").parent().removeClass('checked');
    $('#optDeleteNo').parent().addClass('checked');
    $("#optHideYes").parent().removeClass('checked');
    $('#optHideNo').parent().addClass('checked');
}

function DeleteNotification()
{

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

            $("#lblCaption").text(jsonResult.Caption);
            $("#lblDescription").text(jsonResult.Description);
            $("#lblStartDate").text(startDate);
            $("#lblExpiryDate").text(ExpiryDate);
            $("#ddlType").val(jsonResult.Type).trigger("change");
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
function BindGetAllNotificationTable(Records)
{
    $("#NewNotificationGrid").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        if (Records.Type == "evt")
        {
            var html = '<div class="task high" id="taskDiv" ><ul class="dashboard-list"><li class="Notificationlist"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '&nbsp;&nbsp;<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
        }
        if (Records.Type == "ntc")
        {
            var html = '<div class="task high" id="taskDiv"><ul class="dashboard-list"><li class="Notificationlist"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
        }

       
       
        $("#NewNotificationGrid").append(html);
})
    if(length==0)
    {

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
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month ,year].join('/');
}
