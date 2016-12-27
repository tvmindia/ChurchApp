var BugDataTables = {};

$("document").ready(function (e) {
    debugger;
    try
    {
        try {

            var ExceptionTrack = new Object();
            BugDataTables.errorTable = $('#ErrorTable').DataTable(
             {

                 order: [],
                 searching: true,
                 paging: true,
                 data: GetAllBugs(ExceptionTrack),
                 columns: [

                   { "data": "ErrorID" },
                   { "data": "Name" },
                    { "data": "Module", "defaultContent": "<i>-</i>" },
                   { "data": "Method", "orderable": false, "defaultContent": "<i>-</i>" },
                   { "data": "ErrorSource", "defaultContent": "<i>-</i>" },
                    { "data": "Version", "defaultContent": "<i>-</i>" },
                     { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
                   { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" title="Edit Error Log" onclick="EditErrorList(this)"><i class="halflings-icon white edit""></i></a>' }

                 ],
                 columnDefs: [
                  {//hiding hidden column field churchid
                      "targets": [0, 1],
                      "visible": false,
                      "searchable": false
                  },
                   {
                       "render": function (data, type, row) {
                           return ConvertJsonToDate(data);
                       },
                       "targets": 6
                   }


                 ]
             });

        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    try
    {
        $(".BugClear").click(function (e) {
            ClearControls();
        });
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }

    $(".updateBug").click(function (e)
    {
        debugger;
        var isFixed = $('#OptIsFixedYes').closest('span').hasClass('checked');
        if(isFixed==true)
        {
            var errorID = $("#hdfErrorID").val();
            if(errorID!="" && errorID!=null)
            {
                var ExceptionTrack = new Object();
                ExceptionTrack.ErrorID = errorID;
                ExceptionTrack.IsFixed = isFixed;
                var jsonResult = UpdateErrorLog(ExceptionTrack);
                switch (jsonResult.status) {
                    case "1":
                        BindBugTable();
                        noty({ type: 'success', text: Messages.UpdationSuccessFull });
                        ClearControls();
                        break;
                    default:
                        noty({ type: 'error', text: Messages.UpdationFailure });
                        break;
                }

            }
            else
            {
                noty({ type: 'error', text: Messages.SelectBug });
            }
        }
        else
        {
            noty({ type: 'error', text: Messages.BugNotFixed });
        }
    })
});// end of document.ready

function ClearControls()
{
    $('.form-horizontal').find(':input').each(function () {
        $(this).val('');
    });
    $('#OptIsFixedYes').parent().addClass('checked');
    $('#OptIsFixedNo').parent().removeClass('checked');
    $('#OptIsMobileYes').parent().addClass('checked');
    $('#OptIsMobileNo').parent().removeClass('checked');
    $("#hdfErrorID").val("");
}
function BindBugTable() {
    //DataTable rebind using its api
    try
    {
        var ExceptionTrack = new Object();
        BugDataTables.errorTable.clear().rows.add(GetAllBugs(ExceptionTrack)).draw(false);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}


function EditErrorList(curobj)
{
    try
    {
        var data = BugDataTables.errorTable.row($(curobj).parents('tr')).data();
        RemoveStyle();

        var ExceptionTrack = new Object();
        ExceptionTrack.ErrorID = data.ErrorID;
        $("#hdfErrorID").val(ExceptionTrack.ErrorID);

        var errorLogDetails = GetErrorDetailsByErrorID(ExceptionTrack);
        if (errorLogDetails != undefined)
        {
           
                $("#txtChurchName").val(errorLogDetails[0].Name != null && errorLogDetails[0].Name != "" ? errorLogDetails[0].Name : '-');
                $("#txtUser").val(errorLogDetails[0].userName != null && errorLogDetails[0].userName != "" ? errorLogDetails[0].userName : '-');
                $("#txtDescription").val(errorLogDetails[0].Description != null && errorLogDetails[0].Description != "" ? errorLogDetails[0].Description : '-');
                $("#txtErrorDate").val(errorLogDetails[0].CreatedDate != null && errorLogDetails[0].CreatedDate != "" ? ConvertJsonToDate(errorLogDetails[0].CreatedDate) : '-');
                $("#txtModule").val(errorLogDetails[0].Module != null && errorLogDetails[0].Module != "" ? errorLogDetails[0].Module : '-');
                $("#txtMethod").val(errorLogDetails[0].Method != null && errorLogDetails[0].Method != "" ? errorLogDetails[0].Method : '-');
                $("#txtVersion").val(errorLogDetails[0].Version != null && errorLogDetails[0].Version != "" ? errorLogDetails[0].Version : '-');
                $("#txtSource").val(errorLogDetails[0].ErrorSource != null && errorLogDetails[0].ErrorSource != "" ? errorLogDetails[0].ErrorSource : '-');
                $("#txtAppBuild").val(errorLogDetails[0].AppBuild != null && errorLogDetails[0].AppBuild != "" ? errorLogDetails[0].AppBuild : '-');
                $("#txtAppLogCat").val(errorLogDetails[0].AppLogCat != null && errorLogDetails[0].AppLogCat != "" ? errorLogDetails[0].AppLogCat : '-');
                if(errorLogDetails[0].IsFixed==true)
                {
                    $('#OptIsFixedYes').parent().addClass('checked');
                    $('#OptIsFixedNo').parent().removeClass('checked');
                }
                else
                {
                    $('#OptIsFixedYes').parent().removeClass('checked');
                    $('#OptIsFixedNo').parent().addClass('checked');
                }
                if(errorLogDetails[0].IsMobile==true)
                {
                    $('#OptIsMobileYes').parent().addClass('checked');
                    $('#OptIsMobileNo').parent().removeClass('checked');
                }
                else
                {
                    $('#OptIsMobileYes').parent().removeClass('checked');
                    $('#OptIsMobileNo').parent().addClass('checked');
                }
        }
       
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

//-----------------------------------------*Web Methods*---------------------------------------------------//
function GetAllBugs(ExceptionTrack) {
    debugger;
    var ds = {};
    var table = {};
    try {
        var data = "{'exceptionObj':" + JSON.stringify(ExceptionTrack) + "}";
        ds = getJsonData(data, "../AdminPanel/BugTracker.aspx/GetAllErrorLog");
        table = JSON.parse(ds.d);
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    return table;
}

function CopyAppLog()
{
    debugger;
    try
    {
        var range = document.createRange();
        $("#txtAppLogCat").select();
        window.getSelection();
       document.execCommand('copy');
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
   
    return false;
}

function UpdateErrorLog(ExceptionTrack)
{
    var ds = {};
    var table = {};
    try
    {
        var data = "{'exceptionObj':" + JSON.stringify(ExceptionTrack) + "}";
        ds = getJsonData(data, "../AdminPanel/BugTracker.aspx/UpdateErrorLog");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    return table;
}

function GetErrorDetailsByErrorID(ExceptionTrack)
{
    debugger;
    var ds = {};
    var table = {};
    try
    {
        var data = "{'exceptionObj':" + JSON.stringify(ExceptionTrack) + "}";
        ds = getJsonData(data, "../AdminPanel/BugTracker.aspx/GetErrorLogByID");
        table = JSON.parse(ds.d);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    return table;
}