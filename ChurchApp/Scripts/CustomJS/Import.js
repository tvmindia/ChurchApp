$("document").ready(function (e) {
    debugger;
    
    $(".uploadexcel").click(function (e) {
        debugger;
      
        if (0) {
          
        }
        else {
            noty({ type: 'error', text: Messages.BugNotFixed });
        }
    })

   
});// end of document.ready


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