'use strict';

(function () {
  window.nodes.MAIN_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // ширина видимой области просмотра (для всех браузеров)
      var widthContentArea1 = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
      // высота видимой области просмотра (для всех браузеров)
      var heightContentArea1 = window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight;

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (widthContentArea1 && heightContentArea1) {
        window.nodes.MAIN_PIN.style.top = window.nodes.MAIN_PIN.offsetTop - shift.y + 'px';
        window.nodes.MAIN_PIN.style.left = window.nodes.MAIN_PIN.offsetLeft - shift.x + 'px';
      }
      var MAIN_PIN_POSITION_CURRENT = (window.nodes.MAIN_PIN.offsetTop - shift.y) + ',' + (window.nodes.MAIN_PIN.offsetLeft - shift.x);
      window.fixAddressValue2 = function () {
        window.nodes.INPUT_ADDRESS.setAttribute('value', MAIN_PIN_POSITION_CURRENT + '');
      };
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var inputFileClickHandler = function (clickEvt) {
          clickEvt.preventDefault();
          window.nodes.MAIN_PIN.removeEventListener('click', inputFileClickHandler);
        };
      }
      window.nodes.MAIN_PIN.addEventListener('click', inputFileClickHandler);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // функция создания пина
  var renderPin = function (item) {
    var PIN_PERCENT_SIZE = (window.data.Pin.PIXEL_SIZE * window.data.MaxMapWidth.PERCENT) / window.data.MaxMapWidth.PIXEL;
    var PIN_POSITION_FORMULA = (PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);
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
  window.renderPins = {
    // записываем во фрагмент пины

    renderPins: function (mockArr) {
      var target = renderPin;
      var fragment1 = document.createDocumentFragment();
      mockArr.forEach(function (item) {
        fragment1.appendChild(target(item));
      });
      return fragment1;
    }
  };
  window.fixAddressValue2();
}());
