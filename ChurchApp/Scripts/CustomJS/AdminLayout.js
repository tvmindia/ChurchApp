var formatRepo = "";
var formatRepoSelection = "";
$(document).ready(function () {
    debugger;
    try {
        if ($("#churchSelect").is(":visible") == true) {
            GetParamValue();
            $(".ddlChurch").select2({
                placeholder: 'Select church / town..',
                allowClear: true,
                ajax: {
                    url: "../AdminPanel/DashBoard.aspx/GetAllChurch",
                    dataType: 'json',
                    type: "post",
                    contentType: "application/json",
                    async: false,
                    delay: 250,
                    data: function (params) {
                        {
                            var Church = new Object();
                            Church.SearchTerm = params.term;
                            return "{'churchObj':" + JSON.stringify(Church) + "}";

                        };
                    },
                    processResults: function (data, params) {
                        // parse the results into the format expected by Select2
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data, except to indicate that infinite
                        // scrolling can be used
                        params.page = params.page || 1;

                        return {
                            results: JSON.parse(data.d),
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                //escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                //minimumInputLength: 1,
                //templateResult: formatRepo, // omitted for brevity, see the source of this page
                //templateSelection: FormatResults // omitted for brevity, see the source of this page
            });
            var $eventchurchSelect = $("#churchSelect");
            $eventchurchSelect.on("change", function (e) {
                debugger;
                var churchId = $("#churchSelect").val();
                if ((churchId != "") && (churchId != null)) {
                    window.location.replace(location.pathname.slice(0, location.pathname.lastIndexOf("/")) + "/DashBoard.aspx?eid=" + churchId);
                }
            });
        }
            BindNotification();
        
    }
    catch(e)
    {

    }
    
});   // end of document.ready

function GetReviews() {

    var ds = {};
    var table = {};
    var Church = new Object();
    var data = "{'churchObj':" + JSON.stringify(Church) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetRequestChurchDetails");
    table = JSON.parse(ds.d);
    return table;
}
function BindNotification() {
    debugger;
    if ($('#NotiDropdown').is(":visible"))
    {
        $('#NotifyArea').find('li').remove();
        var Reviews = {};
        ReviewsCount = GetReviews();
        Reviews = GetReviewCountforBubble();

        $.each(Reviews, function (index, Records) {
            debugger;
            if (Records.Status == 0) {
                MultiReviewBind(Records, index, ReviewsCount[index].RDate);
            }

        })
        return false;
    }
    

}
function GetReviewCountforBubble() {

    var ds = {};
    var table = {};
    var Church = new Object();
    var data = "{'churchObj':" + JSON.stringify(Church) + "}";
    ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetRequestChurchDetails");
    table = JSON.parse(ds.d);
    return table;
}
function Redirect()
{
    window.location.href = "../AdminPanel/DashBoard.aspx?id=Request";
}
function GetParamValue() {
    debugger;
    var location = window.location;
    var query = window.location.search.substring(1);
    if(query!="")
    {
        $('#churchReqchevronup').click();
        window.history.pushState("", "", location.pathname);
    }
    else
    {
        return true;
    }

}
j = 0;
function MultiReviewBind(Records, i, Date) {
    try
    {
        debugger;
        j = j + 1;
        var spancount = document.getElementById("countspan");
        spancount.innerHTML = j;
        var ul = document.getElementById("NotifyArea");
        var li = document.createElement("li");
        var ali = document.createElement("a");
        ali.setAttribute("onclick", "Redirect()")
        li.setAttribute("id", Records.UserName);
        var Spanform = document.createElement('span');
        Spanform.className = "icon-comment-alt";
        var ic = document.createElement("i");

        ic.className = "icon-user";
        Spanform.appendChild(ic);
        var SpanMsg = document.createElement('span');
        SpanMsg.className = "message";
        SpanMsg.innerHTML = ' '+Records.UserName + ' Requested for Adding ' + Records.ChurchName;
        var Spantime = document.createElement('span');
        Spantime.className = "time";
        Spantime.innerHTML = "\t &nbsp;&nbsp;&nbsp;" + ConvertJsonToDat(Records.CreatedDate);
        ali.appendChild(Spanform);
        ali.appendChild(SpanMsg);
        ali.appendChild(Spantime);
        li.appendChild(ali);
        ul.appendChild(li);
    }
    catch(e)
    {

    }

}
function ConvertJsonToDat(jsonDate) {
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
        var result = day + '-' + monthNames[month];
        return result;
    }
}