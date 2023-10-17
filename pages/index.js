// import { container } from "webpack";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";

const newCardModal = new PopupWithForm("#add-modal", () => {});
newCardModal.setEventListeners();
const newProfileModal = new PopupWithForm("#edit-profile-modal", () => {});
newProfileModal.setEventListeners();

function fillProfileForm() {
  newProfileModal.open();
  profileTitleEdit.value = profileTitle.textContent;
  profileDescriptionEdit.value = descriptionJob.textContent;
}

editProfileButton.addEventListener("click", fillProfileForm);

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

function handleImageClick(data) {
  previewImageElement.setAttribute("src", data.link);
  previewImageElement.setAttribute("alt", data.name);
  openModal(previewImageModal);
  previewImageTitle.textContent = data.name;
}

profileModalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleEdit.value;
  descriptionJob.textContent = profileDescriptionEdit.value;
  closeModal(profileModal);
});

addCardSubmit.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = e.target.title.value;
  const image = e.target.link.value;
  const card = createCard({
    name: title,
    link: image,
  });
  cardList.prepend(card);
  closeModal(addCardModal);
  e.target.reset();
  addFormValidator.toggleButtonState();
});

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
