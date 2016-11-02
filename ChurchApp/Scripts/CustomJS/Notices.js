
var imageId         =  '';
var imgPath         =  '';

var DeletedImgID    =  '';
var DeletedImgPath      =  '';


//var ImageIDOnEdit = '';

$("document").ready(function (e) {
    debugger;
   
    BindNotices();
  //  BindNoticesOnEdit();
   
    $("#ddlNoticeType").select2({
       placeholder: "Choose Types",
        allowClear: true,
        data: BindNoticeTypeDropDown()
    });

    $(".aViewDetails").click(function () {
        //do something
        debugger;
        var NoticeID = $(this).attr('id');

        //var NoticeID = $(this).siblings('#hdfNoticeID').attr('id');
        //NoticeID = $(this).parents().find('input[type=hidden]').attr('id');


        //NoticeID = $(this).find('input:hidden').attr('id');

        $("#hdfNoticeID").val(NoticeID);

        var Notices = new Object();
        Notices.noticeId = NoticeID;

        BindControlsOnEdit(Notices);

      //  alert(NoticeID);

    });

    $('#btnSave').click(function (e) {
       
        debugger;


        var NoticeID = $("#hdfNoticeID").val();
        if (NoticeID == null || NoticeID == "")
        {
        var guid = createGuid();

        DeletedImgID = imageId;
        DeletedImgPath = imgPath

        if (guid != null) {

            var imgresult = "";
            var _URL = window.URL || window.webkitURL;
            var formData = new FormData();
            var imagefile, logoFile, img;

            //if ((imagefile = $('#UpNotice')[0].files[0]) != undefined) {
            //    img = new Image();
            //    var image = $('#UpNotice')[0].files[0];
            //   // imagefile.name = guid;
            //    formData.append('tempfile', image, imagefile.name);
            //    formData.append('ActionTyp', 'BannerInsert');
            //    var result = postBlobAjax(formData, "../ImageHandler/PhotoUploadHandler.ashx");

            //}


            if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                  var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#UpNotice')[0].files[0]) != undefined) {
                        tempFile.name = guid;
                        formData.append('tempfile', tempFile, tempFile.name);
                        formData.append('GUID', guid);
                    }
                    formData.append('ActionTyp', 'NewsLetterTemplate');
                    result = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

            }

        }

        var Notices = new Object();
        Notices.noticeName = $("#txtNoticeName").val();
        Notices.description = $("#txtDescription").val();
        Notices.noticeType = $("#ddlNoticeType").val();
        // Notices.isDelete = 0;
        if (imageId != null && imageId != "") {
            Notices.imageId = imageId;
        }

        Notices.noticeId = guid;
        Notices.imageId = guid;

        //if (NoticeID != null && NoticeID != "")
        //{
        //    Notices.noticeId = NoticeID
        //}
        //else
        //{
        //    Notices.noticeId = guid;
        //}

        InsertNotice(Notices);
        BindNotices();
        ClearControls();

        debugger;

        //if (DeletedImgID != '') {
        //    var AppImages = new Object();
        //    AppImages.appImageId = DeletedImgID;
        //    DeleteAppImage(AppImages);

        //    if (DeletedImgPath != '') {
        //        DeleteFileFromFolder(DeletedImgPath);
        //    }

        //}

    }
    });

    $('#btnCancel').click(function (e) {
        ClearControls();

    });

    $('#btnDelete').click(function (e)
    {
        debugger;

        var NoticeID = $("#hdfNoticeID").val();

        var Notices = new Object();
        Notices.noticeId = NoticeID;

      var DeletionStatus =  DeleteNotice(Notices);

      //if (DeletionStatus.status == "1")
      //{
          var AppImages = new Object();
          AppImages.appImageId = imageId;
          DeleteAppImage(AppImages);

          DeleteFileFromFolder(imgPath);

      //}


    });

    $('#btnAdd').click(function (e) {
     
        $("#PriestEditDivBox").show();


    });

   // BindControlsOnEdit();

    //$(function () {
    //$('#btnUpload').click(function () {
    //        debugger;

        
    //    });
    //})

});

function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



