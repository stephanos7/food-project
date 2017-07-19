var map, infoWindow;

function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 41.378736, lng: 2.179882}
        });

var geocoder = new google.maps.Geocoder();
infoWindow = new google.maps.InfoWindow;


// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

$.ajax({
      url: "http://localhost:3000/customers/search/json",
      type: "get",
      success: function(response){
        var markersArray = [];
        response.forEach(function(chef, i){
          let position = {
            lat: chef.location.coordinates[1],
            lng: chef.location.coordinates[0]
          };
          
        //  Remove marker
        //  marker.setMap(null);
        markersArray.push(new google.maps.Marker({position,map}))
        //let marker = new google.maps.Marker({position,map});

        let vendorHtml = `<article id="marker-${i}" class="vendor-results ${chef.cuisine} row">
          <div class="vendor-img"> </div>
          <div class="vendor-description">
            <h5 class="vendor-name">${chef.name}</h5>
            <p class="cuisine">${chef.cuisine}</p>
          </div>
            <a href="#" class="button get-result"> Show more</a>
        </article>`;
        
        //show all of the vendors
        $("#vendorList").append(vendorHtml);

        });
      },
       error: function(error){console.log(error)}
     })
};


//hide all the vendors on healthy cuisine click
$(document).on('click', '.cuisine-logos', function(evt){

  var idValue   = $(this).attr('id').split('-')[0];                                                                                
  var chefCards = $(".vendor-results");

  chefCards.each(function(){
    if (!$(this).hasClass('Italian')) {
      // Get the id of the element
      // split to get just the Number  ( number would be the index of the array of markers)
      // setMap to null for that index
      $(this).toggleClass('hidden');
    }
  });  
  
  
});