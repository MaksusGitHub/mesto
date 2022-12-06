const editProfileBtn = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupProfileEditCloseBtn = popupProfileEdit.querySelector('.popup__exit-button');
const formPopupProfileEdit = popupProfileEdit.querySelector('.popup__form');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const statusInput = popupProfileEdit.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const cardsContainer = document.querySelector('.cards');
const popupImage = document.querySelector('.popup_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupImageCloseBtn = popupImage.querySelector('.popup__exit-button');

const popupAddCard = document.querySelector('.popup_addCard');
const addCardBtn = document.querySelector('.profile__add-button');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__exit-button');
const formPopupAddCard = popupAddCard.querySelector('.popup__form');
const nameInputAddCard = popupAddCard.querySelector('.popup__input_type_name');
const srcInputAddCard = popupAddCard.querySelector('.popup__input_type_src');

const cardTemplate = document.querySelector('#card-template').content;

// Закрытие попапа кликом на оверлей
const closePopupByOverlay = (popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

// Закрытие попапа кликом на Esc
const closePopupByEsc = (evt, popup) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Универсальные функции открытия и закрытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  const buttonElem = popup.querySelector('.popup__button');
  disableButton(buttonElem, validateConf);
  closePopupByOverlay(popup);
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => popup.classList.remove('popup_opened');

// Открытие и закрытие попапа редактирования профиля
function openPopupProfileEdit() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  openPopup(popupProfileEdit);
};

function closePopupProfileEdit() {
  closePopup(popupProfileEdit);
};

// Обработчик попапа редактирования профиля
function handleFormProfileEditSubmit (evt) {
  evt.preventDefault();
  const editedName = nameInput.value;
  const editedStatus = statusInput.value;
  profileName.textContent = editedName;
  profileStatus.textContent = editedStatus;
  closePopupProfileEdit();
};

// Слушатели кнопок попапа редактирования профиля
editProfileBtn.addEventListener('click', openPopupProfileEdit);
popupProfileEditCloseBtn.addEventListener('click', closePopupProfileEdit);
formPopupProfileEdit.addEventListener('submit', handleFormProfileEditSubmit);

// Обработчики кнопок карточек
const handleLikeClick = (evt) => evt.target.classList.toggle('card__like_active');
const handleCardDelete = (evt) => evt.target.closest('.card').remove();

// Обработчик открытия изображения
const handleImageOpen = (evt) => {
  const targetCard = evt.target.closest('.card');
  popupPicture.src = targetCard.querySelector('.card__picture').src;
  popupCaption.textContent = targetCard.querySelector('.card__name').textContent;
  popupImage.classList.add('popup_opened');
  closePopupByOverlay(popupImage);
};

// Слушатель закрытия попапа с изображением
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));

// Генерация карточек
const generateCard = (card) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__name').textContent = card.name;
  const image = newCard.querySelector('.card__picture');
  image.src = card.link;
  image.alt = card.name;

  const likeBtn = newCard.querySelector('.card__like');
  likeBtn.addEventListener('click', handleLikeClick);
  const deleteBtn = newCard.querySelector('.card__trash');
  deleteBtn.addEventListener('click', handleCardDelete);

  image.addEventListener('click', handleImageOpen);

  return newCard;
};

// Добавление карточки
const renderCard = (card) => cardsContainer.prepend(generateCard(card));

// Рендер всех карточек
initialCards.forEach(renderCard);

// Открытие/закрытие попапа добавление новой карточки
openPopup(popupAddCard);
closePopup(popupAddCard);

// Обработчик добавления новой карточки
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: nameInputAddCard.value, link: srcInputAddCard.value });
  formPopupAddCard.reset();

  closePopup(popupAddCard);
};

// Слушатели попапа добавления новой карточки
addCardBtn.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardCloseBtn.addEventListener('click', () => closePopup(popupAddCard));
formPopupAddCard.addEventListener('submit', handleFormAddCardSubmit);


