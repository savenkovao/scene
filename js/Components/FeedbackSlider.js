import $ from 'jquery';
import { BaseComponent } from '../Base/BaseComponent';
import { Slider } from './Slider';



export class FeedbackSliderComponent extends BaseComponent {

  constructor() {
    super();

    this.headingSliderSelector = '#heading-slider';
    this.happeningSliderSelector = '#happening-list';
    this.headingSliderOpt = {
      dots: false,
      accessibility: true,
      slidesToShow : 1,
      slidesToScroll : 1,
      infinite : true,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
    };
    this.happeningSliderOpt = {
      dots: false,
      accessibility: true,
      slidesToShow : 6,
      slidesToScroll : 1,
      infinite : true,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
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
    this.headingSlider = new Slider(this.headingSliderSelector, this.headingSliderOpt);
    this.happeningSlider = new Slider(this.happeningSliderSelector, this.happeningSliderOpt);
  }

  _resizeSliders() {
    // if(window.matchMedia('(min-width: 640px)').matches && !this.headingSlider.hasClass('slick-slider')) {
    //   this.headingSlider = new Slider(this.headingSliderSelector, this.headingSliderOpt);
    // }
  }
}
