'use strict';

(function () {
  var renderOffers = function () {
    window.addEventListener('load', window.data.loadData(window.data.startRenderPins));
  };
  renderOffers();
}());
