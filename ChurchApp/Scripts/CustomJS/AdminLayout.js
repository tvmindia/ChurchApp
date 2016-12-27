var formatRepo = "";
var formatRepoSelection = "";
$(document).ready(function () {
      
    $(".js-data-example-ajax").select2({
        placeholder:'Select church / town..',
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
    var $eventchurchSelect = $(".js-data-example-ajax");
    $eventchurchSelect.on("change", function (e) {
        debugger;
        var churchId=$(".js-data-example-ajax").val();
        window.location.replace(window.location.protocol + "//" + window.location.host + "/AdminPanel/DashBoard.aspx?eid="+churchId);
    });
});   // end of document.ready

  