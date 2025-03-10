export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteModal,
    handleLikes
    // handleDeletedLikes
  ) {
    this._data = data;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteModal = handleDeleteModal;
    this._handleLikes = handleLikes;
    this._isLiked = data.isLiked;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikes(this);
    });

    this._cardElement
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._handleDeleteModal(this);
      });
    this._cardImageElement = this._cardElement.querySelector(".card__image");

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }

  handleLikeIcon = () => {
    // if(this._isLiked) add or remove classList
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _getLikedStatus() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
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
    this._getLikedStatus();
    return this._cardElement;
  }
}
