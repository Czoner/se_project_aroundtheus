let object1 = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

let object2 = {
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
};

let object3 = {
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
};

let object4 = {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
};

let object5 = {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
};

let object6 = {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
};

const initialCards = [object1, object2, object3, object4, object5, object6];

const closeButton = document.querySelector(".modal__close");
const editProfileButton = document.querySelector(".profile__edit-button");
const popUp = document.querySelector(".modal");

const profileFormElement = document.querySelector(".profile__info");
const profileTitle = profileFormElement.querySelector(".profile__title");
const descriptionJob = profileFormElement.querySelector(
  ".profile__description"
);
const modalTitleEdit = document.querySelector("#profile-title-edit");
const modalDescriptionEdit = document.querySelector(
  "#profile-description-edit"
);

const profileModalForm = popUp.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function opening() {
  popUp.classList.add("modal_opened");
  console.log("I have click it and it worked");
  modalTitleEdit.value = profileTitle.textContent;
  modalDescriptionEdit.value = descriptionJob.textContent;
}
editProfileButton.addEventListener("click", opening);

function closing() {
  popUp.classList.remove("modal_opened");
  console.log("i have closed the popup");
}
closeButton.addEventListener("click", closing);

function getCardElement(Data) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", Data.link);
  let cardTitle = cardElement.querySelector(".card__title");
  cardTitle.setAttribute("alt", Data.name);
  cardTitle.textContent = Data.name;
  console.log(cardTitle);
  return cardElement;
}

profileModalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleEdit.value;
  descriptionJob.textContent = modalDescriptionEdit.value;
  closing();
});

initialCards.forEach(function (Data) {
  const cardElement = getCardElement(Data);

  cardList.prepend(cardElement);
});
