﻿$("document").ready(function (e) {
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

        "bPaginate": false,
        "bSort": false,
        "bFilter": false,
        "bInfo": false,
        "oLanguage":false
    });
    //$("#ddlDay").select2({
    //    placeholder: "Select Day",
    //    allowClear: true,
    //});
    //$("#ddlDay").val("").trigger("change");
    //--------------- *Save MassTiming* ----------------//
    $(".cancel").click(function (e) {
        debugger;
        $("#AddorEditSpan").text("Save");
        $('.dropcheck', this.$container).attr('placeholder', " ");
        $("#TxtTime").val("");
        $("input[type=checkbox]").prop('checked', false);
        $('#rowfluidDiv').hide();
        if ($("#hdfEditMassDay").val() == null && $("#hdfEditMassDay").val() == "")
        {
            document.getElementById("massTimingsUpdate").style.display = "none";
        }
        else
        {
            document.getElementById("massTimingsUpdate").style.display = " ";
            var day=new Array();
            var dayElem = $("#hdfEditMassDay").val();
            day.push(dayElem);
            BindGridOnDaySelect(day);
        }
    });

    $(".AddMass").click(function (e) {
        debugger;
        $("#NoData").remove();
        $('#massTimingTableBox').css("height", "auto");
        var saveOrEdit = $("#AddorEditSpan").text();
        if (saveOrEdit == "Save") {

            var result = "";
            //var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
            var day = $('.dropcheck').attr('placeholder');
            if (day == "Daily")
            {
                day = $("#ddlDay").val();
            }
            var time = hrsTo24hrormat();
            time = time + ":00.0000000";
            var MassTimings = new Object();
            //MassTimings.massChurchId = churchId;
            MassTimings.day = day + ",";
            MassTimings.massTime = time;
            result = InsertMassTiming(MassTimings);
            switch (result.status) {
                case "1":
                    BindAsyncAdminsTable();
                    var jsonResult = {};
                    MassTimings.day = day + ",";
                    jsonResult = selectMassTimeByDay(MassTimings);
                    var length = jsonResult.length;
                    var MassID = new Array();
                    var massDay = new Array();
                    var massChurchID = "";
                    var Day = "";
                    var Time = new Array();
                    for (var i = 0; i < length; i++) {
                        var ID = jsonResult[i]["ID"];
                        massChurchID = jsonResult[i]["ChurchID"];
                        Day = jsonResult[i]["Day"];
                        var MassTime = jsonResult[i]["Time"];
                        MassID.push(ID);
                        Time.push(MassTime);
                        massDay.push(Day);
                    }
                    Time = BindTime(Time)
                    ReBindMassTimingUpdateTable(MassID, massChurchID, massDay, Time);
                    noty({ text: 'Saved Successfully', type: 'success' });
                    break;
                case "0":
                    noty({ text: 'Error..!!!', type: 'error' });
                    break;
                default:
                    noty({ text: 'Time Already Exists', type: 'information' });
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
            switch(result.status)
            {
                case "1":
                    BindAsyncAdminsTable();
                    var jsonResult = {};
                    MassTimings.massChurchId = churchId;
                    MassTimings.day = day + ",";
                    jsonResult = selectMassTimeByDay(MassTimings);
                    var length = jsonResult.length;
                    var MassID = new Array();
                    var massChurchID = "";
                    var Day = "";
                    var Time = new Array();
                    for (var i = 0; i < length; i++) {
                        var ID = jsonResult[i]["ID"];
                        massChurchID = jsonResult[i]["ChurchID"];
                        Day = jsonResult[i]["Day"];
                        var MassTime = jsonResult[i]["Time"];
                        MassID.push(ID);
                        Time.push(MassTime);
                    }
                    Time = BindTime(Time)
                    ReBindMassTimingUpdateTable(MassID, massChurchID, Day, Time);
                    noty({ text: 'Updated Successfully', type: 'success' });
                    break;
                default:
                    noty({ text: 'Error..!!!', type: 'error' });
                    break;
            }
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
                    var length = jsonResult.length;
                    var MassID = new Array();
                    var massDay = new Array();
                    var massChurchID = "";
                    var Day = "";
                    var Time = new Array();
                    for (var i = 0; i < length; i++) {
                        var ID = jsonResult[i]["ID"];
                        massChurchID = jsonResult[i]["ChurchID"];
                        Day = jsonResult[i]["Day"];
                        var MassTime = jsonResult[i]["Time"];
                        MassID.push(ID);
                        Time.push(MassTime);
                        massDay.push(Day);
                    }
                    Time = BindTime(Time)
                    ReBindMassTimingUpdateTable(MassID, massChurchID, massDay, Time);
                    noty({ text: 'Deleted Successfully', type: 'success' });
                    break;
                default:
                    noty({ text: 'Error..!!!', type: 'error' });
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
        var dayarr = new Array();
        if ($("#ddlDay").val() != null)
        {
            // BindGridOnDaySelect();
            $('#ddlDay :selected').each(function (i, sel) {
                dayarr.push($(sel).val());
                
            });
            //alert(dayarr);
            //BindGridOnDaySelect(dayarr);
        }
        else
        {
            dayarr.length = 0;
            BindGridOnDaySelect(dayarr);
        }
        AddTempTable();
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
    debugger;
    var jsonResult = {};
    var MassTimings = new Object();
    MassTimings.massChurchId = $("#hdfChurchID").val();
    dayarr = dayarr + ",";
    MassTimings.day = dayarr.toString();
    jsonResult = selectMassTimeByDay(MassTimings);
    var length = jsonResult.length;
    var MassID = new Array();
    var dayArray = new Array();
    var massChurchID = "";
    var Day = "";
    var Time = new Array();
    for (var i = 0; i < length; i++) {
        var ID = jsonResult[i]["ID"];
        massChurchID = jsonResult[i]["ChurchID"];
        Day = jsonResult[i]["Day"];
        var MassTime = jsonResult[i]["Time"];
        MassID.push(ID);
        Time.push(MassTime);
        dayArray.push(Day);
    }
    Time = BindTime(Time)
    ReBindMassTimingUpdateTable(MassID, massChurchID, dayArray, Time);
}

function ReBindMassTimingUpdateTable(MassID, massChurchID, Day, Time) {
    document.getElementById("massTimingUpdateTable").innerHTML = "";
    var ChurchMassID = "";
    var MassDay = "";
    var massTime = "";
    var massLength = MassID.length;
    if (MassID != "")
    {
        if (massLength > 1) {
            for (var i = 0; i < massLength; i++) {
                ChurchMassID = MassID[i];
                massTime = Time[i];
                MassDay = Day[i];
                var html = '<tr class="MassTimingUpdateRows" ID="' + ChurchMassID + '"ChurchID="' + massChurchID + '"Day="' + MassDay + '"Time="' + massTime + '"><td>' + MassDay + '</td><td class="center">' + massTime + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                $("#massTimingUpdateTable").append(html);
            }

        }
        else {

            var html = '<tr class="MassTimingUpdateRows" ID="' + MassID + '"ChurchID="' + massChurchID + '"Day="' + Day + '"Time="' + Time + '"><td>' + Day + '</td><td class="center">' + Time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);

        }

        document.getElementById("massTimingsUpdate").style.display = "";
    }
    else
    {
        document.getElementById("massTimingsUpdate").style.display = "none";
    }
    $("#TxtTime").val("");
}
function AddTempTable()
{
    debugger;
    $("#massTimingUpdateTable").html('');
    var time = hrsTo24hrormat();
    var dayarr = new Array();
    if ($("#ddlDay").val() != null) {
        $('#ddlDay :selected').each(function (i, sel) {
            dayarr.push($(sel).val());

        });
    }
    var len = dayarr.length;
    if ($("#TxtTime").val() != "" && $("#TxtTime").val() != null)
    {
        if (len > 1) {
            for (var i = 0; i < dayarr.length; i++) {
                var html = '<tr  ><td>' + dayarr[i] + '</td><td class="center">' + (time != "NaN:NaN" ? time : "-") + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
                $("#massTimingUpdateTable").append(html);
                $("#massTimingsUpdate").show();
            }
        }
        else
        {
            var html = '<tr  ><td>' + dayarr != null ? time : "-" + '</td><td class="center">' + (time != "NaN:NaN" ? time : "-") + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);
            $("#massTimingsUpdate").show();
        }
    }
    
}
function DeleteTime(Obj)
{

    var deleteConirm = confirm("Want to delete?");
    if (deleteConirm) {
        $(Obj).closest("tr").remove();
    }
    else
    {
        return false;
    }
}
function BindTime(Time) {
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
function BindMassEditGrid(e) {
    debugger;
    $('#rowfluidDiv').hide();
    $('.dropcheck', this.$container).attr('placeholder', " ");
    $("#TxtTime").val("");
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
function BindMassTimingUpdateTable(MassID, massChurchID, Day, Time) {
    document.getElementById("massTimingUpdateTable").innerHTML = "";
    var ChurchMassID = "";
    var MassDay = "";
    var massTime = "";
    if (MassID.includes(",") == true) {
        var massId = MassID.split(",").length;
        for (var i = 0; i < massId; i++) {
            ChurchMassID = MassID.split(",")[i];
            massTime = Time.split(",")[i];

            var html = '<tr class="MassTimingUpdateRows" ID="' + ChurchMassID + '"ChurchID="' + massChurchID + '"Day="' + Day + '"Time="' + massTime + '"><td>' + Day + '</td><td class="center">' + massTime + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);
        }
    }
    else {

        var html = '<tr class="MassTimingUpdateRows" ID="' + MassID + '"ChurchID="' + massChurchID + '"Day="' + Day + '"Time="' + Time + '"><td>' + Day + '</td><td class="center">' + Time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
        $("#massTimingUpdateTable").append(html);

    }

    document.getElementById("massTimingsUpdate").style.display = "";
}
function hrsTo24hrormat() {
    var h = 0;
    var addTime = 12;
    var time = $("#TxtTime").val();
    var hours = parseInt(time.split(":")[0]);
    var minutes = parseInt(time.split(":")[1]);
    var AMPM = time.split(" ")[1];
   // AMPM = AMPM.trim();
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
function DeleteMassTime(MassTimings) {
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/DeleteMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function BindMassScheduleTextBoxes(jsonResult) {
    var day = jsonResult[0]["Day"];
    var churchId = jsonResult[0]["ChurchID"];
    var massId = jsonResult[0]["ID"];
    var jsonResultTime = jsonResult[0]["Time"];
    $("#hdfChurchID").val(churchId);
    $("#hdfMassID").val(massId);
    $('.dropcheck', this.$container).attr('placeholder', day);
    var time = jsonResultTime.Hours + ":" + jsonResultTime.Minutes;
    var hours = time.split(":")[0].length;
    var minute = time.split(":")[1].length;
    if ((hours == "1") && (minute == "1")) {
        hours = "0" + jsonResultTime.Hours;
        minute = "0" + jsonResultTime.Minutes;
        var time = hours + ":" + minute;
    }
    else if (hours == "1") {
        hours = "0" + jsonResultTime.Hours;
        var time = hours + ":" + jsonResultTime.Minutes;
    }
    else if (minute == "1") {
        minute = "0" + jsonResultTime.Minutes;
        var time = jsonResultTime.Hours + ":" + minute;
    }

    $("#TxtTime").val(time);
}
function InsertMassTiming(MassTimings) {
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/InsertMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function UpdateMassTiming(MassTimings) {
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/UpdateMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function BindMassTimingTable(Records) {
    debugger;
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
                timeArray.push(time);
            }


            // var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"><td>' + Records.Day + '</td><td class="center"><div id="tags"> <input type="text" value="" id="txtTags" /></div></td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEdit" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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
            var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"Day="' + Records.Day + '"Time="' + time + '"><td>' + Records.Day + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-success massUpdate" title="Delete" href="#" onClick=BindMassEditGrid(this);><i class="halflings-icon white pencil"></i> </a></td></tr>';
        }


        $("#massTimingTable").append(html);
    })
    if(Records.length==0)
    {
        //$('.dataTables_empty').parent().parent().remove();
        $('#massTimingTableBox').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#massTimingTable").append(img);
    }
    $("#thActions").css("display", " ");
}
function timeTo12HrFormat(time) {   // Take a time in 24 hour format and format it in 12 hour format
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


