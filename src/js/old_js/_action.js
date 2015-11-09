var action = {
	init:function(){
		$(document).on('click',"#poll_yes",function(e){
			e.preventDefault();
			action.poll();
		    yaCounter30094439.reachGoal('opros_da');//оopros_da
		});
		$(document).on('click',"#poll_no",function(e){
			e.preventDefault();
			action.poll();
			yaCounter30094439.reachGoal('opros_net');//оopros_da
		});
	},
	poll:function(){
		$('#poll_btns').addClass('hidden');
		$('#result_poll').removeClass('hidden')
		setTimeout(function(){
			$('#progress_yes').css({'width':'77%'});
			$('#progress_no').css({'width':'23%'});
		}, 300);
	},
	nav:function(){
		var items = $('.nav li'),
			anchors = [],
			pos = -1,
			scroll = $(window).scrollTop();

		items.each(function(){
			var id = $('a', this).attr('href').split('#')[1];
			if ($('#'+id).length) {
				anchors.push($('#'+id));
			}
		});

		for (var i=0;i<anchors.length;i++) {
			if (anchors[i].offset().top < $(window).scrollTop() + $(window).height()/4 ) {
				pos = i;
			}
		}

		if (pos != -1) {
			items.removeClass('active').eq(pos).addClass('active');
		} 
		else {
			items.removeClass('active');
		}
	},
	share:function(network){
    var website = window.location.href;
    if ( network == "vk") {
      window.open(
        'http://vk.com/share.php?url='+website+'&title=Вот почему мне нравится электронный учебник!',  
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=480, toolbar=0, status=0'
      );
    } 
    if ( network == "facebook" ) {
      window.open(
        'http://www.facebook.com/sharer.php?&u='+website+'&t=Вот почему мне нравится электронный учебник!', 
        '_blank', 
        'scrollbars=0, resizable=1, menubar=0, left=200, top=200, width=550, height=440, toolbar=0, status=0'
      );
    }
  },
  restrictChars:function (textfield, reg){	

  		var strIn = textfield.val();
  		if(reg.test(strIn)) {
				//strIn =  strIn.replace(reg,"");				 
			}
  		strIn = strIn.replace("  "," ");
			strIn = strIn.replace("--","-");
			strIn = strIn.replace("..",".");
			strIn = strIn.replace("<","");
			strIn = strIn.replace(">","");
			return strIn
			

	},
  getLike:function(){
    $.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + pageuri + '&format=json&callback=?');
    action.fetchLikeCount($url.val()).always(function(res){
      $res.text(res);
    });
  },
  fetchLikeCount:function(url){
    return $.Deferred(function(defer){
        $.ajax({
            dataType: 'jsonp',
            url: 'https://api.facebook.com/method/fql.query?callback=callback',
            data: {
                query: 'SELECT like_count FROM link_stat WHERE url="' + url + '"',
                format: 'JSON'
            }
        }).then(function(res){
            try{
                var count = res[0].like_count;
                defer.resolve(count);
            }catch(e){
                reject();
            }
        }, reject);
        function reject(){
            defer.reject(';(');
        };
    }).promise();
  }
}