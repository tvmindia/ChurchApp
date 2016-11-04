$(document).ready(function () {
    //////////----------Function for check priest details and bind 
    check();
    //////////-----------Main button event for Save, Update
    $('#btnSavePriest').click(function (e) {

        debugger;

        var AppImgURL = '';
        var priestID = $("#hdfPriestID").val();

        //-----------------------INSERT-------------------//

        if (priestID == null || priestID == "") {
            var guid = createGuid();

            //DeletedImgID = imageId;
            //DeletedImgPath = imgPath

            if (guid != null) {

                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile, logoFile, img;

                if (((imagefile = $('#priestimg')[0].files[0]) != undefined)) {
                    var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#priestimg')[0].files[0]) != undefined) {
                        tempFile.name = guid;
                        formData.append('NoticeAppImage', tempFile, tempFile.name);
                        formData.append('GUID', guid);
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                }

            }

            var Priest = new Object();
            Priest.priestName = $('#txtPriestName').val();
            Priest.BaptisumName = $('#txtPriestBaptismName').val();
            Priest.Parish = $('#txtParish').val();
            Priest.Diocese = $('#txtDiocese').val();
            Priest.Status = $('#ddlstatus').val();
            Priest.dob = $('#priestDOB').val();
            Priest.about = $('#txtAboutPriest').val();
            Priest.dateOrdination = $('#OrdinationDate').val();
            Priest.designation = $('#txtDesignation').val();
            Priest.address = $('#txtAddress').val();
            Priest.emailId = $('#txtEmail').val();
            Priest.mobile = $('#txtMobile').val();
            Priest.imageId = guid;
            Priest.priestID = guid;

            result = InsertPriest(Priest);

            if (result.result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Priest Added Successfully");

            }
            if (result.result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }

            //BindNotices();
            // ClearControls();

            debugger;
            //SetControlsInNewNoticeFormat();


        }
            //-----------------------UPDATE-------------------//
        else {
            var Priest = new Object();
            Priest.priestName = $('#txtPriestName').val();
            Priest.BaptisumName = $('#txtPriestBaptismName').val();
            Priest.Parish = $('#txtParish').val();
            Priest.Diocese = $('#txtDiocese').val();
            Priest.Status = $('#ddlstatus').val();
            Priest.dob = $('#priestDOB').val();
            Priest.about = $('#txtAboutPriest').val();
            Priest.dateOrdination = $('#OrdinationDate').val();
            Priest.designation = $('#txtDesignation').val();
            Priest.address = $('#txtAddress').val();
            Priest.emailId = $('#txtEmail').val();
            Priest.mobile = $('#txtMobile').val();
            Priest.imageId = $("#hdfPriestID").val();
            Priest.priestID = $("#hdfPriestID").val();
            
           // DeletedImgID = imageId;
           // DeletedImgPath = imgPath
            debugger;
            var guid = createGuid();
            if (((imagefile = $('#priestimg')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#priestimg')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Priest.imageId = guid;
            }

            result = UpdatePriest(Priest);

            if (result.result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Priest Edited Successfully");

                //if (DeletedImgID != '') {
                //    var AppImages = new Object();
                //    AppImages.appImageId = DeletedImgID;
                //    DeleteAppImage(AppImages);

                //    if (DeletedImgPath != '') {
                //        DeleteFileFromFolder(DeletedImgPath);
                //    }
                //}

            }
            if (result.result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Saving Not Successful");
            }

            //SetControlsInNewNoticeFormat();

        }

    });

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////---------Json data transfer
    function getJsonData(data, page) {
        var jsonResult = {};
        var req = $.ajax({
            type: "post",
            url: page,
            data: data,
            delay: 3,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json"

        }).done(function (data) {
            jsonResult = data;
        });
        return jsonResult;
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////****************** Function For changing jason date format to local
    function ConvertJsonToDate(jsonDate) {
        if (jsonDate != null) {
            var dateString = jsonDate.substr(6);
            var currentTime = new Date(parseInt(dateString));
            var month = currentTime.getMonth();
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();
            var monthNames = [
                          "Jan", "Feb", "Mar",
                          "Apr", "May", "Jun", "Jul",
                          "Aug", "Sep", "Oct",
                          "Nov", "Dec"
            ];
            var result = day + '-' + monthNames[month] + '-' + year;
            return result;
        }
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////*********************** Function for binding priest list vicar and asst vicar
    function check() {
        var priestDetails = {};
        var elems = $();
        var elemsAsst = $();
        var elemsEmtyVicar = $();
        var elemsEmtyAsstVicar = $();
        priestDetails = GetPriestUsingChurchID('99311e06-65dd-471e-904e-04702f2c4fb0');
        if (priestDetails.length == 0)
        {
            $('#VicarDefault').remove();
            $('#AsstVicarDefault').remove();
            elemsEmtyVicar = elemsEmtyVicar.add(HtmlBindVicar());
            $('#VicarDivDisplay').append(elemsEmtyVicar);
            elemsEmtyAsstVicar = elemsEmtyAsstVicar.add(HtmlBindAsstVicar());
            $('#assVicardiv').append(elemsEmtyAsstVicar);

        }
        else
        {
            for (var i = 0; i < priestDetails.length; i++) {
                if (priestDetails[i].IsActive != "False") {
                    if (priestDetails[i].Status == "Vicar") {
                        $('#VicarDefault').remove();
                        elems = elems.add(HtmlBindProductWithOffer(priestDetails[i]));
                        $('#VicarDivDisplay').append(elems);
                    }
                    if (priestDetails[i].Status == "Asst Vicar") {
                        $('#AsstVicarDefault').remove();
                        elemsAsst = elemsAsst.add(HtmlBindWithAsst(priestDetails[i]));
                        $('#assVicardiv').append(elemsAsst);
                    }
                }
            }
        }
        
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////***************************** Clear fields 
    function ClearFields()
    {
        $(':input').each(function () {

            if (this.type == 'text' || this.type == 'textarea' || this.type=='file') {
                this.value = '';
            }
            else if (this.type == 'radio' || this.type == 'checkbox') {
                this.checked = false;
            }
            else if (this.type == 'select-one' || this.type == 'select-multiple') {
                this.value = 'All';
            }
        });

    }
    //Check if Priest Exist for church and obtain the details
    function GetPriestUsingChurchID(ChurchID) {
        debugger;
        var ds = {};
        var table = {};
        var Priest = new Object();
        Priest.ChurchID = ChurchID;
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/Priests.aspx/GetPriestsDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    // Get the priest details using the priest ID for view more details
    function GetPriestDetailsUsingPiestID(priestID) {
        var ds = {};
        var table = {};
        var Priest = new Object();
        Priest.priestID = priestID;
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/Priests.aspx/GetPriestsDetailsUsingPriestID");
        table = JSON.parse(ds.d);
        return table;
    }
    // Create new vicar and new Asst Vicar section
    function OpenNewAdd(Tag) {
        ClearFields();
        $('#hdfPriestID').val('');
        if (Tag == "Asst")
        {
            document.getElementById('HeadDetails').innerText = "Add New Asst Vicar";
            $('#btnSavePriest').attr('name','Asst');
        }
        if (Tag == "Vicar")
        {
            document.getElementById('HeadDetails').innerText = "Add New Vicar";
            $('#btnSavePriest').attr('name','Vicar');
        }
        $('#PriestShowDetails').hide();
        $('#PriestEd').show();
        
    }
    //Onclick function for view priest details
    function OpenPriestDetails(priestID) {
        BindDetails(priestID);
        $('#PriestShowDetails').show();
        $('#PriestEd').hide();
    }
//Bind Details to view
    function BindDetails(priestID) {
        var PriestRow = {};
        PriestRow = GetPriestDetailsUsingPiestID(priestID);
        
        document.getElementById('lblName').innerText = PriestRow.priestName;
        document.getElementById('lblBapName').innerText = PriestRow.BaptisumName;
        document.getElementById('lblEmail').innerText = PriestRow.emailId;
        document.getElementById('lblMobile').innerText = PriestRow.mobile;
        document.getElementById('lblParish').innerText = PriestRow.Parish;
        document.getElementById('lblAddress').innerText = PriestRow.address;
        document.getElementById('lblDiocese').innerText = PriestRow.Diocese;
        document.getElementById('lblDob').innerText = PriestRow.dob;
        document.getElementById('lblAbout').innerText = PriestRow.about;
        document.getElementById('lblOrdination').innerText = PriestRow.dateOrdination;
        document.getElementById('lblDesignation').innerText = PriestRow.designation;
        document.getElementById('lblStatus').innerText = PriestRow.Status;
        $('#priestDetailPreview').attr('src', PriestRow.imagePath);
        $('#iconEditPriest').attr('name', PriestRow.priestID);
        
    }
// Bind Details for edit
    function editPriestDetails(this_obj)
    {
        var priestid = $(this_obj).attr('name');
        var PriestRow = {};
        PriestRow = GetPriestDetailsUsingPiestID(priestid);
        $('#txtPriestName').val(PriestRow.priestName);
        $('#txtPriestBaptismName').val(PriestRow.BaptisumName);
        $('#txtParish').val(PriestRow.Parish);
        $('#txtDiocese').val(PriestRow.Diocese);
        $('#priestDOB').val(PriestRow.dob);
        $('#txtAboutPriest').val(PriestRow.about);
        $('#OrdinationDate').val(PriestRow.dateOrdination);
        $('#ddlstatus').val(PriestRow.Status).change();
        $('#txtDesignation').val(PriestRow.designation);
        $('#txtAddress').val(PriestRow.address);
        $('#txtEmail').val(PriestRow.emailId);
        $('#txtMobile').val(PriestRow.mobile);
        $('#priestPreview').attr('src', PriestRow.imagePath);
        document.getElementById('HeadDetails').innerText = "Edit Details";
        $('#hdfPriestID').val( priestid);
        $('#PriestShowDetails').hide();
        $('#PriestEd').show();
    }
    // Create Guid
    function createGuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    //Insert Priest
    function InsertPriest(Priest) {
        var data = "{'PriestObj':" + JSON.stringify(Priest) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Priests.aspx/InsertPriest");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    // Update Priest
    function UpdatePriest(Priest) {
        var data = "{'PriestObj':" + JSON.stringify(Priest) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Priests.aspx/UpdatePriest");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    // Show Picture preview for file upload
    function showpreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#priestPreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    // Html code for binding Vicar with details
    function HtmlBindProductWithOffer(priestDetails, i)
    {
        debugger;
        var ID = "'" + priestDetails.ID + "'";
        var html = ('<div class="priority high"><span>Vicar</span></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="' + priestDetails.URL + '"/></li>'
          + '<li><span class="choosepic">' + priestDetails.Name + '</span> <br/>'
          + '<strong>Baptismal Name:</strong> ' + priestDetails.BaptismalName + ' <br/><strong>House Name:</strong> ' + priestDetails.Address + ' <br/><strong>Status:</strong> ' + priestDetails.Status+ '<br/>'
          + '<strong>Date of Birth:</strong>  ' + ConvertJsonToDate(priestDetails.DOB) + '<br /><strong>Date of Ordination:</strong>  ' + ConvertJsonToDate(priestDetails.DateOrdination) + '<br />'
          + '<a style="color:saddlebrown;font-weight:700;" onclick="OpenPriestDetails('+ID+');">View more details</a>'
          + '</li></ul></div>');
        return html;
       
    }
    // Html code for binding Asst Vicar details
    function HtmlBindWithAsst(priestDetails, i) {
        debugger;
        var ID ="'"+priestDetails.ID+"'";
        var html = ('<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="' + priestDetails.URL + '"/></li>'
          + '<li><span class="choosepic">' + priestDetails.Name + '</span> <br/>'
          + '<strong>Baptismal Name:</strong> ' + priestDetails.BaptismalName + ' <br/><strong>House Name:</strong> ' + priestDetails.Address + ' <br/><strong>Status:</strong> ' + priestDetails.Status + '<br/>'
          + '<strong>Date of Birth:</strong>  ' + ConvertJsonToDate(priestDetails.DOB) + '<br /><strong>Date of Ordination:</strong>  ' + ConvertJsonToDate(priestDetails.DateOrdination) + '<br />'
          + '<a style="color:saddlebrown;font-weight:700;" onclick="OpenPriestDetails('+ID+');">View more details</a>'
          + '</li></ul></div>');
        return html;

    }
// Html code for no record found for vicar
    function HtmlBindVicar() {
        debugger;
        var html = ('<div class="priority high"><span>Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick=OpenNewAdd("Vicar")>NEW <i class="glyph-icon icon-plus"></i></a></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div>');
        return html;

    }
// Html code for no record found for Asst Vicar
    function HtmlBindAsstVicar() {
        debugger;
        var html = ('<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div>');
        return html;

    }
   
