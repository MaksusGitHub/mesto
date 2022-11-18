const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = popupElem.querySelector('.popup__exit-button');
const formProfile = popupElem.querySelector('.form-profile');
const nameInput = popupElem.querySelector('.form-profile__input_type_name');
const statusInput = popupElem.querySelector('.form-profile__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const elementsContainer = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupImageCloseElem = popupImage.querySelector('.popup__exit-button');

const popupNewCardElem = document.querySelector('.popup_newCard');
const addCardElem = document.querySelector('.profile__add-button');
const popupNewCardCloseElem = popupNewCardElem.querySelector('.popup__exit-button');
const formProfileNewCard = popupNewCardElem.querySelector('.form-profile');
const nameInputNewCard = popupNewCardElem.querySelector('.form-profile__input_type_name');
const srcInputNewCard = popupNewCardElem.querySelector('.form-profile__input_type_src');

const elementTemplate = document.querySelector('#element-template').content;

function popupOpen() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  popupElem.classList.add('popup_opened');
};

function popupClose() {
  popupElem.classList.remove('popup_opened');
};

// Обработчик попапа редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();

  let editedName = nameInput.value;
  let editedStatus = statusInput.value;

  profileName.textContent = editedName;
  profileStatus.textContent = editedStatus;

  popupClose();
};

editElem.addEventListener('click', popupOpen);
popupCloseElem.addEventListener('click', popupClose);

formProfile.addEventListener('submit', formSubmitHandler);

const handleActivateLike = (evt) => {
  evt.target.classList.toggle('element__like_active');
};

const handleDeleteElement = (evt) => {
  evt.target.closest('.element').remove();
};

function popupImageClose() {
  popupImage.classList.remove('popup_opened');
};

// Обработчик открытия изображения
const handleOpenImage = (evt) => {
  const targetElem = evt.target.closest('.element');
  popupPicture.src = targetElem.querySelector('.element__picture').src;
  popupCaption.textContent = targetElem.querySelector('.element__name').textContent;
  popupImage.classList.add('popup_opened');
};

popupImageCloseElem.addEventListener('click', popupImageClose);

// Генерация элементов
const generateElement = (element) => {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);

  newElement.querySelector('.element__name').textContent = element.name;
  const image = newElement.querySelector('.element__picture');
  image.src = element.link;
  image.alt = element.name;

  const likeButton = newElement.querySelector('.element__like');
  likeButton.addEventListener('click', handleActivateLike);
  const deleteButton = newElement.querySelector('.element__trash');
  deleteButton.addEventListener('click', handleDeleteElement);

  image.addEventListener('click', handleOpenImage);

  return newElement;
};

// Добавление карточки
const renderElement = (element) => {
  elementsContainer.prepend(generateElement(element));
};

// Рендер всех карточек
initialElements.forEach((element) => {
  renderElement(element);
});

// Добавление карточки
function popupNewCardOpen() {
  popupNewCardElem.classList.add('popup_opened');
};

function popupNewCardClose() {
  popupNewCardElem.classList.remove('popup_opened');
};

function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  renderElement({ name: nameInputNewCard.value, link: srcInputNewCard.value})
  nameInputNewCard.value = '';
  srcInputNewCard.value = '';

  popupNewCardClose()
};

addCardElem.addEventListener('click', popupNewCardOpen);
popupNewCardCloseElem.addEventListener('click', popupNewCardClose);

formProfileNewCard.addEventListener('submit', formNewCardSubmitHandler);