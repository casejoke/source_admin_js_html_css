var visual = {
	init:function(){
		this.initWaves();
		this.fixLoginpage();
		this.tableAction();
		this.activeLinkmenu();
	},
	initWaves:function(){
		Waves.attach('.btn-waves', ['waves-button', 'waves-float']);
       	Waves.init();
	},
	fixLoginpage:function(){
		if ($('body').hasClass('login-content')) {
			$('html').addClass("login-content");
		}
	},
	tableAction:function(){
		
	},
	activeLinkmenu:function(){
		$('.main-menu').find('a').each(function( index ) {
			var route = visual.getUrlvar('route');
			console.log(route);
			var link = $(this).attr('href');
			console.log(link);


			var res = link.indexOf(route+'&')
				console.log( res );
			if(res != -1){
				console.log('->>'+$(this).parents('.sub-menu').length)
				if( $(this).parents('.sub-menu').length ){
					$(this).addClass('active').parents('li').addClass('active'); 
					$(this).parents('.sub-menu').addClass('toggled')
				}else{
					$(this).parents('li').addClass('active')
				}
				return false;
			}

		});
	},
	getUrlvar:function(key){
		var value = [];
		var query = String(document.location).split('?');
		if (query[1]) {
			var part = query[1].split('&');

			for (i = 0; i < part.length; i++) {
				var data = part[i].split('=');

				if (data[0] && data[1]) {
					value[data[0]] = data[1];
				}
			}

			if (value[key]) {
				return value[key];
			} else {
				return '';
			}
		}
	}

}