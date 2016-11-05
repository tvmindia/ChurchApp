$("document").ready(function (e) {
    $('#divImages').hide();
    $('#divVideos').hide();

    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All the File APIs are supported.     
        document.getElementById('AlbumUploader').addEventListener('change', handleFileSelect, false);
    }
   
    $('#newalbum').click(function (e) {
       
        $('#NewAlbumModel').modal('show');
    });
    debugger;
    BindGalleryImageAlbum();

    $('#btnSaveImageAlbum').click(function (e) {
      debugger
        try
        {
            var imagefile;
          
            if ((imagefile = $('#AlbumUploader')[0].files.length > 0)) {
                var formData = new FormData();
                for (i = 0; i < $('#AlbumUploader')[0].files.length ; i++) {
                    formData.append('AlbumImage' + i, $('#AlbumUploader')[0].files[i], $('#AlbumUploader')[0].files[i].name);
                }
                formData.append('Album', 'GalleryImageAlbum');
                formData.append('AlbumName', $("#txtAlbumName").val());
                formData.append('churchId', '41f453f6-62a4-4f80-8fc5-1124e6074287');
                formData.append('createdby', 'Albert');
                postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                BindGalleryImageAlbum();
            }
            else
            {
                if ($("#txtAlbumName").val() != "")
                {
                    var GalleryAlbum = new Object();
                    GalleryAlbum.albumName = $("#txtAlbumName").val();
                    InsertImageAlbum(GalleryAlbum);
                }
                BindGalleryImageAlbum();
            }
          
        }
        catch(e)
        {

        }
      
    });

   
    $('.dynamicImgAlbum').click(function (e) {
        debugger;
        try
        {
            $('#divImageAlbum').hide();
            $('#divVideoAlbum').hide();
            $('#divVideos').hide();
            $('#divImages').show();
            editedrow = $(this).closest('div');
            var imgalbid = $(this).attr('albumid');
            var albname = $(this).attr('AlbumName');
            document.getElementById("ImageDivTitle").innerHTML = albname;

            //breadcrumb handling
            $(".Gallery").remove();//removes gallery
            $("#breadcrumbGallery").append('<li class="Gallery"><i class="icon-home"></i><a href="../AdminPanel/Gallery.aspx"> Gallery </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> Pictures</li>');
            
            BindImages(imgalbid);
          
           
          

           
        }
        catch (e) {

        }
        return false;
    });




    $('#newImage').click(function (e) {

        $('#NewImageModel').modal('show');
    });

    $('#newVideoAlbum').click(function (e) {

        $('#NewVideoAlbumModel').modal('show');
    });

    $('#newVideo').click(function (e) {

        $('#NewVideoModel').modal('show');
    });

    

    
    




});//end of document.ready


function handleFileSelect(evt) {
    try {
        var files = evt.target.files; // FileList object
       // $("#imageList").find(".thumb").remove();
        // Loop through the FileList and render image files as thumbnails.
        var f;
        f = files[0];
        //for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            //continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                 '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('imageListAlbum').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        //}
    }
    catch (e) {
    
    }
}

function InsertImageAlbum(GalleryAlbum) {
    var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/InsertImageAlbum");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function BindGalleryImageAlbum()
{
    try
    {
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryImageAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            AppendImageAlbum(jsonResult);
        }
    }
    catch(e)
    {
       
    }
}

function AppendImageAlbum(Records)
{
        $('.dynamicImgAlbum').remove();
        $.each(Records, function (index, Records) {
            if (Records.URL == null)
            {
                var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" class="responsive dynamicImgAlbum"><div class="Albimg"><a href="#"><img style="height:103px;width:278px;" src="/img/defaultalbumadd.jpg" alt="Church"/></a><div class="desc">'+Records.AlbumName+'</div></div></div>';
            }
            else {
                var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" class="responsive dynamicImgAlbum"><div class="Albimg"><a href="#"><img src="' + Records.URL + '" alt="Church"/></a><div class="desc">' + Records.AlbumName + '</div></div></div>';
            }
       
        $('.ImageAlbum-Gallery').append(html);
        })
 }

function GetAllGalleryImageAlbumByChurchID(GalleryAlbum)
{
    var ds = {};
    var table = {};
    try {
        
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllGalleryImageAlbumByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {
      
    }
    return table;
}

function BindImages(imgalbid)
{
    try {
        var jsonResult = {};
        var GalleryItems = new Object();
        GalleryItems.albumId = imgalbid;
        jsonResult = GetAllImageByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            AppendImages(jsonResult);
        }
    }
    catch (e) {

    }
    
}
function GetAllImageByAlbumID(GalleryItems)
{
    var ds = {};
    var table = {};
    try {

        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllImageByAlbumID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;

}

function AppendImages(Records) {
    $('.dynamicImages').remove();
    $.each(Records, function (index, Records) {
        if (Records.URL == null) {
            var html = '<div AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="responsive dynamicImages"><div class="img"><a href="#"><img src="/img/defaultalbumadd.jpg" alt="Church"/></a></div></div>';
          }
        else {
            var html = '<div AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="responsive dynamicImages"><div class="img"><a href="#"><img src="' + Records.URL + '" alt="Church"/></a></div></div>';
        }
        $('.Image-Gallery').append(html);
    })
}