
//Container for datatables 
var DashDataTables = {};
var dropdownContainer = {};

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
        //dropdownContainer.ddlTown=$(".ddlTownCode").select2({
        //    placeholder: "Choose Town",
        //    allowClear: true,
          //  data: BindTownMasterDropdown()
         //});
       //  BindTownMasterDropdown();

         $(".ddlTownCode").select2({
             placeholder: 'Select town..',
             allowClear: true,
             ajax: {
                 url: "../AdminPanel/DashBoard.aspx/SelectTownMastersIDandText",
                 dataType: 'json',
                 type: "post",
                 contentType: "application/json",
                 async: false,
                 delay: 250,
                
                 data: function (params) {
                     {
                         var TownMaster = new Object();
                         TownMaster.name = params.term;
                         return "{'townMasterObj':" + JSON.stringify(TownMaster) + "}";

                     };
                 },
                 processResults: function (data, params) {
                     // parse the results into the format expected by Select2
                     // since we are using custom formatting functions we do not need to
                     // alter the remote JSON data, except to indicate that infinite
                     // scrolling can be used
                     params.page = params.page || 1;

                     return {
                         results: JSON.parse(data.d),
                         pagination: {
                             more: (params.page * 30) < data.total_count
                         }
                     };
                 },
                 cache: true
             },
             //escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
             //minimumInputLength: 1,
             //templateResult: formatRepo, // omitted for brevity, see the source of this page
             //templateSelection: FormatResults // omitted for brevity, see the source of this page
         });

    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }


    try
    {
        $("#ddlChurchinRoles").on("select2:unselecting", function (e) {
            
            DashDataTables.roleTable.search('').draw(false);
            BindAllRoles();
            $("#idddlRoleName").select2("val", "");
        });

        $("#ddlChurchinRoles").on("change", function (e) {
            
            if (($("#ddlChurchinRoles").val() != "") && ($("#ddlChurchinRoles").val()!=null))
            {
                var Roles = new Object();
                var Church = new Object();
                Church.churchId = $("#ddlChurchinRoles").val();
                Roles.churchObj = Church;
                BindRolesByChurch(Roles);
                //.select2('data')[0]['id'];
                var stringToSplit = $("#ddlChurchinRoles").select2('data')[0]['text'];
                var stringarray=stringToSplit.split(',');
                DashDataTables.roleTable.search(stringarray[0]).draw(false);
            }
            else
            {
                BindAllRoles();
            }
            
         
        });
     
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }

    try{ 
        $("#ddlChurchinUsers").on("select2:unselecting", function (e) {
           
            DashDataTables.userTable.search('').draw(false);
            BindAllUsers();
            $("#idddlRoles").select2("val", "");
          
        });

        $("#ddlChurchinUsers").on("change", function (e)
        {
           
            if (($("#ddlChurchinUsers").val() != "") && ($("#ddlChurchinUsers").val() != null)) {
                var Users = new Object();
                var Church = new Object();
                Church.churchId = $("#ddlChurchinUsers").val();
                Users.churchObj = Church;
                BindUsersByChurch(Users);
                var searchtext = $("#ddlChurchinUsers").select2('data')[0]['text'];
                
                DashDataTables.userTable.search(searchtext).draw(false);
                $("#idddlRoles").select2().empty();
                $("#idddlRoles").select2({
                        placeholder: "Choose Role",
                        allowClear: true,
                        data: BindRolesDropdown(Church.churchId)
                    });

            }
            else {
                BindAllUsers();
            }

                 
        });
    } catch (e)
    {
        noty({ type: 'error', text: e.message });
    }

    try {

        dropdownContainer.ddlRoles= $(".ddlRoleName").select2({
            placeholder: "Choose Role",
            allowClear: true
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    try {
        dropdownContainer.ddlOrganization = $("#idddlOrganization").select2({
            placeholder: "Choose Organization",
            allowClear: true,
            data: BindOrganizationTypeDropdown()
        });

        $("#idddlOrganization").on("select2:unselecting", function (e) {

            DashDataTables.designationTable.search('').draw(false);
            BindAllDesignation();
          

        });

        $("#idddlOrganization").on("change", function (e) {
           
            if (($("#idddlOrganization").val() != "") && ($("#idddlOrganization").val() != null)) {
                var Designation = new Object();
                Designation.orgType = $("#idddlOrganization").val();
                BindDesignationByOrganization(Designation);
                var searchtext = $("#idddlOrganization").select2('data')[0]['text'];

                DashDataTables.designationTable.search(searchtext).draw(false);
               

            }
            else {
                BindAllDesignation();
            }


        });


    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    try {

        var Church = new Object();
        DashDataTables.churchReqtable = $('#churchReqtable').DataTable(
         {
             dom: '<"top"f>rt<"bottom"ip><"clear">',
             order: [],
             searching: true,
             paging: true,
             data: GetAllRequestChurch(),
             columns: [

               { "data": "ID" },
               { "data": "ImageID" },
               { "data": "Status" },
               { "data": "ChurchName", "defaultContent": "<i>-</i>" },
               { "data": "Address", "defaultContent": "<i>-</i>" },
               { "data": "UserName", "defaultContent": "<i>-</i>" },
               { "data": "ContactNumber", "orderable": false, "defaultContent": "<i>-</i>" },
               { "data": "Place", "defaultContent": "<i>-</i>" },
               { "data": null, "orderable": false}

             ],
             columnDefs: [
              {//hiding hidden column field churchid
                  "targets": [0, 1,2],
                  "visible": false,
                  "searchable": false
              },
              {//custom js functions can be callled in render property for that target column
                  "render": function (data, type, row) {
                      
                      if (data.Status == 1)
                      {
                          return '<a class="circlebtn circlebtn-info" style="background-color:green;" title="Approved"><i class="halflings-icon white ok"></i></a>';
                      }
                      else if(data.Status == 0)
                      {
                          return '<a class="circlebtn circlebtn-info" onclick="EditRequestChurch(this)" title="Edit"><i class="halflings-icon white edit"></i></a>';
                      }
                      else if (data.Status == 2)
                      {
                          return '<a class="circlebtn circlebtn-info" style="background-color:Red;" title="Rejected"><i class="halflings-icon white ban-circle"></i></a>';
                      }
                  },
                  "targets": 8
              }
             ]
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
       dom: '<"top"f>rt<"bottom"ip><"clear">',
       order: [],
       searching: true,
       paging: true,
       data: GetAllChurches(Church),
       columns: [

         { "data": "ID" },
         { "data": "MainImageID"},
         { "data": "Name","defaultContent": "<i>-</i>" },
         { "data": "Address", "defaultContent": "<i>-</i>" },
         { "data": "Phone1", "orderable": false, "defaultContent": "<i>-</i>" },
         { "data": "TownName",  "defaultContent": "<i>-</i>" },
         { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditChurch(this)"><i class="halflings-icon white edit""></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveChurch(this)"></i></a>' }
       
       ],
       columnDefs: [
        {//hiding hidden column field churchid
            "targets": [0,1],
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
            processing: true,
            dom: '<"top"f>rt<"bottom"ip><"clear">',
            order: [],
            searching: true,
            paging: true,
            data: GetAllRoles(Roles),
            columns: [

              { "data": "RoleID" },
              { "data": "ChurchID"},
              { "data": "ChurchName", "defaultContent": "<i>-</i>" },
              { "data": "RoleName", "defaultContent": "<i>-</i>" },
              { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
              { "data": "TownName","defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditRole(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveRole(this)"></i></a>' }
                                                                    
            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0,1,5],
                 "visible": false,
                 "searchable": false
             },
             {//custom js functions can be callled in render property for that target column
                 "render": function (data, type, row) {
                      return ConvertJsonToDate(data);
                 },
                 "targets": 4
             },
             {
                 "render": function (data, type, row) {
                     return row.ChurchName + ',' + row.TownName;
                 },
                  "targets": 2
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
            dom: '<"top"f>rt<"bottom"ip><"clear">',
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
             
              { "data": "RoleName", "defaultContent": "<i>-</i>" },
              { "data": "TownName", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditUsers(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveUser(this)"></i></a>' }

            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0, 1],
                 "visible": false,
                 "searchable": false
             },
              {
                  "render": function (data, type, row) {
                      return row.ChurchName + ',' + row.TownName;
                  },
                  "targets": 4
              }
         ]
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

  

    try {
      
        var OrgDesignationMaster = new Object();
        DashDataTables.designationTable= $('#Designationtable').DataTable(
        {
            dom: '<"top"f>rt<"bottom"ip><"clear">',
            order: [],
            searching: true,
            paging: true,
            data: GetAllDesignation(OrgDesignationMaster),
            columns: [
              { "data": "DesigID" },
               { "data": "OrgType", "defaultContent": "<i>-</i>" },
              { "data": "Position", "defaultContent": "<i>-</i>" },
              { "data": "Order", "defaultContent": "<i>-</i>" },
              { "data": "Organization", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditDesignation(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveDesignation(this)"></i></a>' }
            ],
            columnDefs: [//this object is to alter the display cell value not the actual value
             {
                 //hiding hidden column fields 
                 "targets": [0,1],
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
              { "data": "ImageID" },
              { "data": "Name", "defaultContent": "<i>-</i>" },
              { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
              { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditSaint(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveSaint(this)"></i></a>' }
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
                  "targets": 3
              }
            ]
           
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    $('#btnRequestReject').click(function (e) {
        
        Church.churchId = $("#hdfChurchID").val();
        Church.RequestStatus = 2;
        UpdateRequest(Church);
        BindAllRequestChurches()
        BindAllChurches();
    });
    $('#btnRequestChurchAdd').click(function (e) {
        try {
            
            var churchbit = ChurchReqValidation();
            if (churchbit) {
                Church.churchName = ($('#txtReqChurchName').val() != "" ? $('#txtReqChurchName').val() : "");
                Church.townCode = ($("#idddlReqTownCode").val() != "" ? $("#idddlReqTownCode").val() : "");
                Church.address = ($('#txReqtAddress').val() != "" ? $('#txtReqAddress').val() : "");
                Church.description = ($('#txtReqDescription').val() != "" ? $('#txtReqDescription').val() : "");
                Church.about = ($('#txtReqAbout').val() != "" ? $('#txtReqAbout').val() : "");
                Church.phone1 = ($('#txtReqPhone1').val() != "" ? $('#txtReqPhone1').val() : "");
                Church.phone2 = ($('#txtReqPhone2').val() != "" ? $('#txtReqPhone2').val() : "");
                Church.longitude = ($('#txtReqLongitude').val() != "" ? $('#txtReqLongitude').val() : "");
                Church.latitude = ($('#txtReqLatitude').val() != "" ? $('#txtReqLatitude').val() : "");
                Church.mainImageId = $("#hdfChurchImageID").val();
                Church.churchId=$("#hdfChurchID").val();
                var result = InsertChurch(Church);
                switch (result.status) {
                    case "1":
                        noty({ type: 'success', text: Messages.InsertionSuccessFull });
                        Church.RequestStatus = 1;
                        UpdateRequest(Church);
                        BindAllRequestChurches()
                        BindAllChurches();

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
        catch (e) {
            noty({ type: 'error', text: e.message });
        }

    });
    
    $('#btnChurchAdd').click(function (e) {
        
        try {
        var churchbit = ChurchValidation();

     
          

            if (churchbit)
            {
                var Church = new Object();
                Church.churchName = (($('#txtChurchName').val() != "" && $('#txtChurchName').val() != null) ? $('#txtChurchName').val() : "");
                Church.townCode = ($(".ddlTownCode").val() != "" ? $(".ddlTownCode").val() : "");
                Church.address = ($('#txtAddress').val() != "" ? $('#txtAddress').val() : "");
                Church.description = ($('#txtDescription').val() != "" ? $('#txtDescription').val() : "");
                Church.about = ($('#txtAbout').val() != "" ? $('#txtAbout').val() : "");
                Church.phone1 = ($('#txtPhone1').val() != "" ? $('#txtPhone1').val() : "");
                Church.phone2 = ($('#txtPhone2').val() != "" ? $('#txtPhone2').val() : "");
                Church.longitude = ($('#txtLongitude').val() != "" ? $('#txtLongitude').val() : "");
                Church.latitude = ($('#txtLatitude').val() != "" ? $('#txtLatitude').val() : "");

                if ($("#hdfChurchID").val() == '') {
                    //INSERT
                    ///////Image insert using handler
                    var imgresult;
                    if ((imgresult = $('#churchimageuploader')[0].files.length > 0)) {
                      
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#churchimageuploader')[0].files[0];
                        formData.append('upImageFile', imagefile, imagefile.name);
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
                                BindAllChurches();
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                    else {
                        var result = InsertChurch(Church);
                        switch (result.status) {
                            case "1":
                                noty({ type: 'success', text: Messages.InsertionSuccessFull });
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                BindAllChurches();
                                
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });

                                break;

                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                } //UPDATE
                else {
                    //check image for updat
                    if ((imgresult = $('#churchimageuploader')[0].files.length > 0)) {
                        
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#churchimageuploader')[0].files[0];
                        formData.append('upImageFile', imagefile, imagefile.name);
                        formData.append('churchid', $("#hdfChurchID").val());
                        formData.append('ChurchImageID', $('#hdfChurchImageID').val());
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

                        switch (result.status) {
                            case "1":
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                            
                                    BindAllChurches();
                               
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
                        Church.churchId = $("#hdfChurchID").val();
                      
                        var result = UpdateChurch(Church);
                        switch (result.status) {
                            case "1":
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                                BindAllChurches();
                              
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });

                                break;

                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }//else
                }//else
            }//churchflag if



        }
        catch (e) {
            noty({ type: 'error', text: e.message });
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
            $("#hdfChurchImageID").val('');
            $("#ChurchPreview").attr('src', '/img/defaultalbumadd.jpg');
            //it clears all child page form elemets 
            //clears upload control
            $('#form1').get(0).reset();
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
            //$(".ddlRoleName").select2("val", "");
            $("#ddlChurchinRoles").select2("val", "");
            DashDataTables.roleTable.search('').draw(false);
            $("#idddlRoleName").select2("val", "");
            $("#hdfRolesID").val('');
            //it clears all child page form elemets 
            //clears upload control
          //  $('#form1').get(0).reset();
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
     });

    $('.UserClear').click(function (e) {
        $("#idddlRoles").select2("val", "");
        try
        {
            
            RemoveStyle();
            DashDataTables.userTable.search('').draw(false);
            $("#ddlChurchinUsers").select2("val", "");
            $("#txtUserName").val('');
            $("#txtUserAddress").val('');
            $("#txtMobile").val('');
            $("#txtEmail").val('');
            $("#chkActive").parent().addClass('checked');
            $("#datepickerdob").val('');
            $("#txtLoginName").prop("readonly", false);
            $("#txtLoginName").val('');
            $("#txtPassword").val('');
            $("#txtconfirmpswd").val('');
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

            $("#idddlOrganization").select2("val", "");
            DashDataTables.designationTable.search('').draw(false);
            $("#txtPosition").prop("readonly", false);
            $("#txtPosition").val('');
            $("#txtOrder").val('');

            $("#hdfDesignationID").val('');
            //it clears all child page form elemets 
            //clears upload control
           // $('#form1').get(0).reset();
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
            //it clears all child page form elemets 
            //clears upload control
            $('#form1').get(0).reset();
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
     
    });

  
    $('#btnUserAdd').click(function (e) {
      try
      {
          
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
               
                noty({ type: 'error', text: Messages.PasswordNotMatch });
            }
            if (userflag&&pasflag)
            {
                Users = new Object();
                Church = new Object();
                Roles = new Object();
                Church.churchId = (($("#ddlChurchinUsers").val() != "" && $("#ddlChurchinUsers").val() != null)? $("#ddlChurchinUsers").val() : "");//dropdownContainer.ddlChurch.select2().val();
                Users.Name = (($("#txtUserName").val() != "" && $("#txtUserName").val() != null) ? $('#txtUserName').val() : "");
                Users.Address = (($("#txtUserAddress").val()!= "" && $("#txtUserAddress").val() != null) ? $('#txtUserAddress').val() : "");
                Users.Mobile = (($("#txtMobile").val() != "" && $("#txtMobile").val() != null) ? $('#txtMobile').val() : "");
                Users.Email = (($("#txtEmail").val()!= "" && $("#txtEmail").val() != null) ? $('#txtEmail').val() : "");
               
                if ($('#optionMale').is(':checked')) {
                    Users.Gender = "Male";
                }
                else {
                    Users.Gender = "Female";
                }
                
                Roles.ID = (($('#idddlRoles').val() != "" && $("#idddlRoles").val() != null) ? $('#idddlRoles').val() : "");
                    if ($('#idddlRoles').find('option:selected').text() == 'Admin')
                    {
                        //Make the user as admin
                        Users.Administrator = 'True';
                    }
                
               
                if ($("#chkActive").parent().attr('class') != "") {
                    Users.Active = 'True';
                }
                Users.DOB = (($("#datepickerdob").val()!= "" && $("#datepickerdob").val() != null) ? $('#datepickerdob').val() : "");
                Users.LoginName = (($("#txtLoginName").val()!= "" && $("#txtLoginName").val() != null) ? $('#txtLoginName').val() : "");
                Users.Password = (($("#txtconfirmpswd").val()!= "" && $("#txtconfirmpswd").val() != null) ? $('#txtconfirmpswd').val() : "");
                Users.churchObj = Church;
                Users.rolesObj = Roles;

                if ($("#hdfUserID").val() == "") {
                    //INSERT

                    var result = InsertUser(Users);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.InsertionSuccessFull });
                            BindAllUsers();
                            $("#hdfUserID").val(result.ID);
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.InsertionFailure });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.LoginNameExists });
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
                    Users.LoginName = '';
                    Users.ID = $("#hdfUserID").val();
                    var result = UpdateUser(Users);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.UpdationSuccessFull });
                            BindAllUsers();
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.UpdationFailure });
                            $('#txtPassword').val('');
                            $('#txtconfirmpswd').val('');
                            var cofirmpswd = document.getElementById('txtconfirmpswd');
                            cofirmpswd.removeAttribute('style');
                            break;
                        case "2":
                            //login name already exists but edited successfully
                            noty({ type: 'success', text: Messages.LoginNameExistsUpdated });
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
            
           
            var rolesflag = RolesValidation();
            if (rolesflag)
            {
                var Roles = new Object();
                var Church = new Object();
                if ($(".ddlRoleName").val() != "") {
                    Roles.RoleName = $(".ddlRoleName").val();
                }
                if ($("#ddlChurchinRoles").val() != "") {
                    Church.churchId = $("#ddlChurchinRoles").val();
                }
                if ($("#hdfRolesID").val() == '') {
                    //INSERT
                    Roles.churchObj = Church;
                    var result = InsertRoles(Roles);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.InsertionSuccessFull });
                            
                            BindAllRoles();
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.InsertionFailure });
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.AlreadyExistsMsgCaption });
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
                            noty({ type: 'success', text: Messages.UpdationSuccessFull });

                            BindAllRoles();
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.UpdationFailure });
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.AlreadyExistsMsgCaption });
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
           
            var desiggflag = DesignationValidation();
            if (desiggflag)
            {
                var OrgDesignationMaster = new Object();
                var Church = new Object();
                    OrgDesignationMaster.position = (($("#txtPosition").val() != "" && $("#txtPosition").val() != null) ? $('#txtPosition').val() : "");
                    OrgDesignationMaster.orgType = (($("#idddlOrganization").val()!= "" && $("#idddlOrganization").val() != null) ? $('#idddlOrganization').val() : "");
                    OrgDesignationMaster.order = (($("#txtOrder").val() != "" && $("#idddlOrganization").val() != null) ? $("#txtOrder").val() : "");
                

                if ($("#hdfDesignationID").val() == '') {
                    //INSERT
                    OrgDesignationMaster.churchObj = Church;
                    var result = InsertDesignation(OrgDesignationMaster);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.InsertionSuccessFull });
                            BindAllDesignation();
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.InsertionFailure });
                            
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.AlreadyExistsMsgCaption });
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
                            noty({ type: 'success', text: Messages.UpdationSuccessFull });
                            BindAllDesignation();
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.UpdationFailure });
                           
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.AlreadyExistsMsgCaption });
                            break;
                            noty({ type: 'error', text: Messages.UpdationFailureOrderDuplicate });
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

        try {
      
           
            var saintflag = PatronValidation();
            if (saintflag) {
                var PatronMaster = new Object();
                PatronMaster.patronMasterName = (($("#txtSaintName").val()!= "" && $("#txtSaintName").val() != null) ? $('#txtSaintName').val() : "");
                PatronMaster.description = (($("#txtSaintDescription").val()!= "" && $("#txtSaintDescription").val() != null) ? $('#txtSaintDescription').val() : "");
               

                if ($("#hdfPatronID").val() == '') {
                    //INSERT
                    ///////Image insert using handler
                    var imgresult;
                    if ((imgresult = $('#UpSaint')[0].files.length > 0)) {
                 
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#UpSaint')[0].files[0];
                        // imagefile.name = imgId;
                        formData.append('upImageFile', imagefile, imagefile.name);
                        formData.append('patronName', PatronMaster.patronMasterName);
                        formData.append('description', PatronMaster.description);
                        formData.append('createdby', document.getElementById("LoginName").innerHTML);
                        formData.append('ActionTyp', 'PatronImageInsert');
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        switch (result.status) {
                            case "1":
                                BindPatrons();
                                noty({ type: 'success', text: Messages.InsertionSuccessFull });
                                $("#hdfPatronID").val(result.patronMasterId);
                                $("#hdfPatronImageID").val(result.imageID);
                                break;                          
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                    else {
                        var result = InsertPatron(PatronMaster);
                        switch (result.status) {
                            case "1":
                                noty({ type: 'success', text: Messages.InsertionSuccessFull });
                                $("#hdfPatronID").val(result.patronMasterId);
                                $("#hdfPatronImageID").val(result.imageID);
                                BindPatrons();
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });

                                break;
                           
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                } //UPDATE
                else {
                    //check image for updat
                    if ((imgresult = $('#UpSaint')[0].files.length > 0)) {
                  
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#UpSaint')[0].files[0];
                        formData.append('upImageFile', imagefile, imagefile.name);
                        formData.append('patronName', PatronMaster.patronMasterName);
                        formData.append('description', PatronMaster.description);
                        formData.append('patronID', $("#hdfPatronID").val())
                        formData.append('patronImageID', $("#hdfPatronImageID").val())
                        formData.append('updatedby', document.getElementById("LoginName").innerHTML);
                        formData.append('ActionTyp', 'PatronImageUpdate');
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                        switch (result.status) {
                            case "1":
                                $("#hdfPatronID").val(result.patronMasterId);
                                $("#hdfPatronImageID").val(result.imageID);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                                BindPatrons();
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
                        PatronMaster.patronMasterId = $("#hdfPatronID").val();
                        var result = UpdatePatron(PatronMaster);
                        switch (result.status) {
                            case "1":
                                $("#hdfPatronID").val(result.patronMasterId);
                                $("#hdfPatronImageID").val(result.imageID);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });

                                BindPatrons();
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });

                                break;
                          
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }//else
                }//else
            }//patronflag if



        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }

    });

   
   

    try {
          
        var TownMaster = new Object();
        DashDataTables.townTable= $('#Townstable').DataTable(
        {
           
                order: [0],
                searching: true,
                paging: true,
                data: GetAllTowns(TownMaster),
                columns: [
                  { "data": "Code" },
                  { "data": "ImageID" },
                  { "data": "Name", "defaultContent": "<i>-</i>" },
                  { "data": "CreatedDate", "defaultContent": "<i>-</i>" },
                  { "data": null, "orderable": false, "defaultContent": '<a class="circlebtn circlebtn-info" onclick="EditTown(this)"><i class="halflings-icon white edit" ></i></a><a class="circlebtn circlebtn-danger"><i class="halflings-icon white trash" onclick="RemoveTown(this)"></i></a>' }
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
                      "targets": 3
                  }
                ]
           
           
           
        });
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    $(".clearTown").click(function (e) {
        $("#hdfTownCode").val('');
        $("#hdfTownImageID").val('');
        $("#txtName").val('');
        $("#TownPreview").attr('src', '/img/defaultalbumadd.jpg');
        //resetting the upload control
        //$('#townimageuploader')[0].files.length = 0;
        //it clears all child page form elemets 
        //clears upload control
        $('#form1').get(0).reset();
    });

    $('#btnTownAdd').click(function (e) {

        try {
         
            var i;
            var townflag = TownValidation();
            if (townflag)
            {
                var TownMaster = new Object();
                    TownMaster.name = (($("#txtName").val() != "" && $("#txtName").val() != null) ? $('#txtName').val() : "");

                if ($("#hdfTownCode").val() == '') {
                    //INSERT
                ///////Image insert using handler
                var imgresult;
                if ((imgresult = $('#townimageuploader')[0].files.length > 0)) {
                 
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


            $('[data-toggle="popover"]').popover();
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }

    });

    
    
});//end of document.ready

function TownValidation() {
   
   
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
    
    var TownMaster = new Object();

    TownMaster.code = data.Code;
    $("#hdfTownCode").val(TownMaster.code);
    var townDetail = GetTownDetailByCode(TownMaster);
    if (townDetail != undefined && townDetail != null) {
        $("#txtName").val(townDetail[0].Name != null && townDetail[0].Name != "" ? townDetail[0].Name : '');
        if (townDetail[0].URL == null) {
            $("#TownPreview").attr('src', '/img/defaultalbumadd.jpg');
        }
        else {
            $("#TownPreview").attr('src', townDetail[0].URL + '?' + new Date().getTime());
        }
        $("#hdfTownImageID").val(townDetail[0].ImageID);
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



function RemoveTown(curobj) {
    
    try {
        var r = confirm("Are You Sure to Delete?");
        if (r == true) {
            var data = DashDataTables.townTable.row($(curobj).parents('tr')).data();
            var TownMaster = new Object();
            var AppImages = new Object();
            TownMaster.imageId = data.ImageID;
            TownMaster.code = data.Code;
            TownMaster.appImagesObj = AppImages;
            var jsonResultTown = DeleteTown(TownMaster);
            switch (jsonResultTown.status) {
                case "1":
                    noty({ type: 'success', text: Messages.DeletionSuccessFull });
                    BindAllTown();
                    break;
                case "0":
                    noty({ type: 'error', text: Messages.DeletionFailure });
                case "2":
                    noty({ type: 'error', text: Messages.DeletionFailureUsed });
                    break;
                default:
                    noty({ type: 'error', text: jsonResultTown.status });
                    break;
            }
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
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
function BindAllRequestChurches() {
    //DataTable rebind using its api
    var Church = new Object();
    DashDataTables.churchReqtable.clear().rows.add(GetAllRequestChurch()).draw(false);
    $("#txtReqChurchName").val('');
    $(".ddlTownCode").select2("val", "");
    $("#txtReqAddress").val('');
    $("#txtReqDescription").val('');
    $("#txtReqAbout").val('');
    $("#txtReqPhone1").val('');
    $("#txtReqPhone2").val('');
    $("#txtReqLongitude").val('');
    $("#txtReqLatitude").val('');
    $("#hdfChurchID").val('');
    $("#hdfChurchImageID").val('');
    $("#ChurchRequestPreview").attr('src', '/img/defaultalbumadd.jpg');
    $('#churchRequestimageuploader').val('');
    $('#SuggestedDiv').hide();

}

function DesignationValidation()
{
   
  
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
      
        return true;
    }
}
function ChurchReqValidation() {
    var ChurchName = $('#txtReqChurchName');
    var TownCode = $('#idddlReqTownCode');
    var ChurchAddress = $('#txtReqAddress');
    var phone1 = $('#txtReqPhone1');
    var longitude = $('#txtReqLongitude');
    var lattitude = $('#txtReqLatitude');
    var container = [
        { id: ChurchName[0].id, name: ChurchName[0].name, Value: ChurchName[0].value },
        { id: TownCode[0].id, name: TownCode[0].name, Value: TownCode[0].value },
        { id: ChurchAddress[0].id, name: ChurchAddress[0].name, Value: ChurchAddress[0].value },
        { id: phone1[0].id, name: phone1[0].name, Value: phone1[0].value },
        { id: longitude[0].id, name: longitude[0].name, Value: longitude[0].value },
        { id: lattitude[0].id, name: lattitude[0].name, Value: lattitude[0].value }
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
        else if (container[1].Value == "-1") {
            j = 1;
            $('.select2-selection--single').css('border', '1px solid #fb0808');
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
      return true;
    }
}


function RolesValidation()
{
  
    
    var RoleName = $('#idddlRoleName');
    var churchrole = $('#ddlChurchinRoles');

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
   
  
    var userchurch = $('#ddlChurchinUsers');
    var username = $('#txtUserName');
    var useraddress = $('#txtUserAddress');
    var usermobile = $('#txtMobile');
    var email = $('#txtEmail');
    var userroles = $('#idddlRoles');

    var userDOB = $('#datepickerdob');
    var loginname = $('#txtLoginName');
    var paswd = $('#txtPassword');
    var confpswd = $('#txtconfirmpswd');



    var container = [
        { id: userchurch[0].id, name: userchurch[0].name, Value: userchurch[0].value },
        { id: username[0].id, name: username[0].name, Value: username[0].value },
        { id: useraddress[0].id, name: useraddress[0].name, Value: useraddress[0].value },
        { id: usermobile[0].id, name: usermobile[0].name, Value: usermobile[0].value },
        { id: email[0].id, name: email[0].name, Value: email[0].value },
        { id: userroles[0].id, name: userroles[0].name, Value: userroles[0].value },
        { id: userDOB[0].id, name: userDOB[0].name, Value: userDOB[0].value },
        { id: loginname[0].id, name: loginname[0].name, Value: loginname[0].value },
        { id: paswd[0].id, name: paswd[0].name, Value: paswd[0].value },
        { id: confpswd[0].id, name: confpswd[0].name, Value: confpswd[0].value }
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
      
        return true;
    }

}

function RemoveUser(curobj)
{
  
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
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
                
                BindAllUsers();
                $('txtPassword').val('');
                $('txtconfirmpswd').val('');
                break;
            case "0":
               
                noty({ type: 'error', text: Messages.DeletionFailure });
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
  
    var data = DashDataTables.patronTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var r = confirm("Are You Sure to Delete?");
    if (r == true) {
       
        var PatronMaster = new Object();
        var AppImages = new Object();
        PatronMaster.patronMasterId = data.ID;
        PatronMaster.imageID = data.ImageID;
        PatronMaster.appImagesObj = AppImages;
        var result = DeleteSaint(PatronMaster);

        switch (result.status) {
            case "1":
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
               
                BindPatrons();
                break;
            case "0":
                noty({ type: 'error', text: Messages.DeletionFailure });
              
                break;
            case "2":
                noty({ type: 'error', text: Messages.DeletionFailureUsed });

                break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }

}
function EditRequestChurch(curobj) {
    
    //Get Current table row data
    var data = DashDataTables.churchReqtable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var Church = new Object();
    Church.churchId = data.ID;
    $("#hdfChurchID").val(Church.churchId);
    $("#hdfChurchImageID").val(data.ImageID);
    var churchReqDetail = GetChurchReqDetailsByChurchID(Church);
    //$('#lblReqUser').innerHTML = churchReqDetail.UserName;
    document.getElementById('lblReqUser').innerHTML = churchReqDetail[0].UserName;
    //$('#lblReqContact').innerHTML = churchReqDetail.ContactNumber;
    document.getElementById('lblReqContact').innerHTML = churchReqDetail[0].ContactNumber;
    $('#SuggestedDiv').show();
    $("#txtReqChurchName").val(churchReqDetail[0].ChurchName != null && churchReqDetail[0].ChurchName != "" ? churchReqDetail[0].ChurchName : '');
    var $option = $("<option selected></option>").val(churchReqDetail[0].Place).text(churchReqDetail[0].Place);
    $("#idddlReqTownCode").append($option).trigger('change');
    $("#txtReqAddress").val(churchReqDetail[0].Address != null && churchReqDetail[0].Address != "" ? churchReqDetail[0].Address : '');
    if (churchReqDetail[0].ImagePath == null) {
        $("#ChurchRequestPreview").attr('src', '/img/defaultalbumadd.jpg');
    }
    else
    {
        $("#ChurchRequestPreview").attr('src', churchReqDetail[0].ImagePath + '?' + new Date().getTime());
    }
}
function EditChurch(curobj)
{
    
    //Get Current table row data
    var data = DashDataTables.churchTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var Church = new Object();
    Church.churchId = data.ID;
    $("#hdfChurchID").val(Church.churchId);
    $("#hdfChurchImageID").val(data.MainImageID);
    var churchDetail = GetChurchDetailsByChurchID(Church);
    $("#txtChurchName").val(churchDetail[0].ChurchName != null && churchDetail[0].ChurchName != "" ? churchDetail[0].ChurchName : '');
    var $option = $("<option selected></option>").val(churchDetail[0].TownCode).text(churchDetail[0].TownName);
    $(".ddlTownCode").append($option).trigger('change');
    $("#txtAddress").val(churchDetail[0].Address != null && churchDetail[0].Address != "" ? churchDetail[0].Address : '');
    $("#txtDescription").val(churchDetail[0].Description != null && churchDetail[0].Description != "" ? churchDetail[0].Description : '');
    $("#txtAbout").val(churchDetail[0].About != null && churchDetail[0].About != "" ? churchDetail[0].About : '');
    $("#txtPhone1").val(churchDetail[0].Phone1 != null && churchDetail[0].Phone1 != "" ? churchDetail[0].Phone1 : '');
    $("#txtPhone2").val(churchDetail[0].Phone2 != null && churchDetail[0].Phone2 != "" ? churchDetail[0].Phone2 : '');
   
    $("#txtLongitude").val(churchDetail[0].Longitude != null && churchDetail[0].Longitude != "" ? churchDetail[0].Longitude : '');
    $("#txtLatitude").val(churchDetail[0].Latitude != null && churchDetail[0].Latitude != "" ? churchDetail[0].Latitude : '');
    if (churchDetail[0].ImageURL == null) {
        $("#ChurchPreview").attr('src', '/img/defaultalbumadd.jpg');
    }
    else {
        $("#ChurchPreview").attr('src', churchDetail[0].ImageURL + '?' + new Date().getTime());
    }
}

function EditUsers(curobj)
{
    
    RemoveStyle();
    //Getting ID from datatable selected row
    var data = DashDataTables.userTable.row($(curobj).parents('tr')).data();
    var Users = new Object();
    Users.ID = data.UserID;
    $("#hdfUserID").val(Users.ID);
    var userDetail = GetUserDetailsByUserID(Users);

    var $option = $("<option selected></option>").val(userDetail[0].ChurchID).text(userDetail[0].ChurchName);
    $("#ddlChurchinUsers").append($option).trigger('change');
    $("#txtUserName").val(userDetail[0].UserName != null && userDetail[0].UserName != "" ? userDetail[0].UserName : '');
    $("#txtUserAddress").val(userDetail[0].Address != null && userDetail[0].Address != "" ? userDetail[0].Address : '');
    $("#txtMobile").val(userDetail[0].Mobile != null && userDetail[0].Mobile != "" ? userDetail[0].Mobile : '');
    $("#txtEmail").val(userDetail[0].Email != null && userDetail[0].Email != "" ? userDetail[0].Email : '');
    switch(userDetail[0].Gender)
    {
        case 'Male':
              $("#optionFemale").parent().removeClass('checked');
             $("#optionMale").parent().addClass('checked');
             break;
        case 'Female':
            $("#optionMale").parent().removeClass('checked');
            $("#optionFemale").parent().addClass('checked');
            break;
    }
  
    $("#idddlRoles").val(userDetail[0].RoleID).trigger("change");
    if (userDetail[0].Active == true)
    {
       $("#chkActive").parent().addClass('checked');
    }
    else
    {
        $("#chkActive").parent().removeClass('checked');
    }

    $("#txtLoginName").prop("readonly", true);

    $("#txtLoginName").val(userDetail[0].LoginName != null && userDetail[0].LoginName != "" ? userDetail[0].LoginName : '');

    $("#datepickerdob").val(userDetail[0].DOB != null && userDetail[0].DOB != "" ? ConvertJsonToDate(userDetail[0].DOB) : '');

    $('#txtPassword').val('*****');//5 stars
    $('#txtconfirmpswd').val('*****');
   
   
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
    
     
    var data = DashDataTables.roleTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
   
    var Roles = new Object();
    Roles.ID = data.RoleID;
    $("#hdfRolesID").val(Roles.ID);
    var roleDetail = GetRoleDetailByRoleID(Roles);
    var $option = $("<option selected></option>").val(roleDetail[0].ChurchID).text(roleDetail[0].ChurchName);
    $("#ddlChurchinRoles").append($option).trigger('change');
    $("#idddlRoleName").val(roleDetail[0].RoleName).trigger("change");
  
}


function EditDesignation(curobj)
{
    var data = DashDataTables.designationTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var OrgDesignationMaster = new Object();
    OrgDesignationMaster.orgDesignationMasterID = data.DesigID;
    $("#hdfDesignationID").val(OrgDesignationMaster.orgDesignationMasterID);
    var designationDetail = GetDesignationDetailByID(OrgDesignationMaster);
    $("#txtPosition").prop("readonly", true);
    $("#txtPosition").val(designationDetail[0].Position != null && designationDetail[0].Position != "" ? designationDetail[0].Position: '');
    $("#txtOrder").val(designationDetail[0].Order != null && designationDetail[0].Order != "" ? designationDetail[0].Order: '');
    $("#idddlOrganization").val(designationDetail[0].OrgType).trigger("change");
 }

function EditSaint(curobj) {
    
    var data = DashDataTables.patronTable.row($(curobj).parents('tr')).data();
    RemoveStyle();
    var PatronMaster = new Object();
    PatronMaster.patronMasterId = data.ID;
    PatronMaster.imageID = data.ImageID;
    $("#hdfPatronID").val(PatronMaster.patronMasterId);
    $("#hdfPatronImageID").val(PatronMaster.imageID);

    var PatronDetail = GetPatronDetailByID(PatronMaster);
    $("#txtSaintName").val(PatronDetail[0].Name != null && PatronDetail[0].Name != "" ? PatronDetail[0].Name: '');
    $("#txtSaintDescription").val(PatronDetail[0].Description != null && PatronDetail[0].Description != "" ? PatronDetail[0].Description: '');
    $("#hdfPatronID").val(PatronDetail[0].ID);
    if (PatronDetail[0].URL==null)
    {
       
        $("#imgSaint").attr('src', '/img/defaultalbumadd.jpg');
    }
    else
    {
        $("#imgSaint").attr('src', PatronDetail[0].URL + '?' + new Date().getTime());
    }
}
function GetChurchReqDetailsByChurchID(Church) {
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetChurchReqDetailsByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
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
        var AppImages = new Object();
        Church.churchId = data.ID;
        Church.appImagesObj = AppImages;
        Church.mainImageId = data.MainImageID;
        var result = DeleteChurch(Church);
        switch (result.status) {
            case "1":
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
                try {
                    BindAllChurches();
                    //Clear forms
                    $('.ChurchClear').click();

                }
                catch (e)
                {
                    noty({ type: 'error', text: e.message });
                }
              
                break;
           case "0":
               noty({ type: 'error', text: Messages.DeletionFailure });
               
               break;

            case "2":
                noty({ type: 'error', text: Messages.DeletionFailureUsed });

                break;
            default:
                noty({ type: 'error', text: result.status });
                break;
        }

    }

}


function RemoveRole(curobj)
{
   
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
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
                BindAllRoles();
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
                noty({ type: 'success', text: Messages.DeletionSuccessFull });
                BindAllDesignation();
                break;
            case "0":
                noty({ type: 'success', text: Messages.DeletionFailure });
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
function GetAllRequestChurch() {

    var ds = {};
    var table = {};
    var Church = new Object();
    var data = "{'churchObj':" + JSON.stringify(Church) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetRequestChurchDetails");
    table = JSON.parse(ds.d);
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
   
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ChurchPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function GetAllRolesByChurch(Roles) {
    try {

        var ds = {};
        var table = {};
        try {
            var data = "{'rolesObj':" + JSON.stringify(Roles) + "}";
            ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllRolesByChurch");
            table = JSON.parse(ds.d);
        }
        catch (e) {

        }
        return table;
    }
    catch (e) {

    }
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
function BindRolesByChurch(Roles)
{
    try {

        DashDataTables.roleTable.clear().rows.add(GetAllRolesByChurch(Roles)).draw(false);
        
    }
    catch (e) {

    }
}


function BindAllRoles() {
   
    var Roles = new Object();
    try {
      
        DashDataTables.roleTable.clear().rows.add(GetAllRoles(Roles)).draw(false);
    }
    catch (e) {

    }
}

function BindUsersByChurch(Users)
{
    try
    {
        DashDataTables.userTable.clear().rows.add(GetAllUsersByChurch(Users)).draw(false);
    }
    catch(e)
    {

    }

}

function GetAllUsersByChurch(Users)
{
    var ds = {};
    var table = {};
    try {
        var data = "{'usersObj':" + JSON.stringify(Users) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllUsersByChurch");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
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
function BindDesignationByOrganization(OrgDesignationMaster)
{
    try {
        DashDataTables.designationTable.clear().rows.add(GetAllDesignationByOrganization(OrgDesignationMaster)).draw(false);
    }
    catch (e) {

    }
}

function GetAllDesignationByOrganization(OrgDesignationMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllDesignationByOrganization");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function GetAllDesignation(OrgDesignationMaster) {
    var ds = {};
    var table = {};
    try {
        var data = "{'designationObj':" + JSON.stringify(OrgDesignationMaster) + "}";
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
function UpdateRequest(Church)
{
    var ds = {};
    var table = {};
    var data = "{'churchObj':" + JSON.stringify(Church) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateRequest");
    table = JSON.parse(ds.d);

    return table;
}
function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);

    return table;
}


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
//    
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
            mapTypeId: google.maps.MapTypeId.HYBRID,
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
            $("#txtReqLongitude").val(place.geometry.location.lng());
            $("#txtReqLatitude").val(place.geometry.location.lat());
        });

       // var jlm = new google.maps.Map(document.getElementById('map'), map);
        google.maps.event.addListener(map, 'click', function (e) {
            
            $("#txtLongitude").val(e.latLng.lng());
            $("#txtLatitude").val(e.latLng.lat());
            $("#txtReqLongitude").val(e.latLng.lng());
            $("#txtReqLatitude").val(e.latLng.lat());

            document.getElementById("spanLatitude").innerHTML = e.latLng.lat();
            document.getElementById("spanLongitude").innerHTML = e.latLng.lng();
        });

      
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
   
}