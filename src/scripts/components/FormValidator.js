class FormValidator {
    constructor(validationConfig, form) {
        this._inputSelector = validationConfig.inputSelector,
        this._submitButtonSelector = validationConfig.submitButtonSelector,
        this._inactiveButtonClass = validationConfig.inactiveButtonClass,
        this._inputErrorClass = validationConfig.inputErrorClass,
        this._errorClass = validationConfig.errorClass,
        this._form = form
    }
    resetValidation() {
        this._toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideError(inputElement)
        });
  
      }
        
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }  
    
    toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    _setEventListeners = () => {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };
  
  
  
    enableValidation = () => {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
};
export {FormValidator};