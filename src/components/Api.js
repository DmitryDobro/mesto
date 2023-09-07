class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = this._headers['authorization'];
  }
  _getResonce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Ошибка!'));
  }
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResonce);
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResonce);
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResonce);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResonce);
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResonce);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResonce);
  }
  setUserInfoApi(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResonce);
  }
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._getResonce);
  }
}

export { Api };
