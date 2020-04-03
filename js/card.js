'use strict';

(function () {

  var FEATURE = window.nodes.FEATURES.children[0];

  var getButtonCloseHandler = function (element) {
    return function (evt) {
      window.ACTIVE_PIN = document.querySelector('.map__pin--active');
      if (evt.key === 'Escape' || evt.button === 0) {
        element.remove();
        window.ACTIVE_PIN.classList.remove('map__pin--active');
        window.pin.COUNTERS.pop();
      }
    };
  };

  var renderPhotos = function (photos) {
    var fragment3 = document.createDocumentFragment();
    photos.forEach(function (item) {
      var newElement = window.nodes.POPUP_PHOTOS.cloneNode(true);
      newElement.querySelector('.popup__photo').src = item;
      fragment3.appendChild(newElement);
    });
    return fragment3;
  };

  var getFeatureClass = function (item) {
    return window.data.FEATURES_CLASS_CONSTRUCTION1 + item;
  };

  var renderFeatures = function (features) {
    var fragment5 = document.createDocumentFragment();
    features.forEach(function (item) {
      var newElement = FEATURE.cloneNode(true);
      newElement.className = getFeatureClass(item);
      fragment5.appendChild(newElement);
    });
    return fragment5;
  };

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
    var controlCardVisibility = getButtonCloseHandler(cardElement);
    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price;
    cardElement.querySelector('.popup__type').textContent = item.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(renderPhotos(item.offer.photos));
    cardElement.querySelector('.popup__photo').remove();
    cardElement.querySelector('.popup__close').setAttribute('tabindex', '1');
    cardElement.querySelector('.popup__close').addEventListener('click', controlCardVisibility);
    document.addEventListener('keydown', controlCardVisibility);
    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
}());
