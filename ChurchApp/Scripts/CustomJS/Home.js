$(document).ready(function () {
    $('.btn-setting').click(function(e){
     
        if ($('#IdDivChurchDisplay').is(':visible'))
        {
           // alert("visible");
            $('#IdDivChurchDisplay').hide();
            $('#IdDivChurchEdit').show();
        }
        else
        {
           // alert("not visi");
            $('#IdDivChurchEdit').hide();
            $('#IdDivChurchDisplay').show();

        }
    	
      //  $('#IdDivChurchDisplay').hide();
      //  $('#IdDivChurchEdit').show();


    });


    
});