$(document).ready(function() {
  visual.init();
  visual.navtoggle();
  visual.resize(); 
  action.init();
  contest.init();
  visual.otheraction();
});
$(window).on('resize', function(){
  visual.resize();
});
$(window).on('load', function(){
  visual.resize(); 
  visual.preloader();
  visual.scrollingInit();
  action.nav();
});
$(window).on('scroll', function(){
  visual.scroll_up();
  action.nav();
});
