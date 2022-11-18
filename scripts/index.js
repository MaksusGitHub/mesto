const initialElements = [
  {
    name: 'Афины',
    src: './images/athens.jpg',
    alt: 'Афины'
  },
  {
    name: 'Эйфелева Башня',
    src: './images/eiffel.jpg',
    alt: 'Эйфелева Башня'
  },
  {
    name: 'Монреаль',
    src: './images/montreal.jpg',
    alt: 'Монреаль'
  },
  {
    name: 'Нью-Йорк',
    src: './images/nyc.jpg',
    alt: 'Нью-Йорк'
  },
  {
    name: 'Барселона',
    src: './images/barcelona.jpg',
    alt: 'Барселона'
  },
  {
    name: 'Верона',
    src: './images/verona.jpg',
    alt: 'Верона'
  }
];

const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = popupElem.querySelector('.popup__exit-button');
const formProfile = popupElem.querySelector('.form-profile');
const nameInput = popupElem.querySelector('.form-profile__input_type_name');
const statusInput = popupElem.querySelector('.form-profile__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

function popupOpen() {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
  popupElem.classList.add('popup_opened');
}

function popupClose() {
  popupElem.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  let editedName = nameInput.value;
  let editedStatus = statusInput.value;

  profileName.textContent = editedName;
  profileStatus.textContent = editedStatus;

  popupClose();
}

editElem.addEventListener('click', popupOpen);
popupCloseElem.addEventListener('click', popupClose);

formProfile.addEventListener('submit', formSubmitHandler);

// Дом узлы
const elementsContainer = document.querySelector('.elements');

// Шаблоны
const elementTemplate = document.querySelector('#element-template').content;

// Генерация элементов
const generateElement = (element) => {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);

  newElement.querySelector('.element__name').textContent = element.name;
  const image = newElement.querySelector('.element__picture');
  image.src = element.src;
  image.alt = element.alt;

  return newElement;
};

// Добавление карточки
const renderElement = (element) => {
  elementsContainer.append(generateElement(element));
};

// Рендер всех карточек
initialElements.forEach((element) => {
  renderElement(element);
});

// Добавление карточки
const popupNewCardElem = document.querySelector('.popup_newCard');
const addCardElem = document.querySelector('.profile__add-button');
const popupNewCardCloseElem = popupNewCardElem.querySelector('.popup__exit-button');


function popupNewCardOpen() {
  popupNewCardElem.classList.add('popup_opened');
}

function popupNewCardClose() {
  popupNewCardElem.classList.remove('popup_opened');
}

addCardElem.addEventListener('click', popupNewCardOpen);
popupNewCardCloseElem.addEventListener('click', popupNewCardClose);