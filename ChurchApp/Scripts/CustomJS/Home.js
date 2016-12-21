$(document).ready(function () {



    $('.btn-minimize').click(function (e) {
        e.preventDefault();
        var $target = $(this).parent().parent().next('#churchContainer');
        if ($target.is(':visible'))
            $('i', $(this)).removeClass('chevron-up').addClass('chevron-down');
        else
            $('i', $(this)).removeClass('chevron-down').addClass('chevron-up');
        $target.slideToggle(500);

    });
    $('.btn-setting').click(function(e){
     
        if ($('#IdDivChurchDisplay').is(':visible'))
        {
            $('i', $(this)).removeClass('pencil').addClass('eye-open');
            $('#IdDivChurchDisplay').hide();
            $('#IdDivChurchEdit').show();
        }
        else
        {
            $('i', $(this)).removeClass('eye-open').addClass('pencil');
            $('#IdDivChurchEdit').hide();
            $('#IdDivChurchDisplay').show();
        }
    	
    


    });
    BindDetails();

    
});

function BindDetails()
{
    debugger;
    var churchDetail = GetChurchDetailsByChurchID();
    if (churchDetail[0].ImageURL == "" && churchDetail[0].ImageURL == null)
    {
        $('.grayscale').attr('src', './img/DefaultChurch.jpg');
    }
    else
    {
        $('.grayscale').attr('src', churchDetail[0].ImageURL);
    }
    
    $('#h2ChurchName').text(churchDetail[0].ChurchName);
    $('#h2ChurchName').prepend(' ⛪ <span class="break"></span>');
    $('#h3ChurchName').text(churchDetail[0].ChurchName);
    $('#pChurchDesc').text(churchDetail[0].Description);
    $('#txtCaption').val(churchDetail[0].ChurchName);
    $('#txtDescription').val(churchDetail[0].Description);
}
function GetChurchDetailsByChurchID() {
    var ds = {};
    var table = {};
    try {
        var Church = new Object();
        var data = "{'churchObj':" + JSON.stringify(Church) + "}";
        ds = getJsonData(data, "../AdminPanel/DashBoard.aspx/GetChurchDetailsByChurchID");
        table = JSON.parse(ds.d);
    }
    catch (e) {

    }
    return table;
}