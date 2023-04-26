enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 



function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  enableValidation(); 
function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__btn');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  setEventListeners(formEdit);
  
  function showInputError(formElement, inputElement, errorMessage){
    const inputErorr = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error')
    inputErorr.textContent = errorMessage
  }
  function hideInputError(formElement, inputElement){
    const inputErorr = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error')
    inputErorr.textContent = ' '
  }
  function isValid(formElement, inputElement){
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage)
    
    }else{
      hideInputError(formElement, inputElement)
    }
  }
  function hasInvalidInput  (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__btn_type_disabled');
    } else {
      buttonElement.classList.remove('popup__btn_type_disabled');
    }
  }; 