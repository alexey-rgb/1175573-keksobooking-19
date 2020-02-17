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
var MAIN_PIN_HEIGHT = 44;
var PIN_PERCENT_SIZE = (PIN_PIXEL_SIZE * MAX_MAP_PERCENT_WIDTH) / MAX_MAP_PIXEL_WIDTH;
var MainPinPosition = {
  X: 570,
  Y: 375
};
var PIN_PSEUDO = 22;
var MapWidth = {
  MAX: Math.floor(MAX_MAP_PERCENT_WIDTH - PIN_PERCENT_SIZE),
  MIN: Math.floor(PIN_PERCENT_SIZE)
};
var CHECKS = ['12:00', '13:00', '14:00'];
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * 0.5);
var APARTMENTS_ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Перечисление

var Position = {
  Y_MIN: 130,
  Y_MAX: 630,
};

// перечисление для доступа к dom-элементам

var Nodes = {
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
  POPUP_PHOTO: document.querySelector('.popup__photo')
};

// Объект для управления полями ввода(синхронизация)

var RoomData = {
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

// координаты гланого пина

var mainPinPosition = (MainPinPosition.X + (PIN_PIXEL_SIZE) * 0.5) + ', ' + (MainPinPosition.Y + MAIN_PIN_HEIGHT + PIN_PSEUDO);

// переменная содержит метод добавления координат в поле адрес

var addressAttribute = Nodes.INPUT_ADDRESS.setAttribute('value', mainPinPosition + '');

// функция отрисовки координат метки в поле ввода адреса.

var fixAddressValue = function () {
  return addressAttribute;
};

// синхронизация полей ввода гостей и количества комнат

var findDifference = function () {
  var roomNumber = document.querySelector('#room_number').value;
  var capacity = document.querySelector('#capacity');
  var inputGuestsChangeNumberHandler = function () {
    return capacity.value;
  };
  capacity.addEventListener('change', inputGuestsChangeNumberHandler);
  if (roomNumber !== capacity.value) {
    capacity.setCustomValidity('кол-во гостей должны быть равно количеству комнат');
  } else {
    capacity.setCustomValidity('');
  }
};

// ПОЧЕМУ НЕ ПОЛУЧАЕТСЯ ЭТУ ФУНКЦИЮ В РАЗМЕТКУ ONCHAGE ЗАПИСАТЬ. ХОЧЕТСЯ БЕЗ СОБЫТИЯ НА BUTTON СРАБОТАЛО?

var validateForm = function () {
  var titleInput = document.querySelector('#title');
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 30;
  titleInput.addEventListener('change', function () {
    if (titleInput.value.trim().length < MIN_LENGTH && titleInput.value.trim().length < MAX_LENGTH) {
      titleInput.setCustomValidity('не меньше 30 и не больше 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
  });
};

// функция изменения значения поля цены, в зависимости от типа жилья

var inputApartChangeTypeHandler = function (evt) {
  if (evt.target === Nodes.TYPE) {
    Nodes.PRICE_INPUT.placeholder = RoomData[Nodes.TYPE.value].price;
    Nodes.PRICE_INPUT.min = RoomData[Nodes.TYPE.value].price;
  }
};

// функция изменения занчения полей времени заезда/выезда

var inputTimeChangeValue = function () {
  if (Nodes.TIME_IN.value === '12:00') {
    Nodes.TIME_OUT.value = Nodes.TIME_IN.value;
  }
  if (Nodes.TIME_IN.value === '13:00') {
    Nodes.TIME_OUT.value = Nodes.TIME_IN.value;
  }
  if (Nodes.TIME_IN.value === '14:00') {
    Nodes.TIME_OUT.value = Nodes.TIME_IN.value;
  }
};

// общая функция активации страницы

var pageActivation = function () {
  // активируем форму
  Nodes.FORM.classList.remove('ad-form--disabled');
  // активируем поля ввода
  Nodes.FIELDSET.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  // выводим фрагмент c метками похожих объявлений в dom
  Nodes.MAP.appendChild(fillFragment(process));
  // показываем карту обявлений
  Nodes.MAP.classList.remove('map--faded');
  // отслеживаем изменения и по необходимости изменяем подсказки в полях
  Nodes.BUTTON_SUBMIT.addEventListener('click', findDifference);
  Nodes.BUTTON_SUBMIT.addEventListener('click', validateForm);
  // 1 способ синхронизации двух полей. рабочий
  Nodes.TYPE.addEventListener('change', inputApartChangeTypeHandler);
  // изменяется время выезда гостей при изменение времени заезда
  Nodes.TIME_IN.addEventListener('change', inputTimeChangeValue);
  // блокируем возможность редактирования поля с адресом

  Nodes.INPUT_ADDRESS.setAttribute('disabled', 'disabled');
};

// функция активации страницы при клике на главный пин и на ENTER

var mainPinClickHandler = function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        break;
    }
    pageActivation();
    fixAddressValue();
    Nodes.POPUP_PHOTO.hidden = true;
  }
};


var mainPinKeyDownHandler = function (evt) {
  if (evt.key === 'Enter') {
    pageActivation();
  }
};

var activatePageWorking = function () {
  // активация страницы кликом
  Nodes.MAIN_PIN.addEventListener('mousedown', mainPinClickHandler);
  // активация страницы с клавиатуры
  Nodes.MAIN_PIN.addEventListener('keydown', mainPinKeyDownHandler);
};

// создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

var getRandomBetween = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomItem = function (arr) {
  return arr[getRandomBetween(0, arr.length - 1)];
};

var randomNumber = function () {
  return getRandomBetween(0, 2);
};

// Получение произвольного массива методом filter(100% рандом)

var getRandomItems = function (arr) {
  return arr.filter(randomNumber);
};

