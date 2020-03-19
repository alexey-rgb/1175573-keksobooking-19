'use strict';

(function () {
  var someFunction = function () {
    window.addEventListener('load', window.data.loadData(window.data.startRenderPins));
  };
  someFunction();
}());
