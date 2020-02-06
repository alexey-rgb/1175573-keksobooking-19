'use strict';

// объявляем константы

var OBJECT_NUMBER = 8;
var MIN = 1;
var MAX = 10;
var Price = {
  MIN: 1000,
  MAX: 10000
};
var MAX_MAP_PIXEL_WIDTH = 1200;
var MAX_MAP_PERCENT_WIDTH = 100;
var PIN_PIXEL_SIZE = 40;
var PIN_PERCENT_SIZE = (PIN_PIXEL_SIZE * MAX_MAP_PERCENT_WIDTH) / MAX_MAP_PIXEL_WIDTH;
var MapWidth = {
  MAX: Math.floor(MAX_MAP_PERCENT_WIDTH - PIN_PERCENT_SIZE),
  MIN: Math.floor(PIN_PERCENT_SIZE)
};
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKS = ['12:00', '13:00', '14:00'];
var Position = {
  Y_MIN: 130,
  Y_MAX: 630,
};
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * 0.5);
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

var getRandomItems = function (arr) {
  var count = getRandomBetween(0, TYPES.length);
  var items = [];
  for (var i = 0; i <= count; i++) {
    var currentItem = arr[i + getRandomBetween(i, TYPES.length - 1)];
    items.push(currentItem);
  }
  return items;
};

// функция которая внтури цикла длинною arr.length записывает сгенерированные <img> во фрагмент
// и на каждом витке добавляет в src PHOTO_APARTMENTS[i]

var makeImage = function (arr) {
  var count = getRandomBetween(0, PHOTO_APARTMENTS.length - 1);
  var fragment3 = document.createDocumentFragment();
  for (var i = 0; i <= count; i++) {
    var newElement = document.createElement('img');
    newElement.src = arr[i + getRandomBetween(i, PHOTO_APARTMENTS.length - 1)];
    fragment3.appendChild(newElement);
  }
  return fragment3;
};

// создаем функцию для генерации 8 объектов

var mockData = function () {
  // создаем пустой массив объектов
  var objects = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
    var positionX = getRandomBetween(MapWidth.MIN, MapWidth.MAX);
    var positionY = getRandomBetween(Position.Y_MIN, Position.Y_MAX);
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
      'features': getRandomItems(APARTMENTS_ADVANTAGES),
      'description': 'Уютное местечко',
      'photos': makeImage(PHOTO_APARTMENTS),
      'location': {
        'x': positionX,
        'y': positionY,
      }
    });
  }
  return objects;
};

// создаем 2 функции, для клонирования шаблона метки и карточки(с описанием объявления) и для изменения содержания этих элементов

var getNewDescription = function (item) {
  var cardElement = nodes.CARD_TEMPLATE.cloneNode(true);
  cardElement.querySelector('.popup__photos').appendChild(item.photos);
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
  pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
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

var mock = getNewDescription(process[getRandomBetween(0, process.length - 1)]);

// выводим мок в dom

nodes.MAP.appendChild(mock);

// показываем карту обявлений

nodes.MAP.classList.remove('.map--faded');
