import { Popup } from './Popup.js';

class PopupWithDelete extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);
    this._form = this.popup.querySelector('.popup__form');
    this._btnDelete = this.popup.querySelector('.popup__btn');
    this.callbackSubmit = callbackSubmit;
  }
  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.callbackSubmit(this._card, this._cardId);
    });
  }
}

export { PopupWithDelete };
