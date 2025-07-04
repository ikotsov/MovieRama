import BottomScreenObserver from './helpers/BottomScreenObserver.js';
import { debounce } from './utils/debounce.js';
import {
  getItemsToRender,
  loadGenres,
  loadMovieDetails,
  loadMovies,
  loadSearchResults,
  state,
  hasReachedEndPage,
} from './model.js';
import MoviesView from './views/MoviesView.js';
import SearchFormView from './views/SearchFormView.js';

const controlMovies = async () => {
  try {
    MoviesView.renderSpinner();

    await loadGenres();
    await loadMovies();

    if (state.movies.length === 0) return MoviesView.renderNoMoviesFound();

    MoviesView.render(getItemsToRender());
  } catch (error) {
    MoviesView.renderError();
  }
};

const handleLoadSearchResults = async (query) => {
  try {
    await loadSearchResults(query);

    if (state.movies.length === 0) return MoviesView.renderNoMoviesFound();

    MoviesView.render(getItemsToRender());
  } catch (error) {
    MoviesView.renderError();
  }
};

const loadSearchResultsDebounced = debounce(handleLoadSearchResults, 500);

const controlSearchResults = (query) => {
  MoviesView.renderSpinner();

  loadSearchResultsDebounced(query);
};

const EMPTY_STRING = '';
const controlBottomReached = async () => {
  if (hasReachedEndPage()) return;

  try {
    if (state.query !== EMPTY_STRING) {
      await loadSearchResults(state.query);

      MoviesView.render(getItemsToRender(), true);
    } else {
      await loadMovies();

      MoviesView.render(getItemsToRender(), true);
    }
  } catch (error) {
    // TODO: Currently do nothing. Inform user that no more movies can be fetched because of an error.
  }
};

const controlMovieClicked = async (id) => {
  const idCasted = Number(id);
  try {
    await loadMovieDetails(idCasted);
    const movie = state.movies.find((movie) => movie.id === idCasted);
    MoviesView.renderMovieDetails(movie);
    MoviesView.expandDetails(id);
  } catch (error) {
    // TODO: Currently do nothing. Inform user that details have not been fetched because of an error.
  }
};

const app = () => {
  MoviesView.attachRenderHandler(controlMovies);
  MoviesView.attachOnClickHandler(controlMovieClicked);
  SearchFormView.attachOnTypeHandler(controlSearchResults);

  BottomScreenObserver.attachRenderHandler(controlBottomReached);
};
app();
