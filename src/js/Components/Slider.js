/**
 * Created by developer on 02.08.2017.
 */

import $ from 'jquery';

require('slick-carousel');

export class Slider {
  constructor(selector, options) {
    this.selector = selector;
    this.options = {};
    this.arrow = `<svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7295 23.7544C14.0902 23.4237 14.0902 22.8861 13.7295 22.5553L2.20934 12.0116L13.7295 1.44718C14.0902 1.1164 14.0902 0.578872 13.7295 0.248088C13.3688 -0.0826961 12.7826 -0.0826961 12.4219 0.248088L0.27053 11.3914C0.090176 11.5568 -5.51134e-07 11.7635 -5.61788e-07 11.9909C-5.71474e-07 12.1977 0.090176 12.4251 0.27053 12.5905L12.4219 23.7338C12.7826 24.0852 13.3688 24.0852 13.7295 23.7544Z" fill="#3B3B69"/>
          </svg>`;
    this.defaulOptions = {
      prevArrow: `<button class="slick-prev slider-arrow">${this.arrow}</button>`,
      nextArrow: `<button class="slick-next slider-arrow">${this.arrow}</button>`,
      adaptiveHeight: true
    };

    $.extend(this.options, this.defaulOptions, options);
    return this._initSlider();
  }

  _initSlider() {
    return $(this.selector).slick(this.options);
  }

}
