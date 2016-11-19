$("document").ready(function (e) {

    debugger;
    try
    {
        $(".ddlTownCode").select2({
            placeholder: "Choose Town",
            allowClear: true,
            data: BindTownMasterDropdown()
        });
    }
    catch(e)
    {

    }

    try {
        $(".ddlPriest").select2({
            placeholder: "Choose Priest",
            allowClear: true,
            data: BindPriestMasterDropdown()
        });
    }
    catch (e) {

    }
   

    try
    {
        var Church = new Object();
        var jsonResulsChurch = GetAllChurches(Church);
        if (jsonResulsChurch != null) {
            LoadChurches(jsonResulsChurch);
        }
    }
    catch(e)
    {

    }
    

    $('#btnChurchAdd').click(function (e) {
        debugger;
        try
        {
            var Church = new Object();
            if ($('#txtChurchName').val() != "") {
                Church.churchName = $('#txtChurchName').val();
            }
            else
            {
                return;
            }
            if ($(".ddlTownCode").val() != "")
            {
                Church.townCode = $(".ddlTownCode").val();
            }
            else
            {
                return;
            }
            if ($('#txtAddress').val() != "")
            {
                Church.address = $('#txtAddress').val();
            }
            else
            {
                return;
            }
            if ($('#txtDescription').val() != "")
            {
                Church.description = $('#txtDescription').val();
            }
            else
            {
                return;
            }
            if ($('#txtAbout').val() != "")
            {
                Church.about = $('#txtAbout').val();
            }
            else
            {
                return;
            }
            if ($('#txtPhone1').val() != "")
            {
                Church.phone1 = $('#txtPhone1').val();
            }
            else
            {
                return;
            }
            if ($('#txtPhone2').val() != "") {
                Church.phone2 = $('#txtPhone2').val();
            }
            else {
                return;
            }
            if ($(".ddlPriest").val() != "")
            {
                Church.MainPriestID = $(".ddlPriest").val();
            }
            else
            {
                return;
            }
            if ($('#longitude').val() != "")
            {
                Church.longitude = $('#longitude').val();
            }
            else
            {
                return;
            }
            if ($('#txtLatitude').val() != "")
            {
                Church.latitude = $('#txtLatitude').val();
            }
            else
            {
                return;
            }
            
            var result = InsertChurch(Church);
            switch (result.status)
            {
                case "1":
                    $('.alert-error').hide();
                    $('#rowfluidDivAlert').show();
                    $('.alert-success').show();
                    $('.alert-success strong').text("Inserted successfully");
                   
                    break;
                case "0":
                    $('.alert-success').hide();
                 
                    $('#rowfluidDivAlert').show();
                    $('.alert-error').show();
                    $('.alert-error strong').text("Insertion was not successfull");
                    break;
                default:
                    break;
            }
           

        }
        catch(e)
        {

        }
        
       


    });

    
});//end of document.ready

function InsertChurch(Church)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/InsertChurch");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}


function GetAllChurches(Church) {
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllChurches");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function LoadChurches(Records) {
    try
    {
        $("#churchtable").find(".churchrow").remove();
        $.each(Records, function (index, Record) {
            var html = '<tr class="churchrow"><td>' + Record.Name + '</td><td class="center">' + Record.TownName + '</td><td class="center">' + Record.Address + '</td><td class="center">' + Record.Phone1 + '</td><td class="center"><a class="circlebtn circlebtn-info" href="#"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger" href="#"><i class="halflings-icon white trash"></i></a></td></tr>';
            $("#churchtable").append(html);
        })
    }
    catch(e)
    {

    }

   

}

function BindTownMasterDropdown() {
    try
    {
        var jsonResult = {};
        var TownMaster = new Object();
        jsonResult = GetAllTowns(TownMaster);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {

    }
    
}
function GetAllTowns(TownMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townMasterObj':" + JSON.stringify(TownMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllTowns");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}


function BindPriestMasterDropdown() {
    try
    {
        var jsonResult = {};
       
        var Priest = new Object();
        jsonResult = GetAllPriest(Priest);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch(e)
    {

    }
    
}
function GetAllPriest(Priest) {
    var ds = {};
    var table = {};
    try {
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllPriestsIDAndText");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}