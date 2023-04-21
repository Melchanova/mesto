import {Popup} from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = this._popup.querySelector('.popup__button');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._confirmButton.textContent = 'Удаление...';
    } else {
      this._confirmButton.textContent = 'Да';
    }
  }

  setConfirm(callback) {
    this._handleConfirmationCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirmationCallback();
    });
  }
}
export {PopupWithSubmit};