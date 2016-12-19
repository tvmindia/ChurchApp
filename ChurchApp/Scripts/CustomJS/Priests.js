$(document).ready(function () {
    try
    {
        
        //////////----------Function for check priest details and bind 
        check();
        ////////----------function Autocomplete for filter priest name
        AutoComplete();
        ///////--------------function Cancel Add priest wizad
        $('#btnCancelPriest').click(function (e) {
            try
            {
                var action = $(this).attr('name');
                if (action == "New") {
                    $('#PriestEd').hide();
                    $('#PriestShowDetails').hide();
                }
                else {
                    $('#PriestEd').hide();
                    $('#PriestShowDetails').show();
                }
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
           
        });
        //////--------------function cancel details wizad
        $('#bthCancelDetails').click(function (e) {
            try
            {
                var action = $(this).attr('name');
                if (action == "View") {
                    $('#PriestEd').hide();
                    $('#PriestShowDetails').hide();
                }
                else {
                    $('#PriestEd').show();
                    $('#PriestShowDetails').hide();
                }
                $('#priestPreview').attr('src', '../img/gallery/priest.png');
                ClearFields();
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
            
        });
        /////---------------function Add priest from existing data using autocomplete
        $('#btnAddPriest').click(function (e) {
            try 
            {
                var status=$(this).attr('name');
                var priestID = $('#hdnAddPriestID').val();
                if(priestID!=null||priestID!="")
                {
                    var Priest = new Object();
                    Priest.priestID = priestID;
                    Priest.Status = status;
                    result = UpdateChurchIDPriest(Priest);

                    if (result.result == "1") {
                        noty({ text: Messages.PriestAdded, type: 'success' });
                        $('#assVicardiv').remove();
                        $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
                        check();
                        $('#PriestEd').hide();
                        $('#PriestShowDetails').hide();
                        ClearFields();
                    }
                    else
                    {
                        noty({ text: result.result, type: 'error' });
                    }
                    
                }
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
            
            
        });
        ///////////-----------Delete button Event
        $('#btnDelete').click(function (e)
        {
            try
            {
                var priestID = $("#hdfPriestID").val();
                var Priest = new Object();
                Priest.churchID = null;
                Priest.priestID = $("#hdfPriestID").val();


                result = DeletePriest(Priest);

                if (result.result == "1") {
                    noty({ text: Messages.DeletionSuccessFull, type: 'success' });
                    $('#assVicardiv').remove();
                    $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
                    check();
                    $('#PriestEd').hide();
                    $('#PriestShowDetails').hide();
                }
                else
                {
                    noty({ text: result.result, type: 'error' });
                }
               
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
            
        });
        //////////-----------Main button event for Save, Update
        $('#btnSavePriest').click(function (e) {
            try
            {
                debugger;
                var Role = $(this).attr('name');
                if (($('#ddlstatus').val() == 'Vicar') && (Role == 'Asst')) {
                    noty({ text: Messages.VicarExist, type: 'information' });
                    return false;
                }


                var today = new Date();
                var dobcheck = $('#priestDOB').val();
                var ordcheck = $('#OrdinationDate').val();
                if (dobcheck != "") {
                    if (Datecheck(dobcheck) > today) {
                        noty({ text: Messages.DboInvalid, type: 'information' });
                        return false;
                    }
                }

                if (ordcheck != "") {
                    if (Datecheck(ordcheck) > today) {
                        noty({ text: Messages.OrdinationInvalid, type: 'information' });
                        return false;
                    }
                }

                PriestValidation();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
            
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
        //Acess check for login User
        var value = $('#ContentPlaceHolder2_btnAddNew').val();
        if (value != "") {
            $('#iconEditPriest').remove();
            $('#btnAddNew').remove();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    

});
//Date validation is the date is valid
function Datecheck(DateNow)
{
    var date = DateNow.substring(0, 2);
    var month = DateNow.substring(3, 5);
    var year = DateNow.substring(6, 10);
    var myDate = new Date(year, month - 1, date);
    return myDate;
}
//Save priest (functon with insert and update)
function savePriest()
{
    try
    {
        debugger;
        var AppImgURL = '';
        var priestID = $("#hdfPriestID").val();

        //-----------------------INSERT-------------------//

        if (priestID == null || priestID == "") {
            var guid = createGuid();

            if (guid != null) {
                var i = "0";
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
                        formData.append('createdby', 'sadmin');
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    i = "1";
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
            if (i == "1")
            {
                Priest.imageId = guid;
            }
            Priest.priestID = guid;
            result = InsertPriest(Priest);

            if (result.result == "1") {
                noty({ text: Messages.SavedSuccessfull, type: 'success' });

            }
            else
            {
                noty({ text: result.result, type: 'error' });
            }

            $('#assVicardiv').remove();
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
            Priest.priestID = $("#hdfPriestID").val();
            var guid = createGuid();
            if (((imagefile = $('#priestimg')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#priestimg')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                    formData.append('createdby', 'sadmin');
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                Priest.imageId = guid;
            }

            result = UpdatePriest(Priest);

            if (result.result == "1") {
                noty({ text: Messages.UpdationSuccessFull, type: 'success' });
            }
            else
            {
                noty({ text: result.result, type: 'error' });
            }
            $('#assVicardiv').remove(); 
        
            $("<div id='assVicardiv'><div id='AsstVicarDefault'></div></div>").appendTo("#AsstVicartask");
            check();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
}
//Autocomplete for textbox priest name for quick search priest and add to church
function AutoComplete()
{
    try
    {
        var ac = null;
        ac = GetPriest();

        var length = ac.length;
        var projects = new Array();
        for (i = 0; i < length; i++) {
            var name = ac[i].split('🏠');
            projects.push({ value: name[0], label: name[0], desc: name[1] })
        }

        $("#txtPriestName").autocomplete({
            maxResults: 10,
            source: function (request, response) {
                //--- Search by name or description(file no , mobile no, address) , by accessing matched results with search term and setting this result to the source for autocomplete
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var matching = $.grep(projects, function (value) {

                    var name = value.value;
                    var label = value.label;
                    var desc = value.desc;

                    return matcher.test(name) || matcher.test(desc);
                });
                var results = matching; // Matched set of result is set to variable 'result'

                response(results.slice(0, this.options.maxResults));
            },
            focus: function (event, ui) {
                $("#txtPriestName").val(ui.item.label);

                return false;
            },
            select: function (event, ui) {

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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
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
        try
        {
            var priestDetails = {};
            var elems = $();
            var elemsAsst = $();
            var elemsEmtyVicar = $();
            var elemsEmtyAsstVicar = $();
            //<%=listFilter %>;
            priestDetails = GetPriestUsingChurchID();
            if (priestDetails.length == 0) {
                $('#VicarDefault').remove();
                $('#AsstVicarDefault').remove();
                elemsEmtyVicar = elemsEmtyVicar.add(HtmlBindVicar());
                $('#VicarDivDisplay').empty();
                $('#VicarDivDisplay').append(elemsEmtyVicar);
                elemsEmtyAsstVicar = elemsEmtyAsstVicar.add(HtmlBindAsstVicar());
                $('#assVicardiv').empty();
                $('#assVicardiv').append(elemsEmtyAsstVicar);

            }
            else {
                $('#VicarDefault').remove();
                //$('#AsstVicarDefault').remove();
                elemsEmtyVicar = elemsEmtyVicar.add(HtmlBindVicar());
                $('#VicarDivDisplay').empty();
                $('#VicarDivDisplay').append(elemsEmtyVicar);

                for (var i = 0; i < priestDetails.length; i++) {
                    if (priestDetails[i].IsActive != "False") {
                        if (priestDetails[i].Status == "Vicar") {
                            $('#VicarDefault').remove();
                            elems = elems.add(HtmlBindProductWithOffer(priestDetails[i]));
                            $('#VicarDivDisplay').empty();
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
        catch(e)
        {
            noty({ type: 'error', text: e.message });
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
        try
        {
            RemoveStyle();
            ClearFields();
            $('#btnCancelPriest').attr('name', 'New');
            $('#priestPreview').attr('src', "../img/gallery/priest.png");
            $('#hdfPriestID').val('');
            if (Tag == "Asst") {
                document.getElementById('HeadDetails').innerText = "Add New Asst Vicar";
                $('#btnSavePriest').attr('name', 'Asst');
                $('#btnAddPriest').attr('name', 'Asst');
            }
            if (Tag == "Vicar") {
                document.getElementById('HeadDetails').innerText = "Add New Vicar";
                $('#btnSavePriest').attr('name', 'Vicar');
                $('#btnAddPriest').attr('name', 'Vicar');
            }
            $('#PriestShowDetails').hide();
            $('#btnrefresh').hide();
            $('#PriestEd').show();
            $('#txtPriestName').focus();
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
       
        
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
        try
        {
            var PriestRow = {};
            PriestRow = GetPriestDetailsUsingPiestID(priestID);
            if (PriestRow.result ==null)
            {
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
                $('#bthCancelDetails').attr('name', 'View');
            }
            else
            {
                noty({ type: 'error', text: PriestRow.result });
            }
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
               
    }
    //Onclick refresh on edit
    function cancel()
    {
        $('#PriestEd').hide();
        $('#PriestShowDetails').show();
    }
    // Bind Details for edit
    function editPriestDetails(this_obj)
    {
        try
        {
            RemoveStyle();
            $('#btnCancelPriest').attr('name', '');
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
            $('#hdfPriestID').val(priestid);
            $('#PriestShowDetails').hide();
            $('#btnrefresh').show();
            $('#btnrefresh').attr('onclick', 'cancel();')
            $('#PriestEd').show();
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
        
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
        
        var ID = "'" + priestDetails.ID + "'";
        var html = ('<div id="VicarDefault"><div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;"><h2>Vicar</h2></div>'
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
        
        var html = ('<div id="VicarDefault"><div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;"><h2>Vicar</h2><a class="btnNew" style="left:93%!important;top:-14px;" title="ADD NEW" onclick=OpenNewAdd("Vicar")><i class="material-icons">+</i></a></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div></div>');
        return html;

    }
// Html code for no record found for Asst Vicar
    function HtmlBindAsstVicar() {
        
        var html = ('<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div>');
        return html;

    }
   
    //Basic Validation For New Administrator
    //CreatedBy Thomson
    function PriestValidation() {
        try
        {
            debugger;
            var Name = $('#txtPriestName');
            var OrdinationDate = $('#OrdinationDate');
            var Role = $('#ddlstatus');

            var container = [
                { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
                { id: OrdinationDate[0].id, name: OrdinationDate[0].name, Value: OrdinationDate[0].value },
                { id: Role[0].id, name: Role[0].name, Value: Role[0].value },
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
                savePriest();
                return true;
            }
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
        
    }