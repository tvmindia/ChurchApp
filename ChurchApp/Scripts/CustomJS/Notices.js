﻿$("document").ready(function (e) {
    
    BindNotices();
  //  BindNoticesOnEdit();
   

    $("#ddlNoticeType").select2({
       placeholder: "Choose Types",
        allowClear: true,
        data: BindNoticeTypeDropDown()
    });

    $('#btnSave').click(function (e) {
        var Notices = new Object();
        Notices.noticeName = $("#txtNoticeName").val();
        Notices.description = $("#txtDescription").val();
        Notices.noticeType = $("#ddlNoticeType").val();
        // Notices.isDelete = 0;

     //   InsertNotice(Notices);
    });


    $('#btnCancel').click(function (e) {
        ClearControls();

    });

  

   // BindControlsOnEdit();


});

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

        var html = '<div class="task high"> <div class="span12" id="divulContainer"><ul class="dashboard-list"><li class="liNoticeList"><div class="span3"><a href="#"><img class="imgNotice" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/></a></div><div class="span9"><p class="pContainerNotice"><span style="font-weight:bold;color:#FA603D;">' + Records.NoticeName + '</span><br/>' + Records.Description + '</p></div> </li></ul></div></div>'

        $("#DivNoticeType1").append(html);
        
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

function BindControlsOnEdit()
{
    var jsonResult = {};
    var Notices = new Object();
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

       // $("#HeadNotice").text("Edit Notice");
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







