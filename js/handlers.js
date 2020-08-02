'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var summarizeRenderPinsPlusAtiveSettings = function () {
    window.pin.requestData();
    window.map.startActivePageSettings();
  };

   var MainPinHandlersClass = {
    evt: ['click', 'keydown'],
    mainPin: window.nodes.MAIN_PIN,

    mainPinClickHandler: function (evt) {
      summarizeRenderPinsPlusAtiveSettings();
    },

    mainPinKeyDownHandler: function (evt) {
      if (evt.key === 'Enter') {
        summarizeRenderPinsPlusAtiveSettings();
      }
    }
  };

  var addHandlersToMainPin = function (mainPinClass) {
    mainPinClass.mainPin.addEventListener(mainPinClass.evt[0], mainPinClass.mainPinClickHandler);
    mainPinClass.mainPin.addEventListener(mainPinClass.evt[1], mainPinClass.mainPinKeyDownHandler);
  };

  var mainPinHandlers = () => addHandlersToMainPin(MainPinHandlersClass);

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
        // проверить после восстановления сервера
        /* var card = document.querySelector('.map__card');*/
       var card = window.nodes.MAP.querySelector('.map__card');
       card.remove();
    }
  };

  window.handlers = {
    mainPinHandlers: mainPinHandlers,
    debounce: debounce,
    windowScrollHandler: windowScrollHandler
  };

}());
