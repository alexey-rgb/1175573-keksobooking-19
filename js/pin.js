'use strict';

(function () {

  var PIN_POSITION_FORMULA = (window.data.PIN_PERCENT_SIZE * window.data.NUMBER_FOR_COUNT);

  var renderPin = function (item) {

    var getNewCard = window.card.renderCard(item);

    var pinClickHandler = function () {
      var cards = window.nodes.MAP.querySelectorAll('.map__card');
      if (cards.length > 0) {
        cards[0].remove();
      }
      pinElement.classList.add('map__pin--active');
      window.nodes.MAP.appendChild(getNewCard);
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

  window.pin = {
    renderPins: renderPins
  };
}());
