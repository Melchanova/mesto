import {Card} from "../scripts/components/Cards.js";
import {initialCards} from "../scripts/components/iniitialCards.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";

const editButtonOpen = document.querySelector(".profile__edit-button");
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

const imagePopup = document.querySelector(".image-popup");
const popupImage = document.querySelector(".image-popup__image");
const popupImageTitle = document.querySelector(".image-popup__title");

const buttonAddSubmit = popupAdd.querySelector(".popup__add-button");

const popups = document.querySelectorAll(".popup");

const articleImage = document.querySelector(".article__item");
const articleTitle = document.querySelector(".article__title");
const EditAddForm = document.querySelector(".popup__form");
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    errorClass: "error_active",
};
const validationEdit = new FormValidator(validationConfig, profilePopupForm)
validationEdit.enableValidation();
const validationAdd = new FormValidator(validationConfig, popupFormAdd)
validationAdd.enableValidation();

const cardOpenPopup = new PopupWithImage(imagePopup);


//const handleNewClick = (name, link) => cardOpenPopup.open(name, link)


const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
  });

function createCard(item) {
    const card = new Card(item, ".template", () => {
        cardOpenPopup.open(item)  
    })
    
    return card.generateCard()
}

const formEdit = new PopupWithForm(profilePopup, {
    handleFormSubmit: (element) => {
        userInfo.setUserInfo(element)
    }
})

const formAdd = new PopupWithForm(popupAdd, {
    handleFormSubmit: ({name, link}) => {
        cardSection.addItem(createCard({
            name: name,
            link: link,
            alt: name
    }))
    }
})
editButtonOpen.addEventListener("click", () => {
    formEdit.open();
    const {name, about} = userInfo.getUserInfo();
    profilePopupTitle.value = name;
    profilePopupSubtitle.value = about;
});

openAddButton.addEventListener('click', () => { 
    formAdd.open();
    validationAdd.toggleButtonState();
 });

//1 попап

const cardSection = new Section ({
    items: initialCards, 
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    }, 
    container: elementsCards
  });
  cardSection.renderElements();

//Добавление новой карточки через импуты

// function handleAddSubmitClick(evt) {
//     evt.preventDefault();
//     const cardElement = createCard({
//         name:nameInput.value,
//         link:linkInput.value
//       });
//       cardSection.addItem(cardElement);
//     //closePopup(popupAdd);
//     popupFormAdd.reset();
//     //validationAdd.resetValidation();
// }


// // Обработчик <<отправки» формы редактирования профиля>>
// function handleProfileFormSubmitClick(evt) {
//     evt.preventDefault();
//     userInfo.setUserInfo({ 
//         newUserName: profilePopupTitle.value,
//         newUserAbout: profilePopupSubtitle.value,
//     });
//     //closePopup(profilePopup);
//     //popupFormAdd.reset();
//     validationEdit.resetValidation();
   
// }




// profilePopupForm.addEventListener("submit", handleProfileFormSubmitClick);
// popupFormAdd.addEventListener("submit", handleAddSubmitClick);

formEdit.setEventListener();
formAdd.setEventListener();
cardOpenPopup.setEventListener();

