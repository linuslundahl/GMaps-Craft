/* global document:true, GMaps:true, window:true, google:true, jQuery:true */
(function ($) {
  'use strict';

  var map, initialize;

  /**
   * [initialize description]
   * @return {[type]} [description]
   */
  initialize = function () {
    if (typeof(GMaps) !== 'undefined') {
      var lat = GMaps.pos.lat ? GMaps.pos.lat : 55.598,
          lng = GMaps.pos.lng ? GMaps.pos.lng : 12.988,
          position = new google.maps.LatLng(lat, lng);

      map = new google.maps.Map(document.getElementById(GMaps.mapId), {
        zoom: 4,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      map.markersArray = [];

      map.placeMarker(position);

      map.$pos = $('input[data-name="geoposition"]');

      if (!map.$pos.val()) {
        map.$pos.val(lat + ' ' + lng);
      }

      google.maps.event.addListener(map, 'click', function (event) {
        this.placeMarker(event.latLng);
        map.$pos.val(event.latLng.lat() + ' ' + event.latLng.lng());
      });
    }
  };

  /**
   * [clearOverlays description]
   * @return {[type]} [description]
   */
  google.maps.Map.prototype.clearOverlays = function () {
    var i, j = map.markersArray.length;

    for (i = 0; i < j; i++) {
      this.markersArray[i].setMap(null);
    }
  };

  /**
   * [placeMarker description]
   * @param  {[type]} location [description]
   * @return {[type]}          [description]
   */
  google.maps.Map.prototype.placeMarker = function (location) {
    this.clearOverlays();

    this.markersArray.push(new google.maps.Marker({
      position: location,
      map: this,
      draggable: true
    }));

    google.maps.event.addListener(map.markersArray[(map.markersArray.length - 1)], 'dragend', function (event) {
      map.$pos.val(event.latLng.lat() + ' ' + event.latLng.lng());
    });
  };


  /**
   * Document ready
   */
  $(function () {
    return google.maps.event.addDomListener(window, 'load', initialize);
  });
})(jQuery);
