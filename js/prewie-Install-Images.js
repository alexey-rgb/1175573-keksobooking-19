'use strict';

(function () {

  var IMAGE_TYPE = ['jpeg', 'png', 'gif', 'heic', 'webp'];

  var AVATAR_LOADER = window.nodes.FORM.querySelector('.ad-form-header__input');

  var USER_AVATAR = window.nodes.FORM.querySelector('.ad-form-header__preview img');

  var PHOTO_APARTMENTS_LOADER = window.nodes.FORM.querySelector('.ad-form__input');

  var PHOTO_APARTMENTS_WRAPPER = window.nodes.FORM.querySelector('.ad-form__photo');

  var PHOTO_APARTMENTS = document.createElement('img');

  var readerAvatar = new FileReader();

  var readerPhotoApartments = new FileReader();

  // записывает в src путь к загруженной пользователем аватарке

  var userAvatarLoadHandler = function () {
    USER_AVATAR.src = readerAvatar.result;
  };

  // записывает в src путь к загрузочной пользователем фото апартаментов

  var photoApartmentsLoadHandler = function () {
    PHOTO_APARTMENTS.style = 'width: 70px; height: 70px;';
    PHOTO_APARTMENTS.src = readerPhotoApartments.result;
    PHOTO_APARTMENTS_WRAPPER.insertAdjacentElement('afterbegin', PHOTO_APARTMENTS);
  };

  //  раскодирует загруженную пользователем картинку и передает в рендер

  function avatarLoadHandler(element, reader, handler) {
    return function imageLoadHandler() {
      var file = element.files[0];
      var fileName = file.name.toLowerCase();
      var rightFile = IMAGE_TYPE.some(type => fileName.endsWith(type));
      if (rightFile) {
        reader.addEventListener('load', handler);
        reader.readAsDataURL(file);
      }
    }
  }

  // навешивает/снимает обработчики, которые отрабатывают в случае передачи в аргумнет true.
  // в противном случае снимает

  var addHandlers = function (flag) {
    if (flag) {
      AVATAR_LOADER.addEventListener('change', avatarLoadHandler(AVATAR_LOADER, readerAvatar, userAvatarLoadHandler));
      PHOTO_APARTMENTS_LOADER.addEventListener('change', avatarLoadHandler(PHOTO_APARTMENTS_LOADER, readerPhotoApartments,
        photoApartmentsLoadHandler))
    }
    AVATAR_LOADER.removeEventListener('change', avatarLoadHandler(AVATAR_LOADER, readerAvatar, userAvatarLoadHandler));
    PHOTO_APARTMENTS_LOADER.removeEventListener('change', avatarLoadHandler(PHOTO_APARTMENTS_LOADER, readerPhotoApartments,
      photoApartmentsLoadHandler))
  };

  window.prewieInstallImages = {
    addHandlers: addHandlers
  }
}());

