'use strict';

(function () {

  // скрывает сообщение(успешная/неуспешная отправка формы)

  var removeMessageBlock = function (element) {
    element.remove();
  };

  // скрывает сообщение об ошибке отправки формы(при нажатии на Esc )

  var errorBlockRemoveHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeMessageBlock(window.ERROR_BLOCK);
    }
  };

  // скрывает сообщение об ошибке отправки формы (при клике на кнопку(содержится в сообщении) или любому месту на document)

  var errorBlockRemoveHandler2 = function () {
    removeMessageBlock(window.ERROR_BLOCK);
  };

  // устанавливает обработчики для скрывания сообщения об ошибке отправки формы

  var addListeners = function () {
    var ERROR_BUTTON = document.querySelector('.error__button');
    // экспорт
    window.ERROR_BLOCK = document.querySelector('.error');
    document.addEventListener('keydown', errorBlockRemoveHandler);
    ERROR_BUTTON.addEventListener('click', errorBlockRemoveHandler2);
    document.addEventListener('click', errorBlockRemoveHandler2);
  };

  // выводит сообщение об ошибке в дом и активирует возможность скрывать это сообщение разными способами

  var onError = function () {
    var errorMessage = window.nodes.ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    window.nodes.MAIN.appendChild(errorMessage);
    addListeners();
  };

  // скрывает сообщение об успешной отправки формы(при нажатии на Esc )

  var successMessageKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeMessageBlock(window.SUCCESS_BLOCK);
    }
  };
  // скрывает сообщение об успешной отправки формы (при клике по любому месту на document)

  var successMessageKeydownHandler2 = function () {
    removeMessageBlock(window.SUCCESS_BLOCK);
  };

  // приводит страницу в исходное состояние

  var afterSuccessMessageSettings = function () {
    // очищаем форму
    window.nodes.FORM.reset();
    // деактивируем форму(стилизация)
    window.nodes.FORM.classList.add('ad-form--disabled');
    // блокируем поля ввода
    window.form.setFieldsetCondition(window.nodes.FIELDSET, false);
    // блокируем карту
    window.nodes.MAP.classList.add('map--faded');
    // удаляем метки объявлений
    document.querySelectorAll('button[type="button"]').forEach(function (item) {
      item.remove();
    });
    // ставим главный пин на место
    window.nodes.MAIN_PIN.style = 'left: 570px; top: 375px;';
  };
  // устанавливает обработчики для скрывания сообщения об ошибке отправки формы

  var addListeners2 = function () {
    // экспорт
    window.SUCCESS_BLOCK = document.querySelector('.success');
    document.addEventListener('keydown', successMessageKeydownHandler);
    document.addEventListener('click', successMessageKeydownHandler2);
    afterSuccessMessageSettings();
  };
  // выводит сообщение(об успешной отправке) в дом, активирует возможность скрывать это сообщение,
  // страница возвращается в исходное состояние.

  var onSuccess = function () {
    var successMessage = window.nodes.SUCCESS_MESSAGE.cloneNode(true);
    window.nodes.BODY.appendChild(successMessage);
    addListeners2();
  };
  window.message = {
    onError: onError,
    onSuccess: onSuccess
  };
}());
