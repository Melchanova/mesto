export { FormValidator };

class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
    }

    _disabledSubmit(evt) {
        evt.preventDefault();
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));

        formList.forEach((form) => {
            form.addEventListener("submit", this._disabledSubmit);
            form.addEventListener("input", () => {
                this._toggleButton(form);
            });

            this._addInputListners();
            this._toggleButton(form);
        });
    }

    _handleFormImput() {
        const input = this._formElement;
        const inputId = input.id;
        const errorElement = document.querySelector(`#${inputId}-error`);

        if (input.validity.valid) {
            input.classList.remove(this._inputErrorClass);
            errorElement.textContent = "";
        } else {
            input.classList.add(this._inputErrorClass);
            errorElement.textContent = input.validationMessage;
        }
    }

    _toggleButton(form) {
        const buttonSubmit = form.querySelector(this._submitButtonSelector);
        const isFormValid = form.checkValidity();
        buttonSubmit.disabled = !isFormValid;
        buttonSubmit.classList.toggle(this._inactiveButtonClass, !isFormValid);
    }

    _addInputListners() {
        const inputList = Array.from(document.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._handleFormImput();
            });
        });
    }
}