'use strict';

// объявляем константы

var OBJECT_NUMBER = 8;
var MIN = 1;
var MAX = 10;

// создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

var random = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getType = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var rand = Math.floor(Math.random() * types.length);
  return types[rand];
};

var getCheckin = function () {
  var checkins = ['12:00', '13:00', '14:00'];
  var rand = Math.floor(Math.random() * checkins.length);
  return checkins[rand];
};

var getCheckout = function () {
  var checkouts = ['12:00', '13:00', '14:00'];
  var rand = Math.floor(Math.random() * checkouts.length);
  return checkouts[rand];
};

// создаем пустой массив объектов

var objects = [];

// создаем фунцию для генерации 8 объектов

var createArr = function () {
  for (var i = 0; i <= OBJECT_NUMBER; i++) {
    objects.push({
        'avatar': '../img/avatars/user' + [i + 1] + '.png',
        'title': 'заголовок',
        'address': '600, 350',
        'price': random(MIN, MAX),
        'type': getType(),
        'rooms': random(MIN, MAX),
        'guests': random(MIN, MAX),
        'checkin': getCheckin(),
        'checkout': getCheckout(),
        'features': "wifi, dishwasher, parking, washer, elevator, conditioner",
        'description': 'строка с описанием',
        'location': {
          x: random(0, 1000),
          y: random(130, 630),
        },
      }
    );
  }
  return objects;
};

// показываем карту обявлений

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// объявляем переменные для доступа к dom-элементам

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card popup');
var pinTemplate = document.querySelector('.pin').content.querySelector('.map__pin');
var pinWrapper = document.querySelector('.map__pins');

// создаем 2 функции, для клонирования шаблона метки и карточки(с описанием объявления) и для изменения содержания этих элементов

var getNewDescription = function () {
  var cardElement = cardTemplate.cloneNode(true);
  var pinElement = pinTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = objects[j].avatar;
  cardElement.querySelector('.popup__title').textContent = objects[j].title;
  cardElement.querySelector('.popup__text--address').textContent = objects[j].address;
  cardElement.querySelector('.popup__text--price').textContent = objects[j].price;
  cardElement.querySelector('.popup__type').textContent = objects[j].type;
  cardElement.querySelector('.popup__text--capacity').textContent = objects[j].rooms + objects[j].guests;
  cardElement.querySelector('.popup__text--time').textContent = objects[j].checkin + objects[j].checkout;
  cardElement.querySelector('.popup__features').textContent = objects[j].features;
  cardElement.querySelector('.popup__description').textContent = objects[j].description;
  pinElement.querySelector('.map-pin > img').src = objects[j].avatar;
  pinElement.querySelector('.map-pin > img').alt = objects[j].title;
  pinElement.querySelector('.map-pin').style.left = objects[j].location.x;
  pinElement.querySelector('.map-pin').style.top = objects[j].location.y;
  return cardElement && pinElement;
};

// записываем полученную информацию во фрагмент

var fragment = document.createDocumentFragment();
for (var j = 0; j <= OBJECT_NUMBER; j++) {
  fragment.appendChild(getNewDescription(objects[j]));
}

// выводим фрагмент в dom

pinWrapper.appendChild(fragment);
