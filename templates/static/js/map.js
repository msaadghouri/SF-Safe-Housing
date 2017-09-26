var map = null;
var geo = null;
var infoWindow = null;
var markers = [];


function placeMarker(latlng, name, addr) {
    var m = new google.maps.Marker({
            position: latlng,
            map: map
        });

    markers.push(m);
    
    if (name.length > 0) {
        infoWindow = new google.maps.InfoWindow();
        markers[markers.length - 1].addListener('click', function() { 
                infoWindow.setContent(name + "<br/>" + addr);
                infoWindow.open(map, m);
            });
    }
}

function placesCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      placeMarker(place.geometry.location, place.name, place.vicinity);
        
    }
  }
}

function getCrime() {
    var locations = [];
    var crimeURL = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=500";
    var request = new XMLHttpRequest();
    
    request.open("GET", crimeURL, false);
    request.send(null);
    var results = JSON.parse(request.responseText);
    
    for (var i = 0; i < results.length; i++) {
        var crime = results[i];
        locations.push(new google.maps.LatLng(parseFloat(crime.y), parseFloat(crime.x)));
    }
    return locations;
}