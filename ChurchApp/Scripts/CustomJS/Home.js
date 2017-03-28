var churchObject = {};
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
        //$('.btn-setting').click(function (e) {
        //    try
        //    {
        //        if ($('#IdDivChurchDisplay').is(':visible')) {
        //            //$('i', $(this)).removeClass('pencil').addClass('eye-open');
        //            $('#IdDivChurchDisplay').hide();
        //            $('#IdDivChurchEdit').show();
        //        }
        //        else {
        //            //$('i', $(this)).removeClass('eye-open').addClass('pencil');
        //            $('#IdDivChurchEdit').hide();
        //            $('#IdDivChurchDisplay').show();
        //        }
        //    }
        //    catch(e)
        //    {
        //        noty({ type: 'error', text: e.message });
        //    }
            
        //});
        churchObject.chid = $("#hdfchid").val();
        //Clear button click
        $('#btnClear').click(function (e) {
            try
            {
                $('#txtDescription').val('');
                $('#txtCaption').val('');
                $('#txtNumber').val('');
                $('#txtAddress').val('');

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
        $('#btnSave').click(function (e) {

            try {
                debugger;
                if ($('#hdfChurchID').val() != '') {
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
                        formData.append('phone1', $('#txtNumber').val() != null ? $('#txtNumber').val() : "");
                        formData.append('address', $('#txtAddress').val() != null ? $('#txtAddress').val() : "");
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
                        Church.phone1 = $('#txtNumber').val() != null ? $('#txtNumber').val() : "";
                        Church.address = $('#txtAddress').val() != null ? $('#txtAddress').val() : "";
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
        BindChurchDetails();
        var Role = GetRoleforAuthentication();
        if (Role == "User") {
            $('.buttonpatch').hide();
        }
    }
    catch(e)
    {
        noty({ type: 'error', text: e.message });
    }
   
    
});//End document ready

function EditChurch()
{
    $('#IdDivChurchDisplay').hide();
    $('#IdDivChurchEdit').show();
    Dynamicbutton('btnEdit', 'EditCancel', '');
    Dynamicbutton('btnReset', 'Reset', 'ViewChurch');

}
function ViewChurch()
{
    $('#IdDivChurchEdit').hide();
    $('#IdDivChurchDisplay').show();
    Dynamicbutton('btnEdit', 'Edit', 'EditChurch');
    Dynamicbutton('btnReset', 'ResetCancel', '');
}
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
   // 
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
    debugger;
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
    $('#h3ChurchPhone').text(churchDetail[0].Phone1 != null ? churchDetail[0].Phone1 : "");
    $('#h3ChurchAddress').text(churchDetail[0].Address != null ? churchDetail[0].Address : "");
    $('#pChurchDesc').text(churchDetail[0].Description!=null?churchDetail[0].Description:"");
    $('#txtCaption').val(churchDetail[0].ChurchName!=null?churchDetail[0].ChurchName:"");
    $('#txtDescription').val(churchDetail[0].Description != null ? churchDetail[0].Description : "");
    $('#txtNumber').val(churchDetail[0].Phone1 != null ? churchDetail[0].Phone1 : "");
    $('#txtAddress').val(churchDetail[0].Address != null ? churchDetail[0].Address : "");
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

//----------------------------------------------------------------------Church Details section-------------------------
function UploadDetailNow(input) {
    // 
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgPreviewChurchDetail').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }

}
function AddChurchDetails()
{
    $('#txtCaptionDetails').val('');
    $('#txtDescriptionDetails').val('');
    $('#imgPreviewChurchDetail').attr('src',"../img/No-Img_Chosen.png");
    $('#hdfChurchDetailID').val('');
    $('#hdfChurchDetailImageID').val('');
    $('#btnSaveDetails').attr('onclick', 'SaveChurchDetails()');
    $('#btnSaveDetails').removeClass('rss');
    $('#btnSaveDetails').addClass('facebook');
    $('#btnResetDetail').attr('onclick', 'AddChurchDetails()');
    $('#btnResetDetail').removeClass('rss');
    $('#btnResetDetail').addClass('facebook');
    $('#EditChurchDetails').show(500);
    $('#txtCaptionDetails').focus();
    document.getElementById('flupChurchDetail').value = '';
}
function SaveChurchDetails()
{
    debugger;
    var Caption=$('#txtCaptionDetails').val();
    var Description=$('#txtDescriptionDetails').val();
    var DetailID=$('#hdfChurchDetailID').val();
    var ImageID = $('#hdfChurchDetailImageID').val();
    //
    var ChurchDetails = new Object();
    ChurchDetails.churchDetailID = DetailID;
    ChurchDetails.caption = Caption;
    ChurchDetails.DetailDescription = Description;
    ChurchDetails.churchId = churchObject.chid;
    //
    if(DetailID!="")
    {
    var imgresult;
    if ((imgresult = $('#flupChurchDetail')[0].files.length > 0)) {
        ChurchDetails.imageId = ImageID;
        var formData = new FormData();
        var imagefile;
        imagefile = $('#flupChurchDetail')[0].files[0];
        formData.append('upImageFile', imagefile, imagefile.name);
        formData.append('churchId', ChurchDetails.churchId);
        formData.append('churchDetailID', ChurchDetails.churchDetailID);
        formData.append('ChurchDetailImageId', ChurchDetails.imageId);
        formData.append('caption', ChurchDetails.caption);
        formData.append('DetailDescription', ChurchDetails.DetailDescription);
        formData.append('updatedby', document.getElementById("LoginName").innerHTML);
        formData.append('ActionTyp', 'ChurchDetailUpdate');
        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
        if (result.status == "1") {
            noty({ text: Messages.UpdationSuccessFull, type: 'success' });
            document.getElementById('flupChurchDetail').value = '';
            BindChurchDetails();
        }
        else {
            noty({ text: Messages.UpdationFailure, type: 'error' });
            
        }
        }
        else {
        var UpdationStatus = UpdateChurchDetails(ChurchDetails);

        if (UpdationStatus.status == "1") {
            noty({ text: Messages.UpdationSuccessFull, type: 'success' });
            BindChurchDetails();
        }

        else {
            noty({ text: Messages.UpdationFailure, type: 'error' });
        }
        }
        }
        else {

    //INSERT
    ///////Image insert using handler
    var imgresult;
    if ((imgresult = $('#flupChurchDetail')[0].files.length > 0)) {

        var formData = new FormData();
        var imagefile;
        imagefile = $('#flupChurchDetail')[0].files[0];
        formData.append('upImageFile', imagefile, imagefile.name);
        formData.append('churchId', ChurchDetails.churchId);
        formData.append('ChurchDetailImageId', ChurchDetails.imageId);
        formData.append('caption', ChurchDetails.caption);
        formData.append('DetailDescription', ChurchDetails.DetailDescription);
        formData.append('createdby', document.getElementById("LoginName").innerHTML);
        formData.append('ActionTyp', 'ChurchDetailInsert');
        var result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
        if (result.status == "1") {
            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
            document.getElementById('flupChurchDetail').value = '';
            $('#hdfChurchDetailID').val(result.churchDetailID);
            $('#hdfChurchDetailImageID').val(result.imageId);
            BindChurchDetails();
            }

        else {
            noty({ text: Messages.InsertionFailure, type: 'error' });
        }
        BindChurchDetails();

    }
    else {
        var InsertionStatus = InsertChurchDetails(ChurchDetails);

        if (InsertionStatus.status == "1") {
            noty({ text: Messages.InsertionSuccessFull, type: 'success' });
            $('#hdfChurchDetailID').val(InsertionStatus.churchDetailID);
            $('#hdfChurchDetailImageID').val(InsertionStatus.imageId);
            BindChurchDetails();
        }

        else {
            noty({ text: Messages.InsertionFailure, type: 'error' });
        }
        BindChurchDetails();
    }
    }
}
function InsertChurchDetails(ChurchDetails)
{
    debugger;
    var ds = {};
    var table = {};
    try {
        var data = "{'churchDetObj':" + JSON.stringify(ChurchDetails) + "}";
        ds = getJsonData(data, "../AdminPanel/Home.aspx/InsertChurchDetailsData");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function UpdateChurchDetails(ChurchDetails) {
    debugger;
    var ds = {};
    var table = {};
    try {
        var data = "{'churchDetObj':" + JSON.stringify(ChurchDetails) + "}";
        ds = getJsonData(data, "../AdminPanel/Home.aspx/UpdateChurchDetails");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function BindChurchDetails()
{
    debugger;
    var DetailList = GetChurchDetails();
    $('#ChurchDetailDisplay').empty();
    for(var i=0;i<DetailList.length;i++)
    {
        var html=' <ul class="thumbnails span4">'
              +'<li class="span12"><div class="thumbnail">'
                  + '<img src="' + (DetailList[i].URL != "" && DetailList[i].URL !=null? (DetailList[i].URL + '?' + new Date().getTime()) : "../img/No-Img_Chosen.png") + '" style="max-height:300px;min-height:300px;"><div class="caption"><h3>' + DetailList[i].Caption + '</h3>'
                    + '<p style="white-space: pre;max-height:100px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 7;-webkit-box-orient: vertical;max-height: 11.6em;min-height: 11.6em;">' + DetailList[i].Description + '</p>'
                    +'<p class="buttonpatch" style="height:0px;position:relative;z-index:196;">'
			         + '<a class="facebook" title="Edit" onclick="EditChurchDetails(\'' + DetailList[i].ID + '\')"><img src="/img/edit.png"/></a>'
                     + '<a class="facebook" title="Delete" onclick="DeleteChurchDetails(\'' + DetailList[i].ID + '\')"><img src="/img/delete.png"/></a>'
                     + '</p></div></div></li></ul>'
        $('#ChurchDetailDisplay').append(html);
    }
}
function EditChurchDetails(id)
{
    debugger;
    var Result = GetChurchDetailsDataByDetailID(id);
    $('#txtCaptionDetails').val(Result.caption);
    $('#txtDescriptionDetails').val(Result.DetailDescription);
    $('#imgPreviewChurchDetail').attr('src', (Result.URL != "" ? Result.URL : "../img/No-Img_Chosen.png"));
    $('#hdfChurchDetailID').val(Result.churchDetailID);
    $('#hdfChurchDetailImageID').val(Result.imageId);
    $('#btnSaveDetails').attr('onclick', 'SaveChurchDetails()');
    $('#btnSaveDetails').removeClass('rss');
    $('#btnSaveDetails').addClass('facebook');
    $('#EditChurchDetails').show(500);
    Animateto("scrollhere");
    $('#txtCaptionDetails').focus();
}
function DeleteChurchDetails(id)
{
    var deleteConirm = confirm("Want to delete?");

    if (deleteConirm) {
        var Result = DeleteChurchDetail(id);
        if (Result.status == "1") {
            noty({ text: Messages.DeletionSuccessFull, type: 'success' });
            $('#EditChurchDetails').hide();
            BindChurchDetails();
        }
        else {
            noty({ text: Messages.DeletionFailure, type: 'error' });

        }
    }
}
function GetChurchDetailsDataByDetailID(ID) {
    var ds = {};
    var table = {};
    try {
        var ChurchDetails = new Object();
        ChurchDetails.churchDetailID = ID;
        var data = "{'churchDetObj':" + JSON.stringify(ChurchDetails) + "}";
        ds = getJsonData(data, "../AdminPanel/Home.aspx/GetChurchDetailsDataByDetailID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function DeleteChurchDetail(ID)
{
    var ds = {};
    var table = {};
    try {
        var ChurchDetails = new Object();
        ChurchDetails.churchDetailID = ID;
        var data = "{'churchDetObj':" + JSON.stringify(ChurchDetails) + "}";
        ds = getJsonData(data, "../AdminPanel/Home.aspx/DeleteChurchDetail");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}
function GetChurchDetails()
{
    var ds = {};
    var table = {};
    try {
        var ChurchDetails = new Object();
        var data = "{'churchDetObj':" + JSON.stringify(ChurchDetails) + "}";
        ds = getJsonData(data, "../AdminPanel/Home.aspx/GetDetailsDataByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}