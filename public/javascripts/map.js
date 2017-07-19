function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 41.378736, lng: 2.179882}
        });
        var geocoder = new google.maps.Geocoder();

console.log("test")

$.ajax({
       url: "http://localhost:3000/search/json",
       type: "get",
       success: function(response){
         response.forEach(function(response){
           let position = {
             lat: response.location.coordinates[1],
             lng: response.location.coordinates[0]
           };
           let marker = new google.maps.Marker({position, map});
           console.log(response.name)
           console.log(response.cuisine)

         });
       },
       error: function(error){console.log(error)}
     })

};