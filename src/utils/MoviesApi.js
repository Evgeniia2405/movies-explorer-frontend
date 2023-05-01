class MoviesApi {
  #url;

  constructor(config) {
    this.#url = config.url;
  }

  #checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }

  getInitialData() {
    return fetch(`${this.#url}/`).then(this.#checkResponse);
  }

}
const API_OPTIONS = {
  url: "https://api.nomoreparties.co/beatfilm-movies",
};
const moviesApi = new MoviesApi(API_OPTIONS);

export default moviesApi;
