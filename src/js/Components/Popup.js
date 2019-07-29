import $ from 'jquery';
require('../../../node_modules/remodal/src/remodal');

export class Popup {

  constructor(selector, options) {
    this.selector = selector;
    this.$target = $(this.selector);

    this.defaulOptions = {};

    this.options = $.extend(this.defaulOptions, options);
    return this._initPopup();
  }

  _initPopup() {
    console.log('Modal inited');
    $(document).on('opened', this.selector, function () {
      document.ontouchmove = function (e) {
        e.preventDefault();
      }
    });

    $(document).on('closed', '.remodal', function (e) {
      document.ontouchmove = function (e) {
        return true;
      }
    });

    return $(this.selector).remodal(this.options);
  }

}