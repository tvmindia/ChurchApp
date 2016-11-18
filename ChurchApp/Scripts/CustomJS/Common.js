//function EmailValidation(this_Obj) {
//    debugger;
//    var value;
//    try {
//        if (this_Obj.value != "") {

//            var Email = this_Obj.value;
//        }
        
       
//        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//        if (emailReg.test(Email)) {
//            var txtA = document.getElementById(this_Obj.id);
//            txtB.style.backgroundImage = "url(' ')";
//            txtA.style.style.backgroundColor = "white!important";
            
//        }
//        else {
//            var txtB = document.getElementById(this_Obj.id);
//            txtB.style.backgroundImage = "url('../img/invalid.png')";
//            txtB.style.backgroundPosition = "95% center";
//            txtB.style.backgroundRepeat = "no-repeat";

//        }
//    }
//    catch (e) {
//        var ExceptionTrack = new Object();
//        ExceptionTrack.Description = e.message;
//        ExceptionTrack.Module = "People";
//        ExceptionTrack.Method = "EmailValidation";
//        ExceptionTrack.ErrorSource = "JavaScript";
//        ExceptionTrack.IsMobile = false;
//        //InsertException(ExceptionTrack);
//    }
//    //return false;
//}

function postBlobAjax(formData, page) {
    //var request = new XMLHttpRequest();
    //request.open("POST", page);
    //request.send(formData);
    var jsonResult = {};
    $.ajax({
        type: "POST",
        url: page,
        contentType: false,
        headers: { 'Cache-Control': 'no-cache' },
        async: false,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        traditional: true,

        success: function (data) {
            jsonResult = data;
        },
        processData: false,

        error: function () {
            alert("Whoops something went wrong!");
        }
    });
    return jsonResult;
}



function getJsonData(data, page) {
    
    var jsonResult = {};
    // $("#loadingimage").show();
    var req = $.ajax({
        type: "post",
        url: page,
        data: data,
        delay: 3,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"

    }).done(function (data) {

        //     $("#loadingimage").hide();
        jsonResult = data;
    });
    return jsonResult;
}

function ConvertJsonToDate(jsonDate) {
    if (jsonDate != null) {
        var dateString = jsonDate.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth();
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var monthNames = [
                      "Jan", "Feb", "Mar",
                      "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct",
                      "Nov", "Dec"
        ];
        var result = day + '-' + monthNames[month] + '-' + year;
        return result;
    }
}


