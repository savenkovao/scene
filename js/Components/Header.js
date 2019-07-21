import $ from 'jquery';
import {BaseComponent} from '../Base/BaseComponent';


export class HeaderComponent extends BaseComponent {

  constructor() {
    super();
    this.toggleHeaderType()
  }

  _events() {
    $(document).on('click', '.brgr-menu', (e) => {
      toggleMobileMenu();
    });

    $(document).on('click', '.header-login.mobile-show', (e) => {
      toggleMobileMenu();
    });

    $(document).on('click', '.menu a', (e) => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        toggleMobileMenu();
      }
    });

    function toggleMobileMenu() {
      $('#header').find('.menu').slideToggle();
      $('.brgr-menu').toggleClass('active');
      $('.header-transp').toggleClass('collapsed');
      $('body').toggleClass('hidden');
    }

    $(window).on('resize', (e) => {
      if (window.matchMedia('(min-width: 1121px)').matches) {
        $('.menu').removeAttr('style');
        $('.brgr-menu').removeClass('active');
        $('.header-transp').removeClass('collapsed');
        $('body').removeClass('hidden');
      }
    });


    $(window).on('scroll', (e) => {
      this.toggleHeaderType()
    });
  }

  toggleHeaderType() {
    let $header = $('#header');
    let $headerToggleElem = $('[data-toggle-header]');
    let toggleHeight = $headerToggleElem.offset().top + $headerToggleElem.outerHeight()

    if (window.pageYOffset > toggleHeight && !$header.hasClass('scrolled')) {
      $header.addClass('scrolled fadeInDown');
    } else if (window.pageYOffset <= toggleHeight) {
      $header.removeClass('scrolled fadeInDown');
    }
  }
}
