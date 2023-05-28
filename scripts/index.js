import { FormValidator } from './ForValidator.js';
import formConfig from './Config.js';
import { Card } from './Card.js';
const popups = document.querySelectorAll('.popup');
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
// блок profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// блок cards
const cardsBlock = document.querySelector('.cards');

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

// функция закрытия попапа
function closePopup(element) {
  element.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupFromEsc);
}
// функция открытия попапа
function openPopup(element) {
  element.classList.add('popup_active');
  document.addEventListener('keydown', closePopupFromEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  if (inputPlaceName.value.length == 0 || inputLink.value.length == 0) {
    formAddValidate.addButtonStateDisabled();
  }
});

function closePopupFromEsc(evt) {
  if (evt.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  formEditValidate.hideInputError();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});
// редактирование имени и работы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleFormSubmit);

// добавление карточки из попапа
function addCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputPlaceName.value;
  card.link = inputLink.value;
  const newCard = new Card(card, 'card-template');
  const cardElement = newCard.generateCard();
  newCard.setEventListenersOpenPopupPhoto(openPopup);
  cardsBlock.prepend(cardElement);
  closePopup(popupAdd);
  formAdd.reset();
}
formAdd.addEventListener('submit', addCard);

initialCards.forEach((item) => {
  const card = new Card(item, 'card-template');
  const cardElement = card.generateCard();
  card.setEventListenersOpenPopupPhoto(openPopup);
  cardsBlock.append(cardElement);
});

const formAddValidate = new FormValidator(formAdd, formConfig);
const formEditValidate = new FormValidator(formEdit, formConfig);
formAddValidate.enableValidation();
formEditValidate.enableValidation();
