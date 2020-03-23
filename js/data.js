'use strict';

(function () {
  var NUMBER_FOR_COUNT = 0.5;
  var OBJECT_NUMBER = 8;
  var Value = {
    MIN: 1,
    MAX: 10
  };
  var Price = {
    MIN: 1000,
    MAX: 10000
  };
  var MaxMapWidth = {
    PIXEL: 1200,
    PERCENT: 100
  };
  var Pin = {
    PIXEL_SIZE: 50,
    PSEUDO: 17
  };
  var MainPin = {
    POSITION_X: 570,
    POSITION_Y: 375,
    HEIGHT: 65
  };
  var CHECKS = ['12:00', '13:00', '14:00'];
  var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var FEATURES_CLASS_CONSTRUCTION1 = 'popup__feature popup__feature--';

  var ROOM_DATA = {
    palace: {
      type: 'Дворец',
      price: 10000,
      value: 'palace'
    },
    house: {
      type: 'Дом',
      price: 5000,
      value: 'house'
    },
    flat: {
      type: 'Квартира',
      price: 1000,
      value: 'flat'
    },
    bungalo: {
      type: 'Бунгало',
      price: 0,
      value: 'bungalo'
    }
  };

  var Position = {
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var LengthSymbol = {
    MIN: 30,
    MAX: 100
  };

  var MouseKey = {
    RIGHT: 2,
    MIDDLE: 1
  };

  var PinPixelSize = 50;

  var PIN_PERCENT_SIZE = (PinPixelSize * MaxMapWidth.PERCENT) / MaxMapWidth.PIXEL;

  var PINS;

  var copyServerResponse = [];

  var IndexCard = {
    FROM: 0,
    TO: 5
  };

  var getRenderPins = function (items) {
    copyServerResponse = items.slice();
    window.nodes.MAP.appendChild(window.pin.renderPins(items.slice(IndexCard.FROM, IndexCard.TO)));
  };

  var renderFilteredPins = function () {
    window.nodes.MAP.appendChild(window.pin.renderPins(window.filter.filterOffers(copyServerResponse)));
  };

  var startRenderPins = function () {
    if (copyServerResponse.length > 0) {
      return;
    }
    window.backend.loadCards(getRenderPins, window.message.onError2, window.backend.Url.GET);
  };

  var setFilter = function () {
    PINS.forEach(function (pin) {
      pin.remove();
    });
    renderFilteredPins();
  };

  var startRenderFilteredPins = function (evt) {
    PINS = window.nodes.MAP.querySelectorAll('button[type="button"]');
    setFilter(evt);
  };

  var loadData = function (fun) {
    window.form.inputGuestsChangeNumberHandler();
    window.util.mainPinHandlers(fun);
  };

  window.data = {
    NUMBER_FOR_COUNT: NUMBER_FOR_COUNT,
    OBJECT_NUMBER: OBJECT_NUMBER,
    Value: Value,
    Price: Price,
    MaxMapWidth: MaxMapWidth,
    Pin: Pin,
    MainPin: MainPin,
    CHECKS: CHECKS,
    TYPES: TYPES,
    PHOTO_APARTMENTS: PHOTO_APARTMENTS,
    FEATURES_CLASS_CONSTRUCTION1: FEATURES_CLASS_CONSTRUCTION1,
    ROOM_DATA: ROOM_DATA,
    Position: Position,
    LengthSymbol: LengthSymbol,
    MouseKey: MouseKey,
    PIN_PERCENT_SIZE: PIN_PERCENT_SIZE,
    PinPixelSize: PinPixelSize,
    loadData: loadData,
    startRenderPins: startRenderPins,
    startRenderFilteredPins: startRenderFilteredPins
  };
}());
