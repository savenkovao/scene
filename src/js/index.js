import $ from 'jquery';
import {HeaderComponent} from './Components/Header';
import {Map} from './Components/Map';
import {ScrollModule} from './Modules/ScrollModule';
import {Tabs} from "./Components/Tabs";
import {PageSlidersComponent} from "./Components/PageSliders";
import Tooltip from "tooltip.js";


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
    new PageSlidersComponent();

    new Map({
      selector: '#map'
    });

    new Tooltip($('[data-tooltip]'), {
      placement: 'top',
      title: "Tooltip helper text"
    });
  }
}


$('body').ready(() => {
  window.App = new App(window.CONFIG || {});
});