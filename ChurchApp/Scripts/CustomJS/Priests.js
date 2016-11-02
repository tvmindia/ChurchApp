$(document).ready(function () {
    

    
    check();

    //$('.priestEdit').click(function (e) {
    //    e.preventDefault();
    //    $('#PriestEditDivBox').show();
       

    });
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
    function check() {
        debugger;
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
    function GetPriestDetailsUsingPiestID(priestID) {
        debugger;
        var ds = {};
        var table = {};
        var Priest = new Object();
        Priest.priestID = priestID;
        var data = "{'priestObj':" + JSON.stringify(Priest) + "}";
        ds = getJsonData(data, "../AdminPanel/Priests.aspx/GetPriestsDetailsUsingPriestID");
        table = JSON.parse(ds.d);
        return table;
    }
    function OpenNewAdd() {
        $('#PriestEd').show();
        $('#PriestShowDetails').hide();
    }
    function OpenPriestDetails(priestID) {
        debugger;
        BindDetails(priestID);
        $('#PriestShowDetails').show();
        $('#PriestEd').hide();
    }
    function BindDetails(priestID) {
        debugger;
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
    }
    function showpreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#priestPreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    function HtmlBindProductWithOffer(priestDetails, i)
    {
        debugger;
        var ID = "'" + priestDetails.ID + "'";
        var html = ('<div class="priority high"><span>Vicar</span></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/kozhipadan.jpg"/></li>'
          + '<li><span class="choosepic">' + priestDetails.Name + '</span> <br/>'
          + '<strong>Baptismal Name:</strong> ' + priestDetails.BaptismalName + ' <br/><strong>House Name:</strong> ' + priestDetails.Address + ' <br/><strong>Status:</strong> ' + priestDetails.Status+ '<br/>'
          + '<strong>Date of Birth:</strong>  ' + ConvertJsonToDate(priestDetails.DOB) + '<br /><strong>Date of Ordination:</strong>  ' + ConvertJsonToDate(priestDetails.DateOrdination) + '<br />'
          + '<a href="#" style="color:saddlebrown;font-weight:700;" onclick="OpenPriestDetails('+ID+');">View more details</a>'
          + '</li></ul></div>');
        return html;
       
    }
    function HtmlBindWithAsst(priestDetails, i) {
        debugger;
        var ID ="'"+priestDetails.ID+"'";
        var html = ('<div class="priority low"><span>Asst Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" style="left:75%!important;" title="">NEW <i class="glyph-icon icon-plus"></i></a></div>'
          + '<div class="task low">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/kozhipadan.jpg"/></li>'
          + '<li><span class="choosepic">' + priestDetails.Name + '</span> <br/>'
          + '<strong>Baptismal Name:</strong> ' + priestDetails.BaptismalName + ' <br/><strong>House Name:</strong> ' + priestDetails.Address + ' <br/><strong>Status:</strong> ' + priestDetails.Status + '<br/>'
          + '<strong>Date of Birth:</strong>  ' + ConvertJsonToDate(priestDetails.DOB) + '<br /><strong>Date of Ordination:</strong>  ' + ConvertJsonToDate(priestDetails.DateOrdination) + '<br />'
          + '<a href="#" style="color:saddlebrown;font-weight:700;" onclick="OpenPriestDetails('+ID+');">View more details</a>'
          + '</li></ul></div>');
        return html;

    }
    function HtmlBindVicar() {
        debugger;
        var html = ('<div class="priority high"><span>Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick="OpenNewAdd();">NEW <i class="glyph-icon icon-plus"></i></a></div>'
          + '<div class="task high">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div>');
        return html;

    }
    function HtmlBindAsstVicar() {
        debugger;
        var html = ('<div class="priority low"><span>Asst Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" style="left:75%!important;" title="">NEW <i class="glyph-icon icon-plus"></i></a></div>'
          + '<div class="task low">'
          + '<ul class="dashboard-list vicarlist"><li><img class="priestimage" src="../img/gallery/priest.png"/></li>'
          + '<li ><br /><br /><br />'
          + '<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>'
          + '</li></ul></div>');
        return html;

    }
   
