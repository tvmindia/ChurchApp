$(document).ready(function () {
    try
    {
        //Minimize Click
        $('.btn-minimize').click(function (e) {
            try
            {
                e.preventDefault();
                var $target = $(this).parent().parent().next('#churchContainer');
                if ($target.is(':visible'))
                    $('i', $(this)).removeClass('chevron-up').addClass('chevron-down');
                else
                    $('i', $(this)).removeClass('chevron-down').addClass('chevron-up');
                $target.slideToggle(500);
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
           

        });
        //Edit button click
        $('.btn-setting').click(function (e) {
            try
            {
                if ($('#IdDivChurchDisplay').is(':visible')) {
                    $('i', $(this)).removeClass('pencil').addClass('eye-open');
                    $('#IdDivChurchDisplay').hide();
                    $('#IdDivChurchEdit').show();
                }
                else {
                    $('i', $(this)).removeClass('eye-open').addClass('pencil');
                    $('#IdDivChurchEdit').hide();
                    $('#IdDivChurchDisplay').show();
                }
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
            
        });
        //Clear button click
        $('#btnClear').click(function (e) {
            try
            {
                $('#txtDescription').val('');
                $('#txtCaption').val('');
            }
            catch(e)
            {
                noty({ type: 'error', text: e.message });
            }
            
        });
        //Cancel button 
        $('.cancelAll').click(function (e) {
            try {
                BindDetails();
            }
            catch (e) {
                noty({ type: 'error', text: e.message });
            }
        });
        //Save button click
        $('.saveAll').click(function (e) {

            try {
                if ($('#hdfChurchImageID').val() != '') {
                    var Church = new Object();
                    if ((imgresult = $('#flupCoverpic')[0].files.length > 0)) {
                        var formData = new FormData();
                        var imagefile;
                        imagefile = $('#flupCoverpic')[0].files[0];
                        formData.append('upImageFile', imagefile, imagefile.name);
                        formData.append('churchid', $("#hdfChurchID").val());
                        formData.append('ChurchImageID', $('#hdfChurchImageID').val());
                        formData.append('ActionTyp', 'ChurchUpdate');
                        formData.append('churchName', $('#txtCaption').val() != null ? $('#txtCaption').val() : "");
                        formData.append('description', $('#txtDescription').val() != null ? $('#txtDescription').val() : "");
                        formData.append('IsHome', true);
                        formData.append('updatedBy', document.getElementById("LoginName").innerHTML);
                        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        switch (result.status) {
                            case "1":
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                                try {
                                    BindDetails();
                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }
                    }
                    else {
                        Church.churchId = $("#hdfChurchID").val();
                        Church.IsHome = true;
                        Church.churchName = $('#txtCaption').val() != null ? $('#txtCaption').val() : "";
                        Church.description = $('#txtDescription').val() != null ? $('#txtDescription').val() : "";

                        var result = UpdateChurch(Church);

                        switch (result.status) {
                            case "1":
                                $("#hdfChurchID").val(result.churchId);
                                $("#hdfChurchImageID").val(result.mainImageId);
                                noty({ type: 'success', text: Messages.UpdationSuccessFull });
                                try {
                                    BindDetails();
                                }
                                catch (e) {
                                    noty({ type: 'error', text: e.message });
                                }
                                break;
                            case "0":
                                noty({ type: 'error', text: Messages.FailureMsgCaption });
                                break;
                            default:
                                noty({ type: 'error', text: result.status });
                                break;
                        }//switch
                    }//else
                }
            }//try

            catch (e) {
                noty({ type: 'error', text: e.message });
            }

        });
        //Bind the Church details using churchID
        BindDetails();
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    
});//End document ready

//UpdateChurch
function UpdateChurch(Church) {
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/UpdateChurch");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
//// Show Picture preview for file upload Home Church image
function UploadNow(input) {
   // debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreviewChurch').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }

}
//Function for binding textfields and image of church
function BindDetails()
{
    var churchDetail = GetChurchDetailsByChurchID();
    if (churchDetail[0].ImageURL == null)
    {
        $('.grayscale').attr('src', '/img/DefaultChurch.jpg');
    }
    else
    {
        $('.grayscale').attr('src', churchDetail[0].ImageURL + '?' + new Date().getTime());
      
    }
    
    $('#h2ChurchName').text(churchDetail[0].ChurchName);
    $('#h2ChurchName').prepend(' ⛪ <span class="break"></span>');
    $('#h3ChurchName').text(churchDetail[0].ChurchName != null ? churchDetail[0].ChurchName : "");
    $('#pChurchDesc').text(churchDetail[0].Description!=null?churchDetail[0].Description:"");
    $('#txtCaption').val(churchDetail[0].ChurchName!=null?churchDetail[0].ChurchName:"");
    $('#txtDescription').val(churchDetail[0].Description != null ? churchDetail[0].Description : "");
    $('#hdfChurchID').val(churchDetail[0].ID);
    $('#hdfChurchImageID').val(churchDetail[0].MainImageID);

}
//Function call to webmethod for retreving church details using church id
function GetChurchDetailsByChurchID() {
    var ds = {};
    var table = {};
    try {
        var Church = new Object();
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetChurchDetailsByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}