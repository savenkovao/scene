import $ from 'jquery';
import {BaseComponent} from "../Base/BaseComponent";
import { Popup } from './Popup';

export class SubscribePopupComponent extends BaseComponent {

    constructor() {
        super();

        this._initPopup();

    }

    _events() {
        $(document).on('click', '#form_submit', (e) => {
            this.Helpers.showLoader('#form_subscribe');
            this.Helpers.sendFormRequest($('#form_subscribe')[0])
                .then(() => {
                    this.Helpers.hideLoader('#form_subscribe');
                    // document.location.reload();
                    $('.popup').show();
                }, err => {
                    this.Helpers.hideLoader('#form_subscribe');
                    if (err.status = 422) {
                        $("[data-error='email']").text('This email already exists').show();
                    }
                });
        });

        $(document).on('click', '.popup_close', (e) => {
            $('.popup').hide();
            $('#input_subscribe').val('');
        });
    }

    _initPopup() {
        this.SubscribePopup = new Popup();
    }

}