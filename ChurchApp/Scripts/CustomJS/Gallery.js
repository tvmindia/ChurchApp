$("document").ready(function (e) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All the File APIs are supported.     
        document.getElementById('AlbumUploader').addEventListener('change', handleFileSelect, false);
    }
   
    $('#newalbum').click(function (e) {
       
        $('#NewAlbumModel').modal('show');
    });
   
    $('#btnSaveImageAlbum').click(function (e) {
        debugger;

        var AppImgURL = '';
        var ID = $("#hdfID").val();
     //   if (NoticeID == null || NoticeID == "") {
            //var guid = createGuid();

            //  if (guid != null) {

                var imgresult = "";
                //var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile;

                //if ((imagefile = $('#UpNotice')[0].files[0]) != undefined) {
                //    img = new Image();
                //    var image = $('#UpNotice')[0].files[0];
                //   // imagefile.name = guid;
                //    formData.append('tempfile', image, imagefile.name);
                //    formData.append('ActionTyp', 'BannerInsert');
                //    var result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");

        //}
                var formData = new FormData();
                var tempFile;
                var i=0;
                if ((imagefile = $('#AlbumUploader')[0].files.length > 0)) {
                    for (i = 0; i < $('#AlbumUploader')[0].files.length ; i++)
                    {
                        formData.append('AlbumImage'+i, $('#AlbumUploader')[0].files[i], $('#AlbumUploader')[0].files[i].name);
                       
                    }
                }

               
                    //formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

               

           






       
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
