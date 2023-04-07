//import { openPopup, imagePopup, popupImage, popupImageTitle } from "../../pages/index.js";

class Card {
    constructor(data, templateSelector, handleNewClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleNewClick = handleNewClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector(".article").cloneNode(true);

        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".article__item").src = this._link;
        this._element.querySelector(".article__item").alt = this._name;
        this._element.querySelector(".article__title").textContent = this._name;
        this._buttonIconToggle = this._element.querySelector(".article__icon");
        this._popupCardDelete = this._element.querySelector(".article__delete");

        return this._element;
    }
    
    _handleCardLike = () => {
        this._buttonIconToggle.classList.toggle("article__like-active");
    };
    _handledeleteCard = () => {
        this._element.remove();
        this._element = null;
    };

    _setEventListeners() {
        this._element.querySelector(".article__item").addEventListener("click", () => {
            this._handleNewClick(this._name, this._link);
        });
        this._element.querySelector(".article__icon").addEventListener("click", () => {
            this._handleCardLike();
        });

        this._element.querySelector(".article__delete").addEventListener("click", () => {
            this._handledeleteCard();
        });
    }
}
export {Card};