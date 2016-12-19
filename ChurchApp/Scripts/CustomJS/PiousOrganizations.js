//
///////////////////////////////////////////********Document ready section
$(document).ready(function () {
    try
    {
        ///
        ////Function for binding Pious Organization
        //
        BindInstituteslist();
        //
        /// Function Binding Dropdown Select roles
        BindSelect();
        AutoComplete();
        AutoCompleteAdmin();
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
            debugger;
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
    try {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    }
    catch (e) {

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
// Show Picture preview for file upload Pious Organization
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
    try {
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
            Administrators.orgType = "PUINST";
            Administrators.orgId = InstituteID;
            Administrators.memberId = $("#hdnmemID").val();
            if (i == "1")
            {
                Administrators.imageID = guid;
            }
            Administrators.adminId = guid;
            $("#hdnAdminID").val(guid);
            result = InsertAdministrator(Administrators);

            if (result.results == "1") {
                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
            }
            if (result.results == "2") {
                noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
            }
            if (result.results != "1") {
                noty({ text: result.results, type: 'error' });
            }


        }
            //-----------------------UPDATE-------------------//
        else {
            var Administrators = new Object();
            Administrators.desigId = $('#ddlRole').val();
            Administrators.Name = $('#txtName').val();
            Administrators.Phone = $('#txtMobile').val();
            Administrators.orgType = "PUINST";
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
                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
            }
            if (result.results == "2") {
                noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
            }
            if (result.results != "1") {
                noty({ text: result.results, type: 'error' });
            }

        }

        BindEditCard(InstituteID);
        $('#modelAddAdmin ').modal('hide');
        $('#txtName').val('');
        $('#txtMobile').val('');
        $('#ddlRole').val('-1').change();
        $("#hdnAdminID").val('');
    }
    catch (e) {
        noty({ text: e.message, type: 'error' });
    }

}
//
///function save and update Pious Organization
function SaveInstitution() {
    try {
        debugger;
        var AppImgURL = '';
        var InstituteID = $("#hdnInstutID").val();

        //-----------------------INSERT-------------------//

        if (InstituteID == null || InstituteID == "") {
            var guid = createGuid();

            var PiousOrg = new Object();
            PiousOrg.piousOrgID = guid;
            PiousOrg.Name = $('#txtInstituteName').val();
            PiousOrg.description = $('#txtHistory').val();
            PiousOrg.PatronID = $('#hdnPatron').val();

            $("#hdnInstutID").val(guid);
            $('#hdnInstituteID').val(guid);
            result = InsertInstitute(PiousOrg);

            if (result.results == "1") {
                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
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
                noty({ text: result.results, type: 'error' });
            }


        }
            //-----------------------UPDATE-------------------//
        else {
            debugger;
            var PiousOrg = new Object();
           // PiousOrg.piousOrgID = guid;
            PiousOrg.Name = $('#txtInstituteName').val();
            PiousOrg.description = $('#txtHistory').val();
            PiousOrg.PatronID = $('#hdnPatron').val();
            //Institutions.imageId = $("#hdnInstutID").val();
            PiousOrg.piousOrgID = $("#hdnInstutID").val();


           
            result = UpdateInstitute(PiousOrg);

            if (result.results == "1") {
                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
            }
            if (result.results != "1") {
                noty({ text: result.results, type: 'error' });
            }

        }
        BindInstituteslist();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Function For auto complete text box for patron
function AutoComplete() {
    try
    {
        var ac = null;
        ac = GetAllPatrons();

        var length = ac.length;
        var projects = new Array();
        for (i = 0; i < length; i++) {
            var name = ac[i].split('🏠');
            projects.push({ value: name[0], label: name[0], desc: name[1] })
        }

        $("#txtPatron").autocomplete({
            maxResults: 10,
            source: function (request, response) {
                //--- Search by name or description(file no , mobile no, address) , by accessing matched results with search term and setting this result to the source for autocomplete
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var matching = $.grep(projects, function (value) {

                    var name = value.value;
                    var label = value.label;
                    var desc = value.desc;

                    return matcher.test(name) || matcher.test(desc);
                });
                var results = matching; // Matched set of result is set to variable 'result'

                response(results.slice(0, this.options.maxResults));
            },
            focus: function (event, ui) {
                $("#txtPatron").val(ui.item.label);

                return false;
            },
            select: function (event, ui) {
                var patronID = ui.item.desc;
                $('#hdnPatron').val(patronID);
                BindPatron(patronID);
                return false;
            }
        });
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}
//
//Function For auto complete text box for patron
function AutoCompleteAdmin() {
    try
    {
        var ac = null;
        ac = GetMembers();
        debugger;
        var length = ac.length;
        var projects = new Array();
        for (i = 0; i < length; i++) {
            var name = ac[i].split('🏠');
            projects.push({ value: name[0], label: name[0], desc: name[1], contact: name[2], imagepath: name[3] })
        }

        $("#txtName").autocomplete({
            maxResults: 10,
            source: function (request, response) {
                //--- Search by name or description(file no , mobile no, address) , by accessing matched results with search term and setting this result to the source for autocomplete
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var matching = $.grep(projects, function (value) {

                    var name = value.value;
                    var label = value.label;
                    var desc = value.desc;

                    return matcher.test(name) || matcher.test(desc);
                });
                var results = matching; // Matched set of result is set to variable 'result'

                response(results.slice(0, this.options.maxResults));
            },
            focus: function (event, ui) {
                $("#txtName").val(ui.item.value);

                return false;
            },
            select: function (event, ui) {
                var patronID = ui.item.desc;
                $('#hdnmemID').val(patronID);
                $('#txtMobile').val(ui.item.contact);
                if (ui.item.imagepath != "") {
                    $('#AdminPicPreview').attr('src', ui.item.imagepath);
                }

                // BindPatron(patronID);
                return false;
            }, appendTo: "#modelAddAdmin"
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}
//
//function Bind Patron and photo
function BindPatron(patronID)
{
    try
    {
        var PatronRow = {};
        PatronRow = GetPatronbyID(patronID); 
        $('#hdnPatron').val(PatronRow.patronMasterId);
        document.getElementById('lblPatron').innerText = PatronRow.patronMasterName;
        $('#priestPreview').show();
        $('#priestPreview').attr('src', PatronRow.imagepath);
        
        
    }
    catch(e)
    {

    }
}
//
//Function Dropdown binding for select roles in admin add model
function BindSelect() {
    try {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
/// Function for binding Pious Organization
function BindInstituteslist() {
    try {
        debugger;
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Bind Pious Organization Details to view
function BindDetails(intituteID) {
    try {
        debugger;
        var InstituteRow = {};
        InstituteRow = GetInstituteDetailsUsingID(intituteID);
        ClearFields();
        document.getElementById('lblInstituteName').innerText = InstituteRow.Name;
        document.getElementById('lblPatronDisplay').innerText = InstituteRow.Patron;
        document.getElementById('lblHistory').innerText = InstituteRow.description;
        if (InstituteRow.imagepath != "") {
            $('#instituteDetailPreview').attr('src', InstituteRow.imagepath);
        }
        else {
            $('#instituteDetailPreview').attr('src', '../img/gallery/Institution.jpg');
        }

        //$('#aWebsite').attr('href', InstituteRow.Website);
        $('#iconEditInstitute').attr('name', InstituteRow.piousOrgID);
        BindCard(intituteID);
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
// Html code for binding Pious Organization details
function HtmlBindInstitutions(InstituteDetails, i) {
    debugger;
    var ID = "'" + InstituteDetails.ID + "'";
    var imageurl = null;
    if (InstituteDetails.URL != null) {
        imageurl = InstituteDetails.URL;
    }
    else {
        imageurl = '../img/gallery/Institution.jpg';
    }

    var html = ('<ul class="media-list" style="border-bottom:1px solid #cfcece"><li class="media">'
      + '<a class="pull-left"><img class="media-object" src="' + imageurl + '" style="max-height:80px;min-width:80px;max-width:80px;"/></a>'
      + '<div class="media-body"><h4 class="media-heading">' + InstituteDetails.Name + '<span> </span><span class="fa fa-flag"></span></h4>Patron : ' + InstituteDetails.PatronName + '<br/>'
      + '' + InstituteDetails.Desc + ''
      + '<div class="media"><a style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="OpenInstituteDetails(' + ID + ');">View more details</a>'
      + '</div></div></li></ul>');
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
function EditAdministrator(this_Obj) {
    try {
        var AdminRow = {};
        var AdminID = $(this_Obj).attr('name');
        $('#hdnAdminID').val(AdminID);
        AdminRow = GetAdminDetails(AdminID);
        $('#txtName').val(AdminRow.Name);
        $('#txtMobile').val(AdminRow.Phone);
        $('#ddlRole').val(AdminRow.desigId).change();
        if (AdminRow.imagePath != "") {
            $('#AdminPicPreview').attr('src', AdminRow.imagePath)
        }
        else {
            $('#AdminPicPreview').attr('src', '../img/gallery/Noimage.jpg');
        }

        $('#modelAddAdmin ').modal('show');
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//
///Delete admnistrator button onclick function
function DeleteAdministrator(this_Obj) {
    try {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//View Pious Organization Details button onclick function
function OpenInstituteDetails(intituteID) {
    try {
        $('#rowfluidDiv').hide();
        BindDetails(intituteID);
        $('#InstituteEdit').hide();
        $('#InstituteShow').show();
        if (!$("#divGendetailsacc").hasClass("active")) {
            $('#divGendetailsacc').toggleClass("active");
            $('#divGenDetals').toggleClass("show");
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Edit Pious Organization button onclick function
function EditInstitute(this_obj) {
    try {

        var intituteID = $(this_obj).attr('name');
        var InstituteRow = {};
        InstituteRow = GetInstituteDetailsUsingID(intituteID);
        $('#iconDisInstitute').show();
        $('#txtInstituteName').val(InstituteRow.Name);
        $('#txtPatron').val(InstituteRow.Patron);
        $('#txtHistory').val(InstituteRow.description);
        if (InstituteRow.imagepath != "") {
            $('#priestPreview').show();
            $('#priestPreview').attr('src', InstituteRow.imagepath);
        }
        else {
            $('#priestPreview').attr('src', '../img/gallery/Institution.jpg');
        }

        document.getElementById('HeadDetails').innerText = "Edit Details";
        $('#hdnInstutID').val(InstituteRow.piousOrgID);
        $('#hdnInstituteID').val(InstituteRow.piousOrgID);
        $('#btnDeleteInstitute').removeAttr("disabled");
        $('#btnDeleteInstitute').attr('name', InstituteRow.piousOrgID);
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//
//Delete Pious Organization button onclick function
function DeleteInstituteclick(this_Obj) {
    try {
        debugger;
        var r = confirm("Are You Sure to Delete?");
        if (r == true) {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }


}
//
//Add new Pious Organization button onclick function
function NewInstitute() {
    try {
        ClearFields();
        RemoveStyle();
        $('#iconDisInstitute').hide();
        $('#rowfluidDiv').hide();
        $('#instituteimg').val('');
        $('#divAccoAdmininfo').hide();
        $('#divAdminInfo').hide();
        $('#iconShowInstitute').hide();
        $('#priestPreview').attr('src', '../img/gallery/Institution.jpg');
        document.getElementById('HeadDetails').innerText = "Add Pious Organization";
        $('#btncancelInstitute').attr('name', 'new');
        $('#InstituteEdit').show();
        $('#InstituteShow').hide();
        $('#btnDeleteInstitute').attr('disabled', 'disabled');
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
        Administrators.orgType = "PUINST";
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
    try {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/InsertAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}
//Update Administrator
function UpdateAdministrator(Administrators) {
    try {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/UpdateAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}
//Delete Administrator
function DeleteAdmin(AdminRow) {
    try {
        var Administrators = new Object();
        Administrators.adminId = AdminRow.adminId;
        Administrators.imagePath = AdminRow.imagePath;
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Institutions.aspx/DeleteAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}

//Select all Institute with churchID
function GetInstitutionListChurchID() {
    try {
        debugger;
        var ds = {};
        var table = {};
        var PiousOrg = new Object();
        var data = "{'PiousObj':" + JSON.stringify(PiousOrg) + "}";
        ds = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/GetPuOrgList");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//Select Pious Organization with InstitueID
function GetInstituteDetailsUsingID(intituteID) {
    try {
        var ds = {};
        var table = {};
        var PiousOrg = new Object();
        PiousOrg.piousOrgID = intituteID;
        var data = "{'PiousObj':" + JSON.stringify(PiousOrg) + "}";
        ds = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/GetPiousOrgDetailsUsingID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }

}
//Insert Pious Organization
function InsertInstitute(PiousOrg) {
    try {
        var data = "{'PiousObj':" + JSON.stringify(PiousOrg) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/InsertPiousOrg");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}
// Update Pious Organization
function UpdateInstitute(PiousOrg) {
    try {
        var data = "{'PiousObj':" + JSON.stringify(PiousOrg) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/UpdatePiousOrg");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}
//Delete Pious Organization
function DeleteInstitute(InstituteRow) {
    try {
        debugger;
        var PiousOrg = new Object();
        PiousOrg.piousOrgID = InstituteRow.piousOrgID;
        //PiousOrg.imagepath = InstituteRow.imagepath;
        var data = "{'PiousObj':" + JSON.stringify(PiousOrg) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/DeleteInstitution");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {

    }

}
//GetMembers
function GetMembers()
{
    try {
        var ds = {};
        var table = {};
        var Members = new Object();
        var data = "{'memObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/GetAllmembers");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {

    }
}
//Get Patrons
function GetAllPatrons() {
    try
    {
        var ds = {};
        var table = {};
        var PatronMaster = new Object();
        var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/GetAllPatrons");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
}
//Get Patron By ID
function GetPatronbyID(patronID)
{
    try
    {
        var ds = {};
        var table = {};
        var PatronMaster = new Object();
        PatronMaster.patronMasterId = patronID;
        var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/PiousOrganizations.aspx/GetPatronByID");
        table = JSON.parse(ds.d);
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
    try
    {
        debugger;
        var Name = $('#txtInstituteName');
        var Patron = $('#txtPatron');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
            { id: Patron[0].id, name: Patron[0].name, Value: Patron[0].value },
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
        debugger;
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