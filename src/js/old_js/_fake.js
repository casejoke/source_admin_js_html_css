
    $(document).on('keyup','#fun-control',function(e){

      var getIn = action.restrictChars($(this),signs);
      $(this).val(getIn);
      $('.fun-canvas').html(getIn);

    });
    

    
    $(document).on('keyup','#inputName',function(){

      var getIn = action.restrictChars($(this),chars);
      $(this).val(getIn);
      $('.name-user').html(getIn);
    });
    $(document).on('keyup','#inputClass',function(){
      var getIn = action.restrictChars($(this),signs);
      $('.class-num-user').html(getIn);
    });
    $(document).on('keyup ','#inputSchool',function(){
      var getIn = action.restrictChars($(this),signs);
      $('.school-num-user').html(getIn);
    });


    $('#canvas-owl').owlCarousel({
      singleItem:true,
      pagination : false,
      paginationNumbers: false,
    });
    $(document).on('click','.chprev_owl',function(e){
      e.preventDefault();
       $("#canvas-owl").trigger('owl.prev');
    });
    $(document).on('click','.chnext_owl',function(e){
      e.preventDefault();
      $("#canvas-owl").trigger('owl.next');
    });

    
    

    $(document).on('click','#im-ready',function(e){
      e.preventDefault();
      var website = window.location.href;
      console.log(website);
      html2canvas(document.getElementById('canvas'), {
        onrendered: function(canvas) {
          var cand = document.getElementById('outcanvas');
          if(cand[0] === undefined || cand[0] === null){ 
          }else{ 
            //document.body.removeChild(cand[0]);
          }
        
          cand.appendChild(canvas);
        
          var cand = document.getElementsByTagName('canvas');
          var canvasData = cand[0].toDataURL("image/jpeg");


          var ajax = new XMLHttpRequest();
          var n = $('#inputName').val();
          var c = $('#inputClass').val();
          var s = $('#inputSchool').val();
          var d = $('#fun-control').val()
          var url = _url_server+'?n='+n+'&c='+c+'&s='+s+'&d='+d;
          ajax.open("POST",url,false);
          ajax.setRequestHeader('Content-Type', 'application/upload');
          ajax.send(canvasData);

          if (ajax.status != 200) {
              // обработать ошибку
              console.log( ajax.status + ': ' + ajax.statusText ); // пример вывода: 404: Not Found
          } else {
              // вывести результат
              // responseText -- текст ответа.
              console.log(_url_server+'?u='+ajax.responseText+'#contest');
              window.location.replace(_url_server+'?u='+ajax.responseText+'#contest');

          }
        },
        background:'#FF0000'


      });

    });