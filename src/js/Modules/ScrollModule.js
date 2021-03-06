import $ from 'jquery';
import { BaseModule } from '../Base/BaseModule';
export class ScrollModule extends BaseModule{

  constructor() {
    super();
    this._init();
  }

  _events(){
    $(".menu a:not([brgr-close]), [data-go-up], [data-go-down]").on("click", (e)=> {
      if( $(e.currentTarget).attr('href').substring(0,1) === '#') {
        e.preventDefault();
        let anchor = $(e.currentTarget).attr('href');

        if(anchor && anchor.length > 1) this.navigateToBlock( $(e.currentTarget).attr('href') );
      }
    });
  }

  navigateToBlock(selector, time) {
    let top = $(selector).offset().top - 100;
    $('body,html').animate({scrollTop: top}, time || 800);
  }

  _init() {
    if( location.hash ) {
      this.navigateToBlock( location.hash, 1 );
    }
  }
}