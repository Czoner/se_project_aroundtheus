import "../page/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
const newProfileModal = new PopupWithForm(
  "#edit-profile-modal",
  handleProfileFormSubmit
);
newProfileModal.setEventListeners();

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // We need to close only in `then`
      popupInstance.close();
    })
    // we need to catch possible errors
    // console.error is used to handle errors if you don’t have any other ways for that
    .catch(console.error)
    // in `finally` we need to return the initial button text back in any case
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// here is an example of the profile form handling
function handleProfileFormSubmit(inputValues) {
  // we create a function that returns a promise
  function makeRequest() {
    // `return` lets us use a promise chain `then, catch, finally` inside `handleSubmit`
    return api.editUserInfo(inputValues).then((userData) => {
      userInformation.setUserInfo(userData);
    });
  }
  // Here we call the function passing the request, popup instance and if we need some other loading text we can pass it as the 3rd argument
  handleSubmit(makeRequest, newProfileModal);
}

const imagePreview = new PopupWithImage(".modal-images-preview");
imagePreview.setEventListeners();

const profileAvatarEdit = new PopupWithForm(
  "#edit-profile-image",
  handleProfileAvatar
);
profileAvatarEdit.setEventListeners();

api
  .getUserInformation()
  .then((user) => {
    userInformation.setUserInfo({ name: user.name, about: user.about });
    userInformation.setAvatar(user.avatar);
  })
  .catch(console.error);

function handleCardFormSubmit(data) {
  const cardInfo = {
    name: data.title,
    link: data.link,
  };
  function cardRequesting() {
    return api.createCard(cardInfo).then((res) => {
      const card = createCard({
        name: res.name,
        link: res.link,
        _id: res._id,
        isLiked: res.isLiked,
      });
      section.addItem(card);
      newCardModal.close();
      formValidators["add-card-form"].resetValidation();
    });
  }
  handleSubmit(cardRequesting, newCardModal);
}

function handleLikes(card) {
  api
    .updatingLikeStatus(card.isLiked(), card.getId())
    .then(() => {
      card.handleLikeIcon();
    })
    .catch((err) => {
      console.error(err);
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
  profileAvatarEdit.renderLoading(true);
  api
    .updatingProfileImage(img.link)
    .then((user) => {
      userInformation.setAvatar(user.avatar);
      profileAvatarEdit.close();
      formValidators["edit-profile-image"].resetValidation();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarEdit.renderLoading(false);
    });
}

profileEditImage.addEventListener("click", () => {
  profileAvatarEdit.open();
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
