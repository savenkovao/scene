import $ from 'jquery';

require('../../../node_modules/remodal/src/remodal');

export class Popup {

  constructor(selector, options) {
    this.selector = selector;

    this.defaulOptions = {};

    this.options = $.extend(this.defaulOptions, options);
    return this._initPopup();
  }

  _initPopup() {
    console.log('Modal inited');
    $(document).on('opened', this.selector, function () {
      console.log('Modal is opened');
      stopBodyScrolling(true);
    });

    $(document).on('closed', '.remodal', function (e) {
      console.log('Modal is closed' + (e.reason ? ', reason: ' + e.reason : ''));
      stopBodyScrolling(true);
    });

    let freezeVp = function (e) {
      e.preventDefault();
    };

    function stopBodyScrolling(bool) {
      if (bool) {
        document.body.addEventListener("touchmove", freezeVp, false);
      } else {
        document.body.removeEventListener("touchmove", freezeVp, false);
      }
    }

    return $(this.selector).remodal(this.options);
  }

}