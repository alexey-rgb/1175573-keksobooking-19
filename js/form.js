'use strict';

(function () {
  // координаты главного пина

  var MAIN_PIN_POSITION = (window.data.MainPin.POSITION_X + (window.data.Pin.PIXEL_SIZE) * window.data.NUMBER_FOR_COUNT) + ', '
    + (window.data.MainPin.POSITION_Y + window.data.MainPin.HEIGHT + window.data.Pin.PSEUDO);

  // общая функция блокироки/разблокировки полей ввода

  var setFieldsetCondition = function (arr, enable) {
    var attributeConstructor = enable ? 'removeAttribute' : 'setAttribute';
    arr.forEach(function (item) {
      item[attributeConstructor]('disabled', 'disabled');
    });
  };

  // функция отрисовки координат метки в поле ввода адреса и блокировки полей ввода до активации страницы

  var fixAddressValue = function () {
    window.nodes.INPUT_ADDRESS.setAttribute('value', MAIN_PIN_POSITION + '');
  };
  // получаем значение поля с гостями для синхронизации полей ввода гостей и количества комнат

  var inputGuestsChangeNumberHandler = function () {
    var message = window.nodes.ROOM_NUMBER.value !== window.nodes.CAPACITY.value
      ? 'кол-во гостей должны быть равно количеству комнат' : '';
    window.nodes.CAPACITY.setCustomValidity(message);
  };

  // устанавливаем ограничение на длину вводимых символов в поле Заголовок объявления

  var titleInputChangeHandler = function () {
    var message = window.nodes.TITLE_INPUT.value.trim().length < window.data.LengthSymbol.MIN
    || window.nodes.TITLE_INPUT.value.trim().length > window.data.LengthSymbol.MAX
      ? 'не меньше 30 и не больше 100 символов' : '';
    window.nodes.TITLE_INPUT.setCustomValidity(message);
  };

  // функция изменения значения поля цены, в зависимости от типа жилья

  var inputApartChangeTypeHandler = function (evt) {
    if (evt.target === window.nodes.TYPE) {
      window.nodes.PRICE_INPUT.placeholder = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
      window.nodes.PRICE_INPUT.min = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
    }
  };

  // функции изменения значения полей времени заезда/выезда гостей
  var inputTimeInChangeHandler = function (evt) {
    if (evt.target === window.nodes.TIME_IN) {
      window.nodes.TIME_OUT.value = window.nodes.TIME_IN.value;
    } else {
      window.nodes.TIME_IN.value = window.nodes.TIME_OUT.value;
    }
  };

  // функция сравнения значения полей времени заезда и выезда и изменения этих значений

  var setTimeChangeHandler = function (item) {
    item.addEventListener('change', inputTimeInChangeHandler);
  };

  // блокируем поля ввода
  setFieldsetCondition(window.nodes.FIELDSET, false);

  var saveData = function () {
    window.backend.postForm(new FormData(window.nodes.FORM),
      window.message.onSuccess, window.message.onError, window.backend.Url.POST);
  };

  // присваиваем переменной вызов функции отправки формы на сервер, скрывает дефолтные настройки

  var formSubmitHandler = function (evt) {
    saveData();
    evt.preventDefault();
  };

  // отправляем данные на сервер при клики на кнопку 'опубликовать'

  window.nodes.FORM.addEventListener('submit', formSubmitHandler);

  // экспорт

  window.form = {
    MAIN_PIN_POSITION: MAIN_PIN_POSITION,
    fixAddressValue: fixAddressValue,
    inputGuestsChangeNumberHandler: inputGuestsChangeNumberHandler,
    titleInputChangeHandler: titleInputChangeHandler,
    inputApartChangeTypeHandler: inputApartChangeTypeHandler,
    setTimeChangeHandler: setTimeChangeHandler,
    setFieldsetCondition: setFieldsetCondition
  };
}());
