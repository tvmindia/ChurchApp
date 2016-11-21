
var IsNormal = true;
var NovenaDayAndTime = new Array();
var PatronID = '';
var NovenaTimes = new Array();


$("document").ready(function (e)
{
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
        IsNormal = false;

       // $("#divDay").hide();
        $("#divStartDate").show();
        $("#divEndDate").show();
        $("#ddlDay").val("");

    });

    $("#rdoNovenaNormal").click(function () {
        IsNormal = true;
        $("#divStartDate").hide();
        $("#divEndDate").hide();
       // $("#divDay").show();
    });
     //Okbtn
     $('#addBtn').click(function (e) {
       
        //if (IsNormal) {
            AddDayAndTimeToArray();
        //}
        //else
        //{
        //    AddTimeToArray();
        //}
    });
    $('#btnSave').click(function (e) {
       // $('#DivNovenaTiming').show();

        debugger;

        var Novenas = new Object();
        Novenas.patronId = $("#ddlPatron").val();
            //$("#ddlPatron").val();
        Novenas.novenaCaption = $("#txtNovenaCaption").val();
        Novenas.description = $("#txtDescription").val();

        //if (IsNormal) {
        //    NovenaTiming

        //}
        if (IsNormal == false)

         {
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
            
            result = InsertNovena(Novenas);

            if (result.Status == 1)
            {
                debugger;
                var NovenaTiming = new Object();
               NovenaTiming.novenaId = result.novenaId;
               //if (IsNormal) {

                   $.each(NovenaDayAndTime, function (index, NovenaDayAndTime) {

                       debugger;

                       var day = NovenaDayAndTime.Day;
                       var time = NovenaDayAndTime.Time;
                       // time = time + ":00.0000000";

                       NovenaTiming.day = day;
                       NovenaTiming.time = time;


                       InsertNovenaTiming(NovenaTiming);
                   });

               //}
               //else {
               //    $.each(NovenaTimes, function (index, NovenaTimes) {

               //        debugger;

               //       var time = NovenaTimes.Time;
               //        // time = time + ":00.0000000";
               //      NovenaTiming.time = time;

               //        InsertNovenaTiming(NovenaTiming);
               //    });
               //}


            }


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

            result = InsertPatron(PatronMaster);

            if (result.Status == 1)
            {
                BindPatrons();
                $('#NewSaintModel').modal('hide');
                //$('#btnCloseInModal').click();
            }
        }
    });
    
}); //End of Document ready


function hrsTo24hrormat(hours, minutes) {
    debugger;
   
    var h = hours;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (h < 10) sHours = sHours;
    if (minutes < 10) sMinutes = sMinutes;
    return sHours + ":" + sMinutes;
}

var DayNtimeHTML = '';
function AddDayAndTimeToArray()
{
    debugger;

    if ($("#TxtTime").val() != "") {

   
    var tim = $(".ti_tx .timepicki-input").val();
    var mini = $(".mi_tx .timepicki-input").val();
    var mer = $(".mer_tx .timepicki-input").val();

    var time = hrsTo24hrormat(tim, mini);
   // var time = time + ":00.0000000";


     var day = $("#ddlDay").val();
    // var time = $("#TxtTime").val();


     NovenaDayAndTime.push(
         {
             Day: day,
             Time: time
         }
         );

    
  //   DayNtimeHTML = DayNtimeHTML + ", " + day.trim() + "-" + time.trim();
    // $('#lblSelectedTimes').text(DayNtimeHTML.replace(/^,/, ''));

     time = time + mer;

     

     var html = '<tr ><td>' + (day != null ? day : "-")  + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
     $("#tblNovenaTiming").append(html);

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
  //  $('#lblSelectedTimes').text(timeHTML.replace(/^,/, ''));
    var html = '<tr ><td>' + "Daily" + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
    $("#tblNovenaTiming").append(html);

}


//Insert Novena Timing
function InsertNovenaTiming(NovenaTiming) {
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

function FixedEditClick()
{
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
                                        for (var i = 0; i < time.split(',').length; i++) {
                                            NovenaDayAndTime.push(
                                          {
                                              Day: day,
                                              Time: time.split(',')[i]
                                          }
                                          );
                                            var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[i] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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
                                        var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                        $("#tblNovenaTiming").append(html);
                                    }
                                }

                                else {
                                    day = DT[i].split('-')[0];
                                    time = DT[i].split('-')[1];

                                    if (time.indexOf(',') > -1) {
                                        for (var i = 0; i < time.split(',').length; i++) {
                                            NovenaDayAndTime.push(
                                          {
                                              Day: day,
                                              Time: time.split(',')[i]
                                          }
                                          );
                                            var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[i] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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

                                        var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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
                                    for (var i = 0; i < time.split(',').length; i++) {
                                        NovenaDayAndTime.push(
                                      {
                                          Day: day,
                                          Time: time.split(',')[i]
                                      }
                                      );
                                        var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[i] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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

                                    var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
                                    $("#tblNovenaTiming").append(html);
                                }
                            }

                            else {

                                day = DayAndTime.split('-')[0];

                                time = DayAndTime.split('-')[1];

                                if (time.indexOf(',') > -1) {
                                    for (var i = 0; i < time.split(',').length; i++) {
                                        NovenaDayAndTime.push(
                                      {
                                          Day: day,
                                          Time: time.split(',')[i]
                                      }
                                      );
                                        var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time.split(',')[i] + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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

                                    var html = '<tr ><td>' + (day != null ? day : "-") + '</td><td class="center">' + time + '</td></td><td class="center"><a class="circlebtn circlebtn-danger massTimeDelete" title="Delete" href="#"><i class="halflings-icon white trash"></i> </a></td></tr>';
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
function SetControlsInNovenaFormat()
{
    debugger;
    IsNormal = true;
    ClearControls();
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
            $('#hdfNovenaID').val(jsonResult.NovenaID);
           
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
            $('#lblViewTime').html(DayAndTime);
          //  NovenaTiming = '<strong>' + DayAndTime + '</strong><br/> ';

          
        });
    }


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
    $('.latest').text(SaintName)  ;
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
//--------------------------------//

