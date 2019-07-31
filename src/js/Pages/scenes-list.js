import $ from 'jquery';
window.jQuery = $;
import {HeaderComponent} from '../Components/Header';
import {Map} from '../Components/Map';
import {ScrollModule} from '../Modules/ScrollModule';
import {Tabs} from "../Components/Tabs";
import {PageSlidersComponent} from "../Components/PageSliders";
import Tooltip from "tooltip.js";
import {LazyLoadModule} from "../Modules/LazyLoadModule";
import {Popup} from "../Components/Popup";
require('chosen-js/chosen.jquery.min.js');


class App {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;

    this._initModules();
    this._initComponents();
  }

  _initModules() {
    new ScrollModule();
  }

  _initComponents() {
    new HeaderComponent();
    new Tabs();
    // new PageSlidersComponent();
    // this.popup = new Popup($('#auth-modal'));

    // new Map({
    //   selector: '#map'
    // });

    if($('[data-tooltip]').length) {

      $('[data-tooltip]').each((i, item) =>{
        new Tooltip($(item), {
          placement: 'top',
          title: "Tooltip helper text"
        });
      })
    }

    $('.chosen').chosen({
      disable_search : true,
      search_contains : true,
      no_results_text : ' '
    });

    new LazyLoadModule();
  }
}


$('body').ready(() => {
  window.App = new App(window.CONFIG || {});
});