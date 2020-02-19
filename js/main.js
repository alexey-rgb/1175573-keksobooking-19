'use strict';

// объявляем константы перечисления, массивы

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
  PIXEL_SIZE: 40,
  PSEUDO: 22
};
var PIN_PERCENT_SIZE = (Pin.PIXEL_SIZE * MaxMapWidth.PERCENT) / MaxMapWidth.PIXEL;
var MainPin = {
  POSITION_X: 570,
  POSITION_Y: 375,
  HEIGHT: 44
};
var MapWidth = {
  MAX: Math.floor(MaxMapWidth.PERCENT - PIN_PERCENT_SIZE),
  MIN: Math.floor(PIN_PERCENT_SIZE)
};
var CHECKS = ['12:00', '13:00', '14:00'];
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * 0.5);
var APARTMENTS_ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
  POPUP_PHOTO: document.querySelector('.popup__photo'),
  POPUP_PHOTOS: document.querySelector('#card').content.querySelector('.popup__photos'),
  FIELDSET_TIME: document.querySelector('.ad-form__element--time'),
  TITLE_INPUT: document.querySelector('#title'),
  CAPACITY: document.querySelector('#capacity'),
  ROOM_NUMBER: document.querySelector('#room_number'),
  TIME_SELECTS: document.querySelectorAll('select')
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

var mainPinPosition = (MainPin.POSITION_X + (Pin.PIXEL_SIZE) * 0.5) + ', ' + (MainPin.POSITION_Y + MainPin.HEIGHT + Pin.PSEUDO);

// функция отрисовки координат метки в поле ввода адреса.

var fixAddressValue = function () {
  Nodes.INPUT_ADDRESS.setAttribute('value', mainPinPosition + '');
};

fixAddressValue();

// получаем значение поля с гостями для синхронизации полей ввода гостей и количества комнат
var inputGuestsChangeNumberHandler = function () {
  return (Nodes.ROOM_NUMBER.value !== Nodes.CAPACITY.value) ? Nodes.CAPACITY.setCustomValidity('кол-во гостей должны быть равно количеству комнат')
    : Nodes.CAPACITY.setCustomValidity('');
};

// ПОЧЕМУ НЕ ПОЛУЧАЕТСЯ ЭТУ ФУНКЦИЮ В РАЗМЕТКУ ONCHAGE ЗАПИСАТЬ. ХОЧЕТСЯ БЕЗ СОБЫТИЯ НА BUTTON СРАБОТАЛО?

var titleInputChangeHandler = function () {
  if (Nodes.TITLE_INPUT.value.trim().length < LengthSymbol.MIN || Nodes.TITLE_INPUT.value.trim().length > LengthSymbol.MAX) {
    Nodes.TITLE_INPUT.setCustomValidity('не меньше 30 и не больше 100 символов');
  } else {
    Nodes.TITLE_INPUT.setCustomValidity('');
  }
};

// функция изменения значения поля цены, в зависимости от типа жилья

var inputApartChangeTypeHandler = function (evt) {
  if (evt.target === Nodes.TYPE) {
    Nodes.PRICE_INPUT.placeholder = RoomData[Nodes.TYPE.value].price;
    Nodes.PRICE_INPUT.min = RoomData[Nodes.TYPE.value].price;
  }
};

// функции изменения занчения полей времени заезда/выезда

var inputTimeInChangeHandler = function (evt) {
  if (evt.target === Nodes.TIME_IN) {
    Nodes.TIME_OUT.value = Nodes.TIME_IN.value;
  } else {
    Nodes.TIME_IN.value = Nodes.TIME_OUT.value;
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
  Nodes.BUTTON_SUBMIT.addEventListener('click', inputGuestsChangeNumberHandler);
  Nodes.BUTTON_SUBMIT.addEventListener('click', titleInputChangeHandler);
  // 1 способ синхронизации двух полей. рабочий
  Nodes.TYPE.addEventListener('change', inputApartChangeTypeHandler);
  // изменяется время выезда гостей при изменение времени заезда и наоборот
  Nodes.TIME_SELECTS.forEach(function (item) {
    item.addEventListener('change', inputTimeInChangeHandler);
  });
  // блокируем возможность редактирования поля с адресом
  Nodes.INPUT_ADDRESS.setAttribute('disabled', 'disabled');
  // присваиваем координаты полю с адресом
  Nodes.INPUT_ADDRESS.setAttribute('value', mainPinPosition + '');
};

// функция активации страницы при клике на главный пин и на ENTER

var mainPinClickHandler = function (evt) {
  if (evt.button === MouseKey.MIDDLE || evt.button === MouseKey.RIGHT) {
    Nodes.MAIN_PIN.disable();
  }
  pageActivation();
  Nodes.POPUP_PHOTO.hidden = true;
};

var mainPinKeyDownHandler = function (evt) {
  if (evt.key === 'Enter') {
    pageActivation();
  }
};

// активация страницы

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

var getRandomNumber = function () {
  return getRandomBetween(0, 2);
};

// Получение произвольного массива методом filter(100% рандом)

var getRandomItems = function (arr) {
  return arr.filter(getRandomNumber);
};

// функция которая внтури цикла длинною arr.length записывает сгенерированные <img> во фрагмент
// и на каждом витке добавляет src + class

var makeImage = function (arr) {
  var count = getRandomBetween(1, arr.length);
  var fragment3 = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    var newElement = Nodes.POPUP_PHOTOS.cloneNode(true);
    //newElement.querySelector('.popup__photo').src = arr[getRandomBetween(i, arr.length - 1)];
    newElement.querySelector('.popup__photo').src = arr.splice(getRandomBetween(0, arr.length - 1), 1).pop();
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
      'rooms': getRandomBetween(Value.MIN, Value.MAX),
      'guests': getRandomBetween(Value.MIN, Value.MAX),
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

/*var getButtonCloseHandler = function (element) {
  return function () {
    cardElement.remove();
  };
};*/

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
  var pinImage = pinElement.querySelector('img');
  pinImage.src = item.avatar;
  pinImage.alt = item.title;
  pinElement.style.left = (item.location.x) + (-PIN_POSITION_FORMULA) + '%';
  pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
  pinElement.setAttribute('tabindex', '1');
  // при клике на пин показываем карточку с описанием
  pinElement.addEventListener('click', pinClickHandler);
  return pinElement;
};

// записываем в переменную функцию получения массива с объектами рандомных свойств

var process = mockData();

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
