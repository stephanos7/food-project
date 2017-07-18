function initMap() {
    var myLatLng = {lat: 41.385, lng: 2.173};

    var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 15,
       center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
}

initMap();