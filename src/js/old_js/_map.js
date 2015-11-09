var map = {
  init:function(){
    /* ---------------------------------------------- /*
     * Google Map
    /* ---------------------------------------------- */
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(55.7077,37.5905), 
        streetViewControl : false,
        overviewMapControl: false,
        mapTypeControl: false,
        zoomControl : false,
        panControl : false,
        scrollwheel: false,
        styles: [{"stylers":[{"visibility":"simplified"},{"saturation":20},{"weight":3.2},{"lightness":25}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var _map = new google.maps.Map(mapElement, mapOptions);
    var image = new google.maps.MarkerImage('images/marker.png',
      new google.maps.Size(44, 60),
      new google.maps.Point(0, 0),
      new google.maps.Point(40, 40)
    );
    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.7078,37.5909),
        icon: image,
        map: _map,
        title: 'D1GITABLE'
    });
  }
};