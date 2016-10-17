$(document).ready(function(){

  $('select').on('change',function(){
    var $section = $('select').val();
    var $list = $('ul');
    var $loading = $('.loading');
    var articleMarkup = "";
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+$section+'.json';
    url += '?' + $.param({
      'api-key': "9e4fe1eccf0e402f8c2bfb960908748e"
    });
    $('ul, p').empty();
    $loading.show();
    $.ajax({
      url: url,
      method: 'GET',
    })

    .done(function(data) {
      var $data = data.results.filter(function(item) {
        return item.multimedia.length;
      }).splice(0, 12);
      $loading.hide();
      $('.logo img').css('height','110px');
      $('header').animateAuto('height', 600);

      $.each($data, function(item, value){
        var articleMarkup = '';
        var $link = value.url;
        var $caption = value.abstract;
        var $image = value.multimedia[4].url;
        articleMarkup += '<li><a href=' + $link + '>';
        articleMarkup += '<div class="headline" style="background-image: url('+ $image +')">';
        articleMarkup += '<div class="story"><p>' + $caption + '</p></div>';
        articleMarkup += '</div></a></li>';
        $list.append(articleMarkup);
        $('ul').css('height','auto');
      });
    })
    .fail(function() {
      $loading.hide();
      $('.articles').append('<p>Error!</p>');
    });
  });



});

//To be used later
//$('.headline').on('mouseenter', function(){
//$('.story').css('height','160px');
//});
