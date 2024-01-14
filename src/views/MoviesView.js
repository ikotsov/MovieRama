import { URL_MOVIE_IMAGE } from '../config.js';

class MoviesView {
  #data;
  #element = document.querySelector('.movies');
  #errorMessage = 'An error occurred 💥';
  #noMoviesMessage = 'No movies found 😢';

  #generateMovieMarkup(movie) {
    return `
    <article class="movie" data-id="${movie.id}">
      <img class="movie__picture" src='${URL_MOVIE_IMAGE}${
      movie.poster
    }' alt='Poster of ${movie.title}' />
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

  #generateReviewsListMarkup(reviews) {
    const listItems = reviews.map((element) => {
      return `
      <li>
        <span>${element.content}</span>
        <a href="${element.url}" target="_blank">more</a>
      </li>`;
    });
    return listItems.join('');
  }

  #generateSimilarListMarkup(similar) {
    const listItems = similar.map((element) => {
      return `<li>${element}</li>`;
    });
    return listItems.join('');
  }

  #generateMovieDetailsMarkup(details) {
    return `
    <div class="movie__details">
      <div class="movie__trailer">${details.trailer}</div>
      <ul class="movie__reviews">${this.#generateReviewsListMarkup(details.reviews)}</ul>
      <ul class="movie__similar">${this.#generateSimilarListMarkup(details.similar)}</ul>
    </div>`;
  }

  #generateMarkup() {
    return this.#data.map((movie) => this.#generateMovieMarkup(movie)).join('');
  }

  #clear() {
    this.#element.innerHTML = '';
  }

  #getMovieElementBy(id) {
    return document.querySelector(`[data-id="${id}"]`);
  }

  attachRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  attachOnClickHandler(handler) {
    this.#element.addEventListener('click', (event) => {
      const movieElement = event.target.closest('.movie');
      if (movieElement) {
        handler(movieElement.dataset.id);
      }
    });
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

  renderMovieDetails(movie) {
    const element = this.#getMovieElementBy(movie.id);
    const markup = this.#generateMovieDetailsMarkup(movie.details);
    element.insertAdjacentHTML('beforeend', markup);
  }
}

export default new MoviesView();
