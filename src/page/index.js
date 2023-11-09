import "../page/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithProfileImage from "../components/PopupWithProfileImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileTitle,
  descriptionJob,
  editProfileButton,
  profileTitleEdit,
  profileDescriptionEdit,
  addCardButton,
  addCardSubmit,
  profileModalForm,
  initialCards,
  previewImageElement,
  previewImageTitle,
  config,
  cardList,
  cardTemplate,
  profileEditImage,
} from "../utils/constants.js";

const newCardModal = new PopupWithForm("#add-modal", handleCardFormSubmit);
newCardModal.setEventListeners();
const confirmationModal = new PopupWithConfirmation("#confirmation-modal");
confirmationModal.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "79fb9209-ee9a-4da9-a138-5a38df01e74c",
    "Content-Type": "application/json",
  },
});
const profileImage = document.querySelector(".profile__image");

const userInformation = new UserInfo(
  profileTitle,
  descriptionJob,
  profileImage
);
const newProfileModal = new PopupWithForm("#edit-profile-modal", (values) => {
  userInformation.setUserInfo(values);
  newProfileModal.saving(true);
  api.editUserInfo(values).then(() => {
    newProfileModal.saving(false);
    userInformation.setUserInfo(values);
  });
});
newProfileModal.setEventListeners();
const imagePreview = new PopupWithImage(".modal-images-preview");
imagePreview.setEventListeners();

const profileImageModal = new PopupWithProfileImage("#edit-profile-image");
profileImageModal.setEventListeners();

const profileAvatarEdit = new PopupWithForm(
  "#edit-profile-image",
  handleProfileAvatar
);
profileAvatarEdit.setEventListeners();

api.getUserInformation().then((user) => {
  userInformation.setUserInfo({ name: user.name, about: user.about });
  userInformation.setAvatar(user.avatar);
});

function handleCardFormSubmit(data) {
  const cardInfo = {
    name: data.title,
    link: data.link,
  };
  newCardModal.saving(true);
  api.createCard(cardInfo).then((res) => {
    const card = createCard({
      name: res.name,
      link: res.link,
      _id: res._id,
      isLiked: res.isLiked,
    });
    section.addItem(card);
    newCardModal.saving(false);
    formValidators["add-card-form"].resetValidation();
  });
}

function handleLikes(card) {
  api.updatingLikeStatus(card.isLiked(), card.getId()).then(() => {
    card.handleLikeIcon();
  });
}

function handleDeleteModal(card) {
  confirmationModal.open();
  confirmationModal.setYesAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        confirmationModal.close();
        card.handleDeleteCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        confirmationModal.setYesAction(false);
      });
  });
}

function handleProfileAvatar(img) {
  profileAvatarEdit.saving(true);
  api.updatingProfileImage(img.link).then((user) => {
    userInformation.setAvatar(user.avatar);
    profileAvatarEdit.saving(false);
  });
}

profileEditImage.addEventListener("click", () => {
  profileImageModal.open();
});

function fillProfileForm() {
  formValidators[profileModalForm.getAttribute("name")].resetValidation();
  newProfileModal.open();
  const userInfo = userInformation.getUserInfo();
  profileTitleEdit.value = userInfo.name;
  profileDescriptionEdit.value = userInfo.about;
}

editProfileButton.addEventListener("click", fillProfileForm);

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

function handleImageClick(data) {
  imagePreview.open(data);
}

function createCard(initialCards) {
  const card = new Card(
    initialCards,
    "#card-template",
    handleImageClick,
    handleDeleteModal,
    handleLikes
  );
  return card.getview();
}
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const section = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

api
  .getInitialCards()
  .then((items) => {
    section.rendererItems(items);
  })
  .catch((error) => {
    console.error(error);
  });
