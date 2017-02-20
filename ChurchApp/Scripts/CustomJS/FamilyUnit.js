var adminImage = null;
var churchObject = {};
$(document).ready(function () {
    churchObject.chid = $("#hdfchid").val();
    debugger;
    BindSelect();
    UnitPageLoad();
    //save or edit btn click of Administrator
    $("#btnAddAdmin").click(function (e) {
        try {

            var i = "0";
            var jsonResult = {};
            var position = $("#ddlRole option:selected").text();
            if (position != "Select Position") {
                var IdAndOrder = $('#ddlRole').val();
                var desigID = IdAndOrder.split(":")[0];
                var order = IdAndOrder.split(":")[1];
                var orgType = "FU";
                var unitId = $("#hdfUnitID").val();
                var mobile = (($("#txtMobile").val() != "" && $("#txtMobile").val() != null) ? $("#txtMobile").val() : "");
                var name = $("#ddlMember option:selected").text();
                if (name != "Select Member") {
                    var memberID = $("#ddlMember").val();
                    var Administrators = new Object();
                    Administrators.orgType = orgType;
                    Administrators.orgId = unitId;
                    Administrators.desigId = desigID;
                    Administrators.memberId = memberID;
                    Administrators.imageID = $("#hdfAdminImageID").val();
                    if ($("#hdfAdminDefaultImg").val() != "") {
                        Administrators.imageID = $("#hdfAdminDefaultImg").val();
                    }
                    Administrators.Name = name;
                    Administrators.Phone = mobile;
                    Administrators.churchId = churchObject.chid;
                    Administrators.adminId = $("#hdfAdminID").val();
                    if ($("#AddOrEditAdmin").text() == "Add") {

                        if (imgresult = $('#fluImage')[0].files.length > 0) {
                            var formData = new FormData();
                            var imagefile;
                            imagefile = $('#fluImage')[0].files[0];
                            // imagefile.name = imgId;
                            formData.append('upImageFile', imagefile, imagefile.name);
                            formData.append('churchID', Administrators.churchId);
                            formData.append('desigId', Administrators.desigId);
                            formData.append('Name', Administrators.Name);
                            formData.append('Phone', Administrators.Phone);
                            formData.append('orgType', Administrators.orgType);
                            formData.append('orgId', Administrators.orgId);
                            formData.append('memberId', Administrators.memberId);
                            formData.append('AdminimageId', Administrators.imageID);
                            formData.append('createdby', document.getElementById("LoginName").innerHTML);
                            formData.append('ActionTyp', 'AdministratorImageInsert');
                            var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                            switch (result.results) {
                                case "1":
                                    noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                                    $("#divAdminDetals").css("display", "");
                                    BindExecutives('Edit');
                                    $('#modelAddAdmin').modal('hide');
                                    //cancelAdminEdit();
                                    break;
                                default:
                                    noty({ text: result.results, type: 'error' });
                                    break;
                            }
                        }
                        else {
                            jsonResult = InsertAdministrator(Administrators);
                            switch (jsonResult.results) {
                                case "1":
                                    noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                                    $("#divAdminDetals").css("display", "");
                                    BindExecutives('Edit');
                                    $('#modelAddAdmin').modal('hide');
                                    //cancelAdminEdit();
                                    break;
                                case "2":
                                    noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                                    break;
                                default:
                                    noty({ text: Messages.InsertionFailure, type: 'error' });
                                    break;
                            }
                        }

                    }
                    else {

                        if (imgresult = $('#fluImage')[0].files.length > 0) {
                            var formData = new FormData();
                            var imagefile;
                            imagefile = $('#fluImage')[0].files[0];
                            // imagefile.name = imgId;
                            formData.append('upImageFile', imagefile, imagefile.name);
                            formData.append('churchID', Administrators.churchId);
                            formData.append('desigId', Administrators.desigId);
                            formData.append('adminId', Administrators.adminId);
                            formData.append('Name', Administrators.Name);
                            formData.append('Phone', Administrators.Phone);
                            formData.append('orgType', Administrators.orgType);
                            formData.append('orgId', Administrators.orgId);
                            formData.append('memberId', Administrators.memberId);
                            formData.append('AdminimageId', Administrators.imageID);
                            formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                            formData.append('ActionTyp', 'AdministratorImageUpdate');
                            var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                            switch (result.results) {
                                case "1":
                                    noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                                    $("#divAdminDetals").css("display", "");
                                    BindExecutives('Edit');
                                    $('#modelAddAdmin').modal('hide');
                                    $("#FamilyAdd").css("margin-top", "3%");
                                    //cancelAdminEdit();
                                    break;
                                default:
                                    noty({ text: Messages.UpdationFailure, type: 'error' });
                                    break;
                            }
                        }
                        else {
                            jsonResult = UpdateAdministrator(Administrators);
                            switch (jsonResult.results) {
                                case "1":
                                    noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                                    $("#divAdminDetals").css("display", "");
                                    BindExecutives('Edit');
                                    $('#modelAddAdmin').modal('hide');
                                    $("#FamilyAdd").css("margin-top", "3%");
                                    //cancelAdminEdit();
                                    break;
                                default:
                                    noty({ text: Messages.UpdationFailure, type: 'error' });
                                    break;
                            }
                        }



                    }
                }
                else {
                    noty({ text: Messages.SelectMember, type: 'error' })
                }
            }
            else {
                noty({ type: 'error', text: Messages.SelectPosition });
            }
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
    });
    $("#chkIsHead").change(function () {
        var ischecked = $(this).is(':checked');
        if (ischecked)
            $("#txtAddress").removeAttr('disabled');
        if (!ischecked)
            $("#txtAddress").attr('disabled', 'disabled');

    });
    $('input[type=text],input[type=password],textarea').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
});
//Common function for clearing input fields
function ClearFields() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file' || this.type == 'hidden' || this.type == 'search') {
            this.value = '';
        }
        else if (this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

}
//Common function for clearing input fields
function ClearField() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file' || this.type == 'search') {
            this.value = '';
        }
        else if (this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

}
//Clear all admin controls
function clearAdminControls() {
    try {
        $("#txtMobile").val("");
        $('#ddlRole').val('-1').change();
        $('#ddlMember').val('-1').change();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
// Show Picture preview for file upload Admin
function showpreviewAdmin(input) {
    try {
        debugger;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#AdminImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
// Show Picture preview for file upload Admin
function showpreviewMember(input) {
    try {
        debugger;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#MemberImg').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//////////---------------------------------------------------Common Function---------------------------/////
function BindIconUnit(e)
{
    $('#' + e.id.split(":")[0]).click();
}
function BindIconFamilyMembers(e) {
    $('#' + e.id.split(":")[0]).click();
}
//bind family units accordion
function BindFamilyUnitsAccordion() {
    try {
        var jsonResult = {};
        var FamilyUnits = new Object();
        jsonResult = GetAllFamilyUnits(FamilyUnits);
        if (jsonResult != undefined) {
            BindGetAllFamilyUnitsTable(jsonResult);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function BindGetAllFamilyUnitsTable(Records) {
    try {
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").empty();
        var length = Records.length;
        $.each(Records, function (index, Records) {
            var FamilyUnits = new Object();
            FamilyUnits.unitId = Records.ID;
            var Family = new Object();
            Family.familyUnitsObj = FamilyUnits;
            jsonResult = GetAllFamilys(Family);
            var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;">' + "<span style='color:#0cdbe1;position: absolute;font-weight: 900;'>" + jsonResult.length + "</span>" + '<div class=""><div class=""><div class="accordion-inner" style="border-top:none;" id="' + Records.ID + '" onclick="BindFamilies(this);"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + '" onclick="BindFamilies(this);"' + Records.UnitName + '</a><i class="fa fa-users" id=faUser aria-hidden="true"></i>' + Records.UnitName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon eye-open pencilEdit" title="View Unit Details" id="' + Records.ID + ":" + Records.UnitName + '"  Unit" onClick=ViewUnitDetails(this);></i><i class="icon-chevron-right ViewUnit" title="View Families" id="' + Records.ID +":Unit"+'" onClick="BindIconUnit(this);"></i></div>'
            $("#FamilyUnitsTableBox").append(html);
        });

        if (length == 0) {
            $('#FamilyUnitsTableBox').css("height", "210px");
            $('#FamilyUnitsTableBox').css("margin-top", "2%");
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#FamilyUnitsTableBox").append(img);

        }
        //$("#unitHeader").text("Family Units");
        //$(".btnNewUnit").css("display", "none");
        //$("#btnFamilyUnitAdd").css("display", "");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//////////----------------------------------------------------End Common Function------------------//////

////---------------------------------------------Unit Section--------------------------------------------------------------/////
//Initialize Unit Screen
function UnitPageLoad() {
    debugger;
    //Disable buttons Unused
    Dynamicbutton("btnBack", "BackCancel", "");
    Dynamicbutton("btnEdit", "EditCancel", "");
    Dynamicbutton("btnMain", "SaveCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnAddNew", "AddCancel", "");
    //Enable Addnew button
    Dynamicbutton("btnAddNew", "Add", "AddFamilyUnit");
    //Hide the Right side
    $('#FamilyAdd').hide();
    //Clear all the fields including Hidden fields
    ClearFields();
    //Header Change
    $("#unitHeader").text("Family Units");
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href=""> Family Units </a></li>');
    //Binding Unit list Accordion
    BindFamilyUnitsAccordion();

}
//clear fields to add family unit
function AddFamilyUnit() {
    try {
        ManageUnitView();
        ClearFields();
        RemoveStyle();

        $("#unitNameDiv").css("margin-top", "5%");
        //$(".DeleteUnit").css("display", "none");
        //$("#familyUnitAddOrEdit").text("Add");
        $('#executivesHeader').hide();
        $('#divAdminDetals').hide();
        $('#divAdminInfo').hide();
        $("#Header").text("Add New Family Unit");
        $("#txtUnitName").val("");
        $("#FamilyAdd").css("margin-top", "1%");
        $("#txtUnitName").show();
        $("#txtUnitName").removeAttr('disabled');
        $("#lblUnitName").hide();
        $("#unitCountDiv").hide();
        $("#UnitmemCount").hide();
        $("#txtUnitName").focus();
        //Disable buttons Unused
        Dynamicbutton("btnBack", "BackCancel", "");
        Dynamicbutton("btnEdit", "EditCancel", "");
        Dynamicbutton("btnDelete", "DeleteCancel", "");
        Dynamicbutton("btnAddNew", "AddCancel", "");
        //Enable Addnew button
        Dynamicbutton("btnAddNew", "Add", "AddFamilyUnit");
        Dynamicbutton("btnMain", "Save", "saveFamilyUnit");
        Dynamicbutton("btnReset", "Reset", "ResetUnit");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Setting units page
function ManageUnitView() {
    try {
        $("#divAdminInfo").hide();
        $("#familyHeadFirst").hide();
        $("#familyMembersPhotoDiv").hide();
        $("#familyHeadLast").hide();
        $("#familyAddDiv").show();
        $("#FamilyAdd").show();
        $("#executivesHeader").show();
        $("#divAdminDetals").show();
        HideTextBoxesForUnit();

    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Hide fields for unit
function HideTextBoxesForUnit() {
    try {
        $("#firstNameDiv").hide();
        $("#lastNameDiv").hide();
        $("#familyNameDiv").hide();
        $("#phoneDiv").hide();
        $("#addressDiv").hide();
        $("#isHeadDiv").hide();
        $("#memberImgDiv").hide();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//unit view Details
function ViewUnitDetails(e) {
    debugger;
    ManageUnitView();
    var jsonResult = {};
    var unitID = e.id.split(":")[0];
    var unitName = e.id.split(":")[1];
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult.length == 0)
    {
        //btnAdminAdd
        $('#btnAdminAdd').attr('onclick','Opentip()');
        $('#btnAdminAdd').removeAttr('data-target');

    }
    else
    {
        $('#btnAdminAdd').attr('onclick', 'OpenAdminModal()');
        $('#btnAdminAdd').attr({ 'data-toggle': 'modal', 'data-target': "#modelAddAdmin" });
        $('#tipDiv').hide();

    }
    document.getElementById('lblUnitName').innerHTML = unitName;
    document.getElementById('lblmemCount').innerHTML = jsonResult.length;
    $("#executivesHeader").text("Unit Exectives Information");
    $("#Header").text(unitName + " unit Details");
    $("#txtUnitName").val(unitName);
    $("#txtUnitName").hide();
    $("#unitCountDiv").show();
    $("#lblmemCount").show();
    $("#lblUnitName").show();
    $("#hdfUnitID").val(unitID);

    Dynamicbutton("btnBack", "BackCancel", "");
    Dynamicbutton("btnMain", "SaveCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");

    Dynamicbutton("btnEdit", "Edit", "EditUnit");
    Dynamicbutton("btnAddNew", "Add", "AddFamilyUnit");
    Dynamicbutton("btnDelete", "Delete", "DeleteUnit");
    BindExecutives('View');
}
function Opentip()
{
    $('#tipDiv').show(500);
}
//unit edit settings
function EditUnit() {
    try {
        debugger;
        $("#txtUnitName").show();
        $("#lblUnitName").hide();
        $("#UnitmemCount").hide();
        $("#unitCountDiv").hide();
        $("#executivesHeader").text("Unit Exectives Information");
        $("#Header").text("Edit " + $("#txtUnitName").val());
        $("#unitNameDiv").css("margin-top", "5%");
        //Disable buttons Unused
        Dynamicbutton("btnBack", "BackCancel", "");
        Dynamicbutton("btnEdit", "EditCancel", "");
        Dynamicbutton("btnAddNew", "AddCancel", "");
        //Enable Addnew button
        Dynamicbutton("btnAddNew", "Add", "AddFamilyUnit");
        Dynamicbutton("btnMain", "Save", "saveFamilyUnit");
        Dynamicbutton("btnReset", "Reset", "ResetUnit");
        Dynamicbutton("btnDelete", "Delete", "DeleteUnit");
        BindExecutives('Edit');
        

    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function ResetUnit()
{
    debugger;
    if($("#hdfUnitID").val()=="")
    {
        ClearFields();
        RemoveStyle();
    }
    else
    {
        $('#txtUnitName').val($('#lblUnitName').text());
    }
}
function DeleteUnit()
{
    try {
        debugger;
        var jsonResult = {};
        var Family = new Object();
        var FamilyUnits = new Object();
        var unitID = $("#hdfUnitID").val();
        FamilyUnits.unitId = unitID;
        Family.familyUnitsObj = FamilyUnits;
        //Family.unitId = unitID;
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteFamilyUnits(Family);
            switch (jsonResult.familyUnitsObj.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    BindFamilyUnitsAccordion();
                    $("#txtUnitName").val("");
                    $("#hdfUnitID").val('');
                    Dynamicbutton("btnDelete", "DeleteCancel", "");
                    Dynamicbutton("btnReset", "ResetCancel", "");
                    Dynamicbutton("btnEdit", "EditCancel", "");
                    Dynamicbutton("btnMain", "SaveCancel", "");
                    $('#FamilyAdd').hide();
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Bind unit executives
function BindExecutives(status) {
    try {
        var jsonResult = {};
        var FamilyUnits = new Object();
        FamilyUnits.unitId = $("#hdfUnitID").val();
        //jsonResult = GetAllFamilyUnitMembers(FamilyUnits);
        jsonResult = GetAdminDetailsWithUnitMemberDetails(FamilyUnits);
        if (jsonResult != undefined) {
            BindAdminViewData(jsonResult, status);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//unit executive details View
function BindAdminViewData(Records, status) {
    try {
        debugger;
        $("#divAdminDetals").show();
        $("#divAdminDetals").empty();
        var length = Records.length;
        $("#hdfExecutivesLength").val(length);
        if (status == "View") {
            $("#divAdminInfo").hide();
            $("#divAdminDetals").show();
            $.each(Records, function (index, Records) {
                if (Records.URL == null) {
                    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="../img/gallery/Noimage.png"/>'
                    + '<address><strong>' + Records.Position + '</strong><p>' + Records.FirstName + '<br/>' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address></div>'
                    + '</li></ul>');
                    //var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
                }
                else {
                    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + Records.URL + '?' + new Date().getTime() + '"/>'
                    + '<address><strong>' + Records.Position + '</strong><p>' + Records.FirstName + '<br/>' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address></div>'
                    + '</li></ul>');
                    //var html = '<li class="span4"> <div class="thumbnail"></div><img src="' + Records.URL + '?' + new Date().getTime() + '" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + (Records.Phone != null && Records.Phone != ""?Records.Phone:"") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
                }
                $("#divAdminDetals").append(html);
                $("#familyAddDiv").css("margin-top", "auto");
            });

            if (length == 0 || $("#divAdminDetals img").length == 0) {
                var html = ('<ul class="thumbnails span4" style="opacity:0.7;"><li class="span12"><div class="thumbnail"><img class="img-rounded" src="../img/gallery/Noimage.png" alt=""/>'
                + '<address><br/><strong><br/><br/>No Records Found</strong></br></address></div>'
                + '</li></ul>');
                $("#divAdminDetals").append(html);
                $("#familyAddDiv").css("margin-top", "auto");
            }
        }
        else if (status == "Edit") {
            $("#EditdivAppend").empty();
            $("#divAdminDetals").hide();
            $("#divAdminInfo").show();
            $.each(Records, function (index, Records) {
                if (Records.URL == null) {
                    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="../img/gallery/Noimage.png"/>'
                    + '<address><strong>' + Records.Position + '</strong><p>' + Records.FirstName + '<br/>' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left:105px;cursor:pointer;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left:109px;cursor:pointer;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div>'
                    + '</li></ul>');
                    //var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
                }
                else {
                    var html = ('<ul class="thumbnails span4"><li class="span12"><div class="thumbnail"><img class="img-rounded" style="height:179px!important;" src="' + Records.URL + '?' + new Date().getTime() + '"/>'
                    + '<address><strong>' + Records.Position + '</strong><p>' + Records.FirstName + '<br/>' + (Records.Phone != null && Records.Phone != "" ? Records.Phone : "") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left:105px;cursor:pointer;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left:109px;cursor:pointer;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div>'
                    + '</li></ul>');
                    //var html = '<li class="span4"> <div class="thumbnail"></div><img src="' + Records.URL + '?' + new Date().getTime() + '" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + (Records.Phone != null && Records.Phone != ""?Records.Phone:"") + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
                }
                $("#EditdivAppend").append(html);
                $("#familyAddDiv").css("margin-top", "auto");
            });
        }

    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function FamilyUnitsValidation() {
    try {
        $('#Displaydiv').remove();
        var unitName = $('#txtUnitName');

        var container = [
            { id: unitName[0].id, name: unitName[0].name, Value: unitName[0].value },
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
                txtB.style.backgroundPosition = "93% center";
                txtB.style.backgroundRepeat = "no-repeat";

            }
        }
        if (j == '1') {
            noty({ text: Messages.Validation, type: 'error' });
            return false;
        }
        if (j == '0') {
            return true;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//function to save or edit family unit
function saveFamilyUnit() {
    try {
        debugger;
        if (FamilyUnitsValidation()) {
            var jsonResult = {};
            var addOrEdit = $("#familyUnitAddOrEdit").text();
            var FamilyUnits = new Object();
            var unitName = (($("#txtUnitName").val() != "" && $("#txtUnitName").val() != null) ? $("#txtUnitName").val() : "");
            var unitID = $("#hdfUnitID").val();
            FamilyUnits.unitId = unitID;
            FamilyUnits.unitName = unitName;
            if ($("#hdfUnitID").val()=="") {
                jsonResult = InsertFamilyUnits(FamilyUnits);
                switch (jsonResult.status) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        BindFamilyUnitsAccordion();
                        //$("#familyUnitAddOrEdit").text("Edit");
                        //$(".DeleteUnit").css("display", "");
                        $("#hdfUnitID").val(jsonResult.unitId);
                        document.getElementById('lblUnitName').innerHTML = jsonResult.unitName;
                        Dynamicbutton("btnReset", "Reset", "ResetUnit");
                        Dynamicbutton("btnDelete", "Delete", "DeleteUnit");
                        break;
                    case "2":
                        noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                        BindFamilyUnitsAccordion();
                        break;
                    default:
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                }
            }
            else {
                jsonResult = UpdateFamilyUnit(FamilyUnits);
                switch (jsonResult.status) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        document.getElementById('lblUnitName').innerHTML = jsonResult.unitName;
                        BindFamilyUnitsAccordion();
                        break;
                    case "2":
                        noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                        BindFamilyUnitsAccordion();
                        break;
                    default:
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                }
            }
        }

    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Open modal for Admin
function OpenAdminModal() {
    try {
        //$("#AddOrEditAdmin").text("Add");
        $('#AdminImg').attr('src', '../img/gallery/Noimage.png');
        document.getElementById("fluImage").value = '';
        clearAdminControls();
        BindMemberSelect();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//member select dropdown change of administrator
function AdminMemberChange() {
    try {

        if ($("#ddlMember").val() != "" && $("#ddlMember").val() != null && $("#ddlMember").val() != "-1") {
            var FamilyUnits = new Object();
            var Family = new Object();
            var Members = new Object();
            var unitID = $("#hdfUnitID").val();
            FamilyUnits.unitId = unitID;
            Family.familyUnitsObj = FamilyUnits;
            Members.familyObj = Family;
            Members.memberId = $("#ddlMember").val();
            var jsonResult = GetAdminMemberDetails(Members);
            if (jsonResult != undefined && jsonResult != null) {
                if (jsonResult[0].Phone != "" && jsonResult[0].Phone != undefined && jsonResult[0].Phone != null) {
                    $("#txtMobile").val(jsonResult[0].Phone);
                }
                else {
                    $("#txtMobile").val(jsonResult[0].Contact);
                }
                if (jsonResult[0].URL != null && jsonResult[0].URL != "") {
                    $('#AdminImg').attr('src', jsonResult[0].URL);
                }
                if (jsonResult[0].ImageID != "" && jsonResult[0].ImageID != null) {
                    adminImage = jsonResult[0].ImageID;
                    $("#hdfAdminDefaultImg").val(adminImage);
                }

            }
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//delete Admin
function DeleteAdministrator(e) {
    try {

        var jsonResult = {};
        var adminID = e.id;
        var Administrators = new Object();
        Administrators.adminId = adminID;
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteAdmin(Administrators);
            switch (jsonResult.results) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    BindExecutives('Edit');
                    break;
                default:
                    noty({ type: 'error', text: Messages.DeletionFailure });
                    break;
            }

        }
        else {
            return false;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//edit Admin
function EditAdministrator(e) {

    try {
        $("#hdfAdminDefaultImg").val('')
        $("#hdfAdminImageID").val('');
        $("#hdfAdminID").val('');
        $('#modelAddAdmin').modal('show');
        $("#AddOrEditAdmin").text("Edit");
        var jsonResult = {};
        var adminID = e.id;
        $("#hdfAdminID").val(adminID);
        var Administrators = new Object();
        Administrators.adminId = adminID;
        Administrators.orgType = "FU";
        jsonResult = SelectAdministrator(Administrators);
        if (jsonResult != undefined) {
            $("#hdfAdminImageID").val(jsonResult.ImageID);
            $("#txtMobile").val(jsonResult[0].Phone);
            $("#hdfPhone").val(jsonResult[0].Phone);
            $('#ddlRole').val(jsonResult[0].DesigID + ":" + jsonResult[0].Order).change();
            if (jsonResult[0].URL != "" && jsonResult[0].URL != undefined) {
                $('#AdminImg').attr('src', jsonResult[0].URL)
            }
            else {
                $('#AdminImg').attr('src', '../img/gallery/Noimage.jpg');
            }
            $('#ddlMember').val(jsonResult[0].MembID).change();
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Administrator image file handler
function handleFileSelect(evt) {
    try {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    $("#AdminImg").attr("src", e.target.result);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//AdminEdit cancel
function cancelAdminEdit() {
    try {
        $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
        $('#iconEdit').attr('title', 'Edit Unit Executives');
        $('#AdminEdit').attr('title', 'Edit Unit Executives');
        BindExecutives('Edit');
        $('#AdminEdit').attr('onclick', 'EditFamily(this);');
        if ($("#divAdminDetals").find('#AdminBtnNew').length == 0) {
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Binds Admin role
function BindSelect() {
    try {
        var selectRow = {};
        selectRow = GetRoles();
        for (var i = 0; i < selectRow.length; i++) {
            $('#ddlRole').append($('<option>',
            {
                value: selectRow[i].ID + ":" + selectRow[i].Order,
                text: selectRow[i].Position
            }));
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Binds Admin member
function BindMemberSelect() {
    try {
        debugger;
        var FamilyUnits = new Object();
        var Family = new Object();
        var Members = new Object();
        var unitID = $("#hdfUnitID").val();
        FamilyUnits.unitId = unitID;
        Family.familyUnitsObj = FamilyUnits;
        Members.familyObj = Family;
        var selectRow = {};
        selectRow = GetAllUnitMembersForAdmin(Members);
        $('#ddlMember').find('option:not(:first)').remove();
        for (var i = 0; i < selectRow.length; i++) {
            $('#ddlMember').append($('<option>',
            {
                value: selectRow[i].ID,
                text: selectRow[i].FirstName + "." + selectRow[i].LastName + " 🏠 " + selectRow[i].FamilyName
            }));
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}


/////------------------------------------------------------------------------End Unit Section--------------------------------------------/////

//////-----------------------------------------------------------------Family Section------------------------------------------//////
function BindFamiliesScreen()
{
    FamilyPageLoad();
    var jsonResult = {};   
    $("#unitHeader").text($("#hdfUnitName").val() + " unit");
    var unitID = $("#hdfUnitID").val();;
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult != undefined) {
        BindFamilyTable(jsonResult);
    }
    $(".faUnits").remove();
    $(".unitName").remove();
    var unitName = $("#hdfUnitName").val();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="#" onclick="UnitPageLoad();" > Family Units </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');

}
//family grid
function BindFamilies(e) {
    try {
        debugger;
        FamilyPageLoad();
        //Families();
        var jsonResult = {};
        $("#hdfUnitName").val(e.textContent);
        $("#hdfUnitID").val(e.id);
        $("#unitHeader").text(e.textContent + " unit");
        var unitID = e.id;
        var FamilyUnits = new Object();
        FamilyUnits.unitId = unitID;
        var Family = new Object();
        Family.familyUnitsObj = FamilyUnits;
        jsonResult = GetAllFamilys(Family);
        if (jsonResult != undefined) {
            BindFamilyTable(jsonResult);
        }
        $(".faUnits").remove();
        $(".unitName").remove();
        var unitName = $("#hdfUnitName").val();
        $("#breadcrumbFamily").append('<li class="faUnits"><a href="#" onclick="UnitPageLoad();" > Family Units </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
       
        
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Initialize Family screen
function FamilyPageLoad()
{
    //Disable buttons Unused
    Dynamicbutton("btnEdit", "EditCancel", "");
    Dynamicbutton("btnMain", "SaveCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnAddNew", "AddCancel", "");
    //Enable Addnew button
    Dynamicbutton("btnAddNew", "Add", "AddFamily");
    Dynamicbutton("btnBack", "Back", "UnitPageLoad");
    //Hide the Right side
    $('#FamilyAdd').hide();
    //Binding Unit list Accordion
    //BindFamilyUnitMemebrs();
}
//bind controls to update family
function UpdateFamily(e) {
    try {
        ManageFamilyView();

        $("#familyAddDiv").css("display", "");
        var unitName = $("#hdfUnitName").val();
        var jsonResult = {};
        $("#txtUnitName").val(unitName);
        var familyID = e.id;
        var unitID = $("#hdfUnitID").val();
        var FamilyUnits = new Object();
        var Family = new Object();
        Family.familyUnitsObj = FamilyUnits;
        FamilyUnits.unitId = unitID;
        Family.familyId = familyID;
        $("#hdfFamilyID").val(familyID);
        jsonResult = SelectFamily(Family);
        if (jsonResult != undefined) {
            $("#txtFirstName").val(jsonResult[0].FirstName);
            $("#txtLastName").val(jsonResult[0].LastName);
            $("#txtFamilyName").val(jsonResult[0].FamilyName);
            $("#txtPhone").val(jsonResult[0].Contact);
            $("#txtAddress").val(jsonResult[0].Address);
            $("#txtFirstName").attr('disabled', 'disabled');
            $("#txtLastName").attr('disabled', 'disabled');
            $("#txtPhone").attr('disabled', 'disabled');
            $("#txtAddress").removeAttr('disabled');
            $("#txtFamilyName").focus();
            $('#Header').text('Edit ' + jsonResult[0].FamilyName+' family');
        }
        Dynamicbutton("btnMain", "Save", "saveFamily");
        Dynamicbutton("btnDelete", "Delete", "DeleteFamilyData");
        Dynamicbutton("btnReset", "Reset", "ResetFamily");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function ResetFamily() {
    if ($("#hdfFamilyID").val() == "") {
        AddFamily();
    }
    else {

         }
}
//family table bind
function BindFamilyTable(Records) {
    try {
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").empty();
        var length = Records.length; 
        if (length == 0) {
            $('#FamilyUnitsTableBox').css("height", "210px");
            $('#FamilyUnitsTableBox').css("margin-top", "2%");
            var img = document.createElement('img');
            img.src = "../img/nodata.jpg";
            img.id = "NoData";
            $("#FamilyUnitsTableBox").append(img);
        }
        else {
            $.each(Records, function (index, Records) {
                var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;" id="' + Records.ID + '"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + " " + Records.FamilyName + '" onClick="BindFamilyMembers(this);"><i class="fa icon-home" id=faUser aria-hidden="true"></i>' + Records.FamilyName + " - (Family Head: " + Records.FirstName + " " + Records.LastName + ")" + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + '" onClick=UpdateFamily(this);></i><i class="icon-chevron-right ViewUnit" title="View Members" id="' + Records.ID + " " + Records.FamilyName +":Family"+ '" onClick="BindIconFamilyMembers(this);"></i></div>'
                $("#FamilyUnitsTableBox").append(html);
            });
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
// display div to add family
function AddFamily() {
    try {
        ClearField();
        RemoveStyle();
        ManageFamilyView();
        $("#hdfFamilyID").val('');
        $("#familyAddDiv").show();
        var unitName = $("#hdfUnitName").val();
        $('#Header').text('Add New family under ' + unitName);
        $("#txtUnitName").val(unitName);
        $("#txtFirstName").removeAttr('disabled');
        $("#txtLastName").removeAttr('disabled');
        $("#txtPhone").removeAttr('disabled');
        $("#txtAddress").removeAttr('disabled');
        $("#txtFirstName").focus();
        $('#FamilyAdd').show();
        Dynamicbutton("btnMain", "Save", "saveFamily");
        Dynamicbutton("btnReset", "Reset", "ResetFamily");
        

    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Setting page for families
function ManageFamilyView() {
    try {
        //clearControls();
        ShowTextBoxesForMember();
        $('#unitCountDiv').hide();
        $('#executivesHeader').hide();
        $('#divAdminDetals').hide();
        $('#divAdminInfo').hide();
        $('#Header').text('Add Family');
        $("#familyHeadFirst").css("display", "");
        $("#familyHeadLast").css("display", "");
        $("#FamilyAdd").css("display", "");
        $("#familyAddDiv").css("display", "none");
        $("#txtFamilyName").removeAttr("disabled");
        $("#isHeadDiv").hide();
        $("#memberImgDiv").hide();
        $('#ErrorBox,#ErrorBox1').hide(1000);
        $('input[type=text],input[type=password]').css({ background: 'white' });
        $('textarea,select').css({ background: 'white' });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//show fields for member
function ShowTextBoxesForMember() {
    try {
        $("#memberImgDiv").show();
        $("#firstNameDiv").show();
        $("#lastNameDiv").show();
        $("#familyNameDiv").show();
        $("#phoneDiv").show();
        $("#addressDiv").show();
        $("#isHeadDiv").show();
        $("#txtUnitName").attr('disabled', 'disabled');
        $("#txtFamilyName").attr('disabled', 'disabled');
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Basic Validation For New Family
function FamilyValidation() {
    try {
        debugger;
        $('#Displaydiv').remove();
        var firstName = $('#txtFirstName');
        var lastName = $('#txtLastName');
        var familyName = $('#txtFamilyName');
        var unitName = $('#txtUnitName');
        var phone = $('#txtPhone');
        var address = $('#txtAddress');

        var container = [
            { id: firstName[0].id, name: firstName[0].name, Value: firstName[0].value },
            { id: lastName[0].id, name: lastName[0].name, Value: lastName[0].value },
            { id: familyName[0].id, name: familyName[0].name, Value: familyName[0].value },
            { id: unitName[0].id, name: unitName[0].name, Value: unitName[0].value },
            { id: phone[0].id, name: phone[0].name, Value: phone[0].value },
            { id: address[0].id, name: address[0].name, Value: address[0].value },
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
                txtB.style.backgroundPosition = "93% center";
                txtB.style.backgroundRepeat = "no-repeat";

            }
        }
        if (j == '1') {
            noty({ text: Messages.Validation, type: 'error' });
            return false;
        }
        if (j == '0') {
            return true;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//family auto bind
function FamilyAutoBind() {
    try {
        var jsonResult = {};
        var unitName = $("#hdfUnitName").val();
        var unitID = $("#hdfUnitID").val();
        var FamilyUnits = new Object();
        FamilyUnits.unitId = unitID;
        var Family = new Object();
        Family.familyUnitsObj = FamilyUnits;
        jsonResult = GetAllFamilys(Family);
        if (jsonResult != undefined) {
            BindFamilyTable(jsonResult);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//function to save or edit family
function saveFamily() {
    try {
        debugger;
        if (FamilyValidation())
        {
            debugger;
            var jsonResult = {};
            var FamilyUnits = new Object();
            var Family = new Object();
            var Members = new Object();

            var firstName = (($("#txtFirstName").val() != "" && $("#txtFirstName").val() != null) ? $("#txtFirstName").val() : "");
            var lastName = (($("#txtLastName").val() != "" && $("#txtLastName").val() != null) ? $("#txtLastName").val() : "");
            var familyName = (($("#txtFamilyName").val() != "" && $("#txtFamilyName").val() != null) ? $("#txtFamilyName").val() : "");
            var unitName = (($("#txtUnitName").val() != "" && $("#txtUnitName").val() != null) ? $("#txtUnitName").val() : "");
            var phone = (($("#txtPhone").val() != "" && $("#txtPhone").val() != null) ? $("#txtPhone").val() : "");
            var address = (($("#txtAddress").val() != "" && $("#txtAddress").val() != null) ? $("#txtAddress").val() : "");
            var unitID = $("#hdfUnitID").val();
            var memberID = $("#hdfMemberID").val();
            var familyID = $("#hdfFamilyID").val();
            var isHead = true;
            Family.familyName = familyName;
            Family.address = address;
            Members.familyID = familyID;
            FamilyUnits.unitId = unitID;
            Members.familyName = familyName;
            Members.firstName = firstName;
            Members.lastName = lastName;
            Members.contact = phone;
            Members.address = address;
            Members.isHead = isHead;
            Members.memberId = memberID;
            Family.familyUnitsObj = FamilyUnits;
            Members.familyObj = Family;
            if (familyID == "") {
                jsonResult = InsertFamily(Members);
                switch (jsonResult.status) {
                    case "1":
                        noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                        FamilyAutoBind();
                        BindMemberSelect();
                        $("#familyAddOrEdit").text("Edit");
                        $(".DeleteFamily").show();
                        $("#hdfFamilyID").val(jsonResult.familyID);
                        $("#txtFirstName").attr('disabled', 'disabled');
                        $("#txtLastName").attr('disabled', 'disabled');
                        $("#txtPhone").attr('disabled', 'disabled');
                        $("#txtAddress").attr('disabled', 'disabled');
                        break;
                    case "2":
                        noty({ text: Messages.AlreadyExistsMsgCaption, type: 'error' });
                        break;
                    default:
                        noty({ text: Messages.InsertionFailure, type: 'error' });
                        break;
                }
            }
            else {
                jsonResult = SaveUpdatedFamily(Members);
                switch (jsonResult.status) {
                    case "1":
                        noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                        FamilyAutoBind();
                        BindMemberSelect();
                        break;
                    default:
                        noty({ text: Messages.UpdationFailure, type: 'error' });
                        break;
                }
            }
        }
        
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function DeleteFamilyData()
{
    try {
        debugger;
        var jsonResult = {};
        var FamilyUnits = new Object();
        var Family = new Object();
        Family.familyUnitsObj = FamilyUnits;
        var unitID = $("#hdfUnitID").val();
        var familyID = $("#hdfFamilyID").val();
        Family.familyId = familyID;
        FamilyUnits.unitId = unitID;
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteFamily(Family);
            debugger;
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    FamilyAutoBind();
                    //clearControls();
                    //$("#txtUnitName").val("");
                    $("#hdfFamilyID").val('');
                    Dynamicbutton("btnDelete", "DeleteCancel", "");
                    Dynamicbutton("btnReset", "ResetCancel", "");
                    Dynamicbutton("btnEdit", "EditCancel", "");
                    Dynamicbutton("btnMain", "SaveCancel", "");
                    $('#FamilyAdd').hide();
                    $("#familyAddDiv").css("display", "none");
                    $("#btnFamilyDiv").css("display", "none");
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }

        }
        else {
            return false;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

////-------------------------------------------------------------------------Member Section-----------------------------------------------///

//Initialize Member screen
function MemberPageLoad()
{
    //Disable buttons Unused
    Dynamicbutton("btnBack", "BackCancel", "");
    Dynamicbutton("btnEdit", "EditCancel", "");
    Dynamicbutton("btnMain", "SaveCancel", "");
    Dynamicbutton("btnReset", "ResetCancel", "");
    Dynamicbutton("btnDelete", "DeleteCancel", "");
    Dynamicbutton("btnAddNew", "AddCancel", "");
    //Enable Addnew button
    Dynamicbutton("btnAddNew", "Add", "AddFamilyUnit");
    //Hide the Right side
    $('#FamilyAdd').hide();
    //Binding Unit list Accordion
    //////BindFamilyUnitsAccordion();
}
//bind members
function BindFamilyMembers(e) {
    try {
        debugger;
        MemberPageLoad();
        var jsonResult = {};
        var familyID = e.id.split(" ")[0];
        $("#hdfFamilyID").val(familyID);
        var familyName = e.id.split(" ")[1];
        $("#hdfFamilyName").val(familyName);

        $("#faMemberHeaderDiv").css("display", "");
        var unitName = $("#hdfUnitName").val();
        $(".faUnits").remove();
        $(".unitName").remove();
        $("#breadcrumbFamily").append('<li class="faUnits"><a href="#" onclick="UnitPageLoad();"> Family Units </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"><a class="NavUnits" onclick=BindFamiliesScreen();> ' + unitName + ' </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + familyName + '</li>');
        var Family = new Object();
        var FamilyUnits = new Object();
        Family.familyUnitsObj = FamilyUnits;
        Family.familyId = familyID;
        jsonResult = GetAllFamilyMembers(Family);
        if (jsonResult != undefined) {
            $("#InstituteShow").css("display", "");
            $("#FamilyAdd").css("display", "none");
            BindGetAllFamilyMemeberData(jsonResult);
        }

        Dynamicbutton("btnAddNew", "Add", "AddFamilyMember");
        Dynamicbutton("btnBack", "Back", "BindFamiliesScreen");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//member grid bind
function BindGetAllFamilyMemeberData(Records) {
    try {
        debugger;
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").html('');

        var length = Records.length;
        
        if (length == 0) {
            UnitPageLoad();
            //$('#FamilyUnitsTableBox').css("height", "210px");
            //$('#FamilyUnitsTableBox').css("margin-top", "2%");
            //var img = document.createElement('img');
            //img.src = "../img/nodata.jpg";
            //img.id = "NoData";
            //$("#FamilyUnitsTableBox").append(img);
        }
        else {
            $.each(Records, function (index, Records) {
                $('#hdfFamilyAddress').val(Records.Address);
                var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;height:30px !important;"id="' + Records.ID + '" ><div class="lead" style="margin-bottom:0px;"><a class="" id="' + Records.ID + ',' + Records.FamilyID + '"</a><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"></i></div>'
                $("#FamilyUnitsTableBox").append(html);
            });
        }
        if ($("#hdfFamilyName").val() != "")
        {
            var familyName = $("#hdfFamilyName").val();
            $("#unitHeader").text(familyName + " Family Members");
        }
        
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
// display div to add member
function AddFamilyMember() {
    try {
        debugger;
        
        $("#hdfMemberID").val('');
        Member();

        var unitName = $("#hdfUnitName").val();
        $("#txtUnitName").val(unitName);
        var familyName = $("#hdfFamilyName").val();
        $('#Header').text('Add New member under ' + familyName);
        $("#txtFamilyName").val(familyName);
        $("#memberAddOrEdit").text("Add");
        $("#AddFamilyHeader").css("display", "none");
        $("#txtFirstName").removeAttr('disabled');
        $("#txtLastName").removeAttr('disabled');
        $("#txtPhone").removeAttr('disabled');
        $("#txtAddress").attr('disabled', 'disabled');
        $('#txtAddress').val($('#hdfFamilyAddress').val());
        $("#FamilyAdd").css("margin-top", "1%");
        $("#MemberImg").attr("src", "../img/gallery/Noimage.png");
        $("#txtFirstName").focus();
        document.getElementById("mfluImage").value = '';
        $("#hdfMemberID").val('');
        Dynamicbutton("btnMain", "Save", "saveMember");
        Dynamicbutton("btnReset", "Reset", "ResetMember");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//edit members settings
function EditMembers(e) {
    try {
        debugger;
        Member();
        var jsonResult = {};
        var memberID = e.id.split(",")[0];
        $("#hdfMemberID").val(memberID);
        var familyID = e.id.split(",")[1];
        var Members = new Object();
        var Family = new Object();
        var FamilyUnits = new Object();
        Family.familyUnitsObj = FamilyUnits;
        Family.familyId = familyID;
        Members.memberId = memberID;
        Members.familyObj = Family;
        jsonResult = GetFamilyMember(Members);
        if (jsonResult != undefined) {
            $('#Header').text('Edit ' + jsonResult[0].FirstName);
            $("#txtFirstName").val(jsonResult[0].FirstName);
            $("#txtLastName").val(jsonResult[0].LastName);
            $("#txtFamilyName").val(jsonResult[0].FamilyName);
            $("#txtUnitName").val(jsonResult[0].UnitName);
            $("#txtPhone").val(jsonResult[0].Contact);
            $("#txtAddress").val(jsonResult[0].Address);
            $("#hdfMemberImgID").val(jsonResult[0].imgID);
            if (jsonResult[0].IsHead == true) {
                $('#chkIsHead').closest('span').addClass('checked');
                document.getElementById("chkIsHead").disabled = true;
                $("#txtAddress").removeAttr('disabled');
                //$("#btnDelete").css("display", "none");
            }
            else {
                $('#chkIsHead').closest('span').removeClass('checked');
                document.getElementById("chkIsHead").disabled = false;
                $("#txtAddress").attr('disabled','disabled');
                //$("#btnDelete").css("display", "");
            }
            if (jsonResult[0].URL != "" && jsonResult[0].URL != undefined) {
                $('#MemberImg').attr('src', jsonResult[0].URL + '?' + new Date().getTime())
            }
            else {
                $('#MemberImg').attr('src', '../img/gallery/Noimage.png');
                document.getElementById("mfluImage").value = '';
            }
            $("#txtFirstName").removeAttr('disabled');
            $("#txtLastName").removeAttr('disabled');
            $("#txtPhone").removeAttr('disabled');
            //$("#txtAddress").removeAttr('disabled');
            $(".unitLink").removeClass
            Dynamicbutton("btnMain", "Save", "saveMember");
            Dynamicbutton("btnDelete", "Delete", "DeleteMemberData");
            Dynamicbutton("btnReset", "Reset", "ResetMember");
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function ResetMember()
{
    if ($("#hdfMemberID").val() == "") {
        AddFamilyMember();
    }
    else
    {

    }
}
//member page settings
function Member() {
    try {
        debugger;
        ClearField();
        $('#chkIsHead').closest('span').removeClass('checked');
        ShowTextBoxesForMember();
        $('#lblUnitName').hide();
        $('#unitCountDiv').hide();
        $('#txtUnitName').show();
        $("#familyHeadFirst").css("display", "none");
        $("#familyHeadLast").css("display", "none");
        $("#FamilyAdd").css("display", "");
        $("#divAdminDetals").css("display", "none");
        $("#familyAddDiv").css("display", "");
        $("#executivesHeader").css("display", "none");
        $("#familyAddDiv").css("margin-top", "-10px");
        $("#divAdminInfo").hide();
        $("#familyAddDiv").css("margin-top", "-10px");
        $('#ErrorBox,#ErrorBox1').hide(1000);
        $('input[type=text],input[type=password]').css({ background: 'white' });
        $('textarea,select').css({ background: 'white' });
        document.getElementById("chkIsHead").disabled = false;
        $("#hdfMemberImgID").val('')
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//show fields for member
function ShowTextBoxesForMember() {
    try {
        $("#memberImgDiv").show();
        $("#firstNameDiv").show();
        $("#lastNameDiv").show();
        $("#familyNameDiv").show();
        $("#phoneDiv").show();
        $("#addressDiv").show();
        $("#isHeadDiv").show();
        $("#txtUnitName").attr('disabled', 'disabled');
        $("#txtFamilyName").attr('disabled', 'disabled');
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//Basic Validation For New Member
function MemberValidation() {
    try {
        //$('#Displaydiv').remove();
        var firstName = $('#txtFirstName');
        var lastName = $('#txtLastName');
        var familyName = $('#txtFamilyName');
        var unitName = $('#txtUnitName');
        //var phone = $('#txtPhone');
        //var address = $('#txtAddress');

        var container = [
            { id: firstName[0].id, name: firstName[0].name, Value: firstName[0].value },
            { id: lastName[0].id, name: lastName[0].name, Value: lastName[0].value },
            { id: familyName[0].id, name: familyName[0].name, Value: familyName[0].value },
            { id: unitName[0].id, name: unitName[0].name, Value: unitName[0].value },
            //{ id: phone[0].id, name: phone[0].name, Value: phone[0].value },
            //{ id: address[0].id, name: address[0].name, Value: address[0].value },
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
                txtB.style.backgroundPosition = "93% center";
                txtB.style.backgroundRepeat = "no-repeat";

            }
        }
        if (j == '1') {
            noty({ text: Messages.Validation, type: 'error' });
            return false;
        }
        if (j == '0') {

            //saveMember();
            return true;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
//bind all family members after adding a member
function FamilyMembersAutoBind() {
    try {

        var jsonResult = {};
        var familyID = $("#hdfFamilyID").val();
        var familyName = $("#hdfFamilyName").val();
        $("#faMemberHeaderDiv").css("display", "");
        var Family = new Object();
        var FamilyUnits = new Object();
        Family.familyUnitsObj = FamilyUnits;
        Family.familyId = familyID;
        jsonResult = GetAllFamilyMembers(Family);
        if (jsonResult != undefined) {
            $("#InstituteShow").css("display", "");
            $(".btnEdit").css("display", "none");
            $(".btnNew").css("display", "");
            $("#btnfamilyAdd").css("display", "none");
            $("#btnFamilyUnitAdd").css("display", "none");
            BindGetAllFamilyMemeberData(jsonResult);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
//function to save or edit member
function saveMember() {
    try {
        debugger;
        if (MemberValidation())
        {
            var i = "0";
            var jsonResult = {};
            var FamilyUnits = new Object();
            var Family = new Object();
            var Members = new Object();
            Members.firstName = (($("#txtFirstName").val() != "" && $("#txtFirstName").val() != null) ? $("#txtFirstName").val() : "");
            Members.lastName = (($("#txtLastName").val() != "" && $("#txtLastName").val() != null) ? $("#txtLastName").val() : "");
            Family.familyName = (($("#txtFamilyName").val() != "" && $("#txtFamilyName").val() != null) ? $("#txtFamilyName").val() : "");
            Members.familyName = (($("#txtFamilyName").val() != "" && $("#txtFamilyName").val() != null) ? $("#txtFamilyName").val() : "");
            Members.contact = (($("#txtPhone").val() != "" && $("#txtPhone").val() != null) ? $("#txtPhone").val() : "");
            Members.address = (($("#txtAddress").val() != "" && $("#txtAddress").val() != null) ? $("#txtAddress").val() : "");
            FamilyUnits.unitId = $("#hdfUnitID").val();
            Members.memberId = $("#hdfMemberID").val();
            Family.familyId = $("#hdfFamilyID").val();
            Members.churchId = churchObject.chid;
            var unitName = (($("#txtUnitName").val() != "" && $("#txtUnitName").val() != null) ? $("#txtUnitName").val() : "");
            var isHead = null;
            if ($('#chkIsHead').closest('span').hasClass('checked') == true) {
                Members.isHead = true;
            }
            else {
                Members.isHead = false;
            }


            Family.familyUnitsObj = FamilyUnits;
            Members.familyObj = Family;

            if ($("#hdfMemberID").val() == "") {
                //if ($("#hdfMemberID").val() == null && $("#hdfMemberID").val() == "") {
                ///////INSERT MEMBER THROUGH HANDLER
                ///////Image insert using handler
                var imgresult = "";
                if ((imgresult = $('#mfluImage')[0].files.length > 0)) {

                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#mfluImage')[0].files[0];
                    // imagefile.name = imgId;
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('churchID', Members.churchId);
                    formData.append('firstName', Members.firstName);
                    formData.append('lastName', Members.lastName);
                    formData.append('familyName', Family.familyName);
                    formData.append('familyName', Members.familyName);
                    formData.append('contact', Members.contact);
                    formData.append('address', Members.address);
                    formData.append('unitId', FamilyUnits.unitId);
                    formData.append('memberId', Members.memberId);
                    formData.append('familyId', Family.familyId);
                    formData.append('isHead', Members.isHead);
                    formData.append('createdby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'MemberImageInsert');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    switch (result.status) {
                        case "1":
                            if (jsonResult.isHead == "True") {
                                noty({ text: Messages.HeadChangeInsert, type: 'success' });
                            }
                            else {
                                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                            }
                                FamilyMembersAutoBind();
                                $("#hdfMemberID").val(jsonResult.memberId);
                                BindMemberSelect();
                            
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.MemeberAlreadyExists });
                            break;
                        default:
                            noty({ type: 'error', text: result.InsertionFailure });
                            break;
                    }
                }
                else {
                    jsonResult = InsertFamily(Members);
                    switch (jsonResult.status) {
                        case "1":
                            if (jsonResult.isHead == "True")
                            {
                                noty({ text: Messages.HeadChangeInsert, type: 'success' });
                            }
                            else
                            {
                                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                            }
                            FamilyMembersAutoBind();
                            $("#hdfMemberID").val(jsonResult.memberId);
                            BindMemberSelect();
                            break;
                        case "2":
                            noty({ text: Messages.MemeberAlreadyExists, type: 'error' });
                            break;
                        default:
                            noty({ text: Messages.InsertionFailure, type: 'error' });
                            break;
                    }

                }

                //}
            }
            else {

                if ((imgresult = $('#mfluImage')[0].files.length > 0)) {

                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#mfluImage')[0].files[0];
                    // imagefile.name = imgId;
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('churchID', Members.churchId);
                    formData.append('firstName', Members.firstName);
                    formData.append('lastName', Members.lastName);
                    formData.append('familyName', Family.familyName);
                    formData.append('familyName', Members.familyName);
                    formData.append('contact', Members.contact);
                    formData.append('address', Members.address);
                    formData.append('unitId', FamilyUnits.unitId);
                    formData.append('memberId', Members.memberId);
                    formData.append('familyId', Family.familyId);
                    formData.append('isHead', Members.isHead);
                    formData.append('memberImageID', $("#hdfMemberImgID").val());
                    formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'MemberImageUpdate');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    switch (result.status) {
                        case "1":
                            if (jsonResult.isHead == "True") {
                                noty({ text: Messages.HeadChange, type: 'success' });
                                FamilyMembersAutoBind();
                                BindMemberSelect();
                            }
                            else {
                                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                                FamilyMembersAutoBind();
                                BindMemberSelect();
                            }
                            
                            break;
                        default:
                            noty({ text: Messages.UpdationFailure, type: 'error' });
                            break;
                    }

                }
                else {
                    jsonResult = UpdateFamilyMember(Members);
                    switch (jsonResult.status) {
                        case "1":
                            if (jsonResult.isHead == "True") {
                                noty({ text: Messages.HeadChange, type: 'success' });
                                FamilyMembersAutoBind();
                                BindMemberSelect();
                            }
                            else {
                                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                                FamilyMembersAutoBind();
                                BindMemberSelect();
                            }
                            break;
                        default:
                            noty({ text: Messages.UpdationFailure, type: 'error' });
                            break;
                    }
                }
            }
        }
        
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}
function DeleteMemberData()
{
    try {
        var jsonResult = {};
        var FamilyUnits = new Object();
        var Family = new Object();
        var Members = new Object();
        var memberID = $("#hdfMemberID").val();
        var familyID = $("#hdfFamilyID").val();
        Family.familyId = familyID;
        Members.memberId = memberID;
        Family.familyUnitsObj = FamilyUnits;
        Members.familyObj = Family;
        var result = CheckIsHead(Members);
        if (result.status == "1")
        {
            noty({ text: Messages.HeadExist , type: 'error' });
            return false;
        }
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteMember(Members);
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    FamilyMembersAutoBind();
                    //clearControls();
                    $("#hdfFamilyID").val('');
                    Dynamicbutton("btnDelete", "DeleteCancel", "");
                    Dynamicbutton("btnReset", "ResetCancel", "");
                    Dynamicbutton("btnEdit", "EditCancel", "");
                    Dynamicbutton("btnMain", "SaveCancel", "");
                    $('#FamilyAdd').hide();
                    //$("#FamilyAdd").css("display", "none");
                    $("#familyAddDiv").css("display", "none");
                    //$("#btnDiv").css("display", "none");
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

////---------------------------------------------------------------------------------End Member Section--------------------------------------------------///

//----------------------------------Web Methods----------------------------//
function CheckIsHead(Members)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/CheckIsHead");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {

    }
}
function DeleteAdmin(Administrators) {
    try {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/DeleteAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetAdminMemberDetails(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAdminMemberDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function UpdateFamilyUnit(FamilyUnits) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/UpdateFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function SelectAdministrator(Administrators) {
    try {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/SelectAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function InsertAdministrator(Administrators) {
    try {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/InsertAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function UpdateAdministrator(Administrators) {
    try {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/UpdateAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetRoles() {
    try {
        var ds = {};
        var table = {};
        var Administrators = new Object();
        Administrators.orgType = "FU";
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetRoles");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function InsertFamily(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/InsertFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function SaveUpdatedFamily(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/UpdateFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteMember(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/DeleteFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function UpdateFamilyMember(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/UpdateFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetFamilyMember(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilyMembers(Family) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAllFamilyMembers");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteFamily(Family) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/DeleteFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//Bind All unit members for admin select
function GetAllUnitMembersForAdmin(Members) {
    try {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAllFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetAdminDetailsWithUnitMemberDetails(FamilyUnits) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAdminListUsingUnitID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilys(Family) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAllFamilys");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function SelectFamily(Family) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/SelectFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilyUnits(FamilyUnits) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/GetAllFamilyUnits");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function InsertFamilyUnits(FamilyUnits) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/InsertFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteFamilyUnits(Family) {
    try {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/FamilyUnit.aspx/DeleteFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}