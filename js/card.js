'use strict';

(function () {
  // находим первый попавшийся элемент списка из шаблона карточки(с описанием)

  var FEATURE = window.nodes.FEATURES.querySelector('.popup__feature');

  // функция показывает как можно закрыть карточку с описанием пина

  var getButtonCloseHandler = function (element) {
    return function (evt) {
      if (evt.key === 'Escape' || evt.button === 0) {
        element.remove();
      }
    };
  };

  // функции добавления массива во фрагмент (фото)

  var renderPhotos = function (photos) {
    var fragment3 = document.createDocumentFragment();
    photos.forEach(function (item) {
      var newElement = window.nodes.POPUP_PHOTOS.cloneNode(true);
      newElement.querySelector('.popup__photo').src = item;
      fragment3.appendChild(newElement);
    });
    return fragment3;
  };

  // добавляет класс элементу списка

  var getFeatureClass = function (item) {
    return window.data.FEATURES_CLASS_CONSTRUCTION1 + item;
  };

  // добавление массива во фрагмент (фичи)

  var renderFeatures = function (features) {
    var fragment5 = document.createDocumentFragment();
    features.forEach(function (item) {
      var newElement = FEATURE.cloneNode(true);
      // добывляем класс из рандомного массива названий фич
      newElement.className = getFeatureClass(item);
      // записываем во фрагмент
      fragment5.appendChild(newElement);
    });
    return fragment5;
  };

  // клонируем карточку.

  var deleteTemplateTag = function (list) {
    var featuresCollection = list.querySelectorAll('.popup__feature');
    featuresCollection.forEach(function (feature) {
      list.removeChild(feature);
    });
  };

  var renderCard = function (item) {
    var cardElement = window.nodes.CARD_TEMPLATE.cloneNode(true);
    var list = cardElement.querySelector('.popup__features');
    deleteTemplateTag(list);
    // записываем в переменную по методу dry
    var controlCardVisibility = getButtonCloseHandler(cardElement);
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
    cardElement.querySelector('.popup__close').addEventListener('click', controlCardVisibility);
    document.addEventListener('keydown', controlCardVisibility);
    return cardElement;
  };

  // экспорт

  window.card = {
    renderCard: renderCard,
  };
}());
