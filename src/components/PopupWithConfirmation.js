import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._deletePopup = this._popupElement.querySelector(".modal__form");
    console.log(this._deletePopup);
  }

  setYesAction(action) {
    this._handleYesAction = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deletePopup.addEventListeners("submit", (e) => {
      e.preventDefault();
      this._handleYesAction();
    });
  }
}
