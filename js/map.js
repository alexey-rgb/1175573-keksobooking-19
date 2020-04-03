'use strict';

(function () {

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
    var BUTTONS = document.querySelectorAll('button[type="button"]');
    window.nodes.FORM.reset();
    window.nodes.FORM.classList.add('ad-form--disabled');
    window.form.setFieldsetCondition(window.nodes.FIELDSET, false);
    window.nodes.MAP.classList.add('map--faded');
    BUTTONS.forEach(function (button) {
      button.remove();
    });
    window.nodes.MAIN_PIN.style = 'left: 570px; top: 375px;';
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

  var activatePageWorking = function () {
    // активация страницы кликом
    window.nodes.MAIN_PIN.addEventListener('click', window.handlers.addMainPinHandler(startActivePageSettings,
      window.data.MouseKey.MIDDLE, window.data.MouseKey.RIGHT));
    // активация страницы с клавиатуры
    window.nodes.MAIN_PIN.addEventListener('keydown', window.handlers.addMainPinHandler(startActivePageSettings));
  };

  activatePageWorking();

  window.form.fixAddressValue();

  window.map = {
    afterSuccessMessageSettings: afterSuccessMessageSettings
  };
}());
