class Card {
  constructor(data, handleCardClick, templateSelector) {
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document.getElementById(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteIcon = this._element.querySelector('.cards__delete');
    this._cardImage = this._element.querySelector('.cards__photo-places');
    this._buttonLike = this._element.querySelector('.cards__like');
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._link, this._name);
    });
    this._buttonLike.addEventListener('click', () => {
      this._likeActive();
    });
    this._deleteIcon.addEventListener('click', () => {
      this._deleteCard();
    });
  }
  _likeActive() {
    this._buttonLike.classList.toggle('cards__like_active');
  }
  _deleteCard() {
    this._element.remove();
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.cards__places-name').textContent = this._name;
    return this._element;
  }
}
export { Card };
