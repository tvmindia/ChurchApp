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


    
});