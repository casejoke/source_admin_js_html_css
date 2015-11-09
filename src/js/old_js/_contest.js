
var chars = /[^А-Яа-яA-Za-z ]/gi;
var signs = /[^0-9А-Яа-яA-Za-z- ]/gi;
var canvas;
var context;
var poster;
var userMessage;
var inputName;
var inputClass;
var inputSchool;
// урлы на постеры
var posters_urls = ["post-1.png", "post-2.png", "post-3.png", "post-4.png"];    
// массив с объектом постра
var posters = [];
var loaded_count = 0;
var currentPoster = {index:0, poster: undefined};

var contest = {
  init:function(){
    contest.actionBtn();
      String.prototype.reverse = function () {
        return this.split('').reverse().join('');
      };
      canvas = document.getElementById("canvasEditor");
      context = canvas.getContext("2d");
      userMessage = document.getElementById("fun-control");
      inputName = document.getElementById("inputName");
      inputClass = document.getElementById("inputClass");
      inputSchool = document.getElementById("inputSchool");
      
      for ( var i = 0; i < posters_urls.length; i ++ ) {
        posters.push( new contest.Poster(posters_urls[i], contest.posterLoaded) );
      }
      contest.arrowUpdater();
      document.body.onkeyup = function(){
        contest.updateCanvas();
      }
  },
  afterLazyLoad:function(event){
    console.log('-- lazy --');
    console.log(event.item);
  },
  posterLoaded:function (event){
      loaded_count++;
       
      if ( loaded_count == posters_urls.length ) {
        currentPoster.index = 0;
        currentPoster.poster = posters[0];
        
        contest.updateCanvas();
      }
  },
  drawPoster:function(){
      context.clearRect(0,0,canvas.width,canvas.height);            
      context.drawImage( currentPoster.poster , 0, 0);
  },
  drawText:function(text, x, y, size, font, color, align) {     
      
      context.fillStyle = color;      
      context.textAlign=align;
      context.font = size + "px " + font;     
      
      var lineWidth = context.measureText(text).width;
      var maxWidth = currentPoster.poster.width - 40;
      if ( lineWidth > maxWidth ) {
        text = contest.charslicer(text, " ", maxWidth);
      }
      var lineHeight = context.measureText("W").width * 1.3;
      var lines = text.split("\n");
      y -= lines.length * 7;
      for (var i = 0; i < lines.length; ++i) {
        context.fillText(lines[i], x, y);
        y += lineHeight;        
      }
  },
  charslicer:function(text, template, maxWidth){
      var s, k, n, m=[];
      s=text;
      k=0;
      n=0;
      while(k>=0){
      k=s.indexOf(" ", n);//даст минус когда дойдем до конца строки
      m.push(s.slice(n, (k<0?s.length:k)));
      n=k+1;//продергиваем пробел
      };
      var chars = m;
      var accumulatedWidth = 0;
      for  ( var i=0; i< chars.length; i++ ){
           
          var currentWordWidth = Math.round(context.measureText(chars[i] + " ").width);
          accumulatedWidth += currentWordWidth;
          
          if ( accumulatedWidth > maxWidth ) {
            accumulatedWidth = 0;
            chars[i] = "\n" + chars[i];
            console.log(accumulatedWidth + ":" +chars[i] );
          } else {
            console.log(accumulatedWidth + ":" +chars[i]);
          }
          
      }
       
      return chars.join(" ");
  },
  Poster:function (url, loaded){
      var content = new Image();
      content.onload = function(){
        loaded(content);
      }
      content.src = url;
      return content;
  },
  swipeLeft:function(){
      currentPoster.index--;
      if ( currentPoster.index < 0 ) {
        currentPoster.index = 0;
      }
      contest.indexUpdated();
  },
  swipeRight:function(){
      currentPoster.index++;
      

      if ( currentPoster.index > loaded_count-1 ) {
        currentPoster.index = loaded_count-1;

      }
      contest.indexUpdated();
  },
  arrowUpdater:function(){
    if ( currentPoster.index == loaded_count-1 ) {
      $('.chprev_owl').removeClass('hidden')
      $('.chnext_owl').addClass('hidden')
    }else if (currentPoster.index == 0){
      $('.chnext_owl').removeClass('hidden');
      $('.chprev_owl').addClass('hidden');
    }else{
      $('.chnext_owl').removeClass('hidden');
      $('.chprev_owl').removeClass('hidden');
    }
  },
  indexUpdated:function(){    
      currentPoster.poster = posters[currentPoster.index];
      contest.updateCanvas();
      contest.arrowUpdater();
      
  },
  updateCanvas:function(){
      var fontFamily = "Myriad Pro";
      //Льем фон
      contest.drawPoster();
      
      // рисуем сообщение
      contest.drawText(userMessage.value, canvas.width/2, 110, 20, fontFamily, "#fb6051", "center");
        
      // собираем строки с данными школьника
      // рисуем ФИО
      contest.drawText(inputName.value+',', 80, 260, 12, fontFamily, "#6ad9c7", "left");
      // Береим ширину последней надписи
      var textfieldWidth = context.measureText(inputName.value).width;
      // Лепим после нее нашу подпись
      var signature = "  {X} класс, школа {Y}";
      signature = signature.replace("{X}", inputClass.value);
      signature = signature.replace("{Y}", inputSchool.value);
      contest.drawText(signature, 80 + textfieldWidth, 260, 12, fontFamily, "#000000", "left");
  },
  actionBtn:function(){
    //переход на конструктор
    $(document).on('click','#participate',function(){
      //добавим класс hidden
      $('.step-1').addClass('hidden');
      $('.intro-text').css({'color':'#FFFFFF'});
      $('.step-2').removeClass('hidden');
      visual.gotoHash('#contest');
    });
    // шаринг
    $(document).on('click','.social-btn-contest',function(e){
      e.preventDefault();
      var networkName = $(this).attr('data-network');
      action.share(networkName);
    });

    $(document).on('click','.action-btn-reload',function(){
      window.location.replace("/ui/landing/#contest");
    });

    $(document).on('click','.chprev_owl',function(e){
      e.preventDefault();
      contest.swipeLeft();
    });
    $(document).on('click','.chnext_owl',function(e){
      e.preventDefault();
      contest.swipeRight();
    });
    $(document).on('click','#im-ready',function(e){
      e.preventDefault();
      contest.uploadPicture();

    });
  },
  uploadPicture:function(){
    var cand = document.getElementById("canvasEditor");
    var canvasData = cand.toDataURL("image/jpeg");
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
  }
}