// Получение произвольного массива метод2(не 100% - возможны клоны)

/* var getRandomItems2 = function (arr) {
   var count = getRandomBetween(0, TYPES.length);
   var items = [];
   for (var i = 0; i <= count; i++) {
     var currentItem = arr[i];
     items.push(currentItem);
   }
 return items;
};*/

// функция которая внтури цикла длинною arr.length записывает сгенерированные <img> во фрагмент
// и на каждом витке добавляет src + class

var makeImage = function (arr) {
  var count = getRandomBetween(1, PHOTO_APARTMENTS.length);
  var fragment3 = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    var newElement = document.querySelector('#card').content.querySelector('.popup__photos').cloneNode(true);
    newElement.querySelector('.popup__photo').src = arr[i];
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
      'address': '' + positionX + ', ' + positionY,
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

// записываем в переменную функцию получения массива с объектами рандомных свойств

var process = mockData();

// клонируем карточку

var getNewDescription = function (item) {
  var cardElement = Nodes.CARD_TEMPLATE.cloneNode(true);
  var buttonCloseHandler = function () {
    cardElement.remove();
  };
  var buttonCloseOnEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      cardElement.remove();
    }
  };
  cardElement.querySelector('.popup__avatar').src = item.avatar;
  cardElement.querySelector('.popup__title').textContent = item.title;
  cardElement.querySelector('.popup__text--address').textContent = item.address;
  cardElement.querySelector('.popup__text--price').textContent = item.price;
  cardElement.querySelector('.popup__type').textContent = item.type;
  cardElement.querySelector('.popup__text--capacity').textContent = item.rooms + ' комнаты для ' + item.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.checkin + ', выезд до ' + item.checkout;
  cardElement.querySelector('.popup__features').textContent = item.features;
  cardElement.querySelector('.popup__description').textContent = item.description;
  cardElement.querySelector('.popup__photos').appendChild(item.photos);
  cardElement.querySelector('.popup__photo').remove();
  cardElement.querySelector('.popup__close').setAttribute('tabindex', '1');
  cardElement.querySelector('.popup__close').addEventListener('click', buttonCloseHandler);
  document.addEventListener('keydown', buttonCloseOnEscHandler);
  return cardElement;
};

// функция создания пина

var getNewPin = function (item) {
  // создаем клон карточки используя произвольный объект для заполнения шаблона
  var mock = getNewDescription(item);
  var pinClickHandler = function () {
    // выводим мок в dom
    Nodes.MAP.appendChild(mock);
  };
  // клонируем
  var pinElement = Nodes.PIN_TEMPLATE.cloneNode(true);
  pinElement.querySelector('img').src = item.avatar;
  pinElement.querySelector('img').alt = item.title;
  pinElement.style.left = (item.location.x) + (-PIN_POSITION_FORMULA) + '%';
  pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
  pinElement.setAttribute('tabindex', '1');
  // при клике на пин показываем карточку с описанием
  pinElement.addEventListener('click', pinClickHandler);
  return pinElement;
};

// записываем во фрагмент пины

var fillFragment = function () {
  var fragment1 = document.createDocumentFragment();
  process.forEach(function (item) {
    fragment1.appendChild(getNewPin(item));
  });
  return fragment1;
};

// блокируем поля ввода

Nodes.FIELDSET.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

activatePageWorking();

/* вариант синхронизации полей(гости и комнаты) через добавления атрибута onchange тегу #capacity разметки

function check() {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number').value;
  if (capacity.value !== roomNumber) {
    capacity.setCustomValidity('значение должно быть равно ' + roomNumber);
  } else {
    capacity.setCustomValidity('');
  }
}*/

// делегирование nodes.MAP(общий родитель). Но тут только на 1 случайный пин срабатывает и то не всегда

/*
nodes.MAP.addEventListener('click', function (evt) {
  if (evt.target && evt.currentTarget.matches && evt.target.matches('button[type="button"]')) {
    nodes.MAP.appendChild(mock);
  }
});
*/

// 2 способ синхронизации двух полей.

// priceInput это поле выбора цены за жилье
/* var priceInput = document.querySelector('#price');
(function (element) {
  // type это поле выбора типа жилья
  var type = document.querySelector('#type');

  type.addEventListener('change', function () {
    switch (type.value) {
      case RoomData.bungalo.value:
        element.setAttribute('min', '0');
        element.setAttribute('placeholder', 'от 0/рублей');
        break;
      case RoomData.flat.value:
        element.setAttribute('min', '1000');
        element.setAttribute('placeholder', 'от 1000/рублей');
        break;
      case RoomData.house.value:
        element.setAttribute('min', '5000');
        element.setAttribute('placeholder', 'от 5000/рублей');
        break;
      case RoomData.palace.value:
        element.setAttribute('min', '10000');
        element.setAttribute('placeholder', 'от 10000/рублей');
        break;
    }
  });
})(priceInput);
*/

// 3 способ синхронизации полей

/*
var type = document.querySelector('#type');
type.addEventListener('change', function () {
  var priceInput = document.querySelector('#price');

  if (type.value === 'bungalo') {
    priceInput.setAttribute('min', '0');
    priceInput.setAttribute('placeholder', 'от 0/рублей');
  }
  if (type.value === 'flat') {
    priceInput.setAttribute('min', '1000');
    priceInput.setAttribute('placeholder', 'от 1000/рублей');
  }
  if (type.value === 'house') {
    priceInput.setAttribute('min', '5000');
    priceInput.setAttribute('placeholder', 'от 5000/рублей');
  }
  if (type.value === 'palace') {
    priceInput.setAttribute('min', '10000');
    priceInput.setAttribute('placeholder', 'от 10000/рублей');
  }
});
*/
