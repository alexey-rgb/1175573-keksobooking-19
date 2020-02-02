'use strict';

// объявляем константы

var OBJECT_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS = ['12:00, 13:00, 14:00,'];
var MAX_MAP_WIDTH = 3500;
var MIN_MAP_WIDTH = 1;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_SIZE = 40;

// объявляем константы для доступа к dom-элементам

var CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.map__card');
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WRAPPER = document.querySelector('.map__pins');
var MAP = document.querySelector('.map');

// создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

var random = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementArray = function (arr) {
  return arr[random(0, arr.length - 1)];
};

// создаем функцию для генерации 8 объектов

var mockData = function () {
  // создаем пустой массив объектов
  var objects = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
    objects.push({
      'avatar': '../img/avatars/user' + i + 1 + '.png',
      'title': 'заголовок объявления',
      'address': 'location.x, location.y',
      'price': random(),
      'type': getRandomElementArray(TYPES),
      'rooms': random(MIN, MAX),
      'guests': random(MIN, MAX),
      'checkin': getRandomElementArray(CHECKS),
      'checkout': getRandomElementArray(CHECKS),
      'features': 'wifi, dishwasher, parking, washer, elevator, conditioner',
      'description': 'строка с описанием',
      'location': {
        x: random(MIN_MAP_WIDTH, MAX_MAP_WIDTH),
        y: random(POSITION_Y_MIN, POSITION_Y_MAX),
      },
    }
    );
  }
  return objects;
};

// показываем карту обявлений

MAP.classList.remove('map--faded');

// создаем 2 функции, для клонирования шаблона метки и карточки(с описанием объявления) и для изменения содержания этих элементов

var getNewDescription = function () {
  var cardElement = CARD_TEMPLATE.cloneNode(true);
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  mockData().forEach(function (item, i) {
    cardElement.querySelector('.popup__avatar').src = item.avatar;
    cardElement.querySelector('.popup__title').textContent = item.title;
    cardElement.querySelector('.popup__text--address').textContent = item.address;
    cardElement.querySelector('.popup__text--price').textContent = item.price;
    cardElement.querySelector('.popup__type').textContent = item.type;
    cardElement.querySelector('.popup__text--capacity').textContent = item.rooms + item.guests;
    cardElement.querySelector('.popup__text--time').textContent = item.checkin + item.checkout;
    cardElement.querySelector('.popup__features').textContent = item.features;
    cardElement.querySelector('.popup__description').textContent = item.description;
    pinElement.querySelector('.pin__img').src = item.avatar;
    pinElement.querySelector('.pin__img').alt = item.title;
    pinElement.querySelector('.map-pin').style.left = item.location.x + (-PIN_SIZE * 0.5);
    pinElement.querySelector('.map-pin').style.top = item.location.y + (-PIN_SIZE * 0.5);
  });
  return cardElement && pinElement;
};

// записываем полученную информацию во фрагмент

var fragment = document.createDocumentFragment();
mockData().forEach(function (item, i) {
  fragment.appendChild(getNewDescription(item, i));
});

// выводим фрагмент в dom

PIN_WRAPPER.appendChild(fragment);
