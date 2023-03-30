let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__btn_type_edit');
let close = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.getElementById('inputName');
let jobInput = document.getElementById('inputJob');
let formElement = document.querySelector('.popup__form');
let heartsLinks = document.querySelectorAll('.cards__like');
let cardsBlock = document.querySelector('.cards');

function removeClass(selector, className){
selector.classList.remove(className);
}

btnEdit.addEventListener('click', function () {
  popup.classList.add('popup_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
close.addEventListener('click', function () {
  removeClass(popup, 'popup_active')
});


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removeClass(popup, 'popup_active')
}

formElement.addEventListener('submit', handleFormSubmit);



cardsBlock.addEventListener('click', () => {
  if (event.target.closest('.cards__like')) {
    event.target.closest('.cards__like').classList.toggle('cards__like_active');
  }
});

