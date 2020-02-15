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
var Position = {
  Y_MIN: 130,
  Y_MAX: 630,
};
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var PHOTO_APARTMENTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * 0.5);
var APARTMENTS_ADVANTAGES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// объявляем константы для доступа к dom-элементам

var Nodes = {
  CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
  PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
  MAP: document.querySelector('.map'),
  form: document.querySelector('.ad-form'),
  mainPin: document.querySelector('.map__pin--main'),

  // переменные, касаящиеся главного пина(маффин).

  inputAddress: document.querySelector('#address'),
};

// координаты гланого пина

var mainPinPosition = (MainPinPosition.X + (PIN_PIXEL_SIZE) * 0.5) + ', ' + (MainPinPosition.Y + MAIN_PIN_HEIGHT + PIN_PSEUDO);

// переменная содержит метод добавления координат в поле адрес

var addressAttribute = Nodes.inputAddress.setAttribute('value', mainPinPosition + '');

// функция активации страницы

var pageActivation = function () {
  // активируем форму
  Nodes.form.classList.remove('ad-form--disabled');

  // активируем поля ввода
  fieldset.forEach(function (item) {
    item.removeAttribute('disabled');
  });

  // выводим фрагмент c метками похожих объявлений в dom
  Nodes.MAP.appendChild(fillFragment(process));

  // показываем карту обявлений
  Nodes.MAP.classList.remove('map--faded');
};

var roomData = {
  palace: {
    type: 'Дворец',
    price: 10000
  },
  house: {
    type: 'Дом',
    price: 5000
  },
  flat: {
    type: 'Квартира',
    price: 1000
  },
  bungalo: {
    type: 'Бунгало',
    price: 0
  }
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
// и на каждом витке добавляет в src + class

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

// записываем функцию получения массива с объектами рандомных свойств в переменную

var process = mockData();

// клонируем карточку

var getNewDescription = function (item) {
  var cardElement = Nodes.CARD_TEMPLATE.cloneNode(true);
  var removeCardElement = function () {
    cardElement.remove();
  };
  var removeCardElementEsc = function (evt) {
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
  cardElement.querySelector('.popup__close').addEventListener('click', removeCardElement);
  document.addEventListener('keydown', removeCardElementEsc);
  return cardElement;
};


// функция создания пина

var getNewPin = function (item) {
  // создаем клон карточки используя произвольный объект для заполнения шаблона
  var mock = getNewDescription(item);

  // клонируем
  var pinElement = Nodes.PIN_TEMPLATE.cloneNode(true);
  pinElement.querySelector('img').src = item.avatar;
  pinElement.querySelector('img').alt = item.title;
  pinElement.style.left = (item.location.x) + (-PIN_POSITION_FORMULA) + '%';
  pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
  pinElement.setAttribute('tabindex', '1');

  // при клике на пин показываем карточку с описанием
  pinElement.addEventListener('click', function () {

    // выводим мок в dom
    Nodes.MAP.appendChild(mock);
  });
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

var fieldset = Nodes.form.querySelectorAll('.ad-form__element');
fieldset.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});

// блокируем возможность редактирования поля с адресом

Nodes.inputAddress.setAttribute('disabled', 'disabled');

// функция отрисовки координат метки в поле ввода адреса.

var fixAddressValue = function () {
  return addressAttribute;
};

// активация страницы кликом

Nodes.mainPin.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      switch (evt.button) {
        case 0:
          break;
      }
      pageActivation();
      fixAddressValue();
      document.querySelector('.popup__photo').hidden = true;
    }
  }
);

// активация страницы с клавиатуры

Nodes.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      pageActivation();
    }
  }
);

// синхронизация полей ввода гостей и количества комнат

var findDifference = function () {
  var roomNumber = document.querySelector('#room_number').value;
  var capacity = document.querySelector('#capacity');
  capacity.addEventListener('change', function () {
    return capacity.value;
  });
  if (roomNumber !== capacity.value) {
    capacity.setCustomValidity('кол-во гостей должны быть равно количеству комнат');
  } else {
    capacity.setCustomValidity('');
  }
};

var buttonSubmit = document.querySelector('.ad-form__submit');

buttonSubmit.addEventListener('click', findDifference);

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

buttonSubmit.addEventListener('click', validateForm);

// 1 способ синхронизации двух полей. рабочий

var priceInput = document.querySelector('#price');
var type = document.querySelector('#type');
type.addEventListener('change', function (evt) {
  if (evt.target === type) {
    priceInput.placeholder = roomData[type.value].price;
    priceInput.min = roomData[type.value].price;
  }
});


// 2 способ синхронизации двух полей. КАК ИСПРАВИТЬ ЧТО БЫ ЗАРАБОТАЛО?
/*
var TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
// priceInput это поле выбора цены за жилье
var priceInput = document.querySelector('#price');
(function (element) {
  // type это поле выбора типа жилья
  var type = document.querySelector('#type');
  TYPES.forEach(function (item) {
    type.addEventListener('change', function () {
      switch (item) {
        case TYPES[0]:
          element.setAttribute('min', '0');
          element.setAttribute('placeholder', 'от 0/рублей');
          break;
        case TYPES[1]:
          element.setAttribute('min', '1000');
          element.setAttribute('placeholder', 'от 1000/рублей');
          break;
        case TYPES[2]:
          element.setAttribute('min', '5000');
          element.setAttribute('placeholder', 'от 5000/рублей');
          break;
        case TYPES[3]:
          element.setAttribute('min', '10000');
          element.setAttribute('placeholder', 'от 10000/рублей');
          break;
      }
    });
  });
})(priceInput);
*/

// 3 способ, РАБОЧИЙ

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

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
timeIn.addEventListener('change', function () {
  if (timeIn.value === '12:00') {
    timeOut.value = timeIn.value;
  }
  if (timeIn.value === '13:00') {
    timeOut.value = timeIn.value;
  }
  if (timeIn.value === '14:00') {
    timeOut.value = timeIn.value;
  }
});
