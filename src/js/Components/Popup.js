import $ from 'jquery';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
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
    disableBodyScroll($('body')[0]);
    console.log('Modal inited');
    $(document).on('opened', this.selector, function () {
      disableBodyScroll($('body')[0]);
    });

    $(document).on('closed', '.remodal', function (e) {
      enableBodyScroll($('body')[0]);
    });

    return $(this.selector).remodal(this.options);
  }

}