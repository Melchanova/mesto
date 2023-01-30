const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupTitle = document.querySelector(".popup__input_value_name");
const popupSubtitle = document.querySelector(".popup__input_value_about");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const closeButton = popup.querySelector(".popup__close");

const handleEditButtonClick = () => {
    popup.classList.add("popup_opened");
    let name = profileTitle.textContent;
    let job = profileSubtitle.textContent;
    popupTitle.value = name;
    popupSubtitle.value = job;
};
const handleCloseButtonClick = () => {
    popup.classList.remove("popup_opened");
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