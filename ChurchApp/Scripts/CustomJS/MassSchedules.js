$("document").ready(function (e) {
    BindAsyncAdminsTable();
    //--------------- *Save MassTiming* ----------------//
    $(".AddMass").click(function (e) {
        debugger;
        var result = "";
        var churchId = '41f453f6-62a4-4f80-8fc5-1124e6074287';
        var day = $("#txtDay").val();
        var time = Date();
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
    });

    


});//end of document.ready

//----------Insert MassTiming--------------//
function InsertMassTiming(MassTimings) {
    debugger;
    var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/MassSchedules.aspx/InsertMassTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function BindMassTimingTable(Records) {

    debugger;
    $("tbody#massTimingTableBody tr").remove();

    $.each(Records, function (index, Records) {
        var time = sqlToJsDate(Records.Time);
        var html = '<tr class="MassTimingRows" ID="' + Records.ID + '"ChurchID="' + Records.ChurchID + '"><td>' + Records.Day + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info" title="Edit" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
        $("#massTimingTable").append(html);
    })
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
function GetAllMassTimings(MassTimings)
{
    var ds = {};
    var table = {};
        var data = "{'MassTimingsObj':" + JSON.stringify(MassTimings) + "}";
        ds = getJsonData(data, "../AdminPanel/MassSchedules.aspx/GetAllMassTimings");
        table = JSON.parse(ds.d);
    return table;
}
function sqlToJsDate(sqlDate) {
    var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split(" ");
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];

    return new Date(sYear, sMonth, sDay, sHour, sMinute);
}