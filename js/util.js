'use strict';

(function () {

  var getRandomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

  var getRandomItem = function (items) {
    return items[getRandomBetween(0, items.length - 1)];
  };

  var getRandomNumber = function () {
    return getRandomBetween(0, 2);
  };

  // Получение произвольного массива методом filter c проверкой

  var getRandomItems2 = function (items) {
    var randomItems = items.filter(getRandomNumber);
    if (randomItems.length === 0) {
      randomItems.push(items[getRandomBetween(0, items.length - 1)]);
    }
    return randomItems;
  };
  window.util = {
    getRandomItem: getRandomItem,
    getRandomItems2: getRandomItems2,
    getRandomBetween: getRandomBetween
  };
}());
