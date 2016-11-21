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
   
    BindAllChurches();
   
    

    $('#btnChurchAdd').click(function (e) {
        debugger;
        try
        {
            var Church = new Object();
            if ($('#txtChurchName').val() != "") {
                Church.churchName = $('#txtChurchName').val();
            }
          
            if ($(".ddlTownCode").val() != "")
            {
                Church.townCode = $(".ddlTownCode").val();
            }
          
            if ($('#txtAddress').val() != "")
            {
                Church.address = $('#txtAddress').val();
            }
          
            if ($('#txtDescription').val() != "")
            {
                Church.description = $('#txtDescription').val();
            }
           
            if ($('#txtAbout').val() != "")
            {
                Church.about = $('#txtAbout').val();
            }
            
            if ($('#txtPhone1').val() != "")
            {
                Church.phone1 = $('#txtPhone1').val();
            }
            
            if ($('#txtPhone2').val() != "") {
                Church.phone2 = $('#txtPhone2').val();
            }
           
            if ($(".ddlPriest").val() != "")
            {
                Church.MainPriestID = $(".ddlPriest").val();
            }
           
            if ($('#txtLongitude').val() != "")
            {
                Church.longitude = $('#txtLongitude').val();
            }
            
            if ($('#txtLatitude').val() != "")
            {
                Church.latitude = $('#txtLatitude').val();
            }
           
            var churchimag;
            if ((churchimag = $('#churchimageuploader')[0].files.length > 0)) {
                var formData = new FormData();

                formData.append('ChurchImage', $('#churchimageuploader')[0].files[0], $('#churchimageuploader')[0].files[0].name);
                formData.append('ChurchImageID', createGuid());
                formData.append('ActionTyp', 'ChurchInsert');
                formData.append('churchName', Church.churchName);
                formData.append('townCode', Church.townCode);
                formData.append('description', Church.description);
                formData.append('about', Church.about);
                formData.append('address', Church.address);
                formData.append('latitude', Church.latitude);
                formData.append('longitude', Church.longitude);
                formData.append('phone1', Church.phone1);
                formData.append('phone2', Church.phone2);
                formData.append('MainPriestID', Church.MainPriestID);
                formData.append('createdBy', Church.createdBy);
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Inserted successfully");
                        BindAllChurches();
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
            else
            {
                Church.mainImageId = 'A23F9091-D102-4DF9-B9CA-ED4418CB2FC6';//no image default id
                var result = InsertChurch(Church);
                switch (result.status) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Inserted successfully");
                        BindAllChurches();
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
           

        }
        catch(e)
        {

        }
        
       


    });

    
});//end of document.ready

function BindAllChurches()
{
    try {
        var Church = new Object();
        var jsonResulsChurch = GetAllChurches(Church);
        if (jsonResulsChurch != null) {
            LoadChurches(jsonResulsChurch);
        }
    }
    catch (e) {

    }
}

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


function ChurchImagePreview(input) {
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ChurchPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}