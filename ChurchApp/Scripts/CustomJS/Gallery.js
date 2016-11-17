$("document").ready(function (e) {
 
    $('#divImages').hide();
    $('#divVideos').hide();

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.     
        document.getElementById('AlbumUploader').addEventListener('change', handleFileSelect, false);
        document.getElementById('imageUploader').addEventListener('change', handleFileSelectInImages, false);
        document.getElementById('AlbumVidUploader').addEventListener('change', handleFileVideoAlbum, false);
        document.getElementById('VideoUploader').addEventListener('change', handleVideoFile, false);
     }
   
    $('#newalbum').click(function (e) {
       
        $('#NewAlbumModel').modal('show');

        $('.dynalb').remove();
    });
    debugger;
    BindGalleryImageAlbum();
    BindGalleryVideoAlbum();
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
                //modal close
                $('.close').click();

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
                //modal close
                $('.close').click();

            }
          
        }
        catch(e)
        {

        }
      
    });

    $('#btnMoreImagesAdd').click(function (e) {
        debugger
        try {
            var imagefile=null;
            var albid = $('#hdfAlbumID').val();
            if ($('#imageListimages').children().length > 1)
            {
                if ((imagefile = $('#imageUploader')[0].files.length > 0) && (albid != "")) {
                    var formData = new FormData();
                    for (i = 0; i < $('#imageUploader')[0].files.length ; i++) {
                        formData.append('AlbumImage' + i, $('#imageUploader')[0].files[i], $('#imageUploader')[0].files[i].name);
                    }
                    formData.append('Album', 'AddMoreImages');
                    formData.append('AlbumID', albid);
                    postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    BindImages(albid);
                    //modal close
                    $('.close').click();

                }
            }
            
         }
        catch (e) {

        }

    });
   
    $('#BtnVideoAlbumSave').click(function (e) {
        debugger;
        alert("vid save");
        barinAlbum.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        barinAlbum.text.style.fontSize = '2rem';
        $('#progressbarUploadinVidAlbum').show();
        try {
            var videofile;

            if ((videofile = $('#AlbumVidUploader')[0].files.length > 0)) {
                barinAlbum.animate(0.3);  // Number from 0.0 to 1.0
                var formData = new FormData();
                formData.append('AlbumVideo', $('#AlbumVidUploader')[0].files[0], $('#AlbumVidUploader')[0].files[0].name);
                formData.append('Album', 'GalleryVideoAlbum');
                formData.append('AlbumName', $("#txtVidAlbumName").val());
                barinAlbum.animate(0.6);  // Number from 0.0 to 1.0
                postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                barinAlbum.animate(1.0);  // Number from 0.0 to 1.0
                BindGalleryVideoAlbum(); 
                //$('.close').click();

            }
            //else {
            //    if ($("#txtAlbumName").val() != "") {
            //        var GalleryAlbum = new Object();
            //        GalleryAlbum.albumName = $("#txtAlbumName").val();
            //        InsertImageAlbum(GalleryAlbum);
            //    }
            //    BindGalleryImageAlbum();
            //    //modal close
            //    $('.close').click();

            //}

        }
        catch (e) {

        }
      
    });
    $('#btnMoreVideoSave').click(function (e) {

        debugger;
        alert("more video save");
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';
     
        $('#progressbarUpload').show();
        var albid = $('#hdfAlbumID').val();
        try {
            var videofile;

            if ((videofile = $('#VideoUploader')[0].files.length > 0)) {
                bar.animate(0.3);  // Number from 0.0 to 1.0
                var formData = new FormData();
                formData.append('Video', $('#VideoUploader')[0].files[0], $('#VideoUploader')[0].files[0].name);
                formData.append('Album', 'AddMoreVideos');
                formData.append('AlbumName', $("#txtVidAlbumName").val());
                formData.append('AlbumID', albid);
                bar.animate(0.6);  // Number from 0.0 to 1.0
                postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                bar.animate(1.0);  // Number from 0.0 to 1.0
           
                BindVideos(albid);
                // $('.close').click();
                
            }
         

        
        }
        catch (e) {

        }

    });
    


    $('#EditAlbum').click(function (e) {
        debugger
        try {
            $('#divCreateAlbum').hide();
            $('#EditAlbum').hide();
            $('#RefreshAlbum').show();
            EditBindGalleryImageAlbum();
        }
        catch (e) {

        }

    });
    

    $('#EditVideoAlbum').click(function (e) {
        debugger
        try {
            $('#divCreateVideoAlbum').hide();
            $('#EditVideoAlbum').hide();
            $('#RefreshVideoAlbum').show();

            EditBindGalleryVideoAlbum();
        

        }
        catch (e) {

        }

    });
    
    $('#EditImageAlbum').click(function (e) {
        debugger
        try {
            $('#divAddMore').hide();
            $('#EditImageAlbum').hide();
            $('#RefreshImageAlbum').show();
            
            var albid = $('#hdfAlbumID').val();
            EditImageBind(albid);
          
           
        }
        catch (e) {

        }

    });

    
    $('#EditVideo').click(function (e) {
        debugger;
        try {
            $('#divAddMoreVideos').hide();
            $('#EditVideo').hide();
            $('#RefreshVideo').show();

            var albid = $('#hdfAlbumID').val();
            EditBindVideos(albid); 
        }
        catch (e) {

        }

    });

    $('#RefreshImageAlbum').click(function (e) {
        debugger
        try {
            $('#divAddMore').show();
            $('#RefreshImageAlbum').hide();
            $('#EditImageAlbum').show();

            var albid = $('#hdfAlbumID').val();
            $('.EditDiv').remove();
            BindImages(albid);
        }
        catch (e) {
        }
    });

    $('#RefreshAlbum').click(function (e) {
        debugger
        try {
            $('#divCreateAlbum').show();
            $('#RefreshAlbum').hide();
            $('#EditAlbum').show();

            $('.Alb').remove();
            BindGalleryImageAlbum();


        }
        catch (e) {

        }

    });

    $('#RefreshVideo').click(function (e) {
        debugger
        try {
            $('#divAddMoreVideos').show();
            $('#RefreshVideo').hide();
            $('#EditVideo').show();

            var albid = $('#hdfAlbumID').val();
            $('.EditDiv').remove();
            BindVideos(albid);
        }
        catch (e) {
        }
    });

    
    $('#RefreshVideoAlbum').click(function (e) {
        debugger
        try {
            $('#divCreateVideoAlbum').show();
            $('#RefreshVideoAlbum').hide();
            $('#EditVideoAlbum').show();

            var albid = $('#hdfAlbumID').val();
            $('.EditDiv').remove();
            BindGalleryVideoAlbum();
        }
        catch (e) {
        }
    });
    $('#newimage').click(function (e) {
        debugger;
        //Show modal
        $('#NewImageModel').modal('show');
        //Remove previous occurances of preview images
        $('.dynimages').remove();

    });

    $('#newVideoalbum').click(function (e) {
      

        $('#NewVideoAlbumModel').modal('show');
        $('#progressbarUploadinVidAlbum').hide();
    });

    $('#newvideo').click(function (e) {

        $('#NewVideoModel').modal('show');
        $('#progressbarUpload').hide();

    });

