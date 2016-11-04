
var imageId = '';
var imgPath = '';

var DeletedImgID = '';
var DeletedImgPath = '';
var NotificationTypeCode = 'ntc';


//var ImageIDOnEdit = '';

$("document").ready(function (e) {
    debugger;

    $("#rdoNotificationYes").click(function () {

        $("#divNotificationDates").show();
    });

    $("#rdoNotificationNo").click(function () {

        $("#divNotificationDates").hide();
    });

    BindNotices();
    //  BindNoticesOnEdit();

    $("#ddlNoticeType").select2({
        placeholder: "Choose Types",
        allowClear: true,
        data: BindNoticeTypeDropDown()
    });

    //$(".aViewDetails").click(function () {

    //});

    //$("#NoticeEdit").click(function () {});

    $('#btnSave').click(function (e) {
        //NoticeValidation();
        var IsValid = true;
        if (IsValid) {

            debugger;
            if ($("#ddlNoticeType").val() != "" && $("#ddlNoticeType").val() != null) {


                var AppImgURL = '';
                var NoticeID = $("#hdfNoticeID").val();

                //-----------------------INSERT-------------------//

                if (NoticeID == null || NoticeID == "") {
                    var guid = createGuid();

                    //DeletedImgID = imageId;
                    //DeletedImgPath = imgPath

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
                                formData.append('NoticeAppImage', tempFile, tempFile.name);
                                formData.append('GUID', guid);
                            }
                            formData.append('ActionTyp', 'NoticeAppImageInsert');
                            AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");

                        }

                    }

                    var Notices = new Object();
                    Notices.noticeName = $("#txtNoticeName").val();
                    Notices.description = $("#txtDescription").val();
                    Notices.noticeType = $("#ddlNoticeType").val();
                    // Notices.isDelete = 0;
                    //if (imageId != null && imageId != "") {
                    //    Notices.imageId = imageId;
                    //}

                    Notices.noticeId = guid;
                    Notices.imageId = guid;


                    //var AppImages = new Object();
                    //AppImages.url = AppImgURL;
                    //AppImages.appImageId = guid;
                    //InsertAppImage(AppImages);

                    //if (NoticeID != null && NoticeID != "")
                    //{
                    //    Notices.noticeId = NoticeID
                    //}
                    //else
                    //{
                    //    Notices.noticeId = guid;
                    //}

                    result = InsertNotice(Notices);

                    if (result.status == "1") {
                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Notice Added Successfully");

                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = Notices.noticeId;
                            Notification.caption = Notices.noticeName;
                            Notification.description = Notices.description;
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }

                            InsertNotification(Notification);

                        }
                    }
                    if (result.status != "1") {
                        $('#rowfluidDiv').show();
                        $('.alert-error').show();
                        $('.alert-error strong').text("Saving Not Successful");
                    }

                    BindNotices();
                    // ClearControls();
                    $("#hdfNoticeID").val(Notices.noticeId);

                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                        imageId = Notices.imageId;
                        imgPath = AppImgURL;

                        DeletedImgID = imageId;
                        DeletedImgPath = imgPath;
                    }

                    debugger;
                 //   SetControlsInNewNoticeFormat();


                }
                    //-----------------------UPDATE-------------------//
                else {
                    var Notices = new Object();
                    Notices.noticeName = $("#txtNoticeName").val();
                    Notices.description = $("#txtDescription").val();
                    Notices.noticeType = $("#ddlNoticeType").val();
                    Notices.noticeId = $("#hdfNoticeID").val();;
                    Notices.imageId = imageId;

                    DeletedImgID = imageId;
                    DeletedImgPath = imgPath

                    var guid = createGuid();
                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined)) {
                        var formData = new FormData();
                        var tempFile;
                        if ((tempFile = $('#UpNotice')[0].files[0]) != undefined) {
                            tempFile.name = guid;
                            formData.append('NoticeAppImage', tempFile, tempFile.name);
                            formData.append('GUID', guid);
                        }
                        formData.append('ActionTyp', 'NoticeAppImageInsert');
                        AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                        Notices.imageId = guid;
                    }

                    result = UpdateNotice(Notices);

                    if (result.status == "1") {
                        $('#rowfluidDiv').show();
                        $('.alert-success').show();
                        $('.alert-success strong').text("Notice Edited Successfully");

                        if (DeletedImgID != '') {
                            var AppImages = new Object();
                            AppImages.appImageId = DeletedImgID;
                            DeleteAppImage(AppImages);

                            if (DeletedImgPath != '') {
                                DeleteFileFromFolder(DeletedImgPath);
                            }
                        }

                        if ($('input[name=IsnotificationNeeded]:checked').val() == "Yes") //Add Notification
                        {
                            var Notification = new Object();
                            Notification.notificationType = NotificationTypeCode;
                            Notification.linkID = Notices.noticeId;
                            Notification.caption = Notices.noticeName;
                            Notification.description = Notices.description;
                            if ($('#dateStartDate').val() != "") {
                                Notification.startDate = $('#dateStartDate').val();
                            }
                            if ($('#dateExpiryDate').val() != "") {
                                Notification.expiryDate = $('#dateExpiryDate').val();
                            }

                            InsertNotification(Notification);

                        }


                    }
                    if (result.status != "1") {
                        $('#rowfluidDiv').show();
                        $('.alert-error').show();
                        $('.alert-error strong').text("Saving Not Successful");
                    }

                    BindNotices();
                    $("#hdfNoticeID").val(Notices.noticeId);

                    if (((imagefile = $('#UpNotice')[0].files[0]) != undefined))
                    {
                        imageId = Notices.imageId;
                        imgPath = AppImgURL;

                        DeletedImgID = imageId;
                        DeletedImgPath = imgPath;

                    }

                   

                  //  SetControlsInNewNoticeFormat();

                }
            }

            else {
                alert("Please select a type");
            }
        }
    });

    $('#btnCancel').click(function (e) {
       
      //  $("#PriestEditDivBox").hide();

        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();

        var NoticeID = $("#hdfNoticeID").val();

        if (NoticeID == null || NoticeID == "") //Add
        {
            AddNewNoticeFormat();
        }
        else//Edit
        {
            EditOnClick(NoticeID);
        }
    });

    $('#btnDelete').click(function (e) {
        debugger;

        var deleteConirm = confirm("Want to delete?");
        debugger;

        if (deleteConirm) {

            debugger;

            var NoticeID = $("#hdfNoticeID").val();

            var Notices = new Object();
            Notices.noticeId = NoticeID;

            var DeletionStatus = DeleteNotice(Notices);

            if (DeletionStatus.status == "1") {
                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Notice Deleted Successfully");

                var AppImages = new Object();
                AppImages.appImageId = imageId;
                DeleteAppImage(AppImages);

                DeleteFileFromFolder(imgPath);
            }
            else {
                $('#rowfluidDiv').show();
                $('.alert-error').show();
                $('.alert-error strong').text("Deletion Not Successful");
            }

            BindNotices();
            SetControlsInNewNoticeFormat();

        }
        else {
            return false;
        }
    });

    //$('#btnAdd').click(function (e) {

    //});

    // BindControlsOnEdit();

    //$(function () {
    //$('#btnUpload').click(function () {
    //        debugger;


    //    });
    //})

});


