import Popup from "./Popup";

export default class PopupWithProfileImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._profileImgPopup = this._popupElement.querySelector(".modal__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._profileImgPopup.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
