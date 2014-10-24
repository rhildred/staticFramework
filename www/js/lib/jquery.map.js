define(["jquery", 'async!http://maps.google.com/maps/api/js?sensor=false'], function (jQuery) {
    jQuery.fn.map = function () {
        var mapOptions = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(this[0], mapOptions)

    };
});
