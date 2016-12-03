$("document").ready(function (e) {
    BindAsyncNotificationTable();
    BindAsynOldNotificationTable();
    $('.Notificationeditdiv').click(function (e) {
        e.preventDefault();
        $('#NotificationEditDivBox').show();

    });

    //---------------- * View More Link Click of Latest Notifications * -------------------//
    $(".aViewMore").live({

        click: function (e) {
            $("#oldNoty").hide();
            $("#OldNotificationGrid").hide();
            $(".aBack").show();
            $(".aOldBack").hide();
            //$("#NotificationDetails").hide();
            BindAsyncNotificationTableForAll();
            $(".aOldViewMore").hide();
            $(".aViewMore").hide();
        }
    });

    //---------------- * Back To Notification Link Click of Latest Notifications * -------------------//
    $(".aBack").live({

        click: function (e) {
            BindAsyncNotificationTable();
            BindAsynOldNotificationTable();
           // $("#NotificationDetails").hide();
            $("#OldNotificationGrid").show();
            $("#NewNotificationGrid").show();
            $("#highNoty").show();
            $("#oldNoty").show();
            $(".aBack").hide();
            $(".aViewMore").show();
           // $(".aOldViewMore").show();
        }
    });

    //---------------- * View More Link Click of Old Notifications * -------------------//
    $(".aOldBack").live({

        click: function (e) {
            BindAsyncNotificationTable();
            BindAsynOldNotificationTable();
          //  $("#NotificationDetails").hide();
            $("#OldNotificationGrid").show();
            $("#NewNotificationGrid").show();
            $("#highNoty").show();
            $("#oldNoty").show();
            $(".aBack").hide();
            $(".aViewMore").show();
            $(".aOldViewMore").show();
            $(".aOldBack").hide();
        }
    });

    //---------------- * Back To Notification Link Click of Old Notifications * -------------------//
    $(".aOldViewMore").live({

        click: function (e) {
            $("#highNoty").hide();
            $("#NewNotificationGrid").hide();
            $(".aViewMore").hide();
            //$(".aBack").hide();
          //  $("#NotificationDetails").hide();
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
                noty({ text: 'Deleted Successfully', type: 'success' });
                BindAsyncNotificationTable();
                BindAsynOldNotificationTable();
                $('#NotificationEditDivBox').hide();
                $("#NotificationDetails").hide();
            }
            else
            {
                noty({ text: 'Error..!!!', type: 'error' });
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
        //var type = $("#hdfType").val();
        //$("#ddlType").val(type).trigger("change");
        //var caption = $("#captionHeading").text();
        //var description = $("#desc").text();
        //var startDate = $("#sDate").text();
        //if (startDate.includes(":")) {
        //    startDate = startDate.split(":")[1];
        //}
        //var expiryDate = $("#eDate").text();
        //if (expiryDate.includes(":")) {
        //    expiryDate = expiryDate.split(":")[1];
        //}
        HideAllLabels();
        ShowAllTextBoxes();
        //$("#txtCaption").val(caption);
        //$("#txtDescription").val(description);
        //$("#txtStartDate").val(startDate);
        //$("#txtExpiryDate").val(expiryDate);
        var NotificationID = $("#hdfEditID").val();
        if (NotificationID == "") {
            $("#NotificationEditDivBox").hide();
        }
        else {
            $("#hdfNotificationID").val(NotificationID.replace('/', ""));
            var churchID = $("#hdfChurchID").val();
            var Notification = new Object();
            Notification.notificationID = NotificationID;
            Notification.churchId = churchID;
            BindControlsOnEdit(Notification);
        }
        $(".NotificationEdit").css("display", "none");
    });
    $(".Save").click(function () {
        NotificationValidation();
       
    });
    $("#ddlType").select2({
        placeholder: "Choose Type ",
        allowClear: true,
        data: BindNotificationDropDown()
    });

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    $('textarea,select').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value != "") {
        debugger;
        $('#NoticeEdit').remove();
    }
});
//end of document.ready()

