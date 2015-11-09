var _debug = true;
var $portfolio_items = $('.portfolio-items-container');
var $portfolio_item = $(document).find('.simple-ajax-popup'); //$('.portfolio-item');
var _item = '.portfolio-item'; 
var moved, startX, startY,download;
var portfolio = {
  getItem:function(block_url,_this){
    $.ajax({ 
            url: block_url, 
            method: 'GET',
            cache: false,
            //url: 'data/bird.json',
            //dataType: 'json',
            beforeSend:function(){
              /*==========  1 добавляем класс загрузки для выбранного item ==========*/
              $(document).find('.portfolio-item').addClass('portfolio-item--loading');
              /*==========  2 добавляем класс загрузки для выбранного item ==========*/
              _this.parents('.portfolio-item').addClass('portfolio-item--loading');

              console.log('beforeSend');
              download = true;
            },
            complete:function(){
            // _this.parents('.portfolio-item').removeClass('portfolio-item--loading')
              console.log('complete');
            },
            success: function(html) {
                  _this.parents('.portfolio-item').find('.progress-bar').css({'width':'10%'})
                  i = 10; 
                  $(".work-detail").empty().append(html);
           


                  $(".work-detail").imagesLoaded( function() {
                  
                  }).always( function( instance ) {
                    console.log('all images loaded');

                  }).progress( function( instance, image ) {
                    var pie = parseInt( 90/instance.images.length);
                    i = i+pie;
                    console.log(i);
                    _this.parents('.portfolio-item').find('.progress-bar').css({'width':i+'%'})
                    //console.log( instance.images.length);

                    var result = image.isLoaded ? 'loaded' : 'broken';
                   // console.log( 'image is ' + result + ' for ' + image.img.src );
                  }).done( function( instance ) {
                    console.log('all images successfully loaded');
                    _this.parents('.portfolio-item').find('.progress-bar').css({'width':'100%'})
                    download = false;
                    $("#portfolio").toggleClass("detail-open").find('.work-detail').toggleClass("zoomIn");
                    $("body").toggleClass("modal-open");
                  });
            },

            progress: function(e) {
                console.log('progress');
                if(e.lengthComputable) {
                    var pct = (e.loaded / e.total) * 100;
                    console.log(pct.toPrecision(3));
                  /*  $('#prog')
                        .progressbar('option', 'value', pct)
                        .children('.ui-progressbar-value')
                        .html(pct.toPrecision(3) + '%')
                        .css('display', 'block');*/
                } else {
                    console.warn('Content Length not reported!');
                }
            }
          });
  },
  init:function() {
    /* ---------------------------------------------- /*
     * Initialize isotope plugin
    /* ---------------------------------------------- */
    var $container = $portfolio_items.imagesLoaded( function() {
        $container.isotope({
          itemSelector: _item
        });
    }); 
    $('#filter li').on('click', function (e) {
      e.preventDefault();

      $('#filter li').removeClass('active');
      $(this).addClass('active');

      group = $(this).attr('data-group');
      var groupName = $(this).attr('data-group');
      console.log(groupName);
      if(groupName == 'all'){
        $container.isotope({ filter: '*'});
      }else{
        $container.isotope({ filter: '.'+groupName });
      }
      
    });
     /* ---------------------------------------------- /*
     * Initialize delegate touch
    /* ---------------------------------------------- */
    moved = false; //flags if the finger has moved
    startX = 0; //starting x coordinate
    startY = 0; //starting y coordinate
    download = false;
    if(Modernizr.touch){

      var classname = document.getElementsByClassName("simple-ajax-popup");
      console.log(classname.length);
      for(var i=0;i<classname.length;i++){
          classname[i].addEventListener('touchstart', function(e) {
            console.log('touchstart');
            moved = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          }, false);
          classname[i].addEventListener('touchmove', function(e) {
            console.log('ontouchmove');
            if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) {
                moved = true;
            }
          }, false);
          classname[i].addEventListener('touchcancel', function(e) {
            //reset variables
            console.log('touchcancel');
            moved = false;
            startX = 0;
            startY = 0;
          }, false);
          classname[i].addEventListener('touchend', function(e) {
            console.log('ontouchend');
            e.preventDefault();
            if (!moved && !download) {
                var block_url = $(this).data('href'); 
                var _this = $(this);
                console.log(block_url);
                portfolio.getItem(block_url,_this); 
                console.log('tap!'); 
                console.log('tap simple-ajax-popup');
            }
          }, false);
      }



      


    }else{
      $(document).on('click ','.simple-ajax-popup',function(e){
        e.preventDefault();
        
        if (!download) {
          var block_url = $(this).data('href'); 
          var _this = $(this);
          console.log(block_url);
          console.log('click simple-ajax-popup');
          portfolio.getItem(block_url,_this); 
        }
      });
    }
    


    $(document).on('click touchstart','.close',function(e){
      e.preventDefault();
      $("#portfolio").toggleClass("detail-open");
      $("body").toggleClass("modal-open");

    });
    /*
      // work section

      $('.thumbnails a').click(function() {
        $("#work").toggleClass("detail-open");
        $("body").toggleClass("modal-open");
        return false;
      });

      $('.nav-toggle').click(function() {
        $("nav").slideToggle();
        return false;
      });


      $("#work .thumbnails a").click(function() {
          $(".work-detail").empty().append("<div id='loading'></div>");
          $.ajax({ url: this.href, success: function(html) {
              $(".work-detail").empty().append(html);
              }
      });
      return false;
      });





    $('.simple-ajax-popup').magnificPopup({
      type: 'ajax',
      callbacks: {
        parseAjax: function(mfpResponse) {
         // $.getScript('assets/js/jquery.fitvids.js');
         // $.getScript('assets/js/custom-portfolio.js');
        },
      }
    }); */
  }
}