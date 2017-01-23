var BugDataTables = {};

$("document").ready(function (e) {
    
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
                 dom: '<"top"f>rt<"bottom"ip><"clear">',
                 columns: [

                   { "data": "ErrorID" },
                   { "data": "Name" },
                    { "data": "Module", "defaultContent": "<i>-</i>" },
                   { "data": "Method", "orderable": false, "defaultContent": "<i>-</i>" },
                   { "data": "ErrorSource", "defaultContent": "<i>-</i>" },
                    { "data": "Version", "defaultContent": "<i>-</i>" },
                     { "data": "Date", "defaultContent": "<i>-</i>" },
                      { "data": "IsFixed", "defaultContent": "<i>-</i>" },
                 { "data": null, "defaultContent": "<i>-</i>" }

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
                   },
                   {
                       "render": function (data, type, row) {
                           if (row.IsFixed == false)
                           {
                               return '<a class="circlebtn circlebtn-info" title="Edit Error Log" onclick="EditErrorList(this)"><i class="halflings-icon white edit""></i></a>';
                           }
                           else
                           {
                              
                               
                           }
                          
                       },
                       "targets": 8
                   },
                    {
                        "render": function (data, type, row) {
                            var i=null
                            if (row.IsFixed == true)
                            {
                                i = '<a class="Status" title="fixed"><i class="fa fa-check" aria-hidden="true"></i></a>';
                            }
                            else
                            {
                                i = '<a class="Status" title="not fixed"><i aria-hidden="true">-</i></a>';
                            }
                            return i;
                        },
                        "targets": 7
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

    $(".datepicker").datepicker({
       
          
       
    });
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
        $("#txtStartDate").css("display", "none");
        $("#lblStartDate").css("display","none")
        var ExceptionTrack = new Object();
        BugDataTables.errorTable.clear().rows.add(GetAllBugs(ExceptionTrack)).draw(false);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}

function getFormattedDate(input) {
    
    var pattern = /(.*?)\/(.*?)\/(.*?)$/;
    var result = input.replace(pattern, function (match, p1, p2, p3) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return p2 + " " + months[(p1 - 1)] + " " + p3;

    });
    return result;
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

function DateChange()
{
    try
    {
        var date = $("#txtStartDate").val();
        var ExceptionTrack = new Object();
        ExceptionTrack.startDate = date;
        BugDataTables.errorTable.clear().rows.add(GetAllFixedBugs(ExceptionTrack)).draw(false);
    }
    catch(e)
    {

    }
    
}

function FixedBugs()
{
    try
    {
        
        $("#txtStartDate").css("display", "");
        $("#lblStartDate").css("display","inline")
        var date = new Date(new Date().setDate(new Date().getDate() - 30));
        date = formattedDate(date);
        date = getFormattedDate(date);
        date = date.replace(/ /g, "-");
        $("#txtStartDate").val(date);
        var ExceptionTrack = new Object();
        ExceptionTrack.startDate = date;
        BugDataTables.errorTable.clear().rows.add(GetAllFixedBugs(ExceptionTrack)).draw(false);
        ClearControls();
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

function GetAllFixedBugs(ExceptionTrack) {
    
    var ds = {};
    var table = {};
    try {
        var data = "{'exceptionObj':" + JSON.stringify(ExceptionTrack) + "}";
        ds = getJsonData(data, "../AdminPanel/BugTracker.aspx/GetAllFixedErrorLog");
        table = JSON.parse(ds.d);
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    return table;
}
