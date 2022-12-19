import { popupImage, popupPicture, popupCaption, openPopup } from "./index.js";

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
    this._likeBtn = this._card.querySelector('.card__like');
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());
    this._card.querySelector('.card__trash').addEventListener('click', () => this._handleCardDelete());
    this._card.querySelector('.card__picture').addEventListener('click', () => this._handleImageOpen());
  }

  _handleLikeClick() {
    this._likeBtn.classList.toggle('card__like_active');
  }

  _handleCardDelete() {
    this._card.remove();
    this._card = null;
  }

  _handleImageOpen() {
    popupPicture.src = this._card.querySelector('.card__picture').src;
    popupPicture.alt = this._cardName.textContent;
    popupCaption.textContent = this._cardName.textContent;
    openPopup(popupImage);
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    
    this._cardName = this._card.querySelector('.card__name');
    this._cardName.textContent = this._name;
    this._cardImage = this._card.querySelector('.card__picture');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._card;
  };
}