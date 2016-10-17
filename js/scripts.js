$(document).ready(function(){

  $(".choices").on('click', 'option', function(){
    debugger;
    alert($(this));
    //initial variances
    var $section = $('.heapbox').val();
    var $list = $('ul');
    var $loading = $('.loading');
    var articleMarkup = "";
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+$section+'.json';
    url += '?' + $.param({
      'api-key': "9e4fe1eccf0e402f8c2bfb960908748e"
    });

    //reset & load
    $('ul').empty();
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
      $('.logo img').css('height','110px');
      $('header').animateAuto('height', 600);
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
        articleMarkup += '<li><a href=' + $link + ' target="_blank">';
        articleMarkup += '<figure style="background-image: url('+ $image +')">';
        articleMarkup += '<figcaption><p>' + $caption + '</p></figcaption>';
        articleMarkup += '</figure></a></li>';
        $list.append(articleMarkup);
        $('ul').css('height','auto');
      });
    })

    //fail
    .fail(function() {
      $loading.hide();
      $('.articles').append('<p class="error">Error!</p>');
    });
  });

});
