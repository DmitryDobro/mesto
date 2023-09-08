import '../pages/index.css';
import { FormValidator } from '../components/FormValidator.js';
import { btnAdd, formAdd, btnEdit, formEdit, inputName, inputJob, profileAvatarBlock, formAvatar, configValidation, configApi } from '../utils/constants.js';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';
import { UserInfo } from '../components/UserInfo.js';
let userId;

const api = new Api(configApi);
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([dataCards, dataUSer]) => {
    userId = dataUSer._id;
    console.log(userId);
    userInfo.setUserInfo(dataUSer);
    userInfo.setUserAvatar(dataUSer);
    section.renderItems(dataCards);
  })
  .catch((err) => console.log(err));

const section = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, 'card-template');
      section.addItem(cardElement);
    },
  },
  '.cards'
);
// функция создания карточки
function createCard(data, templateSelector) {
  const newCard = new Card(
    {
      data,
      userId,
      handleCardClick: () => {
        openPopupImage.openPopup(data.link, data.name);
      },
      handleCardDelete: () => {
        popupDelete.open(newCard, data._id);
      },
      handleCardLike: () => {
        api
          .addLike(data._id)
          .then((res) => {
            newCard.updateLikes(res);
          })
          .catch((err) => console.log(err));
      },
      handleCardLikeDelete: () => {
        api
          .deleteLike(data._id)
          .then((res) => {
            newCard.updateLikes(res);
          })
          .catch((err) => console.log(err));
      },
    },
    templateSelector
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

const openPopupImage = new PopupWithImage('.popup_type_img-block');
openPopupImage.setEventListeners();

// удаление карточки
const popupDelete = new PopupWithDelete('.popup_type_delete-block', deleteCard);
function deleteCard(card, cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      popupDelete.closePopup();
    })
    .catch((err) => console.log(err));
}
popupDelete.setEventListeners();

// добавление новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add-block', addCard);
popupAddCard.setEventListeners();
function addCard(formData) {
  popupAddCard.renderLoader(true);
  api
    .addNewCard(formData)
    .then((cardData) => {
      const newCard = createCard(cardData, 'card-template');
      section.prependItem(newCard);
      popupAddCard.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoader(false);
    });
}

// редактировать аватар
const popupEditAvatarPhoto = new PopupWithForm('.popup_type_avatar', editAvatarPhoto);
popupEditAvatarPhoto.setEventListeners();
function editAvatarPhoto(formData) {
  popupEditAvatarPhoto.renderLoader(true);
  api
    .setUserAvatar(formData)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupEditAvatarPhoto.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatarPhoto.renderLoader(false);
    });
}

// редактирование профиля
const popupEditProfile = new PopupWithForm('.popup_type_edit-block', editProfile);
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
function editProfile(formData) {
  popupEditProfile.renderLoader(true);
  api
    .setUserInfoApi(formData)
    .then(() => {
      userInfo.setUserInfo(formData);
      popupEditProfile.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoader(false);
    });
}
popupEditProfile.setEventListeners();

// вешаем обработчики
btnAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
  formAddValidate.hideInputError();
  formAddValidate.addButtonStateDisabled();
});
btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.name;
  inputJob.value = dataUser.about;
  formEditValidate.hideInputError();
  formEditValidate.addButtonStateDisabled();
});
profileAvatarBlock.addEventListener('click', () => {
  popupEditAvatarPhoto.openPopup();
  formEditAvatarValidate.hideInputError();
  const dataUser = userInfo.getUserInfo();
});

// делаем валидация
const formAddValidate = new FormValidator(formAdd, configValidation);
const formEditValidate = new FormValidator(formEdit, configValidation);
const formEditAvatarValidate = new FormValidator(formAvatar, configValidation);
formEditAvatarValidate.enableValidation();
formAddValidate.enableValidation();
formEditValidate.enableValidation();
