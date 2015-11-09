var $content_wrapper = $('.main-content'),
    $body = $('body'),
    $menutoggle = $('.navbar-toggle'),
    $sidebar  = $('.sidebar'),
    $header = $('.header');
var visual = {
  init:function(){
     /* ---------------------------------------------- /*
     * WOW Animation When You Scroll
    /* ---------------------------------------------- */

    wow = new WOW({
      mobile: false
    });
    wow.init();
   
  
    $("#owl").owlCarousel({
      items : 3, //10 items above 1000px browser width
      itemsDesktop : [1000,3], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,2], // betweem 900px and 601px
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1],
      autoPlay : true,
      stopOnHover : true,
      pagination : false,
      paginationNumbers: false,
    });
   
    $('#owl-second').owlCarousel({
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
    });
    $('#gallery-owl').owlCarousel({
      items : 3, //10 items above 1000px browser width
      itemsDesktop : [1000,3], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,2], // betweem 900px and 601px
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1],
      pagination : false,
      paginationNumbers: false,
      lazyLoad : true,
      afterLazyLoad : function(e){
        contest.afterLazyLoad(e);
      }
    });
    
    visual.navigationOwl();
  },
  navigationOwl:function(){
    $(document).on('click','.prev_owl',function(e){
      e.preventDefault();
       $("#owl").trigger('owl.prev');
    });
    $(document).on('click','.next_owl',function(e){
      e.preventDefault();
       $("#owl").trigger('owl.next');
    });

    $(document).on('click','.gprev_owl',function(e){
      e.preventDefault();
       $("#gallery-owl").trigger('owl.prev');
    });
    $(document).on('click','.gnext_owl',function(e){
      e.preventDefault();
      $("#gallery-owl").trigger('owl.next');
    });
  },
  sidebarClose:function(){
    $menutoggle.addClass('collapsed');
    $content_wrapper.removeClass('menu-is-open'); 
    $sidebar.removeClass('menu-is-open');
    $header.removeClass('menu-is-open');
    $body.removeClass('overflow-hidden');
  },
  sidebarOpen:function(){
    $menutoggle.removeClass('collapsed');
    $content_wrapper.addClass('menu-is-open'); 
    $sidebar.addClass('menu-is-open');
    $header.addClass('menu-is-open');
    $body.addClass('overflow-hidden');
     
  },
  navtoggle:function(){
     /* ---------------------------------------------- /*
     * Initialize delegate touch
    /* ---------------------------------------------- */
    moved = false; //flags if the finger has moved
    startX = 0; //starting x coordinate
    startY = 0; //starting y coordinate
    download = false;
    if(Modernizr.touch){
      var classname = document.getElementsByClassName("navbar-toggle");
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
            if (!moved) {
              if( $(this).hasClass('collapsed') ){
                visual.sidebarOpen();
                yaCounter30094439.reachGoal('knopkaMenu');//открытие меню
              }else{
                visual.sidebarClose();
              }
                console.log('tap!'); 
            }
          }, false);
      }
    }else{
      $(document).on('click ','.navbar-toggle',function(e){
        e.preventDefault();

        if( $(this).hasClass('collapsed') ){
          visual.sidebarOpen();
          yaCounter30094439.reachGoal('knopkaMenu');//открытие меню
        }else{
          visual.sidebarClose();
        }
      });
    }
  },
  preloader:function(){
    /* ---------------------------------------------- /*
     * Preloader
    /* ---------------------------------------------- */
    $('#preloader').delay(350).fadeOut( "slow", function() {

        if(_isset_share){
          $('html, body').stop().animate({
            scrollTop: $('#contest_social').offset().top
          }, 1000,function(){
            window.location.hash = '#contest'.substr(1)
          });
        } else{
          visual.showbanner();
        }
        
    });
    
  },
  showbanner:function(){
    $('#modalBanner').modal({
      keyboard: false,
      backdrop: 'static'
    })

  },
  otheraction:function(){
    $(document).on('click','#goto-contest',function(){
      $('#modalBanner').modal('hide');
      $('html, body').stop().animate({
            scrollTop: $('#contest').offset().top
          }, 1000,function(){
            window.location.hash = '#contest'.substr(1)
          });
    });
  },
  scrollingInit:function(){
    /* ---------------------------------------------- /*
     * Animated scrolling / Scroll Up
    /* ---------------------------------------------- */
    $('a[href*=#]').bind("click", function(e){
      e.preventDefault();
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 1000,function(){
        window.location.hash = anchor.attr('href').substr(1)
      });
      visual.sidebarClose();
    });

  },
  scroll_up:function(){
    var s = $("body").scrollTop();
    if (s > 100) {
      $('.scroll-up').fadeIn();
    } else {
      $('.scroll-up').fadeOut();
    }
  },
  gotoHash:function(hash){
    $('html, body').stop().animate({
        scrollTop: $(hash).offset().top
    }, 1000,function(){
      window.location.hash = hash.substr(1)
    });
  },
  resize:function(){
    /* ---------------------------------------------- /*
     * Background image.
    /* ---------------------------------------------- */
    var _height_window = $( window ).height();
    console.log($( window ).height());
    if (_height_window < 600){
      $(".js-height-full").height(600);
    }else{
      $(".js-height-full").height(_height_window);
    }


    if(_height_window < 600){
      $('.imac').css({'bottom':'-370px'})
    }else if (_height_window <= 870 && _height_window >= 600 ){
      var _diff_ = _height_window-970
      $('.imac').css({'bottom':_diff_+'px'});
    }else{
      $('.imac').css({'bottom':'-50px'})
    }
  }
}