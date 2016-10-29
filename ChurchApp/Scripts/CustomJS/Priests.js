$(document).ready(function () {
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        // Great success! All the File APIs are supported.     
        document.getElementById('imageUpload').addEventListener('change', handleFileSelect, false);
    }



    function handleFileSelect(evt) {
        try {
            var files = evt.target.files; // FileList object
            $("#imageList").find(".thumb").remove();
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
                    document.getElementById('imageList').insertBefore(span, null);
                };
            })(f);
            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
            //}
        }
        catch (e) {
           
        }
    }


    $('.priestEdit').click(function (e) {
        e.preventDefault();
        $('#PriestEditDivBox').show();
       

    });


});