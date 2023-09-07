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

const api = new Api(configApi);
Promise.all([api.getCards(), api.getUserInfo()]).then(([dataCards, dataUSer]) => {
  userInfo.setUserInfo(dataUSer);
  userInfo.setUserAvatar(dataUSer);
  section.renderItems(dataCards, dataUSer._id);
});

let section = new Section(
  {
    renderer: (item, userId) => {
      const cardElement = createCard(item, userId, 'card-template');
      section.addItem(cardElement);
    },
  },
  '.cards'
);
// функция создания карточки
function createCard(data, userId, templateSelector) {
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
            newCard.renderCardLike(res);
          })
          .catch((err) => console.log(err));
      },
      handleCardLikeDelete: () => {
        api
          .deleteLike(data._id)
          .then((res) => {
            newCard.renderCardLike(res);
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

const popupDelete = new PopupWithDelete('.popup_type_delete-block', deleteCard);
function deleteCard(card, cardId) {
  api.deleteCard(cardId).then(() => {
    card.deleteCard();
    popupDelete.closePopup();
  });
}
popupDelete.setEventListeners();

// добавление новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add-block', addCard);
popupAddCard.setEventListeners();

function addCard(formData) {
  popupAddCard.renderLoader(true);
  api
    .addNewCard(formData)
    .then((formData) => {
      let userId = formData.owner._id;
      const newCard = createCard(formData, userId, 'card-template');
      section.addItem(newCard);
      popupAddCard.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoader(false);
    });
}
btnAdd.addEventListener('click', () => {
  popupAddCard.openPopup();
  formAddValidate.hideInputError();
});
// редактировать аватар
const popupEditAvatarPhoto = new PopupWithForm('.popup_type_avatar', editAvatarPhoto);
popupEditAvatarPhoto.setEventListeners();

profileAvatarBlock.addEventListener('click', () => {
  popupEditAvatarPhoto.openPopup();
  formEditAvatarValidate.hideInputError();
});
function editAvatarPhoto(formdata) {
  popupEditAvatarPhoto.renderLoader(true);
  api
    .setUserAvatar(formdata)
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
btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.name;
  inputJob.value = dataUser.about;
  formEditValidate.hideInputError();
  formEditValidate.addButtonStateDisabled();
});
// ---------
const formAddValidate = new FormValidator(formAdd, configValidation);
const formEditValidate = new FormValidator(formEdit, configValidation);
const formEditAvatarValidate = new FormValidator(formAvatar, configValidation);
formEditAvatarValidate.enableValidation();
formAddValidate.enableValidation();
formEditValidate.enableValidation();
