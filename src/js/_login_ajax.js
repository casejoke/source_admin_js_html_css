/*
* Login and Forgotten
*/
var login = {
	body:$('body'),
	init:function(){
		this.navigationLogin();
		this.loginApp();
	},
	navigationLogin:function(){
		if ($('body').hasClass('login-content')) {
			$(document).on('click','.login-navigation > li',function(e){
				e.preventDefault();
				var z = $(this).data('block');
	            var t = $(this).closest('.lc-block');
	            
	            t.removeClass('toggled');
	            
	            setTimeout(function(){
	                $(z).addClass('toggled');
	            });
			}) 
		}
	},
	loginApp:function(){
		var _this = this;
		$(document).on('click','.btn-login',function(e){
			e.preventDefault();
			_this.ajaxLogin();
		});
	},
	ajaxLogin:function(){
		var _this = this;
		/*console.log('Пробуем пройти авторизацию');
		console.log('собираем данные');
		var data = $('#form-login').serializeArray();  
		console.log(data);
		var url = $('#form-login').attr('action')
		console.log('Отправляем сюда -->' + url);
		$.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',
            beforeSend: function() {
              
            },  
            complete: function() {
                
            },
            success: function(obj) {
              console.log(obj);
              //очишаем все help-block
              $('#form-login').find('.input-group').removeClass('has-error').find('.help-block').empty();

              if(obj['success']){
                window.location.replace(obj['redirect']);
              }else{
                //обкат ошибок
                if(obj['error']['warning']){
                  	$('#form-login-warning').removeClass('hidden').find('.alert').html(obj['error']['warning']);
                  }	
                $.each(obj['error'],function(key,val){
                  console.log(obj['error'][key]);
                  if(obj['error'][key]){
                    $('#form-login').find('#'+key).closest('.input-group').addClass('has-error');
                    $('#form-login').find('#'+key).closest('.fg-line').next().html(val);
                  }

                });
              }
            },
            error: function(xhr, ajaxOptions, thrownError) {
              console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText  + "\r\n" +xhr);
            } 
          });
	}
}