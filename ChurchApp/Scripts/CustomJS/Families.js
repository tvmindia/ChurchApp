﻿var unitID = "";
$(document).ready(function () {
    BindFamilyUnitsAccordion();
    BindSelect();

    $(".unitDetails").click(function (e) {
        debugger;
        $("#InstituteShow").css("display", "");
        $("#FamilyAdd").css("display", "none");
        var unitName = $(this).attr('id');
        $("#hdfUnitName").val(unitName);
        $("#unitHeading").text(unitName+" Unit");
        BindFamilyUnitMemebrs();
    });
    $(".SaveFamily").click(function (e) {
        var jsonResult = {};
        var FamilyUnits = new Object();
        var Family = new Object();
        var familyName = $("#txtFamilyName").val();
        var unitID = $("#hdfUnitID").val();
        FamilyUnits.unitId = unitID;
        Family.familyName = familyName;
        Family.familyUnitsObj = FamilyUnits;
        jsonResult = InsertFamily(Family);
        if (jsonResult == "1") {
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text("Saved Successfully");
            FamilyMembersAutoBind();
        }
        else {
            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text("Error..!!!");
        }
    });
    $(".Save").live({
        click:function(e)
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
            if ($("#memberAddOrEdit").text() == "Add")
            {               
                jsonResult = InsertFamily(Members);
                if(jsonResult=="1")
                {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text("Saved Successfully");
                    FamilyMembersAutoBind();
                }
                else
                {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text("Error..!!!");
                }
            }
            else
            {
                jsonResult = UpdateFamilyMember(Members);
                if (jsonResult == "1") {
                    $('#rowfluidDiv').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text("Updated Successfully");
                    $("#familyAddDiv").css("margin-top", "0px");
                    FamilyMembersAutoBind();
                }
                else {
                    $('#rowfluidDiv').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text("Error..!!!");
                }
            }
            

        }
    })
    $(".Cancel").live({
        click:function(e)
        {
            debugger;
            $("#FamilyAdd").css("display", "none");
            $("#familyAddDiv").css("display", "none");
            $("#btnDiv").css("display", "none");
            $('#rowfluidDiv').hide();
          
        }
    })
    $(".Delete").click(function (e) {
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
            if (jsonResult == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Deleted Successfully");
                FamilyMembersAutoBind();
                clearControls();
                $("#FamilyAdd").css("display", "none");
                $("#familyAddDiv").css("display", "none");
                $("#btnDiv").css("display", "none");
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Error..!!!");
            }
        }
        else
        {
            return false;
        }
    });
    $(".familyAdd").live({
        click:function(e)
        {
            $("#hdfUnitID").val(this.id);
            $("#AddHeader").text("Add Family");
            $("#InstituteShow").css("display", "none");
            $("#FamilyAdd").css("display", "");
            $("#btnDelete").hide();
            ShowTextBoxesForFamily();
            $("#divAdminInfo").hide();
            $("#AdminGenInfoDiv").hide();
        }
    })
    $(".FamiliesEdit").live({
        click:function(e)
        {
            debugger;
            var executiveLength = $("#hdfExecutivesLength").val();
            if (executiveLength == "0")
            {
                $("#divAdminDetals").css("display", "none");
            }
        }
    })
    $('.unitViewDetails').click(function (e) {
        e.preventDefault();
        $('#FamilyViewDivBox').hide();
        $('#UnitViewDivBox').show();
    });

    $('.familyViewDetails').click(function (e) {
        e.preventDefault();
        $('#UnitViewDivBox').hide();
        $('#FamilyViewDivBox').show();
    });
    
    $('#unitEdit').click(function (e) {
        alert("unit");
        e.preventDefault();
        $('#UnitViewDivBox').hide();
        $('#UnitEditDivBox').show();
    });
    $('#familyEdit').click(function (e) {
        alert("unit");
        e.preventDefault();
      
    });
});
//end of document.ready
function BindSelect() {
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
function HideTextBoxesForUnit()
{
    $("#firstNameDiv").hide();
    $("#lastNameDiv").hide();
    $("#familyNameDiv").hide();
    $("#phoneDiv").hide();
    $("#addressDiv").hide();
    $("#isHeadDiv").hide();
    $("#txtUnitName").removeAttr("disabled");
}
function HideTextBoxesForFamily()
{
    $("#firstNameDiv").hide();
    $("#lastNameDiv").hide();
    $("#phoneDiv").hide();
    $("#addressDiv").hide();
    $("#isHeadDiv").hide();
    $("#txtFamilyName").removeAttr("disabled");
}
function ShowTextBoxesForMember()
{
    $("#firstNameDiv").show();
    $("#lastNameDiv").show();
    $("#familyNameDiv").show();
    $("#phoneDiv").show();
    $("#addressDiv").show();
    $("#isHeadDiv").show();
    $("#txtUnitName").attr('disabled', 'disabled');
    $("#txtFamilyName").attr('disabled', 'disabled');
}
function Memebers()
{
    clearControls();
    ShowTextBoxesForMember();
    $("#FamilyHeader").css("display", ""); //member header
    $("#AddFamilyHeader").css("display", ""); //family header
    $("#FamilyAdd").css("display", "");
    $("#divAdminDetals").css("display", "none");
    $("#familyAddDiv").css("display", "");
    $("#executivesHeader").css("display", "none");
    $("#familyAddDiv").css("margin-top", "-10px");
    $("#btnDiv").css("display", ""); //member btn div
    $("#btnFamilyDiv").css("display", "none");  //family btn div
    $("#btnDelete").css("display", "none");
    $(".FamiliesEdit").css("display", "none");
    $("#divAdminInfo").hide();
    $("#familyAddDiv").css("margin-top", "-10px");
}
function Families()
{
    HideTextBoxesForFamily();
    $("#btnDiv").css("display", "none");
    $("#btnFamilyDiv").css("display", "none");
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#executivesHeader").css("display", "none");
    $("#FamilyAdd").css("display", "");
    $(".FamiliesEdit").css("display", "");
    $("#familyAddDiv").css("display", "none");
    $("#btnDiv").css("display", "none");
    $("#executivesHeader").css("display", "");
    $(".btnNew").css("display", "none");
    $("#btnfamilyAdd").css("display", "");
    $("#AddFamilyHeader").css("display", "");
    $("#FamilyHeader").css("display", "none");
    $("#familyAddDiv").css("display", "none");
}
//member grid bind
function BindGetAllFamilyMemeberData(Records) {
    $('.panel-group').css("height", "auto");
    $(".panel-group").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title" id="familyLink"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onclick="EditMembers(this);" id="' + Records.ID + ','+Records.FamilyID+'"><i class="fa fa-user" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + '</a></h4></div></div>'
        $(".panel-group").append(html);
    })

    if (length == 0) {
        $('.panel-group').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $(".panel-group").append(img);

    }
    var familyName = $("#hdfFamilyName").val();
    $("#unitHeader").text(familyName + " Family Members");
}
//edit family members
function EditMembers(e)
{
    debugger;
    Memebers();
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
        
        $("#memberAddOrEdit").text("Edit");
        $(".FamiliesEdit").css("display", "none");
      
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
    FamilyUnits.unitName = $("#hdfUnitName").val();
    jsonResult = GetAllFamilyUnitMembers(FamilyUnits);
    if (jsonResult != undefined) {
        $(".FamiliesEdit").css("display", "");
        BindGetAllFamilyUnitMemeberData(jsonResult);
    }
}
function BindGetAllFamilyUnitMemeberData(Records)
{
    $("#divAdminDetals").css("display", "");
    $("#divAdminDetals").html('');
    debugger;
    var i = 0;
    var length = Records.length;
    $("#hdfExecutivesLength").val(length);
    $.each(Records, function (index, Records) {
        i = i + 1;
        if (i == 4) {
            var html = '<ul class="thumbnails"><li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Contact + '</p></address></div></li></ul>'
            i = 0;
        }
        else
        {
            var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" alt=""><address> <strong>' + Records.FirstName + '</strong><p>' + Records.Position + '<br />' + Records.Contact + '</p></address></div></li>'
        }
        $("#divAdminDetals").append(html);
    })

    if (length == 0) {
        debugger;
        //$("#divAdminInfo").css("display", "");
        //$("#divAdminDetals").css("display","none");
        //var img = document.createElement('img');
        //img.src = "../img/nodata.jpg";
        //img.id = "NoData";
        //$("#divAdminDetals").append(img);
        $("#divAdminInfo").css("display", "");
        $("#familyAddDiv").css("margin-top", "-50px !important");
       
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
    $('#rowfluidDiv').hide();

}

// display div to add family
function AddFamily()
{
    Families();
    $("#familyAddDiv").css("display", "");
    $("#familyAddOrEdit").text("Add");
    $(".DeleteFamily").hide();
    $("#btnFamilyDiv").css("display", "");
    var unitName = $("#hdfUnitName").val();
    $(".faUnits").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><i class="fa  icon-star-empty"></i><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"> ' + unitName + ' </li>');
    $("#txtUnitName").val(unitName);
}

// display div to add family member
function AddFamilyMember()
{
    debugger;
    Memebers();
    var unitName = $("#hdfUnitName").val();
    $("#txtUnitName").val(unitName);
    var familyName = $("#hdfFamilyName").val();
    $("#txtFamilyName").val(familyName);
    $("#memberAddOrEdit").text("Add");
    $("#AddFamilyHeader").css("display", "none");
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
        $(".FamiliesEdit").css("display", "none");
       // $("#FamilyAdd").css("display", "none");
        $(".btnNew").css("display", "");
        $("#btnfamilyAdd").css("display", "none");
               BindGetAllFamilyMemeberData(jsonResult);
    }
} //bind all family members after adding a member
//family grid bind
function BindFamilyTable(Records)
{
    $('.panel-group').css("height", "auto");
    $(".panel-group").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="' + Records.ID + '" onclick="BindFamilyMembers(this);"><i class="fa fa-users" id=faUser aria-hidden="true"></i>' + Records.FirstName + " " + Records.LastName + " " + Records.FamilyName + '</a></h4></div></div>'
        $(".panel-group").append(html);
    })

    if (length == 0) {
        $('.panel-group').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $(".panel-group").append(img);

    }
    $(".FamiliesEdit").css("display", "");
}
function BindFamilyMembers(e)
{
    debugger;
    var jsonResult = {};
    var familyID = e.id;
    $("#hdfFamilyID").val(familyID);
    var familyName = e.textContent.split(" ")[2];
    //$("#FamilyMembersHeader").text(familyName + " Family Members");
    $("#hdfFamilyName").val(familyName);
    $("#faMemberHeaderDiv").css("display", "");
    $("#btnDiv").css("display", "none");
    var unitName = $("#hdfUnitName").val();
    //$(".FamilyMemberEdit").css("display", "");
    $(".faUnits").remove();
    $(".unitName").remove();
    $("#breadcrumbFamily").append('<li class="faUnits"><i class="fa  icon-star-empty"></i><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="faUnits"><i class="fa  fa-users"></i><a class="NavUnits" onclick=BindNavUnits();> ' + unitName + ' </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + familyName + '</li>');
    var Family = new Object();
    var FamilyUnits = new Object();
    Family.familyUnitsObj = FamilyUnits;
    Family.familyId = familyID;
    jsonResult = GetAllFamilyMembers(Family);
    if (jsonResult != undefined) {
        $("#InstituteShow").css("display", "");
        $(".FamiliesEdit").css("display", "");
        $("#FamilyAdd").css("display", "none");
        $(".btnNew").css("display", "");
        $("#btnfamilyAdd").css("display", "none");
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
    $("#breadcrumbFamily").append('<li class="faUnits"><i class="fa  icon-star-empty"></i><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    BindFamilyUnitMemebrs();
} //display familyUnits
function BindGetAllFamilyUnitsTable(Records) {
    $('.panel-group').css("height", "auto");
    $(".panel-group").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {      
      //  var html = '<div class="panel panel-default"><div class="panel-heading" role="tab"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + Records.UnitName + '<i class="more-less icon-chevron-down" aria-hidden="true"></i></a></h4></div><div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body animated zoomOut">' + familyName + '</div></div></div>'
        var html = '<div class="panel panel-default" style="opacity:1 !important;max-height:15000px !important;"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a class="unitLink" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="' + Records.ID + '" onclick="BindFamilies(this);"><i class="fa  icon-star-empty" id=faUser aria-hidden="true"></i>' + Records.UnitName + '</a></h4></div></div>'
        $(".panel-group").append(html);
    })

    if (length == 0) {
        $('.panel-group').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $(".panel-group").append(img);
       
    }
    $("#unitHeader").text("Family Units");
    $(".btnNew").css("display", "none");
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
    $("#breadcrumbFamily").append('<li class="faUnits"><i class="fa  icon-star-empty"></i><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    $("#FamilyAdd").css("display", "");
    BindFamilyUnitMemebrs();
}

//----------------------------------Web Methods----------------------------//

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
function InsertFamily(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamily");
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