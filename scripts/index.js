import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validateConf = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const popups = document.querySelectorAll('.popup');
const editProfileBtn = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const formPopupProfileEdit = popupProfileEdit.querySelector('.popup__form');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const statusInput = popupProfileEdit.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');

const popupAddCard = document.querySelector('.popup_addCard');
const addCardBtn = document.querySelector('.profile__add-button');
const formPopupAddCard = popupAddCard.querySelector('.popup__form');
const nameInputAddCard = popupAddCard.querySelector('.popup__input_type_name');
const srcInputAddCard = popupAddCard.querySelector('.popup__input_type_src');

const formList = Array.from(document.querySelectorAll(validateConf.formSelector));

// Универсальные функции открытия и закрытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Слушатели закрытия попапов по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__exit-button')) {
      closePopup(popup)
    }
  })
})

// Закрытие попапа кликом на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открытие попапа редактирования профиля
function openPopupProfileEdit() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupProfileEdit);
};

// Обработчик редактирования изменений в профиле
function handleFormProfileEditSubmit (evt) {
  evt.preventDefault();
  const editedName = nameInput.value;
  const editedStatus = statusInput.value;
  profileName.textContent = editedName;
  profileStatus.textContent = editedStatus;
  closePopup(popupProfileEdit);
};

// Слушатели кнопок попапа редактирования профиля
editProfileBtn.addEventListener('click', openPopupProfileEdit);
formPopupProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);

// Обработчик открытия изображения карточек
const handleImageOpen = (card) => {
  popupPicture.src = card.querySelector('.card__picture').src;
  popupCaption.textContent = card.querySelector('.card__name').textContent;
  openPopup(popupImage);
};

// Слушатель открытия изображения в карточке
cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.className != 'card__picture') return;
  handleImageOpen(evt.target.closest('.card'));
});

// Обработчик добавления новой карточки
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const card = new Card({ name: nameInputAddCard.value, link: srcInputAddCard.value }, '#card-template');
  cardsContainer.prepend(card.generateCard());
  formPopupAddCard.reset();
  closePopup(popupAddCard);
};

// Слушатели попапа добавления новой карточки
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));
formPopupAddCard.addEventListener('submit', handleFormAddCardSubmit);

// Рендер всех карточек
initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  cardsContainer.prepend(card.generateCard());
});

// Добавление валидации форм
formList.forEach((formElem) => {
  const formValidator = new FormValidator(validateConf, formElem);
  formValidator.enableValidation();
});