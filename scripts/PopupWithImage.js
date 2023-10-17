import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = document.querySelector(".modal-images-preview");
  }

  open() {
    this._image.classList.add("modal_opened");
  }
}
