import "../page/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const newCardModal = new PopupWithForm("#add-modal", handleCardFormSubmit);
newCardModal.setEventListeners();
const confirmationModal = new PopupWithConfirmation("#confirmation-modal");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "51ab0f76-ffed-4fe0-9a84-d0b48dc639f2",
    "Content-Type": "application/json",
  },
});

const userInformation = new UserInfo(profileTitle, descriptionJob);
const newProfileModal = new PopupWithForm("#edit-profile-modal", (values) => {
  userInformation.setUserInfo(values);
});
newProfileModal.setEventListeners();
const imagePreview = new PopupWithImage(".modal-images-preview");
imagePreview.setEventListeners();

api.userInformation();

function handleCardFormSubmit(data) {
  const cardInfo = {
    name: data.title,
    link: data.link,
  };
  api.createCard(cardInfo).then((res) => {
    const card = createCard({
      name: res.name,
      link: res.link,
    });
    section.addItem(card);
    formValidators["add-card-form"].resetValidation();
  });
}

function handleDeleteModal(card) {
  confirmationModal.open();
  confirmationModal.setEventListeners();
  confirmationModal.setYesAction(() => {
    api
      .deleteCard(card)
      .then(() => {
        confirmationModal.close();
        card.deleteCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        confirmationModal.setYesAction(false);
      });
  });
}

function fillProfileForm() {
  formValidators[profileModalForm.getAttribute("name")].resetValidation();
  newProfileModal.open();
  const userInfo = userInformation.getUserInfo();
  profileTitleEdit.value = userInfo.name;
  profileDescriptionEdit.value = userInfo.job;
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
    handleDeleteModal
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

api.editUserInfo().then((profileInfo) => {
  console.log(profileInfo);
  userInformation.setUserInfo(profileInfo);
});