function FixedEditClick()
{
    $("#lblStartDate").hide();
    $("#dateStartDate").show();
    $("#lblExpiryDate").hide();
    $("#dateExpiryDate").show();


    $("#divView").hide();

    $("#divnoticeName").show();
    $("#divNoticeType").show();
    $("#DivFile").show();
    $("#divNoticeDescription").show();
    $("#divNotification").show();
    $("#DivImg").show();
    $("#divNotification").show();

    $("#btnDelete").show();
    $("#btnCancel").show();

    document.getElementById("rdoNotificationNo").disabled = false;
    document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');

    var Notices = new Object();
    Notices.noticeId = $("#hdfNoticeID").val();;

    jsonResult = GetNoticesBynoticeID(Notices);
    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');


    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            debugger;

            $("#lblNoticeName").hide();

            $("#lblNoticeDescription").hide();

            //$("#lblNoticeType").hide();

            $("#txtNoticeName").show();
            $("#txtDescription").show();

            $("#txtNoticeName").val(jsonResult.NoticeName);

            $("#txtDescription").text(jsonResult.Description);
            $("#txtDescription").val(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

           
            if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined) {
                //$("#rdoNotificationNo").parent().removeClass('checked');
                //$('#rdoNotificationYes').parent().addClass('checked');
                //$("#lblStartDate").show();
                //$("#dateStartDate").hide();
                //$("#lblStartDate").text(jsonResult.StartDate)
                //$("#lblExpiryDate").show();
                //$("#dateExpiryDate").hide();
                //$("#lblExpiryDate").text(jsonResult.ExpiryDate)
                $("#lblAlreadyNotificationSend").show();
            }
            else {
                //$("#rdoNotificationYes").parent().removeClass('checked');
                //$('#rdoNotificationNo').parent().addClass('checked');
                $("#lblAlreadyNotificationSend").hide();
            }
            debugger;
            url = jsonResult.URL;
            $('#NoticePreview').attr('src', url);



        });
        $("#btnSave").show();
        $("#h1Notice").text("Edit Notice");
        $("#DivFile").show();
    }
}


