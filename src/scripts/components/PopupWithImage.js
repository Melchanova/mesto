import {Popup} from "./Popup.js";

class PopupWithImage extends Popup {
	constructor(selector) {
		super(selector);
		this._popupImage = this._popup.querySelector(".image-popup__image");
		this._popupImageTitle = this._popup.querySelector(".image-popup__title");
	}
	
	open({name, link}) {
        super.open()
        this._popupImage.alt = name;
		this._popupImage.src = link;
		this._popupImageTitle.textContent = name;
	}
}

export {PopupWithImage};