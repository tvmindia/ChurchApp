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

   
    $('.Alb').click(function (e) {
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



function BtnImageUpload()
{
    $('#AlbumUploader').click();
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="span4" src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('imageListAlbum').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
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
    $('.Alb').remove();
        $.each(Records, function (index, Records) {
            var imgurl = Records.URL;
           
            var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span3 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
           
          
       
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
    $('.masonry-thumb').remove();
   // var fixeddiv = '<div class="masonry-thumb" style="height: 246px!important;border: 2px dotted black;background-color: #e8f7ff;"><a data-rel="tooltip" data-original-title="Add More Images" style="top: 67%;left: 38%;position: relative;" id="newimage">Add  More</></a></div>';
   // $('.Image-Gallery').append(fixeddiv);
    $.each(Records, function (index, Records) {
          // var html = '<div AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="span4 dynamicImages"><a href="#"><img class="center-block" src="' + Records.URL + '" alt="Church"/></a></div>';
        // var html = '<div AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="span4"><a style="background:url(img/gallery/photo1.jpg)" href="#"><img class="grayscale" src="' + Records.URL + '" alt="Sample Image 1"></a></div>'
        var html = '<img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/>'
       $('.Image-Gallery').append(html);
    })
}