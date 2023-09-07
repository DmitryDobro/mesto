class Card {
  constructor({ data, userId, handleCardClick, handleCardDelete, handleCardLike, handleCardLikeDelete }, templateSelector) {
    this.data = data;
    this._dataLikes = data.likes;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
    this.handleCardLike = handleCardLike;
    this.handleCardLikeDelete = handleCardLikeDelete;
  }
  _getTemplate() {
    const cardElement = document.getElementById(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    this._deleteIcon = this._element.querySelector('.cards__delete');
    this._cardImage = this._element.querySelector('.cards__photo-places');
    this._buttonLike = this._element.querySelector('.cards__like');
    this._likesCount = this._element.querySelector('.cards__like-counter');
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._link, this._name);
    });
    this._buttonLike.addEventListener('click', () => {
      this._togleLike();
    });
    this._deleteIcon.addEventListener('click', () => {
      this.handleCardDelete(this._idCard);
    });
  }

  // проверка на наличие собственного лайка
  _likedCard() {
    return this._dataLikes.find((like) => like._id === this._userId);
  }

  // поставить/убрать лайк в зависимости от его наличия
  _togleLike() {
    if (this._likedCard()) {
      this.handleCardLikeDelete(this._idCard);
    } else {
      this.handleCardLike(this._idCard);
    }
  }

  renderCardLike(card) {
    // устанавливаем массиву лайков актуальное значение
    this._dataLikes = card.likes;
    if (this._dataLikes.length === 0) {
      this._likesCount.textContent = '0';
    } else {
      this._likesCount.textContent = this._dataLikes.length;
    }
    if (this._likedCard()) {
      this._buttonLike.classList.add('cards__like_active');
    } else {
      this._buttonLike.classList.remove('cards__like_active');
    }
  }

  deleteCard() {
    this._element.remove();
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.cards__places-name').textContent = this._name;
    this.renderCardLike(this.data);
    if (this._userId !== this.data.owner._id) {
      this._deleteIcon.remove();
    }
    return this._element;
  }
}
export { Card };
