'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var addHandlers = function (nodes, evt1, evt2, func1, func2) {
    nodes.addEventListener(evt1, func1);
    // активация страницы с клавиатуры
    nodes.addEventListener(evt2, func2);
  };

  var mainPinClickHandler = function (evt, func1, func2, MouseKey1, MouseKey2) {
    if (evt.button === MouseKey1 || evt.button === MouseKey2) {
      return func1;
    }
    return func2;
  };

  var mainPinKeyDownHandler = function (evt, func) {
    if (evt.key === 'Enter') {
      func();
    }
  };

  var addMainPinHandler = function (fun, MouseKey1, MouseKey2) {
    return mainPinClickHandler('click', window.nodes.MAIN_PIN.disable, fun, MouseKey1, MouseKey2);
  };

  var addMainPinKeyHandler = function (func) {
    return mainPinKeyDownHandler('keydown', func);
  };

  var mainPinHandlers = function (renderCards) {
    return addHandlers(window.nodes.MAIN_PIN, 'click', 'keydown',
      addMainPinHandler(renderCards, window.data.MouseKey.MIDDLE, window.data.MouseKey.RIGHT),
      addMainPinKeyHandler(renderCards));
  };

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var windowScrollHandler = function () {
    if (window.scrollY === 500) {
      var card = document.querySelector('.map__card');
      card.remove();
    }
  };

  window.handlers = {
    addMainPinHandler: addMainPinHandler,
    addMainPinKeyHandler: addMainPinKeyHandler,
    mainPinHandlers: mainPinHandlers,
    debounce: debounce,
    windowScrollHandler: windowScrollHandler
  };
}());

