const popupAdd = document.querySelector('.popup_type_add-block');
const popupEdit = document.querySelector('.popup_type_edit-block');
const imgPopup = document.querySelector('.popup_type_img-block');
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');
const close = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsBlock = document.querySelector('.cards');
const formAdd = popupAdd.querySelector('.popup__form');
const formEdit = popupEdit.querySelector('.popup__form');
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
function closePopup(popup) {
  const close = popup.querySelector('.popup__close');
  close.addEventListener('click', () => {
    removeClass(popup, 'popup_active');
  });
}
// функция удаления класса у попапа
function removeClass(selector, className) {
  selector.classList.remove(className);
}
// функция добавления класса у попапа
function addClass(selector, className) {
  selector.classList.add(className);
}
closePopup(popupAdd);
closePopup(popupEdit);
closePopup(imgPopup);

btnAdd.addEventListener('click', () => {addClass(popupAdd, 'popup_active');});

btnEdit.addEventListener('click', () => {
  addClass(popupEdit, 'popup_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
// редактирование имени и работы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEdit.querySelector('#inputName').value;
  profileJob.textContent = popupEdit.querySelector('#inputJob').value;
  removeClass(popupEdit, 'popup_active');
}
formEdit.addEventListener('submit', handleFormSubmit);

// добавление карточки из попапа
function addCard(evt) {
  evt.preventDefault();
  let card = {};
  card.name = popupAdd.querySelector('#inputPlaceName').value;
  card.link = popupAdd.querySelector('#inputLink').value;
  let newCard = createCard(card);
  cardsBlock.prepend(newCard);
  removeClass(popupAdd, 'popup_active');
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
    imgPopup.classList.add('popup_active');
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
