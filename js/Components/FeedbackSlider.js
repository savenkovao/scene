import $ from 'jquery';
import { BaseComponent } from '../Base/BaseComponent';
import { Slider } from './Slider';



export class FeedbackSliderComponent extends BaseComponent {

  constructor() {
    super();

    this.sliderSelector = '#feedbackSlider';
    this.sliderOpt = {
      dots: true,
      accessibility: true,
      slidesToShow : 2,
      slidesToScroll : 1,
      infinite : true,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
      // responsive : [
      //   {
      //     breakpoint : 767,
      //     settings: {
      //       slidesToShow : 1,
      //       slidesToScroll : 1,
      //     }
      //   }
      // ]
    };

    this._initSlider();
  }

  _events() {
    let timeout = null;

    $(window).resize(() => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this._resizeSliders();
      }, 100);
    });

  }

  _initSlider() {
    this.feedbackSlider = new Slider(this.sliderSelector, this.sliderOpt);
  }

  _resizeSliders() {
    if(window.matchMedia('(min-width: 640px)').matches && !this.feedbackSlider.hasClass('slick-slider')) {
      this.feedbackSlider = new Slider(this.sliderSelector, this.sliderOpt);
    }
  }
}
