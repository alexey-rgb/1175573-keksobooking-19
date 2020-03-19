'use strict';

(function () {

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var IndexCard = {
    FROM: 0,
    TO: 5
  };

  var StatusCod = {
    SUCCESS: 200,
    ERROR: 400
  };

  var xhrHandler = function (xhr, onload, onError) {
    var contentLoadHandler = function () {
      if (xhr.status === StatusCod.SUCCESS) {
        console.log(xhr.response);
        onload(xhr.response, IndexCard.FROM, IndexCard.TO);
      } else {
        onError();
      }
    };
    xhr.responseType = 'json';
    xhr.addEventListener('load', contentLoadHandler);
  };

  // запрашивает карточки с сервера и выводит в дом

  var loadCards = function (onload, url) {
    var xhr = new XMLHttpRequest();
    xhrHandler(xhr, onload);
    xhr.open('GET', url);
    xhr.send();
  };

  var postForm = function (data, onLoad, onError, url) {
    var xhr = new XMLHttpRequest();
    xhrHandler(xhr, onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  // экспорт

  window.backend = {
    Url: Url,
    loadCards: loadCards,
    postForm: postForm,
  };
}());
