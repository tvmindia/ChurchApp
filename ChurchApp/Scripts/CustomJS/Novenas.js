$("document").ready(function (e)
{
    debugger;
    BindPatrons();

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
    debugger;
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

        debugger
        if (RecordsToBeProcessed > 0 ) {
          
            if (index < 5) {            //First Row

                if (RecordsToBeProcessed ==( TotalRecords-1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    ObjUl.append('<div id="divAddSaint" class=' + SpanValue + '><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint" onclick="OpenNewSaintModal()">Add New Saint</></a></div><li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' /><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                } 
                else {
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }
               
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {
                debugger;
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
                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
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

function ViewIndividualPatron(obj)
{

    debugger;
    $('#DivSaints').hide();
    $('#DivIndividualPatron').show();
    var SaintName = $(obj).attr('SaintName');

    document.getElementById("spnSaint").innerHTML = SaintName;
    //  alert($(obj).attr('SaintName'));(\'' + Records.ID + '\')
    $("#breadcrumbNovena").append('<i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + SaintName + '</li>');

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
            $('#imgSaint').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
//--------------------------------//