//Circular Progress bar initialization
    var bar = new ProgressBar.Circle(progressbarUpload, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#333', width: 1 },
        to: { color: '#FCB03C', width: 4 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });
    bar.animate(0.0);

    var barinAlbum = new ProgressBar.Circle(progressbarUploadinVidAlbum, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#333', width: 1 },
        to: { color: '#FCB03C', width: 4 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }

        }
    });
    barinAlbum.animate(0.0);






});//end of document.ready


function deleteImage(obj)
{
   
   
    var imgid = $(obj).attr('imageid');
    var albid = $(obj).attr('AlbumID');
    var GalleryItems = new Object();
    if(imgid!="")
    {
        var r = confirm("Are You Sure to Delete?");
        if (r == true)
        {
            GalleryItems.galleryItemID = imgid;
            GalleryItems.url = $(obj).attr('URL');
            DeleteImageItem(GalleryItems);
            EditImageBind(albid);
        }
       
    }
    
}
function deleteVideo(obj) {
    debugger;

    var imgid = $(obj).attr('imageid');
    var albid = $(obj).attr('AlbumID');
    var GalleryItems = new Object();
    if (imgid != "") {
        var r = confirm("Are You Sure to Delete?");
        if (r == true) {
            GalleryItems.galleryItemID = imgid;
            GalleryItems.url = $(obj).attr('URL');
            GalleryItems.itemType = 'video';
            DeleteVideoItem(GalleryItems);
            EditBindVideos(albid);
        }

    }

}


