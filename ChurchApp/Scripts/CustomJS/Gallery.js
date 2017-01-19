var canvas_elem = '';
var $video = '';

$("document").ready(function (e) {
   //Container for images and videos will be hidden first 
   $('#divImages').hide();
   $('#divVideos').hide();
    try
    {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Check All the File APIs are supported by browser.     
            document.getElementById('AlbumUploader').addEventListener('change', handleFileSelect, false);
            document.getElementById('imageUploader').addEventListener('change', handleFileSelectInImages, false);
            //document.getElementById('AlbumVidUploader').addEventListener('change', handleFileVideoAlbum, false);
            //document.getElementById('VideoUploader').addEventListener('change', handleVideoFile, false);
        }
        else {
            noty({ type: 'error', text: Messages.BrowserSupport });
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
 
    $('#newalbum').click(function (e) {
        try
        {
            $('#NewAlbumModel').modal('show');
            $('.dynalb').remove();
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
      
    });
    try
    {
        BindGalleryImageAlbum();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    try
    {
        BindGalleryVideoAlbum();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
   
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
                formData.append('churchId', $('#hdfchid').val());
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                var result=postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.status)
                {
                    case "1":
                        noty({ type: 'success', text: Messages.AlbumUploadInsert });
                        BindGalleryImageAlbum();
                        break;
                    case "2":
                        noty({ type: 'error', text: Messages.AlbumNameExists });
                        break;
                    case "0":
                        noty({ type: 'error', text: Messages.AlbumUploadFailure });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;
                }
                //modal close
                $('.close').click();
            }
            else
            {
                if ($("#txtAlbumName").val() != "")
                {
                    var GalleryAlbum = new Object();
                    GalleryAlbum.albumName = (($("#txtAlbumName").val() != "" && $("#txtAlbumName").val() != null) ? $("#txtAlbumName").val() : "");
                    var result = InsertImageAlbum(GalleryAlbum);
                    switch (result.status) {
                        case "1":
                            noty({ type: 'success', text: Messages.AlbumUploadInsert });
                            BindGalleryImageAlbum();
                            break;
                        case "2":
                            noty({ type: 'error', text: Messages.AlbumNameExists });
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.AlbumUploadFailure });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                }
               
                //modal close
                $('.close').click();

            }
          
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
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
                    formData.append('createdby', document.getElementById("LoginName").innerHTML);
                    var result=postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    switch (result.status) {
                        case "1":
                        
                            noty({ type: 'success', text: Messages.AlbumUpload });
                            BindImages(albid);
                            break;
                        case "0":
                            noty({ type: 'error', text: Messages.AlbumUploadFailure });
                            break;
                        default:
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                    
                    //modal close
                    $('.close').click();

                }
            }
            
         }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }

    });
   
    $('#BtnVideoAlbumSave').click(function (e) {
      
       
        barinAlbum.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        barinAlbum.text.style.fontSize = '2rem';
        
        try {
            debugger;
            if ((videofile = $('#AlbumVidUploader')[0].files.length > 0))
            {
                $('video').css('opacity', '0.2');
                $("#progressbarUploadinVidAlbum").show();
                bar.animate(0.1);
                var video = document.getElementById('previewVideodiv1video');
                var canvas = document.getElementById('previewVideodiv1canvas');
                canvas.getContext('2d').drawImage(video,0,0,247,247);
                $('#previewVideodiv1video').trigger('pause');
                
                // Generate the image data
                var Pic = document.getElementById("previewVideodiv1canvas").toDataURL("image/png");
                Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
            }
            
            var videofile;

            if ((videofile = $('#AlbumVidUploader')[0].files.length > 0)) {
                
                barinAlbum.animate(0.1);  // Number from 0.0 to 1.0
                var formData = new FormData();
                formData.append('AlbumVideo', $('#AlbumVidUploader')[0].files[0], $('#AlbumVidUploader')[0].files[0].name);
                formData.append('Thubnailimage', Pic);
                barinAlbum.animate(0.2);
                formData.append('Album', 'GalleryVideoAlbum');
                barinAlbum.animate(0.8);
                formData.append('churchId', $('#hdfchid').val());
                barinAlbum.animate(0.8);
                formData.append('AlbumName', $("#txtVidAlbumName").val());
                barinAlbum.animate(0.8);
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                barinAlbum.animate(0.8);  // Number from 0.0 to 1.0
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                barinAlbum.animate(0.8);
                switch (result.status) {
                    case "1":
                        debugger;
                        barinAlbum.animate(1.0);  // Number from 0.0 to 1.0
                        noty({ type: 'success', text: Messages.AlbumUploadInsert });
                        BindGalleryVideoAlbum();                      
                        break;
                    case "0":
                        $('#progressbarUploadinVidAlbum').hide();
                        noty({ type: 'error', text: Messages.AlbumUploadFailure });
                        break;
                    default:
                         $("#progressbarUploadinVidAlbum").hide();
                        noty({ type: 'error', text: result.status });
                        break;
                }
                $('#BtnVideoAlbumSave').hide();
            }
            else if ($('#txtAddlink').val() != "")
            {
                var Url = GetLinkID($('#txtAddlink').val());
                if (Url != false)
                {
                    $('embed').css('opacity', '0.2');
                    $("#progressbarUploadinVidAlbum").show();
                    bar.animate(0.1);
                    barinAlbum.animate(0.3);
                    var GalleryAlbum = new Object();
                    GalleryAlbum.albumName = $("#txtVidAlbumName").val();
                    barinAlbum.animate(0.4);
                    GalleryAlbum.albumType = "video";
                    var results = InsertVideoAlbum(GalleryAlbum);
                    var GalleryItems = new Object();
                    GalleryItems.albumId = results.albumId;
                    GalleryItems.url = Url;
                    GalleryItems.itemType = "video";
                    barinAlbum.animate(0.5);
                    var result = InsertVideoItemsAlbum(GalleryItems);
                    switch (result.status) {
                        case "1":
                            debugger;
                            barinAlbum.animate(1.0);  // Number from 0.0 to 1.0
                            noty({ type: 'success', text: Messages.AlbumUploadInsert });
                            BindGalleryVideoAlbum();
                            break;
                        case "0":
                            $('#progressbarUploadinVidAlbum').hide();
                            noty({ type: 'error', text: Messages.AlbumUploadFailure });
                            break;
                        default:
                            $("#progressbarUploadinVidAlbum").hide();
                            noty({ type: 'error', text: result.status });
                            break;
                    }

                    $('#BtnVideoAlbumSave').hide();
                }
                else
                {
                    noty({ type: 'error', text: "Added Url not Supporting!" });
                }
                
            }
            else
            {
                noty({ type: 'error', text: "No file selected" });
            }
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
        }
      
    });
    $('#btnMoreVideoSave').click(function (e) {
    
        debugger
      
        bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        bar.text.style.fontSize = '2rem';
        if ((videofile = $('#VideoUploader')[0].files.length > 0)) {
            $('video').css('opacity', '0.2');
            $('#progressbarUpload').show();
            bar.animate(0.1);
            var video = document.getElementById('previewVideodiv1video1');
            var canvas = document.getElementById('previewVideodiv1canvas1');
            canvas.getContext('2d').drawImage(video, 0, 0, 247, 247);
            $('#previewVideodiv1video1').trigger('pause');
            // Generate the image data
            var Pic = document.getElementById("previewVideodiv1canvas1").toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
        }
        else if ($('#txtAddlink1').val() != "") {
            $('embed').css('opacity', '0.2');
            $("#progressbarUpload").show();
            bar.animate(0.1);
        }
        
        var albid = $('#hdfAlbumID').val();
        try {
            var videofile;
            if ((videofile = $('#VideoUploader')[0].files.length > 0)) {
                bar.animate(0.3);  // Number from 0.0 to 1.0
                var formData = new FormData();
                formData.append('Video', $('#VideoUploader')[0].files[0], $('#VideoUploader')[0].files[0].name);
                formData.append('Thubnailimage', Pic);
                bar.animate(0.4);
                formData.append('Album', 'AddMoreVideos');
                bar.animate(0.5);
                formData.append('AlbumName', $("#txtVidAlbumName").val());
                bar.animate(0.6);
                formData.append('AlbumID', albid);
                bar.animate(0.7);
                formData.append('createdby', document.getElementById("LoginName").innerHTML);
                bar.animate(0.8);
                bar.animate(0.8);  // Number from 0.0 to 1.0
                var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                switch (result.status) {
                    case "1":
                        bar.animate(1.0);  // Number from 0.0 to 1.0
                        noty({ type: 'success', text: Messages.AlbumUploadInsert });                     
                        BindVideos(albid);
                       
                        //$('#progressbarUpload').hide();
                        break;
                    case "0":
                     
                        $('#progressbarUpload').hide();
                        noty({ type: 'error', text: Messages.AlbumUploadFailure });
                        break;
                    default:

                        noty({ type: 'error', text: result.status });
                        $('#progressbarUpload').hide();
                        break;
                }
                $('#btnMoreVideoSave').hide();
            }
            else if ($('#txtAddlink1').val() != "")
            {
                var Url = GetLinkID($('#txtAddlink1').val());
                if (Url != false) {
                    bar.animate(0.4);
                    var GalleryItems = new Object();
                    GalleryItems.albumId = albid;
                    GalleryItems.url = Url;
                    GalleryItems.itemType = "video";
                    bar.animate(0.5);
                    var result = InsertVideoItemsAlbum(GalleryItems);
                    switch (result.status) {
                        case "1":
                            debugger;
                            bar.animate(1.0);  // Number from 0.0 to 1.0
                            noty({ type: 'success', text: Messages.AlbumUploadInsert });
                            BindVideos(albid);
                            break;
                        case "0":
                            $('#progressbarUpload').hide();
                            noty({ type: 'error', text: Messages.AlbumUploadFailure });
                            break;
                        default:
                            $('#progressbarUpload').hide();
                            noty({ type: 'error', text: result.status });
                            break;
                    }
                    $('#btnMoreVideoSave').hide();
                }
                }
                else
                {
                    noty({ type: 'error', text: "Added Url not Supporting!" });
                }
               
        }
        catch (e) {
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });

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
            noty({ type: 'error', text: e.message });
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
            noty({ type: 'error', text: e.message });
        }
    });
    $('#newimage').click(function (e) {

         
        //Show modal
        $('#NewImageModel').modal('show');
        //Remove previous occurances of preview images
        $('.dynimages').remove();

    });

    $('#newVideoalbum').click(function (e) {
        $('#NewVideoAlbumModel').modal('show');
        //Videonow();
        $('#progressbarUploadinVidAlbum').hide();
    });

    $('#newvideo').click(function (e) {
        $('#NewVideoModel').modal('show');
        $('#progressbarUpload').hide();

    });

    $('.modelClear').click(function (e) {
        try
        {
            debugger;
            $('#Uploaddivitems').removeClass('span6').addClass('span5');
            $('#UploadContentdiv').removeClass('span6').addClass('span5');
            $('#Uploaddivitems1').removeClass('span6').addClass('span5');
            $('#UploadContentdiv1').removeClass('span6').addClass('span5');
            $('#BtnVideoAlbumSave').show();
            $('#btnMoreVideoSave').show();
            $('video').css({'opacity': ''});
            $('#txtVidAlbumName').val('');
            $('#txtAlbumName').val('');
            $('#previewVideodiv1video').attr('src', '');
            $('#previewVideodiv1video1').attr('src', '');
            $('#previewVideoyoutubediv1video').remove();
            $('#VideoPreviewdiv').prepend('<embed id="previewVideoyoutubediv1video" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />');
            $('#VideoPreviewdiv').hide();
            $('#VideoPreviewdiv1').prepend('<embed id="previewVideoyoutubediv1video1" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />');
            $('#VideoPreviewdiv1').hide();
            $('#Fileuploadimg').show();
            $('#Fileuploadimg1').show();
            $('#Orspan').show();
            $('#AddLink').show();
            $('#txtAddlink').val('');
            $('#UrlAggingdiv').hide();
            $('#btnPlay').removeClass('anim');
            $('#Orspan1').show();
            $('#AddLink1').show();
            $('#txtAddlink1').val('');
            $('#UrlAggingdiv1').hide();
            $('#btnPlay1').removeClass('anim');
            var fileinputcontrolID = ["AlbumUploader", "imageUploader", "AlbumVidUploader", "VideoUploader"];
            var handlemethods = [handleFileSelect, handleFileSelectInImages, handleFileVideoAlbum, handleVideoFile];
            for (i = 0; i < fileinputcontrolID.length; i++)
            {
                var cloned = $("#" + fileinputcontrolID[i] + "").clone(true);
                cloned.val("");
                $("#" + fileinputcontrolID[i] + "").replaceWith(cloned);
                document.getElementById(''+ fileinputcontrolID[i] +'').addEventListener("change", handlemethods[i], false);
               
            }
        }
        catch(e)
        {
            noty({ type: 'error', text: e.message });
        }
       


    });

    try
    {
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
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }



    var value = $('#ContentPlaceHolder2_btnAddNew').val();
    if (value != "") {
         
        $('#divCreateAlbum').remove();
        $('#divCreateVideoAlbum').remove();
        $('.pencilEdit').remove();
        $('#divAddMore').remove();
        $('#divAddMoreVideos').remove();

    }

    $('#divCreateAlbum').show();
    $('#divCreateVideoAlbum').show();
    $('.pencilEdit').show();
    $('#divAddMore').show();
    $('#divAddMoreVideos').show();
    
    $('#txtAddlink').on('paste, keydown', function () {
        $('#btnPlay').addClass('anim');
    });
    $('#txtAddlink1').on('paste, keydown', function () {
        $('#btnPlay').addClass('anim');
    });
});//end of document.ready
function GetLinkID(Url)
{
    debugger;
    if (Url.includes("youtu"))
    {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = Url.match(regExp);
        var Video_ID = (match && match[7].length == 11) ? match[7] : false;
        if (Video_ID != false) {
            return "https://www.youtube.com/embed/" + Video_ID;
        }
        else {
            return Video_ID;
        }
        
    }
    else if (Url.includes("vimeo"))
    {
        
        var match = Url.split('/');
        var Video_ID = (match[(match.length)-1].length == 9) ? match[(match.length)-1] : false;
        if (Video_ID != false)
        {
            return "https://player.vimeo.com/video/" + Video_ID;
        }
        else
        {
            return Video_ID;
        }
        

    }
    else
    {
        return false;
    }
    
}
function AddYoutubeLink()
{
    $('#Fileuploadimg').hide();
    $('#Orspan').hide();
    $('#AddLink').hide();
    $('#Uploaddivitems').removeClass('span5').addClass('span6');
    $('#UploadContentdiv').removeClass('span5').addClass('span6');
    $('#UrlAggingdiv').show();

}
function AddYoutubeLinkMore() {
    $('#Fileuploadimg1').hide();
    $('#Orspan1').hide();
    $('#AddLink1').hide();
    $('#Uploaddivitems1').removeClass('span5').addClass('span6');
    $('#UploadContentdiv1').removeClass('span5').addClass('span6');
    $('#UrlAggingdiv1').show();

}
function PreviewYoutube1() {
    debugger;
    $('#previewVideoyoutubediv1video1').remove();
    $('#VideoPreviewdiv1').prepend('<embed id="previewVideoyoutubediv1video1" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />');
    var embed = document.getElementById('previewVideoyoutubediv1video1');
    if (GetLinkID($('#txtAddlink1').val()) != false) {
        embed.src = GetLinkID($('#txtAddlink1').val());
        $('#previewVideoyoutubediv1video1').show();
        $('#btnPlay1').removeClass('anim');
        $('#VideoPreviewdiv1').show();
    }
    else {
        noty({ type: 'error', text: "Added Url not Supporting!" });
    }
}
function PreviewYoutube()
{
    debugger;
    $('#previewVideoyoutubediv1video').remove();
    $('#VideoPreviewdiv').prepend('<embed id="previewVideoyoutubediv1video" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />');
    var embed = document.getElementById('previewVideoyoutubediv1video');
    if(GetLinkID($('#txtAddlink').val())!=false)
    {
        embed.src = GetLinkID($('#txtAddlink').val());
        $('#previewVideoyoutubediv1video').show();
        $('#btnPlay').removeClass('anim');
        $('#VideoPreviewdiv').show();
    }
    else
    {
        noty({ type: 'error', text: "Added Url not Supporting!" });
    }
}
function VideosAddnapshot(this_obj) {
    debugger;
    var video = document.getElementById('previewVideodiv1video1');
    video.src = URL.createObjectURL(this_obj.files[0]);
    $('#previewVideodiv1video1').show();
    $('#VideoPreviewdiv1').show();
}
function Videosnapshot(this_obj)
{
    debugger;
    var video = document.getElementById('previewVideodiv1video');
    video.src = URL.createObjectURL(this_obj.files[0]);
    $('#previewVideodiv1video').show();
    $('#VideoPreviewdiv').show();
}
function deleteImage(obj)
{
    try
    {
        var imgid = $(obj).attr('imageid');
        var albid = $(obj).attr('AlbumID');
        var GalleryItems = new Object();
        if (imgid != "") {
            var r = confirm("Are You Sure to Delete?");
            if (r == true) {
                GalleryItems.galleryItemID = imgid;
                GalleryItems.url = $(obj).attr('URL');
                var result = DeleteImageItem(GalleryItems);
                switch (result.status) {
                    case "1":

                        noty({ type: 'success', text: Messages.DeletionSuccessFull });
                        EditImageBind(albid);
                        break;
                    case "0":

                        noty({ type: 'error', text: Messages.DeletionFailure });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;
                }
            }

        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    
}
function deleteVideo(obj) {
    debugger;
    try
    {
        var imgid = $(obj).attr('imageid');
        var albid = $(obj).attr('AlbumID');
        var GalleryItems = new Object();
        if (imgid != "") {
            var r = confirm("Are You Sure to Delete?");
            if (r == true) {
                GalleryItems.galleryItemID = imgid;
                GalleryItems.url = $(obj).attr('URL');
                GalleryItems.itemType = 'video';
                var result = DeleteVideoItem(GalleryItems);

                switch (result.status) {
                    case "1":

                        noty({ type: 'success', text: Messages.DeletionSuccessFull });
                        EditBindVideos(albid);
                        break;
                    case "0":

                        noty({ type: 'error', text: Messages.DeletionFailure });
                        break;
                    default:
                        break;
                }

            }

        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
  

}


function DeleteImageItem(GalleryItems)
{
    try
    {
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteImageItem");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }

}

function DeleteVideoItem(GalleryItems)
{
    try
    {
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteVideoItem");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}

function deleteAlbum(albobj)
{
    debugger;

    try
    {
        var albid = $(albobj).attr('AlbumID');
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = albid;
        if (albid != "") {
            var r = confirm("Are You Sure to Delete Album?");
            if (r == true) {

                GalleryItems.GalleryAlbObj = GalleryAlbum;
                var result = DeleteAlbumItem(GalleryItems);

                switch (result.status) {
                    case "1":
                        noty({ type: 'success', text: Messages.DeletionSuccessFull });
                        EditBindGalleryImageAlbum();
                        break;
                    case "0":

                        noty({ type: 'error', text: Messages.DeletionFailure });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;
                }

            }

        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function DeleteAlbumItem(GalleryItems) {
    try
    {
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteAlbumItem");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function deleteVideoAlbum(albobj)
{
    debugger;
    try
    {
        var albid = $(albobj).attr('AlbumID');
        var GalleryItems = new Object();
        var GalleryAlbum = new Object();
        GalleryAlbum.albumId = albid;
        if (albid != "") {
            var r = confirm("Are You Sure to Delete Album?");
            if (r == true) {
                GalleryItems.GalleryAlbObj = GalleryAlbum;
                GalleryItems.itemType = 'video';
                var result = DeleteVideoAlbumItem(GalleryItems);
                switch (result.status) {
                    case "1":


                        noty({ type: 'success', text: Messages.DeletionSuccessFull });
                        EditBindGalleryVideoAlbum();
                        break;
                    case "0":

                        noty({ type: 'error', text: Messages.DeletionFailure });
                        break;
                    default:
                        noty({ type: 'error', text: result.status });
                        break;
                }

            }

        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });

    }
   
}
function DeleteVideoAlbumItem(GalleryItems) {
    try
    {
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/DeleteVideoAlbumItem");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
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
    $('#Orspan').hide();
    $('#AddLink').hide();
    $('#UrlAggingdiv').hide();
    $('#Uploaddivitems').removeClass('span5').addClass('span6');
    $('#UploadContentdiv').removeClass('span5').addClass('span6');
    $('#AlbumVidUploader').click();
}
function BtnMoreVideoUploads()
{
    $('#Orspan1').hide();
    $('#AddLink1').hide();
    $('#UrlAggingdiv1').hide();
    $('#Uploaddivitems1').removeClass('span5').addClass('span6');
    $('#UploadContentdiv1').removeClass('span5').addClass('span6');
    $('#VideoUploader').click();
}
function handleFileSelect(evt) {
    try
    {
        $('.dynalb').remove();
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function handleFileSelectInImages(evt) {
    try
    {
        $('.dynimages').remove();
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
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}




function handleFileVideoAlbum(evt)
{
 
   // var files = evt.target.files; // FileList object
   // $("#previewVideodiv").append('<span><i class="halflings-icon facetime-video"></i>' + files[0].name + '</span>');
 }

function handleVideoFile(evt) {
    // var files = evt.target.files; // FileList object
    //$("#previewupVideodiv").append('<span><i class="halflings-icon facetime-video"></i>' + files[0].name + '</span>');
  }
function InsertImageAlbum(GalleryAlbum) {
    try
    {
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/InsertImageAlbum");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
  
}

function InsertVideoAlbum(GalleryAlbum) {
    try {
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/InsertVideoAlbum");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}
function InsertVideoItemsAlbum(GalleryItems) {
    try {
        var data = "{'GalItemsObj':" + JSON.stringify(GalleryItems) + "}";
        jsonResult = getJsonData(data, "../AdminPanel/Gallery.aspx/InsertVideoItemAlbum");
        var table = {};
        table = JSON.parse(jsonResult.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }

}

function BindGalleryImageAlbum()
{
    try
    {
        debugger;
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryImageAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            AppendImageAlbum(jsonResult);
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
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
        noty({ type: 'error', text: e.message });
    }
}

function AppendImageAlbum(Records)
{
    try
    {
        $('.Alb').remove();
        $.each(Records, function (index, Records) {
            var imgurl = Records.URL;
            if (imgurl == null) {
                var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon camera white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Photos</span></div></div></a></div>';
            }
            else {
                var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewImages(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 Alb Card"><a alt="Church"><div style="background-image: url(' + imgurl + ')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + Records.AlbumName + '</span><br><span class="badge"><i class="halflings-icon camera white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Photos</span></div></div></a></div>';
            }
            $('.ImageAlbum-Gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function EditAppendImageAlbum(Records) {
    try
    {
        $('.Alb').remove();
        $.each(Records, function (index, Records) {
            var imgurl = Records.URL;
            if (imgurl == null) {
               var html = '<div class="span3 Alb"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0!important;">' + Records.AlbumName + '</div></div>';
            }
            else {
                var html = '<div class="span3 Alb"><div style="background-image: url(' + imgurl + ')!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0;!important">' + Records.AlbumName + '</div></div>';
            }
            $('.ImageAlbum-Gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function ViewImages(obj)
{
     
    try {
        $('#divImageAlbum').hide();
        $('#divVideoAlbum').hide();
        $('#divVideos').hide();
        $('#divImages').show();

       
        var imgalbid = $(obj).attr('albumid');
        var albname = $(obj).attr('AlbumName');
        document.getElementById("ImageDivTitle").innerHTML = albname;
        $("#hdfAlbumID").val(imgalbid);
        //breadcrumb handling
        $(".Gallery").remove();//removes gallery
        $("#breadcrumbGallery").append('<li class="Gallery"><a href="../AdminPanel/Gallery.aspx"> Gallery </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + albname + '</li>');
        BindImages(imgalbid);
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
    
}

function GetAllGalleryImageAlbumByChurchID(GalleryAlbum)
{
  
    try {
        debugger;
        var ds = {};
        var table = {};
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllGalleryImageAlbumByChurchID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
  
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
        noty({ type: 'error', text: e.message });
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
        noty({ type: 'error', text: e.message });

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
        noty({ type: 'error', text: e.message });
    }
}
function GetAllImageByAlbumID(GalleryItems)
{
   
    try {
        var ds = {};
        var table = {};

        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllImageByAlbumID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
   

}

function AppendImages(Records) {
    try
    {
        $('.attnimages').remove();
        $.each(Records, function (index, Records) {
            var html = '<a class="AlbumImages-link" href="' + Records.URL + '" data-lightbox="AlbumImages" data-title="Click anywhere to close."><img AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="attnimages" src="' + Records.URL + '" alt="' + Records.URL + '"/></a>'
            $('.Image-Gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function AppendEditImages(Records) {
    try
    {
        $('.attnimages').remove();
        $('.EditDiv').remove();
        $.each(Records, function (index, Records) {


            var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="' + Records.URL + '" alt="' + Records.URL + '"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteImage(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
            $('.Image-Gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
    
}

//Videos

function BindGalleryVideoAlbum() {
    try {
        debugger;
        var jsonResult = {};
        var GalleryAlbum = new Object();
        jsonResult = GetAllGalleryVideoAlbumByChurchID(GalleryAlbum);
        if (jsonResult != undefined) {
            AppendVideoAlbum(jsonResult);
        }
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
}


function AppendVideoAlbum(Records) {
    try
    {
        debugger;
        $('.VidAlb').remove();
        $.each(Records, function (index, Records) {
            if (Records.Itemsource == "EXTL")
            {
                var VideoUrl = Records.URL;
                if(VideoUrl.includes("youtube"))
                {
                    var AlbumName = ((Records.AlbumName != null && Records.AlbumName != "") ? Records.AlbumName : "My Album");
                    var thumbid = Records.GroupItemID;
                    var youtube_video_id = VideoUrl.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
                    var VideothumbUrl="//img.youtube.com/vi/"+youtube_video_id+"/0.jpg";
                    if (thumbid == null) {
                        var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                    }
                    else {
                        var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url('+VideothumbUrl+')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                    }
                }
                else if(VideoUrl.includes("vimeo"))
                {
                    debugger;
                    var featuredImg = "";
                    var AlbumName = ((Records.AlbumName != null && Records.AlbumName != "") ? Records.AlbumName : "My Album");
                    var thumbid = Records.GroupItemID;
                    var match = /vimeo.*\/(\d+)/i.exec(VideoUrl);
                    if (match) {
                        var vimeoVideoID = match[1];
                        var VideothumbUrl = "/vid/Poster/vimeo.png";//"//i.vimeocdn.com/video/"+vimeoVideoID+".jpg";
                        if (thumbid == null) {
                            var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                        }
                        else {
                            var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(' + VideothumbUrl + ')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                        }
                    }
                }
            }
            else
            {
                var AlbumName = ((Records.AlbumName != null && Records.AlbumName != "") ? Records.AlbumName : "My Album");
                var thumbid = Records.GroupItemID;
                if (thumbid == null) {
                    var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                }
                else {
                    var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(/vid/Poster/' + Records.GroupItemID + '.jpg)!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                }
            }
            
            $('.VideoAlbum-gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}

function GetAllGalleryVideoAlbumByChurchID(GalleryAlbum) {
   
    try {
        debugger;
        var ds = {};
        var table = {};
        var data = "{'GalleryAlbumObj':" + JSON.stringify(GalleryAlbum) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllGalleryVideoAlbumByChurchID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
   
}

function ViewVideos(obj) {
     
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
       $("#breadcrumbGallery").append('<li class="Gallery"><a href="../AdminPanel/Gallery.aspx"> Gallery </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + albname + '</li>');
       BindVideos(vidalbid);
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
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
        noty({ type: 'error', text: e.message });
    }

}

function GetAllVideosByAlbumID(GalleryItems) {
   
    try {
        var ds = {};
        var table = {};
        var data = "{'GalleryItemsObj':" + JSON.stringify(GalleryItems) + "}";
        ds = getJsonData(data, "../AdminPanel/Gallery.aspx/GetAllVideosByAlbumID");
        table = JSON.parse(ds.d);
        return table;
    }
    catch (e) {
        noty({ type: 'error', text: e.message });
    }
  
}

function AppendVideos(Records) {
    try
    {
        $('.VidContainer').remove();
        $.each(Records, function (index, Records) {
            if (Records.Source == "EXTL")
            {
                var html = '<div class="VidContainer" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '"><embed width="385" height="250" src="' + Records.URL + '" frameborder="0" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" /></div>';
            }
            else
            {
                var html = '<div class="VidContainer" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '"><video  style="object-fit: cover!important;" src="' + Records.URL + '" controls="controls" poster="/vid/Poster/' + Records.ID + '.jpg" loop="loop" preload="auto" height="250" width="385">HTML5 Video is required to play video</video></div>';
            }
            
            $('.Video-gallery').append(html);

        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
 
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
        noty({ type: 'error', text: e.message });
    }

}

function EditAppendVideos(Records) {
  
    try
    {
        $('.VidContainer').remove();
        $('.attnimages').remove();
        $('.EditDiv').remove();
        $.each(Records, function (index, Records) {
            debugger;
            if (Records.Source == "EXTL")
            {
                var VideoUrl = Records.URL;
                if(VideoUrl.includes("youtube"))
                {
                    var AlbumName = ((Records.AlbumName != null && Records.AlbumName != "") ? Records.AlbumName : "My Album");
                    var thumbid = Records.GroupItemID;
                    var youtube_video_id = VideoUrl.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
                    var VideothumbUrl="//img.youtube.com/vi/"+youtube_video_id+"/0.jpg";
                   
                        //var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url('+VideothumbUrl+')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                        var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="' + VideothumbUrl + '" alt="' + Records.URL + '"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteVideo(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
                }
                else if(VideoUrl.includes("vimeo"))
                {
                    debugger;
                    var featuredImg = "";
                    var AlbumName = ((Records.AlbumName != null && Records.AlbumName != "") ? Records.AlbumName : "My Album");
                    var thumbid = Records.GroupItemID;
                    var match = /vimeo.*\/(\d+)/i.exec(VideoUrl);
                    if (match) {
                        var vimeoVideoID = match[1];
                        var VideothumbUrl = "/vid/Poster/vimeo.png";//"//i.vimeocdn.com/video/"+vimeoVideoID+".jpg";
                        
                            //var html = '<div style="background-image: url(/img/bg-login.jpg)!important;padding-left: 6px;margin-left: 10px !important;margin-bottom: 10px !important;" onclick="ViewVideos(this)" AlbumID="' + Records.AlbumID + '" AlbumName="' + AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="span3 VidAlb Card"><a alt="Church"><div style="background-image: url(' + VideothumbUrl + ')!important;height:247px;transform:rotate(2deg)" class="dynamicImgAlbum span12 Card"><div class="span12 desc"><span> ' + AlbumName + '</span><br><span class="badge"><i class="halflings-icon facetime-video white"></i> ' + Records.ItemCount + '</span><span style="font-size: 12px;font-weight: 300;"> Videos</span></div></div></a></div>';
                            var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="' + VideothumbUrl + '" alt="' + Records.URL + '"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteVideo(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
                    }
                }
            }
            else
            {
                var html = '<div class="EditDiv"><img style="width: 100% !important;" class="Editimage" src="/vid/Poster/' + Records.ID + '.jpg" alt="' + Records.URL + '"/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" AlbumID="' + Records.AlbumID + '" ImageID="' + Records.ID + '" ImageType="' + Records.Type + '" class="circlebtn circlebtn-danger deletetext" onclick="deleteVideo(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div>';
            }
            
            $('.Video-gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
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
        noty({ type: 'error', text: e.message });
    }
}


function EditAppendVideoAlbum(Records) {
    try
    {
        $('.VidAlb').remove();
        $.each(Records, function (index, Records) {
            var thumbid = Records.GroupItemID;
            if (thumbid == null) {

                var html = '<div class="span3 VidAlb"><div style="background-image: url(/img/defaultalbumadd.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteVideoAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0!important;">' + Records.AlbumName + '</div></div>';
            }
            else {

                var html = '<div class="span3 VidAlb"><div style="background-image: url(/vid/Poster/' + thumbid + '.jpg)!important;height:247px;opacity: 0.3;" class="dynamicImgAlbum span12"></div><a AlbumID="' + Records.AlbumID + '" AlbumName="' + Records.AlbumName + '" AlbumType="' + Records.AlbumType + '" GroupItemID="' + Records.GroupItemID + '" Type="' + Records.Type + '" id="' + Records.AlbumID + '" class="circlebtn circlebtn-danger" style="z-index: 1;position: relative;font-size: 16px;font-weight: bold;left: 46%;top: -56%;cursor: pointer;" onclick="deleteVideoAlbum(this)"><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><div class="span12" style="padding: 15px;text-align: center;background-color: #fff;color: black;font-size: 18px;margin-top: -30%;position: relative;font-weight: 300;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;margin-left: 0;!important">' + Records.AlbumName + '</div></div>';
            }
            $('.VideoAlbum-gallery').append(html);
        })
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
}



