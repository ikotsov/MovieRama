import { URL_MOVIE_IMAGE } from './config.js';

class MoviesView {
  _data;
  _parentElement = document.querySelector('.movies');
  _errorMessage = 'No movies found :(';

  _generateMovieMarkup(movie) {
    return `
    <article class="movie">
      <div class="movie__picture" style="background-image: url('${URL_MOVIE_IMAGE}${movie.poster}')"></div>
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

  _generateMarkup() {
    return this._data.map((movie) => this._generateMovieMarkup(movie)).join('');
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  attachRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner"></div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error"><p>${message}</p></div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new MoviesView();
