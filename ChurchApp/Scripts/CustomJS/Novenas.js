﻿

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable


var IsNormal = true;                //Variable to check whether novena type is special or normal.Sets to false when novena type is special
var NovenaDayAndTime = new Array(); // on each + button clicked ,day and time will be pushed to this, later NOVENA TIMING saving is done by retrieving this array
var PatronID = '';                  //id of patron user clicked (Its value sets when a saint image is clicked)


var IsUpdateTimeClicked = false;   //Not using now, Might be helpful if update functionality is giving for each novena time

$("document").ready(function (e)
{
    $("#TxtTime").timepicki();
    $('&nbsp; <a id="addBtn" class="btn btn-primary button" ><span>+</span></></a>').insertAfter($(".timepicker_wrap")); //-- Add Button for timepicker (Timepicker design is created in run time ,that's why add button added to dynamically created add button)

    BindPatrons();

    $("#ddlPatron").select2({
        placeholder: "Choose Patron",
        allowClear: true,
        data: BindPatronDropdown()
    });

    $("#rdoNovenaSpecial").click(function () {
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        $("#divStartDate").show();
        $("#divEndDate").show();
        $("#ddlDay").val("");

        IsNormal = false;

    });
    $("#rdoNovenaNormal").click(function () {
        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();
        $("#divStartDate").hide();
        $("#divEndDate").hide();
        IsNormal = true;
      
    });

    //PLUS button click (+ means add to list)
     $('#addBtn').click(function (e) {
         AddDayAndTimeToArray();
     });

    //Save Click
     $('#btnSave').click(function (e) {
         ;
         var IsValid = NewNovenaValidation();

         $('#rowfluidDiv').hide();
         $('.alert-success').hide();
         $('.alert-error').hide();

         if (IsValid) {
    
         

         var SuccessMsg = '';
       
         if ($("#ddlPatron").val() != null && $("#ddlPatron").val() != "") {

             var Novenas = new Object();
             Novenas.patronId = $("#ddlPatron").val();
             Novenas.novenaCaption = $("#txtNovenaCaption").val();
             Novenas.description = $("#txtDescription").val();
             if (IsNormal == false) {
                 Novenas.startDate = $("#dateStartDate").val();
                 Novenas.endDate = $("#dateEndDate").val();
             }

             var guid = createGuid();

             if (guid != null) {

                 var imgresult = "";
                 var _URL = window.URL || window.webkitURL;
                 var formData = new FormData();
                 var imagefile;

                 if (((imagefile = $('#UpNewNovena')[0].files[0]) != undefined)) { //App image insertion to table as well as folder
                     var formData = new FormData();
                     var tempFile;
                     if ((tempFile = $('#UpNewNovena')[0].files[0]) != undefined) {
                         tempFile.name = guid;
                         formData.append('NoticeAppImage', tempFile, tempFile.name);
                         formData.append('GUID', guid);
                         formData.append('createdby', 'SHAMILA');
                     }
                     formData.append('ActionTyp', 'NoticeAppImageInsert');
                     AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                     Novenas.imageID = guid;
                 }
                 else {
                     if ($("#hdfNovenaID").val() != "" && $("#hdfNovenaID").val() != null) {
                         Novenas.imageID = imageId; // If no image is selected ,while updating, old imagid itself passed
                     }
                 }
                 if ($('#hdfNovenaID').val() == "") { // Case Insert
                     result = InsertNovena(Novenas);
                 }
                 else { //Case Update
                     Novenas.novenaId = $('#hdfNovenaID').val();
                     result = UpdateNovena(Novenas);
                     if (DeletedImgID != '' && (((imagefile = $('#UpNewNovena')[0].files[0]) != undefined))) {
                         //--if novena is updated with new image, the old image should delete from folder and table
                         var AppImages = new Object();
                         AppImages.appImageId = DeletedImgID;
                         DeleteAppImage(AppImages);

                         if (DeletedImgPath != '') {
                             DeleteFileFromFolder(DeletedImgPath);
                         }
                     }
                 }

                 if (result.Status == 1) {
                      ;
                     var NovenaTiming = new Object();

                     if ($('#hdfNovenaID').val() == "")
                     {
                         NovenaTiming.novenaId = result.novenaId;
                         $('#hdfNovenaID').val(result.novenaId);
                         SuccessMsg = "Novena Added Successfully";
                         
                     }
                     else
                     {
                         NovenaTiming.novenaId = $('#hdfNovenaID').val();
                         SuccessMsg = "Novena Edited Successfully"
                         DeleteNovenaTimingbyNovenaID(NovenaTiming);
                     }
                     
                     //Insertion of novena timing
                     $.each(NovenaDayAndTime, function (index, NovenaDayAndTime) {

                         var day = NovenaDayAndTime.Day;
                         var time = NovenaDayAndTime.Time;

                         NovenaTiming.day = day;
                         NovenaTiming.time = time;
                         InsertNovenaTiming(NovenaTiming);
                             
                     });
                    
                     FixedEditClick();

                     $('#rowfluidDiv').show();
                     $('.alert-success').show();
                     $('.alert-success strong').text(SuccessMsg);
                     if (PatronID == "")
                     {
                         BindAllNovenas();
                     }
                     else
                     {
                         BindNovenasPatronID(PatronID);
                     }
                    
                     ScrollPage();
                 }
             }

         }
         else {
             alert("Please select a patron");
         }
     }
    });
   
    //Cancel Click
    $('#btnCancel').click(function (e) {
        SetControlsInNovenaFormat();
    });

    //Delete Novena
    $('#btnDelete').click(function (e) {
        debugger;
        //$('#rowfluidDiv').hide();
        //$('.alert-success').hide();
        //$('.alert-error').hide();

        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            var Novenas = new Object();
            Novenas.novenaId = $('#hdfNovenaID').val();

            result = DeleteNovena(Novenas);
            if (result.Status == 1)
            {

                SetControlsInNovenaFormat(true);

                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Novena Deleted Successfully");
                PatronID=$('#hdfPatronID').val();
                BindNovenasPatronID(PatronID);
                ScrollPage();
               // image deletion from folder and table
                var AppImages = new Object();
                AppImages.appImageId = DeletedImgID;
                DeleteAppImage(AppImages);

                DeleteFileFromFolder(DeletedImgPath);

            }
        }
        else {
            return false;
        }
    });

    //Save - New Saint(Patron)
  

    $('#btnEditPatron').click(function (e) {

        debugger;

        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();


        var className = $('#iconPatronRefresh').attr('class');
        switch (className) {
            case "halflings-icon white pencil":
                BindPatronsInEditableFormat();
                $('#iconPatronRefresh').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
               // $('#btnEditPatron').attr('onclick', 'BindPatrons();');
                break;
            case "halflings-icon white refresh":
                BindPatrons();
                $('#iconPatronRefresh').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
                break;

        }
       

    });

    $('input:text').click(
   function () {
       RemoveStyle();
   });

    $('#btnSaveInModal').click(function (e) {

        var IsValid = NewPatronValidation();

        if (IsValid) {


            var PatronMaster = new Object();
            PatronMaster.patronMasterName = $("#txtSaintName").val();
            PatronMaster.description = $("#txtSaintDescription").val();

            var guid = createGuid();
            if (guid != null) {
                var imgresult = "";
                var _URL = window.URL || window.webkitURL;
                var formData = new FormData();
                var imagefile;

                if (((imagefile = $('#UpSaint')[0].files[0]) != undefined)) { //App image insertion to table as well as folder
                    var formData = new FormData();
                    var tempFile;
                    if ((tempFile = $('#UpSaint')[0].files[0]) != undefined) {
                        tempFile.name = guid;
                        formData.append('NoticeAppImage', tempFile, tempFile.name);
                        formData.append('GUID', guid);
                        formData.append('createdby', 'SHAMILA');
                    }
                    formData.append('ActionTyp', 'NoticeAppImageInsert');
                    AppImgURL = postBlobAjax(formData, "../ImageHandler/UploadHandler.ashx");
                    PatronMaster.imageID = guid;
                }
                else {
                    if ($('#hdfPatronImageID').val() != '') {
                        PatronMaster.imageID = $('#hdfPatronImageID').val(); // If no image is selected ,while updating, old imagid itself passed which is stored in hiddenfield
                    }
                }
            }

            if ($('#hdfPatronID').val() != "") { //Case Update
                PatronMaster.patronMasterId = $('#hdfPatronID').val();

                result = UpdatePatron(PatronMaster);

                if ($('#hdfPatronImageID').val() != '' && (((imagefile = $('#UpSaint')[0].files[0]) != undefined))) {

                    //--if patron is updated with new image, the old image should delete from folder and table
                    var AppImages = new Object();
                    AppImages.appImageId = $('#hdfPatronImageID').val();
                    DeleteAppImage(AppImages);

                    if ($('#hdfPatronImageURL').val() != "") {
                        DeleteFileFromFolder($('#hdfPatronImageURL').val());
                    }
                    $('#hdfPatronImageID').val("");
                    $('#hdfPatronImageURL').val("");
                }
            }
            else {  //Case Insert
                result = InsertPatron(PatronMaster);
            }
            if (result.Status == 1) {
                BindPatrons();
                $('#NewSaintModel').modal('hide');
            }
            ClearModalControls();
        }

        else {
            return false;
        }

    });
}); //End of Document ready