//--- Edit click of each notice
function EditOnClick(id) {
    debugger;
   

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();
     $("#NoticeEdit").show();
     $("#btnDelete").hide();
     $("#divView").show();
     $("#divNotificationDates").hide();
    
     var NoticeID = id;
    $("#hdfNoticeID").val(NoticeID);

    var Notices = new Object();
    Notices.noticeId = NoticeID;

    //BindControlsOnEdit(Notices);
    //$('#ddlNoticeType').attr('disabled', 'disabled');

    $("#PriestEditDivBox").show();
    var jsonResult = {};

    jsonResult = GetNoticesBynoticeID(Notices);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#h1Notice").text(jsonResult.NoticeName);

            url = jsonResult.URL;
            $('#NoticePreviewOnView').attr('src', url);

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;
            $('#lblNoticeDescriptionOnView').text(jsonResult.Description);
            
        });
        }

    $("#btnSave").hide();
    $("#btnCancel").hide();

        $("#divnoticeName").hide();
        $("#divNoticeType").hide();
        $("#DivFile").hide();
        $("#DivImg").hide();
        $("#divNotification").hide();
        $("#divNoticeDescription").hide();
}

function BindControlsOnEdit(Notices) {

    $("#PriestEditDivBox").show();

    var jsonResult = {};

    jsonResult = GetNoticesBynoticeID(Notices);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#lblNoticeName").show();
            $('#lblNoticeName').text(jsonResult.NoticeName);
            $("#txtNoticeName").hide();

            $("#h1Notice").text(jsonResult.NoticeName);

            $("#lblNoticeDescription").show();
            $("#txtDescription").hide();
            $('#lblNoticeDescription').text(jsonResult.Description);

            $("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            if (jsonResult.NotificationID != null && jsonResult.NotificationID != undefined) {
                $("#rdoNotificationNo").parent().removeClass('checked');
                $('#rdoNotificationYes').parent().addClass('checked');
                $("#lblStartDate").show();
                $("#dateStartDate").hide();
                $("#lblStartDate").text(jsonResult.StartDate)
                $("#lblExpiryDate").show();
                $("#dateExpiryDate").hide();
                $("#lblExpiryDate").text(jsonResult.ExpiryDate)
            }
            else {
                $("#rdoNotificationYes").parent().removeClass('checked');
                $('#rdoNotificationNo').parent().addClass('checked');

            }
            debugger;
            url = jsonResult.URL;
            $('#NoticePreview').attr('src', url);

            //$('#imgNotices').attr('src', "../img/No-Img_Chosen.png")

            document.getElementById("rdoNotificationNo").disabled = true;
            document.getElementById("rdoNotificationYes").disabled = true;

            // $("#lblNoticeType").show();

            // $('#lblNoticeType').text(jsonResult.NoticeType);


            //$("#txtNoticeName").text(jsonResult.NoticeName);

            //$("#txtNoticeName").val(jsonResult.NoticeName);

            //$("#txtDescription").text(jsonResult.Description);

            //$("#ddlNoticeType").val(jsonResult.NoticeType).trigger("change");

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;

        });


        $("#btnSave").hide();
        $("#DivFile").hide();
    }
}



function SetControlsInNewNoticeFormat() {
    ClearControls();
    $("#PriestEditDivBox").show();

    $("#txtNoticeName").show();
    $("#txtDescription").show();
    $("#btnSave").show();
    $("#h1Notice").text("Add Notice");

    $("#lblNoticeDescription").hide();
    $("#lblNoticeName").hide();
    $("#NoticeEdit").hide();
    $("#DivFile").show();

    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");

    $("#btnDelete").hide();

    document.getElementById("rdoNotificationNo").disabled = false;
    document.getElementById("rdoNotificationYes").disabled = false;

    $('#ddlNoticeType').removeAttr('disabled');
    $("#lblAlreadyNotificationSend").hide();
}

function AddNewNoticeFormat() {
    $("#divView").hide();
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    SetControlsInNewNoticeFormat();
    $("#divNotificationDates").hide();

    $("#rdoNotificationYes").parent().removeClass('checked');
    $('#rdoNotificationNo').parent().addClass('checked');

    $("#divnoticeName").show();
    $("#divNoticeType").show();
    $("#DivFile").show();
    $("#divNoticeDescription").show();
    $("#divNotification").show();
    $("#DivImg").show();
    $("#divNotification").show();
    $("#lblAlreadyNotificationSend").hide();

    $("#btnCancel").show();
}


