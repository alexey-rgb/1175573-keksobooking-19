'use strict';

(function () {

  var startActivePageSettings = function () {
    window.nodes.FORM.classList.remove('ad-form--disabled');
    window.form.setFieldsetCondition(window.nodes.FIELDSET, true);
    window.nodes.MAP.classList.remove('map--faded');
    window.filter.Nodes.FILTER_CONTAINER.addEventListener('change', window.filter.filterClickHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.inputGuestsChangeNumberHandler2);
    window.nodes.ROOM_NUMBER.addEventListener('change', window.form.inputGuestsChangeNumberHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.titleInputChangeHandler);
    window.nodes.TYPE.addEventListener('change', window.form.inputApartChangeTypeHandler);
    window.nodes.TIME_SELECTS.forEach(window.form.setTimeChangeHandler);
    window.nodes.BUTTON_RESET_FORM.addEventListener('click', function () {
      window.nodes.FORM.reset();
      window.filter.setDefaultFiltersValue();
    });
  };

  var activatePageWorking = function () {
    // активация страницы кликом
    window.nodes.MAIN_PIN.addEventListener('click', window.util.addMainPinHandler(startActivePageSettings,
      window.data.MouseKey.MIDDLE, window.data.MouseKey.RIGHT));
    // активация страницы с клавиатуры
    window.nodes.MAIN_PIN.addEventListener('keydown', window.util.addMainPinHandler(startActivePageSettings));
  };

  activatePageWorking();

  window.form.fixAddressValue();
}());
