import { loadGenres, loadMovies, loadSearchResults, state } from './src/model.js';
import MoviesView from './src/views/MoviesView.js';
import BottomScreenObserver from './src/BottomScreenObserver.js';
import SearchFormView from './src/views/SearchFormView.js';

const controlMovies = async () => {
  try {
    MoviesView.renderSpinner();

    await loadGenres();
    await loadMovies();

    MoviesView.render(state.movies);
  } catch (err) {
    MoviesView.renderError();
  }
};

const controlMoreMovies = async () => {
  try {
    await loadMovies();
  
    MoviesView.renderMore(state.movies.slice(-20));
  } catch (err) {
    MoviesView.renderError();
  }
};

const controlSearchResults = async function (query) {
  try {
    MoviesView.renderSpinner();

    loadSearchResults(query);

    MoviesView.render(state.search.results);
  } catch (err) {
    console.log(err);
    MoviesView.renderError();
  }
};

const app = () => {
  MoviesView.attachRenderHandler(controlMovies);
  BottomScreenObserver.attachRenderHandler(controlMoreMovies);
  SearchFormView.attachOnTypeHandler(controlSearchResults);
};
app();
