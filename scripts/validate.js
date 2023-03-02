const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
}

function disabledSubmit(evt) {
    evt.preventDefault();
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener("submit", disabledSubmit);
        form.addEventListener("input", () => {
            toggleButton(form, config);
        });

        addInputListners(form, config);
        toggleButton(form, config)
    });
}

function handleFormImput(evt, config) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);


    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass)
        errorElement.textContent = "";

    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }

};

function toggleButton(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle("popup__button_disabled", !isFormValid);

}

function addInputListners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (evt) => {
            handleFormImput(evt, config)
        });
    });
}

enableValidation(formValidationConfig)