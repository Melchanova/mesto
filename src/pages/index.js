import "./index.css";

import {Card} from "../scripts/components/Cards.js";
import {initialCards} from "../scripts/components/iniitialCards.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";

const editButtonOpen = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_edit");
const profilePopupForm = document.querySelector(".popup__form_edit");
const profilePopupTitle = document.querySelector(".popup__input_value_name");
const profilePopupSubtitle = document.querySelector(".popup__input_value_about");

const popupAdd = document.querySelector(".popup_add");
const openAddButton = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector(".popup__form_add");

const elementsCards = document.querySelector(".elements__cards");

const imagePopup = document.querySelector(".image-popup");

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    errorClass: "error_active",
};
const validationEdit = new FormValidator(validationConfig, profilePopupForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(validationConfig, popupFormAdd);
validationAdd.enableValidation();

const cardOpenPopup = new PopupWithImage(".image-popup");

const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
});

function createCard(item) {
    const card = new Card(item, ".template", () => {
        cardOpenPopup.open(item);
    });

    return card.generateCard();
}

const formEdit = new PopupWithForm(".popup_edit", function (element) {
    userInfo.setUserInfo(element);
});

const formAdd = new PopupWithForm(".popup_add", function ({ name, link }) {
    cardSection.addItem(
        createCard({
            name: name,
            link: link,
        })
    );
});

editButtonOpen.addEventListener("click", () => {
    formEdit.open();
    const { name, about } = userInfo.getUserInfo();
    profilePopupTitle.value = name;
    profilePopupSubtitle.value = about;
});

openAddButton.addEventListener("click", () => {
    formAdd.open();
    validationAdd.toggleButtonState();
});

const cardSection = new Section({
    items: initialCards,
    renderer: (data) => {
        cardSection.addItem(createCard(data));
    },
    container: elementsCards,
});
cardSection.renderElements();

formEdit.setEventListener();
formAdd.setEventListener();
cardOpenPopup.setEventListener();
