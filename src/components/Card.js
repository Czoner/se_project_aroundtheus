export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this);
    });

    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteIcon(this);
      });
    this._cardImageElement = this._cardElement.querySelector(".card__image");

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardelement = null;
  }

  getview() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._setEventListeners();
    const imageTitle = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;
    imageTitle.textContent = this._data.name;

    return this._cardElement;
  }
}
