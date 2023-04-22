import "./index.css";
import {profilePopupForm, popupFormAdd, popupFormAvatar, profileAvatarSelector, profileNameSelector, profilePositionSelector, popupAvatarSelector, 
    popupEditSelector, popupAddSelector, popupWithImageSelector, popupConfirmationSelector, cardTemplateSelector, gallerySelector, profile, avatar, buttonEdit, buttonAddCard, validationSettings} from "../scripts/utils/constants.js";
import {Card} from "../scripts/components/Cards.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {Section} from "../scripts/components/Section.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {Api} from "../scripts/components/Api.js";
import {PopupWithSubmit} from "../scripts/components/PopupWithSubmit.js";



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
            popupAvatar.close();
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
            popupEdit.close();
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
            popupAdd.close();
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

