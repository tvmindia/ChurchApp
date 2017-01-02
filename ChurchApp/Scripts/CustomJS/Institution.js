//
///////////////////////////////////////////********Document ready section
var churchObject = {};
$(document).ready(function () {
    try
    {
        churchObject.chid = $("#hdfchid").val();
        ///
        ////Function for binding Institutions
        //
        BindInstituteslist();
        //
        /// Function Binding Dropdown Select roles
        BindSelect();
        ///
        /// Save button Click for admin Add & Update in modal
        $('#btnAddAdmin').click(function (e) {
            try {
                AdminValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });
        ///
        /// Save button Click for Institution Add & Update
        $('#btnSaveInstitute').click(function (e) {
            try {
                InstitutionValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //
        //Style setting for client side Validation
        //CreatedBy Thomson

        $('input[type=text],input[type=password]').on('focus', function () {
            $(this).css({ background: 'white' });
            $('#ErrorBox,#ErrorBox1').hide(1000);
        });
        $('textarea,select').on('focus', function () {
            $(this).css({ background: 'white' });
            $('#ErrorBox,#ErrorBox1').hide(1000);
        });
        //////////////////////////////////////////////////////

        var value = $('#ContentPlaceHolder2_btnAddNew').val();
        if (value != "") {

            $('#iconEditInstitute').remove();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
});
///End document ready section


////////////////////////////////////////////******Common functions
//
///Function remove style after validating
function RemoveStyle() {
    try
    {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    }
    catch(e)
    {

    }
}
//Common function for clearing input fields
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
// Create Guid
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
// Show Picture preview for file upload Institution
function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#priestPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
// Show Picture preview for file upload Admin
function showpreviewAdmin(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#AdminPicPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
///End Common functions




//////////////////////////////////////////////////////************ functions 
//
///function save and update administrator
function SaveAdministrator()
{
    try
    {
        debugger;
        var InstituteID = $('#hdnInstituteID').val();
        var AdminID = $('#hdnAdminID').val();
        var Administrators = new Object();
        Administrators.desigId = $('#ddlRole').val();
        Administrators.Name = $('#txtName').val();
        Administrators.Phone = $('#txtMobile').val();
        Administrators.orgType = "INST";
        Administrators.orgId = InstituteID;
        Administrators.churchId = churchObject.chid;
        if (AdminID != null && AdminID != "") 
        {
            Administrators.adminId=AdminID;
            var imgresult;
            if ((imgresult = $('#fluImage')[0].files.length > 0)) {
                Administrators.imageID = $("#hdfAdminImageID").val();
                var formData = new FormData();
                var imagefile;
                imagefile = $('#fluImage')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('adminId', Administrators.adminId);
                formData.append('churchId', Administrators.churchId);
                formData.append('desigId', Administrators.desigId);
                formData.append('AdminimageId', Administrators.imageID);
                formData.append('Name',Administrators.Name);
                formData.append('Phone', Administrators.Phone);
                formData.append('orgType', Administrators.orgType);
                formData.append('orgId', Administrators.orgId);
                formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'AdministratorImageUpdate');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
            }
            else
            {
                result = UpdateAdministrator(Administrators);
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
            }
        }
        else
        {
            var imgresult;
            if ((imgresult = $('#fluImage')[0].files.length > 0)) {
                var formData = new FormData();
                var imagefile;
                imagefile = $('#fluImage')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('churchId', Administrators.churchId);
                formData.append('desigId', Administrators.desigId);
                formData.append('Name',Administrators.Name);
                formData.append('Phone', Administrators.Phone);
                formData.append('orgType', Administrators.orgType);
                formData.append('orgId', Administrators.orgId);
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'AdministratorImageInsert');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $('#hdfAdminImageID').val(result.imageID);
                        $('#hdnAdminID').val(result.adminId);
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
            }
            else
            {
                result = InsertAdministrator(Administrators);
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $('#hdfAdminImageID').val(result.imageID);
                        $('#hdnAdminID').val(result.adminId);
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
            }

        }
        BindEditCard(InstituteID);
        $('#modelAddAdmin ').modal('hide');
        $('#fluImage').val('');
         $('#txtName').val('');
         $('#txtMobile').val('');
         $('#ddlRole').val('-1').change();
         $("#hdnAdminID").val('');
         $('#hdfAdminImageID').val('');

       // if
       ////-------------------------------------------------------------------------------------- 
       // var AppImgURL = '';
       // var AdminID = $('#hdnAdminID').val();
       // var InstituteID = $('#hdnInstituteID').val();

       // //-----------------------INSERT-------------------//

       // if (AdminID == null || AdminID == "") {
       //     var i = "0";
       //     var guid = createGuid();
       //     if (guid != null) {
       //         ///////Image insert using handler
       //         var imgresult = "";
       //         var Administrators = new Object();
       //         var _URL = window.URL || window.webkitURL;
       //         var formData = new FormData();
       //         var imagefile, logoFile, img;

       //         if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
       //             var formData = new FormData();
       //             var tempFile;
       //             if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
       //                 tempFile.name = guid;
       //                 formData.append('NoticeAppImage', tempFile, tempFile.name);
       //                 formData.append('GUID', guid);
       //                 formData.append('createdby', 'sadmin');
       //             }
       //             formData.append('ActionTyp', 'NoticeAppImageInsert');
       //             AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
       //             i = "1";
       //         }

       //     }

            
       //     Administrators.desigId = $('#ddlRole').val();
       //     Administrators.Name = $('#txtName').val();
       //     Administrators.Phone = $('#txtMobile').val();
       //     Administrators.orgType = "INST";
       //     Administrators.orgId = InstituteID;
       //     if (i == "1")
       //     {
       //         Administrators.imageID = guid;
       //     }
       //     Administrators.adminId = guid;
       //     $("#hdnAdminID").val(guid);
       //     result = InsertAdministrator(Administrators);

       //     if (result.results == "1") {
       //         noty({ text: Messages.InsertionSuccessFull, type: 'success' });
       //     }
       //     if (result.results == "2") {
       //         noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
       //     }
       //     else{
       //         noty({ text: result.results, type: 'error' });
       //     }


       // }
       //     //-----------------------UPDATE-------------------//
       // else {
       //     var Administrators = new Object();
       //     Administrators.desigId = $('#ddlRole').val();
       //     Administrators.Name = $('#txtName').val();
       //     Administrators.Phone = $('#txtMobile').val();
       //     Administrators.orgType = "INST";
       //     Administrators.orgId = InstituteID;
       //     //Administrators.imageID = $("#hdnAdminID").val();
       //     Administrators.adminId = $("#hdnAdminID").val();
       //     ///////Image insert using handler
       //     var guid = createGuid();
       //     if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
       //         var formData = new FormData();
       //         var tempFile;
       //         if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
       //             tempFile.name = guid;
       //             formData.append('NoticeAppImage', tempFile, tempFile.name);
       //             formData.append('GUID', guid);
       //             formData.append('createdby', 'sadmin');
       //         }
       //         formData.append('ActionTyp', 'NoticeAppImageInsert');
       //         AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
       //         Administrators.imageID = guid;
       //     }

       //     result = UpdateAdministrator(Administrators);

       //     if (result.results == "1") {
       //         noty({ text: Messages.UpdationSuccessFull, type: 'success' });
       //     }
       //     else{
       //         noty({ text: result.results, type: 'error' });
       //     }

       // }

       // BindEditCard(InstituteID);
       // $('#modelAddAdmin ').modal('hide'); 
       // $('#txtName').val('');
       // $('#txtMobile').val('');
       // $('#ddlRole').val('-1').change();
       // $("#hdnAdminID").val('');
    }
    catch(e)
    {
        //return;
        noty({ type: 'error', text: e.message });
    }
    
}
//
///function save and update institution
function SaveInstitution()
{
    try {
        debugger;
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
        Institutions.churchId = churchObject.chid;

        if ($("#hdnInstutID").val() != "" && $("#hdnInstutID").val() != null) {

            Institutions.institutionID = $("#hdnInstutID").val();

            var imgresult;
            if ((imgresult = $('#instituteimg')[0].files.length > 0)) {
                Institutions.imageId = $("#hdfImageID").val();
                var formData = new FormData();
                var imagefile;
                imagefile = $('#instituteimg')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('churchID', Institutions.churchId);
                formData.append('institutionID', Institutions.institutionID);
                formData.append('InstitutionimageId', Institutions.imageId);
                formData.append('name', Institutions.name);
                formData.append('address', Institutions.address);
                formData.append('Founder', Institutions.Founder);
                formData.append('Founded', Institutions.Founded);
                formData.append('description', Institutions.description);
                formData.append('Email', Institutions.Email);
                formData.append('Website', Institutions.Website);
                formData.append('phone1', Institutions.phone1);
                formData.append('phone2', Institutions.phone2);
                formData.append('Mobile', Institutions.Mobile);
                formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'InstitutionImageUpdate');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        $('#btncancelInstitute').hide();
                        $('#btnDeleteInstitute').show();
                        $('#btnDeleteInstitute').attr('name', Institutions.institutionID);
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
                BindInstituteslist();
                $("#hdnInstutID").val(Institutions.institutionID);

            }
            else {
                result = UpdateInstitute(Institutions);
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        $('#btncancelInstitute').hide();
                        $('#btnDeleteInstitute').show();
                        $('#btnDeleteInstitute').attr('name', Institutions.institutionID);
                        break;
                    case "0":
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }

                BindInstituteslist();
                $("#hdnInstutID").val(Institutions.institutionID);
            }
        }
        else {

            //INSERT
            ///////Image insert using handler
            var imgresult;
            if ((imgresult = $('#instituteimg')[0].files.length > 0)) {

                var formData = new FormData();
                var imagefile;
                imagefile = $('#instituteimg')[0].files[0];
                formData.append('upImageFile', imagefile, imagefile.name);
                formData.append('churchID', Institutions.churchId);
                formData.append('name', Institutions.name);
                formData.append('address', Institutions.address);
                formData.append('Founder', Institutions.Founder);
                formData.append('Founded', Institutions.Founded);
                formData.append('description', Institutions.description);
                formData.append('Email', Institutions.Email);
                formData.append('Website', Institutions.Website);
                formData.append('phone1', Institutions.phone1);
                formData.append('phone2', Institutions.phone2);
                formData.append('Mobile', Institutions.Mobile);
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'InstitutionImageInsert');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                switch (result.results) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdnInstutID").val(result.institutionID);
                        $("#hdfImageID").val(result.imageId);
                        $('#btncancelInstitute').hide();
                        $('#btnDeleteInstitute').show();
                        $('#btnDeleteInstitute').attr('name', result.institutionID);
                        $('#divAccoAdmininfo').show();
                        $('#divAdminInfo').show();
                        $('#EditdivAppend').empty();
                        if ($("#EditGenDetails").hasClass("active")) {
                            $('#EditGenDetails').toggleClass("active");
                            $('#EditGen').toggleClass("show");
                        }
                        if (!$("#divAccoAdmininfo").hasClass("active")) {
                            $('#divAccoAdmininfo').toggleClass("active");
                            $('#divAdminInfo').toggleClass("show");
                        }
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }
                BindInstituteslist();
            }
            else {
                result = InsertInstitute(Institutions);
                switch (result.results) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        $("#hdnInstutID").val(result.institutionID);
                        $("#hdfImageID").val(result.imageId);
                        $('#btncancelInstitute').hide();
                        $('#btnDeleteInstitute').show();
                        $('#btnDeleteInstitute').attr('name', result.institutionID);
                        $('#divAccoAdmininfo').show();
                        $('#divAdminInfo').show();
                        $('#EditdivAppend').empty();
                        if ($("#EditGenDetails").hasClass("active")) {
                            $('#EditGenDetails').toggleClass("active");
                            $('#EditGen').toggleClass("show");
                        }
                        if (!$("#divAccoAdmininfo").hasClass("active")) {
                            $('#divAccoAdmininfo').toggleClass("active");
                            $('#divAdminInfo').toggleClass("show");
                        }
                        break;
                    case "0":
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                    default:
                        noty({ type: 'error', text: result.results });
                        break;

                }

                BindInstituteslist();

            }
        }
    }
           
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//
//Function Dropdown binding for select roles in admin add model
function BindSelect()
{
    try
    {
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//
/// Function for binding institution
function BindInstituteslist() {
    try
    {
        debugger;
        var InstituteDetails = {};
        var elems = $();
        InstituteDetails = GetInstitutionListChurchID();
        if (InstituteDetails.length == 0) {
            //return;
            $('#InstituteDefault').remove();
            $('#Institutediv').empty();
            $('#Institutediv').append(HtmlEmptyBind());
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//
//Bind institution Details to view
function BindDetails(intituteID) {
    try {
        debugger;
        var InstituteRow = {};
        InstituteRow = GetInstituteDetailsUsingID(intituteID);
        if (InstituteRow.results == null)
        {
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
            if (InstituteRow.imagepath != "") {
                $('#instituteDetailPreview').attr('src', InstituteRow.imagepath);
            }
            else {
                $('#instituteDetailPreview').attr('src', '../img/gallery/Institution.jpg');
            }

            $('#aWebsite').attr('href', InstituteRow.Website);
            $('#iconEditInstitute').attr('name', InstituteRow.institutionID);
            BindCard(intituteID);
            return true;
        }
        else
        {
            noty({ type: 'error', text: InstituteRow.results });
            return false;
        }
        
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Bind Admincard for view 
function BindCard(ID) {
    try {
        var AdminDetails = {};
        var elems = $();
        AdminDetails = BindAdminCard(ID);
        if (AdminDetails.length == 0) {
            $('#AdminCards').empty();
            elems = elems.add(HtmlBindCardsEmpty());
            $('#AdminCards').append(elems);
        }
        else {
            for (var i = 0; i < AdminDetails.length; i++) {
                $('#AdminCards').empty();
                $('#EditdivAppend').empty();
                elems = elems.add(HtmlBindCards(AdminDetails[i]));
                $('#AdminCards').append(elems);
            }

        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Bind Admincard for Edit 
function BindEditCard(ID) {
    try {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
///End functions



/////////////////////////////////////////////////////////////**************Html bind dynamic
function HtmlEmptyBind() {
    var html = ('<ul class="dashboard-list vicarlist"><li ><img class="priestimage" src="../img/gallery/Institution.jpg"/></li>'
                 +'<li ><br /><br /><br /><span style="color:#647587!important" class="choosepic"> No record Found</span> <br/></li></ul>');
    return html;
}
// Html code for binding Institution details
function HtmlBindInstitutions(InstituteDetails, i) {
    
    var ID = "'" + InstituteDetails.ID + "'";
    var imageurl = null;
    if (InstituteDetails.URL != null)
    {
        imageurl = InstituteDetails.URL;
    }
    else
    {
        imageurl = '../img/gallery/Institution.jpg';
    }
    
    var html = ('<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="' + imageurl + '"/></li>'
      + '<li><span class="choosepic">' + InstituteDetails.Name + '</span> <br/>'
      + '<strong>Address:</strong> ' + InstituteDetails.Address.substr(0,40) + '<br/><strong>Founder:</strong>' + InstituteDetails.Founder + '<br/>'
      + '<strong>Founded:</strong>' + ConvertJsonToDate(InstituteDetails.Founded) + '<br /><strong>Website:</strong> ' + InstituteDetails.Website + ' <br/>'
      + '<a style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="OpenInstituteDetails(' + ID + ');">View more details</a>'
      + '</li></ul></div>');
    return html;

}
// Html code for binding admincard details
function HtmlBindCards(AdminDetails, i) {
    var ID = "'" + AdminDetails.ID + "'";
    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + AdminDetails.URL + '"/>'
      + '<address><strong>' + AdminDetails.Position + '</strong><p>' + AdminDetails.Name + '<br/>' + AdminDetails.Phone + '</p></address></div>'
      + '</li></ul>');
    return html;

}
// Html code for binding Empty admincard details
function HtmlBindCardsEmpty() {
    var html = ('<ul class="thumbnails span4" style="opacity:0.7;"><li class="span12"><div class="thumbnail"><img class="img-rounded" src="../img/gallery/Noimage.png" alt=""/>'
      + '<address><br/><strong><br/><br/>No Records Found</strong></br></address></div>'
      + '</li></ul>');
    return html;

}
//Html code for binding Edit admincard details
function HtmlEditBindCards(AdminDetails, i) {
    
    var ID = "'" + AdminDetails.ID + "'";
    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + AdminDetails.URL + '"/>'
      + '<address><strong>' + AdminDetails.Position + '</strong><p>' + AdminDetails.Name + '<br/>' + AdminDetails.Phone + '</p></address><i class="icon-edit" name=' + ID + ' style="position: relative;top: -19px;left: 105px;cursor:pointer;" onclick="EditAdministrator(this)"></i><i class="icon-trash" name=' + ID + ' style="position: relative;top: -19px;left: 109px;cursor:pointer;" onclick="DeleteAdministrator(this);"></i></div>'
      + '</li></ul>');
    return html;

}
/////End Html bind dynamic



////////////////////////////////////////////////**** onclick functions
//
///Edit administrator button onclick function
function EditAdministrator(this_Obj)
{
    try
    {
        RemoveStyle();
        var AdminRow = {};
        var AdminID = $(this_Obj).attr('name');
        $('#hdnAdminID').val(AdminID);
        AdminRow = GetAdminDetails(AdminID);
        $('#hdfAdminImageID').val(AdminRow.imageID);
        $('#txtName').val(AdminRow.Name);
        $('#txtMobile').val(AdminRow.Phone);
        $('#ddlRole').val(AdminRow.desigId).change();
        if (AdminRow.imagePath != "")
        {
            $('#AdminPicPreview').attr('src', AdminRow.imagePath)
        }
        else
        {
            $('#AdminPicPreview').attr('src', '../img/gallery/Noimage.jpg');
        }
        
        $('#modelAddAdmin ').modal('show');
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }    
}
//
///Delete admnistrator button onclick function
function DeleteAdministrator(this_Obj)
{
    try
    {
        var r = confirm("Are You Sure to Delete?");
        if (r == true) {
            var AdminID = $(this_Obj).attr('name');
            var AdminRow = {};
            AdminRow = GetAdminDetails(AdminID);
            result = DeleteAdmin(AdminRow);
            if (result.results == "1") {
                noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                
            }
            if (result.results != "1") {
                noty({ text: result.results, type: 'error' });
            }
            BindEditCard(AdminRow.orgId);
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}
//View institution Details button onclick function
function OpenInstituteDetails(intituteID) {
    try
    {
        if (BindDetails(intituteID) == true)
        {
            $('#InstituteEdit').hide();
            $('#InstituteShow').show();
            if (!$("#divGendetailsacc").hasClass("active")) {
                $('#divGendetailsacc').toggleClass("active");
                $('#divGenDetals').toggleClass("show");
            }
        }
        
    }
    catch(e)
    {

    }
    
}
//
//Edit institution button onclick function
function EditInstitute(this_obj) {
    try
    {
        RemoveStyle();
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
        if (InstituteRow.imagepath != "")
        {
            $('#priestPreview').attr('src', InstituteRow.imagepath);
        }
        else
        {
            $('#priestPreview').attr('src', '../img/gallery/Institution.jpg');
        }
        
        document.getElementById('HeadDetails').innerText = "Edit Details";
        $('#hdnInstutID').val(InstituteRow.institutionID);
        $('#hdnInstituteID').val(InstituteRow.institutionID);
        $('#btnDeleteInstitute').show();
        $('#btnDeleteInstitute').attr('name', InstituteRow.institutionID);
        $('#btnDeleteInstitute').attr('onclick', 'DeleteInstituteclick(this)');
        BindEditCard(intituteID);
        $('#iconShowInstitute').show();
        $('#InstituteShow').hide();
        $('#InstituteEdit').show();
        $('#divAccoAdmininfo').show();
        $('#divAdminInfo').show();
        $('#btncancelInstitute').show();
        $('#btncancelInstitute').attr('name', 'Edit');
        if (!$("#EditGenDetails").hasClass("active")) {
            $('#EditGenDetails').toggleClass("active");
            $('#EditGen').toggleClass("show");
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//
//Delete institution button onclick function
function DeleteInstituteclick(this_Obj)
{
    try
    {
        
        var r = confirm("Are You Sure to Delete?");
        if (r == true)
        {
            var Adminresult = null;
            var AdminDetails = {};
            var InstituteRow = {};
            var intituteID = $(this_Obj).attr('name');
            AdminDetails = BindAdminCard(intituteID);
            InstituteRow = GetInstituteDetailsUsingID(intituteID);
            if (AdminDetails.length == 0) {
                Adminresult = "sucess";
            }
            for (var i = 0; i < AdminDetails.length; i++) {
                var AdminRow = new Object();
                AdminRow.adminId = AdminDetails[i].ID;
                AdminRow.imagePath = AdminDetails[i].URL;
                result = DeleteAdmin(AdminRow);
                if (result.results == "1") {
                    Adminresult = "sucess";

                }
            }
            if (Adminresult == "sucess") {
                result = DeleteInstitute(InstituteRow);
                if (result.results == "1") {
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    BindInstituteslist();
                    $('#InstituteEdit').hide();
                    $('#InstituteShow').hide();
                }
                if (result.results != "1") {
                    noty({ text: result.results, type: 'error' });
                }
            }
        }
       
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   

}
//
//Add new institution button onclick function
function NewInstitute() {
    try {
        debugger;
        ClearFields();
        RemoveStyle();
        
        $('#rowfluidDiv').hide();
        $('#instituteimg').val('');
        $('#divAccoAdmininfo').hide();
        $('#divAdminInfo').hide();
        $('#iconShowInstitute').hide();
        $('#priestPreview').attr('src', '../img/gallery/Institution.jpg');
        document.getElementById('HeadDetails').innerText = "Add Institution";
        $('#btncancelInstitute').show();
        $('#btncancelInstitute').attr('name', 'new');
        $('#InstituteEdit').show();
        $('#InstituteShow').hide();
        $('#btnDeleteInstitute').hide();
        $('#btnDeleteInstitute').attr('name', '');
        if (!$("#EditGenDetails").hasClass("active")) {
            $('#EditGenDetails').toggleClass("active");
            $('#EditGen').toggleClass("show");
        }
        $('#txtInstituteName').focus();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Add admin button onclick functionn for open modal
function OpenAdminModal() {
    try {
        RemoveStyle();
        $('#rowfluidDiv').hide();
        $('#modelAddAdmin ').modal('show');
        $('#txtName').val('');
        $('#txtMobile').val('');
        $('#ddlRole').val('-1').change();
        $("#hdnAdminID").val('');
        $('#AdminPicPreview').attr('src', "../img/gallery/Noimage.png");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Cancel button onclick function
function Cancel(this_Obj) {
    try {
        $('#rowfluidDiv').hide();
        var attr = $(this_Obj).attr('name');
        if (attr == 'new') {
            ClearFields();
            $('#InstituteEdit').hide();
            $('#InstituteShow').hide();
        }
        if (attr == "Edit") {
            $('#InstituteEdit').hide();
            $('#InstituteShow').show();
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
///End onclick events



//////////////////////////////////////////////////////////*******Sending Json data and retrive methods
//Get roles for dropdown
function GetRoles() {
    try {
        var ds = {};
        var table = {};
        var Administrators = new Object();
        Administrators.orgType = "INST";
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetRoles");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }
}
//Select All Administrators with InstitueID
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
//Select Admin with AdminID
function GetAdminDetails(AdminID) {
    try {
        var ds = {};
        var table = {};
        var Administrators = new Object();
        Administrators.adminId = AdminID;
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetAdminDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//Insert Administrator
function InsertAdministrator(Administrators) {
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/InsertAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
   
}
//Update Administrator
function UpdateAdministrator(Administrators) {
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/UpdateAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//Delete Administrator
function DeleteAdmin(AdminRow) {
    try
    {
        var Administrators = new Object();
        Administrators.adminId = AdminRow.adminId;
        Administrators.imagePath = AdminRow.imagePath;
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/DeleteAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
   
}

//Select all Institute with churchID
function GetInstitutionListChurchID() {
    try
    {
        var ds = {};
        var table = {};
        var Institutions = new Object();
        var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetInstituteList");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//Select Institute with InstitueID
function GetInstituteDetailsUsingID(intituteID) {
    try
    {
        var ds = {};
        var table = {};
        var Institutions = new Object();
        Institutions.institutionID = intituteID;
        var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetInstituteDetailsUsingID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
    
}
//Insert Institute
function InsertInstitute(Institutions) {
    try
    {
        var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/InserInstitute");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
    
}
// Update Institute
function UpdateInstitute(Institutions) {
    try
    {
        var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/UpdateInstitution");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
   
}
//Delete Institute
function DeleteInstitute(InstituteRow) {
    try
    {
        var Institutions = new Object();
        Institutions.institutionID = InstituteRow.institutionID;
        Institutions.imagepath = InstituteRow.imagepath;
        var data = "{'InstituteObj':" + JSON.stringify(Institutions) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/DeleteInstitution");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {

    }
    
}
///End Sending Json data and retrive methods

//////////////////////////////////////////////////////////************Client side Validation
//Basic Validation For New Institution
//CreatedBy Thomson
function InstitutionValidation() {
    try {
        var Name = $('#txtInstituteName');
        var Address = $('#txtAddress');
        var Phone1 = $('#txtPhone1');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
            { id: Address[0].id, name: Address[0].name, Value: Address[0].value },
            { id: Phone1[0].id, name: Phone1[0].name, Value: Phone1[0].value },
        ];

        var j = 0;

        for (var i = 0; i < container.length; i++) {

            if (container[i].Value == "") {
                j = 1;

                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";


            }
        }
        if (j == '1') {
            noty({ type: 'error', text: Messages.Validation });
            return false;
        }
            if (j == '0') {
                SaveInstitution();
                return true;
            }
        }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//Basic Validation For New Administrator
//CreatedBy Thomson
function AdminValidation() {
    
    try
    {
        var Name = $('#txtName');
        var Phone = $('#txtMobile');
        var Role = $('#ddlRole');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
            { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
            { id: Role[0].id, name: Role[0].name, Value: Role[0].value },
        ];

        var j = 0;

        for (var i = 0; i < container.length; i++) {

            if (container[i].Value == "") {
                j = 1;

                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";
                Errorbox.style.paddingLeft = "30px";

            }
            else if (container[i].Value == "-1") {
                j = 1;

                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";

            }
        }
        if (j == '1') {
            noty({ type: 'error', text: Messages.Validation });
            return false;
        }
        if (j == '0') {
            //scriptvalidate();
            SaveAdministrator();
            return true;
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
///End Client side Validation