//Bind Novenas
function BindNovenasPatronID(patronId) {
    var jsonResult = {};
    var Novenas = new Object();
    Novenas.patronId = patronId;
    jsonResult = GetNovenasByPatronID(Novenas);
    if (jsonResult != undefined) {
        FillNovenas(jsonResult);

        if (jsonResult.length > 5) {
            $(".aViewMore").show();
        }
        else {
            $(".aViewMore").hide();
        }
    }
}
function BindAllNovenas() {
     ;
    var jsonResult = {};
    var Novenas = new Object();
    var Church = new Object();
    Novenas.churchObj = Church;
    jsonResult = GetAllNovenasByChurchID(Novenas);
    if (jsonResult != undefined) {
        FillNovenas(jsonResult);

        if (jsonResult.length > 5) {
            $(".aViewMore").hide();
        }
        else {
            $(".aViewMore").hide();
        }
    }
}

function GetNovenasByPatronID(Novenas)
{
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetNovenasByPatronID");
    table = JSON.parse(ds.d);
    return table;
}
function GetAllNovenasByChurchID(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'novenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllNovenasByChurchID");
    table = JSON.parse(ds.d);
    return table;
}

var NovenaTiming = '';
function FillNovenas(Records) {
     ;
    $('#DivNovenas').html('');

    $.each(Records, function (index, Records) {
         ;

        var url = Records.URL;
        var ID = Records.ID;
        var html = '';

        var StartDate = Records.StartDate;
        var EndDate = Records.EndDate;
        var DayAndTime = Records.DayAndTime;

        //------- * STEPS
        //Day and time is passed like mon-9am|tue-8,5|wed-6 
        //So it will be splitted by |
        //Take each Of splitted item
        //Split by -
        //then First item is set to day , others are times
        //I day is null , day is passed as 'dai'(daily) from sp
        //so it is also managed

        if (DayAndTime != null) {

            if (DayAndTime.indexOf('|') > -1) {
                var DT = DayAndTime.split('|');

                for (var i = 0; i < DT.length; i++) {
                    if (DT[i].indexOf('-') > -1) {
                        if (DT[i].split('-')[0] == "Dai") {
                            DT[i] = DT[i].split('-')[1];
                        }
                    }
                    if (i == 0) {
                        NovenaTiming = NovenaTiming + '<strong>' + DT[i] + '</strong><br/> ';
                    }
                    else {
                        NovenaTiming = NovenaTiming + '<strong>' + DT[i] + '</strong><br/> ';
                    }
                }
            }
            else {
                if (DayAndTime.indexOf('-') > -1) {
                    if (DayAndTime.split('-')[0] == "Dai") {
                        DayAndTime = DayAndTime.split('-')[1];
                    }
                }

                NovenaTiming = '<strong>' + DayAndTime + '</strong><br/> ';
            }
        }
        if (StartDate == null) {
            html = ('<ul class="dashboard-list NovenaList"><li style="width:25%!important"><img class="NovenaImage" id=' + ID + ' src="' + (url != null ? url : "../img/No-Img_Chosen.png") + '"/></li>'
            + '<li style="width:75%!important"><span class="NovenaCaption">' + Records.NovenaCaption + '</span> <br/>'
            + NovenaTiming
            + Records.ChurchName + '</strong><p class="pPriestDesc">' + Records.Description + '</p> '
            + '<a class="aNovenaViewMore" style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="BindNovenaMoreDetails(\'' + ID + '\')">View more details</a>'
            + '<input id=' + ID + ' type="hidden" value=' + ID + '/></li></ul></div>');

        }
        else //Start Date Not Null
        {
            html = ('<ul class="dashboard-list NovenaList"><li style="width:25%!important"><img class="NovenaImage" id=' + ID + ' src="' + (url != null ? url : "../img/No-Img_Chosen.png") + '"/></li>'
            + '<li style="width:75%!important"><span class="NovenaCaption">' + Records.NovenaCaption + '</span> <br/>'
            + '<strong>' + ConvertJsonToDate(Records.StartDate) + '</strong> To' + '<strong>' + ConvertJsonToDate(Records.EndDate) + '</strong> ' + '<br/>'
            + NovenaTiming
            + '<strong>' + Records.ChurchName + '</strong><p class="pPriestDesc">' + Records.Description + '</p> '
            + '<a class="aNovenaViewMore" style="color:saddlebrown;font-weight:700;cursor:pointer;text-decoration: underline;" onclick="BindNovenaMoreDetails(\'' + ID + '\')">View more details</a>'
            + '<input id=' + ID + ' type="hidden" value=' + ID + '/></li></ul></div>');

        }

        if (html != '') {
            $('#DivNovenas').append(html);
            NovenaTiming = '';
        }

    })


    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#DivNovenas").append(img);
    }

}
//--------------------------------//
//Insert Novena
function InsertNovena(Novenas) {
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertNovena");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//
//Update Novena
function UpdateNovena(Novenas) {
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/UpdateNovena");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//
//Delete Novena Time
function DeleteNovena(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/DeleteNovena");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//



//------------------CLICKS
function FixedEditClick()
{

     ;

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();




    $('#h1Event').text("Edit Novena");

    $('#iconEdit').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
    $('#NoticeEdit').attr('onclick', 'SetControlsInNovenaFormat();');



    var novenaId = $('#hdfNovenaID').val();

    NovenaDayAndTime = [];
    $("#tblNovenaTiming").html('');

    $('#DivNewNovena').show();
    $('#DivNewFormat').show();
    $('#DivViewFormat').hide();
    $('#btnSave').show();
    $('#btnCancel').show();
    $('#btnDelete').show();

    var jsonResult = {};
    var Novenas = new Object();
    if ($('#hdfNovenaID').val() != "" && $('#hdfNovenaID').val() != undefined) {

        Novenas.novenaId = $('#hdfNovenaID').val();
        jsonResult = GetNovenasByNovenaID(Novenas);

        if (jsonResult != undefined) {
            $.each(jsonResult, function (index, jsonResult) {
                 ;
                $('#txtNovenaCaption').val(jsonResult.NovenaCaption);
                $('#txtDescription').text(jsonResult.Description);

                imageId = jsonResult.ImageID;
                imgPath = jsonResult.URL;

                DeletedImgID = imageId;
                DeletedImgPath = imgPath;


                $("#ddlPatron").val(jsonResult.PatronID).trigger("change");

                if (jsonResult.StartDate != null) {
                    IsNormal = false;
                   // $("#divDay").hide();
                    $("#divStartDate").show();
                    $("#divEndDate").show();

                    $('#dateStartDate').val(ConvertJsonToDate(jsonResult.StartDate));
                    $('#dateEndDate').val(ConvertJsonToDate(jsonResult.EndDate));

                }
                else {
                    IsNormal = true;
                    $("#divStartDate").hide();
                    $("#divEndDate").hide();
                  //  $("#divDay").show();
                }

                var day;
                var time;
                var DayAndTime = jsonResult.DayAndTime;
                 ;
                if (DayAndTime != null) {

                    if (DayAndTime.indexOf('|') > -1) {

                        var DT = DayAndTime.split('|');

                        for (var i = 0; i < DT.length; i++) {
                            if (DT[i].indexOf('-') > -1) {
                                if (DT[i].split('-')[0] == "Dai") {

                                   
                                    DT[i] = DT[i].split('-')[1];

                                    day = null;
                                    time = DT[i].split('-')[1];

                                    if (time.indexOf(',') > -1) {
                                        for (var j = 0; j < time.split(',').length; j++) {
                                            NovenaDayAndTime.push(
                                          {
                                              Day: day,
                                              Time: time.split(',')[j]
                                          }
                                          );
                                         var html = '<tr NovenaID=' + novenaId + ' ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[j] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                                                                                                                                                                                       
                                            //var html = '<tr NovenaID=' + novenaId + ' ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[j] + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                            $("#tblNovenaTiming").append(html);
                                        }
                                    }
                                    else {
                                        NovenaDayAndTime.push(
                                            {
                                                Day: day,
                                                Time: time
                                            }
                                            );
                                        var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';

                                        //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        $("#tblNovenaTiming").append(html);
                                    }
                                }

                                else {
                                    day = DT[i].split('-')[0];
                                    time = DT[i].split('-')[1];

                                    if (time.indexOf(',') > -1) {
                                        for (var k = 0; k < time.split(',').length; k++) {
                                            NovenaDayAndTime.push(
                                          {
                                              Day: day,
                                              Time: time.split(',')[k]
                                          }
                                          );

                                            var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[k] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)" ><i class="halflings-icon white trash"></i> </a></td></tr>';

                                            //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[k] + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)" ><i class="halflings-icon white trash"></i> </a></td></tr>';
                                            $("#tblNovenaTiming").append(html);
                                        }
                                    }

                                    else {
                                        NovenaDayAndTime.push(
                                            {
                                                Day: day,
                                                Time: time
                                            }
                                            );
                                        var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        $("#tblNovenaTiming").append(html);
                                    }
                                }
                            }
                        }

                        DayAndTime = DayAndTime.replace("|", ",");
                    }
                    else {
                        if (DayAndTime.indexOf('-') > -1) {
                            if (DayAndTime.split('-')[0] == "Dai") {

                                day = null;
                                time = DayAndTime.split('-')[1];

                                if (time.indexOf(',') > -1) {
                                    for (var l = 0; l < time.split(',').length; l++) {
                                        NovenaDayAndTime.push(
                                      {
                                          Day: day,
                                          Time: time.split(',')[l]
                                      }
                                      );
                                        var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[l] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[l] + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        $("#tblNovenaTiming").append(html);
                                    }
                                }

                                else {
                                    NovenaDayAndTime.push(
                                           {
                                               Day: day,
                                               Time: time
                                           }
                                           );
                                    var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                    //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                    $("#tblNovenaTiming").append(html);
                                }
                            }

                            else {

                                day = DayAndTime.split('-')[0];

                                time = DayAndTime.split('-')[1];

                                if (time.indexOf(',') > -1) {
                                    for (var m = 0; m < time.split(',').length; m++) {
                                        NovenaDayAndTime.push(
                                      {
                                          Day: day,
                                          Time: time.split(',')[m]
                                      }
                                      );
                                        var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[m] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[m] + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        $("#tblNovenaTiming").append(html);

                                    }
                                }
                                else
                                {
                                    NovenaDayAndTime.push(
                                           {
                                               Day: day,
                                               Time: time
                                           }
                                           );
                                    var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                    //var html = '<tr NovenaID=' + novenaId + '><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                    $("#tblNovenaTiming").append(html);
                                }
                            }

                        }
                    }
                 
                    //$.each(NovenaDayAndTime, function (index, NovenaDayAndTime) {

                    //     ;

                    //    var html = '<tr ><td>' + (NovenaDayAndTime.Day != null ? day : "-") + '</td><td class="center">' + NovenaDayAndTime.Time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                    //    $("#tblNovenaTiming").append(html);

                    //});

                   

                 //   $('#lblSelectedTimes').text(DayAndTime.replace(/^,/, ''));
                }

            });
        }
    }

   

}
function ViewIndividualPatron(obj) {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    IsNormal = true;
     ;
    $('#DivBoxHeader').hide();
    $('#EditPatron').hide();

    $('#DivSaints').hide();
    $('#DivIndividualPatron').show();

    var SaintName = $(obj).attr('SaintName');
    var SaintID = $(obj).attr('ID');
    BindNovenasPatronID(SaintID);

    PatronID = SaintID;

    //document.getElementById("spnSaint").innerHTML = SaintName;
    //$('.latest').text(SaintName)  ;
    $(".Novena").remove();//removes novena li from breadcrumb

    $("#breadcrumbNovena").append('<li><a href="../AdminPanel/Novenas.aspx"> Novenas </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + SaintName + '</li>');
}

function AddNewNovena() {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    IsNormal = true;
    
    $('#DivBoxHeader').hide();
    $('#EditPatron').hide();
    $('#DivSaints').hide();
    $('#DivIndividualPatron').show();
    $('#DivNewNovena').show();
    BindAllNovenas();
    $(".Novena").remove();//removes novena li from breadcrumb
    $("#breadcrumbNovena").append('<li><a href="../AdminPanel/Novenas.aspx"> Novenas </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li>New Novena</li>');
}




//Onclick Of Saint Image
function ViewIndividualPatron(obj) {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    IsNormal = true;
    
    $('#DivBoxHeader').hide();
    $('#EditPatron').hide();

    $('#DivSaints').hide();
    $('#DivIndividualPatron').show();

    var SaintName = $(obj).attr('SaintName');
    var SaintID = $(obj).attr('ID');
    BindNovenasPatronID(SaintID);

    PatronID = SaintID;
    $("#hdfPatronID").val(PatronID);

   
    //document.getElementById("spnSaint").innerHTML = SaintName;
    //$('.latest').text(SaintName)  ;
    $(".Novena").remove();//removes novena li from breadcrumb

    $("#breadcrumbNovena").append('<li><a href="../AdminPanel/Novenas.aspx"> Novenas </a><i class="fa fa-angle-right" aria-hidden="true"></i></li><li class="Pictures"> ' + SaintName + '</li>');
}
var DayAndTimeTemp = '';
//More Details (VIEW DETAILS CLICK)
function BindNovenaMoreDetails(ID) {
    debugger;
    ScrollPage();
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    //  $('#DivNovenaTiming').hide();
    SetControlsInViewFormat();

    var jsonResult = {};
    var Novenas = new Object();
    Novenas.novenaId = ID;
    $('#hdfNovenaID').val(Novenas.novenaId);
    jsonResult = GetNovenasByNovenaID(Novenas);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#h1Event").text(jsonResult.NovenaCaption);
            url = jsonResult.URL;

            if (url == null) {
                url = "../img/No-Img_Chosen.png";
                $('#imgNovenaView').attr('src', url);
            }
            else {
                $('#imgNovenaView').attr('src', url);

            }

            $('#lblChurchNam').text(jsonResult.ChurchName);

            if (jsonResult.StartDate == null && jsonResult.EndDate == null) {
                $('#ViewDate').hide();
                $('#lblViewDate').hide();
            }
            else {
                $('#ViewDate').show();
                $('#lblViewDate').show();
                $('#lblViewDate').html(ConvertJsonToDate(jsonResult.StartDate) + ' <strong> To </strong> ' + ConvertJsonToDate(jsonResult.EndDate));
            }

          
            $('#lblDescription').text(jsonResult.Description);
            $('#hdfNovenaID').val(jsonResult.ID);
            $('#hdfPatronID').val(jsonResult.PatronID);

           
            var DayAndTime = jsonResult.DayAndTime;

            if (DayAndTime != null) {

                if (DayAndTime.indexOf('|') > -1) {
                    var DT = DayAndTime.split('|');

                    for (var i = 0; i < DT.length; i++) {
                        if (DT[i].indexOf('-') > -1) {
                            if (DT[i].split('-')[0] == "Dai") {
                                DT[i] = DT[i].split('-')[1];
                            }
                        }
                        if (i == 0) {
                            DayAndTimeTemp = DayAndTimeTemp + DT[i] + '<br/> ';
                        }
                        else {
                            DayAndTimeTemp = DayAndTimeTemp + DT[i] + '<br/> ';
                        }
                    }

                    DayAndTime = DayAndTimeTemp;

                }
                else {
                    if (DayAndTime.indexOf('-') > -1) {
                        if (DayAndTime.split('-')[0] == "Dai") {
                            DayAndTime = DayAndTime.split('-')[1];
                        }
                    }

                    // NovenaTiming = '<strong>' + DayAndTime + '</strong><br/> ';
                }
            }



            //if (DayAndTime.indexOf('-') > -1) {
            //    if (DayAndTime.split('-')[0] == "Dai") {
            //        DayAndTime = DayAndTime.split('-')[1];
            //    }
            //}

            if (jsonResult.DayAndTime == null) {
                $('#lblViewTime').hide();
                $('#Viewtime').hide();
            }


            else {
                $('#lblViewTime').html(DayAndTime);
            }


            //  NovenaTiming = '<strong>' + DayAndTime + '</strong><br/> ';


        });
    }
    DayAndTimeTemp = '';

}
function GetNovenasByNovenaID(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetNovenaDetailsByNovenaID");
    table = JSON.parse(ds.d);

    return table;
}
//Add New Saint HyperLink Click
function OpenNewSaintModal() {
    $('#NewSaintModel').modal('show');
}
//--------------------------------//



