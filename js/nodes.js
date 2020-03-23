'use strict';

(function () {
  // перечисление для доступа к dom-элементам
  window.nodes = {
    CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
    PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
    MAP: document.querySelector('.map'),
    FORM: document.querySelector('.ad-form'),
    MAIN_PIN: document.querySelector('.map__pin--main'),
    // касаящиеся главного пина(маффин).
    INPUT_ADDRESS: document.querySelector('#address'),
    // касается полей форм
    BUTTON_SUBMIT: document.querySelector('.ad-form__submit'),
    TYPE: document.querySelector('#type'),
    PRICE_INPUT: document.querySelector('#price'),
    TIME_IN: document.querySelector('#timein'),
    TIME_OUT: document.querySelector('#timeout'),
    FIELDSET: document.querySelectorAll('.ad-form__element'),
    POPUP_PHOTO: document.querySelector('.popup__photo'),
    FEATURES: document.querySelector('#card').content.querySelector('.popup__features'),
    POPUP_PHOTOS: document.querySelector('#card').content.querySelector('.popup__photos'),
    FIELDSET_TIME: document.querySelector('.ad-form__element--time'),
    TITLE_INPUT: document.querySelector('#title'),
    CAPACITY: document.querySelector('#capacity'),
    ROOM_NUMBER: document.querySelector('#room_number'),
    TIME_SELECTS: document.querySelectorAll('select'),
    SUCCESS_MESSAGE: document.querySelector('#success').content,
    ERROR_MESSAGE_TEMPLATE: document.querySelector('#error').content,
    BODY: document.querySelector('body'),
    MAIN: document.querySelector('main'),
    BUTTON_RESET_FORM: document.querySelector('.ad-form__reset'),
    FORM_FILTER: document.querySelector('.map__filters')
  };
}());
