'use strict';

(function () {
  // размер пина в процентах

  var PIN_PERCENT_SIZE = (window.data.Pin.PIXEL_SIZE * window.data.MaxMapWidth.PERCENT) / window.data.MaxMapWidth.PIXEL;

  // дополнительная формула для расчета положения пина(используется в другой формуле)

  var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);

  // функция создания пина

  var renderPin = function (item) {

    // присваиваем переменной создание клона карточки используя произвольный объект для заполнения шаблона

    var mock = window.renderCard.renderCard(item);

    var pinClickHandler = function () {
      // выводим карточку с описанием метки в dom

      if (window.nodes.MAP.querySelectorAll('.map__card').length > 0) {
        window.nodes.MAP.querySelector('.map__card').remove();
      }
      window.nodes.MAP.appendChild(mock);
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
    var target = renderPin;
    var fragment1 = document.createDocumentFragment();
    mocks.forEach(function (item) {
      fragment1.appendChild(target(item));
    });
    return fragment1;
  };

  // экспорт

  window.renderPins = {
    renderPins: renderPins
  };
}());
