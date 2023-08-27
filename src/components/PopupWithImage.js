import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.photo = this.popup.querySelector('.popup__photo');
    this.subtitle = this.popup.querySelector('.popup__subtitle');
  }
  openPopup(link, name) {
    this.photo.src = link;
    this.photo.alt = name;
    this.subtitle.textContent = name;
    super.openPopup();
  }
}
export { PopupWithImage };
