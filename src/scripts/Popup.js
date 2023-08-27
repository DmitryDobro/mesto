class Popup {
  constructor(popup) {
    this.popup = document.querySelector(popup);
  }
  openPopup() {
    this.popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  closePopup() {
    this.popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.closePopup();
      document.removeEventListener('keydown', this._handleEscClose);
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
