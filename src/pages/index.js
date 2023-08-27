import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import formConfig from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
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
const popupAddCard = new PopupWithForm('.popup_type_add-block', addCard);
function addCard(formData) {
  const newCard = createCard(formData, 'card-template');
  section.addItem(newCard);
  popupAddCard.closePopup();
}
popupAddCard.setEventListeners();
btnAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
});
// редактирование профиля
const popupEditProfile = new PopupWithForm('.popup_type_edit-block', editProfile);
function editProfile(formData) {
  userInfo.setUserInfo(formData);
  popupEditProfile.closePopup();
}
const userInfo = new UserInfo('.profile__name', '.profile__job');
popupEditProfile.setEventListeners();
btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.userName;
  inputJob.value = dataUser.userJob;
  formEditValidate.hideInputError();
});

// добавление стандартных карточек
const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, 'card-template');
      section.addItem(cardElement);
    },
  },
  '.cards'
);
section.renderItems();

const formAddValidate = new FormValidator(formAdd, formConfig);
const formEditValidate = new FormValidator(formEdit, formConfig);
formAddValidate.enableValidation();
formEditValidate.enableValidation();
