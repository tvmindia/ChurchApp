$("document").ready(function (e) {
    debugger;
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
    
    $(".uploadexcel").click(function (e) {
        debugger;     
        var excelresult;
        if ((excelresult = $('#excelfileuploader')[0].files.length > 0))
        {                 
            var Import = new Object();
            Import.Exceltable = $("#ddlexceldropdown").val();

                var formData = new FormData();              
                var excelfile;
                excelfile = $('#excelfileuploader')[0].files[0];
                formData.append('upImageFile', excelfile, excelfile.name);
                formData.append('ActionTyp',Import.Exceltable);
             
            var result = postBlobAjax(formData, " ../ExcelHandler/ExcelHandler.ashx");
            switch (result.status)
            {
                case "1":
                    noty({ type: 'success', text: Messages.InsertionSuccessFull });                   
                    break;
                case "0":
                    noty({ type: 'error', text: Messages.FailureMsgCaption });
                    break;
                default:
                    noty({ type: 'error', text: result.status });
                    break;
            }
          
        }
        
    })

   
});// end of document.ready

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
    debugger;
    var fileUpload = document.getElementById('excelfileuploader');
    var Extension = fileUpload.value.substring(fileUpload.value.lastIndexOf('.') + 1).toLowerCase();
    var flag = validateExcelExtension(Extension)
    if (!flag) {      
        noty({ type: 'error', text: "Kindly Upload file types of xlsx or xls" });       
        return false;
    }
}


//function to validate Excel file extension
function validateExcelExtension(ext) {
    if (!/(\xls|\xlsx|\XLS|\XLSX)$/i.test(ext)) {
        return false;
    }
    return true;
}