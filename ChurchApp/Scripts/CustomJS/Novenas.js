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
    $.each(Records, function (index, Records) {

        debugger;


        var imgurl = Records.URL;
      
        var html = '<div style="background-image: url('+imgurl+')!important;" onclick="ViewImages(this)"  class="span3 Alb Card imgSaints"><a alt="Church"></a></div>';
        
      
        $('.ImageAlbum-Gallery').append(html);
    })
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
