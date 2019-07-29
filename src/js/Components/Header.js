import $ from 'jquery';
import {BaseComponent} from '../Base/BaseComponent';


export class HeaderComponent extends BaseComponent {

  constructor() {
    super();
    this.currentScroll = 0;
    this.$body = $('body');
    this.toggleHeaderType();
  }

  _events() {
    this.$header = $('#header');
    $(document).on('click', '.brgr-menu, .brgr-close, [data-brgr-close]', (e) => {
      this.toggleMobileMenu();
    });
    $(document).on('closing', '.remodal', (e) => {
      this.toggleMobileMenu()
    });
    // $(document).on('click', '.header-login.mobile-show', (e) => {
    //   this.toggleMobileMenu();
    // });

    $(document).on('click', '.menu a', (e) => {
      if (window.matchMedia('(max-width: 1024px)').matches) {
        this.toggleMobileMenu(e);
      }
    });

    $(window).on('resize', (e) => {
      if (window.matchMedia('(min-width: 480px)').matches) {
        $('.nav').removeAttr('style');
        $('.brgr-menu').removeClass('active');
        this.$body.removeClass('hidden');
      }
    });

    $(window).on('scroll', (e) => {
      this.toggleHeaderType()
    });
  }

  toggleMobileMenu(e) {
    let isAnchor = false;
    let isMobile = window.matchMedia('(max-width: 480px)').matches;

    if (e && e.currentTarget) {
      isAnchor = $(e.currentTarget)[0].hasAttribute('data-menu-ahchor')
    }

    if (isMobile) {
      if (!this.$body.hasClass('hidden')) {
        this.currentScroll = window.pageYOffset;
      }

      this.$body.toggleClass('hidden');

      if (!this.$body.hasClass('hidden') && !isAnchor) {
        $('html, body').animate({
          scrollTop: this.currentScroll
        }, 0);
      }
    }

    this.$header.find('.nav').fadeToggle();
    $('.brgr-menu').toggleClass('active');
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
