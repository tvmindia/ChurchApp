var counter = 0;
var massDay = new Array();
var massTime = new Array();
var curTime = "";
var curDay = "";
var countLen = 0;
var NovenaDayAndTime = new Array();
$("document").ready(function (e) {

    BindAsyncAdminsTable();
    parent.$("#MassSchedule").addClass("active");
    $("#TxtTime").timepicker({
        timeFormat: 'h:mm p',
        interval: 15,
        dropdown: true,
        change: function (time) {
            AddTempTable();
        }
    });
    $('#massTimingTable').dataTable({
        order: [],
        searching: false,
        paging: false,
        "oLanguage": {
            "sEmptyTable": " "
        },
        "Info": false
    });
    //--------------- *Save MassTiming* ----------------//
    $(".cancel").click(function (e) {
        debugger;
        $("#massTimingTempTable").html('');
        $("#AddorEditSpan").text("Save");
        var day = $("#hdfEditMassDay").val();
        if (day != null && day != "")
        {
            $('.dropcheck', this.$container).attr('placeholder', "Select Days");
            if (document.getElementById("massTimingUpdateTable").getElementsByTagName("tr").length != 0) {
                document.getElementById("massTimingUpdateTable").style.display = '';
            }
            else
            {
                document.getElementById("massTimingUpdateTable").style.display = '';
                BindGridOnDaySelect(day);
            }
           
        }
        else
        {
            $('.dropcheck', this.$container).attr('placeholder', "Select Days");
        }
       
        $("#TxtTime").val("");
        $("input[type=checkbox]").prop('checked', false);
        $('#rowfluidDiv').hide();
        NovenaDayAndTime.length = 0;
        $('.dropdown-menu li.active').removeClass('active');
        $('#ddlDay').val("");
    });

    $(".AddMass").click(function (e) {
        debugger;
        if ($('.dropcheck').attr('placeholder') != "Select Days") {
            if ($("#TxtTime").val() != "" && $("#TxtTime").val() != null) {
                var MassTimings = new Object();
                $("#NoData").remove();
                $("#massTimingUpdateTable").html('');
                $('#massTimingTableBox').css("height", "auto");
                var saveOrEdit = $("#AddorEditSpan").text();
                if (saveOrEdit == "Save") {

                    var result = "";
                    //var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
                    var day = $('.dropcheck').attr('placeholder');
                    if (massDay.length > 0) {
                        MassTimings.mDay = massDay;
                        MassTimings.mTime = massTime;
                    }
                    else {
                        if (day == "Daily") {
                            day = $("#ddlDay").val();
                        }
                        var time = hrsTo24hrormat();
                        time = time + ":00.0000000";
                        MassTimings.day = day;
                        MassTimings.massTime = time;
                    }


                    //MassTimings.massChurchId = churchId;

                    result = InsertMassTiming(MassTimings);
                    switch (result.status) {
                        case "1":
                            BindAsyncAdminsTable();
                            var jsonResult = {};
                            MassTimings.day = day + ",";
                            jsonResult = selectMassTimeByDay(MassTimings);
                            if (jsonResult.length > 0) {
                                ReBindMassTimingUpdateTable(jsonResult);
                            }
                            else {
                                //$("#massTimingTempTable").html('');
                                //$("#massTimingTempTable").hide();
                                //$('.dropcheck', this.$container).attr('placeholder', "Select Days");
                                //$("#TxtTime").val("");
                            }
                            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                            break;
                        case "0":
                            noty({ text: Messages.InsertionFailure, type: 'error' });
                            break;
                        default:
                            BindAsyncAdminsTable();
                            noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                            break;
                    }
                }
                else {
                    var result = "";
                    var churchId = $("#hdfChurchID").val();
                    var massId = $("#hdfMassID").val();
                    var day = $('.dropcheck').attr('placeholder');
                    var time = hrsTo24hrormat();
                    time = time + ":00.0000000";
                    var MassTimings = new Object();
                    MassTimings.massChurchId = churchId;
                    MassTimings.day = day + ",";
                    MassTimings.massTime = time;
                    MassTimings.massTimingID = massId;
                    result = UpdateMassTiming(MassTimings);
                    switch (result.status) {
                        case "1":
                            BindAsyncAdminsTable();
                            var jsonResult = {};
                            MassTimings.massChurchId = churchId;
                            MassTimings.day = day + ",";
                            jsonResult = selectMassTimeByDay(MassTimings);
                            ReBindMassTimingUpdateTable(jsonResult);
                            noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                            break;
                        case "2":
                            BindAsyncAdminsTable();
                            var jsonResult = {};
                            MassTimings.massChurchId = churchId;
                            MassTimings.day = day + ",";
                            jsonResult = selectMassTimeByDay(MassTimings);
                            ReBindMassTimingUpdateTable(jsonResult);
                            noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                            break;
                        default:
                            noty({ text: Messages.UpdationFailure, type: 'error' });
                            break;
                    }
                }
            }
            else {
                noty({ text: Messages.TimeSelect, type: 'error' });
            }
        }
        else
        {
            noty({ text: Messages.DaySelect, type: 'error' });
}
    });

    $(".massTimeEditbtn").live({

        click: function (e) {// Delete button click
            debugger;
            $("#AddorEditSpan").text("Edit");
            var jsonResult = {};
            editedrow = $(this).closest('tr');
            var MassID = editedrow.attr("ID");
            var churchId = editedrow.attr("ChurchID");
            var MassTimings = new Object();
            MassTimings.massChurchId = churchId;
            MassTimings.massTimingID = MassID;
            jsonResult = selectMassTimeByMassID(MassTimings);
            if (jsonResult != undefined) {
                BindMassScheduleTextBoxes(jsonResult);

            }
        }
    });
    $('.massTimeDelete').live({

        click: function (e) {// Delete button click
            debugger;
            var result = "";
            var churchId = "";
            var day = "";
            var MassTimings = new Object();
            editedrow = $(this).closest('tr');
            var MassID = editedrow.attr("ID");
            var massChurchID = editedrow.attr("ChurchID");
            day = editedrow.attr("Day");
            churchId = massChurchID;
            MassTimings.massChurchId = massChurchID;
            MassTimings.massTimingID = MassID;
            var deleteConirm = confirm("Want to delete?");
            if (deleteConirm) {
                result = DeleteMassTime(MassTimings);
            }
            else
            {
                return false;
            }
            switch(result.status)
            {
                case "1":
                    BindAsyncAdminsTable();
                    var jsonResult = {};
                    MassTimings.massChurchId = churchId;
                    MassTimings.day = day+",";
                    jsonResult = selectMassTimeByDay(MassTimings);
                    ReBindMassTimingUpdateTable(jsonResult);
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }
        }
    });

    //$("#TxtTime").timepicker({
    //    timeFormat: 'h:mm p',
    //    interval: 15,
    //    dropdown: true,
    //    change: function (time) {
    //        AddTempTable();
    //    }
    //});
    var $eventDaySelect = $("#ddlDay");
    $eventDaySelect.on("change", function (e) {
        debugger;
        counter = 0;
        $("#AddorEditSpan").text("Save");
        var dayarr = new Array();
        if ($("#ddlDay").val() != null)
        {
            // BindGridOnDaySelect();
            $('#ddlDay :selected').each(function (i, sel) {
                dayarr.push($(sel).val());
                
            });
            //alert(dayarr);
            //BindGridOnDaySelect(dayarr);
            AddTempTable();
        }
        else
        {
            if ($("#hdfEditMassDay").val() != null && $("#hdfEditMassDay").val() != "")
            {
                dayarr.push($("#hdfEditMassDay").val());
                BindGridOnDaySelect(dayarr);
            }
            else
            {
                dayarr.length = 0;
            }
           
        }
        dayarr.length = 0;
       
    });
    $('#ddlDay').multiselect({

        includeSelectAllOption: true

    });
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value != "") {
        debugger;
        $('#massTimingTable tr').find('th:last-child, td:last-child').remove();
       // $("#massTimingTable tr td,th").filter(':nth-child(' + (3) + ')').remove();
       
    }
    else
    {
        $("#MassTimeAdd").show();
        $("#thActions").css("display", "");
    }
   
});//end of document.ready

