export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElem = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElem;
  }

  _setEventListeners() {

    this._card.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick());
    this._card.querySelector('.card__trash').addEventListener('click', () => this._handleCardDelete());

    //TODO: Разобраться с обработчиком открытия картинки по нажатию на карточку
    // this._card.querySelector('.card__picture').addEventListener('click', () => this._handleImageOpen());
  }

  _handleLikeClick() {
    this._card.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleCardDelete() {
    this._card.remove();
  }

  // _handleImageOpen() {
  //   const popupImage = document.querySelector('.popup_image');
  //   popupImage.querySelector('.popup__picture').src = this._link;
  //   popupImage.querySelector('.popup__caption').textContent = this._name;
  //   openPopup(popupImage);
  // }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
  
    this._card.querySelector('.card__name').textContent = this._name;
    this._card.querySelector('.card__picture').src = this._link;
    this._card.querySelector('.card__picture').alt = this._name;

    return this._card;
  };
}