
class Api {
  constructor({address, token}) {
    this.address = address;
    this.token = token
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }

  getInitialCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: this.token
      },
    })
    .then(result => this._getResponseData(result))
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
    .then(result => this._getResponseData(result))
  }

  setNewCard(data) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(result => this._getResponseData(result))
  }

  setUserData(data) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.status,
      })
    })
    .then(result => this._getResponseData(result))
  }

  setUserAvatar(data) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(result => this._getResponseData(result))
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return fetch(`${this.address}/cards/${cardId}/likes`, {
        method,
        headers: {
          authorization: this.token
        }
    })
    .then(result => this._getResponseData(result))
  }

  deleteCard(data) {
    return fetch(`${this.address}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token
      }
    })
    .then(result => this._getResponseData(result))
  }
}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: 'ad4f580a-7f64-46a3-b778-5998764688dd'
});

export default api;
