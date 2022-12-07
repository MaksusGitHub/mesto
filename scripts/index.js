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

const cardTemplate = document.querySelector('#card-template').content;

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

// Универсальные функции открытия и закрытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
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

// Обработчики кнопок карточек
const handleLikeClick = (evt) => evt.target.classList.toggle('card__like_active');
const handleCardDelete = (evt) => evt.target.closest('.card').remove();

// Обработчик открытия изображения
const handleImageOpen = (card) => {
  popupPicture.src = card.link;
  popupCaption.textContent = card.name;
  openPopup(popupImage);
};

// Генерация карточек
const generateCard = (card) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__name').textContent = card.name;
  const cardImage = newCard.querySelector('.card__picture');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const likeBtn = newCard.querySelector('.card__like');
  likeBtn.addEventListener('click', handleLikeClick);
  const deleteBtn = newCard.querySelector('.card__trash');
  deleteBtn.addEventListener('click', handleCardDelete);

  cardImage.addEventListener('click', () => handleImageOpen(card));
  
  return newCard;
};

// Добавление карточки
const renderCard = (card) => cardsContainer.prepend(generateCard(card));

// Рендер всех карточек
initialCards.forEach(renderCard);

// Обработчик добавления новой карточки
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: nameInputAddCard.value, link: srcInputAddCard.value });
  formPopupAddCard.reset();

  closePopup(popupAddCard);
};

// Слушатели попапа добавления новой карточки
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));
formPopupAddCard.addEventListener('submit', handleFormAddCardSubmit);


