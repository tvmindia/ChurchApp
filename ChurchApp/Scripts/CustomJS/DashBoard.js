$("document").ready(function (e) {
    debugger;
    try
    {
        //box content collapse
        var $targetchurchbox = $('.churchBox');
        $targetchurchbox.slideToggle();
        var $targetRolesBox = $('.RolesBox');
        $targetRolesBox.slideToggle();
        var $targetUserBox = $('.UserBox');
        $targetUserBox.slideToggle();
    }
    catch(e)
    {

    }
   
   

    var mapOptions = {
        center: new google.maps.LatLng(9.9816, 76.2998),//latlong
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    google.maps.event.addListener(map, 'click', function (e) {
        alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
        $("#txtLongitude").val(e.latLng.lng());
        $("#txtLatitude").val(e.latLng.lat());

    });

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


    try
    {
        $(".ddlChurch").select2({
            placeholder: "Choose Church",
            allowClear: true,
            data: BindChurchDropdown()
        });
    }
    catch(e)
    {

    }

    try{ 
        var $churchSelect = $(".ddlChurchuser").select2({
            placeholder: "Choose Church",
            allowClear: true,
            data: BindChurchDropdown()
        });
        $churchSelect.on("change", function (e)
        {
            debugger;
            var $selectRoles = $(".ddlRoles").select2();
            //$selectRoles.val(null).trigger("change");
            // $selectRoles.select2('val', '');
            $selectRoles.select2().empty();
            var chid = $(this).val();
              $(".ddlRoles").select2({
                placeholder: "Choose Role",
                allowClear: true,
                data: BindRolesDropdown(chid)
            });
                 
        });
        } catch (e) { }

    try {
        $(".ddlRoleName").select2({
            placeholder: "Choose Role",
            allowClear: true
       
        });
    }
    catch (e) {

    }
   
   
    try
    {
        BindAllChurches();
        $('#churchtable').DataTable(
       {
       order : [[ 0, 'asc' ], [ 1, 'asc' ]],
       searching: false,
       paging: true
        });
    }
    catch(e)
    {

    }
   

    try
    {
        BindAllRoles();
        $('#Rolestable').DataTable(
        {
            order: [[0, 'asc'], [1, 'asc']],
            searching: false,
            paging: true
        });
    }
    catch(e)
    {

    }

    try {
        BindAllUsers();
        $('#Userstable').DataTable(
        {
            order: [[0, 'asc'], [1, 'asc']],
            searching: false,
            paging: true
        });
    }
    catch (e) {

    }

    
   

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
           
           
            if ($('#txtLongitude').val() != "")
            {
                Church.longitude = $('#txtLongitude').val();
            }
            
            if ($('#txtLatitude').val() != "")
            {
                Church.latitude = $('#txtLatitude').val();
            }
            if ($("#hdfChurchID").val() != "")
            {
                //UPDATE CHURCH
                var churchimag;
                if ((churchimag = $('#churchimageuploader')[0].files.length > 0)) {
                    var formData = new FormData();

                    formData.append('ChurchImage', $('#churchimageuploader')[0].files[0], $('#churchimageuploader')[0].files[0].name);
                    formData.append('churchid', $("#hdfChurchID").val());
                    formData.append('ChurchImageID', createGuid());
                    formData.append('ActionTyp', 'ChurchUpdate');
                    formData.append('churchName', Church.churchName);
                    formData.append('townCode', Church.townCode);
                    formData.append('description', Church.description);
                    formData.append('about', Church.about);
                    formData.append('address', Church.address);
                    formData.append('latitude', Church.latitude);
                    formData.append('longitude', Church.longitude);
                    formData.append('phone1', Church.phone1);
                    formData.append('phone2', Church.phone2);
                  
                    formData.append('updatedBy', Church.updatedBy);
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    switch (result) {
                        case "1":
                            $('.alert-error').hide();
                            $('#rowfluidDivAlert').show();
                            $('.alert-success').show();
                            $('.alert-success strong').text("Updated successfully");
                            BindAllChurches();
                            break;
                        case "0":
                            $('.alert-success').hide();
                            $('#rowfluidDivAlert').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text("Updation was not successfull");
                            break;
                        default:
                            break;
                    }
                }
                else {
                    Church.mainImageId = '00000000-0000-0000-0000-000000000000';//no image default id
                    Church.churchId=$("#hdfChurchID").val();
                    var result = UpdateChurch(Church);
                    switch (result.status) {
                        case "1":
                            $('.alert-error').hide();
                            $('#rowfluidDivAlert').show();
                            $('.alert-success').show();
                            $('.alert-success strong').text("Updated successfully");
                            BindAllChurches();
                            break;
                        case "0":
                            $('.alert-success').hide();
                            $('#rowfluidDivAlert').show();
                            $('.alert-error').show();
                            $('.alert-error strong').text("Updation was not successfull");
                            break;
                        default:
                            break;
                    }
                }


            }
            else
            {

                //INSERT CHURCH
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
                else {
                    Church.mainImageId = '00000000-0000-0000-0000-000000000000';//no image default id
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
           
           

        }
        catch(e)
        {

        }
        
       


    });


    
    $('.ChurchClear').click(function (e) {



        $('#rowfluidDivAlert').hide();
        $('.alert').hide();
        $("#txtChurchName").val('');
        $(".ddlTownCode").select2("val", "");
        $("#txtAddress").val('');
        $("#txtDescription").val('');
        $("#txtAbout").val('');
        $("#txtPhone1").val('');
        $("#txtPhone2").val('');
     
        $("#txtLongitude").val('');
        $("#txtLatitude").val('');
        $("#hdfChurchID").val('');
        $("#ChurchPreview").attr('src', '/img/defaultalbumadd.jpg');

    });


    

    $('.RolesClear').click(function (e) {
        $('#rowfluidDivAlert').hide();
        $('.alert').hide();
        $(".ddlRoleName").select2("val", "");
        $(".ddlChurch").select2("val", "");
    });


    $('#btnUserAdd').click(function (e) {
        $('#rowfluidDivAlert').hide();
        $('.alert').hide();

        try
        {
            Users = new Object();
            Church = new Object();
            Roles = new Object();
            if($('.ddlChurchuser').val()!="")
            {
                Church.churchId = $('.ddlChurchuser').val();
            }

            if ($("#txtUserName").val() != "") {
                Users.Name = $("#txtUserName").val();
            }
            if($("#txtUserAddress").val()!="")
            {
                Users.Address = $("#txtUserAddress").val();
            }

            if ($("#txtMobile").val() != "") {
                Users.Mobile = $("#txtMobile").val();
            }
            if($("#txtEmail").val()!="")
            {
                Users.Email = $("#txtEmail").val();
            }
            //if(gender option button)
            //{

            //}
            if($('.ddlRoles').val()!="")
            {
                Roles.ID = $('.ddlRoles').val();
            }
            if($("#chkActive").val()!="")
            {
                Users.Active = $("#chkActive").val();
            }
            if ($("#chkAdministrator").val() != "") {
                Users.Active = $("#chkAdministrator").val();
            }
            if($("#datepickerdob").val()!="")
            {
                Users.DOB = $("#datepickerdob").val();
            }

            if($("#txtLoginName").val()!="")
            {
                Users.LoginName = $("#txtLoginName").val();
            }

            if($("#txtLoginName").val()!="")
            {
                Users.Password = $("#txtLoginName").val();
            }

            Users.churchObj = Church;
            Users.rolesObj = Roles;

            if($("#hdfUserID").val()=="")
            {
                //INSERT
              
                var result = InsertUser(Users);
                switch (result.status) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Inserted successfully");
                        BindAllRoles();
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
                //UPDATE
                Users.ID = $("#hdfUserID").val();
                var result = UpdateUser(Users);
                switch (result.status) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Updated successfully");
                        BindAllRoles();
                        break;
                    case "0":
                        $('.alert-success').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-error').show();
                        $('.alert-error strong').text("Updation was not successfull");
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


    $('#btnRolesAdd').click(function (e) {
        try
        {
            debugger;
           
            var Roles = new Object();
            var Church = new Object();
            if ($(".ddlRoleName").val() != "") {
                Roles.RoleName = $(".ddlRoleName").val();
            }

            if ($(".ddlChurch").val() != "") {
                Church.churchId = $(".ddlChurch").val();
            }
            if ($("#hdfRolesID").val() == '')
            {
                //INSERT
                Roles.churchObj = Church;
                var result = InsertRoles(Roles);
                switch (result.status) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Inserted successfully");
                        BindAllRoles();
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
                //UPDATE
                Roles.ID = $("#hdfRolesID").val();
                Roles.churchObj = Church;
                var result = UpdateRoles(Roles);
                switch (result.status) {
                    case "1":
                        $('.alert-error').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Updated successfully");
                        BindAllRoles();
                        break;
                    case "0":
                        $('.alert-success').hide();
                        $('#rowfluidDivAlert').show();
                        $('.alert-error').show();
                        $('.alert-error strong').text("Updation was not successfull");
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

function UpdateChurch(Church)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateChurch");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function UpdateRoles(Roles)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateRoles");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function EditChurch(curobj)
{
    debugger;
    $('#rowfluidDivAlert').hide();
    $('.alert').hide();
    var Church = new Object();
    var editedrow = $(curobj).closest('tr');
    Church.churchId = $(curobj).attr('churchid');
    $("#hdfChurchID").val(Church.churchId);
    var churchDetail = GetChurchDetailsByChurchID(Church);

  

    $("#txtChurchName").val(churchDetail[0].ChurchName);
    $(".ddlTownCode").val(churchDetail[0].TownCode).trigger("change");
    $("#txtAddress").val(churchDetail[0].Address);
    $("#txtDescription").val(churchDetail[0].Description);
    $("#txtAbout").val(churchDetail[0].About);
    $("#txtPhone1").val(churchDetail[0].Phone1);
    $("#txtPhone2").val(churchDetail[0].Phone2);
    $(".ddlPriest").val(churchDetail[0].MainPriestID).trigger("change");
    $("#txtLongitude").val(churchDetail[0].Longitude);
    $("#txtLatitude").val(churchDetail[0].Latitude);
    if (churchDetail[0].ImageURL == null)
    {
        $("#ChurchPreview").attr('src', '/img/defaultalbumadd.jpg');
    }
    else
    {
        $("#ChurchPreview").attr('src', churchDetail[0].ImageURL);
    }
    



}

function EditRole(curobj)
{
    debugger;
    $('#rowfluidDivAlert').hide();
    $('.alert').hide();
    var Roles = new Object();
    var editedrow = $(curobj).closest('tr');
    Roles.ID = $(curobj).attr('roleid');
    $("#hdfRolesID").val(Roles.ID);
    var roleDetail = GetRoleDetailByRoleID(Roles);
    $(".ddlRoleName").val(roleDetail[0].RoleName).trigger("change");
    $(".ddlChurch").val(roleDetail[0].ChurchID).trigger("change");
}

function GetChurchDetailsByChurchID(Church)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetChurchDetailsByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}


function GetRoleDetailByRoleID(Roles)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetRoleDetailByRoleID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}


function RemoveChurch(curobj)
{
    $('#rowfluidDivAlert').hide();
    $('.alert').hide();
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var Church = new Object();
        var editedrow = $(curobj).closest('tr');
        Church.churchId = $(curobj).attr('churchid');
        var result = DeleteChurch(Church);
        switch (result.status) {
            case "1":
                $('.alert-error').hide();
                $('#rowfluidDivAlert').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Deleted successfully");
                BindAllChurches();
                break;
            case "0":
                $('.alert-success').hide();
                $('#rowfluidDivAlert').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Deletion was not successfull");
                break;
            default:
                break;
        }

    }

}


function RemoveRole(curobj)
{
    debugger;
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var Roles = new Object();
        var editedrow = $(curobj).closest('tr');
        Roles.ID = $(curobj).attr('roleid');
        var result = DeleteRole(Roles);
        switch (result.status) {
            case "1":
                $('.alert-error').hide();
                $('#rowfluidDivAlert').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Deleted successfully");
                BindAllRoles();
                break;
            case "0":
                $('.alert-success').hide();
                $('#rowfluidDivAlert').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Deletion was not successfull");
                break;
            default:
                break;
        }

    }
}
function DeleteChurch(Church)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/DeleteChurch");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function DeleteRole(Roles) {
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/DeleteRole");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

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

function InsertRoles(Roles) {
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/InsertRoles");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function InsertUser(Users) {
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/InsertUsers");
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
            var html = '<tr class="churchrow"><td>' + Record.Name + '</td><td class="center">' + Record.TownName + '</td><td class="center">' + Record.Address + '</td><td class="center">' + Record.Phone1 + '</td><td class="center"><a class="circlebtn circlebtn-info"><i churchid=' + Record.ID + ' class="halflings-icon white edit" onclick="EditChurch(this)"></i></a><a class="circlebtn circlebtn-danger"><i churchid=' + Record.ID + ' class="halflings-icon white trash" onclick="RemoveChurch(this)"></i></a></td></tr>';
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
function BindTownMasterDropdown() {
    try {
        var jsonResult = {};
        var TownMaster = new Object();
        jsonResult = GetAllTowns(TownMaster);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch (e) {

    }

}
function BindChurchDropdown() {
    try {
        var jsonResult = {};
        var Church = new Object();
        jsonResult = GetAllChurchIDandText(Church);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
        catch(e)
        {

        }
    }

function BindRolesDropdown(chid) {
    try {
        var jsonResult = {};
        var church = new Object();
        church.churchId = chid;
        var Roles = new Object();
        Roles.churchObj = church;
        jsonResult = GetAllRolesIDandText(Roles);
        if (jsonResult != undefined) {
            return jsonResult;
        }
    }
    catch (e) {

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

function GetAllRolesIDandText(Roles) {
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllRolesIDandText");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}

function GetAllChurchIDandText(Church) {
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllChurchIDandText");
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

function GetMap()
{
    $('#mapModal').modal('show');
}

function BindAllRoles() {
    try {
        var Roles = new Object();
        var jsonResultRole = GetAllRoles(Roles);
        if (jsonResultRole != null) {
            LoadRoles(jsonResultRole);
        }
    }
    catch (e) {

    }
}

function GetAllRoles(Roles) {
    var ds = {};
    var table = {};
    try {
        var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllRoles");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function LoadRoles(Records) {
    try {
        $("#Rolestable").find(".rolerow").remove();
        $.each(Records, function (index, Record) {
            var html = '<tr class="rolerow"><td>' + Record.RoleName + '</td><td class="center">' + Record.ChurchName + '</td><td class="center">' + Record.CreatedDate + '</td><td class="center"><a class="circlebtn circlebtn-info"><i roleid=' + Record.RoleID + ' class="halflings-icon white edit" onclick="EditRole(this)"></i></a><a class="circlebtn circlebtn-danger"><i roleid=' + Record.RoleID + ' class="halflings-icon white trash" onclick="RemoveRole(this)"></i></a></td></tr>';
            $("#Rolestable").append(html);
        })
    }
    catch (e) {

    }
}


function BindAllUsers() {
    try {
        var Users = new Object();
        var jsonResultUser = GetAllUsers(Users);
        if (jsonResultUser != null) {
            LoadUsers(jsonResultUser);
        }
    }
    catch (e) {

    }
}

function GetAllUsers(Users) {
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllUsers");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function LoadUsers(Records) {
    try {
        $("#Userstable").find(".userrow").remove();
        $.each(Records, function (index, Record) {
            var html = '<tr class="userrow"><td>' + Record.UserName + '</td><td class="center">' + Record.Mobile + '</td><td class="center">' + Record.ChurchName + '</td><td class="center">' + Record.RoleName + '</td><td class="center"><a class="circlebtn circlebtn-info"><i userid=' + Record.UserID + ' class="halflings-icon white edit" onclick="EditRole(this)"></i></a><a class="circlebtn circlebtn-danger"><i userid=' + Record.RoleID + ' class="halflings-icon white trash" onclick="RemoveRole(this)"></i></a></td></tr>';
            $("#Userstable").append(html);
        })
    }
    catch (e) {

    }
}




