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
         response.forEach(function(chef){
           let position = {
             lat: chef.location.coordinates[1],
             lng: chef.location.coordinates[0]
           };
           let marker = new google.maps.Marker({position, map});

           let vendorHtml = `<div class="vendor-results row">
            <div class="vendor-img"> </div>
            <div class="vendor-description">
              <h5 class="vendor-name">${chef.name}</h5>
              <p class="cuisine">${chef.cuisine}</p>
            </div>
              <a href="#" class="button get-result"> Show more</a>
          </div>`;

          $("#vendorList").append(vendorHtml);

          $(document).on('click', '.healthy-cuisine', function(evt){
            $("#vendorList").hide(vendorHtml);
          })

         });
       },
       error: function(error){console.log(error)}
     })

};