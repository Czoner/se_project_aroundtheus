import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputs = this._popupForm.querySelectorAll(".modal__input");
    this._savingButton = this._popupForm.querySelector(".modal__button");
    this._savingButtonText = this._savingButton.textContent;
  }

  setInputValues(data) {
    this._popupInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  getInputValues() {
    const formValues = {};
    this._popupInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._savingButton.textContent = loadingText;
    } else {
      this._savingButton.textContent = this._savingButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }
}
