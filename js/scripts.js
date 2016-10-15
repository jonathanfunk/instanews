$(document).ready(function(){
  $('select').on('change',function(){
    var curHeight = $('header').height();
    $('header').css('height', 'auto');
    var autoHeight = $('header').height();
    var el = $('#first'),
    curHeight = el.height(),
    autoHeight = el.css('height', 'auto').height();
    el.height(curHeight).animate({height: autoHeight}, 1000);
    //$('header').height(curHeight).animate({height: autoHeight}, 1000);

    $('.articles').slideUp('slow');
  });
});
