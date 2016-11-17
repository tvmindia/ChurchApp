$("document").ready(function (e)
{
    $("#TxtTime").timepicki();

    debugger;
    BindPatrons();

    $("#ddlPatron").select2({
        placeholder: "Choose Patron",
        allowClear: true,
        data: BindPatronDropdown()
    });

    $("#rdoNovenaSpecial").click(function () {
        $("#divDay").hide();
        $("#divStartDate").show();
        $("#divEndDate").show();

    });

    $("#rdoNovenaNormal").click(function () {
        $("#divStartDate").hide();
        $("#divEndDate").hide();
        $("#divDay").show();
    });


    //Cancel Click
    $('#btnCancel').click(function (e) {
        SetControlsInNovenaFormat();
    });

    //Save - New Saint
    $('#btnSaveInModal').click(function (e) {
        // var IsValid = NewSaintValidation();

        debugger;

        var PatronMaster = new Object();
        PatronMaster.patronMasterName = $("#txtSaintName").val();
        PatronMaster.description = $("#txtSaintDescription").val();

        var guid = createGuid();

        if (guid != null) {

            var imgresult = "";
            var _URL = window.URL || window.webkitURL;
            var formData = new FormData();
            var imagefile;

            if (((imagefile = $('#UpSaint')[0].files[0]) != undefined)) {
                var formData = new FormData();
                var tempFile;
                if ((tempFile = $('#UpSaint')[0].files[0]) != undefined) {
                    tempFile.name = guid;
                    formData.append('NoticeAppImage', tempFile, tempFile.name);
                    formData.append('GUID', guid);
                }
                formData.append('ActionTyp', 'NoticeAppImageInsert');
                AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                PatronMaster.imageID = guid;
            }

              result = InsertPatron(PatronMaster);

            if (result.Status == 1)
            {
                BindPatrons();
                $('#NewSaintModel').modal('hide');
                //$('#btnCloseInModal').click();
            }
        }
    });
    
}); //End of Document ready


//Clear Controls
function SetControlsInNovenaFormat()
{
    debugger;
    ClearControls();

    $('#DivNewNovena').show();
    $('#NoticeEdit').hide();
      
    $('#h1Event').text("New Novena");

    $('#DivNewFormat').show();


     $('#btnSave').show();
     $('#btnCancel').show();
     $('#btnDelete').hide();
     $('#DivViewFormat').hide();
}
function ClearControls() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file') {
            this.value = '';
        }
        else if (this.type == 'radio' || this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

   $("#ddlPatron").select2("val", "");

    url = "../img/No-Img_Chosen.png";
    $('#imgNewNovena').attr('src', url);
    
    $("#rdoNovenaSpecial").parent().removeClass('checked');
    $('#rdoNovenaNormal').parent().addClass('checked');

    $("#divStartDate").hide();
    $("#divEndDate").hide();
    $("#divDay").show();
}
function SetControlsInViewFormat()
{
    debugger;

    $('#DivNewNovena').show();
    $('#DivNewFormat').hide();
    $('#DivViewFormat').show();
    $('#btnSave').hide();
    $('#btnCancel').hide();
    $('#btnDelete').hide();
    }
//--------------------------------//


