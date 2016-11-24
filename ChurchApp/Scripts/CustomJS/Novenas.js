

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable


var IsNormal = true;
var NovenaDayAndTime = new Array();
var PatronID = '';
var NovenaTimes = new Array();

var IsUpdateTimeClicked = false;

$("document").ready(function (e)
{
     debugger;

        //var time = "9:00PM";
        //var timeTemp = time;
        //var ampmLen = 2;
        //var ampm = time.substring(time.Length - ampmLen, ampmLen);
        //var hourIndex = 0;
        //time = time.replace(ampm, "");
        //time = time.trim();
        //var hour = timeTemp.split(':')[hourIndex];

        //var minutes = timeTemp.split(':')[1];
        //var h = hour;

        //alert(ampm);


        //var TimeIn24HrFormat = h + ":" + minutes;


    $("#TxtTime").timepicki();

    $('&nbsp; <a id="addBtn" class="btn btn-primary button" ><span>+</span></></a>').insertAfter($(".timepicker_wrap"));

    debugger;
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



        IsNormal = false;

       // $("#divDay").hide();
        $("#divStartDate").show();
        $("#divEndDate").show();
        $("#ddlDay").val("");

    });

    $("#rdoNovenaNormal").click(function () {

        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();


        IsNormal = true;
        $("#divStartDate").hide();
        $("#divEndDate").hide();
       // $("#divDay").show();
    });

    //Okbtn
    //PLUS button click
     $('#addBtn').click(function (e) {
       
        //if (IsNormal) {
            AddDayAndTimeToArray();
        //}
        //else
        //{
        //    AddTimeToArray();
        //}
     });

    //Save Click
     $('#btnSave').click(function (e) {
         // $('#DivNovenaTiming').show();

         $('#rowfluidDiv').hide();
         $('.alert-success').hide();
         $('.alert-error').hide();
         var SuccessMsg = '';
         debugger;

         if ($("#ddlPatron").val() != null && $("#ddlPatron").val() != "") {

             var Novenas = new Object();
             Novenas.patronId = $("#ddlPatron").val();
             //$("#ddlPatron").val();
             Novenas.novenaCaption = $("#txtNovenaCaption").val();
             Novenas.description = $("#txtDescription").val();

             //if (IsNormal) {
             //    NovenaTiming

             //}
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

                 if (((imagefile = $('#UpNewNovena')[0].files[0]) != undefined)) {
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
                         Novenas.imageID = imageId;
                     }
                     
                 }
                 if ($('#hdfNovenaID').val() == "") {
                     result = InsertNovena(Novenas);
                 }
                 else {

                     Novenas.novenaId = $('#hdfNovenaID').val();

                     result = UpdateNovena(Novenas);

                     if (DeletedImgID != '' && (((imagefile = $('#UpNewNovena')[0].files[0]) != undefined))) {
                         var AppImages = new Object();
                         AppImages.appImageId = DeletedImgID;
                         DeleteAppImage(AppImages);

                         if (DeletedImgPath != '') {
                             DeleteFileFromFolder(DeletedImgPath);
                         }
                     }
                 }


                 if (result.Status == 1) {
                     debugger;
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
                     

                         $.each(NovenaDayAndTime, function (index, NovenaDayAndTime) {

                             debugger;

                             var day = NovenaDayAndTime.Day;
                             var time = NovenaDayAndTime.Time;

                             NovenaTiming.day = day;
                             NovenaTiming.time = time;
                             InsertNovenaTiming(NovenaTiming);
                             //NovenaTiming.Status =
                                 

                             //if (NovenaTiming.Status == 0) {
                             //    alert("It is already added");
                             //}

                         });
                    
                        FixedEditClick();

                         $('#rowfluidDiv').show();
                         $('.alert-success').show();
                         $('.alert-success strong').text(SuccessMsg);
                        
                         BindNovenasPatronID(PatronID);
                         ScrollPage();
                     
                 }
             }

         }
         else {
             alert("Please select a patron");
         }
    });
   
    //Cancel Click
    $('#btnCancel').click(function (e) {
        SetControlsInNovenaFormat();
    });

    //Save - New Saint
    $('#btnSaveInModal').click(function (e) {
        //var IsValid = NewSaintValidation();
       
        debugger;
        var PatronMaster = new Object();
        PatronMaster.patronMasterName = $("#txtSaintName").val(); 
        PatronMaster.description = $("#txtSaintDescription").val();

        var guid = createGuid();

        if (guid != null) {

            var imgresult = "";
            var _URL = window.URL || window.webkitURL;
            var formData = new FormData();
            var imagefile;

            if (((imagefile = $('#UpSaint')[0].files[0]) != undefined)) {
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
                if ($('#hdfPatronImageID').val() != '' )
                {
                    PatronMaster.imageID = $('#hdfPatronImageID').val();
                }
            }
        }

        if (  $('#hdfPatronID').val() != "") {
            PatronMaster.patronMasterId = $('#hdfPatronID').val();

            result = UpdatePatron(PatronMaster);

            if ($('#hdfPatronImageID').val() != '' && (((imagefile = $('#UpSaint')[0].files[0]) != undefined))) {
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
        else {
            result = InsertPatron(PatronMaster);
        }
            if (result.Status == 1)
            {
                BindPatrons();
                $('#NewSaintModel').modal('hide');
                //$('#btnCloseInModal').click();
            }
            ClearModalControls();

    });
    
    //Delete Novena
    $('#btnDelete').click(function (e) {

        //$('#rowfluidDiv').hide();
        //$('.alert-success').hide();
        //$('.alert-error').hide();


        var deleteConirm = confirm("Want to delete?");
        if (deleteConirm) {
            var Novenas = new Object();
            Novenas.novenaId = $('#hdfNovenaID').val();
           
            result = DeleteNovena(Novenas);
            debugger;
            if (result.Status == 1) {

                SetControlsInNovenaFormat(true);

                $('#rowfluidDiv').show();
                $('.alert-success').show();
                $('.alert-success strong').text("Novena Deleted Successfully");

                BindNovenasPatronID(PatronID);
                ScrollPage();

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
    

    $('#btnEditPatron').click(function (e) {
        debugger;


        $('#rowfluidDiv').hide();
        $('.alert-success').hide();
        $('.alert-error').hide();


        var className = $('#iconPatronRefresh').attr('class');
        if (className == "halflings-icon white pencil") {
            BindPatronsInEditableFormat();

            $('#iconPatronRefresh').removeClass("halflings-icon white pencil").addClass("halflings-icon white refresh");
            $('#btnEditPatron').attr('onclick', 'BindPatrons();');

        }

        else
        {
            BindPatrons();
            $('#iconPatronRefresh').removeClass("halflings-icon white refresh").addClass("halflings-icon white pencil");
        }

    })


}); //End of Document ready


function ClearModalControls()
{
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


var DayNtimeHTML = '';
function AddDayAndTimeToArray()
{
    debugger;
    var IsValid = true;

    if ($("#TxtTime").val() != "") {

   
    var tim = $(".ti_tx .timepicki-input").val();
    var mini = $(".mi_tx .timepicki-input").val();
    var mer = $(".mer_tx .timepicki-input").val();

    var time = tim + ":" + mini+mer;
   // var time = time + ":00.0000000";


     var day = $("#ddlDay").val();
    // var time = $("#TxtTime").val();

     for (var i = 0; i < NovenaDayAndTime.length; i++) {
         if (NovenaDayAndTime[i].Day == day) {
             var hour = NovenaDayAndTime[i].Time.split(':')[0].trim();

             if (hour.length==1) {
                 NovenaDayAndTime[i].Time = "0" + NovenaDayAndTime[i].Time;
             }

             if (NovenaDayAndTime[i].Time == time) {
                 alert("It is already added");
                 IsValid = false;
                 break;
             }
         }
     }


     //if ($.inArray(day, NovenaDayAndTime) != -1) {
     //    if ($.inArray(time, NovenaDayAndTime) != -1) {
     //        alert("It is already added");
     //    }
                
     //       }


     if (IsValid) {

         NovenaDayAndTime.push(
             {
                 Day: day,
                 Time: time
             }
             );


         //   DayNtimeHTML = DayNtimeHTML + ", " + day.trim() + "-" + time.trim();
         // $('#lblSelectedTimes').text(DayNtimeHTML.replace(/^,/, ''));

         //time = time + mer;

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

var timeHTML = '';
function AddTimeToArray()
{
    var tim = $(".ti_tx .timepicki-input").val();
    var mini = $(".mi_tx .timepicki-input").val();

    var time = hrsTo24hrormat(tim, mini);

    NovenaTimes.push(
       { Time: time
       }
       );


    timeHTML = timeHTML + "," + time.trim();


    var novenaId = $('#hdfNovenaID').val();

    //  $('#lblSelectedTimes').text(timeHTML.replace(/^,/, ''));
    
    var html = '<tr ><td>' + "Daily" + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';

    //var html = '<tr ><td>' + "Daily" + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-info massTimeEditbtn" title="Edit" href="#" onclick="UpdateTime(this)"><i class="halflings-icon white edit"></i></a><a class="circlebtn circlebtn-danger TimeDelete" title="Delete" href="#" onclick="DeleteTime(this)"><i class="halflings-icon white trash"></i> </a></td></tr>';
    $("#tblNovenaTiming").append(html);

}


//Insert Novena Timing
function InsertNovenaTiming(NovenaTiming) {

    debugger;
    var data = "{'NovenaTimingObj':" + JSON.stringify(NovenaTiming) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertNovenaTiming");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
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


function FixedEditClick()
{

    debugger;

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
                debugger;
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
                debugger;
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

                    //    debugger;

                    //    var html = '<tr ><td>' + (NovenaDayAndTime.Day != null ? day : "-") + '</td><td class="center">' + NovenaDayAndTime.Time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                    //    $("#tblNovenaTiming").append(html);

                    //});

                   

                 //   $('#lblSelectedTimes').text(DayAndTime.replace(/^,/, ''));
                }

            });
        }
    }

   

}

//Clear Controls
function SetControlsInNovenaFormat(IsNewButtonClicked)
{
    debugger;

    IsNormal = true;
    ClearControls();

    if ($('#hdfNovenaID').val() != "" && IsNewButtonClicked == null) {
        BindNovenaMoreDetails($('#hdfNovenaID').val());
    }

    else {

   
  //  $('#DivNovenaTiming').hide();
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
    NovenaTimes = [];

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


}
function SetControlsInViewFormat()
{
    debugger;
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
//--------------------------------//

//Bind Patrons
function BindPatrons() {
        var jsonResult = {};
        var PatronMaster = new Object();
        jsonResult = GetAllPatrons(PatronMaster);
        if (jsonResult != undefined) {
            FillPatrons(jsonResult);
        }
}
function FillPatrons(Records)
{
 
    $('#DivSaints').html('');
   // var TotalRecords = Records.length+1;
    var TotalRecords = Records.length+1;            // Adding 1 bcz ADD NEW EVENT div has to be appended first
    var RecordsToBeProcessed = Records.length;      // Initially Sets to Record count , It will decrease by 1 , when processing
    var NoOfRows = 0;                       
    var SpanValue = 0;

    //No of rows calculation 
    if (TotalRecords%6 == 0) {
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

        if (RecordsToBeProcessed > 0 ) {
          
            if (index < 5) {            //First Row

                if (RecordsToBeProcessed ==( TotalRecords-1)) {
                    ObjUl = $('<ul></ul>');
                    ObjUl.addClass("thumbnails");
                    ObjUl.append('<div id="divAddSaint" class=' + SpanValue + '><img class="PlusImg" src="../img/Plussymbol.png"/><a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint" onclick="OpenNewSaintModal()">Add New Saint</></a></div><li class=' + SpanValue + '> <div class="thumbnail"><img  src=' + imgurl + ' alt="" class="img-polaroid" onclick="ViewIndividualPatron(this)" SaintName=\'' + Records.Name + '\' ID=\'' + Records.ID + '\' /><strong>  ' + (Records.Name != null ? Records.Name : "") + '  </strong><p>' + (Records.Description != null ? Records.Description : "") + '</p> </div> </li>');
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
                if ( ( index+1) % 6 == 0) { //Max 6 per row, after that a new ul will be created
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

}
function GetAllPatrons(PatronMaster) {
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatrons");
    table = JSON.parse(ds.d);
   
    return table;
}
//--------------------------------//


function BindPatronsInEditableFormat() {
    var jsonResult = {};
    var PatronMaster = new Object();
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

function updatePatron(obj)
{
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

function deletePatron(obj)
{  var deleteConirm = confirm("Want to delete?");
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

function DeletePatron(PatronMaster)
{
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/DeletePatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}

//Bind Patron Dropdown
function BindPatronDropdown()
{
    debugger;
    var jsonResult = {};
    var PatronMaster = new Object();
    jsonResult = GetAllPatronIdAndName(PatronMaster);
    return jsonResult;
}
function GetAllPatronIdAndName(PatronMaster)
{
    var ds = {};
    var table = {};
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetAllPatronIdAndName");
    table = JSON.parse(ds.d);

    return table;
}
//--------------------------------//

var DayAndTimeTemp = '';
//More Details
function BindNovenaMoreDetails(ID)
{
    ScrollPage();
    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


  //  $('#DivNovenaTiming').hide();
    SetControlsInViewFormat();

    var jsonResult = {};
    var Novenas = new Object();
    Novenas.novenaId = ID;
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
            else
            {
                $('#ViewDate').show();
                $('#lblViewDate').show();
                $('#lblViewDate').html(ConvertJsonToDate(jsonResult.StartDate) + ' <strong> To </strong> ' + ConvertJsonToDate(jsonResult.EndDate));
            }
           
            debugger;
            $('#lblDescription').text(jsonResult.Description);
            $('#hdfNovenaID').val(jsonResult.ID);
           
            debugger;
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
//--------------------------------//

//Onclick Of Saint Image
function ViewIndividualPatron(obj) {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    IsNormal = true;
    debugger;
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

            // $(".aViewMore").style.display = "";
        }
        else {
            $(".aViewMore").hide();
        }
    }
}
function GetNovenasByPatronID(Novenas) {
    var ds = {};
    var table = {};
    var data = "{'NovenaObj':" + JSON.stringify(Novenas) + "}";
    ds = getJsonData(data, "../AdminPanel/Novenas.aspx/GetNovenasByPatronID");
    table = JSON.parse(ds.d);

    return table;
}
var NovenaTiming = '';
function FillNovenas(Records) {
    debugger;
    $('#DivNovenas').html('');
   
    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;
        var ID = Records.ID;
        var html = '';

        var StartDate = Records.StartDate;
        var EndDate = Records.EndDate;
        var DayAndTime = Records.DayAndTime;

        if (DayAndTime != null) {
    
        if (DayAndTime.indexOf('|') > -1) {
            var DT = DayAndTime.split('|');

            for (var i = 0; i < DT.length; i++)
            {
                if (DT[i].indexOf('-') > -1) {
                    if (DT[i].split('-')[0] == "Dai" ) {
                        DT[i] = DT[i].split('-')[1];
                    }
                }
                if (i==0) {
                    NovenaTiming = NovenaTiming + '<strong>' + DT[i] + '</strong><br/> ';
                }
                else
                {
                    NovenaTiming = NovenaTiming + '<strong>' + DT[i] + '</strong><br/> ';
                }
            }
        }
        else
        {
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
        
        if (html!='') {
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

//Insert Patron
function InsertPatron(PatronMaster) {
    var data = "{'PatrnObj':" + JSON.stringify(PatronMaster) + "}";
    jsonResult = getJsonData(data, "../AdminPanel/Novenas.aspx/InsertPatron");
    var table = {};
    table = JSON.parse(jsonResult.d);
    return table;
}
//--------------------------------//

//Add New Saint HyperLink Click
function OpenNewSaintModal() {
    $('#NewSaintModel').modal('show');
}


//General
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
function NewSaintValidation() {

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
    debugger;

    var h = hours;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (h < 10) sHours = sHours;
    if (minutes < 10) sMinutes = sMinutes;
    return sHours + ":" + sMinutes;
}
//--------------------------------//


//Delete Novena Time
function DeleteTime(Obj) {

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    debugger;
    var deleteConirm = confirm("Want to delete?");
    if (deleteConirm) {
        
    var $row = $(Obj).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

    debugger;
    var day = $tds[0].innerText;
    var time = $tds[1].innerText;
    NovenaDayAndTime = $.grep(NovenaDayAndTime, function (e) {
        debugger;
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

//General

function UpdateTime(obj)
{
    debugger;

    $('#rowfluidDiv').hide();
    $('.alert-success').hide();
    $('.alert-error').hide();


    var $row = $(obj).closest("tr"),       // Finds the closest row <tr> 
    $tds = $row.find("td");             // Finds all children <td> elements

    debugger;
    var day = $tds[0].innerText;
    var time = $tds[1].innerText;

    $("#ddlDay").val(day).trigger("change");

    $("#TxtTime").val(time);
    NovenaDayAndTime = $.grep(NovenaDayAndTime, function (e) {
        debugger;
        return (e.Day !== day && e.Time !== time);
    });


    debugger;
    var c = NovenaDayAndTime;

}

//--------------------------------//


