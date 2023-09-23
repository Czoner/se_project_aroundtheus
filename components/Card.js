export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon(this);
      });

    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteIcon(this);
      });
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleImageClick() {
    this._cardElement
      .querySelector(".card__image")
      .classList.add("modal-images-preview");
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
  }

  getview() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();

    this._cardElement.querySelector(".card__image").src = this._data.link;
    this._cardElement.querySelector(".card__image").alt = this._data.name;
    this._cardElement.querySelector(".card__title").textContent =
      this._data.name;

    return this._cardElement;
  }
}
