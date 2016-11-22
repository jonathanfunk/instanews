$(document).ready(function(){

  //heapbox
  $('.choices').heapbox({
    showFirst: false,
    onChange: searchNYT
  });
  function searchNYT(){

    //initial variances
    var $section = $('select').val();
    var $list = $('.grid');
    var $loading = $('.loading');
    var articleMarkup = "";
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+$section+'.json';
    url += '?' + $.param({
      'api-key': "9e4fe1eccf0e402f8c2bfb960908748e"
    });

    //reset & load
    $('.logo img').css('height','110px');
    $('header').animateAuto('height', 200);
    $('.grid').css('height','0').empty();
    $('.error').remove();
    $loading.show();

    //call ajax
    $.ajax({
      url: url,
      method: 'GET',
    })

    //done
    .done(function(data) {
      $loading.hide();
      var $data = data.results.filter(function(item) {
        return item.multimedia.length;
      }).splice(0, 12);

      //each
      $.each($data, function(item, value){

        //variances & markups
        var articleMarkup = '';
        var $link = value.url;
        var $caption = value.abstract;
        var $image = value.multimedia[4].url;
        $('.grid').delay(200).animateAuto('height');
        articleMarkup += '<li><a href=' + $link + ' target="_blank">';
        articleMarkup += '<figure style="background-image: url('+ $image +')">';
        articleMarkup += '<figcaption><p>' + $caption + '</p></figcaption>';
        articleMarkup += '</figure></a></li>';
        $list.append(articleMarkup);
      });
    })

    //fail
    .fail(function() {
      $loading.hide();
      $('.articles').append('<p class="error">Error!</p>');
    });
  };
});
