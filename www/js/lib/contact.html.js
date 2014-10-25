define(["jquery", "async!//maps.google.com/maps/api/js?sensor=false"], function (jQuery) {
    return function () {
        var myOptions = {
            zoom: 14,
            center: new google.maps.LatLng(43.4531855, -80.55331509999996),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(43.4531855, -80.55331509999996)
        });
        infowindow = new google.maps.InfoWindow({
            content: "<b>Salesucation.com Inc.</b><br/>5-420 Erb St . W<br/>N2L6K6 Waterloo"
        });
        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
    };
});
