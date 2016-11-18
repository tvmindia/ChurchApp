$("document").ready(function (e) {

    var Church = new Object();
    var jsonResulsChurch = GetAllChurches(Church);
    if (jsonResulsChurch!= null) {
       
        LoadChurches(jsonResulsChurch);
          
      
    }

    
});//end of document.ready


function GetAllChurches(Church) {
    var ds = {};
    var table = {};
    try {
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetAllChurches");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}

function LoadChurches(Records) {

    $("#tbl").find(".row_1").remove();
    $.each(Records, function (index, Record) {
        var html = '<tr><td>church1</td><td class="center">2012/01/01</td><td class="center">Member</td><td class="center"><span class="label label-success">Active</span></td>								<td class="center">									<a class="circlebtn circlebtn-success" href="#">										<i class="halflings-icon white zoom-in"></i>  									</a>									<a class="circlebtn circlebtn-info" href="#">										<i class="halflings-icon white edit"></i>  									</a>									<a class="circlebtn circlebtn-danger" href="#">										<i class="halflings-icon white trash"></i></a></td></tr>';
    })

}
