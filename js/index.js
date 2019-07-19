import $ from 'jquery';
import { HeaderComponent } from './Components/Header';
import { FeedbackSliderComponent } from './Components/FeedbackSlider';
import { SubscribePopupComponent } from './Components/SubscribePopup';
import { ClipboardComponent } from './Components/Clipboard';
import { ScrollModule } from './Modules/ScrollModule';
import { YoutubeVideoFrame } from './Components/YoutubeVideoFrame';



class App {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;

    this._initModules();
    this._initComponents();
  }

  _initModules() {
    this.FeedbackSliderComponent = new FeedbackSliderComponent();
    new ScrollModule();
    this.SubscribePopupComponent = new SubscribePopupComponent();
  }

  _initComponents() {
    new HeaderComponent();
    this.clipboardComponent = new ClipboardComponent();
    this.YoutubeVideoFrame = new YoutubeVideoFrame();
  }
}


$('body').ready(() => {
  window.App = new App(window.CONFIG || {});
});