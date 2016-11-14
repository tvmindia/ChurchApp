$("document").ready(function (e)
{
    debugger;
    BindPatrons();
});

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
    var TotalRecords = Records.length;
    var RecordsToBeProcessed = TotalRecords;
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

    var i = 1;

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

            if (index < 6) {

                if (RecordsToBeProcessed == TotalRecords) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    i = i + 1;

                } 

                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>');
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {
                if (i<= NoOfRows) {
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    i = i + 1;
                }

                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid"/><strong>  ' + Records.Name + '  </strong><p>' + Records.Description + '</p> </div> </li>');
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

function AppendImageAlbum(Records) {
    $('.Alb').remove();
    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;
        if (imgurl == null) {
            var html = '<div style="background-image: url(/img/AppImages/b7c2c20a-0eff-4d14-b598-2945ba1d3ef6.jpg)!important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
        }
        else {
            var html = '<div style="background-image: url(/img/AppImages/b7c2c20a-0eff-4d14-b598-2945ba1d3ef6.jpg)!important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
        }
        // var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span4 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';

        $('.ImageAlbum-Gallery').append(html);
    })
}

function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);
   
    return table;
}
