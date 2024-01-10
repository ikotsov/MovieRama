import { loadGenres, loadMovies, state } from './src/model.js';
import MoviesView from './src/MoviesView.js';

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

const app = () => {
  controlMovies();
};
app();
