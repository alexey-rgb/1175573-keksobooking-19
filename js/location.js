'use strict';

(function () {

  var MAP_WRAPPER = document.querySelector('.map__overlay');

  var getMapWidth = function () {
    return MAP_WRAPPER.offsetWidth;
  };

  var mainPinSize = {
    getMainPinWidth: function () {
      return window.nodes.MAIN_PIN.offsetWidth;
    },
    getMainPinHeight: function () {
      return window.nodes.MAIN_PIN.offsetHeight;
    }
  };

  Object.freeze(mainPinSize);

  var LOCATION = {
    X_MIN: 0,
    X_MAX: getMapWidth(),
    Y_MIN: 130,
    Y_MAX: 630
  };

  var getHalfSizeMainPin = function () {
   return mainPinSize.getMainPinWidth() / 2;
  };

  var getMainPinSizeMinusPseudoElSize = function () {
    return mainPinSize.getMainPinHeight() - window.data.Pin.PSEUDO;
  };

  var LimitMainPinCoordinate = {
    LEFT: LOCATION.X_MIN - getHalfSizeMainPin(),
    RIGHT: LOCATION.X_MAX - getHalfSizeMainPin(),
    TOP: LOCATION.Y_MIN - getMainPinSizeMinusPseudoElSize(),
    BOTTOM: LOCATION.Y_MAX - getMainPinSizeMinusPseudoElSize()
  };

  var Coordinates = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coordinates.prototype.setXY = function (x, y) {
    this.x = x;
    this.y = y;
  };

  // в переменной будут храниться актуальные координаты пина в случае равенства текущих координат
  // и лимитов перемещения метки

    var resultEquality;

  // возвращает актуальные координаты в случае если текущие координаты и лимиты перемещения равны

    var setPositionEquality = function (currentPosition, limitPosition1, limitPosition2) {
    if (currentPosition === limitPosition1 || currentPosition === limitPosition2) {
      resultEquality = currentPosition + 'px';
    }
    return resultEquality;
  };

  // Прототип - возвращает актуальные координаты(X/Y) в случае если текущие координаты выходят за лимиты перемещения
  // или равенства этих значений

  var EqualityPosition = {

    constructor: function (limitPosition1, limitPosition2) {
      this.limit1 = limitPosition1;
      this.limit2 = limitPosition2;
      return this;
    },
    setPosition(currentPosition) {
      if (currentPosition < this.limit1) {
        return this.limit1 + 'px';
      } else if (currentPosition > this.limit2) {
        return this.limit2 + 'px';
      }
       setPositionEquality(currentPosition, this.limit1, this.limit2);
    }
  };

  // создаем потомков для описания позиции главной метки по X/Y, в случае ее выхода за лимиты или в случае равенства значений.

  var getLeftPosition = Object.create(EqualityPosition);
  var getTopPosition = Object.create(EqualityPosition);

  // записываем лимиты на перемещение главной метки в объекты-копии

  getLeftPosition.constructor(LimitMainPinCoordinate.LEFT, LimitMainPinCoordinate.RIGHT);
  getTopPosition.constructor(LimitMainPinCoordinate.TOP, LimitMainPinCoordinate.BOTTOM);

  // записывает актуальные координаты в css, в случае выхода метки за пределы лимита или равенства значений.

  var checkLimitMainPinCoordinates = function (leftPosition, topPosition) {
    window.nodes.MAIN_PIN.style.left = getLeftPosition.setPosition(leftPosition);
    window.nodes.MAIN_PIN.style.top = getTopPosition.setPosition(topPosition);
  };

  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      evt.preventDefault();

      var startCoordinates = new Coordinates(evt.clientX, evt.clientY);

      var mainPinMouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = new Coordinates(startCoordinates.x - moveEvt.clientX, startCoordinates.y - moveEvt.clientY);

        startCoordinates.setXY(moveEvt.clientX, moveEvt.clientY);

         window.nodes.MAIN_PIN.style.left = window.nodes.MAIN_PIN.offsetLeft - shift.x + 'px';
        window.nodes.MAIN_PIN.style.top = window.nodes.MAIN_PIN.offsetTop - shift.y + 'px';

        // вызов функции , которая записывает актуальные координаты в css, в случае выхода метки за пределы лимита или равенства.

         checkLimitMainPinCoordinates(window.nodes.MAIN_PIN.offsetLeft - shift.x,
          window.nodes.MAIN_PIN.offsetTop - shift.y);

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

  window.nodes.MAIN_PIN.addEventListener('mousedown', mainPinMouseDownHandler);

}());
