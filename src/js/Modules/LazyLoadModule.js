import $ from 'jquery';
import {BaseModule} from '../Base/BaseModule';

export class LazyLoadModule extends BaseModule {

  constructor() {
    super();
    this._init();
  }

  _init() {
    let lazyLoadTimeout = null;
    initLazyLoad();

    $(window).bind('scroll', lazyLoadHandler);

    function lazyLoadHandler() {
      clearTimeout(lazyLoadTimeout);

      lazyLoadTimeout = setTimeout(function () {
        initLazyLoad();
      }, 100);
    }

    function initLazyLoad() {
      let windowTopPosition = $(window)[0].pageYOffset,
          windowBottomPosition = $(window)[0].pageYOffset + $(window)[0].innerHeight,
          $items = $('[data-bg-src], [data-src], [data-display]'),
          showOffsets = $(window)[0].innerHeight * 0.5;

      if (!$items.length) {
        $(window).unbind('scroll', lazyLoadHandler);
      }

      if (window.matchMedia('(max-width: 768px)').matches) {
        showOffsets = $(window)[0].innerHeight * 0.75;
      }

      $items.each(function (i, item) {
        if (
            (windowTopPosition - showOffsets <= $(item).offset().top + $(item).height() &&
                windowTopPosition - showOffsets > $(item).offset().top) ||
            windowBottomPosition + showOffsets >= $(item).offset().top
        ) {
          setSource(item);
        }
      });

      function setSource(item) {

        if (item.hasAttribute('data-bg-src')) {
          $(item).css({
            'background-image': 'url(' + item.getAttribute('data-bg-src') + ')'
          });

          item.removeAttribute('data-bg-src');
          item.setAttribute('data-bg', '');
        } else {
          item.setAttribute('src', item.getAttribute('data-src'));

          item.onload = function () {
            item.removeAttribute('data-src');
          };
        }
      }
    }
  }
}