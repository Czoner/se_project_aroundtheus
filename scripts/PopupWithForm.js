import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    console.log(popupSelector);
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputData = {
      name: this._popupForm.getElementsByTagName("input")[0].value,
      link: this._popupForm.getElementsByTagName("input")[1].value,
    };
    return inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      this.close();
    });
  }
}
