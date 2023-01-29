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
    /////%%%%
    let name = profileTitle.value;
    let job = profileSubtitle.value;
    popupTitle.textContent = name;
    popupSubtitle.textContent = job;
    /////%%%%%

};
const handleCloseButtonClick = () => {
    popup.classList.remove("popup_opened");
};


let formElement = document.querySelector(".popup__form");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector(".popup__input_value_name");
    let jobInput = document.querySelector(".popup__input_value_about");

    // Получите значение полей из свойства value
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;


    // Выберите элементы, куда должны быть вставлены значения полей
    let title = document.querySelector(".profile__title");
    let subtitle = document.querySelector(".profile__subtitle");
    // Вставьте новые значения с помощью textContent

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    handleCloseButtonClick();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);


editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);