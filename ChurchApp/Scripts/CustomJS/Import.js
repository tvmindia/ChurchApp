var ImportError = {};
$("document").ready(function (e) {
    
    try
    {
        $(".ddlexcel").select2({
            placeholder: 'Select Filetype..',
            allowClear: true,
            data: BindIImportTable()
        });
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    try { 
        ImportError = $('#Importtable').DataTable(
         {
             dom: '<"top"f>rt<"bottom"ip><"clear">',
             order: [],
             searching: false,
             paging: true,
             data: "",
             columns: [
               { "data": "RowNo", "defaultContent": "<i>-</i>" },
               { "data": "FieldName", "defaultContent": "<i>-</i>" },
               { "data": "ErrorDesc", "defaultContent": "<i>-</i>" }
             ]
         });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    $(".uploadexcel").click(function (e) {
        //
        var excelresult;
        var valresult = validateExcel();
        
        if ((excelresult = $('#excelfileuploader')[0].files.length > 0) && $("#ddlexceldropdown").val()!="" && valresult)
        {
            var Import = new Object();
            Import.Exceltable = $("#ddlexceldropdown").val();
            var formData = new FormData();
            var excelfile;
            excelfile = $('#excelfileuploader')[0].files[0];
            formData.append('upExcelFile', excelfile, excelfile.name);
            formData.append('TableImport', Import.Exceltable);           
            var imagefiles;        
            if ((imagefiles = $('#imgfolderpathupload')[0].files.length > 0))
            {
                for (i = 0; i < $('#imgfolderpathupload')[0].files.length ; i++)
                {
                    formData.append('upImageFile'+i, $('#imgfolderpathupload')[0].files[i], $('#imgfolderpathupload')[0].files[i].name);
                }
            }           
            var result = postBlobAjax(formData, " ../ExcelHandler/ExcelHandler.ashx");
            //
            switch (result.status)
            {
                case "1":
                    noty({ type: 'success', text: Messages.ExcelUploadSuccess });
                    if (result.parentRow.length > 0) {
                        $("#excelErrorDiv").css("display", "");
                        $("#errorTableDiv").css("display", "");
                        ImportError.clear().rows.add(result.parentRow).draw(false);
                        //GetAllErrorData(result.parentRow);
                        $("#lblTotalRows").text(result.totalExcelRows);
                        $("#lblErrorCount").text(result.errorCount);
                        $("#lblInsertCount").text(result.insertedRows);
                        $("#lblUpdateCount").text(result.updatedRows);
                    }
                    else {
                        $("#excelErrorDiv").css("display", "");
                        $("#errorTableDiv").css("display", "none");
                        $("#lblTotalRows").text(result.totalExcelRows);
                        $("#lblErrorCount").text(result.errorCount);
                        $("#lblInsertCount").text(result.insertedRows);
                        $("#lblUpdateCount").text(result.updatedRows);
                    }
                    break;
                case "0":
                    //noty({ type: 'error', text: Messages.ExcelUploadFailure });
                    noty({ type: 'success', text: Messages.ExcelUploadSuccess });
                    if (result.parentRow.length > 0) {
                        $("#excelErrorDiv").css("display", "");
                        $("#errorTableDiv").css("display", "");
                        ImportError.clear().rows.add(result.parentRow).draw(false);
                        //GetAllErrorData(result.parentRow);
                        $("#lblTotalRows").text(result.totalExcelRows);
                        $("#lblErrorCount").text(result.errorCount);
                        $("#lblInsertCount").text(result.insertedRows);
                        $("#lblUpdateCount").text(result.updatedRows);
                    }
                    else {
                        $("#excelErrorDiv").css("display", "");
                        $("#errorTableDiv").css("display", "none");
                        $("#lblTotalRows").text(result.totalExcelRows);
                        $("#lblErrorCount").text(result.errorCount);
                        $("#lblInsertCount").text(result.insertedRows);
                        $("#lblUpdateCount").text(result.updatedRows);
                    }
                    break;                   
                default:
                    noty({ type: 'error', text: result.status });
                    break;
            }
        }
        else {
            if (valresult == true)
            noty({ type: 'error', text: Messages.Validation });
        }        
    })
});// end of document.ready

function ddldropdownchange()
{
    
    $("#excelErrorDiv").css("display", "none");

    var checkvalue = document.getElementById('ddlexceldropdown').value;
    if (checkvalue == "Priest"|| checkvalue =="Church")
    {
        $("#folderpathdiv").css("display", "");
    }
    else
    {
        $("#folderpathdiv").css("display", "none");
    }
        

}

function GetAllErrorData(ds)
{
    
    var table = {};
    try
    {
        //table = JSON.parse(ds.d);
        ImportError.DataTable(
             {
                 dom: '<"top"f>rt<"bottom"ip><"clear">',
                 order: [],
                 searching: false,
                 paging: true,
                 data: "",
                 columns: [

                   { "data": "RowNo", "defaultContent": "<i>-</i>" },
                   { "data": "FieldName","defaultContent": "<i>-</i>" },
                   { "data": "ErrorDesc", "defaultContent": "<i>-</i>" }
                 ]
             
             });
    }
    catch(e)
    {

    }
}

function BindIImportTable() {
    try {
        var jsonResult = {};
        var Excel   = new Object();
      
        //var Roles = new Object();
       // Roles.churchObj = church;
        jsonResult = GetExcelTablenames(Excel);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch (e) {

    }

}

function GetExcelTablenames(Excel) {
    var ds = {};
    var table = {};
    try {
        var data = "{'impxlObj':" + JSON.stringify(Excel) + "}";
        ds = getJsonData(data, "../AdminPanel/ImportExcel.aspx/SelectExcelTableNames");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}

function validateExcel() {
    
    var fileUpload = document.getElementById('excelfileuploader');
    var Extension = fileUpload.value.substring(fileUpload.value.lastIndexOf('.') + 1).toLowerCase();
    var flag = validateExcelExtension(Extension)
    if (!flag) {      
        noty({ type: 'error', text: "Kindly Upload file types of xlsx or xls" });       
        return false;
    }
    else {
        return true;
    }
}
//function to validate Excel file extension
function validateExcelExtension(ext) {
    if (!/(\xls|\xlsx|\XLS|\XLSX)$/i.test(ext)) {
        return false;
    }
    return true;
}