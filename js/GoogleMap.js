var GoogleMap = {
    map:undefined,
    init:function(){
        GoogleMap.googleMap();
    },
    googleMap:function(){
        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(62, 15)
        };
        this.map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    }
}

window.addEventListener('load', GoogleMap.init);
