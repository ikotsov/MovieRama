import { loadGenres, loadMovies, state } from './src/model.js';
import MoviesView from './src/MoviesView.js';
import BottomScreenObserver from './src/BottomScreenObserver.js';

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

const app = () => {
  MoviesView.attachRenderHandler(controlMovies);
  BottomScreenObserver.attachRenderHandler(controlMoreMovies);
};
app();
