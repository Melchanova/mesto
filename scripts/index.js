const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close");

const handleEditButtonClick = () => {
    popup.classList.add("popup_opened");
};
const handleCloseButtonClick = () => {
    popup.classList.remove("popup_opened");
};
editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);

let formElement = document.querySelector(".popup__submit");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector(".popup__input_value_name");
    let jobInput = document.querySelector(".popup__input_value_about ");

    // Получите значение полей из свойства value

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let title = document.querySelector(".profile__title");
    let subtitle = document.querySelector(".profile__subtitle");
    // Вставьте новые значения с помощью textContent
    title.textContent = nameValue;
    subtitle.textContent = jobValue;
    handleCloseButtonClick();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("click", formSubmitHandler);