//Clear Controls
function SetControlsInNovenaFormat(IsNewButtonClicked)
{
    debugger;
    IsNormal = true;
    ClearControls();
    
    $("#ddlPatron").val($('#hdfPatronID').val()).trigger("change");
    if ($('#hdfNovenaID').val() != "" && IsNewButtonClicked == null) {
        BindNovenaMoreDetails($('#hdfNovenaID').val());
    }
else {
     $('#DivNewNovena').show();
     $('#NoticeEdit').hide();
     $('#h1Event').text("New Novena");
     $('#DivNewFormat').show();
     $('#btnSave').show();
     $('#btnCancel').show();
     $('#btnDelete').hide();
     $('#DivViewFormat').hide();
    }
}
function ClearControls() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file') {
            this.value = '';
        }
        else if (this.type == 'radio' || this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });

   $("#ddlPatron").select2("val", "");

    url = "../img/No-Img_Chosen.png";
    $('#imgNewNovena').attr('src', url);
    
    $("#rdoNovenaSpecial").parent().removeClass('checked');
    $('#rdoNovenaNormal').parent().addClass('checked');

    $("#divStartDate").hide();
    $("#divEndDate").hide();
  //  $("#divDay").show();

    $('#lblSelectedTimes').text("");

    $("#tblNovenaTiming").html("");

    NovenaDayAndTime = [];
    

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


}
function SetControlsInViewFormat()
{
  
   // $('#DivNovenaTiming').hide();
    $('#DivNewNovena').show();
    $('#DivNewFormat').hide();
    $('#DivViewFormat').show();
    $('#btnSave').hide();
    $('#btnCancel').hide();
    $('#btnDelete').hide();

    $("#ddlDay").val("");
    $('#NoticeEdit').show();
    
    $('#iconEdit').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
    $('#NoticeEdit').attr('onclick', 'FixedEditClick();');

    $('#lblViewTime').show();
    $('#Viewtime').show();

}
function ClearModalControls() {
    $(':input').each(function () {

        if (this.type == 'text' || this.type == 'textarea' || this.type == 'file') {
            this.value = '';
        }
        else if (this.type == 'radio' || this.type == 'checkbox') {
            this.checked = false;
        }
        else if (this.type == 'select-one' || this.type == 'select-multiple') {
            this.value = '-1';
        }
    });
    $('#ModalHead').text("Add New Saint");

    $('#hdfPatronID').val("");
    $('#hdfPatronImageID').val("");
    $('#hdfPatronImageURL').val("");
}
//--------------------------------//

