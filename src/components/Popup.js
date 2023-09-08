class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  openPopup() {
    this.popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }
  closePopup() {
    this.popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.closePopup();
    }
  }
  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.closePopup();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    });
  }
}

export { Popup };


