function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 41.378736, lng: 2.179882}
        });
        var geocoder = new google.maps.Geocoder();

$.ajax({
       url: "http://localhost:3000/customers/search/json",
       type: "get",
       success: function(response){
         response.forEach(function(response){
           let position = {
             lat: response.location.coordinates[1],
             lng: response.location.coordinates[0]
           };
           let marker = new google.maps.Marker({position, map});

           let vendorHtml = `<div class="vendor-results">
            <div class="vendor-img"> </div>
            <div class="vendor-description">
              <h5 class="vendor-name">${response.name}</h5>
              <p class="cuisine">${response.cuisine}</p>
            </div>
            <button class="get-result">
              <a href="#"> Show more</a>
            </button>
          </div>`

           $("#vendorList").append(vendorHtml);
           console.log(response.cuisine)

         });
       },
       error: function(error){console.log(error)}
     })

};