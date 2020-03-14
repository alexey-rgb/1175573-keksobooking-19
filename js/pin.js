'use strict';

(function () {
  // дополнительная формула для расчета положения пина(используется в другой формуле)

  var PIN_POSITION_FORMULA = (window.data.PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);

  // функция создания пина

  var renderPin = function (item) {

    // присваиваем переменной создание клона карточки используя произвольный объект для заполнения шаблона

    var getNewCard = window.card.renderCard(item);

    // выводит в дом карточку с описанием объявления + убирает дублирование открытой карточки в случае перехода от одной к другой

    var pinClickHandler = function () {
      // коллекция карточек с описанием объявления
      var cards = window.nodes.MAP.querySelectorAll('.map__card');
      // выводим карточку с описанием метки в dom
      if (cards.length > 0) {
        cards[0].remove();
      }
      window.nodes.MAP.appendChild(getNewCard);
    };

    // клонируем

    var pinElement = window.nodes.PIN_TEMPLATE.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    /* // ДЕЛЕГИРОВАНИЕ
    pinImage.className = 'target-img';
    var wrapperCLickHandler = function (evt) {
      if (evt.target.matches('.target-img')) {
        pinClickHandler();
      }
    };
    window.nodes.MAP.addEventListener('click', wrapperCLickHandler);*/
    pinImage.src = item.author.avatar;
    pinImage.alt = item.offer.title;
    pinElement.style.left = item.location.x - (window.data.PinPixelSize * window.data.NUMBER_FOR_COUNT) + 'px';
    pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
    pinElement.setAttribute('tabindex', '1');
    // при клике на пин показываем карточку с описанием
    pinElement.addEventListener('click', pinClickHandler);
    return pinElement;
  };

  // записываем во фрагмент пины

  var renderPins = function (items) {
    var fragment1 = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment1.appendChild(renderPin(item));
    });
    return fragment1;
  };

  // экспорт

  window.pin = {
    renderPins: renderPins
  };
}());