//----------Insert MassTiming--------------//

function BindGridOnDaySelect(dayarr)
{
    try
    {
        var jsonResult = {};
        var MassTimings = new Object();
        MassTimings.massChurchId = $("#hdfChurchID").val();
        dayarr = dayarr + ",";
        MassTimings.day = dayarr.toString();
        jsonResult = selectMassTimeByDay(MassTimings);
        ReBindMassTimingUpdateTable(jsonResult);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function ReBindMassTimingUpdateTable(jsonResult) {
    try
    {
        if (jsonResult.length == 0) {
            document.getElementById("massTimingsUpdate").style.display = "none";
        }
        else {
            var MassID = jsonResult[0]["ID"];
            var length = jsonResult.length;
            $("#massTimingUpdateTable").html("");
            for (var i = 0; i < length; i++) {
                var ID = jsonResult[i]["ID"];
                massChurchID = jsonResult[i]["ChurchID"];
                Day = jsonResult[i]["Day"];
                var MassTime = jsonResult[i]["Time"];
                MassTime = hrsToAmPm(MassTime)
                var html = '<tr class="MassTimingUpdateRows" ID="' + ID + '"ChurchID="' + massChurchID + '"Day="' + Day + '"Time="' + MassTime + '"><td>' + Day + '</td><td class="center">' + MassTime + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                $("#massTimingUpdateTable").append(html);
            }

            if (MassID != "") {
                document.getElementById("massTimingsUpdate").style.display = "";
            }
            else {
                document.getElementById("massTimingsUpdate").style.display = "none";
            }
        }
        $("#TxtTime").val("");
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}
function AddTempTable()
{
    try
    {
        
        var IsValid = true;
        debugger;
        if (counter != 1) {
            if ($("#ddlDay").val() != null) {
                document.getElementById("massTimingsUpdate").style.display = '';

                $("#massTimingTempTable").show();
                document.getElementById("massTimingUpdateTable").style.display = "none ";
                var time = $("#TxtTime").val();
                var dayarray = new Array();
                $('#ddlDay :selected').each(function (i, sel) {
                    var len = dayarray.length;
                    var timeLen = massTime.length;
                    debugger;
                    curDay = $(sel).val();
                    curTime = $("#TxtTime").val();
                    dayarray.push($(sel).val());

                });

                var len = dayarray.length;
                if ($("#TxtTime").val() != "" && $("#TxtTime").val() != null && len != 0) {
                    if (len > 0) {
                        debugger;
                        for (var i = 0; i < dayarray.length; i++) {
                            var day = dayarray[i];
                            massDay.push(day);
                            var mTime = TimeFormat(time);
                            mTime = mTime + ":00.0000000";
                            massTime.push(mTime);
                            for (var k = 0; k < NovenaDayAndTime.length; k++) {
                                //for (var j = 0; j < massDay.length; j++) {
                                if (NovenaDayAndTime[k].Day == dayarray[i]) {
                                        curTime = time;
                                        if (NovenaDayAndTime[k].Time == curTime) {
                                            var index = dayarray.indexOf(dayarray[i]);
                                            delete dayarray[index];
                                            massDay.splice(index, 1);
                                            countLen = countLen + 1;
                                            IsValid = false;
                                            //if (countLen > 0) {
                                            //    noty({ text: Messages.AlreadyExistsMsgCaption + " - " + day + " : " + curTime, type: 'error' });
                                            //    countLen = 0;
                                            //}
                                        }
                                    }
                                //}
                            }
                            
                                if(IsValid) {
                                    NovenaDayAndTime.push(
                                     {
                                         Day: dayarray[i],
                                         Time: time
                                     }
                                    );
                                    var html = '<tr  ><td>' + dayarray[i] + '</td><td class="center">' + (time != "NaN:NaN" ? time : "-") + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
                                    $("#massTimingTempTable").append(html);
                                }
                            
                               
                               
                           
                                IsValid = true;

                        }
                    }

                }
            }
        }
     
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function DeleteTime(Obj)
{
    debugger;
    var days = new Array();
    var tds = new Array();
    var tdsTime = new Array();
    try
    {
        var deletedDay = $(Obj).closest("tr").find('td:eq(0)').text();
        var deletedTime = $(Obj).closest("tr").find('td:eq(1)').text();
        $(Obj).closest("tr").remove();
        $('#ddlDay :selected').each(function (i, sel) {
            days.push($(sel).val());

        });

        var len = $('#massTimingTempTable tr td').length;
        for (var i = 0; i < len; i++)
        {
            var columnDays = $('#massTimingTempTable tr > td:eq(' + i + ')').text();
            tds.push(columnDays);
            i = i + 2;
        }
        for (var i = 1; i < len; i++) {
            var columnDays = $('#massTimingTempTable tr > td:eq(' + i + ')').text();
            var mTime = TimeFormat(columnDays);
            mTime = mTime + ":00.0000000";
            tdsTime.push(mTime);
            i = i + 2;
        }

        var sameDayCountInArray = getCount(tds, deletedDay);
        if (sameDayCountInArray == undefined)
        {
            $('input[value="' + deletedDay + '"]').prop("checked", false);
            $('input[value="multiselect-all"]').prop("checked", false);
            $('.dropdown-menu li [value="' + deletedDay + '"]').closest('li').removeClass('active');
            $('.dropdown-menu li [value="multiselect-all"]').closest('li').removeClass('active');
            $('#ddlDay option[value="' + deletedDay + '"]').removeAttr('selected');
            $('.dropcheck', this.$container).attr('placeholder', tds);
        }
        

       

        //var index = days.indexOf(deletedDay);
        //var mTime = TimeFormat(deletedTime);
        //mTime = mTime + ":00.0000000";
        //var indexTime = massTime.indexOf(mTime);
        //if (index >= 0) {
        //    days.splice(index, 1);
        //    massDay.splice(index, 1);
        //    massTime.splice(indexTime, 1);
        //}
        massTime.length = 0;
        massDay.length = 0;
        massDay = tds;
        massTime = tdsTime;
       
        for (var k = 0; k < NovenaDayAndTime.length; k++) {
            if (NovenaDayAndTime[k].Day == deletedDay) {
                if (NovenaDayAndTime[k].Time == deletedTime) {
                    NovenaDayAndTime.splice(k, 1);
                }

            }
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    days.length = 0;
}

function getCount(arr, val) {
    var ob = {};
    var len = arr.length;
    for (var k = 0; k < len; k++) {
        if (ob.hasOwnProperty(arr[k])) {
            ob[arr[k]]++;
            continue;
        }
        ob[arr[k]] = 1;
    }
    return ob[val];
}

function BindTime(Time) {
    try
    {
        var timeArray = [];
        var timeLength = Time.length;
        for (var i = 0; i < timeLength; i++) {
            var recordsTime = Time[i];
            var time = Time[i].split(":")[0] + ":" + Time[i].split(":")[1];
            var hours = time.split(":")[0].length;
            var minute = time.split(":")[1].length;
            if ((hours == "1") && (minute == "1")) {
                hours = "0" + Time[i]["Hours"];
                minute = "0" + Time[i]["Minutes"];
                var time = hours + ":" + minute;
            }
            else if (hours == "1") {
                hours = "0" + Time[i]["Hours"];
                var time = hours + ":" + Time[i]["Minutes"];
            }
            else if (minute == "1") {
                minute = "0" + Time[i]["Minutes"];
                var time = Time[i]["Hours"] + ":" + minute;
            }
            time = timeTo12HrFormat(time);
            timeArray.push(time);
        }

        return timeArray;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function BindMassEditGrid(e) {
    try
    {
        $('.dropdown-menu li input[type=checkbox]').prop('checked', false);
        $('.dropcheck', this.$container).attr('placeholder', "Select Days");
        $('#rowfluidDiv').hide();
        $("#TxtTime").val("");
        $("#massTimingTempTable").hide();
        document.getElementById("massTimingUpdateTable").style.display = '';
        editedrow = e.closest('tr');
        var MassID = editedrow.attributes["id"].textContent;
        var massChurchID = editedrow.attributes["ChurchID"].textContent;
        var Day = editedrow.attributes["Day"].textContent;
        var Time = editedrow.attributes["Time"].textContent;
        $("#hdfMassIDs").val(MassID);
        $("#hdfChurchIDs").val(massChurchID);
        $("#hdfDay").val(Day);
        $("#hdfTime").val(Time);
        $("#hdfEditMassDay").val(Day);
        BindMassTimingUpdateTable(MassID, massChurchID, Day, Time);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function BindMassTimingUpdateTable(MassID, massChurchID, Day, Time) {
    try
    {
        document.getElementById("massTimingUpdateTable").innerHTML = "";
        var jsonResult = {};
        var MassTimings = new Object();
        MassTimings.day = Day + ",";
        jsonResult = selectMassTimeByDay(MassTimings);
        var length = jsonResult.length;
        for (var i = 0; i < length; i++) {
            var ID = jsonResult[i]["ID"];
            massChurchID = jsonResult[i]["ChurchID"];
            Day = jsonResult[i]["Day"];
            var MassTime = jsonResult[i]["Time"];
            MassTime = hrsToAmPm(MassTime);
            var html = '<tr class="MassTimingUpdateRows" ID="' + ID + '"ChurchID="' + massChurchID + '"Day="' + Day + '"Time="' + MassTime + '"><td>' + Day + '</td><td class="center">' + MassTime + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);
        }

        document.getElementById("massTimingsUpdate").style.display = "";
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function hrsTo24hrormat() {
    try
    {
        var h = 0;
        var addTime = 12;
        var time = $("#TxtTime").val();
        var hours = parseInt(time.split(":")[0]);
        var minutes = parseInt(time.split(":")[1]);
        var AMPM = time.split(" ")[1];

        if (AMPM == "PM" && hours < 12) {
            hours = parseInt(hours) + parseInt(addTime);
        }
        if (AMPM == "AM" && hours == 12) {
            hours = parseInt(hours) - parseInt(addTime);
        }
        var h = hours;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (h < 10) sHours = sHours;
        if (minutes < 10) sMinutes = sMinutes;
        return sHours + ":" + sMinutes;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function TimeFormat(time) {
    try
    {
        var h = 0;
        var addTime = 12;
        var hours = parseInt(time.split(":")[0]);
        var minutes = parseInt(time.split(":")[1]);
        var AMPM = time.split(" ")[1];

        if (AMPM == "PM" && hours < 12) {
            hours = parseInt(hours) + parseInt(addTime);
        }
        if (AMPM == "AM" && hours == 12) {
            hours = parseInt(hours) - parseInt(addTime);
        }
        var h = hours;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (h < 10) sHours = sHours;
        if (minutes < 10) sMinutes = sMinutes;
        return sHours + ":" + sMinutes;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function hrsToAmPm(time) {
    try
    {
        var hours = parseInt(time.split(":")[0]);
        var minutes = parseInt(time.split(":")[1]);
        var dd = "AM";
        var h = hours;
        if (h >= 12) {
            h = hours - 12;
            dd = "PM";
        }
        if (h == 0) {
            h = 12;
        }

        var sHours = h.toString();
        if (sHours.length == 1) {
            sHours = "0" + sHours;
        }
        var sMinutes = minutes.toString();
        if (sMinutes.length == 1) {
            sMinutes = "0" + sMinutes;
        }
        return sHours + ":" + sMinutes + " " + dd;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteMassTime(MassTimings) {
    try
    {
        var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/DeleteMassTiming");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }  
}
function BindMassScheduleTextBoxes(jsonResult) {
    try
    {
        $('.dropdown-menu li input[type=checkbox]').prop('checked',false);
        var day = jsonResult[0]["Day"];
        var churchId = jsonResult[0]["ChurchID"];
        var massId = jsonResult[0]["ID"];
        var jsonResultTime = jsonResult[0]["Time"];
        jsonResultTime = jsonResultTime.Hours + ":" + jsonResultTime.Minutes;
        jsonResultTime = hrsToAmPm(jsonResultTime)
        $("#hdfChurchID").val(churchId);
        $("#hdfMassID").val(massId);
        $('.dropcheck', this.$container).attr('placeholder', day);
        $('.dropdown-menu li [value="' + day + '"]').prop("checked", true);
        $('.dropdown-menu li [value="' + day + '"]').addClass('active');
        $("#TxtTime").val(jsonResultTime);
        counter = 1;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}
function InsertMassTiming(MassTimings) {
    try
    {
        var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/InsertMassTiming");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    } 
}
function UpdateMassTiming(MassTimings) {
    try
    {
        var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/UpdateMassTiming");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function BindMassTimingTable(Records) {
    try
    {
        $("tbody#massTimingTableBody tr").remove();
        $.each(Records, function (index, Records) {

            if (Records.Time.includes(",") == true) {
                var timeArray = [];
                var timeLength = Records.Time.split(',').length;
                for (var i = 0; i < timeLength; i++) {
                    var recordsTime = Records.Time.split(',')[i];
                    var time = recordsTime.split(':')[0] + ":" + recordsTime.split(':')[1];
                    var hours = time.split(":")[0].length;
                    var minute = time.split(":")[1].length;
                    if ((hours == "1") && (minute == "1")) {
                        hours = "0" + recordsTime.split(':')[0];
                        minute = "0" + recordsTime.split(':')[1];
                        var time = hours + ":" + minute;
                    }
                    else if (hours == "1") {
                        hours = "0" + recordsTime.split(':')[0];
                        var time = hours + ":" + recordsTime.split(':')[1];
                    }
                    else if (minute == "1") {
                        minute = "0" + recordsTime.split(':')[1];
                        var time = recordsTime.split(':')[0] + ":" + minute;
                    }
                    time = timeTo12HrFormat(time);
                    time = hrsToAmPm(time);
                    timeArray.push(time);
                }

                var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"Day="' + Records.Day + '"Time="' + timeArray + '"><td>' + Records.Day + '</td><td class="center">' + timeArray + '</td></td><td class="center" id="btnMassUpdate"><a class="circlebtn circlebtn-success massUpdate" title="Change" href="#" onClick=BindMassEditGrid(this);><i class="halflings-icon white pencil"></i> </a></td></tr>';
            }
            else {
                var time = Records.Time.split(':')[0] + ":" + Records.Time.split(':')[1];
                var hours = time.split(":")[0].length;
                var minute = time.split(":")[1].length;
                if ((hours == "1") && (minute == "1")) {
                    hours = "0" + Records.Time.split(':')[0];
                    minute = "0" + Records.Time.split(':')[1];
                    var time = hours + ":" + minute;
                }
                else if (hours == "1") {
                    hours = "0" + Records.Time.split(':')[0];
                    var time = hours + ":" + Records.Time.split(':')[1];
                }
                else if (minute == "1") {
                    minute = "0" + Records.Time.split(':')[1];
                    var time = Records.Time.split(':')[0] + ":" + minute;
                }
                time = timeTo12HrFormat(time);
                time = hrsToAmPm(time);
                var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"Day="' + Records.Day + '"Time="' + time + '"><td>' + Records.Day + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-success massUpdate" title="Delete" href="#" onClick=BindMassEditGrid(this);><i class="halflings-icon white pencil"></i> </a></td></tr>';
            }


            $("#massTimingTable").append(html);
        })
        if (Records.length == 0) {
            $('#massTimingTableBox').css("height", "210px");
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#massTimingTable").append(img);
        }
        $("#thActions").css("display", " ");
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function timeTo12HrFormat(time) {   // Take a time in 24 hour format and format it in 12 hour format
    try
    {
        var time_part_array = time.split(":");
        var ampm = 'AM';

        if (parseInt(time_part_array[0]) >= 12) {
            ampm = 'PM';
        }

        if (parseInt(time_part_array[0]) > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }

        formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

        return formatted_time;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}


function BindAsyncAdminsTable() {
   // var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
   // $("#hdfChurchID").val(churchId);
    var jsonResult = {};
    var churchId = "";
    var MassTimings = new Object();
    MassTimings.massChurchId = churchId;
    jsonResult = GetAllMassTimings(MassTimings);
    debugger;
    if (jsonResult != undefined) {
        BindMassTimingTable(jsonResult);
    }

}
function selectMassTimeByMassID(MassTimings) {
    var ds = {};
    var table = {};
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/selectMassTimeByMassID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllMassTimings(MassTimings) {
    var ds = {};
    var table = {};
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/GetAllMassTimings");
    table = JSON.parse(ds.d);
    return table;
}

function selectMassTimeByDay(MassTimings) {
    var ds = {};
    var table = {};
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/selectMassTimeByDay");
    table = JSON.parse(ds.d);
    return table;
}


