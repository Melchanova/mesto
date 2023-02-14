const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const popupTitle = document.querySelector(".popup__input_value_name");
const popupSubtitle = document.querySelector(".popup__input_value_about");

const openAddButton = document.querySelector(".profile__add-button");
const closeAddButton = document.querySelector(".popup_add-close");
const popupAdd = document.querySelector(".popup_add");
const popupFormAdd = document.querySelector(".popup__form_add");
const contAdd = document.querySelector(".popup__container_add");
const nameInput = document.querySelector(".popup__input_value_place");
const linkInput = document.querySelector(".popup__input_value_link");
const likeButton = document.querySelector(".article__icon");

const deleteButton = document.querySelector(".article__delete");
const template = document.querySelector(".template").content;
const elements = document.querySelector(".elements");
const elementCards = document.querySelector(".element__cards");
const formAddButton = document.querySelector("popup__save");

const imagePopup = document.querySelector(".image-popup");
const imagePopupClose = document.querySelector(".image-popup__close");

const popupImage = document.querySelector(".image-popup__image");
const popupImageTitle = document.querySelector(".image-popup__title");

const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

function addCards(photoName, photoLink) {
    const article = template.querySelector(".article").cloneNode(true);
    articleImage = article.querySelector(".article__item");
    articleImage.src = photoLink;
    articleImage.alt = photoName;
    const articleTitle = article.querySelector(".article__title");
    articleTitle.textContent = photoName;
    article.querySelector(".article__icon").addEventListener("click", function(evt) {
        evt.target.classList.toggle("article__like-active");
    });
    article.querySelector(".article__delete").addEventListener("click", function() {
        article.remove();
    });
    articleImage.addEventListener("click", function() {
        popupImage.src = photoLink;
        popupImage.alt = photoName;
        popupImageTitle.textContent = photoName;
        openPopup(imagePopup);
    });
    return article;
}

initialCards.forEach((card) => {
    const newAddCard = addCards(card.name, card.link);
    elementCards.append(newAddCard);
});

//Добавление новой карточки
function addSubmitHandler(evt) {
    evt.preventDefault();
    const itemCardNew = addCards(nameInput.value, linkInput.value);
    elementCards.prepend(itemCardNew);
    evt.target.reset();

    handleCloseAddButtonClick();
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

}

//1 попап
const handleEditButtonClick = () => {
    popup.classList.add("popup_opened");
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
};
const handleCloseButtonClick = () => {
    popup.classList.remove("popup_opened");
};
//2попап
const handleOpenAddButtonClick = () => {
    popupAdd.classList.add("popup_opened");
};
const handleCloseAddButtonClick = () => {
    popupAdd.classList.remove("popup_opened");
};
const imagePopupCloseClick = () => {
    imagePopup.classList.remove("popup_opened");
};

// Обработчик «отправки» формы, хотя пока
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    handleCloseButtonClick();
}

popupForm.addEventListener("submit", formSubmitHandler);
editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
openAddButton.addEventListener("click", handleOpenAddButtonClick);
closeAddButton.addEventListener("click", handleCloseAddButtonClick);
contAdd.addEventListener("submit", addSubmitHandler);
imagePopupClose.addEventListener("click", imagePopupCloseClick);