var table = {};
var scheduleDates = new Array();
var maxScheduleStatus = 0;
$("document").ready(function (e) {    
    table=$('#tblNotifications').DataTable({
        'data': GetAllNotificationstbl(),
        'columns': [

               { "data": "ID" },
               { "data": "LinkID" },
               { "data": "ID" },
               { "data": "Status" },
               { "data": "Caption", "defaultContent": "<i>-</i>" },
               { "data": "Type", "defaultContent": "<i>-</i>" },
               { "data": "StartDate", "defaultContent": "<i>-</i>" },
               { "data": "ExpiryDate", "defaultContent": "<i>-</i>" },
               { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditNotification(this)"><i class="halflings-icon white edit""></i></a>'}
               

             ],
        'columnDefs': [
           {

               'targets': 2,
               'checkboxes':{
               'selectRow': true
               }
               
               
           },
           {
               'targets': [0, 1],
               "visible": false,
               "searchable": false
           },
           {
               "render": function (data, type, row) {
                   return ConvertJsonToDate(data);
               },
               "targets": [6,7]
           },

        ],
        'select': {
            'style': 'multi'
        }
    });
   // $("input.dt-checkboxes").click(myfunc);
    //$(":checkbox").click(myfunc);
    
    //BindAsyncNotificationTable();
    //BindAsynOldNotificationTable();
    //$('.Notificationeditdiv').click(function (e) {
    //    e.preventDefault();
    //    $('#NotificationEditDivBox').show();

    //});

    ////---------------- * View More Link Click of Latest Notifications * -------------------//
    //$(".aViewMore").live({

    //    click: function (e) {
    //        $("#oldNoty").hide();
    //        $("#OldNotificationGrid").hide();
    //        $(".aBack").show();
    //        $(".aOldBack").hide();
    //        //$("#NotificationDetails").hide();
    //        BindAsyncNotificationTableForAll();
    //        $(".aOldViewMore").hide();
    //        $(".aViewMore").hide();
    //    }
    //});

    ////---------------- * Back To Notification Link Click of Latest Notifications * -------------------//
    //$(".aBack").live({

    //    click: function (e) {
    //        BindAsyncNotificationTable();
    //        BindAsynOldNotificationTable();
    //       // $("#NotificationDetails").hide();
    //        $("#OldNotificationGrid").show();
    //        $("#NewNotificationGrid").show();
    //        $("#highNoty").show();
    //        $("#oldNoty").show();
    //        $(".aBack").hide();
    //        $(".aViewMore").show();
    //       // $(".aOldViewMore").show();
    //    }
    //});

    ////---------------- * View More Link Click of Old Notifications * -------------------//
    //$(".aOldBack").live({

    //    click: function (e) {
    //        BindAsyncNotificationTable();
    //        BindAsynOldNotificationTable();
    //      //  $("#NotificationDetails").hide();
    //        $("#OldNotificationGrid").show();
    //        $("#NewNotificationGrid").show();
    //        $("#highNoty").show();
    //        $("#oldNoty").show();
    //        $(".aBack").hide();
    //        $(".aViewMore").show();
    //        $(".aOldViewMore").show();
    //        $(".aOldBack").hide();
    //    }
    //});

    ////---------------- * Back To Notification Link Click of Old Notifications * -------------------//
    //$(".aOldViewMore").live({

    //    click: function (e) {
    //        $("#highNoty").hide();
    //        $("#NewNotificationGrid").hide();
    //        $(".aViewMore").hide();
    //        //$(".aBack").hide();
    //      //  $("#NotificationDetails").hide();
    //        BindAsynOldNotificationTableForAll();
    //        $(".aBack").hide();
    //        $(".aOldBack").show();
    //        $(".aOldViewMore").hide();
    //    }
    //});

    ////---------------- * Delete Notification * -------------------//
    //$(".Delete").click(function () {
        
    //    var result = "";
    //    var churchId = $("#hdfChurchID").val();
    //    var notificationID = $("#hdfNotificationID").val();
    //    var Notifications = new Object();
    //    Notifications.churchId = churchId;
    //    Notifications.notificationID = notificationID;
    //    var deleteConirm = confirm("Want to delete?");
    //    if (deleteConirm) {
    //        result = DeleteNotification(Notifications);
    //        switch(result.status)
    //        {
    //            case "1":
    //                noty({ text: Messages.DeletionSuccessFull, type: 'success' });
    //                BindAsyncNotificationTable();
    //                BindAsynOldNotificationTable();
    //                $('#NotificationEditDivBox').hide();
    //                $("#NotificationDetails").hide();
    //                break;
    //            default:
    //                noty({ text: Messages.DeletionFailure, type: 'error' });
    //                break;
    //        }
    //    }
    //    else {
    //        return false;
    //    }
    //});

    ////---------------- * Cancel btn click of Notification * -------------------//
    //$(".Cancel").click(function () {
        
    //    $('#rowfluidDiv').hide();
    //    $(".dark").css("margin-top", "0px");
    //    $("#btnContainer").show();
    //    $(".Save").hide();
    //    $(".Delete").hide();
    //    $(".Cancel").hide();
    //    var NotificationID = $("#hdfEditID").val();
    //    if (NotificationID == "")
    //    {
    //        $("#NotificationEditDivBox").hide();
    //    }
    //    else
    //    {
    //        $("#hdfNotificationID").val(NotificationID.replace('/', ""));
    //        var churchID = $("#hdfChurchID").val();
    //        var Notification = new Object();
    //        Notification.notificationID = NotificationID;
    //        Notification.churchId = churchID;
    //        BindControlsOnViewDetails(Notification);
    //    }
       
    //});

    //$("#cancelDetail").click(function () {
    //    $("#NotificationDetails").hide();
    //});


    //$(".aViewDetails").live({
    //    click: function (e) {
                     
    //        $('#rowfluidDiv').hide();
    //        $("#btnContainer").show();
    //        $(".dark").css("margin-top", "0px");
    //        $(".Save").hide();
    //        $(".Delete").hide();
    //        $(".Cancel").hide();
    //        var NotificationID = $(this).attr('id');
    //        $("#hdfEditID").val(NotificationID);
    //        $("#hdfNotificationID").val(NotificationID.replace('/', ""));
    //        var churchID = $("#hdfChurchID").val();
    //        var Notification = new Object();
    //        Notification.notificationID = NotificationID;
    //        Notification.churchId = churchID;
    //        BindControlsOnViewDetails(Notification);         
    //    }
    //});

    //$(".NotificationEdit").click(function () {
        
    //    $('#rowfluidDiv').hide();
    //    $(".Save").show();
    //    $(".Delete").show();
    //    $(".dark").css("margin-top", "0px");
    //    $(".Cancel").show();
    //    $("#NotificationDetails").hide();
    //    $("#NotificationEditDivBox").show();
    //    $("#detailsHeading").text("Edit Notification");
    //    //var type = $("#hdfType").val();
    //    //$("#ddlType").val(type).trigger("change");
    //    //var caption = $("#captionHeading").text();
    //    //var description = $("#desc").text();
    //    //var startDate = $("#sDate").text();
    //    //if (startDate.includes(":")) {
    //    //    startDate = startDate.split(":")[1];
    //    //}
    //    //var expiryDate = $("#eDate").text();
    //    //if (expiryDate.includes(":")) {
    //    //    expiryDate = expiryDate.split(":")[1];
    //    //}
    //    HideAllLabels();
    //    ShowAllTextBoxes();
    //    //$("#txtCaption").val(caption);
    //    //$("#txtDescription").val(description);
    //    //$("#txtStartDate").val(startDate);
    //    //$("#txtExpiryDate").val(expiryDate);
    //    var NotificationID = $("#hdfEditID").val();
    //    if (NotificationID == "") {
    //        $("#NotificationEditDivBox").hide();
    //    }
    //    else {
    //        $("#hdfNotificationID").val(NotificationID.replace('/', ""));
    //        var churchID = $("#hdfChurchID").val();
    //        var Notification = new Object();
    //        Notification.notificationID = NotificationID;
    //        Notification.churchId = churchID;
    //        BindControlsOnEdit(Notification);
    //    }
    //    $(".NotificationEdit").css("display", "none");
    //});
    //$(".Save").click(function () {
    //    NotificationValidation();
       
    //});
    $("#ddlType").select2({
        placeholder: "Choose Type ",
        allowClear: true,
        data: BindNotificationDropDown()
    });
    $("input[type='search']").focus(function () {
        Dynamicbutton("btnReset", "Reset", "Reset");
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
        
        $('#NoticeEdit').remove();
    }

    //Schedule-----------------------
    $("#notificationScheduleTable").hide();
    $("#selectDate").hide();
    $("#rdoNotificationScheduleNo").click(function () {
        var noScheduleConirm = confirm("Want to remove the scheduled dates?");
        if (noScheduleConirm) {
            $("#notificationScheduleTable").hide();
            $("#selectDate").hide();
            scheduleDates.length = 0;
            $("#selectDate").datepicker('setDate', null);
            $("#notificationScheduleBody").html('');
        }
        else {
            $("#rdoNotificationScheduleYes").parent().addClass('checked');
            $('#rdoNotificationScheduleNo').parent().removeClass('checked');
        }
    });
    $("#rdoNotificationScheduleYes").click(function () {
        $("#notificationScheduleTable").show();
        $("#selectDate").show();
    });
    $("#selectDate").datepicker(
        'option', 'onSelect', function () {
            if ((scheduleDates.indexOf($("#selectDate").val())) > -1) {    //Already selected                
                noty({ text: Messages.AlreadyExistsMsgCaption, type: 'information' });
            }
            else {
                scheduleDates.push($("#selectDate").val());
                var html = '<tr> <td>' + $("#selectDate").val() + '</td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" onclick="DeleteDate(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
                $("#notificationScheduleBody").append(html);
            }            
        }
    );
});
//end of document.ready()

//Remove Validation style
function RemoveStyle() {
    try {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    }
    catch (e) {

    }
}
//Common function for clearing input fields
function ClearFields() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file' || this.type == 'hidden' || this.type == 'search') {
            this.value = '';
        }
        else if (this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

}

function EditNotification(curobj)
{
    try
    {
        var type = "";
        $("#detailsHeading").text(" Edit Notification");
        $('#tblNotifications').find('tr.selected').removeClass('selected');
        $(curobj).parents('tr').addClass('selected');
        var data = table.row($(curobj).parents('tr')).data();
        $("#txtCaption").val(data.Caption);
        $("#txtDescription").val(data.Description);
        if (data.Type == "Notice") {
            type = 'ntc';
        }
        else if (data.Type == "Event") {
            type = 'evt';
        }
        else if (data.Type == "Education Event") {
            type = 'EduEvt';
        }
        $("#ddlType").val(type).trigger("change");
        $("#txtStartDate").val(ConvertJsonToDate(data.StartDate));
        $("#txtExpiryDate").val(ConvertJsonToDate(data.ExpiryDate));
        $("#hdfNotificationID").val(data.ID);
        $('#btnReset').attr('name', data.ID);
        $('#divnotificationAdd').show();
        
        //Dynamicbutton("btnBack", "Cancel", "Cancel");
        Dynamicbutton("btnReset", "Reset", "Reset");
        Dynamicbutton("btnMain", "Save", "NotificationValidation");
        Dynamicbutton("btnDelete", "DeleteCancel", "");
        Dynamicbutton("btnSendNotification", "SendNotiCancel", "");
        Animateto("divnotificationAdd");
        //Schedules
        BindNotificationScheduleTable(data.ID);
        debugger;
        if (data.StatusCode > maxScheduleStatus && scheduleDates.length==0) {
            maxScheduleStatus = data.StatusCode;
        }
    }
    catch(e)
    {

    }
   
}
//Onclick function for checkbox selection
function myfunc(ele) {
    try
    {
        debugger;
        //Here Dynamicbutton(buttonid,Casename,function name)
        Dynamicbutton("btnMain", "SaveCancel", "");
        Dynamicbutton("btnSendNotification", "SendNoti", "sendNotification");
        Dynamicbutton("btnDelete", "Delete", "Delete");
        Dynamicbutton("btnReset", "Reset", "Reset");
        $('#divnotificationAdd').hide();
    }
    catch(e)
    {

    }
   
}
//Onclick Push Notification
function sendNotification() {
    try
    {
        debugger;
        var NotiCollection = [];        
        var tabledata = table.rows('.selected').data();
        for (var i = 0; i < tabledata.length; i++)
        {
            var Notification = new Object();
            Notification.notificationID = tabledata[i].ID;
            Notification.caption = tabledata[i].Caption;
            Notification.description = tabledata[i].Description;
            Notification.notificationType = tabledata[i].Type;
            NotiCollection.push(Notification);            
        }
        result = SendNotificationToApp(NotiCollection);
        switch (result[0].status) {
            case "1":
                noty({ text: Messages.NotificationInitiated, type: 'success' });
                break;
            default:
                noty({ text: Messages.FailureMsgCaption, type: 'error' });
                break;
        }  
    }
    catch(e)
    {
        noty({ text: Messages.FailureMsgCaption, type: 'error' });
    }
    BindAllNotification();    
}
//onclick delete
function Delete() {
    try
    {
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
          
           try
           {
               debugger;
                    var NotiCollection = [];        
                    var tabledata = table.rows('.selected').data();
                    for (var i = 0; i < tabledata.length; i++)
                    {
                        var Notification = new Object();
                        Notification.notificationID = tabledata[i].ID;
                        NotiCollection.push(Notification);            
                    }
                    result = DeleteNotification(NotiCollection);
                    switch (result.status) {
                        case "1":
                            noty({ text: Messages.NotificationInitiated, type: 'success' });
                            break;
                        default:
                            noty({ text: result.status, type: 'success' });
                            break;
                    }  
                }
            catch(e)
                {
                    noty({ text: Messages.FailureMsgCaption, type: 'error' });
                }
                BindAllNotification(); 
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
   
}

function DeleteDate(Obj) {
    var deleteConirm = confirm("Want to remove this date?");
    if (deleteConirm) {
        var deletedDay = $(Obj).closest("tr").find('td:eq(0)').text();
        $(Obj).closest("tr").remove();
        scheduleDates.splice(scheduleDates.indexOf(deletedDay), 1);
    }
}
//onclick Add new Notification
function AddNewclick()
{
    try
    {
        RemoveStyle();
        ClearFields();
        $('#btnReset').removeAttr('name');
        $("#ddlType").select2("val", "");
        $('#divnotificationAdd').show();
        $("#hdfNotificationID").val('');
        $("#detailsHeading").text(" Add Notification");
        Dynamicbutton("btnReset", "Reset", "Reset");
        Dynamicbutton("btnMain", "Save", "NotificationValidation");
        Dynamicbutton("btnDelete", "DeleteCancel", "");
        Dynamicbutton("btnSendNotification", "SendNotiCancel", "");
        Animateto("divnotificationAdd");
        $('#tblNotifications').find('tr.selected').removeClass('selected');
        $('#txtCaption').focus();
        //schedule clear
        scheduleClear();
    }
    catch(e)
    {

    }
    
}
//onclick Reset button
function Reset(this_obj)
{
    try
    {
        var Notificationid = $(this_obj).attr('name');
        if (Notificationid != null && Notificationid != "") {
            var result = GetNotificationByID(Notificationid);
            $("#txtCaption").val(result.caption);
            $("#txtDescription").val(result.description);
            $("#ddlType").val(result.notificationType).trigger("change");
            $("#txtStartDate").val(result.startDate);
            $("#txtExpiryDate").val(result.expiryDate);
        }
        else {
            RemoveStyle();
            ClearFields();
            //table.search('').columns().search('').draw();
            $('#tblNotifications').find('tr.selected').removeClass('selected');
            $("#ddlType").select2("val", "");
            Dynamicbutton("btnDelete", "DeleteCancel", "");
            Dynamicbutton("btnSendNotification", "SendNotiCancel", "");

            //schedule clear
            scheduleClear();
        }
    }
    catch(e)
    {

    }
       
}
//Validate Notification fields
function NotificationValidation()
{
    try
    {
        var caption = $('#txtCaption');
        var desc = $('#txtDescription');

        var container = [
            { id: caption[0].id, name: caption[0].name, Value: caption[0].value },
            { id: desc[0].id, name: desc[0].name, Value: desc[0].value }
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
            else if (container[i].Value == "-1") {
                j = 1;
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "93% center";
                txtB.style.backgroundRepeat = "no-repeat";
            }
        }
        if (j == '1') {
            noty({ type: 'error', text: "Some Fields Are Empty !" });
            return false;
        }
        if (j == '0') {
            SaveNotification();
            return true;
        }
    }
    catch(e)
    {

    }
    
}
//Save Notification
function SaveNotification()
{
    try
    {
        var result = "";
        var today = new Date();
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
        startDate = startDate.replace(/ /g, '-')
        expiryDate = expiryDate.replace(/ /g, '-')
        if (expiryDate < startDate) {
            noty({ text: Messages.NotificationDateChecking, type: 'information' });
        }
        else {

            var Notifications = new Object();
            Notifications.caption = caption;
            Notifications.notificationType = type;
            Notifications.description = description;
            Notifications.startDate = startDate;
            Notifications.expiryDate = expiryDate;
            Notifications.churchId = churchId;
            //Notifications.linkID = linkID;
            Notifications.notificationID = notificationID;
            //var addOrEdit = $("#detailsHeading").text();

            debugger;
            if (scheduleDates.length == 0) {
                Notifications.status = maxScheduleStatus;//Default is 0        
            }
            else {
                Notifications.status = 3;//In progress
            }
            

            if ($("#hdfNotificationID").val() == "") {
                result = InsertNotification(Notifications);
                switch (result.status) {
                    case "1":
                        //Inserting schedules
                        if ($('input[name=IsnotificationScheduleNeeded]:checked').val() == "Yes") {
                            try {
                                var scheduleCollection = [];
                                while (scheduleDates.length != 0) {
                                    var schedule = new Object();
                                    schedule.notificationID = result.notificationID;
                                    schedule.scheduleDate = scheduleDates.pop();
                                    schedule.scheduleStatus = '3';
                                    scheduleCollection.push(schedule);
                                }
                                InsertNotificationSchedule(scheduleCollection);
                            }
                            catch (e) {
                                noty({ text: Messages.UpdationFailure, type: 'error' });
                            }
                        }                        

                        BindAllNotification();
                        scheduleClear();
                        BindNotificationScheduleTable(result.notificationID);
                        $("#hdfNotificationID").val(result.notificationID);
                        $('#btnReset').attr('name', result.notificationID);
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        break;
                    default:
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                }
            }
            else {
                result = UpdateNotification(Notifications);
                switch (result.status) {
                    case "1":
                        //Inserting schedules
                        if ($('input[name=IsnotificationScheduleNeeded]:checked').val() == "Yes") {
                            try {
                                var scheduleCollection = [];
                                while (scheduleDates.length != 0) {
                                    var schedule = new Object();
                                    schedule.notificationID = result.notificationID;
                                    schedule.scheduleDate = scheduleDates.pop();
                                    schedule.scheduleStatus = '3';
                                    scheduleCollection.push(schedule);
                                }
                                UpdateNotificationSchedule(scheduleCollection,result.notificationID);
                            }
                            catch (e) {
                                noty({ text: Messages.UpdationFailure, type: 'error' });
                            }
                        }

                        BindAllNotification();
                        scheduleClear();
                        BindNotificationScheduleTable(result.notificationID);
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        break;
                    default:
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                }
            }
        }
    }
    catch(e)
    {

    }
   
}
//Rebind notification table
function BindAllNotification() {
    table.clear().rows.add(GetAllNotificationstbl()).draw(false);
}



function DetailsView()
{
    
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
function InsertNotificationSchedule(Schedules) {
    var data = "{'NotScheduleObj':" + JSON.stringify(Schedules) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/InsertNotificationSchedule");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function UpdateNotificationSchedule(Schedules, notificationID) {
    var data = "{'NotScheduleObj':" + JSON.stringify(Schedules) +",'notificationID':'" + notificationID+ "'}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/UpdateNotificationSchedule");
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
function SendNotificationToApp(Notifications) {
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notifications.aspx/SendNotificationToApp");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function DeleteNotification(Notification)
{
    var ds = {};
    var table = {};
    var data = "{'NotificationList':" + JSON.stringify(Notification) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/DeleteNotification");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsOnViewDetails(Records)
{
    
    HideAllTextBoxes();
    ShowAllLabels();
    var jsonResult = {};
    var description = "";
    jsonResult = GetNotificationByID(Records);
    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            var startDate = new Date(parseInt(jsonResult.StartDate.substr(6)));
            startDate = formattedDate(startDate);
            
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
    
    var jsonResult = {};
    var description = "";
    jsonResult = GetNotificationByID(Records);
    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            //var startDate = new Date(parseInt(jsonResult.StartDate.substr(6)));
            //startDate = formattedDate(startDate);
            //startDate = startDate.split("/").join("-");
            //startDate = toDate(startDate);
            
            //var ExpiryDate = new Date(parseInt(jsonResult.ExpiryDate.substr(6)));
            //ExpiryDate = formattedDate(ExpiryDate);
            //ExpiryDate = ExpiryDate.split("/").join("-");
            //ExpiryDate = toDate(ExpiryDate);
            $("#ddlType").val(jsonResult.Type).trigger("change");
            $("#txtCaption").val(jsonResult.Caption);
            description = jsonResult.Description;
            $("#txtDescription").val(description);
            $("#txtStartDate").val($("#sDate").text());
            $("#txtExpiryDate").val($("#eDate").text());
        });
    }
}
function toDate(dateStr) {
    
    var parts = dateStr.split("-");
    return parts[1]+"-"+ parts[0]+"-"+ parts[2];
}
function getFormattedDate(input) {
    
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    var result = input.replace(pattern, function (match, p1, p2, p3) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return p2 + " " + months[(p1 - 1)] + " " + p3;
    
    });
    return result;
}
function GetNotificationByID(ID)
{
    var ds = {};
    var table = {};
    var Records = new Object();
    Records.notificationID = ID;
    var data = "{'NotificationsObj':" + JSON.stringify(Records) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetNotificationByID");
    table = JSON.parse(ds.d);
    return table;
}
function BindAsyncNotificationTableForAll()
{
    
    // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = SelectAllNotifications(Notifications);
    
    if (jsonResult != undefined) {
        BindGetAllNotificationTable(jsonResult);
    }
}
function BindAsyncNotificationTable() {
    
    // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
    var churchId = "";
    $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var Notifications = new Object();
    Notifications.churchId = churchId;
    jsonResult = GetAllNotifications(Notifications);
    
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
    
    if (jsonResult != undefined) {
        BindGetOldNotificationTable(jsonResult);
    }
}
function BindAsynOldNotificationTable()
{
    
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
//Schedule
function BindNotificationScheduleTable(notificationID) {
    scheduleClear();
    //Getting schedules
    var jsonResult = {};
    var NotificationSchedules = new Object();
    NotificationSchedules.notificationID = notificationID;
    jsonResult = GetNotificationSchedules(NotificationSchedules);
    
    if (jsonResult != undefined) {
        var Records = jsonResult;
        if (Records.length != 0) {
            $.each(Records, function (index, Records) {                
                var html = '<tr> <td>' + ConvertJsonToDate(Records.ScheduledDate) + '</td>';
                switch (Records.StatusCode) {
                    case 3:
                        html = html + '<td class="center"><a class="circlebtn circlebtn-danger" title="Delete" onclick="DeleteDate(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
                        scheduleDates.push(ConvertJsonToDate(Records.ScheduledDate));
                        break;
                    default :
                        html = html + '<td class="center">' + Records.Status + '</td></tr>';
                        $('#rdoNotificationScheduleNo').attr('disabled', true);
                        //Finding notification as a whole status (Excluding "In progress" since it is checked while inserting/updating)
                        if (Records.StatusCode > maxScheduleStatus) {//Maximum value of schedule status is given to the notification status since displaying priority is: pending<processed<failed<in progress
                            maxScheduleStatus = Records.StatusCode;
                        }
                }
                $("#notificationScheduleBody").append(html);                
            });
            $('input[name=IsnotificationScheduleNeeded]:checked').val('Yes');
            $("#rdoNotificationScheduleYes").parent().addClass('checked');
            $('#rdoNotificationScheduleNo').parent().removeClass('checked');            
            $("#notificationScheduleTable").show();
            $("#selectDate").show();
        }
    }

}
function GetNotificationSchedules(NotificationSchedules) {
    var ds = {};
    var table = {};
    var data = "{'NotificationSchedulesObj':" + JSON.stringify(NotificationSchedules) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/GetNotificationSchedules");
    table = JSON.parse(ds.d);
    return table;
}
function scheduleClear() {
    //schedule clear
    $("#rdoNotificationScheduleYes").parent().removeClass('checked');
    $('#rdoNotificationScheduleNo').parent().addClass('checked');
    $('#rdoNotificationScheduleNo').attr('disabled', false);
    $("#notificationScheduleTable").hide();
    $("#selectDate").hide();
    scheduleDates.length = 0;
    maxScheduleStatus = 0;
    $("#selectDate").datepicker('setDate', null);
    $("#notificationScheduleBody").html('');
}
function GetAllNotificationstbl() {
    var ds = {};
    var table = {};
    var Notifications = new Object();
    var data = "{'NotificationsObj':" + JSON.stringify(Notifications) + "}";
    ds = getJsonData(data, "../AdminPanel/Notifications.aspx/SelectNewNotifications");
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
