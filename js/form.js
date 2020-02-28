'use strict';

(function () {
  // блокируем поля ввода

  var disableFieldset = function (item) {
    item.setAttribute('disabled', 'disabled');
  };

  window.form = {
    // координаты гланого пина

    MAIN_PIN_POSITION: (window.data.MainPin.POSITION_X + (window.data.Pin.PIXEL_SIZE) * window.data.NUMBER_FOR_COUNT) + ', '
      + (window.data.MainPin.POSITION_Y + window.data.MainPin.HEIGHT + window.data.Pin.PSEUDO),
    // функция отрисовки координат метки в поле ввода адреса и блокировки полей ввода до активации страницы

    fixAddressValueAndBlockFieldset: function () {
      window.nodes.INPUT_ADDRESS.setAttribute('value', this.MAIN_PIN_POSITION + '');
      window.nodes.FIELDSET.forEach(disableFieldset);
    },
    // получаем значение поля с гостями для синхронизации полей ввода гостей и количества комнат

    inputGuestsChangeNumberHandler: function () {
      var message = window.nodes.ROOM_NUMBER.value !== window.nodes.CAPACITY.value
        ? ('кол-во гостей должны быть равно количеству комнат') : ('');
      window.nodes.CAPACITY.setCustomValidity(message);
    },

    // устанавливаем ограничение на длину вводимых символов в поле Заголовок объявления

    titleInputChangeHandler: function () {
      var message = window.nodes.TITLE_INPUT.value.trim().length < window.data.LengthSymbol.MIN || window.nodes.TITLE_INPUT.value.trim().length > window.data.LengthSymbol.MAX
        ? 'не меньше 30 и не больше 100 символов' : '';
      window.nodes.TITLE_INPUT.setCustomValidity(message);
    },

    // функция изменения значения поля цены, в зависимости от типа жилья

    inputApartChangeTypeHandler: function (evt) {
      if (evt.target === window.nodes.TYPE) {
        window.nodes.PRICE_INPUT.placeholder = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
        window.nodes.PRICE_INPUT.min = window.data.ROOM_DATA[window.nodes.TYPE.value].price;
      }
    },

    // функция сравнения значения полей времени заезда и выезда и изменения этих значений

    setTimeChangeHandler: function (item) {
      // функции изменения значения полей времени заезда/выезда гостей
      var inputTimeInChangeHandler = function (evt) {
        if (evt.target === window.nodes.TIME_IN) {
          window.nodes.TIME_OUT.value = window.nodes.TIME_IN.value;
        } else {
          window.nodes.TIME_IN.value = window.nodes.TIME_OUT.value;
        }
      };
      item.addEventListener('change', inputTimeInChangeHandler);
    }
  };
}());
