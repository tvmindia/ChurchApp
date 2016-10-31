$("document").ready(function (e) {
    BindAsyncAdminsTable();

    $('#massTimingTable').dataTable({
       
        "bPaginate": false,
        "bSort": false,
        "bFilter": false,
        "bInfo":false
    });

    //--------------- *Save MassTiming* ----------------//
    $(".cancel").click(function (e) {
        $("#AddorEditSpan").text("Save");
        $("#txtDay").val("");
        $("#txtTime").val("");
    });

    $(".AddMass").click(function (e) {
        debugger;
        var saveOrEdit = $("#AddorEditSpan").text();
        if (saveOrEdit == "Save")
        {
            var result = "";
            var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
            var day = $("#txtDay").val();
            var time = $("#txtTime").val();
            time = time + ":00.0000000";
            var MassTimings = new Object();
            MassTimings.massChurchId = churchId;
            MassTimings.day = day;
            MassTimings.massTime = time;
            result = InsertMassTiming(MassTimings);
            if (result == "1") {
                alert("Success");
            }
            else {
                alert("Failure");
            }
        }
        else
        {
            var result = "";
            var churchId = $("#hdfChurchID").val();
            var massId = $("#hdfMassID").val();
            var day = $("#txtDay").val();
            var time = $("#txtTime").val();
            var MassTimings = new Object();
            MassTimings.massChurchId = churchId;
            MassTimings.day = day;
            MassTimings.massTime = time;
            MassTimings.massTimingID = massId;
            result = UpdateMassTiming(MassTimings);
            if (result == "1") {
                alert("Success");
            }
            else {
                alert("Failure");
            }
        }
        
    });

    $(".massTimeEdit").click(function (e) {
        debugger;
        $("#AddorEditSpan").text("Edit");
        var jsonResult = {};
        editedrow = $(this).closest('tr');
        var MassID = editedrow.attr("ID");
        var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
        var MassTimings = new Object();
        MassTimings.massChurchId = churchId;
        MassTimings.massTimingID = MassID;
        jsonResult = selectMassTimeByMassID(MassTimings);
        if (jsonResult != undefined)
        {
            BindMassScheduleTextBoxes(jsonResult);
           
        }
    });
    $(".massTimeDelete").click(function (e) {
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
            alert("Success");
           
        }
        else {
            alert("Failure");
        }
    });

    $("#tags input").on({

        focusout: function () {
            var txt = this.value.replace(/[^a-z0-9\+\-\.\#]/ig, ''); // allowed characters
            if (txt) $("<span/>", { text: txt.toLowerCase(), insertBefore: this });
            this.value = "";
        },
        keypress: function (ev) {

            if (ev.keyCode == 13) {

                // if: comma|enter (delimit more keyCodes with | pipe) 
                if (/(188|13)/.test(ev.which)) $(this).focusout();
                var callbacks = $.Callbacks();
                callbacks.add(alert("Do u want to delete?"));
                callbacks.disable();
                return false;
            }
        }
    });
    $('#tags').on('click', 'span', function () {
        $(this).remove();
    });
    $('#tags span').each(function () {
        //  tags.push($(this).text()) + " ";
        var split = $(this).text().split('\n');

        for (var i = 0; i < split.length; i++)
            if (split[i]) lines.push(split[i]);


    });
});//end of document.ready

//----------Insert MassTiming--------------//
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
    $("#txtDay").val(day);
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

    $("#txtTime").val(time);
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
            var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"><td>' + Records.Day + '</td><td class="center">' + timeArray + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEdit" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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
            var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"><td>' + Records.Day + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEdit" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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


