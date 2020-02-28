'use strict';

(function () {
  // функция показывает как можно закрыть карточку с описанием пина

  var getButtonCloseHandler = function (element) {
    return function (evt) {
      if (evt.key === 'Escape' || evt.button === 0) {
        element.remove();
      }
    };
  };

  // функции добавления массива во фрагмент (фото)

  var renderPhotos = function (arr) {
    var fragment3 = document.createDocumentFragment();
    arr.forEach(function (item) {
      var newElement = window.nodes.POPUP_PHOTOS.cloneNode(true);
      newElement.querySelector('.popup__photo').src = item;
      fragment3.appendChild(newElement);
    });
    return fragment3;
  };

  // добавление массива во фрагмент (фичи)

  var renderFeatures = function (arr) {
    // находим первый попавшийся элемент списка шаблона карточки(с описанием)
    var FEATURE = window.nodes.FEATURES.querySelector('.popup__feature');
    // контейнер с фичами
    var fragment5 = document.createDocumentFragment();
    var getFeatureClass = function (item) {
      return window.data.FEATURES1 + item;
    };
    arr.forEach(function (item) {
      var newElement = FEATURE.cloneNode(true);
      // добывляем класс из рандомного массива названий фич
      newElement.className = getFeatureClass(item);
      // записываем во фрагмент
      fragment5.appendChild(newElement);
    });
    return fragment5;
  };

  window.renderCard = {
    // создаем функцию для генерации 8 объектов
    PIN_PERCENT_SIZE: (window.data.Pin.PIXEL_SIZE * window.data.MaxMapWidth.PERCENT) / window.data.MaxMapWidth.PIXEL,
    getRandomBetween: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    mockData: function (number) {
      var getRandomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      var MapWidth = {
        MAX: Math.floor(window.data.MaxMapWidth.PERCENT - this.PIN_PERCENT_SIZE),
        MIN: Math.floor(this.PIN_PERCENT_SIZE)
      };
      // создаем пустой массив объектов
      var objects = [];
      for (var i = 0; i < number; i++) {
        var positionX = getRandomBetween(MapWidth.MIN, MapWidth.MAX);
        var positionY = getRandomBetween(window.data.Position.Y_MIN, window.data.Position.Y_MAX);
        objects.push({
          'avatar': 'img/avatars/user' + ('' + (i + 1)).padStart(2, '0') + '.png',
          'title': 'заголовок объявления',
          'address': '' + positionX + ', ' + positionY,
          'price': getRandomBetween(window.data.Price.MIN, window.data.Price.MAX) + ' Рублей/ночь',
          'type': window.activePage.getRandomItem(window.data.TYPES),
          'rooms': getRandomBetween(window.data.Value.MIN, window.data.Value.MAX),
          'guests': getRandomBetween(window.data.Value.MIN, window.data.Value.MAX),
          'checkin': window.activePage.getRandomItem(window.data.CHECKS),
          'checkout': window.activePage.getRandomItem(window.data.CHECKS),
          'features': window.activePage.getRandomItems2(window.data.FEATURES2),
          'description': 'Уютное местечко',
          'photos': window.activePage.getRandomItems2(window.data.PHOTO_APARTMENTS),
          'location': {
            'x': positionX,
            'y': positionY,
          }
        });
      }
      return objects;
    },

    // клонируем карточку.

    renderCard: function (item) {
      var cardElement = window.nodes.CARD_TEMPLATE.cloneNode(true);
      var featuresCollection = cardElement.querySelectorAll('.popup__feature');
      featuresCollection.forEach(function (feature) {
        cardElement.querySelector('.popup__features').removeChild(feature);
      });
      // записываем в переменную по методу dry
      var call = getButtonCloseHandler(cardElement);
      // наполняем шаблон карточки
      cardElement.querySelector('.popup__avatar').src = item.avatar;
      cardElement.querySelector('.popup__title').textContent = item.title;
      cardElement.querySelector('.popup__text--address').textContent = item.address;
      cardElement.querySelector('.popup__text--price').textContent = item.price;
      cardElement.querySelector('.popup__type').textContent = item.type;
      cardElement.querySelector('.popup__text--capacity').textContent = item.rooms + ' комнаты для ' + item.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.checkin + ', выезд до ' + item.checkout;
      cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.features));
      cardElement.querySelector('.popup__description').textContent = item.description;
      cardElement.querySelector('.popup__photos').appendChild(renderPhotos(item.photos));
      cardElement.querySelector('.popup__photo').remove();
      cardElement.querySelector('.popup__close').setAttribute('tabindex', '1');
      // ВОЗВРАЩАЕМ ОБРАБОТЧИК ИЗ ФУНКЦИИ
      cardElement.querySelector('.popup__close').addEventListener('click', call);
      document.addEventListener('keydown', call);
      return cardElement;
    }
  };
}());
