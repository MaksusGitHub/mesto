const editElem = document.querySelector('.profile__edit-button');
const popupElem = document.querySelector('.popup');
const popupCloseElem = popupElem.querySelector('.popup__exit-button');

editElem.addEventListener('click', () => {
  popupElem.classList.add('popup_opened');
});

popupCloseElem.addEventListener('click', () => {
  popupElem.classList.remove('popup_opened');
});

const formProfile = popupElem.querySelector('.form-profile');
const nameInput = popupElem.querySelector('.form-profile__input_type_name');
const statusInput = popupElem.querySelector('.form-profile__input_type_status');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let editedName = nameInput.value;
  let editedStatus = statusInput.value;

  let profileName = document.querySelector('.profile__name');
  let profileStatus = document.querySelector('.profile__status');

  profileName.textContent = editedName;
  profileStatus.textContent = editedStatus;
}

formProfile.addEventListener('submit', formSubmitHandler); 