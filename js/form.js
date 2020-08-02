'use strict';

(function () {

  var CAPACITY_COLLECTION = window.nodes.CAPACITY.children;

  var CAPACITY_ARRAY = Array.from(CAPACITY_COLLECTION);

  var RoomNumber = {
    '1': [0, 1, 2, 4],
    '2': [0, 1, 3, 4],
    '3': [0, 4],
    '100': [0, 1, 2, 3]
  };

  var MAIN_PIN_POSITION = (window.data.MainPin.POSITION_X + (window.data.Pin.PIXEL_SIZE) * window.data.NUMBER_FOR_COUNT) + ', '
    + (window.data.MainPin.POSITION_Y + window.data.MainPin.HEIGHT + window.data.Pin.PSEUDO);

  var setFieldsetCondition = function (arr, enable) {
    var attributeConstructor = enable ? 'removeAttribute' : 'setAttribute';
    arr.forEach(function (item) {
      item[attributeConstructor]('disabled', 'disabled');
    });
  };

  var fixAddressValue = function () {
    window.nodes.INPUT_ADDRESS.setAttribute('value', MAIN_PIN_POSITION + '');
  };

  var inputGuestsChangeNumberHandler = function () {
    CAPACITY_ARRAY.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    RoomNumber[window.nodes.ROOM_NUMBER.value].forEach(function (item) {
      window.nodes.CAPACITY.children[item].setAttribute('disabled', 'disabled');
    });
  };

  var buttonResetHandler = function () {
    window.nodes.FORM.reset();
    window.filter.setDefaultFiltersValue();
  };

  var buttonClickHandler = function () {
    var message = window.nodes.ROOM_NUMBER.value !== window.nodes.CAPACITY.value
      ? 'кол-во гостей ограничено' : '';
    window.nodes.CAPACITY.setCustomValidity(message);
  };

  var titleInputChangeHandler = function () {
    var message = window.nodes.TITLE_INPUT.value.trim().length < window.data.LengthSymbol.MIN
    || window.nodes.TITLE_INPUT.value.trim().length > window.data.LengthSymbol.MAX
      ? 'не меньше 30 и не больше 100 символов' : '';
    window.nodes.TITLE_INPUT.setCustomValidity(message);
  };

  var inputApartChangeTypeHandler = function (evt) {
    if (evt.target === window.nodes.TYPE) {
      window.nodes.PRICE_INPUT.placeholder = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
      window.nodes.PRICE_INPUT.min = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
      window.nodes.PRICE_INPUT.value = '';
    }
  };

  var inputTimeInChangeHandler = function (evt) {
    if (evt.target === window.nodes.TIME_IN) {
      window.nodes.TIME_OUT.value = window.nodes.TIME_IN.value;
    } else {
      window.nodes.TIME_IN.value = window.nodes.TIME_OUT.value;
    }
  };

  var setTimeChangeHandler = function (item) {
    item.addEventListener('change', inputTimeInChangeHandler);
  };

  setFieldsetCondition(window.nodes.FIELDSET, false);

  var saveData = function () {
    window.backend.postForm(new FormData(window.nodes.FORM),
      window.message.renderSuccessMessage,
      window.message.renderErrorMessage,
      window.backend.Url.POST);
  };

  var formSubmitHandler = function (evt) {
    saveData();
    evt.preventDefault();
  };

  // отправляем данные на сервер при клики на кнопку 'опубликовать'

  window.nodes.FORM.addEventListener('submit', formSubmitHandler);

  window.form = {
    MAIN_PIN_POSITION: MAIN_PIN_POSITION,
    fixAddressValue: fixAddressValue,
    inputGuestsChangeNumberHandler: inputGuestsChangeNumberHandler,
    titleInputChangeHandler: titleInputChangeHandler,
    inputApartChangeTypeHandler: inputApartChangeTypeHandler,
    setTimeChangeHandler: setTimeChangeHandler,
    setFieldsetCondition: setFieldsetCondition,
    buttonClickHandler: buttonClickHandler,
    buttonResetHandler: buttonResetHandler
  };
}());
