class Card {
    constructor(data, selector, handleCardClick, handleTrashClick, handleLikeClick, userId) {
        this._data = data;
        this._id = data._id;
        this._userId = userId;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
      }
    
      _getElement() {
        this._element = document
          .querySelector(this._selector)
          .content
          .querySelector('.article')
          .cloneNode(true);
      }
    
      updateData(newData) {
        this._likes = newData.likes;
      }
    
      updateLikesView() {
        this._likesOutput.textContent = this._likes.length;
        if (this.isLiked()) {
          this._like.classList.add('article__like-active');
        } else {
          this._like.classList.remove('article__like-active');
        }
      }
    
      deleteCard() {
        this._element.remove();
        this._element = null;
      }
    
      _setEventListeners() {
        this._image.addEventListener('click', () => this._handleCardClick(this._data));
        this._like.addEventListener('click', () => this._handleLikeClick());
        this._delete.addEventListener('click', () => this._handleTrashClick());
      }
    
      isLiked() {
        return this._likes.some((item) => item._id === this._userId);
      }
    
      generate() {
        this._getElement();
        this._element.querySelector('.article__title').textContent = this._name;
    
        this._image = this._element.querySelector('.article__item');
        this._image.alt = this._name;
        this._image.src = this._link;
    
        this._delete = this._element.querySelector('.article__delete');
    
        this._like = this._element.querySelector('.article__icon');
        this._likesOutput = this._element.querySelector('.article__icon-number');
        this._likesOutput.textContent = this._likes.length;
        
        if (this._ownerId !== this._userId) {
          this._delete.classList.add('article__delete_hidden');
        }
    
        if(this.isLiked()) {
          this._like.classList.add('article__like-active');
        }
    
        this._setEventListeners();
    
        return this._element;
      }
    
}
export {Card};