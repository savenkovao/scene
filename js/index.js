import $ from 'jquery';
import { HeaderComponent } from './Components/Header';
import { FeedbackSliderComponent } from './Components/FeedbackSlider';
import { SubscribePopupComponent } from './Components/SubscribePopup';
import { Map } from './Components/Map';
import { ScrollModule } from './Modules/ScrollModule';
import {Tabs} from "./Components/Tabs";



class App {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;

    this._initModules();
    this._initComponents();
  }

  _initModules() {
    new ScrollModule();
    this.FeedbackSliderComponent = new FeedbackSliderComponent();
    this.SubscribePopupComponent = new SubscribePopupComponent();
  }

  _initComponents() {
    new HeaderComponent();
    new Tabs();
    this.map = new Map({
      selector : '#map'
    });
  }
}


$('body').ready(() => {
  window.App = new App(window.CONFIG || {});
});