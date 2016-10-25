$(function(){

  //heapbox
  $('.choices').heapbox({
    showFirst: false,
    onChange: searchNYT
  });
  function searchNYT(){

    //initial letiances
    let $section = $('select').val();
    let $list = $('.grid');
    let $loading = $('.loading');
    let articleMarkup = "";
    let url = 'https://api.nytimes.com/svc/topstories/v2/' + $section + '.json';
    url += '?' + $.param({
      'api-key': "9e4fe1eccf0e402f8c2bfb960908748e"
    });

    //reset & load
    $('.grid').empty();
    $('.error').remove();
    $loading.show();

    //call ajax
    $.ajax({
      url: url,
      method: 'GET',
    })

    //done
    .done((data)=> {
      $loading.hide();
      $('.logo img').css('height','110px');
      $('header').animateAuto('height', 600);
      let $data = data.results.filter((item)=> {
        return item.multimedia.length;
      }).splice(0, 12);

      //each
      $.each($data, function(item, value){

        //letiances & markups
        let articleMarkup = '';
        let $link = value.url;
        let $caption = value.abstract;
        let $image = value.multimedia[4].url;
        articleMarkup += `<li><a href=${$link} target="_blank">`;
        articleMarkup += `<figure style="background-image: url(${$image})">`;
        articleMarkup += `<figcaption><p>${$caption}</p></figcaption>`;
        articleMarkup += `</figure></a></li>`;
        $list.append(articleMarkup);
        $('.grid').css('height','auto');
      });
    })

    //fail
    .fail(()=> {
      $loading.hide();
      $('.articles').append(`<p class="error">Error!</p>`);
    });
  };
});
