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

export {profilePopupForm, popupFormAdd, popupFormAvatar, profileAvatarSelector, profileNameSelector, profilePositionSelector, popupAvatarSelector, 
    popupEditSelector, popupAddSelector, popupWithImageSelector, popupConfirmationSelector, cardTemplateSelector, gallerySelector, profile, avatar, buttonEdit, buttonAddCard, validationSettings};