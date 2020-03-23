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
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var xhrHandler = function (xhr, onload, onError) {
    var contentLoadHandler = function () {
      if (xhr.status === StatusCod.SUCCESS) {
        onload(xhr.response, IndexCard.FROM, IndexCard.TO);
      } else if (xhr.status === StatusCod.BAD_REQUEST || xhr.status === StatusCod.NOT_FOUND) {
        onError();
      }
    };
    xhr.responseType = 'json';
    xhr.addEventListener('load', contentLoadHandler);
  };

  var loadCards = function (onload, onError, url) {
    var xhr = new XMLHttpRequest();
    xhrHandler(xhr, onload, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var postForm = function (data, onLoad, onError, url) {
    var xhr = new XMLHttpRequest();
    xhrHandler(xhr, onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    Url: Url,
    loadCards: loadCards,
    postForm: postForm
  };
}());
