'use strict';

(function () {

  var Nodes = {
    FEATURES: document.querySelector('#housing-features'),
    FILTERS: document.querySelectorAll('.map__filter, input[type="checkbox"]'),
    FILTER_CONTAINER: document.querySelector('.map__filters-container'),
    HOUSING_TYPE: document.querySelector('#housing-type'),
    HOUSING_PRICE: document.querySelector('#housing-price'),
    HOUSING_ROOMS: document.querySelector('#housing-rooms'),
    HOUSING_GUESTS: document.querySelector('#housing-guests')
  };

  var DEFAULT_VALUE = 'any';

  var IndexCard = {
    FROM: 0,
    TO: 5
  };

  var PriceRange = {
    LOW: 10000,
    HIGH: 50000
  };

  var PriceLevel = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  var getDataSlice = function (items, index1, index2) {
    return items.slice(index1, index2);
  };

  var rangePrice = function (value) {
    if (value <= PriceRange.LOW) {
      return PriceLevel.LOW;
    } else if (value > PriceRange.HIGH) {
      return PriceLevel.HIGH;
    }
    return PriceLevel.MIDDLE;
  };

  var filteredByGuestsNumber = function (data) {
    return Nodes.HOUSING_GUESTS.value === DEFAULT_VALUE ? data : String(data.offer.guests) === Nodes.HOUSING_GUESTS.value;
  };

  var filteredByRoomsNumber = function (data) {
    return Nodes.HOUSING_ROOMS.value === DEFAULT_VALUE ? data : String(data.offer.rooms) === Nodes.HOUSING_ROOMS.value;
  };

  var filteredByCost = function (data) {
    return Nodes.HOUSING_PRICE.value === DEFAULT_VALUE ? data : rangePrice(data.offer.price) === Nodes.HOUSING_PRICE.value;
  };

  var filteredByTypeApart = function (data) {
    return Nodes.HOUSING_TYPE.value === DEFAULT_VALUE ? data : data.offer.type === Nodes.HOUSING_TYPE.value;
  };

  var getActiveCheckboxes = function () {
    var activeCheckboxes = [];
    var activeCheckboxesList = document.querySelectorAll('input:checked');
    activeCheckboxesList.forEach(function (checkbox) {
      activeCheckboxes.push(checkbox.value);
    });
    return activeCheckboxes;
  };

  var compareFeatures = function (arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      if (!arr1.includes(arr2[i])) {
        return false;
      }
    }
    return true;
  };

 /* var arr1 = ['1', '2', '3'];

  var arr2 = [];

  console.log(arr2.length);

  console.log(compareFeatures(arr1, arr2));


  console.log(arr1.includes(''));*/

  var filteredByFeatures = function (data) {
    return compareFeatures(data.offer.features, getActiveCheckboxes());
  };

  var filterOffers = function (serverResponse) {
    return getDataSlice(serverResponse.filter(function (data) {
      return filteredByTypeApart(data) && filteredByCost(data) && filteredByRoomsNumber(data) && filteredByGuestsNumber(data)
        && filteredByFeatures(data);
    }), IndexCard.FROM, IndexCard.TO);
  };

  var filterClickHandler = function (evt) {
    var CARDS = window.nodes.MAP.querySelectorAll('.map__card');
    window.util.disableElement(window.nodes.MAIN_PIN);
    if (CARDS.length > 0) {
      CARDS[0].remove();
    }
    return window.data.startRenderFilteredPins(evt);
  };

  window.filter = {
    getDataSlice: getDataSlice,
    filteredByTypeApart: filteredByTypeApart,
    filteredByCost: filteredByCost,
    filterClickHandler: filterClickHandler,
    Nodes: Nodes,
    filterOffers: filterOffers
  };
}());
