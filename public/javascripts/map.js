function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 41.378736, lng: 2.179882}
        });
        var geocoder = new google.maps.Geocoder();

        // document.getElementById('submit').addEventListener('click', function() {
        //   geocodeAddress(geocoder, map);
        // });
      


// $(document).ready(function(){
//   const sol = {
//     lat: 41.378736,
//     lng: 2.179882
//   };

// const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 13,
//     center: sol
//   });
console.log("test")
$.ajax({
       url: "http://localhost:3000/search/json",
      //  data: location,
       type: "get",
       success: function(response){
         response.forEach(function(response){
           let position = {
             lat: response.location.coordinates[1],
             lng: response.location.coordinates[0]
           }
            var marker = new google.maps.Marker({position, map})
           
         });
       },
       error: function(error){console.log(error)}
     })


};