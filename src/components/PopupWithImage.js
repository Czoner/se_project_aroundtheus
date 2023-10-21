import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = document.querySelector(".modal__preview");
    this._title = document.querySelector(".modal__title");
  }

  open(data) {
    super.open();
    this._image.setAttribute("src", data.link);
    this._image.setAttribute("alt", data.name);
    this._title.textContent = data.name;
  }

  close() {
    super.close();
  }
}
