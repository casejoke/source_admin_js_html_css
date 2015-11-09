var contact = {
  init:function(){
    $(document).on('click touchstart','#send-contact-form',function(e){
      e.preventDefault();
      var data = $('#contact-form').serializeArray();  
      var url = '/send.php'
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
              $('#contact-form').find('.form-group').removeClass('has-error').find('.help-block').empty();
              if(obj['success']){
                $('.ajax-hidden').addClass('zoomOut').delay(200).queue(function(next){
                  $('.ajax-hidden').addClass('hidden')
                });
                $('.ajax-response').removeClass('hidden');
              }else{
                //обкат ошибок
                $.each(obj['error'],function(key,val){
                  console.log(obj['error'][key]);
                  if(obj['error'][key]){
                    $('#contact-form').find('#'+key).parents('.form-group').addClass('has-error');
                    $('#contact-form').find('#'+key).next().html(val);
                  }
                });
              }
            },
            error: function(xhr, ajaxOptions, thrownError) {
              console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText  + "\r\n" +xhr);
            } 
          });
    })
  }
}


/* ---------------------------------------------- /*
     * Contact form ajax
    /* ---------------------------------------------- */
/*
    $('#contact-form').submit(function(e) {

      e.preventDefault();

      var c_name = $('#c_name').val();
      var c_email = $('#c_email').val();
      var c_message = $('#c_message ').val();
      var responseMessage = $('#contact-form .ajax-response');

      if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
        responseMessage.fadeIn(500);
        responseMessage.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
      }

      else {
        $.ajax({
          type: 'POST',
          url: 'assets/php/contactForm.php',
          dataType: 'json',
          data: {
            c_email: c_email,
            c_name: c_name,
            c_message: c_message
          },
          beforeSend: function(result) {
            $('#contact-form button').empty();
            $('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
          },
          success: function(result) {
            if(result.sendstatus == 1) {
              $('#contact-form .ajax-hidden').fadeOut(500);
              responseMessage.html(result.message).fadeIn(500);
            } else {
              $('#contact-form button').empty();
              $('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
              responseMessage.html(result.message).fadeIn(1000);
            }
          }
        });
      }

      return false;

    });
*/