'use strict';

(function () {
  // объявляем константы перечисления, массивы

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

  // ФИЧИ

  var FEATURES_CLASS_CONSTRUCTION1 = 'popup__feature popup__feature-';
  var FEATURES_CLASS_CONSTRUCTION2 = ['-wifi', '-dishwasher', '-parking', '-washer', '-elevator', '-conditioner'];

  // Объект для управления полями ввода(синхронизация)

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

  // размер пина в процентах

  var PIN_PERCENT_SIZE = (PinPixelSize * MaxMapWidth.PERCENT) / MaxMapWidth.PIXEL;

  // создаем массив клонированных объектов(моки)

  var mockData = function (number) {
    var MapWidth = {
      MAX: Math.floor(MaxMapWidth.PERCENT - PIN_PERCENT_SIZE),
      MIN: Math.floor(PIN_PERCENT_SIZE)
    };
    // создаем пустой массив объектов
    var objects = [];
    for (var i = 0; i < number; i++) {
      var positionX = window.util.getRandomBetween(MapWidth.MIN, MapWidth.MAX);
      var positionY = window.util.getRandomBetween(window.data.Position.Y_MIN, window.data.Position.Y_MAX);
      objects.push({
        'avatar': 'img/avatars/user' + ('' + (i + 1)).padStart(2, '0') + '.png',
        'title': 'заголовок объявления',
        'address': '' + positionX + ', ' + positionY,
        'price': window.util.getRandomBetween(window.data.Price.MIN, window.data.Price.MAX) + ' Рублей/ночь',
        'type': window.util.getRandomItem(window.data.TYPES),
        'rooms': window.util.getRandomBetween(window.data.Value.MIN, window.data.Value.MAX),
        'guests': window.util.getRandomBetween(window.data.Value.MIN, window.data.Value.MAX),
        'checkin': window.util.getRandomItem(window.data.CHECKS),
        'checkout': window.util.getRandomItem(window.data.CHECKS),
        'features': window.util.getRandomItems2(window.data.FEATURES_CLASS_CONSTRUCTION2),
        'description': 'Уютное местечко',
        'photos': window.util.getRandomItems2(window.data.PHOTO_APARTMENTS),
        'location': {
          'x': positionX,
          'y': positionY,
        }
      });
    }
    return objects;
  };

  // Экспорт

  window.data = {
    // объявляем константы перечисления, массивы
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
    // ФИЧИ
    FEATURES_CLASS_CONSTRUCTION1: FEATURES_CLASS_CONSTRUCTION1,
    FEATURES_CLASS_CONSTRUCTION2: FEATURES_CLASS_CONSTRUCTION2,
    // Объект для управления полями ввода(синхронизация)
    ROOM_DATA: ROOM_DATA,
    Position: Position,
    LengthSymbol: LengthSymbol,
    MouseKey: MouseKey,
    mockData: mockData,
    PIN_PERCENT_SIZE: PIN_PERCENT_SIZE
  };
}());
