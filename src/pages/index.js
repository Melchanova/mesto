import "./index.css";

import {Card} from "../scripts/components/Cards.js";
import {initialCards} from "../scripts/components/iniitialCards.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {Api} from "../scripts/components/Api.js";
import {PopupWithSubmit} from "../scripts/components/PopupWithSubmit.js";


const profilePopupForm = document.querySelector(".popup__form_edit");
const popupFormAdd = document.querySelector(".popup__form_add");
const popupFormAvatar = document.querySelector(".popup__form_avatar");
const profileAvatarSelector = ".profile__avatar";
const profileNameSelector = ".profile__title";
const profilePositionSelector = ".profile__subtitle";
const popupAvatarSelector = "#popup_avatar";
const popupEditSelector = "#popup_edit";
const popupAddSelector = "#popup_add";
const popupWithImageSelector = "#image-popup";
const popupConfirmationSelector = "#popup_delete";
const cardTemplateSelector = "#template";
const gallerySelector = ".elements__cards";
const profile = document.querySelector(".profile");
const avatar = profile.querySelector(".profile__avatar-button");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAddCard = profile.querySelector(".profile__add-button");

const validationSettings = {
    errorTextSelector: ".error",
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    errorClass: "error_active",
};
const validationEdit = new FormValidator(validationSettings, profilePopupForm);
validationEdit.enableValidation();
const validationAdd = new FormValidator(validationSettings, popupFormAdd);
validationAdd.enableValidation();
const validationAvatar = new FormValidator(validationSettings, popupFormAvatar);
validationAvatar.enableValidation();

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
    headers: {
        authorization: "dfd5bfbe-742b-4213-891e-26ddf6a593ef",
        "Content-Type": "application/json",
    },
});
const userInfo = new UserInfo(profileNameSelector, profilePositionSelector, profileAvatarSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([me, cards]) => {
        userId = me._id;
        userInfo.setUserInfo(me);
        cardsList.addItems(cards);
    })
    .catch((err) => console.log(err))
    .finally(() => {});

let userId;

const popupAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
    popupAvatar.renderLoading(true);
    api.changeUserAvatar(formData)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((err) => console.log(err))
        .finally(() => popupAvatar.renderLoading(false));
});

popupAvatar.setEventListeners();

avatar.addEventListener("click", () => {
    validationAvatar.resetPopupForm();
    popupAvatar.open();
});

const popupEdit = new PopupWithForm(popupEditSelector, (formData) => {
    popupEdit.renderLoading(true);
    api.changeUserInfo(formData)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((err) => console.log(err))
        .finally(() => popupEdit.renderLoading(false));
});

popupEdit.setEventListeners();

buttonEdit.addEventListener("click", () => {
    validationEdit.resetPopupForm();
    popupEdit.setInputValues(userInfo.getUserInfo());
    popupEdit.open();
});

const popupAdd = new PopupWithForm(popupAddSelector, (formData) => {
    popupAdd.renderLoading(true);
    api.addCard(formData)
        .then((data) => {
            cardsList.addItem(data);
        })
        .catch((err) => console.log(err))
        .finally(() => popupAdd.renderLoading(false));
});

popupAdd.setEventListeners();

buttonAddCard.addEventListener("click", () => {
    validationAdd.resetPopupForm();
    popupAdd.open();
});

const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const popupConfirmation = new PopupWithSubmit(popupConfirmationSelector);
popupConfirmation.setEventListeners();

const createCard = (data) => {
    const card = new Card(
        data,
        cardTemplateSelector,
        () => popupWithImage.open(data),
        () => {
          
            popupConfirmation.setConfirm(() => {
                popupConfirmation.renderLoading(true);
                api.deleteCard(data._id)
                    .then(() => {
                        card.deleteCard();
                        popupConfirmation.close();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => popupConfirmation.renderLoading(false));
            });
            popupConfirmation.open();
        },
        () => {
            if (!card.isLiked()) {
                api.addLike(data._id)
                    .then((data) => {
                        card.updateData(data);
                        card.updateLikesView();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api.deleteLike(data._id)
                    .then((data) => {
                        card.updateData(data);
                        card.updateLikesView();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        userId
    );
    return card.generate();
};
const cardsList = new Section((cardItem) => createCard(cardItem), gallerySelector);

