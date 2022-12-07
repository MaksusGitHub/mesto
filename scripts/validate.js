const validateConf = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Добавление ошибки в поле формы
const showInputError = (formElem, inputElem, errorMessage, selectorList) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add(selectorList.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(selectorList.errorClass);
};

// Удаление ошибки из поля формы
const hideInputError = (formElem, inputElem, selectorList) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(selectorList.inputErrorClass);
  errorElem.classList.remove(selectorList.errorClass);
  errorElem.textContent = '';
};

// Изменение состояния кнопки submit при валидации
const toggleButtonState = (inputList, buttonElem, selectorList) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElem, selectorList);
  } else {
    enableButton(buttonElem, selectorList);
  }
};

// Выключение кнопки
const disableButton = (buttonElem, selectorList) => {
  buttonElem.classList.add(selectorList.inactiveButtonClass);
  buttonElem.setAttribute('disabled', true);
}

// Включение кнопки
const enableButton = (buttonElem, selectorList) => {
  buttonElem.classList.remove(selectorList.inactiveButtonClass);
  buttonElem.removeAttribute('disabled');
}

// Проверка валидности поля
const isValid = (formElem, inputElem, selectorList) => {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, selectorList);
  } else {
    hideInputError(formElem, inputElem, selectorList);
  }
};

// Добавление обработчиков события input для валидации всех полей
const setEventListeners = (formElem, selectorList) => {
  const inputList = Array.from(formElem.querySelectorAll(selectorList.inputSelector));
  const buttonElem = formElem.querySelector(selectorList.submitButtonSelector);
  toggleButtonState(inputList, buttonElem, selectorList);
  
  // Деактивация кнопки по событию reset
  formElem.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElem, selectorList);
    }, 0);
  });

  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem, selectorList)
      toggleButtonState(inputList, buttonElem, selectorList);
    });
  });
};

// Проверка на валидность всех полей одновременно
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
};

// Включение валидации всех форм
const enableValidation = (selectorList) => {
  const formList = Array.from(document.querySelectorAll(selectorList.formSelector));
  formList.forEach((formElem) => {
    setEventListeners(formElem, selectorList);
  });
};

enableValidation(validateConf);