'use strict';

(function () {
  var removeMessageBlock = function (element) {
    element.remove();
  };

  var errorBlockRemoveHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeMessageBlock(window.ERROR_BLOCK);
    }
  };

  var errorBlockRemoveHandler2 = function () {
    removeMessageBlock(window.ERROR_BLOCK);
  };

  var addListeners = function () {
    var ERROR_BUTTON = document.querySelector('.error__button');
    // экспорт
    window.ERROR_BLOCK = document.querySelector('.error');
    document.addEventListener('keydown', errorBlockRemoveHandler);
    ERROR_BUTTON.addEventListener('click', errorBlockRemoveHandler2);
    document.addEventListener('click', errorBlockRemoveHandler2);
  };

  var onError = function () {
    var errorMessage = window.nodes.ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    window.nodes.MAIN.appendChild(errorMessage);
    addListeners();
  };

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeMessageBlock(window.SUCCESS_BLOCK);
    }
  };

  var successMessageKeydownHandler2 = function () {
    removeMessageBlock(window.SUCCESS_BLOCK);
  };

  var afterSuccessMessageSettings = function () {
    window.nodes.FORM.reset();
    window.nodes.FORM.classList.add('ad-form--disabled');
    window.form.setFieldsetCondition(window.nodes.FIELDSET, false);
    window.nodes.MAP.classList.add('map--faded');
    document.querySelectorAll('button[type="button"]').forEach(function (item) {
      item.remove();
    });
    window.nodes.MAIN_PIN.style = 'left: 570px; top: 375px;';
    window.filter.setDefaultFiltersValue();
  };

  var addListeners2 = function () {
    // экспорт
    window.SUCCESS_BLOCK = document.querySelector('.success');
    document.addEventListener('keydown', successMessageKeydownHandler);
    document.addEventListener('click', successMessageKeydownHandler2);
    afterSuccessMessageSettings();
  };

  var onSuccess = function () {
    var successMessage = window.nodes.SUCCESS_MESSAGE.cloneNode(true);
    window.nodes.BODY.appendChild(successMessage);
    addListeners2();
  };

  var onError2 = function () {
    var errorMessage = document.createElement('div');
    errorMessage.style.position = 'absolute';
    errorMessage.style.left = '0';
    errorMessage.style.top = '0';
    errorMessage.style = 'width: auto; height: auto; font-size: 30px; background-color: tomato; z-index: 10; margin: 0 auto; text-align: center;';
    errorMessage.textContent = 'Ошибка в работе сервера, попробуйте перезагрузите страницу!';
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.message = {
    onError: onError,
    onSuccess: onSuccess,
    onError2: onError2
  };
}());
