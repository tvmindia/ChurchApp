$("document").ready(function (e) {
    BindAsyncNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });
    $(".aViewDetails").click(function () {
        //do something
        debugger;


        $("#NotificationEditDivBox").show();
        var NotificationID = $(this).attr('id');
        $("#hdfNotificationID").val(NotificationID);

        var churchID = $("#hdfChurchID").val();

        var Notification = new Object();
        Notification.notificationID = NotificationID;
        Notification.churchId = churchID;

        BindControlsOnViewDetails(Notification);


    });

});
//end of document.ready()

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
            $("#lblType").text(jsonResult.Type);
            $("#lblDescription").text(jsonResult.Description);
            $("#lblStartDate").text(startDate);
            $("#lblExpiryDate").text(ExpiryDate);
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
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        if (Records.Type == "Events")
        {
            var html = '<div class="task high" ><ul class="dashboard-list"><li class="Notificationlist"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '&nbsp;&nbsp;<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
        }
        if (Records.Type == "Notices")
        {
            var html = '<div class="task high"><ul class="dashboard-list"><li class="Notificationlist"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<br/><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
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
    $("#lblType").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblExpiryDate").hide();
}
function ShowAllLabels() {
    $("#lblCaption").show();
    $("#lblType").show();
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

    return [month, day, year].join('/');
}
