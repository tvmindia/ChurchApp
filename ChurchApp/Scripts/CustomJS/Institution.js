$(document).ready(function () {
    BindInstituteslist();
    BindSelect();
    $('#btnAddAdmin').click(function (e) {
        debugger;

        var AppImgURL = '';
        var AdminID = $('#hdnAdminID').val();
        var InstituteID = $('#hdnInstituteID').val();

        //-----------------------INSERT-------------------//

        if (AdminID == null || AdminID == "") {
                var guid = createGuid();
            
            
            

            if (guid != null) {

                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile, logoFile, img;

                if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
                    var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
                        tempFile.name = guid;
                        formData.append('NoticeAppImage', tempFile, tempFile.name);
                        formData.append('GUID', guid);
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                }

            }

            var Administrators = new Object();
            Administrators.desigId = $('#ddlRole').val();
            Administrators.Name = $('#txtName').val();
            Administrators.Phone = $('#txtMobile').val();
            Administrators.orgId = InstituteID;
            Administrators.imageID = guid;
            Administrators.adminId = guid;
            $("#hdnAdminID").val(guid);
            result = InsertAdministrator(Administrators);

            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Administrator Added Successfully");

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }

           
        }
            //-----------------------UPDATE-------------------//
        else {
            var Administrators = new Object();
            Administrators.desigId = $('#ddlRole').val();
            Administrators.Name = $('#txtName').val();
            Administrators.Phone = $('#txtMobile').val();
            Administrators.orgId = InstituteID;
            Administrators.imageID = $("#hdnAdminID").val();;
            Administrators.adminId = $("#hdnAdminID").val();;
            


            // DeletedImgID = imageId;
            // DeletedImgPath = imgPath
            debugger;
            var guid = createGuid();
            if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Administrators.imageID = guid;
            }

            result = UpdateAdministrator(Administrators);

            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Administrator Edited Successfully");

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
                $('.alert-error strong').text("Editing Not Successful");
            }
            //$('#assVicardiv').remove();
            //debugger;
            //$("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
            //SetControlsInNewNoticeFormat();
            //check();
            
        }
        
        BindEditCard(InstituteID);
        $('#modelAddAdmin ').modal('hide');
        $('#txtName').val('');
        $('#txtMobile').val('');
        $('#ddlRole').val('-1').change();
        $("#hdnAdminID").val('');
    });
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

            $('#divAccoAdmininfo').show();
            if ($("#EditGenDetails").hasClass("active")) {
                $('#EditGenDetails').toggleClass("active");
                $('#EditGen').toggleClass("show");
            }
            if (!$("#divAccoAdmininfo").hasClass("active")) {
                $('#divAccoAdmininfo').toggleClass("active");
                $('#divAdminInfo').toggleClass("show");
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

function BindSelect()
{
    debugger;
    var selectRow = {};
    selectRow = GetRoles();
    for (var i = 0; i < selectRow.length; i++) {
        $('#ddlRole').append($('<option>',
        {
            value: selectRow[i].ID,
            text: selectRow[i].Position
        }));
    }
}
function GetRoles() {
    var ds = {};
    var table = {};
    var Administrators = new Object();
    Administrators.orgType = "INST";
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetRoles");
    table = JSON.parse(ds.d);
    return table;
}
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
            $('#Institutediv').empty();
            elems = elems.add(HtmlBindInstitutions(InstituteDetails[i]));
            $('#Institutediv').append(elems);
        }

    }
}
function GetAdminDetails(AdminID) {
    var ds = {};
    var table = {};
    var Administrators = new Object();
    Administrators.adminId = AdminID;
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetAdminDetails");
    table = JSON.parse(ds.d);
    return table;
}
// Html code for binding Institution details
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
function HtmlBindCards(AdminDetails, i) {
    debugger;
    var ID = "'" + AdminDetails.ID + "'";
    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + AdminDetails.URL + '"/>'
      + '<address><strong>' + AdminDetails.Position + '</strong><p>' + AdminDetails.Name + '<br/>' + AdminDetails.Phone + '</p></address></div>'
      + '</li></ul>');
    return html;

}
function HtmlBindCardsEmpty() {
    debugger;
    //var ID = "'" + AdminDetails.ID + "'";
    var html = ('<ul class="thumbnails span4" style="opacity:0.7;"><li class="span12"><div class="thumbnail"><img class="img-rounded" src="../img/gallery/priest.png" alt=""/>'
      + '<address><br/><strong><br/><br/>No Records Found</strong></br></address></div>'
      + '</li></ul>');
    return html;

}
//HtmlEditBindCards
function HtmlEditBindCards(AdminDetails, i) {
    debugger;
    var ID = "'" + AdminDetails.ID + "'";
    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + AdminDetails.URL + '"/>'
      + '<address><strong>' + AdminDetails.Position + '</strong><p>' + AdminDetails.Name + '<br/>' + AdminDetails.Phone + '</p></address><i class="icon-edit" name=' + ID + ' style="position: relative;top: -19px;left: 105px;cursor:pointer;" onclick="EditAdministrator(this)"></i><i class="icon-trash" name=' + ID + ' style="position: relative;top: -19px;left: 109px;cursor:pointer;" onclick="DeleteAdministrator(this);"></i></div>'
      + '</li></ul>');
    return html;

}
function EditAdministrator(this_Obj)
{
    debugger;
    var AdminRow = {};
    var AdminID = $(this_Obj).attr('name');
    $('#hdnAdminID').val(AdminID);
    AdminRow = GetAdminDetails(AdminID);
    $('#txtName').val(AdminRow.Name);
    $('#txtMobile').val(AdminRow.Phone);
    $('#ddlRole').val(AdminRow.desigId).change();
    $('#AdminPicPreview').attr('src', AdminRow.imagePath);
    $('#modelAddAdmin ').modal('show');
}
function DeleteAdministrator(this_Obj)
{
    debugger;
    var AdminID = $(this_Obj).attr('name');
    var AdminRow = {};
    AdminRow = GetAdminDetails(AdminID);
   
    result = DeleteAdmin(AdminRow);

    if (result.results == "1") {
        $('#rowfluidDiv').show();
        $('.alert-success').show();
        $('.alert-success strong').text("Administrator Deleted Successfully");

    }
    if (result.results != "1") {
        $('#rowfluidDiv').show();
        $('.alert-error').show();
        $('.alert-error strong').text("Deletion Not Successful");
    }
    BindEditCard(AdminRow.orgId);
}
//Onclick function for view Institution details
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
    ClearFields();
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
    $('#iconEditInstitute').attr('name', InstituteRow.institutionID);
    BindCard(intituteID);

}
function BindCard(ID)
{
    debugger;
    var AdminDetails = {};
    var elems = $();
    AdminDetails = BindAdminCard(ID);;
    if (AdminDetails.length == 0) {
        //return;
        $('#AdminCards').empty();
        //$('#EditdivAppend').empty();
        elems = elems.add(HtmlBindCardsEmpty());
        $('#AdminCards').append(elems);
    }
    else {
        for (var i = 0; i < AdminDetails.length; i++) {
            $('#AdminCards').empty();
            $('#EditdivAppend').empty();
            elems = elems.add(HtmlBindCards(AdminDetails[i]));
            $('#AdminCards').append(elems);
            //$('#EditdivAppend').append(elems);
        }

    }
}
// Bind Details for edit
function EditInstitute(this_obj) {
    var intituteID = $(this_obj).attr('name');
    var InstituteRow = {};
    InstituteRow = GetInstituteDetailsUsingID(intituteID);;
    $('#txtInstituteName').val(InstituteRow.name);
    $('#txtAddress').val(InstituteRow.address);
    $('#txtHistory').val(InstituteRow.description);
    $('#txtFounder').val(InstituteRow.Founder);
    $('#txtFounded').val(InstituteRow.Founded);
    $('#txtEmail').val(InstituteRow.Email);
    $('#txtPhone1').val(InstituteRow.phone1);
    $('#txtPhone2').val(InstituteRow.phone2);
    $('#txtMob').val(InstituteRow.Mobile);
    $('#txtWebsite').val(InstituteRow.Website);
    $('#priestPreview').attr('src', InstituteRow.imagepath);
    document.getElementById('HeadDetails').innerText = "Edit Details";
    $('#hdnInstutID').val(InstituteRow.institutionID);
    $('#hdnInstituteID').val(InstituteRow.institutionID);
    BindEditCard(intituteID)
    $('#InstituteShow').hide();
    $('#InstituteEdit').show();
    $('#divAccoAdmininfo').show();
    if (!$("#EditGenDetails").hasClass("active")) {
        $('#EditGenDetails').toggleClass("active");
        $('#EditGen').toggleClass("show");
    }
}
function BindEditCard(ID) {
    debugger;
    var AdminDetails = {};
    var elems = $();
    AdminDetails = BindAdminCard(ID);;
    if (AdminDetails.length == 0) {
        $('#EditdivAppend').empty();
    }
    else {
        for (var i = 0; i < AdminDetails.length; i++) {
            $('#EditdivAppend').empty();
            elems = elems.add(HtmlEditBindCards(AdminDetails[i]));
            $('#EditdivAppend').append(elems);
        }

    }
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

function BindAdminCard(ID) {
    var ds = {};
    var table = {};
    var Administrators = new Object();
    Administrators.orgId = ID;
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetAdministrators");
    table = JSON.parse(ds.d);
    return table;
}
// Get the Institution details using the InstitutionID for view more details
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
function InsertAdministrator(Administrators) {
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/InsertAdministrator");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function UpdateAdministrator(Administrators) {
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/UpdateAdministrator");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function DeleteAdmin(AdminRow) {
    debugger;
   
    var Administrators = new Object();
    Administrators.adminId = AdminRow.adminId;
    Administrators.imagePath = AdminRow.imagePath;
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/DeleteAdministrator");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//Check if Institution Exist for church and obtain the details
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
//Add New Institution
function NewInstitute() {
    ClearFields();
    $('#divAccoAdmininfo').hide();
    $('#priestPreview').attr('src', '../img/gallery/Institution.jpg');
    document.getElementById('HeadDetails').innerText = "Add Institution";
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
function OpenAdminModal()
{
    $('#modelAddAdmin ').modal('show');
    $('#txtName').val('');
    $('#txtMobile').val('');
    $('#ddlRole').val('-1').change();
    $("#hdnAdminID").val('');
    $('#AdminPicPreview').attr('src', "../img/gallery/priest.png");
}