//Insert Notice
function UpdateNotice(Notices) {
    var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/UpdateNotice");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function DeleteNotice(Notices) {
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
        success: imgPath,
        failure: function (response) {

            // alert(response.d);
        },
        error: function (response) {

            // alert(response.d);
        }
    });
}

function GetInsertedImgID(result) {
    var json = InsertAppImage(result);

    imageId = json.appImageId;
    $("#hdfImageID").val(imageId);

}

function DeleteAppImage(AppImages) {
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}

function InsertAppImage(AppImages) {
    debugger;

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


function FillNotice(Records) {
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;

        //var html = '<div class="task high"> <div class="span12" id="divulContainer"><ul class="dashboard-list"><li class="liNoticeList"><div class="span3"><a href="#"><img class="imgNotice" id=img' + Records.ID + '   /></a></div><div class="span9"><p class="pContainerNotice"><span style="font-weight:bold;color:#FA603D;">' + Records.NoticeName + '&nbsp;<a href="#" class="aViewDetails" id=' + Records.ID + '>View Details</a></span><br/>' + Records.Description + '</p></div> </li></ul></div>  <input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div>'

        // var html = '<div class="task high"><ul class="dashboard-list"><li class="Eventlist"><a href="#"><img class="Eventimage" id=img' + Records.ID + ' src=' + url + '/></a><strong>Title:</strong><span class="spnNoticeName">' + Records.NoticeName + '<br/></span><strong>Type:</strong>' + Records.NoticeType + '<br/><strong>Description:</strong>' + Records.Description + '<div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div> </li></ul><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div>'

        var html = '<div class="task high"><ul class="dashboard-list"><li class="Eventlist"><a href="#"><img class="Eventimage" id=img' + Records.ID + ' src=' + url + '/></a><span class="spnNoticeName">' + Records.NoticeName + '<br/></span><strong>Type : </strong>' + Records.NoticeType + '<br/>' + Records.Description + '<div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div> </li></ul><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div>'

        var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.NoticeName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="Eventimage" id=img' + Records.ID + ' src=' + url + '/><p>' + Records.Description + '</p><span class="NoticeViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'


        $("#DivNoticeType1").append(html);

        if (url != "") {
            var imgControl = document.getElementById("img" + Records.ID);
            if (imgControl != null) {
                document.getElementById("img" + Records.ID).src = url;
                $('#img' + Records.ID).attr('src', url);
            }
        }
    });

    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#DivNoticeType1").append(img);
    }

}

function GetServerMapPath(path) {
    $.ajax({
        url: "../AdminPanel/Notices.aspx/GetServerMapPath",
        type: "POST",
        contentType: false,
        processData: false,
        data: path,
        // dataType: "json",
        success: function (result) {

            debugger;
            return result;
        },
        error: function (err) {
            // alert(err.statusText);
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

function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#NoticePreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
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

//Insert Notification
function InsertNotification(Notification) {
    debugger;

    var data = "{'NotificationObj':" + JSON.stringify(Notification) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Notices.aspx/InsertNotification");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

function ClearControls() {
    $("#txtNoticeName").text("");
    $("#txtNoticeName").val("");
    $("#txtDescription").text("");
    $("#txtDescription").val("");
    $("#ddlNoticeType").select2("val", "");

    $('#dateStartDate').val("");
    $("#dateExpiryDate").val("");

    $("#hdfImageID").val("");
    $("#hdfNoticeID").val("");
    imageId = '';
    imgPath = '';
    $("#h1Notice").text("Add Notice");

    $('#NoticePreview').attr('src', "../img/No-Img_Chosen.png");
   
}

function NoticeValidation() {
    debugger;
    $('#Displaydiv').remove();
    var Name = $('#txtNoticeName');
    var Description = $('#txtDescription');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value },
        { id: Description[0].id, name: Description[0].name, Value: Description[0].value }

    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {
        if (container[i].Value == "") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/Default/invalid.png')";
            txtB.style.backgroundPosition = "95% center";
            txtB.style.backgroundRepeat = "no-repeat";
            Errorbox.style.paddingLeft = "30px";
        }
    }

    if (j == '1') {
        var p = document.createElement('p');
        p.innerHTML = "* Some Fields Are Empty ! ";
        p.style.color = "Red";
        p.style.fontSize = "14px";
        divs.appendChild(p);
        return false;
    }
    if (j == '0') {
        $('#ErrorBox').hide();
        return true;
    }


}






