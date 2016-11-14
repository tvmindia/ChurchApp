$(document).ready(function () {
    BindInstituteslist();
    $('#btnSaveInstitute').click(function (e) {

        debugger;

        var AppImgURL = '';
        var InstituteID = $("#hdnInstutID").val();

        //-----------------------INSERT-------------------//

        if (InstituteID == null || InstituteID == "") {
            var guid = createGuid();

            if (guid != null) {

                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile, logoFile, img;

                if (((imagefile = $('#instituteimg')[0].files[0]) != undefined)) {
                    var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#instituteimg')[0].files[0]) != undefined) {
                        tempFile.name = guid;
                        formData.append('NoticeAppImage', tempFile, tempFile.name);
                        formData.append('GUID', guid);
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                }

            }

            var Institutions = new Object();
            Institutions.name = $('#txtInstituteName').val();
            Institutions.address = $('#txtAddress').val();
            Institutions.Founder = $('#txtFounder').val();
            Institutions.Founded = $('#txtFounded').val();
            Institutions.description = $('#txtHistory').val();
            Institutions.Email = $('#txtEmail').val();
            Institutions.Website = $('#txtWebsite').val();
            Institutions.phone1 = $('#txtPhone1').val();
            Institutions.phone2 = $('#txtPhone2').val();
            Institutions.Mobile = $('#txtMob').val();
            //Institutions.emailId = $('#txtEmail').val();
            //Institutions.mobile = $('#txtMobile').val();
            Institutions.imageId = guid;
            Institutions.institutionID = guid;
            $("#hdnInstutID").val(guid);
            result = InsertInstitute(Institutions);
            
            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Institution Added Successfully");

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }


        }
            //-----------------------UPDATE-------------------//
        else {
            var Institutions = new Object();
            Institutions.name = $('#txtInstituteName').val();
            Institutions.address = $('#txtAddress').val();
            Institutions.Founder = $('#txtFounder').val();
            Institutions.Founded = $('#txtFounded').val();
            Institutions.description = $('#txtHistory').val();
            Institutions.Email = $('#txtEmail').val();
            Institutions.Website = $('#txtWebsite').val();
            Institutions.phone1 = $('#txtPhone1').val();
            Institutions.phone2 = $('#txtPhone2').val();
            Institutions.Mobile = $('#txtMob').val();
            //Institutions.emailId = $('#txtEmail').val();
            //Institutions.mobile = $('#txtMobile').val();
            Institutions.imageId = $("#hdnInstutID").val();
            Institutions.institutionID = $("#hdnInstutID").val();
            

            // DeletedImgID = imageId;
            // DeletedImgPath = imgPath
            debugger;
            var guid = createGuid();
            if (((imagefile = $('#instituteimg')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#instituteimg')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Priest.imageId = guid;
            }

            result = UpdateInstitute(Priest);

            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Institution Edited Successfully");

                //if (DeletedImgID != '') {
                //    var AppImages = new Object();
                //    AppImages.appImageId = DeletedImgID;
                //    DeleteAppImage(AppImages);

                //    if (DeletedImgPath != '') {
                //        DeleteFileFromFolder(DeletedImgPath);
                //    }
                //}

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }
            //$('#assVicardiv').remove();
            //debugger;
            //$("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
            //SetControlsInNewNoticeFormat();
            //check();
            
        }
        BindInstituteslist();
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////*********************** Function for binding priest list vicar and asst vicar
function BindInstituteslist() {
    var InstituteDetails = {};
    var elems = $();
    InstituteDetails = GetInstitutionListChurchID();
    if (InstituteDetails.length == 0) {
        //return;
    }
    else {
        for (var i = 0; i < InstituteDetails.length; i++) {
            $('#InstituteDefault').remove();
            elems = elems.add(HtmlBindInstitutions(InstituteDetails[i]));
            $('#Institutediv').append(elems);
        }

    }
}
// Html code for binding Asst Vicar details
function HtmlBindInstitutions(InstituteDetails, i) {
    debugger;
    var ID = "'" + InstituteDetails.ID + "'";
    var html = ('<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="' + InstituteDetails.URL + '"/></li>'
      + '<li><span class="choosepic">' + InstituteDetails.Name + '</span> <br/>'
      + '<strong>Address:</strong> ' + InstituteDetails.Address + ' <br/><strong>Founder:</strong> ' + InstituteDetails.Founder + '<br/>'
      + '<strong>Founded:</strong>  ' + ConvertJsonToDate(InstituteDetails.Founded) + '<br /><strong>Website:</strong> ' + InstituteDetails.Website + ' <br/>'
      + '<a style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="OpenInstituteDetails(' + ID + ');">View more details</a>'
      + '</li></ul></div>');
    return html;

}
//Onclick function for view priest details
function OpenInstituteDetails(intituteID) {
    debugger;
    BindDetails(intituteID);
    $('#InstituteEdit').hide();
    $('#InstituteShow').show();
    if (!$("#divGendetailsacc").hasClass("active"))
    {
    $('#divGendetailsacc').toggleClass("active");
    $('#divGenDetals').toggleClass("show");
    }
}
//Bind Details to view
function BindDetails(intituteID) {
    var InstituteRow = {};
    InstituteRow = GetInstituteDetailsUsingID(intituteID);

    document.getElementById('lblInstituteName').innerText = InstituteRow.name;
    document.getElementById('lblAddress').innerText = InstituteRow.address;
    document.getElementById('lblHistory').innerText = InstituteRow.description;
    document.getElementById('lblFounder').innerText = InstituteRow.Founder;
    document.getElementById('lblFounded').innerText = InstituteRow.Founded;
    document.getElementById('lblEmail').innerText = InstituteRow.Email;
    document.getElementById('lblPhone1').innerText = InstituteRow.phone1;
    document.getElementById('lblPhone2').innerText = InstituteRow.phone2;
    document.getElementById('lblMobile').innerText = InstituteRow.Mobile;
    $('#instituteDetailPreview').attr('src', InstituteRow.imagepath);
    $('#aWebsite').attr('href', InstituteRow.Website);

}
function ClearFields() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file' || this.type == 'hidden') {
            this.value = '';
        }
        else if (this.type == 'radio' || this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

}
// Get the priest details using the priest ID for view more details
function GetInstituteDetailsUsingID(intituteID) {
    var ds = {};
    var table = {};
    var Institutions = new Object();
    Institutions.institutionID = intituteID;
    var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetInstituteDetailsUsingID");
    table = JSON.parse(ds.d);
    return table;
}
//Check if Priest Exist for church and obtain the details
function GetInstitutionListChurchID() {
    debugger;
    var ds = {};
    var table = {};
    var Institutions = new Object();
    //Priest.ChurchID = ChurchID;
    var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetInstituteList");
    table = JSON.parse(ds.d);
    return table;
}

// Create Guid
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
//Insert Institute
function InsertInstitute(Institutions) {
    var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/InserInstitute");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
// Update Institute
function UpdateInstitute(Institutions) {
    var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/UpdateInstitution");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function EditInstitute() {
    $('#InstituteShow').hide();
    $('#InstituteEdit').show();
}
function NewInstitute() {
    ClearFields();
    $('#InstituteEdit').show();
    $('#InstituteShow').hide();
}
// Show Picture preview for file upload
function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#priestPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}