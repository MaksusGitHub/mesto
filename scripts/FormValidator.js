export class FormValidator {
  constructor(selectorList, formElem) {
    this._selectorList = selectorList;
    this._formElem = formElem;
  }

  enableValidation() {
    this._inputList = Array.from(this._formElem.querySelectorAll(this._selectorList.inputSelector));
    this._buttonElem = this._formElem.querySelector(this._selectorList.submitButtonSelector);
    this._toggleButtonState();
    
    // Деактивация кнопки по событию reset
    this._formElem.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
  
    this._inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this._checkInputValidity(inputElem)
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElem) => {
      return !inputElem.validity.valid;
    })
  };

  _disableButton() {
    this._buttonElem.classList.add(this._selectorList.inactiveButtonClass);
    this._buttonElem.setAttribute('disabled', true);
  }

  _enableButton() {
    this._buttonElem.classList.remove(this._selectorList.inactiveButtonClass);
    this._buttonElem.removeAttribute('disabled');
  }

  _checkInputValidity (inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  };

  _showInputError(inputElem, errorMessage) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._selectorList.inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._selectorList.errorClass);
  };

  _hideInputError(inputElem) {
    const errorElem = this._formElem.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._selectorList.inputErrorClass);
    errorElem.classList.remove(this._selectorList.errorClass);
    errorElem.textContent = '';
  };
}