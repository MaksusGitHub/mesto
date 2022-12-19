import { initialCards } from "./data.js";
import { validateConf } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
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
const cardAddBtn = document.querySelector('.profile__add-button');
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
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__exit-button')) { 
      closePopup(popup);
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
profileEditBtn.addEventListener('click', openPopupProfileEdit);
formPopupProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);

// Вставка карточки в DOM
const renderCard = (card) => cardsContainer.prepend(card.generateCard());

// Создание карточки
const createCard = (card, template) => new Card(card, template);

// Слушатели попапа добавления новой карточки
cardAddBtn.addEventListener('click', () => openPopup(popupAddCard));
formPopupAddCard.addEventListener('submit', handleFormAddCardSubmit);

// Обработчик добавления новой карточки
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const card = createCard({ name: nameInputAddCard.value, link: srcInputAddCard.value }, '#card-template');
  renderCard(card);
  formPopupAddCard.reset();
  closePopup(popupAddCard);
};

// Рендер всех карточек
initialCards.forEach((item) => {
  const card = createCard(item, '#card-template');
  renderCard(card);
});

// Добавление валидации форм
formList.forEach((formElem) => {
  const formValidator = new FormValidator(validateConf, formElem);
  formValidator.enableValidation();
});

export { popupImage, popupPicture, popupCaption, openPopup }