$("document").ready(function (e)
{
    debugger;
    BindPatrons();

    //Add New Saint HyperLink Click
    $('#aNewSaint').click(function (e) {

       $('#NewSaintModel').modal('show');
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
    var TotalRecords = Records.length+1;
    var RecordsToBeProcessed = Records.length;
    var NoOfRows = 0;
    var SpanValue = 0;
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

    //var i = 1;

    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;

        if (imgurl == null) {
            imgurl = "../img/gallery/priest.png";
        }

        debugger
        if (RecordsToBeProcessed > 0 ) {
          
            //if (i==1) {
            //    index = index + 1;
            //}

            if (index < 5) {

                if (RecordsToBeProcessed ==( TotalRecords-1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    //i = i + 1;
                    ObjUl.append('<div id="divAddSaint" class=' + SpanValue + '><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint">Add New Saint</></a></div><li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' +(Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                } 
                else {
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' +(Records.Name != null ? Records.Name : "") + '  </strong><p>' +(Records.Description != null ? Records.Description : "")+ '</p> </div> </li>');
                }
               
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {
                //if (i < NoOfRows) {
                debugger;
                if (index == 5) {
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    //i = i + 1;
                }
                 
                //(i == 2 && index % 5 == 0) ||
                if ( ( index+1) % 6 == 0) {
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    //i = i + 1;
                }


                //if (index%5 == 0) {
                // //   var div = '   <div id="divAddSaint"><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint">Add New Saint</></a></div>';

                //     $('#DivSaints').append(ObjUl);
                //    ObjUl = $('<ul></ul>');
                //    ObjUl.addClass("thumbnails");
                //    i = i + 1;
                //}

                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                RecordsToBeProcessed = RecordsToBeProcessed - 1;

            }

            //if (index < 6) {
            //html = html + '<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>';

            //ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>');

            //RecordsToBeProcessed = RecordsToBeProcessed - 1;

            //}
           
            //else
            //{
            //    $('#DivSaints').append(ObjUl);

            //    ObjUl = $('<ul></ul>');
            //    ObjUl.addClass("thumbnails");  
            //    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>');
            //    RecordsToBeProcessed = RecordsToBeProcessed - 1;
            //  //  html = html + '<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>';
            //}
        }
    })
    $('#DivSaints').append(ObjUl);

   



  //  $('#DivSaints').append(ul+html+'</ul>');
  


    //$('ul .thumbnails').append(html);

    //for (var i = 0; i < TotalRecords; i++) {
    //    var div = '<div  class="span12"><ul class="thumbnails">';

    //    if (RecordsToBeProcessed > 0) {
    //        var imgurl = Records.URL;
    //        html = $div.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records[i].Name + '  </strong><p>' + Records[i].Description + '</p> </div> </li> ');


    //        RecordsToBeProcessed = RecordsToBeProcessed - 1;
    //    }
    //}

    //html = div + html + '</ul> </div>';
    //if (html != '') {
    //    $('#DivSaints').append(html);
    //}


    
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


