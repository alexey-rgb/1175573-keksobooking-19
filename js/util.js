'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomItem = function (items) {
    return items[getRandomBetween(0, items.length - 1)];
  };

  var getRandomNumber = function () {
    return getRandomBetween(0, 2);
  };

  var getRandomItems = function (items) {
    var randomItems = items.filter(getRandomNumber);
    if (randomItems.length === 0) {
      randomItems.push(items[getRandomBetween(0, items.length - 1)]);
    }
    return randomItems;
  };



  window.util = {
    getRandomItem: getRandomItem,
    getRandomItems: getRandomItems,
    getRandomBetween: getRandomBetween
  };
}());
