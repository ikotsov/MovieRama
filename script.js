import BottomScreenObserver from './src/BottomScreenObserver.js';
import { loadGenres, loadMovies, loadSearchResults, state } from './src/model.js';
import MoviesView from './src/views/MoviesView.js';
import SearchFormView from './src/views/SearchFormView.js';

const controlMovies = async () => {
  try {
    MoviesView.renderSpinner();

    await loadGenres();
    await loadMovies();

    if (state.movies.length === 0) return MoviesView.renderNoMoviesFound();

    MoviesView.render(state.movies);
  } catch (err) {
    MoviesView.renderError();
  }
};

const controlSearchResults = async function (query) {
  try {
    MoviesView.renderSpinner();

    await loadSearchResults(query);

    if (state.search.results.length === 0) return MoviesView.renderNoMoviesFound();

    MoviesView.render(state.search.results);
  } catch (err) {
    MoviesView.renderError();
  }
};

const controlBottomReached = async () => {
  try {
    const hasQueried = state.search.query !== '';
    if (hasQueried) {
      await loadSearchResults(state.search.query);

      MoviesView.render(state.search.results.slice(-20), true);
    } else {
      await loadMovies();

      MoviesView.render(state.movies.slice(-20), true);
    }
  } catch (err) {}
};

const app = () => {
  MoviesView.attachRenderHandler(controlMovies);
  SearchFormView.attachOnTypeHandler(controlSearchResults);

  BottomScreenObserver.attachRenderHandler(controlBottomReached);
};
app();
