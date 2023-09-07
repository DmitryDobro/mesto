import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);
    this.callbackSubmit = callbackSubmit;
    this._form = this.popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._btnForm = this._form.querySelector('.popup__btn');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  renderLoader(isLoading) {
    if (isLoading) {
      this._btnForm.textContent = 'Сохранение...';
    } else {
      this._btnForm.textContent = 'Cохранить';
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.callbackSubmit(this._getInputValues());
      this._form.reset();
    });
  }
}
export { PopupWithForm };
