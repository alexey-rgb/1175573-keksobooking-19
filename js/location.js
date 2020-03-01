'use strict';

(function () {
// Ограничения рабочей области карты
  var LOCATION = {
    X_MIN: 0,
    X_MAX: document.querySelector('.map__overlay').offsetWidth,
    Y_MIN: 130,
    Y_MAX: 630
  };

  // Ограничения для перемещения главной метки

  var limitMainPin = {
    left: LOCATION.X_MIN - (window.nodes.MAIN_PIN.offsetWidth / 2),
    right: LOCATION.X_MAX - (window.nodes.MAIN_PIN.offsetWidth / 2),
    top: LOCATION.Y_MIN - window.nodes.MAIN_PIN.offsetHeight - window.data.Pin.PSEUDO,
    bottom: LOCATION.Y_MAX - window.nodes.MAIN_PIN.offsetHeight - window.data.Pin.PSEUDO
  };

  // Проверка области перемещения

  var checkLimitMainPinCoordinates = function () {
    // если выходит за пределы поля слева, то
    if (window.nodes.MAIN_PIN.offsetLeft <= limitMainPin.left) {
      window.nodes.MAIN_PIN.style.left = limitMainPin.left + 'px';
    }
    if (window.nodes.MAIN_PIN.offsetLeft >= limitMainPin.right) {
      window.nodes.MAIN_PIN.style.left = limitMainPin.right + 'px';
    }
    if (window.nodes.MAIN_PIN.offsetTop <= limitMainPin.top) {
      window.nodes.MAIN_PIN.style.top = limitMainPin.top + 'px';
    }
    if (window.nodes.MAIN_PIN.offsetTop >= limitMainPin.bottom) {
      window.nodes.MAIN_PIN.style.top = limitMainPin.bottom + 'px';
    }
  };

  // прослушка события на главной метке

  window.nodes.MAIN_PIN.addEventListener('mousedown', function (evt) {
    if (evt.buttons === 1) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mainPinMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.nodes.MAIN_PIN.style.left = window.nodes.MAIN_PIN.offsetLeft - shift.x + 'px';
        window.nodes.MAIN_PIN.style.top = window.nodes.MAIN_PIN.offsetTop - shift.y + 'px';

        checkLimitMainPinCoordinates();
        window.nodes.INPUT_ADDRESS.value = (window.nodes.MAIN_PIN.offsetTop - shift.y)
          + ',' + (window.nodes.MAIN_PIN.offsetLeft - shift.x);
      };

      var mainPinMouseUpHandler = function () {
        document.removeEventListener('mousemove', mainPinMouseMoveHandler);
        document.removeEventListener('mouseup', mainPinMouseUpHandler);
      };

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    }
  });
}());
