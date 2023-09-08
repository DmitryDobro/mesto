const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
const configApi = {
  url: 'https://nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'ce4643f4-83a7-46c3-a332-ce4ad63e4a8b',
    'Content-Type': 'application/json',
  },
};

const popupAdd = document.querySelector('.popup_type_add-block');
const btnAdd = document.querySelector('.profile__btn_type_add');
const formAdd = popupAdd.querySelector('.popup__form');

// блок editPopup
const popupEdit = document.querySelector('.popup_type_edit-block');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('#inputName');
const inputJob = popupEdit.querySelector('#inputJob');
const profileAvatarBlock = document.querySelector('.profile__block-avatar');
const popupEditAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupEditAvatar.querySelector('.popup__form');

export {
  btnAdd,formAdd,
  btnEdit,formEdit,
  inputName,inputJob,
  profileAvatarBlock,formAvatar,
  configValidation,configApi
}