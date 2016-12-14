﻿

var DashDataTables = {};

$("document").ready(function (e) {
  try
    {
        $('input[type=text],input[type=password]').on('focus', function () {
            $(this).css({ background: 'white' });
            $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3,#ErrorBox4,#ErrorBox5').hide(1000);
        });
        $('textarea,select').on('focus', function () {
            $(this).css({ background: 'white' });
            $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3,#ErrorBox4,#ErrorBox5').hide(1000);
        });
      
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    try
    {
        //box content collapse
        var $targetchurchbox = $('.churchBox');
        $targetchurchbox.slideToggle();
        var $targetRolesBox = $('.RolesBox');
        $targetRolesBox.slideToggle();
        var $targetUserBox = $('.UserBox');
        $targetUserBox.slideToggle();
        var $targetUserBox = $('.DesignationBox');
        $targetUserBox.slideToggle();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    
    //try
    //{
    //    initGoogleMap();
    //    $('#mapModal').on('shown.bs.modal', function () {

    //        google.maps.event.trigger(map, "resize");
    //    });

    //}
    //catch(e)
    //{

    //}
    
    

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
        noty({ type: 'error', text: e.message });
    }


    try
    {
      var $churchone=  $(".ddlChurch").select2({
            placeholder: "Choose Church",
            allowClear: true,
            data: BindChurchDropdown()
      });
     
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }

    try{ 
        var $churchSelect = $(".ddlChurchuser").select2({
            placeholder: "Choose Church",
            allowClear: true,
            data: BindChurchDropdown()
        });
        $churchSelect.on("change", function (e)
        {
            var $selectRoles = $(".ddlRoles").select2();
            $selectRoles.select2().empty();
            var chid = $(this).val();
              $(".ddlRoles").select2({
                placeholder: "Choose Role",
                allowClear: true,
                data: BindRolesDropdown(chid)
            });
                 
        });
    } catch (e)
    { noty({ type: 'error', text: e.message }); }

    try {
        $(".ddlRoleName").select2({
            placeholder: "Choose Role",
            allowClear: true
       
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
   
   
    try
    {
      
      var Church = new Object();
      DashDataTables.churchTable = $('#churchtable').DataTable(
       {

       order: [],
       searching: true,
       paging: true,
       data: GetAllChurches(Church),
       columns: [

         { "data": "ID" },
         { "data": "Name","defaultContent": "<i>-</i>" },
          { "data": "Address", "defaultContent": "<i>-</i>" },
         { "data": "Phone1", "orderable": false, "defaultContent": "<i>-</i>" },
         { "data": "TownName",  "defaultContent": "<i>-</i>" },
                 
         { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditChurch(this)"><i class="halflings-icon white edit""></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveChurch(this)"></i></a>' }
       
       ],
       columnDefs: [
        {//hiding hidden column field churchid
            "targets": [0],
            "visible": false,
            "searchable": false
        }
      
       
       ]
       });
     
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    

    try
    {
        var Roles = new Object();
        DashDataTables.roleTable= $('#Rolestable').DataTable(
        {
            order: [],
            searching: true,
            paging: true,
            data: GetAllRoles(Roles),
            columns: [

              { "data": "RoleID" },
              { "data": "ChurchID"},
              { "data": "RoleName", "defaultContent": "<i>-</i>" },
              { "data": "ChurchName", "defaultContent": "<i>-</i>" },
              { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditRole(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveRole(this)"></i></a>' }
                                                                    
            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0,1],
                 "visible": false,
                 "searchable": false
             },
             {
                 "render": function (data, type, row) {
                      return ConvertJsonToDate(data);
                 },
                 "targets": 4
             }


            ]
        });
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }

    try {
        
        var Users = new Object();
        DashDataTables.userTable=$('#Userstable').DataTable(
        {
            order: [],
            searching: true,
            paging: true,
            data: GetAllUsers(Users),
            columns: [

              { "data": "UserID" },
              { "data": "ChurchID" },
              { "data": "UserName", "defaultContent": "<i>-</i>" },
               { "data": "Mobile", "defaultContent": "<i>-</i>" },
              { "data": "ChurchName", "defaultContent": "<i>-</i>" },
             
              { "data": "RoleName","defaultContent": "<i>-</i>"},
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditUsers(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveUser(this)"></i></a>' }

            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0, 1],
                 "visible": false,
                 "searchable": false
             }
            


            ]
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

    try {
        $(".ddlOrganization").select2({
            placeholder: "Choose Organization",
            allowClear: true,
            data: BindOrganizationTypeDropdown()
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

    try {
      
        var Designation = new Object();
        DashDataTables.designationTable= $('#Designationtable').DataTable(
        {
            order: [],
            searching: true,
            paging: true,
            data: GetAllDesignation(Designation),
            columns: [
              { "data": "DesigID" },
              { "data": "Position", "defaultContent": "<i>-</i>" },
              { "data": "Order", "defaultContent": "<i>-</i>" },
              { "data": "OrgType", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditDesignation(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveDesignation(this)"></i></a>' }
            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0],
                 "visible": false,
                 "searchable": false
             }
            ]


        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

    try {
      //  BindPatrons();
        var PatronMaster = new Object();
        var Church = new Object();
        PatronMaster.churchObj = Church;
        DashDataTables.patronTable= $('#Sainttable').DataTable({
            order: [],
            searching: true,
            paging: true,
            data: GetAllPatrons(PatronMaster),
            columns: [
              { "data": "ID" },
              { "data": "Name", "defaultContent": "<i>-</i>" },
              { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditSaint(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveSaint(this)"></i></a>' }
            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0],
                 "visible": false,
                 "searchable": false
             },
              {
                  "render": function (data, type, row) {
                      return ConvertJsonToDate(data);
                  },
                  "targets": 2
              }
            ]
           
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
   
   
    $('#btnChurchAdd').click(function (e) {
        
        var churchbit = ChurchValidation();
        if (churchbit)
        {
            try {
                var Church = new Object();
                if ($('#txtChurchName').val() != "") {
                    Church.churchName = $('#txtChurchName').val();
                }
                else
                {
                    Church.churchName = '';
                }

                if ($(".ddlTownCode").val() != "") {
                    Church.townCode = $(".ddlTownCode").val();
                }
                else
                {
                    Church.townCode = '';
                }

                if ($('#txtAddress').val() != "") {
                    Church.address = $('#txtAddress').val();
                }
                else
                {
                    Church.address = '';
                }

                if ($('#txtDescription').val() != "") {
                    Church.description = $('#txtDescription').val();
                }
                else
                {
                    Church.description = '';
                }

                if ($('#txtAbout').val() != "") {
                    Church.about = $('#txtAbout').val();
                }
                else
                {
                    Church.about = '';
                }

                if ($('#txtPhone1').val() != "") {
                    Church.phone1 = $('#txtPhone1').val();
                }
                else
                {
                    Church.phone1 = '';
                }

                if ($('#txtPhone2').val() != "") {
                    Church.phone2 = $('#txtPhone2').val();
                }
                else
                {
                    Church.phone2 = '';
                }


                if ($('#txtLongitude').val() != "") {
                    Church.longitude = $('#txtLongitude').val();
                }
                else
                {
                    Church.longitude = '';
                }

                if ($('#txtLatitude').val() != "") {
                    Church.latitude = $('#txtLatitude').val();
                }
                else
                {
                    Church.latitude = '';
                }
                debugger;
                if ($("#hdfChurchID").val() != "") {
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

                        formData.append('updatedBy', document.getElementById("LoginName").innerHTML);
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        switch (result) {
                            case 1:
                               
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                               
                                try {
                                    var $churchone = $(".ddlChurch").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    var $churchSelect = $(".ddlChurchuser").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    BindAllChurches();
                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                                break;
                            case 0:
                               
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result });
                                break;
                        }
                    }
                    else {
                        Church.mainImageId = '00000000-0000-0000-0000-000000000000';//no image default id
                        Church.churchId = $("#hdfChurchID").val();
                        var result = UpdateChurch(Church);
                        switch (result.status) {
                            case "1":
                               
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                              
                                try {
                                    var $churchone = $(".ddlChurch").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    var $churchSelect = $(".ddlChurchuser").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    BindAllChurches();
                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                               break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }


                }
                else {

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

                        formData.append('createdBy', document.getElementById("LoginName").innerHTML);
                        
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        switch (result.status) {
                            case "1":
                               
                                noty({ type: 'success', text: Messages.InsertionSuccessFull });
                               
                                try {
                                    var $churchone = $(".ddlChurch").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    var $churchSelect = $(".ddlChurchuser").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    $("#hdfChurchID").val(result.churchId);
                                    BindAllChurches();
                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                            
                                break;
                            case "0":
                               
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result });
                                break;
                        }
                    }
                    else {
                        Church.mainImageId = '00000000-0000-0000-0000-000000000000';//no image default id
                        var result = InsertChurch(Church);
                        switch (result.status) {
                            case "1":
                                noty({ type: 'success', text: Messages.InsertionSuccessFull });
                               
                                try {
                                    var $churchone = $(".ddlChurch").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    var $churchSelect = $(".ddlChurchuser").select2({
                                        placeholder: "Choose Church",
                                        allowClear: true,
                                        data: BindChurchDropdown()
                                    });
                                    $("#hdfChurchID").val(result.churchId);
                                    BindAllChurches();

                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                               
                            
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                               
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                }



            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        }
        
        
       


    });


    
    $('.ChurchClear').click(function (e) {
        try
        {
            RemoveStyle();
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
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
     

    });


    

    $('.RolesClear').click(function (e) {
        try
        {
            RemoveStyle();
            $(".ddlRoleName").select2("val", "");
            $(".ddlChurch").select2("val", "");
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
       
    });

    $('.UserClear').click(function (e) {
        try
        {
            RemoveStyle();
       
            $(".ddlChurchuser").select2("val", "");
            $("#txtUserName").val('');
            $("#txtUserAddress").val('');
            $("#txtMobile").val('');
            $("#txtEmail").val('');
            $("#chkActive").parent().removeClass('checked');
            $("#chkAdministrator").parent().removeClass('checked');
            $("#datepickerdob").val('');
            $("#txtLoginName").val('');
            $("#txtPassword").val('');
            $("#txtconfirmpswd").val('');
            $(".ddlRoles").select2("val", "");
            $("#hdfUserID").val('');
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
        
    });

    

    $('.clearDesignation').click(function (e) {
        try
        {
            RemoveStyle();

            $(".ddlOrganization").select2("val", "");
            $("#txtPosition").val('');
            $("#txtOrder").val('');

            $("#hdfDesignationID").val('');
        }
      
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
    });

    $('.ClearSaint').click(function (e) {
        try
        {
            RemoveStyle();
            $("#txtSaintName").val('');
            $("#txtSaintDescription").val('');
            $("#imgSaint").attr('src', '/img/defaultalbumadd.jpg');
            $("#hdfPatronID").val('');
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
     
    });

  
    $('#btnUserAdd').click(function (e) {
      try
      {
          debugger;
            var pasflag = false;
            var userflag = UserValidation();
            var pas = document.getElementById('txtPassword');
            var conf = document.getElementById('txtconfirmpswd');
            if (pas.value == conf.value)
            {
                pasflag = true;
            }
            else
            {
                alert('Passwords does not match');
            }
            if (userflag&&pasflag)
            {
                Users = new Object();
                Church = new Object();
                Roles = new Object();
                if ($('.ddlChurchuser').val() != "") {
                    Church.churchId = $('.ddlChurchuser').val();
                }
                else
                {
                    Church.churchId = '';
                }

                if ($("#txtUserName").val() != "") {
                    Users.Name = $("#txtUserName").val();
                }
                else
                {
                    Users.Name = '';
                }
                if ($("#txtUserAddress").val() != "") {
                    Users.Address = $("#txtUserAddress").val();
                }
                else
                {
                    Users.Address = '';
                }

                if ($("#txtMobile").val() != "") {
                    Users.Mobile = $("#txtMobile").val();
                }
                else
                {
                    Users.Mobile = '';
                }
                if ($("#txtEmail").val() != "") {
                    Users.Email = $("#txtEmail").val();
                }
                else
                {
                    Users.Email = '';
                }
                if ($('#optionMale').is(':checked')) {
                    Users.Gender = "Male";
                }
                else {
                    Users.Gender = "Female";
                }
                if ($('.ddlRoles').val() != "") {
                    Roles.ID = $('.ddlRoles').val();
                }
                else
                {
                    Roles.ID = '';
                }
                if ($("#chkActive").parent().attr('class') != "") {
                    Users.Active = 'True';
                }

                if ($("#chkAdministrator").parent().attr('class') != "") {
                    Users.Administrator = 'True';
                }

                if ($("#datepickerdob").val() != "") {
                    Users.DOB = $("#datepickerdob").val();
                }
                else
                {
                    Users.DOB = '';
                }

                if ($("#txtLoginName").val() != "") {
                    Users.LoginName = $("#txtLoginName").val();
                }

                if ($("#txtconfirmpswd").val() != "") {
                    Users.Password = $("#txtconfirmpswd").val();
                }

                Users.churchObj = Church;
                Users.rolesObj = Roles;

                if ($("#hdfUserID").val() == "") {
                    //INSERT

                    var result = InsertUser(Users);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Inserted successfully' });
                            BindAllUsers();
                            $("#hdfUserID").val(result.ID);
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Insertion was not successfull' });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                    }

                }
                else {
                    //UPDATE
                    Users.ID = $("#hdfUserID").val();
                    var result = UpdateUser(Users);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Updated successfully' });
                            BindAllUsers();
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Updation was not successfull' });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                    }

                }
            }

           


        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }


    });


    $('#btnRolesAdd').click(function (e) {
        try
        {
            debugger;
            var rolesflag = RolesValidation();
            if (rolesflag)
            {
                var Roles = new Object();
                var Church = new Object();
                if ($(".ddlRoleName").val() != "") {
                    Roles.RoleName = $(".ddlRoleName").val();
                }
                if ($(".ddlChurch").val() != "") {
                    Church.churchId = $(".ddlChurch").val();
                }
                if ($("#hdfRolesID").val() == '') {
                    //INSERT
                    Roles.churchObj = Church;
                    var result = InsertRoles(Roles);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Inserted successfully' });
                            BindAllRoles();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Insertion was not successfull' });
                            break;
                        case "2":
                            noty({ type: 'error', text: 'Insertion was not successfull,Duplicate Entry!' });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                }
                else {
                    //UPDATE
                    Roles.ID = $("#hdfRolesID").val();
                    Roles.churchObj = Church;
                    var result = UpdateRoles(Roles);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Updated successfully' });

                            BindAllRoles();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Updation was not successfull' });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }

                }


            }
  
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }

    });


    $('#btnDesignationAdd').click(function (e) {
      
        try
        {
            debugger;
            var desiggflag = DesignationValidation();
            if (desiggflag)
            {
                var OrgDesignationMaster = new Object();
                var Church = new Object();
                if ($("#txtPosition").val() != "") {
                    OrgDesignationMaster.position = $("#txtPosition").val();
                }

                if ($(".ddlOrganization").val() != "") {
                    OrgDesignationMaster.orgType = $(".ddlOrganization").val();
                }

                if ($("#txtOrder").val() != "") {
                    OrgDesignationMaster.order = $("#txtOrder").val();
                }

                if ($("#hdfDesignationID").val() == '') {
                    //INSERT
                    OrgDesignationMaster.churchObj = Church;
                    var result = InsertDesignation(OrgDesignationMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Inserted successfully' });
                            BindAllDesignation();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Insertion was not successfull' });
                            
                            break;
                        case "2":
                            noty({ type: 'error', text: 'Insertion was not successfull,Order can not Duplicate for organization' });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }

                }
                else {
                    //UPDATE
                    OrgDesignationMaster.orgDesignationMasterID = $("#hdfDesignationID").val()
                    OrgDesignationMaster.churchObj = Church;
                    var result = UpdateDesignation(OrgDesignationMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Updated successfully' });
                            BindAllDesignation();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Updation was not successfull' });
                           
                            break;
                        case "2":
                            noty({ type: 'error', text: 'Updation was not successfull,Order can not Duplicate for organization' });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }

                }
            }
           


        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
       
    });


    $('#btnSaintAdd').click(function (e) {
        try
        {
            var saintflag = PatronValidation();
            if (saintflag) {
                var PatronMaster = new Object();
                PatronMaster.patronMasterName = $("#txtSaintName").val();
                PatronMaster.description = $("#txtSaintDescription").val();
                var guid = createGuid();
                if (guid != null) {
                    var imgresult = "";
                    var _URL = window.URL || window.webkitURL;
                    var formData = new FormData();
                    var imagefile;

                    if (((imagefile = $('#UpSaint')[0].files[0]) != undefined)) { //App image insertion to table as well as folder
                        var formData = new FormData();
                        var tempFile;
                        if ((tempFile = $('#UpSaint')[0].files[0]) != undefined) {
                            tempFile.name = guid;
                            formData.append('NoticeAppImage', tempFile, tempFile.name);
                            formData.append('GUID', guid);
                            formData.append('createdby', document.getElementById("LoginName").innerHTML);
                        }
                        formData.append('ActionTyp', 'NoticeAppImageInsert');
                        AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        PatronMaster.imageID = guid;
                    }
                    else {
                        if ($('#hdfPatronImageID').val() != '') {
                            PatronMaster.imageID = $('#hdfPatronImageID').val(); // If no image is selected ,while updating, old imagid itself passed which is stored in hiddenfield
                        }
                    }
                }

                if ($('#hdfPatronID').val() != "") { //Case Update
                    PatronMaster.patronMasterId = $('#hdfPatronID').val();

                    result = UpdatePatron(PatronMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Updated successfully' });
                            BindPatrons();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Updation was not successfull' });

                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }

                    if ($('#hdfPatronImageID').val() != '' && (((imagefile = $('#UpSaint')[0].files[0]) != undefined))) {

                        //--if patron is updated with new image, the old image should delete from folder and table
                        var AppImages = new Object();
                        AppImages.appImageId = $('#hdfPatronImageID').val();
                        DeleteAppImage(AppImages);

                        if ($('#hdfPatronImageURL').val() != "") {
                            DeleteFileFromFolder($('#hdfPatronImageURL').val());
                        }
                        $('#hdfPatronImageID').val("");
                        $('#hdfPatronImageURL').val("");
                    }
                }
                else {  //Case Insert
                    result = InsertPatron(PatronMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: 'Inserted successfully' });
                            BindPatrons();
                            break;
                        case "0":
                            noty({ type: 'error', text: 'Insertion was not successfull' });

                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                }


                //ClearModalControls();
            }

            else {
                return false;
            }
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
      

    });

   
   

    try {
          
        debugger;
        var TownMaster = new Object();
        DashDataTables.townTable= $('#Townstable').DataTable(
        {
           
                order: [],
                searching: true,
                paging: true,
                data: GetAllTowns(TownMaster),
                columns: [
                  { "data": "Code" },
                  { "data": "Name", "defaultContent": "<i>-</i>" },
                  { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
                  { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditTown(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveTown(this)"></i></a>' }
                ],
                columnDefs: [//this object is to alter the display cell value not the actual value
                 {
                     //hiding hidden column fields 
                     "targets": [0],
                     "visible": false,
                     "searchable": false
                 },
                  {
                      "render": function (data, type, row) {
                          return ConvertJsonToDate(data);
                      },
                      "targets": 2
                  }
                ]
           
           
           
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    $(".clearTown").click(function (e) {
        $("#hdfTownCode").val('');
        $("#txtName").val('');
        $("#TownPreview").attr('src', '/img/defaultalbumadd.jpg');
    });

    $('#btnTownAdd').click(function (e) {

        try {
            debugger;
            var i;
            var townflag = TownValidation();
            if (townflag)
            {
                var TownMaster = new Object();
                if ($("#txtName").val() != "")
                {
                 TownMaster.name = $("#txtName").val();
                }

                if ($("#hdfTownCode").val() == '') {
                    //INSERT
                ///////Image insert using handler
                var imgresult;
                if ((imgresult = $('#townimageuploader')[0].files.length > 0)) {
                    debugger;
                    var formData = new FormData();
                    var imagefile;
                    imagefile = $('#townimageuploader')[0].files[0];
                   // imagefile.name = imgId;
                    formData.append('upImageFile', imagefile, imagefile.name);
                    formData.append('townName', TownMaster.name);
                    formData.append('createdby', document.getElementById("LoginName").innerHTML);
                    formData.append('ActionTyp', 'TownImageInsert');
                    var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                    switch (result.status)
                    {
                        case "1":

                            noty({ type: 'success', text: Messages.InsertionSuccessFull });
                            $("#hdfTownCode").val(result.code);
                            $("#hdfTownImageID").val(result.imageId);
                            
                                BindAllTown();
                                break;
                        case "2":
                            noty({ type: 'error', text: Messages.OperationDuplicateFailure });
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.FailureMsgCaption });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                }
                else
                {
                    var result = InsertTown(TownMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.InsertionSuccessFull });
                            $("#hdfTownCode").val(result.code);
                            $("#hdfTownImageID").val(result.imageId);
                            BindAllTown();
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.FailureMsgCaption });

                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.OperationDuplicateFailure });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                }
                } //UPDATE
                else {
                    //check image for updat
                    if ((imgresult = $('#townimageuploader')[0].files.length > 0)) {
                        debugger;
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#townimageuploader')[0].files[0];
                        formData.append('upImageFile', imagefile, imagefile.name);
                        formData.append('code',$("#hdfTownCode").val())
                        formData.append('townName', TownMaster.name);
                        formData.append('townImageID', $("#hdfTownImageID").val())
                        formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                        formData.append('ActionTyp', 'TownImageUpdate');
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                        switch (result.status) {
                            case "1":

                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                                BindAllTown();
                                break;
                            case "2":
                                noty({ type: 'error', text: Messages.OperationDuplicateFailure });
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result });
                                break;
                        }
                    }
                    else
                    {
                        TownMaster.code = $("#hdfTownCode").val();
                        var result = UpdateTown(TownMaster);
                        switch (result.status) {
                            case "1":
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });

                                BindAllTown();
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });

                                break;
                            case "2":
                                noty({ type: 'error', text: Messages.OperationDuplicateFailure });
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }//else
               }//else
            }//townflag if



        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }

    });

    
    
});//end of document.ready

function TownValidation() {
    debugger;
   
    var name = $('#txtName');


    var container = [
        { id: name[0].id, name: name[0].name, Value: name[0].value },
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
   
        noty({ type: 'error', text: Messages.Validation });
        return false;
    }
    if (j == '0') {
       // $('#ErrorBox6').hide(1000);
        return true;
    }
}

function EditTown(curobj) {

    var data = DashDataTables.townTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    debugger;
    var TownMaster = new Object();

    TownMaster.code = data.Code;
    $("#hdfTownCode").val(TownMaster.code);
    var townDetail = GetTownDetailByCode(TownMaster);
    if (townDetail != undefined && townDetail != null) {
        $("#txtName").val(townDetail[0].Name);
        if (townDetail[0].URL == null) {
            $("#TownPreview").attr('src', '/img/defaultalbumadd.jpg');
        }
        else {
            $("#TownPreview").attr('src', townDetail[0].URL);
        }
    }

}

function GetTownDetailByCode(Town) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townObj':" + JSON.stringify(Town) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectTown");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function InsertTown(Town) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townObj':" + JSON.stringify(Town) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/InsertTown");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function UpdateTown(Town) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townObj':" + JSON.stringify(Town) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateTown");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function SelectTownMastersIDandText(TownMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townMasterObj':" + JSON.stringify(TownMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectTownMastersIDandText");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}

function TownImagePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#TownPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//function LoadTown(Records) {
//    try {
//        $("#Townstable").find(".townrow").remove();
//        $.each(Records, function (index, Record) {
//            var html = '<tr class="townrow"><td>' + Record.Name + '</td><td class="center">' + ConvertJsonToDate(Record.CreatedDate) + '</td><td class="center"><a class="circlebtn circlebtn-info"><i townCode=' + Record.Code + ' class="halflings-icon white edit" onclick="EditTown(this)"></i></a><a class="circlebtn circlebtn-danger"><i townCode=' + Record.Code + ' class="halflings-icon white trash" onclick="RemoveTown(this)"></i></a></td></tr>';
//            $("#Townstable").append(html);
//        })
//    }
//    catch (e) {

//    }
//}

function RemoveTown(curobj) {
    try {
        var data = DashDataTables.townTable.row($(curobj).parents('tr')).data();
        debugger;
       
        var TownMaster = new Object();
        TownMaster.code = data.Code;
        var jsonResultTown = DeleteTown(TownMaster);
        switch (jsonResultTown.status) {
            case "1":
                noty({ type: 'success', text: 'Deleted successfully' });
                BindAllTown();
                break;
            case "0":
                noty({ type: 'error', text: 'Deletion was not successfull' });

                break;
            default:
                noty({ type: 'info', text: result });
                break;
        }
    }
    catch (e) {

    }
}

function DeleteTown(TownMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'townObj':" + JSON.stringify(TownMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/DeleteTown");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function BindAllTown() {
    var TownMaster = new Object();
    DashDataTables.townTable.clear().rows.add(GetAllTowns(TownMaster)).draw(false);
   
}

function GetAllTowns(TownMaster) {
    debugger;
    var ds = {};
    var table = {};
    try {
        var data = "{'townMasterObj':" + JSON.stringify(TownMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllTown");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function BindAllChurches()
{
        //DataTable rebind using its api
        var Church = new Object();
        DashDataTables.churchTable.clear().rows.add(GetAllChurches(Church)).draw(false);
}


function DesignationValidation()
{
    debugger;
  
    var postion = $('#txtPosition');
    var organization = $('#idddlOrganization');
    var order = $('#txtOrder');
   



    var container = [
        { id: postion[0].id, name: postion[0].name, Value: postion[0].value },
        { id: organization[0].id, name: organization[0].name, Value: organization[0].value },
        { id: order[0].id, name: order[0].name, Value: order[0].value }
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
       
        noty({ type: 'error', text: Messages.Validation });
        return false;
    }
    if (j == '0') {
       // $('#ErrorBox4').hide(1000);
        return true;
    }
}

function ChurchValidation() {
    var ChurchName = $('#txtChurchName');
    var TownCode = $('.ddlTownCode');
    var ChurchAddress = $('#txtAddress');
    var phone1 = $('#txtPhone1');
    var longitude = $('#txtLongitude');
    var lattitude = $('#txtLatitude');
    var container = [
        { id: ChurchName[0].id, name: ChurchName[0].name, Value: ChurchName[0].value },
        { id: TownCode[0].id, name: TownCode[0].name, Value: TownCode[0].value },
        { id: ChurchAddress[0].id, name: ChurchAddress[0].name, Value: ChurchAddress[0].value },
        { id: phone1[0].id, name: phone1[0].name, Value: phone1[0].value },
        { id: longitude[0].id, name: longitude[0].name, Value: longitude[0].value },
        { id: lattitude[0].id, name: lattitude[0].name, Value: lattitude[0].value}
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
        noty({ type: 'error', text: Messages.Validation });
        
        return false;
    }
    if (j == '0') {
       // $('#ErrorBox').hide(1000);
       
     
        return true;
    }
}


function RolesValidation()
{
    debugger;
    
    var RoleName = $('#idddlRoleName');
    var churchrole = $('#idddlChurch');

    var container = [
        { id: RoleName[0].id, name: RoleName[0].name, Value: RoleName[0].value },
        { id: churchrole[0].id, name: churchrole[0].name, Value: churchrole[0].value }
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
        noty({ type: 'error', text: Messages.Validation });
        return false;
    }
    if (j == '0') {
      return true;
    }
}


function UserValidation() {
   
  
    var userchurch = $('#idddlchurchuser');
    var username = $('#txtUserName');
    var useraddress = $('#txtUserAddress');
    var usermobile = $('#txtMobile');
    var email = $('#txtEmail');
    var userroles = $('#idddlRoles');

    var userDOB = $('#datepickerdob');
    var loginname = $('#txtLoginName');
    var paswd = $('#txtPassword');



    var container = [
        { id: userchurch[0].id, name: userchurch[0].name, Value: userchurch[0].value },
        { id: username[0].id, name: username[0].name, Value: username[0].value },
        { id: useraddress[0].id, name: useraddress[0].name, Value: useraddress[0].value },
        { id: usermobile[0].id, name: usermobile[0].name, Value: usermobile[0].value },
        { id: email[0].id, name: email[0].name, Value: email[0].value },
        { id: userroles[0].id, name: userroles[0].name, Value: userroles[0].value },
        { id: userDOB[0].id, name: userDOB[0].name, Value: userDOB[0].value },
        { id: loginname[0].id, name: loginname[0].name, Value: loginname[0].value },
        { id: paswd[0].id, name: paswd[0].name, Value: paswd[0].value }
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
        noty({ type: 'error', text: Messages.Validation });

        return false;
    }
    if (j == '0') {
      //  $('#ErrorBox2').hide(1000);


        return true;
    }
}



function PatronValidation() {
    
    var SaintName = $('#txtSaintName');
    var SaintDescription = $('#txtSaintDescription');

    var container = [
        { id: SaintName[0].id, name: SaintName[0].name, Value: SaintName[0].value },
       { id: SaintDescription[0].id, name: SaintDescription[0].name, Value: SaintDescription[0].value }

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
        $('#ErrorBox5').hide();
        return true;
    }

}

function RemoveUser(curobj)
{
    debugger;
    var data = DashDataTables.userTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var Users = new Object();
        var Church = new Object();
        Users.churchObj = Church;
        Users.ID = data.UserID;
        var result = DeleteUser(Users);

        switch (result.status) {
            case "1":
                noty({ type: 'success', text: 'Deleted successfully' });
                
                BindAllUsers();
                $('txtPassword').val('');
                $('txtconfirmpswd').val('');
                break;
            case "0":
               
                noty({ type: 'error', text: 'Deletion was not successfull' });
                $('txtPassword').val('');
                $('txtconfirmpswd').val('');
                break;
            default:
                noty({ type: 'error', text: result.status });
                $('txtPassword').val('');
                $('txtconfirmpswd').val('');
                break;
        }

    }

}

function RemoveSaint(curobj)
{
    debugger;
    var data = DashDataTables.patronTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
       
        var PatronMaster = new Object();
       
        PatronMaster.patronMasterId = data.ID;
        var result = DeleteSaint(PatronMaster);

        switch (result.status) {
            case "1":
                noty({ type: 'success', text: 'Deleted successfully' });
               
                BindPatrons();
                break;
            case "0":
                noty({ type: 'error', text: 'Deletion was not successfull' });
              
                break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }

}
function EditChurch(curobj)
{
    debugger;
    //Get Current table row data
    var data = DashDataTables.churchTable.row($(curobj).parents('tr')).data();


    RemoveStyle();

    var Church = new Object();
    Church.churchId = data.ID;
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
    if (churchDetail[0].ImageURL == null) {
        $("#ChurchPreview").attr('src', '/img/defaultalbumadd.jpg');
    }
    else {
        $("#ChurchPreview").attr('src', churchDetail[0].ImageURL);
    }
}

function EditUsers(curobj)
{
    debugger;
    RemoveStyle();
    var data = DashDataTables.userTable.row($(curobj).parents('tr')).data();
    var Users = new Object();
    Users.ID = data.UserID;
    $("#hdfUserID").val(Users.ID);
    var userDetail = GetUserDetailsByUserID(Users);

    $(".ddlChurchuser").val(userDetail[0].ChurchID).trigger("change");
    $("#txtUserName").val(userDetail[0].UserName);
    $("#txtUserAddress").val(userDetail[0].Address);
    $("#txtMobile").val(userDetail[0].Mobile);
    $("#txtEmail").val(userDetail[0].Email);
    switch(userDetail[0].Gender)
    {
        case 'Male':
              $("#optionFemale").parent().removeClass('checked');
             $("#optionMale").parent().addClass('checked');
          //  $('#optionMale').click();
          
            break;
        case 'Female':
            $("#optionMale").parent().removeClass('checked');
            $("#optionFemale").parent().addClass('checked');
          //  $('#optionFemale').click();
         
           
            break;
    }
    $(".ddlRoles").val(userDetail[0].RoleID).trigger("change");

    if (userDetail[0].Active == true)
    {
       $("#chkActive").parent().addClass('checked');
    }
    else
    {
        $("#chkActive").parent().removeClass('checked');
    }

    if (userDetail[0].Administrator == true)
    {
        $("#chkAdministrator").parent().addClass('checked');
    }
    else
    {
        $("#chkAdministrator").parent().removeClass('checked');
    }

    $("#txtLoginName").val(userDetail[0].LoginName);

    $("#datepickerdob").val(ConvertJsonToDate(userDetail[0].DOB));

    $('txtPassword').val('');
    $('txtconfirmpswd').val('');
   
   
}

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

function UpdateDesignation(OrgDesignationMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateDesignation");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}


function EditRole(curobj)
{
    debugger;
    var data = DashDataTables.roleTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
   
    var Roles = new Object();
    Roles.ID = data.RoleID;
    $("#hdfRolesID").val(Roles.ID);
    var roleDetail = GetRoleDetailByRoleID(Roles);
    $(".ddlRoleName").val(roleDetail[0].RoleName).trigger("change");
    $(".ddlChurch").val(roleDetail[0].ChurchID).trigger("change");
}


function EditDesignation(curobj)
{
    var data = DashDataTables.designationTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var OrgDesignationMaster = new Object();
    OrgDesignationMaster.orgDesignationMasterID = data.DesigID;
    $("#hdfDesignationID").val(OrgDesignationMaster.orgDesignationMasterID);
    var designationDetail = GetDesignationDetailByID(OrgDesignationMaster);
    $("#txtPosition").val(designationDetail[0].Position);
    $("#txtOrder").val(designationDetail[0].Order);
    $(".ddlOrganization").val(designationDetail[0].OrgType).trigger("change");
 }

function EditSaint(curobj) {
    debugger;
    var data = DashDataTables.patronTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var PatronMaster = new Object();
    PatronMaster.patronMasterId = data.ID;
    $("#hdfPatronID").val(PatronMaster.patronMasterId);
    var PatronDetail = GetPatronDetailByID(PatronMaster);
    $("#txtSaintName").val(PatronDetail[0].Name);
    $("#txtSaintDescription").val(PatronDetail[0].Description);
    $("#hdfPatronID").val(PatronDetail[0].ID);
    document.getElementById("imgSaint").src = PatronDetail[0].URL;
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

function GetUserDetailsByUserID(Users) {
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetUserDetailsByUserID");
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
function GetDesignationDetailByID(OrgDesignationMaster)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetDesignationDetailByID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function GetPatronDetailByID(PatronMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetPatronDetailByID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function RemoveChurch(curobj)
{
    
    var data = DashDataTables.churchTable.row($(curobj).parents('tr')).data();
    

    RemoveStyle();
   
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var Church = new Object();
       
        Church.churchId = data.ID;
        var result = DeleteChurch(Church);
        switch (result.status) {
            case "1":
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
                try {
                     $(".ddlChurch").select2({
                        placeholder: "Choose Church",
                        allowClear: true,
                        data: BindChurchDropdown()
                    });
                    $(".ddlChurchuser").select2({
                        placeholder: "Choose Church",
                        allowClear: true,
                        data: BindChurchDropdown()

                    });
                    BindAllChurches();
                }
                catch (e) {
                    noty({ type: 'error', text: e.message });
                }
              
                break;
           case "0":
               noty({ type: 'error', text: Messages.DeletionFailure });
               
                break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }

}


function RemoveRole(curobj)
{
    debugger;
    RemoveStyle();
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var data = DashDataTables.roleTable.row($(curobj).parents('tr')).data();
        var Roles = new Object();
        var Church = new Object();
        
        Church.churchId = data.ChurchID;
        Roles.ID = data.RoleID;
        Roles.churchObj = Church;
        var result = DeleteRole(Roles);
        switch (result.status) {
            case "1":
                noty({ type: 'success', text: 'Deleted successfully' });
                BindAllRoles();
                break;
            case "0":
                noty({ type: 'error', text: 'Deletion was not successfull' });
               break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }
}


function RemoveDesignation(curobj)
{
    var data = DashDataTables.designationTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
 
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
        var OrgDesignationMaster = new Object();
        OrgDesignationMaster.orgDesignationMasterID = data.DesigID;
        var result = DeleteDesignation(OrgDesignationMaster);
        switch (result.status) {
            case "1":
                noty({ type: 'success', text: 'Deleted successfully' });
                BindAllDesignation();
                break;
            case "0":
                noty({ type: 'success', text: 'Deletion was not successfull' });
               break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }
}

function DeleteUser(Users)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/DeleteUser");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
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


function DeleteDesignation(OrgDesignationMaster)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/DeleteDesignation");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function DeleteSaint(PatronMaster)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/Novenas.aspx/DeletePatron");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
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

function InsertDesignation(OrgDesignationMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/InsertDesignation");
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
function UpdateUser(Users) {
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateUser");
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



//function BindTownMasterDropdown() {
//    try
//    {
//        var jsonResult = {};
//        var TownMaster = new Object();
//        jsonResult = GetAllTowns(TownMaster);
//        if (jsonResult != undefined) {
//            return jsonResult;
//        }
//    }
//    catch(e)
//    {

//    }
    
//}
function BindTownMasterDropdown() {
    try {
        var jsonResult = {};
        var TownMaster = new Object();
        jsonResult = SelectTownMastersIDandText(TownMaster);
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



function GetAllRoles(Roles) {
    try {
       
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
    catch (e) {

    }
}



function BindAllRoles() {
    try {
        var Roles = new Object();
        DashDataTables.roleTable.clear().rows.add(GetAllRoles(Roles)).draw(false);
    }
    catch (e) {

    }
}


function BindAllUsers() {
    try {
        var Users = new Object();
        DashDataTables.userTable.clear().rows.add(GetAllUsers(Users)).draw(false);
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

//function LoadUsers(Records) {
//    try {
//        $("#Userstable").find(".userrow").remove();
//        $.each(Records, function (index, Record) {
//            var html = '<tr class="userrow"><td>' + Record.UserName + '</td><td class="center">' + Record.Mobile + '</td><td class="center">' + Record.ChurchName + '</td><td class="center">' + Record.RoleName + '</td><td class="center"><a class="circlebtn circlebtn-info"><i userid=' + Record.UserID + ' class="halflings-icon white edit" onclick="EditUsers(this)"></i></a><a class="circlebtn circlebtn-danger"><i userid=' + Record.UserID + ' class="halflings-icon white trash" onclick="RemoveUser(this)"></i></a></td></tr>';
//            $("#Userstable").append(html);
//        })
//    }
//    catch (e) {

//    }
//}


function BindOrganizationTypeDropdown() {
    var ds = {};
    var table = {};
    var OrgDesignationMaster = new Object();
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllOrgType");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}

function BindAllDesignation() {
    try {
        var OrgDesignationMaster = new Object();
        DashDataTables.designationTable.clear().rows.add(GetAllDesignation(OrgDesignationMaster)).draw(false);
    }
    catch (e) {

    }
}

//function LoadDesignation(Records) {
//    try {
//        $("#Designationtable").find(".designationrow").remove();
//        $.each(Records, function (index, Record) {
//            var html = '<tr class="designationrow"><td>' + Record.Position + '</td><td class="center">' + Record.Order + '</td><td class="center">' + Record.OrgType + '</td><td class="center"><a class="circlebtn circlebtn-info"><i designationid=' + Record.ID + ' class="halflings-icon white edit" onclick="EditDesignation(this)"></i></a><a class="circlebtn circlebtn-danger"><i designationid=' + Record.ID + ' class="halflings-icon white trash" onclick="RemoveDesignation(this)"></i></a></td></tr>';
//            $("#Designationtable").append(html);
//        })
//    }
//    catch (e) {

//    }
//}

function GetAllDesignation(Designation) {
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(Designation) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/SelectAllDesignation");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function UpdatePatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/UpdatePatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
function DeleteAppImage(AppImages) {
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function DeleteFileFromFolder(imgPath) {

    $.ajax({
        type: "POST",
        url: "../AdminPanel/Novenas.aspx/DeleteFileFromFolder",
        data: '{imgPath: "' + imgPath + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: imgPath,
        failure: function (response) {

            // alert(response.d);
        },
        error: function (response) {

            // alert(response.d);
        }
    });
}

//Insert Patron
function InsertPatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertPatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//

function BindPatrons() {
    try {
        var PatronMaster = new Object();
        var Church = new Object();
        PatronMaster.churchObj = Church;
        DashDataTables.patronTable.clear().rows.add(GetAllPatrons(PatronMaster)).draw(false);
    }
    catch (e) {

    }
}

function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);

    return table;
}

//function LoadPatrons(Records)
//{
//    try {
//        $("#Sainttable").find(".saintrow").remove();
//        $.each(Records, function (index, Record) {
//            var html = '<tr class="saintrow"><td>' + Record.Name + '</td><td class="center">' +ConvertJsonToDate(Record.CreatedDate) + '</td><td class="center"><a class="circlebtn circlebtn-info"><i patronid=' + Record.ID + ' class="halflings-icon white edit" onclick="EditSaint(this)"></i></a><a class="circlebtn circlebtn-danger"><i patronid=' + Record.ID + ' class="halflings-icon white trash" onclick="RemoveSaint(this)"></i></a></td></tr>';
//            $("#Sainttable").append(html);
//        })
//    }
//    catch (e) {

//    }
//}

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#imgSaint').attr('src', e.target.result);
            $('.Preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function checkPass() {
    var pass1 = document.getElementById('txtPassword');
    var pass2 = document.getElementById('txtconfirmpswd');
     if (pass1.value == pass2.value) {
      
        pass2.style.backgroundColor ="#66cc66";
     } else {
    
        pass2.style.backgroundColor = "#ff6666";
       }
}

//function initGoogleMap()
//{
//    try {
//        var mapOptions = {
//            center: new google.maps.LatLng(9.9816, 76.2998),//latlong
//            zoom: 14,
//            mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//        var infoWindow = new google.maps.InfoWindow();
//        var latlngbounds = new google.maps.LatLngBounds();
//        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
//        google.maps.event.addListener(map, 'click', function (e) {
//            alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
//            $("#txtLongitude").val(e.latLng.lng());
//            $("#txtLatitude").val(e.latLng.lat());
//        });
       
//    }
//    catch (e) {
//        noty({ type: 'error', text: e.message });
//    }
//}


//var map;
//function initialize() {
//    try
//    {
//        var center = new google.maps.LatLng(9.9816, 76.2998);
//        var mapOptions = {
//            zoom: 14,
//            mapTypeId: google.maps.MapTypeId.ROADMAP,
//            center: center
//        };

//        map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
//        google.maps.event.addListener(map, 'click', function (e) {
//            //alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
//            document.getElementById("spanLatitude").innerHTML = e.latLng.lat();
//            document.getElementById("spanLongitude").innerHTML = e.latLng.lng();
           
//            $("#txtLongitude").val(e.latLng.lng());
//            $("#txtLatitude").val(e.latLng.lat());
//        });

//        var marker = new google.maps.Marker({
//            map: map,
//            position: center
//        });
//    }
//    catch(e)
//    {
//        noty({ type: 'error', text: e.message });
//    }

   
//}


function GetMap() {
    try
    {
        
         var center = new google.maps.LatLng(9.9816, 76.2998);
        //$('#mapModal').modal('show');
        $('#mapModal').modal({
            backdrop: 'static',
            keyboard: false
        }).on('shown.bs.modal', function () {
       
           // Resize code
             var center = new google.maps.LatLng(9.9816, 76.2998);
             google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
         ///   Resize code
        });
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}

//function initAutocomplete() {
//    debugger;
//    var map = new google.maps.Map(document.getElementById('dvMap'), {
//        center: { lat: 9.9816, lng: 76.2998 },
//        zoom: 13,
//        mapTypeId: 'roadmap'
//    });

//    // Create the search box and link it to the UI element.
//    var input = document.getElementById('pac-input');
//    var searchBox = new google.maps.places.SearchBox(input);
//    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//    // Bias the SearchBox results towards current map's viewport.
//    map.addListener('bounds_changed', function () {
//        searchBox.setBounds(map.getBounds());
//    });

//    var markers = [];
//    // Listen for the event fired when the user selects a prediction and retrieve
//    // more details for that place.
//    searchBox.addListener('places_changed', function () {
//        var places = searchBox.getPlaces();

//        if (places.length == 0) {
//            return;
//        }

//        // Clear out the old markers.
//        markers.forEach(function (marker) {
//            marker.setMap(null);
//        });
//        markers = [];

//        // For each place, get the icon, name and location.
//        var bounds = new google.maps.LatLngBounds();
//        places.forEach(function (place) {
//            if (!place.geometry) {
//                console.log("Returned place contains no geometry");
//                return;
//            }
//            var icon = {
//                url: place.icon,
//                size: new google.maps.Size(71, 71),
//                origin: new google.maps.Point(0, 0),
//                anchor: new google.maps.Point(17, 34),
//                scaledSize: new google.maps.Size(25, 25)
//            };

//            // Create a marker for each place.
//            markers.push(new google.maps.Marker({
//                map: map,
//                icon: icon,
//                title: place.name,
//                position: place.geometry.location
//            }));

//            if (place.geometry.viewport) {
//                // Only geocodes have viewport.
//                bounds.union(place.geometry.viewport);
//            } else {
//                bounds.extend(place.geometry.location);
//            }
//        });
//        map.fitBounds(bounds);
//    });
//}


function initMap() {
    try {
       
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 9.9816, lng: 76.2998 },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 17
        });
        //              
                       
        //
        var input = document.getElementById('searchInput');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });
        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("Geometry is not available");
                
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setIcon(({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);

            //Location details
            for (var i = 0; i < place.address_components.length; i++) {
                if (place.address_components[i].types[0] == 'postal_code') {
                    document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
                }
                if (place.address_components[i].types[0] == 'country') {
                    document.getElementById('country').innerHTML = place.address_components[i].long_name;
                }
            }
            document.getElementById('location').innerHTML = place.formatted_address;
            document.getElementById("spanLatitude").innerHTML = place.geometry.location.lat();
            document.getElementById("spanLongitude").innerHTML = place.geometry.location.lng();
            $("#txtLongitude").val(place.geometry.location.lng());
            $("#txtLatitude").val(place.geometry.location.lat());
        });

       // var jlm = new google.maps.Map(document.getElementById('map'), map);
        google.maps.event.addListener(map, 'click', function (e) {
           
            $("#txtLongitude").val(e.latLng.lng());
            $("#txtLatitude").val(e.latLng.lat());
            document.getElementById("spanLatitude").innerHTML = e.latLng.lat();
            document.getElementById("spanLongitude").innerHTML = e.latLng.lng();
        });

      
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}