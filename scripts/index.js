import { Card } from "./Cards.js";
import { initialCards } from "./iniitialCards.js";
import { FormValidator } from "./FormValidator.js";


const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const closeButtons = document.querySelectorAll(".popup__close");

const profilePopup = document.querySelector(".popup_edit");
const profilePopupForm = document.querySelector(".popup__form_edit");
const profilePopupTitle = document.querySelector(".popup__input_value_name");
const profilePopupSubtitle = document.querySelector(".popup__input_value_about");

const popupAdd = document.querySelector(".popup_add");
const openAddButton = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_value_place");
const linkInput = document.querySelector(".popup__input_value_link");

const template = document.querySelector(".template").content;
const elementsCards = document.querySelector(".elements__cards");

export const imagePopup = document.querySelector(".image-popup");
export const popupImage = document.querySelector(".image-popup__image");
export const popupImageTitle = document.querySelector(".image-popup__title");

const buttonAddSubmit = popupAdd.querySelector(".popup__add-button");

const popups = document.querySelectorAll(".popup");

const articleImage = document.querySelector(".article__item");
const articleTitle = document.querySelector(".article__title");

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    errorClass: "error_active",
};
const validationEdit = new FormValidator(validationConfig, profilePopupForm)
validationEdit.enableValidation()
const validationAdd = new FormValidator(validationConfig, popupFormAdd)
validationAdd.enableValidation()

function createCard(item) {
    const card = new Card(item, ".template");
    return card.generateCard();
}
//Добавление новой карточки через импуты
function handleAddSubmitClick(evt) {
    evt.preventDefault();
    const data = {};
    data.name = nameInput.value;
    data.link = linkInput.value;
    const newCard = createCard(data);
    elementsCards.prepend(newCard);
    closePopup(popupAdd);
    popupFormAdd.reset();
    
    
}
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    elementsCards.append(cardElement);
});

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
            closePopup(popup);
        }
    });
});

const closeWithEsc = (evt) => {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
};

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keyup", closeWithEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", closeWithEsc);
}

//1 попап
function handleEditButtonClick(evt) {
    openPopup(profilePopup);
    profilePopupTitle.value = profileTitle.textContent;
    profilePopupSubtitle.value = profileSubtitle.textContent;
    validationEdit.reset();
   
}
function handleOpenAddButtonClick(evt) {
    openPopup(popupAdd);
    validationAdd.reset();
    
}


// Обработчик <<отправки» формы редактирования профиля>>
function handleProfileFormSubmitClick(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = profilePopupTitle.value;
    profileSubtitle.textContent = profilePopupSubtitle.value;
    closePopup(profilePopup);
    
}

profilePopupForm.addEventListener("submit", handleProfileFormSubmitClick);
editButton.addEventListener("click", handleEditButtonClick);
openAddButton.addEventListener("click", handleOpenAddButtonClick);
popupFormAdd.addEventListener("submit", handleAddSubmitClick);


export { openPopup };
