'use strict';

(function () {
  window.data = {
    // объявляем константы перечисления, массивы
    NUMBER_FOR_COUNT: 0.5,
    OBJECT_NUMBER: 8,
    Value: {
      MIN: 1,
      MAX: 10
    },
    Price: {
      MIN: 1000,
      MAX: 10000
    },
    MaxMapWidth: {
      PIXEL: 1200,
      PERCENT: 100
    },
    Pin: {
      PIXEL_SIZE: 40,
      PSEUDO: 22
    },
    MainPin: {
      POSITION_X: 570,
      POSITION_Y: 375,
      HEIGHT: 44
    },
    CHECKS: ['12:00', '13:00', '14:00'],
    TYPES: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
    PHOTO_APARTMENTS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    // ФИЧИ
    FEATURES1: 'popup__feature popup__feature-',
    FEATURES2: ['-wifi', '-dishwasher', '-parking', '-washer', '-elevator', '-conditioner'],
    // Объект для управления полями ввода(синхронизация)
    ROOM_DATA: {
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
    },
    Position: {
      Y_MIN: 130,
      Y_MAX: 630,
    },

    LengthSymbol: {
      MIN: 30,
      MAX: 100
    },

    MouseKey: {
      RIGHT: 2,
      MIDDLE: 1
    }
  };
}());
