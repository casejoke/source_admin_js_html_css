var social = {
  init:function(){
    $(document).on('click',".social-btn",function(e){
      e.preventDefault();
      var networkName = $(this).attr('data-network');
      social.share(networkName);
    });
  },
  share:function(network){
    var website = "http://uchebnik.mos.ru/";
    if ( network == "vk") {
      window.open(
        'http://vk.com/share.php?url='+website+'&n='+Math.random()+'&title=Электронные учебники: а вы ЗА или ПРОТИВ?',  
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=480, toolbar=0, status=0'
      );
      yaCounter30094439.reachGoal('share_vk');
    } 
    if ( network == "facebook" ) {
      window.open(
        'http://www.facebook.com/sharer.php?&u='+website+'&n='+Math.random()+'&t=Узнайте все об электронных учебниках!', 
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0'
      );
      yaCounter30094439.reachGoal('share_fb');
    }
    if ( network == "twitter") {
      window.open(
        'http://twitter.com/share?url='+website+'&n='+Math.random()+'&text=Узнайте все об электронных учебниках!',  
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0'
      );
      yaCounter30094439.reachGoal('share_twitter');
    }
    if ( network == "ok") {
      window.open(
        'http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl='+website+'&n='+Math.random()+'&st.comments=Узнайте все об электронных учебниках!',  
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=600, height=480, toolbar=0, status=0'
      );
      yaCounter30094439.reachGoal('share_ok');
    } 
  }
}