'use strict';

(function () {

  var MAP_WRAPPER = document.querySelector('.map__overlay');

  var getMapWidth = function () {
    return MAP_WRAPPER.offsetWidth;
  };

  var enumList = {
    getMainPinWidth: function () {
      return window.nodes.MAIN_PIN.offsetWidth;
    },
    getMainPinHeight: function () {
      return window.nodes.MAIN_PIN.offsetHeight;
    }
  };

  Object.freeze(enumList);

  // Ограничения рабочей области карты

  var LOCATION = {
    X_MIN: 0,
    X_MAX: getMapWidth(),
    Y_MIN: 130,
    Y_MAX: 630
  };

  // Ограничения для перемещения главной метки

  var limitMainPin = {
    left: LOCATION.X_MIN - (enumList.getMainPinWidth() / 2),
    right: LOCATION.X_MAX - (enumList.getMainPinWidth() / 2),
    top: LOCATION.Y_MIN - enumList.getMainPinHeight() - window.data.Pin.PSEUDO,
    bottom: LOCATION.Y_MAX - enumList.getMainPinHeight() - window.data.Pin.PSEUDO
  };

  // Проверка области перемещения

  var getLeftPosition = function () {
    var result;
    if (window.nodes.MAIN_PIN.offsetLeft < limitMainPin.left) {
      result = limitMainPin.left + 'px';
    }
    if (window.nodes.MAIN_PIN.offsetLeft > limitMainPin.right) {
      result = limitMainPin.right + 'px';
    }
    return result;
  };

  var getTopPosition = function () {
    var result;
    if (window.nodes.MAIN_PIN.offsetTop < limitMainPin.top) {
      result = limitMainPin.top + 'px';
    }
    if (window.nodes.MAIN_PIN.offsetTop > limitMainPin.bottom) {
      result = limitMainPin.bottom + 'px';
    }
    return result;
  };

  var checkLimitMainPinCoordinates = function (leftPosition, topPosition) {
    window.nodes.MAIN_PIN.style.left = getLeftPosition(leftPosition);
    window.nodes.MAIN_PIN.style.top = getTopPosition(topPosition);
  };

  var mainPinMouseDownHandler = function (evt) {
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

        checkLimitMainPinCoordinates(window.nodes.MAIN_PIN.offsetLeft, window.nodes.MAIN_PIN.offsetTop);
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
  };

  // прослушка события на главной метке

  window.nodes.MAIN_PIN.addEventListener('mousedown', mainPinMouseDownHandler);
}());
