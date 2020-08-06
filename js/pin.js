"use strict";

(function () {
  // используем, что бы нарезать нужное количество объявлений, полученных с сервера
  // в соответствии с тз

  var IndexCard = {
    FROM: 0,
    TO: 5,
  };

  var COUNTERS = [];

  // хранит данные с бэкенда

  var copyServerResponse = [];

  var PIN_POSITION_FORMULA =
    window.data.PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT;

  // позволяет передавать/снимать подсветку(css) активного пина другому пину,
  // то есть активный пин с оранжевой подсветкой будет всегда один

  var toggleActiveClass = function (node, clone) {
    if (COUNTERS.includes("")) {
      node.classList.remove("map__pin--active");
      COUNTERS.pop();
    }
    clone.classList.add("map__pin--active");
    COUNTERS.push("");
  };

  // на основе шаблона создаётся будущий пин, с добавлением атрибутов, обработчика и его положения на карте

  var preparePin = function (item) {
    var getNewCard = window.card.renderCard(item);
    var pinClickHandler = function () {
      var ACTIVE_PIN = document.querySelector(".map__pin--active");
      var cards = window.nodes.MAP.querySelectorAll(".map__card");
      if (cards.length > 0) {
        cards[0].remove();
      }
      window.nodes.MAP.appendChild(getNewCard);
      toggleActiveClass(ACTIVE_PIN, pinElement);
    };
    var pinElement = window.nodes.PIN_TEMPLATE.cloneNode(true);
    var pinImage = pinElement.querySelector("img");
    pinImage.src = item.author.avatar;
    pinImage.alt = item.offer.title;
    pinElement.style.left =
      item.location.x -
      window.data.PinPixelSize * window.data.NUMBER_FOR_COUNT +
      "px";
    pinElement.style.top =
      "calc(" + item.location.y + "px + " + -PIN_POSITION_FORMULA * 2 + "%)";
    pinElement.setAttribute("tabindex", "1");
    pinElement.addEventListener("click", pinClickHandler);
    return pinElement;
  };

  // собирает будущие пины во фрагмент

  var addFuturePinsToFragment = function (items) {
    var fragment1 = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment1.appendChild(preparePin(item));
    });
    return fragment1;
  };

  // рендерит отфильтрованные пользователем пины/метки в дом

  var renderFilteredPins = function () {
    window.nodes.MAP.appendChild(
      window.pin.renderPins(window.filter.filterOffers(copyServerResponse))
    );
  };

  // рендерит пины/метки в дом

  var renderPins = function (items, index1, index2) {
    copyServerResponse = items.slice();
    window.nodes.MAP.appendChild(
      window.pin.renderPins(copyServerResponse.slice(index1, index2))
    );
  };

  // запрашивает данные с сервера, передаёт шаблон сообщения об ошибке,
  // в случае проблем с ответом

  var requestData = function () {
    var PIN = document.querySelector('button[type="button"]');
    // проверка необходима, что главная метка не реагировала на повторный клик
    if (!PIN) {
      window.backend.loadCards(
        renderPins,
        window.message.insertErrorMessage,
        window.backend.Url.GET
      );
    }
  };

  /*************************Version with fake data(if server down)*************************************** */

  /*   var renderPins = function (items, index1, index2) {
    copyServerResponse = items.slice();
    window.nodes.MAP.appendChild(
      window.pin.renderPins(copyServerResponse.slice(index1, index2))
    );
  };

  var requestData = function () {
    var PIN = document.querySelector('button[type="button"]');
    // проверка необходима, что главная метка не реагировала на повторный клик

    if (!PIN) {
      renderPins(window.database.apartsDesc, IndexCard.FROM, IndexCard.TO); //window.message.insertErrorMessage, window.backend.Url.GET);
    }
  }; */

  /******************************************************************** */

  // 1. устанавливает некоторые настройки полям ввода
  // после активизации страницы, через клик по главной метке
  // 2. lfyyst

  function addMainPinHandlerAndSetFieldGuests() {
    window.form.inputGuestsChangeNumberHandler();
    window.handlers.mainPinHandlers();
  }

  var loadDataHandler = () => addMainPinHandlerAndSetFieldGuests();

  window.pin = {
    renderPins: addFuturePinsToFragment,
    COUNTERS: COUNTERS,
    renderFilteredPins: renderFilteredPins,
    loadDataHandler: loadDataHandler,
    requestData: requestData,
  };
})();
