
$(document).ready(function () {
    BindFamilyUnitsAccordion();
    BindSelect();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.     
        document.getElementById('fluImage').addEventListener('change', handleFileSelect, false);
        document.getElementById('mfluImage').addEventListener('change', handleMemberFileSelect, false);
    }

    $(".SaveFamily").click(function (e) {
        FamilyValidation();
    });
    $(".Save").click(function(e){
            MemberValidation();
    })
    $(".Cancel").live({
        click:function(e)
        {
            $('#ErrorBox,#ErrorBox1').hide(1000);
            $('input[type=text],input[type=password]').css({ background: 'white' });
            $('textarea,select').css({ background: 'white' });
            $("#FamilyAdd").css("display", "none");
            $("#familyAddDiv").css("display", "none");
            $("#btnDiv").css("display", "none");
          
        }
    })
    $(".Delete").click(function (e) {
        debugger;
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
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteMember(Members);
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    FamilyMembersAutoBind();
                    clearControls();
                    $("#FamilyAdd").css("display", "none");
                    $("#familyAddDiv").css("display", "none");
                    $("#btnDiv").css("display", "none");
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }
          
        }
        else
        {
            return false;
        }
    });

    $(".CancelFamily").click(function (e) {
        $('#ErrorBox,#ErrorBox1').hide(1000);
        $('input[type=text],input[type=password]').css({ background: 'white' });
        $('textarea,select').css({ background: 'white' });
        $("#familyAddDiv").css("display", "none");
        $("#btnFamilyDiv").css("display", "none");
        ClearTextboxes();
    });
    $(".CancelUnit").click(function (e) {
        $('#ErrorBox,#ErrorBox1').hide(1000);
        $('input[type=text],input[type=password]').css({ background: 'white' });
        $("#familyAddDiv").css("display", "none");
        $("#btnFamilyUnitDiv").css("display", "none");
        $("#txtUnitName").val("");
    });
    $(".SaveAdmin").click(function (e) {
        debugger;
        var jsonResult = {};
        var position = $("#ddlRole option:selected").text();
        var IdAndOrder = $('#ddlRole').val();
        var desigID = IdAndOrder.split(":")[0];
        var order = IdAndOrder.split(":")[1];
        var orgType = "FU";
        var unitId = $("#hdfUnitID").val();
        var mobile = $("#txtMobile").val();
        var name = $("#ddlMember option:selected").text();
        var memberID = $("#ddlMember").val();
        var adminID = createGuid();
        var Administrators = new Object();
        Administrators.adminId = adminID;
        Administrators.orgType = orgType;
        Administrators.orgId = unitId;
        Administrators.desigId = desigID;
        Administrators.memberId = memberID;
        Administrators.Name = name;
        Administrators.Phone = mobile;
   
        if ($("#AddOrEditAdmin").text() == "Add") {
            if (adminID != null) {
                ///////Image insert using handler
                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile, logoFile, img;

                if (((imagefile = $('#fluImage')[0].files[0]) != undefined)) {
                    var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#fluImage')[0].files[0]) != undefined) {
                        tempFile.name = adminID;
                        formData.append('NoticeAppImage', tempFile, tempFile.name);
                        formData.append('GUID', adminID);
                        formData.append('createdby', 'sadmin');
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    i = "1";
                }

            }
            if (i == "1") {
                Administrators.imageID = adminID;
            }
            jsonResult = InsertAdministrator(Administrators);
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                    $("#divAdminDetals").css("display", "");
                    BindFamilyUnitMemebrs();
                    $('#modelAddAdmin').modal('hide');
                    cancelAdminEdit();
                    break;
                default:
                    noty({ text: Messages.InsertionFailure, type: 'error' });
                    break;
            }
           
        }
        else
        {
            Administrators.adminId = $("#hdfAdminID").val();
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
            jsonResult = UpdateAdministrator(Administrators);
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                    $("#divAdminDetals").css("display", "");
                    BindFamilyUnitMemebrs();
                    $('#modelAddAdmin').modal('hide');
                    $("#FamilyAdd").css("margin-top", "3%");
                    cancelAdminEdit();
                    break;
                default:
                    noty({ text: Messages.UpdationFailure, type: 'error' });
                    break;
            }
        
        }
    });

    $(".SaveUnit").click(function (e) {
        FamilyUnitsValidation();
       
    });

    $(".DeleteUnit").click(function (e) {
        debugger;
        var jsonResult = {};
        var FamilyUnits = new Object();
        var unitID = $("#hdfUnitID").val();
        FamilyUnits.unitId = unitID;
        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            jsonResult = DeleteFamilyUnits(FamilyUnits);
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    BindFamilyUnitsAccordion();
                    $("#txtUnitName").val("");
                    $("#familyUnitAddOrEdit").text("Add");
                    $(".DeleteUnit").css("display", "none");
                    break;
                default:
                    noty({ text: Messages.DeletionFailure, type: 'error' });
                    break;
            }
         
        }
        else
        {
            return false;
        }
    });
    $(".DeleteFamily").click(function (e)
    {
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
            switch (jsonResult.status) {
                case "1":
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    FamilyAutoBind();
                    clearControls();
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
    });
    //Style setting for client side Validation
    //CreatedBy Anija

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    $('textarea,select').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value != "") {
        debugger;
        $('#AdminEdit').remove();
        $('.pencilEdit').remove();
    }
});
//end of document.ready

