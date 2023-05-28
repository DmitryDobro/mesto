class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.openPopupImage = openPopupImage;
  }
  _getTemplate() {
    const cardElement = document.getElementById(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const likeIcon = this._element.querySelector('.cards__like');
    const deleteIcon = this._element.querySelector('.cards__delete');
    const cardPhoto = this._element.querySelector('.cards__photo-places');
    cardPhoto.addEventListener('click', () => {
      this.openPopupImage(this._link, this._name);
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
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.cards__photo-places').src = this._link;
    this._element.querySelector('.cards__photo-places').alt = this._name;
    this._element.querySelector('.cards__places-name').textContent = this._name;
    return this._element;
  }
}
export { Card };
