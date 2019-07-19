import $ from 'jquery';
import { Slider } from '../Components/Slider';



export class ContentSliderModule {

  constructor() {
    this._events();
  }

  _init() {
    this.options = {
      fade : true,
      swipeToSlide : true,
      verticalSwiping : false,
      arrows : true,
      dots : true,
      infinite : true,
      speed : 300,
      touchThreshold : 100,
      accessibility : true,
      slidesToShow : 1,
      adaptiveHeight : false,
      draggable : true,
      responsive : [{
        breakpoint : 1121,
        settings : 'unslick'
      }]
    };

    if(window.matchMedia('(min-width: 1121px) and (min-height: 530px)').matches) {
      new Slider('.content-slider', this.options);
    }
  }


  _events() {
    let timeout = null;
    this._init();


    $(window).on('resize', (e) => {

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if(window.matchMedia('(min-width: 1121px) and (min-height: 530px)').matches) {

          $('.content-slider').each((i, item) => {

            if(!$(item).hasClass('slick-slider')) {
              new Slider(item, this.options);
            }

          });
        }
      }, 100);
    });

    let $currentSlider = null;

    $('.content-slider').on('mouseenter', (e) => {
      $currentSlider = $(e.currentTarget);
      $(window).on('wheel', horizontallWheelHandler);
      $(window).on('gesturestart', preventGesturesMac);
      $(window).on('gesturechange', preventGesturesMac);
      $(window).on('gestureend', preventGesturesMac);
    });

    $('.content-slider').on('mouseleave',(e)=>{
      $(window).off('wheel', horizontallWheelHandler, false);
      $(window).off('gesturestart', preventGesturesMac, false);
      $(window).off('gesturechange', preventGesturesMac, false);
      $(window).off('gestureend', preventGesturesMac, false);
    });

    function horizontallWheelHandler(wheelEvent) {
      wheelEvent.preventDefault();

      let event = wheelEvent.originalEvent;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if(event.deltaX < 0) {
          $currentSlider.slick('slickPrev');
        } else if(event.deltaX > 0) {
          $currentSlider.slick('slickNext');
        }
      }, 50);
    }

    function preventGesturesMac(e) {
      e.preventDefault();
      console.log('event fired!')
    }
  }
}