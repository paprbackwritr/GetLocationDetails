var geocoder;

(function initialize() {
  geocoder = new google.maps.Geocoder();
})();

function codeLatLng(lat, lng) {
  var neighborhood = '';
  var locality = '';
  var city = '';
  var state = '';
  var country = '';
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var index = 1;
      if(results) {
        index = results.length - 4;
      }
      if (results[index]) {
        var addr_componenets = results[index].address_components;
        addr_componenets[0] ? city = addr_componenets[0].long_name : city = '' ;
        addr_componenets[2] ? state = addr_componenets[2].long_name : state = '' ;
        addr_componenets[3] ? country = addr_componenets[3].long_name : country = '' ;
        if(console) {
          console.log('city: '+city);
          console.log('state: '+state);
          console.log('country: '+country);          
        }
        $('body').append('<span id="location-details"><br>'+
                          '<br>City: '+city+
                          '<br>State: '+state+
                          '<br>Country: '+country+
                          '<br>================='+
                          '</span>');
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

function getLatLong(address){    
  geocoder.geocode({'address':address},function(results, status){
    if (status == google.maps.GeocoderStatus.OK) {
      codeLatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()); 
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function getLocationDetails(address) {
  getLatLong(address);
}

$(document).ready(function() {
  $('input#pin').on('blur', function() {
    var address = $('#pin').val();
    getLocationDetails(address);
  });
});