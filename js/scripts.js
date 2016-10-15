$(document).ready(function(){

  $('select').on('change',function(){
    $('.logo img').css('height','110px');
    $('header, .articles').animateAuto('height', 500);
    $('header').height('auto');
  });

});
