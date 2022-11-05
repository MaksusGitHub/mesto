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