var adminImage = null;
var churchObject = {};
$(document).ready(function () {
    try
    {
        churchObject.chid = $("#hdfchid").val();
        BindFamilyUnitsAccordion();
        BindSelect();
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.     
            document.getElementById('fluImage').addEventListener('change', handleFileSelect, false);
            document.getElementById('mfluImage').addEventListener('change', handleMemberFileSelect, false);
        }
        //---------------------------------* MEMEBER CLICK FUNCTIONS*---------------------------------------//

        //save or edit btn click of members
        $(".Save").click(function (e) {
            try {
                MemberValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }

        })

        //delete btn click of members
        $(".Delete").click(function (e) {
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
                else {
                    return false;
                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //cancel btn click of members
        $(".Cancel").live({
            click: function (e) {
                try {
                    $('#ErrorBox,#ErrorBox1').hide(1000);
                    $('input[type=text],input[type=password]').css({ background: 'white' });
                    $('textarea,select').css({ background: 'white' });
                    $("#FamilyAdd").css("display", "none");
                    $("#familyAddDiv").css("display", "none");
                    $("#btnDiv").css("display", "none");
                    $("#hdfMemberImgID").val('')
                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }
            }
        })

        //---------------------------------* FAMILY CLICK FUNCTIONS*---------------------------------------//

        //save or edit btn click of family
        $(".SaveFamily").click(function (e) {
            try {
                FamilyValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //delete btn click of family
        $(".DeleteFamily").click(function (e) {
            try {
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
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //cancel btn click of family
        $(".CancelFamily").click(function (e) {
            try {
                $('#ErrorBox,#ErrorBox1').hide(1000);
                $('input[type=text],input[type=password]').css({ background: 'white' });
                $('textarea,select').css({ background: 'white' });
                $("#familyAddDiv").css("display", "none");
                $("#btnFamilyDiv").css("display", "none");
                ClearTextboxes();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //---------------------------------* FAMILY UNIT CLICK FUNCTIONS*---------------------------------------//

        //save or edit btn click of family units
        $(".SaveUnit").click(function (e) {
            try {
                FamilyUnitsValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //delete btn click of family units
        $(".DeleteUnit").click(function (e) {
            try {
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
                else {
                    return false;
                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //cancel btn click of family units
        $(".CancelUnit").click(function (e) {
            try {
                $('#ErrorBox,#ErrorBox1').hide(1000);
                $('input[type=text],input[type=password]').css({ background: 'white' });
                $("#familyAddDiv").css("display", "none");
                $("#btnFamilyUnitDiv").css("display", "none");
                $("#txtUnitName").val("");
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });

        //---------------------------------* ADMIN CLICK FUNCTIONS*---------------------------------------//
       
        //save or edit btn click of Administrator
        $(".SaveAdmin").click(function (e) {
            try {
                debugger;
                var i = "0";
                var jsonResult = {};
                var position = $("#ddlRole option:selected").text();
                if (position != "Select Position") {
                    var IdAndOrder = $('#ddlRole').val();
                    var desigID = IdAndOrder.split(":")[0];
                    var order = IdAndOrder.split(":")[1];
                    var orgType = "FU";
                    var unitId = $("#hdfUnitID").val();
                    var mobile = $("#txtMobile").val();
                    var name = $("#ddlMember option:selected").text();
                    if (name != "Select Member")
                    {
                    var memberID = $("#ddlMember").val();
                    var Administrators = new Object();
                    Administrators.orgType = orgType;
                    Administrators.orgId = unitId;
                    Administrators.desigId = desigID;
                    Administrators.memberId = memberID;
                    Administrators.imageID = $("#hdfAdminImageID").val();
                    Administrators.Name = name;
                    Administrators.Phone = mobile;
                    Administrators.churchId = churchObject.chid;
                    Administrators.adminId = $("#hdfAdminID").val();
                    if ($("#AddOrEditAdmin").text() == "Add") {

                        if (imgresult = $('#fluImage')[0].files.length > 0)
                        {
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
                                    BindFamilyUnitMemebrs();
                                    $('#modelAddAdmin').modal('hide');
                                    cancelAdminEdit();
                                    break;
                                default:
                                    noty({ text: result.results, type: 'error' });
                                    break;
                            }
                        }
                        else
                        {
                            jsonResult = InsertAdministrator(Administrators);
                            switch (jsonResult.status) {
                                case "1":
                                    noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                                    $("#divAdminDetals").css("display", "");
                                    BindFamilyUnitMemebrs();
                                    $('#modelAddAdmin').modal('hide');
                                    cancelAdminEdit();
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
                        if (imgresult = $('#fluImage')[0].files.length > 0)
                        {
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
                        else
                        {
                            jsonResult = UpdateAdministrator(Administrators);
                            switch (jsonResult.results) {
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
                        

              
                    }
                }
                else
                {
                        noty({ text: Messages.SelectMember ,type:'error'})
                }
                }
                else
                {
                    noty({ type: 'error', text: Messages.SelectPosition });
                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
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
            $('#AdminEdit').remove();
            $('.pencilEdit').remove();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
});
//end of document.ready


//---------------------------------* MEMEBER FUNCTIONS*---------------------------------------//

//Basic Validation For New Member
function MemberValidation() {
    try
    {
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
          
            saveMember();
            return true;
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

//function to save or edit member
function saveMember() {
    try
    {
        var i = "0";
        var jsonResult = {};
        var FamilyUnits = new Object();
        var Family = new Object();
        var Members = new Object();
        Members.firstName = $("#txtFirstName").val();
        Members.lastName = $("#txtLastName").val();
        Family.familyName = $("#txtFamilyName").val();
        Members.familyName = $("#txtFamilyName").val();
        Members.contact = $("#txtPhone").val();
        Members.address = $("#txtAddress").val();
        FamilyUnits.unitId = $("#hdfUnitID").val();
        Members.memberId = $("#hdfMemberID").val();
        Family.familyId = $("#hdfFamilyID").val();
        Members.churchId = churchObject.chid;
         var unitName = $("#txtUnitName").val();
        var isHead = null;
        if ($('#chkIsHead').closest('span').hasClass('checked') == true) {
            Members.isHead = true;
        }
        else {
            Members.isHead = false;
        }
 
       
        Family.familyUnitsObj = FamilyUnits;
        Members.familyObj = Family;
        if ($("#memberAddOrEdit").text() == "Add") {
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
                    formData.append('createdby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'MemberImageInsert');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    switch (result.status) {
                        case "1":
                            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                            FamilyMembersAutoBind();
                            $(".btnEdit").css("display", "none");
                            $("#memberAddOrEdit").text("Edit");
                            if (jsonResult.isHead == "False") {
                                $("#btnDelete").css("display", "");
                            }
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
                else
                {
                    jsonResult = InsertFamily(Members);
                    switch (jsonResult.status) {
                        case "1":
                            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
                            FamilyMembersAutoBind();
                            $(".btnEdit").css("display", "none");
                            $("#memberAddOrEdit").text("Edit");
                            if (jsonResult.isHead == "False") {
                                $("#btnDelete").css("display", "");
                            }
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
                formData.append('memberImageID', $("#hdfMemberImgID").val());
                formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                formData.append('ActionTyp', 'MemberImageUpdate');
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                switch (result.status) {
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
            else {
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
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function HeadCheked()
{
    if ($('#chkIsHead').closest('span').hasClass('checked') == false) {
        $("#btnDelete").css("display", "none");
    }
    else
    {
        $("#btnDelete").css("display", "");
    }
   
}

//Image file handler of member
function handleMemberFileSelect(evt) {
    try
    {
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
    catch(e)
    {
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

// Show Picture preview for file upload member
function showpreviewMember(input) {
    try {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#mfluImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//member page settings
function Member() {
    try {
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
        document.getElementById("chkIsHead").disabled = false;
        $("#hdfMemberImgID").val('')
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//member grid bind
function BindGetAllFamilyMemeberData(Records) {
    try
    {
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").html('');
        debugger;
        var length = Records.length;
        var value = $('#ContentPlaceHolder2_btnAddNew').val();
        if (value == "") {
            $.each(Records, function (index, Records) {
                var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;height:30px !important;"id="' + Records.ID + '" ><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"</a><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + ',' + Records.FamilyID + '" onclick="EditMembers(this);"></i></div>'
                $("#FamilyUnitsTableBox").append(html);
            })
        }
        else {
            $.each(Records, function (index, Records) {
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
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//edit members settings
function EditMembers(e) {
    try
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
        if (jsonResult != undefined) {
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
                $("#btnDelete").css("display", "none");
            }
            else {
                $('#chkIsHead').closest('span').removeClass('checked');
                document.getElementById("chkIsHead").disabled = false;
                $("#btnDelete").css("display", "");
            }
            if (jsonResult[0].URL != "" && jsonResult[0].URL != undefined) {
                $('#MemberImg').attr('src', jsonResult[0].URL)
            }
            else {
                $('#MemberImg').attr('src', '../img/gallery/Noimage.png');
                document.getElementById("mfluImage").value = '';
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

// display div to add member
function AddFamilyMember() {
    try {
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
        document.getElementById("mfluImage").value = '';
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

//clear all textboxes
function ClearTextboxes() {
    try {
        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#txtFamilyName").val("");
        $("#txtUnitName").val("");
        $("#txtPhone").val("");
        $("#txtAddress").val("");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//bind members on icon click
function BindIconFamilyMembers(e) {
    try {
        var jsonResult = {};
        var familyID = e.id.split(" ")[0];
        $("#hdfFamilyID").val(familyID);
        var familyName = e.id.split(" ")[1];
        $("#hdfFamilyName").val(familyName);
        $("#faMemberHeaderDiv").css("display", "");
        $("#btnDiv").css("display", "none");
        var unitName = $("#hdfUnitName").val();
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//bind members
function BindFamilyMembers(e) {
    try {
        var jsonResult = {};
        var familyID = e.id.split(" ")[0];
        $("#hdfFamilyID").val(familyID);
        var familyName = e.id.split(" ")[1];
        $("#hdfFamilyName").val(familyName);
        $("#faMemberHeaderDiv").css("display", "");
        $("#btnDiv").css("display", "none");
        var unitName = $("#hdfUnitName").val();
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
            $("#ContentPlaceHolder2_btnAddNew").attr('onclick', 'AddFamilyMember()');
            $("#ContentPlaceHolder2_btnAddNew").attr('title', 'Add Family Member');
            BindGetAllFamilyMemeberData(jsonResult);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//---------------------------------* FAMILY FUNCTIONS*---------------------------------------//

//Basic Validation For New Family
function FamilyValidation() {
    try
    {
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
           
            saveFamily();
            return true;
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//function to save or edit family
function saveFamily() {
    try
    {
        var jsonResult = {};
        var FamilyUnits = new Object();
        var Family = new Object();
        var Members = new Object();

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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//change family controls to edit mode
function EditFamily(e) {
    try {
        $("#divAdminInfo").css("display", "none");
        $("#FamilyAdd").css("margin-top", "1%");
        $('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
        $('#iconEdit').attr('title', 'Refresh');
        $('#AdminEdit').attr('title', 'Refresh');
        $('#AdminEdit').attr('onclick', 'cancelAdminEdit();');
        var executiveLength = $("#hdfExecutivesLength").val();
        if (executiveLength == "0") {
            $("#divAdminDetals").css("display", "none");
            $("#AdminBtnNew").css("display", "");
            $("#divAdminInfo").css("margin-top", "7%");
            $("#divAdminInfo").css("display", "");
            $("#familyAddDiv").css("margin-top", "-105px");
        }
        else {
            if ($("#divAdminDetals").find('#AdminBtnNew').length > 0) {

            }
            else {
                AddAdminImageHtml();
            }
        }
        BindMemberSelect();
        $(".deleteAdmin").css("display", "");
        $(".editAdmin").css("display", "");
        clearAdminControls();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//Hide textboxes for family
function HideTextBoxesForFamily() {
    try {
        $("#memberImgDiv").hide();
        $("#firstNameDiv").hide();
        $("#lastNameDiv").hide();
        $("#phoneDiv").hide();
        $("#addressDiv").hide();
        $("#isHeadDiv").hide();
        $("#txtFamilyName").removeAttr("disabled");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//Setting page for families
function Families() {
    try {
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
        $("#ContentPlaceHolder2_btnAddNew").attr('onclick', 'AddFamily()');
        $("#ContentPlaceHolder2_btnAddNew").attr('title', 'Add Family');
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

// display div to add family
function AddFamily() {
    try {
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
        $("#txtFirstName").focus();
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//family table bind
function BindFamilyTable(Records) {
    try {
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").html('');
        var length = Records.length;
        var value = $('#ContentPlaceHolder2_btnAddNew').val();
        if (value == "") {
            $.each(Records, function (index, Records) {
                var html = html = '<div class="accordion" style="border-bottom: 1px solid #e6e2e2;"><div class=""><div class=""><div class="accordion-inner" style="border-top:none;"id="' + Records.ID + '"><div class="lead" style="margin-bottom:0px;"><a class="unitLink" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindFamilyMembers(this);"><i class="fa icon-home" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " - " + Records.FamilyName + '</a></h4></div></div></div></div><div class="Edit"><i class="halflings-icon edit pencilEdit" title="Edit Family" id="' + Records.ID + '" onClick=UpdateFamily(this);></i><i class="icon-chevron-right ViewUnit" title="View Details" Unit" id="' + Records.ID + " " + Records.FamilyName + '" onclick="BindIconFamilyMembers(this);"></i></div>'
                $("#FamilyUnitsTableBox").append(html);
            })
        }
        else {
            $.each(Records, function (index, Records) {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//bind controls to update family
function UpdateFamily(e) {
    try
    {
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
            $("#txtAddress").attr('disabled', 'disabled');
            $("#txtFamilyName").focus();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//family grid
function BindFamilies(e) {
    try
    {
        Families();
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
        var unitName = $("#hdfUnitName").val();
        $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
        $("#FamilyAdd").css("display", "");
        BindFamilyUnitMemebrs();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//bind nav icons of family
function BindIconFamilies(e) {
    try
    {
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
        $(".faUnits").remove();
        var unitName = $("#hdfUnitName").val();
        $("#breadcrumbFamily").append('<li class="faUnits"><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
        $("#FamilyAdd").css("display", "");
        BindFamilyUnitMemebrs();
    }
    catch(e)
    {
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

//---------------------------------* FAMILY UNIT FUNCTIONS*---------------------------------------//

//Basic Validation For New Family Unit
//CreatedBy Anija
function FamilyUnitsValidation() {
    try
    {
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
          
            saveFamilyUnit();
            return true;
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//function to save or edit family unit
function saveFamilyUnit() {
    try
    {
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
                    $("#familyUnitAddOrEdit").text("Edit");
                    $(".DeleteUnit").css("display", "");
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//clear fields to add family unit
function AddFamilyUnit() {
    try {
        Units();
        $("#unitNameDiv").css("margin-top", "5%");
        $(".DeleteUnit").css("display", "none");
        $("#familyUnitAddOrEdit").text("Add");
        $("#txtUnitName").val("");
        $("#FamilyAdd").css("margin-top", "1%");
        $("#txtUnitName").focus();
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
        $("#txtUnitName").removeAttr("disabled");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//Setting units page
function Units() {
    try {
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
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//bind family units accordion
function BindFamilyUnitsAccordion() {
    try
    {
        var jsonResult = {};
        var FamilyUnits = new Object();
        jsonResult = GetAllFamilyUnits(FamilyUnits);
        if (jsonResult != undefined) {
            BindGetAllFamilyUnitsTable(jsonResult);
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//bind nav units for family units
function BindNavUnits() {
    try {
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
        if ($('#iconEdit').hasClass('halflings-icon white refresh') == true) {
            $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
            $('#iconEdit').attr('title', 'Edit Unit Executives');
            $('#AdminEdit').attr('title', 'Edit Unit Executives');
            $('#AdminEdit').attr('onclick', 'EditFamily(this);');
        }
        BindFamilyUnitMemebrs();
        $("#FamilyAdd").css("margin-top", "1%");
        $("#divAdminInfo").css("display", "none");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//unit edit settings
function EditUnit(e) {
    try {
        Units();
        var jsonResult = {};
        var unitID = e.id.split(":")[0];
        var unitName = e.id.split(":")[1];
        $("#txtUnitName").val(unitName);
        $("#hdfUnitID").val(unitID);
        $("#familyUnitAddOrEdit").text("Edit");
        $("#unitNameDiv").css("margin-top", "5%");
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}

//bind family unit table
function BindGetAllFamilyUnitsTable(Records) {
    try
    {
        $('#FamilyUnitsTableBox').css("height", "auto");
        $("#FamilyUnitsTableBox").html('');
        var length = Records.length;
        $.each(Records, function (index, Records) {
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
        $(".btnNewUnit").css("display", "none")
        $("#btnFamilyUnitAdd").css("display", "");
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//---------------------------------* ADMINISTRATOR FUNCTIONS*---------------------------------------//

//Administrator image file handler
function handleFileSelect(evt) {
    try
    {
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//AdminEdit cancel
function cancelAdminEdit()
{
    try
    {
        $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
        $('#iconEdit').attr('title', 'Edit Unit Executives');
        $('#AdminEdit').attr('title', 'Edit Unit Executives');
        BindFamilyUnitMemebrs();
        $('#AdminEdit').attr('onclick', 'EditFamily(this);');
        $("#divAdminInfo").css("display", "none");
        if ($("#divAdminDetals").find('#AdminBtnNew').length == 0) {
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//Clear all admin controls
function clearAdminControls()
{
    try
    {
        $("#txtMobile").val("");
        $('#ddlRole').val('-1').change();
        $('#ddlMember').val('-1').change();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//member select dropdown change of administrator
function AdminMemberChange()
{
    try
    {
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
                }
            }
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//Bind default image to Admin
function AddAdminImageHtml() {
    try
    {
        var html = (' <ul class="thumbnails span4"><li class="span12" style="position: relative;height:150px;">'
                             + ' <a class="btnNew" id="AdminBtnNew" onclick="OpenAdminModal();" style="position:relative!important;z-index:50;padding: 25px 18px 10px 18px !important;top: 40px!important;left: 25%!important;color:black!important;background:white!important;" title="ADD" data-toggle="modal" data-target="#modelAddAdmin"><i style="font-size:48px;">+</i></a>'
                              + '<div class="thumbnail" id=imgThumbnail style="position:relative!important;top: -33px;opacity:0.7;">'
                              + '<img class="img-rounded" style="height:159px" id="imgFamily" src="../img/gallery/Noimage.png"  alt=""/><address style="line-height:5px !important;text-align: center;"><br/>'
                              + '<strong><br/><br/>Add Executive</strong><br/></address></div><br /></li></ul>');
        $("#divAdminDetals").append(html);
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    } 
}

//Open modal for Admin
function OpenAdminModal()
{
    try
    {
        $("#AddOrEditAdmin").text("Add");
        $('#AdminImg').attr('src', '../img/gallery/Noimage.png');
        document.getElementById("fluImage").value = '';
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//Binds Admin role
function BindSelect() {
    try
    {
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//Binds Admin member
function BindMemberSelect()
{
    try
    {
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
            }));
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

// Show Picture preview for file upload Admin
function showpreviewAdmin(input) {
    try
    {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#fluImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }   
}

//Bind unit executives
function BindFamilyUnitMemebrs() {
    try
    {
        var jsonResult = {};
        var FamilyUnits = new Object();
        FamilyUnits.unitId = $("#hdfUnitID").val();
        jsonResult = GetAllFamilyUnitMembers(FamilyUnits);
        if (jsonResult != undefined) {
            $(".btnEdit").css("display", "");
            BindGetAllFamilyUnitMemeberData(jsonResult);
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }  
}

//delete Admin
function DeleteAdministrator(e)
{
    try
    {
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
        else {
            return false;
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//edit Admin
function EditAdministrator(e)
{
    debugger;
    try
    {
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//unit executive details
function BindGetAllFamilyUnitMemeberData(Records)
{
    try
    {
        $("#divAdminDetals").css("display", "");
        $("#divAdminDetals").html('');
        var i = 0;
        var length = Records.length;
        $("#hdfExecutivesLength").val(length);
        $.each(Records, function (index, Records) {
            if (Records.URL == null) {
                var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Phone + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
            }
            else {
                var html = '<li class="span4"> <div class="thumbnail"></div><img src="' + Records.URL + '" id="imgFamily" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Phone + '</p></address><i class="icon-edit editAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Edit Administrator" onclick="EditAdministrator(this)"></i><i class="icon-trash deleteAdmin" id=' + Records.ID + ' style="position: relative;top: -19px;left: 45px;cursor:pointer;display:none;" title="Delete Administrator" onclick="DeleteAdministrator(this);"></i></div></li>'
            }
            $("#divAdminDetals").append(html);
            $("#familyAddDiv").css("margin-top", "auto");
        })

        if (length == 0 || $("#divAdminDetals img").length == 0) {
            var img = document.createElement('img');
            img.src = "../img/gallery/Noimage.png";
            img.className = "imgNoImage";
            $("#divAdminDetals").append(img);
            $("#familyAddDiv").css("margin-top", "25px");
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//clear all controls
function clearControls()
{
    try
    {
        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#txtFamilyName").val("");
        $("#txtUnitName").val("");
        $("#txtPhone").val("");
        $("#txtAddress").val("");
        $('#chkIsHead').closest('span').removeClass('checked');
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

// Create Guid
function createGuid() {
    try
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}


//----------------------------------Web Methods----------------------------//

function DeleteAdmin(Administrators) {
    try
    {
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Families.aspx/DeleteAdministrator");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetAdminMemberDetails(Members)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAdminMemberDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }   
}

function UpdateFamilyUnit(FamilyUnits)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }   
}

function SelectAdministrator(Administrators)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/SelectAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }  
}

function InsertAdministrator(Administrators)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function UpdateAdministrator(Administrators)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateAdministrator");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }  
}

function GetRoles() {
    try
    {
        var ds = {};
        var table = {};
        var Administrators = new Object();
        Administrators.orgType = "FU";
        var data = "{'AdminObj':" + JSON.stringify(Administrators) + "}";
        ds = getJsonData(data, "../AdminPanel/Institutions.aspx/GetRoles");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function InsertFamily(Members) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function SaveUpdatedFamily(Members)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteMember(Members) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function UpdateFamilyMember(Members) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/UpdateFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetFamilyMember(Members) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilyMembers(Family) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMembers");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteFamily(Family)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//Bind All unit members for admin select
function GetAllUnitMembersForAdmin(Members) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'memberObj':" + JSON.stringify(Members) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMember");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilyUnitMembers(FamilyUnits) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnitMembers");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilys(Family) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilys");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function SelectFamily(Family)
{
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyObj':" + JSON.stringify(Family) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/SelectFamily");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function GetAllFamilyUnits(FamilyUnits) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnits");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function InsertFamilyUnits(FamilyUnits) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

function DeleteFamilyUnits(FamilyUnits) {
    try
    {
        var ds = {};
        var table = {};
        var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
        ds = getJsonData(data, "../AdminPanel/Families.aspx/DeleteFamilyUnit");
        table = JSON.parse(ds.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}