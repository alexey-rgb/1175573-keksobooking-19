'use strict';

(function () {

  var COUNTERS = [];

  var copyServerResponse = [];

  var PIN_POSITION_FORMULA = (window.data.PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);

  // позволяет передавать/снимать подсветку(css) активного пина другому пину, в случае клика по нему.

  var toggleActiveClass = function (node, clone) {
    if (COUNTERS.includes('')) {
      node.classList.remove('map__pin--active');
      COUNTERS.pop();
    }
    clone.classList.add('map__pin--active');
    COUNTERS.push('');
  };

  var renderPin = function (item) {
    var getNewCard = window.card.renderCard(item);
    var pinClickHandler = function () {
      window.ACTIVE_PIN = document.querySelector('.map__pin--active');
      var cards = window.nodes.MAP.querySelectorAll('.map__card');
      if (cards.length > 0) {
        cards[0].remove();
      }
      window.nodes.MAP.appendChild(getNewCard);
      toggleActiveClass(window.ACTIVE_PIN, pinElement);
    };
    var pinElement = window.nodes.PIN_TEMPLATE.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinImage.src = item.author.avatar;
    pinImage.alt = item.offer.title;
    pinElement.style.left = item.location.x - (window.data.PinPixelSize * window.data.NUMBER_FOR_COUNT) + 'px';
    pinElement.style.top = 'calc(' + (item.location.y) + 'px + ' + (-PIN_POSITION_FORMULA * 2) + '%)';
    pinElement.setAttribute('tabindex', '1');
    pinElement.addEventListener('click', pinClickHandler);
    return pinElement;
  };

  var renderPins = function (items) {
    var fragment1 = document.createDocumentFragment();
    items.forEach(function (item) {
      fragment1.appendChild(renderPin(item));
    });
    return fragment1;
  };

  var renderFilteredPins = function () {
    window.nodes.MAP.appendChild(window.pin.renderPins(window.filter.filterOffers(copyServerResponse)));
  };

  var getRenderPins = function (items, index1, index2) {
    copyServerResponse = items.slice();
    window.nodes.MAP.appendChild(window.pin.renderPins(copyServerResponse.slice(index1, index2)));
  };


   var requestData = function () {
    var PIN = document.querySelector('button[type="button"]');
    // проверка необходима, что главная метка не реагировала на повторный клик
    if (!PIN) {
      window.backend.loadCards(getRenderPins, window.message.insertErrorMessage, window.backend.Url.GET);
    }
  };

  function setRenderOffers(dataRequest) {
    window.form.inputGuestsChangeNumberHandler();
    window.handlers.mainPinHandlers(dataRequest);
  }

  var loadDataHandler = () => setRenderOffers(requestData);

  window.pin = {
    renderPins: renderPins,
    COUNTERS: COUNTERS,
    renderFilteredPins: renderFilteredPins,
    loadDataHandler: loadDataHandler
  };
}());
