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

const newCardModal = new PopupWithForm("#add-modal", handleButtonSubmit);
newCardModal.setEventListeners();

const userInformation = new UserInfo(profileTitle, descriptionJob);
const newProfileModal = new PopupWithForm("#edit-profile-modal", (values) => {
  userInformation.setUserInfo(values);
});
newProfileModal.setEventListeners();
const imagePreview = new PopupWithImage(".modal-images-preview");
imagePreview.setEventListeners();

function handleButtonSubmit(data) {
  // update to use data
  const title = data.title;
  const image = data.link;
  const card = createCard({
    name: title,
    link: image,
  });
  cardList.setEventListeners();
  // use form element directly
  // no change needed
  addFormValidator.resetValidation();
}

function fillProfileForm() {
  newProfileModal.open();
  profileTitleEdit.value = profileTitle.getUserInfo();
  profileDescriptionEdit.value = descriptionJob.getUserInfo();
}

// profileModalForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log(userInformation.getUserInfo());
//   userInformation.setUserInfo();
//   newProfileModal.close();
// });

editProfileButton.addEventListener("click", fillProfileForm);

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

function handleImageClick(data) {
  previewImageElement.setAttribute("src", data.link);
  previewImageElement.setAttribute("alt", data.name);
  imagePreview.open();
  previewImageTitle.textContent = data.name;
}

// addCardSubmit.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const title = e.target.title.value;
//   const image = e.target.link.value;
//   const card = createCard({
//     name: title,
//     link: image,
//   });
//   cardList.prepend(card);
//   closeModal(addCardModal);
//   e.target.reset();
//   addFormValidator.toggleButtonState();
// });

function createCard(initialCards) {
  const card = new Card(initialCards, "#card-template", handleImageClick);
  return card.getview();
}

const editFormValidator = new FormValidator(config, profileModalForm);
const addFormValidator = new FormValidator(config, addCardSubmit);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

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
