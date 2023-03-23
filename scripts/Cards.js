import { openPopup, imagePopup, popupImage, popupImageTitle } from "./index.js";

class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
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
    _handleNewClick = () => {
        openPopup(imagePopup);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageTitle.textContent = this._name;
    };
    _handleCardLike = () => {
        this._buttonIconToggle.classList.toggle("article__like-active");
    };
    _handledeleteCard = () => {
        this._element.remove();
    };

    _setEventListeners() {
        this._element.querySelector(".article__item").addEventListener("click", () => {
            this._handleNewClick();
        });
        this._element.querySelector(".article__icon").addEventListener("click", () => {
            this._handleCardLike();
        });

        this._element.querySelector(".article__delete").addEventListener("click", () => {
            this._handledeleteCard();
        });
    }
}
export { Card };