function NotificationValidation()
{
    debugger;
    $('#Displaydiv').remove();
    var caption = $('#txtCaption');
    var notyType = $('#ddlType');
    var desc = $('#txtDescription');
    var startDate = $('#txtStartDate');
    var endDate = $('#txtExpiryDate');

    var container = [
        { id: caption[0].id, name: caption[0].name, Value: caption[0].value },
        { id: notyType[0].id, name: notyType[0].name, Value: notyType[0].value },
        { id: desc[0].id, name: desc[0].name, Value: desc[0].value },
        { id: startDate[0].id, name: startDate[0].name, Value: startDate[0].value },
        { id: endDate[0].id, name: endDate[0].name, Value: endDate[0].value },
    ];

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
        else if (container[i].Value == "-1") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "93% center";
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
        //$('#btnAddAdmin').attr('name', 'failure');
        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide(1000);
        //scriptvalidate();
        SaveNotification();
        return true;
    }
}

function SaveNotification()
{
    debugger;
    var result = "";
    var caption = $("#txtCaption").val();
    var type = $("#ddlType").val();
    var description = $("#txtDescription").val();
    var startDate = $("#txtStartDate").val();
   // var month = startDate.split(" ")[1];
    //startDate = parseDate(startDate);
    if (startDate.includes(",")) {
        startDate = startDate.split(":")[1];
    }
    var expiryDate = $("#txtExpiryDate").val();

    if (expiryDate.includes(",")) {
        expiryDate = expiryDate.split(":")[1];
    }
    var churchId = $("#hdfChurchID").val();
    var notificationID = $("#hdfNotificationID").val();
    if ($("#LinkID").val() != undefined) {
        var linkID = $("#LinkID").val().replace('/', "");
    }

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
    debugger;                             
                    if (addOrEdit == "Add Notification") {
                        result = InsertNotification(Notifications);
                        if (result == "1") {
                            BindAsyncNotificationTable();
                            BindAsynOldNotificationTable();
                            $("#NotificationEditDivBox").hide();
                            noty({ text: 'Saved Successfully', type: 'success' });
                        }
                        else {
                            noty({ text: 'Error..!!!', type: 'error' });
                        }
                    }
                    else {
                        result = UpdateNotification(Notifications);
                        if (result == "1") {
                            BindAsyncNotificationTable();
                            BindAsynOldNotificationTable();
                            //$("#NotificationEditDivBox").hide();
                            $(".dark").css("margin-top", "30px");
                            noty({ text: 'Updated Successfully', type: 'success' });
                        }
                        else {
                            noty({ text: 'Error..!!!', type: 'error' });
                        }
                    }
}

