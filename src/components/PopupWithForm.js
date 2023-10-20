import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._popupInput = this._popupForm.querySelectorAll(".modal__input");
  }

  setInputValues(data) {
    this._popupInput.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  getInputValues() {
    const formValues = {};
    this._popupInput = this._popupForm.querySelectorAll(".modal__input");
    this._popupInput.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this.getInputValues());
      this.close();
    });
  }
}
