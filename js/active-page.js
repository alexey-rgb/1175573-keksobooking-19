'use strict';

(function () {
  // общая функция содержит все состояния активной страницы.

  var activePage = function () {
    // присваиваем переменной функцию получения массива с объектами рандомных свойств
    var ads = window.renderCard.mockData(window.data.OBJECT_NUMBER);
    // активируем форму
    window.nodes.FORM.classList.remove('ad-form--disabled');
    // активируем поля ввода
    window.nodes.FIELDSET.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    // выводим фрагмент c метками похожих объявлений в dom
    window.nodes.MAP.appendChild(window.renderPins.renderPins(ads));
    // показываем карту обявлений
    window.nodes.MAP.classList.remove('map--faded');
    // отслеживаем изменения и по необходимости изменяем подсказки в полях
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.inputGuestsChangeNumberHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.titleInputChangeHandler);
    // 1 способ синхронизации двух полей. рабочий
    window.nodes.TYPE.addEventListener('change', window.form.inputApartChangeTypeHandler);
    // изменяется время выезда гостей при изменение времени заезда и наоборот
    window.nodes.TIME_SELECTS.forEach(window.form.setTimeChangeHandler);
    // присваиваем координаты полю с адресом
    // window.nodes.INPUT_ADDRESS.setAttribute('value', window.form.MAIN_PIN_POSITION + '');
  };

  var activatePageWorking = function () {
    // функция активации страницы при клике на главный пин и на ENTER

    var mainPinClickHandler = function (evt) {
      if (evt.button === window.data.MouseKey.MIDDLE || evt.button === window.data.MouseKey.RIGHT) {
        window.nodes.MAIN_PIN.disable();
      }
      activePage();
      window.nodes.POPUP_PHOTO.hidden = true;
    };

    var mainPinKeyDownHandler = function (evt) {
      if (evt.key === 'Enter') {
        activePage();
      }
    };
    // активация страницы кликом
    window.nodes.MAIN_PIN.addEventListener('mousedown', mainPinClickHandler);
    // активация страницы с клавиатуры
    window.nodes.MAIN_PIN.addEventListener('keydown', mainPinKeyDownHandler);
  };

  window.activePage = {
    // активация страницы

    // создаем функции, для получения прозвольных значений свойств объекта(описание объявления)

    getRandomItem: function (arr) {
      return arr[window.renderCard.getRandomBetween(0, arr.length - 1)];
    },
    // Получение произвольного массива методом filter c проверкой

    getRandomItems2: function (arr) {
      var getRandomNumber = function () {
        return window.renderCard.getRandomBetween(0, 2);
      };
      var randomArr = arr.filter(getRandomNumber);
      if (randomArr.length === 0) {
        randomArr.push(arr[window.renderCard.getRandomBetween(0, arr.length - 1)]);
      }
      return randomArr;
    }
  };
  activatePageWorking();
  window.form.fixAddressValueAndBlockFieldset();
}());
