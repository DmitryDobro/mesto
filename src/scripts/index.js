import '../pages/index.css';
import { FormValidator } from './ForValidator.js';
import formConfig from './config.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
// блок addPopup
const popupAdd = document.querySelector('.popup_type_add-block');
const btnAdd = document.querySelector('.profile__btn_type_add');
const formAdd = popupAdd.querySelector('.popup__form');
const inputPlaceName = formAdd.querySelector('#inputPlaceName');
const inputLink = formAdd.querySelector('#inputLink');
// блок editPopup
const popupEdit = document.querySelector('.popup_type_edit-block');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('#inputName');
const inputJob = popupEdit.querySelector('#inputJob');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const openPopupImage = new PopupWithImage('.popup_type_img-block');
openPopupImage.setEventListeners();
// функция создания карточки
function createCard(data, templateSelector) {
  const newCard = new Card(
    data,
    () => {
      openPopupImage.openPopup(data.link, data.name);
    },
    templateSelector
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

// добавление новой карточки
let popupAddCard = new PopupWithForm('.popup_type_add-block', addCard);
function addCard(formData) {
  console.log(formData);
  const newCard = new Section(
    {
      data: formData,
      renderer: (item) => {
        const cardElement = createCard(item, 'card-template');
        newCard.setItem(cardElement);
      },
    },
    '.cards'
  );
  newCard.renderItems();
  popupAddCard.closePopup();
}
popupAddCard.setEventListeners();
btnAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
  let test = popupAddCard._getInputValues();
  console.log(test);
  if (inputPlaceName.value.length == 0 || inputLink.value.length == 0) {
    formAddValidate.addButtonStateDisabled();
  }
});
// редактирование профиля
const popupEditProfile = new PopupWithForm('.popup_type_edit-block', editProfile);
function editProfile(formData) {
  userInfo.setUserInfo(formData);
  console.log(formData);
  popupEditProfile.closePopup();
}
const userInfo = new UserInfo('.profile__name', '.profile__job');
popupEditProfile.setEventListeners();
btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  let dataUser = userInfo.getUserInfo();
  console.log(dataUser);
  inputName.value = dataUser.userName;
  inputJob.value = dataUser.userJob;
  formEditValidate.hideInputError();
});

// добавление стандартных карточек
const defaultCard = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, 'card-template');
      defaultCard.setItem(cardElement);
    },
  },
  '.cards'
);
defaultCard.renderItems();

const formAddValidate = new FormValidator(formAdd, formConfig);
const formEditValidate = new FormValidator(formEdit, formConfig);
formAddValidate.enableValidation();
formEditValidate.enableValidation();