//General
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function NewNovenaValidation() {
    $('#Displaydiv').remove();
    var Name = $('#txtNovenaCaption');
    //   var Description = $('#txtDescription');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
      //  ,{ id: Description[0].id, name: Description[0].name, Value: Description[0].value }

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
            txtB.style.backgroundImage = "url('../img/invalid.png')";
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
function RemoveStyle() {

    $('input[type=text],input[type=password],textarea').css({ background: 'white' });
    $('#ErrorBox,#ErrorBox1,#ErrorBox2,#ErrorBox3').hide(1000);
}
function showpreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#imgSaint').attr('src', e.target.result);
            $('.Preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function ScrollPage() {
    //Scroll page
    var offset = $('#rowfluidDiv').offset();
    offset.left -= 60;
    offset.top -= 340;
    $('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
    });
}
function hrsTo24hrormat(hours, minutes) {
 

    var h = hours;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (h < 10) sHours = sHours;
    if (minutes < 10) sMinutes = sMinutes;
    return sHours + ":" + sMinutes;
}
var DayNtimeHTML = '';
function AddDayAndTimeToArray() {
   
    var IsValid = true;

    if ($("#TxtTime").val() != "") {

        var tim = $(".ti_tx .timepicki-input").val();
        var mini = $(".mi_tx .timepicki-input").val();
        var mer = $(".mer_tx .timepicki-input").val();

        var time = tim + ":" + mini + mer;
        var day = $("#ddlDay").val();
        //Before adding checking whether its already added
        for (var i = 0; i < NovenaDayAndTime.length; i++) {
            if (NovenaDayAndTime[i].Day == day) {
                var hour = NovenaDayAndTime[i].Time.split(':')[0].trim();

                if (hour.length == 1) {
                    NovenaDayAndTime[i].Time = "0" + NovenaDayAndTime[i].Time;
                }
                if (NovenaDayAndTime[i].Time == time) {
                    alert("It is already added");
                    IsValid = false;
                    break;
                }
            }
        }

        if (IsValid) {

            NovenaDayAndTime.push(
                {
                    Day: day,
                    Time: time
                }
                );
            var novenaId = $('#hdfNovenaID').val();
             var html = '<tr  ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
            //var html = '<tr  ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash" ></i> </a></td></tr>';
            $("#tblNovenaTiming").append(html);
        }
    }
    else {
        alert("Please select a time");
    }
}
function NewPatronValidation()
{
    $('#Displaydiv1').remove();
    var Name = $('#txtSaintName');
    //   var Description = $('#txtDescription');

    var container = [
        { id: Name[0].id, name: Name[0].name, Value: Name[0].value }
      //  ,{ id: Description[0].id, name: Description[0].name, Value: Description[0].value }

    ];

    var j = 0;
    var Errorbox = document.getElementById('ErrorBox1');
    var divs = document.createElement('div');
    divs.setAttribute("id", "Displaydiv1");
    Errorbox.appendChild(divs);
    for (var i = 0; i < container.length; i++) {
        if (container[i].Value == "") {
            j = 1;
            Errorbox.style.borderRadius = "5px";
            Errorbox.style.display = "block";
            var txtB = document.getElementById(container[i].id);
            txtB.style.backgroundImage = "url('../img/invalid.png')";
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
        $('#ErrorBox1').hide();
        return true;
    }

}
//--------------------------------//


//Insert Novena Timing
function InsertNovenaTiming(NovenaTiming) {

  
    var data = "{'NovenaTimingObj':" + JSON.stringify(NovenaTiming) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertNovenaTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//
//Delete Novena Time
function DeleteTime(Obj) {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


  
    var deleteConirm = confirm("Want to delete?");
    if (deleteConirm) {
        
    var $row = $(Obj).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

   
    var day = $tds[0].innerText;
    var time = $tds[1].innerText;
    NovenaDayAndTime = $.grep(NovenaDayAndTime, function (e) {
       
        return (e.Day !== day && e.Time !== time);
    });

    if ($row.attr("NovenaID") == null) {
        $(Obj).closest("tr").remove();
    } 
    else {
        var NovenaTiming = new Object();
        NovenaTiming.novenaId = $("#hdfNovenaID").val();
        NovenaTiming.day = $tds[0].innerText;
        NovenaTiming.time = $tds[1].innerText;

        DeleteNovenaTiming(NovenaTiming);

        FixedEditClick();
        BindNovenasPatronID(PatronID);
    }
   

    }
    else {
        return false;
    }
    
    //$.each($tds, function () {               // Visits every single <td> element
    //    // alert($(this).text());     

    //});

    
    //var p = Obj.parentNode.parentNode;
    //p.parentNode.removeChild(p);

    //editedrow = $(this).closest('tr');
    //editedrow.remove();
}
function DeleteNovenaTiming(NovenaTiming) {
    var ds = {};
    var table = {};
    var data = "{'NovenaTimingObj':" + JSON.stringify(NovenaTiming) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/DeleteNovenaTiming");
    table = JSON.parse(ds.d);

    return table;
}
function DeleteFileFromFolder(imgPath) {

    $.ajax({
        type: "POST",
        url: "../AdminPanel/Novenas.aspx/DeleteFileFromFolder",
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
function DeleteAppImage(AppImages) {
    var data = "{'AppImgObj':" + JSON.stringify(AppImages) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/DeleteAppImage");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;

}
function DeleteNovenaTimingbyNovenaID(NovenaTiming) {
    var ds = {};
    var table = {};
    var data = "{'NovenaTimingObj':" + JSON.stringify(NovenaTiming) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/DeleteNovenaTimingByNovenaID");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//

//Not using now, Might be helpful if update functionality is giving for each novena time
function UpdateTime(obj)
{
 

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    var $row = $(obj).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

 
    var day = $tds[0].innerText;
    var time = $tds[1].innerText;

    $("#ddlDay").val(day).trigger("change");

    $("#TxtTime").val(time);
    NovenaDayAndTime = $.grep(NovenaDayAndTime, function (e) {
       
        return (e.Day !== day && e.Time !== time);
    });


  
    var c = NovenaDayAndTime;

} 

//------------------------------------------------------ * Methods related to Patron  *------------------------------------------------------//

//Bind patrons in editable format (Attaching edit and delete button to Patron Image Div)
function BindPatronsInEditableFormat() {
    var jsonResult = {};
    var PatronMaster = new Object();
    var Church = new Object();
    PatronMaster.churchObj = Church;
    jsonResult = GetAllPatrons(PatronMaster);
    if (jsonResult != undefined) {
        FillPatronsInEditableFormat(jsonResult);
    }
}

function FillPatronsInEditableFormat(Records) {

    $('#DivSaints').html('');
    // var TotalRecords = Records.length+1;
    var TotalRecords = Records.length + 1;            // Adding 1 bcz ADD NEW EVENT div has to be appended first
    var RecordsToBeProcessed = Records.length;      // Initially Sets to Record count , It will decrease by 1 , when processing
    var NoOfRows = 0;
    var SpanValue = 0;

    //No of rows calculation 
    if (TotalRecords % 6 == 0) {
        NoOfRows = TotalRecords / 6;

    }
    else {
        NoOfRows = parseInt(TotalRecords / 6) + 1
    }

    if (TotalRecords <= 6) {
        NoOfRows = 1;
    }

    var html = '';
    SpanValue = "span2";
    var ul = '<ul class="thumbnails">'
    var ObjUl;

    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;
        var ID = Records.ID;
        var ImageID = Records.ImageID;
        if (imgurl == null) {
            imgurl = "../img/gallery/priest.png";
        }

        if (RecordsToBeProcessed > 0) {

            if (index < 5) {            //First Row

                if (RecordsToBeProcessed == (TotalRecords - 1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    ObjUl.append('<div id="divAddSaint" class=' + SpanValue + '><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint" onclick="OpenNewSaintModal()">Add New Saint</></a></div><li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\' /><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" class="circlebtn circlebtn-danger deletetext" ID =' + ID + ' ImageID=' + ImageID + ' onclick="deletePatron(this)" ><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><a class="circlebtn circlebtn-success patronUpdate" title="Change" href="#" ID=' + ID + ' ImageID=' + ImageID + ' onclick="updatePatron(this)" URL="' + Records.URL + '" SaintName=\'' + Records.Name + '\' SaintDescription=\'' + Records.Description + '\'><i class="halflings-icon white pencil"></i> </a><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }
                else {
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" class="circlebtn circlebtn-danger deletetext" onclick="deletePatron(this)" ImageID=' + ImageID + ' ID =' + ID + '><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><a class="circlebtn circlebtn-success patronUpdate" title="Change" href="#" ID=' + ID + ' ImageID=' + ImageID + ' onclick="updatePatron(this)" URL="' + Records.URL + '" SaintName=\'' + Records.Name + '\' SaintDescription=\'' + Records.Description + '\'><i class="halflings-icon white pencil"></i> </a><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }

                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {

                if (index == 5) {  //First Row (Including ADS SAINT Div)
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                if ((index + 1) % 6 == 0) { //Max 6 per row, after that a new ul will be created
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><a data-rel="tooltip" data-original-title="Delete" URL="' + Records.URL + '" class="circlebtn circlebtn-danger deletetext" ImageID=' + ImageID + ' onclick="deletePatron(this)" ID =' + ID + '><i style="font-size: 19px;color: whitesmoke !important;" class="fa fa-times" aria-hidden="true"></i></a><a class="circlebtn circlebtn-success patronUpdate" title="Change" href="#" ImageID=' + ImageID + ' ID=' + ID + ' onclick="updatePatron(this)" URL="' + Records.URL + '" SaintName=\'' + Records.Name + '\' SaintDescription=\'' + Records.Description + '\'><i class="halflings-icon white pencil"></i> </a><strong>' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }
        }
    })
    $('#DivSaints').append(ObjUl);

}

//Update Patron
function updatePatron(obj) {
    $('#ModalHead').text("Edit Saint");

    var patronID = $(obj).attr('ID');
    var patronImageID = $(obj).attr('ImageID');
    var PatronURL = $(obj).attr('URL');
    var PatronName = $(obj).attr('SaintName');
    var PatronDescription = $(obj).attr('SaintDescription');

    OpenNewSaintModal();

    $("#txtSaintName").val(PatronName);
    $("#txtSaintDescription").val(PatronDescription);

    $('#hdfPatronID').val(patronID);
    $('#hdfPatronImageID').val(patronImageID);
    $('#hdfPatronImageURL').val(PatronURL);

}
function UpdatePatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/UpdatePatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//

//Delete Patron
function deletePatron(obj) {
    var deleteConirm = confirm("Want to delete?");
    if (deleteConirm) {

        var patronID = $(obj).attr('ID');
        var PatronImageID = $(obj).attr('ImageID');
        var PatronImageURL = $(obj).attr('URL');

        var PatronMaster = new Object();
        PatronMaster.patronMasterId = patronID;
        result = DeletePatron(PatronMaster);

        BindPatrons();

        if (result.Status == 1) {

            $('#rowfluidDiv').show();
            $('.alert-success').show();
            $('.alert-success strong').text("Patron deleted successfully");

            var AppImages = new Object();
            AppImages.appImageId = PatronImageID;
            DeleteAppImage(AppImages);

            DeleteFileFromFolder(PatronImageURL);

        }

        if (result.Status == 0) {

            $('#rowfluidDiv').show();
            $('.alert-error').show();
            $('.alert-error strong').text("Already Used.Can't be deleted");

        }

    }

    else {
        return false;
    }

}
function DeletePatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/DeletePatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//

//Insert Patron
function InsertPatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertPatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//

//Bind Patron Dropdown
function BindPatronDropdown() {

    var jsonResult = {};
    var PatronMaster = new Object();
    jsonResult = GetAllPatronIdAndName(PatronMaster);
    return jsonResult;
}
function GetAllPatronIdAndName(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatronIdAndName");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//

//Bind Patrons
function BindPatrons() {
    var jsonResult = {};
    var PatronMaster = new Object();
    var Church = new Object();
    PatronMaster.churchObj = Church;
    jsonResult = SelectAllPatronMasterByChurchID(PatronMaster);
    if (jsonResult != undefined) {
        FillPatrons(jsonResult);
    }
}
function FillPatrons(Records) {

    $('#DivSaints').html('');
    // var TotalRecords = Records.length+1;
    var TotalRecords = Records.length + 1;            // Adding 1 bcz ADD NEW EVENT div has to be appended first
    var RecordsToBeProcessed = Records.length;      // Initially Sets to Record count , It will decrease by 1 , when processing
    var NoOfRows = 0;
    var SpanValue = 0;

    //No of rows calculation 
    if (TotalRecords % 6 == 0) {
        NoOfRows = TotalRecords / 6;

    }
    else {
        NoOfRows = parseInt(TotalRecords / 6) + 1
    }

    if (TotalRecords <= 6) {
        NoOfRows = 1;
    }

    var html = '';
    SpanValue = "span2";
    var ul = '<ul class="thumbnails">'
    var ObjUl;

    $.each(Records, function (index, Records) {
        var imgurl = Records.URL;

        if (imgurl == null) {
            imgurl = "../img/gallery/priest.png";
        }

        if (RecordsToBeProcessed > 0) {

            if (index < 5) {            //First Row1

                if (RecordsToBeProcessed == (TotalRecords - 1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\' /><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }
                else {
                    ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                }

                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }

            else {

                if (index == 5) {  //First Row (Including ADS SAINT Div)
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                if ((index + 1) % 6 == 0) { //Max 6 per row, after that a new ul will be created
                    $('#DivSaints').append(ObjUl);
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                }
                ObjUl.append('<li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\'/><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
                RecordsToBeProcessed = RecordsToBeProcessed - 1;
            }
        }
    })
    $('#DivSaints').append(ObjUl);
    if (Records.length == 0) {
        //$('.dataTables_empty').parent().parent().remove();
        var img = document.createElement('img');
        img.src = "../img/nodata.jpg";
        img.id = "NoData";
        $("#DivNovenas").append(img);
    }
}
function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);

    return table;
}

function SelectAllPatronMasterByChurchID(PatronMaster)
{
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/SelectAllPatronMasterByChurchID");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//

//------------------------------------------------------ *END: Methods related to Patron  *------------------------------------------------------//



