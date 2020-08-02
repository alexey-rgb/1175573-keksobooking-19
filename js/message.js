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

  var installErrorHandlers = function () {
    var ERROR_BUTTON = document.querySelector('.error__button');
    // экспорт
    window.ERROR_BLOCK = document.querySelector('.error');
    document.addEventListener('keydown', errorBlockRemoveHandler);
    ERROR_BUTTON.addEventListener('click', errorBlockRemoveHandler2);
    document.addEventListener('click', errorBlockRemoveHandler2);
  };

  var renderErrorMessage = function () {
    var errorMessage = window.nodes.ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    window.nodes.MAIN.appendChild(errorMessage);
    installErrorHandlers();
  };

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeMessageBlock(window.SUCCESS_BLOCK);
    }
  };

  var successMessageKeydownHandler2 = function () {
    removeMessageBlock(window.SUCCESS_BLOCK);
  };

  var setsSuccessHandlers = function () {
    window.SUCCESS_BLOCK = document.querySelector('.success');
    document.addEventListener('keydown', successMessageKeydownHandler);
    document.addEventListener('click', successMessageKeydownHandler2);
    window.map.afterSuccessMessageSettings();
  };

  var renderSuccessMessage = function () {
    var successMessage = window.nodes.SUCCESS_MESSAGE.cloneNode(true);
    window.nodes.BODY.appendChild(successMessage);
    setsSuccessHandlers();
  };

  // ошибка при получении объявлений с сервера

  var insertErrorMessage = function () {
    var errorMessage = document.createElement('div');
    errorMessage.style.position = 'absolute';
    errorMessage.style.left = '0';
    errorMessage.style.top = '0';
    errorMessage.style = 'width: auto; height: auto; font-size: 30px; background-color: tomato; z-index: 10; margin: 0 auto; text-align: center;';
    errorMessage.textContent = 'Ошибка в работе сервера, попробуйте перезагрузите страницу!';
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

  window.message = {
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage,
    insertErrorMessage: insertErrorMessage
  };
}());
