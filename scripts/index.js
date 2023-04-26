// блок addPopup
const popupAdd = document.querySelector('.popup_type_add-block');
const btnAdd = document.querySelector('.profile__btn_type_add');
const formAdd = popupAdd.querySelector('.popup__form');
// блок editPopup
const popupEdit = document.querySelector('.popup_type_edit-block');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
// блок imgPopup
const imgPopup = document.querySelector('.popup_type_img-block');
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

// закрытия попапа по крестику
function addCloseButtonListener(popup) {
  const close = popup.querySelector('.popup__close');
  close.addEventListener('click', () => {
    closePopup(popup);
  });
}
// функция закрытия попапа
function closePopup(element) {
  element.classList.remove('popup_active');
}
// функция открытия попапа
function openPopup(element) {
  element.classList.add('popup_active');
}
function closePopupFromOverlay(evt){
  if(evt.target.classList.contains('popup')){
    evt.target.classList.remove('popup_active')
  }
}
addCloseButtonListener(popupAdd);
addCloseButtonListener(popupEdit);
addCloseButtonListener(imgPopup);

btnAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  popupAdd.addEventListener('click', closePopupFromOverlay)  
  document.addEventListener('keydown', closePopupFromEsc);
});

function closePopupFromEsc(evt){
  if(evt.key == 'Escape' ){
    closePopup(popupAdd)
    closePopup(popupEdit);
    closePopup(imgPopup);
    document.removeEventListener('keydown', closePopupFromEsc);
  }
}
btnEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  popupEdit.addEventListener('click', closePopupFromOverlay)  
  document.addEventListener('keydown', closePopupFromEsc);
  popupEdit.querySelector('#inputName').value = profileName.textContent;
  popupEdit.querySelector('#inputJob').value = profileJob.textContent;
});
// редактирование имени и работы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEdit.querySelector('#inputName').value;
  profileJob.textContent = popupEdit.querySelector('#inputJob').value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleFormSubmit);


// добавление карточки из попапа
function addCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = popupAdd.querySelector('#inputPlaceName').value;
  card.link = popupAdd.querySelector('#inputLink').value;
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
    const photo = imgPopup.querySelector('.popup__photo');
    const subtitle = imgPopup.querySelector('.popup__subtitle');
    photo.src = cardPhoto.src;
    photo.alt = cardName.textContent;
    subtitle.textContent = cardName.textContent;
    openPopup(imgPopup);
    imgPopup.addEventListener('click', closePopupFromOverlay)  
    document.addEventListener('keydown', closePopupFromEsc);
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


