import $ from 'jquery';
import { BaseComponent } from '../Base/BaseComponent';



export class ClipboardComponent extends BaseComponent {

  constructor() {
    super();
  }

  _events() {
    $(document).on('click', '[data-clipboard]', (e) => {
      var $temp = $("<input>");
      var $popover = $("<span class='clipboard-popover'>Email copied to clipboard!</span>");
      $("body").append($temp);
      $temp.val( $(e.currentTarget).attr('data-clipboard') ).select();
      document.execCommand("copy");
      $temp.remove();

      $(e.currentTarget).append($popover);

      setTimeout(()=>{
        $popover.remove();
      },1500);
    });
  }

}
