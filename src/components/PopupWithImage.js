import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = document.querySelector(".modal-images-preview");
  }

  open(data) {
    super.open();
    console.log(data);
    this._image.src;
  }

  close() {
    super.close();
  }
}
