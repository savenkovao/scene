import $ from 'jquery';

let instance = null;

export class Helpers {
  constructor() {

    if (!instance) {
      instance = this;
    }

    return instance;
  }

  showLoader(selector, transition = 300) {

    if (!$(selector).length) {
      return this.showLoader('body');
    }


    if ($(selector).css('position') === 'static') {
      $(selector).css({'position': 'relative'});
    }

    this.hideLoader(selector);

    $(selector).append(`
            <div class="loader" style="display: none">
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
            </div>
        `);

    if ($(selector)[0].nodeName === 'BODY') {
      $(selector).children('.loader').css({
        position: 'fixed'
      })
    }

    $(selector).children('.loader').fadeIn(transition);
  }

  hideLoader(selector, transition = 300) {
    $(selector).children('.loader').fadeOut(transition, function () {
      $(this).remove()
    })
  }

}