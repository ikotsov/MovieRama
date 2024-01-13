import { URL_MOVIE_IMAGE } from '../config.js';

class MoviesView {
  #data;
  #parentElement = document.querySelector('.movies');
  #errorMessage = 'An error happened 💥';
  #noMoviesMessage = 'No movies found 😢';

  #generateMovieMarkup(movie) {
    return `
    <article class="movie">
      <div class="movie__picture" style="background-image: url('${URL_MOVIE_IMAGE}${
      movie.poster
    }')"></div>
      <div class="movie__content">
        <h3 class="movie__title">${movie.title}</h3>
        <div class="movie__info">
          <div class="movie__row">
            <p>Genres:</p>
            <p>${movie.genres.join(', ')}</p>
          </div>
          <div class="movie__row">
            <p>Release Year:</p>
            <p>${movie.releaseYear}</p>
          </div>
          <div class="movie__row">
            <p>Votes:</p>
            <p>${movie.votes}</p>
          </div>
        </div>
        <p class="movie__description">${movie.description}</p>
      </div>
    </article>`;
  }

  #generateMarkup() {
    return this.#data.map((movie) => this.#generateMovieMarkup(movie)).join('');
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  attachRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  render(data, append = false) {
    this.#data = data;
    const markup = this.#generateMarkup();

    if (append) {
      this.#parentElement.insertAdjacentHTML('beforeend', markup);
    } else {
      this.#clear();
      this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  }

  renderSpinner() {
    const markup = `<div class="spinner"></div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `<div class="error"><p>${message}</p></div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderNoMoviesFound(message = this.#noMoviesMessage) {
    const markup = `<div class="no-movies"><p>${message}</p></div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new MoviesView();