//Basic Validation For New Family Unit
//CreatedBy Anija
function FamilyUnitsValidation() {
    debugger;
    $('#Displaydiv').remove();
    var unitName = $('#txtUnitName');
    
    var container = [
        { id: unitName[0].id, name: unitName[0].name, Value: unitName[0].value },
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
        else if (container[i].Value == "-1") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "93% center";
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
        $('#ErrorBox').hide(1000);
        //scriptvalidate();
        saveFamilyUnit();
        return true;
    }
}

//Basic Validation For New Family
function FamilyValidation() {
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
        else if (container[i].Value == "-1") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "93% center";
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
        $('#ErrorBox').hide(1000);
        //scriptvalidate();
        saveFamily();
        return true;
    }
}

//Basic Validation For New Member
function MemberValidation() {
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
        else if (container[i].Value == "-1") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
            txtB.style.backgroundPosition = "93% center";
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
        $('#ErrorBox').hide(1000);
        //scriptvalidate();
        saveMember();
        return true;
    }
}

function saveMember()
{
    var jsonResult = {};
    var FamilyUnits = new Object();
    var Family = new Object();
    var Members = new Object();
    debugger;
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var familyName = $("#txtFamilyName").val();
    var unitName = $("#txtUnitName").val();
    var phone = $("#txtPhone").val();
    var address = $("#txtAddress").val();
    var unitID = $("#hdfUnitID").val();
    var memberID = $("#hdfMemberID").val();
    var familyID = $("#hdfFamilyID").val();
    var isHead = null;
    if ($('#chkIsHead').closest('span').hasClass('checked') == true) {
        isHead = true;
    }
    else {
        isHead = false;
    }
    Family.unitId = "";
    Family.familyName = familyName;
    Family.familyId = familyID;
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
    if ($("#memberAddOrEdit").text() == "Add") {
        if (memberID != null) {
            ///////Image insert using handler
            var imgresult = "";
            var _URL = window.URL || window.webkitURL;
            var formData = new FormData();
            var imagefile, logoFile, img;
            if (memberID == "") {
                memberID = createGuid();
            }
            if (((imagefile = $('#mfluImage')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#mfluImage')[0].files[0]) != undefined) {
                    tempFile.name = memberID;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', memberID);
                    formData.append('createdby', 'sadmin');
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                i = "1";
            }

        }
        if (i == "1") {
            Members.imageId = memberID;
        }
        jsonResult = InsertFamily(Members);
        switch (jsonResult.status) {
            case "1":
                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                FamilyMembersAutoBind();
                $(".btnEdit").css("display", "none");
                ClearTextboxes();
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
    else {
        debugger;
        Members.memberId = $("#hdfMemberID").val();
        var guid = createGuid();
        if (((imagefile = $('#mfluImage')[0].files[0]) != undefined)) {
            var formData = new FormData();
            var tempFile;
            if ((tempFile = $('#mfluImage')[0].files[0]) != undefined) {
                tempFile.name = guid;
                formData.append('NoticeAppImage', tempFile, tempFile.name);
                formData.append('GUID', guid);
                formData.append('createdby', 'sadmin');
            }
            formData.append('ActionTyp', 'NoticeAppImageInsert');
            AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
            Members.imageId = guid;
        }
        jsonResult = UpdateFamilyMember(Members);
        switch (jsonResult.status) {
            case "1":
                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
                FamilyMembersAutoBind();
                BindMemberSelect();
                break;
            default:
                noty({ text: Messages.UpdationFailure, type: 'error' });
                break;
        }
     
    }
}
function saveFamily()
{
    var jsonResult = {};
    var FamilyUnits = new Object();
    var Family = new Object();
    var Members = new Object();
    debugger;
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var familyName = $("#txtFamilyName").val();
    var unitName = $("#txtUnitName").val();
    var phone = $("#txtPhone").val();
    var address = $("#txtAddress").val();
    var unitID = $("#hdfUnitID").val();
    var memberID = $("#hdfMemberID").val();
    var familyID = $("#hdfFamilyID").val();
    var isHead = true;
    Family.familyName = familyName;
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
    if ($("#familyAddOrEdit").text() == "Add") {
        jsonResult = InsertFamily(Members);
        debugger;
        switch (jsonResult.status) {
            case "1":
                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                FamilyAutoBind();
                //ClearTextboxes();
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
function saveFamilyUnit()
{
    debugger;
    var jsonResult = {};
    var addOrEdit = $("#familyUnitAddOrEdit").text();
    var FamilyUnits = new Object();
    var unitName = $("#txtUnitName").val();
    var unitID = $("#hdfUnitID").val();
    FamilyUnits.unitId = unitID;
    FamilyUnits.unitName = unitName;
    if (addOrEdit == "Add") {
        jsonResult = InsertFamilyUnits(FamilyUnits);
        switch (jsonResult.status) {
            case "1":
                noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                BindFamilyUnitsAccordion();
                //ClearTextboxes();
                ChangeUnitSaveToEdit();
                $("#hdfUnitID").val(jsonResult.unitId);
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
                BindFamilyUnitsAccordion();
                break;
            default:
                noty({ text: Messages.UpdationFailure, type: 'error' });
                break;
        }
      
    }
}
function ChangeUnitSaveToEdit()
{
    $("#familyUnitAddOrEdit").text("Edit");
    $(".DeleteUnit").css("display", "");
}

function handleFileSelect(evt) {
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
function handleMemberFileSelect(evt) {
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
                $("#MemberImg").attr("src", e.target.result);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}
function cancelAdminEdit()
{
    $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
    $('#iconEdit').attr('title', 'Edit Unit Executives');
    $('#AdminEdit').attr('title', 'Edit Unit Executives');
    BindFamilyUnitMemebrs();
    $('#AdminEdit').attr('onclick', 'EditFamily(this);');
    $("#divAdminInfo").css("display", "none");
    if ($("#divAdminDetals").find('#AdminBtnNew').length == 0) {
       // $("#divAdminInfo").css("display", "");
    }
    //$("#divAdminDetals").css("display", "none");
}
function clearAdminControls()
{
  
    $("#txtMobile").val("");
    $('#ddlRole').val('-1').change();
    $('#ddlMember').val('-1').change();
}
function EditFamily(e)
{
    debugger;

    $("#divAdminInfo").css("display", "none");
    $("#FamilyAdd").css("margin-top", "1%");
    $('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
    $('#iconEdit').attr('title', 'Refresh');
    $('#AdminEdit').attr('title', 'Refresh');
    $('#AdminEdit').attr('onclick', 'cancelAdminEdit();');
            var executiveLength = $("#hdfExecutivesLength").val();
            if (executiveLength == "0")
            {
                $("#divAdminDetals").css("display", "none");
                $("#AdminBtnNew").css("display", "");
                 $("#divAdminInfo").css("margin-top", "7%");
                 $("#divAdminInfo").css("display", "");
                 $("#familyAddDiv").css("margin-top", "-105px");
            }
            else
            {
                if ($("#divAdminDetals").find('#AdminBtnNew').length > 0)
                {
                   
                }
            else
            {
                 AddAdminImageHtml();
                }
               
            }
            BindMemberSelect();
            $(".deleteAdmin").css("display", "");
            $(".editAdmin").css("display", "");
            clearAdminControls();
           
}
function AdminMemberChange()
{
    debugger;
    //var phone = $("#ddlMember option:selected").attr("name");
    //if ($("#hdfPhone").val() != "" && $("#hdfPhone").val() != null)
    //{
    //    $("#txtMobile").val($("#hdfPhone").val());
    //}
    //else
    //{
    //    $("#txtMobile").val(phone);
    //}
    //$("#hdfPhone").val("")
    if ($("#ddlMember").val() != "" && $("#ddlMember").val() != null && $("#ddlMember").val()!="-1")
    {
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
            if (jsonResult[0].Phone != "" && jsonResult[0].Phone != undefined && jsonResult[0].Phone != null)
            {
                $("#txtMobile").val(jsonResult[0].Phone);
            }
            else
            {
                $("#txtMobile").val(jsonResult[0].Contact);
            }
           
        }
    }
    
}
function AddAdminImageHtml() {
    debugger;
    var html = (' <ul class="thumbnails span4"><li class="span12" style="position: relative;height:150px;">'
                              + ' <a class="btnNew" id="AdminBtnNew" onclick="OpenAdminModal();" style="position:relative!important;z-index:50;padding: 25px 18px 10px 18px !important;top: 40px!important;left: 25%!important;color:black!important;background:white!important;" title="ADD" data-toggle="modal" data-target="#modelAddAdmin"><i style="font-size:48px;">+</i></a>'
                               +'<div class="thumbnail" id=imgThumbnail style="position:relative!important;top: -33px;opacity:0.7;">'
                               + '<img class="img-rounded" style="height:159px" id="imgFamily" src="../img/gallery/Noimage.png"  alt=""/><address style="line-height:5px !important;text-align: center;"><br/>'
                               +'<strong><br/><br/>Add Executive</strong><br/></address></div><br /></li></ul>');
    //return html;
    $("#divAdminDetals").append(html);
}
function OpenAdminModal()
{
    $("#AddOrEditAdmin").text("Add");
    $('#AdminImg').attr('src', '../img/gallery/Noimage.png');

}
function AddFamilyUnit()
{
    debugger;
    Units();
    $("#unitNameDiv").css("margin-top","5%");
    $(".DeleteUnit").css("display", "none");
    $("#familyUnitAddOrEdit").text("Add");
    $("#txtUnitName").val("");
    $("#FamilyAdd").css("margin-top", "1%");
    $("#txtUnitName").focus();
}
function BindSelect() {
    debugger;
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
function BindMemberSelect()
{
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
            text: selectRow[i].FirstName + " " + selectRow[i].LastName + " " + selectRow[i].FamilyName
            //name: selectRow[i].Phone
        }));
    }
}
function HideTextBoxesForUnit()
{
    $("#firstNameDiv").hide();
    $("#lastNameDiv").hide();
    $("#familyNameDiv").hide();
    $("#phoneDiv").hide();
    $("#addressDiv").hide();
    $("#isHeadDiv").hide();
    $("#memberImgDiv").hide();
    $("#txtUnitName").removeAttr("disabled");
}
function HideTextBoxesForFamily()
{
    $("#memberImgDiv").hide();
    $("#firstNameDiv").hide();
    $("#lastNameDiv").hide();
    $("#phoneDiv").hide();
    $("#addressDiv").hide();
    $("#isHeadDiv").hide();
    $("#txtFamilyName").removeAttr("disabled");
}
function ShowTextBoxesForMember()
{
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
// Show Picture preview for file upload Admin
function showpreviewAdmin(input) {
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#fluImage').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function showpreviewMember(input) {
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#mfluImage').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function Member()
{
    clearControls();
    ShowTextBoxesForMember();
    $("#familyHeadFirst").css("display", "none");
    $("#familyHeadLast").css("display", "none");
    $("#FamilyHeader").css("display", ""); //member header
    $("#AddFamilyHeader").css("display", "none"); //family header
    $("#AddFamilyUnitHeader").css("display", "none"); //unit header
    $("#FamilyAdd").css("display", "");
    $("#divAdminDetals").css("display", "none");
    $("#familyAddDiv").css("display", "");
    $("#executivesHeader").css("display", "none");
    $("#familyAddDiv").css("margin-top", "-10px");
    $("#btnDiv").css("display", ""); //member btn div
    $("#btnFamilyDiv").css("display", "none");  //family btn div
    $("#btnFamilyUnitDiv").css("display", "none");  //unit btn div
    $("#btnDelete").css("display", "none");
    $(".btnEdit").css("display", "none");
    $("#divAdminInfo").hide();
    $("#familyAddDiv").css("margin-top", "-10px");
    $('#ErrorBox,#ErrorBox1').hide(1000);
    $('input[type=text],input[type=password]').css({ background: 'white' });
    $('textarea,select').css({ background: 'white' });
}
function Families()
{
    clearControls();
    ShowTextBoxesForMember();
    $("#familyHeadFirst").css("display", "");
    $("#familyHeadLast").css("display", "");
    $("#btnDiv").css("display", "none");
    $("#btnFamilyDiv").css("display", "none");
    $("#btnFamilyUnitDiv").css("display", "none");  //unit btn div
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#FamilyAdd").css("display", "");
    $(".btnEdit").css("display", "");
    $("#familyAddDiv").css("display", "none");
    $("#executivesHeader").css("display", "");
    //$("#btnMemberNew").css("display", "none");
    //$("#btnfamilyAdd").css("display", "");
    $("#ContentPlaceHolder2_btnAddNew").attr('onclick', 'AddFamily()');
    $("#ContentPlaceHolder2_btnAddNew").attr('title','Add Family');
    $("#btnFamilyUnitAdd").css("display", "none");
    $("#AddFamilyHeader").css("display", "");
    $("#FamilyHeader").css("display", "none");
    $("#AddFamilyUnitHeader").css("display", "none"); //unit header
    $("#txtFamilyName").removeAttr("disabled");
    $("#isHeadDiv").hide();
    $("#memberImgDiv").hide();
    $('#ErrorBox,#ErrorBox1').hide(1000);
    $('input[type=text],input[type=password]').css({ background: 'white' });
    $('textarea,select').css({ background: 'white' });
}
function Units()
{
    $("#familyHeadFirst").css("display", "none");
    $("#familyHeadLast").css("display", "none");
    $("#familyAddDiv").css("display", "");
    $("#FamilyAdd").css("display", "");
    $("#executivesHeader").css("display", "none");
    $("#divAdminDetals").css("display", "none");
    $("#familyAddDiv").css("margin-top", "-1px");
    $("#FamilyHeader").css("display", "none"); //member header
    $("#AddFamilyHeader").css("display", "none"); //family header
    $("#AddFamilyUnitHeader").css("display", ""); //unit header
    $("#btnDiv").css("display", "none"); //member btn div
    $("#btnFamilyDiv").css("display", "none");  //family btn div
    $("#btnFamilyUnitDiv").css("display", "");  //family btn div
    $(".DeleteUnit").css("display", "");//unit delete btn
    HideTextBoxesForUnit();
}
//member grid bind
function BindGetAllFamilyMemeberData(Records) {
    $('#FamilyUnitsTableBox').css("height", "auto");
    $("#FamilyUnitsTableBox").html('');
    debugger;
    var length = Records.length;
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value == "") {
        $.each(Records, function (index, Records) {
            // var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title" id="familyLink"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onclick="EditMembers(this);" id="' + Records.ID + ','+Records.FamilyID+'"><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div>'
            var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;height:30px !important;"id="' + Records.ID + '" ><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"</a><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"></i></div>'
            $("#FamilyUnitsTableBox").append(html);
        })
    }
    else
    {
        $.each(Records, function (index, Records) {
            // var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title" id="familyLink"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onclick="EditMembers(this);" id="' + Records.ID + ','+Records.FamilyID+'"><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div>'
            var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;height:30px !important;"id="' + Records.ID + '" ><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"</a><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div></div></div>'
            $("#FamilyUnitsTableBox").append(html);
        })
        $(".unitLink").removeAttr("onclick");
    }

    if (length == 0) {
        $('#FamilyUnitsTableBox').css("height", "210px");
        $('#FamilyUnitsTableBox').css("margin-top", "2%");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#FamilyUnitsTableBox").append(img);

    }
    var familyName = $("#hdfFamilyName").val();
    $("#unitHeader").text(familyName + " Family Members");
    //$("#divAdminDetals").css("display", "none");
}
//edit family members
function EditMembers(e)
{
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
    if(jsonResult!=undefined)
    {
        $("#txtFirstName").val(jsonResult[0].FirstName);
        $("#txtLastName").val(jsonResult[0].LastName);
        $("#txtFamilyName").val(jsonResult[0].FamilyName);
        $("#txtUnitName").val(jsonResult[0].UnitName);
        $("#txtPhone").val(jsonResult[0].Contact);
        $("#txtAddress").val(jsonResult[0].Address);
        if(jsonResult[0].IsHead==true)
        {
            $('#chkIsHead').closest('span').addClass('checked');
            $("#btnDelete").css("display", "none");
        }
        else
        {
            $('#chkIsHead').closest('span').removeClass('checked');
            $("#btnDelete").css("display", "");
        }
        if (jsonResult[0].URL != "" && jsonResult[0].URL != undefined) {
            $('#MemberImg').attr('src', jsonResult[0].URL)
        }
        else {
            $('#MemberImg').attr('src', '../img/gallery/Noimage.png');
        }
        $("#memberAddOrEdit").text("Edit");
        $(".btnEdit").css("display", "none");
        $("#txtFirstName").removeAttr('disabled');
        $("#txtLastName").removeAttr('disabled');
        $("#txtPhone").removeAttr('disabled');
        $("#txtAddress").removeAttr('disabled');
        $(".unitLink").removeClass
    }
}
function BindFamilyUnitsAccordion()
{
    debugger;
    var jsonResult = {};
    var FamilyUnits = new Object();
    jsonResult = GetAllFamilyUnits(FamilyUnits);
    debugger;
    if (jsonResult != undefined) {
        BindGetAllFamilyUnitsTable(jsonResult);
    }
}
function BindFamilyUnitMemebrs()
{
    debugger;
    var jsonResult = {};
    var FamilyUnits = new Object();
    FamilyUnits.unitId = $("#hdfUnitID").val();
    jsonResult = GetAllFamilyUnitMembers(FamilyUnits);
    if (jsonResult != undefined) {
        $(".btnEdit").css("display", "");
        BindGetAllFamilyUnitMemeberData(jsonResult);
    }
}
function DeleteAdministrator(e)
{
    debugger;
    var jsonResult = {};
    var adminID = e.id;
    var Administrators = new Object();
    Administrators.adminId = adminID;
    var deleteConirm = confirm("Want to delete?");
    if (deleteConirm) {
        jsonResult = DeleteAdmin(Administrators);
        switch (jsonResult.status) {
            case "1":
                noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                BindFamilyUnitMemebrs();
                cancelAdminEdit();
                $("#divAdminInfo").css("display", "none");
                break;
            default:
                noty({ type: 'error', text: Messages.DeletionFailure });
                break;
        }
       
    }
    else
    {
        return false;
    }
}
function EditAdministrator(e)
{
    debugger;
    $('#modelAddAdmin').modal('show');
    $("#AddOrEditAdmin").text("Edit");
    var jsonResult = {};
    var adminID = e.id;
    $("#hdfAdminID").val(adminID);
    var Administrators = new Object();
    Administrators.adminId = adminID;
    Administrators.orgType = "FU";
    jsonResult = SelectAdministrator(Administrators);
    if(jsonResult!=undefined)
    {
        $("#txtMobile").val(jsonResult[0].Phone);
        $("#hdfPhone").val(jsonResult[0].Phone);
        $('#ddlRole').val(jsonResult[0].DesigID + ":" + jsonResult[0].Order).change();
        if (jsonResult[0].URL != "" && jsonResult[0].URL!=undefined) {
            $('#AdminImg').attr('src', jsonResult[0].URL)
        }
        else {
            $('#AdminImg').attr('src', '../img/gallery/Noimage.jpg');
        }
        $('#ddlMember').val(jsonResult[0].MembID).change();
    }
}
function BindGetAllFamilyUnitMemeberData(Records)
{
    debugger;
    $("#divAdminDetals").css("display", "");
    $("#divAdminDetals").html('');
    debugger;
    var i = 0;
    var length = Records.length;
    $("#hdfExecutivesLength").val(length);
    $.each(Records, function (index, Records) {
        //i = i + 1;
        //if (i == 4) {
        //    var html = '<ul class="thumbnails"><li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Phone + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 40px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 40px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li></ul>'
        //    i = 0;
        //}
        //else
        //{
            if (Records.URL == null)
            {
                var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Phone + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
            }
            else
            {
                var html = '<li class="span4"> <div class="thumbnail"></div><img src="' + Records.URL + '" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Phone + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
            }
            
       // }
            $("#divAdminDetals").append(html);
            $("#familyAddDiv").css("margin-top", "auto");
    })

    if (length == 0 || $("#divAdminDetals img").length==0) {
        debugger;
        //$("#divAdminInfo").css("display", "");
        //$("#divAdminDetals").css("display","none");
        var img = document.createElement('img');
        img.src = "../img/gallery/Noimage.png";
        img.className = "imgNoImage";
        $("#divAdminDetals").append(img);
       // $("#divAdminInfo").css("display", "");
       // $("#familyAddDiv").css("margin-top", "-50px !important");
        $("#familyAddDiv").css("margin-top", "25px");
       
    }
   
}
function clearControls()
{
    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtFamilyName").val("");
    $("#txtUnitName").val("");
    $("#txtPhone").val("");
    $("#txtAddress").val("");
    $('#chkIsHead').closest('span').removeClass('checked');

}

// display div to add family
function AddFamily()
{
    debugger;
    Families();
    $("#familyAddDiv").css("display", "");
    $("#familyAddOrEdit").text("Add");
    $(".DeleteFamily").hide();
    $("#btnFamilyDiv").css("display", "");
    var unitName = $("#hdfUnitName").val();
    $(".faUnits").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"> ' + unitName + ' </li>');
    $("#txtUnitName").val(unitName);
    $("#txtFirstName").removeAttr('disabled');
    $("#txtLastName").removeAttr('disabled');
    $("#txtPhone").removeAttr('disabled');
    $("#txtAddress").removeAttr('disabled');
    // $("#divAdminInfo").css("margin-top", "7%");
    $("#txtFirstName").focus();
}

// display div to add family member
function AddFamilyMember()
{
    debugger;
    Member();
    var unitName = $("#hdfUnitName").val();
    $("#txtUnitName").val(unitName);
    var familyName = $("#hdfFamilyName").val();
    $("#txtFamilyName").val(familyName);
    $("#memberAddOrEdit").text("Add");
    $("#AddFamilyHeader").css("display", "none");
    $("#txtFirstName").removeAttr('disabled');
    $("#txtLastName").removeAttr('disabled');
    $("#txtPhone").removeAttr('disabled');
    $("#txtAddress").removeAttr('disabled');
    $("#FamilyAdd").css("margin-top", "1%");
    $("#MemberImg").attr("src", "../img/gallery/priest.png");
    $("#txtFirstName").focus();
    } 
function FamilyMembersAutoBind() {
    debugger;
    var jsonResult = {};
    var familyID = $("#hdfFamilyID").val();
    var familyName = $("#hdfFamilyName").val();
    $("#faMemberHeaderDiv").css("display", "");
   // $("#btnDiv").css("display", "none");
    var Family = new Object();
    var FamilyUnits = new Object();
    Family.familyUnitsObj = FamilyUnits;
    Family.familyId = familyID;
    jsonResult = GetAllFamilyMembers(Family);
    if (jsonResult != undefined) {
        $("#InstituteShow").css("display", "");
        $(".btnEdit").css("display", "none");
       // $("#FamilyAdd").css("display", "none");
        $(".btnNew").css("display", "");
        $("#btnfamilyAdd").css("display", "none");
        $("#btnFamilyUnitAdd").css("display", "none");
               BindGetAllFamilyMemeberData(jsonResult);
    }
} //bind all family members after adding a member
//family grid bind
function BindFamilyTable(Records)
{
    $('#FamilyUnitsTableBox').css("height", "auto");
    $("#FamilyUnitsTableBox").html('');
    debugger;
    var length = Records.length;
    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value == "") {
        $.each(Records, function (index, Records) {
            //var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="' + Records.ID + '" onclick="BindFamilyMembers(this);"><i class="fa fa-users" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " " + Records.FamilyName + '</a></h4><i class="halflings-icon edit pencilEdit" id="' + Records.ID + '" onclick="UpdateFamily(this);" title="Edit Family"></i><i class="icon-chevron-right ViewUnit" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindIconFamilyMembers(this);" title="View Details"></i></div></div>'
            var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"id="' + Records.ID + '"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindFamilyMembers(this);"><i class="fa icon-home" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " - " + Records.FamilyName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + '" onClick=UpdateFamily(this);></i><i class="icon-chevron-right ViewUnit" title="View Details" Unit" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindIconFamilyMembers(this);"></i></div>'
            $("#FamilyUnitsTableBox").append(html);
        })
    }
    else
    {
        $.each(Records, function (index, Records) {
            //var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="' + Records.ID + '" onclick="BindFamilyMembers(this);"><i class="fa fa-users" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " " + Records.FamilyName + '</a></h4><i class="halflings-icon edit pencilEdit" id="' + Records.ID + '" onclick="UpdateFamily(this);" title="Edit Family"></i><i class="icon-chevron-right ViewUnit" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindIconFamilyMembers(this);" title="View Details"></i></div></div>'
            var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"id="' + Records.ID + '"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindFamilyMembers(this);"><i class="fa icon-home" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " - " + Records.FamilyName + '</a></h4></div></div></div></div><div class="Edit"><i class="icon-chevron-right ViewUnit" title="View Details" Unit" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindIconFamilyMembers(this);"></i></div>'
            $("#FamilyUnitsTableBox").append(html);
        })
    }
    

    if (length == 0) {
        $('#FamilyUnitsTableBox').css("height", "210px");
        $('#FamilyUnitsTableBox').css("margin-top", "2%");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#FamilyUnitsTableBox").append(img);

    }
    $(".btnEdit").css("display", "");
}
function UpdateFamily(e) {
    Families();
    $("#familyAddDiv").css("display", "");
    $("#familyAddOrEdit").text("Edit");
    $(".DeleteFamily").show();
    $("#btnFamilyDiv").css("display", "");
    $(".faUnits").remove();
    var unitName = $("#hdfUnitName").val();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"> ' + unitName + ' </li>');
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
    debugger;
    jsonResult = SelectFamily(Family);
    if(jsonResult!=undefined)
    {
        $("#txtFirstName").val(jsonResult[0].FirstName);
        $("#txtLastName").val(jsonResult[0].LastName);
        $("#txtFamilyName").val(jsonResult[0].FamilyName);
        $("#txtPhone").val(jsonResult[0].Contact);
        $("#txtAddress").val(jsonResult[0].Address);
        $("#txtFirstName").attr('disabled', 'disabled');
        $("#txtLastName").attr('disabled', 'disabled');
        $("#txtPhone").attr('disabled', 'disabled');
        $("#txtAddress").attr('disabled', 'disabled');

    }
}
function ClearTextboxes()
{
    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtFamilyName").val("");
    $("#txtUnitName").val("");
    $("#txtPhone").val("");
    $("#txtAddress").val("");
}
function BindIconFamilyMembers(e)
{
    debugger;
    var jsonResult = {};
    var familyID = e.id.split(" ")[0];
    $("#hdfFamilyID").val(familyID);
    var familyName = e.id.split(" ")[1];
    //$("#FamilyMembersHeader").text(familyName + " Family Members");
    $("#hdfFamilyName").val(familyName);
    $("#faMemberHeaderDiv").css("display", "");
    $("#btnDiv").css("display", "none");
    var unitName = $("#hdfUnitName").val();
    //$(".FamilyMemberEdit").css("display", "");
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"><a class="NavUnits" onclick=BindNavUnits();> ' + unitName + ' </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + familyName + '</li>');
    var Family = new Object();
    var FamilyUnits = new Object();
    Family.familyUnitsObj = FamilyUnits;
    Family.familyId = familyID;
    jsonResult = GetAllFamilyMembers(Family);
    if (jsonResult != undefined) {
        $("#InstituteShow").css("display", "");
        $(".btnEdit").css("display", "");
        $("#FamilyAdd").css("display", "none");
        $(".btnNew").css("display", "");
        $("#btnfamilyAdd").css("display", "none");
        $("#btnFamilyUnitAdd").css("display", "none");
        BindGetAllFamilyMemeberData(jsonResult);
    }
}
function BindFamilyMembers(e) {
    debugger;
    var jsonResult = {};
    var familyID = e.id.split(" ")[0];
    $("#hdfFamilyID").val(familyID);
    var familyName = e.id.split(" ")[1];
    //$("#FamilyMembersHeader").text(familyName + " Family Members");
    $("#hdfFamilyName").val(familyName);
    $("#faMemberHeaderDiv").css("display", "");
    $("#btnDiv").css("display", "none");
    var unitName = $("#hdfUnitName").val();
    //$(".FamilyMemberEdit").css("display", "");
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"><a class="NavUnits" onclick=BindNavUnits();> ' + unitName + ' </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + familyName + '</li>');
    var Family = new Object();
    var FamilyUnits = new Object();
    Family.familyUnitsObj = FamilyUnits;
    Family.familyId = familyID;
    jsonResult = GetAllFamilyMembers(Family);
    if (jsonResult != undefined) {
        $("#InstituteShow").css("display", "");
        $(".btnEdit").css("display", "");
        $("#FamilyAdd").css("display", "none");
        $(".btnNew").css("display", "");
        //$("#btnfamilyAdd").css("display", "none");
        //$("#btnFamilyUnitAdd").css("display", "none");
        $("#ContentPlaceHolder2_btnAddNew").attr('onclick', 'AddFamilyMember()');
        $("#ContentPlaceHolder2_btnAddNew").attr('title', 'Add Family Member');
        BindGetAllFamilyMemeberData(jsonResult);
    }
}
function BindNavUnits()
{
    Families();
    var jsonResult = {};
    var unitName = $("#hdfUnitName").val();
    $("#unitHeader").text(unitName + " unit");
    var unitID = $("#hdfUnitID").val();
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult != undefined) {
        BindFamilyTable(jsonResult);
    }  
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    if ($('#iconEdit').hasClass('halflings-icon white refresh') == true)
    {
        $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
        $('#iconEdit').attr('title', 'Edit Unit Executives');
        $('#AdminEdit').attr('title', 'Edit Unit Executives');
        $('#AdminEdit').attr('onclick', 'EditFamily(this);');
    }
    BindFamilyUnitMemebrs();
    $("#FamilyAdd").css("margin-top", "1%");
    $("#divAdminInfo").css("display", "none");
} //display familyUnits
function EditUnit(e)
{
    debugger;
    Units();
    var jsonResult = {};
    var unitID = e.id.split(":")[0];
    var unitName = e.id.split(":")[1];
    $("#txtUnitName").val(unitName);
    $("#hdfUnitID").val(unitID);
    $("#familyUnitAddOrEdit").text("Edit");
    $("#unitNameDiv").css("margin-top", "5%");
}
function BindGetAllFamilyUnitsTable(Records) {
    $('#FamilyUnitsTableBox').css("height", "auto");
    $("#FamilyUnitsTableBox").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {      
      
        //var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="' + Records.ID + '" onclick="BindFamilies(this);"><i class="fa  icon-star-empty" id=faUser aria-hidden="true"></i>' + Records.UnitName + '</a></h4><i class="halflings-icon edit pencilEdit" title="Edit Unit" id="' + Records.ID + ":" + Records.UnitName + '"  Unit" onClick=EditUnit(this);></i><i class="icon-chevron-right ViewUnit" title="View Details" Unit" id="'+Records.ID + ":" + Records.UnitName+ '" onclick="BindIconFamilies(this);"></i></div></div>'
        var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"id="' + Records.ID + '" onclick="BindFamilies(this);"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + '" onclick="BindFamilies(this);"' + Records.UnitName + '</a><i class="fa fa-users" id=faUser aria-hidden="true"></i>' + Records.UnitName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Unit" id="' + Records.ID + ":" + Records.UnitName + '"  Unit" onClick=EditUnit(this);></i><i class="icon-chevron-right ViewUnit" title="View Details" Unit" id="' + Records.ID + ":" + Records.UnitName + '" onclick="BindIconFamilies(this);"></i></div>'
        $("#FamilyUnitsTableBox").append(html);
    })

    if (length == 0) {
        $('#FamilyUnitsTableBox').css("height", "210px");
        $('#FamilyUnitsTableBox').css("margin-top", "2%");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#FamilyUnitsTableBox").append(img);
       
    }
    $("#unitHeader").text("Family Units");
    //$(".btnNew").css("display", "none");
    $(".btnNewUnit").css("display","none")
    $("#btnFamilyUnitAdd").css("display", "");
}
//family grid
function BindFamilies(e)
{
    debugger;
    Families();
    var jsonResult = {};
    $("#hdfUnitName").val(e.textContent);
    $("#hdfUnitID").val(e.id);
    $("#unitHeader").text(e.textContent+" unit");
   var unitID = e.id;
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult != undefined) {
        BindFamilyTable(jsonResult);
    }
    //$(".FamilyMemberEdit").css("display", "none");
     $(".faUnits").remove();
    var unitName = $("#hdfUnitName").val();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    $("#FamilyAdd").css("display", "");
    BindFamilyUnitMemebrs();
}
function BindIconFamilies(e)
{
    debugger;
    Families();
    var jsonResult = {};
    $("#hdfUnitName").val(e.id.split(":")[1]);
    $("#hdfUnitID").val(e.id.split(":")[0]);
    $("#unitHeader").text(e.id.split(":")[1] + " unit");
    var unitID = e.id.split(":")[0];
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult != undefined) {
        BindFamilyTable(jsonResult);
    }
    //$(".FamilyMemberEdit").css("display", "none");
    $(".faUnits").remove();
    var unitName = $("#hdfUnitName").val();
    $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    $("#FamilyAdd").css("display", "");
    BindFamilyUnitMemebrs();
}
function FamilyAutoBind()
{
    debugger;
    var jsonResult = {};
    var unitName=$("#hdfUnitName").val();   
    var unitID = $("#hdfUnitID").val();
    var FamilyUnits = new Object();
    FamilyUnits.unitId = unitID;
    var Family = new Object();
    Family.familyUnitsObj = FamilyUnits;
    jsonResult = GetAllFamilys(Family);
    if (jsonResult != undefined) {
        BindFamilyTable(jsonResult);
    }
   
    //BindFamilyUnitMemebrs();
}
// Create Guid
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
//----------------------------------Web Methods----------------------------//

//Delete Administrator
function DeleteAdmin(Administrators) {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Families.aspx/DeleteAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
}
function GetAdminMemberDetails(Members)
{
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAdminMemberDetails");
    table = JSON.parse(ds.d);
    return table;
}
function UpdateFamilyUnit(FamilyUnits)
{
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamilyUnit");
    table = JSON.parse(ds.d);
    return table;
}
function SelectAdministrator(Administrators)
{
    var ds = {};
    var table = {};
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/SelectAdministrator");
    table = JSON.parse(ds.d);
    return table;
}
function InsertAdministrator(Administrators)
{
    var ds = {};
    var table = {};
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertAdministrator");
    table = JSON.parse(ds.d);
    return table;
}
function UpdateAdministrator(Administrators)
{
    var ds = {};
    var table = {};
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateAdministrator");
    table = JSON.parse(ds.d);
    return table;
}
function GetRoles() {
    var ds = {};
    var table = {};
    var Administrators = new Object();
    Administrators.orgType = "FU";
    var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
    ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetRoles");
    table = JSON.parse(ds.d);
    return table;
}
function InsertFamily(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamily");
    table = JSON.parse(ds.d);
    return table;
}
function SaveUpdatedFamily(Members)
{
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamily");
    table = JSON.parse(ds.d);
    return table;
}
function DeleteMember(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamilyMember");
    table = JSON.parse(ds.d);
    return table;
}
function UpdateFamilyMember(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamilyMember");
    table = JSON.parse(ds.d);
    return table;
}
function GetFamilyMember(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetFamilyMember");
    table = JSON.parse(ds.d);
    return table;
}

function GetAllFamilyMembers(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMembers");
    table = JSON.parse(ds.d);
    return table;
}
function DeleteFamily(Family)
{
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamily");
    table = JSON.parse(ds.d);
    return table;
}
//Bind All unit members for admin select
function GetAllUnitMembersForAdmin(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMember");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllFamilyUnitMembers(FamilyUnits) {
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnitMembers");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllFamilys(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilys");
    table = JSON.parse(ds.d);
    return table;
}
function SelectFamily(Family)
{
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/SelectFamily");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllFamilyUnits(FamilyUnits) {
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnits");
    table = JSON.parse(ds.d);
    return table;
}
function InsertFamilyUnits(FamilyUnits) {
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamilyUnit");
    table = JSON.parse(ds.d);
    return table;
}
function DeleteFamilyUnits(FamilyUnits) {
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamilyUnit");
    table = JSON.parse(ds.d);
    return table;
}