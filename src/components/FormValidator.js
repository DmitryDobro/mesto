class FormValidator {
  constructor(formElement, config) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._buttonElement = formElement.querySelector(config.submitButtonSelector);
  }
  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const inputErorr = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    inputErorr.textContent = errorMessage;
  }
  _hideInputError(inputElement) {
    const inputErorr = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    inputErorr.textContent = ' ';
  }
  hideInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
  addButtonStateDisabled() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  removeButtomStateDisabled() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.addButtonStateDisabled();
    } else {
      this.removeButtomStateDisabled();
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

export { FormValidator };

