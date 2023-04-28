const popups = document.querySelectorAll('.popup');
// блок addPopup
const popupAdd = document.querySelector('.popup_type_add-block');
const btnAdd = document.querySelector('.profile__btn_type_add');
const formAdd = popupAdd.querySelector('.popup__form');
const popupBtn = formAdd.querySelector('.popup__btn');
const inputPlaceName = formAdd.querySelector('#inputPlaceName');
const inputLink = formAdd.querySelector('#inputLink');
// блок editPopup
const popupEdit = document.querySelector('.popup_type_edit-block');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('#inputName');
const inputJob = popupEdit.querySelector('#inputJob');
// блок imgPopup
const imgPopup = document.querySelector('.popup_type_img-block');
const photo = imgPopup.querySelector('.popup__photo');
const subtitle = imgPopup.querySelector('.popup__subtitle');
// блок profile
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// блок cards
const cardsBlock = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template').content;

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
    popupBtn.disabled = true;
    popupBtn.classList.add('popup__btn_type_disabled');
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
  const newCard = createCard(card);
  cardsBlock.prepend(newCard);
  closePopup(popupAdd);
  formAdd.reset();
}
formAdd.addEventListener('submit', addCard);

function createCard(item) {
  const card = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardPhoto = card.querySelector('.cards__photo-places');
  const cardName = card.querySelector('.cards__places-name');
  const likeIcon = card.querySelector('.cards__like');
  const deleteIcon = card.querySelector('.cards__delete');
  // открытия попапа с картинкой
  cardPhoto.addEventListener('click', () => {
    photo.src = cardPhoto.src;
    photo.alt = cardName.textContent;
    subtitle.textContent = cardName.textContent;
    openPopup(imgPopup);
  });
  // активация лайка
  likeIcon.addEventListener('click', () => {
    likeIcon.classList.toggle('cards__like_active');
  });
  // удаление карточки
  deleteIcon.addEventListener('click', () => {
    const cardeDelete = deleteIcon.closest('.cards__card');
    cardeDelete.remove();
  });

  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardName.textContent = item.name;
  return card;
}
//получение карточек из массива
initialCards.forEach((element) => {
  const newCard = createCard(element);
  cardsBlock.append(newCard);
});
