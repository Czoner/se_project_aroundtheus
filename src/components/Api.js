export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, { headers: this.headers });
  }

  getUserInformation() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  profileInfo() {
    return Promise.all(this.getInitialCards(), this.userInformation());
  }

  createCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  editUserInfo(values) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    });
  }

  deleteCard(cardid) {
    return this._request(`${this.baseUrl}/cards/${cardid}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  deletingLikes(cardid) {
    return this._request(`${this.baseUrl}/cards/${cardid}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addingLikes(cardid) {
    return this._request(`${this.baseUrl}/cards/${cardid}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  updatingLikeStatus(isLiked, cardid) {
    if (isLiked) {
      return this.deletingLikes(cardid);
    } else {
      return this.addingLikes(cardid);
    }
  }

  updatingProfileImage(image) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: image,
      }),
    });
  }
}
