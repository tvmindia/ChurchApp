$("document").ready(function (e) {
    BindAsyncAdminsTable();
    $("#TxtTime").timepicki();
    $('#massTimingTable').dataTable({
       
        "bPaginate": false,
        "bSort": false,
        "bFilter": false,
        "bInfo":false
    });
    $("#ddlDay").select2({
        placeholder: "Select Day",
        allowClear: true,
    });
    $("#ddlDay").val("").trigger("change");
    //--------------- *Save MassTiming* ----------------//
    $(".cancel").click(function (e) {
        $("#AddorEditSpan").text("Save");
        $("#ddlDay").val("").trigger("change");
        $("#TxtTime").val("");
        document.getElementById("massTimingsUpdate").style.display = "none";
    });

    $(".AddMass").click(function (e) {
        debugger;
        var saveOrEdit = $("#AddorEditSpan").text();
        if (saveOrEdit == "Save")
        {
            
            var result = "";
            var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
            var day = $("#ddlDay").val();
            var time = hrsTo24hrormat();
            time = time + ":00.0000000";
            var MassTimings = new Object();
            MassTimings.massChurchId = churchId;
            MassTimings.day = day;
            MassTimings.massTime = time;
            result = InsertMassTiming(MassTimings);
            if (result == "1") {
                BindAsyncAdminsTable();
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
            var result = "";
            var churchId = $("#hdfChurchID").val();
            var massId = $("#hdfMassID").val();
            var day = $("#ddlDay").val();
            var time = hrsTo24hrormat();
            time = time + ":00.0000000";
            var MassTimings = new Object();
            MassTimings.massChurchId = churchId;
            MassTimings.day = day;
            MassTimings.massTime = time;
            MassTimings.massTimingID = massId;
            result = UpdateMassTiming(MassTimings);
            if (result == "1") {
                BindAsyncAdminsTable();
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
            var MassTimings = new Object();
            editedrow = $(this).closest('tr');
            var MassID = editedrow.attr("ID");
            var massChurchID = editedrow.attr("ChurchID");
            MassTimings.massChurchId = massChurchID;
            MassTimings.massTimingID = MassID;
            result = DeleteMassTime(MassTimings);
            if (result == "1") {
                BindAsyncAdminsTable();
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Deleted Successfully");
               //var massId= $("#hdfMassIDs").val();
               //var churchId= $("#hdfChurchIDs").val();
               //var day= $("#hdfDay").val();
               //var time = $("#hdfTime").val();
                //BindMassTimingUpdateTable(massId, churchId, day, time)
                document.getElementById("massTimingsUpdate").style.display = "none";
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Error..!!!");
            }
        }
    });
    $(".massUpdate").click(function (e) {
        debugger;
        $("#ddlDay").val("").trigger("change");
        $("#TxtTime").val("");
        editedrow = $(this).closest('tr');
        var MassID = editedrow.attr("ID");
        var massChurchID = editedrow.attr("ChurchID");
        var Day = editedrow.attr("Day");
        var Time = editedrow.attr("Time");
        $("#hdfMassIDs").val(MassID);
        $("#hdfChurchIDs").val(massChurchID);
        $("#hdfDay").val(Day);
        $("#hdfTime").val(Time);
        BindMassTimingUpdateTable(MassID,massChurchID,Day,Time);
    });
   
});//end of document.ready

//----------Insert MassTiming--------------//
function BindMassTimingUpdateTable(MassID, massChurchID, Day, Time)
{
    debugger;
    document.getElementById("massTimingUpdateTable").innerHTML = "";
    var ChurchMassID = "";
    var MassDay = "";
    var massTime = "";
    if (MassID.includes(",") == true)
    {
        var massId = MassID.split(",").length;
        for (var i = 0; i < massId; i++) {
            ChurchMassID = MassID.split(",")[i];
            massTime = Time.split(",")[i];
            var html = '<tr class="MassTimingUpdateRows" ID="' + ChurchMassID + '"ChurchID="' + massChurchID + '"><td>' + Day + '</td><td class="center">' + massTime + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);
        }
    }
    else
    {
      
        var html = '<tr class="MassTimingUpdateRows" ID="' + MassID + '"ChurchID="' + massChurchID + '"><td>' + Day + '</td><td class="center">' + Time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            $("#massTimingUpdateTable").append(html);
        
    }
    
    document.getElementById("massTimingsUpdate").style.display = "";
}
function hrsTo24hrormat()
{
    debugger;
    var time = $("#TxtTime").val();
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    var AMPM = time.split(":")[2];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours =  sHours;
    if(minutes<10) sMinutes =  sMinutes;
    return sHours + ":" + sMinutes;
}
function DeleteMassTime(MassTimings)
{
    debugger;
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/DeleteMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function BindMassScheduleTextBoxes(jsonResult)
{
    debugger;
    var day = jsonResult[0]["Day"];
    var churchId = jsonResult[0]["ChurchID"];
    var massId = jsonResult[0]["ID"];
    var jsonResultTime = jsonResult[0]["Time"];
    $("#hdfChurchID").val(churchId);
    $("#hdfMassID").val(massId);
    $("#ddlDay").val(day).trigger("change");
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
    debugger;
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/InsertMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function UpdateMassTiming(MassTimings)
{
    debugger;
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
        debugger;
        if (Records.Time.includes(",") == true)
        {
            var timeArray = [];
            var timeLength = Records.Time.split(',').length;
            for(var i=0;i<timeLength;i++)
            {
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
           
            //$("#txtTags").siblings('span').remove();
          
            //var str = Records.Time;
            //var str_array = str.split(',');

            //for (var i = 0; i < str_array.length; i++) {
               
            //    var tcount = function () {
            //        var txt = timeArray[i]; // allowed characters
            //        if (txt) $("<span/>", { text: txt.toLowerCase(), insertBefore: this });
            //        this.value = "";

            //    }
            //    $("#txtTags").val(tcount);
            //}
           // var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"><td>' + Records.Day + '</td><td class="center"><div id="tags"> <input type="text" value="" id="txtTags" /></div></td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEdit" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
            var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"Day="' + Records.Day + '"Time="' + timeArray + '"><td>' + Records.Day + '</td><td class="center">' + timeArray + '</td></td><td class="center"><a class="circlebtn circlebtn-success massUpdate" title="Change" href="#"><i class="halflings-icon white pencil"></i> </a></td></tr>';
        }
        else
        {
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
            var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"Day="' + Records.Day + '"Time="' + time + '"><td>' + Records.Day + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-success massUpdate" title="Delete" href="#"><i class="halflings-icon white pencil"></i> </a></td></tr>';
        }

      
        $("#massTimingTable").append(html);
    })
}
function timeTo12HrFormat(time) {   // Take a time in 24 hour format and format it in 12 hour format
    debugger;
    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }

    formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

    return formatted_time;
}


function BindAsyncAdminsTable() {
    debugger;
    var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
        var jsonResult = {};
        var MassTimings = new Object();
        MassTimings.massChurchId = churchId;
        jsonResult = GetAllMassTimings(MassTimings);
        if (jsonResult != undefined) {
            BindMassTimingTable(jsonResult);
        }
    
}
function selectMassTimeByMassID(MassTimings)
{
    debugger;
    var ds = {};
    var table = {};
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/selectMassTimeByMassID");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllMassTimings(MassTimings)
{
    var ds = {};
    var table = {};
        var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
        ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/GetAllMassTimings");
        table = JSON.parse(ds.d);
    return table;
}


