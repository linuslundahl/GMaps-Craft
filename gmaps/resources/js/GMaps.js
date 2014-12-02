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
      var lat = GMaps.pos.lat ? GMaps.pos.lat : 55.60439820000001,
          lng = GMaps.pos.lng ? GMaps.pos.lng : 13.01409000000001,
          position = new google.maps.LatLng(lat, lng);

      // Initialize map
      map = new google.maps.Map(document.getElementById(GMaps.mapId), {
        zoom: 4,
        center: position,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // Create empty array to keep track of markers
      map.markersArray = [];

      // Find hidden location field
      map.$pos = $('input[data-name="geoposition"]');

      // Add lat and lng to hidden location field
      if (!map.$pos.val()) {
        map.$pos.val(lat + ' ' + lng);
      }

      // Place a marker with default position
      map.placeMarker(position);

      // Listen for clicks
      google.maps.event.addListener(map, 'click', function (event) {
        this.placeMarker(event.latLng);
      });

      // Listen for dragging
      google.maps.event.addListener(map.markersArray[(map.markersArray.length - 1)], 'dragend', function (event) {
        map.$pos.val(event.latLng.lat() + ' ' + event.latLng.lng());
      });

      // initialize geocoder for address search
      map.geo = new google.maps.Geocoder();

      // Setup address search field
      var $search = $('<div></div>').css({
        'background' : '#fff',
        'padding' : '10px',
        'position' : 'absolute',
        'right' : '1em',
        'top' : 0,
        'z-index' : 1
      }).prependTo($('#' + GMaps.mapId));

      var $address = $('<input />').addClass('text').attr({
        'type' : 'text',
        'placeholder' : 'Find address'
      }).appendTo($search);

      $('<input />').css({
        'margin' : '0 0 0 5px'
      }).addClass('btn').attr({
        'type' : 'submit'
      }).val('Find').on('click', function (e) {
        e.preventDefault();
        map.searchAddress($address.val());
      }).appendTo($search);
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

    map.$pos.val(location.lat() + ' ' + location.lng());
  };

  /**
   * [searchAddress description]
   * @return {[type]} [description]
   */
  google.maps.Map.prototype.searchAddress = function (address) {
    map.geo.geocode({ 'address': address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        map.placeMarker(results[0].geometry.location);
        map.panTo(results[0].geometry.location);
        map.setZoom(14);
      }
    });
  };

  /**
   * Document ready
   */
  $(function () {
    return google.maps.event.addDomListener(window, 'load', initialize);
  });
})(jQuery);
