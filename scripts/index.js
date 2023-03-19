let popap = document.querySelector('.popap');
let btnEdit = document.querySelector('.profile__btn_edit');
let close = document.querySelector('.popap__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.getElementById('inputName');
let jobInput = document.getElementById('inputJob');

btnEdit.addEventListener('click', function () {
  popap.classList.add('popap_active');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
close.addEventListener('click', function () {
  popap.classList.remove('popap_active');
});


let formElement = document.querySelector('.popap__form');
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popap.classList.remove('popap_active');
}

formElement.addEventListener('submit', handleFormSubmit);


let heartsLinks = document.querySelectorAll('.cards__likes');
let cardsBlock = document.querySelector('.cards');

cardsBlock.addEventListener('click', ()=>{
  if(event.target.closest('.cards__likes')){
    event.target.closest('.cards__likes').classList.toggle('cards__likes_colorFon_black')
  }
})