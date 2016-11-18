$(document).ready(function () {
    //////////----------Function for check priest details and bind 
    check();
    ////////----------function Autocomplete for filter priest name
    AutoComplete();
    $('#btnCancelPriest').click(function (e) {
        $('#PriestEd').hide();
        $('#PriestShowDetails').show();

    });
    $('#bthCancelDetails').click(function (e) {
        $('#PriestEd').show();
        $('#PriestShowDetails').hide();
        ClearFields();
    });
    $('#btnAddPriest').click(function (e) {
        debugger;
        var status=$(this).attr('name');
        var priestID = $('#hdnAddPriestID').val();
        if(priestID!=null||priestID!="")
        {
            var Priest = new Object();
            Priest.priestID = priestID;
            Priest.Status = status;
            result = UpdateChurchIDPriest(Priest);

            if (result.result == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Priest Added Successfully");

            }
            if (result.result != "1") {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Operation was Not Successful");
            }
            $('#assVicardiv').remove();
            debugger;
            $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
            check();
            $('#PriestEd').hide();
            $('#PriestShowDetails').hide();
            ClearFields();
        }
    });
    ///////////-----------Delete button Event
    $('#btnDelete').click(function (e)
    {
        var priestID = $("#hdfPriestID").val();
        var Priest = new Object();
        Priest.churchID = null;
        Priest.priestID = $("#hdfPriestID").val();

        // DeletedImgID = imageId;
        // DeletedImgPath = imgPath
        debugger;
        
        result = DeletePriest(Priest);

        if (result.result == "1") {
            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text("Priest Deleted Successfully");

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
            $('.alert-error strong').text("Deleting Not Successful");
        }
        $('#assVicardiv').remove();
        debugger;
        $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
        //SetControlsInNewNoticeFormat();
        check();
        $('#PriestEd').hide();
        $('#PriestShowDetails').hide();
    });
    //////////-----------Main button event for Save, Update
    $('#btnSavePriest').click(function (e) {

        debugger;

        PriestValidation();

    });
    //
    //Style setting for client side Validation
    //CreatedBy Thomson

    $('input[type=text],input[type=password]').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });
    $('textarea,select').on('focus', function () {
        $(this).css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    });

});
//
///Function remove style after validating
function RemoveStyle() {
    try {
        $('input[type=text],input[type=password],textarea,select').css({ background: 'white' });
        $('#ErrorBox,#ErrorBox1').hide(1000);
    }
    catch (e) {

    }
}
function savePriest()
{
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

        $('#assVicardiv').remove();
        debugger;
        $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
        check();


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
        $('#assVicardiv').remove();
        debugger;
        $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
        //SetControlsInNewNoticeFormat();
        check();
    }
}
function AutoComplete()
{
    var ac=null;
    ac = GetPriest();

    var length= ac.length;
    var projects = new Array();
    for (i=0;i<length;i++)
    {  
        var name= ac[i].split('🏠');
        projects.push({  value : name[0], label: name[0], desc: name[1]})   
    }
              
    $("#txtPriestName").autocomplete({
        maxResults: 10,
        source: function(request, response) {
            //--- Search by name or description(file no , mobile no, address) , by accessing matched results with search term and setting this result to the source for autocomplete
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            var matching = $.grep(projects, function (value) {

                var name = value.value;
                var  label= value.label;
                var desc= value.desc;

                return matcher.test(name) || matcher.test(desc);
            });
            var results = matching; // Matched set of result is set to variable 'result'

            response(results.slice(0, this.options.maxResults));
        },
        focus: function( event, ui ) {
            $("#txtPriestName").val(ui.item.label);
                       
            return false;
        },
        select: function( event, ui ) {

            //var FileName =    ui.item.desc.split('|')[0].split('📰')[1];
            // var Address =  ui.item.desc.split('|')[1];
            var priestID = ui.item.desc;
            $('#hdnAddPriestID').val(priestID);
            OpenPriestDetails(priestID);
            $('#iconEditPriest').hide();
            $('#btnAddPriest').show();
            //document.getElementById('<%=Errorbox.ClientID %>').style.display = "none";


            return false;
        }
    })
}
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
        //<%=listFilter %>;
        priestDetails = GetPriestUsingChurchID();
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

            if (this.type == 'text' || this.type == 'textarea' || this.type=='file'||this.type=='hidden') {
                this.value = '';
            }
            else if (this.type == 'radio' || this.type == 'checkbox') {
                this.checked = false;
            }
            else if (this.type == 'select-one' || this.type == 'select-multiple') {
                this.value = '-1';
            }
        });

    }
    //Check if Priest Exist for church and obtain the details
    function GetPriestUsingChurchID() {
        debugger;
        var ds = {};
        var table = {};
        var Priest = new Object();
        //Priest.ChurchID = ChurchID;
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/Priests.aspx/GetPriestsDetails");
        table = JSON.parse(ds.d);
        return table;
    }
    function GetPriest() {
        var ds = {};
        var table = {};
        var Priest = new Object();
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/Priests.aspx/GetPriest");
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
        RemoveStyle();
        ClearFields();
        $('#priestPreview').attr('src', "../img/gallery/priest.png");
        $('#hdfPriestID').val('');
        if (Tag == "Asst")
        {
            document.getElementById('HeadDetails').innerText = "Add New Asst Vicar";
            $('#btnSavePriest').attr('name', 'Asst');
            $('#btnAddPriest').attr('name', 'Asst');
        }
        if (Tag == "Vicar")
        {
            document.getElementById('HeadDetails').innerText = "Add New Vicar";
            $('#btnSavePriest').attr('name', 'Vicar');
            $('#btnAddPriest').attr('name', 'Vicar');
        }
        $('#PriestShowDetails').hide();
        $('#PriestEd').show();
        
    }
    //Onclick function for view priest details
    function OpenPriestDetails(priestID) {
        BindDetails(priestID);
        $('#PriestShowDetails').show();
        $('#iconEditPriest').show();
        $('#PriestEd').hide();
        $('btnAddPriest').hide();
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
    //Add ChurchID Priest
    function UpdateChurchIDPriest(Priest) {
        var data = "{'PriestObj':" + JSON.stringify(Priest) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Priests.aspx/UpdateChurchIDPriest");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
//Delete Priest
    function DeletePriest(Priest) {
        var data = "{'PriestObj':" + JSON.stringify(Priest) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Priests.aspx/DeletePriest");
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
        var html = ('<div id="VicarDefault"><div class="priority high"><span>Vicar</span></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="' + priestDetails.URL + '"/></li>'
          + '<li><span class="choosepic">' + priestDetails.Name + '</span> <br/>'
          + '<strong>Baptismal Name:</strong> ' + priestDetails.BaptismalName + ' <br/><strong>House Name:</strong> ' + priestDetails.Address + ' <br/><strong>Status:</strong> ' + priestDetails.Status+ '<br/>'
          + '<strong>Date of Birth:</strong>  ' + ConvertJsonToDate(priestDetails.DOB) + '<br /><strong>Date of Ordination:</strong>  ' + ConvertJsonToDate(priestDetails.DateOrdination) + '<br />'
          + '<a style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="OpenPriestDetails(' + ID + ');">View more details</a>'
          + '</li></ul></div></div>');
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
          + '<a style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="OpenPriestDetails(' + ID + ');">View more details</a>'
          + '</li></ul></div>');
        return html;

    }
// Html code for no record found for vicar
    function HtmlBindVicar() {
        debugger;
        var html = ('<div id="VicarDefault"><div class="priority high"><span>Vicar</span><a class="btnNew" style="left:83%!important;" title="ADD NEW" onclick=OpenNewAdd("Vicar")><i class="material-icons">+</i></a></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div></div>');
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
   
    //Basic Validation For New Administrator
    //CreatedBy Thomson
    function PriestValidation() {
        debugger;
        $('#Displaydiv1').remove();
        var Name = $('#txtPriestName');
        var OrdinationDate = $('#OrdinationDate');
        var Role = $('#ddlstatus');

        var container = [
            { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
            { id: OrdinationDate[0].id, name: OrdinationDate[0].name, Value: OrdinationDate[0].value },
            { id: Role[0].id, name: Role[0].name, Value: Role[0].value },
        ];

        var j = 0;
        var Errorbox = document.getElementById('ErrorBox');
        var divs = document.createElement('div');
        divs.setAttribute("id", "Displaydiv");
        Errorbox.appendChild(divs);
        for (var i = 0; i < container.length; i++) {

            if (container[i].Value == "") {
                j = 1;
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "95% center";
                txtB.style.backgroundRepeat = "no-repeat";
                Errorbox.style.paddingLeft = "30px";

            }
            else if (container[i].Value == "-1") {
                j = 1;
                Errorbox.style.borderRadius = "5px";
                Errorbox.style.display = "block";
                var txtB = document.getElementById(container[i].id);
                txtB.style.backgroundImage = "url('../img/invalid.png')";
                txtB.style.backgroundPosition = "93% center";
                txtB.style.backgroundRepeat = "no-repeat";
                Errorbox.style.paddingLeft = "30px";
            }
        }
        if (j == '1') {
            var p = document.createElement('p');
            p.innerHTML = "* Some Fields Are Empty ! ";
            p.style.color = "Red";
            p.style.fontSize = "14px";

            divs.appendChild(p);
            //$('#btnAddAdmin').attr('name', 'failure');
            return false;
        }
        if (j == '0') {
            $('#ErrorBox').hide(1000);
            //scriptvalidate();
            savePriest();
            return true;
        }
    }