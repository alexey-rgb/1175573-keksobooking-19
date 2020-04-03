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
  };
}());
