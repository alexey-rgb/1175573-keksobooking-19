'use strict';

(function () {
  // дополнительная формула для расчета положения пина(используется в другой формуле)

  var PIN_POSITION_FORMULA = (window.data.PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);

  // функция создания пина

  var renderPin = function (item) {

    // присваиваем переменной создание клона карточки используя произвольный объект для заполнения шаблона

    var getNewCard = window.card.renderCard(item);

    var pinClickHandler = function () {
      // коллекция карточек с описанием объявления
      var cards = window.nodes.MAP.querySelectorAll('.map__card');
      // карточка с описанием объявления
      var card = window.nodes.MAP.querySelector('.map__card');
      // выводим карточку с описанием метки в dom
      if (cards.length > 0) {
        card.remove();
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
    pinImage.src = item.avatar;
    pinImage.alt = item.title;
    pinElement.style.left = (item.location.x) + (-PIN_POSITION_FORMULA) + '%';
    pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
    pinElement.setAttribute('tabindex', '1');
    // при клике на пин показываем карточку с описанием
    pinElement.addEventListener('click', pinClickHandler);
    return pinElement;
  };

  // записываем во фрагмент пины

  var renderPins = function (mocks) {
    var fragment1 = document.createDocumentFragment();
    mocks.forEach(function (item) {
      fragment1.appendChild(renderPin(item));
    });
    return fragment1;
  };

  // экспорт

  window.pin = {
    renderPins: renderPins
  };
}());
