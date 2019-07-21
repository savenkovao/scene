import $ from 'jquery';


export class Tabs {
  constructor() {
    this._events();
  }

  _events() {
    $(document).on('click', '[data-tab-toggle]', e => {
      let $target = $(e.currentTarget);
      let $targetCont = $target.closest('[data-tab-toggles]');
      let $parent = $target.closest('[data-tabs]');
      let $content = $parent.find(`[data-tab="${$target.attr('data-tab-toggle')}"]`);

      $targetCont.find('[data-tab-toggle]').removeClass('active');
      $target.addClass('active');
      $parent.find('[data-tab]').removeClass('active');
      $content.addClass('active');
    });
  }
}