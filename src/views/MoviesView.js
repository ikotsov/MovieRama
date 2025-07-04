import { URL_MOVIE_IMAGE } from '../config.js';
import ExpandAnimated from '../utils/ExpandAnimated.js';

class MoviesView {
  #data;
  #element = document.querySelector('.movies');
  #errorMessage = 'An error occurred 💥';
  #noMoviesMessage = 'No movies found 😢';

  #generateMovieMarkup(movie) {
    return `
    <article class="movie" data-id="${movie.id}">
      <div class="movie__content">
        <img class="movie__picture" src='${URL_MOVIE_IMAGE}${
      movie.poster
    }' alt='Poster of ${movie.title}' />
        <div class="movie__main">
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
      </div>
    </article>`;
  }

  #generateReviewsListMarkup(reviews) {
    const listItems = reviews.map((element) => {
      return `
      <li class="reviews__item">
        <span>${element.content}</span>
        <a href="${element.url}" target="_blank">more</a>
      </li>`;
    });
    return listItems.join('');
  }

  #generateSimilarListMarkup(similar) {
    const listItems = similar.map((element) => {
      return `<li class="similar__item">${element}</li>`;
    });
    return listItems.join('');
  }

  #generateMovieDetailsMarkup(details) {
    return `
    <div class="movie__details">
      <div class="movie__trailer">Video trailer: ${details.trailer}</div>
      <div class="reviews">
        <p class="reviews__heading">Reviews:</p>
        <ul class="reviews__list">${this.#generateReviewsListMarkup(details.reviews)}</ul>
      </div>
      <div class="similar">
        <p class="similar__heading">Similar Movies:</p>
        <ul class="similar__list">${this.#generateSimilarListMarkup(details.similar)}</ul>
      </div>
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

  #getMovieDetailsElementBy(element) {
    return element.querySelector('.movie__details');
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

    const existingDetails = this.#getMovieDetailsElementBy(element);
    if (existingDetails) return;

    const markup = this.#generateMovieDetailsMarkup(movie.details);
    element.insertAdjacentHTML('beforeend', markup);
  }

  expandDetails(id) {
    const movieElement = this.#getMovieElementBy(id);
    const movieDetails = this.#getMovieDetailsElementBy(movieElement);

    ExpandAnimated.run(movieElement, movieDetails);
  }
}

export default new MoviesView();
