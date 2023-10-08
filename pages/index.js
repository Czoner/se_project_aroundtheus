import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

// const object1 = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

// const object2 = {
//   name: "Lake Louise",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
// };

// const object3 = {
//   name: "Bald Mountains",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
// };

// const object4 = {
//   name: "Latemar",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
// };

// const object5 = {
//   name: "Vanoise National Park",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
// };

// const object6 = {
//   name: "Lago di Braies",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
// };

// const initialCards = [object1, object2, object3, object4, object5, object6];

// const profileModal = document.querySelector("#edit-profile-modal");
// const profileModalCloseButton = profileModal.querySelector(".modal__close");
// const profileModalForm = profileModal.querySelector(".modal__form");
// const editProfileButton = document.querySelector(".profile__edit-button");
// const profileFormElement = document.querySelector(".profile__info");
// const profileTitle = profileFormElement.querySelector(".profile__title");
// const descriptionJob = profileFormElement.querySelector(
//   ".profile__description"
// );
// const profileTitleEdit = document.querySelector("#profile-title-edit");
// const profileDescriptionEdit = profileModal.querySelector(
//   "#profile-description-edit"
// );

// const addCardButton = document.querySelector(".profile__add-button");
// const addCardModal = document.querySelector("#add-modal");
// const addCardCloseButton = addCardModal.querySelector(".modal__close");
// const addCardSubmit = addCardModal.querySelector("#add-card-info");
// const addCardTitle = addCardSubmit.querySelector(".modal__input_type_title");

// const cardList = document.querySelector(".cards__list");
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// const previewImageModal = document.querySelector(".modal-images-preview");
// const previewImageElement = document.querySelector(".modal__preview");
// const previewImageClose = previewImageModal.querySelector(".modal__close");
// const previewImageTitle = document.querySelector(".modal__title");

// const modals = document.querySelectorAll(".modal");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function fillProfileForm() {
  openModal(profileModal);
  profileTitleEdit.value = profileTitle.textContent;
  profileDescriptionEdit.value = descriptionJob.textContent;
}

editProfileButton.addEventListener("click", fillProfileForm);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }

    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

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

initialCards.forEach(function (data) {
  const cardElement = createCard(data);
  cardList.prepend(cardElement);
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
  ".card__list"
);
section.rendererItems();