function DeleteNotice(Notices)
{
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/DeleteNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function DeleteFileFromFolder(imgPath) {

    $.ajax({
        type: "POST",
        url: "../AdminPanel/Notices.aspx/DeleteFileFromFolder",
        data: '{imgPath: "' + imgPath + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: alert(1),
        failure: function (response) {

            // alert(response.d);
        },
        error: function (response) {

            // alert(response.d);
        }
    });
}

function GetInsertedImgID(result)
{
    var json = InsertAppImage(result);

    imageId = json.appImageId;
    $("#hdfImageID").val(imageId);

    alert(imageId);

}

function DeleteAppImage(AppImages)
{
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertAppImage(result)
{
    debugger;
   
    var AppImages = new Object();
    AppImages.url = result;

    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

    //imageId
}

//Notice Type Dropdown
function BindNoticeTypeDropDown() {
    debugger;
    var jsonResult = {};
    var NoticeType = new Object();
    jsonResult = GetAllNoticeTypes(NoticeType);
    if (jsonResult != undefined) {
        return jsonResult;
    }
}

function GetAllNoticeTypes(NoticeType) {
    var ds = {};
    var table = {};
    var data = "{'NoticeTypeObj':" + JSON.stringify(NoticeType) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeTypes");
    table = JSON.parse(ds.d);
    return table;
}

// Bind Notices
function BindNotices() {

    debugger;

    var jsonResult = {};
    var Notices = new Object();
    jsonResult = GetNotices(Notices);
    if (jsonResult != undefined) {
       //FillNotice(jsonResult);
    }
}

function FillNotice(Records)
{
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;
        //hdfNoticeID

        var url = Records.URL;
        var fileName = "";

        if (url != null && url != "") {

        var index = url.lastIndexOf('\\');
         fileName = url.substr(index + 1);
        }
        //var last = url.Split().Last();

       
     //   url = url.replace(/\+/g, ' ');
        var html = '<div class="task high"> <div class="span12" id="divulContainer"><ul class="dashboard-list"><li class="liNoticeList"><div class="span3"><a href="#"><img class="imgNotice" id=img'+Records.ID+'  src=../ImageHandler/UploadHandler.ashx?url=' + url + ' /></a></div><div class="span9"><p class="pContainerNotice"><span style="font-weight:bold;color:#FA603D;">' + Records.NoticeName + '&nbsp;<a href="#" class="aViewDetails" id=' + Records.ID + '>View Details</a></span><br/>' + Records.Description + '</p></div> </li></ul></div>  <input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div>'

        

        $("#DivNoticeType1").append(html);

        if (fileName != "") {
            document.getElementById("img" + Records.ID).src = "../img/gallery/" + fileName;
        }

        
        
    });
    }

function GetNotices(Notices) {
    var ds = {};
    var table = {};
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNotices");
    table = JSON.parse(ds.d);
    return table;
}

//Notice  Edit 
function BindNoticesOnEdit() {
    var jsonResult = {};
    var Notices = new Object();
    Notices.noticeId = "3172b77c-97e6-4acb-85a7-4508d27269b0";
    jsonResult = GetNoticesBynoticeID(Notices);
    if (jsonResult != undefined) {
        //  FillOrderTable(jsonResult);
    }
}

function GetNoticesBynoticeID(Notices) {
    var ds = {};
    var table = {};
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeDetailsByNoticeID");
    table = JSON.parse(ds.d);
    return table;
}

function BindControlsOnEdit(Notices)
{

    $("#PriestEditDivBox").show();
    var jsonResult = {};
    
    jsonResult = GetNoticesBynoticeID(Notices);

    if (jsonResult != undefined)
    {
        $.each(jsonResult, function (index, jsonResult)
        {
            //$("#lblNoticeName").show();
            //$("#txtNoticeName").hide();
            //$("#txtNoticeName").text(jsonResult.NoticeName);
            $("#txtNoticeName").val(jsonResult.NoticeName);
            
            //$("#lblNoticeDescription").show();
            //$("#txtDescription").hide();
            $("#txtDescription").text(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;
             
        });

         $("#h1Notice").text("Edit Notice");
    }
}

//Insert Notice
function InsertNotice(Notices) {
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function ClearControls()
{
    $("#txtNoticeName").text("");
    $("#txtDescription").text("");
    $("#ddlNoticeType").select2("val", "");

    $("#hdfImageID").val("");
    $("#hdfNoticeID").val("");
    imageId = '';
    imgPath = '';
    $("#h1Notice").text("Add Notice");
}







