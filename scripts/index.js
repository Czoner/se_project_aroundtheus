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
const profileModalOpened = profileModal.querySelector(".modal_opened");
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
const previewImageElement = document.querySelector(".image__preview");
const previewImageClose = previewImageModal.querySelector(".modal__close");
const previewImageTitle = document.querySelector(".image__title");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function fillProfileForm() {
  profileTitleEdit.value = profileTitle.textContent;
  profileDescriptionEdit.value = descriptionJob.textContent;
}

editProfileButton.addEventListener("click", () => {
  openModal(profileModal);
  fillProfileForm();
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewImageClose.addEventListener("click", () => {
  closeModal(previewImageModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const cardTrash = cardElement.querySelector(".card__trash");
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    previewImageElement.setAttribute("src", data.link);
    openModal(previewImageModal);
    previewImageTitle.textContent = data.name;
  });

  return cardElement;
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
  const card = getCardElement({
    name: title,
    link: image,
  });
  cardList.prepend(card);
  closeModal(addCardModal);
});

initialCards.forEach(function (data) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
});
