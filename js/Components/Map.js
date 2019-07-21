import $ from 'jquery';
import { GoogleApiModule } from '../Modules/GoogleApi';
import { Helpers } from '../Helpers';

export class Map {

  constructor(options) {
    this.GoogleApiModule = new GoogleApiModule();
    this.Helpers = new Helpers();
    this.CONFIG = window.CONFIG;
    this.google = null;
    this.selector = options.selector;
    this.mapOptions = options.mapOptions || {};

    this.options = $.extend({
      zoom : 12,
      maxZoom : 20,
      center : {
        lat : 46.436590,
        lng : 30.749558
      },
      clickableIcons : false
      // gestureHandling : 'greedy'
    }, this.mapOptions);

    this.markers = [];

    this.places = [
      {
        lat: 46.4871088,
        lng: 30.7278933,
      },
      {
        lat: 46.4811088,
        lng: 30.7228933,
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
      if(typeof this.callback === 'function') this.callback();
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
    //крайние точки
    this.bounds.extend({lat : 46.428, lng : 30.749558});
    this.bounds.extend({lat : 46.445, lng : 30.749558});
    //крайние точки

    this.places.forEach((item, i, arr) => {
      this.bounds.extend(item);
    });

    this.map.fitBounds(this.bounds);
  }

  addMarkerWithTimeout(position, timeout) {
    window.setTimeout(() => {
      let pin = new this.google.maps.Marker({
        position : position,
        map : this.map,
        animation : this.google.maps.Animation.DROP
      });

      this.markers.push(pin);
      this.bounds.extend(pin.getPosition());

      this.google.maps.event.addListener(pin, 'click', ((pin, i) => {
        return () => {
          this.infowindow.setContent(position.infoWindow);
          this.infowindow.open(map, pin);
        };
      })(pin));
    }, timeout);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
}
