import "../page/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
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

const newCardModal = new PopupWithForm("#add-modal", handleCardFormSubmit);
newCardModal.setEventListeners();

const userInformation = new UserInfo(profileTitle, descriptionJob);
const newProfileModal = new PopupWithForm("#edit-profile-modal", (values) => {
  userInformation.setUserInfo(values);
});
newProfileModal.setEventListeners();
const imagePreview = new PopupWithImage(".modal-images-preview");
imagePreview.setEventListeners();

function handleCardFormSubmit(data) {
  const title = data.title;
  const image = data.link;
  const card = createCard({
    name: title,
    link: image,
  });
  section.addItem(card);
  formValidators["add-card-form"].resetValidation();
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
  const card = new Card(initialCards, "#card-template", handleImageClick);
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
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
section.rendererItems();

fetch("https://around-api.en.tripleten-services.com/v1", {
  headers: {
    authorization: "8dcb8b45-1d41-4cb1-9020-633ca7e69ba7",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
