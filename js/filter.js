'use strict';

(function () {

  var Nodes = {
    HOUSING_TYPE: document.querySelector('#housing-type'),
    HOUSING_PRICE: document.querySelector('#housing-price'),
    HOUSING_ROOMS: document.querySelector('#housing-rooms'),
    HOUSING_GUESTS: document.querySelector('#housing-guests')
  };

  var HOUSING_TYPE_VALUE = 'any';

  var IndexCard = {
    FROM: 0,
    TO: 5
  };

  var getSliceData = function (items, index1, index2) {
    return items.slice(index1, index2);
  };

  var filterByTypeApart = function (serverResponse) {
    return serverResponse.filter(function (data) {
      return (Nodes.HOUSING_TYPE.value === HOUSING_TYPE_VALUE) ? data : data.offer.type === Nodes.HOUSING_TYPE.value;
    }).slice(IndexCard.FROM, IndexCard.TO);
  };

  /* var filterByCost = function () {

   };*/

  var filterFieldsClickHandler = function (evt) {
    var CARDS = window.nodes.MAP.querySelectorAll('.map__card');
    window.util.disableElement();
    if (CARDS.length > 0) {
      CARDS[0].remove();
    }
    return window.data.startRenderFilteredPins(evt);
  };

  window.filter = {
    getSliceData: getSliceData,
    HOUSING_TYPE: Nodes.HOUSING_TYPE,
    filterByTypeApart: filterByTypeApart,
    // filterByCost: filterByCost,
    filterFieldsClickHandler: filterFieldsClickHandler,
  };
}());
