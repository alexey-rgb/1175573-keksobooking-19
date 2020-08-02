'use strict';

(function () {

  // Проверить после восстановления сервера

  var StartMainPinCoordinates = {
    Y: 375,
    X: 570
  }

  var startActivePageSettings = function () {
    window.nodes.FORM.classList.remove('ad-form--disabled');
    window.form.setFieldsetCondition(window.nodes.FIELDSET, true);
    window.nodes.MAP.classList.remove('map--faded');
    window.filter.Nodes.FILTER_CONTAINER.addEventListener('change', window.filter.filterClickHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.buttonClickHandler);
    window.nodes.BUTTON_SUBMIT.addEventListener('click', window.form.titleInputChangeHandler);
    window.nodes.ROOM_NUMBER.addEventListener('change', window.form.inputGuestsChangeNumberHandler);
    window.nodes.TYPE.addEventListener('change', window.form.inputApartChangeTypeHandler);
    window.nodes.TIME_SELECTS.forEach(window.form.setTimeChangeHandler);
    window.nodes.BUTTON_RESET_FORM.addEventListener('click', window.form.buttonResetHandler);
    window.addEventListener('scroll', window.handlers.windowScrollHandler);
    // устанавливает обработчики на загрузчиках изображений пользователя
    window.prewieInstallImages.addHandlers(true);
  };

  var afterSuccessMessageSettings = function () {
    // Проверить после востановления сервера
    var BUTTONS = window.nodes.MAP.querySelectorAll('button[type="button"]');
    /*var BUTTONS = document.querySelectorAll('button[type="button"]');*/
    window.nodes.FORM.reset();
    window.nodes.FORM.classList.add('ad-form--disabled');
    window.form.setFieldsetCondition(window.nodes.FIELDSET, false);
    window.nodes.MAP.classList.add('map--faded');
    BUTTONS.forEach(function (button) {
      button.remove();
    });
    // Проверить после восстановления сервера
    window.nodes.MAIN_PIN.style = 'left: ' + StartMainPinCoordinates.X
      + 'px; top: ' + StartMainPinCoordinates.Y + 'px;';
    window.filter.setDefaultFiltersValue();
    window.filter.Nodes.FILTER_CONTAINER.removeEventListener('change', window.filter.filterClickHandler);
    window.nodes.BUTTON_SUBMIT.removeEventListener('click', window.form.buttonClickHandler);
    window.nodes.ROOM_NUMBER.removeEventListener('change', window.form.inputGuestsChangeNumberHandler);
    window.nodes.BUTTON_SUBMIT.removeEventListener('click', window.form.titleInputChangeHandler);
    window.nodes.TYPE.removeEventListener('change', window.form.inputApartChangeTypeHandler);
    window.nodes.BUTTON_RESET_FORM.removeEventListener('click', window.form.buttonResetHandler);
    window.removeEventListener('scroll', window.handlers.windowScrollHandler);
    // снимает обработчики на загрузчиках изображений пользовател
    window.prewieInstallImages.addHandlers();
  };

  window.form.fixAddressValue();

  window.map = {
    afterSuccessMessageSettings: afterSuccessMessageSettings,
    startActivePageSettings: startActivePageSettings
  };
}());
