﻿$("document").ready(function (e) {
    BindAsyncNotificationTable();
    BindAsynOldNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });

    //---------------- * View More Link Click of Latest Notifications * -------------------//
    $(".aViewMore").live({

        click: function (e) {
            $(".low").hide();
            $("#OldNotificationGrid").hide();
            $(".aOldViewMore").hide();
            $(".aViewMore").hide();
            $(".aBack").show();
            $(".aOldBack").hide();
            $("#NotificationDetails").hide();
            BindAsyncNotificationTableForAll();
        }
    });

    //---------------- * Back To Notification Link Click of Latest Notifications * -------------------//
    $(".aBack").live({

        click: function (e) {
            BindAsyncNotificationTable();
            BindAsynOldNotificationTable();
            $("#NotificationDetails").hide();
            $("#OldNotificationGrid").show();
            $("#NewNotificationGrid").show();
            $(".high").show();
            $(".low").show();
            $(".aBack").hide();
            $(".aViewMore").show();
            $(".aOldViewMore").show();
        }
    });

    //---------------- * View More Link Click of Old Notifications * -------------------//
    $(".aOldBack").live({

        click: function (e) {
            BindAsyncNotificationTable();
            BindAsynOldNotificationTable();
            $("#NotificationDetails").hide();
            $("#OldNotificationGrid").show();
            $("#NewNotificationGrid").show();
            $(".high").show();
            $(".low").show();
            $(".aBack").hide();
            $(".aViewMore").show();
            $(".aOldViewMore").show();
        }
    });

    //---------------- * Back To Notification Link Click of Old Notifications * -------------------//
    $(".aOldViewMore").live({

        click: function (e) {
            $(".high").hide();
            $("#NewNotificationGrid").hide();
            $(".aViewMore").hide();
            $(".aBack").show();
            $("#NotificationDetails").hide();
            BindAsynOldNotificationTableForAll();
            $(".aBack").hide();
            $(".aOldBack").show();
            $(".aOldViewMore").hide();
        }
    });

    //---------------- * Delete Notification * -------------------//
    $(".Delete").click(function () {
        debugger;
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

    //---------------- * Cancel btn click of Notification * -------------------//
    $(".Cancel").click(function () {
        debugger;
        $('#rowfluidDiv').hide();
        $(".dark").css("margin-top", "0px");
        $("#btnContainer").show();
        $(".Save").hide();
        $(".Delete").hide();
        $(".Cancel").hide();
        var NotificationID = $("#hdfEditID").val();
        if (NotificationID == "")
        {
            $("#NotificationEditDivBox").hide();
        }
        else
        {
            $("#hdfNotificationID").val(NotificationID.replace('/', ""));
            var churchID = $("#hdfChurchID").val();
            var Notification = new Object();
            Notification.notificationID = NotificationID;
            Notification.churchId = churchID;
            BindControlsOnViewDetails(Notification);
        }
       
    });

    $("#cancelDetail").click(function () {
        $("#NotificationDetails").hide();
    });


    $(".aViewDetails").live({
        click: function (e) {
            debugger;         
            $('#rowfluidDiv').hide();
            $("#btnContainer").show();
            $(".dark").css("margin-top", "0px");
            $(".Save").hide();
            $(".Delete").hide();
            $(".Cancel").hide();
            var NotificationID = $(this).attr('id');
            $("#hdfEditID").val(NotificationID);
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
        $(".Delete").show();
        $(".dark").css("margin-top", "0px");
        $(".Cancel").show();
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
        //var value = BranchValidation();
        //if (value == true)
        //{
        //    alert("true");
        //}
        //else
        //{
        //    alert("false");
        //}
        var result = "";
        var caption = $("#txtCaption").val();
        var type = $("#ddlType").val();
        var description = $("#txtDescription").val();
        var startDate = $("#txtStartDate").val();
      
        if (startDate.includes(","))
        {
            startDate = startDate.split(":")[1];
        }
        var expiryDate = $("#txtExpiryDate").val();
       
        if (expiryDate.includes(","))
        {
            expiryDate = expiryDate.split(":")[1];
        }       
        var churchId = $("#hdfChurchID").val();
        var notificationID = $("#hdfNotificationID").val();
        if ($("#LinkID").val() != undefined)
        {
            var linkID = $("#LinkID").val().replace('/', "");
        }
        
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
        debugger;
        if (type != "" && type != null) {
            if (startDate != "" && startDate != null) {

                if (expiryDate != "" && expiryDate != null) {

                    if (caption != "" && caption != null) {
                        if (addOrEdit == "Add Notification") {
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
                        else {
                            result = UpdateNotification(Notifications);
                            if (result == "1") {
                                BindAsyncNotificationTable();
                                BindAsynOldNotificationTable();
                                //$("#NotificationEditDivBox").hide();
                                $(".dark").css("margin-top", "30px");
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

                    }
                    else {
                        alert("Please add a caption");
                    }
                }
                else {
                    alert("Please select expiry date");
                }
            }
            else {
                alert("Please select start date");
            }
        }
        else
        {
            alert("Please select notification type");
        }
       
    });
    $("#ddlType").select2({
        placeholder: "Choose Type ",
        allowClear: true,
        data: BindNotificationDropDown()
    });
});
//end of document.ready()

function BranchValidation() {
    debugger;

   // $('#Displaydiv2').remove();
    var caption = $("#txtCaption");
    var type = $("#ddlType");
    var description = $("#txtDescription");
    var startDate = $("#txtStartDate");
    var endDate = $("#txtExpiryDate");
    var container = [
        { id: caption[0].id, name: caption[0].name, Value: caption[0].value },
        { id: type[0].id, name: type[0].name, Value: type[0].value },
        { id: description[0].id, name: description[0].name, Value: description[0].value },
        { id: startDate[0].id, name: startDate[0].name, Value: startDate[0].value },
        { id: endDate[0].id, name: endDate[0].name, Value: endDate[0].value },
    ];

    var j = 0;
    //var Errorbox = document.getElementById('ErrorBox2');
    //var divs = document.createElement('div');
    //divs.setAttribute("id", "NotificationEditDivBox");
    //Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {

        if (container[i].Value == "") {
            j = 1;
           // Errorbox.style.borderRadius = "5px";
           // Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
           // Errorbox.style.paddingLeft = "30px";

        }
    }

    if (j == '1') {

        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').append(p);
        $(".dark").css("margin-top", "30px");
        return false;
    }
    if (j == '0') {
        $('#rowfluidDiv').hide();
        //BranchAddValidation();
        return true;
    }
}

function DetailsView()
{
    debugger;
    var caption = $("#lblCaption").text();
    var description = $("#lblDescription").text();
    var startDate = $("#lblStartDate").text();
    var expiryDate = $("#lblExpiryDate").text();
    $("#captionHeading").val(caption);
    $("#desc").val(description);
    $("#sDate").val("Start Date:"+startDate);
    $("#eDate").val("Expiry Date:"+expiryDate);
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
    $(".dark").css("margin-top", "0px");
    ShowAllTextBoxes()
    HideAllLabels();
    $(".Save").show();
    $(".Cancel").show();
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
            $("#sDate").text("Start Date : " + startDate);
            $("#eDate").text("Expiry Date : " + ExpiryDate);
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
function BindAsyncNotificationTableForAll()
{
    debugger;
    // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = SelectAllNotifications(Notifications);
    debugger;
    if (jsonResult != undefined) {
        BindGetAllNotificationTable(jsonResult);
    }
}
function BindAsyncNotificationTable() {
    debugger;
    // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
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
function BindAsynOldNotificationTableForAll()
{
    //var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = GetAllOldNotifications(Notifications);
    debugger;
    if (jsonResult != undefined) {
        BindGetOldNotificationTable(jsonResult);
    }
}
function BindAsynOldNotificationTable()
{
    debugger;
    $("#OldNotificationGrid").html('');
    // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = GetOldNotifications(Notifications);
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
            //var html = '<ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/>' + desc + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/>'
            var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne"><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="noticeImage" id=img' + Records.ID + '/><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }
        if (Records.Type == "ntc")
        {
           // var html = '<ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/>' + desc + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/>'
            var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne"><i class="fa fa-sticky-note" aria-hidden="true"></i>&nbsp;' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="noticeImage" id=img' + Records.ID + '/><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }
       
        $("#NewNotificationGrid").append(html);
    })
    if (length >= 5)
    {
        $(".aViewMore").show();
    }
    else
    {
        $('#NewNotificationGrid').css("height", "auto");
        $(".aViewMore").hide();
    }
    if(length==0)
    {
        $('#NewNotificationGrid').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#NewNotificationGrid").append(img);
        $(".aViewMore").hide();
        $(".aBack").hide();
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
           // var html = '<div class="task high" id="taskDiv" style="border-left: 2px solid #78cd51; padding-left: 5px;" ><ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/><span class="Desc">' + desc + '</span><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
            var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne"><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="noticeImage" id=img' + Records.ID + '/><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + '  class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }
        if (Records.Type == "ntc") {
           // var html = '<div class="task high" id="taskDiv" style="border-left: 2px solid #78cd51; padding-left: 5px;"><ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/' + desc + '><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
            var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne"><i class="fa fa-sticky-note" aria-hidden="true"></i>&nbsp;' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="noticeImage" id=img' + Records.ID + '/><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }



        $("#OldNotificationGrid").append(html);
    })
    if (length >= 5)
    {
        $(".aOldViewMore").show();
    }
    else
    {
        $(".aOldViewMore").hide();
        $('#OldNotificationGrid').css("height", "auto");
    }
    if (length == 0) {
        $('#OldNotificationGrid').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#OldNotificationGrid").append(img);
        $(".aOldViewMore").hide();
        $(".aOldBack").hide();
    }
}
/* display top 10*/
function GetAllNotifications(Notifications) {
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetAllNotifications");
    table = JSON.parse(ds.d);
    return table;
}
/* display all*/
function SelectAllNotifications(Notifications) {
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SelectAllNewNotifications");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllOldNotifications(Notifications)
{
    var ds = {};
    var table = {};
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SelectAllOldNotifications");
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
