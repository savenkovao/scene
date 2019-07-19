export class YoutubeVideoFrame {

  constructor() {
    this._initCustomFrame();
  }

  _initCustomFrame() {
    init();

    function init() {
      let div, n,
        v = document.getElementById('youtube-player');
      div = document.getElementById('youtube-player-inner');
      // for (n = 0; n < v.length; n++) {
      //   div = document.createElement('div');
      div.setAttribute('data-id', v.dataset.id);
      //   div.innerHTML = labnolThumb(v.dataset.id);
      div.onclick = labnolIframe;
      v.appendChild(div);
      // }
    }

    /*
     function labnolThumb(id) {
     // let thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
     let thumb = '<img src="https://mdp-landing.php-cd.attractgroup.com/public/img/about_video_screen.jpg">',
     play = '<div class="play"></div>';

     // return thumb.replace('ID', id) + play;
     return play + thumb;
     }
     */
    function labnolIframe() {
      let iframe = document.createElement('iframe'),
        embed = 'https://www.youtube.com/embed/ID?autoplay=1';

      iframe.setAttribute('src', embed.replace('ID', this.dataset.id));
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '1');

      this.parentNode.replaceChild(iframe, this);
    }
  }
}
