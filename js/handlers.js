"use strict";

(function () {
  var DEBOUNCE_INTERVAL = 500;

  // при клике по главному пину:

  var summarizeRenderPinsPlusAtiveSettings = function () {

    // 1. получает данные с сервера и передаёт их в функцию рендера
    window.pin.requestData();

    // 2. активирует все базовые настройки страницы, выводит её из 'спящего' режима
    window.map.startActivePageSettings();
  };

  // данные для управления главным/центральным пином

  var MainPinHandlersClass = {
    evt: ["click", "keydown"],
    mainPin: window.nodes.MAIN_PIN,

    mainPinClickHandler: function () {
      summarizeRenderPinsPlusAtiveSettings();
    },

    mainPinKeyDownHandler: function (evt) {
      if (evt.key === "Enter") {
        summarizeRenderPinsPlusAtiveSettings();
      }
    },
  };

  // добавляет обработчик для разных событий на главной метке

  var addHandlersToMainPin = function (mainPinClass) {
    mainPinClass.mainPin.addEventListener(
      mainPinClass.evt[0],
      mainPinClass.mainPinClickHandler
    );
    mainPinClass.mainPin.addEventListener(
      mainPinClass.evt[1],
      mainPinClass.mainPinKeyDownHandler
    );
  };

  // обёртка, для предыдущей функ-ии, позволяет передать аргумент в обработчик, не вызывая его мгновенно

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

  // при скролле страницы вниз, закрывается карточка с описанием недвижимости

  var windowScrollHandler = function () {
    if (window.scrollY === 500 && document.querySelector(".popup")) {
      var card = window.nodes.MAP.querySelector(".map__card");
      card.remove();
    }
  };

  window.handlers = {
    mainPinHandlers: mainPinHandlers,
    debounce: debounce,
    windowScrollHandler: windowScrollHandler,
  };
})();
