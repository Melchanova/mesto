const profilePopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const closeButtons = document.querySelectorAll(".popup__close");

const profilePopupForm = document.querySelector(".popup__form_edit");
const profilePopupTitle = document.querySelector(".popup__input_value_name");
const profilePopupSubtitle = document.querySelector(".popup__input_value_about");

const popupAdd = document.querySelector(".popup_add");
const openAddButton = document.querySelector(".profile__add-button");
const popupFormAdd = document.querySelector(".popup__form_add");
const nameInput = document.querySelector(".popup__input_value_place");
const linkInput = document.querySelector(".popup__input_value_link");
const likeButton = document.querySelector(".article__icon");
const deleteButton = document.querySelector(".article__delete");

const template = document.querySelector(".template").content;
const elements = document.querySelector(".elements");
const elementsCards = document.querySelector(".elements__cards");

const imagePopup = document.querySelector(".image-popup");
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

function createCards(photoName, photoLink) {
    const article = template.querySelector(".article").cloneNode(true);
    const articleImage = article.querySelector(".article__item");
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
    const newAddCard = createCards(card.name, card.link);
    elementsCards.append(newAddCard);
});

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//1 попап
function handleEditButtonClick(evt) {
    profilePopupTitle.value = profileTitle.textContent;
    profilePopupSubtitle.value = profileSubtitle.textContent;
    openPopup(profilePopup);
}
//2попап
function handleOpenAddButtonClick(evt) {
    openPopup(popupAdd);
}
//Добавление новой карточки
function handleAddSubmitClick(evt) {
    evt.preventDefault();
    const itemCardNew = createCards(nameInput.value, linkInput.value);
    elementsCards.prepend(itemCardNew);
    evt.target.reset();
    closePopup(popupAdd);
}
// Обработчик «отправки» формы, хотя пока
function handleProfileFormSubmitClick(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileTitle.textContent = profilePopupTitle.value;
    profileSubtitle.textContent = profilePopupSubtitle.value;
    closePopup(profilePopup)
}

profilePopupForm.addEventListener("submit", handleProfileFormSubmitClick);
editButton.addEventListener("click", handleEditButtonClick);
openAddButton.addEventListener("click", handleOpenAddButtonClick);

popupFormAdd.addEventListener("submit", handleAddSubmitClick);