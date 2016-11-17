var unitID = "";
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
    $(".Save").live({
        click:function(e)
        {
            var jsonResult = {};
            var FamilyUnits = new Object();
            var Family = new Object();
            var Members = new Object();
            debugger;
            //if ($("#AddHeader").text() == "Add Family")
            //{

                var firstName = $("#txtFirstName").val();
                var lastName = $("#txtLastName").val();
                var familyName = $("#txtFamilyName").val();
                var unitName = $("#txtUnitName").val();
                var phone = $("#txtPhone").val();
                var address = $("#txtAddress").val();
                var unitID = $("#hdfUnitID").val();
                var isHead = null;
                if (document.getElementById("chkIsHead").checked == true)
                {
                    isHead = true;
                }
                else
                {
                    isHead = false;
                }
                Family.unitId = "";
                Family.familyName = familyName;
                FamilyUnits.unitId = unitID;
                Members.familyName = familyName;
                Members.firstName = firstName;
                Members.lastName = lastName;
                Members.contact = phone;
                Members.address = address;
                Members.isHead = isHead;
                Family.familyUnitsObj = FamilyUnits;
                Members.familyObj = Family;
                jsonResult = InsertFamily(Members);
                if(jsonResult=="1")
                {
                    alert("Success");
                    FamilyMembersAutoBind();
                }
                else
                {
                    alert("Failure");
                }
            //}
            //else
            //{
            //    var unitName = $("#txtUnitName").val();
            //    if (unitName != null && unitName != "")
            //    {
            //        FamilyUnits.unitName = unitName;
            //        jsonResult = InsertFamilyUnits(FamilyUnits);
            //        if (jsonResult == "1") {
            //            alert("Success");
            //            BindFamilyUnitsAccordion();
            //        }
            //        else {
            //            alert("Error");
            //        }
            //    }
            //    else
            //    {
            //        alert("Unit name cann't be empty");
            //    }
               
            //}
            

        }
    })
    $(".Cancel").live({
        click:function(e)
        {
            debugger;
            $("#FamilyAdd").css("display", "none");
            $("#familyAddDiv").css("display", "none");
            $("#btnDiv").css("display", "none");
          
        }
    })
 
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
            //$("#familyAddDiv").css("opacity", "1");
            //$("#familyAddDiv").hide();
        }
    })
    $(".FamiliesEdit").live({
        click:function(e)
        {
            var executiveLength = $("#hdfExecutivesLength").val();
            if (executiveLength == "0")
            {
                $("#divAdminInfo").css("display", "");
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
function InsertFamily(Members)
{
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamily");
    table = JSON.parse(ds.d);
    return table;
}
function HideTextBoxesForUnit()
{
    $("#firstNameDiv").hide();
    $("#lastNameDiv").hide();
    $("#familyNameDiv").hide();
    $("#phoneDiv").hide();
    $("#addressDiv").hide();
}
function ShowTextBoxesForFamily()
{
    $("#firstNameDiv").show();
    $("#lastNameDiv").show();
    $("#familyNameDiv").show();
    $("#phoneDiv").show();
    $("#addressDiv").show();
}
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
function EditMembers(e)
{
    debugger;
    var jsonResult = {};
    var memberID = e.id.split(",")[0];
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
            document.getElementById('chkIsHead').checked =true;
        }
        
        $("#executivesHeader").css("display", "none");
        $("#FamilyAdd").css("display", "");
        $("#familyAddDiv").css("display", "");
        $("#btnDiv").css("display", "");
        $("#divAdminDetals").css("display", "none");
    }
}
function GetFamilyMember(Members) {
    var ds = {};
    var table = {};
    var data = "{'memberObj':" + JSON.stringify(Members) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetFamilyMember");
    table = JSON.parse(ds.d);
    return table;
} //Returns selected member for edit/delete
function GetAllFamilyMembers(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMembers");
    table = JSON.parse(ds.d);
    return table;
} //Returns all members
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
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#divAdminDetals").append(img);
    }
}
function AddFamilyMember()
{
    debugger;
    $("#FamilyAdd").css("display", "");
    $("#divAdminDetals").css("display", "none");
    $("#familyAddDiv").css("display", "");
    $("#executivesHeader").css("display", "none");
    $("#familyAddDiv").css("margin-top", "-10px");
    $("#btnDiv").css("display", "");
    $("#btnDelete").css("display", "none");
    $(".FamiliesEdit").css("display", "none");
    var unitName = $("#hdfUnitName").val();
    $("#txtUnitName").val(unitName);
    var familyName = $("#hdfFamilyName").val();
    $("#txtFamilyName").val(familyName);
} // display div to add family member
function FamilyMembersAutoBind() {
    debugger;
    var jsonResult = {};
    var familyID = $("#hdfFamilyID").val();
    var familyName = $("#hdfFamilyName").val();
    $("#faMemberHeaderDiv").css("display", "");
    $("#btnDiv").css("display", "none");
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
        BindGetAllFamilyMemeberData(jsonResult);
    }
} //bind all family members after adding a member
function GetAllFamilyUnitMembers(FamilyUnits)
{
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnitMembers");
    table = JSON.parse(ds.d);
    return table;
} //call for webmethod
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
    //$(".panel-body").remove();
    //var length = Records.length;
    //$.each(Records, function (index, Records) {
    //    var html = '<div class="panel-body animated zoomOut"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + Records.FamilyName + '</a></div>'
    //    $("#" + unitID).append(html);
    //});
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
        BindGetAllFamilyMemeberData(jsonResult);
    }
}
function BindNavUnits()
{
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
    $(".faUnits").remove();
    $(".unitName").remove();
    $(".btnNew").hide();
    $("#executivesHeader").css("display", "none");
    $("#breadcrumbFamily").append('<li class="faUnits"><i class="fa  icon-star-empty"></i><a href="../AdminPanel/Families.aspx"> Families </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="unitName"> ' + unitName + '</li>');
    $("#FamilyAdd").css("display", "");
    BindFamilyUnitMemebrs();
    $(".FamiliesEdit").css("display", "");
    $("#familyAddDiv").css("display", "none");
    $("#btnDiv").css("display", "none");
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
function BindFamilies(e)
{
    debugger;
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
    $(".FamiliesEdit").css("display", "");
    $("#familyAddDiv").css("display", "none");
    $("#btnDiv").css("display", "none");
}
function InsertFamilyUnits(FamilyUnits)
{
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/InsertFamilyUnit");
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
function GetAllFamilys(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilys");
    table = JSON.parse(ds.d);
    return table;
}