'use strict';

(function () {

  // общая функция содержит все состояния активной страницы.

  var startActivePageSettings = function () {
    // присваиваем переменной функцию получения массива с объектами рандомных свойств
    var ads = window.data.mockData(window.data.OBJECT_NUMBER);
    // активируем форму
    window.nodes.FORM.classList.remove('ad-form--disabled');
    // активируем поля ввода
    window.form.setFieldsetCondition(window.nodes.FIELDSET, true);
    // выводим фрагмент c метками похожих объявлений в dom
    window.nodes.MAP.appendChild(window.pin.renderPins(ads));
    // показываем карту обявлений
    window.nodes.MAP.classList.remove('map--faded');
    // отслеживаем изменения и по необходимости изменяем подсказки в полях
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.inputGuestsChangeNumberHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.titleInputChangeHandler);
    // 1 способ синхронизации двух полей. рабочий
    window.nodes.TYPE.addEventListener('change', window.form.inputApartChangeTypeHandler);
    // изменяется время выезда гостей при изменение времени заезда и наоборот
    window.nodes.TIME_SELECTS.forEach(window.form.setTimeChangeHandler);
  };

  var activatePageWorking = function () {
    var flag = true;
    // функция активации страницы при клике на главный пин и на ENTER

    var mainPinClickHandler = function (evt) {
      if (flag) {
        window.nodes.MAIN_PIN.removeEventListener('mousedown', mainPinClickHandler);
        window.nodes.MAIN_PIN.removeEventListener('keydown', mainPinKeyDownHandler);
      }
      if (evt.button === window.data.MouseKey.MIDDLE || evt.button === window.data.MouseKey.RIGHT) {
        window.nodes.MAIN_PIN.disable();
      }
      startActivePageSettings();
      window.nodes.POPUP_PHOTO.hidden = true;
    };

    var mainPinKeyDownHandler = function (evt) {
      if (flag) {
        window.nodes.MAIN_PIN.removeEventListener('mousedown', mainPinClickHandler);
        window.nodes.MAIN_PIN.removeEventListener('keydown', mainPinKeyDownHandler);
      }
      if (evt.key === 'Enter') {
        startActivePageSettings();
      }
    };

    // активация страницы кликом
    window.nodes.MAIN_PIN.addEventListener('mousedown', mainPinClickHandler);
    // активация страницы с клавиатуры
    window.nodes.MAIN_PIN.addEventListener('keydown', mainPinKeyDownHandler);
  };

  // активируем страницу
  activatePageWorking();

  // фиксируем адрес главного пина

  window.form.fixAddressValue();
}());
