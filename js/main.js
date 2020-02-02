'use strict';

// объявляем константы

var OBJECT_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS = ['12:00', '13:00', '14:00'];
var MAX_MAP_WIDTH = 3500;
var MIN_MAP_WIDTH = 1;
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_SIZE = 40;
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        'title': 'заголовок объявления',
        'address': (location.x, location.y),
        'price': random(MIN, MAX),
        'type': getRandomElementArray(TYPES),
        'rooms': random(MIN, MAX),
        'guests': random(MIN, MAX),
        'checkin': getRandomElementArray(CHECKS),
        'checkout': getRandomElementArray(CHECKS),
        'features': 'wifi, dishwasher, parking, washer, elevator, conditioner',
        'description': 'строка с описанием',
        'photos': getRandomElementArray(PHOTO_APARTMENTS),
        'location': {
          x: random(MIN_MAP_WIDTH, MAX_MAP_WIDTH),
          y: random(POSITION_Y_MIN, POSITION_Y_MAX)
        },
      }
    )
  }
  return objects;
};

// показываем карту обявлений

MAP.classList.remove('map--faded');

// создаем 2 функции, для клонирования шаблона метки и карточки(с описанием объявления) и для изменения содержания этих элементов

var getNewDescription = function (item) {
  var cardElement = CARD_TEMPLATE.cloneNode(true);
  cardElement.querySelector('.popup__photo').src = item.photos;
  cardElement.querySelector('.popup__avatar').src = item.avatar;
  cardElement.querySelector('.popup__title').textContent = item.title;
  cardElement.querySelector('.popup__text--address').textContent = item.address;
  cardElement.querySelector('.popup__text--price').textContent = item.price;
  cardElement.querySelector('.popup__type').textContent = item.type;
  cardElement.querySelector('.popup__text--capacity').textContent = item.rooms + item.guests;
  cardElement.querySelector('.popup__text--time').textContent = item.checkin + item.checkout;
  cardElement.querySelector('.popup__features').textContent = item.features;
  cardElement.querySelector('.popup__description').textContent = item.description;
  return cardElement;
};

var getNewPin = function (item) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  pinElement.querySelector('.pin__img').src = item.avatar;
  pinElement.querySelector('.pin__img').alt = item.title;
  pinElement.style.left = (item.location.x + (-PIN_SIZE * 0.5)) + 'px';
  pinElement.style.top = (item.location.y + (-PIN_SIZE * 0.5)) + 'px';
  return pinElement;
};

// записываем полученную информацию во фрагмент

var fragment1 = document.createDocumentFragment();
mockData().forEach(function (item, i) {
  fragment1.appendChild(getNewPin(item));
});

// выводим фрагмент в dom

PIN_WRAPPER.appendChild(fragment1);

var fragment = document.createDocumentFragment();
fragment.appendChild(getNewDescription(mockData()[0]));

// выводим фрагмент в dom

PIN_WRAPPER.appendChild(fragment);
