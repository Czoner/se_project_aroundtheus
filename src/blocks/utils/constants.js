const object1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const object2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

const object3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

const object4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

const object5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

const object6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [object1, object2, object3, object4, object5, object6];

const profileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = profileModal.querySelector(".modal__close");
const profileModalForm = profileModal.querySelector(".modal__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector(".profile__info");
const profileTitle = profileFormElement.querySelector(".profile__title");
const descriptionJob = profileFormElement.querySelector(
  ".profile__description"
);
const profileTitleEdit = document.querySelector("#profile-title-edit");
const profileDescriptionEdit = profileModal.querySelector(
  "#profile-description-edit"
);

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardSubmit = addCardModal.querySelector("#add-card-info");
const addCardTitle = addCardSubmit.querySelector(".modal__input_type_title");

const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector(".modal-images-preview");
const previewImageElement = document.querySelector(".modal__preview");
const previewImageClose = previewImageModal.querySelector(".modal__close");
const previewImageTitle = document.querySelector(".modal__title");

const modals = document.querySelectorAll(".modal");