function DeleteImageItem(GalleryItems) {
var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteImageItem");
var table = {};
table = JSON.parse(jsonResult.d);
return table;
}

function DeleteVideoItem(GalleryItems) {
    var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteVideoItem");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function deleteAlbum(albobj)
{
    debugger;
    //var imgid = $(obj).attr('imageid');
    var albid = $(albobj).attr('AlbumID');
    var GalleryItems = new Object();
    var GalleryAlbum = new Object();
    GalleryAlbum.albumId = albid;
    if (albid != "") {
        var r = confirm("Are You Sure to Delete Album?");
        if (r == true) {
          
           GalleryItems.GalleryAlbObj = GalleryAlbum;
           DeleteAlbumItem(GalleryItems);

           EditBindGalleryImageAlbum();
        }

    }
}

function DeleteAlbumItem(GalleryItems) {
    var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteAlbumItem");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function deleteVideoAlbum(albobj)
{
    debugger;
    //var imgid = $(obj).attr('imageid');
    var albid = $(albobj).attr('AlbumID');
    var GalleryItems = new Object();
    var GalleryAlbum = new Object();
    GalleryAlbum.albumId = albid;
    if (albid != "") {
        var r = confirm("Are You Sure to Delete Album?");
        if (r == true)
        {
            GalleryItems.GalleryAlbObj = GalleryAlbum;
            GalleryItems.itemType = 'video';
            DeleteVideoAlbumItem(GalleryItems);
            EditBindGalleryVideoAlbum();
        }

    }
}
function DeleteVideoAlbumItem(GalleryItems) {
    var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteVideoAlbumItem");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function BtnImageUpload()
{
    $('#AlbumUploader').click();
}

function BtnImageAddNew()
{
    $('#imageUploader').click();
}


function BtnVideoUpload()
{
    $('#AlbumVidUploader').click();
}
function BtnMoreVideoUploads()
{
    debugger;
    $('#VideoUploader').click();
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
                span.innerHTML = ['<img class="span4 dynalb" src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('imageListAlbum').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function handleFileSelectInImages(evt) {
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
                span.innerHTML = ['<img class="span4 dynimages" src="', e.target.result,
                                  '" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('imageListimages').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}




function handleFileVideoAlbum(evt)
{
    debugger;
    var files = evt.target.files; // FileList object
    alert('Loaded file is:'+files[0].name);
}

function handleVideoFile(evt) {
    debugger;
    var files = evt.target.files; // FileList object
    alert('Loaded file is:' + files[0].name);
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
function EditBindGalleryImageAlbum() {
    try {
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryImageAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            EditAppendImageAlbum(jsonResult);
        }
    }
    catch (e) {

    }
}

function AppendImageAlbum(Records)
{
    $('.Alb').remove();
        $.each(Records, function (index, Records) {
            var imgurl = Records.URL;
            if (imgurl == null)
            {
                var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon camera white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Photos</span></div></div></a></div>';
            }
            else
            {
                var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon camera white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Photos</span></div></div></a></div>';
            }
            // var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span4 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
            
        $('.ImageAlbum-Gallery').append(html);
        })
}

function EditAppendImageAlbum(Records) {
    $('.Alb').remove();
    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;
        if (imgurl == null) {
            //var html = '<div class="span3 Alb"><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i> alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
            var html = '<div class="span3 Alb"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0!important;">' + Records.AlbumName + '</div></div>';
        }
        else {
            var html = '<div class="span3 Alb"><div style="background-image: url(' + imgurl + ')!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0;!important">' + Records.AlbumName + '</div></div>';
        }
        //<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="' + Records.URL + '" alt="Sample Image 1"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
        // var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span4 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
      
        $('.ImageAlbum-Gallery').append(html);
    })
}

function ViewImages(obj)
{
    debugger;
    try {
        $('#divImageAlbum').hide();
        $('#divVideoAlbum').hide();
        $('#divVideos').hide();
        $('#divImages').show();
        // editedrow = $(this).closest('div');
       
        var imgalbid = $(obj).attr('albumid');
        var albname = $(obj).attr('AlbumName');
        document.getElementById("ImageDivTitle").innerHTML = albname;
        $("#hdfAlbumID").val(imgalbid);
        //breadcrumb handling
        $(".Gallery").remove();//removes gallery
        $("#breadcrumbGallery").append('<li class="Gallery"><i class="icon-home"></i><a href="../AdminPanel/Gallery.aspx"> Gallery </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + albname + '</li>');
        BindImages(imgalbid);
    }
    catch (e) {

    }
    
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
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = imgalbid;
        GalleryItems.GalleryAlbObj = GalleryAlbum;
        jsonResult = GetAllImageByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            AppendImages(jsonResult);
        }
    }
    catch (e) {

    }
    
}
function EditImageBind(imgalbid)
{
    try {
        var jsonResult = {};
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = imgalbid;
        GalleryItems.GalleryAlbObj = GalleryAlbum;
        jsonResult = GetAllImageByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            AppendEditImages(jsonResult);
        }
    }
    catch (e) {

    }
}

function EditVideoBind(vidalbid)
{
    try {
        var jsonResult = {};
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = vidalbid;
        GalleryItems.GalleryAlbObj = GalleryAlbum;
        jsonResult = GetAllImageByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            EditBindVideos(jsonResult);
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
    $('.attnimages').remove();
    $.each(Records, function (index, Records) {
         var html = '<a class="example-image-link" href="' + Records.URL + '" data-lightbox="example-set" data-title="Click anywhere to close."><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></a>'
         $('.Image-Gallery').append(html);
    })
}

function AppendEditImages(Records) {
    $('.attnimages').remove();
    $('.EditDiv').remove();
    $.each(Records, function (index, Records) {
       
        //var html = '<div><span class="fa fa-trash change" aria-hidden="true"></span><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></div>';
        //var html = '<div><span class="change">Delete</span><div style="position: relative !important;"><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></div></div>';
        var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="' + Records.URL + '" alt="Sample Image 1"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
        $('.Image-Gallery').append(html);
    })
}

//Videos

function BindGalleryVideoAlbum() {
    try {
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryVideoAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            AppendVideoAlbum(jsonResult);
        }
    }
    catch (e) {

    }
}


function AppendVideoAlbum(Records) {
    $('.VidAlb').remove();
    $.each(Records, function (index, Records) {
        var thumbid = Records.GroupItemID;
        if (thumbid == null) {
            var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
            
        }
        else {
            var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/vid/Poster/' + Records.GroupItemID + '.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
        }
        // var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span4 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';

        $('.VideoAlbum-gallery').append(html);
    })
}

function GetAllGalleryVideoAlbumByChurchID(GalleryAlbum) {
    var ds = {};
    var table = {};
    try {
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllGalleryVideoAlbumByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function ViewVideos(obj) {
    debugger;
    try {
        $('#divImageAlbum').hide();
        $('#divVideoAlbum').hide();
        $('#divImages').hide();
        $('#divVideos').show();
 
        var vidalbid = $(obj).attr('albumid');
        var albname = $(obj).attr('AlbumName');
        document.getElementById("VideoDivTitle").innerHTML = albname;
        $("#hdfAlbumID").val(vidalbid);
        ////breadcrumb handling
       $(".Gallery").remove();//removes gallery
       $("#breadcrumbGallery").append('<li class="Gallery"><i class="icon-home"></i><a href="../AdminPanel/Gallery.aspx"> Gallery </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + albname + '</li>');
       BindVideos(vidalbid);
    }
    catch (e) {

    }

}


function BindVideos(imgalbid) {
    try {
        var jsonResult = {};
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = imgalbid;
        GalleryItems.GalleryAlbObj = GalleryAlbum;
        jsonResult = GetAllVideosByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            AppendVideos(jsonResult);
        }
    }
    catch (e) {

    }

}

function GetAllVideosByAlbumID(GalleryItems) {
    var ds = {};
    var table = {};
    try {
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllVideosByAlbumID");
        table = JSON.parse(ds.d);
    }
    catch (e) {
    }
    return table;
}

function AppendVideos(Records) {
    debugger;
    $('.VidContainer').remove();
    $.each(Records, function (index, Records) {
        //var html = '<a class="example-image-link" href="' + Records.URL + '" data-lightbox="example-set" data-title="Click anywhere to close."><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></a>'
        var html = '<div class="VidContainer" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '"><video  style="object-fit: cover!important;"src="' + Records.URL + '" controls="controls" poster="/vid/Poster/'+Records.ID+'.jpg" loop="loop" preload="auto" height="250" width="385">HTML5 Video is required to play video</video></div>';
        $('.Video-gallery').append(html);
    })
}


function EditBindVideos(imgalbid) {
    try {
        var jsonResult = {};
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = imgalbid;
        GalleryItems.GalleryAlbObj = GalleryAlbum;
        jsonResult = GetAllVideosByAlbumID(GalleryItems);
        if (jsonResult != undefined) {
            EditAppendVideos(jsonResult);
        }
    }
    catch (e) {

    }

}

function EditAppendVideos(Records) {
    //$('.attnimages').remove();
    //$.each(Records, function (index, Records) {
    //    //var html = '<a class="example-image-link" href="' + Records.URL + '" data-lightbox="example-set" data-title="Click anywhere to close."><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></a>'
    //    var html = '<div class="VidContainer" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '"><video  src="' + Records.URL + '" controls="controls" loop="loop" preload="auto" height="250" width="385">HTML5 Video is required to play video</video></div>';
    //    $('.Video-gallery').append(html);
    //})

    $('.VidContainer').remove();
    $('.attnimages').remove();
    $('.EditDiv').remove();
    $.each(Records, function (index, Records) {
       
        //var html = '<div><span class="fa fa-trash change" aria-hidden="true"></span><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></div>';
        //var html = '<div><span class="change">Delete</span><div style="position: relative !important;"><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="Sample Image 1"/></div></div>';
        var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="/vid/Poster/' + Records.ID + '.jpg" alt="Sample Image 1"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteVideo(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
        $('.Video-gallery').append(html);

    })
}




function EditBindGalleryVideoAlbum() {
    try {
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryVideoAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            EditAppendVideoAlbum(jsonResult);
        }
    }
    catch (e) {

    }
}


function EditAppendVideoAlbum(Records) {
    $('.VidAlb').remove();
    $.each(Records, function (index, Records) {
        var thumbid = Records.GroupItemID;
        if (thumbid == null) {
          //  var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
            // var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="/img/defaultalbumadd.jpg" alt="Sample Image 1"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
            var html = '<div class="span3 VidAlb"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteVideoAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0!important;">' + Records.AlbumName + '</div></div>';
        }
        else {
            //  var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/vid/Poster/' + Records.GroupItemID + '.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';
            // var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="/vid/Poster/' + thumbid + '.jpg" alt="Sample Image 1"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
            var html = '<div class="span3 VidAlb"><div style="background-image: url(/vid/Poster/' + thumbid + '.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteVideoAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0;!important">' + Records.AlbumName + '</div></div>';
        }
        // var html = '<div AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="'+Records.AlbumID +'" class="span4 Alb"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;" class="dynamicImgAlbum span12"><div class="span12 desc">' + Records.AlbumName + '</div></div></a></div>';

        $('.VideoAlbum-gallery').append(html);

     
      


    })
}
//Videos


