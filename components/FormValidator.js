export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._form = formElement;
  }

  showInputError(inputEl) {
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

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(this._formEl, inputEl, this._settings);
    }
    hideInputError(this._form, inputEl, this._settings);
  }

  _toggleButtonState() {
    let foundInvalid = false;
    this._inputElements.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }

      if (foundInvalid) {
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        return (this._submitButton.disabled = true);
      }
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    });
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
        checkInputValidity(this._form, inputEl, this._settings);
        toggleButtonState(
          this._inputElements,
          this._submitButton,
          this._settings
        );
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(this._form, this._settings);
    console.log(this._form);
  }
}
