import $ from 'jquery';
import {BaseComponent} from '../Base/BaseComponent';


export class HeaderComponent extends BaseComponent {

  constructor() {
    super();
    this.toggleHeaderType();
  }

  _events() {
    this.$header = $('#header');
    $(document).on('click', '.brgr-menu, .brgr-close', (e) => {
      this.toggleMobileMenu();
    });

    $(document).on('click', '.header-login.mobile-show', (e) => {
      this.toggleMobileMenu();
    });

    $(document).on('click', '.menu a', (e) => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        this.toggleMobileMenu();
      }
    });


    $(window).on('resize', (e) => {
      if (window.matchMedia('(min-width: 1250px)').matches) {
        $('.nav').removeAttr('style');
        $('.brgr-menu').removeClass('active');
        $('body').removeClass('hidden');
      }
    });

    $(window).on('scroll', (e) => {
      this.toggleHeaderType()
    });
  }

  toggleMobileMenu() {
    this.$header.find('.nav').fadeToggle();
    $('.brgr-menu').toggleClass('active');
    $('body').toggleClass('hidden');
  }

  toggleHeaderType() {
    let $headerToggleElem = $('[data-toggle-header]');
    let toggleHeight = $headerToggleElem.offset().top + $headerToggleElem.outerHeight();

    if (window.pageYOffset > toggleHeight && !this.$header.hasClass('scrolled')) {
      this.$header.addClass('scrolled fadeInDown');
    } else if (window.pageYOffset <= toggleHeight) {
      this.$header.removeClass('scrolled fadeInDown');
    }
  }
}