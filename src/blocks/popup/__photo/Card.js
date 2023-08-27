class Card {
  constructor({ title }) {
    this._title = title;
  }

  _getTemplate() {
    const newTemplate = document
      .querySelector("#todo-template")
      .content.querySelector(".todo-card")
      .cloneNode(true);

    return newTemplate;
  }

  _setData() {
    const title = this._newCard.querySelector(".todo-card__title");
    title.textContent = this._title;
  }

  _handleClickDelete() {
    console.log(this);
    this._newCard.remove();
  }

  _handleClickCheck() {
    this._newCard.classList.toggle('todo-card_checked');
  }

  _setListeners() {
    const deleteButton = this._newCard.querySelector(
      ".todo-card__button_type_delete"
    );
    deleteButton.addEventListener("click", () => this._handleClickDelete());

    const checkButton = this._newCard.querySelector(
      ".todo-card__button_type_check"
    );
    checkButton.addEventListener("click", () => this._handleClickCheck());
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}

export default Card;
