$("document").ready(function (e) {
    BindAsyncNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });

});
//end of document.ready()

function BindAsyncNotificationTable() {
    debugger;
    var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
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

}

function GetAllNotifications(Notifications) {
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNotifications");
    table = JSON.parse(ds.d);
    return table;
}