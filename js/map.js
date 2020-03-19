'use strict';

(function () {

  // общая функция содержит все состояния активной страницы.

  var startActivePageSettings = function () {
    // активируем форму
    window.nodes.FORM.classList.remove('ad-form--disabled');
    // активируем поля ввода
    window.form.setFieldsetCondition(window.nodes.FIELDSET, true);
    // показываем карту обявлений
    window.nodes.MAP.classList.remove('map--faded');
    // ФИЛЬТРАЦИЯ ПО ТИПУ ЖИЛЬЯ
    window.nodes.MAP.addEventListener('change', window.filter.filterFieldsClickHandler);
    // отслеживаем изменения и по необходимости изменяем подсказки в полях
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.inputGuestsChangeNumberHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.titleInputChangeHandler);
    // 1 способ синхронизации двух полей. рабочий
    window.nodes.TYPE.addEventListener('change', window.form.inputApartChangeTypeHandler);
    // изменяется время выезда гостей при изменение времени заезда и наоборот
    window.nodes.TIME_SELECTS.forEach(window.form.setTimeChangeHandler);
    // нажатие на кнопку -> форма очищается
    window.nodes.BUTTON_RESET_FORM.addEventListener('click', function () {
      window.nodes.FORM.reset();
    });
  };

  // функция активации страницы при клике на главный пин и на ENTER

  var activatePageWorking = function () {
    // активация страницы кликом
    window.nodes.MAIN_PIN.addEventListener('click', window.util.addMainPinHandler(startActivePageSettings,
      window.data.MouseKey.MIDDLE, window.data.MouseKey.RIGHT));
    // активация страницы с клавиатуры
    window.nodes.MAIN_PIN.addEventListener('keydown', window.util.addMainPinHandler(startActivePageSettings));
  };

  // активируем страницу
  activatePageWorking();

  // фиксируем адрес главного пина
  window.form.fixAddressValue();
}());
