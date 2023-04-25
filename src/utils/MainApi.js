class Api {
  #url;
  #header;

  constructor(config) {
    this.#url = config.url;
    this.#header = config.headers;
  }

  #checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  }

  getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }

  getSavedMovies() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }

  editUserInfo(name, email) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, email }),
    }).then(this.#checkResponse);
  }

  saveMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    }).then(this.#checkResponse);
  }

  deleteMovie(movieId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this.#url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.#checkResponse);
  }
}
const API_OPTIONS = {
  url: "https://api.movies.evgenia2405.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
};
const api = new Api(API_OPTIONS);

export default api;
