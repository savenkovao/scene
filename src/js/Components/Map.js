import $ from 'jquery';
import {GoogleApiModule} from '../Modules/GoogleApi';
import {Helpers} from '../Helpers';

export class Map {

  constructor(options) {
    this.GoogleApiModule = new GoogleApiModule();
    this.Helpers = new Helpers();
    this.CONFIG = window.CONFIG;
    this.google = null;
    this.selector = options.selector;
    this.mapOptions = options.mapOptions || {};

    this.options = $.extend({
      zoom: 12,
      maxZoom: 20,
      center: {
        lat: 24.477297,
        lng: 54.351794
      },
      clickableIcons: false,
    }, this.mapOptions);

    this.markers = [];

    this.places = [
      {
        lat: 24.477297,
        lng: 54.351794,
        pin: 'red',
        label: 'A',
      },
      {
        lat: 24.471297,
        lng: 54.381794,
        pin: 'blue',
        label: 'B',
      },
      {
        lat: 24.479297,
        lng: 54.384794,
        pin: 'orange',
        label: 'C',
      },
    ];

    this._events();
  }

  onLoad(callback) {
    this.callback = callback;
  }

  _events() {
    this.GoogleApiModule.load((google) => {
      this.google = google;
      this._initMap();
      if (typeof this.callback === 'function') this.callback();
    });
  }

  _initMap() {
    this.map = new this.google.maps.Map(document.querySelector(this.selector), this.options);
    this.bounds = new this.google.maps.LatLngBounds();
    this.infowindow = new this.google.maps.InfoWindow();
    this.drop();
  }

  drop() {
    this.clearMarkers();

    for (let i = 0; i < this.places.length; i++) {
      this.addMarkerWithTimeout(this.places[i], i * 200);
    }

    this.places.forEach((item, i, arr) => {
      this.bounds.extend(item);
    });

    this.map.fitBounds(this.bounds);
  }

  addMarkerWithTimeout(point, timeout) {
    window.setTimeout(() => {
      let pin = new this.google.maps.Marker({
        position: point,
        map: this.map,
        label: {
          text: point.label,
          color: "white",
          fontSize: "18px",
        },
        icon: {
          url: `public/img/pin_${point.pin || 'red'}.svg`,
          labelOrigin: {x: 23, y: 23}
        },
        animation: this.google.maps.Animation.DROP
      });

      this.markers.push(pin);
      this.bounds.extend(pin.getPosition());
    }, timeout);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
}
