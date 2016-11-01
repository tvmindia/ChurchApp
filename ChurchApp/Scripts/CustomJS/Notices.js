
var imageId = '';

$("document").ready(function (e) {
    
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
        var Notices = new Object();
        Notices.noticeName = $("#txtNoticeName").val();
        Notices.description = $("#txtDescription").val();
        Notices.noticeType = $("#ddlNoticeType").val();
        // Notices.isDelete = 0;
        if (imageId != null && imageId != "") {
            Notices.imageId = imageId;
        }

        var NoticeID = $("#hdfNoticeID").val();

        if (NoticeID != null && NoticeID != "")
        {
            Notices.noticeId = NoticeID
        }
        InsertNotice(Notices);
        BindNotices();
    });

    $('#btnCancel').click(function (e) {
        ClearControls();

    });

    $('#btnAdd').click(function (e) {
     
        $("#PriestEditDivBox").show();


    });

   // BindControlsOnEdit();

    //$(function () {
        $('#btnUpload').click(function () {
            
            var fileUpload = $("#UpNotice").get(0);
            var files = fileUpload.files;
            var test = new FormData();
            for (var i = 0; i < files.length; i++) {
                test.append(files[i].name, files[i]);
            }
            $.ajax({
                url: "../ImageHandler/UploadHandler.ashx",
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                // dataType: "json",
                success: function (result) {

                    debugger;

                    alert(result);

                    GetInsertedImgID(result);
                },
                error: function (err) {
                   // alert(err.statusText);
                }
            });
        });
    //})

});

function GetInsertedImgID(result)
{
    var json = InsertAppImage(result);

    imageId = json.appImageId;
    $("#hdfImageID").val(imageId);

    alert(imageId);

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
       FillNotice(jsonResult);
    }
}

function FillNotice(Records)
{
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;
        //hdfNoticeID

        var url = Records.URL;

        var index = url.lastIndexOf('\\');
        var fileName = url.substr(index + 1);

        //var last = url.Split().Last();

       
     //   url = url.replace(/\+/g, ' ');
        var html = '<div class="task high"> <div class="span12" id="divulContainer"><ul class="dashboard-list"><li class="liNoticeList"><div class="span3"><a href="#"><img class="imgNotice" id=img'+Records.ID+'  src=../ImageHandler/UploadHandler.ashx?url=' + url + ' /></a></div><div class="span9"><p class="pContainerNotice"><span style="font-weight:bold;color:#FA603D;">' + Records.NoticeName + '&nbsp;<a href="#" class="aViewDetails" id=' + Records.ID + '>View Details</a></span><br/>' + Records.Description + '</p></div> </li></ul></div>  <input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div>'

        

        $("#DivNoticeType1").append(html);

        document.getElementById("img" + Records.ID).src = "../img/gallery/" + fileName;
        
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

}







