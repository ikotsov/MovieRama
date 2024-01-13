import { URL_MOVIE_IMAGE } from '../config.js';

class MoviesView {
  #data;
  #element = document.querySelector('.movies');
  #errorMessage = 'An error occurred 💥';
  #noMoviesMessage = 'No movies found 😢';

  #generateMovieMarkup(movie) {
    return `
    <article class="movie">
      <img class="movie__picture" src='${URL_MOVIE_IMAGE}${movie.poster}' alt='Poster of ${movie.title}' />
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
    this.#element.innerHTML = '';
  }

  attachRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  render(data, append = false) {
    this.#data = data;
    const markup = this.#generateMarkup();

    if (append) {
      this.#element.insertAdjacentHTML('beforeend', markup);
    } else {
      this.#clear();
      this.#element.insertAdjacentHTML('afterbegin', markup);
    }
  }

  renderSpinner() {
    const markup = `<div class="spinner"></div>`;
    this.#clear();
    this.#element.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `<div class="error"><p>${message}</p></div>`;
    this.#clear();
    this.#element.insertAdjacentHTML('afterbegin', markup);
  }

  renderNoMoviesFound(message = this.#noMoviesMessage) {
    const markup = `<div class="no-movies"><p>${message}</p></div>`;
    this.#clear();
    this.#element.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new MoviesView();
