//
///////////////////////////////////////////********Document ready section
$(document).ready(function () {
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
        try
        {
            AdminValidation();
        }
        catch (e)
        {

        }
    });
    ///
    /// Save button Click for Institution Add & Update
    $('#btnSaveInstitute').click(function (e) {
        try
        {
            InstitutionValidation();
        }
        catch(e)
        {

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
        var AppImgURL = '';
        var AdminID = $('#hdnAdminID').val();
        var InstituteID = $('#hdnInstituteID').val();

        //-----------------------INSERT-------------------//

        if (AdminID == null || AdminID == "") {
            var i = "0";
            var guid = createGuid();
            if (guid != null) {
                ///////Image insert using handler
                var imgresult = "";
                var Administrators = new Object();
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
                        formData.append('createdby', 'sadmin');
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    i = "1";
                }

            }

            
            Administrators.desigId = $('#ddlRole').val();
            Administrators.Name = $('#txtName').val();
            Administrators.Phone = $('#txtMobile').val();
            Administrators.orgType = "INST";
            Administrators.orgId = InstituteID;
            if (i == "1")
            {
                Administrators.imageID = guid;
            }
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
            Administrators.orgType = "INST";
            Administrators.orgId = InstituteID;
            //Administrators.imageID = $("#hdnAdminID").val();
            Administrators.adminId = $("#hdnAdminID").val();
            ///////Image insert using handler
            var guid = createGuid();
            if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                    formData.append('createdby', 'sadmin');
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

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Editing Not Successful");
            }

        }

        BindEditCard(InstituteID);
        $('#modelAddAdmin ').modal('hide'); 
        $('#txtName').val('');
        $('#txtMobile').val('');
        $('#ddlRole').val('-1').change();
        $("#hdnAdminID").val('');
    }
    catch(e)
    {
        //return;
    }
    
}
//
///function save and update institution
function SaveInstitution()
{
    try
    {
        var AppImgURL = '';
        var InstituteID = $("#hdnInstutID").val();

        //-----------------------INSERT-------------------//

        if (InstituteID == null || InstituteID == "") {
            var guid = createGuid();

            if (guid != null) {
                var i = 0;
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
                        formData.append('createdby', 'sadmin');
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    i = "1";
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
            if (i == "1")
            {
                Institutions.imageId = guid;
            }
            Institutions.institutionID = guid;
            $("#hdnInstutID").val(guid);
            $('#hdnInstituteID').val(guid);
            result = InsertInstitute(Institutions);

            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Institution Added Successfully");
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

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }

            
        }
            //-----------------------UPDATE-------------------//
        else {
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
            //Institutions.imageId = $("#hdnInstutID").val();
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
                    formData.append('createdby', 'sadmin');
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Institutions.imageId = guid;
            }

            result = UpdateInstitute(Institutions);

            if (result.results == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Institution Edited Successfully");

            }
            if (result.results != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }

        }
        BindInstituteslist();
    }
    catch(e)
    {

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

    }
    
}
//
/// Function for binding institution
function BindInstituteslist() {
    try
    {
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
    catch(e)
    {

    }
    
}
//
//Bind institution Details to view
function BindDetails(intituteID) {
    try {
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
        if (InstituteRow.imagepath != "")
        {
            $('#instituteDetailPreview').attr('src', InstituteRow.imagepath);
        }
        else
        {
            $('#instituteDetailPreview').attr('src', '../img/gallery/Institution.jpg');
        }
        
        $('#aWebsite').attr('href', InstituteRow.Website);
        $('#iconEditInstitute').attr('name', InstituteRow.institutionID);
        BindCard(intituteID);
    }
    catch (e) {

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

    }

}
///End functions



/////////////////////////////////////////////////////////////**************Html bind dynamic
// Html code for binding Institution details
function HtmlBindInstitutions(InstituteDetails, i) {
    debugger;
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
    debugger;
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
        var AdminRow = {};
        var AdminID = $(this_Obj).attr('name');
        $('#hdnAdminID').val(AdminID);
        AdminRow = GetAdminDetails(AdminID);
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
    }
    catch(e)
    {

    }
   
}
//View institution Details button onclick function
function OpenInstituteDetails(intituteID) {
    try
    {
        $('#rowfluidDiv').hide();
        BindDetails(intituteID);
        $('#InstituteEdit').hide();
        $('#InstituteShow').show();
        if (!$("#divGendetailsacc").hasClass("active"))
        {
            $('#divGendetailsacc').toggleClass("active");
            $('#divGenDetals').toggleClass("show");
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
        $('#btnDeleteInstitute').removeAttr("disabled");
        $('#btnDeleteInstitute').attr('name', InstituteRow.institutionID);
        $('#btnDeleteInstitute').attr('onclick', 'DeleteInstituteclick(this)');
        BindEditCard(intituteID);
        $('#iconShowInstitute').show();
        $('#InstituteShow').hide();
        $('#InstituteEdit').show();
        $('#divAccoAdmininfo').show();
        $('#divAdminInfo').show();
        $('#btncancelInstitute').attr('name', 'Edit');
        if (!$("#EditGenDetails").hasClass("active")) {
            $('#EditGenDetails').toggleClass("active");
            $('#EditGen').toggleClass("show");
        }
    }
    catch(e)
    {

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
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text("Institution Deleted Successfully");
                    BindInstituteslist();
                    $('#InstituteEdit').hide();
                    $('#InstituteShow').hide();
                }
                if (result.results != "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text("Deletion Not Successful");
                }
            }
        }
       
    }
    catch(e)
    {

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
        $('#btncancelInstitute').attr('name', 'new');
        $('#InstituteEdit').show();
        $('#InstituteShow').hide();
        $('#btnDeleteInstitute').attr('disabled', 'disabled');
        $('#btnDeleteInstitute').attr('name', '');
        if (!$("#EditGenDetails").hasClass("active")) {
            $('#EditGenDetails').toggleClass("active");
            $('#EditGen').toggleClass("show");
        }
    }
    catch (e) {

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
    debugger;
    $('#Displaydiv').remove();
    var Name = $('#txtInstituteName');
    var Address = $('#txtAddress');
    var Founder = $('#txtFounder');
    var Founded = $('#txtFounded');
    var History = $('#txtHistory');
    var Email = $('#txtEmail');
    var Website = $('#txtWebsite');
    var Phone1 = $('#txtPhone1');
    var Phone2 = $('#txtPhone2');
    var mobile = $('#txtMob');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Address[0].id, name: Address[0].name, Value: Address[0].value },
        //{ id: Founder[0].id, name: Founder[0].name, Value: Founder[0].value },
        //{ id: Founded[0].id, name: Founded[0].name, Value: Founded[0].value },
        //{ id: History[0].id, name: History[0].name, Value: History[0].value },
        //{ id: Email[0].id, name: Email[0].name, Value: Email[0].value },
        //{ id: Website[0].id, name: Website[0].name, Value: Website[0].value },
        { id: Phone1[0].id, name: Phone1[0].name, Value: Phone1[0].value },
        //{ id: Phone2[0].id, name: Phone2[0].name, Value: Phone2[0].value },
        //{ id: mobile[0].id, name: mobile[0].name, Value: mobile[0].value },
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {

        if (container[i].Value == "") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            Errorbox.style.paddingLeft = "30px";

        }
    }
    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";

        divs.appendChild(p);

        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        //scriptvalidate();
        SaveInstitution();
        return true;
    }
}
//Basic Validation For New Administrator
//CreatedBy Thomson
function AdminValidation() {
    debugger;
    $('#Displaydiv1').remove();
    var Name = $('#txtName');
    var Phone = $('#txtMobile');
    var Role = $('#ddlRole');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Phone[0].id, name: Phone[0].name, Value: Phone[0].value },
        { id: Role[0].id, name: Role[0].name, Value: Role[0].value },
    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox1');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv1");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {

        if (container[i].Value == "") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            Errorbox.style.paddingLeft = "30px";

        }
        else if(container[i].Value == "-1")
        {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            Errorbox.style.paddingLeft = "30px";
    }
    }
    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";

        divs.appendChild(p);
        //$('#btnAddAdmin').attr('name', 'failure');
        return false;
    }
    if (j == '0') {
        $('#ErrorBox1').hide(1000);
       //scriptvalidate();
        SaveAdministrator();
        //$('#btnAddAdmin').attr('name', 'success');
        return true;
    }
}
///End Client side Validation