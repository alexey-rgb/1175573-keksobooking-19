'use strict';

(function () {

  var IMAGE_TYPE = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'webp'];

  var form = window.nodes.FORM;

  var Nodes = {

  AVATAR_LOADER: form.querySelector('.ad-form-header__input'),

  USER_AVATAR: form.querySelector('.ad-form-header__preview img'),

  PHOTO_APARTMENTS_LOADER: form.querySelector('.ad-form__input'),

  PHOTO_APARTMENTS_WRAPPER: form.querySelector('.ad-form__photo'),

  PHOTO_APARTMENTS: document.createElement('img')

  };

  var size = 70;

  var readerAvatar = new FileReader();

  // записывает в src путь к загруженной пользователем аватарке

  var userAvatarLoadHandler = function () {
    Nodes.USER_AVATAR.src = readerAvatar.result;
  };

  var readerPhotoApartments = new FileReader();

  // записывает в src путь к загруженной пользователем фото недвижимости

  var photoApartmentsLoadHandler = function () {
    Nodes.PHOTO_APARTMENTS.style = 'width: ' + size + 'px; ' +  'height: ' + size + 'px;';
    Nodes.PHOTO_APARTMENTS.src = readerPhotoApartments.result;
    Nodes.PHOTO_APARTMENTS_WRAPPER.insertAdjacentElement('afterbegin', Nodes.PHOTO_APARTMENTS);
  };

  //  раскодирует загруженную пользователем аватарку и передает в рендер

  var avatarLoadHandler = function () {
    var file = Nodes.AVATAR_LOADER.files[0];
    var fileName = file.name.toLowerCase();
    var rightFile = IMAGE_TYPE.some(type => fileName.endsWith(type));
    if (rightFile) {
      readerAvatar.addEventListener('load', userAvatarLoadHandler);
      readerAvatar.readAsDataURL(file);
    }
  }

  //  раскодирует загруженную пользователем фотографию недвижимости и передает в рендер

  var photoAppartmentLoadHandler = function () {
    var file = Nodes.PHOTO_APARTMENTS_LOADER.files[0];
    var fileName = file.name.toLowerCase();
    var rightFile = IMAGE_TYPE.some(type => fileName.endsWith(type));
    if (rightFile) {
      readerPhotoApartments.addEventListener('load', photoApartmentsLoadHandler);
      readerPhotoApartments.readAsDataURL(file);
    }
  }

  // навешивает/снимает обработчики, в зависимости от аргумента

  var addHandlers = function (flag) {
    if (flag === true) {
      Nodes.AVATAR_LOADER.addEventListener('change', avatarLoadHandler);
      Nodes.PHOTO_APARTMENTS_LOADER.addEventListener('change', photoAppartmentLoadHandler);
      return;
    }
    Nodes.AVATAR_LOADER.removeEventListener('change', avatarLoadHandler);
    Nodes.PHOTO_APARTMENTS_LOADER.removeEventListener('change', photoAppartmentLoadHandler);
  };

  window.prewieInstallImages = {
    addHandlers: addHandlers
  }
}());

