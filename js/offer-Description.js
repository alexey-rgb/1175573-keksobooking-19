'use strict';

/* Доработайте форму подачи объявления так, чтобы в неё можно было загружать аватарку и фотографию жилья.

Аватарка пользователя должна загружаться через поле загрузки файлов в блоке .ad-form__field и показываться в блоке .ad-form-header__preview.

Фотография жилья должна загружаться через поле загрузки файлов в блоке .ad-form__upload и показываться в блоке .ad-form__photo.
 accept="image/jpeg,image/png,image/gif,image/heic,image/heif,image/webp">*/

(function () {
  var IMAGE_TYPE = ['jpeg', 'png', 'gif', 'heic', 'webp'];

  var INPUT_FILE_AVATAR = window.nodes.FORM.querySelector('.ad-form-header__input');

  var USER_IMAGE = window.nodes.FORM.querySelector('.ad-form-header__preview img');

  INPUT_FILE_AVATAR.addEventListener('change', function (evt) {
    var fileAvatar = INPUT_FILE_AVATAR.files[0];
    var fileName = fileAvatar.name;
    var rightFile = IMAGE_TYPE.some(it => fileName.endsWith(it));
    var reader = new FileReader();
    if (rightFile) {
      reader.addEventListener('load', function () {
        USER_IMAGE.src = reader.result;
      })
      
    }
  });


}());