function DetailsView()
{
    debugger;
    var caption = $("#lblCaption").text();
    var description = $("#lblDescription").text();
    if (description.length > 200)
    {
        description = description.substring(0, 197);
        description = description + "...";
    }
    var startDate = $("#lblStartDate").text();
    var expiryDate = $("#lblExpiryDate").text();
    $("#captionHeading").val(caption);
    $("#desc").val(description);
    $("#sDate").val(startDate);
    $("#eDate").val(expiryDate);
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
    $('#ErrorBox,#ErrorBox1').hide(1000);
    $('input[type=text],input[type=password]').css({ background: 'white' });
    $('textarea,select').css({ background: 'white' });
    $("#txtCaption").focus();
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
    var description = "";
    jsonResult = GetNotificationByID(Records);
    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            var startDate = new Date(parseInt(jsonResult.StartDate.substr(6)));
            startDate = formattedDate(startDate);
            debugger;
            var ExpiryDate = new Date(parseInt(jsonResult.ExpiryDate.substr(6)));
            ExpiryDate = formattedDate(ExpiryDate);
            $("#hdfType").val(jsonResult.Type);
            $("#captionHeading").text(jsonResult.Caption);
            description = jsonResult.Description;
            if (description.length > 200) {
                description = description.substring(0, 197);
                description = description + "...";
            }
            $("#desc").text(description);
            startDate = getFormattedDate(startDate);
            $("#sDate").text(startDate);
            ExpiryDate = getFormattedDate(ExpiryDate);
            $("#eDate").text( ExpiryDate);
            $("#NotificationDetails").show();
            $("#NotificationEditDivBox").hide();
            $(".NotificationEdit").css("display", "");
        });
    }

}
function BindControlsOnEdit(Records)
{
    debugger;
    var jsonResult = {};
    var description = "";
    jsonResult = GetNotificationByID(Records);
    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            var startDate = new Date(parseInt(jsonResult.StartDate.substr(6)));
            startDate = formattedDate(startDate);
            startDate = startDate.split("/").join("-");
            startDate = toDate(startDate);
            debugger;
            var ExpiryDate = new Date(parseInt(jsonResult.ExpiryDate.substr(6)));
            ExpiryDate = formattedDate(ExpiryDate);
            ExpiryDate = ExpiryDate.split("/").join("-");
            ExpiryDate = toDate(ExpiryDate);
            $("#ddlType").val(jsonResult.Type).trigger("change");
            $("#txtCaption").val(jsonResult.Caption);
            description = jsonResult.Description;
            $("#txtDescription").val(description);
            $("#txtStartDate").val(startDate);
            $("#txtExpiryDate").val(ExpiryDate);
        });
    }
}
function toDate(dateStr) {
    debugger;
    var parts = dateStr.split("-");
    return parts[1]+"-"+ parts[0]+"-"+ parts[2];
}
function getFormattedDate(input) {
    debugger;
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    var result = input.replace(pattern, function (match, p1, p2, p3) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return p2 + " " + months[(p1 - 1)] + " " + p3;
    
    });
    return result;
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
            var html = '<div class="accordion"><div class="" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.Caption + '</p><span class="fa fa-calendar-times-o" id="spnStartDate"></span>  <span class="spnDateValues" >' + getFormattedDate(expiryDate) + '</span>&nbsp;<br /></p><p>' + Records.Description + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }
        if (Records.Type == "ntc")
        {
           // var html = '<ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/>' + desc + '<a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/>'
            var html = '<div class="accordion"><div class="" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.Caption + '</p><span class="fa fa-calendar-times-o" id="spnStartDate"></span>  <span class="spnDateValues" >' + getFormattedDate(expiryDate) + '</span>&nbsp;<br /></p><p>' + Records.Description + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
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
            var html = '<div class="accordion"><div class="" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.Caption + '</p><span class="fa fa-calendar-times-o" id="spnStartDate"></span>  <span class="spnDateValues" >' + getFormattedDate(expiryDate) + '</span>&nbsp;<br /></p><p>' + Records.Description + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + '  class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
        }
        if (Records.Type == "ntc") {
           // var html = '<div class="task high" id="taskDiv" style="border-left: 2px solid #78cd51; padding-left: 5px;"><ul class="dashboard-list"><li class="Notificationlist"><div class="accordion-heading"><a><i class="fa fa-sticky-note" aria-hidden="true"></i><span class="hidden-tablet navtitle"></span></a>' + Records.Caption + '<span class="expiryDate">Expiry Date:' + expiryDate + '</span></div><br/' + desc + '><a id=' + Records.ID + ' href="#" class="aViewDetails">View Details</a></div> </li></ul><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div>'
            var html = '<div class="accordion"><div class="" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"><p class="lead" style="margin-bottom:0px;">' + Records.Caption + '</p><span class="fa fa-calendar-times-o" id="spnStartDate"></span>  <span class="spnDateValues" >' + getFormattedDate(expiryDate) + '</span>&nbsp;<br /></p><p>' + Records.Description + '</p><span class="" style="float:right;"><div class="Eventeditdiv"><a id=' + Records.ID + ' class="aViewDetails" >View Details</a></div></span><input id=NotificationID type="hidden" value=' + Records.ID + '/><input id=LinkID type="hidden" value=' + Records.LinkID + '/></div></div></div></div>'
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

    return [month, day, year].join('/');
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
