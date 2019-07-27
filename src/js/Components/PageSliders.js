import {BaseComponent} from '../Base/BaseComponent';
import {Slider} from './Slider';


export class PageSlidersComponent extends BaseComponent {

  constructor() {
    super();

    this.headingSliderSelector = '#heading-slider';
    this.happeningSliderSelector = '#happening-list';
    this.advantagesSliderSelector = '#advantages-slider';

    this.headingSliderOpt = {
      dots: true,
      accessibility: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      centerMode: false,
      focusOnSelect: true
    };
    this.happeningSliderOpt = {
      dots: false,
      accessibility: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1420,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: 1185,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            centerMode: true,
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    };
    this.advantagesSliderOpt = {
      dots: true,
      accessibility: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      arrows: false,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };

    this._initSlider();
  }

  _events() {
  }

  _initSlider() {
    this.headingSlider = new Slider(this.headingSliderSelector, this.headingSliderOpt);
    this.happeningSlider = new Slider(this.happeningSliderSelector, this.happeningSliderOpt);
    this.advantagesSlider = new Slider(this.advantagesSliderSelector, this.advantagesSliderOpt);
  }
}