//Bind Patrons
function BindPatrons() {
        var jsonResult = {};
        var PatronMaster = new Object();
        jsonResult = GetAllPatrons(PatronMaster);
        if (jsonResult != undefined) {
            FillPatrons(jsonResult);
        }
}
function FillPatrons(Records)
{
 
    $('#DivSaints').html('');
   // var TotalRecords = Records.length+1;
    var TotalRecords = Records.length+1;            // Adding 1 bcz ADD NEW EVENT div has to be appended first
    var RecordsToBeProcessed = Records.length;      // Initially Sets to Record count , It will decrease by 1 , when processing
    var NoOfRows = 0;                       
    var SpanValue = 0;

    //No of rows calculation 
    if (TotalRecords%6 == 0) {
        NoOfRows = TotalRecords / 6;
       
    }
    else {
        NoOfRows = parseInt(TotalRecords / 6) + 1
    }

    if (TotalRecords <= 6) {
        NoOfRows = 1;
    }

    var html = '';
    SpanValue = "span2";
    var ul = '<ul class="thumbnails">'
    var ObjUl;

    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;

        if (imgurl == null) {
            imgurl = "../img/gallery/priest.png";
        }

        if (RecordsToBeProcessed > 0 ) {
          
            if (index < 5) {            //First Row

                if (RecordsToBeProcessed ==( TotalRecords-1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    ObjUl.append('<div id="divAddSaint" class=' + SpanValue + '><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint" onclick="OpenNewSaintModal()">Add New Saint</></a></div><li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\' /><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                } 
                else {
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }
               
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {
               
                if (index == 5) {  //First Row (Including ADS SAINT Div)
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                if ( ( index+1) % 6 == 0) { //Max 6 per row, after that a new ul will be created
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
                   }
        }
    })
    $('#DivSaints').append(ObjUl);

}
function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);
   
    return table;
}
//--------------------------------//


//Bind Patron Dropdown
function BindPatronDropdown()
{
    debugger;
    var jsonResult = {};
    var PatronMaster = new Object();
    jsonResult = GetAllPatronIdAndName(PatronMaster);
    return jsonResult;
}
function GetAllPatronIdAndName(PatronMaster)
{
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatronIdAndName");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//


//More Details
function BindNovenaMoreDetails(ID)
{
    SetControlsInViewFormat();

    var jsonResult = {};
    var Novenas = new Object();
    Novenas.novenaId = ID;
    jsonResult = GetNovenasByNovenaID(Novenas);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#h1Event").text(jsonResult.NovenaCaption);
            url = jsonResult.URL;

            if (url == null) {
                url = "../img/No-Img_Chosen.png";
                $('#imgNovenaView').attr('src', url);
            }
            else {
                $('#imgNovenaView').attr('src', url);

            }
            $('#lblChurchName').text(jsonResult.ChurchName);
            $('#lblStartDate').text(ConvertJsonToDate(jsonResult.StartDate));
            $('#lblEndDate').text(ConvertJsonToDate(jsonResult.EndDate));
            $('#lblDescription').text(jsonResult.Description);
           
        });
    }


}
function GetNovenasByNovenaID(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetNovenaDetailsByNovenaID");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//

//Onclick Of Saint Image
function ViewIndividualPatron(obj) {

    debugger;

    $('#EditPatron').hide();

    $('#DivSaints').hide();
    $('#DivIndividualPatron').show();
   
    var SaintName = $(obj).attr('SaintName');
    var SaintID = $(obj).attr('ID');
    BindNovenasPatronID(SaintID);

    document.getElementById("spnSaint").innerHTML = SaintName;
    $(".Novena").remove();//removes novena li from breadcrumb

    $("#breadcrumbNovena").append('<li><a href="../AdminPanel/Novenas.aspx"> Novenas </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + SaintName + '</li>');
}


//Bind Novenas
function BindNovenasPatronID(patronId) {
    var jsonResult = {};
    var Novenas = new Object();
    Novenas.patronId = patronId;
    jsonResult = GetNovenasByPatronID(Novenas);
    if (jsonResult != undefined) {
        FillNovenas(jsonResult);

        if (jsonResult.length > 5) {
            $(".aViewMore").show();

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }
    }
}
function GetNovenasByPatronID(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetNovenasByPatronID");
    table = JSON.parse(ds.d);

    return table;
}
function FillNovenas(Records) {
    debugger;
    $('#DivNovenas').html('');
   
    $.each(Records, function (index, Records) {
     //   var html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.NovenaCaption + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="noticeImage" id=img' + Records.ID + ' /><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
        debugger;
        var url = Records.URL;
        var ID = Records.ID;
      //  var html = '<div class="accordion Card"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.NovenaCaption + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="NovenaImage" id=img' + Records.ID + ' src=' + url + '/><strong>' + Records.ChurchName + '</strong><br /><br />Start<strong>' + ConvertJsonToDate(Records.StartDate) + '</strong><br /><br />End<strong>' + ConvertJsonToDate(Records.StartDate) + '</strong><br /><p>' + Records.Description + '</p><span class="novenaViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>';

        var html = ('<ul class="dashboard-list NovenaList"><li style="width:25%!important"><img class="NovenaImage" src="' + url + '"/></li>'
      + '<li style="width:75%!important"><span class="NovenaCaption">' + Records.NovenaCaption + '</span> <br/>'
      + '<strong>Start:</strong> ' + ConvertJsonToDate(Records.StartDate) +'<br/>'
      + '<strong>End:</strong>  ' + ConvertJsonToDate(Records.EndDate) + '<br /><strong>'+Records.ChurchName+'</strong><p class="pPriestDesc">' + Records.Description + '</p> '
      + '<a class="aNovenaViewMore" style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="BindNovenaMoreDetails(\'' + ID + '\')">View more details</a>'
      + '<input id=' + ID + ' type="hidden" value=' + ID + '/></li></ul></div>');


        $('#DivNovenas').append(html);

        if (url != "" && url != null) {
            var imgControl = document.getElementById("img" + Records.ID);
            if (imgControl != null) {
                document.getElementById("img" + Records.ID).src = url;
                $('#img' + Records.ID).attr('src', url);
            }
        }
        if (url == null) {
            url = "../img/No-Img_Chosen.png";
            $('#img' + Records.ID).attr('src', url);

        }



    })

    
    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#DivNovenas").append(img);
    }

}
//--------------------------------//


//Insert Patron
function InsertPatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertPatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//


//Add New Saint HyperLink Click
function OpenNewSaintModal() {
    $('#NewSaintModel').modal('show');
}


//General
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function NewSaintValidation() {

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
//--------------------------------//

