

//Global Variables
var imageId = '';                   //Stores imageid of uploaded image
var imgPath = '';                   //Stores path of uploaded image

var DeletedImgID = '';              //While changing the uploaded image with new , previous one should get deleted, So imageid to be deleted is stored in this variable
var DeletedImgPath = '';            //While changing the uploaded image with new , previous one should get deleted from folde, So imag path to be deleted is stored in this variable
var NotificationTypeCode = 'ntc';   //If notification is adding , notification type has to be given ,this value is the code of notice in notice table
//--------------------------------//



$("document").ready(function (e) {

    debugger;
    $('.Eventeditdiv').click(function (e) {
        e.preventDefault();
        $('#EventEditDivBox').show();

    });

    BindEvents();

    $('#btnCancel').click(function (e)
    {
        ClearControls();

        if ($("#hdfEventID").val() != "")
        {
            EditOnClick($("#hdfEventID").val());
        }

    });


});//end of document.ready


// Bind Events
function BindEvents() {

    debugger;

    var jsonResult = {};
    var Events = new Object();
    jsonResult = GetEvents(Events);
    if (jsonResult != undefined) {
        FillEvents(jsonResult);
    }
}

function FillEvents(Records) {
    $('#DivNoticeType1').html('');

    $.each(Records, function (index, Records) {
        debugger;

        var url = Records.URL;

        var html = '<div class="accordion"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' + Records.EventName + '</a></div><div class="accordion-body collapse in"><div class="accordion-inner"><img class="eventImage" id=img' + Records.ID + ' src=' + url + '/><p>' + Records.Descrtiption + '</p><span class="eventViewDetails"><div class="Eventeditdiv"><a id=' + Records.ID + ' href="#" class="aViewDetails" onclick="EditOnClick(\'' + Records.ID + '\')" >View Details</a></div></span><input id=' + Records.ID + ' type="hidden" value=' + Records.ID + '/></div></div></div></div>'
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

function GetEvents(Events) {

    debugger;

    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEvents");
    table = JSON.parse(ds.d);
    return table;
}
//--------------------------------//


//Clear Controls
function ClearControls()
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

    $("#lblEventName").text("");
    $("#lblDescription").text("");
    $("#lblStartDate").text("");
    $("#lblEndDate").text("");
    $("#lblExpiryDate").text("");

}

function FixedEditClick()
{
    debugger;
    ClearControls();
    SetControlsInEditableFormat();
    $("#h1Event").text("Edit Event");

   

    var Events = new Object();
    Events.eventId = $("#hdfEventID").val();

    var jsonResult = {};

    jsonResult = GetEventsByEventID(Events);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            debugger;
            $("#txtEventName").val(jsonResult.EventName);
            $("#txtDescription").val(jsonResult.Descrtiption);
           
        });
    }

}

function SetControlsInNewEventFormat()
{
    ClearControls();

    $("#lblEventName").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblEndDate").hide();
    $("#lblExpiryDate").hide();

    $("#txtEventName").show();
    $("#txtDescription").show();
    $("#dateStartDate").show();
    $("#dateEndDate").show();
    $("#dateExpiryDate").show();
    
    $("#optHideNo").parent().removeClass('checked');
    $('#optHideYes').parent().addClass('checked');

    $("#h1Event").text("New Event");

    $("#EventEditDivBox").show();
    $("#EditContent").show();
    $("#divView").hide();

    $("#btnSave").show();
    $("#btnCancel").show();
    $("#btnDelete").hide();

    $("#hdfEventID").val("");


}

function SetControlsInViewFormat()
{
    //$("#lblEventName").show();
    //$("#lblDescription").show();
    //$("#lblStartDate").show();
    //$("#lblEndDate").show();
    //$("#lblExpiryDate").show();

    //$("#txtEventName").hide();
    //$("#txtDescription").hide();
    //$("#dateStartDate").hide();
    //$("#dateEndDate").hide();
    //$("#dateExpiryDate").hide();

    $("#EventEditDivBox").show();
    $("#EditContent").hide();
    $("#divView").show();


    $("#btnSave").hide();
    $("#btnCancel").hide();
    $("#btnDelete").hide();


}

function SetControlsInEditableFormat()
{
    $("#lblEventName").hide();
    $("#lblDescription").hide();
    $("#lblStartDate").hide();
    $("#lblEndDate").hide();
    $("#lblExpiryDate").hide();

    $("#txtEventName").show();
    $("#txtDescription").show();
    $("#dateStartDate").show();
    $("#dateEndDate").show();
    $("#dateExpiryDate").show();

    $("#EventEditDivBox").show();
    $("#EditContent").show();
    $("#divView").hide();

    $("#btnSave").show();
    $("#btnCancel").show();
    $("#btnDelete").show();

}

//Edit

function EditOnClick(id)
{
    SetControlsInViewFormat();

    var Events = new Object();
    Events.eventId = id;

    if (id != "" && id != null) {
    
    $("#hdfEventID").val(id);

    var jsonResult = {};

    jsonResult = GetEventsByEventID(Events);

    if (jsonResult != undefined) {
        $.each(jsonResult, function (index, jsonResult) {
            $("#h1Event").text(jsonResult.EventName);

            debugger;

            url = jsonResult.URL;
            $('#eventPreviewOnView').attr('src', url);

            imageId = jsonResult.ImageID;
            imgPath = jsonResult.URL;

            debugger;
            if (jsonResult.Descrtiption == null || jsonResult.Descrtiption == "" || jsonResult.Descrtiption == undefined) {
                //$("#NoticePreviewOnView").css('width', '300px!important');
                $('#eventPreviewOnView').width(600);
                $('#eventPreviewOnView').height('auto');
                $('#lblEventDescriptionOnView').text("");
            }

            else {
                $('#eventPreviewOnView').height(200);
                $('#eventPreviewOnView').width(150);
                $('#lblEventDescriptionOnView').text(jsonResult.Descrtiption);
            }

        });
    }
}
}

function GetEventsByEventID(Events) {
    var ds = {};
    var table = {};
    var data = "{'EventsObj':" + JSON.stringify(Events) + "}";
    ds = getJsonData(data, "../AdminPanel/Events.aspx/GetEventsByEventID");
    table = JSON.parse(ds.d);
    return table;
}