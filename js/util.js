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
    return mainPinClickHandler('click', window.nodes.MAIN_PIN.disable, fun,
      MouseKey1, MouseKey2);
  };

  var addMainPinKeyHandler = function (func) {
    return mainPinKeyDownHandler('keydown', func);
  };

  var mainPinHandlers = function (renderCards) {
    return addHandlers(window.nodes.MAIN_PIN, 'click', 'keydown',
      addMainPinHandler(renderCards, window.data.MouseKey.MIDDLE, window.data.MouseKey.RIGHT),
      addMainPinKeyHandler(renderCards));
  };

  var disableElement = function () {
    return window.nodes.MAIN_PIN.setAttribute('disabled', 'disabled');
  };

  window.util = {
    getRandomItem: getRandomItem,
    getRandomItems2: getRandomItems2,
    getRandomBetween: getRandomBetween,
    addHandlers: addHandlers,
    addMainPinHandler: addMainPinHandler,
    addMainPinKeyHandler: addMainPinKeyHandler,
    mainPinHandlers: mainPinHandlers,
    disableElement: disableElement
  };
}());
