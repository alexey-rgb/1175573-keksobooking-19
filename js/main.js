'use strict';

// объявляем константы

var OBJECT_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var Price = {
  MIN: 1000,
  MAX: 10000
};
var MapWidth = {
  MAX_WIDTH: Math.floor(100 - 3.3),
  MIN_WIDTH: Math.floor(3.3)
};
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKS = ['12:00', '13:00', '14:00'];
var POSITION_Y_MIN = 130;
var POSITION_Y_MAX = 630;
var PIN_SIZE = Math.floor(3.3);
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_POSITION_FORMULA = (PIN_SIZE * 0.5);
var APARTMENTS_ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// объявляем константы для доступа к dom-элементам

var nodes = {
  CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
  PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
  MAP: document.querySelector('.map')
};

// создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

var getRandomBetween = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (arr) {
  return arr[getRandomBetween(0, arr.length - 1)];
};

var getRandomItemLength = function (arr) {
  var items = [];
  for (var i = 0; i <= getRandomBetween(0, arr.length); i++) {
    var currentItem = arr[i];
    items.push(currentItem);
  }
  return items;
};

var getRandomX = function () {
  return getRandomBetween(MapWidth.MIN_WIDTH, MapWidth.MAX_WIDTH);
};

var getRandomY = function () {
  return getRandomBetween(POSITION_Y_MIN, POSITION_Y_MAX);
};

// функция которая внтури цикла длинною arr.length записывает сгенерированные <img> во фрагмент
// и на каждом витке добавляет в src PHOTO_APARTMENTS[i]

/*var makeImage = function (arr) {
  var fragment3 = document.createDocumentFragment();
  for (var i = 0; i <= getRandomItemLength(arr).length; i++) {
    fragment3.appendChild(document.createElement('img') + 'src="' + arr[i] + '"');
  }
  return fragment3;
};*/

// создаем функцию для генерации 8 объектов

var mockData = function () {
  // создаем пустой массив объектов
  var objects = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
    var positionX = getRandomX();
    var positionY = getRandomY();
    objects.push({
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      'title': 'заголовок объявления',
      'address': '{' + positionX + ',' + positionY + '}',
      'price': getRandomBetween(Price.MIN, Price.MAX) + ' Рублей/ночь',
      'type': getRandomItem(TYPES),
      'rooms': getRandomBetween(MIN, MAX),
      'guests': getRandomBetween(MIN, MAX),
      'checkin': getRandomItem(CHECKS),
      'checkout': getRandomItem(CHECKS),
      'features': getRandomItemLength(APARTMENTS_ADVANTAGES),
      'description': 'Уютное местечко',
      //'photos': makeImage(PHOTO_APARTMENTS),
      'location': {
        'x': positionX,
        'y': positionY,
      }
    });
  }
  return objects;
};

// показываем карту обявлений

nodes.MAP.classList.remove('map--faded');

// создаем 2 функции, для клонирования шаблона метки и карточки(с описанием объявления) и для изменения содержания этих элементов

var getNewDescription = function (item) {
  var cardElement = nodes.CARD_TEMPLATE.cloneNode(true);
  //cardElement.querySelector('.popup__photos').appendChild(item.photos);
  cardElement.querySelector('.popup__avatar').src = item.avatar;
  cardElement.querySelector('.popup__title').textContent = item.title;
  cardElement.querySelector('.popup__text--address').textContent = item.address;
  cardElement.querySelector('.popup__text--price').textContent = item.price;
  cardElement.querySelector('.popup__type').textContent = item.type;
  cardElement.querySelector('.popup__text--capacity').textContent = item.rooms + ' комнаты для ' + item.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.checkin + ', выезд до ' + item.checkout;
  cardElement.querySelector('.popup__features').textContent = item.features;
  cardElement.querySelector('.popup__description').textContent = item.description;
  return cardElement;
};

var getNewPin = function (item) {
  var pinElement = nodes.PIN_TEMPLATE.cloneNode(true);
  pinElement.querySelector('img').src = item.avatar;
  pinElement.querySelector('img').alt = item.title;
  pinElement.style.left = (item.location.x) + (-PIN_POSITION_FORMULA) + '%';
  pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (PIN_POSITION_FORMULA * 2) + '%)';
  return pinElement;
};

// записываем во фрагмент

var fillFragment = function (process) {
  var fragment1 = document.createDocumentFragment();
  process.forEach(function (item) {
    fragment1.appendChild(getNewPin(item));
  });
  return fragment1;
};

var process = mockData();

// выводим фрагмент в dom

nodes.MAP.appendChild(fillFragment(process));

// записываем во фрагмент

var fragment = document.createDocumentFragment();
fragment.appendChild(getNewDescription(mockData()[0]));

// выводим фрагмент в dom

nodes.MAP.appendChild(fragment);
