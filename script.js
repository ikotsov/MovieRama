import BottomScreenObserver from './src/BottomScreenObserver.js';
import {
  getItemsToRender,
  loadGenres,
  loadMovies,
  loadSearchResults,
  state,
} from './src/model.js';
import MoviesView from './src/views/MoviesView.js';
import SearchFormView from './src/views/SearchFormView.js';
import { debounce } from './src/helpers.js';

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
}

const loadSearchResultsDebounced = debounce(handleLoadSearchResults, 500);

const controlSearchResults = (query) => {
  MoviesView.renderSpinner();
  
  loadSearchResultsDebounced(query);
};

const EMPTY_STRING = '';
const controlBottomReached = async () => {
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

const app = () => {
  MoviesView.attachRenderHandler(controlMovies);
  MoviesView.attachOnClickHandler((id) => console.log(id));
  SearchFormView.attachOnTypeHandler(controlSearchResults);

  BottomScreenObserver.attachRenderHandler(controlBottomReached);
};
app();
