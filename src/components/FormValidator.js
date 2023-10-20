export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _checkFormValidity = () => {
    return this._inputElements.every((input) => input.validity.valid);
  };

  toggleButtonState() {
    const isFormValid = this._checkFormValidity();
    if (!isFormValid) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputElements = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._form.reset();
  }
}
