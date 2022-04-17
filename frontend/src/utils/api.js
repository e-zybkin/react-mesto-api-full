
class Api {
  constructor({address}) {
    this.address = address;
  }

  getToken = () => {
    return `Bearer ${localStorage.getItem('jwt')}`;
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
        authorization: this.getToken(),
      },
    })
    .then(result => this._getResponseData(result))
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: this.getToken(),
      }
    })
    .then(result => this._getResponseData(result))
  }

  setNewCard(data) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.getToken(),
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
        authorization: this.getToken(),
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
        authorization: this.getToken(),
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
          authorization: this.getToken(),
        }
    })
    .then(result => this._getResponseData(result))
  }

  deleteCard(data) {
    return fetch(`${this.address}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getToken(),
      }
    })
    .then(result => this._getResponseData(result))
  }
}

const api = new Api({
  address: 'https://api.vmesto.nomoredomains.xyz'
});

export default api;
