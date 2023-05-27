class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }
  _getTemplate() {
    const cardElement = document.getElementById('card-template').content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    const likeIcon = this._element.querySelector('.cards__like');
    const deleteIcon = this._element.querySelector('.cards__delete');
    const cardPhoto = this._element.querySelector('.cards__photo-places');
    cardPhoto.addEventListener('click', () => {
      this._openPopupPhoto();
    });

    likeIcon.addEventListener('click', () => {
      this._likeActive(likeIcon);
    });
    deleteIcon.addEventListener('click', () => {
      this._deleteCard(deleteIcon);
    });
  }
  _likeActive(likeIcon) {
    likeIcon.classList.toggle('cards__like_active');
  }
  _deleteCard(deleteIcon) {
    const cardeDelete = deleteIcon.closest('.cards__card');
    cardeDelete.remove();
  }
  _openPopupPhoto() {
    photo.src = this.link;
    photo.alt = this.name;
    subtitle.textContent = this.name;
    openPopup(imgPopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__photo-places').src = this._link;
    this._element.querySelector('.cards__places-name').textContent = this._name;
    return this._element;
  }
}
export { Card };






// function createCard(item) {
//   const card = cardTemplate.querySelector('.cards__card').cloneNode(true);
//   const cardPhoto = card.querySelector('.cards__photo-places');
//   const cardName = card.querySelector('.cards__places-name');
//   const likeIcon = card.querySelector('.cards__like');
//   const deleteIcon = card.querySelector('.cards__delete');
//   // открытия попапа с картинкой
//   cardPhoto.addEventListener('click', () => {
//     photo.src = cardPhoto.src;
//     photo.alt = cardName.textContent;
//     subtitle.textContent = cardName.textContent;
//     openPopup(imgPopup);
//   });
//   // активация лайка
//   likeIcon.addEventListener('click', () => {
//     likeIcon.classList.toggle('cards__like_active');
//   });
//   // удаление карточки
//   deleteIcon.addEventListener('click', () => {
//     const cardeDelete = deleteIcon.closest('.cards__card');
//     cardeDelete.remove();
//   });

//   cardPhoto.src = item.link;
//   cardPhoto.alt = item.name;
//   cardName.textContent = item.name;
//   return card;
// }
//получение карточек из массива
// initialCards.forEach((element) => {
//   const newCard = createCard(element);
//   cardsBlock.append(newCard);
// });
