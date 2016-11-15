var unitID = "";
$(document).ready(function () {
    BindFamilyUnitsAccordion();

    /*******************************
 * ACCORDION WITH TOGGLE ICONS
 *******************************/
    function toggleIcon(e) {
        debugger;
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('icon-chevron-up icon-chevron-down');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
  
    $(".icon-chevron-up").live({

        click: function (e) {
            debugger;
          
           // $('.panel-body.animated').slideUp();
            $("#a" + unitID).removeClass("icon-chevron-up");
            $("#a" + unitID).addClass("icon-chevron-down");
            if ($('.more-less').hasClass('icon-chevron-up')) {
                $(".more-less").removeClass("icon-chevron-up");
                $(".more-less").addClass("icon-chevron-down");
            }
            $('.panel-body.animated').slideUp(1000);
          
        }
    });
    $(".unitDetails").click(function (e) {
        debugger;
        $("#InstituteShow").css("display", "");
        var unitName = $(this).attr('id');
        $("#hdfUnitName").val(unitName);
        $("#unitHeading").text(unitName);
        BindFamilyUnitMemebrs();
    });
    $(".family").live({
        click:function(e)
        {
            debugger;
            var jsonResult = {};
            var familyID = this.id;
            var Family = new Object();
            var FamilyUnits = new Object();
            Family.familyUnitsObj = FamilyUnits;
            Family.familyId = familyID;
            jsonResult = GetAllFamilyMembers(Family);
            if(jsonResult!=undefined)
            {
                $("#InstituteShow").css("display", "");
                $(".FamiliesEdit").css("display", "");
                BindGetAllFamilyMemeberData(jsonResult);
            }

        }
    })
    $(".FamiliesEdit").live({
        click:function(e)
        {
            
        }
    })
    $(".icon-chevron-down").live({

        click: function (e) {
            debugger;
           //$("#InstituteShow").css("display","none");
            var jsonResult = {};
            unitID = this.id;
            unitID = unitID.replace("a", "");
            var FamilyUnits = new Object();
            FamilyUnits.unitId = unitID;
            // FamilyUnits.unitId = unitID;
            var Family = new Object();
            Family.familyUnitsObj = FamilyUnits;
            //Family.unitId = unitID;
            jsonResult = GetAllFamilys(Family);
            if (jsonResult != undefined)
            {
                $('.panel-body.animated').slideDown(1000);
                BindFamilyTable(jsonResult);
            }
            $("#a" + unitID).removeClass("icon-chevron-down");
            $("#a" + unitID).addClass("icon-chevron-up");
           
        }
    });

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

function BindGetAllFamilyMemeberData(Records) {
    $("#divAdminDetals").css("display", "");
    $("#divAdminDetals").html('');
    debugger;
    var i = 0;
    var length = Records.length;
    $.each(Records, function (index, Records) {
        i = i + 1;
        if (i == 4) {
            var html = '<ul class="thumbnails"><li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" alt=""><address> <strong>' + Records.FirstName + " " + Records.LastName + '</strong><p>' + Records.Position + '<br />' + Records.Contact + '</p></address></div></li></ul>'
            i = 0;
        }
        else {
            var html = '<li class="span4"> <div class="thumbnail"></div><img src="../img/gallery/priest.png" alt=""><address> <strong>' + Records.FirstName + " " +  Records.LastName + '</strong><p>' + Records.Contact + '</p></address></div></li>'
        }
        $("#divAdminDetals").append(html);
    })

    if (length == 0) {
        debugger;
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#divAdminDetals").append(img);
    }
}

function GetAllFamilyMembers(Family) {
    var ds = {};
    var table = {};
    var data = "{'familyObj':" + JSON.stringify(Family) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyMembers");
    table = JSON.parse(ds.d);
    return table;
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
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#divAdminDetals").append(img);
    }
}
function AddFamilyUnit()
{
    debugger;
    $("#InstituteShow").css("display", "none");
    $("#FamilyAddDiv").css("display", "");
    $("#unitHeading").text("Add Details");
}
function GetAllFamilyUnitMembers(FamilyUnits)
{
    var ds = {};
    var table = {};
    var data = "{'familyUnitsObj':" + JSON.stringify(FamilyUnits) + "}";
    ds = getJsonData(data, "../AdminPanel/Families.aspx/GetAllFamilyUnitMembers");
    table = JSON.parse(ds.d);
    return table;
}
function BindFamilyTable(Records)
{
    $(".panel-body").remove();
    var length = Records.length;
    $.each(Records, function (index, Records) {
        var html = '<div class="panel-body animated zoomOut"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + Records.FamilyName + '<i class="family icon-list-alt" aria-hidden="true" title="Family Details"  id="' + Records.ID + '"></i><i class="more-less icon-chevron-down" style="visibility:hidden;" aria-hidden="true"></i></a></div>'
        $("#" + unitID).append(html);
    });
}
function BindGetAllFamilyUnitsTable(Records) {
    $('.panel-group').css("height", "auto");
    $(".panel-group").html('');
    debugger;
    var length = Records.length;
    $.each(Records, function (index, Records) {      
      //  var html = '<div class="panel panel-default"><div class="panel-heading" role="tab"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + Records.UnitName + '<i class="more-less icon-chevron-down" aria-hidden="true"></i></a></h4></div><div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body animated zoomOut">' + familyName + '</div></div></div>'
        var html = '<div class="panel panel-default"><div class="panel-heading" id="' + Records.ID + '" role="tab"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' + Records.UnitName + '<i class="unitDetails icon-list-alt" aria-hidden="true" title="Unit Details" id="' + Records.UnitName + '"></i><i class="more-less icon-chevron-down" id="a' + Records.ID + '" aria-hidden="true"></i></a></h4></div></div>'
        $(".panel-group").append(html);
    })

    if (length == 0) {
        $('.panel-group').css("height", "210px");
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $(".panel-group").append(img);
       
    }
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